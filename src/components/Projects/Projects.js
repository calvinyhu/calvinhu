import React from 'react';

import classes from './Projects.css';

const projects = props => {
  let shmackClasses = classes.Project + ' ' + classes.Hide;
  if (props.isShowShmack)
    shmackClasses = classes.Project + ' ' + classes.BlockSlideFadeIn;

  let projectsClasses = classes.Projects + ' ' + classes.Hide;
  if (props.isShowProjects)
    projectsClasses = classes.Projects + ' ' + classes.BlockSlideFadeIn;

  return (
    <div className={projectsClasses}>
      <h4>My Projects</h4>
      <div className={shmackClasses} />
    </div>
  );
};

export default projects;
