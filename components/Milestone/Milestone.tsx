import styles from './Milestone.module.scss';
import HyperLink from 'components/UI/HyperLink/HyperLink';

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
        <img src={logo} alt={alt} />
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
