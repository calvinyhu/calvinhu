import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

import classes from './Resume.css';
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
            <p>Download my resume</p>
            <div className={classes.DownloadButton}>
              <Button opp>Download</Button>
            </div>
          </div>
          <div className={classes.DocumentContainer}>
            <Document className={classes.Document} file={resume}>
              <Page
                className={classes.Page}
                pageNumber={1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                renderMode="canvas"
              />
            </Document>
          </div>
        </div>
      </Fade>
    );
  }
}

export default Resume;
