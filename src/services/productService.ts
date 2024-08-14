// src/services/productService.ts
import { db } from './firebaseConfig';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const saveProducts = async (products: Product[]) => {
  try {
    await db.collection('products').doc('allProducts').set({ products });
  } catch (error) {
    console.error('Failed to save products:', error);
  }
};

const loadProducts = async () => {
  try {
    const doc = await db.collection('products').doc('allProducts').get();
    if (doc.exists) {
      return doc.data()?.products || [];
    }
    return [];
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
};

export { saveProducts, loadProducts };
