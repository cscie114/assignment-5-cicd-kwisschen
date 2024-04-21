import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default function GenresPage({ data }) {
  const { allGenre } = data;

  return (
    <Layout>
      <h1>Highest-Rated Games of all Time</h1>
      <h2>Sorted by Genre</h2>
      <ul>
        {allGenre.nodes.map(genre => (
          <li key={genre.id}>
            <Link to={`/genre/${genre.slug}/`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}


export const query = graphql`
  query GenresQuery {
    allGenre {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

