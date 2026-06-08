import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
//  COIN SVG
// ═══════════════════════════════════════════════════════
const CoinSVG = ({ id, metal, size = 56 }) => {
  const isGold = metal === "gold";
  const g1 = isGold ? "#fff8dc" : "#f0f0f0";
  const g2 = isGold ? "#d4a820" : "#c8c8c8";
  const g3 = isGold ? "#8b6010" : "#909090";
  const stroke = isGold ? "#c09010" : "#b0b0b0";
  const txt = isGold ? "#7a5008" : "#707070";
  const sub = isGold ? "#a07020" : "#909090";
  const gid = `cg_${id}_${metal}`;
  const labels = {
    maple:["🍁","MAPLE LEAF","CANADA"], britannia:["⚓","BRITANNIA","ROY.-UNI"],
    philharmonic:["🎵","PHILHARM.","AUTRICHE"], wiener:["🎼","WIENER","AUTRICHE"],
    american_eagle:["🦅","AM. EAGLE","USA"], krugerrand:["🦁","KRUGERRAND","S.AFRICA"],
    libertad:["🌵","LIBERTAD","MÉXICO"], kookaburra:["🐦","KOOKABURRA","AUSTRALIA"],
    kangaroo:["🦘","KANGAROO","AUSTRALIA"], nugget:["🪨","NUGGET","AUSTRALIA"],
    lunar:["🌙","LUNAR","AUSTRALIA"], koala:["🐨","KOALA","AUSTRALIA"],
    panda:["🐼","PANDA","CHINA"], somalian:["🐘","ÉLÉPHANT","SOMALIA"],
    semeuse:["🌾","SEMEUSE","FRANCE"], hercule:["⚔️","HERCULE","FRANCE"],
    france_be:["🏛️","BELLE ÉPR.","FRANCE"], napoleon:["👑","NAPOLÉON","FRANCE"],
    vreneli:["🌸","VRENELI","SUISSE"], sovereign:["👸","SOVEREIGN","ROY.-UNI"],
    buffalo:["🦬","BUFFALO","USA"],
  };
  const [emoji, line1, line2] = labels[id] || ["🪙", id.toUpperCase(), ""];
  return (
    <svg width={size} height={size} viewBox="0 0 56 56">
      <defs>
        <radialGradient id={gid} cx="38%" cy="32%">
          <stop offset="0%" stopColor={g1}/><stop offset="55%" stopColor={g2}/><stop offset="100%" stopColor={g3}/>
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="27" fill={`url(#${gid})`} stroke={stroke} strokeWidth="1.2"/>
      <circle cx="28" cy="28" r="22.5" fill="none" stroke={isGold?"rgba(255,220,80,0.4)":"rgba(255,255,255,0.3)"} strokeWidth="0.8"/>
      <text x="28" y="21" textAnchor="middle" fontSize="15">{emoji}</text>
      <text x="28" y="34" textAnchor="middle" fontSize="5" fill={txt} fontFamily="serif" letterSpacing="0.3">{line1}</text>
      <text x="28" y="42" textAnchor="middle" fontSize="4.5" fill={sub} fontFamily="serif">{line2}</text>
    </svg>
  );
};

// ═══════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════
const SILVER_BULLIONS = [
  {id:"maple",name:"Maple Leaf",countryName:"Canada",country:"🇨🇦",weight:31.1035,purity:0.9999,mintage:"Monnaie Royale Canadienne"},
  {id:"britannia",name:"Britannia",countryName:"Royaume-Uni",country:"🇬🇧",weight:31.1035,purity:0.9999,mintage:"Royal Mint"},
  {id:"philharmonic",name:"Philharmonique",countryName:"Autriche",country:"🇦🇹",weight:31.1035,purity:0.999,mintage:"Monnaie de Vienne"},
  {id:"wiener",name:"Wiener Silber",countryName:"Autriche",country:"🇦🇹",weight:31.1035,purity:0.999,mintage:"Monnaie de Vienne"},
  {id:"american_eagle",name:"American Eagle",countryName:"États-Unis",country:"🇺🇸",weight:31.1035,purity:0.999,mintage:"US Mint"},
  {id:"krugerrand",name:"Krugerrand",countryName:"Afrique du Sud",country:"🇿🇦",weight:31.1035,purity:0.999,mintage:"South African Mint"},
  {id:"libertad",name:"Libertad",countryName:"Mexique",country:"🇲🇽",weight:31.1035,purity:0.999,mintage:"Casa de Moneda"},
  {id:"kookaburra",name:"Kookaburra",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"kangaroo",name:"Kangaroo",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"nugget",name:"Nugget",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"lunar",name:"Lunar Series",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"koala",name:"Koala",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"panda",name:"Panda",countryName:"Chine",country:"🇨🇳",weight:30.0,purity:0.999,mintage:"China Mint"},
  {id:"somalian",name:"Éléphant Somalien",countryName:"Somalie",country:"🇸🇴",weight:31.1035,purity:0.9999,mintage:"Bavarian State Mint"},
  {id:"semeuse",name:"Semeuse",countryName:"France",country:"🇫🇷",weight:22.2,purity:0.900,mintage:"Monnaie de Paris"},
  {id:"hercule",name:"Hercule 5F",countryName:"France",country:"🇫🇷",weight:25.0,purity:0.900,mintage:"Monnaie de Paris"},
  {id:"france_be",name:"Belle Épreuve Argent",countryName:"France",country:"🇫🇷",weight:22.2,purity:0.950,mintage:"Monnaie de Paris"},
];

