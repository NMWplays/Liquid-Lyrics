// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{function F(e,t=1e4){return new Promise((n,r)=>{let i=Date.now(),a=setInterval(()=>{let s=e();s?(clearInterval(a),n(s)):Date.now()-i>t&&(clearInterval(a),r(new Error("wait() timed out")))},100)})}var ot="5.19.11",nn=["spicy","spotify"];async function ct({id:e}){try{let t=e.includes(":")?e.split(":")[2]:e,n="https://spclient.wg.spotify.com/color-lyrics/v2/track/",r;try{r=await(await F(()=>Spicetify.CosmosAsync?.get))(`${n}${t}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let i=r?.lyrics;if(!i)return{status:"missing_lyrics",data:null};let a=i.lines,s;if(i.syncType==="LINE_SYNCED"){let o=a.map((l,c)=>{let u=Number(l.startTimeMs)||0,d=c<a.length-1?Number(a[c+1].startTimeMs):u+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:u,EndTime:d,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:u,EndTime:d,OppositeAligned:!1,IsRTL:!1}});s={Id:t,Type:"Line",SongWriters:[],Content:o,StartTime:o.length>0?o[0].StartTime:0,EndTime:o.length>0?o[o.length-1].EndTime:0,Provider:"spotify"}}else s={Id:t,Type:"Static",SongWriters:[],Lines:a.map(o=>({Text:o.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:s}}catch(t){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:t instanceof Error?t.message:String(t)}}}}var an=["https://api.spicylyrics.org","https://coregateway.spicylyrics.org","https://lcgateway.spikerko.org"],ut=an[0];async function ln(e,t){try{return await rn(ut,e,t)}catch{for(let n of an)if(n!==ut)try{let r=await rn(n,e,t);return ut=n,r}catch{continue}}throw new Error("All nodes are currently unreachable")}async function rn(e,t,n){let r=await fetch(`${e}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":ot,...n&&{"SpicyLyrics-WebAuth":n}},body:JSON.stringify({queries:t,client:{version:ot}})});if(!r.ok)throw new Error(`Node ${e} failed`);return r.json()}var Y,ae;async function sn(){return Y&&Y.expiresAtTime-Date.now()>2e3?Y.accessToken:ae||(ae=(async()=>{let e=await F(()=>Spicetify.CosmosAsync),t=await F(()=>Spicetify.Platform);try{Y=await e.get("sp://oauth/v2/token")}catch(n){n.message?.includes("Resolver not found")&&t.Session&&(Y={accessToken:t.Session.accessToken,expiresAtTime:t.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{ae=void 0}if(!Y)throw new Error("Could not retrieve Spotify Access Token");return Y.accessToken})(),ae)}async function cn({id:e}){try{let t=await Pr(e),n=Ir(t);if(!t||!n)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let r=Hr(n.result);if(r.status==="missing_lyrics")return{status:"missing_lyrics",data:null};if(r.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:r.message}};let i=r.data;return i.Provider="spicy",Rr(i),{status:"success",data:i}}catch(t){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:t instanceof Error?t.message:String(t)}}}}async function Pr(e){let n=`Bearer ${await sn()}`;return await ln([{operation:"lyrics",variables:{id:e,auth:"SpicyLyrics-WebAuth"}}],n)}function Rr(e){if(e.Type==="Static")return;let t=n=>Math.round(Number(n||0)*1e3);if(e.StartTime=t(e.StartTime),e.EndTime=t(e.EndTime),e.Type==="Syllable")for(let n of e.Content){if(n.Lead){n.Lead.StartTime=t(n.Lead.StartTime),n.Lead.EndTime=t(n.Lead.EndTime);for(let r of n.Lead.Syllables)r.StartTime=t(r.StartTime),r.EndTime=t(r.EndTime)}if(n.Background)for(let r of n.Background){r.StartTime=t(r.StartTime),r.EndTime=t(r.EndTime);for(let i of r.Syllables)i.StartTime=t(i.StartTime),i.EndTime=t(i.EndTime)}}else if(e.Type==="Line")for(let n of e.Content)n.StartTime=t(n.StartTime),n.EndTime=t(n.EndTime)}function Hr(e){if(!e||typeof e!="object")return{status:"error",message:"Spicy returned an empty result"};let t=e,n=t.httpStatus,r=t.data??e;return n===404||dt(r,"MISSING_LYRICS")?{status:"missing_lyrics"}:n&&n!==200?{status:"error",message:on(r)}:dt(r)?{status:"error",message:on(r)}:Cr(r)?{status:"success",data:r}:{status:"error",message:"Unexpected response from Spicy"}}function Ir(e){return(e?.queries.flat()??[]).find(n=>n.operation==="lyrics"&&!!n.result)}function Cr(e){if(!e||typeof e!="object"||!("Type"in e))return!1;let t=e.Type;return t==="Syllable"||t==="Line"||t==="Static"}function dt(e,t){if(!e||typeof e!="object"||!("error"in e))return!1;let n=e.error;return typeof n=="string"&&(!t||n===t)}function on(e){return dt(e)?e.message??e.error:"Unexpected Error from Spicy"}var Nr={spotify:{id:"spotify",fetch:ct},spicy:{id:"spicy",fetch:cn}},mt=new Map;async function un(e){let t=e.id;if(!e.forceRefresh&&mt.has(t))return{status:"success",data:mt.get(t)};let n=!1;for(let r of nn){let i=Nr[r];if(!i)continue;let a=await i.fetch(e);if(a.status==="success"&&a.data){let s=r==="spicy"?await Ar(e,a.data):a.data;return mt.set(t,s),{...a,data:s}}if(a.status==="missing_lyrics"){n=!0;continue}}return n?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}async function Ar(e,t){if(t.Type!=="Syllable"&&t.Type!=="Line")return t;try{let n=await ct(e);if(n.status!=="success"||!n.data)return t;let r=Fr(n.data);if(r.length===0||t.Type==="Line")return t;t.Content.forEach(i=>{let a=i.Lead,s=_r(r,a?.StartTime??0,a?.EndTime??0);s&&(i.LiquidLyricsOriginalText=s.text,a&&(a.LiquidLyricsOriginalText=s.text))})}catch{return t}return t}function Fr(e){return e.Type!=="Line"?[]:e.Content.filter(t=>t.Type!=="Interlude").map(t=>({text:Wr(t.Text),start:Number(t.StartTime)||0,end:Number(t.EndTime)||0})).filter(t=>t.text&&!t.text.includes("\u266A")&&!t.text.includes("\xE2\u2122\xAA"))}function _r(e,t,n){let r=Number(t)||0,i=Number(n)||r,a=(r+i)/2,s=null,o=Number.POSITIVE_INFINITY;for(let l of e){let c=(l.start+l.end)/2,u=Math.abs(l.start-r),d=Math.abs(c-a),m=u*.75+d*.25;m<o&&(s=l,o=m)}return s&&o<=3500?s:null}function Wr(e){return String(e??"").replace(/\s+/g," ").trim()}var Or="liquid-lyrics-mode",ft="liquid-lyrics-romanization";var pt=new Map,Fl=localStorage.getItem(Or)||"romanization",pn=localStorage.getItem(ft)!==null?localStorage.getItem(ft)==="true":!1;function fn(){return(Spicetify?.Platform?.Session?.locale||navigator.language||"en").split("-")[0]}var Pe=null;async function Br(){return window.wanakana?!0:Pe||(Pe=new Promise(t=>{let n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/wanakana@4.0.2/umd/wanakana.min.js",n.onload=()=>t(!0),n.onerror=()=>t(!1),document.head.appendChild(n)}),Pe)}function dn(e){let t=Array.isArray(e?.[0])?e[0]:[];for(let n of t){if(!Array.isArray(n)||n.length<4)continue;let r=n[3];if(n[0]==null&&n[1]==null&&n[2]==null&&typeof r=="string"&&r.trim())return r}return""}function mn(e){return e?String(e).replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g,"").replace(/[\u3040-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]/g,"").replace(/\s+/g," ").trim():""}function g(){return pn}function Re(e){pn=e,localStorage.setItem(ft,String(e))}async function le(e,t="auto"){let n=String(e??"").trim(),r=fn();if(!n||n.includes("\u266A"))return{detected:r,roman:""};let i=`legacy:${n}`;return pt.has(i)||pt.set(i,(async()=>{try{let a=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${r}&dt=t&dt=rm&q=${encodeURIComponent(n)}`,o=await(await fetch(a)).json(),l=(typeof o?.[2]=="string"?o[2]:typeof o?.[1]=="string"?o[1]:r)||r,c=String(l).toLowerCase(),u="";return c.startsWith("ja")?(u=mn(dn(o)),u||(u=await Dr(n))):c.startsWith("zh")&&(u=mn(dn(o))),{detected:l,roman:gn(u)}}catch{return{detected:r,roman:""}}})()),pt.get(i)}async function He(e,t="auto"){let n=e.map(gn),r=n.map(()=>({detected:fn(),roman:""})),i=n.map((s,o)=>({text:s,index:o})).filter(s=>s.text&&!s.text.includes("\u266A"));return i.length===0||(await Promise.all(i.map(s=>le(s.text,"auto")))).forEach((s,o)=>{r[i[o].index]=s}),r}async function Dr(e){await Br();let t=window;return Vr(t.wanakana?t.wanakana.toRomaji(e):"")}function Vr(e){return String(e??"").replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g,"").replace(/[\u3040-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]/g,"").replace(/[\uAC00-\uD7AF]/g,"").replace(/\s+/g," ").trim()}function gn(e){return String(e??"").replace(/\s+/g," ").trim()}var Ie="liquid-lyrics-tooltip";function E(e,t){e.dataset.tooltip=t;let n=()=>jr(e,e.dataset.tooltip||t);e.addEventListener("pointerenter",n),e.addEventListener("focus",n),e.addEventListener("pointerleave",G),e.addEventListener("blur",G),e.addEventListener("click",()=>window.setTimeout(()=>yn(e),0))}function jr(e,t){if(e.hasAttribute("disabled")||e.hidden)return;let n=$r(e);n.textContent=t,n.classList.add("visible"),yn(e)}function G(){document.getElementById(Ie)?.classList.remove("visible")}function $r(e){let t=Yr(e),n=document.getElementById(Ie);return n||(n=document.createElement("div"),n.id=Ie,n.className="liquid-lyrics-tooltip"),n.parentElement!==t&&t.appendChild(n),n}function Yr(e){let t=document.fullscreenElement;return t instanceof HTMLElement&&t.contains(e)?t:document.body}function yn(e){let t=document.getElementById(Ie);if(!t?.classList.contains("visible"))return;let n=e.getBoundingClientRect(),r=9,i=t.offsetWidth||80,a=t.offsetHeight||28,s=Math.max(8,n.top-a-r),o=Gr(n.left+n.width/2,i/2+8,window.innerWidth-i/2-8);t.style.left=`${o}px`,t.style.top=`${s}px`}function Gr(e,t,n){return Math.min(n,Math.max(t,e))}var b="liquid-lyrics-panel",Mn="liquid-lyrics-song-card-visible",se="liquify-bg-mode",kn=500,Oe=4500,Le=250,wt=80,Ur=5e3,bn=900,qn=3e3,Kr=.92,Zr=12,Qr=700,Jr=3,hn=1100,Et=.75,Ce=null,M=null,ye=!1,R=null,de=null,xn=!1,Ln=!1,be=!0,X,_=null,zn="",Pn=0,Rn=0,yt=0,bt=new WeakMap,ht=new WeakMap,xt=new WeakMap,Lt=new WeakMap,Ne=new WeakMap,H=new WeakMap,K=new WeakMap,vn=new WeakMap;function ve(){let e=document.getElementById(b);if(e)return e;let t=document.createElement("div");t.id=b,t.className="liquid-lyrics-panel";let n=document.createElement("div");n.className="liquid-lyrics-glass-bg";let r=Xr(),i=ei(),a=document.createElement("div");a.className="liquid-lyrics-header";let s=document.createElement("span");s.className="liquid-lyrics-title",s.textContent="Liquid Lyrics",a.append(s);let o=document.createElement("div");o.className="liquid-lyrics-view";let l=ti(),c=document.createElement("div");c.className="liquid-lyrics-content",c.addEventListener("wheel",gt,{passive:!0}),c.addEventListener("touchstart",gt,{passive:!0}),c.addEventListener("pointerdown",m=>{(m.pointerType==="mouse"||m.pointerType==="touch")&&gt()},{passive:!0}),o.append(l,c);let u=ni();return t.append(r,n,i,a,o,u),_n(t),ne(t),(document.querySelector(".Root__main-view")??document.body).appendChild(t),Z(),k(),xn||(xn=!0,document.addEventListener("fullscreenchange",yi)),di(),t}var Hn={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>'};function Xr(){let e=document.createElement("div");e.className="liquid-lyrics-fullscreen-bg";for(let t=0;t<2;t++){let n=document.createElement("div");n.className="ll-fullscreen-bg-tile",e.appendChild(n)}return e}function ei(){let e=document.createElement("div");return e.className="liquid-lyrics-transparent-controls",e.setAttribute("aria-hidden","true"),e}function ti(){let e=document.createElement("aside");e.className="liquid-lyrics-song-card";let t=document.createElement("div");t.className="ll-song-card-cover-wrap";let n=document.createElement("img");n.className="ll-song-card-cover",n.alt="",n.decoding="async",n.loading="lazy",t.appendChild(n);let r=document.createElement("div");r.className="ll-song-card-controls",r.append(W("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>oe(["toggleShuffle"])),W("ll-song-card-btn","previous","Previous",()=>oe(["back","previous","skipToPrevious"])),W("ll-song-card-btn ll-song-card-play","play","Play",()=>{oe(["togglePlay"]),window.setTimeout(Z,60)}),W("ll-song-card-btn","next","Next",()=>oe(["next","skipToNext"])),W("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>oe(["toggleRepeat"])));let i=document.createElement("div");i.className="playback-bar rlQO4qjGcwcPEZXN ll-song-card-progress",i.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let a=i.querySelector(".ll-card-progress-track");a&&mi(a);let s=document.createElement("div");s.className="ll-song-card-info";let o=document.createElement("div");o.className="ll-song-card-title";let l=document.createElement("button");l.type="button",l.className="ll-song-card-link ll-song-card-album",E(l,"Open album");let c=document.createElement("button");return c.type="button",c.className="ll-song-card-link ll-song-card-artist",E(c,"Open artist"),s.append(o,l,c),e.append(t,r,i,s),e}function ni(){let e=document.createElement("div");return e.className="liquid-lyrics-control-pill",e.append(W("ll-control-btn ll-card-toggle","cover","Song card",pi),W("ll-control-btn ll-roman-toggle","roman","Romanization",gi),W("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",fi)),e}function W(e,t,n,r){let i=document.createElement("button");return i.type="button",i.className=e,i.dataset.icon=t,i.dataset.tooltip=n,i.setAttribute("aria-label",n),i.innerHTML=Hn[t],i.addEventListener("click",a=>{a.stopPropagation(),r()}),E(i,n),i}function ri(e,t){e&&e.dataset.icon!==t&&(e.dataset.icon=t,e.innerHTML=Hn[t])}function Z(){let t=document.getElementById(b)?.querySelector(".liquid-lyrics-song-card");if(!t)return;let n=ai(),r=t.querySelector(".ll-song-card-cover"),i=t.querySelector(".ll-song-card-title"),a=t.querySelector(".ll-song-card-album"),s=t.querySelector(".ll-song-card-artist");r&&(n.cover?(r.src=n.cover,t.classList.remove("ll-no-cover")):(r.removeAttribute("src"),t.classList.add("ll-no-cover"))),ii(n.cover),i&&(i.textContent=n.title),a&&(a.textContent=n.album,a.disabled=!n.albumUri,a.onclick=()=>Tn(n.albumUri)),s&&(s.textContent=n.artist,s.disabled=!n.artistUri,s.onclick=()=>Tn(n.artistUri));let o=t.querySelector(".ll-song-card-play");Te(),te(!1)}function Te(){let t=document.getElementById(b)?.querySelector(".liquid-lyrics-song-card");if(!t)return;let n=In(),r=t.querySelector(".ll-song-card-play"),i=n?"Pause":"Play";ri(r,n?"pause":"play"),r?.setAttribute("aria-label",i),r&&(r.dataset.tooltip=i);let a=t.querySelector(".ll-song-card-shuffle");pe(a,ci());let s=t.querySelector(".ll-song-card-repeat"),o=ui();pe(s,o!=="off"),s?.classList.toggle("ll-repeat-one",o==="track");let l=o==="track"?"Repeat one":o==="context"?"Repeat all":"Repeat";s?.setAttribute("aria-label",l),s&&(s.dataset.tooltip=l)}function ii(e){let n=document.getElementById(b)?.querySelector(".liquid-lyrics-fullscreen-bg");n&&(n.classList.toggle("ll-has-bg",!!e),n.querySelectorAll(".ll-fullscreen-bg-tile").forEach(r=>{r.style.backgroundImage=e?`url("${e}")`:""}))}function ai(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{},n=Array.isArray(e?.artists)?e.artists.map(i=>i?.name).filter(Boolean).join(", "):"",r=Array.isArray(e?.artists)?e.artists.find(i=>i?.uri):null;return{title:e?.name||t.title||t.track_name||"Unknown track",artist:n||t.artist_name||t.artist||t.album_artist_name||"Unknown artist",album:e?.album?.name||t.album_title||t.album_name||"Unknown album",cover:li(t.image_url||t.album_image_url||t.cover_url||e?.album?.images?.[0]?.url||e?.images?.[0]?.url||""),artistUri:r?.uri||si(t.artist_uri||t.artist_uris||""),albumUri:e?.album?.uri||t.album_uri||""}}function li(e){return e?e.startsWith("spotify:image:")?e.replace("spotify:image:","https://i.scdn.co/image/"):e:""}function si(e){return String(e||"").split(",")[0]?.split(";")[0]?.trim()||""}function Tn(e){let t=oi(e);if(!t)return;let n=Spicetify.Platform?.History;typeof n?.push=="function"&&(n.push(t),Ve())}function oi(e){let t=String(e||"").split(":");if(t.length<3||t[0]!=="spotify")return"";let n=t[1],r=t[2];return!r||!["album","artist","track","playlist"].includes(n)?"":`/${n}/${r}`}function In(){let e=Spicetify.Player;return typeof e?.isPlaying=="function"?!!e.isPlaying():typeof e?.data?.isPaused=="boolean"?!e.data.isPaused:!1}function ci(){let e=Spicetify.Player;if(typeof e?.getShuffle=="function")return!!e.getShuffle();let t=e?.data??{};return!!(t.shuffle??t.shuffling??t.options?.shuffling??t.playback_options?.shuffling??t.context?.metadata?.shuffle)}function ui(){let e=Spicetify.Player,t=e?.data??{},n=typeof e?.getRepeat=="function"?e.getRepeat():t.repeat??t.repeatMode??t.repeat_mode??t.options?.repeat??t.playback_options?.repeat??t.context?.metadata?.repeat;if(t.options?.repeatingTrack||t.playback_options?.repeating_track)return"track";if(t.options?.repeatingContext||t.playback_options?.repeating_context)return"context";if(typeof n=="number")return n===2?"track":n===1?"context":"off";let r=String(n??"").toLowerCase();return r.includes("track")||r.includes("song")||r==="one"?"track":r.includes("context")||r.includes("all")||r==="playlist"||r==="on"?"context":"off"}function di(){Ln||(Ln=!0,["songchange","onplaypause","onprogress","onqueuechange"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>{Te(),te(!1)})}catch{}}))}function oe(e){let t=Spicetify.Player;for(let n of e)if(typeof t?.[n]=="function"){t[n](),window.setTimeout(Z,80),window.setTimeout(Te,180);return}}function Cn(){de===null&&(te(!1),Te(),yt=performance.now(),An())}function Nn(){de!==null&&(cancelAnimationFrame(de),de=null)}function An(){te(!0);let e=performance.now();e-yt>500&&(Te(),yt=e),de=requestAnimationFrame(An)}function te(e=!0){let n=document.getElementById(b)?.querySelector(".liquid-lyrics-song-card");if(!n)return;let r=Q(),i=me(),a=i>0?S(r/i):0,s=n.querySelector(".ll-card-progress-fill"),o=n.querySelector(".ll-card-progress-track"),l=n.querySelector(".ll-card-progress-thumb"),c=n.querySelector(".ll-card-current"),u=n.querySelector(".ll-card-duration"),d=o?.classList.contains("ll-previewing");s&&!d&&(s.classList.toggle("ll-no-progress-transition",!e),s.style.width=`${a*100}%`),l&&!d&&(l.style.left=`${a*100}%`),o&&(o.setAttribute("aria-valuenow",String(Math.round(a*100))),o.setAttribute("aria-valuetext",`${ce(r)} of ${ce(i)}`)),c&&(c.textContent=ce(r)),u&&(u.textContent=ce(i))}function mi(e){let t=e.querySelector(".ll-card-preview-time"),n=e.querySelector(".ll-card-progress-fill"),r=e.querySelector(".ll-card-progress-thumb"),i=0,a=0,s=d=>{let m=e.getBoundingClientRect();return S((d.clientX-m.left)/Math.max(1,m.width))},o=d=>{let m=me();m<=0||(e.classList.add("ll-previewing"),t&&(t.textContent=ce(m*d),t.style.left=`${d*100}%`),n&&(n.classList.add("ll-no-progress-transition"),n.style.width=`${d*100}%`),r&&(r.style.left=`${d*100}%`))},l=d=>(a=d,i||(i=requestAnimationFrame(()=>{i=0,o(a)})),d),c=()=>{e.dataset.dragging!=="true"&&(e.classList.remove("ll-previewing"),i&&(cancelAnimationFrame(i),i=0),te(!1))},u=d=>{let m=me();if(m<=0)return;let p=l(s(d));fe(m*p),te(!1)};e.addEventListener("pointerenter",d=>{l(s(d))}),e.addEventListener("pointermove",d=>{l(s(d))}),e.addEventListener("pointerleave",c),e.addEventListener("blur",c),e.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),e.dataset.dragging="true",e.setPointerCapture?.(d.pointerId),u(d);let m=f=>u(f),p=f=>{u(f),delete e.dataset.dragging,c(),e.releasePointerCapture?.(d.pointerId),window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",p)};window.addEventListener("pointermove",m),window.addEventListener("pointerup",p,{once:!0})}),e.addEventListener("keydown",d=>{let m=me();if(m<=0)return;let p=Q(),f=d.shiftKey?15e3:5e3;d.key==="ArrowLeft"?(d.preventDefault(),fe(Math.max(0,p-f))):d.key==="ArrowRight"&&(d.preventDefault(),fe(Math.min(m,p+f)))})}function me(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{};return h(t.duration_ms??t.duration??e?.duration?.milliseconds??e?.duration_ms??Spicetify.Player?.data?.duration,0)}function ce(e){let t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),r=t%60;return`${n}:${String(r).padStart(2,"0")}`}function pi(){localStorage.setItem(Mn,String(!qt())),k()}function fi(){let e=document.getElementById(b);if(!e)return;let t=!Mt(e);t&&(be=!0),kt(e,t),G(),k(),Be(),ne(e)}function Fn(e=x()){let t=ve();be=e,e?De():(t.classList.add("visible"),Z(),k(),Cn()),kt(t,!0),G(),k(),Be(),ne(t)}function gi(){Re(!g());let e=Pt();e&&Dn(e,!0),k()}function _n(e){e.classList.toggle("ll-song-card-hidden",!qt()),e.classList.toggle("ll-romanized",g())}function k(){let e=document.getElementById(b);if(!e)return;_n(e),pe(e.querySelector(".ll-card-toggle"),qt()),pe(e.querySelector(".ll-roman-toggle"),g()),pe(e.querySelector(".ll-fullscreen-toggle"),Mt(e));let t=e.querySelector(".ll-roman-toggle"),n=e.classList.contains("ll-has-romanization");t&&(t.hidden=!n,t.disabled=!n,n||G())}function yi(){G();let e=document.getElementById(b);e&&document.fullscreenElement!==e&&e.classList.contains("ll-native-fullscreen")&&e.classList.remove("ll-native-fullscreen"),k(),Be(),e&&ne(e)}function Be(){let e=document.getElementById(b);if(!!(e&&Mt(e))){X===void 0&&(X=localStorage.getItem(se)),localStorage.getItem(se)!=="animated"&&(localStorage.setItem(se,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}X!==void 0&&(X===null?localStorage.removeItem(se):localStorage.setItem(se,X),X=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function ne(e=document.getElementById(b)){if(!e)return;let t=e.querySelector(".liquid-lyrics-transparent-controls");if(!t)return;let n=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),r=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);t.style.setProperty("--ll-transparent-controls-width",`${S(n,50,400)}px`),t.style.setProperty("--ll-transparent-controls-height",`${S(r,20,300)}px`)}function Mt(e){return e.classList.contains("ll-fullscreen-mode")||document.fullscreenElement===e}function kt(e,t){if(t){!_&&e.parentNode&&(_=document.createComment("liquid-lyrics-fullscreen-placeholder"),e.parentNode.insertBefore(_,e));let r=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==e?document.fullscreenElement:document.body;e.parentElement!==r&&r.appendChild(e),e.classList.add("ll-fullscreen-mode"),ne(e);return}let n=!be&&e.classList.contains("ll-fullscreen-mode");e.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===e&&document.exitFullscreen?.(),_?.parentNode&&(_.parentNode.insertBefore(e,_),_.remove()),_=null,ne(e),n&&(e.classList.remove("visible"),we(),Nn(),be=!0)}function pe(e,t){e&&(e.classList.toggle("active",t),e.setAttribute("aria-pressed",String(t)))}function qt(){return localStorage.getItem(Mn)!=="false"}function De(){let e=ve();be=!0,e.classList.add("visible"),Z(),k(),Cn();let t=e.closest(".Root__main-view");if(t)for(let n of Array.from(t.children)){let r=n;r.id===b||!r.style||(r.dataset.liquidHidden===void 0&&(r.dataset.liquidHidden=r.style.display),r.style.display="none")}}function Ve(){let e=document.getElementById(b);if(!e)return;e.classList.remove("visible"),we(),Nn(),kt(e,!1),Be();let t=e.closest(".Root__main-view");if(t)for(let n of Array.from(t.children)){let r=n;r.id===b||r.dataset.liquidHidden===void 0||(r.style.display=r.dataset.liquidHidden,delete r.dataset.liquidHidden)}}function Wn(){x()?Ve():De()}function x(){return document.getElementById(b)?.classList.contains("visible")??!1}function zt(e){let t=Pt();t&&(we(),On(t),t.replaceChildren(),Z(),e.Type==="Line"?bi(t,e):e.Type==="Syllable"?hi(t,e):xi(t,e),Dn(t,g()))}function Se(e){let t=Pt();if(!t)return;we(),t.replaceChildren(),Z();let n=document.createElement("div");n.className="liquid-lyrics-empty",n.textContent=e,t.appendChild(n),document.getElementById(b)?.classList.remove("ll-has-romanization"),k()}function Pt(){return ve().querySelector(".liquid-lyrics-content")}function bi(e,t){let n=t.Content??[],r=h(n[0]?.StartTime,0);n.length>0&&r>kn&&e.appendChild(Ct(0,r)),n.forEach((i,a)=>{let s=n[a+1],o=Vi(i,s),l=document.createElement("div");if(l.className="liquid-lyrics-line",l.dataset.index=String(a),xe(l,o),i.Type==="Interlude")l.classList.add("liquid-lyrics-interlude"),$n(l);else{let c=la(i);l.dataset.originalText=c,Ge(l,i.RomanizedText),l.textContent=c}l.addEventListener("click",()=>Gn(e,l,o.start)),e.appendChild(l),Bi(e,o.end,h(s?.StartTime,NaN))}),Un(e)}function hi(e,t){let n=t.Content??[],r=n.map((o,l)=>ji(o,n[l+1])),i=r[0]?.lineRange,a=[];i&&i.start>kn&&a.push(Ct(0,i.start)),r.forEach(({lineRange:o,lead:l,backgrounds:c},u)=>{let d=document.createElement("div");d.className="liquid-lyrics-line ll-syllable-line",d.dataset.index=String(u),d.dataset.originalText=l.sourceText||Fi(l.syllables),Ge(d,_i(l.syllables)),xe(d,o);let m=document.createElement("div");m.className="ll-vocal-line ll-lead-vocal",Tt(m,l.syllables),d.appendChild(m),c.forEach(p=>{let f=document.createElement("div");f.className="ll-vocal-line ll-background-vocal",xe(f,p.range),Tt(f,p.syllables,"ll-bg-syllable"),d.appendChild(f)}),d.addEventListener("click",()=>Gn(e,d,o.start)),a.push(d),Di(a,o.end,r[u+1]?.lineRange.start??NaN)});let s=document.createElement("div");s.className="ll-syllable-virtual-space",e.appendChild(s),Li(e,s,a),Un(e,a)}function xi(e,t){t.Lines.forEach(n=>{let r=document.createElement("div");r.className="liquid-lyrics-line liquid-lyrics-static",r.dataset.originalText=n.Text,Ge(r,n.RomanizedText),r.textContent=n.Text,e.appendChild(r)})}function Li(e,t,n){On(e);let r={container:e,virtualSpace:t,lines:n,wrappers:n.map((i,a)=>Si(a)),ranges:n.map(i=>I(i)),heights:n.map(Bn),offsets:[],mounted:new Set,resizeObserver:null,viewportObserver:null,raf:null,activeIndex:-1,onScroll:()=>ee(e)};n.forEach((i,a)=>{K.set(i,a),i.dataset.llVirtualIndex=String(a),r.wrappers[a].appendChild(i)}),r.resizeObserver=new ResizeObserver(i=>{let a=!1;i.forEach(s=>{let o=s.target,l=K.get(o);if(l===void 0)return;let c=Math.max(1,s.borderBoxSize?.[0]?.blockSize??o.offsetHeight);Math.abs((r.heights[l]??0)-c)<Et||(r.heights[l]=c,a=!0)}),a&&(Fe(r),je(r),ee(e))}),r.viewportObserver=new ResizeObserver(()=>{ee(e)}),r.viewportObserver.observe(e),Fe(r),H.set(e,r),e.classList.add("ll-syllable-virtualized"),e.addEventListener("scroll",r.onScroll,{passive:!0}),ee(e)}function On(e){let t=H.get(e);t&&(t.raf!==null&&cancelAnimationFrame(t.raf),e.removeEventListener("scroll",t.onScroll),t.resizeObserver?.disconnect(),t.viewportObserver?.disconnect(),t.lines.forEach(n=>{let r=K.get(n),i=r===void 0?null:t.wrappers[r];i?.parentElement===t.virtualSpace&&t.virtualSpace.removeChild(i),n.style.position="",n.style.left="",n.style.right="",n.style.top="",n.style.width="",n.style.margin="",n.style.transform="",n.style.willChange="",delete n.dataset.llVirtualMounted,K.delete(n)}),e.classList.remove("ll-syllable-virtualized"),H.delete(e))}function ee(e){let t=H.get(e);!t||t.raf!==null||(t.raf=requestAnimationFrame(()=>{t.raf=null,vi(t)}))}function Rt(e,t){let n=H.get(e);if(!(!n||t<0||t>=n.lines.length)){vt(n,t);for(let r=Math.max(0,t-1);r<=Math.min(n.lines.length-1,t+1);r++)vt(n,r);je(n)}}function vi(e){let t=Math.max(0,e.container.scrollTop-e.virtualSpace.offsetTop-hn),n=e.container.scrollTop-e.virtualSpace.offsetTop+e.container.clientHeight+hn,r=M?.container===e.container?M.activeIndex:e.activeIndex;e.activeIndex=r;let i=new Set;for(let a=0;a<e.lines.length;a++){let s=e.offsets[a]??0;s+(e.heights[a]??0)>=t&&s<=n&&i.add(a)}if(r>=0)for(let a=Math.max(0,r-3);a<=Math.min(e.lines.length-1,r+3);a++)i.add(a);for(let a of Array.from(e.mounted))!i.has(a)&&a!==r&&Ti(e,a);for(let a of i)vt(e,a);je(e)}function vt(e,t){if(e.mounted.has(t))return;let n=e.lines[t],r=e.wrappers[t];if(!n)return;n.parentElement!==r&&r.appendChild(n),e.virtualSpace.appendChild(r),e.mounted.add(t),n.dataset.llVirtualMounted="true",ki(e.container,n),Mi(n),e.resizeObserver?.observe(n);let i=Math.max(1,n.offsetHeight);Math.abs((e.heights[t]??0)-i)>=Et&&(e.heights[t]=i,Fe(e))}function Ti(e,t){let n=e.lines[t],r=e.wrappers[t];n&&(e.resizeObserver?.unobserve(n),r?.parentElement===e.virtualSpace&&e.virtualSpace.removeChild(r),n.dataset.llVirtualMounted="false",e.mounted.delete(t))}function je(e){for(let t of e.mounted){let n=e.wrappers[t];n&&(n.style.transform=`translate3d(0, ${Math.round(e.offsets[t]??0)}px, 0)`)}}function Si(e){let t=document.createElement("div");return t.className="ll-syllable-virtual-row",t.dataset.index=String(e),t}function Fe(e){let t=0;e.offsets=e.heights.map(n=>{let r=t;return t+=Math.max(1,n)+wi(),r}),e.virtualSpace.style.height=`${Math.max(1,t)}px`}function wi(){return 8}function Bn(e){if(e.classList.contains("liquid-lyrics-interlude"))return 54;let t=Math.max(1,Ei(e).length),n=Math.max(1,Math.ceil(t/42)),r=e.querySelectorAll(".ll-background-vocal").length;return 18+n*45+r*24}function Ei(e){if(g()&&e.classList.contains("ll-syllable-line")){let t=q(e),n=e.dataset.romanizedSourceText===t?O(e.dataset.contextRomanizedText):"",r=O(e.dataset.romanizedText),i=n||r;if(i)return i}return q(e)}function Mi(e){let t=Q(),n=I(e);if(t>=n.start&&t<n.end){e.classList.add("active"),e.classList.remove("past","future","ll-finishing"),e.dataset.llLineState="active",Qn(e,t),Ee(e,t);return}n.end<=t?Jn(e,!1):Xn(e,!1)}function ue(e){return!K.has(e)||e.dataset.llVirtualMounted==="true"||e.isConnected}function ki(e,t){if(!t.classList.contains("ll-syllable-line"))return;let n=q(t),r=g(),i=t.dataset.romanizedSourceText===n?O(t.dataset.contextRomanizedText):"";r&&z(n)&&i?Ht(t,i,!1):Ae(t,!1),_e(e,t)}function _e(e,t){let n=H.get(e),r=K.get(t);if(!n||r===void 0)return;let i=t.isConnected?Math.max(1,t.offsetHeight):Bn(t);Math.abs((n.heights[r]??0)-i)<Et||(n.heights[r]=i,Fe(n),je(n),ee(e))}async function Dn(e,t=!1){let n=g(),r=document.getElementById(b),i=[],a=!1,s=(o,l,c)=>{let u=z(l),d=O(o.dataset.romanizedText),m=u?o.dataset.romanizedSourceText===l?d:"":d,p=!!m||u,f=En(l);if(a||(a=p),!n){c(l);return}if(m){c(m);return}c(l),t&&p&&i.push({el:o,original:l,sourceLang:f,kind:"line",applyText:c})};qi(e).forEach(o=>{if(o.classList.contains("liquid-lyrics-interlude"))return;if(o.classList.contains("ll-syllable-line")){let c=q(o),u=z(c),d=En(c);if(a||(a=u),u){if(!n){(ue(o)||o.querySelector(".ll-romanized-syllable"))&&Ae(o),_e(e,o);return}let m=o.dataset.romanizedSourceText===c?O(o.dataset.contextRomanizedText):"";m?(ue(o)&&Ht(o,m),_e(e,o)):ue(o)&&Ae(o),t&&!m&&i.push({el:o,original:c,sourceLang:d,kind:"syllable"});return}if(!ue(o))return;Ae(o),Array.from(o.querySelectorAll(".ll-syllable")).forEach(m=>{let p=q(m);p&&s(m,p,f=>Vn(m,f))});return}let l=q(o);l&&s(o,l,c=>Ai(o,c))}),r?.classList.toggle("ll-has-romanization",a),k(),i.length>0&&(await zi(i,e,r),k())}function qi(e){let t=H.get(e);return t?t.lines:Array.from(e.querySelectorAll(".liquid-lyrics-line"))}async function zi(e,t,n){let r=new Map;e.forEach(i=>{let a=r.get(i.sourceLang);a?a.push(i):r.set(i.sourceLang,[i])});for(let[i,a]of r){let s=a.length>1?await He(a.map(o=>o.original),i):[await le(a[0].original,i)];for(let o=0;o<a.length;o++){if(!t.isConnected)return;let l=a[o],c=O(s[o]?.roman);if(c){if(l.kind==="syllable"){l.el.dataset.contextRomanizedText=c,l.el.dataset.romanizedSourceText=l.original,n?.classList.add("ll-has-romanization"),g()&&q(l.el)===l.original&&ue(l.el)&&Ht(l.el,c),_e(t,l.el);continue}l.el.dataset.romanizedText=c,l.el.dataset.romanizedSourceText=l.original,n?.classList.add("ll-has-romanization"),g()&&q(l.el)===l.original&&l.applyText?.(c)}}await new Promise(o=>requestAnimationFrame(()=>o()))}}function Ht(e,t,n=!0){let r=O(t),i=e.querySelector(".ll-lead-vocal");if(!r||!i)return!1;if(Ne.has(e)||Ne.set(e,Array.from(i.children).map(l=>l.cloneNode(!0))),i.dataset.romanizedGenerated===r)return e.classList.add("ll-context-romanized"),!0;let a=I(e),s=Ne.get(e)??Array.from(i.querySelectorAll(".ll-syllable")),o=Pi(r,a,s);return o.length===0?!1:(i.dataset.romanizedGenerated=r,i.replaceChildren(),Tt(i,o,"ll-romanized-syllable"),e.classList.add("ll-context-romanized"),Nt(e),n&&Ee(e,Q()),!0)}function Ae(e,t=!0){let n=e.querySelector(".ll-lead-vocal");if(!n)return;let r=Ne.get(e);if(n.dataset.romanizedGenerated&&r){n.replaceChildren(...r.map(i=>i.cloneNode(!0))),delete n.dataset.romanizedGenerated,e.classList.remove("ll-context-romanized"),Nt(e),t&&Ee(e,Q());return}e.classList.remove("ll-context-romanized"),Array.from(n.querySelectorAll(".ll-syllable")).forEach(i=>{let a=q(i);a&&i.dataset.displayText&&i.dataset.displayText!==a&&Vn(i,a)})}function Pi(e,t,n=[]){let r=Ci(e);if(r.length===0)return[];let i=n.map(s=>({text:q(s),range:I(s)})).filter(s=>s.text&&Number.isFinite(s.range.start)&&Number.isFinite(s.range.end));if(i.length===r.length)return r.map((s,o)=>{let l=i[o].range;return It(s,l.start,l.end)});if(r.length<i.length)return Ri(r,i);let a=i.length>0?{start:i[0].range.start,end:i[i.length-1].range.end}:t;return Ii(r,a)}function Ri(e,t){let n=e.map(We),r=t.map(c=>Ni(c.text)),i=[0];r.forEach(c=>i.push(i[i.length-1]+c));let a=n.reduce((c,u)=>c+u,0)||e.length,s=i[i.length-1]||t.length,o=0,l=0;return e.map((c,u)=>{let d=u===e.length-1,m=e.length-u,p=t.length;if(!d){l+=n[u];let at=l/a*s,lt=o+1,st=t.length-(m-1);p=Hi(i,at,lt,st)}let f=t.slice(o,p);o=p;let y=f[0]??t[t.length-1],it=f[f.length-1]??y;return It(c,y.range.start,it.range.end)})}function Hi(e,t,n,r){let i=n,a=Number.POSITIVE_INFINITY;for(let s=n;s<=r;s++){let o=Math.abs((e[s]??0)-t);o<a&&(i=s,a=o)}return i}function Ii(e,t){let n=t.start,r=Math.max(t.end,n+e.length),i=e.reduce((s,o)=>s+We(o),0)||e.length,a=n;return e.map((s,o)=>{let l=o===e.length-1,c=e.length-o,u=Math.max(1,r-a),d=l?u:S((r-n)*We(s)/i,1,u-(c-1)),m=a,p=l?r:a+d;return a=p,It(s,m,p)})}function It(e,t,n){let r=Math.max(t+1,n);return{text:e,romanizedText:e,contextRomanizedText:e,start:t,end:r,animateLetters:he(e,t,r)}}function Ci(e){return O(e).split(/\s+/).map(t=>t.trim()).filter(Boolean)}function We(e){let t=e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"");if(!t)return Math.max(1,Array.from(e).length);let n=t.match(/[aeiouy]+/g)?.length??0,r=t.match(/n(?![aeiouy])/g)?.length??0;return Math.max(1,n+r)}function Ni(e){return z(e)?Math.max(.5,Array.from(e).reduce((t,n)=>/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(n)?t+2:/[\u3041\u3043\u3045\u3047\u3049\u3083\u3085\u3087\u308e\u3095\u3096\u30a1\u30a3\u30a5\u30a7\u30a9\u30e3\u30e5\u30e7\u30ee]/.test(n)?t+.45:/[\u3040-\u30ff\u31f0-\u31ff\uff65-\uff9f\uac00-\ud7af]/.test(n)?t+1:/[A-Za-z0-9]/.test(n)?t+.35:/\S/.test(n)?t+.2:t,0)):We(e)}function Ai(e,t){let n=L(t);e.dataset.displayText!==n&&(e.dataset.displayText=n,e.textContent=n)}function Vn(e,t){let n=L(t);if(!n||e.dataset.displayText===n)return;let r=I(e),i=he(n,r.start,r.end),a={text:n,start:r.start,end:r.end,romanizedText:e.dataset.contextRomanizedText||e.dataset.romanizedText,animateLetters:i};e.dataset.displayText=n,delete e.dataset.letterState,delete e.dataset.llState,e.classList.toggle("ll-long-syllable",i),e.replaceChildren(),ht.delete(e),jn(e,a);let s=e.closest(".ll-syllable-line");s&&Nt(s);let o=Q(),l=At(r,o);re(e,l,o>=r.start&&o<r.end)}function q(e){let t=L(e.dataset.originalText);if(t)return t;let n=L(e.textContent);return n&&(e.dataset.originalText=n),n}function Tt(e,t,n=""){t.forEach((r,i)=>{let a=document.createElement("span");a.className=n?`ll-syllable ${n}`:"ll-syllable",r.animateLetters&&a.classList.add("ll-long-syllable"),z(r.text)&&a.classList.add("ll-cjk-syllable"),i===t.length-1&&a.classList.add("LastWordInLine"),a.dataset.originalText=r.text,Ge(a,r.romanizedText),xe(a,r),jn(a,r),e.appendChild(a)})}function jn(e,t){if(!t.animateLetters){e.removeAttribute("aria-label"),e.textContent=t.text;return}e.setAttribute("aria-label",t.text);let n=Array.from(t.text);e.style.setProperty("--letter-count",String(n.length)),n.forEach((r,i)=>{let a=document.createElement("span");a.className="ll-letter",a.textContent=r,a.style.setProperty("--letter-index",String(i)),a.style.setProperty("--letter-lift","0px"),a.style.setProperty("--letter-scale","1"),a.style.setProperty("--letter-progress","-20"),e.appendChild(a)})}function Fi(e){return e.map(t=>t.text).join(" ").trim()}function _i(e){return e.map(t=>t.romanizedText||"").filter(Boolean).join(" ").trim()}function Wi(e){let t="",n="",r=!1;return e.forEach(i=>{let a=L(i.Text);if(!a)return;let s=!t||i.IsPartOfWord||r||Oi(n,a);t+=s?a:` ${a}`,n=a,r=!!i.IsPartOfWord}),t.trim()}function Oi(e,t){return!e||!t||/^[,.;:!?)]/.test(t)||/[(]$/.test(e)?!0:z(e)||z(t)}function Ct(e,t){let n=document.createElement("div");return n.className="liquid-lyrics-line liquid-lyrics-interlude",xe(n,{start:e,end:Math.max(t,e+Le)}),$n(n),n.addEventListener("click",()=>fe(e)),n}function $n(e){for(let t=0;t<3;t++){let n=document.createElement("span");n.className="ll-interlude-dot",n.dataset.dotIndex=String(t),e.appendChild(n)}}function Bi(e,t,n){let r=Yn(t,n);r&&e.appendChild(r)}function Di(e,t,n){let r=Yn(t,n);r&&e.push(r)}function Yn(e,t){return!Number.isFinite(t)||t-e<qn?null:Ct(e,t)}function Gn(e,t,n){if(ye=!1,R&&(clearTimeout(R),R=null),fe(n),M?.container===e){let r=M.lines.indexOf(t);r>=0&&(Zn(M,r,n),M.activeIndex=r,Ee(t,n))}er(e,t)}function Vi(e,t){let n=h(e.StartTime,0),r=h(t?.StartTime,NaN),i=h(e.EndTime,n+Oe),a=nr(i,r);return{start:n,end:Ft(a,n,a,Le)}}function ji(e,t){let n=Sn(e.Lead),r=(e.Background??[]).map(c=>Sn(c)),i=h(t?.Lead?.StartTime,NaN),a=n.range.start,s=Number.isFinite(i)&&i>a?i:a+Oe,o=Math.max(n.range.end,...r.map(c=>c.range.end)),l=nr(o,i);return{lineRange:{start:a,end:Ft(l,a,s,Le,s)},lead:n,backgrounds:r}}function Sn(e){let t=h(e?.StartTime,0),n=Number(e?.EndTime),r=Number.isFinite(n)&&n>t?h(n,t):t+Oe,i={start:t,end:r};return{range:i,sourceText:sa(e),syllables:$i(e?.Syllables??[],i)}}function $i(e,t){let n=Yi(e,t);return Gi(n,t)}function Yi(e,t){let n=[],r=null,i=!1;return e.forEach((a,s)=>{let o={text:L(a.Text),romanizedText:L(a.RomanizedText),start:h(a.StartTime,t.start),end:h(a.EndTime,t.start+wt),animateLetters:!1};!!(a.IsPartOfWord||i)&&!z(o.text)&&!z(r?.text??"")?r?(r.text+=o.text,r.romanizedText=oa(r.romanizedText,o.romanizedText," "),r.start=Math.min(r.start,o.start),r.end=Math.max(r.end,o.end)):r=o:(r&&n.push(r),r=o),i=!!a.IsPartOfWord,(!a.IsPartOfWord||s===e.length-1)&&r&&(n.push(r),r=null)}),n.filter(a=>a.text)}function Gi(e,t){if(e.length===0)return[];let n=t.start,r=Math.max(t.end,n+Le),i=e.map(l=>({text:l.text,romanizedText:l.romanizedText,start:St(l.start,n,r),end:St(l.end,n,r),animateLetters:!1})).filter(l=>l.text.trim().length>0),a=n;i.forEach((l,c)=>{let u=c===0?n:a;l.start=Math.max(u,l.start),a=l.start});let s=[];i.forEach(l=>{let c=s[s.length-1],u=c?.[0]?.start;c&&u!==void 0&&Math.abs(l.start-u)<=Zr?(l.start=u,c.push(l)):s.push([l])});let o=[];return s.forEach((l,c)=>{let u=l[0].start,d=s[c+1]?.[0]?.start??r,m=Math.max(u+1,d);if(l.length===1){let p=l[0],f=Ki(p.end,u,m);o.push({text:p.text,romanizedText:p.romanizedText,contextRomanizedText:p.contextRomanizedText,start:u,end:f,animateLetters:he(p.text,u,f)});return}Ui(l,u,m).forEach(p=>o.push(p))}),o.map((l,c)=>{let u=o[c+1]?.start??r,d=Math.max(l.start+1,u);return{text:l.text,romanizedText:l.romanizedText,start:l.start,end:Math.min(Math.max(l.end,l.start+1),d),animateLetters:he(l.text,l.start,Math.min(Math.max(l.end,l.start+1),d))}})}function Ui(e,t,n){let r=Math.max(n,t+e.length*wt),i=e.reduce((s,o)=>s+wn(o.text),0)||e.length,a=t;return e.map((s,o)=>{let l=o===e.length-1,c=e.length-o,u=Math.max(1,r-a),d=(r-t)*wn(s.text)/i,m=Math.max(1,u-(c-1)),p=l?u:S(d,1,m),f=a,y=l?r:a+p;return a=y,{text:s.text,romanizedText:s.romanizedText,contextRomanizedText:s.contextRomanizedText,start:f,end:y,animateLetters:he(s.text,f,y)}})}function Ki(e,t,n){return Number.isFinite(e)&&e>t?Math.min(e,n):n}function wn(e){return Math.max(1,Array.from(e.trim()).length)}function he(e,t,n){let r=Array.from(e.trim());return r.length<Jr||n-t<Qr?!1:r.some(i=>/[A-Za-z0-9]/.test(i))}function Un(e,t){we();let n=(t??Array.from(e.querySelectorAll(".liquid-lyrics-line"))).filter(da);if(n.length===0)return;let r=n.map(i=>I(i));M={container:e,lines:n,ranges:r,activeIndex:-2},Kn()}function we(){Ce!==null&&(cancelAnimationFrame(Ce),Ce=null),R&&(clearTimeout(R),R=null),M=null,ye=!1}function Kn(){M&&(Zi(M),Ce=requestAnimationFrame(Kn))}function Zi(e){let t=Q(),n=Qi(e,t);n!==e.activeIndex&&(Zn(e,n,t),e.activeIndex=n),n>=0&&(Rt(e.container,n),Ee(e.lines[n],t))}function Qi(e,t){let n=0,r=e.ranges.length-1;for(;n<=r;){let a=n+r>>1,s=e.ranges[a];if(t>=s.start&&t<s.end)return a;t<s.start?r=a-1:n=a+1}if(e.activeIndex>=0){let a=e.ranges[e.activeIndex];if(t>=a.start&&t<a.end+bn)return e.activeIndex}let i=Math.min(Math.max(0,n-1),e.ranges.length-1);if(i>=0&&i<e.ranges.length){let a=e.ranges[i];if(a.end<=t&&t-a.end<=bn)return i}return-1}function Zn(e,t,n){let r=e.activeIndex>=0?e.lines[e.activeIndex]:null,i=H.has(e.container);if(e.lines.forEach((a,s)=>{let o=s===t,l=s===e.activeIndex;if(a.classList.toggle("active",o),i&&!a.isConnected&&!o&&!l)return;if(o){a.classList.remove("past","future"),l||(a.dataset.llLineState="active",Qn(a,n)),a.classList.remove("ll-finishing");return}let c=e.ranges[s]??I(a);t>=0&&s<t||t<0&&c.end<=n?(a.dataset.llLineState!=="past"||l)&&Jn(a,l):(a.dataset.llLineState!=="future"||l)&&Xn(a,l)}),t>=0&&!ye){Rt(e.container,t);let a=()=>{M?.container===e.container&&er(e.container,e.lines[t])};r?.classList.contains("liquid-lyrics-interlude")?window.setTimeout(a,180):a()}ee(e.container)}function Qn(e,t){if(e.classList.remove("past","future","ll-finishing"),!e.classList.contains("ll-syllable-line"))return;let n=Ye(e);n.syllables.length!==0&&(n.activeKey="",n.activeIndices=[],n.syllables.forEach((r,i)=>{let a=n.ranges[i],s=t<a.start?"future":t>=a.end?"sung":"singing";$e(r,s),s!=="singing"&&(r.style.setProperty("--syl-progress",s==="sung"?"100":"-20"),r.style.setProperty("--syl-lift","0px"),r.style.setProperty("--syl-scale","1"),n.isLongWord[i]&&re(r,s==="sung"?1:0,!1))}))}function Ee(e,t){let n=I(e),r=At(n,t);e.classList.contains("liquid-lyrics-interlude")?ia(e,r):e.classList.contains("ll-syllable-line")?Ji(e,t):U(e,"--line-progress",String(r*100),.08),e.classList.toggle("ll-glow",r>Kr)}function Ji(e,t){let n=Ye(e);if(n.syllables.length===0)return;let r=ea(n.ranges,t),i=r.length>0?r.join(","):`gap:${Xi(n.ranges,t)}`;i!==n.activeKey&&(n.activeKey=i,n.activeIndices=r,n.syllables.forEach((a,s)=>{let o=n.ranges[s],l=t<o.start,c=t>=o.end,u=l?"future":c?"sung":"singing";$e(a,u),u!=="singing"&&(a.style.setProperty("--syl-progress",u==="sung"?"100":"-20"),a.style.setProperty("--syl-lift","0px"),a.style.setProperty("--syl-scale","1"),n.isLongWord[s]&&re(a,u==="sung"?1:0,!1))})),n.activeIndices.forEach(a=>{let s=n.syllables[a],o=n.ranges[a],l=n.isLongWord[a],c=At(o,t),u=!l&&c>0&&c<1?Math.sin(c*Math.PI):0;U(s,"--syl-progress",String(-20+120*c),.18),U(s,"--syl-lift",`${(-5*u).toFixed(3)}px`,.04),U(s,"--syl-scale",String(1+.018*u),5e-4),l&&re(s,c,!0)})}function Xi(e,t){let n=0,r=e.length-1,i=-1;for(;n<=r;){let a=n+r>>1;e[a].end<=t?(i=a,n=a+1):r=a-1}return i}function ea(e,t){let n=ta(e,t);if(n<0)return[];let r=[];for(let i=n;i<e.length;i++){let a=e[i];if(a.start>t)break;t>=a.start&&t<a.end&&r.push(i)}return r}function ta(e,t){let n=0,r=e.length-1,i=-1;for(;n<=r;){let a=n+r>>1;e[a].end>t?(i=a,r=a-1):n=a+1}return i}function $e(e,t){e.dataset.llState!==t&&(e.dataset.llState=t,e.classList.toggle("singing",t==="singing"),e.classList.toggle("sung",t==="sung"),e.classList.toggle("future",t==="future"))}function re(e,t,n){let r=ra(e);if(r.length===0)return;let i=n?"active":t>=1?"sung":"future";!n&&e.dataset.letterState===i||(e.dataset.letterState=i,r.forEach((a,s)=>{if(!n){a.style.setProperty("--letter-progress",t>=1?"100":"-20"),a.style.setProperty("--letter-lift","0px"),a.style.setProperty("--letter-scale","1");return}let o=(s+.5)/r.length,l=Math.max(.16,1.8/r.length),c=1-S(Math.abs(t-o)/l),u=ge(0,1,c),m=-20+120*S(t*r.length-s);U(a,"--letter-progress",String(m),.2),U(a,"--letter-lift",`${(-5.5*u).toFixed(3)}px`,.04),U(a,"--letter-scale",String(1+.02*u),5e-4)}))}function U(e,t,n,r=0){let i=vn.get(e);i||(i=new Map,vn.set(e,i));let a=i.get(t);if(a!==void 0){let s=e.style.getPropertyValue(t);if(r>0){let o=parseFloat(a),l=parseFloat(s),c=parseFloat(n);if(!Number.isNaN(o)&&!Number.isNaN(l)&&!Number.isNaN(c)&&Math.abs(o-c)<=r&&Math.abs(l-c)<=r)return}else if(a===n&&s===n)return}i.set(t,n),e.style.setProperty(t,n)}function na(e){let t=bt.get(e);if(t)return t;let n=Array.from(e.querySelectorAll(".ll-syllable"));return bt.set(e,n),n}function Ye(e){let t=xt.get(e),n=na(e);if(t&&t.syllables.length===n.length&&t.syllables[0]===n[0]&&t.syllables[t.syllables.length-1]===n[n.length-1])return t;let r={syllables:n,ranges:n.map(i=>I(i)),isLongWord:n.map(i=>i.classList.contains("ll-long-syllable")),activeKey:"",activeIndices:[]};return xt.set(e,r),r}function Nt(e){bt.delete(e),xt.delete(e)}function ra(e){let t=ht.get(e);if(t)return t;let n=Array.from(e.querySelectorAll(".ll-letter"));return ht.set(e,n),n}function ia(e,t){let n=ge(0,.22,t),r=1-ge(.99,1,t),i=S(Math.min(n,r)),s=-24*ge(.76,1,t),o=.72+.28*n;e.style.setProperty("--interlude-visibility",String(i)),e.style.setProperty("--interlude-y",`${s.toFixed(3)}px`),e.style.setProperty("--interlude-scale",String(o)),e.querySelectorAll(".ll-interlude-dot").forEach(c=>aa(c,t))}function aa(e,t){let n=Number(e.dataset.dotIndex??0),r=n/3,i=(n+1)/3,a=1-ge(.99,1,t);if(e.style.opacity=t>=.99?String(a):"",t<r){e.classList.remove("lit"),e.style.transform="translateY(0px) scale(1)";return}if(e.classList.add("lit"),t>=i){e.style.transform="translateY(0px) scale(1)";return}let s=S((t-r)/(i-r)),o=Math.sin(s*Math.PI)*-12;e.style.transform=`translateY(${o.toFixed(3)}px) scale(1)`}function Jn(e,t=!1){if(e.classList.remove("active","ll-glow"),e.classList.add("past"),e.classList.remove("future"),e.dataset.llLineState="past",e.classList.toggle("ll-finishing",t),e.style.setProperty("--line-progress","100"),e.style.setProperty("--interlude-visibility","0"),e.style.setProperty("--interlude-y","-24px"),e.style.setProperty("--interlude-scale","0.72"),t||e.dataset.llChildrenDirty==="true"){let n=e.classList.contains("ll-syllable-line")?Ye(e):null;n?.syllables.forEach(r=>{$e(r,"sung"),r.style.setProperty("--syl-progress","100"),r.style.setProperty("--syl-lift","0px"),r.style.setProperty("--syl-scale","1"),re(r,1,!1)}),n&&(n.activeKey="",n.activeIndices=[])}e.querySelectorAll(".ll-interlude-dot").forEach(n=>{n.classList.add("lit"),n.style.opacity=t?"0":"",n.style.transform="translateY(-24px) scale(1)"})}function Xn(e,t=!1){if(e.classList.remove("active","ll-glow","ll-finishing"),e.classList.add("future"),e.classList.remove("past"),e.dataset.llLineState="future",e.style.setProperty("--line-progress","-20"),e.style.setProperty("--interlude-visibility","0"),e.style.setProperty("--interlude-y","-24px"),e.style.setProperty("--interlude-scale","0.72"),t||e.dataset.llChildrenDirty==="true"){let n=e.classList.contains("ll-syllable-line")?Ye(e):null;n?.syllables.forEach(r=>{$e(r,"future"),r.style.setProperty("--syl-progress","-20"),r.style.setProperty("--syl-lift","0px"),r.style.setProperty("--syl-scale","1"),re(r,0,!1)}),n&&(n.activeKey="",n.activeIndices=[])}e.querySelectorAll(".ll-interlude-dot").forEach(n=>{n.classList.remove("lit"),n.style.opacity="",n.style.transform="scale(1)"})}function er(e,t){let n=H.get(e),r=n?K.get(t):void 0;if(n&&r!==void 0){Rt(e,r);let o=n.heights[r]??t.offsetHeight,l=n.virtualSpace.offsetTop+(n.offsets[r]??0)-e.clientHeight/2+o/2;e.scrollTo({top:Math.max(0,l),behavior:"smooth"});return}let i=e.getBoundingClientRect(),a=t.getBoundingClientRect(),s=e.scrollTop+a.top-i.top-i.height/2+a.height/2;e.scrollTo({top:s,behavior:"smooth"})}function gt(){ye=!0,R&&clearTimeout(R),R=setTimeout(()=>{ye=!1},Ur)}function Ge(e,t){let n=L(t);n&&(e.dataset.romanizedText=n)}function L(e){return String(e??"").replace(/\s+/g," ").trim()}function O(e){let t=L(e);return t&&!z(t)?t:""}function la(e){return L(e.Text)}function sa(e){return L(e?.LiquidLyricsOriginalText)||Wi(e?.Syllables??[])}function En(e){return/[\u3040-\u30ff\u31f0-\u31ff\uff65-\uff9f]/.test(e)?"ja":/[\uac00-\ud7af]/.test(e)?"ko":"auto"}function oa(e,t,n){let r=L(e),i=L(t);return r?i?`${r}${n}${i}`:r||void 0:i||void 0}function z(e){return/[\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff65-\uff9f\uac00-\ud7af]/.test(e)}function fe(e){let t=Math.max(0,Math.round(e));tr(t),Spicetify.Player?.seek?.(t)}function Q(){return ua()}function ca(){return h(Spicetify.Player?.getProgress?.(),0)}function ua(){let e=ca(),t=String(Spicetify.Player?.data?.item?.uri??""),n=me(),r=performance.now(),i=In(),a=Pn+(r-Rn),s=t!==zn,o=Math.abs(e-a)>1200;return!i||s||o?(tr(e,t,r),e):St(a,0,n||Number.POSITIVE_INFINITY)}function tr(e,t=String(Spicetify.Player?.data?.item?.uri??""),n=performance.now()){zn=t,Pn=Math.max(0,e),Rn=n}function xe(e,t){let n={start:Math.round(t.start),end:Math.round(t.end)};e.dataset.start=String(n.start),e.dataset.end=String(n.end),Lt.set(e,n)}function I(e){let t=Lt.get(e);if(t)return t;let n=h(e.dataset.start,0),r=e.classList.contains("ll-syllable"),i=r?wt:Oe,a=r?1:Le,s={start:n,end:Ft(Number(e.dataset.end),n,n+i,a)};return Lt.set(e,s),s}function da(e){return e.dataset.start!==void 0&&e.dataset.end!==void 0}function At(e,t){let n=Math.max(1,e.end-e.start);return S((t-e.start)/n)}function nr(e,t){return!Number.isFinite(t)||t<=e?e:t-e<qn?t:e}function Ft(e,t,n,r,i=Number.POSITIVE_INFINITY){let a=h(e,n),s=a>=t+r?a:Math.max(n,t+r);return Math.min(s,i)}function h(e,t){let n=Number(e);return Number.isFinite(n)?Math.max(0,n):t}function St(e,t,n){return Math.min(n,Math.max(t,e))}function S(e,t=0,n=1){return Math.min(n,Math.max(t,e))}function ge(e,t,n){let r=S((n-e)/(t-e));return r*r*(3-2*r)}var Ue=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var _t="liquid-lyrics-button";function rr(){let e=document.getElementById(_t);if(e)return e;let t=document.querySelector(".main-nowPlayingBar-extraControls");if(!t)return null;let n=document.createElement("button");return n.id=_t,n.className="liquid-lyrics-button",n.setAttribute("aria-label","Liquid Lyrics"),n.innerHTML=Ue,E(n,"Liquid Lyrics"),n.addEventListener("click",()=>{Wn(),n.classList.toggle("active",x())}),t.prepend(n),n}function ir(){let e=document.getElementById(_t);e&&e.classList.toggle("active",x())}var J="liquid-lyrics-sidebar-card",fr="liquid-lyrics-sidebar-card-collapsed",Ze=4500,Qe=250,Ut=80,pa=12,fa=500,gr=3e3,ga=700,ya=3,ba=.92,Wt=null,ar=null,Me=null,v=[],B=[],Je=[],Kt="Loading lyrics...",C=!1,D=-2,ze=!1,Ke=0,Ot=!1,Bt=!1,lr=[],yr="",br=0,hr=0,sr=new WeakMap,or=new WeakMap,Vt=new WeakMap,Xe=new WeakMap,cr=new WeakMap,Dt={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>'};function Zt(){let e=document.getElementById(J);if(e)return j(e),e;let t=document.createElement("section");t.id=J,t.className="liquid-lyrics-sidebar-card",t.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${Ue}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${Dt.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${Dt.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${Dt.open}</button>
      </div>
      <button class="ll-sidebar-collapse-btn" type="button" aria-label="Toggle mini lyrics">
        <span class="ll-sidebar-card-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg>
        </span>
      </button>
    </div>
    <div class="ll-sidebar-card-body">
      <div class="ll-sidebar-mini-viewport">
        <div class="ll-sidebar-mini-lines">
          <div class="ll-sidebar-mini-empty">Loading lyrics...</div>
        </div>
      </div>
    </div>
  `;let n=t.querySelector(".ll-sidebar-header-main"),r=t.querySelector(".ll-sidebar-collapse-btn"),i=t.querySelector(".ll-sidebar-roman-toggle"),a=t.querySelector(".ll-sidebar-fullscreen-toggle"),s=t.querySelector(".ll-sidebar-open-toggle"),o=()=>{let l=!t.classList.contains("collapsed");localStorage.setItem(fr,String(l)),ur(t),V()};return n?.addEventListener("click",o),r?.addEventListener("click",o),i?.addEventListener("click",l=>{l.stopPropagation(),Wa()}),a?.addEventListener("click",l=>{l.stopPropagation(),Fn(!1)}),s?.addEventListener("click",l=>{l.stopPropagation(),De()}),r&&E(r,"Toggle mini lyrics"),i&&E(i,"Romanization"),a&&E(a,"Fullscreen"),s&&E(s,"Open Liquid Lyrics"),ur(t),j(t),xa(),La(),ie(),V(),t}function V(){let e=document.getElementById(J);if(!e)return;j(e),Oa(e);let t=x();e.classList.toggle("ll-hidden",t),$t(e);let n=!t&&!e.classList.contains("collapsed")&&v.length>0&&!ze;n&&Me===null?Lr():n||vr(),!t&&C&&g()&&v.some(Sr)&&rt()}function Qt(){j()}function Jt(e,t="No lyrics available"){v=e?Ja(e):[],Je=v.map(Ma),ze=v.length>0&&v.every(n=>n.type==="static"),Kt=e?"Live lyrics":t,C=v.some(ja),D=-2,ie(),C&&g()&&rt()}function xr(e){v=[],Je=[],ze=!1,Kt=e,C=!1,D=-2,ie()}function j(e=document.getElementById(J)){if(!e)return;let t=ha();t&&(e.parentElement!==t||t.lastElementChild!==e)&&t.appendChild(e)}function ha(){let e=document.querySelector(".Root__right-sidebar")||P(["right","sidebar"])||P(["Root","right"]);return e?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||P(["nowplayingview","nowplayingwidget"],e??void 0)||P(["nowplaying","widget"],e??void 0)||P(["nowplayingview","nowplayingwidget"])||P(["nowplaying","widget"])||e?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid")||P(["nowplayingview","nowplayinggrid"],e??void 0)||P(["nowplaying","grid"],e??void 0)||P(["nowplayingview","nowplayinggrid"])||P(["nowplaying","grid"])||e}function P(e,t=document){let n=e.map(i=>i.toLowerCase());return Array.from(t.querySelectorAll("*")).find(i=>{let a=(i.getAttribute("class")||"").toLowerCase();return n.every(s=>a.includes(s))})??null}function xa(){Wt||(Wt=new MutationObserver(()=>{jt(),j()}),Wt.observe(document.body,{childList:!0,subtree:!0}),jt())}function La(){ar||(ar=setInterval(()=>{jt(),j()},1e3))}function jt(){if(!!document.querySelector(".Root__cinema-view")){Bt=!0;return}Bt&&(Bt=!1,va())}function va(){lr.forEach(e=>clearTimeout(e)),lr=[80,260,620,1100].map(e=>setTimeout(()=>{let t=document.getElementById(J)??Zt();j(t),V()},e))}function ur(e){let t=localStorage.getItem(fr)==="true";e.classList.toggle("collapsed",t),e.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!t))}function ie(){let e=Ea(),t=e?.querySelector(".ll-sidebar-mini-lines");if(!(!e||!t)){if(vr(),e.dataset.romanized=String(g()),t.replaceChildren(),B=[],D=-2,v.length===0){let n=document.createElement("div");n.className="ll-sidebar-mini-empty",n.textContent=Kt,t.appendChild(n),$t(e);return}v.forEach((n,r)=>{let i=Ta(n,r);B.push(i),t.appendChild(i)}),ze&&B.forEach(n=>Tr(n)),$t(e),V()}}function Ta(e,t){let n=document.createElement(e.start===null?"div":"button");if(n.className="liquid-lyrics-line ll-sidebar-mini-line",e.type==="interlude"?n.classList.add("liquid-lyrics-interlude","ll-sidebar-mini-interlude"):e.type==="syllable"?n.classList.add("ll-syllable-line","ll-sidebar-syllable-line"):e.type==="static"?n.classList.add("liquid-lyrics-static","static"):n.classList.add("ll-sidebar-block-line"),n instanceof HTMLButtonElement&&(n.type="button",n.addEventListener("click",()=>{e.start!==null&&dl(e.start)})),n.dataset.index=String(t),n.dataset.start=String(e.start??0),n.dataset.end=String(e.end??0),n.style.setProperty("--line-progress",e.type==="static"?"100":"-20"),e.type==="interlude")n.classList.add("future"),n.setAttribute("aria-hidden","true"),n.style.setProperty("--interlude-visibility","0"),n.style.setProperty("--interlude-y","-24px"),n.style.setProperty("--interlude-scale","1"),Sa(n);else if(e.type==="syllable"){let r=document.createElement("div");r.className="ll-vocal-line ll-lead-vocal";let i=Va(e);i.forEach((a,s)=>{let o={...a,animateLetters:qe(a.text,a.start,a.end)},l=document.createElement("span");l.className="ll-syllable",o.animateLetters&&l.classList.add("ll-long-syllable"),w(a.text)&&l.classList.add("ll-cjk-syllable"),s===i.length-1&&l.classList.add("LastWordInLine"),cl(l,a),l.dataset.originalText=a.text;let c=$(a.contextRomanizedText||a.romanizedText);c&&(l.dataset.romanizedText=c),wa(l,o),r.appendChild(l)}),n.appendChild(r)}else n.textContent=Ba(e);return n}function Sa(e){for(let t=0;t<3;t++){let n=document.createElement("span");n.className="ll-interlude-dot",n.dataset.dotIndex=String(t),e.appendChild(n)}}function wa(e,t){let n=Da(t);if(!t.animateLetters){e.removeAttribute("aria-label"),e.textContent=n;return}e.setAttribute("aria-label",n);let r=Array.from(n);e.style.setProperty("--letter-count",String(r.length)),r.forEach((i,a)=>{let s=document.createElement("span");s.className="ll-letter",s.textContent=i,s.style.setProperty("--letter-index",String(a)),s.style.setProperty("--letter-lift","0px"),s.style.setProperty("--letter-scale","1"),s.style.setProperty("--letter-progress","-20"),e.appendChild(s)})}function Ea(){let e=document.getElementById(J);return e&&j(e),e}function Ma(e){return e.start!==null&&e.end!==null?{start:e.start,end:e.end}:{start:Number.POSITIVE_INFINITY,end:Number.POSITIVE_INFINITY}}function Lr(){ka(),Me=requestAnimationFrame(Lr)}function vr(){Me!==null&&(cancelAnimationFrame(Me),Me=null)}function ka(){if(!document.getElementById(J)||B.length===0||ze)return;let t=ml(),n=qa(t);n!==D&&(za(n,t),D=n),n>=0&&Pa(B[n],v[n],t)}function qa(e){let t=0,n=Je.length-1;for(;t<=n;){let r=t+n>>1,i=Je[r];if(e>=i.start&&e<i.end)return r;e<i.start?n=r-1:t=r+1}return-1}function za(e,t){let n=D>=0?B[D]:null;if(B.forEach((r,i)=>{let a=v[i],s=i===e,o=i===D;if(r.classList.toggle("active",s),s){Xt(r),r.classList.remove("past","future","ll-finishing"),r.querySelectorAll(".ll-interlude-dot").forEach(l=>{l.style.opacity=""});return}a.type==="static"||a.end!==null&&a.end<=t?Tr(r,o):Aa(r)}),e>=0){let r=()=>_a(B[e]);n?.classList.contains("liquid-lyrics-interlude")?window.setTimeout(r,180):r()}}function Pa(e,t,n){if(t.start===null||t.end===null)return;let r=sl({start:t.start,end:t.end},n);if(e.classList.toggle("ll-glow",r>ba),t.type==="interlude"){Ha(e,r);return}if(t.type==="syllable"){Ra(e,n);return}Ca(e,"--line-progress",String(r*100),.08)}function Ra(e,t){en(e).forEach(n=>{let{start:r,end:i}=ul(n),a=t<r,s=t>=i,o=n.classList.contains("ll-long-syllable"),l=a?"future":s?"sung":"singing";if(n.dataset.llState!==l&&(n.dataset.llState=l,n.classList.toggle("singing",l==="singing"),n.classList.toggle("sung",l==="sung"),n.classList.toggle("future",l==="future"),l!=="singing"&&(n.style.setProperty("--syl-progress",l==="sung"?"100":"-20"),n.style.setProperty("--syl-lift","0px"),n.style.setProperty("--syl-scale","1"),o&&et(n,l==="sung"?1:0,!1))),l!=="singing")return;let c=A((t-r)/Math.max(1,i-r)),u=o?0:Math.sin(c*Math.PI);n.style.setProperty("--syl-progress",String(-20+120*c)),n.style.setProperty("--syl-lift",`${(-5*u).toFixed(3)}px`),n.style.setProperty("--syl-scale",String(1+.018*u)),o&&et(n,c,!0)})}function Ha(e,t){let n=ke(0,.22,t),r=1-ke(.99,1,t),i=A(Math.min(n,r)),s=-24*ke(.76,1,t),o=.72+.28*n;e.style.setProperty("--interlude-visibility",String(i)),e.style.setProperty("--interlude-y",`${s.toFixed(3)}px`),e.style.setProperty("--interlude-scale",String(o)),e.querySelectorAll(".ll-interlude-dot").forEach(l=>Ia(l,t))}function Ia(e,t){let n=Number(e.dataset.dotIndex??0),r=n/3,i=(n+1)/3,a=1-ke(.99,1,t);if(e.style.opacity=t>=.99?String(a):"",t<r){e.classList.remove("lit"),e.style.transform="translateY(0px) scale(1)";return}if(e.classList.add("lit"),t>=i){e.style.transform="translateY(0px) scale(1)";return}let s=A((t-r)/(i-r)),o=Math.sin(s*Math.PI)*-10;e.style.transform=`translateY(${o.toFixed(3)}px) scale(1)`}function et(e,t,n){let r=Fa(e);if(r.length===0)return;let i=n?"active":t>=1?"sung":"future";!n&&e.dataset.letterState===i||(e.dataset.letterState=i,r.forEach((a,s)=>{if(!n){a.style.setProperty("--letter-progress",t>=1?"100":"-20"),a.style.setProperty("--letter-lift","0px"),a.style.setProperty("--letter-scale","1");return}let o=(s+.5)/r.length,l=Math.max(.16,1.8/r.length),c=1-A(Math.abs(t-o)/l),u=ke(0,1,c),m=-20+120*A(t*r.length-s);a.style.setProperty("--letter-progress",String(m)),a.style.setProperty("--letter-lift",`${(-5.5*u).toFixed(3)}px`),a.style.setProperty("--letter-scale",String(1+.02*u))}))}function Ca(e,t,n,r=0){let i=cr.get(e);i||(i=new Map,cr.set(e,i));let a=i.get(t);if(a!==void 0){let s=e.style.getPropertyValue(t);if(r>0){let o=parseFloat(a),l=parseFloat(s),c=parseFloat(n);if(!Number.isNaN(o)&&!Number.isNaN(l)&&!Number.isNaN(c)&&Math.abs(o-c)<=r&&Math.abs(l-c)<=r)return}else if(a===n&&s===n)return}i.set(t,n),e.style.setProperty(t,n)}function Tr(e,t=!1){if(e.classList.contains("liquid-lyrics-interlude")){Na(e,t);return}e.classList.remove("active","ll-glow"),e.classList.toggle("ll-finishing",t),e.classList.add("past"),e.classList.remove("future"),e.style.setProperty("--line-progress","100"),e.style.setProperty("--interlude-visibility","0"),e.style.setProperty("--interlude-y","-24px"),e.style.setProperty("--interlude-scale","0.72"),en(e).forEach(n=>{n.dataset.llState="sung",n.classList.add("sung"),n.classList.remove("singing","future"),n.style.setProperty("--syl-progress","100"),n.style.setProperty("--syl-lift","0px"),n.style.setProperty("--syl-scale","1"),et(n,1,!1)}),e.querySelectorAll(".ll-interlude-dot").forEach(n=>{n.classList.add("lit"),n.style.opacity=t?"0":"",n.style.transform="translateY(-24px) scale(1)"})}function Na(e,t){if(Xt(e),e.classList.remove("active","ll-glow"),e.classList.add("past"),e.classList.remove("future"),e.classList.toggle("ll-finishing",t),e.style.setProperty("--line-progress","100"),e.style.setProperty("--interlude-visibility","0"),e.style.setProperty("--interlude-y","-24px"),e.style.setProperty("--interlude-scale","0.72"),e.querySelectorAll(".ll-interlude-dot").forEach(r=>{r.classList.add("lit"),r.style.opacity=t?"0":"",r.style.transform="translateY(-24px) scale(1)"}),!t)return;let n=window.setTimeout(()=>{e.classList.remove("ll-finishing"),Xe.delete(e)},520);Xe.set(e,n)}function Aa(e){Xt(e),e.classList.remove("active","past","ll-finishing","ll-glow"),e.classList.add("future"),e.style.setProperty("--line-progress","-20"),e.style.setProperty("--interlude-visibility","0"),e.style.setProperty("--interlude-y","-24px"),e.style.setProperty("--interlude-scale","0.72"),en(e).forEach(t=>{t.dataset.llState="future",t.classList.add("future"),t.classList.remove("singing","sung"),t.style.setProperty("--syl-progress","-20"),t.style.setProperty("--syl-lift","0px"),t.style.setProperty("--syl-scale","1"),et(t,0,!1)}),e.querySelectorAll(".ll-interlude-dot").forEach(t=>{t.classList.remove("lit"),t.style.opacity="",t.style.transform="scale(1)"})}function Xt(e){let t=Xe.get(e);t&&(clearTimeout(t),Xe.delete(e))}function en(e){let t=sr.get(e);if(t)return t;let n=Array.from(e.querySelectorAll(".ll-syllable"));return sr.set(e,n),n}function Fa(e){let t=or.get(e);if(t)return t;let n=Array.from(e.querySelectorAll(".ll-letter"));return or.set(e,n),n}function _a(e){let t=e.closest(".ll-sidebar-mini-viewport");if(!t)return;let n=t.getBoundingClientRect(),r=e.getBoundingClientRect(),i=t.scrollTop+r.top-n.top-n.height/2+r.height/2;t.scrollTo({top:i,behavior:"smooth"})}function Wa(){Re(!g()),ie(),g()&&rt()}function Oa(e){let t=String(g());e.dataset.romanized!==t&&(ie(),C&&g()&&rt())}async function rt(){if(Ot)return;Ot=!0;let e=++Ke;try{let t=v.filter(Sr),n=!1,r=new Map;for(let i of t){if(e!==Ke)return;let a=xl(i.originalText),s=r.get(a);s?s.push(i):r.set(a,[i])}for(let[i,a]of r){if(e!==Ke)return;await new Promise(o=>requestAnimationFrame(()=>o())),(a.length>1?await He(a.map(o=>o.originalText),i):[await le(a[0].originalText,i)]).forEach((o,l)=>{let c=$(o.roman);c&&(a[l].contextRomanizedText=c,a[l].romanizedSourceText=a[l].originalText,n=!0)})}n&&e===Ke&&ie()}finally{Ot=!1}}function $t(e){let t=e.querySelector(".ll-sidebar-roman-toggle");t&&(t.hidden=!C,t.disabled=!C,t.classList.toggle("active",C&&g()),t.setAttribute("aria-pressed",String(C&&g())))}function Ba(e){let t=$(tt(e)||(w(e.originalText)?"":e.romanizedText));return g()&&t?t:e.originalText}function Da(e){let t=$(e.contextRomanizedText||(w(e.text)?"":e.romanizedText));return g()&&t?t:e.text}function Va(e){if(!g())return e.words;let t=$(tt(e)||(w(e.originalText)?"":e.romanizedText));return t?Ya(t,e):e.words}function ja(e){return e.type==="interlude"?!1:e.romanizedText||e.words.some(t=>!!t.romanizedText)?!0:w(e.originalText)}function Sr(e){return e.type==="interlude"||!e.originalText||!w(e.originalText)?!1:(e.type==="syllable"&&e.words.length>0,!tt(e))}function tt(e){return e.romanizedSourceText!==e.originalText?"":$(e.contextRomanizedText)}function $a(e){return e.map(t=>$(t.contextRomanizedText||t.romanizedText)).filter(Boolean).join(" ").trim()}function Ya(e,t){let n=Za(e);return n.length===0||t.start===null||t.end===null?t.words:t.words.length===n.length?n.map((r,i)=>tn(r,t.words[i].start,t.words[i].end)):n.length<t.words.length?Ga(n,t.words):Ka(n,{start:t.start,end:t.end})}function Ga(e,t){let n=e.map(nt),r=t.map(c=>Qa(c.text)),i=[0];r.forEach(c=>i.push(i[i.length-1]+c));let a=n.reduce((c,u)=>c+u,0)||e.length,s=i[i.length-1]||t.length,o=0,l=0;return e.map((c,u)=>{let d=u===e.length-1,m=e.length-u,p=t.length;if(!d){l+=n[u];let at=l/a*s,lt=o+1,st=t.length-(m-1);p=Ua(i,at,lt,st)}let f=t.slice(o,p);o=p;let y=f[0]??t[t.length-1],it=f[f.length-1]??y;return tn(c,y.start,it.end)})}function Ua(e,t,n,r){let i=n,a=Number.POSITIVE_INFINITY;for(let s=n;s<=r;s++){let o=Math.abs((e[s]??0)-t);o<a&&(i=s,a=o)}return i}function Ka(e,t){let n=t.start,r=Math.max(t.end,n+e.length),i=e.reduce((s,o)=>s+nt(o),0)||e.length,a=n;return e.map((s,o)=>{let l=o===e.length-1,c=e.length-o,u=Math.max(1,r-a),d=l?u:A((r-n)*nt(s)/i,1,u-(c-1)),m=a,p=l?r:a+d;return a=p,tn(s,m,p)})}function tn(e,t,n){let r=Math.max(t+1,n);return{text:e,romanizedText:e,contextRomanizedText:e,start:t,end:r,animateLetters:qe(e,t,r)}}function Za(e){return $(e).split(/\s+/).map(t=>t.trim()).filter(Boolean)}function nt(e){let t=e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"");if(!t)return Math.max(1,Array.from(e).length);let n=t.match(/[aeiouy]+/g)?.length??0,r=t.match(/n(?![aeiouy])/g)?.length??0;return Math.max(1,n+r)}function Qa(e){return w(e)?Math.max(.5,Array.from(e).reduce((t,n)=>/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(n)?t+2:/[\u3041\u3043\u3045\u3047\u3049\u3083\u3085\u3087\u308e\u3095\u3096\u30a1\u30a3\u30a5\u30a7\u30a9\u30e3\u30e5\u30e7\u30ee]/.test(n)?t+.45:/[\u3040-\u30ff\u31f0-\u31ff\uff65-\uff9f\uac00-\ud7af]/.test(n)?t+1:/[A-Za-z0-9]/.test(n)?t+.35:/\S/.test(n)?t+.2:t,0)):nt(e)}function Ja(e){if(e.Type==="Line"){let t=e.Content??[],n=t.map((r,i)=>Xa(r,t[i+1])).filter(r=>r.type==="interlude"||r.originalText);return dr(n)}if(e.Type==="Syllable"){let t=e.Content??[],n=t.map((r,i)=>el(r,t[i+1])).filter(r=>r.originalText);return dr(n)}return(e.Lines??[]).map(t=>({type:"static",originalText:N(t.Text),romanizedText:N(t.RomanizedText),start:null,end:null,words:[]})).filter(t=>t.originalText)}function Xa(e,t){let n=T(e.StartTime,0),r=T(t?.StartTime,NaN),i=Number.isFinite(r)&&r>n?r:n+Ze,a=T(e.EndTime,n+Ze),s=Er(wr(a,r),n,i);return e.Type==="Interlude"?Yt(n,s):{type:"line",originalText:bl(e),romanizedText:N(e.RomanizedText),start:n,end:s,words:[]}}function el(e,t){let n=e.Lead,r=T(n?.StartTime,0),i=T(t?.Lead?.StartTime,NaN),a=Number.isFinite(i)&&i>r?i:r+Ze,s=T(n?.EndTime,r+Ze),o=Er(wr(s,i),r,a),l=il(tl(n?.Syllables??[],{start:r,end:o}),{start:r,end:o});return{type:"syllable",originalText:hl(n)||l.map(c=>c.text).join(" ").trim(),romanizedText:$a(l),start:r,end:o,words:l}}function Yt(e,t){return{type:"interlude",originalText:"",start:e,end:Math.max(t,e+Qe),words:[]}}function dr(e){let t=[],n=e.find(r=>r.start!==null&&r.end!==null);return n&&n.start!==null&&n.start>fa&&t.push(Yt(0,n.start)),e.forEach((r,i)=>{t.push(r);let a=e[i+1];!a||r.end===null||a.start===null||a.start-r.end<gr||t.push(Yt(r.end,a.start))}),t}function tl(e,t){let n=[],r=null,i=!1;return e.forEach((a,s)=>{let o={text:N(a.Text),romanizedText:N(a.RomanizedText),start:T(a.StartTime,t.start),end:T(a.EndTime,t.start+Ut),animateLetters:!1};!!(a.IsPartOfWord||i)&&!w(o.text)&&!w(r?.text??"")?r?(r.text+=o.text,r.romanizedText=ll(r.romanizedText,o.romanizedText," "),r.start=Math.min(r.start,o.start),r.end=Math.max(r.end,o.end)):r=o:(r&&n.push(r),r=o),i=!!a.IsPartOfWord,(!a.IsPartOfWord||s===e.length-1)&&r&&(n.push(r),r=null)}),n.filter(a=>a.text)}function nl(e){let t="",n="",r=!1;return e.forEach(i=>{let a=N(i.Text);if(!a)return;let s=!t||i.IsPartOfWord||r||rl(n,a);t+=s?a:` ${a}`,n=a,r=!!i.IsPartOfWord}),t.trim()}function rl(e,t){return!e||!t||/^[,.;:!?)]/.test(t)||/[(]$/.test(e)?!0:w(e)||w(t)}function il(e,t){if(e.length===0)return[];let n=t.start,r=Math.max(t.end,n+Qe),i=e.map(l=>({text:l.text,romanizedText:l.romanizedText,contextRomanizedText:l.contextRomanizedText,start:Gt(l.start,n,r),end:Gt(l.end,n,r),animateLetters:!1})).filter(l=>l.text.trim().length>0),a=n;i.forEach((l,c)=>{let u=c===0?n:a;l.start=Math.max(u,l.start),a=l.start});let s=[];i.forEach(l=>{let c=s[s.length-1],u=c?.[0]?.start;c&&u!==void 0&&Math.abs(l.start-u)<=pa?(l.start=u,c.push(l)):s.push([l])});let o=[];return s.forEach((l,c)=>{let u=l[0].start,d=s[c+1]?.[0]?.start??r;if(l.length===1){o.push({...l[0],start:u,end:mr(l[0].end,u,d),animateLetters:qe(l[0].text,u,mr(l[0].end,u,d))});return}al(l,u,d).forEach(m=>o.push(m))}),o.map((l,c)=>{let u=o[c+1]?.start??r,d=Math.min(Math.max(l.end,l.start+1),Math.max(l.start+1,u));return{...l,end:d,animateLetters:qe(l.text,l.start,d)}})}function al(e,t,n){let r=Math.max(n,t+e.length*Ut),i=e.reduce((s,o)=>s+pr(o.text),0)||e.length,a=t;return e.map((s,o)=>{let l=o===e.length-1,c=e.length-o,u=Math.max(1,r-a),d=(r-t)*pr(s.text)/i,m=Math.max(1,u-(c-1)),p=l?u:A(d,1,m),f=a,y=l?r:a+p;return a=y,{...s,start:f,end:y,animateLetters:qe(s.text,f,y)}})}function mr(e,t,n){return Number.isFinite(e)&&e>t?Math.min(e,n):n}function pr(e){return Math.max(1,Array.from(e.trim()).length)}function qe(e,t,n){let r=Array.from(e.trim());return r.length<ya||n-t<ga?!1:r.some(i=>/[A-Za-z0-9]/.test(i))}function ll(e="",t="",n=""){return e?t?`${e}${n}${t}`:e:t}function wr(e,t){return!Number.isFinite(t)||t<=e?e:t-e<gr?t:e}function Er(e,t,n){let r=T(e,n);return Math.max(t+Qe,Math.min(Math.max(r,t+Qe),n))}function sl(e,t){return A((t-e.start)/Math.max(1,e.end-e.start))}function ol(e,t){let n=T(e,t+Ut);return Math.max(t+1,n)}function cl(e,t){let n={start:Math.round(t.start),end:Math.round(t.end)};e.dataset.start=String(n.start),e.dataset.end=String(n.end),Vt.set(e,n)}function ul(e){let t=Vt.get(e);if(t)return t;let n=T(e.dataset.start,0),r={start:n,end:ol(e.dataset.end,n)};return Vt.set(e,r),r}function dl(e){let t=Math.max(0,Math.round(e));Mr(t),Spicetify.Player?.seek?.(t)}function ml(){return fl()}function pl(){return T(Spicetify.Player?.getProgress?.(),0)}function fl(){let e=pl(),t=String(Spicetify.Player?.data?.item?.uri??""),n=yl(),r=performance.now(),i=gl(),a=br+(r-hr),s=t!==yr,o=Math.abs(e-a)>1200;return!i||s||o?(Mr(e,t,r),e):Gt(a,0,n||Number.POSITIVE_INFINITY)}function Mr(e,t=String(Spicetify.Player?.data?.item?.uri??""),n=performance.now()){yr=t,br=Math.max(0,e),hr=n}function gl(){let e=Spicetify.Player;return!!(e?.isPlaying?.()??e?.data?.is_playing??e?.data?.isPlaying)}function yl(){let e=Spicetify.Player?.data?.item;return T(e?.duration?.milliseconds??e?.duration_ms??e?.duration??Spicetify.Player?.data?.duration,0)}function T(e,t){let n=Number(e);return Number.isFinite(n)?Math.max(0,n):t}function Gt(e,t,n){return Math.min(n,Math.max(t,e))}function N(e){return String(e??"").replace(/\s+/g," ").trim()}function $(e){let t=N(e);return t&&!w(t)?t:""}function bl(e){return N(e.Text)}function hl(e){return N(e?.LiquidLyricsOriginalText)||nl(e?.Syllables??[])}function xl(e){return/[\u3040-\u30ff\u31f0-\u31ff\uff65-\uff9f]/.test(e)?"ja":/[\uac00-\ud7af]/.test(e)?"ko":"auto"}function w(e){return/[\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff65-\uff9f\uac00-\ud7af]/.test(e)}function A(e,t=0,n=1){return Math.min(n,Math.max(t,e))}function ke(e,t,n){let r=A((n-e)/(t-e));return r*r*(3-2*r)}var kr=`@property --line-progress {
  syntax: "<number>";
  inherits: false;
  initial-value: -20;
}

