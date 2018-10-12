import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

import classes from './Resume.css';
import resume from '../../assets/files/Hu-Calvin-Resume.pdf';

class Resume extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  handleLoadSuccess = () => {
    console.log('PDF loaded');
  };

  render() {
    return (
      <Fade>
        <div className={classes.Resume}>
          <Document
            className={classes.File}
            file={resume}
            onLoadSuccess={this.handleLoadSuccess}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </Fade>
    );
  }
}

export default Resume;
