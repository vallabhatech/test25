
import type { User, FoodItem } from './types';

export const MOCK_USERS: { [key: string]: User } = {
  user1: { id: 'u1', name: 'Alice', avatarUrl: 'https://picsum.photos/seed/alice/100/100' },
  user2: { id: 'u2', name: 'Bob', avatarUrl: 'https://picsum.photos/seed/bob/100/100' },
  user3: { id: 'u3', name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/charlie/100/100' },
};

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    name: 'Homemade Sourdough Bread',
    description: 'Freshly baked this morning. Have two loaves, only need one. Made with organic flour.',
    imageUrl: 'https://picsum.photos/seed/bread/600/400',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    postedBy: MOCK_USERS.user1,
    claimedBy: null,
    status: 'available',
  },
  {
    id: 'f2',
    name: 'Garden Tomatoes',
    description: 'A whole basket of ripe, juicy tomatoes from my garden. Perfect for salads or sauce.',
    imageUrl: 'https://picsum.photos/seed/tomatoes/600/400',
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    postedBy: MOCK_USERS.user2,
    claimedBy: null,
    status: 'available',
  },
  {
    id: 'f3',
    name: 'Leftover Lasagna (Family Size)',
    description: 'Made a huge lasagna for a party, and have about half left. Easily feeds 4-5 people.',
    imageUrl: 'https://picsum.photos/seed/lasagna/600/400',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    postedBy: MOCK_USERS.user1,
    claimedBy: MOCK_USERS.user3,
    status: 'claimed',
  },
  {
    id: 'f4',
    name: 'Box of Apples',
    description: 'Went apple picking and got way too many! These are crisp Gala apples.',
    imageUrl: 'https://picsum.photos/seed/apples/600/400',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    postedBy: MOCK_USERS.user3,
    claimedBy: null,
    status: 'available',
  },
];
