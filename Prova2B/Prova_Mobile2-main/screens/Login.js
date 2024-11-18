import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const tratarLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email ou senha incorretos. Por favor, tente novamente.');
    } else {
      setError('');
      alert('Login realizado com sucesso!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bem-vindo!</Text>
      <Text style={styles.subheader}>Faça login para continuar</Text>

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
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={tratarLogin}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}
      >
        Entrar
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Cadastro')}
        style={styles.textButton}
        labelStyle={{ color: '#1e90ff', fontSize: 14 }}
      >
        Cadastro
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
    color: '#fff', // Texto claro para contraste
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
    backgroundColor: '#1e1e1e', // Fundo escuro nos inputs
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
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },
});
