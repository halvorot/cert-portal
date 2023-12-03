export interface CertificationType {
  id: number;
  name: string;
  description?: string;
  exam_code: string;
  badge_image_url?: string;
  ratings?: RatingType[];
}

export interface RatingType {
  id: number;
  comment?: string;
  overall: number;
  difficulty: number;
  usefulness: number;
  would_take_again: boolean;
  user_id: string;
}
