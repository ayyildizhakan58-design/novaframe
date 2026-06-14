function ImagePage() {
  const [prompt,setPrompt] = useState("");
  const [model,setModel]   = useState("Nano Banana Pro");
  const [loading,setLoading] = useState(false);
  const [imgs,setImgs]     = useState<number[]>([]);
  const [generatedUrl,setGeneratedUrl] = useState<string>("");
  const modelNames = IMG_M.map(m=>m.title);
  const ibgs = ["linear-gradient(135deg,#0d0019,#3a0060)","linear-gradient(135deg,#000d1a,#003060)","linear-gradient(135deg,#190000,#500010)","linear-gradient(135deg,#001900,#005020)"];

  const gen = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImgs([]);
    setGeneratedUrl("");
    try {
      const modelMap: Record<string, string> = {
        "Nano Banana Pro": "nano-banana-pro",
        "Nano Banana 2": "nano-banana-2",
        "GPT Image 2": "gpt-image-2",
        "FLUX.2": "flux-2",
        "Recraft V4.1": "recraft",
        "Seedream 5.0 Lite": "seedream-5-lite",
        "Grok Imagine": "grok-image",
      };
      const modelId = modelMap[model] ?? "flux-2";
      const res = await fetch("/api/studio-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId, prompt }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        setGeneratedUrl(data.url);
        setImgs([1]);
      }
    } catch {
      setImgs([]);
    } finally {
      setLoading(false);
    }
  };

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
          <Sel label="Model" opts={modelNames} val={model} set={setModel}/>
          <button className="bm" onClick={gen} disabled={loading} style={{padding:"10px 24px"}}>{loading?"Generating…":"Generate"}</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {loading&&Array.from({length:4}).map((_,i)=><div key={i} className="sk" style={{aspectRatio:"1",borderRadius:10,animationDelay:`${i*.12}s`}}/>)}
          {imgs.map((_,i)=>(
            <div key={i} style={{aspectRatio:"1",background:ibgs[i],borderRadius:10,border:`1px solid ${B1}`,cursor:"pointer",overflow:"hidden",transition:"transform .2s"}}
              onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.02)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
            >
              {generatedUrl&&i===0&&(
                <img src={generatedUrl} alt="Generated" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
