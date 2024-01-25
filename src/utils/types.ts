export interface CertificationType {
  id: number;
  name: string;
  description?: string;
  exam_code: string;
  badge_image_url?: string;
  url: string;
  ratings?: RatingType[];
}

export interface RatingType {
  id: number;
  comment?: string;
  overall: number;
  easiness: number;
  usefulness: number;
  would_take_again: boolean;
  certification: number;
  user_id: string;
}
