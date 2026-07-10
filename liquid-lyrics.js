// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{function q(t,e=1e4){return new Promise((i,n)=>{let r=Date.now(),s=setInterval(()=>{let a=t();a?(clearInterval(s),i(a)):Date.now()-r>e&&(clearInterval(s),n(new Error("wait() timed out")))},100)})}var Ee="5.19.11",Qe=["spicy","spotify"];async function ke({id:t}){try{let e=t.includes(":")?t.split(":")[2]:t,i="https://spclient.wg.spotify.com/color-lyrics/v2/track/",n;try{n=await(await q(()=>Spicetify.CosmosAsync?.get))(`${i}${e}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let r=n?.lyrics;if(!r)return{status:"missing_lyrics",data:null};let s=r.lines,a;if(r.syncType==="LINE_SYNCED"){let l=s.map((o,d)=>{let c=Number(o.startTimeMs)||0,p=d<s.length-1?Number(s[d+1].startTimeMs):c+5e3;return o.words==="\u266A"?{Type:"Interlude",Text:o.words,StartTime:c,EndTime:p,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:o.words,StartTime:c,EndTime:p,OppositeAligned:!1,IsRTL:!1}});a={Id:e,Type:"Line",SongWriters:[],Content:l,StartTime:l.length>0?l[0].StartTime:0,EndTime:l.length>0?l[l.length-1].EndTime:0,Provider:"spotify"}}else a={Id:e,Type:"Static",SongWriters:[],Lines:s.map(l=>({Text:l.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:a}}catch(e){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:e instanceof Error?e.message:String(e)}}}}var et=["https://api.spicylyrics.org","https://coregateway.spicylyrics.org","https://lcgateway.spikerko.org"],Me=et[0];async function tt(t,e){try{return await Xe(Me,t,e)}catch{for(let i of et)if(i!==Me)try{let n=await Xe(i,t,e);return Me=i,n}catch{continue}}throw new Error("All nodes are currently unreachable")}async function Xe(t,e,i){let n=await fetch(`${t}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":Ee,...i&&{"SpicyLyrics-WebAuth":i}},body:JSON.stringify({queries:e,client:{version:Ee}})});if(!n.ok)throw new Error(`Node ${t} failed`);return n.json()}var C,Y;async function it(){return C&&C.expiresAtTime-Date.now()>2e3?C.accessToken:Y||(Y=(async()=>{let t=await q(()=>Spicetify.CosmosAsync),e=await q(()=>Spicetify.Platform);try{C=await t.get("sp://oauth/v2/token")}catch(i){i.message?.includes("Resolver not found")&&e.Session&&(C={accessToken:e.Session.accessToken,expiresAtTime:e.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{Y=void 0}if(!C)throw new Error("Could not retrieve Spotify Access Token");return C.accessToken})(),Y)}async function rt({id:t}){try{let e=await oi(t),i=ui(e);if(!e||!i)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let n=di(i.result);if(n.status==="missing_lyrics")return{status:"missing_lyrics",data:null};if(n.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:n.message}};let r=n.data;return r.Provider="spicy",ci(r),{status:"success",data:r}}catch(e){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:e instanceof Error?e.message:String(e)}}}}async function oi(t){let i=`Bearer ${await it()}`;return await tt([{operation:"lyrics",variables:{id:t,auth:"SpicyLyrics-WebAuth"}}],i)}function ci(t){if(t.Type==="Static")return;let e=i=>Math.round(Number(i||0)*1e3);if(t.StartTime=e(t.StartTime),t.EndTime=e(t.EndTime),t.Type==="Syllable")for(let i of t.Content){if(i.Lead){i.Lead.StartTime=e(i.Lead.StartTime),i.Lead.EndTime=e(i.Lead.EndTime);for(let n of i.Lead.Syllables)n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime)}if(i.Background)for(let n of i.Background){n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime);for(let r of n.Syllables)r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime)}}else if(t.Type==="Line")for(let i of t.Content)i.StartTime=e(i.StartTime),i.EndTime=e(i.EndTime)}function di(t){if(!t||typeof t!="object")return{status:"error",message:"Spicy returned an empty result"};let e=t,i=e.httpStatus,n=e.data??t;return i===404||Re(n,"MISSING_LYRICS")?{status:"missing_lyrics"}:i&&i!==200?{status:"error",message:nt(n)}:Re(n)?{status:"error",message:nt(n)}:pi(n)?{status:"success",data:n}:{status:"error",message:"Unexpected response from Spicy"}}function ui(t){return(t?.queries.flat()??[]).find(i=>i.operation==="lyrics"&&!!i.result)}function pi(t){if(!t||typeof t!="object"||!("Type"in t))return!1;let e=t.Type;return e==="Syllable"||e==="Line"||e==="Static"}function Re(t,e){if(!t||typeof t!="object"||!("error"in t))return!1;let i=t.error;return typeof i=="string"&&(!e||i===e)}function nt(t){return Re(t)?t.message??t.error:"Unexpected Error from Spicy"}var mi={spotify:{id:"spotify",fetch:ke},spicy:{id:"spicy",fetch:rt}},qe=new Map;async function st(t){let e=t.id;if(!t.forceRefresh&&qe.has(e))return{status:"success",data:qe.get(e)};let i=!1;for(let n of Qe){let r=mi[n];if(!r)continue;let s=await r.fetch(t);if(s.status==="success"&&s.data){let a=n==="spicy"?await fi(t,s.data):s.data;return qe.set(e,a),{...s,data:a}}if(s.status==="missing_lyrics"){i=!0;continue}}return i?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}async function fi(t,e){if(e.Type!=="Syllable"&&e.Type!=="Line")return e;try{let i=await ke(t);if(i.status!=="success"||!i.data)return e;let n=gi(i.data);if(n.length===0||e.Type==="Line")return e;e.Content.forEach(r=>{let s=r.Lead,a=hi(n,s?.StartTime??0,s?.EndTime??0);a&&(r.LiquidLyricsOriginalText=a.text,s&&(s.LiquidLyricsOriginalText=a.text))})}catch{return e}return e}function gi(t){return t.Type!=="Line"?[]:t.Content.filter(e=>e.Type!=="Interlude").map(e=>({text:yi(e.Text),start:Number(e.StartTime)||0,end:Number(e.EndTime)||0})).filter(e=>e.text&&!e.text.includes("\u266A")&&!e.text.includes("\xE2\u2122\xAA"))}function hi(t,e,i){let n=Number(e)||0,r=Number(i)||n,s=(n+r)/2,a=null,l=Number.POSITIVE_INFINITY;for(let o of t){let d=(o.start+o.end)/2,c=Math.abs(o.start-n),p=Math.abs(d-s),u=c*.75+p*.25;u<l&&(a=o,l=u)}return a&&l<=3500?a:null}function yi(t){return String(t??"").replace(/\s+/g," ").trim()}var bi="liquid-lyrics-mode",Ie="liquid-lyrics-romanization";var ze=new Map,Un=localStorage.getItem(bi)||"romanization",ot=localStorage.getItem(Ie)!==null?localStorage.getItem(Ie)==="true":!1;function ct(){return(Spicetify?.Platform?.Session?.locale||navigator.language||"en").split("-")[0]}var ce=null;async function xi(){return window.wanakana?!0:ce||(ce=new Promise(e=>{let i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/wanakana@4.0.2/umd/wanakana.min.js",i.onload=()=>e(!0),i.onerror=()=>e(!1),document.head.appendChild(i)}),ce)}function at(t){let e=Array.isArray(t?.[0])?t[0]:[];for(let i of e){if(!Array.isArray(i)||i.length<4)continue;let n=i[3];if(i[0]==null&&i[1]==null&&i[2]==null&&typeof n=="string"&&n.trim())return n}return""}function lt(t){return t?String(t).replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g,"").replace(/[\u3040-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]/g,"").replace(/\s+/g," ").trim():""}function y(){return ot}function de(t){ot=t,localStorage.setItem(Ie,String(t))}async function Pe(t,e="auto"){let i=String(t??"").trim(),n=ct();if(!i||i.includes("\u266A"))return{detected:n,roman:""};let r=`legacy:${i}`;return ze.has(r)||ze.set(r,(async()=>{try{let s=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${n}&dt=t&dt=rm&q=${encodeURIComponent(i)}`,l=await(await fetch(s)).json(),o=(typeof l?.[2]=="string"?l[2]:typeof l?.[1]=="string"?l[1]:n)||n,d=String(o).toLowerCase(),c="";return d.startsWith("ja")?(c=lt(at(l)),c||(c=await vi(i))):d.startsWith("zh")&&(c=lt(at(l))),{detected:o,roman:ut(c)}}catch{return{detected:n,roman:""}}})()),ze.get(r)}async function dt(t,e="auto"){let i=t.map(ut),n=i.map(()=>({detected:ct(),roman:""})),r=i.map((a,l)=>({text:a,index:l})).filter(a=>a.text&&!a.text.includes("\u266A"));return r.length===0||(await Promise.all(r.map(a=>Pe(a.text,"auto")))).forEach((a,l)=>{n[r[l].index]=a}),n}async function vi(t){await xi();let e=window;return Li(e.wanakana?e.wanakana.toRomaji(t):"")}function Li(t){return String(t??"").replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g,"").replace(/[\u3040-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]/g,"").replace(/[\uAC00-\uD7AF]/g,"").replace(/\s+/g," ").trim()}function ut(t){return String(t??"").replace(/\s+/g," ").trim()}var ue="liquid-lyrics-tooltip";function L(t,e){t.dataset.tooltip=e;let i=()=>wi(t,t.dataset.tooltip||e);t.addEventListener("pointerenter",i),t.addEventListener("focus",i),t.addEventListener("pointerleave",A),t.addEventListener("blur",A),t.addEventListener("click",()=>window.setTimeout(()=>pt(t),0))}function wi(t,e){if(t.hasAttribute("disabled")||t.hidden)return;let i=Ti(t);i.textContent=e,i.classList.add("visible"),pt(t)}function A(){document.getElementById(ue)?.classList.remove("visible")}function Ti(t){let e=Si(t),i=document.getElementById(ue);return i||(i=document.createElement("div"),i.id=ue,i.className="liquid-lyrics-tooltip"),i.parentElement!==e&&e.appendChild(i),i}function Si(t){let e=document.fullscreenElement;return e instanceof HTMLElement&&e.contains(t)?e:document.body}function pt(t){let e=document.getElementById(ue);if(!e?.classList.contains("visible"))return;let i=t.getBoundingClientRect(),n=9,r=e.offsetWidth||80,s=e.offsetHeight||28,a=Math.max(8,i.top-s-n),l=Ei(i.left+i.width/2,r/2+8,window.innerWidth-r/2-8);e.style.left=`${l}px`,e.style.top=`${a}px`}function Ei(t,e,i){return Math.min(i,Math.max(e,t))}function gt(t){return t.Type==="Line"?ki(t.Content??[]):t.Type==="Syllable"?Mi(t.Content??[]):(t.Lines??[]).map(e=>({kind:"static",text:w(e.Text),romanizedText:w(e.RomanizedText)})).filter(e=>e.text)}function ki(t){let e=[],i=b(t[0]?.StartTime,0);return t.length>0&&i>500&&e.push(pe(0,i)),t.forEach((n,r)=>{let s=t[r+1],a=Ri(n,s);n.Type==="Interlude"?e.push(pe(a.start,a.end)):e.push({kind:"line",range:a,text:w(n.Text),romanizedText:w(n.RomanizedText)}),ht(e,a.end,b(s?.StartTime,NaN))}),e}function Mi(t){let e=[],i=t.map((n,r)=>qi(n,t[r+1]));return i.length>0&&i[0].range.start>500&&e.push(pe(0,i[0].range.start)),i.forEach((n,r)=>{e.push({kind:"syllable",range:n.range,text:n.lead.sourceText||n.lead.words.map(s=>s.text).join(" ").trim(),romanizedText:Ai(n.lead.words),lead:n.lead,backgrounds:n.backgrounds}),ht(e,n.range.end,i[r+1]?.range.start??NaN)}),e}function pe(t,e){return{kind:"interlude",range:{start:t,end:Math.max(e,t+250)}}}function ht(t,e,i){Number.isFinite(i)&&(i-e<3e3||t.push(pe(e,i)))}function Ri(t,e){let i=b(t.StartTime,0),n=b(e?.StartTime,NaN),r=b(t.EndTime,i+4500),s=xt(r,n);return{start:i,end:vt(s,i,s,250)}}function qi(t,e){let i=mt(t.Lead),n=(t.Background??[]).map(d=>mt(d)),r=b(e?.Lead?.StartTime,NaN),s=i.range.start,a=Number.isFinite(r)&&r>s?r:s+4500,l=Math.max(i.range.end,...n.map(d=>d.range.end)),o=xt(l,r);return{range:{start:s,end:vt(o,s,a,250,a)},lead:i,backgrounds:n}}function mt(t){let e=b(t?.StartTime,0),i=Number(t?.EndTime),n=Number.isFinite(i)&&i>e?b(i,e):e+4500,r={start:e,end:n};return{range:r,sourceText:Fi(t),words:Ii(zi(t?.Syllables??[],r),r)}}function zi(t,e){let i=[],n=null,r=!1;return t.forEach((s,a)=>{let l={text:w(s.Text),romanizedText:w(s.RomanizedText),start:b(s.StartTime,e.start),end:b(s.EndTime,e.start+80),animateLetters:!1},o=!!(s.IsPartOfWord||r)&&!E(l.text)&&!E(n?.text??"");o&&n?(n.text+=l.text,n.romanizedText=Di(n.romanizedText,l.romanizedText," "),n.start=Math.min(n.start,l.start),n.end=Math.max(n.end,l.end)):(n&&!o&&i.push(n),n=l),r=!!s.IsPartOfWord,(!s.IsPartOfWord||a===t.length-1)&&n&&(i.push(n),n=null)}),i.filter(s=>s.text)}function Ii(t,e){if(t.length===0)return[];let i=e.start,n=Math.max(e.end,i+250),r=t.map(o=>({...o,start:S(o.start,i,n),end:S(o.end,i,n)})).filter(o=>o.text.trim().length>0),s=i;r.forEach(o=>{o.start=Math.max(s,o.start),s=o.start});let a=[];r.forEach(o=>{let d=a[a.length-1],c=d?.[0]?.start;d&&c!==void 0&&Math.abs(o.start-c)<=12?(o.start=c,d.push(o)):a.push([o])});let l=[];return a.forEach((o,d)=>{let c=o[0].start,p=a[d+1]?.[0]?.start??n,u=Math.max(c+1,p);if(o.length===1){l.push({...o[0],start:c,end:Ci(o[0].end,c,u)});return}Pi(o,c,u).forEach(m=>l.push(m))}),l.map((o,d)=>{let c=l[d+1]?.start??n,p=Math.max(o.start+1,c),u=Math.min(Math.max(o.end,o.start+1),p);return{...o,end:u,animateLetters:fe(o.text,o.start,u)}})}function Pi(t,e,i){let n=Math.max(i,e+t.length*80),r=t.reduce((a,l)=>a+ft(l.text),0)||t.length,s=e;return t.map((a,l)=>{let o=l===t.length-1,d=t.length-l,c=Math.max(1,n-s),p=(n-e)*ft(a.text)/r,u=Math.max(1,c-(d-1)),m=s,g=o?n:s+S(p,1,u);return s=g,{...a,start:m,end:g}})}function Ci(t,e,i){return Number.isFinite(t)&&t>e?Math.min(t,i):i}function ft(t){return Math.max(1,Array.from(t.trim()).length)}function fe(t,e,i){let n=Array.from(t.trim());return n.length<3||i-e<700?!1:n.some(r=>/[A-Za-z0-9]/.test(r))}function Ai(t){return t.map(e=>B(e.romanizedText)).filter(Boolean).join(" ").trim()}function yt(t,e,i){let n=Oi(t);if(n.length===0)return[];let r=i.filter(a=>a.text&&Number.isFinite(a.start)&&Number.isFinite(a.end));if(r.length===n.length)return n.map((a,l)=>Ce(a,r[l].start,r[l].end));if(n.length<r.length)return Ni(n,r);let s=r.length>0?{start:r[0].start,end:r[r.length-1].end}:e;return Hi(n,s)}function Ni(t,e){let i=t.map(me),n=[0];e.forEach(o=>{n.push(n[n.length-1]+Bi(o.text))});let r=i.reduce((o,d)=>o+d,0)||t.length,s=n[n.length-1]||e.length,a=0,l=0;return t.map((o,d)=>{let c=d===t.length-1,p=t.length-d,u=e.length;if(!c){l+=i[d];let si=l/r*s,ai=a+1,li=e.length-(p-1);u=_i(n,si,ai,li)}let m=e.slice(a,u);a=u;let g=m[0]??e[e.length-1],R=m[m.length-1]??g;return Ce(o,g.start,R.end)})}function _i(t,e,i,n){let r=i,s=Number.POSITIVE_INFINITY;for(let a=i;a<=n;a++){let l=Math.abs((t[a]??0)-e);l<s&&(r=a,s=l)}return r}function Hi(t,e){let i=e.start,n=Math.max(e.end,i+t.length),r=t.reduce((a,l)=>a+me(l),0)||t.length,s=i;return t.map((a,l)=>{let o=l===t.length-1,d=t.length-l,c=Math.max(1,n-s),p=o?c:S((n-i)*me(a)/r,1,c-(d-1)),u=s,m=o?n:s+p;return s=m,Ce(a,u,m)})}function Ce(t,e,i){let n=Math.max(e+1,i);return{text:t,romanizedText:t,start:e,end:n,animateLetters:fe(t,e,n)}}function Oi(t){return B(t).split(/\s+/).map(e=>e.trim()).filter(Boolean)}function me(t){let e=t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"");if(!e)return Math.max(1,Array.from(t).length);let i=e.match(/[aeiouy]+/g)?.length??0,n=e.match(/n(?![aeiouy])/g)?.length??0;return Math.max(1,i+n)}function Bi(t){return E(t)?Math.max(.5,Array.from(t).reduce((e,i)=>/[㐀-䶿一-鿿豈-﫿]/.test(i)?e+2:/[ぁぃぅぇぉゃゅょゎゕゖァィゥェォャュョヮ]/.test(i)?e+.45:/[぀-ヿㇰ-ㇿ･-ﾟ가-힯]/.test(i)?e+1:/[A-Za-z0-9]/.test(i)?e+.35:/\S/.test(i)?e+.2:e,0)):me(t)}function w(t){return String(t??"").replace(/\s+/g," ").trim()}function B(t){let e=w(t);return e&&!E(e)?e:""}function E(t){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(t)}function bt(t){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(t)?"ja":/[가-힯]/.test(t)?"ko":"auto"}function Fi(t){return w(t?.LiquidLyricsOriginalText)||Wi(t?.Syllables??[])}function Wi(t){let e="",i="",n=!1;return t.forEach(r=>{let s=w(r.Text);if(!s)return;let a=!e||r.IsPartOfWord||n||Vi(i,s);e+=a?s:` ${s}`,i=s,n=!!r.IsPartOfWord}),e.trim()}function Vi(t,e){return!t||!e||/^[,.;:!?)]/.test(e)||/[(]$/.test(t)?!0:E(t)||E(e)}function Di(t,e,i){let n=w(t),r=w(e);return n?r?`${n}${i}${r}`:n:r||void 0}function xt(t,e){return!Number.isFinite(e)||e<=t?t:e-t<3e3?e:t}function vt(t,e,i,n,r=Number.POSITIVE_INFINITY){let s=b(t,i),a=s>=e+n?s:Math.max(i,e+n);return Math.min(a,r)}function b(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function S(t,e=0,i=1){return Math.min(i,Math.max(e,t))}function Lt(t,e){return S((e-t.start)/Math.max(1,t.end-t.start))}function G(t,e,i){let n=S((i-t)/(e-t));return n*n*(3-2*n)}var Ui=1200,wt="",Tt=0,St=0;function Z(){let t=b(Spicetify.Player?.getProgress?.(),0),e=Et(),i=performance.now(),n=Tt+(i-St);if(!Ae()||e!==wt||Math.abs(t-n)>Ui)return kt(t,e,i),t;let r=W();return r>0?Math.min(n,r):n}function F(t){let e=Math.max(0,Math.round(t));kt(e),Spicetify.Player?.seek?.(e)}function Ae(){let t=Spicetify.Player;return typeof t?.isPlaying=="function"?!!t.isPlaying():typeof t?.data?.isPaused=="boolean"?!t.data.isPaused:!!(t?.data?.is_playing??t?.data?.isPlaying)}function W(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{};return b(e.duration_ms??e.duration??t?.duration?.milliseconds??t?.duration_ms??Spicetify.Player?.data?.duration,0)}function Et(){return String(Spicetify.Player?.data?.item?.uri??"")}function kt(t,e=Et(),i=performance.now()){wt=e,Tt=Math.max(0,t),St=i}var K=new Set,N=null;function ge(t){return K.add(t),N===null&&(N=requestAnimationFrame(Mt)),()=>{K.delete(t),K.size===0&&N!==null&&(cancelAnimationFrame(N),N=null)}}function Mt(t){if(K.size===0){N=null;return}N=requestAnimationFrame(Mt);let e=Z();for(let i of K)i(e,t)}var Rt=900,ji=.92,$i=5e3,Yi=180,qt=1100,Ne=.75,Gi=8,f=-999,V=class{constructor(e){this.records=[];this.recordByEl=new Map;this.activeIndex=-1;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.useRoman=!1;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.tick=(e,i)=>{if(e===this.lastProgress)return;this.lastProgress=e;let n=this.findActiveIndex(e);n!==this.activeIndex&&(this.applyPosition(n,e),this.activeIndex=n),n>=0&&(this.virtual&&this.mountAround(n),this.updateActiveLine(this.records[n],e))};this.onUserScroll=()=>{this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},$i)};this.onContainerClick=e=>{let i=e.target?.closest(".liquid-lyrics-line");if(!i)return;let n=this.recordByEl.get(i);!n||!Number.isFinite(n.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),F(n.start),this.forceSync(),this.scrollToRecord(n))};this.container=e.container,this.scroller=e.scroller??e.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...e},this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",i=>{(i.pointerType==="mouse"||i.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasLyrics(){return this.records.length>0}setLyrics(e){if(this.clear(),!e)return;let i=gt(e);if(i.length===0)return;let n=this.options.virtualize&&i.some(r=>r.kind==="syllable");if(this.records=i.map((r,s)=>this.buildLineRecord(r,s)),this.records.forEach(r=>this.recordByEl.set(r.el,r)),this.hasTimeline=this.records.some(r=>Number.isFinite(r.start)),n)this.initVirtualizer();else{let r=document.createDocumentFragment();this.records.forEach(s=>r.appendChild(s.el)),this.container.appendChild(r)}this.syncClock(),this.forceSync()}clear(){this.generation++,this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.activeIndex=-1,this.lastProgress=NaN,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.container.replaceChildren()}setEnabled(e){this.enabled!==e&&(this.enabled=e,this.syncClock(),e&&this.forceSync())}setRomanized(e,i){this.useRoman=e;let n=[],r=!1;for(let s of this.records){let a=s.line;if(a.kind==="interlude"||!a.text)continue;let l=E(a.text),o=B(a.romanizedText);if(r||(r=l||!!o),a.kind==="line"||a.kind==="static"){let d=s.contextRomanized||o;this.setLineText(s,e&&d?d:a.text),e&&i&&!d&&l&&!s.fetchPending&&(s.fetchPending=!0,n.push(s));continue}l?e&&s.contextRomanized?this.applyContextRomanization(s):(this.restoreOriginalWords(s),e&&i&&!s.contextRomanized&&!s.fetchPending&&(s.fetchPending=!0,n.push(s))):this.applyWordRomanization(s,e)}this.hasRomanizationValue=r,this.options.onRomanizationAvailability?.(r),n.length>0&&this.fetchContextRomanization(n)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(e,i){let n=e.kind!=="static",r=this.options.variant==="sidebar"&&(e.kind==="line"||e.kind==="syllable"),s=document.createElement(r?"button":"div");s instanceof HTMLButtonElement&&(s.type="button"),s.className="liquid-lyrics-line";let a={index:i,el:s,line:e,start:n?e.range.start:Number.POSITIVE_INFINITY,end:n?e.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:f,interludeVis:f,interludeY:f,interludeScale:f,displayText:e.kind==="interlude"?"":e.text,displayKey:"orig",contextRomanized:"",fetchPending:!1,wrapper:null,height:0,rowOffset:f};if(e.kind==="interlude"){s.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&s.setAttribute("aria-hidden","true");for(let l=0;l<3;l++){let o=document.createElement("span");o.className="ll-interlude-dot",s.appendChild(o),a.dots.push(o),a.dotLift.push(0)}}else if(e.kind==="static")s.classList.add("liquid-lyrics-static"),s.textContent=e.text;else if(e.kind==="line")s.textContent=e.text;else{s.classList.add("ll-syllable-line");let l=document.createElement("div");l.className="ll-vocal-line ll-lead-vocal",s.appendChild(l),a.leadEl=l;let o=this.buildWordSpans(l,e.lead.words,"");if(this.options.renderBackgrounds)for(let d of e.backgrounds){let c=document.createElement("div");c.className="ll-vocal-line ll-background-vocal",s.appendChild(c),a.bgWords.push(...this.buildWordSpans(c,d.words,"ll-bg-syllable"))}a.words=zt(o,a.bgWords)}return a}buildWordSpans(e,i,n){let r=[];return i.forEach((s,a)=>{let l=document.createElement("span");l.className=n?`ll-syllable ${n}`:"ll-syllable",s.animateLetters&&l.classList.add("ll-long-syllable"),E(s.text)&&l.classList.add("ll-cjk-syllable"),a===i.length-1&&l.classList.add("LastWordInLine");let o=[];if(s.animateLetters){l.setAttribute("aria-label",s.text);for(let d of s.text){let c=document.createElement("span");c.className="ll-letter",c.textContent=d,l.appendChild(c),o.push(c)}}else l.textContent=s.text;e.appendChild(l),r.push({el:l,start:s.start,end:s.end,animateLetters:s.animateLetters,letters:o,state:"idle",gradientUnit:f,lastLift:0,letterFill:null,letterLift:null})}),r}syncClock(){let e=this.enabled&&this.hasTimeline&&this.records.length>0;e&&!this.unsubscribeClock?this.unsubscribeClock=ge(this.tick):e||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(Z(),performance.now()))}findActiveIndex(e){let i=this.records,n=0,r=i.length-1;for(;n<=r;){let a=n+r>>1,l=i[a];if(e>=l.start&&e<l.end)return a;e<l.start?r=a-1:n=a+1}if(this.activeIndex>=0&&this.activeIndex<i.length){let a=i[this.activeIndex];if(e>=a.start&&e<a.end+Rt)return this.activeIndex}let s=Math.min(Math.max(0,n-1),i.length-1);if(s>=0&&s<i.length){let a=i[s];if(a.end<=e&&e-a.end<=Rt)return s}return-1}applyPosition(e,i){let n=this.activeIndex,r=this.records;for(let s=0;s<r.length;s++){let a=r[s],l=a.state==="active";if(s===e){l||this.activateLine(a,i);continue}(e>=0?s<e:a.end<=i)?(a.state!=="past"||l)&&this.completeLine(a,l):(a.state!=="future"||l)&&this.resetLine(a)}if(e>=0&&!this.userScrolling){let s=n>=0?r[n]:null,a=r[e];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),s?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===e&&this.scrollToRecord(a)},Yi):this.scrollToRecord(a)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(e,i){e.state="active",e.progressUnit=f,e.interludeVis=f,e.interludeY=f,e.interludeScale=f;let n=e.el.classList;if(n.remove("past","future","ll-finishing"),n.add("active"),e.line.kind==="syllable"){e.dirty=!0;for(let r of e.words)this.syncWordState(r,i)}else e.line.kind==="interlude"&&(e.dirty=!0)}completeLine(e,i){e.state="past";let n=e.el.classList;if(n.remove("active","future"),n.add("past"),n.toggle("ll-finishing",i),e.glow&&(n.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="sung"&&this.setWordState(r,"sung");for(let r of e.dots)r.classList.add("lit"),It(r);e.dotLift.fill(0)}}resetLine(e){e.state="future";let i=e.el.classList;if(i.remove("active","past","ll-finishing"),i.add("future"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let n of e.words)n.state!=="future"&&this.setWordState(n,"future");for(let n of e.dots)n.classList.remove("lit"),It(n);e.dotLift.fill(0)}}clearLineInline(e){let i=e.el.style;e.progressUnit!==f&&(i.removeProperty("--line-progress"),e.progressUnit=f),e.interludeVis!==f&&(i.removeProperty("--interlude-visibility"),i.removeProperty("--interlude-y"),i.removeProperty("--interlude-scale"),e.interludeVis=f,e.interludeY=f,e.interludeScale=f)}updateActiveLine(e,i){let n=Lt(e,i);if(e.line.kind==="interlude"){this.updateInterlude(e,n);return}let r=n>ji;r!==e.glow&&(e.glow=r,e.el.classList.toggle("ll-glow",r)),e.line.kind==="syllable"?this.updateWords(e,i):this.writeLineProgress(e,n*100)}writeLineProgress(e,i){let n=Math.round(i*2)/2;n!==e.progressUnit&&(e.progressUnit=n,e.el.style.setProperty("--line-progress",String(n)))}updateWords(e,i){for(let n of e.words){let r=i<n.start?"future":i>=n.end?"sung":"singing";r!==n.state&&this.setWordState(n,r),r==="singing"&&this.updateSingingWord(n,i)}}syncWordState(e,i){let n=i<e.start?"future":i>=e.end?"sung":"singing";n!==e.state&&this.setWordState(e,n)}setWordState(e,i){e.state=i;let n=e.el.classList;n.toggle("singing",i==="singing"),n.toggle("sung",i==="sung"),n.toggle("future",i==="future"),i!=="singing"&&this.clearWordInline(e)}clearWordInline(e){let i=e.el.style;if(e.gradientUnit!==f&&(i.removeProperty("--syl-progress"),e.gradientUnit=f),e.lastLift!==0&&(i.transform="",e.lastLift=0),!(!e.letterFill||!e.letterLift))for(let n=0;n<e.letters.length;n++){let r=e.letters[n];e.letterFill[n]!==f&&(r.style.removeProperty("--letter-progress"),e.letterFill[n]=f),e.letterLift[n]!==0&&(r.style.transform="",e.letterLift[n]=0)}}updateSingingWord(e,i){let n=S((i-e.start)/Math.max(1,e.end-e.start));if(e.animateLetters){this.updateLetters(e,n);return}let r=Math.round(-20+120*n);r!==e.gradientUnit&&(e.gradientUnit=r,e.el.style.setProperty("--syl-progress",String(r)));let s=Math.sin(n*Math.PI);Math.abs(s-e.lastLift)>.01&&(e.lastLift=s,e.el.style.transform=`translate3d(0, ${(-5*s).toFixed(2)}px, 0) scale(${(1+.018*s).toFixed(4)})`)}updateLetters(e,i){let n=e.letters,r=n.length;if(r===0)return;(!e.letterFill||!e.letterLift)&&(e.letterFill=new Array(r).fill(f),e.letterLift=new Array(r).fill(0));let s=Math.max(.16,1.8/r),a=-s+i*(1+2*s);for(let l=0;l<r;l++){let o=n[l],d=Math.round(-20+120*S(i*r-l)),c=e.letterFill[l];(Math.abs(d-c)>=4||d!==c&&(d===100||d===-20))&&(e.letterFill[l]=d,o.style.setProperty("--letter-progress",String(d)));let p=1-S(Math.abs(a-(l+.5)/r)/s),u=p<=0?0:G(0,1,p);Math.abs(u-e.letterLift[l])>.008&&(e.letterLift[l]=u,o.style.transform=u===0?"":`translate3d(0, ${(-5.5*u).toFixed(2)}px, 0) scale(${(1+.02*u).toFixed(4)})`)}}updateInterlude(e,i){let n=G(0,.22,i),r=1-G(.99,1,i),s=Math.round(Math.min(n,r)*200)/200,a=Math.round(-24*G(.76,1,i)*10)/10,l=Math.round((.72+.28*n)*500)/500,o=e.el.style;s!==e.interludeVis&&(e.interludeVis=s,o.setProperty("--interlude-visibility",String(s))),a!==e.interludeY&&(e.interludeY=a,o.setProperty("--interlude-y",`${a}px`)),l!==e.interludeScale&&(e.interludeScale=l,o.setProperty("--interlude-scale",String(l)));let d=this.options.dotLiftPx;for(let c=0;c<e.dots.length;c++){let p=e.dots[c],u=c/3,m=(c+1)/3;p.classList.toggle("lit",i>=u),p.style.opacity=i>=.99?String(r):"";let g=0;i>=u&&i<m&&(g=Math.sin((i-u)/(m-u)*Math.PI)*d),(Math.abs(g-e.dotLift[c])>.1||g===0&&e.dotLift[c]!==0)&&(e.dotLift[c]=g,p.style.transform=g===0?"":`translateY(${(-g).toFixed(2)}px)`)}}scrollToRecord(e){let i=this.scroller,n,r;if(this.virtual)this.mountAround(e.index),n=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),r=this.virtual.heights[e.index]??e.el.offsetHeight;else{if(!e.el.isConnected)return;n=Zi(e.el,i),r=e.el.offsetHeight}i.scrollTo({top:Math.max(0,n-i.clientHeight/2+r/2),behavior:"smooth"})}setLineText(e,i){e.displayText!==i&&(e.displayText=i,e.el.textContent=i,this.refreshVirtualHeight(e))}applyWordRomanization(e,i){if(e.line.kind!=="syllable")return;let n=!1,r=e.line.lead.words.map(s=>{let a=i?B(s.romanizedText):"";return!a||a===s.text?s:(n=!0,{...s,text:a,animateLetters:fe(a,s.start,s.end)})});this.rebuildLead(e,r,n?"roman-words":"orig",!1)}applyContextRomanization(e){if(e.line.kind!=="syllable"||!e.contextRomanized)return;let i=yt(e.contextRomanized,e.line.range,e.line.lead.words);if(i.length===0){this.restoreOriginalWords(e);return}this.rebuildLead(e,i,`ctx:${e.contextRomanized}`,!0)}restoreOriginalWords(e){e.line.kind==="syllable"&&this.rebuildLead(e,e.line.lead.words,"orig",!1)}rebuildLead(e,i,n,r){if(e.displayKey===n||!e.leadEl)return;e.displayKey=n,e.el.classList.toggle("ll-context-romanized",r),e.leadEl.replaceChildren();let s=this.buildWordSpans(e.leadEl,i,"");if(e.words=zt(s,e.bgWords),e.displayText=i.map(a=>a.text).join(" ").trim(),e.state==="active"){e.dirty=!0;let a=Z();for(let l of e.words)this.syncWordState(l,a)}else if(e.state==="past")for(let a of s)this.setWordState(a,"sung");this.refreshVirtualHeight(e)}async fetchContextRomanization(e){let i=this.generation,n=new Map;for(let r of e){let s=bt(r.line.kind==="interlude"?"":r.line.text),a=n.get(s);a?a.push(r):n.set(s,[r])}for(let[r,s]of n){let a=s.map(o=>o.line.kind==="interlude"?"":o.line.text),l=[];try{l=s.length>1?await dt(a,r):[await Pe(a[0],r)]}catch{}if(i!==this.generation||(s.forEach((o,d)=>{o.fetchPending=!1;let c=B(l[d]?.roman);c&&(o.contextRomanized=c,this.useRoman&&(o.line.kind==="syllable"?this.applyContextRomanization(o):o.line.kind!=="interlude"&&this.setLineText(o,c)))}),await new Promise(o=>requestAnimationFrame(()=>o())),i!==this.generation))return}}initVirtualizer(){let e=document.createElement("div");e.className="ll-syllable-virtual-space",this.container.appendChild(e),this.container.classList.add("ll-syllable-virtualized");let i=new Map;this.records.forEach(r=>{let s=document.createElement("div");s.className="ll-syllable-virtual-row",s.appendChild(r.el),r.wrapper=s,r.height=Pt(r),i.set(r.el,r.index)});let n={space:e,heights:this.records.map(r=>r.height),offsets:[],mounted:new Set,lineToIndex:i,resizeObserver:new ResizeObserver(r=>{let s=!1;for(let a of r){let l=i.get(a.target);if(l===void 0)continue;let o=Math.max(1,a.borderBoxSize?.[0]?.blockSize??a.target.offsetHeight);Math.abs((n.heights[l]??0)-o)<Ne||(n.heights[l]=o,s=!0)}s&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};n.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",n.onScroll,{passive:!0}),this.virtual=n,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let e=this.virtual;e&&(e.raf!==null&&cancelAnimationFrame(e.raf),this.scroller.removeEventListener("scroll",e.onScroll),e.resizeObserver.disconnect(),e.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let e=this.virtual;!e||e.raf!==null||(e.raf=requestAnimationFrame(()=>{e.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let e=this.virtual;if(!e)return;let i=this.scroller.scrollTop-e.space.offsetTop,n=i-qt,r=i+this.scroller.clientHeight+qt,s=new Set;for(let a=0;a<this.records.length;a++){let l=e.offsets[a]??0;l+(e.heights[a]??0)>=n&&l<=r&&s.add(a)}if(this.activeIndex>=0){let a=Math.max(0,this.activeIndex-3),l=Math.min(this.records.length-1,this.activeIndex+3);for(let o=a;o<=l;o++)s.add(o)}for(let a of e.mounted)!s.has(a)&&a!==this.activeIndex&&this.unmountVirtualLine(a);for(let a of s)this.mountVirtualLine(a);this.layoutMountedRows()}mountAround(e){if(!this.virtual)return;let i=Math.max(0,e-1),n=Math.min(this.records.length-1,e+1),r=!1;for(let s=i;s<=n;s++)r=this.mountVirtualLine(s)||r;r&&this.layoutMountedRows()}mountVirtualLine(e){let i=this.virtual,n=this.records[e];if(!i||!n?.wrapper||i.mounted.has(e))return!1;i.space.appendChild(n.wrapper),i.mounted.add(e),n.rowOffset=f,i.resizeObserver.observe(n.el);let r=Math.max(1,n.el.offsetHeight);return Math.abs((i.heights[e]??0)-r)>=Ne&&(i.heights[e]=r,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(e){let i=this.virtual,n=this.records[e];!i||!n?.wrapper||!i.mounted.has(e)||(i.resizeObserver.unobserve(n.el),n.wrapper.parentElement===i.space&&i.space.removeChild(n.wrapper),i.mounted.delete(e))}recomputeVirtualOffsets(){let e=this.virtual;if(!e)return;let i=0;e.offsets=e.heights.map(n=>{let r=i;return i+=Math.max(1,n)+Gi,r}),e.space.style.height=`${Math.max(1,i)}px`}layoutMountedRows(){let e=this.virtual;if(e)for(let i of e.mounted){let n=this.records[i];if(!n?.wrapper)continue;let r=Math.round(e.offsets[i]??0);r!==n.rowOffset&&(n.rowOffset=r,n.wrapper.style.transform=`translate3d(0, ${r}px, 0)`)}}refreshVirtualHeight(e){let i=this.virtual;if(!i)return;let n=e.el.isConnected?Math.max(1,e.el.offsetHeight):Pt(e);Math.abs((i.heights[e.index]??0)-n)<Ne||(i.heights[e.index]=n,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}};function zt(t,e){return e.length===0?t:[...t,...e].sort((i,n)=>i.start-n.start)}function It(t){t.style.transform&&(t.style.transform=""),t.style.opacity&&(t.style.opacity="")}function Pt(t){if(t.line.kind==="interlude")return 54;let e=Math.max(1,t.displayText.length),i=Math.max(1,Math.ceil(e/42)),n=t.line.kind==="syllable"?t.line.backgrounds.length:0;return 18+i*45+n*24}function Zi(t,e){let i=0,n=t;for(;n&&n!==e;){i+=n.offsetTop;let r=n.offsetParent;n=r instanceof HTMLElement&&e.contains(r)?r:null}return i}var v="liquid-lyrics-panel",Bt="liquid-lyrics-song-card-visible",J="liquify-bg-mode",ne="liquid-lyrics:romanization",Ki=200,Ji=500,x=null,te=null,he=null,_e=0,He=0,Ct="",At="",Oe=-1,Nt=!1,_t=!1,Ht=!1,ie=!0,D,z=null;function j(){let t=document.getElementById(v);if(t)return t;let e=document.createElement("div");e.id=v,e.className="liquid-lyrics-panel";let i=document.createElement("div");i.className="liquid-lyrics-glass-bg";let n=Qi(),r=Xi(),s=document.createElement("div");s.className="liquid-lyrics-header";let a=document.createElement("span");a.className="liquid-lyrics-title",a.textContent="Liquid Lyrics",s.append(a);let l=document.createElement("div");l.className="liquid-lyrics-view";let o=en(),d=document.createElement("div");d.className="liquid-lyrics-content",l.append(o,d);let c=tn();return e.append(n,i,r,s,l,c),$t(e),U(e),(document.querySelector(".Root__main-view")??document.body).appendChild(e),x=new V({container:d,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:u=>{e.classList.toggle("ll-has-romanization",u),T()}}),_(),T(),Nt||(Nt=!0,document.addEventListener("fullscreenchange",yn)),Ht||(Ht=!0,window.addEventListener(ne,()=>{x?.setRomanized(y(),h()),T()})),pn(),e}function be(){let t=j();ie=!0,t.classList.add("visible"),_(),T(),x?.setEnabled(!0),Dt();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let n=i;n.id===v||!n.style||(n.dataset.liquidHidden===void 0&&(n.dataset.liquidHidden=n.style.display),n.style.display="none")}}function xe(){let t=document.getElementById(v);if(!t)return;t.classList.remove("visible"),x?.setEnabled(!1),Ut(),Ve(t,!1),ve();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let n=i;n.id===v||n.dataset.liquidHidden===void 0||(n.style.display=n.dataset.liquidHidden,delete n.dataset.liquidHidden)}}function Ft(){h()?xe():be()}function h(){return document.getElementById(v)?.classList.contains("visible")??!1}function Wt(t=h()){let e=j();ie=t,t?be():(e.classList.add("visible"),_(),T(),x?.setEnabled(!0),Dt()),Ve(e,!0),A(),T(),ve(),U(e)}function Be(t){j(),x&&(x.setLyrics(t),x.setRomanized(y(),y()),x.setEnabled(h()),_())}function re(t){let e=j();if(!x)return;x.setLyrics(null),_();let i=document.createElement("div");i.className="liquid-lyrics-empty",i.textContent=t,x.container.appendChild(i),e.classList.remove("ll-has-romanization"),T()}var Vt={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>'};function Qi(){let t=document.createElement("div");t.className="liquid-lyrics-fullscreen-bg";for(let e=0;e<2;e++){let i=document.createElement("div");i.className="ll-fullscreen-bg-tile",t.appendChild(i)}return t}function Xi(){let t=document.createElement("div");return t.className="liquid-lyrics-transparent-controls",t.setAttribute("aria-hidden","true"),t}function en(){let t=document.createElement("aside");t.className="liquid-lyrics-song-card";let e=document.createElement("div");e.className="ll-song-card-cover-wrap";let i=document.createElement("img");i.className="ll-song-card-cover",i.alt="",i.decoding="async",i.loading="lazy",e.appendChild(i);let n=document.createElement("div");n.className="ll-song-card-controls",n.append(I("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>Q(["toggleShuffle"])),I("ll-song-card-btn","previous","Previous",()=>Q(["back","previous","skipToPrevious"])),I("ll-song-card-btn ll-song-card-play","play","Play",()=>{Q(["togglePlay"]),window.setTimeout(_,60)}),I("ll-song-card-btn","next","Next",()=>Q(["next","skipToNext"])),I("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>Q(["toggleRepeat"])));let r=document.createElement("div");r.className="playback-bar ll-song-card-progress",r.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let s=document.createElement("div");s.className="ll-song-card-info";let a=document.createElement("div");a.className="ll-song-card-title";let l=document.createElement("button");l.type="button",l.className="ll-song-card-link ll-song-card-album",L(l,"Open album");let o=document.createElement("button");return o.type="button",o.className="ll-song-card-link ll-song-card-artist",L(o,"Open artist"),s.append(a,l,o),t.append(e,n,r,s),te={card:t,cover:i,title:a,album:l,artist:o,playButton:t.querySelector(".ll-song-card-play"),shuffleButton:t.querySelector(".ll-song-card-shuffle"),repeatButton:t.querySelector(".ll-song-card-repeat"),progressTrack:r.querySelector(".ll-card-progress-track"),progressFill:r.querySelector(".ll-card-progress-fill"),progressThumb:r.querySelector(".ll-card-progress-thumb"),currentTime:r.querySelector(".ll-card-current"),durationTime:r.querySelector(".ll-card-duration")},sn(te),t}function tn(){let t=document.createElement("div");return t.className="liquid-lyrics-control-pill",t.append(I("ll-control-btn ll-card-toggle","cover","Song card",fn),I("ll-control-btn ll-roman-toggle","roman","Romanization",gn),I("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",hn)),t}function I(t,e,i,n){let r=document.createElement("button");return r.type="button",r.className=t,r.dataset.icon=e,r.setAttribute("aria-label",i),r.innerHTML=Vt[e],r.addEventListener("click",s=>{s.stopPropagation(),n()}),L(r,i),r}function nn(t,e){!t||t.dataset.icon===e||(t.dataset.icon=e,t.innerHTML=Vt[e])}function _(){let t=te;if(!t)return;let e=an();e.cover?(t.cover.src!==e.cover&&(t.cover.src=e.cover),t.card.classList.remove("ll-no-cover")):(t.cover.removeAttribute("src"),t.card.classList.add("ll-no-cover")),mn(e.cover),t.title.textContent=e.title,t.album.textContent=e.album,t.album.disabled=!e.albumUri,t.album.onclick=()=>Ot(e.albumUri),t.artist.textContent=e.artist,t.artist.disabled=!e.artistUri,t.artist.onclick=()=>Ot(e.artistUri),se(),ae(!1)}function se(){let t=te;if(!t)return;let e=Ae(),i=e?"Pause":"Play";nn(t.playButton,e?"pause":"play"),t.playButton.setAttribute("aria-label",i),t.playButton.dataset.tooltip=i,ee(t.shuffleButton,dn());let n=un();ee(t.repeatButton,n!=="off"),t.repeatButton.classList.toggle("ll-repeat-one",n==="track");let r=n==="track"?"Repeat one":n==="context"?"Repeat all":"Repeat";t.repeatButton.setAttribute("aria-label",r),t.repeatButton.dataset.tooltip=r}function Dt(){he||(_e=0,He=0,he=ge(rn),se(),ae(!1))}function Ut(){he?.(),he=null}function rn(t,e){e-_e>=Ki&&(_e=e,ae(!0,t)),e-He>=Ji&&(He=e,se())}function ae(t,e=jt()){let i=te;if(!i)return;let n=W(),r=n>0?ye(e/n):0;!i.progressTrack.classList.contains("ll-previewing")&&Math.abs(r-Oe)>5e-4&&(Oe=r,i.progressFill.classList.toggle("ll-no-progress-transition",!t),i.progressFill.style.transform=`scaleX(${r.toFixed(4)})`,i.progressThumb.style.left=`${(r*100).toFixed(2)}%`,i.progressTrack.setAttribute("aria-valuenow",String(Math.round(r*100))),i.progressTrack.setAttribute("aria-valuetext",`${X(e)} of ${X(n)}`));let a=X(e);a!==Ct&&(Ct=a,i.currentTime.textContent=a);let l=X(n);l!==At&&(At=l,i.durationTime.textContent=l)}function jt(){return bn(Spicetify.Player?.getProgress?.(),0)}function sn(t){let e=t.progressTrack,i=e.querySelector(".ll-card-preview-time"),n=0,r=0,s=c=>{let p=e.getBoundingClientRect();return ye((c.clientX-p.left)/Math.max(1,p.width))},a=c=>{let p=W();p<=0||(e.classList.add("ll-previewing"),i&&(i.textContent=X(p*c),i.style.left=`${c*100}%`),t.progressFill.classList.add("ll-no-progress-transition"),t.progressFill.style.transform=`scaleX(${c.toFixed(4)})`,t.progressThumb.style.left=`${(c*100).toFixed(2)}%`)},l=c=>(r=c,n||(n=requestAnimationFrame(()=>{n=0,a(r)})),c),o=()=>{e.dataset.dragging!=="true"&&(e.classList.remove("ll-previewing"),n&&(cancelAnimationFrame(n),n=0),Oe=-1,ae(!1))},d=c=>{let p=W();if(p<=0)return;let u=l(s(c));F(p*u)};e.addEventListener("pointerenter",c=>l(s(c))),e.addEventListener("pointermove",c=>l(s(c))),e.addEventListener("pointerleave",o),e.addEventListener("blur",o),e.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),e.dataset.dragging="true",e.setPointerCapture?.(c.pointerId),d(c);let p=m=>d(m),u=m=>{d(m),delete e.dataset.dragging,o(),e.releasePointerCapture?.(c.pointerId),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",u)};window.addEventListener("pointermove",p),window.addEventListener("pointerup",u,{once:!0})}),e.addEventListener("keydown",c=>{let p=W();if(p<=0)return;let u=jt(),m=c.shiftKey?15e3:5e3;c.key==="ArrowLeft"?(c.preventDefault(),F(Math.max(0,u-m))):c.key==="ArrowRight"&&(c.preventDefault(),F(Math.min(p,u+m)))})}function an(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},i=Array.isArray(t?.artists)?t.artists.map(r=>r?.name).filter(Boolean).join(", "):"",n=Array.isArray(t?.artists)?t.artists.find(r=>r?.uri):null;return{title:t?.name||e.title||e.track_name||"Unknown track",artist:i||e.artist_name||e.artist||e.album_artist_name||"Unknown artist",album:t?.album?.name||e.album_title||e.album_name||"Unknown album",cover:ln(e.image_url||e.album_image_url||e.cover_url||t?.album?.images?.[0]?.url||t?.images?.[0]?.url||""),artistUri:n?.uri||on(e.artist_uri||e.artist_uris||""),albumUri:t?.album?.uri||e.album_uri||""}}function ln(t){return t?t.startsWith("spotify:image:")?t.replace("spotify:image:","https://i.scdn.co/image/"):t:""}function on(t){return String(t||"").split(",")[0]?.split(";")[0]?.trim()||""}function Ot(t){let e=cn(t);if(!e)return;let i=Spicetify.Platform?.History;typeof i?.push=="function"&&(i.push(e),xe())}function cn(t){let e=String(t||"").split(":");if(e.length<3||e[0]!=="spotify")return"";let i=e[1],n=e[2];return!n||!["album","artist","track","playlist"].includes(i)?"":`/${i}/${n}`}function dn(){let t=Spicetify.Player;if(typeof t?.getShuffle=="function")return!!t.getShuffle();let e=t?.data??{};return!!(e.shuffle??e.shuffling??e.options?.shuffling??e.playback_options?.shuffling??e.context?.metadata?.shuffle)}function un(){let t=Spicetify.Player,e=t?.data??{},i=typeof t?.getRepeat=="function"?t.getRepeat():e.repeat??e.repeatMode??e.repeat_mode??e.options?.repeat??e.playback_options?.repeat??e.context?.metadata?.repeat;if(e.options?.repeatingTrack||e.playback_options?.repeating_track)return"track";if(e.options?.repeatingContext||e.playback_options?.repeating_context)return"context";if(typeof i=="number")return i===2?"track":i===1?"context":"off";let n=String(i??"").toLowerCase();return n.includes("track")||n.includes("song")||n==="one"?"track":n.includes("context")||n.includes("all")||n==="playlist"||n==="on"?"context":"off"}function pn(){_t||(_t=!0,["songchange","onplaypause","onqueuechange"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>{se(),ae(!1)})}catch{}}))}function Q(t){let e=Spicetify.Player;for(let i of t)if(typeof e?.[i]=="function"){e[i](),window.setTimeout(_,80),window.setTimeout(se,180);return}}function mn(t){let i=document.getElementById(v)?.querySelector(".liquid-lyrics-fullscreen-bg");i&&(i.classList.toggle("ll-has-bg",!!t),i.querySelectorAll(".ll-fullscreen-bg-tile").forEach(n=>{let r=t?`url("${t}")`:"";n.style.backgroundImage!==r&&(n.style.backgroundImage=r)}))}function X(t){let e=Math.max(0,Math.floor(t/1e3)),i=Math.floor(e/60),n=e%60;return`${i}:${String(n).padStart(2,"0")}`}function fn(){localStorage.setItem(Bt,String(!Fe())),T()}function gn(){de(!y()),x?.setRomanized(y(),!0),T(),window.dispatchEvent(new Event(ne))}function hn(){let t=document.getElementById(v);if(!t)return;let e=!We(t);e&&(ie=!0),Ve(t,e),A(),T(),ve(),U(t)}function $t(t){t.classList.toggle("ll-song-card-hidden",!Fe()),t.classList.toggle("ll-romanized",y())}function T(){let t=document.getElementById(v);if(!t)return;$t(t),ee(t.querySelector(".ll-card-toggle"),Fe()),ee(t.querySelector(".ll-roman-toggle"),y()),ee(t.querySelector(".ll-fullscreen-toggle"),We(t));let e=t.querySelector(".ll-roman-toggle"),i=t.classList.contains("ll-has-romanization");e&&(e.hidden=!i,e.disabled=!i,i||A())}function ee(t,e){t&&(t.classList.toggle("active",e),t.setAttribute("aria-pressed",String(e)))}function Fe(){return localStorage.getItem(Bt)!=="false"}function yn(){A();let t=document.getElementById(v);t&&document.fullscreenElement!==t&&t.classList.contains("ll-native-fullscreen")&&t.classList.remove("ll-native-fullscreen"),T(),ve(),t&&U(t)}function We(t){return t.classList.contains("ll-fullscreen-mode")||document.fullscreenElement===t}function Ve(t,e){if(e){!z&&t.parentNode&&(z=document.createComment("liquid-lyrics-fullscreen-placeholder"),t.parentNode.insertBefore(z,t));let n=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==t?document.fullscreenElement:document.body;t.parentElement!==n&&n.appendChild(t),t.classList.add("ll-fullscreen-mode"),U(t);return}let i=!ie&&t.classList.contains("ll-fullscreen-mode");t.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===t&&document.exitFullscreen?.(),z?.parentNode&&(z.parentNode.insertBefore(t,z),z.remove()),z=null,U(t),i&&(t.classList.remove("visible"),x?.setEnabled(!1),Ut(),ie=!0)}function ve(){let t=document.getElementById(v);if(!!(t&&We(t))){D===void 0&&(D=localStorage.getItem(J)),localStorage.getItem(J)!=="animated"&&(localStorage.setItem(J,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}D!==void 0&&(D===null?localStorage.removeItem(J):localStorage.setItem(J,D),D=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function U(t=document.getElementById(v)){if(!t)return;let e=t.querySelector(".liquid-lyrics-transparent-controls");if(!e)return;let i=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),n=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);e.style.setProperty("--ll-transparent-controls-width",`${ye(i,50,400)}px`),e.style.setProperty("--ll-transparent-controls-height",`${ye(n,20,300)}px`)}function bn(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function ye(t,e=0,i=1){return Math.min(i,Math.max(e,t))}var Le=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var De="liquid-lyrics-button";function Yt(){let t=document.getElementById(De);if(t)return t;let e=document.querySelector(".main-nowPlayingBar-extraControls");if(!e)return null;let i=document.createElement("button");return i.id=De,i.className="liquid-lyrics-button",i.setAttribute("aria-label","Liquid Lyrics"),i.innerHTML=Le,L(i,"Liquid Lyrics"),i.addEventListener("click",()=>{Ft(),i.classList.toggle("active",h())}),e.prepend(i),i}function Gt(){let t=document.getElementById(De);t&&t.classList.toggle("active",h())}var H="liquid-lyrics-sidebar-card",Xt="liquid-lyrics-sidebar-card-collapsed",vn=300,Ln=2e3,Ue={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>'},k=null,we="Loading lyrics...",$=!1,ei=!1,je=null,$e=!1,Zt=null,P=null,Kt=0,Ye=!1,Jt=[];function Se(){let t=document.getElementById(H);if(t)return O(t),t;let e=document.createElement("section");e.id=H,e.className="liquid-lyrics-sidebar-card",e.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${Le}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${Ue.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${Ue.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${Ue.open}</button>
      </div>
      <button class="ll-sidebar-collapse-btn" type="button" aria-label="Toggle mini lyrics">
        <span class="ll-sidebar-card-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg>
        </span>
      </button>
    </div>
    <div class="ll-sidebar-card-body">
      <div class="ll-sidebar-mini-viewport">
        <div class="ll-sidebar-mini-lines"></div>
      </div>
    </div>
  `;let i=e.querySelector(".ll-sidebar-header-main"),n=e.querySelector(".ll-sidebar-collapse-btn"),r=e.querySelector(".ll-sidebar-roman-toggle"),s=e.querySelector(".ll-sidebar-fullscreen-toggle"),a=e.querySelector(".ll-sidebar-open-toggle"),l=()=>{let c=!e.classList.contains("collapsed");localStorage.setItem(Xt,String(c)),Qt(e),M()};i?.addEventListener("click",l),n?.addEventListener("click",l),r?.addEventListener("click",c=>{c.stopPropagation(),de(!y()),Te(!0),window.dispatchEvent(new Event(ne))}),s?.addEventListener("click",c=>{c.stopPropagation(),Wt(!1)}),a?.addEventListener("click",c=>{c.stopPropagation(),be()}),n&&L(n,"Toggle mini lyrics"),r&&L(r,"Romanization"),s&&L(s,"Fullscreen"),a&&L(a,"Open Liquid Lyrics");let o=e.querySelector(".ll-sidebar-mini-viewport"),d=e.querySelector(".ll-sidebar-mini-lines");return k=new V({container:d,scroller:o,variant:"sidebar",dotLiftPx:10,onRomanizationAvailability:c=>{$=c,oe(e)}}),window.addEventListener(ne,()=>{Te(!h()),oe(e)}),Qt(e),O(e),Tn(),En(),Ke(we),M(),e}function Ge(t,e="No lyrics available"){let i=Se();we=t?"Live lyrics":e,$=!1,k?.setLyrics(t),!t||!k?.hasLyrics?Ke(we):Te(!h()),oe(i),M()}function ti(t){we=t,$=!1;let e=document.getElementById(H);e&&(k?.setLyrics(null),Ke(t),oe(e),M())}function M(){let t=document.getElementById(H);if(!t)return;O(t);let e=h();t.classList.toggle("ll-hidden",e),t.dataset.romanized=String(y()),oe(t);let i=t.classList.contains("collapsed"),n=!e&&!i;k?.setEnabled(n),n&&y()&&!ei&&Te(!0)}function Ze(){O()}function Te(t){k&&(k.setRomanized(y(),t),ei=t||!y())}function Ke(t){if(!k)return;let e=document.createElement("div");e.className="ll-sidebar-mini-empty",e.textContent=t,k.container.replaceChildren(e)}function oe(t){let e=t.querySelector(".ll-sidebar-roman-toggle");if(!e)return;let i=$&&y();e.hidden=!$,e.disabled=!$,e.classList.toggle("active",i),e.setAttribute("aria-pressed",String(i))}function Qt(t){let e=localStorage.getItem(Xt)==="true";t.classList.toggle("collapsed",e),t.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!e))}function O(t=document.getElementById(H)){if(!t)return;let e=wn();e&&(t.parentElement!==e||e.lastElementChild!==t)&&e.appendChild(t)}function wn(){if(P?.isConnected)return P;P=null;let t=document.querySelector(".Root__right-sidebar"),e=t?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||t?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(e)return P=e,e;let i=performance.now();if(i-Kt<Ln)return t??null;Kt=i;let n=le(["nowplayingview","nowplayingwidget"],t??document)||le(["nowplaying","widget"],t??document)||le(["nowplayingview","nowplayinggrid"],t??document)||le(["nowplaying","grid"],t??document)||le(["right","sidebar"]);return P=n,n??t}function le(t,e=document){let i=t.map(n=>n.toLowerCase());for(let n of Array.from(e.querySelectorAll("*"))){let r=(n.getAttribute("class")||"").toLowerCase();if(i.every(s=>r.includes(s)))return n}return null}function Tn(){je||(je=new MutationObserver(()=>{Sn()}),je.observe(document.body,{childList:!0,subtree:!0}),Je())}function Sn(){$e||($e=!0,setTimeout(()=>{$e=!1,Je();let t=document.getElementById(H);t&&(t.isConnected&&P?.isConnected&&t.parentElement===P||O(t))},vn))}function En(){Zt||(Zt=setInterval(()=>{Je(),O()},1e3))}function Je(){if(!!document.querySelector(".Root__cinema-view")){Ye=!0;return}Ye&&(Ye=!1,kn())}function kn(){Jt.forEach(t=>clearTimeout(t)),Jt=[80,260,620,1100].map(t=>setTimeout(()=>{let e=document.getElementById(H)??Se();P=null,O(e),M()},t))}var ii=`\uFEFF/* ==========================================================================
   Liquid Lyrics
   --------------------------------------------------------------------------
   1. Registered properties & design tokens
   2. Now-playing-bar button
   3. Panel shell (backgrounds, header, layout, enter animations)
   4. Song card
   5. Control pill & tooltip
   6. Lyrics engine - shared line/word/letter/interlude styles
   7. Panel lyrics variant & virtualizer
   8. Sidebar card
   9. Fullscreen modes
   10. Responsive
   --------------------------------------------------------------------------
   Contract with src/ui/lyrics/view.ts:
   - Resting values (past/future lines, sung/future words) live in the state
     class rules below; the engine only writes inline styles while a line is
     actively singing and removes them again on state flips.
   - Lift/scale are inline transforms, so \`.singing\` disables the transform
     transition (JS drives every frame) while the base transition catches
     interrupted lifts and glides them back down.
   ========================================================================== */

