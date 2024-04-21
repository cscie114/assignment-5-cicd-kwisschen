import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const GamePage = ({ data }) => {
  const { game } = data;
  return (
    <Layout>
      <div>
        <h1>{game.name}</h1>
        {game.coverUrl && <img src={game.coverUrl} alt={`Cover Image for ${game.name}`} />}
        <p>Rating: {game.rating ? game.rating.toFixed(1) : "N/A"}</p>
        <p>Summary: {game.summary}</p>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GameQuery($gameId: String!) {
    game(id: { eq: $gameId }) {
      id
      name
      rating
      coverUrl
      summary
    }
  }
`;

export default GamePage;
