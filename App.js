import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function App() {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fazendo a requisição para a API que está rodando em http://localhost:5000/messages
        const response = await axios.get('http://localhost:5000/messages');
        console.log('Response:', response.data); // Verifique a resposta no console
        setMessages(response.data); // Atualizando o estado com os dados da API
      } catch (error) {
        console.error("Erro ao buscar as mensagens: ", error); // Se houver erro, será impresso aqui
      }
    };

    fetchMessages();
  }, []); // UseEffect com array vazio para rodar uma vez

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.rightSection}>
        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerWrapper}>
        <View style={styles.blueShape} />
        <View style={styles.mailIconContainer}>
          <View style={styles.mailCircle}>
            <Ionicons name="mail-outline" size={24} color="#3b5bfd" />
          </View>
        </View>
        <Text style={styles.headerTitle}>Messages & Chat</Text>
      </View>

      {/* Lista de mensagens */}
      <FlatList
        data={messages} // Passando as mensagens que foram recebidas pela API
        keyExtractor={(item) => item.id.toString()} // Convertendo o id para string, caso seja número
        renderItem={renderItem} // Função que renderiza cada item
        contentContainerStyle={styles.messageList} // Estilos do container
      />

      {/* Rodapé */}
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="#2f3e75" />
        <Ionicons name="chatbubble-ellipses" size={24} color="#2f3e75" />
        <Ionicons name="notifications-outline" size={24} color="#2f3e75" />
        <Ionicons name="person-outline" size={24} color="#2f3e75" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
  },
  headerWrapper: {
    backgroundColor: '#f9f9fb',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  blueShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: 160,
    backgroundColor: '#3b5bfd',
    borderBottomRightRadius: 160,
    zIndex: -1,
  },
  mailIconContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  mailCircle: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f3e75',
    alignSelf: 'center',
    marginTop: 30,
  },
  messageList: {
    padding: 10,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  messageText: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  message: {
    color: '#666',
    fontSize: 14,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#3b5bfd',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});
