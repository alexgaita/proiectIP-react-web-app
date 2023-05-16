import {
  connectAuthEmulator,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth'

import { auth } from '../App'

// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099')
// }

var actionCodeSettings = {
  // After password reset, the user will be give the ability to go back
  // to this page.
  url: 'http://localhost:3000/login',
  handleCodeInApp: false
};

export const passwordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email, actionCodeSettings)
}

export const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return

  return await confirmPasswordReset(auth, oobCode, newPassword)
}
