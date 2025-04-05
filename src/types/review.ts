export interface Review {
  id: string;
  skillId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
}

export interface ReviewSubmission {
  skillId: string;
  rating: number;
  comment: string;
}
