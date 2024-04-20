const fetch = require("node-fetch");
require("dotenv").config();
const path = require("path");

const IGDB_API_URL = "https://api.igdb.com/v4";
const HEADERS = {
  'Accept': 'application/json',
  'Client-ID': process.env.IGDB_CLIENT_ID,
  'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
};

async function fetchIGDBData(endpoint, query) {
  const response = await fetch(`${IGDB_API_URL}/${endpoint}`, {
    method: 'POST',
    headers: HEADERS,
    body: query,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to fetch from IGDB: ${response.status} ${response.statusText} - ${message}`);
  }

  return response.json();
}

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;

  try {
    const genres = await fetchIGDBData('genres', "fields name; limit 50;");
    genres.forEach(genre => {
      const slug = genre.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-\([^)]+\)$/, ''); // Handle parentheses in slugs
      createNode({
        ...genre,
        slug,
        id: createNodeId(`Genre-${genre.id}`),
        internal: {
          type: "Genre",
          content: JSON.stringify(genre),
          contentDigest: createContentDigest(genre),
        },
      });
    });

    const games = await fetchIGDBData('games', "fields name, rating, genres.name, cover.url; where rating >= 60; sort rating desc; limit 500;");
    console.log(games); // Temporarily log the fetched games to inspect the data

    games.forEach(game => {
      const gameSlug = game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      createNode({
        ...game,
        slug: gameSlug,
        coverUrl: game.cover?.url || '',
        id: createNodeId(`Game-${game.id}`),
        internal: {
          type: "Game",
          content: JSON.stringify(game),
          contentDigest: createContentDigest(game),
        },
      });
    });
  } catch (error) {
    console.error("Error fetching data from IGDB:", error);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const genresResult = await graphql(`
    {
      allGenre {
        nodes {
          id
          name
          slug
        }
      }
    }
  `);

  genresResult.data.allGenre.nodes.forEach(genre => {
    createPage({
      path: `/genre/${genre.slug}/`,
      component: path.resolve(`./src/templates/genre-page.js`),
      context: {
        genreId: genre.id,
        genreName: genre.name,
      },
    });
  });

  const gamesResult = await graphql(`
    {
      allGame {
        nodes {
          id
          slug
        }
      }
    }
  `);

  gamesResult.data.allGame.nodes.forEach(game => {
    createPage({
      path: `/game/${game.slug}/`,
      component: path.resolve(`./src/templates/game-page.js`),
      context: {
        gameId: game.id,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Game implements Node @dontInfer {
      id: ID!
      name: String!
      rating: Float
      slug: String!
      coverUrl: String
      genres: [Genre] @link(by: "name", from: "genres.name")
    }
    type Genre implements Node @dontInfer {
      id: ID!
      name: String!
      slug: String!
    }
  `;
  createTypes(typeDefs);
};

