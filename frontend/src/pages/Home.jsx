// import React from 'react'

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home



import { useState, useRef, useEffect, useCallback } from "react";

/* ─── INLINE STYLES (converted from landing.css) ─────────────────────────── */
const css = `
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap");

:root {
  --red: #ce000a;
  --red-dk: #a30008;
  --red-lt: #fff0f0;
  --dark: #242424;
  --dark2: #3a3a3a;
  --mid: #606060;
  --light: #f6f6f6;
  --white: #ffffff;
  --border: #e8e8e8;
  --fh: "Playfair Display", Georgia, serif;
  --fb: "DM Sans", system-ui, sans-serif;
  --r1: 8px;
  --r2: 14px;
  --r3: 20px;
  --r4: 28px;
  --s1: 0 2px 8px rgba(0,0,0,.07);
  --s2: 0 8px 28px rgba(0,0,0,.1);
  --s3: 0 20px 56px rgba(0,0,0,.13);
  --px: clamp(20px,6vw,96px);
  --py: clamp(56px,8vw,104px);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--fb);color:var(--dark);background:var(--white);-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}
a{text-decoration:none;color:inherit}
ul{list-style:none}
button{cursor:pointer;font-family:var(--fb);border:none;background:none}
.wm-root{overflow-x:visible}

/* Shared */
.wm-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--red);margin-bottom:12px}
.wm-section-title{font-family:var(--fh);font-size:clamp(26px,3.2vw,46px);font-weight:700;color:var(--dark);line-height:1.18;margin-bottom:14px}
.wm-section-header{text-align:center;margin-bottom:48px}
.wm-section-sub{font-size:15px;color:var(--mid);line-height:1.7}
.wm-body-text{font-size:15px;color:var(--mid);line-height:1.85;max-width:480px;margin-bottom:30px}
.wm-accent{color:var(--red)}
.wm-carousel-dots{display:flex;justify-content:center;gap:7px;margin-top:28px}
.wm-dot{width:9px;height:9px;border-radius:50%;background:#d0d0d0;border:none;padding:0;transition:all .25s}
.wm-dot--on{background:var(--red);width:26px;border-radius:5px}
.wm-arrow{width:42px;height:42px;border-radius:50%;border:1.5px solid var(--border);background:var(--white);color:var(--dark);font-size:22px;display:flex;align-items:center;justify-content:center;box-shadow:var(--s1);transition:all .2s;flex-shrink:0}
.wm-arrow:hover:not(:disabled){background:var(--red);color:var(--white);border-color:var(--red);box-shadow:0 4px 16px rgba(206,0,10,.3)}
.wm-arrow:disabled{opacity:.3;cursor:not-allowed}
.wm-btn-primary{display:inline-flex;align-items:center;background:var(--red);color:var(--white);padding:14px 32px;border-radius:var(--r1);font-size:15px;font-weight:700;box-shadow:0 8px 26px rgba(206,0,10,.32);transition:background .2s,transform .15s,box-shadow .2s}
.wm-btn-primary:hover{background:var(--red-dk);transform:translateY(-2px);box-shadow:0 12px 32px rgba(206,0,10,.42)}

/* Keyframes */
@keyframes float-badge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes hero-enter{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes float-l{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-13px) rotate(-4deg)}}
@keyframes float-r{0%,100%{transform:translateY(0) rotate(8deg) scaleX(-1)}50%{transform:translateY(-10px) rotate(4deg) scaleX(-1)}}
@keyframes testi-slide-next{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
@keyframes testi-slide-prev{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* Navbar */
.wm-nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.93);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.wm-nav-inner{display:flex;align-items:center;justify-content:space-between;padding:0 var(--px);height:66px;max-width:1400px;margin:0 auto}
.wm-logo{display:flex;align-items:center;gap:9px}
.wm-logo-img{height:30px}
.wm-nav-links{display:flex;align-items:center;gap:34px}
.wm-nav-links li a{font-size:14px;font-weight:500;color:var(--dark2);position:relative;transition:color .2s;text-decoration:none}
.wm-nav-links li a::after{content:"";position:absolute;bottom:-2px;left:0;width:0;height:2px;background:var(--red);border-radius:2px;transition:width .2s}
.wm-nav-links li a:hover{color:var(--red)}
.wm-nav-links li a:hover::after{width:100%}
.wm-nav-signup{background:var(--red)!important;color:var(--white)!important;padding:8px 20px;border-radius:var(--r1);font-weight:700!important;font-size:14px!important;box-shadow:0 4px 14px rgba(206,0,10,.28);transition:background .2s,transform .15s!important;display:inline-block}
.wm-nav-signup:hover{background:var(--red-dk)!important;transform:translateY(-1px)}
.wm-hamburger{display:none;flex-direction:column;gap:5px;padding:6px}
.wm-hamburger span{display:block;width:23px;height:2px;background:var(--dark);border-radius:2px}

/* Hero */
.wm-hero{display:flex;align-items:center;justify-content:space-between;gap:40px;padding:48px var(--px) 76px;max-width:1400px;margin:0 auto;min-height:calc(100vh - 66px);position:relative;overflow:hidden}
.wm-hero-content{flex:0 0 50%;max-width:560px;animation:hero-enter .8s ease both}
.wm-hero-tagline{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:var(--red);letter-spacing:1.8px;text-transform:uppercase;margin-bottom:18px}
.tagline-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--red)}
.wm-hero-heading{font-family:var(--fh);font-size:clamp(38px,5.2vw,62px);font-weight:900;line-height:1.1;margin-bottom:22px;letter-spacing:-1px}
.wm-hero-heading em{font-style:italic;color:var(--red);position:relative}
.wm-hero-sub{font-size:15px;color:var(--mid);line-height:1.8;max-width:420px;margin-bottom:30px}
.wm-hero-actions{display:flex;align-items:center;gap:22px}
.wm-hero-visual{flex:0 0 48%;position:relative;height:570px;animation:hero-enter .8s ease .2s both}
.wm-hero-blob{position:absolute;top:20px;right:-50px;width:510px;height:510px;background:radial-gradient(ellipse at 60% 40%,#ffe5e5 0%,#fdf0f0 55%,transparent 78%);border-radius:50%;z-index:0}
.wm-plane{position:absolute;font-size:30px;z-index:3;color:var(--red);opacity:.65;filter:drop-shadow(0 2px 6px rgba(206,0,10,.2))}
.wm-plane--left{top:250px;left:50px;animation:float-l 3.2s ease-in-out infinite}
.wm-plane--right{top:6px;right:38px;animation:float-r 3.2s ease-in-out infinite 1.4s}
.wm-hero-img-wrap{position:relative;bottom:10%;left:60%;transform:translateX(-50%);z-index:2;height:123%}
.wm-hero-img{height:100%;width:auto;object-fit:contain}
.wm-float-card{position:absolute;background:var(--white);border-radius:var(--r2);padding:11px 15px;display:flex;align-items:center;gap:9px;box-shadow:var(--s2);z-index:5;border:1px solid var(--border);animation:float-badge 3s ease-in-out infinite}
.wm-float-card--top{top:96px;left:-12px}
.wm-float-card--bottom{bottom:72px;right:-12px;animation-delay:1.5s}
.wm-float-icon{font-size:20px}
.wm-float-label{font-size:10px;color:var(--mid);text-transform:uppercase;letter-spacing:.5px}
.wm-float-val{font-size:13px;font-weight:700}

/* Adventure */
.wm-adventure{padding:var(--py) var(--px);background:var(--light)}
.wm-dest-carousel{display:flex;align-items:center;gap:18px}
.wm-dest-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;flex:1;overflow:hidden}
.wm-dest-card{cursor:pointer;transition:transform .25s}
.wm-dest-card:hover{transform:translateY(-4px)}
.wm-dest-img-wrap{border-radius:var(--r3);overflow:hidden;aspect-ratio:3/3.8;position:relative;box-shadow:var(--s1)}
.wm-dest-img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.wm-dest-card:hover .wm-dest-img{transform:scale(1.06)}
.wm-dest-img-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.22),transparent 55%);pointer-events:none}
.wm-dest-info{padding:11px 4px 0}
.wm-dest-name{font-size:14px;font-weight:700;margin-bottom:2px}
.wm-dest-props{font-size:12px;color:var(--mid)}

/* Itinerary */
.wm-itin{display:flex;align-items:center;gap:122px;padding:var(--py) var(--px);max-width:1400px;margin:0 auto}
.wm-itin-card-col{flex:0 0 400px}
.wm-itin-img{width:100%;border-radius:var(--r3);box-shadow:var(--s3)}
.wm-itin-text{flex:1}
.wm-feat-list{display:flex;flex-direction:column;gap:18px}
.wm-feat-item{display:flex;align-items:flex-start;gap:14px}
.wm-feat-icon{width:44px;height:44px;border-radius:var(--r1);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.feat-purple{background:#f0ebff}
.feat-red{background:var(--red-lt)}
.feat-green{background:#e6faf0}
.wm-feat-item strong{font-size:14px;font-weight:700;display:block;margin-bottom:2px}
.wm-feat-item p{font-size:13px;color:var(--mid);line-height:1.6;margin:0}

/* Booking */
.booking-section{display:flex;align-items:center;gap:80px;padding:100px 80px;background:linear-gradient(160deg,#f9fafb 0%,#fff 100%);position:relative;overflow:hidden}
.booking-section::after{content:"";position:absolute;bottom:-80px;right:-80px;width:360px;height:360px;background:radial-gradient(circle,rgba(241,165,1,.1) 0%,transparent 70%);pointer-events:none}
.booking-text{flex:1}
.booking-title{font-family:var(--fh);font-size:clamp(32px,3.5vw,52px);font-weight:700;color:#181e4b;line-height:1.2;margin-bottom:18px}
.booking-accent{color:var(--red)}
.booking-desc{font-size:15px;color:#5e6282;line-height:1.85;max-width:460px;margin-bottom:32px}
.booking-tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:40px}
.booking-tab{display:flex;align-items:center;gap:7px;padding:10px 18px;border-radius:50px;border:1.5px solid #e5e7eb;background:#fff;font-size:13px;font-weight:500;color:#5e6282;cursor:pointer;transition:all .2s}
.booking-tab:hover{border-color:#f1a501;color:#f1a501}
.booking-tab--active{background:#181e4b;color:#fff!important;border-color:#181e4b!important}
.booking-visual{flex:0 0 440px;position:relative;display:flex;align-items:center;justify-content:center;min-height:380px}
.booking-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:380px;height:380px;background:radial-gradient(circle,rgba(223,105,81,.12) 0%,transparent 70%);pointer-events:none}
.booking-card{background:transparent;border-radius:24px;box-shadow:0 24px 70px rgba(0,0,0,.12);width:420px;position:relative;z-index:2}
.wm-book-img{width:100%;border-radius:24px}
.booking-price-tag{position:absolute;bottom:20px;left:-20px;background:#fff;border-radius:16px;padding:12px 16px;box-shadow:0 10px 30px rgba(0,0,0,.12);display:flex;align-items:center;gap:10px;z-index:4;animation:floatBadge 3s ease-in-out infinite}
.price-flag{font-size:22px}
.price-route{display:block;font-size:11px;color:#aaa}
.price-val{display:block;font-size:14px;font-weight:700;color:#181e4b}
.booking-confirm-badge{position:absolute;top:20px;right:-20px;background:#181e4b;color:#fff;border-radius:50px;padding:10px 18px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;z-index:4;animation:floatBadge 3s ease-in-out infinite 1.5s}
.confirm-check{background:#1a9e5e;color:#fff;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px}
.itn-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--red);margin-bottom:12px}

/* Popular Destinations */
.wm-popd{padding:var(--py) var(--px);background:var(--white);text-align:center;overflow:hidden}
.wm-popd-eyebrow{font-size:16px;color:var(--red);opacity:.85;margin-bottom:4px;font-style:italic;font-weight:600}
.wm-popd-wrapper{position:relative;display:flex;align-items:center;gap:16px}
.wm-popd-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:50;width:48px;height:48px;border-radius:50%;border:1.5px solid var(--border);background:var(--white);font-size:26px;color:var(--dark);display:flex;align-items:center;justify-content:center;box-shadow:var(--s1);flex-shrink:0;transition:all .2s}
.wm-popd-arrow--left{left:-10px}
.wm-popd-arrow--right{right:-10px}
.wm-popd-arrow:hover:not(:disabled){background:var(--red);color:var(--white);border-color:var(--red);box-shadow:0 4px 18px rgba(206,0,10,.3)}
.wm-popd-arrow:disabled{opacity:.25;cursor:not-allowed}
.wm-popd-stage{flex:1;position:relative;height:500px;display:flex;align-items:center;justify-content:center;cursor:grab;user-select:none;overflow:hidden}
.wm-popd-stage:active{cursor:grabbing}
.wm-popd-card{position:absolute;width:260px;height:440px;border-radius:var(--r4);overflow:hidden;cursor:pointer;box-shadow:0 10px 36px rgba(0,0,0,.14);transition:transform .4s ease,filter .4s ease,opacity .4s ease}
.wm-popd-card--active{box-shadow:0 22px 60px rgba(0,0,0,.24);cursor:default}
.wm-popd-img{width:100%;height:100%;object-fit:cover;pointer-events:none}
.wm-popd-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.1) 60%,transparent);display:flex;flex-direction:column;justify-content:space-between;padding:18px 20px}
.wm-popd-overlay-top{display:flex;justify-content:flex-end}
.wm-popd-country-tag{background:rgba(255,255,255,.2);color:var(--white);font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.25)}
.wm-popd-overlay-bottom{display:flex;align-items:flex-end;justify-content:space-between}
.wm-popd-name{font-family:var(--fh);font-size:22px;font-weight:700;color:var(--white);text-align:left;margin-bottom:2px}
.wm-popd-listing{font-size:12px;color:rgba(255,255,255,.75);text-align:left}
.wm-popd-btn{background:transparent;border:1.5px solid var(--white);color:var(--white);padding:7px 14px;border-radius:50px;font-size:12px;font-weight:700;transition:background .2s;white-space:nowrap}
.wm-popd-btn:hover{background:rgba(255,255,255,.18)}
.wm-popd-inactive-label{position:absolute;bottom:0;left:0;right:0;padding:14px 16px;background:linear-gradient(0deg,rgba(0,0,0,.55),transparent)}
.wm-popd-name-sm{font-family:var(--fh);font-size:15px;font-weight:700;color:var(--white);text-shadow:0 2px 8px rgba(0,0,0,.5)}
.wm-popd-hint{font-size:12px;color:#bbb;margin-top:12px;letter-spacing:.4px}

/* Testimonials */
.wm-testi{padding:var(--py) var(--px);background:var(--light)}
.wm-testi-header{text-align:center;margin-bottom:48px}
.wm-testi-body{display:flex;gap:32px;align-items:stretch}
.wm-testi-main{flex:0 0 58%;border-radius:var(--r4);overflow:hidden;box-shadow:var(--s3);display:flex;flex-direction:column;min-height:420px}
.wm-testi-main--next{animation:testi-slide-next .35s ease both}
.wm-testi-main--prev{animation:testi-slide-prev .35s ease both}
.wm-testi-main-photo{position:relative;height:200px;background-size:cover;background-position:center;flex-shrink:0}
.wm-testi-main-photo-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.55),rgba(0,0,0,.1))}
.wm-testi-trip-tag{position:absolute;bottom:14px;left:18px;background:rgba(255,255,255,.18);color:var(--white);font-size:12px;font-weight:700;padding:5px 12px;border-radius:20px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25)}
.wm-testi-main-body{background:var(--white);padding:26px 28px 24px;flex:1;display:flex;flex-direction:column;gap:16px}
.wm-testi-main-stars{color:#f59e0b;font-size:16px;letter-spacing:2px}
.wm-testi-main-quote{font-size:16px;line-height:1.78;font-style:italic;flex:1}
.wm-testi-main-author{display:flex;align-items:center;gap:12px;padding-top:14px;border-top:1px solid var(--border)}
.wm-testi-main-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2.5px solid var(--red);flex-shrink:0}
.wm-testi-main-name{font-size:14px;font-weight:700}
.wm-testi-main-loc{font-size:12px;color:var(--mid);margin-top:1px}
.wm-testi-badge-verified{margin-left:auto;font-size:11px;font-weight:700;color:#16a34a;background:#dcfce7;padding:4px 10px;border-radius:20px;white-space:nowrap}
.wm-testi-sidebar{flex:1;display:flex;flex-direction:column;gap:20px}
.wm-testi-sidebar-top{display:flex;align-items:center;justify-content:space-between}
.wm-testi-counter{font-family:var(--fh);font-size:22px;font-weight:700}
.wm-testi-controls{display:flex;gap:8px}
.wm-testi-ctrl{width:38px;height:38px;border-radius:50%;border:1.5px solid var(--border);background:var(--white);color:var(--dark);font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:var(--s1);transition:all .2s}
.wm-testi-ctrl:hover:not(:disabled){background:var(--red);color:var(--white);border-color:var(--red)}
.wm-testi-ctrl:disabled{opacity:.28;cursor:not-allowed}
.wm-testi-list{display:flex;flex-direction:column;background:var(--white);border-radius:var(--r3);overflow:hidden;box-shadow:var(--s1);border:1px solid var(--border)}
.wm-testi-list-row{display:flex;align-items:center;gap:12px;padding:13px 16px;cursor:pointer;transition:background .15s;border-bottom:1px solid var(--border);position:relative}
.wm-testi-list-row:last-child{border-bottom:none}
.wm-testi-list-row:hover{background:var(--light)}
.wm-testi-list-row--on{background:var(--red-lt)}
.wm-testi-list-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid transparent;transition:border-color .2s}
.wm-testi-list-row--on .wm-testi-list-avatar{border-color:var(--red)}
.wm-testi-list-text{flex:1}
.wm-testi-list-name{font-size:13px;font-weight:700}
.wm-testi-list-trip{font-size:11px;color:var(--mid);margin-top:1px}
.wm-testi-list-bar{width:3px;height:32px;background:var(--red);border-radius:3px;flex-shrink:0}
.wm-testi-rating{background:var(--white);border-radius:var(--r3);padding:18px 20px;box-shadow:var(--s1);border:1px solid var(--border)}
.wm-testi-rating-top{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.wm-testi-big-score{font-family:var(--fh);font-size:40px;font-weight:900;line-height:1}
.wm-testi-score-stars{color:#f59e0b;font-size:16px;letter-spacing:2px;margin-bottom:2px}
.wm-testi-score-label{font-size:12px;color:var(--mid)}
.wm-testi-bars{display:flex;flex-direction:column;gap:6px}
.wm-rbar-row{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--mid)}
.wm-rbar-lbl{width:22px;text-align:right;font-weight:600}
.wm-rbar-track{flex:1;height:5px;background:var(--light);border-radius:4px;overflow:hidden}
.wm-rbar-fill{height:100%;background:var(--red);border-radius:4px}
.wm-rbar-pct{width:26px;font-weight:600}
.wm-testi-dots-mobile{display:none}

/* CTA */
.wm-cta{background:linear-gradient(135deg,#ce000a 0%,#a30008 55%,#7d0006 100%);padding:var(--py) var(--px);display:flex;align-items:center;justify-content:space-between;gap:40px;position:relative;overflow:visible}
.wm-cta::before,.wm-cta::after{content:"";position:absolute;background:rgba(255,255,255,.04);border-radius:50%;pointer-events:none}
.wm-cta::before{top:-80px;right:180px;width:320px;height:320px}
.wm-cta::after{bottom:-90px;left:-50px;width:260px;height:260px}
.wm-cta-content{position:relative;z-index:2;max-width:540px}
.wm-cta-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:12px}
.wm-cta-title{font-family:var(--fh);font-size:clamp(28px,3.8vw,52px);font-weight:700;color:var(--white);line-height:1.15;margin-bottom:16px}
.wm-cta-sub{font-size:15px;color:rgba(255,255,255,.78);line-height:1.75;margin-bottom:32px}
.wm-cta-btn{display:inline-flex;align-items:center;background:var(--white);color:var(--red);padding:14px 34px;border-radius:50px;font-size:15px;font-weight:700;box-shadow:0 8px 26px rgba(0,0,0,.16);transition:transform .2s,box-shadow .2s}
.wm-cta-btn:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(0,0,0,.22)}
.wm-cta-right{position:absolute;right:5%;bottom:-150px;width:45%;z-index:1}
.wm-cta-img{width:100%;height:auto;object-fit:contain}

/* Footer */
.wm-footer{background:var(--dark);color:var(--white)}
.wm-footer-inner{display:grid;grid-template-columns:2fr 1fr 1.3fr 1.2fr;gap:44px;padding:68px var(--px) 52px;border-bottom:1px solid rgba(255,255,255,.08);max-width:1400px;margin:0 auto}
.wm-footer-logo{display:flex;align-items:center;gap:9px;font-family:var(--fh);font-size:20px;font-weight:700;margin-bottom:14px}
.wm-footer-desc{font-size:13px;color:rgba(255,255,255,.48);line-height:1.75;max-width:270px;margin-bottom:22px}
.wm-footer-socials{display:flex;gap:8px}
.wm-social-chip{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,.55);transition:all .2s}
.wm-social-chip:hover{background:var(--red);border-color:var(--red);color:var(--white)}
.wm-footer-col h4{font-size:13px;font-weight:700;color:var(--red);margin-bottom:18px;letter-spacing:.5px;text-transform:uppercase}
.wm-footer-col ul{display:flex;flex-direction:column;gap:10px}
.wm-footer-col ul li a{font-size:13px;color:rgba(255,255,255,.52);transition:color .2s}
.wm-footer-col ul li a:hover{color:var(--white)}
.wm-footer-col p{font-size:13px;color:rgba(255,255,255,.52);line-height:1.7;margin-bottom:7px}
.wm-footer-bottom{display:flex;align-items:center;justify-content:space-between;padding:18px var(--px);font-size:12px;color:rgba(255,255,255,.3);max-width:1400px;margin:0 auto}
.wm-footer-bottom-links{display:flex;gap:22px}
.wm-footer-bottom-links a{font-size:12px;color:rgba(255,255,255,.3);transition:color .2s}
.wm-footer-bottom-links a:hover{color:var(--white)}

/* Responsive */
@media(max-width:1100px){
  .wm-hero,.wm-itin{gap:44px}
  .wm-dest-grid{grid-template-columns:repeat(3,1fr)}
  .wm-testi-body{flex-direction:column}
  .wm-testi-main{flex:unset;min-height:unset}
  .wm-testi-sidebar{flex-direction:row;flex-wrap:wrap}
  .wm-testi-list{flex:1;min-width:240px}
  .wm-testi-rating{flex:1;min-width:220px}
}
@media(max-width:900px){
  .wm-hero{flex-direction:column;min-height:unset;padding-top:44px;text-align:center}
  .wm-hero-content{max-width:100%}
  .wm-hero-actions,.wm-hero-tagline{justify-content:center}
  .wm-hero-visual{flex:unset;width:100%;height:340px}
  .wm-hero-blob{width:320px;height:320px;top:-20px}
  .wm-float-card--top{left:0}
  .wm-float-card--bottom{right:0}
  .wm-itin{flex-direction:column}
  .wm-itin-card-col{flex:unset;width:100%}
  .wm-cta{flex-direction:column}
  .wm-cta-content{max-width:100%;text-align:center}
  .wm-cta-right{position:static;width:100%;max-width:400px;margin:0 auto}
  .wm-footer-inner{grid-template-columns:1fr 1fr}
  .booking-section{flex-direction:column;padding:60px 40px;gap:50px}
  .booking-visual{flex:unset;width:100%}
  .booking-card{width:100%;max-width:400px}
  .booking-confirm-badge{right:0}
}
@media(max-width:640px){
  .wm-nav-links{display:none;flex-direction:column;position:absolute;top:66px;left:0;right:0;background:var(--white);padding:18px var(--px);box-shadow:var(--s2);gap:16px;border-top:1px solid var(--border);z-index:99}
  .wm-nav-links--open{display:flex}
  .wm-hamburger{display:flex}
  .wm-dest-grid{grid-template-columns:repeat(2,1fr)}
  .wm-testi-sidebar{flex-direction:column}
  .wm-testi-dots-mobile{display:flex}
  .wm-footer-inner{grid-template-columns:1fr;gap:32px}
  .wm-footer-bottom{flex-direction:column;gap:10px;text-align:center}
  .wm-popd-arrow{width:38px;height:38px;font-size:20px}
  .booking-section{padding:40px 24px}
}
`;

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Services", "Destinations", "Booking", "Testimonials"];

