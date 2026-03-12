// // Import UI components from shadcn
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'

// // Axios for making API requests
// import axios from 'axios'

// // Icons used in the UI
// import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'

// // React hooks
// import React, { useRef, useState } from 'react'

// // React Router hooks
// import { Link, useNavigate, useParams } from 'react-router-dom'

// const VerifyOTP = () => {

//   // State to check if OTP is verified
//   const [isVerified, setIsVerified] = useState(false)

//   // State to store error message
//   const [error, setError] = useState("")

//   // State to store success message
//   const [successMessage, setSuccessMessage] = useState("")

//   // State to store OTP digits (6 input boxes)
//   const [otp, setOtp] = useState(["", "", "", "", "", ""])

//   // Loading state for API request
//   const [isLoading, setIsLoading] = useState(false)

//   // useRef to store references of input fields (for auto focus)
//   const inputRefs = useRef([])

//   // Get email from URL params
//   const { email } = useParams()

//   // Hook for navigation
//   const navigate = useNavigate()

//   // Function to handle OTP input changes
//   const handleChange = (index, value) => {

//     // Prevent entering more than one character
//     if (value.length > 1) return

//     // Copy current OTP array
//     const updatedOtp = [...otp]

//     // Update the specific index with new value
//     updatedOtp[index] = value

//     // Update state
//     setOtp(updatedOtp)

//     // Automatically move cursor to next input box
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus()
//     }
//   }

//   // Function to verify OTP
//   const handleVerify = async () => {

//     // Join all digits into one string
//     const finalOtp = otp.join("")

//     // Check if OTP is complete
//     if (finalOtp.length !== 6) {
//       setError("Please enter all 6 digits")
//       return
//     }

//     try {

//       // Start loading
//       setIsLoading(true)

//       // Send OTP to backend
//       const res = await axios.post(
//         `http://localhost:8000/user/verify-otp/${email}`,
//         {
//           otp: finalOtp,
//         }
//       )

//       // Show success message
//       setSuccessMessage(res.data.message)

//       // Redirect to change password page after 2 seconds
//       setTimeout(() => {
//         navigate(`/change-password/${email}`)
//       }, 2000)

//     } catch (error) {

//       // Show error message from backend
//       setError(error.response?.data?.message || "Something went wrong")

//     } finally {

//       // Stop loading
//       setIsLoading(false)
//     }
//   }

//   // Function to clear OTP inputs
//   const clearOtp = () => {

//     // Reset OTP array
//     setOtp(["", "", "", "", "", ""])

//     // Clear error message
//     setError("")

//     // Focus on first input
//     inputRefs.current[0]?.focus()
//   }

//   return (

//     // Full page container
//     <div className='min-h-screen flex flex-col bg-green-100'>

//       {/* Main content */}
//       <div className='flex-1 flex items-center justify-center p-4'>

//         <div className='w-full max-w-md space-y-6'>

//           {/* Title section */}
//           <div className='text-center space-y-2'>
//             <h1 className='text-3xl font-bold tracking-tight text-green-600'>
//               Verfiy your email
//             </h1>

//             <p className='text-muted-foreground'>
//               We've sent a 6-digit verification code to{" "}
//               <span>{"your email"}</span>
//             </p>
//           </div>

//           {/* Card container */}
//           <Card className='shadow-lg'>

//             {/* Card Header */}
//             <CardHeader className='space-y-1'>

//               <CardTitle className='text-2xl text-center text-green-600'>
//                 Enter verification code
//               </CardTitle>

//               {/* Dynamic description depending on verification status */}
//               <CardDescription className='text-center'>
//                 {
//                   isVerified
//                     ? "Code verified successfully! Redirecting..."
//                     : "Enter the 6-digit code sent to your email"
//                 }
//               </CardDescription>

//             </CardHeader>

//             {/* Card Content */}
//             <CardContent className='space-y-6'>

//               {/* Show error message */}
//               {
//                 error && (
//                   <Alert variant="destructive">
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 )
//               }

