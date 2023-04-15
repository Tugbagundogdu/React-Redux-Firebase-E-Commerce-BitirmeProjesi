import React, { useState } from 'react'
import '../styles/login.css';

import Helmet from '../components/Helmet/Helmet';
import { Container, Row , Col , Form , FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'

//Firebase 
import {createUserWithEmailAndPassword , signInWithPopup, updateProfile } from "firebase/auth";
import {auth} from '../firebase';
import {ref , uploadBytesResumable , getDownloadURL} from 'firebase/storage';
import { storage } from '../firebase';
import {toast} from 'react-toastify';
import {setDoc , doc} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

//Google authentication işlemleri

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();





const Signup = () => {

  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [file , setFile] = useState(null);
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

const signup = async (e) =>{
e.preventDefault();
setLoading(true)

try {

const userCredential = await createUserWithEmailAndPassword(auth , email , password)

const user = userCredential.user
const storageRef = ref(storage , `images/${Date.now() + username }`)
const uploadTask = uploadBytesResumable(storageRef , file)

uploadTask.on(
  (error) => {
    toast.error(error.message);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl) => {

      // profili güncelleme kısmı
    await updateProfile(user , {
        displayName: username , 
        photoURL: downloadUrl,
      });

      // store user data in firestore db 
      await setDoc(doc(db , 'users' , user.uid), {
        uid: user.uid ,
        displayName: username,
        email,
        photoURL: downloadUrl
      })
    })
  }
)

setLoading(false);
toast.success('Account created')
navigate('/login')

} catch(error){
  setLoading(false)
toast.error('something went wrong')
}
};

const googleLogin = async ()=>{
  try {
    const data = await signInWithPopup(auth , provider)
    const credential = GoogleAuthProvider.credentialFromResult(data);
    const token = credential.accessToken;
    const user = data.user;
    if(user){
      window.location= "/cart"
    }
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    toast.error(credential);
  }
}

  return (
    <Helmet title = 'Login'>
      <section>
        <Container>
          <Row>
            {
              loading ? (
                <Col lg = '12' className = 'text-center'>
                  <h5 className='fw-bold'>Loading....</h5>
                </Col> ) : (  
                            <Col lg='6' className='m-auto text-center'>
                            <h3 className='fw-bold mb-4'>Signup</h3>
              
                            <Form className='auth__form' onSubmit={signup}>
              
                            <FormGroup className='form__group'>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username'/>
                              </FormGroup>
                              
                              <FormGroup className='form__group'>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email'/>
                              </FormGroup>
              
                              <FormGroup className='form__group'>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                              </FormGroup>
              
                              
                              <FormGroup className='form__group'>
                                <input onChange={(e) => setFile(e.target.files[0])} type="file" />
                              </FormGroup>

                              <FormGroup className='form__group'>
                                <div onClick={googleLogin} className='buy__btn auth__btn google__form'>
                                <FcGoogle className='google__icon'/>  Sign in with google
                                </div>
                              </FormGroup>
              
                              <button type='submit' className='buy__btn auth__btn'>Create an Account</button>
                              <p>Already have an acoount? <Link to='/login'>Login</Link> </p>
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

export default Signup
