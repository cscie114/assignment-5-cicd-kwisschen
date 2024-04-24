import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/index.module.css"

const IndexPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    navigate("/confirm-page") // Redirect to a confirmation page after form submission
  }

  const handleReset = () => {
    // For resetting when Clear button is pressed
    setName("")
    setEmail("")
  }

  return (
    <Layout>
      <div className={styles.heroSection}>
        <h1>
          Welcome to <span>Game Grapes</span>!
        </h1>
        <p>Your ultimate guide to the gaming world.</p>
        <br />
        <Link to="/genres" className={styles.exploreButton}>
          Explore Games
        </Link>
      </div>

      <div className={styles.featuredGames}>
        <h2>Featured Game</h2>
        <div className={styles.gamesGrid}>
          <div className={styles.gameCard}>
            <StaticImage
              src="../images/ai-gaming.jpg"
              alt="Game Image"
              placeholder="blurred"
              layout="constrained"
            />
            <h3>Game Title</h3>
            <p>Short description of a randomly chosen game to entice users.</p>
          </div>
        </div>
      </div>

      <div className={styles.newsletterForm}>
        <h2>Subscribe to our newsletter!</h2>
        <form
          name="Data Collection Form"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="Data Collection Form" />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <div className={styles.formButtons}>
            <button type="submit">Send</button>
            <button type="button" onClick={handleReset}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