const GOLD_BULLIONS = [
  {id:"maple",name:"Maple Leaf Or",countryName:"Canada",country:"🇨🇦",weight:31.1035,purity:0.9999,mintage:"Monnaie Royale Canadienne"},
  {id:"britannia",name:"Britannia Or",countryName:"Royaume-Uni",country:"🇬🇧",weight:31.1035,purity:0.9999,mintage:"Royal Mint"},
  {id:"philharmonic",name:"Philharmonique Or",countryName:"Autriche",country:"🇦🇹",weight:31.1035,purity:0.9999,mintage:"Monnaie de Vienne"},
  {id:"american_eagle",name:"American Eagle Or",countryName:"États-Unis",country:"🇺🇸",weight:31.1035,purity:0.9167,mintage:"US Mint"},
  {id:"krugerrand",name:"Krugerrand Or",countryName:"Afrique du Sud",country:"🇿🇦",weight:33.93,purity:0.9167,mintage:"South African Mint"},
  {id:"libertad",name:"Libertad Or",countryName:"Mexique",country:"🇲🇽",weight:31.1035,purity:0.999,mintage:"Casa de Moneda"},
  {id:"kangaroo",name:"Kangaroo Or",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"nugget",name:"Nugget Or",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"lunar",name:"Lunar Or",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"kookaburra",name:"Kookaburra Or",countryName:"Australie",country:"🇦🇺",weight:31.1035,purity:0.9999,mintage:"Perth Mint"},
  {id:"panda",name:"Panda Or",countryName:"Chine",country:"🇨🇳",weight:31.1035,purity:0.999,mintage:"China Mint"},
  {id:"napoleon",name:"Napoléon 20F",countryName:"France",country:"🇫🇷",weight:6.45,purity:0.900,mintage:"Monnaie de Paris"},
  {id:"semeuse",name:"Semeuse Or 20F",countryName:"France",country:"🇫🇷",weight:6.45,purity:0.900,mintage:"Monnaie de Paris"},
  {id:"sovereign",name:"Sovereign",countryName:"Royaume-Uni",country:"🇬🇧",weight:7.99,purity:0.9167,mintage:"Royal Mint"},
  {id:"vreneli",name:"Vreneli",countryName:"Suisse",country:"🇨🇭",weight:6.45,purity:0.900,mintage:"Monnaie Fédérale Suisse"},
  {id:"buffalo",name:"Buffalo Or",countryName:"États-Unis",country:"🇺🇸",weight:31.1035,purity:0.9999,mintage:"US Mint"},
];

const SILVER_RETAIL = {
  maple:71.0,britannia:72.2,philharmonic:71.5,american_eagle:75.0,krugerrand:72.8,
  libertad:78.0,kookaburra:73.5,kangaroo:72.8,nugget:73.5,lunar:75.5,koala:73.0,
  wiener:72.0,panda:76.5,somalian:74.0,semeuse:58.0,hercule:65.0,france_be:67.0,
};
const GOLD_RETAIL = {
  maple:4010,britannia:4025,philharmonic:4005,american_eagle:4120,krugerrand:4060,
  libertad:4150,kangaroo:3995,nugget:4000,lunar:4060,kookaburra:4010,panda:4180,
  napoleon:415,semeuse:418,sovereign:520,vreneli:418,buffalo:4030,
};

const SILVER_SPOT_BASE = 63.00;
const GOLD_SPOT_BASE   = 3837.00;

const COUNTRIES_SILVER = ["Tous","France","Australie","Canada","Royaume-Uni","Autriche","États-Unis","Mexique","Afrique du Sud","Chine","Somalie"];
const COUNTRIES_GOLD   = ["Tous","France","Australie","Canada","Royaume-Uni","Autriche","États-Unis","Mexique","Afrique du Sud","Chine","Suisse"];
const FLAGS = {France:"🇫🇷",Australie:"🇦🇺",Canada:"🇨🇦","Royaume-Uni":"🇬🇧",Autriche:"🇦🇹","États-Unis":"🇺🇸",Mexique:"🇲🇽","Afrique du Sud":"🇿🇦",Chine:"🇨🇳",Somalie:"🇸🇴",Suisse:"🇨🇭",Tous:"🌍"};

