import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/Entypo";

const Home = ({ navigation }) => {
  const tasks = [
    {
      title: "Task 1",
      description: "Sample Task 1",
      completed: false,
      _id: "sdfsdfsdfsdf",
    },
    {
      title: "Task 2",
      description: "Sample Task 2",
      completed: true,
      _id: "sdfsdsdfsdfsdfsdf",
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <Text style={styles.heading}>All Tasks</Text>
        {tasks.map((task) => (
          <Task
            key={task._id}
            title={task.title}
            description={task.description}
            status={task.completed}
            taskId={task._id}
          />
        ))}

        <TouchableOpacity style={styles.addBtn}>
          <Icon name="add-to-list" size={20} color={"#900"} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
});
