import React from 'react'
import { Box, Typography } from '@mui/material'
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  labels,
  datasets: [
    {
      label: 'EKG',
      data: [100, 200, 10, 40, 50, 90, 180],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

const PacientMedicalRecord = () => {
  return (
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
          }}
        >
          <Line options={options} data={data} />
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
  )
}

export default PacientMedicalRecord
