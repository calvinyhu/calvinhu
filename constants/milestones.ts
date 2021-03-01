interface Milestone {
  alt: string;
  date: string;
  description: string;
  logo: string;
  title: string;
  url?: string;
  urlTitle?: string;
}

interface Milestones {
  [key: string]: Milestone;
}

const milestones: Milestones = {
  churn: {
    alt: 'Churn',
    date: 'August 2020 - September 2020',
    description: 'Simple credit card churning service',
    logo: '/assets/churn.svg',
    title: 'Churn',
    url: 'https://getchurn.com',
    urlTitle: 'Try Churn',
  },
  invitae: {
    alt: 'Invitae',
    date: 'December 2018 - Present',
    description: 'Helping Invitae bring comprehensive genetic testing to the mainstream.',
    logo: '/assets/images/invitae_logo.png',
    title: 'Invitae',
    url: 'https://www.invitae.com',
    urlTitle: 'Learn about Invitae',
  },
  shmack: {
    alt: 'Shmack',
    date: 'August 2018 - November 2018',
    description: 'Find and vote on popular, crowd-sourced restaurant menu items.',
    logo: '/assets/images/shmack_logo.png',
    title: 'Shmack',
    url: 'https://shmack.app',
    urlTitle: 'Try Shmack (deprecated)',
  },
  jammming: {
    alt: 'Jammming',
    date: 'May 2018 - June 2018',
    description: 'Create Spotify playlists on the web and push them to your account.',
    logo: '/assets/images/jammming_logo.jpg',
    title: 'Jammming',
    url: 'https://jammmingspotify.firebaseapp.com',
    urlTitle: 'Try Jammming (deprecated)',
  },
};

export default milestones;
