import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import CameraComponent from "./screens/CameraComponent";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "./redux/action";
import Loading from "./components/Loading";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={CameraComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;