/* --- 1. Registered properties & design tokens ----------------------------- */

@property --line-progress {
  syntax: "<number>";
  inherits: false;
  initial-value: -20;
}

@property --syl-progress {
  syntax: "<number>";
  inherits: false;
  initial-value: -20;
}

@property --letter-progress {
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
  --liquid-lyrics-surface-shadow: var(--liquify-shadow, var(--liquid-lyrics-glowify-shadow));
  --liquid-lyrics-song-card-shadow: var(--liquid-lyrics-glowify-shadow);
}

/* Liquify glass filter integration */
:root:has(#glass-filter--r1-7) {
  --liquid-lyrics-surface-backdrop: var(--glass-filter, url(#glass-filter--r1-7)) blur(2px);
  --liquid-lyrics-song-card-shadow: none;
}

/* --- 2. Now-playing-bar button --------------------------------------------- */

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
}

.liquid-lyrics-button.active {
  color: var(--liquify-glow-accent, var(--accent-color));
}

/* --- 3. Panel shell ---------------------------------------------------------- */

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
  --ll-fill-bright: rgba(255, 255, 255, 1);
  --ll-fill-dim: rgba(255, 255, 255, 0.28);
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

/* Placeholder surface for Liquify's glass background. */
.liquid-lyrics-glass-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: 20px;
  background: transparent;
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
}

