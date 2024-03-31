import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/Entypo";
import { Dialog, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { addTask, getMyProfile } from "../redux/action";

const Home = ({ navigation }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { loading, message, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const addTaskHandler = async () => {
    await dispatch(addTask(title, description));
    dispatch(getMyProfile());
    handleDialog();
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch, alert]);

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.heading}>All Tasks</Text>
            {user?.tasks?.map((task) => (
              <Task
                key={task._id}
                title={task.title}
                description={task.description}
                status={task.completed}
                taskId={task._id}
              />
            ))}
          </SafeAreaView>
        </ScrollView>
        <TouchableOpacity style={styles.addBtn} onPress={handleDialog}>
          <Icon name="add-to-list" size={20} color={"#900"} />
        </TouchableOpacity>
      </View>
      <Dialog visible={openDialog} onDismiss={handleDialog}>
        <Dialog.Title>Add A Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button
              textColor="#900"
              onPress={addTaskHandler}
              disabled={!title || !description || loading}
            >
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
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
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});
