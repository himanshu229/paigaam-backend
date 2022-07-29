const { mergeTypeDefs } = require("@graphql-tools/merge");
const authUserScema = require("./authUserScema");

const types = [authUserScema];

module.exports = mergeTypeDefs(types);
