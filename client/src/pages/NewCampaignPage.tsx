import React, { useState } from 'react';
import { Steps, Button, message, Form, Input, Select, Card, Typography, Descriptions, Space } from 'antd';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const NewCampaignPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Estado para almacenar todos los datos del wizard
  const [campaignData, setCampaignData] = useState({
    name: '',
    vertical: '',
    subject: '',
    content: '',
  });

  const steps = [
    {
      title: 'Datos',
      description: 'Información básica',
    },
    {
      title: 'Contenido',
      description: 'Cuerpo del correo',
    },
    {
      title: 'Revisión',
      description: 'Confirmar detalles',
    },
  ];

  const handleNext = async () => {
    try {
      // Validar campos del paso actual antes de avanzar
      if (currentStep === 0) {
        const values = await form.validateFields(['name', 'vertical']);
        setCampaignData({ ...campaignData, ...values });
      } else if (currentStep === 1) {
        const values = await form.validateFields(['subject', 'content']);
        setCampaignData({ ...campaignData, ...values });
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    message.success('Campaña lanzada exitosamente');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Renderizado del contenido de cada paso
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Form.Item
              name="name"
              label="Nombre de Campaña"
              rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
            >
              <Input placeholder="Ej: Verano 2025" />
            </Form.Item>
            <Form.Item
              name="vertical"
              label="Vertical"
              rules={[{ required: true, message: 'Seleccione una vertical' }]}
            >
              <Select placeholder="Seleccione una opción">
                <Option value="retail">Retail</Option>
                <Option value="real_estate">Inmobiliaria</Option>
                <Option value="automotive">Automotriz</Option>
                <Option value="education">Educación</Option>
              </Select>
            </Form.Item>
          </div>
        );
      case 1:
        return (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Form.Item
              name="subject"
              label="Asunto del Correo"
              rules={[{ required: true, message: 'El asunto es obligatorio' }]}
            >
              <Input placeholder="Ej: ¡Ofertas exclusivas para ti!" />
            </Form.Item>
            <Form.Item
              name="content"
              label="Cuerpo del Mensaje"
              rules={[{ required: true, message: 'El contenido no puede estar vacío' }]}
            >
              <ReactQuill theme="snow" style={{ height: 200, marginBottom: 50 }} />
            </Form.Item>
          </div>
        );
      case 2:
        return (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Descriptions title="Resumen de Campaña" bordered column={1}>
              <Descriptions.Item label="Nombre">{campaignData.name}</Descriptions.Item>
              <Descriptions.Item label="Vertical">
                {campaignData.vertical ? campaignData.vertical.charAt(0).toUpperCase() + campaignData.vertical.slice(1) : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Asunto">{campaignData.subject}</Descriptions.Item>
              <Descriptions.Item label="Contenido">
                <div dangerouslySetInnerHTML={{ __html: campaignData.content }} />
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
      
      <Card variant="borderless">
        <Steps current={currentStep} items={steps} style={{ marginBottom: 40 }} />
        
        <Form
          form={form}
          layout="vertical"
          initialValues={campaignData}
          // Preservar valores al desmontar componentes
          preserve={true}
        >
          <div style={{ minHeight: 300 }}>
            {renderStepContent()}
          </div>
        </Form>

        <div style={{ marginTop: 24, textAlign: 'right', borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
          <Space>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>
                Atrás
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Siguiente
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleFinish} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
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
