// Enums
export enum FitType {
  SMALL = "SMALL", // Kebesaran
  TRUE = "TRUE", // Pas
  LARGE = "LARGE", // Kekecilan
}

export enum MediaType {
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
}

// User
export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string | null;
}

// Product
export interface Product {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string;
  price: number | null;
  sizes: string[]; // Available sizes e.g., ["S", "M", "L"] or ["40", "41", "42"]
  overallRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

// Review
export interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  editedAt: string | null;
  userMeasurement: {
    waist: number;
    bust: number;
    hips: number;
  };
  fit: FitType;
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  media: ReviewMedia[];
  helpfulCount: number;
  isHelpful?: boolean;
}


// Review Media
export interface ReviewMedia {
  id: number;
  type: MediaType;
  url: string;
}

// Review Summary
export interface ReviewSummary {
  overallRating: number;
  totalReviews: number;
  fitDistribution: {
    small: number;
    true: number;
    large: number;
  };
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// Pagination Response
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Login {
  email: string;
  password: string;
}

export interface ReviewFormData {
  rating: number;
  content: string;
  waist?: number;
  bust?: number;
  hips?: number;
  fit: FitType | "";
  media: File[];
}
