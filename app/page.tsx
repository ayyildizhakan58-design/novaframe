"use client";
import { useState, useEffect } from "react";

const C = {
  bg:"#050505", surface:"#0f0f0f", surface2:"#161616",
  border:"#1f1f1f", border2:"#2a2a2a",
  text:"#ffffff", text2:"#a0a0a0", text3:"#555555",
  magenta:"#e8006f", magentaL:"#ff4da6", magentaD:"#9c004a",
} as const;

type Page = "explore"|"cinema"|"audio"|"image"|"marketing"|"influencer"|"canvas"|"apps"|"library"|"login"|"pricing"|"mcp"|"collab"|"supercomputer"|"plugins";
type Mega = "image"|"video"|"audio"|null;

const IMG_FEATURES = ["Create Image","Cinematic Cameras","Moodboard","Soul ID","AI Influencer","Photodump","Relight","Inpaint","Image Upscale","Face Swap","Character Swap","Draw to Edit","Fashion Factory"];
const IMG_MODELS   = ["Nano Visual Pro","GPT Image 2","Recraft V4.1","Nano Banana Pro","Seedream 5.0","FluxFrame 2","Reve Studio","Z-Image","Topaz Upscale"];
const VID_FEATURES = ["Create Video","Cinema Studio","Mixed Media","Edit Video","Click to Ad","Trend Generator","Lipsync Studio","Draw to Video","Sketch to Video","UGC Factory","Video Upscale","Animate","Vibe Motion","Recast Studio"];
const VID_MODELS   = ["Seedance 2.0","Kling Motion 3.0","Kling O1 Edit","Sora 2","Google Veo 3.1","HappyHorse","Grok Imagine 1.5","WanFrame 2.7","Minimax Hailuo","DOP Camera Model"];
const AUD_FEATURES = ["Voiceover","Change Voice","Translation","Text to Speech","Audio Localization","Lipsync Audio"];
const AUD_MODELS   = ["Eleven v3","MiniMax Speech 2.8 HD","Seed Speech","VibeVoice","Calm Narrator","Studio Voice Pro"];

const CINEMA_MODELS = [
  { name:"Cinema Studio 3.5", tag:"NEW",       desc:"AI director · camera selection · style presets", group:"Cinematic" },
  { name:"Cinema Studio 3.0", tag:"",          desc:"Enhanced camera and speed ramp control",          group:"Cinematic" },
  { name:"Cinema Studio 2.5", tag:"",          desc:"Camera movements with start frame",               group:"Cinematic" },
  { name:"Seedance 2.0",      tag:"NEW",       desc:"720p · 4s–15s · ByteDance",                      group:"Featured"  },
  { name:"Seedance 2.0 Fast", tag:"NEW",       desc:"720p · fast render · ByteDance",                 group:"Featured"  },
  { name:"Kling 3.0",         tag:"EXCLUSIVE", desc:"4K · 3s–15s · Kuaishou",                         group:"Featured"  },
  { name:"Kling 3.0 MC",      tag:"",          desc:"1080p · motion control · 3s–30s",                group:"Featured"  },
  { name:"HappyHorse",        tag:"NEW",       desc:"1080p · 3s–15s",                                 group:"Featured"  },
];

const PRESETS      = ["BASEBALL GAME","DRIFT RACING","CGI BREAKDOWN","STORM GIANT","ZOMBIE DANCE","RED CARPET","NEON CITY","OFFICE CCTV","DRAGON FANTASY","CLOUD SURF","ON FIRE","MUKBANG"];
const LOAD_STEPS   = ["Analyzing prompt…","Selecting model…","Composing camera motion…","Rendering preview…"];

const UGC_TYPES    = ["UGC","Product Demo","Founder Story","Testimonial","Unboxing","Problem / Solution","Luxury Ad","Meme Ad","Stop Scrolling","Before / After","Storytelling","Shock Factor"];
const HOOKS        = ["Strong Hook","Question Hook","Pain Point","Before / After","Shocking Claim","Social Proof","Fast Benefit","Stop Scrolling","Problem Solution","Review","Unboxing"];
const SETTINGS_AD  = ["Home","Studio","Street","Office","Gym","Luxury Apartment","Store","Outdoor","Car","Beach","Bedroom","Kitchen","Luxury Studio","Restaurant"];
const AVATARS_AD   = ["Male","Female","Influencer","Fitness Coach","Business Owner","Tech Reviewer","Beauty Creator"];
const PLATFORMS    = ["TikTok","Instagram","YouTube","Facebook"];
const VOICES_AD    = ["Calm & Clear","Energetic","Professional","Friendly","Authoritative","Warm"];
const CTA_OPTIONS  = ["Shop Now","Learn More","Get Started","Order Today","Try for Free","Book a Call","Download Now"];
const AI_ENGINES   = ["Google Gemini 2.5","OpenAI GPT-4.1","Seedance 2.0","Kling 3.0","Veo 3.1","Runway Gen-4"];

const CHAR_TYPES   = ["Human","Ant","Bee","Octopus","Crocodile","Iguana","Alien","Beetle","Elf","Mantis"];
const GENDERS      = ["Female","Male","Trans man","Trans woman","Non-binary"];
const ETHNICITIES  = ["African","Asian","European","Indian","Middle Eastern","Mixed"];
const SKIN_COLS    = ["black","dark brown","white","purple","tan","olive","grey","green","metallic","iridescent"];
const EYE_COLS     = ["Black","Purple","Green","White","Brown","Deep Brown","Blue","Amber","Red","Grey"];