@property --syl-progress {
  syntax: "<number>";
  inherits: false;
  initial-value: -20;
}

@property --interlude-visibility {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

:root {
  --liquid-lyrics-glowify-shadow: 0 0 var(--glowify-glow-blur, 25px) var(--glowify-glow-spread, 8px) var(--glowify-glow-accent, var(--accent-color));
  --liquid-lyrics-surface-backdrop: blur(2rem);
  --liquid-lyrics-surface-shadow: var(--glass-shadow, var(--liquid-lyrics-glowify-shadow));
  --liquid-lyrics-song-card-shadow: var(--liquid-lyrics-glowify-shadow);
}

:root:has(#glass-filter--r1-7) {
  --liquid-lyrics-surface-backdrop: var(--glass-filter, url(#glass-filter--r1-7)) blur(2px);
  --liquid-lyrics-song-card-shadow: none;
}

.liquid-lyrics-button {
  --liquify-glow-accent: var(--accent-color, #1ed760);
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.68);
  background: transparent;
  cursor: pointer;
  transition: color 180ms ease;
}

.liquid-lyrics-button:hover {
  color: #fff;
  background: transparent;
  transform: none;
}

.liquid-lyrics-button.active {
  color: var(--liquify-glow-accent, var(--accent-color));
  background: transparent;
  box-shadow: none;
}

.liquid-lyrics-panel {
  position: relative;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  background: transparent;
  font-family: var(--font-family, "Spotify Mix", "CircularSp", system-ui, sans-serif);
  isolation: isolate;
  container-type: inline-size;
}

.liquid-lyrics-panel.visible {
  display: flex;
}

.liquid-lyrics-panel.visible:not(.ll-song-card-hidden) .liquid-lyrics-song-card {
  animation: ll-song-card-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;
}

.liquid-lyrics-panel.visible .liquid-lyrics-content {
  animation: ll-lyrics-content-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;
}

.liquid-lyrics-panel.visible .liquid-lyrics-title {
  animation: ll-title-enter 360ms cubic-bezier(0.2, 0.95, 0.25, 1) both;
}

.liquid-lyrics-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: transparent;
}

.liquid-lyrics-glass-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: 20px;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.liquid-lyrics-fullscreen-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  background: transparent;
  transition: opacity 600ms ease;
}

.liquid-lyrics-panel:fullscreen .liquid-lyrics-fullscreen-bg,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-fullscreen-bg {
  opacity: 1;
  position: fixed;
  inset: 0;
  background: black;
}

.liquid-lyrics-transparent-controls {
  --ll-transparent-controls-width: 135px;
  --ll-transparent-controls-height: 64px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2147483500;
  width: var(--ll-transparent-controls-width);
  height: var(--ll-transparent-controls-height);
  pointer-events: none;
  opacity: 0;
  backdrop-filter: brightness(2.12);
  -webkit-backdrop-filter: brightness(2.12);
  transition:
    opacity 260ms ease,
    width 250ms ease,
    height 250ms ease;
}

.liquid-lyrics-panel:fullscreen .liquid-lyrics-transparent-controls,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-transparent-controls {
  opacity: 1;
}

.ll-fullscreen-bg-tile {
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0;
  transform-origin: center;
  animation: ll-fullscreen-bg-spin 30s linear infinite;
  transition: opacity 600ms ease;
}

.ll-has-bg .ll-fullscreen-bg-tile {
  opacity: 0.55;
}

.ll-fullscreen-bg-tile:nth-child(1) {
  width: 1800px;
  height: 1800px;
  left: -250px;
  top: -300px;
  animation-duration: 30s;
}

.ll-fullscreen-bg-tile:nth-child(2) {
  width: 1800px;
  height: 1800px;
  right: -200px;
  top: -348px;
  animation-direction: reverse;
  animation-duration: 25s;
}

@keyframes ll-fullscreen-bg-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes ll-song-card-enter {
  0% {
    opacity: 0;
    transform: translate3d(-24px, 22px, 0) scale(0.94);
  }
  72% {
    opacity: 1;
    transform: translate3d(2px, -3px, 0) scale(1.012);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes ll-lyrics-content-enter {
  0% {
    opacity: 0;
    transform: translate3d(18px, 24px, 0) scale(0.972);
    filter: blur(7px);
  }
  68% {
    opacity: 1;
    transform: translate3d(-1px, -3px, 0) scale(1.008);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
}

@keyframes ll-title-enter {
  0% {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes ll-fullscreen-view-enter {
  0% {
    opacity: 0.72;
    transform: translate3d(0, 24px, 0) scale(0.972);
    filter: blur(8px);
  }
  70% {
    opacity: 1;
    transform: translate3d(0, -3px, 0) scale(1.006);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: blur(0);
  }
}

.liquid-lyrics-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  padding: 32px clamp(28px, 6vw, 118px) 8px;
  pointer-events: none;
}

.liquid-lyrics-title {
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  text-shadow: 0 1px 18px rgba(255, 255, 255, 0.12);
}

.liquid-lyrics-view {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(220px, min(28vw, 360px)) minmax(360px, 1fr);
  align-items: center;
  justify-content: stretch;
  gap: clamp(22px, 3.8vw, 64px);
  padding: 86px clamp(24px, 5vw, 96px) 56px;
  transition:
    grid-template-columns 520ms cubic-bezier(0.16, 1, 0.3, 1),
    gap 520ms cubic-bezier(0.16, 1, 0.3, 1),
    width 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-song-card {
  align-self: center;
  justify-self: center;
  min-width: 0;
  width: min(100%, clamp(220px, min(25vw, calc(100vh - 320px)), 340px));
  max-width: 100%;
  max-height: calc(100% - 12px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 20px;
  color: #fff;
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-song-card-shadow);
  transform: translate3d(0, 0, 0) scale(1);
  transform-origin: center left;
  opacity: 1;
  visibility: visible;
  transition:
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    visibility 420ms step-start,
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-song-card {
  position: relative;
}

.liquid-lyrics-song-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: var(--glass-shadow, none) !important;
  border-radius: inherit;
}

.ll-song-card-cover-wrap {
  width: 100%;
  aspect-ratio: 1;
  flex: 0 0 auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
}

.ll-song-card-cover {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.ll-no-cover .ll-song-card-cover-wrap {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03)),
    rgba(255, 255, 255, 0.06);
}

.ll-song-card-controls {
  height: 60px;
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 2px;
  padding: 14px 16px 0;
}

.ll-song-card-btn,
.ll-control-btn {
  --liquify-glow-accent: var(--accent-color, #1ed760);
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  padding: 0;
  border: 0;
  border-radius: 13px;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  cursor: pointer;
  transition:
    color 180ms ease,
    background 220ms ease,
    opacity 220ms ease,
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-song-card-btn svg,
.ll-control-btn svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ll-song-card-play svg {
  fill: currentColor;
  stroke: currentColor;
}

.ll-song-card-btn:hover,
.ll-control-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  transform: translate3d(0, -1px, 0) scale(1.04);
}

.ll-song-card-btn.active,
.ll-control-btn.active {
  color: var(--liquify-glow-accent, var(--accent-color));
}

.ll-song-card-btn.ll-repeat-one {
  position: relative;
}

.ll-song-card-btn.ll-repeat-one::after {
  content: "1";
  position: absolute;
  right: 7px;
  bottom: 6px;
  font-size: 8px;
  font-weight: 900;
  line-height: 1;
  color: currentColor;
}

.ll-song-card-progress {
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 18px 20px 12px;
  flex: 0 0 auto;
}

.ll-card-time {
  color: rgba(255, 255, 255, 0.56);
  font-size: 10px;
  font-weight: 750;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.ll-card-progress-control {
  min-width: 0;
  flex: 1;
  height: 22px;
  display: flex;
  align-items: center;
}

.ll-card-progress-track {
  position: relative;
  flex: 1;
  height: 22px;
  overflow: visible;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  outline: none;
}

.ll-card-progress-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.24);
  transform: translateY(-50%);
}

.ll-card-progress-fill {
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.92);
  transition: width 80ms linear;
}

.ll-card-progress-fill.ll-no-progress-transition {
  transition: none;
}

.ll-card-progress-thumb {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.32);
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.62);
  transition:
    opacity 120ms ease,
    transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-card-preview-time {
  position: absolute;
  z-index: 3;
  left: 0;
  bottom: calc(100% + 7px);
  min-width: 42px;
  padding: 5px 8px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.96);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  text-align: center;
  font-variant-numeric: tabular-nums;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-50%, 6px, 0) scale(0.96);
  transition:
    opacity 130ms ease,
    transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-card-progress-track:hover .ll-card-progress-thumb,
.ll-card-progress-track:focus-visible .ll-card-progress-thumb,
.ll-card-progress-track.ll-previewing .ll-card-progress-thumb {
  opacity: 1;
  transform: translate3d(-50%, -50%, 0) scale(1);
}

.ll-card-progress-track:hover .ll-card-preview-time,
.ll-card-progress-track:focus-visible .ll-card-preview-time,
.ll-card-progress-track.ll-previewing .ll-card-preview-time {
  opacity: 1;
  transform: translate3d(-50%, 0, 0) scale(1);
}

.ll-song-card-info {
  padding: 8px 16px 18px;
  flex: 0 0 auto;
  text-align: center;
  min-width: 0;
}

.ll-song-card-title,
.ll-song-card-link {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ll-song-card-title {
  color: rgba(255, 255, 255, 0.96);
  font-size: 18px;
  font-weight: 800;
  line-height: 1.22;
}

.ll-song-card-artist {
  margin-top: 4px;
}

.ll-song-card-link {
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  border: 0;
  color: rgba(255, 255, 255, 0.68);
  background: transparent;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
}

.ll-song-card-album {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
}

.ll-song-card-artist {
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.25;
}

.ll-song-card-link:hover:not(:disabled) {
  color: #fff;
  text-decoration: underline;
}

.ll-song-card-link:disabled {
  cursor: default;
}

.ll-song-card-hidden .liquid-lyrics-view {
  grid-template-columns: 0 minmax(0, 1fr);
  gap: 0;
}

.ll-song-card-hidden .liquid-lyrics-song-card {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate3d(-22px, 0, 0) scale(0.96);
  transition:
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),
    visibility 360ms step-end,
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 78px 42px 132px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    black 11%,
    black 82%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    black 11%,
    black 82%,
    transparent 100%
  );
  will-change: transform;
}

.liquid-lyrics-content::-webkit-scrollbar {
  width: 5px;
}

.liquid-lyrics-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.22);
  border-radius: 999px;
}

