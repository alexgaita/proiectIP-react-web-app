import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import PacientRow from './subcomponents/PacientRow'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import CreateModal from './subcomponents/CreateModal'
import { db } from '../../App'
import { collection, getDocs } from 'firebase/firestore'

const PacientsList = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [pacients, setPacients] = useState(null)
  const [reset, setReset] = useState(false)

  const fetchPacients = async () => {
    const querySnapshot = await getDocs(collection(db, 'pacients'))
    const response = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      response.push({ id: doc.id, ...doc.data() })
    })
    setPacients(response)
    console.log(response)
  }

  const handleOnClose = (reset) => {
    if (reset) setReset(true)
    setModalOpen(false)
  }

  useEffect(() => {
    fetchPacients()
  }, [])

  useEffect(() => {
    if (!reset) return
    fetchPacients()
    setReset(false)
  }, [reset])

  if (!pacients) return null
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {modalOpen && (
        <CreateModal open={modalOpen} handleOnClose={handleOnClose} />
      )}
      <Box display={'flex'} alignSelf={'flex-end'} mr={5}>
        <Button variant={'outlined'} startIcon={<LogoutIcon />}>
          <Typography variant={'subtitle1'}>Log out</Typography>
        </Button>
      </Box>
      <Box
        display={'flex'}
        width={'80%'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        pt={5}
      >
        <Typography>Add New Patient</Typography>
        <IconButton
          size="small"
          onClick={() => {
            setModalOpen(true)
          }}
        >
          <AddIcon sx={{ height: 40, width: 40 }} />
        </IconButton>
      </Box>
      <Grid
        xs={10}
        container
        className={'pacientsList'}
        sx={{
          border: '1px solid black',
          minHeight: '70%',
          maxHeight: '70%',
          padding: 5,
          backgroundColor: 'white',
          borderRadius: '10px',
          gap: 3,
          overflow: 'auto',
          boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
          opacity: 0.8,
        }}
        direction={'column'}
        wrap={'nowrap'}
      >
        {pacients.map((pacient) => (
          <PacientRow
            userId={pacient.id}
            firstName={pacient.firstName}
            lastName={pacient.lastName}
            age={pacient.age}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default PacientsList
