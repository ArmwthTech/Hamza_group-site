export type Country = "Китай" | "Корея";
export type CarStatus = "draft" | "published";

export type Car = {
  id: string;
  title: string;
  country: Country;
  year: number;
  price_from: number;
  image_url: string;
  image_urls?: string[] | null;
  description: string;
  mileage?: string | null;
  engine?: string | null;
  status: CarStatus;
  created_at?: string;
  updated_at?: string;
};

export type LeadPayload = {
  name: string;
  phone: string;
  telegram_username: string;
  desired_car: string;
  budget: string;
  country_preference: "" | "Китай" | "Корея" | "Не знаю";
  source: string;
};
