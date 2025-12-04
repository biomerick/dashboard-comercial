import React, { useState, useEffect } from 'react';
import { Steps, Button, message, Form, Input, Select, Card, Typography, Descriptions, Space, Spin } from 'antd';
import { Sparkles, ArrowLeft, ArrowRight, Rocket, CheckCircle } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import { VERTICALS, PRODUCTS } from '../data/master-catalogs';
import { createCampaign, generateICPMock } from '../api/campaigns';
import { CreateCampaignPayload } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewCampaignPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Estados para lógica de negocio
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [isGeneratingICP, setIsGeneratingICP] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado global del wizard
  const [campaignData, setCampaignData] = useState<Partial<CreateCampaignPayload>>({
    name: '',
    vertical_id: '',
    product_id: '',
    icp_description: '',
    prompt_used_id: '',
    email_subject: '',
    email_body_html: '',
    status: 'draft',
  });

  // Filtrar productos según vertical seleccionada
  const filteredProducts = PRODUCTS.filter(p => p.verticalId === selectedVertical);

  const steps = [
    { title: 'Datos Básicos', description: 'Configuración inicial' },
    { title: 'Definición ICP', description: 'Generado con IA' },
    { title: 'Contenido', description: 'Cuerpo del correo' },
    { title: 'Revisión', description: 'Lanzamiento' },
  ];

  const handleVerticalChange = (value: string) => {
    setSelectedVertical(value);
    form.setFieldsValue({ product_id: undefined }); // Resetear producto al cambiar vertical
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

  const handleNext = async () => {
    try {
      let values = {};
      if (currentStep === 0) {
        values = await form.validateFields(['name', 'vertical_id', 'product_id']);
      } else if (currentStep === 1) {
        values = await form.validateFields(['icp_description']);
      } else if (currentStep === 2) {
        values = await form.validateFields(['email_subject', 'email_body_html']);
      }
      
      setCampaignData(prev => ({ ...prev, ...values }));
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

  // Renderizado de pasos
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Datos Básicos
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

      case 2: // Contenido del Correo
        return (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Form.Item
              name="email_subject"
              label="Asunto del Correo"
              rules={[{ required: true, message: 'El asunto es obligatorio' }]}
            >
              <Input placeholder="Ej: ¡Oferta exclusiva para ti!" size="large" />
            </Form.Item>
            <Form.Item
              name="email_body_html"
              label="Cuerpo del Mensaje"
              rules={[{ required: true, message: 'El contenido no puede estar vacío' }]}
            >
              <ReactQuill theme="snow" style={{ height: 300, marginBottom: 50 }} />
            </Form.Item>
          </div>
        );

      case 3: // Revisión
        const verticalLabel = VERTICALS.find(v => v.id === campaignData.vertical_id)?.label;
        const productLabel = PRODUCTS.find(p => p.id === campaignData.product_id)?.label;

        return (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Descriptions title="Resumen de Campaña" bordered column={1} labelStyle={{ width: '200px', fontWeight: 'bold' }}>
              <Descriptions.Item label="Nombre">{campaignData.name}</Descriptions.Item>
              <Descriptions.Item label="Vertical">{verticalLabel}</Descriptions.Item>
              <Descriptions.Item label="Producto">{productLabel}</Descriptions.Item>
              <Descriptions.Item label="ICP Definido">
                <div style={{ whiteSpace: 'pre-wrap', maxHeight: 200, overflowY: 'auto' }}>
                  {campaignData.icp_description}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Asunto">{campaignData.email_subject}</Descriptions.Item>
              <Descriptions.Item label="Contenido">
                <div dangerouslySetInnerHTML={{ __html: campaignData.email_body_html || '' }} />
              </Descriptions.Item>
            </Descriptions>
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