//               {/* Show success message */}
//               {successMessage && (
//                 <p className='text-green-500 text-sm mb-3 text-center'>
//                   {successMessage}
//                 </p>
//               )}

//               {
//                 isVerified ? (

//                   // If OTP verified show success UI
//                   <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>

//                     <div className='bg-primary/10 rounded-full p-3'>
//                       <CheckCircle className='h-6 w-6 text-primary' />
//                     </div>

//                     <div className='space-y-2'>
//                       <h3 className='font-medium text-lg'>
//                         Verification successfull
//                       </h3>

//                       <p className='text-muted-foreground'>
//                         Your email has been verified. you'll be redirected to reset your password
//                       </p>
//                     </div>

//                     <div className='flex items-center space-x-2'>
//                       <Loader2 className='h-4 w-4 animate-spin' />
//                       <span className='text-sm text-muted-foreground'>
//                         Redirecting...
//                       </span>
//                     </div>

//                   </div>

//                 ) : (

//                   <>
//                     {/* OTP input boxes */}
//                     <div className='flex justify-between mb-6'>
//                       {
//                         otp.map((digit, index) => (
//                           <Input
//                             key={index}
//                             type="text"
//                             value={digit}

//                             // Update OTP value when user types
//                             onChange={(e) => handleChange(index, e.target.value)}

//                             maxLength={1}

//                             // Store reference of each input
//                             ref={(el) => (inputRefs.current[index] = el)}

//                             className="w-12 h-12 text-center text-xl font-bold"
//                           />
//                         ))
//                       }
//                     </div>

//                     {/* Buttons */}
//                     <div className='space-y-3'>

//                       {/* Verify button */}
//                       <Button
//                         onClick={handleVerify}

//                         // Disable button if loading or OTP incomplete
//                         disabled={isLoading || otp.some((digit) => digit === "")}

//                         className='bg-green-600 w-full'
//                       >
//                         {
//                           isLoading
//                             ? <>
//                                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                                 Verifiying
//                               </>
//                             : "Verify code"
//                         }
//                       </Button>

//                       {/* Clear OTP button */}
//                       <Button
//                         variant='outline'
//                         onClick={clearOtp}
//                         className='w-full bg-transparent'
//                         disabled={isLoading || isVerified}
//                       >
//                         <RotateCcw className='mr-2 h-4 w-4' />
//                         Clear
//                       </Button>

//                     </div>
//                   </>
//                 )
//               }

//             </CardContent>

//             {/* Card Footer */}
//             <CardFooter className='flex justify-center'>

//               <p className='text-sm text-muted-foreground'>
//                 Wrong email?{" "}
//                 <Link
//                   to={'/forgot-password'}
//                   className='text-green-600 hover:underline font-medium'
//                 >
//                   Go back
//                 </Link>
//               </p>

//             </CardFooter>

//           </Card>

//           {/* Testing message */}
//           <div className='text-center text-xs text-muted-foreground'>
//             <p>
//               Fot testing purposes, use code:
//               <span className='font-mono font-medium'>123456</span>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// // Export component
// export default VerifyOTP


import React, { useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { MdOutlinePassword } from 'react-icons/md'
import { Loader2, RotateCcw, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

/* ══════════════════════════════════════════
   STYLES — same theme as login / verify pages
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

/* Root */
.vo-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--light);
}

/* Card */
.vo-card {
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
.vo-left {
  flex: 1;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 32px 36px 28px;
}

/* Topbar */
.vo-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.vo-back {
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
.vo-back:hover { color: var(--red); }
.vo-logo { display: flex; align-items: center; }
.vo-logo img { height: 24px; width: auto; }

/* Content */
.vo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: form-in .28s ease both;
  padding: 0 8px;
}
@keyframes form-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Icon */
.vo-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff0f0;
  border: 2px solid #fecaca;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: var(--red);
}
.vo-icon-wrap--success {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #16a34a;
}

/* Title */
.vo-title {
  font-family: var(--fh);
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 6px;
  text-align: center;
}
.vo-sub {
  font-size: 13px;
  color: var(--mid);
  margin-bottom: 28px;
  text-align: center;
  line-height: 1.6;
}
.vo-sub strong { color: var(--dark); font-weight: 600; }

