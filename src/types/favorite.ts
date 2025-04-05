export interface Favorite {
  id: string;
  userId: string;
  skillId: string;
  createdAt: string;
}

export interface FavoriteSkill extends Favorite {
  skill: {
    title: string;
    providerName: string;
    rate: number;
    rateUnit: string;
    rating: number;
    totalReviews: number;
    imageUrl?: string;
  };
}
