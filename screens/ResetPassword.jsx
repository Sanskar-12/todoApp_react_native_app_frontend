import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/action";

const ResetPassword = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { loading } = useSelector((state) => state.update);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    await dispatch(resetPassword(otp, newPassword));
    navigation.navigate("login");
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
      <Text style={{ fontSize: 20, margin: 20 }}>RESET PASSWORD</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <Button
        disabled={!otp || !newPassword || loading}
        loading={loading}
        style={styles.btn}
        onPress={submitHandler}
      >
        <Text style={{ color: "#fff" }}>RESET PASSWORD</Text>
      </Button>
    </View>
  );
};

export default ResetPassword;

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
