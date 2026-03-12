// import React from 'react'

// const VerifyEmail = () => {
//   return (
//     <div className='relative w-full h-190 overflow-hidden'>
//       <div className='min-h-screen flex items-center justify-center bg-green-100 px-4'>
//         <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
//             <h2 className='text-2xl font-semibold text-green-700 mb-4'>✅ Check Your Email</h2>
//             <p className='text-gray-400 text-sm'>
//                 We've sent you an email to verify your account. Please check your inbox and click the verification link
//             </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VerifyEmail

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { MdOutlineMarkEmailRead } from 'react-icons/md'

/* ══════════════════════════════════════════
   STYLES — matches login.css theme exactly
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

/* Root */
.ve-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--light);
}

/* Card — same shadow/radius as login */
.ve-card {
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
.ve-left {
  flex: 1;
  background: var(--white);
  display: flex;
  flex-direction: column;
  padding: 32px 36px 28px;
}

/* Topbar */
.ve-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.ve-back {
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
.ve-back:hover { color: var(--red); }

.ve-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--fh);
  font-size: 16px;
  font-weight: 700;
  color: var(--dark);
}
.ve-logo img { height: 24px; width: auto; }

/* Content */
.ve-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: form-in .28s ease both;
  padding: 0 16px;
}
@keyframes form-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Icon circle */
.ve-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fff0f0;
  border: 2px solid #fecaca;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  color: var(--red);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(206,0,10,.15); }
  50%       { box-shadow: 0 0 0 10px rgba(206,0,10,0); }
}

.ve-title {
  font-family: var(--fh);
  font-size: clamp(22px, 2.6vw, 28px);
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 12px;
}

.ve-desc {
  font-size: 14px;
  color: var(--mid);
  line-height: 1.7;
  max-width: 320px;
  margin: 0 auto 28px;
}

.ve-desc strong {
  color: var(--dark);
  font-weight: 600;
}

/* Divider */
.ve-divider {
  width: 40px;
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  margin: 0 auto 28px;
}



/* Back to login button */
.ve-login-btn {
  padding: 11px 32px;
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
.ve-login-btn:hover { background: var(--red-dk); transform: translateY(-1px); box-shadow: 0 10px 24px rgba(206,0,10,.34); }
.ve-login-btn:active { transform: translateY(0); }

/* Right panel — same red gradient as login */
.ve-right {
  flex: 0 0 42%;
  background: linear-gradient(145deg, #CE000A 0%, #9a0007 60%, #6b0005 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ve-right-inner {
  text-align: center;
  color: rgba(255,255,255,.55);
  padding: 32px;
}
.ve-right-inner h3 {
  font-family: var(--fh);
  font-size: 22px;
  font-weight: 700;
  color: rgba(255,255,255,.85);
  margin-bottom: 12px;
}
.ve-right-inner p {
  font-size: 13px;
  line-height: 1.7;
}
.ve-right-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
}
.ve-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.3);
}
.ve-dot--active {
  background: rgba(255,255,255,.85);
  width: 24px;
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 680px) {
  .ve-card { flex-direction: column; }
  .ve-right { flex: 0 0 140px; }
  .ve-left  { padding: 24px 20px 20px; }
}
@media (max-width: 440px) {
  .ve-right { display: none; }
  .ve-card  { border-radius: 14px; }
}
`;

if (!document.getElementById("ve-styles")) {
  const tag = document.createElement("style");
  tag.id = "ve-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
}

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
const VerifyEmail = () => {
  const navigate = useNavigate()

  return (
    <div className="ve-root">
      <div className="ve-card">

        {/* ── Left: Content Panel ── */}
        <div className="ve-left">
          <div className="ve-topbar">
            <button className="ve-back" onClick={() => navigate("/login")}>
              <IoArrowBack />
              <span>Back to Login</span>
            </button>
            <div className="ve-logo">
              {/* Replace src with: import logo from "./assets/icons/logo(black).svg" */}
              <img
                src="/logo.svg"
                alt="Wandermate"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          </div>

          <div className="ve-content">
            {/* Animated icon */}
            <div className="ve-icon-wrap">
              <MdOutlineMarkEmailRead />
            </div>

            <h1 className="ve-title">Check Your Email</h1>

            <div className="ve-divider" />

            <p className="ve-desc">
              We've sent a verification link to your inbox.
              Open the email and click the link to <strong>activate your account</strong>.
            </p>

          

            <button className="ve-login-btn" onClick={() => navigate("/login")}>
              Back to Login →
            </button>
          </div>
        </div>

        {/* ── Right: Decorative Panel ── */}
        <div className="ve-right">
          <div className="ve-right-inner">
            <h3>Almost there!</h3>
            <p>
              Verify your email to unlock your<br />
              Wandermate account and start<br />
              planning your next adventure.
            </p>
            <div className="ve-right-dots">
              <div className="ve-dot" />
              <div className="ve-dot" />
              <div className="ve-dot ve-dot--active" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default VerifyEmail