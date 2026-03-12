// // Import UI components from your shadcn/ui folder
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// // Import axios for API requests
// import axios from 'axios'

// // Icons from lucide-react
// import { CheckCircle, Loader2 } from 'lucide-react'

// // React hooks
// import React, { useState } from 'react'

// // React Router tools
// import { Link, useNavigate } from 'react-router-dom'

// // Toast notification library
// import { toast } from 'sonner'

// const ForgotPassword = () => {

//     // State to show loading spinner while API request is running
//     const [isLoading, setIsLoading] = useState(false)

//     // State to store any error message
//     const [error, setError] = useState("")

//     // State to store the user's email input
//     const [email, setEmail] = useState("")

//     // State to track if the form has been successfully submitted
//     const [isSubmitted, setIsSubmitted] = useState(false)

//     // Hook to navigate programmatically to another route
//     const navigate = useNavigate()

//     // Function that runs when the form is submitted
//     const handleForgotPassword = async (e) => {

//         // Prevent page refresh on form submit
//         e.preventDefault()

//         try {
//             // Start loading state
//             setIsLoading(true)

//             // Send POST request to backend with email
//             const res = await axios.post(`http://localhost:8000/user/forgot-password`, {
//                 email
//             });

//             // If backend responds with success
//             if (res.data.success) {

//                 // Navigate to OTP verification page
//                 navigate(`/verify-otp/${email}`)

//                 // Show success toast message
//                 toast.success(res.data.message)

//                 // Clear email input
//                 setEmail("")
//             }

//         } catch (error) {

//             // Log error in console if API fails
//             console.log(error);

//         } finally {

//             // Stop loading state whether success or error
//             setIsLoading(false)
//         }
//     }

//     return (
//         // Main container with background color and fixed height
//         <div className='relative w-full h-190 bg-green-100 overflow-hidden'>

//             <div className='min-h-screen flex flex-col'>

//                 {/* Main centered content */}
//                 <div className='flex-1 flex items-center justify-center p-4'>

//                     {/* Form container */}
//                     <div className='w-full max-w-md space-y-6'>

//                         {/* Page title and description */}
//                         <div className='text-center space-y-2'>
//                             <h1 className='text-3xl font-bold tracking-tight text-green-600'>
//                                 Reset Your password
//                             </h1>

//                             <p className='text-muted-foreground'>
//                                 Enter your email address and we'll send you instructions to reset your password
//                             </p>
//                         </div>

//                         {/* Card UI */}
//                         <Card className='bg-white'>

//                             {/* Card Header */}
//                             <CardHeader className='space-y-1'>

//                                 <CardTitle className='text-2xl text-center text-green-600'>
//                                     Forgot Password
//                                 </CardTitle>

//                                 {/* Description changes depending on submission */}
//                                 <CardDescription className='text-center'>
//                                     {
//                                         isSubmitted
//                                             ? "Check your email for reset instructions"
//                                             : "Enter your email address to recieve a password reset link"
//                                     }
//                                 </CardDescription>

//                             </CardHeader>

//                             {/* Card Content */}
//                             <CardContent className='space-y-4'>

//                                 {/* Show error message if exists */}
//                                 {
//                                     error && (
//                                         <Alert variant="destructive">
//                                             <AlertDescription>{error}</AlertDescription>
//                                         </Alert>
//                                     )
//                                 }

//                                 {/* If form already submitted show success message */}
//                                 {
//                                     isSubmitted ? (

//                                         <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>

//                                             {/* Success icon */}
//                                             <div className='bg-primary/10 rounded-full p-3'>
//                                                 <CheckCircle className='h-6 w-6 text-primary' />
//                                             </div>

//                                             <div className='space-y-2'>

//                                                 <h3 className='font-medium text-lg'>Check your inbox</h3>

//                                                 {/* Show the email used */}
//                                                 <p className='text-muted-foreground'>
//                                                     We've sent a password reset link to
//                                                     <span className='font-medium text-foreground'>
//                                                         {email}
//                                                     </span>
//                                                 </p>

//                                                 {/* Retry option */}
//                                                 <p>
//                                                     If you don't see the email, check your spam folder or{" "}
//                                                     <button
//                                                         className='text-primary hover:underline font-medium'
//                                                         onClick={() => setIsSubmitted(false)}
//                                                     >
//                                                         try again
//                                                     </button>
//                                                 </p>

//                                             </div>
//                                         </div>

//                                     ) : (

//                                         // Form for entering email
//                                         <form onSubmit={handleForgotPassword} className='space-y-4'>

//                                             {/* Email input field */}
//                                             <div className='space-y-2 relative text-gray-800'>

//                                                 <Label>Email</Label>

//                                                 <Input
//                                                     type='email'
//                                                     placeholder="Enter your email address"

