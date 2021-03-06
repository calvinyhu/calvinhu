import Image from 'next/image';

import HyperLink from 'components/UI/HyperLink/HyperLink';
import styles from './Milestone.module.scss';

interface MilestoneProps {
  alt: string;
  date: string;
  description: string;
  logo: string;
  title: string;
  url?: string;
  urlTitle?: string;
}

const Milestone = ({ alt, date, description, logo, title, url, urlTitle }: MilestoneProps) => {
  return (
    <div className={styles.Milestone}>
      <div className={styles.Photo}>
        <Image src={logo} width="240" height="240" alt={alt} />
      </div>
      <div className={styles.Details}>
        <div>
          <h1 className={styles.Title}>{title}</h1>
          <p className={styles.Date}>{date}</p>
          <p>{description}</p>
          {url && urlTitle && (
            <HyperLink className={styles.Url} href={url}>
              {urlTitle}
            </HyperLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Milestone;
