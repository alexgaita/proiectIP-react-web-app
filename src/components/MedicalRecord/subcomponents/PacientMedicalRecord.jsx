import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Modal,
  Grid,
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableBody,
  TableRow,
  TableHead,
} from '@mui/material'
import { Line } from 'react-chartjs-2'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../../App'
import dayjs from 'dayjs'
import 'chartjs-plugin-zoom'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Info Chart',
    },
  },
}

const labels_days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]
const labels_weeks = ['Week1', 'Week2', 'Week3', 'Week4']

const data_days = {
  labels: labels_days,
  datasets: [
    {
      label: 'EKG',
      data: [100, 200, 10, 40, 50, 90, 175],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

const data_weeks = {
  labels: labels_weeks,
  datasets: [
    {
      label: 'EKG',
      data: [180, 200, 170, 110],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

const PacientMedicalRecord = () => {
  const [open, setOpen] = React.useState(false)
  const [option, setOption] = useState('days')
  const [measurements, setMeasurements] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderChart = () => {
    const dataForToday = measurements
      .filter((obj) => dayjs().diff(obj.date, 'hours') < 12)
      .sort((a, b) => a.date.diff(b.date, 'second'))

    console.log('today data', dataForToday)

    let labels = []
    let temperatureData = []
    let humidityData = []

    dataForToday.forEach((data) => {
      const { date, temperature, humidity } = data
      const dateFormat = date.format('HH:mm')
      if (labels.find((label) => label === dateFormat)) {
        return
      }
      labels.push(date.format('HH:mm'))
      temperatureData.push(temperature)
      humidityData.push(humidity)
    })

    labels = [...new Set(labels)]
    console.log(labels)

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Temperature',
          data: temperatureData,
          borderColor: 'rgb(255, 99, 10)',
          backgroundColor: 'rgba(255, 99, 10, 0.5)',
        },
        {
          label: 'Humidity',
          data: humidityData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }

    return <Line options={options} data={chartData} />
  }

  useEffect(() => {
    const q = query(
      collection(db, '/pacients/06aa58f2-9b72-4314-acbb-4237c995e533/measure'),
      orderBy('date', 'desc')
    )
    onSnapshot(q, (querySnapshot) => {
      const measures = []
      querySnapshot.forEach((doc) => {
        measures.push({ ...doc.data(), date: dayjs(doc.data().date) })
      })
      setMeasurements(measures)
      console.log('Current measurements', measures)
    })
  }, [])

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ]

  const body = (
    <Grid
      container
      display="flex"
      sx={{
        backgroundColor: 'white',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        borderRadius: '10px',
        padding: 3,
        pl: 5,
        pr: 5,
        borderSizing: 'border-box',
        overflow: 'auto',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Grid
        item
        display="flex"
        sx={{
          gap: 3,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100%',
        }}
      >
        <Typography variant="h4" sx={{ color: '#035270' }}>
          All Data
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
      <Box
        display={'flex'}
        height={'40%'}
        width={'90%'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        pt={2}
      >
        <Box
          sx={{
            display: 'flex',
            width: '60%',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            pl={3}
            fontWeight={700}
            color={'#035270'}
            variant={'h6'}
            sx={{ alignSelf: 'flex-end' }}
          >
            Medical Record
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              marginBottom: 1,
              maxWidth: '50%',
              color: 'whitesmoke',
              backgroundColor: '#F27D70',
              '&:hover': {
                backgroundColor: '#f69c76',
                color: '#3c52b2',
              },
            }}
          >
            All data
          </Button>
        </Box>
        <Box display={'flex'} width={'100%'} height={'80%'} gap={3}>
          <Box
            display={'flex'}
            flexGrow={1}
            sx={{
              border: '1px solid #919191',
              borderRadius: '15px',
              boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
              minWidth: '45%',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Line options={options} data={data_days} /> */}
            {renderChart()}
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            flexGrow={1}
            sx={{
              border: '1px solid #919191',
              borderRadius: '15px',
              boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
            alignItems={'flex-start'}
            p={2}
          >
            <Typography
              fontWeight={700}
              fontSize={'20px'}
              color={'#F27D70'}
              variant={'h6'}
            >
              Temperature
            </Typography>
            <Box
              display={'flex'}
              width={'100%'}
              height={100}
              sx={{
                border: '1px solid rgba(3, 82, 112, 0.45)',
                borderRadius: '10px',
              }}
            >
              <Box
                display={'flex'}
                flexGrow={0.5}
                flexDirection={'column'}
                alignItems={'flex-start'}
                justifyContent={'center'}
                pl={2}
                sx={{
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(3, 90, 124, 0.63)',
                  borderRadius: '10px',
                  maxWidth: 120,
                  minWidth: 120,
                }}
              >
                <Typography fontWeight={700} color={'#D9D9D9'}>
                  Now
                </Typography>
                <Typography fontSize={20} fontWeight={700} color={'#D9D9D9'}>
                  {measurements[0]?.temperature || 0}°C
                </Typography>
              </Box>
              <Box display={'flex'} flexGrow={3} flexDirection={'column'}>
                {measurements.slice(1, 4).map((data) => {
                  return (
                    <Typography color={'#025372'}>
                      {data?.temperature || 0} °C -{' '}
                      {dayjs().diff(dayjs(data.date), 'minute') > 60
                        ? dayjs().diff(dayjs(data.date), 'hour') + ' hours ago'
                        : dayjs().diff(dayjs(data.date), 'minute') +
                          ' mins ago'}
                    </Typography>
                  )
                })}
              </Box>
            </Box>
            <Typography
              fontWeight={700}
              fontSize={'20px'}
              color={'#F27D70'}
              variant={'h6'}
            >
              Pulse
            </Typography>
            <Box
              display={'flex'}
              width={'100%'}
              height={100}
              sx={{
                border: '1px solid rgba(3, 82, 112, 0.45)',
                borderRadius: '10px',
              }}
            >
              <Box
                display={'flex'}
                flexGrow={0.5}
                flexDirection={'column'}
                alignItems={'flex-start'}
                justifyContent={'center'}
                pl={2}
                sx={{
                  boxSizing: 'border-box',
                  backgroundColor: 'rgba(3, 90, 124, 0.63)',
                  borderRadius: '10px',
                  maxWidth: 120,
                  minWidth: 120,
                }}
              >
                <Typography fontWeight={700} color={'#D9D9D9'}>
                  Now
                </Typography>
                <Typography fontSize={20} fontWeight={700} color={'#D9D9D9'}>
                  {measurements[0]?.pulse || 0} bpm
                </Typography>
              </Box>
              <Box display={'flex'} flexGrow={3} flexDirection={'column'}>
                {measurements.slice(1, 4).map((data) => {
                  return (
                    <Typography color={'#025372'}>
                      {data?.pulse || 0} bpm -{' '}
                      {dayjs().diff(dayjs(data.date), 'minute') > 60
                        ? dayjs().diff(dayjs(data.date), 'hour') + ' hours ago'
                        : dayjs().diff(dayjs(data.date), 'minute') +
                          ' mins ago'}
                    </Typography>
                  )
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PacientMedicalRecord
