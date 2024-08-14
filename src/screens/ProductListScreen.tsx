import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({ id: '', name: '', price: 0, quantity: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editingProduct.id ? { ...product, ...newProduct } : product
        )
      );
    } else {
      const productWithId = { ...newProduct, id: uuidv4() };
      setProducts(prevProducts => [...prevProducts, productWithId]);
    }
    setModalVisible(false);
    setNewProduct({ id: '', name: '', price: 0, quantity: 0 });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({ id: '', name: '', price: 0, quantity: 0 });
    setModalVisible(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddProduct} style={styles.addButton}>
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Nombre</Text>
          <Text style={styles.tableHeaderText}>Precio</Text>
          <Text style={styles.tableHeaderText}>Cantidad</Text>
          <Text style={styles.tableHeaderText}>Acciones</Text>
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleEditProduct(item)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</Text>
            <TextInput
              placeholder="Nombre del Producto"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Precio"
              value={newProduct.price ? newProduct.price.toString() : ''}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: parseFloat(text) || 0 })}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Cantidad"
              value={newProduct.quantity ? newProduct.quantity.toString() : ''}
              onChangeText={(text) => setNewProduct({ ...newProduct, quantity: parseInt(text, 10) || 0 })}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '30%',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
});

export default ProductListScreen;
