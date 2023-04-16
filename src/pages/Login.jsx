import React, { useState } from 'react'
import '../styles/login.css';

import Helmet from '../components/Helmet/Helmet';
import { Container, Row , Col , Form , FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

//firebase
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';


const Login = () => {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [loading , setLoading] = useState(false)

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{
      const userCredential = await signInWithEmailAndPassword(auth , email , password)

      const user = userCredential.user

      console.log(user)
      setLoading(false)
      toast.success('Successfully logged in')
      navigate('/checkout')
    } catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }


  return (
    <Helmet title = 'Login'>
      <section>
        <Container>
          <Row>
           {
            loading ? 
            <Col lg='12' className='text-center'>
              <h5 className='fw-bold'>Loading...</h5>
            </Col> : (
               <Col lg='6' className='m-auto text-center'>
               <h3 className='fw-bold mb-4'>Login</h3>
 
               <Form className='auth__form' onSubmit={signIn}> 
                 <FormGroup className='form__group'>
                   <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                 </FormGroup>
 
                 <FormGroup className='form__group'>
                   <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                 </FormGroup>
 
                 <button type='submit' className='buy__btn auth__btn'>Login</button>
                 <p>Don't have an acoount? <Link to='/signup'>Create an account</Link> </p>
               </Form>
             </Col>
            )
           }
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Login