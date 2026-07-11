// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{var Rr=Object.create;var sn=Object.defineProperty;var Cr=Object.getOwnPropertyDescriptor;var Nr=Object.getOwnPropertyNames;var Ir=Object.getPrototypeOf,qr=Object.prototype.hasOwnProperty;var M=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pr=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Nr(t))!qr.call(e,r)&&r!==n&&sn(e,r,{get:()=>t[r],enumerable:!(i=Cr(t,r))||i.enumerable});return e};var on=(e,t,n)=>(n=e!=null?Rr(Ir(e)):{},Pr(t||!e||!e.__esModule?sn(n,"default",{value:e,enumerable:!0}):n,e));var xn=M((Tl,xe)=>{(function(){"use strict";var e="\0",t=0,n=0,i=-1,r=!0,a=!0,s=4,o=4,l=2,u=function(m){m==null&&(m=1024);var h=function(v,w,L){for(var A=w;A<L;A++)v[A]=-A+1;if(0<g.array[g.array.length-1]){for(var Z=g.array.length-2;0<g.array[Z];)Z--;v[w]=-Z}},x=function(v,w,L){for(var A=w;A<L;A++)v[A]=-A-1},y=function(v){var w=v*l,L=b(f.signed,f.bytes,w);h(L,f.array.length,w),L.set(f.array),f.array=null,f.array=L;var A=b(g.signed,g.bytes,w);x(A,g.array.length,w),A.set(g.array),g.array=null,g.array=A},p=n+1,f={signed:r,bytes:s,array:b(r,s,m)},g={signed:a,bytes:o,array:b(a,o,m)};return f.array[n]=1,g.array[n]=n,h(f.array,n+1,f.array.length),x(g.array,n+1,g.array.length),{getBaseBuffer:function(){return f.array},getCheckBuffer:function(){return g.array},loadBaseBuffer:function(v){return f.array=v,this},loadCheckBuffer:function(v){return g.array=v,this},size:function(){return Math.max(f.array.length,g.array.length)},getBase:function(v){return f.array.length-1<v?-v+1:f.array[v]},getCheck:function(v){return g.array.length-1<v?-v-1:g.array[v]},setBase:function(v,w){f.array.length-1<v&&y(v),f.array[v]=w},setCheck:function(v,w){g.array.length-1<v&&y(v),g.array[v]=w},setFirstUnusedNode:function(v){p=v},getFirstUnusedNode:function(){return p},shrink:function(){for(var v=this.size()-1;!(0<=g.array[v]);)v--;f.array=f.array.subarray(0,v+2),g.array=g.array.subarray(0,v+2)},calc:function(){for(var v=0,w=g.array.length,L=0;L<w;L++)g.array[L]<0&&v++;return{all:w,unused:v,efficiency:(w-v)/w}},dump:function(){var v="",w="",L;for(L=0;L<f.array.length;L++)v=v+" "+this.getBase(L);for(L=0;L<g.array.length;L++)w=w+" "+this.getCheck(L);return console.log("base:"+v),console.log("chck:"+w),"base:"+v+" chck:"+w}}};function c(m){this.bc=u(m),this.keys=[]}c.prototype.append=function(m,h){return this.keys.push({k:m,v:h}),this},c.prototype.build=function(m,h){if(m==null&&(m=this.keys),m==null)return new d(this.bc);h==null&&(h=!1);var x=m.map(function(y){return{k:k(y.k+e),v:y.v}});return h?this.keys=x:this.keys=x.sort(function(y,p){for(var f=y.k,g=p.k,v=Math.min(f.length,g.length),w=0;w<v;w++)if(f[w]!==g[w])return f[w]-g[w];return f.length-g.length}),x=null,this._build(n,0,0,this.keys.length),new d(this.bc)},c.prototype._build=function(m,h,x,y){var p=this.getChildrenInfo(h,x,y),f=this.findAllocatableBase(p);this.setBC(m,p,f);for(var g=0;g<p.length;g=g+3){var v=p[g];if(v!==t){var w=p[g+1],L=p[g+2],A=f+v;this._build(A,h+1,w,L)}}},c.prototype.getChildrenInfo=function(m,h,x){var y=this.keys[h].k[m],p=0,f=new Int32Array(x*3);f[p++]=y,f[p++]=h;for(var g=h,v=h;g<h+x;g++){var w=this.keys[g].k[m];y!==w&&(f[p++]=g-v,f[p++]=w,f[p++]=g,y=w,v=g)}return f[p++]=g-v,f=f.subarray(0,p),f},c.prototype.setBC=function(m,h,x){var y=this.bc;y.setBase(m,x);var p;for(p=0;p<h.length;p=p+3){var f=h[p],g=x+f,v=-y.getBase(g),w=-y.getCheck(g);g!==y.getFirstUnusedNode()?y.setCheck(v,-w):y.setFirstUnusedNode(w),y.setBase(w,-v);var L=m;if(y.setCheck(g,L),f===t){var A=h[p+1],Z=this.keys[A].v;Z==null&&(Z=0);var _r=-Z-1;y.setBase(g,_r)}}},c.prototype.findAllocatableBase=function(m){for(var h=this.bc,x,y=h.getFirstUnusedNode();;){if(x=y-m[0],x<0){y=-h.getCheck(y);continue}for(var p=!0,f=0;f<m.length;f=f+3){var g=m[f],v=x+g;if(!this.isUnusedNode(v)){y=-h.getCheck(y),p=!1;break}}if(p)return x}},c.prototype.isUnusedNode=function(m){var h=this.bc,x=h.getCheck(m);return m===n?!1:x<0};function d(m){this.bc=m,this.bc.shrink()}d.prototype.contain=function(m){var h=this.bc;m+=e;for(var x=k(m),y=n,p=i,f=0;f<x.length;f++){var g=x[f];if(p=this.traverse(y,g),p===i)return!1;if(h.getBase(p)<=0)return!0;y=p}return!1},d.prototype.lookup=function(m){m+=e;for(var h=k(m),x=n,y=i,p=0;p<h.length;p++){var f=h[p];if(y=this.traverse(x,f),y===i)return i;x=y}var g=this.bc.getBase(y);return g<=0?-g-1:i},d.prototype.commonPrefixSearch=function(m){for(var h=k(m),x=n,y=i,p=[],f=0;f<h.length;f++){var g=h[f];if(y=this.traverse(x,g),y!==i){x=y;var v=this.traverse(y,t);if(v!==i){var w=this.bc.getBase(v),L={};w<=0&&(L.v=-w-1),L.k=C(T(h,0,f+1)),p.push(L)}continue}else break}return p},d.prototype.traverse=function(m,h){var x=this.bc.getBase(m)+h;return this.bc.getCheck(x)===m?x:i},d.prototype.size=function(){return this.bc.size()},d.prototype.calc=function(){return this.bc.calc()},d.prototype.dump=function(){return this.bc.dump()};var b=function(m,h,x){if(m)switch(h){case 1:return new Int8Array(x);case 2:return new Int16Array(x);case 4:return new Int32Array(x);default:throw new RangeError("Invalid newArray parameter element_bytes:"+h)}else switch(h){case 1:return new Uint8Array(x);case 2:return new Uint16Array(x);case 4:return new Uint32Array(x);default:throw new RangeError("Invalid newArray parameter element_bytes:"+h)}},T=function(m,h,x){var y=new ArrayBuffer(x),p=new Uint8Array(y,0,x),f=m.subarray(h,x);return p.set(f),p},k=function(m){for(var h=new Uint8Array(new ArrayBuffer(m.length*4)),x=0,y=0;x<m.length;){var p,f=m.charCodeAt(x++);if(f>=55296&&f<=56319){var g=f,v=m.charCodeAt(x++);if(v>=56320&&v<=57343)p=(g-55296)*1024+65536+(v-56320);else return null}else p=f;p<128?h[y++]=p:p<2048?(h[y++]=p>>>6|192,h[y++]=p&63|128):p<65536?(h[y++]=p>>>12|224,h[y++]=p>>6&63|128,h[y++]=p&63|128):p<1<<21&&(h[y++]=p>>>18|240,h[y++]=p>>12&63|128,h[y++]=p>>6&63|128,h[y++]=p&63|128)}return h.subarray(0,y)},C=function(m){for(var h="",x,y,p,f,g,v,w,L=0;L<m.length;)y=m[L++],y<128?x=y:y>>5===6?(p=m[L++],x=(y&31)<<6|p&63):y>>4===14?(p=m[L++],f=m[L++],x=(y&15)<<12|(p&63)<<6|f&63):(p=m[L++],f=m[L++],g=m[L++],x=(y&7)<<18|(p&63)<<12|(f&63)<<6|g&63),x<65536?h+=String.fromCharCode(x):(x-=65536,v=55296|x>>10,w=56320|x&1023,h+=String.fromCharCode(v,w));return h},wt={builder:function(m){return new c(m)},load:function(m,h){var x=u(0);return x.loadBaseBuffer(m),x.loadCheckBuffer(h),new d(x)}};typeof xe>"u"?window.doublearray=wt:xe.exports=wt})()});var Ut=M((kl,wn)=>{"use strict";var Zr=function(e){for(var t=new Uint8Array(e.length*4),n=0,i=0;n<e.length;){var r,a=e.charCodeAt(n++);if(a>=55296&&a<=56319){var s=a,o=e.charCodeAt(n++);if(o>=56320&&o<=57343)r=(s-55296)*1024+65536+(o-56320);else return null}else r=a;r<128?t[i++]=r:r<2048?(t[i++]=r>>>6|192,t[i++]=r&63|128):r<65536?(t[i++]=r>>>12|224,t[i++]=r>>6&63|128,t[i++]=r&63|128):r<2097152&&(t[i++]=r>>>18|240,t[i++]=r>>12&63|128,t[i++]=r>>6&63|128,t[i++]=r&63|128)}return t.subarray(0,i)},Xr=function(e){for(var t="",n,i,r,a,s,o,l,u=0;u<e.length;)i=e[u++],i<128?n=i:i>>5===6?(r=e[u++],n=(i&31)<<6|r&63):i>>4===14?(r=e[u++],a=e[u++],n=(i&15)<<12|(r&63)<<6|a&63):(r=e[u++],a=e[u++],s=e[u++],n=(i&7)<<18|(r&63)<<12|(a&63)<<6|s&63),n<65536?t+=String.fromCharCode(n):(n-=65536,o=55296|n>>10,l=56320|n&1023,t+=String.fromCharCode(o,l));return t};function N(e){var t;if(e==null)t=1024*1024;else if(typeof e=="number")t=e;else if(e instanceof Uint8Array){this.buffer=e,this.position=0;return}else throw typeof e+" is invalid parameter type for ByteBuffer constructor";this.buffer=new Uint8Array(t),this.position=0}N.prototype.size=function(){return this.buffer.length};N.prototype.reallocate=function(){var e=new Uint8Array(this.buffer.length*2);e.set(this.buffer),this.buffer=e};N.prototype.shrink=function(){return this.buffer=this.buffer.subarray(0,this.position),this.buffer};N.prototype.put=function(e){this.buffer.length<this.position+1&&this.reallocate(),this.buffer[this.position++]=e};N.prototype.get=function(e){return e==null&&(e=this.position,this.position+=1),this.buffer.length<e+1?0:this.buffer[e]};N.prototype.putShort=function(e){if(65535<e)throw e+" is over short value";var t=255&e,n=(65280&e)>>8;this.put(t),this.put(n)};N.prototype.getShort=function(e){if(e==null&&(e=this.position,this.position+=2),this.buffer.length<e+2)return 0;var t=this.buffer[e],n=this.buffer[e+1],i=(n<<8)+t;return i&32768&&(i=-(i-1^65535)),i};N.prototype.putInt=function(e){if(4294967295<e)throw e+" is over integer value";var t=255&e,n=(65280&e)>>8,i=(16711680&e)>>16,r=(4278190080&e)>>24;this.put(t),this.put(n),this.put(i),this.put(r)};N.prototype.getInt=function(e){if(e==null&&(e=this.position,this.position+=4),this.buffer.length<e+4)return 0;var t=this.buffer[e],n=this.buffer[e+1],i=this.buffer[e+2],r=this.buffer[e+3];return(r<<24)+(i<<16)+(n<<8)+t};N.prototype.readInt=function(){var e=this.position;return this.position+=4,this.getInt(e)};N.prototype.putString=function(e){for(var t=Zr(e),n=0;n<t.length;n++)this.put(t[n]);this.put(0)};N.prototype.getString=function(e){var t=[],n;for(e==null&&(e=this.position);!(this.buffer.length<e+1||(n=this.get(e++),n===0));)t.push(n);return this.position=e,Xr(t)};wn.exports=N});var we=M((El,Ln)=>{"use strict";var ot=Ut();function j(){this.dictionary=new ot(10*1024*1024),this.target_map={},this.pos_buffer=new ot(10*1024*1024)}j.prototype.buildDictionary=function(e){for(var t={},n=0;n<e.length;n++){var i=e[n];if(!(i.length<4)){var r=i[0],a=i[1],s=i[2],o=i[3],l=i.slice(4).join(",");(!isFinite(a)||!isFinite(s)||!isFinite(o))&&console.log(i);var u=this.put(a,s,o,r,l);t[u]=r}}return this.dictionary.shrink(),this.pos_buffer.shrink(),t};j.prototype.put=function(e,t,n,i,r){var a=this.dictionary.position,s=this.pos_buffer.position;return this.dictionary.putShort(e),this.dictionary.putShort(t),this.dictionary.putShort(n),this.dictionary.putInt(s),this.pos_buffer.putString(i+","+r),a};j.prototype.addMapping=function(e,t){var n=this.target_map[e];n==null&&(n=[]),n.push(t),this.target_map[e]=n};j.prototype.targetMapToBuffer=function(){var e=new ot,t=Object.keys(this.target_map).length;e.putInt(t);for(var n in this.target_map){var i=this.target_map[n],r=i.length;e.putInt(parseInt(n)),e.putInt(r);for(var a=0;a<i.length;a++)e.putInt(i[a])}return e.shrink()};j.prototype.loadDictionary=function(e){return this.dictionary=new ot(e),this};j.prototype.loadPosVector=function(e){return this.pos_buffer=new ot(e),this};j.prototype.loadTargetMap=function(e){var t=new ot(e);for(t.position=0,this.target_map={},t.readInt();!(t.buffer.length<t.position+1);)for(var n=t.readInt(),i=t.readInt(),r=0;r<i;r++){var a=t.readInt();this.addMapping(n,a)}return this};j.prototype.getFeatures=function(e){var t=parseInt(e);if(isNaN(t))return"";var n=this.dictionary.getInt(t+6);return this.pos_buffer.getString(n)};Ln.exports=j});var kn=M((Sl,Tn)=>{"use strict";function Wt(e,t){this.forward_dimension=e,this.backward_dimension=t,this.buffer=new Int16Array(e*t+2),this.buffer[0]=e,this.buffer[1]=t}Wt.prototype.put=function(e,t,n){var i=e*this.backward_dimension+t+2;if(this.buffer.length<i+1)throw"ConnectionCosts buffer overflow";this.buffer[i]=n};Wt.prototype.get=function(e,t){var n=e*this.backward_dimension+t+2;if(this.buffer.length<n+1)throw"ConnectionCosts buffer overflow";return this.buffer[n]};Wt.prototype.loadConnectionCosts=function(e){this.forward_dimension=e[0],this.backward_dimension=e[1],this.buffer=e};Tn.exports=Wt});var Le=M((Al,En)=>{"use strict";function Qr(e,t,n,i,r){this.class_id=e,this.class_name=t,this.is_always_invoke=n,this.is_grouping=i,this.max_length=r}En.exports=Qr});var Mn=M((Ml,An)=>{"use strict";var Sn=Ut(),ta=Le();function tt(){this.map=[],this.lookup_table={}}tt.load=function(e){for(var t=new tt,n=[],i=new Sn(e);i.position+1<i.size();){var r=n.length,a=i.get(),s=i.get(),o=i.getInt(),l=i.getString();n.push(new ta(r,l,a,s,o))}return t.init(n),t};tt.prototype.init=function(e){if(e!=null)for(var t=0;t<e.length;t++){var n=e[t];this.map[t]=n,this.lookup_table[n.class_name]=t}};tt.prototype.getCharacterClass=function(e){return this.map[e]};tt.prototype.lookup=function(e){var t=this.lookup_table[e];return t??null};tt.prototype.toBuffer=function(){for(var e=new Sn,t=0;t<this.map.length;t++){var n=this.map[t];e.put(n.is_always_invoke),e.put(n.is_grouping),e.putInt(n.max_length),e.putString(n.class_name)}return e.shrink(),e.buffer};An.exports=tt});var Te=M((_l,_n)=>{"use strict";function et(e){this.str=e,this.index_mapping=[];for(var t=0;t<e.length;t++){var n=e.charAt(t);this.index_mapping.push(t),et.isSurrogatePair(n)&&t++}this.length=this.index_mapping.length}et.prototype.slice=function(e){if(this.index_mapping.length<=e)return"";var t=this.index_mapping[e];return this.str.slice(t)};et.prototype.charAt=function(e){if(this.str.length<=e)return"";var t=this.index_mapping[e],n=this.index_mapping[e+1];return n==null?this.str.slice(t):this.str.slice(t,n)};et.prototype.charCodeAt=function(e){if(this.index_mapping.length<=e)return NaN;var t=this.index_mapping[e],n=this.str.charCodeAt(t),i;return n>=55296&&n<=56319&&t<this.str.length&&(i=this.str.charCodeAt(t+1),i>=56320&&i<=57343)?(n-55296)*1024+i-56320+65536:n};et.prototype.toString=function(){return this.str};et.isSurrogatePair=function(e){var t=e.charCodeAt(0);return t>=55296&&t<=56319};_n.exports=et});var Cn=M((Rl,Rn)=>{"use strict";var ea=Mn(),na=Le(),ia=Te(),ke="DEFAULT";function D(){this.character_category_map=new Uint8Array(65536),this.compatible_category_map=new Uint32Array(65536),this.invoke_definition_map=null}D.load=function(e,t,n){var i=new D;return i.character_category_map=e,i.compatible_category_map=t,i.invoke_definition_map=ea.load(n),i};D.parseCharCategory=function(e,t){var n=t[1],i=parseInt(t[2]),r=parseInt(t[3]),a=parseInt(t[4]);if(!isFinite(i)||i!==0&&i!==1)return console.log("char.def parse error. INVOKE is 0 or 1 in:"+i),null;if(!isFinite(r)||r!==0&&r!==1)return console.log("char.def parse error. GROUP is 0 or 1 in:"+r),null;if(!isFinite(a)||a<0)return console.log("char.def parse error. LENGTH is 1 to n:"+a),null;var s=i===1,o=r===1;return new na(e,n,s,o,a)};D.parseCategoryMapping=function(e){var t=parseInt(e[1]),n=e[2],i=3<e.length?e.slice(3):[];return(!isFinite(t)||t<0||t>65535)&&console.log("char.def parse error. CODE is invalid:"+t),{start:t,default:n,compatible:i}};D.parseRangeCategoryMapping=function(e){var t=parseInt(e[1]),n=parseInt(e[2]),i=e[3],r=4<e.length?e.slice(4):[];return(!isFinite(t)||t<0||t>65535)&&console.log("char.def parse error. CODE is invalid:"+t),(!isFinite(n)||n<0||n>65535)&&console.log("char.def parse error. CODE is invalid:"+n),{start:t,end:n,default:i,compatible:r}};D.prototype.initCategoryMappings=function(e){var t;if(e!=null)for(var n=0;n<e.length;n++){var i=e[n],r=i.end||i.start;for(t=i.start;t<=r;t++){this.character_category_map[t]=this.invoke_definition_map.lookup(i.default);for(var a=0;a<i.compatible.length;a++){var s=this.compatible_category_map[t],o=i.compatible[a];if(o!=null){var l=this.invoke_definition_map.lookup(o);if(l!=null){var u=1<<l;s=s|u,this.compatible_category_map[t]=s}}}}}var c=this.invoke_definition_map.lookup(ke);if(c!=null)for(t=0;t<this.character_category_map.length;t++)this.character_category_map[t]===0&&(this.character_category_map[t]=1<<c)};D.prototype.lookupCompatibleCategory=function(e){var t=[],n=e.charCodeAt(0),i;if(n<this.compatible_category_map.length&&(i=this.compatible_category_map[n]),i==null||i===0)return t;for(var r=0;r<32;r++)if(i<<31-r>>>31===1){var a=this.invoke_definition_map.getCharacterClass(r);if(a==null)continue;t.push(a)}return t};D.prototype.lookup=function(e){var t,n=e.charCodeAt(0);return ia.isSurrogatePair(e)?t=this.invoke_definition_map.lookup(ke):n<this.character_category_map.length&&(t=this.character_category_map[n]),t==null&&(t=this.invoke_definition_map.lookup(ke)),this.invoke_definition_map.getCharacterClass(t)};Rn.exports=D});var qn=M((Cl,In)=>{"use strict";var ra=we(),aa=Cn(),Nn=Ut();function lt(){this.dictionary=new Nn(10*1024*1024),this.target_map={},this.pos_buffer=new Nn(10*1024*1024),this.character_definition=null}lt.prototype=Object.create(ra.prototype);lt.prototype.characterDefinition=function(e){return this.character_definition=e,this};lt.prototype.lookup=function(e){return this.character_definition.lookup(e)};lt.prototype.lookupCompatibleCategory=function(e){return this.character_definition.lookupCompatibleCategory(e)};lt.prototype.loadUnknownDictionaries=function(e,t,n,i,r,a){this.loadDictionary(e),this.loadPosVector(t),this.loadTargetMap(n),this.character_definition=aa.load(i,r,a)};In.exports=lt});var zn=M((Nl,On)=>{"use strict";var Pn=xn(),sa=we(),oa=kn(),la=qn();function Tt(e,t,n,i){e!=null?this.trie=e:this.trie=Pn.builder(0).build([{k:"",v:1}]),t!=null?this.token_info_dictionary=t:this.token_info_dictionary=new sa,n!=null?this.connection_costs=n:this.connection_costs=new oa(0,0),i!=null?this.unknown_dictionary=i:this.unknown_dictionary=new la}Tt.prototype.loadTrie=function(e,t){return this.trie=Pn.load(e,t),this};Tt.prototype.loadTokenInfoDictionaries=function(e,t,n){return this.token_info_dictionary.loadDictionary(e),this.token_info_dictionary.loadPosVector(t),this.token_info_dictionary.loadTargetMap(n),this};Tt.prototype.loadConnectionCosts=function(e){return this.connection_costs.loadConnectionCosts(e),this};Tt.prototype.loadUnknownDictionaries=function(e,t,n,i,r,a){return this.unknown_dictionary.loadUnknownDictionaries(e,t,n,i,r,a),this};On.exports=Tt});var Ee=M((Il,Fn)=>{"use strict";function ca(e,t,n,i,r,a,s,o){this.name=e,this.cost=t,this.start_pos=n,this.length=i,this.left_id=a,this.right_id=s,this.prev=null,this.surface_form=o,r==="BOS"?this.shortest_cost=0:this.shortest_cost=Number.MAX_VALUE,this.type=r}Fn.exports=ca});var jn=M((ql,Hn)=>{"use strict";var Bn=Ee();function Se(){this.nodes_end_at=[],this.nodes_end_at[0]=[new Bn(-1,0,0,0,"BOS",0,0,"")],this.eos_pos=1}Se.prototype.append=function(e){var t=e.start_pos+e.length-1;this.eos_pos<t&&(this.eos_pos=t);var n=this.nodes_end_at[t];n==null&&(n=[]),n.push(e),this.nodes_end_at[t]=n};Se.prototype.appendEos=function(){var e=this.nodes_end_at.length;this.eos_pos++,this.nodes_end_at[e]=[new Bn(-1,0,this.eos_pos,0,"EOS",0,0,"")]};Hn.exports=Se});var Vn=M((Pl,Wn)=>{"use strict";var Dn=Ee(),ua=jn(),Ae=Te();function Un(e){this.trie=e.trie,this.token_info_dictionary=e.token_info_dictionary,this.unknown_dictionary=e.unknown_dictionary}Un.prototype.build=function(e){for(var t=new ua,n=new Ae(e),i,r,a,s,o,l=0;l<n.length;l++){for(var u=n.slice(l),c=this.trie.commonPrefixSearch(u),d=0;d<c.length;d++){r=c[d].v,i=c[d].k;for(var b=this.token_info_dictionary.target_map[r],T=0;T<b.length;T++){var k=parseInt(b[T]);a=this.token_info_dictionary.dictionary.getShort(k),s=this.token_info_dictionary.dictionary.getShort(k+2),o=this.token_info_dictionary.dictionary.getShort(k+4),t.append(new Dn(k,o,l+1,i.length,"KNOWN",a,s,i))}}var C=new Ae(u),wt=new Ae(C.charAt(0)),m=this.unknown_dictionary.lookup(wt.toString());if(c==null||c.length===0||m.is_always_invoke===1){if(i=wt,m.is_grouping===1&&1<C.length)for(var h=1;h<C.length;h++){var x=C.charAt(h),y=this.unknown_dictionary.lookup(x);if(m.class_name!==y.class_name)break;i+=x}for(var p=this.unknown_dictionary.target_map[m.class_id],f=0;f<p.length;f++){var g=parseInt(p[f]);a=this.unknown_dictionary.dictionary.getShort(g),s=this.unknown_dictionary.dictionary.getShort(g+2),o=this.unknown_dictionary.dictionary.getShort(g+4),t.append(new Dn(g,o,l+1,i.length,"UNKNOWN",a,s,i.toString()))}}}return t.appendEos(),t};Wn.exports=Un});var $n=M((Ol,Kn)=>{"use strict";function Vt(e){this.connection_costs=e}Vt.prototype.search=function(e){return e=this.forward(e),this.backward(e)};Vt.prototype.forward=function(e){var t,n,i;for(t=1;t<=e.eos_pos;t++){var r=e.nodes_end_at[t];if(r!=null)for(n=0;n<r.length;n++){var a=r[n],s=Number.MAX_VALUE,o,l=e.nodes_end_at[a.start_pos-1];if(l!=null){for(i=0;i<l.length;i++){var u=l[i],c;a.left_id==null||u.right_id==null?(console.log("Left or right is null"),c=0):c=this.connection_costs.get(u.right_id,a.left_id);var d=u.shortest_cost+c+a.cost;d<s&&(o=u,s=d)}a.prev=o,a.shortest_cost=s}}}return e};Vt.prototype.backward=function(e){var t=[],n=e.nodes_end_at[e.nodes_end_at.length-1][0],i=n.prev;if(i==null)return[];for(;i.type!=="BOS";){if(t.push(i),i.prev==null)return[];i=i.prev}return t.reverse()};Kn.exports=Vt});var Gn=M((zl,Jn)=>{"use strict";function Me(){}Me.prototype.formatEntry=function(e,t,n,i){var r={};return r.word_id=e,r.word_type=n,r.word_position=t,r.surface_form=i[0],r.pos=i[1],r.pos_detail_1=i[2],r.pos_detail_2=i[3],r.pos_detail_3=i[4],r.conjugated_type=i[5],r.conjugated_form=i[6],r.basic_form=i[7],r.reading=i[8],r.pronunciation=i[9],r};Me.prototype.formatUnknownEntry=function(e,t,n,i,r){var a={};return a.word_id=e,a.word_type=n,a.word_position=t,a.surface_form=r,a.pos=i[1],a.pos_detail_1=i[2],a.pos_detail_2=i[3],a.pos_detail_3=i[4],a.conjugated_type=i[5],a.conjugated_form=i[6],a.basic_form=i[7],a};Jn.exports=Me});var Zn=M((Fl,Yn)=>{"use strict";var da=Vn(),fa=$n(),pa=Gn(),ga=/、|。/;function ct(e){this.token_info_dictionary=e.token_info_dictionary,this.unknown_dictionary=e.unknown_dictionary,this.viterbi_builder=new da(e),this.viterbi_searcher=new fa(e.connection_costs),this.formatter=new pa}ct.splitByPunctuation=function(e){for(var t=[],n=e;n!=="";){var i=n.search(ga);if(i<0){t.push(n);break}t.push(n.substring(0,i+1)),n=n.substring(i+1)}return t};ct.prototype.tokenize=function(e){for(var t=ct.splitByPunctuation(e),n=[],i=0;i<t.length;i++){var r=t[i];this.tokenizeForSentence(r,n)}return n};ct.prototype.tokenizeForSentence=function(e,t){t==null&&(t=[]);var n=this.getLattice(e),i=this.viterbi_searcher.search(n),r=0;t.length>0&&(r=t[t.length-1].word_position);for(var a=0;a<i.length;a++){var s=i[a],o,l,u;s.type==="KNOWN"?(u=this.token_info_dictionary.getFeatures(s.name),u==null?l=[]:l=u.split(","),o=this.formatter.formatEntry(s.name,r+s.start_pos,s.type,l)):s.type==="UNKNOWN"?(u=this.unknown_dictionary.getFeatures(s.name),u==null?l=[]:l=u.split(","),o=this.formatter.formatUnknownEntry(s.name,r+s.start_pos,s.type,l,s.surface_form)):o=this.formatter.formatEntry(s.name,r+s.start_pos,s.type,[]),t.push(o)}return t};ct.prototype.getLattice=function(e){return this.viterbi_builder.build(e)};Yn.exports=ct});function V(e,t=1e4){return new Promise((n,i)=>{let r=Date.now(),a=setInterval(()=>{let s=e();s?(clearInterval(a),n(s)):Date.now()-r>t&&(clearInterval(a),i(new Error("wait() timed out")))},100)})}var me="5.19.11",ln=["spicy","spotify"];async function he({id:e}){try{let t=e.includes(":")?e.split(":")[2]:e,n="https://spclient.wg.spotify.com/color-lyrics/v2/track/",i;try{i=await(await V(()=>Spicetify.CosmosAsync?.get))(`${n}${t}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let r=i?.lyrics;if(!r)return{status:"missing_lyrics",data:null};let a=r.lines,s;if(r.syncType==="LINE_SYNCED"){let o=a.map((l,u)=>{let c=Number(l.startTimeMs)||0,d=u<a.length-1?Number(a[u+1].startTimeMs):c+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:c,EndTime:d,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:c,EndTime:d,OppositeAligned:!1,IsRTL:!1}});s={Id:t,Type:"Line",SongWriters:[],Content:o,StartTime:o.length>0?o[0].StartTime:0,EndTime:o.length>0?o[o.length-1].EndTime:0,Provider:"spotify"}}else s={Id:t,Type:"Static",SongWriters:[],Lines:a.map(o=>({Text:o.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:s}}catch(t){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:t instanceof Error?t.message:String(t)}}}}var un=["https://api.spicylyrics.org","https://coregateway.spicylyrics.org","https://lcgateway.spikerko.org"],ye=un[0];async function dn(e,t){try{return await cn(ye,e,t)}catch{for(let n of un)if(n!==ye)try{let i=await cn(n,e,t);return ye=n,i}catch{continue}}throw new Error("All nodes are currently unreachable")}async function cn(e,t,n){let i=await fetch(`${e}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":me,...n&&{"SpicyLyrics-WebAuth":n}},body:JSON.stringify({queries:t,client:{version:me}})});if(!i.ok)throw new Error(`Node ${e} failed`);return i.json()}var X,Lt;async function fn(){return X&&X.expiresAtTime-Date.now()>2e3?X.accessToken:Lt||(Lt=(async()=>{let e=await V(()=>Spicetify.CosmosAsync),t=await V(()=>Spicetify.Platform);try{X=await e.get("sp://oauth/v2/token")}catch(n){n.message?.includes("Resolver not found")&&t.Session&&(X={accessToken:t.Session.accessToken,expiresAtTime:t.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{Lt=void 0}if(!X)throw new Error("Could not retrieve Spotify Access Token");return X.accessToken})(),Lt)}async function gn({id:e}){try{let t=await Or(e),n=Br(t);if(!t||!n)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let i=Fr(n.result);if(i.status==="missing_lyrics")return{status:"missing_lyrics",data:null};if(i.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:i.message}};let r=i.data;return r.Provider="spicy",zr(r),{status:"success",data:r}}catch(t){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:t instanceof Error?t.message:String(t)}}}}async function Or(e){let n=`Bearer ${await fn()}`;return await dn([{operation:"lyrics",variables:{id:e,auth:"SpicyLyrics-WebAuth"}}],n)}function zr(e){if(e.Type==="Static")return;let t=n=>Math.round(Number(n||0)*1e3);if(e.StartTime=t(e.StartTime),e.EndTime=t(e.EndTime),e.Type==="Syllable")for(let n of e.Content){if(n.Lead){n.Lead.StartTime=t(n.Lead.StartTime),n.Lead.EndTime=t(n.Lead.EndTime);for(let i of n.Lead.Syllables)i.StartTime=t(i.StartTime),i.EndTime=t(i.EndTime)}if(n.Background)for(let i of n.Background){i.StartTime=t(i.StartTime),i.EndTime=t(i.EndTime);for(let r of i.Syllables)r.StartTime=t(r.StartTime),r.EndTime=t(r.EndTime)}}else if(e.Type==="Line")for(let n of e.Content)n.StartTime=t(n.StartTime),n.EndTime=t(n.EndTime)}function Fr(e){if(!e||typeof e!="object")return{status:"error",message:"Spicy returned an empty result"};let t=e,n=t.httpStatus,i=t.data??e;return n===404||be(i,"MISSING_LYRICS")?{status:"missing_lyrics"}:n&&n!==200?{status:"error",message:pn(i)}:be(i)?{status:"error",message:pn(i)}:Hr(i)?{status:"success",data:i}:{status:"error",message:"Unexpected response from Spicy"}}function Br(e){return(e?.queries.flat()??[]).find(n=>n.operation==="lyrics"&&!!n.result)}function Hr(e){if(!e||typeof e!="object"||!("Type"in e))return!1;let t=e.Type;return t==="Syllable"||t==="Line"||t==="Static"}function be(e,t){if(!e||typeof e!="object"||!("error"in e))return!1;let n=e.error;return typeof n=="string"&&(!t||n===t)}function pn(e){return be(e)?e.message??e.error:"Unexpected Error from Spicy"}var jr={spotify:{id:"spotify",fetch:he},spicy:{id:"spicy",fetch:gn}},ve=new Map;async function mn(e){let t=e.id;if(!e.forceRefresh&&ve.has(t))return{status:"success",data:ve.get(t)};let n=!1;for(let i of ln){let r=jr[i];if(!r)continue;let a=await r.fetch(e);if(a.status==="success"&&a.data){let s=i==="spicy"?await Dr(e,a.data):a.data;return ve.set(t,s),{...a,data:s}}if(a.status==="missing_lyrics"){n=!0;continue}}return n?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}async function Dr(e,t){if(t.Type!=="Syllable"&&t.Type!=="Line")return t;try{let n=await he(e);if(n.status!=="success"||!n.data)return t;let i=Ur(n.data);if(i.length===0||t.Type==="Line")return t;t.Content.forEach(r=>{let a=r.Lead,s=Wr(i,a?.StartTime??0,a?.EndTime??0);s&&(r.LiquidLyricsOriginalText=s.text,a&&(a.LiquidLyricsOriginalText=s.text))})}catch{return t}return t}function Ur(e){return e.Type!=="Line"?[]:e.Content.filter(t=>t.Type!=="Interlude").map(t=>({text:Vr(t.Text),start:Number(t.StartTime)||0,end:Number(t.EndTime)||0})).filter(t=>t.text&&!t.text.includes("\u266A")&&!t.text.includes("\xE2\u2122\xAA"))}function Wr(e,t,n){let i=Number(t)||0,r=Number(n)||i,a=(i+r)/2,s=null,o=Number.POSITIVE_INFINITY;for(let l of e){let u=(l.start+l.end)/2,c=Math.abs(l.start-i),d=Math.abs(u-a),b=c*.75+d*.25;b<o&&(s=l,o=b)}return s&&o<=3500?s:null}function Vr(e){return String(e??"").replace(/\s+/g," ").trim()}var Kr="liquid-lyrics-mode",hn="liquid-lyrics-romanization";var xl=localStorage.getItem(Kr)||"romanization",yn="liquid-lyrics-romanization-display",bn=(()=>{let e=localStorage.getItem(yn);return e==="off"||e==="romaji"||e==="furigana"?e:localStorage.getItem(hn)==="true"?"romaji":"off"})();function I(){return bn}function jt(e){bn=e,localStorage.setItem(yn,e),localStorage.setItem(hn,String(e!=="off"))}var Dt="liquid-lyrics-tooltip";function q(e,t){e.dataset.tooltip=t;let n=()=>$r(e,e.dataset.tooltip||t);e.addEventListener("pointerenter",n),e.addEventListener("focus",n),e.addEventListener("pointerleave",Q),e.addEventListener("blur",Q),e.addEventListener("click",()=>window.setTimeout(()=>vn(e),0))}function $r(e,t){if(e.hasAttribute("disabled")||e.hidden)return;let n=Jr(e);n.textContent=t,n.classList.add("visible"),vn(e)}function Q(){document.getElementById(Dt)?.classList.remove("visible")}function Jr(e){let t=Gr(e),n=document.getElementById(Dt);return n||(n=document.createElement("div"),n.id=Dt,n.className="liquid-lyrics-tooltip"),n.parentElement!==t&&t.appendChild(n),n}function Gr(e){let t=document.fullscreenElement;return t instanceof HTMLElement&&t.contains(e)?t:document.body}function vn(e){let t=document.getElementById(Dt);if(!t?.classList.contains("visible"))return;let n=e.getBoundingClientRect(),i=9,r=t.offsetWidth||80,a=t.offsetHeight||28,s=Math.max(8,n.top-a-i),o=Yr(n.left+n.width/2,r/2+8,window.innerWidth-r/2-8);t.style.left=`${o}px`,t.style.top=`${s}px`}function Yr(e,t,n){return Math.min(n,Math.max(t,e))}var Ti=on(zn()),ki=on(Zn());function dt(e){return e===null?"null":e!==Object(e)?typeof e:{}.toString.call(e).slice(8,-1).toLowerCase()}function P(e){return dt(e)!=="string"?!0:!e.length}function ft(e="",t,n){if(P(e))return!1;let i=e.charCodeAt(0);return t<=i&&i<=n}var Xn={HIRAGANA:"toHiragana",KATAKANA:"toKatakana"},si={HEPBURN:"hepburn"},ma={useObsoleteKana:!1,passRomaji:!1,convertLongVowelMark:!0,upcaseKatakana:!1,IMEMode:!1,romanization:si.HEPBURN},ha=65,ya=90,ba=65345,va=65370,xa=65313,wa=65338,Ie=12353,La=12438,qe=12449,Ta=12540,ka=19968,Ea=40879,Sa=12293,Aa=12540,Ma=12539,_a=[65296,65305],Ra=[xa,wa],Ca=[ba,va],Na=[65281,65295],Ia=[65306,65311],qa=[65339,65343],Pa=[65371,65376],Oa=[65504,65518],za=[12352,12447],Fa=[12448,12543],Ba=[65382,65439],Ha=[12539,12540],oi=[65377,65381],ja=[12288,12351],Da=[19968,40959],Ua=[13312,19903],Wa=[za,Fa,oi,Ba],Va=[ja,oi,Ha,Na,Ia,qa,Pa,Oa],Bl=[...Wa,...Va,Ra,Ca,_a,Da,Ua],Ka=[0,127],$a=[[256,257],[274,275],[298,299],[332,333],[362,363]],Ja=[[8216,8217],[8220,8221]],Ga=[Ka,...$a],Ya=[[32,47],[58,63],[91,96],[123,126],...Ja];var Qn=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function Za(e,t){return!!(e===t||Qn(e)&&Qn(t))}function Xa(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(!Za(e[n],t[n]))return!1;return!0}function li(e,t){t===void 0&&(t=Xa);var n=null;function i(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];if(n&&n.lastThis===this&&t(r,n.lastArgs))return n.lastResult;var s=e.apply(this,r);return n={lastResult:s,lastArgs:r,lastThis:this},s}return i.clear=function(){n=null},i}var ti=Object.prototype.hasOwnProperty;function ei(e,t,n){for(n of e.keys())if(ut(n,t))return n}function ut(e,t){var n,i,r;if(e===t)return!0;if(e&&t&&(n=e.constructor)===t.constructor){if(n===Date)return e.getTime()===t.getTime();if(n===RegExp)return e.toString()===t.toString();if(n===Array){if((i=e.length)===t.length)for(;i--&&ut(e[i],t[i]););return i===-1}if(n===Set){if(e.size!==t.size)return!1;for(i of e)if(r=i,r&&typeof r=="object"&&(r=ei(t,r),!r)||!t.has(r))return!1;return!0}if(n===Map){if(e.size!==t.size)return!1;for(i of e)if(r=i[0],r&&typeof r=="object"&&(r=ei(t,r),!r)||!ut(i[1],t.get(r)))return!1;return!0}if(n===ArrayBuffer)e=new Uint8Array(e),t=new Uint8Array(t);else if(n===DataView){if((i=e.byteLength)===t.byteLength)for(;i--&&e.getInt8(i)===t.getInt8(i););return i===-1}if(ArrayBuffer.isView(e)){if((i=e.byteLength)===t.byteLength)for(;i--&&e[i]===t[i];);return i===-1}if(!n||typeof e=="object"){i=0;for(n in e)if(ti.call(e,n)&&++i&&!ti.call(t,n)||!(n in t)||!ut(e[n],t[n]))return!1;return Object.keys(t).length===i}}return e!==e&&t!==t}var Pe=(e={})=>Object.assign({},ma,e);function ci(e,t,n){let i=t;function r(o,l){if(o[l]!==void 0)return Object.assign({"":o[""]+l},o[l])}function a(o,l){let u=o.charAt(0);return s(Object.assign({"":u},i[u]),o.slice(1),l,l+1)}function s(o,l,u,c){if(!l)return n||Object.keys(o).length===1?o[""]?[[u,c,o[""]]]:[]:[[u,c,null]];if(Object.keys(o).length===1)return[[u,c,o[""]]].concat(a(l,c));let d=r(o,l.charAt(0));return d===void 0?[[u,c,o[""]]].concat(a(l,c)):s(d,l.slice(1),u,c+1)}return a(e,0)}function Oe(e){return Object.entries(e).reduce((t,[n,i])=>{let r=dt(i)==="string";return t[n]=r?{"":i}:Oe(i),t},{})}function ui(e,t){return t.split("").reduce((n,i)=>(n[i]===void 0&&(n[i]={}),n[i]),e)}function di(e={}){let t={};return dt(e)==="object"&&Object.entries(e).forEach(([n,i])=>{let r=t;n.split("").forEach(a=>{r[a]===void 0&&(r[a]={}),r=r[a]}),r[""]=i}),function(i){let r=JSON.parse(JSON.stringify(i));function a(s,o){return s===void 0||dt(s)==="string"?o:Object.entries(o).reduce((l,[u,c])=>(l[u]=a(s[u],c),l),s)}return a(r,t)}}function fi(e,t){return t?dt(t)==="function"?t(e):di(t)(e):e}var Qa={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u304A",k:{a:"\u304B",i:"\u304D",u:"\u304F",e:"\u3051",o:"\u3053"},s:{a:"\u3055",i:"\u3057",u:"\u3059",e:"\u305B",o:"\u305D"},t:{a:"\u305F",i:"\u3061",u:"\u3064",e:"\u3066",o:"\u3068"},n:{a:"\u306A",i:"\u306B",u:"\u306C",e:"\u306D",o:"\u306E"},h:{a:"\u306F",i:"\u3072",u:"\u3075",e:"\u3078",o:"\u307B"},m:{a:"\u307E",i:"\u307F",u:"\u3080",e:"\u3081",o:"\u3082"},y:{a:"\u3084",u:"\u3086",o:"\u3088"},r:{a:"\u3089",i:"\u308A",u:"\u308B",e:"\u308C",o:"\u308D"},w:{a:"\u308F",i:"\u3090",e:"\u3091",o:"\u3092"},g:{a:"\u304C",i:"\u304E",u:"\u3050",e:"\u3052",o:"\u3054"},z:{a:"\u3056",i:"\u3058",u:"\u305A",e:"\u305C",o:"\u305E"},d:{a:"\u3060",i:"\u3062",u:"\u3065",e:"\u3067",o:"\u3069"},b:{a:"\u3070",i:"\u3073",u:"\u3076",e:"\u3079",o:"\u307C"},p:{a:"\u3071",i:"\u3074",u:"\u3077",e:"\u307A",o:"\u307D"},v:{a:"\u3094\u3041",i:"\u3094\u3043",u:"\u3094",e:"\u3094\u3047",o:"\u3094\u3049"}},ts={".":"\u3002",",":"\u3001",":":"\uFF1A","/":"\u30FB","!":"\uFF01","?":"\uFF1F","~":"\u301C","-":"\u30FC","\u2018":"\u300C","\u2019":"\u300D","\u201C":"\u300E","\u201D":"\u300F","[":"\uFF3B","]":"\uFF3D","(":"\uFF08",")":"\uFF09","{":"\uFF5B","}":"\uFF5D"},ni={k:"\u304D",s:"\u3057",t:"\u3061",n:"\u306B",h:"\u3072",m:"\u307F",r:"\u308A",g:"\u304E",z:"\u3058",d:"\u3062",b:"\u3073",p:"\u3074",v:"\u3094",q:"\u304F",f:"\u3075"},pi={ya:"\u3083",yi:"\u3043",yu:"\u3085",ye:"\u3047",yo:"\u3087"},gi={a:"\u3041",i:"\u3043",u:"\u3045",e:"\u3047",o:"\u3049"},ii={sh:"sy",ch:"ty",cy:"ty",chy:"ty",shy:"sy",j:"zy",jy:"zy",shi:"si",chi:"ti",tsu:"tu",ji:"zi",fu:"hu"},es=Object.assign({tu:"\u3063",wa:"\u308E",ka:"\u30F5",ke:"\u30F6"},gi,pi),ns={yi:"\u3044",wu:"\u3046",ye:"\u3044\u3047",wi:"\u3046\u3043",we:"\u3046\u3047",kwa:"\u304F\u3041",whu:"\u3046",tha:"\u3066\u3083",thu:"\u3066\u3085",tho:"\u3066\u3087",dha:"\u3067\u3083",dhu:"\u3067\u3085",dho:"\u3067\u3087"},is={wh:"\u3046",kw:"\u304F",qw:"\u304F",q:"\u304F",gw:"\u3050",sw:"\u3059",ts:"\u3064",th:"\u3066",tw:"\u3068",dh:"\u3067",dw:"\u3069",fw:"\u3075",f:"\u3075"};function rs(){let e=Oe(Qa),t=r=>ui(e,r);Object.entries(ni).forEach(([r,a])=>{Object.entries(pi).forEach(([s,o])=>{t(r+s)[""]=a+o})}),Object.entries(ts).forEach(([r,a])=>{t(r)[""]=a}),Object.entries(is).forEach(([r,a])=>{Object.entries(gi).forEach(([s,o])=>{let l=t(r+s);l[""]=a+o})}),["n","n'","xn"].forEach(r=>{t(r)[""]="\u3093"}),e.c=JSON.parse(JSON.stringify(e.k)),Object.entries(ii).forEach(([r,a])=>{let s=r.slice(0,r.length-1),o=r.charAt(r.length-1),l=t(s);l[o]=JSON.parse(JSON.stringify(t(a)))});function n(r){return[...Object.entries(ii),["c","k"]].reduce((a,[s,o])=>r.startsWith(o)?a.concat(r.replace(o,s)):a,[])}Object.entries(es).forEach(([r,a])=>{let s=d=>d.charAt(d.length-1),o=d=>d.slice(0,d.length-1),l=`x${r}`,u=t(l);u[""]=a;let c=t(`l${o(r)}`);c[s(r)]=u,n(r).forEach(d=>{["l","x"].forEach(b=>{let T=t(b+o(d));T[s(d)]=t(b+r)})})}),Object.entries(ns).forEach(([r,a])=>{t(r)[""]=a});function i(r){return Object.entries(r).reduce((a,[s,o])=>(s?a[s]=i(o):a[s]=`\u3063${o}`,a),{})}return[...Object.keys(ni),"c","y","w","j"].forEach(r=>{let a=e[r];a[r]=i(a)}),delete e.n.n,Object.freeze(JSON.parse(JSON.stringify(e)))}var _e=null;function as(){return _e==null&&(_e=rs()),_e}var ss=di({wi:"\u3090",we:"\u3091"});function os(e){let t=JSON.parse(JSON.stringify(e));return t.n.n={"":"\u3093"},t.n[" "]={"":"\u3093"},t}function ls(e=""){return P(e)?!1:ft(e,ha,ya)}function kt(e=""){return P(e)?!1:e.charCodeAt(0)===Aa}function mi(e=""){return P(e)?!1:e.charCodeAt(0)===Ma}function hi(e=""){return P(e)?!1:kt(e)?!0:ft(e,Ie,La)}function cs(e=""){let t=[];return e.split("").forEach(n=>{if(kt(n)||mi(n))t.push(n);else if(hi(n)){let i=n.charCodeAt(0)+(qe-Ie),r=String.fromCharCode(i);t.push(r)}else t.push(n)}),t.join("")}var yi=li((e,t,n)=>{let i=as();return i=e?os(i):i,i=t?ss(i):i,n&&(i=fi(i,n)),i},ut);function ri(e="",t={},n){let i;return n?i=t:(i=Pe(t),n=yi(i.IMEMode,i.useObsoleteKana,i.customKanaMapping)),us(e,i,n).map(r=>{let[a,s,o]=r;if(o===null)return e.slice(a);let l=i.IMEMode===Xn.HIRAGANA,u=i.IMEMode===Xn.KATAKANA||[...e.slice(a,s)].every(ls);return l||!u?o:cs(o)}).join("")}function us(e="",t={},n){let{IMEMode:i,useObsoleteKana:r,customKanaMapping:a}=t;return n||(n=yi(i,r,a)),ci(e.toLowerCase(),n,!i)}function ds(e=""){return P(e)?!1:Ga.some(([t,n])=>ft(e,t,n))}function bi(e="",t){let n=dt(t)==="regexp";return P(e)?!1:[...e].every(i=>{let r=ds(i);return n?r||t.test(i):r})}function Ne(e=""){return ft(e,qe,Ta)}function fs(e=""){return P(e)?!1:[...e].every(hi)}function vi(e=""){return P(e)?!1:[...e].every(Ne)}function ps(e=""){return P(e)?!1:e.charCodeAt(0)===Sa}function gs(e=""){return ft(e,ka,Ea)||ps(e)}function ms(e=""){return P(e)?!1:[...e].every(gs)}function hs(e="",t={passKanji:!0}){let n=[...e],i=!1;return t.passKanji||(i=n.some(ms)),(n.some(fs)||n.some(vi))&&n.some(bi)&&!i}var ys=(e,t)=>kt(e)&&t<1,bs=(e,t)=>kt(e)&&t>0,vs=e=>["\u30F6","\u30F5"].includes(e),xs={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u3046"};function Kt(e="",t,{isDestinationRomaji:n,convertLongVowelMark:i}={}){let r="";return e.split("").reduce((a,s,o)=>{if(mi(s)||ys(s,o)||vs(s))return a.concat(s);if(i&&r&&bs(s,o)){let l=t(r).slice(-1);return Ne(e[o-1])&&l==="o"&&n?a.concat("\u304A"):a.concat(xs[l])}if(!kt(s)&&Ne(s)){let l=s.charCodeAt(0)+(Ie-qe),u=String.fromCharCode(l);return r=u,a.concat(u)}return r="",a.concat(s)},[]).join("")}var Re=null,ws={\u3042:"a",\u3044:"i",\u3046:"u",\u3048:"e",\u304A:"o",\u304B:"ka",\u304D:"ki",\u304F:"ku",\u3051:"ke",\u3053:"ko",\u3055:"sa",\u3057:"shi",\u3059:"su",\u305B:"se",\u305D:"so",\u305F:"ta",\u3061:"chi",\u3064:"tsu",\u3066:"te",\u3068:"to",\u306A:"na",\u306B:"ni",\u306C:"nu",\u306D:"ne",\u306E:"no",\u306F:"ha",\u3072:"hi",\u3075:"fu",\u3078:"he",\u307B:"ho",\u307E:"ma",\u307F:"mi",\u3080:"mu",\u3081:"me",\u3082:"mo",\u3089:"ra",\u308A:"ri",\u308B:"ru",\u308C:"re",\u308D:"ro",\u3084:"ya",\u3086:"yu",\u3088:"yo",\u308F:"wa",\u3090:"wi",\u3091:"we",\u3092:"wo",\u3093:"n",\u304C:"ga",\u304E:"gi",\u3050:"gu",\u3052:"ge",\u3054:"go",\u3056:"za",\u3058:"ji",\u305A:"zu",\u305C:"ze",\u305E:"zo",\u3060:"da",\u3062:"ji",\u3065:"zu",\u3067:"de",\u3069:"do",\u3070:"ba",\u3073:"bi",\u3076:"bu",\u3079:"be",\u307C:"bo",\u3071:"pa",\u3074:"pi",\u3077:"pu",\u307A:"pe",\u307D:"po",\u3094\u3041:"va",\u3094\u3043:"vi",\u3094:"vu",\u3094\u3047:"ve",\u3094\u3049:"vo"},Ls={"\u3002":".","\u3001":",","\uFF1A":":","\u30FB":"/","\uFF01":"!","\uFF1F":"?","\u301C":"~",\u30FC:"-","\u300C":"\u2018","\u300D":"\u2019","\u300E":"\u201C","\u300F":"\u201D","\uFF3B":"[","\uFF3D":"]","\uFF08":"(","\uFF09":")","\uFF5B":"{","\uFF5D":"}","\u3000":" "},Ts=["\u3042","\u3044","\u3046","\u3048","\u304A","\u3084","\u3086","\u3088"],Ce={\u3083:"ya",\u3085:"yu",\u3087:"yo"},ks={\u3043:"yi",\u3047:"ye"},Es={\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},Ss=["\u304D","\u306B","\u3072","\u307F","\u308A","\u304E","\u3073","\u3074","\u3094","\u304F","\u3075"],As={\u3057:"sh",\u3061:"ch",\u3058:"j",\u3062:"j"},Ms={\u3063:"",\u3083:"ya",\u3085:"yu",\u3087:"yo",\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},ai={b:"b",c:"t",d:"d",f:"f",g:"g",h:"h",j:"j",k:"k",m:"m",p:"p",q:"q",r:"r",s:"s",t:"t",v:"v",w:"w",x:"x",z:"z"};function _s(){return Re==null&&(Re=Cs()),Re}function Rs(e){switch(e){case si.HEPBURN:return _s();default:return{}}}function Cs(){let e=Oe(ws),t=i=>ui(e,i),n=(i,r)=>{t(i)[""]=r};return Object.entries(Ls).forEach(([i,r])=>{t(i)[""]=r}),[...Object.entries(Ce),...Object.entries(Es)].forEach(([i,r])=>{n(i,r)}),Ss.forEach(i=>{let r=t(i)[""][0];Object.entries(Ce).forEach(([a,s])=>{n(i+a,r+s)}),Object.entries(ks).forEach(([a,s])=>{n(i+a,r+s)})}),Object.entries(As).forEach(([i,r])=>{Object.entries(Ce).forEach(([a,s])=>{n(i+a,r+s[1])}),n(`${i}\u3043`,`${r}yi`),n(`${i}\u3047`,`${r}e`)}),e.\u3063=xi(e),Object.entries(Ms).forEach(([i,r])=>{n(i,r)}),Ts.forEach(i=>{n(`\u3093${i}`,`n'${t(i)[""]}`)}),Object.freeze(JSON.parse(JSON.stringify(e)))}function xi(e){return Object.entries(e).reduce((t,[n,i])=>{if(n)t[n]=xi(i);else{let r=i.charAt(0);t[n]=Object.keys(ai).includes(r)?ai[r]+i:i}return t},{})}var wi=li((e,t)=>{let n=Rs(e);return t&&(n=fi(n,t)),n},ut);function nt(e="",t={},n){let i=Pe(t);return n||(n=wi(i.romanization,i.customRomajiMapping)),Ns(e,i,n).map(r=>{let[a,s,o]=r;return i.upcaseKatakana&&vi(e.slice(a,s))?o.toUpperCase():o}).join("")}function Ns(e,t,n){n||(n=wi(t.romanization,t.customRomajiMapping));let i=Object.assign({},{isDestinationRomaji:!0},t);return ci(Kt(e,nt,i),n,!t.IMEMode)}function Is(e=""){return P(e)?!1:Ya.some(([t,n])=>ft(e,t,n))}function Li(e="",t={}){let n=Pe(t);if(n.passRomaji)return Kt(e,nt,n);if(hs(e,{passKanji:!0})){let i=Kt(e,nt,n);return ri(i.toLowerCase(),n)}return bi(e)||Is(e)?ri(e.toLowerCase(),n):Kt(e,nt,n)}var Ps=["https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict","https://unpkg.com/kuromoji@0.1.2/dict"],Os=["base.dat.gz","check.dat.gz","tid.dat.gz","tid_pos.dat.gz","tid_map.dat.gz","cc.dat.gz","unk.dat.gz","unk_pos.dat.gz","unk_map.dat.gz","unk_char.dat.gz","unk_compat.dat.gz","unk_invoke.dat.gz"],zs=["https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://fastly.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://unpkg.com/pinyin-pro@3/dist/index.min.js"];function Fe(e){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(e)}function Be(e){return/[가-힯ᄀ-ᇿ㄰-㆏]/.test(e)}function $t(e){return/[㐀-䶿一-鿿豈-﫿]/.test(e)}function Ei(e){let t=!1;for(let n of e){if(Fe(n))return"ja";if(Be(n))return"ko";$t(n)&&(t=!0)}return t?"zh":null}async function Si(e,t){if(e.length===0)return[];if(t==="ko")return e.map(s=>$(Ni(s)));if(t==="zh"){let s=await Ii();return s?e.map(o=>$(qi(s,o))):null}let n=e.join(""),i=await Jt(n);if(!i)return null;let r=Ri(e),a=e.map(()=>[]);for(let s of i)Ci(s,r,(o,l,u)=>{let c=u?s.reading||s.surface:Ds(s,l);c&&a[o].push(c)});return e.map((s,o)=>$(a[o].map(l=>String(nt(l))).filter(Boolean).join(" ")))}async function Ai(e,t){let n=$(e);if(!n)return"";if(t==="ko")return $(Ni(n));if(t==="zh"){let a=await Ii();return a?$(qi(a,n)):null}let i=await Jt(n);if(!i)return null;let r=i.map(a=>String(nt(a.reading||a.surface))).map(a=>a.trim()).filter(Boolean).join(" ");return $(r)}async function Mi(e){if(e.length===0)return[];let t=e.join(""),n=await Jt(t);if(!n)return null;let i=Ri(e),r=e.map(()=>[]),a=e.map(()=>!1);for(let s of n)Ci(s,i,(o,l,u)=>{u&&s.hasKanji&&s.reading?(r[o].push(`<ruby>${K(s.surface)}<rt>${K(s.reading)}</rt></ruby>`),a[o]=!0):r[o].push(K(l))});return e.map((s,o)=>a[o]?r[o].join(""):null)}async function _i(e){let t=$(e);if(!t)return"";let n=await Jt(t);if(!n)return null;let i=!1,r=0,a="";for(let s of n)s.start>r&&(a+=K(t.slice(r,s.start))),s.hasKanji&&s.reading?(a+=`<ruby>${K(s.surface)}<rt>${K(s.reading)}</rt></ruby>`,i=!0):a+=K(s.surface),r=s.end;return r<t.length&&(a+=K(t.slice(r))),i?a:""}var Et=null;function Fs(){return Et||(Et=(async()=>{for(let e of Ps){let t=await Bs(e);if(t)return t;console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${e}, trying next source\u2026`)}return console.warn("[Liquid Lyrics] Local Japanese romanization unavailable: no dictionary source worked."),null})(),Et.then(e=>{e||(Et=null)})),Et}async function Bs(e){try{let t=await Promise.all(Os.map(i=>Hs(`${e}/${i}`))),n=new Ti.default;return n.loadTrie(new Int32Array(t[0]),new Int32Array(t[1])),n.loadTokenInfoDictionaries(new Uint8Array(t[2]),new Uint8Array(t[3]),new Uint8Array(t[4])),n.loadConnectionCosts(new Int16Array(t[5])),n.loadUnknownDictionaries(new Uint8Array(t[6]),new Uint8Array(t[7]),new Uint8Array(t[8]),new Uint8Array(t[9]),new Uint32Array(t[10]),new Uint8Array(t[11])),new ki.default(n)}catch{return null}}async function Hs(e){let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);let n=new Uint8Array(await t.arrayBuffer());if(n[0]===31&&n[1]===139){let i=new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(i).arrayBuffer()}return n.buffer}async function Jt(e){if(!e)return[];let t=await Fs();if(!t)return null;let n;try{n=t.tokenize(e)}catch{return null}let i=[],r=0;for(let a of n){let s=String(a?.surface_form??"");if(!s)continue;let o=Number(a?.word_position),l=Number.isFinite(o)&&o>0?o-1:Math.max(r,e.indexOf(s,r)),u=l+s.length;r=u;let c=$t(s),d=typeof a?.reading=="string"&&a.reading!=="*"?a.reading:"",b=d?String(Li(d)):c?"":s;b=js(s,String(a?.pos??""),b),i.push({start:l,end:u,surface:s,reading:b,hasKanji:c})}return i}function js(e,t,n){return t.includes("\u52A9\u8A5E")?e==="\u306F"?"\u308F":e==="\u3078"?"\u3048":e==="\u3092"?"\u304A":n:n}function Ri(e){let t=[],n=0;for(let i of e)t.push([n,n+i.length]),n+=i.length;return t}function Ci(e,t,n){let i=e.end-e.start;if(!(i<=0))for(let r=0;r<t.length;r++){let[a,s]=t[r],o=Math.max(a,e.start),l=Math.min(s,e.end);if(l<=o)continue;let u=e.surface.slice(o-e.start,l-e.start);n(r,u,l-o>=i)}}function Ds(e,t){let n=e.reading||e.surface,i=e.end-e.start;if(i<=0||!n)return"";let r=e.surface.indexOf(t);if(r<0)return"";let a=Math.round(n.length*r/i),s=Math.round(n.length*(r+t.length)/i);return n.slice(a,s)}var Us=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"],Ws=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"],Vs=["","k","k","k","n","n","n","t","l","k","m","p","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"],Ks=["","g","kk","ks","n","nj","nh","d","r","lg","lm","lb","ls","lt","lp","lh","m","b","ps","s","ss","ng","j","ch","k","t","p","h"];function Ni(e){let t=Array.from(e),n="";for(let i=0;i<t.length;i++){let r=t[i].codePointAt(0)??0;if(r<44032||r>55203){n+=t[i];continue}let a=r-44032,s=Math.floor(a/588),o=Math.floor(a%588/28),l=a%28,u=t[i+1]?.codePointAt(0)??0,b=(u>=44032&&u<=55203?Math.floor((u-44032)/588):-1)===11;n+=Us[s]+Ws[o],n+=b?Ks[l]:Vs[l]}return n}async function Ii(){return await $s(zs,()=>!!window.pinyinPro?.pinyin)?window.pinyinPro.pinyin:null}function qi(e,t){try{return String(e(t,{toneType:"symbol",nonZh:"consecutive"}))}catch{return t}}var ze=new Map;async function $s(e,t){for(let n of e)if(await Js(n,t))return!0;return!1}function Js(e,t){if(t())return Promise.resolve(!0);let n=ze.get(e);return n||(n=new Promise(i=>{let r=document.createElement("script");r.src=e,r.onload=()=>i(t()),r.onerror=()=>i(!1),document.head.appendChild(r)}),ze.set(e,n),n.then(i=>{i||ze.delete(e)})),n}function K(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $(e){return String(e??"").replace(/\s+/g," ").trim()}function Fi(e){return e.Type==="Line"?Gs(e.Content??[]):e.Type==="Syllable"?Ys(e.Content??[]):(e.Lines??[]).map(t=>({kind:"static",text:F(t.Text),romanizedText:F(t.RomanizedText)})).filter(t=>t.text)}function Gs(e){let t=[],n=_(e[0]?.StartTime,0);return e.length>0&&n>500&&t.push(Gt(0,n)),e.forEach((i,r)=>{let a=e[r+1],s=Zs(i,a);i.Type==="Interlude"?t.push(Gt(s.start,s.end)):t.push({kind:"line",range:s,text:F(i.Text),romanizedText:F(i.RomanizedText)}),Bi(t,s.end,_(a?.StartTime,NaN))}),t}function Ys(e){let t=[],n=e.map((i,r)=>Xs(i,e[r+1]));return n.length>0&&n[0].range.start>500&&t.push(Gt(0,n[0].range.start)),n.forEach((i,r)=>{t.push({kind:"syllable",range:i.range,text:i.lead.sourceText||i.lead.words.map(a=>a.text).join(" ").trim(),romanizedText:io(i.lead.words),lead:i.lead,backgrounds:i.backgrounds}),Bi(t,i.range.end,n[r+1]?.range.start??NaN)}),t}function Gt(e,t){return{kind:"interlude",range:{start:e,end:Math.max(t,e+250)}}}function Bi(e,t,n){Number.isFinite(n)&&(n-t<3e3||e.push(Gt(t,n)))}function Zs(e,t){let n=_(e.StartTime,0),i=_(t?.StartTime,NaN),r=_(e.EndTime,n+4500),a=Hi(r,i);return{start:n,end:ji(a,n,a,250)}}function Xs(e,t){let n=Oi(e.Lead),i=(e.Background??[]).map(d=>Oi(d)),r=_(t?.Lead?.StartTime,NaN),a=n.range.start,s=Number.isFinite(r)&&r>a?r:a+4500,o=Math.max(n.range.end,...i.map(d=>d.range.end)),l=Hi(o,r),c=Pi(e.Lead)||(e.Background??[]).some(Pi)?Number.POSITIVE_INFINITY:s;return{range:{start:a,end:ji(l,a,s,250,c)},lead:n,backgrounds:i}}function Pi(e){let t=_(e?.StartTime,0),n=Number(e?.EndTime);return Number.isFinite(n)&&n>t}function Oi(e){let t=_(e?.StartTime,0),n=Number(e?.EndTime),i=Number.isFinite(n)&&n>t?_(n,t):t+4500,r={start:t,end:i};return{range:r,sourceText:ro(e),words:to(Qs(e?.Syllables??[],r),r)}}function Qs(e,t){let n=[],i=null,r=!1;return e.forEach((a,s)=>{let o={text:F(a.Text),romanizedText:F(a.RomanizedText),start:_(a.StartTime,t.start),end:_(a.EndTime,t.start+80),animateLetters:!1},l=!!(a.IsPartOfWord||r)&&!J(o.text)&&!J(i?.text??"");l&&i?(i.text+=o.text,i.romanizedText=oo(i.romanizedText,o.romanizedText," "),i.start=Math.min(i.start,o.start),i.end=Math.max(i.end,o.end)):(i&&!l&&n.push(i),i=o),r=!!a.IsPartOfWord,(!a.IsPartOfWord||s===e.length-1)&&i&&(n.push(i),i=null)}),n.filter(a=>a.text)}function to(e,t){if(e.length===0)return[];let n=t.start,i=Math.max(t.end,n+250),r=e.map(l=>({...l,start:U(l.start,n,i),end:U(l.end,n,i)})).filter(l=>l.text.trim().length>0),a=n;r.forEach(l=>{l.start=Math.max(a,l.start),a=l.start});let s=[];r.forEach(l=>{let u=s[s.length-1],c=u?.[0]?.start;u&&c!==void 0&&Math.abs(l.start-c)<=12?(l.start=c,u.push(l)):s.push([l])});let o=[];return s.forEach((l,u)=>{let c=l[0].start,d=s[u+1]?.[0]?.start??i,b=Math.max(c+1,d);if(l.length===1){o.push({...l[0],start:c,end:no(l[0].end,c,b)});return}eo(l,c,b).forEach(T=>o.push(T))}),o.map((l,u)=>{let c=o[u+1]?.start??i,d=Math.max(l.start+1,c),b=Math.min(Math.max(l.end,l.start+1),d);return{...l,end:b,animateLetters:Yt(l.text,l.start,b)}})}function eo(e,t,n){let i=Math.max(n,t+e.length*80),r=e.reduce((s,o)=>s+zi(o.text),0)||e.length,a=t;return e.map((s,o)=>{let l=o===e.length-1,u=e.length-o,c=Math.max(1,i-a),d=(i-t)*zi(s.text)/r,b=Math.max(1,c-(u-1)),T=a,k=l?i:a+U(d,1,b);return a=k,{...s,start:T,end:k}})}function no(e,t,n){return Number.isFinite(e)&&e>t?Math.min(e,n):n}function zi(e){return Math.max(1,Array.from(e.trim()).length)}function Yt(e,t,n){let i=Array.from(e.trim());if(i.length<3)return!1;let r=n-t;return r<750||r/i.length<90?!1:i.some(a=>/[A-Za-z0-9]/.test(a))}function io(e){return e.map(t=>Zt(t.romanizedText)).filter(Boolean).join(" ").trim()}function F(e){return String(e??"").replace(/\s+/g," ").trim()}function Zt(e){let t=F(e);return t&&!J(t)?t:""}function J(e){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(e)}function ro(e){return F(e?.LiquidLyricsOriginalText)||ao(e?.Syllables??[])}function ao(e){let t="",n="",i=!1;return e.forEach(r=>{let a=F(r.Text);if(!a)return;let s=!t||r.IsPartOfWord||i||so(n,a);t+=s?a:` ${a}`,n=a,i=!!r.IsPartOfWord}),t.trim()}function so(e,t){return!e||!t||/^[,.;:!?)]/.test(t)||/[(]$/.test(e)?!0:J(e)||J(t)}function oo(e,t,n){let i=F(e),r=F(t);return i?r?`${i}${n}${r}`:i:r||void 0}function Hi(e,t){return!Number.isFinite(t)||t<=e?e:t-e<3e3?t:e}function ji(e,t,n,i,r=Number.POSITIVE_INFINITY){let a=_(e,n),s=a>=t+i?a:Math.max(n,t+i);return Math.min(s,r)}function _(e,t){let n=Number(e);return Number.isFinite(n)?Math.max(0,n):t}function U(e,t=0,n=1){return Math.min(n,Math.max(t,e))}function He(e,t){return U((t-e.start)/Math.max(1,e.end-e.start))}function pt(e,t,n){let i=U((n-e)/(t-e));return i*i*(3-2*i)}var lo=1200,co=60,uo=750,Ui=3e3,fo=[200,900,2400],po=4e3,Wi="",St=0,Xt=0,Qt=0,je=0,De=!1,Vi=!1,Ki=0,Di=[];function At(){let e=_(Spicetify.Player?.getProgress?.(),0),t=ee(),n=performance.now(),i=St+(n-Xt),r=!Mt(),a=t!==Wi,s=Math.abs(e-i)>lo;if(r||a||s)return Qt++,Ue(e,t,n),je=n,!r&&(a||s)&&te(),e;if(!Vi||n-Ki>Ui*2.5){let u=e-i;if(Math.abs(u)>co){let c=Math.min(120,Math.max(0,n-je));St+=u*Math.min(1,c/uo)}}je=n;let o=St+(n-Xt),l=mt();return l>0?Math.min(o,l):o}function gt(e){let t=Math.max(0,Math.round(e));Qt++,Ue(t),Spicetify.Player?.seek?.(t),te()}function $i(){De||(De=!0,["songchange","onplaypause"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>te())}catch{}}),window.setInterval(()=>{Mt()&&Ji()},Ui),te())}function te(){De&&(Di.forEach(e=>clearTimeout(e)),Di=fo.map(e=>window.setTimeout(()=>void Ji(),e)))}async function Ji(){let e=go();if(typeof e?.getPositionState!="function")return;let t=Qt,n=ee();try{let i=await e.getPositionState({}),r=Number(i?.position);if(!Number.isFinite(r)||r<0||t!==Qt||n!==ee()||!Mt())return;let a=performance.now(),s=St+(a-Xt);if(Math.abs(r-s)>po)return;Vi=!0,Ki=a,Ue(r,n,a)}catch{}}function go(){return Spicetify.Platform?.PlayerAPI?._contextPlayer??Spicetify.Player?.origin?._contextPlayer??null}function Mt(){let e=Spicetify.Player;return typeof e?.isPlaying=="function"?!!e.isPlaying():typeof e?.data?.isPaused=="boolean"?!e.data.isPaused:!!(e?.data?.is_playing??e?.data?.isPlaying)}function mt(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{};return _(t.duration_ms??t.duration??e?.duration?.milliseconds??e?.duration_ms??Spicetify.Player?.data?.duration,0)}function ee(){return String(Spicetify.Player?.data?.item?.uri??"")}function Ue(e,t=ee(),n=performance.now()){Wi=t,St=Math.max(0,e),Xt=n}var _t=new Set,it=null;function ne(e){return _t.add(e),it===null&&(it=requestAnimationFrame(Gi)),()=>{_t.delete(e),_t.size===0&&it!==null&&(cancelAnimationFrame(it),it=null)}}function Gi(e){if(_t.size===0){it=null;return}it=requestAnimationFrame(Gi);let t=At();for(let n of _t)n(t,e)}var Yi=900,mo=.92,ho=5e3,yo=180,Zi=1100,We=.75,bo=8,E=-999,ht=class{constructor(t){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=-1;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.romanMode="off";this.songLang=null;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.tick=(t,n)=>{if(t===this.lastProgress)return;this.lastProgress=t;let i=this.findActiveIndex(t);i!==this.activeIndex&&(this.applyPosition(i,t),this.activeIndex=i),i>=0&&(this.virtual&&this.mountAround(i),this.updateActiveLine(this.records[i],t)),this.outgoingLines.length>0&&this.updateOutgoingLines(t)};this.onUserScroll=()=>{this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},ho)};this.onContainerClick=t=>{let n=t.target?.closest(".liquid-lyrics-line");if(!n)return;let i=this.recordByEl.get(n);!i||!Number.isFinite(i.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),gt(i.start),this.forceSync(),this.scrollToRecord(i))};this.container=t.container,this.scroller=t.scroller??t.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...t},this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",n=>{(n.pointerType==="mouse"||n.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasJapanese(){return this.songLang==="ja"}get hasLyrics(){return this.records.length>0}setLyrics(t){if(this.clear(),!t)return;let n=Fi(t);if(n.length===0)return;let i=this.options.virtualize&&n.some(r=>r.kind==="syllable");if(this.records=n.map((r,a)=>this.buildLineRecord(r,a)),this.records.forEach(r=>this.recordByEl.set(r.el,r)),this.hasTimeline=this.records.some(r=>Number.isFinite(r.start)),this.songLang=Ei(n.map(r=>r.kind==="interlude"?"":r.text)),i)this.initVirtualizer();else{let r=document.createDocumentFragment();this.records.forEach(a=>r.appendChild(a.el)),this.container.appendChild(r)}this.syncClock(),this.forceSync()}clear(){this.generation++,this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=-1,this.lastProgress=NaN,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.songLang=null,this.container.replaceChildren()}setEnabled(t){this.enabled!==t&&(this.enabled=t,this.syncClock(),t&&this.forceSync())}setRomanized(t,n){this.romanMode=t;let i=[],r=!1;for(let a of this.records){let s=a.line;if(s.kind==="interlude"||!s.text)continue;let o=s.text,l=J(o),u=Zt(s.romanizedText);r||(r=l||!!u);let c=this.getLineLanguage(o)==="ja";if(s.kind==="line"||s.kind==="static"){if(t==="romaji"){let d=typeof a.localLineRoman=="string"?a.localLineRoman:"",b=u||d;b?this.setLineContent(a,`t:${b}`,b):(this.setLineContent(a,`t:${o}`,o),n&&l&&a.localLineRoman!==!1&&i.push(a))}else t==="furigana"&&c?typeof a.lineFurigana=="string"&&a.lineFurigana?this.setLineHtml(a,a.lineFurigana,o):(this.setLineContent(a,`t:${o}`,o),n&&a.lineFurigana!==!1&&i.push(a)):this.setLineContent(a,`t:${o}`,o);continue}if(!l){this.applyWordRomanization(a,t==="romaji");continue}t==="romaji"?Array.isArray(a.localWordRoman)?this.applyLocalWordRomanization(a):(this.restoreOriginalWords(a),n&&a.localWordRoman!==!1&&i.push(a)):t==="furigana"&&c?Array.isArray(a.wordFurigana)?this.applyWordFurigana(a):(this.restoreOriginalWords(a),n&&a.wordFurigana!==!1&&i.push(a)):this.restoreOriginalWords(a)}this.hasRomanizationValue=r,this.options.onRomanizationAvailability?.(r),i.length>0&&this.processLocalRomanization(i,t)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(t,n){let i=t.kind!=="static",r=this.options.variant==="sidebar"&&(t.kind==="line"||t.kind==="syllable"),a=document.createElement(r?"button":"div");a instanceof HTMLButtonElement&&(a.type="button"),a.className="liquid-lyrics-line";let s={index:n,el:a,line:t,start:i?t.range.start:Number.POSITIVE_INFINITY,end:i?t.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:E,interludeVis:E,interludeY:E,interludeScale:E,displayText:t.kind==="interlude"?"":t.text,displayKey:"orig",localWordRoman:null,wordFurigana:null,localLineRoman:null,lineFurigana:null,wrapper:null,height:0,rowOffset:E};if(t.kind==="interlude"){a.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&a.setAttribute("aria-hidden","true");for(let o=0;o<3;o++){let l=document.createElement("span");l.className="ll-interlude-dot",a.appendChild(l),s.dots.push(l),s.dotLift.push(0)}}else if(t.kind==="static")a.classList.add("liquid-lyrics-static"),a.textContent=t.text;else if(t.kind==="line")a.textContent=t.text;else{a.classList.add("ll-syllable-line");let o=document.createElement("div");o.className="ll-vocal-line ll-lead-vocal",a.appendChild(o),s.leadEl=o;let l=this.buildWordSpans(o,t.lead.words,"");if(this.options.renderBackgrounds)for(let u of t.backgrounds){let c=document.createElement("div");c.className="ll-vocal-line ll-background-vocal",a.appendChild(c),s.bgWords.push(...this.buildWordSpans(c,u.words,"ll-bg-syllable"))}s.words=Xi(l,s.bgWords)}return s}buildWordSpans(t,n,i){let r=[];return n.forEach((a,s)=>{let o=document.createElement("span");o.className=i?`ll-syllable ${i}`:"ll-syllable",a.animateLetters&&o.classList.add("ll-long-syllable"),J(a.text)&&o.classList.add("ll-cjk-syllable"),s===n.length-1&&o.classList.add("LastWordInLine");let l=[];if(a.rubyHtml)o.classList.add("ll-ruby-syllable"),o.setAttribute("aria-label",a.text),o.innerHTML=a.rubyHtml;else if(a.animateLetters){o.setAttribute("aria-label",a.text);for(let u of a.text){let c=document.createElement("span");c.className="ll-letter",c.textContent=u,o.appendChild(c),l.push(c)}}else o.textContent=a.text;t.appendChild(o),r.push({el:o,start:a.start,end:a.end,animateLetters:a.animateLetters,letters:l,state:"idle",gradientUnit:E,lastLift:0,letterFill:null,letterLift:null})}),r}syncClock(){let t=this.enabled&&this.hasTimeline&&this.records.length>0;t&&!this.unsubscribeClock?this.unsubscribeClock=ne(this.tick):t||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(At(),performance.now()))}findActiveIndex(t){let n=this.records;if(n.length===0)return-1;let i=0,r=n.length-1,a=-1;for(;i<=r;){let l=i+r>>1;n[l].start<=t?(a=l,i=l+1):r=l-1}if(a<0)return-1;let s=Math.max(0,a-4);for(let l=a;l>=s;l--){let u=n[l];if(t>=u.start&&t<u.end)return l}if(this.activeIndex>=0&&this.activeIndex<n.length){let l=n[this.activeIndex];if(t>=l.start&&t<l.end+Yi)return this.activeIndex}let o=n[a];return o.end<=t&&t-o.end<=Yi?a:-1}applyPosition(t,n){let i=this.activeIndex,r=this.records;for(let a=0;a<r.length;a++){let s=r[a],o=s.state==="active";if(a===t){o||this.activateLine(s,n);continue}(t>=0?a<t:s.end<=n)?o&&s.line.kind!=="interlude"&&s.end>n?this.beginOutgoing(s):(s.state!=="past"||o)&&this.completeLine(s,o):(s.state!=="future"||o)&&this.resetLine(s)}if(t>=0&&!this.userScrolling){let a=i>=0?r[i]:null,s=r[t];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),a?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===t&&this.scrollToRecord(s)},yo):this.scrollToRecord(s)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(t,n){t.state="active",t.outgoing=!1,t.progressUnit=E,t.interludeVis=E,t.interludeY=E,t.interludeScale=E;let i=t.el.classList;if(i.remove("past","future","ll-finishing","ll-outgoing"),i.add("active"),t.line.kind==="syllable"){t.dirty=!0;for(let r of t.words)this.syncWordState(r,n)}else t.line.kind==="interlude"&&(t.dirty=!0)}beginOutgoing(t){t.state="past",t.outgoing=!0;let n=t.el.classList;n.remove("active","future","ll-finishing"),n.add("past","ll-outgoing"),t.glow&&(n.remove("ll-glow"),t.glow=!1),this.outgoingLines.includes(t)||this.outgoingLines.push(t)}updateOutgoingLines(t){for(let n=this.outgoingLines.length-1;n>=0;n--){let i=this.outgoingLines[n];if(!i.outgoing||i.state!=="past"){this.outgoingLines.splice(n,1);continue}if(t>=i.end){this.finishOutgoing(i),this.outgoingLines.splice(n,1);continue}if(t<i.start){this.outgoingLines.splice(n,1),this.resetLine(i);continue}i.line.kind==="syllable"?this.updateWords(i,t):this.writeLineProgress(i,He(i,t)*100)}}finishOutgoing(t){t.outgoing=!1;let n=t.el.classList;if(n.remove("ll-outgoing"),n.add("ll-finishing"),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let i of t.words)i.state!=="sung"&&this.setWordState(i,"sung")}}completeLine(t,n){t.state="past",t.outgoing=!1;let i=t.el.classList;if(i.remove("active","future","ll-outgoing"),i.add("past"),i.toggle("ll-finishing",n),t.glow&&(i.remove("ll-glow"),t.glow=!1),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let r of t.words)r.state!=="sung"&&this.setWordState(r,"sung");for(let r of t.dots)r.classList.add("lit"),Qi(r);t.dotLift.fill(0)}}resetLine(t){t.state="future",t.outgoing=!1;let n=t.el.classList;if(n.remove("active","past","ll-finishing","ll-outgoing"),n.add("future"),t.glow&&(n.remove("ll-glow"),t.glow=!1),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let i of t.words)i.state!=="future"&&this.setWordState(i,"future");for(let i of t.dots)i.classList.remove("lit"),Qi(i);t.dotLift.fill(0)}}clearLineInline(t){let n=t.el.style;t.progressUnit!==E&&(n.removeProperty("--line-progress"),t.progressUnit=E),t.interludeVis!==E&&(n.removeProperty("--interlude-visibility"),n.removeProperty("--interlude-y"),n.removeProperty("--interlude-scale"),t.interludeVis=E,t.interludeY=E,t.interludeScale=E)}updateActiveLine(t,n){let i=He(t,n);if(t.line.kind==="interlude"){this.updateInterlude(t,i);return}let r=i>mo;r!==t.glow&&(t.glow=r,t.el.classList.toggle("ll-glow",r)),t.line.kind==="syllable"?this.updateWords(t,n):this.writeLineProgress(t,i*100)}writeLineProgress(t,n){let i=Math.round(n*2)/2;i!==t.progressUnit&&(t.progressUnit=i,t.el.style.setProperty("--line-progress",String(i)))}updateWords(t,n){for(let i of t.words){let r=n<i.start?"future":n>=i.end?"sung":"singing";r!==i.state&&this.setWordState(i,r),r==="singing"&&this.updateSingingWord(i,n)}}syncWordState(t,n){let i=n<t.start?"future":n>=t.end?"sung":"singing";i!==t.state&&this.setWordState(t,i)}setWordState(t,n){t.state=n;let i=t.el.classList;i.toggle("singing",n==="singing"),i.toggle("sung",n==="sung"),i.toggle("future",n==="future"),n!=="singing"&&this.clearWordInline(t)}clearWordInline(t){let n=t.el.style;if(t.gradientUnit!==E&&(n.removeProperty("--syl-progress"),t.gradientUnit=E),t.lastLift!==0&&(n.transform="",t.lastLift=0),!(!t.letterFill||!t.letterLift))for(let i=0;i<t.letters.length;i++){let r=t.letters[i];t.letterFill[i]!==E&&(r.style.removeProperty("--letter-progress"),t.letterFill[i]=E),t.letterLift[i]!==0&&(r.style.transform="",t.letterLift[i]=0)}}updateSingingWord(t,n){let i=U((n-t.start)/Math.max(1,t.end-t.start));if(t.animateLetters){this.updateLetters(t,i);return}let r=Math.round(-20+120*i);r!==t.gradientUnit&&(t.gradientUnit=r,t.el.style.setProperty("--syl-progress",String(r)));let a=Math.sin(i*Math.PI);Math.abs(a-t.lastLift)>.01&&(t.lastLift=a,t.el.style.transform=`translate3d(0, ${(-5*a).toFixed(2)}px, 0) scale(${(1+.018*a).toFixed(4)})`)}updateLetters(t,n){let i=t.letters,r=i.length;if(r===0)return;(!t.letterFill||!t.letterLift)&&(t.letterFill=new Array(r).fill(E),t.letterLift=new Array(r).fill(0));let a=Math.max(.16,1.8/r),s=n+a*pt(.7,1,n);for(let o=0;o<r;o++){let l=i[o],u=Math.round(-20+120*U(n*r-o)),c=t.letterFill[o];(Math.abs(u-c)>=4||u!==c&&(u===100||u===-20))&&(t.letterFill[o]=u,l.style.setProperty("--letter-progress",String(u)));let d=1-U(Math.abs(s-(o+.5)/r)/a),b=d<=0?0:pt(0,1,d);Math.abs(b-t.letterLift[o])>.008&&(t.letterLift[o]=b,l.style.transform=b===0?"":`translate3d(0, ${(-5.5*b).toFixed(2)}px, 0) scale(${(1+.02*b).toFixed(4)})`)}}updateInterlude(t,n){let i=pt(0,.22,n),r=1-pt(.99,1,n),a=Math.round(Math.min(i,r)*200)/200,s=Math.round(-24*pt(.76,1,n)*10)/10,o=Math.round((.72+.28*i)*500)/500,l=t.el.style;a!==t.interludeVis&&(t.interludeVis=a,l.setProperty("--interlude-visibility",String(a))),s!==t.interludeY&&(t.interludeY=s,l.setProperty("--interlude-y",`${s}px`)),o!==t.interludeScale&&(t.interludeScale=o,l.setProperty("--interlude-scale",String(o)));let u=this.options.dotLiftPx;for(let c=0;c<t.dots.length;c++){let d=t.dots[c],b=c/3,T=(c+1)/3;d.classList.toggle("lit",n>=b),d.style.opacity=n>=.99?String(r):"";let k=0;n>=b&&n<T&&(k=Math.sin((n-b)/(T-b)*Math.PI)*u),(Math.abs(k-t.dotLift[c])>.1||k===0&&t.dotLift[c]!==0)&&(t.dotLift[c]=k,d.style.transform=k===0?"":`translateY(${(-k).toFixed(2)}px)`)}}scrollToRecord(t){let n=this.scroller,i,r;if(this.virtual)this.mountAround(t.index),i=this.virtual.space.offsetTop+(this.virtual.offsets[t.index]??0),r=this.virtual.heights[t.index]??t.el.offsetHeight;else{if(!t.el.isConnected)return;i=vo(t.el,n),r=t.el.offsetHeight}n.scrollTo({top:Math.max(0,i-n.clientHeight/2+r/2),behavior:"smooth"})}setLineContent(t,n,i){t.displayKey!==n&&(t.displayKey=n,t.displayText=i,t.el.textContent=i,this.refreshVirtualHeight(t))}setLineHtml(t,n,i){let r=`h:${n}`;t.displayKey!==r&&(t.displayKey=r,t.displayText=i,t.el.innerHTML=n,this.refreshVirtualHeight(t))}getLineLanguage(t){return Fe(t)?"ja":Be(t)?"ko":$t(t)?this.songLang==="ja"?"ja":"zh":null}applyLocalWordRomanization(t){if(t.line.kind!=="syllable"||!Array.isArray(t.localWordRoman))return;let n=t.localWordRoman,i=t.line.lead.words.map((r,a)=>{let s=n[a]||r.text;return s===r.text?r:{...r,text:s,animateLetters:Yt(s,r.start,r.end)}});this.rebuildLead(t,i,"local-roman",!0)}applyWordFurigana(t){if(t.line.kind!=="syllable"||!Array.isArray(t.wordFurigana))return;let n=t.wordFurigana,i=!1,r=t.line.lead.words.map((a,s)=>{let o=n[s];return o?(i=!0,{...a,rubyHtml:o,animateLetters:!1}):a});if(!i){this.restoreOriginalWords(t);return}this.rebuildLead(t,r,"furigana",!1)}async processLocalRomanization(t,n){let i=this.generation;for(let r of t){if(i!==this.generation||this.romanMode!==n)return;let a=r.line;if(a.kind==="interlude")continue;let s=this.getLineLanguage(a.text);if(a.kind==="syllable"){let o=a.lead.words.map(l=>l.text);if(n==="romaji"){let l=s?await Si(o,s):null;if(i!==this.generation)return;r.localWordRoman=l??!1,this.romanMode==="romaji"&&l&&this.applyLocalWordRomanization(r)}else if(n==="furigana"){let l=await Mi(o);if(i!==this.generation)return;r.wordFurigana=l??!1,this.romanMode==="furigana"&&l&&this.applyWordFurigana(r)}}else if(n==="romaji"){let o=s?await Ai(a.text,s):null;if(i!==this.generation)return;r.localLineRoman=o||!1,this.romanMode==="romaji"&&o&&this.setLineContent(r,`t:${o}`,o)}else if(n==="furigana"){let o=await _i(a.text);if(i!==this.generation)return;r.lineFurigana=o||!1,this.romanMode==="furigana"&&o&&this.setLineHtml(r,o,a.text)}if(await new Promise(o=>requestAnimationFrame(()=>o())),i!==this.generation)return}}applyWordRomanization(t,n){if(t.line.kind!=="syllable")return;let i=!1,r=t.line.lead.words.map(a=>{let s=n?Zt(a.romanizedText):"";return!s||s===a.text?a:(i=!0,{...a,text:s,animateLetters:Yt(s,a.start,a.end)})});this.rebuildLead(t,r,i?"roman-words":"orig",!1)}restoreOriginalWords(t){t.line.kind==="syllable"&&this.rebuildLead(t,t.line.lead.words,"orig",!1)}rebuildLead(t,n,i,r){if(t.displayKey===i||!t.leadEl)return;t.displayKey=i,t.el.classList.toggle("ll-context-romanized",r),t.leadEl.replaceChildren();let a=this.buildWordSpans(t.leadEl,n,"");if(t.words=Xi(a,t.bgWords),t.displayText=n.map(s=>s.text).join(" ").trim(),t.state==="active"){t.dirty=!0;let s=At();for(let o of t.words)this.syncWordState(o,s)}else if(t.state==="past")for(let s of a)this.setWordState(s,"sung");this.refreshVirtualHeight(t)}initVirtualizer(){let t=document.createElement("div");t.className="ll-syllable-virtual-space",this.container.appendChild(t),this.container.classList.add("ll-syllable-virtualized");let n=new Map;this.records.forEach(r=>{let a=document.createElement("div");a.className="ll-syllable-virtual-row",a.appendChild(r.el),r.wrapper=a,r.height=tr(r),n.set(r.el,r.index)});let i={space:t,heights:this.records.map(r=>r.height),offsets:[],mounted:new Set,lineToIndex:n,resizeObserver:new ResizeObserver(r=>{let a=!1;for(let s of r){let o=n.get(s.target);if(o===void 0)continue;let l=Math.max(1,s.borderBoxSize?.[0]?.blockSize??s.target.offsetHeight);Math.abs((i.heights[o]??0)-l)<We||(i.heights[o]=l,a=!0)}a&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};i.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",i.onScroll,{passive:!0}),this.virtual=i,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let t=this.virtual;t&&(t.raf!==null&&cancelAnimationFrame(t.raf),this.scroller.removeEventListener("scroll",t.onScroll),t.resizeObserver.disconnect(),t.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let t=this.virtual;!t||t.raf!==null||(t.raf=requestAnimationFrame(()=>{t.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let t=this.virtual;if(!t)return;let n=this.scroller.scrollTop-t.space.offsetTop,i=n-Zi,r=n+this.scroller.clientHeight+Zi,a=new Set;for(let s=0;s<this.records.length;s++){let o=t.offsets[s]??0;o+(t.heights[s]??0)>=i&&o<=r&&a.add(s)}if(this.activeIndex>=0){let s=Math.max(0,this.activeIndex-3),o=Math.min(this.records.length-1,this.activeIndex+3);for(let l=s;l<=o;l++)a.add(l)}for(let s of t.mounted)!a.has(s)&&s!==this.activeIndex&&this.unmountVirtualLine(s);for(let s of a)this.mountVirtualLine(s);this.layoutMountedRows()}mountAround(t){if(!this.virtual)return;let n=Math.max(0,t-1),i=Math.min(this.records.length-1,t+1),r=!1;for(let a=n;a<=i;a++)r=this.mountVirtualLine(a)||r;r&&this.layoutMountedRows()}mountVirtualLine(t){let n=this.virtual,i=this.records[t];if(!n||!i?.wrapper||n.mounted.has(t))return!1;n.space.appendChild(i.wrapper),n.mounted.add(t),i.rowOffset=E,n.resizeObserver.observe(i.el);let r=Math.max(1,i.el.offsetHeight);return Math.abs((n.heights[t]??0)-r)>=We&&(n.heights[t]=r,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(t){let n=this.virtual,i=this.records[t];!n||!i?.wrapper||!n.mounted.has(t)||(n.resizeObserver.unobserve(i.el),i.wrapper.parentElement===n.space&&n.space.removeChild(i.wrapper),n.mounted.delete(t))}recomputeVirtualOffsets(){let t=this.virtual;if(!t)return;let n=0;t.offsets=t.heights.map(i=>{let r=n;return n+=Math.max(1,i)+bo,r}),t.space.style.height=`${Math.max(1,n)}px`}layoutMountedRows(){let t=this.virtual;if(t)for(let n of t.mounted){let i=this.records[n];if(!i?.wrapper)continue;let r=Math.round(t.offsets[n]??0);r!==i.rowOffset&&(i.rowOffset=r,i.wrapper.style.transform=`translate3d(0, ${r}px, 0)`)}}refreshVirtualHeight(t){let n=this.virtual;if(!n)return;let i=t.el.isConnected?Math.max(1,t.el.offsetHeight):tr(t);Math.abs((n.heights[t.index]??0)-i)<We||(n.heights[t.index]=i,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}};function Xi(e,t){return t.length===0?e:[...e,...t].sort((n,i)=>n.start-i.start)}function Qi(e){e.style.transform&&(e.style.transform=""),e.style.opacity&&(e.style.opacity="")}function tr(e){if(e.line.kind==="interlude")return 54;let t=Math.max(1,e.displayText.length),n=Math.max(1,Math.ceil(t/42)),i=e.line.kind==="syllable"?e.line.backgrounds.length:0;return 18+n*45+i*24}function vo(e,t){let n=0,i=e;for(;i&&i!==t;){n+=i.offsetTop;let r=i.offsetParent;i=r instanceof HTMLElement&&t.contains(r)?r:null}return n}var O="liquid-lyrics-panel",lr="liquid-lyrics-song-card-visible",Rt="liquify-bg-mode",Ot="liquid-lyrics:romanization",xo="https://github.com/NMWplays/Liquid-Lyrics",wo="https://discord.gg/xGUq5mhWKA",Lo=500,R=null,qt=null,ie=null,Ve=0,er="",nr="",re=-1,Ke=-1,ir=!1,rr=!1,ar=!1,Pt=!0,yt,G=null;function vt(){let e=document.getElementById(O);if(e)return e;let t=document.createElement("div");t.id=O,t.className="liquid-lyrics-panel";let n=document.createElement("div");n.className="liquid-lyrics-glass-bg";let i=Eo(),r=So(),a=document.createElement("div");a.className="liquid-lyrics-header";let s=document.createElement("span");s.className="liquid-lyrics-title",s.textContent="Liquid Lyrics";let o=document.createElement("div");o.className="ll-header-actions",o.append(sr("ll-header-btn ll-github-btn",To,"Star on GitHub",xo),sr("ll-header-btn ll-discord-btn",ko,"Join the Discord",wo)),a.append(s,o);let l=document.createElement("div");l.className="liquid-lyrics-view";let u=Ao(),c=document.createElement("div");c.className="liquid-lyrics-content",l.append(u,c);let d=Mo();return t.append(i,n,r,a,l,d),hr(t),bt(t),(document.querySelector(".Root__main-view")??document.body).appendChild(t),R=new ht({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:T=>{t.classList.toggle("ll-has-romanization",T),B()}}),rt(),B(),ir||(ir=!0,document.addEventListener("fullscreenchange",Ko)),ar||(ar=!0,window.addEventListener(Ot,()=>{R?.setRomanized(I(),S()),B()})),Ho(),t}function se(){let e=vt();Pt=!0,e.classList.add("visible"),rt(),B(),R?.setEnabled(!0),pr();let t=e.closest(".Root__main-view");if(t)for(let n of Array.from(t.children)){let i=n;i.id===O||!i.style||(i.dataset.liquidHidden===void 0&&(i.dataset.liquidHidden=`${i.style.opacity}|${i.style.pointerEvents}`),i.style.opacity="0",i.style.pointerEvents="none")}}function oe(){let e=document.getElementById(O);if(!e)return;e.classList.remove("visible"),R?.setEnabled(!1),gr(),Ye(e,!1),le();let t=e.closest(".Root__main-view");if(t)for(let n of Array.from(t.children)){let i=n;if(i.id===O||i.dataset.liquidHidden===void 0)continue;let[r="",a=""]=i.dataset.liquidHidden.split("|");i.style.opacity=r,i.style.pointerEvents=a,delete i.dataset.liquidHidden}}function cr(){S()?oe():se()}function S(){return document.getElementById(O)?.classList.contains("visible")??!1}function ur(e=S()){let t=vt();Pt=e,e?se():(t.classList.add("visible"),rt(),B(),R?.setEnabled(!0),pr()),Ye(t,!0),Q(),B(),le(),bt(t)}function $e(e){if(vt(),!R)return;R.setLyrics(e);let t=I();R.setRomanized(t,t!=="off"),R.setEnabled(S()),rt()}function zt(e){let t=vt();if(!R)return;R.setLyrics(null),rt();let n=document.createElement("div");n.className="liquid-lyrics-empty",n.textContent=e,R.container.appendChild(n),t.classList.remove("ll-has-romanization"),B()}var dr={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>'},To='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',ko='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function sr(e,t,n,i){let r=document.createElement("button");return r.type="button",r.className=e,r.setAttribute("aria-label",n),r.innerHTML=t,r.addEventListener("click",a=>{a.stopPropagation(),window.open(i,"_blank")}),q(r,n),r}function Eo(){let e=document.createElement("div");e.className="liquid-lyrics-fullscreen-bg";for(let t=0;t<2;t++){let n=document.createElement("div");n.className="ll-fullscreen-bg-tile",e.appendChild(n)}return e}function So(){let e=document.createElement("div");return e.className="liquid-lyrics-transparent-controls",e.setAttribute("aria-hidden","true"),e}function Ao(){let e=document.createElement("aside");e.className="liquid-lyrics-song-card";let t=document.createElement("div");t.className="ll-song-card-cover-wrap";let n=document.createElement("img");n.className="ll-song-card-cover",n.alt="",n.decoding="async",n.loading="lazy",t.appendChild(n);let i=document.createElement("div");i.className="ll-song-card-controls",i.append(Y("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>Ct(["toggleShuffle"])),Y("ll-song-card-btn","previous","Previous",()=>Ct(["back","previous","skipToPrevious"])),Y("ll-song-card-btn ll-song-card-play","play","Play",()=>{Ct(["togglePlay"]),window.setTimeout(rt,60)}),Y("ll-song-card-btn","next","Next",()=>Ct(["next","skipToNext"])),Y("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>Ct(["toggleRepeat"])));let r=document.createElement("div");r.className="playback-bar ll-song-card-progress",r.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let a=document.createElement("div");a.className="ll-song-card-info";let s=document.createElement("div");s.className="ll-song-card-title";let o=document.createElement("button");o.type="button",o.className="ll-song-card-link ll-song-card-album",q(o,"Open album");let l=document.createElement("button");return l.type="button",l.className="ll-song-card-link ll-song-card-artist",q(l,"Open artist"),a.append(s,o,l),e.append(t,i,r,a),qt={card:e,cover:n,title:s,album:o,artist:l,playButton:e.querySelector(".ll-song-card-play"),shuffleButton:e.querySelector(".ll-song-card-shuffle"),repeatButton:e.querySelector(".ll-song-card-repeat"),progressTrack:r.querySelector(".ll-card-progress-track"),progressFill:r.querySelector(".ll-card-progress-fill"),progressThumb:r.querySelector(".ll-card-progress-thumb"),currentTime:r.querySelector(".ll-card-current"),durationTime:r.querySelector(".ll-card-duration")},Ro(qt),e}function Mo(){let e=document.createElement("div");return e.className="liquid-lyrics-control-pill",e.append(Y("ll-control-btn ll-card-toggle","cover","Song card",Do),Y("ll-control-btn ll-roman-toggle","roman","Romanization",Uo),Y("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",Vo)),e}function Y(e,t,n,i){let r=document.createElement("button");return r.type="button",r.className=e,r.dataset.icon=t,r.setAttribute("aria-label",n),r.innerHTML=dr[t],r.addEventListener("click",a=>{a.stopPropagation(),i()}),q(r,n),r}function fr(e,t){!e||e.dataset.icon===t||(e.dataset.icon=t,e.innerHTML=dr[t])}function rt(){let e=qt;if(!e)return;let t=Co();t.cover?(e.cover.src!==t.cover&&(e.cover.src=t.cover),e.card.classList.remove("ll-no-cover")):(e.cover.removeAttribute("src"),e.card.classList.add("ll-no-cover")),jo(t.cover),e.title.textContent=t.title,e.album.textContent=t.album,e.album.disabled=!t.albumUri,e.album.onclick=()=>or(t.albumUri),e.artist.textContent=t.artist,e.artist.disabled=!t.artistUri,e.artist.onclick=()=>or(t.artistUri),Ft(),Bt()}function Ft(){let e=qt;if(!e)return;let t=Mt(),n=t?"Pause":"Play";fr(e.playButton,t?"pause":"play"),e.playButton.setAttribute("aria-label",n),e.playButton.dataset.tooltip=n,It(e.shuffleButton,Fo());let i=Bo();It(e.repeatButton,i!=="off"),e.repeatButton.classList.toggle("ll-repeat-one",i==="track");let r=i==="track"?"Repeat one":i==="context"?"Repeat all":"Repeat";e.repeatButton.setAttribute("aria-label",r),e.repeatButton.dataset.tooltip=r}function pr(){ie||(Ve=0,re=-1,Ke=-1,ie=ne(_o),Ft(),Bt())}function gr(){ie?.(),ie=null}function _o(e,t){Bt(e),t-Ve>=Lo&&(Ve=t,Ft())}function Bt(e=mr()){let t=qt;if(!t)return;let n=mt(),i=n>0?ae(e/n):0;if(!t.progressTrack.classList.contains("ll-previewing")&&Math.abs(i-re)>2e-5){re=i,t.progressFill.style.transform=`scaleX(${i.toFixed(5)})`,t.progressThumb.style.left=`${(i*100).toFixed(3)}%`;let o=Math.round(i*100);o!==Ke&&(Ke=o,t.progressTrack.setAttribute("aria-valuenow",String(o)),t.progressTrack.setAttribute("aria-valuetext",`${Nt(e)} of ${Nt(n)}`))}let a=Nt(e);a!==er&&(er=a,t.currentTime.textContent=a);let s=Nt(n);s!==nr&&(nr=s,t.durationTime.textContent=s)}function mr(){return $o(Spicetify.Player?.getProgress?.(),0)}function Ro(e){let t=e.progressTrack,n=t.querySelector(".ll-card-preview-time"),i=0,r=0,a=c=>{let d=t.getBoundingClientRect();return ae((c.clientX-d.left)/Math.max(1,d.width))},s=c=>{let d=mt();d<=0||(t.classList.add("ll-previewing"),n&&(n.textContent=Nt(d*c),n.style.left=`${c*100}%`),e.progressFill.style.transform=`scaleX(${c.toFixed(4)})`,e.progressThumb.style.left=`${(c*100).toFixed(2)}%`)},o=c=>(r=c,i||(i=requestAnimationFrame(()=>{i=0,s(r)})),c),l=()=>{t.dataset.dragging!=="true"&&(t.classList.remove("ll-previewing"),i&&(cancelAnimationFrame(i),i=0),re=-1,Bt())},u=c=>{let d=mt();if(d<=0)return;let b=o(a(c));gt(d*b)};t.addEventListener("pointerenter",c=>o(a(c))),t.addEventListener("pointermove",c=>o(a(c))),t.addEventListener("pointerleave",l),t.addEventListener("blur",l),t.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),t.dataset.dragging="true",t.setPointerCapture?.(c.pointerId),u(c);let d=T=>u(T),b=T=>{u(T),delete t.dataset.dragging,l(),t.releasePointerCapture?.(c.pointerId),window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",b)};window.addEventListener("pointermove",d),window.addEventListener("pointerup",b,{once:!0})}),t.addEventListener("keydown",c=>{let d=mt();if(d<=0)return;let b=mr(),T=c.shiftKey?15e3:5e3;c.key==="ArrowLeft"?(c.preventDefault(),gt(Math.max(0,b-T))):c.key==="ArrowRight"&&(c.preventDefault(),gt(Math.min(d,b+T)))})}function Co(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{},n=Array.isArray(e?.artists)?e.artists.map(r=>r?.name).filter(Boolean).join(", "):"",i=Array.isArray(e?.artists)?e.artists.find(r=>r?.uri):null;return{title:e?.name||t.title||t.track_name||"Unknown track",artist:n||t.artist_name||t.artist||t.album_artist_name||"Unknown artist",album:e?.album?.name||t.album_title||t.album_name||"Unknown album",cover:No(e,t),artistUri:i?.uri||Oo(t.artist_uri||t.artist_uris||""),albumUri:e?.album?.uri||t.album_uri||""}}function No(e,t){let n=[t.image_xlarge_url,t.image_large_url,t.image_url,t.album_image_url,t.cover_url,e?.album?.images?.[0]?.url,e?.images?.[0]?.url];for(let i of n){let r=Io(String(i??""));if(r)return qo(r)}return Po()}function Io(e){return e?e.startsWith("spotify:image:")?e.replace("spotify:image:","https://i.scdn.co/image/"):e:""}function qo(e){return e.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function Po(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function Oo(e){return String(e||"").split(",")[0]?.split(";")[0]?.trim()||""}function or(e){let t=zo(e);if(!t)return;let n=Spicetify.Platform?.History;typeof n?.push=="function"&&(n.push(t),oe())}function zo(e){let t=String(e||"").split(":");if(t.length<3||t[0]!=="spotify")return"";let n=t[1],i=t[2];return!i||!["album","artist","track","playlist"].includes(n)?"":`/${n}/${i}`}function Fo(){let e=Spicetify.Player;if(typeof e?.getShuffle=="function")return!!e.getShuffle();let t=e?.data??{};return!!(t.shuffle??t.shuffling??t.options?.shuffling??t.playback_options?.shuffling??t.context?.metadata?.shuffle)}function Bo(){let e=Spicetify.Player,t=e?.data??{},n=typeof e?.getRepeat=="function"?e.getRepeat():t.repeat??t.repeatMode??t.repeat_mode??t.options?.repeat??t.playback_options?.repeat??t.context?.metadata?.repeat;if(t.options?.repeatingTrack||t.playback_options?.repeating_track)return"track";if(t.options?.repeatingContext||t.playback_options?.repeating_context)return"context";if(typeof n=="number")return n===2?"track":n===1?"context":"off";let i=String(n??"").toLowerCase();return i.includes("track")||i.includes("song")||i==="one"?"track":i.includes("context")||i.includes("all")||i==="playlist"||i==="on"?"context":"off"}function Ho(){rr||(rr=!0,["songchange","onplaypause","onqueuechange"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>{Ft(),Bt()})}catch{}}))}function Ct(e){let t=Spicetify.Player;for(let n of e)if(typeof t?.[n]=="function"){t[n](),window.setTimeout(rt,80),window.setTimeout(Ft,180);return}}function jo(e){let n=document.getElementById(O)?.querySelector(".liquid-lyrics-fullscreen-bg");n&&(n.classList.toggle("ll-has-bg",!!e),n.querySelectorAll(".ll-fullscreen-bg-tile").forEach(i=>{let r=e?`url("${e}")`:"";i.style.backgroundImage!==r&&(i.style.backgroundImage=r)}))}function Nt(e){let t=Math.max(0,Math.floor(e/1e3)),n=Math.floor(t/60),i=t%60;return`${n}:${String(i).padStart(2,"0")}`}function Do(){localStorage.setItem(lr,String(!Je())),B()}function Uo(){let e=I(),t=R?.hasJapanese??!1,n=e==="off"?"romaji":e==="romaji"&&t?"furigana":"off";jt(n),R?.setRomanized(n,!0),B(),window.dispatchEvent(new Event(Ot))}function Wo(e){return e==="romaji"?"Romanization: Romaji":e==="furigana"?"Romanization: Furigana":"Romanization"}function Vo(){let e=document.getElementById(O);if(!e)return;let t=!Ge(e);t&&(Pt=!0),Ye(e,t),Q(),B(),le(),bt(e)}function hr(e){e.classList.toggle("ll-song-card-hidden",!Je()),e.classList.toggle("ll-romanized",I()==="romaji")}function B(){let e=document.getElementById(O);if(!e)return;let t=I();hr(e),It(e.querySelector(".ll-card-toggle"),Je()),It(e.querySelector(".ll-roman-toggle"),t!=="off"),It(e.querySelector(".ll-fullscreen-toggle"),Ge(e));let n=e.querySelector(".ll-roman-toggle"),i=e.classList.contains("ll-has-romanization");if(n){n.hidden=!i,n.disabled=!i,fr(n,t==="furigana"?"furigana":"roman");let r=Wo(t);n.dataset.tooltip=r,n.setAttribute("aria-label",r),i||Q()}}function It(e,t){e&&(e.classList.toggle("active",t),e.setAttribute("aria-pressed",String(t)))}function Je(){return localStorage.getItem(lr)!=="false"}function Ko(){Q();let e=document.getElementById(O);e&&document.fullscreenElement!==e&&e.classList.contains("ll-native-fullscreen")&&e.classList.remove("ll-native-fullscreen"),B(),le(),e&&bt(e)}function Ge(e){return e.classList.contains("ll-fullscreen-mode")||document.fullscreenElement===e}function Ye(e,t){if(t){!G&&e.parentNode&&(G=document.createComment("liquid-lyrics-fullscreen-placeholder"),e.parentNode.insertBefore(G,e));let i=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==e?document.fullscreenElement:document.body;e.parentElement!==i&&i.appendChild(e),e.classList.add("ll-fullscreen-mode"),bt(e);return}let n=!Pt&&e.classList.contains("ll-fullscreen-mode");e.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===e&&document.exitFullscreen?.(),G?.parentNode&&(G.parentNode.insertBefore(e,G),G.remove()),G=null,bt(e),n&&(e.classList.remove("visible"),R?.setEnabled(!1),gr(),Pt=!0)}function le(){let e=document.getElementById(O);if(!!(e&&Ge(e))){yt===void 0&&(yt=localStorage.getItem(Rt)),localStorage.getItem(Rt)!=="animated"&&(localStorage.setItem(Rt,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}yt!==void 0&&(yt===null?localStorage.removeItem(Rt):localStorage.setItem(Rt,yt),yt=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function bt(e=document.getElementById(O)){if(!e)return;let t=e.querySelector(".liquid-lyrics-transparent-controls");if(!t)return;let n=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),i=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);t.style.setProperty("--ll-transparent-controls-width",`${ae(n,50,400)}px`),t.style.setProperty("--ll-transparent-controls-height",`${ae(i,20,300)}px`)}function $o(e,t){let n=Number(e);return Number.isFinite(n)?Math.max(0,n):t}function ae(e,t=0,n=1){return Math.min(n,Math.max(t,e))}var ce=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var Ze="liquid-lyrics-button";function yr(){let e=document.getElementById(Ze);if(e)return e;let t=document.querySelector(".main-nowPlayingBar-extraControls");if(!t)return null;let n=document.createElement("button");return n.id=Ze,n.className="liquid-lyrics-button",n.setAttribute("aria-label","Liquid Lyrics"),n.innerHTML=ce,q(n,"Liquid Lyrics"),n.addEventListener("click",()=>{cr(),n.classList.toggle("active",S())}),t.prepend(n),n}function br(){let e=document.getElementById(Ze);e&&e.classList.toggle("active",S())}var at="liquid-lyrics-sidebar-card",Tr="liquid-lyrics-sidebar-card-collapsed",Go=300,Yo=2e3,de={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>'},H=null,fe="Loading lyrics...",xt=!1,kr=!1,Xe=null,Qe=!1,vr=null,W=null,xr=0,tn=!1,wr=[];function ge(){let e=document.getElementById(at);if(e)return st(e),e;let t=document.createElement("section");t.id=at,t.className="liquid-lyrics-sidebar-card",t.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${ce}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${de.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${de.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${de.open}</button>
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
  `;let n=t.querySelector(".ll-sidebar-header-main"),i=t.querySelector(".ll-sidebar-collapse-btn"),r=t.querySelector(".ll-sidebar-roman-toggle"),a=t.querySelector(".ll-sidebar-fullscreen-toggle"),s=t.querySelector(".ll-sidebar-open-toggle"),o=()=>{let c=!t.classList.contains("collapsed");localStorage.setItem(Tr,String(c)),Lr(t),z()};n?.addEventListener("click",o),i?.addEventListener("click",o),r?.addEventListener("click",c=>{c.stopPropagation();let d=I(),b=H?.hasJapanese??!1;jt(d==="off"?"romaji":d==="romaji"&&b?"furigana":"off"),pe(!0),z(),window.dispatchEvent(new Event(Ot))}),a?.addEventListener("click",c=>{c.stopPropagation(),ur(!1)}),s?.addEventListener("click",c=>{c.stopPropagation(),se()}),i&&q(i,"Toggle mini lyrics"),r&&q(r,"Romanization"),a&&q(a,"Fullscreen"),s&&q(s,"Open Liquid Lyrics");let l=t.querySelector(".ll-sidebar-mini-viewport"),u=t.querySelector(".ll-sidebar-mini-lines");return H=new ht({container:u,scroller:l,variant:"sidebar",dotLiftPx:10,onRomanizationAvailability:c=>{xt=c,Ht(t)}}),window.addEventListener(Ot,()=>{pe(!S()),Ht(t)}),Lr(t),st(t),Xo(),tl(),rn(fe),z(),t}function en(e,t="No lyrics available"){let n=ge();fe=e?"Live lyrics":t,xt=!1,H?.setLyrics(e),!e||!H?.hasLyrics?rn(fe):pe(!S()),Ht(n),z()}function Er(e){fe=e,xt=!1;let t=document.getElementById(at);t&&(H?.setLyrics(null),rn(e),Ht(t),z())}function z(){let e=document.getElementById(at);if(!e)return;st(e);let t=S();e.classList.toggle("ll-hidden",t),e.dataset.romanized=String(I()==="romaji"),Ht(e);let n=e.classList.contains("collapsed"),i=!t&&!n&&e.isConnected;H?.setEnabled(i),i&&I()!=="off"&&!kr&&pe(!0)}function nn(){st()}function pe(e){if(!H)return;let t=I();H.setRomanized(t,e),kr=e||t==="off"}function rn(e){if(!H)return;let t=document.createElement("div");t.className="ll-sidebar-mini-empty",t.textContent=e,H.container.replaceChildren(t)}function Ht(e){let t=e.querySelector(".ll-sidebar-roman-toggle");if(!t)return;let n=I(),i=xt&&n!=="off";t.hidden=!xt,t.disabled=!xt,t.classList.toggle("active",i),t.setAttribute("aria-pressed",String(i));let r=n==="furigana"?"furigana":"roman";t.dataset.icon!==r&&(t.dataset.icon=r,t.innerHTML=de[r]);let a=n==="romaji"?"Romanization: Romaji":n==="furigana"?"Romanization: Furigana":"Romanization";t.dataset.tooltip=a,t.setAttribute("aria-label",a)}function Lr(e){let t=localStorage.getItem(Tr)==="true";e.classList.toggle("collapsed",t),e.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!t))}function st(e=document.getElementById(at)){if(!e)return!1;let t=Zo();return t?e.parentElement!==t||t.lastElementChild!==e?(t.appendChild(e),!0):!1:(e.parentElement?.classList.contains("Root__right-sidebar")&&e.remove(),!1)}function Zo(){if(W?.isConnected)return W;W=null;let e=document.querySelector(".Root__right-sidebar"),t=e?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||e?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||e?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(t)return W=t,t;let n=performance.now();return n-xr>=Yo&&(xr=n,W=ue(["nowplayingview","nowplayingwidget"],e??document)||ue(["nowplaying","widget"],e??document)||ue(["nowplayingview","nowplayinggrid"],e??document)||ue(["nowplaying","grid"],e??document)),W}function ue(e,t=document){let n=e.map(i=>i.toLowerCase());for(let i of Array.from(t.querySelectorAll("*"))){let r=(i.getAttribute("class")||"").toLowerCase();if(n.every(a=>r.includes(a)))return i}return null}function Xo(){Xe||(Xe=new MutationObserver(()=>{Qo()}),Xe.observe(document.body,{childList:!0,subtree:!0}),an())}function Qo(){Qe||(Qe=!0,setTimeout(()=>{Qe=!1,an();let e=document.getElementById(at);e&&(e.isConnected&&W?.isConnected&&e.parentElement===W||st(e)&&z())},Go))}function tl(){vr||(vr=setInterval(()=>{an(),st()&&z()},1e3))}function an(){if(!!document.querySelector(".Root__cinema-view")){tn=!0;return}tn&&(tn=!1,el())}function el(){wr.forEach(e=>clearTimeout(e)),wr=[80,260,620,1100].map(e=>setTimeout(()=>{let t=document.getElementById(at)??ge();W=null,st(t),z()},e))}var Sr=`\uFEFF/* ==========================================================================
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

/* Furigana ------------------------------------------------------------------------ */

