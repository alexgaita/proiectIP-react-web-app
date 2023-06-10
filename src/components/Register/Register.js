import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Grid, TextField, Typography, Button } from '@mui/material'
import { auth, db } from '../../App'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const [inputFields, setInputFields] = useState([
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  ])
  const [error, setError] = useState(false)

  const addAdminClaim = async (userId) => {
    await setDoc(doc(db, 'doctors', userId), {
      admin: true,
      name: inputFields.name,
      gender: true,
      info: 'Cardiologie',
    })
  }

  const registerWithEmailAndPassword = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        inputFields.email,
        inputFields.password
      )
      console.log(user.user)
      await addAdminClaim(user.user.uid)
      await signInWithEmailAndPassword(
        auth,
        inputFields.email,
        inputFields.password
      )
    } catch (err) {
      setError(true)
      console.error(err)
    }
  }

  return (
    <Grid
      container
      display="flex"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Grid
        item
        display="flex"
        flexDirection="column"
        sx={{
          height: '70%',
          p: 2,
          borderRadius: '25px',
          backgroundColor: 'whitesmoke',
          border: '1px solid rgba(217, 217, 217, 0.5)',
          boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
        xs={4}
        justifyContent="space-around"
      >
        <Typography
          align="center"
          sx={{
            fontFamily: 'sans-serif',
            fontWeight: '700',
            fontSize: '43px',
            color: '#035270',
            textShadow: '0px 2px 2px rgba(3, 90, 124, 0.5)',
          }}
        >
          CREATE ACCOUNT
        </Typography>
        <TextField
          id="standard-basic"
          label="Name"
          variant="outlined"
          size="small"
          helperText={error ? 'Wrong credentials' : ''}
          error={error}
          onChange={(event) => {
            setInputFields({ ...inputFields, name: event.target.value })
          }}
        ></TextField>
        <TextField
          id="standard-basic"
          label="Email"
          variant="outlined"
          size="small"
          helperText={error ? 'Wrong credentials' : ''}
          error={error}
          onChange={(event) => {
            setInputFields({ ...inputFields, email: event.target.value })
          }}
        ></TextField>
        <TextField
          id="standard-basic"
          type="password"
          label="Password"
          variant="outlined"
          size="small"
          error={error}
          onChange={(event) => {
            setInputFields({ ...inputFields, password: event.target.value })
          }}
        ></TextField>
        <TextField
          id="standard-basic"
          type="password"
          label="Confirm password"
          variant="outlined"
          size="small"
          error={error}
          onChange={(event) => {
            setInputFields({
              ...inputFields,
              confirmPassword: event.target.value,
            })
          }}
        ></TextField>
        <div align="center">
          {inputFields.password === inputFields.confirmPassword ? (
            <Button
              variant="contained"
              onClick={registerWithEmailAndPassword}
              sx={{
                color: '#035270',
                backgroundColor: '#F27D70',
                '&:hover': {
                  backgroundColor: '#f69c76',
                  color: '#3c52b2',
                },
              }}
            >
              Register
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled
              sx={{
                color: '#035270',
                backgroundColor: '#F27D70',
                '&:hover': {
                  backgroundColor: '#f69c76',
                  color: '#3c52b2',
                },
              }}
            >
              Register
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default Register
