import { Link } from 'react-router-dom';

import { H1 } from '../components/UI/headers';
import { Body1 } from '../components/UI/paragraphs';
import EmptyIllustrationSVG from '../components/SVGs/EmptyIllustrationSVG'

import classes from './NoPage.module.css';

function NoPage() {
  return (
    <section className={classes['no-page-section']}>
      <div className={classes['page-contnent-container']}>
        <EmptyIllustrationSVG />
        <H1>This page doesn't exist</H1>
        <Body1 className={classes['text']}>
          The page you were looking for doesn't exist.
          If you aren't logged in, you can <Link to="/">login</Link> or <Link to="signup">signup</Link>.
          If you are already logged in, you can <Link to="suggestions">go to suggestions</Link> or
          if you want <Link to="roadmap">go to roadmap</Link>.
        </Body1>
      </div>
    </section>
  );
};

export default NoPage;