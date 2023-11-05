
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/LogIn.css'
import { FormEvent } from 'react';
import Carousel from '../components/Carousel';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const defaultFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';


interface IUserInformation{
    _id : string,
    company : string,
    email: string,
    firstName: string,
    middleName : string,
    lastName : string,
    isAllowedToTorFuel : boolean,
    isAllowedToTorInspection: boolean,
    isAllowedToTorMain : boolean,
    isAllowedToTorRemittance : boolean,
    isAllowedToTorTicket: boolean,
    isAllowedToTorTrip: boolean,
    isAllowedToTorTrouble: boolean,
    isAllowedToTorViolation: boolean,
    isEmailVerified: boolean,
    password: string,
    role: string,
    profileImageUrl: string,
    updatedAt: Date,
}

export default function TestLogin() : JSX.Element {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    

    useEffect(() =>{

        if(localStorage.getItem('token')){
            navigate('/dashboard')
        }

        return () =>{}

    },[username, password])

    async function handleSubmitLoggedIn(event : FormEvent){

        event.preventDefault();
    
        try{

            const request = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth`, {
                "email" : username,
                "password" : password
            } ,{})
            
            const response = await request.data;

   
            console.log(response.messages[0].message)
            if(response.messages[0].message === "OK"){
                InsertToStorage(response.response)
                localStorage.setItem('token', response.response.email)
                console.log("pumasokdito")
                if(localStorage.getItem('token')){
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
    
        }catch(e){
            console.error("Error in login ",e );
        }
    
    }



    async function InsertToStorage (data : IUserInformation){

       
  
        try{
   
        console.log("Email ",data.email)

  
        localStorage.setItem('role' , data.role)
        localStorage.setItem('isTorMain' , data.
        isAllowedToTorMain.toString())
        localStorage.setItem('isTorTicket' , data.isAllowedToTorTicket.toString())
        localStorage.setItem('isTorFuel' , data.isAllowedToTorFuel.toString())
        localStorage.setItem('isTorRemittance' , data.isAllowedToTorRemittance.toString())
        localStorage.setItem('isTorInspection' , data.isAllowedToTorInspection.toString())
        localStorage.setItem('isTorTrip' , data.isAllowedToTorTrip.toString())
        localStorage.setItem('isTorViolation' , data.isAllowedToTorViolation.toString())
        localStorage.setItem('isTorTrouble' , data.isAllowedToTorTrouble.toString())
        }catch(e){
          console.log(`Error in getting user: ${e}`)
        }
  
      }
  

    return(
        <>
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
            marginTop: '7em',
            marginBottom: '6em'
        }}
        >
                <form id="loginform" className="loginform" style={{background:'white',
            padding: '1em',
            border: '5px solid whitesmoke',
            height: 'auto', 
            }} onSubmit={handleSubmitLoggedIn} >
                        <img src={import.meta.env.VITE_ASSET_URL+"/assets/Filipay-logo.png"} alt=""  />
                      
                    
                        <div className="loginInputs">
                            <div className="signinlabel">
                                <span className="mb-1" style ={{fontFamily:defaultFont}}>Sign In</span>
                            </div>

                            <div className="form-group" style={{}}>
                                <label htmlFor="exampleInputEmail1" style={{marginBottom: '0.5rem', 
                                
                                fontFamily:defaultFont}}>Username</label>
                                <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" placeholder="Enter your username" required
                                style={{marginBottom: '1em'}}
                                onChange={(event) => setUsername(event.target.value)}
                                /> 
                              
                    

                              </div>
                              <div className="form-group" style={{marginBottom: '16px'}}>
                                <label htmlFor="password"  style={{marginBottom: '0.5rem', fontFamily:defaultFont}} >Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password"
                                style={{marginBottom: '1em'}}
                                onChange={(event) => setPassword(event.target.value)}
                                />
                                <div className='flex justify-between' >

                                    <div className='flex-1'>
                                            <div  style ={{boxSizing: 'border-box', color:'#212529', display: 'block',  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: '400', lineHeight:'24px', minHeight: '24px', position:'relative', textAlign:'left', textSizeAdjust:'100%'}}>
                                        
                                                <input type="checkbox" className="custom-control-input" id= {"checkIfLoggedIn"} style={{backgroundPositionX: "50%", backgroundPositionY: "50%",backgroundRepeat: "no-repeat", backgroundSize:"50% 50%", boxSizing:"border-box"}}/>

                                                <label className="custom-control-label" style={{ marginLeft:'5px'}} htmlFor="checkIfLoggedIn">keep me logged in</label>

                                            </div>
                                        </div>

                                        <div className='flex-1'>
                                        <div className="forgotPassword">
                                        <a href="#" style ={{color:'#007BFF', fontFamily:defaultFont}}>Forgot password?</a>
                                        </div>
                                        </div>
                                   
                                </div>
                               
                              
                            </div>
                           
                              <button type="submit" className="btn btn-primary mt-3 submitbtn" style = {{fontFamily:defaultFont}}>SIGN IN</button>
                     
                        {/* <DefaultButton /> */}
                        </div>
                        <div className="msgicon">
                            <img src={import.meta.env.VITE_ASSET_URL+"/assets/message-icon.png"} alt="" />
                        </div>
                     
                </form>
        </div>
        
        <Carousel />
        


    </div>
        </>
    )

}