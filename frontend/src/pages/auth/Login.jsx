// Import React and useState hook for managing component state
import React, { useState } from 'react'

// Import UI components (ShadCN UI library)
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Icons used for password show/hide and loading spinner
import { Eye, EyeOff, Loader2 } from 'lucide-react'

// Toast notification library
import { toast } from 'sonner'

// React Router utilities
// Link → used to navigate through clickable links
// useNavigate → used to redirect users programmatically
import { Link, useNavigate } from 'react-router-dom'

// Axios is used to make HTTP requests to the backend
import axios from 'axios'





const Login = () => {

    /*
    Access global user state from context
    setUser will store the logged-in user information
    */
    // const {setUser} = getData()

    /*
    useNavigate allows redirecting users to another page
    Example: navigate("/")
    */
    const navigate = useNavigate()

    // Controls whether password is visible or hidden
    const [showPassword, setShowPassword] = useState(false)

    // Controls loading state during login request
    const [isLoading, setIsLoading] = useState(false)

    /*
    Stores login form data

    IMPORTANT:
    These keys must match backend expectations
    Backend login API expects:
    {
      email,
      password
    }
    */
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    /*
    handleChange()

    Runs when user types inside input fields.

    It updates formData state dynamically.
    */
    const handleChange = (e) => {

        // Extract input name and value
        const { name, value } = e.target;

        // Update the specific field in formData
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    /*
    handleSubmit()

    Handles login form submission.
    Sends login data to backend.
    */
    const handleSubmit = async (e) => {

        // Prevent page refresh
        e.preventDefault()

        console.log(formData);

        try {

            // Enable loading spinner
            setIsLoading(true)

            /*
            Send login request to backend

            API:
            POST http://localhost:8000/user/login

            Body:
            {
              email,
              password
            }
            */

            const res = await axios.post(
                `http://localhost:8000/user/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )


            /*
            Backend expected response example:

            {
              success: true,
              message: "Login successful",
              user: {...},
              accessToken: "jwt-token"
            }
            */

            if (res.data.success) {

                // Redirect user to home page
                navigate('/')

                // Save logged-in user in global context
                setUser(res.data.user)

                /*
                Store access token in localStorage
                Used for authenticated requests later
                */
                localStorage.setItem("accessToken", res.data.accessToken)

                // Show success notification
                toast.success(res.data.message)
            }

        } catch (error) {

            // Log errors for debugging
            console.log(error);

        } finally {

            // Stop loading spinner
            setIsLoading(false)
        }

    }



    return (

        /*
        UI SECTION

        This part controls the design of the login page.
        You can safely change:

        - colors
        - layout
        - tailwind classes
        - card styles
        - spacing
        - icons

        Just make sure the input names remain:
        email
        password
        */

        <div className='relative w-full h-screen md:h-190 bg-green-100 overflow-hidden'>

            <div className='min-h-screen flex flex-col to-muted/20'>

                <div className='flex-1 flex items-center justify-center p-4'>

                    <div className='w-full max-w-md space-y-6 flex flex-col items-center'>

                        {/* Page Heading */}
                        <div className='text-center space-y-2'>

                            <h1 className='text-3xl font-bold tracking-tight text-green-600'>
                                Login into your account
                            </h1>

                            <p className='text-gray-600'>
                                Start organizing your trips
                            </p>

                        </div>


                        {/* Login Card */}
                        <Card className="w-full max-w-sm">

                            <CardHeader className='space-y-1'>

                                <CardTitle className='text-2xl text-center text-green-600'>
                                    Login
                                </CardTitle>

                                <CardDescription className='text-center'>
                                    Login into your account 
                                </CardDescription>

                            </CardHeader>



                            <CardContent>

                                <div className="flex flex-col gap-6">

                                    {/* Email Input Field */}
                                    <div className="grid gap-2">

                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="m@example.com"
                                            required
                                        />

                                    </div>



                                    {/* Password Input Field */}
                                    <div className="grid gap-2">

                                        {/* Password label and forgot password link */}
                                        <div className='flex items-center justify-between'>

                                            <Label htmlFor="password">Password</Label>

                                            {/* Navigate to forgot password page */}
                                            <Link className='text-sm' to={'/forgot-password'}>
                                                Forgot your password?
                                            </Link>

                                        </div>


                                        <div className='relative'>

                                            <Input
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}

                                                // Toggle password visibility
                                                type={showPassword ? "text" : "password"}

                                                required
                                            />


                                            {/* Show / Hide Password Button */}
                                            <Button
                                                variant='ghost'
                                                size="sm"
                                                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >

                                                {
                                                    showPassword
                                                        ? <EyeOff className="w-4 h-4 text-gray-600" />
                                                        : <Eye className="w-4 h-4 text-gray-600" />
                                                }

                                            </Button>

                                        </div>

                                    </div>

                                </div>

                            </CardContent>



                            <CardFooter className="flex-col gap-2">

                                {/* Login Button */}
                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-500"
                                >

                                    {/* Show loading spinner while logging in */}
                                    {
                                        isLoading ? (
                                            <>
                                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                Logging into your account..
                                            </>
                                        ) : "Login"
                                    }

                                </Button>



                              

                            </CardFooter>

                        </Card>

                    </div>

                </div>

            </div>

        </div>
    )
}

// Export component
export default Login


