import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Box, Button } from '@mui/material'
import PacientInfo from './subcomponents/PacientInfo'
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '../../App'
import PacientMedicalRecord from './subcomponents/PacientMedicalRecord'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { signOut } from 'firebase/auth'
import PacientActivities from './subcomponents/PacientActivities'
import LogoutIcon from '@mui/icons-material/Logout'
import PacientWarnings from './subcomponents/PacientWarnings'
import { useSnackbar } from 'notistack'

const MedicalRecord = ({ isMedic }) => {
  let { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const [pacientData, setPacientData] = useState(null)
  const [activities, setActivities] = useState(null)
  const [date, setDate] = useState(dayjs())

  const fetchPacient = async (pacientId) => {
    onSnapshot(doc(db, 'pacients', pacientId), (data) => {
      setPacientData({ ...data.data(), id: data.id })
    })

    const q = query(collection(db, `/pacients/${pacientId}/activities`))
    onSnapshot(q, (querySnapshot) => {
      const activitiesResponse = []
      querySnapshot.forEach((doc) => {
        activitiesResponse.push({
          ...doc.data(),
          startTime: dayjs(doc.data().startTime),
          id: doc.id,
        })
      })
      setActivities(activitiesResponse)
    })
  }

  const [raiseAlarm, setRaiseAlarm] = useState(false)

  useEffect(() => {
    if (raiseAlarm) {
      enqueueSnackbar('Please check you parameters, you have a warning', {
        variant: 'warning',
      })
    }
    setRaiseAlarm(false)
  }, [enqueueSnackbar, raiseAlarm])

  useEffect(() => {
    const alertsQuery = query(collection(db, `alerts`))
    onSnapshot(alertsQuery, (querySnapshot) => {
      const userId = isMedic ? id : auth.currentUser?.uid || 0
      querySnapshot.forEach(async (snapshot) => {
        if (snapshot.id === userId) {
          const sendAlarm = snapshot.data()?.sendAlarm
          console.log(sendAlarm)
          if (sendAlarm) {
            setRaiseAlarm(true)
            await updateDoc(doc(db, `alerts`, userId), {
              sendAlarm: false,
            })
          }
        }
      })
    })
  }, [id, isMedic])

  useEffect(() => {
    if (isMedic) {
      fetchPacient(id)
      return
    }
    if (!auth.currentUser) return
    fetchPacient(auth.currentUser.uid)
  }, [id, isMedic])

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
        <Box
          display={'flex'}
          width={'100%'}
          flexGrow={1}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography fontWeight={700} color={'#035270'} variant={'h4'}>
            {isMedic
              ? `About ${pacientData.firstName} ${pacientData.lastName}`
              : `Hello ${pacientData.firstName} ${pacientData.lastName}`}
          </Typography>
          <Button
            sx={{ mr: 10 }}
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
        <PacientInfo pacient={pacientData} isMedic />
        <PacientMedicalRecord
          userId={isMedic ? id : auth.currentUser?.uid || 0}
        />
      </Grid>
      <Grid
        item
        xs={4}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        flexDirection={'column'}
      >
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
                userId={isMedic ? id : auth.currentUser?.uid || 0}
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
              <PacientWarnings
                isMedic={isMedic}
                userId={isMedic ? id : auth.currentUser?.uid || 0}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default MedicalRecord
