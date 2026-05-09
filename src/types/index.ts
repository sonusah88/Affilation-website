import { Timestamp } from 'firebase/firestore';

export enum ProductStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  OUT_OF_STOCK = 'out_of_stock'
}

export interface Product {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  basePrice: number;
  offerPrice?: number;
  imageUrls: string[];
  videoUrls: string[];
  affiliateLink: string;
  rating: number;
  status: ProductStatus;
  isFeatured: boolean;
  isTrending: boolean;
  bestSeller: boolean;
  limitedTime: boolean;
  whyThisProduct: string;
  comparisonInfo?: {
    pros: string[];
    cons: string[];
    verdict: string;
  };
  clicks: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Banner {
  id?: string;
  imageUrl: string;
  link: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  order: number;
}

export interface AnalyticSummary {
  date: string;
  visits: number;
  uniqueVisitors: number;
  totalClicks: number;
}

export interface Click {
  id?: string;
  productId: string;
  timestamp: Timestamp;
  userAgent: string;
  referer: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}
