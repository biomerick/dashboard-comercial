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

export interface CreateCampaignPayload {
  name: string;
  vertical_id: string;
  product_id: string;
  icp_description: string;
  prompt_used_id: string;
  email_subject: string;
  email_body_html: string;
  status: 'draft' | 'launched';
}
