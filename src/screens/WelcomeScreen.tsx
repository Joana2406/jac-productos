import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <View style={styles.loader}></View>
        <View style={styles.loader}></View>
        <View style={styles.loader}></View>
        <View style={styles.loader}></View>
        <View style={styles.loader}></View>
      </View>
      <Text style={styles.title}>Bienvenido a JAC</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loaderContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  loader: {
    width: 20,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#5d9960',
    margin: 5, // Para separar los elementos de carga
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 0 }, // Offset de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra
    shadowRadius: 5, // Radio de la sombra
  },
  title: {
    fontSize: 24,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WelcomeScreen;
