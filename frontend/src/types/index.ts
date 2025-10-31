// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  role: 'fan' | 'creator';
  ageVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends User {
  bio?: string;
  avatar?: string;
  coverImage?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  stats?: {
    postCount: number;
    subscriberCount: number;
    totalEarnings: number;
  };
}

// Post Types
export interface Post {
  id: string;
  creatorId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  mediaType?: 'image' | 'video' | 'text';
  thumbnail?: string;
  price?: number;
  isPublic: boolean;
  likes?: number;
  comments?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  creatorId: string;
  price?: number;
  isPublic?: boolean;
}

// Payment Types
export interface Subscription {
  id: string;
  userId: string;
  creatorId: string;
  stripeSubId: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  price: number;
}

export interface Tip {
  id: string;
  userId: string;
  creatorId: string;
  amount: number;
  message?: string;
  createdAt: string;
}

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

// Stream Types
export interface LiveStream {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  streamUrl: string;
  thumbnailUrl?: string;
  isLive: boolean;
  viewerCount: number;
  startedAt: string;
  endedAt?: string;
}

export interface StreamChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  type: 'text' | 'tip' | 'system';
  tipAmount?: number;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  role: 'fan' | 'creator';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface AgeVerificationFormData {
  userId: string;
  selfie: File;
}

export interface SubscriptionFormData {
  priceId: string;
  creatorId: string;
  paymentMethodId: string;
}

export interface TipFormData {
  amount: number;
  creatorId: string;
  message?: string;
  paymentMethodId: string;
}

// Component Props Types
export interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
}

export interface SubscriptionFormProps {
  priceId: string;
  creatorId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface TipFormProps {
  creatorId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface AgeVerificationFormProps {
  userId: string;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

// Route Params Types
export interface ProfileRouteParams {
  id: string;
}

export interface PostRouteParams {
  id: string;
}

export interface LiveStreamRouteParams {
  id: string;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  user: User | null;
  posts: Post[];
  subscriptions: Subscription[];
  currentStream: LiveStream | null;
  isLoading: boolean;
  error: string | null;
}