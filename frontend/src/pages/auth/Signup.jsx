// React and state hook
import React, { useState } from 'react'

// UI components (you can change these if redesigning UI)
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

// Icons (safe to change for UI redesign)
import { Eye, EyeOff, Loader2 } from 'lucide-react'

// Toast notification library
import { toast } from 'sonner'

// Router navigation hook
import { useNavigate } from 'react-router-dom'

// Axios for making API requests to backend
import axios from 'axios'



const Signup = () => {

    // Used to navigate to other pages after successful signup
    const navigate = useNavigate()

    // Controls password visibility
    const [showPassword, setShowPassword] = useState(false)

    // Controls loading spinner while API request is running
    const [isLoading, setIsLoading] = useState(false)

    /*
    IMPORTANT FOR BACKEND CONNECTION

    These keys must remain the same if backend expects:
    {
      username,
      email,
      password
    }

    If you change these names, backend may stop working.
    */
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    })


    /*
    handleChange()

    Updates formData when user types.

    IMPORTANT:
    The input 'name' attributes must match
    the keys in formData (username, email, password)
    otherwise backend data will break.
    */
    const handleChange = (e)=>{
       const {name, value} = e.target;

       setFormData((prev)=>({
        ...prev,
        [name]:value
       }))
    }


    /*
    handleSubmit()

    Sends signup data to backend API
    */
    const handleSubmit = async(e)=>{
        e.preventDefault()

        console.log(formData)

        try {

            setIsLoading(true)

            /*
            VERY IMPORTANT: DO NOT CHANGE THESE
            ------------------------------------

            1️⃣ API URL
            http://localhost:8000/user/register

            2️⃣ HTTP METHOD
            POST

            3️⃣ Request Body
            formData must contain:
            username
            email
            password

            If backend changes, update here.
            Otherwise leave it unchanged.
            */

            const res = await axios.post(
                "http://localhost:8000/user/register",
                formData,
                {
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            )


            /*
            Backend expected response example:

            {
              success: true,
              message: "User registered successfully"
            }
            */

            if(res.data.success){

                // Navigate to email verification page
                // Make sure this route exists in router
                navigate('/verify')

                // Show success message
                toast.success(res.data.message)
            }

        } catch (error) {

            console.log(error)

        } finally{

            // Stop loading spinner
            setIsLoading(false)
        }
        
    }



    return (

        /*
        UI SECTION

        Everything here is SAFE to change when redesigning UI:

        - colors
        - layout
        - tailwind classes
        - card design
        - icons
        - spacing
        - typography

        Just make sure:
        input name attributes remain the same.
        */

        <div className='relative w-full h-screen md:h-190 bg-green-100 overflow-hidden'>

            <div className='min-h-screen flex flex-col to-muted/20'>

                <div className='flex-1 flex items-center justify-center p-4'>

                    <div className='w-full max-w-md space-y-6'>

                        {/* Page heading */}
                        <div className='text-ceter space-y-2'>
                            <h1 className='text-3xl font-bold tracking-tight text-green-600'>
                                Create your account
                            </h1>

                            <p className='text-gray-600'>
                                Start organizing your thoughts and ideas today
                            </p>
                        </div>


                        {/* Signup Card */}
                        <Card className="w-full max-w-sm">

                            <CardHeader className='space-y-1'>

                                <CardTitle className='text-2xl text-center text-green-600'>
                                    Sign up
                                </CardTitle>

                                <CardDescription className='text-center'>
                                    Create your account to get started with Notes App
                                </CardDescription>

                            </CardHeader>


                            <CardContent>

                                <div className="flex flex-col gap-6">

                                    {/* Full Name Input */}
                                    <div className="grid gap-2">

                                        <Label htmlFor="full name">Full Name</Label>

                                        {/* 
                                        IMPORTANT:
                                        name="username" must remain unchanged
                                        because backend expects "username"
                                        */}
                                        <Input
                                            id="full name"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>



                                    {/* Email Input */}
                                    <div className="grid gap-2">

                                        <Label htmlFor="email">Email</Label>

                                        {/* name="email" must remain same */}
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



                                    {/* Password Input */}
                                    <div className="grid gap-2">

                                        <Label htmlFor="password">Password</Label>

                                        <div className='relative'>

                                            {/* name="password" must remain same */}
                                            <Input 
                                                id="password" 
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={showPassword ? "text":"password"} 
                                                required 
                                            />

                                            {/* Toggle show/hide password */}
                                            <Button 
                                                variant='ghost' 
                                                size="sm"
                                                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                                                onClick={()=>setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                            >

                                                {
                                                    showPassword
                                                    ? <EyeOff className="w-4 h-4 text-gray-600"/>
                                                    : <Eye className="w-4 h-4 text-gray-600"/>
                                                }

                                            </Button>

                                        </div>

                                    </div>

                                </div>

                            </CardContent>



                            <CardFooter className="flex-col gap-2">

                                {/* Submit Button */}
                                <Button 
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-500"
                                >

                                    {/* Loading indicator */}
                                    {
                                        isLoading ? (
                                        <>
                                         <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                                         Creating account..
                                        </>
                                        ) : "Signup"
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

export default Signup