.liquid-lyrics-content::-webkit-scrollbar-track {
  background: transparent;
}

.ll-syllable-virtual-space {
  position: relative;
  width: min(100%, 900px);
  max-width: 900px;
  flex: 0 0 auto;
}

.ll-syllable-virtual-row {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  will-change: transform;
}

.ll-syllable-virtualized .liquid-lyrics-line {
  max-width: none;
}

.liquid-lyrics-control-pill {
  position: absolute;
  z-index: 6;
  left: 50%;
  bottom: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 54px;
  padding: 9px 12px;
  border-radius: 20px;
  color: #fff;
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-50%, 28px, 0) scale(0.98);
  transition:
    opacity 280ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-panel:hover .liquid-lyrics-control-pill,
.liquid-lyrics-panel:focus-within .liquid-lyrics-control-pill {
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(-50%, 0, 0) scale(1);
}

.ll-control-btn {
  width: 38px;
  height: 38px;
}

.ll-control-btn.active {
  color: var(--liquify-glow-accent, var(--accent-color));
}

.ll-control-btn:disabled,
.ll-control-btn[hidden] {
  display: none;
}

.liquid-lyrics-tooltip {
  position: fixed;
  z-index: 2147483647;
  left: 0;
  top: 0;
  padding: 7px 10px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.94);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate3d(-50%, -6px, 0) scale(0.96);
  transform-origin: center bottom;
  transition:
    opacity 140ms ease,
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-tooltip.visible {
  opacity: 1;
  transform: translate3d(-50%, 0, 0) scale(1);
}

