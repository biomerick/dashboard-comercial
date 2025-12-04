export interface Vertical {
  id: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  verticalId: string;
  label: string;
  value: string;
}

export interface Prompt {
  id: string;
  name: string;
  template_text: string;
  category: string;
  status: 'active' | 'inactive';
}

export interface Lead {
  place_id: string;
  name: string;
  address: string;
  rating: number;
  status: string;
  types: string[];
}

export interface SelectedLead extends Lead {
  custom_message: string;
  custom_subject: string;
}

export interface CreateCampaignPayload {
  name: string;
  vertical_id: string;
  product_id: string;
  target_location: {
    country: string;
    city: string;
  };
  icp_description: string;
  prompt_used_id: string;
  selected_leads: SelectedLead[];
  status: 'draft' | 'launched';
}
