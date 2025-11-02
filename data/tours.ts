
import { Tour } from '../types';

export const tours: Tour[] = [
  {
    id: 1,
    name: "Peggy's Cove Tour",
    price: 160,
    description: "Experience the iconic lighthouse and charming fishing village of Peggy's Cove. This tour offers breathtaking coastal views, unique rock formations, and the chance to explore a classic Nova Scotian landmark. A must-see for any visitor.",
    image: 'https://picsum.photos/seed/peggys-cove/800/600',
    images: [
      'https://picsum.photos/seed/peggys-cove-1/800/600',
      'https://picsum.photos/seed/peggys-cove-2/800/600',
      'https://picsum.photos/seed/peggys-cove-3/800/600',
      'https://picsum.photos/seed/peggys-cove-4/800/600',
    ],
    duration: "4 Hours",
    additionalInfo: {
      groupSize: "Up to 6 passengers",
      included: ["Private transportation", "Knowledgeable local guide", "Bottled water"],
      notIncluded: ["Meals and snacks", "Attraction entrance fees", "Gratuities"],
    },
  },
  {
    id: 2,
    name: "Lunenburg Tour",
    price: 175,
    description: "Explore the UNESCO World Heritage site of Lunenburg, with its colourful waterfront buildings and rich maritime history. We'll wander the historic streets, learn about the famous Bluenose II, and soak in the atmosphere of this beautifully preserved town.",
    image: 'https://picsum.photos/seed/lunenburg/800/600',
    images: [
        'https://picsum.photos/seed/lunenburg-1/800/600',
        'https://picsum.photos/seed/lunenburg-2/800/600',
        'https://picsum.photos/seed/lunenburg-3/800/600',
        'https://picsum.photos/seed/lunenburg-4/800/600',
    ],
    duration: "5-6 Hours",
    additionalInfo: {
      groupSize: "Up to 6 passengers",
      included: ["Private transportation", "Historical commentary", "Bottled water"],
      notIncluded: ["Lunch", "Museum entry fees", "Gratuities"],
    },
  },
  {
    id: 3,
    name: "Peggy's Cove + Lunenburg Combo",
    price: 200,
    description: "Get the best of both worlds with a full-day tour visiting both Peggy's Cove and the historic town of Lunenburg. This comprehensive tour showcases the stunning natural beauty and rich cultural heritage of Nova Scotia's South Shore.",
    image: 'https://picsum.photos/seed/combo-tour/800/600',
    images: [
        'https://picsum.photos/seed/combo-1/800/600',
        'https://picsum.photos/seed/combo-2/800/600',
        'https://picsum.photos/seed/combo-3/800/600',
        'https://picsum.photos/seed/combo-4/800/600',
    ],
    duration: "7-8 Hours",
    additionalInfo: {
      groupSize: "Up to 6 passengers",
      included: ["Full-day private transportation", "Expert local guide", "Bottled water"],
      notIncluded: ["Lunch and snacks", "All entrance fees", "Gratuities"],
    },
  },
  {
    id: 4,
    name: "Custom Tours",
    price: 175, // Starting price
    description: "Design your own adventure! We'll work with you to create a personalized tour of Nova Scotia's beautiful South Shore. Whether you're interested in wineries, hidden beaches, or specific historic sites, we can build the perfect day for you.",
    image: 'https://picsum.photos/seed/custom-tour/800/600',
    images: [
        'https://picsum.photos/seed/custom-1/800/600',
        'https://picsum.photos/seed/custom-2/800/600',
        'https://picsum.photos/seed/custom-3/800/600',
        'https://picsum.photos/seed/custom-4/800/600',
    ],
    duration: "Varies",
    additionalInfo: {
      groupSize: "Up to 6 passengers",
      included: ["Personalized itinerary planning", "Private transportation", "Local guide"],
      notIncluded: ["Meals", "Activity/entrance fees", "Gratuities"],
    },
  },
];