//                                                     // Bind input value with state
//                                                     value={email}

//                                                     // Update state when user types
//                                                     onChange={(e) => setEmail(e.target.value)}

//                                                     required

//                                                     // Disable input while loading
//                                                     disabled={isLoading}
//                                                 />
//                                             </div>

//                                             {/* Submit Button */}
//                                             <Button className="w-full bg-green-600 text-white relative hover:bg-green-500 cursor-pointer">

//                                                 {
//                                                     isLoading ? (

//                                                         // Show loading spinner
//                                                         <>
//                                                             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                                                             Sending reset link..
//                                                         </>

//                                                     ) : ("Send reset link")
//                                                 }

//                                             </Button>

//                                         </form>
//                                     )
//                                 }

//                             </CardContent>

//                             {/* Card Footer */}
//                             <CardFooter className='flex justify-center'>

//                                 {/* Link to login page */}
//                                 <p>
//                                     Remember your password?{" "}
//                                     <Link
//                                         to={'/login'}
//                                         className='text-green-600 hover:underline font-medium relative'
//                                     >
//                                         Sign in
//                                     </Link>
//                                 </p>

//                             </CardFooter>

//                         </Card>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// // Export component so it can be used in routes
// export default ForgotPassword


import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'
import { Loader2, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

/* ══════════════════════════════════════════
   STYLES — same theme as login page
══════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --red:    #CE000A;
  --red-dk: #a30008;
  --dark:   #242424;
  --mid:    #606060;
  --light:  #f5f5f5;
  --border: #e8e8e8;
  --white:  #ffffff;
  --fh: 'Playfair Display', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--fb); color: var(--dark); background: var(--light); -webkit-font-smoothing: antialiased; }
button, input { font-family: var(--fb); }
a { color: var(--red); text-decoration: none; }
a:hover { text-decoration: underline; }

.fp-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--light);
}

.fp-card {
  display: flex;
  width: 100%;
  max-width: 820px;
  min-height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 64px rgba(0,0,0,.12);
  border: 1px solid var(--border);
  animation: card-in .4s cubic-bezier(.4,0,.2,1) both;
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(16px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Left panel */
.fp-left {
  flex: 1;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 32px 36px 28px;
}

/* Topbar */
.fp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.fp-back {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--mid);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color .2s;
}
.fp-back:hover { color: var(--red); }
.fp-logo img { height: 24px; width: auto; }

/* Content */
.fp-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: form-in .28s ease both;
}
@keyframes form-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Icon circle */
.fp-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 28px;
  transition: all .3s;
}
.fp-icon-wrap--default {
  background: #fff0f0;
  border: 2px solid #fecaca;
  color: var(--red);
}
.fp-icon-wrap--success {
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  color: #16a34a;
}

/* Title & sub */
.fp-title {
  font-family: var(--fh);
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 4px;
}
.fp-sub {
  font-size: 13px;
  color: var(--mid);
  margin-bottom: 24px;
  line-height: 1.6;
}

/* Divider */
.fp-divider {
  width: 40px;
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  margin-bottom: 24px;
}

/* Field */
.fp-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 14px;
}
.fp-field label {
  font-size: 10px;
  font-weight: 700;
  color: var(--dark);
  text-transform: uppercase;
  letter-spacing: .9px;
}
.fp-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.fp-input-icon {
  position: absolute;
  left: 12px;
  font-size: 16px;
  color: #b0b0b0;
  pointer-events: none;
}
.fp-input-wrap input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  font-size: 13px;
  color: var(--dark);
  background: var(--white);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.fp-input-wrap input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(206,0,10,.07);
}
.fp-input-wrap input::placeholder { color: #c5c5c5; }
.fp-input-wrap input:disabled { opacity: 0.5; cursor: not-allowed; }

/* Error message */
.fp-error {
  font-size: 12px;
  font-weight: 500;
  color: #b91c1c;
  background: #fff0f0;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 14px;
}

/* Submit button */
.fp-submit {
  width: 100%;
  padding: 11px;
  background: var(--red);
  color: var(--white);
  border: none;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(206,0,10,.26);
  transition: background .2s, transform .15s, box-shadow .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 14px;
}
.fp-submit:hover:not(:disabled) { background: var(--red-dk); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(206,0,10,.34); }
.fp-submit:active:not(:disabled) { transform: translateY(0); }
.fp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

/* Switch link */
.fp-switch { font-size: 12px; color: var(--mid); text-align: center; }
.fp-switch a { color: var(--red); font-weight: 700; }

/* ── Success state ── */
.fp-success-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.fp-success-desc {
  font-size: 13px;
  color: var(--mid);
  line-height: 1.7;
  margin-bottom: 6px;
}
.fp-success-desc strong { color: var(--dark); font-weight: 600; }
.fp-try-again {
  background: none;
  border: none;
  color: var(--red);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  transition: opacity .2s;
}
.fp-try-again:hover { opacity: .7; text-decoration: underline; }

/* Right panel */
.fp-right {
  flex: 0 0 42%;
  background: linear-gradient(145deg, #CE000A 0%, #9a0007 60%, #6b0005 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fp-right-inner {
  text-align: center;
  color: rgba(255,255,255,.55);
  padding: 32px;
}
.fp-right-inner h3 {
  font-family: var(--fh);
  font-size: 22px;
  font-weight: 700;
  color: rgba(255,255,255,.85);
  margin-bottom: 12px;
}
.fp-right-inner p { font-size: 13px; line-height: 1.7; }
.fp-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
.fp-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.3); }
.fp-dot--active { background: rgba(255,255,255,.85); width: 24px; border-radius: 4px; }

