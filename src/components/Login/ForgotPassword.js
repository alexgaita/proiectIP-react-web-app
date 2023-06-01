import { useState } from 'react'
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  FormHelperText,
} from '@mui/material'

import { passwordReset } from '../../utils/firebase'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await passwordReset(email)
      setEmailMessage(true)
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found, try again!')
        setEmail('')
      }
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
      {emailMessage ? (
        <Grid item>
          <Typography variant="h3">
            The Email has been sent - Check your Inbox!
          </Typography>
        </Grid>
      ) : (
        <Grid item sx={{ justifyContent: 'space-around' }}>
          <FormControl variant="outlined">
            <TextField
              id="standard-basic"
              type="email"
              name="email"
              size="small"
              placeholder="name@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                color: 'whitesmoke',
                marginTop: '10%',
                backgroundColor: '#F27D70',
                '&:hover': {
                  backgroundColor: '#f69c76',
                  color: '#3c52b2',
                },
              }}
            >
              Reset Your Password
            </Button>
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
        </Grid>
      )}
    </Grid>
  )
}

export default ForgotPassword
