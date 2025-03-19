import { gql } from "@apollo/client";

export const getBook = gql`
  query GetBook($slug: String!) {
    book(slug: $slug) {
		results {
			slug
			name
			type
		}
  	}
  }
`;
