// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{var ja=Object.create;var Sn=Object.defineProperty;var Va=Object.getOwnPropertyDescriptor;var Wa=Object.getOwnPropertyNames;var Ka=Object.getPrototypeOf,$a=Object.prototype.hasOwnProperty;var N=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ja=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Wa(t))!$a.call(e,i)&&i!==r&&Sn(e,i,{get:()=>t[i],enumerable:!(n=Va(t,i))||n.enumerable});return e};var Mn=(e,t,r)=>(r=e!=null?ja(Ka(e)):{},Ja(t||!e||!e.__esModule?Sn(r,"default",{value:e,enumerable:!0}):r,e));var ai=N((Uu,kr)=>{(function(){"use strict";var e="\0",t=0,r=0,n=-1,i=!0,o=!0,a=4,s=4,l=2,d=function(h){h==null&&(h=1024);var m=function(L,T,S){for(var A=T;A<S;A++)L[A]=-A+1;if(0<v.array[v.array.length-1]){for(var D=v.array.length-2;0<v.array[D];)D--;L[T]=-D}},b=function(L,T,S){for(var A=T;A<S;A++)L[A]=-A-1},x=function(L){var T=L*l,S=f(g.signed,g.bytes,T);m(S,g.array.length,T),S.set(g.array),g.array=null,g.array=S;var A=f(v.signed,v.bytes,T);b(A,v.array.length,T),A.set(v.array),v.array=null,v.array=A},y=r+1,g={signed:i,bytes:a,array:f(i,a,h)},v={signed:o,bytes:s,array:f(o,s,h)};return g.array[r]=1,v.array[r]=r,m(g.array,r+1,g.array.length),b(v.array,r+1,v.array.length),{getBaseBuffer:function(){return g.array},getCheckBuffer:function(){return v.array},loadBaseBuffer:function(L){return g.array=L,this},loadCheckBuffer:function(L){return v.array=L,this},size:function(){return Math.max(g.array.length,v.array.length)},getBase:function(L){return g.array.length-1<L?-L+1:g.array[L]},getCheck:function(L){return v.array.length-1<L?-L-1:v.array[L]},setBase:function(L,T){g.array.length-1<L&&x(L),g.array[L]=T},setCheck:function(L,T){v.array.length-1<L&&x(L),v.array[L]=T},setFirstUnusedNode:function(L){y=L},getFirstUnusedNode:function(){return y},shrink:function(){for(var L=this.size()-1;!(0<=v.array[L]);)L--;g.array=g.array.subarray(0,L+2),v.array=v.array.subarray(0,L+2)},calc:function(){for(var L=0,T=v.array.length,S=0;S<T;S++)v.array[S]<0&&L++;return{all:T,unused:L,efficiency:(T-L)/T}},dump:function(){var L="",T="",S;for(S=0;S<g.array.length;S++)L=L+" "+this.getBase(S);for(S=0;S<v.array.length;S++)T=T+" "+this.getCheck(S);return console.log("base:"+L),console.log("chck:"+T),"base:"+L+" chck:"+T}}};function c(h){this.bc=d(h),this.keys=[]}c.prototype.append=function(h,m){return this.keys.push({k:h,v:m}),this},c.prototype.build=function(h,m){if(h==null&&(h=this.keys),h==null)return new u(this.bc);m==null&&(m=!1);var b=h.map(function(x){return{k:w(x.k+e),v:x.v}});return m?this.keys=b:this.keys=b.sort(function(x,y){for(var g=x.k,v=y.k,L=Math.min(g.length,v.length),T=0;T<L;T++)if(g[T]!==v[T])return g[T]-v[T];return g.length-v.length}),b=null,this._build(r,0,0,this.keys.length),new u(this.bc)},c.prototype._build=function(h,m,b,x){var y=this.getChildrenInfo(m,b,x),g=this.findAllocatableBase(y);this.setBC(h,y,g);for(var v=0;v<y.length;v=v+3){var L=y[v];if(L!==t){var T=y[v+1],S=y[v+2],A=g+L;this._build(A,m+1,T,S)}}},c.prototype.getChildrenInfo=function(h,m,b){var x=this.keys[m].k[h],y=0,g=new Int32Array(b*3);g[y++]=x,g[y++]=m;for(var v=m,L=m;v<m+b;v++){var T=this.keys[v].k[h];x!==T&&(g[y++]=v-L,g[y++]=T,g[y++]=v,x=T,L=v)}return g[y++]=v-L,g=g.subarray(0,y),g},c.prototype.setBC=function(h,m,b){var x=this.bc;x.setBase(h,b);var y;for(y=0;y<m.length;y=y+3){var g=m[y],v=b+g,L=-x.getBase(v),T=-x.getCheck(v);v!==x.getFirstUnusedNode()?x.setCheck(L,-T):x.setFirstUnusedNode(T),x.setBase(T,-L);var S=h;if(x.setCheck(v,S),g===t){var A=m[y+1],D=this.keys[A].v;D==null&&(D=0);var Fa=-D-1;x.setBase(v,Fa)}}},c.prototype.findAllocatableBase=function(h){for(var m=this.bc,b,x=m.getFirstUnusedNode();;){if(b=x-h[0],b<0){x=-m.getCheck(x);continue}for(var y=!0,g=0;g<h.length;g=g+3){var v=h[g],L=b+v;if(!this.isUnusedNode(L)){x=-m.getCheck(x),y=!1;break}}if(y)return b}},c.prototype.isUnusedNode=function(h){var m=this.bc,b=m.getCheck(h);return h===r?!1:b<0};function u(h){this.bc=h,this.bc.shrink()}u.prototype.contain=function(h){var m=this.bc;h+=e;for(var b=w(h),x=r,y=n,g=0;g<b.length;g++){var v=b[g];if(y=this.traverse(x,v),y===n)return!1;if(m.getBase(y)<=0)return!0;x=y}return!1},u.prototype.lookup=function(h){h+=e;for(var m=w(h),b=r,x=n,y=0;y<m.length;y++){var g=m[y];if(x=this.traverse(b,g),x===n)return n;b=x}var v=this.bc.getBase(x);return v<=0?-v-1:n},u.prototype.commonPrefixSearch=function(h){for(var m=w(h),b=r,x=n,y=[],g=0;g<m.length;g++){var v=m[g];if(x=this.traverse(b,v),x!==n){b=x;var L=this.traverse(x,t);if(L!==n){var T=this.bc.getBase(L),S={};T<=0&&(S.v=-T-1),S.k=E(p(m,0,g+1)),y.push(S)}continue}else break}return y},u.prototype.traverse=function(h,m){var b=this.bc.getBase(h)+m;return this.bc.getCheck(b)===h?b:n},u.prototype.size=function(){return this.bc.size()},u.prototype.calc=function(){return this.bc.calc()},u.prototype.dump=function(){return this.bc.dump()};var f=function(h,m,b){if(h)switch(m){case 1:return new Int8Array(b);case 2:return new Int16Array(b);case 4:return new Int32Array(b);default:throw new RangeError("Invalid newArray parameter element_bytes:"+m)}else switch(m){case 1:return new Uint8Array(b);case 2:return new Uint16Array(b);case 4:return new Uint32Array(b);default:throw new RangeError("Invalid newArray parameter element_bytes:"+m)}},p=function(h,m,b){var x=new ArrayBuffer(b),y=new Uint8Array(x,0,b),g=h.subarray(m,b);return y.set(g),y},w=function(h){for(var m=new Uint8Array(new ArrayBuffer(h.length*4)),b=0,x=0;b<h.length;){var y,g=h.charCodeAt(b++);if(g>=55296&&g<=56319){var v=g,L=h.charCodeAt(b++);if(L>=56320&&L<=57343)y=(v-55296)*1024+65536+(L-56320);else return null}else y=g;y<128?m[x++]=y:y<2048?(m[x++]=y>>>6|192,m[x++]=y&63|128):y<65536?(m[x++]=y>>>12|224,m[x++]=y>>6&63|128,m[x++]=y&63|128):y<1<<21&&(m[x++]=y>>>18|240,m[x++]=y>>12&63|128,m[x++]=y>>6&63|128,m[x++]=y&63|128)}return m.subarray(0,x)},E=function(h){for(var m="",b,x,y,g,v,L,T,S=0;S<h.length;)x=h[S++],x<128?b=x:x>>5===6?(y=h[S++],b=(x&31)<<6|y&63):x>>4===14?(y=h[S++],g=h[S++],b=(x&15)<<12|(y&63)<<6|g&63):(y=h[S++],g=h[S++],v=h[S++],b=(x&7)<<18|(y&63)<<12|(g&63)<<6|v&63),b<65536?m+=String.fromCharCode(b):(b-=65536,L=55296|b>>10,T=56320|b&1023,m+=String.fromCharCode(L,T));return m},M={builder:function(h){return new c(h)},load:function(h,m){var b=d(0);return b.loadBaseBuffer(h),b.loadCheckBuffer(m),new u(b)}};typeof kr>"u"?window.doublearray=M:kr.exports=M})()});var Ae=N((Fu,si)=>{"use strict";var bs=function(e){for(var t=new Uint8Array(e.length*4),r=0,n=0;r<e.length;){var i,o=e.charCodeAt(r++);if(o>=55296&&o<=56319){var a=o,s=e.charCodeAt(r++);if(s>=56320&&s<=57343)i=(a-55296)*1024+65536+(s-56320);else return null}else i=o;i<128?t[n++]=i:i<2048?(t[n++]=i>>>6|192,t[n++]=i&63|128):i<65536?(t[n++]=i>>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128):i<2097152&&(t[n++]=i>>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t.subarray(0,n)},vs=function(e){for(var t="",r,n,i,o,a,s,l,d=0;d<e.length;)n=e[d++],n<128?r=n:n>>5===6?(i=e[d++],r=(n&31)<<6|i&63):n>>4===14?(i=e[d++],o=e[d++],r=(n&15)<<12|(i&63)<<6|o&63):(i=e[d++],o=e[d++],a=e[d++],r=(n&7)<<18|(i&63)<<12|(o&63)<<6|a&63),r<65536?t+=String.fromCharCode(r):(r-=65536,s=55296|r>>10,l=56320|r&1023,t+=String.fromCharCode(s,l));return t};function j(e){var t;if(e==null)t=1024*1024;else if(typeof e=="number")t=e;else if(e instanceof Uint8Array){this.buffer=e,this.position=0;return}else throw typeof e+" is invalid parameter type for ByteBuffer constructor";this.buffer=new Uint8Array(t),this.position=0}j.prototype.size=function(){return this.buffer.length};j.prototype.reallocate=function(){var e=new Uint8Array(this.buffer.length*2);e.set(this.buffer),this.buffer=e};j.prototype.shrink=function(){return this.buffer=this.buffer.subarray(0,this.position),this.buffer};j.prototype.put=function(e){this.buffer.length<this.position+1&&this.reallocate(),this.buffer[this.position++]=e};j.prototype.get=function(e){return e==null&&(e=this.position,this.position+=1),this.buffer.length<e+1?0:this.buffer[e]};j.prototype.putShort=function(e){if(65535<e)throw e+" is over short value";var t=255&e,r=(65280&e)>>8;this.put(t),this.put(r)};j.prototype.getShort=function(e){if(e==null&&(e=this.position,this.position+=2),this.buffer.length<e+2)return 0;var t=this.buffer[e],r=this.buffer[e+1],n=(r<<8)+t;return n&32768&&(n=-(n-1^65535)),n};j.prototype.putInt=function(e){if(4294967295<e)throw e+" is over integer value";var t=255&e,r=(65280&e)>>8,n=(16711680&e)>>16,i=(4278190080&e)>>24;this.put(t),this.put(r),this.put(n),this.put(i)};j.prototype.getInt=function(e){if(e==null&&(e=this.position,this.position+=4),this.buffer.length<e+4)return 0;var t=this.buffer[e],r=this.buffer[e+1],n=this.buffer[e+2],i=this.buffer[e+3];return(i<<24)+(n<<16)+(r<<8)+t};j.prototype.readInt=function(){var e=this.position;return this.position+=4,this.getInt(e)};j.prototype.putString=function(e){for(var t=bs(e),r=0;r<t.length;r++)this.put(t[r]);this.put(0)};j.prototype.getString=function(e){var t=[],r;for(e==null&&(e=this.position);!(this.buffer.length<e+1||(r=this.get(e++),r===0));)t.push(r);return this.position=e,vs(t)};si.exports=j});var Lr=N((ju,li)=>{"use strict";var Ot=Ae();function at(){this.dictionary=new Ot(10*1024*1024),this.target_map={},this.pos_buffer=new Ot(10*1024*1024)}at.prototype.buildDictionary=function(e){for(var t={},r=0;r<e.length;r++){var n=e[r];if(!(n.length<4)){var i=n[0],o=n[1],a=n[2],s=n[3],l=n.slice(4).join(",");(!isFinite(o)||!isFinite(a)||!isFinite(s))&&console.log(n);var d=this.put(o,a,s,i,l);t[d]=i}}return this.dictionary.shrink(),this.pos_buffer.shrink(),t};at.prototype.put=function(e,t,r,n,i){var o=this.dictionary.position,a=this.pos_buffer.position;return this.dictionary.putShort(e),this.dictionary.putShort(t),this.dictionary.putShort(r),this.dictionary.putInt(a),this.pos_buffer.putString(n+","+i),o};at.prototype.addMapping=function(e,t){var r=this.target_map[e];r==null&&(r=[]),r.push(t),this.target_map[e]=r};at.prototype.targetMapToBuffer=function(){var e=new Ot,t=Object.keys(this.target_map).length;e.putInt(t);for(var r in this.target_map){var n=this.target_map[r],i=n.length;e.putInt(parseInt(r)),e.putInt(i);for(var o=0;o<n.length;o++)e.putInt(n[o])}return e.shrink()};at.prototype.loadDictionary=function(e){return this.dictionary=new Ot(e),this};at.prototype.loadPosVector=function(e){return this.pos_buffer=new Ot(e),this};at.prototype.loadTargetMap=function(e){var t=new Ot(e);for(t.position=0,this.target_map={},t.readInt();!(t.buffer.length<t.position+1);)for(var r=t.readInt(),n=t.readInt(),i=0;i<n;i++){var o=t.readInt();this.addMapping(r,o)}return this};at.prototype.getFeatures=function(e){var t=parseInt(e);if(isNaN(t))return"";var r=this.dictionary.getInt(t+6);return this.pos_buffer.getString(r)};li.exports=at});var di=N((Vu,ci)=>{"use strict";function Re(e,t){this.forward_dimension=e,this.backward_dimension=t,this.buffer=new Int16Array(e*t+2),this.buffer[0]=e,this.buffer[1]=t}Re.prototype.put=function(e,t,r){var n=e*this.backward_dimension+t+2;if(this.buffer.length<n+1)throw"ConnectionCosts buffer overflow";this.buffer[n]=r};Re.prototype.get=function(e,t){var r=e*this.backward_dimension+t+2;if(this.buffer.length<r+1)throw"ConnectionCosts buffer overflow";return this.buffer[r]};Re.prototype.loadConnectionCosts=function(e){this.forward_dimension=e[0],this.backward_dimension=e[1],this.buffer=e};ci.exports=Re});var Er=N((Wu,ui)=>{"use strict";function xs(e,t,r,n,i){this.class_id=e,this.class_name=t,this.is_always_invoke=r,this.is_grouping=n,this.max_length=i}ui.exports=xs});var hi=N((Ku,fi)=>{"use strict";var pi=Ae(),ws=Er();function Et(){this.map=[],this.lookup_table={}}Et.load=function(e){for(var t=new Et,r=[],n=new pi(e);n.position+1<n.size();){var i=r.length,o=n.get(),a=n.get(),s=n.getInt(),l=n.getString();r.push(new ws(i,l,o,a,s))}return t.init(r),t};Et.prototype.init=function(e){if(e!=null)for(var t=0;t<e.length;t++){var r=e[t];this.map[t]=r,this.lookup_table[r.class_name]=t}};Et.prototype.getCharacterClass=function(e){return this.map[e]};Et.prototype.lookup=function(e){var t=this.lookup_table[e];return t??null};Et.prototype.toBuffer=function(){for(var e=new pi,t=0;t<this.map.length;t++){var r=this.map[t];e.put(r.is_always_invoke),e.put(r.is_grouping),e.putInt(r.max_length),e.putString(r.class_name)}return e.shrink(),e.buffer};fi.exports=Et});var Tr=N(($u,mi)=>{"use strict";function Tt(e){this.str=e,this.index_mapping=[];for(var t=0;t<e.length;t++){var r=e.charAt(t);this.index_mapping.push(t),Tt.isSurrogatePair(r)&&t++}this.length=this.index_mapping.length}Tt.prototype.slice=function(e){if(this.index_mapping.length<=e)return"";var t=this.index_mapping[e];return this.str.slice(t)};Tt.prototype.charAt=function(e){if(this.str.length<=e)return"";var t=this.index_mapping[e],r=this.index_mapping[e+1];return r==null?this.str.slice(t):this.str.slice(t,r)};Tt.prototype.charCodeAt=function(e){if(this.index_mapping.length<=e)return NaN;var t=this.index_mapping[e],r=this.str.charCodeAt(t),n;return r>=55296&&r<=56319&&t<this.str.length&&(n=this.str.charCodeAt(t+1),n>=56320&&n<=57343)?(r-55296)*1024+n-56320+65536:r};Tt.prototype.toString=function(){return this.str};Tt.isSurrogatePair=function(e){var t=e.charCodeAt(0);return t>=55296&&t<=56319};mi.exports=Tt});var yi=N((Ju,gi)=>{"use strict";var ks=hi(),Ls=Er(),Es=Tr(),Sr="DEFAULT";function st(){this.character_category_map=new Uint8Array(65536),this.compatible_category_map=new Uint32Array(65536),this.invoke_definition_map=null}st.load=function(e,t,r){var n=new st;return n.character_category_map=e,n.compatible_category_map=t,n.invoke_definition_map=ks.load(r),n};st.parseCharCategory=function(e,t){var r=t[1],n=parseInt(t[2]),i=parseInt(t[3]),o=parseInt(t[4]);if(!isFinite(n)||n!==0&&n!==1)return console.log("char.def parse error. INVOKE is 0 or 1 in:"+n),null;if(!isFinite(i)||i!==0&&i!==1)return console.log("char.def parse error. GROUP is 0 or 1 in:"+i),null;if(!isFinite(o)||o<0)return console.log("char.def parse error. LENGTH is 1 to n:"+o),null;var a=n===1,s=i===1;return new Ls(e,r,a,s,o)};st.parseCategoryMapping=function(e){var t=parseInt(e[1]),r=e[2],n=3<e.length?e.slice(3):[];return(!isFinite(t)||t<0||t>65535)&&console.log("char.def parse error. CODE is invalid:"+t),{start:t,default:r,compatible:n}};st.parseRangeCategoryMapping=function(e){var t=parseInt(e[1]),r=parseInt(e[2]),n=e[3],i=4<e.length?e.slice(4):[];return(!isFinite(t)||t<0||t>65535)&&console.log("char.def parse error. CODE is invalid:"+t),(!isFinite(r)||r<0||r>65535)&&console.log("char.def parse error. CODE is invalid:"+r),{start:t,end:r,default:n,compatible:i}};st.prototype.initCategoryMappings=function(e){var t;if(e!=null)for(var r=0;r<e.length;r++){var n=e[r],i=n.end||n.start;for(t=n.start;t<=i;t++){this.character_category_map[t]=this.invoke_definition_map.lookup(n.default);for(var o=0;o<n.compatible.length;o++){var a=this.compatible_category_map[t],s=n.compatible[o];if(s!=null){var l=this.invoke_definition_map.lookup(s);if(l!=null){var d=1<<l;a=a|d,this.compatible_category_map[t]=a}}}}}var c=this.invoke_definition_map.lookup(Sr);if(c!=null)for(t=0;t<this.character_category_map.length;t++)this.character_category_map[t]===0&&(this.character_category_map[t]=1<<c)};st.prototype.lookupCompatibleCategory=function(e){var t=[],r=e.charCodeAt(0),n;if(r<this.compatible_category_map.length&&(n=this.compatible_category_map[r]),n==null||n===0)return t;for(var i=0;i<32;i++)if(n<<31-i>>>31===1){var o=this.invoke_definition_map.getCharacterClass(i);if(o==null)continue;t.push(o)}return t};st.prototype.lookup=function(e){var t,r=e.charCodeAt(0);return Es.isSurrogatePair(e)?t=this.invoke_definition_map.lookup(Sr):r<this.character_category_map.length&&(t=this.character_category_map[r]),t==null&&(t=this.invoke_definition_map.lookup(Sr)),this.invoke_definition_map.getCharacterClass(t)};gi.exports=st});var xi=N((Yu,vi)=>{"use strict";var Ts=Lr(),Ss=yi(),bi=Ae();function zt(){this.dictionary=new bi(10*1024*1024),this.target_map={},this.pos_buffer=new bi(10*1024*1024),this.character_definition=null}zt.prototype=Object.create(Ts.prototype);zt.prototype.characterDefinition=function(e){return this.character_definition=e,this};zt.prototype.lookup=function(e){return this.character_definition.lookup(e)};zt.prototype.lookupCompatibleCategory=function(e){return this.character_definition.lookupCompatibleCategory(e)};zt.prototype.loadUnknownDictionaries=function(e,t,r,n,i,o){this.loadDictionary(e),this.loadPosVector(t),this.loadTargetMap(r),this.character_definition=Ss.load(n,i,o)};vi.exports=zt});var Li=N((Gu,ki)=>{"use strict";var wi=ai(),Ms=Lr(),Cs=di(),As=xi();function ee(e,t,r,n){e!=null?this.trie=e:this.trie=wi.builder(0).build([{k:"",v:1}]),t!=null?this.token_info_dictionary=t:this.token_info_dictionary=new Ms,r!=null?this.connection_costs=r:this.connection_costs=new Cs(0,0),n!=null?this.unknown_dictionary=n:this.unknown_dictionary=new As}ee.prototype.loadTrie=function(e,t){return this.trie=wi.load(e,t),this};ee.prototype.loadTokenInfoDictionaries=function(e,t,r){return this.token_info_dictionary.loadDictionary(e),this.token_info_dictionary.loadPosVector(t),this.token_info_dictionary.loadTargetMap(r),this};ee.prototype.loadConnectionCosts=function(e){return this.connection_costs.loadConnectionCosts(e),this};ee.prototype.loadUnknownDictionaries=function(e,t,r,n,i,o){return this.unknown_dictionary.loadUnknownDictionaries(e,t,r,n,i,o),this};ki.exports=ee});var Mr=N((Zu,Ei)=>{"use strict";function Rs(e,t,r,n,i,o,a,s){this.name=e,this.cost=t,this.start_pos=r,this.length=n,this.left_id=o,this.right_id=a,this.prev=null,this.surface_form=s,i==="BOS"?this.shortest_cost=0:this.shortest_cost=Number.MAX_VALUE,this.type=i}Ei.exports=Rs});var Mi=N((Xu,Si)=>{"use strict";var Ti=Mr();function Cr(){this.nodes_end_at=[],this.nodes_end_at[0]=[new Ti(-1,0,0,0,"BOS",0,0,"")],this.eos_pos=1}Cr.prototype.append=function(e){var t=e.start_pos+e.length-1;this.eos_pos<t&&(this.eos_pos=t);var r=this.nodes_end_at[t];r==null&&(r=[]),r.push(e),this.nodes_end_at[t]=r};Cr.prototype.appendEos=function(){var e=this.nodes_end_at.length;this.eos_pos++,this.nodes_end_at[e]=[new Ti(-1,0,this.eos_pos,0,"EOS",0,0,"")]};Si.exports=Cr});var Ii=N((Qu,Ri)=>{"use strict";var Ci=Mr(),Is=Mi(),Ar=Tr();function Ai(e){this.trie=e.trie,this.token_info_dictionary=e.token_info_dictionary,this.unknown_dictionary=e.unknown_dictionary}Ai.prototype.build=function(e){for(var t=new Is,r=new Ar(e),n,i,o,a,s,l=0;l<r.length;l++){for(var d=r.slice(l),c=this.trie.commonPrefixSearch(d),u=0;u<c.length;u++){i=c[u].v,n=c[u].k;for(var f=this.token_info_dictionary.target_map[i],p=0;p<f.length;p++){var w=parseInt(f[p]);o=this.token_info_dictionary.dictionary.getShort(w),a=this.token_info_dictionary.dictionary.getShort(w+2),s=this.token_info_dictionary.dictionary.getShort(w+4),t.append(new Ci(w,s,l+1,n.length,"KNOWN",o,a,n))}}var E=new Ar(d),M=new Ar(E.charAt(0)),h=this.unknown_dictionary.lookup(M.toString());if(c==null||c.length===0||h.is_always_invoke===1){if(n=M,h.is_grouping===1&&1<E.length)for(var m=1;m<E.length;m++){var b=E.charAt(m),x=this.unknown_dictionary.lookup(b);if(h.class_name!==x.class_name)break;n+=b}for(var y=this.unknown_dictionary.target_map[h.class_id],g=0;g<y.length;g++){var v=parseInt(y[g]);o=this.unknown_dictionary.dictionary.getShort(v),a=this.unknown_dictionary.dictionary.getShort(v+2),s=this.unknown_dictionary.dictionary.getShort(v+4),t.append(new Ci(v,s,l+1,n.length,"UNKNOWN",o,a,n.toString()))}}}return t.appendEos(),t};Ri.exports=Ai});var qi=N((tp,_i)=>{"use strict";function Ie(e){this.connection_costs=e}Ie.prototype.search=function(e){return e=this.forward(e),this.backward(e)};Ie.prototype.forward=function(e){var t,r,n;for(t=1;t<=e.eos_pos;t++){var i=e.nodes_end_at[t];if(i!=null)for(r=0;r<i.length;r++){var o=i[r],a=Number.MAX_VALUE,s,l=e.nodes_end_at[o.start_pos-1];if(l!=null){for(n=0;n<l.length;n++){var d=l[n],c;o.left_id==null||d.right_id==null?(console.log("Left or right is null"),c=0):c=this.connection_costs.get(d.right_id,o.left_id);var u=d.shortest_cost+c+o.cost;u<a&&(s=d,a=u)}o.prev=s,o.shortest_cost=a}}}return e};Ie.prototype.backward=function(e){var t=[],r=e.nodes_end_at[e.nodes_end_at.length-1][0],n=r.prev;if(n==null)return[];for(;n.type!=="BOS";){if(t.push(n),n.prev==null)return[];n=n.prev}return t.reverse()};_i.exports=Ie});var Pi=N((ep,Ni)=>{"use strict";function Rr(){}Rr.prototype.formatEntry=function(e,t,r,n){var i={};return i.word_id=e,i.word_type=r,i.word_position=t,i.surface_form=n[0],i.pos=n[1],i.pos_detail_1=n[2],i.pos_detail_2=n[3],i.pos_detail_3=n[4],i.conjugated_type=n[5],i.conjugated_form=n[6],i.basic_form=n[7],i.reading=n[8],i.pronunciation=n[9],i};Rr.prototype.formatUnknownEntry=function(e,t,r,n,i){var o={};return o.word_id=e,o.word_type=r,o.word_position=t,o.surface_form=i,o.pos=n[1],o.pos_detail_1=n[2],o.pos_detail_2=n[3],o.pos_detail_3=n[4],o.conjugated_type=n[5],o.conjugated_form=n[6],o.basic_form=n[7],o};Ni.exports=Rr});var zi=N((rp,Oi)=>{"use strict";var _s=Ii(),qs=qi(),Ns=Pi(),Ps=/、|。/;function Bt(e){this.token_info_dictionary=e.token_info_dictionary,this.unknown_dictionary=e.unknown_dictionary,this.viterbi_builder=new _s(e),this.viterbi_searcher=new qs(e.connection_costs),this.formatter=new Ns}Bt.splitByPunctuation=function(e){for(var t=[],r=e;r!=="";){var n=r.search(Ps);if(n<0){t.push(r);break}t.push(r.substring(0,n+1)),r=r.substring(n+1)}return t};Bt.prototype.tokenize=function(e){for(var t=Bt.splitByPunctuation(e),r=[],n=0;n<t.length;n++){var i=t[n];this.tokenizeForSentence(i,r)}return r};Bt.prototype.tokenizeForSentence=function(e,t){t==null&&(t=[]);var r=this.getLattice(e),n=this.viterbi_searcher.search(r),i=0;t.length>0&&(i=t[t.length-1].word_position);for(var o=0;o<n.length;o++){var a=n[o],s,l,d;a.type==="KNOWN"?(d=this.token_info_dictionary.getFeatures(a.name),d==null?l=[]:l=d.split(","),s=this.formatter.formatEntry(a.name,i+a.start_pos,a.type,l)):a.type==="UNKNOWN"?(d=this.unknown_dictionary.getFeatures(a.name),d==null?l=[]:l=d.split(","),s=this.formatter.formatUnknownEntry(a.name,i+a.start_pos,a.type,l,a.surface_form)):s=this.formatter.formatEntry(a.name,i+a.start_pos,a.type,[]),t.push(s)}return t};Bt.prototype.getLattice=function(e){return this.viterbi_builder.build(e)};Oi.exports=Bt});function et(e,t=1e4){return new Promise((r,n)=>{let i=Date.now(),o=setInterval(()=>{let a=e();a?(clearInterval(o),r(a)):Date.now()-i>t&&(clearInterval(o),n(new Error("wait() timed out")))},100)})}var fr="6.2.0",Cn=["community","spicy","spotify"];async function hr({id:e}){try{let t=e.includes(":")?e.split(":")[2]:e,r="https://spclient.wg.spotify.com/color-lyrics/v2/track/",n;try{n=await(await et(()=>Spicetify.CosmosAsync?.get))(`${r}${t}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let i=n?.lyrics;if(!i)return{status:"missing_lyrics",data:null};let o=i.lines,a;if(i.syncType==="LINE_SYNCED"){let s=o.map((l,d)=>{let c=Number(l.startTimeMs)||0,u=d<o.length-1?Number(o[d+1].startTimeMs):c+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:c,EndTime:u,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:c,EndTime:u,OppositeAligned:!1,IsRTL:!1}});a={Id:t,Type:"Line",SongWriters:[],Content:s,StartTime:s.length>0?s[0].StartTime:0,EndTime:s.length>0?s[s.length-1].EndTime:0,Provider:"spotify"}}else a={Id:t,Type:"Static",SongWriters:[],Lines:o.map(s=>({Text:s.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:a}}catch(t){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:t instanceof Error?t.message:String(t)}}}}var Ya="https://api.spicylyrics.org";async function An(e,t){return(await et(()=>Spicetify.CosmosAsync?.post))(`${Ya}/query`,{queries:e,client:{version:fr}},{"Content-Type":"application/json","SpicyLyrics-Version":fr,"X-mode":"2",...t&&{"SpicyLyrics-WebAuth":t}})}var ut={depth:512,arrayLength:1048576,objectKeys:65536,streamLength:16777216,valuesLength:4194304,decodeOps:4194304},Ga=new Set(["__proto__","constructor","prototype"]);function Rn(e){return Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1])}function In(e){let t=e[0],r=e[1];if(t.length>ut.valuesLength)throw new Error("SLObjPack: valuesList exceeds limit");if(r.length>ut.streamLength)throw new Error("SLObjPack: stream exceeds limit");for(let p=0;p<t.length;p++){let w=t[p];if(w===null)continue;let E=typeof w;if(!(E==="string"||E==="boolean")&&!(E==="number"&&Number.isFinite(w)))throw new Error(`SLObjPack: invalid value at ${p}`)}let n=t,i=0,o=()=>{if(i>=r.length)throw new Error("SLObjPack: unexpected end of stream");return r[i++]},a=p=>{if(typeof p!="number"||!Number.isInteger(p)||p<0||p>=n.length)throw new Error(`SLObjPack: invalid value pointer ${p}`);return n[p]},s=()=>{let p=a(o());if(typeof p!="string")throw new Error("SLObjPack: keys must be strings");if(Ga.has(p))throw new Error(`SLObjPack: forbidden key ${p}`);return p},l=(p,w,E)=>{Object.defineProperty(p,w,{value:E,writable:!0,enumerable:!0,configurable:!0})},d=(p,w,E)=>{if(typeof p!="number"||!Number.isInteger(p)||p<0||p>w)throw new Error(`SLObjPack: invalid ${E} count ${p}`);return p},c=(p,w)=>{if(p>r.length-i)throw new Error(`SLObjPack: ${w} exceeds remaining stream`)},u=p=>{if(p>ut.depth)throw new Error("SLObjPack: max depth exceeded");let w=o();if(typeof w!="number"||!Number.isInteger(w))throw new Error(`SLObjPack: invalid opcode ${w}`);if(w>=0)return a(w);switch(w){case-1:{let E=d(o(),ut.objectKeys,"object key");c(E*2,"object");let M=new Array(E);for(let m=0;m<E;m++)M[m]=s();let h={};for(let m=0;m<E;m++)l(h,M[m],u(p+1));return h}case-2:{let E=d(o(),ut.arrayLength,"array item");c(E,"array");let M=new Array(E);for(let h=0;h<E;h++)M[h]=u(p+1);return M}case-3:{let E=d(o(),ut.arrayLength,"schema array item"),M=d(o(),ut.objectKeys,"schema key");if(E*M>ut.decodeOps)throw new Error("SLObjPack: schema array budget exceeded");c(M+E*M,"schema array");let h=new Array(M);for(let b=0;b<M;b++)h[b]=s();let m=new Array(E);for(let b=0;b<E;b++){let x={};for(let y=0;y<M;y++)l(x,h[y],u(p+1));m[b]=x}return m}case-4:return[];case-5:return[u(p+1)];case-6:return{};default:throw new Error(`SLObjPack: unknown opcode ${w}`)}},f=u(0);if(i!==r.length)throw new Error("SLObjPack: extra data after decoding");return f}var kt,Qt;async function _n(){return kt&&kt.expiresAtTime-Date.now()>2e3?kt.accessToken:Qt||(Qt=(async()=>{let e=await et(()=>Spicetify.CosmosAsync),t=await et(()=>Spicetify.Platform);try{kt=await e.get("sp://oauth/v2/token")}catch(r){r.message?.includes("Resolver not found")&&t.Session&&(kt={accessToken:t.Session.accessToken,expiresAtTime:t.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{Qt=void 0}if(!kt)throw new Error("Could not retrieve Spotify Access Token");return kt.accessToken})(),Qt)}async function Nn({id:e}){try{let t=await Za(e),r=es(t);if(!t||!r)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let n=ts(r.result);if(n.status==="missing_lyrics")return{status:"missing_lyrics",data:null,queued:n.queued};if(n.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:n.message}};let i=n.data;return i.Provider="spicy",Xa(i),Qa(i),{status:"success",data:i}}catch(t){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:t instanceof Error?t.message:String(t)}}}}async function Za(e){let r=`Bearer ${await _n()}`;return await An([{operation:"lyrics",variables:{id:e,auth:"SpicyLyrics-WebAuth"}}],r)}function Xa(e){if(e.Type==="Static")return;let t=r=>Math.round(Number(r||0)*1e3);if(e.StartTime=t(e.StartTime),e.EndTime=t(e.EndTime),e.Type==="Syllable")for(let r of e.Content){if(r.Lead){r.Lead.StartTime=t(r.Lead.StartTime),r.Lead.EndTime=t(r.Lead.EndTime);for(let n of r.Lead.Syllables)n.StartTime=t(n.StartTime),n.EndTime=t(n.EndTime)}if(r.Background)for(let n of r.Background){n.StartTime=t(n.StartTime),n.EndTime=t(n.EndTime);for(let i of n.Syllables)i.StartTime=t(i.StartTime),i.EndTime=t(i.EndTime)}}else if(e.Type==="Line")for(let r of e.Content)r.StartTime=t(r.StartTime),r.EndTime=t(r.EndTime)}function Qa(e){let t=r=>{!r.RomanizedText&&r.TransliteratedText&&(r.RomanizedText=r.TransliteratedText)};if(e.Type==="Static"){e.Lines?.forEach(t);return}if(e.Type==="Line"){e.Content?.forEach(t);return}for(let r of e.Content??[])r.Lead?.Syllables?.forEach(t),r.Background?.forEach(n=>n.Syllables?.forEach(t))}function ts(e){if(!e||typeof e!="object")return{status:"error",message:"Spicy returned an empty result"};let t=e,r=t.httpStatus,n=t.data??e;if(r===404||mr(n,"MISSING_LYRICS"))return{status:"missing_lyrics"};if(r===503)return{status:"missing_lyrics",queued:!0};if(r&&r!==200)return{status:"error",message:qn(n)};if(mr(n))return{status:"error",message:qn(n)};if(Rn(n))try{n=In(n)}catch(i){return{status:"error",message:i instanceof Error?i.message:"Malformed packed payload"}}return rs(n)?{status:"success",data:n}:{status:"error",message:"Unexpected response from Spicy"}}function es(e){let t=e?.queries.flat()??[];return t.find(r=>r?.operation==="lyrics"&&!!r?.result)??t.find(r=>!!r?.result)}function rs(e){if(!e||typeof e!="object"||!("Type"in e))return!1;let t=e.Type;return t==="Syllable"||t==="Line"||t==="Static"}function mr(e,t){if(!e||typeof e!="object"||!("error"in e))return!1;let r=e.error;return typeof r=="string"&&(!t||r===t)}function qn(e){return mr(e)?e.message??e.error:"Unexpected Error from Spicy"}var ns="https://lyrics.nmw.it.com",is="liquid-lyrics-server-url",gr="liquid-lyrics-community-token",Ee="liquid-lyrics-community-user",Lt="liquid-lyrics:community-auth",Q=class extends Error{constructor(r,n,i){super(r);this.code=r;this.status=n;this.detail=i;this.name="CommunityError"}};function yr(){return localStorage.getItem(is)?.trim()||ns}function br(){return localStorage.getItem(gr)}function qt(){return!!br()}function pt(){try{let e=localStorage.getItem(Ee);return e?JSON.parse(e):null}catch{return null}}function Pn(e,t){localStorage.setItem(gr,e),localStorage.setItem(Ee,JSON.stringify(t)),window.dispatchEvent(new Event(Lt))}function On(){localStorage.removeItem(gr),localStorage.removeItem(Ee),window.dispatchEvent(new Event(Lt))}async function nt(e,t={}){let r=new Headers(t.headers);r.set("Content-Type","application/json");let n=br();n&&r.set("Authorization",`Bearer ${n}`);let i;try{i=await fetch(`${yr()}${e}`,{...t,headers:r})}catch(a){throw new Q("network_error",void 0,a)}let o=await i.json().catch(()=>({}));return i.status===401&&On(),{res:i,body:o}}async function zn(e,t){let{res:r,body:n}=await nt("/api/auth/register",{method:"POST",body:JSON.stringify({username:e,password:t})});if(!r.ok)throw new Q(n?.error??"request_failed",r.status,n?.detail);return Pn(n.token,n.user),n.user}async function Bn(e,t){let{res:r,body:n}=await nt("/api/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})});if(!r.ok)throw new Q(n?.error??"request_failed",r.status,n?.detail);return Pn(n.token,n.user),n.user}async function Hn(){try{await nt("/api/auth/logout",{method:"POST"})}catch{}On()}async function Dn(){if(!br())return null;try{let{res:e,body:t}=await nt("/api/auth/me",{method:"GET"});return e.status===401?null:e.ok&&t?.user?(localStorage.setItem(Ee,JSON.stringify(t.user)),t.user):pt()}catch{return pt()}}async function Un(e){let{res:t,body:r}=await nt("/api/syncs",{method:"POST",body:JSON.stringify(e)});if(!t.ok)throw new Q(r?.error??"request_failed",t.status,r?.detail);return r.sync}function vr(){let e=pt()?.role;return e==="admin"||e==="moderator"}async function Fn(e,t){let{res:r,body:n}=await nt(`/api/syncs/${encodeURIComponent(e)}/report`,{method:"POST",body:JSON.stringify({reason:t})});if(!r.ok)throw new Q(n?.error??"request_failed",r.status,n?.detail)}async function jn(e){let{res:t,body:r}=await nt(`/api/admin/queue?status=pending&trackId=${encodeURIComponent(e)}`,{method:"GET"});if(!t.ok)throw new Q(r?.error??"request_failed",t.status);return r.syncs??[]}async function Vn(e){let{res:t,body:r}=await nt(`/api/admin/syncs/${encodeURIComponent(e)}/approve`,{method:"POST"});if(!t.ok)throw new Q(r?.error??"request_failed",t.status)}async function Wn(e,t){let{res:r,body:n}=await nt(`/api/admin/syncs/${encodeURIComponent(e)}/reject`,{method:"POST",body:t?JSON.stringify({note:t}):void 0});if(!r.ok)throw new Q(n?.error??"request_failed",r.status)}function it(e){switch(e instanceof Q?e.code:"request_failed"){case"network_error":return"Couldn't reach the community server.";case"unauthorized":return"Please sign in again.";case"forbidden":return"You don't have permission for that.";case"banned":return"Your account is banned.";case"ip_banned":return"Uploads from your network are blocked.";case"too_many_signups_from_ip":return"Too many accounts from your network - try again later.";case"username_taken":return"That username is already taken.";case"invalid_credentials":return"Wrong username or password.";case"invalid_input":return"Check the username (3-32 chars) and password (min 8).";case"unsafe_payload":return"This sync is too large or malformed to upload.";default:return"Something went wrong. Please try again."}}var os=6e3;async function Kn({id:e}){try{let t=e.includes(":")?e.split(":")[2]:e;if(!t)return{status:"missing_lyrics",data:null};let r=new AbortController,n=setTimeout(()=>r.abort(),os),i;try{i=await fetch(`${yr()}/api/syncs/${encodeURIComponent(t)}`,{signal:r.signal})}catch(s){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:s instanceof Error?s.message:"Community request failed"}}}finally{clearTimeout(n)}if(i.status===404)return{status:"missing_lyrics",data:null};if(!i.ok)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:`Community ${i.status}`}};let o=await i.json().catch(()=>null),a=o?.sync?.lyrics;return!a||!a.Type?{status:"missing_lyrics",data:null}:(a.Provider="community",a.LiquidLyricsCommunitySyncId=String(o.sync.id??""),a.LiquidLyricsCommunityUploader=String(o.sync.uploader??""),{status:"success",data:a})}catch(t){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:t instanceof Error?t.message:String(t)}}}}var Te="liquid-lyrics-custom-sync:",$n="liquid-lyrics-custom-sync-index",xr="liquid-lyrics:custom-sync-changed";function Pt(e){let t=String(e??"");return t.includes(":")?t.split(":")[2]??t:t}function Nt(e){return String(e??"").trim()}function te(e){let t=Nt(e);if(!t)return null;try{let r=localStorage.getItem(Te+t);if(!r)return null;let n=JSON.parse(r);return ei(n)?n:null}catch{return null}}function Jn(e){let t=Nt(e);return!!t&&localStorage.getItem(Te+t)!=null}function Yn(e){let t=Nt(e.trackUri||e.trackId);if(!t)return;let r={...e,version:1,updatedAt:Date.now()};try{localStorage.setItem(Te+t,JSON.stringify(r)),as(t,r),ti(r)}catch(n){throw console.error("[Liquid Lyrics] Could not save custom sync",n),n}}function Gn(e){let t=Nt(e);if(!t)return;let r=te(t);localStorage.removeItem(Te+t),Qn(Xn().filter(n=>Nt(n.trackUri||n.trackId)!==t)),ti(r??{trackUri:t,trackId:Pt(t)})}function Zn(e,t){let r=JSON.parse(e);if(!ei(r))throw new Error("Invalid or incomplete sync file");if(t){let n=String(t),i=Pt(n);r.trackUri=n,r.trackId=i,r.draft={...r.draft,trackId:i,trackUri:n},r.lyrics={...r.lyrics,Id:i}}return r}function Xn(){try{let e=localStorage.getItem($n),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function Qn(e){try{localStorage.setItem($n,JSON.stringify(e))}catch(t){console.error("[Liquid Lyrics] Could not update sync index",t)}}function as(e,t){let r={trackId:t.trackId,trackUri:t.trackUri||t.trackId,title:t.title,artist:t.artist,mode:t.mode,updatedAt:t.updatedAt},n=Xn().filter(i=>Nt(i.trackUri||i.trackId)!==e);n.push(r),Qn(n)}function ti(e){window.dispatchEvent(new CustomEvent(xr,{detail:{trackUri:e.trackUri,trackId:e.trackId}}))}function ei(e){if(!e||typeof e!="object")return!1;let t=e;return typeof t.trackId=="string"&&(t.mode==="line"||t.mode==="word")&&!!t.lyrics&&!!t.draft}var ss={community:{id:"community",fetch:Kn},spotify:{id:"spotify",fetch:hr},spicy:{id:"spicy",fetch:Nn}},wr=new Map;async function Se(e){let t=e.id,r=te(e.uri??e.id);if(r)return{status:"success",data:r.lyrics};if(!e.forceRefresh&&wr.has(t))return{status:"success",data:wr.get(t)};let n=!1,i=!1;for(let o of Cn){let a=ss[o];if(!a)continue;let s=await a.fetch(e);if(s.status==="success"&&s.data){if(!ls(s.data)){n=!0;continue}let l=o==="spicy"?await cs(e,s.data):s.data;return i||wr.set(t,l),{...s,data:l}}if(s.status==="missing_lyrics"){n=!0,s.queued&&(i=!0);continue}}return n?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}function ls(e){return e.Type==="Static"?(e.Lines??[]).some(t=>String(t.Text??"").trim().length>0):(e.Content??[]).length>0}async function cs(e,t){if(t.Type!=="Syllable"&&t.Type!=="Line")return t;try{let r=await hr(e);if(r.status!=="success"||!r.data)return t;let n=ds(r.data);if(n.length===0||t.Type==="Line")return t;t.Content.forEach(i=>{let o=i.Lead,a=us(n,o?.StartTime??0,o?.EndTime??0);a&&(i.LiquidLyricsOriginalText=a.text,o&&(o.LiquidLyricsOriginalText=a.text))})}catch{return t}return t}function ds(e){return e.Type!=="Line"?[]:e.Content.filter(t=>t.Type!=="Interlude").map(t=>({text:ps(t.Text),start:Number(t.StartTime)||0,end:Number(t.EndTime)||0})).filter(t=>t.text&&!t.text.includes("\u266A")&&!t.text.includes("\xE2\u2122\xAA"))}function us(e,t,r){let n=Number(t)||0,i=Number(r)||n,o=(n+i)/2,a=null,s=Number.POSITIVE_INFINITY;for(let l of e){let d=(l.start+l.end)/2,c=Math.abs(l.start-n),u=Math.abs(d-o),f=c*.75+u*.25;f<s&&(a=l,s=f)}return a&&s<=3500?a:null}function ps(e){return String(e??"").replace(/\s+/g," ").trim()}var fs="liquid-lyrics-mode",ri="liquid-lyrics-romanization";var Bu=localStorage.getItem(fs)||"romanization",ni="liquid-lyrics-romanization-display",ii=(()=>{let e=localStorage.getItem(ni);return e==="off"||e==="romaji"||e==="furigana"?e:localStorage.getItem(ri)==="true"?"romaji":"off"})();function U(){return ii}function Me(e){ii=e,localStorage.setItem(ni,e),localStorage.setItem(ri,String(e!=="off"))}var Ce="liquid-lyrics-tooltip";function q(e,t){e.dataset.tooltip=t;let r=()=>hs(e,e.dataset.tooltip||t);e.addEventListener("pointerenter",r),e.addEventListener("focus",r),e.addEventListener("pointerleave",ot),e.addEventListener("blur",ot),e.addEventListener("click",()=>window.setTimeout(()=>oi(e),0))}function hs(e,t){if(e.hasAttribute("disabled")||e.hidden)return;let r=ms(e);r.textContent=t,r.classList.add("visible"),oi(e)}function ot(){document.getElementById(Ce)?.classList.remove("visible")}function ms(e){let t=gs(e),r=document.getElementById(Ce);return r||(r=document.createElement("div"),r.id=Ce,r.className="liquid-lyrics-tooltip"),r.parentElement!==t&&t.appendChild(r),r}function gs(e){let t=document.fullscreenElement;return t instanceof HTMLElement&&t.contains(e)?t:document.body}function oi(e){let t=document.getElementById(Ce);if(!t?.classList.contains("visible"))return;if(!e.isConnected){ot();return}let r=e.getBoundingClientRect(),n=9,i=t.offsetWidth||80,o=t.offsetHeight||28,a=Math.max(8,r.top-o-n),s=ys(r.left+r.width/2,i/2+8,window.innerWidth-i/2-8);t.style.left=`${s}px`,t.style.top=`${a}px`}function ys(e,t,r){return Math.min(r,Math.max(t,e))}var co=Mn(Li()),uo=Mn(zi());function Dt(e){return e===null?"null":e!==Object(e)?typeof e:{}.toString.call(e).slice(8,-1).toLowerCase()}function Y(e){return Dt(e)!=="string"?!0:!e.length}function Ut(e="",t,r){if(Y(e))return!1;let n=e.charCodeAt(0);return t<=n&&n<=r}var Bi={HIRAGANA:"toHiragana",KATAKANA:"toKatakana"},Ki={HEPBURN:"hepburn"},Os={useObsoleteKana:!1,passRomaji:!1,convertLongVowelMark:!0,upcaseKatakana:!1,IMEMode:!1,romanization:Ki.HEPBURN},zs=65,Bs=90,Hs=65345,Ds=65370,Us=65313,Fs=65338,Pr=12353,js=12438,Or=12449,Vs=12540,Ws=19968,Ks=40879,$s=12293,Js=12540,Ys=12539,Gs=[65296,65305],Zs=[Us,Fs],Xs=[Hs,Ds],Qs=[65281,65295],tl=[65306,65311],el=[65339,65343],rl=[65371,65376],nl=[65504,65518],il=[12352,12447],ol=[12448,12543],al=[65382,65439],sl=[12539,12540],$i=[65377,65381],ll=[12288,12351],cl=[19968,40959],dl=[13312,19903],ul=[il,ol,$i,al],pl=[ll,$i,sl,Qs,tl,el,rl,nl],np=[...ul,...pl,Zs,Xs,Gs,cl,dl],fl=[0,127],hl=[[256,257],[274,275],[298,299],[332,333],[362,363]],ml=[[8216,8217],[8220,8221]],gl=[fl,...hl],yl=[[32,47],[58,63],[91,96],[123,126],...ml];var Hi=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function bl(e,t){return!!(e===t||Hi(e)&&Hi(t))}function vl(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!bl(e[r],t[r]))return!1;return!0}function Ji(e,t){t===void 0&&(t=vl);var r=null;function n(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];if(r&&r.lastThis===this&&t(i,r.lastArgs))return r.lastResult;var a=e.apply(this,i);return r={lastResult:a,lastArgs:i,lastThis:this},a}return n.clear=function(){r=null},n}var Di=Object.prototype.hasOwnProperty;function Ui(e,t,r){for(r of e.keys())if(Ht(r,t))return r}function Ht(e,t){var r,n,i;if(e===t)return!0;if(e&&t&&(r=e.constructor)===t.constructor){if(r===Date)return e.getTime()===t.getTime();if(r===RegExp)return e.toString()===t.toString();if(r===Array){if((n=e.length)===t.length)for(;n--&&Ht(e[n],t[n]););return n===-1}if(r===Set){if(e.size!==t.size)return!1;for(n of e)if(i=n,i&&typeof i=="object"&&(i=Ui(t,i),!i)||!t.has(i))return!1;return!0}if(r===Map){if(e.size!==t.size)return!1;for(n of e)if(i=n[0],i&&typeof i=="object"&&(i=Ui(t,i),!i)||!Ht(n[1],t.get(i)))return!1;return!0}if(r===ArrayBuffer)e=new Uint8Array(e),t=new Uint8Array(t);else if(r===DataView){if((n=e.byteLength)===t.byteLength)for(;n--&&e.getInt8(n)===t.getInt8(n););return n===-1}if(ArrayBuffer.isView(e)){if((n=e.byteLength)===t.byteLength)for(;n--&&e[n]===t[n];);return n===-1}if(!r||typeof e=="object"){n=0;for(r in e)if(Di.call(e,r)&&++n&&!Di.call(t,r)||!(r in t)||!Ht(e[r],t[r]))return!1;return Object.keys(t).length===n}}return e!==e&&t!==t}var zr=(e={})=>Object.assign({},Os,e);function Yi(e,t,r){let n=t;function i(s,l){if(s[l]!==void 0)return Object.assign({"":s[""]+l},s[l])}function o(s,l){let d=s.charAt(0);return a(Object.assign({"":d},n[d]),s.slice(1),l,l+1)}function a(s,l,d,c){if(!l)return r||Object.keys(s).length===1?s[""]?[[d,c,s[""]]]:[]:[[d,c,null]];if(Object.keys(s).length===1)return[[d,c,s[""]]].concat(o(l,c));let u=i(s,l.charAt(0));return u===void 0?[[d,c,s[""]]].concat(o(l,c)):a(u,l.slice(1),d,c+1)}return o(e,0)}function Br(e){return Object.entries(e).reduce((t,[r,n])=>{let i=Dt(n)==="string";return t[r]=i?{"":n}:Br(n),t},{})}function Gi(e,t){return t.split("").reduce((r,n)=>(r[n]===void 0&&(r[n]={}),r[n]),e)}function Zi(e={}){let t={};return Dt(e)==="object"&&Object.entries(e).forEach(([r,n])=>{let i=t;r.split("").forEach(o=>{i[o]===void 0&&(i[o]={}),i=i[o]}),i[""]=n}),function(n){let i=JSON.parse(JSON.stringify(n));function o(a,s){return a===void 0||Dt(a)==="string"?s:Object.entries(s).reduce((l,[d,c])=>(l[d]=o(a[d],c),l),a)}return o(i,t)}}function Xi(e,t){return t?Dt(t)==="function"?t(e):Zi(t)(e):e}var xl={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u304A",k:{a:"\u304B",i:"\u304D",u:"\u304F",e:"\u3051",o:"\u3053"},s:{a:"\u3055",i:"\u3057",u:"\u3059",e:"\u305B",o:"\u305D"},t:{a:"\u305F",i:"\u3061",u:"\u3064",e:"\u3066",o:"\u3068"},n:{a:"\u306A",i:"\u306B",u:"\u306C",e:"\u306D",o:"\u306E"},h:{a:"\u306F",i:"\u3072",u:"\u3075",e:"\u3078",o:"\u307B"},m:{a:"\u307E",i:"\u307F",u:"\u3080",e:"\u3081",o:"\u3082"},y:{a:"\u3084",u:"\u3086",o:"\u3088"},r:{a:"\u3089",i:"\u308A",u:"\u308B",e:"\u308C",o:"\u308D"},w:{a:"\u308F",i:"\u3090",e:"\u3091",o:"\u3092"},g:{a:"\u304C",i:"\u304E",u:"\u3050",e:"\u3052",o:"\u3054"},z:{a:"\u3056",i:"\u3058",u:"\u305A",e:"\u305C",o:"\u305E"},d:{a:"\u3060",i:"\u3062",u:"\u3065",e:"\u3067",o:"\u3069"},b:{a:"\u3070",i:"\u3073",u:"\u3076",e:"\u3079",o:"\u307C"},p:{a:"\u3071",i:"\u3074",u:"\u3077",e:"\u307A",o:"\u307D"},v:{a:"\u3094\u3041",i:"\u3094\u3043",u:"\u3094",e:"\u3094\u3047",o:"\u3094\u3049"}},wl={".":"\u3002",",":"\u3001",":":"\uFF1A","/":"\u30FB","!":"\uFF01","?":"\uFF1F","~":"\u301C","-":"\u30FC","\u2018":"\u300C","\u2019":"\u300D","\u201C":"\u300E","\u201D":"\u300F","[":"\uFF3B","]":"\uFF3D","(":"\uFF08",")":"\uFF09","{":"\uFF5B","}":"\uFF5D"},Fi={k:"\u304D",s:"\u3057",t:"\u3061",n:"\u306B",h:"\u3072",m:"\u307F",r:"\u308A",g:"\u304E",z:"\u3058",d:"\u3062",b:"\u3073",p:"\u3074",v:"\u3094",q:"\u304F",f:"\u3075"},Qi={ya:"\u3083",yi:"\u3043",yu:"\u3085",ye:"\u3047",yo:"\u3087"},to={a:"\u3041",i:"\u3043",u:"\u3045",e:"\u3047",o:"\u3049"},ji={sh:"sy",ch:"ty",cy:"ty",chy:"ty",shy:"sy",j:"zy",jy:"zy",shi:"si",chi:"ti",tsu:"tu",ji:"zi",fu:"hu"},kl=Object.assign({tu:"\u3063",wa:"\u308E",ka:"\u30F5",ke:"\u30F6"},to,Qi),Ll={yi:"\u3044",wu:"\u3046",ye:"\u3044\u3047",wi:"\u3046\u3043",we:"\u3046\u3047",kwa:"\u304F\u3041",whu:"\u3046",tha:"\u3066\u3083",thu:"\u3066\u3085",tho:"\u3066\u3087",dha:"\u3067\u3083",dhu:"\u3067\u3085",dho:"\u3067\u3087"},El={wh:"\u3046",kw:"\u304F",qw:"\u304F",q:"\u304F",gw:"\u3050",sw:"\u3059",ts:"\u3064",th:"\u3066",tw:"\u3068",dh:"\u3067",dw:"\u3069",fw:"\u3075",f:"\u3075"};function Tl(){let e=Br(xl),t=i=>Gi(e,i);Object.entries(Fi).forEach(([i,o])=>{Object.entries(Qi).forEach(([a,s])=>{t(i+a)[""]=o+s})}),Object.entries(wl).forEach(([i,o])=>{t(i)[""]=o}),Object.entries(El).forEach(([i,o])=>{Object.entries(to).forEach(([a,s])=>{let l=t(i+a);l[""]=o+s})}),["n","n'","xn"].forEach(i=>{t(i)[""]="\u3093"}),e.c=JSON.parse(JSON.stringify(e.k)),Object.entries(ji).forEach(([i,o])=>{let a=i.slice(0,i.length-1),s=i.charAt(i.length-1),l=t(a);l[s]=JSON.parse(JSON.stringify(t(o)))});function r(i){return[...Object.entries(ji),["c","k"]].reduce((o,[a,s])=>i.startsWith(s)?o.concat(i.replace(s,a)):o,[])}Object.entries(kl).forEach(([i,o])=>{let a=u=>u.charAt(u.length-1),s=u=>u.slice(0,u.length-1),l=`x${i}`,d=t(l);d[""]=o;let c=t(`l${s(i)}`);c[a(i)]=d,r(i).forEach(u=>{["l","x"].forEach(f=>{let p=t(f+s(u));p[a(u)]=t(f+i)})})}),Object.entries(Ll).forEach(([i,o])=>{t(i)[""]=o});function n(i){return Object.entries(i).reduce((o,[a,s])=>(a?o[a]=n(s):o[a]=`\u3063${s}`,o),{})}return[...Object.keys(Fi),"c","y","w","j"].forEach(i=>{let o=e[i];o[i]=n(o)}),delete e.n.n,Object.freeze(JSON.parse(JSON.stringify(e)))}var Ir=null;function Sl(){return Ir==null&&(Ir=Tl()),Ir}var Ml=Zi({wi:"\u3090",we:"\u3091"});function Cl(e){let t=JSON.parse(JSON.stringify(e));return t.n.n={"":"\u3093"},t.n[" "]={"":"\u3093"},t}function Al(e=""){return Y(e)?!1:Ut(e,zs,Bs)}function re(e=""){return Y(e)?!1:e.charCodeAt(0)===Js}function eo(e=""){return Y(e)?!1:e.charCodeAt(0)===Ys}function ro(e=""){return Y(e)?!1:re(e)?!0:Ut(e,Pr,js)}function Rl(e=""){let t=[];return e.split("").forEach(r=>{if(re(r)||eo(r))t.push(r);else if(ro(r)){let n=r.charCodeAt(0)+(Or-Pr),i=String.fromCharCode(n);t.push(i)}else t.push(r)}),t.join("")}var no=Ji((e,t,r)=>{let n=Sl();return n=e?Cl(n):n,n=t?Ml(n):n,r&&(n=Xi(n,r)),n},Ht);function Vi(e="",t={},r){let n;return r?n=t:(n=zr(t),r=no(n.IMEMode,n.useObsoleteKana,n.customKanaMapping)),Il(e,n,r).map(i=>{let[o,a,s]=i;if(s===null)return e.slice(o);let l=n.IMEMode===Bi.HIRAGANA,d=n.IMEMode===Bi.KATAKANA||[...e.slice(o,a)].every(Al);return l||!d?s:Rl(s)}).join("")}function Il(e="",t={},r){let{IMEMode:n,useObsoleteKana:i,customKanaMapping:o}=t;return r||(r=no(n,i,o)),Yi(e.toLowerCase(),r,!n)}function _l(e=""){return Y(e)?!1:gl.some(([t,r])=>Ut(e,t,r))}function io(e="",t){let r=Dt(t)==="regexp";return Y(e)?!1:[...e].every(n=>{let i=_l(n);return r?i||t.test(n):i})}function Nr(e=""){return Ut(e,Or,Vs)}function ql(e=""){return Y(e)?!1:[...e].every(ro)}function oo(e=""){return Y(e)?!1:[...e].every(Nr)}function Nl(e=""){return Y(e)?!1:e.charCodeAt(0)===$s}function Pl(e=""){return Ut(e,Ws,Ks)||Nl(e)}function Ol(e=""){return Y(e)?!1:[...e].every(Pl)}function zl(e="",t={passKanji:!0}){let r=[...e],n=!1;return t.passKanji||(n=r.some(Ol)),(r.some(ql)||r.some(oo))&&r.some(io)&&!n}var Bl=(e,t)=>re(e)&&t<1,Hl=(e,t)=>re(e)&&t>0,Dl=e=>["\u30F6","\u30F5"].includes(e),Ul={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u3046"};function _e(e="",t,{isDestinationRomaji:r,convertLongVowelMark:n}={}){let i="";return e.split("").reduce((o,a,s)=>{if(eo(a)||Bl(a,s)||Dl(a))return o.concat(a);if(n&&i&&Hl(a,s)){let l=t(i).slice(-1);return Nr(e[s-1])&&l==="o"&&r?o.concat("\u304A"):o.concat(Ul[l])}if(!re(a)&&Nr(a)){let l=a.charCodeAt(0)+(Pr-Or),d=String.fromCharCode(l);return i=d,o.concat(d)}return i="",o.concat(a)},[]).join("")}var _r=null,Fl={\u3042:"a",\u3044:"i",\u3046:"u",\u3048:"e",\u304A:"o",\u304B:"ka",\u304D:"ki",\u304F:"ku",\u3051:"ke",\u3053:"ko",\u3055:"sa",\u3057:"shi",\u3059:"su",\u305B:"se",\u305D:"so",\u305F:"ta",\u3061:"chi",\u3064:"tsu",\u3066:"te",\u3068:"to",\u306A:"na",\u306B:"ni",\u306C:"nu",\u306D:"ne",\u306E:"no",\u306F:"ha",\u3072:"hi",\u3075:"fu",\u3078:"he",\u307B:"ho",\u307E:"ma",\u307F:"mi",\u3080:"mu",\u3081:"me",\u3082:"mo",\u3089:"ra",\u308A:"ri",\u308B:"ru",\u308C:"re",\u308D:"ro",\u3084:"ya",\u3086:"yu",\u3088:"yo",\u308F:"wa",\u3090:"wi",\u3091:"we",\u3092:"wo",\u3093:"n",\u304C:"ga",\u304E:"gi",\u3050:"gu",\u3052:"ge",\u3054:"go",\u3056:"za",\u3058:"ji",\u305A:"zu",\u305C:"ze",\u305E:"zo",\u3060:"da",\u3062:"ji",\u3065:"zu",\u3067:"de",\u3069:"do",\u3070:"ba",\u3073:"bi",\u3076:"bu",\u3079:"be",\u307C:"bo",\u3071:"pa",\u3074:"pi",\u3077:"pu",\u307A:"pe",\u307D:"po",\u3094\u3041:"va",\u3094\u3043:"vi",\u3094:"vu",\u3094\u3047:"ve",\u3094\u3049:"vo"},jl={"\u3002":".","\u3001":",","\uFF1A":":","\u30FB":"/","\uFF01":"!","\uFF1F":"?","\u301C":"~",\u30FC:"-","\u300C":"\u2018","\u300D":"\u2019","\u300E":"\u201C","\u300F":"\u201D","\uFF3B":"[","\uFF3D":"]","\uFF08":"(","\uFF09":")","\uFF5B":"{","\uFF5D":"}","\u3000":" "},Vl=["\u3042","\u3044","\u3046","\u3048","\u304A","\u3084","\u3086","\u3088"],qr={\u3083:"ya",\u3085:"yu",\u3087:"yo"},Wl={\u3043:"yi",\u3047:"ye"},Kl={\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},$l=["\u304D","\u306B","\u3072","\u307F","\u308A","\u304E","\u3073","\u3074","\u3094","\u304F","\u3075"],Jl={\u3057:"sh",\u3061:"ch",\u3058:"j",\u3062:"j"},Yl={\u3063:"",\u3083:"ya",\u3085:"yu",\u3087:"yo",\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},Wi={b:"b",c:"t",d:"d",f:"f",g:"g",h:"h",j:"j",k:"k",m:"m",p:"p",q:"q",r:"r",s:"s",t:"t",v:"v",w:"w",x:"x",z:"z"};function Gl(){return _r==null&&(_r=Xl()),_r}function Zl(e){switch(e){case Ki.HEPBURN:return Gl();default:return{}}}function Xl(){let e=Br(Fl),t=n=>Gi(e,n),r=(n,i)=>{t(n)[""]=i};return Object.entries(jl).forEach(([n,i])=>{t(n)[""]=i}),[...Object.entries(qr),...Object.entries(Kl)].forEach(([n,i])=>{r(n,i)}),$l.forEach(n=>{let i=t(n)[""][0];Object.entries(qr).forEach(([o,a])=>{r(n+o,i+a)}),Object.entries(Wl).forEach(([o,a])=>{r(n+o,i+a)})}),Object.entries(Jl).forEach(([n,i])=>{Object.entries(qr).forEach(([o,a])=>{r(n+o,i+a[1])}),r(`${n}\u3043`,`${i}yi`),r(`${n}\u3047`,`${i}e`)}),e.\u3063=ao(e),Object.entries(Yl).forEach(([n,i])=>{r(n,i)}),Vl.forEach(n=>{r(`\u3093${n}`,`n'${t(n)[""]}`)}),Object.freeze(JSON.parse(JSON.stringify(e)))}function ao(e){return Object.entries(e).reduce((t,[r,n])=>{if(r)t[r]=ao(n);else{let i=n.charAt(0);t[r]=Object.keys(Wi).includes(i)?Wi[i]+n:n}return t},{})}var so=Ji((e,t)=>{let r=Zl(e);return t&&(r=Xi(r,t)),r},Ht);function St(e="",t={},r){let n=zr(t);return r||(r=so(n.romanization,n.customRomajiMapping)),Ql(e,n,r).map(i=>{let[o,a,s]=i;return n.upcaseKatakana&&oo(e.slice(o,a))?s.toUpperCase():s}).join("")}function Ql(e,t,r){r||(r=so(t.romanization,t.customRomajiMapping));let n=Object.assign({},{isDestinationRomaji:!0},t);return Yi(_e(e,St,n),r,!t.IMEMode)}function tc(e=""){return Y(e)?!1:yl.some(([t,r])=>Ut(e,t,r))}function lo(e="",t={}){let r=zr(t);if(r.passRomaji)return _e(e,St,r);if(zl(e,{passKanji:!0})){let n=_e(e,St,r);return Vi(n.toLowerCase(),r)}return io(e)||tc(e)?Vi(e.toLowerCase(),r):_e(e,St,r)}var rc=["https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict","https://unpkg.com/kuromoji@0.1.2/dict"],nc=["base.dat.gz","check.dat.gz","tid.dat.gz","tid_pos.dat.gz","tid_map.dat.gz","cc.dat.gz","unk.dat.gz","unk_pos.dat.gz","unk_map.dat.gz","unk_char.dat.gz","unk_compat.dat.gz","unk_invoke.dat.gz"],ic=["https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://fastly.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://unpkg.com/pinyin-pro@3/dist/index.min.js"];function Dr(e){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(e)}function Ur(e){return/[가-힯ᄀ-ᇿ㄰-㆏]/.test(e)}function qe(e){return/[㐀-䶿一-鿿豈-﫿]/.test(e)}function po(e){let t=!1;for(let r of e){if(Dr(r))return"ja";if(Ur(r))return"ko";qe(r)&&(t=!0)}return t?"zh":null}async function fo(e,t){if(e.length===0)return[];if(t==="ko")return e.map(a=>ht(vo(a)));if(t==="zh"){let a=await xo();return a?e.map(s=>ht(wo(a,s))):null}let r=e.join(""),n=await Ne(r);if(!n)return null;let i=yo(e),o=e.map(()=>[]);for(let a of n)bo(a,i,(s,l,d)=>{let c=d?a.reading||a.surface:cc(a,l);c&&o[s].push(c)});return e.map((a,s)=>ht(o[s].map(l=>String(St(l))).filter(Boolean).join(" ")))}async function ho(e,t){let r=ht(e);if(!r)return"";if(t==="ko")return ht(vo(r));if(t==="zh"){let o=await xo();return o?ht(wo(o,r)):null}let n=await Ne(r);if(!n)return null;let i=n.map(o=>String(St(o.reading||o.surface))).map(o=>o.trim()).filter(Boolean).join(" ");return ht(i)}async function mo(e){if(e.length===0)return[];let t=e.join(""),r=await Ne(t);if(!r)return null;let n=yo(e),i=e.map(()=>[]),o=e.map(()=>!1);for(let a of r)bo(a,n,(s,l,d)=>{d&&a.hasKanji&&a.reading?(i[s].push(`<ruby>${ft(a.surface)}<rt>${ft(a.reading)}</rt></ruby>`),o[s]=!0):i[s].push(ft(l))});return e.map((a,s)=>o[s]?i[s].join(""):null)}async function go(e){let t=ht(e);if(!t)return"";let r=await Ne(t);if(!r)return null;let n=!1,i=0,o="";for(let a of r)a.start>i&&(o+=ft(t.slice(i,a.start))),a.hasKanji&&a.reading?(o+=`<ruby>${ft(a.surface)}<rt>${ft(a.reading)}</rt></ruby>`,n=!0):o+=ft(a.surface),i=a.end;return i<t.length&&(o+=ft(t.slice(i))),n?o:""}var ne=null;function oc(){return ne||(ne=(async()=>{for(let e of rc){let t=await ac(e);if(t)return t;console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${e}, trying next source\u2026`)}return console.warn("[Liquid Lyrics] Local Japanese romanization unavailable: no dictionary source worked."),null})(),ne.then(e=>{e||(ne=null)})),ne}async function ac(e){try{let t=await Promise.all(nc.map(n=>sc(`${e}/${n}`))),r=new co.default;return r.loadTrie(new Int32Array(t[0]),new Int32Array(t[1])),r.loadTokenInfoDictionaries(new Uint8Array(t[2]),new Uint8Array(t[3]),new Uint8Array(t[4])),r.loadConnectionCosts(new Int16Array(t[5])),r.loadUnknownDictionaries(new Uint8Array(t[6]),new Uint8Array(t[7]),new Uint8Array(t[8]),new Uint8Array(t[9]),new Uint32Array(t[10]),new Uint8Array(t[11])),new uo.default(r)}catch{return null}}async function sc(e){let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);let r=new Uint8Array(await t.arrayBuffer());if(r[0]===31&&r[1]===139){let n=new Blob([r]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(n).arrayBuffer()}return r.buffer}async function Ne(e){if(!e)return[];let t=await oc();if(!t)return null;let r;try{r=t.tokenize(e)}catch{return null}let n=[],i=0;for(let o of r){let a=String(o?.surface_form??"");if(!a)continue;let s=Number(o?.word_position),l=Number.isFinite(s)&&s>0?s-1:Math.max(i,e.indexOf(a,i)),d=l+a.length;i=d;let c=qe(a),u=typeof o?.reading=="string"&&o.reading!=="*"?o.reading:"",f=u?String(lo(u)):c?"":a;f=lc(a,String(o?.pos??""),f),n.push({start:l,end:d,surface:a,reading:f,hasKanji:c})}return n}function lc(e,t,r){return t.includes("\u52A9\u8A5E")?e==="\u306F"?"\u308F":e==="\u3078"?"\u3048":e==="\u3092"?"\u304A":r:r}function yo(e){let t=[],r=0;for(let n of e)t.push([r,r+n.length]),r+=n.length;return t}function bo(e,t,r){let n=e.end-e.start;if(!(n<=0))for(let i=0;i<t.length;i++){let[o,a]=t[i],s=Math.max(o,e.start),l=Math.min(a,e.end);if(l<=s)continue;let d=e.surface.slice(s-e.start,l-e.start);r(i,d,l-s>=n)}}function cc(e,t){let r=e.reading||e.surface,n=e.end-e.start;if(n<=0||!r)return"";let i=e.surface.indexOf(t);if(i<0)return"";let o=Math.round(r.length*i/n),a=Math.round(r.length*(i+t.length)/n);return r.slice(o,a)}var dc=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"],uc=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"],pc=["","k","k","k","n","n","n","t","l","k","m","p","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"],fc=["","g","kk","ks","n","nj","nh","d","r","lg","lm","lb","ls","lt","lp","lh","m","b","ps","s","ss","ng","j","ch","k","t","p","h"];function vo(e){let t=Array.from(e),r="";for(let n=0;n<t.length;n++){let i=t[n].codePointAt(0)??0;if(i<44032||i>55203){r+=t[n];continue}let o=i-44032,a=Math.floor(o/588),s=Math.floor(o%588/28),l=o%28,d=t[n+1]?.codePointAt(0)??0,f=(d>=44032&&d<=55203?Math.floor((d-44032)/588):-1)===11;r+=dc[a]+uc[s],r+=f?fc[l]:pc[l]}return r}async function xo(){return await hc(ic,()=>!!window.pinyinPro?.pinyin)?window.pinyinPro.pinyin:null}function wo(e,t){try{return String(e(t,{toneType:"symbol",nonZh:"consecutive"}))}catch{return t}}var Hr=new Map;async function hc(e,t){for(let r of e)if(await mc(r,t))return!0;return!1}function mc(e,t){if(t())return Promise.resolve(!0);let r=Hr.get(e);return r||(r=new Promise(n=>{let i=document.createElement("script");i.src=e,i.onload=()=>n(t()),i.onerror=()=>n(!1),document.head.appendChild(i)}),Hr.set(e,r),r.then(n=>{n||Hr.delete(e)})),r}function ft(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ht(e){return String(e??"").replace(/\s+/g," ").trim()}function To(e){return e.Type==="Line"?gc(e.Content??[]):e.Type==="Syllable"?yc(e.Content??[]):(e.Lines??[]).map(t=>({kind:"static",text:z(t.Text),romanizedText:z(t.RomanizedText)})).filter(t=>t.text)}function gc(e){let t=[],r=B(e[0]?.StartTime,0);return e.length>0&&r>500&&t.push(Pe(0,r)),e.forEach((n,i)=>{let o=e[i+1],a=bc(n,o);n.Type==="Interlude"?t.push(Pe(a.start,a.end)):t.push({kind:"line",range:a,text:z(n.Text),romanizedText:z(n.RomanizedText)}),So(t,a.end,B(o?.StartTime,NaN))}),t}function yc(e){let t=[],r=e.map((n,i)=>vc(n,e[i+1]));return r.length>0&&r[0].range.start>500&&t.push(Pe(0,r[0].range.start)),r.forEach((n,i)=>{t.push({kind:"syllable",range:n.range,text:n.lead.sourceText||n.lead.words.map(o=>o.text).join(" ").trim(),romanizedText:Ec(n.lead.words),lead:n.lead,backgrounds:n.backgrounds}),So(t,n.range.end,r[i+1]?.range.start??NaN)}),t}function Pe(e,t){return{kind:"interlude",range:{start:e,end:Math.max(t,e+250)}}}function So(e,t,r){Number.isFinite(r)&&(r-t<3e3||e.push(Pe(t,r)))}function bc(e,t){let r=B(e.StartTime,0),n=B(t?.StartTime,NaN),i=B(e.EndTime,r+4500),o=Co(i,n);return{start:r,end:Ao(o,r,o,250)}}function vc(e,t){let r=Lo(e.Lead),n=(e.Background??[]).map(u=>Lo(u)),i=B(t?.Lead?.StartTime,NaN),o=r.range.start,a=Number.isFinite(i)&&i>o?i:o+4500,s=Math.max(r.range.end,...n.map(u=>u.range.end)),l=Co(s,i),c=ko(e.Lead)||(e.Background??[]).some(ko)?Number.POSITIVE_INFINITY:a;return{range:{start:o,end:Ao(l,o,a,250,c)},lead:r,backgrounds:n}}function ko(e){let t=B(e?.StartTime,0),r=Number(e?.EndTime);return Number.isFinite(r)&&r>t}function Lo(e){let t=B(e?.StartTime,0),r=Number(e?.EndTime),n=Number.isFinite(r)&&r>t?B(r,t):t+4500,i={start:t,end:n};return{range:i,sourceText:Sc(e),words:wc(xc(e?.Syllables??[],i),i)}}function xc(e,t){let r=[],n=null,i=!1;return e.forEach((o,a)=>{let s={text:z(o.Text),romanizedText:z(o.RomanizedText),start:B(o.StartTime,t.start),end:B(o.EndTime,t.start+80),animateLetters:!1},l=!!(o.IsPartOfWord||i)&&!mt(s.text)&&!mt(n?.text??"");l&&n?(n.text+=s.text,n.romanizedText=Ac(n.romanizedText,s.romanizedText," "),n.start=Math.min(n.start,s.start),n.end=Math.max(n.end,s.end)):(n&&!l&&r.push(n),n=s),i=!!o.IsPartOfWord,(!o.IsPartOfWord||a===e.length-1)&&n&&(r.push(n),n=null)}),r.filter(o=>o.text)}function wc(e,t){if(e.length===0)return[];let r=t.start,n=Math.max(t.end,r+250),i=e.map(l=>({...l,start:lt(l.start,r,n),end:lt(l.end,r,n)})).filter(l=>l.text.trim().length>0),o=r;i.forEach(l=>{l.start=Math.max(o,l.start),o=l.start});let a=[];i.forEach(l=>{let d=a[a.length-1],c=d?.[0]?.start;d&&c!==void 0&&Math.abs(l.start-c)<=12?(l.start=c,d.push(l)):a.push([l])});let s=[];return a.forEach((l,d)=>{let c=l[0].start,u=a[d+1]?.[0]?.start??n,f=Math.max(c+1,u);if(l.length===1){s.push({...l[0],start:c,end:Lc(l[0].end,c,f)});return}kc(l,c,f).forEach(p=>s.push(p))}),s.map((l,d)=>{let c=s[d+1]?.start??n,u=Math.max(l.start+1,c),f=Math.min(Math.max(l.end,l.start+1),u);return{...l,end:f,animateLetters:Oe(l.text,l.start,f)}})}function kc(e,t,r){let n=Math.max(r,t+e.length*80),i=e.reduce((a,s)=>a+Eo(s.text),0)||e.length,o=t;return e.map((a,s)=>{let l=s===e.length-1,d=e.length-s,c=Math.max(1,n-o),u=(n-t)*Eo(a.text)/i,f=Math.max(1,c-(d-1)),p=o,w=l?n:o+lt(u,1,f);return o=w,{...a,start:p,end:w}})}function Lc(e,t,r){return Number.isFinite(e)&&e>t?Math.min(e,r):r}function Eo(e){return Math.max(1,Array.from(e.trim()).length)}function Oe(e,t,r){let n=Array.from(e.trim());if(n.length<3)return!1;let i=r-t;return i<750||i/n.length<90?!1:n.some(o=>/[A-Za-z0-9]/.test(o))}function Ec(e){return e.map(t=>ze(t.romanizedText)).filter(Boolean).join(" ").trim()}function Mo(e){let t=Array.isArray(e.SongWriters)?Array.from(new Set(e.SongWriters.map(n=>z(n)).filter(Boolean))):[],r=Tc(e);return t.length===0&&!r?null:{writers:t,source:r}}function Tc(e){let t=e.Provider,r=z(e.LiquidLyricsCredit);if(t==="local")return r?`Synced by ${r}`:"Custom sync";if(t==="community")return r?`via Liquid Lyrics (community) \xB7 Made by @${r}`:"via Liquid Lyrics (community)";if(r)return`Synced by ${r}`;if(t==="spicy"){if(e.source==="spl"){let n=z(e.TTMLUploadMetadata?.Maker?.username)||z(e.TTMLUploadMetadata?.Uploader?.username);return n?`via Spicy Lyrics (community) \xB7 Made by @${n}`:"via Spicy Lyrics (community)"}return"via Spicy Lyrics"}return t==="spotify"?"via Spotify":""}function z(e){return String(e??"").replace(/\s+/g," ").trim()}function ze(e){let t=z(e);return t&&!mt(t)?t:""}function mt(e){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(e)}function Sc(e){return z(e?.LiquidLyricsOriginalText)||Mc(e?.Syllables??[])}function Mc(e){let t="",r="",n=!1;return e.forEach(i=>{let o=z(i.Text);if(!o)return;let a=!t||i.IsPartOfWord||n||Cc(r,o);t+=a?o:` ${o}`,r=o,n=!!i.IsPartOfWord}),t.trim()}function Cc(e,t){return!e||!t||/^[,.;:!?)]/.test(t)||/[(]$/.test(e)?!0:mt(e)||mt(t)}function Ac(e,t,r){let n=z(e),i=z(t);return n?i?`${n}${r}${i}`:n:i||void 0}function Co(e,t){return!Number.isFinite(t)||t<=e?e:t-e<3e3?t:e}function Ao(e,t,r,n,i=Number.POSITIVE_INFINITY){let o=B(e,r),a=o>=t+n?o:Math.max(r,t+n);return Math.min(a,i)}function B(e,t){let r=Number(e);return Number.isFinite(r)?Math.max(0,r):t}function lt(e,t=0,r=1){return Math.min(r,Math.max(t,e))}function Fr(e,t){return lt((t-e.start)/Math.max(1,e.end-e.start))}function Ft(e,t,r){let n=lt((r-e)/(t-e));return n*n*(3-2*n)}var Rc=1200,Ic=60,_c=750,Io=3e3,qc=[200,900,2400],Nc=4e3,_o="",ie=0,Be=0,He=0,jr=0,Vr=!1,qo=!1,No=0,Ro=[];function gt(){let e=B(Spicetify.Player?.getProgress?.(),0),t=jt(),r=performance.now(),n=ie+(r-Be),i=!G(),o=t!==_o,a=Math.abs(e-n)>Rc;if(i||o||a)return He++,Wr(e,t,r),jr=r,!i&&(o||a)&&De(),e;if(!qo||r-No>Io*2.5){let d=e-n;if(Math.abs(d)>Ic){let c=Math.min(120,Math.max(0,r-jr));ie+=d*Math.min(1,c/_c)}}jr=r;let s=ie+(r-Be),l=V();return l>0?Math.min(s,l):s}function yt(e){let t=Math.max(0,Math.round(e));He++,Wr(t),Spicetify.Player?.seek?.(t),De()}function Po(){Vr||(Vr=!0,["songchange","onplaypause"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>De())}catch{}}),window.setInterval(()=>{G()&&Oo()},Io),De())}function De(){Vr&&(Ro.forEach(e=>clearTimeout(e)),Ro=qc.map(e=>window.setTimeout(()=>void Oo(),e)))}async function Oo(){let e=Pc();if(typeof e?.getPositionState!="function")return;let t=He,r=jt();try{let n=await e.getPositionState({}),i=Number(n?.position);if(!Number.isFinite(i)||i<0||t!==He||r!==jt()||!G())return;let o=performance.now(),a=ie+(o-Be);if(Math.abs(i-a)>Nc)return;qo=!0,No=o,Wr(i,r,o)}catch{}}function Pc(){return Spicetify.Platform?.PlayerAPI?._contextPlayer??Spicetify.Player?.origin?._contextPlayer??null}function G(){let e=Spicetify.Player;return typeof e?.isPlaying=="function"?!!e.isPlaying():typeof e?.data?.isPaused=="boolean"?!e.data.isPaused:!!(e?.data?.is_playing??e?.data?.isPlaying)}function V(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{};return B(t.duration_ms??t.duration??e?.duration?.milliseconds??e?.duration_ms??Spicetify.Player?.data?.duration,0)}function jt(){return String(Spicetify.Player?.data?.item?.uri??"")}function Wr(e,t=jt(),r=performance.now()){_o=t,ie=Math.max(0,e),Be=r}var oe=new Set,Mt=null;function Vt(e){return oe.add(e),Mt===null&&(Mt=requestAnimationFrame(zo)),()=>{oe.delete(e),oe.size===0&&Mt!==null&&(cancelAnimationFrame(Mt),Mt=null)}}function zo(e){if(oe.size===0){Mt=null;return}Mt=requestAnimationFrame(zo);let t=gt();for(let r of oe)r(t,e)}var Bo=900,Oc=.92,zc=5e3,Bc=180,Ho=1100,Kr=.75,Hc=8,R=-999,bt=class{constructor(t){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=R;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.romanMode="off";this.songLang=null;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.lastAutoScrollTop=-1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.tick=(t,r)=>{if(t===this.lastProgress)return;this.lastProgress=t;let n=this.findActiveIndex(t);n!==this.activeIndex&&(this.applyPosition(n,t),this.activeIndex=n),n>=0&&(this.virtual&&this.mountAround(n),this.updateActiveLine(this.records[n],t)),this.outgoingLines.length>0&&this.updateOutgoingLines(t)};this.onUserScroll=()=>{this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},zc)};this.onContainerClick=t=>{let r=t.target?.closest(".liquid-lyrics-line");if(!r)return;let n=this.recordByEl.get(r);!n||!Number.isFinite(n.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),yt(n.start),this.forceSync(),this.scrollToRecord(n))};this.container=t.container,this.scroller=t.scroller??t.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...t},this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",r=>{(r.pointerType==="mouse"||r.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasJapanese(){return this.songLang==="ja"}get hasLyrics(){return this.records.length>0}setLyrics(t){if(this.clear(),!t)return;let r=To(t);if(r.length===0)return;let n=this.options.virtualize&&r.some(i=>i.kind==="syllable");if(this.records=r.map((i,o)=>this.buildLineRecord(i,o)),this.records.forEach(i=>this.recordByEl.set(i.el,i)),this.hasTimeline=this.records.some(i=>Number.isFinite(i.start)),this.songLang=po(r.map(i=>i.kind==="interlude"?"":i.text)),n)this.initVirtualizer();else{let i=document.createDocumentFragment();this.records.forEach(o=>i.appendChild(o.el)),this.container.appendChild(i)}this.appendCredits(t),this.syncClock(),this.forceSync()}appendCredits(t){let r=Mo(t);if(!r)return;let n=document.createElement("div");if(n.className="liquid-lyrics-credits",r.writers.length>0){let i=document.createElement("div");i.className="ll-credits-writers",i.textContent=`Written by ${r.writers.join(", ")}`,n.appendChild(i)}if(r.source){let i=document.createElement("div");i.className="ll-credits-source",i.textContent=r.source,n.appendChild(i)}this.container.appendChild(n)}clear(){this.generation++,this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=R,this.lastProgress=NaN,this.lastAutoScrollTop=-1,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.songLang=null,this.container.replaceChildren()}setEnabled(t){if(this.enabled!==t&&(this.enabled=t,this.syncClock(),t)){this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),this.forceSync();let r=this.activeIndex>=0?this.records[this.activeIndex]:null;r&&this.scrollToRecord(r,"auto")}}setRomanized(t,r){this.romanMode=t;let n=[],i=!1;for(let o of this.records){let a=o.line;if(a.kind==="interlude"||!a.text)continue;let s=a.text,l=mt(s),d=ze(a.romanizedText);i||(i=l||!!d);let c=this.getLineLanguage(s)==="ja";if(a.kind==="line"||a.kind==="static"){if(t==="romaji"){let u=typeof o.localLineRoman=="string"?o.localLineRoman:"",f=d||u;f?this.setLineContent(o,`t:${f}`,f):(this.setLineContent(o,`t:${s}`,s),r&&l&&o.localLineRoman!==!1&&n.push(o))}else t==="furigana"&&c?typeof o.lineFurigana=="string"&&o.lineFurigana?this.setLineHtml(o,o.lineFurigana,s):(this.setLineContent(o,`t:${s}`,s),r&&o.lineFurigana!==!1&&n.push(o)):this.setLineContent(o,`t:${s}`,s);continue}if(!l){this.applyWordRomanization(o,t==="romaji");continue}t==="romaji"?Array.isArray(o.localWordRoman)?this.applyLocalWordRomanization(o):(this.restoreOriginalWords(o),r&&o.localWordRoman!==!1&&n.push(o)):t==="furigana"&&c?Array.isArray(o.wordFurigana)?this.applyWordFurigana(o):(this.restoreOriginalWords(o),r&&o.wordFurigana!==!1&&n.push(o)):this.restoreOriginalWords(o)}this.hasRomanizationValue=i,this.options.onRomanizationAvailability?.(i),n.length>0&&this.processLocalRomanization(n,t)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(t,r){let n=t.kind!=="static",i=this.options.variant==="sidebar"&&(t.kind==="line"||t.kind==="syllable"),o=document.createElement(i?"button":"div");o instanceof HTMLButtonElement&&(o.type="button"),o.className="liquid-lyrics-line";let a={index:r,el:o,line:t,start:n?t.range.start:Number.POSITIVE_INFINITY,end:n?t.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:R,interludeVis:R,interludeY:R,interludeScale:R,displayText:t.kind==="interlude"?"":t.text,displayKey:"orig",localWordRoman:null,wordFurigana:null,localLineRoman:null,lineFurigana:null,wrapper:null,height:0,rowOffset:R};if(t.kind==="interlude"){o.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&o.setAttribute("aria-hidden","true");for(let s=0;s<3;s++){let l=document.createElement("span");l.className="ll-interlude-dot",o.appendChild(l),a.dots.push(l),a.dotLift.push(0)}}else if(t.kind==="static")o.classList.add("liquid-lyrics-static"),o.textContent=t.text;else if(t.kind==="line")o.textContent=t.text;else{o.classList.add("ll-syllable-line");let s=document.createElement("div");s.className="ll-vocal-line ll-lead-vocal",o.appendChild(s),a.leadEl=s;let l=this.buildWordSpans(s,t.lead.words,"");if(this.options.renderBackgrounds)for(let d of t.backgrounds){let c=document.createElement("div");c.className="ll-vocal-line ll-background-vocal",o.appendChild(c),a.bgWords.push(...this.buildWordSpans(c,d.words,"ll-bg-syllable"))}a.words=Do(l,a.bgWords)}return a}buildWordSpans(t,r,n){let i=[];return r.forEach((o,a)=>{let s=document.createElement("span");s.className=n?`ll-syllable ${n}`:"ll-syllable",o.animateLetters&&s.classList.add("ll-long-syllable"),mt(o.text)&&s.classList.add("ll-cjk-syllable"),a===r.length-1&&s.classList.add("LastWordInLine");let l=[];if(o.rubyHtml)s.classList.add("ll-ruby-syllable"),s.setAttribute("aria-label",o.text),s.innerHTML=o.rubyHtml;else if(o.animateLetters){s.setAttribute("aria-label",o.text);for(let d of o.text){let c=document.createElement("span");c.className="ll-letter",c.textContent=d,s.appendChild(c),l.push(c)}}else s.textContent=o.text;t.appendChild(s),i.push({el:s,start:o.start,end:o.end,animateLetters:o.animateLetters,letters:l,state:"idle",gradientUnit:R,lastLift:0,letterFill:null,letterLift:null})}),i}syncClock(){let t=this.enabled&&this.hasTimeline&&this.records.length>0;t&&!this.unsubscribeClock?this.unsubscribeClock=Vt(this.tick):t||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(gt(),performance.now()))}lastStartedIndex(t){let r=this.records,n=0,i=r.length-1,o=-1;for(;n<=i;){let a=n+i>>1;r[a].start<=t?(o=a,n=a+1):i=a-1}return o}findActiveIndex(t){let r=this.records;if(r.length===0)return-1;let n=this.lastStartedIndex(t);if(n<0)return-1;let i=Math.max(0,n-4);for(let a=n;a>=i;a--){let s=r[a];if(t>=s.start&&t<s.end)return a}if(this.activeIndex>=0&&this.activeIndex<r.length){let a=r[this.activeIndex];if(t>=a.start&&t<a.end+Bo)return this.activeIndex}let o=r[n];return o.end<=t&&t-o.end<=Bo?n:-1}applyPosition(t,r){let n=this.activeIndex,i=this.records;for(let o=0;o<i.length;o++){let a=i[o],s=a.state==="active";if(o===t){s||this.activateLine(a,r);continue}(t>=0?o<t:a.end<=r)?s&&a.line.kind!=="interlude"&&a.end>r?this.beginOutgoing(a):(a.state!=="past"||s)&&this.completeLine(a,s):(a.state!=="future"||s)&&this.resetLine(a)}if(t>=0&&!this.userScrolling){let o=n>=0?i[n]:null,a=i[t];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),o?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===t&&this.scrollToRecord(a)},Bc):this.scrollToRecord(a)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(t,r){t.state="active",t.outgoing=!1,t.progressUnit=R,t.interludeVis=R,t.interludeY=R,t.interludeScale=R;let n=t.el.classList;if(n.remove("past","future","ll-finishing","ll-outgoing"),n.add("active"),t.line.kind==="syllable"){t.dirty=!0;for(let i of t.words)this.syncWordState(i,r)}else t.line.kind==="interlude"&&(t.dirty=!0)}beginOutgoing(t){t.state="past",t.outgoing=!0;let r=t.el.classList;r.remove("active","future","ll-finishing"),r.add("past","ll-outgoing"),t.glow&&(r.remove("ll-glow"),t.glow=!1),this.outgoingLines.includes(t)||this.outgoingLines.push(t)}updateOutgoingLines(t){for(let r=this.outgoingLines.length-1;r>=0;r--){let n=this.outgoingLines[r];if(!n.outgoing||n.state!=="past"){this.outgoingLines.splice(r,1);continue}if(t>=n.end){this.finishOutgoing(n),this.outgoingLines.splice(r,1);continue}if(t<n.start){this.outgoingLines.splice(r,1),this.resetLine(n);continue}n.line.kind==="syllable"?this.updateWords(n,t):this.writeLineProgress(n,Fr(n,t)*100)}}finishOutgoing(t){t.outgoing=!1;let r=t.el.classList;if(r.remove("ll-outgoing"),r.add("ll-finishing"),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let n of t.words)n.state!=="sung"&&this.setWordState(n,"sung")}}completeLine(t,r){t.state="past",t.outgoing=!1;let n=t.el.classList;if(n.remove("active","future","ll-outgoing"),n.add("past"),n.toggle("ll-finishing",r),t.glow&&(n.remove("ll-glow"),t.glow=!1),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let i of t.words)i.state!=="sung"&&this.setWordState(i,"sung");for(let i of t.dots)i.classList.add("lit"),Uo(i);t.dotLift.fill(0)}}resetLine(t){t.state="future",t.outgoing=!1;let r=t.el.classList;if(r.remove("active","past","ll-finishing","ll-outgoing"),r.add("future"),t.glow&&(r.remove("ll-glow"),t.glow=!1),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let n of t.words)n.state!=="future"&&this.setWordState(n,"future");for(let n of t.dots)n.classList.remove("lit"),Uo(n);t.dotLift.fill(0)}}clearLineInline(t){let r=t.el.style;t.progressUnit!==R&&(r.removeProperty("--line-progress"),t.progressUnit=R),t.interludeVis!==R&&(r.removeProperty("--interlude-visibility"),r.removeProperty("--interlude-y"),r.removeProperty("--interlude-scale"),t.interludeVis=R,t.interludeY=R,t.interludeScale=R)}updateActiveLine(t,r){let n=Fr(t,r);if(t.line.kind==="interlude"){this.updateInterlude(t,n);return}let i=n>Oc;i!==t.glow&&(t.glow=i,t.el.classList.toggle("ll-glow",i)),t.line.kind==="syllable"?this.updateWords(t,r):this.writeLineProgress(t,n*100)}writeLineProgress(t,r){let n=Math.round(r*2)/2;n!==t.progressUnit&&(t.progressUnit=n,t.el.style.setProperty("--line-progress",String(n)))}updateWords(t,r){for(let n of t.words){let i=r<n.start?"future":r>=n.end?"sung":"singing";i!==n.state&&this.setWordState(n,i),i==="singing"&&this.updateSingingWord(n,r)}}syncWordState(t,r){let n=r<t.start?"future":r>=t.end?"sung":"singing";n!==t.state&&this.setWordState(t,n)}setWordState(t,r){t.state=r;let n=t.el.classList;n.toggle("singing",r==="singing"),n.toggle("sung",r==="sung"),n.toggle("future",r==="future"),r!=="singing"&&this.clearWordInline(t)}clearWordInline(t){let r=t.el.style;if(t.gradientUnit!==R&&(r.removeProperty("--syl-progress"),t.gradientUnit=R),t.lastLift!==0&&(r.transform="",t.lastLift=0),!(!t.letterFill||!t.letterLift))for(let n=0;n<t.letters.length;n++){let i=t.letters[n];t.letterFill[n]!==R&&(i.style.removeProperty("--letter-progress"),t.letterFill[n]=R),t.letterLift[n]!==0&&(i.style.transform="",t.letterLift[n]=0)}}updateSingingWord(t,r){let n=lt((r-t.start)/Math.max(1,t.end-t.start));if(t.animateLetters){this.updateLetters(t,n);return}let i=Math.round(-20+120*n);i!==t.gradientUnit&&(t.gradientUnit=i,t.el.style.setProperty("--syl-progress",String(i)));let o=Math.sin(n*Math.PI);Math.abs(o-t.lastLift)>.01&&(t.lastLift=o,t.el.style.transform=`translate3d(0, ${(-5*o).toFixed(2)}px, 0) scale(${(1+.018*o).toFixed(4)})`)}updateLetters(t,r){let n=t.letters,i=n.length;if(i===0)return;(!t.letterFill||!t.letterLift)&&(t.letterFill=new Array(i).fill(R),t.letterLift=new Array(i).fill(0));let o=Math.max(.16,1.8/i),a=r+o*Ft(.7,1,r);for(let s=0;s<i;s++){let l=n[s],d=Math.round(-20+120*lt(r*i-s)),c=t.letterFill[s];(Math.abs(d-c)>=4||d!==c&&(d===100||d===-20))&&(t.letterFill[s]=d,l.style.setProperty("--letter-progress",String(d)));let u=1-lt(Math.abs(a-(s+.5)/i)/o),f=u<=0?0:Ft(0,1,u);Math.abs(f-t.letterLift[s])>.008&&(t.letterLift[s]=f,l.style.transform=f===0?"":`translate3d(0, ${(-5.5*f).toFixed(2)}px, 0) scale(${(1+.02*f).toFixed(4)})`)}}updateInterlude(t,r){let n=Ft(0,.22,r),i=1-Ft(.99,1,r),o=Math.round(Math.min(n,i)*200)/200,a=Math.round(-24*Ft(.76,1,r)*10)/10,s=Math.round((.72+.28*n)*500)/500,l=t.el.style;o!==t.interludeVis&&(t.interludeVis=o,l.setProperty("--interlude-visibility",String(o))),a!==t.interludeY&&(t.interludeY=a,l.setProperty("--interlude-y",`${a}px`)),s!==t.interludeScale&&(t.interludeScale=s,l.setProperty("--interlude-scale",String(s)));let d=this.options.dotLiftPx;for(let c=0;c<t.dots.length;c++){let u=t.dots[c],f=c/3,p=(c+1)/3;u.classList.toggle("lit",r>=f),u.style.opacity=r>=.99?String(i):"";let w=0;r>=f&&r<p&&(w=Math.sin((r-f)/(p-f)*Math.PI)*d),(Math.abs(w-t.dotLift[c])>.1||w===0&&t.dotLift[c]!==0)&&(t.dotLift[c]=w,u.style.transform=w===0?"":`translateY(${(-w).toFixed(2)}px)`)}}scrollToRecord(t,r="smooth"){let n=this.scroller,i,o;if(this.virtual)this.mountAround(t.index),i=this.virtual.space.offsetTop+(this.virtual.offsets[t.index]??0),o=this.virtual.heights[t.index]??t.el.offsetHeight;else{if(!t.el.isConnected)return;i=Dc(t.el,n),o=t.el.offsetHeight}let a=Math.max(0,i-n.clientHeight/2+o/2);this.lastAutoScrollTop=a,n.scrollTo({top:a,behavior:r})}reanchorActiveLine(){if(!this.virtual||!this.enabled||this.userScrolling)return;let t=this.activeIndex>=0?this.records[this.activeIndex]:null;if(!t)return;let r=this.virtual.space.offsetTop+(this.virtual.offsets[t.index]??0),n=this.virtual.heights[t.index]??t.el.offsetHeight,i=Math.max(0,r-this.scroller.clientHeight/2+n/2);Math.abs(i-this.lastAutoScrollTop)<2||(this.lastAutoScrollTop=i,this.scroller.scrollTo({top:i,behavior:"smooth"}))}setLineContent(t,r,n){t.displayKey!==r&&(t.displayKey=r,t.displayText=n,t.el.textContent=n,this.refreshVirtualHeight(t))}setLineHtml(t,r,n){let i=`h:${r}`;t.displayKey!==i&&(t.displayKey=i,t.displayText=n,t.el.innerHTML=r,this.refreshVirtualHeight(t))}getLineLanguage(t){return Dr(t)?"ja":Ur(t)?"ko":qe(t)?this.songLang==="ja"?"ja":"zh":null}applyLocalWordRomanization(t){if(t.line.kind!=="syllable"||!Array.isArray(t.localWordRoman))return;let r=t.localWordRoman,n=t.line.lead.words.map((i,o)=>{let a=r[o]||i.text;return a===i.text?i:{...i,text:a,animateLetters:Oe(a,i.start,i.end)}});this.rebuildLead(t,n,"local-roman",!0)}applyWordFurigana(t){if(t.line.kind!=="syllable"||!Array.isArray(t.wordFurigana))return;let r=t.wordFurigana,n=!1,i=t.line.lead.words.map((o,a)=>{let s=r[a];return s?(n=!0,{...o,rubyHtml:s,animateLetters:!1}):o});if(!n){this.restoreOriginalWords(t);return}this.rebuildLead(t,i,"furigana",!1)}async processLocalRomanization(t,r){let n=this.generation;for(let i of t){if(n!==this.generation||this.romanMode!==r)return;let o=i.line;if(o.kind==="interlude")continue;let a=this.getLineLanguage(o.text);if(o.kind==="syllable"){let s=o.lead.words.map(l=>l.text);if(r==="romaji"){let l=a?await fo(s,a):null;if(n!==this.generation)return;i.localWordRoman=l??!1,this.romanMode==="romaji"&&l&&this.applyLocalWordRomanization(i)}else if(r==="furigana"){let l=await mo(s);if(n!==this.generation)return;i.wordFurigana=l??!1,this.romanMode==="furigana"&&l&&this.applyWordFurigana(i)}}else if(r==="romaji"){let s=a?await ho(o.text,a):null;if(n!==this.generation)return;i.localLineRoman=s||!1,this.romanMode==="romaji"&&s&&this.setLineContent(i,`t:${s}`,s)}else if(r==="furigana"){let s=await go(o.text);if(n!==this.generation)return;i.lineFurigana=s||!1,this.romanMode==="furigana"&&s&&this.setLineHtml(i,s,o.text)}if(await new Promise(s=>requestAnimationFrame(()=>s())),n!==this.generation)return}}applyWordRomanization(t,r){if(t.line.kind!=="syllable")return;let n=!1,i=t.line.lead.words.map(o=>{let a=r?ze(o.romanizedText):"";return!a||a===o.text?o:(n=!0,{...o,text:a,animateLetters:Oe(a,o.start,o.end)})});this.rebuildLead(t,i,n?"roman-words":"orig",!1)}restoreOriginalWords(t){t.line.kind==="syllable"&&this.rebuildLead(t,t.line.lead.words,"orig",!1)}rebuildLead(t,r,n,i){if(t.displayKey===n||!t.leadEl)return;t.displayKey=n,t.el.classList.toggle("ll-context-romanized",i),t.leadEl.replaceChildren();let o=this.buildWordSpans(t.leadEl,r,"");if(t.words=Do(o,t.bgWords),t.displayText=r.map(a=>a.text).join(" ").trim(),t.state==="active"){t.dirty=!0;let a=gt();for(let s of t.words)this.syncWordState(s,a)}else if(t.state==="past")for(let a of o)this.setWordState(a,"sung");this.refreshVirtualHeight(t)}initVirtualizer(){let t=document.createElement("div");t.className="ll-syllable-virtual-space",this.container.appendChild(t),this.container.classList.add("ll-syllable-virtualized");let r=new Map;this.records.forEach(i=>{let o=document.createElement("div");o.className="ll-syllable-virtual-row",o.appendChild(i.el),i.wrapper=o,i.height=Fo(i),r.set(i.el,i.index)});let n={space:t,heights:this.records.map(i=>i.height),offsets:[],mounted:new Set,lineToIndex:r,resizeObserver:new ResizeObserver(i=>{let o=!1;for(let a of i){let s=r.get(a.target);if(s===void 0)continue;let l=Math.max(1,a.borderBoxSize?.[0]?.blockSize??a.target.offsetHeight);Math.abs((n.heights[s]??0)-l)<Kr||(n.heights[s]=l,o=!0)}o&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};n.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",n.onScroll,{passive:!0}),this.virtual=n,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let t=this.virtual;t&&(t.raf!==null&&cancelAnimationFrame(t.raf),this.scroller.removeEventListener("scroll",t.onScroll),t.resizeObserver.disconnect(),t.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let t=this.virtual;!t||t.raf!==null||(t.raf=requestAnimationFrame(()=>{t.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let t=this.virtual;if(!t)return;let r=this.scroller.scrollTop-t.space.offsetTop,n=r-Ho,i=r+this.scroller.clientHeight+Ho,o=new Set;for(let s=0;s<this.records.length;s++){let l=t.offsets[s]??0;l+(t.heights[s]??0)>=n&&l<=i&&o.add(s)}let a=this.activeIndex>=0?this.activeIndex:this.lastStartedIndex(this.lastProgress);if(a>=0){let s=Math.max(0,a-3),l=Math.min(this.records.length-1,a+3);for(let d=s;d<=l;d++)o.add(d)}for(let s of t.mounted)!o.has(s)&&s!==this.activeIndex&&this.unmountVirtualLine(s);for(let s of o)this.mountVirtualLine(s);this.layoutMountedRows()}mountAround(t){if(!this.virtual)return;let r=Math.max(0,t-1),n=Math.min(this.records.length-1,t+1),i=!1;for(let o=r;o<=n;o++)i=this.mountVirtualLine(o)||i;i&&this.layoutMountedRows()}mountVirtualLine(t){let r=this.virtual,n=this.records[t];if(!r||!n?.wrapper||r.mounted.has(t))return!1;r.space.appendChild(n.wrapper),r.mounted.add(t),n.rowOffset=R,r.resizeObserver.observe(n.el);let i=n.el.offsetHeight;return i>0&&Math.abs((r.heights[t]??0)-i)>=Kr&&(r.heights[t]=i,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(t){let r=this.virtual,n=this.records[t];!r||!n?.wrapper||!r.mounted.has(t)||(r.resizeObserver.unobserve(n.el),n.wrapper.parentElement===r.space&&r.space.removeChild(n.wrapper),r.mounted.delete(t))}recomputeVirtualOffsets(){let t=this.virtual;if(!t)return;let r=0;t.offsets=t.heights.map(n=>{let i=r;return r+=Math.max(1,n)+Hc,i}),t.space.style.height=`${Math.max(1,r)}px`}layoutMountedRows(){let t=this.virtual;if(t)for(let r of t.mounted){let n=this.records[r];if(!n?.wrapper)continue;let i=Math.round(t.offsets[r]??0);i!==n.rowOffset&&(n.rowOffset=i,n.wrapper.style.transform=`translate3d(0, ${i}px, 0)`)}}refreshVirtualHeight(t){let r=this.virtual;if(!r)return;let n=t.el.isConnected?t.el.offsetHeight:0,i=n>0?n:Fo(t);Math.abs((r.heights[t.index]??0)-i)<Kr||(r.heights[t.index]=i,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}};function Do(e,t){return t.length===0?e:[...e,...t].sort((r,n)=>r.start-n.start)}function Uo(e){e.style.transform&&(e.style.transform=""),e.style.opacity&&(e.style.opacity="")}function Fo(e){if(e.line.kind==="interlude")return 54;let t=Math.max(1,e.displayText.length),r=Math.max(1,Math.ceil(t/42)),n=e.line.kind==="syllable"?e.line.backgrounds.length:0;return 18+r*45+n*24}function Dc(e,t){let r=0,n=e;for(;n&&n!==t;){r+=n.offsetTop;let i=n.offsetParent;n=i instanceof HTMLElement&&t.contains(i)?i:null}return r}var jo=/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿가-힯]/,Uc=/^#\s*interlude\b/i,Fc=/^\[(.+)\]$/;function jc(e){let t=e.trim();return t?Uc.test(t):!1}function Vc(e){let t=e.trim().match(Fc);if(!t)return null;let r=t[1].trim();return r.length?r:null}function Wc(e){let t=e.split(/\s+/).filter(n=>n.length>0),r=[];for(let n of t){if(!jo.test(n)){r.push(n);continue}let i="";for(let o of Array.from(n))jo.test(o)?(i&&(r.push(i),i=""),r.push(o)):i+=o;i&&r.push(i)}return r}function Ct(e){return Wc(e).map(t=>({text:t,start:null}))}function ae(e){let t=[];for(let r of e.split(/\r?\n/)){let n=r.trim();if(!n)continue;if(jc(n)){t.push({kind:"interlude",start:null});continue}let i=Vc(n);if(i!=null){let o=t[t.length-1];o?.kind==="lyric"&&o.backgrounds.push({text:i,tokens:Ct(i),start:null,end:null});continue}t.push({kind:"lyric",text:n,tokens:Ct(n),backgrounds:[],start:null,end:null})}return t}function Vo(e){let t=[];for(let r of e){if(r.kind==="interlude"){t.push("#interlude");continue}t.push(r.text);for(let n of r.backgrounds)t.push(`[${n.text}]`)}return t.join(`
`)}var Ko=4500,Ue=250;function ct(e,t){return{trackId:e.trackId,trackUri:e.trackUri,title:e.title,artist:e.artist,durationMs:e.durationMs,mode:t,lines:[],endMs:null,updatedAt:Date.now()}}function Kc(e){let t=e.lines.map((i,o)=>({line:i,index:o})).filter(i=>i.line.start!=null).sort((i,o)=>i.line.start-o.line.start||i.index-o.index),r=t[t.length-1]?.line.start??0,n=e.endMs!=null?Math.max(e.endMs,r+Ue):r+Ko;return t.map((i,o)=>{let a=i.line.start,s=t[o+1]?.line.start??n,l=Math.max(s,a+Ue);return{line:i.line,start:a,end:l}})}function le(e){let t=Kc(e),r=t.length===0?$c(e):e.mode==="line"?Jc(e,t):Yc(e,t),n=String(e.credit??"").trim();return n&&(r.LiquidLyricsCredit=n),r}function $c(e){return{Id:e.trackId,Type:"Static",SongWriters:[],Lines:e.lines.filter(t=>t.kind==="lyric").map(t=>({Text:t.kind==="lyric"?t.text:"",IsRTL:!1})).filter(t=>t.Text),Provider:"local"}}function Jc(e,t){let r=t.map(({line:n,start:i,end:o})=>n.kind==="interlude"?{Type:"Interlude",Text:"\u266A",StartTime:i,EndTime:o,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:n.text,StartTime:i,EndTime:o,OppositeAligned:!1,IsRTL:!1});return{Id:e.trackId,Type:"Line",SongWriters:[],Content:r,StartTime:r[0]?.StartTime??0,EndTime:r[r.length-1]?.EndTime??0,Provider:"local"}}function Yc(e,t){let r=t.filter(n=>Gc(n.line)).map(n=>Zc(n));return{Id:e.trackId,Type:"Syllable",SongWriters:[],Content:r,StartTime:r[0]?.Lead.StartTime??0,EndTime:r[r.length-1]?.Lead.EndTime??0,Provider:"local"}}function Gc(e){return e.kind!=="lyric"||e.start==null||e.end==null?!1:e.tokens.length>0&&e.tokens.every(t=>t.start!=null)}function Zc({line:e,start:t}){let r=e.kind==="lyric"?e.tokens:[],n=e.kind==="lyric"&&e.end!=null?e.end:t+Ko,i=Math.max(n,t+Ue),o={Type:"Vocal",OppositeAligned:!1,IsRTL:!1,Lead:$o(r,t,i)},a=e.kind==="lyric"?e.backgrounds.filter(Xc).map(s=>Qc(s,t,i)):[];return a.length>0&&(o.Background=a),o}function Xc(e){return e.end==null?!1:e.tokens.length>0&&e.tokens.every(t=>t.start!=null)}function Qc(e,t,r){let n=e.start??e.tokens[0]?.start??t,i=Math.max(e.end??r,n+Ue);return $o(e.tokens,n,i)}function $o(e,t,r){let n=e.length,i=e.map((o,a)=>{let s=o.start??t,l=Wo(s,t,r),d=e[a+1]?.start??r,c=Wo(Math.max(d,l+1),t,r);return{Text:o.text,IsPartOfWord:!1,StartTime:l,EndTime:a===n-1?r:c}});return{StartTime:t,EndTime:r,Syllables:i}}function Jo(e,t){return e.Type==="Static"?td(e,t):e.Type==="Line"?ed(e,t):rd(e,t)}function td(e,t){let r=ct(t,"line");return r.lines=(e.Lines??[]).map(n=>se(n.Text)).filter(Boolean).map(n=>({kind:"lyric",text:n,tokens:Ct(n),backgrounds:[],start:null,end:null})),r}function ed(e,t){let r=ct(t,"line");r.lines=(e.Content??[]).map(i=>{if(i.Type==="Interlude")return{kind:"interlude",start:rt(i.StartTime)};let o=se(i.Text);return{kind:"lyric",text:o,tokens:Ct(o),backgrounds:[],start:rt(i.StartTime),end:null}});let n=e.Content??[];return r.endMs=rt(n[n.length-1]?.EndTime),r}function rd(e,t){let r=ct(t,"word");r.lines=(e.Content??[]).map(i=>{let o=i.Lead?.Syllables??[],a=se(i.LiquidLyricsOriginalText||i.Lead?.LiquidLyricsOriginalText),s=o.map(c=>({text:se(c.Text),start:rt(c.StartTime)})).filter(c=>c.text.length>0),l=a||s.map(c=>c.text).join(" "),d=(i.Background??[]).map(c=>{let u=(c.Syllables??[]).map(f=>({text:se(f.Text),start:rt(f.StartTime)})).filter(f=>f.text.length>0);return{text:u.map(f=>f.text).join(" "),tokens:u,start:rt(c.StartTime),end:rt(c.EndTime)}});return{kind:"lyric",text:l,tokens:s,backgrounds:d,start:rt(i.Lead?.StartTime),end:rt(i.Lead?.EndTime)}});let n=e.Content??[];return r.endMs=rt(n[n.length-1]?.Lead?.EndTime),r}function Fe(e){for(let t of e.lines){if(t.start==null)return!1;if(e.mode==="word"&&t.kind==="lyric"){if(t.tokens.some(r=>r.start==null)||t.end==null)return!1;for(let r of t.backgrounds)if(r.end==null||r.tokens.some(n=>n.start==null))return!1}}return e.lines.length>0}function se(e){return String(e??"").replace(/\s+/g," ").trim()}function rt(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,t):null}function Wo(e,t,r){return Math.min(Math.max(e,t),Math.max(t,r))}function Yo(e,t,r){let n=ct(t,r);return n.lines=ae(e),n}var $r=/\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function Go(e,t){let r=[];for(let i of e.split(/\r?\n/)){$r.lastIndex=0;let o=[],a;for(;(a=$r.exec(i))!==null;)o.push(nd(a[1],a[2],a[3]));if(o.length===0)continue;let s=i.replace($r,"").trim();for(let l of o)r.push({time:l,text:s})}if(r.length===0)return null;r.sort((i,o)=>i.time-o.time);let n=ct(t,"line");return n.lines=r.map(i=>i.text?{kind:"lyric",text:i.text,tokens:Ct(i.text),backgrounds:[],start:i.time,end:null}:{kind:"interlude",start:i.time}),n}function nd(e,t,r){let n=Number(e)||0,i=Number(t)||0,o=r?Number(r.padEnd(3,"0").slice(0,3)):0;return n*6e4+i*1e3+o}var je=!1,Jr=null;function Xo(){return je}function Wt(){let e=Jr;je=!1,Jr=null,e&&(e.classList.remove("visible"),setTimeout(()=>e.remove(),280))}function ce(e){if(je)return;je=!0;let t=P("div","ll-editor-auth"),r=P("div","ll-editor-auth-dialog");t.appendChild(r),document.body.appendChild(t),Jr=t,t.addEventListener("click",o=>{o.target===t&&Wt()}),t.addEventListener("keydown",o=>{o.key==="Escape"&&(o.stopPropagation(),Wt())});let n=()=>{let o=pt();if(!o)return i("login");r.replaceChildren();let a=P("h3","ll-editor-auth-title");a.textContent="Community account";let s=P("p","ll-editor-auth-subtitle");s.textContent=`Signed in as ${o.username}${o.role!=="user"?` \xB7 ${o.role}`:""}`;let l=P("div","ll-editor-auth-actions"),d=P("button","ll-editor-auth-btn ll-editor-auth-secondary");d.type="button",d.textContent="Log out",d.addEventListener("click",async()=>{await Hn(),i("login")});let c=P("button","ll-editor-auth-btn ll-editor-auth-primary");c.type="button",c.textContent="Done",c.addEventListener("click",()=>Wt()),l.append(d,c),r.append(a,s,l)},i=o=>{r.replaceChildren();let a=P("h3","ll-editor-auth-title");a.textContent=o==="login"?"Sign in":"Create an account";let s=P("p","ll-editor-auth-subtitle");s.textContent="Community account - needed to upload or report syncs. Free, no email.";let l=P("form","ll-editor-auth-form"),d=Zo("Username","text","username"),c=Zo("Password","password",o==="login"?"current-password":"new-password"),u=P("div","ll-editor-auth-error"),f=P("button","ll-editor-auth-btn ll-editor-auth-primary");f.type="submit",f.textContent=o==="login"?"Sign in":"Create account";let p=P("button","ll-editor-auth-toggle");p.type="button",p.textContent=o==="login"?"No account? Register":"Have an account? Sign in",p.addEventListener("click",()=>i(o==="login"?"register":"login")),l.append(d.row,c.row,u,f,p),l.addEventListener("submit",async w=>{w.preventDefault(),u.textContent="";let E=d.input.value.trim(),M=c.input.value;if(!E||!M){u.textContent="Enter a username and password.";return}f.disabled=!0;try{o==="login"?await Bn(E,M):await zn(E,M),Wt(),e?.()}catch(h){u.textContent=it(h),f.disabled=!1}}),r.append(a,s,l),d.input.focus()};qt()?n():i("login"),requestAnimationFrame(()=>t.classList.add("visible"))}function P(e,t){let r=document.createElement(e);return r.className=t,r}function Zo(e,t,r){let n=P("label","ll-editor-auth-field"),i=P("span","ll-editor-auth-label");i.textContent=e;let o=P("input","ll-editor-auth-input");return o.type=t,o.setAttribute("autocomplete",r),o.spellcheck=!1,n.append(i,o),{row:n,input:o}}var Xr="liquid-lyrics-editor",Jt="liquid-lyrics:editor-visibility",Kt=100,$t=300,id=3e3,od=3e3,ad=900,sd=250,Qo=500,de=180,_={close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M8 5.6v12.8L18.6 12 8 5.6Z" fill="currentColor" stroke="none"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7.5 5h3v14h-3z" fill="currentColor" stroke="none"/><path d="M13.5 5h3v14h-3z" fill="currentColor" stroke="none"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',chevronRight:'<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',chevronsLeft:'<svg viewBox="0 0 24 24"><path d="m17 6-6 6 6 6"/><path d="m11 6-6 6 6 6"/></svg>',chevronsRight:'<svg viewBox="0 0 24 24"><path d="m7 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/></svg>',jump:'<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/></svg>',finish:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4.5h11l-2 3 2 3H5"/></svg>',clear:'<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 12h10l1-12"/></svg>',menu:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>',save:'<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7"/><path d="M8 20v-6h8v6"/></svg>',note:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor" stroke="none"/></svg>',account:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>',upload:'<svg viewBox="0 0 24 24"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 20h14"/></svg>'},Qr=null;function Yt(){Qr??(Qr=new tn),Qr.open()}function At(){return!!Qr?.isOpen()}var Je=class Je{constructor(){this.overlay=null;this.draft=ct(ud(),"line");this.stage="text";this.targets=[];this.cursor=0;this.previewView=null;this.unsubscribeClock=null;this.currentRowEl=null;this.fileInput=null;this.savedSignature="";this.dragging=!1;this.prevRepeat=null;this.prevProgress=0;this.suppressLoopUntil=0;this.suppressFillUntil=0;this.confirmResolve=null;this.confirmOverlay=null;this.accountChip=null;this.onAuthChange=null;this.refs=null;this.onSongChangeGuard=()=>{let t=String(Spicetify.Player?.data?.item?.uri??"");t&&t!==this.draft.trackUri&&Gr()};this.onTick=t=>{if(!this.refs)return;let r=V();if(r>0&&!this.dragging&&G()&&t>=r-sd&&Gr(),!this.dragging&&performance.now()>this.suppressLoopUntil&&r>0&&G()&&t<this.prevProgress&&this.prevProgress>r-id&&t<od&&(this.seek(0),Gr()),this.prevProgress=t,ld(this.refs.playBtn,G()?_.pause:_.play),this.refs.durTime.textContent=Ke(r),this.dragging||performance.now()<this.suppressFillUntil)return;let o=r>0?Math.min(1,t/r):0;this.refs.seekFill.style.transform=`scaleX(${o.toFixed(4)})`,this.refs.curTime.textContent=Ke(t)};this.onKeyDown=t=>{if(!this.isOpen()||Xo())return;if(this.confirmResolve){t.key==="Escape"?(t.preventDefault(),t.stopImmediatePropagation(),this.resolveConfirm(!1)):t.key==="Enter"&&(t.preventDefault(),t.stopImmediatePropagation(),this.resolveConfirm(!0));return}let r=t.target,n=r instanceof HTMLTextAreaElement||r instanceof HTMLInputElement;if(t.key==="Escape"){if(n)return;t.preventDefault(),this.requestClose();return}if(!(this.stage!=="sync"||n)){if(t.code==="AltRight"){t.preventDefault(),t.stopImmediatePropagation(),t.repeat||this.tap();return}if(Je.SYNC_KEYS.has(t.key))switch(t.preventDefault(),t.stopImmediatePropagation(),t.key){case"Backspace":this.undo();break;case"Delete":this.clearCurrent();break;case"ArrowLeft":this.nudgeCurrent(t.shiftKey?-$t:-Kt);break;case"ArrowRight":this.nudgeCurrent(t.shiftKey?$t:Kt);break;case"ArrowUp":this.cursor=Math.max(0,this.cursor-1),this.renderSyncList();break;case"ArrowDown":this.cursor=Math.min(this.targets.length-1,this.cursor+1),this.renderSyncList();break;default:break}}}}isOpen(){return this.overlay?.classList.contains("visible")??!1}async open(){let t=ra();if(!t.trackId){H("No song playing - start a song to create a sync.");return}this.draft=await this.loadDraft(t),this.savedSignature=Zr(this.draft),this.build(),this.rebuildTargets();let r=this.draft.lines.length===0?"text":Fe(this.draft)?"preview":"sync";this.setStage(r),this.show()}async loadDraft(t){let r=te(t.trackUri);if(r)return{...r.draft,durationMs:t.durationMs||r.draft.durationMs};try{let n=await Se({id:t.trackId,uri:t.trackUri,data:{name:t.title}});if(n.status==="success"&&n.data)return Jo(n.data,t)}catch{}return ct(t,"line")}build(){document.getElementById(Xr)?.remove();let t=document.createElement("div");t.id=Xr,t.className="liquid-lyrics-editor";let r=k("div","ll-editor-glass-bg"),n=k("div","ll-editor-shell"),i=k("header","ll-editor-header"),o=k("div","ll-editor-title-group"),a=k("h2","ll-editor-title");a.textContent="Sync Editor";let s=k("div","ll-editor-song");s.textContent=`${this.draft.title} - ${this.draft.artist}`,o.append(a,s);let l=k("div","ll-editor-mode-switch"),d=["line","word"].map(S=>{let A=k("button","ll-editor-mode-btn");return A.type="button",A.dataset.mode=S,A.textContent=S==="line"?"Block":"Karaoke",A.addEventListener("click",()=>this.setMode(S)),l.appendChild(A),A}),c=k("div","ll-editor-header-actions"),u=k("div","ll-editor-menu-wrap"),f=Yr("ll-editor-icon-btn",_.menu,"More"),p=k("div","ll-editor-menu"),w=this.buildMenu(p);f.addEventListener("click",S=>{S.stopPropagation(),p.classList.toggle("open")}),u.append(f,p);let E=k("button","ll-editor-save-btn");E.type="button",E.innerHTML=`${_.upload}<span>Publish</span>`,E.addEventListener("click",()=>void this.publishToCommunity());let M=this.buildAccountChip(),h=Yr("ll-editor-icon-btn",_.close,"Close");h.addEventListener("click",()=>this.requestClose()),c.append(M,u,E,h),i.append(o,l,c);let m=k("nav","ll-editor-steps"),x=[{stage:"text",label:"1 \xB7 Text"},{stage:"sync",label:"2 \xB7 Sync"},{stage:"preview",label:"3 \xB7 Preview"}].map(({stage:S,label:A})=>{let D=k("button","ll-editor-step-btn");return D.type="button",D.dataset.stage=S,D.textContent=A,D.addEventListener("click",()=>this.setStage(S)),m.appendChild(D),D}),y=k("div","ll-editor-body"),g=this.buildTransport();n.append(i,m,y,g.el);let v=k("div","liquid-lyrics-transparent-controls");v.setAttribute("aria-hidden","true");let L=ta(parseInt(localStorage.getItem("liquify-tc-width")||"135",10),50,400),T=ta(parseInt(localStorage.getItem("liquify-tc-height")||"64",10),20,300);t.style.setProperty("--ll-transparent-controls-width",`${L}px`),t.style.setProperty("--ll-transparent-controls-height",`${T}px`),t.append(r,v,n),document.body.appendChild(t),t.addEventListener("click",()=>p.classList.remove("open")),this.overlay=t,this.refs={songLabel:s,modeButtons:d,stepButtons:x,body:y,transport:g.el,playBtn:g.playBtn,seekFill:g.fill,seekTrack:g.track,curTime:g.cur,durTime:g.dur,publishBtn:E,menu:p,deleteItem:w},this.updateModeButtons(),this.bindSeek()}bindSeek(){let t=this.refs;if(!t)return;let r=t.seekTrack,n=o=>{let a=r.getBoundingClientRect();return Math.min(1,Math.max(0,(o.clientX-a.left)/Math.max(1,a.width)))},i=o=>{t.seekFill.style.transform=`scaleX(${o.toFixed(4)})`;let a=V();a>0&&(t.curTime.textContent=Ke(a*o))};r.addEventListener("pointerdown",o=>{o.preventDefault(),this.dragging=!0,r.setPointerCapture?.(o.pointerId),i(n(o));let a=l=>i(n(l)),s=l=>{this.dragging=!1,r.releasePointerCapture?.(l.pointerId),window.removeEventListener("pointermove",a),window.removeEventListener("pointerup",s);let d=V();if(d>0){let c=d*n(l);this.seek(c),this.stage==="sync"&&this.moveCursorToTime(c)}};window.addEventListener("pointermove",a),window.addEventListener("pointerup",s,{once:!0})})}buildMenu(t){let r=Ve("Save on this device");r.addEventListener("click",()=>this.save());let n=Ve("Import file (.lrc / .txt / .json)");n.addEventListener("click",()=>this.pickFile());let i=Ve("Export as file (.json)");i.addEventListener("click",()=>this.exportFile());let o=Ve("Delete saved sync");return o.classList.add("ll-editor-menu-danger"),o.addEventListener("click",()=>void this.deleteSaved()),t.append(r,n,i,o),o}buildAccountChip(){let t=k("button","ll-editor-account-chip");return t.type="button",t.addEventListener("click",()=>ce()),this.accountChip=t,this.updateAccountChip(),t}updateAccountChip(){let t=this.accountChip;if(!t)return;let r=pt();t.classList.toggle("is-authed",!!r);let n=k("span","ll-editor-account-icon");n.innerHTML=_.account;let i=k("span","ll-editor-account-name");i.textContent=r?r.username:"Sign in",t.replaceChildren(n,i),t.setAttribute("aria-label",r?`Signed in as ${r.username}`:"Sign in to upload")}async publishToCommunity(){if(this.refs?.menu.classList.remove("open"),this.stage==="text"&&this.commitText(),this.draft.lines.length===0){H("Add some lyrics first (Text step).");return}let t=this.targets.map(n=>this.targetTime(n)),r=t.filter(n=>n!=null).length;if(r>0&&r<t.length){H(`Sync incomplete (${r}/${t.length}) - finish syncing before publishing.`);return}if(!String(this.draft.credit??"").trim()){H("Add a credit (your name) in the Text step before publishing."),this.setStage("text"),this.overlay?.querySelector(".ll-editor-credit-input")?.focus();return}if(!qt()){H("Sign in to publish your sync."),ce(()=>void this.publishToCommunity());return}oa(this.draft);try{let i=(await Un({trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,lyrics:le(this.draft),draft:this.draft})).status==="pending"?"Uploaded - waiting for a moderator to approve it. Thanks!":"Uploaded to the community.";this.close(),H(i)}catch(n){H(it(n))}}buildTransport(){let t=k("footer","ll-editor-transport"),r=Yr("ll-editor-play-btn",_.play,"Play/Pause");r.addEventListener("click",()=>this.togglePlayback());let n=k("span","ll-editor-time ll-editor-time-cur");n.textContent="0:00";let i=k("span","ll-editor-time ll-editor-time-dur");i.textContent="0:00";let o=k("div","ll-editor-seek-track"),a=k("div","ll-editor-seek-bar"),s=k("div","ll-editor-seek-fill");return a.appendChild(s),o.appendChild(a),t.append(r,n,o,i),{el:t,playBtn:r,track:o,fill:s,cur:n,dur:i}}show(){if(this.overlay){this.overlay.classList.add("visible"),window.addEventListener("keydown",this.onKeyDown,!0);try{Spicetify.Player?.addEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat=dd(),ea(2),this.prevProgress=0,this.unsubscribeClock??(this.unsubscribeClock=Vt(this.onTick)),this.onAuthChange=()=>this.updateAccountChip(),window.addEventListener(Lt,this.onAuthChange),Dn().then(()=>this.updateAccountChip()),window.dispatchEvent(new Event(Jt))}}close(){window.removeEventListener("keydown",this.onKeyDown,!0),this.onAuthChange&&(window.removeEventListener(Lt,this.onAuthChange),this.onAuthChange=null),Wt();try{Spicetify.Player?.removeEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat!=null&&ea(this.prevRepeat),this.prevRepeat=null,this.unsubscribeClock?.(),this.unsubscribeClock=null,this.previewView?.destroy(),this.previewView=null,this.overlay?.classList.remove("visible"),this.overlay?.remove(),this.overlay=null,this.refs=null,window.dispatchEvent(new Event(Jt))}async requestClose(){this.confirmResolve||this.isDirty()&&!await this.showConfirm({title:"Discard changes?",message:"You have unsaved changes. Closing the editor will lose them.",confirm:"Discard",cancel:"Keep editing",danger:!0})||this.close()}togglePlayback(){if(!G()){let t=V();t>0&&gt()>=t-500&&this.seek(0)}sa()}seek(t){let r=performance.now();if(this.suppressLoopUntil=r+ad,this.suppressFillUntil=r+320,this.refs){let n=V(),i=n>0?Math.min(1,Math.max(0,t/n)):0;this.refs.seekFill.style.transform=`scaleX(${i.toFixed(4)})`,this.refs.curTime.textContent=Ke(t)}yt(t)}isDirty(){return Zr(this.draft)!==this.savedSignature}showConfirm(t){return new Promise(r=>{let n=k("div","ll-editor-confirm"),i=k("div","ll-editor-confirm-dialog"),o=k("h3","ll-editor-confirm-title");o.textContent=t.title;let a=k("p","ll-editor-confirm-message");a.textContent=t.message;let s=k("div","ll-editor-confirm-actions"),l=k("button","ll-editor-confirm-btn ll-editor-confirm-cancel");l.type="button",l.textContent=t.cancel;let d=k("button","ll-editor-confirm-btn ll-editor-confirm-accept");d.type="button",d.textContent=t.confirm,d.classList.toggle("ll-editor-confirm-danger",!!t.danger),s.append(l,d),i.append(o,a,s),n.appendChild(i),document.body.appendChild(n),requestAnimationFrame(()=>n.classList.add("visible")),l.addEventListener("click",()=>this.resolveConfirm(!1)),d.addEventListener("click",()=>this.resolveConfirm(!0)),n.addEventListener("click",c=>{c.target===n&&this.resolveConfirm(!1)}),this.confirmOverlay=n,this.confirmResolve=r,d.focus()})}resolveConfirm(t){let r=this.confirmResolve,n=this.confirmOverlay;this.confirmResolve=null,this.confirmOverlay=null,n&&(n.classList.remove("visible"),setTimeout(()=>n.remove(),200)),r?.(t)}setStage(t){this.stage==="text"&&t!=="text"&&this.commitText(),this.stage=t,this.refs?.stepButtons.forEach(r=>r.classList.toggle("active",r.dataset.stage===t)),this.previewView&&this.previewView.setEnabled(t==="preview"),this.refs&&(this.refs.body.replaceChildren(),t==="text"?this.renderTextStage():t==="sync"?this.renderSyncStage():this.renderPreviewStage())}setMode(t){this.draft.mode!==t&&(this.draft.mode=t,this.updateModeButtons(),this.rebuildTargets(),this.stage==="sync"?(this.refs?.body.replaceChildren(),this.renderSyncStage()):this.stage==="preview"&&this.refreshPreview())}updateModeButtons(){this.refs?.modeButtons.forEach(t=>t.classList.toggle("active",t.dataset.mode===this.draft.mode))}renderTextStage(){if(!this.refs)return;let t=k("div","ll-editor-text-stage"),r=k("div","ll-editor-hint");r.innerHTML="One line per lyric line. Blank line = separator. Put <b>#interlude</b> on its own line to add an instrumental interlude. Wrap a line in <b>[ ]</b> to make it a background sub-lyric of the line above (karaoke). Long pauses are detected as interludes automatically.";let n=k("textarea","ll-editor-textarea");n.spellcheck=!1,n.placeholder="Paste or type the song's lyrics here - one line per lyric line.",n.value=Vo(this.draft.lines),n.addEventListener("input",()=>this.updateTextStats(n.value,l));let i=k("label","ll-editor-credit-row"),o=k("span","ll-editor-credit-label");o.textContent="Credit";let a=k("input","ll-editor-credit-input");a.type="text",a.maxLength=60,a.placeholder="Your name/handle - required to publish, shown as \u201CMade by @\u2026\u201D",a.value=this.draft.credit??"",a.addEventListener("input",()=>{this.draft.credit=a.value,this.draft.updatedAt=Date.now()}),i.append(o,a);let s=k("div","ll-editor-text-footer"),l=k("div","ll-editor-text-stats"),d=k("button","ll-editor-primary-btn");d.type="button",d.textContent="Continue to sync \u2192",d.addEventListener("click",()=>this.setStage("sync")),s.append(l,d),t.append(r,n,i,s),this.refs.body.appendChild(t),this.updateTextStats(n.value,l),n.focus()}updateTextStats(t,r){let n=ae(t),i=n.filter(a=>a.kind==="lyric").length,o=n.filter(a=>a.kind==="interlude").length;r.textContent=`${i} lines \xB7 ${o} interludes`}commitText(){let t=this.overlay?.querySelector(".ll-editor-textarea");if(!t)return;let r=ae(t.value);this.draft.lines=fd(this.draft.lines,r),this.draft.updatedAt=Date.now(),this.rebuildTargets()}renderSyncStage(){if(!this.refs)return;let t=k("div","ll-editor-sync-stage"),r=k("div","ll-editor-sync-bar"),n=k("button","ll-editor-tap-btn");n.type="button",n.innerHTML="<b>Set cue</b><span>Right Alt</span>",n.addEventListener("click",()=>this.tap());let i=k("div","ll-editor-sync-hint");i.innerHTML="Play and tap to the beat. <b>Right Alt</b> sets the next cue \xB7 <b>\u232B</b> back \xB7 <b>\u2190/\u2192</b> \xB1100 ms (Shift \xB1300) \xB7 <b>Del</b> clear.";let o=k("div","ll-editor-sync-status");r.append(n,i,o);let a=k("div","ll-editor-lines");t.append(r,a),this.refs.body.appendChild(t),this.renderSyncList()}renderSyncList(t=!0){let r=this.overlay?.querySelector(".ll-editor-lines");if(!r)return;let n=t?null:r.scrollTop;r.replaceChildren(),this.currentRowEl=null;let i=this.targets[this.cursor],o=i&&i.kind!=="end"?i.lineIndex:-1;this.draft.lines.forEach((a,s)=>{let l=k("div","ll-editor-line");l.dataset.lineIndex=String(s);let d=a.kind==="interlude";l.classList.toggle("is-interlude",d),l.classList.toggle("is-synced",a.start!=null);let c=o===s&&(i?.kind==="line"||this.draft.mode==="word");i?.kind==="line"&&o===s&&(l.classList.add("is-current"),this.currentRowEl=l);let u=k("div","ll-editor-line-index");u.innerHTML=d?_.note:String(pd(this.draft.lines,s));let f=k("div","ll-editor-line-main");d?(f.textContent="Interlude",f.classList.add("ll-editor-line-interlude-text")):this.draft.mode==="word"?f.appendChild(this.buildTokenRow(a,s,i)):f.textContent=a.text;let p=k("div","ll-editor-line-time");p.textContent=We(a.start);let w=k("div","ll-editor-line-controls");w.append(Z(_.chevronsLeft,"\u2212300 ms",()=>this.nudgeLine(s,-$t)),Z(_.chevronLeft,"\u2212100 ms",()=>this.nudgeLine(s,-Kt)),Z(_.chevronRight,"+100 ms",()=>this.nudgeLine(s,Kt)),Z(_.chevronsRight,"+300 ms",()=>this.nudgeLine(s,$t)),Z(_.jump,"Play from here",()=>this.jumpToLine(s)),Z(_.clear,"Clear timing",()=>this.clearLine(s))),l.append(u,f,p,w),l.addEventListener("click",E=>{E.target.closest(".ll-editor-line-controls, .ll-editor-token")||this.selectLine(s)}),c&&this.draft.mode==="word"&&!this.currentRowEl&&(this.currentRowEl=l),r.appendChild(l)}),this.renderEndRow(r,i),this.updateSyncStatus(),t?this.scrollCurrentIntoView():n!=null&&(r.scrollTop=n)}renderEndRow(t,r){let n=this.targets.findIndex(d=>d.kind==="end");if(n<0)return;let i=k("div","ll-editor-line ll-editor-end-row");i.classList.toggle("is-synced",this.draft.endMs!=null),r?.kind==="end"&&(i.classList.add("is-current"),this.currentRowEl=i);let o=k("div","ll-editor-line-index");o.innerHTML=_.finish;let a=k("div","ll-editor-line-main ll-editor-line-interlude-text");a.textContent="End of lyrics";let s=k("div","ll-editor-line-time");s.textContent=We(this.draft.endMs);let l=k("div","ll-editor-line-controls");l.append(Z(_.chevronsLeft,"\u2212300 ms",()=>this.nudgeEnd(-$t)),Z(_.chevronLeft,"\u2212100 ms",()=>this.nudgeEnd(-Kt)),Z(_.chevronRight,"+100 ms",()=>this.nudgeEnd(Kt)),Z(_.chevronsRight,"+300 ms",()=>this.nudgeEnd($t)),Z(_.jump,"Play from here",()=>this.jumpEnd()),Z(_.clear,"Clear end",()=>this.clearEnd())),i.append(o,a,s,l),i.addEventListener("click",d=>{d.target.closest(".ll-editor-line-controls")||(this.cursor=n,this.draft.endMs!=null&&this.seek(this.draft.endMs),this.renderSyncList(!1))}),t.appendChild(i)}buildTokenRow(t,r,n){let i=k("div","ll-editor-token-block");if(t.kind!=="lyric")return i;let o=k("div","ll-editor-tokens");return t.tokens.forEach((a,s)=>{let l=n?.kind==="token"&&n.lineIndex===r&&n.tokenIndex===s;o.appendChild(this.tokenChip(a.text,a.start!=null,l,()=>this.selectToken(r,s)))}),o.appendChild(this.endChip(t.end!=null,n?.kind==="lineEnd"&&n.lineIndex===r,"Line end",()=>this.selectLineEnd(r))),i.appendChild(o),t.backgrounds.forEach((a,s)=>{let l=k("div","ll-editor-tokens ll-editor-bg-tokens");a.tokens.forEach((d,c)=>{let u=n?.kind==="bgToken"&&n.lineIndex===r&&n.bgIndex===s&&n.tokenIndex===c;l.appendChild(this.tokenChip(d.text,d.start!=null,u,()=>this.selectBgToken(r,s,c)))}),l.appendChild(this.endChip(a.end!=null,n?.kind==="bgEnd"&&n.lineIndex===r&&n.bgIndex===s,"Sub-lyric end",()=>this.selectBgEnd(r,s))),i.appendChild(l)}),i}tokenChip(t,r,n,i){let o=k("span","ll-editor-token");return o.textContent=t,o.classList.toggle("is-synced",r),n&&o.classList.add("is-current"),o.addEventListener("click",a=>{a.stopPropagation(),i()}),o}endChip(t,r,n,i){let o=k("span","ll-editor-token ll-editor-lineend-chip");return o.innerHTML=_.finish,o.setAttribute("aria-label",n),q(o,n),o.classList.toggle("is-synced",t),r&&o.classList.add("is-current"),o.addEventListener("click",a=>{a.stopPropagation(),i()}),o}selectLineEnd(t){let r=this.targets.findIndex(i=>i.kind==="lineEnd"&&i.lineIndex===t);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.draft.lines[t];n?.kind==="lyric"&&n.end!=null&&this.previewTime(n.end,de)}selectBgToken(t,r,n){let i=this.targets.findIndex(a=>a.kind==="bgToken"&&a.lineIndex===t&&a.bgIndex===r&&a.tokenIndex===n);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let o=this.backgroundAt(t,r)?.tokens[n];o?.start!=null&&this.previewTime(o.start,de)}selectBgEnd(t,r){let n=this.targets.findIndex(o=>o.kind==="bgEnd"&&o.lineIndex===t&&o.bgIndex===r);if(n<0)return;this.cursor=n,this.renderSyncList(!1);let i=this.backgroundAt(t,r);i?.end!=null&&this.previewTime(i.end,de)}backgroundAt(t,r){let n=this.draft.lines[t];return n?.kind==="lyric"?n.backgrounds[r]:void 0}updateSyncStatus(){let t=this.overlay?.querySelector(".ll-editor-sync-status");if(!t)return;let r=this.targets.length,n=this.targets.filter(i=>this.targetTime(i)!=null).length;t.textContent=`${n}/${r} synced`}scrollCurrentIntoView(){this.currentRowEl?.scrollIntoView({block:"center",behavior:"smooth"})}tap(){let t=this.targets[this.cursor];t&&(this.setTargetTime(t,Math.round(gt())),this.cursor+=1,this.afterSyncChange())}undo(){this.cursor>0&&(this.cursor-=1);let t=this.targets[this.cursor];t&&this.clearTargetTime(t),this.afterSyncChange()}nudgeCurrent(t){let r=this.targets[this.cursor];if(!r)return;let n=this.targetTime(r);if(n==null)return;let i=Math.max(0,n+t);this.setTargetTime(r,i),this.draft.updatedAt=Date.now(),this.refreshTimes();let o=r.kind!=="line"&&r.kind!=="end";this.previewTime(i,o?de:Qo)}clearCurrent(){let t=this.targets[this.cursor];t&&this.clearTargetTime(t),this.afterSyncChange()}nudgeLine(t,r){let n=this.targets[this.cursor];if(this.draft.mode==="word"&&n&&n.kind!=="end"&&n.kind!=="line"&&n.lineIndex===t&&this.targetTime(n)!=null){this.nudgeCurrent(r);return}let i=this.draft.lines[t];if(!i||i.start==null)return;let o=Math.max(0,i.start+r);this.shiftLine(i,o-i.start),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(o)}jumpToLine(t){let r=this.draft.lines[t];r?.start!=null&&this.seek(r.start)}nudgeEnd(t){this.draft.endMs!=null&&(this.draft.endMs=Math.max(0,this.draft.endMs+t),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(this.draft.endMs))}jumpEnd(){this.draft.endMs!=null&&this.seek(this.draft.endMs)}refreshTimes(){let t=this.overlay?.querySelector(".ll-editor-lines");if(!t)return;this.draft.lines.forEach((n,i)=>{let o=t.querySelector(`.ll-editor-line[data-line-index="${i}"]`);if(!o)return;o.classList.toggle("is-synced",n.start!=null);let a=o.querySelector(".ll-editor-line-time");a&&(a.textContent=We(n.start))});let r=t.querySelector(".ll-editor-end-row");if(r){r.classList.toggle("is-synced",this.draft.endMs!=null);let n=r.querySelector(".ll-editor-line-time");n&&(n.textContent=We(this.draft.endMs))}this.updateSyncStatus()}previewTime(t,r=Qo){this.seek(Math.max(0,t-r)),cd()}moveCursorToTime(t){let r=-1;this.targets.forEach((n,i)=>{let o=this.targetTime(n);o!=null&&o<=t+60&&(r=i)}),this.cursor=r>=0?r:0,this.renderSyncList()}clearEnd(){this.draft.endMs=null,this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1)}clearLine(t){let r=this.draft.lines[t];r&&(r.start=null,r.kind==="lyric"&&(r.tokens.forEach(n=>n.start=null),r.end=null,r.backgrounds.forEach(n=>{n.start=null,n.end=null,n.tokens.forEach(i=>i.start=null)})),this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1))}selectLine(t){let r=this.targets.findIndex(i=>i.kind!=="end"&&i.lineIndex===t);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.draft.lines[t];n?.start!=null&&this.previewTime(n.start)}selectToken(t,r){let n=this.targets.findIndex(a=>a.kind==="token"&&a.lineIndex===t&&a.tokenIndex===r);if(n<0)return;this.cursor=n,this.renderSyncList(!1);let i=this.draft.lines[t],o=i?.kind==="lyric"?i.tokens[r]:void 0;o?.start!=null&&this.previewTime(o.start,de)}afterSyncChange(t=!0){this.draft.updatedAt=Date.now(),this.renderSyncList(t)}rebuildTargets(){let t=[];this.draft.lines.forEach((r,n)=>{this.draft.mode==="line"||r.kind==="interlude"?t.push({kind:"line",lineIndex:n}):(r.tokens.forEach((i,o)=>t.push({kind:"token",lineIndex:n,tokenIndex:o})),t.push({kind:"lineEnd",lineIndex:n}),r.backgrounds.forEach((i,o)=>{i.tokens.forEach((a,s)=>t.push({kind:"bgToken",lineIndex:n,bgIndex:o,tokenIndex:s})),t.push({kind:"bgEnd",lineIndex:n,bgIndex:o})}))}),this.draft.mode==="line"&&this.draft.lines.some(r=>r.kind==="lyric")&&t.push({kind:"end"}),this.targets=t,this.cursor=this.firstUnsetTarget()}firstUnsetTarget(){let t=this.targets.findIndex(r=>this.targetTime(r)==null);return t<0?Math.max(0,this.targets.length-1):t}targetTime(t){if(t.kind==="end")return this.draft.endMs;let r=this.draft.lines[t.lineIndex];if(!r)return null;if(t.kind==="line")return r.start;if(r.kind!=="lyric")return null;if(t.kind==="lineEnd")return r.end;if(t.kind==="token")return r.tokens[t.tokenIndex]?.start??null;let n=r.backgrounds[t.bgIndex];return n?t.kind==="bgEnd"?n.end:n.tokens[t.tokenIndex]?.start??null:null}setTargetTime(t,r){if(t.kind==="end"){this.draft.endMs=r;return}let n=this.draft.lines[t.lineIndex];if(!n)return;if(t.kind==="line"){n.start=r;return}if(n.kind!=="lyric")return;if(t.kind==="lineEnd"){n.end=r;return}if(t.kind==="token"){let a=n.tokens[t.tokenIndex];if(!a)return;a.start=r,n.start=na(n);return}let i=n.backgrounds[t.bgIndex];if(!i)return;if(t.kind==="bgEnd"){i.end=r;return}let o=i.tokens[t.tokenIndex];o&&(o.start=r,i.start=ia(i))}clearTargetTime(t){if(t.kind==="end"){this.draft.endMs=null;return}let r=this.draft.lines[t.lineIndex];if(!r)return;if(t.kind==="line"){r.start=null;return}if(r.kind!=="lyric")return;if(t.kind==="lineEnd"){r.end=null;return}if(t.kind==="token"){let o=r.tokens[t.tokenIndex];o&&(o.start=null),r.start=na(r);return}let n=r.backgrounds[t.bgIndex];if(!n)return;if(t.kind==="bgEnd"){n.end=null;return}let i=n.tokens[t.tokenIndex];i&&(i.start=null),n.start=ia(n)}shiftLine(t,r){t.start!=null&&(t.start+=r),t.kind==="lyric"&&(t.tokens.forEach(n=>{n.start!=null&&(n.start+=r)}),t.end!=null&&(t.end+=r),t.backgrounds.forEach(n=>{n.start!=null&&(n.start+=r),n.tokens.forEach(i=>{i.start!=null&&(i.start+=r)}),n.end!=null&&(n.end+=r)}))}renderPreviewStage(){if(!this.refs)return;let t=k("div","ll-editor-preview-stage");if(!Fe(this.draft)){let o=k("div","ll-editor-preview-warn");o.textContent="Not everything is synced yet \u2014 the preview only shows what's already timed.",t.appendChild(o)}let r=k("div","ll-editor-preview-frame"),n=k("div","ll-editor-preview-scroll"),i=k("div","ll-editor-preview-lines");n.appendChild(i),r.appendChild(n),t.appendChild(r),this.refs.body.appendChild(t),this.previewView?.destroy(),this.previewView=new bt({container:i,scroller:n,variant:"panel",virtualize:!1,renderBackgrounds:!0,dotLiftPx:12}),this.refreshPreview(),this.previewView.setEnabled(!0)}refreshPreview(){if(this.previewView)try{this.previewView.setLyrics(le(this.draft))}catch(t){console.error("[Liquid Lyrics] Preview build failed",t)}}save(){if(this.stage==="text"&&this.commitText(),this.draft.lines.length===0){H("Add some lyrics first (Text step).");return}let t=this.targets.map(n=>this.targetTime(n)),r=t.filter(n=>n!=null).length;if(r>0&&r<t.length){H(`Sync incomplete (${r}/${t.length}) \u2014 finish syncing, or clear all timings to save static lyrics.`);return}oa(this.draft);try{let n={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:le(this.draft),draft:this.draft};Yn(n),this.savedSignature=Zr(this.draft),this.refs?.deleteItem.classList.remove("ll-hidden"),this.close(),H("Sync saved and activated.")}catch(n){console.error("[Liquid Lyrics] Save failed",n),H("Save failed (storage full?).")}}async deleteSaved(){if(this.refs?.menu.classList.remove("open"),!Jn(this.draft.trackUri)){H("No custom sync saved for this song.");return}this.confirmResolve||!await this.showConfirm({title:"Delete saved sync?",message:"This removes your custom sync for this song and restores the online lyrics.",confirm:"Delete",cancel:"Cancel",danger:!0})||(Gn(this.draft.trackUri),this.close(),H("Saved sync deleted."))}exportFile(){this.refs?.menu.classList.remove("open"),this.stage==="text"&&this.commitText();let t={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:le(this.draft),draft:this.draft},r=`${this.draft.artist} - ${this.draft.title}`.replace(/[^\w\-]+/g,"_").slice(0,80);hd(`${r||"liquid-lyrics"}.json`,JSON.stringify(t,null,2))}pickFile(){this.refs?.menu.classList.remove("open"),this.fileInput||(this.fileInput=document.createElement("input"),this.fileInput.type="file",this.fileInput.accept=".json,.lrc,.txt",this.fileInput.style.display="none",this.fileInput.addEventListener("change",()=>this.onFileChosen()),document.body.appendChild(this.fileInput)),this.fileInput.value="",this.fileInput.click()}async onFileChosen(){let t=this.fileInput?.files?.[0];if(!t)return;let r=await t.text(),n=ra(),i=t.name.toLowerCase();try{if(i.endsWith(".json")){let o=Zn(r,n.trackUri);this.draft={...o.draft,durationMs:n.durationMs||o.draft.durationMs}}else if(i.endsWith(".lrc")){let o=Go(r,n);if(!o)throw new Error("No timings found in the .lrc file");this.draft=o}else this.draft=Yo(r,n,this.draft.mode)}catch(o){H(`Import failed: ${o instanceof Error?o.message:"Invalid file"}`);return}this.updateModeButtons(),this.refs&&(this.refs.songLabel.textContent=`${this.draft.title} - ${this.draft.artist}`),this.rebuildTargets(),this.setStage(Fe(this.draft)?"preview":this.draft.lines.length?"sync":"text"),H("File imported.")}};Je.SYNC_KEYS=new Set(["Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"]);var tn=Je;function k(e,t){let r=document.createElement(e);return r.className=t,r}function Yr(e,t,r){let n=k("button",e);return n.type="button",n.innerHTML=t,n.setAttribute("aria-label",r),q(n,r),n}function Z(e,t,r){let n=k("button","ll-editor-line-btn");return n.type="button",n.innerHTML=e,n.setAttribute("aria-label",t),q(n,t),n.addEventListener("click",i=>{i.stopPropagation(),r()}),n}function Ve(e){let t=k("button","ll-editor-menu-item");return t.type="button",t.textContent=e,t}function ld(e,t){e.dataset.icon!==t&&(e.dataset.icon=t,e.innerHTML=t)}function sa(){let e=Spicetify.Player;typeof e?.togglePlay=="function"&&e.togglePlay()}function Gr(){let e=Spicetify.Player;typeof e?.pause=="function"?e.pause():typeof e?.togglePlay=="function"&&G()&&e.togglePlay()}function cd(){G()||sa()}function ta(e,t,r){return Number.isFinite(e)?Math.min(r,Math.max(t,e)):t}function dd(){let e=Spicetify.Player;try{if(typeof e?.getRepeat=="function")return Number(e.getRepeat())||0}catch{}return null}function ea(e){let t=Spicetify.Player;try{typeof t?.setRepeat=="function"&&t.setRepeat(e)}catch{}}function ra(){let e=Spicetify.Player?.data?.item,t=String(e?.uri??""),r=Array.isArray(e?.artists)?e.artists.map(i=>i?.name).filter(Boolean).join(", "):"",n=e?.metadata??{};return{trackId:Pt(t),trackUri:t,title:e?.name||n.title||"Unknown title",artist:r||n.artist_name||n.artist||"Unknown artist",durationMs:V()}}function ud(){return{trackId:"",trackUri:"",title:"",artist:"",durationMs:0}}function na(e){if(e.kind!=="lyric")return e.start;let t=e.tokens.map(r=>r.start).filter(r=>r!=null);return t.length?Math.min(...t):null}function ia(e){let t=e.tokens.map(r=>r.start).filter(r=>r!=null);return t.length?Math.min(...t):null}function pd(e,t){let r=0;for(let n=0;n<=t;n++)e[n].kind==="lyric"&&r++;return r}function oa(e){for(let t of e.lines){if(t.kind!=="lyric")continue;t.text=aa(t.text);let r=t.tokens[0];r&&(r.text=aa(r.text))}}function aa(e){let t=e.search(/\p{L}/u);return t<0?e:e.slice(0,t)+e[t].toUpperCase()+e.slice(t+1)}function fd(e,t){let r=new Map,n=[];for(let i of e)if(i.kind==="interlude")n.push(i);else{let o=r.get(i.text)??[];o.push(i),r.set(i.text,o)}return t.map(i=>{if(i.kind==="interlude"){let a=n.shift();return{kind:"interlude",start:a?a.start:null}}let o=r.get(i.text)?.shift();if(o&&o.kind==="lyric"){let a=i.tokens.map((l,d)=>({text:l.text,start:o.tokens[d]?.text===l.text?o.tokens[d].start:null})),s=i.backgrounds.map((l,d)=>{let c=o.backgrounds[d],u=c?.text===l.text;return{text:l.text,tokens:l.tokens.map((f,p)=>({text:f.text,start:u&&c.tokens[p]?.text===f.text?c.tokens[p].start:null})),start:u?c.start:null,end:u?c.end:null}});return{kind:"lyric",text:i.text,tokens:a,backgrounds:s,start:o.start,end:o.end}}return i})}function Zr(e){return JSON.stringify({mode:e.mode,credit:e.credit??"",end:e.endMs,lines:e.lines.map(t=>t.kind==="interlude"?{i:t.start}:{t:t.text,s:t.start,e:t.end,w:t.tokens.map(r=>r.start),b:t.backgrounds.map(r=>({t:r.text,s:r.start,e:r.end,w:r.tokens.map(n=>n.start)}))})})}function We(e){if(e==null||!Number.isFinite(e))return"\u2013:\u2013\u2013.\u2013\u2013\u2013";let t=Math.max(0,e),r=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=Math.floor(t%1e3);return`${r}:${String(n).padStart(2,"0")}.${String(i).padStart(3,"0")}`}function Ke(e){let t=Math.max(0,Math.floor(e/1e3));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function hd(e,t){let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),i=document.createElement("a");i.href=n,i.download=e,i.click(),setTimeout(()=>URL.revokeObjectURL(n),2e3)}var $e=null;function H(e){let t=document.getElementById(Xr);if(t?.classList.contains("visible")){md(t,e);return}let r=Spicetify;typeof r?.showNotification=="function"?r.showNotification(e):console.log("[Liquid Lyrics]",e)}function md(e,t){let r=e.querySelector(".ll-editor-toast");r||(r=k("div","ll-editor-toast"),e.appendChild(r)),r.textContent=t,r.classList.remove("visible"),r.offsetWidth,r.classList.add("visible"),$e&&clearTimeout($e),$e=setTimeout(()=>{r?.classList.remove("visible"),$e=null},3400)}var O="liquid-lyrics-panel",ba="liquid-lyrics-song-card-visible",va="liquid-lyrics-animated-bg",ue="liquify-bg-mode",gd=["liquify-floating-player","glowify-floating-player"],ye="liquid-lyrics:romanization",yd="https://github.com/NMWplays/Liquid-Lyrics",bd="https://discord.gg/xGUq5mhWKA",vd=500,C=null,Zt=null,me=null,Ze=null,rn=0,la="",ca="",Xe=-1,nn=-1,da=!1,ua=!1,pa=!1,fa=!1,Qe=!0,Gt,Ye=!0,en="",vt=null,It=!1,X=[],F=0,ge=null,Ge=null,ha=!1;function Xt(){let e=document.getElementById(O);if(e)return e;let t=document.createElement("div");t.id=O,t.className="liquid-lyrics-panel";let r=document.createElement("div");r.className="liquid-lyrics-glass-bg";let n=kd(),i=Ld(),o=document.createElement("div");o.className="liquid-lyrics-header";let a=document.createElement("span");a.className="liquid-lyrics-title",a.textContent="Liquid Lyrics";let s=document.createElement("div");s.className="ll-header-actions",s.append(ma("ll-header-btn ll-github-btn",xd,"Star on GitHub",yd),ma("ll-header-btn ll-discord-btn",wd,"Join the Discord",bd)),o.append(a,s);let l=document.createElement("div");l.className="liquid-lyrics-view";let d=Ed(),c=document.createElement("div");c.className="liquid-lyrics-content",l.append(d,c);let u=Td();return t.append(n,r,i,o,l,u),Ta(t),mn(t),hn(t),(document.querySelector(".Root__main-view")??document.body).appendChild(t),C=new bt({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:p=>{t.classList.toggle("ll-has-romanization",p),K()}}),xt(),K(),da||(da=!0,document.addEventListener("fullscreenchange",Wd)),pa||(pa=!0,window.addEventListener(ye,()=>{C?.setRomanized(U(),I()),K()})),fa||(fa=!0,window.addEventListener(Jt,()=>{At()?(C?.setEnabled(!1),sn()):I()&&(C?.setEnabled(!0),an())})),ha||(ha=!0,window.addEventListener(Lt,()=>K())),zd(),t}function rr(){let e=Xt();Qe=!0,e.classList.add("visible"),xt(),K(),C?.setEnabled(!At()),an(),hn(e);let t=e.closest(".Root__main-view");if(t)for(let r of Array.from(t.children)){let n=r;n.id===O||!n.style||(n.dataset.liquidHidden===void 0&&(n.dataset.liquidHidden=`${n.style.opacity}|${n.style.pointerEvents}`),n.style.opacity="0",n.style.pointerEvents="none")}}function nr(){let e=document.getElementById(O);if(!e)return;e.classList.remove("visible"),C?.setEnabled(!1),sn(),ar(e),fn();let t=e.closest(".Root__main-view");if(t)for(let r of Array.from(t.children)){let n=r;if(n.id===O||n.dataset.liquidHidden===void 0)continue;let[i="",o=""]=n.dataset.liquidHidden.split("|");n.style.opacity=i,n.style.pointerEvents=o,delete n.dataset.liquidHidden}}function xa(){I()?nr():rr()}function I(){return document.getElementById(O)?.classList.contains("visible")??!1}function wa(e=I()){let t=Xt();e&&rr(),pn(t,"fullscreen"),ir(t)}function on(e){if(Xt(),!C)return;if(It&&gn(),Zt===e&&C.hasLyrics){C.setEnabled(I()&&!At()),xt();return}Zt=e,C.setLyrics(e);let t=U();C.setRomanized(t,t!=="off"),C.setEnabled(I()&&!At()),xt()}function be(e,t=!1){let r=Xt();if(!C)return;Zt=null,C.setLyrics(null),xt();let n=document.createElement("div");n.className="liquid-lyrics-empty";let i=document.createElement("div");if(i.className="ll-empty-message",i.textContent=e,n.appendChild(i),t){let o=document.createElement("button");o.type="button",o.className="ll-empty-create-btn",o.textContent="Create your own sync",o.addEventListener("click",()=>Yt()),n.appendChild(o)}C.container.appendChild(n),r.classList.remove("ll-has-romanization"),K()}var ka={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',cinema:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.4"/><path d="M3 9.2h18"/><path d="m7.2 5-1.7 4.2"/><path d="M12 5l-1.7 4.2"/><path d="m16.8 5-1.7 4.2"/></svg>',animatedBg:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M5 9.4c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/><path d="M5 15c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/></svg>',edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',report:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4.4h11l-2.2 3.6L16 11.6H5"/></svg>',review:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5.5" width="14" height="14" rx="2.4"/><path d="M9 4.2h6v2.6H9z"/><path d="m8.6 13 2 2 4-4"/></svg>'},xd='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',wd='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function ma(e,t,r,n){let i=document.createElement("button");return i.type="button",i.className=e,i.setAttribute("aria-label",r),i.innerHTML=t,i.addEventListener("click",o=>{o.stopPropagation(),window.open(n,"_blank")}),q(i,r),i}function kd(){let e=document.createElement("div");e.className="liquid-lyrics-fullscreen-bg";for(let t=0;t<4;t++){let r=document.createElement("div");r.className="ll-fullscreen-bg-tile",e.appendChild(r)}return e}function Ld(){let e=document.createElement("div");return e.className="liquid-lyrics-transparent-controls",e.setAttribute("aria-hidden","true"),e}function Ed(){let e=document.createElement("aside");e.className="liquid-lyrics-song-card";let t=document.createElement("div");t.className="ll-song-card-cover-wrap";let r=document.createElement("img");r.className="ll-song-card-cover",r.alt="",r.decoding="async",r.loading="lazy",t.appendChild(r);let n=document.createElement("div");n.className="ll-song-card-controls",n.append(W("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>pe(["toggleShuffle"])),W("ll-song-card-btn","previous","Previous",()=>pe(["back","previous","skipToPrevious"])),W("ll-song-card-btn ll-song-card-play","play","Play",()=>{pe(["togglePlay"]),window.setTimeout(xt,60)}),W("ll-song-card-btn","next","Next",()=>pe(["next","skipToNext"])),W("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>pe(["toggleRepeat"])));let i=document.createElement("div");i.className="playback-bar ll-song-card-progress",i.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let o=document.createElement("div");o.className="ll-song-card-info";let a=document.createElement("div");a.className="ll-song-card-title";let s=document.createElement("button");s.type="button",s.className="ll-song-card-link ll-song-card-album",q(s,"Open album");let l=document.createElement("button");return l.type="button",l.className="ll-song-card-link ll-song-card-artist",q(l,"Open artist"),o.append(a,s,l),e.append(t,n,i,o),me={card:e,cover:r,title:a,album:s,artist:l,playButton:e.querySelector(".ll-song-card-play"),shuffleButton:e.querySelector(".ll-song-card-shuffle"),repeatButton:e.querySelector(".ll-song-card-repeat"),progressTrack:i.querySelector(".ll-card-progress-track"),progressFill:i.querySelector(".ll-card-progress-fill"),progressThumb:i.querySelector(".ll-card-progress-thumb"),currentTime:i.querySelector(".ll-card-current"),durationTime:i.querySelector(".ll-card-duration")},Md(me),e}function Td(){let e=document.createElement("div");return e.className="liquid-lyrics-control-pill",e.append(W("ll-control-btn ll-card-toggle","cover","Song card",Hd),W("ll-control-btn ll-bg-toggle","animatedBg","Animated background",Dd),W("ll-control-btn ll-roman-toggle","roman","Romanization",Ud),W("ll-control-btn ll-edit-toggle","edit","Create / edit sync",()=>Yt()),W("ll-control-btn ll-report-toggle","report","Report this sync",Yd),W("ll-control-btn ll-review-toggle","review","Review submissions",Gd),W("ll-control-btn ll-cinema-toggle","cinema","Cinema mode",jd),W("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",Vd)),e}function W(e,t,r,n){let i=document.createElement("button");return i.type="button",i.className=e,i.dataset.icon=t,i.setAttribute("aria-label",r),i.innerHTML=ka[t],i.addEventListener("click",o=>{o.stopPropagation(),n()}),q(i,r),i}function La(e,t){!e||e.dataset.icon===t||(e.dataset.icon=t,e.innerHTML=ka[t])}function xt(){let e=me;if(!e)return;let t=Cd();t.cover?(e.cover.src!==t.cover&&(e.cover.src=t.cover),e.card.classList.remove("ll-no-cover")):(e.cover.removeAttribute("src"),e.card.classList.add("ll-no-cover")),Bd(t.cover),e.title.textContent=t.title,e.album.textContent=t.album,e.album.disabled=!t.albumUri,e.album.onclick=()=>ga(t.albumUri),e.artist.textContent=t.artist,e.artist.disabled=!t.artistUri,e.artist.onclick=()=>ga(t.artistUri),ve(),xe()}function ve(){let e=me;if(!e)return;let t=G(),r=t?"Pause":"Play";La(e.playButton,t?"pause":"play"),e.playButton.setAttribute("aria-label",r),e.playButton.dataset.tooltip=r,Rt(e.shuffleButton,Pd());let n=Od();Rt(e.repeatButton,n!=="off"),e.repeatButton.classList.toggle("ll-repeat-one",n==="track");let i=n==="track"?"Repeat one":n==="context"?"Repeat all":"Repeat";e.repeatButton.setAttribute("aria-label",i),e.repeatButton.dataset.tooltip=i}function an(){Ze||(rn=0,Xe=-1,nn=-1,Ze=Vt(Sd),ve(),xe())}function sn(){Ze?.(),Ze=null}function Sd(e,t){xe(e),t-rn>=vd&&(rn=t,ve())}function xe(e=Ea()){let t=me;if(!t)return;let r=V(),n=r>0?er(e/r):0;if(!t.progressTrack.classList.contains("ll-previewing")&&Math.abs(n-Xe)>2e-5){Xe=n,t.progressFill.style.transform=`scaleX(${n.toFixed(5)})`,t.progressThumb.style.left=`${(n*100).toFixed(3)}%`;let s=Math.round(n*100);s!==nn&&(nn=s,t.progressTrack.setAttribute("aria-valuenow",String(s)),t.progressTrack.setAttribute("aria-valuetext",`${he(e)} of ${he(r)}`))}let o=he(e);o!==la&&(la=o,t.currentTime.textContent=o);let a=he(r);a!==ca&&(ca=a,t.durationTime.textContent=a)}function Ea(){return ru(Spicetify.Player?.getProgress?.(),0)}function Md(e){let t=e.progressTrack,r=t.querySelector(".ll-card-preview-time"),n=0,i=0,o=c=>{let u=t.getBoundingClientRect();return er((c.clientX-u.left)/Math.max(1,u.width))},a=c=>{let u=V();u<=0||(t.classList.add("ll-previewing"),r&&(r.textContent=he(u*c),r.style.left=`${c*100}%`),e.progressFill.style.transform=`scaleX(${c.toFixed(4)})`,e.progressThumb.style.left=`${(c*100).toFixed(2)}%`)},s=c=>(i=c,n||(n=requestAnimationFrame(()=>{n=0,a(i)})),c),l=()=>{t.dataset.dragging!=="true"&&(t.classList.remove("ll-previewing"),n&&(cancelAnimationFrame(n),n=0),Xe=-1,xe())},d=c=>{let u=V();if(u<=0)return;let f=s(o(c));yt(u*f)};t.addEventListener("pointerenter",c=>s(o(c))),t.addEventListener("pointermove",c=>s(o(c))),t.addEventListener("pointerleave",l),t.addEventListener("blur",l),t.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),t.dataset.dragging="true",t.setPointerCapture?.(c.pointerId),s(o(c));let u=p=>s(o(p)),f=p=>{d(p),delete t.dataset.dragging,l(),t.releasePointerCapture?.(c.pointerId),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",f)};window.addEventListener("pointermove",u),window.addEventListener("pointerup",f,{once:!0})}),t.addEventListener("keydown",c=>{let u=V();if(u<=0)return;let f=Ea(),p=c.shiftKey?15e3:5e3;c.key==="ArrowLeft"?(c.preventDefault(),yt(Math.max(0,f-p))):c.key==="ArrowRight"&&(c.preventDefault(),yt(Math.min(u,f+p)))})}function Cd(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{},r=Array.isArray(e?.artists)?e.artists.map(i=>i?.name).filter(Boolean).join(", "):"",n=Array.isArray(e?.artists)?e.artists.find(i=>i?.uri):null;return{title:e?.name||t.title||t.track_name||"Unknown track",artist:r||t.artist_name||t.artist||t.album_artist_name||"Unknown artist",album:e?.album?.name||t.album_title||t.album_name||"Unknown album",cover:Ad(e,t),artistUri:n?.uri||qd(t.artist_uri||t.artist_uris||""),albumUri:e?.album?.uri||t.album_uri||""}}function Ad(e,t){let r=[t.image_xlarge_url,t.image_large_url,t.image_url,t.album_image_url,t.cover_url,e?.album?.images?.[0]?.url,e?.images?.[0]?.url];for(let n of r){let i=Rd(String(n??""));if(i)return Id(i)}return _d()}function Rd(e){return e?e.startsWith("spotify:image:")?e.replace("spotify:image:","https://i.scdn.co/image/"):e:""}function Id(e){return e.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function _d(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function qd(e){return String(e||"").split(",")[0]?.split(";")[0]?.trim()||""}function ga(e){let t=Nd(e);if(!t)return;let r=Spicetify.Platform?.History;typeof r?.push=="function"&&(r.push(t),nr())}function Nd(e){let t=String(e||"").split(":");if(t.length<3||t[0]!=="spotify")return"";let r=t[1],n=t[2];return!n||!["album","artist","track","playlist"].includes(r)?"":`/${r}/${n}`}function Pd(){let e=Spicetify.Player;if(typeof e?.getShuffle=="function")return!!e.getShuffle();let t=e?.data??{};return!!(t.shuffle??t.shuffling??t.options?.shuffling??t.playback_options?.shuffling??t.context?.metadata?.shuffle)}function Od(){let e=Spicetify.Player,t=e?.data??{},r=typeof e?.getRepeat=="function"?e.getRepeat():t.repeat??t.repeatMode??t.repeat_mode??t.options?.repeat??t.playback_options?.repeat??t.context?.metadata?.repeat;if(t.options?.repeatingTrack||t.playback_options?.repeating_track)return"track";if(t.options?.repeatingContext||t.playback_options?.repeating_context)return"context";if(typeof r=="number")return r===2?"track":r===1?"context":"off";let n=String(r??"").toLowerCase();return n.includes("track")||n.includes("song")||n==="one"?"track":n.includes("context")||n.includes("all")||n==="playlist"||n==="on"?"context":"off"}function zd(){ua||(ua=!0,["songchange","onplaypause","onqueuechange"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>{ve(),xe()})}catch{}}))}function pe(e){let t=Spicetify.Player;for(let r of e)if(typeof t?.[r]=="function"){t[r](),window.setTimeout(xt,80),window.setTimeout(ve,180);return}}function Bd(e){let r=document.getElementById(O)?.querySelector(".liquid-lyrics-fullscreen-bg");if(!r)return;let n=r.querySelectorAll(".ll-fullscreen-bg-tile");if(n.length<4)return;if(!e){n.forEach(l=>l.classList.remove("active")),en="";return}if(e===en)return;en=e;let i=[n[0],n[1]],o=[n[2],n[3]],a=Ye?i:o,s=Ye?o:i;a.forEach(l=>{l.style.backgroundImage=`url("${e}")`,l.classList.add("active")}),s.forEach(l=>l.classList.remove("active")),Ye=!Ye}function he(e){let t=Math.max(0,Math.floor(e/1e3)),r=Math.floor(t/60),n=t%60;return`${r}:${String(n).padStart(2,"0")}`}function Hd(){localStorage.setItem(ba,String(!cn())),K()}function ln(){return localStorage.getItem(va)==="true"}function Dd(){localStorage.setItem(va,String(!ln())),K()}function Ud(){let e=U(),t=C?.hasJapanese??!1;Me(e==="off"?"romaji":e==="romaji"&&t?"furigana":"off"),window.dispatchEvent(new Event(ye)),K()}function Fd(e){return e==="romaji"?"Romanization: Romaji":e==="furigana"?"Romanization: Furigana":"Romanization"}function jd(){let e=document.getElementById(O);e&&(dn(e)?ar(e):pn(e,"cinema"),ir(e))}function Vd(){let e=document.getElementById(O);e&&(or(e)?ar(e):pn(e,"fullscreen"),ir(e))}function ir(e){ot(),K(),fn(),mn(e),hn(e)}function Ta(e){e.classList.toggle("ll-song-card-hidden",!cn()),e.classList.toggle("ll-romanized",U()==="romaji"),e.classList.toggle("ll-animated-bg",ln())}function K(){let e=document.getElementById(O);if(!e)return;let t=U(),r=un(e);Ta(e),Rt(e.querySelector(".ll-card-toggle"),cn()),Rt(e.querySelector(".ll-roman-toggle"),t!=="off"),Rt(e.querySelector(".ll-cinema-toggle"),dn(e)),Rt(e.querySelector(".ll-fullscreen-toggle"),or(e));let n=e.querySelector(".ll-bg-toggle");n&&(n.hidden=r,n.disabled=r,Rt(n,r||ln()));let i=e.querySelector(".ll-roman-toggle"),o=e.classList.contains("ll-has-romanization");if(i){i.hidden=!o,i.disabled=!o,La(i,t==="furigana"?"furigana":"roman");let l=Fd(t);i.dataset.tooltip=l,i.setAttribute("aria-label",l),o||ot()}let a=e.querySelector(".ll-report-toggle");if(a){let l=!It&&!!Sa();a.hidden=!l,a.disabled=!l}let s=e.querySelector(".ll-review-toggle");if(s){let l=!It&&vr();s.hidden=!l,s.disabled=!l}}function Rt(e,t){e&&(e.classList.toggle("active",t),e.setAttribute("aria-pressed",String(t)))}function cn(){return localStorage.getItem(ba)!=="false"}function Wd(){ot();let e=document.getElementById(O);e&&document.fullscreenElement!==e&&e.classList.contains("ll-native-fullscreen")&&ar(e),K(),fn(),e&&mn(e)}function dn(e){return e.classList.contains("ll-fullscreen-mode")}function or(e){return document.fullscreenElement===e}function un(e){return dn(e)||or(e)}function Kd(e){!vt&&e.parentNode&&(vt=document.createComment("liquid-lyrics-fullscreen-placeholder"),e.parentNode.insertBefore(vt,e));let t=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==e?document.fullscreenElement:document.body;e.parentElement!==t&&t.appendChild(e)}function $d(e){vt?.parentNode&&(vt.parentNode.insertBefore(e,vt),vt.remove()),vt=null}function pn(e,t){if(un(e)||(Qe=I(),e.classList.contains("visible")||(e.classList.add("visible"),xt(),C?.setEnabled(!0),an())),Kd(e),t==="cinema"){document.fullscreenElement===e&&document.exitFullscreen?.(),e.classList.remove("ll-native-fullscreen"),e.classList.add("ll-fullscreen-mode");return}e.classList.remove("ll-fullscreen-mode"),e.classList.add("ll-native-fullscreen");let r=e.requestFullscreen?.();r&&typeof r.catch=="function"&&r.catch(()=>{or(e)||(e.classList.remove("ll-native-fullscreen"),e.classList.add("ll-fullscreen-mode"),ir(e))})}function ar(e){let t=e.classList.contains("ll-fullscreen-mode")||e.classList.contains("ll-native-fullscreen"),r=!Qe&&t;e.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===e&&document.exitFullscreen?.(),$d(e),r&&(e.classList.remove("visible"),C?.setEnabled(!1),sn()),Qe=!0}function fn(){let e=document.getElementById(O);if(!!(e&&un(e))){Gt===void 0&&(Gt=localStorage.getItem(ue)),localStorage.getItem(ue)!=="animated"&&(localStorage.setItem(ue,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}Gt!==void 0&&(Gt===null?localStorage.removeItem(ue):localStorage.setItem(ue,Gt),Gt=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function hn(e=document.getElementById(O)){if(!e)return;let t=gd.some(r=>localStorage.getItem(r)==="on");e.classList.toggle("ll-liquify-floating-player",t)}function mn(e=document.getElementById(O)){if(!e)return;let t=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),r=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);e.style.setProperty("--ll-transparent-controls-width",`${er(t,50,400)}px`),e.style.setProperty("--ll-transparent-controls-height",`${er(r,20,300)}px`)}function wt(e){let t=Spicetify;typeof t.showNotification=="function"&&t.showNotification(e)}function Sa(){return Zt?.Provider!=="community"?"":String(Zt?.LiquidLyricsCommunitySyncId??"")}var Jd=["Wrong timing","Wrong text / lyrics","Offensive / inappropriate","Spam or troll","Other"];function Yd(){let e=Sa();if(e){if(ot(),!qt()){ce(()=>ya(e));return}ya(e)}}function ya(e){let t=document.createElement("div");t.className="ll-editor-auth ll-report-dialog";let r=document.createElement("div");r.className="ll-editor-auth-dialog",t.appendChild(r),document.body.appendChild(t);let n=()=>{t.classList.remove("visible"),setTimeout(()=>t.remove(),280)};t.addEventListener("click",w=>{w.target===t&&n()}),t.addEventListener("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),n())});let i=document.createElement("h3");i.className="ll-editor-auth-title",i.textContent="Report this sync";let o=document.createElement("p");o.className="ll-editor-auth-subtitle",o.textContent="Tell the moderators what's wrong with it.";let a=document.createElement("div");a.className="ll-report-reasons";let s="",l=[];for(let w of Jd){let E=document.createElement("button");E.type="button",E.className="ll-report-reason",E.textContent=w,E.addEventListener("click",()=>{s=w,l.forEach(M=>M.classList.toggle("selected",M===E)),c.textContent=""}),l.push(E),a.appendChild(E)}let d=document.createElement("textarea");d.className="ll-report-detail",d.rows=2,d.maxLength=400,d.placeholder="Optional details...";let c=document.createElement("div");c.className="ll-editor-auth-error";let u=document.createElement("div");u.className="ll-editor-auth-actions";let f=document.createElement("button");f.type="button",f.className="ll-editor-auth-btn ll-editor-auth-secondary",f.textContent="Cancel",f.addEventListener("click",n);let p=document.createElement("button");p.type="button",p.className="ll-editor-auth-btn ll-editor-auth-primary",p.textContent="Send report",p.addEventListener("click",async()=>{if(!s){c.textContent="Pick a reason.";return}let w=d.value.trim(),E=w?`${s}: ${w}`:s;p.disabled=!0;try{await Fn(e,E),n(),wt("Report sent. Thanks!")}catch(M){c.textContent=it(M),p.disabled=!1}}),u.append(f,p),r.append(i,o,a,d,c,u),requestAnimationFrame(()=>t.classList.add("visible"))}function Gd(){ot(),Zd()}async function Zd(){let e=document.getElementById(O);if(!e||!C||It||!vr())return;let t=Pt(jt());if(!t)return;let r;try{r=await jn(t)}catch(n){wt(it(n));return}if(!r.length){wt("No pending submissions for this song.");return}Ge=Zt,X=r,F=0,It=!0,e.classList.add("ll-reviewing"),Xd(e),tr(),K()}function gn(){if(It){if(It=!1,document.getElementById(O)?.classList.remove("ll-reviewing"),ge?.remove(),ge=null,C){if(Ge){C.setLyrics(Ge);let e=U();C.setRomanized(e,e!=="off")}else C.setLyrics(null);C.setEnabled(I())}X=[],F=0,Ge=null,K()}}function tr(){let e=X[F];if(!e||!C)return;C.setLyrics(e.lyrics);let t=U();C.setRomanized(t,t!=="off"),C.setEnabled(!0),Qd()}function Xd(e){ge?.remove();let t=document.createElement("div");t.className="ll-review-bar";let r=fe("\u2039","ll-review-nav",()=>{F>0&&(F-=1,tr())}),n=document.createElement("div");n.className="ll-review-status";let i=fe("\u203A","ll-review-nav",()=>{F<X.length-1&&(F+=1,tr())}),o=fe("Approve","ll-review-approve",()=>void tu()),a=fe("Reject","ll-review-reject",()=>void eu()),s=fe("Exit","ll-review-exit",()=>gn());t.append(r,n,i,o,a,s),e.appendChild(t),ge=t}function Qd(){let e=ge?.querySelector(".ll-review-status"),t=X[F];e&&t&&(e.textContent=`Reviewing ${F+1}/${X.length} \xB7 by @${t.uploader}`)}async function tu(){let e=X[F];if(e){try{await Vn(e.id)}catch(t){wt(it(t));return}wt(`Approved "${e.title}".`),Ma()}}async function eu(){let e=X[F];if(e){try{await Wn(e.id)}catch(t){wt(it(t));return}wt(`Rejected "${e.title}".`),Ma()}}function Ma(){if(X.splice(F,1),!X.length){wt("Review queue cleared for this song."),gn();return}F>=X.length&&(F=X.length-1),tr()}function fe(e,t,r){let n=document.createElement("button");return n.type="button",n.className=t,n.textContent=e,n.addEventListener("click",r),n}function ru(e,t){let r=Number(e);return Number.isFinite(r)?Math.max(0,r):t}function er(e,t=0,r=1){return Math.min(r,Math.max(t,e))}var sr=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var yn="liquid-lyrics-button";function Ca(){let e=document.getElementById(yn);if(e)return e;let t=document.querySelector(".main-nowPlayingBar-extraControls");if(!t)return null;let r=document.createElement("button");return r.id=yn,r.className="liquid-lyrics-button",r.setAttribute("aria-label","Liquid Lyrics"),r.innerHTML=sr,q(r,"Liquid Lyrics"),r.addEventListener("click",()=>{xa(),r.classList.toggle("active",I())}),t.prepend(r),r}function Aa(){let e=document.getElementById(yn);e&&e.classList.toggle("active",I())}var wn="liquid-lyrics-sidebar-card",Pa="liquid-lyrics-sidebar-card-collapsed",iu=300,ou=2e3,we={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>'},tt=null,$=null,cr="Loading lyrics...",ke=null,dr=!1,Oa=!1,Ra=!1,bn=null,vn=!1,Ia=null,dt=null,_a=0,xn=!1,qa=[];function pr(){if(tt)return Ba(),_t(tt),tt;document.getElementById(wn)?.remove();let e=document.createElement("section");e.id=wn,e.className="liquid-lyrics-sidebar-card",tt=e,e.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${sr}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-edit-toggle" type="button" aria-label="Create / edit sync">${we.edit}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${we.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${we.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${we.open}</button>
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
  `;let t=e.querySelector(".ll-sidebar-header-main"),r=e.querySelector(".ll-sidebar-collapse-btn"),n=e.querySelector(".ll-sidebar-edit-toggle"),i=e.querySelector(".ll-sidebar-roman-toggle"),o=e.querySelector(".ll-sidebar-fullscreen-toggle"),a=e.querySelector(".ll-sidebar-open-toggle"),s=()=>{let c=!e.classList.contains("collapsed");localStorage.setItem(Pa,String(c)),Na(e),J()};t?.addEventListener("click",s),r?.addEventListener("click",s),n?.addEventListener("click",c=>{c.stopPropagation(),Yt()}),i?.addEventListener("click",c=>{c.stopPropagation();let u=U(),f=$?.hasJapanese??!1;Me(u==="off"?"romaji":u==="romaji"&&f?"furigana":"off"),window.dispatchEvent(new Event(ye)),J()}),o?.addEventListener("click",c=>{c.stopPropagation(),wa(!1)}),a?.addEventListener("click",c=>{c.stopPropagation(),rr()}),r&&q(r,"Toggle mini lyrics"),n&&q(n,"Create / edit sync"),i&&q(i,"Romanization"),o&&q(o,"Fullscreen"),a&&q(a,"Open Liquid Lyrics");let l=e.querySelector(".ll-sidebar-mini-viewport"),d=e.querySelector(".ll-sidebar-mini-lines");return $?.destroy(),$=new bt({container:d,scroller:l,variant:"sidebar",renderBackgrounds:!0,dotLiftPx:10,onRomanizationAvailability:()=>Le(e)}),Ra||(Ra=!0,window.addEventListener(ye,()=>{ur(!I()),tt&&Le(tt)}),window.addEventListener(Jt,()=>J())),Na(e),_t(e),su(),cu(),ke?($.setLyrics(ke),ur(!I())):En(cr,dr),J(),e}function kn(e,t="No lyrics available",r=!1){let n=pr();cr=e?"Live lyrics":t,$?.setLyrics(e),!e||!$?.hasLyrics?(ke=null,dr=r,En(cr,r)):(ke=e,dr=!1,ur(!I())),Le(n),J()}function za(e){cr=e,ke=null,dr=!1;let t=tt;t&&($?.setLyrics(null),En(e),Le(t),J())}function J(){let e=tt;if(!e)return;_t(e);let t=I();e.classList.toggle("ll-hidden",t),e.dataset.romanized=String(U()==="romaji"),Le(e);let r=e.classList.contains("collapsed"),n=!t&&!r&&e.isConnected&&!At();$?.setEnabled(n),n&&U()!=="off"&&!Oa&&ur(!0)}function Ln(){_t()}function ur(e){if(!$)return;let t=U();$.setRomanized(t,e),Oa=e||t==="off"}function En(e,t=!1){if(!$)return;let r=document.createElement("div");r.className="ll-sidebar-mini-empty";let n=document.createElement("div");if(n.className="ll-sidebar-mini-empty-text",n.textContent=e,r.appendChild(n),t){let i=document.createElement("button");i.type="button",i.className="ll-sidebar-mini-create-btn",i.textContent="Create your own sync",i.addEventListener("click",o=>{o.stopPropagation(),Yt()}),r.appendChild(i)}$.container.replaceChildren(r)}function Le(e){let t=e.querySelector(".ll-sidebar-roman-toggle");if(!t)return;let r=$?.hasRomanization??!1,n=U(),i=r&&n!=="off";t.hidden=!r,t.disabled=!r,t.classList.toggle("active",i),t.setAttribute("aria-pressed",String(i));let o=n==="furigana"?"furigana":"roman";t.dataset.icon!==o&&(t.dataset.icon=o,t.innerHTML=we[o]);let a=n==="romaji"?"Romanization: Romaji":n==="furigana"?"Romanization: Furigana":"Romanization";t.dataset.tooltip=a,t.setAttribute("aria-label",a)}function Na(e){let t=localStorage.getItem(Pa)==="true";e.classList.toggle("collapsed",t),e.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!t))}function _t(e=tt){if(!e)return!1;Ba();let t=au();return t?e.parentElement!==t||t.lastElementChild!==e?(t.appendChild(e),!0):!1:(e.parentElement?.classList.contains("Root__right-sidebar")&&e.remove(),!1)}function Ba(){document.querySelectorAll(`#${wn}`).forEach(e=>{e!==tt&&e.remove()})}function au(){if(dt?.isConnected)return dt;dt=null;let e=document.querySelector(".Root__right-sidebar"),t=e?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||e?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||e?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(t)return dt=t,t;let r=performance.now();return r-_a>=ou&&(_a=r,dt=lr(["nowplayingview","nowplayingwidget"],e??document)||lr(["nowplaying","widget"],e??document)||lr(["nowplayingview","nowplayinggrid"],e??document)||lr(["nowplaying","grid"],e??document)),dt}function lr(e,t=document){let r=e.map(n=>n.toLowerCase());for(let n of Array.from(t.querySelectorAll("*"))){let i=(n.getAttribute("class")||"").toLowerCase();if(r.every(o=>i.includes(o)))return n}return null}function su(){bn||(bn=new MutationObserver(()=>{lu()}),bn.observe(document.body,{childList:!0,subtree:!0}),Tn())}function lu(){vn||(vn=!0,setTimeout(()=>{vn=!1,Tn();let e=tt;e&&(e.isConnected&&dt?.isConnected&&e.parentElement===dt||_t(e)&&J())},iu))}function cu(){Ia||(Ia=setInterval(()=>{Tn(),_t(),J()},1e3))}function Tn(){if(!!document.querySelector(".Root__cinema-view")){xn=!0;return}xn&&(xn=!1,du())}function du(){qa.forEach(e=>clearTimeout(e)),qa=[80,260,620,1100].map(e=>setTimeout(()=>{let t=pr();dt=null,_t(t),J()},e))}var Ha=`\uFEFF/* ==========================================================================
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
  /* Prefer Glowify's own --glowify-shadow over rebuilding the glow from the
     parts: it carries Glowify's no-glow mode, which flips the variable to
     \`none\`. Rebuilding it (as before) ignored that, so the shadow stayed on
     while the theme's own surfaces went flat. The rebuild is the standalone
     fallback for when no Glowify is present. */
  --liquid-lyrics-glowify-shadow: var(--glowify-shadow, 0 0 var(--glowify-glow-blur, 25px) var(--glowify-glow-spread, 8px) var(--glowify-glow-accent, var(--accent-color)));
  /* Base backdrop follows Glowify's adjustable blur; falls back to 2rem when no
     Glowify is present. Liquify overrides this wholesale below. */
  --liquid-lyrics-surface-backdrop: blur(var(--glowify-backdrop-blur, 2rem));
  /* Host theme picks the shadow: Liquify v2 sets --liquify-shadow, Liquify v1
     sets --glass-shadow, Glowify sets --glowify-shadow (via the rebuild above). */
  --liquid-lyrics-surface-shadow: var(--liquify-shadow, var(--glass-shadow, var(--liquid-lyrics-glowify-shadow)));
  --liquid-lyrics-song-card-shadow: var(--liquid-lyrics-glowify-shadow);
}

/* Liquify glass filter integration \u2014 v1 and v2 both expose #glass-filter--r1-7.
   The blur follows v2's glass-blur slider; v1 has no slider, so it lands on the
   2px it hardcodes itself. */
:root:has(#glass-filter--r1-7) {
  --liquid-lyrics-surface-backdrop: var(--glass-filter, url(#glass-filter--r1-7)) blur(var(--liquify-glass-blur, 2px));
  --liquid-lyrics-song-card-shadow: none;
}

/* Liquify v2 performance mode: the theme swaps the SVG refraction for a plain
   backdrop blur, so match .liquify-glass--simple. Needs :has() here too \u2014 the
   perf class alone loses on specificity to the ID-carrying rule above. */
:root.liquify-perf-no-glass:has(#glass-filter--r1-7) {
  --liquid-lyrics-surface-backdrop: blur(var(--liquify-backdrop-blur, 2rem)) saturate(1.4);
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
  /* Size of Spotify's window-control strip (top right), from Liquify's
     liquify-tc-width/height. Declared here, not on the overlay that paints it,
     so the fullscreen header can keep its actions clear of the same strip.
     JS overwrites these on the panel \u2014 see syncTransparentControlsOverlay. */
  --ll-transparent-controls-width: 135px;
  --ll-transparent-controls-height: 64px;
}

/* The open panel overlays the main view instead of collapsing it; siblings
   are faded to opacity 0 (JS) so Spotify keeps their layout and scroll state
   and no descendant (e.g. sticky playlist headers) can punch through. */
.Root__main-view:has(> .liquid-lyrics-panel) {
  position: relative;
}

/* Contain the panel's z-index. Without a stacking context here, position:relative
   + z-index:auto lets the panel's z-index:100 compete in .Root's context, where it
   outranks siblings it should never touch \u2014 it covered Liquify's floating player
   and, being transparent there, left it visible but unclickable. Safe in
   cinema/fullscreen: the panel is moved out to <body> (see detachPanel). */
.Root__main-view:has(> .liquid-lyrics-panel.visible) {
  isolation: isolate;
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
  /* Darkened through the filter, not opacity: opacity would make the blobs
     see-through and let the app behind them show. */
  filter: blur(51px) brightness(0.6);
  opacity: 0;
  transform-origin: center;
  animation: ll-fullscreen-bg-spin 30s linear infinite;
  transition: opacity 600ms ease;
  /* Sized against the layer itself \u2014 the panel in a window, the screen in
     fullscreen \u2014 so one geometry fits both, and every monitor. Each blob is a
     circle centred in its half of the layer (25% / 75%), overlapping across the
     middle. The diameter is a full layer width: the corners sit ~0.38 widths
     from a centre and blur(50px) stops covering ~75px short of the circle's
     edge, so anything smaller leaves them bare \u2014 which is exactly what showed
     up at 75%. margin-top resolves against the layer's width just like width
     does, so top:50% pulled back by half the diameter centres the circle at any
     aspect ratio. */
  width: 100%;
  aspect-ratio: 1;
  top: 50%;
  margin-top: -50%;
}

/* Per tile, not per layer: only the set holding the current cover is lit, so a
   cover change crossfades the two sets against each other. */
.ll-fullscreen-bg-tile.active {
  opacity: 1;
}

/* The control-pill toggle shows the same cover-art layer outside fullscreen.
   Visibility only \u2014 it stays absolute inside the panel (clipped by its
   overflow) and skips the black backdrop, so it lies behind the lyrics rather
   than over the app. Fullscreen turns it on regardless, further down. */
.liquid-lyrics-panel.ll-animated-bg .liquid-lyrics-fullscreen-bg {
  opacity: 1;
}

/* Liquify draws the main view's rim via .Root__main-view::after, but the panel
   sits above it at z-index 100 \u2014 fine while the panel is see-through, gone the
   moment the opaque blobs are switched on. Redraw it here, over our own
   background. Not in fullscreen: the panel is moved out to <body> there, so
   there is no main view behind it to carry a rim. */
.liquid-lyrics-panel.ll-animated-bg:not(.ll-fullscreen-mode):not(:fullscreen)::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  border-radius: var(--liquify-main-radius, 20px);
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-fullscreen-bg-tile:nth-child(1),
.ll-fullscreen-bg-tile:nth-child(3) {
  left: -25%;
}

.ll-fullscreen-bg-tile:nth-child(2),
.ll-fullscreen-bg-tile:nth-child(4) {
  right: -25%;
  animation-direction: reverse;
  animation-duration: 25s;
}

.liquid-lyrics-transparent-controls {
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
  /* Fullscreen lays these over Spotify's title bar, which is an Electron drag
     region: the window manager takes those clicks before the page sees them,
     leaving the overlapping part of a button dead. Only an explicit no-drag
     punches a hole in that region \u2014 the default value does not subtract from
     it. Same reason the theme's gear button sets this (settings/gear.ts). */
  -webkit-app-region: no-drag;
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
  outline: var(--glowify-outline, none) !important;
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

/* Attribution block below the final lyric line. */
.liquid-lyrics-credits {
  width: 100%;
  max-width: 900px;
  margin-top: 30px;
  padding-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
}

.liquid-lyrics-credits .ll-credits-writers {
  font-size: 13px;
  font-weight: 650;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.62);
}

.liquid-lyrics-credits .ll-credits-source {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

/* Compact variant inside the sidebar mini card. The bottom margin lifts the
   block clear of the viewport's bottom fade mask, which would otherwise blank
   it out entirely when scrolled to the end. */
.liquid-lyrics-sidebar-card .liquid-lyrics-credits {
  margin-top: 16px;
  margin-bottom: 34px;
  padding-top: 12px;
  gap: 3px;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-credits .ll-credits-writers {
  font-size: 11.5px;
}

.liquid-lyrics-sidebar-card .liquid-lyrics-credits .ll-credits-source {
  font-size: 10px;
}

.liquid-lyrics-empty {
  width: 100%;
  height: 100%;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 42px;
  color: rgba(255, 255, 255, 0.56);
  font-size: 16px;
  font-weight: 650;
  line-height: 1.4;
  text-align: center;
}

.ll-empty-create-btn {
  padding: 12px 22px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: 0.2px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  cursor: pointer;
  transition:
    transform 260ms cubic-bezier(0.3, 2, 0.32, 1),
    background 200ms ease;
}

.ll-empty-create-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translate3d(0, -1px, 0) scale(1.03);
}

.ll-empty-create-btn:active {
  transform: scale(0.96);
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
  outline: var(--glowify-outline, none) !important;
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
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none)) !important;
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
  outline: var(--glowify-outline, none) !important;
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
  outline: var(--glowify-outline, none) !important;
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
  outline: var(--glowify-outline, none) !important;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-50%, 28px, 0) scale(0.98);
  transition:
    opacity 280ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Liquify floating player mode: the bar floats over the bottom of the main view,
   so lift the pill clear of it. The offset matches the 7rem bottom clearance
   Liquify pads its own scroll containers with. */
.liquid-lyrics-panel.ll-liquify-floating-player .liquid-lyrics-control-pill {
  bottom: var(--ll-floating-player-offset, 7rem);
}

/* Fullscreen detaches the panel from the layout, so the floating bar is not
   over it and the pill keeps its resting offset. */
.liquid-lyrics-panel.ll-liquify-floating-player:fullscreen .liquid-lyrics-control-pill,
.liquid-lyrics-panel.ll-liquify-floating-player.ll-fullscreen-mode .liquid-lyrics-control-pill {
  bottom: 28px;
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
  outline: var(--glowify-outline, none) !important;
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
  /* Resting value, mirroring @property's initial-value. The text is painted by
     this gradient alone (transparent fill + background-clip: text), so a
     --line-progress that resolves to nothing voids the whole background and the
     line turns fully invisible rather than merely unlit. Declaring it here keeps
     the line readable even if the state class is missing or @property never
     registered; .past/.future still override it. */
  --line-progress: -20;
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

/* Static lyrics carry no timeline, so onContainerClick can't seek to them \u2014 no
   hover highlight may claim otherwise. (.liquid-lyrics-static already parks the
   cursor at default.) */
.liquid-lyrics-line:hover:not(.liquid-lyrics-static) {
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
  /* Resting value \u2014 see --line-progress on .liquid-lyrics-line. */
  --syl-progress: -20;
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
  /* Resting value \u2014 see --line-progress on .liquid-lyrics-line. */
  --letter-progress: -20;
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
  outline: var(--glowify-outline, none) !important;
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
  outline: var(--glowify-outline, none) !important;
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
  outline: var(--glowify-outline, none) !important;
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
  padding: 22px 18px 0px;
}

.ll-sidebar-mini-empty {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 0 14px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
}

.ll-sidebar-mini-create-btn {
  padding: 8px 16px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font-size: 12.5px;
  font-weight: 750;
  letter-spacing: 0.2px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  cursor: pointer;
  transition:
    transform 260ms cubic-bezier(0.3, 2, 0.32, 1),
    background-color 180ms ease;
}

.ll-sidebar-mini-create-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translate3d(0, -1px, 0) scale(1.03);
}

.ll-sidebar-mini-create-btn:active {
  transform: scale(0.96);
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

/* Hover comes last and matches the resting state rules above in specificity, or
   they outrank it: .past already did on specificity, .future tied and won on
   source order alone, so hovering a synced line did nothing at all. Excludes
   .active \u2014 that line sits at full opacity and must not dim under the pointer.
   Seekable lines only; .liquid-lyrics-static can't be clicked. */
.liquid-lyrics-sidebar-card
  .liquid-lyrics-line:hover:not(.liquid-lyrics-interlude):not(.liquid-lyrics-static):not(.active) {
  opacity: 0.6;
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

.liquid-lyrics-panel.ll-fullscreen-mode,
.liquid-lyrics-panel:fullscreen {
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

/* Only cinema mode (and the editor) overlay Spotify's real window controls, so
   only they need the brightening patch. Native fullscreen hides the window
   frame \u2014 there are no controls to keep visible there. */
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-transparent-controls,
.liquid-lyrics-editor.visible .liquid-lyrics-transparent-controls {
  opacity: 1;
}

/* Cinema mode lays the panel over the whole window, so the header actions land
   under Spotify's window controls in the top-right corner. Pull them clear of
   that strip \u2014 max() so a small configured strip can never pull them further
   right than the header's normal padding. Native fullscreen has no such strip,
   so it keeps the header's normal padding. */
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-header {
  padding-right: max(
    clamp(28px, 6vw, 118px),
    calc(var(--ll-transparent-controls-width, 135px) + 20px)
  );
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

/* --- 11. Sync editor ---------------------------------------------------------- */

.liquid-lyrics-editor {
  --ll-editor-accent: var(--accent-color, #1ed760);
  position: fixed;
  inset: 0;
  z-index: 2147483400;
  display: flex;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 260ms ease, visibility 0s linear 260ms;
}

.liquid-lyrics-editor.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 260ms ease;
}

.ll-editor-glass-bg {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 12, 0.72);
  backdrop-filter: blur(34px) saturate(1.2);
  -webkit-backdrop-filter: blur(34px) saturate(1.2);
}

.ll-editor-shell {
  position: relative;
  z-index: 1;
  margin: auto;
  width: min(1080px, 94vw);
  height: min(92vh, 940px);
  display: flex;
  flex-direction: column;
  padding: 22px clamp(18px, 3vw, 34px) 18px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 30px 90px rgba(0, 0, 0, 0.55);
  transform: translateY(14px) scale(0.985);
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.liquid-lyrics-editor.visible .ll-editor-shell {
  transform: translateY(0) scale(1);
}

/* Header */
.ll-editor-header {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
}

.ll-editor-title-group {
  min-width: 0;
}

.ll-editor-title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: #fff;
}

.ll-editor-song {
  margin-top: 2px;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
}

.ll-editor-mode-switch {
  margin-left: 8px;
  display: inline-flex;
  padding: 4px;
  gap: 3px;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.06);
}

.ll-editor-mode-btn {
  padding: 7px 16px;
  border: 0;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  font-weight: 750;
  background: transparent;
  cursor: pointer;
  transition: color 160ms ease, background 200ms ease;
}

.ll-editor-mode-btn:hover {
  color: #fff;
}

.ll-editor-mode-btn.active {
  color: #06120a;
  background: var(--ll-editor-accent);
}

.ll-editor-header-actions {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

/* Community account chip (header) \u2014 glass surface with the theme's rim like the
   other buttons. */
.ll-editor-account-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 180px;
  height: 38px;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  outline: var(--glowify-outline, none) !important;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),
    box-shadow 280ms ease,
    color 180ms ease,
    background 220ms ease;
}

.ll-editor-account-chip::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-editor-account-chip:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  transform: translate3d(0, -1px, 0) scale(1.04);
}

.ll-editor-account-chip:active {
  transform: scale(0.95);
}

.ll-editor-account-chip:active {
  transform: scale(0.96);
}

.ll-editor-account-chip.is-authed {
  color: var(--ll-editor-accent);
}

.ll-editor-account-icon {
  display: inline-flex;
  flex: 0 0 auto;
}

.ll-editor-account-icon svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ll-editor-account-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Publish menu item accent */
.ll-editor-menu-accent {
  color: var(--ll-editor-accent);
  font-weight: 750;
}

.ll-editor-menu-accent:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--ll-editor-accent);
}

/* Login / register dialog */
.ll-editor-auth {
  position: fixed;
  inset: 0;
  z-index: 2147483450;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  /* Only the dim scrim fades (background-color), and NOT via opacity. The overlay
     gets no backdrop-filter of its own: animating a blur radius stutters, and an
     overlay blur would nest with the dialog's glass and flatten it. The glass +
     blur lives on the dialog, which then samples the real (dimmed) app behind it.
     No opacity anywhere in the fade, so the glass never renders black mid-fade. */
  background: rgba(0, 0, 0, 0);
  transition: background 240ms ease;
}

.ll-editor-auth.visible {
  background: rgba(0, 0, 0, 0.42);
}

.ll-editor-auth-dialog {
  position: relative;
  width: min(380px, 92vw);
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 24px 70px rgba(0, 0, 0, 0.5);
  outline: var(--glowify-outline, none) !important;
  /* Enter/exit copied from Liquify's settings panel. The dialog animates its OWN
     opacity + transform (never an ancestor's), and will-change promotes it to a
     compositor layer so the glass is composited once, not re-sampled per frame -
     that's what makes it smooth AND non-black (only ANCESTOR opacity over a
     backdrop-filter child renders black; own-element opacity is fine). */
  opacity: 0;
  transform: translateY(8px) scale(0.94);
  transform-origin: top center;
  will-change: transform, opacity;
  transition:
    transform 260ms cubic-bezier(0.8, 0, 0.2, 1),
    opacity 220ms ease-in;
}

.ll-editor-auth.visible .ll-editor-auth-dialog {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition:
    transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 360ms ease-out;
}

.ll-editor-auth-dialog::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-editor-auth-title {
  margin: 0 0 4px;
  font-size: 19px;
  font-weight: 800;
  text-align: center;
  color: #fff;
}

.ll-editor-auth-subtitle {
  margin: 0 0 18px;
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
  color: rgba(255, 255, 255, 0.55);
}

.ll-editor-auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ll-editor-auth-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ll-editor-auth-label {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
}

.ll-editor-auth-input {
  height: 42px;
  padding: 0 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 11px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  font: inherit;
  font-size: 14px;
  transition: border-color 160ms ease, background 160ms ease;
}

.ll-editor-auth-input:hover {
  background: rgba(255, 255, 255, 0.08);
}

.ll-editor-auth-input:focus {
  outline: none;
  border-color: var(--accent-color, #1ed760);
  background: rgba(255, 255, 255, 0.09);
}

.ll-editor-auth-error {
  min-height: 16px;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.3;
  color: #ff8a8a;
}

.ll-editor-auth-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 42px;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),
    box-shadow 280ms ease,
    filter 200ms ease,
    background 220ms ease;
}

/* Theme rim, like the other glass buttons. */
.ll-editor-auth-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-editor-auth-btn:hover:not(:disabled) {
  transform: translate3d(0, -1px, 0) scale(1.03);
}

.ll-editor-auth-btn:active {
  transform: scale(0.95);
}

.ll-editor-auth-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.ll-editor-auth-primary {
  color: #06120a;
  background: var(--accent-color, #1ed760);
}

.ll-editor-auth-primary:hover:not(:disabled) {
  filter: brightness(1.08);
}

.ll-editor-auth-secondary {
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
}

.ll-editor-auth-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
}

.ll-editor-auth-toggle {
  margin-top: 2px;
  padding: 6px;
  border: 0;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  background: transparent;
  font: inherit;
  font-size: 12.5px;
  font-weight: 650;
  cursor: pointer;
  transition: color 160ms ease;
}

.ll-editor-auth-toggle:hover {
  color: #fff;
}

.ll-editor-auth-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.ll-editor-auth-actions .ll-editor-auth-btn {
  flex: 1;
}

/* Report dialog reasons + detail */
.ll-report-reasons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.ll-report-reason {
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 11px;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  font: inherit;
  font-size: 12.5px;
  font-weight: 650;
  cursor: pointer;
  transition:
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),
    background 200ms ease,
    color 160ms ease,
    border-color 160ms ease;
}

.ll-report-reason:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.09);
  transform: translate3d(0, -1px, 0) scale(1.03);
}

.ll-report-reason:active {
  transform: scale(0.96);
}

.ll-report-reason.selected {
  color: #06120a;
  background: var(--accent-color, #1ed760);
  border-color: transparent;
}

.ll-report-detail {
  width: 100%;
  margin-bottom: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 11px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  font: inherit;
  font-size: 13.5px;
  line-height: 1.4;
  min-height: 55px;
  resize: vertical;
}

.ll-report-detail:focus {
  outline: none;
  border-color: var(--accent-color, #1ed760);
}

/* Review mode bar (moderators) */
.ll-review-bar {
  position: absolute;
  z-index: 7;
  left: 50%;
  top: 84px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 8px 12px;
  border-radius: 16px;
  color: #fff;
  background: transparent;
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow);
  outline: var(--glowify-outline, none) !important;
  animation: ll-review-bar-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes ll-review-bar-in {
  from { transform: translate3d(-50%, -12px, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

.ll-review-status {
  padding: 0 8px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.9);
}

.ll-review-bar button {
  position: relative;
  height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 11px;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
  font: inherit;
  font-size: 13px;
  font-weight: 750;
  cursor: pointer;
  transition:
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),
    background 200ms ease,
    filter 180ms ease;
}

/* Theme rim, like the other glass buttons. */
.ll-review-bar button::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-review-bar button:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translate3d(0, -1px, 0) scale(1.04);
}

.ll-review-bar button:active {
  transform: scale(0.95);
}

.ll-review-nav {
  width: 34px;
  padding: 0 !important;
  font-size: 18px !important;
  line-height: 1;
}

.ll-review-approve {
  color: #06120a !important;
  background: var(--accent-color, #1ed760) !important;
}

.ll-review-approve:hover {
  filter: brightness(1.08);
}

.ll-review-reject {
  color: #ff8a8a !important;
  background: rgba(255, 107, 107, 0.16) !important;
}

.ll-review-reject:hover {
  background: rgba(255, 107, 107, 0.26) !important;
}

.ll-review-exit {
  color: rgba(255, 255, 255, 0.7) !important;
  background: transparent !important;
}

.ll-review-exit:hover {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.ll-editor-icon-btn {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: color 160ms ease, background 200ms ease, transform 200ms ease;
}

.ll-editor-icon-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.ll-editor-icon-btn:active {
  transform: scale(0.94);
}

.ll-editor-save-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px 9px 14px;
  border: 0;
  border-radius: 12px;
  color: #06120a;
  font-size: 13.5px;
  font-weight: 800;
  background: var(--ll-editor-accent);
  cursor: pointer;
  transition: transform 220ms cubic-bezier(0.3, 2, 0.32, 1), filter 200ms ease;
}

.ll-editor-save-btn:hover {
  filter: brightness(1.08);
  transform: translate3d(0, -1px, 0);
}

.ll-editor-save-btn:active {
  transform: scale(0.97);
}

.ll-editor-icon-btn svg,
.ll-editor-save-btn svg,
.ll-editor-play-btn svg,
.ll-editor-line-btn svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Menu popover */
.ll-editor-menu-wrap {
  position: relative;
}

.ll-editor-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 20;
  min-width: 205px;
  display: none;
  flex-direction: column;
  padding: 10px;
  border-radius: 14px;
  /* Glass surface like the tooltip, not a flat grey slab. */
  background: rgba(20, 20, 26, 0.4);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 18px 50px rgba(0, 0, 0, 0.45);
  outline: var(--glowify-outline, none) !important;
}

.ll-editor-menu.open {
  display: flex;
}

.ll-editor-menu-item {
  padding: 10px 12px;
  border: 0;
  border-radius: 9px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  background: transparent;
  cursor: pointer;
  transition:
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),
    box-shadow 0.28s ease,
    background 0.28s ease,
    color 0.2s ease;
}

.ll-editor-menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  box-shadow: var(--liquid-lyrics-surface-shadow);
  transform: scale(1.03);
}

.ll-editor-menu-danger {
  color: #ff8a8a;
}

.ll-editor-menu-danger:hover {
  background: rgba(255, 80, 80, 0.14);
  color: #ff8a8a;
}

/* Steps */
.ll-editor-steps {
  display: inline-flex;
  align-self: center;
  margin: 16px 0 4px;
  padding: 4px;
  gap: 3px;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.ll-editor-step-btn {
  padding: 8px 20px;
  border: 0;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 700;
  background: transparent;
  cursor: pointer;
  transition: color 160ms ease, background 200ms ease;
}

.ll-editor-step-btn:hover {
  color: #fff;
}

.ll-editor-step-btn.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

/* Body */
.ll-editor-body {
  flex: 1;
  min-height: 0;
  display: flex;
  margin-top: 12px;
}

.ll-editor-body > * {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* Text stage */
.ll-editor-hint {
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.66);
  font-size: 12.5px;
  line-height: 1.55;
  text-align: center;
  flex: 0 0 auto;
}

.ll-editor-hint b {
  color: var(--ll-editor-accent);
  font-weight: 750;
}

.ll-editor-textarea {
  flex: 1;
  min-height: 0;
  margin-top: 12px;
  padding: 18px 20px;
  resize: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  color: #f4f4f6;
  font-size: 15px;
  line-height: 1.75;
  font-family: inherit;
  background: rgba(0, 0, 0, 0.25);
  outline: none;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;
  transition: border-color 180ms ease;
}

.ll-editor-textarea:focus {
  border-color: var(--ll-editor-accent);
}

.ll-editor-credit-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  flex: 0 0 auto;
}

.ll-editor-credit-label {
  flex: 0 0 auto;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.5);
}

.ll-editor-credit-input {
  flex: 1;
  min-width: 0;
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #f4f4f6;
  font-size: 13.5px;
  font-family: inherit;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: var(--liquify-shadow);
  outline: none;
  transition: border-color 160ms ease;
}

.ll-editor-credit-input::placeholder {
  color: rgba(255, 255, 255, 0.32);
}

.ll-editor-credit-input:focus {
  border-color: var(--ll-editor-accent);
}

.ll-editor-text-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  flex: 0 0 auto;
}

.ll-editor-text-stats {
  font-size: 12.5px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.5);
}

.ll-editor-primary-btn {
  padding: 11px 22px;
  border: 0;
  border-radius: 13px;
  color: #06120a;
  font-size: 14px;
  font-weight: 800;
  background: var(--ll-editor-accent);
  cursor: pointer;
  transition: transform 220ms cubic-bezier(0.3, 2, 0.32, 1), filter 200ms ease;
}

.ll-editor-primary-btn:hover {
  filter: brightness(1.08);
  transform: translate3d(0, -1px, 0);
}

.ll-editor-primary-btn:active {
  transform: scale(0.97);
}

/* Sync stage */
.ll-editor-sync-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 16px;
  margin-bottom: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  flex: 0 0 auto;
}

.ll-editor-tap-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 10px 26px;
  border: 0;
  border-radius: 13px;
  color: #06120a;
  background: var(--ll-editor-accent);
  cursor: pointer;
  transition: transform 200ms cubic-bezier(0.3, 2, 0.32, 1), filter 180ms ease;
}

.ll-editor-tap-btn b {
  font-size: 14px;
  font-weight: 800;
}

.ll-editor-tap-btn span {
  font-size: 10.5px;
  font-weight: 650;
  opacity: 0.72;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.ll-editor-tap-btn:hover {
  filter: brightness(1.08);
}

.ll-editor-tap-btn:active {
  transform: scale(0.96);
}

/* The tap button is kept focused so Space always taps; hide the ring for that
   programmatic/mouse focus, keep it for genuine keyboard navigation. */
.ll-editor-tap-btn:focus {
  outline: none;
}

.ll-editor-tap-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.65);
  outline-offset: 2px;
}

.ll-editor-sync-hint {
  flex: 1;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  color: rgba(255, 255, 255, 0.55);
}

.ll-editor-sync-hint b {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 750;
}

.ll-editor-sync-status {
  flex: 0 0 auto;
  font-size: 12.5px;
  font-weight: 750;
  color: var(--ll-editor-accent);
  white-space: nowrap;
}

/* Line-end marker chip in a karaoke line's token row. */
.ll-editor-lineend-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 7px;
}

.ll-editor-lineend-chip svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ll-editor-lines {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  /* The list is rebuilt in place (e.g. after Clear); anchoring would let the
     browser jump the scroll position around during that rebuild. */
  overflow-anchor: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;
}

.ll-editor-lines::-webkit-scrollbar {
  width: 6px;
}

.ll-editor-lines::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.ll-editor-line {
  display: grid;
  grid-template-columns: 30px 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 11px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;
}

.ll-editor-line:hover {
  background: rgba(255, 255, 255, 0.06);
}

.ll-editor-line.is-current {
  border-color: var(--ll-editor-accent);
  background: rgba(255, 255, 255, 0.08);
}

.ll-editor-line.is-interlude {
  opacity: 0.72;
}

.ll-editor-line-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 750;
  color: rgba(255, 255, 255, 0.4);
}

.ll-editor-line-index svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ll-editor-line-main {
  min-width: 0;
  font-size: 14.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.ll-editor-line-interlude-text {
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
}

/* Final "end of lyrics" marker row. */
.ll-editor-end-row {
  margin-top: 6px;
}

.ll-editor-end-row .ll-editor-line-index {
  color: var(--ll-editor-accent);
}

.ll-editor-token-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ll-editor-tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

/* Background sub-lyric row \u2014 smaller, dimmer, and indented under the lead. */
.ll-editor-bg-tokens {
  margin-left: 14px;
  padding-left: 10px;
  border-left: 2px solid rgba(255, 255, 255, 0.12);
  gap: 4px;
}

.ll-editor-bg-tokens .ll-editor-token {
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 6px;
}

.ll-editor-token {
  padding: 3px 8px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: var(--liquify-shadow);
  transition: color 140ms ease, background 140ms ease, box-shadow 140ms ease;
}

.ll-editor-token.is-synced {
  color: #fff;
  background: rgba(255, 255, 255, 0.13);
}

.ll-editor-token.is-current {
  color: #06120a;
  background: var(--ll-editor-accent);
  box-shadow: var(--liquify-shadow);
}

.ll-editor-line-time {
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
}

.ll-editor-line.is-synced .ll-editor-line-time {
  color: var(--ll-editor-accent);
}

.ll-editor-line-controls {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  opacity: 0;
  transition: opacity 150ms ease;
}

.ll-editor-line:hover .ll-editor-line-controls,
.ll-editor-line.is-current .ll-editor-line-controls {
  opacity: 1;
}

.ll-editor-line-btn {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.62);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: color 140ms ease, background 140ms ease;
}

.ll-editor-line-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
}

/* Preview stage */
.ll-editor-preview-warn {
  padding: 10px 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: rgba(255, 190, 80, 0.12);
  color: #ffd08a;
  font-size: 12.5px;
  font-weight: 650;
  text-align: center;
  flex: 0 0 auto;
}

/* Frame carries the glass rim + rounding; the inner scroller keeps the fade mask
   (an outer shadow on a masked element would be clipped away). */
.ll-editor-preview-frame {
  flex: 1;
  min-height: 0;
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.22);
  box-shadow: var(--liquid-lyrics-surface-shadow);
}

.ll-editor-preview-scroll {
  /* Positioned so the lyric lines' offsetTop is measured against this scroller \u2014
     unpositioned, the auto-scroll measured against the overlay and centered the
     active line too high. */
  position: relative;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 10px 60px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;
  mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 88%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 88%, transparent 100%);
}

.ll-editor-preview-lines {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Transport */
.ll-editor-transport {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 14px;
  padding: 10px 16px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.ll-editor-play-btn {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 13px;
  color: #06120a;
  background: var(--ll-editor-accent);
  cursor: pointer;
  transition: transform 200ms ease, filter 180ms ease;
}

.ll-editor-play-btn:hover {
  filter: brightness(1.08);
}

.ll-editor-play-btn:active {
  transform: scale(0.94);
}

.ll-editor-time {
  font-variant-numeric: tabular-nums;
  font-size: 12.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.62);
  min-width: 38px;
}

.ll-editor-time-dur {
  text-align: right;
}

.ll-editor-seek-track {
  flex: 1;
  padding: 10px 0;
  cursor: pointer;
}

.ll-editor-seek-bar {
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;
}

.ll-editor-seek-fill {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform: scaleX(0);
  border-radius: 999px;
  background: var(--ll-editor-accent);
}

/* Themed glass rim (::after) + springy hover on editor buttons, lyric rows and
   the fine-adjust buttons \u2014 matches the rest of the extension's surfaces. */
.ll-editor-icon-btn,
.ll-editor-save-btn,
.ll-editor-primary-btn,
.ll-editor-tap-btn,
.ll-editor-play-btn,
.ll-editor-line-btn,
.ll-editor-mode-btn,
.ll-editor-step-btn,
.ll-editor-line {
  position: relative;
  transition:
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),
    box-shadow 0.28s ease,
    background 0.28s ease,
    color 0.2s ease !important;
}

.ll-editor-icon-btn::after,
.ll-editor-save-btn::after,
.ll-editor-primary-btn::after,
.ll-editor-tap-btn::after,
.ll-editor-play-btn::after,
.ll-editor-line-btn::after,
.ll-editor-line::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquid-lyrics-surface-shadow);
}

.ll-editor-icon-btn:hover,
.ll-editor-save-btn:hover,
.ll-editor-primary-btn:hover,
.ll-editor-tap-btn:hover,
.ll-editor-play-btn:hover,
.ll-editor-line-btn:hover,
.ll-editor-mode-btn:hover,
.ll-editor-step-btn:hover {
  transform: scale(1.03);
}

/* Kept last so the press feedback wins over the hover scale while held. */
.ll-editor-icon-btn:active,
.ll-editor-save-btn:active,
.ll-editor-primary-btn:active,
.ll-editor-tap-btn:active,
.ll-editor-play-btn:active,
.ll-editor-line-btn:active,
.ll-editor-mode-btn:active,
.ll-editor-step-btn:active {
  transform: scale(0.96);
}

/* Themed glass shadow on the editor's container surfaces and active segments. */
.ll-editor-hint,
.ll-editor-textarea,
.ll-editor-steps,
.ll-editor-mode-switch,
.ll-editor-sync-bar,
.ll-editor-transport,
.ll-editor-preview-warn,
.ll-editor-step-btn.active,
.ll-editor-mode-btn.active {
  box-shadow: var(--liquid-lyrics-surface-shadow);
}

/* In-editor toast \u2014 Spotify's own notification renders below the overlay. */
.ll-editor-toast {
  position: absolute;
  left: 50%;
  bottom: 108px;
  z-index: 30;
  max-width: min(80vw, 560px);
  padding: 12px 22px;
  border-radius: 14px;
  background: rgba(12, 12, 18, 0.94);
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  box-shadow: var(--liquid-lyrics-surface-shadow);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-50%, 14px, 0);
  transition: opacity 220ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-editor-toast.visible {
  opacity: 1;
  transform: translate3d(-50%, 0, 0);
}

/* Custom discard/delete dialog \u2014 glass surface, 20px radius, no native prompt. */
.ll-editor-confirm {
  position: fixed;
  inset: 0;
  z-index: 2147483500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 6, 10, 0.5);
  opacity: 0;
  transition: opacity 200ms ease;
}

.ll-editor-confirm.visible {
  opacity: 1;
}

.ll-editor-confirm-dialog {
  width: min(420px, 90vw);
  padding: 24px;
  border-radius: 20px;
  background: rgba(20, 20, 26, 0.32);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 30px 80px rgba(0, 0, 0, 0.55);
  outline: var(--glowify-outline, none) !important;
  transform: translateY(10px) scale(0.97);
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.ll-editor-confirm.visible .ll-editor-confirm-dialog {
  transform: translateY(0) scale(1);
}

.ll-editor-confirm-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
}

.ll-editor-confirm-message {
  margin: 0 0 20px;
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.68);
}

.ll-editor-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.ll-editor-confirm-btn {
  padding: 10px 20px;
  border: 0;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 750;
  cursor: pointer;
  box-shadow: var(--liquid-lyrics-surface-shadow);
  transition:
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),
    box-shadow 0.28s ease,
    filter 0.2s ease,
    background 0.2s ease;
}

.ll-editor-confirm-btn:hover {
  transform: scale(1.03);
}

.ll-editor-confirm-btn:active {
  transform: scale(0.96);
}

.ll-editor-confirm-cancel {
  color: rgba(255, 255, 255, 0.82);
  background: rgba(255, 255, 255, 0.08);
}

.ll-editor-confirm-cancel:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
}

.ll-editor-confirm-accept {
  color: #06120a;
  background: var(--accent-color, #1ed760);
}

.ll-editor-confirm-accept.ll-editor-confirm-danger {
  color: #fff;
  background: #e0483f;
}

.ll-hidden {
  display: none !important;
}

@media (max-width: 720px) {
  .ll-editor-shell {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    padding: 16px 14px;
  }

  .ll-editor-header {
    flex-wrap: wrap;
    gap: 10px;
  }

  .ll-editor-song {
    max-width: 180px;
  }

  .ll-editor-sync-bar {
    flex-wrap: wrap;
  }
}
`;function Da(){let e="liquid-lyrics-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=Ha,document.head.appendChild(t)}async function pu(){let e=window;if(e.__liquidLyricsLoaded){console.warn("[Liquid Lyrics] Second instance detected \u2014 skipping initialization.");return}e.__liquidLyricsLoaded=!0,await et(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),Da(),Po(),Xt(),pr(),await et(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),Ca();let t=null,r=null,n="Loading lyrics...",i=0,o=Ua();async function a(){let p=Spicetify.Player.data;if(!p?.item?.uri)return;let w=p.item.uri,E=w.includes(":")?w.split(":")[2]:w;if(E===t){Ln(),J();return}t=E,r=null,n="Loading lyrics...",Ln(),za(n),I()&&be(n),await s(E,p.item)}async function s(p,w){let E=++i,M=await Se({id:p,uri:w.uri,data:{name:w.name}});if(!(E!==i||p!==t)){if(M.status==="success"&&M.data){r=M.data,n="",kn(M.data),I()&&on(M.data);return}r=null,n=M.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",kn(null,n,!0),I()&&be(n,!0)}}Spicetify.Player.addEventListener("songchange",()=>{a()}),window.addEventListener(xr,p=>{let w=Spicetify.Player.data,E=w?.item?.uri;if(!E)return;let M=E.includes(":")?E.split(":")[2]:E,h=p.detail??{};(h.trackUri||h.trackId)&&h.trackUri!==E&&h.trackId!==M||(r=null,s(M,w.item))});let l=()=>{let p=Ua();p!==o&&(o=p,I()&&nr())};setInterval(()=>{l()},250);let d=Spicetify.Platform?.History;typeof d?.listen=="function"&&d.listen(l);let c=I(),u=new MutationObserver(()=>{let p=I();if(Aa(),J(),p&&!c&&t)if(r)on(r);else if(n&&n!=="Loading lyrics...")be(n,!0);else{let w=Spicetify.Player.data;if(w?.item?.uri){let E=w.item.uri.includes(":")?w.item.uri.split(":")[2]:w.item.uri;be("Loading lyrics..."),s(E,w.item)}}c=p}),f=document.getElementById("liquid-lyrics-panel");f&&u.observe(f,{attributes:!0,attributeFilter:["class"]}),J(),a()}pu();function Ua(){let t=Spicetify.Platform?.History?.location??{},r=t.pathname||t.path||t.uri||"";return`${location.href}|${r}`}})();
