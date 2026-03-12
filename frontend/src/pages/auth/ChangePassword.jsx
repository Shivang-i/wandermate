// // Import Button and Input components from shadcn UI
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// // Axios for making API requests
// import axios from 'axios'

// // Loader icon for loading animation
// import { Loader2 } from 'lucide-react'

// // React and useState hook for state management
// import React, { useState } from 'react'

// // React Router hooks
// import { useNavigate, useParams } from 'react-router-dom'

// const ChangePassword = () => {

//     // Get email from URL params
//     // Example route: /change-password/test@gmail.com
//     const { email } = useParams()

//     // State to store error message
//     const [error, setError] = useState("")

//     // State to store success message
//     const [success, setSuccess] = useState("")

//     // State to show loading while API request is running
//     const [isLoading, setIsLoading] = useState(false)

//     // State to store new password input
//     const [newPassword, setNewPassword] = useState("")

//     // State to store confirm password input
//     const [confirmPassword, setConfirmPassword] = useState("")

//     // Hook to redirect user to another page
//     const navigate = useNavigate()

//     // Function that runs when user clicks "Change Password"
//     const handleChangePassword = async () => {

//         // Clear previous error and success messages
//         setError("")
//         setSuccess("")

//         // Check if fields are empty
//         if (!newPassword || !confirmPassword) {
//             setError("Please fill in all fields")
//             return
//         }

//         // Check if passwords match
//         if (newPassword !== confirmPassword) {
//             setError("Passwords do not match")
//             return
//         }

//         try {

//             // Start loading state
//             setIsLoading(true)

//             // Send POST request to backend with new password
//             const res = await axios.post(
//                 `http://localhost:8000/user/change-password/${email}`,
//                 {
//                     newPassword,
//                     confirmPassword
//                 }
//             )

//             // If password change successful show message
//             setSuccess(res.data.message)

//             // After 2 seconds redirect to login page
//             setTimeout(() => {
//                 navigate('/login')
//             }, 2000)

//         } catch (error) {

//             // Show backend error message if exists
//             setError(error.response?.data?.message || "Something went wrong")

//         } finally {

//             // Stop loading spinner
//             setIsLoading(false)
//         }
//     }

//     return (

//         // Full screen container with center alignment
//         <div className='min-h-screen flex items-center justify-center bg-green-100 px-4'>

//             {/* Card container */}
//             <div className='bg-white shadow-md rounded-lg p-5 max-w-md w-full'>

//                 {/* Page title */}
//                 <h2 className='text-2xl font-semibold mb-4 text-center'>
//                     Change Password
//                 </h2>

//                 {/* Show which email the password is being changed for */}
//                 <p className='text-sm text-gray-500 text-center mb-4'>
//                     Set a new password for
//                     <span className='font-semibold'>{email}</span>
//                 </p>

//                 {/* Show error message */}
//                 {error && (
//                     <p className='text-red-500 text-sm mb-3 text-center'>
//                         {error}
//                     </p>
//                 )}

//                 {/* Show success message */}
//                 {success && (
//                     <p className='text-green-500 text-sm mb-3 text-center'>
//                         {success}
//                     </p>
//                 )}

//                 {/* Input fields container */}
//                 <div className='space-y-4'>

//                     {/* New password input */}
//                     <Input
//                         type="password"
//                         placeholder="New Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                     />

//                     {/* Confirm password input */}
//                     <Input
//                         type="password"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />

//                     {/* Change password button */}
//                     <Button
//                         className='w-full bg-green-600 hover:bg-green-500'

//                         // Disable button while loading
//                         disabled={isLoading}

//                         // Run function when button clicked
//                         onClick={handleChangePassword}
//                     >

//                         {/* Show loader if request is running */}
//                         {
//                             isLoading
//                                 ? (
//                                     <>
//                                         <Loader2 className='mr-2 w-4 h-4 animate-spin' />
//                                         Changing
//                                     </>
//                                 )
//                                 : "Change Password"
//                         }

//                     </Button>

//                 </div>
//             </div>
//         </div>
//     )
// }

// // Export component so it can be used in routes
// export default ChangePassword



import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { MdLockOutline, MdLockReset } from 'react-icons/md'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
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

.cp-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--light);
}

