import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Box, Button } from '@mui/material'
import PacientInfo from './subcomponents/PacientInfo'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, db } from '../../App'
import PacientMedicalRecord from './subcomponents/PacientMedicalRecord'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { signOut } from 'firebase/auth'
import PacientActivities from './subcomponents/PacientActivities'

import { auth } from '../../App'

const MedicalRecord = ({ isMedic }) => {
  let { id } = useParams()

  const [pacientData, setPacientData] = useState(null)
  const [activities, setActivities] = useState(null)
  const [reset, setReset] = useState(false)
  const [date, setDate] = useState(dayjs())

  const fetchPacient = async (pacientId) => {
    const pacientResponse = await getDoc(doc(db, 'pacients', pacientId))
    console.log(pacientResponse.data())
    setPacientData({ ...pacientResponse.data(), id: pacientResponse.id })

    const querySnapshot = await getDocs(
      collection(db, `pacients`, pacientId, 'activities')
    )
    const response = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      response.push({
        id: doc.id,
        ...doc.data(),
        startTime: dayjs.unix(doc.data().startTime.seconds),
      })
    })
    setActivities(response)
    console.log(response)
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (isMedic) {
      fetchPacient(id)
      return
    }
    if (!auth.currentUser) return
    fetchPacient(auth.currentUser.uid)
  }, [id, isMedic])

  useEffect(() => {
    if (!reset) return
    setReset(false)
    if (isMedic) {
      fetchPacient(id)
      return
    }
    if (!auth.currentUser) return
    fetchPacient(auth.currentUser.uid)
  }, [reset])

  const logOut = async () => {
    await signOut(auth)
  }

  const filterActivities = () => {
    if (!activities) return []
    return activities.filter((activity) =>
      activity.startTime.isSame(date, 'day')
    )
  }

  if (!pacientData) return

  return (
    <Grid container height={'100%'} width={'100vw'}>
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
            {isMedic
              ? `About ${pacientData.firstName} ${pacientData.lastName}`
              : `Hello ${pacientData.firstName} ${pacientData.lastName}`}
          </Typography>
        </Box>
        <PacientInfo pacient={pacientData} isMedic setReset={setReset} />
        <PacientMedicalRecord />
      </Grid>
      <Grid
        item
        xs={4}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        flexDirection={'column'}
      >
        <Button
          sx={{ alignSelf: 'flex-end', mr: 3 }}
          variant='outlined'
          startIcon={<LogoutIcon />}
          onClick={logOut}
        >
          <Typography variant={'subtitle1'} sx={{
            color: '#035270'
          }}>Log out</Typography>
        </Button>

        <Box
          sx={{
            backgroundColor: '#035270',
            maxHeight: '98vh',
            minHeight: '98vh',
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
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
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              width: '100%',
              overflow: 'auto',
              flexDirection: 'column',
              alignItems: 'center',
              pb: 4,
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <PacientActivities
                activities={filterActivities()}
                isMedic={isMedic}
              />
            </Box>
            <Box
              sx={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography sx={{ ml: 2 }} color={'#FFFFFF'}>
                {' '}
                Warnings
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  border: '1px solid white',
                  borderRadius: '25px',
                  boxSizing: 'border-box',
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default MedicalRecord
