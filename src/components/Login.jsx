import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Welcome to To-Do App
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please log in to manage your tasks.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(login())}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
