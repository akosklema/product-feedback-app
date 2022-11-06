import { H3 } from '../UI/headers';

import classes from './RoadmapHeader.module.css';

function RoadmapHeader({ children, title, sum, className }) {
  return (
    <div className={className}>
      <H3 className={classes['title']}>{title} ({sum})</H3>
      <p className={classes['description']}>{children}</p>
    </div>
  );
};

export default RoadmapHeader;