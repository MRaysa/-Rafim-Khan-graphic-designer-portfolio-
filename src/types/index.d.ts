interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  duration: string;
  role: string;
  shortDescription: string;
  description: string;
  challenge: string;
  solution: string;
  coverImage: string;
  images: string[];
  process?: string[];
  link?: string;
}

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  downloadable: boolean;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
}