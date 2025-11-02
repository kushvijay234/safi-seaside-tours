
import { GalleryImage } from '../types';

export const galleryImages: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/gallery${i + 1}/800/600`,
  alt: `Scenic view of Nova Scotia ${i + 1}`
}));
