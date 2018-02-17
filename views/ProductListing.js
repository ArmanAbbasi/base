import React from 'react';

const ProductListing = ({ products }) => (
  <section>
    {
      products.map(product => (
        <div key={ product.id }>{ product.name.en }</div>
      ))
    }
  </section>
);

export default ProductListing;