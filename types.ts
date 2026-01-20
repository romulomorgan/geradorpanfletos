
export interface FlyerData {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  details: string;
  price: string;
  contact: string;
  logo: string | null;
  qrCode: string | null;
}

export enum TemplateType {
  COSMOS = 'cosmos',
  INSTITUTIONAL = 'institutional',
  ENERGETIC = 'energetic',
  IMPACT = 'impact'
}
