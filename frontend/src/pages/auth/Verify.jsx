// // Import axios to send HTTP requests to backend
// import axios from 'axios'

// // Import React hooks
// import React, { useEffect, useState } from 'react'

// // Import React Router hooks
// // useNavigate → used to redirect user to another page
// // useParams → used to read parameters from URL
// import { useNavigate, useParams } from 'react-router-dom'


// // Email Verification Component
// const Verify = () => {

//     /*
//     useParams() reads parameters from the URL.

//     Your route should look like:
//     /verify/:token

//     Example URL:
//     http://localhost:5173/verify/abc123token

//     token = "abc123token"
//     */
//     const {token} = useParams()

//     /*
//     status state controls the message shown to the user
//     Default message: "Verifying..."
//     */
//     const [status, setStatus] = useState("Verifying...")

//     /*
//     useNavigate() allows us to redirect users
//     Example: navigate('/login')
//     */
//     const navigate = useNavigate()


//     /*
//     useEffect runs when the component loads

//     Dependencies:
//     token → if token changes
//     navigate → router dependency
//     */
//     useEffect(()=>{

//         /*
//         Function that calls backend API to verify email
//         */
//         const verifyEmail = async()=>{

//             try {

//                 /*
//                 Send POST request to backend

//                 API:
//                 POST http://localhost:8000/user/verify

//                 Body:
//                 {} (empty)

//                 Header:
//                 Authorization: Bearer <token>

//                 The token is sent in the header so backend
//                 can verify if it is valid.
//                 */

//                 const res = await axios.post(
//                     `http://localhost:8000/user/verify`,
//                     {},
//                     {
//                         headers:{
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 )


//                 /*
//                 Backend should return something like:

//                 {
//                     success: true,
//                     message: "Email verified"
//                 }
//                 */

//                 if(res.data.success){

//                     // Update message on screen
//                     setStatus("✅ Email Verified Successfully")

//                     /*
//                     After successful verification
//                     wait 2 seconds then redirect to login page
//                     */

//                     setTimeout(()=>{
//                         navigate('/login')
//                     }, 2000)

//                 }else{

//                     // If backend says token invalid
//                     setStatus("❌ Invalid or Expired Token")
//                 }

//             } catch (error) {

//                 // Log error in console for debugging
//                 console.log(error)

//                 // Show error message to user
//                 setStatus("❌ Verification Failed. Please try again")
                
//             }
//         };


//         /*
//         Call the verifyEmail function
//         when the page loads
//         */
//         verifyEmail()

//     },[token, navigate]) // dependencies



//   return (

//     /*
//     UI SECTION
//     This displays the verification status message
//     */

//     <div className='relative w-full h-190 bg-green-100 overflow-hidden'>

//        <div className='min-h-screen flex items-center justify-center'>

//         {/* Verification message card */}
//         <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>

//             {/* Display current status message */}
//             <h2 className='text-xl font-semibold text-gray-800'>
//                 {status}
//             </h2>

//         </div>

//        </div>

//     </div>
//   )
// }

// // Export component so it can be used in router
// export default Verify



import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

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
button { font-family: var(--fb); }

.vf-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--light);
}

.vf-card {
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

.vf-left {
  flex: 1;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 32px 36px 28px;
}

.vf-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.vf-back {
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
.vf-back:hover { color: var(--red); }
.vf-logo img { height: 24px; width: auto; }

/* Content */
.vf-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px;
  animation: form-in .28s ease both;
}
@keyframes form-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Icon circle */
.vf-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
  font-size: 30px;
  transition: all .3s;
}
.vf-icon-wrap--loading {
  background: #fff5f5;
  border: 2px solid #fecaca;
  color: var(--red);
  animation: pulse 2s ease-in-out infinite;
}
.vf-icon-wrap--success {
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  color: #16a34a;
}
.vf-icon-wrap--error {
  background: #fff0f0;
  border: 2px solid #fecaca;
  color: #b91c1c;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(206,0,10,.15); }
  50%       { box-shadow: 0 0 0 10px rgba(206,0,10,0); }
}

.vf-title {
  font-family: var(--fh);
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 10px;
}

.vf-divider {
  width: 40px;
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  margin: 0 auto 18px;
}

.vf-desc {
  font-size: 14px;
  color: var(--mid);
  line-height: 1.7;
  max-width: 300px;
  margin: 0 auto 24px;
}

/* Redirecting indicator */
.vf-redirecting {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--mid);
  margin-bottom: 20px;
}

/* Login button */
.vf-btn {
  padding: 10px 28px;
  background: var(--red);
  color: var(--white);
  border: none;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(206,0,10,.26);
  transition: background .2s, transform .15s, box-shadow .2s;
}
.vf-btn:hover { background: var(--red-dk); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(206,0,10,.34); }
.vf-btn:active { transform: translateY(0); }

