import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";

export default function NewTask({ navigation, route }) {
  const [description, setDescription] = useState("");
  
  function addTask() {
    const newTask = { id: Date.now(), description };
    route.params.addTask(newTask); // chama a função addTask da tela "Task" para atualizar a lista
    navigation.goBack(); // volta para a tela "Task"
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <TouchableOpacity 
        style={styles.buttonNewTask}
        onPress={addTask}
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

