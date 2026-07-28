// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{var gl=Object.create;var Bi=Object.defineProperty;var ml=Object.getOwnPropertyDescriptor;var bl=Object.getOwnPropertyNames;var yl=Object.getPrototypeOf,vl=Object.prototype.hasOwnProperty;var wl=(t,e,i)=>e in t?Bi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var O=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var xl=(t,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of bl(e))!vl.call(t,n)&&n!==i&&Bi(t,n,{get:()=>e[n],enumerable:!(r=ml(e,n))||r.enumerable});return t};var fn=(t,e,i)=>(i=t!=null?gl(yl(t)):{},xl(e||!t||!t.__esModule?Bi(i,"default",{value:t,enumerable:!0}):i,t));var m=(t,e,i)=>wl(t,typeof e!="symbol"?e+"":e,i);var Bn=O((Af,ji)=>{(function(){"use strict";var t="\0",e=0,i=0,r=-1,n=!0,o=!0,s=4,a=4,l=2,c=function(f){f==null&&(f=1024);var b=function(L,M,_){for(var q=M;q<_;q++)L[q]=-q+1;if(0<v.array[v.array.length-1]){for(var Ae=v.array.length-2;0<v.array[Ae];)Ae--;L[M]=-Ae}},w=function(L,M,_){for(var q=M;q<_;q++)L[q]=-q-1},S=function(L){var M=L*l,_=p(k.signed,k.bytes,M);b(_,k.array.length,M),_.set(k.array),k.array=null,k.array=_;var q=p(v.signed,v.bytes,M);w(q,v.array.length,M),q.set(v.array),v.array=null,v.array=q},y=i+1,k={signed:n,bytes:s,array:p(n,s,f)},v={signed:o,bytes:a,array:p(o,a,f)};return k.array[i]=1,v.array[i]=i,b(k.array,i+1,k.array.length),w(v.array,i+1,v.array.length),{getBaseBuffer:function(){return k.array},getCheckBuffer:function(){return v.array},loadBaseBuffer:function(L){return k.array=L,this},loadCheckBuffer:function(L){return v.array=L,this},size:function(){return Math.max(k.array.length,v.array.length)},getBase:function(L){return k.array.length-1<L?-L+1:k.array[L]},getCheck:function(L){return v.array.length-1<L?-L-1:v.array[L]},setBase:function(L,M){k.array.length-1<L&&S(L),k.array[L]=M},setCheck:function(L,M){v.array.length-1<L&&S(L),v.array[L]=M},setFirstUnusedNode:function(L){y=L},getFirstUnusedNode:function(){return y},shrink:function(){for(var L=this.size()-1;!(0<=v.array[L]);)L--;k.array=k.array.subarray(0,L+2),v.array=v.array.subarray(0,L+2)},calc:function(){for(var L=0,M=v.array.length,_=0;_<M;_++)v.array[_]<0&&L++;return{all:M,unused:L,efficiency:(M-L)/M}},dump:function(){var L="",M="",_;for(_=0;_<k.array.length;_++)L=L+" "+this.getBase(_);for(_=0;_<v.array.length;_++)M=M+" "+this.getCheck(_);return console.log("base:"+L),console.log("chck:"+M),"base:"+L+" chck:"+M}}};function d(f){this.bc=c(f),this.keys=[]}d.prototype.append=function(f,b){return this.keys.push({k:f,v:b}),this},d.prototype.build=function(f,b){if(f==null&&(f=this.keys),f==null)return new u(this.bc);b==null&&(b=!1);var w=f.map(function(S){return{k:g(S.k+t),v:S.v}});return b?this.keys=w:this.keys=w.sort(function(S,y){for(var k=S.k,v=y.k,L=Math.min(k.length,v.length),M=0;M<L;M++)if(k[M]!==v[M])return k[M]-v[M];return k.length-v.length}),w=null,this._build(i,0,0,this.keys.length),new u(this.bc)},d.prototype._build=function(f,b,w,S){var y=this.getChildrenInfo(b,w,S),k=this.findAllocatableBase(y);this.setBC(f,y,k);for(var v=0;v<y.length;v=v+3){var L=y[v];if(L!==e){var M=y[v+1],_=y[v+2],q=k+L;this._build(q,b+1,M,_)}}},d.prototype.getChildrenInfo=function(f,b,w){var S=this.keys[b].k[f],y=0,k=new Int32Array(w*3);k[y++]=S,k[y++]=b;for(var v=b,L=b;v<b+w;v++){var M=this.keys[v].k[f];S!==M&&(k[y++]=v-L,k[y++]=M,k[y++]=v,S=M,L=v)}return k[y++]=v-L,k=k.subarray(0,y),k},d.prototype.setBC=function(f,b,w){var S=this.bc;S.setBase(f,w);var y;for(y=0;y<b.length;y=y+3){var k=b[y],v=w+k,L=-S.getBase(v),M=-S.getCheck(v);v!==S.getFirstUnusedNode()?S.setCheck(L,-M):S.setFirstUnusedNode(M),S.setBase(M,-L);var _=f;if(S.setCheck(v,_),k===e){var q=b[y+1],Ae=this.keys[q].v;Ae==null&&(Ae=0);var fl=-Ae-1;S.setBase(v,fl)}}},d.prototype.findAllocatableBase=function(f){for(var b=this.bc,w,S=b.getFirstUnusedNode();;){if(w=S-f[0],w<0){S=-b.getCheck(S);continue}for(var y=!0,k=0;k<f.length;k=k+3){var v=f[k],L=w+v;if(!this.isUnusedNode(L)){S=-b.getCheck(S),y=!1;break}}if(y)return w}},d.prototype.isUnusedNode=function(f){var b=this.bc,w=b.getCheck(f);return f===i?!1:w<0};function u(f){this.bc=f,this.bc.shrink()}u.prototype.contain=function(f){var b=this.bc;f+=t;for(var w=g(f),S=i,y=r,k=0;k<w.length;k++){var v=w[k];if(y=this.traverse(S,v),y===r)return!1;if(b.getBase(y)<=0)return!0;S=y}return!1},u.prototype.lookup=function(f){f+=t;for(var b=g(f),w=i,S=r,y=0;y<b.length;y++){var k=b[y];if(S=this.traverse(w,k),S===r)return r;w=S}var v=this.bc.getBase(S);return v<=0?-v-1:r},u.prototype.commonPrefixSearch=function(f){for(var b=g(f),w=i,S=r,y=[],k=0;k<b.length;k++){var v=b[k];if(S=this.traverse(w,v),S!==r){w=S;var L=this.traverse(S,e);if(L!==r){var M=this.bc.getBase(L),_={};M<=0&&(_.v=-M-1),_.k=x(h(b,0,k+1)),y.push(_)}continue}else break}return y},u.prototype.traverse=function(f,b){var w=this.bc.getBase(f)+b;return this.bc.getCheck(w)===f?w:r},u.prototype.size=function(){return this.bc.size()},u.prototype.calc=function(){return this.bc.calc()},u.prototype.dump=function(){return this.bc.dump()};var p=function(f,b,w){if(f)switch(b){case 1:return new Int8Array(w);case 2:return new Int16Array(w);case 4:return new Int32Array(w);default:throw new RangeError("Invalid newArray parameter element_bytes:"+b)}else switch(b){case 1:return new Uint8Array(w);case 2:return new Uint16Array(w);case 4:return new Uint32Array(w);default:throw new RangeError("Invalid newArray parameter element_bytes:"+b)}},h=function(f,b,w){var S=new ArrayBuffer(w),y=new Uint8Array(S,0,w),k=f.subarray(b,w);return y.set(k),y},g=function(f){for(var b=new Uint8Array(new ArrayBuffer(f.length*4)),w=0,S=0;w<f.length;){var y,k=f.charCodeAt(w++);if(k>=55296&&k<=56319){var v=k,L=f.charCodeAt(w++);if(L>=56320&&L<=57343)y=(v-55296)*1024+65536+(L-56320);else return null}else y=k;y<128?b[S++]=y:y<2048?(b[S++]=y>>>6|192,b[S++]=y&63|128):y<65536?(b[S++]=y>>>12|224,b[S++]=y>>6&63|128,b[S++]=y&63|128):y<1<<21&&(b[S++]=y>>>18|240,b[S++]=y>>12&63|128,b[S++]=y>>6&63|128,b[S++]=y&63|128)}return b.subarray(0,S)},x=function(f){for(var b="",w,S,y,k,v,L,M,_=0;_<f.length;)S=f[_++],S<128?w=S:S>>5===6?(y=f[_++],w=(S&31)<<6|y&63):S>>4===14?(y=f[_++],k=f[_++],w=(S&15)<<12|(y&63)<<6|k&63):(y=f[_++],k=f[_++],v=f[_++],w=(S&7)<<18|(y&63)<<12|(k&63)<<6|v&63),w<65536?b+=String.fromCharCode(w):(w-=65536,L=55296|w>>10,M=56320|w&1023,b+=String.fromCharCode(L,M));return b},E={builder:function(f){return new d(f)},load:function(f,b){var w=c(0);return w.loadBaseBuffer(f),w.loadCheckBuffer(b),new u(w)}};typeof ji>"u"?window.doublearray=E:ji.exports=E})()});var Ut=O((Rf,On)=>{"use strict";var Ul=function(t){for(var e=new Uint8Array(t.length*4),i=0,r=0;i<t.length;){var n,o=t.charCodeAt(i++);if(o>=55296&&o<=56319){var s=o,a=t.charCodeAt(i++);if(a>=56320&&a<=57343)n=(s-55296)*1024+65536+(a-56320);else return null}else n=o;n<128?e[r++]=n:n<2048?(e[r++]=n>>>6|192,e[r++]=n&63|128):n<65536?(e[r++]=n>>>12|224,e[r++]=n>>6&63|128,e[r++]=n&63|128):n<2097152&&(e[r++]=n>>>18|240,e[r++]=n>>12&63|128,e[r++]=n>>6&63|128,e[r++]=n&63|128)}return e.subarray(0,r)},jl=function(t){for(var e="",i,r,n,o,s,a,l,c=0;c<t.length;)r=t[c++],r<128?i=r:r>>5===6?(n=t[c++],i=(r&31)<<6|n&63):r>>4===14?(n=t[c++],o=t[c++],i=(r&15)<<12|(n&63)<<6|o&63):(n=t[c++],o=t[c++],s=t[c++],i=(r&7)<<18|(n&63)<<12|(o&63)<<6|s&63),i<65536?e+=String.fromCharCode(i):(i-=65536,a=55296|i>>10,l=56320|i&1023,e+=String.fromCharCode(a,l));return e};function V(t){var e;if(t==null)e=1024*1024;else if(typeof t=="number")e=t;else if(t instanceof Uint8Array){this.buffer=t,this.position=0;return}else throw typeof t+" is invalid parameter type for ByteBuffer constructor";this.buffer=new Uint8Array(e),this.position=0}V.prototype.size=function(){return this.buffer.length};V.prototype.reallocate=function(){var t=new Uint8Array(this.buffer.length*2);t.set(this.buffer),this.buffer=t};V.prototype.shrink=function(){return this.buffer=this.buffer.subarray(0,this.position),this.buffer};V.prototype.put=function(t){this.buffer.length<this.position+1&&this.reallocate(),this.buffer[this.position++]=t};V.prototype.get=function(t){return t==null&&(t=this.position,this.position+=1),this.buffer.length<t+1?0:this.buffer[t]};V.prototype.putShort=function(t){if(65535<t)throw t+" is over short value";var e=255&t,i=(65280&t)>>8;this.put(e),this.put(i)};V.prototype.getShort=function(t){if(t==null&&(t=this.position,this.position+=2),this.buffer.length<t+2)return 0;var e=this.buffer[t],i=this.buffer[t+1],r=(i<<8)+e;return r&32768&&(r=-(r-1^65535)),r};V.prototype.putInt=function(t){if(4294967295<t)throw t+" is over integer value";var e=255&t,i=(65280&t)>>8,r=(16711680&t)>>16,n=(4278190080&t)>>24;this.put(e),this.put(i),this.put(r),this.put(n)};V.prototype.getInt=function(t){if(t==null&&(t=this.position,this.position+=4),this.buffer.length<t+4)return 0;var e=this.buffer[t],i=this.buffer[t+1],r=this.buffer[t+2],n=this.buffer[t+3];return(n<<24)+(r<<16)+(i<<8)+e};V.prototype.readInt=function(){var t=this.position;return this.position+=4,this.getInt(t)};V.prototype.putString=function(t){for(var e=Ul(t),i=0;i<e.length;i++)this.put(e[i]);this.put(0)};V.prototype.getString=function(t){var e=[],i;for(t==null&&(t=this.position);!(this.buffer.length<t+1||(i=this.get(t++),i===0));)e.push(i);return this.position=t,jl(e)};On.exports=V});var Wi=O((qf,Hn)=>{"use strict";var Ye=Ut();function ae(){this.dictionary=new Ye(10*1024*1024),this.target_map={},this.pos_buffer=new Ye(10*1024*1024)}ae.prototype.buildDictionary=function(t){for(var e={},i=0;i<t.length;i++){var r=t[i];if(!(r.length<4)){var n=r[0],o=r[1],s=r[2],a=r[3],l=r.slice(4).join(",");(!isFinite(o)||!isFinite(s)||!isFinite(a))&&console.log(r);var c=this.put(o,s,a,n,l);e[c]=n}}return this.dictionary.shrink(),this.pos_buffer.shrink(),e};ae.prototype.put=function(t,e,i,r,n){var o=this.dictionary.position,s=this.pos_buffer.position;return this.dictionary.putShort(t),this.dictionary.putShort(e),this.dictionary.putShort(i),this.dictionary.putInt(s),this.pos_buffer.putString(r+","+n),o};ae.prototype.addMapping=function(t,e){var i=this.target_map[t];i==null&&(i=[]),i.push(e),this.target_map[t]=i};ae.prototype.targetMapToBuffer=function(){var t=new Ye,e=Object.keys(this.target_map).length;t.putInt(e);for(var i in this.target_map){var r=this.target_map[i],n=r.length;t.putInt(parseInt(i)),t.putInt(n);for(var o=0;o<r.length;o++)t.putInt(r[o])}return t.shrink()};ae.prototype.loadDictionary=function(t){return this.dictionary=new Ye(t),this};ae.prototype.loadPosVector=function(t){return this.pos_buffer=new Ye(t),this};ae.prototype.loadTargetMap=function(t){var e=new Ye(t);for(e.position=0,this.target_map={},e.readInt();!(e.buffer.length<e.position+1);)for(var i=e.readInt(),r=e.readInt(),n=0;n<r;n++){var o=e.readInt();this.addMapping(i,o)}return this};ae.prototype.getFeatures=function(t){var e=parseInt(t);if(isNaN(e))return"";var i=this.dictionary.getInt(e+6);return this.pos_buffer.getString(i)};Hn.exports=ae});var Dn=O((If,Fn)=>{"use strict";function jt(t,e){this.forward_dimension=t,this.backward_dimension=e,this.buffer=new Int16Array(t*e+2),this.buffer[0]=t,this.buffer[1]=e}jt.prototype.put=function(t,e,i){var r=t*this.backward_dimension+e+2;if(this.buffer.length<r+1)throw"ConnectionCosts buffer overflow";this.buffer[r]=i};jt.prototype.get=function(t,e){var i=t*this.backward_dimension+e+2;if(this.buffer.length<i+1)throw"ConnectionCosts buffer overflow";return this.buffer[i]};jt.prototype.loadConnectionCosts=function(t){this.forward_dimension=t[0],this.backward_dimension=t[1],this.buffer=t};Fn.exports=jt});var Vi=O((Pf,Un)=>{"use strict";function Wl(t,e,i,r,n){this.class_id=t,this.class_name=e,this.is_always_invoke=i,this.is_grouping=r,this.max_length=n}Un.exports=Wl});var Vn=O((Nf,Wn)=>{"use strict";var jn=Ut(),Vl=Vi();function qe(){this.map=[],this.lookup_table={}}qe.load=function(t){for(var e=new qe,i=[],r=new jn(t);r.position+1<r.size();){var n=i.length,o=r.get(),s=r.get(),a=r.getInt(),l=r.getString();i.push(new Vl(n,l,o,s,a))}return e.init(i),e};qe.prototype.init=function(t){if(t!=null)for(var e=0;e<t.length;e++){var i=t[e];this.map[e]=i,this.lookup_table[i.class_name]=e}};qe.prototype.getCharacterClass=function(t){return this.map[t]};qe.prototype.lookup=function(t){var e=this.lookup_table[t];return e??null};qe.prototype.toBuffer=function(){for(var t=new jn,e=0;e<this.map.length;e++){var i=this.map[e];t.put(i.is_always_invoke),t.put(i.is_grouping),t.putInt(i.max_length),t.putString(i.class_name)}return t.shrink(),t.buffer};Wn.exports=qe});var Ki=O((zf,Kn)=>{"use strict";function Ie(t){this.str=t,this.index_mapping=[];for(var e=0;e<t.length;e++){var i=t.charAt(e);this.index_mapping.push(e),Ie.isSurrogatePair(i)&&e++}this.length=this.index_mapping.length}Ie.prototype.slice=function(t){if(this.index_mapping.length<=t)return"";var e=this.index_mapping[t];return this.str.slice(e)};Ie.prototype.charAt=function(t){if(this.str.length<=t)return"";var e=this.index_mapping[t],i=this.index_mapping[t+1];return i==null?this.str.slice(e):this.str.slice(e,i)};Ie.prototype.charCodeAt=function(t){if(this.index_mapping.length<=t)return NaN;var e=this.index_mapping[t],i=this.str.charCodeAt(e),r;return i>=55296&&i<=56319&&e<this.str.length&&(r=this.str.charCodeAt(e+1),r>=56320&&r<=57343)?(i-55296)*1024+r-56320+65536:i};Ie.prototype.toString=function(){return this.str};Ie.isSurrogatePair=function(t){var e=t.charCodeAt(0);return e>=55296&&e<=56319};Kn.exports=Ie});var Gn=O((Bf,$n)=>{"use strict";var Kl=Vn(),$l=Vi(),Gl=Ki(),$i="DEFAULT";function le(){this.character_category_map=new Uint8Array(65536),this.compatible_category_map=new Uint32Array(65536),this.invoke_definition_map=null}le.load=function(t,e,i){var r=new le;return r.character_category_map=t,r.compatible_category_map=e,r.invoke_definition_map=Kl.load(i),r};le.parseCharCategory=function(t,e){var i=e[1],r=parseInt(e[2]),n=parseInt(e[3]),o=parseInt(e[4]);if(!isFinite(r)||r!==0&&r!==1)return console.log("char.def parse error. INVOKE is 0 or 1 in:"+r),null;if(!isFinite(n)||n!==0&&n!==1)return console.log("char.def parse error. GROUP is 0 or 1 in:"+n),null;if(!isFinite(o)||o<0)return console.log("char.def parse error. LENGTH is 1 to n:"+o),null;var s=r===1,a=n===1;return new $l(t,i,s,a,o)};le.parseCategoryMapping=function(t){var e=parseInt(t[1]),i=t[2],r=3<t.length?t.slice(3):[];return(!isFinite(e)||e<0||e>65535)&&console.log("char.def parse error. CODE is invalid:"+e),{start:e,default:i,compatible:r}};le.parseRangeCategoryMapping=function(t){var e=parseInt(t[1]),i=parseInt(t[2]),r=t[3],n=4<t.length?t.slice(4):[];return(!isFinite(e)||e<0||e>65535)&&console.log("char.def parse error. CODE is invalid:"+e),(!isFinite(i)||i<0||i>65535)&&console.log("char.def parse error. CODE is invalid:"+i),{start:e,end:i,default:r,compatible:n}};le.prototype.initCategoryMappings=function(t){var e;if(t!=null)for(var i=0;i<t.length;i++){var r=t[i],n=r.end||r.start;for(e=r.start;e<=n;e++){this.character_category_map[e]=this.invoke_definition_map.lookup(r.default);for(var o=0;o<r.compatible.length;o++){var s=this.compatible_category_map[e],a=r.compatible[o];if(a!=null){var l=this.invoke_definition_map.lookup(a);if(l!=null){var c=1<<l;s=s|c,this.compatible_category_map[e]=s}}}}}var d=this.invoke_definition_map.lookup($i);if(d!=null)for(e=0;e<this.character_category_map.length;e++)this.character_category_map[e]===0&&(this.character_category_map[e]=1<<d)};le.prototype.lookupCompatibleCategory=function(t){var e=[],i=t.charCodeAt(0),r;if(i<this.compatible_category_map.length&&(r=this.compatible_category_map[i]),r==null||r===0)return e;for(var n=0;n<32;n++)if(r<<31-n>>>31===1){var o=this.invoke_definition_map.getCharacterClass(n);if(o==null)continue;e.push(o)}return e};le.prototype.lookup=function(t){var e,i=t.charCodeAt(0);return Gl.isSurrogatePair(t)?e=this.invoke_definition_map.lookup($i):i<this.character_category_map.length&&(e=this.character_category_map[i]),e==null&&(e=this.invoke_definition_map.lookup($i)),this.invoke_definition_map.getCharacterClass(e)};$n.exports=le});var Xn=O((Of,Jn)=>{"use strict";var Yl=Wi(),Jl=Gn(),Yn=Ut();function Je(){this.dictionary=new Yn(10*1024*1024),this.target_map={},this.pos_buffer=new Yn(10*1024*1024),this.character_definition=null}Je.prototype=Object.create(Yl.prototype);Je.prototype.characterDefinition=function(t){return this.character_definition=t,this};Je.prototype.lookup=function(t){return this.character_definition.lookup(t)};Je.prototype.lookupCompatibleCategory=function(t){return this.character_definition.lookupCompatibleCategory(t)};Je.prototype.loadUnknownDictionaries=function(t,e,i,r,n,o){this.loadDictionary(t),this.loadPosVector(e),this.loadTargetMap(i),this.character_definition=Jl.load(r,n,o)};Jn.exports=Je});var eo=O((Hf,Qn)=>{"use strict";var Zn=Bn(),Xl=Wi(),Zl=Dn(),Ql=Xn();function ht(t,e,i,r){t!=null?this.trie=t:this.trie=Zn.builder(0).build([{k:"",v:1}]),e!=null?this.token_info_dictionary=e:this.token_info_dictionary=new Xl,i!=null?this.connection_costs=i:this.connection_costs=new Zl(0,0),r!=null?this.unknown_dictionary=r:this.unknown_dictionary=new Ql}ht.prototype.loadTrie=function(t,e){return this.trie=Zn.load(t,e),this};ht.prototype.loadTokenInfoDictionaries=function(t,e,i){return this.token_info_dictionary.loadDictionary(t),this.token_info_dictionary.loadPosVector(e),this.token_info_dictionary.loadTargetMap(i),this};ht.prototype.loadConnectionCosts=function(t){return this.connection_costs.loadConnectionCosts(t),this};ht.prototype.loadUnknownDictionaries=function(t,e,i,r,n,o){return this.unknown_dictionary.loadUnknownDictionaries(t,e,i,r,n,o),this};Qn.exports=ht});var Gi=O((Ff,to)=>{"use strict";function ec(t,e,i,r,n,o,s,a){this.name=t,this.cost=e,this.start_pos=i,this.length=r,this.left_id=o,this.right_id=s,this.prev=null,this.surface_form=a,n==="BOS"?this.shortest_cost=0:this.shortest_cost=Number.MAX_VALUE,this.type=n}to.exports=ec});var no=O((Df,ro)=>{"use strict";var io=Gi();function Yi(){this.nodes_end_at=[],this.nodes_end_at[0]=[new io(-1,0,0,0,"BOS",0,0,"")],this.eos_pos=1}Yi.prototype.append=function(t){var e=t.start_pos+t.length-1;this.eos_pos<e&&(this.eos_pos=e);var i=this.nodes_end_at[e];i==null&&(i=[]),i.push(t),this.nodes_end_at[e]=i};Yi.prototype.appendEos=function(){var t=this.nodes_end_at.length;this.eos_pos++,this.nodes_end_at[t]=[new io(-1,0,this.eos_pos,0,"EOS",0,0,"")]};ro.exports=Yi});var lo=O((Uf,ao)=>{"use strict";var oo=Gi(),tc=no(),Ji=Ki();function so(t){this.trie=t.trie,this.token_info_dictionary=t.token_info_dictionary,this.unknown_dictionary=t.unknown_dictionary}so.prototype.build=function(t){for(var e=new tc,i=new Ji(t),r,n,o,s,a,l=0;l<i.length;l++){for(var c=i.slice(l),d=this.trie.commonPrefixSearch(c),u=0;u<d.length;u++){n=d[u].v,r=d[u].k;for(var p=this.token_info_dictionary.target_map[n],h=0;h<p.length;h++){var g=parseInt(p[h]);o=this.token_info_dictionary.dictionary.getShort(g),s=this.token_info_dictionary.dictionary.getShort(g+2),a=this.token_info_dictionary.dictionary.getShort(g+4),e.append(new oo(g,a,l+1,r.length,"KNOWN",o,s,r))}}var x=new Ji(c),E=new Ji(x.charAt(0)),f=this.unknown_dictionary.lookup(E.toString());if(d==null||d.length===0||f.is_always_invoke===1){if(r=E,f.is_grouping===1&&1<x.length)for(var b=1;b<x.length;b++){var w=x.charAt(b),S=this.unknown_dictionary.lookup(w);if(f.class_name!==S.class_name)break;r+=w}for(var y=this.unknown_dictionary.target_map[f.class_id],k=0;k<y.length;k++){var v=parseInt(y[k]);o=this.unknown_dictionary.dictionary.getShort(v),s=this.unknown_dictionary.dictionary.getShort(v+2),a=this.unknown_dictionary.dictionary.getShort(v+4),e.append(new oo(v,a,l+1,r.length,"UNKNOWN",o,s,r.toString()))}}}return e.appendEos(),e};ao.exports=so});var uo=O((jf,co)=>{"use strict";function Wt(t){this.connection_costs=t}Wt.prototype.search=function(t){return t=this.forward(t),this.backward(t)};Wt.prototype.forward=function(t){var e,i,r;for(e=1;e<=t.eos_pos;e++){var n=t.nodes_end_at[e];if(n!=null)for(i=0;i<n.length;i++){var o=n[i],s=Number.MAX_VALUE,a,l=t.nodes_end_at[o.start_pos-1];if(l!=null){for(r=0;r<l.length;r++){var c=l[r],d;o.left_id==null||c.right_id==null?(console.log("Left or right is null"),d=0):d=this.connection_costs.get(c.right_id,o.left_id);var u=c.shortest_cost+d+o.cost;u<s&&(a=c,s=u)}o.prev=a,o.shortest_cost=s}}}return t};Wt.prototype.backward=function(t){var e=[],i=t.nodes_end_at[t.nodes_end_at.length-1][0],r=i.prev;if(r==null)return[];for(;r.type!=="BOS";){if(e.push(r),r.prev==null)return[];r=r.prev}return e.reverse()};co.exports=Wt});var ho=O((Wf,po)=>{"use strict";function Xi(){}Xi.prototype.formatEntry=function(t,e,i,r){var n={};return n.word_id=t,n.word_type=i,n.word_position=e,n.surface_form=r[0],n.pos=r[1],n.pos_detail_1=r[2],n.pos_detail_2=r[3],n.pos_detail_3=r[4],n.conjugated_type=r[5],n.conjugated_form=r[6],n.basic_form=r[7],n.reading=r[8],n.pronunciation=r[9],n};Xi.prototype.formatUnknownEntry=function(t,e,i,r,n){var o={};return o.word_id=t,o.word_type=i,o.word_position=e,o.surface_form=n,o.pos=r[1],o.pos_detail_1=r[2],o.pos_detail_2=r[3],o.pos_detail_3=r[4],o.conjugated_type=r[5],o.conjugated_form=r[6],o.basic_form=r[7],o};po.exports=Xi});var go=O((Vf,fo)=>{"use strict";var ic=lo(),rc=uo(),nc=ho(),oc=/、|。/;function Xe(t){this.token_info_dictionary=t.token_info_dictionary,this.unknown_dictionary=t.unknown_dictionary,this.viterbi_builder=new ic(t),this.viterbi_searcher=new rc(t.connection_costs),this.formatter=new nc}Xe.splitByPunctuation=function(t){for(var e=[],i=t;i!=="";){var r=i.search(oc);if(r<0){e.push(i);break}e.push(i.substring(0,r+1)),i=i.substring(r+1)}return e};Xe.prototype.tokenize=function(t){for(var e=Xe.splitByPunctuation(t),i=[],r=0;r<e.length;r++){var n=e[r];this.tokenizeForSentence(n,i)}return i};Xe.prototype.tokenizeForSentence=function(t,e){e==null&&(e=[]);var i=this.getLattice(t),r=this.viterbi_searcher.search(i),n=0;e.length>0&&(n=e[e.length-1].word_position);for(var o=0;o<r.length;o++){var s=r[o],a,l,c;s.type==="KNOWN"?(c=this.token_info_dictionary.getFeatures(s.name),c==null?l=[]:l=c.split(","),a=this.formatter.formatEntry(s.name,n+s.start_pos,s.type,l)):s.type==="UNKNOWN"?(c=this.unknown_dictionary.getFeatures(s.name),c==null?l=[]:l=c.split(","),a=this.formatter.formatUnknownEntry(s.name,n+s.start_pos,s.type,l,s.surface_form)):a=this.formatter.formatEntry(s.name,n+s.start_pos,s.type,[]),e.push(a)}return e};Xe.prototype.getLattice=function(t){return this.viterbi_builder.build(t)};fo.exports=Xe});function he(t,e=1e4){return new Promise((i,r)=>{let n=Date.now(),o=setInterval(()=>{let s=t();s?(clearInterval(o),i(s)):Date.now()-n>e&&(clearInterval(o),r(new Error("wait() timed out")))},100)})}var Oi="6.2.2",gn=["spicy","spotify"];async function Hi({id:t}){try{let e=t.includes(":")?t.split(":")[2]:t,i="https://spclient.wg.spotify.com/color-lyrics/v2/track/",r;try{r=await(await he(()=>Spicetify.CosmosAsync?.get))(`${i}${e}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let n=r?.lyrics;if(!n)return{status:"missing_lyrics",data:null};let o=n.lines,s;if(n.syncType==="LINE_SYNCED"){let a=o.map((l,c)=>{let d=Number(l.startTimeMs)||0,u=c<o.length-1?Number(o[c+1].startTimeMs):d+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:d,EndTime:u,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:d,EndTime:u,OppositeAligned:!1,IsRTL:!1}});s={Id:e,Type:"Line",SongWriters:[],Content:a,StartTime:a.length>0?a[0].StartTime:0,EndTime:a.length>0?a[a.length-1].EndTime:0,Provider:"spotify"}}else s={Id:e,Type:"Static",SongWriters:[],Lines:o.map(a=>({Text:a.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:s}}catch(e){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:e instanceof Error?e.message:String(e)}}}}var bn="https://api.spicylyrics.org",dt=null,mn=null;async function kl(){return dt||(mn??(mn=(async()=>{try{let t=await fetch(`${bn}/version`);if(t.ok){let e=(await t.text()).trim();/^\d+\.\d+\.\d+$/.test(e)&&(dt=e)}}catch{}dt??(dt=Oi)})()),await mn,dt??Oi)}async function yn(t,e){let i=await kl(),r=await fetch(`${bn}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":i,"X-mode":"2",...e&&{"SpicyLyrics-WebAuth":e}},body:JSON.stringify({queries:t,client:{version:i}})});if(!r.ok)throw new Error(`Spicy request failed with status ${r.status}`);return r.json()}var fe={depth:512,arrayLength:1048576,objectKeys:65536,streamLength:16777216,valuesLength:4194304,decodeOps:4194304},Sl=new Set(["__proto__","constructor","prototype"]);function vn(t){return Array.isArray(t)&&t.length===2&&Array.isArray(t[0])&&Array.isArray(t[1])}function wn(t){let e=t[0],i=t[1];if(e.length>fe.valuesLength)throw new Error("SLObjPack: valuesList exceeds limit");if(i.length>fe.streamLength)throw new Error("SLObjPack: stream exceeds limit");for(let h=0;h<e.length;h++){let g=e[h];if(g===null)continue;let x=typeof g;if(!(x==="string"||x==="boolean")&&!(x==="number"&&Number.isFinite(g)))throw new Error(`SLObjPack: invalid value at ${h}`)}let r=e,n=0,o=()=>{if(n>=i.length)throw new Error("SLObjPack: unexpected end of stream");return i[n++]},s=h=>{if(typeof h!="number"||!Number.isInteger(h)||h<0||h>=r.length)throw new Error(`SLObjPack: invalid value pointer ${h}`);return r[h]},a=()=>{let h=s(o());if(typeof h!="string")throw new Error("SLObjPack: keys must be strings");if(Sl.has(h))throw new Error(`SLObjPack: forbidden key ${h}`);return h},l=(h,g,x)=>{Object.defineProperty(h,g,{value:x,writable:!0,enumerable:!0,configurable:!0})},c=(h,g,x)=>{if(typeof h!="number"||!Number.isInteger(h)||h<0||h>g)throw new Error(`SLObjPack: invalid ${x} count ${h}`);return h},d=(h,g)=>{if(h>i.length-n)throw new Error(`SLObjPack: ${g} exceeds remaining stream`)},u=h=>{if(h>fe.depth)throw new Error("SLObjPack: max depth exceeded");let g=o();if(typeof g!="number"||!Number.isInteger(g))throw new Error(`SLObjPack: invalid opcode ${g}`);if(g>=0)return s(g);switch(g){case-1:{let x=c(o(),fe.objectKeys,"object key");d(x*2,"object");let E=new Array(x);for(let b=0;b<x;b++)E[b]=a();let f={};for(let b=0;b<x;b++)l(f,E[b],u(h+1));return f}case-2:{let x=c(o(),fe.arrayLength,"array item");d(x,"array");let E=new Array(x);for(let f=0;f<x;f++)E[f]=u(h+1);return E}case-3:{let x=c(o(),fe.arrayLength,"schema array item"),E=c(o(),fe.objectKeys,"schema key");if(x*E>fe.decodeOps)throw new Error("SLObjPack: schema array budget exceeded");d(E+x*E,"schema array");let f=new Array(E);for(let w=0;w<E;w++)f[w]=a();let b=new Array(x);for(let w=0;w<x;w++){let S={};for(let y=0;y<E;y++)l(S,f[y],u(h+1));b[w]=S}return b}case-4:return[];case-5:return[u(h+1)];case-6:return{};default:throw new Error(`SLObjPack: unknown opcode ${g}`)}},p=u(0);if(n!==i.length)throw new Error("SLObjPack: extra data after decoding");return p}var Re,ut;async function xn(){return Re&&Re.expiresAtTime-Date.now()>2e3?Re.accessToken:ut||(ut=(async()=>{let t=await he(()=>Spicetify.CosmosAsync),e=await he(()=>Spicetify.Platform);try{Re=await t.get("sp://oauth/v2/token")}catch(i){i.message?.includes("Resolver not found")&&e.Session&&(Re={accessToken:e.Session.accessToken,expiresAtTime:e.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{ut=void 0}if(!Re)throw new Error("Could not retrieve Spotify Access Token");return Re.accessToken})(),ut)}async function Sn({id:t}){try{let e=await Ll(t),i=Cl(e);if(!e||!i)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let r=Ml(i.result);if(r.status==="missing_lyrics")return{status:"missing_lyrics",data:null,queued:r.queued};if(r.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:r.message}};let n=r.data;return n.Provider="spicy",Tl(n),El(n),{status:"success",data:n}}catch(e){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:e instanceof Error?e.message:String(e)}}}}async function Ll(t){let i=`Bearer ${await xn()}`;return await yn([{operation:"lyrics",variables:{id:t,auth:"SpicyLyrics-WebAuth"}}],i)}function Tl(t){if(t.Type==="Static")return;let e=i=>Math.round(Number(i||0)*1e3);if(t.StartTime=e(t.StartTime),t.EndTime=e(t.EndTime),t.Type==="Syllable")for(let i of t.Content){if(i.Lead){i.Lead.StartTime=e(i.Lead.StartTime),i.Lead.EndTime=e(i.Lead.EndTime);for(let r of i.Lead.Syllables)r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime)}if(i.Background)for(let r of i.Background){r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime);for(let n of r.Syllables)n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime)}}else if(t.Type==="Line")for(let i of t.Content)i.StartTime=e(i.StartTime),i.EndTime=e(i.EndTime)}function El(t){let e=i=>{!i.RomanizedText&&i.TransliteratedText&&(i.RomanizedText=i.TransliteratedText)};if(t.Type==="Static"){t.Lines?.forEach(e);return}if(t.Type==="Line"){t.Content?.forEach(e);return}for(let i of t.Content??[])i.Lead?.Syllables?.forEach(e),i.Background?.forEach(r=>r.Syllables?.forEach(e))}function Ml(t){if(!t||typeof t!="object")return{status:"error",message:"Spicy returned an empty result"};let e=t,i=e.httpStatus,r=e.data??t;if(i===404||Fi(r,"MISSING_LYRICS"))return{status:"missing_lyrics"};if(i===503)return{status:"missing_lyrics",queued:!0};if(i&&i!==200)return{status:"error",message:kn(r)};if(Fi(r))return{status:"error",message:kn(r)};if(vn(r))try{r=wn(r)}catch(n){return{status:"error",message:n instanceof Error?n.message:"Malformed packed payload"}}return _l(r)?{status:"success",data:r}:{status:"error",message:"Unexpected response from Spicy"}}function Cl(t){let e=t?.queries.flat()??[];return e.find(i=>i?.operation==="lyrics"&&!!i?.result)??e.find(i=>!!i?.result)}function _l(t){if(!t||typeof t!="object"||!("Type"in t))return!1;let e=t.Type;return e==="Syllable"||e==="Line"||e==="Static"}function Fi(t,e){if(!t||typeof t!="object"||!("error"in t))return!1;let i=t.error;return typeof i=="string"&&(!e||i===e)}function kn(t){return Fi(t)?t.message??t.error:"Unexpected Error from Spicy"}var Bt="liquid-lyrics-custom-sync:",Ln="liquid-lyrics-custom-sync-index",Di="liquid-lyrics:custom-sync-changed";function Ot(t){let e=String(t??"");return e.includes(":")?e.split(":")[2]??e:e}function Ge(t){return String(t??"").trim()}function pt(t){let e=Ge(t);if(!e)return null;try{let i=localStorage.getItem(Bt+e);if(!i)return null;let r=JSON.parse(i);return qn(r)?r:null}catch{return null}}function Tn(t){let e=Ge(t);return!!e&&localStorage.getItem(Bt+e)!=null}function En(t){let e=Ge(t.trackUri||t.trackId);if(!e)return;let i={...t,version:1,updatedAt:Date.now()};try{localStorage.setItem(Bt+e,JSON.stringify(i)),Al(e,i),Rn(i)}catch(r){throw console.error("[Liquid Lyrics] Could not save custom sync",r),r}}function Mn(t){let e=Ge(t);if(!e)return;let i=pt(e);localStorage.removeItem(Bt+e),An(_n().filter(r=>Ge(r.trackUri||r.trackId)!==e)),Rn(i??{trackUri:e,trackId:Ot(e)})}function Cn(t,e){let i=JSON.parse(t);if(!qn(i))throw new Error("Invalid or incomplete sync file");if(e){let r=String(e),n=Ot(r);i.trackUri=r,i.trackId=n,i.draft={...i.draft,trackId:n,trackUri:r},i.lyrics={...i.lyrics,Id:n}}return i}function _n(){try{let t=localStorage.getItem(Ln),e=t?JSON.parse(t):[];return Array.isArray(e)?e:[]}catch{return[]}}function An(t){try{localStorage.setItem(Ln,JSON.stringify(t))}catch(e){console.error("[Liquid Lyrics] Could not update sync index",e)}}function Al(t,e){let i={trackId:e.trackId,trackUri:e.trackUri||e.trackId,title:e.title,artist:e.artist,mode:e.mode,updatedAt:e.updatedAt},r=_n().filter(n=>Ge(n.trackUri||n.trackId)!==t);r.push(i),An(r)}function Rn(t){window.dispatchEvent(new CustomEvent(Di,{detail:{trackUri:t.trackUri,trackId:t.trackId}}))}function qn(t){if(!t||typeof t!="object")return!1;let e=t;return typeof e.trackId=="string"&&(e.mode==="line"||e.mode==="word")&&!!e.lyrics&&!!e.draft}var Rl={spotify:{id:"spotify",fetch:Hi},spicy:{id:"spicy",fetch:Sn}},Ui=new Map;async function Ht(t){let e=t.id,i=pt(t.uri??t.id);if(i)return{status:"success",data:i.lyrics};if(!t.forceRefresh&&Ui.has(e))return{status:"success",data:Ui.get(e)};let r=!1,n=!1;for(let o of gn){let s=Rl[o];if(!s)continue;let a=await s.fetch(t);if(a.status==="success"&&a.data){if(!ql(a.data)){r=!0;continue}let l=o==="spicy"?await Il(t,a.data):a.data;return n||Ui.set(e,l),{...a,data:l}}if(a.status==="missing_lyrics"){r=!0,a.queued&&(n=!0);continue}}return r?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}function ql(t){return t.Type==="Static"?(t.Lines??[]).some(e=>String(e.Text??"").trim().length>0):(t.Content??[]).length>0}async function Il(t,e){if(e.Type!=="Syllable"&&e.Type!=="Line")return e;try{let i=await Hi(t);if(i.status!=="success"||!i.data)return e;let r=Pl(i.data);if(r.length===0||e.Type==="Line")return e;e.Content.forEach(n=>{let o=n.Lead,s=Nl(r,o?.StartTime??0,o?.EndTime??0);s&&(n.LiquidLyricsOriginalText=s.text,o&&(o.LiquidLyricsOriginalText=s.text))})}catch{return e}return e}function Pl(t){return t.Type!=="Line"?[]:t.Content.filter(e=>e.Type!=="Interlude").map(e=>({text:zl(e.Text),start:Number(e.StartTime)||0,end:Number(e.EndTime)||0})).filter(e=>e.text&&!e.text.includes("\u266A")&&!e.text.includes("\xE2\u2122\xAA"))}function Nl(t,e,i){let r=Number(e)||0,n=Number(i)||r,o=(r+n)/2,s=null,a=Number.POSITIVE_INFINITY;for(let l of t){let c=(l.start+l.end)/2,d=Math.abs(l.start-r),u=Math.abs(c-o),p=d*.75+u*.25;p<a&&(s=l,a=p)}return s&&a<=3500?s:null}function zl(t){return String(t??"").replace(/\s+/g," ").trim()}var Bl="liquid-lyrics-mode",In="liquid-lyrics-romanization";var Mf=localStorage.getItem(Bl)||"romanization",Pn="liquid-lyrics-romanization-display",Nn=(()=>{let t=localStorage.getItem(Pn);return t==="off"||t==="romaji"||t==="furigana"?t:localStorage.getItem(In)==="true"?"romaji":"off"})();function J(){return Nn}function Ft(t){Nn=t,localStorage.setItem(Pn,t),localStorage.setItem(In,String(t!=="off"))}var Dt="liquid-lyrics-tooltip";function P(t,e){t.dataset.tooltip=e;let i=()=>Ol(t,t.dataset.tooltip||e);t.addEventListener("pointerenter",i),t.addEventListener("focus",i),t.addEventListener("pointerleave",ne),t.addEventListener("blur",ne),t.addEventListener("click",()=>window.setTimeout(()=>zn(t),0))}function Ol(t,e){if(t.hasAttribute("disabled")||t.hidden)return;let i=Hl(t);i.textContent=e,i.classList.add("visible"),zn(t)}function ne(){document.getElementById(Dt)?.classList.remove("visible")}function Hl(t){let e=Fl(t),i=document.getElementById(Dt);return i||(i=document.createElement("div"),i.id=Dt,i.className="liquid-lyrics-tooltip"),i.parentElement!==e&&e.appendChild(i),i}function Fl(t){let e=document.fullscreenElement;return e instanceof HTMLElement&&e.contains(t)?e:document.body}function zn(t){let e=document.getElementById(Dt);if(!e?.classList.contains("visible"))return;if(!t.isConnected){ne();return}let i=t.getBoundingClientRect(),r=9,n=e.offsetWidth||80,o=e.offsetHeight||28,s=Math.max(8,i.top-o-r),a=Dl(i.left+i.width/2,n/2+8,window.innerWidth-n/2-8);e.style.left=`${a}px`,e.style.top=`${s}px`}function Dl(t,e,i){return Math.min(i,Math.max(e,t))}var Do=fn(eo()),Uo=fn(go());function Qe(t){return t===null?"null":t!==Object(t)?typeof t:{}.toString.call(t).slice(8,-1).toLowerCase()}function X(t){return Qe(t)!=="string"?!0:!t.length}function et(t="",e,i){if(X(t))return!1;let r=t.charCodeAt(0);return e<=r&&r<=i}var mo={HIRAGANA:"toHiragana",KATAKANA:"toKatakana"},Lo={HEPBURN:"hepburn"},sc={useObsoleteKana:!1,passRomaji:!1,convertLongVowelMark:!0,upcaseKatakana:!1,IMEMode:!1,romanization:Lo.HEPBURN},ac=65,lc=90,cc=65345,dc=65370,uc=65313,pc=65338,ir=12353,hc=12438,rr=12449,fc=12540,gc=19968,mc=40879,bc=12293,yc=12540,vc=12539,wc=[65296,65305],xc=[uc,pc],kc=[cc,dc],Sc=[65281,65295],Lc=[65306,65311],Tc=[65339,65343],Ec=[65371,65376],Mc=[65504,65518],Cc=[12352,12447],_c=[12448,12543],Ac=[65382,65439],Rc=[12539,12540],To=[65377,65381],qc=[12288,12351],Ic=[19968,40959],Pc=[13312,19903],Nc=[Cc,_c,To,Ac],zc=[qc,To,Rc,Sc,Lc,Tc,Ec,Mc],Kf=[...Nc,...zc,xc,kc,wc,Ic,Pc],Bc=[0,127],Oc=[[256,257],[274,275],[298,299],[332,333],[362,363]],Hc=[[8216,8217],[8220,8221]],Fc=[Bc,...Oc],Dc=[[32,47],[58,63],[91,96],[123,126],...Hc];var bo=Number.isNaN||function(e){return typeof e=="number"&&e!==e};function Uc(t,e){return!!(t===e||bo(t)&&bo(e))}function jc(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!Uc(t[i],e[i]))return!1;return!0}function Eo(t,e){e===void 0&&(e=jc);var i=null;function r(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(i&&i.lastThis===this&&e(n,i.lastArgs))return i.lastResult;var s=t.apply(this,n);return i={lastResult:s,lastArgs:n,lastThis:this},s}return r.clear=function(){i=null},r}var yo=Object.prototype.hasOwnProperty;function vo(t,e,i){for(i of t.keys())if(Ze(i,e))return i}function Ze(t,e){var i,r,n;if(t===e)return!0;if(t&&e&&(i=t.constructor)===e.constructor){if(i===Date)return t.getTime()===e.getTime();if(i===RegExp)return t.toString()===e.toString();if(i===Array){if((r=t.length)===e.length)for(;r--&&Ze(t[r],e[r]););return r===-1}if(i===Set){if(t.size!==e.size)return!1;for(r of t)if(n=r,n&&typeof n=="object"&&(n=vo(e,n),!n)||!e.has(n))return!1;return!0}if(i===Map){if(t.size!==e.size)return!1;for(r of t)if(n=r[0],n&&typeof n=="object"&&(n=vo(e,n),!n)||!Ze(r[1],e.get(n)))return!1;return!0}if(i===ArrayBuffer)t=new Uint8Array(t),e=new Uint8Array(e);else if(i===DataView){if((r=t.byteLength)===e.byteLength)for(;r--&&t.getInt8(r)===e.getInt8(r););return r===-1}if(ArrayBuffer.isView(t)){if((r=t.byteLength)===e.byteLength)for(;r--&&t[r]===e[r];);return r===-1}if(!i||typeof t=="object"){r=0;for(i in t)if(yo.call(t,i)&&++r&&!yo.call(e,i)||!(i in e)||!Ze(t[i],e[i]))return!1;return Object.keys(e).length===r}}return t!==t&&e!==e}var nr=(t={})=>Object.assign({},sc,t);function Mo(t,e,i){let r=e;function n(a,l){if(a[l]!==void 0)return Object.assign({"":a[""]+l},a[l])}function o(a,l){let c=a.charAt(0);return s(Object.assign({"":c},r[c]),a.slice(1),l,l+1)}function s(a,l,c,d){if(!l)return i||Object.keys(a).length===1?a[""]?[[c,d,a[""]]]:[]:[[c,d,null]];if(Object.keys(a).length===1)return[[c,d,a[""]]].concat(o(l,d));let u=n(a,l.charAt(0));return u===void 0?[[c,d,a[""]]].concat(o(l,d)):s(u,l.slice(1),c,d+1)}return o(t,0)}function or(t){return Object.entries(t).reduce((e,[i,r])=>{let n=Qe(r)==="string";return e[i]=n?{"":r}:or(r),e},{})}function Co(t,e){return e.split("").reduce((i,r)=>(i[r]===void 0&&(i[r]={}),i[r]),t)}function _o(t={}){let e={};return Qe(t)==="object"&&Object.entries(t).forEach(([i,r])=>{let n=e;i.split("").forEach(o=>{n[o]===void 0&&(n[o]={}),n=n[o]}),n[""]=r}),function(r){let n=JSON.parse(JSON.stringify(r));function o(s,a){return s===void 0||Qe(s)==="string"?a:Object.entries(a).reduce((l,[c,d])=>(l[c]=o(s[c],d),l),s)}return o(n,e)}}function Ao(t,e){return e?Qe(e)==="function"?e(t):_o(e)(t):t}var Wc={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u304A",k:{a:"\u304B",i:"\u304D",u:"\u304F",e:"\u3051",o:"\u3053"},s:{a:"\u3055",i:"\u3057",u:"\u3059",e:"\u305B",o:"\u305D"},t:{a:"\u305F",i:"\u3061",u:"\u3064",e:"\u3066",o:"\u3068"},n:{a:"\u306A",i:"\u306B",u:"\u306C",e:"\u306D",o:"\u306E"},h:{a:"\u306F",i:"\u3072",u:"\u3075",e:"\u3078",o:"\u307B"},m:{a:"\u307E",i:"\u307F",u:"\u3080",e:"\u3081",o:"\u3082"},y:{a:"\u3084",u:"\u3086",o:"\u3088"},r:{a:"\u3089",i:"\u308A",u:"\u308B",e:"\u308C",o:"\u308D"},w:{a:"\u308F",i:"\u3090",e:"\u3091",o:"\u3092"},g:{a:"\u304C",i:"\u304E",u:"\u3050",e:"\u3052",o:"\u3054"},z:{a:"\u3056",i:"\u3058",u:"\u305A",e:"\u305C",o:"\u305E"},d:{a:"\u3060",i:"\u3062",u:"\u3065",e:"\u3067",o:"\u3069"},b:{a:"\u3070",i:"\u3073",u:"\u3076",e:"\u3079",o:"\u307C"},p:{a:"\u3071",i:"\u3074",u:"\u3077",e:"\u307A",o:"\u307D"},v:{a:"\u3094\u3041",i:"\u3094\u3043",u:"\u3094",e:"\u3094\u3047",o:"\u3094\u3049"}},Vc={".":"\u3002",",":"\u3001",":":"\uFF1A","/":"\u30FB","!":"\uFF01","?":"\uFF1F","~":"\u301C","-":"\u30FC","\u2018":"\u300C","\u2019":"\u300D","\u201C":"\u300E","\u201D":"\u300F","[":"\uFF3B","]":"\uFF3D","(":"\uFF08",")":"\uFF09","{":"\uFF5B","}":"\uFF5D"},wo={k:"\u304D",s:"\u3057",t:"\u3061",n:"\u306B",h:"\u3072",m:"\u307F",r:"\u308A",g:"\u304E",z:"\u3058",d:"\u3062",b:"\u3073",p:"\u3074",v:"\u3094",q:"\u304F",f:"\u3075"},Ro={ya:"\u3083",yi:"\u3043",yu:"\u3085",ye:"\u3047",yo:"\u3087"},qo={a:"\u3041",i:"\u3043",u:"\u3045",e:"\u3047",o:"\u3049"},xo={sh:"sy",ch:"ty",cy:"ty",chy:"ty",shy:"sy",j:"zy",jy:"zy",shi:"si",chi:"ti",tsu:"tu",ji:"zi",fu:"hu"},Kc=Object.assign({tu:"\u3063",wa:"\u308E",ka:"\u30F5",ke:"\u30F6"},qo,Ro),$c={yi:"\u3044",wu:"\u3046",ye:"\u3044\u3047",wi:"\u3046\u3043",we:"\u3046\u3047",kwa:"\u304F\u3041",whu:"\u3046",tha:"\u3066\u3083",thu:"\u3066\u3085",tho:"\u3066\u3087",dha:"\u3067\u3083",dhu:"\u3067\u3085",dho:"\u3067\u3087"},Gc={wh:"\u3046",kw:"\u304F",qw:"\u304F",q:"\u304F",gw:"\u3050",sw:"\u3059",ts:"\u3064",th:"\u3066",tw:"\u3068",dh:"\u3067",dw:"\u3069",fw:"\u3075",f:"\u3075"};function Yc(){let t=or(Wc),e=n=>Co(t,n);Object.entries(wo).forEach(([n,o])=>{Object.entries(Ro).forEach(([s,a])=>{e(n+s)[""]=o+a})}),Object.entries(Vc).forEach(([n,o])=>{e(n)[""]=o}),Object.entries(Gc).forEach(([n,o])=>{Object.entries(qo).forEach(([s,a])=>{let l=e(n+s);l[""]=o+a})}),["n","n'","xn"].forEach(n=>{e(n)[""]="\u3093"}),t.c=JSON.parse(JSON.stringify(t.k)),Object.entries(xo).forEach(([n,o])=>{let s=n.slice(0,n.length-1),a=n.charAt(n.length-1),l=e(s);l[a]=JSON.parse(JSON.stringify(e(o)))});function i(n){return[...Object.entries(xo),["c","k"]].reduce((o,[s,a])=>n.startsWith(a)?o.concat(n.replace(a,s)):o,[])}Object.entries(Kc).forEach(([n,o])=>{let s=u=>u.charAt(u.length-1),a=u=>u.slice(0,u.length-1),l=`x${n}`,c=e(l);c[""]=o;let d=e(`l${a(n)}`);d[s(n)]=c,i(n).forEach(u=>{["l","x"].forEach(p=>{let h=e(p+a(u));h[s(u)]=e(p+n)})})}),Object.entries($c).forEach(([n,o])=>{e(n)[""]=o});function r(n){return Object.entries(n).reduce((o,[s,a])=>(s?o[s]=r(a):o[s]=`\u3063${a}`,o),{})}return[...Object.keys(wo),"c","y","w","j"].forEach(n=>{let o=t[n];o[n]=r(o)}),delete t.n.n,Object.freeze(JSON.parse(JSON.stringify(t)))}var Zi=null;function Jc(){return Zi==null&&(Zi=Yc()),Zi}var Xc=_o({wi:"\u3090",we:"\u3091"});function Zc(t){let e=JSON.parse(JSON.stringify(t));return e.n.n={"":"\u3093"},e.n[" "]={"":"\u3093"},e}function Qc(t=""){return X(t)?!1:et(t,ac,lc)}function ft(t=""){return X(t)?!1:t.charCodeAt(0)===yc}function Io(t=""){return X(t)?!1:t.charCodeAt(0)===vc}function Po(t=""){return X(t)?!1:ft(t)?!0:et(t,ir,hc)}function ed(t=""){let e=[];return t.split("").forEach(i=>{if(ft(i)||Io(i))e.push(i);else if(Po(i)){let r=i.charCodeAt(0)+(rr-ir),n=String.fromCharCode(r);e.push(n)}else e.push(i)}),e.join("")}var No=Eo((t,e,i)=>{let r=Jc();return r=t?Zc(r):r,r=e?Xc(r):r,i&&(r=Ao(r,i)),r},Ze);function ko(t="",e={},i){let r;return i?r=e:(r=nr(e),i=No(r.IMEMode,r.useObsoleteKana,r.customKanaMapping)),td(t,r,i).map(n=>{let[o,s,a]=n;if(a===null)return t.slice(o);let l=r.IMEMode===mo.HIRAGANA,c=r.IMEMode===mo.KATAKANA||[...t.slice(o,s)].every(Qc);return l||!c?a:ed(a)}).join("")}function td(t="",e={},i){let{IMEMode:r,useObsoleteKana:n,customKanaMapping:o}=e;return i||(i=No(r,n,o)),Mo(t.toLowerCase(),i,!r)}function id(t=""){return X(t)?!1:Fc.some(([e,i])=>et(t,e,i))}function zo(t="",e){let i=Qe(e)==="regexp";return X(t)?!1:[...t].every(r=>{let n=id(r);return i?n||e.test(r):n})}function tr(t=""){return et(t,rr,fc)}function rd(t=""){return X(t)?!1:[...t].every(Po)}function Bo(t=""){return X(t)?!1:[...t].every(tr)}function nd(t=""){return X(t)?!1:t.charCodeAt(0)===bc}function od(t=""){return et(t,gc,mc)||nd(t)}function sd(t=""){return X(t)?!1:[...t].every(od)}function ad(t="",e={passKanji:!0}){let i=[...t],r=!1;return e.passKanji||(r=i.some(sd)),(i.some(rd)||i.some(Bo))&&i.some(zo)&&!r}var ld=(t,e)=>ft(t)&&e<1,cd=(t,e)=>ft(t)&&e>0,dd=t=>["\u30F6","\u30F5"].includes(t),ud={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u3046"};function Vt(t="",e,{isDestinationRomaji:i,convertLongVowelMark:r}={}){let n="";return t.split("").reduce((o,s,a)=>{if(Io(s)||ld(s,a)||dd(s))return o.concat(s);if(r&&n&&cd(s,a)){let l=e(n).slice(-1);return tr(t[a-1])&&l==="o"&&i?o.concat("\u304A"):o.concat(ud[l])}if(!ft(s)&&tr(s)){let l=s.charCodeAt(0)+(ir-rr),c=String.fromCharCode(l);return n=c,o.concat(c)}return n="",o.concat(s)},[]).join("")}var Qi=null,pd={\u3042:"a",\u3044:"i",\u3046:"u",\u3048:"e",\u304A:"o",\u304B:"ka",\u304D:"ki",\u304F:"ku",\u3051:"ke",\u3053:"ko",\u3055:"sa",\u3057:"shi",\u3059:"su",\u305B:"se",\u305D:"so",\u305F:"ta",\u3061:"chi",\u3064:"tsu",\u3066:"te",\u3068:"to",\u306A:"na",\u306B:"ni",\u306C:"nu",\u306D:"ne",\u306E:"no",\u306F:"ha",\u3072:"hi",\u3075:"fu",\u3078:"he",\u307B:"ho",\u307E:"ma",\u307F:"mi",\u3080:"mu",\u3081:"me",\u3082:"mo",\u3089:"ra",\u308A:"ri",\u308B:"ru",\u308C:"re",\u308D:"ro",\u3084:"ya",\u3086:"yu",\u3088:"yo",\u308F:"wa",\u3090:"wi",\u3091:"we",\u3092:"wo",\u3093:"n",\u304C:"ga",\u304E:"gi",\u3050:"gu",\u3052:"ge",\u3054:"go",\u3056:"za",\u3058:"ji",\u305A:"zu",\u305C:"ze",\u305E:"zo",\u3060:"da",\u3062:"ji",\u3065:"zu",\u3067:"de",\u3069:"do",\u3070:"ba",\u3073:"bi",\u3076:"bu",\u3079:"be",\u307C:"bo",\u3071:"pa",\u3074:"pi",\u3077:"pu",\u307A:"pe",\u307D:"po",\u3094\u3041:"va",\u3094\u3043:"vi",\u3094:"vu",\u3094\u3047:"ve",\u3094\u3049:"vo"},hd={"\u3002":".","\u3001":",","\uFF1A":":","\u30FB":"/","\uFF01":"!","\uFF1F":"?","\u301C":"~",\u30FC:"-","\u300C":"\u2018","\u300D":"\u2019","\u300E":"\u201C","\u300F":"\u201D","\uFF3B":"[","\uFF3D":"]","\uFF08":"(","\uFF09":")","\uFF5B":"{","\uFF5D":"}","\u3000":" "},fd=["\u3042","\u3044","\u3046","\u3048","\u304A","\u3084","\u3086","\u3088"],er={\u3083:"ya",\u3085:"yu",\u3087:"yo"},gd={\u3043:"yi",\u3047:"ye"},md={\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},bd=["\u304D","\u306B","\u3072","\u307F","\u308A","\u304E","\u3073","\u3074","\u3094","\u304F","\u3075"],yd={\u3057:"sh",\u3061:"ch",\u3058:"j",\u3062:"j"},vd={\u3063:"",\u3083:"ya",\u3085:"yu",\u3087:"yo",\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},So={b:"b",c:"t",d:"d",f:"f",g:"g",h:"h",j:"j",k:"k",m:"m",p:"p",q:"q",r:"r",s:"s",t:"t",v:"v",w:"w",x:"x",z:"z"};function wd(){return Qi==null&&(Qi=kd()),Qi}function xd(t){switch(t){case Lo.HEPBURN:return wd();default:return{}}}function kd(){let t=or(pd),e=r=>Co(t,r),i=(r,n)=>{e(r)[""]=n};return Object.entries(hd).forEach(([r,n])=>{e(r)[""]=n}),[...Object.entries(er),...Object.entries(md)].forEach(([r,n])=>{i(r,n)}),bd.forEach(r=>{let n=e(r)[""][0];Object.entries(er).forEach(([o,s])=>{i(r+o,n+s)}),Object.entries(gd).forEach(([o,s])=>{i(r+o,n+s)})}),Object.entries(yd).forEach(([r,n])=>{Object.entries(er).forEach(([o,s])=>{i(r+o,n+s[1])}),i(`${r}\u3043`,`${n}yi`),i(`${r}\u3047`,`${n}e`)}),t.\u3063=Oo(t),Object.entries(vd).forEach(([r,n])=>{i(r,n)}),fd.forEach(r=>{i(`\u3093${r}`,`n'${e(r)[""]}`)}),Object.freeze(JSON.parse(JSON.stringify(t)))}function Oo(t){return Object.entries(t).reduce((e,[i,r])=>{if(i)e[i]=Oo(r);else{let n=r.charAt(0);e[i]=Object.keys(So).includes(n)?So[n]+r:r}return e},{})}var Ho=Eo((t,e)=>{let i=xd(t);return e&&(i=Ao(i,e)),i},Ze);function Pe(t="",e={},i){let r=nr(e);return i||(i=Ho(r.romanization,r.customRomajiMapping)),Sd(t,r,i).map(n=>{let[o,s,a]=n;return r.upcaseKatakana&&Bo(t.slice(o,s))?a.toUpperCase():a}).join("")}function Sd(t,e,i){i||(i=Ho(e.romanization,e.customRomajiMapping));let r=Object.assign({},{isDestinationRomaji:!0},e);return Mo(Vt(t,Pe,r),i,!e.IMEMode)}function Ld(t=""){return X(t)?!1:Dc.some(([e,i])=>et(t,e,i))}function Fo(t="",e={}){let i=nr(e);if(i.passRomaji)return Vt(t,Pe,i);if(ad(t,{passKanji:!0})){let r=Vt(t,Pe,i);return ko(r.toLowerCase(),i)}return zo(t)||Ld(t)?ko(t.toLowerCase(),i):Vt(t,Pe,i)}var Ed=["https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict","https://unpkg.com/kuromoji@0.1.2/dict"],Md=["base.dat.gz","check.dat.gz","tid.dat.gz","tid_pos.dat.gz","tid_map.dat.gz","cc.dat.gz","unk.dat.gz","unk_pos.dat.gz","unk_map.dat.gz","unk_char.dat.gz","unk_compat.dat.gz","unk_invoke.dat.gz"],Cd=["https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://fastly.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://unpkg.com/pinyin-pro@3/dist/index.min.js"];function ar(t){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(t)}function lr(t){return/[가-힯ᄀ-ᇿ㄰-㆏]/.test(t)}function Kt(t){return/[㐀-䶿一-鿿豈-﫿]/.test(t)}function jo(t){let e=!1;for(let i of t){if(ar(i))return"ja";if(lr(i))return"ko";Kt(i)&&(e=!0)}return e?"zh":null}async function Wo(t,e){if(t.length===0)return[];if(e==="ko")return t.map(s=>me(Jo(s)));if(e==="zh"){let s=await Xo();return s?t.map(a=>me(Zo(s,a))):null}let i=t.join(""),r=await $t(i);if(!r)return null;let n=Go(t),o=t.map(()=>[]);for(let s of r)Yo(s,n,(a,l,c)=>{let d=c?s.reading||s.surface:Id(s,l);d&&o[a].push(d)});return t.map((s,a)=>me(o[a].map(l=>String(Pe(l))).filter(Boolean).join(" ")))}async function Vo(t,e){let i=me(t);if(!i)return"";if(e==="ko")return me(Jo(i));if(e==="zh"){let o=await Xo();return o?me(Zo(o,i)):null}let r=await $t(i);if(!r)return null;let n=r.map(o=>String(Pe(o.reading||o.surface))).map(o=>o.trim()).filter(Boolean).join(" ");return me(n)}async function Ko(t){if(t.length===0)return[];let e=t.join(""),i=await $t(e);if(!i)return null;let r=Go(t),n=t.map(()=>[]),o=t.map(()=>!1);for(let s of i)Yo(s,r,(a,l,c)=>{c&&s.hasKanji&&s.reading?(n[a].push(`<ruby>${ge(s.surface)}<rt>${ge(s.reading)}</rt></ruby>`),o[a]=!0):n[a].push(ge(l))});return t.map((s,a)=>o[a]?n[a].join(""):null)}async function $o(t){let e=me(t);if(!e)return"";let i=await $t(e);if(!i)return null;let r=!1,n=0,o="";for(let s of i)s.start>n&&(o+=ge(e.slice(n,s.start))),s.hasKanji&&s.reading?(o+=`<ruby>${ge(s.surface)}<rt>${ge(s.reading)}</rt></ruby>`,r=!0):o+=ge(s.surface),n=s.end;return n<e.length&&(o+=ge(e.slice(n))),r?o:""}var gt=null;function _d(){return gt||(gt=(async()=>{for(let t of Ed){let e=await Ad(t);if(e)return e;console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${t}, trying next source\u2026`)}return console.warn("[Liquid Lyrics] Local Japanese romanization unavailable: no dictionary source worked."),null})(),gt.then(t=>{t||(gt=null)})),gt}async function Ad(t){try{let e=await Promise.all(Md.map(r=>Rd(`${t}/${r}`))),i=new Do.default;return i.loadTrie(new Int32Array(e[0]),new Int32Array(e[1])),i.loadTokenInfoDictionaries(new Uint8Array(e[2]),new Uint8Array(e[3]),new Uint8Array(e[4])),i.loadConnectionCosts(new Int16Array(e[5])),i.loadUnknownDictionaries(new Uint8Array(e[6]),new Uint8Array(e[7]),new Uint8Array(e[8]),new Uint8Array(e[9]),new Uint32Array(e[10]),new Uint8Array(e[11])),new Uo.default(i)}catch{return null}}async function Rd(t){let e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status} for ${t}`);let i=new Uint8Array(await e.arrayBuffer());if(i[0]===31&&i[1]===139){let r=new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(r).arrayBuffer()}return i.buffer}async function $t(t){if(!t)return[];let e=await _d();if(!e)return null;let i;try{i=e.tokenize(t)}catch{return null}let r=[],n=0;for(let o of i){let s=String(o?.surface_form??"");if(!s)continue;let a=Number(o?.word_position),l=Number.isFinite(a)&&a>0?a-1:Math.max(n,t.indexOf(s,n)),c=l+s.length;n=c;let d=Kt(s),u=typeof o?.reading=="string"&&o.reading!=="*"?o.reading:"",p=u?String(Fo(u)):d?"":s;p=qd(s,String(o?.pos??""),p),r.push({start:l,end:c,surface:s,reading:p,hasKanji:d})}return r}function qd(t,e,i){return e.includes("\u52A9\u8A5E")?t==="\u306F"?"\u308F":t==="\u3078"?"\u3048":t==="\u3092"?"\u304A":i:i}function Go(t){let e=[],i=0;for(let r of t)e.push([i,i+r.length]),i+=r.length;return e}function Yo(t,e,i){let r=t.end-t.start;if(!(r<=0))for(let n=0;n<e.length;n++){let[o,s]=e[n],a=Math.max(o,t.start),l=Math.min(s,t.end);if(l<=a)continue;let c=t.surface.slice(a-t.start,l-t.start);i(n,c,l-a>=r)}}function Id(t,e){let i=t.reading||t.surface,r=t.end-t.start;if(r<=0||!i)return"";let n=t.surface.indexOf(e);if(n<0)return"";let o=Math.round(i.length*n/r),s=Math.round(i.length*(n+e.length)/r);return i.slice(o,s)}var Pd=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"],Nd=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"],zd=["","k","k","k","n","n","n","t","l","k","m","p","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"],Bd=["","g","kk","ks","n","nj","nh","d","r","lg","lm","lb","ls","lt","lp","lh","m","b","ps","s","ss","ng","j","ch","k","t","p","h"];function Jo(t){let e=Array.from(t),i="";for(let r=0;r<e.length;r++){let n=e[r].codePointAt(0)??0;if(n<44032||n>55203){i+=e[r];continue}let o=n-44032,s=Math.floor(o/588),a=Math.floor(o%588/28),l=o%28,c=e[r+1]?.codePointAt(0)??0,p=(c>=44032&&c<=55203?Math.floor((c-44032)/588):-1)===11;i+=Pd[s]+Nd[a],i+=p?Bd[l]:zd[l]}return i}async function Xo(){return await Od(Cd,()=>!!window.pinyinPro?.pinyin)?window.pinyinPro.pinyin:null}function Zo(t,e){try{return String(t(e,{toneType:"symbol",nonZh:"consecutive"}))}catch{return e}}var sr=new Map;async function Od(t,e){for(let i of t)if(await Hd(i,e))return!0;return!1}function Hd(t,e){if(e())return Promise.resolve(!0);let i=sr.get(t);return i||(i=new Promise(r=>{let n=document.createElement("script");n.src=t,n.onload=()=>r(e()),n.onerror=()=>r(!1),document.head.appendChild(n)}),sr.set(t,i),i.then(r=>{r||sr.delete(t)})),i}function ge(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function me(t){return String(t??"").replace(/\s+/g," ").trim()}function is(t){return t.Type==="Line"?Fd(t.Content??[]):t.Type==="Syllable"?Dd(t.Content??[]):(t.Lines??[]).map(e=>({kind:"static",text:D(e.Text),romanizedText:D(e.RomanizedText)})).filter(e=>e.text)}function Fd(t){let e=[],i=U(t[0]?.StartTime,0);return t.length>0&&i>500&&e.push(Gt(0,i)),t.forEach((r,n)=>{let o=t[n+1],s=Ud(r,o);r.Type==="Interlude"?e.push(Gt(s.start,s.end)):e.push({kind:"line",range:s,text:D(r.Text),romanizedText:D(r.RomanizedText)}),rs(e,s.end,U(o?.StartTime,NaN))}),e}function Dd(t){let e=[],i=t.map((r,n)=>jd(r,t[n+1]));return i.length>0&&i[0].range.start>500&&e.push(Gt(0,i[0].range.start)),i.forEach((r,n)=>{e.push({kind:"syllable",range:r.range,text:r.lead.sourceText||r.lead.words.map(o=>o.text).join(" ").trim(),romanizedText:Gd(r.lead.words),lead:r.lead,backgrounds:r.backgrounds}),rs(e,r.range.end,i[n+1]?.range.start??NaN)}),e}function Gt(t,e){return{kind:"interlude",range:{start:t,end:Math.max(e,t+250)}}}function rs(t,e,i){Number.isFinite(i)&&(i-e<3e3||t.push(Gt(e,i)))}function Ud(t,e){let i=U(t.StartTime,0),r=U(e?.StartTime,NaN),n=U(t.EndTime,i+4500),o=os(n,r);return{start:i,end:ss(o,i,o,250)}}function jd(t,e){let i=es(t.Lead),r=(t.Background??[]).map(u=>es(u)),n=U(e?.Lead?.StartTime,NaN),o=i.range.start,s=Number.isFinite(n)&&n>o?n:o+4500,a=Math.max(i.range.end,...r.map(u=>u.range.end)),l=os(a,n),d=Qo(t.Lead)||(t.Background??[]).some(Qo)?Number.POSITIVE_INFINITY:s;return{range:{start:o,end:ss(l,o,s,250,d)},lead:i,backgrounds:r}}function Qo(t){let e=U(t?.StartTime,0),i=Number(t?.EndTime);return Number.isFinite(i)&&i>e}function es(t){let e=U(t?.StartTime,0),i=Number(t?.EndTime),r=Number.isFinite(i)&&i>e?U(i,e):e+4500,n={start:e,end:r};return{range:n,sourceText:Jd(t),words:Vd(Wd(t?.Syllables??[],n),n)}}function Wd(t,e){let i=[],r=null,n=!1;return t.forEach((o,s)=>{let a={text:D(o.Text),romanizedText:D(o.RomanizedText),start:U(o.StartTime,e.start),end:U(o.EndTime,e.start+80),animateLetters:!1},l=!!(o.IsPartOfWord||n)&&!be(a.text)&&!be(r?.text??"");l&&r?(r.text+=a.text,r.romanizedText=Qd(r.romanizedText,a.romanizedText," "),r.start=Math.min(r.start,a.start),r.end=Math.max(r.end,a.end)):(r&&!l&&i.push(r),r=a),n=!!o.IsPartOfWord,(!o.IsPartOfWord||s===t.length-1)&&r&&(i.push(r),r=null)}),i.filter(o=>o.text)}function Vd(t,e){if(t.length===0)return[];let i=e.start,r=Math.max(e.end,i+250),n=t.map(l=>({...l,start:ce(l.start,i,r),end:ce(l.end,i,r)})).filter(l=>l.text.trim().length>0),o=i;n.forEach(l=>{l.start=Math.max(o,l.start),o=l.start});let s=[];n.forEach(l=>{let c=s[s.length-1],d=c?.[0]?.start;c&&d!==void 0&&Math.abs(l.start-d)<=12?(l.start=d,c.push(l)):s.push([l])});let a=[];return s.forEach((l,c)=>{let d=l[0].start,u=s[c+1]?.[0]?.start??r,p=Math.max(d+1,u);if(l.length===1){a.push({...l[0],start:d,end:$d(l[0].end,d,p)});return}Kd(l,d,p).forEach(h=>a.push(h))}),a.map((l,c)=>{let d=a[c+1]?.start??r,u=Math.max(l.start+1,d),p=Math.min(Math.max(l.end,l.start+1),u);return{...l,end:p,animateLetters:Yt(l.text,l.start,p)}})}function Kd(t,e,i){let r=Math.max(i,e+t.length*80),n=t.reduce((s,a)=>s+ts(a.text),0)||t.length,o=e;return t.map((s,a)=>{let l=a===t.length-1,c=t.length-a,d=Math.max(1,r-o),u=(r-e)*ts(s.text)/n,p=Math.max(1,d-(c-1)),h=o,g=l?r:o+ce(u,1,p);return o=g,{...s,start:h,end:g}})}function $d(t,e,i){return Number.isFinite(t)&&t>e?Math.min(t,i):i}function ts(t){return Math.max(1,Array.from(t.trim()).length)}function Yt(t,e,i){let r=Array.from(t.trim());if(r.length<3)return!1;let n=i-e;return n<750||n/r.length<90?!1:r.some(o=>/[A-Za-z0-9]/.test(o))}function Gd(t){return t.map(e=>Jt(e.romanizedText)).filter(Boolean).join(" ").trim()}function ns(t){let e=Array.isArray(t.SongWriters)?Array.from(new Set(t.SongWriters.map(r=>D(r)).filter(Boolean))):[],i=Yd(t);return e.length===0&&!i?null:{writers:e,source:i}}function Yd(t){let e=t.Provider,i=D(t.LiquidLyricsCredit);if(e==="local")return i?`Synced by ${i}`:"Custom sync";if(i)return`Synced by ${i}`;if(e==="spicy"){if(t.source==="spl"){let r=D(t.TTMLUploadMetadata?.Maker?.username)||D(t.TTMLUploadMetadata?.Uploader?.username);return r?`via Spicy Lyrics (community) \xB7 Made by @${r}`:"via Spicy Lyrics (community)"}return"via Spicy Lyrics"}return e==="spotify"?"via Spotify":""}function D(t){return String(t??"").replace(/\s+/g," ").trim()}function Jt(t){let e=D(t);return e&&!be(e)?e:""}function be(t){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(t)}function Jd(t){return D(t?.LiquidLyricsOriginalText)||Xd(t?.Syllables??[])}function Xd(t){let e="",i="",r=!1;return t.forEach(n=>{let o=D(n.Text);if(!o)return;let s=!e||n.IsPartOfWord||r||Zd(i,o);e+=s?o:` ${o}`,i=o,r=!!n.IsPartOfWord}),e.trim()}function Zd(t,e){return!t||!e||/^[,.;:!?)]/.test(e)||/[(]$/.test(t)?!0:be(t)||be(e)}function Qd(t,e,i){let r=D(t),n=D(e);return r?n?`${r}${i}${n}`:r:n||void 0}function os(t,e){return!Number.isFinite(e)||e<=t?t:e-t<3e3?e:t}function ss(t,e,i,r,n=Number.POSITIVE_INFINITY){let o=U(t,i),s=o>=e+r?o:Math.max(i,e+r);return Math.min(s,n)}function U(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function ce(t,e=0,i=1){return Math.min(i,Math.max(e,t))}function cr(t,e){return ce((e-t.start)/Math.max(1,t.end-t.start))}function tt(t,e,i){let r=ce((i-t)/(e-t));return r*r*(3-2*r)}var eu=1200,tu=60,iu=750,ls=3e3,ru=[200,900,2400],nu=4e3,cs="",mt=0,Xt=0,Zt=0,dr=0,ur=!1,ds=!1,us=0,as=[];function ye(){let t=U(Spicetify.Player?.getProgress?.(),0),e=ei(),i=performance.now(),r=mt+(i-Xt),n=!Z(),o=e!==cs,s=Math.abs(t-r)>eu;if(n||o||s)return Zt++,pr(t,e,i),dr=i,!n&&(o||s)&&Qt(),t;if(!ds||i-us>ls*2.5){let c=t-r;if(Math.abs(c)>tu){let d=Math.min(120,Math.max(0,i-dr));mt+=c*Math.min(1,d/iu)}}dr=i;let a=mt+(i-Xt),l=K();return l>0?Math.min(a,l):a}function ve(t){let e=Math.max(0,Math.round(t));Zt++,pr(e),Spicetify.Player?.seek?.(e),Qt()}function ps(){ur||(ur=!0,["songchange","onplaypause"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>Qt())}catch{}}),window.setInterval(()=>{Z()&&hs()},ls),Qt())}function Qt(){ur&&(as.forEach(t=>clearTimeout(t)),as=ru.map(t=>window.setTimeout(()=>void hs(),t)))}async function hs(){let t=ou();if(typeof t?.getPositionState!="function")return;let e=Zt,i=ei();try{let r=await t.getPositionState({}),n=Number(r?.position);if(!Number.isFinite(n)||n<0||e!==Zt||i!==ei()||!Z())return;let o=performance.now(),s=mt+(o-Xt);if(Math.abs(n-s)>nu)return;ds=!0,us=o,pr(n,i,o)}catch{}}function ou(){return Spicetify.Platform?.PlayerAPI?._contextPlayer??Spicetify.Player?.origin?._contextPlayer??null}function Z(){let t=Spicetify.Player;return typeof t?.isPlaying=="function"?!!t.isPlaying():typeof t?.data?.isPaused=="boolean"?!t.data.isPaused:!!(t?.data?.is_playing??t?.data?.isPlaying)}function K(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{};return U(e.duration_ms??e.duration??t?.duration?.milliseconds??t?.duration_ms??Spicetify.Player?.data?.duration,0)}function ei(){return String(Spicetify.Player?.data?.item?.uri??"")}function pr(t,e=ei(),i=performance.now()){cs=e,mt=Math.max(0,t),Xt=i}var bt=new Set,Ne=null;function it(t){return bt.add(t),Ne===null&&(Ne=requestAnimationFrame(fs)),()=>{bt.delete(t),bt.size===0&&Ne!==null&&(cancelAnimationFrame(Ne),Ne=null)}}function fs(t){if(bt.size===0){Ne=null;return}Ne=requestAnimationFrame(fs);let e=ye();for(let i of bt)i(e,t)}var gs="1.3.25";function ys(t,e,i){return Math.max(t,Math.min(e,i))}function su(t,e,i){return(1-i)*t+i*e}function au(t,e,i,r){return su(t,e,1-Math.exp(-i*r))}function lu(t,e){return(t%e+e)%e}var cu=class{constructor(){m(this,"isRunning",!1);m(this,"value",0);m(this,"from",0);m(this,"to",0);m(this,"currentTime",0);m(this,"lerp");m(this,"duration");m(this,"easing");m(this,"onUpdate")}advance(t){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;let i=ys(0,this.currentTime/this.duration,1);e=i>=1;let r=e?1:this.easing(i);this.value=this.from+(this.to-this.from)*r}else this.lerp?(this.value=au(this.value,this.to,this.lerp*60,t),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:r,easing:n,onStart:o,onUpdate:s}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=r,this.easing=n,this.currentTime=0,this.isRunning=!0,o?.(),this.onUpdate=s}};function du(t,e){let i;return function(...r){clearTimeout(i),i=setTimeout(()=>{i=void 0,t.apply(this,r)},e)}}var uu=class{constructor(t,e,{autoResize:i=!0,debounce:r=250}={}){m(this,"width",0);m(this,"height",0);m(this,"scrollHeight",0);m(this,"scrollWidth",0);m(this,"debouncedResize");m(this,"wrapperResizeObserver");m(this,"contentResizeObserver");m(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});m(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});m(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,i&&(this.debouncedResize=du(this.resize,r),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},vs=class{constructor(){m(this,"events",{})}emit(t,...e){let i=this.events[t]||[];for(let r=0,n=i.length;r<n;r++)i[r]?.(...e)}on(t,e){return this.events[t]?this.events[t].push(e):this.events[t]=[e],()=>{this.events[t]=this.events[t]?.filter(i=>e!==i)}}off(t,e){this.events[t]=this.events[t]?.filter(i=>e!==i)}destroy(){this.events={}}},pu=100/6,we={passive:!1};function ms(t,e){return t===1?pu:t===2?e:1}var hu=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){m(this,"touchStart",{x:0,y:0});m(this,"lastDelta",{x:0,y:0});m(this,"window",{width:0,height:0});m(this,"emitter",new vs);m(this,"onTouchStart",t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});m(this,"onTouchMove",t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,r=-(e-this.touchStart.x)*this.options.touchMultiplier,n=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:r,y:n},this.emitter.emit("scroll",{deltaX:r,deltaY:n,event:t})});m(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});m(this,"onWheel",t=>{let{deltaX:e,deltaY:i,deltaMode:r}=t,n=ms(r,this.window.width),o=ms(r,this.window.height);e*=n,i*=o,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})});m(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,we),this.element.addEventListener("touchstart",this.onTouchStart,we),this.element.addEventListener("touchmove",this.onTouchMove,we),this.element.addEventListener("touchend",this.onTouchEnd,we)}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,we),this.element.removeEventListener("touchstart",this.onTouchStart,we),this.element.removeEventListener("touchmove",this.onTouchMove,we),this.element.removeEventListener("touchend",this.onTouchEnd,we)}},bs=t=>Math.min(1,1.001-2**(-10*t)),ws=class{constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:i=t,smoothWheel:r=!0,syncTouch:n=!1,syncTouchLerp:o=.075,touchInertiaExponent:s=1.7,duration:a,easing:l,lerp:c=.1,infinite:d=!1,orientation:u="vertical",gestureOrientation:p=u==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:g=1,autoResize:x=!0,prevent:E,virtualScroll:f,overscroll:b=!0,autoRaf:w=!1,anchors:S=!1,autoToggle:y=!1,allowNestedScroll:k=!1,__experimental__naiveDimensions:v=!1,naiveDimensions:L=v,stopInertiaOnNavigate:M=!1}={}){m(this,"_isScrolling",!1);m(this,"_isStopped",!1);m(this,"_isLocked",!1);m(this,"_preventNextNativeScrollEvent",!1);m(this,"_resetVelocityTimeout",null);m(this,"_rafId",null);m(this,"_isDraggingSelection",!1);m(this,"isTouching");m(this,"isIos");m(this,"time",0);m(this,"userData",{});m(this,"lastVelocity",0);m(this,"velocity",0);m(this,"direction",0);m(this,"options");m(this,"targetScroll");m(this,"animatedScroll");m(this,"animate",new cu);m(this,"emitter",new vs);m(this,"dimensions");m(this,"virtualScroll");m(this,"onScrollEnd",t=>{t instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&t.stopPropagation()});m(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});m(this,"onTransitionEnd",t=>{t.propertyName?.includes("overflow")&&t.target===this.rootElement&&this.checkOverflow()});m(this,"onClick",t=>{let e=t.composedPath().filter(r=>r instanceof HTMLAnchorElement&&r.href).map(r=>new URL(r.href)),i=new URL(window.location.href);if(this.options.anchors){let r=e.find(n=>i.host===n.host&&i.pathname===n.pathname&&n.hash);if(r){let n=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,o=decodeURIComponent(r.hash);this.scrollTo(o,n);return}}if(this.options.stopInertiaOnNavigate&&e.some(r=>i.host===r.host&&i.pathname!==r.pathname)){this.reset();return}});m(this,"onPointerDown",t=>{t.button===1&&this.reset()});m(this,"onVirtualScroll",t=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(t)===!1)return;let{deltaX:e,deltaY:i,event:r}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let n=r.type.includes("touch"),o=r.type.includes("wheel");if(n&&this.isIos&&(r.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=r.type==="touchstart"||r.type==="touchmove";let s=e===0&&i===0;if(this.options.syncTouch&&n&&r.type==="touchstart"&&s&&!this.isStopped&&!this.isLocked){this.reset();return}let a=this.options.gestureOrientation==="vertical"&&i===0||this.options.gestureOrientation==="horizontal"&&e===0;if(s||a)return;let l=r.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent,d=Math.abs(e)>=Math.abs(i)?"horizontal":"vertical";if(l.find(g=>g instanceof HTMLElement&&(typeof c=="function"&&c?.(g)||g.hasAttribute?.("data-lenis-prevent")||d==="vertical"&&g.hasAttribute?.("data-lenis-prevent-vertical")||d==="horizontal"&&g.hasAttribute?.("data-lenis-prevent-horizontal")||n&&g.hasAttribute?.("data-lenis-prevent-touch")||o&&g.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:i}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&n||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),r.lenisStopPropagation=!0;return}let u=i;this.options.gestureOrientation==="both"?u=Math.abs(i)>Math.abs(e)?i:e:this.options.gestureOrientation==="horizontal"&&(u=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&i>0||this.animatedScroll===this.limit&&i<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let p=n&&this.options.syncTouch,h=n&&r.type==="touchend";h&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...p?{lerp:h?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});m(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});m(this,"raf",t=>{let e=t-(this.time||t);this.time=t,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=gs,window.lenis||(window.lenis={}),window.lenis.version=gs,u==="horizontal"&&(window.lenis.horizontal=!0),n===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof a=="number"&&typeof l!="function"?l=bs:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:t,content:e,eventsTarget:i,smoothWheel:r,syncTouch:n,syncTouchLerp:o,touchInertiaExponent:s,duration:a,easing:l,lerp:c,infinite:d,gestureOrientation:p,orientation:u,touchMultiplier:h,wheelMultiplier:g,autoResize:x,prevent:E,virtualScroll:f,overscroll:b,autoRaf:w,anchors:S,autoToggle:y,allowNestedScroll:k,naiveDimensions:L,stopInertiaOnNavigate:M},this.dimensions=new uu(t,e,{autoResize:x}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new hu(i,{touchMultiplier:h,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}get overflow(){let t=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[t]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(t){this.isHorizontal?this.options.wrapper.scrollTo({left:t,behavior:"instant"}):this.options.wrapper.scrollTo({top:t,behavior:"instant"})}isTouchOnSelectionHandle(t){let e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;let i=t.targetTouches[0]??t.changedTouches[0];if(!i)return!1;let r=e.getRangeAt(0).getClientRects();if(r.length===0)return!1;let n=r[0],o=r[r.length-1],s=40,a=Math.hypot(i.clientX-n.left,i.clientY-n.top)<=s,l=Math.hypot(i.clientX-o.right,i.clientY-o.bottom)<=s;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(t,{offset:e=0,immediate:i=!1,lock:r=!1,programmatic:n=!0,lerp:o=n?this.options.lerp:void 0,duration:s=n?this.options.duration:void 0,easing:a=n?this.options.easing:void 0,onStart:l,onComplete:c,force:d=!1,userData:u}={}){if((this.isStopped||this.isLocked)&&!d)return;let p=t,h=e;if(typeof p=="string"&&["top","left","start","#"].includes(p))p=0;else if(typeof p=="string"&&["bottom","right","end"].includes(p))p=this.limit;else{let g=null;if(typeof p=="string"?(g=p.startsWith("#")?document.getElementById(p.slice(1)):document.querySelector(p),g||(p==="#top"?p=0:console.warn("Lenis: Target not found",p))):p instanceof HTMLElement&&p?.nodeType&&(g=p),g){if(this.options.wrapper!==window){let S=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?S.left:S.top}let x=g.getBoundingClientRect(),E=getComputedStyle(g),f=this.isHorizontal?Number.parseFloat(E.scrollMarginLeft):Number.parseFloat(E.scrollMarginTop),b=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(b.scrollPaddingLeft):Number.parseFloat(b.scrollPaddingTop);p=(this.isHorizontal?x.left:x.top)+this.animatedScroll-(Number.isNaN(f)?0:f)-(Number.isNaN(w)?0:w)}}if(typeof p=="number"){if(p+=h,this.options.infinite){if(n){this.targetScroll=this.animatedScroll=this.scroll;let g=p-this.animatedScroll;g>this.limit/2?p-=this.limit:g<-this.limit/2&&(p+=this.limit)}}else p=ys(0,p,this.limit);if(p===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=u??{},i){this.animatedScroll=this.targetScroll=p,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}n||(this.targetScroll=p),typeof s=="number"&&typeof a!="function"?a=bs:typeof a=="function"&&typeof s!="number"&&(s=1),this.animate.fromTo(this.animatedScroll,p,{duration:s,easing:a,lerp:o,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(g,x)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),n&&(this.targetScroll=g),x||this.emit(),x&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(t,{deltaX:e,deltaY:i}){let r=Date.now();t._lenis||(t._lenis={});let n=t._lenis,o,s,a,l,c,d,u,p,h,g;if(r-(n.time??0)>2e3){n.time=Date.now();let k=window.getComputedStyle(t);if(n.computedStyle=k,o=["auto","overlay","scroll"].includes(k.overflowX),s=["auto","overlay","scroll"].includes(k.overflowY),c=["auto"].includes(k.overscrollBehaviorX),d=["auto"].includes(k.overscrollBehaviorY),n.hasOverflowX=o,n.hasOverflowY=s,!(o||s))return!1;u=t.scrollWidth,p=t.scrollHeight,h=t.clientWidth,g=t.clientHeight,a=u>h,l=p>g,n.isScrollableX=a,n.isScrollableY=l,n.scrollWidth=u,n.scrollHeight=p,n.clientWidth=h,n.clientHeight=g,n.hasOverscrollBehaviorX=c,n.hasOverscrollBehaviorY=d}else a=n.isScrollableX,l=n.isScrollableY,o=n.hasOverflowX,s=n.hasOverflowY,u=n.scrollWidth,p=n.scrollHeight,h=n.clientWidth,g=n.clientHeight,c=n.hasOverscrollBehaviorX,d=n.hasOverscrollBehaviorY;if(!(o&&a||s&&l))return!1;let x=Math.abs(e)>=Math.abs(i)?"horizontal":"vertical",E,f,b,w,S,y;if(x==="horizontal")E=Math.round(t.scrollLeft),f=u-h,b=e,w=o,S=a,y=c;else if(x==="vertical")E=Math.round(t.scrollTop),f=p-g,b=i,w=s,S=l,y=d;else return!1;return!y&&(E>=f||E<=0)?!0:(b>0?E<f:E>0)&&w&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let t=this.options.wrapper;return this.isHorizontal?t.scrollX??t.scrollLeft:t.scrollY??t.scrollTop}get scroll(){return this.options.infinite?lu(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.options.autoToggle&&(t+=" lenis-autoToggle"),this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(t=>{this.rootElement.classList.add(t)})}cleanUpClassName(){for(let t of Array.from(this.rootElement.classList))(t==="lenis"||t.startsWith("lenis-"))&&this.rootElement.classList.remove(t)}};var te="liquid-lyrics:settings",xs="liquid-lyrics-settings",ks="liquid-lyrics-bg-image",ti={spotifyLyricsButton:"hide",showOwnButton:!0,showTitle:!0,showHeaderLinks:!0,autoHideUi:!0,autoHideDelay:3,autoHideCursor:!0,fontScale:100,fadeTop:11,fadeBottom:18,smoothScroll:!0,smoothScrollDuration:12,simpleLyrics:!1,minimalLyrics:!1,bgMode:"kawarp",bgSource:"albumArt",bgUrl:"",bgColor:"#101418",bgScale:100,bgBlur:20,bgSaturation:150,bgBrightness:60,bgContrast:100,bgOpacity:100,bgRotationSpeed:100,bgWarpIntensity:50,cardStyle:"default",cardCoverRadius:20,cardSide:"left",cardCenterText:!0,cardHideTitle:!1,cardHideArtist:!1,cardHideAlbum:!1,pageShowCredits:!0,pageHideScrollbar:!1,pageShowControls:!0,pageControlPosition:"bottom",fsShowCredits:!0,fsHideScrollbar:!1,fsShowControls:!0,fsControlPosition:"bottom",npvBackground:!0,npvShowCard:!0,npvCardHeight:25,npvCardMinHeight:320},fr={autoHideDelay:{min:1,max:30,step:1},fontScale:{min:50,max:200,step:5},fadeTop:{min:0,max:45,step:1},fadeBottom:{min:0,max:45,step:1},smoothScrollDuration:{min:2,max:30,step:1},bgScale:{min:10,max:400,step:5},bgBlur:{min:0,max:150,step:1},bgSaturation:{min:0,max:500,step:10},bgBrightness:{min:0,max:200,step:5},bgContrast:{min:0,max:300,step:5},bgOpacity:{min:0,max:100,step:5},bgRotationSpeed:{min:0,max:400,step:10},bgWarpIntensity:{min:0,max:100,step:5},cardCoverRadius:{min:0,max:48,step:1},npvCardHeight:{min:20,max:100,step:5},npvCardMinHeight:{min:100,max:1200,step:20}},yt=null;function C(){return yt||(yt={...ti,...bu()},yt)}function $(t,e){let i={...C(),[t]:e};br(i)}function Ss(){br({...ti})}var fu={transparent:0,color:0,image:0,animated:51,kawarp:20},gu={transparent:100,color:100,image:100,animated:100,kawarp:150};function gr(t){let e=C();if(e.bgMode===t)return;hr=t==="transparent"&&e.bgMode!=="transparent"?e.bgMode:hr,br({...e,bgMode:t,bgBlur:fu[t],bgSaturation:gu[t]})}var hr="kawarp";function Ls(){let t=C().bgMode;gr(t==="transparent"?hr:"transparent")}function Ts(){return C().bgMode!=="transparent"}function mr(){try{return localStorage.getItem(ks)||""}catch{return""}}function mu(t){try{localStorage.setItem(ks,t)}catch{return!1}return ri(),window.dispatchEvent(new Event(te)),!0}function ii(t,e){let i=C(),r=e??i.bgMode;return r==="color"||r==="transparent"?"":i.bgSource==="url"?i.bgUrl.trim():i.bgSource==="upload"?mr():t}async function Es(t){let e=await new Promise((c,d)=>{let u=new FileReader;u.onload=()=>c(String(u.result||"")),u.onerror=d,u.readAsDataURL(t)}),i=await new Promise((c,d)=>{let u=new Image;u.onload=()=>c(u),u.onerror=d,u.src=e}),n=Math.min(1,1600/Math.max(i.width,i.height)),o=Math.max(1,Math.round(i.width*n)),s=Math.max(1,Math.round(i.height*n)),a=document.createElement("canvas");a.width=o,a.height=s;let l=a.getContext("2d");if(!l)return!1;l.drawImage(i,0,0,o,s);for(let c of[.92,.85,.7,.5,.35])if(mu(a.toDataURL("image/jpeg",c)))return!0;return!1}function ri(){let t=C(),e=document.documentElement,i=(r,n)=>e.style.setProperty(r,n);i("--ll-font-scale",String(A(t.fontScale,50,200)/100*1.2)),i("--ll-fade-top",`${A(t.fadeTop,0,45)}%`),i("--ll-fade-bottom",`${A(t.fadeBottom,0,45)}%`),i("--ll-bg-color",t.bgColor),i("--ll-bg-scale",String(A(t.bgScale,10,400)/100)),i("--ll-bg-opacity",String(A(t.bgOpacity,0,100)/100)),i("--ll-bg-spin-duration",t.bgRotationSpeed<=0?"0s":`${Math.round(3e4/(t.bgRotationSpeed/100))}ms`),i("--ll-bg-backdrop-blur",`${A(t.bgBlur,0,150)}px`),i("--ll-bg-filter",[`blur(${A(t.bgBlur,0,150)}px)`,`saturate(${A(t.bgSaturation,0,500)}%)`,`brightness(${A(t.bgBrightness,0,200)}%)`,`contrast(${A(t.bgContrast,0,300)}%)`].join(" ")),i("--ll-bg-canvas-filter",`brightness(${A(t.bgBrightness,0,200)}%) contrast(${A(t.bgContrast,0,300)}%)`),i("--ll-card-cover-radius",`${A(t.cardCoverRadius,0,48)}px`),i("--ll-npv-card-height",`${A(t.npvCardHeight,20,100)}vh`),i("--ll-npv-card-min-height",`${A(t.npvCardMinHeight,100,1200)}px`),e.classList.toggle("ll-hide-own-button",!t.showOwnButton),e.classList.toggle("ll-hide-spotify-lyrics-button",t.spotifyLyricsButton==="hide"),e.classList.toggle("ll-hide-title",!t.showTitle),e.classList.toggle("ll-hide-header-links",!t.showHeaderLinks),e.classList.toggle("ll-npv-background",t.npvBackground),e.classList.toggle("ll-npv-hide-card",!t.npvShowCard),e.classList.toggle("ll-simple-lyrics",t.simpleLyrics),e.classList.toggle("ll-minimal-lyrics",t.minimalLyrics)}function br(t){yt=t;try{localStorage.setItem(xs,JSON.stringify(t))}catch{}ri(),window.dispatchEvent(new Event(te))}function bu(){let t=null;try{t=localStorage.getItem(xs)}catch{return{}}if(!t)return{};let e;try{e=JSON.parse(t)}catch{return{}}if(!e||typeof e!="object")return{};let i=e,r={};for(let n of Object.keys(ti)){let o=i[n],s=ti[n];if(typeof s=="boolean"){typeof o=="boolean"&&(r[n]=o);continue}if(typeof s=="number"){let a=fr[n];typeof o=="number"&&Number.isFinite(o)&&a&&(r[n]=A(Math.round(o),a.min,a.max));continue}typeof o=="string"&&vu(n,o)&&(r[n]=o)}return r}var yu={spotifyLyricsButton:["keep","hide","override"],bgMode:["transparent","color","image","animated","kawarp"],bgSource:["albumArt","url","upload"],cardStyle:["default","cover"],cardSide:["left","right"],pageControlPosition:["bottom","top","left","right"],fsControlPosition:["bottom","top","left","right"]};function vu(t,e){let i=yu[t];return i?i.includes(e):e.length<=2048}function A(t,e,i){return Math.min(i,Math.max(e,t))}var rt=class{constructor(e,i=!1,r=!0){this.scroller=e;this.alwaysOn=i;this.allowed=r;this.lenis=null;this.frame=0;this.enabled=!1;this.draggingScrollbar=!1;this.onPointerDown=e=>{if(!this.lenis)return;let i=this.scroller.offsetWidth-this.scroller.clientWidth;if(i<=0)return;let r=this.scroller.getBoundingClientRect();if(e.clientX<r.right-i)return;this.draggingScrollbar=!0,this.lenis.stop();let n=()=>{window.removeEventListener("pointerup",n),window.removeEventListener("pointercancel",n),this.draggingScrollbar=!1,this.lenis?.scrollTo(this.scroller.scrollTop,{immediate:!0}),this.lenis?.start()};window.addEventListener("pointerup",n),window.addEventListener("pointercancel",n)};this.scroller.addEventListener("pointerdown",this.onPointerDown,!0)}sync(){let e=this.allowed&&(this.alwaysOn||C().smoothScroll);if(e===this.enabled){this.lenis&&(this.lenis.options.duration=this.duration());return}this.enabled=e,e?this.start():this.stop()}scrollTo(e,i="smooth"){if(!this.draggingScrollbar){if(!this.lenis||i!=="smooth"){this.lenis?this.lenis.scrollTo(e,{immediate:!0}):this.scroller.scrollTo({top:e,behavior:i});return}this.lenis.scrollTo(e,{duration:this.duration()})}}get isScrolling(){return!!this.lenis?.isScrolling}refresh(){this.lenis?.resize()}destroy(){this.scroller.removeEventListener("pointerdown",this.onPointerDown,!0),this.stop()}duration(){return A(C().smoothScrollDuration,2,30)/10}start(){if(this.lenis)return;try{this.lenis=new ws({wrapper:this.scroller,content:this.scroller.firstElementChild??this.scroller,duration:this.duration(),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,syncTouch:!1})}catch(i){console.warn("[Liquid Lyrics] Smooth scrolling unavailable, using native scrolling.",i),this.lenis=null,this.enabled=!1;return}let e=i=>{this.lenis?.raf(i),this.frame=requestAnimationFrame(e)};this.frame=requestAnimationFrame(e)}stop(){this.frame&&(cancelAnimationFrame(this.frame),this.frame=0),this.lenis?.destroy(),this.lenis=null}};var Ms=900,wu=.92,xu=5e3,ku=180,Cs=1100,yr=.75,Su=8,I=-999,xe=class{constructor(e){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=I;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.romanMode="off";this.songLang=null;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.lastAutoScrollTop=-1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.simpleLyrics=!1;this.minimalLyrics=!1;this.tick=(e,i)=>{if(e===this.lastProgress)return;this.lastProgress=e;let r=this.findActiveIndex(e);r!==this.activeIndex&&(this.applyPosition(r,e),this.activeIndex=r),r>=0&&(this.virtual&&this.mountAround(r),this.updateActiveLine(this.records[r],e)),this.outgoingLines.length>0&&this.updateOutgoingLines(e)};this.onSettingsChange=()=>{this.smooth.sync(),this.readLyricsModes(),this.smooth.refresh()};this.onUserScroll=()=>{this.smooth.isScrolling||(this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},xu))};this.onContainerClick=e=>{let i=e.target?.closest(".liquid-lyrics-line");if(!i)return;let r=this.recordByEl.get(i);!r||!Number.isFinite(r.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),ve(r.start),this.forceSync(),this.scrollToRecord(r))};this.container=e.container,this.scroller=e.scroller??e.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...e},this.smooth=new rt(this.scroller),this.smooth.sync(),this.readLyricsModes(),window.addEventListener(te,this.onSettingsChange),this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",i=>{(i.pointerType==="mouse"||i.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasJapanese(){return this.songLang==="ja"}get hasLyrics(){return this.records.length>0}setLyrics(e){if(this.clear(),!e)return;let i=is(e);if(i.length===0)return;let r=this.options.virtualize&&i.some(n=>n.kind==="syllable");if(this.records=i.map((n,o)=>this.buildLineRecord(n,o)),this.records.forEach(n=>this.recordByEl.set(n.el,n)),this.hasTimeline=this.records.some(n=>Number.isFinite(n.start)),this.songLang=jo(i.map(n=>n.kind==="interlude"?"":n.text)),r)this.initVirtualizer();else{let n=document.createDocumentFragment();this.records.forEach(o=>n.appendChild(o.el)),this.container.appendChild(n)}this.appendCredits(e),this.syncClock(),this.forceSync(),requestAnimationFrame(()=>this.smooth.refresh())}appendCredits(e){let i=ns(e);if(!i)return;let r=document.createElement("div");if(r.className="liquid-lyrics-credits",i.writers.length>0){let n=document.createElement("div");n.className="ll-credits-writers",n.textContent=`Written by ${i.writers.join(", ")}`,r.appendChild(n)}if(i.source){let n=document.createElement("div");n.className="ll-credits-source",n.textContent=i.source,r.appendChild(n)}this.container.appendChild(r)}clear(){this.generation++,this.container.classList.remove("ll-settling"),this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=I,this.lastProgress=NaN,this.lastAutoScrollTop=-1,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.songLang=null,this.container.replaceChildren()}setEnabled(e){if(this.enabled!==e&&(this.enabled=e,this.syncClock(),e)){this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),this.smooth.refresh(),this.forceSync();let i=this.activeIndex>=0?this.records[this.activeIndex]:null;i&&this.scrollToRecord(i,"auto"),this.recenterAfterLayout()}}recenterAfterLayout(){let e=this.generation;this.container.classList.add("ll-settling");let i=()=>{if(e!==this.generation||!this.enabled||this.userScrolling)return!1;let n=this.activeIndex>=0?this.records[this.activeIndex]:null;return n?(this.smooth.refresh(),this.scrollToRecord(n,"auto"),!0):!1},r=()=>this.container.classList.remove("ll-settling");requestAnimationFrame(()=>{i(),window.setTimeout(()=>{i(),r()},120)}),window.setTimeout(r,400)}setRomanized(e,i){this.romanMode=e;let r=[],n=!1;for(let o of this.records){let s=o.line;if(s.kind==="interlude"||!s.text)continue;let a=s.text,l=be(a),c=Jt(s.romanizedText);n||(n=l||!!c);let d=this.getLineLanguage(a)==="ja";if(s.kind==="line"||s.kind==="static"){if(e==="romaji"){let u=typeof o.localLineRoman=="string"?o.localLineRoman:"",p=c||u;p?this.setLineContent(o,`t:${p}`,p):(this.setLineContent(o,`t:${a}`,a),i&&l&&o.localLineRoman!==!1&&r.push(o))}else e==="furigana"&&d?typeof o.lineFurigana=="string"&&o.lineFurigana?this.setLineHtml(o,o.lineFurigana,a):(this.setLineContent(o,`t:${a}`,a),i&&o.lineFurigana!==!1&&r.push(o)):this.setLineContent(o,`t:${a}`,a);continue}if(!l){this.applyWordRomanization(o,e==="romaji");continue}e==="romaji"?Array.isArray(o.localWordRoman)?this.applyLocalWordRomanization(o):(this.restoreOriginalWords(o),i&&o.localWordRoman!==!1&&r.push(o)):e==="furigana"&&d?Array.isArray(o.wordFurigana)?this.applyWordFurigana(o):(this.restoreOriginalWords(o),i&&o.wordFurigana!==!1&&r.push(o)):this.restoreOriginalWords(o)}this.hasRomanizationValue=n,this.options.onRomanizationAvailability?.(n),r.length>0&&this.processLocalRomanization(r,e)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),window.removeEventListener(te,this.onSettingsChange),this.smooth.destroy(),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(e,i){let r=e.kind!=="static",n=this.options.variant==="sidebar"&&(e.kind==="line"||e.kind==="syllable"),o=document.createElement(n?"button":"div");o instanceof HTMLButtonElement&&(o.type="button"),o.className="liquid-lyrics-line";let s={index:i,el:o,line:e,start:r?e.range.start:Number.POSITIVE_INFINITY,end:r?e.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:I,interludeVis:I,interludeY:I,interludeScale:I,displayText:e.kind==="interlude"?"":e.text,displayKey:"orig",localWordRoman:null,wordFurigana:null,localLineRoman:null,lineFurigana:null,wrapper:null,height:0,rowOffset:I};if(e.kind==="interlude"){o.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&o.setAttribute("aria-hidden","true");for(let a=0;a<3;a++){let l=document.createElement("span");l.className="ll-interlude-dot",o.appendChild(l),s.dots.push(l),s.dotLift.push(0)}}else if(e.kind==="static")o.classList.add("liquid-lyrics-static"),o.textContent=e.text;else if(e.kind==="line")o.textContent=e.text;else{o.classList.add("ll-syllable-line");let a=document.createElement("div");a.className="ll-vocal-line ll-lead-vocal",o.appendChild(a),s.leadEl=a;let l=this.buildWordSpans(a,e.lead.words,"");if(this.options.renderBackgrounds)for(let c of e.backgrounds){let d=document.createElement("div");d.className="ll-vocal-line ll-background-vocal",o.appendChild(d),s.bgWords.push(...this.buildWordSpans(d,c.words,"ll-bg-syllable"))}s.words=_s(l,s.bgWords)}return s}buildWordSpans(e,i,r){let n=[];return i.forEach((o,s)=>{let a=document.createElement("span");a.className=r?`ll-syllable ${r}`:"ll-syllable",o.animateLetters&&a.classList.add("ll-long-syllable"),be(o.text)&&a.classList.add("ll-cjk-syllable"),s===i.length-1&&a.classList.add("LastWordInLine");let l=[];if(o.rubyHtml)a.classList.add("ll-ruby-syllable"),a.setAttribute("aria-label",o.text),a.innerHTML=o.rubyHtml;else if(o.animateLetters){a.setAttribute("aria-label",o.text);for(let c of o.text){let d=document.createElement("span");d.className="ll-letter",d.textContent=c,a.appendChild(d),l.push(d)}}else a.textContent=o.text;e.appendChild(a),n.push({el:a,start:o.start,end:o.end,animateLetters:o.animateLetters,letters:l,state:"idle",gradientUnit:I,lastLift:0,letterFill:null,letterLift:null})}),n}syncClock(){let e=this.enabled&&this.hasTimeline&&this.records.length>0;e&&!this.unsubscribeClock?this.unsubscribeClock=it(this.tick):e||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(ye(),performance.now()))}lastStartedIndex(e){let i=this.records,r=0,n=i.length-1,o=-1;for(;r<=n;){let s=r+n>>1;i[s].start<=e?(o=s,r=s+1):n=s-1}return o}findActiveIndex(e){let i=this.records;if(i.length===0)return-1;let r=this.lastStartedIndex(e);if(r<0)return-1;let n=Math.max(0,r-4);for(let s=r;s>=n;s--){let a=i[s];if(e>=a.start&&e<a.end)return s}if(this.activeIndex>=0&&this.activeIndex<i.length){let s=i[this.activeIndex];if(e>=s.start&&e<s.end+Ms)return this.activeIndex}let o=i[r];return o.end<=e&&e-o.end<=Ms?r:-1}applyPosition(e,i){let r=this.activeIndex,n=this.records;for(let o=0;o<n.length;o++){let s=n[o],a=s.state==="active";if(o===e){a||this.activateLine(s,i);continue}(e>=0?o<e:s.end<=i)?a&&s.line.kind!=="interlude"&&s.end>i?this.beginOutgoing(s):(s.state!=="past"||a)&&this.completeLine(s,a):(s.state!=="future"||a)&&this.resetLine(s)}if(e>=0&&!this.userScrolling){let o=r>=0?n[r]:null,s=n[e];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),o?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===e&&this.scrollToRecord(s)},ku):this.scrollToRecord(s)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(e,i){e.state="active",e.outgoing=!1,e.progressUnit=I,e.interludeVis=I,e.interludeY=I,e.interludeScale=I;let r=e.el.classList;if(r.remove("past","future","ll-finishing","ll-outgoing"),r.add("active"),e.line.kind==="syllable"){e.dirty=!0;for(let n of e.words)this.syncWordState(n,i)}else e.line.kind==="interlude"&&(e.dirty=!0)}beginOutgoing(e){e.state="past",e.outgoing=!0;let i=e.el.classList;i.remove("active","future","ll-finishing"),i.add("past","ll-outgoing"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.outgoingLines.includes(e)||this.outgoingLines.push(e)}updateOutgoingLines(e){for(let i=this.outgoingLines.length-1;i>=0;i--){let r=this.outgoingLines[i];if(!r.outgoing||r.state!=="past"){this.outgoingLines.splice(i,1);continue}if(e>=r.end){this.finishOutgoing(r),this.outgoingLines.splice(i,1);continue}if(e<r.start){this.outgoingLines.splice(i,1),this.resetLine(r);continue}r.line.kind==="syllable"?this.updateWords(r,e):this.writeLineProgress(r,cr(r,e)*100)}}finishOutgoing(e){e.outgoing=!1;let i=e.el.classList;if(i.remove("ll-outgoing"),i.add("ll-finishing"),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="sung"&&this.setWordState(r,"sung")}}completeLine(e,i){e.state="past",e.outgoing=!1;let r=e.el.classList;if(r.remove("active","future","ll-outgoing"),r.add("past"),r.toggle("ll-finishing",i),e.glow&&(r.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let n of e.words)n.state!=="sung"&&this.setWordState(n,"sung");for(let n of e.dots)n.classList.add("lit"),As(n);e.dotLift.fill(0)}}resetLine(e){e.state="future",e.outgoing=!1;let i=e.el.classList;if(i.remove("active","past","ll-finishing","ll-outgoing"),i.add("future"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="future"&&this.setWordState(r,"future");for(let r of e.dots)r.classList.remove("lit"),As(r);e.dotLift.fill(0)}}clearLineInline(e){let i=e.el.style;e.progressUnit!==I&&(i.removeProperty("--line-progress"),e.progressUnit=I),e.interludeVis!==I&&(i.removeProperty("--interlude-visibility"),i.removeProperty("--interlude-y"),i.removeProperty("--interlude-scale"),e.interludeVis=I,e.interludeY=I,e.interludeScale=I)}updateActiveLine(e,i){let r=cr(e,i);if(e.line.kind==="interlude"){this.updateInterlude(e,r);return}let n=r>wu;n!==e.glow&&(e.glow=n,e.el.classList.toggle("ll-glow",n)),e.line.kind==="syllable"?this.updateWords(e,i):this.writeLineProgress(e,r*100)}writeLineProgress(e,i){let r=Math.round(i*2)/2;r!==e.progressUnit&&(e.progressUnit=r,e.el.style.setProperty("--line-progress",String(r)))}updateWords(e,i){for(let r of e.words){let n=i<r.start?"future":i>=r.end?"sung":"singing";n!==r.state&&this.setWordState(r,n),n==="singing"&&this.updateSingingWord(r,i)}}syncWordState(e,i){let r=i<e.start?"future":i>=e.end?"sung":"singing";r!==e.state&&this.setWordState(e,r)}setWordState(e,i){e.state=i;let r=e.el.classList;r.toggle("singing",i==="singing"),r.toggle("sung",i==="sung"),r.toggle("future",i==="future"),i!=="singing"&&this.clearWordInline(e)}clearWordInline(e){let i=e.el.style;if(e.gradientUnit!==I&&(i.removeProperty("--syl-progress"),e.gradientUnit=I),e.lastLift!==0&&(i.transform="",e.lastLift=0),!(!e.letterFill||!e.letterLift))for(let r=0;r<e.letters.length;r++){let n=e.letters[r];e.letterFill[r]!==I&&(n.style.removeProperty("--letter-progress"),e.letterFill[r]=I),e.letterLift[r]!==0&&(n.style.transform="",e.letterLift[r]=0)}}updateSingingWord(e,i){let r=ce((i-e.start)/Math.max(1,e.end-e.start));if(e.animateLetters){this.updateLetters(e,r),this.minimalLyrics&&!this.simpleLyrics&&this.applyWordLift(e,r);return}let n=Math.round(-20+120*r);n!==e.gradientUnit&&(e.gradientUnit=n,e.el.style.setProperty("--syl-progress",String(n))),this.applyWordLift(e,r)}applyWordLift(e,i){if(this.simpleLyrics){e.lastLift!==0&&(e.lastLift=0,e.el.style.transform="");return}let r=Math.sin(i*Math.PI);Math.abs(r-e.lastLift)>.01&&(e.lastLift=r,e.el.style.transform=`translate3d(0, ${(-5*r).toFixed(2)}px, 0) scale(${(1+.018*r).toFixed(4)})`)}updateLetters(e,i){let r=e.letters,n=r.length;if(n===0)return;(!e.letterFill||!e.letterLift)&&(e.letterFill=new Array(n).fill(I),e.letterLift=new Array(n).fill(0));let o=Math.max(.16,1.8/n),s=i+o*tt(.7,1,i);for(let a=0;a<n;a++){let l=r[a],c=Math.round(-20+120*ce(i*n-a)),d=e.letterFill[a];if((Math.abs(c-d)>=4||c!==d&&(c===100||c===-20))&&(e.letterFill[a]=c,l.style.setProperty("--letter-progress",String(c))),this.simpleLyrics||this.minimalLyrics){e.letterLift[a]!==0&&(e.letterLift[a]=0,l.style.transform="");continue}let u=1-ce(Math.abs(s-(a+.5)/n)/o),p=u<=0?0:tt(0,1,u);Math.abs(p-e.letterLift[a])>.008&&(e.letterLift[a]=p,l.style.transform=p===0?"":`translate3d(0, ${(-5.5*p).toFixed(2)}px, 0) scale(${(1+.02*p).toFixed(4)})`)}}updateInterlude(e,i){let r=tt(0,.22,i),n=1-tt(.99,1,i),o=Math.round(Math.min(r,n)*200)/200,s=Math.round(-24*tt(.76,1,i)*10)/10,a=Math.round((.72+.28*r)*500)/500,l=e.el.style;o!==e.interludeVis&&(e.interludeVis=o,l.setProperty("--interlude-visibility",String(o))),s!==e.interludeY&&(e.interludeY=s,l.setProperty("--interlude-y",`${s}px`)),a!==e.interludeScale&&(e.interludeScale=a,l.setProperty("--interlude-scale",String(a)));let c=this.options.dotLiftPx;for(let d=0;d<e.dots.length;d++){let u=e.dots[d],p=d/3,h=(d+1)/3;u.classList.toggle("lit",i>=p),u.style.opacity=i>=.99?String(n):"";let g=0;i>=p&&i<h&&(g=Math.sin((i-p)/(h-p)*Math.PI)*c),(Math.abs(g-e.dotLift[d])>.1||g===0&&e.dotLift[d]!==0)&&(e.dotLift[d]=g,u.style.transform=g===0?"":`translateY(${(-g).toFixed(2)}px)`)}}scrollToRecord(e,i="smooth"){let r=this.scroller,n,o;if(this.virtual)this.mountAround(e.index),n=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),o=this.virtual.heights[e.index]??e.el.offsetHeight;else{if(!e.el.isConnected)return;n=Lu(e.el,r),o=e.el.offsetHeight}let s=Math.max(0,n-r.clientHeight/2+o/2);this.lastAutoScrollTop=s,this.smooth.scrollTo(s,i)}reanchorActiveLine(){if(!this.virtual||!this.enabled||this.userScrolling)return;let e=this.activeIndex>=0?this.records[this.activeIndex]:null;if(!e)return;let i=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),r=this.virtual.heights[e.index]??e.el.offsetHeight,n=Math.max(0,i-this.scroller.clientHeight/2+r/2);Math.abs(n-this.lastAutoScrollTop)<2||(this.lastAutoScrollTop=n,this.smooth.scrollTo(n,"smooth"))}resetScroll(){this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),this.lastAutoScrollTop=0,this.smooth.refresh(),this.smooth.scrollTo(0,"auto")}readLyricsModes(){let e=C();this.simpleLyrics=e.simpleLyrics,this.minimalLyrics=e.minimalLyrics}setLineContent(e,i,r){e.displayKey!==i&&(e.displayKey=i,e.displayText=r,e.el.textContent=r,this.refreshVirtualHeight(e))}setLineHtml(e,i,r){let n=`h:${i}`;e.displayKey!==n&&(e.displayKey=n,e.displayText=r,e.el.innerHTML=i,this.refreshVirtualHeight(e))}getLineLanguage(e){return ar(e)?"ja":lr(e)?"ko":Kt(e)?this.songLang==="ja"?"ja":"zh":null}applyLocalWordRomanization(e){if(e.line.kind!=="syllable"||!Array.isArray(e.localWordRoman))return;let i=e.localWordRoman,r=e.line.lead.words.map((n,o)=>{let s=i[o]||n.text;return s===n.text?n:{...n,text:s,animateLetters:Yt(s,n.start,n.end)}});this.rebuildLead(e,r,"local-roman",!0)}applyWordFurigana(e){if(e.line.kind!=="syllable"||!Array.isArray(e.wordFurigana))return;let i=e.wordFurigana,r=!1,n=e.line.lead.words.map((o,s)=>{let a=i[s];return a?(r=!0,{...o,rubyHtml:a,animateLetters:!1}):o});if(!r){this.restoreOriginalWords(e);return}this.rebuildLead(e,n,"furigana",!1)}async processLocalRomanization(e,i){let r=this.generation;for(let n of e){if(r!==this.generation||this.romanMode!==i)return;let o=n.line;if(o.kind==="interlude")continue;let s=this.getLineLanguage(o.text);if(o.kind==="syllable"){let a=o.lead.words.map(l=>l.text);if(i==="romaji"){let l=s?await Wo(a,s):null;if(r!==this.generation)return;n.localWordRoman=l??!1,this.romanMode==="romaji"&&l&&this.applyLocalWordRomanization(n)}else if(i==="furigana"){let l=await Ko(a);if(r!==this.generation)return;n.wordFurigana=l??!1,this.romanMode==="furigana"&&l&&this.applyWordFurigana(n)}}else if(i==="romaji"){let a=s?await Vo(o.text,s):null;if(r!==this.generation)return;n.localLineRoman=a||!1,this.romanMode==="romaji"&&a&&this.setLineContent(n,`t:${a}`,a)}else if(i==="furigana"){let a=await $o(o.text);if(r!==this.generation)return;n.lineFurigana=a||!1,this.romanMode==="furigana"&&a&&this.setLineHtml(n,a,o.text)}if(await new Promise(a=>requestAnimationFrame(()=>a())),r!==this.generation)return}}applyWordRomanization(e,i){if(e.line.kind!=="syllable")return;let r=!1,n=e.line.lead.words.map(o=>{let s=i?Jt(o.romanizedText):"";return!s||s===o.text?o:(r=!0,{...o,text:s,animateLetters:Yt(s,o.start,o.end)})});this.rebuildLead(e,n,r?"roman-words":"orig",!1)}restoreOriginalWords(e){e.line.kind==="syllable"&&this.rebuildLead(e,e.line.lead.words,"orig",!1)}rebuildLead(e,i,r,n){if(e.displayKey===r||!e.leadEl)return;e.displayKey=r,e.el.classList.toggle("ll-context-romanized",n),e.leadEl.replaceChildren();let o=this.buildWordSpans(e.leadEl,i,"");if(e.words=_s(o,e.bgWords),e.displayText=i.map(s=>s.text).join(" ").trim(),e.state==="active"){e.dirty=!0;let s=ye();for(let a of e.words)this.syncWordState(a,s)}else if(e.state==="past")for(let s of o)this.setWordState(s,"sung");this.refreshVirtualHeight(e)}initVirtualizer(){let e=document.createElement("div");e.className="ll-syllable-virtual-space",this.container.appendChild(e),this.container.classList.add("ll-syllable-virtualized");let i=new Map;this.records.forEach(n=>{let o=document.createElement("div");o.className="ll-syllable-virtual-row",o.appendChild(n.el),n.wrapper=o,n.height=Rs(n),i.set(n.el,n.index)});let r={space:e,heights:this.records.map(n=>n.height),offsets:[],mounted:new Set,lineToIndex:i,resizeObserver:new ResizeObserver(n=>{let o=!1;for(let s of n){let a=i.get(s.target);if(a===void 0)continue;let l=Math.max(1,s.borderBoxSize?.[0]?.blockSize??s.target.offsetHeight);Math.abs((r.heights[a]??0)-l)<yr||(r.heights[a]=l,o=!0)}o&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};r.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",r.onScroll,{passive:!0}),this.virtual=r,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let e=this.virtual;e&&(e.raf!==null&&cancelAnimationFrame(e.raf),this.scroller.removeEventListener("scroll",e.onScroll),e.resizeObserver.disconnect(),e.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let e=this.virtual;!e||e.raf!==null||(e.raf=requestAnimationFrame(()=>{e.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let e=this.virtual;if(!e)return;let i=this.scroller.scrollTop-e.space.offsetTop,r=i-Cs,n=i+this.scroller.clientHeight+Cs,o=new Set;for(let a=0;a<this.records.length;a++){let l=e.offsets[a]??0;l+(e.heights[a]??0)>=r&&l<=n&&o.add(a)}let s=this.activeIndex>=0?this.activeIndex:this.lastStartedIndex(this.lastProgress);if(s>=0){let a=Math.max(0,s-3),l=Math.min(this.records.length-1,s+3);for(let c=a;c<=l;c++)o.add(c)}for(let a of e.mounted)!o.has(a)&&a!==this.activeIndex&&this.unmountVirtualLine(a);for(let a of o)this.mountVirtualLine(a);this.layoutMountedRows()}mountAround(e){if(!this.virtual)return;let i=Math.max(0,e-1),r=Math.min(this.records.length-1,e+1),n=!1;for(let o=i;o<=r;o++)n=this.mountVirtualLine(o)||n;n&&this.layoutMountedRows()}mountVirtualLine(e){let i=this.virtual,r=this.records[e];if(!i||!r?.wrapper||i.mounted.has(e))return!1;i.space.appendChild(r.wrapper),i.mounted.add(e),r.rowOffset=I,i.resizeObserver.observe(r.el);let n=r.el.offsetHeight;return n>0&&Math.abs((i.heights[e]??0)-n)>=yr&&(i.heights[e]=n,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(e){let i=this.virtual,r=this.records[e];!i||!r?.wrapper||!i.mounted.has(e)||(i.resizeObserver.unobserve(r.el),r.wrapper.parentElement===i.space&&i.space.removeChild(r.wrapper),i.mounted.delete(e))}recomputeVirtualOffsets(){let e=this.virtual;if(!e)return;let i=0;e.offsets=e.heights.map(r=>{let n=i;return i+=Math.max(1,r)+Su,n}),e.space.style.height=`${Math.max(1,i)}px`}layoutMountedRows(){let e=this.virtual;if(e)for(let i of e.mounted){let r=this.records[i];if(!r?.wrapper)continue;let n=Math.round(e.offsets[i]??0);n!==r.rowOffset&&(r.rowOffset=n,r.wrapper.style.transform=`translate3d(0, ${n}px, 0)`)}}refreshVirtualHeight(e){let i=this.virtual;if(!i)return;let r=e.el.isConnected?e.el.offsetHeight:0,n=r>0?r:Rs(e);Math.abs((i.heights[e.index]??0)-n)<yr||(i.heights[e.index]=n,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}};function _s(t,e){return e.length===0?t:[...t,...e].sort((i,r)=>i.start-r.start)}function As(t){t.style.transform&&(t.style.transform=""),t.style.opacity&&(t.style.opacity="")}function Rs(t){if(t.line.kind==="interlude")return 54;let e=Math.max(1,t.displayText.length),i=Math.max(1,Math.ceil(e/42)),r=t.line.kind==="syllable"?t.line.backgrounds.length:0;return 18+i*45+r*24}function Lu(t,e){let i=0,r=t;for(;r&&r!==e;){i+=r.offsetTop;let n=r.offsetParent;r=n instanceof HTMLElement&&e.contains(n)?n:null}return i}var qs=/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿가-힯]/,Tu=/^#\s*interlude\b/i,Eu=/^\[(.+)\]$/;function Mu(t){let e=t.trim();return e?Tu.test(e):!1}function Cu(t){let e=t.trim().match(Eu);if(!e)return null;let i=e[1].trim();return i.length?i:null}function _u(t){let e=t.split(/\s+/).filter(r=>r.length>0),i=[];for(let r of e){if(!qs.test(r)){i.push(r);continue}let n="";for(let o of Array.from(r))qs.test(o)?(n&&(i.push(n),n=""),i.push(o)):n+=o;n&&i.push(n)}return i}function ze(t){return _u(t).map(e=>({text:e,start:null}))}function vt(t){let e=[];for(let i of t.split(/\r?\n/)){let r=i.trim();if(!r)continue;if(Mu(r)){e.push({kind:"interlude",start:null});continue}let n=Cu(r);if(n!=null){let o=e[e.length-1];o?.kind==="lyric"&&o.backgrounds.push({text:n,tokens:ze(n),start:null,end:null});continue}e.push({kind:"lyric",text:r,tokens:ze(r),backgrounds:[],start:null,end:null})}return e}function Is(t){let e=[];for(let i of t){if(i.kind==="interlude"){e.push("#interlude");continue}e.push(i.text);for(let r of i.backgrounds)e.push(`[${r.text}]`)}return e.join(`
`)}var Ns=4500,ni=250;function de(t,e){return{trackId:t.trackId,trackUri:t.trackUri,title:t.title,artist:t.artist,durationMs:t.durationMs,mode:e,lines:[],endMs:null,updatedAt:Date.now()}}function Au(t){let e=t.lines.map((n,o)=>({line:n,index:o})).filter(n=>n.line.start!=null).sort((n,o)=>n.line.start-o.line.start||n.index-o.index),i=e[e.length-1]?.line.start??0,r=t.endMs!=null?Math.max(t.endMs,i+ni):i+Ns;return e.map((n,o)=>{let s=n.line.start,a=e[o+1]?.line.start??r,l=Math.max(a,s+ni);return{line:n.line,start:s,end:l}})}function oi(t){let e=Au(t),i=e.length===0?Ru(t):t.mode==="line"?qu(t,e):Iu(t,e),r=String(t.credit??"").trim();return r&&(i.LiquidLyricsCredit=r),i}function Ru(t){return{Id:t.trackId,Type:"Static",SongWriters:[],Lines:t.lines.filter(e=>e.kind==="lyric").map(e=>({Text:e.kind==="lyric"?e.text:"",IsRTL:!1})).filter(e=>e.Text),Provider:"local"}}function qu(t,e){let i=e.map(({line:r,start:n,end:o})=>r.kind==="interlude"?{Type:"Interlude",Text:"\u266A",StartTime:n,EndTime:o,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:r.text,StartTime:n,EndTime:o,OppositeAligned:!1,IsRTL:!1});return{Id:t.trackId,Type:"Line",SongWriters:[],Content:i,StartTime:i[0]?.StartTime??0,EndTime:i[i.length-1]?.EndTime??0,Provider:"local"}}function Iu(t,e){let i=e.filter(r=>Pu(r.line)).map(r=>Nu(r));return{Id:t.trackId,Type:"Syllable",SongWriters:[],Content:i,StartTime:i[0]?.Lead.StartTime??0,EndTime:i[i.length-1]?.Lead.EndTime??0,Provider:"local"}}function Pu(t){return t.kind!=="lyric"||t.start==null||t.end==null?!1:t.tokens.length>0&&t.tokens.every(e=>e.start!=null)}function Nu({line:t,start:e}){let i=t.kind==="lyric"?t.tokens:[],r=t.kind==="lyric"&&t.end!=null?t.end:e+Ns,n=Math.max(r,e+ni),o={Type:"Vocal",OppositeAligned:!1,IsRTL:!1,Lead:zs(i,e,n)},s=t.kind==="lyric"?t.backgrounds.filter(zu).map(a=>Bu(a,e,n)):[];return s.length>0&&(o.Background=s),o}function zu(t){return t.end==null?!1:t.tokens.length>0&&t.tokens.every(e=>e.start!=null)}function Bu(t,e,i){let r=t.start??t.tokens[0]?.start??e,n=Math.max(t.end??i,r+ni);return zs(t.tokens,r,n)}function zs(t,e,i){let r=t.length,n=t.map((o,s)=>{let a=o.start??e,l=Ps(a,e,i),c=t[s+1]?.start??i,d=Ps(Math.max(c,l+1),e,i);return{Text:o.text,IsPartOfWord:!1,StartTime:l,EndTime:s===r-1?i:d}});return{StartTime:e,EndTime:i,Syllables:n}}function Bs(t,e){return t.Type==="Static"?Ou(t,e):t.Type==="Line"?Hu(t,e):Fu(t,e)}function Ou(t,e){let i=de(e,"line");return i.lines=(t.Lines??[]).map(r=>wt(r.Text)).filter(Boolean).map(r=>({kind:"lyric",text:r,tokens:ze(r),backgrounds:[],start:null,end:null})),i}function Hu(t,e){let i=de(e,"line");i.lines=(t.Content??[]).map(n=>{if(n.Type==="Interlude")return{kind:"interlude",start:oe(n.StartTime)};let o=wt(n.Text);return{kind:"lyric",text:o,tokens:ze(o),backgrounds:[],start:oe(n.StartTime),end:null}});let r=t.Content??[];return i.endMs=oe(r[r.length-1]?.EndTime),i}function Fu(t,e){let i=de(e,"word");i.lines=(t.Content??[]).map(n=>{let o=n.Lead?.Syllables??[],s=wt(n.LiquidLyricsOriginalText||n.Lead?.LiquidLyricsOriginalText),a=o.map(d=>({text:wt(d.Text),start:oe(d.StartTime)})).filter(d=>d.text.length>0),l=s||a.map(d=>d.text).join(" "),c=(n.Background??[]).map(d=>{let u=(d.Syllables??[]).map(p=>({text:wt(p.Text),start:oe(p.StartTime)})).filter(p=>p.text.length>0);return{text:u.map(p=>p.text).join(" "),tokens:u,start:oe(d.StartTime),end:oe(d.EndTime)}});return{kind:"lyric",text:l,tokens:a,backgrounds:c,start:oe(n.Lead?.StartTime),end:oe(n.Lead?.EndTime)}});let r=t.Content??[];return i.endMs=oe(r[r.length-1]?.Lead?.EndTime),i}function si(t){for(let e of t.lines){if(e.start==null)return!1;if(t.mode==="word"&&e.kind==="lyric"){if(e.tokens.some(i=>i.start==null)||e.end==null)return!1;for(let i of e.backgrounds)if(i.end==null||i.tokens.some(r=>r.start==null))return!1}}return t.lines.length>0}function wt(t){return String(t??"").replace(/\s+/g," ").trim()}function oe(t){let e=Number(t);return Number.isFinite(e)?Math.max(0,e):null}function Ps(t,e,i){return Math.min(Math.max(t,e),Math.max(e,i))}function Os(t,e,i){let r=de(e,i);return r.lines=vt(t),r}var vr=/\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function Hs(t,e){let i=[];for(let n of t.split(/\r?\n/)){vr.lastIndex=0;let o=[],s;for(;(s=vr.exec(n))!==null;)o.push(Du(s[1],s[2],s[3]));if(o.length===0)continue;let a=n.replace(vr,"").trim();for(let l of o)i.push({time:l,text:a})}if(i.length===0)return null;i.sort((n,o)=>n.time-o.time);let r=de(e,"line");return r.lines=i.map(n=>n.text?{kind:"lyric",text:n.text,tokens:ze(n.text),backgrounds:[],start:n.time,end:null}:{kind:"interlude",start:n.time}),r}function Du(t,e,i){let r=Number(t)||0,n=Number(e)||0,o=i?Number(i.padEnd(3,"0").slice(0,3)):0;return r*6e4+n*1e3+o}var Lr="liquid-lyrics-editor",nt="liquid-lyrics:editor-visibility",ke=100,Se=300,Uu=3e3,ju=3e3,Wu=900,Vu=250,Fs=500,xt=180,Ds=16,R={close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M8 5.6v12.8L18.6 12 8 5.6Z" fill="currentColor" stroke="none"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7.5 5h3v14h-3z" fill="currentColor" stroke="none"/><path d="M13.5 5h3v14h-3z" fill="currentColor" stroke="none"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',chevronRight:'<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',chevronsLeft:'<svg viewBox="0 0 24 24"><path d="m17 6-6 6 6 6"/><path d="m11 6-6 6 6 6"/></svg>',chevronsRight:'<svg viewBox="0 0 24 24"><path d="m7 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/></svg>',jump:'<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/></svg>',finish:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4.5h11l-2 3 2 3H5"/></svg>',clear:'<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 12h10l1-12"/></svg>',menu:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>',save:'<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7"/><path d="M8 20v-6h8v6"/></svg>',note:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor" stroke="none"/></svg>'},Tr=null;function kt(){Tr??(Tr=new Er),Tr.open()}function Be(){return!!Tr?.isOpen()}var di=class di{constructor(){this.overlay=null;this.draft=de(Yu(),"line");this.stage="text";this.targets=[];this.cursor=0;this.previewView=null;this.unsubscribeClock=null;this.currentRowEl=null;this.fileInput=null;this.savedSignature="";this.dragging=!1;this.prevRepeat=null;this.prevProgress=0;this.suppressLoopUntil=0;this.suppressFillUntil=0;this.confirmResolve=null;this.confirmOverlay=null;this.refs=null;this.onViewportResize=()=>this.updateControlsInset();this.onSongChangeGuard=()=>{let e=String(Spicetify.Player?.data?.item?.uri??"");e&&e!==this.draft.trackUri&&kr()};this.onTick=e=>{if(!this.refs)return;let i=K();if(i>0&&!this.dragging&&Z()&&e>=i-Vu&&kr(),!this.dragging&&performance.now()>this.suppressLoopUntil&&i>0&&Z()&&e<this.prevProgress&&this.prevProgress>i-Uu&&e<ju&&(this.seek(0),kr()),this.prevProgress=e,Ku(this.refs.playBtn,Z()?R.pause:R.play),this.refs.durTime.textContent=li(i),this.dragging||performance.now()<this.suppressFillUntil)return;let o=i>0?Math.min(1,e/i):0;this.refs.seekFill.style.transform=`scaleX(${o.toFixed(4)})`,this.refs.curTime.textContent=li(e)};this.onKeyDown=e=>{if(!this.isOpen())return;if(this.confirmResolve){e.key==="Escape"?(e.preventDefault(),e.stopImmediatePropagation(),this.resolveConfirm(!1)):e.key==="Enter"&&(e.preventDefault(),e.stopImmediatePropagation(),this.resolveConfirm(!0));return}let i=e.target,r=i instanceof HTMLTextAreaElement||i instanceof HTMLInputElement;if(e.key==="Escape"){if(r)return;e.preventDefault(),this.requestClose();return}if(!(this.stage!=="sync"||r)){if(e.code==="AltRight"){e.preventDefault(),e.stopImmediatePropagation(),e.repeat||this.tap();return}if(di.SYNC_KEYS.has(e.key))switch(e.preventDefault(),e.stopImmediatePropagation(),e.key){case"Backspace":this.undo();break;case"Delete":this.clearCurrent();break;case"ArrowLeft":this.nudgeCurrent(e.shiftKey?-Se:-ke);break;case"ArrowRight":this.nudgeCurrent(e.shiftKey?Se:ke);break;case"ArrowUp":this.cursor=Math.max(0,this.cursor-1),this.renderSyncList();break;case"ArrowDown":this.cursor=Math.min(this.targets.length-1,this.cursor+1),this.renderSyncList();break;default:break}}}}isOpen(){return this.overlay?.classList.contains("visible")??!1}async open(){let e=Vs();if(!e.trackId){ie("No song playing - start a song to create a sync.");return}this.draft=await this.loadDraft(e),this.savedSignature=Sr(this.draft),this.build(),this.rebuildTargets();let i=this.draft.lines.length===0?"text":si(this.draft)?"preview":"sync";this.setStage(i),this.show()}async loadDraft(e){let i=pt(e.trackUri);if(i)return{...i.draft,durationMs:e.durationMs||i.draft.durationMs};try{let r=await Ht({id:e.trackId,uri:e.trackUri,data:{name:e.title}});if(r.status==="success"&&r.data)return Bs(r.data,e)}catch{}return de(e,"line")}build(){document.getElementById(Lr)?.remove();let e=document.createElement("div");e.id=Lr,e.className="liquid-lyrics-editor";let i=T("div","ll-editor-glass-bg"),r=T("div","ll-editor-shell"),n=T("header","ll-editor-header"),o=T("div","ll-editor-title-group"),s=T("h2","ll-editor-title");s.textContent="Sync Editor";let a=T("div","ll-editor-song");a.textContent=`${this.draft.title} - ${this.draft.artist}`,o.append(s,a);let l=T("div","ll-editor-mode-switch"),c=["line","word"].map(M=>{let _=T("button","ll-editor-mode-btn");return _.type="button",_.dataset.mode=M,_.textContent=M==="line"?"Block":"Karaoke",_.addEventListener("click",()=>this.setMode(M)),l.appendChild(_),_}),d=T("div","ll-editor-header-actions"),u=T("div","ll-editor-menu-wrap"),p=wr("ll-editor-icon-btn",R.menu,"More"),h=T("div","ll-editor-menu"),g=this.buildMenu(h);p.addEventListener("click",M=>{M.stopPropagation(),h.classList.toggle("open")}),u.append(p,h);let x=T("button","ll-editor-save-btn");x.type="button",x.innerHTML=`${R.save}<span class="ll-editor-btn-label">Save</span>`,x.setAttribute("aria-label","Save on this device"),P(x,"Save this sync on your device"),x.addEventListener("click",()=>this.save());let E=wr("ll-editor-icon-btn",R.close,"Close");E.addEventListener("click",()=>this.requestClose()),d.append(u,x,E),n.append(o,l,d);let f=T("nav","ll-editor-steps"),w=[{stage:"text",label:"1 \xB7 Text"},{stage:"sync",label:"2 \xB7 Sync"},{stage:"preview",label:"3 \xB7 Preview"}].map(({stage:M,label:_})=>{let q=T("button","ll-editor-step-btn");return q.type="button",q.dataset.stage=M,q.textContent=_,q.addEventListener("click",()=>this.setStage(M)),f.appendChild(q),q}),S=T("div","ll-editor-body"),y=this.buildTransport();r.append(n,f,S,y.el);let k=T("div","liquid-lyrics-transparent-controls");k.setAttribute("aria-hidden","true");let{width:v,height:L}=js();e.style.setProperty("--ll-transparent-controls-width",`${v}px`),e.style.setProperty("--ll-transparent-controls-height",`${L}px`),e.append(i,k,r),document.body.appendChild(e),e.addEventListener("click",()=>h.classList.remove("open")),this.overlay=e,this.refs={songLabel:a,modeButtons:c,stepButtons:w,body:S,transport:y.el,playBtn:y.playBtn,seekFill:y.fill,seekTrack:y.track,curTime:y.cur,durTime:y.dur,menu:h,deleteItem:g},this.updateModeButtons(),this.bindSeek(),this.updateControlsInset()}updateControlsInset(){let e=this.overlay,i=e?.querySelector(".ll-editor-shell"),r=e?.querySelector(".ll-editor-header");if(!e||!i||!r)return;let n=js(),o=i.getBoundingClientRect(),a=o.top+parseFloat(getComputedStyle(i).paddingTop||"0")>=n.height+Ds,l=o.right-(window.innerWidth-n.width)+Ds,c=a?0:Math.max(0,Math.round(l));e.style.setProperty("--ll-editor-controls-inset",`${c}px`)}bindSeek(){let e=this.refs;if(!e)return;let i=e.seekTrack,r=o=>{let s=i.getBoundingClientRect();return Math.min(1,Math.max(0,(o.clientX-s.left)/Math.max(1,s.width)))},n=o=>{e.seekFill.style.transform=`scaleX(${o.toFixed(4)})`;let s=K();s>0&&(e.curTime.textContent=li(s*o))};i.addEventListener("pointerdown",o=>{o.preventDefault(),this.dragging=!0,i.setPointerCapture?.(o.pointerId),n(r(o));let s=l=>n(r(l)),a=l=>{this.dragging=!1,i.releasePointerCapture?.(l.pointerId),window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",a);let c=K();if(c>0){let d=c*r(l);this.seek(d),this.stage==="sync"&&this.moveCursorToTime(d)}};window.addEventListener("pointermove",s),window.addEventListener("pointerup",a,{once:!0})})}buildMenu(e){let i=xr("Import file (.lrc / .txt / .json)");i.addEventListener("click",()=>this.pickFile());let r=xr("Export as file (.json)");r.addEventListener("click",()=>this.exportFile());let n=xr("Delete saved sync");return n.classList.add("ll-editor-menu-danger"),n.addEventListener("click",()=>void this.deleteSaved()),e.append(i,r,n),n}buildTransport(){let e=T("footer","ll-editor-transport"),i=wr("ll-editor-play-btn",R.play,"Play/Pause");i.addEventListener("click",()=>this.togglePlayback());let r=T("span","ll-editor-time ll-editor-time-cur");r.textContent="0:00";let n=T("span","ll-editor-time ll-editor-time-dur");n.textContent="0:00";let o=T("div","ll-editor-seek-track"),s=T("div","ll-editor-seek-bar"),a=T("div","ll-editor-seek-fill");return s.appendChild(a),o.appendChild(s),e.append(i,r,o,n),{el:e,playBtn:i,track:o,fill:a,cur:r,dur:n}}show(){if(this.overlay){this.overlay.classList.add("visible"),window.addEventListener("resize",this.onViewportResize),this.updateControlsInset(),window.addEventListener("keydown",this.onKeyDown,!0);try{Spicetify.Player?.addEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat=Gu(),Ws(2),this.prevProgress=0,this.unsubscribeClock??(this.unsubscribeClock=it(this.onTick)),window.dispatchEvent(new Event(nt))}}close(){window.removeEventListener("keydown",this.onKeyDown,!0),window.removeEventListener("resize",this.onViewportResize);try{Spicetify.Player?.removeEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat!=null&&Ws(this.prevRepeat),this.prevRepeat=null,this.unsubscribeClock?.(),this.unsubscribeClock=null,this.previewView?.destroy(),this.previewView=null,this.overlay?.classList.remove("visible"),this.overlay?.remove(),this.overlay=null,this.refs=null,window.dispatchEvent(new Event(nt))}async requestClose(){this.confirmResolve||this.isDirty()&&!await this.showConfirm({title:"Discard changes?",message:"You have unsaved changes. Closing the editor will lose them.",confirm:"Discard",cancel:"Keep editing",danger:!0})||this.close()}togglePlayback(){if(!Z()){let e=K();e>0&&ye()>=e-500&&this.seek(0)}Ys()}seek(e){let i=performance.now();if(this.suppressLoopUntil=i+Wu,this.suppressFillUntil=i+320,this.refs){let r=K(),n=r>0?Math.min(1,Math.max(0,e/r)):0;this.refs.seekFill.style.transform=`scaleX(${n.toFixed(4)})`,this.refs.curTime.textContent=li(e)}ve(e)}isDirty(){return Sr(this.draft)!==this.savedSignature}showConfirm(e){return new Promise(i=>{let r=T("div","ll-editor-confirm"),n=T("div","ll-editor-confirm-dialog"),o=T("h3","ll-editor-confirm-title");o.textContent=e.title;let s=T("p","ll-editor-confirm-message");s.textContent=e.message;let a=T("div","ll-editor-confirm-actions"),l=T("button","ll-editor-confirm-btn ll-editor-confirm-cancel");l.type="button",l.textContent=e.cancel;let c=T("button","ll-editor-confirm-btn ll-editor-confirm-accept");c.type="button",c.textContent=e.confirm,c.classList.toggle("ll-editor-confirm-danger",!!e.danger),a.append(l,c),n.append(o,s,a),r.appendChild(n),document.body.appendChild(r),requestAnimationFrame(()=>r.classList.add("visible")),l.addEventListener("click",()=>this.resolveConfirm(!1)),c.addEventListener("click",()=>this.resolveConfirm(!0)),r.addEventListener("click",d=>{d.target===r&&this.resolveConfirm(!1)}),this.confirmOverlay=r,this.confirmResolve=i,c.focus()})}resolveConfirm(e){let i=this.confirmResolve,r=this.confirmOverlay;this.confirmResolve=null,this.confirmOverlay=null,r&&(r.classList.remove("visible"),setTimeout(()=>r.remove(),200)),i?.(e)}setStage(e){this.stage==="text"&&e!=="text"&&this.commitText(),this.stage=e,this.refs?.stepButtons.forEach(i=>i.classList.toggle("active",i.dataset.stage===e)),this.previewView&&this.previewView.setEnabled(e==="preview"),this.refs&&(this.refs.body.replaceChildren(),e==="text"?this.renderTextStage():e==="sync"?this.renderSyncStage():this.renderPreviewStage())}setMode(e){this.draft.mode!==e&&(this.draft.mode=e,this.updateModeButtons(),this.rebuildTargets(),this.stage==="sync"?(this.refs?.body.replaceChildren(),this.renderSyncStage()):this.stage==="preview"&&this.refreshPreview())}updateModeButtons(){this.refs?.modeButtons.forEach(e=>e.classList.toggle("active",e.dataset.mode===this.draft.mode))}renderTextStage(){if(!this.refs)return;let e=T("div","ll-editor-text-stage"),i=T("div","ll-editor-hint");i.innerHTML="One line per lyric line. Blank line = separator. Put <b>#interlude</b> on its own line to add an instrumental interlude. Wrap a line in <b>[ ]</b> to make it a background sub-lyric of the line above (karaoke). Long pauses are detected as interludes automatically.";let r=T("textarea","ll-editor-textarea");r.spellcheck=!1,r.placeholder="Paste or type the song's lyrics here - one line per lyric line.",r.value=Is(this.draft.lines),r.addEventListener("input",()=>this.updateTextStats(r.value,l));let n=T("label","ll-editor-credit-row"),o=T("span","ll-editor-credit-label");o.textContent="Credit";let s=T("input","ll-editor-credit-input");s.type="text",s.maxLength=60,s.placeholder="Optional - your name/handle, shown as \u201CSynced by \u2026\u201D under the lyrics",s.value=this.draft.credit??"",s.addEventListener("input",()=>{this.draft.credit=s.value,this.draft.updatedAt=Date.now()}),n.append(o,s);let a=T("div","ll-editor-text-footer"),l=T("div","ll-editor-text-stats"),c=T("button","ll-editor-primary-btn");c.type="button",c.textContent="Continue to sync \u2192",c.addEventListener("click",()=>this.setStage("sync")),a.append(l,c),e.append(i,r,n,a),this.refs.body.appendChild(e),this.updateTextStats(r.value,l),r.focus()}updateTextStats(e,i){let r=vt(e),n=r.filter(s=>s.kind==="lyric").length,o=r.filter(s=>s.kind==="interlude").length;i.textContent=`${n} lines \xB7 ${o} interludes`}commitText(){let e=this.overlay?.querySelector(".ll-editor-textarea");if(!e)return;let i=vt(e.value);this.draft.lines=Zu(this.draft.lines,i),this.draft.updatedAt=Date.now(),this.rebuildTargets()}renderSyncStage(){if(!this.refs)return;let e=T("div","ll-editor-sync-stage"),i=T("div","ll-editor-sync-bar"),r=T("button","ll-editor-tap-btn");r.type="button",r.innerHTML="<b>Set cue</b><span>Right Alt</span>",r.addEventListener("click",()=>this.tap());let n=T("div","ll-editor-sync-hint");n.innerHTML="Play and tap to the beat. <b>Right Alt</b> sets the next cue \xB7 <b>\u232B</b> back \xB7 <b>\u2190/\u2192</b> \xB1100 ms (Shift \xB1300) \xB7 <b>Del</b> clear.";let o=T("div","ll-editor-sync-status");i.append(r,n,this.buildOffsetGroup(),o);let s=T("div","ll-editor-lines");e.append(i,s),this.refs.body.appendChild(e),this.renderSyncList()}renderSyncList(e=!0){let i=this.overlay?.querySelector(".ll-editor-lines");if(!i)return;let r=e?null:i.scrollTop;i.replaceChildren(),this.currentRowEl=null;let n=this.targets[this.cursor],o=n&&n.kind!=="end"?n.lineIndex:-1;this.draft.lines.forEach((s,a)=>{let l=T("div","ll-editor-line");l.dataset.lineIndex=String(a);let c=s.kind==="interlude";l.classList.toggle("is-interlude",c),l.classList.toggle("is-synced",s.start!=null);let d=o===a&&(n?.kind==="line"||this.draft.mode==="word");n?.kind==="line"&&o===a&&(l.classList.add("is-current"),this.currentRowEl=l);let u=T("div","ll-editor-line-index");u.innerHTML=c?R.note:String(Ju(this.draft.lines,a));let p=T("div","ll-editor-line-main");c?(p.textContent="Interlude",p.classList.add("ll-editor-line-interlude-text")):this.draft.mode==="word"?p.appendChild(this.buildTokenRow(s,a,n)):p.textContent=s.text;let h=T("div","ll-editor-line-time");h.textContent=ai(s.start);let g=T("div","ll-editor-line-controls");g.append(G(R.chevronsLeft,"\u2212300 ms",()=>this.nudgeLine(a,-Se)),G(R.chevronLeft,"\u2212100 ms",()=>this.nudgeLine(a,-ke)),G(R.chevronRight,"+100 ms",()=>this.nudgeLine(a,ke)),G(R.chevronsRight,"+300 ms",()=>this.nudgeLine(a,Se)),G(R.jump,"Play from here",()=>this.jumpToLine(a)),G(R.clear,"Clear timing",()=>this.clearLine(a))),l.append(u,p,h,g),l.addEventListener("click",x=>{x.target.closest(".ll-editor-line-controls, .ll-editor-token")||this.selectLine(a)}),d&&this.draft.mode==="word"&&!this.currentRowEl&&(this.currentRowEl=l),i.appendChild(l)}),this.renderEndRow(i,n),this.updateSyncStatus(),e?this.scrollCurrentIntoView():r!=null&&(i.scrollTop=r)}renderEndRow(e,i){let r=this.targets.findIndex(c=>c.kind==="end");if(r<0)return;let n=T("div","ll-editor-line ll-editor-end-row");n.classList.toggle("is-synced",this.draft.endMs!=null),i?.kind==="end"&&(n.classList.add("is-current"),this.currentRowEl=n);let o=T("div","ll-editor-line-index");o.innerHTML=R.finish;let s=T("div","ll-editor-line-main ll-editor-line-interlude-text");s.textContent="End of lyrics";let a=T("div","ll-editor-line-time");a.textContent=ai(this.draft.endMs);let l=T("div","ll-editor-line-controls");l.append(G(R.chevronsLeft,"\u2212300 ms",()=>this.nudgeEnd(-Se)),G(R.chevronLeft,"\u2212100 ms",()=>this.nudgeEnd(-ke)),G(R.chevronRight,"+100 ms",()=>this.nudgeEnd(ke)),G(R.chevronsRight,"+300 ms",()=>this.nudgeEnd(Se)),G(R.jump,"Play from here",()=>this.jumpEnd()),G(R.clear,"Clear end",()=>this.clearEnd())),n.append(o,s,a,l),n.addEventListener("click",c=>{c.target.closest(".ll-editor-line-controls")||(this.cursor=r,this.draft.endMs!=null&&this.seek(this.draft.endMs),this.renderSyncList(!1))}),e.appendChild(n)}buildTokenRow(e,i,r){let n=T("div","ll-editor-token-block");if(e.kind!=="lyric")return n;let o=T("div","ll-editor-tokens");return e.tokens.forEach((s,a)=>{let l=r?.kind==="token"&&r.lineIndex===i&&r.tokenIndex===a;o.appendChild(this.tokenChip(s.text,s.start!=null,l,()=>this.selectToken(i,a)))}),o.appendChild(this.endChip(e.end!=null,r?.kind==="lineEnd"&&r.lineIndex===i,"Line end",()=>this.selectLineEnd(i))),n.appendChild(o),e.backgrounds.forEach((s,a)=>{let l=T("div","ll-editor-tokens ll-editor-bg-tokens");s.tokens.forEach((c,d)=>{let u=r?.kind==="bgToken"&&r.lineIndex===i&&r.bgIndex===a&&r.tokenIndex===d;l.appendChild(this.tokenChip(c.text,c.start!=null,u,()=>this.selectBgToken(i,a,d)))}),l.appendChild(this.endChip(s.end!=null,r?.kind==="bgEnd"&&r.lineIndex===i&&r.bgIndex===a,"Sub-lyric end",()=>this.selectBgEnd(i,a))),n.appendChild(l)}),n}tokenChip(e,i,r,n){let o=T("span","ll-editor-token");return o.textContent=e,o.classList.toggle("is-synced",i),r&&o.classList.add("is-current"),o.addEventListener("click",s=>{s.stopPropagation(),n()}),o}endChip(e,i,r,n){let o=T("span","ll-editor-token ll-editor-lineend-chip");return o.innerHTML=R.finish,o.setAttribute("aria-label",r),P(o,r),o.classList.toggle("is-synced",e),i&&o.classList.add("is-current"),o.addEventListener("click",s=>{s.stopPropagation(),n()}),o}selectLineEnd(e){let i=this.targets.findIndex(n=>n.kind==="lineEnd"&&n.lineIndex===e);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let r=this.draft.lines[e];r?.kind==="lyric"&&r.end!=null&&this.previewTime(r.end,xt)}selectBgToken(e,i,r){let n=this.targets.findIndex(s=>s.kind==="bgToken"&&s.lineIndex===e&&s.bgIndex===i&&s.tokenIndex===r);if(n<0)return;this.cursor=n,this.renderSyncList(!1);let o=this.backgroundAt(e,i)?.tokens[r];o?.start!=null&&this.previewTime(o.start,xt)}selectBgEnd(e,i){let r=this.targets.findIndex(o=>o.kind==="bgEnd"&&o.lineIndex===e&&o.bgIndex===i);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.backgroundAt(e,i);n?.end!=null&&this.previewTime(n.end,xt)}backgroundAt(e,i){let r=this.draft.lines[e];return r?.kind==="lyric"?r.backgrounds[i]:void 0}updateSyncStatus(){let e=this.overlay?.querySelector(".ll-editor-sync-status");if(!e)return;let i=this.targets.length,r=this.targets.filter(n=>this.targetTime(n)!=null).length;e.textContent=`${r}/${i} synced`}scrollCurrentIntoView(){this.currentRowEl?.scrollIntoView({block:"center",behavior:"smooth"})}tap(){let e=this.targets[this.cursor];e&&(this.setTargetTime(e,Math.round(ye())),this.cursor+=1,this.afterSyncChange())}undo(){this.cursor>0&&(this.cursor-=1);let e=this.targets[this.cursor];e&&this.clearTargetTime(e),this.afterSyncChange()}buildOffsetGroup(){let e=T("div","ll-editor-offset-group"),i=T("span","ll-editor-offset-label");i.textContent="Shift all";let r=[{icon:R.chevronsLeft,delta:-Se},{icon:R.chevronLeft,delta:-ke},{icon:R.chevronRight,delta:ke},{icon:R.chevronsRight,delta:Se}];return e.append(i,...r.map(({icon:n,delta:o})=>G(n,`Shift every timing ${o>0?"+":"-"}${Math.abs(o)} ms`,()=>this.shiftAll(o)))),e}shiftAll(e){if(this.targets.map(s=>this.targetTime(s)).filter(s=>s!=null).length===0){ie("Nothing is synced yet - nothing to shift.");return}let r=0,n=s=>{let a=s+e;return a<0&&r++,Math.max(0,a)};for(let s of this.draft.lines)if(s.start!=null&&(s.start=n(s.start)),s.kind==="lyric"){s.end!=null&&(s.end=n(s.end));for(let a of s.tokens)a.start!=null&&(a.start=n(a.start));for(let a of s.backgrounds){a.start!=null&&(a.start=n(a.start)),a.end!=null&&(a.end=n(a.end));for(let l of a.tokens)l.start!=null&&(l.start=n(l.start))}}this.draft.endMs!=null&&(this.draft.endMs=n(this.draft.endMs)),this.afterSyncChange(!1);let o=r?` (${r} held at 0:00)`:"";ie(`Shifted every timing by ${e>0?"+":""}${e} ms${o}.`)}nudgeCurrent(e){let i=this.targets[this.cursor];if(!i)return;let r=this.targetTime(i);if(r==null)return;let n=Math.max(0,r+e);this.setTargetTime(i,n),this.draft.updatedAt=Date.now(),this.refreshTimes();let o=i.kind!=="line"&&i.kind!=="end";this.previewTime(n,o?xt:Fs)}clearCurrent(){let e=this.targets[this.cursor];e&&this.clearTargetTime(e),this.afterSyncChange()}nudgeLine(e,i){let r=this.targets[this.cursor];if(this.draft.mode==="word"&&r&&r.kind!=="end"&&r.kind!=="line"&&r.lineIndex===e&&this.targetTime(r)!=null){this.nudgeCurrent(i);return}let n=this.draft.lines[e];if(!n||n.start==null)return;let o=Math.max(0,n.start+i);this.shiftLine(n,o-n.start),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(o)}jumpToLine(e){let i=this.draft.lines[e];i?.start!=null&&this.seek(i.start)}nudgeEnd(e){this.draft.endMs!=null&&(this.draft.endMs=Math.max(0,this.draft.endMs+e),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(this.draft.endMs))}jumpEnd(){this.draft.endMs!=null&&this.seek(this.draft.endMs)}refreshTimes(){let e=this.overlay?.querySelector(".ll-editor-lines");if(!e)return;this.draft.lines.forEach((r,n)=>{let o=e.querySelector(`.ll-editor-line[data-line-index="${n}"]`);if(!o)return;o.classList.toggle("is-synced",r.start!=null);let s=o.querySelector(".ll-editor-line-time");s&&(s.textContent=ai(r.start))});let i=e.querySelector(".ll-editor-end-row");if(i){i.classList.toggle("is-synced",this.draft.endMs!=null);let r=i.querySelector(".ll-editor-line-time");r&&(r.textContent=ai(this.draft.endMs))}this.updateSyncStatus()}previewTime(e,i=Fs){this.seek(Math.max(0,e-i)),$u()}moveCursorToTime(e){let i=-1;this.targets.forEach((r,n)=>{let o=this.targetTime(r);o!=null&&o<=e+60&&(i=n)}),this.cursor=i>=0?i:0,this.renderSyncList()}clearEnd(){this.draft.endMs=null,this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1)}clearLine(e){let i=this.draft.lines[e];i&&(i.start=null,i.kind==="lyric"&&(i.tokens.forEach(r=>r.start=null),i.end=null,i.backgrounds.forEach(r=>{r.start=null,r.end=null,r.tokens.forEach(n=>n.start=null)})),this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1))}selectLine(e){let i=this.targets.findIndex(n=>n.kind!=="end"&&n.lineIndex===e);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let r=this.draft.lines[e];r?.start!=null&&this.previewTime(r.start)}selectToken(e,i){let r=this.targets.findIndex(s=>s.kind==="token"&&s.lineIndex===e&&s.tokenIndex===i);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.draft.lines[e],o=n?.kind==="lyric"?n.tokens[i]:void 0;o?.start!=null&&this.previewTime(o.start,xt)}afterSyncChange(e=!0){this.draft.updatedAt=Date.now(),this.renderSyncList(e)}rebuildTargets(){let e=[];this.draft.lines.forEach((i,r)=>{this.draft.mode==="line"||i.kind==="interlude"?e.push({kind:"line",lineIndex:r}):(i.tokens.forEach((n,o)=>e.push({kind:"token",lineIndex:r,tokenIndex:o})),e.push({kind:"lineEnd",lineIndex:r}),i.backgrounds.forEach((n,o)=>{n.tokens.forEach((s,a)=>e.push({kind:"bgToken",lineIndex:r,bgIndex:o,tokenIndex:a})),e.push({kind:"bgEnd",lineIndex:r,bgIndex:o})}))}),this.draft.mode==="line"&&this.draft.lines.some(i=>i.kind==="lyric")&&e.push({kind:"end"}),this.targets=e,this.cursor=this.firstUnsetTarget()}firstUnsetTarget(){let e=this.targets.findIndex(i=>this.targetTime(i)==null);return e<0?Math.max(0,this.targets.length-1):e}targetTime(e){if(e.kind==="end")return this.draft.endMs;let i=this.draft.lines[e.lineIndex];if(!i)return null;if(e.kind==="line")return i.start;if(i.kind!=="lyric")return null;if(e.kind==="lineEnd")return i.end;if(e.kind==="token")return i.tokens[e.tokenIndex]?.start??null;let r=i.backgrounds[e.bgIndex];return r?e.kind==="bgEnd"?r.end:r.tokens[e.tokenIndex]?.start??null:null}setTargetTime(e,i){if(e.kind==="end"){this.draft.endMs=i;return}let r=this.draft.lines[e.lineIndex];if(!r)return;if(e.kind==="line"){r.start=i;return}if(r.kind!=="lyric")return;if(e.kind==="lineEnd"){r.end=i;return}if(e.kind==="token"){let s=r.tokens[e.tokenIndex];if(!s)return;s.start=i,r.start=Ks(r);return}let n=r.backgrounds[e.bgIndex];if(!n)return;if(e.kind==="bgEnd"){n.end=i;return}let o=n.tokens[e.tokenIndex];o&&(o.start=i,n.start=$s(n))}clearTargetTime(e){if(e.kind==="end"){this.draft.endMs=null;return}let i=this.draft.lines[e.lineIndex];if(!i)return;if(e.kind==="line"){i.start=null;return}if(i.kind!=="lyric")return;if(e.kind==="lineEnd"){i.end=null;return}if(e.kind==="token"){let o=i.tokens[e.tokenIndex];o&&(o.start=null),i.start=Ks(i);return}let r=i.backgrounds[e.bgIndex];if(!r)return;if(e.kind==="bgEnd"){r.end=null;return}let n=r.tokens[e.tokenIndex];n&&(n.start=null),r.start=$s(r)}shiftLine(e,i){e.start!=null&&(e.start+=i),e.kind==="lyric"&&(e.tokens.forEach(r=>{r.start!=null&&(r.start+=i)}),e.end!=null&&(e.end+=i),e.backgrounds.forEach(r=>{r.start!=null&&(r.start+=i),r.tokens.forEach(n=>{n.start!=null&&(n.start+=i)}),r.end!=null&&(r.end+=i)}))}renderPreviewStage(){if(!this.refs)return;let e=T("div","ll-editor-preview-stage");if(!si(this.draft)){let o=T("div","ll-editor-preview-warn");o.textContent="Not everything is synced yet \u2014 the preview only shows what's already timed.",e.appendChild(o)}let i=T("div","ll-editor-preview-frame"),r=T("div","ll-editor-preview-scroll"),n=T("div","ll-editor-preview-lines");r.appendChild(n),i.appendChild(r),e.appendChild(i),this.refs.body.appendChild(e),this.previewView?.destroy(),this.previewView=new xe({container:n,scroller:r,variant:"panel",virtualize:!1,renderBackgrounds:!0,dotLiftPx:12}),this.refreshPreview(),this.previewView.setEnabled(!0)}refreshPreview(){if(this.previewView)try{this.previewView.setLyrics(oi(this.draft))}catch(e){console.error("[Liquid Lyrics] Preview build failed",e)}}save(){if(this.stage==="text"&&this.commitText(),this.draft.lines.length===0){ie("Add some lyrics first (Text step).");return}let e=this.targets.map(r=>this.targetTime(r)),i=e.filter(r=>r!=null).length;if(i>0&&i<e.length){ie(`Sync incomplete (${i}/${e.length}) \u2014 finish syncing, or clear all timings to save static lyrics.`);return}Xu(this.draft);try{let r={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:oi(this.draft),draft:this.draft};En(r),this.savedSignature=Sr(this.draft),this.refs?.deleteItem.classList.remove("ll-hidden"),this.close(),ie("Sync saved and activated.")}catch(r){console.error("[Liquid Lyrics] Save failed",r),ie("Save failed (storage full?).")}}async deleteSaved(){if(this.refs?.menu.classList.remove("open"),!Tn(this.draft.trackUri)){ie("No custom sync saved for this song.");return}this.confirmResolve||!await this.showConfirm({title:"Delete saved sync?",message:"This removes your custom sync for this song and restores the online lyrics.",confirm:"Delete",cancel:"Cancel",danger:!0})||(Mn(this.draft.trackUri),this.close(),ie("Saved sync deleted."))}exportFile(){this.refs?.menu.classList.remove("open"),this.stage==="text"&&this.commitText();let e={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:oi(this.draft),draft:this.draft},i=`${this.draft.artist} - ${this.draft.title}`.replace(/[^\w\-]+/g,"_").slice(0,80);Qu(`${i||"liquid-lyrics"}.json`,JSON.stringify(e,null,2))}pickFile(){this.refs?.menu.classList.remove("open"),this.fileInput||(this.fileInput=document.createElement("input"),this.fileInput.type="file",this.fileInput.accept=".json,.lrc,.txt",this.fileInput.style.display="none",this.fileInput.addEventListener("change",()=>this.onFileChosen()),document.body.appendChild(this.fileInput)),this.fileInput.value="",this.fileInput.click()}async onFileChosen(){let e=this.fileInput?.files?.[0];if(!e)return;let i=await e.text(),r=Vs(),n=e.name.toLowerCase();try{if(n.endsWith(".json")){let o=Cn(i,r.trackUri);this.draft={...o.draft,durationMs:r.durationMs||o.draft.durationMs}}else if(n.endsWith(".lrc")){let o=Hs(i,r);if(!o)throw new Error("No timings found in the .lrc file");this.draft=o}else this.draft=Os(i,r,this.draft.mode)}catch(o){ie(`Import failed: ${o instanceof Error?o.message:"Invalid file"}`);return}this.updateModeButtons(),this.refs&&(this.refs.songLabel.textContent=`${this.draft.title} - ${this.draft.artist}`),this.rebuildTargets(),this.setStage(si(this.draft)?"preview":this.draft.lines.length?"sync":"text"),ie("File imported.")}};di.SYNC_KEYS=new Set(["Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"]);var Er=di;function T(t,e){let i=document.createElement(t);return i.className=e,i}function wr(t,e,i){let r=T("button",t);return r.type="button",r.innerHTML=e,r.setAttribute("aria-label",i),P(r,i),r}function G(t,e,i){let r=T("button","ll-editor-line-btn");return r.type="button",r.innerHTML=t,r.setAttribute("aria-label",e),P(r,e),r.addEventListener("click",n=>{n.stopPropagation(),i()}),r}function xr(t){let e=T("button","ll-editor-menu-item");return e.type="button",e.textContent=t,e}function Ku(t,e){t.dataset.icon!==e&&(t.dataset.icon=e,t.innerHTML=e)}function Ys(){let t=Spicetify.Player;typeof t?.togglePlay=="function"&&t.togglePlay()}function kr(){let t=Spicetify.Player;typeof t?.pause=="function"?t.pause():typeof t?.togglePlay=="function"&&Z()&&t.togglePlay()}function $u(){Z()||Ys()}function Us(t,e,i){return Number.isFinite(t)?Math.min(i,Math.max(e,t)):e}function js(){return{width:Us(parseInt(localStorage.getItem("liquify-tc-width")||"135",10),50,400),height:Us(parseInt(localStorage.getItem("liquify-tc-height")||"64",10),20,300)}}function Gu(){let t=Spicetify.Player;try{if(typeof t?.getRepeat=="function")return Number(t.getRepeat())||0}catch{}return null}function Ws(t){let e=Spicetify.Player;try{typeof e?.setRepeat=="function"&&e.setRepeat(t)}catch{}}function Vs(){let t=Spicetify.Player?.data?.item,e=String(t?.uri??""),i=Array.isArray(t?.artists)?t.artists.map(n=>n?.name).filter(Boolean).join(", "):"",r=t?.metadata??{};return{trackId:Ot(e),trackUri:e,title:t?.name||r.title||"Unknown title",artist:i||r.artist_name||r.artist||"Unknown artist",durationMs:K()}}function Yu(){return{trackId:"",trackUri:"",title:"",artist:"",durationMs:0}}function Ks(t){if(t.kind!=="lyric")return t.start;let e=t.tokens.map(i=>i.start).filter(i=>i!=null);return e.length?Math.min(...e):null}function $s(t){let e=t.tokens.map(i=>i.start).filter(i=>i!=null);return e.length?Math.min(...e):null}function Ju(t,e){let i=0;for(let r=0;r<=e;r++)t[r].kind==="lyric"&&i++;return i}function Xu(t){for(let e of t.lines){if(e.kind!=="lyric")continue;e.text=Gs(e.text);let i=e.tokens[0];i&&(i.text=Gs(i.text))}}function Gs(t){let e=t.search(/\p{L}/u);return e<0?t:t.slice(0,e)+t[e].toUpperCase()+t.slice(e+1)}function Zu(t,e){let i=new Map,r=[];for(let n of t)if(n.kind==="interlude")r.push(n);else{let o=i.get(n.text)??[];o.push(n),i.set(n.text,o)}return e.map(n=>{if(n.kind==="interlude"){let s=r.shift();return{kind:"interlude",start:s?s.start:null}}let o=i.get(n.text)?.shift();if(o&&o.kind==="lyric"){let s=n.tokens.map((l,c)=>({text:l.text,start:o.tokens[c]?.text===l.text?o.tokens[c].start:null})),a=n.backgrounds.map((l,c)=>{let d=o.backgrounds[c],u=d?.text===l.text;return{text:l.text,tokens:l.tokens.map((p,h)=>({text:p.text,start:u&&d.tokens[h]?.text===p.text?d.tokens[h].start:null})),start:u?d.start:null,end:u?d.end:null}});return{kind:"lyric",text:n.text,tokens:s,backgrounds:a,start:o.start,end:o.end}}return n})}function Sr(t){return JSON.stringify({mode:t.mode,credit:t.credit??"",end:t.endMs,lines:t.lines.map(e=>e.kind==="interlude"?{i:e.start}:{t:e.text,s:e.start,e:e.end,w:e.tokens.map(i=>i.start),b:e.backgrounds.map(i=>({t:i.text,s:i.start,e:i.end,w:i.tokens.map(r=>r.start)}))})})}function ai(t){if(t==null||!Number.isFinite(t))return"\u2013:\u2013\u2013.\u2013\u2013\u2013";let e=Math.max(0,t),i=Math.floor(e/6e4),r=Math.floor(e%6e4/1e3),n=Math.floor(e%1e3);return`${i}:${String(r).padStart(2,"0")}.${String(n).padStart(3,"0")}`}function li(t){let e=Math.max(0,Math.floor(t/1e3));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Qu(t,e){let i=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(i),n=document.createElement("a");n.href=r,n.download=t,n.click(),setTimeout(()=>URL.revokeObjectURL(r),2e3)}var ci=null;function ie(t){let e=document.getElementById(Lr);if(e?.classList.contains("visible")){ep(e,t);return}let i=Spicetify;typeof i?.showNotification=="function"?i.showNotification(t):console.log("[Liquid Lyrics]",t)}function ep(t,e){let i=t.querySelector(".ll-editor-toast");i||(i=T("div","ll-editor-toast"),t.appendChild(i)),i.textContent=e,i.classList.remove("visible"),i.offsetWidth,i.classList.add("visible"),ci&&clearTimeout(ci),ci=setTimeout(()=>{i?.classList.remove("visible"),ci=null},3400)}var Xs="ll-ui-idle",tp="ll-ui-idle-cursor",ip=["pointermove","pointerdown","wheel","keydown","touchstart"],pi=null,hi=()=>!1,St=0,Js=!1;function Zs(t,e){if(pi=t,hi=e,!Js){Js=!0;for(let i of ip)window.addEventListener(i,rp,{capture:!0,passive:!0});window.addEventListener(te,()=>Oe())}Oe()}function Oe(){pi&&(Mr(),ui(!1),!(!C().autoHideUi||!hi())&&Qs())}function rp(){let t=pi;if(t){if(!C().autoHideUi||!hi()){t.classList.contains(Xs)&&ui(!1),Mr();return}ui(!1),Qs()}}function Qs(){let{autoHideDelay:t}=C();Mr(),St=window.setTimeout(()=>{St=0,!(!C().autoHideUi||!hi())&&ui(!0)},Math.max(1,t)*1e3)}function Mr(){St&&(window.clearTimeout(St),St=0)}function ui(t){let e=pi;e&&(e.classList.toggle(Xs,t),e.classList.toggle(tp,t&&C().autoHideCursor))}var He="liquid-lyrics-settings-overlay",np=500,ca="liquid-lyrics:settings-menu",da='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/></svg>',op='<svg role="img" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="butt" stroke-linejoin="miter"><path vector-effect="non-scaling-stroke" d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path vector-effect="non-scaling-stroke" d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>',sp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.6v4.8h4.8"/><path d="M4.6 10.4a7.6 7.6 0 1 1 .7 6"/></svg>',ap='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19"/><path d="M19 5 5 19"/></svg>',lp='<svg class="ll-settings-filters" aria-hidden="true" focusable="false"><defs><filter id="liquid-lyrics-toggle-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -10" result="goo"/><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs></svg>',cp=3,dp=160,ea=320,bi=[],Lt=!1,Cr=[],fi=null,_r=0;function up(){return!!document.getElementById(He)&&!Lt}function ua(){up()?Le():pa()}function pa(){document.getElementById(He)?.remove(),bi=[],Lt=!1,_r++;let t=document.createElement("div");t.id=He,t.className="ll-settings-overlay",t.addEventListener("pointerdown",i=>{i.target===t&&Le()}),t.insertAdjacentHTML("beforeend",lp),t.appendChild(pp()),Rr().appendChild(t),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("visible"))),se();let e=t.querySelector(".ll-settings-body");e&&(fi=new rt(e,!0),fi.sync()),document.addEventListener("keydown",ha,!0),window.dispatchEvent(new Event(ca))}function Le(){let t=document.getElementById(He);if(!t||Lt)return;Lt=!0,document.removeEventListener("keydown",ha,!0),ot(),mi(),ne(),fi?.destroy(),fi=null;for(let s of Cr)s.remove();Cr=[],t.classList.remove("visible"),t.classList.add("closing");let e=t.querySelector(".ll-settings-panel"),i=_r,r=!1,n=0,o=s=>{s&&(s.target!==e||s.propertyName!=="transform")||r||(r=!0,window.clearTimeout(n),e?.removeEventListener("transitionend",o),t.remove(),i===_r&&(bi=[],Lt=!1,window.dispatchEvent(new Event(ca))))};e?.addEventListener("transitionend",o),n=window.setTimeout(o,np)}function ha(t){if(t.key==="Escape"){if(t.preventDefault(),t.stopPropagation(),Tt){ot();return}Le()}}function Rr(){let t=document.fullscreenElement;return t instanceof HTMLElement?t:document.body}function pp(){let t=document.createElement("div");t.className="ll-settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Liquid Lyrics Settings");let e=[mp(),bp(),Sp(),wp(),xp(),yp(),vp(),kp()],i=document.createElement("div");return i.className="ll-settings-body",i.append(...e.map(Tp),Lp()),t.append(hp(),fp(e,i),i),se(),t}function hp(){let t=document.createElement("div");t.className="ll-settings-header";let e=document.createElement("h3");e.className="ll-settings-title",e.textContent="Liquid Lyrics Settings";let i=document.createElement("button");i.type="button",i.className="ll-settings-surface ll-settings-header-btn ll-settings-close-btn",i.setAttribute("aria-label","Close"),i.innerHTML=ap,i.addEventListener("click",Le),P(i,"Close");let r=document.createElement("div");return r.className="ll-settings-header-actions",r.appendChild(i),t.append(e,r),t}function fp(t,e){let i=document.createElement("div");i.className="ll-settings-search-island";let r=document.createElement("input");r.type="text",r.className="ll-settings-surface ll-settings-search-input",r.placeholder="Search settings...",r.spellcheck=!1,r.addEventListener("input",()=>gp(e,r.value));let n=document.createElement("div");n.className="ll-settings-section-nav-wrap";let o=document.createElement("div");o.className="ll-settings-section-nav";for(let u of t){let p=document.createElement("button");p.type="button",p.className="ll-settings-surface ll-settings-section-nav-btn",p.textContent=u.title,p.addEventListener("click",()=>{document.getElementById(ga(u.id))?.scrollIntoView({behavior:"smooth",block:"start"})}),o.appendChild(p)}n.append(o),i.append(r,n);let s=ta("isLeft","Scroll sections left",()=>ia(o,-1)),a=ta("isRight","Scroll sections right",()=>ia(o,1));Cr=[s,a];let l=()=>{let u=document.getElementById(He);if(!u||!o.isConnected)return;s.parentElement!==u&&u.append(s,a);let p=o.getBoundingClientRect(),h=Math.max(0,o.scrollWidth-o.clientWidth),g=Math.round(p.top+10);s.style.top=`${g}px`,s.style.left=`${Math.round(p.left+12)}px`,a.style.top=`${g}px`,a.style.left=`${Math.round(p.right-42)}px`,s.classList.toggle("is-visible",o.scrollLeft>1),a.classList.toggle("is-visible",o.scrollLeft<h-1)};o.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l);let c=performance.now(),d=()=>{l(),performance.now()-c<650&&document.getElementById(He)&&requestAnimationFrame(d)};return requestAnimationFrame(d),i}function ta(t,e,i){let r=document.createElement("button");return r.type="button",r.className=`ll-settings-surface ll-settings-section-nav-scroll-btn ${t}`,r.setAttribute("aria-label",e),r.innerHTML=t==="isLeft"?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',r.addEventListener("click",i),r}function ia(t,e){t.scrollBy({left:e*Math.max(120,t.clientWidth*.72),behavior:"smooth"})}function gp(t,e){let i=e.trim().toLowerCase();t.querySelectorAll(".ll-settings-section").forEach(r=>{let n=(r.querySelector(".ll-settings-section-title")?.textContent||"").toLowerCase(),o=i!==""&&n.includes(i),s=!1;r.querySelectorAll(".ll-settings-row").forEach(a=>{if(a.classList.contains("is-hidden")){a.style.display="";return}let l=(a.querySelector(".ll-settings-label")?.textContent||"").toLowerCase(),c=i===""||o||l.includes(i);a.style.display=c?"":"none",c&&(s=!0)}),r.querySelectorAll(".ll-settings-subsection").forEach(a=>{let l=Array.from(a.querySelectorAll(".ll-settings-row")).some(c=>c.style.display!=="none"&&!c.classList.contains("is-hidden"));a.style.display=l?"":"none"}),r.style.display=i===""||o||s?"":"none"})}function mp(){return{id:"buttons",title:"Buttons",groups:[{title:"Now playing bar",rows:[Fe("Spotify's lyrics button","Two lyrics buttons side by side get crowded. Hide Spotify's own one, or let it open Liquid Lyrics instead of Spotify's lyrics view.",[{value:"keep",label:"Leave it alone"},{value:"hide",label:"Hide it"},{value:"override",label:"Open Liquid Lyrics"}],()=>C().spotifyLyricsButton,t=>$("spotifyLyricsButton",t)),B("Liquid Lyrics button","The microphone button next to Spotify's player controls.","showOwnButton")]}]}}function bp(){return{id:"interface",title:"Interface",groups:[{title:"Header",rows:[B("Show the wordmark",`The "Liquid Lyrics" lettering in the panel's top left corner.`,"showTitle"),B("Show GitHub & Discord","The two link buttons in the panel's top right corner. The settings gear stays either way.","showHeaderLinks")]}]}}function yp(){return{id:"page",title:"Panel",groups:[{title:"Elements",rows:[B("Show credits","Writers, and where the sync came from, below the last line.","pageShowCredits"),B("Hide the scrollbar","The thin scrollbar alongside the lyrics.","pageHideScrollbar")]},{title:"Controls",rows:[B("Show the control pill","The floating row of view controls.","pageShowControls"),Fe("Control pill position","Which edge the floating controls sit against.",fa,()=>C().pageControlPosition,t=>$("pageControlPosition",t),()=>C().pageShowControls)]}]}}function vp(){let t=()=>C().autoHideUi;return{id:"fullscreen",title:"Fullscreen",groups:[{title:"Auto-hide",rows:[B("Fade the interface out","In cinema and fullscreen mode the header, control pill and scrollbar fade away while the mouse rests, and fade back in on the next move.","autoHideUi"),H("Fade out after (seconds)","Seconds of stillness before the interface disappears.","autoHideDelay",t),B("Hide the cursor too","Takes the mouse pointer with it.","autoHideCursor",t)]},{title:"Elements",rows:[B("Show credits","Writers, and where the sync came from, below the last line.","fsShowCredits"),B("Hide the scrollbar","The thin scrollbar alongside the lyrics.","fsHideScrollbar")]},{title:"Controls",rows:[B("Show the control pill","The floating row of view controls.","fsShowControls"),Fe("Control pill position","Which edge the floating controls sit against.",fa,()=>C().fsControlPosition,e=>$("fsControlPosition",e),()=>C().fsShowControls)]}]}}var fa=[{value:"bottom",label:"Bottom"},{value:"top",label:"Top"},{value:"left",label:"Left"},{value:"right",label:"Right"}];function wp(){let t=()=>C().bgMode,e=()=>t()!=="color"&&t()!=="transparent",i=()=>e()&&C().bgSource==="url",r=()=>e()&&C().bgSource==="upload",n=()=>t()==="animated"||t()==="kawarp",o=()=>t()==="kawarp";return{id:"background",title:"Background",groups:[{title:"Source",rows:[Fe("Background mode","Transparent lets your theme through, colour is a plain colour, image a picture of your choice. Animated is a simple drifting effect made from the cover art; Kawarp looks a lot better but needs more from your graphics card.",[{value:"transparent",label:"Transparent"},{value:"color",label:"Color"},{value:"image",label:"Image"},{value:"animated",label:"Animated"},{value:"kawarp",label:"Kawarp"}],()=>C().bgMode,s=>gr(s)),Y(Cp("Background color","Used by the colour mode.","bgColor"),()=>t()==="color"),Y(Fe("Picture source","Where the picture comes from.",[{value:"albumArt",label:"Album art"},{value:"url",label:"URL"},{value:"upload",label:"Local file"}],()=>C().bgSource,s=>$("bgSource",s)),e),Y(Mp("Image URL","A direct link to an image file.","bgUrl","https://..."),i),Y(Ap("Local image","Downscaled and stored in Spotify's local storage."),r)]},{title:"Appearance",rows:[Y(H("Blur (px)","Blur radius. In transparent mode it frosts whatever sits behind the panel; Kawarp maps it onto its blur passes.","bgBlur"),()=>t()!=="color"),Y(H("Scale (%)","Zoom level of the background picture.","bgScale"),e),Y(H("Opacity (%)","How opaque the whole background layer is.","bgOpacity"),e),Y(H("Brightness (%)","How bright the background sits behind the lyrics.","bgBrightness"),e),Y(H("Contrast (%)","Contrast of the background picture.","bgContrast"),e),Y(H("Saturation (%)","Colour intensity.","bgSaturation"),e)]},{title:"Motion",rows:[Y(H("Warp intensity (%)","How hard Kawarp distorts the picture.","bgWarpIntensity"),o),Y(H("Motion speed (%)","Rotation speed of the blobs, or Kawarp's animation speed.","bgRotationSpeed"),n)]}]}}function xp(){return{id:"songcard",title:"Song card",groups:[{title:"Appearance",rows:[Fe("Card style","Default keeps the card on your theme's liquid glass surface. Cover leads with the artwork instead: the playback controls fade in over it on hover, and the track details sit as plain text underneath.",[{value:"default",label:"Default"},{value:"cover",label:"Cover"}],()=>C().cardStyle,t=>$("cardStyle",t)),Y(H("Cover border radius (px)","Rounding of the artwork in the cover style.","cardCoverRadius"),()=>C().cardStyle==="cover"),Fe("Card side","Which side of the lyrics the card sits on. Also switchable from the control pill.",[{value:"left",label:"Left"},{value:"right",label:"Right"}],()=>C().cardSide,t=>$("cardSide",t)),B("Center text","Aligns the track details to the centre.","cardCenterText")]},{title:"Track details",rows:[B("Hide title","Hides the track title.","cardHideTitle"),B("Hide artist","Hides the artist name.","cardHideArtist"),B("Hide album","Hides the album name.","cardHideAlbum")]}]}}function kp(){return{id:"npv",title:"Now Playing View",groups:[{title:"Background",rows:[B("Show the background","Paints your chosen background behind Spotify's whole right sidebar - behind the cover art, the song info, the queue and the lyrics card - instead of leaving it on your theme's own backdrop.","npvBackground")]},{title:"Sidebar Lyrics Card",rows:[B("Show the card","The Liquid Lyrics card inside Spotify's Now Playing View.","npvShowCard"),H("Card height (vh)","Height of the lyrics card, as a share of the window.","npvCardHeight",()=>C().npvShowCard),H("Card minimum height (px)","The card never shrinks below this.","npvCardMinHeight",()=>C().npvShowCard)]}]}}function Sp(){return{id:"lyrics",title:"Lyrics",groups:[{title:"Text",rows:[H("Font size (%)","Scales every lyric line. 100% is the built-in size.","fontScale")]},{title:"Display",rows:[B("Simple lyrics mode","Drops the extra motion: word-by-word lines only fill left to right instead of also rising, and block lines arrive already filled rather than wiping top to bottom.","simpleLyrics"),B("Minimal lyrics mode","Keeps the karaoke fill travelling letter by letter, but stops each letter lifting as it is sung.","minimalLyrics",()=>!C().simpleLyrics)]},{title:"Fade areas",rows:[H("Fade area above (%)","How far the lyrics fade out towards the top edge.","fadeTop"),H("Fade area below (%)","How far the lyrics fade out towards the bottom edge.","fadeBottom")]},{title:"Scrolling",rows:[B("Smooth scrolling","Eases the lyrics along instead of jumping line to line, and smooths the wheel.","smoothScroll"),H("Scroll easing (tenths of a second)","How long the glide to the next line takes.","smoothScrollDuration",()=>C().smoothScroll)]}]}}function Lp(){let t=document.createElement("div");t.className="ll-settings-footer";let e=document.createElement("button");return e.type="button",e.className="ll-settings-surface ll-settings-reset-btn",e.innerHTML=`${sp}<span>Reset to defaults</span>`,e.addEventListener("click",()=>{Ss(),se()}),t.appendChild(e),t}function ga(t){return`liquid-lyrics-sec-${t}`}function Tp(t){let e=document.createElement("div");e.className="ll-settings-section",e.id=ga(t.id);let i=document.createElement("div");i.className="ll-settings-section-title",i.textContent=t.title;let r=document.createElement("div");return r.className="ll-settings-section-body",r.append(...t.groups.map(Ep)),e.append(i,r),e}function Ep(t){let e=document.createElement("div");e.className="ll-settings-subsection";let i=document.createElement("div");return i.className="ll-settings-subsection-title",i.textContent=t.title,e.append(i,...t.rows),e}function Y(t,e){return De(()=>t.classList.toggle("is-hidden",!e())),t}function st(t,e){let i=document.createElement("div");i.className="ll-settings-row";let r=document.createElement("div");r.className="ll-settings-label";let n=document.createElement("span");if(n.className="ll-settings-label-text",n.textContent=t,r.appendChild(n),e){let s=document.createElement("span");s.className="ll-settings-hint",s.textContent=e,r.appendChild(s)}let o=document.createElement("div");return o.className="ll-settings-row-controls",i.append(r,o),{row:i,controls:o}}function B(t,e,i,r=()=>!0){let{row:n,controls:o}=st(t,e),s=Rp(()=>C()[i],a=>{$(i,a),se()});return o.appendChild(s.el),De(()=>{let a=r();n.classList.toggle("is-disabled",!a),s.el.disabled=!a,s.sync()}),n}function H(t,e,i,r=()=>!0){let{row:n,controls:o}=st(t,e),s=qp(fr[i],()=>C()[i],a=>{$(i,a),se()});return o.appendChild(s.el),De(()=>{let a=r();n.classList.toggle("is-disabled",!a),s.setEnabled(a),s.sync()}),n}function Fe(t,e,i,r,n,o=()=>!0){let{row:s,controls:a}=st(t,e),l=Ip(i,r,c=>{n(c),se()});return a.appendChild(l.el),De(()=>{let c=o();s.classList.toggle("is-disabled",!c),l.el.disabled=!c,l.sync()}),s}function Mp(t,e,i,r,n=()=>!0){let{row:o,controls:s}=st(t,e),a=document.createElement("input");return a.type="text",a.className="ll-settings-surface ll-settings-text-input",a.placeholder=r,a.spellcheck=!1,a.addEventListener("blur",()=>{$(i,a.value.trim()),se()}),a.addEventListener("keydown",l=>{l.key==="Enter"&&a.blur()}),s.appendChild(a),De(()=>{let l=n();o.classList.toggle("is-disabled",!l),a.disabled=!l,document.activeElement!==a&&(a.value=String(C()[i]))}),o}function Cp(t,e,i,r=()=>!0){let{row:n,controls:o}=st(t,e),s=document.createElement("button");s.type="button",s.className="ll-settings-surface ll-settings-color";let a=document.createElement("span");a.className="ll-settings-color-swatch";let l=document.createElement("span");return l.className="ll-settings-color-value",s.append(a,l),s.addEventListener("click",c=>{if(c.stopPropagation(),gi?.anchor===s){mi();return}_p(s,()=>String(C()[i]),d=>{$(i,d),se()})}),o.appendChild(s),De(()=>{let c=r();n.classList.toggle("is-disabled",!c),s.disabled=!c;let d=Ar(String(C()[i]));a.style.background=d,l.textContent=d.toUpperCase()}),n}var gi=null;function _p(t,e,i){mi();let r=document.createElement("div");r.className="ll-settings-popover ll-settings-color-picker";let n=document.createElement("div");n.className="ll-color-saturation";let o=document.createElement("div");o.className="ll-color-pointer",n.appendChild(o);let s=document.createElement("div");s.className="ll-color-hue";let a=document.createElement("div");a.className="ll-color-pointer ll-color-hue-pointer",s.appendChild(a);let l=document.createElement("div");l.className="ll-color-preview-row";let c=document.createElement("div");c.className="ll-color-preview";let d=document.createElement("input");d.type="text",d.className="ll-settings-surface ll-color-hex",d.spellcheck=!1,l.append(c,d),r.append(n,s,l),Rr().appendChild(r);let u=sa(na(Ar(e()))),p=()=>{let v=oa(aa(u));return n.style.background=`linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${oa(aa({h:u.h,s:1,v:1}))})`,o.style.left=`${u.s*100}%`,o.style.top=`${(1-u.v)*100}%`,a.style.left=`${u.h/360*100}%`,c.style.background=v,document.activeElement!==d&&(d.value=v.toUpperCase()),v},h=()=>i(p());ra(n,(v,L)=>{u={...u,s:v,v:1-L},h()}),ra(s,v=>{u={...u,h:v*360},h()}),d.addEventListener("blur",()=>{u=sa(na(Ar(d.value))),h()}),d.addEventListener("keydown",v=>{v.key==="Enter"&&d.blur()}),p();let g=t.getBoundingClientRect(),x=6,E=document.querySelector(".ll-settings-body")?.getBoundingClientRect(),f=r.offsetHeight,b=r.offsetWidth,w=(E?.top??0)+x,S=Math.max(w,(E?.bottom??window.innerHeight)-f-x),y=g.bottom+x+f<=(E?.bottom??window.innerHeight)?g.bottom+x:g.top-f-x;r.style.top=`${A(y,w,S)}px`,r.style.left=`${A(g.right-b,x,Math.max(x,window.innerWidth-b-x))}px`,requestAnimationFrame(()=>r.classList.add("visible"));let k=v=>{let L=v.target;L&&(r.contains(L)||t.contains(L))||(v.stopPropagation(),mi())};document.addEventListener("pointerdown",k,!0),gi={anchor:t,el:r,dispose:()=>{document.removeEventListener("pointerdown",k,!0),r.remove()}}}function mi(){gi?.dispose(),gi=null}function ra(t,e){let i=r=>{let n=t.getBoundingClientRect();e(A((r.clientX-n.left)/Math.max(1,n.width),0,1),A((r.clientY-n.top)/Math.max(1,n.height),0,1))};t.addEventListener("pointerdown",r=>{r.preventDefault(),t.setPointerCapture?.(r.pointerId),i(r);let n=s=>i(s),o=()=>{t.removeEventListener("pointermove",n),window.removeEventListener("pointerup",o)};t.addEventListener("pointermove",n),window.addEventListener("pointerup",o,{once:!0})})}function Ar(t){let e=t.trim(),i=e.startsWith("#")?e:`#${e}`;return/^#[0-9a-f]{3}$/i.test(i)?`#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}`.toLowerCase():/^#[0-9a-f]{6}$/i.test(i)?i.toLowerCase():"#101418"}function na(t){let e=parseInt(t.slice(1),16);return{r:e>>16&255,g:e>>8&255,b:e&255}}function oa({r:t,g:e,b:i}){let r=n=>Math.round(A(n,0,255)).toString(16).padStart(2,"0");return`#${r(t)}${r(e)}${r(i)}`}function sa({r:t,g:e,b:i}){let r=t/255,n=e/255,o=i/255,s=Math.max(r,n,o),a=Math.min(r,n,o),l=s-a,c=0;return l!==0&&(s===r?c=60*((n-o)/l%6):s===n?c=60*((o-r)/l+2):c=60*((r-n)/l+4)),c<0&&(c+=360),{h:c,s:s===0?0:l/s,v:s}}function aa({h:t,s:e,v:i}){let r=i*e,n=r*(1-Math.abs(t/60%2-1)),o=i-r,[s,a,l]=t<60?[r,n,0]:t<120?[n,r,0]:t<180?[0,r,n]:t<240?[0,n,r]:t<300?[n,0,r]:[r,0,n];return{r:(s+o)*255,g:(a+o)*255,b:(l+o)*255}}function Ap(t,e,i=()=>!0){let{row:r,controls:n}=st(t,e),o=document.createElement("input");o.type="file",o.accept="image/*",o.hidden=!0;let s=document.createElement("button");return s.type="button",s.className="ll-settings-surface ll-settings-action-btn",s.addEventListener("click",()=>o.click()),o.addEventListener("change",async()=>{let a=o.files?.[0];if(!a)return;s.textContent="Storing...";let l=await Es(a).catch(()=>!1);if(o.value="",!l){s.textContent="Too large \u2014 try a smaller image",window.setTimeout(se,2600);return}se()}),n.append(s,o),De(()=>{let a=i();r.classList.toggle("is-disabled",!a),s.disabled=!a,s.textContent=mr()?"Replace image":"Choose image"}),r}function Rp(t,e){let i=document.createElement("button");i.type="button",i.className="ll-toggle",i.setAttribute("data-active","false"),i.innerHTML='<span class="ll-toggle-indicator"></span><span class="ll-toggle-knockout"><span class="ll-toggle-indicator ll-toggle-indicator--masked"><span class="ll-toggle-mask"></span></span></span><span class="ll-toggle-wrapper"><span class="ll-toggle-liquids"><span class="ll-toggle-liquid-shadow"></span><span class="ll-toggle-liquid-track"></span></span></span><span class="ll-toggle-knob"><span class="ll-toggle-gloss"></span></span><span class="ll-toggle-rim"></span>';let r=!1,n=[],o=!1,s=!1,a=!1,l={x:0,complete:0},c=0,d=()=>{for(let E of n)window.clearTimeout(E);n=[]},u=(E,f)=>n.push(window.setTimeout(E,f)),p=E=>i.setAttribute("data-active",String(E)),h=E=>{c=E,i.style.setProperty("--complete",String(E))},g=()=>{r||(r=!0,p(!0),u(()=>{e(!t()),u(()=>{p(!1),r=!1},ea)},dp))};i.addEventListener("pointerdown",E=>{if(E.button===0&&!r){d(),o=!0,s=!1,a=!1,l={x:E.clientX,complete:t()?100:0},c=l.complete;try{i.setPointerCapture?.(E.pointerId)}catch{}p(!0)}}),i.addEventListener("pointermove",E=>{if(!o)return;let f=E.clientX-l.x;if(!s&&Math.abs(f)<cp)return;s||(s=!0,i.setAttribute("data-dragging","true"));let b=i.getBoundingClientRect().width*.4||1;h(A(l.complete+f/b*100,0,100))}),i.addEventListener("pointerup",E=>{if(!o)return;o=!1;try{i.releasePointerCapture?.(E.pointerId)}catch{}if(!s)return;s=!1,a=!0,i.removeAttribute("data-dragging"),p(!1);let f=c>=50?100:0;h(f),e(f===100),u(()=>i.style.removeProperty("--complete"),ea)}),i.addEventListener("pointercancel",()=>{o=!1,s=!1,i.removeAttribute("data-dragging"),i.style.removeProperty("--complete"),p(!1)}),i.addEventListener("click",()=>{if(a){a=!1;return}g()});let x=()=>i.setAttribute("aria-pressed",String(t()));return x(),{el:i,sync:x}}function qp(t,e,i){let r=document.createElement("div");r.className="ll-settings-inline";let n=la("-","Decrease"),o=la("+","Increase"),s=document.createElement("input");s.type="text",s.inputMode="numeric",s.className="ll-settings-surface ll-settings-number-input",r.append(n,s,o);let a=d=>i(A(Math.round(d),t.min,t.max));n.addEventListener("click",()=>a(e()-t.step)),o.addEventListener("click",()=>a(e()+t.step)),s.addEventListener("blur",()=>{let d=parseInt(s.value,10);Number.isFinite(d)?a(d):l()}),s.addEventListener("keydown",d=>{d.key==="Enter"?s.blur():d.key==="ArrowUp"?(d.preventDefault(),a(e()+t.step)):d.key==="ArrowDown"&&(d.preventDefault(),a(e()-t.step))});let l=()=>{let d=e();document.activeElement!==s&&(s.value=String(d)),n.disabled=n.dataset.forcedDisabled==="true"||d<=t.min,o.disabled=o.dataset.forcedDisabled==="true"||d>=t.max},c=d=>{s.disabled=!d,n.dataset.forcedDisabled=String(!d),o.dataset.forcedDisabled=String(!d)};return l(),{el:r,sync:l,setEnabled:c}}function la(t,e){let i=document.createElement("button");return i.type="button",i.className="ll-settings-surface ll-settings-stepper-btn",i.textContent=t,i.setAttribute("aria-label",e),i}var Tt=null;function Ip(t,e,i){let r=document.createElement("button");r.type="button",r.className="ll-settings-surface ll-settings-select",r.innerHTML='<span class="ll-settings-select-label"></span><span class="ll-settings-select-chevron"></span>';let n=r.querySelector(".ll-settings-select-label"),o=()=>{let s=e();n.textContent=t.find(a=>a.value===s)?.label??String(s)};return r.addEventListener("click",s=>{if(s.stopPropagation(),Tt?.button===r){ot();return}Pp(r,t,e(),a=>{i(a),o()})}),o(),{el:r,sync:o}}function Pp(t,e,i,r){ot();let n=document.createElement("div");n.className="ll-settings-select-menu";for(let g of e){let x=document.createElement("div");x.className="ll-settings-select-item",x.setAttribute("role","option"),x.textContent=g.label,x.classList.toggle("is-selected",g.value===i),x.addEventListener("click",E=>{E.stopPropagation(),ot(),r(g.value)}),n.appendChild(x)}Rr().appendChild(n),t.classList.add("isOpen");let o=t.getBoundingClientRect(),s=6;n.style.minWidth=`${o.width}px`;let a=n.offsetWidth,l=n.offsetHeight,c=document.querySelector(".ll-settings-body")?.getBoundingClientRect(),d=(c?.top??0)+s,u=Math.max(d,(c?.bottom??window.innerHeight)-l-s),p=o.bottom+s+l<=(c?.bottom??window.innerHeight)?o.bottom+s:o.top-l-s;n.style.top=`${A(p,d,u)}px`,n.style.left=`${A(o.right-a,s,Math.max(s,window.innerWidth-a-s))}px`,requestAnimationFrame(()=>n.classList.add("visible"));let h=g=>{let x=g.target;x&&(n.contains(x)||t.contains(x))||(g.stopPropagation(),ot())};document.addEventListener("pointerdown",h,!0),Tt={button:t,menu:n,dispose:()=>{document.removeEventListener("pointerdown",h,!0),t.classList.remove("isOpen"),n.remove()}}}function ot(){Tt?.dispose(),Tt=null}function ma(){try{let t=Spicetify?.Menu;if(typeof t?.Item!="function")return;new t.Item("Liquid Lyrics Settings",!1,()=>pa(),op).register()}catch{}}function De(t){bi.push(t),t()}function se(){for(let t of bi)t();Np()}function Np(){document.querySelectorAll(`#${He} .ll-settings-subsection`).forEach(t=>{let e=Array.from(t.querySelectorAll(".ll-settings-row")).some(i=>!i.classList.contains("is-hidden")&&i.style.display!=="none");t.style.display=e?"":"none"})}var Et=`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,zp=`
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_offset;
  varying vec2 v_texCoord;

  void main() {
    highp vec2 texelSize = 1.0 / u_resolution;
    highp vec4 color = vec4(0.0);

    color += texture2D(u_texture, v_texCoord + vec2(-u_offset, -u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(u_offset, -u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(-u_offset, u_offset) * texelSize);
    color += texture2D(u_texture, v_texCoord + vec2(u_offset, u_offset) * texelSize);

    gl_FragColor = color * 0.25;
  }
`,Bp=`
  precision highp float;
  uniform sampler2D u_texture1;
  uniform sampler2D u_texture2;
  uniform float u_blend;
  varying vec2 v_texCoord;

  void main() {
    vec4 color1 = texture2D(u_texture1, v_texCoord);
    vec4 color2 = texture2D(u_texture2, v_texCoord);
    gl_FragColor = mix(color1, color2, u_blend);
  }
`,Op=`
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec3 u_tintColor;
  uniform float u_tintIntensity;
  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_texture, v_texCoord);
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // darkMask: 1.0 for black, 0.0 for luma >= 0.5
    float darkMask = 1.0 - smoothstep(0.0, 0.5, luma);

    // Blend dark areas toward tint color
    color.rgb = mix(color.rgb, u_tintColor, darkMask * u_tintIntensity);

    gl_FragColor = color;
  }
`,Hp=`
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform float u_intensity;
  varying vec2 v_texCoord;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = v_texCoord;
    float t = u_time * 0.05;

    vec2 center = uv - 0.5;
    float centerWeight = 1.0 - smoothstep(0.0, 0.7, length(center));

    // Large-scale movement (slow, big blobs)
    float n1 = snoise(uv * 0.35 + vec2(t, t * 0.7));
    float n2 = snoise(uv * 0.35 + vec2(-t * 0.8, t * 0.5) + vec2(50.0, 50.0));

    // Medium-scale detail (adds organic movement)
    float n3 = snoise(uv * 0.9 + vec2(t * 1.2, -t) + vec2(100.0, 0.0));
    float n4 = snoise(uv * 0.9 + vec2(-t, t * 1.1) + vec2(0.0, 100.0));

    // Combine two octaves
    vec2 warp = vec2(
      n1 * 0.65 + n3 * 0.35,
      n2 * 0.65 + n4 * 0.35
    ) * centerWeight;

    vec2 warpedUV = uv + warp * u_intensity;
    warpedUV = clamp(warpedUV, 0.0, 1.0);

    gl_FragColor = texture2D(u_texture, warpedUV);
  }
`,Fp=`
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_saturation;
  uniform float u_dithering;
  uniform float u_time;
  uniform float u_scale;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;

  highp float hash(highp vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    vec2 uv = (v_texCoord - 0.5) / u_scale + 0.5;
    uv = clamp(uv, 0.0, 1.0);

    vec4 color = texture2D(u_texture, uv);

    vec2 center = v_texCoord - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.3;
    color.rgb *= vignette;

    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(gray), color.rgb, u_saturation);

    highp vec2 pixelPos = floor(v_texCoord * u_resolution);
    highp float noise = hash(vec3(pixelPos, floor(u_time * 60.0)));
    color.rgb += (noise - 0.5) * u_dithering;

    gl_FragColor = color;
  }
`,yi=class{constructor(e,i={}){m(this,"canvas");m(this,"gl");m(this,"halfFloatExt",null);m(this,"halfFloatLinearExt",null);m(this,"blurProgram");m(this,"blendProgram");m(this,"tintProgram");m(this,"warpProgram");m(this,"outputProgram");m(this,"positionBuffer");m(this,"texCoordBuffer");m(this,"sourceTexture");m(this,"blurFBO1");m(this,"blurFBO2");m(this,"currentAlbumFBO");m(this,"nextAlbumFBO");m(this,"warpFBO");m(this,"animationId",null);m(this,"lastFrameTime",0);m(this,"accumulatedTime",0);m(this,"isPlaying",!1);m(this,"isTransitioning",!1);m(this,"transitionStartTime",0);m(this,"_transitionDuration");m(this,"_warpIntensity");m(this,"_blurPasses");m(this,"_animationSpeed");m(this,"_targetAnimationSpeed");m(this,"_saturation");m(this,"_tintColor");m(this,"_tintIntensity");m(this,"_dithering");m(this,"_scale");m(this,"hasImage",!1);m(this,"attribs");m(this,"uniforms");m(this,"renderLoop",e=>{if(!this.isPlaying)return;let i=(e-this.lastFrameTime)/1e3;this.lastFrameTime=e,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*.05,this.accumulatedTime+=i*this._animationSpeed,this.render(this.accumulatedTime,e),this.animationId=requestAnimationFrame(this.renderLoop)});this.canvas=e;let r=e.getContext("webgl",{preserveDrawingBuffer:!0});if(!r)throw new Error("WebGL not supported");this.gl=r,this.halfFloatExt=r.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=r.getExtension("OES_texture_half_float_linear"),this._warpIntensity=i.warpIntensity??1,this._blurPasses=i.blurPasses??8,this._animationSpeed=i.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=i.transitionDuration??1e3,this._saturation=i.saturation??1.5,this._tintColor=i.tintColor??[.157,.157,.235],this._tintIntensity=i.tintIntensity??.15,this._dithering=i.dithering??.008,this._scale=i.scale??1,this.blurProgram=this.createProgram(Et,zp),this.blendProgram=this.createProgram(Et,Bp),this.tintProgram=this.createProgram(Et,Op),this.warpProgram=this.createProgram(Et,Hp),this.outputProgram=this.createProgram(Et,Fp),this.attribs={position:r.getAttribLocation(this.blurProgram,"a_position"),texCoord:r.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:r.getUniformLocation(this.blurProgram,"u_resolution"),texture:r.getUniformLocation(this.blurProgram,"u_texture"),offset:r.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:r.getUniformLocation(this.blendProgram,"u_texture1"),texture2:r.getUniformLocation(this.blendProgram,"u_texture2"),blend:r.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:r.getUniformLocation(this.warpProgram,"u_texture"),time:r.getUniformLocation(this.warpProgram,"u_time"),intensity:r.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:r.getUniformLocation(this.tintProgram,"u_texture"),tintColor:r.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:r.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:r.getUniformLocation(this.outputProgram,"u_texture"),saturation:r.getUniformLocation(this.outputProgram,"u_saturation"),dithering:r.getUniformLocation(this.outputProgram,"u_dithering"),time:r.getUniformLocation(this.outputProgram,"u_time"),scale:r.getUniformLocation(this.outputProgram,"u_scale"),resolution:r.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(e){this._warpIntensity=Math.max(0,Math.min(1,e))}get blurPasses(){return this._blurPasses}set blurPasses(e){let i=Math.max(1,Math.min(40,Math.floor(e)));i!==this._blurPasses&&(this._blurPasses=i,this.hasImage&&this.reblurCurrentImage())}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(e){this._targetAnimationSpeed=Math.max(.1,Math.min(5,e))}get transitionDuration(){return this._transitionDuration}set transitionDuration(e){this._transitionDuration=Math.max(0,Math.min(5e3,e))}get saturation(){return this._saturation}set saturation(e){this._saturation=Math.max(0,Math.min(3,e))}get tintColor(){return this._tintColor}set tintColor(e){let i=e.map(n=>Math.max(0,Math.min(1,n)));i.some((n,o)=>n!==this._tintColor[o])&&(this._tintColor=i,this.hasImage&&this.reblurCurrentImage())}get tintIntensity(){return this._tintIntensity}set tintIntensity(e){let i=Math.max(0,Math.min(1,e));i!==this._tintIntensity&&(this._tintIntensity=i,this.hasImage&&this.reblurCurrentImage())}get dithering(){return this._dithering}set dithering(e){this._dithering=Math.max(0,Math.min(.1,e))}get scale(){return this._scale}set scale(e){this._scale=Math.max(.01,Math.min(4,e))}setOptions(e){e.warpIntensity!==void 0&&(this.warpIntensity=e.warpIntensity),e.blurPasses!==void 0&&(this.blurPasses=e.blurPasses),e.animationSpeed!==void 0&&(this.animationSpeed=e.animationSpeed),e.transitionDuration!==void 0&&(this.transitionDuration=e.transitionDuration),e.saturation!==void 0&&(this.saturation=e.saturation),e.tintColor!==void 0&&(this.tintColor=e.tintColor),e.tintIntensity!==void 0&&(this.tintIntensity=e.tintIntensity),e.dithering!==void 0&&(this.dithering=e.dithering),e.scale!==void 0&&(this.scale=e.scale)}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(e){return new Promise((i,r)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,n),this.processNewImage(),i()},n.onerror=()=>r(new Error(`Failed to load image: ${e}`)),n.src=e})}loadImageElement(e){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),this.processNewImage()}loadImageData(e,i,r){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,i,r,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e instanceof Uint8ClampedArray?new Uint8Array(e.buffer):e),this.processNewImage()}loadFromImageData(e){this.loadImageData(e.data,e.width,e.height)}async loadBlob(e){let i=await createImageBitmap(e);this.loadImageElement(i),i.close()}loadBase64(e){let i=e.startsWith("data:")?e:`data:image/png;base64,${e}`;return this.loadImage(i)}async loadArrayBuffer(e,i="image/png"){let r=new Blob([e],{type:i});return this.loadBlob(r)}loadGradient(e,i=135){let n=document.createElement("canvas");n.width=512,n.height=512;let o=n.getContext("2d");if(!o)return;let s=i*Math.PI/180,a=512/2-Math.cos(s)*512,l=512/2-Math.sin(s)*512,c=512/2+Math.cos(s)*512,d=512/2+Math.sin(s)*512,u=o.createLinearGradient(a,l,c,d);e.forEach((p,h)=>{u.addColorStop(h/(e.length-1),p)}),o.fillStyle=u,o.fillRect(0,0,512,512),this.loadImageElement(n)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(e){let i=this.gl;i.useProgram(this.tintProgram),this.setupAttributes(),i.bindFramebuffer(i.FRAMEBUFFER,this.blurFBO1.framebuffer),i.viewport(0,0,128,128),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,this.sourceTexture),i.uniform1i(this.uniforms.tint.texture,0),i.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),i.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),i.drawArrays(i.TRIANGLES,0,6),i.useProgram(this.blurProgram),this.setupAttributes(),i.uniform2f(this.uniforms.blur.resolution,128,128),i.uniform1i(this.uniforms.blur.texture,0);let r=this.blurFBO1,n=this.blurFBO2;for(let o=0;o<this._blurPasses;o++)i.bindFramebuffer(i.FRAMEBUFFER,n.framebuffer),i.viewport(0,0,128,128),i.bindTexture(i.TEXTURE_2D,r.texture),i.uniform1f(this.uniforms.blur.offset,o+.5),i.drawArrays(i.TRIANGLES,0,6),[r,n]=[n,r];i.bindFramebuffer(i.FRAMEBUFFER,e.framebuffer),i.viewport(0,0,128,128),i.bindTexture(i.TEXTURE_2D,r.texture),i.uniform1f(this.uniforms.blur.offset,0),i.drawArrays(i.TRIANGLES,0,6)}resize(){let e=this.canvas.width,i=this.canvas.height;this.warpFBO&&this.deleteFramebuffer(this.warpFBO),this.warpFBO=this.createFramebuffer(e,i,!0)}start(){this.isPlaying||(this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop))}stop(){this.isPlaying=!1,this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null)}renderFrame(e){let i=performance.now();if(e!==void 0)this.render(e,i);else{let r=(i-this.lastFrameTime)/1e3;this.lastFrameTime=i,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*.05,this.accumulatedTime+=r*this._animationSpeed,this.render(this.accumulatedTime,i)}}dispose(){this.stop();let e=this.gl;e.deleteProgram(this.blurProgram),e.deleteProgram(this.blendProgram),e.deleteProgram(this.tintProgram),e.deleteProgram(this.warpProgram),e.deleteProgram(this.outputProgram),e.deleteBuffer(this.positionBuffer),e.deleteBuffer(this.texCoordBuffer),e.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}render(e,i=performance.now()){let r=this.gl,n=this.canvas.width,o=this.canvas.height,s=1;if(this.isTransitioning){let l=i-this.transitionStartTime;s=Math.min(1,l/this._transitionDuration),s>=1&&(this.isTransitioning=!1)}let a;this.isTransitioning&&s<1?(r.useProgram(this.blendProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,this.blurFBO1.framebuffer),r.viewport(0,0,128,128),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.currentAlbumFBO.texture),r.uniform1i(this.uniforms.blend.texture1,0),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,this.nextAlbumFBO.texture),r.uniform1i(this.uniforms.blend.texture2,1),r.uniform1f(this.uniforms.blend.blend,s),r.drawArrays(r.TRIANGLES,0,6),a=this.blurFBO1.texture,r.useProgram(this.warpProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,this.warpFBO.framebuffer),r.viewport(0,0,n,o),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,a),r.uniform1i(this.uniforms.warp.texture,0),r.uniform1f(this.uniforms.warp.time,e),r.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),r.drawArrays(r.TRIANGLES,0,6),r.useProgram(this.outputProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,n,o),r.bindTexture(r.TEXTURE_2D,this.warpFBO.texture),r.uniform1i(this.uniforms.output.texture,0),r.uniform1f(this.uniforms.output.saturation,this._saturation),r.uniform1f(this.uniforms.output.dithering,this._dithering),r.uniform1f(this.uniforms.output.time,e),r.uniform1f(this.uniforms.output.scale,this._scale),r.uniform2f(this.uniforms.output.resolution,n,o),r.drawArrays(r.TRIANGLES,0,6)):(r.useProgram(this.warpProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,this.warpFBO.framebuffer),r.viewport(0,0,n,o),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.nextAlbumFBO.texture),r.uniform1i(this.uniforms.warp.texture,0),r.uniform1f(this.uniforms.warp.time,e),r.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),r.drawArrays(r.TRIANGLES,0,6),r.useProgram(this.outputProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,n,o),r.bindTexture(r.TEXTURE_2D,this.warpFBO.texture),r.uniform1i(this.uniforms.output.texture,0),r.uniform1f(this.uniforms.output.saturation,this._saturation),r.uniform1f(this.uniforms.output.dithering,this._dithering),r.uniform1f(this.uniforms.output.time,e),r.uniform1f(this.uniforms.output.scale,this._scale),r.uniform2f(this.uniforms.output.resolution,n,o),r.drawArrays(r.TRIANGLES,0,6))}setupAttributes(){let e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),e.enableVertexAttribArray(this.attribs.position),e.vertexAttribPointer(this.attribs.position,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,this.texCoordBuffer),e.enableVertexAttribArray(this.attribs.texCoord),e.vertexAttribPointer(this.attribs.texCoord,2,e.FLOAT,!1,0,0)}createShader(e,i){let r=this.gl,n=r.createShader(e);if(!n)throw new Error("Failed to create shader");if(r.shaderSource(n,i),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS)){let o=r.getShaderInfoLog(n);throw r.deleteShader(n),new Error(`Shader compile error: ${o}`)}return n}createProgram(e,i){let r=this.gl,n=this.createShader(r.VERTEX_SHADER,e),o=this.createShader(r.FRAGMENT_SHADER,i),s=r.createProgram();if(!s)throw new Error("Failed to create program");if(r.attachShader(s,n),r.attachShader(s,o),r.linkProgram(s),!r.getProgramParameter(s,r.LINK_STATUS)){let a=r.getProgramInfoLog(s);throw r.deleteProgram(s),new Error(`Program link error: ${a}`)}return r.deleteShader(n),r.deleteShader(o),s}createBuffer(e){let i=this.gl,r=i.createBuffer();if(!r)throw new Error("Failed to create buffer");return i.bindBuffer(i.ARRAY_BUFFER,r),i.bufferData(i.ARRAY_BUFFER,e,i.STATIC_DRAW),r}createTexture(){let e=this.gl,i=e.createTexture();if(!i)throw new Error("Failed to create texture");return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),i}createFramebuffer(e,i,r=!1){let n=this.gl,o=this.createTexture(),a=r&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:n.UNSIGNED_BYTE;n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e,i,0,n.RGBA,a,null);let l=n.createFramebuffer();if(!l)throw new Error("Failed to create framebuffer");return n.bindFramebuffer(n.FRAMEBUFFER,l),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),{framebuffer:l,texture:o}}deleteFramebuffer(e){this.gl.deleteFramebuffer(e.framebuffer),this.gl.deleteTexture(e.texture)}};var ba=600,Dp=600,ya=1600,Ue={canvasFilter:"brightness(62%) contrast(104%)",cssFilter:"blur(48px) saturate(150%) brightness(62%) contrast(104%)",warpIntensity:.5,blurPasses:6,animationSpeed:1,saturation:1.5,scale:1},je=class{constructor(e,i){this.variant=e;this.forcedMode=i;this.tiles=[];this.faces=[];this.imageLayer=null;this.kawarpLayers=[];this.useKawarpA=!0;this.kawarpSwapTimer=0;this.animatedSwapTimer=0;this.fadeOutTimer=0;this.nextCoverInstant=!1;this.instantSwap=!1;this.pendingReveal=!1;this.resizeObserver=null;this.coverUrl="";this.useSetA=!0;this.lastAnimatedUrl="";this.lastKawarpUrl="";this.mode="";this.enabled=!0;this.lastKawarpOptions="";this.kawarpToken=0;this.animatedToken=0;this.el=document.createElement("div"),this.el.className=`liquid-lyrics-bg ll-bg-${e}`,this.el.setAttribute("aria-hidden","true"),i&&(this.el.style.setProperty("--ll-bg-canvas-filter",Ue.canvasFilter),this.el.style.setProperty("--ll-bg-filter",Ue.cssFilter),this.el.style.setProperty("--ll-bg-opacity","1"),this.el.style.setProperty("--ll-bg-scale","1"),this.el.style.setProperty("--ll-bg-spin-duration","30000ms"))}get activeMode(){return this.forcedMode??C().bgMode}setCover(e,i=!1){if(!e)return;let r=i||this.nextCoverInstant;this.nextCoverInstant=!1,e!==this.coverUrl&&(this.coverUrl=e,this.instantSwap=r,r&&this.beginHiddenSwap(),this.render())}beginHiddenSwap(){this.pendingReveal=!0,this.suppressTransitions(),this.el.classList.remove("is-visible")}finishHiddenSwap(){this.pendingReveal&&(this.pendingReveal=!1,requestAnimationFrame(()=>this.el.classList.add("is-visible")))}markNextCoverInstant(){this.nextCoverInstant=!0}suppressTransitions(){this.el.classList.add("ll-bg-instant"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.el.classList.remove("ll-bg-instant")))}apply(){this.render()}setEnabled(e){if(this.enabled!==e&&(this.enabled=e,this.kawarpLayers.length!==0)){if(!e){for(let i of this.kawarpLayers)i.renderer.stop();return}for(let i of this.kawarpLayers)i.canvas.classList.contains("is-front")&&i.renderer.start()}}destroy(){window.clearTimeout(this.fadeOutTimer),window.clearTimeout(this.animatedSwapTimer),this.animatedToken++,this.teardownKawarp(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.el.remove()}render(){let e=this.activeMode;if(e!==this.mode){let i=this.mode;if(this.mode=e,window.clearTimeout(this.fadeOutTimer),e==="transparent"&&i!==""){this.el.classList.remove("is-visible"),this.pendingReveal=!1,this.fadeOutTimer=window.setTimeout(()=>{this.rebuild(e),this.el.dataset.mode=e,this.el.classList.add("is-visible")},Dp);return}this.rebuild(e)}switch(this.el.dataset.mode=e,this.pendingReveal||this.el.classList.add("is-visible"),e){case"transparent":case"color":this.finishHiddenSwap();break;case"image":this.renderImage(),this.finishHiddenSwap();break;case"animated":this.renderAnimated();break;case"kawarp":this.renderKawarp();break}}rebuild(e){if(window.clearTimeout(this.animatedSwapTimer),this.animatedToken++,this.teardownKawarp(),this.el.replaceChildren(),this.tiles=[],this.faces=[],this.imageLayer=null,this.lastAnimatedUrl="",this.lastKawarpUrl="",e==="image"){this.imageLayer=document.createElement("div"),this.imageLayer.className="ll-bg-image",this.el.appendChild(this.imageLayer);return}if(e==="animated"){for(let i=0;i<2;i++){let r=document.createElement("div");r.className="ll-bg-tile";for(let n=0;n<2;n++){let o=document.createElement("div");o.className="ll-bg-tile-face",r.appendChild(o),this.faces.push(o)}this.el.appendChild(r),this.tiles.push(r)}return}if(e==="kawarp")for(let i=0;i<2;i++){let r=document.createElement("canvas");r.className="ll-bg-canvas",this.el.appendChild(r)}}renderImage(){let e=ii(this.coverUrl,this.activeMode);this.imageLayer&&(this.imageLayer.style.backgroundImage=e?`url("${va(e)}")`:"")}renderAnimated(){let e=ii(this.coverUrl,this.activeMode);if(this.faces.length<4){this.finishHiddenSwap();return}if(!e){this.animatedToken++,window.clearTimeout(this.animatedSwapTimer);for(let r of this.faces)r.classList.remove("active","is-front");this.lastAnimatedUrl="",this.finishHiddenSwap();return}if(e===this.lastAnimatedUrl){this.finishHiddenSwap();return}this.lastAnimatedUrl=e;let i=this.instantSwap;this.instantSwap=!1,this.crossfadeAnimated(e,i)}async crossfadeAnimated(e,i){let r=++this.animatedToken;try{await Up(e)}catch{r===this.animatedToken&&(this.lastAnimatedUrl=""),this.finishHiddenSwap();return}if(r!==this.animatedToken||this.faces.length<4)return;let n=this.faces.filter((l,c)=>c%2===0),o=this.faces.filter((l,c)=>c%2===1),s=this.useSetA?n:o,a=this.useSetA?o:n;this.primeAnimatedSwap(s),i&&this.suppressTransitions();for(let l of s)l.style.backgroundImage=`url("${va(e)}")`,l.classList.add("active","is-front");for(let l of a)l.classList.remove("is-front");this.useSetA=!this.useSetA,this.finishHiddenSwap(),window.clearTimeout(this.animatedSwapTimer),this.animatedSwapTimer=window.setTimeout(()=>{if(r===this.animatedToken)for(let l of a)l.classList.remove("active")},ba+80)}primeAnimatedSwap(e){window.clearTimeout(this.animatedSwapTimer);for(let i of this.faces)i.style.setProperty("transition","none","important");for(let i of e)i.classList.remove("active","is-front");this.el.offsetWidth;for(let i of this.faces)i.style.removeProperty("transition")}renderKawarp(){let e=Array.from(this.el.querySelectorAll(".ll-bg-canvas"));if(e.length<2){this.finishHiddenSwap();return}if(this.kawarpLayers.length===0){try{this.kawarpLayers=e.map(n=>({canvas:n,renderer:new yi(n,{...this.kawarpOptions(),transitionDuration:0})}))}catch(n){console.warn("[Liquid Lyrics] Kawarp unavailable, falling back to the animated background.",n),this.disposeKawarpLayers(),this.mode="animated",this.rebuild("animated"),this.el.dataset.mode="animated",this.renderAnimated();return}for(let n of this.kawarpLayers)this.sizeKawarpCanvas(n);this.observeResize(),this.lastKawarpOptions=JSON.stringify(this.kawarpOptions()),this.enabled&&this.kawarpLayers[0].renderer.start()}else{let n=JSON.stringify(this.kawarpOptions());if(n!==this.lastKawarpOptions){this.lastKawarpOptions=n;for(let o of this.kawarpLayers)o.renderer.setOptions({...this.kawarpOptions(),transitionDuration:0})}}let i=ii(this.coverUrl,this.activeMode);if(!i||i===this.lastKawarpUrl){this.finishHiddenSwap();return}this.lastKawarpUrl=i;let r=this.instantSwap;this.instantSwap=!1,this.crossfadeKawarp(i,r)}async crossfadeKawarp(e,i=!1){let r=++this.kawarpToken,n;try{n=await this.decodeImage(e)}catch{r===this.kawarpToken&&(this.lastKawarpUrl=""),this.finishHiddenSwap();return}if(r!==this.kawarpToken||this.kawarpLayers.length<2)return;let o=this.useKawarpA?this.kawarpLayers[0]:this.kawarpLayers[1],s=this.useKawarpA?this.kawarpLayers[1]:this.kawarpLayers[0];this.sizeKawarpCanvas(o),o.renderer.loadImageElement(n),this.enabled&&o.renderer.start(),await wa(),await wa(),r===this.kawarpToken&&(i&&this.suppressTransitions(),o.canvas.classList.add("active","is-front"),s.canvas.classList.remove("is-front"),this.useKawarpA=!this.useKawarpA,this.finishHiddenSwap(),window.clearTimeout(this.kawarpSwapTimer),this.kawarpSwapTimer=window.setTimeout(()=>{r===this.kawarpToken&&(s.canvas.classList.remove("active"),s.renderer.stop())},ba+80))}async decodeImage(e){let i=new Image;return i.crossOrigin="anonymous",i.src=e,await i.decode(),i}kawarpOptions(){if(this.forcedMode)return{warpIntensity:Ue.warpIntensity,blurPasses:Ue.blurPasses,animationSpeed:Ue.animationSpeed,transitionDuration:0,saturation:Ue.saturation,scale:Ue.scale};let e=C();return{warpIntensity:A(e.bgWarpIntensity,0,100)/100,blurPasses:Math.max(1,Math.round(A(e.bgBlur,0,150)/150*40)),animationSpeed:A(e.bgRotationSpeed,0,400)/100,transitionDuration:0,saturation:A(e.bgSaturation,0,500)/100,scale:A(A(e.bgScale,10,400)/100,.01,4)}}observeResize(){this.resizeObserver||(this.resizeObserver=new ResizeObserver(()=>{for(let e of this.kawarpLayers)this.sizeKawarpCanvas(e)}),this.resizeObserver.observe(this.el))}sizeKawarpCanvas(e){let i=this.el.clientWidth,r=this.el.clientHeight;if(i<2||r<2)return;let n=Math.min(window.devicePixelRatio||1,2),o=Math.max(i,r)*n,s=o>ya?ya/o*n:n,a={width:Math.round(i*s),height:Math.round(r*s)};e.canvas.width===a.width&&e.canvas.height===a.height||(e.canvas.width=a.width,e.canvas.height=a.height,e.renderer.resize())}teardownKawarp(){this.kawarpToken++,window.clearTimeout(this.kawarpSwapTimer),this.kawarpSwapTimer=0,this.disposeKawarpLayers(),this.resizeObserver?.disconnect(),this.resizeObserver=null}disposeKawarpLayers(){for(let e of this.kawarpLayers)try{e.renderer.stop(),e.renderer.dispose()}catch{}this.kawarpLayers=[],this.useKawarpA=!0}};function va(t){return t.replace(/["\\]/g,"\\$&").replace(/\r?\n/g,"")}function Up(t){let e=new Image;return e.src=t,e.decode()}function wa(){return new Promise(t=>requestAnimationFrame(()=>t()))}var jp=460,Wp=1e3,j="liquid-lyrics-panel",Ra="liquid-lyrics-song-card-visible";var Mt="liquify-bg-mode",Vp=["liquify-floating-player","glowify-floating-player"],At="liquid-lyrics:romanization",Kp="https://github.com/NMWplays/Liquid-Lyrics",$p="https://discord.gg/xGUq5mhWKA",Gp=500,z=null,Ir=null,Ke=null,vi=null,Pr=0,xa="",ka="",wi=-1,Nr=-1,Sa=!1,La=!1,Ta=!1,Ea=!1,xi=!0,at,Te=null,Ve=null,Ma=!1;function lt(){let t=document.getElementById(j);if(t)return t;let e=document.createElement("div");e.id=j,e.className="liquid-lyrics-panel";let i=document.createElement("div");i.className="liquid-lyrics-glass-bg",Ve=new je("panel");let r=eh(),n=document.createElement("div");n.className="liquid-lyrics-header";let o=document.createElement("span");o.className="liquid-lyrics-title",o.textContent="Liquid Lyrics";let s=document.createElement("div");s.className="ll-header-actions",s.append(Qp(),Ca("ll-header-btn ll-github-btn",Xp,"Star on GitHub",Kp),Ca("ll-header-btn ll-discord-btn",Zp,"Join the Discord",$p)),n.append(o,s);let a=document.createElement("div");a.className="liquid-lyrics-view";let l=th(),c=document.createElement("div");c.className="liquid-lyrics-content",a.append(l,c);let d=sh();return e.append(Ve.el,i,r,n,a,d),zr(e),$r(e),Kr(e),(document.querySelector(".Root__main-view")??document.body).appendChild(e),z=new xe({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:p=>{e.classList.toggle("ll-has-romanization",p),ee()}}),Ee(),ee(),Sa||(Sa=!0,document.addEventListener("fullscreenchange",Mh)),Ta||(Ta=!0,window.addEventListener(At,()=>{z?.setRomanized(J(),N()),ee()})),Ea||(Ea=!0,window.addEventListener(nt,()=>{Be()?(z?.setEnabled(!1),Ur()):N()&&(z?.setEnabled(!0),Dr())})),yh(),Zs(e,()=>Pt(e)),Ma||(Ma=!0,window.addEventListener(te,()=>{let p=document.getElementById(j);p&&zr(p),Ve?.apply(),Oe()})),e}function Li(){let t=lt();xi=!0,t.classList.add("visible"),Ve?.markNextCoverInstant(),Ee(),ee(),z?.setEnabled(!Be()),Ve?.setEnabled(!0),Dr(),Kr(t);let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let r=i;r.id===j||!r.style||(r.dataset.liquidHidden===void 0&&(r.dataset.liquidHidden=`${r.style.opacity}|${r.style.pointerEvents}`),r.style.opacity="0",r.style.pointerEvents="none")}}function Ti(){let t=document.getElementById(j);if(!t)return;t.classList.remove("visible"),z?.setEnabled(!1),Ve?.setEnabled(!1),Ur(),Le(),_i(t),Vr(),Oe();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let r=i;if(r.id===j||r.dataset.liquidHidden===void 0)continue;let[n="",o=""]=r.dataset.liquidHidden.split("|");r.style.opacity=n,r.style.pointerEvents=o,delete r.dataset.liquidHidden}}function Ei(){N()?Ti():Li()}function N(){return document.getElementById(j)?.classList.contains("visible")??!1}function qa(t=N()){let e=lt();t&&Li(),Wr(e,"fullscreen"),Mi(e)}function Br(t){if(lt(),!z)return;if(Ir===t&&z.hasLyrics){z.setEnabled(N()&&!Be()),Ee();return}Ir=t,z.setLyrics(t);let e=J();z.setRomanized(e,e!=="off"),z.setEnabled(N()&&!Be()),Ee()}function Rt(t,e=!1){let i=lt();if(!z)return;if(Ir=null,z.setLyrics(null),Ee(),!e&&Hr(t)){z.container.appendChild(Fr()),z.resetScroll(),i.classList.remove("ll-has-romanization"),ee();return}let r=document.createElement("div");r.className="liquid-lyrics-empty";let n=document.createElement("div");n.className="ll-empty-icon",n.innerHTML=Or,r.appendChild(n);let o=document.createElement("div");if(o.className="ll-empty-message",o.textContent=t,r.appendChild(o),e){let s=document.createElement("button");s.type="button",s.className="ll-empty-create-btn",s.textContent="Create your own sync",s.addEventListener("click",()=>kt()),r.appendChild(s)}z.container.appendChild(r),z.resetScroll(),i.classList.remove("ll-has-romanization"),ee()}var Ia={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',cinema:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.4"/><path d="M3 9.2h18"/><path d="m7.2 5-1.7 4.2"/><path d="M12 5l-1.7 4.2"/><path d="m16.8 5-1.7 4.2"/></svg>',animatedBg:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M5 9.4c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/><path d="M5 15c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/></svg>',edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',cardSide:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v17"/><path d="M8.4 8.5 4.6 12l3.8 3.5"/><path d="M15.6 8.5 19.4 12l-3.8 3.5"/></svg>'},Or='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/></svg>',Yp=[78,54,88,62,71,45,83,58,66,90,49,74,61,85,52,69,80,57],Jp=420;function Hr(t){return t.toLowerCase().includes("loading")}function Fr(t=Yp){let e=document.createElement("div");return e.className="liquid-lyrics-skeleton",e.setAttribute("aria-label","Searching for lyrics"),e.setAttribute("role","status"),t.forEach((i,r)=>{let n=document.createElement("div");n.className="ll-skeleton-row",n.style.width=`${i}%`;let o=(t.length-1-r)/Math.max(1,t.length-1);n.style.animationDelay=`-${Math.round(o*Jp)}ms`,e.appendChild(n)}),e}var Xp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',Zp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function Qp(){let t=document.createElement("button");return t.type="button",t.className="ll-header-btn ll-settings-btn",t.setAttribute("aria-label","Liquid Lyrics settings"),t.innerHTML=da,t.addEventListener("click",e=>{e.stopPropagation(),ua()}),P(t,"Settings"),t}function Ca(t,e,i,r){let n=document.createElement("button");return n.type="button",n.className=t,n.setAttribute("aria-label",i),n.innerHTML=e,n.addEventListener("click",o=>{o.stopPropagation(),window.open(r,"_blank")}),P(n,i),n}function eh(){let t=document.createElement("div");return t.className="liquid-lyrics-transparent-controls",t.setAttribute("aria-hidden","true"),t}function th(){let t=document.createElement("aside");t.className="liquid-lyrics-song-card";let e=document.createElement("div");e.className="ll-song-card-cover-wrap";let i=document.createElement("img");i.className="ll-song-card-cover",i.alt="",i.decoding="async",i.loading="lazy";let r=document.createElement("div");r.className="ll-song-card-overlay",e.append(i,r);let n=document.createElement("div");n.className="ll-song-card-controls",n.append(Q("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>Ct(["toggleShuffle"])),Q("ll-song-card-btn","previous","Previous",()=>Ct(["back","previous","skipToPrevious"])),Q("ll-song-card-btn ll-song-card-play","play","Play",()=>{Ct(["togglePlay"]),window.setTimeout(Ee,60)}),Q("ll-song-card-btn","next","Next",()=>Ct(["next","skipToNext"])),Q("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>Ct(["toggleRepeat"])));let o=document.createElement("div");o.className="playback-bar ll-song-card-progress",o.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let s=rh(),a=document.createElement("div");a.className="ll-song-card-info";let l=document.createElement("div");l.className="ll-song-card-title";let c=document.createElement("button");c.type="button",c.className="ll-song-card-link ll-song-card-album",P(c,"Open album");let d=document.createElement("button");return d.type="button",d.className="ll-song-card-link ll-song-card-artist",P(d,"Open artist"),a.append(l,c,d),t.append(e,n,o,a,s),Ke={card:t,cover:i,heart:s,title:l,album:c,artist:d,playButton:t.querySelector(".ll-song-card-play"),shuffleButton:t.querySelector(".ll-song-card-shuffle"),repeatButton:t.querySelector(".ll-song-card-repeat"),progressTrack:o.querySelector(".ll-card-progress-track"),progressFill:o.querySelector(".ll-card-progress-fill"),progressThumb:o.querySelector(".ll-card-progress-thumb"),currentTime:o.querySelector(".ll-card-current"),durationTime:o.querySelector(".ll-card-duration")},lh(Ke),t}var ih="M12 20.7 4.6 13.3a5 5 0 0 1 7.4-6.7 5 5 0 0 1 7.4 6.7Z";function rh(){let t=document.createElement("button");return t.type="button",t.className="ll-song-card-btn ll-song-card-heart",t.setAttribute("aria-label","Save to your Liked Songs"),t.innerHTML=`<span class="ll-heart-whole">${qr()}</span><span class="ll-heart-half ll-heart-half-left">${qr()}</span><span class="ll-heart-half ll-heart-half-right">${qr()}</span>`,t.addEventListener("click",e=>{e.stopPropagation();let i=Pa();nh()&&(t.classList.remove("ll-heart-breaking","ll-heart-popping"),t.offsetWidth,t.classList.add(i?"ll-heart-breaking":"ll-heart-popping"),window.setTimeout(()=>t.classList.remove("ll-heart-breaking","ll-heart-popping"),Wp),window.setTimeout(Na,120))}),P(t,"Save to your Liked Songs"),t}function qr(){return`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ih}"/></svg>`}function Pa(){let t=Spicetify.Player;try{if(typeof t?.getHeart=="function")return!!t.getHeart()}catch{}return!1}function nh(){let t=Spicetify.Player;try{if(typeof t?.toggleHeart=="function")return t.toggleHeart(),!0}catch{}return!1}function Na(){let t=Ke;if(!t)return;let e=Pa();t.heart.classList.toggle("active",e),t.heart.setAttribute("aria-pressed",String(e));let i=e?"Remove from your Liked Songs":"Save to your Liked Songs";t.heart.dataset.tooltip=i,t.heart.setAttribute("aria-label",i)}function oh(t){let e=Ke;if(!e)return;let i=e.card,r=i.querySelector(".ll-song-card-overlay"),n=i.querySelector(".ll-song-card-controls"),o=i.querySelector(".ll-song-card-progress"),s=i.querySelector(".ll-song-card-info");if(!r||!n||!o||!s)return;let a=e.heart;if(t==="cover"){a.parentElement!==r&&r.append(a,o,n);return}a.parentElement!==i&&i.appendChild(a),n.parentElement!==i&&i.insertBefore(n,s),o.parentElement!==i&&i.insertBefore(o,s)}function sh(){let t=document.createElement("div");return t.className="liquid-lyrics-control-pill",t.append(Q("ll-control-btn ll-card-toggle","cover","Song card",vh),Q("ll-control-btn ll-card-side-toggle","cardSide","Song card side",xh),Q("ll-control-btn ll-bg-toggle","animatedBg","Animated background",wh),Q("ll-control-btn ll-roman-toggle","roman","Romanization",kh),Q("ll-control-btn ll-edit-toggle","edit","Create / edit sync",()=>kt()),Q("ll-control-btn ll-cinema-toggle","cinema","Cinema mode",Lh),Q("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",Th)),t}function Q(t,e,i,r){let n=document.createElement("button");return n.type="button",n.className=t,n.dataset.icon=e,n.setAttribute("aria-label",i),n.innerHTML=Ia[e],n.addEventListener("click",o=>{o.stopPropagation(),r()}),P(n,i),n}function za(t,e){!t||t.dataset.icon===e||(t.dataset.icon=e,t.innerHTML=Ia[e])}function Ee(){let t=Ke;if(!t)return;let e=ch();e.cover?(t.cover.src!==e.cover&&(t.cover.src=e.cover),t.card.classList.remove("ll-no-cover")):(t.cover.removeAttribute("src"),t.card.classList.add("ll-no-cover")),Ve?.setCover(e.cover),t.title.textContent=e.title,t.album.textContent=e.album,t.album.disabled=!e.albumUri,t.album.onclick=()=>_a(e.albumUri),t.artist.textContent=e.artist,t.artist.disabled=!e.artistUri,t.artist.onclick=()=>_a(e.artistUri),qt(),It()}function qt(){let t=Ke;if(!t)return;let e=Z(),i=e?"Pause":"Play";za(t.playButton,e?"pause":"play"),t.playButton.setAttribute("aria-label",i),t.playButton.dataset.tooltip=i,We(t.shuffleButton,mh()),Na();let r=bh();We(t.repeatButton,r!=="off"),t.repeatButton.classList.toggle("ll-repeat-one",r==="track");let n=r==="track"?"Repeat one":r==="context"?"Repeat all":"Repeat";t.repeatButton.setAttribute("aria-label",n),t.repeatButton.dataset.tooltip=n}function Dr(){vi||(Pr=0,wi=-1,Nr=-1,vi=it(ah),qt(),It())}function Ur(){vi?.(),vi=null}function ah(t,e){It(t),e-Pr>=Gp&&(Pr=e,qt())}function It(t=Ba()){let e=Ke;if(!e)return;let i=K(),r=i>0?Si(t/i):0;if(!e.progressTrack.classList.contains("ll-previewing")&&Math.abs(r-wi)>2e-5){wi=r,e.progressFill.style.transform=`scaleX(${r.toFixed(5)})`,e.progressThumb.style.left=`${(r*100).toFixed(3)}%`;let a=Math.round(r*100);a!==Nr&&(Nr=a,e.progressTrack.setAttribute("aria-valuenow",String(a)),e.progressTrack.setAttribute("aria-valuetext",`${_t(t)} of ${_t(i)}`))}let o=_t(t);o!==xa&&(xa=o,e.currentTime.textContent=o);let s=_t(i);s!==ka&&(ka=s,e.durationTime.textContent=s)}function Ba(){return Ah(Spicetify.Player?.getProgress?.(),0)}function lh(t){let e=t.progressTrack,i=e.querySelector(".ll-card-preview-time"),r=0,n=0,o=d=>{let u=e.getBoundingClientRect();return Si((d.clientX-u.left)/Math.max(1,u.width))},s=d=>{let u=K();u<=0||(e.classList.add("ll-previewing"),i&&(i.textContent=_t(u*d),i.style.left=`${d*100}%`),t.progressFill.style.transform=`scaleX(${d.toFixed(4)})`,t.progressThumb.style.left=`${(d*100).toFixed(2)}%`)},a=d=>(n=d,r||(r=requestAnimationFrame(()=>{r=0,s(n)})),d),l=()=>{e.dataset.dragging!=="true"&&(e.classList.remove("ll-previewing"),r&&(cancelAnimationFrame(r),r=0),wi=-1,It())},c=d=>{let u=K();if(u<=0)return;let p=a(o(d));ve(u*p)};e.addEventListener("pointerenter",d=>a(o(d))),e.addEventListener("pointermove",d=>a(o(d))),e.addEventListener("pointerleave",l),e.addEventListener("blur",l),e.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),e.dataset.dragging="true",e.setPointerCapture?.(d.pointerId),a(o(d));let u=h=>a(o(h)),p=h=>{c(h),delete e.dataset.dragging,l(),e.releasePointerCapture?.(d.pointerId),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",p)};window.addEventListener("pointermove",u),window.addEventListener("pointerup",p,{once:!0})}),e.addEventListener("keydown",d=>{let u=K();if(u<=0)return;let p=Ba(),h=d.shiftKey?15e3:5e3;d.key==="ArrowLeft"?(d.preventDefault(),ve(Math.max(0,p-h))):d.key==="ArrowRight"&&(d.preventDefault(),ve(Math.min(u,p+h)))})}function ch(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},i=Array.isArray(t?.artists)?t.artists.map(n=>n?.name).filter(Boolean).join(", "):"",r=Array.isArray(t?.artists)?t.artists.find(n=>n?.uri):null;return{title:t?.name||e.title||e.track_name||"Unknown track",artist:i||e.artist_name||e.artist||e.album_artist_name||"Unknown artist",album:t?.album?.name||e.album_title||e.album_name||"Unknown album",cover:dh(t,e),artistUri:r?.uri||fh(e.artist_uri||e.artist_uris||""),albumUri:t?.album?.uri||e.album_uri||""}}function dh(t,e){let i=[e.image_xlarge_url,e.image_large_url,e.image_url,e.album_image_url,e.cover_url,t?.album?.images?.[0]?.url,t?.images?.[0]?.url];for(let r of i){let n=uh(String(r??""));if(n)return ph(n)}return hh()}function uh(t){return t?t.startsWith("spotify:image:")?t.replace("spotify:image:","https://i.scdn.co/image/"):t:""}function ph(t){return t.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function hh(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function fh(t){return String(t||"").split(",")[0]?.split(";")[0]?.trim()||""}function _a(t){let e=gh(t);if(!e)return;let i=Spicetify.Platform?.History;typeof i?.push=="function"&&(i.push(e),Ti())}function gh(t){let e=String(t||"").split(":");if(e.length<3||e[0]!=="spotify")return"";let i=e[1],r=e[2];return!r||!["album","artist","track","playlist"].includes(i)?"":`/${i}/${r}`}function mh(){let t=Spicetify.Player;if(typeof t?.getShuffle=="function")return!!t.getShuffle();let e=t?.data??{};return!!(e.shuffle??e.shuffling??e.options?.shuffling??e.playback_options?.shuffling??e.context?.metadata?.shuffle)}function bh(){let t=Spicetify.Player,e=t?.data??{},i=typeof t?.getRepeat=="function"?t.getRepeat():e.repeat??e.repeatMode??e.repeat_mode??e.options?.repeat??e.playback_options?.repeat??e.context?.metadata?.repeat;if(e.options?.repeatingTrack||e.playback_options?.repeating_track)return"track";if(e.options?.repeatingContext||e.playback_options?.repeating_context)return"context";if(typeof i=="number")return i===2?"track":i===1?"context":"off";let r=String(i??"").toLowerCase();return r.includes("track")||r.includes("song")||r==="one"?"track":r.includes("context")||r.includes("all")||r==="playlist"||r==="on"?"context":"off"}function yh(){La||(La=!0,["songchange","onplaypause","onqueuechange"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>{qt(),It()})}catch{}}))}function Ct(t){let e=Spicetify.Player;for(let i of t)if(typeof e?.[i]=="function"){e[i](),window.setTimeout(Ee,80),window.setTimeout(qt,180);return}}function _t(t){let e=Math.max(0,Math.floor(t/1e3)),i=Math.floor(e/60),r=e%60;return`${i}:${String(r).padStart(2,"0")}`}function vh(){localStorage.setItem(Ra,String(!ki())),ee()}function Oa(){return Ts()}function wh(){Ls(),ee()}function xh(){let t=document.getElementById(j),e=t?.querySelector(".liquid-lyrics-song-card")??null,i=t?.querySelector(".liquid-lyrics-content")??null,r=e?.getBoundingClientRect(),n=i?.getBoundingClientRect();$("cardSide",C().cardSide==="left"?"right":"left"),ee(),Aa(e,r),Aa(i,n)}function Aa(t,e){if(!t||!e||typeof t.animate!="function")return;let i=t.getBoundingClientRect(),r=e.left-i.left;Math.abs(r)<1||t.animate([{transform:`translate3d(${r}px, 0, 0)`},{transform:"translate3d(0, 0, 0)"}],{duration:jp,easing:"cubic-bezier(0.16, 1, 0.3, 1)"})}function kh(){let t=J(),e=z?.hasJapanese??!1;Ft(t==="off"?"romaji":t==="romaji"&&e?"furigana":"off"),window.dispatchEvent(new Event(At)),ee()}function Sh(t){return t==="romaji"?"Romanization: Romaji":t==="furigana"?"Romanization: Furigana":"Romanization"}function Lh(){let t=document.getElementById(j);t&&(jr(t)?_i(t):Wr(t,"cinema"),Mi(t))}function Th(){let t=document.getElementById(j);t&&(Ci(t)?_i(t):Wr(t,"fullscreen"),Mi(t))}function Mi(t){ne(),Le(),ee(),Vr(),$r(t),Kr(t),Oe()}function zr(t){t.classList.toggle("ll-song-card-hidden",!ki()),t.classList.toggle("ll-romanized",J()==="romaji"),t.classList.toggle("ll-animated-bg",Oa()),Eh(t)}function Eh(t){let e=C(),i=Pt(t),r=i?e.fsShowCredits:e.pageShowCredits,n=i?e.fsHideScrollbar:e.pageHideScrollbar,o=i?e.fsShowControls:e.pageShowControls,s=i?e.fsControlPosition:e.pageControlPosition;t.classList.toggle("ll-hide-credits",!r),t.classList.toggle("ll-hide-scrollbar",n),t.classList.toggle("ll-hide-pill",!o),t.dataset.controlPosition=s,t.dataset.cardStyle=e.cardStyle,t.dataset.cardSide=e.cardSide,oh(e.cardStyle),t.classList.toggle("ll-card-center-text",e.cardCenterText),t.classList.toggle("ll-card-hide-title",e.cardHideTitle),t.classList.toggle("ll-card-hide-artist",e.cardHideArtist),t.classList.toggle("ll-card-hide-album",e.cardHideAlbum)}function ee(){let t=document.getElementById(j);if(!t)return;let e=J(),i=Pt(t);zr(t),We(t.querySelector(".ll-card-toggle"),ki());let r=t.querySelector(".ll-card-side-toggle");if(r){let a=ki();r.hidden=!a,r.disabled=!a;let l=C().cardSide==="left"?"Move song card right":"Move song card left";r.dataset.tooltip=l,r.setAttribute("aria-label",l),a||ne()}We(t.querySelector(".ll-roman-toggle"),e!=="off"),We(t.querySelector(".ll-cinema-toggle"),jr(t)),We(t.querySelector(".ll-fullscreen-toggle"),Ci(t));let n=t.querySelector(".ll-bg-toggle");n&&(n.hidden=i,n.disabled=i,We(n,i||Oa()));let o=t.querySelector(".ll-roman-toggle"),s=t.classList.contains("ll-has-romanization");if(o){o.hidden=!s,o.disabled=!s,za(o,e==="furigana"?"furigana":"roman");let a=Sh(e);o.dataset.tooltip=a,o.setAttribute("aria-label",a),s||ne()}}function We(t,e){t&&(t.classList.toggle("active",e),t.setAttribute("aria-pressed",String(e)))}function ki(){return localStorage.getItem(Ra)!=="false"}function Mh(){ne(),Le();let t=document.getElementById(j);t&&document.fullscreenElement!==t&&t.classList.contains("ll-native-fullscreen")&&_i(t),ee(),Vr(),t&&$r(t),Oe()}function jr(t){return t.classList.contains("ll-fullscreen-mode")}function Ci(t){return document.fullscreenElement===t}function Pt(t){return jr(t)||Ci(t)}function Ch(t){!Te&&t.parentNode&&(Te=document.createComment("liquid-lyrics-fullscreen-placeholder"),t.parentNode.insertBefore(Te,t));let e=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==t?document.fullscreenElement:document.body;t.parentElement!==e&&e.appendChild(t)}function _h(t){Te?.parentNode&&(Te.parentNode.insertBefore(t,Te),Te.remove()),Te=null}function Wr(t,e){if(Pt(t)||(xi=N(),t.classList.contains("visible")||(t.classList.add("visible"),Ee(),z?.setEnabled(!0),Dr())),Ch(t),e==="cinema"){document.fullscreenElement===t&&document.exitFullscreen?.(),t.classList.remove("ll-native-fullscreen"),t.classList.add("ll-fullscreen-mode");return}t.classList.remove("ll-fullscreen-mode"),t.classList.add("ll-native-fullscreen");let i=t.requestFullscreen?.();i&&typeof i.catch=="function"&&i.catch(()=>{Ci(t)||(t.classList.remove("ll-native-fullscreen"),t.classList.add("ll-fullscreen-mode"),Mi(t))})}function _i(t){let e=t.classList.contains("ll-fullscreen-mode")||t.classList.contains("ll-native-fullscreen"),i=!xi&&e;t.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===t&&document.exitFullscreen?.(),_h(t),i&&(t.classList.remove("visible"),z?.setEnabled(!1),Ur()),xi=!0}function Vr(){let t=document.getElementById(j);if(!!(t&&Pt(t))){at===void 0&&(at=localStorage.getItem(Mt)),localStorage.getItem(Mt)!=="animated"&&(localStorage.setItem(Mt,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}at!==void 0&&(at===null?localStorage.removeItem(Mt):localStorage.setItem(Mt,at),at=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function Kr(t=document.getElementById(j)){if(!t)return;let e=Vp.some(i=>localStorage.getItem(i)==="on");t.classList.toggle("ll-liquify-floating-player",e)}function $r(t=document.getElementById(j)){if(!t)return;let e=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),i=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);t.style.setProperty("--ll-transparent-controls-width",`${Si(e,50,400)}px`),t.style.setProperty("--ll-transparent-controls-height",`${Si(i,20,300)}px`)}function Ah(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function Si(t,e=0,i=1){return Math.min(i,Math.max(e,t))}var Ai=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var Gr="liquid-lyrics-button";function Ha(){let t=document.getElementById(Gr);if(t)return t;let e=document.querySelector(".main-nowPlayingBar-extraControls");if(!e)return null;let i=document.createElement("button");return i.id=Gr,i.className="liquid-lyrics-button",i.setAttribute("aria-label","Liquid Lyrics"),i.innerHTML=Ai,P(i,"Liquid Lyrics"),i.addEventListener("click",()=>{Ei(),i.classList.toggle("active",N())}),e.prepend(i),i}function Fa(){let t=document.getElementById(Gr);t&&t.classList.toggle("active",N())}var qh=[82,58,90,66,74,52],Qr="liquid-lyrics-sidebar-card",en="liquid-lyrics-sidebar-card-collapsed",Ka="liquid-lyrics-sidebar-card-expanded",Ih=300,Ph=2e3,ct={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',expand:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="m8.4 6.4 3.6-3.4 3.6 3.4"/><path d="m8.4 17.6 3.6 3.4 3.6-3.4"/></svg>',collapse:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16"/><path d="m8.4 10.4 3.6-3.4 3.6 3.4"/><path d="m8.4 13.6 3.6 3.4 3.6-3.4"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>'},re=null,F=null,qi="Loading lyrics...",Nt=null,Ii=!1,$a=!1,Da=!1,Yr=null,Jr=!1,Ua=null,pe=null,ja=0,Xr=!1,Wa=[],Me=null,Ce=null,ue=null;function Ni(){if(re)return Za(),$e(re),re;document.getElementById(Qr)?.remove();let t=document.createElement("section");t.id=Qr,t.className="liquid-lyrics-sidebar-card",re=t,t.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${Ai}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-expand-toggle" type="button" aria-label="Expand card">${ct.expand}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${ct.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${ct.open}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${ct.fullscreen}</button>
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
  `;let e=t.querySelector(".ll-sidebar-header-main"),i=t.querySelector(".ll-sidebar-collapse-btn"),r=t.querySelector(".ll-sidebar-expand-toggle"),n=t.querySelector(".ll-sidebar-roman-toggle"),o=t.querySelector(".ll-sidebar-fullscreen-toggle"),s=t.querySelector(".ll-sidebar-open-toggle"),a=()=>{let d=!t.classList.contains("collapsed");localStorage.setItem(en,String(d)),Zr(t),W()};e?.addEventListener("click",a),i?.addEventListener("click",a),r?.addEventListener("click",d=>{d.stopPropagation();let u=!t.classList.contains("ll-expanded");localStorage.setItem(Ka,String(u)),u&&t.classList.contains("collapsed")&&(localStorage.setItem(en,"false"),Zr(t));let p=t.getBoundingClientRect();Va(t),Bh(t,p),W()}),n?.addEventListener("click",d=>{d.stopPropagation();let u=J(),p=F?.hasJapanese??!1;Ft(u==="off"?"romaji":u==="romaji"&&p?"furigana":"off"),window.dispatchEvent(new Event(At)),W()}),o?.addEventListener("click",d=>{d.stopPropagation(),qa(!1)}),s?.addEventListener("click",d=>{d.stopPropagation(),Li()}),i&&P(i,"Toggle mini lyrics"),r&&P(r,"Expand card"),n&&P(n,"Romanization"),o&&P(o,"Fullscreen"),s&&P(s,"Open Liquid Lyrics");let l=t.querySelector(".ll-sidebar-mini-viewport"),c=t.querySelector(".ll-sidebar-mini-lines");return F?.destroy(),F=new xe({container:c,scroller:l,variant:"sidebar",renderBackgrounds:!0,dotLiftPx:10,onRomanizationAvailability:()=>zt(t)}),Da||(Da=!0,window.addEventListener(At,()=>{Pi(!N()),re&&zt(re)}),window.addEventListener(nt,()=>W()),window.addEventListener(te,()=>nn())),Zr(t),Va(t),$e(t),Hh(),Dh(),Nt?(F.setLyrics(Nt),Pi(!N())):on(qi,Ii),W(),t}function tn(t,e="No lyrics available",i=!1){let r=Ni();qi=t?"Live lyrics":e,F?.setLyrics(t),!t||!F?.hasLyrics?(Nt=null,Ii=i,on(qi,i)):(Nt=t,Ii=!1,Pi(!N())),zt(r),W()}function Ga(t){qi=t,Nt=null,Ii=!1;let e=re;e&&(F?.setLyrics(null),on(t),zt(e),W())}function W(){let t=re;if(!t)return;$e(t);let e=N();t.classList.toggle("ll-hidden",e),t.classList.contains("ll-expanded")&&(Xa(t),Ja(t)),t.dataset.romanized=String(J()==="romaji"),zt(t);let i=t.classList.contains("collapsed"),r=!e&&!i&&t.isConnected&&!Be();F?.setEnabled(r),r&&J()!=="off"&&!$a&&Pi(!0)}function rn(){$e(),nn()}function nn(){let t=C().npvBackground,e=document.querySelector(".Root__right-sidebar");if(!t||!e){Me?.destroy(),Me=null;return}Me||(Me=new je("sidebar")),Me.el.parentElement!==e&&e.appendChild(Me.el),Me.setCover(Ya()),Me.apply()}function Ya(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},i=String(e.image_xlarge_url||e.image_large_url||e.image_url||t?.album?.images?.[0]?.url||"");return(i.startsWith("spotify:image:")?i.replace("spotify:image:","https://i.scdn.co/image/"):i).replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function Pi(t){if(!F)return;let e=J();F.setRomanized(e,t),$a=t||e==="off"}function on(t,e=!1){if(!F)return;if(!e&&Hr(t)){F.container.replaceChildren(Fr(qh)),F.resetScroll();return}let i=document.createElement("div");i.className="ll-sidebar-mini-empty";let r=document.createElement("div");r.className="ll-empty-icon ll-sidebar-empty-icon",r.innerHTML=Or,i.appendChild(r);let n=document.createElement("div");if(n.className="ll-sidebar-mini-empty-text",n.textContent=t,i.appendChild(n),e){let o=document.createElement("button");o.type="button",o.className="ll-sidebar-mini-create-btn",o.textContent="Create your own sync",o.addEventListener("click",s=>{s.stopPropagation(),kt()}),i.appendChild(o)}F.container.replaceChildren(i),F.resetScroll()}function zt(t){let e=t.querySelector(".ll-sidebar-roman-toggle");if(!e)return;let i=F?.hasRomanization??!1,r=J(),n=i&&r!=="off";e.hidden=!i,e.disabled=!i,e.classList.toggle("active",n),e.setAttribute("aria-pressed",String(n));let o=r==="furigana"?"furigana":"roman";e.dataset.icon!==o&&(e.dataset.icon=o,e.innerHTML=ct[o]);let s=r==="romaji"?"Romanization: Romaji":r==="furigana"?"Romanization: Furigana":"Romanization";e.dataset.tooltip=s,e.setAttribute("aria-label",s)}function Zr(t){let e=localStorage.getItem(en)==="true";t.classList.toggle("collapsed",e),t.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!e))}function Va(t){let e=localStorage.getItem(Ka)==="true";t.classList.toggle("ll-expanded",e),e?Nh(t):zh(t),Ja(t);let i=t.querySelector(".ll-sidebar-expand-toggle");if(i){let r=e?"collapse":"expand";i.dataset.icon!==r&&(i.dataset.icon=r,i.innerHTML=ct[r]);let n=e?"Shrink card":"Expand card";i.dataset.tooltip=n,i.setAttribute("aria-label",n),i.classList.toggle("active",e),i.setAttribute("aria-pressed",String(e))}if(!e){t.style.removeProperty("--ll-card-expanded-height");return}Xa(t)}function Ja(t){if(!t.classList.contains("ll-expanded")){ue?.destroy(),ue=null;return}ue||(ue=new je("panel","kawarp")),ue.el.parentElement!==t&&t.insertBefore(ue.el,t.firstChild),ue.setCover(Ya()),ue.apply(),ue.setEnabled(!0)}function Nh(t){t.parentElement!==document.body&&(Ce||(Ce=document.createComment("liquid-lyrics-card-slot")),t.parentNode?.insertBefore(Ce,t),document.body.appendChild(t))}function zh(t){Ce?.parentNode&&(Ce.parentNode.insertBefore(t,Ce),Ce.remove()),Ce=null}function Xa(t){let e=document.querySelector(".Root__right-sidebar");if(!e||!t.isConnected)return;let i=e.getBoundingClientRect(),r=8;t.style.setProperty("--ll-card-fs-top",`${Math.round(i.top+r)}px`),t.style.setProperty("--ll-card-fs-left",`${Math.round(i.left+r)}px`),t.style.setProperty("--ll-card-fs-width",`${Math.round(i.width-r*2)}px`),t.style.setProperty("--ll-card-fs-height",`${Math.round(i.height-r*2)}px`)}function Bh(t,e){if(typeof t.animate!="function")return;let i=t.getBoundingClientRect(),r=e.left-i.left,n=e.top-i.top,o=i.width>0?e.width/i.width:1,s=i.height>0?e.height/i.height:1;if(Math.abs(r)<1&&Math.abs(n)<1&&Math.abs(o-1)<.01&&Math.abs(s-1)<.01)return;t.classList.add("ll-card-flipping"),t.animate([{transformOrigin:"top left",transform:`translate(${r}px, ${n}px) scale(${o}, ${s})`},{transformOrigin:"top left",transform:"none"}],{duration:520,easing:"cubic-bezier(0.34, 1.32, 0.64, 1)"}).finished.catch(()=>{}).finally(()=>t.classList.remove("ll-card-flipping"))}function $e(t=re){if(!t||t.classList.contains("ll-expanded"))return!1;Za();let e=Oh();return e?t.parentElement!==e||e.lastElementChild!==t?(e.appendChild(t),!0):!1:(t.parentElement?.classList.contains("Root__right-sidebar")&&t.remove(),!1)}function Za(){document.querySelectorAll(`#${Qr}`).forEach(t=>{t!==re&&t.remove()})}function Oh(){if(pe?.isConnected)return pe;pe=null;let t=document.querySelector(".Root__right-sidebar"),e=t?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||t?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||t?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(e)return pe=e,e;let i=performance.now();return i-ja>=Ph&&(ja=i,pe=Ri(["nowplayingview","nowplayingwidget"],t??document)||Ri(["nowplaying","widget"],t??document)||Ri(["nowplayingview","nowplayinggrid"],t??document)||Ri(["nowplaying","grid"],t??document)),pe}function Ri(t,e=document){let i=t.map(r=>r.toLowerCase());for(let r of Array.from(e.querySelectorAll("*"))){let n=(r.getAttribute("class")||"").toLowerCase();if(i.every(o=>n.includes(o)))return r}return null}function Hh(){Yr||(Yr=new MutationObserver(()=>{Fh()}),Yr.observe(document.body,{childList:!0,subtree:!0}),sn())}function Fh(){Jr||(Jr=!0,setTimeout(()=>{Jr=!1,sn();let t=re;t&&(t.classList.contains("ll-expanded")||t.isConnected&&pe?.isConnected&&t.parentElement===pe||$e(t)&&W())},Ih))}function Dh(){Ua||(Ua=setInterval(()=>{sn(),$e(),nn(),W()},1e3))}function sn(){if(!!document.querySelector(".Root__cinema-view")){Xr=!0;return}Xr&&(Xr=!1,Uh())}function Uh(){Wa.forEach(t=>clearTimeout(t)),Wa=[80,260,620,1100].map(t=>setTimeout(()=>{let e=Ni();pe=null,$e(e),W()},t))}var Qa=`/* ==========================================================================\r
   Liquid Lyrics\r
   --------------------------------------------------------------------------\r
   1. Registered properties & design tokens\r
   2. Now-playing-bar button\r
   3. Panel shell (backgrounds, header, layout, enter animations)\r
   4. Song card\r
   5. Control pill & tooltip\r
   6. Lyrics engine - shared line/word/letter/interlude styles\r
   7. Panel lyrics variant & virtualizer\r
   8. Sidebar card\r
   9. Fullscreen modes\r
   10. Responsive\r
   11. Sync editor\r
   12. Settings menu\r
   --------------------------------------------------------------------------\r
   User settings (src/lib/settings.ts) reach the stylesheet as custom properties\r
   and marker classes on <html>: --ll-font-scale, --ll-fade-top,\r
   --ll-fade-bottom and the .ll-hide-* classes. They sit on the root rather than\r
   the panel because the panel is detached to <body> in fullscreen and the\r
   now-playing-bar button lives outside it altogether.\r
   --------------------------------------------------------------------------\r
   Contract with src/ui/lyrics/view.ts:\r
   - Resting values (past/future lines, sung/future words) live in the state\r
     class rules below; the engine only writes inline styles while a line is\r
     actively singing and removes them again on state flips.\r
   - Lift/scale are inline transforms, so \`.singing\` disables the transform\r
     transition (JS drives every frame) while the base transition catches\r
     interrupted lifts and glides them back down.\r
   ========================================================================== */\r
\r
/* --- 1. Registered properties & design tokens ----------------------------- */\r
\r
@property --line-progress {\r
  syntax: "<number>";\r
  inherits: false;\r
  initial-value: -20;\r
}\r
\r
@property --syl-progress {\r
  syntax: "<number>";\r
  inherits: false;\r
  initial-value: -20;\r
}\r
\r
@property --letter-progress {\r
  syntax: "<number>";\r
  inherits: false;\r
  initial-value: -20;\r
}\r
\r
@property --interlude-visibility {\r
  syntax: "<number>";\r
  inherits: false;\r
  initial-value: 0;\r
}\r
\r
/* Width of the song-card column. Registered as a <length> so toggling the\r
   card animates smoothly \u2014 raw grid-template-columns with minmax() would\r
   jump discretely instead of interpolating. */\r
@property --ll-card-col {\r
  syntax: "<length>";\r
  inherits: true;\r
  initial-value: 0px;\r
}\r
\r
:root {\r
  /* Prefer Glowify's own --glowify-shadow over rebuilding the glow from the\r
     parts: it carries Glowify's no-glow mode, which flips the variable to\r
     \`none\`. Rebuilding it (as before) ignored that, so the shadow stayed on\r
     while the theme's own surfaces went flat. The rebuild is the standalone\r
     fallback for when no Glowify is present. */\r
  --liquid-lyrics-glowify-shadow: var(--glowify-shadow, 0 0 var(--glowify-glow-blur, 25px) var(--glowify-glow-spread, 8px) var(--glowify-glow-accent, var(--accent-color)));\r
  /* Base backdrop follows Glowify's adjustable blur; falls back to 32px when no\r
     Glowify is present, which is also what themeBridge.ts falls back to when a\r
     third-party theme offers no backdrop of its own to copy. Liquify overrides\r
     this wholesale below. */\r
  --liquid-lyrics-surface-backdrop: blur(var(--glowify-backdrop-blur, 32px));\r
  /* Host theme picks the shadow: Liquify v2 sets --liquify-shadow, Liquify v1\r
     sets --glass-shadow, Glowify sets --glowify-shadow (via the rebuild above). */\r
  --liquid-lyrics-surface-shadow: var(--liquify-shadow, var(--glass-shadow, var(--liquid-lyrics-glowify-shadow)));\r
  /* The hairline rims drawn on ::after pseudo-elements. Deliberately not the\r
     surface shadow: under Glowify those edges come from --glowify-outline, so\r
     drawing one here as well would double it. Kept as a variable rather than\r
     repeating the chain at every rim, because the theme bridge overrides it on\r
     <html> when a third-party theme is adopted \u2014 a selector-by-selector\r
     override could never reach the rims that carry !important. */\r
  --liquid-lyrics-rim-shadow: var(--liquify-shadow, var(--glass-shadow, none));\r
  --liquid-lyrics-song-card-shadow: var(--liquid-lyrics-glowify-shadow);\r
  /* A hairline in our own accent. Also what themeBridge.ts falls back to when a\r
     third-party theme draws neither a shadow nor a border. */\r
  --liquid-lyrics-accent-outline: inset 0 0 0 1px\r
    color-mix(in srgb, var(--liquid-lyrics-accent) 45%, transparent);\r
  /* For controls that cannot afford a glow. Glowify's rim spills well outside\r
     the element, which is fine on a card but not on a small button inside a\r
     clipped, scrolling strip \u2014 there the spill is cut off mid-way and reads as a\r
     smear along the edge. Same chain as the surface shadow, except that where\r
     Glowify's glow would land, a flat accent outline is drawn instead. Liquify's\r
     rim is inset and stays as it is. */\r
  --liquid-lyrics-flat-rim: var(\r
    --liquify-shadow,\r
    var(--glass-shadow, var(--liquid-lyrics-accent-outline))\r
  );\r
  /* The settings panel gets its own backdrop: Liquify registers that surface\r
     with a 5px glass blur instead of the 2px its other surfaces use, and this\r
     menu is a port of it. Falls back to the base backdrop with no Liquify. */\r
  --liquid-lyrics-settings-backdrop: var(--liquid-lyrics-surface-backdrop);\r
\r
  /* One accent for everything we tint, so the dropdown hovers, the toggles and\r
     every other tinted surface agree \u2014 they used to disagree, because the\r
     toggles went through Spicetify's variables and picked up the theme's colour\r
     while the hovers stopped at --accent-color and fell through to the green.\r
     Liquify's own accent comes first because it already follows the artwork.\r
     Ours (lib/accent.ts, from the same palette) comes next \u2014 ahead of the\r
     Spicetify variables on purpose: every theme ships a colour scheme, so\r
     --spice-button is practically always set, and it is a single fixed colour.\r
     Behind it the accent never moved from one song to the next. The Spicetify\r
     variables stay as the fallback for when no palette can be extracted at all\r
     (local files, podcasts). */\r
  --liquid-lyrics-accent: var(\r
    --liquify-glow-accent,\r
    var(\r
      --liquid-lyrics-accent-auto,\r
      var(--spice-button-active, var(--spice-button, var(--accent-color, #1ed760)))\r
    )\r
  );\r
\r
  /* Settings fallbacks \u2014 applySettings() overwrites these on <html>, but they\r
     have to resolve on their own too: the stylesheet is injected before the\r
     first apply, and a wiped localStorage must still render the shipped look. */\r
  --ll-font-scale: 1;\r
  --ll-fade-top: 11%;\r
  --ll-fade-bottom: 18%;\r
}\r
\r
/* Themes other than Liquify and Glowify are matched at runtime instead: the look\r
   of Spotify's own Now Playing View sections is copied into the variables above\r
   (see ui/themeBridge.ts), and .ll-theme-adopted marks that it happened. The\r
   sidebar card additionally takes their fill and corner radius, since it sits\r
   among those very panels. */\r
:root.ll-theme-adopted .liquid-lyrics-sidebar-card {\r
  background: var(--ll-theme-card-bg, transparent);\r
  border-radius: var(--ll-theme-card-radius, 20px);\r
}\r
\r
/* Liquify glass filter integration \u2014 v1 and v2 both expose #glass-filter--r1-7.\r
   The blur follows v2's glass-blur slider; v1 has no slider, so it lands on the\r
   2px it hardcodes itself. */\r
:root:has(#glass-filter--r1-7) {\r
  --liquid-lyrics-surface-backdrop: var(--glass-filter, url(#glass-filter--r1-7)) blur(var(--liquify-glass-blur, 2px));\r
  --liquid-lyrics-settings-backdrop: var(--glass-filter, url(#glass-filter--r1-7)) blur(5px);\r
  --liquid-lyrics-song-card-shadow: none;\r
}\r
\r
/* Liquify v2 performance mode: the theme swaps the SVG refraction for a plain\r
   backdrop blur, so match .liquify-glass--simple. Needs :has() here too \u2014 the\r
   perf class alone loses on specificity to the ID-carrying rule above. */\r
:root.liquify-perf-no-glass:has(#glass-filter--r1-7) {\r
  --liquid-lyrics-surface-backdrop: blur(var(--liquify-backdrop-blur, 2rem)) saturate(1.4);\r
  --liquid-lyrics-settings-backdrop: blur(var(--liquify-backdrop-blur, 2rem)) saturate(1.4);\r
}\r
\r
/* --- 2. Now-playing-bar button --------------------------------------------- */\r
\r
.liquid-lyrics-button {\r
  width: 36px;\r
  height: 36px;\r
  padding: 0;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border: 0;\r
  --ll-control-radius: 50%;\r
  border-radius: 50%;\r
  color: rgba(255, 255, 255, 0.68);\r
  background: transparent;\r
  cursor: pointer;\r
  transition: color 180ms ease;\r
}\r
\r
.liquid-lyrics-button:hover {\r
  color: #fff;\r
}\r
\r
.liquid-lyrics-button.active {\r
  color: var(--liquid-lyrics-accent);\r
}\r
\r
/* --- 3. Panel shell ---------------------------------------------------------- */\r
\r
.liquid-lyrics-panel {\r
  position: relative;\r
  display: none;\r
  flex-direction: column;\r
  align-items: center;\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  color: #fff;\r
  background: transparent;\r
  font-family: var(--font-family, "Spotify Mix", "CircularSp", system-ui, sans-serif);\r
  isolation: isolate;\r
  container-type: inline-size;\r
  --ll-fill-bright: rgba(255, 255, 255, 1);\r
  --ll-fill-dim: rgba(255, 255, 255, 0.28);\r
  --ll-card-col: clamp(220px, 28vw, 360px);\r
  /* Size of Spotify's window-control strip (top right), from Liquify's\r
     liquify-tc-width/height. Declared here, not on the overlay that paints it,\r
     so the fullscreen header can keep its actions clear of the same strip.\r
     JS overwrites these on the panel \u2014 see syncTransparentControlsOverlay. */\r
  --ll-transparent-controls-width: 135px;\r
  --ll-transparent-controls-height: 64px;\r
}\r
\r
/* The open panel overlays the main view instead of collapsing it; siblings\r
   are faded to opacity 0 (JS) so Spotify keeps their layout and scroll state\r
   and no descendant (e.g. sticky playlist headers) can punch through. */\r
.Root__main-view:has(> .liquid-lyrics-panel) {\r
  position: relative;\r
}\r
\r
/* Contain the panel's z-index. Without a stacking context here, position:relative\r
   + z-index:auto lets the panel's z-index:100 compete in .Root's context, where it\r
   outranks siblings it should never touch \u2014 it covered Liquify's floating player\r
   and, being transparent there, left it visible but unclickable. Safe in\r
   cinema/fullscreen: the panel is moved out to <body> (see detachPanel). */\r
.Root__main-view:has(> .liquid-lyrics-panel.visible) {\r
  isolation: isolate;\r
}\r
\r
/* --- Control radii, held against the host theme ---------------------------\r
   Themes pin every control in the app to one shape, e.g.\r
\r
     :root button:not(.a):not([style*=x]):not(.b) {\r
       border-radius: var(--button-radius) !important;\r
     }\r
\r
   Three :not() arguments give that selector more weight than any single class\r
   of ours, so adding !important to .ll-sidebar-island-btn would still lose \u2014\r
   among important declarations it is specificity that decides. Repeating :root\r
   buys the weight back; it is inert otherwise, since <html> matches it anyway.\r
\r
   Each control publishes its own radius as --ll-control-radius (next to its\r
   border-radius, which stays the readable source of truth), so this restores\r
   the designed shape instead of flattening every control to one value. The\r
   default covers the 12px squircles, which is most of them. */\r
:root:root:root:root\r
  :is(\r
    .liquid-lyrics-panel,\r
    .liquid-lyrics-sidebar-card,\r
    .liquid-lyrics-editor,\r
    .ll-settings-overlay,\r
    .liquid-lyrics-tooltip\r
  )\r
  :is(button, input, select),\r
:root:root:root:root .liquid-lyrics-button {\r
  border-radius: var(--ll-control-radius, 12px) !important;\r
}\r
\r
/* The same themes round the <span> inside a button and every <img>. Ours are\r
   the artwork and the icon labels, which take their shape from the element\r
   around them. */\r
:root:root:root:root\r
  :is(.liquid-lyrics-panel, .liquid-lyrics-sidebar-card, .liquid-lyrics-editor)\r
  :is(button span, img) {\r
  border-radius: inherit !important;\r
}\r
\r
/* ...but a stacking context alone ranks as z-index:auto in .Root's context, so\r
   any positioned sibling added after the main view still paints over the panel.\r
   StarryNight is the case in point: it appends .starrynight-bg-container to\r
   .Root__top-container, fixed and full-screen, and its stars and shooting stars\r
   landed on top of the lyrics and the background.\r
   Only lifted for third-party themes. Liquify floats its player over the main\r
   view at z-index:auto, and lifting the main view under it would swallow the\r
   player again \u2014 which is the very thing the isolation above was added for. */\r
:root.ll-theme-adopted .Root__main-view:has(> .liquid-lyrics-panel.visible) {\r
  z-index: 1;\r
}\r
\r
.liquid-lyrics-panel.visible {\r
  display: flex;\r
  position: absolute;\r
  inset: 0;\r
  z-index: 100;\r
}\r
\r
.liquid-lyrics-panel.visible:not(.ll-song-card-hidden) .liquid-lyrics-song-card {\r
  animation: ll-song-card-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;\r
}\r
\r
.liquid-lyrics-panel.visible .liquid-lyrics-content {\r
  animation: ll-lyrics-content-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;\r
}\r
\r
.liquid-lyrics-panel.visible .liquid-lyrics-title {\r
  animation: ll-title-enter 360ms cubic-bezier(0.2, 0.95, 0.25, 1) both;\r
}\r
\r
/* Placeholder surface for Liquify's glass background. */\r
.liquid-lyrics-glass-bg {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 0;\r
  pointer-events: none;\r
  border-radius: 20px;\r
  background: transparent;\r
}\r
\r
/* Same reasoning as .ll-bg-canvas below: the layer's own geometry and visibility\r
   are held against theme rules, because losing either takes the whole background\r
   with it. */\r
.liquid-lyrics-bg {\r
  position: absolute !important;\r
  inset: 0 !important;\r
  z-index: 0;\r
  overflow: hidden;\r
  pointer-events: none;\r
  opacity: 0;\r
  background: transparent;\r
  transition: opacity 600ms ease;\r
}\r
\r
/* Colour mode has no picture layer at all \u2014 the fill is the element itself. */\r
.liquid-lyrics-bg[data-mode="color"] {\r
  background: var(--ll-bg-color, #101418);\r
}\r
\r
/* Transparent paints nothing and lets the theme through, but the blur slider\r
   still applies \u2014 as a backdrop filter, so you get a frosted view of whatever is\r
   behind the panel rather than of a picture of our own. */\r
.liquid-lyrics-bg[data-mode="transparent"] {\r
  background: none;\r
  backdrop-filter: blur(var(--ll-bg-backdrop-blur, 0px));\r
  -webkit-backdrop-filter: blur(var(--ll-bg-backdrop-blur, 0px));\r
}\r
\r
/* Visibility is owned by the background engine rather than the panel's\r
   .ll-animated-bg class, so the sidebar layer fades on the same rule. */\r
.liquid-lyrics-bg.is-visible {\r
  opacity: 1 !important;\r
}\r
\r
/* One frame with every transition off, so a swap the user should not see\r
   animating (re-opening the panel onto a track that changed meanwhile) lands\r
   instantly. */\r
.liquid-lyrics-bg.ll-bg-instant,\r
.liquid-lyrics-bg.ll-bg-instant * {\r
  transition: none !important;\r
}\r
\r
/* One still picture. Scale is a transform rather than background-size so it can\r
   zoom past the edges without the filter's blur revealing them. */\r
.ll-bg-image {\r
  position: absolute;\r
  inset: -10%;\r
  background-repeat: no-repeat;\r
  background-size: cover;\r
  background-position: center;\r
  filter: var(--ll-bg-filter, none);\r
  opacity: var(--ll-bg-opacity, 1);\r
  transform: scale(var(--ll-bg-scale, 1));\r
  transition: background-image 600ms ease, opacity 600ms ease;\r
}\r
\r
/* !important throughout: several themes style bare \`canvas\` elements for their\r
   own effects (StarryNight's starfield among them) and were flattening ours,\r
   which is a canvas like any other from their point of view. These few\r
   properties decide whether the background is visible at all, so they are not\r
   left open to that. */\r
.ll-bg-canvas {\r
  position: absolute !important;\r
  inset: 0 !important;\r
  width: 100% !important;\r
  height: 100% !important;\r
  display: block !important;\r
  /* Kawarp owns blur, saturation and scale on the GPU; brightness and contrast\r
     are not part of its pipeline, so they are layered on here. */\r
  filter: var(--ll-bg-canvas-filter, none) !important;\r
  /* Two canvases, stacked rather than cross-faded: the outgoing one sits at full\r
     opacity underneath while the incoming one fades in on top of it. Fading both\r
     at once left a dip in the middle, because two layers at 50% do not add back\r
     up to one. */\r
  opacity: 0 !important;\r
  z-index: 0;\r
  /* Held for the same reason as the rest of this rule. The crossfade *is* this\r
     transition \u2014 a theme's blanket \`* { transition: ... }\` would not flatten the\r
     background, it would turn every track change into a cut. */\r
  transition: opacity 600ms ease !important;\r
}\r
\r
.ll-bg-canvas.active {\r
  opacity: var(--ll-bg-opacity, 1) !important;\r
}\r
\r
.ll-bg-canvas.is-front {\r
  z-index: 1;\r
}\r
\r
.ll-bg-tile {\r
  position: absolute;\r
  border-radius: 50%;\r
  /* Clips the two faces below to the blob's shape \u2014 the picture used to be the\r
     tile's own background, where the radius did the clipping on its own. */\r
  overflow: hidden;\r
  /* Darkened through the filter, not opacity: opacity would make the blobs\r
     see-through and let the app behind them show. */\r
  filter: var(--ll-bg-filter, blur(51px) brightness(0.6));\r
  /* Constant. The blob itself never fades \u2014 see .ll-bg-tile-face for why that\r
     matters. */\r
  opacity: var(--ll-bg-opacity, 1) !important;\r
  transform-origin: center;\r
  /* Both held against theme rules, like the canvas above: these two are the\r
     animated mode's entire motion. A blanket \`* { animation: none }\` parks the\r
     blobs, and a blanket \`* { transition: ... }\` makes every track change a cut\r
     instead of a crossfade \u2014 neither reads as "the theme restyled something",\r
     they read as the feature being broken. */\r
  animation: ll-fullscreen-bg-spin var(--ll-bg-spin-duration, 30s) linear infinite !important;\r
  /* Sized against the layer itself \u2014 the panel in a window, the screen in\r
     fullscreen \u2014 so one geometry fits both, and every monitor. Each blob is a\r
     circle centred in its half of the layer (25% / 75%), overlapping across the\r
     middle. The diameter is a full layer width: the corners sit ~0.38 widths\r
     from a centre and blur(50px) stops covering ~75px short of the circle's\r
     edge, so anything smaller leaves them bare \u2014 which is exactly what showed\r
     up at 75%. margin-top resolves against the layer's width just like width\r
     does, so top:50% pulled back by half the diameter centres the circle at any\r
     aspect ratio. */\r
  /* An ellipse spanning both axes of the host, rather than a circle sized off\r
     its width \u2014 the circle covered a wide panel but left two blobs stranded in\r
     the middle of the tall, narrow right sidebar.\r
\r
     Sized at 150%, not 100%: border-radius makes each tile an ellipse, and an\r
     ellipse inscribed in a box exactly the size of its host cannot reach that\r
     host's corners, so all four corners stayed bare. At 150% with the offsets\r
     below, each corner falls comfortably inside one of the two ellipses.\r
\r
     Centred with auto margins instead of a negative one, because a negative\r
     margin-top resolves against the *width* and would be wrong the moment the\r
     two axes differ. */\r
  width: calc(150% * var(--ll-bg-scale, 1));\r
  height: calc(150% * var(--ll-bg-scale, 1));\r
  top: 0;\r
  bottom: 0;\r
  margin-block: auto;\r
}\r
\r
/* The artwork lives here rather than on the blob, and this is the whole point of\r
   the arrangement.\r
\r
   A blob is a blurred ellipse: its edges are half-transparent by design. Fading\r
   blobs against each other therefore cannot hold the layer steady. Cross-fading\r
   them thins it out in the middle of the swap \u2014 two half-transparent copies of\r
   the same soft shape do not add back up to one, so the theme's own background\r
   comes through. Stacking them instead has the opposite fault: the soft regions\r
   double up, the layer thickens for the length of the fade and then snaps back\r
   the moment the covered set is dropped.\r
\r
   A face is a plain opaque rectangle filling its blob, so neither happens. The\r
   outgoing face stays at full opacity underneath while the incoming one fades in\r
   over it, the blob is covered at every instant, and dropping the outgoing face\r
   afterwards changes nothing at all. The blob's own alpha never moves, so the\r
   layer looks exactly the same at rest and mid-swap. */\r
.ll-bg-tile-face {\r
  position: absolute;\r
  inset: 0;\r
  background-repeat: no-repeat;\r
  background-size: cover;\r
  background-position: center;\r
  opacity: 0;\r
  /* Held against theme rules like the canvas above: this transition *is* the\r
     crossfade, and a blanket \`* { transition: ... }\` would not restyle it, it\r
     would turn every track change into a cut. */\r
  transition: opacity 600ms ease !important;\r
}\r
\r
.ll-bg-tile-face.active {\r
  opacity: 1;\r
}\r
\r
/* Without an explicit order the second face would always paint above the first\r
   by document order, and a fade-in underneath an opaque face is a fade to\r
   nothing. */\r
.ll-bg-tile-face.is-front {\r
  z-index: 1;\r
}\r
\r
/* The control-pill toggle shows the same cover-art layer outside fullscreen.\r
   Visibility only \u2014 it stays absolute inside the panel (clipped by its\r
   overflow) and skips the black backdrop, so it lies behind the lyrics rather\r
   than over the app. Fullscreen turns it on regardless, further down. */\r
\r
/* Liquify draws the main view's rim via .Root__main-view::after, but the panel\r
   sits above it at z-index 100 \u2014 fine while the panel is see-through, gone the\r
   moment the opaque blobs are switched on. Redraw it here, over our own\r
   background. Not in fullscreen: the panel is moved out to <body> there, so\r
   there is no main view behind it to carry a rim. */\r
.liquid-lyrics-panel.ll-animated-bg:not(.ll-fullscreen-mode):not(:fullscreen)::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  z-index: 1;\r
  pointer-events: none;\r
  border-radius: var(--liquify-main-radius, 20px);\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
/* Pulled out far enough that the two ellipses overlap across the middle and each\r
   still reaches the far corners on its own side. Two tiles, not four: the two\r
   pictures are now two faces inside each blob rather than two whole sets of\r
   blobs, so there is no second set to place. */\r
.ll-bg-tile:nth-child(1) {\r
  left: -40%;\r
}\r
\r
.ll-bg-tile:nth-child(2) {\r
  right: -40%;\r
  animation-direction: reverse;\r
  animation-duration: 25s;\r
}\r
\r
.liquid-lyrics-transparent-controls {\r
  position: fixed;\r
  top: 0;\r
  right: 0;\r
  z-index: 2147483500;\r
  width: var(--ll-transparent-controls-width);\r
  height: var(--ll-transparent-controls-height);\r
  pointer-events: none;\r
  opacity: 0;\r
  backdrop-filter: brightness(2.12);\r
  -webkit-backdrop-filter: brightness(2.12);\r
  transition:\r
    opacity 260ms ease,\r
    width 250ms ease,\r
    height 250ms ease;\r
}\r
\r
.liquid-lyrics-header {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  z-index: 5;\r
  width: 100%;\r
  height: 72px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-start;\r
  flex-shrink: 0;\r
  padding: 32px clamp(28px, 6vw, 118px) 8px;\r
  pointer-events: none;\r
  /* Declared here rather than on the idle rule so the header fades in the same\r
     way it fades out \u2014 a transition that only exists in the hidden state makes\r
     the return snap. */\r
  transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.liquid-lyrics-title {\r
  font-size: 13px;\r
  font-weight: 800;\r
  line-height: 1;\r
  letter-spacing: 1.8px;\r
  text-transform: uppercase;\r
  color: rgba(255, 255, 255, 0.72);\r
  text-shadow: 0 1px 18px rgba(255, 255, 255, 0.12);\r
}\r
\r
/* GitHub star / Discord support links, top right of the header. */\r
.ll-header-actions {\r
  margin-left: auto;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  pointer-events: auto;\r
  /* Fullscreen lays these over Spotify's title bar, which is an Electron drag\r
     region: the window manager takes those clicks before the page sees them,\r
     leaving the overlapping part of a button dead. Only an explicit no-drag\r
     punches a hole in that region \u2014 the default value does not subtract from\r
     it. Same reason the theme's gear button sets this (settings/gear.ts). */\r
  -webkit-app-region: no-drag;\r
}\r
\r
.ll-header-btn {\r
  width: 34px;\r
  height: 34px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border: 0;\r
  border-radius: 12px;\r
  color: rgba(255, 255, 255, 0.72);\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  cursor: pointer;\r
  transition:\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    box-shadow 280ms ease,\r
    color 180ms ease,\r
    background 220ms ease !important;\r
}\r
\r
.ll-header-btn svg {\r
  width: 17px;\r
  height: 17px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-discord-btn svg {\r
  fill: currentColor;\r
  stroke: none;\r
}\r
\r
.ll-header-btn:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.08);\r
  transform: translate3d(0, -1px, 0) scale(1.04);\r
}\r
\r
.ll-github-btn:hover {\r
  color: #ffd75e;\r
}\r
\r
.ll-github-btn:hover svg {\r
  fill: currentColor;\r
}\r
\r
.ll-discord-btn:hover {\r
  color: #8ea1ff;\r
}\r
\r
.liquid-lyrics-view {\r
  position: relative;\r
  z-index: 2;\r
  width: 100%;\r
  height: 100%;\r
  flex: 1;\r
  min-height: 0;\r
  display: grid;\r
  grid-template-columns: var(--ll-card-col) minmax(360px, 1fr);\r
  align-items: center;\r
  justify-content: stretch;\r
  gap: clamp(22px, 3.8vw, 64px);\r
  padding: 86px clamp(24px, 5vw, 96px) 56px;\r
  transition:\r
    --ll-card-col 520ms cubic-bezier(0.16, 1, 0.3, 1),\r
    gap 520ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.liquid-lyrics-content {\r
  position: relative;\r
  z-index: 2;\r
  width: 100%;\r
  height: 100%;\r
  min-height: 0;\r
  overflow-y: auto;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  padding: 78px 42px 132px;\r
  scrollbar-width: thin;\r
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;\r
  /* Chrome's scroll anchoring tries to keep the view visually still when content\r
     is replaced, so it re-applied the previous song's offset the moment the\r
     placeholder rows were inserted \u2014 the placeholder then started off-screen\r
     above. Here the content is swapped wholesale on every track, so anchoring\r
     has nothing useful to preserve. */\r
  overflow-anchor: none;\r
  /* Both fade bands are user-sizable (settings \u2192 Lyrics). At 0% the stop pair\r
     collapses onto the edge, which is a hard cut \u2014 i.e. no fade at all. */\r
  mask-image: linear-gradient(\r
    to bottom,\r
    transparent 0,\r
    black var(--ll-fade-top, 11%),\r
    black calc(100% - var(--ll-fade-bottom, 18%)),\r
    transparent 100%\r
  );\r
  -webkit-mask-image: linear-gradient(\r
    to bottom,\r
    transparent 0,\r
    black var(--ll-fade-top, 11%),\r
    black calc(100% - var(--ll-fade-bottom, 18%)),\r
    transparent 100%\r
  );\r
}\r
\r
.liquid-lyrics-content::-webkit-scrollbar {\r
  width: 5px;\r
}\r
\r
.liquid-lyrics-content::-webkit-scrollbar-thumb {\r
  background: rgba(255, 255, 255, 0.22);\r
  border-radius: 999px;\r
  /* So the idle auto-hide can fade the thumb out instead of yanking the track's\r
     width to 0, which would reflow the lyrics every time. */\r
  transition: background 420ms ease;\r
}\r
\r
.liquid-lyrics-content::-webkit-scrollbar-track {\r
  background: transparent;\r
}\r
\r
/* Attribution block below the final lyric line. */\r
.liquid-lyrics-credits {\r
  width: 100%;\r
  max-width: 900px;\r
  margin-top: 30px;\r
  padding-top: 22px;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 4px;\r
  text-align: center;\r
  border-top: 1px solid rgba(255, 255, 255, 0.1);\r
  color: rgba(255, 255, 255, 0.5);\r
}\r
\r
.liquid-lyrics-credits .ll-credits-writers {\r
  font-size: 13px;\r
  font-weight: 650;\r
  line-height: 1.4;\r
  color: rgba(255, 255, 255, 0.62);\r
}\r
\r
.liquid-lyrics-credits .ll-credits-source {\r
  font-size: 11.5px;\r
  font-weight: 600;\r
  letter-spacing: 0.3px;\r
  text-transform: uppercase;\r
  color: rgba(255, 255, 255, 0.4);\r
}\r
\r
/* Compact variant inside the sidebar mini card. The bottom margin lifts the\r
   block clear of the viewport's bottom fade mask, which would otherwise blank\r
   it out entirely when scrolled to the end. */\r
.liquid-lyrics-sidebar-card .liquid-lyrics-credits {\r
  margin-top: 16px;\r
  margin-bottom: 34px;\r
  padding-top: 12px;\r
  gap: 3px;\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-credits .ll-credits-writers {\r
  font-size: 11.5px;\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-credits .ll-credits-source {\r
  font-size: 10px;\r
}\r
\r
.liquid-lyrics-empty {\r
  width: 100%;\r
  height: 100%;\r
  min-height: 240px;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 22px;\r
  padding: 42px;\r
  color: rgba(255, 255, 255, 0.56);\r
  font-size: 16px;\r
  font-weight: 650;\r
  line-height: 1.4;\r
  text-align: center;\r
}\r
\r
.ll-empty-create-btn {\r
  padding: 12px 22px;\r
  border: 0;\r
  --ll-control-radius: 14px;\r
  border-radius: 14px;\r
  color: #fff;\r
  font-size: 14px;\r
  font-weight: 750;\r
  letter-spacing: 0.2px;\r
  background: rgba(255, 255, 255, 0.1);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  cursor: pointer;\r
  transition:\r
    transform 260ms cubic-bezier(0.3, 2, 0.32, 1),\r
    background 200ms ease;\r
}\r
\r
.ll-empty-create-btn:hover {\r
  background: rgba(255, 255, 255, 0.16);\r
  transform: translate3d(0, -1px, 0) scale(1.03);\r
}\r
\r
.ll-empty-create-btn:active {\r
  transform: scale(0.96);\r
}\r
\r
@keyframes ll-fullscreen-bg-spin {\r
  from { transform: rotate(0deg); }\r
  to { transform: rotate(360deg); }\r
}\r
\r
@keyframes ll-song-card-enter {\r
  0% {\r
    opacity: 0;\r
    transform: translate3d(-24px, 22px, 0) scale(0.94);\r
  }\r
  72% {\r
    opacity: 1;\r
    transform: translate3d(2px, -3px, 0) scale(1.012);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0) scale(1);\r
  }\r
}\r
\r
@keyframes ll-lyrics-content-enter {\r
  0% {\r
    opacity: 0;\r
    transform: translate3d(18px, 24px, 0) scale(0.972);\r
    filter: blur(7px);\r
  }\r
  68% {\r
    opacity: 1;\r
    transform: translate3d(-1px, -3px, 0) scale(1.008);\r
    filter: blur(0);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0) scale(1);\r
    filter: blur(0);\r
  }\r
}\r
\r
@keyframes ll-title-enter {\r
  0% {\r
    opacity: 0;\r
    transform: translate3d(0, -10px, 0);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0);\r
  }\r
}\r
\r
@keyframes ll-fullscreen-view-enter {\r
  0% {\r
    opacity: 0.72;\r
    transform: translate3d(0, 24px, 0) scale(0.972);\r
    filter: blur(8px);\r
  }\r
  70% {\r
    opacity: 1;\r
    transform: translate3d(0, -3px, 0) scale(1.006);\r
    filter: blur(0);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0) scale(1);\r
    filter: blur(0);\r
  }\r
}\r
\r
/* --- 4. Song card -------------------------------------------------------------- */\r
\r
.liquid-lyrics-song-card {\r
  position: relative;\r
  align-self: center;\r
  justify-self: center;\r
  min-width: 0;\r
  width: min(100%, clamp(220px, min(25vw, calc(100vh - 320px)), 340px));\r
  max-width: 100%;\r
  max-height: calc(100% - 12px);\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  border-radius: 20px;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-song-card-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  transform: translate3d(0, 0, 0) scale(1);\r
  transform-origin: center left;\r
  opacity: 1;\r
  visibility: visible;\r
  transition:\r
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),\r
    visibility 420ms step-start,\r
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.liquid-lyrics-song-card::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  box-shadow: var(--liquid-lyrics-rim-shadow) !important;\r
  border-radius: inherit;\r
}\r
\r
.ll-song-card-cover-wrap {\r
  width: 100%;\r
  aspect-ratio: 1;\r
  flex: 0 0 auto;\r
  overflow: hidden;\r
  background: rgba(255, 255, 255, 0.06);\r
}\r
\r
.ll-song-card-cover {\r
  width: 100%;\r
  height: 100%;\r
  display: block;\r
  object-fit: cover;\r
}\r
\r
.ll-no-cover .ll-song-card-cover-wrap {\r
  background:\r
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03)),\r
    rgba(255, 255, 255, 0.06);\r
}\r
\r
.ll-song-card-controls {\r
  height: 60px;\r
  flex: 0 0 auto;\r
  display: grid;\r
  grid-template-columns: repeat(5, 1fr);\r
  align-items: center;\r
  gap: 2px;\r
  padding: 14px 16px 0;\r
}\r
\r
.ll-song-card-btn,\r
.ll-control-btn {\r
  width: 36px;\r
  height: 36px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  justify-self: center;\r
  padding: 0;\r
  border: 0;\r
  border-radius: 12px;\r
  color: rgba(255, 255, 255, 0.72);\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  cursor: pointer;\r
  /* Springy press feedback; !important so theme styles cannot flatten it. */\r
  transition:\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    box-shadow 280ms ease,\r
    color 180ms ease,\r
    background 220ms ease !important;\r
}\r
\r
.ll-song-card-btn svg,\r
.ll-control-btn svg {\r
  width: 20px;\r
  height: 20px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-song-card-play svg {\r
  fill: currentColor;\r
}\r
\r
.ll-song-card-btn:hover,\r
.ll-control-btn:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.08);\r
  transform: translate3d(0, -1px, 0) scale(1.04);\r
}\r
\r
.ll-song-card-btn:active,\r
.ll-control-btn:active,\r
.ll-header-btn:active {\r
  transform: scale(0.95) !important;\r
}\r
\r
.ll-song-card-btn.active,\r
.ll-control-btn.active {\r
  color: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-song-card-btn.ll-repeat-one {\r
  position: relative;\r
}\r
\r
.ll-song-card-btn.ll-repeat-one::after {\r
  content: "1";\r
  position: absolute;\r
  right: 7px;\r
  bottom: 6px;\r
  font-size: 8px;\r
  font-weight: 900;\r
  line-height: 1;\r
  color: currentColor;\r
}\r
\r
.ll-song-card-progress {\r
  width: 100%;\r
  min-width: 0;\r
  display: flex;\r
  align-items: center;\r
  gap: 9px;\r
  padding: 18px 20px 12px;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-card-time {\r
  color: rgba(255, 255, 255, 0.56);\r
  font-size: 10px;\r
  font-weight: 750;\r
  line-height: 1;\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.ll-card-progress-control {\r
  min-width: 0;\r
  flex: 1;\r
  height: 22px;\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.ll-card-progress-track {\r
  position: relative;\r
  flex: 1;\r
  height: 22px;\r
  overflow: visible;\r
  border-radius: 999px;\r
  background: transparent;\r
  cursor: pointer;\r
  outline: none;\r
}\r
\r
.ll-card-progress-bg {\r
  position: absolute;\r
  left: 0;\r
  right: 0;\r
  top: 50%;\r
  height: 4px;\r
  overflow: hidden;\r
  border-radius: 999px;\r
  background: rgba(255, 255, 255, 0.24);\r
  transform: translateY(-50%);\r
}\r
\r
/* Fill is scaled (compositor-only) instead of resized; JS writes the\r
   interpolated progress every frame, so no transition is needed. */\r
.ll-card-progress-fill {\r
  width: 100%;\r
  height: 100%;\r
  border-radius: inherit;\r
  background: rgba(255, 255, 255, 0.92);\r
  transform: scaleX(0);\r
  transform-origin: left center;\r
  will-change: transform;\r
}\r
\r
.ll-card-progress-thumb {\r
  position: absolute;\r
  z-index: 2;\r
  left: 0;\r
  top: 50%;\r
  width: 12px;\r
  height: 12px;\r
  border-radius: 50%;\r
  background: #fff;\r
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.32);\r
  opacity: 0;\r
  transform: translate3d(-50%, -50%, 0) scale(0.62);\r
  transition:\r
    opacity 120ms ease,\r
    transform 150ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.ll-card-preview-time {\r
  position: absolute;\r
  z-index: 3;\r
  left: 0;\r
  bottom: calc(100% + 7px);\r
  min-width: 42px;\r
  padding: 5px 8px;\r
  border-radius: 8px;\r
  color: rgba(255, 255, 255, 0.96);\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  font-size: 12px;\r
  font-weight: 800;\r
  line-height: 1;\r
  text-align: center;\r
  font-variant-numeric: tabular-nums;\r
  opacity: 0;\r
  pointer-events: none;\r
  transform: translate3d(-50%, 6px, 0) scale(0.96);\r
  transition:\r
    opacity 130ms ease,\r
    transform 160ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.ll-card-progress-track:hover .ll-card-progress-thumb,\r
.ll-card-progress-track:focus-visible .ll-card-progress-thumb,\r
.ll-card-progress-track.ll-previewing .ll-card-progress-thumb {\r
  opacity: 1;\r
  transform: translate3d(-50%, -50%, 0) scale(1);\r
}\r
\r
.ll-card-progress-track:hover .ll-card-preview-time,\r
.ll-card-progress-track:focus-visible .ll-card-preview-time,\r
.ll-card-progress-track.ll-previewing .ll-card-preview-time {\r
  opacity: 1;\r
  transform: translate3d(-50%, 0, 0) scale(1);\r
}\r
\r
.ll-song-card-info {\r
  padding: 8px 16px 18px;\r
  flex: 0 0 auto;\r
  text-align: center;\r
  min-width: 0;\r
}\r
\r
.ll-song-card-title,\r
.ll-song-card-link {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.ll-song-card-title {\r
  color: rgba(255, 255, 255, 0.96);\r
  font-size: 18px;\r
  font-weight: 800;\r
  line-height: 1.22;\r
}\r
\r
.ll-song-card-link {\r
  max-width: 100%;\r
  display: block;\r
  margin-left: auto;\r
  margin-right: auto;\r
  padding: 0;\r
  border: 0;\r
  color: rgba(255, 255, 255, 0.68);\r
  background: transparent;\r
  font-family: inherit;\r
  text-align: center;\r
  cursor: pointer;\r
}\r
\r
.ll-song-card-album {\r
  margin-top: 8px;\r
  color: rgba(255, 255, 255, 0.9);\r
  font-size: 15px;\r
  font-weight: 800;\r
  line-height: 1.25;\r
}\r
\r
.ll-song-card-artist {\r
  margin-top: 4px;\r
  color: rgba(255, 255, 255, 0.68);\r
  font-size: 13px;\r
  font-weight: 650;\r
  line-height: 1.25;\r
}\r
\r
.ll-song-card-link:hover:not(:disabled) {\r
  color: #fff;\r
  text-decoration: underline;\r
}\r
\r
.ll-song-card-link:disabled {\r
  cursor: default;\r
}\r
\r
.ll-song-card-hidden .liquid-lyrics-view {\r
  gap: 0;\r
}\r
\r
.ll-song-card-hidden .liquid-lyrics-song-card {\r
  opacity: 0;\r
  visibility: hidden;\r
  pointer-events: none;\r
  transform: translate3d(-22px, 0, 0) scale(0.96);\r
  transition:\r
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),\r
    visibility 420ms step-end,\r
    transform 520ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
/* --- 5. Control pill & tooltip -------------------------------------------------- */\r
\r
.liquid-lyrics-control-pill {\r
  position: absolute;\r
  z-index: 6;\r
  left: 50%;\r
  bottom: 28px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 8px;\r
  height: 54px;\r
  padding: 9px 12px;\r
  border-radius: 20px;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  opacity: 0;\r
  pointer-events: none;\r
  transform: translate3d(-50%, 28px, 0) scale(0.98);\r
  transition:\r
    opacity 280ms cubic-bezier(0.16, 1, 0.3, 1),\r
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
/* Liquify floating player mode: the bar floats over the bottom of the main view,\r
   so lift the pill clear of it. The offset matches the 7rem bottom clearance\r
   Liquify pads its own scroll containers with. */\r
.liquid-lyrics-panel.ll-liquify-floating-player .liquid-lyrics-control-pill {\r
  bottom: var(--ll-floating-player-offset, 7rem);\r
}\r
\r
/* Fullscreen detaches the panel from the layout, so the floating bar is not\r
   over it and the pill keeps its resting offset. */\r
.liquid-lyrics-panel.ll-liquify-floating-player:fullscreen .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-liquify-floating-player.ll-fullscreen-mode .liquid-lyrics-control-pill {\r
  bottom: 28px;\r
}\r
\r
.liquid-lyrics-panel:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel:focus-within .liquid-lyrics-control-pill {\r
  opacity: 1;\r
  pointer-events: auto;\r
  transform: translate3d(-50%, 0, 0) scale(1);\r
}\r
\r
.ll-control-btn {\r
  width: 38px;\r
  height: 38px;\r
}\r
\r
.ll-control-btn:disabled,\r
.ll-control-btn[hidden] {\r
  display: none;\r
}\r
\r
.liquid-lyrics-tooltip {\r
  position: fixed;\r
  z-index: 2147483647;\r
  left: 0;\r
  top: 0;\r
  padding: 7px 10px;\r
  border-radius: 8px;\r
  color: rgba(255, 255, 255, 0.94);\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  font-size: 13px;\r
  font-weight: 700;\r
  line-height: 1;\r
  white-space: nowrap;\r
  pointer-events: none;\r
  opacity: 0;\r
  transform: translate3d(-50%, -6px, 0) scale(0.96);\r
  transform-origin: center bottom;\r
  transition:\r
    opacity 140ms ease,\r
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.liquid-lyrics-tooltip.visible {\r
  opacity: 1;\r
  transform: translate3d(-50%, 0, 0) scale(1);\r
}\r
\r
\r
/* --- 6. Lyrics engine (shared) ---------------------------------------------------- */\r
\r
.liquid-lyrics-line {\r
  width: 100%;\r
  max-width: 900px;\r
  margin: 0;\r
  padding: 7px 0;\r
  position: relative;\r
  border: 0;\r
  appearance: none;\r
  cursor: pointer;\r
  color: transparent;\r
  font-family: inherit;\r
  /* Every context (fullscreen, the responsive breakpoints) sets --ll-line-size\r
     instead of font-size, so the user's scale multiplies whichever base applies\r
     rather than being overwritten by the next rule down. The sidebar card keeps\r
     its own font-size and is deliberately left out of the scaling. */\r
  --ll-line-size: 36px;\r
  font-size: calc(var(--ll-line-size) * var(--ll-font-scale, 1));\r
  font-weight: 800;\r
  line-height: 1.24;\r
  text-align: center;\r
  overflow-wrap: anywhere;\r
  word-break: normal;\r
  opacity: 0.28;\r
  transform: translate3d(0, 0, 0) scale(0.955);\r
  transform-origin: center;\r
  transition:\r
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),\r
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),\r
    filter 560ms cubic-bezier(0.16, 1, 0.3, 1);\r
  /* Resting value, mirroring @property's initial-value. The text is painted by\r
     this gradient alone (transparent fill + background-clip: text), so a\r
     --line-progress that resolves to nothing voids the whole background and the\r
     line turns fully invisible rather than merely unlit. Declaring it here keeps\r
     the line readable even if the state class is missing or @property never\r
     registered; .past/.future still override it. */\r
  --line-progress: -20;\r
  background: linear-gradient(\r
    to bottom,\r
    var(--ll-fill-bright, #fff) calc(var(--line-progress) * 1%),\r
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) calc((var(--line-progress) * 1%) + 20%),\r
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) 100%\r
  );\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
}\r
\r
/* Static lyrics carry no timeline, so onContainerClick can't seek to them \u2014 no\r
   hover highlight may claim otherwise. (.liquid-lyrics-static already parks the\r
   cursor at default.) */\r
.liquid-lyrics-line:hover:not(.liquid-lyrics-static) {\r
  opacity: 0.56;\r
}\r
\r
.liquid-lyrics-line.active {\r
  opacity: 1;\r
  transform: translate3d(0, -2px, 0) scale(1.07);\r
  will-change: transform, opacity;\r
}\r
\r
.liquid-lyrics-line.past {\r
  --line-progress: 100;\r
}\r
\r
.liquid-lyrics-line.future {\r
  --line-progress: -20;\r
}\r
\r
/* A line whose true end overlaps the next one: it keeps singing along, so it\r
   holds near-active presence \u2014 almost full opacity (the sung fill must stay\r
   white) and only one gentle scale step below active. The drop to the dim\r
   past look happens once it actually finishes. */\r
.liquid-lyrics-line.past.ll-outgoing {\r
  opacity: 0.92;\r
  transform: translate3d(0, -1px, 0) scale(1.02);\r
}\r
\r
.liquid-lyrics-line.ll-glow {\r
  filter:\r
    saturate(1.12)\r
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.32))\r
    drop-shadow(0 0 26px rgba(151, 208, 185, 0.2));\r
}\r
\r
/* Just-finished lines sweep their fill to 100% instead of snapping. */\r
.liquid-lyrics-line.ll-finishing {\r
  transition:\r
    --line-progress 560ms linear,\r
    opacity 520ms cubic-bezier(0.16, 1, 0.3, 1),\r
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1),\r
    filter 560ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
/* Word-synced lines paint through their word spans instead. */\r
.ll-syllable-line {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0.12em;\r
  background: none;\r
  -webkit-background-clip: border-box;\r
  background-clip: border-box;\r
  -webkit-text-fill-color: currentColor;\r
}\r
\r
.ll-vocal-line {\r
  display: block;\r
  width: 100%;\r
}\r
\r
.ll-background-vocal {\r
  font-size: 0.68em;\r
  font-weight: 700;\r
  line-height: 1.14;\r
  opacity: 0.72;\r
}\r
\r
.ll-context-romanized .ll-background-vocal {\r
  display: none;\r
}\r
\r
.ll-syllable {\r
  display: inline-block;\r
  position: relative;\r
  color: transparent;\r
  transform-origin: center bottom;\r
  transition:\r
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),\r
    filter 180ms ease;\r
  /* Resting value \u2014 see --line-progress on .liquid-lyrics-line. */\r
  --syl-progress: -20;\r
  background: linear-gradient(\r
    to right,\r
    var(--ll-fill-bright, #fff) calc(var(--syl-progress) * 1%),\r
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) calc((var(--syl-progress) * 1%) + 20%),\r
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) 100%\r
  );\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
}\r
\r
.ll-syllable:not(.LastWordInLine) {\r
  margin-right: 0.3ch;\r
}\r
\r
.liquid-lyrics-panel:not(.ll-romanized) .ll-cjk-syllable:not(.LastWordInLine),\r
.liquid-lyrics-sidebar-card:not([data-romanized="true"]) .ll-cjk-syllable:not(.LastWordInLine) {\r
  margin-right: 0.08ch;\r
}\r
\r
/* While singing, JS writes the target every frame; the short linear\r
   transition low-passes it into the soft, floaty bounce. */\r
.ll-syllable.singing {\r
  will-change: transform;\r
  transition:\r
    transform 120ms linear,\r
    filter 180ms ease;\r
}\r
\r
.ll-syllable.sung {\r
  --syl-progress: 100;\r
}\r
\r
.ll-syllable.future {\r
  --syl-progress: -20;\r
}\r
\r
/* Untouched words in finished/upcoming lines rest at their end states.\r
   Outgoing lines are excluded: they are already "past" visually but their\r
   words keep singing to their true end. */\r
.ll-syllable-line.past:not(.ll-outgoing) .ll-syllable {\r
  --syl-progress: 100;\r
}\r
\r
.ll-syllable-line.future .ll-syllable {\r
  --syl-progress: -20;\r
}\r
\r
.ll-finishing .ll-syllable {\r
  transition:\r
    --syl-progress 360ms linear,\r
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),\r
    filter 220ms ease;\r
}\r
\r
/* Long held words: the fill and lift travel per letter. */\r
.ll-long-syllable {\r
  white-space: nowrap;\r
  background: none;\r
}\r
\r
.ll-letter {\r
  display: inline-block;\r
  color: transparent;\r
  transform-origin: center bottom;\r
  /* Resting value \u2014 see --line-progress on .liquid-lyrics-line. */\r
  --letter-progress: -20;\r
  background: linear-gradient(\r
    to right,\r
    var(--ll-fill-bright, #fff) calc(var(--letter-progress) * 1%),\r
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) calc((var(--letter-progress) * 1%) + 20%),\r
    var(--ll-fill-dim, rgba(255, 255, 255, 0.32)) 100%\r
  );\r
  -webkit-background-clip: text;\r
  background-clip: text;\r
  -webkit-text-fill-color: transparent;\r
  /* Catches interrupted lifts (seeks, skips) and glides them back to rest. */\r
  transition: transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);\r
}\r
\r
/* Letters follow the JS-driven wave through a smoothing transition, so the\r
   lift eases in right at word start and never moves harshly. */\r
.ll-syllable.singing .ll-letter {\r
  will-change: transform;\r
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.ll-syllable.sung .ll-letter {\r
  --letter-progress: 100;\r
}\r
\r
.ll-syllable.future .ll-letter {\r
  --letter-progress: -20;\r
}\r
\r
.ll-syllable-line.past:not(.ll-outgoing) .ll-letter {\r
  --letter-progress: 100;\r
}\r
\r
.ll-syllable-line.future .ll-letter {\r
  --letter-progress: -20;\r
}\r
\r
.ll-finishing .ll-letter {\r
  transition:\r
    --letter-progress 360ms linear,\r
    transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);\r
}\r
\r
/* Interludes ----------------------------------------------------------------- */\r
\r
.liquid-lyrics-interlude {\r
  height: 0;\r
  min-height: 0;\r
  padding: 0;\r
  margin: 0;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 15px;\r
  cursor: pointer;\r
  opacity: var(--interlude-visibility);\r
  overflow: visible;\r
  background: none;\r
  transform: translate3d(0, var(--interlude-y, -24px), 0) scale(var(--interlude-scale, 0.72));\r
  transform-origin: center;\r
  -webkit-text-fill-color: currentColor;\r
  transition:\r
    height 560ms cubic-bezier(0.18, 1, 0.22, 1),\r
    padding 560ms cubic-bezier(0.18, 1, 0.22, 1),\r
    margin 560ms cubic-bezier(0.18, 1, 0.22, 1),\r
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),\r
    transform 560ms cubic-bezier(0.18, 1, 0.22, 1);\r
}\r
\r
.liquid-lyrics-interlude.active {\r
  height: 72px;\r
  padding: 22px 0;\r
  margin: 4px 0;\r
}\r
\r
.liquid-lyrics-interlude.ll-finishing {\r
  transition:\r
    height 520ms cubic-bezier(0.22, 0.8, 0.22, 1),\r
    padding 520ms cubic-bezier(0.22, 0.8, 0.22, 1),\r
    margin 520ms cubic-bezier(0.22, 0.8, 0.22, 1),\r
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),\r
    transform 520ms cubic-bezier(0.22, 0.8, 0.22, 1);\r
}\r
\r
.liquid-lyrics-interlude:hover {\r
  opacity: max(var(--interlude-visibility), 0.28);\r
}\r
\r
.ll-interlude-dot {\r
  width: 13px;\r
  height: 13px;\r
  display: inline-block;\r
  border-radius: 50%;\r
  background:\r
    radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.28) 62%),\r
    rgba(255, 255, 255, 0.24);\r
  opacity: 0.55;\r
  transform-origin: center;\r
  transition:\r
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),\r
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),\r
    background 360ms cubic-bezier(0.16, 1, 0.3, 1),\r
    filter 420ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
/* JS bounces the dots every frame while the interlude runs. */\r
.liquid-lyrics-interlude.active .ll-interlude-dot {\r
  transition:\r
    opacity 360ms cubic-bezier(0.16, 1, 0.3, 1),\r
    background 360ms cubic-bezier(0.16, 1, 0.3, 1),\r
    filter 420ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.ll-interlude-dot.lit {\r
  opacity: 1;\r
  background:\r
    radial-gradient(circle at 35% 28%, #fff, rgba(255, 255, 255, 0.78) 58%),\r
    rgba(255, 255, 255, 0.94);\r
  filter:\r
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.38))\r
    drop-shadow(0 0 24px rgba(151, 208, 185, 0.22));\r
}\r
\r
/* Finished interludes: dots drift up and fade with the container. */\r
.liquid-lyrics-interlude.past .ll-interlude-dot {\r
  transform: translateY(-24px);\r
  opacity: 0;\r
}\r
\r
/* Furigana ------------------------------------------------------------------------ */\r
\r
.liquid-lyrics-line ruby {\r
  ruby-align: center;\r
}\r
\r
/* Furigana annotations opt out of the karaoke gradient: the solid fill color\r
   overrides the transparent text-fill so they stay readable at any progress. */\r
.liquid-lyrics-line rt {\r
  font-size: 0.42em;\r
  line-height: 1.15;\r
  font-weight: 700;\r
  letter-spacing: 0;\r
  color: rgba(255, 255, 255, 0.55);\r
  -webkit-text-fill-color: rgba(255, 255, 255, 0.55);\r
}\r
\r
.liquid-lyrics-line.active rt {\r
  color: rgba(255, 255, 255, 0.8);\r
  -webkit-text-fill-color: rgba(255, 255, 255, 0.8);\r
}\r
\r
/* Ruby words keep the word-level fill; letter animation is disabled for them. */\r
.ll-ruby-syllable {\r
  white-space: nowrap;\r
}\r
\r
/* Static (unsynced) lyrics ------------------------------------------------------ */\r
\r
.liquid-lyrics-static {\r
  cursor: default;\r
  opacity: 0.96;\r
  color: rgba(255, 255, 255, 0.94);\r
  background: none;\r
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);\r
  transform: translate3d(0, 0, 0) scale(1);\r
}\r
\r
/* --- 7. Panel virtualizer -------------------------------------------------------- */\r
\r
.ll-syllable-virtual-space {\r
  position: relative;\r
  width: min(100%, 900px);\r
  max-width: 900px;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-syllable-virtual-row {\r
  position: absolute;\r
  left: 0;\r
  top: 0;\r
  width: 100%;\r
  will-change: transform;\r
}\r
\r
.ll-syllable-virtualized .liquid-lyrics-line {\r
  max-width: none;\r
}\r
\r
/* --- 8. Sidebar card --------------------------------------------------------------- */\r
\r
.liquid-lyrics-sidebar-card {\r
  width: 100%;\r
  min-width: 0;\r
  height: clamp(210px, 30vh, 360px);\r
  position: relative;\r
  overflow: hidden;\r
  border-radius: 20px;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  /* Expanding settles past its target and eases back \u2014 a soft overshoot, about a\r
     tenth, rather than the quarter the collapse button uses. */\r
  transition:\r
    height 520ms cubic-bezier(0.34, 1.4, 0.64, 1),\r
    opacity 300ms ease,\r
    transform 520ms cubic-bezier(0.34, 1.4, 0.64, 1);\r
  --ll-fill-bright: #fff;\r
  --ll-fill-dim: rgba(255, 255, 255, 0.42);\r
}\r
\r
.liquid-lyrics-sidebar-card.ll-hidden {\r
  display: none;\r
}\r
\r
.ll-sidebar-card-header,\r
.ll-sidebar-header-main,\r
.ll-sidebar-collapse-btn,\r
.ll-sidebar-island-btn {\r
  min-width: 0;\r
  border: 0;\r
  color: inherit;\r
  background: transparent;\r
  font: inherit;\r
  text-align: left;\r
  cursor: pointer;\r
}\r
\r
.ll-sidebar-card-header {\r
  height: 54px;\r
  display: grid;\r
  grid-template-columns: minmax(0, 1fr) auto auto;\r
  align-items: center;\r
  gap: 10px;\r
  padding: 0 14px;\r
}\r
\r
.ll-sidebar-card-header:hover {\r
  background-color: rgba(255, 255, 255, 0.09);\r
}\r
\r
.ll-sidebar-header-main {\r
  display: grid;\r
  grid-template-columns: 28px minmax(0, 1fr);\r
  align-items: center;\r
  gap: 10px;\r
  padding: 0;\r
}\r
\r
.ll-sidebar-card-icon {\r
  width: 28px;\r
  height: 28px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-sidebar-card-icon svg {\r
  width: 22px;\r
  height: 22px;\r
}\r
\r
.ll-sidebar-card-title {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  font-size: 15px;\r
  font-weight: 850;\r
}\r
\r
.ll-sidebar-collapse-btn {\r
  width: 28px;\r
  height: 28px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  --ll-control-radius: 10px;\r
  border-radius: 10px;\r
  transition: transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1) !important;\r
}\r
\r
.ll-sidebar-collapse-btn:hover {\r
  transform: scale(1.12);\r
}\r
\r
.ll-sidebar-collapse-btn:active {\r
  transform: scale(0.94);\r
}\r
\r
.ll-sidebar-card-chevron {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: rgba(255, 255, 255, 0.72);\r
  /* The chevron's quarter turn gets the same spring as the button, so the two\r
     halves of the collapse gesture move together. */\r
  transition: transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1) !important;\r
}\r
\r
.ll-sidebar-card-chevron svg {\r
  width: 18px;\r
  height: 18px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2.4;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
/* Collapsing springs the other way round: it winds up a few pixels taller\r
   before travelling down, instead of overshooting at the end.\r
   An end-overshoot would have to dip below the closed height, and the closed\r
   height *is* the header \u2014 so the card would eat into it, and clamping that away\r
   with min-height is what left the collapse looking flat before. Winding up has\r
   room to move, because the body it grows into is still there. */\r
.liquid-lyrics-sidebar-card.collapsed {\r
  height: 54px;\r
  transition:\r
    height 480ms cubic-bezier(0.45, -0.32, 0.6, 1),\r
    opacity 300ms ease,\r
    transform 480ms cubic-bezier(0.45, -0.32, 0.6, 1);\r
}\r
\r
.liquid-lyrics-sidebar-card.collapsed .ll-sidebar-card-chevron {\r
  transform: rotate(-90deg);\r
}\r
\r
.ll-sidebar-control-island {\r
  position: relative;\r
  z-index: 4;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 8px;\r
  height: 40px;\r
  padding: 4px 6px;\r
  border-radius: 14px;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
}\r
\r
.ll-sidebar-island-btn {\r
  width: 30px;\r
  height: 30px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border-radius: 12px;\r
  color: rgba(255, 255, 255, 0.72);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  transition:\r
    color 180ms ease,\r
    background-color 180ms ease;\r
}\r
\r
.ll-sidebar-island-btn svg {\r
  width: 18px;\r
  height: 18px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-sidebar-island-btn:hover,\r
.ll-sidebar-island-btn.active {\r
  color: var(--liquid-lyrics-accent);\r
  background-color: rgba(255, 255, 255, 0.08);\r
}\r
\r
.ll-sidebar-island-btn[hidden] {\r
  display: none;\r
}\r
\r
.ll-sidebar-card-body {\r
  position: relative;\r
  height: calc(100% - 54px);\r
  min-height: 0;\r
  padding: 0 0 14px;\r
  transform-origin: top center;\r
  /* The body rides the same spring, so the content settles with the card rather\r
     than lagging a beat behind it. */\r
  transition:\r
    opacity 280ms ease,\r
    transform 520ms cubic-bezier(0.34, 1.4, 0.64, 1);\r
}\r
\r
.liquid-lyrics-sidebar-card.collapsed .ll-sidebar-card-body {\r
  opacity: 0;\r
  pointer-events: none;\r
  transform: translate3d(0, -10px, 0) scale(0.985);\r
  /* Held at full opacity through the wind-up, so the card is still visibly full\r
     while it stretches, then cleared as it travels shut. */\r
  transition:\r
    opacity 260ms ease 120ms,\r
    transform 480ms cubic-bezier(0.45, -0.32, 0.6, 1);\r
}\r
\r
.ll-sidebar-mini-viewport {\r
  position: relative;\r
  height: 100%;\r
  min-height: 0;\r
  overflow-y: auto;\r
  /* See .liquid-lyrics-content \u2014 same reason. */\r
  overflow-anchor: none;\r
  scrollbar-width: thin;\r
  scrollbar-color: rgba(255, 255, 255, 0.34) transparent;\r
  mask-image: linear-gradient(to bottom, transparent 0, black 15%, black 82%, transparent 100%);\r
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 15%, black 82%, transparent 100%);\r
}\r
\r
.ll-sidebar-mini-viewport::-webkit-scrollbar {\r
  width: 5px;\r
}\r
\r
.ll-sidebar-mini-viewport::-webkit-scrollbar-thumb {\r
  border-radius: 999px;\r
  background: rgba(255, 255, 255, 0.34);\r
}\r
\r
.ll-sidebar-mini-viewport::-webkit-scrollbar-track {\r
  background: transparent;\r
}\r
\r
.ll-sidebar-mini-lines {\r
  min-height: 100%;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 22px 18px 0px;\r
}\r
\r
.ll-sidebar-mini-empty {\r
  margin: auto 0;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 14px;\r
  padding: 0 14px;\r
  color: rgba(255, 255, 255, 0.72);\r
  font-size: 15px;\r
  font-weight: 800;\r
  line-height: 1.25;\r
  text-align: center;\r
}\r
\r
.ll-sidebar-mini-create-btn {\r
  padding: 8px 16px;\r
  border: 0;\r
  border-radius: 12px;\r
  color: #fff;\r
  font-size: 12.5px;\r
  font-weight: 750;\r
  letter-spacing: 0.2px;\r
  background: rgba(255, 255, 255, 0.1);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  cursor: pointer;\r
  transition:\r
    transform 260ms cubic-bezier(0.3, 2, 0.32, 1),\r
    background-color 180ms ease;\r
}\r
\r
.ll-sidebar-mini-create-btn:hover {\r
  background: rgba(255, 255, 255, 0.16);\r
  transform: translate3d(0, -1px, 0) scale(1.03);\r
}\r
\r
.ll-sidebar-mini-create-btn:active {\r
  transform: scale(0.96);\r
}\r
\r
/* Sidebar lyric sizing & state overrides */\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-line {\r
  max-width: 100%;\r
  box-sizing: border-box;\r
  padding: 3px 8px;\r
  font-size: clamp(19px, 1.3vw, 25px);\r
  font-weight: 850;\r
  line-height: 1.16;\r
  word-break: break-word;\r
  hyphens: auto;\r
  opacity: 0.42;\r
  transform: translate3d(0, 0, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-sidebar-card[data-romanized="true"] .liquid-lyrics-line {\r
  font-size: clamp(16px, 1.05vw, 22px);\r
  line-height: 1.2;\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-line.active {\r
  opacity: 1;\r
  transform: translate3d(0, -1px, 0) scale(1.025);\r
  filter:\r
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.24))\r
    drop-shadow(0 0 20px rgba(151, 208, 185, 0.1));\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-line.active.ll-glow {\r
  filter:\r
    saturate(1.12)\r
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.34))\r
    drop-shadow(0 0 24px rgba(151, 208, 185, 0.18));\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-line.past:not(.active):not(.liquid-lyrics-interlude):not(.ll-outgoing) {\r
  opacity: 0.4;\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-line.past.ll-outgoing {\r
  opacity: 0.92;\r
  transform: translate3d(0, 0, 0) scale(1);\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-line.future:not(.active):not(.liquid-lyrics-interlude) {\r
  opacity: 0.3;\r
}\r
\r
/* Hover comes last and matches the resting state rules above in specificity, or\r
   they outrank it: .past already did on specificity, .future tied and won on\r
   source order alone, so hovering a synced line did nothing at all. Excludes\r
   .active \u2014 that line sits at full opacity and must not dim under the pointer.\r
   Seekable lines only; .liquid-lyrics-static can't be clicked. */\r
.liquid-lyrics-sidebar-card\r
  .liquid-lyrics-line:hover:not(.liquid-lyrics-interlude):not(.liquid-lyrics-static):not(.active) {\r
  opacity: 0.6;\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-syllable-line {\r
  display: block;\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-vocal-line {\r
  min-width: 0;\r
  max-width: 100%;\r
  text-align: center;\r
  white-space: normal;\r
  overflow-wrap: anywhere;\r
  word-break: break-word;\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-syllable {\r
  max-width: 100%;\r
  white-space: normal;\r
  overflow-wrap: anywhere;\r
  word-break: break-word;\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-syllable.singing {\r
  filter:\r
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.24))\r
    drop-shadow(0 0 18px rgba(151, 208, 185, 0.12));\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-long-syllable {\r
  background: none;\r
  white-space: normal;\r
  overflow-wrap: anywhere;\r
  word-break: break-word;\r
}\r
\r
/* The generic sidebar line sizing must not leak onto interludes: collapsed\r
   interludes stay at zero padding and their visibility is driven solely by\r
   the engine's --interlude-visibility, never by past/future dimming. */\r
.liquid-lyrics-sidebar-card .liquid-lyrics-interlude {\r
  gap: 10px;\r
  padding: 0;\r
  opacity: var(--interlude-visibility);\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-interlude.active {\r
  height: 46px;\r
  padding: 13px 0;\r
  margin: 1px 0;\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-interlude-dot {\r
  width: 9px;\r
  height: 9px;\r
}\r
\r
.liquid-lyrics-sidebar-card .liquid-lyrics-static,\r
.liquid-lyrics-sidebar-card .liquid-lyrics-static.past,\r
.liquid-lyrics-sidebar-card .liquid-lyrics-static.future {\r
  color: rgba(255, 255, 255, 0.94);\r
  background: none;\r
  -webkit-text-fill-color: rgba(255, 255, 255, 0.94);\r
  opacity: 0.96;\r
  filter: none;\r
}\r
\r
/* --- 9. Fullscreen modes ---------------------------------------------------------- */\r
\r
.liquid-lyrics-panel:fullscreen,\r
.liquid-lyrics-panel.ll-fullscreen-mode {\r
  width: 100vw;\r
  height: 100vh;\r
  background: transparent !important;\r
}\r
\r
.liquid-lyrics-panel.ll-fullscreen-mode,\r
.liquid-lyrics-panel:fullscreen {\r
  position: fixed !important;\r
  inset: 0 !important;\r
  z-index: 2147483000;\r
  display: flex !important;\r
  border-radius: 0;\r
}\r
\r
.liquid-lyrics-panel:fullscreen .liquid-lyrics-bg,\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-bg {\r
  opacity: 1;\r
  position: fixed;\r
  inset: 0;\r
  background: black;\r
}\r
\r
/* Only cinema mode (and the editor) overlay Spotify's real window controls, so\r
   only they need the brightening patch. Native fullscreen hides the window\r
   frame \u2014 there are no controls to keep visible there. */\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-transparent-controls,\r
.liquid-lyrics-editor.visible .liquid-lyrics-transparent-controls {\r
  opacity: 1;\r
}\r
\r
/* Cinema mode lays the panel over the whole window, so the header actions land\r
   under Spotify's window controls in the top-right corner. Pull them clear of\r
   that strip \u2014 max() so a small configured strip can never pull them further\r
   right than the header's normal padding. Native fullscreen has no such strip,\r
   so it keeps the header's normal padding. */\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-header {\r
  padding-right: max(\r
    clamp(28px, 6vw, 118px),\r
    calc(var(--ll-transparent-controls-width, 135px) + 20px)\r
  );\r
}\r
\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
  animation: ll-fullscreen-view-enter 560ms cubic-bezier(0.18, 1, 0.22, 1) both;\r
}\r
\r
.liquid-lyrics-panel.ll-fullscreen-mode:not(.ll-song-card-hidden) .liquid-lyrics-song-card {\r
  animation: ll-song-card-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;\r
}\r
\r
.liquid-lyrics-panel:fullscreen::backdrop {\r
  background: transparent;\r
}\r
\r
.liquid-lyrics-panel:fullscreen,\r
.liquid-lyrics-panel.ll-fullscreen-mode {\r
  --ll-card-col: 545px;\r
}\r
\r
.liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
  grid-template-columns: var(--ll-card-col) minmax(540px, 1fr);\r
  gap: clamp(34px, 4.6vw, 104px);\r
  padding: 84px clamp(42px, 5vw, 104px) 58px;\r
}\r
\r
.liquid-lyrics-panel:fullscreen:not(.ll-song-card-hidden) .liquid-lyrics-content,\r
.liquid-lyrics-panel.ll-fullscreen-mode:not(.ll-song-card-hidden) .liquid-lyrics-content {\r
  align-items: center;\r
  padding-left: clamp(22px, 3vw, 72px);\r
  padding-right: clamp(22px, 3vw, 72px);\r
}\r
\r
\r
.liquid-lyrics-panel:fullscreen .liquid-lyrics-line,\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {\r
  max-width: min(980px, 100%);\r
  --ll-line-size: 42px;\r
}\r
\r
/* --- 10. Responsive -------------------------------------------------------------- */\r
\r
@media (max-height: 820px) {\r
  .liquid-lyrics-panel,\r
  .liquid-lyrics-panel:fullscreen,\r
  .liquid-lyrics-panel.ll-fullscreen-mode {\r
    --ll-card-col: clamp(200px, 25vw, 310px);\r
  }\r
\r
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    grid-template-columns: var(--ll-card-col) minmax(340px, 1fr);\r
    gap: clamp(8px, 1.8vw, 28px);\r
    padding-top: 72px;\r
    padding-bottom: 42px;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    width: min(100%, clamp(210px, min(23vw, calc(100vh - 310px)), 310px));\r
  }\r
\r
  .ll-song-card-controls {\r
    height: 52px;\r
    padding-top: 10px;\r
  }\r
\r
  .ll-song-card-info {\r
    padding-bottom: 14px;\r
  }\r
}\r
\r
@media (max-height: 680px) {\r
  .liquid-lyrics-panel,\r
  .liquid-lyrics-panel:fullscreen,\r
  .liquid-lyrics-panel.ll-fullscreen-mode {\r
    --ll-card-col: clamp(180px, 23vw, 260px);\r
  }\r
\r
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    grid-template-columns: var(--ll-card-col) minmax(320px, 1fr);\r
    gap: clamp(6px, 1.4vw, 22px);\r
    padding-top: 56px;\r
    padding-bottom: 34px;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    width: min(100%, clamp(190px, min(22vw, calc(100vh - 300px)), 260px));\r
    border-radius: 16px;\r
  }\r
\r
  /* Narrow panels shrink the buttons, but not their corners \u2014 the radius is\r
     fixed at 12px everywhere. */\r
  .ll-song-card-btn {\r
    width: 32px;\r
    height: 32px;\r
  }\r
\r
  .ll-song-card-title {\r
    font-size: 15px;\r
  }\r
}\r
\r
@media (max-width: 1120px), (max-height: 560px) {\r
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    grid-template-columns: minmax(0, 1fr);\r
    gap: 0;\r
    padding: 72px clamp(24px, 5vw, 68px) 54px;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    display: none;\r
  }\r
\r
  .liquid-lyrics-content {\r
    padding: 70px clamp(18px, 5vw, 64px) 124px;\r
  }\r
\r
  .liquid-lyrics-line,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-line,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {\r
    max-width: 900px;\r
    --ll-line-size: clamp(27px, 4vw, 38px);\r
  }\r
}\r
\r
@container (max-width: 1120px) {\r
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    grid-template-columns: minmax(0, 1fr);\r
    gap: 0;\r
    padding: 72px clamp(24px, 5vw, 68px) 54px;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    display: none;\r
  }\r
\r
  .liquid-lyrics-content {\r
    padding: 70px clamp(18px, 5vw, 64px) 124px;\r
  }\r
\r
  .liquid-lyrics-line,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-line,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {\r
    max-width: 900px;\r
    --ll-line-size: clamp(27px, 4vw, 38px);\r
  }\r
}\r
\r
@media (max-width: 720px) {\r
  .liquid-lyrics-header {\r
    height: 64px;\r
    padding: 16px 22px 6px;\r
  }\r
\r
  .liquid-lyrics-view {\r
    grid-template-columns: minmax(0, 1fr);\r
    gap: 0;\r
    padding: 0;\r
    width: 100%;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    display: none;\r
  }\r
\r
  .liquid-lyrics-content {\r
    padding: 48px 24px 98px;\r
  }\r
\r
  .liquid-lyrics-line {\r
    --ll-line-size: 25px;\r
    line-height: 1.28;\r
  }\r
\r
  .liquid-lyrics-line.active {\r
    transform: translate3d(0, -1px, 0) scale(1.045);\r
  }\r
\r
  .ll-interlude-dot {\r
    width: 11px;\r
    height: 11px;\r
  }\r
\r
  .liquid-lyrics-control-pill {\r
    bottom: 18px;\r
  }\r
}\r
\r
/* Kept last so hiding the song card always wins over the responsive and\r
   fullscreen column-width assignments above. */\r
.liquid-lyrics-panel.ll-song-card-hidden,\r
.liquid-lyrics-panel:fullscreen.ll-song-card-hidden,\r
.liquid-lyrics-panel.ll-fullscreen-mode.ll-song-card-hidden {\r
  --ll-card-col: 0px;\r
}\r
\r
/* --- 11. Sync editor ---------------------------------------------------------- */\r
\r
.liquid-lyrics-editor {\r
  --ll-editor-accent: var(--liquid-lyrics-accent);\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483400;\r
  display: flex;\r
  opacity: 0;\r
  visibility: hidden;\r
  pointer-events: none;\r
  transition: opacity 260ms ease, visibility 0s linear 260ms;\r
}\r
\r
.liquid-lyrics-editor.visible {\r
  opacity: 1;\r
  visibility: visible;\r
  pointer-events: auto;\r
  transition: opacity 260ms ease;\r
}\r
\r
/* Spotify's title bar is an Electron drag region, and the window manager takes\r
   those clicks before the page ever sees them \u2014 being painted on top does not\r
   help. On a small window the shell's top gutter shrinks until the header row\r
   sits inside that strip, and its buttons go dead. Only an explicit no-drag\r
   subtracts from the region (the default value does not), so every editor\r
   surface that can reach the top of the window declares it. Same fix as\r
   .ll-header-actions. */\r
.liquid-lyrics-editor,\r
.ll-editor-auth,\r
.ll-editor-confirm,\r
.ll-editor-submissions {\r
  -webkit-app-region: no-drag;\r
}\r
\r
.ll-editor-glass-bg {\r
  position: absolute;\r
  inset: 0;\r
  background: rgba(8, 8, 12, 0.72);\r
  backdrop-filter: blur(34px) saturate(1.2);\r
  -webkit-backdrop-filter: blur(34px) saturate(1.2);\r
}\r
\r
.ll-editor-shell {\r
  position: relative;\r
  z-index: 1;\r
  margin: auto;\r
  width: min(1080px, 94vw);\r
  height: min(92vh, 940px);\r
  display: flex;\r
  flex-direction: column;\r
  padding: 22px clamp(18px, 3vw, 34px) 18px;\r
  border-radius: 26px;\r
  background: rgba(255, 255, 255, 0.04);\r
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 30px 90px rgba(0, 0, 0, 0.55);\r
  transform: translateY(14px) scale(0.985);\r
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.liquid-lyrics-editor.visible .ll-editor-shell {\r
  transform: translateY(0) scale(1);\r
}\r
\r
/* Header */\r
.ll-editor-header {\r
  display: flex;\r
  align-items: center;\r
  gap: 18px;\r
  flex-shrink: 0;\r
  /* Spotify paints its own window controls over the window's top-right corner,\r
     above this overlay, and swallows the clicks underneath them. The gap the\r
     header has to keep is measured from the real shell rect in JS\r
     (updateControlsInset) \u2014 a CSS formula would have to restate the shell's\r
     width and would drift the moment a breakpoint changes it. */\r
  padding-right: var(--ll-editor-controls-inset, 0px);\r
  transition: padding-right 180ms ease;\r
}\r
\r
.ll-editor-title-group {\r
  min-width: 0;\r
}\r
\r
.ll-editor-title {\r
  margin: 0;\r
  font-size: 18px;\r
  font-weight: 800;\r
  letter-spacing: 0.4px;\r
  color: #fff;\r
}\r
\r
.ll-editor-song {\r
  margin-top: 2px;\r
  font-size: 12.5px;\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.55);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  max-width: 320px;\r
}\r
\r
.ll-editor-mode-switch {\r
  margin-left: 8px;\r
  display: inline-flex;\r
  padding: 4px;\r
  gap: 3px;\r
  border-radius: 13px;\r
  background: rgba(255, 255, 255, 0.06);\r
}\r
\r
.ll-editor-mode-btn {\r
  padding: 7px 16px;\r
  border: 0;\r
  --ll-control-radius: 10px;\r
  border-radius: 10px;\r
  color: rgba(255, 255, 255, 0.62);\r
  font-size: 13px;\r
  font-weight: 750;\r
  background: transparent;\r
  cursor: pointer;\r
  transition: color 160ms ease, background 200ms ease;\r
}\r
\r
.ll-editor-mode-btn:hover {\r
  color: #fff;\r
}\r
\r
.ll-editor-mode-btn.active {\r
  color: #06120a;\r
  background: var(--ll-editor-accent);\r
}\r
\r
.ll-editor-header-actions {\r
  margin-left: auto;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
/* Nothing in the header may be squeezed below its own size: a flex item that\r
   shrinks keeps its icon at full size but loses box width, so the drawn button\r
   and its clickable area stop lining up. The title group (min-width: 0) is the\r
   one part that gives way; everything else is rigid and the labels collapse to\r
   icons at the breakpoints further down instead. */\r
.ll-editor-mode-switch,\r
.ll-editor-header-actions,\r
.ll-editor-header-actions > *,\r
.ll-editor-account-chip,\r
.ll-editor-submissions-btn,\r
.ll-editor-save-btn,\r
.ll-editor-icon-btn {\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-btn-label {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
/* Community account chip + "My submissions" (header) \u2014 glass surface with the\r
   theme's rim like the other buttons. */\r
.ll-editor-account-chip,\r
.ll-editor-submissions-btn {\r
  position: relative;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 7px;\r
  max-width: 180px;\r
  height: 38px;\r
  padding: 0 12px;\r
  border: 0;\r
  border-radius: 12px;\r
  color: rgba(255, 255, 255, 0.72);\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  font: inherit;\r
  font-size: 13px;\r
  font-weight: 700;\r
  cursor: pointer;\r
  transition:\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    box-shadow 280ms ease,\r
    color 180ms ease,\r
    background 220ms ease;\r
}\r
\r
.ll-editor-account-chip::after,\r
.ll-editor-submissions-btn::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
.ll-editor-account-chip:hover,\r
.ll-editor-submissions-btn:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.1);\r
  transform: translate3d(0, -1px, 0) scale(1.04);\r
}\r
\r
.ll-editor-account-chip:active,\r
.ll-editor-submissions-btn:active {\r
  transform: scale(0.96);\r
}\r
\r
.ll-editor-account-chip.is-authed {\r
  color: var(--ll-editor-accent);\r
}\r
\r
.ll-editor-submissions-btn {\r
  max-width: none;\r
  white-space: nowrap;\r
}\r
\r
.ll-editor-submissions-btn-icon {\r
  display: inline-flex;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-submissions-btn-icon svg {\r
  width: 17px;\r
  height: 17px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-editor-account-icon {\r
  display: inline-flex;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-account-icon svg {\r
  width: 17px;\r
  height: 17px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-editor-account-name {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
/* Publish menu item accent */\r
.ll-editor-menu-accent {\r
  color: var(--ll-editor-accent);\r
  font-weight: 750;\r
}\r
\r
.ll-editor-menu-accent:hover {\r
  background: rgba(255, 255, 255, 0.08);\r
  color: var(--ll-editor-accent);\r
}\r
\r
/* Login / register dialog */\r
.ll-editor-auth {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483450;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 24px;\r
  /* Only the dim scrim fades (background-color), and NOT via opacity. The overlay\r
     gets no backdrop-filter of its own: animating a blur radius stutters, and an\r
     overlay blur would nest with the dialog's glass and flatten it. The glass +\r
     blur lives on the dialog, which then samples the real (dimmed) app behind it.\r
     No opacity anywhere in the fade, so the glass never renders black mid-fade. */\r
  background: rgba(0, 0, 0, 0);\r
  transition: background 240ms ease;\r
}\r
\r
.ll-editor-auth.visible {\r
  background: rgba(0, 0, 0, 0.42);\r
}\r
\r
.ll-editor-auth-dialog {\r
  position: relative;\r
  width: min(380px, 92vw);\r
  padding: 24px;\r
  border-radius: 20px;\r
  background: rgba(255, 255, 255, 0.05);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 24px 70px rgba(0, 0, 0, 0.5);\r
  outline: var(--glowify-outline, none) !important;\r
  /* Enter/exit copied from Liquify's settings panel. The dialog animates its OWN\r
     opacity + transform (never an ancestor's), and will-change promotes it to a\r
     compositor layer so the glass is composited once, not re-sampled per frame -\r
     that's what makes it smooth AND non-black (only ANCESTOR opacity over a\r
     backdrop-filter child renders black; own-element opacity is fine). */\r
  opacity: 0;\r
  transform: translateY(8px) scale(0.94);\r
  transform-origin: top center;\r
  will-change: transform, opacity;\r
  transition:\r
    transform 260ms cubic-bezier(0.8, 0, 0.2, 1),\r
    opacity 220ms ease-in;\r
}\r
\r
.ll-editor-auth.visible .ll-editor-auth-dialog {\r
  opacity: 1;\r
  transform: translateY(0) scale(1);\r
  transition:\r
    transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1),\r
    opacity 360ms ease-out;\r
}\r
\r
.ll-editor-auth-dialog::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
.ll-editor-auth-title {\r
  margin: 0 0 4px;\r
  font-size: 19px;\r
  font-weight: 800;\r
  text-align: center;\r
  color: #fff;\r
}\r
\r
.ll-editor-auth-subtitle {\r
  margin: 0 0 18px;\r
  font-size: 13px;\r
  line-height: 1.4;\r
  text-align: center;\r
  color: rgba(255, 255, 255, 0.55);\r
}\r
\r
.ll-editor-auth-form {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 12px;\r
}\r
\r
.ll-editor-auth-field {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
\r
.ll-editor-auth-label {\r
  font-size: 12px;\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.6);\r
}\r
\r
.ll-editor-auth-input {\r
  height: 42px;\r
  padding: 0 13px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  --ll-control-radius: 11px;\r
  border-radius: 11px;\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.05);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  font: inherit;\r
  font-size: 14px;\r
  transition: border-color 160ms ease, background 160ms ease;\r
}\r
\r
.ll-editor-auth-input:hover {\r
  background: rgba(255, 255, 255, 0.08);\r
}\r
\r
.ll-editor-auth-input:focus {\r
  outline: none;\r
  border-color: var(--liquid-lyrics-accent);\r
  background: rgba(255, 255, 255, 0.09);\r
}\r
\r
.ll-editor-auth-error {\r
  min-height: 16px;\r
  font-size: 12.5px;\r
  font-weight: 600;\r
  line-height: 1.3;\r
  color: #ff8a8a;\r
}\r
\r
.ll-editor-auth-btn {\r
  position: relative;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  text-align: center;\r
  height: 42px;\r
  border: 0;\r
  border-radius: 12px;\r
  font: inherit;\r
  font-size: 14px;\r
  font-weight: 800;\r
  cursor: pointer;\r
  transition:\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    box-shadow 280ms ease,\r
    filter 200ms ease,\r
    background 220ms ease;\r
}\r
\r
/* Theme rim, like the other glass buttons. */\r
.ll-editor-auth-btn::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
.ll-editor-auth-btn:hover:not(:disabled) {\r
  transform: translate3d(0, -1px, 0) scale(1.03);\r
}\r
\r
.ll-editor-auth-btn:active {\r
  transform: scale(0.95);\r
}\r
\r
.ll-editor-auth-btn:disabled {\r
  opacity: 0.6;\r
  cursor: default;\r
}\r
\r
.ll-editor-auth-primary {\r
  color: #06120a;\r
  background: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-editor-auth-primary:hover:not(:disabled) {\r
  filter: brightness(1.08);\r
}\r
\r
.ll-editor-auth-secondary {\r
  color: rgba(255, 255, 255, 0.85);\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
}\r
\r
.ll-editor-auth-secondary:hover {\r
  background: rgba(255, 255, 255, 0.12);\r
}\r
\r
.ll-editor-auth-toggle {\r
  margin-top: 2px;\r
  padding: 6px;\r
  border: 0;\r
  --ll-control-radius: 8px;\r
  border-radius: 8px;\r
  color: rgba(255, 255, 255, 0.6);\r
  background: transparent;\r
  font: inherit;\r
  font-size: 12.5px;\r
  font-weight: 650;\r
  cursor: pointer;\r
  transition: color 160ms ease;\r
}\r
\r
.ll-editor-auth-toggle:hover {\r
  color: #fff;\r
}\r
\r
.ll-editor-auth-actions {\r
  display: flex;\r
  gap: 10px;\r
  margin-top: 4px;\r
}\r
\r
.ll-editor-auth-actions .ll-editor-auth-btn {\r
  flex: 1;\r
}\r
\r
/* Report dialog reasons + detail */\r
.ll-report-reasons {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 8px;\r
  margin-bottom: 12px;\r
}\r
\r
.ll-report-reason {\r
  padding: 9px 14px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 11px;\r
  color: rgba(255, 255, 255, 0.78);\r
  background: rgba(255, 255, 255, 0.05);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  font: inherit;\r
  font-size: 12.5px;\r
  font-weight: 650;\r
  cursor: pointer;\r
  transition:\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    background 200ms ease,\r
    color 160ms ease,\r
    border-color 160ms ease;\r
}\r
\r
.ll-report-reason:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.09);\r
  transform: translate3d(0, -1px, 0) scale(1.03);\r
}\r
\r
.ll-report-reason:active {\r
  transform: scale(0.96);\r
}\r
\r
.ll-report-reason.selected {\r
  color: #06120a;\r
  background: var(--liquid-lyrics-accent);\r
  border-color: transparent;\r
}\r
\r
.ll-report-detail {\r
  width: 100%;\r
  margin-bottom: 12px;\r
  padding: 10px 12px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 11px;\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.05);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  font: inherit;\r
  font-size: 13.5px;\r
  line-height: 1.4;\r
  min-height: 55px;\r
  resize: vertical;\r
}\r
\r
.ll-report-detail:focus {\r
  outline: none;\r
  border-color: var(--liquid-lyrics-accent);\r
}\r
\r
/* Review mode bar (moderators) */\r
.ll-review-bar {\r
  position: absolute;\r
  z-index: 7;\r
  left: 50%;\r
  top: 84px;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  height: 48px;\r
  padding: 8px 12px;\r
  border-radius: 16px;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  animation: ll-review-bar-in 320ms cubic-bezier(0.16, 1, 0.3, 1) both;\r
}\r
\r
@keyframes ll-review-bar-in {\r
  from { transform: translate3d(-50%, -12px, 0); }\r
  to { transform: translate3d(-50%, 0, 0); }\r
}\r
\r
.ll-review-status {\r
  padding: 0 8px;\r
  font-size: 13px;\r
  font-weight: 700;\r
  white-space: nowrap;\r
  color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.ll-review-bar button {\r
  position: relative;\r
  height: 34px;\r
  padding: 0 14px;\r
  border: 0;\r
  --ll-control-radius: 11px;\r
  border-radius: 11px;\r
  color: rgba(255, 255, 255, 0.85);\r
  background: rgba(255, 255, 255, 0.08);\r
  font: inherit;\r
  font-size: 13px;\r
  font-weight: 750;\r
  cursor: pointer;\r
  transition:\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    background 200ms ease,\r
    filter 180ms ease;\r
}\r
\r
/* Theme rim, like the other glass buttons. */\r
.ll-review-bar button::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
.ll-review-bar button:hover {\r
  background: rgba(255, 255, 255, 0.16);\r
  transform: translate3d(0, -1px, 0) scale(1.04);\r
}\r
\r
.ll-review-bar button:active {\r
  transform: scale(0.95);\r
}\r
\r
.ll-review-nav {\r
  width: 34px;\r
  padding: 0 !important;\r
  font-size: 18px !important;\r
  line-height: 1;\r
}\r
\r
.ll-review-approve {\r
  color: #06120a !important;\r
  background: var(--liquid-lyrics-accent) !important;\r
}\r
\r
.ll-review-approve:hover {\r
  filter: brightness(1.08);\r
}\r
\r
.ll-review-reject {\r
  color: #ff8a8a !important;\r
  background: rgba(255, 107, 107, 0.16) !important;\r
}\r
\r
.ll-review-reject:hover {\r
  background: rgba(255, 107, 107, 0.26) !important;\r
}\r
\r
.ll-review-exit {\r
  color: rgba(255, 255, 255, 0.7) !important;\r
  background: transparent !important;\r
}\r
\r
.ll-review-exit:hover {\r
  color: #fff !important;\r
  background: rgba(255, 255, 255, 0.1) !important;\r
}\r
\r
.ll-editor-icon-btn {\r
  width: 38px;\r
  height: 38px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border: 0;\r
  border-radius: 12px;\r
  color: rgba(255, 255, 255, 0.72);\r
  background: rgba(255, 255, 255, 0.06);\r
  cursor: pointer;\r
  transition: color 160ms ease, background 200ms ease, transform 200ms ease;\r
}\r
\r
.ll-editor-icon-btn:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.12);\r
}\r
\r
.ll-editor-icon-btn:active {\r
  transform: scale(0.94);\r
}\r
\r
.ll-editor-save-btn {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 9px 18px 9px 14px;\r
  border: 0;\r
  border-radius: 12px;\r
  color: #06120a;\r
  font-size: 13.5px;\r
  font-weight: 800;\r
  background: var(--ll-editor-accent);\r
  cursor: pointer;\r
  transition: transform 220ms cubic-bezier(0.3, 2, 0.32, 1), filter 200ms ease;\r
}\r
\r
.ll-editor-save-btn:hover {\r
  filter: brightness(1.08);\r
  transform: translate3d(0, -1px, 0);\r
}\r
\r
.ll-editor-save-btn:active {\r
  transform: scale(0.97);\r
}\r
\r
.ll-editor-icon-btn svg,\r
.ll-editor-save-btn svg,\r
.ll-editor-play-btn svg,\r
.ll-editor-line-btn svg {\r
  width: 18px;\r
  height: 18px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
/* Menu popover */\r
.ll-editor-menu-wrap {\r
  position: relative;\r
}\r
\r
.ll-editor-menu {\r
  position: absolute;\r
  top: calc(100% + 10px);\r
  right: 0;\r
  z-index: 20;\r
  min-width: 205px;\r
  display: none;\r
  flex-direction: column;\r
  padding: 10px;\r
  border-radius: 14px;\r
  /* Glass surface like the tooltip, not a flat grey slab. */\r
  background: rgba(20, 20, 26, 0.4);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 18px 50px rgba(0, 0, 0, 0.45);\r
  outline: var(--glowify-outline, none) !important;\r
}\r
\r
.ll-editor-menu.open {\r
  display: flex;\r
}\r
\r
.ll-editor-menu-item {\r
  padding: 10px 12px;\r
  border: 0;\r
  border-radius: 9px;\r
  color: rgba(255, 255, 255, 0.82);\r
  font-size: 13px;\r
  font-weight: 600;\r
  text-align: center;\r
  background: transparent;\r
  cursor: pointer;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    background 0.28s ease,\r
    color 0.2s ease;\r
}\r
\r
.ll-editor-menu-item:hover {\r
  background: rgba(255, 255, 255, 0.08);\r
  color: #fff;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  transform: scale(1.03);\r
}\r
\r
.ll-editor-menu-danger {\r
  color: #ff8a8a;\r
}\r
\r
.ll-editor-menu-danger:hover {\r
  background: rgba(255, 80, 80, 0.14);\r
  color: #ff8a8a;\r
}\r
\r
/* Steps */\r
.ll-editor-steps {\r
  display: inline-flex;\r
  align-self: center;\r
  margin: 16px 0 4px;\r
  padding: 4px;\r
  gap: 3px;\r
  border-radius: 13px;\r
  background: rgba(255, 255, 255, 0.05);\r
  flex-shrink: 0;\r
}\r
\r
.ll-editor-step-btn {\r
  padding: 8px 20px;\r
  border: 0;\r
  --ll-control-radius: 10px;\r
  border-radius: 10px;\r
  color: rgba(255, 255, 255, 0.6);\r
  font-size: 13px;\r
  font-weight: 700;\r
  background: transparent;\r
  cursor: pointer;\r
  transition: color 160ms ease, background 200ms ease;\r
}\r
\r
.ll-editor-step-btn:hover {\r
  color: #fff;\r
}\r
\r
.ll-editor-step-btn.active {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.12);\r
}\r
\r
/* Body */\r
.ll-editor-body {\r
  flex: 1;\r
  min-height: 0;\r
  display: flex;\r
  margin-top: 12px;\r
}\r
\r
.ll-editor-body > * {\r
  flex: 1;\r
  min-height: 0;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
/* Text stage */\r
.ll-editor-hint {\r
  padding: 12px 16px;\r
  border-radius: 12px;\r
  background: rgba(255, 255, 255, 0.05);\r
  color: rgba(255, 255, 255, 0.66);\r
  font-size: 12.5px;\r
  line-height: 1.55;\r
  text-align: center;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-hint b {\r
  color: var(--ll-editor-accent);\r
  font-weight: 750;\r
}\r
\r
.ll-editor-textarea {\r
  flex: 1;\r
  min-height: 0;\r
  margin-top: 12px;\r
  padding: 18px 20px;\r
  resize: none;\r
  border: 1px solid rgba(255, 255, 255, 0.08);\r
  border-radius: 16px;\r
  color: #f4f4f6;\r
  font-size: 15px;\r
  line-height: 1.75;\r
  font-family: inherit;\r
  background: rgba(0, 0, 0, 0.25);\r
  outline: none;\r
  scrollbar-width: thin;\r
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;\r
  transition: border-color 180ms ease;\r
}\r
\r
.ll-editor-textarea:focus {\r
  border-color: var(--ll-editor-accent);\r
}\r
\r
.ll-editor-credit-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  margin-top: 12px;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-credit-label {\r
  flex: 0 0 auto;\r
  font-size: 12.5px;\r
  font-weight: 700;\r
  letter-spacing: 0.2px;\r
  color: rgba(255, 255, 255, 0.5);\r
}\r
\r
.ll-editor-credit-input {\r
  flex: 1;\r
  min-width: 0;\r
  padding: 9px 14px;\r
  border: 1px solid rgba(255, 255, 255, 0.08);\r
  border-radius: 12px;\r
  color: #f4f4f6;\r
  font-size: 13.5px;\r
  font-family: inherit;\r
  background: rgba(0, 0, 0, 0.25);\r
  box-shadow: var(--liquify-shadow);\r
  outline: none;\r
  transition: border-color 160ms ease;\r
}\r
\r
.ll-editor-credit-input::placeholder {\r
  color: rgba(255, 255, 255, 0.32);\r
}\r
\r
.ll-editor-credit-input:focus {\r
  border-color: var(--ll-editor-accent);\r
}\r
\r
.ll-editor-text-footer {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  margin-top: 14px;\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-text-stats {\r
  font-size: 12.5px;\r
  font-weight: 650;\r
  color: rgba(255, 255, 255, 0.5);\r
}\r
\r
.ll-editor-primary-btn {\r
  padding: 11px 22px;\r
  border: 0;\r
  --ll-control-radius: 13px;\r
  border-radius: 13px;\r
  color: #06120a;\r
  font-size: 14px;\r
  font-weight: 800;\r
  background: var(--ll-editor-accent);\r
  cursor: pointer;\r
  transition: transform 220ms cubic-bezier(0.3, 2, 0.32, 1), filter 200ms ease;\r
}\r
\r
.ll-editor-primary-btn:hover {\r
  filter: brightness(1.08);\r
  transform: translate3d(0, -1px, 0);\r
}\r
\r
.ll-editor-primary-btn:active {\r
  transform: scale(0.97);\r
}\r
\r
/* Sync stage */\r
.ll-editor-sync-bar {\r
  display: flex;\r
  align-items: center;\r
  gap: 24px;\r
  padding: 14px 16px;\r
  margin-bottom: 12px;\r
  border-radius: 14px;\r
  background: rgba(255, 255, 255, 0.05);\r
  flex: 0 0 auto;\r
}\r
\r
.ll-editor-tap-btn {\r
  display: inline-flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 1px;\r
  padding: 10px 26px;\r
  border: 0;\r
  --ll-control-radius: 13px;\r
  border-radius: 13px;\r
  color: #06120a;\r
  background: var(--ll-editor-accent);\r
  cursor: pointer;\r
  transition: transform 200ms cubic-bezier(0.3, 2, 0.32, 1), filter 180ms ease;\r
}\r
\r
.ll-editor-tap-btn b {\r
  font-size: 14px;\r
  font-weight: 800;\r
}\r
\r
.ll-editor-tap-btn span {\r
  font-size: 10.5px;\r
  font-weight: 650;\r
  opacity: 0.72;\r
  text-transform: uppercase;\r
  letter-spacing: 0.6px;\r
}\r
\r
.ll-editor-tap-btn:hover {\r
  filter: brightness(1.08);\r
}\r
\r
.ll-editor-tap-btn:active {\r
  transform: scale(0.96);\r
}\r
\r
/* The tap button is kept focused so Space always taps; hide the ring for that\r
   programmatic/mouse focus, keep it for genuine keyboard navigation. */\r
.ll-editor-tap-btn:focus {\r
  outline: none;\r
}\r
\r
.ll-editor-tap-btn:focus-visible {\r
  outline: 2px solid rgba(255, 255, 255, 0.65);\r
  outline-offset: 2px;\r
}\r
\r
.ll-editor-sync-hint {\r
  flex: 1;\r
  font-size: 12px;\r
  line-height: 1.5;\r
  text-align: center;\r
  color: rgba(255, 255, 255, 0.55);\r
}\r
\r
.ll-editor-sync-hint b {\r
  color: rgba(255, 255, 255, 0.85);\r
  font-weight: 750;\r
}\r
\r
.ll-editor-sync-status {\r
  flex: 0 0 auto;\r
  font-size: 12.5px;\r
  font-weight: 750;\r
  color: var(--ll-editor-accent);\r
  white-space: nowrap;\r
}\r
\r
/* Global offset control: shifts every timing at once. */\r
.ll-editor-offset-group {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 4px;\r
  flex: 0 0 auto;\r
  padding: 5px 6px;\r
  border-radius: 12px;\r
  background: rgba(255, 255, 255, 0.05);\r
}\r
\r
.ll-editor-offset-label {\r
  margin: 0 6px 0 6px;\r
  font-size: 10.5px;\r
  font-weight: 750;\r
  letter-spacing: 0.5px;\r
  text-transform: uppercase;\r
  color: rgba(255, 255, 255, 0.45);\r
  white-space: nowrap;\r
}\r
\r
/* Line-end marker chip in a karaoke line's token row. */\r
.ll-editor-lineend-chip {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 3px 7px;\r
}\r
\r
.ll-editor-lineend-chip svg {\r
  width: 13px;\r
  height: 13px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-editor-lines {\r
  flex: 1;\r
  min-height: 0;\r
  overflow-y: auto;\r
  /* The list is rebuilt in place (e.g. after Clear); anchoring would let the\r
     browser jump the scroll position around during that rebuild. */\r
  overflow-anchor: none;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 4px;\r
  padding-right: 6px;\r
  scrollbar-width: thin;\r
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;\r
}\r
\r
.ll-editor-lines::-webkit-scrollbar {\r
  width: 6px;\r
}\r
\r
.ll-editor-lines::-webkit-scrollbar-thumb {\r
  background: rgba(255, 255, 255, 0.2);\r
  border-radius: 999px;\r
}\r
\r
.ll-editor-line {\r
  display: grid;\r
  grid-template-columns: 30px 1fr auto auto;\r
  align-items: center;\r
  gap: 12px;\r
  padding: 9px 12px;\r
  border-radius: 11px;\r
  border: 1px solid transparent;\r
  background: rgba(255, 255, 255, 0.03);\r
  cursor: pointer;\r
  transition: background 160ms ease, border-color 160ms ease;\r
}\r
\r
.ll-editor-line:hover {\r
  background: rgba(255, 255, 255, 0.06);\r
}\r
\r
.ll-editor-line.is-current {\r
  border-color: var(--ll-editor-accent);\r
  background: rgba(255, 255, 255, 0.08);\r
}\r
\r
.ll-editor-line.is-interlude {\r
  opacity: 0.72;\r
}\r
\r
.ll-editor-line-index {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 12px;\r
  font-weight: 750;\r
  color: rgba(255, 255, 255, 0.4);\r
}\r
\r
.ll-editor-line-index svg {\r
  width: 15px;\r
  height: 15px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-editor-line-main {\r
  min-width: 0;\r
  font-size: 14.5px;\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.9);\r
}\r
\r
.ll-editor-line-interlude-text {\r
  font-style: italic;\r
  color: rgba(255, 255, 255, 0.5);\r
}\r
\r
/* Final "end of lyrics" marker row. */\r
.ll-editor-end-row {\r
  margin-top: 6px;\r
}\r
\r
.ll-editor-end-row .ll-editor-line-index {\r
  color: var(--ll-editor-accent);\r
}\r
\r
.ll-editor-token-block {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
\r
.ll-editor-tokens {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 5px;\r
}\r
\r
/* Background sub-lyric row \u2014 smaller, dimmer, and indented under the lead. */\r
.ll-editor-bg-tokens {\r
  margin-left: 14px;\r
  padding-left: 10px;\r
  border-left: 2px solid rgba(255, 255, 255, 0.12);\r
  gap: 4px;\r
}\r
\r
.ll-editor-bg-tokens .ll-editor-token {\r
  padding: 2px 6px;\r
  font-size: 12px;\r
  border-radius: 6px;\r
}\r
\r
.ll-editor-token {\r
  padding: 3px 8px;\r
  border-radius: 7px;\r
  font-size: 13.5px;\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.5);\r
  background: rgba(255, 255, 255, 0.05);\r
  box-shadow: var(--liquify-shadow);\r
  transition: color 140ms ease, background 140ms ease, box-shadow 140ms ease;\r
}\r
\r
.ll-editor-token.is-synced {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.13);\r
}\r
\r
.ll-editor-token.is-current {\r
  color: #06120a;\r
  background: var(--ll-editor-accent);\r
  box-shadow: var(--liquify-shadow);\r
}\r
\r
.ll-editor-line-time {\r
  font-variant-numeric: tabular-nums;\r
  font-size: 13px;\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.35);\r
}\r
\r
.ll-editor-line.is-synced .ll-editor-line-time {\r
  color: var(--ll-editor-accent);\r
}\r
\r
.ll-editor-line-controls {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 3px;\r
  opacity: 0;\r
  transition: opacity 150ms ease;\r
}\r
\r
.ll-editor-line:hover .ll-editor-line-controls,\r
.ll-editor-line.is-current .ll-editor-line-controls {\r
  opacity: 1;\r
}\r
\r
.ll-editor-line-btn {\r
  width: 28px;\r
  height: 28px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border: 0;\r
  --ll-control-radius: 8px;\r
  border-radius: 8px;\r
  color: rgba(255, 255, 255, 0.62);\r
  background: rgba(255, 255, 255, 0.06);\r
  cursor: pointer;\r
  transition: color 140ms ease, background 140ms ease;\r
}\r
\r
.ll-editor-line-btn:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.14);\r
}\r
\r
/* Preview stage */\r
.ll-editor-preview-warn {\r
  padding: 10px 16px;\r
  margin-bottom: 12px;\r
  border-radius: 12px;\r
  background: rgba(255, 190, 80, 0.12);\r
  color: #ffd08a;\r
  font-size: 12.5px;\r
  font-weight: 650;\r
  text-align: center;\r
  flex: 0 0 auto;\r
}\r
\r
/* Frame carries the glass rim + rounding; the inner scroller keeps the fade mask\r
   (an outer shadow on a masked element would be clipped away). */\r
.ll-editor-preview-frame {\r
  flex: 1;\r
  min-height: 0;\r
  display: flex;\r
  border-radius: 16px;\r
  overflow: hidden;\r
  background: rgba(0, 0, 0, 0.22);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
}\r
\r
.ll-editor-preview-scroll {\r
  /* Positioned so the lyric lines' offsetTop is measured against this scroller \u2014\r
     unpositioned, the auto-scroll measured against the overlay and centered the\r
     active line too high. */\r
  position: relative;\r
  flex: 1;\r
  min-height: 0;\r
  overflow-y: auto;\r
  padding: 20px 10px 60px;\r
  scrollbar-width: thin;\r
  scrollbar-color: rgba(255, 255, 255, 0.22) transparent;\r
  mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 88%, transparent 100%);\r
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 8%, black 88%, transparent 100%);\r
}\r
\r
.ll-editor-preview-lines {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
}\r
\r
/* Transport */\r
.ll-editor-transport {\r
  display: flex;\r
  align-items: center;\r
  gap: 14px;\r
  margin-top: 14px;\r
  padding: 10px 16px;\r
  border-radius: 15px;\r
  background: rgba(255, 255, 255, 0.05);\r
  flex-shrink: 0;\r
}\r
\r
.ll-editor-play-btn {\r
  width: 42px;\r
  height: 42px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 0;\r
  border: 0;\r
  --ll-control-radius: 13px;\r
  border-radius: 13px;\r
  color: #06120a;\r
  background: var(--ll-editor-accent);\r
  cursor: pointer;\r
  transition: transform 200ms ease, filter 180ms ease;\r
}\r
\r
.ll-editor-play-btn:hover {\r
  filter: brightness(1.08);\r
}\r
\r
.ll-editor-play-btn:active {\r
  transform: scale(0.94);\r
}\r
\r
.ll-editor-time {\r
  font-variant-numeric: tabular-nums;\r
  font-size: 12.5px;\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.62);\r
  min-width: 38px;\r
}\r
\r
.ll-editor-time-dur {\r
  text-align: right;\r
}\r
\r
.ll-editor-seek-track {\r
  flex: 1;\r
  padding: 10px 0;\r
  cursor: pointer;\r
}\r
\r
.ll-editor-seek-bar {\r
  position: relative;\r
  height: 6px;\r
  border-radius: 999px;\r
  background: rgba(255, 255, 255, 0.16);\r
  overflow: hidden;\r
}\r
\r
.ll-editor-seek-fill {\r
  position: absolute;\r
  inset: 0;\r
  transform-origin: left center;\r
  transform: scaleX(0);\r
  border-radius: 999px;\r
  background: var(--ll-editor-accent);\r
}\r
\r
/* Themed glass rim (::after) + springy hover on editor buttons, lyric rows and\r
   the fine-adjust buttons \u2014 matches the rest of the extension's surfaces. */\r
.ll-editor-icon-btn,\r
.ll-editor-save-btn,\r
.ll-editor-primary-btn,\r
.ll-editor-tap-btn,\r
.ll-editor-play-btn,\r
.ll-editor-line-btn,\r
.ll-editor-mode-btn,\r
.ll-editor-step-btn,\r
.ll-editor-line {\r
  position: relative;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    background 0.28s ease,\r
    color 0.2s ease !important;\r
}\r
\r
.ll-editor-icon-btn::after,\r
.ll-editor-save-btn::after,\r
.ll-editor-primary-btn::after,\r
.ll-editor-tap-btn::after,\r
.ll-editor-play-btn::after,\r
.ll-editor-line-btn::after,\r
.ll-editor-line::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
}\r
\r
.ll-editor-icon-btn:hover,\r
.ll-editor-save-btn:hover,\r
.ll-editor-primary-btn:hover,\r
.ll-editor-tap-btn:hover,\r
.ll-editor-play-btn:hover,\r
.ll-editor-line-btn:hover,\r
.ll-editor-mode-btn:hover,\r
.ll-editor-step-btn:hover {\r
  transform: scale(1.03);\r
}\r
\r
/* Kept last so the press feedback wins over the hover scale while held. */\r
.ll-editor-icon-btn:active,\r
.ll-editor-save-btn:active,\r
.ll-editor-primary-btn:active,\r
.ll-editor-tap-btn:active,\r
.ll-editor-play-btn:active,\r
.ll-editor-line-btn:active,\r
.ll-editor-mode-btn:active,\r
.ll-editor-step-btn:active {\r
  transform: scale(0.96);\r
}\r
\r
/* Themed glass shadow on the editor's container surfaces and active segments. */\r
.ll-editor-hint,\r
.ll-editor-textarea,\r
.ll-editor-steps,\r
.ll-editor-mode-switch,\r
.ll-editor-sync-bar,\r
.ll-editor-offset-group,\r
.ll-editor-transport,\r
.ll-editor-preview-warn,\r
.ll-editor-step-btn.active,\r
.ll-editor-mode-btn.active {\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
}\r
\r
/* In-editor toast \u2014 Spotify's own notification renders below the overlay. */\r
.ll-editor-toast {\r
  position: absolute;\r
  left: 50%;\r
  bottom: 108px;\r
  z-index: 30;\r
  max-width: min(80vw, 560px);\r
  padding: 12px 22px;\r
  border-radius: 14px;\r
  background: rgba(12, 12, 18, 0.94);\r
  color: #fff;\r
  font-size: 13.5px;\r
  font-weight: 700;\r
  line-height: 1.4;\r
  text-align: center;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  opacity: 0;\r
  pointer-events: none;\r
  transform: translate3d(-50%, 14px, 0);\r
  transition: opacity 220ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.ll-editor-toast.visible {\r
  opacity: 1;\r
  transform: translate3d(-50%, 0, 0);\r
}\r
\r
/* Custom discard/delete dialog \u2014 glass surface, 20px radius, no native prompt. */\r
.ll-editor-confirm {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483500;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: rgba(6, 6, 10, 0.5);\r
  opacity: 0;\r
  transition: opacity 200ms ease;\r
}\r
\r
.ll-editor-confirm.visible {\r
  opacity: 1;\r
}\r
\r
.ll-editor-confirm-dialog {\r
  width: min(420px, 90vw);\r
  padding: 24px;\r
  border-radius: 20px;\r
  background: rgba(20, 20, 26, 0.32);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 30px 80px rgba(0, 0, 0, 0.55);\r
  outline: var(--glowify-outline, none) !important;\r
  transform: translateY(10px) scale(0.97);\r
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.ll-editor-confirm.visible .ll-editor-confirm-dialog {\r
  transform: translateY(0) scale(1);\r
}\r
\r
.ll-editor-confirm-title {\r
  margin: 0 0 8px;\r
  font-size: 17px;\r
  font-weight: 800;\r
  color: #fff;\r
}\r
\r
.ll-editor-confirm-message {\r
  margin: 0 0 20px;\r
  font-size: 13.5px;\r
  line-height: 1.55;\r
  color: rgba(255, 255, 255, 0.68);\r
}\r
\r
.ll-editor-confirm-actions {\r
  display: flex;\r
  justify-content: flex-end;\r
  gap: 10px;\r
}\r
\r
.ll-editor-confirm-btn {\r
  padding: 10px 20px;\r
  border: 0;\r
  border-radius: 12px;\r
  font-size: 13.5px;\r
  font-weight: 750;\r
  cursor: pointer;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    filter 0.2s ease,\r
    background 0.2s ease;\r
}\r
\r
.ll-editor-confirm-btn:hover {\r
  transform: scale(1.03);\r
}\r
\r
.ll-editor-confirm-btn:active {\r
  transform: scale(0.96);\r
}\r
\r
.ll-editor-confirm-cancel {\r
  color: rgba(255, 255, 255, 0.82);\r
  background: rgba(255, 255, 255, 0.08);\r
}\r
\r
.ll-editor-confirm-cancel:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.14);\r
}\r
\r
.ll-editor-confirm-accept {\r
  color: #06120a;\r
  background: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-editor-confirm-accept.ll-editor-confirm-danger {\r
  color: #fff;\r
  background: #e0483f;\r
}\r
\r
/* "My submissions" \u2014 the user's own uploads and their review verdict. Appended to\r
   <body> like the confirm dialog, so it uses --accent-color directly rather than\r
   the editor-scoped --ll-editor-accent. */\r
.ll-editor-submissions {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483500;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 24px;\r
  /* Only the scrim's colour fades \u2014 animating opacity on the glass parent would\r
     render it black mid-fade (same rule as the auth dialog). */\r
  background: rgba(0, 0, 0, 0);\r
  transition: background 240ms ease;\r
}\r
\r
.ll-editor-submissions.visible {\r
  background: rgba(6, 6, 10, 0.5);\r
}\r
\r
.ll-editor-submissions-dialog {\r
  display: flex;\r
  flex-direction: column;\r
  width: min(560px, 92vw);\r
  max-height: min(640px, 82vh);\r
  padding: 22px 22px 8px;\r
  border-radius: 20px;\r
  background: rgba(20, 20, 26, 0.32);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow), 0 30px 80px rgba(0, 0, 0, 0.55);\r
  outline: var(--glowify-outline, none) !important;\r
  opacity: 0;\r
  transform: translateY(10px) scale(0.97);\r
  will-change: transform, opacity;\r
  transition:\r
    transform 260ms cubic-bezier(0.16, 1, 0.3, 1),\r
    opacity 200ms ease;\r
}\r
\r
.ll-editor-submissions.visible .ll-editor-submissions-dialog {\r
  opacity: 1;\r
  transform: translateY(0) scale(1);\r
}\r
\r
.ll-editor-submissions-header {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  padding-bottom: 16px;\r
}\r
\r
.ll-editor-submissions-titles {\r
  flex: 1 1 auto;\r
  min-width: 0;\r
}\r
\r
.ll-editor-submissions-title {\r
  margin: 0;\r
  font-size: 17px;\r
  font-weight: 800;\r
  color: #fff;\r
}\r
\r
.ll-editor-submissions-sub {\r
  margin-top: 2px;\r
  font-size: 12.5px;\r
  font-weight: 650;\r
  color: rgba(255, 255, 255, 0.5);\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.ll-editor-submissions-list {\r
  flex: 1 1 auto;\r
  overflow-y: auto;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
  padding-bottom: 16px;\r
}\r
\r
.ll-editor-submissions-empty {\r
  padding: 44px 16px;\r
  text-align: center;\r
  font-size: 13.5px;\r
  color: rgba(255, 255, 255, 0.5);\r
}\r
\r
.ll-editor-submission {\r
  position: relative;\r
  padding: 12px 14px;\r
  border-radius: 14px;\r
  background: rgba(255, 255, 255, 0.05);\r
  transition: background 200ms ease, transform 260ms cubic-bezier(0.3, 2, 0.32, 1);\r
}\r
\r
/* Theme rim, like the glass buttons. */\r
.ll-editor-submission::after,\r
.ll-editor-submission-status::after,\r
.ll-editor-submission-note::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
.ll-editor-submission:hover {\r
  background: rgba(255, 255, 255, 0.09);\r
  transform: translate3d(0, -1px, 0);\r
}\r
\r
.ll-editor-submission-head {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
}\r
\r
.ll-editor-submission-main {\r
  flex: 1 1 auto;\r
  min-width: 0;\r
}\r
\r
.ll-editor-submission-title {\r
  font-size: 14px;\r
  font-weight: 750;\r
  color: #fff;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.ll-editor-submission-meta {\r
  margin-top: 2px;\r
  font-size: 12px;\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.48);\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.ll-editor-submission-status {\r
  position: relative;\r
  flex: 0 0 auto;\r
  padding: 3px 10px;\r
  border-radius: 7px;\r
  font-size: 11px;\r
  font-weight: 800;\r
  letter-spacing: 0.2px;\r
  color: rgba(255, 255, 255, 0.68);\r
  background: rgba(255, 255, 255, 0.09);\r
  cursor: default;\r
}\r
\r
.ll-editor-submission.is-published .ll-editor-submission-status {\r
  color: var(--liquid-lyrics-accent);\r
  background: rgba(30, 215, 96, 0.14);\r
}\r
\r
.ll-editor-submission.is-pending .ll-editor-submission-status {\r
  color: #ffcf5e;\r
  background: rgba(255, 207, 94, 0.14);\r
}\r
\r
.ll-editor-submission.is-rejected .ll-editor-submission-status,\r
.ll-editor-submission.is-removed .ll-editor-submission-status {\r
  color: #ff8079;\r
  background: rgba(224, 72, 63, 0.16);\r
}\r
\r
.ll-editor-submission-note {\r
  position: relative;\r
  margin-top: 9px;\r
  padding: 7px 11px;\r
  border-radius: 10px;\r
  font-size: 12.5px;\r
  line-height: 1.5;\r
  color: #ffcf5e;\r
  background: rgba(255, 207, 94, 0.1);\r
  overflow-wrap: anywhere;\r
}\r
\r
.ll-editor-submission-note.is-muted {\r
  color: rgba(255, 255, 255, 0.42);\r
  background: rgba(255, 255, 255, 0.05);\r
}\r
\r
.ll-hidden {\r
  display: none !important;\r
}\r
\r
/* Editor responsiveness. The shell is min(1080px, 94vw), so the viewport width\r
   maps straight onto the space the header has. Each step drops the least useful\r
   label first (icons keep their tooltips) rather than letting the row overflow\r
   the shell \u2014 an overflowing header pushes Publish and Close past the rounded\r
   edge, where they sit over the dim backdrop and read as misplaced. */\r
@media (max-width: 1040px) {\r
  .ll-editor-song {\r
    max-width: 210px;\r
  }\r
\r
  .ll-editor-submissions-btn .ll-editor-btn-label {\r
    display: none;\r
  }\r
\r
  .ll-editor-submissions-btn {\r
    padding: 0 11px;\r
  }\r
}\r
\r
@media (max-width: 880px) {\r
  .ll-editor-account-chip {\r
    max-width: 132px;\r
  }\r
\r
  .ll-editor-save-btn .ll-editor-btn-label {\r
    display: none;\r
  }\r
\r
  .ll-editor-save-btn {\r
    padding: 9px 12px;\r
  }\r
\r
  .ll-editor-header {\r
    gap: 12px;\r
  }\r
\r
  .ll-editor-step-btn {\r
    padding: 8px 14px;\r
  }\r
\r
  .ll-editor-sync-bar {\r
    gap: 14px;\r
  }\r
\r
  /* The buttons keep their tooltips, so the group reads fine without its label. */\r
  .ll-editor-offset-label {\r
    display: none;\r
  }\r
}\r
\r
@media (max-width: 800px) {\r
  .ll-editor-account-name {\r
    display: none;\r
  }\r
\r
  .ll-editor-account-chip {\r
    padding: 0 11px;\r
  }\r
}\r
\r
/* Short windows (1080p at 150% scaling lands near 720px of viewport height):\r
   claw back the chrome's vertical padding so the lyric list keeps its room. */\r
@media (max-height: 780px) {\r
  .ll-editor-shell {\r
    height: min(96vh, 940px);\r
    padding: 16px clamp(14px, 2.4vw, 26px) 14px;\r
  }\r
\r
  .ll-editor-steps {\r
    margin: 10px 0 2px;\r
  }\r
\r
  .ll-editor-transport {\r
    margin-top: 10px;\r
    padding: 8px 14px;\r
  }\r
\r
  .ll-editor-body {\r
    margin-top: 8px;\r
  }\r
}\r
\r
@media (max-width: 720px) {\r
  .ll-editor-shell {\r
    width: 100vw;\r
    height: 100vh;\r
    border-radius: 0;\r
    padding: 16px 14px;\r
  }\r
\r
  .ll-editor-header {\r
    flex-wrap: wrap;\r
    gap: 10px;\r
  }\r
\r
  .ll-editor-song {\r
    max-width: 180px;\r
  }\r
\r
  .ll-editor-sync-bar {\r
    flex-wrap: wrap;\r
  }\r
}\r
\r
/* --- 12. Settings-driven visibility ------------------------------------------------\r
   Kept at the end of the file on purpose: every rule here is a user decision and\r
   must win over the layout rules above without needing !important on each one. */\r
\r
:root.ll-hide-own-button .liquid-lyrics-button {\r
  display: none !important;\r
}\r
\r
/* Spotify's own lyrics button \u2014 the stable class and the generated one for the\r
   same control (see lib/spotifyLyricsButton.ts). */\r
:root.ll-hide-spotify-lyrics-button .main-nowPlayingBar-lyricsButton,\r
:root.ll-hide-spotify-lyrics-button .vVsHwFW9rx4CZOne {\r
  display: none !important;\r
}\r
\r
:root.ll-hide-title .liquid-lyrics-title {\r
  display: none;\r
}\r
\r
/* The gear survives: it lives in the same container but is not a link button,\r
   so the settings stay reachable after switching the links off. */\r
:root.ll-hide-header-links .ll-github-btn,\r
:root.ll-hide-header-links .ll-discord-btn {\r
  display: none;\r
}\r
\r
/* Unlike the idle fade this one is permanent, so it may reclaim the track's\r
   width \u2014 there is no state to animate back to. The class is on the panel, not\r
   the root: the windowed and maximized views carry separate settings, and\r
   panel.ts decides which one is in force. */\r
.liquid-lyrics-panel.ll-hide-scrollbar .liquid-lyrics-content {\r
  scrollbar-width: none;\r
}\r
\r
.liquid-lyrics-panel.ll-hide-scrollbar .liquid-lyrics-content::-webkit-scrollbar {\r
  width: 0;\r
  height: 0;\r
}\r
\r
.liquid-lyrics-panel.ll-hide-credits .liquid-lyrics-credits {\r
  display: none;\r
}\r
\r
/* Hiding the pill outright, as opposed to the idle fade, which only makes it\r
   transparent so it can come back on the next mouse move. */\r
.liquid-lyrics-panel.ll-hide-pill .liquid-lyrics-control-pill {\r
  display: none;\r
}\r
\r
/* --- Lyrics display modes ----------------------------------------------------------\r
   Both are set as classes on <html> so the panel and the sidebar card follow the\r
   same rule, and so a live toggle also clears transforms the engine already\r
   wrote. The engine additionally skips the work (see updateWord/updateLetters);\r
   these rules are what make the switch take effect immediately. */\r
\r
/* Block lines arrive already filled instead of wiping top to bottom. !important\r
   because the fill is an inline custom property written per frame. */\r
:root.ll-simple-lyrics .liquid-lyrics-line.active {\r
  --line-progress: 100 !important;\r
}\r
\r
:root.ll-simple-lyrics .ll-syllable,\r
:root.ll-simple-lyrics .ll-letter,\r
:root.ll-minimal-lyrics .ll-letter {\r
  transform: none !important;\r
}\r
\r
/* Hidden while the scroll position is being corrected after the panel re-opens,\r
   so the correction never happens in view.\r
   Both !important and \`animation: none\` are needed: .liquid-lyrics-panel.visible\r
   runs ll-lyrics-content-enter on this element, and a running animation outranks\r
   an ordinary declaration \u2014 which is why the plain rule here did nothing and the\r
   jump stayed visible. Killing the animation also re-arms it, so it replays once\r
   the lyrics are revealed on the right line. */\r
.liquid-lyrics-content.ll-settling,\r
.ll-sidebar-mini-lines.ll-settling {\r
  opacity: 0 !important;\r
  animation: none !important;\r
  transition: none !important;\r
}\r
\r
/* --- Control pill placement -------------------------------------------------------\r
   Each edge overrides the resting and the revealed transform together: the pill\r
   slides in from the edge it is docked against, so the direction has to match\r
   the side. The vertical docks stack the buttons into a column. */\r
\r
.liquid-lyrics-panel[data-control-position="top"] .liquid-lyrics-control-pill {\r
  top: 84px;\r
  bottom: auto;\r
  transform: translate3d(-50%, -28px, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="top"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel[data-control-position="top"]:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(-50%, 0, 0) scale(1);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="left"] .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel[data-control-position="right"] .liquid-lyrics-control-pill {\r
  flex-direction: column;\r
  top: 50%;\r
  bottom: auto;\r
  left: auto;\r
  height: auto;\r
  width: 54px;\r
  padding: 12px 9px;\r
}\r
\r
.liquid-lyrics-panel[data-control-position="left"] .liquid-lyrics-control-pill {\r
  left: 24px;\r
  transform: translate3d(-28px, -50%, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="left"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel[data-control-position="left"]:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(0, -50%, 0) scale(1);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="right"] .liquid-lyrics-control-pill {\r
  right: 24px;\r
  transform: translate3d(28px, -50%, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="right"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel[data-control-position="right"]:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(0, -50%, 0) scale(1);\r
}\r
\r
/* The idle fade has to restate the docked resting transform for every edge, or\r
   the bottom-dock rule further up would drag a side-docked pill horizontally. */\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="top"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="top"]:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(-50%, -14px, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="left"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="left"]:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(-14px, -50%, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="right"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="right"]:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(14px, -50%, 0) scale(0.98);\r
}\r
\r
/* --- Song card side ----------------------------------------------------------------\r
   The columns are reordered rather than moved, because grid order is not an\r
   animatable property. The swap itself is therefore instant and the slide-in\r
   below covers it \u2014 which reads as the two columns trading places. */\r
\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-view {\r
  grid-template-columns: minmax(360px, 1fr) var(--ll-card-col);\r
}\r
\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-song-card {\r
  order: 2;\r
}\r
\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-content {\r
  order: 1;\r
}\r
\r
.liquid-lyrics-panel:fullscreen[data-card-side="right"] .liquid-lyrics-view,\r
.liquid-lyrics-panel.ll-fullscreen-mode[data-card-side="right"] .liquid-lyrics-view {\r
  grid-template-columns: minmax(540px, 1fr) var(--ll-card-col);\r
}\r
\r
/* The slide itself is driven from panel.ts with the Web Animations API, so there\r
   are no keyframes here \u2014 see toggleCardSide for why. */\r
\r
/* The scrollbar belongs on the outer edge, so it swaps sides with the card.\r
   \`direction\` is the only way to move a scrollbar; the children are flipped back\r
   so the text itself stays left-to-right. */\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-content {\r
  direction: rtl;\r
}\r
\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-content > * {\r
  direction: ltr;\r
}\r
\r
/* --- Song card: cover style --------------------------------------------------------\r
   Artwork-led: a large rounded cover with the transport fading in over it, and\r
   the track details on a filled panel below. The default style keeps the frosted\r
   card and is defined in section 4. */\r
\r
.liquid-lyrics-song-card {\r
  position: relative;\r
}\r
\r
.ll-song-card-overlay {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 2;\r
  display: none;\r
  flex-direction: column;\r
  justify-content: flex-end;\r
  align-items: stretch;\r
  gap: 8px;\r
  padding: 12px 14px 14px;\r
  border-radius: inherit;\r
  pointer-events: none;\r
  /* The overlay's own opacity is never animated. A backdrop-filtered element\r
     under an ancestor whose opacity is in flight samples an isolated, empty\r
     group rather than the artwork behind it \u2014 that is what turned the buttons\r
     solid black on the way in. So each piece fades itself, and the buttons fade\r
     through properties that leave no stacking context at all. */\r
  background: none;\r
}\r
\r
/* The wash is its own layer: it holds no backdrop-filtered children, so it is\r
   free to fade with plain opacity. */\r
.ll-song-card-overlay::before {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  pointer-events: none;\r
  opacity: 0;\r
  background: linear-gradient(to top, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.2) 52%, rgba(0, 0, 0, 0.14));\r
  transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1);\r
}\r
\r
/* Progress bar and heart carry no glass, so opacity is safe for them. They also\r
   rise a little, so the overlay arrives as one movement. */\r
.ll-song-card-overlay .ll-song-card-progress,\r
.ll-song-card-overlay .ll-song-card-heart {\r
  opacity: 0;\r
  transition:\r
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),\r
    transform 460ms cubic-bezier(0.22, 1, 0.36, 1);\r
}\r
\r
.ll-song-card-overlay .ll-song-card-progress {\r
  transform: translate3d(0, 12px, 0);\r
  transition:\r
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),\r
    transform 520ms cubic-bezier(0.34, 1.5, 0.64, 1);\r
}\r
\r
/* The bounce lives on the row, not on the buttons: a transform on a button is\r
   the property its own hover lift and press scale need, and putting the reveal\r
   there left them unable to react to the pointer at all. */\r
.ll-song-card-overlay .ll-song-card-controls {\r
  transform: translate3d(0, 12px, 0);\r
  transition: transform 520ms cubic-bezier(0.34, 1.5, 0.64, 1);\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-controls,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:focus-within .ll-song-card-controls {\r
  transform: translate3d(0, 0, 0);\r
}\r
\r
/* Glass kept intact: the buttons fade by growing their own backdrop blur and\r
   tint instead of by opacity, so they never sit inside an isolated group. The\r
   base rule's transition already covers colour and background. */\r
.ll-song-card-overlay .ll-song-card-btn {\r
  background: rgba(255, 255, 255, 0);\r
  color: rgba(255, 255, 255, 0);\r
  backdrop-filter: blur(0);\r
  -webkit-backdrop-filter: blur(0);\r
  box-shadow: none;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-overlay::before,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:focus-within .ll-song-card-overlay::before {\r
  opacity: 1;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-progress,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:focus-within .ll-song-card-progress,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-heart,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:focus-within .ll-song-card-heart {\r
  opacity: 1;\r
  transform: translate3d(0, 0, 0);\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-btn,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:focus-within .ll-song-card-btn {\r
  background: rgba(255, 255, 255, 0.1);\r
  color: rgba(255, 255, 255, 0.95);\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
}\r
\r
/* Restated at the overlay's weight so the shared hover and press feedback still\r
   wins over the reveal colours above. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-overlay .ll-song-card-btn:hover {\r
  color: #fff;\r
  background: rgba(255, 255, 255, 0.2);\r
  transform: translate3d(0, -1px, 0) scale(1.04);\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-overlay .ll-song-card-btn:active {\r
  transform: scale(0.95) !important;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-overlay {\r
  display: flex;\r
}\r
\r
/* Revealed by hovering the artwork, and by keyboard focus so the transport stays\r
   reachable without a pointer. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-overlay,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:focus-within .ll-song-card-overlay {\r
  opacity: 1;\r
  pointer-events: auto;\r
}\r
\r
/* No surface of its own in this style \u2014 the only framed object is the artwork,\r
   so the card must not draw a second box around itself and the details.\r
   !important because the base rule pulls its glow from the theme variables and\r
   a Glowify/Liquify build can re-assert them at higher weight. */\r
.liquid-lyrics-panel[data-card-style="cover"] .liquid-lyrics-song-card {\r
  background: none !important;\r
  backdrop-filter: none !important;\r
  -webkit-backdrop-filter: none !important;\r
  box-shadow: none !important;\r
  outline: none !important;\r
  gap: 0;\r
  /* The card clips to its own 20px radius, and the artwork sits flush against\r
     its top edge \u2014 so anything above 20px only ever showed on the cover's lower\r
     corners. With no surface of its own in this style there is nothing left to\r
     clip or round, and the cover's radius is free to go the whole range. */\r
  overflow: visible;\r
  border-radius: 0;\r
}\r
\r
/* The card's rim lives on .liquid-lyrics-song-card::after, which carries\r
   !important \u2014 so switching the card's own box-shadow off could never remove it,\r
   and the frame kept wrapping the title and artist too. The pseudo-element is\r
   taken out of play here and re-created on the artwork alone, below. */\r
.liquid-lyrics-panel[data-card-style="cover"] .liquid-lyrics-song-card::after {\r
  content: none;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap {\r
  position: relative;\r
  border-radius: var(--ll-card-cover-radius, 20px);\r
  overflow: hidden;\r
  /* The card's glow, given to the artwork. The card itself is switched off in\r
     this style, so under Glowify the glow disappeared entirely \u2014 it has to move\r
     with the surface it belongs to. On the element rather than on ::after: the\r
     glow reaches outside the box, and it cannot be listed next to the inset rim\r
     below, since a shadow list with \`none\` in it is invalid. overflow:hidden\r
     clips the artwork inside, never the element's own shadow. */\r
  box-shadow: var(--liquid-lyrics-song-card-shadow);\r
}\r
\r
/* The rim the card gave up, now around the artwork only. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  z-index: 3;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover {\r
  border-radius: inherit;\r
}\r
\r
/* Bare text under the artwork \u2014 no surface of its own, so the cover is the only\r
   object on screen. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-info {\r
  padding: 14px 8px 0;\r
  background: none;\r
  backdrop-filter: none;\r
  -webkit-backdrop-filter: none;\r
  box-shadow: none;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-controls {\r
  height: auto;\r
  padding: 0;\r
  gap: 10px;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-progress {\r
  margin: 0;\r
  padding: 0;\r
}\r
\r
/* --- Heart ------------------------------------------------------------------------- */\r
\r
.ll-song-card-heart {\r
  position: absolute;\r
  top: 12px;\r
  right: 12px;\r
  z-index: 3;\r
  width: 34px;\r
  height: 34px;\r
}\r
\r
.ll-song-card-heart svg {\r
  width: 19px;\r
  height: 19px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 1.9;\r
  stroke-linejoin: round;\r
}\r
\r
/* In the cover style the heart is the centrepiece of the hover state: large,\r
   centred on the artwork and with no surface behind it, so it reads as a mark on\r
   the cover rather than another button.\r
   Taken out of the overlay's flow and centred absolutely, so the progress bar\r
   and transport keep the bottom of the overlay to themselves. */\r
/* Centred with auto margins, not a translate. The button's hover and press\r
   feedback are themselves transforms, and every one of them replaced the\r
   centring translate outright \u2014 which dropped the heart (and its hit box) to the\r
   bottom right, where clicks then landed on nothing. Auto margins leave the\r
   transform free for the animation that actually wants it. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-heart {\r
  position: absolute;\r
  inset: 0;\r
  margin: auto;\r
  width: clamp(72px, 40%, 140px);\r
  height: clamp(72px, 40%, 140px);\r
  padding: 0;\r
  background: none !important;\r
  backdrop-filter: none !important;\r
  -webkit-backdrop-filter: none !important;\r
  box-shadow: none !important;\r
  outline: none !important;\r
  color: rgba(255, 255, 255, 0.94);\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-heart svg {\r
  width: 100%;\r
  height: 100%;\r
  stroke-width: 1.1;\r
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.45));\r
}\r
\r
.ll-song-card-heart.active {\r
  color: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-song-card-heart.active svg {\r
  fill: currentColor;\r
}\r
\r
/* A slow beat while hovered \u2014 the shape it stands for. Suppressed during the\r
   break and the pop, whose own animations own the transform for that stretch. */\r
.ll-song-card-heart:hover:not(.ll-heart-breaking):not(.ll-heart-popping) .ll-heart-whole {\r
  animation: ll-heart-beat 1.1s ease-in-out infinite;\r
}\r
\r
@keyframes ll-heart-beat {\r
  0%,\r
  100% {\r
    transform: scale(1);\r
  }\r
  22% {\r
    transform: scale(1.13);\r
  }\r
  38% {\r
    transform: scale(1.03);\r
  }\r
  56% {\r
    transform: scale(1.09);\r
  }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .ll-song-card-heart:hover .ll-heart-whole {\r
    animation: none;\r
  }\r
}\r
\r
.ll-heart-whole,\r
.ll-heart-half {\r
  position: absolute;\r
  inset: 0;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
/* The two halves only exist for the break. They are clipped along a jagged seam\r
   rather than a straight edge, so the heart looks torn instead of sliced. The\r
   two polygons are complements of each other, which keeps the crack continuous. */\r
.ll-heart-half {\r
  opacity: 0;\r
}\r
\r
.ll-heart-half-left {\r
  clip-path: polygon(0 0, 53% 0, 45% 17%, 56% 33%, 43% 51%, 54% 68%, 44% 85%, 51% 100%, 0 100%);\r
}\r
\r
.ll-heart-half-right {\r
  clip-path: polygon(53% 0, 100% 0, 100% 100%, 51% 100%, 44% 85%, 54% 68%, 43% 51%, 56% 33%, 45% 17%);\r
}\r
\r
.ll-song-card-heart.ll-heart-popping .ll-heart-whole {\r
  animation: ll-heart-pop 640ms cubic-bezier(0.3, 2.25, 0.32, 1);\r
}\r
\r
/* Breaking: the halves take over while the whole heart steps aside, then it\r
   eases back as the empty outline. Cutting straight to the unfilled heart the\r
   moment the pieces left was the abrupt part \u2014 this holds the gap open and lets\r
   the outline draw itself back in underneath. */\r
.ll-song-card-heart.ll-heart-breaking .ll-heart-whole {\r
  animation: ll-heart-return 1000ms ease-out forwards;\r
}\r
\r
/* The gap is held for three quarters of the sequence before the outline eases\r
   back \u2014 long enough for the pieces to have finished falling. It settles with a\r
   small overshoot rather than arriving flat. */\r
@keyframes ll-heart-return {\r
  0%,\r
  74% {\r
    opacity: 0;\r
    transform: scale(0.72);\r
  }\r
  88% {\r
    opacity: 0.85;\r
    transform: scale(1.06);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: scale(1);\r
  }\r
}\r
\r
.ll-song-card-heart.ll-heart-breaking .ll-heart-half {\r
  opacity: 1;\r
}\r
\r
/* The button itself takes the squeeze, so both halves inherit it and the crack\r
   stays closed while it happens. */\r
.ll-song-card-heart.ll-heart-breaking {\r
  animation: ll-heart-squeeze 1000ms cubic-bezier(0.36, 0, 0.2, 1);\r
}\r
\r
.ll-song-card-heart.ll-heart-breaking .ll-heart-half-left {\r
  animation: ll-heart-break-left 1000ms cubic-bezier(0.34, 0.06, 0.28, 1) forwards;\r
}\r
\r
.ll-song-card-heart.ll-heart-breaking .ll-heart-half-right {\r
  animation: ll-heart-break-right 1000ms cubic-bezier(0.34, 0.06, 0.28, 1) forwards;\r
}\r
\r
@keyframes ll-heart-pop {\r
  0% {\r
    transform: scale(1);\r
  }\r
  38% {\r
    transform: scale(1.32);\r
  }\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
/* A beat of tension before it gives: the heart tightens, kicks once, then lets\r
   go. Percentages are against the 1s sequence, so this happens in the first\r
   third and the pieces take the rest. */\r
@keyframes ll-heart-squeeze {\r
  0% {\r
    transform: scale(1);\r
  }\r
  12% {\r
    transform: scale(0.88);\r
  }\r
  24% {\r
    transform: scale(1.15);\r
  }\r
  34% {\r
    transform: scale(0.99);\r
  }\r
  44%,\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
/* The pieces arc rather than slide: they are thrown up and out first, hang for a\r
   moment at the top, then fall away while shrinking and turning. Straight-line\r
   motion at a constant size is what made the earlier version look pasted on. */\r
@keyframes ll-heart-break-left {\r
  0%,\r
  26% {\r
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);\r
    opacity: 1;\r
  }\r
  36% {\r
    transform: translate3d(-4px, -7px, 0) rotate(-11deg) scale(1.02);\r
    opacity: 1;\r
  }\r
  50% {\r
    transform: translate3d(-9px, -9px, 0) rotate(-20deg) scale(1);\r
    opacity: 1;\r
  }\r
  70% {\r
    transform: translate3d(-14px, 4px, 0) rotate(-31deg) scale(0.94);\r
    opacity: 0.85;\r
  }\r
  100% {\r
    transform: translate3d(-21px, 42px, 0) rotate(-52deg) scale(0.82);\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes ll-heart-break-right {\r
  0%,\r
  26% {\r
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);\r
    opacity: 1;\r
  }\r
  36% {\r
    transform: translate3d(4px, -5px, 0) rotate(8deg) scale(1.02);\r
    opacity: 1;\r
  }\r
  /* Peaks a touch earlier and lower than the left piece, so the two never read\r
     as one mirrored object. */\r
  48% {\r
    transform: translate3d(10px, -6px, 0) rotate(16deg) scale(1);\r
    opacity: 1;\r
  }\r
  70% {\r
    transform: translate3d(16px, 8px, 0) rotate(28deg) scale(0.93);\r
    opacity: 0.85;\r
  }\r
  100% {\r
    transform: translate3d(24px, 46px, 0) rotate(47deg) scale(0.8);\r
    opacity: 0;\r
  }\r
}\r
\r
/* --- Lyrics search states ----------------------------------------------------------- */\r
\r
.liquid-lyrics-skeleton {\r
  width: 100%;\r
  max-width: 900px;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 22px;\r
  padding: 40px 0;\r
}\r
\r
.ll-skeleton-row {\r
  height: 30px;\r
  border-radius: 10px;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  background:\r
    linear-gradient(\r
      100deg,\r
      rgba(255, 255, 255, 0.06) 28%,\r
      rgba(255, 255, 255, 0.17) 46%,\r
      rgba(255, 255, 255, 0.06) 64%\r
    )\r
    0 0 / 220% 100%;\r
  animation: ll-skeleton-sweep 1.5s ease-in-out infinite;\r
}\r
\r
/* Travelling the background position rather than a pseudo-element keeps the\r
   sweep on one layer per row. */\r
@keyframes ll-skeleton-sweep {\r
  0% {\r
    background-position: 130% 0;\r
  }\r
  100% {\r
    background-position: -30% 0;\r
  }\r
}\r
\r
.ll-empty-icon {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: rgba(255, 255, 255, 0.42);\r
}\r
\r
.ll-empty-icon svg {\r
  width: 46px;\r
  height: 46px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 1.5;\r
  stroke-linecap: round;\r
}\r
\r
.ll-sidebar-empty-icon svg {\r
  width: 30px;\r
  height: 30px;\r
}\r
\r
/* The card is short, so its placeholder rows are tighter than the panel's, and\r
   they start higher up \u2014 the card's own mask already fades the top edge. */\r
.liquid-lyrics-sidebar-card .liquid-lyrics-skeleton {\r
  gap: 12px;\r
  padding: 2px 12px 14px;\r
}\r
\r
.liquid-lyrics-sidebar-card .ll-skeleton-row {\r
  height: 18px;\r
  border-radius: 7px;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .ll-skeleton-row {\r
    animation: none;\r
  }\r
}\r
\r
/* The card ships centred, so the option only has anything to do in its off\r
   state \u2014 writing the centred rule instead would have been a no-op, which is\r
   exactly what it was. The two links also carry auto side margins of their own\r
   and have to be released, or they would stay centred inside a left-aligned\r
   block. */\r
.liquid-lyrics-panel:not(.ll-card-center-text) .ll-song-card-info,\r
.liquid-lyrics-panel:not(.ll-card-center-text) .ll-song-card-link {\r
  text-align: left;\r
}\r
\r
.liquid-lyrics-panel:not(.ll-card-center-text) .ll-song-card-link {\r
  margin-left: 0;\r
  margin-right: auto;\r
}\r
\r
.liquid-lyrics-panel.ll-card-hide-title .ll-song-card-title,\r
.liquid-lyrics-panel.ll-card-hide-artist .ll-song-card-artist,\r
.liquid-lyrics-panel.ll-card-hide-album .ll-song-card-album {\r
  display: none;\r
}\r
\r
/* --- Now Playing View --------------------------------------------------------------- */\r
\r
/* The card's own height, not the viewport inside it. Sizing the inner scroller\r
   was what broke the mini lyrics: a min-height taller than the content left the\r
   active line pinned to the bottom instead of centred. This replaces the\r
   built-in clamp() and keeps the inner viewport at height:100% as before. */\r
.liquid-lyrics-sidebar-card {\r
  height: clamp(var(--ll-npv-card-min-height, 320px), var(--ll-npv-card-height, 25vh), 90vh);\r
}\r
\r
/* Pinned over the whole sidebar rather than grown inside its scrolling column \u2014\r
   a fullscreen view of the lyrics without leaving the sidebar. The box is\r
   measured in sidebarCard.ts, and the move itself is played by FLIP there, since\r
   nothing about this change interpolates. */\r
.liquid-lyrics-sidebar-card.ll-expanded {\r
  position: fixed;\r
  top: var(--ll-card-fs-top, 0);\r
  left: var(--ll-card-fs-left, 0);\r
  width: var(--ll-card-fs-width, 100%);\r
  height: var(--ll-card-fs-height, 100vh);\r
  max-height: none;\r
  z-index: 6;\r
}\r
\r
.liquid-lyrics-sidebar-card.ll-card-flipping {\r
  transition: none !important;\r
}\r
\r
/* Its own layer is the whole picture here, so the card stops looking through\r
   itself. The frosted surface samples whatever is behind the card \u2014 which is\r
   still the sidebar and its configured background \u2014 so with the glass left on,\r
   the user's background showed through on top of the forced one. An opaque base\r
   also guarantees something behind the lyrics if WebGL is unavailable. */\r
.liquid-lyrics-sidebar-card.ll-expanded {\r
  background: #0b0f13;\r
  backdrop-filter: none;\r
  -webkit-backdrop-filter: none;\r
}\r
\r
/* The card's rim, drawn above everything inside it. The card's own box-shadow is\r
   inset, so it paints on the element's own background layer \u2014 underneath any\r
   positioned child, which is why the expanded card's background covered it. A\r
   pseudo-element sits above them both. Same arrangement the song card uses.\r
   The adopted shadow is listed first so a third-party theme's own one is used\r
   when there is no Liquify to take it from. */\r
.liquid-lyrics-sidebar-card::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  z-index: 3;\r
  pointer-events: none;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-rim-shadow);\r
}\r
\r
/* The expanded card's own background layer. Its siblings are unpositioned, so\r
   they need lifting above it \u2014 a positioned element otherwise paints over\r
   ordinary in-flow content regardless of source order. */\r
.liquid-lyrics-sidebar-card.ll-expanded > .liquid-lyrics-bg {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 0;\r
  border-radius: inherit;\r
}\r
\r
.liquid-lyrics-sidebar-card.ll-expanded > .ll-sidebar-card-header,\r
.liquid-lyrics-sidebar-card.ll-expanded > .ll-sidebar-card-body {\r
  position: relative;\r
  z-index: 1;\r
}\r
\r
:root.ll-npv-hide-card .liquid-lyrics-sidebar-card {\r
  display: none !important;\r
}\r
\r
/* Our own background layer inside Spotify's right sidebar. It is mounted behind\r
   the sidebar's content, so it needs its own stacking position rather than the\r
   panel's absolute fill. */\r
/* z-index below the flow, not a stack above it. Forcing every sibling to\r
   position:relative/z-index:1 (the previous approach) re-resolved the sidebar's\r
   own layout \u2014 which is where the extra right padding came from \u2014 and it lifted\r
   the content over Liquify's ::after rim, hiding the theme's shadow whenever a\r
   canvas was showing. A negative index needs neither. */\r
.liquid-lyrics-bg.ll-bg-sidebar {\r
  position: absolute;\r
  inset: 0;\r
  z-index: -1;\r
  border-radius: inherit;\r
}\r
\r
/* isolate keeps the -1 inside the sidebar instead of sinking behind the app,\r
   and leaves the ::after rim (z-index auto) painting above it. */\r
:root.ll-npv-background .Root__right-sidebar {\r
  position: relative;\r
  isolation: isolate;\r
}\r
\r
/* A z-index of -1 paints behind the parent's own background as well as behind\r
   its children, so anything opaque on the sidebar (or on the Now Playing View\r
   inside it) hid our layer completely. Turning the option on means our\r
   background replaces theirs, so those fills are cleared \u2014 the theme's rim,\r
   drawn in ::after, is unaffected and still shows. */\r
:root.ll-npv-background .Root__right-sidebar,\r
:root.ll-npv-background .Root__right-sidebar .main-nowPlayingView-container,\r
:root.ll-npv-background .Root__right-sidebar .NowPlayingView,\r
:root.ll-npv-background .Root__right-sidebar [class*="NowPlayingView"] {\r
  background-color: transparent !important;\r
  background-image: none !important;\r
}\r
\r
/* Idle auto-hide (cinema + native fullscreen only \u2014 see ui/idleUi.ts). Fading,\r
   not display:none, so everything glides back on the next mouse move. The pill\r
   already animates from its own resting transform; matching it here keeps the\r
   two paths from fighting over the transform property. */\r
.liquid-lyrics-panel.ll-ui-idle .liquid-lyrics-header,\r
.liquid-lyrics-panel.ll-ui-idle .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle:focus-within .liquid-lyrics-control-pill {\r
  opacity: 0;\r
  pointer-events: none;\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle:focus-within .liquid-lyrics-control-pill {\r
  transform: translate3d(-50%, 14px, 0) scale(0.98);\r
}\r
\r
/* The scrollbar dissolves rather than collapsing: taking its 5px away would\r
   reflow every lyric line each time the pointer comes to rest. Both properties\r
   are set because a Chromium that honours \`scrollbar-width\` ignores the\r
   ::-webkit- pseudo-elements, and older builds do the opposite. */\r
.liquid-lyrics-panel.ll-ui-idle .liquid-lyrics-content {\r
  scrollbar-color: transparent transparent;\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle .liquid-lyrics-content::-webkit-scrollbar-thumb {\r
  background: transparent;\r
}\r
\r
/* Applied to the panel and everything under it: \`cursor\` is inherited, but any\r
   descendant setting its own (the lyric lines are buttons) would keep showing\r
   one \u2014 hence the descendant selector and the !important. */\r
.liquid-lyrics-panel.ll-ui-idle-cursor,\r
.liquid-lyrics-panel.ll-ui-idle-cursor * {\r
  cursor: none !important;\r
}\r
\r
/* --- 13. Settings menu -----------------------------------------------------------\r
   A port of Liquify V2's settings modal (src/settings/components/settingsStyles.tsx\r
   in the theme). Sizes, radii, paddings and easings are taken over verbatim so the\r
   two settings surfaces read as one product; only the variable names are ours. */\r
\r
.ll-settings-overlay {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483600;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 24px;\r
  background: transparent;\r
  overflow: hidden;\r
  font-family: var(--font-family, "Spotify Mix", "CircularSp", system-ui, sans-serif);\r
  font-size: 14px;\r
  color: #fff;\r
}\r
\r
.ll-settings-filters {\r
  position: absolute;\r
  width: 0;\r
  height: 0;\r
  overflow: hidden;\r
  pointer-events: none;\r
}\r
\r
.ll-settings-panel {\r
  position: relative;\r
  isolation: isolate;\r
  display: flex;\r
  flex-direction: column;\r
  width: min(560px, 92vw);\r
  min-width: 0;\r
  height: min(70vh, calc(100vh - 80px));\r
  max-height: min(70vh, calc(100vh - 80px));\r
  padding: 18px 0 20px;\r
  border-radius: 20px;\r
  color: #fff;\r
  background: transparent;\r
  /* Liquify registers this panel with a 5px glass blur rather than the 2px its\r
     other surfaces use, hence the dedicated variable. The extra brightness step\r
     darkens whatever is behind it, so the settings read clearly over a bright\r
     cover. */\r
  backdrop-filter: var(--liquid-lyrics-settings-backdrop) brightness(0.8);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-settings-backdrop) brightness(0.8);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  overflow: hidden;\r
  /* Closed baseline \u2014 the enter/exit transitions live on the overlay's state\r
     classes so the exit can use its own, sharper curve. */\r
  opacity: 0;\r
  transform: scale(0.86);\r
  transform-origin: top center;\r
  will-change: transform, opacity;\r
}\r
\r
.ll-settings-overlay.visible .ll-settings-panel {\r
  opacity: 1;\r
  transform: translateY(0) scale(1);\r
  transition:\r
    transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1),\r
    opacity 360ms ease-out;\r
}\r
\r
.ll-settings-overlay.closing .ll-settings-panel {\r
  opacity: 0;\r
  transform: translateY(8px) scale(0.95);\r
  transition:\r
    transform 260ms cubic-bezier(0.8, 0, 0.2, 1),\r
    opacity 220ms ease-in;\r
}\r
\r
/* --- Header --- */\r
\r
/* Liquify declares height:100px here but leaves the header shrinkable, so in its\r
   own panel \u2014 packed with eleven sections \u2014 flex compresses it to roughly a\r
   third of that. Reproducing the declared value gave a header three times the\r
   height of the one it is modelled on, and reproducing the shrink would tie the\r
   title bar's size to how many rows happen to sit below it. Hence a fixed\r
   compact height: it matches what Liquify actually renders and stays put. */\r
.ll-settings-header {\r
  position: relative;\r
  z-index: 10;\r
  flex: 0 0 auto;\r
  height: 30px;\r
  margin: 0 0 12px 0;\r
  padding: 0 12px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: transparent;\r
  overflow: hidden;\r
  isolation: isolate;\r
}\r
\r
.ll-settings-title {\r
  position: relative;\r
  z-index: 1;\r
  margin: 0;\r
  font-size: 1.17em;\r
  font-weight: 700;\r
  text-align: center;\r
}\r
\r
.ll-settings-header-actions {\r
  position: absolute;\r
  z-index: 1;\r
  right: 16px;\r
  top: 50%;\r
  transform: translateY(-50%);\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
\r
/* The close button and the section-jump row both sit inside clipped strips \u2014\r
   the header and the horizontally scrolling nav \u2014 where Glowify's outward glow\r
   is sliced off at the edge. They take the flat accent outline instead. */\r
.ll-settings-header-btn,\r
.ll-settings-section-nav-btn,\r
.ll-settings-section-nav-scroll-btn {\r
  --ll-surface-rim: var(--liquid-lyrics-flat-rim);\r
}\r
\r
.ll-settings-header-btn {\r
  width: 28px;\r
  height: 28px;\r
  padding: 0;\r
  --ll-control-radius: 8px;\r
  border-radius: 8px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  line-height: 1;\r
  cursor: pointer;\r
  transition: background-color 0.2s ease;\r
}\r
\r
.ll-settings-header-btn:hover {\r
  background: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-settings-header-btn svg {\r
  display: block;\r
  width: 18px;\r
  height: 18px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
}\r
\r
/* --- Search island --- */\r
\r
.ll-settings-search-island {\r
  flex: 0 0 auto;\r
  margin: 0 34px 12px 34px;\r
  padding: 10px;\r
  border-radius: 16px;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
}\r
\r
.ll-settings-search-input {\r
  width: 100%;\r
  padding: 8px 12px;\r
  font-size: 13px;\r
  border: none;\r
  outline: none;\r
}\r
\r
.ll-settings-search-input::placeholder {\r
  color: rgba(255, 255, 255, 0.45);\r
}\r
\r
.ll-settings-section-nav-wrap {\r
  position: relative;\r
  min-width: 0;\r
}\r
\r
.ll-settings-section-nav {\r
  display: flex;\r
  gap: 8px;\r
  min-width: 0;\r
  overflow-x: auto;\r
  overflow-y: hidden;\r
  /* Room so the buttons' hover scale and glow aren't clipped by the scroll\r
     container. */\r
  padding: 10px 12px 13px;\r
  scrollbar-width: none;\r
  -ms-overflow-style: none;\r
}\r
\r
.ll-settings-section-nav::-webkit-scrollbar {\r
  width: 0;\r
  height: 0;\r
  display: none;\r
}\r
\r
.ll-settings-section-nav-btn {\r
  flex: 0 0 auto;\r
  height: 28px;\r
  padding: 5px 12px;\r
  --ll-control-radius: 10px;\r
  border-radius: 10px;\r
  cursor: pointer;\r
  white-space: nowrap;\r
  font-size: 12px;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    background-color 0.2s ease;\r
}\r
\r
.ll-settings-section-nav-btn:hover {\r
  transform: scale(1.08);\r
  background: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-settings-section-nav-btn:active {\r
  transform: scale(0.95);\r
}\r
\r
/* Mounted on the overlay and positioned by measurement (see buildSearchIsland),\r
   the way Liquify portals its own to <body>. Nesting them inside the panel left\r
   them flat: the panel's backdrop-filter establishes a stacking context, and a\r
   backdrop-filter only samples what is painted behind its own context \u2014 so a\r
   glass button inside the panel has nothing left to refract. */\r
.ll-settings-section-nav-scroll-btn {\r
  position: fixed;\r
  z-index: 2147483602;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  width: 30px;\r
  height: 28px;\r
  padding: 0;\r
  border-radius: 12px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  line-height: 1;\r
  cursor: pointer;\r
  opacity: 0;\r
  pointer-events: none;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    background-color 0.2s ease,\r
    opacity 0.2s ease;\r
}\r
\r
.ll-settings-section-nav-scroll-btn svg {\r
  display: block;\r
  width: 14px;\r
  height: 14px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2.4;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-settings-section-nav-scroll-btn.is-visible {\r
  opacity: 1;\r
  pointer-events: auto;\r
}\r
\r
.ll-settings-section-nav-scroll-btn:hover {\r
  transform: scale(1.08);\r
  background: var(--liquid-lyrics-accent);\r
}\r
\r
.ll-settings-section-nav-scroll-btn:active {\r
  transform: scale(0.95);\r
}\r
\r
/* --- Body --- */\r
\r
.ll-settings-body {\r
  flex: 1 1 auto;\r
  min-height: 0;\r
  overflow-x: hidden;\r
  overflow-y: auto;\r
  /* Safe padding so large outer glows don't get clipped by the scroll container. */\r
  padding: 34px;\r
  padding-top: 0;\r
  padding-right: 22px;\r
  padding-bottom: 10px;\r
  margin-bottom: -20px;\r
  box-sizing: border-box;\r
  scrollbar-width: auto;\r
  scrollbar-color: rgba(205, 205, 205, 0.78) transparent;\r
}\r
\r
.ll-settings-body::-webkit-scrollbar {\r
  width: 12px;\r
}\r
\r
.ll-settings-body::-webkit-scrollbar-track {\r
  background: transparent;\r
}\r
\r
.ll-settings-body::-webkit-scrollbar-thumb {\r
  background: rgba(205, 205, 205, 0.78);\r
  border-radius: 999px;\r
}\r
\r
.ll-settings-body::-webkit-scrollbar-thumb:hover {\r
  background: rgba(225, 225, 225, 0.9);\r
}\r
\r
.ll-settings-section {\r
  margin: 12px 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
  /* The section-jump buttons scroll to this element; without the offset a\r
     heading lands flush against the search island above it. */\r
  scroll-margin-top: 8px;\r
}\r
\r
.ll-settings-section-title {\r
  margin: 0;\r
  padding: 10px 12px;\r
  text-align: center;\r
  font-weight: 700;\r
  border-radius: 14px;\r
  background: transparent;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
}\r
\r
.ll-settings-section-body {\r
  padding: 10px;\r
  border-radius: 14px;\r
  background: transparent;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
}\r
\r
.ll-settings-subsection {\r
  margin: 8px 0;\r
  padding: 10px;\r
  border-radius: 15px;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
\r
.ll-settings-subsection .ll-settings-row {\r
  margin: 0;\r
}\r
\r
.ll-settings-subsection-title {\r
  margin: 0 0 2px 4px;\r
  font-size: 13px;\r
  font-weight: 700;\r
  text-align: left;\r
  color: #fff;\r
}\r
\r
.ll-settings-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-start;\r
  gap: 10px;\r
  width: 100%;\r
  margin: 8px 0;\r
  flex-wrap: wrap;\r
  padding: 10px;\r
  border-radius: 17px;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  transition: opacity 220ms ease;\r
}\r
\r
/* Rows whose control depends on another setting (e.g. the auto-hide delay) dim\r
   instead of disappearing, so the layout never jumps as options are flipped. */\r
.ll-settings-row.is-disabled {\r
  opacity: 0.42;\r
}\r
\r
/* The whole control area stops taking pointer input while the row is off, so a\r
   click on it is inert rather than half-working. */\r
.ll-settings-row.is-disabled .ll-settings-row-controls {\r
  pointer-events: none;\r
}\r
\r
/* Rows that belong to a dropdown value other than the selected one leave the\r
   layout entirely \u2014 see hiddenUnless() in the menu. */\r
.ll-settings-row.is-hidden {\r
  display: none;\r
}\r
\r
.ll-settings-label {\r
  min-width: 140px;\r
  flex: 1 1 140px;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 3px;\r
  text-align: left;\r
}\r
\r
.ll-settings-label-text {\r
  font-weight: 600;\r
  color: rgba(255, 255, 255, 0.94);\r
}\r
\r
.ll-settings-hint {\r
  font-size: 11.5px;\r
  line-height: 1.42;\r
  color: rgba(255, 255, 255, 0.56);\r
}\r
\r
.ll-settings-row-controls {\r
  display: flex;\r
  gap: 10px;\r
  flex: 0 0 auto;\r
  margin-left: auto;\r
  justify-content: flex-end;\r
  flex-wrap: nowrap;\r
  min-width: 0;\r
  max-width: 100%;\r
}\r
\r
.ll-settings-row-controls > * {\r
  flex: 0 0 auto;\r
  min-width: 0;\r
}\r
\r
/* Only the family is inherited. The \`font\` shorthand used to sit here, but it\r
   also resets font-size and line-height \u2014 and since this rule comes after the\r
   header's, it silently undid the close button's own sizing. Every control that\r
   needs a size now states it. */\r
.ll-settings-surface {\r
  border: none;\r
  border-radius: 12px;\r
  color: #fff;\r
  background: transparent;\r
  /* Controls opt out of the glow by setting --ll-surface-rim; see the header\r
     button and the section-jump row below. */\r
  box-shadow: var(--ll-surface-rim, var(--liquid-lyrics-surface-shadow));\r
  outline: var(--glowify-outline, none) !important;\r
  font-family: inherit;\r
  font-weight: inherit;\r
}\r
\r
/* --- Stepper --- */\r
\r
.ll-settings-inline {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
.ll-settings-stepper-btn {\r
  width: 24px;\r
  height: 24px;\r
  --ll-control-radius: 9px;\r
  border-radius: 9px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 15px;\r
  line-height: 1;\r
  cursor: pointer;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    background-color 0.2s ease,\r
    opacity 0.2s ease;\r
}\r
\r
.ll-settings-stepper-btn:hover:not(:disabled) {\r
  background: var(--liquid-lyrics-accent);\r
  transform: scale(1.15);\r
}\r
\r
/* Press feedback must NOT shrink the button: a smaller :active box pulls its\r
   edge out from under the cursor, so an edge press releases outside the button\r
   and the click never fires. Keep the hovered scale and darken instead. */\r
.ll-settings-stepper-btn:active:not(:disabled) {\r
  transform: scale(1.15);\r
  filter: brightness(0.82);\r
}\r
\r
.ll-settings-stepper-btn:disabled {\r
  opacity: 0.35;\r
  cursor: default;\r
}\r
\r
.ll-settings-number-input {\r
  width: 74px;\r
  padding: 5px 6px;\r
  font-size: 13px;\r
  text-align: center;\r
  outline: none;\r
}\r
\r
.ll-settings-number-input::-webkit-outer-spin-button,\r
.ll-settings-number-input::-webkit-inner-spin-button {\r
  appearance: none;\r
  margin: 0;\r
}\r
\r
/* --- Text, colour and file controls --- */\r
\r
.ll-settings-text-input {\r
  width: 200px;\r
  max-width: 100%;\r
  padding: 6px 10px;\r
  font-size: 12.5px;\r
  outline: none;\r
}\r
\r
.ll-settings-text-input::placeholder {\r
  color: rgba(255, 255, 255, 0.4);\r
}\r
\r
.ll-settings-color {\r
  position: relative;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 5px 10px 5px 6px;\r
  cursor: pointer;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    background-color 0.2s ease;\r
}\r
\r
.ll-settings-color:hover:not(:disabled) {\r
  background: rgba(255, 255, 255, 0.08);\r
  transform: scale(1.03);\r
}\r
\r
.ll-settings-color:active:not(:disabled) {\r
  transform: scale(0.97);\r
}\r
\r
/* --- Colour picker popover (port of Liquify's react-colorful panel) --- */\r
\r
.ll-settings-popover {\r
  position: fixed;\r
  z-index: 2147483601;\r
  border-radius: 17px;\r
  overflow: hidden;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  opacity: 0;\r
  transform: translateY(-4px) scale(0.98);\r
  transform-origin: top center;\r
  transition:\r
    opacity 160ms ease,\r
    transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);\r
}\r
\r
.ll-settings-popover.visible {\r
  opacity: 1;\r
  transform: translateY(0) scale(1);\r
}\r
\r
.ll-settings-color-picker {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 10px;\r
  padding: 12px;\r
  width: 224px;\r
}\r
\r
.ll-color-saturation {\r
  position: relative;\r
  height: 150px;\r
  border-radius: 15px;\r
  cursor: crosshair;\r
  touch-action: none;\r
  box-shadow:\r
    inset 0 1px 0 rgba(255, 255, 255, 0.1),\r
    inset 1px 0 0 rgba(255, 255, 255, 0.1),\r
    inset -1px 0 0 rgba(255, 255, 255, 0.1);\r
}\r
\r
.ll-color-hue {\r
  position: relative;\r
  height: 12px;\r
  border-radius: 10px;\r
  cursor: ew-resize;\r
  touch-action: none;\r
  background: linear-gradient(\r
    to right,\r
    #f00 0%,\r
    #ff0 16%,\r
    #0f0 33%,\r
    #0ff 50%,\r
    #00f 66%,\r
    #f0f 83%,\r
    #f00 100%\r
  );\r
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);\r
}\r
\r
.ll-color-pointer {\r
  position: absolute;\r
  z-index: 2;\r
  width: 14px;\r
  height: 14px;\r
  border-radius: 999px;\r
  pointer-events: none;\r
  transform: translate(-50%, -50%);\r
  box-shadow:\r
    0 0 0 3px rgba(0, 0, 0, 0.35),\r
    0 0 0 2px rgba(255, 255, 255, 0.95);\r
}\r
\r
.ll-color-hue-pointer {\r
  top: 50%;\r
  width: 16px;\r
  height: 16px;\r
  background: rgba(255, 255, 255, 0.95);\r
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.35);\r
}\r
\r
.ll-color-preview-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
.ll-color-preview {\r
  width: 34px;\r
  height: 34px;\r
  flex: 0 0 34px;\r
  border-radius: 10px;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
}\r
\r
.ll-color-hex {\r
  flex: 1 1 auto;\r
  min-width: 0;\r
  padding: 6px 8px;\r
  font-size: 12.5px;\r
  text-align: center;\r
  text-transform: uppercase;\r
  outline: none;\r
}\r
\r
.ll-settings-color-swatch {\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 6px;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  pointer-events: none;\r
}\r
\r
.ll-settings-color-value {\r
  font-size: 12px;\r
  font-variant-numeric: tabular-nums;\r
  pointer-events: none;\r
}\r
\r
.ll-settings-action-btn {\r
  padding: 6px 12px;\r
  font-size: 12.5px;\r
  cursor: pointer;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    background-color 0.2s ease;\r
}\r
\r
.ll-settings-action-btn:hover:not(:disabled) {\r
  background: rgba(255, 255, 255, 0.08);\r
  transform: scale(1.03);\r
}\r
\r
.ll-settings-action-btn:active:not(:disabled) {\r
  transform: scale(0.97);\r
}\r
\r
/* --- Select --- */\r
\r
.ll-settings-select {\r
  appearance: none;\r
  padding: 6px 10px;\r
  cursor: pointer;\r
  min-width: 0;\r
  width: auto;\r
  max-width: 260px;\r
  text-align: left;\r
  position: relative;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 10px;\r
  font-size: 13px;\r
  white-space: nowrap;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    background-color 0.2s ease;\r
}\r
\r
.ll-settings-select:hover {\r
  background: rgba(255, 255, 255, 0.08);\r
  transform: scale(1.03);\r
}\r
\r
.ll-settings-select:active {\r
  transform: scale(0.97);\r
}\r
\r
.ll-settings-select:focus-visible {\r
  outline: 2px solid var(--liquid-lyrics-accent);\r
  outline-offset: 2px;\r
}\r
\r
.ll-settings-select-label {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.ll-settings-select-chevron {\r
  position: relative;\r
  flex: 0 0 14px;\r
  width: 14px;\r
  height: 14px;\r
}\r
\r
.ll-settings-select-chevron::before {\r
  content: "";\r
  position: absolute;\r
  left: 4px;\r
  top: 3px;\r
  width: 6px;\r
  height: 6px;\r
  border-right: 2px solid currentColor;\r
  border-bottom: 2px solid currentColor;\r
  transform: rotate(45deg);\r
  transform-origin: 50% 50%;\r
  transition: transform 160ms ease;\r
  will-change: transform;\r
}\r
\r
.ll-settings-select.isOpen .ll-settings-select-chevron::before {\r
  transform: rotate(-135deg);\r
}\r
\r
.ll-settings-select-menu {\r
  position: fixed;\r
  z-index: 2147483601;\r
  padding: 4px;\r
  border-radius: 15px;\r
  overflow: hidden;\r
  box-sizing: border-box;\r
  width: max-content;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-surface-backdrop);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  font-family: var(--font-family, "Spotify Mix", "CircularSp", system-ui, sans-serif);\r
  font-size: 14px;\r
  opacity: 0;\r
  transform: translateY(-4px) scale(0.98);\r
  transform-origin: top center;\r
  transition:\r
    opacity 160ms ease,\r
    transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);\r
}\r
\r
.ll-settings-select-menu.visible {\r
  opacity: 1;\r
  transform: translateY(0) scale(1);\r
}\r
\r
.ll-settings-select-item {\r
  padding: 8px 10px;\r
  margin: 2px;\r
  --ll-control-radius: 10px;\r
  border-radius: 10px;\r
  cursor: pointer;\r
  user-select: none;\r
  white-space: nowrap;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  text-align: center;\r
  transition:\r
    background-color 0.25s ease,\r
    box-shadow 0.28s ease,\r
    transform 0.25s ease;\r
}\r
\r
.ll-settings-select-item:hover {\r
  background: var(--liquid-lyrics-accent);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  transform: scale(1.02);\r
}\r
\r
/* The selected entry is marked by weight alone, not colour \u2014 Liquify's menu\r
   keeps every item plain white. */\r
.ll-settings-select-item.is-selected {\r
  font-weight: 700;\r
}\r
\r
/* --- Footer --- */\r
\r
.ll-settings-footer {\r
  display: flex;\r
  justify-content: center;\r
  padding: 12px 0 4px;\r
}\r
\r
.ll-settings-reset-btn {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 8px 14px;\r
  --ll-control-radius: 13px;\r
  border-radius: 13px;\r
  color: rgba(255, 255, 255, 0.82);\r
  font-size: 13px;\r
  cursor: pointer;\r
  transition:\r
    transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1),\r
    box-shadow 0.28s ease,\r
    background-color 0.2s ease;\r
}\r
\r
.ll-settings-reset-btn svg {\r
  width: 14px;\r
  height: 14px;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-settings-reset-btn:hover {\r
  color: #fff;\r
  background: var(--liquid-lyrics-accent);\r
  transform: scale(1.08);\r
}\r
\r
.ll-settings-reset-btn:active {\r
  transform: scale(0.95);\r
}\r
\r
/* --- Liquid toggle -------------------------------------------------------------\r
   Liquify's toggle, layer for layer. --complete (0-100) drives every part: the\r
   aria-pressed rule sets it for taps, and a drag writes it inline frame by frame\r
   with the transition switched off. */\r
\r
.ll-toggle {\r
  --complete: 0;\r
  --unchecked: transparent;\r
  --checked: var(--liquid-lyrics-accent);\r
  --control: #fff;\r
  --border: 3px;\r
  --width: 54;\r
  --height: 30;\r
  --transition: 0.2s;\r
  --ease: ease-out;\r
  position: relative;\r
  flex: 0 0 auto;\r
  width: calc(var(--width) * 1px);\r
  height: calc(var(--height) * 1px);\r
  padding: 0;\r
  border: 0;\r
  --ll-control-radius: 999px;\r
  border-radius: 999px;\r
  background: transparent;\r
  cursor: pointer;\r
  container-type: inline-size;\r
  overflow: visible;\r
  isolation: isolate;\r
  transform-style: preserve-3d;\r
  touch-action: none;\r
  user-select: none;\r
  transition: transform 0.28s cubic-bezier(0.3, 2.25, 0.32, 1);\r
}\r
\r
.ll-toggle * {\r
  pointer-events: none;\r
}\r
\r
/* A disabled toggle must not respond at all. \`disabled\` alone was not enough:\r
   the swell is driven by :active and a data attribute, and a press on the row\r
   still grew the knob even though the value never changed \u2014 which reads as the\r
   control having worked. */\r
.ll-toggle:disabled {\r
  cursor: default;\r
  pointer-events: none;\r
}\r
\r
.ll-toggle:focus-visible {\r
  outline: 2px solid var(--checked);\r
  outline-offset: 3px;\r
}\r
\r
.ll-toggle[aria-pressed="true"] {\r
  --complete: 100;\r
}\r
\r
.ll-toggle[data-active="true"] {\r
  --transition: 0.32s;\r
  --ease: cubic-bezier(0.3, 2.25, 0.32, 1);\r
}\r
\r
/* While dragging, kill the transition so the knob tracks the cursor 1:1. Placed\r
   after the data-active rule so it wins on the shared --transition. */\r
.ll-toggle[data-dragging="true"] {\r
  --transition: 0s;\r
  --ease: linear;\r
}\r
\r
.ll-toggle-indicator {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 0;\r
  border-radius: inherit;\r
  overflow: hidden;\r
  background: color-mix(in srgb, var(--unchecked), var(--checked) calc(var(--complete) * 1%));\r
  transition: background-color var(--transition) var(--ease);\r
}\r
\r
.ll-toggle-knockout {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 1;\r
  border-radius: inherit;\r
  overflow: hidden;\r
}\r
\r
.ll-toggle-wrapper {\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  clip-path: inset(0 0 0 0 round 999px);\r
  filter: blur(4px);\r
  transition: filter var(--transition) var(--ease);\r
}\r
\r
.ll-toggle[data-active="true"]:not(:disabled) .ll-toggle-wrapper,\r
.ll-toggle:active:not(:disabled) .ll-toggle-wrapper {\r
  filter: blur(0);\r
}\r
\r
.ll-toggle-liquids {\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  overflow: hidden;\r
  filter: url(#liquid-lyrics-toggle-goo);\r
}\r
\r
.ll-toggle-liquid-shadow {\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  box-shadow:\r
    inset 0 0 3px 3px var(--checked),\r
    inset calc(((var(--complete) / 100) * 6px) - 3px) 0 3px 3px var(--checked);\r
  opacity: calc(var(--complete) / 100);\r
  transition:\r
    opacity var(--transition) var(--ease),\r
    box-shadow var(--transition) var(--ease);\r
}\r
\r
.ll-toggle-liquid-track {\r
  position: absolute;\r
  top: 50%;\r
  left: 0;\r
  width: calc(var(--width) * 1px);\r
  height: calc(var(--height) * 1px);\r
  border-radius: inherit;\r
  background: var(--checked);\r
  /* Fade the accent fill with --complete so the toggle is transparent when off\r
     and only shows the accent colour when on. */\r
  opacity: calc(var(--complete) / 100);\r
  translate: calc((var(--complete) / 100) * (100cqi - 100% - (6 * var(--border)))) -50%;\r
  transition:\r
    opacity var(--transition) var(--ease),\r
    translate var(--transition) var(--ease),\r
    height var(--transition) var(--ease),\r
    width var(--transition) var(--ease),\r
    left var(--transition) var(--ease);\r
}\r
\r
.ll-toggle-indicator--masked {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 2;\r
  border-radius: inherit;\r
  background: var(--checked);\r
  opacity: calc(var(--complete) / 100);\r
  overflow: hidden;\r
  transition: opacity var(--transition) var(--ease);\r
}\r
\r
.ll-toggle-mask {\r
  position: absolute;\r
  top: 50%;\r
  left: var(--border);\r
  width: calc(60% - (2 * var(--border)));\r
  height: calc(100% - (2 * var(--border)));\r
  border-radius: inherit;\r
  background: rgba(0, 0, 0, 0.18);\r
  translate: calc((var(--complete) / 100) * (100cqi - 60cqi)) -50%;\r
  transition:\r
    translate var(--transition) var(--ease),\r
    height var(--transition) var(--ease),\r
    width var(--transition) var(--ease),\r
    margin var(--transition) var(--ease);\r
}\r
\r
.ll-toggle-knob {\r
  position: absolute;\r
  top: 50%;\r
  left: var(--border);\r
  z-index: 3;\r
  width: calc(60% - (2 * var(--border)));\r
  height: calc(100% - (2 * var(--border)));\r
  border-radius: inherit;\r
  overflow: hidden;\r
  background: transparent;\r
  /* A plain blur, not --liquid-lyrics-surface-backdrop: that variable can carry\r
     Liquify's SVG refraction, whose displacement map is authored for a specific\r
     corner radius and tears at a knob this small. (Liquify itself attaches a\r
     purpose-built GlassSurface here, which an extension cannot register.) */\r
  backdrop-filter: blur(6px) saturate(1.4) brightness(1.12);\r
  -webkit-backdrop-filter: blur(6px) saturate(1.4) brightness(1.12);\r
  box-shadow:\r
    inset 0 1px 1px rgba(255, 255, 255, 0.55),\r
    inset 0 -1px 1px rgba(0, 0, 0, 0.28),\r
    0 1px 3px rgba(0, 0, 0, 0.35);\r
  translate: calc((var(--complete) / 100) * (100cqi - 100% - (2 * var(--border)))) -50%;\r
  transition:\r
    translate var(--transition) var(--ease),\r
    scale var(--transition) var(--ease);\r
}\r
\r
/* The press swell: knob and mask grow together so the goo filter melts them into\r
   one blob, then they settle back once the slide is done. */\r
.ll-toggle[data-active="true"]:not(:disabled) .ll-toggle-knob,\r
.ll-toggle:active:not(:disabled) .ll-toggle-knob {\r
  scale: 1.65;\r
}\r
\r
.ll-toggle[data-active="true"]:not(:disabled) .ll-toggle-mask,\r
.ll-toggle:active:not(:disabled) .ll-toggle-mask {\r
  height: calc((100% - (2 * var(--border))) * 1.65);\r
  width: calc((60% - (2 * var(--border))) * 1.65);\r
  margin-left: calc((60% - (2 * var(--border))) * -0.325);\r
}\r
\r
/* Thin top highlight and faint bottom shade over the glass lens, so it reads as\r
   glass without hiding the refraction underneath. */\r
.ll-toggle-gloss {\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  pointer-events: none;\r
  background: linear-gradient(\r
    to bottom,\r
    rgba(255, 255, 255, 0.35),\r
    rgba(255, 255, 255, 0) 45%,\r
    rgba(0, 0, 0, 0.1)\r
  );\r
}\r
\r
/* Pill rim, painted above every coloured/glass layer so it stays visible whether\r
   the toggle is on or off \u2014 the inset rim shadow would otherwise be hidden by\r
   the opaque "on" indicator. */\r
.ll-toggle-rim {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 4;\r
  border-radius: inherit;\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  pointer-events: none;\r
}\r
\r
@media (max-width: 720px) {\r
  .ll-settings-panel {\r
    width: 100%;\r
    height: 100%;\r
    max-height: none;\r
    border-radius: 18px;\r
  }\r
\r
  .ll-settings-search-island {\r
    margin: 0 18px 12px 18px;\r
  }\r
\r
  .ll-settings-body {\r
    padding-left: 18px;\r
    padding-right: 12px;\r
  }\r
}\r
`;function el(){let t="liquid-lyrics-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=Qa,document.head.appendChild(e)}var Wh=".main-nowPlayingBar-lyricsButton, .vVsHwFW9rx4CZOne",tl=!1;function il(){tl||(tl=!0,document.addEventListener("click",t=>{C().spotifyLyricsButton!=="override"||!t.target?.closest?.(Wh)||(t.preventDefault(),t.stopImmediatePropagation(),Ei())},!0))}var zi="ll-theme-adopted",rl="blur(32px)",ol=".main-nowPlayingView-section",Vh="var(--liquid-lyrics-accent-outline)",an=null,ln=0,cn="";function sl(){dn();let t=0;if(ln=window.setInterval(()=>{t++,dn(),(t>40||document.querySelector(ol))&&(window.clearInterval(ln),ln=0)},400),!an){let e=0;an=new MutationObserver(()=>{e||(e=window.setTimeout(()=>{e=0,dn()},300))}),an.observe(document.body,{childList:!0,subtree:!0})}}function dn(){let t=document.documentElement;if(Gh()){if(t.classList.contains(zi)){t.classList.remove(zi);for(let u of Kh)t.style.removeProperty(u);cn=""}return}let e=$h(),i=e?getComputedStyle(e):null,r=_e(i?.boxShadow),n=_e(i?.backdropFilter)??_e(i?.webkitBackdropFilter),o=_e(i?.backgroundColor),s=i?Yh(i.borderRadius):void 0,a=r?void 0:al(i),l=`${r}|${a}|${n}|${o}|${s}`;if(l===cn&&t.classList.contains(zi))return;cn=l,t.classList.add(zi);let c=(u,p)=>t.style.setProperty(u,p),d=r??a??Vh;c("--liquid-lyrics-surface-shadow",d),c("--liquid-lyrics-song-card-shadow",d),c("--liquid-lyrics-rim-shadow",d),c("--liquid-lyrics-flat-rim",d),c("--liquid-lyrics-surface-backdrop",n??rl),c("--liquid-lyrics-settings-backdrop",n??rl),c("--ll-theme-card-bg",o??"transparent"),c("--ll-theme-card-radius",s??"20px")}var Kh=["--liquid-lyrics-surface-shadow","--liquid-lyrics-song-card-shadow","--liquid-lyrics-rim-shadow","--liquid-lyrics-flat-rim","--liquid-lyrics-surface-backdrop","--liquid-lyrics-settings-backdrop","--ll-theme-card-bg","--ll-theme-card-radius"];function $h(){let t=Array.from(document.querySelectorAll(ol)),e=null;for(let i of t){if(e??(e=i),nl(i))return i;let r=i.getBoundingClientRect().width;for(let n of Array.from(i.children))if(!(n.getBoundingClientRect().width<r*.9)&&nl(n))return n}return e}function nl(t){let e=getComputedStyle(t);return!!(_e(e.boxShadow)||al(e)||_e(e.backgroundColor)||_e(e.borderRadius))}function Gh(){if(document.getElementById("glass-filter--r1-7"))return!0;let t=getComputedStyle(document.documentElement);return un(t.getPropertyValue("--liquify-shadow"))||un(t.getPropertyValue("--glass-shadow"))||un(t.getPropertyValue("--glowify-shadow"))}function al(t){if(!t)return;let e=Number.parseFloat(t.borderTopWidth||"0"),i=t.borderTopStyle,r=t.borderTopColor;if(!(!Number.isFinite(e)||e<=0)&&!(!i||i==="none"||i==="hidden")&&_e(r))return`inset 0 0 0 ${e}px ${r}`}function un(t){let e=t.trim();return e!==""&&e!=="none"}function _e(t){if(!t)return;let e=t.trim();if(!(e===""||e==="none"||e==="auto")&&!/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(e)&&e!=="0px")return e}function Yh(t){if(!t)return;let e=t.trim();if(!(e===""||e==="none"||e==="auto"))return e}var Jh="--liquid-lyrics-accent-auto",Xh=["VIBRANT","VIBRANT_NON_ALARMING","PROMINENT","LIGHT_VIBRANT","DESATURATED"];var pn="",ll=!1;function pl(){if(!ll){ll=!0,cl();try{Spicetify.Player?.addEventListener?.("songchange",t=>void cl(t?.data?.item))}catch{}}}async function cl(t){let e=t??Spicetify.Player?.data?.item,i=e?.uri;if(!i||i===pn)return;pn=i;let r=await Qh(Zh(e))??await ef(i);if(!r){pn="";return}document.documentElement.style.setProperty(Jh,rf(r))}function Zh(t){let e=t?.metadata?.image_url;return typeof e!="string"||!e?null:e.replace("spotify:image:","https://i.scdn.co/image/")}async function Qh(t){if(!t)return null;if(/^https?:/i.test(t)){let i=await dl(t,!0),r=i&&ul(i);if(r)return r}let e=await dl(t,!1);return e?ul(e):null}function dl(t,e){return new Promise(i=>{let r=new Image;e&&(r.crossOrigin="Anonymous"),r.onload=()=>i(r),r.onerror=()=>i(null),r.src=t})}function ul(t){try{let e=Math.min(1,Math.sqrt(1e6/(t.width*t.height))),i=Math.max(1,Math.round(t.width*e)),r=Math.max(1,Math.round(t.height*e)),n=document.createElement("canvas");n.width=i,n.height=r;let o=n.getContext("2d",{willReadFrequently:!0});if(!o)return null;o.drawImage(t,0,0,i,r);let{data:s}=o.getImageData(0,0,i,r),a=0,l=0,c=0,d=0;for(let u=0;u<s.length;u+=4)a+=s[u],l+=s[u+1],c+=s[u+2],d++;return d?`rgb(${Math.round(a/d)},${Math.round(l/d)},${Math.round(c/d)})`:null}catch{return null}}async function ef(t){try{let e=await Spicetify.colorExtractor?.(t);if(e)for(let i of Xh){let r=e[i];if(typeof r=="string"&&r.trim())return r.trim()}}catch{}try{let e=await Spicetify.extractColorPreset?.(t),i=Array.isArray(e)?e[0]:e;for(let r of[i?.colorRaw,i?.colorLight,i?.colorDark]){let n=tf(r);if(n)return n}}catch{}return null}function tf(t){if(!t)return null;if(typeof t=="string")return hn(t)?t.trim():null;let e=t.hex??(typeof t.toCSS=="function"?t.toCSS():void 0)??(typeof t.toString=="function"?t.toString():void 0);return typeof e=="string"&&hn(e)?e.trim():null}function rf(t){let e=hn(t);if(!e)return t;let{h:i,s:r,l:n}=nf(e);return of({h:i,s:Math.min(1,r*1.35+.08),l:Math.min(.72,Math.max(.46,n*1.15))})}function hn(t){let e=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(e){let r=Number.parseInt(e[1],16);return{r:r>>16&255,g:r>>8&255,b:r&255}}let i=t.match(/\d+(\.\d+)?/g);return i&&i.length>=3?{r:Number(i[0]),g:Number(i[1]),b:Number(i[2])}:null}function nf({r:t,g:e,b:i}){let r=t/255,n=e/255,o=i/255,s=Math.max(r,n,o),a=Math.min(r,n,o),l=(s+a)/2,c=s-a;if(c===0)return{h:0,s:0,l};let d=l>.5?c/(2-s-a):c/(s+a),u;return s===r?u=(n-o)/c%6:s===n?u=(o-r)/c+2:u=(r-n)/c+4,u*=60,u<0&&(u+=360),{h:u,s:d,l}}function of({h:t,s:e,l:i}){return`hsl(${t.toFixed(1)} ${(e*100).toFixed(1)}% ${(i*100).toFixed(1)}%)`}async function sf(){let t=window;if(t.__liquidLyricsLoaded){console.warn("[Liquid Lyrics] Second instance detected \u2014 skipping initialization.");return}t.__liquidLyricsLoaded=!0,await he(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),el(),ri(),sl(),pl(),ma(),il(),ps(),lt(),Ni(),await he(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),Ha();let e=null,i=null,r="Loading lyrics...",n=0,o=hl();async function s(){let h=Spicetify.Player.data;if(!h?.item?.uri)return;let g=h.item.uri,x=g.includes(":")?g.split(":")[2]:g;if(x===e){rn(),W();return}e=x,i=null,r="Loading lyrics...",rn(),Ga(r),N()&&Rt(r),await a(x,h.item)}async function a(h,g){let x=++n,E=await Ht({id:h,uri:g.uri,data:{name:g.name}});if(!(x!==n||h!==e)){if(E.status==="success"&&E.data){i=E.data,r="",tn(E.data),N()&&Br(E.data);return}i=null,r=E.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",tn(null,r,!0),N()&&Rt(r,!0)}}Spicetify.Player.addEventListener("songchange",()=>{s()}),window.addEventListener(Di,h=>{let g=Spicetify.Player.data,x=g?.item?.uri;if(!x)return;let E=x.includes(":")?x.split(":")[2]:x,f=h.detail??{};(f.trackUri||f.trackId)&&f.trackUri!==x&&f.trackId!==E||(i=null,a(E,g.item))});let l=()=>{let h=hl();h!==o&&(o=h,N()&&Ti())};setInterval(()=>{l()},250);let c=Spicetify.Platform?.History;typeof c?.listen=="function"&&c.listen(l);let d=N(),u=new MutationObserver(()=>{let h=N();if(Fa(),W(),h&&!d&&e)if(i)Br(i);else if(r&&r!=="Loading lyrics...")Rt(r,!0);else{let g=Spicetify.Player.data;if(g?.item?.uri){let x=g.item.uri.includes(":")?g.item.uri.split(":")[2]:g.item.uri;Rt("Loading lyrics..."),a(x,g.item)}}d=h}),p=document.getElementById("liquid-lyrics-panel");p&&u.observe(p,{attributes:!0,attributeFilter:["class"]}),W(),s()}sf();function hl(){let e=Spicetify.Platform?.History?.location??{},i=e.pathname||e.path||e.uri||"";return`${location.href}|${i}`}})();
