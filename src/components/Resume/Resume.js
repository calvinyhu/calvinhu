import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import PDF from 'react-pdf-js';
import { storage } from '../../utils/firebase';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Resume.module.scss';
import Fa from '../UI/Icon/Fa/Fa';

const cors = 'https://cors-anywhere.herokuapp.com/';
const job = 'job';
const resume = 'Hu-Calvin-Resume';
let pdfUrl = null;
let wordUrl = null;

class Resume extends PureComponent {
  static propTypes = {
    scrollIntoView: PropTypes.func.isRequired
  };

  isAlive = false;

  state = {
    isLoading: true,
    pdfUrl: pdfUrl,
    wordUrl: wordUrl
  };

  componentDidMount() {
    this.isAlive = true;
    if (!this.state.pdfUrl) this.getUrls();
    this.props.scrollIntoView();
  }

  componentWillUnmount() {
    this.isAlive = false;
  }

  getUrls = () => {
    storage
      .ref(`${job}/${resume}.pdf`)
      .getDownloadURL()
      .then(url => {
        pdfUrl = url;
        if (this.isAlive) this.setState({ pdfUrl: url });
      });

    storage
      .ref(`${job}/${resume}.docx`)
      .getDownloadURL()
      .then(url => {
        wordUrl = url;
        if (this.isAlive) this.setState({ wordUrl: url });
      });
  };

  handleDocumentComplete = () => {
    if (!this.isAlive) return;
    this.setState({ isLoading: false });
  };

  render() {
    let loader = null;
    if (this.state.isLoading) {
      loader = (
        <div className={styles.LoaderContainer}>
          <div className={styles.Loader} />
        </div>
      );
    }

    const documentContainerClasses = classnames({
      [styles.DocumentContainer]: true,
      [styles.OverflowAuto]: !this.state.isLoading
    });

    const documentClasses = classnames({
      [styles.Document]: true,
      [styles.Show]: !this.state.isLoading
    });

    let document = null;
    if (this.state.pdfUrl) {
      document = (
        <div className={documentClasses}>
          <PDF
            file={cors + this.state.pdfUrl}
            onDocumentComplete={this.handleDocumentComplete}
            page={1}
          />
        </div>
      );
    }

    let downloadButton = null;
    if (this.state.wordUrl) {
      downloadButton = (
        <Fade>
          <div className={styles.Download}>
            <div className={styles.DownloadButton}>
              <a href={this.state.wordUrl} download>
                <Fa>fas fa-download</Fa>
                <p>Download</p>
              </a>
            </div>
          </div>
        </Fade>
      );
    }

    return (
      <div className={styles.Resume}>
        <div className={styles.ColorSplash} />
        {downloadButton}
        <div className={documentContainerClasses}>{document}</div>
        {loader}
      </div>
    );
  }
}

export default Resume;
