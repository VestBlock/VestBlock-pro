export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface CreditAnalysis {
  id: string;
  user_id: string;
  summary: string;
  credit_score: number;
  recommendations: string[];
  dispute_strategy: string;
  side_hustles: string[];
  credit_card_tips: string[];
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}