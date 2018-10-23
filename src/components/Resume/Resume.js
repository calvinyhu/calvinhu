import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { storage } from '../../utils/firebase';

import classes from './Resume.css';
import Rf from '../UI/Icon/Rf/Rf';

const cors = 'https://cors-anywhere.herokuapp.com/';
const job = 'job';
const resume = 'Hu-Calvin-Resume';
let pdfUrl = null;
let wordUrl = null;

class Resume extends PureComponent {
  state = {
    pdfUrl: pdfUrl,
    wordUrl: wordUrl
  };

  componentDidMount() {
    this.props.scrollIntoView();
    if (!this.state.pdfUrl) this.getUrls();
  }

  getUrls = () => {
    storage
      .ref(`${job}/${resume}.pdf`)
      .getDownloadURL()
      .then(url => {
        pdfUrl = url;
        this.setState({ pdfUrl: url });
      });

    storage
      .ref(`${job}/${resume}.docx`)
      .getDownloadURL()
      .then(url => {
        wordUrl = url;
        this.setState({ wordUrl: url });
      });
  };

  render() {
    let loader = (
      <div className={classes.LoaderContainer}>
        <div className={classes.Loader} />
      </div>
    );

    let document = null;
    if (this.state.pdfUrl) {
      document = (
        <Document
          className={classes.Document}
          file={cors + this.state.pdfUrl}
          loading={loader}
        >
          <Page
            className={classes.Page}
            pageNumber={1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      );
    }

    let downloadButton = null;
    if (this.state.wordUrl) {
      downloadButton = (
        <div className={classes.Download}>
          <div className={classes.DownloadButton}>
            <a href={this.state.wordUrl} download>
              <Rf sm>download</Rf>
              <p>Download</p>
            </a>
          </div>
        </div>
      );
    }

    return (
      <Fade>
        <div className={classes.Resume}>
          <div className={classes.ColorSplash} />
          {downloadButton}
          <div className={classes.DocumentContainer}>{document}</div>
        </div>
      </Fade>
    );
  }
}

export default Resume;
