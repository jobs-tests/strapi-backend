import { gql } from 'apollo-server-koa';
export const typeDefs = gql`
    type Query {
        planets: [Planet]
        planet(id: Int!): Planet
        flights: [Flight]
        spaceCenters: [SpaceCenter]
        spaceCenter(uid: ID!): SpaceCenter
        flight(id: Int!) : Flight
    }

    type Planet {
        id: Int!
        name: String!
        code: String!
        spaceCenters(limit: Int): [SpaceCenter!]!
    }

    type Flight {
        id: Int!
        code: String!
        departure_at: String!
        seat_count: Int!
    }

    type SpaceCenter {
        id: Int!
        uid: ID!
        name: String!
        description: String!
        latitude: Float!
        longitude: Float!
        planet: Planet!
    }
`;
