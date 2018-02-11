import gql from 'graphql-tag';

export default ({ tag, contentId }) => gql`
  query productListing {
    content: rangeById(id: "${contentId}") {
      seo {
        title
        description
      }
    }
    products: productsByTag(tag: "${tag}") {
      id
      name
      displayContent {
        title
        excerpt
        bulletPointsDescription
      }
    }
  }
`;