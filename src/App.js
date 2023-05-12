import './App.css'
import { initializeApp } from 'firebase/app'

import PacientsList from './components/PacientsList/PacientsList'
import { getFirestore } from 'firebase/firestore'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

import MedicalRecord from './components/MedicalRecord/MedicalRecord'
import LogIn from './components/Login/Login'
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
  const checkUserLoggedIn = () => {
    var user = auth.currentUser
    console.log(user)
    if (user) {
      return <Navigate to="/pacients" replace />
    } else {
      return <Navigate to="/login" replace />
    }
  }

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={checkUserLoggedIn()} />

          <Route element={<PacientsList />} path="/pacients" />
          <Route element={<MedicalRecord />} path="/pacients/:id" />
          <Route element={<LogIn />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
