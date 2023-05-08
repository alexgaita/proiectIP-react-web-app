import { Avatar, Box, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PacientRow = ({ userId, firstName, lastName, age }) => {
  const navigate = useNavigate()
  return (
    <Grid
      key={userId}
      item
      sx={{
        border: '0.5px solid black',
        minHeight: 75,
        borderRadius: '5px',
        '&:hover': {
          border: '1px solid blue',
        },
      }}
      justifyContent={'center'}
      alignItems={'center'}
      onClick={() => navigate(`/pacients/${userId}`)}
    >
      <Grid container pt={1} spacing={2} alignItems={'center'}>
        <Grid item xs={1} ml={2}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            src={'https://i.pravatar.cc/150'}
          />
        </Grid>
        <Grid item>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}
          >
            <Typography sx={{ fontSize: '20px', color: '#035270' }}>
              {firstName + ' ' + lastName}
            </Typography>
            <Typography>{age} ani</Typography>
          </Box>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto' }}>
          <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PacientRow
