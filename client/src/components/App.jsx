import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useContext } from 'react'
import ProtectedRoutes from './ProtectedRoutes'
import Profile from './Profile'
import Public from './Public'
import Login from './Login'
import Nav from './Nav'


function App() {

const {token} = useContext(UserContext)


  return (
    <Browser>
                { token && <Nav />}
                <Routes>
                      <Route path='/' element={token ? <Profile /> : <Login />}/>
                      <Route path='profile' element={
                        <ProtectedRoutes
                        token={token}
                        >
                            <Profile />
                        </ProtectedRoutes>
                      } />


                      <Route path='public' element={
                        <ProtectedRoutes
                        token={token}
                        >
                            <Public />
                        </ProtectedRoutes>
                      } />

                </Routes>
    </Browser>
  )
}

export default App