.liquid-lyrics-sidebar-card {
  width: 100%;
  min-width: 0;
  height: clamp(210px, 30vh, 360px);
  margin-top: 0px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  color: #fff;
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition:
    height 380ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 260ms ease,
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-sidebar-card.ll-hidden {
  display: none;
}

.ll-sidebar-card-header,
.ll-sidebar-header-main,
.ll-sidebar-collapse-btn,
.ll-sidebar-mini-line,
.ll-sidebar-island-btn {
  min-width: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.ll-sidebar-card-header {
  height: 54px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
}

.ll-sidebar-header-main {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 0;
}

.ll-sidebar-collapse-btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 10px;
}

.ll-sidebar-card-icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color, #1ed760);
}

.ll-sidebar-card-icon svg {
  width: 22px;
  height: 22px;
}

.ll-sidebar-card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 850;
}

.ll-sidebar-card-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.72);
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-sidebar-card-chevron svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.liquid-lyrics-sidebar-card.collapsed {
  height: 54px;
}

.liquid-lyrics-sidebar-card.collapsed .ll-sidebar-card-chevron {
  transform: rotate(-90deg);
}

.ll-sidebar-card-body {
  position: relative;
  height: calc(100% - 54px);
  min-height: 0;
  padding: 0 0 14px;
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transform-origin: top center;
  transition:
    opacity 240ms ease,
    transform 340ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-sidebar-card.collapsed .ll-sidebar-card-body {
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, -10px, 0) scale(0.985);
}

