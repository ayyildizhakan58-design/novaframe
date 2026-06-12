"use client";
import { type ReactNode, useState, useEffect } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const M = "#e8006f";
const ML = "#ff4da6";
const MD = "#9c004a";
const BG = "#050505";
const S1 = "#0f0f0f";
const S2 = "#161616";
const B1 = "#1f1f1f";
const B2 = "#2a2a2a";
const T1 = "#ffffff";
const T2 = "#a0a0a0";
const T3 = "#555555";

type Page =
  | "explore" | "cinema" | "audio" | "image" | "video" | "marketing"
  | "influencer" | "canvas" | "apps" | "library" | "login"
  | "pricing" | "mcp" | "collab" | "supercomputer" | "plugins";

type Mega = "image" | "video" | "audio" | null;

// ─── DATA ────────────────────────────────────────────────────────────────────
const IMG_F = ["Create Image","Cinematic Cameras","Moodboard","Soul ID","AI Influencer","Photodump","Relight","Inpaint","Image Upscale","Face Swap","Character Swap","Draw to Edit","Fashion Factory"];
const IMG_M = ["Nano Visual Pro","GPT Image 2","Recraft V4.1","Nano Banana Pro","Seedream 5.0","FluxFrame 2","Reve Studio","Z-Image","Topaz Upscale"];
const VID_F = ["Create Video","Cinema Studio","Mixed Media","Edit Video","Click to Ad","Trend Generator","Lipsync Studio","Draw to Video","Sketch to Video","UGC Factory","Video Upscale","Animate","Vibe Motion","Recast Studio"];
const VID_M = ["Seedance 2.0","Kling Motion 3.0","Kling O1 Edit","Sora 2","Google Veo 3.1","HappyHorse","Grok Imagine 1.5","WanFrame 2.7","Minimax Hailuo","DOP Camera Model"];
const AUD_F = ["Voiceover","Change Voice","Translation","Text to Speech","Audio Localization","Lipsync Audio"];
const AUD_M = ["Eleven v3","MiniMax Speech 2.8 HD","Seed Speech","VibeVoice","Calm Narrator","Studio Voice Pro"];

const CMODELS = [
  { name:"Cinema Studio 3.5", tag:"NEW",       desc:"AI director · camera selection · style presets", group:"Cinematic" },
  { name:"Cinema Studio 3.0", tag:"",          desc:"Enhanced camera and speed ramp control",          group:"Cinematic" },
  { name:"Cinema Studio 2.5", tag:"",          desc:"Camera movements with start frame",               group:"Cinematic" },
  { name:"Seedance 2.0",      tag:"NEW",       desc:"720p · 4s–15s · ByteDance",                      group:"Featured"  },
  { name:"Seedance 2.0 Fast", tag:"NEW",       desc:"720p · fast render",                             group:"Featured"  },
  { name:"Kling 3.0",         tag:"EXCLUSIVE", desc:"4K · 3s–15s",                                    group:"Featured"  },
  { name:"Kling 3.0 MC",      tag:"",          desc:"1080p · motion control · 3s–30s",                group:"Featured"  },
  { name:"HappyHorse",        tag:"NEW",       desc:"1080p · 3s–15s",                                 group:"Featured"  },
];

const PRESETS = ["BASEBALL GAME","DRIFT RACING","CGI BREAKDOWN","STORM GIANT","ZOMBIE DANCE","RED CARPET","NEON CITY","OFFICE CCTV","DRAGON FANTASY","CLOUD SURF","ON FIRE","MUKBANG"];
const LSTEPS  = ["Analyzing prompt…","Selecting model…","Composing camera motion…","Rendering preview…"];

const UGC_T   = ["UGC","Product Demo","Founder Story","Testimonial","Unboxing","Problem / Solution","Luxury Ad","Meme Ad","Stop Scrolling","Before / After","Storytelling","Shock Factor"];
const HOOKS   = ["Strong Hook","Question Hook","Pain Point","Before / After","Shocking Claim","Social Proof","Fast Benefit","Problem Solution","Review","Unboxing"];
const SETS    = ["Home","Studio","Street","Office","Gym","Luxury Apartment","Store","Outdoor","Car","Beach","Bedroom","Kitchen","Restaurant"];
const AVTS    = ["Male","Female","Influencer","Fitness Coach","Business Owner","Tech Reviewer","Beauty Creator"];
const PLATS   = ["TikTok","Instagram","YouTube","Facebook"];
const VOCS    = ["Calm & Clear","Energetic","Professional","Friendly","Authoritative","Warm"];
const CTAS    = ["Shop Now","Learn More","Get Started","Order Today","Try for Free","Book a Call","Download Now"];
const AIENGS  = ["Seedance 2.0","Kling 3.0","Google Veo 3.1","OpenAI GPT-4.1","Runway Gen-4","ElevenLabs"];

