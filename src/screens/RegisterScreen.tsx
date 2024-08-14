import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigationTypes';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = () => {
    // Lógica de registro aquí
    navigation.navigate('Welcome');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Registrarse</Text>
      <TextInput placeholder="Nombre" style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }} />
      <TextInput placeholder="Correo electrónico" style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }} />
      <TextInput placeholder="Contraseña" secureTextEntry style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }} />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
