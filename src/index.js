import {GraphQLServer} from 'graphql-yoga'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const typeDefs = `
  type Query {
    getArticles(query: String!): NewsApiResponse
  }

  type NewsApiResponse {
    status: String!,
    totalResults: Int!,
    articles: [Articles]!
  }

  type Articles {
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String
  }
`

const resolvers = {
  Query: {
    getArticles(parent, args, context, info){
      return axios.get(`https://newsapi.org/v2/everything?q=${args.query}&apiKey=${process.env.NEWS_API_KEY}`).then(response => {
        console.log('data', process.env.NEWS_API_KEY, args.query, response.data)
        return response.data
      })
    }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
  console.log(
    `Server running at http://localhost:4000/`
  );
});