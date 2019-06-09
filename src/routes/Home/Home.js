import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import styles from './Home.module.scss';
import milestones from '../../assets/milestones/milestones';
import Cover from '../../components/Cover/Cover';
import Milestone from '../../components/Milestone/Milestone';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.homeRef = React.createRef();
  }

  state = {
    isClicked: false,
    offsetX: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick = page => {
    if (!this.state.isClicked) this.setState({ isClicked: true });

    if (this.state.page !== page) this.setState({ page: page });
    else this.handleScrollToPage();
  };

  handleScroll = () => {
    throttle(this.animatePage(window.scrollY, window.innerHeight));
  };

  animatePage = (scrollTop, clientHeight) => {
    if (scrollTop < clientHeight) this.setState({ offsetX: -scrollTop / 10 });
  };

  handleScrollToPage = () => {
    if (this.homeRef.current) {
      window.scrollTo({
        top: this.homeRef.current.clientHeight,
        behavior: 'smooth',
      });
    }
  };

  renderMilestones = () =>
    Object.values(milestones).map(val => (
      <Milestone
        key={val.title}
        alt={val.alt}
        date={val.date}
        description={val.description}
        photo={val.photo}
        title={val.title}
        url={val.url}
        urlTitle={val.urlTitle}
      />
    ));

  render() {
    return (
      <div
        className={styles.Home}
        onScroll={this.handleScroll}
        ref={this.homeRef}
      >
        <Cover click={this.handleClick} offsetX={this.state.offsetX} />
        {this.renderMilestones()}
      </div>
    );
  }
}

export default Home;
