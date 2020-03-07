import React, { Fragment } from 'react';
import Link from 'umi/link';

import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import FooterView from './Footer'


class UserLayout extends React.PureComponent {

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Pokémon</span>
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
          <FooterView></FooterView>
        </div>
      </div>
    );
  }
}

export default UserLayout;