.ll-sidebar-control-island {
  position: relative;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 4px 6px;
  border-radius: 14px;
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
  transition:
    opacity 240ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-sidebar-island-btn {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  transition:
    color 180ms ease,
    background-color 180ms ease;
}

.ll-sidebar-island-btn svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ll-sidebar-island-btn:hover,
.ll-sidebar-island-btn.active {
  color: var(--accent-color, #1ed760);
  background-color: rgba(255, 255, 255, 0.08);
}

.ll-sidebar-island-btn[hidden] {
  display: none;
}

.ll-sidebar-mini-viewport {
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.34) transparent;
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    black 15%,
    black 82%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    black 15%,
    black 82%,
    transparent 100%
  );
}

.ll-sidebar-mini-viewport::-webkit-scrollbar {
  display: block;
  width: 5px;
}

.ll-sidebar-mini-viewport::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.34);
}

.ll-sidebar-mini-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.ll-sidebar-mini-lines {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 22px 18px 28px;
}

.ll-sidebar-mini-line {
  --mini-progress: -20;
  display: block;
  padding: 2px 0;
  color: transparent;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) calc(var(--mini-progress) * 1%),
    rgba(255, 255, 255, 0.32) calc((var(--mini-progress) * 1%) + 20%),
    rgba(255, 255, 255, 0.32) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(18px, 1.25vw, 24px);
  font-weight: 850;
  line-height: 1.18;
  letter-spacing: 0;
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: left;
  opacity: 0.44;
  transform: translate3d(0, 0, 0) scale(1);
  transform-origin: left center;
  transition:
    opacity 280ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 340ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-sidebar-mini-line.active {
  opacity: 1;
  transform: translate3d(0, -1px, 0) scale(1.045);
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.18);
}

