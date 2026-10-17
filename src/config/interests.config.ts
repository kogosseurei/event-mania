export const interests = [
  { id: 'tech', label: 'Technology', icon: 'Code2' },
  { id: 'sports', label: 'Sports', icon: 'Trophy' },
  { id: 'music', label: 'Music', icon: 'Music2' },
  { id: 'careers', label: 'Careers', icon: 'BriefcaseBusiness' },
  { id: 'clubs', label: 'Clubs & societies', icon: 'Users' },
  { id: 'arts', label: 'Arts & culture', icon: 'Palette' },
  { id: 'volunteering', label: 'Volunteering', icon: 'HeartHandshake' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: 'Rocket' },
  { id: 'gaming', label: 'Gaming', icon: 'Gamepad2' },
  { id: 'wellness', label: 'Wellness', icon: 'Leaf' },
] as const;
export const interestCategoryMap = {
  tech: 'tech',
  gaming: 'tech',
  sports: 'sports',
  wellness: 'sports',
  music: 'music',
  arts: 'arts',
  careers: 'careers',
  entrepreneurship: 'careers',
  clubs: 'clubs',
  volunteering: 'clubs',
} as const;
