import { gql } from "@apollo/client";

export const getArticles = gql`
  query GetArticles($book: String!) {
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
