// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{function z(t,e=1e4){return new Promise((i,n)=>{let r=Date.now(),s=setInterval(()=>{let l=t();l?(clearInterval(s),i(l)):Date.now()-r>e&&(clearInterval(s),n(new Error("wait() timed out")))},100)})}var ke="5.19.11",Xe=["spicy","spotify"];async function Me({id:t}){try{let e=t.includes(":")?t.split(":")[2]:t,i="https://spclient.wg.spotify.com/color-lyrics/v2/track/",n;try{n=await(await z(()=>Spicetify.CosmosAsync?.get))(`${i}${e}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let r=n?.lyrics;if(!r)return{status:"missing_lyrics",data:null};let s=r.lines,l;if(r.syncType==="LINE_SYNCED"){let a=s.map((o,d)=>{let c=Number(o.startTimeMs)||0,p=d<s.length-1?Number(s[d+1].startTimeMs):c+5e3;return o.words==="\u266A"?{Type:"Interlude",Text:o.words,StartTime:c,EndTime:p,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:o.words,StartTime:c,EndTime:p,OppositeAligned:!1,IsRTL:!1}});l={Id:e,Type:"Line",SongWriters:[],Content:a,StartTime:a.length>0?a[0].StartTime:0,EndTime:a.length>0?a[a.length-1].EndTime:0,Provider:"spotify"}}else l={Id:e,Type:"Static",SongWriters:[],Lines:s.map(a=>({Text:a.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:l}}catch(e){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:e instanceof Error?e.message:String(e)}}}}var tt=["https://api.spicylyrics.org","https://coregateway.spicylyrics.org","https://lcgateway.spikerko.org"],Re=tt[0];async function it(t,e){try{return await et(Re,t,e)}catch{for(let i of tt)if(i!==Re)try{let n=await et(i,t,e);return Re=i,n}catch{continue}}throw new Error("All nodes are currently unreachable")}async function et(t,e,i){let n=await fetch(`${t}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":ke,...i&&{"SpicyLyrics-WebAuth":i}},body:JSON.stringify({queries:e,client:{version:ke}})});if(!n.ok)throw new Error(`Node ${t} failed`);return n.json()}var C,G;async function nt(){return C&&C.expiresAtTime-Date.now()>2e3?C.accessToken:G||(G=(async()=>{let t=await z(()=>Spicetify.CosmosAsync),e=await z(()=>Spicetify.Platform);try{C=await t.get("sp://oauth/v2/token")}catch(i){i.message?.includes("Resolver not found")&&e.Session&&(C={accessToken:e.Session.accessToken,expiresAtTime:e.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{G=void 0}if(!C)throw new Error("Could not retrieve Spotify Access Token");return C.accessToken})(),G)}async function st({id:t}){try{let e=await di(t),i=mi(e);if(!e||!i)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let n=pi(i.result);if(n.status==="missing_lyrics")return{status:"missing_lyrics",data:null};if(n.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:n.message}};let r=n.data;return r.Provider="spicy",ui(r),{status:"success",data:r}}catch(e){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:e instanceof Error?e.message:String(e)}}}}async function di(t){let i=`Bearer ${await nt()}`;return await it([{operation:"lyrics",variables:{id:t,auth:"SpicyLyrics-WebAuth"}}],i)}function ui(t){if(t.Type==="Static")return;let e=i=>Math.round(Number(i||0)*1e3);if(t.StartTime=e(t.StartTime),t.EndTime=e(t.EndTime),t.Type==="Syllable")for(let i of t.Content){if(i.Lead){i.Lead.StartTime=e(i.Lead.StartTime),i.Lead.EndTime=e(i.Lead.EndTime);for(let n of i.Lead.Syllables)n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime)}if(i.Background)for(let n of i.Background){n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime);for(let r of n.Syllables)r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime)}}else if(t.Type==="Line")for(let i of t.Content)i.StartTime=e(i.StartTime),i.EndTime=e(i.EndTime)}function pi(t){if(!t||typeof t!="object")return{status:"error",message:"Spicy returned an empty result"};let e=t,i=e.httpStatus,n=e.data??t;return i===404||qe(n,"MISSING_LYRICS")?{status:"missing_lyrics"}:i&&i!==200?{status:"error",message:rt(n)}:qe(n)?{status:"error",message:rt(n)}:fi(n)?{status:"success",data:n}:{status:"error",message:"Unexpected response from Spicy"}}function mi(t){return(t?.queries.flat()??[]).find(i=>i.operation==="lyrics"&&!!i.result)}function fi(t){if(!t||typeof t!="object"||!("Type"in t))return!1;let e=t.Type;return e==="Syllable"||e==="Line"||e==="Static"}function qe(t,e){if(!t||typeof t!="object"||!("error"in t))return!1;let i=t.error;return typeof i=="string"&&(!e||i===e)}function rt(t){return qe(t)?t.message??t.error:"Unexpected Error from Spicy"}var gi={spotify:{id:"spotify",fetch:Me},spicy:{id:"spicy",fetch:st}},ze=new Map;async function lt(t){let e=t.id;if(!t.forceRefresh&&ze.has(e))return{status:"success",data:ze.get(e)};let i=!1;for(let n of Xe){let r=gi[n];if(!r)continue;let s=await r.fetch(t);if(s.status==="success"&&s.data){let l=n==="spicy"?await hi(t,s.data):s.data;return ze.set(e,l),{...s,data:l}}if(s.status==="missing_lyrics"){i=!0;continue}}return i?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}async function hi(t,e){if(e.Type!=="Syllable"&&e.Type!=="Line")return e;try{let i=await Me(t);if(i.status!=="success"||!i.data)return e;let n=yi(i.data);if(n.length===0||e.Type==="Line")return e;e.Content.forEach(r=>{let s=r.Lead,l=bi(n,s?.StartTime??0,s?.EndTime??0);l&&(r.LiquidLyricsOriginalText=l.text,s&&(s.LiquidLyricsOriginalText=l.text))})}catch{return e}return e}function yi(t){return t.Type!=="Line"?[]:t.Content.filter(e=>e.Type!=="Interlude").map(e=>({text:vi(e.Text),start:Number(e.StartTime)||0,end:Number(e.EndTime)||0})).filter(e=>e.text&&!e.text.includes("\u266A")&&!e.text.includes("\xE2\u2122\xAA"))}function bi(t,e,i){let n=Number(e)||0,r=Number(i)||n,s=(n+r)/2,l=null,a=Number.POSITIVE_INFINITY;for(let o of t){let d=(o.start+o.end)/2,c=Math.abs(o.start-n),p=Math.abs(d-s),u=c*.75+p*.25;u<a&&(l=o,a=u)}return l&&a<=3500?l:null}function vi(t){return String(t??"").replace(/\s+/g," ").trim()}var xi="liquid-lyrics-mode",Pe="liquid-lyrics-romanization";var Ie=new Map,Qn=localStorage.getItem(xi)||"romanization",ct=localStorage.getItem(Pe)!==null?localStorage.getItem(Pe)==="true":!1;function dt(){return(Spicetify?.Platform?.Session?.locale||navigator.language||"en").split("-")[0]}var oe=null;async function Li(){return window.wanakana?!0:oe||(oe=new Promise(e=>{let i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/wanakana@4.0.2/umd/wanakana.min.js",i.onload=()=>e(!0),i.onerror=()=>e(!1),document.head.appendChild(i)}),oe)}function at(t){let e=Array.isArray(t?.[0])?t[0]:[];for(let i of e){if(!Array.isArray(i)||i.length<4)continue;let n=i[3];if(i[0]==null&&i[1]==null&&i[2]==null&&typeof n=="string"&&n.trim())return n}return""}function ot(t){return t?String(t).replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g,"").replace(/[\u3040-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]/g,"").replace(/\s+/g," ").trim():""}function y(){return ct}function ce(t){ct=t,localStorage.setItem(Pe,String(t))}async function Ce(t,e="auto"){let i=String(t??"").trim(),n=dt();if(!i||i.includes("\u266A"))return{detected:n,roman:""};let r=`legacy:${i}`;return Ie.has(r)||Ie.set(r,(async()=>{try{let s=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${n}&dt=t&dt=rm&q=${encodeURIComponent(i)}`,a=await(await fetch(s)).json(),o=(typeof a?.[2]=="string"?a[2]:typeof a?.[1]=="string"?a[1]:n)||n,d=String(o).toLowerCase(),c="";return d.startsWith("ja")?(c=ot(at(a)),c||(c=await wi(i))):d.startsWith("zh")&&(c=ot(at(a))),{detected:o,roman:pt(c)}}catch{return{detected:n,roman:""}}})()),Ie.get(r)}async function ut(t,e="auto"){let i=t.map(pt),n=i.map(()=>({detected:dt(),roman:""})),r=i.map((l,a)=>({text:l,index:a})).filter(l=>l.text&&!l.text.includes("\u266A"));return r.length===0||(await Promise.all(r.map(l=>Ce(l.text,"auto")))).forEach((l,a)=>{n[r[a].index]=l}),n}async function wi(t){await Li();let e=window;return Ti(e.wanakana?e.wanakana.toRomaji(t):"")}function Ti(t){return String(t??"").replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g,"").replace(/[\u3040-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]/g,"").replace(/[\uAC00-\uD7AF]/g,"").replace(/\s+/g," ").trim()}function pt(t){return String(t??"").replace(/\s+/g," ").trim()}var de="liquid-lyrics-tooltip";function x(t,e){t.dataset.tooltip=e;let i=()=>Ei(t,t.dataset.tooltip||e);t.addEventListener("pointerenter",i),t.addEventListener("focus",i),t.addEventListener("pointerleave",A),t.addEventListener("blur",A),t.addEventListener("click",()=>window.setTimeout(()=>mt(t),0))}function Ei(t,e){if(t.hasAttribute("disabled")||t.hidden)return;let i=Si(t);i.textContent=e,i.classList.add("visible"),mt(t)}function A(){document.getElementById(de)?.classList.remove("visible")}function Si(t){let e=ki(t),i=document.getElementById(de);return i||(i=document.createElement("div"),i.id=de,i.className="liquid-lyrics-tooltip"),i.parentElement!==e&&e.appendChild(i),i}function ki(t){let e=document.fullscreenElement;return e instanceof HTMLElement&&e.contains(t)?e:document.body}function mt(t){let e=document.getElementById(de);if(!e?.classList.contains("visible"))return;let i=t.getBoundingClientRect(),n=9,r=e.offsetWidth||80,s=e.offsetHeight||28,l=Math.max(8,i.top-s-n),a=Mi(i.left+i.width/2,r/2+8,window.innerWidth-r/2-8);e.style.left=`${a}px`,e.style.top=`${l}px`}function Mi(t,e,i){return Math.min(i,Math.max(e,t))}function yt(t){return t.Type==="Line"?Ri(t.Content??[]):t.Type==="Syllable"?qi(t.Content??[]):(t.Lines??[]).map(e=>({kind:"static",text:w(e.Text),romanizedText:w(e.RomanizedText)})).filter(e=>e.text)}function Ri(t){let e=[],i=b(t[0]?.StartTime,0);return t.length>0&&i>500&&e.push(ue(0,i)),t.forEach((n,r)=>{let s=t[r+1],l=zi(n,s);n.Type==="Interlude"?e.push(ue(l.start,l.end)):e.push({kind:"line",range:l,text:w(n.Text),romanizedText:w(n.RomanizedText)}),bt(e,l.end,b(s?.StartTime,NaN))}),e}function qi(t){let e=[],i=t.map((n,r)=>Ii(n,t[r+1]));return i.length>0&&i[0].range.start>500&&e.push(ue(0,i[0].range.start)),i.forEach((n,r)=>{e.push({kind:"syllable",range:n.range,text:n.lead.sourceText||n.lead.words.map(s=>s.text).join(" ").trim(),romanizedText:Ni(n.lead.words),lead:n.lead,backgrounds:n.backgrounds}),bt(e,n.range.end,i[r+1]?.range.start??NaN)}),e}function ue(t,e){return{kind:"interlude",range:{start:t,end:Math.max(e,t+250)}}}function bt(t,e,i){Number.isFinite(i)&&(i-e<3e3||t.push(ue(e,i)))}function zi(t,e){let i=b(t.StartTime,0),n=b(e?.StartTime,NaN),r=b(t.EndTime,i+4500),s=Lt(r,n);return{start:i,end:wt(s,i,s,250)}}function Ii(t,e){let i=gt(t.Lead),n=(t.Background??[]).map(p=>gt(p)),r=b(e?.Lead?.StartTime,NaN),s=i.range.start,l=Number.isFinite(r)&&r>s?r:s+4500,a=Math.max(i.range.end,...n.map(p=>p.range.end)),o=Lt(a,r),c=ft(t.Lead)||(t.Background??[]).some(ft)?Number.POSITIVE_INFINITY:l;return{range:{start:s,end:wt(o,s,l,250,c)},lead:i,backgrounds:n}}function ft(t){let e=b(t?.StartTime,0),i=Number(t?.EndTime);return Number.isFinite(i)&&i>e}function gt(t){let e=b(t?.StartTime,0),i=Number(t?.EndTime),n=Number.isFinite(i)&&i>e?b(i,e):e+4500,r={start:e,end:n};return{range:r,sourceText:Vi(t),words:Ci(Pi(t?.Syllables??[],r),r)}}function Pi(t,e){let i=[],n=null,r=!1;return t.forEach((s,l)=>{let a={text:w(s.Text),romanizedText:w(s.RomanizedText),start:b(s.StartTime,e.start),end:b(s.EndTime,e.start+80),animateLetters:!1},o=!!(s.IsPartOfWord||r)&&!k(a.text)&&!k(n?.text??"");o&&n?(n.text+=a.text,n.romanizedText=ji(n.romanizedText,a.romanizedText," "),n.start=Math.min(n.start,a.start),n.end=Math.max(n.end,a.end)):(n&&!o&&i.push(n),n=a),r=!!s.IsPartOfWord,(!s.IsPartOfWord||l===t.length-1)&&n&&(i.push(n),n=null)}),i.filter(s=>s.text)}function Ci(t,e){if(t.length===0)return[];let i=e.start,n=Math.max(e.end,i+250),r=t.map(o=>({...o,start:S(o.start,i,n),end:S(o.end,i,n)})).filter(o=>o.text.trim().length>0),s=i;r.forEach(o=>{o.start=Math.max(s,o.start),s=o.start});let l=[];r.forEach(o=>{let d=l[l.length-1],c=d?.[0]?.start;d&&c!==void 0&&Math.abs(o.start-c)<=12?(o.start=c,d.push(o)):l.push([o])});let a=[];return l.forEach((o,d)=>{let c=o[0].start,p=l[d+1]?.[0]?.start??n,u=Math.max(c+1,p);if(o.length===1){a.push({...o[0],start:c,end:_i(o[0].end,c,u)});return}Ai(o,c,u).forEach(m=>a.push(m))}),a.map((o,d)=>{let c=a[d+1]?.start??n,p=Math.max(o.start+1,c),u=Math.min(Math.max(o.end,o.start+1),p);return{...o,end:u,animateLetters:me(o.text,o.start,u)}})}function Ai(t,e,i){let n=Math.max(i,e+t.length*80),r=t.reduce((l,a)=>l+ht(a.text),0)||t.length,s=e;return t.map((l,a)=>{let o=a===t.length-1,d=t.length-a,c=Math.max(1,n-s),p=(n-e)*ht(l.text)/r,u=Math.max(1,c-(d-1)),m=s,g=o?n:s+S(p,1,u);return s=g,{...l,start:m,end:g}})}function _i(t,e,i){return Number.isFinite(t)&&t>e?Math.min(t,i):i}function ht(t){return Math.max(1,Array.from(t.trim()).length)}function me(t,e,i){let n=Array.from(t.trim());if(n.length<3)return!1;let r=i-e;return r<750||r/n.length<90?!1:n.some(s=>/[A-Za-z0-9]/.test(s))}function Ni(t){return t.map(e=>B(e.romanizedText)).filter(Boolean).join(" ").trim()}function vt(t,e,i){let n=Wi(t);if(n.length===0)return[];let r=i.filter(l=>l.text&&Number.isFinite(l.start)&&Number.isFinite(l.end));if(r.length===n.length)return n.map((l,a)=>Ae(l,r[a].start,r[a].end));if(n.length<r.length)return Hi(n,r);let s=r.length>0?{start:r[0].start,end:r[r.length-1].end}:e;return Bi(n,s)}function Hi(t,e){let i=t.map(pe),n=[0];e.forEach(o=>{n.push(n[n.length-1]+Fi(o.text))});let r=i.reduce((o,d)=>o+d,0)||t.length,s=n[n.length-1]||e.length,l=0,a=0;return t.map((o,d)=>{let c=d===t.length-1,p=t.length-d,u=e.length;if(!c){a+=i[d];let ai=a/r*s,oi=l+1,ci=e.length-(p-1);u=Oi(n,ai,oi,ci)}let m=e.slice(l,u);l=u;let g=m[0]??e[e.length-1],q=m[m.length-1]??g;return Ae(o,g.start,q.end)})}function Oi(t,e,i,n){let r=i,s=Number.POSITIVE_INFINITY;for(let l=i;l<=n;l++){let a=Math.abs((t[l]??0)-e);a<s&&(r=l,s=a)}return r}function Bi(t,e){let i=e.start,n=Math.max(e.end,i+t.length),r=t.reduce((l,a)=>l+pe(a),0)||t.length,s=i;return t.map((l,a)=>{let o=a===t.length-1,d=t.length-a,c=Math.max(1,n-s),p=o?c:S((n-i)*pe(l)/r,1,c-(d-1)),u=s,m=o?n:s+p;return s=m,Ae(l,u,m)})}function Ae(t,e,i){let n=Math.max(e+1,i);return{text:t,romanizedText:t,start:e,end:n,animateLetters:me(t,e,n)}}function Wi(t){return B(t).split(/\s+/).map(e=>e.trim()).filter(Boolean)}function pe(t){let e=t.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"");if(!e)return Math.max(1,Array.from(t).length);let i=e.match(/[aeiouy]+/g)?.length??0,n=e.match(/n(?![aeiouy])/g)?.length??0;return Math.max(1,i+n)}function Fi(t){return k(t)?Math.max(.5,Array.from(t).reduce((e,i)=>/[㐀-䶿一-鿿豈-﫿]/.test(i)?e+2:/[ぁぃぅぇぉゃゅょゎゕゖァィゥェォャュョヮ]/.test(i)?e+.45:/[぀-ヿㇰ-ㇿ･-ﾟ가-힯]/.test(i)?e+1:/[A-Za-z0-9]/.test(i)?e+.35:/\S/.test(i)?e+.2:e,0)):pe(t)}function w(t){return String(t??"").replace(/\s+/g," ").trim()}function B(t){let e=w(t);return e&&!k(e)?e:""}function k(t){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(t)}function xt(t){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(t)?"ja":/[가-힯]/.test(t)?"ko":"auto"}function Vi(t){return w(t?.LiquidLyricsOriginalText)||Di(t?.Syllables??[])}function Di(t){let e="",i="",n=!1;return t.forEach(r=>{let s=w(r.Text);if(!s)return;let l=!e||r.IsPartOfWord||n||Ui(i,s);e+=l?s:` ${s}`,i=s,n=!!r.IsPartOfWord}),e.trim()}function Ui(t,e){return!t||!e||/^[,.;:!?)]/.test(e)||/[(]$/.test(t)?!0:k(t)||k(e)}function ji(t,e,i){let n=w(t),r=w(e);return n?r?`${n}${i}${r}`:n:r||void 0}function Lt(t,e){return!Number.isFinite(e)||e<=t?t:e-t<3e3?e:t}function wt(t,e,i,n,r=Number.POSITIVE_INFINITY){let s=b(t,i),l=s>=e+n?s:Math.max(i,e+n);return Math.min(l,r)}function b(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function S(t,e=0,i=1){return Math.min(i,Math.max(e,t))}function _e(t,e){return S((e-t.start)/Math.max(1,t.end-t.start))}function W(t,e,i){let n=S((i-t)/(e-t));return n*n*(3-2*n)}var $i=1200,Tt="",Et=0,St=0;function K(){let t=b(Spicetify.Player?.getProgress?.(),0),e=kt(),i=performance.now(),n=Et+(i-St);if(!Ne()||e!==Tt||Math.abs(t-n)>$i)return Mt(t,e,i),t;let r=V();return r>0?Math.min(n,r):n}function F(t){let e=Math.max(0,Math.round(t));Mt(e),Spicetify.Player?.seek?.(e)}function Ne(){let t=Spicetify.Player;return typeof t?.isPlaying=="function"?!!t.isPlaying():typeof t?.data?.isPaused=="boolean"?!t.data.isPaused:!!(t?.data?.is_playing??t?.data?.isPlaying)}function V(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{};return b(e.duration_ms??e.duration??t?.duration?.milliseconds??t?.duration_ms??Spicetify.Player?.data?.duration,0)}function kt(){return String(Spicetify.Player?.data?.item?.uri??"")}function Mt(t,e=kt(),i=performance.now()){Tt=e,Et=Math.max(0,t),St=i}var Z=new Set,_=null;function fe(t){return Z.add(t),_===null&&(_=requestAnimationFrame(Rt)),()=>{Z.delete(t),Z.size===0&&_!==null&&(cancelAnimationFrame(_),_=null)}}function Rt(t){if(Z.size===0){_=null;return}_=requestAnimationFrame(Rt);let e=K();for(let i of Z)i(e,t)}var qt=900,Yi=.92,Gi=5e3,Ki=180,zt=1100,He=.75,Zi=8,f=-999,D=class{constructor(e){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=-1;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.useRoman=!1;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.tick=(e,i)=>{if(e===this.lastProgress)return;this.lastProgress=e;let n=this.findActiveIndex(e);n!==this.activeIndex&&(this.applyPosition(n,e),this.activeIndex=n),n>=0&&(this.virtual&&this.mountAround(n),this.updateActiveLine(this.records[n],e)),this.outgoingLines.length>0&&this.updateOutgoingLines(e)};this.onUserScroll=()=>{this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},Gi)};this.onContainerClick=e=>{let i=e.target?.closest(".liquid-lyrics-line");if(!i)return;let n=this.recordByEl.get(i);!n||!Number.isFinite(n.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),F(n.start),this.forceSync(),this.scrollToRecord(n))};this.container=e.container,this.scroller=e.scroller??e.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...e},this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",i=>{(i.pointerType==="mouse"||i.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasLyrics(){return this.records.length>0}setLyrics(e){if(this.clear(),!e)return;let i=yt(e);if(i.length===0)return;let n=this.options.virtualize&&i.some(r=>r.kind==="syllable");if(this.records=i.map((r,s)=>this.buildLineRecord(r,s)),this.records.forEach(r=>this.recordByEl.set(r.el,r)),this.hasTimeline=this.records.some(r=>Number.isFinite(r.start)),n)this.initVirtualizer();else{let r=document.createDocumentFragment();this.records.forEach(s=>r.appendChild(s.el)),this.container.appendChild(r)}this.syncClock(),this.forceSync()}clear(){this.generation++,this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=-1,this.lastProgress=NaN,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.container.replaceChildren()}setEnabled(e){this.enabled!==e&&(this.enabled=e,this.syncClock(),e&&this.forceSync())}setRomanized(e,i){this.useRoman=e;let n=[],r=!1;for(let s of this.records){let l=s.line;if(l.kind==="interlude"||!l.text)continue;let a=k(l.text),o=B(l.romanizedText);if(r||(r=a||!!o),l.kind==="line"||l.kind==="static"){let d=s.contextRomanized||o;this.setLineText(s,e&&d?d:l.text),e&&i&&!d&&a&&!s.fetchPending&&(s.fetchPending=!0,n.push(s));continue}a?e&&s.contextRomanized?this.applyContextRomanization(s):(this.restoreOriginalWords(s),e&&i&&!s.contextRomanized&&!s.fetchPending&&(s.fetchPending=!0,n.push(s))):this.applyWordRomanization(s,e)}this.hasRomanizationValue=r,this.options.onRomanizationAvailability?.(r),n.length>0&&this.fetchContextRomanization(n)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(e,i){let n=e.kind!=="static",r=this.options.variant==="sidebar"&&(e.kind==="line"||e.kind==="syllable"),s=document.createElement(r?"button":"div");s instanceof HTMLButtonElement&&(s.type="button"),s.className="liquid-lyrics-line";let l={index:i,el:s,line:e,start:n?e.range.start:Number.POSITIVE_INFINITY,end:n?e.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:f,interludeVis:f,interludeY:f,interludeScale:f,displayText:e.kind==="interlude"?"":e.text,displayKey:"orig",contextRomanized:"",fetchPending:!1,wrapper:null,height:0,rowOffset:f};if(e.kind==="interlude"){s.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&s.setAttribute("aria-hidden","true");for(let a=0;a<3;a++){let o=document.createElement("span");o.className="ll-interlude-dot",s.appendChild(o),l.dots.push(o),l.dotLift.push(0)}}else if(e.kind==="static")s.classList.add("liquid-lyrics-static"),s.textContent=e.text;else if(e.kind==="line")s.textContent=e.text;else{s.classList.add("ll-syllable-line");let a=document.createElement("div");a.className="ll-vocal-line ll-lead-vocal",s.appendChild(a),l.leadEl=a;let o=this.buildWordSpans(a,e.lead.words,"");if(this.options.renderBackgrounds)for(let d of e.backgrounds){let c=document.createElement("div");c.className="ll-vocal-line ll-background-vocal",s.appendChild(c),l.bgWords.push(...this.buildWordSpans(c,d.words,"ll-bg-syllable"))}l.words=It(o,l.bgWords)}return l}buildWordSpans(e,i,n){let r=[];return i.forEach((s,l)=>{let a=document.createElement("span");a.className=n?`ll-syllable ${n}`:"ll-syllable",s.animateLetters&&a.classList.add("ll-long-syllable"),k(s.text)&&a.classList.add("ll-cjk-syllable"),l===i.length-1&&a.classList.add("LastWordInLine");let o=[];if(s.animateLetters){a.setAttribute("aria-label",s.text);for(let d of s.text){let c=document.createElement("span");c.className="ll-letter",c.textContent=d,a.appendChild(c),o.push(c)}}else a.textContent=s.text;e.appendChild(a),r.push({el:a,start:s.start,end:s.end,animateLetters:s.animateLetters,letters:o,state:"idle",gradientUnit:f,lastLift:0,letterFill:null,letterLift:null})}),r}syncClock(){let e=this.enabled&&this.hasTimeline&&this.records.length>0;e&&!this.unsubscribeClock?this.unsubscribeClock=fe(this.tick):e||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(K(),performance.now()))}findActiveIndex(e){let i=this.records;if(i.length===0)return-1;let n=0,r=i.length-1,s=-1;for(;n<=r;){let o=n+r>>1;i[o].start<=e?(s=o,n=o+1):r=o-1}if(s<0)return-1;let l=Math.max(0,s-4);for(let o=s;o>=l;o--){let d=i[o];if(e>=d.start&&e<d.end)return o}if(this.activeIndex>=0&&this.activeIndex<i.length){let o=i[this.activeIndex];if(e>=o.start&&e<o.end+qt)return this.activeIndex}let a=i[s];return a.end<=e&&e-a.end<=qt?s:-1}applyPosition(e,i){let n=this.activeIndex,r=this.records;for(let s=0;s<r.length;s++){let l=r[s],a=l.state==="active";if(s===e){a||this.activateLine(l,i);continue}(e>=0?s<e:l.end<=i)?a&&l.line.kind!=="interlude"&&l.end>i?this.beginOutgoing(l):(l.state!=="past"||a)&&this.completeLine(l,a):(l.state!=="future"||a)&&this.resetLine(l)}if(e>=0&&!this.userScrolling){let s=n>=0?r[n]:null,l=r[e];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),s?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===e&&this.scrollToRecord(l)},Ki):this.scrollToRecord(l)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(e,i){e.state="active",e.outgoing=!1,e.progressUnit=f,e.interludeVis=f,e.interludeY=f,e.interludeScale=f;let n=e.el.classList;if(n.remove("past","future","ll-finishing","ll-outgoing"),n.add("active"),e.line.kind==="syllable"){e.dirty=!0;for(let r of e.words)this.syncWordState(r,i)}else e.line.kind==="interlude"&&(e.dirty=!0)}beginOutgoing(e){e.state="past",e.outgoing=!0;let i=e.el.classList;i.remove("active","future","ll-finishing"),i.add("past","ll-outgoing"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.outgoingLines.includes(e)||this.outgoingLines.push(e)}updateOutgoingLines(e){for(let i=this.outgoingLines.length-1;i>=0;i--){let n=this.outgoingLines[i];if(!n.outgoing||n.state!=="past"){this.outgoingLines.splice(i,1);continue}if(e>=n.end){this.finishOutgoing(n),this.outgoingLines.splice(i,1);continue}if(e<n.start){this.outgoingLines.splice(i,1),this.resetLine(n);continue}n.line.kind==="syllable"?this.updateWords(n,e):this.writeLineProgress(n,_e(n,e)*100)}}finishOutgoing(e){e.outgoing=!1;let i=e.el.classList;if(i.remove("ll-outgoing"),i.add("ll-finishing"),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let n of e.words)n.state!=="sung"&&this.setWordState(n,"sung")}}completeLine(e,i){e.state="past",e.outgoing=!1;let n=e.el.classList;if(n.remove("active","future","ll-outgoing"),n.add("past"),n.toggle("ll-finishing",i),e.glow&&(n.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="sung"&&this.setWordState(r,"sung");for(let r of e.dots)r.classList.add("lit"),Pt(r);e.dotLift.fill(0)}}resetLine(e){e.state="future",e.outgoing=!1;let i=e.el.classList;if(i.remove("active","past","ll-finishing","ll-outgoing"),i.add("future"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let n of e.words)n.state!=="future"&&this.setWordState(n,"future");for(let n of e.dots)n.classList.remove("lit"),Pt(n);e.dotLift.fill(0)}}clearLineInline(e){let i=e.el.style;e.progressUnit!==f&&(i.removeProperty("--line-progress"),e.progressUnit=f),e.interludeVis!==f&&(i.removeProperty("--interlude-visibility"),i.removeProperty("--interlude-y"),i.removeProperty("--interlude-scale"),e.interludeVis=f,e.interludeY=f,e.interludeScale=f)}updateActiveLine(e,i){let n=_e(e,i);if(e.line.kind==="interlude"){this.updateInterlude(e,n);return}let r=n>Yi;r!==e.glow&&(e.glow=r,e.el.classList.toggle("ll-glow",r)),e.line.kind==="syllable"?this.updateWords(e,i):this.writeLineProgress(e,n*100)}writeLineProgress(e,i){let n=Math.round(i*2)/2;n!==e.progressUnit&&(e.progressUnit=n,e.el.style.setProperty("--line-progress",String(n)))}updateWords(e,i){for(let n of e.words){let r=i<n.start?"future":i>=n.end?"sung":"singing";r!==n.state&&this.setWordState(n,r),r==="singing"&&this.updateSingingWord(n,i)}}syncWordState(e,i){let n=i<e.start?"future":i>=e.end?"sung":"singing";n!==e.state&&this.setWordState(e,n)}setWordState(e,i){e.state=i;let n=e.el.classList;n.toggle("singing",i==="singing"),n.toggle("sung",i==="sung"),n.toggle("future",i==="future"),i!=="singing"&&this.clearWordInline(e)}clearWordInline(e){let i=e.el.style;if(e.gradientUnit!==f&&(i.removeProperty("--syl-progress"),e.gradientUnit=f),e.lastLift!==0&&(i.transform="",e.lastLift=0),!(!e.letterFill||!e.letterLift))for(let n=0;n<e.letters.length;n++){let r=e.letters[n];e.letterFill[n]!==f&&(r.style.removeProperty("--letter-progress"),e.letterFill[n]=f),e.letterLift[n]!==0&&(r.style.transform="",e.letterLift[n]=0)}}updateSingingWord(e,i){let n=S((i-e.start)/Math.max(1,e.end-e.start));if(e.animateLetters){this.updateLetters(e,n);return}let r=Math.round(-20+120*n);r!==e.gradientUnit&&(e.gradientUnit=r,e.el.style.setProperty("--syl-progress",String(r)));let s=Math.sin(n*Math.PI);Math.abs(s-e.lastLift)>.01&&(e.lastLift=s,e.el.style.transform=`translate3d(0, ${(-5*s).toFixed(2)}px, 0) scale(${(1+.018*s).toFixed(4)})`)}updateLetters(e,i){let n=e.letters,r=n.length;if(r===0)return;(!e.letterFill||!e.letterLift)&&(e.letterFill=new Array(r).fill(f),e.letterLift=new Array(r).fill(0));let s=Math.max(.16,1.8/r),l=i+s*W(.7,1,i);for(let a=0;a<r;a++){let o=n[a],d=Math.round(-20+120*S(i*r-a)),c=e.letterFill[a];(Math.abs(d-c)>=4||d!==c&&(d===100||d===-20))&&(e.letterFill[a]=d,o.style.setProperty("--letter-progress",String(d)));let p=1-S(Math.abs(l-(a+.5)/r)/s),u=p<=0?0:W(0,1,p);Math.abs(u-e.letterLift[a])>.008&&(e.letterLift[a]=u,o.style.transform=u===0?"":`translate3d(0, ${(-5.5*u).toFixed(2)}px, 0) scale(${(1+.02*u).toFixed(4)})`)}}updateInterlude(e,i){let n=W(0,.22,i),r=1-W(.99,1,i),s=Math.round(Math.min(n,r)*200)/200,l=Math.round(-24*W(.76,1,i)*10)/10,a=Math.round((.72+.28*n)*500)/500,o=e.el.style;s!==e.interludeVis&&(e.interludeVis=s,o.setProperty("--interlude-visibility",String(s))),l!==e.interludeY&&(e.interludeY=l,o.setProperty("--interlude-y",`${l}px`)),a!==e.interludeScale&&(e.interludeScale=a,o.setProperty("--interlude-scale",String(a)));let d=this.options.dotLiftPx;for(let c=0;c<e.dots.length;c++){let p=e.dots[c],u=c/3,m=(c+1)/3;p.classList.toggle("lit",i>=u),p.style.opacity=i>=.99?String(r):"";let g=0;i>=u&&i<m&&(g=Math.sin((i-u)/(m-u)*Math.PI)*d),(Math.abs(g-e.dotLift[c])>.1||g===0&&e.dotLift[c]!==0)&&(e.dotLift[c]=g,p.style.transform=g===0?"":`translateY(${(-g).toFixed(2)}px)`)}}scrollToRecord(e){let i=this.scroller,n,r;if(this.virtual)this.mountAround(e.index),n=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),r=this.virtual.heights[e.index]??e.el.offsetHeight;else{if(!e.el.isConnected)return;n=Ji(e.el,i),r=e.el.offsetHeight}i.scrollTo({top:Math.max(0,n-i.clientHeight/2+r/2),behavior:"smooth"})}setLineText(e,i){e.displayText!==i&&(e.displayText=i,e.el.textContent=i,this.refreshVirtualHeight(e))}applyWordRomanization(e,i){if(e.line.kind!=="syllable")return;let n=!1,r=e.line.lead.words.map(s=>{let l=i?B(s.romanizedText):"";return!l||l===s.text?s:(n=!0,{...s,text:l,animateLetters:me(l,s.start,s.end)})});this.rebuildLead(e,r,n?"roman-words":"orig",!1)}applyContextRomanization(e){if(e.line.kind!=="syllable"||!e.contextRomanized)return;let i=vt(e.contextRomanized,e.line.range,e.line.lead.words);if(i.length===0){this.restoreOriginalWords(e);return}this.rebuildLead(e,i,`ctx:${e.contextRomanized}`,!0)}restoreOriginalWords(e){e.line.kind==="syllable"&&this.rebuildLead(e,e.line.lead.words,"orig",!1)}rebuildLead(e,i,n,r){if(e.displayKey===n||!e.leadEl)return;e.displayKey=n,e.el.classList.toggle("ll-context-romanized",r),e.leadEl.replaceChildren();let s=this.buildWordSpans(e.leadEl,i,"");if(e.words=It(s,e.bgWords),e.displayText=i.map(l=>l.text).join(" ").trim(),e.state==="active"){e.dirty=!0;let l=K();for(let a of e.words)this.syncWordState(a,l)}else if(e.state==="past")for(let l of s)this.setWordState(l,"sung");this.refreshVirtualHeight(e)}async fetchContextRomanization(e){let i=this.generation,n=new Map;for(let r of e){let s=xt(r.line.kind==="interlude"?"":r.line.text),l=n.get(s);l?l.push(r):n.set(s,[r])}for(let[r,s]of n){let l=s.map(o=>o.line.kind==="interlude"?"":o.line.text),a=[];try{a=s.length>1?await ut(l,r):[await Ce(l[0],r)]}catch{}if(i!==this.generation||(s.forEach((o,d)=>{o.fetchPending=!1;let c=B(a[d]?.roman);c&&(o.contextRomanized=c,this.useRoman&&(o.line.kind==="syllable"?this.applyContextRomanization(o):o.line.kind!=="interlude"&&this.setLineText(o,c)))}),await new Promise(o=>requestAnimationFrame(()=>o())),i!==this.generation))return}}initVirtualizer(){let e=document.createElement("div");e.className="ll-syllable-virtual-space",this.container.appendChild(e),this.container.classList.add("ll-syllable-virtualized");let i=new Map;this.records.forEach(r=>{let s=document.createElement("div");s.className="ll-syllable-virtual-row",s.appendChild(r.el),r.wrapper=s,r.height=Ct(r),i.set(r.el,r.index)});let n={space:e,heights:this.records.map(r=>r.height),offsets:[],mounted:new Set,lineToIndex:i,resizeObserver:new ResizeObserver(r=>{let s=!1;for(let l of r){let a=i.get(l.target);if(a===void 0)continue;let o=Math.max(1,l.borderBoxSize?.[0]?.blockSize??l.target.offsetHeight);Math.abs((n.heights[a]??0)-o)<He||(n.heights[a]=o,s=!0)}s&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};n.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",n.onScroll,{passive:!0}),this.virtual=n,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let e=this.virtual;e&&(e.raf!==null&&cancelAnimationFrame(e.raf),this.scroller.removeEventListener("scroll",e.onScroll),e.resizeObserver.disconnect(),e.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let e=this.virtual;!e||e.raf!==null||(e.raf=requestAnimationFrame(()=>{e.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let e=this.virtual;if(!e)return;let i=this.scroller.scrollTop-e.space.offsetTop,n=i-zt,r=i+this.scroller.clientHeight+zt,s=new Set;for(let l=0;l<this.records.length;l++){let a=e.offsets[l]??0;a+(e.heights[l]??0)>=n&&a<=r&&s.add(l)}if(this.activeIndex>=0){let l=Math.max(0,this.activeIndex-3),a=Math.min(this.records.length-1,this.activeIndex+3);for(let o=l;o<=a;o++)s.add(o)}for(let l of e.mounted)!s.has(l)&&l!==this.activeIndex&&this.unmountVirtualLine(l);for(let l of s)this.mountVirtualLine(l);this.layoutMountedRows()}mountAround(e){if(!this.virtual)return;let i=Math.max(0,e-1),n=Math.min(this.records.length-1,e+1),r=!1;for(let s=i;s<=n;s++)r=this.mountVirtualLine(s)||r;r&&this.layoutMountedRows()}mountVirtualLine(e){let i=this.virtual,n=this.records[e];if(!i||!n?.wrapper||i.mounted.has(e))return!1;i.space.appendChild(n.wrapper),i.mounted.add(e),n.rowOffset=f,i.resizeObserver.observe(n.el);let r=Math.max(1,n.el.offsetHeight);return Math.abs((i.heights[e]??0)-r)>=He&&(i.heights[e]=r,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(e){let i=this.virtual,n=this.records[e];!i||!n?.wrapper||!i.mounted.has(e)||(i.resizeObserver.unobserve(n.el),n.wrapper.parentElement===i.space&&i.space.removeChild(n.wrapper),i.mounted.delete(e))}recomputeVirtualOffsets(){let e=this.virtual;if(!e)return;let i=0;e.offsets=e.heights.map(n=>{let r=i;return i+=Math.max(1,n)+Zi,r}),e.space.style.height=`${Math.max(1,i)}px`}layoutMountedRows(){let e=this.virtual;if(e)for(let i of e.mounted){let n=this.records[i];if(!n?.wrapper)continue;let r=Math.round(e.offsets[i]??0);r!==n.rowOffset&&(n.rowOffset=r,n.wrapper.style.transform=`translate3d(0, ${r}px, 0)`)}}refreshVirtualHeight(e){let i=this.virtual;if(!i)return;let n=e.el.isConnected?Math.max(1,e.el.offsetHeight):Ct(e);Math.abs((i.heights[e.index]??0)-n)<He||(i.heights[e.index]=n,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}};function It(t,e){return e.length===0?t:[...t,...e].sort((i,n)=>i.start-n.start)}function Pt(t){t.style.transform&&(t.style.transform=""),t.style.opacity&&(t.style.opacity="")}function Ct(t){if(t.line.kind==="interlude")return 54;let e=Math.max(1,t.displayText.length),i=Math.max(1,Math.ceil(e/42)),n=t.line.kind==="syllable"?t.line.backgrounds.length:0;return 18+i*45+n*24}function Ji(t,e){let i=0,n=t;for(;n&&n!==e;){i+=n.offsetTop;let r=n.offsetParent;n=r instanceof HTMLElement&&e.contains(r)?r:null}return i}var L="liquid-lyrics-panel",Ft="liquid-lyrics-song-card-visible",J="liquify-bg-mode",ne="liquid-lyrics:romanization",Qi="https://github.com/NMWplays/Liquid-Lyrics",Xi="https://discord.gg/xGUq5mhWKA",en=500,v=null,te=null,ge=null,Oe=0,At="",_t="",he=-1,Be=-1,Nt=!1,Ht=!1,Ot=!1,ie=!0,U,I=null;function $(){let t=document.getElementById(L);if(t)return t;let e=document.createElement("div");e.id=L,e.className="liquid-lyrics-panel";let i=document.createElement("div");i.className="liquid-lyrics-glass-bg";let n=rn(),r=sn(),s=document.createElement("div");s.className="liquid-lyrics-header";let l=document.createElement("span");l.className="liquid-lyrics-title",l.textContent="Liquid Lyrics";let a=document.createElement("div");a.className="ll-header-actions",a.append(Bt("ll-header-btn ll-github-btn",tn,"Star on GitHub",Qi),Bt("ll-header-btn ll-discord-btn",nn,"Join the Discord",Xi)),s.append(l,a);let o=document.createElement("div");o.className="liquid-lyrics-view";let d=ln(),c=document.createElement("div");c.className="liquid-lyrics-content",o.append(d,c);let p=an();return e.append(n,i,r,s,o,p),Gt(e),j(e),(document.querySelector(".Root__main-view")??document.body).appendChild(e),v=new D({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:m=>{e.classList.toggle("ll-has-romanization",m),T()}}),N(),T(),Nt||(Nt=!0,document.addEventListener("fullscreenchange",Sn)),Ot||(Ot=!0,window.addEventListener(ne,()=>{v?.setRomanized(y(),h()),T()})),xn(),e}function be(){let t=$();ie=!0,t.classList.add("visible"),N(),T(),v?.setEnabled(!0),jt();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let n=i;n.id===L||!n.style||(n.dataset.liquidHidden===void 0&&(n.dataset.liquidHidden=`${n.style.opacity}|${n.style.pointerEvents}`),n.style.opacity="0",n.style.pointerEvents="none")}}function ve(){let t=document.getElementById(L);if(!t)return;t.classList.remove("visible"),v?.setEnabled(!1),$t(),De(t,!1),xe();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let n=i;if(n.id===L||n.dataset.liquidHidden===void 0)continue;let[r="",s=""]=n.dataset.liquidHidden.split("|");n.style.opacity=r,n.style.pointerEvents=s,delete n.dataset.liquidHidden}}function Vt(){h()?ve():be()}function h(){return document.getElementById(L)?.classList.contains("visible")??!1}function Dt(t=h()){let e=$();ie=t,t?be():(e.classList.add("visible"),N(),T(),v?.setEnabled(!0),jt()),De(e,!0),A(),T(),xe(),j(e)}function We(t){$(),v&&(v.setLyrics(t),v.setRomanized(y(),y()),v.setEnabled(h()),N())}function re(t){let e=$();if(!v)return;v.setLyrics(null),N();let i=document.createElement("div");i.className="liquid-lyrics-empty",i.textContent=t,v.container.appendChild(i),e.classList.remove("ll-has-romanization"),T()}var Ut={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>'},tn='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',nn='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function Bt(t,e,i,n){let r=document.createElement("button");return r.type="button",r.className=t,r.setAttribute("aria-label",i),r.innerHTML=e,r.addEventListener("click",s=>{s.stopPropagation(),window.open(n,"_blank")}),x(r,i),r}function rn(){let t=document.createElement("div");t.className="liquid-lyrics-fullscreen-bg";for(let e=0;e<2;e++){let i=document.createElement("div");i.className="ll-fullscreen-bg-tile",t.appendChild(i)}return t}function sn(){let t=document.createElement("div");return t.className="liquid-lyrics-transparent-controls",t.setAttribute("aria-hidden","true"),t}function ln(){let t=document.createElement("aside");t.className="liquid-lyrics-song-card";let e=document.createElement("div");e.className="ll-song-card-cover-wrap";let i=document.createElement("img");i.className="ll-song-card-cover",i.alt="",i.decoding="async",i.loading="lazy",e.appendChild(i);let n=document.createElement("div");n.className="ll-song-card-controls",n.append(P("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>Q(["toggleShuffle"])),P("ll-song-card-btn","previous","Previous",()=>Q(["back","previous","skipToPrevious"])),P("ll-song-card-btn ll-song-card-play","play","Play",()=>{Q(["togglePlay"]),window.setTimeout(N,60)}),P("ll-song-card-btn","next","Next",()=>Q(["next","skipToNext"])),P("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>Q(["toggleRepeat"])));let r=document.createElement("div");r.className="playback-bar ll-song-card-progress",r.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let s=document.createElement("div");s.className="ll-song-card-info";let l=document.createElement("div");l.className="ll-song-card-title";let a=document.createElement("button");a.type="button",a.className="ll-song-card-link ll-song-card-album",x(a,"Open album");let o=document.createElement("button");return o.type="button",o.className="ll-song-card-link ll-song-card-artist",x(o,"Open artist"),s.append(l,a,o),t.append(e,n,r,s),te={card:t,cover:i,title:l,album:a,artist:o,playButton:t.querySelector(".ll-song-card-play"),shuffleButton:t.querySelector(".ll-song-card-shuffle"),repeatButton:t.querySelector(".ll-song-card-repeat"),progressTrack:r.querySelector(".ll-card-progress-track"),progressFill:r.querySelector(".ll-card-progress-fill"),progressThumb:r.querySelector(".ll-card-progress-thumb"),currentTime:r.querySelector(".ll-card-current"),durationTime:r.querySelector(".ll-card-duration")},dn(te),t}function an(){let t=document.createElement("div");return t.className="liquid-lyrics-control-pill",t.append(P("ll-control-btn ll-card-toggle","cover","Song card",wn),P("ll-control-btn ll-roman-toggle","roman","Romanization",Tn),P("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",En)),t}function P(t,e,i,n){let r=document.createElement("button");return r.type="button",r.className=t,r.dataset.icon=e,r.setAttribute("aria-label",i),r.innerHTML=Ut[e],r.addEventListener("click",s=>{s.stopPropagation(),n()}),x(r,i),r}function on(t,e){!t||t.dataset.icon===e||(t.dataset.icon=e,t.innerHTML=Ut[e])}function N(){let t=te;if(!t)return;let e=un();e.cover?(t.cover.src!==e.cover&&(t.cover.src=e.cover),t.card.classList.remove("ll-no-cover")):(t.cover.removeAttribute("src"),t.card.classList.add("ll-no-cover")),Ln(e.cover),t.title.textContent=e.title,t.album.textContent=e.album,t.album.disabled=!e.albumUri,t.album.onclick=()=>Wt(e.albumUri),t.artist.textContent=e.artist,t.artist.disabled=!e.artistUri,t.artist.onclick=()=>Wt(e.artistUri),se(),le()}function se(){let t=te;if(!t)return;let e=Ne(),i=e?"Pause":"Play";on(t.playButton,e?"pause":"play"),t.playButton.setAttribute("aria-label",i),t.playButton.dataset.tooltip=i,ee(t.shuffleButton,bn());let n=vn();ee(t.repeatButton,n!=="off"),t.repeatButton.classList.toggle("ll-repeat-one",n==="track");let r=n==="track"?"Repeat one":n==="context"?"Repeat all":"Repeat";t.repeatButton.setAttribute("aria-label",r),t.repeatButton.dataset.tooltip=r}function jt(){ge||(Oe=0,he=-1,Be=-1,ge=fe(cn),se(),le())}function $t(){ge?.(),ge=null}function cn(t,e){le(t),e-Oe>=en&&(Oe=e,se())}function le(t=Yt()){let e=te;if(!e)return;let i=V(),n=i>0?ye(t/i):0;if(!e.progressTrack.classList.contains("ll-previewing")&&Math.abs(n-he)>2e-5){he=n,e.progressFill.style.transform=`scaleX(${n.toFixed(5)})`,e.progressThumb.style.left=`${(n*100).toFixed(3)}%`;let a=Math.round(n*100);a!==Be&&(Be=a,e.progressTrack.setAttribute("aria-valuenow",String(a)),e.progressTrack.setAttribute("aria-valuetext",`${X(t)} of ${X(i)}`))}let s=X(t);s!==At&&(At=s,e.currentTime.textContent=s);let l=X(i);l!==_t&&(_t=l,e.durationTime.textContent=l)}function Yt(){return kn(Spicetify.Player?.getProgress?.(),0)}function dn(t){let e=t.progressTrack,i=e.querySelector(".ll-card-preview-time"),n=0,r=0,s=c=>{let p=e.getBoundingClientRect();return ye((c.clientX-p.left)/Math.max(1,p.width))},l=c=>{let p=V();p<=0||(e.classList.add("ll-previewing"),i&&(i.textContent=X(p*c),i.style.left=`${c*100}%`),t.progressFill.style.transform=`scaleX(${c.toFixed(4)})`,t.progressThumb.style.left=`${(c*100).toFixed(2)}%`)},a=c=>(r=c,n||(n=requestAnimationFrame(()=>{n=0,l(r)})),c),o=()=>{e.dataset.dragging!=="true"&&(e.classList.remove("ll-previewing"),n&&(cancelAnimationFrame(n),n=0),he=-1,le())},d=c=>{let p=V();if(p<=0)return;let u=a(s(c));F(p*u)};e.addEventListener("pointerenter",c=>a(s(c))),e.addEventListener("pointermove",c=>a(s(c))),e.addEventListener("pointerleave",o),e.addEventListener("blur",o),e.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),e.dataset.dragging="true",e.setPointerCapture?.(c.pointerId),d(c);let p=m=>d(m),u=m=>{d(m),delete e.dataset.dragging,o(),e.releasePointerCapture?.(c.pointerId),window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",u)};window.addEventListener("pointermove",p),window.addEventListener("pointerup",u,{once:!0})}),e.addEventListener("keydown",c=>{let p=V();if(p<=0)return;let u=Yt(),m=c.shiftKey?15e3:5e3;c.key==="ArrowLeft"?(c.preventDefault(),F(Math.max(0,u-m))):c.key==="ArrowRight"&&(c.preventDefault(),F(Math.min(p,u+m)))})}function un(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},i=Array.isArray(t?.artists)?t.artists.map(r=>r?.name).filter(Boolean).join(", "):"",n=Array.isArray(t?.artists)?t.artists.find(r=>r?.uri):null;return{title:t?.name||e.title||e.track_name||"Unknown track",artist:i||e.artist_name||e.artist||e.album_artist_name||"Unknown artist",album:t?.album?.name||e.album_title||e.album_name||"Unknown album",cover:pn(t,e),artistUri:n?.uri||hn(e.artist_uri||e.artist_uris||""),albumUri:t?.album?.uri||e.album_uri||""}}function pn(t,e){let i=[e.image_xlarge_url,e.image_large_url,e.image_url,e.album_image_url,e.cover_url,t?.album?.images?.[0]?.url,t?.images?.[0]?.url];for(let n of i){let r=mn(String(n??""));if(r)return fn(r)}return gn()}function mn(t){return t?t.startsWith("spotify:image:")?t.replace("spotify:image:","https://i.scdn.co/image/"):t:""}function fn(t){return t.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function gn(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function hn(t){return String(t||"").split(",")[0]?.split(";")[0]?.trim()||""}function Wt(t){let e=yn(t);if(!e)return;let i=Spicetify.Platform?.History;typeof i?.push=="function"&&(i.push(e),ve())}function yn(t){let e=String(t||"").split(":");if(e.length<3||e[0]!=="spotify")return"";let i=e[1],n=e[2];return!n||!["album","artist","track","playlist"].includes(i)?"":`/${i}/${n}`}function bn(){let t=Spicetify.Player;if(typeof t?.getShuffle=="function")return!!t.getShuffle();let e=t?.data??{};return!!(e.shuffle??e.shuffling??e.options?.shuffling??e.playback_options?.shuffling??e.context?.metadata?.shuffle)}function vn(){let t=Spicetify.Player,e=t?.data??{},i=typeof t?.getRepeat=="function"?t.getRepeat():e.repeat??e.repeatMode??e.repeat_mode??e.options?.repeat??e.playback_options?.repeat??e.context?.metadata?.repeat;if(e.options?.repeatingTrack||e.playback_options?.repeating_track)return"track";if(e.options?.repeatingContext||e.playback_options?.repeating_context)return"context";if(typeof i=="number")return i===2?"track":i===1?"context":"off";let n=String(i??"").toLowerCase();return n.includes("track")||n.includes("song")||n==="one"?"track":n.includes("context")||n.includes("all")||n==="playlist"||n==="on"?"context":"off"}function xn(){Ht||(Ht=!0,["songchange","onplaypause","onqueuechange"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>{se(),le()})}catch{}}))}function Q(t){let e=Spicetify.Player;for(let i of t)if(typeof e?.[i]=="function"){e[i](),window.setTimeout(N,80),window.setTimeout(se,180);return}}function Ln(t){let i=document.getElementById(L)?.querySelector(".liquid-lyrics-fullscreen-bg");i&&(i.classList.toggle("ll-has-bg",!!t),i.querySelectorAll(".ll-fullscreen-bg-tile").forEach(n=>{let r=t?`url("${t}")`:"";n.style.backgroundImage!==r&&(n.style.backgroundImage=r)}))}function X(t){let e=Math.max(0,Math.floor(t/1e3)),i=Math.floor(e/60),n=e%60;return`${i}:${String(n).padStart(2,"0")}`}function wn(){localStorage.setItem(Ft,String(!Fe())),T()}function Tn(){ce(!y()),v?.setRomanized(y(),!0),T(),window.dispatchEvent(new Event(ne))}function En(){let t=document.getElementById(L);if(!t)return;let e=!Ve(t);e&&(ie=!0),De(t,e),A(),T(),xe(),j(t)}function Gt(t){t.classList.toggle("ll-song-card-hidden",!Fe()),t.classList.toggle("ll-romanized",y())}function T(){let t=document.getElementById(L);if(!t)return;Gt(t),ee(t.querySelector(".ll-card-toggle"),Fe()),ee(t.querySelector(".ll-roman-toggle"),y()),ee(t.querySelector(".ll-fullscreen-toggle"),Ve(t));let e=t.querySelector(".ll-roman-toggle"),i=t.classList.contains("ll-has-romanization");e&&(e.hidden=!i,e.disabled=!i,i||A())}function ee(t,e){t&&(t.classList.toggle("active",e),t.setAttribute("aria-pressed",String(e)))}function Fe(){return localStorage.getItem(Ft)!=="false"}function Sn(){A();let t=document.getElementById(L);t&&document.fullscreenElement!==t&&t.classList.contains("ll-native-fullscreen")&&t.classList.remove("ll-native-fullscreen"),T(),xe(),t&&j(t)}function Ve(t){return t.classList.contains("ll-fullscreen-mode")||document.fullscreenElement===t}function De(t,e){if(e){!I&&t.parentNode&&(I=document.createComment("liquid-lyrics-fullscreen-placeholder"),t.parentNode.insertBefore(I,t));let n=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==t?document.fullscreenElement:document.body;t.parentElement!==n&&n.appendChild(t),t.classList.add("ll-fullscreen-mode"),j(t);return}let i=!ie&&t.classList.contains("ll-fullscreen-mode");t.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===t&&document.exitFullscreen?.(),I?.parentNode&&(I.parentNode.insertBefore(t,I),I.remove()),I=null,j(t),i&&(t.classList.remove("visible"),v?.setEnabled(!1),$t(),ie=!0)}function xe(){let t=document.getElementById(L);if(!!(t&&Ve(t))){U===void 0&&(U=localStorage.getItem(J)),localStorage.getItem(J)!=="animated"&&(localStorage.setItem(J,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}U!==void 0&&(U===null?localStorage.removeItem(J):localStorage.setItem(J,U),U=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function j(t=document.getElementById(L)){if(!t)return;let e=t.querySelector(".liquid-lyrics-transparent-controls");if(!e)return;let i=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),n=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);e.style.setProperty("--ll-transparent-controls-width",`${ye(i,50,400)}px`),e.style.setProperty("--ll-transparent-controls-height",`${ye(n,20,300)}px`)}function kn(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function ye(t,e=0,i=1){return Math.min(i,Math.max(e,t))}var Le=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var Ue="liquid-lyrics-button";function Kt(){let t=document.getElementById(Ue);if(t)return t;let e=document.querySelector(".main-nowPlayingBar-extraControls");if(!e)return null;let i=document.createElement("button");return i.id=Ue,i.className="liquid-lyrics-button",i.setAttribute("aria-label","Liquid Lyrics"),i.innerHTML=Le,x(i,"Liquid Lyrics"),i.addEventListener("click",()=>{Vt(),i.classList.toggle("active",h())}),e.prepend(i),i}function Zt(){let t=document.getElementById(Ue);t&&t.classList.toggle("active",h())}var H="liquid-lyrics-sidebar-card",ti="liquid-lyrics-sidebar-card-collapsed",Rn=300,qn=2e3,je={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>'},R=null,Te="Loading lyrics...",Y=!1,ii=!1,$e=null,Ye=!1,Jt=null,M=null,Qt=0,Ge=!1,Xt=[];function Se(){let t=document.getElementById(H);if(t)return O(t),t;let e=document.createElement("section");e.id=H,e.className="liquid-lyrics-sidebar-card",e.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${Le}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${je.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${je.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${je.open}</button>
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
  `;let i=e.querySelector(".ll-sidebar-header-main"),n=e.querySelector(".ll-sidebar-collapse-btn"),r=e.querySelector(".ll-sidebar-roman-toggle"),s=e.querySelector(".ll-sidebar-fullscreen-toggle"),l=e.querySelector(".ll-sidebar-open-toggle"),a=()=>{let c=!e.classList.contains("collapsed");localStorage.setItem(ti,String(c)),ei(e),E()};i?.addEventListener("click",a),n?.addEventListener("click",a),r?.addEventListener("click",c=>{c.stopPropagation(),ce(!y()),Ee(!0),window.dispatchEvent(new Event(ne))}),s?.addEventListener("click",c=>{c.stopPropagation(),Dt(!1)}),l?.addEventListener("click",c=>{c.stopPropagation(),be()}),n&&x(n,"Toggle mini lyrics"),r&&x(r,"Romanization"),s&&x(s,"Fullscreen"),l&&x(l,"Open Liquid Lyrics");let o=e.querySelector(".ll-sidebar-mini-viewport"),d=e.querySelector(".ll-sidebar-mini-lines");return R=new D({container:d,scroller:o,variant:"sidebar",dotLiftPx:10,onRomanizationAvailability:c=>{Y=c,ae(e)}}),window.addEventListener(ne,()=>{Ee(!h()),ae(e)}),ei(e),O(e),In(),Cn(),Je(Te),E(),e}function Ke(t,e="No lyrics available"){let i=Se();Te=t?"Live lyrics":e,Y=!1,R?.setLyrics(t),!t||!R?.hasLyrics?Je(Te):Ee(!h()),ae(i),E()}function ni(t){Te=t,Y=!1;let e=document.getElementById(H);e&&(R?.setLyrics(null),Je(t),ae(e),E())}function E(){let t=document.getElementById(H);if(!t)return;O(t);let e=h();t.classList.toggle("ll-hidden",e),t.dataset.romanized=String(y()),ae(t);let i=t.classList.contains("collapsed"),n=!e&&!i&&t.isConnected;R?.setEnabled(n),n&&y()&&!ii&&Ee(!0)}function Ze(){O()}function Ee(t){R&&(R.setRomanized(y(),t),ii=t||!y())}function Je(t){if(!R)return;let e=document.createElement("div");e.className="ll-sidebar-mini-empty",e.textContent=t,R.container.replaceChildren(e)}function ae(t){let e=t.querySelector(".ll-sidebar-roman-toggle");if(!e)return;let i=Y&&y();e.hidden=!Y,e.disabled=!Y,e.classList.toggle("active",i),e.setAttribute("aria-pressed",String(i))}function ei(t){let e=localStorage.getItem(ti)==="true";t.classList.toggle("collapsed",e),t.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!e))}function O(t=document.getElementById(H)){if(!t)return!1;let e=zn();return e?t.parentElement!==e||e.lastElementChild!==t?(e.appendChild(t),!0):!1:(t.parentElement?.classList.contains("Root__right-sidebar")&&t.remove(),!1)}function zn(){if(M?.isConnected)return M;M=null;let t=document.querySelector(".Root__right-sidebar"),e=t?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||t?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||t?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(e)return M=e,e;let i=performance.now();return i-Qt>=qn&&(Qt=i,M=we(["nowplayingview","nowplayingwidget"],t??document)||we(["nowplaying","widget"],t??document)||we(["nowplayingview","nowplayinggrid"],t??document)||we(["nowplaying","grid"],t??document)),M}function we(t,e=document){let i=t.map(n=>n.toLowerCase());for(let n of Array.from(e.querySelectorAll("*"))){let r=(n.getAttribute("class")||"").toLowerCase();if(i.every(s=>r.includes(s)))return n}return null}function In(){$e||($e=new MutationObserver(()=>{Pn()}),$e.observe(document.body,{childList:!0,subtree:!0}),Qe())}function Pn(){Ye||(Ye=!0,setTimeout(()=>{Ye=!1,Qe();let t=document.getElementById(H);t&&(t.isConnected&&M?.isConnected&&t.parentElement===M||O(t)&&E())},Rn))}function Cn(){Jt||(Jt=setInterval(()=>{Qe(),O()&&E()},1e3))}function Qe(){if(!!document.querySelector(".Root__cinema-view")){Ge=!0;return}Ge&&(Ge=!1,An())}function An(){Xt.forEach(t=>clearTimeout(t)),Xt=[80,260,620,1100].map(t=>setTimeout(()=>{let e=document.getElementById(H)??Se();M=null,O(e),E()},t))}var ri=`\uFEFF/* ==========================================================================
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

/* Width of the song-card column. Registered as a <length> so toggling the
   card animates smoothly \u2014 raw grid-template-columns with minmax() would
   jump discretely instead of interpolating. */
