import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Modal, Grid } from '@mui/material'
import { Line } from 'react-chartjs-2'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore'
import { auth, db } from '../../../App'
import dayjs from 'dayjs'
import 'chartjs-plugin-zoom'
import { DataGrid } from '@mui/x-data-grid'
import { v4 as uuidv4 } from 'uuid'

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

const PacientMedicalRecord = ({ userId }) => {
  const [open, setOpen] = React.useState(false)
  const [measurements, setMeasurements] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderChart = () => {
    const dataForToday = measurements
      .filter((obj) => obj.date.isSame(dayjs(), 'day'))
      .sort((a, b) => a.date.diff(b.date, 'second'))

    let labels = []
    let temperatureData = []
    let humidityData = []
    let ekgData = []
    let pulseData = []

    dataForToday.forEach((data) => {
      const { date, temperature, humidity, ekg, pulse } = data
      const dateFormat = date.format('HH:mm')
      if (labels.find((label) => label === dateFormat)) {
        return
      }
      labels.push(date.format('HH:mm'))
      temperatureData.push(temperature)
      ekgData.push(ekg)
      pulseData.push(pulse)
      humidityData.push(humidity)
    })

    labels = [...new Set(labels)]

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Temperature',
          data: temperatureData,
          borderColor: 'rgb(255, 99, 10)',
          backgroundColor: 'rgba(255, 99, 10, 0.5)',
          hidden: true,
        },
        {
          label: 'Humidity',
          data: humidityData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          hidden: true,
        },
        {
          label: 'EKG',
          data: ekgData,
          borderColor: 'rgb(15, 10, 222)',
          backgroundColor: 'rgba(15, 10, 222, 0.5)',
        },
        {
          label: 'Pulse',
          data: pulseData,
          borderColor: 'rgb(255, 99, 71)',
          backgroundColor: 'rgba(255, 99, 71, 0.5)',
          hidden: true,
        },
      ],
    }

    return <Line options={options} data={chartData} />
  }

  useEffect(() => {
    const q = query(
      collection(db, `/pacients/${userId}/measure`),
      orderBy('date', 'desc')
    )
    onSnapshot(q, (querySnapshot) => {
      const measures = []
      querySnapshot.forEach((doc) => {
        measures.push({ ...doc.data(), date: dayjs(doc.data().date) })
      })
      setMeasurements(measures)
    })
  }, [userId])

  const columns = [
    { field: 'reading', headerName: 'Reading', width: 300, paddingLeft: 50 },
    { field: 'date', headerName: 'Time', width: 200 },
  ]

  const addUnit = (key) => {
    if (key === 'temperature') {
      return ' °C'
    }
    if (key === 'pulse') {
      return ' bpm'
    }
    return ''
  }

  const renderAllDataBody = () => {
    console.log('measurements', measurements)

    let rowData = {}
    measurements.forEach((entry) => {
      const { date, ...sensorData } = entry

      Object.keys(sensorData).forEach((key) => {
        if (rowData[key]) {
          rowData[key].push({
            id: uuidv4(),
            date: date.format('YYYY-MM-DD hh:mm a'),
            reading: sensorData[key] + addUnit(key),
          })
        } else {
          rowData[key] = []
          rowData[key].push({
            id: uuidv4(),
            date: date.format('YYYY-MM-DD hh:mm a'),
            reading: sensorData[key] + addUnit(key),
          })
        }
      })
    })

    console.log(rowData)

    return (
      <Box
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
          alignItems: 'center',
          overflow: 'auto',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: '#035270' }}>
          All Data
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 10,
            width: '100%',
            gridTemplateColumns: 'repeat(2, 1fr)',
            mb: 10,
          }}
        >
          {Object.keys(rowData).map((key) => {
            if (!rowData[key]) return null

            return (
              <Box sx={{ height: 400 }}>
                <Typography
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    pb: 2,
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  {key} Data
                </Typography>
                <DataGrid
                  rows={rowData[key]}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </Box>
            )
          })}
        </Box>

        {/*{Object.keys(rowData).map((key) => {*/}
        {/*  if (!rowData[key]) return null*/}

        {/*  return (*/}

        {/*  )*/}
        {/*})}*/}
      </Box>
    )
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {renderAllDataBody()}
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
              <Box
                pl={1}
                pr={1}
                display={'flex'}
                flexGrow={3}
                flexDirection={'column'}
              >
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
