// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{var Gs=Object.create;var Cr=Object.defineProperty;var Zs=Object.getOwnPropertyDescriptor;var Xs=Object.getOwnPropertyNames;var Qs=Object.getPrototypeOf,ta=Object.prototype.hasOwnProperty;var O=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ea=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Xs(t))!ta.call(e,n)&&n!==i&&Cr(e,n,{get:()=>t[n],enumerable:!(r=Zs(t,n))||r.enumerable});return e};var Ar=(e,t,i)=>(i=e!=null?Gs(Qs(e)):{},ea(t||!e||!e.__esModule?Cr(i,"default",{value:e,enumerable:!0}):i,e));var pn=O((Zu,Ei)=>{(function(){"use strict";var e="\0",t=0,i=0,r=-1,n=!0,o=!0,s=4,a=4,l=2,d=function(f){f==null&&(f=1024);var g=function(L,E,M){for(var R=E;R<M;R++)L[R]=-R+1;if(0<y.array[y.array.length-1]){for(var P=y.array.length-2;0<y.array[P];)P--;L[E]=-P}},v=function(L,E,M){for(var R=E;R<M;R++)L[R]=-R-1},k=function(L){var E=L*l,M=h(x.signed,x.bytes,E);g(M,x.array.length,E),M.set(x.array),x.array=null,x.array=M;var R=h(y.signed,y.bytes,E);v(R,y.array.length,E),R.set(y.array),y.array=null,y.array=R},b=i+1,x={signed:n,bytes:s,array:h(n,s,f)},y={signed:o,bytes:a,array:h(o,a,f)};return x.array[i]=1,y.array[i]=i,g(x.array,i+1,x.array.length),v(y.array,i+1,y.array.length),{getBaseBuffer:function(){return x.array},getCheckBuffer:function(){return y.array},loadBaseBuffer:function(L){return x.array=L,this},loadCheckBuffer:function(L){return y.array=L,this},size:function(){return Math.max(x.array.length,y.array.length)},getBase:function(L){return x.array.length-1<L?-L+1:x.array[L]},getCheck:function(L){return y.array.length-1<L?-L-1:y.array[L]},setBase:function(L,E){x.array.length-1<L&&k(L),x.array[L]=E},setCheck:function(L,E){y.array.length-1<L&&k(L),y.array[L]=E},setFirstUnusedNode:function(L){b=L},getFirstUnusedNode:function(){return b},shrink:function(){for(var L=this.size()-1;!(0<=y.array[L]);)L--;x.array=x.array.subarray(0,L+2),y.array=y.array.subarray(0,L+2)},calc:function(){for(var L=0,E=y.array.length,M=0;M<E;M++)y.array[M]<0&&L++;return{all:E,unused:L,efficiency:(E-L)/E}},dump:function(){var L="",E="",M;for(M=0;M<x.array.length;M++)L=L+" "+this.getBase(M);for(M=0;M<y.array.length;M++)E=E+" "+this.getCheck(M);return console.log("base:"+L),console.log("chck:"+E),"base:"+L+" chck:"+E}}};function c(f){this.bc=d(f),this.keys=[]}c.prototype.append=function(f,g){return this.keys.push({k:f,v:g}),this},c.prototype.build=function(f,g){if(f==null&&(f=this.keys),f==null)return new u(this.bc);g==null&&(g=!1);var v=f.map(function(k){return{k:w(k.k+e),v:k.v}});return g?this.keys=v:this.keys=v.sort(function(k,b){for(var x=k.k,y=b.k,L=Math.min(x.length,y.length),E=0;E<L;E++)if(x[E]!==y[E])return x[E]-y[E];return x.length-y.length}),v=null,this._build(i,0,0,this.keys.length),new u(this.bc)},c.prototype._build=function(f,g,v,k){var b=this.getChildrenInfo(g,v,k),x=this.findAllocatableBase(b);this.setBC(f,b,x);for(var y=0;y<b.length;y=y+3){var L=b[y];if(L!==t){var E=b[y+1],M=b[y+2],R=x+L;this._build(R,g+1,E,M)}}},c.prototype.getChildrenInfo=function(f,g,v){var k=this.keys[g].k[f],b=0,x=new Int32Array(v*3);x[b++]=k,x[b++]=g;for(var y=g,L=g;y<g+v;y++){var E=this.keys[y].k[f];k!==E&&(x[b++]=y-L,x[b++]=E,x[b++]=y,k=E,L=y)}return x[b++]=y-L,x=x.subarray(0,b),x},c.prototype.setBC=function(f,g,v){var k=this.bc;k.setBase(f,v);var b;for(b=0;b<g.length;b=b+3){var x=g[b],y=v+x,L=-k.getBase(y),E=-k.getCheck(y);y!==k.getFirstUnusedNode()?k.setCheck(L,-E):k.setFirstUnusedNode(E),k.setBase(E,-L);var M=f;if(k.setCheck(y,M),x===t){var R=g[b+1],P=this.keys[R].v;P==null&&(P=0);var ut=-P-1;k.setBase(y,ut)}}},c.prototype.findAllocatableBase=function(f){for(var g=this.bc,v,k=g.getFirstUnusedNode();;){if(v=k-f[0],v<0){k=-g.getCheck(k);continue}for(var b=!0,x=0;x<f.length;x=x+3){var y=f[x],L=v+y;if(!this.isUnusedNode(L)){k=-g.getCheck(k),b=!1;break}}if(b)return v}},c.prototype.isUnusedNode=function(f){var g=this.bc,v=g.getCheck(f);return f===i?!1:v<0};function u(f){this.bc=f,this.bc.shrink()}u.prototype.contain=function(f){var g=this.bc;f+=e;for(var v=w(f),k=i,b=r,x=0;x<v.length;x++){var y=v[x];if(b=this.traverse(k,y),b===r)return!1;if(g.getBase(b)<=0)return!0;k=b}return!1},u.prototype.lookup=function(f){f+=e;for(var g=w(f),v=i,k=r,b=0;b<g.length;b++){var x=g[b];if(k=this.traverse(v,x),k===r)return r;v=k}var y=this.bc.getBase(k);return y<=0?-y-1:r},u.prototype.commonPrefixSearch=function(f){for(var g=w(f),v=i,k=r,b=[],x=0;x<g.length;x++){var y=g[x];if(k=this.traverse(v,y),k!==r){v=k;var L=this.traverse(k,t);if(L!==r){var E=this.bc.getBase(L),M={};E<=0&&(M.v=-E-1),M.k=T(p(g,0,x+1)),b.push(M)}continue}else break}return b},u.prototype.traverse=function(f,g){var v=this.bc.getBase(f)+g;return this.bc.getCheck(v)===f?v:r},u.prototype.size=function(){return this.bc.size()},u.prototype.calc=function(){return this.bc.calc()},u.prototype.dump=function(){return this.bc.dump()};var h=function(f,g,v){if(f)switch(g){case 1:return new Int8Array(v);case 2:return new Int16Array(v);case 4:return new Int32Array(v);default:throw new RangeError("Invalid newArray parameter element_bytes:"+g)}else switch(g){case 1:return new Uint8Array(v);case 2:return new Uint16Array(v);case 4:return new Uint32Array(v);default:throw new RangeError("Invalid newArray parameter element_bytes:"+g)}},p=function(f,g,v){var k=new ArrayBuffer(v),b=new Uint8Array(k,0,v),x=f.subarray(g,v);return b.set(x),b},w=function(f){for(var g=new Uint8Array(new ArrayBuffer(f.length*4)),v=0,k=0;v<f.length;){var b,x=f.charCodeAt(v++);if(x>=55296&&x<=56319){var y=x,L=f.charCodeAt(v++);if(L>=56320&&L<=57343)b=(y-55296)*1024+65536+(L-56320);else return null}else b=x;b<128?g[k++]=b:b<2048?(g[k++]=b>>>6|192,g[k++]=b&63|128):b<65536?(g[k++]=b>>>12|224,g[k++]=b>>6&63|128,g[k++]=b&63|128):b<1<<21&&(g[k++]=b>>>18|240,g[k++]=b>>12&63|128,g[k++]=b>>6&63|128,g[k++]=b&63|128)}return g.subarray(0,k)},T=function(f){for(var g="",v,k,b,x,y,L,E,M=0;M<f.length;)k=f[M++],k<128?v=k:k>>5===6?(b=f[M++],v=(k&31)<<6|b&63):k>>4===14?(b=f[M++],x=f[M++],v=(k&15)<<12|(b&63)<<6|x&63):(b=f[M++],x=f[M++],y=f[M++],v=(k&7)<<18|(b&63)<<12|(x&63)<<6|y&63),v<65536?g+=String.fromCharCode(v):(v-=65536,L=55296|v>>10,E=56320|v&1023,g+=String.fromCharCode(L,E));return g},S={builder:function(f){return new c(f)},load:function(f,g){var v=d(0);return v.loadBaseBuffer(f),v.loadCheckBuffer(g),new u(v)}};typeof Ei>"u"?window.doublearray=S:Ei.exports=S})()});var _e=O((Xu,fn)=>{"use strict";var Ea=function(e){for(var t=new Uint8Array(e.length*4),i=0,r=0;i<e.length;){var n,o=e.charCodeAt(i++);if(o>=55296&&o<=56319){var s=o,a=e.charCodeAt(i++);if(a>=56320&&a<=57343)n=(s-55296)*1024+65536+(a-56320);else return null}else n=o;n<128?t[r++]=n:n<2048?(t[r++]=n>>>6|192,t[r++]=n&63|128):n<65536?(t[r++]=n>>>12|224,t[r++]=n>>6&63|128,t[r++]=n&63|128):n<2097152&&(t[r++]=n>>>18|240,t[r++]=n>>12&63|128,t[r++]=n>>6&63|128,t[r++]=n&63|128)}return t.subarray(0,r)},Sa=function(e){for(var t="",i,r,n,o,s,a,l,d=0;d<e.length;)r=e[d++],r<128?i=r:r>>5===6?(n=e[d++],i=(r&31)<<6|n&63):r>>4===14?(n=e[d++],o=e[d++],i=(r&15)<<12|(n&63)<<6|o&63):(n=e[d++],o=e[d++],s=e[d++],i=(r&7)<<18|(n&63)<<12|(o&63)<<6|s&63),i<65536?t+=String.fromCharCode(i):(i-=65536,a=55296|i>>10,l=56320|i&1023,t+=String.fromCharCode(a,l));return t};function j(e){var t;if(e==null)t=1024*1024;else if(typeof e=="number")t=e;else if(e instanceof Uint8Array){this.buffer=e,this.position=0;return}else throw typeof e+" is invalid parameter type for ByteBuffer constructor";this.buffer=new Uint8Array(t),this.position=0}j.prototype.size=function(){return this.buffer.length};j.prototype.reallocate=function(){var e=new Uint8Array(this.buffer.length*2);e.set(this.buffer),this.buffer=e};j.prototype.shrink=function(){return this.buffer=this.buffer.subarray(0,this.position),this.buffer};j.prototype.put=function(e){this.buffer.length<this.position+1&&this.reallocate(),this.buffer[this.position++]=e};j.prototype.get=function(e){return e==null&&(e=this.position,this.position+=1),this.buffer.length<e+1?0:this.buffer[e]};j.prototype.putShort=function(e){if(65535<e)throw e+" is over short value";var t=255&e,i=(65280&e)>>8;this.put(t),this.put(i)};j.prototype.getShort=function(e){if(e==null&&(e=this.position,this.position+=2),this.buffer.length<e+2)return 0;var t=this.buffer[e],i=this.buffer[e+1],r=(i<<8)+t;return r&32768&&(r=-(r-1^65535)),r};j.prototype.putInt=function(e){if(4294967295<e)throw e+" is over integer value";var t=255&e,i=(65280&e)>>8,r=(16711680&e)>>16,n=(4278190080&e)>>24;this.put(t),this.put(i),this.put(r),this.put(n)};j.prototype.getInt=function(e){if(e==null&&(e=this.position,this.position+=4),this.buffer.length<e+4)return 0;var t=this.buffer[e],i=this.buffer[e+1],r=this.buffer[e+2],n=this.buffer[e+3];return(n<<24)+(r<<16)+(i<<8)+t};j.prototype.readInt=function(){var e=this.position;return this.position+=4,this.getInt(e)};j.prototype.putString=function(e){for(var t=Ea(e),i=0;i<t.length;i++)this.put(t[i]);this.put(0)};j.prototype.getString=function(e){var t=[],i;for(e==null&&(e=this.position);!(this.buffer.length<e+1||(i=this.get(e++),i===0));)t.push(i);return this.position=e,Sa(t)};fn.exports=j});var Si=O((Qu,hn)=>{"use strict";var Ht=_e();function st(){this.dictionary=new Ht(10*1024*1024),this.target_map={},this.pos_buffer=new Ht(10*1024*1024)}st.prototype.buildDictionary=function(e){for(var t={},i=0;i<e.length;i++){var r=e[i];if(!(r.length<4)){var n=r[0],o=r[1],s=r[2],a=r[3],l=r.slice(4).join(",");(!isFinite(o)||!isFinite(s)||!isFinite(a))&&console.log(r);var d=this.put(o,s,a,n,l);t[d]=n}}return this.dictionary.shrink(),this.pos_buffer.shrink(),t};st.prototype.put=function(e,t,i,r,n){var o=this.dictionary.position,s=this.pos_buffer.position;return this.dictionary.putShort(e),this.dictionary.putShort(t),this.dictionary.putShort(i),this.dictionary.putInt(s),this.pos_buffer.putString(r+","+n),o};st.prototype.addMapping=function(e,t){var i=this.target_map[e];i==null&&(i=[]),i.push(t),this.target_map[e]=i};st.prototype.targetMapToBuffer=function(){var e=new Ht,t=Object.keys(this.target_map).length;e.putInt(t);for(var i in this.target_map){var r=this.target_map[i],n=r.length;e.putInt(parseInt(i)),e.putInt(n);for(var o=0;o<r.length;o++)e.putInt(r[o])}return e.shrink()};st.prototype.loadDictionary=function(e){return this.dictionary=new Ht(e),this};st.prototype.loadPosVector=function(e){return this.pos_buffer=new Ht(e),this};st.prototype.loadTargetMap=function(e){var t=new Ht(e);for(t.position=0,this.target_map={},t.readInt();!(t.buffer.length<t.position+1);)for(var i=t.readInt(),r=t.readInt(),n=0;n<r;n++){var o=t.readInt();this.addMapping(i,o)}return this};st.prototype.getFeatures=function(e){var t=parseInt(e);if(isNaN(t))return"";var i=this.dictionary.getInt(t+6);return this.pos_buffer.getString(i)};hn.exports=st});var gn=O((tp,mn)=>{"use strict";function qe(e,t){this.forward_dimension=e,this.backward_dimension=t,this.buffer=new Int16Array(e*t+2),this.buffer[0]=e,this.buffer[1]=t}qe.prototype.put=function(e,t,i){var r=e*this.backward_dimension+t+2;if(this.buffer.length<r+1)throw"ConnectionCosts buffer overflow";this.buffer[r]=i};qe.prototype.get=function(e,t){var i=e*this.backward_dimension+t+2;if(this.buffer.length<i+1)throw"ConnectionCosts buffer overflow";return this.buffer[i]};qe.prototype.loadConnectionCosts=function(e){this.forward_dimension=e[0],this.backward_dimension=e[1],this.buffer=e};mn.exports=qe});var Mi=O((ep,yn)=>{"use strict";function Ma(e,t,i,r,n){this.class_id=e,this.class_name=t,this.is_always_invoke=i,this.is_grouping=r,this.max_length=n}yn.exports=Ma});var xn=O((ip,vn)=>{"use strict";var bn=_e(),Ca=Mi();function Ct(){this.map=[],this.lookup_table={}}Ct.load=function(e){for(var t=new Ct,i=[],r=new bn(e);r.position+1<r.size();){var n=i.length,o=r.get(),s=r.get(),a=r.getInt(),l=r.getString();i.push(new Ca(n,l,o,s,a))}return t.init(i),t};Ct.prototype.init=function(e){if(e!=null)for(var t=0;t<e.length;t++){var i=e[t];this.map[t]=i,this.lookup_table[i.class_name]=t}};Ct.prototype.getCharacterClass=function(e){return this.map[e]};Ct.prototype.lookup=function(e){var t=this.lookup_table[e];return t??null};Ct.prototype.toBuffer=function(){for(var e=new bn,t=0;t<this.map.length;t++){var i=this.map[t];e.put(i.is_always_invoke),e.put(i.is_grouping),e.putInt(i.max_length),e.putString(i.class_name)}return e.shrink(),e.buffer};vn.exports=Ct});var Ci=O((rp,wn)=>{"use strict";function At(e){this.str=e,this.index_mapping=[];for(var t=0;t<e.length;t++){var i=e.charAt(t);this.index_mapping.push(t),At.isSurrogatePair(i)&&t++}this.length=this.index_mapping.length}At.prototype.slice=function(e){if(this.index_mapping.length<=e)return"";var t=this.index_mapping[e];return this.str.slice(t)};At.prototype.charAt=function(e){if(this.str.length<=e)return"";var t=this.index_mapping[e],i=this.index_mapping[e+1];return i==null?this.str.slice(t):this.str.slice(t,i)};At.prototype.charCodeAt=function(e){if(this.index_mapping.length<=e)return NaN;var t=this.index_mapping[e],i=this.str.charCodeAt(t),r;return i>=55296&&i<=56319&&t<this.str.length&&(r=this.str.charCodeAt(t+1),r>=56320&&r<=57343)?(i-55296)*1024+r-56320+65536:i};At.prototype.toString=function(){return this.str};At.isSurrogatePair=function(e){var t=e.charCodeAt(0);return t>=55296&&t<=56319};wn.exports=At});var Ln=O((np,kn)=>{"use strict";var Aa=xn(),Ra=Mi(),Ia=Ci(),Ai="DEFAULT";function at(){this.character_category_map=new Uint8Array(65536),this.compatible_category_map=new Uint32Array(65536),this.invoke_definition_map=null}at.load=function(e,t,i){var r=new at;return r.character_category_map=e,r.compatible_category_map=t,r.invoke_definition_map=Aa.load(i),r};at.parseCharCategory=function(e,t){var i=t[1],r=parseInt(t[2]),n=parseInt(t[3]),o=parseInt(t[4]);if(!isFinite(r)||r!==0&&r!==1)return console.log("char.def parse error. INVOKE is 0 or 1 in:"+r),null;if(!isFinite(n)||n!==0&&n!==1)return console.log("char.def parse error. GROUP is 0 or 1 in:"+n),null;if(!isFinite(o)||o<0)return console.log("char.def parse error. LENGTH is 1 to n:"+o),null;var s=r===1,a=n===1;return new Ra(e,i,s,a,o)};at.parseCategoryMapping=function(e){var t=parseInt(e[1]),i=e[2],r=3<e.length?e.slice(3):[];return(!isFinite(t)||t<0||t>65535)&&console.log("char.def parse error. CODE is invalid:"+t),{start:t,default:i,compatible:r}};at.parseRangeCategoryMapping=function(e){var t=parseInt(e[1]),i=parseInt(e[2]),r=e[3],n=4<e.length?e.slice(4):[];return(!isFinite(t)||t<0||t>65535)&&console.log("char.def parse error. CODE is invalid:"+t),(!isFinite(i)||i<0||i>65535)&&console.log("char.def parse error. CODE is invalid:"+i),{start:t,end:i,default:r,compatible:n}};at.prototype.initCategoryMappings=function(e){var t;if(e!=null)for(var i=0;i<e.length;i++){var r=e[i],n=r.end||r.start;for(t=r.start;t<=n;t++){this.character_category_map[t]=this.invoke_definition_map.lookup(r.default);for(var o=0;o<r.compatible.length;o++){var s=this.compatible_category_map[t],a=r.compatible[o];if(a!=null){var l=this.invoke_definition_map.lookup(a);if(l!=null){var d=1<<l;s=s|d,this.compatible_category_map[t]=s}}}}}var c=this.invoke_definition_map.lookup(Ai);if(c!=null)for(t=0;t<this.character_category_map.length;t++)this.character_category_map[t]===0&&(this.character_category_map[t]=1<<c)};at.prototype.lookupCompatibleCategory=function(e){var t=[],i=e.charCodeAt(0),r;if(i<this.compatible_category_map.length&&(r=this.compatible_category_map[i]),r==null||r===0)return t;for(var n=0;n<32;n++)if(r<<31-n>>>31===1){var o=this.invoke_definition_map.getCharacterClass(n);if(o==null)continue;t.push(o)}return t};at.prototype.lookup=function(e){var t,i=e.charCodeAt(0);return Ia.isSurrogatePair(e)?t=this.invoke_definition_map.lookup(Ai):i<this.character_category_map.length&&(t=this.character_category_map[i]),t==null&&(t=this.invoke_definition_map.lookup(Ai)),this.invoke_definition_map.getCharacterClass(t)};kn.exports=at});var Sn=O((op,En)=>{"use strict";var _a=Si(),qa=Ln(),Tn=_e();function Dt(){this.dictionary=new Tn(10*1024*1024),this.target_map={},this.pos_buffer=new Tn(10*1024*1024),this.character_definition=null}Dt.prototype=Object.create(_a.prototype);Dt.prototype.characterDefinition=function(e){return this.character_definition=e,this};Dt.prototype.lookup=function(e){return this.character_definition.lookup(e)};Dt.prototype.lookupCompatibleCategory=function(e){return this.character_definition.lookupCompatibleCategory(e)};Dt.prototype.loadUnknownDictionaries=function(e,t,i,r,n,o){this.loadDictionary(e),this.loadPosVector(t),this.loadTargetMap(i),this.character_definition=qa.load(r,n,o)};En.exports=Dt});var An=O((sp,Cn)=>{"use strict";var Mn=pn(),Na=Si(),Pa=gn(),Oa=Sn();function ne(e,t,i,r){e!=null?this.trie=e:this.trie=Mn.builder(0).build([{k:"",v:1}]),t!=null?this.token_info_dictionary=t:this.token_info_dictionary=new Na,i!=null?this.connection_costs=i:this.connection_costs=new Pa(0,0),r!=null?this.unknown_dictionary=r:this.unknown_dictionary=new Oa}ne.prototype.loadTrie=function(e,t){return this.trie=Mn.load(e,t),this};ne.prototype.loadTokenInfoDictionaries=function(e,t,i){return this.token_info_dictionary.loadDictionary(e),this.token_info_dictionary.loadPosVector(t),this.token_info_dictionary.loadTargetMap(i),this};ne.prototype.loadConnectionCosts=function(e){return this.connection_costs.loadConnectionCosts(e),this};ne.prototype.loadUnknownDictionaries=function(e,t,i,r,n,o){return this.unknown_dictionary.loadUnknownDictionaries(e,t,i,r,n,o),this};Cn.exports=ne});var Ri=O((ap,Rn)=>{"use strict";function za(e,t,i,r,n,o,s,a){this.name=e,this.cost=t,this.start_pos=i,this.length=r,this.left_id=o,this.right_id=s,this.prev=null,this.surface_form=a,n==="BOS"?this.shortest_cost=0:this.shortest_cost=Number.MAX_VALUE,this.type=n}Rn.exports=za});var qn=O((lp,_n)=>{"use strict";var In=Ri();function Ii(){this.nodes_end_at=[],this.nodes_end_at[0]=[new In(-1,0,0,0,"BOS",0,0,"")],this.eos_pos=1}Ii.prototype.append=function(e){var t=e.start_pos+e.length-1;this.eos_pos<t&&(this.eos_pos=t);var i=this.nodes_end_at[t];i==null&&(i=[]),i.push(e),this.nodes_end_at[t]=i};Ii.prototype.appendEos=function(){var e=this.nodes_end_at.length;this.eos_pos++,this.nodes_end_at[e]=[new In(-1,0,this.eos_pos,0,"EOS",0,0,"")]};_n.exports=Ii});var zn=O((cp,On)=>{"use strict";var Nn=Ri(),Ba=qn(),_i=Ci();function Pn(e){this.trie=e.trie,this.token_info_dictionary=e.token_info_dictionary,this.unknown_dictionary=e.unknown_dictionary}Pn.prototype.build=function(e){for(var t=new Ba,i=new _i(e),r,n,o,s,a,l=0;l<i.length;l++){for(var d=i.slice(l),c=this.trie.commonPrefixSearch(d),u=0;u<c.length;u++){n=c[u].v,r=c[u].k;for(var h=this.token_info_dictionary.target_map[n],p=0;p<h.length;p++){var w=parseInt(h[p]);o=this.token_info_dictionary.dictionary.getShort(w),s=this.token_info_dictionary.dictionary.getShort(w+2),a=this.token_info_dictionary.dictionary.getShort(w+4),t.append(new Nn(w,a,l+1,r.length,"KNOWN",o,s,r))}}var T=new _i(d),S=new _i(T.charAt(0)),f=this.unknown_dictionary.lookup(S.toString());if(c==null||c.length===0||f.is_always_invoke===1){if(r=S,f.is_grouping===1&&1<T.length)for(var g=1;g<T.length;g++){var v=T.charAt(g),k=this.unknown_dictionary.lookup(v);if(f.class_name!==k.class_name)break;r+=v}for(var b=this.unknown_dictionary.target_map[f.class_id],x=0;x<b.length;x++){var y=parseInt(b[x]);o=this.unknown_dictionary.dictionary.getShort(y),s=this.unknown_dictionary.dictionary.getShort(y+2),a=this.unknown_dictionary.dictionary.getShort(y+4),t.append(new Nn(y,a,l+1,r.length,"UNKNOWN",o,s,r.toString()))}}}return t.appendEos(),t};On.exports=Pn});var Hn=O((dp,Bn)=>{"use strict";function Ne(e){this.connection_costs=e}Ne.prototype.search=function(e){return e=this.forward(e),this.backward(e)};Ne.prototype.forward=function(e){var t,i,r;for(t=1;t<=e.eos_pos;t++){var n=e.nodes_end_at[t];if(n!=null)for(i=0;i<n.length;i++){var o=n[i],s=Number.MAX_VALUE,a,l=e.nodes_end_at[o.start_pos-1];if(l!=null){for(r=0;r<l.length;r++){var d=l[r],c;o.left_id==null||d.right_id==null?(console.log("Left or right is null"),c=0):c=this.connection_costs.get(d.right_id,o.left_id);var u=d.shortest_cost+c+o.cost;u<s&&(a=d,s=u)}o.prev=a,o.shortest_cost=s}}}return e};Ne.prototype.backward=function(e){var t=[],i=e.nodes_end_at[e.nodes_end_at.length-1][0],r=i.prev;if(r==null)return[];for(;r.type!=="BOS";){if(t.push(r),r.prev==null)return[];r=r.prev}return t.reverse()};Bn.exports=Ne});var Un=O((up,Dn)=>{"use strict";function qi(){}qi.prototype.formatEntry=function(e,t,i,r){var n={};return n.word_id=e,n.word_type=i,n.word_position=t,n.surface_form=r[0],n.pos=r[1],n.pos_detail_1=r[2],n.pos_detail_2=r[3],n.pos_detail_3=r[4],n.conjugated_type=r[5],n.conjugated_form=r[6],n.basic_form=r[7],n.reading=r[8],n.pronunciation=r[9],n};qi.prototype.formatUnknownEntry=function(e,t,i,r,n){var o={};return o.word_id=e,o.word_type=i,o.word_position=t,o.surface_form=n,o.pos=r[1],o.pos_detail_1=r[2],o.pos_detail_2=r[3],o.pos_detail_3=r[4],o.conjugated_type=r[5],o.conjugated_form=r[6],o.basic_form=r[7],o};Dn.exports=qi});var jn=O((pp,Fn)=>{"use strict";var Ha=zn(),Da=Hn(),Ua=Un(),Fa=/、|。/;function Ut(e){this.token_info_dictionary=e.token_info_dictionary,this.unknown_dictionary=e.unknown_dictionary,this.viterbi_builder=new Ha(e),this.viterbi_searcher=new Da(e.connection_costs),this.formatter=new Ua}Ut.splitByPunctuation=function(e){for(var t=[],i=e;i!=="";){var r=i.search(Fa);if(r<0){t.push(i);break}t.push(i.substring(0,r+1)),i=i.substring(r+1)}return t};Ut.prototype.tokenize=function(e){for(var t=Ut.splitByPunctuation(e),i=[],r=0;r<t.length;r++){var n=t[r];this.tokenizeForSentence(n,i)}return i};Ut.prototype.tokenizeForSentence=function(e,t){t==null&&(t=[]);var i=this.getLattice(e),r=this.viterbi_searcher.search(i),n=0;t.length>0&&(n=t[t.length-1].word_position);for(var o=0;o<r.length;o++){var s=r[o],a,l,d;s.type==="KNOWN"?(d=this.token_info_dictionary.getFeatures(s.name),d==null?l=[]:l=d.split(","),a=this.formatter.formatEntry(s.name,n+s.start_pos,s.type,l)):s.type==="UNKNOWN"?(d=this.unknown_dictionary.getFeatures(s.name),d==null?l=[]:l=d.split(","),a=this.formatter.formatUnknownEntry(s.name,n+s.start_pos,s.type,l,s.surface_form)):a=this.formatter.formatEntry(s.name,n+s.start_pos,s.type,[]),t.push(a)}return t};Ut.prototype.getLattice=function(e){return this.viterbi_builder.build(e)};Fn.exports=Ut});function pt(e,t=1e4){return new Promise((i,r)=>{let n=Date.now(),o=setInterval(()=>{let s=e();s?(clearInterval(o),i(s)):Date.now()-n>t&&(clearInterval(o),r(new Error("wait() timed out")))},100)})}var gi="6.2.2",Rr=["community","spicy","spotify"];async function yi({id:e}){try{let t=e.includes(":")?e.split(":")[2]:e,i="https://spclient.wg.spotify.com/color-lyrics/v2/track/",r;try{r=await(await pt(()=>Spicetify.CosmosAsync?.get))(`${i}${t}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let n=r?.lyrics;if(!n)return{status:"missing_lyrics",data:null};let o=n.lines,s;if(n.syncType==="LINE_SYNCED"){let a=o.map((l,d)=>{let c=Number(l.startTimeMs)||0,u=d<o.length-1?Number(o[d+1].startTimeMs):c+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:c,EndTime:u,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:c,EndTime:u,OppositeAligned:!1,IsRTL:!1}});s={Id:t,Type:"Line",SongWriters:[],Content:a,StartTime:a.length>0?a[0].StartTime:0,EndTime:a.length>0?a[a.length-1].EndTime:0,Provider:"spotify"}}else s={Id:t,Type:"Static",SongWriters:[],Lines:o.map(a=>({Text:a.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:s}}catch(t){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:t instanceof Error?t.message:String(t)}}}}var _r="https://api.spicylyrics.org",ee=null,Ir=null;async function ia(){return ee||(Ir??(Ir=(async()=>{try{let e=await fetch(`${_r}/version`);if(e.ok){let t=(await e.text()).trim();/^\d+\.\d+\.\d+$/.test(t)&&(ee=t)}}catch{}ee??(ee=gi)})()),await Ir,ee??gi)}async function qr(e,t){let i=await ia(),r=await fetch(`${_r}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":i,"X-mode":"2",...t&&{"SpicyLyrics-WebAuth":t}},body:JSON.stringify({queries:e,client:{version:i}})});if(!r.ok)throw new Error(`Spicy request failed with status ${r.status}`);return r.json()}var ft={depth:512,arrayLength:1048576,objectKeys:65536,streamLength:16777216,valuesLength:4194304,decodeOps:4194304},ra=new Set(["__proto__","constructor","prototype"]);function Nr(e){return Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1])}function Pr(e){let t=e[0],i=e[1];if(t.length>ft.valuesLength)throw new Error("SLObjPack: valuesList exceeds limit");if(i.length>ft.streamLength)throw new Error("SLObjPack: stream exceeds limit");for(let p=0;p<t.length;p++){let w=t[p];if(w===null)continue;let T=typeof w;if(!(T==="string"||T==="boolean")&&!(T==="number"&&Number.isFinite(w)))throw new Error(`SLObjPack: invalid value at ${p}`)}let r=t,n=0,o=()=>{if(n>=i.length)throw new Error("SLObjPack: unexpected end of stream");return i[n++]},s=p=>{if(typeof p!="number"||!Number.isInteger(p)||p<0||p>=r.length)throw new Error(`SLObjPack: invalid value pointer ${p}`);return r[p]},a=()=>{let p=s(o());if(typeof p!="string")throw new Error("SLObjPack: keys must be strings");if(ra.has(p))throw new Error(`SLObjPack: forbidden key ${p}`);return p},l=(p,w,T)=>{Object.defineProperty(p,w,{value:T,writable:!0,enumerable:!0,configurable:!0})},d=(p,w,T)=>{if(typeof p!="number"||!Number.isInteger(p)||p<0||p>w)throw new Error(`SLObjPack: invalid ${T} count ${p}`);return p},c=(p,w)=>{if(p>i.length-n)throw new Error(`SLObjPack: ${w} exceeds remaining stream`)},u=p=>{if(p>ft.depth)throw new Error("SLObjPack: max depth exceeded");let w=o();if(typeof w!="number"||!Number.isInteger(w))throw new Error(`SLObjPack: invalid opcode ${w}`);if(w>=0)return s(w);switch(w){case-1:{let T=d(o(),ft.objectKeys,"object key");c(T*2,"object");let S=new Array(T);for(let g=0;g<T;g++)S[g]=a();let f={};for(let g=0;g<T;g++)l(f,S[g],u(p+1));return f}case-2:{let T=d(o(),ft.arrayLength,"array item");c(T,"array");let S=new Array(T);for(let f=0;f<T;f++)S[f]=u(p+1);return S}case-3:{let T=d(o(),ft.arrayLength,"schema array item"),S=d(o(),ft.objectKeys,"schema key");if(T*S>ft.decodeOps)throw new Error("SLObjPack: schema array budget exceeded");c(S+T*S,"schema array");let f=new Array(S);for(let v=0;v<S;v++)f[v]=a();let g=new Array(T);for(let v=0;v<T;v++){let k={};for(let b=0;b<S;b++)l(k,f[b],u(p+1));g[v]=k}return g}case-4:return[];case-5:return[u(p+1)];case-6:return{};default:throw new Error(`SLObjPack: unknown opcode ${w}`)}},h=u(0);if(n!==i.length)throw new Error("SLObjPack: extra data after decoding");return h}var Et,ie;async function Or(){return Et&&Et.expiresAtTime-Date.now()>2e3?Et.accessToken:ie||(ie=(async()=>{let e=await pt(()=>Spicetify.CosmosAsync),t=await pt(()=>Spicetify.Platform);try{Et=await e.get("sp://oauth/v2/token")}catch(i){i.message?.includes("Resolver not found")&&t.Session&&(Et={accessToken:t.Session.accessToken,expiresAtTime:t.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{ie=void 0}if(!Et)throw new Error("Could not retrieve Spotify Access Token");return Et.accessToken})(),ie)}async function Br({id:e}){try{let t=await na(e),i=la(t);if(!t||!i)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let r=aa(i.result);if(r.status==="missing_lyrics")return{status:"missing_lyrics",data:null,queued:r.queued};if(r.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:r.message}};let n=r.data;return n.Provider="spicy",oa(n),sa(n),{status:"success",data:n}}catch(t){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:t instanceof Error?t.message:String(t)}}}}async function na(e){let i=`Bearer ${await Or()}`;return await qr([{operation:"lyrics",variables:{id:e,auth:"SpicyLyrics-WebAuth"}}],i)}function oa(e){if(e.Type==="Static")return;let t=i=>Math.round(Number(i||0)*1e3);if(e.StartTime=t(e.StartTime),e.EndTime=t(e.EndTime),e.Type==="Syllable")for(let i of e.Content){if(i.Lead){i.Lead.StartTime=t(i.Lead.StartTime),i.Lead.EndTime=t(i.Lead.EndTime);for(let r of i.Lead.Syllables)r.StartTime=t(r.StartTime),r.EndTime=t(r.EndTime)}if(i.Background)for(let r of i.Background){r.StartTime=t(r.StartTime),r.EndTime=t(r.EndTime);for(let n of r.Syllables)n.StartTime=t(n.StartTime),n.EndTime=t(n.EndTime)}}else if(e.Type==="Line")for(let i of e.Content)i.StartTime=t(i.StartTime),i.EndTime=t(i.EndTime)}function sa(e){let t=i=>{!i.RomanizedText&&i.TransliteratedText&&(i.RomanizedText=i.TransliteratedText)};if(e.Type==="Static"){e.Lines?.forEach(t);return}if(e.Type==="Line"){e.Content?.forEach(t);return}for(let i of e.Content??[])i.Lead?.Syllables?.forEach(t),i.Background?.forEach(r=>r.Syllables?.forEach(t))}function aa(e){if(!e||typeof e!="object")return{status:"error",message:"Spicy returned an empty result"};let t=e,i=t.httpStatus,r=t.data??e;if(i===404||bi(r,"MISSING_LYRICS"))return{status:"missing_lyrics"};if(i===503)return{status:"missing_lyrics",queued:!0};if(i&&i!==200)return{status:"error",message:zr(r)};if(bi(r))return{status:"error",message:zr(r)};if(Nr(r))try{r=Pr(r)}catch(n){return{status:"error",message:n instanceof Error?n.message:"Malformed packed payload"}}return ca(r)?{status:"success",data:r}:{status:"error",message:"Unexpected response from Spicy"}}function la(e){let t=e?.queries.flat()??[];return t.find(i=>i?.operation==="lyrics"&&!!i?.result)??t.find(i=>!!i?.result)}function ca(e){if(!e||typeof e!="object"||!("Type"in e))return!1;let t=e.Type;return t==="Syllable"||t==="Line"||t==="Static"}function bi(e,t){if(!e||typeof e!="object"||!("error"in e))return!1;let i=e.error;return typeof i=="string"&&(!t||i===t)}function zr(e){return bi(e)?e.message??e.error:"Unexpected Error from Spicy"}var da="https://lyrics.nmw.it.com",ua="liquid-lyrics-server-url",vi="liquid-lyrics-community-token",Me="liquid-lyrics-community-user",St="liquid-lyrics:community-auth",G=class extends Error{constructor(i,r,n){super(i);this.code=i;this.status=r;this.detail=n;this.name="CommunityError"}};function xi(){return localStorage.getItem(ua)?.trim()||da}function wi(){return localStorage.getItem(vi)}function Mt(){return!!wi()}function nt(){try{let e=localStorage.getItem(Me);return e?JSON.parse(e):null}catch{return null}}function Hr(e,t){localStorage.setItem(vi,e),localStorage.setItem(Me,JSON.stringify(t)),window.dispatchEvent(new Event(St))}function Dr(){localStorage.removeItem(vi),localStorage.removeItem(Me),window.dispatchEvent(new Event(St))}async function et(e,t={}){let i=new Headers(t.headers);i.set("Content-Type","application/json");let r=wi();r&&i.set("Authorization",`Bearer ${r}`);let n;try{n=await fetch(`${xi()}${e}`,{...t,headers:i})}catch(s){throw new G("network_error",void 0,s)}let o=await n.json().catch(()=>({}));return n.status===401&&Dr(),{res:n,body:o}}async function Ur(e,t){let{res:i,body:r}=await et("/api/auth/register",{method:"POST",body:JSON.stringify({username:e,password:t})});if(!i.ok)throw new G(r?.error??"request_failed",i.status,r?.detail);return Hr(r.token,r.user),r.user}async function Fr(e,t){let{res:i,body:r}=await et("/api/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})});if(!i.ok)throw new G(r?.error??"request_failed",i.status,r?.detail);return Hr(r.token,r.user),r.user}async function jr(){try{await et("/api/auth/logout",{method:"POST"})}catch{}Dr()}async function Vr(){if(!wi())return null;try{let{res:e,body:t}=await et("/api/auth/me",{method:"GET"});return e.status===401?null:e.ok&&t?.user?(localStorage.setItem(Me,JSON.stringify(t.user)),t.user):nt()}catch{return nt()}}async function Wr(e){let{res:t,body:i}=await et("/api/syncs",{method:"POST",body:JSON.stringify(e)});if(!t.ok)throw new G(i?.error??"request_failed",t.status,i?.detail);return i.sync}async function Kr(){let{res:e,body:t}=await et("/api/me/syncs",{method:"GET"});if(!e.ok)throw new G(t?.error??"request_failed",e.status);return t.syncs??[]}function ki(){let e=nt()?.role;return e==="admin"||e==="moderator"}async function $r(e,t){let{res:i,body:r}=await et(`/api/syncs/${encodeURIComponent(e)}/report`,{method:"POST",body:JSON.stringify({reason:t})});if(!i.ok)throw new G(r?.error??"request_failed",i.status,r?.detail)}async function Jr(e){let{res:t,body:i}=await et(`/api/admin/queue?status=pending&trackId=${encodeURIComponent(e)}`,{method:"GET"});if(!t.ok)throw new G(i?.error??"request_failed",t.status);return i.syncs??[]}async function Yr(e){let{res:t,body:i}=await et(`/api/admin/syncs/${encodeURIComponent(e)}/approve`,{method:"POST"});if(!t.ok)throw new G(i?.error??"request_failed",t.status)}async function Gr(e,t){let{res:i,body:r}=await et(`/api/admin/syncs/${encodeURIComponent(e)}/reject`,{method:"POST",body:t?JSON.stringify({note:t}):void 0});if(!i.ok)throw new G(r?.error??"request_failed",i.status)}function it(e){switch(e instanceof G?e.code:"request_failed"){case"network_error":return"Couldn't reach the community server.";case"unauthorized":return"Please sign in again.";case"forbidden":return"You don't have permission for that.";case"banned":return"Your account is banned.";case"ip_banned":return"Uploads from your network are blocked.";case"too_many_signups_from_ip":return"Too many accounts from your network - try again later.";case"username_taken":return"That username is already taken.";case"invalid_credentials":return"Wrong username or password.";case"invalid_input":return"Check the username (3-32 chars) and password (min 8).";case"unsafe_payload":return"This sync is too large or malformed to upload.";case"local_track":return"Local files can't be published - save the sync on this device instead.";case"invalid_track":return"Only Spotify tracks can be published.";default:return"Something went wrong. Please try again."}}var pa=6e3;async function Zr({id:e}){try{let t=e.includes(":")?e.split(":")[2]:e;if(!t)return{status:"missing_lyrics",data:null};let i=new AbortController,r=setTimeout(()=>i.abort(),pa),n;try{n=await fetch(`${xi()}/api/syncs/${encodeURIComponent(t)}`,{signal:i.signal})}catch(a){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:a instanceof Error?a.message:"Community request failed"}}}finally{clearTimeout(r)}if(n.status===404)return{status:"missing_lyrics",data:null};if(!n.ok)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:`Community ${n.status}`}};let o=await n.json().catch(()=>null),s=o?.sync?.lyrics;return!s||!s.Type?{status:"missing_lyrics",data:null}:(s.Provider="community",s.LiquidLyricsCommunitySyncId=String(o.sync.id??""),s.LiquidLyricsCommunityUploader=String(o.sync.uploader??""),{status:"success",data:s})}catch(t){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:t instanceof Error?t.message:String(t)}}}}var Ce="liquid-lyrics-custom-sync:",Xr="liquid-lyrics-custom-sync-index",Li="liquid-lyrics:custom-sync-changed";function Bt(e){let t=String(e??"");return t.includes(":")?t.split(":")[2]??t:t}function zt(e){return String(e??"").trim()}function re(e){let t=zt(e);if(!t)return null;try{let i=localStorage.getItem(Ce+t);if(!i)return null;let r=JSON.parse(i);return an(r)?r:null}catch{return null}}function Qr(e){let t=zt(e);return!!t&&localStorage.getItem(Ce+t)!=null}function tn(e){let t=zt(e.trackUri||e.trackId);if(!t)return;let i={...e,version:1,updatedAt:Date.now()};try{localStorage.setItem(Ce+t,JSON.stringify(i)),fa(t,i),sn(i)}catch(r){throw console.error("[Liquid Lyrics] Could not save custom sync",r),r}}function en(e){let t=zt(e);if(!t)return;let i=re(t);localStorage.removeItem(Ce+t),on(nn().filter(r=>zt(r.trackUri||r.trackId)!==t)),sn(i??{trackUri:t,trackId:Bt(t)})}function rn(e,t){let i=JSON.parse(e);if(!an(i))throw new Error("Invalid or incomplete sync file");if(t){let r=String(t),n=Bt(r);i.trackUri=r,i.trackId=n,i.draft={...i.draft,trackId:n,trackUri:r},i.lyrics={...i.lyrics,Id:n}}return i}function nn(){try{let e=localStorage.getItem(Xr),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function on(e){try{localStorage.setItem(Xr,JSON.stringify(e))}catch(t){console.error("[Liquid Lyrics] Could not update sync index",t)}}function fa(e,t){let i={trackId:t.trackId,trackUri:t.trackUri||t.trackId,title:t.title,artist:t.artist,mode:t.mode,updatedAt:t.updatedAt},r=nn().filter(n=>zt(n.trackUri||n.trackId)!==e);r.push(i),on(r)}function sn(e){window.dispatchEvent(new CustomEvent(Li,{detail:{trackUri:e.trackUri,trackId:e.trackId}}))}function an(e){if(!e||typeof e!="object")return!1;let t=e;return typeof t.trackId=="string"&&(t.mode==="line"||t.mode==="word")&&!!t.lyrics&&!!t.draft}var ha={community:{id:"community",fetch:Zr},spotify:{id:"spotify",fetch:yi},spicy:{id:"spicy",fetch:Br}},Ti=new Map;async function Ae(e){let t=e.id,i=re(e.uri??e.id);if(i)return{status:"success",data:i.lyrics};if(!e.forceRefresh&&Ti.has(t))return{status:"success",data:Ti.get(t)};let r=!1,n=!1;for(let o of Rr){let s=ha[o];if(!s)continue;let a=await s.fetch(e);if(a.status==="success"&&a.data){if(!ma(a.data)){r=!0;continue}let l=o==="spicy"?await ga(e,a.data):a.data;return n||Ti.set(t,l),{...a,data:l}}if(a.status==="missing_lyrics"){r=!0,a.queued&&(n=!0);continue}}return r?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}function ma(e){return e.Type==="Static"?(e.Lines??[]).some(t=>String(t.Text??"").trim().length>0):(e.Content??[]).length>0}async function ga(e,t){if(t.Type!=="Syllable"&&t.Type!=="Line")return t;try{let i=await yi(e);if(i.status!=="success"||!i.data)return t;let r=ya(i.data);if(r.length===0||t.Type==="Line")return t;t.Content.forEach(n=>{let o=n.Lead,s=ba(r,o?.StartTime??0,o?.EndTime??0);s&&(n.LiquidLyricsOriginalText=s.text,o&&(o.LiquidLyricsOriginalText=s.text))})}catch{return t}return t}function ya(e){return e.Type!=="Line"?[]:e.Content.filter(t=>t.Type!=="Interlude").map(t=>({text:va(t.Text),start:Number(t.StartTime)||0,end:Number(t.EndTime)||0})).filter(t=>t.text&&!t.text.includes("\u266A")&&!t.text.includes("\xE2\u2122\xAA"))}function ba(e,t,i){let r=Number(t)||0,n=Number(i)||r,o=(r+n)/2,s=null,a=Number.POSITIVE_INFINITY;for(let l of e){let d=(l.start+l.end)/2,c=Math.abs(l.start-r),u=Math.abs(d-o),h=c*.75+u*.25;h<a&&(s=l,a=h)}return s&&a<=3500?s:null}function va(e){return String(e??"").replace(/\s+/g," ").trim()}var xa="liquid-lyrics-mode",ln="liquid-lyrics-romanization";var Ju=localStorage.getItem(xa)||"romanization",cn="liquid-lyrics-romanization-display",dn=(()=>{let e=localStorage.getItem(cn);return e==="off"||e==="romaji"||e==="furigana"?e:localStorage.getItem(ln)==="true"?"romaji":"off"})();function U(){return dn}function Re(e){dn=e,localStorage.setItem(cn,e),localStorage.setItem(ln,String(e!=="off"))}var Ie="liquid-lyrics-tooltip";function q(e,t){e.dataset.tooltip=t;let i=()=>wa(e,e.dataset.tooltip||t);e.addEventListener("pointerenter",i),e.addEventListener("focus",i),e.addEventListener("pointerleave",ot),e.addEventListener("blur",ot),e.addEventListener("click",()=>window.setTimeout(()=>un(e),0))}function wa(e,t){if(e.hasAttribute("disabled")||e.hidden)return;let i=ka(e);i.textContent=t,i.classList.add("visible"),un(e)}function ot(){document.getElementById(Ie)?.classList.remove("visible")}function ka(e){let t=La(e),i=document.getElementById(Ie);return i||(i=document.createElement("div"),i.id=Ie,i.className="liquid-lyrics-tooltip"),i.parentElement!==t&&t.appendChild(i),i}function La(e){let t=document.fullscreenElement;return t instanceof HTMLElement&&t.contains(e)?t:document.body}function un(e){let t=document.getElementById(Ie);if(!t?.classList.contains("visible"))return;if(!e.isConnected){ot();return}let i=e.getBoundingClientRect(),r=9,n=t.offsetWidth||80,o=t.offsetHeight||28,s=Math.max(8,i.top-o-r),a=Ta(i.left+i.width/2,n/2+8,window.innerWidth-n/2-8);t.style.left=`${a}px`,t.style.top=`${s}px`}function Ta(e,t,i){return Math.min(i,Math.max(t,e))}var go=Ar(An()),yo=Ar(jn());function jt(e){return e===null?"null":e!==Object(e)?typeof e:{}.toString.call(e).slice(8,-1).toLowerCase()}function Z(e){return jt(e)!=="string"?!0:!e.length}function Vt(e="",t,i){if(Z(e))return!1;let r=e.charCodeAt(0);return t<=r&&r<=i}var Vn={HIRAGANA:"toHiragana",KATAKANA:"toKatakana"},Xn={HEPBURN:"hepburn"},ja={useObsoleteKana:!1,passRomaji:!1,convertLongVowelMark:!0,upcaseKatakana:!1,IMEMode:!1,romanization:Xn.HEPBURN},Va=65,Wa=90,Ka=65345,$a=65370,Ja=65313,Ya=65338,Bi=12353,Ga=12438,Hi=12449,Za=12540,Xa=19968,Qa=40879,tl=12293,el=12540,il=12539,rl=[65296,65305],nl=[Ja,Ya],ol=[Ka,$a],sl=[65281,65295],al=[65306,65311],ll=[65339,65343],cl=[65371,65376],dl=[65504,65518],ul=[12352,12447],pl=[12448,12543],fl=[65382,65439],hl=[12539,12540],Qn=[65377,65381],ml=[12288,12351],gl=[19968,40959],yl=[13312,19903],bl=[ul,pl,Qn,fl],vl=[ml,Qn,hl,sl,al,ll,cl,dl],fp=[...bl,...vl,nl,ol,rl,gl,yl],xl=[0,127],wl=[[256,257],[274,275],[298,299],[332,333],[362,363]],kl=[[8216,8217],[8220,8221]],Ll=[xl,...wl],Tl=[[32,47],[58,63],[91,96],[123,126],...kl];var Wn=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function El(e,t){return!!(e===t||Wn(e)&&Wn(t))}function Sl(e,t){if(e.length!==t.length)return!1;for(var i=0;i<e.length;i++)if(!El(e[i],t[i]))return!1;return!0}function to(e,t){t===void 0&&(t=Sl);var i=null;function r(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(i&&i.lastThis===this&&t(n,i.lastArgs))return i.lastResult;var s=e.apply(this,n);return i={lastResult:s,lastArgs:n,lastThis:this},s}return r.clear=function(){i=null},r}var Kn=Object.prototype.hasOwnProperty;function $n(e,t,i){for(i of e.keys())if(Ft(i,t))return i}function Ft(e,t){var i,r,n;if(e===t)return!0;if(e&&t&&(i=e.constructor)===t.constructor){if(i===Date)return e.getTime()===t.getTime();if(i===RegExp)return e.toString()===t.toString();if(i===Array){if((r=e.length)===t.length)for(;r--&&Ft(e[r],t[r]););return r===-1}if(i===Set){if(e.size!==t.size)return!1;for(r of e)if(n=r,n&&typeof n=="object"&&(n=$n(t,n),!n)||!t.has(n))return!1;return!0}if(i===Map){if(e.size!==t.size)return!1;for(r of e)if(n=r[0],n&&typeof n=="object"&&(n=$n(t,n),!n)||!Ft(r[1],t.get(n)))return!1;return!0}if(i===ArrayBuffer)e=new Uint8Array(e),t=new Uint8Array(t);else if(i===DataView){if((r=e.byteLength)===t.byteLength)for(;r--&&e.getInt8(r)===t.getInt8(r););return r===-1}if(ArrayBuffer.isView(e)){if((r=e.byteLength)===t.byteLength)for(;r--&&e[r]===t[r];);return r===-1}if(!i||typeof e=="object"){r=0;for(i in e)if(Kn.call(e,i)&&++r&&!Kn.call(t,i)||!(i in t)||!Ft(e[i],t[i]))return!1;return Object.keys(t).length===r}}return e!==e&&t!==t}var Di=(e={})=>Object.assign({},ja,e);function eo(e,t,i){let r=t;function n(a,l){if(a[l]!==void 0)return Object.assign({"":a[""]+l},a[l])}function o(a,l){let d=a.charAt(0);return s(Object.assign({"":d},r[d]),a.slice(1),l,l+1)}function s(a,l,d,c){if(!l)return i||Object.keys(a).length===1?a[""]?[[d,c,a[""]]]:[]:[[d,c,null]];if(Object.keys(a).length===1)return[[d,c,a[""]]].concat(o(l,c));let u=n(a,l.charAt(0));return u===void 0?[[d,c,a[""]]].concat(o(l,c)):s(u,l.slice(1),d,c+1)}return o(e,0)}function Ui(e){return Object.entries(e).reduce((t,[i,r])=>{let n=jt(r)==="string";return t[i]=n?{"":r}:Ui(r),t},{})}function io(e,t){return t.split("").reduce((i,r)=>(i[r]===void 0&&(i[r]={}),i[r]),e)}function ro(e={}){let t={};return jt(e)==="object"&&Object.entries(e).forEach(([i,r])=>{let n=t;i.split("").forEach(o=>{n[o]===void 0&&(n[o]={}),n=n[o]}),n[""]=r}),function(r){let n=JSON.parse(JSON.stringify(r));function o(s,a){return s===void 0||jt(s)==="string"?a:Object.entries(a).reduce((l,[d,c])=>(l[d]=o(s[d],c),l),s)}return o(n,t)}}function no(e,t){return t?jt(t)==="function"?t(e):ro(t)(e):e}var Ml={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u304A",k:{a:"\u304B",i:"\u304D",u:"\u304F",e:"\u3051",o:"\u3053"},s:{a:"\u3055",i:"\u3057",u:"\u3059",e:"\u305B",o:"\u305D"},t:{a:"\u305F",i:"\u3061",u:"\u3064",e:"\u3066",o:"\u3068"},n:{a:"\u306A",i:"\u306B",u:"\u306C",e:"\u306D",o:"\u306E"},h:{a:"\u306F",i:"\u3072",u:"\u3075",e:"\u3078",o:"\u307B"},m:{a:"\u307E",i:"\u307F",u:"\u3080",e:"\u3081",o:"\u3082"},y:{a:"\u3084",u:"\u3086",o:"\u3088"},r:{a:"\u3089",i:"\u308A",u:"\u308B",e:"\u308C",o:"\u308D"},w:{a:"\u308F",i:"\u3090",e:"\u3091",o:"\u3092"},g:{a:"\u304C",i:"\u304E",u:"\u3050",e:"\u3052",o:"\u3054"},z:{a:"\u3056",i:"\u3058",u:"\u305A",e:"\u305C",o:"\u305E"},d:{a:"\u3060",i:"\u3062",u:"\u3065",e:"\u3067",o:"\u3069"},b:{a:"\u3070",i:"\u3073",u:"\u3076",e:"\u3079",o:"\u307C"},p:{a:"\u3071",i:"\u3074",u:"\u3077",e:"\u307A",o:"\u307D"},v:{a:"\u3094\u3041",i:"\u3094\u3043",u:"\u3094",e:"\u3094\u3047",o:"\u3094\u3049"}},Cl={".":"\u3002",",":"\u3001",":":"\uFF1A","/":"\u30FB","!":"\uFF01","?":"\uFF1F","~":"\u301C","-":"\u30FC","\u2018":"\u300C","\u2019":"\u300D","\u201C":"\u300E","\u201D":"\u300F","[":"\uFF3B","]":"\uFF3D","(":"\uFF08",")":"\uFF09","{":"\uFF5B","}":"\uFF5D"},Jn={k:"\u304D",s:"\u3057",t:"\u3061",n:"\u306B",h:"\u3072",m:"\u307F",r:"\u308A",g:"\u304E",z:"\u3058",d:"\u3062",b:"\u3073",p:"\u3074",v:"\u3094",q:"\u304F",f:"\u3075"},oo={ya:"\u3083",yi:"\u3043",yu:"\u3085",ye:"\u3047",yo:"\u3087"},so={a:"\u3041",i:"\u3043",u:"\u3045",e:"\u3047",o:"\u3049"},Yn={sh:"sy",ch:"ty",cy:"ty",chy:"ty",shy:"sy",j:"zy",jy:"zy",shi:"si",chi:"ti",tsu:"tu",ji:"zi",fu:"hu"},Al=Object.assign({tu:"\u3063",wa:"\u308E",ka:"\u30F5",ke:"\u30F6"},so,oo),Rl={yi:"\u3044",wu:"\u3046",ye:"\u3044\u3047",wi:"\u3046\u3043",we:"\u3046\u3047",kwa:"\u304F\u3041",whu:"\u3046",tha:"\u3066\u3083",thu:"\u3066\u3085",tho:"\u3066\u3087",dha:"\u3067\u3083",dhu:"\u3067\u3085",dho:"\u3067\u3087"},Il={wh:"\u3046",kw:"\u304F",qw:"\u304F",q:"\u304F",gw:"\u3050",sw:"\u3059",ts:"\u3064",th:"\u3066",tw:"\u3068",dh:"\u3067",dw:"\u3069",fw:"\u3075",f:"\u3075"};function _l(){let e=Ui(Ml),t=n=>io(e,n);Object.entries(Jn).forEach(([n,o])=>{Object.entries(oo).forEach(([s,a])=>{t(n+s)[""]=o+a})}),Object.entries(Cl).forEach(([n,o])=>{t(n)[""]=o}),Object.entries(Il).forEach(([n,o])=>{Object.entries(so).forEach(([s,a])=>{let l=t(n+s);l[""]=o+a})}),["n","n'","xn"].forEach(n=>{t(n)[""]="\u3093"}),e.c=JSON.parse(JSON.stringify(e.k)),Object.entries(Yn).forEach(([n,o])=>{let s=n.slice(0,n.length-1),a=n.charAt(n.length-1),l=t(s);l[a]=JSON.parse(JSON.stringify(t(o)))});function i(n){return[...Object.entries(Yn),["c","k"]].reduce((o,[s,a])=>n.startsWith(a)?o.concat(n.replace(a,s)):o,[])}Object.entries(Al).forEach(([n,o])=>{let s=u=>u.charAt(u.length-1),a=u=>u.slice(0,u.length-1),l=`x${n}`,d=t(l);d[""]=o;let c=t(`l${a(n)}`);c[s(n)]=d,i(n).forEach(u=>{["l","x"].forEach(h=>{let p=t(h+a(u));p[s(u)]=t(h+n)})})}),Object.entries(Rl).forEach(([n,o])=>{t(n)[""]=o});function r(n){return Object.entries(n).reduce((o,[s,a])=>(s?o[s]=r(a):o[s]=`\u3063${a}`,o),{})}return[...Object.keys(Jn),"c","y","w","j"].forEach(n=>{let o=e[n];o[n]=r(o)}),delete e.n.n,Object.freeze(JSON.parse(JSON.stringify(e)))}var Ni=null;function ql(){return Ni==null&&(Ni=_l()),Ni}var Nl=ro({wi:"\u3090",we:"\u3091"});function Pl(e){let t=JSON.parse(JSON.stringify(e));return t.n.n={"":"\u3093"},t.n[" "]={"":"\u3093"},t}function Ol(e=""){return Z(e)?!1:Vt(e,Va,Wa)}function oe(e=""){return Z(e)?!1:e.charCodeAt(0)===el}function ao(e=""){return Z(e)?!1:e.charCodeAt(0)===il}function lo(e=""){return Z(e)?!1:oe(e)?!0:Vt(e,Bi,Ga)}function zl(e=""){let t=[];return e.split("").forEach(i=>{if(oe(i)||ao(i))t.push(i);else if(lo(i)){let r=i.charCodeAt(0)+(Hi-Bi),n=String.fromCharCode(r);t.push(n)}else t.push(i)}),t.join("")}var co=to((e,t,i)=>{let r=ql();return r=e?Pl(r):r,r=t?Nl(r):r,i&&(r=no(r,i)),r},Ft);function Gn(e="",t={},i){let r;return i?r=t:(r=Di(t),i=co(r.IMEMode,r.useObsoleteKana,r.customKanaMapping)),Bl(e,r,i).map(n=>{let[o,s,a]=n;if(a===null)return e.slice(o);let l=r.IMEMode===Vn.HIRAGANA,d=r.IMEMode===Vn.KATAKANA||[...e.slice(o,s)].every(Ol);return l||!d?a:zl(a)}).join("")}function Bl(e="",t={},i){let{IMEMode:r,useObsoleteKana:n,customKanaMapping:o}=t;return i||(i=co(r,n,o)),eo(e.toLowerCase(),i,!r)}function Hl(e=""){return Z(e)?!1:Ll.some(([t,i])=>Vt(e,t,i))}function uo(e="",t){let i=jt(t)==="regexp";return Z(e)?!1:[...e].every(r=>{let n=Hl(r);return i?n||t.test(r):n})}function zi(e=""){return Vt(e,Hi,Za)}function Dl(e=""){return Z(e)?!1:[...e].every(lo)}function po(e=""){return Z(e)?!1:[...e].every(zi)}function Ul(e=""){return Z(e)?!1:e.charCodeAt(0)===tl}function Fl(e=""){return Vt(e,Xa,Qa)||Ul(e)}function jl(e=""){return Z(e)?!1:[...e].every(Fl)}function Vl(e="",t={passKanji:!0}){let i=[...e],r=!1;return t.passKanji||(r=i.some(jl)),(i.some(Dl)||i.some(po))&&i.some(uo)&&!r}var Wl=(e,t)=>oe(e)&&t<1,Kl=(e,t)=>oe(e)&&t>0,$l=e=>["\u30F6","\u30F5"].includes(e),Jl={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u3046"};function Pe(e="",t,{isDestinationRomaji:i,convertLongVowelMark:r}={}){let n="";return e.split("").reduce((o,s,a)=>{if(ao(s)||Wl(s,a)||$l(s))return o.concat(s);if(r&&n&&Kl(s,a)){let l=t(n).slice(-1);return zi(e[a-1])&&l==="o"&&i?o.concat("\u304A"):o.concat(Jl[l])}if(!oe(s)&&zi(s)){let l=s.charCodeAt(0)+(Bi-Hi),d=String.fromCharCode(l);return n=d,o.concat(d)}return n="",o.concat(s)},[]).join("")}var Pi=null,Yl={\u3042:"a",\u3044:"i",\u3046:"u",\u3048:"e",\u304A:"o",\u304B:"ka",\u304D:"ki",\u304F:"ku",\u3051:"ke",\u3053:"ko",\u3055:"sa",\u3057:"shi",\u3059:"su",\u305B:"se",\u305D:"so",\u305F:"ta",\u3061:"chi",\u3064:"tsu",\u3066:"te",\u3068:"to",\u306A:"na",\u306B:"ni",\u306C:"nu",\u306D:"ne",\u306E:"no",\u306F:"ha",\u3072:"hi",\u3075:"fu",\u3078:"he",\u307B:"ho",\u307E:"ma",\u307F:"mi",\u3080:"mu",\u3081:"me",\u3082:"mo",\u3089:"ra",\u308A:"ri",\u308B:"ru",\u308C:"re",\u308D:"ro",\u3084:"ya",\u3086:"yu",\u3088:"yo",\u308F:"wa",\u3090:"wi",\u3091:"we",\u3092:"wo",\u3093:"n",\u304C:"ga",\u304E:"gi",\u3050:"gu",\u3052:"ge",\u3054:"go",\u3056:"za",\u3058:"ji",\u305A:"zu",\u305C:"ze",\u305E:"zo",\u3060:"da",\u3062:"ji",\u3065:"zu",\u3067:"de",\u3069:"do",\u3070:"ba",\u3073:"bi",\u3076:"bu",\u3079:"be",\u307C:"bo",\u3071:"pa",\u3074:"pi",\u3077:"pu",\u307A:"pe",\u307D:"po",\u3094\u3041:"va",\u3094\u3043:"vi",\u3094:"vu",\u3094\u3047:"ve",\u3094\u3049:"vo"},Gl={"\u3002":".","\u3001":",","\uFF1A":":","\u30FB":"/","\uFF01":"!","\uFF1F":"?","\u301C":"~",\u30FC:"-","\u300C":"\u2018","\u300D":"\u2019","\u300E":"\u201C","\u300F":"\u201D","\uFF3B":"[","\uFF3D":"]","\uFF08":"(","\uFF09":")","\uFF5B":"{","\uFF5D":"}","\u3000":" "},Zl=["\u3042","\u3044","\u3046","\u3048","\u304A","\u3084","\u3086","\u3088"],Oi={\u3083:"ya",\u3085:"yu",\u3087:"yo"},Xl={\u3043:"yi",\u3047:"ye"},Ql={\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},tc=["\u304D","\u306B","\u3072","\u307F","\u308A","\u304E","\u3073","\u3074","\u3094","\u304F","\u3075"],ec={\u3057:"sh",\u3061:"ch",\u3058:"j",\u3062:"j"},ic={\u3063:"",\u3083:"ya",\u3085:"yu",\u3087:"yo",\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},Zn={b:"b",c:"t",d:"d",f:"f",g:"g",h:"h",j:"j",k:"k",m:"m",p:"p",q:"q",r:"r",s:"s",t:"t",v:"v",w:"w",x:"x",z:"z"};function rc(){return Pi==null&&(Pi=oc()),Pi}function nc(e){switch(e){case Xn.HEPBURN:return rc();default:return{}}}function oc(){let e=Ui(Yl),t=r=>io(e,r),i=(r,n)=>{t(r)[""]=n};return Object.entries(Gl).forEach(([r,n])=>{t(r)[""]=n}),[...Object.entries(Oi),...Object.entries(Ql)].forEach(([r,n])=>{i(r,n)}),tc.forEach(r=>{let n=t(r)[""][0];Object.entries(Oi).forEach(([o,s])=>{i(r+o,n+s)}),Object.entries(Xl).forEach(([o,s])=>{i(r+o,n+s)})}),Object.entries(ec).forEach(([r,n])=>{Object.entries(Oi).forEach(([o,s])=>{i(r+o,n+s[1])}),i(`${r}\u3043`,`${n}yi`),i(`${r}\u3047`,`${n}e`)}),e.\u3063=fo(e),Object.entries(ic).forEach(([r,n])=>{i(r,n)}),Zl.forEach(r=>{i(`\u3093${r}`,`n'${t(r)[""]}`)}),Object.freeze(JSON.parse(JSON.stringify(e)))}function fo(e){return Object.entries(e).reduce((t,[i,r])=>{if(i)t[i]=fo(r);else{let n=r.charAt(0);t[i]=Object.keys(Zn).includes(n)?Zn[n]+r:r}return t},{})}var ho=to((e,t)=>{let i=nc(e);return t&&(i=no(i,t)),i},Ft);function Rt(e="",t={},i){let r=Di(t);return i||(i=ho(r.romanization,r.customRomajiMapping)),sc(e,r,i).map(n=>{let[o,s,a]=n;return r.upcaseKatakana&&po(e.slice(o,s))?a.toUpperCase():a}).join("")}function sc(e,t,i){i||(i=ho(t.romanization,t.customRomajiMapping));let r=Object.assign({},{isDestinationRomaji:!0},t);return eo(Pe(e,Rt,r),i,!t.IMEMode)}function ac(e=""){return Z(e)?!1:Tl.some(([t,i])=>Vt(e,t,i))}function mo(e="",t={}){let i=Di(t);if(i.passRomaji)return Pe(e,Rt,i);if(Vl(e,{passKanji:!0})){let r=Pe(e,Rt,i);return Gn(r.toLowerCase(),i)}return uo(e)||ac(e)?Gn(e.toLowerCase(),i):Pe(e,Rt,i)}var cc=["https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict","https://unpkg.com/kuromoji@0.1.2/dict"],dc=["base.dat.gz","check.dat.gz","tid.dat.gz","tid_pos.dat.gz","tid_map.dat.gz","cc.dat.gz","unk.dat.gz","unk_pos.dat.gz","unk_map.dat.gz","unk_char.dat.gz","unk_compat.dat.gz","unk_invoke.dat.gz"],uc=["https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://fastly.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://unpkg.com/pinyin-pro@3/dist/index.min.js"];function ji(e){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(e)}function Vi(e){return/[가-힯ᄀ-ᇿ㄰-㆏]/.test(e)}function Oe(e){return/[㐀-䶿一-鿿豈-﫿]/.test(e)}function bo(e){let t=!1;for(let i of e){if(ji(i))return"ja";if(Vi(i))return"ko";Oe(i)&&(t=!0)}return t?"zh":null}async function vo(e,t){if(e.length===0)return[];if(t==="ko")return e.map(s=>mt(Eo(s)));if(t==="zh"){let s=await So();return s?e.map(a=>mt(Mo(s,a))):null}let i=e.join(""),r=await ze(i);if(!r)return null;let n=Lo(e),o=e.map(()=>[]);for(let s of r)To(s,n,(a,l,d)=>{let c=d?s.reading||s.surface:gc(s,l);c&&o[a].push(c)});return e.map((s,a)=>mt(o[a].map(l=>String(Rt(l))).filter(Boolean).join(" ")))}async function xo(e,t){let i=mt(e);if(!i)return"";if(t==="ko")return mt(Eo(i));if(t==="zh"){let o=await So();return o?mt(Mo(o,i)):null}let r=await ze(i);if(!r)return null;let n=r.map(o=>String(Rt(o.reading||o.surface))).map(o=>o.trim()).filter(Boolean).join(" ");return mt(n)}async function wo(e){if(e.length===0)return[];let t=e.join(""),i=await ze(t);if(!i)return null;let r=Lo(e),n=e.map(()=>[]),o=e.map(()=>!1);for(let s of i)To(s,r,(a,l,d)=>{d&&s.hasKanji&&s.reading?(n[a].push(`<ruby>${ht(s.surface)}<rt>${ht(s.reading)}</rt></ruby>`),o[a]=!0):n[a].push(ht(l))});return e.map((s,a)=>o[a]?n[a].join(""):null)}async function ko(e){let t=mt(e);if(!t)return"";let i=await ze(t);if(!i)return null;let r=!1,n=0,o="";for(let s of i)s.start>n&&(o+=ht(t.slice(n,s.start))),s.hasKanji&&s.reading?(o+=`<ruby>${ht(s.surface)}<rt>${ht(s.reading)}</rt></ruby>`,r=!0):o+=ht(s.surface),n=s.end;return n<t.length&&(o+=ht(t.slice(n))),r?o:""}var se=null;function pc(){return se||(se=(async()=>{for(let e of cc){let t=await fc(e);if(t)return t;console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${e}, trying next source\u2026`)}return console.warn("[Liquid Lyrics] Local Japanese romanization unavailable: no dictionary source worked."),null})(),se.then(e=>{e||(se=null)})),se}async function fc(e){try{let t=await Promise.all(dc.map(r=>hc(`${e}/${r}`))),i=new go.default;return i.loadTrie(new Int32Array(t[0]),new Int32Array(t[1])),i.loadTokenInfoDictionaries(new Uint8Array(t[2]),new Uint8Array(t[3]),new Uint8Array(t[4])),i.loadConnectionCosts(new Int16Array(t[5])),i.loadUnknownDictionaries(new Uint8Array(t[6]),new Uint8Array(t[7]),new Uint8Array(t[8]),new Uint8Array(t[9]),new Uint32Array(t[10]),new Uint8Array(t[11])),new yo.default(i)}catch{return null}}async function hc(e){let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);let i=new Uint8Array(await t.arrayBuffer());if(i[0]===31&&i[1]===139){let r=new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(r).arrayBuffer()}return i.buffer}async function ze(e){if(!e)return[];let t=await pc();if(!t)return null;let i;try{i=t.tokenize(e)}catch{return null}let r=[],n=0;for(let o of i){let s=String(o?.surface_form??"");if(!s)continue;let a=Number(o?.word_position),l=Number.isFinite(a)&&a>0?a-1:Math.max(n,e.indexOf(s,n)),d=l+s.length;n=d;let c=Oe(s),u=typeof o?.reading=="string"&&o.reading!=="*"?o.reading:"",h=u?String(mo(u)):c?"":s;h=mc(s,String(o?.pos??""),h),r.push({start:l,end:d,surface:s,reading:h,hasKanji:c})}return r}function mc(e,t,i){return t.includes("\u52A9\u8A5E")?e==="\u306F"?"\u308F":e==="\u3078"?"\u3048":e==="\u3092"?"\u304A":i:i}function Lo(e){let t=[],i=0;for(let r of e)t.push([i,i+r.length]),i+=r.length;return t}function To(e,t,i){let r=e.end-e.start;if(!(r<=0))for(let n=0;n<t.length;n++){let[o,s]=t[n],a=Math.max(o,e.start),l=Math.min(s,e.end);if(l<=a)continue;let d=e.surface.slice(a-e.start,l-e.start);i(n,d,l-a>=r)}}function gc(e,t){let i=e.reading||e.surface,r=e.end-e.start;if(r<=0||!i)return"";let n=e.surface.indexOf(t);if(n<0)return"";let o=Math.round(i.length*n/r),s=Math.round(i.length*(n+t.length)/r);return i.slice(o,s)}var yc=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"],bc=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"],vc=["","k","k","k","n","n","n","t","l","k","m","p","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"],xc=["","g","kk","ks","n","nj","nh","d","r","lg","lm","lb","ls","lt","lp","lh","m","b","ps","s","ss","ng","j","ch","k","t","p","h"];function Eo(e){let t=Array.from(e),i="";for(let r=0;r<t.length;r++){let n=t[r].codePointAt(0)??0;if(n<44032||n>55203){i+=t[r];continue}let o=n-44032,s=Math.floor(o/588),a=Math.floor(o%588/28),l=o%28,d=t[r+1]?.codePointAt(0)??0,h=(d>=44032&&d<=55203?Math.floor((d-44032)/588):-1)===11;i+=yc[s]+bc[a],i+=h?xc[l]:vc[l]}return i}async function So(){return await wc(uc,()=>!!window.pinyinPro?.pinyin)?window.pinyinPro.pinyin:null}function Mo(e,t){try{return String(e(t,{toneType:"symbol",nonZh:"consecutive"}))}catch{return t}}var Fi=new Map;async function wc(e,t){for(let i of e)if(await kc(i,t))return!0;return!1}function kc(e,t){if(t())return Promise.resolve(!0);let i=Fi.get(e);return i||(i=new Promise(r=>{let n=document.createElement("script");n.src=e,n.onload=()=>r(t()),n.onerror=()=>r(!1),document.head.appendChild(n)}),Fi.set(e,i),i.then(r=>{r||Fi.delete(e)})),i}function ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function mt(e){return String(e??"").replace(/\s+/g," ").trim()}function Io(e){return e.Type==="Line"?Lc(e.Content??[]):e.Type==="Syllable"?Tc(e.Content??[]):(e.Lines??[]).map(t=>({kind:"static",text:H(t.Text),romanizedText:H(t.RomanizedText)})).filter(t=>t.text)}function Lc(e){let t=[],i=D(e[0]?.StartTime,0);return e.length>0&&i>500&&t.push(Be(0,i)),e.forEach((r,n)=>{let o=e[n+1],s=Ec(r,o);r.Type==="Interlude"?t.push(Be(s.start,s.end)):t.push({kind:"line",range:s,text:H(r.Text),romanizedText:H(r.RomanizedText)}),_o(t,s.end,D(o?.StartTime,NaN))}),t}function Tc(e){let t=[],i=e.map((r,n)=>Sc(r,e[n+1]));return i.length>0&&i[0].range.start>500&&t.push(Be(0,i[0].range.start)),i.forEach((r,n)=>{t.push({kind:"syllable",range:r.range,text:r.lead.sourceText||r.lead.words.map(o=>o.text).join(" ").trim(),romanizedText:Ic(r.lead.words),lead:r.lead,backgrounds:r.backgrounds}),_o(t,r.range.end,i[n+1]?.range.start??NaN)}),t}function Be(e,t){return{kind:"interlude",range:{start:e,end:Math.max(t,e+250)}}}function _o(e,t,i){Number.isFinite(i)&&(i-t<3e3||e.push(Be(t,i)))}function Ec(e,t){let i=D(e.StartTime,0),r=D(t?.StartTime,NaN),n=D(e.EndTime,i+4500),o=No(n,r);return{start:i,end:Po(o,i,o,250)}}function Sc(e,t){let i=Ao(e.Lead),r=(e.Background??[]).map(u=>Ao(u)),n=D(t?.Lead?.StartTime,NaN),o=i.range.start,s=Number.isFinite(n)&&n>o?n:o+4500,a=Math.max(i.range.end,...r.map(u=>u.range.end)),l=No(a,n),c=Co(e.Lead)||(e.Background??[]).some(Co)?Number.POSITIVE_INFINITY:s;return{range:{start:o,end:Po(l,o,s,250,c)},lead:i,backgrounds:r}}function Co(e){let t=D(e?.StartTime,0),i=Number(e?.EndTime);return Number.isFinite(i)&&i>t}function Ao(e){let t=D(e?.StartTime,0),i=Number(e?.EndTime),r=Number.isFinite(i)&&i>t?D(i,t):t+4500,n={start:t,end:r};return{range:n,sourceText:qc(e),words:Cc(Mc(e?.Syllables??[],n),n)}}function Mc(e,t){let i=[],r=null,n=!1;return e.forEach((o,s)=>{let a={text:H(o.Text),romanizedText:H(o.RomanizedText),start:D(o.StartTime,t.start),end:D(o.EndTime,t.start+80),animateLetters:!1},l=!!(o.IsPartOfWord||n)&&!gt(a.text)&&!gt(r?.text??"");l&&r?(r.text+=a.text,r.romanizedText=Oc(r.romanizedText,a.romanizedText," "),r.start=Math.min(r.start,a.start),r.end=Math.max(r.end,a.end)):(r&&!l&&i.push(r),r=a),n=!!o.IsPartOfWord,(!o.IsPartOfWord||s===e.length-1)&&r&&(i.push(r),r=null)}),i.filter(o=>o.text)}function Cc(e,t){if(e.length===0)return[];let i=t.start,r=Math.max(t.end,i+250),n=e.map(l=>({...l,start:lt(l.start,i,r),end:lt(l.end,i,r)})).filter(l=>l.text.trim().length>0),o=i;n.forEach(l=>{l.start=Math.max(o,l.start),o=l.start});let s=[];n.forEach(l=>{let d=s[s.length-1],c=d?.[0]?.start;d&&c!==void 0&&Math.abs(l.start-c)<=12?(l.start=c,d.push(l)):s.push([l])});let a=[];return s.forEach((l,d)=>{let c=l[0].start,u=s[d+1]?.[0]?.start??r,h=Math.max(c+1,u);if(l.length===1){a.push({...l[0],start:c,end:Rc(l[0].end,c,h)});return}Ac(l,c,h).forEach(p=>a.push(p))}),a.map((l,d)=>{let c=a[d+1]?.start??r,u=Math.max(l.start+1,c),h=Math.min(Math.max(l.end,l.start+1),u);return{...l,end:h,animateLetters:He(l.text,l.start,h)}})}function Ac(e,t,i){let r=Math.max(i,t+e.length*80),n=e.reduce((s,a)=>s+Ro(a.text),0)||e.length,o=t;return e.map((s,a)=>{let l=a===e.length-1,d=e.length-a,c=Math.max(1,r-o),u=(r-t)*Ro(s.text)/n,h=Math.max(1,c-(d-1)),p=o,w=l?r:o+lt(u,1,h);return o=w,{...s,start:p,end:w}})}function Rc(e,t,i){return Number.isFinite(e)&&e>t?Math.min(e,i):i}function Ro(e){return Math.max(1,Array.from(e.trim()).length)}function He(e,t,i){let r=Array.from(e.trim());if(r.length<3)return!1;let n=i-t;return n<750||n/r.length<90?!1:r.some(o=>/[A-Za-z0-9]/.test(o))}function Ic(e){return e.map(t=>De(t.romanizedText)).filter(Boolean).join(" ").trim()}function qo(e){let t=Array.isArray(e.SongWriters)?Array.from(new Set(e.SongWriters.map(r=>H(r)).filter(Boolean))):[],i=_c(e);return t.length===0&&!i?null:{writers:t,source:i}}function _c(e){let t=e.Provider,i=H(e.LiquidLyricsCredit);if(t==="local")return i?`Synced by ${i}`:"Custom sync";if(t==="community")return i?`via Liquid Lyrics (community) \xB7 Made by ${i}`:"via Liquid Lyrics (community)";if(i)return`Synced by ${i}`;if(t==="spicy"){if(e.source==="spl"){let r=H(e.TTMLUploadMetadata?.Maker?.username)||H(e.TTMLUploadMetadata?.Uploader?.username);return r?`via Spicy Lyrics (community) \xB7 Made by @${r}`:"via Spicy Lyrics (community)"}return"via Spicy Lyrics"}return t==="spotify"?"via Spotify":""}function H(e){return String(e??"").replace(/\s+/g," ").trim()}function De(e){let t=H(e);return t&&!gt(t)?t:""}function gt(e){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(e)}function qc(e){return H(e?.LiquidLyricsOriginalText)||Nc(e?.Syllables??[])}function Nc(e){let t="",i="",r=!1;return e.forEach(n=>{let o=H(n.Text);if(!o)return;let s=!t||n.IsPartOfWord||r||Pc(i,o);t+=s?o:` ${o}`,i=o,r=!!n.IsPartOfWord}),t.trim()}function Pc(e,t){return!e||!t||/^[,.;:!?)]/.test(t)||/[(]$/.test(e)?!0:gt(e)||gt(t)}function Oc(e,t,i){let r=H(e),n=H(t);return r?n?`${r}${i}${n}`:r:n||void 0}function No(e,t){return!Number.isFinite(t)||t<=e?e:t-e<3e3?t:e}function Po(e,t,i,r,n=Number.POSITIVE_INFINITY){let o=D(e,i),s=o>=t+r?o:Math.max(i,t+r);return Math.min(s,n)}function D(e,t){let i=Number(e);return Number.isFinite(i)?Math.max(0,i):t}function lt(e,t=0,i=1){return Math.min(i,Math.max(t,e))}function Wi(e,t){return lt((t-e.start)/Math.max(1,e.end-e.start))}function Wt(e,t,i){let r=lt((i-e)/(t-e));return r*r*(3-2*r)}var zc=1200,Bc=60,Hc=750,zo=3e3,Dc=[200,900,2400],Uc=4e3,Bo="",ae=0,Ue=0,Fe=0,Ki=0,$i=!1,Ho=!1,Do=0,Oo=[];function yt(){let e=D(Spicetify.Player?.getProgress?.(),0),t=Kt(),i=performance.now(),r=ae+(i-Ue),n=!X(),o=t!==Bo,s=Math.abs(e-r)>zc;if(n||o||s)return Fe++,Ji(e,t,i),Ki=i,!n&&(o||s)&&je(),e;if(!Ho||i-Do>zo*2.5){let d=e-r;if(Math.abs(d)>Bc){let c=Math.min(120,Math.max(0,i-Ki));ae+=d*Math.min(1,c/Hc)}}Ki=i;let a=ae+(i-Ue),l=V();return l>0?Math.min(a,l):a}function bt(e){let t=Math.max(0,Math.round(e));Fe++,Ji(t),Spicetify.Player?.seek?.(t),je()}function Uo(){$i||($i=!0,["songchange","onplaypause"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>je())}catch{}}),window.setInterval(()=>{X()&&Fo()},zo),je())}function je(){$i&&(Oo.forEach(e=>clearTimeout(e)),Oo=Dc.map(e=>window.setTimeout(()=>void Fo(),e)))}async function Fo(){let e=Fc();if(typeof e?.getPositionState!="function")return;let t=Fe,i=Kt();try{let r=await e.getPositionState({}),n=Number(r?.position);if(!Number.isFinite(n)||n<0||t!==Fe||i!==Kt()||!X())return;let o=performance.now(),s=ae+(o-Ue);if(Math.abs(n-s)>Uc)return;Ho=!0,Do=o,Ji(n,i,o)}catch{}}function Fc(){return Spicetify.Platform?.PlayerAPI?._contextPlayer??Spicetify.Player?.origin?._contextPlayer??null}function X(){let e=Spicetify.Player;return typeof e?.isPlaying=="function"?!!e.isPlaying():typeof e?.data?.isPaused=="boolean"?!e.data.isPaused:!!(e?.data?.is_playing??e?.data?.isPlaying)}function V(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{};return D(t.duration_ms??t.duration??e?.duration?.milliseconds??e?.duration_ms??Spicetify.Player?.data?.duration,0)}function Kt(){return String(Spicetify.Player?.data?.item?.uri??"")}function Ji(e,t=Kt(),i=performance.now()){Bo=t,ae=Math.max(0,e),Ue=i}var le=new Set,It=null;function $t(e){return le.add(e),It===null&&(It=requestAnimationFrame(jo)),()=>{le.delete(e),le.size===0&&It!==null&&(cancelAnimationFrame(It),It=null)}}function jo(e){if(le.size===0){It=null;return}It=requestAnimationFrame(jo);let t=yt();for(let i of le)i(t,e)}var Vo=900,jc=.92,Vc=5e3,Wc=180,Wo=1100,Yi=.75,Kc=8,I=-999,vt=class{constructor(t){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=I;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.romanMode="off";this.songLang=null;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.lastAutoScrollTop=-1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.tick=(t,i)=>{if(t===this.lastProgress)return;this.lastProgress=t;let r=this.findActiveIndex(t);r!==this.activeIndex&&(this.applyPosition(r,t),this.activeIndex=r),r>=0&&(this.virtual&&this.mountAround(r),this.updateActiveLine(this.records[r],t)),this.outgoingLines.length>0&&this.updateOutgoingLines(t)};this.onUserScroll=()=>{this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},Vc)};this.onContainerClick=t=>{let i=t.target?.closest(".liquid-lyrics-line");if(!i)return;let r=this.recordByEl.get(i);!r||!Number.isFinite(r.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),bt(r.start),this.forceSync(),this.scrollToRecord(r))};this.container=t.container,this.scroller=t.scroller??t.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...t},this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",i=>{(i.pointerType==="mouse"||i.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasJapanese(){return this.songLang==="ja"}get hasLyrics(){return this.records.length>0}setLyrics(t){if(this.clear(),!t)return;let i=Io(t);if(i.length===0)return;let r=this.options.virtualize&&i.some(n=>n.kind==="syllable");if(this.records=i.map((n,o)=>this.buildLineRecord(n,o)),this.records.forEach(n=>this.recordByEl.set(n.el,n)),this.hasTimeline=this.records.some(n=>Number.isFinite(n.start)),this.songLang=bo(i.map(n=>n.kind==="interlude"?"":n.text)),r)this.initVirtualizer();else{let n=document.createDocumentFragment();this.records.forEach(o=>n.appendChild(o.el)),this.container.appendChild(n)}this.appendCredits(t),this.syncClock(),this.forceSync()}appendCredits(t){let i=qo(t);if(!i)return;let r=document.createElement("div");if(r.className="liquid-lyrics-credits",i.writers.length>0){let n=document.createElement("div");n.className="ll-credits-writers",n.textContent=`Written by ${i.writers.join(", ")}`,r.appendChild(n)}if(i.source){let n=document.createElement("div");n.className="ll-credits-source",n.textContent=i.source,r.appendChild(n)}this.container.appendChild(r)}clear(){this.generation++,this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=I,this.lastProgress=NaN,this.lastAutoScrollTop=-1,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.songLang=null,this.container.replaceChildren()}setEnabled(t){if(this.enabled!==t&&(this.enabled=t,this.syncClock(),t)){this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),this.forceSync();let i=this.activeIndex>=0?this.records[this.activeIndex]:null;i&&this.scrollToRecord(i,"auto")}}setRomanized(t,i){this.romanMode=t;let r=[],n=!1;for(let o of this.records){let s=o.line;if(s.kind==="interlude"||!s.text)continue;let a=s.text,l=gt(a),d=De(s.romanizedText);n||(n=l||!!d);let c=this.getLineLanguage(a)==="ja";if(s.kind==="line"||s.kind==="static"){if(t==="romaji"){let u=typeof o.localLineRoman=="string"?o.localLineRoman:"",h=d||u;h?this.setLineContent(o,`t:${h}`,h):(this.setLineContent(o,`t:${a}`,a),i&&l&&o.localLineRoman!==!1&&r.push(o))}else t==="furigana"&&c?typeof o.lineFurigana=="string"&&o.lineFurigana?this.setLineHtml(o,o.lineFurigana,a):(this.setLineContent(o,`t:${a}`,a),i&&o.lineFurigana!==!1&&r.push(o)):this.setLineContent(o,`t:${a}`,a);continue}if(!l){this.applyWordRomanization(o,t==="romaji");continue}t==="romaji"?Array.isArray(o.localWordRoman)?this.applyLocalWordRomanization(o):(this.restoreOriginalWords(o),i&&o.localWordRoman!==!1&&r.push(o)):t==="furigana"&&c?Array.isArray(o.wordFurigana)?this.applyWordFurigana(o):(this.restoreOriginalWords(o),i&&o.wordFurigana!==!1&&r.push(o)):this.restoreOriginalWords(o)}this.hasRomanizationValue=n,this.options.onRomanizationAvailability?.(n),r.length>0&&this.processLocalRomanization(r,t)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(t,i){let r=t.kind!=="static",n=this.options.variant==="sidebar"&&(t.kind==="line"||t.kind==="syllable"),o=document.createElement(n?"button":"div");o instanceof HTMLButtonElement&&(o.type="button"),o.className="liquid-lyrics-line";let s={index:i,el:o,line:t,start:r?t.range.start:Number.POSITIVE_INFINITY,end:r?t.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:I,interludeVis:I,interludeY:I,interludeScale:I,displayText:t.kind==="interlude"?"":t.text,displayKey:"orig",localWordRoman:null,wordFurigana:null,localLineRoman:null,lineFurigana:null,wrapper:null,height:0,rowOffset:I};if(t.kind==="interlude"){o.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&o.setAttribute("aria-hidden","true");for(let a=0;a<3;a++){let l=document.createElement("span");l.className="ll-interlude-dot",o.appendChild(l),s.dots.push(l),s.dotLift.push(0)}}else if(t.kind==="static")o.classList.add("liquid-lyrics-static"),o.textContent=t.text;else if(t.kind==="line")o.textContent=t.text;else{o.classList.add("ll-syllable-line");let a=document.createElement("div");a.className="ll-vocal-line ll-lead-vocal",o.appendChild(a),s.leadEl=a;let l=this.buildWordSpans(a,t.lead.words,"");if(this.options.renderBackgrounds)for(let d of t.backgrounds){let c=document.createElement("div");c.className="ll-vocal-line ll-background-vocal",o.appendChild(c),s.bgWords.push(...this.buildWordSpans(c,d.words,"ll-bg-syllable"))}s.words=Ko(l,s.bgWords)}return s}buildWordSpans(t,i,r){let n=[];return i.forEach((o,s)=>{let a=document.createElement("span");a.className=r?`ll-syllable ${r}`:"ll-syllable",o.animateLetters&&a.classList.add("ll-long-syllable"),gt(o.text)&&a.classList.add("ll-cjk-syllable"),s===i.length-1&&a.classList.add("LastWordInLine");let l=[];if(o.rubyHtml)a.classList.add("ll-ruby-syllable"),a.setAttribute("aria-label",o.text),a.innerHTML=o.rubyHtml;else if(o.animateLetters){a.setAttribute("aria-label",o.text);for(let d of o.text){let c=document.createElement("span");c.className="ll-letter",c.textContent=d,a.appendChild(c),l.push(c)}}else a.textContent=o.text;t.appendChild(a),n.push({el:a,start:o.start,end:o.end,animateLetters:o.animateLetters,letters:l,state:"idle",gradientUnit:I,lastLift:0,letterFill:null,letterLift:null})}),n}syncClock(){let t=this.enabled&&this.hasTimeline&&this.records.length>0;t&&!this.unsubscribeClock?this.unsubscribeClock=$t(this.tick):t||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(yt(),performance.now()))}lastStartedIndex(t){let i=this.records,r=0,n=i.length-1,o=-1;for(;r<=n;){let s=r+n>>1;i[s].start<=t?(o=s,r=s+1):n=s-1}return o}findActiveIndex(t){let i=this.records;if(i.length===0)return-1;let r=this.lastStartedIndex(t);if(r<0)return-1;let n=Math.max(0,r-4);for(let s=r;s>=n;s--){let a=i[s];if(t>=a.start&&t<a.end)return s}if(this.activeIndex>=0&&this.activeIndex<i.length){let s=i[this.activeIndex];if(t>=s.start&&t<s.end+Vo)return this.activeIndex}let o=i[r];return o.end<=t&&t-o.end<=Vo?r:-1}applyPosition(t,i){let r=this.activeIndex,n=this.records;for(let o=0;o<n.length;o++){let s=n[o],a=s.state==="active";if(o===t){a||this.activateLine(s,i);continue}(t>=0?o<t:s.end<=i)?a&&s.line.kind!=="interlude"&&s.end>i?this.beginOutgoing(s):(s.state!=="past"||a)&&this.completeLine(s,a):(s.state!=="future"||a)&&this.resetLine(s)}if(t>=0&&!this.userScrolling){let o=r>=0?n[r]:null,s=n[t];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),o?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===t&&this.scrollToRecord(s)},Wc):this.scrollToRecord(s)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(t,i){t.state="active",t.outgoing=!1,t.progressUnit=I,t.interludeVis=I,t.interludeY=I,t.interludeScale=I;let r=t.el.classList;if(r.remove("past","future","ll-finishing","ll-outgoing"),r.add("active"),t.line.kind==="syllable"){t.dirty=!0;for(let n of t.words)this.syncWordState(n,i)}else t.line.kind==="interlude"&&(t.dirty=!0)}beginOutgoing(t){t.state="past",t.outgoing=!0;let i=t.el.classList;i.remove("active","future","ll-finishing"),i.add("past","ll-outgoing"),t.glow&&(i.remove("ll-glow"),t.glow=!1),this.outgoingLines.includes(t)||this.outgoingLines.push(t)}updateOutgoingLines(t){for(let i=this.outgoingLines.length-1;i>=0;i--){let r=this.outgoingLines[i];if(!r.outgoing||r.state!=="past"){this.outgoingLines.splice(i,1);continue}if(t>=r.end){this.finishOutgoing(r),this.outgoingLines.splice(i,1);continue}if(t<r.start){this.outgoingLines.splice(i,1),this.resetLine(r);continue}r.line.kind==="syllable"?this.updateWords(r,t):this.writeLineProgress(r,Wi(r,t)*100)}}finishOutgoing(t){t.outgoing=!1;let i=t.el.classList;if(i.remove("ll-outgoing"),i.add("ll-finishing"),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let r of t.words)r.state!=="sung"&&this.setWordState(r,"sung")}}completeLine(t,i){t.state="past",t.outgoing=!1;let r=t.el.classList;if(r.remove("active","future","ll-outgoing"),r.add("past"),r.toggle("ll-finishing",i),t.glow&&(r.remove("ll-glow"),t.glow=!1),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let n of t.words)n.state!=="sung"&&this.setWordState(n,"sung");for(let n of t.dots)n.classList.add("lit"),$o(n);t.dotLift.fill(0)}}resetLine(t){t.state="future",t.outgoing=!1;let i=t.el.classList;if(i.remove("active","past","ll-finishing","ll-outgoing"),i.add("future"),t.glow&&(i.remove("ll-glow"),t.glow=!1),this.clearLineInline(t),!!t.dirty){t.dirty=!1;for(let r of t.words)r.state!=="future"&&this.setWordState(r,"future");for(let r of t.dots)r.classList.remove("lit"),$o(r);t.dotLift.fill(0)}}clearLineInline(t){let i=t.el.style;t.progressUnit!==I&&(i.removeProperty("--line-progress"),t.progressUnit=I),t.interludeVis!==I&&(i.removeProperty("--interlude-visibility"),i.removeProperty("--interlude-y"),i.removeProperty("--interlude-scale"),t.interludeVis=I,t.interludeY=I,t.interludeScale=I)}updateActiveLine(t,i){let r=Wi(t,i);if(t.line.kind==="interlude"){this.updateInterlude(t,r);return}let n=r>jc;n!==t.glow&&(t.glow=n,t.el.classList.toggle("ll-glow",n)),t.line.kind==="syllable"?this.updateWords(t,i):this.writeLineProgress(t,r*100)}writeLineProgress(t,i){let r=Math.round(i*2)/2;r!==t.progressUnit&&(t.progressUnit=r,t.el.style.setProperty("--line-progress",String(r)))}updateWords(t,i){for(let r of t.words){let n=i<r.start?"future":i>=r.end?"sung":"singing";n!==r.state&&this.setWordState(r,n),n==="singing"&&this.updateSingingWord(r,i)}}syncWordState(t,i){let r=i<t.start?"future":i>=t.end?"sung":"singing";r!==t.state&&this.setWordState(t,r)}setWordState(t,i){t.state=i;let r=t.el.classList;r.toggle("singing",i==="singing"),r.toggle("sung",i==="sung"),r.toggle("future",i==="future"),i!=="singing"&&this.clearWordInline(t)}clearWordInline(t){let i=t.el.style;if(t.gradientUnit!==I&&(i.removeProperty("--syl-progress"),t.gradientUnit=I),t.lastLift!==0&&(i.transform="",t.lastLift=0),!(!t.letterFill||!t.letterLift))for(let r=0;r<t.letters.length;r++){let n=t.letters[r];t.letterFill[r]!==I&&(n.style.removeProperty("--letter-progress"),t.letterFill[r]=I),t.letterLift[r]!==0&&(n.style.transform="",t.letterLift[r]=0)}}updateSingingWord(t,i){let r=lt((i-t.start)/Math.max(1,t.end-t.start));if(t.animateLetters){this.updateLetters(t,r);return}let n=Math.round(-20+120*r);n!==t.gradientUnit&&(t.gradientUnit=n,t.el.style.setProperty("--syl-progress",String(n)));let o=Math.sin(r*Math.PI);Math.abs(o-t.lastLift)>.01&&(t.lastLift=o,t.el.style.transform=`translate3d(0, ${(-5*o).toFixed(2)}px, 0) scale(${(1+.018*o).toFixed(4)})`)}updateLetters(t,i){let r=t.letters,n=r.length;if(n===0)return;(!t.letterFill||!t.letterLift)&&(t.letterFill=new Array(n).fill(I),t.letterLift=new Array(n).fill(0));let o=Math.max(.16,1.8/n),s=i+o*Wt(.7,1,i);for(let a=0;a<n;a++){let l=r[a],d=Math.round(-20+120*lt(i*n-a)),c=t.letterFill[a];(Math.abs(d-c)>=4||d!==c&&(d===100||d===-20))&&(t.letterFill[a]=d,l.style.setProperty("--letter-progress",String(d)));let u=1-lt(Math.abs(s-(a+.5)/n)/o),h=u<=0?0:Wt(0,1,u);Math.abs(h-t.letterLift[a])>.008&&(t.letterLift[a]=h,l.style.transform=h===0?"":`translate3d(0, ${(-5.5*h).toFixed(2)}px, 0) scale(${(1+.02*h).toFixed(4)})`)}}updateInterlude(t,i){let r=Wt(0,.22,i),n=1-Wt(.99,1,i),o=Math.round(Math.min(r,n)*200)/200,s=Math.round(-24*Wt(.76,1,i)*10)/10,a=Math.round((.72+.28*r)*500)/500,l=t.el.style;o!==t.interludeVis&&(t.interludeVis=o,l.setProperty("--interlude-visibility",String(o))),s!==t.interludeY&&(t.interludeY=s,l.setProperty("--interlude-y",`${s}px`)),a!==t.interludeScale&&(t.interludeScale=a,l.setProperty("--interlude-scale",String(a)));let d=this.options.dotLiftPx;for(let c=0;c<t.dots.length;c++){let u=t.dots[c],h=c/3,p=(c+1)/3;u.classList.toggle("lit",i>=h),u.style.opacity=i>=.99?String(n):"";let w=0;i>=h&&i<p&&(w=Math.sin((i-h)/(p-h)*Math.PI)*d),(Math.abs(w-t.dotLift[c])>.1||w===0&&t.dotLift[c]!==0)&&(t.dotLift[c]=w,u.style.transform=w===0?"":`translateY(${(-w).toFixed(2)}px)`)}}scrollToRecord(t,i="smooth"){let r=this.scroller,n,o;if(this.virtual)this.mountAround(t.index),n=this.virtual.space.offsetTop+(this.virtual.offsets[t.index]??0),o=this.virtual.heights[t.index]??t.el.offsetHeight;else{if(!t.el.isConnected)return;n=$c(t.el,r),o=t.el.offsetHeight}let s=Math.max(0,n-r.clientHeight/2+o/2);this.lastAutoScrollTop=s,r.scrollTo({top:s,behavior:i})}reanchorActiveLine(){if(!this.virtual||!this.enabled||this.userScrolling)return;let t=this.activeIndex>=0?this.records[this.activeIndex]:null;if(!t)return;let i=this.virtual.space.offsetTop+(this.virtual.offsets[t.index]??0),r=this.virtual.heights[t.index]??t.el.offsetHeight,n=Math.max(0,i-this.scroller.clientHeight/2+r/2);Math.abs(n-this.lastAutoScrollTop)<2||(this.lastAutoScrollTop=n,this.scroller.scrollTo({top:n,behavior:"smooth"}))}setLineContent(t,i,r){t.displayKey!==i&&(t.displayKey=i,t.displayText=r,t.el.textContent=r,this.refreshVirtualHeight(t))}setLineHtml(t,i,r){let n=`h:${i}`;t.displayKey!==n&&(t.displayKey=n,t.displayText=r,t.el.innerHTML=i,this.refreshVirtualHeight(t))}getLineLanguage(t){return ji(t)?"ja":Vi(t)?"ko":Oe(t)?this.songLang==="ja"?"ja":"zh":null}applyLocalWordRomanization(t){if(t.line.kind!=="syllable"||!Array.isArray(t.localWordRoman))return;let i=t.localWordRoman,r=t.line.lead.words.map((n,o)=>{let s=i[o]||n.text;return s===n.text?n:{...n,text:s,animateLetters:He(s,n.start,n.end)}});this.rebuildLead(t,r,"local-roman",!0)}applyWordFurigana(t){if(t.line.kind!=="syllable"||!Array.isArray(t.wordFurigana))return;let i=t.wordFurigana,r=!1,n=t.line.lead.words.map((o,s)=>{let a=i[s];return a?(r=!0,{...o,rubyHtml:a,animateLetters:!1}):o});if(!r){this.restoreOriginalWords(t);return}this.rebuildLead(t,n,"furigana",!1)}async processLocalRomanization(t,i){let r=this.generation;for(let n of t){if(r!==this.generation||this.romanMode!==i)return;let o=n.line;if(o.kind==="interlude")continue;let s=this.getLineLanguage(o.text);if(o.kind==="syllable"){let a=o.lead.words.map(l=>l.text);if(i==="romaji"){let l=s?await vo(a,s):null;if(r!==this.generation)return;n.localWordRoman=l??!1,this.romanMode==="romaji"&&l&&this.applyLocalWordRomanization(n)}else if(i==="furigana"){let l=await wo(a);if(r!==this.generation)return;n.wordFurigana=l??!1,this.romanMode==="furigana"&&l&&this.applyWordFurigana(n)}}else if(i==="romaji"){let a=s?await xo(o.text,s):null;if(r!==this.generation)return;n.localLineRoman=a||!1,this.romanMode==="romaji"&&a&&this.setLineContent(n,`t:${a}`,a)}else if(i==="furigana"){let a=await ko(o.text);if(r!==this.generation)return;n.lineFurigana=a||!1,this.romanMode==="furigana"&&a&&this.setLineHtml(n,a,o.text)}if(await new Promise(a=>requestAnimationFrame(()=>a())),r!==this.generation)return}}applyWordRomanization(t,i){if(t.line.kind!=="syllable")return;let r=!1,n=t.line.lead.words.map(o=>{let s=i?De(o.romanizedText):"";return!s||s===o.text?o:(r=!0,{...o,text:s,animateLetters:He(s,o.start,o.end)})});this.rebuildLead(t,n,r?"roman-words":"orig",!1)}restoreOriginalWords(t){t.line.kind==="syllable"&&this.rebuildLead(t,t.line.lead.words,"orig",!1)}rebuildLead(t,i,r,n){if(t.displayKey===r||!t.leadEl)return;t.displayKey=r,t.el.classList.toggle("ll-context-romanized",n),t.leadEl.replaceChildren();let o=this.buildWordSpans(t.leadEl,i,"");if(t.words=Ko(o,t.bgWords),t.displayText=i.map(s=>s.text).join(" ").trim(),t.state==="active"){t.dirty=!0;let s=yt();for(let a of t.words)this.syncWordState(a,s)}else if(t.state==="past")for(let s of o)this.setWordState(s,"sung");this.refreshVirtualHeight(t)}initVirtualizer(){let t=document.createElement("div");t.className="ll-syllable-virtual-space",this.container.appendChild(t),this.container.classList.add("ll-syllable-virtualized");let i=new Map;this.records.forEach(n=>{let o=document.createElement("div");o.className="ll-syllable-virtual-row",o.appendChild(n.el),n.wrapper=o,n.height=Jo(n),i.set(n.el,n.index)});let r={space:t,heights:this.records.map(n=>n.height),offsets:[],mounted:new Set,lineToIndex:i,resizeObserver:new ResizeObserver(n=>{let o=!1;for(let s of n){let a=i.get(s.target);if(a===void 0)continue;let l=Math.max(1,s.borderBoxSize?.[0]?.blockSize??s.target.offsetHeight);Math.abs((r.heights[a]??0)-l)<Yi||(r.heights[a]=l,o=!0)}o&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};r.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",r.onScroll,{passive:!0}),this.virtual=r,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let t=this.virtual;t&&(t.raf!==null&&cancelAnimationFrame(t.raf),this.scroller.removeEventListener("scroll",t.onScroll),t.resizeObserver.disconnect(),t.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let t=this.virtual;!t||t.raf!==null||(t.raf=requestAnimationFrame(()=>{t.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let t=this.virtual;if(!t)return;let i=this.scroller.scrollTop-t.space.offsetTop,r=i-Wo,n=i+this.scroller.clientHeight+Wo,o=new Set;for(let a=0;a<this.records.length;a++){let l=t.offsets[a]??0;l+(t.heights[a]??0)>=r&&l<=n&&o.add(a)}let s=this.activeIndex>=0?this.activeIndex:this.lastStartedIndex(this.lastProgress);if(s>=0){let a=Math.max(0,s-3),l=Math.min(this.records.length-1,s+3);for(let d=a;d<=l;d++)o.add(d)}for(let a of t.mounted)!o.has(a)&&a!==this.activeIndex&&this.unmountVirtualLine(a);for(let a of o)this.mountVirtualLine(a);this.layoutMountedRows()}mountAround(t){if(!this.virtual)return;let i=Math.max(0,t-1),r=Math.min(this.records.length-1,t+1),n=!1;for(let o=i;o<=r;o++)n=this.mountVirtualLine(o)||n;n&&this.layoutMountedRows()}mountVirtualLine(t){let i=this.virtual,r=this.records[t];if(!i||!r?.wrapper||i.mounted.has(t))return!1;i.space.appendChild(r.wrapper),i.mounted.add(t),r.rowOffset=I,i.resizeObserver.observe(r.el);let n=r.el.offsetHeight;return n>0&&Math.abs((i.heights[t]??0)-n)>=Yi&&(i.heights[t]=n,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(t){let i=this.virtual,r=this.records[t];!i||!r?.wrapper||!i.mounted.has(t)||(i.resizeObserver.unobserve(r.el),r.wrapper.parentElement===i.space&&i.space.removeChild(r.wrapper),i.mounted.delete(t))}recomputeVirtualOffsets(){let t=this.virtual;if(!t)return;let i=0;t.offsets=t.heights.map(r=>{let n=i;return i+=Math.max(1,r)+Kc,n}),t.space.style.height=`${Math.max(1,i)}px`}layoutMountedRows(){let t=this.virtual;if(t)for(let i of t.mounted){let r=this.records[i];if(!r?.wrapper)continue;let n=Math.round(t.offsets[i]??0);n!==r.rowOffset&&(r.rowOffset=n,r.wrapper.style.transform=`translate3d(0, ${n}px, 0)`)}}refreshVirtualHeight(t){let i=this.virtual;if(!i)return;let r=t.el.isConnected?t.el.offsetHeight:0,n=r>0?r:Jo(t);Math.abs((i.heights[t.index]??0)-n)<Yi||(i.heights[t.index]=n,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}};function Ko(e,t){return t.length===0?e:[...e,...t].sort((i,r)=>i.start-r.start)}function $o(e){e.style.transform&&(e.style.transform=""),e.style.opacity&&(e.style.opacity="")}function Jo(e){if(e.line.kind==="interlude")return 54;let t=Math.max(1,e.displayText.length),i=Math.max(1,Math.ceil(t/42)),r=e.line.kind==="syllable"?e.line.backgrounds.length:0;return 18+i*45+r*24}function $c(e,t){let i=0,r=e;for(;r&&r!==t;){i+=r.offsetTop;let n=r.offsetParent;r=n instanceof HTMLElement&&t.contains(n)?n:null}return i}var Yo=/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿가-힯]/,Jc=/^#\s*interlude\b/i,Yc=/^\[(.+)\]$/;function Gc(e){let t=e.trim();return t?Jc.test(t):!1}function Zc(e){let t=e.trim().match(Yc);if(!t)return null;let i=t[1].trim();return i.length?i:null}function Xc(e){let t=e.split(/\s+/).filter(r=>r.length>0),i=[];for(let r of t){if(!Yo.test(r)){i.push(r);continue}let n="";for(let o of Array.from(r))Yo.test(o)?(n&&(i.push(n),n=""),i.push(o)):n+=o;n&&i.push(n)}return i}function _t(e){return Xc(e).map(t=>({text:t,start:null}))}function ce(e){let t=[];for(let i of e.split(/\r?\n/)){let r=i.trim();if(!r)continue;if(Gc(r)){t.push({kind:"interlude",start:null});continue}let n=Zc(r);if(n!=null){let o=t[t.length-1];o?.kind==="lyric"&&o.backgrounds.push({text:n,tokens:_t(n),start:null,end:null});continue}t.push({kind:"lyric",text:r,tokens:_t(r),backgrounds:[],start:null,end:null})}return t}function Go(e){let t=[];for(let i of e){if(i.kind==="interlude"){t.push("#interlude");continue}t.push(i.text);for(let r of i.backgrounds)t.push(`[${r.text}]`)}return t.join(`
`)}var Xo=4500,Ve=250;function ct(e,t){return{trackId:e.trackId,trackUri:e.trackUri,title:e.title,artist:e.artist,durationMs:e.durationMs,mode:t,lines:[],endMs:null,updatedAt:Date.now()}}function Qc(e){let t=e.lines.map((n,o)=>({line:n,index:o})).filter(n=>n.line.start!=null).sort((n,o)=>n.line.start-o.line.start||n.index-o.index),i=t[t.length-1]?.line.start??0,r=e.endMs!=null?Math.max(e.endMs,i+Ve):i+Xo;return t.map((n,o)=>{let s=n.line.start,a=t[o+1]?.line.start??r,l=Math.max(a,s+Ve);return{line:n.line,start:s,end:l}})}function ue(e){let t=Qc(e),i=t.length===0?td(e):e.mode==="line"?ed(e,t):id(e,t),r=String(e.credit??"").trim();return r&&(i.LiquidLyricsCredit=r),i}function td(e){return{Id:e.trackId,Type:"Static",SongWriters:[],Lines:e.lines.filter(t=>t.kind==="lyric").map(t=>({Text:t.kind==="lyric"?t.text:"",IsRTL:!1})).filter(t=>t.Text),Provider:"local"}}function ed(e,t){let i=t.map(({line:r,start:n,end:o})=>r.kind==="interlude"?{Type:"Interlude",Text:"\u266A",StartTime:n,EndTime:o,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:r.text,StartTime:n,EndTime:o,OppositeAligned:!1,IsRTL:!1});return{Id:e.trackId,Type:"Line",SongWriters:[],Content:i,StartTime:i[0]?.StartTime??0,EndTime:i[i.length-1]?.EndTime??0,Provider:"local"}}function id(e,t){let i=t.filter(r=>rd(r.line)).map(r=>nd(r));return{Id:e.trackId,Type:"Syllable",SongWriters:[],Content:i,StartTime:i[0]?.Lead.StartTime??0,EndTime:i[i.length-1]?.Lead.EndTime??0,Provider:"local"}}function rd(e){return e.kind!=="lyric"||e.start==null||e.end==null?!1:e.tokens.length>0&&e.tokens.every(t=>t.start!=null)}function nd({line:e,start:t}){let i=e.kind==="lyric"?e.tokens:[],r=e.kind==="lyric"&&e.end!=null?e.end:t+Xo,n=Math.max(r,t+Ve),o={Type:"Vocal",OppositeAligned:!1,IsRTL:!1,Lead:Qo(i,t,n)},s=e.kind==="lyric"?e.backgrounds.filter(od).map(a=>sd(a,t,n)):[];return s.length>0&&(o.Background=s),o}function od(e){return e.end==null?!1:e.tokens.length>0&&e.tokens.every(t=>t.start!=null)}function sd(e,t,i){let r=e.start??e.tokens[0]?.start??t,n=Math.max(e.end??i,r+Ve);return Qo(e.tokens,r,n)}function Qo(e,t,i){let r=e.length,n=e.map((o,s)=>{let a=o.start??t,l=Zo(a,t,i),d=e[s+1]?.start??i,c=Zo(Math.max(d,l+1),t,i);return{Text:o.text,IsPartOfWord:!1,StartTime:l,EndTime:s===r-1?i:c}});return{StartTime:t,EndTime:i,Syllables:n}}function ts(e,t){return e.Type==="Static"?ad(e,t):e.Type==="Line"?ld(e,t):cd(e,t)}function ad(e,t){let i=ct(t,"line");return i.lines=(e.Lines??[]).map(r=>de(r.Text)).filter(Boolean).map(r=>({kind:"lyric",text:r,tokens:_t(r),backgrounds:[],start:null,end:null})),i}function ld(e,t){let i=ct(t,"line");i.lines=(e.Content??[]).map(n=>{if(n.Type==="Interlude")return{kind:"interlude",start:rt(n.StartTime)};let o=de(n.Text);return{kind:"lyric",text:o,tokens:_t(o),backgrounds:[],start:rt(n.StartTime),end:null}});let r=e.Content??[];return i.endMs=rt(r[r.length-1]?.EndTime),i}function cd(e,t){let i=ct(t,"word");i.lines=(e.Content??[]).map(n=>{let o=n.Lead?.Syllables??[],s=de(n.LiquidLyricsOriginalText||n.Lead?.LiquidLyricsOriginalText),a=o.map(c=>({text:de(c.Text),start:rt(c.StartTime)})).filter(c=>c.text.length>0),l=s||a.map(c=>c.text).join(" "),d=(n.Background??[]).map(c=>{let u=(c.Syllables??[]).map(h=>({text:de(h.Text),start:rt(h.StartTime)})).filter(h=>h.text.length>0);return{text:u.map(h=>h.text).join(" "),tokens:u,start:rt(c.StartTime),end:rt(c.EndTime)}});return{kind:"lyric",text:l,tokens:a,backgrounds:d,start:rt(n.Lead?.StartTime),end:rt(n.Lead?.EndTime)}});let r=e.Content??[];return i.endMs=rt(r[r.length-1]?.Lead?.EndTime),i}function We(e){for(let t of e.lines){if(t.start==null)return!1;if(e.mode==="word"&&t.kind==="lyric"){if(t.tokens.some(i=>i.start==null)||t.end==null)return!1;for(let i of t.backgrounds)if(i.end==null||i.tokens.some(r=>r.start==null))return!1}}return e.lines.length>0}function de(e){return String(e??"").replace(/\s+/g," ").trim()}function rt(e){let t=Number(e);return Number.isFinite(t)?Math.max(0,t):null}function Zo(e,t,i){return Math.min(Math.max(e,t),Math.max(t,i))}function es(e,t,i){let r=ct(t,i);return r.lines=ce(e),r}var Gi=/\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function is(e,t){let i=[];for(let n of e.split(/\r?\n/)){Gi.lastIndex=0;let o=[],s;for(;(s=Gi.exec(n))!==null;)o.push(dd(s[1],s[2],s[3]));if(o.length===0)continue;let a=n.replace(Gi,"").trim();for(let l of o)i.push({time:l,text:a})}if(i.length===0)return null;i.sort((n,o)=>n.time-o.time);let r=ct(t,"line");return r.lines=i.map(n=>n.text?{kind:"lyric",text:n.text,tokens:_t(n.text),backgrounds:[],start:n.time,end:null}:{kind:"interlude",start:n.time}),r}function dd(e,t,i){let r=Number(e)||0,n=Number(t)||0,o=i?Number(i.padEnd(3,"0").slice(0,3)):0;return r*6e4+n*1e3+o}var Ke=!1,Zi=null;function ns(){return Ke}function Jt(){let e=Zi;Ke=!1,Zi=null,e&&(e.classList.remove("visible"),setTimeout(()=>e.remove(),280))}function Yt(e){if(Ke)return;Ke=!0;let t=z("div","ll-editor-auth"),i=z("div","ll-editor-auth-dialog");t.appendChild(i),document.body.appendChild(t),Zi=t,t.addEventListener("click",o=>{o.target===t&&Jt()}),t.addEventListener("keydown",o=>{o.key==="Escape"&&(o.stopPropagation(),Jt())});let r=()=>{let o=nt();if(!o)return n("login");i.replaceChildren();let s=z("h3","ll-editor-auth-title");s.textContent="Community account";let a=z("p","ll-editor-auth-subtitle");a.textContent=`Signed in as ${o.username}${o.role!=="user"?` \xB7 ${o.role}`:""}`;let l=z("div","ll-editor-auth-actions"),d=z("button","ll-editor-auth-btn ll-editor-auth-secondary");d.type="button",d.textContent="Log out",d.addEventListener("click",async()=>{await jr(),n("login")});let c=z("button","ll-editor-auth-btn ll-editor-auth-primary");c.type="button",c.textContent="Done",c.addEventListener("click",()=>Jt()),l.append(d,c),i.append(s,a,l)},n=o=>{i.replaceChildren();let s=z("h3","ll-editor-auth-title");s.textContent=o==="login"?"Sign in":"Create an account";let a=z("p","ll-editor-auth-subtitle");a.textContent="Community account - needed to upload or report syncs. Free, no email.";let l=z("form","ll-editor-auth-form"),d=rs("Username","text","username"),c=rs("Password","password",o==="login"?"current-password":"new-password"),u=z("div","ll-editor-auth-error"),h=z("button","ll-editor-auth-btn ll-editor-auth-primary");h.type="submit",h.textContent=o==="login"?"Sign in":"Create account";let p=z("button","ll-editor-auth-toggle");p.type="button",p.textContent=o==="login"?"No account? Register":"Have an account? Sign in",p.addEventListener("click",()=>n(o==="login"?"register":"login")),l.append(d.row,c.row,u,h,p),l.addEventListener("submit",async w=>{w.preventDefault(),u.textContent="";let T=d.input.value.trim(),S=c.input.value;if(!T||!S){u.textContent="Enter a username and password.";return}h.disabled=!0;try{o==="login"?await Fr(T,S):await Ur(T,S),Jt(),e?.()}catch(f){u.textContent=it(f),h.disabled=!1}}),i.append(s,a,l),d.input.focus()};Mt()?r():n("login"),requestAnimationFrame(()=>t.classList.add("visible"))}function z(e,t){let i=document.createElement(e);return i.className=t,i}function rs(e,t,i){let r=z("label","ll-editor-auth-field"),n=z("span","ll-editor-auth-label");n.textContent=e;let o=z("input","ll-editor-auth-input");return o.type=t,o.setAttribute("autocomplete",i),o.spellcheck=!1,r.append(n,o),{row:r,input:o}}var er="liquid-lyrics-editor",Gt="liquid-lyrics:editor-visibility",xt=100,wt=300,ud=3e3,pd=3e3,fd=900,hd=250,os=500,pe=180,ss=16,C={close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M8 5.6v12.8L18.6 12 8 5.6Z" fill="currentColor" stroke="none"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7.5 5h3v14h-3z" fill="currentColor" stroke="none"/><path d="M13.5 5h3v14h-3z" fill="currentColor" stroke="none"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',chevronRight:'<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',chevronsLeft:'<svg viewBox="0 0 24 24"><path d="m17 6-6 6 6 6"/><path d="m11 6-6 6 6 6"/></svg>',chevronsRight:'<svg viewBox="0 0 24 24"><path d="m7 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/></svg>',jump:'<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/></svg>',finish:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4.5h11l-2 3 2 3H5"/></svg>',clear:'<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 12h10l1-12"/></svg>',menu:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>',save:'<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7"/><path d="M8 20v-6h8v6"/></svg>',note:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor" stroke="none"/></svg>',account:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>',upload:'<svg viewBox="0 0 24 24"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M5 20h14"/></svg>',refresh:'<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',submissions:'<svg viewBox="0 0 24 24"><path d="M4 6h11"/><path d="M4 12h9"/><path d="M4 18h6"/><path d="m15.5 17 2 2 4-4.5"/></svg>'},ir=null;function Zt(){ir??(ir=new rr),ir.open()}function qt(){return!!ir?.isOpen()}var Ze=class Ze{constructor(){this.overlay=null;this.draft=ct(kd(),"line");this.stage="text";this.targets=[];this.cursor=0;this.previewView=null;this.unsubscribeClock=null;this.currentRowEl=null;this.fileInput=null;this.savedSignature="";this.dragging=!1;this.prevRepeat=null;this.prevProgress=0;this.suppressLoopUntil=0;this.suppressFillUntil=0;this.confirmResolve=null;this.confirmOverlay=null;this.accountChip=null;this.onAuthChange=null;this.submissionsOverlay=null;this.refs=null;this.onViewportResize=()=>this.updateControlsInset();this.onSongChangeGuard=()=>{let t=String(Spicetify.Player?.data?.item?.uri??"");t&&t!==this.draft.trackUri&&Qi()};this.onTick=t=>{if(!this.refs)return;let i=V();if(i>0&&!this.dragging&&X()&&t>=i-hd&&Qi(),!this.dragging&&performance.now()>this.suppressLoopUntil&&i>0&&X()&&t<this.prevProgress&&this.prevProgress>i-ud&&t<pd&&(this.seek(0),Qi()),this.prevProgress=t,vd(this.refs.playBtn,X()?C.pause:C.play),this.refs.durTime.textContent=Ye(i),this.dragging||performance.now()<this.suppressFillUntil)return;let o=i>0?Math.min(1,t/i):0;this.refs.seekFill.style.transform=`scaleX(${o.toFixed(4)})`,this.refs.curTime.textContent=Ye(t)};this.onKeyDown=t=>{if(!this.isOpen()||ns())return;if(this.confirmResolve){t.key==="Escape"?(t.preventDefault(),t.stopImmediatePropagation(),this.resolveConfirm(!1)):t.key==="Enter"&&(t.preventDefault(),t.stopImmediatePropagation(),this.resolveConfirm(!0));return}if(this.submissionsOverlay){t.key==="Escape"&&(t.preventDefault(),t.stopImmediatePropagation(),this.closeSubmissions());return}let i=t.target,r=i instanceof HTMLTextAreaElement||i instanceof HTMLInputElement;if(t.key==="Escape"){if(r)return;t.preventDefault(),this.requestClose();return}if(!(this.stage!=="sync"||r)){if(t.code==="AltRight"){t.preventDefault(),t.stopImmediatePropagation(),t.repeat||this.tap();return}if(Ze.SYNC_KEYS.has(t.key))switch(t.preventDefault(),t.stopImmediatePropagation(),t.key){case"Backspace":this.undo();break;case"Delete":this.clearCurrent();break;case"ArrowLeft":this.nudgeCurrent(t.shiftKey?-wt:-xt);break;case"ArrowRight":this.nudgeCurrent(t.shiftKey?wt:xt);break;case"ArrowUp":this.cursor=Math.max(0,this.cursor-1),this.renderSyncList();break;case"ArrowDown":this.cursor=Math.min(this.targets.length-1,this.cursor+1),this.renderSyncList();break;default:break}}}}isOpen(){return this.overlay?.classList.contains("visible")??!1}async open(){let t=ds();if(!t.trackId){N("No song playing - start a song to create a sync.");return}this.draft=await this.loadDraft(t),this.savedSignature=tr(this.draft),this.build(),this.rebuildTargets();let i=this.draft.lines.length===0?"text":We(this.draft)?"preview":"sync";this.setStage(i),this.show()}async loadDraft(t){let i=re(t.trackUri);if(i)return{...i.draft,durationMs:t.durationMs||i.draft.durationMs};try{let r=await Ae({id:t.trackId,uri:t.trackUri,data:{name:t.title}});if(r.status==="success"&&r.data)return ts(r.data,t)}catch{}return ct(t,"line")}build(){document.getElementById(er)?.remove();let t=document.createElement("div");t.id=er,t.className="liquid-lyrics-editor";let i=m("div","ll-editor-glass-bg"),r=m("div","ll-editor-shell"),n=m("header","ll-editor-header"),o=m("div","ll-editor-title-group"),s=m("h2","ll-editor-title");s.textContent="Sync Editor";let a=m("div","ll-editor-song");a.textContent=`${this.draft.title} - ${this.draft.artist}`,o.append(s,a);let l=m("div","ll-editor-mode-switch"),d=["line","word"].map(R=>{let P=m("button","ll-editor-mode-btn");return P.type="button",P.dataset.mode=R,P.textContent=R==="line"?"Block":"Karaoke",P.addEventListener("click",()=>this.setMode(R)),l.appendChild(P),P}),c=m("div","ll-editor-header-actions"),u=m("div","ll-editor-menu-wrap"),h=fe("ll-editor-icon-btn",C.menu,"More"),p=m("div","ll-editor-menu"),w=this.buildMenu(p);h.addEventListener("click",R=>{R.stopPropagation(),p.classList.toggle("open")}),u.append(h,p);let T=m("button","ll-editor-save-btn");T.type="button",T.innerHTML=`${C.upload}<span class="ll-editor-btn-label">Publish</span>`,T.setAttribute("aria-label","Publish"),q(T,"Publish to the community"),T.addEventListener("click",()=>void this.publishToCommunity());let S=this.buildAccountChip(),f=m("button","ll-editor-submissions-btn");f.type="button",f.innerHTML=`<span class="ll-editor-submissions-btn-icon">${C.submissions}</span><span class="ll-editor-btn-label">My submissions</span>`,f.setAttribute("aria-label","My submissions"),q(f,"Your uploads and their review status"),f.addEventListener("click",()=>void this.openSubmissions());let g=fe("ll-editor-icon-btn",C.close,"Close");g.addEventListener("click",()=>this.requestClose()),c.append(S,f,u,T,g),n.append(o,l,c);let v=m("nav","ll-editor-steps"),b=[{stage:"text",label:"1 \xB7 Text"},{stage:"sync",label:"2 \xB7 Sync"},{stage:"preview",label:"3 \xB7 Preview"}].map(({stage:R,label:P})=>{let ut=m("button","ll-editor-step-btn");return ut.type="button",ut.dataset.stage=R,ut.textContent=P,ut.addEventListener("click",()=>this.setStage(R)),v.appendChild(ut),ut}),x=m("div","ll-editor-body"),y=this.buildTransport();r.append(n,v,x,y.el);let L=m("div","liquid-lyrics-transparent-controls");L.setAttribute("aria-hidden","true");let{width:E,height:M}=ls();t.style.setProperty("--ll-transparent-controls-width",`${E}px`),t.style.setProperty("--ll-transparent-controls-height",`${M}px`),t.append(i,L,r),document.body.appendChild(t),t.addEventListener("click",()=>p.classList.remove("open")),this.overlay=t,this.refs={songLabel:a,modeButtons:d,stepButtons:b,body:x,transport:y.el,playBtn:y.playBtn,seekFill:y.fill,seekTrack:y.track,curTime:y.cur,durTime:y.dur,publishBtn:T,menu:p,deleteItem:w},this.updateModeButtons(),this.bindSeek(),this.updateControlsInset()}updateControlsInset(){let t=this.overlay,i=t?.querySelector(".ll-editor-shell"),r=t?.querySelector(".ll-editor-header");if(!t||!i||!r)return;let n=ls(),o=i.getBoundingClientRect(),a=o.top+parseFloat(getComputedStyle(i).paddingTop||"0")>=n.height+ss,l=o.right-(window.innerWidth-n.width)+ss,d=a?0:Math.max(0,Math.round(l));t.style.setProperty("--ll-editor-controls-inset",`${d}px`)}bindSeek(){let t=this.refs;if(!t)return;let i=t.seekTrack,r=o=>{let s=i.getBoundingClientRect();return Math.min(1,Math.max(0,(o.clientX-s.left)/Math.max(1,s.width)))},n=o=>{t.seekFill.style.transform=`scaleX(${o.toFixed(4)})`;let s=V();s>0&&(t.curTime.textContent=Ye(s*o))};i.addEventListener("pointerdown",o=>{o.preventDefault(),this.dragging=!0,i.setPointerCapture?.(o.pointerId),n(r(o));let s=l=>n(r(l)),a=l=>{this.dragging=!1,i.releasePointerCapture?.(l.pointerId),window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",a);let d=V();if(d>0){let c=d*r(l);this.seek(c),this.stage==="sync"&&this.moveCursorToTime(c)}};window.addEventListener("pointermove",s),window.addEventListener("pointerup",a,{once:!0})})}buildMenu(t){let i=$e("Save on this device");i.addEventListener("click",()=>this.save());let r=$e("Import file (.lrc / .txt / .json)");r.addEventListener("click",()=>this.pickFile());let n=$e("Export as file (.json)");n.addEventListener("click",()=>this.exportFile());let o=$e("Delete saved sync");return o.classList.add("ll-editor-menu-danger"),o.addEventListener("click",()=>void this.deleteSaved()),t.append(i,r,n,o),o}buildAccountChip(){let t=m("button","ll-editor-account-chip");return t.type="button",t.addEventListener("click",()=>Yt()),q(t,"Sign in to upload"),this.accountChip=t,this.updateAccountChip(),t}updateAccountChip(){let t=this.accountChip;if(!t)return;let i=nt();t.classList.toggle("is-authed",!!i);let r=m("span","ll-editor-account-icon");r.innerHTML=C.account;let n=m("span","ll-editor-account-name");n.textContent=i?i.username:"Sign in",t.replaceChildren(r,n);let o=i?`Signed in as ${i.username}`:"Sign in to upload";t.setAttribute("aria-label",o),t.dataset.tooltip=o}async publishToCommunity(){if(this.refs?.menu.classList.remove("open"),md(this.draft.trackUri)){await this.showLocalTrackNotice();return}if(this.stage==="text"&&this.commitText(),this.draft.lines.length===0){N("Add some lyrics first (Text step).");return}let t=this.targets.map(r=>this.targetTime(r)),i=t.filter(r=>r!=null).length;if(i>0&&i<t.length){N(`Sync incomplete (${i}/${t.length}) - finish syncing before publishing.`);return}if(!String(this.draft.credit??"").trim()){N("Add a credit (your name) in the Text step before publishing."),this.setStage("text"),this.overlay?.querySelector(".ll-editor-credit-input")?.focus();return}if(!Mt()){N("Sign in to publish your sync."),Yt(()=>void this.publishToCommunity());return}fs(this.draft);try{let n=(await Wr({trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,lyrics:ue(this.draft),draft:this.draft})).status==="pending"?"Uploaded - waiting for a moderator to approve it. Thanks!":"Uploaded to the community.";this.close(),N(n)}catch(r){N(it(r))}}async showLocalTrackNotice(){if(this.confirmResolve)return;await this.showConfirm({title:"Local files can't be published",message:"This song is a local file, so it has no Spotify track id - other listeners could never be matched to it. You can still keep the sync for yourself: \u201CSave on this device\u201D in the \u22EE menu stores it locally and it shows up whenever you play this file.",confirm:"Save on this device",cancel:"Close"})&&this.save()}async openSubmissions(){if(this.refs?.menu.classList.remove("open"),this.submissionsOverlay)return;if(!Mt()){N("Sign in to see your submissions."),Yt(()=>void this.openSubmissions());return}let t=m("div","ll-editor-submissions"),i=m("div","ll-editor-submissions-dialog"),r=m("header","ll-editor-submissions-header"),n=m("div","ll-editor-submissions-titles"),o=m("h3","ll-editor-submissions-title");o.textContent="My submissions";let s=m("div","ll-editor-submissions-sub");s.textContent=`Signed in as ${nt()?.username??""}`,n.append(o,s);let a=m("div","ll-editor-submissions-list"),l=fe("ll-editor-icon-btn",C.refresh,"Reload");l.addEventListener("click",()=>void c());let d=fe("ll-editor-icon-btn",C.close,"Close");d.addEventListener("click",()=>this.closeSubmissions()),r.append(n,l,d),i.append(r,a),t.appendChild(i),t.addEventListener("click",u=>{u.target===t&&this.closeSubmissions()}),document.body.appendChild(t),requestAnimationFrame(()=>t.classList.add("visible")),this.submissionsOverlay=t;let c=async()=>{a.replaceChildren(Xi("Loading\u2026")),l.disabled=!0;try{let u=await Kr();if(!this.submissionsOverlay)return;a.replaceChildren(...u.length?u.map(h=>yd(h)):[Xi("You haven't published any syncs yet.")])}catch(u){if(!this.submissionsOverlay)return;a.replaceChildren(Xi(it(u)))}finally{l.disabled=!1}};c()}closeSubmissions(){let t=this.submissionsOverlay;t&&(this.submissionsOverlay=null,t.classList.remove("visible"),setTimeout(()=>t.remove(),200))}buildTransport(){let t=m("footer","ll-editor-transport"),i=fe("ll-editor-play-btn",C.play,"Play/Pause");i.addEventListener("click",()=>this.togglePlayback());let r=m("span","ll-editor-time ll-editor-time-cur");r.textContent="0:00";let n=m("span","ll-editor-time ll-editor-time-dur");n.textContent="0:00";let o=m("div","ll-editor-seek-track"),s=m("div","ll-editor-seek-bar"),a=m("div","ll-editor-seek-fill");return s.appendChild(a),o.appendChild(s),t.append(i,r,o,n),{el:t,playBtn:i,track:o,fill:a,cur:r,dur:n}}show(){if(this.overlay){this.overlay.classList.add("visible"),window.addEventListener("resize",this.onViewportResize),this.updateControlsInset(),window.addEventListener("keydown",this.onKeyDown,!0);try{Spicetify.Player?.addEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat=wd(),cs(2),this.prevProgress=0,this.unsubscribeClock??(this.unsubscribeClock=$t(this.onTick)),this.onAuthChange=()=>this.updateAccountChip(),window.addEventListener(St,this.onAuthChange),Vr().then(()=>this.updateAccountChip()),window.dispatchEvent(new Event(Gt))}}close(){window.removeEventListener("keydown",this.onKeyDown,!0),window.removeEventListener("resize",this.onViewportResize),this.onAuthChange&&(window.removeEventListener(St,this.onAuthChange),this.onAuthChange=null),Jt(),this.closeSubmissions();try{Spicetify.Player?.removeEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat!=null&&cs(this.prevRepeat),this.prevRepeat=null,this.unsubscribeClock?.(),this.unsubscribeClock=null,this.previewView?.destroy(),this.previewView=null,this.overlay?.classList.remove("visible"),this.overlay?.remove(),this.overlay=null,this.refs=null,window.dispatchEvent(new Event(Gt))}async requestClose(){this.confirmResolve||this.isDirty()&&!await this.showConfirm({title:"Discard changes?",message:"You have unsaved changes. Closing the editor will lose them.",confirm:"Discard",cancel:"Keep editing",danger:!0})||this.close()}togglePlayback(){if(!X()){let t=V();t>0&&yt()>=t-500&&this.seek(0)}ms()}seek(t){let i=performance.now();if(this.suppressLoopUntil=i+fd,this.suppressFillUntil=i+320,this.refs){let r=V(),n=r>0?Math.min(1,Math.max(0,t/r)):0;this.refs.seekFill.style.transform=`scaleX(${n.toFixed(4)})`,this.refs.curTime.textContent=Ye(t)}bt(t)}isDirty(){return tr(this.draft)!==this.savedSignature}showConfirm(t){return new Promise(i=>{let r=m("div","ll-editor-confirm"),n=m("div","ll-editor-confirm-dialog"),o=m("h3","ll-editor-confirm-title");o.textContent=t.title;let s=m("p","ll-editor-confirm-message");s.textContent=t.message;let a=m("div","ll-editor-confirm-actions"),l=m("button","ll-editor-confirm-btn ll-editor-confirm-cancel");l.type="button",l.textContent=t.cancel;let d=m("button","ll-editor-confirm-btn ll-editor-confirm-accept");d.type="button",d.textContent=t.confirm,d.classList.toggle("ll-editor-confirm-danger",!!t.danger),a.append(l,d),n.append(o,s,a),r.appendChild(n),document.body.appendChild(r),requestAnimationFrame(()=>r.classList.add("visible")),l.addEventListener("click",()=>this.resolveConfirm(!1)),d.addEventListener("click",()=>this.resolveConfirm(!0)),r.addEventListener("click",c=>{c.target===r&&this.resolveConfirm(!1)}),this.confirmOverlay=r,this.confirmResolve=i,d.focus()})}resolveConfirm(t){let i=this.confirmResolve,r=this.confirmOverlay;this.confirmResolve=null,this.confirmOverlay=null,r&&(r.classList.remove("visible"),setTimeout(()=>r.remove(),200)),i?.(t)}setStage(t){this.stage==="text"&&t!=="text"&&this.commitText(),this.stage=t,this.refs?.stepButtons.forEach(i=>i.classList.toggle("active",i.dataset.stage===t)),this.previewView&&this.previewView.setEnabled(t==="preview"),this.refs&&(this.refs.body.replaceChildren(),t==="text"?this.renderTextStage():t==="sync"?this.renderSyncStage():this.renderPreviewStage())}setMode(t){this.draft.mode!==t&&(this.draft.mode=t,this.updateModeButtons(),this.rebuildTargets(),this.stage==="sync"?(this.refs?.body.replaceChildren(),this.renderSyncStage()):this.stage==="preview"&&this.refreshPreview())}updateModeButtons(){this.refs?.modeButtons.forEach(t=>t.classList.toggle("active",t.dataset.mode===this.draft.mode))}renderTextStage(){if(!this.refs)return;let t=m("div","ll-editor-text-stage"),i=m("div","ll-editor-hint");i.innerHTML="One line per lyric line. Blank line = separator. Put <b>#interlude</b> on its own line to add an instrumental interlude. Wrap a line in <b>[ ]</b> to make it a background sub-lyric of the line above (karaoke). Long pauses are detected as interludes automatically.";let r=m("textarea","ll-editor-textarea");r.spellcheck=!1,r.placeholder="Paste or type the song's lyrics here - one line per lyric line.",r.value=Go(this.draft.lines),r.addEventListener("input",()=>this.updateTextStats(r.value,l));let n=m("label","ll-editor-credit-row"),o=m("span","ll-editor-credit-label");o.textContent="Credit";let s=m("input","ll-editor-credit-input");s.type="text",s.maxLength=60,s.placeholder="Your name/handle - required to publish, shown as \u201CMade by \u2026\u201D",s.value=this.draft.credit??"",s.addEventListener("input",()=>{this.draft.credit=s.value,this.draft.updatedAt=Date.now()}),n.append(o,s);let a=m("div","ll-editor-text-footer"),l=m("div","ll-editor-text-stats"),d=m("button","ll-editor-primary-btn");d.type="button",d.textContent="Continue to sync \u2192",d.addEventListener("click",()=>this.setStage("sync")),a.append(l,d),t.append(i,r,n,a),this.refs.body.appendChild(t),this.updateTextStats(r.value,l),r.focus()}updateTextStats(t,i){let r=ce(t),n=r.filter(s=>s.kind==="lyric").length,o=r.filter(s=>s.kind==="interlude").length;i.textContent=`${n} lines \xB7 ${o} interludes`}commitText(){let t=this.overlay?.querySelector(".ll-editor-textarea");if(!t)return;let i=ce(t.value);this.draft.lines=Td(this.draft.lines,i),this.draft.updatedAt=Date.now(),this.rebuildTargets()}renderSyncStage(){if(!this.refs)return;let t=m("div","ll-editor-sync-stage"),i=m("div","ll-editor-sync-bar"),r=m("button","ll-editor-tap-btn");r.type="button",r.innerHTML="<b>Set cue</b><span>Right Alt</span>",r.addEventListener("click",()=>this.tap());let n=m("div","ll-editor-sync-hint");n.innerHTML="Play and tap to the beat. <b>Right Alt</b> sets the next cue \xB7 <b>\u232B</b> back \xB7 <b>\u2190/\u2192</b> \xB1100 ms (Shift \xB1300) \xB7 <b>Del</b> clear.";let o=m("div","ll-editor-sync-status");i.append(r,n,this.buildOffsetGroup(),o);let s=m("div","ll-editor-lines");t.append(i,s),this.refs.body.appendChild(t),this.renderSyncList()}renderSyncList(t=!0){let i=this.overlay?.querySelector(".ll-editor-lines");if(!i)return;let r=t?null:i.scrollTop;i.replaceChildren(),this.currentRowEl=null;let n=this.targets[this.cursor],o=n&&n.kind!=="end"?n.lineIndex:-1;this.draft.lines.forEach((s,a)=>{let l=m("div","ll-editor-line");l.dataset.lineIndex=String(a);let d=s.kind==="interlude";l.classList.toggle("is-interlude",d),l.classList.toggle("is-synced",s.start!=null);let c=o===a&&(n?.kind==="line"||this.draft.mode==="word");n?.kind==="line"&&o===a&&(l.classList.add("is-current"),this.currentRowEl=l);let u=m("div","ll-editor-line-index");u.innerHTML=d?C.note:String(Ld(this.draft.lines,a));let h=m("div","ll-editor-line-main");d?(h.textContent="Interlude",h.classList.add("ll-editor-line-interlude-text")):this.draft.mode==="word"?h.appendChild(this.buildTokenRow(s,a,n)):h.textContent=s.text;let p=m("div","ll-editor-line-time");p.textContent=Je(s.start);let w=m("div","ll-editor-line-controls");w.append(W(C.chevronsLeft,"\u2212300 ms",()=>this.nudgeLine(a,-wt)),W(C.chevronLeft,"\u2212100 ms",()=>this.nudgeLine(a,-xt)),W(C.chevronRight,"+100 ms",()=>this.nudgeLine(a,xt)),W(C.chevronsRight,"+300 ms",()=>this.nudgeLine(a,wt)),W(C.jump,"Play from here",()=>this.jumpToLine(a)),W(C.clear,"Clear timing",()=>this.clearLine(a))),l.append(u,h,p,w),l.addEventListener("click",T=>{T.target.closest(".ll-editor-line-controls, .ll-editor-token")||this.selectLine(a)}),c&&this.draft.mode==="word"&&!this.currentRowEl&&(this.currentRowEl=l),i.appendChild(l)}),this.renderEndRow(i,n),this.updateSyncStatus(),t?this.scrollCurrentIntoView():r!=null&&(i.scrollTop=r)}renderEndRow(t,i){let r=this.targets.findIndex(d=>d.kind==="end");if(r<0)return;let n=m("div","ll-editor-line ll-editor-end-row");n.classList.toggle("is-synced",this.draft.endMs!=null),i?.kind==="end"&&(n.classList.add("is-current"),this.currentRowEl=n);let o=m("div","ll-editor-line-index");o.innerHTML=C.finish;let s=m("div","ll-editor-line-main ll-editor-line-interlude-text");s.textContent="End of lyrics";let a=m("div","ll-editor-line-time");a.textContent=Je(this.draft.endMs);let l=m("div","ll-editor-line-controls");l.append(W(C.chevronsLeft,"\u2212300 ms",()=>this.nudgeEnd(-wt)),W(C.chevronLeft,"\u2212100 ms",()=>this.nudgeEnd(-xt)),W(C.chevronRight,"+100 ms",()=>this.nudgeEnd(xt)),W(C.chevronsRight,"+300 ms",()=>this.nudgeEnd(wt)),W(C.jump,"Play from here",()=>this.jumpEnd()),W(C.clear,"Clear end",()=>this.clearEnd())),n.append(o,s,a,l),n.addEventListener("click",d=>{d.target.closest(".ll-editor-line-controls")||(this.cursor=r,this.draft.endMs!=null&&this.seek(this.draft.endMs),this.renderSyncList(!1))}),t.appendChild(n)}buildTokenRow(t,i,r){let n=m("div","ll-editor-token-block");if(t.kind!=="lyric")return n;let o=m("div","ll-editor-tokens");return t.tokens.forEach((s,a)=>{let l=r?.kind==="token"&&r.lineIndex===i&&r.tokenIndex===a;o.appendChild(this.tokenChip(s.text,s.start!=null,l,()=>this.selectToken(i,a)))}),o.appendChild(this.endChip(t.end!=null,r?.kind==="lineEnd"&&r.lineIndex===i,"Line end",()=>this.selectLineEnd(i))),n.appendChild(o),t.backgrounds.forEach((s,a)=>{let l=m("div","ll-editor-tokens ll-editor-bg-tokens");s.tokens.forEach((d,c)=>{let u=r?.kind==="bgToken"&&r.lineIndex===i&&r.bgIndex===a&&r.tokenIndex===c;l.appendChild(this.tokenChip(d.text,d.start!=null,u,()=>this.selectBgToken(i,a,c)))}),l.appendChild(this.endChip(s.end!=null,r?.kind==="bgEnd"&&r.lineIndex===i&&r.bgIndex===a,"Sub-lyric end",()=>this.selectBgEnd(i,a))),n.appendChild(l)}),n}tokenChip(t,i,r,n){let o=m("span","ll-editor-token");return o.textContent=t,o.classList.toggle("is-synced",i),r&&o.classList.add("is-current"),o.addEventListener("click",s=>{s.stopPropagation(),n()}),o}endChip(t,i,r,n){let o=m("span","ll-editor-token ll-editor-lineend-chip");return o.innerHTML=C.finish,o.setAttribute("aria-label",r),q(o,r),o.classList.toggle("is-synced",t),i&&o.classList.add("is-current"),o.addEventListener("click",s=>{s.stopPropagation(),n()}),o}selectLineEnd(t){let i=this.targets.findIndex(n=>n.kind==="lineEnd"&&n.lineIndex===t);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let r=this.draft.lines[t];r?.kind==="lyric"&&r.end!=null&&this.previewTime(r.end,pe)}selectBgToken(t,i,r){let n=this.targets.findIndex(s=>s.kind==="bgToken"&&s.lineIndex===t&&s.bgIndex===i&&s.tokenIndex===r);if(n<0)return;this.cursor=n,this.renderSyncList(!1);let o=this.backgroundAt(t,i)?.tokens[r];o?.start!=null&&this.previewTime(o.start,pe)}selectBgEnd(t,i){let r=this.targets.findIndex(o=>o.kind==="bgEnd"&&o.lineIndex===t&&o.bgIndex===i);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.backgroundAt(t,i);n?.end!=null&&this.previewTime(n.end,pe)}backgroundAt(t,i){let r=this.draft.lines[t];return r?.kind==="lyric"?r.backgrounds[i]:void 0}updateSyncStatus(){let t=this.overlay?.querySelector(".ll-editor-sync-status");if(!t)return;let i=this.targets.length,r=this.targets.filter(n=>this.targetTime(n)!=null).length;t.textContent=`${r}/${i} synced`}scrollCurrentIntoView(){this.currentRowEl?.scrollIntoView({block:"center",behavior:"smooth"})}tap(){let t=this.targets[this.cursor];t&&(this.setTargetTime(t,Math.round(yt())),this.cursor+=1,this.afterSyncChange())}undo(){this.cursor>0&&(this.cursor-=1);let t=this.targets[this.cursor];t&&this.clearTargetTime(t),this.afterSyncChange()}buildOffsetGroup(){let t=m("div","ll-editor-offset-group"),i=m("span","ll-editor-offset-label");i.textContent="Shift all";let r=[{icon:C.chevronsLeft,delta:-wt},{icon:C.chevronLeft,delta:-xt},{icon:C.chevronRight,delta:xt},{icon:C.chevronsRight,delta:wt}];return t.append(i,...r.map(({icon:n,delta:o})=>W(n,`Shift every timing ${o>0?"+":"-"}${Math.abs(o)} ms`,()=>this.shiftAll(o)))),t}shiftAll(t){if(this.targets.map(s=>this.targetTime(s)).filter(s=>s!=null).length===0){N("Nothing is synced yet - nothing to shift.");return}let r=0,n=s=>{let a=s+t;return a<0&&r++,Math.max(0,a)};for(let s of this.draft.lines)if(s.start!=null&&(s.start=n(s.start)),s.kind==="lyric"){s.end!=null&&(s.end=n(s.end));for(let a of s.tokens)a.start!=null&&(a.start=n(a.start));for(let a of s.backgrounds){a.start!=null&&(a.start=n(a.start)),a.end!=null&&(a.end=n(a.end));for(let l of a.tokens)l.start!=null&&(l.start=n(l.start))}}this.draft.endMs!=null&&(this.draft.endMs=n(this.draft.endMs)),this.afterSyncChange(!1);let o=r?` (${r} held at 0:00)`:"";N(`Shifted every timing by ${t>0?"+":""}${t} ms${o}.`)}nudgeCurrent(t){let i=this.targets[this.cursor];if(!i)return;let r=this.targetTime(i);if(r==null)return;let n=Math.max(0,r+t);this.setTargetTime(i,n),this.draft.updatedAt=Date.now(),this.refreshTimes();let o=i.kind!=="line"&&i.kind!=="end";this.previewTime(n,o?pe:os)}clearCurrent(){let t=this.targets[this.cursor];t&&this.clearTargetTime(t),this.afterSyncChange()}nudgeLine(t,i){let r=this.targets[this.cursor];if(this.draft.mode==="word"&&r&&r.kind!=="end"&&r.kind!=="line"&&r.lineIndex===t&&this.targetTime(r)!=null){this.nudgeCurrent(i);return}let n=this.draft.lines[t];if(!n||n.start==null)return;let o=Math.max(0,n.start+i);this.shiftLine(n,o-n.start),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(o)}jumpToLine(t){let i=this.draft.lines[t];i?.start!=null&&this.seek(i.start)}nudgeEnd(t){this.draft.endMs!=null&&(this.draft.endMs=Math.max(0,this.draft.endMs+t),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(this.draft.endMs))}jumpEnd(){this.draft.endMs!=null&&this.seek(this.draft.endMs)}refreshTimes(){let t=this.overlay?.querySelector(".ll-editor-lines");if(!t)return;this.draft.lines.forEach((r,n)=>{let o=t.querySelector(`.ll-editor-line[data-line-index="${n}"]`);if(!o)return;o.classList.toggle("is-synced",r.start!=null);let s=o.querySelector(".ll-editor-line-time");s&&(s.textContent=Je(r.start))});let i=t.querySelector(".ll-editor-end-row");if(i){i.classList.toggle("is-synced",this.draft.endMs!=null);let r=i.querySelector(".ll-editor-line-time");r&&(r.textContent=Je(this.draft.endMs))}this.updateSyncStatus()}previewTime(t,i=os){this.seek(Math.max(0,t-i)),xd()}moveCursorToTime(t){let i=-1;this.targets.forEach((r,n)=>{let o=this.targetTime(r);o!=null&&o<=t+60&&(i=n)}),this.cursor=i>=0?i:0,this.renderSyncList()}clearEnd(){this.draft.endMs=null,this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1)}clearLine(t){let i=this.draft.lines[t];i&&(i.start=null,i.kind==="lyric"&&(i.tokens.forEach(r=>r.start=null),i.end=null,i.backgrounds.forEach(r=>{r.start=null,r.end=null,r.tokens.forEach(n=>n.start=null)})),this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1))}selectLine(t){let i=this.targets.findIndex(n=>n.kind!=="end"&&n.lineIndex===t);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let r=this.draft.lines[t];r?.start!=null&&this.previewTime(r.start)}selectToken(t,i){let r=this.targets.findIndex(s=>s.kind==="token"&&s.lineIndex===t&&s.tokenIndex===i);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.draft.lines[t],o=n?.kind==="lyric"?n.tokens[i]:void 0;o?.start!=null&&this.previewTime(o.start,pe)}afterSyncChange(t=!0){this.draft.updatedAt=Date.now(),this.renderSyncList(t)}rebuildTargets(){let t=[];this.draft.lines.forEach((i,r)=>{this.draft.mode==="line"||i.kind==="interlude"?t.push({kind:"line",lineIndex:r}):(i.tokens.forEach((n,o)=>t.push({kind:"token",lineIndex:r,tokenIndex:o})),t.push({kind:"lineEnd",lineIndex:r}),i.backgrounds.forEach((n,o)=>{n.tokens.forEach((s,a)=>t.push({kind:"bgToken",lineIndex:r,bgIndex:o,tokenIndex:a})),t.push({kind:"bgEnd",lineIndex:r,bgIndex:o})}))}),this.draft.mode==="line"&&this.draft.lines.some(i=>i.kind==="lyric")&&t.push({kind:"end"}),this.targets=t,this.cursor=this.firstUnsetTarget()}firstUnsetTarget(){let t=this.targets.findIndex(i=>this.targetTime(i)==null);return t<0?Math.max(0,this.targets.length-1):t}targetTime(t){if(t.kind==="end")return this.draft.endMs;let i=this.draft.lines[t.lineIndex];if(!i)return null;if(t.kind==="line")return i.start;if(i.kind!=="lyric")return null;if(t.kind==="lineEnd")return i.end;if(t.kind==="token")return i.tokens[t.tokenIndex]?.start??null;let r=i.backgrounds[t.bgIndex];return r?t.kind==="bgEnd"?r.end:r.tokens[t.tokenIndex]?.start??null:null}setTargetTime(t,i){if(t.kind==="end"){this.draft.endMs=i;return}let r=this.draft.lines[t.lineIndex];if(!r)return;if(t.kind==="line"){r.start=i;return}if(r.kind!=="lyric")return;if(t.kind==="lineEnd"){r.end=i;return}if(t.kind==="token"){let s=r.tokens[t.tokenIndex];if(!s)return;s.start=i,r.start=us(r);return}let n=r.backgrounds[t.bgIndex];if(!n)return;if(t.kind==="bgEnd"){n.end=i;return}let o=n.tokens[t.tokenIndex];o&&(o.start=i,n.start=ps(n))}clearTargetTime(t){if(t.kind==="end"){this.draft.endMs=null;return}let i=this.draft.lines[t.lineIndex];if(!i)return;if(t.kind==="line"){i.start=null;return}if(i.kind!=="lyric")return;if(t.kind==="lineEnd"){i.end=null;return}if(t.kind==="token"){let o=i.tokens[t.tokenIndex];o&&(o.start=null),i.start=us(i);return}let r=i.backgrounds[t.bgIndex];if(!r)return;if(t.kind==="bgEnd"){r.end=null;return}let n=r.tokens[t.tokenIndex];n&&(n.start=null),r.start=ps(r)}shiftLine(t,i){t.start!=null&&(t.start+=i),t.kind==="lyric"&&(t.tokens.forEach(r=>{r.start!=null&&(r.start+=i)}),t.end!=null&&(t.end+=i),t.backgrounds.forEach(r=>{r.start!=null&&(r.start+=i),r.tokens.forEach(n=>{n.start!=null&&(n.start+=i)}),r.end!=null&&(r.end+=i)}))}renderPreviewStage(){if(!this.refs)return;let t=m("div","ll-editor-preview-stage");if(!We(this.draft)){let o=m("div","ll-editor-preview-warn");o.textContent="Not everything is synced yet \u2014 the preview only shows what's already timed.",t.appendChild(o)}let i=m("div","ll-editor-preview-frame"),r=m("div","ll-editor-preview-scroll"),n=m("div","ll-editor-preview-lines");r.appendChild(n),i.appendChild(r),t.appendChild(i),this.refs.body.appendChild(t),this.previewView?.destroy(),this.previewView=new vt({container:n,scroller:r,variant:"panel",virtualize:!1,renderBackgrounds:!0,dotLiftPx:12}),this.refreshPreview(),this.previewView.setEnabled(!0)}refreshPreview(){if(this.previewView)try{this.previewView.setLyrics(ue(this.draft))}catch(t){console.error("[Liquid Lyrics] Preview build failed",t)}}save(){if(this.stage==="text"&&this.commitText(),this.draft.lines.length===0){N("Add some lyrics first (Text step).");return}let t=this.targets.map(r=>this.targetTime(r)),i=t.filter(r=>r!=null).length;if(i>0&&i<t.length){N(`Sync incomplete (${i}/${t.length}) \u2014 finish syncing, or clear all timings to save static lyrics.`);return}fs(this.draft);try{let r={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:ue(this.draft),draft:this.draft};tn(r),this.savedSignature=tr(this.draft),this.refs?.deleteItem.classList.remove("ll-hidden"),this.close(),N("Sync saved and activated.")}catch(r){console.error("[Liquid Lyrics] Save failed",r),N("Save failed (storage full?).")}}async deleteSaved(){if(this.refs?.menu.classList.remove("open"),!Qr(this.draft.trackUri)){N("No custom sync saved for this song.");return}this.confirmResolve||!await this.showConfirm({title:"Delete saved sync?",message:"This removes your custom sync for this song and restores the online lyrics.",confirm:"Delete",cancel:"Cancel",danger:!0})||(en(this.draft.trackUri),this.close(),N("Saved sync deleted."))}exportFile(){this.refs?.menu.classList.remove("open"),this.stage==="text"&&this.commitText();let t={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:ue(this.draft),draft:this.draft},i=`${this.draft.artist} - ${this.draft.title}`.replace(/[^\w\-]+/g,"_").slice(0,80);Ed(`${i||"liquid-lyrics"}.json`,JSON.stringify(t,null,2))}pickFile(){this.refs?.menu.classList.remove("open"),this.fileInput||(this.fileInput=document.createElement("input"),this.fileInput.type="file",this.fileInput.accept=".json,.lrc,.txt",this.fileInput.style.display="none",this.fileInput.addEventListener("change",()=>this.onFileChosen()),document.body.appendChild(this.fileInput)),this.fileInput.value="",this.fileInput.click()}async onFileChosen(){let t=this.fileInput?.files?.[0];if(!t)return;let i=await t.text(),r=ds(),n=t.name.toLowerCase();try{if(n.endsWith(".json")){let o=rn(i,r.trackUri);this.draft={...o.draft,durationMs:r.durationMs||o.draft.durationMs}}else if(n.endsWith(".lrc")){let o=is(i,r);if(!o)throw new Error("No timings found in the .lrc file");this.draft=o}else this.draft=es(i,r,this.draft.mode)}catch(o){N(`Import failed: ${o instanceof Error?o.message:"Invalid file"}`);return}this.updateModeButtons(),this.refs&&(this.refs.songLabel.textContent=`${this.draft.title} - ${this.draft.artist}`),this.rebuildTargets(),this.setStage(We(this.draft)?"preview":this.draft.lines.length?"sync":"text"),N("File imported.")}};Ze.SYNC_KEYS=new Set(["Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"]);var rr=Ze;function m(e,t){let i=document.createElement(e);return i.className=t,i}function fe(e,t,i){let r=m("button",e);return r.type="button",r.innerHTML=t,r.setAttribute("aria-label",i),q(r,i),r}function W(e,t,i){let r=m("button","ll-editor-line-btn");return r.type="button",r.innerHTML=e,r.setAttribute("aria-label",t),q(r,t),r.addEventListener("click",n=>{n.stopPropagation(),i()}),r}function $e(e){let t=m("button","ll-editor-menu-item");return t.type="button",t.textContent=e,t}function md(e){return/^spotify:local:/i.test(String(e??"").trim())}var gd={pending:{label:"In review",hint:"Waiting for a moderator."},published:{label:"Published",hint:"Live for everyone."},rejected:{label:"Rejected",hint:"Not published."},removed:{label:"Removed",hint:"Taken down after publishing."}};function yd(e){let t=m("div",`ll-editor-submission is-${e.status}`),i=m("div","ll-editor-submission-main"),r=m("div","ll-editor-submission-title");r.textContent=e.title||"(untitled)";let n=m("div","ll-editor-submission-meta");n.textContent=[e.artist,e.mode==="word"?"Karaoke":"Block",bd(e.createdAt)].filter(Boolean).join(" \xB7 "),i.append(r,n);let o=gd[e.status]??{label:e.status,hint:""},s=m("span","ll-editor-submission-status");s.textContent=o.label,q(s,o.hint);let a=m("div","ll-editor-submission-head");a.append(i,s),t.append(a);let l=String(e.reviewNote??"").trim();if(l){let d=m("div","ll-editor-submission-note");d.textContent=`Reason: ${l}`,t.append(d)}else if(e.status==="rejected"||e.status==="removed"){let d=m("div","ll-editor-submission-note is-muted");d.textContent="No reason was given.",t.append(d)}return t}function Xi(e){let t=m("div","ll-editor-submissions-empty");return t.textContent=e,t}function bd(e){let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleDateString()}function vd(e,t){e.dataset.icon!==t&&(e.dataset.icon=t,e.innerHTML=t)}function ms(){let e=Spicetify.Player;typeof e?.togglePlay=="function"&&e.togglePlay()}function Qi(){let e=Spicetify.Player;typeof e?.pause=="function"?e.pause():typeof e?.togglePlay=="function"&&X()&&e.togglePlay()}function xd(){X()||ms()}function as(e,t,i){return Number.isFinite(e)?Math.min(i,Math.max(t,e)):t}function ls(){return{width:as(parseInt(localStorage.getItem("liquify-tc-width")||"135",10),50,400),height:as(parseInt(localStorage.getItem("liquify-tc-height")||"64",10),20,300)}}function wd(){let e=Spicetify.Player;try{if(typeof e?.getRepeat=="function")return Number(e.getRepeat())||0}catch{}return null}function cs(e){let t=Spicetify.Player;try{typeof t?.setRepeat=="function"&&t.setRepeat(e)}catch{}}function ds(){let e=Spicetify.Player?.data?.item,t=String(e?.uri??""),i=Array.isArray(e?.artists)?e.artists.map(n=>n?.name).filter(Boolean).join(", "):"",r=e?.metadata??{};return{trackId:Bt(t),trackUri:t,title:e?.name||r.title||"Unknown title",artist:i||r.artist_name||r.artist||"Unknown artist",durationMs:V()}}function kd(){return{trackId:"",trackUri:"",title:"",artist:"",durationMs:0}}function us(e){if(e.kind!=="lyric")return e.start;let t=e.tokens.map(i=>i.start).filter(i=>i!=null);return t.length?Math.min(...t):null}function ps(e){let t=e.tokens.map(i=>i.start).filter(i=>i!=null);return t.length?Math.min(...t):null}function Ld(e,t){let i=0;for(let r=0;r<=t;r++)e[r].kind==="lyric"&&i++;return i}function fs(e){for(let t of e.lines){if(t.kind!=="lyric")continue;t.text=hs(t.text);let i=t.tokens[0];i&&(i.text=hs(i.text))}}function hs(e){let t=e.search(/\p{L}/u);return t<0?e:e.slice(0,t)+e[t].toUpperCase()+e.slice(t+1)}function Td(e,t){let i=new Map,r=[];for(let n of e)if(n.kind==="interlude")r.push(n);else{let o=i.get(n.text)??[];o.push(n),i.set(n.text,o)}return t.map(n=>{if(n.kind==="interlude"){let s=r.shift();return{kind:"interlude",start:s?s.start:null}}let o=i.get(n.text)?.shift();if(o&&o.kind==="lyric"){let s=n.tokens.map((l,d)=>({text:l.text,start:o.tokens[d]?.text===l.text?o.tokens[d].start:null})),a=n.backgrounds.map((l,d)=>{let c=o.backgrounds[d],u=c?.text===l.text;return{text:l.text,tokens:l.tokens.map((h,p)=>({text:h.text,start:u&&c.tokens[p]?.text===h.text?c.tokens[p].start:null})),start:u?c.start:null,end:u?c.end:null}});return{kind:"lyric",text:n.text,tokens:s,backgrounds:a,start:o.start,end:o.end}}return n})}function tr(e){return JSON.stringify({mode:e.mode,credit:e.credit??"",end:e.endMs,lines:e.lines.map(t=>t.kind==="interlude"?{i:t.start}:{t:t.text,s:t.start,e:t.end,w:t.tokens.map(i=>i.start),b:t.backgrounds.map(i=>({t:i.text,s:i.start,e:i.end,w:i.tokens.map(r=>r.start)}))})})}function Je(e){if(e==null||!Number.isFinite(e))return"\u2013:\u2013\u2013.\u2013\u2013\u2013";let t=Math.max(0,e),i=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3);return`${i}:${String(r).padStart(2,"0")}.${String(n).padStart(3,"0")}`}function Ye(e){let t=Math.max(0,Math.floor(e/1e3));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Ed(e,t){let i=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(i),n=document.createElement("a");n.href=r,n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(r),2e3)}var Ge=null;function N(e){let t=document.getElementById(er);if(t?.classList.contains("visible")){Sd(t,e);return}let i=Spicetify;typeof i?.showNotification=="function"?i.showNotification(e):console.log("[Liquid Lyrics]",e)}function Sd(e,t){let i=e.querySelector(".ll-editor-toast");i||(i=m("div","ll-editor-toast"),e.appendChild(i)),i.textContent=t,i.classList.remove("visible"),i.offsetWidth,i.classList.add("visible"),Ge&&clearTimeout(Ge),Ge=setTimeout(()=>{i?.classList.remove("visible"),Ge=null},3400)}var B="liquid-lyrics-panel",Ss="liquid-lyrics-song-card-visible",Ms="liquid-lyrics-animated-bg",he="liquify-bg-mode",Md=["liquify-floating-player","glowify-floating-player"],xe="liquid-lyrics:romanization",Cd="https://github.com/NMWplays/Liquid-Lyrics",Ad="https://discord.gg/xGUq5mhWKA",Rd=500,A=null,Qt=null,be=null,ti=null,or=0,gs="",ys="",ei=-1,sr=-1,bs=!1,vs=!1,xs=!1,ws=!1,ii=!0,Xt,Xe=!0,nr="",kt=null,Pt=!1,Q=[],F=0,ve=null,Qe=null,ks=!1;function te(){let e=document.getElementById(B);if(e)return e;let t=document.createElement("div");t.id=B,t.className="liquid-lyrics-panel";let i=document.createElement("div");i.className="liquid-lyrics-glass-bg";let r=qd(),n=Nd(),o=document.createElement("div");o.className="liquid-lyrics-header";let s=document.createElement("span");s.className="liquid-lyrics-title",s.textContent="Liquid Lyrics";let a=document.createElement("div");a.className="ll-header-actions",a.append(Ls("ll-header-btn ll-github-btn",Id,"Star on GitHub",Cd),Ls("ll-header-btn ll-discord-btn",_d,"Join the Discord",Ad)),o.append(s,a);let l=document.createElement("div");l.className="liquid-lyrics-view";let d=Pd(),c=document.createElement("div");c.className="liquid-lyrics-content",l.append(d,c);let u=Od();return t.append(r,i,n,o,l,u),qs(t),yr(t),gr(t),(document.querySelector(".Root__main-view")??document.body).appendChild(t),A=new vt({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:p=>{t.classList.toggle("ll-has-romanization",p),$()}}),Lt(),$(),bs||(bs=!0,document.addEventListener("fullscreenchange",iu)),xs||(xs=!0,window.addEventListener(xe,()=>{A?.setRomanized(U(),_()),$()})),ws||(ws=!0,window.addEventListener(Gt,()=>{qt()?(A?.setEnabled(!1),cr()):_()&&(A?.setEnabled(!0),lr())})),ks||(ks=!0,window.addEventListener(St,()=>$())),Jd(),t}function oi(){let e=te();ii=!0,e.classList.add("visible"),Lt(),$(),A?.setEnabled(!qt()),lr(),gr(e);let t=e.closest(".Root__main-view");if(t)for(let i of Array.from(t.children)){let r=i;r.id===B||!r.style||(r.dataset.liquidHidden===void 0&&(r.dataset.liquidHidden=`${r.style.opacity}|${r.style.pointerEvents}`),r.style.opacity="0",r.style.pointerEvents="none")}}function si(){let e=document.getElementById(B);if(!e)return;e.classList.remove("visible"),A?.setEnabled(!1),cr(),ci(e),mr();let t=e.closest(".Root__main-view");if(t)for(let i of Array.from(t.children)){let r=i;if(r.id===B||r.dataset.liquidHidden===void 0)continue;let[n="",o=""]=r.dataset.liquidHidden.split("|");r.style.opacity=n,r.style.pointerEvents=o,delete r.dataset.liquidHidden}}function Cs(){_()?si():oi()}function _(){return document.getElementById(B)?.classList.contains("visible")??!1}function As(e=_()){let t=te();e&&oi(),hr(t,"fullscreen"),ai(t)}function ar(e){if(te(),!A)return;if(Pt&&br(),Qt===e&&A.hasLyrics){A.setEnabled(_()&&!qt()),Lt();return}Qt=e,A.setLyrics(e);let t=U();A.setRomanized(t,t!=="off"),A.setEnabled(_()&&!qt()),Lt()}function we(e,t=!1){let i=te();if(!A)return;Qt=null,A.setLyrics(null),Lt();let r=document.createElement("div");r.className="liquid-lyrics-empty";let n=document.createElement("div");if(n.className="ll-empty-message",n.textContent=e,r.appendChild(n),t){let o=document.createElement("button");o.type="button",o.className="ll-empty-create-btn",o.textContent="Create your own sync",o.addEventListener("click",()=>Zt()),r.appendChild(o)}A.container.appendChild(r),i.classList.remove("ll-has-romanization"),$()}var Rs={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',cinema:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.4"/><path d="M3 9.2h18"/><path d="m7.2 5-1.7 4.2"/><path d="M12 5l-1.7 4.2"/><path d="m16.8 5-1.7 4.2"/></svg>',animatedBg:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M5 9.4c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/><path d="M5 15c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/></svg>',edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',report:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4.4h11l-2.2 3.6L16 11.6H5"/></svg>',review:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5.5" width="14" height="14" rx="2.4"/><path d="M9 4.2h6v2.6H9z"/><path d="m8.6 13 2 2 4-4"/></svg>'},Id='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',_d='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function Ls(e,t,i,r){let n=document.createElement("button");return n.type="button",n.className=e,n.setAttribute("aria-label",i),n.innerHTML=t,n.addEventListener("click",o=>{o.stopPropagation(),window.open(r,"_blank")}),q(n,i),n}function qd(){let e=document.createElement("div");e.className="liquid-lyrics-fullscreen-bg";for(let t=0;t<4;t++){let i=document.createElement("div");i.className="ll-fullscreen-bg-tile",e.appendChild(i)}return e}function Nd(){let e=document.createElement("div");return e.className="liquid-lyrics-transparent-controls",e.setAttribute("aria-hidden","true"),e}function Pd(){let e=document.createElement("aside");e.className="liquid-lyrics-song-card";let t=document.createElement("div");t.className="ll-song-card-cover-wrap";let i=document.createElement("img");i.className="ll-song-card-cover",i.alt="",i.decoding="async",i.loading="lazy",t.appendChild(i);let r=document.createElement("div");r.className="ll-song-card-controls",r.append(K("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>me(["toggleShuffle"])),K("ll-song-card-btn","previous","Previous",()=>me(["back","previous","skipToPrevious"])),K("ll-song-card-btn ll-song-card-play","play","Play",()=>{me(["togglePlay"]),window.setTimeout(Lt,60)}),K("ll-song-card-btn","next","Next",()=>me(["next","skipToNext"])),K("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>me(["toggleRepeat"])));let n=document.createElement("div");n.className="playback-bar ll-song-card-progress",n.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let o=document.createElement("div");o.className="ll-song-card-info";let s=document.createElement("div");s.className="ll-song-card-title";let a=document.createElement("button");a.type="button",a.className="ll-song-card-link ll-song-card-album",q(a,"Open album");let l=document.createElement("button");return l.type="button",l.className="ll-song-card-link ll-song-card-artist",q(l,"Open artist"),o.append(s,a,l),e.append(t,r,n,o),be={card:e,cover:i,title:s,album:a,artist:l,playButton:e.querySelector(".ll-song-card-play"),shuffleButton:e.querySelector(".ll-song-card-shuffle"),repeatButton:e.querySelector(".ll-song-card-repeat"),progressTrack:n.querySelector(".ll-card-progress-track"),progressFill:n.querySelector(".ll-card-progress-fill"),progressThumb:n.querySelector(".ll-card-progress-thumb"),currentTime:n.querySelector(".ll-card-current"),durationTime:n.querySelector(".ll-card-duration")},Bd(be),e}function Od(){let e=document.createElement("div");return e.className="liquid-lyrics-control-pill",e.append(K("ll-control-btn ll-card-toggle","cover","Song card",Gd),K("ll-control-btn ll-bg-toggle","animatedBg","Animated background",Zd),K("ll-control-btn ll-roman-toggle","roman","Romanization",Xd),K("ll-control-btn ll-edit-toggle","edit","Create / edit sync",()=>Zt()),K("ll-control-btn ll-report-toggle","report","Report this sync",su),K("ll-control-btn ll-review-toggle","review","Review submissions",au),K("ll-control-btn ll-cinema-toggle","cinema","Cinema mode",tu),K("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",eu)),e}function K(e,t,i,r){let n=document.createElement("button");return n.type="button",n.className=e,n.dataset.icon=t,n.setAttribute("aria-label",i),n.innerHTML=Rs[t],n.addEventListener("click",o=>{o.stopPropagation(),r()}),q(n,i),n}function Is(e,t){!e||e.dataset.icon===t||(e.dataset.icon=t,e.innerHTML=Rs[t])}function Lt(){let e=be;if(!e)return;let t=Hd();t.cover?(e.cover.src!==t.cover&&(e.cover.src=t.cover),e.card.classList.remove("ll-no-cover")):(e.cover.removeAttribute("src"),e.card.classList.add("ll-no-cover")),Yd(t.cover),e.title.textContent=t.title,e.album.textContent=t.album,e.album.disabled=!t.albumUri,e.album.onclick=()=>Ts(t.albumUri),e.artist.textContent=t.artist,e.artist.disabled=!t.artistUri,e.artist.onclick=()=>Ts(t.artistUri),ke(),Le()}function ke(){let e=be;if(!e)return;let t=X(),i=t?"Pause":"Play";Is(e.playButton,t?"pause":"play"),e.playButton.setAttribute("aria-label",i),e.playButton.dataset.tooltip=i,Nt(e.shuffleButton,Kd());let r=$d();Nt(e.repeatButton,r!=="off"),e.repeatButton.classList.toggle("ll-repeat-one",r==="track");let n=r==="track"?"Repeat one":r==="context"?"Repeat all":"Repeat";e.repeatButton.setAttribute("aria-label",n),e.repeatButton.dataset.tooltip=n}function lr(){ti||(or=0,ei=-1,sr=-1,ti=$t(zd),ke(),Le())}function cr(){ti?.(),ti=null}function zd(e,t){Le(e),t-or>=Rd&&(or=t,ke())}function Le(e=_s()){let t=be;if(!t)return;let i=V(),r=i>0?ni(e/i):0;if(!t.progressTrack.classList.contains("ll-previewing")&&Math.abs(r-ei)>2e-5){ei=r,t.progressFill.style.transform=`scaleX(${r.toFixed(5)})`,t.progressThumb.style.left=`${(r*100).toFixed(3)}%`;let a=Math.round(r*100);a!==sr&&(sr=a,t.progressTrack.setAttribute("aria-valuenow",String(a)),t.progressTrack.setAttribute("aria-valuetext",`${ye(e)} of ${ye(i)}`))}let o=ye(e);o!==gs&&(gs=o,t.currentTime.textContent=o);let s=ye(i);s!==ys&&(ys=s,t.durationTime.textContent=s)}function _s(){return fu(Spicetify.Player?.getProgress?.(),0)}function Bd(e){let t=e.progressTrack,i=t.querySelector(".ll-card-preview-time"),r=0,n=0,o=c=>{let u=t.getBoundingClientRect();return ni((c.clientX-u.left)/Math.max(1,u.width))},s=c=>{let u=V();u<=0||(t.classList.add("ll-previewing"),i&&(i.textContent=ye(u*c),i.style.left=`${c*100}%`),e.progressFill.style.transform=`scaleX(${c.toFixed(4)})`,e.progressThumb.style.left=`${(c*100).toFixed(2)}%`)},a=c=>(n=c,r||(r=requestAnimationFrame(()=>{r=0,s(n)})),c),l=()=>{t.dataset.dragging!=="true"&&(t.classList.remove("ll-previewing"),r&&(cancelAnimationFrame(r),r=0),ei=-1,Le())},d=c=>{let u=V();if(u<=0)return;let h=a(o(c));bt(u*h)};t.addEventListener("pointerenter",c=>a(o(c))),t.addEventListener("pointermove",c=>a(o(c))),t.addEventListener("pointerleave",l),t.addEventListener("blur",l),t.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),t.dataset.dragging="true",t.setPointerCapture?.(c.pointerId),a(o(c));let u=p=>a(o(p)),h=p=>{d(p),delete t.dataset.dragging,l(),t.releasePointerCapture?.(c.pointerId),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",h)};window.addEventListener("pointermove",u),window.addEventListener("pointerup",h,{once:!0})}),t.addEventListener("keydown",c=>{let u=V();if(u<=0)return;let h=_s(),p=c.shiftKey?15e3:5e3;c.key==="ArrowLeft"?(c.preventDefault(),bt(Math.max(0,h-p))):c.key==="ArrowRight"&&(c.preventDefault(),bt(Math.min(u,h+p)))})}function Hd(){let e=Spicetify.Player?.data?.item,t=e?.metadata??{},i=Array.isArray(e?.artists)?e.artists.map(n=>n?.name).filter(Boolean).join(", "):"",r=Array.isArray(e?.artists)?e.artists.find(n=>n?.uri):null;return{title:e?.name||t.title||t.track_name||"Unknown track",artist:i||t.artist_name||t.artist||t.album_artist_name||"Unknown artist",album:e?.album?.name||t.album_title||t.album_name||"Unknown album",cover:Dd(e,t),artistUri:r?.uri||Vd(t.artist_uri||t.artist_uris||""),albumUri:e?.album?.uri||t.album_uri||""}}function Dd(e,t){let i=[t.image_xlarge_url,t.image_large_url,t.image_url,t.album_image_url,t.cover_url,e?.album?.images?.[0]?.url,e?.images?.[0]?.url];for(let r of i){let n=Ud(String(r??""));if(n)return Fd(n)}return jd()}function Ud(e){return e?e.startsWith("spotify:image:")?e.replace("spotify:image:","https://i.scdn.co/image/"):e:""}function Fd(e){return e.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function jd(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function Vd(e){return String(e||"").split(",")[0]?.split(";")[0]?.trim()||""}function Ts(e){let t=Wd(e);if(!t)return;let i=Spicetify.Platform?.History;typeof i?.push=="function"&&(i.push(t),si())}function Wd(e){let t=String(e||"").split(":");if(t.length<3||t[0]!=="spotify")return"";let i=t[1],r=t[2];return!r||!["album","artist","track","playlist"].includes(i)?"":`/${i}/${r}`}function Kd(){let e=Spicetify.Player;if(typeof e?.getShuffle=="function")return!!e.getShuffle();let t=e?.data??{};return!!(t.shuffle??t.shuffling??t.options?.shuffling??t.playback_options?.shuffling??t.context?.metadata?.shuffle)}function $d(){let e=Spicetify.Player,t=e?.data??{},i=typeof e?.getRepeat=="function"?e.getRepeat():t.repeat??t.repeatMode??t.repeat_mode??t.options?.repeat??t.playback_options?.repeat??t.context?.metadata?.repeat;if(t.options?.repeatingTrack||t.playback_options?.repeating_track)return"track";if(t.options?.repeatingContext||t.playback_options?.repeating_context)return"context";if(typeof i=="number")return i===2?"track":i===1?"context":"off";let r=String(i??"").toLowerCase();return r.includes("track")||r.includes("song")||r==="one"?"track":r.includes("context")||r.includes("all")||r==="playlist"||r==="on"?"context":"off"}function Jd(){vs||(vs=!0,["songchange","onplaypause","onqueuechange"].forEach(e=>{try{Spicetify.Player?.addEventListener?.(e,()=>{ke(),Le()})}catch{}}))}function me(e){let t=Spicetify.Player;for(let i of e)if(typeof t?.[i]=="function"){t[i](),window.setTimeout(Lt,80),window.setTimeout(ke,180);return}}function Yd(e){let i=document.getElementById(B)?.querySelector(".liquid-lyrics-fullscreen-bg");if(!i)return;let r=i.querySelectorAll(".ll-fullscreen-bg-tile");if(r.length<4)return;if(!e){r.forEach(l=>l.classList.remove("active")),nr="";return}if(e===nr)return;nr=e;let n=[r[0],r[1]],o=[r[2],r[3]],s=Xe?n:o,a=Xe?o:n;s.forEach(l=>{l.style.backgroundImage=`url("${e}")`,l.classList.add("active")}),a.forEach(l=>l.classList.remove("active")),Xe=!Xe}function ye(e){let t=Math.max(0,Math.floor(e/1e3)),i=Math.floor(t/60),r=t%60;return`${i}:${String(r).padStart(2,"0")}`}function Gd(){localStorage.setItem(Ss,String(!ur())),$()}function dr(){return localStorage.getItem(Ms)==="true"}function Zd(){localStorage.setItem(Ms,String(!dr())),$()}function Xd(){let e=U(),t=A?.hasJapanese??!1;Re(e==="off"?"romaji":e==="romaji"&&t?"furigana":"off"),window.dispatchEvent(new Event(xe)),$()}function Qd(e){return e==="romaji"?"Romanization: Romaji":e==="furigana"?"Romanization: Furigana":"Romanization"}function tu(){let e=document.getElementById(B);e&&(pr(e)?ci(e):hr(e,"cinema"),ai(e))}function eu(){let e=document.getElementById(B);e&&(li(e)?ci(e):hr(e,"fullscreen"),ai(e))}function ai(e){ot(),$(),mr(),yr(e),gr(e)}function qs(e){e.classList.toggle("ll-song-card-hidden",!ur()),e.classList.toggle("ll-romanized",U()==="romaji"),e.classList.toggle("ll-animated-bg",dr())}function $(){let e=document.getElementById(B);if(!e)return;let t=U(),i=fr(e);qs(e),Nt(e.querySelector(".ll-card-toggle"),ur()),Nt(e.querySelector(".ll-roman-toggle"),t!=="off"),Nt(e.querySelector(".ll-cinema-toggle"),pr(e)),Nt(e.querySelector(".ll-fullscreen-toggle"),li(e));let r=e.querySelector(".ll-bg-toggle");r&&(r.hidden=i,r.disabled=i,Nt(r,i||dr()));let n=e.querySelector(".ll-roman-toggle"),o=e.classList.contains("ll-has-romanization");if(n){n.hidden=!o,n.disabled=!o,Is(n,t==="furigana"?"furigana":"roman");let l=Qd(t);n.dataset.tooltip=l,n.setAttribute("aria-label",l),o||ot()}let s=e.querySelector(".ll-report-toggle");if(s){let l=!Pt&&!!Ns();s.hidden=!l,s.disabled=!l}let a=e.querySelector(".ll-review-toggle");if(a){let l=!Pt&&ki();a.hidden=!l,a.disabled=!l}}function Nt(e,t){e&&(e.classList.toggle("active",t),e.setAttribute("aria-pressed",String(t)))}function ur(){return localStorage.getItem(Ss)!=="false"}function iu(){ot();let e=document.getElementById(B);e&&document.fullscreenElement!==e&&e.classList.contains("ll-native-fullscreen")&&ci(e),$(),mr(),e&&yr(e)}function pr(e){return e.classList.contains("ll-fullscreen-mode")}function li(e){return document.fullscreenElement===e}function fr(e){return pr(e)||li(e)}function ru(e){!kt&&e.parentNode&&(kt=document.createComment("liquid-lyrics-fullscreen-placeholder"),e.parentNode.insertBefore(kt,e));let t=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==e?document.fullscreenElement:document.body;e.parentElement!==t&&t.appendChild(e)}function nu(e){kt?.parentNode&&(kt.parentNode.insertBefore(e,kt),kt.remove()),kt=null}function hr(e,t){if(fr(e)||(ii=_(),e.classList.contains("visible")||(e.classList.add("visible"),Lt(),A?.setEnabled(!0),lr())),ru(e),t==="cinema"){document.fullscreenElement===e&&document.exitFullscreen?.(),e.classList.remove("ll-native-fullscreen"),e.classList.add("ll-fullscreen-mode");return}e.classList.remove("ll-fullscreen-mode"),e.classList.add("ll-native-fullscreen");let i=e.requestFullscreen?.();i&&typeof i.catch=="function"&&i.catch(()=>{li(e)||(e.classList.remove("ll-native-fullscreen"),e.classList.add("ll-fullscreen-mode"),ai(e))})}function ci(e){let t=e.classList.contains("ll-fullscreen-mode")||e.classList.contains("ll-native-fullscreen"),i=!ii&&t;e.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===e&&document.exitFullscreen?.(),nu(e),i&&(e.classList.remove("visible"),A?.setEnabled(!1),cr()),ii=!0}function mr(){let e=document.getElementById(B);if(!!(e&&fr(e))){Xt===void 0&&(Xt=localStorage.getItem(he)),localStorage.getItem(he)!=="animated"&&(localStorage.setItem(he,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}Xt!==void 0&&(Xt===null?localStorage.removeItem(he):localStorage.setItem(he,Xt),Xt=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function gr(e=document.getElementById(B)){if(!e)return;let t=Md.some(i=>localStorage.getItem(i)==="on");e.classList.toggle("ll-liquify-floating-player",t)}function yr(e=document.getElementById(B)){if(!e)return;let t=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),i=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);e.style.setProperty("--ll-transparent-controls-width",`${ni(t,50,400)}px`),e.style.setProperty("--ll-transparent-controls-height",`${ni(i,20,300)}px`)}function Tt(e){let t=Spicetify;typeof t.showNotification=="function"&&t.showNotification(e)}function Ns(){return Qt?.Provider!=="community"?"":String(Qt?.LiquidLyricsCommunitySyncId??"")}var ou=["Wrong timing","Wrong text / lyrics","Offensive / inappropriate","Spam or troll","Other"];function su(){let e=Ns();if(e){if(ot(),!Mt()){Yt(()=>Es(e));return}Es(e)}}function Es(e){let t=document.createElement("div");t.className="ll-editor-auth ll-report-dialog";let i=document.createElement("div");i.className="ll-editor-auth-dialog",t.appendChild(i),document.body.appendChild(t);let r=()=>{t.classList.remove("visible"),setTimeout(()=>t.remove(),280)};t.addEventListener("click",w=>{w.target===t&&r()}),t.addEventListener("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),r())});let n=document.createElement("h3");n.className="ll-editor-auth-title",n.textContent="Report this sync";let o=document.createElement("p");o.className="ll-editor-auth-subtitle",o.textContent="Tell the moderators what's wrong with it.";let s=document.createElement("div");s.className="ll-report-reasons";let a="",l=[];for(let w of ou){let T=document.createElement("button");T.type="button",T.className="ll-report-reason",T.textContent=w,T.addEventListener("click",()=>{a=w,l.forEach(S=>S.classList.toggle("selected",S===T)),c.textContent=""}),l.push(T),s.appendChild(T)}let d=document.createElement("textarea");d.className="ll-report-detail",d.rows=2,d.maxLength=400,d.placeholder="Optional details...";let c=document.createElement("div");c.className="ll-editor-auth-error";let u=document.createElement("div");u.className="ll-editor-auth-actions";let h=document.createElement("button");h.type="button",h.className="ll-editor-auth-btn ll-editor-auth-secondary",h.textContent="Cancel",h.addEventListener("click",r);let p=document.createElement("button");p.type="button",p.className="ll-editor-auth-btn ll-editor-auth-primary",p.textContent="Send report",p.addEventListener("click",async()=>{if(!a){c.textContent="Pick a reason.";return}let w=d.value.trim(),T=w?`${a}: ${w}`:a;p.disabled=!0;try{await $r(e,T),r(),Tt("Report sent. Thanks!")}catch(S){c.textContent=it(S),p.disabled=!1}}),u.append(h,p),i.append(n,o,s,d,c,u),requestAnimationFrame(()=>t.classList.add("visible"))}function au(){ot(),lu()}async function lu(){let e=document.getElementById(B);if(!e||!A||Pt||!ki())return;let t=Bt(Kt());if(!t)return;let i;try{i=await Jr(t)}catch(r){Tt(it(r));return}if(!i.length){Tt("No pending submissions for this song.");return}Qe=Qt,Q=i,F=0,Pt=!0,e.classList.add("ll-reviewing"),cu(e),ri(),$()}function br(){if(Pt){if(Pt=!1,document.getElementById(B)?.classList.remove("ll-reviewing"),ve?.remove(),ve=null,A){if(Qe){A.setLyrics(Qe);let e=U();A.setRomanized(e,e!=="off")}else A.setLyrics(null);A.setEnabled(_())}Q=[],F=0,Qe=null,$()}}function ri(){let e=Q[F];if(!e||!A)return;A.setLyrics(e.lyrics);let t=U();A.setRomanized(t,t!=="off"),A.setEnabled(!0),du()}function cu(e){ve?.remove();let t=document.createElement("div");t.className="ll-review-bar";let i=ge("\u2039","ll-review-nav",()=>{F>0&&(F-=1,ri())}),r=document.createElement("div");r.className="ll-review-status";let n=ge("\u203A","ll-review-nav",()=>{F<Q.length-1&&(F+=1,ri())}),o=ge("Approve","ll-review-approve",()=>void uu()),s=ge("Reject","ll-review-reject",()=>void pu()),a=ge("Exit","ll-review-exit",()=>br());t.append(i,r,n,o,s,a),e.appendChild(t),ve=t}function du(){let e=ve?.querySelector(".ll-review-status"),t=Q[F];e&&t&&(e.textContent=`Reviewing ${F+1}/${Q.length} \xB7 by @${t.uploader}`)}async function uu(){let e=Q[F];if(e){try{await Yr(e.id)}catch(t){Tt(it(t));return}Tt(`Approved "${e.title}".`),Ps()}}async function pu(){let e=Q[F];if(e){try{await Gr(e.id)}catch(t){Tt(it(t));return}Tt(`Rejected "${e.title}".`),Ps()}}function Ps(){if(Q.splice(F,1),!Q.length){Tt("Review queue cleared for this song."),br();return}F>=Q.length&&(F=Q.length-1),ri()}function ge(e,t,i){let r=document.createElement("button");return r.type="button",r.className=t,r.textContent=e,r.addEventListener("click",i),r}function fu(e,t){let i=Number(e);return Number.isFinite(i)?Math.max(0,i):t}function ni(e,t=0,i=1){return Math.min(i,Math.max(t,e))}var di=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var vr="liquid-lyrics-button";function Os(){let e=document.getElementById(vr);if(e)return e;let t=document.querySelector(".main-nowPlayingBar-extraControls");if(!t)return null;let i=document.createElement("button");return i.id=vr,i.className="liquid-lyrics-button",i.setAttribute("aria-label","Liquid Lyrics"),i.innerHTML=di,q(i,"Liquid Lyrics"),i.addEventListener("click",()=>{Cs(),i.classList.toggle("active",_())}),t.prepend(i),i}function zs(){let e=document.getElementById(vr);e&&e.classList.toggle("active",_())}var Lr="liquid-lyrics-sidebar-card",js="liquid-lyrics-sidebar-card-collapsed",mu=300,gu=2e3,Te={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>'},tt=null,J=null,pi="Loading lyrics...",Ee=null,fi=!1,Vs=!1,Bs=!1,xr=null,wr=!1,Hs=null,dt=null,Ds=0,kr=!1,Us=[];function mi(){if(tt)return Ks(),Ot(tt),tt;document.getElementById(Lr)?.remove();let e=document.createElement("section");e.id=Lr,e.className="liquid-lyrics-sidebar-card",tt=e,e.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${di}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-edit-toggle" type="button" aria-label="Create / edit sync">${Te.edit}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${Te.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${Te.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${Te.open}</button>
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
  `;let t=e.querySelector(".ll-sidebar-header-main"),i=e.querySelector(".ll-sidebar-collapse-btn"),r=e.querySelector(".ll-sidebar-edit-toggle"),n=e.querySelector(".ll-sidebar-roman-toggle"),o=e.querySelector(".ll-sidebar-fullscreen-toggle"),s=e.querySelector(".ll-sidebar-open-toggle"),a=()=>{let c=!e.classList.contains("collapsed");localStorage.setItem(js,String(c)),Fs(e),Y()};t?.addEventListener("click",a),i?.addEventListener("click",a),r?.addEventListener("click",c=>{c.stopPropagation(),Zt()}),n?.addEventListener("click",c=>{c.stopPropagation();let u=U(),h=J?.hasJapanese??!1;Re(u==="off"?"romaji":u==="romaji"&&h?"furigana":"off"),window.dispatchEvent(new Event(xe)),Y()}),o?.addEventListener("click",c=>{c.stopPropagation(),As(!1)}),s?.addEventListener("click",c=>{c.stopPropagation(),oi()}),i&&q(i,"Toggle mini lyrics"),r&&q(r,"Create / edit sync"),n&&q(n,"Romanization"),o&&q(o,"Fullscreen"),s&&q(s,"Open Liquid Lyrics");let l=e.querySelector(".ll-sidebar-mini-viewport"),d=e.querySelector(".ll-sidebar-mini-lines");return J?.destroy(),J=new vt({container:d,scroller:l,variant:"sidebar",renderBackgrounds:!0,dotLiftPx:10,onRomanizationAvailability:()=>Se(e)}),Bs||(Bs=!0,window.addEventListener(xe,()=>{hi(!_()),tt&&Se(tt)}),window.addEventListener(Gt,()=>Y())),Fs(e),Ot(e),bu(),xu(),Ee?(J.setLyrics(Ee),hi(!_())):Sr(pi,fi),Y(),e}function Tr(e,t="No lyrics available",i=!1){let r=mi();pi=e?"Live lyrics":t,J?.setLyrics(e),!e||!J?.hasLyrics?(Ee=null,fi=i,Sr(pi,i)):(Ee=e,fi=!1,hi(!_())),Se(r),Y()}function Ws(e){pi=e,Ee=null,fi=!1;let t=tt;t&&(J?.setLyrics(null),Sr(e),Se(t),Y())}function Y(){let e=tt;if(!e)return;Ot(e);let t=_();e.classList.toggle("ll-hidden",t),e.dataset.romanized=String(U()==="romaji"),Se(e);let i=e.classList.contains("collapsed"),r=!t&&!i&&e.isConnected&&!qt();J?.setEnabled(r),r&&U()!=="off"&&!Vs&&hi(!0)}function Er(){Ot()}function hi(e){if(!J)return;let t=U();J.setRomanized(t,e),Vs=e||t==="off"}function Sr(e,t=!1){if(!J)return;let i=document.createElement("div");i.className="ll-sidebar-mini-empty";let r=document.createElement("div");if(r.className="ll-sidebar-mini-empty-text",r.textContent=e,i.appendChild(r),t){let n=document.createElement("button");n.type="button",n.className="ll-sidebar-mini-create-btn",n.textContent="Create your own sync",n.addEventListener("click",o=>{o.stopPropagation(),Zt()}),i.appendChild(n)}J.container.replaceChildren(i)}function Se(e){let t=e.querySelector(".ll-sidebar-roman-toggle");if(!t)return;let i=J?.hasRomanization??!1,r=U(),n=i&&r!=="off";t.hidden=!i,t.disabled=!i,t.classList.toggle("active",n),t.setAttribute("aria-pressed",String(n));let o=r==="furigana"?"furigana":"roman";t.dataset.icon!==o&&(t.dataset.icon=o,t.innerHTML=Te[o]);let s=r==="romaji"?"Romanization: Romaji":r==="furigana"?"Romanization: Furigana":"Romanization";t.dataset.tooltip=s,t.setAttribute("aria-label",s)}function Fs(e){let t=localStorage.getItem(js)==="true";e.classList.toggle("collapsed",t),e.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!t))}function Ot(e=tt){if(!e)return!1;Ks();let t=yu();return t?e.parentElement!==t||t.lastElementChild!==e?(t.appendChild(e),!0):!1:(e.parentElement?.classList.contains("Root__right-sidebar")&&e.remove(),!1)}function Ks(){document.querySelectorAll(`#${Lr}`).forEach(e=>{e!==tt&&e.remove()})}function yu(){if(dt?.isConnected)return dt;dt=null;let e=document.querySelector(".Root__right-sidebar"),t=e?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||e?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||e?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(t)return dt=t,t;let i=performance.now();return i-Ds>=gu&&(Ds=i,dt=ui(["nowplayingview","nowplayingwidget"],e??document)||ui(["nowplaying","widget"],e??document)||ui(["nowplayingview","nowplayinggrid"],e??document)||ui(["nowplaying","grid"],e??document)),dt}function ui(e,t=document){let i=e.map(r=>r.toLowerCase());for(let r of Array.from(t.querySelectorAll("*"))){let n=(r.getAttribute("class")||"").toLowerCase();if(i.every(o=>n.includes(o)))return r}return null}function bu(){xr||(xr=new MutationObserver(()=>{vu()}),xr.observe(document.body,{childList:!0,subtree:!0}),Mr())}function vu(){wr||(wr=!0,setTimeout(()=>{wr=!1,Mr();let e=tt;e&&(e.isConnected&&dt?.isConnected&&e.parentElement===dt||Ot(e)&&Y())},mu))}function xu(){Hs||(Hs=setInterval(()=>{Mr(),Ot(),Y()},1e3))}function Mr(){if(!!document.querySelector(".Root__cinema-view")){kr=!0;return}kr&&(kr=!1,wu())}function wu(){Us.forEach(e=>clearTimeout(e)),Us=[80,260,620,1100].map(e=>setTimeout(()=>{let t=mi();dt=null,Ot(t),Y()},e))}var $s=`\uFEFF/* ==========================================================================
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

/* Spotify's title bar is an Electron drag region, and the window manager takes
   those clicks before the page ever sees them \u2014 being painted on top does not
   help. On a small window the shell's top gutter shrinks until the header row
   sits inside that strip, and its buttons go dead. Only an explicit no-drag
   subtracts from the region (the default value does not), so every editor
   surface that can reach the top of the window declares it. Same fix as
   .ll-header-actions. */
.liquid-lyrics-editor,
.ll-editor-auth,
.ll-editor-confirm,
.ll-editor-submissions {
  -webkit-app-region: no-drag;
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
  /* Spotify paints its own window controls over the window's top-right corner,
     above this overlay, and swallows the clicks underneath them. The gap the
     header has to keep is measured from the real shell rect in JS
     (updateControlsInset) \u2014 a CSS formula would have to restate the shell's
     width and would drift the moment a breakpoint changes it. */
  padding-right: var(--ll-editor-controls-inset, 0px);
  transition: padding-right 180ms ease;
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

/* Nothing in the header may be squeezed below its own size: a flex item that
   shrinks keeps its icon at full size but loses box width, so the drawn button
   and its clickable area stop lining up. The title group (min-width: 0) is the
   one part that gives way; everything else is rigid and the labels collapse to
   icons at the breakpoints further down instead. */
.ll-editor-mode-switch,
.ll-editor-header-actions,
.ll-editor-header-actions > *,
.ll-editor-account-chip,
.ll-editor-submissions-btn,
.ll-editor-save-btn,
.ll-editor-icon-btn {
  flex: 0 0 auto;
}

.ll-editor-btn-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Community account chip + "My submissions" (header) \u2014 glass surface with the
   theme's rim like the other buttons. */
.ll-editor-account-chip,
.ll-editor-submissions-btn {
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

.ll-editor-account-chip::after,
.ll-editor-submissions-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-editor-account-chip:hover,
.ll-editor-submissions-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  transform: translate3d(0, -1px, 0) scale(1.04);
}

.ll-editor-account-chip:active,
.ll-editor-submissions-btn:active {
  transform: scale(0.96);
}

.ll-editor-account-chip.is-authed {
  color: var(--ll-editor-accent);
}

.ll-editor-submissions-btn {
  max-width: none;
  white-space: nowrap;
}

.ll-editor-submissions-btn-icon {
  display: inline-flex;
  flex: 0 0 auto;
}

.ll-editor-submissions-btn-icon svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
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

/* Global offset control: shifts every timing at once. */
.ll-editor-offset-group {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  padding: 5px 6px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}

.ll-editor-offset-label {
  margin: 0 6px 0 6px;
  font-size: 10.5px;
  font-weight: 750;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
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
.ll-editor-offset-group,
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

/* "My submissions" \u2014 the user's own uploads and their review verdict. Appended to
   <body> like the confirm dialog, so it uses --accent-color directly rather than
   the editor-scoped --ll-editor-accent. */
.ll-editor-submissions {
  position: fixed;
  inset: 0;
  z-index: 2147483500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  /* Only the scrim's colour fades \u2014 animating opacity on the glass parent would
     render it black mid-fade (same rule as the auth dialog). */
  background: rgba(0, 0, 0, 0);
  transition: background 240ms ease;
}

.ll-editor-submissions.visible {
  background: rgba(6, 6, 10, 0.5);
}

.ll-editor-submissions-dialog {
  display: flex;
  flex-direction: column;
  width: min(560px, 92vw);
  max-height: min(640px, 82vh);
  padding: 22px 22px 8px;
  border-radius: 20px;
  background: rgba(20, 20, 26, 0.32);
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 30px 80px rgba(0, 0, 0, 0.55);
  outline: var(--glowify-outline, none) !important;
  opacity: 0;
  transform: translateY(10px) scale(0.97);
  will-change: transform, opacity;
  transition:
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 200ms ease;
}

.ll-editor-submissions.visible .ll-editor-submissions-dialog {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.ll-editor-submissions-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
}

.ll-editor-submissions-titles {
  flex: 1 1 auto;
  min-width: 0;
}

.ll-editor-submissions-title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
}

.ll-editor-submissions-sub {
  margin-top: 2px;
  font-size: 12.5px;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ll-editor-submissions-list {
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
}

.ll-editor-submissions-empty {
  padding: 44px 16px;
  text-align: center;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.5);
}

.ll-editor-submission {
  position: relative;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  transition: background 200ms ease, transform 260ms cubic-bezier(0.3, 2, 0.32, 1);
}

/* Theme rim, like the glass buttons. */
.ll-editor-submission::after,
.ll-editor-submission-status::after,
.ll-editor-submission-note::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: var(--liquify-shadow, var(--glass-shadow, none));
}

.ll-editor-submission:hover {
  background: rgba(255, 255, 255, 0.09);
  transform: translate3d(0, -1px, 0);
}

.ll-editor-submission-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ll-editor-submission-main {
  flex: 1 1 auto;
  min-width: 0;
}

.ll-editor-submission-title {
  font-size: 14px;
  font-weight: 750;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ll-editor-submission-meta {
  margin-top: 2px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.48);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ll-editor-submission-status {
  position: relative;
  flex: 0 0 auto;
  padding: 3px 10px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.68);
  background: rgba(255, 255, 255, 0.09);
  cursor: default;
}

.ll-editor-submission.is-published .ll-editor-submission-status {
  color: var(--accent-color, #1ed760);
  background: rgba(30, 215, 96, 0.14);
}

.ll-editor-submission.is-pending .ll-editor-submission-status {
  color: #ffcf5e;
  background: rgba(255, 207, 94, 0.14);
}

.ll-editor-submission.is-rejected .ll-editor-submission-status,
.ll-editor-submission.is-removed .ll-editor-submission-status {
  color: #ff8079;
  background: rgba(224, 72, 63, 0.16);
}

.ll-editor-submission-note {
  position: relative;
  margin-top: 9px;
  padding: 7px 11px;
  border-radius: 10px;
  font-size: 12.5px;
  line-height: 1.5;
  color: #ffcf5e;
  background: rgba(255, 207, 94, 0.1);
  overflow-wrap: anywhere;
}

.ll-editor-submission-note.is-muted {
  color: rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.05);
}

.ll-hidden {
  display: none !important;
}

/* Editor responsiveness. The shell is min(1080px, 94vw), so the viewport width
   maps straight onto the space the header has. Each step drops the least useful
   label first (icons keep their tooltips) rather than letting the row overflow
   the shell \u2014 an overflowing header pushes Publish and Close past the rounded
   edge, where they sit over the dim backdrop and read as misplaced. */
@media (max-width: 1040px) {
  .ll-editor-song {
    max-width: 210px;
  }

  .ll-editor-submissions-btn .ll-editor-btn-label {
    display: none;
  }

  .ll-editor-submissions-btn {
    padding: 0 11px;
  }
}

@media (max-width: 880px) {
  .ll-editor-account-chip {
    max-width: 132px;
  }

  .ll-editor-save-btn .ll-editor-btn-label {
    display: none;
  }

  .ll-editor-save-btn {
    padding: 9px 12px;
  }

  .ll-editor-header {
    gap: 12px;
  }

  .ll-editor-step-btn {
    padding: 8px 14px;
  }

  .ll-editor-sync-bar {
    gap: 14px;
  }

  /* The buttons keep their tooltips, so the group reads fine without its label. */
  .ll-editor-offset-label {
    display: none;
  }
}

@media (max-width: 800px) {
  .ll-editor-account-name {
    display: none;
  }

  .ll-editor-account-chip {
    padding: 0 11px;
  }
}

/* Short windows (1080p at 150% scaling lands near 720px of viewport height):
   claw back the chrome's vertical padding so the lyric list keeps its room. */
@media (max-height: 780px) {
  .ll-editor-shell {
    height: min(96vh, 940px);
    padding: 16px clamp(14px, 2.4vw, 26px) 14px;
  }

  .ll-editor-steps {
    margin: 10px 0 2px;
  }

  .ll-editor-transport {
    margin-top: 10px;
    padding: 8px 14px;
  }

  .ll-editor-body {
    margin-top: 8px;
  }
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
`;function Js(){let e="liquid-lyrics-styles";if(document.getElementById(e))return;let t=document.createElement("style");t.id=e,t.textContent=$s,document.head.appendChild(t)}async function Lu(){let e=window;if(e.__liquidLyricsLoaded){console.warn("[Liquid Lyrics] Second instance detected \u2014 skipping initialization.");return}e.__liquidLyricsLoaded=!0,await pt(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),Js(),Uo(),te(),mi(),await pt(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),Os();let t=null,i=null,r="Loading lyrics...",n=0,o=Ys();async function s(){let p=Spicetify.Player.data;if(!p?.item?.uri)return;let w=p.item.uri,T=w.includes(":")?w.split(":")[2]:w;if(T===t){Er(),Y();return}t=T,i=null,r="Loading lyrics...",Er(),Ws(r),_()&&we(r),await a(T,p.item)}async function a(p,w){let T=++n,S=await Ae({id:p,uri:w.uri,data:{name:w.name}});if(!(T!==n||p!==t)){if(S.status==="success"&&S.data){i=S.data,r="",Tr(S.data),_()&&ar(S.data);return}i=null,r=S.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",Tr(null,r,!0),_()&&we(r,!0)}}Spicetify.Player.addEventListener("songchange",()=>{s()}),window.addEventListener(Li,p=>{let w=Spicetify.Player.data,T=w?.item?.uri;if(!T)return;let S=T.includes(":")?T.split(":")[2]:T,f=p.detail??{};(f.trackUri||f.trackId)&&f.trackUri!==T&&f.trackId!==S||(i=null,a(S,w.item))});let l=()=>{let p=Ys();p!==o&&(o=p,_()&&si())};setInterval(()=>{l()},250);let d=Spicetify.Platform?.History;typeof d?.listen=="function"&&d.listen(l);let c=_(),u=new MutationObserver(()=>{let p=_();if(zs(),Y(),p&&!c&&t)if(i)ar(i);else if(r&&r!=="Loading lyrics...")we(r,!0);else{let w=Spicetify.Player.data;if(w?.item?.uri){let T=w.item.uri.includes(":")?w.item.uri.split(":")[2]:w.item.uri;we("Loading lyrics..."),a(T,w.item)}}c=p}),h=document.getElementById("liquid-lyrics-panel");h&&u.observe(h,{attributes:!0,attributeFilter:["class"]}),Y(),s()}Lu();function Ys(){let t=Spicetify.Platform?.History?.location??{},i=t.pathname||t.path||t.uri||"";return`${location.href}|${i}`}})();
