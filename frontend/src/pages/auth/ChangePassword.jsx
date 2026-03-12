// Import Button and Input components from shadcn UI
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Axios for making API requests
import axios from 'axios'

// Loader icon for loading animation
import { Loader2 } from 'lucide-react'

// React and useState hook for state management
import React, { useState } from 'react'

// React Router hooks
import { useNavigate, useParams } from 'react-router-dom'

const ChangePassword = () => {

    // Get email from URL params
    // Example route: /change-password/test@gmail.com
    const { email } = useParams()

    // State to store error message
    const [error, setError] = useState("")

    // State to store success message
    const [success, setSuccess] = useState("")

    // State to show loading while API request is running
    const [isLoading, setIsLoading] = useState(false)

    // State to store new password input
    const [newPassword, setNewPassword] = useState("")

    // State to store confirm password input
    const [confirmPassword, setConfirmPassword] = useState("")

    // Hook to redirect user to another page
    const navigate = useNavigate()

    // Function that runs when user clicks "Change Password"
    const handleChangePassword = async () => {

        // Clear previous error and success messages
        setError("")
        setSuccess("")

        // Check if fields are empty
        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {

            // Start loading state
            setIsLoading(true)

            // Send POST request to backend with new password
            const res = await axios.post(
                `http://localhost:8000/user/change-password/${email}`,
                {
                    newPassword,
                    confirmPassword
                }
            )

            // If password change successful show message
            setSuccess(res.data.message)

            // After 2 seconds redirect to login page
            setTimeout(() => {
                navigate('/login')
            }, 2000)

        } catch (error) {

            // Show backend error message if exists
            setError(error.response?.data?.message || "Something went wrong")

        } finally {

            // Stop loading spinner
            setIsLoading(false)
        }
    }

    return (

        // Full screen container with center alignment
        <div className='min-h-screen flex items-center justify-center bg-green-100 px-4'>

            {/* Card container */}
            <div className='bg-white shadow-md rounded-lg p-5 max-w-md w-full'>

                {/* Page title */}
                <h2 className='text-2xl font-semibold mb-4 text-center'>
                    Change Password
                </h2>

                {/* Show which email the password is being changed for */}
                <p className='text-sm text-gray-500 text-center mb-4'>
                    Set a new password for
                    <span className='font-semibold'>{email}</span>
                </p>

                {/* Show error message */}
                {error && (
                    <p className='text-red-500 text-sm mb-3 text-center'>
                        {error}
                    </p>
                )}

                {/* Show success message */}
                {success && (
                    <p className='text-green-500 text-sm mb-3 text-center'>
                        {success}
                    </p>
                )}

                {/* Input fields container */}
                <div className='space-y-4'>

                    {/* New password input */}
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    {/* Confirm password input */}
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {/* Change password button */}
                    <Button
                        className='w-full bg-green-600 hover:bg-green-500'

                        // Disable button while loading
                        disabled={isLoading}

                        // Run function when button clicked
                        onClick={handleChangePassword}
                    >

                        {/* Show loader if request is running */}
                        {
                            isLoading
                                ? (
                                    <>
                                        <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                                        Changing
                                    </>
                                )
                                : "Change Password"
                        }

                    </Button>

                </div>
            </div>
        </div>
    )
}

// Export component so it can be used in routes
export default ChangePassword
