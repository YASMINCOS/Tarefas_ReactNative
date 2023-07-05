import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";

const db = AsyncStorage;

export default function Task({ navigation, route }) {
  const [task, setTask] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await db.getItem('Tasks');
        if (tasks !== null) {
          setTask(JSON.parse(tasks));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  function deleteTask(id) {
    const updatedList = task.filter((item) => item.id !== id);
    db.setItem("Tasks", JSON.stringify(updatedList)).then(() => {
      setTask(updatedList);
    });
  }

  function addTask(newTask) {
    const updatedList = [...task, newTask];
    db.setItem("Tasks", JSON.stringify(updatedList)).then(() => {
      setTask(updatedList);
    });
  }

  function updateTask(updatedTask) {
    const updatedList = task.map((item) => {
      if (item.id === updatedTask.id) {
        return updatedTask;
      } else {
        return item;
      }
    });

    db.setItem("Tasks", JSON.stringify(updatedList)).then(() => {
      setTask(updatedList);
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({ item }) => {
          return (
            <View style={styles.Tasks}>
              <TouchableOpacity
                style={styles.deleteTask}
                onPress={() => {
                  deleteTask(item.id)
                }}
              >
                <FontAwesome
                  name="star"
                  size={23}
                  color="#F92e6A"
                >
                </FontAwesome>
              </TouchableOpacity>
              <Text
                style={styles.DescriptionTask}
                onPress={() =>
                  navigation.navigate("Details", {
                    id: item.id,
                    description: item.description,
                    updateTask: updateTask, // Passa a função updateTask como parâmetro
                  })
                }
              >
                {item.description}
              </Text>
            </View>
          )
        }}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate("New Task", { addTask, task })}
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>
    </View>
  )
}