/* Responsive */
@media (max-width: 680px) {
  .fp-card { flex-direction: column; }
  .fp-right { flex: 0 0 140px; }
  .fp-left  { padding: 24px 20px 20px; }
}
@media (max-width: 440px) {
  .fp-right { display: none; }
  .fp-card  { border-radius: 14px; }
}
`;

if (!document.getElementById("fp-styles")) {
  const tag = document.createElement("style");
  tag.id = "fp-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* ══════════════════════════════════════════
   COMPONENT
   API  : POST http://localhost:8000/user/forgot-password
   Body : { email }
   OK   : navigate to /verify-otp/:email
══════════════════════════════════════════ */
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleForgotPassword = async () => {
    setError("")

    if (!email) {
      setError("Please enter your email address.")
      return
    }

    try {
      setIsLoading(true)

      /*
        API  : POST http://localhost:8000/user/forgot-password
        Body : { email }
        OK   : navigate to /verify-otp/:email
      */
      const res = await axios.post(
        "http://localhost:8000/user/forgot-password",
        { email }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate(`/verify-otp/${email}`)
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fp-root">
      <div className="fp-card">

        {/* ── Left Panel ── */}
        <div className="fp-left">
          <div className="fp-topbar">
            <button className="fp-back" onClick={() => navigate("/login")}>
              <IoArrowBack />
              <span>Back to Login</span>
            </button>
            <div className="fp-logo">
              <img
                src="/logo.svg"
                alt="Wandermate"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>

          <div className="fp-content" key={isSubmitted ? "submitted" : "form"}>

            {/* Icon */}
            <div className={`fp-icon-wrap ${isSubmitted ? "fp-icon-wrap--success" : "fp-icon-wrap--default"}`}>
              {isSubmitted ? <CheckCircle size={28} /> : <MdOutlineEmail />}
            </div>

            <h1 className="fp-title">
              {isSubmitted ? "Check Your Inbox" : "Forgot Password?"}
            </h1>
            <p className="fp-sub">
              {isSubmitted
                ? "We've sent reset instructions to your email."
                : "Enter your email and we'll send you a link to reset your password."}
            </p>

            <div className="fp-divider" />

            {isSubmitted ? (
              /* ── Success state ── */
              <div className="fp-success-wrap">
                <p className="fp-success-desc">
                  A password reset link was sent to <strong>{email}</strong>.
                  Check your inbox and click the link to continue.
                </p>
                <p className="fp-success-desc" style={{ marginBottom: "16px" }}>
                  Didn't receive it? Check your spam folder or{" "}
                </p>
                <button className="fp-try-again" onClick={() => setIsSubmitted(false)}>
                  Try a different email →
                </button>
                <p className="fp-switch">
                  Remembered your password?{" "}
                  <Link to="/login">Sign in</Link>
                </p>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                {error && <div className="fp-error">{error}</div>}

                <div className="fp-field">
                  <label>Email Address</label>
                  <div className="fp-input-wrap">
                    <MdOutlineEmail className="fp-input-icon" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => e.key === "Enter" && handleForgotPassword()}
                    />
                  </div>
                </div>

                <button
                  className="fp-submit"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                >
                  {isLoading
                    ? <><Loader2 size={15} style={{ animation: "spin 0.7s linear infinite" }} /> Sending…</>
                    : "Send Reset Link →"
                  }
                </button>

                <p className="fp-switch">
                  Remembered your password?{" "}
                  <Link to="/login">Sign in</Link>
                </p>
              </>
            )}

          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="fp-right">
          <div className="fp-right-inner">
            <h3>{isSubmitted ? "Email sent!" : "No worries!"}</h3>
            <p>
              {isSubmitted
                ? "Follow the link in your\nemail to securely reset\nyour password."
                : "It happens to everyone.\nWe'll help you get back\ninto your account."}
            </p>
            <div className="fp-dots">
              <div className="fp-dot fp-dot--active" />
              <div className="fp-dot" />
              <div className="fp-dot" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword