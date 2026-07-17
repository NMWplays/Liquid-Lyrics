// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{var Pr=Object.create;var un=Object.defineProperty;var Or=Object.getOwnPropertyDescriptor;var zr=Object.getOwnPropertyNames;var Fr=Object.getPrototypeOf,Br=Object.prototype.hasOwnProperty;var _=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Hr=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of zr(e))!Br.call(t,r)&&r!==n&&un(t,r,{get:()=>e[r],enumerable:!(i=Or(e,r))||i.enumerable});return t};var dn=(t,e,n)=>(n=t!=null?Pr(Fr(t)):{},Hr(e||!t||!t.__esModule?un(n,"default",{value:t,enumerable:!0}):n,t));var Tn=_((Rl,Lt)=>{(function(){"use strict";var t="\0",e=0,n=0,i=-1,r=!0,a=!0,s=4,o=4,l=2,u=function(h){h==null&&(h=1024);var m=function(v,w,L){for(var A=w;A<L;A++)v[A]=-A+1;if(0<g.array[g.array.length-1]){for(var Z=g.array.length-2;0<g.array[Z];)Z--;v[w]=-Z}},x=function(v,w,L){for(var A=w;A<L;A++)v[A]=-A-1},y=function(v){var w=v*l,L=b(f.signed,f.bytes,w);m(L,f.array.length,w),L.set(f.array),f.array=null,f.array=L;var A=b(g.signed,g.bytes,w);x(A,g.array.length,w),A.set(g.array),g.array=null,g.array=A},p=n+1,f={signed:r,bytes:s,array:b(r,s,h)},g={signed:a,bytes:o,array:b(a,o,h)};return f.array[n]=1,g.array[n]=n,m(f.array,n+1,f.array.length),x(g.array,n+1,g.array.length),{getBaseBuffer:function(){return f.array},getCheckBuffer:function(){return g.array},loadBaseBuffer:function(v){return f.array=v,this},loadCheckBuffer:function(v){return g.array=v,this},size:function(){return Math.max(f.array.length,g.array.length)},getBase:function(v){return f.array.length-1<v?-v+1:f.array[v]},getCheck:function(v){return g.array.length-1<v?-v-1:g.array[v]},setBase:function(v,w){f.array.length-1<v&&y(v),f.array[v]=w},setCheck:function(v,w){g.array.length-1<v&&y(v),g.array[v]=w},setFirstUnusedNode:function(v){p=v},getFirstUnusedNode:function(){return p},shrink:function(){for(var v=this.size()-1;!(0<=g.array[v]);)v--;f.array=f.array.subarray(0,v+2),g.array=g.array.subarray(0,v+2)},calc:function(){for(var v=0,w=g.array.length,L=0;L<w;L++)g.array[L]<0&&v++;return{all:w,unused:v,efficiency:(w-v)/w}},dump:function(){var v="",w="",L;for(L=0;L<f.array.length;L++)v=v+" "+this.getBase(L);for(L=0;L<g.array.length;L++)w=w+" "+this.getCheck(L);return console.log("base:"+v),console.log("chck:"+w),"base:"+v+" chck:"+w}}};function c(h){this.bc=u(h),this.keys=[]}c.prototype.append=function(h,m){return this.keys.push({k:h,v:m}),this},c.prototype.build=function(h,m){if(h==null&&(h=this.keys),h==null)return new d(this.bc);m==null&&(m=!1);var x=h.map(function(y){return{k:T(y.k+t),v:y.v}});return m?this.keys=x:this.keys=x.sort(function(y,p){for(var f=y.k,g=p.k,v=Math.min(f.length,g.length),w=0;w<v;w++)if(f[w]!==g[w])return f[w]-g[w];return f.length-g.length}),x=null,this._build(n,0,0,this.keys.length),new d(this.bc)},c.prototype._build=function(h,m,x,y){var p=this.getChildrenInfo(m,x,y),f=this.findAllocatableBase(p);this.setBC(h,p,f);for(var g=0;g<p.length;g=g+3){var v=p[g];if(v!==e){var w=p[g+1],L=p[g+2],A=f+v;this._build(A,m+1,w,L)}}},c.prototype.getChildrenInfo=function(h,m,x){var y=this.keys[m].k[h],p=0,f=new Int32Array(x*3);f[p++]=y,f[p++]=m;for(var g=m,v=m;g<m+x;g++){var w=this.keys[g].k[h];y!==w&&(f[p++]=g-v,f[p++]=w,f[p++]=g,y=w,v=g)}return f[p++]=g-v,f=f.subarray(0,p),f},c.prototype.setBC=function(h,m,x){var y=this.bc;y.setBase(h,x);var p;for(p=0;p<m.length;p=p+3){var f=m[p],g=x+f,v=-y.getBase(g),w=-y.getCheck(g);g!==y.getFirstUnusedNode()?y.setCheck(v,-w):y.setFirstUnusedNode(w),y.setBase(w,-v);var L=h;if(y.setCheck(g,L),f===e){var A=m[p+1],Z=this.keys[A].v;Z==null&&(Z=0);var Ir=-Z-1;y.setBase(g,Ir)}}},c.prototype.findAllocatableBase=function(h){for(var m=this.bc,x,y=m.getFirstUnusedNode();;){if(x=y-h[0],x<0){y=-m.getCheck(y);continue}for(var p=!0,f=0;f<h.length;f=f+3){var g=h[f],v=x+g;if(!this.isUnusedNode(v)){y=-m.getCheck(y),p=!1;break}}if(p)return x}},c.prototype.isUnusedNode=function(h){var m=this.bc,x=m.getCheck(h);return h===n?!1:x<0};function d(h){this.bc=h,this.bc.shrink()}d.prototype.contain=function(h){var m=this.bc;h+=t;for(var x=T(h),y=n,p=i,f=0;f<x.length;f++){var g=x[f];if(p=this.traverse(y,g),p===i)return!1;if(m.getBase(p)<=0)return!0;y=p}return!1},d.prototype.lookup=function(h){h+=t;for(var m=T(h),x=n,y=i,p=0;p<m.length;p++){var f=m[p];if(y=this.traverse(x,f),y===i)return i;x=y}var g=this.bc.getBase(y);return g<=0?-g-1:i},d.prototype.commonPrefixSearch=function(h){for(var m=T(h),x=n,y=i,p=[],f=0;f<m.length;f++){var g=m[f];if(y=this.traverse(x,g),y!==i){x=y;var v=this.traverse(y,e);if(v!==i){var w=this.bc.getBase(v),L={};w<=0&&(L.v=-w-1),L.k=C(k(m,0,f+1)),p.push(L)}continue}else break}return p},d.prototype.traverse=function(h,m){var x=this.bc.getBase(h)+m;return this.bc.getCheck(x)===h?x:i},d.prototype.size=function(){return this.bc.size()},d.prototype.calc=function(){return this.bc.calc()},d.prototype.dump=function(){return this.bc.dump()};var b=function(h,m,x){if(h)switch(m){case 1:return new Int8Array(x);case 2:return new Int16Array(x);case 4:return new Int32Array(x);default:throw new RangeError("Invalid newArray parameter element_bytes:"+m)}else switch(m){case 1:return new Uint8Array(x);case 2:return new Uint16Array(x);case 4:return new Uint32Array(x);default:throw new RangeError("Invalid newArray parameter element_bytes:"+m)}},k=function(h,m,x){var y=new ArrayBuffer(x),p=new Uint8Array(y,0,x),f=h.subarray(m,x);return p.set(f),p},T=function(h){for(var m=new Uint8Array(new ArrayBuffer(h.length*4)),x=0,y=0;x<h.length;){var p,f=h.charCodeAt(x++);if(f>=55296&&f<=56319){var g=f,v=h.charCodeAt(x++);if(v>=56320&&v<=57343)p=(g-55296)*1024+65536+(v-56320);else return null}else p=f;p<128?m[y++]=p:p<2048?(m[y++]=p>>>6|192,m[y++]=p&63|128):p<65536?(m[y++]=p>>>12|224,m[y++]=p>>6&63|128,m[y++]=p&63|128):p<1<<21&&(m[y++]=p>>>18|240,m[y++]=p>>12&63|128,m[y++]=p>>6&63|128,m[y++]=p&63|128)}return m.subarray(0,y)},C=function(h){for(var m="",x,y,p,f,g,v,w,L=0;L<h.length;)y=h[L++],y<128?x=y:y>>5===6?(p=h[L++],x=(y&31)<<6|p&63):y>>4===14?(p=h[L++],f=h[L++],x=(y&15)<<12|(p&63)<<6|f&63):(p=h[L++],f=h[L++],g=h[L++],x=(y&7)<<18|(p&63)<<12|(f&63)<<6|g&63),x<65536?m+=String.fromCharCode(x):(x-=65536,v=55296|x>>10,w=56320|x&1023,m+=String.fromCharCode(v,w));return m},Le={builder:function(h){return new c(h)},load:function(h,m){var x=u(0);return x.loadBaseBuffer(h),x.loadCheckBuffer(m),new d(x)}};typeof Lt>"u"?window.doublearray=Le:Lt.exports=Le})()});var Ue=_((Cl,En)=>{"use strict";var na=function(t){for(var e=new Uint8Array(t.length*4),n=0,i=0;n<t.length;){var r,a=t.charCodeAt(n++);if(a>=55296&&a<=56319){var s=a,o=t.charCodeAt(n++);if(o>=56320&&o<=57343)r=(s-55296)*1024+65536+(o-56320);else return null}else r=a;r<128?e[i++]=r:r<2048?(e[i++]=r>>>6|192,e[i++]=r&63|128):r<65536?(e[i++]=r>>>12|224,e[i++]=r>>6&63|128,e[i++]=r&63|128):r<2097152&&(e[i++]=r>>>18|240,e[i++]=r>>12&63|128,e[i++]=r>>6&63|128,e[i++]=r&63|128)}return e.subarray(0,i)},ia=function(t){for(var e="",n,i,r,a,s,o,l,u=0;u<t.length;)i=t[u++],i<128?n=i:i>>5===6?(r=t[u++],n=(i&31)<<6|r&63):i>>4===14?(r=t[u++],a=t[u++],n=(i&15)<<12|(r&63)<<6|a&63):(r=t[u++],a=t[u++],s=t[u++],n=(i&7)<<18|(r&63)<<12|(a&63)<<6|s&63),n<65536?e+=String.fromCharCode(n):(n-=65536,o=55296|n>>10,l=56320|n&1023,e+=String.fromCharCode(o,l));return e};function N(t){var e;if(t==null)e=1024*1024;else if(typeof t=="number")e=t;else if(t instanceof Uint8Array){this.buffer=t,this.position=0;return}else throw typeof t+" is invalid parameter type for ByteBuffer constructor";this.buffer=new Uint8Array(e),this.position=0}N.prototype.size=function(){return this.buffer.length};N.prototype.reallocate=function(){var t=new Uint8Array(this.buffer.length*2);t.set(this.buffer),this.buffer=t};N.prototype.shrink=function(){return this.buffer=this.buffer.subarray(0,this.position),this.buffer};N.prototype.put=function(t){this.buffer.length<this.position+1&&this.reallocate(),this.buffer[this.position++]=t};N.prototype.get=function(t){return t==null&&(t=this.position,this.position+=1),this.buffer.length<t+1?0:this.buffer[t]};N.prototype.putShort=function(t){if(65535<t)throw t+" is over short value";var e=255&t,n=(65280&t)>>8;this.put(e),this.put(n)};N.prototype.getShort=function(t){if(t==null&&(t=this.position,this.position+=2),this.buffer.length<t+2)return 0;var e=this.buffer[t],n=this.buffer[t+1],i=(n<<8)+e;return i&32768&&(i=-(i-1^65535)),i};N.prototype.putInt=function(t){if(4294967295<t)throw t+" is over integer value";var e=255&t,n=(65280&t)>>8,i=(16711680&t)>>16,r=(4278190080&t)>>24;this.put(e),this.put(n),this.put(i),this.put(r)};N.prototype.getInt=function(t){if(t==null&&(t=this.position,this.position+=4),this.buffer.length<t+4)return 0;var e=this.buffer[t],n=this.buffer[t+1],i=this.buffer[t+2],r=this.buffer[t+3];return(r<<24)+(i<<16)+(n<<8)+e};N.prototype.readInt=function(){var t=this.position;return this.position+=4,this.getInt(t)};N.prototype.putString=function(t){for(var e=na(t),n=0;n<e.length;n++)this.put(e[n]);this.put(0)};N.prototype.getString=function(t){var e=[],n;for(t==null&&(t=this.position);!(this.buffer.length<t+1||(n=this.get(t++),n===0));)e.push(n);return this.position=t,ia(e)};En.exports=N});var kt=_((Nl,Sn)=>{"use strict";var oe=Ue();function j(){this.dictionary=new oe(10*1024*1024),this.target_map={},this.pos_buffer=new oe(10*1024*1024)}j.prototype.buildDictionary=function(t){for(var e={},n=0;n<t.length;n++){var i=t[n];if(!(i.length<4)){var r=i[0],a=i[1],s=i[2],o=i[3],l=i.slice(4).join(",");(!isFinite(a)||!isFinite(s)||!isFinite(o))&&console.log(i);var u=this.put(a,s,o,r,l);e[u]=r}}return this.dictionary.shrink(),this.pos_buffer.shrink(),e};j.prototype.put=function(t,e,n,i,r){var a=this.dictionary.position,s=this.pos_buffer.position;return this.dictionary.putShort(t),this.dictionary.putShort(e),this.dictionary.putShort(n),this.dictionary.putInt(s),this.pos_buffer.putString(i+","+r),a};j.prototype.addMapping=function(t,e){var n=this.target_map[t];n==null&&(n=[]),n.push(e),this.target_map[t]=n};j.prototype.targetMapToBuffer=function(){var t=new oe,e=Object.keys(this.target_map).length;t.putInt(e);for(var n in this.target_map){var i=this.target_map[n],r=i.length;t.putInt(parseInt(n)),t.putInt(r);for(var a=0;a<i.length;a++)t.putInt(i[a])}return t.shrink()};j.prototype.loadDictionary=function(t){return this.dictionary=new oe(t),this};j.prototype.loadPosVector=function(t){return this.pos_buffer=new oe(t),this};j.prototype.loadTargetMap=function(t){var e=new oe(t);for(e.position=0,this.target_map={},e.readInt();!(e.buffer.length<e.position+1);)for(var n=e.readInt(),i=e.readInt(),r=0;r<i;r++){var a=e.readInt();this.addMapping(n,a)}return this};j.prototype.getFeatures=function(t){var e=parseInt(t);if(isNaN(e))return"";var n=this.dictionary.getInt(e+6);return this.pos_buffer.getString(n)};Sn.exports=j});var _n=_((ql,An)=>{"use strict";function We(t,e){this.forward_dimension=t,this.backward_dimension=e,this.buffer=new Int16Array(t*e+2),this.buffer[0]=t,this.buffer[1]=e}We.prototype.put=function(t,e,n){var i=t*this.backward_dimension+e+2;if(this.buffer.length<i+1)throw"ConnectionCosts buffer overflow";this.buffer[i]=n};We.prototype.get=function(t,e){var n=t*this.backward_dimension+e+2;if(this.buffer.length<n+1)throw"ConnectionCosts buffer overflow";return this.buffer[n]};We.prototype.loadConnectionCosts=function(t){this.forward_dimension=t[0],this.backward_dimension=t[1],this.buffer=t};An.exports=We});var Tt=_((Il,Mn)=>{"use strict";function ra(t,e,n,i,r){this.class_id=t,this.class_name=e,this.is_always_invoke=n,this.is_grouping=i,this.max_length=r}Mn.exports=ra});var Nn=_((Pl,Cn)=>{"use strict";var Rn=Ue(),aa=Tt();function ee(){this.map=[],this.lookup_table={}}ee.load=function(t){for(var e=new ee,n=[],i=new Rn(t);i.position+1<i.size();){var r=n.length,a=i.get(),s=i.get(),o=i.getInt(),l=i.getString();n.push(new aa(r,l,a,s,o))}return e.init(n),e};ee.prototype.init=function(t){if(t!=null)for(var e=0;e<t.length;e++){var n=t[e];this.map[e]=n,this.lookup_table[n.class_name]=e}};ee.prototype.getCharacterClass=function(t){return this.map[t]};ee.prototype.lookup=function(t){var e=this.lookup_table[t];return e??null};ee.prototype.toBuffer=function(){for(var t=new Rn,e=0;e<this.map.length;e++){var n=this.map[e];t.put(n.is_always_invoke),t.put(n.is_grouping),t.putInt(n.max_length),t.putString(n.class_name)}return t.shrink(),t.buffer};Cn.exports=ee});var Et=_((Ol,qn)=>{"use strict";function te(t){this.str=t,this.index_mapping=[];for(var e=0;e<t.length;e++){var n=t.charAt(e);this.index_mapping.push(e),te.isSurrogatePair(n)&&e++}this.length=this.index_mapping.length}te.prototype.slice=function(t){if(this.index_mapping.length<=t)return"";var e=this.index_mapping[t];return this.str.slice(e)};te.prototype.charAt=function(t){if(this.str.length<=t)return"";var e=this.index_mapping[t],n=this.index_mapping[t+1];return n==null?this.str.slice(e):this.str.slice(e,n)};te.prototype.charCodeAt=function(t){if(this.index_mapping.length<=t)return NaN;var e=this.index_mapping[t],n=this.str.charCodeAt(e),i;return n>=55296&&n<=56319&&e<this.str.length&&(i=this.str.charCodeAt(e+1),i>=56320&&i<=57343)?(n-55296)*1024+i-56320+65536:n};te.prototype.toString=function(){return this.str};te.isSurrogatePair=function(t){var e=t.charCodeAt(0);return e>=55296&&e<=56319};qn.exports=te});var Pn=_((zl,In)=>{"use strict";var sa=Nn(),oa=Tt(),la=Et(),St="DEFAULT";function D(){this.character_category_map=new Uint8Array(65536),this.compatible_category_map=new Uint32Array(65536),this.invoke_definition_map=null}D.load=function(t,e,n){var i=new D;return i.character_category_map=t,i.compatible_category_map=e,i.invoke_definition_map=sa.load(n),i};D.parseCharCategory=function(t,e){var n=e[1],i=parseInt(e[2]),r=parseInt(e[3]),a=parseInt(e[4]);if(!isFinite(i)||i!==0&&i!==1)return console.log("char.def parse error. INVOKE is 0 or 1 in:"+i),null;if(!isFinite(r)||r!==0&&r!==1)return console.log("char.def parse error. GROUP is 0 or 1 in:"+r),null;if(!isFinite(a)||a<0)return console.log("char.def parse error. LENGTH is 1 to n:"+a),null;var s=i===1,o=r===1;return new oa(t,n,s,o,a)};D.parseCategoryMapping=function(t){var e=parseInt(t[1]),n=t[2],i=3<t.length?t.slice(3):[];return(!isFinite(e)||e<0||e>65535)&&console.log("char.def parse error. CODE is invalid:"+e),{start:e,default:n,compatible:i}};D.parseRangeCategoryMapping=function(t){var e=parseInt(t[1]),n=parseInt(t[2]),i=t[3],r=4<t.length?t.slice(4):[];return(!isFinite(e)||e<0||e>65535)&&console.log("char.def parse error. CODE is invalid:"+e),(!isFinite(n)||n<0||n>65535)&&console.log("char.def parse error. CODE is invalid:"+n),{start:e,end:n,default:i,compatible:r}};D.prototype.initCategoryMappings=function(t){var e;if(t!=null)for(var n=0;n<t.length;n++){var i=t[n],r=i.end||i.start;for(e=i.start;e<=r;e++){this.character_category_map[e]=this.invoke_definition_map.lookup(i.default);for(var a=0;a<i.compatible.length;a++){var s=this.compatible_category_map[e],o=i.compatible[a];if(o!=null){var l=this.invoke_definition_map.lookup(o);if(l!=null){var u=1<<l;s=s|u,this.compatible_category_map[e]=s}}}}}var c=this.invoke_definition_map.lookup(St);if(c!=null)for(e=0;e<this.character_category_map.length;e++)this.character_category_map[e]===0&&(this.character_category_map[e]=1<<c)};D.prototype.lookupCompatibleCategory=function(t){var e=[],n=t.charCodeAt(0),i;if(n<this.compatible_category_map.length&&(i=this.compatible_category_map[n]),i==null||i===0)return e;for(var r=0;r<32;r++)if(i<<31-r>>>31===1){var a=this.invoke_definition_map.getCharacterClass(r);if(a==null)continue;e.push(a)}return e};D.prototype.lookup=function(t){var e,n=t.charCodeAt(0);return la.isSurrogatePair(t)?e=this.invoke_definition_map.lookup(St):n<this.character_category_map.length&&(e=this.character_category_map[n]),e==null&&(e=this.invoke_definition_map.lookup(St)),this.invoke_definition_map.getCharacterClass(e)};In.exports=D});var Fn=_((Fl,zn)=>{"use strict";var ca=kt(),ua=Pn(),On=Ue();function le(){this.dictionary=new On(10*1024*1024),this.target_map={},this.pos_buffer=new On(10*1024*1024),this.character_definition=null}le.prototype=Object.create(ca.prototype);le.prototype.characterDefinition=function(t){return this.character_definition=t,this};le.prototype.lookup=function(t){return this.character_definition.lookup(t)};le.prototype.lookupCompatibleCategory=function(t){return this.character_definition.lookupCompatibleCategory(t)};le.prototype.loadUnknownDictionaries=function(t,e,n,i,r,a){this.loadDictionary(t),this.loadPosVector(e),this.loadTargetMap(n),this.character_definition=ua.load(i,r,a)};zn.exports=le});var jn=_((Bl,Hn)=>{"use strict";var Bn=Tn(),da=kt(),fa=_n(),pa=Fn();function Te(t,e,n,i){t!=null?this.trie=t:this.trie=Bn.builder(0).build([{k:"",v:1}]),e!=null?this.token_info_dictionary=e:this.token_info_dictionary=new da,n!=null?this.connection_costs=n:this.connection_costs=new fa(0,0),i!=null?this.unknown_dictionary=i:this.unknown_dictionary=new pa}Te.prototype.loadTrie=function(t,e){return this.trie=Bn.load(t,e),this};Te.prototype.loadTokenInfoDictionaries=function(t,e,n){return this.token_info_dictionary.loadDictionary(t),this.token_info_dictionary.loadPosVector(e),this.token_info_dictionary.loadTargetMap(n),this};Te.prototype.loadConnectionCosts=function(t){return this.connection_costs.loadConnectionCosts(t),this};Te.prototype.loadUnknownDictionaries=function(t,e,n,i,r,a){return this.unknown_dictionary.loadUnknownDictionaries(t,e,n,i,r,a),this};Hn.exports=Te});var At=_((Hl,Dn)=>{"use strict";function ga(t,e,n,i,r,a,s,o){this.name=t,this.cost=e,this.start_pos=n,this.length=i,this.left_id=a,this.right_id=s,this.prev=null,this.surface_form=o,r==="BOS"?this.shortest_cost=0:this.shortest_cost=Number.MAX_VALUE,this.type=r}Dn.exports=ga});var Vn=_((jl,Wn)=>{"use strict";var Un=At();function _t(){this.nodes_end_at=[],this.nodes_end_at[0]=[new Un(-1,0,0,0,"BOS",0,0,"")],this.eos_pos=1}_t.prototype.append=function(t){var e=t.start_pos+t.length-1;this.eos_pos<e&&(this.eos_pos=e);var n=this.nodes_end_at[e];n==null&&(n=[]),n.push(t),this.nodes_end_at[e]=n};_t.prototype.appendEos=function(){var t=this.nodes_end_at.length;this.eos_pos++,this.nodes_end_at[t]=[new Un(-1,0,this.eos_pos,0,"EOS",0,0,"")]};Wn.exports=_t});var Gn=_((Dl,Jn)=>{"use strict";var Kn=At(),ha=Vn(),Mt=Et();function $n(t){this.trie=t.trie,this.token_info_dictionary=t.token_info_dictionary,this.unknown_dictionary=t.unknown_dictionary}$n.prototype.build=function(t){for(var e=new ha,n=new Mt(t),i,r,a,s,o,l=0;l<n.length;l++){for(var u=n.slice(l),c=this.trie.commonPrefixSearch(u),d=0;d<c.length;d++){r=c[d].v,i=c[d].k;for(var b=this.token_info_dictionary.target_map[r],k=0;k<b.length;k++){var T=parseInt(b[k]);a=this.token_info_dictionary.dictionary.getShort(T),s=this.token_info_dictionary.dictionary.getShort(T+2),o=this.token_info_dictionary.dictionary.getShort(T+4),e.append(new Kn(T,o,l+1,i.length,"KNOWN",a,s,i))}}var C=new Mt(u),Le=new Mt(C.charAt(0)),h=this.unknown_dictionary.lookup(Le.toString());if(c==null||c.length===0||h.is_always_invoke===1){if(i=Le,h.is_grouping===1&&1<C.length)for(var m=1;m<C.length;m++){var x=C.charAt(m),y=this.unknown_dictionary.lookup(x);if(h.class_name!==y.class_name)break;i+=x}for(var p=this.unknown_dictionary.target_map[h.class_id],f=0;f<p.length;f++){var g=parseInt(p[f]);a=this.unknown_dictionary.dictionary.getShort(g),s=this.unknown_dictionary.dictionary.getShort(g+2),o=this.unknown_dictionary.dictionary.getShort(g+4),e.append(new Kn(g,o,l+1,i.length,"UNKNOWN",a,s,i.toString()))}}}return e.appendEos(),e};Jn.exports=$n});var Zn=_((Ul,Yn)=>{"use strict";function Ve(t){this.connection_costs=t}Ve.prototype.search=function(t){return t=this.forward(t),this.backward(t)};Ve.prototype.forward=function(t){var e,n,i;for(e=1;e<=t.eos_pos;e++){var r=t.nodes_end_at[e];if(r!=null)for(n=0;n<r.length;n++){var a=r[n],s=Number.MAX_VALUE,o,l=t.nodes_end_at[a.start_pos-1];if(l!=null){for(i=0;i<l.length;i++){var u=l[i],c;a.left_id==null||u.right_id==null?(console.log("Left or right is null"),c=0):c=this.connection_costs.get(u.right_id,a.left_id);var d=u.shortest_cost+c+a.cost;d<s&&(o=u,s=d)}a.prev=o,a.shortest_cost=s}}}return t};Ve.prototype.backward=function(t){var e=[],n=t.nodes_end_at[t.nodes_end_at.length-1][0],i=n.prev;if(i==null)return[];for(;i.type!=="BOS";){if(e.push(i),i.prev==null)return[];i=i.prev}return e.reverse()};Yn.exports=Ve});var Qn=_((Wl,Xn)=>{"use strict";function Rt(){}Rt.prototype.formatEntry=function(t,e,n,i){var r={};return r.word_id=t,r.word_type=n,r.word_position=e,r.surface_form=i[0],r.pos=i[1],r.pos_detail_1=i[2],r.pos_detail_2=i[3],r.pos_detail_3=i[4],r.conjugated_type=i[5],r.conjugated_form=i[6],r.basic_form=i[7],r.reading=i[8],r.pronunciation=i[9],r};Rt.prototype.formatUnknownEntry=function(t,e,n,i,r){var a={};return a.word_id=t,a.word_type=n,a.word_position=e,a.surface_form=r,a.pos=i[1],a.pos_detail_1=i[2],a.pos_detail_2=i[3],a.pos_detail_3=i[4],a.conjugated_type=i[5],a.conjugated_form=i[6],a.basic_form=i[7],a};Xn.exports=Rt});var ti=_((Vl,ei)=>{"use strict";var ma=Gn(),ya=Zn(),ba=Qn(),va=/、|。/;function ce(t){this.token_info_dictionary=t.token_info_dictionary,this.unknown_dictionary=t.unknown_dictionary,this.viterbi_builder=new ma(t),this.viterbi_searcher=new ya(t.connection_costs),this.formatter=new ba}ce.splitByPunctuation=function(t){for(var e=[],n=t;n!=="";){var i=n.search(va);if(i<0){e.push(n);break}e.push(n.substring(0,i+1)),n=n.substring(i+1)}return e};ce.prototype.tokenize=function(t){for(var e=ce.splitByPunctuation(t),n=[],i=0;i<e.length;i++){var r=e[i];this.tokenizeForSentence(r,n)}return n};ce.prototype.tokenizeForSentence=function(t,e){e==null&&(e=[]);var n=this.getLattice(t),i=this.viterbi_searcher.search(n),r=0;e.length>0&&(r=e[e.length-1].word_position);for(var a=0;a<i.length;a++){var s=i[a],o,l,u;s.type==="KNOWN"?(u=this.token_info_dictionary.getFeatures(s.name),u==null?l=[]:l=u.split(","),o=this.formatter.formatEntry(s.name,r+s.start_pos,s.type,l)):s.type==="UNKNOWN"?(u=this.unknown_dictionary.getFeatures(s.name),u==null?l=[]:l=u.split(","),o=this.formatter.formatUnknownEntry(s.name,r+s.start_pos,s.type,l,s.surface_form)):o=this.formatter.formatEntry(s.name,r+s.start_pos,s.type,[]),e.push(o)}return e};ce.prototype.getLattice=function(t){return this.viterbi_builder.build(t)};ei.exports=ce});function K(t,e=1e4){return new Promise((n,i)=>{let r=Date.now(),a=setInterval(()=>{let s=t();s?(clearInterval(a),n(s)):Date.now()-r>e&&(clearInterval(a),i(new Error("wait() timed out")))},100)})}var yt="5.19.11",fn=["spicy","spotify"];async function bt({id:t}){try{let e=t.includes(":")?t.split(":")[2]:t,n="https://spclient.wg.spotify.com/color-lyrics/v2/track/",i;try{i=await(await K(()=>Spicetify.CosmosAsync?.get))(`${n}${e}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let r=i?.lyrics;if(!r)return{status:"missing_lyrics",data:null};let a=r.lines,s;if(r.syncType==="LINE_SYNCED"){let o=a.map((l,u)=>{let c=Number(l.startTimeMs)||0,d=u<a.length-1?Number(a[u+1].startTimeMs):c+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:c,EndTime:d,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:c,EndTime:d,OppositeAligned:!1,IsRTL:!1}});s={Id:e,Type:"Line",SongWriters:[],Content:o,StartTime:o.length>0?o[0].StartTime:0,EndTime:o.length>0?o[o.length-1].EndTime:0,Provider:"spotify"}}else s={Id:e,Type:"Static",SongWriters:[],Lines:a.map(o=>({Text:o.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:s}}catch(e){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:e instanceof Error?e.message:String(e)}}}}var gn=["https://api.spicylyrics.org","https://coregateway.spicylyrics.org","https://lcgateway.spikerko.org"],vt=gn[0];async function hn(t,e){try{return await pn(vt,t,e)}catch{for(let n of gn)if(n!==vt)try{let i=await pn(n,t,e);return vt=n,i}catch{continue}}throw new Error("All nodes are currently unreachable")}async function pn(t,e,n){let i=await fetch(`${t}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":yt,...n&&{"SpicyLyrics-WebAuth":n}},body:JSON.stringify({queries:e,client:{version:yt}})});if(!i.ok)throw new Error(`Node ${t} failed`);return i.json()}var X,ke;async function mn(){return X&&X.expiresAtTime-Date.now()>2e3?X.accessToken:ke||(ke=(async()=>{let t=await K(()=>Spicetify.CosmosAsync),e=await K(()=>Spicetify.Platform);try{X=await t.get("sp://oauth/v2/token")}catch(n){n.message?.includes("Resolver not found")&&e.Session&&(X={accessToken:e.Session.accessToken,expiresAtTime:e.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{ke=void 0}if(!X)throw new Error("Could not retrieve Spotify Access Token");return X.accessToken})(),ke)}async function bn({id:t}){try{let e=await jr(t),n=Wr(e);if(!e||!n)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let i=Ur(n.result);if(i.status==="missing_lyrics")return{status:"missing_lyrics",data:null};if(i.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:i.message}};let r=i.data;return r.Provider="spicy",Dr(r),{status:"success",data:r}}catch(e){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:e instanceof Error?e.message:String(e)}}}}async function jr(t){let n=`Bearer ${await mn()}`;return await hn([{operation:"lyrics",variables:{id:t,auth:"SpicyLyrics-WebAuth"}}],n)}function Dr(t){if(t.Type==="Static")return;let e=n=>Math.round(Number(n||0)*1e3);if(t.StartTime=e(t.StartTime),t.EndTime=e(t.EndTime),t.Type==="Syllable")for(let n of t.Content){if(n.Lead){n.Lead.StartTime=e(n.Lead.StartTime),n.Lead.EndTime=e(n.Lead.EndTime);for(let i of n.Lead.Syllables)i.StartTime=e(i.StartTime),i.EndTime=e(i.EndTime)}if(n.Background)for(let i of n.Background){i.StartTime=e(i.StartTime),i.EndTime=e(i.EndTime);for(let r of i.Syllables)r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime)}}else if(t.Type==="Line")for(let n of t.Content)n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime)}function Ur(t){if(!t||typeof t!="object")return{status:"error",message:"Spicy returned an empty result"};let e=t,n=e.httpStatus,i=e.data??t;return n===404||xt(i,"MISSING_LYRICS")?{status:"missing_lyrics"}:n&&n!==200?{status:"error",message:yn(i)}:xt(i)?{status:"error",message:yn(i)}:Vr(i)?{status:"success",data:i}:{status:"error",message:"Unexpected response from Spicy"}}function Wr(t){return(t?.queries.flat()??[]).find(n=>n.operation==="lyrics"&&!!n.result)}function Vr(t){if(!t||typeof t!="object"||!("Type"in t))return!1;let e=t.Type;return e==="Syllable"||e==="Line"||e==="Static"}function xt(t,e){if(!t||typeof t!="object"||!("error"in t))return!1;let n=t.error;return typeof n=="string"&&(!e||n===e)}function yn(t){return xt(t)?t.message??t.error:"Unexpected Error from Spicy"}var Kr={spotify:{id:"spotify",fetch:bt},spicy:{id:"spicy",fetch:bn}},wt=new Map;async function vn(t){let e=t.id;if(!t.forceRefresh&&wt.has(e))return{status:"success",data:wt.get(e)};let n=!1;for(let i of fn){let r=Kr[i];if(!r)continue;let a=await r.fetch(t);if(a.status==="success"&&a.data){let s=i==="spicy"?await $r(t,a.data):a.data;return wt.set(e,s),{...a,data:s}}if(a.status==="missing_lyrics"){n=!0;continue}}return n?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}async function $r(t,e){if(e.Type!=="Syllable"&&e.Type!=="Line")return e;try{let n=await bt(t);if(n.status!=="success"||!n.data)return e;let i=Jr(n.data);if(i.length===0||e.Type==="Line")return e;e.Content.forEach(r=>{let a=r.Lead,s=Gr(i,a?.StartTime??0,a?.EndTime??0);s&&(r.LiquidLyricsOriginalText=s.text,a&&(a.LiquidLyricsOriginalText=s.text))})}catch{return e}return e}function Jr(t){return t.Type!=="Line"?[]:t.Content.filter(e=>e.Type!=="Interlude").map(e=>({text:Yr(e.Text),start:Number(e.StartTime)||0,end:Number(e.EndTime)||0})).filter(e=>e.text&&!e.text.includes("\u266A")&&!e.text.includes("\xE2\u2122\xAA"))}function Gr(t,e,n){let i=Number(e)||0,r=Number(n)||i,a=(i+r)/2,s=null,o=Number.POSITIVE_INFINITY;for(let l of t){let u=(l.start+l.end)/2,c=Math.abs(l.start-i),d=Math.abs(u-a),b=c*.75+d*.25;b<o&&(s=l,o=b)}return s&&o<=3500?s:null}function Yr(t){return String(t??"").replace(/\s+/g," ").trim()}var Zr="liquid-lyrics-mode",xn="liquid-lyrics-romanization";var Al=localStorage.getItem(Zr)||"romanization",wn="liquid-lyrics-romanization-display",Ln=(()=>{let t=localStorage.getItem(wn);return t==="off"||t==="romaji"||t==="furigana"?t:localStorage.getItem(xn)==="true"?"romaji":"off"})();function I(){return Ln}function je(t){Ln=t,localStorage.setItem(wn,t),localStorage.setItem(xn,String(t!=="off"))}var De="liquid-lyrics-tooltip";function P(t,e){t.dataset.tooltip=e;let n=()=>Xr(t,t.dataset.tooltip||e);t.addEventListener("pointerenter",n),t.addEventListener("focus",n),t.addEventListener("pointerleave",Q),t.addEventListener("blur",Q),t.addEventListener("click",()=>window.setTimeout(()=>kn(t),0))}function Xr(t,e){if(t.hasAttribute("disabled")||t.hidden)return;let n=Qr(t);n.textContent=e,n.classList.add("visible"),kn(t)}function Q(){document.getElementById(De)?.classList.remove("visible")}function Qr(t){let e=ea(t),n=document.getElementById(De);return n||(n=document.createElement("div"),n.id=De,n.className="liquid-lyrics-tooltip"),n.parentElement!==e&&e.appendChild(n),n}function ea(t){let e=document.fullscreenElement;return e instanceof HTMLElement&&e.contains(t)?e:document.body}function kn(t){let e=document.getElementById(De);if(!e?.classList.contains("visible"))return;let n=t.getBoundingClientRect(),i=9,r=e.offsetWidth||80,a=e.offsetHeight||28,s=Math.max(8,n.top-a-i),o=ta(n.left+n.width/2,r/2+8,window.innerWidth-r/2-8);e.style.left=`${o}px`,e.style.top=`${s}px`}function ta(t,e,n){return Math.min(n,Math.max(e,t))}var Ai=dn(jn()),_i=dn(ti());function de(t){return t===null?"null":t!==Object(t)?typeof t:{}.toString.call(t).slice(8,-1).toLowerCase()}function O(t){return de(t)!=="string"?!0:!t.length}function fe(t="",e,n){if(O(t))return!1;let i=t.charCodeAt(0);return e<=i&&i<=n}var ni={HIRAGANA:"toHiragana",KATAKANA:"toKatakana"},ui={HEPBURN:"hepburn"},xa={useObsoleteKana:!1,passRomaji:!1,convertLongVowelMark:!0,upcaseKatakana:!1,IMEMode:!1,romanization:ui.HEPBURN},wa=65,La=90,ka=65345,Ta=65370,Ea=65313,Sa=65338,Pt=12353,Aa=12438,Ot=12449,_a=12540,Ma=19968,Ra=40879,Ca=12293,Na=12540,qa=12539,Ia=[65296,65305],Pa=[Ea,Sa],Oa=[ka,Ta],za=[65281,65295],Fa=[65306,65311],Ba=[65339,65343],Ha=[65371,65376],ja=[65504,65518],Da=[12352,12447],Ua=[12448,12543],Wa=[65382,65439],Va=[12539,12540],di=[65377,65381],Ka=[12288,12351],$a=[19968,40959],Ja=[13312,19903],Ga=[Da,Ua,di,Wa],Ya=[Ka,di,Va,za,Fa,Ba,Ha,ja],Kl=[...Ga,...Ya,Pa,Oa,Ia,$a,Ja],Za=[0,127],Xa=[[256,257],[274,275],[298,299],[332,333],[362,363]],Qa=[[8216,8217],[8220,8221]],es=[Za,...Xa],ts=[[32,47],[58,63],[91,96],[123,126],...Qa];var ii=Number.isNaN||function(e){return typeof e=="number"&&e!==e};function ns(t,e){return!!(t===e||ii(t)&&ii(e))}function is(t,e){if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(!ns(t[n],e[n]))return!1;return!0}function fi(t,e){e===void 0&&(e=is);var n=null;function i(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];if(n&&n.lastThis===this&&e(r,n.lastArgs))return n.lastResult;var s=t.apply(this,r);return n={lastResult:s,lastArgs:r,lastThis:this},s}return i.clear=function(){n=null},i}var ri=Object.prototype.hasOwnProperty;function ai(t,e,n){for(n of t.keys())if(ue(n,e))return n}function ue(t,e){var n,i,r;if(t===e)return!0;if(t&&e&&(n=t.constructor)===e.constructor){if(n===Date)return t.getTime()===e.getTime();if(n===RegExp)return t.toString()===e.toString();if(n===Array){if((i=t.length)===e.length)for(;i--&&ue(t[i],e[i]););return i===-1}if(n===Set){if(t.size!==e.size)return!1;for(i of t)if(r=i,r&&typeof r=="object"&&(r=ai(e,r),!r)||!e.has(r))return!1;return!0}if(n===Map){if(t.size!==e.size)return!1;for(i of t)if(r=i[0],r&&typeof r=="object"&&(r=ai(e,r),!r)||!ue(i[1],e.get(r)))return!1;return!0}if(n===ArrayBuffer)t=new Uint8Array(t),e=new Uint8Array(e);else if(n===DataView){if((i=t.byteLength)===e.byteLength)for(;i--&&t.getInt8(i)===e.getInt8(i););return i===-1}if(ArrayBuffer.isView(t)){if((i=t.byteLength)===e.byteLength)for(;i--&&t[i]===e[i];);return i===-1}if(!n||typeof t=="object"){i=0;for(n in t)if(ri.call(t,n)&&++i&&!ri.call(e,n)||!(n in e)||!ue(t[n],e[n]))return!1;return Object.keys(e).length===i}}return t!==t&&e!==e}var zt=(t={})=>Object.assign({},xa,t);function pi(t,e,n){let i=e;function r(o,l){if(o[l]!==void 0)return Object.assign({"":o[""]+l},o[l])}function a(o,l){let u=o.charAt(0);return s(Object.assign({"":u},i[u]),o.slice(1),l,l+1)}function s(o,l,u,c){if(!l)return n||Object.keys(o).length===1?o[""]?[[u,c,o[""]]]:[]:[[u,c,null]];if(Object.keys(o).length===1)return[[u,c,o[""]]].concat(a(l,c));let d=r(o,l.charAt(0));return d===void 0?[[u,c,o[""]]].concat(a(l,c)):s(d,l.slice(1),u,c+1)}return a(t,0)}function Ft(t){return Object.entries(t).reduce((e,[n,i])=>{let r=de(i)==="string";return e[n]=r?{"":i}:Ft(i),e},{})}function gi(t,e){return e.split("").reduce((n,i)=>(n[i]===void 0&&(n[i]={}),n[i]),t)}function hi(t={}){let e={};return de(t)==="object"&&Object.entries(t).forEach(([n,i])=>{let r=e;n.split("").forEach(a=>{r[a]===void 0&&(r[a]={}),r=r[a]}),r[""]=i}),function(i){let r=JSON.parse(JSON.stringify(i));function a(s,o){return s===void 0||de(s)==="string"?o:Object.entries(o).reduce((l,[u,c])=>(l[u]=a(s[u],c),l),s)}return a(r,e)}}function mi(t,e){return e?de(e)==="function"?e(t):hi(e)(t):t}var rs={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u304A",k:{a:"\u304B",i:"\u304D",u:"\u304F",e:"\u3051",o:"\u3053"},s:{a:"\u3055",i:"\u3057",u:"\u3059",e:"\u305B",o:"\u305D"},t:{a:"\u305F",i:"\u3061",u:"\u3064",e:"\u3066",o:"\u3068"},n:{a:"\u306A",i:"\u306B",u:"\u306C",e:"\u306D",o:"\u306E"},h:{a:"\u306F",i:"\u3072",u:"\u3075",e:"\u3078",o:"\u307B"},m:{a:"\u307E",i:"\u307F",u:"\u3080",e:"\u3081",o:"\u3082"},y:{a:"\u3084",u:"\u3086",o:"\u3088"},r:{a:"\u3089",i:"\u308A",u:"\u308B",e:"\u308C",o:"\u308D"},w:{a:"\u308F",i:"\u3090",e:"\u3091",o:"\u3092"},g:{a:"\u304C",i:"\u304E",u:"\u3050",e:"\u3052",o:"\u3054"},z:{a:"\u3056",i:"\u3058",u:"\u305A",e:"\u305C",o:"\u305E"},d:{a:"\u3060",i:"\u3062",u:"\u3065",e:"\u3067",o:"\u3069"},b:{a:"\u3070",i:"\u3073",u:"\u3076",e:"\u3079",o:"\u307C"},p:{a:"\u3071",i:"\u3074",u:"\u3077",e:"\u307A",o:"\u307D"},v:{a:"\u3094\u3041",i:"\u3094\u3043",u:"\u3094",e:"\u3094\u3047",o:"\u3094\u3049"}},as={".":"\u3002",",":"\u3001",":":"\uFF1A","/":"\u30FB","!":"\uFF01","?":"\uFF1F","~":"\u301C","-":"\u30FC","\u2018":"\u300C","\u2019":"\u300D","\u201C":"\u300E","\u201D":"\u300F","[":"\uFF3B","]":"\uFF3D","(":"\uFF08",")":"\uFF09","{":"\uFF5B","}":"\uFF5D"},si={k:"\u304D",s:"\u3057",t:"\u3061",n:"\u306B",h:"\u3072",m:"\u307F",r:"\u308A",g:"\u304E",z:"\u3058",d:"\u3062",b:"\u3073",p:"\u3074",v:"\u3094",q:"\u304F",f:"\u3075"},yi={ya:"\u3083",yi:"\u3043",yu:"\u3085",ye:"\u3047",yo:"\u3087"},bi={a:"\u3041",i:"\u3043",u:"\u3045",e:"\u3047",o:"\u3049"},oi={sh:"sy",ch:"ty",cy:"ty",chy:"ty",shy:"sy",j:"zy",jy:"zy",shi:"si",chi:"ti",tsu:"tu",ji:"zi",fu:"hu"},ss=Object.assign({tu:"\u3063",wa:"\u308E",ka:"\u30F5",ke:"\u30F6"},bi,yi),os={yi:"\u3044",wu:"\u3046",ye:"\u3044\u3047",wi:"\u3046\u3043",we:"\u3046\u3047",kwa:"\u304F\u3041",whu:"\u3046",tha:"\u3066\u3083",thu:"\u3066\u3085",tho:"\u3066\u3087",dha:"\u3067\u3083",dhu:"\u3067\u3085",dho:"\u3067\u3087"},ls={wh:"\u3046",kw:"\u304F",qw:"\u304F",q:"\u304F",gw:"\u3050",sw:"\u3059",ts:"\u3064",th:"\u3066",tw:"\u3068",dh:"\u3067",dw:"\u3069",fw:"\u3075",f:"\u3075"};function cs(){let t=Ft(rs),e=r=>gi(t,r);Object.entries(si).forEach(([r,a])=>{Object.entries(yi).forEach(([s,o])=>{e(r+s)[""]=a+o})}),Object.entries(as).forEach(([r,a])=>{e(r)[""]=a}),Object.entries(ls).forEach(([r,a])=>{Object.entries(bi).forEach(([s,o])=>{let l=e(r+s);l[""]=a+o})}),["n","n'","xn"].forEach(r=>{e(r)[""]="\u3093"}),t.c=JSON.parse(JSON.stringify(t.k)),Object.entries(oi).forEach(([r,a])=>{let s=r.slice(0,r.length-1),o=r.charAt(r.length-1),l=e(s);l[o]=JSON.parse(JSON.stringify(e(a)))});function n(r){return[...Object.entries(oi),["c","k"]].reduce((a,[s,o])=>r.startsWith(o)?a.concat(r.replace(o,s)):a,[])}Object.entries(ss).forEach(([r,a])=>{let s=d=>d.charAt(d.length-1),o=d=>d.slice(0,d.length-1),l=`x${r}`,u=e(l);u[""]=a;let c=e(`l${o(r)}`);c[s(r)]=u,n(r).forEach(d=>{["l","x"].forEach(b=>{let k=e(b+o(d));k[s(d)]=e(b+r)})})}),Object.entries(os).forEach(([r,a])=>{e(r)[""]=a});function i(r){return Object.entries(r).reduce((a,[s,o])=>(s?a[s]=i(o):a[s]=`\u3063${o}`,a),{})}return[...Object.keys(si),"c","y","w","j"].forEach(r=>{let a=t[r];a[r]=i(a)}),delete t.n.n,Object.freeze(JSON.parse(JSON.stringify(t)))}var Ct=null;function us(){return Ct==null&&(Ct=cs()),Ct}var ds=hi({wi:"\u3090",we:"\u3091"});function fs(t){let e=JSON.parse(JSON.stringify(t));return e.n.n={"":"\u3093"},e.n[" "]={"":"\u3093"},e}function ps(t=""){return O(t)?!1:fe(t,wa,La)}function Ee(t=""){return O(t)?!1:t.charCodeAt(0)===Na}function vi(t=""){return O(t)?!1:t.charCodeAt(0)===qa}function xi(t=""){return O(t)?!1:Ee(t)?!0:fe(t,Pt,Aa)}function gs(t=""){let e=[];return t.split("").forEach(n=>{if(Ee(n)||vi(n))e.push(n);else if(xi(n)){let i=n.charCodeAt(0)+(Ot-Pt),r=String.fromCharCode(i);e.push(r)}else e.push(n)}),e.join("")}var wi=fi((t,e,n)=>{let i=us();return i=t?fs(i):i,i=e?ds(i):i,n&&(i=mi(i,n)),i},ue);function li(t="",e={},n){let i;return n?i=e:(i=zt(e),n=wi(i.IMEMode,i.useObsoleteKana,i.customKanaMapping)),hs(t,i,n).map(r=>{let[a,s,o]=r;if(o===null)return t.slice(a);let l=i.IMEMode===ni.HIRAGANA,u=i.IMEMode===ni.KATAKANA||[...t.slice(a,s)].every(ps);return l||!u?o:gs(o)}).join("")}function hs(t="",e={},n){let{IMEMode:i,useObsoleteKana:r,customKanaMapping:a}=e;return n||(n=wi(i,r,a)),pi(t.toLowerCase(),n,!i)}function ms(t=""){return O(t)?!1:es.some(([e,n])=>fe(t,e,n))}function Li(t="",e){let n=de(e)==="regexp";return O(t)?!1:[...t].every(i=>{let r=ms(i);return n?r||e.test(i):r})}function It(t=""){return fe(t,Ot,_a)}function ys(t=""){return O(t)?!1:[...t].every(xi)}function ki(t=""){return O(t)?!1:[...t].every(It)}function bs(t=""){return O(t)?!1:t.charCodeAt(0)===Ca}function vs(t=""){return fe(t,Ma,Ra)||bs(t)}function xs(t=""){return O(t)?!1:[...t].every(vs)}function ws(t="",e={passKanji:!0}){let n=[...t],i=!1;return e.passKanji||(i=n.some(xs)),(n.some(ys)||n.some(ki))&&n.some(Li)&&!i}var Ls=(t,e)=>Ee(t)&&e<1,ks=(t,e)=>Ee(t)&&e>0,Ts=t=>["\u30F6","\u30F5"].includes(t),Es={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u3046"};function Ke(t="",e,{isDestinationRomaji:n,convertLongVowelMark:i}={}){let r="";return t.split("").reduce((a,s,o)=>{if(vi(s)||Ls(s,o)||Ts(s))return a.concat(s);if(i&&r&&ks(s,o)){let l=e(r).slice(-1);return It(t[o-1])&&l==="o"&&n?a.concat("\u304A"):a.concat(Es[l])}if(!Ee(s)&&It(s)){let l=s.charCodeAt(0)+(Pt-Ot),u=String.fromCharCode(l);return r=u,a.concat(u)}return r="",a.concat(s)},[]).join("")}var Nt=null,Ss={\u3042:"a",\u3044:"i",\u3046:"u",\u3048:"e",\u304A:"o",\u304B:"ka",\u304D:"ki",\u304F:"ku",\u3051:"ke",\u3053:"ko",\u3055:"sa",\u3057:"shi",\u3059:"su",\u305B:"se",\u305D:"so",\u305F:"ta",\u3061:"chi",\u3064:"tsu",\u3066:"te",\u3068:"to",\u306A:"na",\u306B:"ni",\u306C:"nu",\u306D:"ne",\u306E:"no",\u306F:"ha",\u3072:"hi",\u3075:"fu",\u3078:"he",\u307B:"ho",\u307E:"ma",\u307F:"mi",\u3080:"mu",\u3081:"me",\u3082:"mo",\u3089:"ra",\u308A:"ri",\u308B:"ru",\u308C:"re",\u308D:"ro",\u3084:"ya",\u3086:"yu",\u3088:"yo",\u308F:"wa",\u3090:"wi",\u3091:"we",\u3092:"wo",\u3093:"n",\u304C:"ga",\u304E:"gi",\u3050:"gu",\u3052:"ge",\u3054:"go",\u3056:"za",\u3058:"ji",\u305A:"zu",\u305C:"ze",\u305E:"zo",\u3060:"da",\u3062:"ji",\u3065:"zu",\u3067:"de",\u3069:"do",\u3070:"ba",\u3073:"bi",\u3076:"bu",\u3079:"be",\u307C:"bo",\u3071:"pa",\u3074:"pi",\u3077:"pu",\u307A:"pe",\u307D:"po",\u3094\u3041:"va",\u3094\u3043:"vi",\u3094:"vu",\u3094\u3047:"ve",\u3094\u3049:"vo"},As={"\u3002":".","\u3001":",","\uFF1A":":","\u30FB":"/","\uFF01":"!","\uFF1F":"?","\u301C":"~",\u30FC:"-","\u300C":"\u2018","\u300D":"\u2019","\u300E":"\u201C","\u300F":"\u201D","\uFF3B":"[","\uFF3D":"]","\uFF08":"(","\uFF09":")","\uFF5B":"{","\uFF5D":"}","\u3000":" "},_s=["\u3042","\u3044","\u3046","\u3048","\u304A","\u3084","\u3086","\u3088"],qt={\u3083:"ya",\u3085:"yu",\u3087:"yo"},Ms={\u3043:"yi",\u3047:"ye"},Rs={\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},Cs=["\u304D","\u306B","\u3072","\u307F","\u308A","\u304E","\u3073","\u3074","\u3094","\u304F","\u3075"],Ns={\u3057:"sh",\u3061:"ch",\u3058:"j",\u3062:"j"},qs={\u3063:"",\u3083:"ya",\u3085:"yu",\u3087:"yo",\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},ci={b:"b",c:"t",d:"d",f:"f",g:"g",h:"h",j:"j",k:"k",m:"m",p:"p",q:"q",r:"r",s:"s",t:"t",v:"v",w:"w",x:"x",z:"z"};function Is(){return Nt==null&&(Nt=Os()),Nt}function Ps(t){switch(t){case ui.HEPBURN:return Is();default:return{}}}function Os(){let t=Ft(Ss),e=i=>gi(t,i),n=(i,r)=>{e(i)[""]=r};return Object.entries(As).forEach(([i,r])=>{e(i)[""]=r}),[...Object.entries(qt),...Object.entries(Rs)].forEach(([i,r])=>{n(i,r)}),Cs.forEach(i=>{let r=e(i)[""][0];Object.entries(qt).forEach(([a,s])=>{n(i+a,r+s)}),Object.entries(Ms).forEach(([a,s])=>{n(i+a,r+s)})}),Object.entries(Ns).forEach(([i,r])=>{Object.entries(qt).forEach(([a,s])=>{n(i+a,r+s[1])}),n(`${i}\u3043`,`${r}yi`),n(`${i}\u3047`,`${r}e`)}),t.\u3063=Ti(t),Object.entries(qs).forEach(([i,r])=>{n(i,r)}),_s.forEach(i=>{n(`\u3093${i}`,`n'${e(i)[""]}`)}),Object.freeze(JSON.parse(JSON.stringify(t)))}function Ti(t){return Object.entries(t).reduce((e,[n,i])=>{if(n)e[n]=Ti(i);else{let r=i.charAt(0);e[n]=Object.keys(ci).includes(r)?ci[r]+i:i}return e},{})}var Ei=fi((t,e)=>{let n=Ps(t);return e&&(n=mi(n,e)),n},ue);function ne(t="",e={},n){let i=zt(e);return n||(n=Ei(i.romanization,i.customRomajiMapping)),zs(t,i,n).map(r=>{let[a,s,o]=r;return i.upcaseKatakana&&ki(t.slice(a,s))?o.toUpperCase():o}).join("")}function zs(t,e,n){n||(n=Ei(e.romanization,e.customRomajiMapping));let i=Object.assign({},{isDestinationRomaji:!0},e);return pi(Ke(t,ne,i),n,!e.IMEMode)}function Fs(t=""){return O(t)?!1:ts.some(([e,n])=>fe(t,e,n))}function Si(t="",e={}){let n=zt(e);if(n.passRomaji)return Ke(t,ne,n);if(ws(t,{passKanji:!0})){let i=Ke(t,ne,n);return li(i.toLowerCase(),n)}return Li(t)||Fs(t)?li(t.toLowerCase(),n):Ke(t,ne,n)}var Hs=["https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict","https://unpkg.com/kuromoji@0.1.2/dict"],js=["base.dat.gz","check.dat.gz","tid.dat.gz","tid_pos.dat.gz","tid_map.dat.gz","cc.dat.gz","unk.dat.gz","unk_pos.dat.gz","unk_map.dat.gz","unk_char.dat.gz","unk_compat.dat.gz","unk_invoke.dat.gz"],Ds=["https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://fastly.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://unpkg.com/pinyin-pro@3/dist/index.min.js"];function Ht(t){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(t)}function jt(t){return/[가-힯ᄀ-ᇿ㄰-㆏]/.test(t)}function $e(t){return/[㐀-䶿一-鿿豈-﫿]/.test(t)}function Mi(t){let e=!1;for(let n of t){if(Ht(n))return"ja";if(jt(n))return"ko";$e(n)&&(e=!0)}return e?"zh":null}async function Ri(t,e){if(t.length===0)return[];if(e==="ko")return t.map(s=>J(Oi(s)));if(e==="zh"){let s=await zi();return s?t.map(o=>J(Fi(s,o))):null}let n=t.join(""),i=await Je(n);if(!i)return null;let r=Ii(t),a=t.map(()=>[]);for(let s of i)Pi(s,r,(o,l,u)=>{let c=u?s.reading||s.surface:$s(s,l);c&&a[o].push(c)});return t.map((s,o)=>J(a[o].map(l=>String(ne(l))).filter(Boolean).join(" ")))}async function Ci(t,e){let n=J(t);if(!n)return"";if(e==="ko")return J(Oi(n));if(e==="zh"){let a=await zi();return a?J(Fi(a,n)):null}let i=await Je(n);if(!i)return null;let r=i.map(a=>String(ne(a.reading||a.surface))).map(a=>a.trim()).filter(Boolean).join(" ");return J(r)}async function Ni(t){if(t.length===0)return[];let e=t.join(""),n=await Je(e);if(!n)return null;let i=Ii(t),r=t.map(()=>[]),a=t.map(()=>!1);for(let s of n)Pi(s,i,(o,l,u)=>{u&&s.hasKanji&&s.reading?(r[o].push(`<ruby>${$(s.surface)}<rt>${$(s.reading)}</rt></ruby>`),a[o]=!0):r[o].push($(l))});return t.map((s,o)=>a[o]?r[o].join(""):null)}async function qi(t){let e=J(t);if(!e)return"";let n=await Je(e);if(!n)return null;let i=!1,r=0,a="";for(let s of n)s.start>r&&(a+=$(e.slice(r,s.start))),s.hasKanji&&s.reading?(a+=`<ruby>${$(s.surface)}<rt>${$(s.reading)}</rt></ruby>`,i=!0):a+=$(s.surface),r=s.end;return r<e.length&&(a+=$(e.slice(r))),i?a:""}var Se=null;function Us(){return Se||(Se=(async()=>{for(let t of Hs){let e=await Ws(t);if(e)return e;console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${t}, trying next source\u2026`)}return console.warn("[Liquid Lyrics] Local Japanese romanization unavailable: no dictionary source worked."),null})(),Se.then(t=>{t||(Se=null)})),Se}async function Ws(t){try{let e=await Promise.all(js.map(i=>Vs(`${t}/${i}`))),n=new Ai.default;return n.loadTrie(new Int32Array(e[0]),new Int32Array(e[1])),n.loadTokenInfoDictionaries(new Uint8Array(e[2]),new Uint8Array(e[3]),new Uint8Array(e[4])),n.loadConnectionCosts(new Int16Array(e[5])),n.loadUnknownDictionaries(new Uint8Array(e[6]),new Uint8Array(e[7]),new Uint8Array(e[8]),new Uint8Array(e[9]),new Uint32Array(e[10]),new Uint8Array(e[11])),new _i.default(n)}catch{return null}}async function Vs(t){let e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status} for ${t}`);let n=new Uint8Array(await e.arrayBuffer());if(n[0]===31&&n[1]===139){let i=new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(i).arrayBuffer()}return n.buffer}async function Je(t){if(!t)return[];let e=await Us();if(!e)return null;let n;try{n=e.tokenize(t)}catch{return null}let i=[],r=0;for(let a of n){let s=String(a?.surface_form??"");if(!s)continue;let o=Number(a?.word_position),l=Number.isFinite(o)&&o>0?o-1:Math.max(r,t.indexOf(s,r)),u=l+s.length;r=u;let c=$e(s),d=typeof a?.reading=="string"&&a.reading!=="*"?a.reading:"",b=d?String(Si(d)):c?"":s;b=Ks(s,String(a?.pos??""),b),i.push({start:l,end:u,surface:s,reading:b,hasKanji:c})}return i}function Ks(t,e,n){return e.includes("\u52A9\u8A5E")?t==="\u306F"?"\u308F":t==="\u3078"?"\u3048":t==="\u3092"?"\u304A":n:n}function Ii(t){let e=[],n=0;for(let i of t)e.push([n,n+i.length]),n+=i.length;return e}function Pi(t,e,n){let i=t.end-t.start;if(!(i<=0))for(let r=0;r<e.length;r++){let[a,s]=e[r],o=Math.max(a,t.start),l=Math.min(s,t.end);if(l<=o)continue;let u=t.surface.slice(o-t.start,l-t.start);n(r,u,l-o>=i)}}function $s(t,e){let n=t.reading||t.surface,i=t.end-t.start;if(i<=0||!n)return"";let r=t.surface.indexOf(e);if(r<0)return"";let a=Math.round(n.length*r/i),s=Math.round(n.length*(r+e.length)/i);return n.slice(a,s)}var Js=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"],Gs=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"],Ys=["","k","k","k","n","n","n","t","l","k","m","p","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"],Zs=["","g","kk","ks","n","nj","nh","d","r","lg","lm","lb","ls","lt","lp","lh","m","b","ps","s","ss","ng","j","ch","k","t","p","h"];function Oi(t){let e=Array.from(t),n="";for(let i=0;i<e.length;i++){let r=e[i].codePointAt(0)??0;if(r<44032||r>55203){n+=e[i];continue}let a=r-44032,s=Math.floor(a/588),o=Math.floor(a%588/28),l=a%28,u=e[i+1]?.codePointAt(0)??0,b=(u>=44032&&u<=55203?Math.floor((u-44032)/588):-1)===11;n+=Js[s]+Gs[o],n+=b?Zs[l]:Ys[l]}return n}async function zi(){return await Xs(Ds,()=>!!window.pinyinPro?.pinyin)?window.pinyinPro.pinyin:null}function Fi(t,e){try{return String(t(e,{toneType:"symbol",nonZh:"consecutive"}))}catch{return e}}var Bt=new Map;async function Xs(t,e){for(let n of t)if(await Qs(n,e))return!0;return!1}function Qs(t,e){if(e())return Promise.resolve(!0);let n=Bt.get(t);return n||(n=new Promise(i=>{let r=document.createElement("script");r.src=t,r.onload=()=>i(e()),r.onerror=()=>i(!1),document.head.appendChild(r)}),Bt.set(t,n),n.then(i=>{i||Bt.delete(t)})),n}function $(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function J(t){return String(t??"").replace(/\s+/g," ").trim()}function Di(t){return t.Type==="Line"?eo(t.Content??[]):t.Type==="Syllable"?to(t.Content??[]):(t.Lines??[]).map(e=>({kind:"static",text:B(e.Text),romanizedText:B(e.RomanizedText)})).filter(e=>e.text)}function eo(t){let e=[],n=M(t[0]?.StartTime,0);return t.length>0&&n>500&&e.push(Ge(0,n)),t.forEach((i,r)=>{let a=t[r+1],s=no(i,a);i.Type==="Interlude"?e.push(Ge(s.start,s.end)):e.push({kind:"line",range:s,text:B(i.Text),romanizedText:B(i.RomanizedText)}),Ui(e,s.end,M(a?.StartTime,NaN))}),e}function to(t){let e=[],n=t.map((i,r)=>io(i,t[r+1]));return n.length>0&&n[0].range.start>500&&e.push(Ge(0,n[0].range.start)),n.forEach((i,r)=>{e.push({kind:"syllable",range:i.range,text:i.lead.sourceText||i.lead.words.map(a=>a.text).join(" ").trim(),romanizedText:lo(i.lead.words),lead:i.lead,backgrounds:i.backgrounds}),Ui(e,i.range.end,n[r+1]?.range.start??NaN)}),e}function Ge(t,e){return{kind:"interlude",range:{start:t,end:Math.max(e,t+250)}}}function Ui(t,e,n){Number.isFinite(n)&&(n-e<3e3||t.push(Ge(e,n)))}function no(t,e){let n=M(t.StartTime,0),i=M(e?.StartTime,NaN),r=M(t.EndTime,n+4500),a=Wi(r,i);return{start:n,end:Vi(a,n,a,250)}}function io(t,e){let n=Hi(t.Lead),i=(t.Background??[]).map(d=>Hi(d)),r=M(e?.Lead?.StartTime,NaN),a=n.range.start,s=Number.isFinite(r)&&r>a?r:a+4500,o=Math.max(n.range.end,...i.map(d=>d.range.end)),l=Wi(o,r),c=Bi(t.Lead)||(t.Background??[]).some(Bi)?Number.POSITIVE_INFINITY:s;return{range:{start:a,end:Vi(l,a,s,250,c)},lead:n,backgrounds:i}}function Bi(t){let e=M(t?.StartTime,0),n=Number(t?.EndTime);return Number.isFinite(n)&&n>e}function Hi(t){let e=M(t?.StartTime,0),n=Number(t?.EndTime),i=Number.isFinite(n)&&n>e?M(n,e):e+4500,r={start:e,end:i};return{range:r,sourceText:co(t),words:ao(ro(t?.Syllables??[],r),r)}}function ro(t,e){let n=[],i=null,r=!1;return t.forEach((a,s)=>{let o={text:B(a.Text),romanizedText:B(a.RomanizedText),start:M(a.StartTime,e.start),end:M(a.EndTime,e.start+80),animateLetters:!1},l=!!(a.IsPartOfWord||r)&&!G(o.text)&&!G(i?.text??"");l&&i?(i.text+=o.text,i.romanizedText=po(i.romanizedText,o.romanizedText," "),i.start=Math.min(i.start,o.start),i.end=Math.max(i.end,o.end)):(i&&!l&&n.push(i),i=o),r=!!a.IsPartOfWord,(!a.IsPartOfWord||s===t.length-1)&&i&&(n.push(i),i=null)}),n.filter(a=>a.text)}function ao(t,e){if(t.length===0)return[];let n=e.start,i=Math.max(e.end,n+250),r=t.map(l=>({...l,start:U(l.start,n,i),end:U(l.end,n,i)})).filter(l=>l.text.trim().length>0),a=n;r.forEach(l=>{l.start=Math.max(a,l.start),a=l.start});let s=[];r.forEach(l=>{let u=s[s.length-1],c=u?.[0]?.start;u&&c!==void 0&&Math.abs(l.start-c)<=12?(l.start=c,u.push(l)):s.push([l])});let o=[];return s.forEach((l,u)=>{let c=l[0].start,d=s[u+1]?.[0]?.start??i,b=Math.max(c+1,d);if(l.length===1){o.push({...l[0],start:c,end:oo(l[0].end,c,b)});return}so(l,c,b).forEach(k=>o.push(k))}),o.map((l,u)=>{let c=o[u+1]?.start??i,d=Math.max(l.start+1,c),b=Math.min(Math.max(l.end,l.start+1),d);return{...l,end:b,animateLetters:Ye(l.text,l.start,b)}})}function so(t,e,n){let i=Math.max(n,e+t.length*80),r=t.reduce((s,o)=>s+ji(o.text),0)||t.length,a=e;return t.map((s,o)=>{let l=o===t.length-1,u=t.length-o,c=Math.max(1,i-a),d=(i-e)*ji(s.text)/r,b=Math.max(1,c-(u-1)),k=a,T=l?i:a+U(d,1,b);return a=T,{...s,start:k,end:T}})}function oo(t,e,n){return Number.isFinite(t)&&t>e?Math.min(t,n):n}function ji(t){return Math.max(1,Array.from(t.trim()).length)}function Ye(t,e,n){let i=Array.from(t.trim());if(i.length<3)return!1;let r=n-e;return r<750||r/i.length<90?!1:i.some(a=>/[A-Za-z0-9]/.test(a))}function lo(t){return t.map(e=>Ze(e.romanizedText)).filter(Boolean).join(" ").trim()}function B(t){return String(t??"").replace(/\s+/g," ").trim()}function Ze(t){let e=B(t);return e&&!G(e)?e:""}function G(t){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(t)}function co(t){return B(t?.LiquidLyricsOriginalText)||uo(t?.Syllables??[])}function uo(t){let e="",n="",i=!1;return t.forEach(r=>{let a=B(r.Text);if(!a)return;let s=!e||r.IsPartOfWord||i||fo(n,a);e+=s?a:` ${a}`,n=a,i=!!r.IsPartOfWord}),e.trim()}function fo(t,e){return!t||!e||/^[,.;:!?)]/.test(e)||/[(]$/.test(t)?!0:G(t)||G(e)}function po(t,e,n){let i=B(t),r=B(e);return i?r?`${i}${n}${r}`:i:r||void 0}function Wi(t,e){return!Number.isFinite(e)||e<=t?t:e-t<3e3?e:t}function Vi(t,e,n,i,r=Number.POSITIVE_INFINITY){let a=M(t,n),s=a>=e+i?a:Math.max(n,e+i);return Math.min(s,r)}function M(t,e){let n=Number(t);return Number.isFinite(n)?Math.max(0,n):e}function U(t,e=0,n=1){return Math.min(n,Math.max(e,t))}function Dt(t,e){return U((e-t.start)/Math.max(1,t.end-t.start))}function pe(t,e,n){let i=U((n-t)/(e-t));return i*i*(3-2*i)}var go=1200,ho=60,mo=750,$i=3e3,yo=[200,900,2400],bo=4e3,Ji="",Ae=0,Xe=0,Qe=0,Ut=0,Wt=!1,Gi=!1,Yi=0,Ki=[];function _e(){let t=M(Spicetify.Player?.getProgress?.(),0),e=tt(),n=performance.now(),i=Ae+(n-Xe),r=!Me(),a=e!==Ji,s=Math.abs(t-i)>go;if(r||a||s)return Qe++,Vt(t,e,n),Ut=n,!r&&(a||s)&&et(),t;if(!Gi||n-Yi>$i*2.5){let u=t-i;if(Math.abs(u)>ho){let c=Math.min(120,Math.max(0,n-Ut));Ae+=u*Math.min(1,c/mo)}}Ut=n;let o=Ae+(n-Xe),l=he();return l>0?Math.min(o,l):o}function ge(t){let e=Math.max(0,Math.round(t));Qe++,Vt(e),Spicetify.Player?.seek?.(e),et()}function Zi(){Wt||(Wt=!0,["songchange","onplaypause"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>et())}catch{}}),window.setInterval(()=>{Me()&&Xi()},$i),et())}function et(){Wt&&(Ki.forEach(t=>clearTimeout(t)),Ki=yo.map(t=>window.setTimeout(()=>void Xi(),t)))}async function Xi(){let t=vo();if(typeof t?.getPositionState!="function")return;let e=Qe,n=tt();try{let i=await t.getPositionState({}),r=Number(i?.position);if(!Number.isFinite(r)||r<0||e!==Qe||n!==tt()||!Me())return;let a=performance.now(),s=Ae+(a-Xe);if(Math.abs(r-s)>bo)return;Gi=!0,Yi=a,Vt(r,n,a)}catch{}}function vo(){return Spicetify.Platform?.PlayerAPI?._contextPlayer??Spicetify.Player?.origin?._contextPlayer??null}function Me(){let t=Spicetify.Player;return typeof t?.isPlaying=="function"?!!t.isPlaying():typeof t?.data?.isPaused=="boolean"?!t.data.isPaused:!!(t?.data?.is_playing??t?.data?.isPlaying)}function he(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{};return M(e.duration_ms??e.duration??t?.duration?.milliseconds??t?.duration_ms??Spicetify.Player?.data?.duration,0)}function tt(){return String(Spicetify.Player?.data?.item?.uri??"")}function Vt(t,e=tt(),n=performance.now()){Ji=e,Ae=Math.max(0,t),Xe=n}var Re=new Set,ie=null;function nt(t){return Re.add(t),ie===null&&(ie=requestAnimationFrame(Qi)),()=>{Re.delete(t),Re.size===0&&ie!==null&&(cancelAnimationFrame(ie),ie=null)}}function Qi(t){if(Re.size===0){ie=null;return}ie=requestAnimationFrame(Qi);let e=_e();for(let n of Re)n(e,t)}var er=900,xo=.92,wo=5e3,Lo=180,tr=1100,Kt=.75,ko=8,E=-999,me=class{constructor(e){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=E;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.romanMode="off";this.songLang=null;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.tick=(e,n)=>{if(e===this.lastProgress)return;this.lastProgress=e;let i=this.findActiveIndex(e);i!==this.activeIndex&&(this.applyPosition(i,e),this.activeIndex=i),i>=0&&(this.virtual&&this.mountAround(i),this.updateActiveLine(this.records[i],e)),this.outgoingLines.length>0&&this.updateOutgoingLines(e)};this.onUserScroll=()=>{this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},wo)};this.onContainerClick=e=>{let n=e.target?.closest(".liquid-lyrics-line");if(!n)return;let i=this.recordByEl.get(n);!i||!Number.isFinite(i.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),ge(i.start),this.forceSync(),this.scrollToRecord(i))};this.container=e.container,this.scroller=e.scroller??e.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...e},this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",n=>{(n.pointerType==="mouse"||n.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasJapanese(){return this.songLang==="ja"}get hasLyrics(){return this.records.length>0}setLyrics(e){if(this.clear(),!e)return;let n=Di(e);if(n.length===0)return;let i=this.options.virtualize&&n.some(r=>r.kind==="syllable");if(this.records=n.map((r,a)=>this.buildLineRecord(r,a)),this.records.forEach(r=>this.recordByEl.set(r.el,r)),this.hasTimeline=this.records.some(r=>Number.isFinite(r.start)),this.songLang=Mi(n.map(r=>r.kind==="interlude"?"":r.text)),i)this.initVirtualizer();else{let r=document.createDocumentFragment();this.records.forEach(a=>r.appendChild(a.el)),this.container.appendChild(r)}this.syncClock(),this.forceSync()}clear(){this.generation++,this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=E,this.lastProgress=NaN,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.songLang=null,this.container.replaceChildren()}setEnabled(e){this.enabled!==e&&(this.enabled=e,this.syncClock(),e&&this.forceSync())}setRomanized(e,n){this.romanMode=e;let i=[],r=!1;for(let a of this.records){let s=a.line;if(s.kind==="interlude"||!s.text)continue;let o=s.text,l=G(o),u=Ze(s.romanizedText);r||(r=l||!!u);let c=this.getLineLanguage(o)==="ja";if(s.kind==="line"||s.kind==="static"){if(e==="romaji"){let d=typeof a.localLineRoman=="string"?a.localLineRoman:"",b=u||d;b?this.setLineContent(a,`t:${b}`,b):(this.setLineContent(a,`t:${o}`,o),n&&l&&a.localLineRoman!==!1&&i.push(a))}else e==="furigana"&&c?typeof a.lineFurigana=="string"&&a.lineFurigana?this.setLineHtml(a,a.lineFurigana,o):(this.setLineContent(a,`t:${o}`,o),n&&a.lineFurigana!==!1&&i.push(a)):this.setLineContent(a,`t:${o}`,o);continue}if(!l){this.applyWordRomanization(a,e==="romaji");continue}e==="romaji"?Array.isArray(a.localWordRoman)?this.applyLocalWordRomanization(a):(this.restoreOriginalWords(a),n&&a.localWordRoman!==!1&&i.push(a)):e==="furigana"&&c?Array.isArray(a.wordFurigana)?this.applyWordFurigana(a):(this.restoreOriginalWords(a),n&&a.wordFurigana!==!1&&i.push(a)):this.restoreOriginalWords(a)}this.hasRomanizationValue=r,this.options.onRomanizationAvailability?.(r),i.length>0&&this.processLocalRomanization(i,e)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(e,n){let i=e.kind!=="static",r=this.options.variant==="sidebar"&&(e.kind==="line"||e.kind==="syllable"),a=document.createElement(r?"button":"div");a instanceof HTMLButtonElement&&(a.type="button"),a.className="liquid-lyrics-line";let s={index:n,el:a,line:e,start:i?e.range.start:Number.POSITIVE_INFINITY,end:i?e.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:E,interludeVis:E,interludeY:E,interludeScale:E,displayText:e.kind==="interlude"?"":e.text,displayKey:"orig",localWordRoman:null,wordFurigana:null,localLineRoman:null,lineFurigana:null,wrapper:null,height:0,rowOffset:E};if(e.kind==="interlude"){a.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&a.setAttribute("aria-hidden","true");for(let o=0;o<3;o++){let l=document.createElement("span");l.className="ll-interlude-dot",a.appendChild(l),s.dots.push(l),s.dotLift.push(0)}}else if(e.kind==="static")a.classList.add("liquid-lyrics-static"),a.textContent=e.text;else if(e.kind==="line")a.textContent=e.text;else{a.classList.add("ll-syllable-line");let o=document.createElement("div");o.className="ll-vocal-line ll-lead-vocal",a.appendChild(o),s.leadEl=o;let l=this.buildWordSpans(o,e.lead.words,"");if(this.options.renderBackgrounds)for(let u of e.backgrounds){let c=document.createElement("div");c.className="ll-vocal-line ll-background-vocal",a.appendChild(c),s.bgWords.push(...this.buildWordSpans(c,u.words,"ll-bg-syllable"))}s.words=nr(l,s.bgWords)}return s}buildWordSpans(e,n,i){let r=[];return n.forEach((a,s)=>{let o=document.createElement("span");o.className=i?`ll-syllable ${i}`:"ll-syllable",a.animateLetters&&o.classList.add("ll-long-syllable"),G(a.text)&&o.classList.add("ll-cjk-syllable"),s===n.length-1&&o.classList.add("LastWordInLine");let l=[];if(a.rubyHtml)o.classList.add("ll-ruby-syllable"),o.setAttribute("aria-label",a.text),o.innerHTML=a.rubyHtml;else if(a.animateLetters){o.setAttribute("aria-label",a.text);for(let u of a.text){let c=document.createElement("span");c.className="ll-letter",c.textContent=u,o.appendChild(c),l.push(c)}}else o.textContent=a.text;e.appendChild(o),r.push({el:o,start:a.start,end:a.end,animateLetters:a.animateLetters,letters:l,state:"idle",gradientUnit:E,lastLift:0,letterFill:null,letterLift:null})}),r}syncClock(){let e=this.enabled&&this.hasTimeline&&this.records.length>0;e&&!this.unsubscribeClock?this.unsubscribeClock=nt(this.tick):e||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(_e(),performance.now()))}lastStartedIndex(e){let n=this.records,i=0,r=n.length-1,a=-1;for(;i<=r;){let s=i+r>>1;n[s].start<=e?(a=s,i=s+1):r=s-1}return a}findActiveIndex(e){let n=this.records;if(n.length===0)return-1;let i=this.lastStartedIndex(e);if(i<0)return-1;let r=Math.max(0,i-4);for(let s=i;s>=r;s--){let o=n[s];if(e>=o.start&&e<o.end)return s}if(this.activeIndex>=0&&this.activeIndex<n.length){let s=n[this.activeIndex];if(e>=s.start&&e<s.end+er)return this.activeIndex}let a=n[i];return a.end<=e&&e-a.end<=er?i:-1}applyPosition(e,n){let i=this.activeIndex,r=this.records;for(let a=0;a<r.length;a++){let s=r[a],o=s.state==="active";if(a===e){o||this.activateLine(s,n);continue}(e>=0?a<e:s.end<=n)?o&&s.line.kind!=="interlude"&&s.end>n?this.beginOutgoing(s):(s.state!=="past"||o)&&this.completeLine(s,o):(s.state!=="future"||o)&&this.resetLine(s)}if(e>=0&&!this.userScrolling){let a=i>=0?r[i]:null,s=r[e];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),a?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===e&&this.scrollToRecord(s)},Lo):this.scrollToRecord(s)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(e,n){e.state="active",e.outgoing=!1,e.progressUnit=E,e.interludeVis=E,e.interludeY=E,e.interludeScale=E;let i=e.el.classList;if(i.remove("past","future","ll-finishing","ll-outgoing"),i.add("active"),e.line.kind==="syllable"){e.dirty=!0;for(let r of e.words)this.syncWordState(r,n)}else e.line.kind==="interlude"&&(e.dirty=!0)}beginOutgoing(e){e.state="past",e.outgoing=!0;let n=e.el.classList;n.remove("active","future","ll-finishing"),n.add("past","ll-outgoing"),e.glow&&(n.remove("ll-glow"),e.glow=!1),this.outgoingLines.includes(e)||this.outgoingLines.push(e)}updateOutgoingLines(e){for(let n=this.outgoingLines.length-1;n>=0;n--){let i=this.outgoingLines[n];if(!i.outgoing||i.state!=="past"){this.outgoingLines.splice(n,1);continue}if(e>=i.end){this.finishOutgoing(i),this.outgoingLines.splice(n,1);continue}if(e<i.start){this.outgoingLines.splice(n,1),this.resetLine(i);continue}i.line.kind==="syllable"?this.updateWords(i,e):this.writeLineProgress(i,Dt(i,e)*100)}}finishOutgoing(e){e.outgoing=!1;let n=e.el.classList;if(n.remove("ll-outgoing"),n.add("ll-finishing"),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let i of e.words)i.state!=="sung"&&this.setWordState(i,"sung")}}completeLine(e,n){e.state="past",e.outgoing=!1;let i=e.el.classList;if(i.remove("active","future","ll-outgoing"),i.add("past"),i.toggle("ll-finishing",n),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="sung"&&this.setWordState(r,"sung");for(let r of e.dots)r.classList.add("lit"),ir(r);e.dotLift.fill(0)}}resetLine(e){e.state="future",e.outgoing=!1;let n=e.el.classList;if(n.remove("active","past","ll-finishing","ll-outgoing"),n.add("future"),e.glow&&(n.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let i of e.words)i.state!=="future"&&this.setWordState(i,"future");for(let i of e.dots)i.classList.remove("lit"),ir(i);e.dotLift.fill(0)}}clearLineInline(e){let n=e.el.style;e.progressUnit!==E&&(n.removeProperty("--line-progress"),e.progressUnit=E),e.interludeVis!==E&&(n.removeProperty("--interlude-visibility"),n.removeProperty("--interlude-y"),n.removeProperty("--interlude-scale"),e.interludeVis=E,e.interludeY=E,e.interludeScale=E)}updateActiveLine(e,n){let i=Dt(e,n);if(e.line.kind==="interlude"){this.updateInterlude(e,i);return}let r=i>xo;r!==e.glow&&(e.glow=r,e.el.classList.toggle("ll-glow",r)),e.line.kind==="syllable"?this.updateWords(e,n):this.writeLineProgress(e,i*100)}writeLineProgress(e,n){let i=Math.round(n*2)/2;i!==e.progressUnit&&(e.progressUnit=i,e.el.style.setProperty("--line-progress",String(i)))}updateWords(e,n){for(let i of e.words){let r=n<i.start?"future":n>=i.end?"sung":"singing";r!==i.state&&this.setWordState(i,r),r==="singing"&&this.updateSingingWord(i,n)}}syncWordState(e,n){let i=n<e.start?"future":n>=e.end?"sung":"singing";i!==e.state&&this.setWordState(e,i)}setWordState(e,n){e.state=n;let i=e.el.classList;i.toggle("singing",n==="singing"),i.toggle("sung",n==="sung"),i.toggle("future",n==="future"),n!=="singing"&&this.clearWordInline(e)}clearWordInline(e){let n=e.el.style;if(e.gradientUnit!==E&&(n.removeProperty("--syl-progress"),e.gradientUnit=E),e.lastLift!==0&&(n.transform="",e.lastLift=0),!(!e.letterFill||!e.letterLift))for(let i=0;i<e.letters.length;i++){let r=e.letters[i];e.letterFill[i]!==E&&(r.style.removeProperty("--letter-progress"),e.letterFill[i]=E),e.letterLift[i]!==0&&(r.style.transform="",e.letterLift[i]=0)}}updateSingingWord(e,n){let i=U((n-e.start)/Math.max(1,e.end-e.start));if(e.animateLetters){this.updateLetters(e,i);return}let r=Math.round(-20+120*i);r!==e.gradientUnit&&(e.gradientUnit=r,e.el.style.setProperty("--syl-progress",String(r)));let a=Math.sin(i*Math.PI);Math.abs(a-e.lastLift)>.01&&(e.lastLift=a,e.el.style.transform=`translate3d(0, ${(-5*a).toFixed(2)}px, 0) scale(${(1+.018*a).toFixed(4)})`)}updateLetters(e,n){let i=e.letters,r=i.length;if(r===0)return;(!e.letterFill||!e.letterLift)&&(e.letterFill=new Array(r).fill(E),e.letterLift=new Array(r).fill(0));let a=Math.max(.16,1.8/r),s=n+a*pe(.7,1,n);for(let o=0;o<r;o++){let l=i[o],u=Math.round(-20+120*U(n*r-o)),c=e.letterFill[o];(Math.abs(u-c)>=4||u!==c&&(u===100||u===-20))&&(e.letterFill[o]=u,l.style.setProperty("--letter-progress",String(u)));let d=1-U(Math.abs(s-(o+.5)/r)/a),b=d<=0?0:pe(0,1,d);Math.abs(b-e.letterLift[o])>.008&&(e.letterLift[o]=b,l.style.transform=b===0?"":`translate3d(0, ${(-5.5*b).toFixed(2)}px, 0) scale(${(1+.02*b).toFixed(4)})`)}}updateInterlude(e,n){let i=pe(0,.22,n),r=1-pe(.99,1,n),a=Math.round(Math.min(i,r)*200)/200,s=Math.round(-24*pe(.76,1,n)*10)/10,o=Math.round((.72+.28*i)*500)/500,l=e.el.style;a!==e.interludeVis&&(e.interludeVis=a,l.setProperty("--interlude-visibility",String(a))),s!==e.interludeY&&(e.interludeY=s,l.setProperty("--interlude-y",`${s}px`)),o!==e.interludeScale&&(e.interludeScale=o,l.setProperty("--interlude-scale",String(o)));let u=this.options.dotLiftPx;for(let c=0;c<e.dots.length;c++){let d=e.dots[c],b=c/3,k=(c+1)/3;d.classList.toggle("lit",n>=b),d.style.opacity=n>=.99?String(r):"";let T=0;n>=b&&n<k&&(T=Math.sin((n-b)/(k-b)*Math.PI)*u),(Math.abs(T-e.dotLift[c])>.1||T===0&&e.dotLift[c]!==0)&&(e.dotLift[c]=T,d.style.transform=T===0?"":`translateY(${(-T).toFixed(2)}px)`)}}scrollToRecord(e){let n=this.scroller,i,r;if(this.virtual)this.mountAround(e.index),i=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),r=this.virtual.heights[e.index]??e.el.offsetHeight;else{if(!e.el.isConnected)return;i=To(e.el,n),r=e.el.offsetHeight}n.scrollTo({top:Math.max(0,i-n.clientHeight/2+r/2),behavior:"smooth"})}setLineContent(e,n,i){e.displayKey!==n&&(e.displayKey=n,e.displayText=i,e.el.textContent=i,this.refreshVirtualHeight(e))}setLineHtml(e,n,i){let r=`h:${n}`;e.displayKey!==r&&(e.displayKey=r,e.displayText=i,e.el.innerHTML=n,this.refreshVirtualHeight(e))}getLineLanguage(e){return Ht(e)?"ja":jt(e)?"ko":$e(e)?this.songLang==="ja"?"ja":"zh":null}applyLocalWordRomanization(e){if(e.line.kind!=="syllable"||!Array.isArray(e.localWordRoman))return;let n=e.localWordRoman,i=e.line.lead.words.map((r,a)=>{let s=n[a]||r.text;return s===r.text?r:{...r,text:s,animateLetters:Ye(s,r.start,r.end)}});this.rebuildLead(e,i,"local-roman",!0)}applyWordFurigana(e){if(e.line.kind!=="syllable"||!Array.isArray(e.wordFurigana))return;let n=e.wordFurigana,i=!1,r=e.line.lead.words.map((a,s)=>{let o=n[s];return o?(i=!0,{...a,rubyHtml:o,animateLetters:!1}):a});if(!i){this.restoreOriginalWords(e);return}this.rebuildLead(e,r,"furigana",!1)}async processLocalRomanization(e,n){let i=this.generation;for(let r of e){if(i!==this.generation||this.romanMode!==n)return;let a=r.line;if(a.kind==="interlude")continue;let s=this.getLineLanguage(a.text);if(a.kind==="syllable"){let o=a.lead.words.map(l=>l.text);if(n==="romaji"){let l=s?await Ri(o,s):null;if(i!==this.generation)return;r.localWordRoman=l??!1,this.romanMode==="romaji"&&l&&this.applyLocalWordRomanization(r)}else if(n==="furigana"){let l=await Ni(o);if(i!==this.generation)return;r.wordFurigana=l??!1,this.romanMode==="furigana"&&l&&this.applyWordFurigana(r)}}else if(n==="romaji"){let o=s?await Ci(a.text,s):null;if(i!==this.generation)return;r.localLineRoman=o||!1,this.romanMode==="romaji"&&o&&this.setLineContent(r,`t:${o}`,o)}else if(n==="furigana"){let o=await qi(a.text);if(i!==this.generation)return;r.lineFurigana=o||!1,this.romanMode==="furigana"&&o&&this.setLineHtml(r,o,a.text)}if(await new Promise(o=>requestAnimationFrame(()=>o())),i!==this.generation)return}}applyWordRomanization(e,n){if(e.line.kind!=="syllable")return;let i=!1,r=e.line.lead.words.map(a=>{let s=n?Ze(a.romanizedText):"";return!s||s===a.text?a:(i=!0,{...a,text:s,animateLetters:Ye(s,a.start,a.end)})});this.rebuildLead(e,r,i?"roman-words":"orig",!1)}restoreOriginalWords(e){e.line.kind==="syllable"&&this.rebuildLead(e,e.line.lead.words,"orig",!1)}rebuildLead(e,n,i,r){if(e.displayKey===i||!e.leadEl)return;e.displayKey=i,e.el.classList.toggle("ll-context-romanized",r),e.leadEl.replaceChildren();let a=this.buildWordSpans(e.leadEl,n,"");if(e.words=nr(a,e.bgWords),e.displayText=n.map(s=>s.text).join(" ").trim(),e.state==="active"){e.dirty=!0;let s=_e();for(let o of e.words)this.syncWordState(o,s)}else if(e.state==="past")for(let s of a)this.setWordState(s,"sung");this.refreshVirtualHeight(e)}initVirtualizer(){let e=document.createElement("div");e.className="ll-syllable-virtual-space",this.container.appendChild(e),this.container.classList.add("ll-syllable-virtualized");let n=new Map;this.records.forEach(r=>{let a=document.createElement("div");a.className="ll-syllable-virtual-row",a.appendChild(r.el),r.wrapper=a,r.height=rr(r),n.set(r.el,r.index)});let i={space:e,heights:this.records.map(r=>r.height),offsets:[],mounted:new Set,lineToIndex:n,resizeObserver:new ResizeObserver(r=>{let a=!1;for(let s of r){let o=n.get(s.target);if(o===void 0)continue;let l=Math.max(1,s.borderBoxSize?.[0]?.blockSize??s.target.offsetHeight);Math.abs((i.heights[o]??0)-l)<Kt||(i.heights[o]=l,a=!0)}a&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};i.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",i.onScroll,{passive:!0}),this.virtual=i,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let e=this.virtual;e&&(e.raf!==null&&cancelAnimationFrame(e.raf),this.scroller.removeEventListener("scroll",e.onScroll),e.resizeObserver.disconnect(),e.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let e=this.virtual;!e||e.raf!==null||(e.raf=requestAnimationFrame(()=>{e.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let e=this.virtual;if(!e)return;let n=this.scroller.scrollTop-e.space.offsetTop,i=n-tr,r=n+this.scroller.clientHeight+tr,a=new Set;for(let o=0;o<this.records.length;o++){let l=e.offsets[o]??0;l+(e.heights[o]??0)>=i&&l<=r&&a.add(o)}let s=this.activeIndex>=0?this.activeIndex:this.lastStartedIndex(this.lastProgress);if(s>=0){let o=Math.max(0,s-3),l=Math.min(this.records.length-1,s+3);for(let u=o;u<=l;u++)a.add(u)}for(let o of e.mounted)!a.has(o)&&o!==this.activeIndex&&this.unmountVirtualLine(o);for(let o of a)this.mountVirtualLine(o);this.layoutMountedRows()}mountAround(e){if(!this.virtual)return;let n=Math.max(0,e-1),i=Math.min(this.records.length-1,e+1),r=!1;for(let a=n;a<=i;a++)r=this.mountVirtualLine(a)||r;r&&this.layoutMountedRows()}mountVirtualLine(e){let n=this.virtual,i=this.records[e];if(!n||!i?.wrapper||n.mounted.has(e))return!1;n.space.appendChild(i.wrapper),n.mounted.add(e),i.rowOffset=E,n.resizeObserver.observe(i.el);let r=i.el.offsetHeight;return r>0&&Math.abs((n.heights[e]??0)-r)>=Kt&&(n.heights[e]=r,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(e){let n=this.virtual,i=this.records[e];!n||!i?.wrapper||!n.mounted.has(e)||(n.resizeObserver.unobserve(i.el),i.wrapper.parentElement===n.space&&n.space.removeChild(i.wrapper),n.mounted.delete(e))}recomputeVirtualOffsets(){let e=this.virtual;if(!e)return;let n=0;e.offsets=e.heights.map(i=>{let r=n;return n+=Math.max(1,i)+ko,r}),e.space.style.height=`${Math.max(1,n)}px`}layoutMountedRows(){let e=this.virtual;if(e)for(let n of e.mounted){let i=this.records[n];if(!i?.wrapper)continue;let r=Math.round(e.offsets[n]??0);r!==i.rowOffset&&(i.rowOffset=r,i.wrapper.style.transform=`translate3d(0, ${r}px, 0)`)}}refreshVirtualHeight(e){let n=this.virtual;if(!n)return;let i=e.el.isConnected?e.el.offsetHeight:0,r=i>0?i:rr(e);Math.abs((n.heights[e.index]??0)-r)<Kt||(n.heights[e.index]=r,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate())}};function nr(t,e){return e.length===0?t:[...t,...e].sort((n,i)=>n.start-i.start)}function ir(t){t.style.transform&&(t.style.transform=""),t.style.opacity&&(t.style.opacity="")}function rr(t){if(t.line.kind==="interlude")return 54;let e=Math.max(1,t.displayText.length),n=Math.max(1,Math.ceil(e/42)),i=t.line.kind==="syllable"?t.line.backgrounds.length:0;return 18+n*45+i*24}function To(t,e){let n=0,i=t;for(;i&&i!==e;){n+=i.offsetTop;let r=i.offsetParent;i=r instanceof HTMLElement&&e.contains(r)?r:null}return n}var q="liquid-lyrics-panel",fr="liquid-lyrics-song-card-visible",pr="liquid-lyrics-animated-bg",Ce="liquify-bg-mode",Eo=["liquify-floating-player","glowify-floating-player"],Oe="liquid-lyrics:romanization",So="https://github.com/NMWplays/Liquid-Lyrics",Ao="https://discord.gg/xGUq5mhWKA",_o=500,R=null,Ie=null,rt=null,Jt=0,ar="",sr="",at=-1,Gt=-1,or=!1,lr=!1,cr=!1,Pe=!0,ye,it=!0,$t="",Y=null;function xe(){let t=document.getElementById(q);if(t)return t;let e=document.createElement("div");e.id=q,e.className="liquid-lyrics-panel";let n=document.createElement("div");n.className="liquid-lyrics-glass-bg";let i=Co(),r=No(),a=document.createElement("div");a.className="liquid-lyrics-header";let s=document.createElement("span");s.className="liquid-lyrics-title",s.textContent="Liquid Lyrics";let o=document.createElement("div");o.className="ll-header-actions",o.append(ur("ll-header-btn ll-github-btn",Mo,"Star on GitHub",So),ur("ll-header-btn ll-discord-btn",Ro,"Join the Discord",Ao)),a.append(s,o);let l=document.createElement("div");l.className="liquid-lyrics-view";let u=qo(),c=document.createElement("div");c.className="liquid-lyrics-content",l.append(u,c);let d=Io();return e.append(i,n,r,a,l,d),wr(e),ve(e),ut(e),(document.querySelector(".Root__main-view")??document.body).appendChild(e),R=new me({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:k=>{e.classList.toggle("ll-has-romanization",k),z()}}),re(),z(),or||(or=!0,document.addEventListener("fullscreenchange",Qo)),cr||(cr=!0,window.addEventListener(Oe,()=>{R?.setRomanized(I(),S()),z()})),Ko(),e}function ot(){let t=xe();Pe=!0,t.classList.add("visible"),re(),z(),R?.setEnabled(!0),br(),ut(t);let e=t.closest(".Root__main-view");if(e)for(let n of Array.from(e.children)){let i=n;i.id===q||!i.style||(i.dataset.liquidHidden===void 0&&(i.dataset.liquidHidden=`${i.style.opacity}|${i.style.pointerEvents}`),i.style.opacity="0",i.style.pointerEvents="none")}}function lt(){let t=document.getElementById(q);if(!t)return;t.classList.remove("visible"),R?.setEnabled(!1),vr(),en(t,!1),ct();let e=t.closest(".Root__main-view");if(e)for(let n of Array.from(e.children)){let i=n;if(i.id===q||i.dataset.liquidHidden===void 0)continue;let[r="",a=""]=i.dataset.liquidHidden.split("|");i.style.opacity=r,i.style.pointerEvents=a,delete i.dataset.liquidHidden}}function gr(){S()?lt():ot()}function S(){return document.getElementById(q)?.classList.contains("visible")??!1}function hr(t=S()){let e=xe();Pe=t,t?ot():(e.classList.add("visible"),re(),z(),R?.setEnabled(!0),br()),en(e,!0),Q(),z(),ct(),ve(e),ut(e)}function Yt(t){if(xe(),!R)return;R.setLyrics(t);let e=I();R.setRomanized(e,e!=="off"),R.setEnabled(S()),re()}function ze(t){let e=xe();if(!R)return;R.setLyrics(null),re();let n=document.createElement("div");n.className="liquid-lyrics-empty",n.textContent=t,R.container.appendChild(n),e.classList.remove("ll-has-romanization"),z()}var mr={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',animatedBg:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M5 9.4c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/><path d="M5 15c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/></svg>'},Mo='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',Ro='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function ur(t,e,n,i){let r=document.createElement("button");return r.type="button",r.className=t,r.setAttribute("aria-label",n),r.innerHTML=e,r.addEventListener("click",a=>{a.stopPropagation(),window.open(i,"_blank")}),P(r,n),r}function Co(){let t=document.createElement("div");t.className="liquid-lyrics-fullscreen-bg";for(let e=0;e<4;e++){let n=document.createElement("div");n.className="ll-fullscreen-bg-tile",t.appendChild(n)}return t}function No(){let t=document.createElement("div");return t.className="liquid-lyrics-transparent-controls",t.setAttribute("aria-hidden","true"),t}function qo(){let t=document.createElement("aside");t.className="liquid-lyrics-song-card";let e=document.createElement("div");e.className="ll-song-card-cover-wrap";let n=document.createElement("img");n.className="ll-song-card-cover",n.alt="",n.decoding="async",n.loading="lazy",e.appendChild(n);let i=document.createElement("div");i.className="ll-song-card-controls",i.append(W("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>Ne(["toggleShuffle"])),W("ll-song-card-btn","previous","Previous",()=>Ne(["back","previous","skipToPrevious"])),W("ll-song-card-btn ll-song-card-play","play","Play",()=>{Ne(["togglePlay"]),window.setTimeout(re,60)}),W("ll-song-card-btn","next","Next",()=>Ne(["next","skipToNext"])),W("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>Ne(["toggleRepeat"])));let r=document.createElement("div");r.className="playback-bar ll-song-card-progress",r.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let a=document.createElement("div");a.className="ll-song-card-info";let s=document.createElement("div");s.className="ll-song-card-title";let o=document.createElement("button");o.type="button",o.className="ll-song-card-link ll-song-card-album",P(o,"Open album");let l=document.createElement("button");return l.type="button",l.className="ll-song-card-link ll-song-card-artist",P(l,"Open artist"),a.append(s,o,l),t.append(e,i,r,a),Ie={card:t,cover:n,title:s,album:o,artist:l,playButton:t.querySelector(".ll-song-card-play"),shuffleButton:t.querySelector(".ll-song-card-shuffle"),repeatButton:t.querySelector(".ll-song-card-repeat"),progressTrack:r.querySelector(".ll-card-progress-track"),progressFill:r.querySelector(".ll-card-progress-fill"),progressThumb:r.querySelector(".ll-card-progress-thumb"),currentTime:r.querySelector(".ll-card-current"),durationTime:r.querySelector(".ll-card-duration")},Oo(Ie),t}function Io(){let t=document.createElement("div");return t.className="liquid-lyrics-control-pill",t.append(W("ll-control-btn ll-card-toggle","cover","Song card",Jo),W("ll-control-btn ll-bg-toggle","animatedBg","Animated background",Go),W("ll-control-btn ll-roman-toggle","roman","Romanization",Yo),W("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",Xo)),t}function W(t,e,n,i){let r=document.createElement("button");return r.type="button",r.className=t,r.dataset.icon=e,r.setAttribute("aria-label",n),r.innerHTML=mr[e],r.addEventListener("click",a=>{a.stopPropagation(),i()}),P(r,n),r}function yr(t,e){!t||t.dataset.icon===e||(t.dataset.icon=e,t.innerHTML=mr[e])}function re(){let t=Ie;if(!t)return;let e=zo();e.cover?(t.cover.src!==e.cover&&(t.cover.src=e.cover),t.card.classList.remove("ll-no-cover")):(t.cover.removeAttribute("src"),t.card.classList.add("ll-no-cover")),$o(e.cover),t.title.textContent=e.title,t.album.textContent=e.album,t.album.disabled=!e.albumUri,t.album.onclick=()=>dr(e.albumUri),t.artist.textContent=e.artist,t.artist.disabled=!e.artistUri,t.artist.onclick=()=>dr(e.artistUri),Fe(),Be()}function Fe(){let t=Ie;if(!t)return;let e=Me(),n=e?"Pause":"Play";yr(t.playButton,e?"pause":"play"),t.playButton.setAttribute("aria-label",n),t.playButton.dataset.tooltip=n,be(t.shuffleButton,Wo());let i=Vo();be(t.repeatButton,i!=="off"),t.repeatButton.classList.toggle("ll-repeat-one",i==="track");let r=i==="track"?"Repeat one":i==="context"?"Repeat all":"Repeat";t.repeatButton.setAttribute("aria-label",r),t.repeatButton.dataset.tooltip=r}function br(){rt||(Jt=0,at=-1,Gt=-1,rt=nt(Po),Fe(),Be())}function vr(){rt?.(),rt=null}function Po(t,e){Be(t),e-Jt>=_o&&(Jt=e,Fe())}function Be(t=xr()){let e=Ie;if(!e)return;let n=he(),i=n>0?st(t/n):0;if(!e.progressTrack.classList.contains("ll-previewing")&&Math.abs(i-at)>2e-5){at=i,e.progressFill.style.transform=`scaleX(${i.toFixed(5)})`,e.progressThumb.style.left=`${(i*100).toFixed(3)}%`;let o=Math.round(i*100);o!==Gt&&(Gt=o,e.progressTrack.setAttribute("aria-valuenow",String(o)),e.progressTrack.setAttribute("aria-valuetext",`${qe(t)} of ${qe(n)}`))}let a=qe(t);a!==ar&&(ar=a,e.currentTime.textContent=a);let s=qe(n);s!==sr&&(sr=s,e.durationTime.textContent=s)}function xr(){return el(Spicetify.Player?.getProgress?.(),0)}function Oo(t){let e=t.progressTrack,n=e.querySelector(".ll-card-preview-time"),i=0,r=0,a=c=>{let d=e.getBoundingClientRect();return st((c.clientX-d.left)/Math.max(1,d.width))},s=c=>{let d=he();d<=0||(e.classList.add("ll-previewing"),n&&(n.textContent=qe(d*c),n.style.left=`${c*100}%`),t.progressFill.style.transform=`scaleX(${c.toFixed(4)})`,t.progressThumb.style.left=`${(c*100).toFixed(2)}%`)},o=c=>(r=c,i||(i=requestAnimationFrame(()=>{i=0,s(r)})),c),l=()=>{e.dataset.dragging!=="true"&&(e.classList.remove("ll-previewing"),i&&(cancelAnimationFrame(i),i=0),at=-1,Be())},u=c=>{let d=he();if(d<=0)return;let b=o(a(c));ge(d*b)};e.addEventListener("pointerenter",c=>o(a(c))),e.addEventListener("pointermove",c=>o(a(c))),e.addEventListener("pointerleave",l),e.addEventListener("blur",l),e.addEventListener("pointerdown",c=>{c.preventDefault(),c.stopPropagation(),e.dataset.dragging="true",e.setPointerCapture?.(c.pointerId),o(a(c));let d=k=>o(a(k)),b=k=>{u(k),delete e.dataset.dragging,l(),e.releasePointerCapture?.(c.pointerId),window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",b)};window.addEventListener("pointermove",d),window.addEventListener("pointerup",b,{once:!0})}),e.addEventListener("keydown",c=>{let d=he();if(d<=0)return;let b=xr(),k=c.shiftKey?15e3:5e3;c.key==="ArrowLeft"?(c.preventDefault(),ge(Math.max(0,b-k))):c.key==="ArrowRight"&&(c.preventDefault(),ge(Math.min(d,b+k)))})}function zo(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},n=Array.isArray(t?.artists)?t.artists.map(r=>r?.name).filter(Boolean).join(", "):"",i=Array.isArray(t?.artists)?t.artists.find(r=>r?.uri):null;return{title:t?.name||e.title||e.track_name||"Unknown track",artist:n||e.artist_name||e.artist||e.album_artist_name||"Unknown artist",album:t?.album?.name||e.album_title||e.album_name||"Unknown album",cover:Fo(t,e),artistUri:i?.uri||Do(e.artist_uri||e.artist_uris||""),albumUri:t?.album?.uri||e.album_uri||""}}function Fo(t,e){let n=[e.image_xlarge_url,e.image_large_url,e.image_url,e.album_image_url,e.cover_url,t?.album?.images?.[0]?.url,t?.images?.[0]?.url];for(let i of n){let r=Bo(String(i??""));if(r)return Ho(r)}return jo()}function Bo(t){return t?t.startsWith("spotify:image:")?t.replace("spotify:image:","https://i.scdn.co/image/"):t:""}function Ho(t){return t.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function jo(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function Do(t){return String(t||"").split(",")[0]?.split(";")[0]?.trim()||""}function dr(t){let e=Uo(t);if(!e)return;let n=Spicetify.Platform?.History;typeof n?.push=="function"&&(n.push(e),lt())}function Uo(t){let e=String(t||"").split(":");if(e.length<3||e[0]!=="spotify")return"";let n=e[1],i=e[2];return!i||!["album","artist","track","playlist"].includes(n)?"":`/${n}/${i}`}function Wo(){let t=Spicetify.Player;if(typeof t?.getShuffle=="function")return!!t.getShuffle();let e=t?.data??{};return!!(e.shuffle??e.shuffling??e.options?.shuffling??e.playback_options?.shuffling??e.context?.metadata?.shuffle)}function Vo(){let t=Spicetify.Player,e=t?.data??{},n=typeof t?.getRepeat=="function"?t.getRepeat():e.repeat??e.repeatMode??e.repeat_mode??e.options?.repeat??e.playback_options?.repeat??e.context?.metadata?.repeat;if(e.options?.repeatingTrack||e.playback_options?.repeating_track)return"track";if(e.options?.repeatingContext||e.playback_options?.repeating_context)return"context";if(typeof n=="number")return n===2?"track":n===1?"context":"off";let i=String(n??"").toLowerCase();return i.includes("track")||i.includes("song")||i==="one"?"track":i.includes("context")||i.includes("all")||i==="playlist"||i==="on"?"context":"off"}function Ko(){lr||(lr=!0,["songchange","onplaypause","onqueuechange"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>{Fe(),Be()})}catch{}}))}function Ne(t){let e=Spicetify.Player;for(let n of t)if(typeof e?.[n]=="function"){e[n](),window.setTimeout(re,80),window.setTimeout(Fe,180);return}}function $o(t){let n=document.getElementById(q)?.querySelector(".liquid-lyrics-fullscreen-bg");if(!n)return;let i=n.querySelectorAll(".ll-fullscreen-bg-tile");if(i.length<4)return;if(!t){i.forEach(l=>l.classList.remove("active")),$t="";return}if(t===$t)return;$t=t;let r=[i[0],i[1]],a=[i[2],i[3]],s=it?r:a,o=it?a:r;s.forEach(l=>{l.style.backgroundImage=`url("${t}")`,l.classList.add("active")}),o.forEach(l=>l.classList.remove("active")),it=!it}function qe(t){let e=Math.max(0,Math.floor(t/1e3)),n=Math.floor(e/60),i=e%60;return`${n}:${String(i).padStart(2,"0")}`}function Jo(){localStorage.setItem(fr,String(!Xt())),z()}function Zt(){return localStorage.getItem(pr)==="true"}function Go(){localStorage.setItem(pr,String(!Zt())),z()}function Yo(){let t=I(),e=R?.hasJapanese??!1,n=t==="off"?"romaji":t==="romaji"&&e?"furigana":"off";je(n),R?.setRomanized(n,!0),z(),window.dispatchEvent(new Event(Oe))}function Zo(t){return t==="romaji"?"Romanization: Romaji":t==="furigana"?"Romanization: Furigana":"Romanization"}function Xo(){let t=document.getElementById(q);if(!t)return;let e=!Qt(t);e&&(Pe=!0),en(t,e),Q(),z(),ct(),ve(t),ut(t)}function wr(t){t.classList.toggle("ll-song-card-hidden",!Xt()),t.classList.toggle("ll-romanized",I()==="romaji"),t.classList.toggle("ll-animated-bg",Zt())}function z(){let t=document.getElementById(q);if(!t)return;let e=I(),n=Qt(t);wr(t),be(t.querySelector(".ll-card-toggle"),Xt()),be(t.querySelector(".ll-roman-toggle"),e!=="off"),be(t.querySelector(".ll-fullscreen-toggle"),n);let i=t.querySelector(".ll-bg-toggle");i&&(i.hidden=n,i.disabled=n,be(i,n||Zt()));let r=t.querySelector(".ll-roman-toggle"),a=t.classList.contains("ll-has-romanization");if(r){r.hidden=!a,r.disabled=!a,yr(r,e==="furigana"?"furigana":"roman");let s=Zo(e);r.dataset.tooltip=s,r.setAttribute("aria-label",s),a||Q()}}function be(t,e){t&&(t.classList.toggle("active",e),t.setAttribute("aria-pressed",String(e)))}function Xt(){return localStorage.getItem(fr)!=="false"}function Qo(){Q();let t=document.getElementById(q);t&&document.fullscreenElement!==t&&t.classList.contains("ll-native-fullscreen")&&t.classList.remove("ll-native-fullscreen"),z(),ct(),t&&ve(t)}function Qt(t){return t.classList.contains("ll-fullscreen-mode")||document.fullscreenElement===t}function en(t,e){if(e){!Y&&t.parentNode&&(Y=document.createComment("liquid-lyrics-fullscreen-placeholder"),t.parentNode.insertBefore(Y,t));let i=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==t?document.fullscreenElement:document.body;t.parentElement!==i&&i.appendChild(t),t.classList.add("ll-fullscreen-mode"),ve(t);return}let n=!Pe&&t.classList.contains("ll-fullscreen-mode");t.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===t&&document.exitFullscreen?.(),Y?.parentNode&&(Y.parentNode.insertBefore(t,Y),Y.remove()),Y=null,ve(t),n&&(t.classList.remove("visible"),R?.setEnabled(!1),vr(),Pe=!0)}function ct(){let t=document.getElementById(q);if(!!(t&&Qt(t))){ye===void 0&&(ye=localStorage.getItem(Ce)),localStorage.getItem(Ce)!=="animated"&&(localStorage.setItem(Ce,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}ye!==void 0&&(ye===null?localStorage.removeItem(Ce):localStorage.setItem(Ce,ye),ye=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function ut(t=document.getElementById(q)){if(!t)return;let e=Eo.some(n=>localStorage.getItem(n)==="on");t.classList.toggle("ll-liquify-floating-player",e)}function ve(t=document.getElementById(q)){if(!t)return;let e=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),n=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);t.style.setProperty("--ll-transparent-controls-width",`${st(e,50,400)}px`),t.style.setProperty("--ll-transparent-controls-height",`${st(n,20,300)}px`)}function el(t,e){let n=Number(t);return Number.isFinite(n)?Math.max(0,n):e}function st(t,e=0,n=1){return Math.min(n,Math.max(e,t))}var dt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var tn="liquid-lyrics-button";function Lr(){let t=document.getElementById(tn);if(t)return t;let e=document.querySelector(".main-nowPlayingBar-extraControls");if(!e)return null;let n=document.createElement("button");return n.id=tn,n.className="liquid-lyrics-button",n.setAttribute("aria-label","Liquid Lyrics"),n.innerHTML=dt,P(n,"Liquid Lyrics"),n.addEventListener("click",()=>{gr(),n.classList.toggle("active",S())}),e.prepend(n),n}function kr(){let t=document.getElementById(tn);t&&t.classList.toggle("active",S())}var ae="liquid-lyrics-sidebar-card",_r="liquid-lyrics-sidebar-card-collapsed",nl=300,il=2e3,pt={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>'},H=null,gt="Loading lyrics...",we=!1,Mr=!1,nn=null,rn=!1,Tr=null,V=null,Er=0,an=!1,Sr=[];function mt(){let t=document.getElementById(ae);if(t)return se(t),t;let e=document.createElement("section");e.id=ae,e.className="liquid-lyrics-sidebar-card",e.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${dt}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${pt.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${pt.fullscreen}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${pt.open}</button>
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
  `;let n=e.querySelector(".ll-sidebar-header-main"),i=e.querySelector(".ll-sidebar-collapse-btn"),r=e.querySelector(".ll-sidebar-roman-toggle"),a=e.querySelector(".ll-sidebar-fullscreen-toggle"),s=e.querySelector(".ll-sidebar-open-toggle"),o=()=>{let c=!e.classList.contains("collapsed");localStorage.setItem(_r,String(c)),Ar(e),F()};n?.addEventListener("click",o),i?.addEventListener("click",o),r?.addEventListener("click",c=>{c.stopPropagation();let d=I(),b=H?.hasJapanese??!1;je(d==="off"?"romaji":d==="romaji"&&b?"furigana":"off"),ht(!0),F(),window.dispatchEvent(new Event(Oe))}),a?.addEventListener("click",c=>{c.stopPropagation(),hr(!1)}),s?.addEventListener("click",c=>{c.stopPropagation(),ot()}),i&&P(i,"Toggle mini lyrics"),r&&P(r,"Romanization"),a&&P(a,"Fullscreen"),s&&P(s,"Open Liquid Lyrics");let l=e.querySelector(".ll-sidebar-mini-viewport"),u=e.querySelector(".ll-sidebar-mini-lines");return H=new me({container:u,scroller:l,variant:"sidebar",dotLiftPx:10,onRomanizationAvailability:c=>{we=c,He(e)}}),window.addEventListener(Oe,()=>{ht(!S()),He(e)}),Ar(e),se(e),al(),ol(),ln(gt),F(),e}function sn(t,e="No lyrics available"){let n=mt();gt=t?"Live lyrics":e,we=!1,H?.setLyrics(t),!t||!H?.hasLyrics?ln(gt):ht(!S()),He(n),F()}function Rr(t){gt=t,we=!1;let e=document.getElementById(ae);e&&(H?.setLyrics(null),ln(t),He(e),F())}function F(){let t=document.getElementById(ae);if(!t)return;se(t);let e=S();t.classList.toggle("ll-hidden",e),t.dataset.romanized=String(I()==="romaji"),He(t);let n=t.classList.contains("collapsed"),i=!e&&!n&&t.isConnected;H?.setEnabled(i),i&&I()!=="off"&&!Mr&&ht(!0)}function on(){se()}function ht(t){if(!H)return;let e=I();H.setRomanized(e,t),Mr=t||e==="off"}function ln(t){if(!H)return;let e=document.createElement("div");e.className="ll-sidebar-mini-empty",e.textContent=t,H.container.replaceChildren(e)}function He(t){let e=t.querySelector(".ll-sidebar-roman-toggle");if(!e)return;let n=I(),i=we&&n!=="off";e.hidden=!we,e.disabled=!we,e.classList.toggle("active",i),e.setAttribute("aria-pressed",String(i));let r=n==="furigana"?"furigana":"roman";e.dataset.icon!==r&&(e.dataset.icon=r,e.innerHTML=pt[r]);let a=n==="romaji"?"Romanization: Romaji":n==="furigana"?"Romanization: Furigana":"Romanization";e.dataset.tooltip=a,e.setAttribute("aria-label",a)}function Ar(t){let e=localStorage.getItem(_r)==="true";t.classList.toggle("collapsed",e),t.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!e))}function se(t=document.getElementById(ae)){if(!t)return!1;let e=rl();return e?t.parentElement!==e||e.lastElementChild!==t?(e.appendChild(t),!0):!1:(t.parentElement?.classList.contains("Root__right-sidebar")&&t.remove(),!1)}function rl(){if(V?.isConnected)return V;V=null;let t=document.querySelector(".Root__right-sidebar"),e=t?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||t?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||t?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(e)return V=e,e;let n=performance.now();return n-Er>=il&&(Er=n,V=ft(["nowplayingview","nowplayingwidget"],t??document)||ft(["nowplaying","widget"],t??document)||ft(["nowplayingview","nowplayinggrid"],t??document)||ft(["nowplaying","grid"],t??document)),V}function ft(t,e=document){let n=t.map(i=>i.toLowerCase());for(let i of Array.from(e.querySelectorAll("*"))){let r=(i.getAttribute("class")||"").toLowerCase();if(n.every(a=>r.includes(a)))return i}return null}function al(){nn||(nn=new MutationObserver(()=>{sl()}),nn.observe(document.body,{childList:!0,subtree:!0}),cn())}function sl(){rn||(rn=!0,setTimeout(()=>{rn=!1,cn();let t=document.getElementById(ae);t&&(t.isConnected&&V?.isConnected&&t.parentElement===V||se(t)&&F())},nl))}function ol(){Tr||(Tr=setInterval(()=>{cn(),se()&&F()},1e3))}function cn(){if(!!document.querySelector(".Root__cinema-view")){an=!0;return}an&&(an=!1,ll())}function ll(){Sr.forEach(t=>clearTimeout(t)),Sr=[80,260,620,1100].map(t=>setTimeout(()=>{let e=document.getElementById(ae)??mt();V=null,se(e),F()},t))}var Cr=`\uFEFF/* ==========================================================================
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
   fullscreen: the panel is moved out to <body> (see setFullscreenMode). */
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
  filter: blur(50px) brightness(0.6);
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

