const { buildSchema } = require("graphql");

//Schema for GraphQL API
var Schema = buildSchema(`

type LexicalCategory {
    id: String
    text: String
  }
  
  type Subsenses {
    id: String
    examples: [Examples]
    definitions: [String]
  }
  
  type Notes {
    text: String
    type: String
  }
  
  type Examples {
    text: String
    notes: [Notes]
  }
  
  type Senses {
    id: String
    subsenses: [Subsenses]
    examples: [Examples]
    definitions: [String]
  }
  
  type Entries {
    senses: [Senses]
  }
  
  type LexicalEntries {
    language: String
    text: String
    lexicalCategory: LexicalCategory
    entries: [Entries]
  }
  
  type Results {
    id: String
    language: String
    type: String
    lexicalEntries: [LexicalEntries]
  }

type wordType{
    _id: ID!
    word: String!
    results:[Results]
}

type RootQuery{
    words: [wordType]
}
type RootMutation{
    addWord(word: String):wordType
}
schema{
    query: RootQuery
    mutation: RootMutation
}
`);

//exporting Schema
module.exports = Schema;