/* Divider */
.vo-divider {
  width: 40px;
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  margin: 0 auto 24px;
}

/* OTP boxes */
.vo-otp-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
}
.vo-otp-input {
  width: 48px;
  height: 54px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: var(--dark);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  background: var(--white);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  caret-color: var(--red);
}
.vo-otp-input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(206,0,10,.07);
}
.vo-otp-input.filled {
  border-color: var(--red);
  background: #fff5f5;
}

/* Error message */
.vo-error {
  font-size: 12px;
  font-weight: 500;
  color: #b91c1c;
  background: #fff0f0;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
  text-align: center;
  width: 100%;
  max-width: 320px;
}

/* Success state */
.vo-success-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 8px 0 16px;
}
.vo-success-title {
  font-family: var(--fh);
  font-size: 20px;
  font-weight: 700;
  color: var(--dark);
}
.vo-success-desc {
  font-size: 13px;
  color: var(--mid);
  line-height: 1.6;
  max-width: 280px;
}
.vo-redirecting {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--mid);
  margin-top: 4px;
}

/* Buttons */
.vo-btn-primary {
  width: 100%;
  max-width: 320px;
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
  margin-bottom: 10px;
}
.vo-btn-primary:hover:not(:disabled) { background: var(--red-dk); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(206,0,10,.34); }
.vo-btn-primary:active:not(:disabled) { transform: translateY(0); }
.vo-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.vo-btn-outline {
  width: 100%;
  max-width: 320px;
  padding: 10px;
  background: transparent;
  color: var(--mid);
  border: 1.5px solid var(--border);
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color .2s, color .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
}
.vo-btn-outline:hover:not(:disabled) { border-color: var(--red); color: var(--red); }
.vo-btn-outline:disabled { opacity: 0.5; cursor: not-allowed; }

/* Footer link */
.vo-footer {
  font-size: 12px;
  color: var(--mid);
  text-align: center;
}
.vo-footer a {
  color: var(--red);
  font-weight: 700;
  text-decoration: none;
}
.vo-footer a:hover { text-decoration: underline; }

/* Test hint */
.vo-hint {
  font-size: 11px;
  color: var(--mid);
  text-align: center;
  margin-top: 10px;
  opacity: 0.7;
}
.vo-hint code {
  font-family: monospace;
  font-weight: 700;
  color: var(--dark);
  background: var(--light);
  padding: 1px 5px;
  border-radius: 4px;
}

/* Right panel */
.vo-right {
  flex: 0 0 42%;
  background: linear-gradient(145deg, #CE000A 0%, #9a0007 60%, #6b0005 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.vo-right-inner {
  text-align: center;
  color: rgba(255,255,255,.55);
  padding: 32px;
}
.vo-right-inner h3 {
  font-family: var(--fh);
  font-size: 22px;
  font-weight: 700;
  color: rgba(255,255,255,.85);
  margin-bottom: 12px;
}
.vo-right-inner p { font-size: 13px; line-height: 1.7; }
.vo-right-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
.vo-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.3); }
.vo-dot--active { background: rgba(255,255,255,.85); width: 24px; border-radius: 4px; }

