import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const THEME = {
  padding: 20,
  radius: 20,
  primaryColor: "#0c2d68",
  darkPrimary: "#124389",
  dodgerBlue: "#6FD2FA",
  red: "#FA3D62",
  secondaryColor: "#9ee9fc",
  white: "#fff",
  lightWhite: "rgba(0,0,0,.0)",
  width,
  height,
};

export default THEME;
