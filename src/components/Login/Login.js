import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Grid, TextField, Typography, Button, Box, Link } from "@mui/material";
import { auth } from "../../App";

const LogIn = () => {
  const [inputFields, setInputFields] = useState([
    {
      email: "",
      password: "",
    },
  ]);
  const [error, setError] = useState(false);
  const logInWithEmailAndPassword = async () => {
    try {
      console.log(inputFields);
      await signInWithEmailAndPassword(
        auth,
        inputFields.email,
        inputFields.password
      );
      alert("Success!");
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <Grid
      container
      display="flex"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#C4D3D9"
      }}
    >
      <Grid
        item
        display="flex"
        flexDirection="column"
        sx={{
          border: "1px solid black",
          height: "70%",
          p: 2,
          borderRadius: "25px",
          backgroundColor: "whitesmoke"
        }}
        xs={4}
        justifyContent="space-around"
      >
        <Typography
          align="center"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "700",
            fontSize: "43px",
            color: "#035270",
            textShadow: "0px 4px 4px rgba(3, 90, 124, 0.5)",
          }}
        >
          LOGIN
        </Typography>
        <TextField
          id="standard-basic"
          label="Email"
          variant="outlined"
          size="small"
          helperText={error ? "Wrong credentials" : ""}
          error={error}
          sx={{background: "rgba(217, 217, 217, 0.5)", borderRadius: "10px"}}
          onChange={(event) => {
            setInputFields({ ...inputFields, email: event.target.value });
          }}
        ></TextField>
        <TextField
          id="standard-basic"
          type="password"
          label="Password"
          variant="outlined"
          size="small"
          error={error}
          sx={{background: "rgba(217, 217, 217, 0.5)", borderRadius: "10px"}}
          onChange={(event) => {
            setInputFields({ ...inputFields, password: event.target.value });
          }}
        ></TextField>
        <Link href="#" underline="none" sx={{ alignSelf: "flex-end", color:"#035270" }}>
          {"Forgot password?"}
        </Link>
        <Button
          variant="contained"
          onClick={logInWithEmailAndPassword}
          sx={{ color: "#035270", backgroundColor: "#F27D70",
          '&:hover': {
            backgroundColor: '#f69c76',
            color: '#3c52b2', }}}
        >
          Log In
        </Button>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{fontFamily: "sans-serif", fontStyle: "italic", fontWeight: "700", color: "#035270"}}>Don't you have a doctor account?</Typography>
          <Link href="#" underline="none" sx={{color:"#F27D70", fontFamily: "sans-serif", fontWeight: "700"}}>Create Account</Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LogIn;