const PIECES_CALC = [
  {label:"Maple Leaf Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Britannia Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Philharmonique Argent 1oz (.999)",poids:31.1035,purete:0.999,metal:"argent"},
  {label:"American Eagle Argent 1oz (.999)",poids:31.1035,purete:0.999,metal:"argent"},
  {label:"Krugerrand Argent 1oz (.999)",poids:31.1035,purete:0.999,metal:"argent"},
  {label:"Kookaburra Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Kangaroo Argent 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"argent"},
  {label:"Semeuse Argent 5F (22.2g/.900)",poids:22.2,purete:0.900,metal:"argent"},
  {label:"Hercule 5F Argent (25g/.900)",poids:25.0,purete:0.900,metal:"argent"},
  {label:"Maple Leaf Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Britannia Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Philharmonique Or 1oz (.9999)",poids:31.1035,purete:0.9999,metal:"or"},
  {label:"Krugerrand Or 1oz (.9167)",poids:33.93,purete:0.9167,metal:"or"},
  {label:"American Eagle Or 1oz (.9167)",poids:31.1035,purete:0.9167,metal:"or"},
  {label:"Napoléon 20F Or (6.45g/.900)",poids:6.45,purete:0.900,metal:"or"},
  {label:"Sovereign Or (7.99g/.9167)",poids:7.99,purete:0.9167,metal:"or"},
  {label:"Vreneli Or (6.45g/.900)",poids:6.45,purete:0.900,metal:"or"},
];

// ═══════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════
const fmt  = (n,d=2) => n.toLocaleString("fr-FR",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtE = (n,d=2) => fmt(n,d)+" €";
const pColor  = p => p<8?"#15803d":p<15?"#b45309":"#b91c1c";
const pBg     = p => p<8?"#f0fdf4":p<15?"#fffbeb":"#fef2f2";
const pBorder = p => p<8?"#86efac":p<15?"#fcd34d":"#fca5a5";

const inputStyle = (focus) => ({
  padding:"10px 14px",fontSize:"14px",
  background:focus?"#fffef8":"#fafaf6",
  border:`1px solid ${focus?"rgba(160,128,60,0.5)":"rgba(160,128,60,0.2)"}`,
  borderRadius:"10px",color:"#1a1208",fontFamily:"inherit",
  outline:"none",transition:"all 0.2s",width:"100%",boxSizing:"border-box",
});
const selectStyle = {
  padding:"10px 14px",fontSize:"13px",background:"#fafaf6",
  border:"1px solid rgba(160,128,60,0.2)",borderRadius:"10px",
  color:"#1a1208",fontFamily:"inherit",outline:"none",width:"100%",cursor:"pointer",
  appearance:"none",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a08040' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",paddingRight:"32px",
};

const Divider = ({label}) => (
  <div style={{display:"flex",alignItems:"center",gap:"12px",margin:"20px 0 16px"}}>
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

const Row = ({label,value,highlight,green,red,bold}) => (
  <div style={{
    display:"flex",justifyContent:"space-between",alignItems:"center",
    padding:"9px 14px",
    background:highlight?(green?"#f0fdf4":red?"#fef2f2":"#fffbeb"):"transparent",
    border:highlight?`1px solid ${green?"#86efac":red?"#fca5a5":"#fcd34d"}`:"none",
    borderRadius:highlight?"10px":"0",marginBottom:highlight?"4px":"0",
  }}>
    <span style={{fontSize:"12px",color:highlight?(green?"#15803d":red?"#b91c1c":"#b45309"):"#6b5030"}}>{label}</span>
    <span style={{fontSize:bold?"16px":"13px",fontWeight:bold?"700":"normal",
      color:highlight?(green?"#15803d":red?"#b91c1c":"#b45309"):"#1a1208",
      fontVariantNumeric:"tabular-nums"}}>{value}</span>
  </div>
);

// ═══════════════════════════════════════════════════════
//  SPOT TICKER (shared)
// ═══════════════════════════════════════════════════════
function useSpots() {
  const [silverSpot, setSilverSpot] = useState(SILVER_SPOT_BASE);
  const [goldSpot,   setGoldSpot]   = useState(GOLD_SPOT_BASE);
  const [silverTrend, setSilverTrend] = useState("stable");
  const [goldTrend,   setGoldTrend]   = useState("stable");
  const [lastUpdate,  setLastUpdate]  = useState(new Date());
  const prev = { s: silverSpot, g: goldSpot };

  const tick = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.metalpriceapi.com/v1/latest?api_key=b76a83a1d9f86a0d2248cde4bbebd4ae&base=EUR&currencies=XAG,XAU`
      );
      const data = await res.json();
      const sv = parseFloat((1 / data.rates.EURXAG).toFixed(2));
      const gv = parseFloat((1 / data.rates.EURXAU).toFixed(2));
      setSilverTrend(sv > silverSpot ? "up" : sv < silverSpot ? "down" : "stable");
      setGoldTrend(gv > goldSpot ? "up" : gv < goldSpot ? "down" : "stable");
      setSilverSpot(sv); setGoldSpot(gv);
      setLastUpdate(new Date());
    } catch(e) {
      console.error(e);
    }
  }, [silverSpot, goldSpot]);

  useEffect(()=>{tick();const iv=setInterval(tick,30000);return()=>clearInterval(iv);},[]);
  return {silverSpot,goldSpot,silverTrend,goldTrend,lastUpdate};
}

// ═══════════════════════════════════════════════════════
//  PAGE 1 — BULLION TRACKER
// ═══════════════════════════════════════════════════════
function BullionTracker({silverSpot,goldSpot,silverTrend,goldTrend,lastUpdate}) {
  const [metal,   setMetal]   = useState("silver");
  const [sortBy,  setSortBy]  = useState("premium");
  const [country, setCountry] = useState("Tous");

  const isGold   = metal==="gold";
  const spot     = isGold ? goldSpot   : silverSpot;
  const baseSpot = isGold ? GOLD_SPOT_BASE : SILVER_SPOT_BASE;
  const retail   = isGold ? GOLD_RETAIL   : SILVER_RETAIL;
  const bullions = isGold ? GOLD_BULLIONS : SILVER_BULLIONS;
  const countries= isGold ? COUNTRIES_GOLD : COUNTRIES_SILVER;
  const trend    = isGold ? goldTrend   : silverTrend;
  const accent   = isGold ? "#b8860b"   : "#a08040";
  const accentL  = isGold ? "#f5d060"   : "#d4c090";

  const getRetail  = b => parseFloat(((retail[b.id]||baseSpot*1.1)+(spot-baseSpot)).toFixed(2));
  const getMetal   = b => parseFloat((spot*(b.weight/31.1035)*b.purity).toFixed(isGold?0:2));
  const getPremium = b => {
    const r=getRetail(b), m=spot*(b.weight/31.1035)*b.purity;
    return parseFloat((((r-m)/m)*100).toFixed(1));
  };

  const switchMetal = m => { setMetal(m); setCountry("Tous"); };

  const filtered = bullions.filter(b=>country==="Tous"||b.countryName===country);
  const sorted   = [...filtered].sort((a,b)=>{
    if(sortBy==="premium") return getPremium(a)-getPremium(b);
    if(sortBy==="price")   return getRetail(a)-getRetail(b);
    return a.name.localeCompare(b.name);
  });
  const bestDeal = [...bullions].sort((a,b)=>getPremium(a)-getPremium(b))[0];

  return (
    <div>
      {/* Metal tabs */}
      <div style={{display:"flex",gap:"0",marginBottom:"18px",borderRadius:"12px",overflow:"hidden",border:"1px solid rgba(170,140,70,0.2)",width:"fit-content"}}>
        {[{v:"silver",l:"🥈 Argent"},{v:"gold",l:"🥇 Or"}].map(t=>(
          <button key={t.v} onClick={()=>switchMetal(t.v)} style={{
            padding:"9px 26px",fontSize:"13px",
            background:metal===t.v?(t.v==="gold"?"linear-gradient(135deg,#fef6c8,#fde080)":"#1a1208"):"rgba(255,255,255,0.6)",
            border:"none",color:metal===t.v?(t.v==="gold"?"#7a5008":"white"):"#6b5030",
            cursor:"pointer",transition:"all 0.25s",fontFamily:"inherit",fontWeight:metal===t.v?"600":"normal",
            borderRight:t.v==="silver"?"1px solid rgba(170,140,70,0.2)":"none",
          }}>{t.l}</button>
        ))}
      </div>

      {/* Best deal */}
      <div style={{
        marginBottom:"16px",
        background:isGold?"linear-gradient(90deg,#fffbeb,#fffef5)":"linear-gradient(90deg,#f0fdf4,#fafffe)",
        border:`1px solid ${isGold?"#fcd34d":"#86efac"}`,borderRadius:"10px",
        padding:"9px 15px",fontSize:"12px",color:isGold?"#b45309":"#15803d",
        display:"flex",alignItems:"center",gap:"8px",
      }}>
        <span>✦</span>
        <span>Prime la plus basse : <strong>{bestDeal.name} {bestDeal.country}</strong> à +{getPremium(bestDeal)}% — {fmt(getRetail(bestDeal),isGold?0:2)} €</span>
      </div>

      {/* Controls */}
      <div style={{display:"flex",gap:"18px",marginBottom:"18px",flexWrap:"wrap",alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize:"8px",letterSpacing:"2px",color:accent,textTransform:"uppercase",marginBottom:"5px"}}>Trier par</div>
          <div style={{display:"flex",gap:"6px"}}>
            {[{l:"Prime ↑",v:"premium"},{l:"Prix",v:"price"},{l:"Nom",v:"name"}].map(s=>(
              <button key={s.v} onClick={()=>setSortBy(s.v)} style={{
                padding:"5px 13px",fontSize:"11px",
                background:sortBy===s.v?(isGold?"#b8860b":"#1a1208"):"white",
                border:`1px solid ${sortBy===s.v?(isGold?"#b8860b":"#1a1208"):accentL}`,
                borderRadius:"20px",color:sortBy===s.v?"white":"#6b5030",
                cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
              }}>{s.l}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:"8px",letterSpacing:"2px",color:accent,textTransform:"uppercase",marginBottom:"5px"}}>Pays</div>
          <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
            {countries.map(c=>(
              <button key={c} onClick={()=>setCountry(c)} style={{
                padding:"4px 10px",fontSize:"11px",
                background:country===c?(isGold?"#b8860b":"#1a1208"):"white",
                border:`1px solid ${country===c?(isGold?"#b8860b":"#1a1208"):accentL}`,
                borderRadius:"20px",color:country===c?"white":"#6b5030",
                cursor:"pointer",transition:"all 0.2s",fontFamily:"inherit",
                display:"flex",alignItems:"center",gap:"4px",
              }}>
                <span>{FLAGS[c]}</span>{c==="Tous"&&<span>Tous</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{fontSize:"10px",color:"#b0926a",marginBottom:"14px"}}>
        {sorted.length} pièce{sorted.length>1?"s":""} · {country==="Tous"?"monde entier":country} · {lastUpdate.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
      </div>

      {/* Cards grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))",gap:"13px"}}>
        {sorted.map((b,i)=>{
          const premium=getPremium(b),retailP=getRetail(b),metalV=getMetal(b);
          const isBest=b.id===bestDeal.id;
          const pc=pColor(premium),pb=pBg(premium),pbo=pBorder(premium);
          return(
            <div key={b.id+metal} style={{
              background:isGold?"rgba(255,253,240,0.95)":"rgba(255,255,255,0.94)",
              border:`1.5px solid ${isBest?(isGold?"#fcd34d":"#86efac"):(isGold?"rgba(184,134,11,0.18)":"rgba(170,140,70,0.15)")}`,
              borderRadius:"18px",padding:"18px 20px",
              boxShadow:isBest?(isGold?"0 6px 28px rgba(184,134,11,0.13)":"0 6px 28px rgba(21,128,61,0.1)"):"0 2px 12px rgba(160,128,60,0.07)",
              animation:`fadeUp 0.32s ease ${i*0.026}s both`,position:"relative",overflow:"hidden",
            }}>
              <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:"2px",
                background:isBest?(isGold?"linear-gradient(90deg,transparent,#fcd34d,transparent)":"linear-gradient(90deg,transparent,#86efac,transparent)")
                  :(isGold?"linear-gradient(90deg,transparent,rgba(184,134,11,0.3),transparent)":"linear-gradient(90deg,transparent,rgba(160,128,60,0.25),transparent)")}}/>
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"13px"}}>
                <div style={{width:"58px",height:"58px",borderRadius:"50%",flexShrink:0,
                  background:isGold?"linear-gradient(145deg,#fffcec,#fef0b0)":"linear-gradient(145deg,#f8f4ec,#ede8dc)",
                  border:`1px solid ${isGold?"rgba(184,134,11,0.25)":"rgba(160,128,60,0.2)"}`,
                  boxShadow:"0 2px 10px rgba(0,0,0,0.09),inset 0 1px 2px rgba(255,255,255,0.9)",
                  display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                  <CoinSVG id={b.id} metal={metal} size={54}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:"14px",fontWeight:"600",color:"#1a1208",lineHeight:1.2}}>{b.name}</div>
                  <div style={{fontSize:"10px",color:accent,marginTop:"3px"}}>{b.country} {b.countryName} · {(b.purity*1000).toFixed(0)}/1000</div>
                  <div style={{fontSize:"9px",color:isGold?"#c4a020":"#c4a870",marginTop:"1px",fontStyle:"italic"}}>{b.mintage}</div>
                </div>
                {isBest&&<span style={{fontSize:"8px",letterSpacing:"1px",textTransform:"uppercase",background:isGold?"#fffbeb":"#f0fdf4",color:isGold?"#b45309":"#15803d",border:`1px solid ${isGold?"#fcd34d":"#86efac"}`,borderRadius:"20px",padding:"2px 8px",whiteSpace:"nowrap",flexShrink:0}}>✦ Top</span>}
              </div>
              <div style={{height:"1px",background:isGold?"rgba(184,134,11,0.1)":"rgba(160,128,60,0.1)",margin:"0 0 12px"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:"8px"}}>
                <div>
                  <div style={{fontSize:"9px",letterSpacing:"2px",color:accent,textTransform:"uppercase",marginBottom:"2px"}}>Prix marché</div>
                  <div style={{fontSize:"22px",color:"#1a1208",fontVariantNumeric:"tabular-nums",letterSpacing:"-0.5px"}}>{fmt(retailP,isGold?0:2)} €</div>
                </div>
                <div style={{background:pb,border:`1px solid ${pbo}`,borderRadius:"11px",padding:"7px 13px",textAlign:"center",flexShrink:0}}>
                  <div style={{fontSize:"8px",color:pc,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"1px"}}>Prime</div>
                  <div style={{fontSize:"19px",fontWeight:"700",color:pc,fontVariantNumeric:"tabular-nums"}}>+{premium}%</div>
                </div>
              </div>
              <div style={{marginTop:"10px",display:"flex",justifyContent:"space-between",background:isGold?"#fffef5":"#fafaf6",borderRadius:"8px",padding:"6px 11px",border:`1px solid ${isGold?"rgba(184,134,11,0.1)":"rgba(160,128,60,0.1)"}`}}>
                <span style={{fontSize:"10px",color:accent}}>Valeur métal</span>
                <span style={{fontSize:"10px",color:"#6b5030",fontVariantNumeric:"tabular-nums"}}>{fmt(metalV,isGold?0:2)} €</span>
              </div>
              <div style={{marginTop:"9px"}}>
                <div style={{height:"3px",background:isGold?"#f5edd0":"#f0ece2",borderRadius:"2px",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${Math.min((premium/25)*100,100)}%`,background:`linear-gradient(90deg,${pc}50,${pc})`,borderRadius:"2px",transition:"width 0.7s ease"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:"2px"}}>
                  <span style={{fontSize:"8px",color:accentL}}>0%</span>
                  <span style={{fontSize:"8px",color:accentL}}>+25%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  PAGE 2 — CALCULATEUR PRIME
// ═══════════════════════════════════════════════════════
function CalculateurPrime({silverSpot,goldSpot}) {
  const [pieceId, setPieceId] = useState("");
  const [prixPaye,setPrixPaye]= useState("");
  const [poidsM,  setPoidsM]  = useState("");
  const [pureteM, setPureteM] = useState("");
  const [metalM,  setMetalM]  = useState("argent");
  const [qteM,    setQteM]    = useState("1");
  const [f1,setF1]= useState(false);

  useEffect(()=>{
    if(!pieceId) return;
    const p=PIECES_CALC[parseInt(pieceId)];
    setPoidsM(p.poids.toString()); setPureteM(p.purete.toString()); setMetalM(p.metal);
  },[pieceId]);

  const spot = metalM==="or" ? goldSpot : silverSpot;
  const prix=parseFloat(prixPaye)||0, poids=parseFloat(poidsM)||0;
  const purete=parseFloat(pureteM)||0, qte=parseInt(qteM)||1;

  let res = null;
  if(prix>0&&poids>0&&purete>0){
    const valMetal = spot*(poids/31.1035)*purete;
    const prime=prix-valMetal, primePct=((prime/valMetal)*100);
    res={valMetal,prime,primePct};
  }

  return(
    <div style={{maxWidth:"600px",margin:"0 auto"}}>
      <div style={{background:"rgba(255,255,255,0.94)",border:"1px solid rgba(170,140,70,0.15)",borderRadius:"20px",padding:"24px 26px",boxShadow:"0 2px 20px rgba(160,128,60,0.07)"}}>
        <p style={{fontSize:"11px",color:"#b0926a",margin:"0 0 4px",lineHeight:1.7}}>
          Calculez la prime réelle payée par rapport à la valeur métal spot au moment de votre achat.
        </p>
        <Divider label="Pièce"/>
        <Field label="Sélection rapide" hint="optionnel">
          <select value={pieceId} onChange={e=>setPieceId(e.target.value)} style={selectStyle}>
            <option value="">— Choisir une pièce connue —</option>
            <optgroup label="🥈 Argent">{PIECES_CALC.filter(p=>p.metal==="argent").map((p,i)=><option key={i} value={PIECES_CALC.indexOf(p)}>{p.label}</option>)}</optgroup>
            <optgroup label="🥇 Or">{PIECES_CALC.filter(p=>p.metal==="or").map((p,i)=><option key={i} value={PIECES_CALC.indexOf(p)}>{p.label}</option>)}</optgroup>
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
          <Field label="Poids" hint="grammes"><input type="number" value={poidsM} onChange={e=>setPoidsM(e.target.value)} style={inputStyle(false)} placeholder="31.1035"/></Field>
          <Field label="Pureté" hint="ex: 0.9999"><input type="number" step="0.0001" value={pureteM} onChange={e=>setPureteM(e.target.value)} style={inputStyle(false)} placeholder="0.9999"/></Field>
        </div>
        <div style={{marginTop:"14px"}}>
          <Field label="Prix payé" hint="€ / pièce">
            <input type="number" value={prixPaye} onChange={e=>setPrixPaye(e.target.value)} onFocus={()=>setF1(true)} onBlur={()=>setF1(false)} style={inputStyle(f1)} placeholder="38.50"/>
          </Field>
        </div>

        {res ? (
          <>
            <Divider label="Résultat"/>
            <div style={{fontSize:"10px",color:"#b0926a",marginBottom:"10px",padding:"7px 14px",background:"#fffbeb",borderRadius:"8px",border:"1px solid #fde68a"}}>
              ⚠️ Spot utilisé (démo) : {metalM==="or"?`${fmt(goldSpot)} €/oz`:`${fmt(silverSpot)} €/oz`}
            </div>
            <Row label="Valeur métal intrinsèque" value={fmtE(res.valMetal)}/>
            <Row label="Prix payé" value={fmtE(prix)}/>
            <div style={{height:"1px",background:"rgba(160,128,60,0.1)",margin:"6px 0"}}/>
            <Row label="Prime absolue" value={`${res.prime>=0?"+":""}${fmtE(res.prime)}`} highlight green={res.primePct<12} red={res.primePct>20} bold/>
            <Row label="Prime en %" value={`${res.primePct>=0?"+":""}${fmt(res.primePct)}%`} highlight green={res.primePct<12} red={res.primePct>20} bold/>
            {qte>1&&<><Divider label={`Pour ${qte} pièces`}/><Row label="Total investi" value={fmtE(prix*qte)}/><Row label="Prime totale" value={`+${fmtE(res.prime*qte)}`} highlight bold/></>}
            <div style={{marginTop:"14px",padding:"12px 16px",background:res.primePct<12?"#f0fdf4":res.primePct<20?"#fffbeb":"#fef2f2",border:`1px solid ${res.primePct<12?"#86efac":res.primePct<20?"#fcd34d":"#fca5a5"}`,borderRadius:"12px",fontSize:"12px",color:res.primePct<12?"#15803d":res.primePct<20?"#b45309":"#b91c1c",lineHeight:1.6}}>
              {res.primePct<8&&"✦ Excellente affaire — prime très basse."}
              {res.primePct>=8&&res.primePct<12&&"✦ Bon prix — prime dans les standards du marché."}
              {res.primePct>=12&&res.primePct<20&&"⚠ Prime élevée — cherchez une alternative."}
              {res.primePct>=20&&"✗ Prime très élevée — justifiée uniquement pour pièces rares."}
            </div>
          </>
        ):(
          <div style={{marginTop:"20px",textAlign:"center",color:"#c4b080",fontSize:"12px",fontStyle:"italic"}}>Remplissez les champs pour calculer la prime</div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  PAGE 3 — SIMULATEUR FISCAL
// ═══════════════════════════════════════════════════════
function SimulateurFiscal() {
  const [prixCession,setPrixCession]=useState("");
  const [prixAchat,  setPrixAchat]  =useState("");
  const [annees,     setAnnees]     =useState("");
  const [metalT,     setMetalT]     =useState("or");
  const [f1,setF1]=useState(false),[f2,setF2]=useState(false);

  const cession=parseFloat(prixCession)||0, achat=parseFloat(prixAchat)||0, ans=parseInt(annees)||0;

  let res=null;
  if(cession>0){
    if(cession<5000){ res={exonere:true}; }
    else {
      const taxeF=cession*0.115;
      let taxePV=null,abatt=0,pv=0,pvImp=0;
      if(achat>0){
        pv=cession-achat;
        if(ans>=3) abatt=Math.min((ans-2)*0.05,1.0);
        pvImp=Math.max(pv*(1-abatt),0);
        taxePV=ans>=22?0:pvImp*0.36172;
      }
      res={taxeF,taxePV,pv,abatt,pvImp,best:taxePV!==null?(taxePV<taxeF?"pv":"forfait"):"forfait",ans};
    }
  }

  return(
    <div style={{maxWidth:"600px",margin:"0 auto"}}>
      <div style={{background:"rgba(255,255,255,0.85)",border:"1px solid rgba(170,140,70,0.2)",borderRadius:"14px",padding:"14px 18px",marginBottom:"14px",fontSize:"11px",color:"#6b5030",lineHeight:1.7}}>
        <strong style={{color:"#1a1208"}}>Régime fiscal FR — Métaux précieux (CGI art. 150 VI)</strong><br/>
        <strong>① Forfait 11,5%</strong> sur le prix de cession brut · <strong>② Plus-values 36,17%</strong> avec abattement 5%/an dès la 3e année → exonération à 22 ans · <strong>Exonération</strong> si cession &lt; 5 000 €
      </div>
      <div style={{background:"rgba(255,255,255,0.94)",border:"1px solid rgba(170,140,70,0.15)",borderRadius:"20px",padding:"24px 26px",boxShadow:"0 2px 20px rgba(160,128,60,0.07)"}}>
        <Divider label="Opération"/>
        <Field label="Métal">
          <select value={metalT} onChange={e=>setMetalT(e.target.value)} style={selectStyle}>
            <option value="or">🥇 Or</option><option value="argent">🥈 Argent</option>
          </select>
        </Field>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"14px"}}>
          <Field label="Prix de cession" hint="€ total"><input type="number" value={prixCession} onChange={e=>setPrixCession(e.target.value)} onFocus={()=>setF1(true)} onBlur={()=>setF1(false)} style={inputStyle(f1)} placeholder="3500"/></Field>
          <Field label="Prix d'achat" hint="optionnel"><input type="number" value={prixAchat} onChange={e=>setPrixAchat(e.target.value)} onFocus={()=>setF2(true)} onBlur={()=>setF2(false)} style={inputStyle(f2)} placeholder="2800"/></Field>
        </div>
        <div style={{marginTop:"14px"}}>
          <Field label="Années de détention" hint="pour abattement PV"><input type="number" min="0" value={annees} onChange={e=>setAnnees(e.target.value)} style={inputStyle(false)} placeholder="5"/></Field>
        </div>

        {res&&(
          <>
            <Divider label="Résultat fiscal"/>
            {res.exonere?(
              <Row label="Cession < 5 000 € → Exonération totale" value="0,00 €" highlight green bold/>
            ):(
              <>
                <div style={{fontSize:"10px",letterSpacing:"2px",color:"#b0926a",textTransform:"uppercase",marginBottom:"8px"}}>① Taxe forfaitaire (11,5%)</div>
                <Row label="Taxe forfaitaire due" value={fmtE(res.taxeF)} highlight red={res.best==="pv"} bold/>
                <Row label="Net perçu" value={fmtE(cession-res.taxeF)}/>
                {res.taxePV!==null&&(
                  <>
                    <Divider label="② Régime plus-values"/>
                    <Row label="Plus-value brute" value={fmtE(res.pv)}/>
                    {ans>=3&&<Row label={`Abattement ${Math.min((ans-2)*5,100)}% (${ans} ans)`} value={`-${fmtE(res.pv*res.abatt)}`}/>}
                    {ans>=22?(
                      <Row label="Exonération totale (≥ 22 ans)" value="0,00 €" highlight green bold/>
                    ):(
                      <><Row label="Taxe PV due (36,17%)" value={fmtE(res.taxePV)} highlight green={res.best==="pv"} red={res.best==="forfait"} bold/><Row label="Net perçu" value={fmtE(cession-res.taxePV)}/></>
                    )}
                    <Divider label="Recommandation"/>
                    <div style={{padding:"13px 16px",background:res.best==="pv"||ans>=22?"#f0fdf4":"#fffbeb",border:`1px solid ${res.best==="pv"||ans>=22?"#86efac":"#fcd34d"}`,borderRadius:"12px",fontSize:"12px",color:res.best==="pv"||ans>=22?"#15803d":"#b45309",lineHeight:1.7}}>
                      {ans>=22?"✦ Exonération totale — 22 ans atteints.":res.best==="pv"?`✦ Régime PV avantageux — économie de ${fmtE(res.taxeF-res.taxePV)}. Conservez vos justificatifs.`:"⚠ Régime forfaitaire avantageux — appliquez le forfait 11,5%."}
                      {ans<22&&ans>=3&&<span style={{display:"block",marginTop:"5px",fontSize:"11px"}}>↗ Exonération totale dans {22-ans} an{22-ans>1?"s":""}.</span>}
                    </div>
                  </>
                )}
                {res.taxePV===null&&<div style={{marginTop:"12px",fontSize:"11px",color:"#b0926a",fontStyle:"italic",lineHeight:1.6}}>💡 Renseignez votre prix d'achat pour comparer les deux régimes.</div>}
              </>
            )}
          </>
        )}
        {!res&&<div style={{marginTop:"20px",textAlign:"center",color:"#c4b080",fontSize:"12px",fontStyle:"italic"}}>Entrez le prix de cession pour simuler votre fiscalité</div>}
      </div>
      <div style={{marginTop:"12px",fontSize:"10px",color:"#c4a870",lineHeight:1.7,padding:"0 4px"}}>
        ⚠ Simulation indicative. Consultez un conseiller fiscal. Taux en vigueur au 01/06/2026.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════
const NAV = [
  { id:"tracker",  label:"📊 Bullions",       sub:"Or & Argent" },
  { id:"prime",    label:"🧮 Prime",           sub:"Calculateur" },
  { id:"fiscalite",label:"🏛️ Fiscalité",      sub:"Simulateur FR" },
];

export default function MetalTracker() {
  const [page, setPage] = useState("tracker");
  const [apiNote, setApiNote] = useState(true);
  const spots = useSpots();

  const activeNav = NAV.find(n=>n.id===page);

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

      {/* ── TOP HEADER ── */}
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(255,255,255,0.92)",
        backdropFilter:"blur(24px)",
        borderBottom:"1px solid rgba(170,140,70,0.18)",
        boxShadow:"0 2px 24px rgba(160,130,60,0.07)",
      }}>
        {/* API note */}
        {apiNote&&(
          <div style={{background:"#fffbeb",borderBottom:"1px solid #fde68a",padding:"7px 24px",fontSize:"10px",color:"#92400e",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span>⚠️ <strong>Mode démo</strong> — spots simulés (argent ~{SILVER_SPOT_BASE}€ · or ~{GOLD_SPOT_BASE.toLocaleString("fr-FR")}€/oz). Connectez <code style={{background:"#fef3c7",padding:"1px 4px",borderRadius:"3px"}}>MetalpriceAPI</code> pour les cours réels.</span>
            <button onClick={()=>setApiNote(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"16px",color:"#92400e",padding:"0 0 0 12px",lineHeight:1}}>×</button>
          </div>
        )}

        <div style={{maxWidth:"1080px",margin:"0 auto",padding:"0 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0 10px",flexWrap:"wrap",gap:"12px"}}>

            {/* Logo */}
            <div style={{display:"flex",alignItems:"baseline",gap:"10px"}}>
              <span style={{fontSize:"22px",fontWeight:"normal",color:"#1a1208",letterSpacing:"0.5px"}}>MetalTracker</span>
              <span style={{fontSize:"9px",letterSpacing:"3px",color:"#b0926a",textTransform:"uppercase"}}>Or & Argent</span>
            </div>

            {/* Dual spot pill */}
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
                  <div style={{fontSize:"16px",fontWeight:"bold",fontVariantNumeric:"tabular-nums",
                    color:s.trend==="up"?"#15803d":s.trend==="down"?"#b91c1c":s.gold?"#b8860b":"#92701a",transition:"color 0.4s"}}>
                    {fmt(s.val)} €
                    <span style={{fontSize:"10px",marginLeft:"3px"}}>{s.trend==="up"?"▲":s.trend==="down"?"▼":"●"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav tabs */}
          <div style={{display:"flex",gap:"0",borderTop:"1px solid rgba(170,140,70,0.1)"}}>
            {NAV.map((n,i)=>(
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

      {/* ── PAGE CONTENT ── */}
      <div style={{position:"relative",zIndex:1,maxWidth:"1080px",margin:"0 auto",padding:"26px 20px 48px"}}>

        {/* Page title */}
        <div style={{marginBottom:"22px"}}>
          <div style={{fontSize:"9px",letterSpacing:"5px",color:"#b0926a",textTransform:"uppercase",marginBottom:"4px"}}>✦ MetalTracker</div>
          <h2 style={{fontSize:"22px",fontWeight:"normal",margin:0,color:"#1a1208"}}>
            {activeNav?.label}
            <span style={{fontSize:"12px",letterSpacing:"3px",color:"#b0926a",fontWeight:"normal",marginLeft:"12px",textTransform:"uppercase"}}>{activeNav?.sub}</span>
          </h2>
        </div>

        {page==="tracker"   && <BullionTracker {...spots}/>}
        {page==="prime"     && <CalculateurPrime silverSpot={spots.silverSpot} goldSpot={spots.goldSpot}/>}
        {page==="fiscalite" && <SimulateurFiscal/>}
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        position:"relative",zIndex:1,
        borderTop:"1px solid rgba(160,128,60,0.1)",
        padding:"18px 24px",
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px",
        background:"rgba(255,255,255,0.5)",
      }}>
        <span style={{fontSize:"12px",color:"#1a1208",letterSpacing:"1px"}}>MetalTracker <span style={{color:"#b0926a",fontSize:"10px"}}>Or & Argent</span></span>
        <span style={{fontSize:"9px",color:"#c4a870",letterSpacing:"1.5px",textTransform:"uppercase"}}>Données indicatives · Mode démo · Connecter MetalpriceAPI</span>
        <span style={{fontSize:"9px",color:"#c4a870",letterSpacing:"1px"}}>{new Date().getFullYear()} · Tous droits réservés</span>
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        button:hover{opacity:0.82}
        input:focus,select:focus{outline:none}
      `}</style>
    </div>
  );
}
