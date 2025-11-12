
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getFinancialAdvice } from '../services/aiService';
import { getUserFinancialData } from '../services/userService';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      const userData = await getUserFinancialData();
      const aiResponse = await getFinancialAdvice(userData, input);

      setMessages([...newMessages, { text: aiResponse, sender: 'ai' }]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe tu mensaje..."
        />
        <Button title="Enviar" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  message: {
    marginVertical: 5,
  },
  userMessage: {
    textAlign: 'right',
    backgroundColor: '#dcf8c6',
    padding: 10,
    borderRadius: 10,
  },
  aiMessage: {
    textAlign: 'left',
    backgroundColor: '#f1f0f0',
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});

export default ChatScreen;
