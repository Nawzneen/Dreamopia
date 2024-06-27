export interface Post {
  post_id: number;
  user_id: number;
  category_id: number | null;
  title: string;
  text: string;
  created_at: string;
  edited_at: string | null;
  tags: string[] | null;
}

export interface User {
  user_id: number;
  email: string;
  username: string;
  created_at: string;
  about: string | null;
  favorite_genres: string[] | null;
}
export interface Category {
  category_id: number;
  name: string;
  description: string | null;
}
