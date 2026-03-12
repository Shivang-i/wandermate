// Import UI components from shadcn
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Axios for making API requests
import axios from 'axios'

// Icons used in the UI
import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'

// React hooks
import React, { useRef, useState } from 'react'

// React Router hooks
import { Link, useNavigate, useParams } from 'react-router-dom'

const VerifyOTP = () => {

  // State to check if OTP is verified
  const [isVerified, setIsVerified] = useState(false)

  // State to store error message
  const [error, setError] = useState("")

  // State to store success message
  const [successMessage, setSuccessMessage] = useState("")

  // State to store OTP digits (6 input boxes)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  // Loading state for API request
  const [isLoading, setIsLoading] = useState(false)

  // useRef to store references of input fields (for auto focus)
  const inputRefs = useRef([])

  // Get email from URL params
  const { email } = useParams()

  // Hook for navigation
  const navigate = useNavigate()

  // Function to handle OTP input changes
  const handleChange = (index, value) => {

    // Prevent entering more than one character
    if (value.length > 1) return

    // Copy current OTP array
    const updatedOtp = [...otp]

    // Update the specific index with new value
    updatedOtp[index] = value

    // Update state
    setOtp(updatedOtp)

    // Automatically move cursor to next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Function to verify OTP
  const handleVerify = async () => {

    // Join all digits into one string
    const finalOtp = otp.join("")

    // Check if OTP is complete
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    try {

      // Start loading
      setIsLoading(true)

      // Send OTP to backend
      const res = await axios.post(
        `http://localhost:8000/user/verify-otp/${email}`,
        {
          otp: finalOtp,
        }
      )

      // Show success message
      setSuccessMessage(res.data.message)

      // Redirect to change password page after 2 seconds
      setTimeout(() => {
        navigate(`/change-password/${email}`)
      }, 2000)

    } catch (error) {

      // Show error message from backend
      setError(error.response?.data?.message || "Something went wrong")

    } finally {

      // Stop loading
      setIsLoading(false)
    }
  }

  // Function to clear OTP inputs
  const clearOtp = () => {

    // Reset OTP array
    setOtp(["", "", "", "", "", ""])

    // Clear error message
    setError("")

    // Focus on first input
    inputRefs.current[0]?.focus()
  }

  return (

    // Full page container
    <div className='min-h-screen flex flex-col bg-green-100'>

      {/* Main content */}
      <div className='flex-1 flex items-center justify-center p-4'>

        <div className='w-full max-w-md space-y-6'>

          {/* Title section */}
          <div className='text-center space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight text-green-600'>
              Verfiy your email
            </h1>

            <p className='text-muted-foreground'>
              We've sent a 6-digit verification code to{" "}
              <span>{"your email"}</span>
            </p>
          </div>

          {/* Card container */}
          <Card className='shadow-lg'>

            {/* Card Header */}
            <CardHeader className='space-y-1'>

              <CardTitle className='text-2xl text-center text-green-600'>
                Enter verification code
              </CardTitle>

              {/* Dynamic description depending on verification status */}
              <CardDescription className='text-center'>
                {
                  isVerified
                    ? "Code verified successfully! Redirecting..."
                    : "Enter the 6-digit code sent to your email"
                }
              </CardDescription>

            </CardHeader>

            {/* Card Content */}
            <CardContent className='space-y-6'>

              {/* Show error message */}
              {
                error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )
              }

              {/* Show success message */}
              {successMessage && (
                <p className='text-green-500 text-sm mb-3 text-center'>
                  {successMessage}
                </p>
              )}

              {
                isVerified ? (

                  // If OTP verified show success UI
                  <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>

                    <div className='bg-primary/10 rounded-full p-3'>
                      <CheckCircle className='h-6 w-6 text-primary' />
                    </div>

                    <div className='space-y-2'>
                      <h3 className='font-medium text-lg'>
                        Verification successfull
                      </h3>

                      <p className='text-muted-foreground'>
                        Your email has been verified. you'll be redirected to reset your password
                      </p>
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span className='text-sm text-muted-foreground'>
                        Redirecting...
                      </span>
                    </div>

                  </div>

                ) : (

                  <>
                    {/* OTP input boxes */}
                    <div className='flex justify-between mb-6'>
                      {
                        otp.map((digit, index) => (
                          <Input
                            key={index}
                            type="text"
                            value={digit}

                            // Update OTP value when user types
                            onChange={(e) => handleChange(index, e.target.value)}

                            maxLength={1}

                            // Store reference of each input
                            ref={(el) => (inputRefs.current[index] = el)}

                            className="w-12 h-12 text-center text-xl font-bold"
                          />
                        ))
                      }
                    </div>

                    {/* Buttons */}
                    <div className='space-y-3'>

                      {/* Verify button */}
                      <Button
                        onClick={handleVerify}

                        // Disable button if loading or OTP incomplete
                        disabled={isLoading || otp.some((digit) => digit === "")}

                        className='bg-green-600 w-full'
                      >
                        {
                          isLoading
                            ? <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Verifiying
                              </>
                            : "Verify code"
                        }
                      </Button>

                      {/* Clear OTP button */}
                      <Button
                        variant='outline'
                        onClick={clearOtp}
                        className='w-full bg-transparent'
                        disabled={isLoading || isVerified}
                      >
                        <RotateCcw className='mr-2 h-4 w-4' />
                        Clear
                      </Button>

                    </div>
                  </>
                )
              }

            </CardContent>

            {/* Card Footer */}
            <CardFooter className='flex justify-center'>

              <p className='text-sm text-muted-foreground'>
                Wrong email?{" "}
                <Link
                  to={'/forgot-password'}
                  className='text-green-600 hover:underline font-medium'
                >
                  Go back
                </Link>
              </p>

            </CardFooter>

          </Card>

          {/* Testing message */}
          <div className='text-center text-xs text-muted-foreground'>
            <p>
              Fot testing purposes, use code:
              <span className='font-mono font-medium'>123456</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

// Export component
export default VerifyOTP
