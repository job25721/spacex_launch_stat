const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const axios = require("axios");

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: Rocket },
  }),
});

//Rocket Type
const Rocket = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});
const baseURL = "https://api.spacexdata.com/v3";
//Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType), //returnType [] listof [{}]
      resolve: async () => {
        return (await axios.get(`${baseURL}/launches`)).data;
      },
    },
    launch: {
      type: LaunchType, //returnType {}
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        return (await axios.get(`${baseURL}/launches/${args.flight_number}`))
          .data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
