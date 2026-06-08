import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════════
const API_KEY = "b76a83a1d9f86a0d2248cde4bbebd4ae";
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=EUR&currencies=XAG,XAU`;

const PIECES_CALC = [
  {label:"Maple Leaf Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Britannia Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Philharmonique Argent 1oz (.999)",poids:31.1035,purete:0.999,metal:"argent"},
  {label:"American Eagle Argent 1oz (.999)",poids:31.1035,purete:0.999,metal:"argent"},
  {label:"Krugerrand Argent 1oz (.999)",poids:31.1035,purete:0.999,metal:"argent"},
  {label:"Kookaburra Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Kangaroo Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Nugget Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Lunar Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Koala Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Panda Argent 30g (.999)",poids:30.0,purete:0.999,metal:"argent"},
  {label:"Éléphant Somalien 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Semeuse Argent 5F (22.2g/.900)",poids:22.2,purete:0.900,metal:"argent"},
  {label:"Hercule 5F Argent (25g/.900)",poids:25.0,purete:0.900,metal:"argent"},
  {label:"Belle Épreuve Argent (22.2g/.950)",poids:22.2,purete:0.950,metal:"argent"},
  {label:"Maple Leaf Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Britannia Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Philharmonique Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Krugerrand Or 1oz (.9167)",poids:33.93,purete:0.9167,metal:"or"},
  {label:"American Eagle Or 1oz (.9167)",poids:31.1035,purete:0.9167,metal:"or"},
  {label:"Napoléon 20F Or (6.45g/.900)",poids:6.45,purete:0.900,metal:"or"},
  {label:"Sovereign Or (7.99g/.9167)",poids:7.99,purete:0.9167,metal:"or"},
  {label:"Vreneli Or (6.45g/.900)",poids:6.45,purete:0.900,metal:"or"},
  {label:"Buffalo Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Kangaroo Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Lunar Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Panda Or 1oz (.999)",poids:31.1035,purete:0.999,metal:"or"},
];

// ═══════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════
const fmt  = (n,d=2) => n.toLocaleString("fr-FR",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtE = (n,d=2) => fmt(n,d)+" €";

const inputStyle = (focus) => ({
  padding:"11px 14px",fontSize:"14px",
  background:focus?"#fffef8":"#fafaf6",
  border:`1px solid ${focus?"rgba(160,128,60,0.5)":"rgba(160,128,60,0.2)"}`,
  borderRadius:"10px",color:"#1a1208",fontFamily:"inherit",
  outline:"none",transition:"all 0.2s",width:"100%",boxSizing:"border-box",
});

const selectStyle = {
  padding:"11px 14px",fontSize:"13px",background:"#fafaf6",
  border:"1px solid rgba(160,128,60,0.2)",borderRadius:"10px",
  color:"#1a1208",fontFamily:"inherit",outline:"none",width:"100%",cursor:"pointer",
  appearance:"none",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a08040' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",paddingRight:"32px",
};

const Divider = ({label}) => (
  <div style={{display:"flex",alignItems:"center",gap:"12px",margin:"22px 0 16px"}}>
    <div style={{flex:1,height:"1px",background:"rgba(160,128,60,0.15)"}}/>
    <span style={{fontSize:"9px",letterSpacing:"3px",color:"#b0926a",textTransform:"uppercase"}}>{label}</span>
    <div style={{flex:1,height:"1px",background:"rgba(160,128,60,0.15)"}}/>
  </div>
);

const Field = ({label,hint,children}) => (
  <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
    <label style={{fontSize:"9px",letterSpacing:"2px",color:"#b0926a",textTransform:"uppercase"}}>
      {label}{hint&&<span style={{color:"#cbb880",letterSpacing:0,textTransform:"none",fontSize:"9px"}}> ({hint})</span>}
    </label>
    {children}
  </div>
);

const ResultRow = ({label,value,highlight,green,red,bold}) => (
  <div style={{
    display:"flex",justifyContent:"space-between",alignItems:"center",
    padding:"9px 14px",
    background:highlight?(green?"#f0fdf4":red?"#fef2f2":"#fffbeb"):"transparent",
    border:highlight?`1px solid ${green?"#86efac":red?"#fca5a5":"#fcd34d"}`:"none",
    borderRadius:highlight?"10px":"0",marginBottom:highlight?"5px":"2px",
  }}>
    <span style={{fontSize:"12px",color:highlight?(green?"#15803d":red?"#b91c1c":"#b45309"):"#6b5030"}}>{label}</span>
    <span style={{fontSize:bold?"16px":"13px",fontWeight:bold?"700":"normal",
      color:highlight?(green?"#15803d":red?"#b91c1c":"#b45309"):"#1a1208",
      fontVariantNumeric:"tabular-nums"}}>{value}</span>
  </div>
);

const Card = ({children, style={}}) => (
  <div style={{
    background:"rgba(255,255,255,0.94)",
    border:"1px solid rgba(170,140,70,0.15)",
    borderRadius:"20px",padding:"24px 26px",
    boxShadow:"0 2px 20px rgba(160,128,60,0.07)",
    ...style,
  }}>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════
//  HOOK — SPOT PRICES
// ═══════════════════════════════════════════════════════
function useSpots() {
  const [silverSpot, setSilverSpot] = useState(null);
  const [goldSpot,   setGoldSpot]   = useState(null);
  const [silverTrend, setSilverTrend] = useState("stable");
  const [goldTrend,   setGoldTrend]   = useState("stable");
  const [lastUpdate,  setLastUpdate]  = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(false);
  const [history,     setHistory]     = useState([]);

  const prevRef = { s: silverSpot, g: goldSpot };

  const tick = useCallback(async () => {
    try {
      const res  = await fetch(API_URL);
      const data = await res.json();
      const sv = parseFloat((1 / data.rates.XAG).toFixed(2));
      const gv = parseFloat((1 / data.rates.XAU).toFixed(2));
      setSilverTrend(silverSpot ? (sv > silverSpot ? "up" : sv < silverSpot ? "down" : "stable") : "stable");
      setGoldTrend  (goldSpot   ? (gv > goldSpot   ? "up" : gv < goldSpot   ? "down" : "stable") : "stable");
      setSilverSpot(sv);
      setGoldSpot(gv);
      setLastUpdate(new Date());
      setLoading(false);
      setError(false);
      setHistory(h => [...h.slice(-23), {time: new Date(), silver: sv, gold: gv}]);
    } catch(e) {
      setError(true);
      setLoading(false);
    }
  }, [silverSpot, goldSpot]);

  useEffect(() => {
    tick();
    const iv = setInterval(tick, 60000);
    return () => clearInterval(iv);
  }, []);

  return {silverSpot, goldSpot, silverTrend, goldTrend, lastUpdate, loading, error, history};
}

// ═══════════════════════════════════════════════════════
//  PAGE 1 — COURS SPOT
// ═══════════════════════════════════════════════════════
function CoursSpot({silverSpot, goldSpot, silverTrend, goldTrend, lastUpdate, loading, error, history}) {

  const spotCard = (label, val, trend, unit, isGold) => {
    const color = trend==="up"?"#15803d":trend==="down"?"#b91c1c":isGold?"#b8860b":"#92701a";
    const bg    = isGold?"linear-gradient(135deg,#fffdf0,#fef6c8)":"linear-gradient(135deg,#fffdf5,#fef6e0)";
    const border= isGold?"rgba(184,134,11,0.3)":"rgba(160,128,60,0.25)";
    const accent= isGold?"#b8860b":"#a08040";

    const valG  = val ? val/31.1035 : null;
    const valKg = val ? val*32.1507 : null;

    return (
      <div style={{background:bg,border:`1px solid ${border}`,borderRadius:"18px",padding:"24px 28px",flex:1,minWidth:"260px",boxShadow:`0 4px 24px ${isGold?"rgba(184,134,11,0.1)":"rgba(160,128,60,0.08)"}`}}>
        <div style={{fontSize:"9px",letterSpacing:"4px",color:accent,textTransform:"uppercase",marginBottom:"6px"}}>{label}</div>
        
        {loading ? (
          <div style={{fontSize:"32px",color:"#c4b080",fontStyle:"italic"}}>Chargement…</div>
        ) : error ? (
          <div style={{fontSize:"16px",color:"#b91c1c"}}>Erreur API</div>
        ) : (
          <>
            <div style={{fontSize:"42px",fontWeight:"bold",color,fontVariantNumeric:"tabular-nums",letterSpacing:"-1px",lineHeight:1,transition:"color 0.4s"}}>
              {fmt(val)} €
              <span style={{fontSize:"20px",marginLeft:"8px",verticalAlign:"middle"}}>
                {trend==="up"?"▲":trend==="down"?"▼":"●"}
              </span>
            </div>
            <div style={{fontSize:"11px",color:accent,marginTop:"4px",letterSpacing:"1px"}}>/once troy (31,1g)</div>

            <div style={{display:"flex",gap:"20px",marginTop:"18px",paddingTop:"16px",borderTop:`1px solid ${isGold?"rgba(184,134,11,0.15)":"rgba(160,128,60,0.15)"}`}}>
              <div>
                <div style={{fontSize:"9px",color:accent,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>/ gramme</div>
                <div style={{fontSize:"16px",color:"#1a1208",fontVariantNumeric:"tabular-nums"}}>{valG?fmt(valG,3):"—"} €</div>
              </div>
              <div>
                <div style={{fontSize:"9px",color:accent,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>/ kg</div>
                <div style={{fontSize:"16px",color:"#1a1208",fontVariantNumeric:"tabular-nums"}}>{valKg?fmt(valKg,0):"—"} €</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Mini sparkline SVG
  const Sparkline = ({data, color}) => {
    if(data.length < 2) return null;
    const w=200, h=48, pad=4;
    const min=Math.min(...data), max=Math.max(...data);
    const range=max-min||1;
    const pts = data.map((v,i)=>{
      const x = pad + (i/(data.length-1))*(w-pad*2);
      const y = pad + (1-(v-min)/range)*(h-pad*2);
      return `${x},${y}`;
    }).join(" ");
    return(
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={pts.split(" ").slice(-1)[0].split(",")[0]} cy={pts.split(" ").slice(-1)[0].split(",")[1]} r="3" fill={color}/>
      </svg>
    );
  };

  return (
    <div style={{maxWidth:"800px",margin:"0 auto"}}>
      {/* Spot cards */}
      <div style={{display:"flex",gap:"16px",flexWrap:"wrap",marginBottom:"24px"}}>
        {spotCard("Argent · XAG", silverSpot, silverTrend, "XAG", false)}
        {spotCard("Or · XAU",     goldSpot,   goldTrend,   "XAU", true)}
      </div>

      {/* Last update */}
      {lastUpdate && (
        <div style={{fontSize:"10px",color:"#b0926a",textAlign:"center",marginBottom:"20px",letterSpacing:"1px"}}>
          Dernière mise à jour : {lastUpdate.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})} · Actualisation toutes les 60 secondes
        </div>
      )}

      {/* History sparklines */}
      {history.length > 2 && (
        <Card>
          <div style={{fontSize:"9px",letterSpacing:"3px",color:"#b0926a",textTransform:"uppercase",marginBottom:"16px"}}>Évolution de la séance</div>
          <div style={{display:"flex",gap:"32px",flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:"10px",color:"#a08040",marginBottom:"6px"}}>🥈 Argent</div>
              <Sparkline data={history.map(h=>h.silver)} color="#a08040"/>
              {history.length>1&&<div style={{fontSize:"10px",color:"#6b5030",marginTop:"4px",fontVariantNumeric:"tabular-nums"}}>
                {history[0].silver<history[history.length-1].silver?"▲":"▼"} {fmt(Math.abs(history[history.length-1].silver-history[0].silver),2)} €
              </div>}
            </div>
            <div>
              <div style={{fontSize:"10px",color:"#b8860b",marginBottom:"6px"}}>🥇 Or</div>
              <Sparkline data={history.map(h=>h.gold)} color="#b8860b"/>
              {history.length>1&&<div style={{fontSize:"10px",color:"#6b5030",marginTop:"4px",fontVariantNumeric:"tabular-nums"}}>
                {history[0].gold<history[history.length-1].gold?"▲":"▼"} {fmt(Math.abs(history[history.length-1].gold-history[0].gold),0)} €
              </div>}
            </div>
          </div>
        </Card>
      )}

      {/* Ratio or/argent */}
      {silverSpot && goldSpot && (
        <Card style={{marginTop:"16px"}}>
          <div style={{fontSize:"9px",letterSpacing:"3px",color:"#b0926a",textTransform:"uppercase",marginBottom:"12px"}}>Indicateurs</div>
          <div style={{display:"flex",gap:"24px",flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:"10px",color:"#a08040",marginBottom:"3px"}}>Ratio Or/Argent</div>
              <div style={{fontSize:"22px",color:"#1a1208",fontVariantNumeric:"tabular-nums",fontWeight:"600"}}>{fmt(goldSpot/silverSpot,1)}</div>
              <div style={{fontSize:"10px",color:"#b0926a",marginTop:"2px"}}>oz d'argent pour 1 oz d'or</div>
            </div>
            <div style={{width:"1px",background:"rgba(160,128,60,0.15)"}}/>
            <div>
              <div style={{fontSize:"10px",color:"#a08040",marginBottom:"3px"}}>Argent en g/€</div>
              <div style={{fontSize:"22px",color:"#1a1208",fontVariantNumeric:"tabular-nums",fontWeight:"600"}}>{fmt(1/(silverSpot/31.1035),3)} g</div>
              <div style={{fontSize:"10px",color:"#b0926a",marginTop:"2px"}}>métal pur pour 1 €</div>
            </div>
            <div style={{width:"1px",background:"rgba(160,128,60,0.15)"}}/>
            <div>
              <div style={{fontSize:"10px",color:"#a08040",marginBottom:"3px"}}>Or en mg/€</div>
              <div style={{fontSize:"22px",color:"#1a1208",fontVariantNumeric:"tabular-nums",fontWeight:"600"}}>{fmt((1/(goldSpot/31.1035))*1000,2)} mg</div>
              <div style={{fontSize:"10px",color:"#b0926a",marginTop:"2px"}}>métal pur pour 1 €</div>
            </div>
          </div>
        </Card>
      )}

      <div style={{marginTop:"14px",fontSize:"9px",color:"#c4a870",textAlign:"center",letterSpacing:"1px"}}>
        Source : MetalpriceAPI · Cours en EUR · Données indicatives
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  PAGE 2 — CALCULATEUR DE PRIME
// ═══════════════════════════════════════════════════════
function CalculateurPrime({silverSpot, goldSpot, loading}) {
  const [pieceId,  setPieceId]  = useState("");
  const [prixPaye, setPrixPaye] = useState("");
  const [poidsM,   setPoidsM]   = useState("");
  const [pureteM,  setPureteM]  = useState("");
  const [metalM,   setMetalM]   = useState("argent");
  const [qteM,     setQteM]     = useState("1");
  const [f1,setF1] = useState(false);

  useEffect(()=>{
    if(!pieceId) return;
    const p = PIECES_CALC[parseInt(pieceId)];
    setPoidsM(p.poids.toString());
    setPureteM(p.purete.toString());
    setMetalM(p.metal);
  },[pieceId]);

  const spot   = metalM==="or" ? goldSpot : silverSpot;
  const prix   = parseFloat(prixPaye)||0;
  const poids  = parseFloat(poidsM)||0;
  const purete = parseFloat(pureteM)||0;
  const qte    = parseInt(qteM)||1;

  let res = null;
  if(prix>0 && poids>0 && purete>0 && spot){
    const valMetal  = spot*(poids/31.1035)*purete;
    const prime     = prix - valMetal;
    const primePct  = (prime/valMetal)*100;
    res = {valMetal, prime, primePct};
  }

  const verdictColor  = res ? (res.primePct<8?"#15803d":res.primePct<15?"#b45309":"#b91c1c") : "#6b5030";
  const verdictBg     = res ? (res.primePct<8?"#f0fdf4":res.primePct<15?"#fffbeb":"#fef2f2") : "#fafaf6";
  const verdictBorder = res ? (res.primePct<8?"#86efac":res.primePct<15?"#fcd34d":"#fca5a5") : "rgba(160,128,60,0.2)";

  return (
    <div style={{maxWidth:"600px",margin:"0 auto"}}>
      {loading && (
        <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:"10px",padding:"10px 16px",marginBottom:"14px",fontSize:"11px",color:"#92400e"}}>
          ⏳ Chargement du cours spot en cours…
        </div>
      )}
      {!loading && spot && (
        <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:"10px",padding:"10px 16px",marginBottom:"14px",fontSize:"11px",color:"#15803d",display:"flex",justifyContent:"space-between"}}>
          <span>✦ Spot utilisé en temps réel</span>
          <span style={{fontVariantNumeric:"tabular-nums",fontWeight:"600"}}>
            {metalM==="or" ? `Or : ${fmt(goldSpot)} €/oz` : `Argent : ${fmt(silverSpot)} €/oz`}
          </span>
        </div>
      )}

      <Card>
        <p style={{fontSize:"11px",color:"#b0926a",margin:"0 0 4px",lineHeight:1.7}}>
          Entrez le prix payé chez le revendeur et les caractéristiques de la pièce pour connaître la prime réelle au-dessus du spot métal.
        </p>

        <Divider label="Pièce"/>

        <Field label="Sélection rapide" hint="optionnel">
          <select value={pieceId} onChange={e=>setPieceId(e.target.value)} style={selectStyle}>
            <option value="">— Choisir une pièce connue —</option>
            <optgroup label="🥈 Argent">
              {PIECES_CALC.filter(p=>p.metal==="argent").map((p,i)=>(
                <option key={i} value={PIECES_CALC.indexOf(p)}>{p.label}</option>
              ))}
            </optgroup>
            <optgroup label="🥇 Or">
              {PIECES_CALC.filter(p=>p.metal==="or").map((p,i)=>(
                <option key={i} value={PIECES_CALC.indexOf(p)}>{p.label}</option>
              ))}
            </optgroup>
          </select>
        </Field>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"14px"}}>
          <Field label="Métal">
            <select value={metalM} onChange={e=>setMetalM(e.target.value)} style={selectStyle}>
              <option value="argent">🥈 Argent</option>
              <option value="or">🥇 Or</option>
            </select>
          </Field>
          <Field label="Quantité">
            <input type="number" min="1" value={qteM} onChange={e=>setQteM(e.target.value)} style={inputStyle(false)} placeholder="1"/>
          </Field>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"14px"}}>
          <Field label="Poids" hint="grammes">
            <input type="number" value={poidsM} onChange={e=>setPoidsM(e.target.value)} style={inputStyle(false)} placeholder="31.1035"/>
          </Field>
          <Field label="Pureté" hint="ex: 0.9999">
            <input type="number" step="0.0001" value={pureteM} onChange={e=>setPureteM(e.target.value)} style={inputStyle(false)} placeholder="0.9999"/>
          </Field>
        </div>

        <div style={{marginTop:"14px"}}>
          <Field label="Prix revendeur" hint="€ / pièce">
            <input type="number" value={prixPaye} onChange={e=>setPrixPaye(e.target.value)}
              onFocus={()=>setF1(true)} onBlur={()=>setF1(false)}
              style={inputStyle(f1)} placeholder="ex: 75.50"/>
          </Field>
        </div>

        {res ? (
          <>
            <Divider label="Résultat"/>
            <ResultRow label="Valeur métal intrinsèque" value={fmtE(res.valMetal)}/>
            <ResultRow label="Prix revendeur payé" value={fmtE(prix)}/>
            <div style={{height:"1px",background:"rgba(160,128,60,0.1)",margin:"6px 0"}}/>
            <ResultRow label="Prime absolue" value={`+${fmtE(res.prime)}`}
              highlight green={res.primePct<10} red={res.primePct>18} bold/>
            <ResultRow label="Prime en %" value={`+${fmt(res.primePct)}%`}
              highlight green={res.primePct<10} red={res.primePct>18} bold/>

            {qte>1 && (
              <>
                <Divider label={`Pour ${qte} pièces`}/>
                <ResultRow label="Total investi" value={fmtE(prix*qte)}/>
                <ResultRow label="Valeur métal totale" value={fmtE(res.valMetal*qte)}/>
                <ResultRow label="Prime totale payée" value={`+${fmtE(res.prime*qte)}`} highlight bold/>
              </>
            )}

            <div style={{marginTop:"16px",padding:"14px 16px",background:verdictBg,border:`1px solid ${verdictBorder}`,borderRadius:"12px",fontSize:"12px",color:verdictColor,lineHeight:1.7}}>
              {res.primePct<8  && "✦ Excellente affaire — prime très basse, proche du métal physique pur."}
              {res.primePct>=8  && res.primePct<12 && "✦ Bon prix — prime raisonnable dans les standards du marché."}
              {res.primePct>=12 && res.primePct<18 && "⚠ Prime élevée — comparez avec d'autres revendeurs."}
              {res.primePct>=18 && "✗ Prime très élevée — justifiée uniquement pour pièces rares ou numismatiques."}
            </div>
          </>
        ) : (
          <div style={{marginTop:"20px",textAlign:"center",color:"#c4b080",fontSize:"12px",fontStyle:"italic"}}>
            {!spot ? "En attente du cours spot…" : "Remplissez les champs pour calculer la prime"}
          </div>
        )}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  PAGE 3 — SIMULATEUR FISCAL
// ═══════════════════════════════════════════════════════
function SimulateurFiscal() {
  const [prixCession, setPrixCession] = useState("");
  const [prixAchat,   setPrixAchat]   = useState("");
  const [annees,      setAnnees]      = useState("");
  const [metalT,      setMetalT]      = useState("or");
  const [f1,setF1]=useState(false), [f2,setF2]=useState(false);

  const cession = parseFloat(prixCession)||0;
  const achat   = parseFloat(prixAchat)||0;
  const ans     = parseInt(annees)||0;

  let res = null;
  if(cession > 0) {
    if(cession < 5000) {
      res = {exonere: true};
    } else {
      const taxeF = cession * 0.115;
      let taxePV=null, abatt=0, pv=0, pvImp=0;
      if(achat > 0) {
        pv = cession - achat;
        if(ans >= 3) abatt = Math.min((ans-2)*0.05, 1.0);
        pvImp = Math.max(pv*(1-abatt), 0);
        taxePV = ans >= 22 ? 0 : pvImp * 0.36172;
      }
      res = {
        taxeF, taxePV, pv, abatt, pvImp, ans,
        best: taxePV!==null ? (taxePV<taxeF?"pv":"forfait") : "forfait"
      };
    }
  }

  return (
    <div style={{maxWidth:"600px",margin:"0 auto"}}>
      <div style={{background:"rgba(255,255,255,0.85)",border:"1px solid rgba(170,140,70,0.2)",borderRadius:"14px",padding:"16px 20px",marginBottom:"16px",fontSize:"11px",color:"#6b5030",lineHeight:1.8}}>
        <strong style={{color:"#1a1208",fontSize:"12px"}}>Régime fiscal FR — Métaux précieux (CGI art. 150 VI)</strong><br/>
        <strong>① Taxe forfaitaire 11,5%</strong> sur le prix de cession brut (sans justificatif d'achat)<br/>
        <strong>② Plus-values 36,17%</strong> avec abattement 5%/an dès la 3e année → exonération totale à <strong>22 ans</strong><br/>
        <strong>Exonération automatique</strong> si prix de cession &lt; 5 000 €
      </div>

      <Card>
        <Divider label="Opération de cession"/>

        <Field label="Métal">
          <select value={metalT} onChange={e=>setMetalT(e.target.value)} style={selectStyle}>
            <option value="or">🥇 Or</option>
            <option value="argent">🥈 Argent</option>
          </select>
        </Field>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"14px"}}>
          <Field label="Prix de cession" hint="€ total">
            <input type="number" value={prixCession} onChange={e=>setPrixCession(e.target.value)}
              onFocus={()=>setF1(true)} onBlur={()=>setF1(false)} style={inputStyle(f1)} placeholder="5000"/>
          </Field>
          <Field label="Prix d'achat" hint="optionnel">
            <input type="number" value={prixAchat} onChange={e=>setPrixAchat(e.target.value)}
              onFocus={()=>setF2(true)} onBlur={()=>setF2(false)} style={inputStyle(f2)} placeholder="3500"/>
          </Field>
        </div>

        <div style={{marginTop:"14px"}}>
          <Field label="Années de détention" hint="pour abattement plus-values">
            <input type="number" min="0" value={annees} onChange={e=>setAnnees(e.target.value)}
              style={inputStyle(false)} placeholder="5"/>
          </Field>
        </div>

        {res && (
          <>
            <Divider label="Résultat fiscal"/>
            {res.exonere ? (
              <ResultRow label="Cession < 5 000 € → Exonération totale" value="0,00 €" highlight green bold/>
            ) : (
              <>
                <div style={{fontSize:"10px",letterSpacing:"2px",color:"#b0926a",textTransform:"uppercase",marginBottom:"8px"}}>① Taxe forfaitaire (11,5%)</div>
                <ResultRow label="Base imposable (prix de cession)" value={fmtE(cession)}/>
                <ResultRow label="Taxe forfaitaire due" value={fmtE(res.taxeF)}
                  highlight red={res.best==="pv"} bold/>
                <ResultRow label="Net perçu après taxe" value={fmtE(cession-res.taxeF)}/>

                {res.taxePV !== null && (
                  <>
                    <Divider label="② Régime plus-values (si justificatifs d'achat)"/>
                    <ResultRow label="Plus-value brute" value={fmtE(res.pv)}/>
                    {ans>=3 && <ResultRow label={`Abattement ${Math.min((ans-2)*5,100)}% (${ans} ans de détention)`} value={`-${fmtE(res.pv*res.abatt)}`}/>}
                    {ans>=22 ? (
                      <ResultRow label="Exonération totale (≥ 22 ans)" value="0,00 €" highlight green bold/>
                    ) : (
                      <>
                        <ResultRow label="Plus-value imposable" value={fmtE(res.pvImp)}/>
                        <ResultRow label="Taxe PV due (36,17%)" value={fmtE(res.taxePV)}
                          highlight green={res.best==="pv"} red={res.best==="forfait"} bold/>
                        <ResultRow label="Net perçu après taxe" value={fmtE(cession-res.taxePV)}/>
                      </>
                    )}

                    <Divider label="Recommandation"/>
                    <div style={{
                      padding:"14px 16px",borderRadius:"12px",fontSize:"12px",lineHeight:1.7,
                      background:res.best==="pv"||ans>=22?"#f0fdf4":"#fffbeb",
                      border:`1px solid ${res.best==="pv"||ans>=22?"#86efac":"#fcd34d"}`,
                      color:res.best==="pv"||ans>=22?"#15803d":"#b45309",
                    }}>
                      {ans>=22
                        ? "✦ Exonération totale — 22 ans de détention atteints. Aucune taxe à payer."
                        : res.best==="pv"
                        ? `✦ Régime plus-values avantageux — économie de ${fmtE(res.taxeF-res.taxePV)} par rapport au forfait. Conservez vos justificatifs d'achat.`
                        : "⚠ Régime forfaitaire avantageux — la plus-value imposable est trop élevée ici. Optez pour le forfait 11,5%."}
                      {ans<22 && ans>=0 && (
                        <span style={{display:"block",marginTop:"6px",fontSize:"11px",color:"#92400e"}}>
                          ↗ Exonération totale dans <strong>{22-ans} an{22-ans>1?"s":""}</strong>.
                        </span>
                      )}
                    </div>
                  </>
                )}

                {res.taxePV===null && (
                  <div style={{marginTop:"14px",fontSize:"11px",color:"#b0926a",fontStyle:"italic",lineHeight:1.7,padding:"10px 14px",background:"#fafaf6",borderRadius:"10px"}}>
                    💡 Renseignez votre prix d'achat et vos années de détention pour comparer les deux régimes et potentiellement économiser sur votre imposition.
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!res && (
          <div style={{marginTop:"20px",textAlign:"center",color:"#c4b080",fontSize:"12px",fontStyle:"italic"}}>
            Entrez le prix de cession pour simuler votre fiscalité
          </div>
        )}
      </Card>

      <div style={{marginTop:"14px",fontSize:"10px",color:"#c4a870",lineHeight:1.7,padding:"0 4px"}}>
        ⚠ Simulation indicative à titre informatif. Consultez un conseiller fiscal ou notaire pour votre situation personnelle. Taux en vigueur au 01/06/2026.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════
const NAV = [
  {id:"spot",      label:"📈 Cours Spot",    sub:"Temps réel"},
  {id:"prime",     label:"🧮 Prime",          sub:"Calculateur"},
  {id:"fiscalite", label:"🏛️ Fiscalité",     sub:"Simulateur FR"},
];

export default function MetalTracker() {
  const [page, setPage] = useState("spot");
  const spots = useSpots();

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#fafaf8 0%,#f4f1ea 50%,#faf8f4 100%)",
      fontFamily:"'Palatino Linotype','Book Antiqua',Georgia,serif",
      color:"#1a1a1a",
    }}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        backgroundImage:"radial-gradient(circle at 1px 1px,rgba(160,130,60,0.07) 1px,transparent 0)",
        backgroundSize:"28px 28px"}}/>

      {/* ── HEADER ── */}
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(255,255,255,0.93)",
        backdropFilter:"blur(24px)",
        borderBottom:"1px solid rgba(170,140,70,0.18)",
        boxShadow:"0 2px 24px rgba(160,130,60,0.07)",
      }}>
        <div style={{maxWidth:"900px",margin:"0 auto",padding:"0 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0 10px",flexWrap:"wrap",gap:"12px"}}>

            {/* Logo */}
            <div style={{display:"flex",alignItems:"baseline",gap:"10px"}}>
              <span style={{fontSize:"22px",fontWeight:"normal",color:"#1a1208",letterSpacing:"0.5px"}}>MetalTracker</span>
              <span style={{fontSize:"9px",letterSpacing:"3px",color:"#b0926a",textTransform:"uppercase"}}>Or & Argent</span>
            </div>

            {/* Live spots */}
            <div style={{display:"flex",gap:"8px"}}>
              {[
                {label:"Argent",val:spots.silverSpot,trend:spots.silverTrend,gold:false},
                {label:"Or",    val:spots.goldSpot,  trend:spots.goldTrend,  gold:true},
              ].map(s=>(
                <div key={s.label} style={{
                  background:s.gold?"linear-gradient(135deg,#fffdf0,#fef6c8)":"linear-gradient(135deg,#fffdf5,#fef6e0)",
                  border:`1px solid ${s.gold?"rgba(184,134,11,0.3)":"rgba(160,128,60,0.25)"}`,
                  borderRadius:"10px",padding:"8px 14px",textAlign:"right",
                  boxShadow:`0 1px 8px ${s.gold?"rgba(184,134,11,0.08)":"rgba(160,128,60,0.08)"}`,
                }}>
                  <div style={{fontSize:"8px",letterSpacing:"2px",color:s.gold?"#b8860b":"#a08040",textTransform:"uppercase",marginBottom:"1px"}}>{s.label} /oz</div>
                  <div style={{fontSize:"17px",fontWeight:"bold",fontVariantNumeric:"tabular-nums",
                    color:spots.loading?"#c4b080":s.trend==="up"?"#15803d":s.trend==="down"?"#b91c1c":s.gold?"#b8860b":"#92701a",
                    transition:"color 0.4s"}}>
                    {spots.loading ? "…" : s.val ? `${fmt(s.val)} €` : "—"}
                    {!spots.loading && s.val && <span style={{fontSize:"10px",marginLeft:"3px"}}>{s.trend==="up"?"▲":s.trend==="down"?"▼":"●"}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div style={{display:"flex",gap:"0",borderTop:"1px solid rgba(170,140,70,0.1)"}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{
                padding:"11px 22px",fontSize:"12px",letterSpacing:"0.3px",
                background:"none",border:"none",
                borderBottom:`2px solid ${page===n.id?"#1a1208":"transparent"}`,
                color:page===n.id?"#1a1208":"#8a7050",
                cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
                fontWeight:page===n.id?"600":"normal",
                display:"flex",alignItems:"center",gap:"6px",
              }}>
                <span>{n.label}</span>
                <span style={{fontSize:"9px",color:page===n.id?"#b0926a":"#c4b090",letterSpacing:"1px"}}>{n.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{position:"relative",zIndex:1,maxWidth:"900px",margin:"0 auto",padding:"26px 20px 48px"}}>
        <div style={{marginBottom:"22px"}}>
          <div style={{fontSize:"9px",letterSpacing:"5px",color:"#b0926a",textTransform:"uppercase",marginBottom:"4px"}}>✦ MetalTracker</div>
          <h2 style={{fontSize:"22px",fontWeight:"normal",margin:0,color:"#1a1208"}}>
            {NAV.find(n=>n.id===page)?.label}
            <span style={{fontSize:"12px",letterSpacing:"3px",color:"#b0926a",fontWeight:"normal",marginLeft:"12px",textTransform:"uppercase"}}>
              {NAV.find(n=>n.id===page)?.sub}
            </span>
          </h2>
        </div>

        {page==="spot"      && <CoursSpot {...spots}/>}
        {page==="prime"     && <CalculateurPrime silverSpot={spots.silverSpot} goldSpot={spots.goldSpot} loading={spots.loading}/>}
        {page==="fiscalite" && <SimulateurFiscal/>}
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        position:"relative",zIndex:1,
        borderTop:"1px solid rgba(160,128,60,0.1)",
        padding:"16px 24px",
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px",
        background:"rgba(255,255,255,0.5)",
      }}>
        <span style={{fontSize:"12px",color:"#1a1208",letterSpacing:"1px"}}>MetalTracker <span style={{color:"#b0926a",fontSize:"10px"}}>Or & Argent</span></span>
        <span style={{fontSize:"9px",color:"#c4a870",letterSpacing:"1.5px",textTransform:"uppercase"}}>Cours spot en temps réel · MetalpriceAPI</span>
        <span style={{fontSize:"9px",color:"#c4a870"}}>{new Date().getFullYear()} · Données indicatives</span>
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        button:hover{opacity:0.82}
        input:focus,select:focus{outline:none}
      `}</style>
    </div>
  );
}
