import React, { useState } from 'react'
import { LongDash, RegisterBackground, RegisterButton, RegisterInputs, SignBackground, SignCheckboxDiv, SignContainer, SignIconsBlur, SignInnerDiv, SignOr, SignTypography, SocialIcon, SocialIcons } from '../style'
import SizeCheckboxes from '../materials/checkbox'
import { Button, TextField } from '@mui/material'
import { SLink } from './linkStyle'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

const RegisterComponent = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(name !== ''){
          try {
            const response = await fetch("http://176.124.209.238:5500/sign-up", {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({name, email, password})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        
              const data = await response.json();
            setName('')
            setEmail('')
            setPassword('')
            navigate('/login')
        } catch (error) {
            console.error('failure', error)
        }  
        } 
    }
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleChangePassword = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeConformPassword = (e) => {
        setPassword(e.target.value)
    }

  return (
    <div>
        <RegisterBackground>
                    <SignContainer onSubmit={handleSubmit}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h2>Sign upp</h2><div><SLink to='/'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></SLink></div>
                        </div>
                        
                       <label htmlFor="">Name</label>
                       <RegisterInputs type="text" placeholder='ex.Eric' value={name} onChange={handleChange} name='name' />
                       <label htmlFor="">Email</label>
                       <RegisterInputs type="text" placeholder='ex.eric@gmailcom'  onChange={handleChangePassword} name='Email' value={email}/>
                       <label htmlFor="">Password</label>
                       <RegisterInputs type="password" placeholder='Enter your password' value={password} onChange={handleChangeConformPassword} name='password' />

                        <SignInnerDiv>
                        <SizeCheckboxes /><SignTypography>Keep me Logged in</SignTypography>
                            <SignTypography></SignTypography>
                        </SignInnerDiv>
                        <RegisterButton type="submit" value='REGISTER' onClick={handleSubmit}/>
                    </SignContainer>
                </RegisterBackground>
    </div>
  )
}

export default RegisterComponent