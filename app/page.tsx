
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
.chip:hover,.chip.on{border-color:#e8006f;color:#ff4da6;background:rgba(232,0,111,.08)}
.uz{border:1px dashed #2a2a2a;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all .2s;background:#0f0f0f}
.uz:hover{border-color:#e8006f;background:rgba(232,0,111,.04)}
.nl{background:none;border:none;color:#555;font-size:12px;font-weight:500;padding:6px 10px;border-radius:6px;cursor:pointer;transition:color .15s;white-space:nowrap;display:flex;align-items:center;gap:5px}
.nl:hover,.nl.on{color:#fff}
.sk{background:linear-gradient(90deg,#0f0f0f 25%,#161616 50%,#0f0f0f 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:8px}
.tn{background:rgba(16,185,129,.15);color:#10b981;border:1px solid rgba(16,185,129,.3);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.tx{background:rgba(232,0,111,.15);color:#ff4da6;border:1px solid rgba(232,0,111,.3);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.mc{display:inline-flex;align-items:center;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:6px;padding:6px 12px;font-size:11px;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap}
.mc:hover,.mc.on{border-color:#e8006f;color:#ff4da6;background:rgba(232,0,111,.08)}
.pc{display:flex;align-items:center;gap:6px;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:8px;padding:8px 14px;font-size:12px;color:#888;cursor:pointer;transition:all .15s;font-weight:600}
.pc:hover,.pc.on{border-color:#e8006f;color:#fff;background:rgba(232,0,111,.1)}
`;

// ─── MICRO COMPONENTS ────────────────────────────────────────────────────────
const Lbl = ({s}:{s:string}) => (
  <span style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:1}}>{s}</span>
);
const Hr = () => <div style={{height:1,background:B1,margin:"6px 0"}}/>;

function UZ({label,h=80}:{label:string;h?:number}) {
  const [hov,setHov] = useState(false);
  return (
    <div className="uz" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{height:h,flex:1,minWidth:100}}>
      <div style={{fontSize:20,color:hov?M:T3}}>+</div>
      <span style={{fontSize:10,color:hov?ML:T3,fontWeight:500}}>{label}</span>
    </div>
  );
}

function Sel({label,opts,val,set}:{label:string;opts:string[];val:string;set:(v:string)=>void}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <Lbl s={label}/>
      <select className="sel" value={val} onChange={e=>set(e.target.value)}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Logo({sz=28}:{sz?:number}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:sz,height:sz,borderRadius:7,background:`linear-gradient(135deg,${M},${MD})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:sz*.5,color:"#fff",flexShrink:0}}>L</div>
      <span style={{color:T1,fontWeight:800,fontSize:Math.max(12,sz*.42),letterSpacing:-.5}}>Lumen<span style={{color:M}}>field</span><span style={{color:T3,fontWeight:700}}>-AI-Studio</span></span>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({cur,go}:{cur:Page;go:(p:Page)=>void}) {
  const [mega,setMega] = useState<Mega>(null);

  const items = [
    {l:"Explore",        p:"explore"       as Page},
    {l:"Image",          m:"image"         as Mega},
    {l:"Video",          m:"video"         as Mega},
    {l:"Audio",          m:"audio"         as Mega},
    {l:"Supercomputer",  p:"supercomputer" as Page, badge:"NEW",   bc:"#10b981"},
    {l:"MCP & CLI",      p:"mcp"           as Page, badge:"NEW",   bc:"#10b981"},
    {l:"Collab",         p:"collab"        as Page},
    {l:"Plugins",        p:"plugins"       as Page, badge:"NEW",   bc:"#10b981"},
    {l:"Marketing Studio",p:"marketing"   as Page},
    {l:"Cinema Studio",  p:"cinema"        as Page},
    {l:"AI Influencer",  p:"influencer"    as Page},
    {l:"Canvas",         p:"canvas"        as Page},
    {l:"Apps",           p:"apps"          as Page},
    {l:"Pricing",        p:"pricing"       as Page, badge:"30% OFF",bc:M},
  ];

  const src = {
    image: {f:IMG_F, m:IMG_M},
    video: {f:VID_F, m:VID_M},
    audio: {f:AUD_F, m:AUD_M},
  };

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:900,background:"rgba(5,5,5,.96)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${B1}`,height:57,display:"flex",alignItems:"center",padding:"0 20px",gap:4}}
      onMouseLeave={()=>setMega(null)}>
      <button onClick={()=>{go("explore");setMega(null);}} style={{background:"none",border:"none",cursor:"pointer",marginRight:16,flexShrink:0}}>
        <Logo/>
      </button>
      <div style={{display:"flex",alignItems:"center",gap:2,flex:1,overflowX:"auto"}}>
        {items.map(it=>(
          <button key={it.l}
            className={`nl${it.p===cur?" on":""}`}
            onMouseEnter={()=>setMega((it as {m?:Mega}).m??null)}
            onClick={()=>{if(it.p){go(it.p);setMega(null);}}}
          >
            {it.l}
            {(it as {badge?:string;bc?:string}).badge&&(
              <span style={{background:(it as {bc?:string}).bc||M,color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:4,letterSpacing:.8,textTransform:"uppercase"}}>
                {(it as {badge?:string}).badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexShrink:0}}>
        <button onClick={()=>go("login")} className="bg" style={{padding:"7px 16px",fontSize:12}}>Log in</button>
        <button onClick={()=>go("login")} className="bm" style={{padding:"7px 16px",fontSize:12}}>Sign up</button>
      </div>
      {mega&&(()=>{
        const d = src[mega];
        return (
          <div style={{position:"absolute",top:57,left:0,right:0,background:"rgba(5,5,5,.98)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${B1}`,padding:"28px 48px",display:"flex",gap:64,zIndex:1000,animation:"fadeIn .15s ease"}}>
            <div>
              <Lbl s="Features"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px 28px",marginTop:12}}>
                {d.f.map(f=>(
                  <button key={f} style={{background:"none",border:"none",color:T2,fontSize:12,textAlign:"left",padding:"4px 0",cursor:"pointer",transition:"color .12s"}}
                    onMouseEnter={e=>(e.currentTarget.style.color=ML)}
                    onMouseLeave={e=>(e.currentTarget.style.color=T2)}
                  >{f}</button>
                ))}
              </div>
            </div>
            <div style={{width:1,background:B1,flexShrink:0}}/>
            <div>
              <Lbl s="Models"/>
              <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:12}}>
                {d.m.map(m=>(
                  <button key={m} style={{background:"none",border:"none",color:T2,fontSize:12,textAlign:"left",padding:"4px 0",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"color .12s"}}
                    onMouseEnter={e=>(e.currentTarget.style.color=T1)}
                    onMouseLeave={e=>(e.currentTarget.style.color=T2)}
                  >
                    <span style={{width:5,height:5,borderRadius:"50%",background:M,flexShrink:0}}/>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </nav>
  );
}

// ─── EXPLORE ─────────────────────────────────────────────────────────────────
function ExplorePage({go}:{go:(p:Page)=>void}) {
  const [tick,setTick] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(x=>x+1),2600);return()=>clearInterval(t);},[]);
  const words = ["image","video","audio","ads","characters","content"];
  const cards = [
    {n:"Cinema Studio 3.5",d:"AI director · camera control",i:"🎥",p:"cinema" as Page,a:M},
    {n:"Seedance 2.0",     d:"720p cinematic video",        i:"⚡",p:"cinema" as Page,a:"#6366f1"},
    {n:"Marketing Studio", d:"Product ads in seconds",      i:"📱",p:"marketing" as Page,a:M},
    {n:"AI Influencer",    d:"Build virtual creators",      i:"🤖",p:"influencer" as Page,a:"#10b981"},
    {n:"Nano Visual Pro",  d:"Photorealistic images",       i:"🎨",p:"image" as Page,a:"#f59e0b"},
    {n:"Audio Studio",     d:"Voices in 30+ languages",     i:"🎙",p:"audio" as Page,a:"#06b6d4"},
    {n:"Canvas",           d:"AI visual workspace",         i:"🖼",p:"canvas" as Page,a:"#8b5cf6"},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG,overflowX:"hidden"}}>
      {/* HERO */}
      <section style={{position:"relative",padding:"100px 48px 80px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${M},transparent)`,animation:"scan 7s linear infinite",opacity:.35}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"48px 48px",opacity:.2,maskImage:"radial-gradient(ellipse 80% 60% at 50% 50%,black,transparent)"}}/>
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:350,background:`radial-gradient(ellipse,rgba(232,0,111,.1),transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"clamp(80px,16vw,220px)",fontWeight:900,color:"transparent",WebkitTextStroke:`1px ${B2}`,letterSpacing:-8,lineHeight:1,userSelect:"none",pointerEvents:"none",whiteSpace:"nowrap"}}>LUMEN</div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${B2}`,borderRadius:20,padding:"5px 14px",fontSize:11,color:T3,background:S1,marginBottom:32}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:M,animation:"pulse 2s ease-in-out infinite"}}/>
            The AI Creative Command Center
          </div>
          <h1 style={{fontSize:"clamp(38px,6vw,82px)",fontWeight:900,color:T1,letterSpacing:-3,lineHeight:1.02,marginBottom:20,maxWidth:820,margin:"0 auto 20px"}}>
            Create stunning{" "}
            <span style={{color:M,display:"inline-block",minWidth:180,transition:"all .3s"}}>{words[tick%words.length]}</span>
            <br/>with one command.
          </h1>
          <p style={{color:T2,fontSize:16,maxWidth:480,margin:"0 auto 36px",lineHeight:1.65}}>All models. All modalities. One platform built for creators who move fast.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="bm" onClick={()=>go("cinema")} style={{padding:"14px 34px",fontSize:14,animation:"glow 3s ease-in-out infinite"}}>Launch Studio →</button>
            <button className="bg" onClick={()=>go("apps")} style={{padding:"14px 34px",fontSize:14}}>Explore Apps</button>
          </div>
          <div style={{display:"flex",gap:48,justifyContent:"center",marginTop:56,flexWrap:"wrap"}}>
            {[["2M+","Creators"],["50+","AI Models"],["10B+","Frames rendered"],["99.9%","Uptime"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:24,fontWeight:800,color:T1,letterSpacing:-1}}>{n}</div>
                <div style={{fontSize:11,color:T3,marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURED */}
      <section style={{padding:"0 48px 64px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <Lbl s="Featured Tools"/>
          <button className="bg" onClick={()=>go("apps")} style={{padding:"5px 14px",fontSize:11}}>View all →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(168px,1fr))",gap:10}}>
          {cards.map(c=>(
            <button key={c.n} onClick={()=>go(c.p)} className="card"
              style={{padding:"20px 16px",textAlign:"left",cursor:"pointer",background:S1,border:`1px solid ${B1}`}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=c.a;(e.currentTarget as HTMLButtonElement).style.background=`${c.a}08`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor=B1;(e.currentTarget as HTMLButtonElement).style.background=S1;}}
            >
              <div style={{fontSize:26,marginBottom:10}}>{c.i}</div>
              <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:4}}>{c.n}</div>
              <div style={{color:T3,fontSize:11}}>{c.d}</div>
            </button>
          ))}
        </div>
      </section>
      {/* PRESETS */}
      <section style={{padding:"0 48px 80px",maxWidth:1280,margin:"0 auto"}}>
        <Lbl s="Viral Presets"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginTop:16}}>
          {PRESETS.map(p=>(
            <button key={p} onClick={()=>go("cinema")}
              style={{background:S1,border:`1px solid ${B1}`,borderRadius:8,padding:"14px 10px",color:T3,fontSize:10,fontWeight:800,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=`${M}10`;(e.currentTarget as HTMLButtonElement).style.color=ML;(e.currentTarget as HTMLButtonElement).style.borderColor=`${M}50`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=S1;(e.currentTarget as HTMLButtonElement).style.color=T3;(e.currentTarget as HTMLButtonElement).style.borderColor=B1;}}
            >{p}</button>
          ))}
        </div>
      </section>
      {/* CTA */}
      <section style={{margin:"0 auto 80px",background:S1,border:`1px solid ${B1}`,borderRadius:16,padding:"52px",textAlign:"center",position:"relative",overflow:"hidden",maxWidth:1184}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${M},transparent)`}}/>
        <h2 style={{fontSize:"clamp(22px,3vw,42px)",fontWeight:800,letterSpacing:-1.5,marginBottom:12}}>Ready to generate the impossible?</h2>
        <p style={{color:T2,fontSize:14,marginBottom:28}}>Join 2 million creators. No credit card required.</p>
        <button className="bm" onClick={()=>go("login")} style={{padding:"14px 36px",fontSize:14}}>Start for free →</button>
      </section>
    </div>
  );
}

// ─── CINEMA STUDIO ────────────────────────────────────────────────────────────
function CinemaPage() {
  const [prompt,setPrompt]     = useState("");
  const [model,setModel]       = useState("Cinema Studio 3.5");
  const [mOpen,setMOpen]       = useState(false);
  const [aspect,setAspect]     = useState("16:9");
  const [res,setRes]           = useState("1080p");
  const [dur,setDur]           = useState("8s");
  const [cam,setCam]           = useState("Dolly In");
  const [spd,setSpd]           = useState("Auto");
  const [loading,setLoading]   = useState(false);
  const [step,setStep]         = useState(0);
  const [results,setResults]   = useState<number[]>([]);
  const [mode,setMode]         = useState<"image"|"video">("video");

  const gen = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResults([]); setStep(0);
    for (let i=0;i<LSTEPS.length;i++) { await new Promise(r=>setTimeout(r,750)); setStep(i+1); }
    await new Promise(r=>setTimeout(r,300));
    setLoading(false); setResults([1,2,3]);
  };

  const vbgs = ["linear-gradient(135deg,#0d0019,#1a003a)","linear-gradient(135deg,#000d1a,#001f3f)","linear-gradient(135deg,#190000,#3a0018)"];

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      {/* Sidebar */}
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,background:BG}}>
        <div style={{padding:"6px 10px 2px"}}><Logo sz={20}/></div>
        <div style={{padding:"4px 12px 8px",fontSize:10,color:M,fontWeight:700,letterSpacing:.5}}>Cinema Studio</div>
        <Hr/>
        {["Home","My Elements","My Favorites","Community Feed","Projects"].map(s=><button key={s} className="sb">{s}</button>)}
        <div style={{flex:1}}/>
        <Hr/>
        <button className="bm" style={{fontSize:11,padding:"8px 12px",marginBottom:6}}>+ New Project</button>
        <button style={{background:"none",border:`1px solid ${B2}`,borderRadius:7,color:T3,fontSize:10,padding:"7px 12px",cursor:"pointer"}}>💎 Pricing — 30% OFF</button>
      </aside>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Workspace */}
        <div style={{flex:1,background:BG,backgroundImage:`linear-gradient(${B1} 1px,transparent 1px),linear-gradient(90deg,${B1} 1px,transparent 1px)`,backgroundSize:"40px 40px",display:"flex",alignItems:"center",justifyContent:"center",padding:40,overflow:"auto"}}>
          {!loading&&results.length===0&&(
            <div style={{textAlign:"center"}} className="fu">
              <div style={{fontSize:"clamp(18px,4vw,52px)",fontWeight:900,color:B2,letterSpacing:-2,lineHeight:1,marginBottom:4,WebkitTextStroke:`1px ${B1}`}}>CREATE YOUR FIRST PROJECT.</div>
              <div style={{fontSize:"clamp(18px,4vw,52px)",fontWeight:900,background:`linear-gradient(90deg,${M},${ML})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-2,lineHeight:1}}>GENERATE THE IMPOSSIBLE.</div>
              <p style={{color:T3,fontSize:13,marginTop:16}}>Type a prompt below and click Generate →</p>
            </div>
          )}
          {loading&&(
            <div style={{textAlign:"center",width:280}} className="fi">
              <div style={{marginBottom:24}}>
                {LSTEPS.map((s,i)=>(
                  <div key={s} style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:12,color:i<step?T2:B2,fontSize:13,transition:"color .3s"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",border:`1.5px solid ${i<step?M:B2}`,background:i<step?M:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",transition:"all .3s",flexShrink:0}}>{i<step?"✓":""}</div>
                    {s}
                  </div>
                ))}
              </div>
              <div style={{height:2,background:B1,borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",background:`linear-gradient(90deg,${M},${ML})`,borderRadius:2,width:`${(step/LSTEPS.length)*100}%`,transition:"width .6s ease"}}/>
              </div>
            </div>
          )}
          {results.length>0&&(
            <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}} className="fi">
              {results.map((_,i)=>(
                <div key={i} style={{width:240,height:152,background:vbgs[i],borderRadius:10,border:`1px solid ${B1}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform .2s"}}
                  onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
                >
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.6),transparent)"}}/>
                  <button style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",background:"rgba(232,0,111,.8)",border:"none",color:"#fff",fontSize:13,cursor:"pointer"}}>▶</button>
                  <div style={{position:"absolute",bottom:10,left:12}}>
                    <div style={{color:T1,fontSize:10,fontWeight:700}}>{model}</div>
                    <div style={{color:T3,fontSize:9}}>{aspect} · {dur} · {res}</div>
                  </div>
                  <div style={{position:"absolute",top:10,right:10,background:M,color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4}}>NEW</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Composer */}
        <div style={{background:S1,borderTop:`1px solid ${B1}`,padding:"14px 16px"}}>
          <div style={{display:"flex",gap:0,marginBottom:12,background:BG,borderRadius:7,padding:3,width:"fit-content",border:`1px solid ${B1}`}}>
            {(["image","video"] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{background:mode===m?S2:"none",border:"none",color:mode===m?T1:T3,padding:"5px 16px",borderRadius:5,fontSize:12,cursor:"pointer",fontWeight:mode===m?700:400,textTransform:"capitalize",transition:"all .15s"}}>{m}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:1,minWidth:240}}>
              <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)}
                placeholder="Describe your scene — a futuristic city at dusk, golden hour, slow dolly in…"
                rows={2} style={{resize:"none",lineHeight:1.5}}/>
            </div>
            {/* Model dropdown */}
            <div style={{position:"relative"}}>
              <button onClick={()=>setMOpen(!mOpen)}
                style={{background:S2,border:`1px solid ${B1}`,borderRadius:8,color:T1,padding:"9px 12px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600,transition:"border-color .15s"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=M)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor=B1)}
              >
                <span style={{width:6,height:6,borderRadius:"50%",background:M}}/>
                {model.length>20?model.slice(0,18)+"…":model}
                <span style={{color:T3,fontSize:9}}>▾</span>
              </button>
              {mOpen&&(
                <div style={{position:"absolute",bottom:"110%",left:0,background:S1,border:`1px solid ${B1}`,borderRadius:10,width:300,zIndex:200,boxShadow:"0 24px 64px rgba(0,0,0,.8)",overflow:"hidden"}}>
                  {["Cinematic","Featured"].map(grp=>(
                    <div key={grp}>
                      <div style={{padding:"10px 14px 4px",fontSize:9,color:T3,textTransform:"uppercase",letterSpacing:1,borderTop:grp==="Featured"?`1px solid ${B1}`:"none",marginTop:grp==="Featured"?4:0}}>{grp}</div>
                      {CMODELS.filter(m=>m.group===grp).map(m=>(
                        <button key={m.name} onClick={()=>{setModel(m.name);setMOpen(false);}}
                          style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",background:"none",border:"none",padding:"9px 14px",cursor:"pointer",textAlign:"left",transition:"background .12s"}}
                          onMouseEnter={e=>(e.currentTarget.style.background=S2)}
                          onMouseLeave={e=>(e.currentTarget.style.background="none")}
                        >
                          <div>
                            <div style={{color:T1,fontSize:12,fontWeight:600}}>{m.name}</div>
                            <div style={{color:T3,fontSize:10,marginTop:1}}>{m.desc}</div>
                          </div>
                          {m.tag&&<span className={m.tag==="NEW"?"tn":"tx"}>{m.tag}</span>}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Sel label="Aspect"   opts={["16:9","9:16","1:1","4:5"]}                               val={aspect} set={setAspect}/>
            <Sel label="Res"      opts={["720p","1080p","4K"]}                                     val={res}    set={setRes}/>
            <Sel label="Duration" opts={["4s","8s","12s","15s"]}                                   val={dur}    set={setDur}/>
            <Sel label="Camera"   opts={["Dolly In","Orbit","Push In","Crane","Handheld","Static"]} val={cam}    set={setCam}/>
            <Sel label="Speed"    opts={["Auto","Slow","Medium","Fast"]}                            val={spd}    set={setSpd}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:10,alignItems:"stretch",flexWrap:"wrap"}}>
            <UZ label="Start Frame" h={52}/>
            <UZ label="End Frame" h={52}/>
            <div style={{flex:1}}/>
            <button className="bm" onClick={gen} disabled={loading}
              style={{padding:"0 36px",minWidth:130,animation:!loading&&results.length===0?"glow 2.5s ease-in-out infinite":"none"}}>
              {loading?"Generating…":"Generate →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AUDIO ───────────────────────────────────────────────────────────────────
function AudioPage() {
  const [aMode,setAMode]   = useState("Voiceover");
  const [aModel,setAModel] = useState("Eleven v3");
  const [text,setText]     = useState("");
  const [loading,setLoading] = useState(false);
  const [wf,setWf]         = useState<number[]>([]);
  const models = [
    {n:"Eleven v3",             d:"Expressive AI voice · emotion control"},
    {n:"MiniMax Speech 2.8 HD", d:"Studio-quality text-to-speech"},
    {n:"Seed Speech",           d:"ByteDance multilingual voice"},
    {n:"VibeVoice",             d:"Long-form expressive synthesis"},
    {n:"Calm Narrator",         d:"Smooth narration & audiobook"},
    {n:"Studio Voice Pro",      d:"Broadcast-grade synthesis"},
  ];
  const gen = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,2200));
    setLoading(false);
    setWf(Array.from({length:52},()=>Math.random()*80+10));
  };
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:4,background:BG}}>
        {["My Generations","Narration Project","Ad Voiceover","Demo Reel"].map(p=><button key={p} className="sb">{p}</button>)}
        <div style={{flex:1}}/>
        <button className="bm" style={{width:"100%",fontSize:11,padding:"8px 12px"}}>+ New Project</button>
      </aside>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:BG,backgroundImage:`radial-gradient(ellipse 50% 40% at 50% 50%,rgba(232,0,111,.05),transparent)`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:80,left:0,right:0,display:"flex",justifyContent:"center",gap:2,opacity:.04}}>
            {Array.from({length:100},(_,i)=><div key={i} style={{width:2,borderRadius:2,height:`${44+Math.sin(i*.35)*34+((i*17)%23)}px`,background:M}}/>)}
          </div>
          <div style={{textAlign:"center",zIndex:1}} className="fu">
            <Lbl s="Audio Studio"/>
            <h1 style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:900,letterSpacing:-2,marginBottom:10,marginTop:12,lineHeight:1.05}}>Ready to give your<br/>scene a voice?</h1>
            <p style={{color:T3,fontSize:13}}>Type your script · select a voice · generate</p>
          </div>
          {wf.length>0&&(
            <div className="fi" style={{marginTop:36,background:S1,border:`1px solid ${B1}`,borderRadius:12,padding:"16px 20px",display:"flex",gap:2,alignItems:"center",zIndex:1}}>
              <button style={{width:34,height:34,borderRadius:"50%",background:M,border:"none",color:"#fff",fontSize:13,cursor:"pointer",flexShrink:0,marginRight:10}}>▶</button>
              {wf.map((h,i)=><div key={i} style={{width:2.5,borderRadius:2,height:`${h*.6}px`,background:`linear-gradient(to top,${M},${ML})`,transition:"height .3s"}}/>)}
              <span style={{color:T3,fontSize:10,marginLeft:10,flexShrink:0}}>0:0{Math.ceil(text.split(" ").length/2.5)} · {aModel}</span>
            </div>
          )}
        </div>
        <div style={{background:S1,borderTop:`1px solid ${B1}`,padding:"16px 20px",display:"flex",gap:14,alignItems:"flex-end",flexWrap:"wrap"}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Lbl s="Mode"/>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {["Voiceover","Change Voice","Translate"].map(m=>(
                <button key={m} onClick={()=>setAMode(m)} style={{background:aMode===m?`${M}18`:S2,border:`1px solid ${aMode===m?M:B1}`,color:aMode===m?ML:T3,borderRadius:7,padding:"6px 12px",fontSize:11,cursor:"pointer",fontWeight:aMode===m?700:400,transition:"all .15s"}}>{m}</button>
              ))}
            </div>
          </div>
          <div style={{flex:1,minWidth:200}}>
            <Lbl s="Script"/>
            <textarea className="inp" value={text} onChange={e=>setText(e.target.value)} placeholder="Type your narration or script here…" rows={4} style={{resize:"none",marginTop:6,lineHeight:1.5}}/>
          </div>
          <div style={{minWidth:195}}>
            <Lbl s="Voice Model"/>
            <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:6}}>
              {models.map(m=>(
                <button key={m.n} onClick={()=>setAModel(m.n)} style={{background:aModel===m.n?`${M}12`:"transparent",border:`1px solid ${aModel===m.n?M:B1}`,borderRadius:7,padding:"6px 10px",textAlign:"left",cursor:"pointer",transition:"all .15s"}}>
                  <div style={{color:aModel===m.n?ML:T1,fontSize:11,fontWeight:600}}>{m.n}</div>
                  <div style={{color:T3,fontSize:9,marginTop:1}}>{m.d}</div>
                </button>
              ))}
            </div>
          </div>
          <button className="bm" onClick={gen} disabled={loading} style={{padding:"12px 28px",alignSelf:"flex-end"}}>{loading?"Generating…":"Generate Voice"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MARKETING STUDIO ────────────────────────────────────────────────────────
function MarketingPage() {
  const [prompt,setPrompt]     = useState("");
  const [pUrl,setPUrl]         = useState("");
  const [pName,setPName]       = useState("");
  const [ugc,setUgc]           = useState("UGC");
  const [hook,setHook]         = useState("Strong Hook");
  const [setting,setSetting]   = useState("Home");
  const [avatar,setAvatar]     = useState("Female");
  const [voice,setVoice]       = useState("Calm & Clear");
  const [cta,setCta]           = useState("Shop Now");
  const [engine,setEngine]     = useState("Seedance 2.0");
  const [plats,setPlats]       = useState<string[]>(["TikTok"]);
  const [tab,setTab]           = useState<"product"|"app">("product");
  const [loading,setLoading]   = useState(false);
  const [results,setResults]   = useState<number[]>([]);
  const [urlLoad,setUrlLoad]   = useState(false);

  const togglePlat = (p:string) => setPlats(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);

  const fetchUrl = async () => {
    if (!pUrl.trim()) return;
    setUrlLoad(true);
    await new Promise(r=>setTimeout(r,1400));
    setUrlLoad(false);
    setPName("Premium Fitness Tracker Pro");
    setPrompt("A professional fitness influencer unboxes the Premium Fitness Tracker Pro, highlighting its sleek design and health features.");
  };

  const gen = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResults([]);
    await new Promise(r=>setTimeout(r,3000));
    setLoading(false); setResults([1,2,3]);
  };

  const adBgs = [`linear-gradient(160deg,${MD},${M},#ff6bb5)`,"linear-gradient(160deg,#1a0030,#4a0080,#8000ff)","linear-gradient(160deg,#001a30,#003f80,#0080ff)"];
  const pIcons: Record<string,string> = {TikTok:"🎵",Instagram:"📸",YouTube:"▶️",Facebook:"👤"};

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,background:BG}}>
        <div style={{fontSize:12,color:T1,fontWeight:700,padding:"6px 10px",marginBottom:2}}>Marketing Studio</div>
        <div style={{fontSize:10,color:M,fontWeight:600,padding:"0 12px 8px",letterSpacing:.3}}>Product Ad Generator</div>
        <Hr/>
        {["Compose","My Projects","URL to Ad","Ad Reference","All Generations"].map(s=><button key={s} className="sb">{s}</button>)}
        <div style={{flex:1}}/>
        <Hr/>
        <button className="bm" style={{width:"100%",marginTop:8,fontSize:11,padding:"8px 12px"}}>+ New Project</button>
      </aside>
      <div style={{flex:1,overflow:"auto"}}>
        {/* Hero */}
        <div style={{padding:"28px 40px 24px",borderBottom:`1px solid ${B1}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${M},transparent)`}}/>
          <Lbl s="Lumenfield Marketing Studio"/>
          <h1 style={{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,letterSpacing:-1.5,marginTop:8,lineHeight:1.05}}>TURN ANY PRODUCT INTO A VIDEO AD</h1>
          <p style={{color:T3,fontSize:13,marginTop:6}}>Upload product · choose style · get 9:16 ads in seconds</p>
          <div style={{display:"flex",gap:0,marginTop:16,background:BG,borderRadius:7,padding:3,width:"fit-content",border:`1px solid ${B1}`}}>
            {(["product","app"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?S2:"none",border:"none",color:tab===t?T1:T3,padding:"5px 18px",borderRadius:5,fontSize:12,cursor:"pointer",textTransform:"capitalize",fontWeight:tab===t?700:400,transition:"all .15s"}}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{padding:"24px 40px",maxWidth:920}}>
          {/* URL */}
          <div style={{marginBottom:18}}>
            <Lbl s="Product URL — auto-fills product info"/>
            <div style={{display:"flex",gap:8,marginTop:6}}>
              <input className="inp" value={pUrl} onChange={e=>setPUrl(e.target.value)} placeholder="https://yourstore.com/product/..." style={{flex:1}}/>
              <button onClick={fetchUrl} disabled={urlLoad} style={{background:S2,border:`1px solid ${B1}`,color:urlLoad?T3:ML,borderRadius:8,padding:"0 16px",fontSize:12,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>
                {urlLoad?"Fetching…":"Fetch →"}
              </button>
            </div>
            {pName&&(
              <div style={{marginTop:6,padding:"6px 10px",background:`${M}10`,border:`1px solid ${M}30`,borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:M,fontSize:11}}>✓</span>
                <span style={{color:T2,fontSize:11}}>Fetched: <strong style={{color:T1}}>{pName}</strong></span>
              </div>
            )}
          </div>
          {/* Prompt */}
          <div style={{marginBottom:16}}>
            <Lbl s="Ad Description"/>
            <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe what happens in the ad…" rows={3} style={{resize:"none",marginTop:6,lineHeight:1.5}}/>
          </div>
          {/* Controls */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:16}}>
            <Sel label="Ad Type"    opts={UGC_T} val={ugc}     set={setUgc}/>
            <Sel label="Hook Style" opts={HOOKS} val={hook}    set={setHook}/>
            <Sel label="Setting"    opts={SETS}  val={setting} set={setSetting}/>
            <Sel label="Avatar"     opts={AVTS}  val={avatar}  set={setAvatar}/>
            <Sel label="Voice"      opts={VOCS}  val={voice}   set={setVoice}/>
            <Sel label="CTA"        opts={CTAS}  val={cta}     set={setCta}/>
          </div>
          {/* AI Engine */}
          <div style={{marginBottom:16}}>
            <Lbl s="AI Engine"/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
              {AIENGS.map(e=><button key={e} className={`mc${engine===e?" on":""}`} onClick={()=>setEngine(e)}>{e}</button>)}
            </div>
          </div>
          {/* Platform */}
          <div style={{marginBottom:16}}>
            <Lbl s="Platform"/>
            <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
              {PLATS.map(p=>(
                <button key={p} className={`pc${plats.includes(p)?" on":""}`} onClick={()=>togglePlat(p)}>
                  <span>{pIcons[p]}</span>{p}
                  {plats.includes(p)&&<span style={{color:M,fontSize:10}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          {/* Upload + Generate */}
          <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"stretch"}}>
            <UZ label="Product / Image" h={60}/>
            <UZ label="Avatar / Influencer" h={60}/>
            <div style={{flex:1}}/>
            <button className="bm" onClick={gen} disabled={loading} style={{padding:"0 32px",minHeight:48,fontSize:13,animation:!loading&&results.length===0?"glow 2.5s ease-in-out infinite":"none"}}>
              {loading?"Generating Ad…":"Generate Ad →"}
            </button>
          </div>
          {loading&&<div style={{display:"flex",gap:12}}>{[1,2,3].map(i=><div key={i} className="sk" style={{width:150,height:266,borderRadius:12,animationDelay:`${i*.15}s`}}/>)}</div>}
          {results.length>0&&(
            <div className="fi">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <Lbl s={`${results.length} ads · ${plats.join(", ")}`}/>
                <button className="bg" style={{padding:"5px 14px",fontSize:11}}>Export All</button>
              </div>
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                {results.map((_,i)=>(
                  <div key={i} style={{width:150,height:266,borderRadius:12,background:adBgs[i],border:`1px solid ${B2}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform .2s"}}
                    onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.03)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
                  >
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
                    <button style={{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,.2)",border:"none",color:"#fff",fontSize:14,cursor:"pointer"}}>▶</button>
                    <div style={{position:"absolute",top:8,left:8}}><span style={{background:"rgba(0,0,0,.6)",color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4}}>{plats[i%plats.length]}</span></div>
                    <div style={{position:"absolute",bottom:10,left:10}}>
                      <div style={{color:"#fff",fontSize:10,fontWeight:700}}>{ugc}</div>
                      <div style={{color:"rgba(255,255,255,.5)",fontSize:9}}>{hook} · 9:16 · 15s</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MCP & CLI ───────────────────────────────────────────────────────────────
function McpPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"80px 48px",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${B2}`,borderRadius:20,padding:"5px 14px",fontSize:11,color:T3,background:S1,marginBottom:28}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/>Developer Tools
        </div>
        <h1 style={{fontSize:"clamp(32px,5vw,64px)",fontWeight:900,letterSpacing:-2.5,lineHeight:1.05,marginBottom:16}}>
          MCP & CLI<br/><span style={{color:M}}>for developers.</span>
        </h1>
        <p style={{color:T2,fontSize:16,lineHeight:1.7,marginBottom:40,maxWidth:560}}>Integrate Lumenfield directly into your workflow. Automate creative production at scale.</p>
        <div style={{background:S1,border:`1px solid ${B1}`,borderRadius:12,padding:"20px 24px",marginBottom:16,fontFamily:"monospace"}}>
          <div style={{fontSize:10,color:T3,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Install CLI</div>
          <div style={{color:"#10b981",fontSize:14}}>$ npm install -g @lumenfield/cli</div>
          <div style={{color:T3,fontSize:14,marginTop:6}}>$ lumenfield login</div>
          <div style={{color:T3,fontSize:14,marginTop:6}}>$ lumenfield generate --model seedance-2 --prompt &quot;cinematic sunset&quot;</div>
        </div>
        <div style={{background:S1,border:`1px solid ${B1}`,borderRadius:12,padding:"20px 24px",marginBottom:32,fontFamily:"monospace"}}>
          <div style={{fontSize:10,color:T3,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>MCP Config</div>
          <div style={{color:"#f59e0b",fontSize:13}}>{"{"}</div>
          <div style={{color:T2,fontSize:13,paddingLeft:20}}>&quot;mcpServers&quot;: {"{"}</div>
          <div style={{color:T2,fontSize:13,paddingLeft:40}}>&quot;lumenfield&quot;: {"{"}</div>
          <div style={{color:"#10b981",fontSize:13,paddingLeft:60}}>&quot;command&quot;: &quot;npx @lumenfield/mcp&quot;</div>
          <div style={{color:T2,fontSize:13,paddingLeft:40}}>{"}"}</div>
          <div style={{color:T2,fontSize:13,paddingLeft:20}}>{"}"}</div>
          <div style={{color:"#f59e0b",fontSize:13}}>{"}"}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
          {[{i:"⚡",t:"Fast API",d:"Sub-second response times"},{i:"🔧",t:"Full SDK",d:"TypeScript & Python"},{i:"🔄",t:"Webhooks",d:"Real-time job updates"},{i:"📦",t:"Batch Jobs",d:"Process thousands at once"},{i:"🔐",t:"Secure",d:"API key authentication"},{i:"📊",t:"Analytics",d:"Usage & cost tracking"}].map(f=>(
            <div key={f.t} className="card" style={{padding:"18px 16px"}}>
              <div style={{fontSize:24,marginBottom:8}}>{f.i}</div>
              <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:3}}>{f.t}</div>
              <div style={{color:T3,fontSize:11}}>{f.d}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:32,display:"flex",gap:12}}>
          <button className="bm" style={{padding:"12px 28px"}}>Get API Key →</button>
          <button className="bg" style={{padding:"12px 28px"}}>View Docs</button>
        </div>
      </div>
    </div>
  );
}

// ─── COLLAB ──────────────────────────────────────────────────────────────────
function CollabPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"80px 48px",maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:20}}>🤝</div>
        <h1 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:900,letterSpacing:-2,marginBottom:16}}>Create together.<br/><span style={{color:M}}>In real time.</span></h1>
        <p style={{color:T2,fontSize:16,lineHeight:1.7,marginBottom:40,maxWidth:500,margin:"0 auto 40px"}}>Invite your team, share projects, leave comments, and collaborate on AI-generated content.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,maxWidth:700,margin:"0 auto 40px",textAlign:"left"}}>
          {[{i:"👥",t:"Team Workspace",d:"Shared projects & assets"},{i:"💬",t:"Comments",d:"Leave feedback on any frame"},{i:"🔗",t:"Share Links",d:"One-click shareable URLs"},{i:"📋",t:"Review Mode",d:"Approve or request changes"},{i:"🏷",t:"Version History",d:"Track every iteration"},{i:"🔔",t:"Notifications",d:"Stay in the loop"}].map(f=>(
            <div key={f.t} className="card" style={{padding:"18px 16px"}}>
              <div style={{fontSize:22,marginBottom:8}}>{f.i}</div>
              <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:3}}>{f.t}</div>
              <div style={{color:T3,fontSize:11}}>{f.d}</div>
            </div>
          ))}
        </div>
        <button className="bm" style={{padding:"13px 32px",fontSize:14}}>Invite Team →</button>
      </div>
    </div>
  );
}

// ─── SUPERCOMPUTER ────────────────────────────────────────────────────────────
function SuperPage() {
  const [prompt,setPrompt] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("");
  const run = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResult("");
    await new Promise(r=>setTimeout(r,2000));
    setLoading(false);
    setResult("✓ Task queued · Cinema Studio · Marketing Studio · Audio Studio · 3 agents activated");
  };
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{background:"linear-gradient(160deg,rgba(204,255,0,.04),transparent)",borderBottom:`1px solid ${B1}`,padding:"60px 48px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(204,255,0,.1)",border:"1px solid rgba(204,255,0,.3)",borderRadius:20,padding:"4px 14px",fontSize:11,color:"#ccff00",marginBottom:20,fontWeight:700,letterSpacing:.5}}>⚡ NEW</div>
        <h1 style={{fontSize:"clamp(28px,5vw,60px)",fontWeight:900,letterSpacing:-2,marginBottom:12}}>SUPERCOMPUTER<br/><span style={{color:"#ccff00"}}>FOR CREATIVE WORK</span></h1>
        <p style={{color:T2,fontSize:16,marginBottom:36,maxWidth:480,margin:"0 auto 36px",lineHeight:1.6}}>Turn a simple conversation into production-ready content at scale.</p>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Create a TikTok ad for my fitness product with an AI influencer…" rows={3} style={{resize:"none",lineHeight:1.5,marginBottom:12,fontSize:14,border:"1px solid rgba(204,255,0,.2)"}}/>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
            {["Ask","Create","Research","Build"].map(a=>(
              <button key={a} style={{background:S2,border:`1px solid ${B1}`,color:T2,borderRadius:8,padding:"7px 18px",fontSize:12,cursor:"pointer",fontWeight:600,transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#ccff00";e.currentTarget.style.color="#ccff00";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=B1;e.currentTarget.style.color=T2;}}
              >{a}</button>
            ))}
          </div>
          <button onClick={run} disabled={loading} style={{background:"#ccff00",color:"#000",border:"none",borderRadius:10,padding:"13px 40px",fontSize:14,fontWeight:900,cursor:loading?"not-allowed":"pointer",opacity:loading?.6:1,transition:"all .2s"}}>
            {loading?"Processing…":"Run Supercomputer →"}
          </button>
          {result&&<div className="fi" style={{marginTop:14,padding:"10px 16px",background:"rgba(204,255,0,.08)",border:"1px solid rgba(204,255,0,.2)",borderRadius:8,color:"#ccff00",fontSize:12,fontWeight:600}}>{result}</div>}
        </div>
      </div>
      <div style={{padding:"48px",maxWidth:1200,margin:"0 auto"}}>
        <Lbl s="What can the Supercomputer do?"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginTop:16}}>
          {["Video Ads","Product Photography","UGC Videos","AI Influencers","Fashion Campaigns","Voice Generation","Storyboards","Marketing Automation"].map(item=>(
            <div key={item} className="card" style={{padding:"20px 16px",textAlign:"center",cursor:"pointer"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="#ccff00";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=B1;}}
            >
              <div style={{color:T1,fontSize:12,fontWeight:700}}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PLUGINS ─────────────────────────────────────────────────────────────────
function PluginsPage() {
  const [active,setActive] = useState("Premiere Pro");
  const plugins = ["Premiere Pro","After Effects","DaVinci Resolve","Figma","Photoshop"];
  const features = ["Generate AI Video","Generate AI Image","Reframe","Remove Background","Draw to Edit","Upscale"];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"60px 48px 40px",borderBottom:`1px solid ${B1}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${M},transparent)`}}/>
        <Lbl s="Plugins"/>
        <h1 style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:900,letterSpacing:-1.5,marginTop:10,lineHeight:1.05}}>
          Lumenfield is now inside<br/><span style={{color:M}}>{active}</span>
        </h1>
        <p style={{color:T2,fontSize:15,marginTop:12,maxWidth:520,lineHeight:1.65}}>Generate, edit, reframe, upscale and remove backgrounds directly inside your {active} timeline.</p>
        <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
          <button className="bm" style={{padding:"11px 24px"}}>⬇ Download for macOS</button>
          <button className="bg" style={{padding:"11px 24px"}}>⬇ Download for Windows</button>
        </div>
      </div>
      <div style={{borderBottom:`1px solid ${B1}`,padding:"0 48px",display:"flex",gap:4,overflowX:"auto"}}>
        {plugins.map(p=>(
          <button key={p} onClick={()=>setActive(p)} style={{background:"none",border:"none",color:active===p?T1:T3,fontSize:13,padding:"14px 16px",cursor:"pointer",borderBottom:`2px solid ${active===p?M:"transparent"}`,fontWeight:active===p?700:400,transition:"all .15s",whiteSpace:"nowrap"}}>{p}</button>
        ))}
      </div>
      <div style={{padding:"40px 48px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{marginBottom:40}}>
          <Lbl s="Setup — 3 steps"/>
          <div style={{display:"flex",gap:12,marginTop:16,flexWrap:"wrap"}}>
            {[{n:"1",t:"Download",d:"Get the .dmg or .exe installer"},{n:"2",t:"Install",d:"Follow the on-screen instructions"},{n:"3",t:`Open ${active}`,d:"Find Lumenfield under Window → Extensions"}].map(s=>(
              <div key={s.n} style={{flex:1,minWidth:180,background:S1,border:`1px solid ${B1}`,borderRadius:10,padding:"18px 16px"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:M,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",marginBottom:10}}>{s.n}</div>
                <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:4}}>{s.t}</div>
                <div style={{color:T3,fontSize:11}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:40}}>
          <Lbl s="Features"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginTop:16}}>
            {features.map(f=>(
              <div key={f} className="card" style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:M,fontSize:14}}>✓</span>
                <span style={{color:T1,fontSize:12,fontWeight:600}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginBottom:40}}>
          <Lbl s="Compatibility"/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
            {["Adobe Premiere Pro 2024+","Adobe After Effects 2024+","macOS Apple Silicon / Intel","Windows 10 / 11 64-bit"].map(c=>(
              <div key={c} style={{background:S2,border:`1px solid ${B1}`,borderRadius:6,padding:"6px 12px",fontSize:11,color:T2}}>{c}</div>
            ))}
          </div>
        </div>
        <div>
          <Lbl s="FAQ"/>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:16}}>
            {[["How do I install on macOS?","Download the .dmg, open it, drag Lumenfield to Applications. Restart Premiere Pro."],["How do I install on Windows?","Run the .exe as administrator and follow the prompts. Restart your Adobe app."],["Which Adobe versions are supported?","Premiere Pro 2024+ and After Effects 2024+."],["Do I need internet?","Yes, Lumenfield requires internet for AI generation."],["Do I need a subscription?","Yes, you need an active Lumenfield account with credits."]].map(([q,a])=>(
              <div key={q} style={{background:S1,border:`1px solid ${B1}`,borderRadius:10,padding:"14px 16px"}}>
                <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:6}}>{q}</div>
                <div style={{color:T3,fontSize:11,lineHeight:1.6}}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI INFLUENCER ────────────────────────────────────────────────────────────
function InfluencerOptionGrid({
  field,
  label,
  opts,
  sel,
  up,
}: {
  field: string;
  label: string;
  opts: string[];
  sel: Record<string,string>;
  up: (k:string,v:string) => void;
}) {
  return (
    <div style={{marginBottom:18}}>
      <div style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {opts.map(o=><button key={o} onClick={()=>up(field,o)} style={{background:sel[field]===o?`${M}18`:S2,border:`1px solid ${sel[field]===o?M:B1}`,color:sel[field]===o?ML:T3,borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer",transition:"all .12s"}}>{o}</button>)}
      </div>
    </div>
  );
}

function InfluencerPage() {
  const [sel,setSel] = useState<Record<string,string>>({char:"Human",gender:"Female",eth:"African",skin:"dark brown",eyes:"Brown",age:"Adult"});
  const [loading,setLoading] = useState(false);
  const [done,setDone] = useState(false);
  const up = (k:string,v:string) => setSel(s=>({...s,[k]:v}));
  const gen = async () => { setLoading(true); await new Promise(r=>setTimeout(r,2400)); setLoading(false); setDone(true); };
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:160,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:6,background:BG}}>
        <Lbl s="My Influencers"/>
        <div style={{height:8}}/>
        {["Aurora V","Kai X","Nova One","Zara M"].map(n=>(
          <div key={n} style={{background:S1,borderRadius:8,padding:8,border:`1px solid ${B1}`,cursor:"pointer"}}>
            <div style={{width:"100%",aspectRatio:"1",borderRadius:6,background:S2,marginBottom:5}}/>
            <div style={{color:T3,fontSize:10,textAlign:"center"}}>{n}</div>
          </div>
        ))}
        <button style={{background:"none",border:`1px dashed ${B2}`,color:T3,borderRadius:8,padding:"8px",fontSize:10,cursor:"pointer",marginTop:4,transition:"all .15s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.color=ML;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=B2;e.currentTarget.style.color=T3;}}
        >+ Create New</button>
      </aside>
      <div style={{width:268,flexShrink:0,borderRight:`1px solid ${B1}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,background:`radial-gradient(ellipse at center,${M}04,transparent)`}}>
        <div style={{width:196,height:256,borderRadius:16,background:done?`linear-gradient(160deg,#0d0019,#1a003a)`:S1,border:`1px solid ${done?M:B1}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",transition:"all .4s"}}>
          {loading&&<div style={{textAlign:"center"}}><div style={{width:28,height:28,border:`2px solid ${M}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 8px"}}/><div style={{color:T3,fontSize:11}}>Generating…</div></div>}
          {done&&!loading&&<><div style={{width:72,height:92,borderRadius:36,background:`linear-gradient(160deg,${M},${ML})`,position:"absolute",top:"18%"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(to top,#0d0019,transparent)"}}/><div style={{position:"absolute",bottom:14,color:T1,fontSize:11,textAlign:"center"}}><div style={{fontWeight:700}}>Lumenfield Character</div><div style={{color:T3,fontSize:9}}>{sel.char} · {sel.gender}</div></div></>}
          {!done&&!loading&&<div style={{color:T3,fontSize:11,textAlign:"center"}}>Preview<br/>appears here</div>}
        </div>
        <button className="bm" onClick={gen} disabled={loading} style={{marginTop:16,width:"100%",padding:"11px",animation:!loading&&!done?"glow 2.5s ease-in-out infinite":"none"}}>{loading?"Generating…":done?"Regenerate →":"Generate Influencer →"}</button>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"24px 28px"}}>
        <h2 style={{color:T1,fontSize:15,fontWeight:800,marginBottom:20,letterSpacing:-.3}}>Build Your AI Influencer</h2>
        <InfluencerOptionGrid label="Character Type" field="char"   opts={CHAR_T} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Gender"         field="gender" opts={GENS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Ethnicity"      field="eth"    opts={ETHS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Skin Color"     field="skin"   opts={SKINS} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Eye Color"      field="eyes"   opts={EYES} sel={sel} up={up}/>
        <InfluencerOptionGrid label="Age"            field="age"    opts={["Adult","Mature","Senior"]} sel={sel} up={up}/>
      </div>
    </div>
  );
}

// ─── CANVAS ──────────────────────────────────────────────────────────────────
function CanvasPage() {
  const [created,setCreated] = useState(false);
  return (
    <div style={{height:"100vh",paddingTop:57,background:"#020202",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#1a2a4a 1px,transparent 1px)",backgroundSize:"28px 28px",opacity:.4}}/>
      {[{top:"15%",left:"8%",w:130,h:88,bg:"linear-gradient(135deg,#0d1a2e,#1e3a5f)"},{top:"22%",right:"10%",w:110,h:70,bg:`linear-gradient(135deg,${MD},#1a003a)`},{top:"62%",left:"6%",w:100,h:76,bg:"linear-gradient(135deg,#0a1a28,#1a3a4f)"},{top:"70%",right:"14%",w:90,h:60,bg:"linear-gradient(135deg,#1a0d00,#3a1a00)"}].map((c,i)=>(
        <div key={i} style={{position:"absolute",top:c.top,left:c.left as string|undefined,right:c.right as string|undefined,width:c.w,height:c.h,background:c.bg,borderRadius:10,border:`1px solid ${B1}`,opacity:.65}}/>
      ))}
      <div style={{position:"absolute",top:"18%",right:"22%",background:"#fff",color:"#111",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>That&apos;s stunning! 🎉</div>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",zIndex:10}}>
        <div style={{border:`2px solid ${M}40`,borderRadius:14,padding:"22px 36px",background:"rgba(5,5,5,.9)",backdropFilter:"blur(10px)",marginBottom:20}}>
          <div style={{fontSize:"clamp(12px,2vw,18px)",fontWeight:900,color:M,letterSpacing:.5}}>GENERATE STUNNING MEDIA WITH AI CANVAS</div>
        </div>
        {!created?(
          <div style={{background:"rgba(10,10,10,.96)",border:`1px solid ${B1}`,borderRadius:14,padding:"28px 44px",backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:32,marginBottom:10}}>🖼</div>
            <div style={{color:T1,fontSize:14,fontWeight:700,marginBottom:5}}>No Boards Yet</div>
            <div style={{color:T3,fontSize:12,marginBottom:20}}>Make images, videos, and ideas in one place</div>
            <button className="bm" onClick={()=>setCreated(true)}>Create Canvas</button>
          </div>
        ):(
          <div style={{color:M,fontSize:14,fontWeight:700}}>✓ Canvas created!</div>
        )}
      </div>
      <div style={{position:"absolute",bottom:72,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8}}>
        {["Long Video","Seedance 2.0","Extend Video","Storyboard","Product Board","Character Builder"].map(t=>(
          <div key={t} style={{background:"rgba(10,10,10,.88)",border:`1px solid ${B1}`,borderRadius:7,padding:"7px 12px",fontSize:10,color:"#3a7abf",cursor:"pointer",whiteSpace:"nowrap",backdropFilter:"blur(8px)",transition:"all .15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.color=ML;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=B1;e.currentTarget.style.color="#3a7abf";}}
          >{t}</div>
        ))}
      </div>
      <div style={{position:"absolute",bottom:20,right:20,background:S1,border:`1px solid ${B1}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 24px rgba(0,0,0,.6)"}}>
        <div><div style={{color:"#f59e0b",fontSize:11,fontWeight:700}}>Credits running low!</div><div style={{color:T3,fontSize:10}}>Over 90% already used</div></div>
        <button className="bm" style={{padding:"6px 14px",fontSize:11}}>Upgrade</button>
      </div>
    </div>
  );
}

// ─── APPS ────────────────────────────────────────────────────────────────────
function AppsPage({go}:{go:(p:Page)=>void}) {
  const cats = Object.keys(APPS_D);
  const [cat,setCat] = useState("Professional");
  const acc:Record<string,string> = {"Professional":"#6366f1","Enhance & Style":"#10b981","Face & Identity":M,"Ads & Products":"#f59e0b","Games & Characters":"#8b5cf6"};
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{padding:"32px 40px 0"}}>
        <h1 style={{color:T1,fontSize:26,fontWeight:900,letterSpacing:-1,marginBottom:6}}>AI Apps</h1>
        <p style={{color:T3,fontSize:13,marginBottom:24}}>Creative tools powered by the latest models.</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:32,paddingBottom:20,borderBottom:`1px solid ${B1}`}}>
          {["All",...cats].map(c=><button key={c} className={`chip${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </div>
      <div style={{padding:"0 40px 60px"}}>
        {(cat==="All"?cats:[cat]).map(grp=>(
          <div key={grp} style={{marginBottom:36}}>
            {cat==="All"&&<div style={{fontSize:10,color:T3,textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>{grp}</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
              {(APPS_D[grp]??[]).map(app=>(
                <div key={app.name} className="card" style={{padding:0,overflow:"hidden"}}>
                  <div style={{height:90,background:`${acc[grp]||M}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,borderBottom:`1px solid ${B1}`}}>{app.icon}</div>
                  <div style={{padding:"12px 14px"}}>
                    <div style={{display:"inline-block",fontSize:8,color:acc[grp]||M,border:`1px solid ${acc[grp]||M}40`,borderRadius:4,padding:"1px 6px",marginBottom:5,textTransform:"uppercase"}}>{grp}</div>
                    <div style={{color:T1,fontSize:12,fontWeight:700,marginBottom:3}}>{app.name}</div>
                    <div style={{color:T3,fontSize:11,marginBottom:10}}>{app.desc}</div>
                    <button onClick={()=>go("cinema")} style={{width:"100%",background:`${acc[grp]||M}12`,border:`1px solid ${acc[grp]||M}40`,color:acc[grp]||M,borderRadius:6,padding:"6px 0",fontSize:11,cursor:"pointer",fontWeight:700,transition:"all .15s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background=acc[grp]||M;e.currentTarget.style.color="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background=`${acc[grp]||M}12`;e.currentTarget.style.color=acc[grp]||M;}}
                    >Try Now →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LIBRARY ─────────────────────────────────────────────────────────────────
function LibraryPage({go}:{go:(p:Page)=>void}) {
  const [f,setF] = useState("Video");
  const [view,setView] = useState<"grid"|"list">("grid");
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG,padding:"72px 40px 40px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <h1 style={{color:T1,fontSize:22,fontWeight:900,letterSpacing:-.5}}>My Library</h1>
        <div style={{display:"flex",gap:6}}>
          {(["grid","list"] as const).map(v=><button key={v} onClick={()=>setView(v)} style={{background:view===v?S2:"transparent",border:`1px solid ${B1}`,color:view===v?T1:T3,borderRadius:6,padding:"6px 12px",fontSize:11,cursor:"pointer"}}>{v==="grid"?"⊞":"≡"} {v}</button>)}
        </div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:36}}>
        {["Image","Video","Audio","Marketing Studio","Characters","Lipsync","Canvas Boards"].map(x=><button key={x} className={`chip${f===x?" on":""}`} onClick={()=>setF(x)}>{x}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 0",textAlign:"center"}}>
        <div style={{fontSize:48,opacity:.1,marginBottom:16}}>🎬</div>
        <div style={{color:T2,fontSize:16,fontWeight:700,marginBottom:6}}>Your creations will appear here.</div>
        <div style={{color:T3,fontSize:13,marginBottom:28}}>Let&apos;s make magic ✨</div>
        <button className="bm" onClick={()=>go("cinema")} style={{padding:"12px 28px"}}>Start Generating →</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({go}:{go:(p:Page)=>void}) {
  const tabs = ["Nano Visual Pro","Kling 3.0","Lumenfield Soul","Cinema App","SeedMotion 2.0","VeoStyle 3.1"];
  const [tab,setTab] = useState(0);
  const bgs = [`linear-gradient(160deg,#1a0030,${MD},#0d0019)`,"linear-gradient(160deg,#001020,#003060,#001020)","linear-gradient(160deg,#200010,#600030,#200010)","linear-gradient(160deg,#001020,#002040,#001020)","linear-gradient(160deg,#102000,#205000,#102000)","linear-gradient(160deg,#001020,#003030,#001020)"];
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <div style={{width:"42%",minWidth:340,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 56px",borderRight:`1px solid ${B1}`}}>
        <div style={{marginBottom:36}}><Logo sz={32}/></div>
        <h1 style={{color:T1,fontSize:26,fontWeight:900,letterSpacing:-1,marginBottom:6}}>Welcome back</h1>
        <p style={{color:T3,fontSize:13,marginBottom:28,lineHeight:1.5}}>Sign in to access your studio, generations, and projects.</p>
        <button className="bg" onClick={()=>go("explore")} style={{marginBottom:12,width:"100%"}}>Back to Explore</button>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {[{icon:"G",label:"Continue with Google",bg:"#fff",fg:"#1a1a1a",border:"#e0e0e0"},{icon:"⌘",label:"Continue with Apple",bg:"#111",fg:"#fff",border:B2},{icon:"M",label:"Continue with Microsoft",bg:"#0078d4",fg:"#fff",border:"#0078d4"},{icon:"✉",label:"Continue with Email",bg:S1,fg:T2,border:B2}].map(b=>(
            <button key={b.label} style={{background:b.bg,border:`1px solid ${b.border}`,color:b.fg,borderRadius:9,padding:"11px 18px",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:12,fontWeight:600,transition:"opacity .15s"}}
              onMouseEnter={e=>(e.currentTarget.style.opacity=".85")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
            ><span style={{fontSize:15,width:18,textAlign:"center"}}>{b.icon}</span>{b.label}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0"}}>
          <div style={{flex:1,height:1,background:B1}}/><span style={{color:T3,fontSize:11}}>or SSO</span><div style={{flex:1,height:1,background:B1}}/>
        </div>
        <p style={{color:T3,fontSize:10,lineHeight:1.7}}>By continuing you agree to our Terms of Service and Privacy Policy. Lumenfield-AI-Studio is an original, independently built platform.</p>
      </div>
      <div style={{flex:1,background:bgs[tab],position:"relative",transition:"background .5s ease",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
        <div style={{position:"absolute",top:"38%",left:"50%",transform:"translate(-50%,-50%)",userSelect:"none"}}>
          <div style={{fontSize:"clamp(60px,10vw,140px)",fontWeight:900,color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,.06)",letterSpacing:-6}}>LUMEN</div>
        </div>
        <div style={{position:"absolute",bottom:28,left:0,right:0,display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap",padding:"0 16px"}}>
          {tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?M:"rgba(255,255,255,.1)",border:`1px solid ${tab===i?M:"rgba(255,255,255,.2)"}`,color:"#fff",borderRadius:20,padding:"5px 14px",fontSize:11,cursor:"pointer",fontWeight:tab===i?700:400,backdropFilter:"blur(8px)",transition:"all .2s"}}>{t}</button>)}
        </div>
      </div>
    </div>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingPage() {
  const plans = [
    {name:"Starter",price:"Free",period:"",    desc:"Explore Lumenfield",           hl:false, features:["50 credits/month","720p output","Standard models","Community access"]},
    {name:"Pro",    price:"$29", period:"/mo", desc:"For creators & professionals", hl:true,  badge:"MOST POPULAR", features:["1,000 credits/month","4K output","All models","Cinema Studio 3.5","Priority queue","API access"]},
    {name:"Ultra",  price:"$79", period:"/mo", desc:"For studios & power users",    hl:false, features:["5,000 credits/month","Unlimited 4K","All models + early access","Dedicated queue","White-label","Team seats (5)"]},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:BG}}>
      <div style={{textAlign:"center",padding:"72px 48px 48px"}}>
        <div style={{display:"inline-block",background:`${M}15`,border:`1px solid ${M}40`,borderRadius:20,padding:"4px 14px",fontSize:11,color:ML,marginBottom:20,fontWeight:700,letterSpacing:.5}}>🎉 30% OFF — Limited Time</div>
        <h1 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:900,letterSpacing:-2.5,marginBottom:10}}>Simple, transparent pricing</h1>
        <p style={{color:T3,fontSize:15}}>Scale from hobbyist to studio. Cancel anytime.</p>
      </div>
      <div style={{display:"flex",gap:18,justifyContent:"center",flexWrap:"wrap",padding:"0 40px 80px",maxWidth:1000,margin:"0 auto"}}>
        {plans.map(plan=>(
          <div key={plan.name} style={{background:plan.hl?`linear-gradient(160deg,${M}10,${MD}08)`:S1,border:`1px solid ${plan.hl?M:B1}`,borderRadius:14,padding:"30px 26px",flex:1,minWidth:240,maxWidth:300,position:"relative",boxShadow:plan.hl?`0 0 40px ${M}20`:"none"}}>
            {(plan as {badge?:string}).badge&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:M,color:"#fff",fontSize:9,fontWeight:800,letterSpacing:1,padding:"3px 12px",borderRadius:10}}>{(plan as {badge?:string}).badge}</div>}
            <div style={{color:T3,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6}}>{plan.name}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:2,marginBottom:4}}>
              <span style={{color:T1,fontSize:38,fontWeight:900,letterSpacing:-1.5}}>{plan.price}</span>
              <span style={{color:T3,fontSize:12}}>{plan.period}</span>
            </div>
            <div style={{color:T3,fontSize:12,marginBottom:22}}>{plan.desc}</div>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:26}}>
              {plan.features.map(f=>(
                <div key={f} style={{display:"flex",gap:9,alignItems:"flex-start"}}>
                  <span style={{color:M,fontSize:11,marginTop:1,flexShrink:0}}>✓</span>
                  <span style={{color:T2,fontSize:12}}>{f}</span>
                </div>
              ))}
            </div>
            <button className={plan.hl?"bm":"bg"} style={{width:"100%",padding:"11px"}}>{plan.price==="Free"?"Get Started":`Upgrade to ${plan.name}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── IMAGE STUDIO ─────────────────────────────────────────────────────────────
function ImagePage() {
  const [prompt,setPrompt] = useState("");
  const [model,setModel]   = useState("Nano Visual Pro");
  const [loading,setLoading] = useState(false);
  const [imgs,setImgs]     = useState<number[]>([]);
  const ibgs = ["linear-gradient(135deg,#0d0019,#3a0060)","linear-gradient(135deg,#000d1a,#003060)","linear-gradient(135deg,#190000,#500010)","linear-gradient(135deg,#001900,#005020)"];
  const gen = async () => { if(!prompt.trim())return; setLoading(true); setImgs([]); await new Promise(r=>setTimeout(r,1800)); setLoading(false); setImgs([1,2,3,4]); };
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:BG}}>
      <aside style={{width:180,flexShrink:0,borderRight:`1px solid ${B1}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:4,background:BG}}>
        <Lbl s="Tools"/>
        <div style={{height:8}}/>
        {["Text in Image","Inpaint","Relight","Face Swap","Upscale","Product Image"].map(t=><button key={t} className="sb">{t}</button>)}
      </aside>
      <div style={{flex:1,padding:"28px 36px",overflow:"auto"}}>
        <h2 style={{color:T1,fontSize:20,fontWeight:900,letterSpacing:-.5,marginBottom:20}}>Image Studio</h2>
        <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:1,minWidth:240}}><textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe the image you want to create…" rows={2} style={{resize:"none"}}/></div>
          <Sel label="Model" opts={IMG_M} val={model} set={setModel}/>
          <button className="bm" onClick={gen} disabled={loading} style={{padding:"10px 24px"}}>{loading?"Generating…":"Generate"}</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {loading&&Array.from({length:4}).map((_,i)=><div key={i} className="sk" style={{aspectRatio:"1",borderRadius:10,animationDelay:`${i*.12}s`}}/>)}
          {imgs.map((_,i)=><div key={i} style={{aspectRatio:"1",background:ibgs[i],borderRadius:10,border:`1px solid ${B1}`,cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Lumenfield() {
  const [page,setPage] = useState<Page>("explore");
  const pages: Record<Page, ReactNode> = {
    explore:       <ExplorePage     go={setPage}/>,
    cinema:        <CinemaPage/>,
    audio:         <AudioPage/>,
    image:         <ImagePage/>,
    video:         <CinemaPage/>,
    marketing:     <MarketingPage/>,
    influencer:    <InfluencerPage/>,
    canvas:        <CanvasPage/>,
    apps:          <AppsPage        go={setPage}/>,
    library:       <LibraryPage     go={setPage}/>,
    login:         <LoginPage       go={setPage}/>,
    pricing:       <PricingPage/>,
    mcp:           <McpPage/>,
    collab:        <CollabPage/>,
    supercomputer: <SuperPage/>,
    plugins:       <PluginsPage/>,
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <Nav cur={page} go={setPage}/>
      <main>{pages[page]}</main>
    </>
  );
}


