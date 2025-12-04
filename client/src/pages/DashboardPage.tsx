import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const data = [
  { name: 'Campaña A', leads: 4000 },
  { name: 'Campaña B', leads: 3000 },
  { name: 'Campaña C', leads: 2000 },
  { name: 'Campaña D', leads: 2780 },
  { name: 'Campaña E', leads: 1890 },
  { name: 'Campaña F', leads: 2390 },
  { name: 'Campaña G', leads: 3490 },
];

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      let color = status === 'active' ? 'green' : 'orange';
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
  },
];

const tableData = [
  { key: '1', name: 'Verano 2024', status: 'active', roi: '120%' },
  { key: '2', name: 'Black Friday', status: 'paused', roi: '85%' },
  { key: '3', name: 'Navidad', status: 'active', roi: '150%' },
  { key: '4', name: 'Cyber Monday', status: 'paused', roi: '90%' },
];

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Dashboard</Title>
      
      {/* KPIs Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Ventas"
              value={112893}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Leads Activos"
              value={93}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Nuevos Clientes"
              value={1128}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Tasa de Conversión"
              value={9.3}
              precision={2}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Leads por Campaña" bordered={false} style={{ height: '100%' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#1890FF" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Últimas Campañas" bordered={false} style={{ height: '100%' }}>
            <Table 
              columns={columns} 
              dataSource={tableData} 
              pagination={false} 
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
