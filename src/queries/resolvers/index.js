const { mergeResolvers } = require("@graphql-tools/merge");
const authUserResolver = require("./authUserResolver");

const resolvers = [authUserResolver];

module.exports = mergeResolvers(resolvers);
