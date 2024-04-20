import React from "react";
import PropTypes from "prop-types";
import * as styles from "../styles/layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.siteWrapper}>
    <header className={styles.header}>
      <div>
        <h1 className={styles.siteTitle}>Game Grapes</h1>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}><a href="/">Home</a></li>
          <li className={styles.navLinkItem}><a href="/genres">Genres</a></li>
          <li className={styles.navLinkItem}><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    <main className={styles.content}>{children}</main>
    <footer className={styles.siteFooter}>
      © {new Date().getFullYear()} Game Grapes. All rights reserved.
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
