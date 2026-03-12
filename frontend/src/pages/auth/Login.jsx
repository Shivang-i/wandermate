// // Import React and useState hook for managing component state
// import React, { useState } from 'react'

// // Import UI components (ShadCN UI library)
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// // Icons used for password show/hide and loading spinner
// import { Eye, EyeOff, Loader2 } from 'lucide-react'

// // Toast notification library
// import { toast } from 'sonner'

// // React Router utilities
// // Link → used to navigate through clickable links
// // useNavigate → used to redirect users programmatically
// import { Link, useNavigate } from 'react-router-dom'

// // Axios is used to make HTTP requests to the backend
// import axios from 'axios'





// const Login = () => {

//     /*
//     Access global user state from context
//     setUser will store the logged-in user information
//     */
//     // const {setUser} = getData()

//     /*
//     useNavigate allows redirecting users to another page
//     Example: navigate("/")
//     */
//     const navigate = useNavigate()

//     // Controls whether password is visible or hidden
//     const [showPassword, setShowPassword] = useState(false)

//     // Controls loading state during login request
//     const [isLoading, setIsLoading] = useState(false)

//     /*
//     Stores login form data

//     IMPORTANT:
//     These keys must match backend expectations
//     Backend login API expects:
//     {
//       email,
//       password
//     }
//     */
//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     })


//     /*
//     handleChange()

//     Runs when user types inside input fields.

//     It updates formData state dynamically.
//     */
//     const handleChange = (e) => {

//         // Extract input name and value
//         const { name, value } = e.target;

//         // Update the specific field in formData
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//     }


//     /*
//     handleSubmit()

//     Handles login form submission.
//     Sends login data to backend.
//     */
//     const handleSubmit = async (e) => {

//         // Prevent page refresh
//         e.preventDefault()

//         console.log(formData);

//         try {

//             // Enable loading spinner
//             setIsLoading(true)

//             /*
//             Send login request to backend

//             API:
//             POST http://localhost:8000/user/login

//             Body:
//             {
//               email,
//               password
//             }
//             */

//             const res = await axios.post(
//                 `http://localhost:8000/user/login`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }
//             )


//             /*
//             Backend expected response example:

//             {
//               success: true,
//               message: "Login successful",
//               user: {...},
//               accessToken: "jwt-token"
//             }
//             */

//             if (res.data.success) {

//                 // Redirect user to home page
//                 navigate('/')

//                 // Save logged-in user in global context
//                 setUser(res.data.user)

//                 /*
//                 Store access token in localStorage
//                 Used for authenticated requests later
//                 */
//                 localStorage.setItem("accessToken", res.data.accessToken)

//                 // Show success notification
//                 toast.success(res.data.message)
//             }

//         } catch (error) {

//             // Log errors for debugging
//             console.log(error);

//         } finally {

//             // Stop loading spinner
//             setIsLoading(false)
//         }

//     }



//     return (

//         /*
//         UI SECTION

//         This part controls the design of the login page.
//         You can safely change:

//         - colors
//         - layout
//         - tailwind classes
//         - card styles
//         - spacing
//         - icons

//         Just make sure the input names remain:
//         email
//         password
//         */

//         <div className='relative w-full h-screen md:h-190 bg-green-100 overflow-hidden'>

//             <div className='min-h-screen flex flex-col to-muted/20'>

//                 <div className='flex-1 flex items-center justify-center p-4'>

//                     <div className='w-full max-w-md space-y-6 flex flex-col items-center'>

//                         {/* Page Heading */}
//                         <div className='text-center space-y-2'>

//                             <h1 className='text-3xl font-bold tracking-tight text-green-600'>
//                                 Login into your account
//                             </h1>

//                             <p className='text-gray-600'>
//                                 Start organizing your trips
//                             </p>

//                         </div>


//                         {/* Login Card */}
//                         <Card className="w-full max-w-sm">

//                             <CardHeader className='space-y-1'>

//                                 <CardTitle className='text-2xl text-center text-green-600'>
//                                     Login
//                                 </CardTitle>

//                                 <CardDescription className='text-center'>
//                                     Login into your account 
//                                 </CardDescription>

//                             </CardHeader>



//                             <CardContent>

//                                 <div className="flex flex-col gap-6">

//                                     {/* Email Input Field */}
//                                     <div className="grid gap-2">

//                                         <Label htmlFor="email">Email</Label>

//                                         <Input
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             placeholder="m@example.com"
//                                             required
//                                         />

//                                     </div>



//                                     {/* Password Input Field */}
//                                     <div className="grid gap-2">

//                                         {/* Password label and forgot password link */}
//                                         <div className='flex items-center justify-between'>

//                                             <Label htmlFor="password">Password</Label>

//                                             {/* Navigate to forgot password page */}
//                                             <Link className='text-sm' to={'/forgot-password'}>
//                                                 Forgot your password?
//                                             </Link>

//                                         </div>


//                                         <div className='relative'>

//                                             <Input
//                                                 id="password"
//                                                 name="password"
//                                                 placeholder="Enter your password"
//                                                 value={formData.password}
//                                                 onChange={handleChange}

//                                                 // Toggle password visibility
//                                                 type={showPassword ? "text" : "password"}

//                                                 required
//                                             />


//                                             {/* Show / Hide Password Button */}
//                                             <Button
//                                                 variant='ghost'
//                                                 size="sm"
//                                                 className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 disabled={isLoading}
//                                             >

