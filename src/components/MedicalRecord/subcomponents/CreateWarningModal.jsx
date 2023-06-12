import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { setDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../App'
import { v4 as uuidv4 } from 'uuid'

const defaultModalData = {
  ekgMin: 0,
  ekgMax: 0,
  pulseMin: 0,
  pulseMax: 0,
  temperatureMin: 0,
  temperatureMax: 0,
  humidityMax: 0,
  humidityMin: 0,
}

const CreateWarningModal = ({ open, handleOnClose, userId, updateWarning }) => {
  const [formData, setFormDate] = useState(updateWarning || defaultModalData)
  const [errorArray, setErrorArray] = useState([])

  const handleChangeData = (value, fieldName) => {
    setFormDate((prevState) => {
      return {
        ...prevState,
        [fieldName]: value,
      }
    })
  }

  const addWarning = async () => {
    const data = {
      EKG: formData.ekgMin.toString() + ',' + formData.ekgMax.toString(),
      Pulse: formData.pulseMin.toString() + ',' + formData.pulseMax.toString(),
      Temperature:
        formData.temperatureMin.toString() +
        ',' +
        formData.temperatureMax.toString(),
      Humidity:
        formData.humidityMin.toString() + ',' + formData.humidityMax.toString(),
    }

    await setDoc(doc(db, `pacients/${userId}/warnings`, uuidv4()), data)
  }

  const updateWarningData = async () => {
    const data = {
      EKG: formData.ekgMin.toString() + ',' + formData.ekgMax.toString(),
      Pulse: formData.pulseMin.toString() + ',' + formData.pulseMax.toString(),
      Temperature:
        formData.temperatureMin.toString() +
        ',' +
        formData.temperatureMax.toString(),
      Humidity:
        formData.humidityMin.toString() + ',' + formData.humidityMax.toString(),
    }

    await updateDoc(
      doc(db, `pacients/${userId}/warnings`, updateWarning.id),
      data
    )
  }

  const submitFormData = async () => {
    if (updateWarning) {
      await updateWarningData()
    } else {
      await addWarning()
    }

    handleOnClose(true)
  }

  const renderTitle = () => {
    return 'Add new Warning'
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
          height: '50%',
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
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {Object.keys(defaultModalData).map((key) => {
            return (
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant={'subtitle1'}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <TextField
                  fullWidth={true}
                  size="small"
                  placeholder={0}
                  type={'number'}
                  error={errorArray.includes(key)}
                  helperText={
                    errorArray.includes(key) ? 'Field is required' : ''
                  }
                  value={formData[key]}
                  onChange={(event) =>
                    handleChangeData(event.target.value, key)
                  }
                  inputProps={{ min: 0 }}
                />
              </Box>
            )
          })}
        </Box>

        <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
          <Button
            variant={'outlined'}
            sx={{ borderRadius: '25px' }}
            onClick={submitFormData}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateWarningModal
