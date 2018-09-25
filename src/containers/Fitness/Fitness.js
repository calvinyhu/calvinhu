import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Reveal from 'react-reveal/Reveal';

import classes from './Fitness.css';
import STYLES from '../../utils/styles';

class Fitness extends PureComponent {
  render() {
    const navClasses =
      classes.Nav + ' ' + classes.Hide + ' ' + classes.TextSlideFadeIn;
    const nav = (
      <div className={navClasses}>
        <div className={classes.Logo}>
          <h2>Calvin Hu</h2>
        </div>
        <NavLink className={classes.NavLink} to="/">
          Home
        </NavLink>
      </div>
    );

    const banner = (
      <div className={classes.Banner}>
        <div className={classes.Quote}>
          <div className={STYLES.MAT_ICONS}>format_quote</div>
          <h1>Comfort is the enemy of progress</h1>
          <p>P.T. Barnum</p>
        </div>
      </div>
    );

    const current = (
      <div className={classes.Current}>
        <div className={classes.DietContainer}>
          <h3>My Diet</h3>
          <div className={classes.Diet}>
            <div className={classes.Meal}>
              <h4>Breakfast</h4>
              <p>3 Eggs</p>
              <p>Mixed Veggies</p>
            </div>
            <div className={classes.Meal}>
              <h4>Lunch</h4>
              <p>Carb Heavy</p>
            </div>
            <div className={classes.Meal}>
              <h4>Post Workout</h4>
              <p>Greek Yogurt Fruit Smoothie</p>
            </div>
            <div className={classes.Meal}>
              <h4>Dinner</h4>
              <p>Protein and Rice</p>
            </div>
            <div className={classes.Meal}>
              <h4>Late Night</h4>
              <p>Peanut Butter Banana Bread Toast</p>
            </div>
          </div>
        </div>
        <div className={classes.WorkoutContainer}>
          <h3>My Workout</h3>
          <div className={classes.Workout}>
            <div className={classes.Day}>
              <h4>Day 1</h4>
              <p>Pseudo Planche Push Ups</p>
              <p>Ring Dips</p>
              <p>Dumbbell Squats</p>
              <p>Calf Press</p>
            </div>
            <div className={classes.Day}>
              <h4>Day 2</h4>
              <p>Front Lever Holds</p>
              <p>Pull Ups</p>
              <p>Deadlifts</p>
              <p>V-Ups</p>
            </div>
            <div className={classes.Day}>
              <h4>Day 3</h4>
              <p>Recover</p>
            </div>
            <div className={classes.Day}>
              <h4>Day 4</h4>
              <p>One Handed Push Ups</p>
              <p>Weighted Dips</p>
              <p>Barbell Squats</p>
              <p>Calf Press</p>
            </div>
            <div className={classes.Day}>
              <h4>Day 5</h4>
              <p>One Handed Chin Up Hold</p>
              <p>Chin Ups</p>
              <p>Reverse Deadlifts</p>
              <p>V-Ups</p>
            </div>
            <div className={classes.Day}>
              <h4>Day 6</h4>
              <p>Recover</p>
            </div>
            <div className={classes.Day}>
              <h4>Day 7</h4>
              <p>Recover</p>
            </div>
          </div>
        </div>
      </div>
    );

    const year2013 = (
      <div className={classes.YearSection}>
        <h4>2013</h4>
        <div className={classes.YearSummary}>
          <p>Started body building routine</p>
          <p>6 day routine</p>
        </div>
      </div>
    );
    const year2014 = (
      <div className={classes.YearSection}>
        <h4>2014</h4>
        <div className={classes.YearSummary}>
          <p>Mid-year switched to calisthenics training</p>
          <p>Inspired by Frank Medrano</p>
        </div>
      </div>
    );
    const year2015 = (
      <div className={classes.YearSection}>
        <h4>2015</h4>
        <div className={classes.YearSummary}>
          <p>End of year weight plateau at 153 pounds</p>
        </div>
      </div>
    );
    const year2016 = (
      <div className={classes.YearSection}>
        <h4>2016</h4>
        <div className={classes.YearSummary}>
          <p>Lost motivation beginning of 2016</p>
        </div>
      </div>
    );
    const year2017 = (
      <div className={classes.YearSection}>
        <h4>2017</h4>
        <div className={classes.YearSummary}>
          <p>Maintaining body weight</p>
        </div>
      </div>
    );
    const year2018 = (
      <div className={classes.YearSection}>
        <h4>2018</h4>
        <div className={classes.YearSummary}>
          <p>Motivation is back starting 2018</p>
        </div>
      </div>
    );
    const year2019 = (
      <div className={classes.YearSection}>
        <h4>2019</h4>
        <div className={classes.YearSummary}>
          <p>?</p>
        </div>
      </div>
    );

    const timeline = (
      <div className={classes.TimelineContainer}>
        <h3>How did I get to where I am?</h3>
        <div className={classes.Timeline}>
          {year2013}
          {year2014}
          {year2015}
          {year2016}
          {year2017}
          {year2018}
          {year2019}
        </div>
      </div>
    );

    return (
      <div className={classes.Fitness}>
        <Reveal effect={classes.BlockSlideFadeIn}>
          {nav}
          {banner}
          {current}
          {timeline}
        </Reveal>
      </div>
    );
  }
}

export default Fitness;