.ll-sidebar-mini-line.past {
  opacity: 0.34;
}

.ll-sidebar-mini-line.future {
  opacity: 0.28;
}

.ll-sidebar-mini-line.static {
  color: rgba(255, 255, 255, 0.94);
  background: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);
  opacity: 0.96;
}

.ll-sidebar-mini-empty {
  margin: auto 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
}

.ll-sidebar-card-header:hover,
.ll-sidebar-mini-line:hover {
  background-color: rgba(255, 255, 255, 0.09);
}

.liquid-lyrics-line {
  --line-progress: -20;
  width: 100%;
  max-width: 900px;
  margin: 0;
  padding: 7px 0;
  position: relative;
  cursor: pointer;
  color: transparent;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.24;
  letter-spacing: 0;
  text-align: center;
  overflow-wrap: anywhere;
  word-break: normal;
  opacity: 0.28;
  filter: none;
  transform: translate3d(0, 0, 0) scale(0.955);
  transform-origin: center;
  transition:
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 560ms cubic-bezier(0.16, 1, 0.3, 1);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) calc(var(--line-progress) * 1%),
    rgba(255, 255, 255, 0.25) calc((var(--line-progress) * 1%) + 20%),
    rgba(255, 255, 255, 0.25) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.liquid-lyrics-line:hover {
  opacity: 0.56;
  filter: none;
}