@property --ll-card-col {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
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
  --ll-card-col: clamp(220px, 28vw, 360px);
}

/* The open panel overlays the main view instead of collapsing it; siblings
   are faded to opacity 0 (JS) so Spotify keeps their layout and scroll state
   and no descendant (e.g. sticky playlist headers) can punch through. */
.Root__main-view:has(> .liquid-lyrics-panel) {
  position: relative;
}

.liquid-lyrics-panel.visible {
  display: flex;
  position: absolute;
  inset: 0;
  z-index: 100;
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

/* GitHub star / Discord support links, top right of the header. */
.ll-header-actions {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  pointer-events: auto;
}

.ll-header-btn {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  cursor: pointer;
  transition:
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),
    box-shadow 280ms ease,
    color 180ms ease,
    background 220ms ease !important;
}

.ll-header-btn svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ll-discord-btn svg {
  fill: currentColor;
  stroke: none;
}

.ll-header-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  transform: translate3d(0, -1px, 0) scale(1.04);
}

.ll-github-btn:hover {
  color: #ffd75e;
}

.ll-github-btn:hover svg {
  fill: currentColor;
}

.ll-discord-btn:hover {
  color: #8ea1ff;
}

.liquid-lyrics-view {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: var(--ll-card-col) minmax(360px, 1fr);
  align-items: center;
  justify-content: stretch;
  gap: clamp(22px, 3.8vw, 64px);
  padding: 86px clamp(24px, 5vw, 96px) 56px;
  transition:
    --ll-card-col 520ms cubic-bezier(0.16, 1, 0.3, 1),
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
  /* Springy press feedback; !important so theme styles cannot flatten it. */
  transition:
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),
    box-shadow 280ms ease,
    color 180ms ease,
    background 220ms ease !important;
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

