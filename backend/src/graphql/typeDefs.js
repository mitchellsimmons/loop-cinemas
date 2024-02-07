import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: Int!
        email: String!
        firstName: String!
        lastName: String!
        admin: Boolean!
        reviews: [UserReview]
        blocked: Boolean!
    }

    type UserReview {
        id: Int!
        text: String!
        rating: Float!
        user: User!
        movie: Movie!
    }

    type Movie {
        id: Int!
        title: String!
        titleShort: String!
        overview: String!
        synopsis: String!
        release: String!
        released: Boolean!
        rating: String!
        genre: String!
        duration: Int
        director: String!
        resource: String!
    }

    type Query {
        users: [User]
        user(id: Int!): User
        userReviews: [UserReview]
        userReview(id: Int!): UserReview
        blockedUsers: [User]!
        getMovie(id: ID!): Movie
        listMovies: [Movie!]!
    }

    type Mutation {
        deleteUserReview(id: Int!): String!
        blockUser(id: Int!): User!
        unblockUser(id: Int!): User!
        createMovie(input: MovieInput!): Movie!
        updateMovie(id: Int!, input: MovieInput!): Movie!
    }

    input MovieInput {
        title: String
        titleShort: String
        overview: String
        synopsis: String
        release: String
        released: Boolean
        rating: String
        genre: String
        duration: Int
        director: String
        resource: String
    }    
`;

export default typeDefs;
