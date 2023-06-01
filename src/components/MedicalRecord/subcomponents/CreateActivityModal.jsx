import { Box, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../../App'
import { v4 as uuidv4 } from 'uuid'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const defaultModalData = {
  name: '',
  description: '',
  startTime: dayjs(),
  duration: '',
}

const CreateActivityModal = ({ open, handleOnClose, userId }) => {
  const [formData, setFormDate] = useState(defaultModalData)
  const [errorArray, setErrorArray] = useState([])

  const handleChangeData = (value, fieldName) => {
    setFormDate((prevState) => {
      return {
        ...prevState,
        [fieldName]: value,
      }
    })
  }

  const addActivity = async () => {
    await setDoc(doc(db, 'pacients', uuidv4()), formData)
  }

  const submitFormData = async () => {
    let errors = []
    if (!formData.name) errors.push('name')
    if (!formData.description) errors.push('description')
    if (!formData.startTime) errors.push('startTime')
    if (!formData.duration) errors.push('duration')

    setErrorArray(errors)

    if (errors.length) return

    await addActivity()

    handleOnClose(true)
  }

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  const renderTitle = () => {
    return 'Add new Activity'
  }

  return (
    <Modal open={open} onClose={handleOnClose}>
      <Box
        container
        sx={{
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '80%',
          borderRadius: '10px',
          padding: 3,
          pl: 5,
          pr: 5,
          borderSizing: 'border-box',
          overflow: 'auto',
        }}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={5}
        columnSpacing={3}
      >
        <Box pb={2}>
          <Typography variant={'h6'}>{renderTitle()}</Typography>
        </Box>
        <Box display={'flex'} gap={3}>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Activity Name*</Typography>
            <TextField
              fullWidth={true}
              error={errorArray.includes('name')}
              helperText={
                errorArray.includes('name') ? 'Field is required' : ''
              }
              size="small"
              placeholder={'Running'}
              value={formData.name}
              onChange={(event) => handleChangeData(event.target.value, 'name')}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Duration*</Typography>
            <TextField
              fullWidth={true}
              size="small"
              placeholder={30}
              type={'number'}
              error={errorArray.includes('duration')}
              helperText={
                errorArray.includes('duration') ? 'Field is required' : ''
              }
              value={formData.duration}
              onChange={(event) =>
                handleChangeData(event.target.value, 'duration')
              }
              inputProps={{ min: 1 }}
            />
          </Box>
        </Box>

        <Box display={'flex'} flexDirection={'column'} flexGrow={2}>
          <Typography variant={'subtitle1'}>Start Time*</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} size={'small'} />}
              value={formData.startTime}
              onChange={(newValue) => {
                handleChangeData(newValue, 'startTime')
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
          <Typography variant={'subtitle1'}>Description</Typography>
          <TextField
            fullWidth={true}
            rows={4}
            multiline
            size="small"
            placeholder={'Run at a steady pace'}
            value={formData.description}
            onChange={(event) =>
              handleChangeData(event.target.value, 'description')
            }
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateActivityModal
