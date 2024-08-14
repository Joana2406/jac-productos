import React, { useEffect } from 'react';
import { saveProducts } from 'services/productService'; // Ajusta la ruta según la ubicación del archivo

const ProductComponent = () => {
  useEffect(() => {
    const products = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 },
    ];

    saveProducts(products);
  }, []);

  return <div>Check the console for results.</div>;
};

export default ProductComponent;