const DESTINATIONS = [
  { name: "New York, USA", properties: "5,000+ properties", unsplash: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=480&fit=crop" },
  { name: "Singapore", properties: "2,500+ properties", unsplash: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=480&fit=crop" },
  { name: "Paris, France", properties: "3,000+ properties", unsplash: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=480&fit=crop" },
  { name: "London, UK", properties: "116,288+ properties", unsplash: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=480&fit=crop" },
  { name: "Tokyo, Japan", properties: "5,000+ properties", unsplash: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=480&fit=crop" },
  { name: "Sydney, Australia", properties: "4,200+ properties", unsplash: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=480&fit=crop" },
  { name: "Dubai, UAE", properties: "8,000+ properties", unsplash: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=480&fit=crop" },
];

const POPULAR_DESTS = [
  { name: "Maldives", listing: "18 Listings", country: "South Asia", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=720&fit=crop" },
  { name: "Thailand", listing: "22 Listings", country: "Southeast Asia", img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=720&fit=crop" },
  { name: "Bali", listing: "30 Listings", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=720&fit=crop" },
  { name: "Santorini", listing: "14 Listings", country: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=720&fit=crop" },
  { name: "New York", listing: "56 Listings", country: "USA", img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&h=720&fit=crop" },
  { name: "Swiss Alps", listing: "11 Listings", country: "Switzerland", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=720&fit=crop" },
  { name: "Tokyo", listing: "38 Listings", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=720&fit=crop" },
  { name: "Cape Town", listing: "21 Listings", country: "South Africa", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&h=720&fit=crop" },
  { name: "Paris", listing: "44 Listings", country: "France", img: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=500&h=720&fit=crop" },
  { name: "Phuket", listing: "19 Listings", country: "Thailand", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&h=720&fit=crop" },
];

const TESTIMONIALS = [
  { name: "Mike Taylor", location: "Lahore, Pakistan", trip: "Thailand · 7 days", text: "Wandermate made our Thailand trip absolutely seamless. The AI itinerary was spot-on and booking was effortless. I'll never plan a trip any other way.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face", bgImg: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=700&h=500&fit=crop", rating: 5 },
  { name: "Sarah Chen", location: "Singapore", trip: "Bali · 10 days", text: "From flights to local tours — everything in one place. The app suggested hidden gems we'd never have found ourselves. Absolutely loved every moment!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face", bgImg: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&h=500&fit=crop", rating: 5 },
  { name: "Arjun Mehta", location: "Mumbai, India", trip: "Agra · 3 days", text: "The drag-and-drop itinerary builder is genius. I rearranged our entire schedule in minutes. Customer support was also incredibly responsive and helpful.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", bgImg: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700&h=500&fit=crop", rating: 5 },
  { name: "Léa Fontaine", location: "Paris, France", trip: "Maldives · 5 days", text: "Booked our honeymoon entirely through Wandermate. The resort suggestions were perfect, and the seamless check-in experience was absolutely magical.", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face", bgImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=500&fit=crop", rating: 5 },
  { name: "James Okonkwo", location: "Lagos, Nigeria", trip: "Swiss Alps · 6 days", text: "Never thought travelling solo could feel this safe and organised. Wandermate handled every detail — from train passes to mountain hut bookings. 10/10.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face", bgImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop", rating: 5 },
];

const ITIN_FEATURES = [
  { icon: "🗓", bg: "feat-purple", title: "AI-Generated Plans", desc: "Get a full itinerary built from your preferences instantly." },
  { icon: "✏️", bg: "feat-red", title: "Drag & Drop Editing", desc: "Reorder activities with ease, anytime your plans change." },
  { icon: "🔔", bg: "feat-green", title: "Real-Time Reminders", desc: "Never miss a check-in or tour with smart timely alerts." },
];

const BOOKING_OPTIONS = [
  { icon: "✈️", label: "Flights" },
  { icon: "🚂", label: "Trains" },
  { icon: "🚌", label: "Buses" },
  { icon: "🏨", label: "Hotels" },
  { icon: "🚖", label: "Cabs" },
  { icon: "🛳️", label: "Cruises" },
];

/* ─── SOCIAL ICONS (inline SVG — no fa6 dependency) ─────────────────────── */
const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="wm-nav">
      <div className="wm-nav-inner">
        <div className="wm-logo">
          {/* Text fallback if no logo asset is available */}
          <span style={{ fontFamily: "var(--fh)", fontSize: 22, fontWeight: 900, color: "var(--red)" }}>
            Wandermate
          </span>
        </div>
        <ul className={`wm-nav-links ${menuOpen ? "wm-nav-links--open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
          <li>
            <a href="#" className="wm-nav-signup">Sign In</a>
          </li>
        </ul>
        <button className="wm-hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="wm-hero">
      <div className="wm-hero-content">
        <p className="wm-hero-tagline">
          <span className="tagline-dot" />
          Best Destinations Around the World
        </p>
        <h1 className="wm-hero-heading">
          Travel, <em>explore</em><br />and live a life<br />worth remembering
        </h1>
        <p className="wm-hero-sub">
          Wandermate is your AI-powered travel companion — crafting personalised
          itineraries, booking flights, hotels &amp; more, all in one seamless place.
        </p>
        <div className="wm-hero-actions">
          <a href="#" className="wm-btn-primary">Start Exploring →</a>
        </div>
      </div>
      <div className="wm-hero-visual">
        <div className="wm-hero-blob" />
        <div className="wm-plane wm-plane--left">✈</div>
        <div className="wm-plane wm-plane--right">✈</div>
        <div className="wm-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop"
            alt="Wandermate traveler"
            className="wm-hero-img"
          />
        </div>
        <div className="wm-float-card wm-float-card--top">
          <span className="wm-float-icon">📍</span>
          <div>
            <p className="wm-float-label">Next Stop</p>
            <p className="wm-float-val">Bali, Indonesia</p>
          </div>
        </div>
        <div className="wm-float-card wm-float-card--bottom">
          <span className="wm-float-icon">⭐</span>
          <div>
            <p className="wm-float-label">Avg Rating</p>
            <p className="wm-float-val">4.9 / 5.0</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdventureSection() {
  const [start, setStart] = useState(0);
  const visible = 4;
  const slice = DESTINATIONS.slice(start, start + visible);
  return (
    <section className="wm-adventure">
      <div className="wm-section-header">
        <h2 className="wm-section-title">Let's Go on an Adventure</h2>
        <p className="wm-section-sub">Explore the best places to stay in the world.</p>
      </div>
      <div className="wm-dest-carousel">
        <button className="wm-arrow wm-arrow--left" onClick={() => setStart((i) => Math.max(0, i - 1))} disabled={start === 0}>‹</button>
        <div className="wm-dest-grid">
          {slice.map((dest) => (
            <div className="wm-dest-card" key={dest.name}>
              <div className="wm-dest-img-wrap">
                <img src={dest.unsplash} alt={dest.name} className="wm-dest-img" loading="lazy" />
                <div className="wm-dest-img-overlay" />
              </div>
              <div className="wm-dest-info">
                <p className="wm-dest-name">{dest.name}</p>
                <p className="wm-dest-props">{dest.properties}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="wm-arrow wm-arrow--right" onClick={() => setStart((i) => Math.min(DESTINATIONS.length - visible, i + 1))} disabled={start >= DESTINATIONS.length - visible}>›</button>
      </div>
      <div className="wm-carousel-dots">
        {Array.from({ length: DESTINATIONS.length - visible + 1 }).map((_, i) => (
          <button key={i} className={`wm-dot ${i === start ? "wm-dot--on" : ""}`} onClick={() => setStart(i)} />
        ))}
      </div>
    </section>
  );
}

function ItinerarySection() {
  return (
    <section className="wm-itin">
      <div className="wm-itin-card-col">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=700&fit=crop"
          alt="Travel Itinerary"
          className="wm-itin-img"
        />
      </div>
      <div className="wm-itin-text">
        <span className="wm-eyebrow">Smart Planning</span>
        <h2 className="wm-section-title">
          Manage Your <span className="wm-accent">Itinerary</span><br />Effortlessly
        </h2>
        <p className="wm-body-text">
          Let Wandermate's AI build your perfect day-by-day travel plan in seconds. Drag, reorder,
          and edit on the fly — or let our assistant auto-fill gaps with local gems you'd never find on your own.
        </p>
        <ul className="wm-feat-list">
          {ITIN_FEATURES.map((f) => (
            <li key={f.title} className="wm-feat-item">
              <span className={`wm-feat-icon ${f.bg}`}>{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BookingSection() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="booking-section">
      <div className="booking-text">
        <span className="itn-eyebrow">One-Stop Solution</span>
        <h2 className="booking-title">
          Book Your <span className="booking-accent">Travel</span>
        </h2>
        <p className="booking-desc">
          From flights to hotel rooms, train seats to cab rides — book everything under one roof,
          anytime, anywhere. No more juggling a dozen apps. Wandermate is the only travel companion you'll ever need.
        </p>
        <div className="booking-tabs">
          {BOOKING_OPTIONS.map((opt, i) => (
            <button
              key={opt.label}
              className={`booking-tab ${activeTab === i ? "booking-tab--active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="booking-visual">
        <div className="booking-glow" />
        <div className="booking-card">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=380&fit=crop"
            alt="Booking mockup"
            className="wm-book-img"
          />
        </div>
        <div className="booking-price-tag">
          <span className="price-flag">🇮🇳</span>
          <div>
            <span className="price-route">DEL → BLR</span>
            <span className="price-val">From ₹2,499</span>
          </div>
        </div>
        <div className="booking-confirm-badge">
          <span className="confirm-check">✓</span>
          <span>Booking confirmed!</span>
        </div>
      </div>
    </section>
  );
}

function PopularDestinationSection() {
  const [active, setActive] = useState(2);
  const dragStart = useRef(null);

  const go = useCallback((dir) => {
    setActive((a) => {
      const total = POPULAR_DESTS.length;
      return (a + dir + total) % total;
    });
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);

  const onPointerDown = (x) => { dragStart.current = x; };
  const onPointerUp = (x) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    dragStart.current = null;
  };

  return (
    <section className="wm-popd">
      <div className="wm-section-header">
        <p className="wm-popd-eyebrow">Top Destinations</p>
        <h2 className="wm-section-title">Popular Right Now</h2>
        <p className="wm-section-sub">Swipe, click, or use arrow keys to explore destinations.</p>
      </div>
      <div className="wm-popd-wrapper">
        <button className="wm-popd-arrow wm-popd-arrow--left" onClick={() => go(-1)}>‹</button>
        <div
          className="wm-popd-stage"
          onMouseDown={(e) => onPointerDown(e.clientX)}
          onMouseUp={(e) => onPointerUp(e.clientX)}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
        >
          {POPULAR_DESTS.map((d, i) => {
            const total = POPULAR_DESTS.length;
            let off = i - active;
            if (off > total / 2) off -= total;
            if (off < -total / 2) off += total;
            const isActive = i === active;
            return (
              <div
                key={i}
                className={`wm-popd-card${isActive ? " wm-popd-card--active" : ""}`}
                style={{
                  transform: `translateX(${off * 215}px) scale(${isActive ? 1 : Math.max(0.7, 1 - Math.abs(off) * 0.1)})`,
                  zIndex: isActive ? 10 : 8 - Math.abs(off),
                  filter: isActive ? "none" : `brightness(${Math.max(0.45, 1 - Math.abs(off) * 0.22)}) blur(${Math.min(Math.abs(off) * 1.8, 5)}px)`,
                  opacity: Math.abs(off) > 3 ? 0 : 1,
                }}
                onClick={() => setActive(i)}
              >
                <img src={d.img} alt={d.name} className="wm-popd-img" loading="lazy" draggable={false} />
                {isActive ? (
                  <div className="wm-popd-overlay">
                    <div className="wm-popd-overlay-top">
                      <span className="wm-popd-country-tag">{d.country}</span>
                    </div>
                    <div className="wm-popd-overlay-bottom">
                      <div>
                        <p className="wm-popd-name">{d.name}</p>
                        <p className="wm-popd-listing">📋 {d.listing}</p>
                      </div>
                      <button className="wm-popd-btn">Explore →</button>
                    </div>
                  </div>
                ) : (
                  <div className="wm-popd-inactive-label">
                    <p className="wm-popd-name-sm">{d.name}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button className="wm-popd-arrow wm-popd-arrow--right" onClick={() => go(1)}>›</button>
      </div>
      <div className="wm-carousel-dots">
        {POPULAR_DESTS.map((_, i) => (
          <button key={i} className={`wm-dot${i === active ? " wm-dot--on" : ""}`} onClick={() => setActive(i)} />
        ))}
      </div>
      <p className="wm-popd-hint">← Swipe or use arrow keys →</p>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState("next");

  const go = (d) => {
    setDir(d > 0 ? "next" : "prev");
    setActive((a) => Math.max(0, Math.min(TESTIMONIALS.length - 1, a + d)));
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="wm-testi">
      <div className="wm-testi-header">
        <span className="wm-eyebrow">Testimonials</span>
        <h2 className="wm-section-title">What Wanderers Say</h2>
        <p className="wm-section-sub">Real stories from real travellers around the globe.</p>
      </div>
      <div className="wm-testi-body">
        <div className={`wm-testi-main wm-testi-main--${dir}`} key={active}>
          <div className="wm-testi-main-photo" style={{ backgroundImage: `url(${t.bgImg})` }}>
            <div className="wm-testi-main-photo-overlay" />
            <span className="wm-testi-trip-tag">📍 {t.trip}</span>
          </div>
          <div className="wm-testi-main-body">
            <div className="wm-testi-main-stars">{"★".repeat(t.rating)}</div>
            <p className="wm-testi-main-quote">"{t.text}"</p>
            <div className="wm-testi-main-author">
              <img src={t.avatar} alt={t.name} className="wm-testi-main-avatar" />
              <div>
                <p className="wm-testi-main-name">{t.name}</p>
                <p className="wm-testi-main-loc">{t.location}</p>
              </div>
              <span className="wm-testi-badge-verified">✓ Verified</span>
            </div>
          </div>
        </div>
        <div className="wm-testi-sidebar">
          <div className="wm-testi-sidebar-top">
            <span className="wm-testi-counter">
              <b style={{ color: "var(--red)" }}>{String(active + 1).padStart(2, "0")}</b>
              <span style={{ color: "#ccc" }}> / {String(TESTIMONIALS.length).padStart(2, "0")}</span>
            </span>
            <div className="wm-testi-controls">
              <button className="wm-testi-ctrl" onClick={() => go(-1)} disabled={active === 0}>←</button>
              <button className="wm-testi-ctrl" onClick={() => go(1)} disabled={active === TESTIMONIALS.length - 1}>→</button>
            </div>
          </div>
          <div className="wm-testi-list">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className={`wm-testi-list-row${i === active ? " wm-testi-list-row--on" : ""}`}
                onClick={() => { setDir(i > active ? "next" : "prev"); setActive(i); }}
              >
                <img src={item.avatar} alt={item.name} className="wm-testi-list-avatar" />
                <div className="wm-testi-list-text">
                  <p className="wm-testi-list-name">{item.name}</p>
                  <p className="wm-testi-list-trip">{item.trip}</p>
                </div>
                {i === active && <div className="wm-testi-list-bar" />}
              </div>
            ))}
          </div>
          <div className="wm-testi-rating">
            <div className="wm-testi-rating-top">
              <span className="wm-testi-big-score">4.9</span>
              <div>
                <div className="wm-testi-score-stars">★★★★★</div>
                <p className="wm-testi-score-label">1,200+ reviews</p>
              </div>
            </div>
            <div className="wm-testi-bars">
              {[["5★", 89], ["4★", 8], ["3★", 2], ["2★", 1], ["1★", 0]].map(([lbl, pct]) => (
                <div className="wm-rbar-row" key={lbl}>
                  <span className="wm-rbar-lbl">{lbl}</span>
                  <div className="wm-rbar-track">
                    <div className="wm-rbar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="wm-rbar-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="wm-carousel-dots wm-testi-dots-mobile">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} className={`wm-dot${i === active ? " wm-dot--on" : ""}`} onClick={() => setActive(i)} />
        ))}
      </div>
    </section>
  );
}

function CTABannerSection() {
  return (
    <section className="wm-cta">
      <div className="wm-cta-content">
        <p className="wm-cta-eyebrow">Your Journey Awaits</p>
        <h2 className="wm-cta-title">Ready to Start Your<br />Adventure?</h2>
        <p className="wm-cta-sub">
          Let us help you create the perfect journey. Our travel experts and AI are ready to craft
          your dream vacation — personalised just for you.
        </p>
        <a href="#" className="wm-cta-btn">Start Planning Now →</a>
      </div>
      <div className="wm-cta-right">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&h=500&fit=crop"
          alt="CTA Background"
          className="wm-cta-img"
        />
      </div>
    </section>
  );
}

function FooterSection() {
  const socials = [
    { icon: <IconInstagram />, label: "Instagram" },
    { icon: <IconTwitter />, label: "Twitter" },
    { icon: <IconLinkedIn />, label: "LinkedIn" },
    { icon: <IconFacebook />, label: "Facebook" },
  ];
  return (
    <footer className="wm-footer">
      <div className="wm-footer-inner">
        <div className="wm-footer-brand">
          <div className="wm-footer-logo">
            <span>Wandermate</span>
          </div>
          <p className="wm-footer-desc">
            Your trusted AI-powered travel companion for extraordinary experiences since 2020.
          </p>
          <div className="wm-footer-socials">
            {socials.map(({ icon, label }) => (
              <a key={label} href="#" className="wm-social-chip" title={label}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="wm-footer-col">
          <h4>Quick Links</h4>
          <ul>
            {["Home", "About", "Packages", "Blog", "Contact"].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="wm-footer-col">
          <h4>Services</h4>
          <ul>
            {["Flight Booking", "Hotel Booking", "Train & Bus", "AI Itinerary", "Travel Insurance"].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="wm-footer-col">
          <h4>Contact</h4>
          <p>📍 455 West Orchard Street,<br />Kings Mountain, NC 280867</p>
          <p>📞 +088 (246) 642-27-10</p>
          <p>✉️ hello@wandermate.com</p>
        </div>
      </div>
      <div className="wm-footer-bottom">
        <p>© 2026 Wandermate. All rights reserved.</p>
        <div className="wm-footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <style>{css}</style>
      <div className="wm-root">
        <Navbar />
        <HeroSection />
        <AdventureSection />
        <ItinerarySection />
        <BookingSection />
        <PopularDestinationSection />
        <TestimonialsSection />
        <CTABannerSection />
        <FooterSection />
      </div>
    </>
  );
}