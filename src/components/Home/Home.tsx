import React, { FC } from 'react';

import Cover from 'components/Cover/Cover';
import Milestone from 'components/Milestone/Milestone';
import { useResetScrollOnUnmount } from 'utils/hooks';

import milestones from 'constants/milestones';

interface HomeProps {
  path: string;
}

const Home: FC<HomeProps> = () => {
  useResetScrollOnUnmount();

  return (
    <>
      <Cover />
      {Object.values(milestones).map(
        ({ title, alt, date, description, photo, url, urlTitle }) => (
          <Milestone
            key={title}
            alt={alt}
            date={date}
            description={description}
            photo={photo}
            title={title}
            url={url}
            urlTitle={urlTitle}
          />
        ),
      )}
    </>
  );
};

export default Home;
