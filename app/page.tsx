"use client";

import { useMemo, useState } from "react";

type Ad = { id:number; x:number; y:number; w:number; h:number; name:string; tagline:string; url:string; emoji:string };
const ADS: Ad[] = [
 {id:1,x:2,y:3,w:13,h:9,name:"Nova AI",tagline:"Build with AI",url:"#",emoji:"✦"},
 {id:2,x:17,y:5,w:9,h:13,name:"Orbit Labs",tagline:"Software for tomorrow",url:"#",emoji:"◉"},
 {id:3,x:29,y:2,w:17,h:8,name:"PixelPay",tagline:"Payments made simple",url:"#",emoji:"₿"},
 {id:4,x:49,y:4,w:12,h:14,name:"GameForge",tagline:"Make games",url:"#",emoji:"◆"},
 {id:5,x:64,y:2,w:20,h:10,name:"CloudStack",tagline:"Ship faster",url:"#",emoji:"☁"},
 {id:6,x:87,y:5,w:10,h:17,name:"Creator Hub",tagline:"For creators",url:"#",emoji:"★"},
 {id:7,x:5,y:24,w:18,h:15,name:"Acme",tagline:"Your next big thing",url:"#",emoji:"A"},
 {id:8,x:26,y:20,w:11,h:18,name:"DevTools",tagline:"Code better",url:"#",emoji:"</>"},
 {id:9,x:40,y:22,w:22,h:12,name:"FutureX",tagline:"Technology, reimagined",url:"#",emoji:"FX"},
 {id:10,x:66,y:20,w:14,h:18,name:"LaunchPad",tagline:"Launch your startup",url:"#",emoji:"↗"},
 {id:11,x:83,y:26,w:12,h:12,name:"Studio 9",tagline:"Design & brand",url:"#",emoji:"9"},
 {id:12,x:3,y:43,w:10,h:18,name:"Finly",tagline:"Finance for everyone",url:"#",emoji:"$"},
 {id:13,x:16,y:42,w:21,h:11,name:"AI Works",tagline:"AI automation",url:"#",emoji:"AI"},
 {id:14,x:40,y:39,w:13,h:20,name:"Northstar",tagline:"Find your direction",url:"#",emoji:"✦"},
 {id:15,x:57,y:42,w:19,h:13,name:"IndieCo",tagline:"Small teams, big ideas",url:"#",emoji:"●"},
 {id:16,x:80,y:41,w:17,h:19,name:"Web3 World",tagline:"The open web",url:"#",emoji:"◇"}
];
const totalPixels=1000000, soldPixels=327450, revenue=327450;

export default function Home(){
 const [selected,setSelected]=useState<{x:number;y:number;w:number;h:number}|null>(null);
 const [showBuy,setShowBuy]=useState(false); const [email,setEmail]=useState("");
 const price=useMemo(()=>selected?selected.w*selected.h:0,[selected]);
 function selectArea(){const w=Math.floor(8+Math.random()*12),h=Math.floor(8+Math.random()*10);const x=Math.floor(5+Math.random()*(92-w)),y=Math.floor(8+Math.random()*(82-h));setSelected({x,y,w,h});setShowBuy(true)}
 return <main>
  <nav className="nav"><div className="brand"><span className="brandMark">■</span> PIXEL MILLION</div><div className="navLinks"><a href="#wall">Wall</a><a href="#how">How it works</a><a href="#story">The mission</a><button onClick={selectArea}>Buy pixels</button></div></nav>
  <section className="hero"><div className="eyebrow">THE $1,000,000 INTERNET WALL</div><h1>Own a piece of<br/><span>the Internet.</span></h1><p className="heroText">One million pixels. One permanent digital billboard. Put your brand on the wall and become part of Internet history.</p><div className="heroActions"><button className="primary" onClick={selectArea}>Buy your pixels <span>↗</span></button><a className="secondary" href="#wall">Explore the wall ↓</a></div><div className="stats"><div><strong>${revenue.toLocaleString()}</strong><span>raised</span></div><div><strong>{soldPixels.toLocaleString()}</strong><span>pixels sold</span></div><div><strong>{((soldPixels/totalPixels)*100).toFixed(1)}%</strong><span>of the wall</span></div></div></section>
  <section id="wall" className="wallSection"><div className="sectionTop"><div><div className="eyebrow">LIVE INVENTORY</div><h2>The Million Pixel Wall</h2></div><div className="legend"><span className="dot soldDot"/> Sold <span className="dot openDot"/> Available</div></div>
   <div className="wallShell"><div className="wall">{ADS.map(ad=><a key={ad.id} className="ad" href={ad.url} style={{left:`${ad.x}%`,top:`${ad.y}%`,width:`${ad.w}%`,height:`${ad.h}%`}} onClick={e=>e.preventDefault()}><span className="adEmoji">{ad.emoji}</span><strong>{ad.name}</strong><small>{ad.tagline}</small></a>)}{selected&&<div className="selection" style={{left:`${selected.x}%`,top:`${selected.y}%`,width:`${selected.w}%`,height:`${selected.h}%`}}/>}<div className="grid"/></div><div className="wallHint">Click an ad to visit it · Select an open area to buy</div></div>
   <div className="inventoryBar"><span>{(totalPixels-soldPixels).toLocaleString()} pixels remaining</span><div className="bar"><i style={{width:`${soldPixels/totalPixels*100}%`}}/></div><span>${(totalPixels-soldPixels).toLocaleString()} inventory value at $1/pixel</span></div>
  </section>
  <section id="how" className="how"><div className="eyebrow">HOW IT WORKS</div><h2>Three steps to your<br/>piece of the wall.</h2><div className="steps"><article><span>01</span><h3>Choose your space</h3><p>Pick an available block on the million-pixel canvas. Bigger spaces make bigger statements.</p></article><article><span>02</span><h3>Make it yours</h3><p>Upload your logo, write a short message and add the website you want visitors to discover.</p></article><article><span>03</span><h3>Go live</h3><p>Complete checkout and your permanent ad goes live on the wall for everyone to see.</p></article></div></section>
  <section id="story" className="mission"><div><div className="eyebrow">THE MISSION</div><h2>$1,000,000.<br/>One wall.</h2></div><div className="missionCopy"><p>We are building a public digital landmark where startups, creators, businesses and curious people can literally own a piece of the canvas.</p><p>Every purchase moves the wall closer to its million-dollar goal. When the final pixel sells, the wall becomes a permanent snapshot of the people who made it happen.</p></div></section>
  <footer><div className="brand"><span className="brandMark">■</span> PIXEL MILLION</div><span>© 2026 · Own a piece of the Internet.</span></footer>
  {showBuy&&selected&&<div className="modalBackdrop" onClick={()=>setShowBuy(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowBuy(false)}>×</button><div className="eyebrow">RESERVE YOUR SPACE</div><h2>{selected.w*selected.h} pixels.</h2><p className="modalText">Your selected block is <b>{selected.w} × {selected.h}</b>. MVP pricing is <b>${price}</b> at $1 per pixel.</p><label>Email address<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" type="email"/></label><button className="primary full" onClick={()=>alert("Checkout is the next integration: connect Stripe/Razorpay here.")}>Continue to checkout · ${price}</button><small className="note">Demo checkout — no payment is processed in this MVP.</small></div></div>}
 </main>
}