.ll-fullscreen-bg-tile:nth-child(2) {
  width: 1800px;
  height: 1800px;
  right: -200px;
  top: -348px;
  animation-direction: reverse;
  animation-duration: 25s;
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
    gap 520ms cubic-bezier(0.16, 1, 0.3, 1);
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
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;
  mask-image: linear-gradient(to bottom, transparent 0, black 11%, black 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 11%, black 82%, transparent 100%);
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

@keyframes ll-fullscreen-bg-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

/* --- 4. Song card -------------------------------------------------------------- */

.liquid-lyrics-song-card {
  position: relative;
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

.liquid-lyrics-song-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: var(--liquify-shadow, none) !important;
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

/* Fill is scaled (compositor-only) instead of resized; JS syncs a few times a
   second and the linear transition bridges the gaps. */
.ll-card-progress-fill {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.92);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 210ms linear;
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
  margin-top: 4px;
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

/* --- 5. Control pill & tooltip -------------------------------------------------- */

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

/* --- 6. Lyrics engine (shared) ---------------------------------------------------- */

.liquid-lyrics-line {
  width: 100%;
  max-width: 900px;
  margin: 0;
  padding: 7px 0;
  position: relative;
  border: 0;
  appearance: none;
  cursor: pointer;
  color: transparent;
  font-family: inherit;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.24;
  text-align: center;
  overflow-wrap: anywhere;
  word-break: normal;
  opacity: 0.28;
  transform: translate3d(0, 0, 0) scale(0.955);
  transform-origin: center;
  transition:
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 560ms cubic-bezier(0.16, 1, 0.3, 1);
  background: linear-gradient(
    to bottom,
    var(--ll-fill-bright, #fff) calc(var(--line-progress) * 1%),
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) calc((var(--line-progress) * 1%) + 20%),
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.liquid-lyrics-line:hover {
  opacity: 0.56;
}

.liquid-lyrics-line.active {
  opacity: 1;
  transform: translate3d(0, -2px, 0) scale(1.07);
  will-change: transform, opacity;
}

.liquid-lyrics-line.past {
  --line-progress: 100;
}

.liquid-lyrics-line.future {
  --line-progress: -20;
}

.liquid-lyrics-line.ll-glow {
  filter:
    saturate(1.12)
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.32))
    drop-shadow(0 0 26px rgba(151, 208, 185, 0.2));
}

/* Just-finished lines sweep their fill to 100% instead of snapping. */
.liquid-lyrics-line.ll-finishing {
  transition:
    --line-progress 560ms linear,
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 560ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Word-synced lines paint through their word spans instead. */
.ll-syllable-line {
  display: flex;
  flex-direction: column;
  gap: 0.12em;
  background: none;
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
  display: inline-block;
  position: relative;
  color: transparent;
  transform-origin: center bottom;
  transition:
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 180ms ease;
  background: linear-gradient(
    to right,
    var(--ll-fill-bright, #fff) calc(var(--syl-progress) * 1%),
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) calc((var(--syl-progress) * 1%) + 20%),
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) 100%
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

/* While singing, JS drives the transform every frame - no transition. */
.ll-syllable.singing {
  will-change: transform;
  transition: filter 180ms ease;
}

.ll-syllable.sung {
  --syl-progress: 100;
}

.ll-syllable.future {
  --syl-progress: -20;
}

/* Untouched words in finished/upcoming lines rest at their end states. */
.ll-syllable-line.past .ll-syllable {
  --syl-progress: 100;
}

.ll-syllable-line.future .ll-syllable {
  --syl-progress: -20;
}

.ll-finishing .ll-syllable {
  transition:
    --syl-progress 360ms linear,
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 220ms ease;
}

/* Long held words: the fill and lift travel per letter. */
.ll-long-syllable {
  white-space: nowrap;
  background: none;
}

.ll-letter {
  display: inline-block;
  color: transparent;
  transform-origin: center bottom;
  background: linear-gradient(
    to right,
    var(--ll-fill-bright, #fff) calc(var(--letter-progress) * 1%),
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) calc((var(--letter-progress) * 1%) + 20%),
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Catches interrupted lifts (seeks, skips) and glides them back to rest. */
  transition: transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.ll-syllable.singing .ll-letter {
  will-change: transform;
  transition: none;
}

.ll-syllable.sung .ll-letter {
  --letter-progress: 100;
}

.ll-syllable.future .ll-letter {
  --letter-progress: -20;
}

.ll-syllable-line.past .ll-letter {
  --letter-progress: 100;
}

.ll-syllable-line.future .ll-letter {
  --letter-progress: -20;
}

.ll-finishing .ll-letter {
  transition:
    --letter-progress 360ms linear,
    transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Interludes ----------------------------------------------------------------- */

.liquid-lyrics-interlude {
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
  background: none;
  transform: translate3d(0, var(--interlude-y, -24px), 0) scale(var(--interlude-scale, 0.72));
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
  opacity: 0.55;
  transform-origin: center;
  transition:
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),
    background 360ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* JS bounces the dots every frame while the interlude runs. */
.liquid-lyrics-interlude.active .ll-interlude-dot {
  transition:
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),
    background 360ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-interlude-dot.lit {
  opacity: 1;
  background:
    radial-gradient(circle at 35% 28%, #fff, rgba(255, 255, 255, 0.78) 58%),
    rgba(255, 255, 255, 0.94);
  filter:
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.38))
    drop-shadow(0 0 24px rgba(151, 208, 185, 0.22));
}

/* Finished interludes: dots drift up and fade with the container. */
.liquid-lyrics-interlude.past .ll-interlude-dot {
  transform: translateY(-24px);
  opacity: 0;
}

/* Static (unsynced) lyrics ------------------------------------------------------ */

.liquid-lyrics-static {
  cursor: default;
  opacity: 0.96;
  color: rgba(255, 255, 255, 0.94);
  background: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);
  transform: translate3d(0, 0, 0) scale(1);
}

.liquid-lyrics-static:hover {
  opacity: 1;
}

/* --- 7. Panel virtualizer -------------------------------------------------------- */

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

/* --- 8. Sidebar card --------------------------------------------------------------- */

.liquid-lyrics-sidebar-card {
  width: 100%;
  min-width: 0;
  height: clamp(210px, 30vh, 360px);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  color: #fff;
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  transition:
    height 380ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 260ms ease,
    transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
  --ll-fill-bright: #fff;
  --ll-fill-dim: rgba(255, 255, 255, 0.42);
}

.liquid-lyrics-sidebar-card.ll-hidden {
  display: none;
}

.ll-sidebar-card-header,
.ll-sidebar-header-main,
.ll-sidebar-collapse-btn,
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

.ll-sidebar-card-header:hover {
  background-color: rgba(255, 255, 255, 0.09);
}

.ll-sidebar-header-main {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 0;
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

.ll-sidebar-collapse-btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 10px;
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

.ll-sidebar-card-body {
  position: relative;
  height: calc(100% - 54px);
  min-height: 0;
  padding: 0 0 14px;
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

.ll-sidebar-mini-viewport {
  position: relative;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.34) transparent;
  mask-image: linear-gradient(to bottom, transparent 0, black 15%, black 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 15%, black 82%, transparent 100%);
}

.ll-sidebar-mini-viewport::-webkit-scrollbar {
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

.ll-sidebar-mini-empty {
  margin: auto 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
}

/* Sidebar lyric sizing & state overrides */

.liquid-lyrics-sidebar-card .liquid-lyrics-line {
  max-width: 100%;
  box-sizing: border-box;
  padding: 3px 8px;
  font-size: clamp(19px, 1.3vw, 25px);
  font-weight: 850;
  line-height: 1.16;
  word-break: break-word;
  hyphens: auto;
  opacity: 0.42;
  transform: translate3d(0, 0, 0) scale(0.98);
}

.liquid-lyrics-sidebar-card[data-romanized="true"] .liquid-lyrics-line {
  font-size: clamp(16px, 1.05vw, 22px);
  line-height: 1.2;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line:hover {
  opacity: 0.6;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.active {
  opacity: 1;
  transform: translate3d(0, -1px, 0) scale(1.025);
  filter:
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.24))
    drop-shadow(0 0 20px rgba(151, 208, 185, 0.1));
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.active.ll-glow {
  filter:
    saturate(1.12)
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.34))
    drop-shadow(0 0 24px rgba(151, 208, 185, 0.18));
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.past:not(.active) {
  opacity: 0.4;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.future:not(.active) {
  opacity: 0.3;
}

.liquid-lyrics-sidebar-card .ll-syllable-line {
  display: block;
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
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.liquid-lyrics-sidebar-card .ll-syllable.singing {
  filter:
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.24))
    drop-shadow(0 0 18px rgba(151, 208, 185, 0.12));
}

.liquid-lyrics-sidebar-card .ll-long-syllable {
  background: none;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude {
  gap: 10px;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-interlude.active {
  height: 46px;
  padding: 13px 0;
  margin: 1px 0;
}

.liquid-lyrics-sidebar-card .ll-interlude-dot {
  width: 9px;
  height: 9px;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-static,
.liquid-lyrics-sidebar-card .liquid-lyrics-static.past,
.liquid-lyrics-sidebar-card .liquid-lyrics-static.future {
  color: rgba(255, 255, 255, 0.94);
  background: none;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);
  opacity: 0.96;
  filter: none;
}

/* --- 9. Fullscreen modes ---------------------------------------------------------- */

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

.liquid-lyrics-panel:fullscreen .liquid-lyrics-fullscreen-bg,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-fullscreen-bg {
  opacity: 1;
  position: fixed;
  inset: 0;
  background: black;
}

.liquid-lyrics-panel:fullscreen .liquid-lyrics-transparent-controls,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-transparent-controls {
  opacity: 1;
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

/* --- 10. Responsive -------------------------------------------------------------- */

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
`;function ni(){let t="liquid-lyrics-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=ii,document.head.appendChild(e)}async function Rn(){await q(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),ni(),j(),Se(),await q(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),Yt();let t=null,e=null,i="Loading lyrics...",n=0,r=ri();async function s(){let u=Spicetify.Player.data;if(!u?.item?.uri)return;let m=u.item.uri,g=m.includes(":")?m.split(":")[2]:m;if(g===t){Ze(),M();return}t=g,e=null,i="Loading lyrics...",Ze(),ti(i),h()&&re(i),await a(g,u.item)}async function a(u,m){let g=++n,R=await st({id:u,data:{name:m.name}});if(!(g!==n||u!==t)){if(R.status==="success"&&R.data){e=R.data,i="",Ge(R.data),h()&&Be(R.data);return}e=null,i=R.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",Ge(null,i),h()&&re(i)}}Spicetify.Player.addEventListener("songchange",()=>{s()});let l=()=>{let u=ri();u!==r&&(r=u,h()&&xe())};setInterval(()=>{l()},250);let o=Spicetify.Platform?.History;typeof o?.listen=="function"&&o.listen(l);let d=h(),c=new MutationObserver(()=>{let u=h();if(Gt(),M(),u&&!d&&t)if(e)Be(e);else if(i&&i!=="Loading lyrics...")re(i);else{let m=Spicetify.Player.data;if(m?.item?.uri){let g=m.item.uri.includes(":")?m.item.uri.split(":")[2]:m.item.uri;re("Loading lyrics..."),a(g,m.item)}}d=u}),p=document.getElementById("liquid-lyrics-panel");p&&c.observe(p,{attributes:!0,attributeFilter:["class"]}),M(),s()}Rn();function ri(){let e=Spicetify.Platform?.History?.location??{},i=e.pathname||e.path||e.uri||"";return`${location.href}|${i}`}})();
