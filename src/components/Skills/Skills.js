import React from 'react';
import Reveal from 'react-reveal/Reveal';

import styles from './Skills.module.scss';

const skills = () => {
  const DELAY = 300;

  return (
    <div className={styles.Skills}>
      <div className={styles.Skill}>
        <p>C</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.C} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>C++</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.CPP} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>Express</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Express} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>Git</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Git} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>gulp</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Gulp} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>HTML</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.HTML} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>JavaScript</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.JavaScript} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>mlab</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Mlab} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>Node.js</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Node} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>Postman</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Postman} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>Python</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.Python} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>React</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.React} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>SASS(Y) CSS</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.SASSYCSS} />
          </Reveal>
        </div>
      </div>
      <div className={styles.Skill}>
        <p>VS Code</p>
        <div className={styles.Bar}>
          <Reveal effect={styles.Extend} delay={DELAY}>
            <div className={styles.VSCode} />
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default skills;
