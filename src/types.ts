export interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
  address: string;
  coordinates: [number, number];
  interests: string[];
  contact: {
    email: string;
    phone: string;
  };
}