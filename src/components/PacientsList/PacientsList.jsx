import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import PacientRow from './subcomponents/PacientRow'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import CreateModal from './subcomponents/CreateModal'
import { db, auth } from '../../App'
import { collection, getDocs } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

const PacientsList = ({ isMedic }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [pacients, setPacients] = useState(null)

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

  const handleOnClose = () => {
    setModalOpen(false)
  }

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    fetchPacients()
  }, [])

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
        <CreateModal
          open={modalOpen}
          handleOnClose={handleOnClose}
          isMedic={isMedic}
        />
      )}
      <Box display={'flex'} alignSelf={'flex-end'} mr={5}>
        <Button
          sx={{ alignSelf: 'flex-end', mr: 3 }}
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={logOut}
        >
          <Typography
            variant={'subtitle1'}
            sx={{
              color: '#035270',
            }}
          >
            Log out
          </Typography>
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
          border: '1px solid rgba(217, 217, 217, 0.5)',
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
