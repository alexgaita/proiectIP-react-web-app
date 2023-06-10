import React, { useEffect, useState } from 'react'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../App'
import CreateWarningModal from './CreateWarningModal'

const PacientWarnings = ({ isMedic, userId }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [warnings, setWarnings] = useState([{}])
  const [updateData, setUpdateData] = useState(null)
  useEffect(() => {
    const q = query(collection(db, `/pacients/${userId}/warnings`))
    onSnapshot(q, (querySnapshot) => {
      const warningsResponse = []
      querySnapshot.forEach((doc) => {
        let warningObject = { id: doc.id }
        for (const [key, value] of Object.entries(doc.data())) {
          warningObject[key] = value.split(',').map((val) => parseInt(val))
        }
        warningsResponse.push(warningObject)
      })
      console.log(warningsResponse)
      setWarnings(warningsResponse)
    })
  }, [userId])

  const renderWarning = (warning) => {
    const { id, ...warningData } = warning

    return (
      <Box
        key={id}
        display={'flex'}
        alignItems={'center'}
        onClick={() => {
          let data = {}
          Object.keys(warningData).forEach((key) => {
            data[key.toLowerCase() + 'Min'] = warningData[key][0]
            data[key.toLowerCase() + 'Max'] = warningData[key][1]
          })

          setUpdateData({ ...data, id })
          setModalOpen(true)
        }}
        sx={{
          minHeight: 50,
          gap: 3,
          width: '100%',
          ml: 3,
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
        >
          {Object.keys(warningData)
            .sort()
            .map((key) => {
              return (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                  <Typography width={90} color={'white'} fontWeight={700}>
                    {key}
                  </Typography>
                  <Chip
                    sx={{ width: 90 }}
                    label={
                      <Typography color={'white'} fontWeight={200}>
                        min: {warningData[key][0]}
                      </Typography>
                    }
                  />
                  <Chip
                    sx={{ width: 90 }}
                    label={
                      <Typography color={'white'} fontWeight={200}>
                        max: {warningData[key][1]}
                      </Typography>
                    }
                  />
                </Box>
              )
            })}

          <Box
            sx={{
              backgroundColor: 'red',
              height: '4px',
              width: '100%',
              borderRadius: '25px',
              mb: 2,
            }}
          />
        </Box>
      </Box>
    )
  }

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
          Warnings
        </Typography>
        <Box display={isMedic ? 'flex' : 'none'} alignItems={'center'}>
          <Typography color={'#FFFFFF'}>Add Warning</Typography>
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
      {modalOpen && (
        <CreateWarningModal
          open={modalOpen}
          handleOnClose={() => {
            setModalOpen(false)
            setUpdateData(null)
          }}
          userId={userId}
          updateWarning={updateData}
        />
      )}
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
        {warnings.map((warning) => renderWarning(warning))}
      </Box>
    </>
  )
}

export default PacientWarnings
