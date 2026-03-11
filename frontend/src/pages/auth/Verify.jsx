// Import axios to send HTTP requests to backend
import axios from 'axios'

// Import React hooks
import React, { useEffect, useState } from 'react'

// Import React Router hooks
// useNavigate → used to redirect user to another page
// useParams → used to read parameters from URL
import { useNavigate, useParams } from 'react-router-dom'


// Email Verification Component
const Verify = () => {

    /*
    useParams() reads parameters from the URL.

    Your route should look like:
    /verify/:token

    Example URL:
    http://localhost:5173/verify/abc123token

    token = "abc123token"
    */
    const {token} = useParams()

    /*
    status state controls the message shown to the user
    Default message: "Verifying..."
    */
    const [status, setStatus] = useState("Verifying...")

    /*
    useNavigate() allows us to redirect users
    Example: navigate('/login')
    */
    const navigate = useNavigate()


    /*
    useEffect runs when the component loads

    Dependencies:
    token → if token changes
    navigate → router dependency
    */
    useEffect(()=>{

        /*
        Function that calls backend API to verify email
        */
        const verifyEmail = async()=>{

            try {

                /*
                Send POST request to backend

                API:
                POST http://localhost:8000/user/verify

                Body:
                {} (empty)

                Header:
                Authorization: Bearer <token>

                The token is sent in the header so backend
                can verify if it is valid.
                */

                const res = await axios.post(
                    `http://localhost:8000/user/verify`,
                    {},
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )


                /*
                Backend should return something like:

                {
                    success: true,
                    message: "Email verified"
                }
                */

                if(res.data.success){

                    // Update message on screen
                    setStatus("✅ Email Verified Successfully")

                    /*
                    After successful verification
                    wait 2 seconds then redirect to login page
                    */

                    setTimeout(()=>{
                        navigate('/login')
                    }, 2000)

                }else{

                    // If backend says token invalid
                    setStatus("❌ Invalid or Expired Token")
                }

            } catch (error) {

                // Log error in console for debugging
                console.log(error)

                // Show error message to user
                setStatus("❌ Verification Failed. Please try again")
                
            }
        };


        /*
        Call the verifyEmail function
        when the page loads
        */
        verifyEmail()

    },[token, navigate]) // dependencies



  return (

    /*
    UI SECTION
    This displays the verification status message
    */

    <div className='relative w-full h-190 bg-green-100 overflow-hidden'>

       <div className='min-h-screen flex items-center justify-center'>

        {/* Verification message card */}
        <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>

            {/* Display current status message */}
            <h2 className='text-xl font-semibold text-gray-800'>
                {status}
            </h2>

        </div>

       </div>

    </div>
  )
}

// Export component so it can be used in router
export default Verify