//                                                 {
//                                                     showPassword
//                                                         ? <EyeOff className="w-4 h-4 text-gray-600" />
//                                                         : <Eye className="w-4 h-4 text-gray-600" />
//                                                 }

//                                             </Button>

//                                         </div>

//                                     </div>

//                                 </div>

//                             </CardContent>



//                             <CardFooter className="flex-col gap-2">

//                                 {/* Login Button */}
//                                 <Button
//                                     onClick={handleSubmit}
//                                     type="submit"
//                                     className="w-full bg-green-600 hover:bg-green-500"
//                                 >

//                                     {/* Show loading spinner while logging in */}
//                                     {
//                                         isLoading ? (
//                                             <>
//                                                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                                                 Logging into your account..
//                                             </>
//                                         ) : "Login"
//                                     }

//                                 </Button>



                              

//                             </CardFooter>

//                         </Card>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     )
// }

// // Export component
// export default Login



import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineEmail, MdLockOutline, MdPersonOutline } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

/* ─────────────── Inline Styles ─────────────── */
const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 50%, #fefce8 100%)",
    padding: "1rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  rootBg: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    background:
      "radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    minHeight: "540px",
    borderRadius: "20px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
    overflow: "hidden",
    background: "#fff",
  },
  left: {
    flex: 1,
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
  },
  back: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#6b7280",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
  logo: {
    height: "32px",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 6px 0",
  },
  sub: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 1.8rem 0",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "1rem",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    color: "#9ca3af",
    fontSize: "16px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "10px 40px 10px 36px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    background: "#fafafa",
  },
  eye: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9ca3af",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
  },
  submit: {
    marginTop: "0.5rem",
    width: "100%",
    padding: "11px",
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "opacity 0.2s, transform 0.1s",
  },
  switchText: {
    marginTop: "1rem",
    fontSize: "13px",
    color: "#6b7280",
    textAlign: "center",
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#16a34a",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
  },
  forgotLink: {
    fontSize: "12px",
    color: "#16a34a",
    textDecoration: "none",
    marginLeft: "auto",
  },
  right: {
    width: "42%",
    background: "linear-gradient(160deg, #d1fae5 0%, #bbf7d0 40%, #86efac 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rightPlaceholder: {
    textAlign: "center",
    color: "#166534",
    opacity: 0.5,
  },
  rightIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "8px",
  },
};

/* ── Login Form ── */
const LoginForm = ({ onSwitch }) => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8000/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.form}>
      <h1 style={styles.title}>Welcome Back!</h1>
      <p style={styles.sub}>Log in to continue your adventure.</p>

      <div style={styles.field}>
        <label style={styles.label}>Email Address</label>
        <div style={styles.inputWrap}>
          <MdOutlineEmail style={styles.inputIcon} />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={styles.field}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={styles.label}>Password</label>
          <Link to="/forgot-password" style={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>
        <div style={styles.inputWrap}>
          <MdLockOutline style={styles.inputIcon} />
          <input
            style={styles.input}
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button style={styles.eye} type="button" onClick={() => setShowPass((s) => !s)}>
            {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
      </div>

      <button
        style={{ ...styles.submit, opacity: isLoading ? 0.75 : 1 }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Logging in…
          </>
        ) : (
          "Log In →"
        )}
      </button>

      <p style={styles.switchText}>
        Don't have an account?{" "}
        <button style={styles.switchBtn} onClick={onSwitch}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

/* ── Sign Up Form ── */
const SignupForm = ({ onSwitch }) => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:8000/user/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Account created!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.form}>
      <h1 style={styles.title}>Create Account</h1>
      <p style={styles.sub}>Join 12M+ travellers exploring with Wandermate.</p>

      <div style={styles.field}>
        <label style={styles.label}>Full Name</label>
        <div style={styles.inputWrap}>
          <MdPersonOutline style={styles.inputIcon} />
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Email Address</label>
        <div style={styles.inputWrap}>
          <MdOutlineEmail style={styles.inputIcon} />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Password</label>
        <div style={styles.inputWrap}>
          <MdLockOutline style={styles.inputIcon} />
          <input
            style={styles.input}
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={handleChange}
          />
          <button style={styles.eye} type="button" onClick={() => setShowPass((s) => !s)}>
            {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
      </div>

      <button
        style={{ ...styles.submit, opacity: isLoading ? 0.75 : 1 }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating account…
          </>
        ) : (
          "Create Account →"
        )}
      </button>

      <p style={styles.switchText}>
        Already have an account?{" "}
        <button style={styles.switchBtn} onClick={onSwitch}>
          Log In
        </button>
      </p>
    </div>
  );
};

/* ── Root ── */
const LoginPage = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <div style={styles.rootBg} />
      <div style={styles.card}>
        {/* Left Panel */}
        <div style={styles.left}>
          {/* Top Bar */}
          <div style={styles.topbar}>
            <button style={styles.back} onClick={() => navigate("/")}>
              <IoArrowBack />
              <span>Back</span>
            </button>
            {/* Replace src with your actual logo import */}
            <img
              src="/logo.svg"
              alt="Wandermate"
              style={styles.logo}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Form */}
          <div key={mode}>
            {mode === "login" ? (
              <LoginForm onSwitch={() => setMode("signup")} />
            ) : (
              <SignupForm onSwitch={() => setMode("login")} />
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.right}>
          <div style={styles.rightPlaceholder}>
            <span style={styles.rightIcon}>📸</span>
            <p>Add your image here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;