import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../styles/index.module.css";

const IndexPage = () => (
  <Layout>
    <div className={styles.heroSection}>
      <h1>Welcome to <span>Game Grapes</span>!</h1>
      <p>Your ultimate guide to the gaming world.</p>
      <Link to="/genres" className={styles.exploreButton}>Explore Games</Link>
    </div>
    <div className={styles.featuredGames}>
      <h2>Featured Games</h2>
      <div className={styles.gamesGrid}>
        {/* Replace with (dynamic) content later */}
        <div className={styles.gameCard}>
          <StaticImage
            src="../images/ai-gaming.jpg"
            alt="Game Image"
            placeholder="blurred"
            layout="constrained"
          />
          <h3>Game Title</h3>
          <p>Short description of the game to entice users.</p>
        </div>
        {/* Repeat for other featured games later */}
      </div>
    </div>
  </Layout>
);

export const Head = () => <Seo title="Home" />;

export default IndexPage;
