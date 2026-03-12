// Import UI components from your shadcn/ui folder
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Import axios for API requests
import axios from 'axios'

// Icons from lucide-react
import { CheckCircle, Loader2 } from 'lucide-react'

// React hooks
import React, { useState } from 'react'

// React Router tools
import { Link, useNavigate } from 'react-router-dom'

// Toast notification library
import { toast } from 'sonner'

const ForgotPassword = () => {

    // State to show loading spinner while API request is running
    const [isLoading, setIsLoading] = useState(false)

    // State to store any error message
    const [error, setError] = useState("")

    // State to store the user's email input
    const [email, setEmail] = useState("")

    // State to track if the form has been successfully submitted
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Hook to navigate programmatically to another route
    const navigate = useNavigate()

    // Function that runs when the form is submitted
    const handleForgotPassword = async (e) => {

        // Prevent page refresh on form submit
        e.preventDefault()

        try {
            // Start loading state
            setIsLoading(true)

            // Send POST request to backend with email
            const res = await axios.post(`http://localhost:8000/user/forgot-password`, {
                email
            });

            // If backend responds with success
            if (res.data.success) {

                // Navigate to OTP verification page
                navigate(`/verify-otp/${email}`)

                // Show success toast message
                toast.success(res.data.message)

                // Clear email input
                setEmail("")
            }

        } catch (error) {

            // Log error in console if API fails
            console.log(error);

        } finally {

            // Stop loading state whether success or error
            setIsLoading(false)
        }
    }

    return (
        // Main container with background color and fixed height
        <div className='relative w-full h-190 bg-green-100 overflow-hidden'>

            <div className='min-h-screen flex flex-col'>

                {/* Main centered content */}
                <div className='flex-1 flex items-center justify-center p-4'>

                    {/* Form container */}
                    <div className='w-full max-w-md space-y-6'>

                        {/* Page title and description */}
                        <div className='text-center space-y-2'>
                            <h1 className='text-3xl font-bold tracking-tight text-green-600'>
                                Reset Your password
                            </h1>

                            <p className='text-muted-foreground'>
                                Enter your email address and we'll send you instructions to reset your password
                            </p>
                        </div>

                        {/* Card UI */}
                        <Card className='bg-white'>

                            {/* Card Header */}
                            <CardHeader className='space-y-1'>

                                <CardTitle className='text-2xl text-center text-green-600'>
                                    Forgot Password
                                </CardTitle>

                                {/* Description changes depending on submission */}
                                <CardDescription className='text-center'>
                                    {
                                        isSubmitted
                                            ? "Check your email for reset instructions"
                                            : "Enter your email address to recieve a password reset link"
                                    }
                                </CardDescription>

                            </CardHeader>

                            {/* Card Content */}
                            <CardContent className='space-y-4'>

                                {/* Show error message if exists */}
                                {
                                    error && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )
                                }

                                {/* If form already submitted show success message */}
                                {
                                    isSubmitted ? (

                                        <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>

                                            {/* Success icon */}
                                            <div className='bg-primary/10 rounded-full p-3'>
                                                <CheckCircle className='h-6 w-6 text-primary' />
                                            </div>

                                            <div className='space-y-2'>

                                                <h3 className='font-medium text-lg'>Check your inbox</h3>

                                                {/* Show the email used */}
                                                <p className='text-muted-foreground'>
                                                    We've sent a password reset link to
                                                    <span className='font-medium text-foreground'>
                                                        {email}
                                                    </span>
                                                </p>

                                                {/* Retry option */}
                                                <p>
                                                    If you don't see the email, check your spam folder or{" "}
                                                    <button
                                                        className='text-primary hover:underline font-medium'
                                                        onClick={() => setIsSubmitted(false)}
                                                    >
                                                        try again
                                                    </button>
                                                </p>

                                            </div>
                                        </div>

                                    ) : (

                                        // Form for entering email
                                        <form onSubmit={handleForgotPassword} className='space-y-4'>

                                            {/* Email input field */}
                                            <div className='space-y-2 relative text-gray-800'>

                                                <Label>Email</Label>

                                                <Input
                                                    type='email'
                                                    placeholder="Enter your email address"

                                                    // Bind input value with state
                                                    value={email}

                                                    // Update state when user types
                                                    onChange={(e) => setEmail(e.target.value)}

                                                    required

                                                    // Disable input while loading
                                                    disabled={isLoading}
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <Button className="w-full bg-green-600 text-white relative hover:bg-green-500 cursor-pointer">

                                                {
                                                    isLoading ? (

                                                        // Show loading spinner
                                                        <>
                                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                            Sending reset link..
                                                        </>

                                                    ) : ("Send reset link")
                                                }

                                            </Button>

                                        </form>
                                    )
                                }

                            </CardContent>

                            {/* Card Footer */}
                            <CardFooter className='flex justify-center'>

                                {/* Link to login page */}
                                <p>
                                    Remember your password?{" "}
                                    <Link
                                        to={'/login'}
                                        className='text-green-600 hover:underline font-medium relative'
                                    >
                                        Sign in
                                    </Link>
                                </p>

                            </CardFooter>

                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}

// Export component so it can be used in routes
export default ForgotPassword
