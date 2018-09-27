import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal';
import throttle from 'raf-throttle';
import Chart from 'chart.js';

import classes from './Fitness.css';
import STYLES from '../../utils/styles';
import Button from '../../components/UI/Button/Button';

const macroPieId = 'macroPieId';

class Fitness extends PureComponent {
  constructor(props) {
    super(props);
    this.fitness = React.createRef();
  }

  state = {
    isShowBackToTopButton: false,
    macroPie: null
  };

  isCreated = false;
  componentDidMount() {
    this.setState({ macroPie: document.getElementById(macroPieId) });
  }

  handleScroll = event => {
    throttle(
      this.animatePage(
        event.target.className,
        event.target.scrollTop,
        event.target.clientHeight
      )
    );
  };

  animatePage = (className, scrollTop, clientHeight) => {
    if (this.fitness.current.className === className) {
      if (this.state.isShowBackToTopButton && scrollTop < clientHeight)
        this.setState({ isShowBackToTopButton: false });
      if (!this.state.isShowBackToTopButton && scrollTop >= clientHeight)
        this.setState({ isShowBackToTopButton: true });
    }
  };

  handleScrollToTop = () => (this.fitness.current.scrollTop = 0);

  render() {
    const navClasses =
      classes.Nav + ' ' + classes.Hide + ' ' + classes.TextSlideFadeIn;
    const nav = (
      <div className={navClasses}>
        <div className={classes.Logo}>
          <h3>Calvin Hu</h3>
        </div>
        <NavLink className={classes.NavLink} to="/">
          Home
        </NavLink>
      </div>
    );

    const banner = (
      <div className={classes.Banner}>
        {nav}
        <div className={classes.QuoteContainer}>
          <div className={classes.Quote}>
            <div className={STYLES.MAT_ICONS}>format_quote</div>
            <h1>Comfort is the enemy of progress.</h1>
            <p>- P.T. Barnum</p>
          </div>
        </div>
      </div>
    );

    if (this.state.macroPie && !this.isCreated) {
      new Chart(this.state.macroPie, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [
            {
              data: [20, 50, 30],
              backgroundColor: ['#ffa07a', '#54af88', '#5481a4']
            }
          ]
        }
      });
      this.isCreated = true;
    }

    const nutrition = (
      <div className={classes.NutritionContainer}>
        <h3>Targets</h3>
        <Reveal effect={classes.BlockSlideFadeIn}>
          <div className={classes.Nutrition}>
            <div className={classes.Macros}>
              <p>Daily Macros (% grams)</p>
              <canvas id={macroPieId} />
            </div>
          </div>
        </Reveal>
      </div>
    );

    const diet = (
      <div className={classes.DietContainer}>
        <Reveal effect={classes.BlockSlideFadeIn}>
          <h3>Example Diet</h3>
          <div className={classes.Diet}>
            <Reveal effect={classes.BlockSlideFadeIn}>
              <div className={classes.Meal}>
                <h5>Breakfast</h5>
                <p>3 Eggs</p>
                <p>Mixed Veggies</p>
              </div>
              <div className={classes.Meal}>
                <h5>Lunch</h5>
                <p>Pasta</p>
              </div>
              <div className={classes.Meal}>
                <h5>Post Workout</h5>
                <p>Greek Yogurt Fruit Smoothie</p>
              </div>
              <div className={classes.Meal}>
                <h5>Dinner</h5>
                <p>Chicken Breast</p>
                <p>Broccolli</p>
                <p>Brown Rice</p>
              </div>
              <div className={classes.Meal}>
                <h5>Late Night</h5>
                <p>Peanut Butter Banana Bread Toast</p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    );

    const workout = (
      <div className={classes.WorkoutContainer}>
        <Reveal effect={classes.BlockSlideFadeIn}>
          <h3>Example Week</h3>
          <div className={classes.Workout}>
            <Reveal effect={classes.BlockSlideFadeIn}>
              <div className={classes.Day}>
                <h5>Monday</h5>
                <p>Pseudo Planche Push Ups</p>
                <p>Ring Dips</p>
                <p>Dumbbell Squats</p>
                <p>Calf Press</p>
              </div>
              <div className={classes.Day}>
                <h5>Tuesday</h5>
                <p>Front Lever Holds</p>
                <p>Pull Ups</p>
                <p>Deadlifts</p>
                <p>V-Ups</p>
              </div>
              <div className={classes.Day}>
                <h5>Thursday</h5>
                <p>One Handed Push Ups</p>
                <p>Weighted Dips</p>
                <p>Barbell Squats</p>
                <p>Calf Press</p>
              </div>
              <div className={classes.Day}>
                <h5>Friday</h5>
                <p>One Handed Chin Up Hold</p>
                <p>Chin Ups</p>
                <p>Reverse Deadlifts</p>
                <p>V-Ups</p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    );

    const current = (
      <div className={classes.Current}>
        {nutrition}
        {diet}
        {workout}
      </div>
    );

    const year2013 = (
      <div className={classes.YearSection}>
        <h5>2013</h5>
        <div className={classes.YearSummary}>
          <p>Inspired by Jesse Wellens and Jeff Cavaliere</p>
          <p>Started 6 day bodybuilding home workout</p>
          <p>Starting weight was 135</p>
        </div>
      </div>
    );
    const year2014 = (
      <div className={classes.YearSection}>
        <h5>2014</h5>
        <div className={classes.YearSummary}>
          <p>Inspired by Frank Medrano and Dominik Sky</p>
          <p>Changed to 4 day calisthenics routine</p>
          <p>Starting weight was 145</p>
        </div>
      </div>
    );

    const timeline = (
      <div className={classes.TimelineContainer}>
        <h3>My Beginning</h3>
        <div className={classes.Timeline}>
          <Reveal effect={classes.BlockSlideFadeIn}>
            {year2013}
            {year2014}
          </Reveal>
        </div>
      </div>
    );

    let goBackToTopBtnClasses = classes.BackToTopBtn;
    if (this.state.isShowBackToTopButton)
      goBackToTopBtnClasses += ' ' + classes.OnScreenY;

    return (
      <div
        className={classes.FitnessContainer}
        onScroll={this.handleScroll}
        ref={this.fitness}
      >
        <div className={classes.Fitness}>
          <Reveal effect={classes.BlockSlideFadeIn}>
            {banner}
            {current}
            {timeline}
          </Reveal>
        </div>
        <div className={goBackToTopBtnClasses}>
          <Button circle adj click={this.handleScrollToTop}>
            <div className={STYLES.MAT_ICONS}>arrow_upward</div>
          </Button>
        </div>
      </div>
    );
  }
}

export default Fitness;
