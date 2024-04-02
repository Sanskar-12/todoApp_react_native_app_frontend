import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getMyProfile, verifyUser } from "../redux/action";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const verify = async () => {
    await dispatch(verifyUser(otp));
    dispatch(getMyProfile());
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
      <Text style={{ fontSize: 20, margin: 20 }}>VERIFICATION</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Enter your Otp"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
      </View>
      <Button disabled={!otp} style={styles.btn} onPress={verify}>
        <Text style={{ color: "#fff" }}>VERIFY</Text>
      </Button>

      <Text style={{ marginTop: 10, marginHorizontal: 50 }}>
        OTP will be sent to your mail
      </Text>

      <Text style={{ marginTop: 10, marginHorizontal: 50 }}>
        Note : Verify yourself within 5 minutes else your account will be
        deleted
      </Text>
    </View>
  );
};

export default Verify;

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
