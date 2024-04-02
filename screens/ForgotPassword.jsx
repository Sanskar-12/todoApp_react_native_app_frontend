import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/action";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.update);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    await dispatch(forgotPassword(email));
    navigation.navigate("resetpassword");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>FORGOT PASSWORD</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button
        disabled={!email || loading}
        loading={loading}
        style={styles.btn}
        onPress={submitHandler}
      >
        <Text style={{ color: "#fff" }}>SEND EMAIL</Text>
      </Button>

      <Text style={{ marginTop: 10, marginHorizontal: 50 }}>
        Reset Password OTP will be sent to your mail
      </Text>

      <Text style={{ marginTop: 10, marginHorizontal: 50 }}>
        Note : Reset your password within 5 minutes else your OTP will be
        expired
      </Text>
    </View>
  );
};

export default ForgotPassword;

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
