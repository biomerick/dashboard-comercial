import { Vertical, Product, Prompt } from '../types';

export const VERTICALS: Vertical[] = [
  { id: 'v1', label: 'Retail', value: 'retail' },
  { id: 'v2', label: 'Inmobiliaria', value: 'real_estate' },
  { id: 'v3', label: 'Automotriz', value: 'automotive' },
  { id: 'v4', label: 'Educación', value: 'education' },
];

export const PRODUCTS: Product[] = [
  // Retail
  { id: 'p1', verticalId: 'v1', label: 'Campaña de Temporada', value: 'seasonal_campaign' },
  { id: 'p2', verticalId: 'v1', label: 'Lanzamiento de Producto', value: 'product_launch' },
  // Inmobiliaria
  { id: 'p3', verticalId: 'v2', label: 'Venta de Departamentos', value: 'apartment_sales' },
  { id: 'p4', verticalId: 'v2', label: 'Alquiler de Oficinas', value: 'office_rental' },
  // Automotriz
  { id: 'p5', verticalId: 'v3', label: 'Test Drive', value: 'test_drive' },
  { id: 'p6', verticalId: 'v3', label: 'Servicio Técnico', value: 'service' },
  // Educación
  { id: 'p7', verticalId: 'v4', label: 'Admisión Pregrado', value: 'undergrad_admission' },
  { id: 'p8', verticalId: 'v4', label: 'Cursos de Postgrado', value: 'postgrad_courses' },
];

export const PROMPTS: Prompt[] = [
  {
    id: 'prompt_1',
    name: 'Generador Estándar de ICP',
    template_text: 'Genera un perfil de Cliente Ideal (ICP) detallado para una campaña de {vertical} enfocada en {product}. Incluye datos demográficos, puntos de dolor principales y motivadores de compra.',
    category: 'general',
    status: 'active',
  },
  {
    id: 'prompt_2',
    name: 'Generador B2B',
    template_text: 'Actúa como un experto en marketing B2B. Define el ICP para vender {product} en el sector {vertical}. Enfócate en cargos de toma de decisiones y ciclo de venta.',
    category: 'b2b',
    status: 'inactive',
  },
];
