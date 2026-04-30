import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';

// API de producción en Vercel
const API_URL = 'https://banca-en-linea-a2af7rkw5-conni777s-projects.vercel.app/api';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Nota: En una app real usaríamos el token guardado en el storage
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simulación de credenciales para la captura de pantalla
      const headers = {
        'Authorization': 'Bearer SIMULATED_TOKEN',
        'Content-Type': 'application/json'
      };

      // Obtener Saldo
      const userRes = await fetch(`${API_URL}/auth/me`, { headers });
      const user = await userRes.json();
      
      // Obtener Movimientos
      const txRes = await fetch(`${API_URL}/transacciones`, { headers });
      const txs = await txRes.json();

      setUserData(user);
      setTransactions(txs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#39FF14" />
        <Text style={styles.loadingText}>CONECTANDO A CYBER-BANCA...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.welcome}>BIENVENIDO, {userData?.nombre?.toUpperCase()}</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.label}>SALDO DISPONIBLE</Text>
          <Text style={styles.amount}>
            $ {userData?.saldo?.toLocaleString('es-CL')}
          </Text>
        </View>
      </View>

      <View style={styles.history}>
        <Text style={styles.historyTitle}>ÚLTIMOS MOVIMIENTOS</Text>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.txItem}>
              <View>
                <Text style={styles.txType}>{item.tipo}</Text>
                <Text style={styles.txDate}>{new Date(item.fecha).toLocaleDateString()}</Text>
              </View>
              <Text style={[styles.txAmount, item.monto > 0 ? styles.positive : styles.negative]}>
                {item.monto > 0 ? '+' : ''}{item.monto.toLocaleString('es-CL')}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No hay transacciones recientes.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  loadingText: {
    color: '#39FF14',
    marginTop: 20,
    fontFamily: 'monospace',
  },
  header: {
    padding: 20,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: '#39FF1433',
  },
  welcome: {
    color: '#39FF14',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 1,
  },
  balanceCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#39FF1444',
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 5,
  },
  amount: {
    color: '#39FF14',
    fontSize: 32,
    fontWeight: 'bold',
  },
  history: {
    flex: 1,
    padding: 20,
  },
  historyTitle: {
    color: '#39FF14',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  txItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff11',
  },
  txType: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  txDate: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positive: {
    color: '#39FF14',
  },
  negative: {
    color: '#FF003C',
  },
  empty: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  }
});
