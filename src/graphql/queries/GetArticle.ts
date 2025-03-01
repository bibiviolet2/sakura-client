import { gql } from "@apollo/client";

export const getArticle = gql`
  query GetArticle($slug: String!) {
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
