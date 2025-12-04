import { Vertical, Product, Prompt } from '../types';

export const VERTICALS: Vertical[] = [
  { id: 'v_general', label: 'General / Transversal', value: 'general' },
  { id: 'v_retail', label: 'Retail & Consumo', value: 'retail' },
  { id: 'v_real_estate', label: 'Inmobiliaria', value: 'real_estate' },
  { id: 'v_education', label: 'Educación', value: 'education' },
  { id: 'v_services', label: 'Servicios Profesionales', value: 'services' },
];

export const PRODUCTS: Product[] = [
  // Publicidad
  { id: 'p_ads_online', verticalId: 'v_general', label: 'Publicidad en Línea (Programática/Social)', value: 'ads_online' },
  { id: 'p_ads_trad', verticalId: 'v_general', label: 'Publicidad Tradicional (Prensa/Revistas)', value: 'ads_traditional' },
  
  // BTL & OOH
  { id: 'p_btl', verticalId: 'v_general', label: 'Activaciones BTL & Eventos', value: 'btl_events' },
  { id: 'p_ooh', verticalId: 'v_general', label: 'Publicidad Exterior (OOH)', value: 'ooh' },
  { id: 'p_promo', verticalId: 'v_general', label: 'Artículos Promocionales', value: 'promotional_items' },

  // Impresión
  { id: 'p_print_offset', verticalId: 'v_general', label: 'Impresión Offset (Volumen)', value: 'print_offset' },
  { id: 'p_print_digital', verticalId: 'v_general', label: 'Impresión Digital (Bajo Demanda)', value: 'print_digital' },
  { id: 'p_print_large', verticalId: 'v_general', label: 'Gran Formato (Lonas/Viniles)', value: 'print_large_format' },

  // Logística
  { id: 'p_logistics', verticalId: 'v_general', label: 'Paquetería y Logística (Dypaq)', value: 'logistics_dypaq' },

  // Educación
  { id: 'p_edu_offer', verticalId: 'v_education', label: 'Oferta Educativa (Unimedia)', value: 'education_unimedia' },

  // Estrategia
  { id: 'p_strategy', verticalId: 'v_general', label: 'Consultoría de Estrategia y Diseño', value: 'strategy_design' },
];

export const PROMPTS: Prompt[] = [
  {
    id: 'prompt_cold_outreach',
    name: 'Prospección en Frío',
    template_text: 'Genera un perfil de Cliente Ideal (ICP) para vender servicios de {product} a empresas del sector {vertical}. Identifica los cargos clave (Decision Makers), sus principales dolores operativos y cómo nuestra solución de {product} puede resolverlos. El tono debe ser profesional y consultivo.',
    category: 'sales',
    status: 'active',
  },
  {
    id: 'prompt_brand_awareness',
    name: 'Posicionamiento de Marca',
    template_text: 'Define un ICP para una campaña de reconocimiento de marca usando {product}. Enfócate en empresas de {vertical} que busquen expandir su presencia en el mercado. Incluye intereses demográficos y comportamientos digitales.',
    category: 'marketing',
    status: 'active',
  },
];
