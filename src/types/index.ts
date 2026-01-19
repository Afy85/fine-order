export interface SiteSettings {
  id: number;
  hero_title: string;
  hero_image_url: string;
  founder_name: string;
  founder_intro: string;
  founder_image_1: string;
  phone: string;
  qr_code_url: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  price_info: string;
}

export interface Case {
  id: number;
  title: string;
  description: string;
  image_url_1: string;
  image_url_2: string;
}
