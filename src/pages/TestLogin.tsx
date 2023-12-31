/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '../styles/LogIn.css'
import { FormEvent} from 'react';
import Carousel from '../components/Carousel';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const defaultFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/LogIn.css'; // Import your local CSS
// import { Helmet } from "react-helmet";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import FilipayLogo from '../assets/Filipay-logo.png';
import MessageIcon from '../assets/message-icon.png'

interface IUserInformation  {

  _id: string,
  profileImageUrl: string,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  company: string,
  isEmailVerified: boolean,
  pageCode : string,
  role: string,
  companyId: string,

}




export default function TestLogin() : JSX.Element {

    const [isLoading, setIsLoading ] = useState(false);
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

    const navigate = useNavigate();

    
    

    useEffect(() =>{


        if(localStorage.getItem('token')){
            navigate('/dashboard')
        }

        return () =>{}

    },[username, password])

    async function handleSubmitLoggedIn(event : FormEvent){

        event.preventDefault();
        setIsLoading(true)
        try{

            const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth`, {
                "email" : username,
                "password" : password
            } ,{})
            
            const response = await request.data;

            if(response.messages[0].message === "OK"){
                InsertToStorage(response.response)
                localStorage.setItem('token', response.response.email)
                if(localStorage.getItem('companyId')){
                    navigate('/dashboard')
                }
                
            }else{
               
                toast.error(response.messages[0].message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
            
        }catch(e : any){
            console.error("Error in login ",e );
            toast.error("Connection error", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
        });
        }finally{
          setIsLoading(false);
        }
    
    }



    async function InsertToStorage (data : IUserInformation){

        //const email = localStorage.getItem('token')
        console.log(import.meta.env.VITE_BASE_URL)
        try{
         

        localStorage.setItem('companyId' , data.companyId)         
        localStorage.setItem('role' , data.role)
        localStorage.setItem('pageCode', data.pageCode)
        localStorage.setItem('companyName' , data.company)
        }catch(e){
          console.log(`Error in getting user: ${e}`)
        }
  
    }

      const [isSubmitOtp, setIsSubmitOtp] = useState(false);
      const [emailOtp, setEmailOtp] = useState('');
      const [otp, setOtp] = useState('');

      async function RequestOTP(event) {
        try {
  
          event?.preventDefault()
          // Define the request data as an object
          const requestData = {
           email : emailOtp
          };
      
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/email-otp`,
            requestData, // Use the requestData object as the request data
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
              },
            }
          );
      
          // Note that there's no need to use `await` on response.data directly
          // as axios already returns the response data.
          const responseData = response.data;

            if(responseData.messages[0].code === "0"){
            
              setIsSubmitOtp(!isSubmitOtp);
           
             }
      
        } catch (error) {
          console.error(error);
          toast.error(`Action failed error: ${error}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      }

      async function VerifyOtp(event){
    
        try {
  
          event?.preventDefault()
          // Define the request data as an object
          const requestData = {
           email : emailOtp,
           otp: otp
          };
      
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/validate-otp`,
            requestData, // Use the requestData object as the request data
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
              },
            }
          );
      
          // Note that there's no need to use `await` on response.data directly
          // as axios already returns the response data.
          const responseData = response.data;

            if(responseData.messages[0].code === "0"){
            
              setIsSubmitOtp(!isSubmitOtp);
           
             }
      
        } catch (error) {
          console.error(error);
          toast.error(`Action failed error: ${error}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }

      }

      useEffect(() =>{

        return () =>{}
      },[isSubmitOtp, isLoading])
  
    return(
      <div className="bg-white min-h-screen overflow-hidden">
      <style>
      {`
        body {
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0;
        }
      `}
    </style>
         <Dialog open={isOtpModalOpen} onClose={() => setIsOtpModalOpen(!isOtpModalOpen)}>
    {isSubmitOtp ? 
    (
    <>
    
    <form onSubmit ={VerifyOtp}>
       <DialogTitle>Please enter the otp that we have sent to your email.</DialogTitle>
       <DialogContent  dividers>
         <DialogContentText>
          Please don't share this one time password.
         </DialogContentText>
         <TextField
           autoFocus
           margin="dense"
           id="otp"
           label="OTP (One time password)"
           type="text"
           fullWidth
           value = {otp}
           onChange = {(event) => { setOtp(event.target.value) }}
           variant="standard"
         />
       </DialogContent>
       <DialogActions>
         <Button onClick={() => setIsOtpModalOpen(!isOtpModalOpen)}>Cancel</Button>
         <Button type ="submit" variant = "contained" onClick={() => setIsOtpModalOpen(!isOtpModalOpen)}>Next</Button>
       </DialogActions>
    </form>


    </>) :
    (<form onSubmit ={RequestOTP}>
      <DialogTitle>Please provide you email address</DialogTitle>
      <DialogContent  dividers>
        <DialogContentText>
          We will sent a one time password to your email address, to recover your account.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value = {emailOtp}
          onChange = {(event) => { setEmailOtp(event.target.value) }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOtpModalOpen(!isOtpModalOpen)}>Cancel</Button>
        <Button type ="submit" variant = "contained" >Submit</Button>
      </DialogActions>
     </form> )
    }
      </Dialog>

      <div >

        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
       
        />
        <div className="divmain"
        style ={{
            width: '100%'
        }}
        >
        <div className="divform"
        style ={{
          height: '95vh',
            marginBottom: '6em'
        }}
        >
                <form id="loginform" className="loginform" style=
            {{background:'white',
            padding: '1em',
            border: 'transparent',
            height: 'auto', 
            }} onSubmit={handleSubmitLoggedIn} >
                   
                       <div className="loginInputs" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        
                        <img src={FilipayLogo} alt="" className='w-44 m-auto mb-0 mt-0' />
                            <div className="signinlabel"  >
                                
                                <span className="mb-1" style ={{fontFamily:defaultFont}}>Sign In</span>
                            </div>

                            <div className="form-group" style={{}}>
                               
                              </div>
                              <div className="form-group" style={{marginBottom: '16px'}}>
 
                                  <label htmlFor="email" className="block mb-2 mt-4 text-lg font-medium text-gray-900 ">Email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-white mt-3 border shadow-sm border-slate-300  text-gray-900 sm:text-sm rounded-lg 
                                    focus:outline-none
                                    focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                                    placeholder="name@company.com"
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                  />

                                <label htmlFor="password" className="block mb-2 mt-4 text-lg font-medium text-gray-900 ">Password</label>
                                  <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="bg-white mt-3 mb-4 border shadow-sm border-slate-300  text-gray-900 sm:text-sm rounded-lg 
                                    focus:outline-none
                                    focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                                    placeholder="Enter your password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                  />
                    

                                <div className='flex justify-between' >

                                    <div className='flex-1'>
                                            <div  style ={{boxSizing: 'border-box', color:'#212529', display: 'block',  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: '400', lineHeight:'24px', minHeight: '24px', position:'relative', textAlign:'left', textSizeAdjust:'100%'}}>
                                        
                                                <input type="checkbox" className="custom-control-input" id= {"checkIfLoggedIn"} style={{backgroundPositionX: "50%", backgroundPositionY: "50%",backgroundRepeat: "no-repeat", backgroundSize:"50% 50%", boxSizing:"border-box"}}/>

                                                <label className="custom-control-label" style={{ marginLeft:'5px'}} htmlFor="checkIfLoggedIn">keep me logged in</label>

                                            </div>
                                        </div>

                                </div>
 
                          </div>
                           
                           
                              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-xl text-lg px-5 py-2.5  mb-2 mt-6 h-16" disabled ={isLoading}>
                              {isLoading ?
                              "LOADING..." : "SIGN IN"}
                              </button>
                     
                        </div>
                        {/* <div className="msgicon">
                            <img src={MessageIcon} alt="" />
                        </div> */}
                     
                </form>
        </div>
        
        <Carousel />
        


    </div>
        </div>

        </div>
  
    )

}