import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Box, Button, Divider } from '@mui/material'
import PacientInfo from './subcomponents/PacientInfo'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../App'
import PacientMedicalRecord from './subcomponents/PacientMedicalRecord'
import LogoutIcon from '@mui/icons-material/Logout'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const MedicalRecord = () => {
  let { id } = useParams()
  const [pacientData, setPacientData] = useState(null)

  const fetchPacient = async () => {
    const pacientResponse = await getDoc(doc(db, 'pacients', id))
    setPacientData(pacientResponse.data())
  }

  useEffect(() => {
    fetchPacient()
  }, [])

  const renderActivity = () => {
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{
          height: 50,
          width: '100%',
          gap: 3,
          ml: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'red',
            width: '4px',
            height: '80%',
            borderRadius: '25px',
          }}
        />
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
        >
          <Typography color={'white'} fontWeight={700}>
            Run
          </Typography>
          <Typography color={'white'}>Duration: 10mins</Typography>
        </Box>
      </Box>
    )
  }

  if (!pacientData) return

  return (
    <Grid container height={'100vh'} width={'100vw'}>
      <Grid
        item
        xs={8}
        sx={{ boxSizing: 'border-box' }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        pl={10}
      >
        <Box display={'flex'} flexGrow={1} alignItems={'center'}>
          <Typography fontWeight={700} color={'#035270'} variant={'h4'}>
            Hello Gaita
          </Typography>
        </Box>
        <PacientInfo pacient={pacientData} />
        <PacientMedicalRecord />
      </Grid>
      <Grid
        item
        xs={4}
        heigh={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        flexDirection={'column'}
      >
        <Button
          sx={{ alignSelf: 'flex-end', mr: 3 }}
          variant={'text'}
          startIcon={<LogoutIcon />}
        >
          <Typography variant={'subtitle1'}>Log out</Typography>
        </Button>
        <Box
          sx={{
            backgroundColor: '#035270',
            height: '90%',
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            borderTopLeftRadius: '25px',
            borderTopRightRadius: '25px',
            gap: 3,
            overflow: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <Box display={'flex'} width={'100%'} alignItems={'center'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  mt: 2,
                }}
                defaultValue={dayjs('2022-04-17')}
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              pl: 2,
              pr: 2,
              flexGrow: 1,
              height: '10%',
              width: '100%',
              boxSizing: 'border-box',
              overflow: 'auto',
            }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Typography sx={{ ml: 2 }} color={'#FFFFFF'}>
              {' '}
              Activities
            </Typography>
            <Box
              sx={{
                width: '100%',
                border: '1px solid white',
                borderRadius: '25px',
                boxSizing: 'border-box',
              }}
            >
              {renderActivity()}
              {renderActivity()}
              {renderActivity()}
              {renderActivity()}
            </Box>
            <Typography sx={{ ml: 2 }} color={'#FFFFFF'}>
              {' '}
              Activities
            </Typography>
            <Box
              sx={{
                width: '100%',
                border: '1px solid white',
                borderRadius: '25px',
                boxSizing: 'border-box',
              }}
            >
              {renderActivity()}
              {renderActivity()}
              {renderActivity()}
              {renderActivity()}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default MedicalRecord