/* Right panel */
.vf-right {
  flex: 0 0 42%;
  background: linear-gradient(145deg, #CE000A 0%, #9a0007 60%, #6b0005 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.vf-right-inner {
  text-align: center;
  color: rgba(255,255,255,.55);
  padding: 32px;
}
.vf-right-inner h3 {
  font-family: var(--fh);
  font-size: 22px;
  font-weight: 700;
  color: rgba(255,255,255,.85);
  margin-bottom: 12px;
}
.vf-right-inner p { font-size: 13px; line-height: 1.7; }
.vf-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
.vf-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.3); }
.vf-dot--active { background: rgba(255,255,255,.85); width: 24px; border-radius: 4px; }

@media (max-width: 680px) {
  .vf-card { flex-direction: column; }
  .vf-right { flex: 0 0 140px; }
  .vf-left  { padding: 24px 20px 20px; }
}
@media (max-width: 440px) {
  .vf-right { display: none; }
  .vf-card  { border-radius: 14px; }
}
`;

if (!document.getElementById("vf-styles")) {
  const tag = document.createElement("style");
  tag.id = "vf-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* ══════════════════════════════════════════
   COMPONENT
   API  : POST http://localhost:8000/user/verify
   Header: Authorization: Bearer <token>
   Token : read from URL param  /verify/:token
   OK    : redirect to /login after 2s
══════════════════════════════════════════ */
const Verify = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  // "loading" | "success" | "error"
  const [state, setState] = useState("loading")
  const [message, setMessage] = useState("Verifying your email address…")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        /*
          API  : POST http://localhost:8000/user/verify
          Body : {} (empty)
          Header: Authorization: Bearer <token>
        */
        const res = await axios.post(
          "http://localhost:8000/user/verify",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (res.data.success) {
          setState("success")
          setMessage("Your email has been verified successfully. Redirecting you to login…")
          setTimeout(() => navigate("/login"), 2000)
        } else {
          setState("error")
          setMessage("This link is invalid or has expired. Please sign up again.")
        }
      } catch (error) {
        console.error(error)
        setState("error")
        setMessage(
          error.response?.data?.message || "Verification failed. Please try again."
        )
      }
    }

    verifyEmail()
  }, [token, navigate])

  /* Derived UI values per state */
  const ui = {
    loading: {
      iconClass: "vf-icon-wrap--loading",
      icon: <MdOutlineMarkEmailRead />,
      title: "Verifying Email",
      rightTitle: "Hang tight!",
      rightDesc: "We're confirming your email\naddress. This only takes\na moment.",
    },
    success: {
      iconClass: "vf-icon-wrap--success",
      icon: <CheckCircle size={30} />,
      title: "Email Verified!",
      rightTitle: "You're in!",
      rightDesc: "Your account is now active.\nHead to login and start\nyour adventure.",
    },
    error: {
      iconClass: "vf-icon-wrap--error",
      icon: <XCircle size={30} />,
      title: "Verification Failed",
      rightTitle: "Something went wrong",
      rightDesc: "The link may have expired\nor already been used.\nTry signing up again.",
    },
  }[state]

  return (
    <div className="vf-root">
      <div className="vf-card">

        {/* ── Left Panel ── */}
        <div className="vf-left">
          <div className="vf-topbar">
            <button className="vf-back" onClick={() => navigate("/login")}>
              <IoArrowBack />
              <span>Back to Login</span>
            </button>
            <div className="vf-logo">
              <img
                src="/logo.svg"
                alt="Wandermate"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>

          <div className="vf-content">

            {/* Icon — changes per state */}
            <div className={`vf-icon-wrap ${ui.iconClass}`}>
              {ui.icon}
            </div>

            <h1 className="vf-title">{ui.title}</h1>
            <div className="vf-divider" />
            <p className="vf-desc">{message}</p>

            {/* Loading spinner */}
            {state === "loading" && (
              <div className="vf-redirecting">
                <Loader2 size={13} style={{ animation: "spin 0.7s linear infinite" }} />
                <span>Please wait…</span>
              </div>
            )}

            {/* Success — auto redirecting indicator */}
            {state === "success" && (
              <div className="vf-redirecting">
                <Loader2 size={13} style={{ animation: "spin 0.7s linear infinite" }} />
                <span>Redirecting to login…</span>
              </div>
            )}

            {/* Error — manual button to go to login */}
            {state === "error" && (
              <button className="vf-btn" onClick={() => navigate("/login")}>
                Back to Login →
              </button>
            )}

          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="vf-right">
          <div className="vf-right-inner">
            <h3>{ui.rightTitle}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{ui.rightDesc}</p>
            <div className="vf-dots">
              <div className="vf-dot" />
              <div className="vf-dot vf-dot--active" />
              <div className="vf-dot" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Verify