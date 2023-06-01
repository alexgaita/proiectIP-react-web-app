import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { setDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../App'
import { v4 as uuidv4 } from 'uuid'

const defaultModalData = {
  firstName: '',
  lastName: '',
  cnp: '',
  email: '',
  age: undefined,
  country: '',
  city: '',
  street: '',
  streetNumber: '',
  phoneNumber: '',
  workplace: '',
  medicalHistory: '',
  allergies: '',
}

const CreateModal = ({ open, handleOnClose, updateData, isMedic }) => {
  const [formData, setFormDate] = useState(updateData || defaultModalData)
  const [errorArray, setErrorArray] = useState([])

  const handleChangeData = (value, fieldName) => {
    setFormDate((prevState) => {
      return {
        ...prevState,
        [fieldName]: value,
      }
    })
  }

  const addPacient = async () => {
    await setDoc(doc(db, 'pacients', uuidv4()), formData)
  }

  const updatePacient = async () => {
    await updateDoc(doc(db, 'pacients', updateData.id), formData)
  }

  const submitFormData = async () => {
    let errors = []
    if (!formData.firstName) errors.push('firstName')
    if (!formData.lastName) errors.push('lastName')
    if (!formData.cnp) errors.push('cnp')
    if (!formData.email) errors.push('email')
    if (!formData.age) errors.push('age')
    if (!formData.country) errors.push('country')
    if (!formData.street) errors.push('street')
    if (!formData.streetNumber) errors.push('streetNumber')
    if (!formData.phoneNumber) errors.push('phoneNumber')
    if (!formData.workplace) errors.push('workplace')
    setErrorArray(errors)
    if (errors.length) return

    if (updateData) {
      await updatePacient()
    } else {
      await addPacient()
    }

    handleOnClose(true)
  }

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  const renderTitle = () => {
    if (!isMedic) return 'Update Info'
    if (updateData) return 'Update Pacient Info'
    return 'Add new Pacient'
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
        spacing={3}
      >
        <Box pb={2}>
          <Typography variant={'h6'}>{renderTitle()}</Typography>
        </Box>
        <Box display={'flex'} gap={2}>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>First Name*</Typography>
            <TextField
              fullWidth={true}
              error={errorArray.includes('firstName')}
              helperText={
                errorArray.includes('firstName') ? 'Field is required' : ''
              }
              size="small"
              placeholder={'Alex'}
              value={formData.firstName}
              onChange={(event) =>
                handleChangeData(event.target.value, 'firstName')
              }
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Last Name*</Typography>
            <TextField
              fullWidth={true}
              size="small"
              placeholder={'Gaita'}
              error={errorArray.includes('lastName')}
              helperText={
                errorArray.includes('lastName') ? 'Field is required' : ''
              }
              value={formData.lastName}
              onChange={(event) =>
                handleChangeData(event.target.value, 'lastName')
              }
            />
          </Box>
        </Box>
        <Box display={'flex'} mt={2} gap={2}>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>CNP*</Typography>
            <TextField
              fullWidth={true}
              placeholder={'1234567891012'}
              value={formData.cnp}
              error={errorArray.includes('cnp')}
              helperText={errorArray.includes('cnp') ? 'Field is required' : ''}
              onChange={(event) => {
                const regex = /^[0-9\b]+$/
                if (!regex.test(event.target.value) && !!event.target.value)
                  return

                handleChangeData(event.target.value, 'cnp')
              }}
              size="small"
              inputProps={{ maxLength: 13 }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Age*</Typography>
            <TextField
              fullWidth={true}
              size="small"
              placeholder={18}
              type={'number'}
              error={errorArray.includes('age')}
              helperText={errorArray.includes('age') ? 'Field is required' : ''}
              value={formData.age}
              onChange={(event) => handleChangeData(event.target.value, 'age')}
              inputProps={{ min: 1 }}
            />
          </Box>
        </Box>
        <Box
          mt={2}
          sx={{ border: '1px solid grey', borderRadius: '10px', p: 2 }}
        >
          <Typography>Adress*</Typography>
          <Box display={'flex'} mt={2} gap={2} flexWrap={'wrap'}>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
              <Typography variant={'subtitle1'}>Country*</Typography>
              <TextField
                fullWidth={true}
                size="small"
                placeholder={'Romania'}
                error={errorArray.includes('country')}
                helperText={
                  errorArray.includes('country') ? 'Field is required' : ''
                }
                value={formData.country}
                onChange={(event) =>
                  handleChangeData(event.target.value, 'country')
                }
              />
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
              <Typography variant={'subtitle1'}>City*</Typography>
              <TextField
                fullWidth={true}
                size="small"
                placeholder={'Timisoara'}
                error={errorArray.includes('city')}
                helperText={
                  errorArray.includes('city') ? 'Field is required' : ''
                }
                value={formData.city}
                onChange={(event) =>
                  handleChangeData(event.target.value, 'city')
                }
              />
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
              <Typography variant={'subtitle1'}>Street*</Typography>
              <TextField
                fullWidth={true}
                size="small"
                placeholder={'Strada Ploii'}
                error={errorArray.includes('street')}
                helperText={
                  errorArray.includes('street') ? 'Field is required' : ''
                }
                value={formData.street}
                onChange={(event) =>
                  handleChangeData(event.target.value, 'street')
                }
              />
            </Box>
            <Box display={'flex'} flexDirection={'column'} width={'20%'}>
              <Typography variant={'subtitle1'}>Number*</Typography>
              <TextField
                fullWidth={true}
                size="small"
                placeholder={'123A'}
                error={errorArray.includes('streetNumber')}
                helperText={
                  errorArray.includes('streetNumber') ? 'Field is required' : ''
                }
                value={formData.streetNumber}
                onChange={(event) =>
                  handleChangeData(event.target.value, 'streetNumber')
                }
              />
            </Box>
          </Box>
        </Box>
        <Box display={'flex'} mt={2} gap={2} flexWrap={'wrap'}>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Phone Number*</Typography>
            <TextField
              fullWidth={true}
              size="small"
              placeholder={'0712345678'}
              value={formData.phoneNumber}
              error={errorArray.includes('phoneNumber')}
              helperText={
                errorArray.includes('phoneNumber') ? 'Field is required' : ''
              }
              onChange={(event) => {
                const regex = /^[0-9\b]+$/
                if (!regex.test(event.target.value) && !!event.target.value)
                  return
                handleChangeData(event.target.value, 'phoneNumber')
              }}
              inputProps={{ maxLength: 10 }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Email*</Typography>
            <TextField
              fullWidth={true}
              size="small"
              placeholder={'pacient@email.com'}
              error={errorArray.includes('email')}
              helperText={
                errorArray.includes('email') ? 'Field is required' : ''
              }
              value={formData.email}
              onChange={(event) =>
                handleChangeData(event.target.value, 'email')
              }
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Workplace*</Typography>
            <TextField
              fullWidth={true}
              size="small"
              placeholder={'Regina Maria'}
              error={errorArray.includes('workplace')}
              helperText={
                errorArray.includes('workplace') ? 'Field is required' : ''
              }
              value={formData.workplace}
              onChange={(event) =>
                handleChangeData(event.target.value, 'workplace')
              }
            />
          </Box>
        </Box>
        <Box display={'flex'} mt={2} gap={2} flexDirection={'column'}>
          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Medical History</Typography>
            <TextField
              fullWidth={true}
              rows={4}
              multiline
              size="small"
              placeholder={'Apa la genunchi'}
              value={formData.medicalHistory}
              onChange={(event) =>
                handleChangeData(event.target.value, 'medicalHistory')
              }
            />
          </Box>

          <Box display={'flex'} flexDirection={'column'} flexGrow={1}>
            <Typography variant={'subtitle1'}>Allergies</Typography>
            <TextField
              fullWidth={true}
              rows={4}
              multiline
              size="small"
              placeholder={'Alergie la banane'}
              value={formData.allergies}
              onChange={(event) =>
                handleChangeData(event.target.value, 'allergies')
              }
            />
          </Box>
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

export default CreateModal
