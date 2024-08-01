
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import './index.css'
import Home from './Components/Home/Home'
import Signup from './Components/Signup'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './Components/context/AuthProvider'
import Mentors from './Components/Mentors/Mentors'
import BecomeAMentor from './Components/BecomeAMentor'
import ApplicationFormMentor from './Components/ApplicationFormMentor'
import M_Profile from './Components/MentorsProfile/M_Profile'
import Calendar from './Components/GoogleCalendar/Calendar'



const App = () => {
  const [authUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={authUser ? <Mentors /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path='/becomeMentor' element={<BecomeAMentor />} />
          <Route path='/applicationFormMentor' element={<ApplicationFormMentor />} />
          <Route path="/mentor/:id" element={<M_Profile />} />
          <Route path="/calendar" element={<Calendar />} />


        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App