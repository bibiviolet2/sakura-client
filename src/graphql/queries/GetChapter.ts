import { gql } from "@apollo/client";

export const getChapter = gql`
  query GetChapter($slug: String!) {
    chapter(slug: $slug) {
      results {
        slug
        order
        name
        content
      }
    }
  }
`;
