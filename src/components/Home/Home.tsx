import Cover from 'components/Cover/Cover';
import Milestone from 'components/Milestone/Milestone';
import { useResetScrollOnUnmount } from 'utils/hooks';

import milestones from 'constants/milestones';

const Home = () => {
  useResetScrollOnUnmount();

  return (
    <>
      <Cover />
      {Object.values(milestones).map(({ title, alt, date, description, logo, url, urlTitle }) => (
        <Milestone
          key={title}
          alt={alt}
          date={date}
          description={description}
          logo={logo}
          title={title}
          url={url}
          urlTitle={urlTitle}
        />
      ))}
    </>
  );
};

export default Home;
