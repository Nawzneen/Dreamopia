export interface Quote {
  quote_id: number;
  author: string;
  text: string;
  created_at: string;
  tags: string[];
  user: {
    user_id: number;
    username: string;
    email: string;
    image?: string;
  };
}

export interface FetchedQuote extends Quote {
  username?: string;
  email?: string;
  category?: string;
  image?: string;
}

export interface User {
  user_id: number;
  email: string;
  username: string;
  created_at: string;
  about?: string | undefined;
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
  user?: User;
}
export interface QuoteCardProps {
  quote: FetchedQuote;
  name?: string;
  handleEdit?: (quote_id: number) => void;
  handleDelete?: (quote_id: number) => Promise<void>;
  handleTagClick?: (tag: string) => void;
}
export interface QuoteCardListProps {
  data: FetchedQuote[];
  handleTagClick?: (tag: string) => void;
}