.liquid-lyrics-line.active {
  opacity: 1;
  filter: none;
  transform: translate3d(0, -2px, 0) scale(1.07);
  will-change: transform, opacity;
}

.liquid-lyrics-line.ll-glow {
  filter:
    blur(0)
    saturate(1.12)
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.32))
    drop-shadow(0 0 26px rgba(151, 208, 185, 0.2));
}

.liquid-lyrics-line.ll-finishing {
  will-change: transform, opacity;
  transition:
    --line-progress 560ms linear,
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 560ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-syllable-line {
  background: none;
  display: flex;
  flex-direction: column;
  gap: 0.12em;
  -webkit-background-clip: border-box;
  background-clip: border-box;
  -webkit-text-fill-color: currentColor;
}

.ll-vocal-line {
  display: block;
  width: 100%;
}

.ll-background-vocal {
  font-size: 0.68em;
  font-weight: 700;
  line-height: 1.14;
  opacity: 0.72;
}

.ll-context-romanized .ll-background-vocal {
  display: none;
}

.ll-syllable {
  --syl-progress: -20;
  --syl-lift: 0px;
  --syl-scale: 1;
  display: inline-block;
  position: relative;
  color: transparent;
  transform: translate3d(0, var(--syl-lift), 0) scale(var(--syl-scale));
  transform-origin: center bottom;
  transition:
    transform 120ms linear,
    filter 180ms ease;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) calc(var(--syl-progress) * 1%),
    rgba(255, 255, 255, 0.28) calc((var(--syl-progress) * 1%) + 20%),
    rgba(255, 255, 255, 0.28) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ll-syllable:not(.LastWordInLine) {
  margin-right: 0.3ch;
}

.liquid-lyrics-panel:not(.ll-romanized) .ll-cjk-syllable:not(.LastWordInLine),
.liquid-lyrics-sidebar-card:not([data-romanized="true"]) .ll-cjk-syllable:not(.LastWordInLine) {
  margin-right: 0.08ch;
}

.ll-long-syllable {
  white-space: nowrap;
  background: none;
}

.ll-letter {
  --letter-lift: 0px;
  --letter-scale: 1;
  --letter-progress: -20;
  display: inline-block;
  color: transparent;
  transform: translate3d(0, var(--letter-lift), 0) scale(var(--letter-scale));
  transform-origin: center bottom;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) calc(var(--letter-progress) * 1%),
    rgba(255, 255, 255, 0.28) calc((var(--letter-progress) * 1%) + 20%),
    rgba(255, 255, 255, 0.28) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-syllable.singing {
  will-change: transform;
}

.ll-syllable.singing .ll-letter {
  will-change: transform;
}

.liquid-lyrics-panel .ll-syllable-line.past:not(.active) .ll-syllable {
  --syl-progress: 100 !important;
  --syl-lift: 0px !important;
  --syl-scale: 1 !important;
}

.liquid-lyrics-panel .ll-syllable-line.future:not(.active) .ll-syllable {
  --syl-progress: -20 !important;
  --syl-lift: 0px !important;
  --syl-scale: 1 !important;
}

.liquid-lyrics-panel .ll-syllable-line.past:not(.active) .ll-letter {
  --letter-progress: 100 !important;
  --letter-lift: 0px !important;
  --letter-scale: 1 !important;
}

.liquid-lyrics-panel .ll-syllable-line.future:not(.active) .ll-letter {
  --letter-progress: -20 !important;
  --letter-lift: 0px !important;
  --letter-scale: 1 !important;
}

.ll-finishing .ll-syllable {
  transition:
    --syl-progress 360ms linear,
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 220ms ease;
}

.ll-syllable.singing {
  filter:
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.24))
    drop-shadow(0 0 18px rgba(151, 208, 185, 0.12));
}

