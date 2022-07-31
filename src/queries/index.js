const { buildSubgraphSchema } = require("@apollo/subgraph");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

exports.queryschema = buildSubgraphSchema({
  typeDefs,
  resolvers,
});
