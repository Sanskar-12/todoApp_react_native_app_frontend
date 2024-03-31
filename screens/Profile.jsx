import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile, logoutUser, updateProfile } from "../redux/action";
import mime from "mime";

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { message, error } = useSelector((state) => state.update);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar.url);

  const handleImage = () => {
    navigation.navigate("camera", { updateProfile: true });
  };
  const submitHandler = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    await dispatch(updateProfile(formData));
    dispatch(getMyProfile());
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (route?.params) {
      console.log(route.params.image);

      if (route?.params?.image) {
        setAvatar(route?.params?.image);
      }
    }
  }, [route]);

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error, message]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{
          backgroundColor: "#900",
        }}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900", margin: 20 }}>Change Photo</Text>
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button style={styles.btn} onPress={submitHandler}>
        <Text style={{ color: "#fff" }}>UPDATE</Text>
      </Button>
      <Button
        textColor="rgb(50,50,50)"
        onPress={() => navigation.navigate("changepassword")}
      >
        <Text>CHANGE PASSWORD</Text>
      </Button>
      <Button textColor="rgb(50,50,50)" onPress={logoutHandler}>
        <Text>LOGOUT</Text>
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