.liquid-lyrics-panel .ll-syllable.singing {
  filter: none;
}

.ll-syllable.future {
  filter: none;
}

.ll-syllable.sung {
  filter: none;
}

.liquid-lyrics-interlude {
  --interlude-visibility: 0;
  --interlude-y: -24px;
  --interlude-scale: 0.72;
  height: 0;
  min-height: 0;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
  opacity: var(--interlude-visibility);
  overflow: visible;
  filter: none;
  background: none;
  transform: translate3d(0, var(--interlude-y), 0) scale(var(--interlude-scale));
  transform-origin: center;
  -webkit-text-fill-color: currentColor;
  transition:
    height 560ms cubic-bezier(0.18, 1, 0.22, 1),
    padding 560ms cubic-bezier(0.18, 1, 0.22, 1),
    margin 560ms cubic-bezier(0.18, 1, 0.22, 1),
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 560ms cubic-bezier(0.18, 1, 0.22, 1);
}

.liquid-lyrics-interlude.active {
  height: 72px;
  padding: 22px 0;
  margin: 4px 0;
}

.liquid-lyrics-interlude.ll-finishing {
  transition:
    height 520ms cubic-bezier(0.22, 0.8, 0.22, 1),
    padding 520ms cubic-bezier(0.22, 0.8, 0.22, 1),
    margin 520ms cubic-bezier(0.22, 0.8, 0.22, 1),
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 520ms cubic-bezier(0.22, 0.8, 0.22, 1);
}

.liquid-lyrics-interlude:hover {
  opacity: max(var(--interlude-visibility), 0.28);
}

.ll-interlude-dot {
  width: 13px;
  height: 13px;
  display: inline-block;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.28) 62%),
    rgba(255, 255, 255, 0.24);
  box-shadow: none;
  opacity: 0.55;
  transform: scale(1);
  transform-origin: center;
  will-change: transform, opacity, background, box-shadow;
  transition:
    transform 160ms linear,
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),
    background 360ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-interlude-dot.lit {
  opacity: 1;
  background:
    radial-gradient(circle at 35% 28%, #fff, rgba(255, 255, 255, 0.78) 58%),
    rgba(255, 255, 255, 0.94);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  filter:
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.38))
    drop-shadow(0 0 24px rgba(151, 208, 185, 0.22));
}

.liquid-lyrics-static {
  cursor: default;
  opacity: 0.96;
  color: rgba(255, 255, 255, 0.94);
  background: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);
  filter: blur(0) saturate(1.04);
  transform: translate3d(0, 0, 0) scale(1);
}

.liquid-lyrics-static:hover {
  opacity: 1;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line {
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 3px 8px;
  border: 0;
  appearance: none;
  background: linear-gradient(
    to bottom,
    #fff calc(var(--line-progress) * 1%),
    rgba(255, 255, 255, 0.42) calc((var(--line-progress) * 1%) + 18%),
    rgba(255, 255, 255, 0.42) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-family: inherit;
  font-size: clamp(19px, 1.3vw, 25px);
  font-weight: 850;
  line-height: 1.16;
  letter-spacing: 0;
  text-align: center;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
  opacity: 0.42;
  filter: none;
  transform: translate3d(0, 0, 0) scale(0.98);
  transform-origin: center;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.active {
  opacity: 1 !important;
  transform: translate3d(0, -1px, 0) scale(1.025);
  filter:
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.24))
    drop-shadow(0 0 20px rgba(151, 208, 185, 0.1));
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.active.ll-glow {
  filter:
    blur(0)
    saturate(1.12)
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.34))
    drop-shadow(0 0 24px rgba(151, 208, 185, 0.18));
}

.liquid-lyrics-sidebar-card[data-romanized="true"] .liquid-lyrics-line {
  font-size: clamp(16px, 1.05vw, 22px);
  line-height: 1.2;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.past:not(.active) {
  opacity: 0.4;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.future:not(.active) {
  opacity: 0.3;
}

.liquid-lyrics-sidebar-card .ll-syllable-line {
  display: block;
  background: none;
  -webkit-text-fill-color: currentColor;
}

.liquid-lyrics-sidebar-card .ll-vocal-line {
  min-width: 0;
  max-width: 100%;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.liquid-lyrics-sidebar-card .ll-syllable {
  max-width: 100%;
  font-size: inherit;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  background: linear-gradient(
    to right,
    #fff calc(var(--syl-progress) * 1%),
    rgba(255, 255, 255, 0.42) calc((var(--syl-progress) * 1%) + 20%),
    rgba(255, 255, 255, 0.42) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.liquid-lyrics-sidebar-card .ll-letter {
  background: linear-gradient(
    to right,
    #fff calc(var(--letter-progress) * 1%),
    rgba(255, 255, 255, 0.42) calc((var(--letter-progress) * 1%) + 20%),
    rgba(255, 255, 255, 0.42) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.liquid-lyrics-sidebar-card .ll-long-syllable {
  background: none;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  -webkit-text-fill-color: currentColor;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude {
  width: 100%;
  height: 0;
  min-height: 0;
  padding: 0;
  margin: 0;
  gap: 10px;
  background: none;
  color: #fff;
  -webkit-text-fill-color: currentColor;
  opacity: var(--interlude-visibility);
  z-index: 0;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude:not(.active):not(.ll-finishing) {
  height: 0 !important;
  min-height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  opacity: 0 !important;
  pointer-events: none;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude:not(.active):not(.ll-finishing):hover {
  opacity: 0 !important;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude:not(.active):not(.ll-finishing) .ll-interlude-dot {
  opacity: 0;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude.active {
  height: 46px;
  padding: 13px 0;
  margin: 1px 0;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude.ll-finishing {
  height: 0;
  min-height: 0;
  padding: 0;
  margin: 0;
  pointer-events: none;
  transition:
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    height 520ms cubic-bezier(0.22, 0.8, 0.22, 1),
    padding 520ms cubic-bezier(0.22, 0.8, 0.22, 1),
    margin 520ms cubic-bezier(0.22, 0.8, 0.22, 1);
}

.liquid-lyrics-sidebar-card .ll-interlude-dot {
  width: 9px;
  height: 9px;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude.ll-finishing .ll-interlude-dot {
  transition:
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    background 360ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-sidebar-card .liquid-lyrics-static {
  color: rgba(255, 255, 255, 0.94);
  background: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);
  opacity: 0.96;
  filter: none;
}

.liquid-lyrics-sidebar-card .ll-sidebar-mini-line.static,
.liquid-lyrics-sidebar-card .ll-sidebar-mini-line.static.past,
.liquid-lyrics-sidebar-card .ll-sidebar-mini-line.static.future,
.liquid-lyrics-sidebar-card .liquid-lyrics-line.liquid-lyrics-static,
.liquid-lyrics-sidebar-card .liquid-lyrics-line.liquid-lyrics-static.past,
.liquid-lyrics-sidebar-card .liquid-lyrics-line.liquid-lyrics-static.future {
  color: rgba(255, 255, 255, 0.94) !important;
  background: none !important;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94) !important;
  opacity: 0.96 !important;
  filter: none !important;
}

.liquid-lyrics-empty {
  width: 100%;
  height: 100%;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 42px;
  color: rgba(255, 255, 255, 0.56);
  font-size: 16px;
  font-weight: 650;
  line-height: 1.4;
  text-align: center;
}

.ll-translation {
  display: none;
  margin-top: 6px;
  width: 100%;
  pointer-events: none;
  transform: translateY(2px);
  transition:
    opacity 420ms ease,
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-roman,
.ll-trans-text {
  display: none;
  width: 100%;
  color: rgba(255, 255, 255, 0.56);
  -webkit-text-fill-color: rgba(255, 255, 255, 0.56);
  text-align: center;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: normal;
  letter-spacing: 0;
}

.ll-roman {
  font-size: 0.54em;
  font-weight: 760;
  line-height: 1.18;
  font-style: italic;
  opacity: 0.62;
}

.ll-trans-text {
  margin-top: 2px;
  font-size: 0.52em;
  font-weight: 700;
  line-height: 1.2;
  opacity: 0.54;
}

.liquid-lyrics-line.active .ll-translation {
  transform: translateY(0);
}

.liquid-lyrics-line.active .ll-roman {
  opacity: 0.82;
  color: rgba(255, 255, 255, 0.74);
  -webkit-text-fill-color: rgba(255, 255, 255, 0.74);
}

.liquid-lyrics-line.active .ll-trans-text {
  opacity: 0.7;
  color: rgba(255, 255, 255, 0.68);
  -webkit-text-fill-color: rgba(255, 255, 255, 0.68);
}

.liquid-lyrics-panel:fullscreen,
.liquid-lyrics-panel.ll-fullscreen-mode {
  width: 100vw;
  height: 100vh;
  background: transparent !important;
}

.liquid-lyrics-panel.ll-fullscreen-mode {
  position: fixed !important;
  inset: 0 !important;
  z-index: 2147483000;
  display: flex !important;
  border-radius: 0;
}

.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
  animation: ll-fullscreen-view-enter 560ms cubic-bezier(0.18, 1, 0.22, 1) both;
}

.liquid-lyrics-panel.ll-fullscreen-mode:not(.ll-song-card-hidden) .liquid-lyrics-song-card {
  animation: ll-song-card-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;
}

.liquid-lyrics-panel:fullscreen::backdrop {
  background: transparent;
}

.liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
  grid-template-columns: minmax(220px, clamp(545px, 18vw, 330px)) minmax(540px, 1fr);
  gap: clamp(34px, 4.6vw, 104px);
  padding: 84px clamp(42px, 5vw, 104px) 58px;
}

.liquid-lyrics-panel:fullscreen:not(.ll-song-card-hidden) .liquid-lyrics-content,
.liquid-lyrics-panel.ll-fullscreen-mode:not(.ll-song-card-hidden) .liquid-lyrics-content {
  align-items: center;
  padding-left: clamp(22px, 3vw, 72px);
  padding-right: clamp(22px, 3vw, 72px);
}

.liquid-lyrics-panel:fullscreen.ll-song-card-hidden .liquid-lyrics-view,
.liquid-lyrics-panel.ll-fullscreen-mode.ll-song-card-hidden .liquid-lyrics-view {
  grid-template-columns: 0 minmax(0, 1fr);
  gap: 0;
}

.liquid-lyrics-panel:fullscreen .liquid-lyrics-line,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {
  max-width: min(980px, 100%);
  font-size: 42px;
}

@media (max-height: 820px) {
  .liquid-lyrics-view,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
    grid-template-columns: minmax(200px, min(25vw, 310px)) minmax(340px, 1fr);
    gap: clamp(8px, 1.8vw, 28px);
    padding-top: 72px;
    padding-bottom: 42px;
  }

  .liquid-lyrics-song-card {
    width: min(100%, clamp(210px, min(23vw, calc(100vh - 310px)), 310px));
  }

  .ll-song-card-controls {
    height: 52px;
    padding-top: 10px;
  }

  .ll-song-card-info {
    padding-bottom: 14px;
  }
}

@media (max-height: 680px) {
  .liquid-lyrics-view,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
    grid-template-columns: minmax(180px, min(23vw, 260px)) minmax(320px, 1fr);
    gap: clamp(6px, 1.4vw, 22px);
    padding-top: 56px;
    padding-bottom: 34px;
  }

  .liquid-lyrics-song-card {
    width: min(100%, clamp(190px, min(22vw, calc(100vh - 300px)), 260px));
    border-radius: 16px;
  }

  .ll-song-card-btn {
    width: 32px;
    height: 32px;
    border-radius: 11px;
  }

  .ll-song-card-title {
    font-size: 15px;
  }
}

@media (max-width: 1120px), (max-height: 560px) {
  .liquid-lyrics-view,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: 72px clamp(24px, 5vw, 68px) 54px;
  }

  .liquid-lyrics-song-card {
    display: none;
  }

  .liquid-lyrics-content {
    padding: 70px clamp(18px, 5vw, 64px) 124px;
  }

  .liquid-lyrics-line,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-line,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {
    max-width: 900px;
    font-size: clamp(27px, 4vw, 38px);
  }
}

@container (max-width: 1120px) {
  .liquid-lyrics-view,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: 72px clamp(24px, 5vw, 68px) 54px;
  }

  .liquid-lyrics-song-card {
    display: none;
  }

  .liquid-lyrics-content {
    padding: 70px clamp(18px, 5vw, 64px) 124px;
  }

  .liquid-lyrics-line,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-line,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {
    max-width: 900px;
    font-size: clamp(27px, 4vw, 38px);
  }
}

@media (max-width: 720px) {
  .liquid-lyrics-header {
    height: 64px;
    padding: 16px 22px 6px;
  }

  .liquid-lyrics-view {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding: 0;
    width: 100%;
  }

  .liquid-lyrics-song-card {
    display: none;
  }

  .liquid-lyrics-content {
    padding: 48px 24px 98px;
  }

  .liquid-lyrics-line {
    font-size: 25px;
    line-height: 1.28;
  }

  .liquid-lyrics-line.active {
    transform: translate3d(0, -1px, 0) scale(1.045);
  }

  .ll-interlude-dot {
    width: 11px;
    height: 11px;
  }

  .liquid-lyrics-control-pill {
    bottom: 18px;
  }
}
`;function qr(){let e="liquid-lyrics-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=kr,document.head.appendChild(t)}async function vl(){await F(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),qr(),ve(),Zt(),await F(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),rr();let e=null,t=null,n="Loading lyrics...",r=0,i=zr();async function a(){let m=Spicetify.Player.data;if(!m?.item?.uri)return;let p=m.item.uri,f=p.includes(":")?p.split(":")[2]:p;if(f===e){Qt(),V();return}e=f,t=null,n="Loading lyrics...",Qt(),xr(n),x()&&Se(n),await s(f,m.item)}async function s(m,p){let f=++r,y=await un({id:m,data:{name:p.name}});if(!(f!==r||m!==e)){if(y.status==="success"&&y.data){t=y.data,n="",Jt(y.data),x()&&zt(y.data);return}t=null,n=y.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",Jt(null,n),x()&&Se(n)}}Spicetify.Player.addEventListener("songchange",()=>{a()});let o=()=>{let m=zr();m!==i&&(i=m,x()&&Ve())};setInterval(()=>{o()},250);let l=Spicetify.Platform?.History;typeof l?.listen=="function"&&l.listen(o);let c=x(),u=new MutationObserver(()=>{let m=x();if(ir(),V(),m&&!c&&e)if(t)zt(t);else if(n&&n!=="Loading lyrics...")Se(n);else{let p=Spicetify.Player.data;if(p?.item?.uri){let f=p.item.uri.includes(":")?p.item.uri.split(":")[2]:p.item.uri;Se("Loading lyrics..."),s(f,p.item)}}c=m}),d=document.getElementById("liquid-lyrics-panel");d&&u.observe(d,{attributes:!0,attributeFilter:["class"]}),V(),a()}vl();function zr(){let t=Spicetify.Platform?.History?.location??{},n=t.pathname||t.path||t.uri||"";return`${location.href}|${n}`}})();
