import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import classes from './Resume.css';
import styles from '../../utils/styles';
import resume from '../../assets/files/Hu-Calvin-Resume.pdf';
import Button from '../UI/Button/Button';

class Resume extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    return (
      <Fade>
        <div className={classes.Resume}>
          <div className={classes.Download}>
            <p>Download</p>
            <div className={classes.DownloadButton}>
              <Button opp>
                <a className={styles.MAT_ICONS} href={resume} download>
                  save_alt
                </a>
              </Button>
            </div>
          </div>
          <div className={classes.DocumentContainer}>
            <Document className={classes.Document} file={resume}>
              <Page
                className={classes.Page}
                pageNumber={1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          </div>
        </div>
      </Fade>
    );
  }
}

export default Resume;
