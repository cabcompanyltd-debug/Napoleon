export interface Farm {
  id: string;
  slug: string;
  name: string;
  location: string;
  district: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  sizeAcres: number;
  farmType: 'Commercial Crop' | 'Livestock & Poultry' | 'Horticulture & Greenhouse' | 'Agro-Processing & Logistics';
  status: 'Fully Operational' | 'Expanding' | 'In Development';
  mainCrops: string[];
  description: string;
  heroImage: string;
  galleryImages: string[];
  infrastructure: string[];
  irrigationSource: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Fresh Produce' | 'Grains & Cereals' | 'Fruits & Vegetables' | 'Livestock & Poultry' | 'Processed Goods' | 'Seeds & Inputs';
  tagline: string;
  description: string;
  harvestSeason: string;
  packagingOptions: string[];
  minOrderQuantity: string;
  image: string;
  galleryImages: string[];
  nutritionalHighlights?: string[];
  isFeatured?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Infrastructure' | 'Irrigation & Smart Ag' | 'Community & Training' | 'Processing & Storage';
  status: 'Ongoing' | 'Completed' | 'Planned';
  location: string;
  startDate: string;
  completionTarget: string;
  summary: string;
  fullDescription: string;
  objectives: string[];
  impactMetrics: { label: string; value: string }[];
  image: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Company News' | 'Agricultural Tech' | 'Sustainability' | 'Volta Regional Impact' | 'Market Trends';
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  author: string;
  authorRole: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  iconName: string;
  image: string;
}

export interface JobPosition {
  id: string;
  slug: string;
  title: string;
  department: 'Agronomy & Farm Ops' | 'Smart Ag & Tech' | 'Agro-Processing' | 'Supply Chain & Logistics' | 'Corporate & Commercial';
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Internship';
  experienceLevel: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Farms' | 'Crops' | 'Machinery' | 'People' | 'Volta Region' | 'Technology' | 'Processing';
  image: string;
  caption: string;
  location: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Company' | 'Agriculture' | 'Products' | 'Operations' | 'Partnerships' | 'Careers' | 'Contact';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}
