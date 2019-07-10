import invitae_logo from '../../assets/images/invitae_logo.png';
import shmack_logo from '../../assets/images/shmack_logo.png';
import jammming_logo from '../../assets/images/jammming_logo.jpg';

interface Milestone {
  alt: string;
  date: string;
  description: string;
  photo: string;
  title: string;
  url: string;
  urlTitle: string;
}

interface Milestones {
  [key: string]: Milestone;
}

const milestones: Milestones = {
  invitae: {
    alt: 'Invitae',
    date: 'December 2018 - Present',
    description:
      'Helping Invitae bring comprehensive genetic testing to the mainstream.',
    photo: invitae_logo,
    title: 'Invitae',
    url: 'https://www.invitae.com/',
    urlTitle: 'Learn about Invitae',
  },
  shmack: {
    alt: 'Shmack',
    date: 'August 2018 - November 2018',
    description:
      'Find and vote on popular, crowd-sourced restaurant menu items.',
    photo: shmack_logo,
    title: 'Shmack',
    url: 'https://shmack.app/',
    urlTitle: 'Try the app',
  },
  jammming: {
    alt: 'Jammming',
    date: 'May 2018 - June 2018',
    description:
      'Create Spotify playlists on the web and push them to your account.',
    photo: jammming_logo,
    title: 'Jammming',
    url: 'https://jammmingspotify.firebaseapp.com/',
    urlTitle: 'Try the app',
  },
};

export default milestones;
