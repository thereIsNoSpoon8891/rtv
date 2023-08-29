import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/UserProvider'



const Nav = () => {

const {logout} = useContext(UserContext)

    return(
        <div className='nav--container'>
             <h1>
                 <Link to='/'>
                     Login
                 </Link>
            </h1>

            <h1>
                <Link to='/public'>
                    Public
                </Link>
            </h1>

            <h1>
                <Link to='/profile'>
                    My Profile
                </Link>
            </h1>
            <h1 onClick={()=> logout()}>
                Logout
            </h1>
        </div>
    )
}

export default Nav