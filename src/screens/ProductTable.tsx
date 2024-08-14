import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductTableProps {
  products: Product[];
  onEditProduct: (id: string, updatedProduct: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEditProduct, onDeleteProduct }) => {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSave = () => {
    if (editingProduct && editingProductId) {
      onEditProduct(editingProductId, editingProduct);
      setEditingProductId(null);
      setEditingProduct(null);
    }
  };

  return (
    <View>
      {products.map(product => (
        <View key={product.id} style={styles.productRow}>
          {editingProductId === product.id ? (
            <>
              <TextInput
                style={styles.input}
                value={editingProduct?.name}
                onChangeText={(text) =>
                  setEditingProduct(prevProduct => prevProduct ? { ...prevProduct, name: text } : null)
                }
              />
              <TextInput
                style={styles.input}
                value={editingProduct?.price.toString()}
                onChangeText={(text) =>
                  setEditingProduct(prevProduct => prevProduct ? { ...prevProduct, price: parseFloat(text) || 0 } : null)
                }
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={editingProduct?.quantity.toString()}
                onChangeText={(text) =>
                  setEditingProduct(prevProduct => prevProduct ? { ...prevProduct, quantity: parseInt(text) || 0 } : null)
                }
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.productText}>{product.name}</Text>
              <Text style={styles.productText}>${product.price}</Text>
              <Text style={styles.productText}>{product.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  setEditingProductId(product.id);
                  setEditingProduct(product);
                }}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteProduct(product.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  productText: {
    flex: 1,
    fontSize: 16,
  },
  buttonText: {
    color: 'blue',
  },
});

export default ProductTable;
