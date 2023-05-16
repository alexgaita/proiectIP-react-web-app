import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { passwordReset } from '../../utils/firebase'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await passwordReset(email)
      setEmailMessage(true)
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found, try again!')
        setEmail('')
      }
    }
  }

  return (
    <div>
      {emailMessage ? (
        <div>
          <h3>The Email has been sent; Check your Inbox!
          </h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="name@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <button type="submit">Reset Your Password</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword
