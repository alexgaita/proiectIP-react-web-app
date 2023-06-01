import React, { useState } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import CreateActivityModal from './CreateActivityModal'
import AddIcon from '@mui/icons-material/Add'

const PacientActivities = ({ activities, isMedic }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const renderActivity = (activity) => {
    return (
      <Tooltip title={activity.description}>
        <Box
          key={activity.id}
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
              {activity.name}
            </Typography>
            <Typography color={'white'}>
              Duration: {activity.duration} mins
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    )
  }

  if (!activities) return null

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Typography sx={{ ml: 2 }} color={'#FFFFFF'}>
          {' '}
          Activities
        </Typography>
        <Box display={isMedic ? 'flex' : 'none'} alignItems={'center'}>
          <Typography color={'#FFFFFF'}>Add Activity</Typography>
          <IconButton
            size="small"
            onClick={() => {
              setModalOpen(true)
            }}
          >
            <AddIcon sx={{ height: 20, width: 20, color: '#FFFFFF' }} />
          </IconButton>
        </Box>
      </Box>
      <CreateActivityModal
        open={modalOpen}
        handleOnClose={() => setModalOpen(false)}
      />
      <Box
        sx={{
          minHeight: 100,
          width: '100%',
          border: '1px solid white',
          borderRadius: '25px',
          boxSizing: 'border-box',
          pt: 1,
        }}
      >
        {activities.map((activity) => renderActivity(activity))}
      </Box>
    </>
  )
}

export default PacientActivities