const CHAR_T  = ["Human","Ant","Bee","Octopus","Crocodile","Alien","Beetle","Elf","Mantis"];
const GENS    = ["Female","Male","Trans man","Trans woman","Non-binary"];
const ETHS    = ["African","Asian","European","Indian","Middle Eastern","Mixed"];
const SKINS   = ["black","dark brown","white","purple","tan","olive","grey","green","metallic","iridescent"];
const EYES    = ["Black","Purple","Green","White","Brown","Deep Brown","Blue","Amber","Red","Grey"];

const APPS_D: Record<string,{name:string;desc:string;icon:string}[]> = {
  "Professional":       [{name:"Virality Predictor",desc:"Predict viral potential",icon:"📊"},{name:"Similarity Score",desc:"Visual likeness",icon:"🔍"},{name:"Expand Image",desc:"AI outpainting",icon:"↔"},{name:"Angles 2.0",desc:"Multi-angle shots",icon:"📐"},{name:"Shots",desc:"Cinematic composer",icon:"🎬"}],
  "Enhance & Style":    [{name:"Skin Enhancer",desc:"AI skin retouching",icon:"✨"},{name:"AI Stylist",desc:"Fashion recommendations",icon:"👗"},{name:"Relight",desc:"Pro lighting adj.",icon:"💡"},{name:"Outfit Swap",desc:"Virtual outfit",icon:"🔄"},{name:"Style Snap",desc:"Snap & style",icon:"📸"}],
  "Face & Identity":    [{name:"Face Swap",desc:"Seamless face replace",icon:"🎭"},{name:"Headshot Gen",desc:"Pro headshots",icon:"🖼"},{name:"Character Swap",desc:"Full character replace",icon:"🔀"},{name:"Recast",desc:"Scene character swap",icon:"🎬"},{name:"Video Face Swap",desc:"Video face swap",icon:"📹"}],
  "Ads & Products":     [{name:"Click to Ad",desc:"URL to video ad",icon:"🎯"},{name:"Billboard Ad",desc:"Billboard creator",icon:"🏙"},{name:"Bullet Time",desc:"Matrix bullet time",icon:"⚡"},{name:"Truck Ad",desc:"Vehicle ad creator",icon:"🚛"},{name:"UGC Factory",desc:"UGC content gen",icon:"📱"}],
  "Games & Characters": [{name:"Game Dump",desc:"Game-style scenes",icon:"🎮"},{name:"Nano Strike",desc:"Action sequences",icon:"⚔"},{name:"Nano Theft",desc:"Heist cinematic",icon:"🎰"},{name:"Simlife",desc:"Life simulation",icon:"🌍"},{name:"Plushies",desc:"Cute characters",icon:"🧸"}],
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#050505;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#050505}
::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
button,input,textarea,select{font-family:inherit}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.9}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(232,0,111,.3)}50%{box-shadow:0 0 50px rgba(232,0,111,.7)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.fu{animation:fadeUp .5s ease both}
.fi{animation:fadeIn .3s ease both}
.bm{background:#e8006f;color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.bm:hover{background:#ff4da6;transform:translateY(-1px);box-shadow:0 8px 28px rgba(232,0,111,.4)}
.bm:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}
.bg{background:transparent;color:#a0a0a0;border:1px solid #2a2a2a;border-radius:8px;padding:11px 24px;font-size:13px;cursor:pointer;transition:all .2s}
.bg:hover{border-color:#555;color:#fff}
.card{background:#0f0f0f;border:1px solid #1f1f1f;border-radius:12px;transition:all .2s}
.card:hover{border-color:#2a2a2a;transform:translateY(-2px)}
.inp{background:#161616;border:1px solid #1f1f1f;border-radius:8px;color:#fff;padding:10px 14px;font-size:13px;outline:none;transition:border-color .2s;width:100%}
.inp:focus{border-color:#e8006f}
.inp::placeholder{color:#555}
.sel{background:#161616;border:1px solid #1f1f1f;border-radius:7px;color:#fff;padding:8px 10px;font-size:12px;outline:none;cursor:pointer}
.sb{display:block;width:100%;text-align:left;background:none;border:none;color:#555;font-size:12px;padding:8px 12px;border-radius:7px;cursor:pointer;transition:all .15s}
.sb:hover{background:#161616;color:#a0a0a0}
.chip{display:inline-flex;align-items:center;background:#161616;border:1px solid #1f1f1f;border-radius:6px;padding:5px 10px;font-size:11px;color:#a0a0a0;cursor:pointer;transition:all .15s;white-space:nowrap}
