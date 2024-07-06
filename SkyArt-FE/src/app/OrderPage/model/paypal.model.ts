export interface PayPalLink {
    href: string;
    rel: string;
    method: string;
  }
  
  export interface PayPalOrderResponse {
    id: string;
    status: string;
    links: PayPalLink[];
  }