/* Responsive */
@media (max-width: 680px) {
  .vo-card { flex-direction: column; }
  .vo-right { flex: 0 0 140px; }
  .vo-left { padding: 24px 20px 20px; }
}
@media (max-width: 440px) {
  .vo-right { display: none; }
  .vo-card { border-radius: 14px; }
  .vo-otp-input { width: 40px; height: 46px; font-size: 18px; }
}
`;

if (!document.getElementById("vo-styles")) {
  const tag = document.createElement("style");
  tag.id = "vo-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
const VerifyOTP = () => {
  const navigate = useNavigate()
  const { email } = useParams()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef([])

  /* Auto-advance focus on input */
  const handleChange = (index, value) => {
    if (value.length > 1) return
    const updated = [...otp]
    updated[index] = value
    setOtp(updated)
    setError("")
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  /* Backspace support — go back to previous box */
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  /* Paste support — fill all boxes at once */
  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    const updated = [...otp]
    pasted.split("").forEach((char, i) => { updated[i] = char })
    setOtp(updated)
    const nextEmpty = updated.findIndex((d) => d === "")
    const focusIdx = nextEmpty === -1 ? 5 : nextEmpty
    inputRefs.current[focusIdx]?.focus()
  }

  /* Verify OTP
     API  : POST http://localhost:8000/user/verify-otp/:email
     Body : { otp: "123456" }
     OK   : redirect to /change-password/:email after 2s
  */
  const handleVerify = async () => {
    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits.")
      return
    }
    try {
      setIsLoading(true)
      const res = await axios.post(
        `http://localhost:8000/user/verify-otp/${email}`,
        { otp: finalOtp }
      )
      if (res.data.success ?? true) {
        setIsVerified(true)
        toast.success(res.data.message || "OTP verified!")
        setTimeout(() => navigate(`/change-password/${email}`), 2000)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  /* Clear all boxes */
  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="vo-root">
      <div className="vo-card">

        {/* ── Left Panel ── */}
        <div className="vo-left">
          <div className="vo-topbar">
            <button className="vo-back" onClick={() => navigate("/forgot-password")}>
              <IoArrowBack />
              <span>Back</span>
            </button>
            <div className="vo-logo">
              <img src="/logo.svg" alt="Wandermate" onError={(e) => (e.target.style.display = "none")} />
            </div>
          </div>

          <div className="vo-content">

            {/* Icon */}
            <div className={`vo-icon-wrap${isVerified ? " vo-icon-wrap--success" : ""}`}>
              {isVerified ? <CheckCircle size={28} /> : <MdOutlinePassword />}
            </div>

            {isVerified ? (
              /* ── Success state ── */
              <div className="vo-success-wrap">
                <h1 className="vo-success-title">Verification Successful!</h1>
                <p className="vo-success-desc">
                  Your email has been verified. You'll be redirected to reset your password shortly.
                </p>
                <div className="vo-redirecting">
                  <Loader2 size={13} style={{ animation: "spin 0.7s linear infinite" }} />
                  <span>Redirecting…</span>
                </div>
              </div>
            ) : (
              /* ── OTP entry state ── */
              <>
                <h1 className="vo-title">Enter Verification Code</h1>
                <p className="vo-sub">
                  We've sent a 6-digit code to{" "}
                  <strong>{email || "your email"}</strong>
                </p>

                <div className="vo-divider" />

                {/* Error */}
                {error && <div className="vo-error">{error}</div>}

                {/* OTP boxes */}
                <div className="vo-otp-row" onPaste={handlePaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      className={`vo-otp-input${digit ? " filled" : ""}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                    />
                  ))}
                </div>

                {/* Verify button */}
                <button
                  className="vo-btn-primary"
                  onClick={handleVerify}
                  disabled={isLoading || otp.some((d) => d === "")}
                >
                  {isLoading
                    ? <><Loader2 size={15} style={{ animation: "spin 0.7s linear infinite" }} /> Verifying…</>
                    : "Verify Code →"}
                </button>

                {/* Clear button */}
                <button
                  className="vo-btn-outline"
                  onClick={clearOtp}
                  disabled={isLoading}
                >
                  <RotateCcw size={13} /> Clear
                </button>

                {/* Footer */}
                <p className="vo-footer">
                  Wrong email?{" "}
                  <Link to="/forgot-password">Go back</Link>
                </p>

                {/* Dev hint */}
                <p className="vo-hint">
                  For testing, use code: <code>123456</code>
                </p>
              </>
            )}
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="vo-right">
          <div className="vo-right-inner">
            <h3>One step away!</h3>
            <p>
              Enter the code we sent to<br />
              verify your identity and<br />
              reset your password.
            </p>
            <div className="vo-right-dots">
              <div className="vo-dot" />
              <div className="vo-dot vo-dot--active" />
              <div className="vo-dot" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default VerifyOTP