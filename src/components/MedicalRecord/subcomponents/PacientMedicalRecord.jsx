import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Modal,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { Line } from 'react-chartjs-2'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'EKG Chart',
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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderChart = () => {
    if (option === 'days') {
      return <Line options={options} data={data_days} />
    }
    if (option === 'weeks') {
      return <Line options={options} data={data_weeks} />
    }
  }

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
        width: '30%',
        height: '30%',
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
          height: '100%'
        }}
      >
        <FormControl sx={{alignItems: 'center'}}>
          <FormLabel id="demo-controlled-radio-buttons-group" sx={{marginBottom: 4}}>
            <Typography variant='h4' sx={{color:'#035270'}}>Choose an option</Typography>
            
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={option}
            onChange={(event) => {
              setOption(event.target.value)
            }}
            
          >
            <Box display='flex' gap={3}>
              <FormControlLabel value="days" control={<Radio />} label={ <Typography  sx={{fontSize: '20px'}}>Days</Typography>} />
              <FormControlLabel
                value="weeks"
                control={<Radio />}
                label={ <Typography  sx={{fontSize: '20px'}}>Weeks</Typography>}
              />
            </Box>
          </RadioGroup>
        </FormControl>
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
        <Typography pl={3} fontWeight={700} color={'#035270'} variant={'h6'}>
          Medical Record
        </Typography>
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
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                maxWidth: '50%',
                color: 'whitesmoke',
                backgroundColor: '#F27D70',
                '&:hover': {
                  backgroundColor: '#f69c76',
                  color: '#3c52b2',
                },
              }}
            >
              Filter
            </Button>
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
                  36.6 °C
                </Typography>
              </Box>
              <Box display={'flex'} flexGrow={3} flexDirection={'column'}>
                <Typography color={'#025372'}>36.6 °C - 5mins ago</Typography>
                <Typography color={'#025372'}>36.6 °C - 5mins ago</Typography>
                <Typography color={'#025372'}>36.6 °C - 5mins ago</Typography>
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
                  36.6 bpm
                </Typography>
              </Box>
              <Box display={'flex'} flexGrow={3} flexDirection={'column'}>
                <Typography color={'#025372'}>83 bpm - 1min ago</Typography>
                <Typography color={'#025372'}>83 bpm - 1min ago</Typography>
                <Typography color={'#025372'}>83 bpm - 1min ago</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PacientMedicalRecord
