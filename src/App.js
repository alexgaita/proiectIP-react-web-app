import './App.css'
import { initializeApp } from 'firebase/app'

import PacientsList from './components/PacientsList/PacientsList'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import MedicalRecord from './components/MedicalRecord/MedicalRecord'
import LogIn from './components/Login/Login'
import ForgotPassword from './components/Login/ForgotPassword'
import Register from './components/Register/Register'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const firebaseConfig = {
  apiKey: 'AIzaSyAavdnx4f7lVFuTvz3-9jatNv-NhjqzaNI',
  authDomain: 'proiect-ip-iot.firebaseapp.com',
  projectId: 'proiect-ip-iot',
  storageBucket: 'proiect-ip-iot.appspot.com',
  messagingSenderId: '602472862940',
  appId: '1:602472862940:web:3814a99264fcd8c6f1d019',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [isMedic, setIsMedic] = useState(false)

  const navigate = useNavigate()

  const fetchUserClaims = async (id) => {
    const userClaims = await getDoc(doc(db, 'claims', id))
    setIsMedic(userClaims.data()?.admin || null)
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        await fetchUserClaims(loggedUser.uid)
        setUser(loggedUser)
      } else {
        setUser(null)
        setIsMedic(false)
      }
    })
  }, [])

  const checkUserLoggedIn = () => {
    if (!user) {
      navigate('/login', { replace: true })
      return
    }

    if (isMedic) {
      navigate('/pacients', { replace: true })
      return
    }

    navigate('/me', { replace: true })
  }

  useEffect(() => {
    checkUserLoggedIn()
  }, [user, isMedic])

  return (
    <div
      className="App"
      style={{
        backgroundColor: 'lightblue',
        width: '100%',
        height: '100vh',
        background: "url('/background.jpeg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {' '}
      <Routes>
        <Route element={<MedicalRecord isMedic={isMedic} />} path="/me" />
        <Route element={<PacientsList isMedic={isMedic} />} path="/pacients" />
        <Route
          element={<MedicalRecord isMedic={isMedic} />}
          path="/pacients/:id"
        />
        <Route element={<LogIn />} path="/login" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </div>
  )
}

export default App