.ll-song-card-btn:active,
.ll-control-btn:active,
.ll-header-btn:active {
  transform: scale(0.95) !important;
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

/* Fill is scaled (compositor-only) instead of resized; JS writes the
   interpolated progress every frame, so no transition is needed. */
.ll-card-progress-fill {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.92);
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
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
  gap: 0;
}

.ll-song-card-hidden .liquid-lyrics-song-card {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate3d(-22px, 0, 0) scale(0.96);
  transition:
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    visibility 420ms step-end,
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
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

/* A line whose true end overlaps the next one: it keeps singing along, so it
   holds near-active presence \u2014 almost full opacity (the sung fill must stay
   white) and only one gentle scale step below active. The drop to the dim
   past look happens once it actually finishes. */
.liquid-lyrics-line.past.ll-outgoing {
  opacity: 0.92;
  transform: translate3d(0, -1px, 0) scale(1.02);
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

/* While singing, JS writes the target every frame; the short linear
   transition low-passes it into the soft, floaty bounce. */
.ll-syllable.singing {
  will-change: transform;
  transition:
    transform 120ms linear,
    filter 180ms ease;
}

.ll-syllable.sung {
  --syl-progress: 100;
}

.ll-syllable.future {
  --syl-progress: -20;
}

/* Untouched words in finished/upcoming lines rest at their end states.
   Outgoing lines are excluded: they are already "past" visually but their
   words keep singing to their true end. */
.ll-syllable-line.past:not(.ll-outgoing) .ll-syllable {
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

/* Letters follow the JS-driven wave through a smoothing transition, so the
   lift eases in right at word start and never moves harshly. */
.ll-syllable.singing .ll-letter {
  will-change: transform;
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-syllable.sung .ll-letter {
  --letter-progress: 100;
}

.ll-syllable.future .ll-letter {
  --letter-progress: -20;
}

.ll-syllable-line.past:not(.ll-outgoing) .ll-letter {
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

.liquid-lyrics-sidebar-card .liquid-lyrics-line:hover:not(.liquid-lyrics-interlude) {
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

.liquid-lyrics-sidebar-card .liquid-lyrics-line.past:not(.active):not(.liquid-lyrics-interlude):not(.ll-outgoing) {
  opacity: 0.4;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.past.ll-outgoing {
  opacity: 0.92;
  transform: translate3d(0, 0, 0) scale(1);
}

.liquid-lyrics-sidebar-card .liquid-lyrics-line.future:not(.active):not(.liquid-lyrics-interlude) {
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

/* The generic sidebar line sizing must not leak onto interludes: collapsed
   interludes stay at zero padding and their visibility is driven solely by
   the engine's --interlude-visibility, never by past/future dimming. */
.liquid-lyrics-sidebar-card .liquid-lyrics-interlude {
  gap: 10px;
  padding: 0;
  opacity: var(--interlude-visibility);
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

.liquid-lyrics-panel:fullscreen,
.liquid-lyrics-panel.ll-fullscreen-mode {
  --ll-card-col: 545px;
}

.liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
  grid-template-columns: var(--ll-card-col) minmax(540px, 1fr);
  gap: clamp(34px, 4.6vw, 104px);
  padding: 84px clamp(42px, 5vw, 104px) 58px;
}

.liquid-lyrics-panel:fullscreen:not(.ll-song-card-hidden) .liquid-lyrics-content,
.liquid-lyrics-panel.ll-fullscreen-mode:not(.ll-song-card-hidden) .liquid-lyrics-content {
  align-items: center;
  padding-left: clamp(22px, 3vw, 72px);
  padding-right: clamp(22px, 3vw, 72px);
}


.liquid-lyrics-panel:fullscreen .liquid-lyrics-line,
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {
  max-width: min(980px, 100%);
  font-size: 42px;
}

/* --- 10. Responsive -------------------------------------------------------------- */

@media (max-height: 820px) {
  .liquid-lyrics-panel,
  .liquid-lyrics-panel:fullscreen,
  .liquid-lyrics-panel.ll-fullscreen-mode {
    --ll-card-col: clamp(200px, 25vw, 310px);
  }

  .liquid-lyrics-view,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
    grid-template-columns: var(--ll-card-col) minmax(340px, 1fr);
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
  .liquid-lyrics-panel,
  .liquid-lyrics-panel:fullscreen,
  .liquid-lyrics-panel.ll-fullscreen-mode {
    --ll-card-col: clamp(180px, 23vw, 260px);
  }

  .liquid-lyrics-view,
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {
    grid-template-columns: var(--ll-card-col) minmax(320px, 1fr);
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

/* Kept last so hiding the song card always wins over the responsive and
   fullscreen column-width assignments above. */
.liquid-lyrics-panel.ll-song-card-hidden,
.liquid-lyrics-panel:fullscreen.ll-song-card-hidden,
.liquid-lyrics-panel.ll-fullscreen-mode.ll-song-card-hidden {
  --ll-card-col: 0px;
}
`;function si(){let t="liquid-lyrics-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=ri,document.head.appendChild(e)}async function Nn(){await z(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),si(),$(),Se(),await z(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),Kt();let t=null,e=null,i="Loading lyrics...",n=0,r=li();async function s(){let u=Spicetify.Player.data;if(!u?.item?.uri)return;let m=u.item.uri,g=m.includes(":")?m.split(":")[2]:m;if(g===t){Ze(),E();return}t=g,e=null,i="Loading lyrics...",Ze(),ni(i),h()&&re(i),await l(g,u.item)}async function l(u,m){let g=++n,q=await lt({id:u,data:{name:m.name}});if(!(g!==n||u!==t)){if(q.status==="success"&&q.data){e=q.data,i="",Ke(q.data),h()&&We(q.data);return}e=null,i=q.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",Ke(null,i),h()&&re(i)}}Spicetify.Player.addEventListener("songchange",()=>{s()});let a=()=>{let u=li();u!==r&&(r=u,h()&&ve())};setInterval(()=>{a()},250);let o=Spicetify.Platform?.History;typeof o?.listen=="function"&&o.listen(a);let d=h(),c=new MutationObserver(()=>{let u=h();if(Zt(),E(),u&&!d&&t)if(e)We(e);else if(i&&i!=="Loading lyrics...")re(i);else{let m=Spicetify.Player.data;if(m?.item?.uri){let g=m.item.uri.includes(":")?m.item.uri.split(":")[2]:m.item.uri;re("Loading lyrics..."),l(g,m.item)}}d=u}),p=document.getElementById("liquid-lyrics-panel");p&&c.observe(p,{attributes:!0,attributeFilter:["class"]}),E(),s()}Nn();function li(){let e=Spicetify.Platform?.History?.location??{},i=e.pathname||e.path||e.uri||"";return`${location.href}|${i}`}})();
