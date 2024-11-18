import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const tratarRegistro = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError('Erro ao tentar registrar. Verifique os dados informados.');
    } else {
      setError('');
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Crie sua conta</Text>
      <Text style={styles.subheader}>Insira seus dados para registrar</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        theme={{ colors: { text: '#fff', placeholder: '#ccc', primary: '#1e90ff' } }}
      />
      <TextInput
        label="Senha"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{ colors: { text: '#fff', placeholder: '#ccc', primary: '#1e90ff' } }}
      />
      <TextInput
        label="Confirmar Senha"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        theme={{ colors: { text: '#fff', placeholder: '#ccc', primary: '#1e90ff' } }}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={tratarRegistro}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}
      >
        Criar Conta
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.textButton}
        labelStyle={{ color: '#1e90ff', fontSize: 14 }}
      >
        Voltar para Login
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#121212', // Fundo escuro
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // Cor clara para contraste
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#1e1e1e', // Fundo escuro para o campo de texto
  },
  button: {
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  textButton: {
    marginVertical: 5,
    alignSelf: 'center',
  },
  error: {
    color: '#ff5c5c',
    marginBottom: 12,
    textAlign: 'center',
  },
});