/* Fullscreen lays the panel over the whole window, so the header actions land
   under Spotify's window controls in the top-right corner. Pull them clear of
   that strip \u2014 max() so a small configured strip can never pull them further
   right than the header's normal padding. */
.liquid-lyrics-panel:fullscreen .liquid-lyrics-header,
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
`;function Nr(){let t="liquid-lyrics-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=Cr,document.head.appendChild(e)}async function ul(){await K(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),Nr(),Zi(),xe(),mt(),await K(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),Lr();let t=null,e=null,n="Loading lyrics...",i=0,r=qr();async function a(){let b=Spicetify.Player.data;if(!b?.item?.uri)return;let k=b.item.uri,T=k.includes(":")?k.split(":")[2]:k;if(T===t){on(),F();return}t=T,e=null,n="Loading lyrics...",on(),Rr(n),S()&&ze(n),await s(T,b.item)}async function s(b,k){let T=++i,C=await vn({id:b,data:{name:k.name}});if(!(T!==i||b!==t)){if(C.status==="success"&&C.data){e=C.data,n="",sn(C.data),S()&&Yt(C.data);return}e=null,n=C.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",sn(null,n),S()&&ze(n)}}Spicetify.Player.addEventListener("songchange",()=>{a()});let o=()=>{let b=qr();b!==r&&(r=b,S()&&lt())};setInterval(()=>{o()},250);let l=Spicetify.Platform?.History;typeof l?.listen=="function"&&l.listen(o);let u=S(),c=new MutationObserver(()=>{let b=S();if(kr(),F(),b&&!u&&t)if(e)Yt(e);else if(n&&n!=="Loading lyrics...")ze(n);else{let k=Spicetify.Player.data;if(k?.item?.uri){let T=k.item.uri.includes(":")?k.item.uri.split(":")[2]:k.item.uri;ze("Loading lyrics..."),s(T,k.item)}}u=b}),d=document.getElementById("liquid-lyrics-panel");d&&c.observe(d,{attributes:!0,attributeFilter:["class"]}),F(),a()}ul();function qr(){let e=Spicetify.Platform?.History?.location??{},n=e.pathname||e.path||e.uri||"";return`${location.href}|${n}`}})();
