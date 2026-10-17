export const university = {
  name: 'Example University',
  shortName: 'EU',
  primaryColor: '#4F46E5',
  supportEmail: 'events@example.edu',
  faculties: [
    'Engineering',
    'Science',
    'Business',
    'Arts and Humanities',
    'Health Sciences',
    'Law',
  ],
  venues: [
    {
      id: 'main-auditorium',
      name: 'Main Auditorium',
      description: 'The heart of campus gatherings, with a spacious stage and accessible seating.',
    },
    {
      id: 'engineering-lab-block',
      name: 'Engineering Lab Block',
      description:
        'A collaborative space for big ideas, hands-on projects, and late-night breakthroughs.',
    },
    {
      id: 'sports-complex',
      name: 'Sports Complex',
      description: 'Our home for match days, track sessions, and a little friendly competition.',
    },
    {
      id: 'student-union-hall',
      name: 'Student Union Hall',
      description: 'A welcoming space for student voices, live music, and new connections.',
    },
    {
      id: 'library-atrium',
      name: 'Library Atrium',
      description: 'A bright, accessible meeting place at the center of the university library.',
    },
    {
      id: 'amphitheatre',
      name: 'Amphitheatre',
      description: 'An open-air venue for creative afternoons and unforgettable evenings.',
    },
  ].map((venue) => ({
    ...venue,
    photoPublicId: `venues/${venue.id}`,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' Example University')}`,
  })),
};
