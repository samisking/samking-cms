import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import pureRender from '../PureRender';
import styles from './Header.css';

const NavigationLink = ({ url, title, pathname = '' }) => {
  const className = pathname.startsWith(url) ?
    styles.navigationLink_active :
    styles.navigationLink;

  return (
    <div className={styles.navigationItem}>
      <Link to={url} className={className}>{title}</Link>
    </div>
  );
};

NavigationLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string
};

const Header = ({ navigationLinks, currentPathname }) =>
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <NavigationLink
        key={'logout'}
        url={'/logout'}
        title={'Logout'}
      />

      <div className={styles.navigation}>
        {navigationLinks.map(link =>
          <NavigationLink
            key={link.url}
            pathname={currentPathname}
            {...link}
          />
        )}
      </div>
    </div>
  </div>;

Header.propTypes = {
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  currentPathname: PropTypes.string
};

export default pureRender()(Header);
