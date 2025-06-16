import { gql } from "@apollo/client";

export const getChapters = gql`
  query GetChapters($book: String!) {
    chapters(book: $book) {
      results {
        slug
        order
        name
        content
      }
    }
  }
`;