.liquid-lyrics-line ruby {
  ruby-align: center;
}

/* Furigana annotations opt out of the karaoke gradient: the solid fill color
   overrides the transparent text-fill so they stay readable at any progress. */
.liquid-lyrics-line rt {
  font-size: 0.42em;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0;
  color: rgba(255, 255, 255, 0.55);
  -webkit-text-fill-color: rgba(255, 255, 255, 0.55);
}

.liquid-lyrics-line.active rt {
  color: rgba(255, 255, 255, 0.8);
  -webkit-text-fill-color: rgba(255, 255, 255, 0.8);
}

/* Ruby words keep the word-level fill; letter animation is disabled for them. */
.ll-ruby-syllable {
  white-space: nowrap;
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
`;function Ar(){let e="liquid-lyrics-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=Sr,document.head.appendChild(t)}async function il(){await V(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),Ar(),$i(),vt(),ge(),await V(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),yr();let e=null,t=null,n="Loading lyrics...",i=0,r=Mr();async function a(){let b=Spicetify.Player.data;if(!b?.item?.uri)return;let T=b.item.uri,k=T.includes(":")?T.split(":")[2]:T;if(k===e){nn(),z();return}e=k,t=null,n="Loading lyrics...",nn(),Er(n),S()&&zt(n),await s(k,b.item)}async function s(b,T){let k=++i,C=await mn({id:b,data:{name:T.name}});if(!(k!==i||b!==e)){if(C.status==="success"&&C.data){t=C.data,n="",en(C.data),S()&&$e(C.data);return}t=null,n=C.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",en(null,n),S()&&zt(n)}}Spicetify.Player.addEventListener("songchange",()=>{a()});let o=()=>{let b=Mr();b!==r&&(r=b,S()&&oe())};setInterval(()=>{o()},250);let l=Spicetify.Platform?.History;typeof l?.listen=="function"&&l.listen(o);let u=S(),c=new MutationObserver(()=>{let b=S();if(br(),z(),b&&!u&&e)if(t)$e(t);else if(n&&n!=="Loading lyrics...")zt(n);else{let T=Spicetify.Player.data;if(T?.item?.uri){let k=T.item.uri.includes(":")?T.item.uri.split(":")[2]:T.item.uri;zt("Loading lyrics..."),s(k,T.item)}}u=b}),d=document.getElementById("liquid-lyrics-panel");d&&c.observe(d,{attributes:!0,attributeFilter:["class"]}),z(),a()}il();function Mr(){let t=Spicetify.Platform?.History?.location??{},n=t.pathname||t.path||t.uri||"";return`${location.href}|${n}`}})();
