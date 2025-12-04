import React, { useState, useEffect } from 'react';
import { Steps, Button, App, Form, Input, Select, Card, Typography, Descriptions, Space, Spin, Table, Tag, List, Row, Col } from 'antd';
import { Sparkles, ArrowLeft, ArrowRight, Rocket, CheckCircle, MapPin, Mail } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import { VERTICALS, PRODUCTS } from '../data/master-catalogs';
import { createCampaign, generateICPMock } from '../api/campaigns';
import { fetchLeadsMock } from '../api/leads';
import { CreateCampaignPayload, Lead, SelectedLead } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewCampaignPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { message } = App.useApp();
  
  // Estados para lógica de negocio
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [isGeneratingICP, setIsGeneratingICP] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLeads, setIsFetchingLeads] = useState(false);
  
  // Estados para prospección
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<SelectedLead[]>([]);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  
  // Estado global del wizard
  const [campaignData, setCampaignData] = useState<Partial<CreateCampaignPayload>>({
    name: '',
    vertical_id: '',
    product_id: '',
    target_location: { country: '', city: '' },
    icp_description: '',
    prompt_used_id: '',
    selected_leads: [],
    status: 'draft',
  });

  // Filtrar productos según vertical seleccionada
  const filteredProducts = PRODUCTS.filter(p => p.verticalId === selectedVertical || p.verticalId === 'v_general');

  const steps = [
    { title: 'Datos y Segmentación', description: 'Configuración inicial' },
    { title: 'Definición ICP', description: 'Generado con IA' },
    { title: 'Prospección', description: 'Búsqueda en Maps' },
    { title: 'Personalización', description: 'Mensajes 1 a 1' },
    { title: 'Lanzamiento', description: 'Revisión final' },
  ];

  const handleVerticalChange = (value: string) => {
    setSelectedVertical(value);
    form.setFieldsValue({ product_id: undefined });
  };

  const handleGenerateICP = async () => {
    const { vertical_id, product_id } = form.getFieldsValue(['vertical_id', 'product_id']);
    
    if (!vertical_id || !product_id) {
      message.warning('Por favor selecciona una vertical y un producto primero.');
      return;
    }

    setIsGeneratingICP(true);
    try {
      const result = await generateICPMock(vertical_id, product_id);
      form.setFieldsValue({ icp_description: result.text });
      setCampaignData(prev => ({ 
        ...prev, 
        icp_description: result.text,
        prompt_used_id: result.promptId 
      }));
      message.success('ICP generado exitosamente con IA');
    } catch (error) {
      message.error('Error al generar ICP');
      console.error(error);
    } finally {
      setIsGeneratingICP(false);
    }
  };

  const fetchLeads = async () => {
    const { target_location, vertical_id } = campaignData;
    if (!target_location?.city || !vertical_id) return;

    setIsFetchingLeads(true);
    try {
      const results = await fetchLeadsMock(target_location, vertical_id);
      setLeads(results);
    } catch (error) {
      message.error('Error al buscar leads');
    } finally {
      setIsFetchingLeads(false);
    }
  };

  const handleNext = async () => {
    try {
      let values = {};
      if (currentStep === 0) {
        values = await form.validateFields(['name', 'vertical_id', 'product_id', 'target_location']);
        setCampaignData(prev => ({ ...prev, ...values }));
      } else if (currentStep === 1) {
        values = await form.validateFields(['icp_description']);
        setCampaignData(prev => ({ ...prev, ...values }));
      } else if (currentStep === 2) {
        if (selectedLeads.length === 0) {
          message.warning('Debes seleccionar al menos un lead para continuar');
          return;
        }
        // Inicializar mensajes personalizados
        const initializedLeads = selectedLeads.map(lead => ({
          ...lead,
          custom_subject: `Propuesta para ${lead.name}`,
          custom_message: lead.custom_message || `Hola ${lead.name},<br/><br/>Vi que están ubicados en ${lead.address} y me gustaría conversar sobre cómo podemos ayudarles...`
        }));
        setSelectedLeads(initializedLeads);
        setActiveLeadId(initializedLeads[0].place_id);
        setCampaignData(prev => ({ ...prev, selected_leads: initializedLeads }));
      } else if (currentStep === 3) {
        // Guardar mensajes personalizados
        setCampaignData(prev => ({ ...prev, selected_leads: selectedLeads }));
      }
      
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const payload: CreateCampaignPayload = {
        ...campaignData,
        status: 'launched',
      } as CreateCampaignPayload;

      await createCampaign(payload);
      message.success('Campaña lanzada exitosamente');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      message.error('Error al lanzar la campaña');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Efecto para cargar leads al entrar al paso 2
  useEffect(() => {
    if (currentStep === 2 && leads.length === 0) {
      fetchLeads();
    }
  }, [currentStep]);

  // Renderizado de pasos
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Datos y Segmentación
        return (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Form.Item
              name="name"
              label="Nombre de Campaña"
              rules={[{ required: true, message: 'Ingresa un nombre para la campaña' }]}
            >
              <Input placeholder="Ej: Campaña Verano 2025" size="large" />
            </Form.Item>
            <Form.Item
              name="vertical_id"
              label="Vertical"
              rules={[{ required: true, message: 'Selecciona una vertical' }]}
            >
              <Select 
                placeholder="Selecciona una vertical" 
                size="large"
                onChange={handleVerticalChange}
              >
                {VERTICALS.map(v => (
                  <Option key={v.id} value={v.id}>{v.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="product_id"
              label="Producto"
              rules={[{ required: true, message: 'Selecciona un producto' }]}
            >
              <Select 
                placeholder="Selecciona un producto" 
                size="large"
                disabled={!selectedVertical}
              >
                {filteredProducts.map(p => (
                  <Option key={p.id} value={p.id}>{p.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Space style={{ width: '100%' }} align="baseline">
              <Form.Item
                name={['target_location', 'country']}
                label="País"
                rules={[{ required: true, message: 'Requerido' }]}
                style={{ width: '100%' }}
              >
                <Input placeholder="Ej: México" size="large" />
              </Form.Item>
              <Form.Item
                name={['target_location', 'city']}
                label="Ciudad / Región"
                rules={[{ required: true, message: 'Requerido' }]}
                style={{ width: '100%' }}
              >
                <Input placeholder="Ej: Mérida" size="large" />
              </Form.Item>
            </Space>
          </div>
        );

      case 1: // Definición ICP con IA
        return (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Button 
                type="primary" 
                icon={<Sparkles size={16} />} 
                onClick={handleGenerateICP}
                loading={isGeneratingICP}
                size="large"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', border: 'none' }}
              >
                {isGeneratingICP ? 'Generando perfil...' : 'Generar ICP con IA'}
              </Button>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Utiliza nuestra IA para definir el perfil de cliente ideal basado en tu producto.</Text>
              </div>
            </div>
            
            <Form.Item
              name="icp_description"
              label="Descripción del Perfil de Cliente Ideal (ICP)"
              rules={[{ required: true, message: 'El ICP es obligatorio' }]}
            >
              <TextArea 
                rows={12} 
                placeholder="Haz clic en 'Generar ICP con IA' o escribe manualmente la descripción..." 
                style={{ fontSize: 14, lineHeight: 1.6 }}
              />
            </Form.Item>
          </div>
        );

      case 2: // Prospección (Google Maps)
        const columns = [
          { title: 'Nombre del Negocio', dataIndex: 'name', key: 'name', render: (text: string) => <b>{text}</b> },
          { title: 'Dirección', dataIndex: 'address', key: 'address' },
          { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (rating: number) => <Tag color="gold">★ {rating}</Tag> },
          { title: 'Tipo', dataIndex: 'types', key: 'types', render: (types: string[]) => types.slice(0, 2).map(t => <Tag key={t}>{t}</Tag>) },
        ];

        return (
          <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={4} style={{ margin: 0 }}>Resultados de Búsqueda</Title>
              <Button icon={<MapPin size={16} />} onClick={fetchLeads} loading={isFetchingLeads}>
                Actualizar Búsqueda
              </Button>
            </div>
            <Table
              rowSelection={{
                type: 'checkbox',
                onChange: (_, selectedRows) => setSelectedLeads(selectedRows as SelectedLead[]),
                selectedRowKeys: selectedLeads.map(l => l.place_id),
              }}
              columns={columns}
              dataSource={leads}
              rowKey="place_id"
              loading={isFetchingLeads}
              pagination={{ pageSize: 5 }}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <Text strong>Leads seleccionados: {selectedLeads.length}</Text>
            </div>
          </div>
        );

      case 3: // Personalización de Contacto
        const activeLead = selectedLeads.find(l => l.place_id === activeLeadId);
        
        const updateLeadMessage = (content: string) => {
          if (!activeLeadId) return;
          const updatedLeads = selectedLeads.map(l => 
            l.place_id === activeLeadId ? { ...l, custom_message: content } : l
          );
          setSelectedLeads(updatedLeads);
        };

        const updateLeadSubject = (subject: string) => {
            if (!activeLeadId) return;
            const updatedLeads = selectedLeads.map(l => 
              l.place_id === activeLeadId ? { ...l, custom_subject: subject } : l
            );
            setSelectedLeads(updatedLeads);
          };

        return (
          <Row gutter={24} style={{ height: '600px' }}>
            <Col span={8} style={{ height: '100%', overflowY: 'auto', borderRight: '1px solid #f0f0f0' }}>
              <List
                itemLayout="horizontal"
                dataSource={selectedLeads}
                renderItem={item => (
                  <List.Item 
                    onClick={() => setActiveLeadId(item.place_id)}
                    style={{ 
                      cursor: 'pointer', 
                      padding: '12px',
                      backgroundColor: activeLeadId === item.place_id ? '#e6f7ff' : 'transparent',
                      borderLeft: activeLeadId === item.place_id ? '3px solid #1890ff' : '3px solid transparent'
                    }}
                  >
                    <List.Item.Meta
                      title={item.name}
                      description={<Text type="secondary" ellipsis>{item.address}</Text>}
                    />
                    {item.custom_message && <CheckCircle size={16} color="#52c41a" />}
                  </List.Item>
                )}
              />
            </Col>
            <Col span={16} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {activeLead ? (
                <>
                  <div style={{ marginBottom: 16, padding: '0 16px' }}>
                    <Text type="secondary">Editando correo para:</Text>
                    <Title level={4} style={{ margin: 0 }}>{activeLead.name}</Title>
                  </div>
                  <div style={{ padding: '0 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Input 
                        placeholder="Asunto" 
                        value={activeLead.custom_subject} 
                        onChange={(e) => updateLeadSubject(e.target.value)}
                        style={{ marginBottom: 16 }} 
                        prefix={<Mail size={16} />}
                    />
                    <ReactQuill 
                      theme="snow" 
                      value={activeLead.custom_message} 
                      onChange={updateLeadMessage}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                      modules={{ toolbar: [['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link']] }}
                    />
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Text type="secondary">Selecciona un lead para editar su mensaje</Text>
                </div>
              )}
            </Col>
          </Row>
        );

      case 4: // Lanzamiento
        const verticalLabel = VERTICALS.find(v => v.id === campaignData.vertical_id)?.label;
        const productLabel = PRODUCTS.find(p => p.id === campaignData.product_id)?.label;

        return (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Descriptions title="Resumen de Campaña" bordered column={1} styles={{ label: { width: '200px', fontWeight: 'bold' } }}>
              <Descriptions.Item label="Nombre">{campaignData.name}</Descriptions.Item>
              <Descriptions.Item label="Vertical">{verticalLabel}</Descriptions.Item>
              <Descriptions.Item label="Producto">{productLabel}</Descriptions.Item>
              <Descriptions.Item label="Ubicación">{campaignData.target_location?.city}, {campaignData.target_location?.country}</Descriptions.Item>
              <Descriptions.Item label="Leads Seleccionados">
                <Tag color="blue" style={{ fontSize: 16, padding: '4px 12px' }}>{selectedLeads.length} Destinatarios</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ICP Definido">
                <div style={{ whiteSpace: 'pre-wrap', maxHeight: 100, overflowY: 'auto' }}>
                  {campaignData.icp_description}
                </div>
              </Descriptions.Item>
            </Descriptions>
            
            <div style={{ marginTop: 24, padding: 16, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8 }}>
              <Space>
                <CheckCircle color="#52c41a" />
                <Text strong>Todo listo para lanzar. Se enviarán {selectedLeads.length} correos personalizados.</Text>
              </Space>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 32 }}>Nueva Campaña</Title>
      
      <Card variant="borderless" style={{ minHeight: '80vh' }}>
        <Steps current={currentStep} items={steps} style={{ marginBottom: 40 }} />
        
        <Form
          form={form}
          layout="vertical"
          initialValues={campaignData}
          preserve={true}
        >
          <div style={{ minHeight: 400 }}>
            {renderStepContent()}
          </div>
        </Form>

        <div style={{ marginTop: 40, textAlign: 'right', borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
          <Space>
            {currentStep > 0 && (
              <Button onClick={handlePrev} icon={<ArrowLeft size={16} />}>
                Atrás
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext} icon={<ArrowRight size={16} />}>
                Siguiente
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button 
                type="primary" 
                onClick={handleFinish} 
                loading={isSubmitting}
                icon={<Rocket size={16} />}
                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                Lanzar Campaña
              </Button>
            )}
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default NewCampaignPage;
