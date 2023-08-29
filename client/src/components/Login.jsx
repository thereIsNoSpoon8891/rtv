import {useState, useContext} from 'react'
import { UserContext } from '../context/UserProvider'


function Login () {

    const {signUp, login, user:{errorMessage}} = useContext(UserContext)
console.log(errorMessage)
    const defaultValues = {
        username: "",
        password: "",
        verifyPassword: ""
    }
    const [inputs, setInputs] = useState(defaultValues)

    const [toggleForms, setToggleForms] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
            setInputs(prevInputs => ({
                ...prevInputs,
                [name]: value
            }))
    }

    const handleSignUp = (e) => {
        e.preventDefault()
            if (inputs.verifyPassword === inputs.password){
                signUp(inputs)
                    setInputs(defaultValues)
                        setPasswordCheck("")
            } else if(inputs.verifyPassword !== inputs.password){
                alert("Passwords do NOT match")
            }
    }

    const handleLogIn = (e) => {
        e.preventDefault()
            login(inputs)
                setInputs(defaultValues)
    }

    
    //console.log(inputs)
    return(
        <div className='login-form--container'>
            <h1>Welcome to Rock The Vote!</h1>
            {toggleForms ?

            <form className="form">
                <input 
                type='text'
                name='username'
                placeholder='User Name'
                className='inputs'
                value={inputs.username}
                onChange={handleChange}
                />

                <input
                type='password'
                name='password'
                placeholder='Password'
                className='inputs'
                value={inputs.password}
                onChange={handleChange}
                />

                <input
                type='password'
                name='verifyPassword'
                placeholder='Verify Password'
                className='inputs'
                value={inputs.verifyPassword}
                onChange={handleChange}
                />
                <button 
                onClick={handleSignUp}
                className='form--button'
                >
                    Sign Up
                </button>
            </form>
            :
            <form className="form">

            <input 
            type='text'
            name='username'
            placeholder='User Name'
            className='inputs'
            value={inputs.username}
            onChange={handleChange}
            />

            <input
            type='password'
            name='password'
            placeholder='Password'
            className='inputs'
            value={inputs.password}
            onChange={handleChange}
            />
            <button 
            className='form--button'
            onClick={handleLogIn}
            >
                Login
            </button>
        </form>}
            {toggleForms ?
            <p onClick={() => setToggleForms(prev => !prev)}>Already a memeber? Click <u>here</u> to log in</p>
            :
            <p onClick={() => setToggleForms(prev => !prev )}>Not a memeber? Click <u>here</u> to sign up</p>}
            {/* <h4>Error message here</h4> */}
        </div>
    )
}

export default Login