import { CreateCampaignPayload } from '../types';
import { PROMPTS, VERTICALS, PRODUCTS } from '../data/master-catalogs';

export const createCampaign = async (payload: CreateCampaignPayload): Promise<{ success: boolean; id: string }> => {
  console.log('Enviando payload a n8n:', payload);
  
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    id: `camp_${Date.now()}`,
  };
};

export const generateICPMock = async (verticalId: string, productId: string): Promise<{ text: string; promptId: string }> => {
  // Buscar el prompt activo
  const activePrompt = PROMPTS.find(p => p.status === 'active');
  
  if (!activePrompt) {
    throw new Error('No hay prompt activo configurado');
  }

  // Buscar etiquetas para reemplazo
  const vertical = VERTICALS.find(v => v.id === verticalId)?.label || 'General';
  const product = PRODUCTS.find(p => p.id === productId)?.label || 'Producto';

  // Simular delay de generación de IA
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Reemplazar placeholders
  const generatedText = activePrompt.template_text
    .replace('{vertical}', vertical)
    .replace('{product}', product);

  // Simular una respuesta más elaborada basada en el template
  const mockResponse = `
**Perfil de Cliente Ideal (ICP) Generado por IA**

**Contexto:**
- Vertical: ${vertical}
- Producto: ${product}

**Demografía:**
- Edad: 25-45 años
- Ubicación: Zonas urbanas principales
- Nivel Socioeconómico: C1, C2

**Puntos de Dolor:**
1. Necesidad de optimizar tiempos en la gestión de ${product}.
2. Falta de información clara sobre opciones de ${vertical}.
3. Presupuesto limitado pero búsqueda de calidad.

**Motivadores de Compra:**
- Ofertas personalizadas y descuentos exclusivos.
- Facilidad de acceso y soporte post-venta.
- Recomendaciones de pares y reviews positivos.

*Nota: Este perfil ha sido generado automáticamente basado en el prompt "${activePrompt.name}".*
  `.trim();

  return {
    text: mockResponse,
    promptId: activePrompt.id,
  };
};
