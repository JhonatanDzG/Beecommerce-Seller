export interface User {
  id: string;
  img?: string;
  name: string;
  contact: {
    email: string;
    number?: string;
  };
  address?: string;
  profileComplete: boolean;
  createdAt: Date;
}