const APPS: Record<string,{name:string;desc:string;icon:string}[]> = {
  Professional:        [{name:"Virality Predictor",desc:"Predict viral potential",icon:"📊"},{name:"Similarity Score",desc:"Visual likeness comparison",icon:"🔍"},{name:"Expand Image",desc:"AI outpainting",icon:"↔"},{name:"Angles 2.0",desc:"Multi-angle shot gen",icon:"📐"},{name:"Shots",desc:"Cinematic shot composer",icon:"🎬"}],
  "Enhance & Style":   [{name:"Skin Enhancer",desc:"AI skin retouching",icon:"✨"},{name:"AI Stylist",desc:"Fashion recommendations",icon:"👗"},{name:"Relight",desc:"Professional lighting adj.",icon:"💡"},{name:"Outfit Swap",desc:"Virtual outfit replacement",icon:"🔄"},{name:"Style Snap",desc:"Snap & style any look",icon:"📸"}],
  "Face & Identity":   [{name:"Face Swap",desc:"Seamless face replacement",icon:"🎭"},{name:"Headshot Gen",desc:"Pro headshots in seconds",icon:"🖼"},{name:"Character Swap",desc:"Full character replacement",icon:"🔀"},{name:"Recast",desc:"Recast any scene character",icon:"🎬"},{name:"Video Face Swap",desc:"Face swap across video",icon:"📹"}],
  "Ads & Products":    [{name:"Click to Ad",desc:"URL to video ad",icon:"🎯"},{name:"Billboard Ad",desc:"Outdoor billboard creator",icon:"🏙"},{name:"Bullet Time",desc:"Matrix-style bullet time",icon:"⚡"},{name:"Truck Ad",desc:"Moving vehicle ad creator",icon:"🚛"},{name:"UGC Factory",desc:"User-generated content gen",icon:"📱"}],
  "Games & Characters":[{name:"Game Dump",desc:"Game-style scene gen",icon:"🎮"},{name:"Nano Strike",desc:"Action sequence creator",icon:"⚔"},{name:"Nano Theft",desc:"Heist cinematic gen",icon:"🎰"},{name:"Simlife",desc:"Life simulation content",icon:"🌍"},{name:"Plushies",desc:"Cute character creator",icon:"🧸"}],
};

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#050505;color:#fff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#050505}
::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
button,input,textarea,select{font-family:inherit}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.8}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(232,0,111,.3)}50%{box-shadow:0 0 50px rgba(232,0,111,.7)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes progressFill{from{width:0}to{width:100%}}
.fade-up{animation:fadeUp .5s ease both}
.fade-in{animation:fadeIn .3s ease both}
.btn-m{background:#e8006f;color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:.3px;transition:all .2s}
.btn-m:hover{background:#ff4da6;transform:translateY(-1px);box-shadow:0 8px 28px rgba(232,0,111,.4)}
.btn-m:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}
.btn-g{background:transparent;color:#a0a0a0;border:1px solid #2a2a2a;border-radius:8px;padding:11px 24px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s}
.btn-g:hover{border-color:#555;color:#fff}
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
.tag-n{background:rgba(16,185,129,.15);color:#10b981;border:1px solid rgba(16,185,129,.3);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.tag-x{background:rgba(232,0,111,.15);color:#ff4da6;border:1px solid rgba(232,0,111,.3);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.mkt-chip{display:inline-flex;align-items:center;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:6px;padding:6px 12px;font-size:11px;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap;font-weight:500}
.mkt-chip:hover,.mkt-chip.on{border-color:#e8006f;color:#ff4da6;background:rgba(232,0,111,.08)}
.platform-chip{display:flex;align-items:center;gap:6px;background:#0d0d0d;border:1px solid #1f1f1f;border-radius:8px;padding:8px 14px;font-size:12px;color:#888;cursor:pointer;transition:all .15s;font-weight:600}
.platform-chip:hover,.platform-chip.on{border-color:#e8006f;color:#fff;background:rgba(232,0,111,.1)}
`;

const Lbl = ({s}:{s:string}) => <span style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:1}}>{s}</span>;
const Hr  = () => <div style={{height:1,background:C.border,margin:"6px 0"}}/>;

function UZ({label,h=80}:{label:string;h?:number}) {
  const [hov,setHov] = useState(false);
  return (
    <div className="uz" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{height:h,flex:1,minWidth:100}}>
      <div style={{fontSize:20,color:hov?C.magenta:C.text3}}>+</div>
      <span style={{fontSize:10,color:hov?C.magentaL:C.text3,fontWeight:500}}>{label}</span>
    </div>
  );
}

function Sel({label,options,value,onChange}:{label:string;options:string[];value:string;onChange:(v:string)=>void}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:4}}>
      <Lbl s={label}/>
      <select className="sel" value={value} onChange={e=>onChange(e.target.value)}>
        {options.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Logo({size=28}:{size?:number}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:size,height:size,borderRadius:7,background:`linear-gradient(135deg,${C.magenta},${C.magentaD})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:size*0.5,color:"#fff",letterSpacing:-1,flexShrink:0}}>L</div>
      <span style={{color:C.text,fontWeight:800,fontSize:size*0.5,letterSpacing:-.5,lineHeight:1}}>Lumen<span style={{color:C.magenta}}>field</span></span>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({cur,setPage}:{cur:Page;setPage:(p:Page)=>void}) {
  const [mega,setMega] = useState<Mega>(null);

  const items = [
    {l:"Explore",        p:"explore"      as Page},
    {l:"Image",          m:"image"        as Mega},
    {l:"Video",          m:"video"        as Mega},
    {l:"Audio",          m:"audio"        as Mega},
    {l:"Supercomputer",  p:"supercomputer"as Page, badge:"NEW"},
    {l:"MCP & CLI",      p:"mcp"          as Page, badge:"NEW"},
    {l:"Collab",         p:"collab"       as Page},
    {l:"Plugins",        p:"plugins"      as Page, badge:"NEW"},
    {l:"Marketing Studio",p:"marketing"  as Page},
    {l:"Cinema Studio",  p:"cinema"       as Page},
    {l:"AI Influencer",  p:"influencer"   as Page},
    {l:"Canvas",         p:"canvas"       as Page},
    {l:"Apps",           p:"apps"         as Page},
    {l:"Pricing",        p:"pricing"      as Page, badge:"30% OFF"},
  ];

  const megaSrc = {
    image: {features:IMG_FEATURES, models:IMG_MODELS},
    video: {features:VID_FEATURES, models:VID_MODELS},
    audio: {features:AUD_FEATURES, models:AUD_MODELS},
  };

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:900,background:"rgba(5,5,5,.95)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,height:57,display:"flex",alignItems:"center",padding:"0 20px",gap:4}} onMouseLeave={()=>setMega(null)}>
      <button onClick={()=>{setPage("explore");setMega(null);}} style={{background:"none",border:"none",cursor:"pointer",marginRight:16,flexShrink:0}}>
        <Logo/>
      </button>
      <div style={{display:"flex",alignItems:"center",gap:2,flex:1,overflowX:"auto"}}>
        {items.map(item=>(
          <button key={item.l}
            className={`nl${item.p===cur?" on":""}`}
            onMouseEnter={()=>setMega((item as {m?:Mega}).m??null)}
            onClick={()=>{if(item.p){setPage(item.p);setMega(null);}}}
          >
            {item.l}
            {(item as {badge?:string}).badge&&(
              <span style={{background:item.l==="Pricing"?C.magenta:"#10b981",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:4,letterSpacing:.8,textTransform:"uppercase"}}>
                {(item as {badge?:string}).badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexShrink:0}}>
        <button onClick={()=>setPage("login")} className="btn-g" style={{padding:"7px 16px",fontSize:12}}>Log in</button>
        <button onClick={()=>setPage("login")} className="btn-m" style={{padding:"7px 16px",fontSize:12}}>Sign up</button>
      </div>
      {mega && (() => {
        const src = megaSrc[mega];
        return (
          <div style={{position:"absolute",top:57,left:0,right:0,background:"rgba(5,5,5,.98)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,padding:"28px 48px",display:"flex",gap:64,zIndex:1000,animation:"fadeIn .15s ease"}}>
            <div>
              <Lbl s="Features"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px 28px",marginTop:12}}>
                {src.features.map(f=>(
                  <button key={f} style={{background:"none",border:"none",color:C.text2,fontSize:12,textAlign:"left",padding:"4px 0",cursor:"pointer",transition:"color .12s"}} onMouseEnter={e=>(e.currentTarget.style.color=C.magentaL)} onMouseLeave={e=>(e.currentTarget.style.color=C.text2)}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{width:1,background:C.border,flexShrink:0}}/>
            <div>
              <Lbl s="Models"/>
              <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:12}}>
                {src.models.map(m=>(
                  <button key={m} style={{background:"none",border:"none",color:C.text2,fontSize:12,textAlign:"left",padding:"4px 0",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"color .12s"}} onMouseEnter={e=>(e.currentTarget.style.color=C.text)} onMouseLeave={e=>(e.currentTarget.style.color=C.text2)}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:C.magenta,flexShrink:0}}/>
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

// ─── EXPLORE PAGE ─────────────────────────────────────────────────────────────
function ExplorePage({setPage}:{setPage:(p:Page)=>void}) {
  const [tick,setTick] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(x=>x+1),2600);return()=>clearInterval(t);},[]);
  const words = ["image","video","audio","ads","characters","content"];
  const featured = [
    {name:"Cinema Studio 3.5",desc:"AI director · camera control",icon:"🎥",p:"cinema" as Page,a:C.magenta},
    {name:"Seedance 2.0",desc:"720p cinematic video",icon:"⚡",p:"cinema" as Page,a:"#6366f1"},
    {name:"Marketing Studio",desc:"Product ads in seconds",icon:"📱",p:"marketing" as Page,a:C.magenta},
    {name:"AI Influencer",desc:"Build virtual creators",icon:"🤖",p:"influencer" as Page,a:"#10b981"},
    {name:"Nano Visual Pro",desc:"Photorealistic images",icon:"🎨",p:"image" as Page,a:"#f59e0b"},
    {name:"Audio Studio",desc:"Voices in 30+ languages",icon:"🎙",p:"audio" as Page,a:"#06b6d4"},
    {name:"Canvas",desc:"AI visual workspace",icon:"🖼",p:"canvas" as Page,a:"#8b5cf6"},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg,overflowX:"hidden"}}>
      <section style={{position:"relative",padding:"100px 48px 80px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.magenta},transparent)`,animation:"scanline 7s linear infinite",opacity:.35}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,backgroundSize:"48px 48px",opacity:.2,maskImage:"radial-gradient(ellipse 80% 60% at 50% 50%,black,transparent)"}}/>
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:350,background:`radial-gradient(ellipse,rgba(232,0,111,.1),transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"clamp(80px,16vw,220px)",fontWeight:900,color:"transparent",WebkitTextStroke:`1px ${C.border2}`,letterSpacing:-8,lineHeight:1,userSelect:"none",pointerEvents:"none",whiteSpace:"nowrap"}}>LUMEN</div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${C.border2}`,borderRadius:20,padding:"5px 14px",fontSize:11,color:C.text3,background:C.surface,marginBottom:32}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:C.magenta,animation:"pulse 2s ease-in-out infinite"}}/>
            The AI Creative Command Center
          </div>
          <h1 style={{fontSize:"clamp(38px,6vw,82px)",fontWeight:900,color:C.text,letterSpacing:-3,lineHeight:1.02,marginBottom:20,maxWidth:820,margin:"0 auto 20px"}}>
            Create stunning{" "}
            <span style={{color:C.magenta,display:"inline-block",minWidth:180,transition:"all .3s"}}>{words[tick%words.length]}</span>
            <br/>with one command.
          </h1>
          <p style={{color:C.text2,fontSize:16,maxWidth:480,margin:"0 auto 36px",lineHeight:1.65}}>All models. All modalities. One platform built for creators who move fast.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-m" onClick={()=>setPage("cinema")} style={{padding:"14px 34px",fontSize:14,animation:"glow 3s ease-in-out infinite"}}>Launch Studio →</button>
            <button className="btn-g" onClick={()=>setPage("apps")} style={{padding:"14px 34px",fontSize:14}}>Explore Apps</button>
          </div>
          <div style={{display:"flex",gap:48,justifyContent:"center",marginTop:56,flexWrap:"wrap"}}>
            {[["2M+","Creators"],["50+","AI Models"],["10B+","Frames rendered"],["99.9%","Uptime"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:24,fontWeight:800,color:C.text,letterSpacing:-1}}>{n}</div>
                <div style={{fontSize:11,color:C.text3,marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"0 48px 64px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <Lbl s="Featured Tools"/>
          <button className="btn-g" onClick={()=>setPage("apps")} style={{padding:"5px 14px",fontSize:11}}>View all →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(168px,1fr))",gap:10}}>
          {featured.map(f=>(
            <button key={f.name} onClick={()=>setPage(f.p)} className="card" style={{padding:"20px 16px",textAlign:"left",cursor:"pointer",background:C.surface,border:`1px solid ${C.border}`}} onMouseEnter={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.borderColor=f.a;el.style.background=`${f.a}08`;}} onMouseLeave={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.borderColor=C.border;el.style.background=C.surface;}}>
              <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
              <div style={{color:C.text,fontSize:12,fontWeight:700,marginBottom:4}}>{f.name}</div>
              <div style={{color:C.text3,fontSize:11}}>{f.desc}</div>
            </button>
          ))}
        </div>
      </section>
      <section style={{padding:"0 48px 80px",maxWidth:1280,margin:"0 auto"}}>
        <Lbl s="Viral Presets"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginTop:16}}>
          {PRESETS.map(p=>(
            <button key={p} onClick={()=>setPage("cinema")} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 10px",color:C.text3,fontSize:10,fontWeight:800,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.background=`${C.magenta}10`;el.style.color=C.magentaL;el.style.borderColor=`${C.magenta}50`;}} onMouseLeave={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.background=C.surface;el.style.color=C.text3;el.style.borderColor=C.border;}}>{p}</button>
          ))}
        </div>
      </section>
      <section style={{margin:"0 48px 80px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"52px",textAlign:"center",position:"relative",overflow:"hidden",maxWidth:1184,marginLeft:"auto",marginRight:"auto"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.magenta},transparent)`}}/>
        <h2 style={{fontSize:"clamp(22px,3vw,42px)",fontWeight:800,letterSpacing:-1.5,marginBottom:12}}>Ready to generate the impossible?</h2>
        <p style={{color:C.text2,fontSize:14,marginBottom:28}}>Join 2 million creators. No credit card required.</p>
        <button className="btn-m" onClick={()=>setPage("login")} style={{padding:"14px 36px",fontSize:14}}>Start for free →</button>
      </section>
    </div>
  );
}

// ─── CINEMA STUDIO PAGE ───────────────────────────────────────────────────────
function CinemaPage() {
  const [prompt,setPrompt]       = useState("");
  const [model,setModel]         = useState("Cinema Studio 3.5");
  const [modelOpen,setModelOpen] = useState(false);
  const [aspect,setAspect]       = useState("16:9");
  const [res,setRes]             = useState("1080p");
  const [dur,setDur]             = useState("8s");
  const [cam,setCam]             = useState("Dolly In");
  const [speed,setSpeed]         = useState("Auto");
  const [loading,setLoading]     = useState(false);
  const [step,setStep]           = useState(0);
  const [results,setResults]     = useState<number[]>([]);
  const [mode,setMode]           = useState<"image"|"video">("video");

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResults([]); setStep(0);
    for (let i=0;i<LOAD_STEPS.length;i++) { await new Promise(r=>setTimeout(r,750)); setStep(i+1); }
    await new Promise(r=>setTimeout(r,300));
    setLoading(false); setResults([1,2,3]);
  };

  const bgs = ["linear-gradient(135deg,#0d0019,#1a003a,#0d0019)","linear-gradient(135deg,#000d1a,#001f3f,#000d1a)","linear-gradient(135deg,#190000,#3a0018,#190000)"];

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:C.bg}}>
      {/* Sidebar */}
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${C.border}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,background:C.bg}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",marginBottom:4}}>
          <Logo size={20}/>
        </div>
        <div style={{padding:"4px 10px 8px",fontSize:10,color:C.magenta,fontWeight:700,letterSpacing:.5}}>Cinema Studio</div>
        <Hr/>
        {["Home","My Elements","My Favorites","Community Feed","Projects"].map(s=><button key={s} className="sb">{s}</button>)}
        <div style={{flex:1}}/>
        <Hr/>
        <button className="btn-m" style={{fontSize:11,padding:"8px 12px",marginBottom:6}}>+ New Project</button>
        <button style={{background:"none",border:`1px solid ${C.border2}`,borderRadius:7,color:C.text3,fontSize:10,padding:"7px 12px",cursor:"pointer"}}>💎 Pricing — 30% OFF</button>
      </aside>

      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Workspace */}
        <div style={{flex:1,background:C.bg,backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,backgroundSize:"40px 40px",display:"flex",alignItems:"center",justifyContent:"center",padding:40,overflow:"auto",position:"relative"}}>
          {!loading && results.length===0 && (
            <div style={{textAlign:"center"}} className="fade-up">
              <div style={{fontSize:"clamp(18px,4vw,52px)",fontWeight:900,color:C.border2,letterSpacing:-2,lineHeight:1,marginBottom:4,WebkitTextStroke:`1px ${C.border}`}}>CREATE YOUR FIRST PROJECT.</div>
              <div style={{fontSize:"clamp(18px,4vw,52px)",fontWeight:900,background:`linear-gradient(90deg,${C.magenta},${C.magentaL})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-2,lineHeight:1}}>GENERATE THE IMPOSSIBLE.</div>
              <p style={{color:C.text3,fontSize:13,marginTop:16}}>Type a prompt below and click Generate →</p>
            </div>
          )}
          {loading && (
            <div style={{textAlign:"center",width:280}} className="fade-in">
              <div style={{marginBottom:24}}>
                {LOAD_STEPS.map((s,i)=>(
                  <div key={s} style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:12,color:i<step?C.text2:C.border2,fontSize:13,transition:"color .3s"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",border:`1.5px solid ${i<step?C.magenta:C.border2}`,background:i<step?C.magenta:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",transition:"all .3s",flexShrink:0}}>{i<step?"✓":""}</div>
                    {s}
                  </div>
                ))}
              </div>
              <div style={{height:2,background:C.border,borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",background:`linear-gradient(90deg,${C.magenta},${C.magentaL})`,borderRadius:2,width:`${(step/LOAD_STEPS.length)*100}%`,transition:"width .6s ease"}}/>
              </div>
            </div>
          )}
          {results.length>0 && (
            <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}} className="fade-in">
              {results.map((_,i)=>(
                <div key={i} style={{width:240,height:152,background:bgs[i],borderRadius:10,border:`1px solid ${C.border}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.6),transparent)"}}/>
                  <button style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",background:"rgba(232,0,111,.8)",border:"none",color:"#fff",fontSize:13,cursor:"pointer"}}>▶</button>
                  <div style={{position:"absolute",bottom:10,left:12}}>
                    <div style={{color:C.text,fontSize:10,fontWeight:700}}>{model}</div>
                    <div style={{color:C.text3,fontSize:9}}>{aspect} · {dur} · {res}</div>
                  </div>
                  <div style={{position:"absolute",top:10,right:10,background:C.magenta,color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4}}>NEW</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,padding:"14px 16px"}}>
          <div style={{display:"flex",gap:0,marginBottom:12,background:C.bg,borderRadius:7,padding:3,width:"fit-content",border:`1px solid ${C.border}`}}>
            {(["image","video"] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{background:mode===m?C.surface2:"none",border:"none",color:mode===m?C.text:C.text3,padding:"5px 16px",borderRadius:5,fontSize:12,cursor:"pointer",fontWeight:mode===m?700:400,textTransform:"capitalize",transition:"all .15s"}}>{m}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:1,minWidth:240}}>
              <textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your scene — a futuristic city at dusk, golden hour, slow dolly in…" rows={2} style={{resize:"none",lineHeight:1.5}}/>
            </div>
            <div style={{position:"relative"}}>
              <button onClick={()=>setModelOpen(!modelOpen)} style={{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,padding:"9px 12px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontWeight:600,transition:"border-color .15s"}} onMouseEnter={e=>(e.currentTarget.style.borderColor=C.magenta)} onMouseLeave={e=>(e.currentTarget.style.borderColor=C.border)}>
                <span style={{width:6,height:6,borderRadius:"50%",background:C.magenta}}/>
                {model.length>20?model.slice(0,18)+"…":model}
                <span style={{color:C.text3,fontSize:9}}>▾</span>
              </button>
              {modelOpen && (
                <div style={{position:"absolute",bottom:"110%",left:0,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,width:300,zIndex:200,boxShadow:"0 24px 64px rgba(0,0,0,.8)",overflow:"hidden"}}>
                  {["Cinematic","Featured"].map(group=>(
                    <div key={group}>
                      <div style={{padding:"10px 14px 4px",fontSize:9,color:C.text3,textTransform:"uppercase",letterSpacing:1,borderTop:group==="Featured"?`1px solid ${C.border}`:"none",marginTop:group==="Featured"?4:0}}>{group}</div>
                      {CINEMA_MODELS.filter(m=>m.group===group).map(m=>(
                        <button key={m.name} onClick={()=>{setModel(m.name);setModelOpen(false);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",background:"none",border:"none",padding:"9px 14px",cursor:"pointer",textAlign:"left",transition:"background .12s"}} onMouseEnter={e=>(e.currentTarget.style.background=C.surface2)} onMouseLeave={e=>(e.currentTarget.style.background="none")}>
                          <div>
                            <div style={{color:C.text,fontSize:12,fontWeight:600}}>{m.name}</div>
                            <div style={{color:C.text3,fontSize:10,marginTop:1}}>{m.desc}</div>
                          </div>
                          {m.tag&&<span className={m.tag==="NEW"?"tag-n":"tag-x"}>{m.tag}</span>}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Sel label="Aspect"   options={["16:9","9:16","1:1","4:5"]} value={aspect} onChange={setAspect}/>
            <Sel label="Res"      options={["720p","1080p","4K"]}       value={res}    onChange={setRes}/>
            <Sel label="Duration" options={["4s","8s","12s","15s"]}     value={dur}    onChange={setDur}/>
            <Sel label="Camera"   options={["Dolly In","Orbit","Push In","Crane","Handheld","Static"]} value={cam} onChange={setCam}/>
            <Sel label="Speed"    options={["Auto","Slow","Medium","Fast"]} value={speed} onChange={setSpeed}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:10,alignItems:"stretch",flexWrap:"wrap"}}>
            <UZ label="Start Frame" h={52}/>
            <UZ label="End Frame"   h={52}/>
            <div style={{flex:1}}/>
            <button className="btn-m" onClick={generate} disabled={loading} style={{padding:"0 36px",minWidth:130,animation:!loading&&results.length===0?"glow 2.5s ease-in-out infinite":"none"}}>{loading?"Generating…":"Generate →"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AUDIO STUDIO ─────────────────────────────────────────────────────────────
function AudioPage() {
  const [audioMode,setAudioMode]   = useState("Voiceover");
  const [audioModel,setAudioModel] = useState("Eleven v3");
  const [text,setText]             = useState("");
  const [loading,setLoading]       = useState(false);
  const [waveform,setWaveform]     = useState<number[]>([]);
  const models = [
    {name:"Eleven v3",            desc:"Expressive AI voice · emotion control"},
    {name:"MiniMax Speech 2.8 HD",desc:"Studio-quality text-to-speech"},
    {name:"Seed Speech",          desc:"ByteDance multilingual voice"},
    {name:"VibeVoice",            desc:"Long-form expressive synthesis"},
    {name:"Calm Narrator",        desc:"Smooth narration & audiobook"},
    {name:"Studio Voice Pro",     desc:"Broadcast-grade synthesis"},
  ];
  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,2200));
    setLoading(false);
    setWaveform(Array.from({length:52},()=>Math.random()*80+10));
  };
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:C.bg}}>
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${C.border}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:4,background:C.bg}}>
        {["My Generations","Narration Project","Ad Voiceover","Demo Reel"].map(p=><button key={p} className="sb">{p}</button>)}
        <div style={{flex:1}}/>
        <button className="btn-m" style={{width:"100%",fontSize:11,padding:"8px 12px"}}>+ New Project</button>
      </aside>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,backgroundImage:`radial-gradient(ellipse 50% 40% at 50% 50%,rgba(232,0,111,.05),transparent)`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:80,left:0,right:0,display:"flex",justifyContent:"center",gap:2,opacity:.04}}>
            {Array.from({length:100},(_,i)=><div key={i} style={{width:2,borderRadius:2,height:`${30+Math.sin(i*.35)*40+Math.random()*20}px`,background:C.magenta}}/>)}
          </div>
          <div style={{textAlign:"center",zIndex:1}} className="fade-up">
            <Lbl s="Audio Studio"/>
            <h1 style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:900,letterSpacing:-2,marginBottom:10,marginTop:12,lineHeight:1.05}}>Ready to give your<br/>scene a voice?</h1>
            <p style={{color:C.text3,fontSize:13}}>Type your script · select a voice · generate</p>
          </div>
          {waveform.length>0 && (
            <div className="fade-in" style={{marginTop:36,background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px",display:"flex",gap:2,alignItems:"center",zIndex:1}}>
              <button style={{width:34,height:34,borderRadius:"50%",background:C.magenta,border:"none",color:"#fff",fontSize:13,cursor:"pointer",flexShrink:0,marginRight:10}}>▶</button>
              {waveform.map((h,i)=><div key={i} style={{width:2.5,borderRadius:2,height:`${h*.6}px`,background:`linear-gradient(to top,${C.magenta},${C.magentaL})`,transition:"height .3s"}}/>)}
              <span style={{color:C.text3,fontSize:10,marginLeft:10,flexShrink:0}}>0:0{Math.ceil(text.split(" ").length/2.5)} · {audioModel}</span>
            </div>
          )}
        </div>
        <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,padding:"16px 20px",display:"flex",gap:14,alignItems:"flex-end",flexWrap:"wrap"}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Lbl s="Mode"/>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {["Voiceover","Change Voice","Translate"].map(m=>(
                <button key={m} onClick={()=>setAudioMode(m)} style={{background:audioMode===m?`${C.magenta}18`:C.surface2,border:`1px solid ${audioMode===m?C.magenta:C.border}`,color:audioMode===m?C.magentaL:C.text3,borderRadius:7,padding:"6px 12px",fontSize:11,cursor:"pointer",fontWeight:audioMode===m?700:400,transition:"all .15s"}}>{m}</button>
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
                <button key={m.name} onClick={()=>setAudioModel(m.name)} style={{background:audioModel===m.name?`${C.magenta}12`:"transparent",border:`1px solid ${audioModel===m.name?C.magenta:C.border}`,borderRadius:7,padding:"6px 10px",textAlign:"left",cursor:"pointer",transition:"all .15s"}}>
                  <div style={{color:audioModel===m.name?C.magentaL:C.text,fontSize:11,fontWeight:600}}>{m.name}</div>
                  <div style={{color:C.text3,fontSize:9,marginTop:1}}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <button className="btn-m" onClick={generate} disabled={loading} style={{padding:"12px 28px",alignSelf:"flex-end"}}>{loading?"Generating…":"Generate Voice"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── MARKETING STUDIO (ENHANCED) ─────────────────────────────────────────────
function MarketingPage() {
  const [prompt,setPrompt]       = useState("");
  const [productUrl,setProductUrl] = useState("");
  const [productName,setProductName] = useState("");
  const [ugc,setUgc]             = useState("UGC");
  const [hook,setHook]           = useState("Strong Hook");
  const [setting,setSetting]     = useState("Home");
  const [avatar,setAvatar]       = useState("Female");
  const [voice,setVoice]         = useState("Calm & Clear");
  const [cta,setCta]             = useState("Shop Now");
  const [aiEngine,setAiEngine]   = useState("Seedance 2.0");
  const [platforms,setPlatforms] = useState<string[]>(["TikTok"]);
  const [tab,setTab]             = useState<"product"|"app">("product");
  const [loading,setLoading]     = useState(false);
  const [results,setResults]     = useState<number[]>([]);
  const [urlLoading,setUrlLoading] = useState(false);
  const [activeSection,setActiveSection] = useState("compose");

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p]);
  };

  const fetchProductUrl = async () => {
    if (!productUrl.trim()) return;
    setUrlLoading(true);
    await new Promise(r=>setTimeout(r,1500));
    setUrlLoading(false);
    setProductName("Premium Fitness Tracker Pro");
    setPrompt("A professional fitness influencer unboxes the Premium Fitness Tracker Pro, highlighting its sleek design and health features.");
  };

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResults([]);
    await new Promise(r=>setTimeout(r,3000));
    setLoading(false); setResults([1,2,3]);
  };

  const adBgs = [
    `linear-gradient(160deg,${C.magentaD},${C.magenta},#ff6bb5)`,
    "linear-gradient(160deg,#1a0030,#4a0080,#8000ff)",
    "linear-gradient(160deg,#001a30,#003f80,#0080ff)",
  ];

  const platformIcons: Record<string,string> = {TikTok:"🎵",Instagram:"📸",YouTube:"▶️",Facebook:"👤"};

  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:C.bg}}>
      {/* Sidebar */}
      <aside style={{width:200,flexShrink:0,borderRight:`1px solid ${C.border}`,padding:"16px 10px",display:"flex",flexDirection:"column",gap:2,background:C.bg}}>
        <div style={{fontSize:12,color:C.text,fontWeight:700,padding:"6px 10px",marginBottom:4}}>Marketing Studio</div>
        <div style={{padding:"2px 10px 8px",fontSize:10,color:C.magenta,fontWeight:600}}>Product Ad Generator</div>
        <Hr/>
        {[
          {l:"Compose",   k:"compose"},
          {l:"My Projects",k:"projects"},
          {l:"URL to Ad",  k:"url"},
          {l:"Ad Reference",k:"ref"},
          {l:"All Generations",k:"gens"},
        ].map(s=>(
          <button key={s.k} className={`sb${activeSection===s.k?" active":""}`} onClick={()=>setActiveSection(s.k)} style={{color:activeSection===s.k?C.text:undefined}}>{s.l}</button>
        ))}
        <div style={{flex:1}}/>
        <Hr/>
        <button className="btn-m" style={{width:"100%",marginTop:8,fontSize:11,padding:"8px 12px"}}>+ New Project</button>
      </aside>

      {/* Main */}
      <div style={{flex:1,overflow:"auto"}}>
        {/* Hero strip */}
        <div style={{padding:"28px 40px 24px",borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.magenta},transparent)`}}/>
          <div style={{position:"absolute",top:0,right:0,width:400,height:"100%",background:`radial-gradient(ellipse at right,${C.magenta}06,transparent)`}}/>
          <Lbl s="Lumenfield Marketing Studio"/>
          <h1 style={{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,letterSpacing:-1.5,marginTop:8,lineHeight:1.05}}>
            TURN ANY PRODUCT INTO A VIDEO AD
          </h1>
          <p style={{color:C.text3,fontSize:13,marginTop:6}}>Upload product · choose style · get 9:16 ads in seconds</p>

          {/* Tab */}
          <div style={{display:"flex",gap:0,marginTop:16,background:C.bg,borderRadius:7,padding:3,width:"fit-content",border:`1px solid ${C.border}`}}>
            {(["product","app"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?C.surface2:"none",border:"none",color:tab===t?C.text:C.text3,padding:"5px 18px",borderRadius:5,fontSize:12,cursor:"pointer",textTransform:"capitalize",fontWeight:tab===t?700:400,transition:"all .15s"}}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{padding:"24px 40px",maxWidth:920}}>

          {/* Product URL */}
          <div style={{marginBottom:18}}>
            <Lbl s="Product URL (optional — auto-fills product info)"/>
            <div style={{display:"flex",gap:8,marginTop:6}}>
              <input
                className="inp"
                value={productUrl}
                onChange={e=>setProductUrl(e.target.value)}
                placeholder="https://yourstore.com/product/..."
                style={{flex:1}}
              />
              <button onClick={fetchProductUrl} disabled={urlLoading} style={{background:C.surface2,border:`1px solid ${C.border}`,color:urlLoading?C.text3:C.magentaL,borderRadius:8,padding:"0 16px",fontSize:12,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap",transition:"all .15s"}}>
                {urlLoading?"Fetching…":"Fetch →"}
              </button>
            </div>
            {productName && (
              <div style={{marginTop:6,padding:"6px 10px",background:`${C.magenta}10`,border:`1px solid ${C.magenta}30`,borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:C.magenta,fontSize:11}}>✓</span>
                <span style={{color:C.text2,fontSize:11}}>Fetched: <strong style={{color:C.text}}>{productName}</strong></span>
              </div>
            )}
          </div>

          {/* Ad prompt */}
          <div style={{marginBottom:16}}>
            <Lbl s="Ad Description"/>
            <textarea
              className="inp"
              value={prompt}
              onChange={e=>setPrompt(e.target.value)}
              placeholder="Describe what happens in the ad — the hook, the demo, the story…"
              rows={3}
              style={{resize:"none",marginTop:6,lineHeight:1.5}}
            />
          </div>

          {/* Row 1: UGC + Hook + Setting */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:16}}>
            <Sel label="Ad Type (UGC)"  options={UGC_TYPES}   value={ugc}     onChange={setUgc}/>
            <Sel label="Hook Style"     options={HOOKS}       value={hook}    onChange={setHook}/>
            <Sel label="Setting"        options={SETTINGS_AD} value={setting} onChange={setSetting}/>
            <Sel label="Avatar"         options={AVATARS_AD}  value={avatar}  onChange={setAvatar}/>
            <Sel label="Voice"          options={VOICES_AD}   value={voice}   onChange={setVoice}/>
            <Sel label="CTA"            options={CTA_OPTIONS} value={cta}     onChange={setCta}/>
          </div>

          {/* AI Engine */}
          <div style={{marginBottom:16}}>
            <Lbl s="AI Engine"/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
              {AI_ENGINES.map(e=>(
                <button key={e} className={`mkt-chip${aiEngine===e?" on":""}`} onClick={()=>setAiEngine(e)}>{e}</button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div style={{marginBottom:16}}>
            <Lbl s="Platform"/>
            <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
              {PLATFORMS.map(p=>(
                <button key={p} className={`platform-chip${platforms.includes(p)?" on":""}`} onClick={()=>togglePlatform(p)}>
                  <span>{platformIcons[p]}</span>
                  {p}
                  {platforms.includes(p)&&<span style={{color:C.magenta,fontSize:10}}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Upload + Generate */}
          <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"stretch"}}>
            <UZ label="Product / Image" h={60}/>
            <UZ label="Avatar / Influencer" h={60}/>
            <div style={{flex:1}}/>
            <button className="btn-m" onClick={generate} disabled={loading} style={{padding:"0 32px",minHeight:48,fontSize:13,animation:!loading&&results.length===0?"glow 2.5s ease-in-out infinite":"none"}}>
              {loading?"Generating Ad…":"Generate Ad →"}
            </button>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div style={{display:"flex",gap:12}}>
              {[1,2,3].map(i=><div key={i} className="sk" style={{width:150,height:266,borderRadius:12,animationDelay:`${i*.15}s`}}/>)}
            </div>
          )}

          {/* Results */}
          {results.length>0 && (
            <div className="fade-in">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <Lbl s={`${results.length} ads generated · ${platforms.join(", ")}`}/>
                <button className="btn-g" style={{padding:"5px 14px",fontSize:11}}>Export All</button>
              </div>
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                {results.map((_,i)=>(
                  <div key={i} style={{width:150,height:266,borderRadius:12,background:adBgs[i],border:`1px solid ${C.border2}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.03)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
                    <button style={{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,.2)",border:"none",color:"#fff",fontSize:14,cursor:"pointer"}}>▶</button>
                    <div style={{position:"absolute",top:8,left:8}}>
                      <span style={{background:"rgba(0,0,0,.6)",color:"#fff",fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4,backdropFilter:"blur(4px)"}}>{platforms[i%platforms.length]||"TikTok"}</span>
                    </div>
                    <div style={{position:"absolute",bottom:10,left:10}}>
                      <div style={{color:"#fff",fontSize:10,fontWeight:700}}>{ugc}</div>
                      <div style={{color:"rgba(255,255,255,.5)",fontSize:9}}>{hook} · 9:16 · 15s</div>
                      <div style={{color:"rgba(255,255,255,.4)",fontSize:9}}>{avatar} · {voice}</div>
                    </div>
                    <div style={{position:"absolute",bottom:10,right:8,display:"flex",gap:4}}>
                      <button style={{width:24,height:24,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"#fff",fontSize:10,cursor:"pointer"}}>↓</button>
                      <button style={{width:24,height:24,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"#fff",fontSize:10,cursor:"pointer"}}>↗</button>
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

// ─── MCP & CLI PAGE ───────────────────────────────────────────────────────────
function McpPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg}}>
      <div style={{padding:"80px 48px",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${C.border2}`,borderRadius:20,padding:"5px 14px",fontSize:11,color:C.text3,background:C.surface,marginBottom:28}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/>
          Developer Tools
        </div>
        <h1 style={{fontSize:"clamp(32px,5vw,64px)",fontWeight:900,letterSpacing:-2.5,lineHeight:1.05,marginBottom:16}}>
          MCP & CLI<br/>
          <span style={{color:C.magenta}}>for developers.</span>
        </h1>
        <p style={{color:C.text2,fontSize:16,lineHeight:1.7,marginBottom:40,maxWidth:560}}>
          Integrate Lumenfield directly into your workflow. Use our Model Context Protocol server or CLI to automate creative production at scale.
        </p>

        {/* Install */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 24px",marginBottom:16,fontFamily:"monospace"}}>
          <div style={{fontSize:10,color:C.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Install CLI</div>
          <div style={{color:"#10b981",fontSize:14}}>$ npm install -g @lumenfield/cli</div>
          <div style={{color:C.text3,fontSize:14,marginTop:6}}>$ lumenfield login</div>
          <div style={{color:C.text3,fontSize:14,marginTop:6}}>$ lumenfield generate --model seedance-2 --prompt &quot;cinematic sunset&quot;</div>
        </div>

        {/* MCP */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 24px",marginBottom:32,fontFamily:"monospace"}}>
          <div style={{fontSize:10,color:C.text3,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>MCP Server Config</div>
          <div style={{color:"#f59e0b",fontSize:13}}>{"{"}</div>
          <div style={{color:C.text2,fontSize:13,paddingLeft:20}}>&quot;mcpServers&quot;: {"{"}</div>
          <div style={{color:C.text2,fontSize:13,paddingLeft:40}}>&quot;lumenfield&quot;: {"{"}</div>
          <div style={{color:"#10b981",fontSize:13,paddingLeft:60}}>&quot;command&quot;: &quot;npx&quot;,</div>
          <div style={{color:"#10b981",fontSize:13,paddingLeft:60}}>&quot;args&quot;: [&quot;@lumenfield/mcp&quot;]</div>
          <div style={{color:C.text2,fontSize:13,paddingLeft:40}}>{"}"}</div>
          <div style={{color:C.text2,fontSize:13,paddingLeft:20}}>{"}"}</div>
          <div style={{color:"#f59e0b",fontSize:13}}>{"}"}</div>
        </div>

        {/* Features grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
          {[
            {icon:"⚡",title:"Fast API",desc:"Sub-second response times"},
            {icon:"🔧",title:"Full SDK",desc:"TypeScript & Python support"},
            {icon:"🔄",title:"Webhooks",desc:"Real-time job status updates"},
            {icon:"📦",title:"Batch Jobs",desc:"Process thousands at once"},
            {icon:"🔐",title:"Secure",desc:"API key authentication"},
            {icon:"📊",title:"Analytics",desc:"Usage & cost tracking"},
          ].map(f=>(
            <div key={f.title} className="card" style={{padding:"18px 16px"}}>
              <div style={{fontSize:24,marginBottom:8}}>{f.icon}</div>
              <div style={{color:C.text,fontSize:12,fontWeight:700,marginBottom:3}}>{f.title}</div>
              <div style={{color:C.text3,fontSize:11}}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{marginTop:32,display:"flex",gap:12}}>
          <button className="btn-m" style={{padding:"12px 28px"}}>Get API Key →</button>
          <button className="btn-g" style={{padding:"12px 28px"}}>View Docs</button>
        </div>
      </div>
    </div>
  );
}

// ─── COLLAB PAGE ──────────────────────────────────────────────────────────────
function CollabPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg}}>
      <div style={{padding:"80px 48px",maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:20}}>🤝</div>
        <h1 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:900,letterSpacing:-2,marginBottom:16}}>
          Create together.<br/><span style={{color:C.magenta}}>In real time.</span>
        </h1>
        <p style={{color:C.text2,fontSize:16,lineHeight:1.7,marginBottom:40,maxWidth:500,margin:"0 auto 40px"}}>
          Invite your team, share projects, leave comments, and collaborate on AI-generated content — all in one workspace.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,maxWidth:700,margin:"0 auto 40px"}}>
          {[
            {icon:"👥",title:"Team Workspace",desc:"Shared projects & assets"},
            {icon:"💬",title:"Comments",desc:"Leave feedback on any frame"},
            {icon:"🔗",title:"Share Links",desc:"One-click shareable URLs"},
            {icon:"📋",title:"Review Mode",desc:"Approve or request changes"},
            {icon:"🏷",title:"Version History",desc:"Track every iteration"},
            {icon:"🔔",title:"Notifications",desc:"Stay in the loop"},
          ].map(f=>(
            <div key={f.title} className="card" style={{padding:"18px 16px",textAlign:"left"}}>
              <div style={{fontSize:22,marginBottom:8}}>{f.icon}</div>
              <div style={{color:C.text,fontSize:12,fontWeight:700,marginBottom:3}}>{f.title}</div>
              <div style={{color:C.text3,fontSize:11}}>{f.desc}</div>
            </div>
          ))}
        </div>
        <button className="btn-m" style={{padding:"13px 32px",fontSize:14}}>Invite Team →</button>
      </div>
    </div>
  );
}

// ─── SUPERCOMPUTER PAGE ───────────────────────────────────────────────────────
function SupercomputerPage() {
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
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg}}>
      <div style={{background:`linear-gradient(160deg,rgba(204,255,0,.04),transparent)`,borderBottom:`1px solid ${C.border}`,padding:"60px 48px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(204,255,0,.1)",border:"1px solid rgba(204,255,0,.3)",borderRadius:20,padding:"4px 14px",fontSize:11,color:"#ccff00",marginBottom:20,fontWeight:700,letterSpacing:.5}}>⚡ NEW</div>
        <h1 style={{fontSize:"clamp(28px,5vw,60px)",fontWeight:900,letterSpacing:-2,marginBottom:12}}>SUPERCOMPUTER<br/><span style={{color:"#ccff00"}}>FOR CREATIVE WORK</span></h1>
        <p style={{color:C.text2,fontSize:16,marginBottom:36,maxWidth:480,margin:"0 auto 36px",lineHeight:1.6}}>Turn a simple conversation into production-ready content at scale.</p>

        <div style={{maxWidth:640,margin:"0 auto"}}>
          <textarea
            className="inp"
            value={prompt}
            onChange={e=>setPrompt(e.target.value)}
            placeholder="Create a TikTok ad for my fitness product with an AI influencer…"
            rows={3}
            style={{resize:"none",lineHeight:1.5,marginBottom:12,fontSize:14,border:`1px solid rgba(204,255,0,.2)`}}
          />
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
            {["Ask","Create","Research","Build"].map(a=>(
              <button key={a} style={{background:C.surface2,border:`1px solid ${C.border}`,color:C.text2,borderRadius:8,padding:"7px 18px",fontSize:12,cursor:"pointer",fontWeight:600,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#ccff00";e.currentTarget.style.color="#ccff00";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.text2;}}>{a}</button>
            ))}
          </div>
          <button onClick={run} disabled={loading} style={{background:"#ccff00",color:"#000",border:"none",borderRadius:10,padding:"13px 40px",fontSize:14,fontWeight:900,cursor:loading?"not-allowed":"pointer",opacity:loading?.6:1,transition:"all .2s"}}>
            {loading?"Processing…":"Run Supercomputer →"}
          </button>
          {result&&<div className="fade-in" style={{marginTop:14,padding:"10px 16px",background:"rgba(204,255,0,.08)",border:"1px solid rgba(204,255,0,.2)",borderRadius:8,color:"#ccff00",fontSize:12,fontWeight:600}}>{result}</div>}
        </div>
      </div>

      <div style={{padding:"48px",maxWidth:1200,margin:"0 auto"}}>
        <Lbl s="What can the Supercomputer do?"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginTop:16}}>
          {["Video Ads","Product Photography","UGC Videos","AI Influencers","Fashion Campaigns","Voice Generation","Storyboards","Marketing Automation"].map(item=>(
            <div key={item} className="card" style={{padding:"20px 16px",textAlign:"center",cursor:"pointer"}} onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="#ccff00";}} onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.border;}}>
              <div style={{color:C.text,fontSize:12,fontWeight:700}}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PLUGINS PAGE ─────────────────────────────────────────────────────────────
function PluginsPage() {
  const [activePlugin,setActivePlugin] = useState("Premiere Pro");
  const plugins = ["Premiere Pro","After Effects","DaVinci Resolve","Figma","Photoshop"];
  const features = ["Generate AI Video","Generate AI Image","Reframe","Remove Background","Draw to Edit","Upscale"];

  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg}}>
      {/* Hero */}
      <div style={{padding:"60px 48px 40px",borderBottom:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${C.magenta},transparent)`}}/>
        <Lbl s="Plugins"/>
        <h1 style={{fontSize:"clamp(24px,4vw,52px)",fontWeight:900,letterSpacing:-1.5,marginTop:10,lineHeight:1.05}}>
          Lumenfield is now inside<br/><span style={{color:C.magenta}}>{activePlugin}</span>
        </h1>
        <p style={{color:C.text2,fontSize:15,marginTop:12,maxWidth:520,lineHeight:1.65}}>
          Generate, edit, reframe, upscale and remove backgrounds directly inside your {activePlugin} timeline.
        </p>
        <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
          <button className="btn-m" style={{padding:"11px 24px"}}>⬇ Download for macOS</button>
          <button className="btn-g" style={{padding:"11px 24px"}}>⬇ Download for Windows</button>
        </div>
      </div>

      {/* Plugin tabs */}
      <div style={{borderBottom:`1px solid ${C.border}`,padding:"0 48px",display:"flex",gap:4,overflowX:"auto"}}>
        {plugins.map(p=>(
          <button key={p} onClick={()=>setActivePlugin(p)} style={{background:"none",border:"none",color:activePlugin===p?C.text:C.text3,fontSize:13,padding:"14px 16px",cursor:"pointer",borderBottom:`2px solid ${activePlugin===p?C.magenta:"transparent"}`,fontWeight:activePlugin===p?700:400,transition:"all .15s",whiteSpace:"nowrap"}}>{p}</button>
        ))}
      </div>

      <div style={{padding:"40px 48px",maxWidth:1100,margin:"0 auto"}}>
        {/* Steps */}
        <div style={{marginBottom:40}}>
          <Lbl s="Setup — 3 steps"/>
          <div style={{display:"flex",gap:12,marginTop:16,flexWrap:"wrap"}}>
            {[
              {n:"1",t:"Download the installer",d:"Get the .dmg or .exe from the button above"},
              {n:"2",t:"Run the installer",d:"Follow the on-screen instructions"},
              {n:"3",t:`Open ${activePlugin}`,d:"Find Lumenfield under Window → Extensions"},
            ].map(s=>(
              <div key={s.n} style={{flex:1,minWidth:180,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"18px 16px"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:C.magenta,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",marginBottom:10}}>{s.n}</div>
                <div style={{color:C.text,fontSize:12,fontWeight:700,marginBottom:4}}>{s.t}</div>
                <div style={{color:C.text3,fontSize:11}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{marginBottom:40}}>
          <Lbl s="Features"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginTop:16}}>
            {features.map(f=>(
              <div key={f} className="card" style={{padding:"16px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:C.magenta,fontSize:14}}>✓</span>
                <span style={{color:C.text,fontSize:12,fontWeight:600}}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility */}
        <div style={{marginBottom:40}}>
          <Lbl s="Compatibility"/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
            {["Adobe Premiere Pro 2024+","Adobe After Effects 2024+","macOS Apple Silicon / Intel","Windows 10 / 11 64-bit"].map(c=>(
              <div key={c} style={{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 12px",fontSize:11,color:C.text2}}>{c}</div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <Lbl s="FAQ"/>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:16}}>
            {[
              ["How do I install it on macOS?","Download the .dmg file, open it, and drag Lumenfield to your Applications folder. Then restart Premiere Pro."],
              ["How do I install it on Windows?","Run the .exe installer as administrator and follow the prompts. Restart your Adobe application after installation."],
              ["Which Adobe versions are supported?","Adobe Premiere Pro 2024 and later, and Adobe After Effects 2024 and later."],
              ["Do I need an internet connection?","Yes, Lumenfield requires an internet connection for AI generation."],
              ["Do I need a Lumenfield subscription?","Yes, you need an active Lumenfield account with credits to use the plugin."],
            ].map(([q,a])=>(
              <div key={q} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
                <div style={{color:C.text,fontSize:12,fontWeight:700,marginBottom:6}}>{q}</div>
                <div style={{color:C.text3,fontSize:11,lineHeight:1.6}}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI INFLUENCER ────────────────────────────────────────────────────────────
function InfluencerPage() {
  const [sel,setSel] = useState<Record<string,string>>({char:"Human",gender:"Female",eth:"African",skin:"dark brown",eyes:"Brown",age:"Adult"});
  const [loading,setLoading] = useState(false);
  const [done,setDone] = useState(false);
  const up = (k:string,v:string) => setSel(s=>({...s,[k]:v}));
  const generate = async () => { setLoading(true); await new Promise(r=>setTimeout(r,2400)); setLoading(false); setDone(true); };
  const Grid = ({label,field,opts}:{label:string;field:string;opts:string[]}) => (
    <div style={{marginBottom:18}}>
      <div style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{label}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {opts.map(o=><button key={o} onClick={()=>up(field,o)} style={{background:sel[field]===o?`${C.magenta}18`:C.surface2,border:`1px solid ${sel[field]===o?C.magenta:C.border}`,color:sel[field]===o?C.magentaL:C.text3,borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer",transition:"all .12s"}}>{o}</button>)}
      </div>
    </div>
  );
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:C.bg}}>
      <aside style={{width:160,flexShrink:0,borderRight:`1px solid ${C.border}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:6,background:C.bg}}>
        <Lbl s="My Influencers"/>
        <div style={{height:8}}/>
        {["Aurora V","Kai X","Nova One","Zara M"].map(n=>(
          <div key={n} style={{background:C.surface,borderRadius:8,padding:8,border:`1px solid ${C.border}`,cursor:"pointer"}}>
            <div style={{width:"100%",aspectRatio:"1",borderRadius:6,background:C.surface2,marginBottom:5}}/>
            <div style={{color:C.text3,fontSize:10,textAlign:"center"}}>{n}</div>
          </div>
        ))}
        <button style={{background:"none",border:`1px dashed ${C.border2}`,color:C.text3,borderRadius:8,padding:"8px",fontSize:10,cursor:"pointer",marginTop:4,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.magenta;e.currentTarget.style.color=C.magentaL;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border2;e.currentTarget.style.color=C.text3;}}>+ Create New</button>
      </aside>
      <div style={{width:268,flexShrink:0,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20,background:`radial-gradient(ellipse at center,${C.magenta}04,transparent)`}}>
        <div style={{width:196,height:256,borderRadius:16,background:done?`linear-gradient(160deg,#0d0019,#1a003a,#0d0019)`:C.surface,border:`1px solid ${done?C.magenta:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",transition:"all .4s"}}>
          {loading&&<div style={{textAlign:"center"}}><div style={{width:28,height:28,border:`2px solid ${C.magenta}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 8px"}}/><div style={{color:C.text3,fontSize:11}}>Generating…</div></div>}
          {done&&!loading&&<><div style={{width:72,height:92,borderRadius:36,background:`linear-gradient(160deg,${C.magenta},${C.magentaL})`,position:"absolute",top:"18%"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(to top,#0d0019,transparent)"}}/><div style={{position:"absolute",bottom:14,color:C.text,fontSize:11,textAlign:"center"}}><div style={{fontWeight:700}}>Lumenfield Character</div><div style={{color:C.text3,fontSize:9}}>{sel.char} · {sel.gender}</div></div></>}
          {!done&&!loading&&<div style={{color:C.text3,fontSize:11,textAlign:"center"}}>Preview<br/>appears here</div>}
        </div>
        <button className="btn-m" onClick={generate} disabled={loading} style={{marginTop:16,width:"100%",padding:"11px",animation:!loading&&!done?"glow 2.5s ease-in-out infinite":"none"}}>{loading?"Generating…":done?"Regenerate →":"Generate Influencer →"}</button>
      </div>
      <div style={{flex:1,overflow:"auto",padding:"24px 28px"}}>
        <h2 style={{color:C.text,fontSize:15,fontWeight:800,marginBottom:20,letterSpacing:-.3}}>Build Your AI Influencer</h2>
        <Grid label="Character Type" field="char" opts={CHAR_TYPES}/>
        <Grid label="Gender" field="gender" opts={GENDERS}/>
        <Grid label="Ethnicity" field="eth" opts={ETHNICITIES}/>
        <Grid label="Skin Color" field="skin" opts={SKIN_COLS}/>
        <Grid label="Eye Color" field="eyes" opts={EYE_COLS}/>
        <Grid label="Age" field="age" opts={["Adult","Mature","Senior"]}/>
      </div>
    </div>
  );
}

// ─── CANVAS ───────────────────────────────────────────────────────────────────
function CanvasPage() {
  const [created,setCreated] = useState(false);
  return (
    <div style={{height:"100vh",paddingTop:57,background:"#020202",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#1a2a4a 1px,transparent 1px)",backgroundSize:"28px 28px",opacity:.4}}/>
      {[{top:"15%",left:"8%",w:130,h:88,bg:"linear-gradient(135deg,#0d1a2e,#1e3a5f)"},{top:"22%",right:"10%",w:110,h:70,bg:`linear-gradient(135deg,${C.magentaD},#1a003a)`},{top:"62%",left:"6%",w:100,h:76,bg:"linear-gradient(135deg,#0a1a28,#1a3a4f)"},{top:"70%",right:"14%",w:90,h:60,bg:"linear-gradient(135deg,#1a0d00,#3a1a00)"}].map((c,i)=>(
        <div key={i} style={{position:"absolute",top:c.top,left:c.left as string|undefined,right:c.right as string|undefined,width:c.w,height:c.h,background:c.bg,borderRadius:10,border:`1px solid ${C.border}`,opacity:.65}}/>
      ))}
      <div style={{position:"absolute",top:"18%",right:"22%",background:"#fff",color:"#111",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>That&apos;s stunning! 🎉</div>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",zIndex:10}}>
        <div style={{border:`2px solid ${C.magenta}40`,borderRadius:14,padding:"22px 36px",background:"rgba(5,5,5,.9)",backdropFilter:"blur(10px)",marginBottom:20}}>
          <div style={{fontSize:"clamp(12px,2vw,18px)",fontWeight:900,color:C.magenta,letterSpacing:.5}}>GENERATE STUNNING MEDIA WITH AI CANVAS</div>
        </div>
        {!created?<div style={{background:"rgba(10,10,10,.96)",border:`1px solid ${C.border}`,borderRadius:14,padding:"28px 44px",backdropFilter:"blur(8px)"}}>
          <div style={{fontSize:32,marginBottom:10}}>🖼</div>
          <div style={{color:C.text,fontSize:14,fontWeight:700,marginBottom:5}}>No Boards Yet</div>
          <div style={{color:C.text3,fontSize:12,marginBottom:20}}>Make images, videos, and ideas in one place</div>
          <button className="btn-m" onClick={()=>setCreated(true)}>Create Canvas</button>
        </div>:<div style={{color:C.magenta,fontSize:14,fontWeight:700}}>✓ Canvas created!</div>}
      </div>
      <div style={{position:"absolute",bottom:72,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8}}>
        {["Long Video","Seedance 2.0","Extend Video","Storyboard","Product Board","Character Builder"].map(t=>(
          <div key={t} style={{background:"rgba(10,10,10,.88)",border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 12px",fontSize:10,color:"#3a7abf",cursor:"pointer",whiteSpace:"nowrap",backdropFilter:"blur(8px)",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.magenta;e.currentTarget.style.color=C.magentaL;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color="#3a7abf;";}}>{t}</div>
        ))}
      </div>
      <div style={{position:"absolute",bottom:20,right:20,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 24px rgba(0,0,0,.6)"}}>
        <div><div style={{color:"#f59e0b",fontSize:11,fontWeight:700}}>Credits running low!</div><div style={{color:C.text3,fontSize:10}}>Over 90% already used</div></div>
        <button className="btn-m" style={{padding:"6px 14px",fontSize:11}}>Upgrade</button>
      </div>
    </div>
  );
}

// ─── APPS ─────────────────────────────────────────────────────────────────────
function AppsPage({setPage}:{setPage:(p:Page)=>void}) {
  const cats = Object.keys(APPS);
  const [cat,setCat] = useState("Professional");
  const acc:Record<string,string>={Professional:"#6366f1","Enhance & Style":"#10b981","Face & Identity":C.magenta,"Ads & Products":"#f59e0b","Games & Characters":"#8b5cf6"};
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg}}>
      <div style={{padding:"32px 40px 0"}}>
        <h1 style={{color:C.text,fontSize:26,fontWeight:900,letterSpacing:-1,marginBottom:6}}>AI Apps</h1>
        <p style={{color:C.text3,fontSize:13,marginBottom:24}}>Creative tools powered by the latest models.</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:32,paddingBottom:20,borderBottom:`1px solid ${C.border}`}}>
          {["All",...cats].map(c=><button key={c} className={`chip${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
      </div>
      <div style={{padding:"0 40px 60px"}}>
        {(cat==="All"?cats:[cat]).map(group=>(
          <div key={group} style={{marginBottom:36}}>
            {cat==="All"&&<div style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>{group}</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10}}>
              {(APPS[group]??[]).map(app=>(
                <div key={app.name} className="card" style={{padding:0,overflow:"hidden"}}>
                  <div style={{height:90,background:`${acc[group]||C.magenta}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,borderBottom:`1px solid ${C.border}`}}>{app.icon}</div>
                  <div style={{padding:"12px 14px"}}>
                    <div style={{display:"inline-block",fontSize:8,color:acc[group]||C.magenta,border:`1px solid ${acc[group]||C.magenta}40`,borderRadius:4,padding:"1px 6px",marginBottom:5,textTransform:"uppercase"}}>{group}</div>
                    <div style={{color:C.text,fontSize:12,fontWeight:700,marginBottom:3}}>{app.name}</div>
                    <div style={{color:C.text3,fontSize:11,marginBottom:10}}>{app.desc}</div>
                    <button onClick={()=>setPage("cinema")} style={{width:"100%",background:`${acc[group]||C.magenta}12`,border:`1px solid ${acc[group]||C.magenta}40`,color:acc[group]||C.magenta,borderRadius:6,padding:"6px 0",fontSize:11,cursor:"pointer",fontWeight:700,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.background=acc[group]||C.magenta;e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background=`${acc[group]||C.magenta}12`;e.currentTarget.style.color=acc[group]||C.magenta;}}>Try Now →</button>
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

// ─── LIBRARY ──────────────────────────────────────────────────────────────────
function LibraryPage({setPage}:{setPage:(p:Page)=>void}) {
  const filters=["Image","Video","Audio","Marketing Studio","Characters","Lipsync","Canvas Boards"];
  const [f,setF]=useState("Video");
  const [view,setView]=useState<"grid"|"list">("grid");
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg,padding:"72px 40px 40px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:10}}>
        <h1 style={{color:C.text,fontSize:22,fontWeight:900,letterSpacing:-.5}}>My Library</h1>
        <div style={{display:"flex",gap:6}}>
          {(["grid","list"] as const).map(v=><button key={v} onClick={()=>setView(v)} style={{background:view===v?C.surface2:"transparent",border:`1px solid ${C.border}`,color:view===v?C.text:C.text3,borderRadius:6,padding:"6px 12px",fontSize:11,cursor:"pointer"}}>{v==="grid"?"⊞":"≡"} {v}</button>)}
        </div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:36}}>
        {filters.map(x=><button key={x} className={`chip${f===x?" on":""}`} onClick={()=>setF(x)}>{x}</button>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 0",textAlign:"center"}}>
        <div style={{fontSize:48,opacity:.1,marginBottom:16}}>🎬</div>
        <div style={{color:C.text2,fontSize:16,fontWeight:700,marginBottom:6}}>Your creations will appear here.</div>
        <div style={{color:C.text3,fontSize:13,marginBottom:28}}>Let&apos;s make magic ✨</div>
        <button className="btn-m" onClick={()=>setPage("cinema")} style={{padding:"12px 28px"}}>Start Generating →</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({setPage}:{setPage:(p:Page)=>void}) {
  const tabs=["Nano Visual Pro","Kling 3.0","Lumenfield Soul","Cinema App","SeedMotion 2.0","VeoStyle 3.1"];
  const [tab,setTab]=useState(0);
  const bgs=[`linear-gradient(160deg,#1a0030,${C.magentaD},#0d0019)`,"linear-gradient(160deg,#001020,#003060,#001020)","linear-gradient(160deg,#200010,#600030,#200010)","linear-gradient(160deg,#001020,#002040,#001020)","linear-gradient(160deg,#102000,#205000,#102000)","linear-gradient(160deg,#001020,#003030,#001020)"];
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:C.bg}}>
      <div style={{width:"42%",minWidth:340,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 56px",borderRight:`1px solid ${C.border}`}}>
        <div style={{marginBottom:36}}><Logo size={32}/></div>
        <h1 style={{color:C.text,fontSize:26,fontWeight:900,letterSpacing:-1,marginBottom:6}}>Welcome back</h1>
        <p style={{color:C.text3,fontSize:13,marginBottom:28,lineHeight:1.5}}>Sign in to access your studio, generations, and projects.</p>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {[{icon:"G",label:"Continue with Google",bg:"#fff",fg:"#1a1a1a",border:"#e0e0e0"},{icon:"⌘",label:"Continue with Apple",bg:"#111",fg:"#fff",border:C.border2},{icon:"M",label:"Continue with Microsoft",bg:"#0078d4",fg:"#fff",border:"#0078d4"},{icon:"✉",label:"Continue with Email",bg:C.surface,fg:C.text2,border:C.border2}].map(b=>(
            <button key={b.label} style={{background:b.bg,border:`1px solid ${b.border}`,color:b.fg,borderRadius:9,padding:"11px 18px",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:12,fontWeight:600,transition:"opacity .15s"}} onMouseEnter={e=>(e.currentTarget.style.opacity=".85")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
              <span style={{fontSize:15,width:18,textAlign:"center"}}>{b.icon}</span>{b.label}
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"20px 0"}}>
          <div style={{flex:1,height:1,background:C.border}}/>
          <span style={{color:C.text3,fontSize:11}}>or SSO</span>
          <div style={{flex:1,height:1,background:C.border}}/>
        </div>
        <p style={{color:C.text3,fontSize:10,lineHeight:1.7}}>By continuing you agree to our Terms of Service and Privacy Policy. Lumenfield is an original, independently built platform.</p>
      </div>
      <div style={{flex:1,background:bgs[tab],position:"relative",transition:"background .5s ease",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 60%)"}}/>
        <div style={{position:"absolute",top:"38%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",userSelect:"none"}}>
          <div style={{fontSize:"clamp(60px,10vw,140px)",fontWeight:900,color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,.06)",letterSpacing:-6}}>LUMEN</div>
        </div>
        <div style={{position:"absolute",bottom:28,left:0,right:0,display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap",padding:"0 16px"}}>
          {tabs.map((t,i)=><button key={t} onClick={()=>setTab(i)} style={{background:tab===i?C.magenta:"rgba(255,255,255,.1)",border:`1px solid ${tab===i?C.magenta:"rgba(255,255,255,.2)"}`,color:"#fff",borderRadius:20,padding:"5px 14px",fontSize:11,cursor:"pointer",fontWeight:tab===i?700:400,backdropFilter:"blur(8px)",transition:"all .2s"}}>{t}</button>)}
        </div>
      </div>
    </div>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function PricingPage() {
  const plans=[
    {name:"Starter",price:"Free",period:"",desc:"Explore Lumenfield",highlight:false,features:["50 credits/month","720p output","Standard models","Community access"]},
    {name:"Pro",price:"$29",period:"/mo",desc:"For creators & professionals",highlight:true,badge:"MOST POPULAR",features:["1,000 credits/month","4K output","All models","Cinema Studio 3.5","Priority queue","API access"]},
    {name:"Ultra",price:"$79",period:"/mo",desc:"For studios & power users",highlight:false,features:["5,000 credits/month","Unlimited 4K","All models + early access","Dedicated queue","White-label","Team seats (5)"]},
  ];
  return (
    <div style={{minHeight:"100vh",paddingTop:57,background:C.bg}}>
      <div style={{textAlign:"center",padding:"72px 48px 48px"}}>
        <div style={{display:"inline-block",background:`${C.magenta}15`,border:`1px solid ${C.magenta}40`,borderRadius:20,padding:"4px 14px",fontSize:11,color:C.magentaL,marginBottom:20,fontWeight:700,letterSpacing:.5}}>🎉 30% OFF — Limited Time</div>
        <h1 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:900,letterSpacing:-2.5,marginBottom:10}}>Simple, transparent pricing</h1>
        <p style={{color:C.text3,fontSize:15}}>Scale from hobbyist to studio. Cancel anytime.</p>
      </div>
      <div style={{display:"flex",gap:18,justifyContent:"center",flexWrap:"wrap",padding:"0 40px 80px",maxWidth:1000,margin:"0 auto"}}>
        {plans.map(plan=>(
          <div key={plan.name} style={{background:plan.highlight?`linear-gradient(160deg,${C.magenta}10,${C.magentaD}08)`:C.surface,border:`1px solid ${plan.highlight?C.magenta:C.border}`,borderRadius:14,padding:"30px 26px",flex:1,minWidth:240,maxWidth:300,position:"relative",boxShadow:plan.highlight?`0 0 40px ${C.magenta}20`:"none"}}>
            {(plan as {badge?:string}).badge&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:C.magenta,color:"#fff",fontSize:9,fontWeight:800,letterSpacing:1,padding:"3px 12px",borderRadius:10}}>{(plan as {badge?:string}).badge}</div>}
            <div style={{color:C.text3,fontSize:10,textTransform:"uppercase",letterSpacing:1.2,marginBottom:6}}>{plan.name}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:2,marginBottom:4}}>
              <span style={{color:C.text,fontSize:38,fontWeight:900,letterSpacing:-1.5}}>{plan.price}</span>
              <span style={{color:C.text3,fontSize:12}}>{plan.period}</span>
            </div>
            <div style={{color:C.text3,fontSize:12,marginBottom:22}}>{plan.desc}</div>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:26}}>
              {plan.features.map(f=>(
                <div key={f} style={{display:"flex",gap:9,alignItems:"flex-start"}}>
                  <span style={{color:C.magenta,fontSize:11,marginTop:1,flexShrink:0}}>✓</span>
                  <span style={{color:C.text2,fontSize:12}}>{f}</span>
                </div>
              ))}
            </div>
            <button className={plan.highlight?"btn-m":"btn-g"} style={{width:"100%",padding:"11px"}}>{plan.price==="Free"?"Get Started":`Upgrade to ${plan.name}`}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── IMAGE STUDIO ─────────────────────────────────────────────────────────────
function ImagePage() {
  const [prompt,setPrompt]=useState("");
  const [model,setModel]=useState("Nano Visual Pro");
  const [loading,setLoading]=useState(false);
  const [imgs,setImgs]=useState<number[]>([]);
  const imgBgs=["linear-gradient(135deg,#0d0019,#3a0060,#0d0019)","linear-gradient(135deg,#000d1a,#003060,#000d1a)","linear-gradient(135deg,#190000,#500010,#190000)","linear-gradient(135deg,#001900,#005020,#001900)"];
  const generate=async()=>{if(!prompt.trim())return;setLoading(true);setImgs([]);await new Promise(r=>setTimeout(r,1800));setLoading(false);setImgs([1,2,3,4]);};
  return (
    <div style={{display:"flex",height:"100vh",paddingTop:57,background:C.bg}}>
      <aside style={{width:180,flexShrink:0,borderRight:`1px solid ${C.border}`,padding:"14px 10px",display:"flex",flexDirection:"column",gap:4,background:C.bg}}>
        <Lbl s="Tools"/>
        <div style={{height:8}}/>
        {["Text in Image","Inpaint","Relight","Face Swap","Upscale","Product Image"].map(t=><button key={t} className="sb">{t}</button>)}
      </aside>
      <div style={{flex:1,padding:"28px 36px",overflow:"auto"}}>
        <h2 style={{color:C.text,fontSize:20,fontWeight:900,letterSpacing:-.5,marginBottom:20}}>Image Studio</h2>
        <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:1,minWidth:240}}><textarea className="inp" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe the image you want to create…" rows={2} style={{resize:"none"}}/></div>
          <Sel label="Model" options={IMG_MODELS} value={model} onChange={setModel}/>
          <button className="btn-m" onClick={generate} disabled={loading} style={{padding:"10px 24px"}}>{loading?"Generating…":"Generate"}</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {loading&&Array.from({length:4}).map((_,i)=><div key={i} className="sk" style={{aspectRatio:"1",borderRadius:10,animationDelay:`${i*.12}s`}}/>)}
          {imgs.map((_,i)=><div key={i} style={{aspectRatio:"1",background:imgBgs[i],borderRadius:10,border:`1px solid ${C.border}`,cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Lumenfield() {
  const [page,setPage] = useState<Page>("explore");
  const pages: Record<Page,JSX.Element> = {
    explore:       <ExplorePage       setPage={setPage}/>,
    cinema:        <CinemaPage/>,
    audio:         <AudioPage/>,
    image:         <ImagePage/>,
    video:         <CinemaPage/>,
    marketing:     <MarketingPage/>,
    influencer:    <InfluencerPage/>,
    canvas:        <CanvasPage/>,
    apps:          <AppsPage          setPage={setPage}/>,
    library:       <LibraryPage       setPage={setPage}/>,
    login:         <LoginPage         setPage={setPage}/>,
    pricing:       <PricingPage/>,
    mcp:           <McpPage/>,
    collab:        <CollabPage/>,
    supercomputer: <SupercomputerPage/>,
    plugins:       <PluginsPage/>,
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <Nav cur={page} setPage={setPage}/>
      <main>{pages[page]}</main>
    </>
  );
}