.cp-card {
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
.cp-left {
  flex: 1;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 32px 36px 28px;
}

/* Topbar */
.cp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.cp-back {
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
.cp-back:hover { color: var(--red); }
.cp-logo img { height: 24px; width: auto; }

/* Content area */
.cp-content {
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

/* Icon */
.cp-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff0f0;
  border: 2px solid #fecaca;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: var(--red);
}
.cp-icon-wrap--success {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #16a34a;
}

/* Title */
.cp-title {
  font-family: var(--fh);
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 4px;
}
.cp-sub {
  font-size: 13px;
  color: var(--mid);
  margin-bottom: 24px;
  line-height: 1.6;
}
.cp-sub strong {
  color: var(--dark);
  font-weight: 600;
}

/* Fields */
.cp-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 13px;
}
.cp-field label {
  font-size: 10px;
  font-weight: 700;
  color: var(--dark);
  text-transform: uppercase;
  letter-spacing: .9px;
}

/* Input wrap */
.cp-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.cp-input-icon {
  position: absolute;
  left: 12px;
  font-size: 16px;
  color: #b0b0b0;
  pointer-events: none;
}
.cp-input-wrap input {
  width: 100%;
  padding: 10px 38px 10px 36px;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  font-size: 13px;
  color: var(--dark);
  background: var(--white);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.cp-input-wrap input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(206,0,10,.07);
}
.cp-input-wrap input::placeholder { color: #c5c5c5; }

/* Eye toggle */
.cp-eye {
  position: absolute;
  right: 11px;
  color: #b0b0b0;
  display: flex;
  align-items: center;
  font-size: 17px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color .2s;
}
.cp-eye:hover { color: var(--dark); }

/* Error / success inline messages */
.cp-error {
  font-size: 12px;
  font-weight: 500;
  color: #b91c1c;
  background: #fff0f0;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 14px;
}
.cp-success {
  font-size: 12px;
  font-weight: 500;
  color: #15803d;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Submit button */
.cp-submit {
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
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.cp-submit:hover:not(:disabled) { background: var(--red-dk); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(206,0,10,.34); }
.cp-submit:active:not(:disabled) { transform: translateY(0); }
.cp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

/* Redirecting */
.cp-redirecting {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--mid);
  margin-top: 14px;
}

/* Right panel */
.cp-right {
  flex: 0 0 42%;
  background: linear-gradient(145deg, #CE000A 0%, #9a0007 60%, #6b0005 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cp-right-inner {
  text-align: center;
  color: rgba(255,255,255,.55);
  padding: 32px;
}
.cp-right-inner h3 {
  font-family: var(--fh);
  font-size: 22px;
  font-weight: 700;
  color: rgba(255,255,255,.85);
  margin-bottom: 12px;
}
.cp-right-inner p { font-size: 13px; line-height: 1.7; }
.cp-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
.cp-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.3); }
.cp-dot--active { background: rgba(255,255,255,.85); width: 24px; border-radius: 4px; }

/* Responsive */
@media (max-width: 680px) {
  .cp-card { flex-direction: column; }
  .cp-right { flex: 0 0 140px; }
  .cp-left  { padding: 24px 20px 20px; }
}
@media (max-width: 440px) {
  .cp-right { display: none; }
  .cp-card  { border-radius: 14px; }
}
`;

if (!document.getElementById("cp-styles")) {
  const tag = document.createElement("style");
  tag.id = "cp-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* ══════════════════════════════════════════
   COMPONENT
   API  : POST http://localhost:8000/user/change-password/:email
   Body : { newPassword, confirmPassword }
   OK   : toast success + redirect to /login after 2s
══════════════════════════════════════════ */
const ChangePassword = () => {
  const { email } = useParams()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleChangePassword = async () => {
    setError("")
    setSuccessMsg("")

    // Client-side validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.")
      return
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setIsLoading(true)

      /*
        API  : POST http://localhost:8000/user/change-password/:email
        Body : { newPassword, confirmPassword }
        OK   : redirect to /login after 2s
      */
      const res = await axios.post(
        `http://localhost:8000/user/change-password/${email}`,
        { newPassword, confirmPassword }
      )

      setIsSuccess(true)
      setSuccessMsg(res.data.message || "Password changed successfully!")
      toast.success(res.data.message || "Password changed successfully!")
      setTimeout(() => navigate("/login"), 2000)

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="cp-root">
      <div className="cp-card">

        {/* ── Left Panel ── */}
        <div className="cp-left">
          <div className="cp-topbar">
            <button className="cp-back" onClick={() => navigate(-1)}>
              <IoArrowBack />
              <span>Back</span>
            </button>
            <div className="cp-logo">
              <img
                src="/logo.svg"
                alt="Wandermate"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>

          <div className="cp-content">

            {/* Icon */}
            <div className={`cp-icon-wrap${isSuccess ? " cp-icon-wrap--success" : ""}`}>
              {isSuccess ? <CheckCircle size={28} /> : <MdLockReset />}
            </div>

            <h1 className="cp-title">
              {isSuccess ? "Password Changed!" : "Set New Password"}
            </h1>
            <p className="cp-sub">
              {isSuccess
                ? "Your password has been updated successfully."
                : <>Setting a new password for <strong>{email}</strong></>
              }
            </p>

            {/* Error message */}
            {error && <div className="cp-error">{error}</div>}

            {/* Success message */}
            {successMsg && (
              <div className="cp-success">
                <CheckCircle size={13} />
                {successMsg}
              </div>
            )}

            {/* Form — hidden after success */}
            {!isSuccess && (
              <>
                {/* New Password */}
                <div className="cp-field">
                  <label>New Password</label>
                  <div className="cp-input-wrap">
                    <MdLockOutline className="cp-input-icon" />
                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className="cp-eye" type="button" onClick={() => setShowNew(s => !s)}>
                      {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="cp-field">
                  <label>Confirm Password</label>
                  <div className="cp-input-wrap">
                    <MdLockOutline className="cp-input-icon" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="cp-eye" type="button" onClick={() => setShowConfirm(s => !s)}>
                      {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                </div>

                <button
                  className="cp-submit"
                  onClick={handleChangePassword}
                  disabled={isLoading}
                >
                  {isLoading
                    ? <><Loader2 size={15} style={{ animation: "spin 0.7s linear infinite" }} /> Updating…</>
                    : "Change Password →"
                  }
                </button>
              </>
            )}

            {/* Redirecting indicator after success */}
            {isSuccess && (
              <div className="cp-redirecting">
                <Loader2 size={13} style={{ animation: "spin 0.7s linear infinite" }} />
                <span>Redirecting to login…</span>
              </div>
            )}

          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="cp-right">
          <div className="cp-right-inner">
            <h3>{isSuccess ? "All done!" : "Almost done!"}</h3>
            <p>
              {isSuccess
                ? "Your account is secured.\nHead to login and continue\nyour adventure."
                : "Choose a strong password\nto keep your Wandermate\naccount safe."}
            </p>
            <div className="cp-dots">
              <div className="cp-dot" />
              <div className="cp-dot" />
              <div className="cp-dot cp-dot--active" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChangePassword