import { Lead } from '../types';

export const fetchLeadsMock = async (
  location: { city: string; country: string },
  verticalId: string
): Promise<Lead[]> => {
  console.log(`Buscando leads en ${location.city}, ${location.country} para vertical ${verticalId}`);
  
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Generar datos mock basados en la vertical
  const mockLeads: Lead[] = [
    {
      place_id: 'l1',
      name: 'Restaurante El Sabor Yucateco',
      address: 'Calle 60 #498, Centro, Mérida',
      rating: 4.5,
      status: 'OPERATIONAL',
      types: ['restaurant', 'food'],
    },
    {
      place_id: 'l2',
      name: 'Boutique La Elegancia',
      address: 'Av. Paseo de Montejo 400, Mérida',
      rating: 4.2,
      status: 'OPERATIONAL',
      types: ['clothing_store', 'retail'],
    },
    {
      place_id: 'l3',
      name: 'Consultorio Dental Sonrisas',
      address: 'Calle 20 #100, Altabrisa, Mérida',
      rating: 4.8,
      status: 'OPERATIONAL',
      types: ['dentist', 'health'],
    },
    {
      place_id: 'l4',
      name: 'Gimnasio PowerFit',
      address: 'Plaza Mangus, Mérida',
      rating: 4.0,
      status: 'OPERATIONAL',
      types: ['gym', 'health'],
    },
    {
      place_id: 'l5',
      name: 'Inmobiliaria Maya Real',
      address: 'Calle 30 #200, San Ramón Norte, Mérida',
      rating: 3.9,
      status: 'OPERATIONAL',
      types: ['real_estate_agency', 'finance'],
    },
    {
      place_id: 'l6',
      name: 'Cafetería Los Portales',
      address: 'Calle 59 #500, Centro, Mérida',
      rating: 4.6,
      status: 'OPERATIONAL',
      types: ['cafe', 'food'],
    },
    {
      place_id: 'l7',
      name: 'Hotel Casa Azul',
      address: 'Calle 60 #300, Centro, Mérida',
      rating: 4.7,
      status: 'OPERATIONAL',
      types: ['lodging', 'travel'],
    },
    {
      place_id: 'l8',
      name: 'Tienda de Deportes Campeón',
      address: 'Plaza Altabrisa, Mérida',
      rating: 4.1,
      status: 'OPERATIONAL',
      types: ['sporting_goods_store', 'retail'],
    },
    {
      place_id: 'l9',
      name: 'Spa Relajación Total',
      address: 'Av. García Lavín, Mérida',
      rating: 4.9,
      status: 'OPERATIONAL',
      types: ['spa', 'health'],
    },
    {
      place_id: 'l10',
      name: 'Librería El Pensador',
      address: 'Calle 62 #400, Centro, Mérida',
      rating: 4.3,
      status: 'OPERATIONAL',
      types: ['book_store', 'retail'],
    },
  ];

  return mockLeads;
};
