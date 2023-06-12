import React, { useState } from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import CreateModal from '../../PacientsList/subcomponents/CreateModal'

const PacientInfo = ({ pacient, isMedic }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOnClose = () => {
    setModalOpen(false)
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      height={'40%'}
      width={'90%'}
      alignItems={'flex-start'}
    >
      {modalOpen && (
        <CreateModal
          open={modalOpen}
          handleOnClose={handleOnClose}
          updateData={pacient}
          isMedic={isMedic}
        />
      )}
      <Typography pl={3} fontWeight={700} color={'#035270'} variant={'h6'}>
        Pacient Info
      </Typography>
      <Box
        display={'flex'}
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          borderRadius: '25px',
          border: '1px solid rgba(217, 217, 217, 0.5)',
          boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Box
          display={'flex'}
          flexGrow={1}
          sx={{ height: '100%' }}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'space-around'}
        >
          <Button onClick={() => setModalOpen(true)}>
            <Typography alignSelf={'flex-start'} variant={'subtitle2'}>
              Edit
            </Typography>
          </Button>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={'https://i.pravatar.cc/150'}
          />
          <Typography variant={'subtitle1'} fontWeight={700} color={'#035270'}>
            {`${pacient.firstName} ${pacient.lastName}`}
          </Typography>
          <Typography variant={'subtitle1'} fontWeight={700} color={'#F27D70'}>
            {pacient.age} years
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignSelf={'center'}
          sx={{ backgroundColor: 'black', height: '80%', width: '1px' }}
        ></Box>

        <Box
          display={'flex'}
          flexGrow={1}
          sx={{ height: '100%' }}
          flexDirection={'column'}
          justifyContent={'space-around'}
          pl={10}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}> CNP</Typography>
            <Typography color={'#F27D70'}> {pacient.cnp}</Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}> Phone Number</Typography>
            <Typography color={'#F27D70'}> {pacient.phoneNumber}</Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}> Email</Typography>
            <Typography color={'#F27D70'}> {pacient.email}</Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}> Workplace</Typography>
            <Typography color={'#F27D70'}> {pacient.workplace}</Typography>
          </Box>
        </Box>

        <Box
          display={'flex'}
          flexGrow={1}
          sx={{ height: '100%' }}
          flexDirection={'column'}
          justifyContent={'space-around'}
          pl={10}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}> Medical History</Typography>
            <Typography color={'#F27D70'}>
              {' '}
              {pacient.medicalHistory || 'No medical history '}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}>Allergies</Typography>
            <Typography color={'#F27D70'}>
              {' '}
              {pacient.allergies || 'No alergies '}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography color={'#919191'}> Last Appointment</Typography>
            <Typography color={'#F27D70'}> Not Yet implemented</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PacientInfo
