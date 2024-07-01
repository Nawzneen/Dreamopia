export interface Post {
  post_id: number;
  user_id: number;
  category_id?: number | null;
  title?: string;
  text: string;
  created_at: string;
  last_edit?: string | null;
  tags?: string[] | null;
}

export interface FetchedPost extends Post {
  username: string;
  email: string;
  category?: string;
  image?: string;
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
// export interface SessionUser {
//   user_id?: number | null |undefined; // Add user_id to the session user type
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
// }
export interface Session {
  user: User;
}
export interface PostCardProps{
  post: FetchedPost;
  handleEdit?: (post_id: number) => void;
  handleDelete?: (post_id: number) => Promise<void>;
  handleTagClick?: (tag: string) => void;
}
export interface PostCardListProps{
  data: FetchedPost[];
  handleTagClick?:  (tag: string) => void
}