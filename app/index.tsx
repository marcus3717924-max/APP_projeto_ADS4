import { Redirect } from 'expo-router';

// Este arquivo redireciona automaticamente para a tela de login
export default function Index() {
  return <Redirect href="/login" />;
}