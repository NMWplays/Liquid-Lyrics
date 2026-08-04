// Liquid-Lyrics - Spicetify Extension
"use strict";var LiquidLyrics=(()=>{var Gl=Object.create;var Zi=Object.defineProperty;var Yl=Object.getOwnPropertyDescriptor;var Xl=Object.getOwnPropertyNames;var Jl=Object.getPrototypeOf,Zl=Object.prototype.hasOwnProperty;var Ql=(t,e,i)=>e in t?Zi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var U=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ec=(t,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Xl(e))!Zl.call(t,n)&&n!==i&&Zi(t,n,{get:()=>e[n],enumerable:!(r=Yl(e,n))||r.enumerable});return t};var zn=(t,e,i)=>(i=t!=null?Gl(Jl(t)):{},ec(e||!t||!t.__esModule?Zi(i,"default",{value:t,enumerable:!0}):i,t));var m=(t,e,i)=>Ql(t,typeof e!="symbol"?e+"":e,i);var oo=U((wg,nr)=>{(function(){"use strict";var t="\0",e=0,i=0,r=-1,n=!0,o=!0,a=4,s=4,l=2,c=function(f){f==null&&(f=1024);var b=function(L,M,q){for(var R=M;R<q;R++)L[R]=-R+1;if(0<v.array[v.array.length-1]){for(var Ne=v.array.length-2;0<v.array[Ne];)Ne--;L[M]=-Ne}},w=function(L,M,q){for(var R=M;R<q;R++)L[R]=-R-1},S=function(L){var M=L*l,q=h(k.signed,k.bytes,M);b(q,k.array.length,M),q.set(k.array),k.array=null,k.array=q;var R=h(v.signed,v.bytes,M);w(R,v.array.length,M),R.set(v.array),v.array=null,v.array=R},y=i+1,k={signed:n,bytes:a,array:h(n,a,f)},v={signed:o,bytes:s,array:h(o,s,f)};return k.array[i]=1,v.array[i]=i,b(k.array,i+1,k.array.length),w(v.array,i+1,v.array.length),{getBaseBuffer:function(){return k.array},getCheckBuffer:function(){return v.array},loadBaseBuffer:function(L){return k.array=L,this},loadCheckBuffer:function(L){return v.array=L,this},size:function(){return Math.max(k.array.length,v.array.length)},getBase:function(L){return k.array.length-1<L?-L+1:k.array[L]},getCheck:function(L){return v.array.length-1<L?-L-1:v.array[L]},setBase:function(L,M){k.array.length-1<L&&S(L),k.array[L]=M},setCheck:function(L,M){v.array.length-1<L&&S(L),v.array[L]=M},setFirstUnusedNode:function(L){y=L},getFirstUnusedNode:function(){return y},shrink:function(){for(var L=this.size()-1;!(0<=v.array[L]);)L--;k.array=k.array.subarray(0,L+2),v.array=v.array.subarray(0,L+2)},calc:function(){for(var L=0,M=v.array.length,q=0;q<M;q++)v.array[q]<0&&L++;return{all:M,unused:L,efficiency:(M-L)/M}},dump:function(){var L="",M="",q;for(q=0;q<k.array.length;q++)L=L+" "+this.getBase(q);for(q=0;q<v.array.length;q++)M=M+" "+this.getCheck(q);return console.log("base:"+L),console.log("chck:"+M),"base:"+L+" chck:"+M}}};function d(f){this.bc=c(f),this.keys=[]}d.prototype.append=function(f,b){return this.keys.push({k:f,v:b}),this},d.prototype.build=function(f,b){if(f==null&&(f=this.keys),f==null)return new u(this.bc);b==null&&(b=!1);var w=f.map(function(S){return{k:g(S.k+t),v:S.v}});return b?this.keys=w:this.keys=w.sort(function(S,y){for(var k=S.k,v=y.k,L=Math.min(k.length,v.length),M=0;M<L;M++)if(k[M]!==v[M])return k[M]-v[M];return k.length-v.length}),w=null,this._build(i,0,0,this.keys.length),new u(this.bc)},d.prototype._build=function(f,b,w,S){var y=this.getChildrenInfo(b,w,S),k=this.findAllocatableBase(y);this.setBC(f,y,k);for(var v=0;v<y.length;v=v+3){var L=y[v];if(L!==e){var M=y[v+1],q=y[v+2],R=k+L;this._build(R,b+1,M,q)}}},d.prototype.getChildrenInfo=function(f,b,w){var S=this.keys[b].k[f],y=0,k=new Int32Array(w*3);k[y++]=S,k[y++]=b;for(var v=b,L=b;v<b+w;v++){var M=this.keys[v].k[f];S!==M&&(k[y++]=v-L,k[y++]=M,k[y++]=v,S=M,L=v)}return k[y++]=v-L,k=k.subarray(0,y),k},d.prototype.setBC=function(f,b,w){var S=this.bc;S.setBase(f,w);var y;for(y=0;y<b.length;y=y+3){var k=b[y],v=w+k,L=-S.getBase(v),M=-S.getCheck(v);v!==S.getFirstUnusedNode()?S.setCheck(L,-M):S.setFirstUnusedNode(M),S.setBase(M,-L);var q=f;if(S.setCheck(v,q),k===e){var R=b[y+1],Ne=this.keys[R].v;Ne==null&&(Ne=0);var $l=-Ne-1;S.setBase(v,$l)}}},d.prototype.findAllocatableBase=function(f){for(var b=this.bc,w,S=b.getFirstUnusedNode();;){if(w=S-f[0],w<0){S=-b.getCheck(S);continue}for(var y=!0,k=0;k<f.length;k=k+3){var v=f[k],L=w+v;if(!this.isUnusedNode(L)){S=-b.getCheck(S),y=!1;break}}if(y)return w}},d.prototype.isUnusedNode=function(f){var b=this.bc,w=b.getCheck(f);return f===i?!1:w<0};function u(f){this.bc=f,this.bc.shrink()}u.prototype.contain=function(f){var b=this.bc;f+=t;for(var w=g(f),S=i,y=r,k=0;k<w.length;k++){var v=w[k];if(y=this.traverse(S,v),y===r)return!1;if(b.getBase(y)<=0)return!0;S=y}return!1},u.prototype.lookup=function(f){f+=t;for(var b=g(f),w=i,S=r,y=0;y<b.length;y++){var k=b[y];if(S=this.traverse(w,k),S===r)return r;w=S}var v=this.bc.getBase(S);return v<=0?-v-1:r},u.prototype.commonPrefixSearch=function(f){for(var b=g(f),w=i,S=r,y=[],k=0;k<b.length;k++){var v=b[k];if(S=this.traverse(w,v),S!==r){w=S;var L=this.traverse(S,e);if(L!==r){var M=this.bc.getBase(L),q={};M<=0&&(q.v=-M-1),q.k=x(p(b,0,k+1)),y.push(q)}continue}else break}return y},u.prototype.traverse=function(f,b){var w=this.bc.getBase(f)+b;return this.bc.getCheck(w)===f?w:r},u.prototype.size=function(){return this.bc.size()},u.prototype.calc=function(){return this.bc.calc()},u.prototype.dump=function(){return this.bc.dump()};var h=function(f,b,w){if(f)switch(b){case 1:return new Int8Array(w);case 2:return new Int16Array(w);case 4:return new Int32Array(w);default:throw new RangeError("Invalid newArray parameter element_bytes:"+b)}else switch(b){case 1:return new Uint8Array(w);case 2:return new Uint16Array(w);case 4:return new Uint32Array(w);default:throw new RangeError("Invalid newArray parameter element_bytes:"+b)}},p=function(f,b,w){var S=new ArrayBuffer(w),y=new Uint8Array(S,0,w),k=f.subarray(b,w);return y.set(k),y},g=function(f){for(var b=new Uint8Array(new ArrayBuffer(f.length*4)),w=0,S=0;w<f.length;){var y,k=f.charCodeAt(w++);if(k>=55296&&k<=56319){var v=k,L=f.charCodeAt(w++);if(L>=56320&&L<=57343)y=(v-55296)*1024+65536+(L-56320);else return null}else y=k;y<128?b[S++]=y:y<2048?(b[S++]=y>>>6|192,b[S++]=y&63|128):y<65536?(b[S++]=y>>>12|224,b[S++]=y>>6&63|128,b[S++]=y&63|128):y<1<<21&&(b[S++]=y>>>18|240,b[S++]=y>>12&63|128,b[S++]=y>>6&63|128,b[S++]=y&63|128)}return b.subarray(0,S)},x=function(f){for(var b="",w,S,y,k,v,L,M,q=0;q<f.length;)S=f[q++],S<128?w=S:S>>5===6?(y=f[q++],w=(S&31)<<6|y&63):S>>4===14?(y=f[q++],k=f[q++],w=(S&15)<<12|(y&63)<<6|k&63):(y=f[q++],k=f[q++],v=f[q++],w=(S&7)<<18|(y&63)<<12|(k&63)<<6|v&63),w<65536?b+=String.fromCharCode(w):(w-=65536,L=55296|w>>10,M=56320|w&1023,b+=String.fromCharCode(L,M));return b},E={builder:function(f){return new d(f)},load:function(f,b){var w=c(0);return w.loadBaseBuffer(f),w.loadCheckBuffer(b),new u(w)}};typeof nr>"u"?window.doublearray=E:nr.exports=E})()});var Zt=U((xg,ao)=>{"use strict";var xc=function(t){for(var e=new Uint8Array(t.length*4),i=0,r=0;i<t.length;){var n,o=t.charCodeAt(i++);if(o>=55296&&o<=56319){var a=o,s=t.charCodeAt(i++);if(s>=56320&&s<=57343)n=(a-55296)*1024+65536+(s-56320);else return null}else n=o;n<128?e[r++]=n:n<2048?(e[r++]=n>>>6|192,e[r++]=n&63|128):n<65536?(e[r++]=n>>>12|224,e[r++]=n>>6&63|128,e[r++]=n&63|128):n<2097152&&(e[r++]=n>>>18|240,e[r++]=n>>12&63|128,e[r++]=n>>6&63|128,e[r++]=n&63|128)}return e.subarray(0,r)},kc=function(t){for(var e="",i,r,n,o,a,s,l,c=0;c<t.length;)r=t[c++],r<128?i=r:r>>5===6?(n=t[c++],i=(r&31)<<6|n&63):r>>4===14?(n=t[c++],o=t[c++],i=(r&15)<<12|(n&63)<<6|o&63):(n=t[c++],o=t[c++],a=t[c++],i=(r&7)<<18|(n&63)<<12|(o&63)<<6|a&63),i<65536?e+=String.fromCharCode(i):(i-=65536,s=55296|i>>10,l=56320|i&1023,e+=String.fromCharCode(s,l));return e};function G(t){var e;if(t==null)e=1024*1024;else if(typeof t=="number")e=t;else if(t instanceof Uint8Array){this.buffer=t,this.position=0;return}else throw typeof t+" is invalid parameter type for ByteBuffer constructor";this.buffer=new Uint8Array(e),this.position=0}G.prototype.size=function(){return this.buffer.length};G.prototype.reallocate=function(){var t=new Uint8Array(this.buffer.length*2);t.set(this.buffer),this.buffer=t};G.prototype.shrink=function(){return this.buffer=this.buffer.subarray(0,this.position),this.buffer};G.prototype.put=function(t){this.buffer.length<this.position+1&&this.reallocate(),this.buffer[this.position++]=t};G.prototype.get=function(t){return t==null&&(t=this.position,this.position+=1),this.buffer.length<t+1?0:this.buffer[t]};G.prototype.putShort=function(t){if(65535<t)throw t+" is over short value";var e=255&t,i=(65280&t)>>8;this.put(e),this.put(i)};G.prototype.getShort=function(t){if(t==null&&(t=this.position,this.position+=2),this.buffer.length<t+2)return 0;var e=this.buffer[t],i=this.buffer[t+1],r=(i<<8)+e;return r&32768&&(r=-(r-1^65535)),r};G.prototype.putInt=function(t){if(4294967295<t)throw t+" is over integer value";var e=255&t,i=(65280&t)>>8,r=(16711680&t)>>16,n=(4278190080&t)>>24;this.put(e),this.put(i),this.put(r),this.put(n)};G.prototype.getInt=function(t){if(t==null&&(t=this.position,this.position+=4),this.buffer.length<t+4)return 0;var e=this.buffer[t],i=this.buffer[t+1],r=this.buffer[t+2],n=this.buffer[t+3];return(n<<24)+(r<<16)+(i<<8)+e};G.prototype.readInt=function(){var t=this.position;return this.position+=4,this.getInt(t)};G.prototype.putString=function(t){for(var e=xc(t),i=0;i<e.length;i++)this.put(e[i]);this.put(0)};G.prototype.getString=function(t){var e=[],i;for(t==null&&(t=this.position);!(this.buffer.length<t+1||(i=this.get(t++),i===0));)e.push(i);return this.position=t,kc(e)};ao.exports=G});var or=U((kg,so)=>{"use strict";var Je=Zt();function de(){this.dictionary=new Je(10*1024*1024),this.target_map={},this.pos_buffer=new Je(10*1024*1024)}de.prototype.buildDictionary=function(t){for(var e={},i=0;i<t.length;i++){var r=t[i];if(!(r.length<4)){var n=r[0],o=r[1],a=r[2],s=r[3],l=r.slice(4).join(",");(!isFinite(o)||!isFinite(a)||!isFinite(s))&&console.log(r);var c=this.put(o,a,s,n,l);e[c]=n}}return this.dictionary.shrink(),this.pos_buffer.shrink(),e};de.prototype.put=function(t,e,i,r,n){var o=this.dictionary.position,a=this.pos_buffer.position;return this.dictionary.putShort(t),this.dictionary.putShort(e),this.dictionary.putShort(i),this.dictionary.putInt(a),this.pos_buffer.putString(r+","+n),o};de.prototype.addMapping=function(t,e){var i=this.target_map[t];i==null&&(i=[]),i.push(e),this.target_map[t]=i};de.prototype.targetMapToBuffer=function(){var t=new Je,e=Object.keys(this.target_map).length;t.putInt(e);for(var i in this.target_map){var r=this.target_map[i],n=r.length;t.putInt(parseInt(i)),t.putInt(n);for(var o=0;o<r.length;o++)t.putInt(r[o])}return t.shrink()};de.prototype.loadDictionary=function(t){return this.dictionary=new Je(t),this};de.prototype.loadPosVector=function(t){return this.pos_buffer=new Je(t),this};de.prototype.loadTargetMap=function(t){var e=new Je(t);for(e.position=0,this.target_map={},e.readInt();!(e.buffer.length<e.position+1);)for(var i=e.readInt(),r=e.readInt(),n=0;n<r;n++){var o=e.readInt();this.addMapping(i,o)}return this};de.prototype.getFeatures=function(t){var e=parseInt(t);if(isNaN(e))return"";var i=this.dictionary.getInt(e+6);return this.pos_buffer.getString(i)};so.exports=de});var co=U((Sg,lo)=>{"use strict";function Qt(t,e){this.forward_dimension=t,this.backward_dimension=e,this.buffer=new Int16Array(t*e+2),this.buffer[0]=t,this.buffer[1]=e}Qt.prototype.put=function(t,e,i){var r=t*this.backward_dimension+e+2;if(this.buffer.length<r+1)throw"ConnectionCosts buffer overflow";this.buffer[r]=i};Qt.prototype.get=function(t,e){var i=t*this.backward_dimension+e+2;if(this.buffer.length<i+1)throw"ConnectionCosts buffer overflow";return this.buffer[i]};Qt.prototype.loadConnectionCosts=function(t){this.forward_dimension=t[0],this.backward_dimension=t[1],this.buffer=t};lo.exports=Qt});var ar=U((Lg,uo)=>{"use strict";function Sc(t,e,i,r,n){this.class_id=t,this.class_name=e,this.is_always_invoke=i,this.is_grouping=r,this.max_length=n}uo.exports=Sc});var fo=U((Tg,po)=>{"use strict";var ho=Zt(),Lc=ar();function ze(){this.map=[],this.lookup_table={}}ze.load=function(t){for(var e=new ze,i=[],r=new ho(t);r.position+1<r.size();){var n=i.length,o=r.get(),a=r.get(),s=r.getInt(),l=r.getString();i.push(new Lc(n,l,o,a,s))}return e.init(i),e};ze.prototype.init=function(t){if(t!=null)for(var e=0;e<t.length;e++){var i=t[e];this.map[e]=i,this.lookup_table[i.class_name]=e}};ze.prototype.getCharacterClass=function(t){return this.map[t]};ze.prototype.lookup=function(t){var e=this.lookup_table[t];return e??null};ze.prototype.toBuffer=function(){for(var t=new ho,e=0;e<this.map.length;e++){var i=this.map[e];t.put(i.is_always_invoke),t.put(i.is_grouping),t.putInt(i.max_length),t.putString(i.class_name)}return t.shrink(),t.buffer};po.exports=ze});var sr=U((Eg,go)=>{"use strict";function Be(t){this.str=t,this.index_mapping=[];for(var e=0;e<t.length;e++){var i=t.charAt(e);this.index_mapping.push(e),Be.isSurrogatePair(i)&&e++}this.length=this.index_mapping.length}Be.prototype.slice=function(t){if(this.index_mapping.length<=t)return"";var e=this.index_mapping[t];return this.str.slice(e)};Be.prototype.charAt=function(t){if(this.str.length<=t)return"";var e=this.index_mapping[t],i=this.index_mapping[t+1];return i==null?this.str.slice(e):this.str.slice(e,i)};Be.prototype.charCodeAt=function(t){if(this.index_mapping.length<=t)return NaN;var e=this.index_mapping[t],i=this.str.charCodeAt(e),r;return i>=55296&&i<=56319&&e<this.str.length&&(r=this.str.charCodeAt(e+1),r>=56320&&r<=57343)?(i-55296)*1024+r-56320+65536:i};Be.prototype.toString=function(){return this.str};Be.isSurrogatePair=function(t){var e=t.charCodeAt(0);return e>=55296&&e<=56319};go.exports=Be});var bo=U((Mg,mo)=>{"use strict";var Tc=fo(),Ec=ar(),Mc=sr(),lr="DEFAULT";function ue(){this.character_category_map=new Uint8Array(65536),this.compatible_category_map=new Uint32Array(65536),this.invoke_definition_map=null}ue.load=function(t,e,i){var r=new ue;return r.character_category_map=t,r.compatible_category_map=e,r.invoke_definition_map=Tc.load(i),r};ue.parseCharCategory=function(t,e){var i=e[1],r=parseInt(e[2]),n=parseInt(e[3]),o=parseInt(e[4]);if(!isFinite(r)||r!==0&&r!==1)return console.log("char.def parse error. INVOKE is 0 or 1 in:"+r),null;if(!isFinite(n)||n!==0&&n!==1)return console.log("char.def parse error. GROUP is 0 or 1 in:"+n),null;if(!isFinite(o)||o<0)return console.log("char.def parse error. LENGTH is 1 to n:"+o),null;var a=r===1,s=n===1;return new Ec(t,i,a,s,o)};ue.parseCategoryMapping=function(t){var e=parseInt(t[1]),i=t[2],r=3<t.length?t.slice(3):[];return(!isFinite(e)||e<0||e>65535)&&console.log("char.def parse error. CODE is invalid:"+e),{start:e,default:i,compatible:r}};ue.parseRangeCategoryMapping=function(t){var e=parseInt(t[1]),i=parseInt(t[2]),r=t[3],n=4<t.length?t.slice(4):[];return(!isFinite(e)||e<0||e>65535)&&console.log("char.def parse error. CODE is invalid:"+e),(!isFinite(i)||i<0||i>65535)&&console.log("char.def parse error. CODE is invalid:"+i),{start:e,end:i,default:r,compatible:n}};ue.prototype.initCategoryMappings=function(t){var e;if(t!=null)for(var i=0;i<t.length;i++){var r=t[i],n=r.end||r.start;for(e=r.start;e<=n;e++){this.character_category_map[e]=this.invoke_definition_map.lookup(r.default);for(var o=0;o<r.compatible.length;o++){var a=this.compatible_category_map[e],s=r.compatible[o];if(s!=null){var l=this.invoke_definition_map.lookup(s);if(l!=null){var c=1<<l;a=a|c,this.compatible_category_map[e]=a}}}}}var d=this.invoke_definition_map.lookup(lr);if(d!=null)for(e=0;e<this.character_category_map.length;e++)this.character_category_map[e]===0&&(this.character_category_map[e]=1<<d)};ue.prototype.lookupCompatibleCategory=function(t){var e=[],i=t.charCodeAt(0),r;if(i<this.compatible_category_map.length&&(r=this.compatible_category_map[i]),r==null||r===0)return e;for(var n=0;n<32;n++)if(r<<31-n>>>31===1){var o=this.invoke_definition_map.getCharacterClass(n);if(o==null)continue;e.push(o)}return e};ue.prototype.lookup=function(t){var e,i=t.charCodeAt(0);return Mc.isSurrogatePair(t)?e=this.invoke_definition_map.lookup(lr):i<this.character_category_map.length&&(e=this.character_category_map[i]),e==null&&(e=this.invoke_definition_map.lookup(lr)),this.invoke_definition_map.getCharacterClass(e)};mo.exports=ue});var wo=U((Cg,vo)=>{"use strict";var Cc=or(),qc=bo(),yo=Zt();function Ze(){this.dictionary=new yo(10*1024*1024),this.target_map={},this.pos_buffer=new yo(10*1024*1024),this.character_definition=null}Ze.prototype=Object.create(Cc.prototype);Ze.prototype.characterDefinition=function(t){return this.character_definition=t,this};Ze.prototype.lookup=function(t){return this.character_definition.lookup(t)};Ze.prototype.lookupCompatibleCategory=function(t){return this.character_definition.lookupCompatibleCategory(t)};Ze.prototype.loadUnknownDictionaries=function(t,e,i,r,n,o){this.loadDictionary(t),this.loadPosVector(e),this.loadTargetMap(i),this.character_definition=qc.load(r,n,o)};vo.exports=Ze});var So=U((qg,ko)=>{"use strict";var xo=oo(),Ac=or(),_c=co(),Rc=wo();function wt(t,e,i,r){t!=null?this.trie=t:this.trie=xo.builder(0).build([{k:"",v:1}]),e!=null?this.token_info_dictionary=e:this.token_info_dictionary=new Ac,i!=null?this.connection_costs=i:this.connection_costs=new _c(0,0),r!=null?this.unknown_dictionary=r:this.unknown_dictionary=new Rc}wt.prototype.loadTrie=function(t,e){return this.trie=xo.load(t,e),this};wt.prototype.loadTokenInfoDictionaries=function(t,e,i){return this.token_info_dictionary.loadDictionary(t),this.token_info_dictionary.loadPosVector(e),this.token_info_dictionary.loadTargetMap(i),this};wt.prototype.loadConnectionCosts=function(t){return this.connection_costs.loadConnectionCosts(t),this};wt.prototype.loadUnknownDictionaries=function(t,e,i,r,n,o){return this.unknown_dictionary.loadUnknownDictionaries(t,e,i,r,n,o),this};ko.exports=wt});var cr=U((Ag,Lo)=>{"use strict";function Ic(t,e,i,r,n,o,a,s){this.name=t,this.cost=e,this.start_pos=i,this.length=r,this.left_id=o,this.right_id=a,this.prev=null,this.surface_form=s,n==="BOS"?this.shortest_cost=0:this.shortest_cost=Number.MAX_VALUE,this.type=n}Lo.exports=Ic});var Mo=U((_g,Eo)=>{"use strict";var To=cr();function dr(){this.nodes_end_at=[],this.nodes_end_at[0]=[new To(-1,0,0,0,"BOS",0,0,"")],this.eos_pos=1}dr.prototype.append=function(t){var e=t.start_pos+t.length-1;this.eos_pos<e&&(this.eos_pos=e);var i=this.nodes_end_at[e];i==null&&(i=[]),i.push(t),this.nodes_end_at[e]=i};dr.prototype.appendEos=function(){var t=this.nodes_end_at.length;this.eos_pos++,this.nodes_end_at[t]=[new To(-1,0,this.eos_pos,0,"EOS",0,0,"")]};Eo.exports=dr});var _o=U((Rg,Ao)=>{"use strict";var Co=cr(),Nc=Mo(),ur=sr();function qo(t){this.trie=t.trie,this.token_info_dictionary=t.token_info_dictionary,this.unknown_dictionary=t.unknown_dictionary}qo.prototype.build=function(t){for(var e=new Nc,i=new ur(t),r,n,o,a,s,l=0;l<i.length;l++){for(var c=i.slice(l),d=this.trie.commonPrefixSearch(c),u=0;u<d.length;u++){n=d[u].v,r=d[u].k;for(var h=this.token_info_dictionary.target_map[n],p=0;p<h.length;p++){var g=parseInt(h[p]);o=this.token_info_dictionary.dictionary.getShort(g),a=this.token_info_dictionary.dictionary.getShort(g+2),s=this.token_info_dictionary.dictionary.getShort(g+4),e.append(new Co(g,s,l+1,r.length,"KNOWN",o,a,r))}}var x=new ur(c),E=new ur(x.charAt(0)),f=this.unknown_dictionary.lookup(E.toString());if(d==null||d.length===0||f.is_always_invoke===1){if(r=E,f.is_grouping===1&&1<x.length)for(var b=1;b<x.length;b++){var w=x.charAt(b),S=this.unknown_dictionary.lookup(w);if(f.class_name!==S.class_name)break;r+=w}for(var y=this.unknown_dictionary.target_map[f.class_id],k=0;k<y.length;k++){var v=parseInt(y[k]);o=this.unknown_dictionary.dictionary.getShort(v),a=this.unknown_dictionary.dictionary.getShort(v+2),s=this.unknown_dictionary.dictionary.getShort(v+4),e.append(new Co(v,s,l+1,r.length,"UNKNOWN",o,a,r.toString()))}}}return e.appendEos(),e};Ao.exports=qo});var Io=U((Ig,Ro)=>{"use strict";function ei(t){this.connection_costs=t}ei.prototype.search=function(t){return t=this.forward(t),this.backward(t)};ei.prototype.forward=function(t){var e,i,r;for(e=1;e<=t.eos_pos;e++){var n=t.nodes_end_at[e];if(n!=null)for(i=0;i<n.length;i++){var o=n[i],a=Number.MAX_VALUE,s,l=t.nodes_end_at[o.start_pos-1];if(l!=null){for(r=0;r<l.length;r++){var c=l[r],d;o.left_id==null||c.right_id==null?(console.log("Left or right is null"),d=0):d=this.connection_costs.get(c.right_id,o.left_id);var u=c.shortest_cost+d+o.cost;u<a&&(s=c,a=u)}o.prev=s,o.shortest_cost=a}}}return t};ei.prototype.backward=function(t){var e=[],i=t.nodes_end_at[t.nodes_end_at.length-1][0],r=i.prev;if(r==null)return[];for(;r.type!=="BOS";){if(e.push(r),r.prev==null)return[];r=r.prev}return e.reverse()};Ro.exports=ei});var Po=U((Ng,No)=>{"use strict";function hr(){}hr.prototype.formatEntry=function(t,e,i,r){var n={};return n.word_id=t,n.word_type=i,n.word_position=e,n.surface_form=r[0],n.pos=r[1],n.pos_detail_1=r[2],n.pos_detail_2=r[3],n.pos_detail_3=r[4],n.conjugated_type=r[5],n.conjugated_form=r[6],n.basic_form=r[7],n.reading=r[8],n.pronunciation=r[9],n};hr.prototype.formatUnknownEntry=function(t,e,i,r,n){var o={};return o.word_id=t,o.word_type=i,o.word_position=e,o.surface_form=n,o.pos=r[1],o.pos_detail_1=r[2],o.pos_detail_2=r[3],o.pos_detail_3=r[4],o.conjugated_type=r[5],o.conjugated_form=r[6],o.basic_form=r[7],o};No.exports=hr});var Bo=U((Pg,zo)=>{"use strict";var Pc=_o(),zc=Io(),Bc=Po(),Oc=/、|。/;function Qe(t){this.token_info_dictionary=t.token_info_dictionary,this.unknown_dictionary=t.unknown_dictionary,this.viterbi_builder=new Pc(t),this.viterbi_searcher=new zc(t.connection_costs),this.formatter=new Bc}Qe.splitByPunctuation=function(t){for(var e=[],i=t;i!=="";){var r=i.search(Oc);if(r<0){e.push(i);break}e.push(i.substring(0,r+1)),i=i.substring(r+1)}return e};Qe.prototype.tokenize=function(t){for(var e=Qe.splitByPunctuation(t),i=[],r=0;r<e.length;r++){var n=e[r];this.tokenizeForSentence(n,i)}return i};Qe.prototype.tokenizeForSentence=function(t,e){e==null&&(e=[]);var i=this.getLattice(t),r=this.viterbi_searcher.search(i),n=0;e.length>0&&(n=e[e.length-1].word_position);for(var o=0;o<r.length;o++){var a=r[o],s,l,c;a.type==="KNOWN"?(c=this.token_info_dictionary.getFeatures(a.name),c==null?l=[]:l=c.split(","),s=this.formatter.formatEntry(a.name,n+a.start_pos,a.type,l)):a.type==="UNKNOWN"?(c=this.unknown_dictionary.getFeatures(a.name),c==null?l=[]:l=c.split(","),s=this.formatter.formatUnknownEntry(a.name,n+a.start_pos,a.type,l,a.surface_form)):s=this.formatter.formatEntry(a.name,n+a.start_pos,a.type,[]),e.push(s)}return e};Qe.prototype.getLattice=function(t){return this.viterbi_builder.build(t)};zo.exports=Qe});function me(t,e=1e4){return new Promise((i,r)=>{let n=Date.now(),o=setInterval(()=>{let a=t();a?(clearInterval(o),i(a)):Date.now()-n>e&&(clearInterval(o),r(new Error("wait() timed out")))},100)})}var Qi="6.2.2",Bn=["spicy","spotify"];async function er({id:t}){try{let e=t.includes(":")?t.split(":")[2]:t,i="https://spclient.wg.spotify.com/color-lyrics/v2/track/",r;try{r=await(await me(()=>Spicetify.CosmosAsync?.get))(`${i}${e}?format=json&vocalRemoval=false&market=from_token`)}catch{return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Spotify Request error"}}}let n=r?.lyrics;if(!n)return{status:"missing_lyrics",data:null};let o=n.lines,a;if(n.syncType==="LINE_SYNCED"){let s=o.map((l,c)=>{let d=Number(l.startTimeMs)||0,u=c<o.length-1?Number(o[c+1].startTimeMs):d+5e3;return l.words==="\u266A"?{Type:"Interlude",Text:l.words,StartTime:d,EndTime:u,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:l.words,StartTime:d,EndTime:u,OppositeAligned:!1,IsRTL:!1}});a={Id:e,Type:"Line",SongWriters:[],Content:s,StartTime:s.length>0?s[0].StartTime:0,EndTime:s.length>0?s[s.length-1].EndTime:0,Provider:"spotify"}}else a={Id:e,Type:"Static",SongWriters:[],Lines:o.map(s=>({Text:s.words,IsRTL:!1})),Provider:"spotify"};return{status:"success",data:a}}catch(e){return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:e instanceof Error?e.message:String(e)}}}}var Hn="https://api.spicylyrics.org",bt=null,On=null;async function tc(){return bt||(On??(On=(async()=>{try{let t=await fetch(`${Hn}/version`);if(t.ok){let e=(await t.text()).trim();/^\d+\.\d+\.\d+$/.test(e)&&(bt=e)}}catch{}bt??(bt=Qi)})()),await On,bt??Qi)}async function Fn(t,e){let i=await tc(),r=await fetch(`${Hn}/query`,{method:"POST",headers:{"Content-Type":"application/json","SpicyLyrics-Version":i,"X-mode":"2",...e&&{"SpicyLyrics-WebAuth":e}},body:JSON.stringify({queries:t,client:{version:i}})});if(!r.ok)throw new Error(`Spicy request failed with status ${r.status}`);return r.json()}var be={depth:512,arrayLength:1048576,objectKeys:65536,streamLength:16777216,valuesLength:4194304,decodeOps:4194304},ic=new Set(["__proto__","constructor","prototype"]);function Dn(t){return Array.isArray(t)&&t.length===2&&Array.isArray(t[0])&&Array.isArray(t[1])}function Un(t){let e=t[0],i=t[1];if(e.length>be.valuesLength)throw new Error("SLObjPack: valuesList exceeds limit");if(i.length>be.streamLength)throw new Error("SLObjPack: stream exceeds limit");for(let p=0;p<e.length;p++){let g=e[p];if(g===null)continue;let x=typeof g;if(!(x==="string"||x==="boolean")&&!(x==="number"&&Number.isFinite(g)))throw new Error(`SLObjPack: invalid value at ${p}`)}let r=e,n=0,o=()=>{if(n>=i.length)throw new Error("SLObjPack: unexpected end of stream");return i[n++]},a=p=>{if(typeof p!="number"||!Number.isInteger(p)||p<0||p>=r.length)throw new Error(`SLObjPack: invalid value pointer ${p}`);return r[p]},s=()=>{let p=a(o());if(typeof p!="string")throw new Error("SLObjPack: keys must be strings");if(ic.has(p))throw new Error(`SLObjPack: forbidden key ${p}`);return p},l=(p,g,x)=>{Object.defineProperty(p,g,{value:x,writable:!0,enumerable:!0,configurable:!0})},c=(p,g,x)=>{if(typeof p!="number"||!Number.isInteger(p)||p<0||p>g)throw new Error(`SLObjPack: invalid ${x} count ${p}`);return p},d=(p,g)=>{if(p>i.length-n)throw new Error(`SLObjPack: ${g} exceeds remaining stream`)},u=p=>{if(p>be.depth)throw new Error("SLObjPack: max depth exceeded");let g=o();if(typeof g!="number"||!Number.isInteger(g))throw new Error(`SLObjPack: invalid opcode ${g}`);if(g>=0)return a(g);switch(g){case-1:{let x=c(o(),be.objectKeys,"object key");d(x*2,"object");let E=new Array(x);for(let b=0;b<x;b++)E[b]=s();let f={};for(let b=0;b<x;b++)l(f,E[b],u(p+1));return f}case-2:{let x=c(o(),be.arrayLength,"array item");d(x,"array");let E=new Array(x);for(let f=0;f<x;f++)E[f]=u(p+1);return E}case-3:{let x=c(o(),be.arrayLength,"schema array item"),E=c(o(),be.objectKeys,"schema key");if(x*E>be.decodeOps)throw new Error("SLObjPack: schema array budget exceeded");d(E+x*E,"schema array");let f=new Array(E);for(let w=0;w<E;w++)f[w]=s();let b=new Array(x);for(let w=0;w<x;w++){let S={};for(let y=0;y<E;y++)l(S,f[y],u(p+1));b[w]=S}return b}case-4:return[];case-5:return[u(p+1)];case-6:return{};default:throw new Error(`SLObjPack: unknown opcode ${g}`)}},h=u(0);if(n!==i.length)throw new Error("SLObjPack: extra data after decoding");return h}var Pe,yt;async function jn(){return Pe&&Pe.expiresAtTime-Date.now()>2e3?Pe.accessToken:yt||(yt=(async()=>{let t=await me(()=>Spicetify.CosmosAsync),e=await me(()=>Spicetify.Platform);try{Pe=await t.get("sp://oauth/v2/token")}catch(i){i.message?.includes("Resolver not found")&&e.Session&&(Pe={accessToken:e.Session.accessToken,expiresAtTime:e.Session.accessTokenExpirationTimestampMs,tokenType:"Bearer"})}finally{yt=void 0}if(!Pe)throw new Error("Could not retrieve Spotify Access Token");return Pe.accessToken})(),yt)}async function Vn({id:t}){try{let e=await rc(t),i=sc(e);if(!e||!i)return{status:"error",data:null,error:{code:"FETCH_FAILED",message:"Network or Validation failed"}};let r=ac(i.result);if(r.status==="missing_lyrics")return{status:"missing_lyrics",data:null,queued:r.queued};if(r.status==="error")return{status:"error",data:null,error:{code:"PROVIDER_FAILED",message:r.message}};let n=r.data;return n.Provider="spicy",nc(n),oc(n),{status:"success",data:n}}catch(e){return{status:"error",data:null,error:{code:"FETCH_FAILED",message:e instanceof Error?e.message:String(e)}}}}async function rc(t){let i=`Bearer ${await jn()}`;return await Fn([{operation:"lyrics",variables:{id:t,auth:"SpicyLyrics-WebAuth"}}],i)}function nc(t){if(t.Type==="Static")return;let e=i=>Math.round(Number(i||0)*1e3);if(t.StartTime=e(t.StartTime),t.EndTime=e(t.EndTime),t.Type==="Syllable")for(let i of t.Content){if(i.Lead){i.Lead.StartTime=e(i.Lead.StartTime),i.Lead.EndTime=e(i.Lead.EndTime);for(let r of i.Lead.Syllables)r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime)}if(i.Background)for(let r of i.Background){r.StartTime=e(r.StartTime),r.EndTime=e(r.EndTime);for(let n of r.Syllables)n.StartTime=e(n.StartTime),n.EndTime=e(n.EndTime)}}else if(t.Type==="Line")for(let i of t.Content)i.StartTime=e(i.StartTime),i.EndTime=e(i.EndTime)}function oc(t){let e=i=>{!i.RomanizedText&&i.TransliteratedText&&(i.RomanizedText=i.TransliteratedText)};if(t.Type==="Static"){t.Lines?.forEach(e);return}if(t.Type==="Line"){t.Content?.forEach(e);return}for(let i of t.Content??[])i.Lead?.Syllables?.forEach(e),i.Background?.forEach(r=>r.Syllables?.forEach(e))}function ac(t){if(!t||typeof t!="object")return{status:"error",message:"Spicy returned an empty result"};let e=t,i=e.httpStatus,r=e.data??t;if(i===404||tr(r,"MISSING_LYRICS"))return{status:"missing_lyrics"};if(i===503)return{status:"missing_lyrics",queued:!0};if(i&&i!==200)return{status:"error",message:Wn(r)};if(tr(r))return{status:"error",message:Wn(r)};if(Dn(r))try{r=Un(r)}catch(n){return{status:"error",message:n instanceof Error?n.message:"Malformed packed payload"}}return lc(r)?{status:"success",data:r}:{status:"error",message:"Unexpected response from Spicy"}}function sc(t){let e=t?.queries.flat()??[];return e.find(i=>i?.operation==="lyrics"&&!!i?.result)??e.find(i=>!!i?.result)}function lc(t){if(!t||typeof t!="object"||!("Type"in t))return!1;let e=t.Type;return e==="Syllable"||e==="Line"||e==="Static"}function tr(t,e){if(!t||typeof t!="object"||!("error"in t))return!1;let i=t.error;return typeof i=="string"&&(!e||i===e)}function Wn(t){return tr(t)?t.message??t.error:"Unexpected Error from Spicy"}var $t="liquid-lyrics-custom-sync:",Kn="liquid-lyrics-custom-sync-index",ir="liquid-lyrics:custom-sync-changed";function Gt(t){let e=String(t??"");return e.includes(":")?e.split(":")[2]??e:e}function Xe(t){return String(t??"").trim()}function vt(t){let e=Xe(t);if(!e)return null;try{let i=localStorage.getItem($t+e);if(!i)return null;let r=JSON.parse(i);return eo(r)?r:null}catch{return null}}function $n(t){let e=Xe(t);return!!e&&localStorage.getItem($t+e)!=null}function Gn(t){let e=Xe(t.trackUri||t.trackId);if(!e)return;let i={...t,version:1,updatedAt:Date.now()};try{localStorage.setItem($t+e,JSON.stringify(i)),cc(e,i),Qn(i)}catch(r){throw console.error("[Liquid Lyrics] Could not save custom sync",r),r}}function Yn(t){let e=Xe(t);if(!e)return;let i=vt(e);localStorage.removeItem($t+e),Zn(Jn().filter(r=>Xe(r.trackUri||r.trackId)!==e)),Qn(i??{trackUri:e,trackId:Gt(e)})}function Xn(t,e){let i=JSON.parse(t);if(!eo(i))throw new Error("Invalid or incomplete sync file");if(e){let r=String(e),n=Gt(r);i.trackUri=r,i.trackId=n,i.draft={...i.draft,trackId:n,trackUri:r},i.lyrics={...i.lyrics,Id:n}}return i}function Jn(){try{let t=localStorage.getItem(Kn),e=t?JSON.parse(t):[];return Array.isArray(e)?e:[]}catch{return[]}}function Zn(t){try{localStorage.setItem(Kn,JSON.stringify(t))}catch(e){console.error("[Liquid Lyrics] Could not update sync index",e)}}function cc(t,e){let i={trackId:e.trackId,trackUri:e.trackUri||e.trackId,title:e.title,artist:e.artist,mode:e.mode,updatedAt:e.updatedAt},r=Jn().filter(n=>Xe(n.trackUri||n.trackId)!==t);r.push(i),Zn(r)}function Qn(t){window.dispatchEvent(new CustomEvent(ir,{detail:{trackUri:t.trackUri,trackId:t.trackId}}))}function eo(t){if(!t||typeof t!="object")return!1;let e=t;return typeof e.trackId=="string"&&(e.mode==="line"||e.mode==="word")&&!!e.lyrics&&!!e.draft}var dc={spotify:{id:"spotify",fetch:er},spicy:{id:"spicy",fetch:Vn}},rr=new Map;async function Yt(t){let e=t.id,i=vt(t.uri??t.id);if(i)return{status:"success",data:i.lyrics};if(!t.forceRefresh&&rr.has(e))return{status:"success",data:rr.get(e)};let r=!1,n=!1;for(let o of Bn){let a=dc[o];if(!a)continue;let s=await a.fetch(t);if(s.status==="success"&&s.data){if(!uc(s.data)){r=!0;continue}let l=o==="spicy"?await hc(t,s.data):s.data;return n||rr.set(e,l),{...s,data:l}}if(s.status==="missing_lyrics"){r=!0,s.queued&&(n=!0);continue}}return r?{status:"missing_lyrics",data:null}:{status:"error",data:null,error:{code:"NO_PROVIDERS",message:"All providers failed"}}}function uc(t){return t.Type==="Static"?(t.Lines??[]).some(e=>String(e.Text??"").trim().length>0):(t.Content??[]).length>0}async function hc(t,e){if(e.Type!=="Syllable"&&e.Type!=="Line")return e;try{let i=await er(t);if(i.status!=="success"||!i.data)return e;let r=pc(i.data);if(r.length===0||e.Type==="Line")return e;e.Content.forEach(n=>{let o=n.Lead,a=fc(r,o?.StartTime??0,o?.EndTime??0);a&&(n.LiquidLyricsOriginalText=a.text,o&&(o.LiquidLyricsOriginalText=a.text))})}catch{return e}return e}function pc(t){return t.Type!=="Line"?[]:t.Content.filter(e=>e.Type!=="Interlude").map(e=>({text:gc(e.Text),start:Number(e.StartTime)||0,end:Number(e.EndTime)||0})).filter(e=>e.text&&!e.text.includes("\u266A")&&!e.text.includes("\xE2\u2122\xAA"))}function fc(t,e,i){let r=Number(e)||0,n=Number(i)||r,o=(r+n)/2,a=null,s=Number.POSITIVE_INFINITY;for(let l of t){let c=(l.start+l.end)/2,d=Math.abs(l.start-r),u=Math.abs(c-o),h=d*.75+u*.25;h<s&&(a=l,s=h)}return a&&s<=3500?a:null}function gc(t){return String(t??"").replace(/\s+/g," ").trim()}var mc="liquid-lyrics-mode",to="liquid-lyrics-romanization";var bg=localStorage.getItem(mc)||"romanization",io="liquid-lyrics-romanization-display",ro=(()=>{let t=localStorage.getItem(io);return t==="off"||t==="romaji"||t==="furigana"?t:localStorage.getItem(to)==="true"?"romaji":"off"})();function Z(){return ro}function Xt(t){ro=t,localStorage.setItem(io,t),localStorage.setItem(to,String(t!=="off"))}var Jt="liquid-lyrics-tooltip";function z(t,e){t.dataset.tooltip=e;let i=()=>bc(t,t.dataset.tooltip||e);t.addEventListener("pointerenter",i),t.addEventListener("focus",i),t.addEventListener("pointerleave",re),t.addEventListener("blur",re),t.addEventListener("click",()=>window.setTimeout(()=>no(t),0))}function bc(t,e){if(t.hasAttribute("disabled")||t.hidden)return;let i=yc(t);i.textContent=e,i.classList.add("visible"),no(t)}function re(){document.getElementById(Jt)?.classList.remove("visible")}function yc(t){let e=vc(t),i=document.getElementById(Jt);return i||(i=document.createElement("div"),i.id=Jt,i.className="liquid-lyrics-tooltip"),i.parentElement!==e&&e.appendChild(i),i}function vc(t){let e=document.fullscreenElement;return e instanceof HTMLElement&&e.contains(t)?e:document.body}function no(t){let e=document.getElementById(Jt);if(!e?.classList.contains("visible"))return;if(!t.isConnected){re();return}let i=t.getBoundingClientRect(),r=9,n=e.offsetWidth||80,o=e.offsetHeight||28,a=Math.max(8,i.top-o-r),s=wc(i.left+i.width/2,n/2+8,window.innerWidth-n/2-8);e.style.left=`${s}px`,e.style.top=`${a}px`}function wc(t,e,i){return Math.min(i,Math.max(e,t))}var ca=zn(So()),da=zn(Bo());function tt(t){return t===null?"null":t!==Object(t)?typeof t:{}.toString.call(t).slice(8,-1).toLowerCase()}function Q(t){return tt(t)!=="string"?!0:!t.length}function it(t="",e,i){if(Q(t))return!1;let r=t.charCodeAt(0);return e<=r&&r<=i}var Oo={HIRAGANA:"toHiragana",KATAKANA:"toKatakana"},Ko={HEPBURN:"hepburn"},Hc={useObsoleteKana:!1,passRomaji:!1,convertLongVowelMark:!0,upcaseKatakana:!1,IMEMode:!1,romanization:Ko.HEPBURN},Fc=65,Dc=90,Uc=65345,jc=65370,Wc=65313,Vc=65338,br=12353,Kc=12438,yr=12449,$c=12540,Gc=19968,Yc=40879,Xc=12293,Jc=12540,Zc=12539,Qc=[65296,65305],ed=[Wc,Vc],td=[Uc,jc],id=[65281,65295],rd=[65306,65311],nd=[65339,65343],od=[65371,65376],ad=[65504,65518],sd=[12352,12447],ld=[12448,12543],cd=[65382,65439],dd=[12539,12540],$o=[65377,65381],ud=[12288,12351],hd=[19968,40959],pd=[13312,19903],fd=[sd,ld,$o,cd],gd=[ud,$o,dd,id,rd,nd,od,ad],zg=[...fd,...gd,ed,td,Qc,hd,pd],md=[0,127],bd=[[256,257],[274,275],[298,299],[332,333],[362,363]],yd=[[8216,8217],[8220,8221]],vd=[md,...bd],wd=[[32,47],[58,63],[91,96],[123,126],...yd];var Ho=Number.isNaN||function(e){return typeof e=="number"&&e!==e};function xd(t,e){return!!(t===e||Ho(t)&&Ho(e))}function kd(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!xd(t[i],e[i]))return!1;return!0}function Go(t,e){e===void 0&&(e=kd);var i=null;function r(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(i&&i.lastThis===this&&e(n,i.lastArgs))return i.lastResult;var a=t.apply(this,n);return i={lastResult:a,lastArgs:n,lastThis:this},a}return r.clear=function(){i=null},r}var Fo=Object.prototype.hasOwnProperty;function Do(t,e,i){for(i of t.keys())if(et(i,e))return i}function et(t,e){var i,r,n;if(t===e)return!0;if(t&&e&&(i=t.constructor)===e.constructor){if(i===Date)return t.getTime()===e.getTime();if(i===RegExp)return t.toString()===e.toString();if(i===Array){if((r=t.length)===e.length)for(;r--&&et(t[r],e[r]););return r===-1}if(i===Set){if(t.size!==e.size)return!1;for(r of t)if(n=r,n&&typeof n=="object"&&(n=Do(e,n),!n)||!e.has(n))return!1;return!0}if(i===Map){if(t.size!==e.size)return!1;for(r of t)if(n=r[0],n&&typeof n=="object"&&(n=Do(e,n),!n)||!et(r[1],e.get(n)))return!1;return!0}if(i===ArrayBuffer)t=new Uint8Array(t),e=new Uint8Array(e);else if(i===DataView){if((r=t.byteLength)===e.byteLength)for(;r--&&t.getInt8(r)===e.getInt8(r););return r===-1}if(ArrayBuffer.isView(t)){if((r=t.byteLength)===e.byteLength)for(;r--&&t[r]===e[r];);return r===-1}if(!i||typeof t=="object"){r=0;for(i in t)if(Fo.call(t,i)&&++r&&!Fo.call(e,i)||!(i in e)||!et(t[i],e[i]))return!1;return Object.keys(e).length===r}}return t!==t&&e!==e}var vr=(t={})=>Object.assign({},Hc,t);function Yo(t,e,i){let r=e;function n(s,l){if(s[l]!==void 0)return Object.assign({"":s[""]+l},s[l])}function o(s,l){let c=s.charAt(0);return a(Object.assign({"":c},r[c]),s.slice(1),l,l+1)}function a(s,l,c,d){if(!l)return i||Object.keys(s).length===1?s[""]?[[c,d,s[""]]]:[]:[[c,d,null]];if(Object.keys(s).length===1)return[[c,d,s[""]]].concat(o(l,d));let u=n(s,l.charAt(0));return u===void 0?[[c,d,s[""]]].concat(o(l,d)):a(u,l.slice(1),c,d+1)}return o(t,0)}function wr(t){return Object.entries(t).reduce((e,[i,r])=>{let n=tt(r)==="string";return e[i]=n?{"":r}:wr(r),e},{})}function Xo(t,e){return e.split("").reduce((i,r)=>(i[r]===void 0&&(i[r]={}),i[r]),t)}function Jo(t={}){let e={};return tt(t)==="object"&&Object.entries(t).forEach(([i,r])=>{let n=e;i.split("").forEach(o=>{n[o]===void 0&&(n[o]={}),n=n[o]}),n[""]=r}),function(r){let n=JSON.parse(JSON.stringify(r));function o(a,s){return a===void 0||tt(a)==="string"?s:Object.entries(s).reduce((l,[c,d])=>(l[c]=o(a[c],d),l),a)}return o(n,e)}}function Zo(t,e){return e?tt(e)==="function"?e(t):Jo(e)(t):t}var Sd={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u304A",k:{a:"\u304B",i:"\u304D",u:"\u304F",e:"\u3051",o:"\u3053"},s:{a:"\u3055",i:"\u3057",u:"\u3059",e:"\u305B",o:"\u305D"},t:{a:"\u305F",i:"\u3061",u:"\u3064",e:"\u3066",o:"\u3068"},n:{a:"\u306A",i:"\u306B",u:"\u306C",e:"\u306D",o:"\u306E"},h:{a:"\u306F",i:"\u3072",u:"\u3075",e:"\u3078",o:"\u307B"},m:{a:"\u307E",i:"\u307F",u:"\u3080",e:"\u3081",o:"\u3082"},y:{a:"\u3084",u:"\u3086",o:"\u3088"},r:{a:"\u3089",i:"\u308A",u:"\u308B",e:"\u308C",o:"\u308D"},w:{a:"\u308F",i:"\u3090",e:"\u3091",o:"\u3092"},g:{a:"\u304C",i:"\u304E",u:"\u3050",e:"\u3052",o:"\u3054"},z:{a:"\u3056",i:"\u3058",u:"\u305A",e:"\u305C",o:"\u305E"},d:{a:"\u3060",i:"\u3062",u:"\u3065",e:"\u3067",o:"\u3069"},b:{a:"\u3070",i:"\u3073",u:"\u3076",e:"\u3079",o:"\u307C"},p:{a:"\u3071",i:"\u3074",u:"\u3077",e:"\u307A",o:"\u307D"},v:{a:"\u3094\u3041",i:"\u3094\u3043",u:"\u3094",e:"\u3094\u3047",o:"\u3094\u3049"}},Ld={".":"\u3002",",":"\u3001",":":"\uFF1A","/":"\u30FB","!":"\uFF01","?":"\uFF1F","~":"\u301C","-":"\u30FC","\u2018":"\u300C","\u2019":"\u300D","\u201C":"\u300E","\u201D":"\u300F","[":"\uFF3B","]":"\uFF3D","(":"\uFF08",")":"\uFF09","{":"\uFF5B","}":"\uFF5D"},Uo={k:"\u304D",s:"\u3057",t:"\u3061",n:"\u306B",h:"\u3072",m:"\u307F",r:"\u308A",g:"\u304E",z:"\u3058",d:"\u3062",b:"\u3073",p:"\u3074",v:"\u3094",q:"\u304F",f:"\u3075"},Qo={ya:"\u3083",yi:"\u3043",yu:"\u3085",ye:"\u3047",yo:"\u3087"},ea={a:"\u3041",i:"\u3043",u:"\u3045",e:"\u3047",o:"\u3049"},jo={sh:"sy",ch:"ty",cy:"ty",chy:"ty",shy:"sy",j:"zy",jy:"zy",shi:"si",chi:"ti",tsu:"tu",ji:"zi",fu:"hu"},Td=Object.assign({tu:"\u3063",wa:"\u308E",ka:"\u30F5",ke:"\u30F6"},ea,Qo),Ed={yi:"\u3044",wu:"\u3046",ye:"\u3044\u3047",wi:"\u3046\u3043",we:"\u3046\u3047",kwa:"\u304F\u3041",whu:"\u3046",tha:"\u3066\u3083",thu:"\u3066\u3085",tho:"\u3066\u3087",dha:"\u3067\u3083",dhu:"\u3067\u3085",dho:"\u3067\u3087"},Md={wh:"\u3046",kw:"\u304F",qw:"\u304F",q:"\u304F",gw:"\u3050",sw:"\u3059",ts:"\u3064",th:"\u3066",tw:"\u3068",dh:"\u3067",dw:"\u3069",fw:"\u3075",f:"\u3075"};function Cd(){let t=wr(Sd),e=n=>Xo(t,n);Object.entries(Uo).forEach(([n,o])=>{Object.entries(Qo).forEach(([a,s])=>{e(n+a)[""]=o+s})}),Object.entries(Ld).forEach(([n,o])=>{e(n)[""]=o}),Object.entries(Md).forEach(([n,o])=>{Object.entries(ea).forEach(([a,s])=>{let l=e(n+a);l[""]=o+s})}),["n","n'","xn"].forEach(n=>{e(n)[""]="\u3093"}),t.c=JSON.parse(JSON.stringify(t.k)),Object.entries(jo).forEach(([n,o])=>{let a=n.slice(0,n.length-1),s=n.charAt(n.length-1),l=e(a);l[s]=JSON.parse(JSON.stringify(e(o)))});function i(n){return[...Object.entries(jo),["c","k"]].reduce((o,[a,s])=>n.startsWith(s)?o.concat(n.replace(s,a)):o,[])}Object.entries(Td).forEach(([n,o])=>{let a=u=>u.charAt(u.length-1),s=u=>u.slice(0,u.length-1),l=`x${n}`,c=e(l);c[""]=o;let d=e(`l${s(n)}`);d[a(n)]=c,i(n).forEach(u=>{["l","x"].forEach(h=>{let p=e(h+s(u));p[a(u)]=e(h+n)})})}),Object.entries(Ed).forEach(([n,o])=>{e(n)[""]=o});function r(n){return Object.entries(n).reduce((o,[a,s])=>(a?o[a]=r(s):o[a]=`\u3063${s}`,o),{})}return[...Object.keys(Uo),"c","y","w","j"].forEach(n=>{let o=t[n];o[n]=r(o)}),delete t.n.n,Object.freeze(JSON.parse(JSON.stringify(t)))}var pr=null;function qd(){return pr==null&&(pr=Cd()),pr}var Ad=Jo({wi:"\u3090",we:"\u3091"});function _d(t){let e=JSON.parse(JSON.stringify(t));return e.n.n={"":"\u3093"},e.n[" "]={"":"\u3093"},e}function Rd(t=""){return Q(t)?!1:it(t,Fc,Dc)}function xt(t=""){return Q(t)?!1:t.charCodeAt(0)===Jc}function ta(t=""){return Q(t)?!1:t.charCodeAt(0)===Zc}function ia(t=""){return Q(t)?!1:xt(t)?!0:it(t,br,Kc)}function Id(t=""){let e=[];return t.split("").forEach(i=>{if(xt(i)||ta(i))e.push(i);else if(ia(i)){let r=i.charCodeAt(0)+(yr-br),n=String.fromCharCode(r);e.push(n)}else e.push(i)}),e.join("")}var ra=Go((t,e,i)=>{let r=qd();return r=t?_d(r):r,r=e?Ad(r):r,i&&(r=Zo(r,i)),r},et);function Wo(t="",e={},i){let r;return i?r=e:(r=vr(e),i=ra(r.IMEMode,r.useObsoleteKana,r.customKanaMapping)),Nd(t,r,i).map(n=>{let[o,a,s]=n;if(s===null)return t.slice(o);let l=r.IMEMode===Oo.HIRAGANA,c=r.IMEMode===Oo.KATAKANA||[...t.slice(o,a)].every(Rd);return l||!c?s:Id(s)}).join("")}function Nd(t="",e={},i){let{IMEMode:r,useObsoleteKana:n,customKanaMapping:o}=e;return i||(i=ra(r,n,o)),Yo(t.toLowerCase(),i,!r)}function Pd(t=""){return Q(t)?!1:vd.some(([e,i])=>it(t,e,i))}function na(t="",e){let i=tt(e)==="regexp";return Q(t)?!1:[...t].every(r=>{let n=Pd(r);return i?n||e.test(r):n})}function mr(t=""){return it(t,yr,$c)}function zd(t=""){return Q(t)?!1:[...t].every(ia)}function oa(t=""){return Q(t)?!1:[...t].every(mr)}function Bd(t=""){return Q(t)?!1:t.charCodeAt(0)===Xc}function Od(t=""){return it(t,Gc,Yc)||Bd(t)}function Hd(t=""){return Q(t)?!1:[...t].every(Od)}function Fd(t="",e={passKanji:!0}){let i=[...t],r=!1;return e.passKanji||(r=i.some(Hd)),(i.some(zd)||i.some(oa))&&i.some(na)&&!r}var Dd=(t,e)=>xt(t)&&e<1,Ud=(t,e)=>xt(t)&&e>0,jd=t=>["\u30F6","\u30F5"].includes(t),Wd={a:"\u3042",i:"\u3044",u:"\u3046",e:"\u3048",o:"\u3046"};function ti(t="",e,{isDestinationRomaji:i,convertLongVowelMark:r}={}){let n="";return t.split("").reduce((o,a,s)=>{if(ta(a)||Dd(a,s)||jd(a))return o.concat(a);if(r&&n&&Ud(a,s)){let l=e(n).slice(-1);return mr(t[s-1])&&l==="o"&&i?o.concat("\u304A"):o.concat(Wd[l])}if(!xt(a)&&mr(a)){let l=a.charCodeAt(0)+(br-yr),c=String.fromCharCode(l);return n=c,o.concat(c)}return n="",o.concat(a)},[]).join("")}var fr=null,Vd={\u3042:"a",\u3044:"i",\u3046:"u",\u3048:"e",\u304A:"o",\u304B:"ka",\u304D:"ki",\u304F:"ku",\u3051:"ke",\u3053:"ko",\u3055:"sa",\u3057:"shi",\u3059:"su",\u305B:"se",\u305D:"so",\u305F:"ta",\u3061:"chi",\u3064:"tsu",\u3066:"te",\u3068:"to",\u306A:"na",\u306B:"ni",\u306C:"nu",\u306D:"ne",\u306E:"no",\u306F:"ha",\u3072:"hi",\u3075:"fu",\u3078:"he",\u307B:"ho",\u307E:"ma",\u307F:"mi",\u3080:"mu",\u3081:"me",\u3082:"mo",\u3089:"ra",\u308A:"ri",\u308B:"ru",\u308C:"re",\u308D:"ro",\u3084:"ya",\u3086:"yu",\u3088:"yo",\u308F:"wa",\u3090:"wi",\u3091:"we",\u3092:"wo",\u3093:"n",\u304C:"ga",\u304E:"gi",\u3050:"gu",\u3052:"ge",\u3054:"go",\u3056:"za",\u3058:"ji",\u305A:"zu",\u305C:"ze",\u305E:"zo",\u3060:"da",\u3062:"ji",\u3065:"zu",\u3067:"de",\u3069:"do",\u3070:"ba",\u3073:"bi",\u3076:"bu",\u3079:"be",\u307C:"bo",\u3071:"pa",\u3074:"pi",\u3077:"pu",\u307A:"pe",\u307D:"po",\u3094\u3041:"va",\u3094\u3043:"vi",\u3094:"vu",\u3094\u3047:"ve",\u3094\u3049:"vo"},Kd={"\u3002":".","\u3001":",","\uFF1A":":","\u30FB":"/","\uFF01":"!","\uFF1F":"?","\u301C":"~",\u30FC:"-","\u300C":"\u2018","\u300D":"\u2019","\u300E":"\u201C","\u300F":"\u201D","\uFF3B":"[","\uFF3D":"]","\uFF08":"(","\uFF09":")","\uFF5B":"{","\uFF5D":"}","\u3000":" "},$d=["\u3042","\u3044","\u3046","\u3048","\u304A","\u3084","\u3086","\u3088"],gr={\u3083:"ya",\u3085:"yu",\u3087:"yo"},Gd={\u3043:"yi",\u3047:"ye"},Yd={\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},Xd=["\u304D","\u306B","\u3072","\u307F","\u308A","\u304E","\u3073","\u3074","\u3094","\u304F","\u3075"],Jd={\u3057:"sh",\u3061:"ch",\u3058:"j",\u3062:"j"},Zd={\u3063:"",\u3083:"ya",\u3085:"yu",\u3087:"yo",\u3041:"a",\u3043:"i",\u3045:"u",\u3047:"e",\u3049:"o"},Vo={b:"b",c:"t",d:"d",f:"f",g:"g",h:"h",j:"j",k:"k",m:"m",p:"p",q:"q",r:"r",s:"s",t:"t",v:"v",w:"w",x:"x",z:"z"};function Qd(){return fr==null&&(fr=tu()),fr}function eu(t){switch(t){case Ko.HEPBURN:return Qd();default:return{}}}function tu(){let t=wr(Vd),e=r=>Xo(t,r),i=(r,n)=>{e(r)[""]=n};return Object.entries(Kd).forEach(([r,n])=>{e(r)[""]=n}),[...Object.entries(gr),...Object.entries(Yd)].forEach(([r,n])=>{i(r,n)}),Xd.forEach(r=>{let n=e(r)[""][0];Object.entries(gr).forEach(([o,a])=>{i(r+o,n+a)}),Object.entries(Gd).forEach(([o,a])=>{i(r+o,n+a)})}),Object.entries(Jd).forEach(([r,n])=>{Object.entries(gr).forEach(([o,a])=>{i(r+o,n+a[1])}),i(`${r}\u3043`,`${n}yi`),i(`${r}\u3047`,`${n}e`)}),t.\u3063=aa(t),Object.entries(Zd).forEach(([r,n])=>{i(r,n)}),$d.forEach(r=>{i(`\u3093${r}`,`n'${e(r)[""]}`)}),Object.freeze(JSON.parse(JSON.stringify(t)))}function aa(t){return Object.entries(t).reduce((e,[i,r])=>{if(i)e[i]=aa(r);else{let n=r.charAt(0);e[i]=Object.keys(Vo).includes(n)?Vo[n]+r:r}return e},{})}var sa=Go((t,e)=>{let i=eu(t);return e&&(i=Zo(i,e)),i},et);function Oe(t="",e={},i){let r=vr(e);return i||(i=sa(r.romanization,r.customRomajiMapping)),iu(t,r,i).map(n=>{let[o,a,s]=n;return r.upcaseKatakana&&oa(t.slice(o,a))?s.toUpperCase():s}).join("")}function iu(t,e,i){i||(i=sa(e.romanization,e.customRomajiMapping));let r=Object.assign({},{isDestinationRomaji:!0},e);return Yo(ti(t,Oe,r),i,!e.IMEMode)}function ru(t=""){return Q(t)?!1:wd.some(([e,i])=>it(t,e,i))}function la(t="",e={}){let i=vr(e);if(i.passRomaji)return ti(t,Oe,i);if(Fd(t,{passKanji:!0})){let r=ti(t,Oe,i);return Wo(r.toLowerCase(),i)}return na(t)||ru(t)?Wo(t.toLowerCase(),i):ti(t,Oe,i)}var ou=["https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://fastly.jsdelivr.net/npm/kuromoji@0.1.2/dict","https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict","https://unpkg.com/kuromoji@0.1.2/dict"],au=["base.dat.gz","check.dat.gz","tid.dat.gz","tid_pos.dat.gz","tid_map.dat.gz","cc.dat.gz","unk.dat.gz","unk_pos.dat.gz","unk_map.dat.gz","unk_char.dat.gz","unk_compat.dat.gz","unk_invoke.dat.gz"],su=["https://cdn.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://fastly.jsdelivr.net/npm/pinyin-pro@3/dist/index.min.js","https://unpkg.com/pinyin-pro@3/dist/index.min.js"];function kr(t){return/[぀-ヿㇰ-ㇿ･-ﾟ]/.test(t)}function Sr(t){return/[가-힯ᄀ-ᇿ㄰-㆏]/.test(t)}function ii(t){return/[㐀-䶿一-鿿豈-﫿]/.test(t)}function ua(t){let e=!1;for(let i of t){if(kr(i))return"ja";if(Sr(i))return"ko";ii(i)&&(e=!0)}return e?"zh":null}async function ha(t,e){if(t.length===0)return[];if(e==="ko")return t.map(a=>ve(ya(a)));if(e==="zh"){let a=await va();return a?t.map(s=>ve(wa(a,s))):null}let i=t.join(""),r=await ri(i);if(!r)return null;let n=ma(t),o=t.map(()=>[]);for(let a of r)ba(a,n,(s,l,c)=>{let d=c?a.reading||a.surface:hu(a,l);d&&o[s].push(d)});return t.map((a,s)=>ve(o[s].map(l=>String(Oe(l))).filter(Boolean).join(" ")))}async function pa(t,e){let i=ve(t);if(!i)return"";if(e==="ko")return ve(ya(i));if(e==="zh"){let o=await va();return o?ve(wa(o,i)):null}let r=await ri(i);if(!r)return null;let n=r.map(o=>String(Oe(o.reading||o.surface))).map(o=>o.trim()).filter(Boolean).join(" ");return ve(n)}async function fa(t){if(t.length===0)return[];let e=t.join(""),i=await ri(e);if(!i)return null;let r=ma(t),n=t.map(()=>[]),o=t.map(()=>!1);for(let a of i)ba(a,r,(s,l,c)=>{c&&a.hasKanji&&a.reading?(n[s].push(`<ruby>${ye(a.surface)}<rt>${ye(a.reading)}</rt></ruby>`),o[s]=!0):n[s].push(ye(l))});return t.map((a,s)=>o[s]?n[s].join(""):null)}async function ga(t){let e=ve(t);if(!e)return"";let i=await ri(e);if(!i)return null;let r=!1,n=0,o="";for(let a of i)a.start>n&&(o+=ye(e.slice(n,a.start))),a.hasKanji&&a.reading?(o+=`<ruby>${ye(a.surface)}<rt>${ye(a.reading)}</rt></ruby>`,r=!0):o+=ye(a.surface),n=a.end;return n<e.length&&(o+=ye(e.slice(n))),r?o:""}var kt=null;function lu(){return kt||(kt=(async()=>{for(let t of ou){let e=await cu(t);if(e)return e;console.warn(`[Liquid Lyrics] kuromoji dictionary failed to load from ${t}, trying next source\u2026`)}return console.warn("[Liquid Lyrics] Local Japanese romanization unavailable: no dictionary source worked."),null})(),kt.then(t=>{t||(kt=null)})),kt}async function cu(t){try{let e=await Promise.all(au.map(r=>du(`${t}/${r}`))),i=new ca.default;return i.loadTrie(new Int32Array(e[0]),new Int32Array(e[1])),i.loadTokenInfoDictionaries(new Uint8Array(e[2]),new Uint8Array(e[3]),new Uint8Array(e[4])),i.loadConnectionCosts(new Int16Array(e[5])),i.loadUnknownDictionaries(new Uint8Array(e[6]),new Uint8Array(e[7]),new Uint8Array(e[8]),new Uint8Array(e[9]),new Uint32Array(e[10]),new Uint8Array(e[11])),new da.default(i)}catch{return null}}async function du(t){let e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status} for ${t}`);let i=new Uint8Array(await e.arrayBuffer());if(i[0]===31&&i[1]===139){let r=new Blob([i]).stream().pipeThrough(new DecompressionStream("gzip"));return await new Response(r).arrayBuffer()}return i.buffer}async function ri(t){if(!t)return[];let e=await lu();if(!e)return null;let i;try{i=e.tokenize(t)}catch{return null}let r=[],n=0;for(let o of i){let a=String(o?.surface_form??"");if(!a)continue;let s=Number(o?.word_position),l=Number.isFinite(s)&&s>0?s-1:Math.max(n,t.indexOf(a,n)),c=l+a.length;n=c;let d=ii(a),u=typeof o?.reading=="string"&&o.reading!=="*"?o.reading:"",h=u?String(la(u)):d?"":a;h=uu(a,String(o?.pos??""),h),r.push({start:l,end:c,surface:a,reading:h,hasKanji:d})}return r}function uu(t,e,i){return e.includes("\u52A9\u8A5E")?t==="\u306F"?"\u308F":t==="\u3078"?"\u3048":t==="\u3092"?"\u304A":i:i}function ma(t){let e=[],i=0;for(let r of t)e.push([i,i+r.length]),i+=r.length;return e}function ba(t,e,i){let r=t.end-t.start;if(!(r<=0))for(let n=0;n<e.length;n++){let[o,a]=e[n],s=Math.max(o,t.start),l=Math.min(a,t.end);if(l<=s)continue;let c=t.surface.slice(s-t.start,l-t.start);i(n,c,l-s>=r)}}function hu(t,e){let i=t.reading||t.surface,r=t.end-t.start;if(r<=0||!i)return"";let n=t.surface.indexOf(e);if(n<0)return"";let o=Math.round(i.length*n/r),a=Math.round(i.length*(n+e.length)/r);return i.slice(o,a)}var pu=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"],fu=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"],gu=["","k","k","k","n","n","n","t","l","k","m","p","l","l","p","l","m","p","p","t","t","ng","t","t","k","t","p","t"],mu=["","g","kk","ks","n","nj","nh","d","r","lg","lm","lb","ls","lt","lp","lh","m","b","ps","s","ss","ng","j","ch","k","t","p","h"];function ya(t){let e=Array.from(t),i="";for(let r=0;r<e.length;r++){let n=e[r].codePointAt(0)??0;if(n<44032||n>55203){i+=e[r];continue}let o=n-44032,a=Math.floor(o/588),s=Math.floor(o%588/28),l=o%28,c=e[r+1]?.codePointAt(0)??0,h=(c>=44032&&c<=55203?Math.floor((c-44032)/588):-1)===11;i+=pu[a]+fu[s],i+=h?mu[l]:gu[l]}return i}async function va(){return await bu(su,()=>!!window.pinyinPro?.pinyin)?window.pinyinPro.pinyin:null}function wa(t,e){try{return String(t(e,{toneType:"symbol",nonZh:"consecutive"}))}catch{return e}}var xr=new Map;async function bu(t,e){for(let i of t)if(await yu(i,e))return!0;return!1}function yu(t,e){if(e())return Promise.resolve(!0);let i=xr.get(t);return i||(i=new Promise(r=>{let n=document.createElement("script");n.src=t,n.onload=()=>r(e()),n.onerror=()=>r(!1),document.head.appendChild(n)}),xr.set(t,i),i.then(r=>{r||xr.delete(t)})),i}function ye(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ve(t){return String(t??"").replace(/\s+/g," ").trim()}function La(t){return t.Type==="Line"?vu(t.Content??[]):t.Type==="Syllable"?wu(t.Content??[]):(t.Lines??[]).map(e=>({kind:"static",text:j(e.Text),romanizedText:j(e.RomanizedText)})).filter(e=>e.text)}function vu(t){let e=[],i=W(t[0]?.StartTime,0);return t.length>0&&i>500&&e.push(ni(0,i)),t.forEach((r,n)=>{let o=t[n+1],a=xu(r,o);r.Type==="Interlude"?e.push(ni(a.start,a.end)):e.push({kind:"line",range:a,text:j(r.Text),romanizedText:j(r.RomanizedText)}),Ta(e,a.end,W(o?.StartTime,NaN))}),e}function wu(t){let e=[],i=t.map((r,n)=>ku(r,t[n+1]));return i.length>0&&i[0].range.start>500&&e.push(ni(0,i[0].range.start)),i.forEach((r,n)=>{e.push({kind:"syllable",range:r.range,text:r.lead.sourceText||r.lead.words.map(o=>o.text).join(" ").trim(),romanizedText:Mu(r.lead.words),lead:r.lead,backgrounds:r.backgrounds}),Ta(e,r.range.end,i[n+1]?.range.start??NaN)}),e}function ni(t,e){return{kind:"interlude",range:{start:t,end:Math.max(e,t+250)}}}function Ta(t,e,i){Number.isFinite(i)&&(i-e<3e3||t.push(ni(e,i)))}function xu(t,e){let i=W(t.StartTime,0),r=W(e?.StartTime,NaN),n=W(t.EndTime,i+4500),o=Ma(n,r);return{start:i,end:Ca(o,i,o,250)}}function ku(t,e){let i=ka(t.Lead),r=(t.Background??[]).map(u=>ka(u)),n=W(e?.Lead?.StartTime,NaN),o=i.range.start,a=Number.isFinite(n)&&n>o?n:o+4500,s=Math.max(i.range.end,...r.map(u=>u.range.end)),l=Ma(s,n),d=xa(t.Lead)||(t.Background??[]).some(xa)?Number.POSITIVE_INFINITY:a;return{range:{start:o,end:Ca(l,o,a,250,d)},lead:i,backgrounds:r}}function xa(t){let e=W(t?.StartTime,0),i=Number(t?.EndTime);return Number.isFinite(i)&&i>e}function ka(t){let e=W(t?.StartTime,0),i=Number(t?.EndTime),r=Number.isFinite(i)&&i>e?W(i,e):e+4500,n={start:e,end:r};return{range:n,sourceText:qu(t),words:Lu(Su(t?.Syllables??[],n),n)}}function Su(t,e){let i=[],r=null,n=!1;return t.forEach((o,a)=>{let s={text:j(o.Text),romanizedText:j(o.RomanizedText),start:W(o.StartTime,e.start),end:W(o.EndTime,e.start+80),animateLetters:!1},l=!!(o.IsPartOfWord||n)&&!we(s.text)&&!we(r?.text??"");l&&r?(r.text+=s.text,r.romanizedText=Ru(r.romanizedText,s.romanizedText," "),r.start=Math.min(r.start,s.start),r.end=Math.max(r.end,s.end)):(r&&!l&&i.push(r),r=s),n=!!o.IsPartOfWord,(!o.IsPartOfWord||a===t.length-1)&&r&&(i.push(r),r=null)}),i.filter(o=>o.text)}function Lu(t,e){if(t.length===0)return[];let i=e.start,r=Math.max(e.end,i+250),n=t.map(l=>({...l,start:he(l.start,i,r),end:he(l.end,i,r)})).filter(l=>l.text.trim().length>0),o=i;n.forEach(l=>{l.start=Math.max(o,l.start),o=l.start});let a=[];n.forEach(l=>{let c=a[a.length-1],d=c?.[0]?.start;c&&d!==void 0&&Math.abs(l.start-d)<=12?(l.start=d,c.push(l)):a.push([l])});let s=[];return a.forEach((l,c)=>{let d=l[0].start,u=a[c+1]?.[0]?.start??r,h=Math.max(d+1,u);if(l.length===1){s.push({...l[0],start:d,end:Eu(l[0].end,d,h)});return}Tu(l,d,h).forEach(p=>s.push(p))}),s.map((l,c)=>{let d=s[c+1]?.start??r,u=Math.max(l.start+1,d),h=Math.min(Math.max(l.end,l.start+1),u);return{...l,end:h,animateLetters:oi(l.text,l.start,h)}})}function Tu(t,e,i){let r=Math.max(i,e+t.length*80),n=t.reduce((a,s)=>a+Sa(s.text),0)||t.length,o=e;return t.map((a,s)=>{let l=s===t.length-1,c=t.length-s,d=Math.max(1,r-o),u=(r-e)*Sa(a.text)/n,h=Math.max(1,d-(c-1)),p=o,g=l?r:o+he(u,1,h);return o=g,{...a,start:p,end:g}})}function Eu(t,e,i){return Number.isFinite(t)&&t>e?Math.min(t,i):i}function Sa(t){return Math.max(1,Array.from(t.trim()).length)}function oi(t,e,i){let r=Array.from(t.trim());if(r.length<3)return!1;let n=i-e;return n<750||n/r.length<90?!1:r.some(o=>/[A-Za-z0-9]/.test(o))}function Mu(t){return t.map(e=>ai(e.romanizedText)).filter(Boolean).join(" ").trim()}function Ea(t){let e=Array.isArray(t.SongWriters)?Array.from(new Set(t.SongWriters.map(r=>j(r)).filter(Boolean))):[],i=Cu(t);return e.length===0&&!i?null:{writers:e,source:i}}function Cu(t){let e=t.Provider,i=j(t.LiquidLyricsCredit);if(e==="local")return i?`Synced by ${i}`:"Custom sync";if(i)return`Synced by ${i}`;if(e==="spicy"){if(t.source==="spl"){let r=j(t.TTMLUploadMetadata?.Maker?.username)||j(t.TTMLUploadMetadata?.Uploader?.username);return r?`via Spicy Lyrics (community) \xB7 Made by @${r}`:"via Spicy Lyrics (community)"}return"via Spicy Lyrics"}return e==="spotify"?"via Spotify":""}function j(t){return String(t??"").replace(/\s+/g," ").trim()}function ai(t){let e=j(t);return e&&!we(e)?e:""}function we(t){return/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿･-ﾟ가-힯]/.test(t)}function qu(t){return j(t?.LiquidLyricsOriginalText)||Au(t?.Syllables??[])}function Au(t){let e="",i="",r=!1;return t.forEach(n=>{let o=j(n.Text);if(!o)return;let a=!e||n.IsPartOfWord||r||_u(i,o);e+=a?o:` ${o}`,i=o,r=!!n.IsPartOfWord}),e.trim()}function _u(t,e){return!t||!e||/^[,.;:!?)]/.test(e)||/[(]$/.test(t)?!0:we(t)||we(e)}function Ru(t,e,i){let r=j(t),n=j(e);return r?n?`${r}${i}${n}`:r:n||void 0}function Ma(t,e){return!Number.isFinite(e)||e<=t?t:e-t<3e3?e:t}function Ca(t,e,i,r,n=Number.POSITIVE_INFINITY){let o=W(t,i),a=o>=e+r?o:Math.max(i,e+r);return Math.min(a,n)}function W(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function he(t,e=0,i=1){return Math.min(i,Math.max(e,t))}function Lr(t,e){return he((e-t.start)/Math.max(1,t.end-t.start))}function rt(t,e,i){let r=he((i-t)/(e-t));return r*r*(3-2*r)}var Iu=1200,Nu=60,Pu=750,Aa=3e3,zu=[200,900,2400],Bu=4e3,_a="",St=0,si=0,li=0,Tr=0,Er=!1,Ra=!1,Ia=0,qa=[];function xe(){let t=W(Spicetify.Player?.getProgress?.(),0),e=di(),i=performance.now(),r=St+(i-si),n=!ee(),o=e!==_a,a=Math.abs(t-r)>Iu;if(n||o||a)return li++,Mr(t,e,i),Tr=i,!n&&(o||a)&&ci(),t;if(!Ra||i-Ia>Aa*2.5){let c=t-r;if(Math.abs(c)>Nu){let d=Math.min(120,Math.max(0,i-Tr));St+=c*Math.min(1,d/Pu)}}Tr=i;let s=St+(i-si),l=Y();return l>0?Math.min(s,l):s}function ke(t){let e=Math.max(0,Math.round(t));li++,Mr(e),Spicetify.Player?.seek?.(e),ci()}function Na(){Er||(Er=!0,["songchange","onplaypause"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>ci())}catch{}}),window.setInterval(()=>{ee()&&Pa()},Aa),ci())}function ci(){Er&&(qa.forEach(t=>clearTimeout(t)),qa=zu.map(t=>window.setTimeout(()=>void Pa(),t)))}async function Pa(){let t=Ou();if(typeof t?.getPositionState!="function")return;let e=li,i=di();try{let r=await t.getPositionState({}),n=Number(r?.position);if(!Number.isFinite(n)||n<0||e!==li||i!==di()||!ee())return;let o=performance.now(),a=St+(o-si);if(Math.abs(n-a)>Bu)return;Ra=!0,Ia=o,Mr(n,i,o)}catch{}}function Ou(){return Spicetify.Platform?.PlayerAPI?._contextPlayer??Spicetify.Player?.origin?._contextPlayer??null}function ee(){let t=Spicetify.Player;return typeof t?.isPlaying=="function"?!!t.isPlaying():typeof t?.data?.isPaused=="boolean"?!t.data.isPaused:!!(t?.data?.is_playing??t?.data?.isPlaying)}function Y(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{};return W(e.duration_ms??e.duration??t?.duration?.milliseconds??t?.duration_ms??Spicetify.Player?.data?.duration,0)}function di(){return String(Spicetify.Player?.data?.item?.uri??"")}function Mr(t,e=di(),i=performance.now()){_a=e,St=Math.max(0,t),si=i}var Lt=new Set,He=null;function nt(t){return Lt.add(t),He===null&&(He=requestAnimationFrame(za)),()=>{Lt.delete(t),Lt.size===0&&He!==null&&(cancelAnimationFrame(He),He=null)}}function za(t){if(Lt.size===0){He=null;return}He=requestAnimationFrame(za);let e=xe();for(let i of Lt)i(e,t)}var Ba="1.3.25";function Fa(t,e,i){return Math.max(t,Math.min(e,i))}function Hu(t,e,i){return(1-i)*t+i*e}function Fu(t,e,i,r){return Hu(t,e,1-Math.exp(-i*r))}function Du(t,e){return(t%e+e)%e}var Uu=class{constructor(){m(this,"isRunning",!1);m(this,"value",0);m(this,"from",0);m(this,"to",0);m(this,"currentTime",0);m(this,"lerp");m(this,"duration");m(this,"easing");m(this,"onUpdate")}advance(t){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=t;let i=Fa(0,this.currentTime/this.duration,1);e=i>=1;let r=e?1:this.easing(i);this.value=this.from+(this.to-this.from)*r}else this.lerp?(this.value=Fu(this.value,this.to,this.lerp*60,t),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:r,easing:n,onStart:o,onUpdate:a}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=r,this.easing=n,this.currentTime=0,this.isRunning=!0,o?.(),this.onUpdate=a}};function ju(t,e){let i;return function(...r){clearTimeout(i),i=setTimeout(()=>{i=void 0,t.apply(this,r)},e)}}var Wu=class{constructor(t,e,{autoResize:i=!0,debounce:r=250}={}){m(this,"width",0);m(this,"height",0);m(this,"scrollHeight",0);m(this,"scrollWidth",0);m(this,"debouncedResize");m(this,"wrapperResizeObserver");m(this,"contentResizeObserver");m(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});m(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});m(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=t,this.content=e,i&&(this.debouncedResize=ju(this.resize,r),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Da=class{constructor(){m(this,"events",{})}emit(t,...e){let i=this.events[t]||[];for(let r=0,n=i.length;r<n;r++)i[r]?.(...e)}on(t,e){return this.events[t]?this.events[t].push(e):this.events[t]=[e],()=>{this.events[t]=this.events[t]?.filter(i=>e!==i)}}off(t,e){this.events[t]=this.events[t]?.filter(i=>e!==i)}destroy(){this.events={}}},Vu=100/6,Se={passive:!1};function Oa(t,e){return t===1?Vu:t===2?e:1}var Ku=class{constructor(t,e={wheelMultiplier:1,touchMultiplier:1}){m(this,"touchStart",{x:0,y:0});m(this,"lastDelta",{x:0,y:0});m(this,"window",{width:0,height:0});m(this,"emitter",new Da);m(this,"onTouchStart",t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});m(this,"onTouchMove",t=>{let{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,r=-(e-this.touchStart.x)*this.options.touchMultiplier,n=-(i-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:r,y:n},this.emitter.emit("scroll",{deltaX:r,deltaY:n,event:t})});m(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});m(this,"onWheel",t=>{let{deltaX:e,deltaY:i,deltaMode:r}=t,n=Oa(r,this.window.width),o=Oa(r,this.window.height);e*=n,i*=o,e*=this.options.wheelMultiplier,i*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})});m(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=t,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Se),this.element.addEventListener("touchstart",this.onTouchStart,Se),this.element.addEventListener("touchmove",this.onTouchMove,Se),this.element.addEventListener("touchend",this.onTouchEnd,Se)}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Se),this.element.removeEventListener("touchstart",this.onTouchStart,Se),this.element.removeEventListener("touchmove",this.onTouchMove,Se),this.element.removeEventListener("touchend",this.onTouchEnd,Se)}},Ha=t=>Math.min(1,1.001-2**(-10*t)),Ua=class{constructor({wrapper:t=window,content:e=document.documentElement,eventsTarget:i=t,smoothWheel:r=!0,syncTouch:n=!1,syncTouchLerp:o=.075,touchInertiaExponent:a=1.7,duration:s,easing:l,lerp:c=.1,infinite:d=!1,orientation:u="vertical",gestureOrientation:h=u==="horizontal"?"both":"vertical",touchMultiplier:p=1,wheelMultiplier:g=1,autoResize:x=!0,prevent:E,virtualScroll:f,overscroll:b=!0,autoRaf:w=!1,anchors:S=!1,autoToggle:y=!1,allowNestedScroll:k=!1,__experimental__naiveDimensions:v=!1,naiveDimensions:L=v,stopInertiaOnNavigate:M=!1}={}){m(this,"_isScrolling",!1);m(this,"_isStopped",!1);m(this,"_isLocked",!1);m(this,"_preventNextNativeScrollEvent",!1);m(this,"_resetVelocityTimeout",null);m(this,"_rafId",null);m(this,"_isDraggingSelection",!1);m(this,"isTouching");m(this,"isIos");m(this,"time",0);m(this,"userData",{});m(this,"lastVelocity",0);m(this,"velocity",0);m(this,"direction",0);m(this,"options");m(this,"targetScroll");m(this,"animatedScroll");m(this,"animate",new Uu);m(this,"emitter",new Da);m(this,"dimensions");m(this,"virtualScroll");m(this,"onScrollEnd",t=>{t instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&t.stopPropagation()});m(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});m(this,"onTransitionEnd",t=>{t.propertyName?.includes("overflow")&&t.target===this.rootElement&&this.checkOverflow()});m(this,"onClick",t=>{let e=t.composedPath().filter(r=>r instanceof HTMLAnchorElement&&r.href).map(r=>new URL(r.href)),i=new URL(window.location.href);if(this.options.anchors){let r=e.find(n=>i.host===n.host&&i.pathname===n.pathname&&n.hash);if(r){let n=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,o=decodeURIComponent(r.hash);this.scrollTo(o,n);return}}if(this.options.stopInertiaOnNavigate&&e.some(r=>i.host===r.host&&i.pathname!==r.pathname)){this.reset();return}});m(this,"onPointerDown",t=>{t.button===1&&this.reset()});m(this,"onVirtualScroll",t=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(t)===!1)return;let{deltaX:e,deltaY:i,event:r}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let n=r.type.includes("touch"),o=r.type.includes("wheel");if(n&&this.isIos&&(r.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=r.type==="touchstart"||r.type==="touchmove";let a=e===0&&i===0;if(this.options.syncTouch&&n&&r.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation==="vertical"&&i===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||s)return;let l=r.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent,d=Math.abs(e)>=Math.abs(i)?"horizontal":"vertical";if(l.find(g=>g instanceof HTMLElement&&(typeof c=="function"&&c?.(g)||g.hasAttribute?.("data-lenis-prevent")||d==="vertical"&&g.hasAttribute?.("data-lenis-prevent-vertical")||d==="horizontal"&&g.hasAttribute?.("data-lenis-prevent-horizontal")||n&&g.hasAttribute?.("data-lenis-prevent-touch")||o&&g.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:i}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&n||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),r.lenisStopPropagation=!0;return}let u=i;this.options.gestureOrientation==="both"?u=Math.abs(i)>Math.abs(e)?i:e:this.options.gestureOrientation==="horizontal"&&(u=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&i>0||this.animatedScroll===this.limit&&i<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let h=n&&this.options.syncTouch,p=n&&r.type==="touchend";p&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...h?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});m(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});m(this,"raf",t=>{let e=t-(this.time||t);this.time=t,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Ba,window.lenis||(window.lenis={}),window.lenis.version=Ba,u==="horizontal"&&(window.lenis.horizontal=!0),n===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof s=="number"&&typeof l!="function"?l=Ha:typeof l=="function"&&typeof s!="number"&&(s=1),this.options={wrapper:t,content:e,eventsTarget:i,smoothWheel:r,syncTouch:n,syncTouchLerp:o,touchInertiaExponent:a,duration:s,easing:l,lerp:c,infinite:d,gestureOrientation:h,orientation:u,touchMultiplier:p,wheelMultiplier:g,autoResize:x,prevent:E,virtualScroll:f,overscroll:b,autoRaf:w,anchors:S,autoToggle:y,allowNestedScroll:k,naiveDimensions:L,stopInertiaOnNavigate:M},this.dimensions=new Wu(t,e,{autoResize:x}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Ku(i,{touchMultiplier:p,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}get overflow(){let t=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[t]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(t){this.isHorizontal?this.options.wrapper.scrollTo({left:t,behavior:"instant"}):this.options.wrapper.scrollTo({top:t,behavior:"instant"})}isTouchOnSelectionHandle(t){let e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;let i=t.targetTouches[0]??t.changedTouches[0];if(!i)return!1;let r=e.getRangeAt(0).getClientRects();if(r.length===0)return!1;let n=r[0],o=r[r.length-1],a=40,s=Math.hypot(i.clientX-n.left,i.clientY-n.top)<=a,l=Math.hypot(i.clientX-o.right,i.clientY-o.bottom)<=a;return s||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(t,{offset:e=0,immediate:i=!1,lock:r=!1,programmatic:n=!0,lerp:o=n?this.options.lerp:void 0,duration:a=n?this.options.duration:void 0,easing:s=n?this.options.easing:void 0,onStart:l,onComplete:c,force:d=!1,userData:u}={}){if((this.isStopped||this.isLocked)&&!d)return;let h=t,p=e;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let g=null;if(typeof h=="string"?(g=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),g||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&h?.nodeType&&(g=h),g){if(this.options.wrapper!==window){let S=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?S.left:S.top}let x=g.getBoundingClientRect(),E=getComputedStyle(g),f=this.isHorizontal?Number.parseFloat(E.scrollMarginLeft):Number.parseFloat(E.scrollMarginTop),b=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(b.scrollPaddingLeft):Number.parseFloat(b.scrollPaddingTop);h=(this.isHorizontal?x.left:x.top)+this.animatedScroll-(Number.isNaN(f)?0:f)-(Number.isNaN(w)?0:w)}}if(typeof h=="number"){if(h+=p,this.options.infinite){if(n){this.targetScroll=this.animatedScroll=this.scroll;let g=h-this.animatedScroll;g>this.limit/2?h-=this.limit:g<-this.limit/2&&(h+=this.limit)}}else h=Fa(0,h,this.limit);if(h===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=u??{},i){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}n||(this.targetScroll=h),typeof a=="number"&&typeof s!="function"?s=Ha:typeof s=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,h,{duration:a,easing:s,lerp:o,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(g,x)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),n&&(this.targetScroll=g),x||this.emit(),x&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(t,{deltaX:e,deltaY:i}){let r=Date.now();t._lenis||(t._lenis={});let n=t._lenis,o,a,s,l,c,d,u,h,p,g;if(r-(n.time??0)>2e3){n.time=Date.now();let k=window.getComputedStyle(t);if(n.computedStyle=k,o=["auto","overlay","scroll"].includes(k.overflowX),a=["auto","overlay","scroll"].includes(k.overflowY),c=["auto"].includes(k.overscrollBehaviorX),d=["auto"].includes(k.overscrollBehaviorY),n.hasOverflowX=o,n.hasOverflowY=a,!(o||a))return!1;u=t.scrollWidth,h=t.scrollHeight,p=t.clientWidth,g=t.clientHeight,s=u>p,l=h>g,n.isScrollableX=s,n.isScrollableY=l,n.scrollWidth=u,n.scrollHeight=h,n.clientWidth=p,n.clientHeight=g,n.hasOverscrollBehaviorX=c,n.hasOverscrollBehaviorY=d}else s=n.isScrollableX,l=n.isScrollableY,o=n.hasOverflowX,a=n.hasOverflowY,u=n.scrollWidth,h=n.scrollHeight,p=n.clientWidth,g=n.clientHeight,c=n.hasOverscrollBehaviorX,d=n.hasOverscrollBehaviorY;if(!(o&&s||a&&l))return!1;let x=Math.abs(e)>=Math.abs(i)?"horizontal":"vertical",E,f,b,w,S,y;if(x==="horizontal")E=Math.round(t.scrollLeft),f=u-p,b=e,w=o,S=s,y=c;else if(x==="vertical")E=Math.round(t.scrollTop),f=h-g,b=i,w=a,S=l,y=d;else return!1;return!y&&(E>=f||E<=0)?!0:(b>0?E<f:E>0)&&w&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let t=this.options.wrapper;return this.isHorizontal?t.scrollX??t.scrollLeft:t.scrollY??t.scrollTop}get scroll(){return this.options.infinite?Du(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(t){this._isScrolling!==t&&(this._isScrolling=t,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(t){this._isStopped!==t&&(this._isStopped=t,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(t){this._isLocked!==t&&(this._isLocked=t,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let t="lenis";return this.options.autoToggle&&(t+=" lenis-autoToggle"),this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isScrolling==="smooth"&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(t=>{this.rootElement.classList.add(t)})}cleanUpClassName(){for(let t of Array.from(this.rootElement.classList))(t==="lenis"||t.startsWith("lenis-"))&&this.rootElement.classList.remove(t)}};var ne="liquid-lyrics:settings",ja="liquid-lyrics-settings",Wa="liquid-lyrics-bg-image",ui={spotifyLyricsButton:"hide",showOwnButton:!0,showTitle:!0,showHeaderLinks:!0,autoHideUi:!0,autoHideDelay:3,autoHideCursor:!0,fontScale:100,fadeTop:11,fadeBottom:18,smoothScroll:!0,smoothScrollDuration:12,simpleLyrics:!1,minimalLyrics:!1,noLyricsView:"message",bgMode:"kawarp",bgSource:"albumArt",bgUrl:"",bgColor:"#101418",bgScale:100,bgBlur:20,bgSaturation:150,bgBrightness:60,bgContrast:100,bgOpacity:100,bgRotationSpeed:100,bgWarpIntensity:50,cardStyle:"default",cardRadius:20,cardCoverRadius:20,cardSide:"left",cardCenterText:!0,cardHideTitle:!1,cardHideArtist:!1,cardHideAlbum:!1,pageShowCredits:!0,pageHideScrollbar:!1,pageShowControls:!0,pageControlPosition:"bottom",fsShowCredits:!0,fsHideScrollbar:!1,fsShowControls:!0,fsControlPosition:"bottom",fsFadeTitle:!1,fsFadeArtist:!1,fsFadeAlbum:!1,npvBackground:!0,npvShowCard:!0,npvCardHeight:25,npvCardMinHeight:320},Cr={autoHideDelay:{min:1,max:30,step:1},fontScale:{min:50,max:200,step:5},fadeTop:{min:0,max:45,step:1},fadeBottom:{min:0,max:45,step:1},smoothScrollDuration:{min:2,max:30,step:1},bgScale:{min:10,max:400,step:5},bgBlur:{min:0,max:150,step:1},bgSaturation:{min:0,max:500,step:10},bgBrightness:{min:0,max:200,step:5},bgContrast:{min:0,max:300,step:5},bgOpacity:{min:0,max:100,step:5},bgRotationSpeed:{min:0,max:400,step:10},bgWarpIntensity:{min:0,max:100,step:5},cardRadius:{min:0,max:48,step:1},cardCoverRadius:{min:0,max:48,step:1},npvCardHeight:{min:20,max:100,step:5},npvCardMinHeight:{min:100,max:1200,step:20}},Tt=null;function C(){return Tt||(Tt={...ui,...Xu()},Tt)}function V(t,e){let i={...C(),[t]:e};_r(i)}function Va(){_r({...ui})}var $u={transparent:0,color:0,image:0,animated:51,kawarp:20},Gu={transparent:100,color:100,image:100,animated:100,kawarp:150};function qr(t){let e=C();if(e.bgMode===t)return;Et=t==="transparent"&&e.bgMode!=="transparent"?e.bgMode:Et,_r({...e,bgMode:t,bgBlur:$u[t],bgSaturation:Gu[t]})}var Et="kawarp";function Ka(){let t=C().bgMode;qr(t==="transparent"?Et:"transparent")}function $a(){return C().bgMode!=="transparent"}function Ga(){return Et==="transparent"?"kawarp":Et}function Ar(){try{return localStorage.getItem(Wa)||""}catch{return""}}function Yu(t){try{localStorage.setItem(Wa,t)}catch{return!1}return pi(),window.dispatchEvent(new Event(ne)),!0}function hi(t,e){let i=C(),r=e??i.bgMode;return r==="color"||r==="transparent"?"":i.bgSource==="url"?i.bgUrl.trim():i.bgSource==="upload"?Ar():t}async function Ya(t){let e=await new Promise((c,d)=>{let u=new FileReader;u.onload=()=>c(String(u.result||"")),u.onerror=d,u.readAsDataURL(t)}),i=await new Promise((c,d)=>{let u=new Image;u.onload=()=>c(u),u.onerror=d,u.src=e}),n=Math.min(1,1600/Math.max(i.width,i.height)),o=Math.max(1,Math.round(i.width*n)),a=Math.max(1,Math.round(i.height*n)),s=document.createElement("canvas");s.width=o,s.height=a;let l=s.getContext("2d");if(!l)return!1;l.drawImage(i,0,0,o,a);for(let c of[.92,.85,.7,.5,.35])if(Yu(s.toDataURL("image/jpeg",c)))return!0;return!1}function pi(){let t=C(),e=document.documentElement,i=(r,n)=>e.style.setProperty(r,n);i("--ll-font-scale",String(A(t.fontScale,50,200)/100*1.2)),i("--ll-fade-top",`${A(t.fadeTop,0,45)}%`),i("--ll-fade-bottom",`${A(t.fadeBottom,0,45)}%`),i("--ll-bg-color",t.bgColor),i("--ll-bg-scale",String(A(t.bgScale,10,400)/100)),i("--ll-bg-opacity",String(A(t.bgOpacity,0,100)/100)),i("--ll-bg-spin-duration",t.bgRotationSpeed<=0?"0s":`${Math.round(3e4/(t.bgRotationSpeed/100))}ms`),i("--ll-bg-backdrop-blur",`${A(t.bgBlur,0,150)}px`),i("--ll-bg-filter",[`blur(${A(t.bgBlur,0,150)}px)`,`saturate(${A(t.bgSaturation,0,500)}%)`,`brightness(${A(t.bgBrightness,0,200)}%)`,`contrast(${A(t.bgContrast,0,300)}%)`].join(" ")),i("--ll-bg-canvas-filter",`brightness(${A(t.bgBrightness,0,200)}%) contrast(${A(t.bgContrast,0,300)}%)`),i("--ll-card-radius",`${A(t.cardRadius,0,48)}px`),i("--ll-card-cover-radius",`${A(t.cardCoverRadius,0,48)}px`),i("--ll-npv-card-height",`${A(t.npvCardHeight,20,100)}vh`),i("--ll-npv-card-min-height",`${A(t.npvCardMinHeight,100,1200)}px`),e.classList.toggle("ll-hide-own-button",!t.showOwnButton),e.classList.toggle("ll-hide-spotify-lyrics-button",t.spotifyLyricsButton==="hide"),e.classList.toggle("ll-hide-title",!t.showTitle),e.classList.toggle("ll-hide-header-links",!t.showHeaderLinks),e.classList.toggle("ll-npv-background",t.npvBackground),e.classList.toggle("ll-npv-hide-card",!t.npvShowCard),e.classList.toggle("ll-simple-lyrics",t.simpleLyrics),e.classList.toggle("ll-minimal-lyrics",t.minimalLyrics)}function _r(t){Tt=t;try{localStorage.setItem(ja,JSON.stringify(t))}catch{}pi(),window.dispatchEvent(new Event(ne))}function Xu(){let t=null;try{t=localStorage.getItem(ja)}catch{return{}}if(!t)return{};let e;try{e=JSON.parse(t)}catch{return{}}if(!e||typeof e!="object")return{};let i=e,r={};for(let n of Object.keys(ui)){let o=i[n],a=ui[n];if(typeof a=="boolean"){typeof o=="boolean"&&(r[n]=o);continue}if(typeof a=="number"){let s=Cr[n];typeof o=="number"&&Number.isFinite(o)&&s&&(r[n]=A(Math.round(o),s.min,s.max));continue}typeof o=="string"&&Zu(n,o)&&(r[n]=o)}return r}var Ju={spotifyLyricsButton:["keep","hide","override"],bgMode:["transparent","color","image","animated","kawarp"],bgSource:["albumArt","url","upload"],cardStyle:["default","cover"],cardSide:["left","right"],pageControlPosition:["bottom","top","left","right"],fsControlPosition:["bottom","top","left","right"]};function Zu(t,e){let i=Ju[t];return i?i.includes(e):e.length<=2048}function A(t,e,i){return Math.min(i,Math.max(e,t))}var ot=class{constructor(e,i=!1,r=!0){this.scroller=e;this.alwaysOn=i;this.allowed=r;this.lenis=null;this.frame=0;this.enabled=!1;this.draggingScrollbar=!1;this.onPointerDown=e=>{if(!this.lenis)return;let i=this.scroller.offsetWidth-this.scroller.clientWidth;if(i<=0)return;let r=this.scroller.getBoundingClientRect();if(e.clientX<r.right-i)return;this.draggingScrollbar=!0,this.lenis.stop();let n=()=>{window.removeEventListener("pointerup",n),window.removeEventListener("pointercancel",n),this.draggingScrollbar=!1,this.lenis?.scrollTo(this.scroller.scrollTop,{immediate:!0}),this.lenis?.start()};window.addEventListener("pointerup",n),window.addEventListener("pointercancel",n)};this.scroller.addEventListener("pointerdown",this.onPointerDown,!0)}sync(){let e=this.allowed&&(this.alwaysOn||C().smoothScroll);if(e===this.enabled){this.lenis&&(this.lenis.options.duration=this.duration());return}this.enabled=e,e?this.start():this.stop()}scrollTo(e,i="smooth"){if(!this.draggingScrollbar){if(!this.lenis||i!=="smooth"){this.lenis?this.lenis.scrollTo(e,{immediate:!0}):this.scroller.scrollTo({top:e,behavior:i});return}this.lenis.scrollTo(e,{duration:this.duration()})}}get isScrolling(){return!!this.lenis?.isScrolling}refresh(){this.lenis?.resize()}destroy(){this.scroller.removeEventListener("pointerdown",this.onPointerDown,!0),this.stop()}duration(){return A(C().smoothScrollDuration,2,30)/10}start(){if(this.lenis)return;try{this.lenis=new Ua({wrapper:this.scroller,content:this.scroller.firstElementChild??this.scroller,duration:this.duration(),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,syncTouch:!1,naiveDimensions:!0})}catch(i){console.warn("[Liquid Lyrics] Smooth scrolling unavailable, using native scrolling.",i),this.lenis=null,this.enabled=!1;return}let e=i=>{this.lenis?.raf(i),this.frame=requestAnimationFrame(e)};this.frame=requestAnimationFrame(e)}stop(){this.frame&&(cancelAnimationFrame(this.frame),this.frame=0),this.lenis?.destroy(),this.lenis=null}};var Xa=900,Qu=.92,eh=5e3,th=180,Ja=1100,Rr=.75,ih=8,I=-999,Le=class{constructor(e){this.records=[];this.recordByEl=new Map;this.outgoingLines=[];this.activeIndex=I;this.lastProgress=NaN;this.hasTimeline=!1;this.enabled=!1;this.romanMode="off";this.songLang=null;this.unsubscribeClock=null;this.virtual=null;this.userScrolling=!1;this.lastAutoScrollTop=-1;this.userScrollTimeout=null;this.scrollDelayTimeout=null;this.generation=0;this.hasRomanizationValue=!1;this.simpleLyrics=!1;this.minimalLyrics=!1;this.tick=(e,i)=>{if(e===this.lastProgress)return;this.lastProgress=e;let r=this.findActiveIndex(e);r!==this.activeIndex&&(this.applyPosition(r,e),this.activeIndex=r),r>=0&&(this.virtual&&this.mountAround(r),this.updateActiveLine(this.records[r],e)),this.outgoingLines.length>0&&this.updateOutgoingLines(e)};this.onSettingsChange=()=>{this.smooth.sync(),this.readLyricsModes(),this.smooth.refresh()};this.onUserScroll=()=>{this.smooth.isScrolling||(this.userScrolling=!0,this.userScrollTimeout&&clearTimeout(this.userScrollTimeout),this.userScrollTimeout=setTimeout(()=>{this.userScrolling=!1},eh))};this.onContainerClick=e=>{let i=e.target?.closest(".liquid-lyrics-line");if(!i)return;let r=this.recordByEl.get(i);!r||!Number.isFinite(r.start)||(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),ke(r.start),this.forceSync(),this.scrollToRecord(r))};this.container=e.container,this.scroller=e.scroller??e.container,this.options={virtualize:!1,renderBackgrounds:!1,dotLiftPx:12,...e},this.smooth=new ot(this.scroller),this.smooth.sync(),this.readLyricsModes(),window.addEventListener(ne,this.onSettingsChange),this.scroller.addEventListener("click",this.onContainerClick),this.scroller.addEventListener("wheel",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("touchstart",this.onUserScroll,{passive:!0}),this.scroller.addEventListener("pointerdown",i=>{(i.pointerType==="mouse"||i.pointerType==="touch")&&this.onUserScroll()},{passive:!0})}get hasRomanization(){return this.hasRomanizationValue}get hasJapanese(){return this.songLang==="ja"}get hasLyrics(){return this.records.length>0}setLyrics(e){if(this.clear(),!e)return;let i=La(e);if(i.length===0)return;let r=this.options.virtualize&&i.some(n=>n.kind==="syllable");if(this.records=i.map((n,o)=>this.buildLineRecord(n,o)),this.records.forEach(n=>this.recordByEl.set(n.el,n)),this.hasTimeline=this.records.some(n=>Number.isFinite(n.start)),this.songLang=ua(i.map(n=>n.kind==="interlude"?"":n.text)),r)this.initVirtualizer();else{let n=document.createDocumentFragment();this.records.forEach(o=>n.appendChild(o.el)),this.container.appendChild(n)}this.appendCredits(e),this.resetScroll(),this.syncClock(),this.forceSync(),requestAnimationFrame(()=>this.smooth.refresh())}appendCredits(e){let i=Ea(e);if(!i)return;let r=document.createElement("div");if(r.className="liquid-lyrics-credits",i.writers.length>0){let n=document.createElement("div");n.className="ll-credits-writers",n.textContent=`Written by ${i.writers.join(", ")}`,r.appendChild(n)}if(i.source){let n=document.createElement("div");n.className="ll-credits-source",n.textContent=i.source,r.appendChild(n)}this.container.appendChild(r)}clear(){this.generation++,this.container.classList.remove("ll-settling"),this.stopClock(),this.destroyVirtualizer(),this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),this.records=[],this.recordByEl.clear(),this.outgoingLines=[],this.activeIndex=I,this.lastProgress=NaN,this.lastAutoScrollTop=-1,this.hasTimeline=!1,this.hasRomanizationValue=!1,this.songLang=null,this.container.replaceChildren()}setEnabled(e){this.enabled!==e&&(this.enabled=e,this.syncClock(),e&&(this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),this.smooth.refresh(),this.forceSync(),this.settleScroll("auto"),this.recenterAfterLayout()))}recenterAfterLayout(){let e=this.generation;this.container.classList.add("ll-settling");let i=()=>e!==this.generation||!this.enabled||this.userScrolling||this.activeIndex<0&&this.hasTimeline?!1:(this.smooth.refresh(),this.settleScroll("auto"),!0),r=()=>this.container.classList.remove("ll-settling");requestAnimationFrame(()=>{i(),window.setTimeout(()=>{i(),r()},120)}),window.setTimeout(r,400)}setRomanized(e,i){this.romanMode=e;let r=[],n=!1;for(let o of this.records){let a=o.line;if(a.kind==="interlude"||!a.text)continue;let s=a.text,l=we(s),c=ai(a.romanizedText);n||(n=l||!!c);let d=this.getLineLanguage(s)==="ja";if(a.kind==="line"||a.kind==="static"){if(e==="romaji"){let u=typeof o.localLineRoman=="string"?o.localLineRoman:"",h=c||u;h?this.setLineContent(o,`t:${h}`,h):(this.setLineContent(o,`t:${s}`,s),i&&l&&o.localLineRoman!==!1&&r.push(o))}else e==="furigana"&&d?typeof o.lineFurigana=="string"&&o.lineFurigana?this.setLineHtml(o,o.lineFurigana,s):(this.setLineContent(o,`t:${s}`,s),i&&o.lineFurigana!==!1&&r.push(o)):this.setLineContent(o,`t:${s}`,s);continue}if(!l){this.applyWordRomanization(o,e==="romaji");continue}e==="romaji"?Array.isArray(o.localWordRoman)?this.applyLocalWordRomanization(o):(this.restoreOriginalWords(o),i&&o.localWordRoman!==!1&&r.push(o)):e==="furigana"&&d?Array.isArray(o.wordFurigana)?this.applyWordFurigana(o):(this.restoreOriginalWords(o),i&&o.wordFurigana!==!1&&r.push(o)):this.restoreOriginalWords(o)}this.hasRomanizationValue=n,this.options.onRomanizationAvailability?.(n),r.length>0&&this.processLocalRomanization(r,e)}destroy(){this.clear(),this.scroller.removeEventListener("click",this.onContainerClick),this.scroller.removeEventListener("wheel",this.onUserScroll),this.scroller.removeEventListener("touchstart",this.onUserScroll),window.removeEventListener(ne,this.onSettingsChange),this.smooth.destroy(),this.userScrollTimeout&&clearTimeout(this.userScrollTimeout)}buildLineRecord(e,i){let r=e.kind!=="static",n=this.options.variant==="sidebar"&&(e.kind==="line"||e.kind==="syllable"),o=document.createElement(n?"button":"div");o instanceof HTMLButtonElement&&(o.type="button"),o.className="liquid-lyrics-line";let a={index:i,el:o,line:e,start:r?e.range.start:Number.POSITIVE_INFINITY,end:r?e.range.end:Number.POSITIVE_INFINITY,state:"idle",dirty:!1,outgoing:!1,glow:!1,leadEl:null,words:[],bgWords:[],dots:[],dotLift:[],progressUnit:I,interludeVis:I,interludeY:I,interludeScale:I,displayText:e.kind==="interlude"?"":e.text,displayKey:"orig",localWordRoman:null,wordFurigana:null,localLineRoman:null,lineFurigana:null,wrapper:null,height:0,rowOffset:I};if(e.kind==="interlude"){o.classList.add("liquid-lyrics-interlude"),this.options.variant==="sidebar"&&o.setAttribute("aria-hidden","true");for(let s=0;s<3;s++){let l=document.createElement("span");l.className="ll-interlude-dot",o.appendChild(l),a.dots.push(l),a.dotLift.push(0)}}else if(e.kind==="static")o.classList.add("liquid-lyrics-static"),o.textContent=e.text;else if(e.kind==="line")o.textContent=e.text;else{o.classList.add("ll-syllable-line");let s=document.createElement("div");s.className="ll-vocal-line ll-lead-vocal",o.appendChild(s),a.leadEl=s;let l=this.buildWordSpans(s,e.lead.words,"");if(this.options.renderBackgrounds)for(let c of e.backgrounds){let d=document.createElement("div");d.className="ll-vocal-line ll-background-vocal",o.appendChild(d),a.bgWords.push(...this.buildWordSpans(d,c.words,"ll-bg-syllable"))}a.words=Za(l,a.bgWords)}return a}buildWordSpans(e,i,r){let n=[];return i.forEach((o,a)=>{let s=document.createElement("span");s.className=r?`ll-syllable ${r}`:"ll-syllable",o.animateLetters&&s.classList.add("ll-long-syllable"),we(o.text)&&s.classList.add("ll-cjk-syllable"),a===i.length-1&&s.classList.add("LastWordInLine");let l=[];if(o.rubyHtml)s.classList.add("ll-ruby-syllable"),s.setAttribute("aria-label",o.text),s.innerHTML=o.rubyHtml;else if(o.animateLetters){s.setAttribute("aria-label",o.text);for(let c of o.text){let d=document.createElement("span");d.className="ll-letter",d.textContent=c,s.appendChild(d),l.push(d)}}else s.textContent=o.text;e.appendChild(s),n.push({el:s,start:o.start,end:o.end,animateLetters:o.animateLetters,letters:l,state:"idle",gradientUnit:I,lastLift:0,letterFill:null,letterLift:null})}),n}syncClock(){let e=this.enabled&&this.hasTimeline&&this.records.length>0;e&&!this.unsubscribeClock?this.unsubscribeClock=nt(this.tick):e||this.stopClock()}stopClock(){this.unsubscribeClock?.(),this.unsubscribeClock=null}forceSync(){!this.hasTimeline||this.records.length===0||(this.lastProgress=NaN,this.tick(xe(),performance.now()))}lastStartedIndex(e){let i=this.records,r=0,n=i.length-1,o=-1;for(;r<=n;){let a=r+n>>1;i[a].start<=e?(o=a,r=a+1):n=a-1}return o}findActiveIndex(e){let i=this.records;if(i.length===0)return-1;let r=this.lastStartedIndex(e);if(r<0)return-1;let n=Math.max(0,r-4);for(let a=r;a>=n;a--){let s=i[a];if(e>=s.start&&e<s.end)return a}if(this.activeIndex>=0&&this.activeIndex<i.length){let a=i[this.activeIndex];if(e>=a.start&&e<a.end+Xa)return this.activeIndex}let o=i[r];return o.end<=e&&e-o.end<=Xa?r:-1}applyPosition(e,i){let r=this.activeIndex,n=this.records;for(let o=0;o<n.length;o++){let a=n[o],s=a.state==="active";if(o===e){s||this.activateLine(a,i);continue}(e>=0?o<e:a.end<=i)?s&&a.line.kind!=="interlude"&&a.end>i?this.beginOutgoing(a):(a.state!=="past"||s)&&this.completeLine(a,s):(a.state!=="future"||s)&&this.resetLine(a)}if(e>=0&&!this.userScrolling){let o=r>=0?n[r]:null,a=n[e];this.scrollDelayTimeout&&(clearTimeout(this.scrollDelayTimeout),this.scrollDelayTimeout=null),o?.line.kind==="interlude"?this.scrollDelayTimeout=setTimeout(()=>{this.scrollDelayTimeout=null,this.activeIndex===e&&this.scrollToRecord(a)},th):this.scrollToRecord(a)}this.virtual&&this.scheduleVirtualUpdate()}activateLine(e,i){e.state="active",e.outgoing=!1,e.progressUnit=I,e.interludeVis=I,e.interludeY=I,e.interludeScale=I;let r=e.el.classList;if(r.remove("past","future","ll-finishing","ll-outgoing"),r.add("active"),e.line.kind==="syllable"){e.dirty=!0;for(let n of e.words)this.syncWordState(n,i)}else e.line.kind==="interlude"&&(e.dirty=!0)}beginOutgoing(e){e.state="past",e.outgoing=!0;let i=e.el.classList;i.remove("active","future","ll-finishing"),i.add("past","ll-outgoing"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.outgoingLines.includes(e)||this.outgoingLines.push(e)}updateOutgoingLines(e){for(let i=this.outgoingLines.length-1;i>=0;i--){let r=this.outgoingLines[i];if(!r.outgoing||r.state!=="past"){this.outgoingLines.splice(i,1);continue}if(e>=r.end){this.finishOutgoing(r),this.outgoingLines.splice(i,1);continue}if(e<r.start){this.outgoingLines.splice(i,1),this.resetLine(r);continue}r.line.kind==="syllable"?this.updateWords(r,e):this.writeLineProgress(r,Lr(r,e)*100)}}finishOutgoing(e){e.outgoing=!1;let i=e.el.classList;if(i.remove("ll-outgoing"),i.add("ll-finishing"),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="sung"&&this.setWordState(r,"sung")}}completeLine(e,i){e.state="past",e.outgoing=!1;let r=e.el.classList;if(r.remove("active","future","ll-outgoing"),r.add("past"),r.toggle("ll-finishing",i),e.glow&&(r.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let n of e.words)n.state!=="sung"&&this.setWordState(n,"sung");for(let n of e.dots)n.classList.add("lit"),Qa(n);e.dotLift.fill(0)}}resetLine(e){e.state="future",e.outgoing=!1;let i=e.el.classList;if(i.remove("active","past","ll-finishing","ll-outgoing"),i.add("future"),e.glow&&(i.remove("ll-glow"),e.glow=!1),this.clearLineInline(e),!!e.dirty){e.dirty=!1;for(let r of e.words)r.state!=="future"&&this.setWordState(r,"future");for(let r of e.dots)r.classList.remove("lit"),Qa(r);e.dotLift.fill(0)}}clearLineInline(e){let i=e.el.style;e.progressUnit!==I&&(i.removeProperty("--line-progress"),e.progressUnit=I),e.interludeVis!==I&&(i.removeProperty("--interlude-visibility"),i.removeProperty("--interlude-y"),i.removeProperty("--interlude-scale"),e.interludeVis=I,e.interludeY=I,e.interludeScale=I)}updateActiveLine(e,i){let r=Lr(e,i);if(e.line.kind==="interlude"){this.updateInterlude(e,r);return}let n=r>Qu;n!==e.glow&&(e.glow=n,e.el.classList.toggle("ll-glow",n)),e.line.kind==="syllable"?this.updateWords(e,i):this.writeLineProgress(e,r*100)}writeLineProgress(e,i){let r=Math.round(i*2)/2;r!==e.progressUnit&&(e.progressUnit=r,e.el.style.setProperty("--line-progress",String(r)))}updateWords(e,i){for(let r of e.words){let n=i<r.start?"future":i>=r.end?"sung":"singing";n!==r.state&&this.setWordState(r,n),n==="singing"&&this.updateSingingWord(r,i)}}syncWordState(e,i){let r=i<e.start?"future":i>=e.end?"sung":"singing";r!==e.state&&this.setWordState(e,r)}setWordState(e,i){e.state=i;let r=e.el.classList;r.toggle("singing",i==="singing"),r.toggle("sung",i==="sung"),r.toggle("future",i==="future"),i!=="singing"&&this.clearWordInline(e)}clearWordInline(e){let i=e.el.style;if(e.gradientUnit!==I&&(i.removeProperty("--syl-progress"),e.gradientUnit=I),e.lastLift!==0&&(i.transform="",e.lastLift=0),!(!e.letterFill||!e.letterLift))for(let r=0;r<e.letters.length;r++){let n=e.letters[r];e.letterFill[r]!==I&&(n.style.removeProperty("--letter-progress"),e.letterFill[r]=I),e.letterLift[r]!==0&&(n.style.transform="",e.letterLift[r]=0)}}updateSingingWord(e,i){let r=he((i-e.start)/Math.max(1,e.end-e.start));if(e.animateLetters){this.updateLetters(e,r),this.minimalLyrics&&!this.simpleLyrics&&this.applyWordLift(e,r);return}let n=Math.round(-20+120*r);n!==e.gradientUnit&&(e.gradientUnit=n,e.el.style.setProperty("--syl-progress",String(n))),this.applyWordLift(e,r)}applyWordLift(e,i){if(this.simpleLyrics){e.lastLift!==0&&(e.lastLift=0,e.el.style.transform="");return}let r=Math.sin(i*Math.PI);Math.abs(r-e.lastLift)>.01&&(e.lastLift=r,e.el.style.transform=`translate3d(0, ${(-5*r).toFixed(2)}px, 0) scale(${(1+.018*r).toFixed(4)})`)}updateLetters(e,i){let r=e.letters,n=r.length;if(n===0)return;(!e.letterFill||!e.letterLift)&&(e.letterFill=new Array(n).fill(I),e.letterLift=new Array(n).fill(0));let o=Math.max(.16,1.8/n),a=i+o*rt(.7,1,i);for(let s=0;s<n;s++){let l=r[s],c=Math.round(-20+120*he(i*n-s)),d=e.letterFill[s];if((Math.abs(c-d)>=4||c!==d&&(c===100||c===-20))&&(e.letterFill[s]=c,l.style.setProperty("--letter-progress",String(c))),this.simpleLyrics||this.minimalLyrics){e.letterLift[s]!==0&&(e.letterLift[s]=0,l.style.transform="");continue}let u=1-he(Math.abs(a-(s+.5)/n)/o),h=u<=0?0:rt(0,1,u);Math.abs(h-e.letterLift[s])>.008&&(e.letterLift[s]=h,l.style.transform=h===0?"":`translate3d(0, ${(-5.5*h).toFixed(2)}px, 0) scale(${(1+.02*h).toFixed(4)})`)}}updateInterlude(e,i){let r=rt(0,.22,i),n=1-rt(.99,1,i),o=Math.round(Math.min(r,n)*200)/200,a=Math.round(-24*rt(.76,1,i)*10)/10,s=Math.round((.72+.28*r)*500)/500,l=e.el.style;o!==e.interludeVis&&(e.interludeVis=o,l.setProperty("--interlude-visibility",String(o))),a!==e.interludeY&&(e.interludeY=a,l.setProperty("--interlude-y",`${a}px`)),s!==e.interludeScale&&(e.interludeScale=s,l.setProperty("--interlude-scale",String(s)));let c=this.options.dotLiftPx;for(let d=0;d<e.dots.length;d++){let u=e.dots[d],h=d/3,p=(d+1)/3;u.classList.toggle("lit",i>=h),u.style.opacity=i>=.99?String(n):"";let g=0;i>=h&&i<p&&(g=Math.sin((i-h)/(p-h)*Math.PI)*c),(Math.abs(g-e.dotLift[d])>.1||g===0&&e.dotLift[d]!==0)&&(e.dotLift[d]=g,u.style.transform=g===0?"":`translateY(${(-g).toFixed(2)}px)`)}}settleScroll(e="auto"){let i=this.activeIndex>=0?this.records[this.activeIndex]:null;i?this.scrollToRecord(i,e):this.hasTimeline||this.smooth.scrollTo(0,e)}scrollToRecord(e,i="smooth"){let r=this.scroller,n,o;if(this.virtual)this.mountAround(e.index),n=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),o=this.virtual.heights[e.index]??e.el.offsetHeight;else{if(!e.el.isConnected)return;n=rh(e.el,r),o=e.el.offsetHeight}let a=Math.max(0,n-r.clientHeight/2+o/2);this.lastAutoScrollTop=a,this.smooth.scrollTo(a,i)}reanchorActiveLine(){if(!this.virtual||!this.enabled||this.userScrolling)return;let e=this.activeIndex>=0?this.records[this.activeIndex]:null;if(!e)return;let i=this.virtual.space.offsetTop+(this.virtual.offsets[e.index]??0),r=this.virtual.heights[e.index]??e.el.offsetHeight,n=Math.max(0,i-this.scroller.clientHeight/2+r/2);Math.abs(n-this.lastAutoScrollTop)<2||(this.lastAutoScrollTop=n,this.smooth.scrollTo(n,"smooth"))}recenter(e="auto"){this.smooth.refresh();let i=this.activeIndex>=0?this.records[this.activeIndex]:null;i&&this.scrollToRecord(i,e)}resetScroll(){this.userScrolling=!1,this.userScrollTimeout&&(clearTimeout(this.userScrollTimeout),this.userScrollTimeout=null),this.lastAutoScrollTop=0,this.scroller.scrollTop=0,this.smooth.refresh(),this.smooth.scrollTo(0,"auto")}readLyricsModes(){let e=C();this.simpleLyrics=e.simpleLyrics,this.minimalLyrics=e.minimalLyrics}setLineContent(e,i,r){e.displayKey!==i&&(e.displayKey=i,e.displayText=r,e.el.textContent=r,this.refreshVirtualHeight(e))}setLineHtml(e,i,r){let n=`h:${i}`;e.displayKey!==n&&(e.displayKey=n,e.displayText=r,e.el.innerHTML=i,this.refreshVirtualHeight(e))}getLineLanguage(e){return kr(e)?"ja":Sr(e)?"ko":ii(e)?this.songLang==="ja"?"ja":"zh":null}applyLocalWordRomanization(e){if(e.line.kind!=="syllable"||!Array.isArray(e.localWordRoman))return;let i=e.localWordRoman,r=e.line.lead.words.map((n,o)=>{let a=i[o]||n.text;return a===n.text?n:{...n,text:a,animateLetters:oi(a,n.start,n.end)}});this.rebuildLead(e,r,"local-roman",!0)}applyWordFurigana(e){if(e.line.kind!=="syllable"||!Array.isArray(e.wordFurigana))return;let i=e.wordFurigana,r=!1,n=e.line.lead.words.map((o,a)=>{let s=i[a];return s?(r=!0,{...o,rubyHtml:s,animateLetters:!1}):o});if(!r){this.restoreOriginalWords(e);return}this.rebuildLead(e,n,"furigana",!1)}async processLocalRomanization(e,i){let r=this.generation;for(let n of e){if(r!==this.generation||this.romanMode!==i)return;let o=n.line;if(o.kind==="interlude")continue;let a=this.getLineLanguage(o.text);if(o.kind==="syllable"){let s=o.lead.words.map(l=>l.text);if(i==="romaji"){let l=a?await ha(s,a):null;if(r!==this.generation)return;n.localWordRoman=l??!1,this.romanMode==="romaji"&&l&&this.applyLocalWordRomanization(n)}else if(i==="furigana"){let l=await fa(s);if(r!==this.generation)return;n.wordFurigana=l??!1,this.romanMode==="furigana"&&l&&this.applyWordFurigana(n)}}else if(i==="romaji"){let s=a?await pa(o.text,a):null;if(r!==this.generation)return;n.localLineRoman=s||!1,this.romanMode==="romaji"&&s&&this.setLineContent(n,`t:${s}`,s)}else if(i==="furigana"){let s=await ga(o.text);if(r!==this.generation)return;n.lineFurigana=s||!1,this.romanMode==="furigana"&&s&&this.setLineHtml(n,s,o.text)}if(await new Promise(s=>requestAnimationFrame(()=>s())),r!==this.generation)return}}applyWordRomanization(e,i){if(e.line.kind!=="syllable")return;let r=!1,n=e.line.lead.words.map(o=>{let a=i?ai(o.romanizedText):"";return!a||a===o.text?o:(r=!0,{...o,text:a,animateLetters:oi(a,o.start,o.end)})});this.rebuildLead(e,n,r?"roman-words":"orig",!1)}restoreOriginalWords(e){e.line.kind==="syllable"&&this.rebuildLead(e,e.line.lead.words,"orig",!1)}rebuildLead(e,i,r,n){if(e.displayKey===r||!e.leadEl)return;e.displayKey=r,e.el.classList.toggle("ll-context-romanized",n),e.leadEl.replaceChildren();let o=this.buildWordSpans(e.leadEl,i,"");if(e.words=Za(o,e.bgWords),e.displayText=i.map(a=>a.text).join(" ").trim(),e.state==="active"){e.dirty=!0;let a=xe();for(let s of e.words)this.syncWordState(s,a)}else if(e.state==="past")for(let a of o)this.setWordState(a,"sung");this.refreshVirtualHeight(e)}initVirtualizer(){let e=document.createElement("div");e.className="ll-syllable-virtual-space",this.container.appendChild(e),this.container.classList.add("ll-syllable-virtualized");let i=new Map;this.records.forEach(n=>{let o=document.createElement("div");o.className="ll-syllable-virtual-row",o.appendChild(n.el),n.wrapper=o,n.height=es(n),i.set(n.el,n.index)});let r={space:e,heights:this.records.map(n=>n.height),offsets:[],mounted:new Set,lineToIndex:i,resizeObserver:new ResizeObserver(n=>{let o=!1;for(let a of n){let s=i.get(a.target);if(s===void 0)continue;let l=Math.max(1,a.borderBoxSize?.[0]?.blockSize??a.target.offsetHeight);Math.abs((r.heights[s]??0)-l)<Rr||(r.heights[s]=l,o=!0)}o&&(this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}),viewportObserver:new ResizeObserver(()=>this.scheduleVirtualUpdate()),raf:null,onScroll:()=>this.scheduleVirtualUpdate()};r.viewportObserver.observe(this.scroller),this.scroller.addEventListener("scroll",r.onScroll,{passive:!0}),this.virtual=r,this.recomputeVirtualOffsets(),this.scheduleVirtualUpdate()}destroyVirtualizer(){let e=this.virtual;e&&(e.raf!==null&&cancelAnimationFrame(e.raf),this.scroller.removeEventListener("scroll",e.onScroll),e.resizeObserver.disconnect(),e.viewportObserver.disconnect(),this.container.classList.remove("ll-syllable-virtualized"),this.virtual=null)}scheduleVirtualUpdate(){let e=this.virtual;!e||e.raf!==null||(e.raf=requestAnimationFrame(()=>{e.raf=null,this.updateVirtualWindow()}))}updateVirtualWindow(){let e=this.virtual;if(!e)return;let i=this.scroller.scrollTop-e.space.offsetTop,r=i-Ja,n=i+this.scroller.clientHeight+Ja,o=new Set;for(let s=0;s<this.records.length;s++){let l=e.offsets[s]??0;l+(e.heights[s]??0)>=r&&l<=n&&o.add(s)}let a=this.activeIndex>=0?this.activeIndex:this.lastStartedIndex(this.lastProgress);if(a>=0){let s=Math.max(0,a-3),l=Math.min(this.records.length-1,a+3);for(let c=s;c<=l;c++)o.add(c)}for(let s of e.mounted)!o.has(s)&&s!==this.activeIndex&&this.unmountVirtualLine(s);for(let s of o)this.mountVirtualLine(s);this.layoutMountedRows()}mountAround(e){if(!this.virtual)return;let i=Math.max(0,e-1),r=Math.min(this.records.length-1,e+1),n=!1;for(let o=i;o<=r;o++)n=this.mountVirtualLine(o)||n;n&&this.layoutMountedRows()}mountVirtualLine(e){let i=this.virtual,r=this.records[e];if(!i||!r?.wrapper||i.mounted.has(e))return!1;i.space.appendChild(r.wrapper),i.mounted.add(e),r.rowOffset=I,i.resizeObserver.observe(r.el);let n=r.el.offsetHeight;return n>0&&Math.abs((i.heights[e]??0)-n)>=Rr&&(i.heights[e]=n,this.recomputeVirtualOffsets()),!0}unmountVirtualLine(e){let i=this.virtual,r=this.records[e];!i||!r?.wrapper||!i.mounted.has(e)||(i.resizeObserver.unobserve(r.el),r.wrapper.parentElement===i.space&&i.space.removeChild(r.wrapper),i.mounted.delete(e))}recomputeVirtualOffsets(){let e=this.virtual;if(!e)return;let i=0;e.offsets=e.heights.map(r=>{let n=i;return i+=Math.max(1,r)+ih,n}),e.space.style.height=`${Math.max(1,i)}px`}layoutMountedRows(){let e=this.virtual;if(e)for(let i of e.mounted){let r=this.records[i];if(!r?.wrapper)continue;let n=Math.round(e.offsets[i]??0);n!==r.rowOffset&&(r.rowOffset=n,r.wrapper.style.transform=`translate3d(0, ${n}px, 0)`)}}refreshVirtualHeight(e){let i=this.virtual;if(!i)return;let r=e.el.isConnected?e.el.offsetHeight:0,n=r>0?r:es(e);Math.abs((i.heights[e.index]??0)-n)<Rr||(i.heights[e.index]=n,this.recomputeVirtualOffsets(),this.layoutMountedRows(),this.scheduleVirtualUpdate(),this.reanchorActiveLine())}};function Za(t,e){return e.length===0?t:[...t,...e].sort((i,r)=>i.start-r.start)}function Qa(t){t.style.transform&&(t.style.transform=""),t.style.opacity&&(t.style.opacity="")}function es(t){if(t.line.kind==="interlude")return 54;let e=Math.max(1,t.displayText.length),i=Math.max(1,Math.ceil(e/42)),r=t.line.kind==="syllable"?t.line.backgrounds.length:0;return 18+i*45+r*24}function rh(t,e){let i=0,r=t;for(;r&&r!==e;){i+=r.offsetTop;let n=r.offsetParent;r=n instanceof HTMLElement&&e.contains(n)?n:null}return i}var ts=/[぀-ヿㇰ-ㇿ㐀-䶿一-鿿豈-﫿가-힯]/,nh=/^#\s*interlude\b/i,oh=/^\[(.+)\]$/;function ah(t){let e=t.trim();return e?nh.test(e):!1}function sh(t){let e=t.trim().match(oh);if(!e)return null;let i=e[1].trim();return i.length?i:null}function lh(t){let e=t.split(/\s+/).filter(r=>r.length>0),i=[];for(let r of e){if(!ts.test(r)){i.push(r);continue}let n="";for(let o of Array.from(r))ts.test(o)?(n&&(i.push(n),n=""),i.push(o)):n+=o;n&&i.push(n)}return i}function Fe(t){return lh(t).map(e=>({text:e,start:null}))}function Mt(t){let e=[];for(let i of t.split(/\r?\n/)){let r=i.trim();if(!r)continue;if(ah(r)){e.push({kind:"interlude",start:null});continue}let n=sh(r);if(n!=null){let o=e[e.length-1];o?.kind==="lyric"&&o.backgrounds.push({text:n,tokens:Fe(n),start:null,end:null});continue}e.push({kind:"lyric",text:r,tokens:Fe(r),backgrounds:[],start:null,end:null})}return e}function is(t){let e=[];for(let i of t){if(i.kind==="interlude"){e.push("#interlude");continue}e.push(i.text);for(let r of i.backgrounds)e.push(`[${r.text}]`)}return e.join(`
`)}var ns=4500,fi=250;function pe(t,e){return{trackId:t.trackId,trackUri:t.trackUri,title:t.title,artist:t.artist,durationMs:t.durationMs,mode:e,lines:[],endMs:null,updatedAt:Date.now()}}function ch(t){let e=t.lines.map((n,o)=>({line:n,index:o})).filter(n=>n.line.start!=null).sort((n,o)=>n.line.start-o.line.start||n.index-o.index),i=e[e.length-1]?.line.start??0,r=t.endMs!=null?Math.max(t.endMs,i+fi):i+ns;return e.map((n,o)=>{let a=n.line.start,s=e[o+1]?.line.start??r,l=Math.max(s,a+fi);return{line:n.line,start:a,end:l}})}function gi(t){let e=ch(t),i=e.length===0?dh(t):t.mode==="line"?uh(t,e):hh(t,e),r=String(t.credit??"").trim();return r&&(i.LiquidLyricsCredit=r),i}function dh(t){return{Id:t.trackId,Type:"Static",SongWriters:[],Lines:t.lines.filter(e=>e.kind==="lyric").map(e=>({Text:e.kind==="lyric"?e.text:"",IsRTL:!1})).filter(e=>e.Text),Provider:"local"}}function uh(t,e){let i=e.map(({line:r,start:n,end:o})=>r.kind==="interlude"?{Type:"Interlude",Text:"\u266A",StartTime:n,EndTime:o,OppositeAligned:!1,IsRTL:!1}:{Type:"Line",Text:r.text,StartTime:n,EndTime:o,OppositeAligned:!1,IsRTL:!1});return{Id:t.trackId,Type:"Line",SongWriters:[],Content:i,StartTime:i[0]?.StartTime??0,EndTime:i[i.length-1]?.EndTime??0,Provider:"local"}}function hh(t,e){let i=e.filter(r=>ph(r.line)).map(r=>fh(r));return{Id:t.trackId,Type:"Syllable",SongWriters:[],Content:i,StartTime:i[0]?.Lead.StartTime??0,EndTime:i[i.length-1]?.Lead.EndTime??0,Provider:"local"}}function ph(t){return t.kind!=="lyric"||t.start==null||t.end==null?!1:t.tokens.length>0&&t.tokens.every(e=>e.start!=null)}function fh({line:t,start:e}){let i=t.kind==="lyric"?t.tokens:[],r=t.kind==="lyric"&&t.end!=null?t.end:e+ns,n=Math.max(r,e+fi),o={Type:"Vocal",OppositeAligned:!1,IsRTL:!1,Lead:os(i,e,n)},a=t.kind==="lyric"?t.backgrounds.filter(gh).map(s=>mh(s,e,n)):[];return a.length>0&&(o.Background=a),o}function gh(t){return t.end==null?!1:t.tokens.length>0&&t.tokens.every(e=>e.start!=null)}function mh(t,e,i){let r=t.start??t.tokens[0]?.start??e,n=Math.max(t.end??i,r+fi);return os(t.tokens,r,n)}function os(t,e,i){let r=t.length,n=t.map((o,a)=>{let s=o.start??e,l=rs(s,e,i),c=t[a+1]?.start??i,d=rs(Math.max(c,l+1),e,i);return{Text:o.text,IsPartOfWord:!1,StartTime:l,EndTime:a===r-1?i:d}});return{StartTime:e,EndTime:i,Syllables:n}}function as(t,e){return t.Type==="Static"?bh(t,e):t.Type==="Line"?yh(t,e):vh(t,e)}function bh(t,e){let i=pe(e,"line");return i.lines=(t.Lines??[]).map(r=>Ct(r.Text)).filter(Boolean).map(r=>({kind:"lyric",text:r,tokens:Fe(r),backgrounds:[],start:null,end:null})),i}function yh(t,e){let i=pe(e,"line");i.lines=(t.Content??[]).map(n=>{if(n.Type==="Interlude")return{kind:"interlude",start:ae(n.StartTime)};let o=Ct(n.Text);return{kind:"lyric",text:o,tokens:Fe(o),backgrounds:[],start:ae(n.StartTime),end:null}});let r=t.Content??[];return i.endMs=ae(r[r.length-1]?.EndTime),i}function vh(t,e){let i=pe(e,"word");i.lines=(t.Content??[]).map(n=>{let o=n.Lead?.Syllables??[],a=Ct(n.LiquidLyricsOriginalText||n.Lead?.LiquidLyricsOriginalText),s=o.map(d=>({text:Ct(d.Text),start:ae(d.StartTime)})).filter(d=>d.text.length>0),l=a||s.map(d=>d.text).join(" "),c=(n.Background??[]).map(d=>{let u=(d.Syllables??[]).map(h=>({text:Ct(h.Text),start:ae(h.StartTime)})).filter(h=>h.text.length>0);return{text:u.map(h=>h.text).join(" "),tokens:u,start:ae(d.StartTime),end:ae(d.EndTime)}});return{kind:"lyric",text:l,tokens:s,backgrounds:c,start:ae(n.Lead?.StartTime),end:ae(n.Lead?.EndTime)}});let r=t.Content??[];return i.endMs=ae(r[r.length-1]?.Lead?.EndTime),i}function mi(t){for(let e of t.lines){if(e.start==null)return!1;if(t.mode==="word"&&e.kind==="lyric"){if(e.tokens.some(i=>i.start==null)||e.end==null)return!1;for(let i of e.backgrounds)if(i.end==null||i.tokens.some(r=>r.start==null))return!1}}return t.lines.length>0}function Ct(t){return String(t??"").replace(/\s+/g," ").trim()}function ae(t){let e=Number(t);return Number.isFinite(e)?Math.max(0,e):null}function rs(t,e,i){return Math.min(Math.max(t,e),Math.max(e,i))}function ss(t,e,i){let r=pe(e,i);return r.lines=Mt(t),r}var Ir=/\[(\d{1,2}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;function ls(t,e){let i=[];for(let n of t.split(/\r?\n/)){Ir.lastIndex=0;let o=[],a;for(;(a=Ir.exec(n))!==null;)o.push(wh(a[1],a[2],a[3]));if(o.length===0)continue;let s=n.replace(Ir,"").trim();for(let l of o)i.push({time:l,text:s})}if(i.length===0)return null;i.sort((n,o)=>n.time-o.time);let r=pe(e,"line");return r.lines=i.map(n=>n.text?{kind:"lyric",text:n.text,tokens:Fe(n.text),backgrounds:[],start:n.time,end:null}:{kind:"interlude",start:n.time}),r}function wh(t,e,i){let r=Number(t)||0,n=Number(e)||0,o=i?Number(i.padEnd(3,"0").slice(0,3)):0;return r*6e4+n*1e3+o}var Or="liquid-lyrics-editor",at="liquid-lyrics:editor-visibility",Te=100,Ee=300,xh=3e3,kh=3e3,Sh=900,Lh=250,cs=500,qt=180,ds=16,_={close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M8 5.6v12.8L18.6 12 8 5.6Z" fill="currentColor" stroke="none"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M7.5 5h3v14h-3z" fill="currentColor" stroke="none"/><path d="M13.5 5h3v14h-3z" fill="currentColor" stroke="none"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',chevronRight:'<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',chevronsLeft:'<svg viewBox="0 0 24 24"><path d="m17 6-6 6 6 6"/><path d="m11 6-6 6 6 6"/></svg>',chevronsRight:'<svg viewBox="0 0 24 24"><path d="m7 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/></svg>',jump:'<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/></svg>',finish:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4.5h11l-2 3 2 3H5"/></svg>',clear:'<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 12h10l1-12"/></svg>',menu:'<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>',save:'<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7"/><path d="M8 20v-6h8v6"/></svg>',note:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor" stroke="none"/></svg>'},Hr=null;function At(){Hr??(Hr=new Fr),Hr.open()}function De(){return!!Hr?.isOpen()}var wi=class wi{constructor(){this.overlay=null;this.draft=pe(Ch(),"line");this.stage="text";this.targets=[];this.cursor=0;this.previewView=null;this.unsubscribeClock=null;this.currentRowEl=null;this.fileInput=null;this.savedSignature="";this.dragging=!1;this.prevRepeat=null;this.prevProgress=0;this.suppressLoopUntil=0;this.suppressFillUntil=0;this.confirmResolve=null;this.confirmOverlay=null;this.refs=null;this.onViewportResize=()=>this.updateControlsInset();this.onSongChangeGuard=()=>{let e=String(Spicetify.Player?.data?.item?.uri??"");e&&e!==this.draft.trackUri&&zr()};this.onTick=e=>{if(!this.refs)return;let i=Y();if(i>0&&!this.dragging&&ee()&&e>=i-Lh&&zr(),!this.dragging&&performance.now()>this.suppressLoopUntil&&i>0&&ee()&&e<this.prevProgress&&this.prevProgress>i-xh&&e<kh&&(this.seek(0),zr()),this.prevProgress=e,Th(this.refs.playBtn,ee()?_.pause:_.play),this.refs.durTime.textContent=yi(i),this.dragging||performance.now()<this.suppressFillUntil)return;let o=i>0?Math.min(1,e/i):0;this.refs.seekFill.style.transform=`scaleX(${o.toFixed(4)})`,this.refs.curTime.textContent=yi(e)};this.onKeyDown=e=>{if(!this.isOpen())return;if(this.confirmResolve){e.key==="Escape"?(e.preventDefault(),e.stopImmediatePropagation(),this.resolveConfirm(!1)):e.key==="Enter"&&(e.preventDefault(),e.stopImmediatePropagation(),this.resolveConfirm(!0));return}let i=e.target,r=i instanceof HTMLTextAreaElement||i instanceof HTMLInputElement;if(e.key==="Escape"){if(r)return;e.preventDefault(),this.requestClose();return}if(!(this.stage!=="sync"||r)){if(e.code==="AltRight"){e.preventDefault(),e.stopImmediatePropagation(),e.repeat||this.tap();return}if(wi.SYNC_KEYS.has(e.key))switch(e.preventDefault(),e.stopImmediatePropagation(),e.key){case"Backspace":this.undo();break;case"Delete":this.clearCurrent();break;case"ArrowLeft":this.nudgeCurrent(e.shiftKey?-Ee:-Te);break;case"ArrowRight":this.nudgeCurrent(e.shiftKey?Ee:Te);break;case"ArrowUp":this.cursor=Math.max(0,this.cursor-1),this.renderSyncList();break;case"ArrowDown":this.cursor=Math.min(this.targets.length-1,this.cursor+1),this.renderSyncList();break;default:break}}}}isOpen(){return this.overlay?.classList.contains("visible")??!1}async open(){let e=fs();if(!e.trackId){oe("No song playing - start a song to create a sync.");return}this.draft=await this.loadDraft(e),this.savedSignature=Br(this.draft),this.build(),this.rebuildTargets();let i=this.draft.lines.length===0?"text":mi(this.draft)?"preview":"sync";this.setStage(i),this.show()}async loadDraft(e){let i=vt(e.trackUri);if(i)return{...i.draft,durationMs:e.durationMs||i.draft.durationMs};try{let r=await Yt({id:e.trackId,uri:e.trackUri,data:{name:e.title}});if(r.status==="success"&&r.data)return as(r.data,e)}catch{}return pe(e,"line")}build(){document.getElementById(Or)?.remove();let e=document.createElement("div");e.id=Or,e.className="liquid-lyrics-editor";let i=T("div","ll-editor-glass-bg"),r=T("div","ll-editor-shell"),n=T("header","ll-editor-header"),o=T("div","ll-editor-title-group"),a=T("h2","ll-editor-title");a.textContent="Sync Editor";let s=T("div","ll-editor-song");s.textContent=`${this.draft.title} - ${this.draft.artist}`,o.append(a,s);let l=T("div","ll-editor-mode-switch"),c=["line","word"].map(M=>{let q=T("button","ll-editor-mode-btn");return q.type="button",q.dataset.mode=M,q.textContent=M==="line"?"Block":"Karaoke",q.addEventListener("click",()=>this.setMode(M)),l.appendChild(q),q}),d=T("div","ll-editor-header-actions"),u=T("div","ll-editor-menu-wrap"),h=Nr("ll-editor-icon-btn",_.menu,"More"),p=T("div","ll-editor-menu"),g=this.buildMenu(p);h.addEventListener("click",M=>{M.stopPropagation(),p.classList.toggle("open")}),u.append(h,p);let x=T("button","ll-editor-save-btn");x.type="button",x.innerHTML=`${_.save}<span class="ll-editor-btn-label">Save</span>`,x.setAttribute("aria-label","Save on this device"),z(x,"Save this sync on your device"),x.addEventListener("click",()=>this.save());let E=Nr("ll-editor-icon-btn",_.close,"Close");E.addEventListener("click",()=>this.requestClose()),d.append(u,x,E),n.append(o,l,d);let f=T("nav","ll-editor-steps"),w=[{stage:"text",label:"1 \xB7 Text"},{stage:"sync",label:"2 \xB7 Sync"},{stage:"preview",label:"3 \xB7 Preview"}].map(({stage:M,label:q})=>{let R=T("button","ll-editor-step-btn");return R.type="button",R.dataset.stage=M,R.textContent=q,R.addEventListener("click",()=>this.setStage(M)),f.appendChild(R),R}),S=T("div","ll-editor-body"),y=this.buildTransport();r.append(n,f,S,y.el);let k=T("div","liquid-lyrics-transparent-controls");k.setAttribute("aria-hidden","true");let{width:v,height:L}=hs();e.style.setProperty("--ll-transparent-controls-width",`${v}px`),e.style.setProperty("--ll-transparent-controls-height",`${L}px`),e.append(i,k,r),document.body.appendChild(e),e.addEventListener("click",()=>p.classList.remove("open")),this.overlay=e,this.refs={songLabel:s,modeButtons:c,stepButtons:w,body:S,transport:y.el,playBtn:y.playBtn,seekFill:y.fill,seekTrack:y.track,curTime:y.cur,durTime:y.dur,menu:p,deleteItem:g},this.updateModeButtons(),this.bindSeek(),this.updateControlsInset()}updateControlsInset(){let e=this.overlay,i=e?.querySelector(".ll-editor-shell"),r=e?.querySelector(".ll-editor-header");if(!e||!i||!r)return;let n=hs(),o=i.getBoundingClientRect(),s=o.top+parseFloat(getComputedStyle(i).paddingTop||"0")>=n.height+ds,l=o.right-(window.innerWidth-n.width)+ds,c=s?0:Math.max(0,Math.round(l));e.style.setProperty("--ll-editor-controls-inset",`${c}px`)}bindSeek(){let e=this.refs;if(!e)return;let i=e.seekTrack,r=o=>{let a=i.getBoundingClientRect();return Math.min(1,Math.max(0,(o.clientX-a.left)/Math.max(1,a.width)))},n=o=>{e.seekFill.style.transform=`scaleX(${o.toFixed(4)})`;let a=Y();a>0&&(e.curTime.textContent=yi(a*o))};i.addEventListener("pointerdown",o=>{o.preventDefault(),this.dragging=!0,i.setPointerCapture?.(o.pointerId),n(r(o));let a=l=>n(r(l)),s=l=>{this.dragging=!1,i.releasePointerCapture?.(l.pointerId),window.removeEventListener("pointermove",a),window.removeEventListener("pointerup",s);let c=Y();if(c>0){let d=c*r(l);this.seek(d),this.stage==="sync"&&this.moveCursorToTime(d)}};window.addEventListener("pointermove",a),window.addEventListener("pointerup",s,{once:!0})})}buildMenu(e){let i=Pr("Import file (.lrc / .txt / .json)");i.addEventListener("click",()=>this.pickFile());let r=Pr("Export as file (.json)");r.addEventListener("click",()=>this.exportFile());let n=Pr("Delete saved sync");return n.classList.add("ll-editor-menu-danger"),n.addEventListener("click",()=>void this.deleteSaved()),e.append(i,r,n),n}buildTransport(){let e=T("footer","ll-editor-transport"),i=Nr("ll-editor-play-btn",_.play,"Play/Pause");i.addEventListener("click",()=>this.togglePlayback());let r=T("span","ll-editor-time ll-editor-time-cur");r.textContent="0:00";let n=T("span","ll-editor-time ll-editor-time-dur");n.textContent="0:00";let o=T("div","ll-editor-seek-track"),a=T("div","ll-editor-seek-bar"),s=T("div","ll-editor-seek-fill");return a.appendChild(s),o.appendChild(a),e.append(i,r,o,n),{el:e,playBtn:i,track:o,fill:s,cur:r,dur:n}}show(){if(this.overlay){this.overlay.classList.add("visible"),window.addEventListener("resize",this.onViewportResize),this.updateControlsInset(),window.addEventListener("keydown",this.onKeyDown,!0);try{Spicetify.Player?.addEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat=Mh(),ps(2),this.prevProgress=0,this.unsubscribeClock??(this.unsubscribeClock=nt(this.onTick)),window.dispatchEvent(new Event(at))}}close(){window.removeEventListener("keydown",this.onKeyDown,!0),window.removeEventListener("resize",this.onViewportResize);try{Spicetify.Player?.removeEventListener?.("songchange",this.onSongChangeGuard)}catch{}this.prevRepeat!=null&&ps(this.prevRepeat),this.prevRepeat=null,this.unsubscribeClock?.(),this.unsubscribeClock=null,this.previewView?.destroy(),this.previewView=null,this.overlay?.classList.remove("visible"),this.overlay?.remove(),this.overlay=null,this.refs=null,window.dispatchEvent(new Event(at))}async requestClose(){this.confirmResolve||this.isDirty()&&!await this.showConfirm({title:"Discard changes?",message:"You have unsaved changes. Closing the editor will lose them.",confirm:"Discard",cancel:"Keep editing",danger:!0})||this.close()}togglePlayback(){if(!ee()){let e=Y();e>0&&xe()>=e-500&&this.seek(0)}ys()}seek(e){let i=performance.now();if(this.suppressLoopUntil=i+Sh,this.suppressFillUntil=i+320,this.refs){let r=Y(),n=r>0?Math.min(1,Math.max(0,e/r)):0;this.refs.seekFill.style.transform=`scaleX(${n.toFixed(4)})`,this.refs.curTime.textContent=yi(e)}ke(e)}isDirty(){return Br(this.draft)!==this.savedSignature}showConfirm(e){return new Promise(i=>{let r=T("div","ll-editor-confirm"),n=T("div","ll-editor-confirm-dialog"),o=T("h3","ll-editor-confirm-title");o.textContent=e.title;let a=T("p","ll-editor-confirm-message");a.textContent=e.message;let s=T("div","ll-editor-confirm-actions"),l=T("button","ll-editor-confirm-btn ll-editor-confirm-cancel");l.type="button",l.textContent=e.cancel;let c=T("button","ll-editor-confirm-btn ll-editor-confirm-accept");c.type="button",c.textContent=e.confirm,c.classList.toggle("ll-editor-confirm-danger",!!e.danger),s.append(l,c),n.append(o,a,s),r.appendChild(n),document.body.appendChild(r),requestAnimationFrame(()=>r.classList.add("visible")),l.addEventListener("click",()=>this.resolveConfirm(!1)),c.addEventListener("click",()=>this.resolveConfirm(!0)),r.addEventListener("click",d=>{d.target===r&&this.resolveConfirm(!1)}),this.confirmOverlay=r,this.confirmResolve=i,c.focus()})}resolveConfirm(e){let i=this.confirmResolve,r=this.confirmOverlay;this.confirmResolve=null,this.confirmOverlay=null,r&&(r.classList.remove("visible"),setTimeout(()=>r.remove(),200)),i?.(e)}setStage(e){this.stage==="text"&&e!=="text"&&this.commitText(),this.stage=e,this.refs?.stepButtons.forEach(i=>i.classList.toggle("active",i.dataset.stage===e)),this.previewView&&this.previewView.setEnabled(e==="preview"),this.refs&&(this.refs.body.replaceChildren(),e==="text"?this.renderTextStage():e==="sync"?this.renderSyncStage():this.renderPreviewStage())}setMode(e){this.draft.mode!==e&&(this.draft.mode=e,this.updateModeButtons(),this.rebuildTargets(),this.stage==="sync"?(this.refs?.body.replaceChildren(),this.renderSyncStage()):this.stage==="preview"&&this.refreshPreview())}updateModeButtons(){this.refs?.modeButtons.forEach(e=>e.classList.toggle("active",e.dataset.mode===this.draft.mode))}renderTextStage(){if(!this.refs)return;let e=T("div","ll-editor-text-stage"),i=T("div","ll-editor-hint");i.innerHTML="One line per lyric line. Blank line = separator. Put <b>#interlude</b> on its own line to add an instrumental interlude. Wrap a line in <b>[ ]</b> to make it a background sub-lyric of the line above (karaoke). Long pauses are detected as interludes automatically.";let r=T("textarea","ll-editor-textarea");r.spellcheck=!1,r.placeholder="Paste or type the song's lyrics here - one line per lyric line.",r.value=is(this.draft.lines),r.addEventListener("input",()=>this.updateTextStats(r.value,l));let n=T("label","ll-editor-credit-row"),o=T("span","ll-editor-credit-label");o.textContent="Credit";let a=T("input","ll-editor-credit-input");a.type="text",a.maxLength=60,a.placeholder="Optional - your name/handle, shown as \u201CSynced by \u2026\u201D under the lyrics",a.value=this.draft.credit??"",a.addEventListener("input",()=>{this.draft.credit=a.value,this.draft.updatedAt=Date.now()}),n.append(o,a);let s=T("div","ll-editor-text-footer"),l=T("div","ll-editor-text-stats"),c=T("button","ll-editor-primary-btn");c.type="button",c.textContent="Continue to sync \u2192",c.addEventListener("click",()=>this.setStage("sync")),s.append(l,c),e.append(i,r,n,s),this.refs.body.appendChild(e),this.updateTextStats(r.value,l),r.focus()}updateTextStats(e,i){let r=Mt(e),n=r.filter(a=>a.kind==="lyric").length,o=r.filter(a=>a.kind==="interlude").length;i.textContent=`${n} lines \xB7 ${o} interludes`}commitText(){let e=this.overlay?.querySelector(".ll-editor-textarea");if(!e)return;let i=Mt(e.value);this.draft.lines=_h(this.draft.lines,i),this.draft.updatedAt=Date.now(),this.rebuildTargets()}renderSyncStage(){if(!this.refs)return;let e=T("div","ll-editor-sync-stage"),i=T("div","ll-editor-sync-bar"),r=T("button","ll-editor-tap-btn");r.type="button",r.innerHTML="<b>Set cue</b><span>Right Alt</span>",r.addEventListener("click",()=>this.tap());let n=T("div","ll-editor-sync-hint");n.innerHTML="Play and tap to the beat. <b>Right Alt</b> sets the next cue \xB7 <b>\u232B</b> back \xB7 <b>\u2190/\u2192</b> \xB1100 ms (Shift \xB1300) \xB7 <b>Del</b> clear.";let o=T("div","ll-editor-sync-status");i.append(r,n,this.buildOffsetGroup(),o);let a=T("div","ll-editor-lines");e.append(i,a),this.refs.body.appendChild(e),this.renderSyncList()}renderSyncList(e=!0){let i=this.overlay?.querySelector(".ll-editor-lines");if(!i)return;let r=e?null:i.scrollTop;i.replaceChildren(),this.currentRowEl=null;let n=this.targets[this.cursor],o=n&&n.kind!=="end"?n.lineIndex:-1;this.draft.lines.forEach((a,s)=>{let l=T("div","ll-editor-line");l.dataset.lineIndex=String(s);let c=a.kind==="interlude";l.classList.toggle("is-interlude",c),l.classList.toggle("is-synced",a.start!=null);let d=o===s&&(n?.kind==="line"||this.draft.mode==="word");n?.kind==="line"&&o===s&&(l.classList.add("is-current"),this.currentRowEl=l);let u=T("div","ll-editor-line-index");u.innerHTML=c?_.note:String(qh(this.draft.lines,s));let h=T("div","ll-editor-line-main");c?(h.textContent="Interlude",h.classList.add("ll-editor-line-interlude-text")):this.draft.mode==="word"?h.appendChild(this.buildTokenRow(a,s,n)):h.textContent=a.text;let p=T("div","ll-editor-line-time");p.textContent=bi(a.start);let g=T("div","ll-editor-line-controls");g.append(X(_.chevronsLeft,"\u2212300 ms",()=>this.nudgeLine(s,-Ee)),X(_.chevronLeft,"\u2212100 ms",()=>this.nudgeLine(s,-Te)),X(_.chevronRight,"+100 ms",()=>this.nudgeLine(s,Te)),X(_.chevronsRight,"+300 ms",()=>this.nudgeLine(s,Ee)),X(_.jump,"Play from here",()=>this.jumpToLine(s)),X(_.clear,"Clear timing",()=>this.clearLine(s))),l.append(u,h,p,g),l.addEventListener("click",x=>{x.target.closest(".ll-editor-line-controls, .ll-editor-token")||this.selectLine(s)}),d&&this.draft.mode==="word"&&!this.currentRowEl&&(this.currentRowEl=l),i.appendChild(l)}),this.renderEndRow(i,n),this.updateSyncStatus(),e?this.scrollCurrentIntoView():r!=null&&(i.scrollTop=r)}renderEndRow(e,i){let r=this.targets.findIndex(c=>c.kind==="end");if(r<0)return;let n=T("div","ll-editor-line ll-editor-end-row");n.classList.toggle("is-synced",this.draft.endMs!=null),i?.kind==="end"&&(n.classList.add("is-current"),this.currentRowEl=n);let o=T("div","ll-editor-line-index");o.innerHTML=_.finish;let a=T("div","ll-editor-line-main ll-editor-line-interlude-text");a.textContent="End of lyrics";let s=T("div","ll-editor-line-time");s.textContent=bi(this.draft.endMs);let l=T("div","ll-editor-line-controls");l.append(X(_.chevronsLeft,"\u2212300 ms",()=>this.nudgeEnd(-Ee)),X(_.chevronLeft,"\u2212100 ms",()=>this.nudgeEnd(-Te)),X(_.chevronRight,"+100 ms",()=>this.nudgeEnd(Te)),X(_.chevronsRight,"+300 ms",()=>this.nudgeEnd(Ee)),X(_.jump,"Play from here",()=>this.jumpEnd()),X(_.clear,"Clear end",()=>this.clearEnd())),n.append(o,a,s,l),n.addEventListener("click",c=>{c.target.closest(".ll-editor-line-controls")||(this.cursor=r,this.draft.endMs!=null&&this.seek(this.draft.endMs),this.renderSyncList(!1))}),e.appendChild(n)}buildTokenRow(e,i,r){let n=T("div","ll-editor-token-block");if(e.kind!=="lyric")return n;let o=T("div","ll-editor-tokens");return e.tokens.forEach((a,s)=>{let l=r?.kind==="token"&&r.lineIndex===i&&r.tokenIndex===s;o.appendChild(this.tokenChip(a.text,a.start!=null,l,()=>this.selectToken(i,s)))}),o.appendChild(this.endChip(e.end!=null,r?.kind==="lineEnd"&&r.lineIndex===i,"Line end",()=>this.selectLineEnd(i))),n.appendChild(o),e.backgrounds.forEach((a,s)=>{let l=T("div","ll-editor-tokens ll-editor-bg-tokens");a.tokens.forEach((c,d)=>{let u=r?.kind==="bgToken"&&r.lineIndex===i&&r.bgIndex===s&&r.tokenIndex===d;l.appendChild(this.tokenChip(c.text,c.start!=null,u,()=>this.selectBgToken(i,s,d)))}),l.appendChild(this.endChip(a.end!=null,r?.kind==="bgEnd"&&r.lineIndex===i&&r.bgIndex===s,"Sub-lyric end",()=>this.selectBgEnd(i,s))),n.appendChild(l)}),n}tokenChip(e,i,r,n){let o=T("span","ll-editor-token");return o.textContent=e,o.classList.toggle("is-synced",i),r&&o.classList.add("is-current"),o.addEventListener("click",a=>{a.stopPropagation(),n()}),o}endChip(e,i,r,n){let o=T("span","ll-editor-token ll-editor-lineend-chip");return o.innerHTML=_.finish,o.setAttribute("aria-label",r),z(o,r),o.classList.toggle("is-synced",e),i&&o.classList.add("is-current"),o.addEventListener("click",a=>{a.stopPropagation(),n()}),o}selectLineEnd(e){let i=this.targets.findIndex(n=>n.kind==="lineEnd"&&n.lineIndex===e);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let r=this.draft.lines[e];r?.kind==="lyric"&&r.end!=null&&this.previewTime(r.end,qt)}selectBgToken(e,i,r){let n=this.targets.findIndex(a=>a.kind==="bgToken"&&a.lineIndex===e&&a.bgIndex===i&&a.tokenIndex===r);if(n<0)return;this.cursor=n,this.renderSyncList(!1);let o=this.backgroundAt(e,i)?.tokens[r];o?.start!=null&&this.previewTime(o.start,qt)}selectBgEnd(e,i){let r=this.targets.findIndex(o=>o.kind==="bgEnd"&&o.lineIndex===e&&o.bgIndex===i);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.backgroundAt(e,i);n?.end!=null&&this.previewTime(n.end,qt)}backgroundAt(e,i){let r=this.draft.lines[e];return r?.kind==="lyric"?r.backgrounds[i]:void 0}updateSyncStatus(){let e=this.overlay?.querySelector(".ll-editor-sync-status");if(!e)return;let i=this.targets.length,r=this.targets.filter(n=>this.targetTime(n)!=null).length;e.textContent=`${r}/${i} synced`}scrollCurrentIntoView(){this.currentRowEl?.scrollIntoView({block:"center",behavior:"smooth"})}tap(){let e=this.targets[this.cursor];e&&(this.setTargetTime(e,Math.round(xe())),this.cursor+=1,this.afterSyncChange())}undo(){this.cursor>0&&(this.cursor-=1);let e=this.targets[this.cursor];e&&this.clearTargetTime(e),this.afterSyncChange()}buildOffsetGroup(){let e=T("div","ll-editor-offset-group"),i=T("span","ll-editor-offset-label");i.textContent="Shift all";let r=[{icon:_.chevronsLeft,delta:-Ee},{icon:_.chevronLeft,delta:-Te},{icon:_.chevronRight,delta:Te},{icon:_.chevronsRight,delta:Ee}];return e.append(i,...r.map(({icon:n,delta:o})=>X(n,`Shift every timing ${o>0?"+":"-"}${Math.abs(o)} ms`,()=>this.shiftAll(o)))),e}shiftAll(e){if(this.targets.map(a=>this.targetTime(a)).filter(a=>a!=null).length===0){oe("Nothing is synced yet - nothing to shift.");return}let r=0,n=a=>{let s=a+e;return s<0&&r++,Math.max(0,s)};for(let a of this.draft.lines)if(a.start!=null&&(a.start=n(a.start)),a.kind==="lyric"){a.end!=null&&(a.end=n(a.end));for(let s of a.tokens)s.start!=null&&(s.start=n(s.start));for(let s of a.backgrounds){s.start!=null&&(s.start=n(s.start)),s.end!=null&&(s.end=n(s.end));for(let l of s.tokens)l.start!=null&&(l.start=n(l.start))}}this.draft.endMs!=null&&(this.draft.endMs=n(this.draft.endMs)),this.afterSyncChange(!1);let o=r?` (${r} held at 0:00)`:"";oe(`Shifted every timing by ${e>0?"+":""}${e} ms${o}.`)}nudgeCurrent(e){let i=this.targets[this.cursor];if(!i)return;let r=this.targetTime(i);if(r==null)return;let n=Math.max(0,r+e);this.setTargetTime(i,n),this.draft.updatedAt=Date.now(),this.refreshTimes();let o=i.kind!=="line"&&i.kind!=="end";this.previewTime(n,o?qt:cs)}clearCurrent(){let e=this.targets[this.cursor];e&&this.clearTargetTime(e),this.afterSyncChange()}nudgeLine(e,i){let r=this.targets[this.cursor];if(this.draft.mode==="word"&&r&&r.kind!=="end"&&r.kind!=="line"&&r.lineIndex===e&&this.targetTime(r)!=null){this.nudgeCurrent(i);return}let n=this.draft.lines[e];if(!n||n.start==null)return;let o=Math.max(0,n.start+i);this.shiftLine(n,o-n.start),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(o)}jumpToLine(e){let i=this.draft.lines[e];i?.start!=null&&this.seek(i.start)}nudgeEnd(e){this.draft.endMs!=null&&(this.draft.endMs=Math.max(0,this.draft.endMs+e),this.draft.updatedAt=Date.now(),this.refreshTimes(),this.previewTime(this.draft.endMs))}jumpEnd(){this.draft.endMs!=null&&this.seek(this.draft.endMs)}refreshTimes(){let e=this.overlay?.querySelector(".ll-editor-lines");if(!e)return;this.draft.lines.forEach((r,n)=>{let o=e.querySelector(`.ll-editor-line[data-line-index="${n}"]`);if(!o)return;o.classList.toggle("is-synced",r.start!=null);let a=o.querySelector(".ll-editor-line-time");a&&(a.textContent=bi(r.start))});let i=e.querySelector(".ll-editor-end-row");if(i){i.classList.toggle("is-synced",this.draft.endMs!=null);let r=i.querySelector(".ll-editor-line-time");r&&(r.textContent=bi(this.draft.endMs))}this.updateSyncStatus()}previewTime(e,i=cs){this.seek(Math.max(0,e-i)),Eh()}moveCursorToTime(e){let i=-1;this.targets.forEach((r,n)=>{let o=this.targetTime(r);o!=null&&o<=e+60&&(i=n)}),this.cursor=i>=0?i:0,this.renderSyncList()}clearEnd(){this.draft.endMs=null,this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1)}clearLine(e){let i=this.draft.lines[e];i&&(i.start=null,i.kind==="lyric"&&(i.tokens.forEach(r=>r.start=null),i.end=null,i.backgrounds.forEach(r=>{r.start=null,r.end=null,r.tokens.forEach(n=>n.start=null)})),this.cursor=this.firstUnsetTarget(),this.afterSyncChange(!1))}selectLine(e){let i=this.targets.findIndex(n=>n.kind!=="end"&&n.lineIndex===e);if(i<0)return;this.cursor=i,this.renderSyncList(!1);let r=this.draft.lines[e];r?.start!=null&&this.previewTime(r.start)}selectToken(e,i){let r=this.targets.findIndex(a=>a.kind==="token"&&a.lineIndex===e&&a.tokenIndex===i);if(r<0)return;this.cursor=r,this.renderSyncList(!1);let n=this.draft.lines[e],o=n?.kind==="lyric"?n.tokens[i]:void 0;o?.start!=null&&this.previewTime(o.start,qt)}afterSyncChange(e=!0){this.draft.updatedAt=Date.now(),this.renderSyncList(e)}rebuildTargets(){let e=[];this.draft.lines.forEach((i,r)=>{this.draft.mode==="line"||i.kind==="interlude"?e.push({kind:"line",lineIndex:r}):(i.tokens.forEach((n,o)=>e.push({kind:"token",lineIndex:r,tokenIndex:o})),e.push({kind:"lineEnd",lineIndex:r}),i.backgrounds.forEach((n,o)=>{n.tokens.forEach((a,s)=>e.push({kind:"bgToken",lineIndex:r,bgIndex:o,tokenIndex:s})),e.push({kind:"bgEnd",lineIndex:r,bgIndex:o})}))}),this.draft.mode==="line"&&this.draft.lines.some(i=>i.kind==="lyric")&&e.push({kind:"end"}),this.targets=e,this.cursor=this.firstUnsetTarget()}firstUnsetTarget(){let e=this.targets.findIndex(i=>this.targetTime(i)==null);return e<0?Math.max(0,this.targets.length-1):e}targetTime(e){if(e.kind==="end")return this.draft.endMs;let i=this.draft.lines[e.lineIndex];if(!i)return null;if(e.kind==="line")return i.start;if(i.kind!=="lyric")return null;if(e.kind==="lineEnd")return i.end;if(e.kind==="token")return i.tokens[e.tokenIndex]?.start??null;let r=i.backgrounds[e.bgIndex];return r?e.kind==="bgEnd"?r.end:r.tokens[e.tokenIndex]?.start??null:null}setTargetTime(e,i){if(e.kind==="end"){this.draft.endMs=i;return}let r=this.draft.lines[e.lineIndex];if(!r)return;if(e.kind==="line"){r.start=i;return}if(r.kind!=="lyric")return;if(e.kind==="lineEnd"){r.end=i;return}if(e.kind==="token"){let a=r.tokens[e.tokenIndex];if(!a)return;a.start=i,r.start=gs(r);return}let n=r.backgrounds[e.bgIndex];if(!n)return;if(e.kind==="bgEnd"){n.end=i;return}let o=n.tokens[e.tokenIndex];o&&(o.start=i,n.start=ms(n))}clearTargetTime(e){if(e.kind==="end"){this.draft.endMs=null;return}let i=this.draft.lines[e.lineIndex];if(!i)return;if(e.kind==="line"){i.start=null;return}if(i.kind!=="lyric")return;if(e.kind==="lineEnd"){i.end=null;return}if(e.kind==="token"){let o=i.tokens[e.tokenIndex];o&&(o.start=null),i.start=gs(i);return}let r=i.backgrounds[e.bgIndex];if(!r)return;if(e.kind==="bgEnd"){r.end=null;return}let n=r.tokens[e.tokenIndex];n&&(n.start=null),r.start=ms(r)}shiftLine(e,i){e.start!=null&&(e.start+=i),e.kind==="lyric"&&(e.tokens.forEach(r=>{r.start!=null&&(r.start+=i)}),e.end!=null&&(e.end+=i),e.backgrounds.forEach(r=>{r.start!=null&&(r.start+=i),r.tokens.forEach(n=>{n.start!=null&&(n.start+=i)}),r.end!=null&&(r.end+=i)}))}renderPreviewStage(){if(!this.refs)return;let e=T("div","ll-editor-preview-stage");if(!mi(this.draft)){let o=T("div","ll-editor-preview-warn");o.textContent="Not everything is synced yet \u2014 the preview only shows what's already timed.",e.appendChild(o)}let i=T("div","ll-editor-preview-frame"),r=T("div","ll-editor-preview-scroll"),n=T("div","ll-editor-preview-lines");r.appendChild(n),i.appendChild(r),e.appendChild(i),this.refs.body.appendChild(e),this.previewView?.destroy(),this.previewView=new Le({container:n,scroller:r,variant:"panel",virtualize:!1,renderBackgrounds:!0,dotLiftPx:12}),this.refreshPreview(),this.previewView.setEnabled(!0)}refreshPreview(){if(this.previewView)try{this.previewView.setLyrics(gi(this.draft))}catch(e){console.error("[Liquid Lyrics] Preview build failed",e)}}save(){if(this.stage==="text"&&this.commitText(),this.draft.lines.length===0){oe("Add some lyrics first (Text step).");return}let e=this.targets.map(r=>this.targetTime(r)),i=e.filter(r=>r!=null).length;if(i>0&&i<e.length){oe(`Sync incomplete (${i}/${e.length}) \u2014 finish syncing, or clear all timings to save static lyrics.`);return}Ah(this.draft);try{let r={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:gi(this.draft),draft:this.draft};Gn(r),this.savedSignature=Br(this.draft),this.refs?.deleteItem.classList.remove("ll-hidden"),this.close(),oe("Sync saved and activated.")}catch(r){console.error("[Liquid Lyrics] Save failed",r),oe("Save failed (storage full?).")}}async deleteSaved(){if(this.refs?.menu.classList.remove("open"),!$n(this.draft.trackUri)){oe("No custom sync saved for this song.");return}this.confirmResolve||!await this.showConfirm({title:"Delete saved sync?",message:"This removes your custom sync for this song and restores the online lyrics.",confirm:"Delete",cancel:"Cancel",danger:!0})||(Yn(this.draft.trackUri),this.close(),oe("Saved sync deleted."))}exportFile(){this.refs?.menu.classList.remove("open"),this.stage==="text"&&this.commitText();let e={version:1,trackId:this.draft.trackId,trackUri:this.draft.trackUri,title:this.draft.title,artist:this.draft.artist,durationMs:this.draft.durationMs,mode:this.draft.mode,credit:this.draft.credit,updatedAt:Date.now(),lyrics:gi(this.draft),draft:this.draft},i=`${this.draft.artist} - ${this.draft.title}`.replace(/[^\w\-]+/g,"_").slice(0,80);Rh(`${i||"liquid-lyrics"}.json`,JSON.stringify(e,null,2))}pickFile(){this.refs?.menu.classList.remove("open"),this.fileInput||(this.fileInput=document.createElement("input"),this.fileInput.type="file",this.fileInput.accept=".json,.lrc,.txt",this.fileInput.style.display="none",this.fileInput.addEventListener("change",()=>this.onFileChosen()),document.body.appendChild(this.fileInput)),this.fileInput.value="",this.fileInput.click()}async onFileChosen(){let e=this.fileInput?.files?.[0];if(!e)return;let i=await e.text(),r=fs(),n=e.name.toLowerCase();try{if(n.endsWith(".json")){let o=Xn(i,r.trackUri);this.draft={...o.draft,durationMs:r.durationMs||o.draft.durationMs}}else if(n.endsWith(".lrc")){let o=ls(i,r);if(!o)throw new Error("No timings found in the .lrc file");this.draft=o}else this.draft=ss(i,r,this.draft.mode)}catch(o){oe(`Import failed: ${o instanceof Error?o.message:"Invalid file"}`);return}this.updateModeButtons(),this.refs&&(this.refs.songLabel.textContent=`${this.draft.title} - ${this.draft.artist}`),this.rebuildTargets(),this.setStage(mi(this.draft)?"preview":this.draft.lines.length?"sync":"text"),oe("File imported.")}};wi.SYNC_KEYS=new Set(["Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"]);var Fr=wi;function T(t,e){let i=document.createElement(t);return i.className=e,i}function Nr(t,e,i){let r=T("button",t);return r.type="button",r.innerHTML=e,r.setAttribute("aria-label",i),z(r,i),r}function X(t,e,i){let r=T("button","ll-editor-line-btn");return r.type="button",r.innerHTML=t,r.setAttribute("aria-label",e),z(r,e),r.addEventListener("click",n=>{n.stopPropagation(),i()}),r}function Pr(t){let e=T("button","ll-editor-menu-item");return e.type="button",e.textContent=t,e}function Th(t,e){t.dataset.icon!==e&&(t.dataset.icon=e,t.innerHTML=e)}function ys(){let t=Spicetify.Player;typeof t?.togglePlay=="function"&&t.togglePlay()}function zr(){let t=Spicetify.Player;typeof t?.pause=="function"?t.pause():typeof t?.togglePlay=="function"&&ee()&&t.togglePlay()}function Eh(){ee()||ys()}function us(t,e,i){return Number.isFinite(t)?Math.min(i,Math.max(e,t)):e}function hs(){return{width:us(parseInt(localStorage.getItem("liquify-tc-width")||"135",10),50,400),height:us(parseInt(localStorage.getItem("liquify-tc-height")||"64",10),20,300)}}function Mh(){let t=Spicetify.Player;try{if(typeof t?.getRepeat=="function")return Number(t.getRepeat())||0}catch{}return null}function ps(t){let e=Spicetify.Player;try{typeof e?.setRepeat=="function"&&e.setRepeat(t)}catch{}}function fs(){let t=Spicetify.Player?.data?.item,e=String(t?.uri??""),i=Array.isArray(t?.artists)?t.artists.map(n=>n?.name).filter(Boolean).join(", "):"",r=t?.metadata??{};return{trackId:Gt(e),trackUri:e,title:t?.name||r.title||"Unknown title",artist:i||r.artist_name||r.artist||"Unknown artist",durationMs:Y()}}function Ch(){return{trackId:"",trackUri:"",title:"",artist:"",durationMs:0}}function gs(t){if(t.kind!=="lyric")return t.start;let e=t.tokens.map(i=>i.start).filter(i=>i!=null);return e.length?Math.min(...e):null}function ms(t){let e=t.tokens.map(i=>i.start).filter(i=>i!=null);return e.length?Math.min(...e):null}function qh(t,e){let i=0;for(let r=0;r<=e;r++)t[r].kind==="lyric"&&i++;return i}function Ah(t){for(let e of t.lines){if(e.kind!=="lyric")continue;e.text=bs(e.text);let i=e.tokens[0];i&&(i.text=bs(i.text))}}function bs(t){let e=t.search(/\p{L}/u);return e<0?t:t.slice(0,e)+t[e].toUpperCase()+t.slice(e+1)}function _h(t,e){let i=new Map,r=[];for(let n of t)if(n.kind==="interlude")r.push(n);else{let o=i.get(n.text)??[];o.push(n),i.set(n.text,o)}return e.map(n=>{if(n.kind==="interlude"){let a=r.shift();return{kind:"interlude",start:a?a.start:null}}let o=i.get(n.text)?.shift();if(o&&o.kind==="lyric"){let a=n.tokens.map((l,c)=>({text:l.text,start:o.tokens[c]?.text===l.text?o.tokens[c].start:null})),s=n.backgrounds.map((l,c)=>{let d=o.backgrounds[c],u=d?.text===l.text;return{text:l.text,tokens:l.tokens.map((h,p)=>({text:h.text,start:u&&d.tokens[p]?.text===h.text?d.tokens[p].start:null})),start:u?d.start:null,end:u?d.end:null}});return{kind:"lyric",text:n.text,tokens:a,backgrounds:s,start:o.start,end:o.end}}return n})}function Br(t){return JSON.stringify({mode:t.mode,credit:t.credit??"",end:t.endMs,lines:t.lines.map(e=>e.kind==="interlude"?{i:e.start}:{t:e.text,s:e.start,e:e.end,w:e.tokens.map(i=>i.start),b:e.backgrounds.map(i=>({t:i.text,s:i.start,e:i.end,w:i.tokens.map(r=>r.start)}))})})}function bi(t){if(t==null||!Number.isFinite(t))return"\u2013:\u2013\u2013.\u2013\u2013\u2013";let e=Math.max(0,t),i=Math.floor(e/6e4),r=Math.floor(e%6e4/1e3),n=Math.floor(e%1e3);return`${i}:${String(r).padStart(2,"0")}.${String(n).padStart(3,"0")}`}function yi(t){let e=Math.max(0,Math.floor(t/1e3));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Rh(t,e){let i=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(i),n=document.createElement("a");n.href=r,n.download=t,n.click(),setTimeout(()=>URL.revokeObjectURL(r),2e3)}var vi=null;function oe(t){let e=document.getElementById(Or);if(e?.classList.contains("visible")){Ih(e,t);return}let i=Spicetify;typeof i?.showNotification=="function"?i.showNotification(t):console.log("[Liquid Lyrics]",t)}function Ih(t,e){let i=t.querySelector(".ll-editor-toast");i||(i=T("div","ll-editor-toast"),t.appendChild(i)),i.textContent=e,i.classList.remove("visible"),i.offsetWidth,i.classList.add("visible"),vi&&clearTimeout(vi),vi=setTimeout(()=>{i?.classList.remove("visible"),vi=null},3400)}var ws="ll-ui-idle",Nh="ll-ui-idle-cursor",Ph=["pointermove","pointerdown","wheel","keydown","touchstart"],ki=null,Si=()=>!1,_t=0,vs=!1;function xs(t,e){if(ki=t,Si=e,!vs){vs=!0;for(let i of Ph)window.addEventListener(i,zh,{capture:!0,passive:!0});window.addEventListener(ne,()=>Ue())}Ue()}function Ue(){ki&&(Dr(),xi(!1),!(!C().autoHideUi||!Si())&&ks())}function zh(){let t=ki;if(t){if(!C().autoHideUi||!Si()){t.classList.contains(ws)&&xi(!1),Dr();return}xi(!1),ks()}}function ks(){let{autoHideDelay:t}=C();Dr(),_t=window.setTimeout(()=>{_t=0,!(!C().autoHideUi||!Si())&&xi(!0)},Math.max(1,t)*1e3)}function Dr(){_t&&(window.clearTimeout(_t),_t=0)}function xi(t){let e=ki;e&&(e.classList.toggle(ws,t),e.classList.toggle(Nh,t&&C().autoHideCursor))}var je="liquid-lyrics-settings-overlay",Bh=500,Rs="liquid-lyrics:settings-menu",Mi='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/></svg>',Oh='<svg role="img" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="butt" stroke-linejoin="miter"><path vector-effect="non-scaling-stroke" d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path vector-effect="non-scaling-stroke" d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>',Hh='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.6v4.8h4.8"/><path d="M4.6 10.4a7.6 7.6 0 1 1 .7 6"/></svg>',Fh='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19"/><path d="M19 5 5 19"/></svg>',Dh='<svg class="ll-settings-filters" aria-hidden="true" focusable="false"><defs><filter id="liquid-lyrics-toggle-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -10" result="goo"/><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs></svg>',Uh=3,jh=160,Ss=320,Ci=[],Rt=!1,Ur=[],Li=null,jr=0;function Wh(){return!!document.getElementById(je)&&!Rt}function Is(){Wh()?le():qi()}function qi(){document.getElementById(je)?.remove(),Ci=[],Rt=!1,jr++;let t=document.createElement("div");t.id=je,t.className="ll-settings-overlay",t.addEventListener("pointerdown",i=>{i.target===t&&le()}),t.insertAdjacentHTML("beforeend",Dh),t.appendChild(Vh()),Vr().appendChild(t),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("visible"))),se();let e=t.querySelector(".ll-settings-body");e&&(Li=new ot(e,!0),Li.sync()),document.addEventListener("keydown",Ns,!0),window.dispatchEvent(new Event(Rs))}function le(){let t=document.getElementById(je);if(!t||Rt)return;Rt=!0,document.removeEventListener("keydown",Ns,!0),st(),Ei(),re(),Li?.destroy(),Li=null;for(let a of Ur)a.remove();Ur=[],t.classList.remove("visible"),t.classList.add("closing");let e=t.querySelector(".ll-settings-panel"),i=jr,r=!1,n=0,o=a=>{a&&(a.target!==e||a.propertyName!=="transform")||r||(r=!0,window.clearTimeout(n),e?.removeEventListener("transitionend",o),t.remove(),i===jr&&(Ci=[],Rt=!1,window.dispatchEvent(new Event(Rs))))};e?.addEventListener("transitionend",o),n=window.setTimeout(o,Bh)}function Ns(t){if(t.key==="Escape"){if(t.preventDefault(),t.stopPropagation(),It){st();return}le()}}function Vr(){let t=document.fullscreenElement;return t instanceof HTMLElement?t:document.body}function Vh(){let t=document.createElement("div");t.className="ll-settings-panel",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Liquid Lyrics Settings");let e=[Yh(),Xh(),ip(),Qh(),ep(),Jh(),Zh(),tp()],i=document.createElement("div");return i.className="ll-settings-body",i.append(...e.map(np),rp()),t.append(Kh(),$h(e,i),i),se(),t}function Kh(){let t=document.createElement("div");t.className="ll-settings-header";let e=document.createElement("h3");e.className="ll-settings-title",e.textContent="Liquid Lyrics Settings";let i=document.createElement("button");i.type="button",i.className="ll-settings-surface ll-settings-header-btn ll-settings-close-btn",i.setAttribute("aria-label","Close"),i.innerHTML=Fh,i.addEventListener("click",le),z(i,"Close");let r=document.createElement("div");return r.className="ll-settings-header-actions",r.appendChild(i),t.append(e,r),t}function $h(t,e){let i=document.createElement("div");i.className="ll-settings-search-island";let r=document.createElement("input");r.type="text",r.className="ll-settings-surface ll-settings-search-input",r.placeholder="Search settings...",r.spellcheck=!1,r.addEventListener("input",()=>Gh(e,r.value));let n=document.createElement("div");n.className="ll-settings-section-nav-wrap";let o=document.createElement("div");o.className="ll-settings-section-nav";for(let u of t){let h=document.createElement("button");h.type="button",h.className="ll-settings-surface ll-settings-section-nav-btn",h.textContent=u.title,h.addEventListener("click",()=>{document.getElementById(zs(u.id))?.scrollIntoView({behavior:"smooth",block:"start"})}),o.appendChild(h)}n.append(o),i.append(r,n);let a=Ls("isLeft","Scroll sections left",()=>Ts(o,-1)),s=Ls("isRight","Scroll sections right",()=>Ts(o,1));Ur=[a,s];let l=()=>{let u=document.getElementById(je);if(!u||!o.isConnected)return;a.parentElement!==u&&u.append(a,s);let h=o.getBoundingClientRect(),p=Math.max(0,o.scrollWidth-o.clientWidth),g=Math.round(h.top+10);a.style.top=`${g}px`,a.style.left=`${Math.round(h.left+12)}px`,s.style.top=`${g}px`,s.style.left=`${Math.round(h.right-42)}px`,a.classList.toggle("is-visible",o.scrollLeft>1),s.classList.toggle("is-visible",o.scrollLeft<p-1)};o.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l);let c=performance.now(),d=()=>{l(),performance.now()-c<650&&document.getElementById(je)&&requestAnimationFrame(d)};return requestAnimationFrame(d),i}function Ls(t,e,i){let r=document.createElement("button");return r.type="button",r.className=`ll-settings-surface ll-settings-section-nav-scroll-btn ${t}`,r.setAttribute("aria-label",e),r.innerHTML=t==="isLeft"?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',r.addEventListener("click",i),r}function Ts(t,e){t.scrollBy({left:e*Math.max(120,t.clientWidth*.72),behavior:"smooth"})}function Gh(t,e){let i=e.trim().toLowerCase();t.querySelectorAll(".ll-settings-section").forEach(r=>{let n=(r.querySelector(".ll-settings-section-title")?.textContent||"").toLowerCase(),o=i!==""&&n.includes(i),a=!1;r.querySelectorAll(".ll-settings-row").forEach(s=>{if(s.classList.contains("is-hidden")){s.style.display="";return}let l=(s.querySelector(".ll-settings-label")?.textContent||"").toLowerCase(),c=i===""||o||l.includes(i);s.style.display=c?"":"none",c&&(a=!0)}),r.querySelectorAll(".ll-settings-subsection").forEach(s=>{let l=Array.from(s.querySelectorAll(".ll-settings-row")).some(c=>c.style.display!=="none"&&!c.classList.contains("is-hidden"));s.style.display=l?"":"none"}),r.style.display=i===""||o||a?"":"none"})}function Yh(){return{id:"buttons",title:"Buttons",groups:[{title:"Now playing bar",rows:[Me("Spotify's lyrics button","Two lyrics buttons side by side get crowded. Hide Spotify's own one, or let it open Liquid Lyrics instead of Spotify's lyrics view.",[{value:"keep",label:"Leave it alone"},{value:"hide",label:"Hide it"},{value:"override",label:"Open Liquid Lyrics"}],()=>C().spotifyLyricsButton,t=>V("spotifyLyricsButton",t)),P("Liquid Lyrics button","The microphone button next to Spotify's player controls.","showOwnButton")]}]}}function Xh(){return{id:"interface",title:"Interface",groups:[{title:"Header",rows:[P("Show the wordmark",`The "Liquid Lyrics" lettering in the panel's top left corner.`,"showTitle"),P("Show GitHub & Discord","The two link buttons in the panel's top right corner. The settings gear stays either way.","showHeaderLinks")]}]}}function Jh(){return{id:"page",title:"Panel",groups:[{title:"Elements",rows:[P("Show credits","Writers, and where the sync came from, below the last line.","pageShowCredits"),P("Hide the scrollbar","The thin scrollbar alongside the lyrics.","pageHideScrollbar")]},{title:"Controls",rows:[P("Show the control pill","The floating row of view controls.","pageShowControls"),Me("Control pill position","Which edge the floating controls sit against.",Ps,()=>C().pageControlPosition,t=>V("pageControlPosition",t),()=>C().pageShowControls)]}]}}function Zh(){let t=()=>C().autoHideUi;return{id:"fullscreen",title:"Fullscreen",groups:[{title:"Auto-hide",rows:[P("Fade the interface out","In cinema and fullscreen mode the header, control pill and scrollbar fade away while the mouse rests, and fade back in on the next move.","autoHideUi"),F("Fade out after (seconds)","Seconds of stillness before the interface disappears.","autoHideDelay",t),P("Hide the cursor too","Takes the mouse pointer with it.","autoHideCursor",t)]},{title:"Elements",rows:[P("Show credits","Writers, and where the sync came from, below the last line.","fsShowCredits"),P("Hide the scrollbar","The thin scrollbar alongside the lyrics.","fsHideScrollbar")]},{title:"Fade the track details out",rows:[P("Song name","Fades away when the panel is maximized, and back in when it is not. The card keeps its size either way.","fsFadeTitle"),P("Artist","As above, for the artist.","fsFadeArtist"),P("Album","As above, for the album.","fsFadeAlbum")]},{title:"Controls",rows:[P("Show the control pill","The floating row of view controls.","fsShowControls"),Me("Control pill position","Which edge the floating controls sit against.",Ps,()=>C().fsControlPosition,e=>V("fsControlPosition",e),()=>C().fsShowControls)]}]}}var Ps=[{value:"bottom",label:"Bottom"},{value:"top",label:"Top"},{value:"left",label:"Left"},{value:"right",label:"Right"}];function Qh(){let t=()=>C().bgMode,e=()=>t()!=="color"&&t()!=="transparent",i=()=>e()&&C().bgSource==="url",r=()=>e()&&C().bgSource==="upload",n=()=>t()==="animated"||t()==="kawarp",o=()=>t()==="kawarp";return{id:"background",title:"Background",groups:[{title:"Source",rows:[Me("Background mode","Transparent lets your theme through, colour is a plain colour, image a picture of your choice. Animated is a simple drifting effect made from the cover art; Kawarp looks a lot better but needs more from your graphics card.",[{value:"transparent",label:"Transparent"},{value:"color",label:"Color"},{value:"image",label:"Image"},{value:"animated",label:"Animated"},{value:"kawarp",label:"Kawarp"}],()=>C().bgMode,a=>qr(a)),K(sp("Background color","Used by the colour mode.","bgColor"),()=>t()==="color"),K(Me("Picture source","Where the picture comes from.",[{value:"albumArt",label:"Album art"},{value:"url",label:"URL"},{value:"upload",label:"Local file"}],()=>C().bgSource,a=>V("bgSource",a)),e),K(ap("Image URL","A direct link to an image file.","bgUrl","https://..."),i),K(cp("Local image","Downscaled and stored in Spotify's local storage."),r)]},{title:"Appearance",rows:[K(F("Blur (px)","Blur radius. In transparent mode it frosts whatever sits behind the panel; Kawarp maps it onto its blur passes.","bgBlur"),()=>t()!=="color"),K(F("Scale (%)","Zoom level of the background picture.","bgScale"),e),K(F("Opacity (%)","How opaque the whole background layer is.","bgOpacity"),e),K(F("Brightness (%)","How bright the background sits behind the lyrics.","bgBrightness"),e),K(F("Contrast (%)","Contrast of the background picture.","bgContrast"),e),K(F("Saturation (%)","Colour intensity.","bgSaturation"),e)]},{title:"Motion",rows:[K(F("Warp intensity (%)","How hard Kawarp distorts the picture.","bgWarpIntensity"),o),K(F("Motion speed (%)","Rotation speed of the blobs, or Kawarp's animation speed.","bgRotationSpeed"),n)]}]}}function ep(){return{id:"songcard",title:"Song card",groups:[{title:"Appearance",rows:[Me("Card style","Default keeps the card on your theme's liquid glass surface. Cover leads with the artwork instead: the playback controls fade in over it on hover, and the track details sit as plain text underneath.",[{value:"default",label:"Default"},{value:"cover",label:"Cover"}],()=>C().cardStyle,t=>V("cardStyle",t)),K(F("Card border radius (px)","Rounding of the card itself. The cover style has no card frame to round \u2014 there the artwork is the card.","cardRadius"),()=>C().cardStyle==="default"),K(F("Cover border radius (px)","Rounding of the artwork in the cover style.","cardCoverRadius"),()=>C().cardStyle==="cover"),Me("Card side","Which side of the lyrics the card sits on. Also switchable from the control pill.",[{value:"left",label:"Left"},{value:"right",label:"Right"}],()=>C().cardSide,t=>V("cardSide",t)),P("Center text","Aligns the track details to the centre.","cardCenterText")]},{title:"Track details",rows:[P("Hide title","Hides the track title.","cardHideTitle"),P("Hide artist","Hides the artist name.","cardHideArtist"),P("Hide album","Hides the album name.","cardHideAlbum")]}]}}function tp(){return{id:"npv",title:"Now Playing View",groups:[{title:"Background",rows:[P("Show the background","Paints your chosen background behind Spotify's whole right sidebar - behind the cover art, the song info, the queue and the lyrics card - instead of leaving it on your theme's own backdrop.","npvBackground")]},{title:"Sidebar Lyrics Card",rows:[P("Show the card","The Liquid Lyrics card inside Spotify's Now Playing View.","npvShowCard"),F("Card height (vh)","Height of the lyrics card, as a share of the window.","npvCardHeight",()=>C().npvShowCard),F("Card minimum height (px)","The card never shrinks below this.","npvCardMinHeight",()=>C().npvShowCard)]}]}}function ip(){return{id:"lyrics",title:"Lyrics",groups:[{title:"Text",rows:[F("Font size (%)","Scales every lyric line. 100% is the built-in size.","fontScale")]},{title:"Display",rows:[P("Simple lyrics mode","Drops the extra motion: word-by-word lines only fill left to right instead of also rising, and block lines arrive already filled rather than wiping top to bottom.","simpleLyrics"),P("Minimal lyrics mode","Keeps the karaoke fill travelling letter by letter, but stops each letter lifting as it is sung.","minimalLyrics",()=>!C().simpleLyrics)]},{title:"When there are no lyrics",rows:[Me("Show instead","What fills the panel once the search has settled and the song has no lyrics.",[{value:"message",label:"A message"},{value:"card",label:"The song card, enlarged"},{value:"vinyl",label:"Spinning cover art"}],()=>C().noLyricsView,t=>V("noLyricsView",t))]},{title:"Fade areas",rows:[F("Fade area above (%)","How far the lyrics fade out towards the top edge.","fadeTop"),F("Fade area below (%)","How far the lyrics fade out towards the bottom edge.","fadeBottom")]},{title:"Scrolling",rows:[P("Smooth scrolling","Eases the lyrics along instead of jumping line to line, and smooths the wheel.","smoothScroll"),F("Scroll easing (tenths of a second)","How long the glide to the next line takes.","smoothScrollDuration",()=>C().smoothScroll)]}]}}function rp(){let t=document.createElement("div");t.className="ll-settings-footer";let e=document.createElement("button");return e.type="button",e.className="ll-settings-surface ll-settings-reset-btn",e.innerHTML=`${Hh}<span>Reset to defaults</span>`,e.addEventListener("click",()=>{Va(),se()}),t.appendChild(e),t}function zs(t){return`liquid-lyrics-sec-${t}`}function np(t){let e=document.createElement("div");e.className="ll-settings-section",e.id=zs(t.id);let i=document.createElement("div");i.className="ll-settings-section-title",i.textContent=t.title;let r=document.createElement("div");return r.className="ll-settings-section-body",r.append(...t.groups.map(op)),e.append(i,r),e}function op(t){let e=document.createElement("div");e.className="ll-settings-subsection";let i=document.createElement("div");return i.className="ll-settings-subsection-title",i.textContent=t.title,e.append(i,...t.rows),e}function K(t,e){return We(()=>t.classList.toggle("is-hidden",!e())),t}function lt(t,e){let i=document.createElement("div");i.className="ll-settings-row";let r=document.createElement("div");r.className="ll-settings-label";let n=document.createElement("span");if(n.className="ll-settings-label-text",n.textContent=t,r.appendChild(n),e){let a=document.createElement("span");a.className="ll-settings-hint",a.textContent=e,r.appendChild(a)}let o=document.createElement("div");return o.className="ll-settings-row-controls",i.append(r,o),{row:i,controls:o}}function P(t,e,i,r=()=>!0){let{row:n,controls:o}=lt(t,e),a=dp(()=>C()[i],s=>{V(i,s),se()});return o.appendChild(a.el),We(()=>{let s=r();n.classList.toggle("is-disabled",!s),a.el.disabled=!s,a.sync()}),n}function F(t,e,i,r=()=>!0){let{row:n,controls:o}=lt(t,e),a=up(Cr[i],()=>C()[i],s=>{V(i,s),se()});return o.appendChild(a.el),We(()=>{let s=r();n.classList.toggle("is-disabled",!s),a.setEnabled(s),a.sync()}),n}function Me(t,e,i,r,n,o=()=>!0){let{row:a,controls:s}=lt(t,e),l=hp(i,r,c=>{n(c),se()});return s.appendChild(l.el),We(()=>{let c=o();a.classList.toggle("is-disabled",!c),l.el.disabled=!c,l.sync()}),a}function ap(t,e,i,r,n=()=>!0){let{row:o,controls:a}=lt(t,e),s=document.createElement("input");return s.type="text",s.className="ll-settings-surface ll-settings-text-input",s.placeholder=r,s.spellcheck=!1,s.addEventListener("blur",()=>{V(i,s.value.trim()),se()}),s.addEventListener("keydown",l=>{l.key==="Enter"&&s.blur()}),a.appendChild(s),We(()=>{let l=n();o.classList.toggle("is-disabled",!l),s.disabled=!l,document.activeElement!==s&&(s.value=String(C()[i]))}),o}function sp(t,e,i,r=()=>!0){let{row:n,controls:o}=lt(t,e),a=document.createElement("button");a.type="button",a.className="ll-settings-surface ll-settings-color";let s=document.createElement("span");s.className="ll-settings-color-swatch";let l=document.createElement("span");return l.className="ll-settings-color-value",a.append(s,l),a.addEventListener("click",c=>{if(c.stopPropagation(),Ti?.anchor===a){Ei();return}lp(a,()=>String(C()[i]),d=>{V(i,d),se()})}),o.appendChild(a),We(()=>{let c=r();n.classList.toggle("is-disabled",!c),a.disabled=!c;let d=Wr(String(C()[i]));s.style.background=d,l.textContent=d.toUpperCase()}),n}var Ti=null;function lp(t,e,i){Ei();let r=document.createElement("div");r.className="ll-settings-popover ll-settings-color-picker";let n=document.createElement("div");n.className="ll-color-saturation";let o=document.createElement("div");o.className="ll-color-pointer",n.appendChild(o);let a=document.createElement("div");a.className="ll-color-hue";let s=document.createElement("div");s.className="ll-color-pointer ll-color-hue-pointer",a.appendChild(s);let l=document.createElement("div");l.className="ll-color-preview-row";let c=document.createElement("div");c.className="ll-color-preview";let d=document.createElement("input");d.type="text",d.className="ll-settings-surface ll-color-hex",d.spellcheck=!1,l.append(c,d),r.append(n,a,l),Vr().appendChild(r);let u=qs(Ms(Wr(e()))),h=()=>{let v=Cs(As(u));return n.style.background=`linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${Cs(As({h:u.h,s:1,v:1}))})`,o.style.left=`${u.s*100}%`,o.style.top=`${(1-u.v)*100}%`,s.style.left=`${u.h/360*100}%`,c.style.background=v,document.activeElement!==d&&(d.value=v.toUpperCase()),v},p=()=>i(h());Es(n,(v,L)=>{u={...u,s:v,v:1-L},p()}),Es(a,v=>{u={...u,h:v*360},p()}),d.addEventListener("blur",()=>{u=qs(Ms(Wr(d.value))),p()}),d.addEventListener("keydown",v=>{v.key==="Enter"&&d.blur()}),h();let g=t.getBoundingClientRect(),x=6,E=document.querySelector(".ll-settings-body")?.getBoundingClientRect(),f=r.offsetHeight,b=r.offsetWidth,w=(E?.top??0)+x,S=Math.max(w,(E?.bottom??window.innerHeight)-f-x),y=g.bottom+x+f<=(E?.bottom??window.innerHeight)?g.bottom+x:g.top-f-x;r.style.top=`${A(y,w,S)}px`,r.style.left=`${A(g.right-b,x,Math.max(x,window.innerWidth-b-x))}px`,requestAnimationFrame(()=>r.classList.add("visible"));let k=v=>{let L=v.target;L&&(r.contains(L)||t.contains(L))||(v.stopPropagation(),Ei())};document.addEventListener("pointerdown",k,!0),Ti={anchor:t,el:r,dispose:()=>{document.removeEventListener("pointerdown",k,!0),r.remove()}}}function Ei(){Ti?.dispose(),Ti=null}function Es(t,e){let i=r=>{let n=t.getBoundingClientRect();e(A((r.clientX-n.left)/Math.max(1,n.width),0,1),A((r.clientY-n.top)/Math.max(1,n.height),0,1))};t.addEventListener("pointerdown",r=>{r.preventDefault(),t.setPointerCapture?.(r.pointerId),i(r);let n=a=>i(a),o=()=>{t.removeEventListener("pointermove",n),window.removeEventListener("pointerup",o)};t.addEventListener("pointermove",n),window.addEventListener("pointerup",o,{once:!0})})}function Wr(t){let e=t.trim(),i=e.startsWith("#")?e:`#${e}`;return/^#[0-9a-f]{3}$/i.test(i)?`#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}`.toLowerCase():/^#[0-9a-f]{6}$/i.test(i)?i.toLowerCase():"#101418"}function Ms(t){let e=parseInt(t.slice(1),16);return{r:e>>16&255,g:e>>8&255,b:e&255}}function Cs({r:t,g:e,b:i}){let r=n=>Math.round(A(n,0,255)).toString(16).padStart(2,"0");return`#${r(t)}${r(e)}${r(i)}`}function qs({r:t,g:e,b:i}){let r=t/255,n=e/255,o=i/255,a=Math.max(r,n,o),s=Math.min(r,n,o),l=a-s,c=0;return l!==0&&(a===r?c=60*((n-o)/l%6):a===n?c=60*((o-r)/l+2):c=60*((r-n)/l+4)),c<0&&(c+=360),{h:c,s:a===0?0:l/a,v:a}}function As({h:t,s:e,v:i}){let r=i*e,n=r*(1-Math.abs(t/60%2-1)),o=i-r,[a,s,l]=t<60?[r,n,0]:t<120?[n,r,0]:t<180?[0,r,n]:t<240?[0,n,r]:t<300?[n,0,r]:[r,0,n];return{r:(a+o)*255,g:(s+o)*255,b:(l+o)*255}}function cp(t,e,i=()=>!0){let{row:r,controls:n}=lt(t,e),o=document.createElement("input");o.type="file",o.accept="image/*",o.hidden=!0;let a=document.createElement("button");return a.type="button",a.className="ll-settings-surface ll-settings-action-btn",a.addEventListener("click",()=>o.click()),o.addEventListener("change",async()=>{let s=o.files?.[0];if(!s)return;a.textContent="Storing...";let l=await Ya(s).catch(()=>!1);if(o.value="",!l){a.textContent="Too large \u2014 try a smaller image",window.setTimeout(se,2600);return}se()}),n.append(a,o),We(()=>{let s=i();r.classList.toggle("is-disabled",!s),a.disabled=!s,a.textContent=Ar()?"Replace image":"Choose image"}),r}function dp(t,e){let i=document.createElement("button");i.type="button",i.className="ll-toggle",i.setAttribute("data-active","false"),i.innerHTML='<span class="ll-toggle-indicator"></span><span class="ll-toggle-knockout"><span class="ll-toggle-indicator ll-toggle-indicator--masked"><span class="ll-toggle-mask"></span></span></span><span class="ll-toggle-wrapper"><span class="ll-toggle-liquids"><span class="ll-toggle-liquid-shadow"></span><span class="ll-toggle-liquid-track"></span></span></span><span class="ll-toggle-knob"><span class="ll-toggle-gloss"></span></span><span class="ll-toggle-rim"></span>';let r=!1,n=[],o=!1,a=!1,s=!1,l={x:0,complete:0},c=0,d=()=>{for(let E of n)window.clearTimeout(E);n=[]},u=(E,f)=>n.push(window.setTimeout(E,f)),h=E=>i.setAttribute("data-active",String(E)),p=E=>{c=E,i.style.setProperty("--complete",String(E))},g=()=>{r||(r=!0,h(!0),u(()=>{e(!t()),u(()=>{h(!1),r=!1},Ss)},jh))};i.addEventListener("pointerdown",E=>{if(E.button===0&&!r){d(),o=!0,a=!1,s=!1,l={x:E.clientX,complete:t()?100:0},c=l.complete;try{i.setPointerCapture?.(E.pointerId)}catch{}h(!0)}}),i.addEventListener("pointermove",E=>{if(!o)return;let f=E.clientX-l.x;if(!a&&Math.abs(f)<Uh)return;a||(a=!0,i.setAttribute("data-dragging","true"));let b=i.getBoundingClientRect().width*.4||1;p(A(l.complete+f/b*100,0,100))}),i.addEventListener("pointerup",E=>{if(!o)return;o=!1;try{i.releasePointerCapture?.(E.pointerId)}catch{}if(!a)return;a=!1,s=!0,i.removeAttribute("data-dragging"),h(!1);let f=c>=50?100:0;p(f),e(f===100),u(()=>i.style.removeProperty("--complete"),Ss)}),i.addEventListener("pointercancel",()=>{o=!1,a=!1,i.removeAttribute("data-dragging"),i.style.removeProperty("--complete"),h(!1)}),i.addEventListener("click",()=>{if(s){s=!1;return}g()});let x=()=>i.setAttribute("aria-pressed",String(t()));return x(),{el:i,sync:x}}function up(t,e,i){let r=document.createElement("div");r.className="ll-settings-inline";let n=_s("-","Decrease"),o=_s("+","Increase"),a=document.createElement("input");a.type="text",a.inputMode="numeric",a.className="ll-settings-surface ll-settings-number-input",r.append(n,a,o);let s=d=>i(A(Math.round(d),t.min,t.max));n.addEventListener("click",()=>s(e()-t.step)),o.addEventListener("click",()=>s(e()+t.step)),a.addEventListener("blur",()=>{let d=parseInt(a.value,10);Number.isFinite(d)?s(d):l()}),a.addEventListener("keydown",d=>{d.key==="Enter"?a.blur():d.key==="ArrowUp"?(d.preventDefault(),s(e()+t.step)):d.key==="ArrowDown"&&(d.preventDefault(),s(e()-t.step))});let l=()=>{let d=e();document.activeElement!==a&&(a.value=String(d)),n.disabled=n.dataset.forcedDisabled==="true"||d<=t.min,o.disabled=o.dataset.forcedDisabled==="true"||d>=t.max},c=d=>{a.disabled=!d,n.dataset.forcedDisabled=String(!d),o.dataset.forcedDisabled=String(!d)};return l(),{el:r,sync:l,setEnabled:c}}function _s(t,e){let i=document.createElement("button");return i.type="button",i.className="ll-settings-surface ll-settings-stepper-btn",i.textContent=t,i.setAttribute("aria-label",e),i}var It=null;function hp(t,e,i){let r=document.createElement("button");r.type="button",r.className="ll-settings-surface ll-settings-select",r.innerHTML='<span class="ll-settings-select-label"></span><span class="ll-settings-select-chevron"></span>';let n=r.querySelector(".ll-settings-select-label"),o=()=>{let a=e();n.textContent=t.find(s=>s.value===a)?.label??String(a)};return r.addEventListener("click",a=>{if(a.stopPropagation(),It?.button===r){st();return}pp(r,t,e(),s=>{i(s),o()})}),o(),{el:r,sync:o}}function pp(t,e,i,r){st();let n=document.createElement("div");n.className="ll-settings-select-menu";for(let g of e){let x=document.createElement("div");x.className="ll-settings-select-item",x.setAttribute("role","option"),x.textContent=g.label,x.classList.toggle("is-selected",g.value===i),x.addEventListener("click",E=>{E.stopPropagation(),st(),r(g.value)}),n.appendChild(x)}Vr().appendChild(n),t.classList.add("isOpen");let o=t.getBoundingClientRect(),a=6;n.style.minWidth=`${o.width}px`;let s=n.offsetWidth,l=n.offsetHeight,c=document.querySelector(".ll-settings-body")?.getBoundingClientRect(),d=(c?.top??0)+a,u=Math.max(d,(c?.bottom??window.innerHeight)-l-a),h=o.bottom+a+l<=(c?.bottom??window.innerHeight)?o.bottom+a:o.top-l-a;n.style.top=`${A(h,d,u)}px`,n.style.left=`${A(o.right-s,a,Math.max(a,window.innerWidth-s-a))}px`,requestAnimationFrame(()=>n.classList.add("visible"));let p=g=>{let x=g.target;x&&(n.contains(x)||t.contains(x))||(g.stopPropagation(),st())};document.addEventListener("pointerdown",p,!0),It={button:t,menu:n,dispose:()=>{document.removeEventListener("pointerdown",p,!0),t.classList.remove("isOpen"),n.remove()}}}function st(){It?.dispose(),It=null}function Bs(){try{let t=Spicetify?.Menu;if(typeof t?.Item!="function")return;new t.Item("Liquid Lyrics Settings",!1,()=>qi(),Oh).register()}catch{}}function We(t){Ci.push(t),t()}function se(){for(let t of Ci)t();fp()}function fp(){document.querySelectorAll(`#${je} .ll-settings-subsection`).forEach(t=>{let e=Array.from(t.querySelectorAll(".ll-settings-row")).some(i=>!i.classList.contains("is-hidden")&&i.style.display!=="none");t.style.display=e?"":"none"})}var Os="liquid-lyrics:onboarding-done",Kr="liquid-lyrics-onboarding",Hs=240,Nt=7,Ai=304,gp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>',Fs='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>',mp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l8 8-8 8"/></svg>',Pt=[{anchor:".liquid-lyrics-panel.visible .ll-settings-btn",placement:"anchor",icon:Mi,eyebrow:"Welcome to Liquid Lyrics",title:"Everything is behind this gear",body:"Backgrounds, the song card, romanization, fonts, fullscreen - the whole lyrics page is yours to arrange, and every change applies straight away.",cta:"Next"},{anchor:".main-userWidget-box",placement:"anchor",icon:gp,title:"\u2026and here, from anywhere",body:"The same menu sits in Spotify's profile menu as \u201CLiquid Lyrics Settings\u201D. Handy once you have hidden the lyrics button, or when the page is closed.",cta:"Next"},{placement:"centre",icon:Fs,title:"The settings menu",body:"Every option lives in here, grouped and searchable. Changes save as you go.",cta:"Got it",onEnter:()=>{_i=!0,qi()}}],Ce=0,H=null,_i=!1,zt=null,Bt=null;function bp(){try{return localStorage.getItem(Os)==="1"}catch{return!0}}function Ds(){bp()||document.getElementById(Kr)||(yp(),window.setTimeout(()=>{document.getElementById(Kr)||document.querySelector(".liquid-lyrics-panel.visible")&&vp()},640))}function yp(){try{localStorage.setItem(Os,"1")}catch{}}function vp(){Ce=0,_i=!1,H=document.createElement("div"),H.id=Kr,H.className="ll-ob-root",document.body.appendChild(H),zt=()=>js(),window.addEventListener("resize",zt),Bt=t=>{t.key==="Escape"&&(t.preventDefault(),t.stopPropagation(),$r())},document.addEventListener("keydown",Bt,!0),Gr()}function Us(t){if(t.placement!=="anchor"||!t.anchor)return"centre";let e=document.querySelector(t.anchor)?.getBoundingClientRect();return e&&e.width>=1&&e.height>=1?"anchor":"centre"}function Gr(){if(!H)return;let t=Pt[Ce],e=Us(t);H.textContent="";let i=document.createElement("div");if(i.className="ll-ob-blocker",H.appendChild(i),e==="anchor"){let u=document.createElement("div");u.className="ll-ob-spot",H.appendChild(u)}let r=document.createElement("div");r.className=`ll-ob-card ll-ob-card--${e}`,r.style.setProperty("--ll-ob-card-w",`${Ai}px`);let n=document.createElement("div");n.className="ll-ob-arrow",r.appendChild(n);let o=document.createElement("div");if(o.className="ll-ob-dots",Pt.forEach((u,h)=>{let p=document.createElement("span");p.className=`ll-ob-dot${h===Ce?" is-active":""}`,o.appendChild(p)}),r.appendChild(o),t.eyebrow){let u=document.createElement("div");u.className="ll-ob-eyebrow",u.textContent=t.eyebrow,r.appendChild(u)}let a=document.createElement("div");a.className="ll-ob-title",a.insertAdjacentHTML("beforeend",t.icon),a.insertAdjacentText("beforeend",t.title),r.appendChild(a);let s=document.createElement("p");s.className="ll-ob-text",s.textContent=t.body,r.appendChild(s);let l=document.createElement("div");l.className="ll-ob-actions";let c=Ce===Pt.length-1;if(!c){let u=document.createElement("button");u.type="button",u.className="ll-ob-btn ll-ob-btn--ghost",u.textContent="Skip",u.addEventListener("click",$r),l.appendChild(u)}let d=document.createElement("button");if(d.type="button",d.className="ll-ob-btn ll-ob-btn--primary",d.insertAdjacentText("beforeend",t.cta),d.insertAdjacentHTML("beforeend",c?Fs:mp),d.addEventListener("click",()=>c?$r():wp(Ce+1)),l.appendChild(d),r.appendChild(l),e==="centre"){let u=document.createElement("div");u.className="ll-ob-centre",u.appendChild(r),H.appendChild(u)}else H.appendChild(r);js()}function js(){if(!H)return;let t=Pt[Ce],e=H.querySelector(".ll-ob-spot"),i=H.querySelector(".ll-ob-card"),r=H.querySelector(".ll-ob-arrow");if(!i||!r)return;let n=Us(t);if(n!==(i.classList.contains("ll-ob-card--anchor")?"anchor":"centre")){Gr();return}if(n!=="anchor")return;let o=document.querySelector(t.anchor).getBoundingClientRect();e&&(e.style.top=`${o.top-Nt}px`,e.style.left=`${o.left-Nt}px`,e.style.width=`${o.width+Nt*2}px`,e.style.height=`${o.height+Nt*2}px`);let a=16,s=Math.min(Math.max(a,o.right-Ai),Math.max(a,window.innerWidth-Ai-a));i.style.left=`${s}px`,i.style.top=`${o.bottom+Nt+12}px`,r.style.left=`${Math.min(Math.max(26,o.left+o.width/2-s),Ai-26)}px`}function wp(t){if(H){for(let e of H.querySelectorAll(".ll-ob-card, .ll-ob-spot"))e.classList.add("is-out");window.setTimeout(()=>{H&&(Ce=t,Pt[Ce].onEnter?.(),Gr())},Hs)}}function $r(){let t=H;if(t){H=null;for(let e of t.querySelectorAll(".ll-ob-card, .ll-ob-spot"))e.classList.add("is-out");_i&&le(),_i=!1,zt&&window.removeEventListener("resize",zt),Bt&&document.removeEventListener("keydown",Bt,!0),zt=null,Bt=null,window.setTimeout(()=>t.remove(),Hs)}}var Ot=`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`,xp=`
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
`,kp=`
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
`,Sp=`
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
`,Lp=`
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
`,Tp=`
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
`,Ri=class{constructor(e,i={}){m(this,"canvas");m(this,"gl");m(this,"halfFloatExt",null);m(this,"halfFloatLinearExt",null);m(this,"blurProgram");m(this,"blendProgram");m(this,"tintProgram");m(this,"warpProgram");m(this,"outputProgram");m(this,"positionBuffer");m(this,"texCoordBuffer");m(this,"sourceTexture");m(this,"blurFBO1");m(this,"blurFBO2");m(this,"currentAlbumFBO");m(this,"nextAlbumFBO");m(this,"warpFBO");m(this,"animationId",null);m(this,"lastFrameTime",0);m(this,"accumulatedTime",0);m(this,"isPlaying",!1);m(this,"isTransitioning",!1);m(this,"transitionStartTime",0);m(this,"_transitionDuration");m(this,"_warpIntensity");m(this,"_blurPasses");m(this,"_animationSpeed");m(this,"_targetAnimationSpeed");m(this,"_saturation");m(this,"_tintColor");m(this,"_tintIntensity");m(this,"_dithering");m(this,"_scale");m(this,"hasImage",!1);m(this,"attribs");m(this,"uniforms");m(this,"renderLoop",e=>{if(!this.isPlaying)return;let i=(e-this.lastFrameTime)/1e3;this.lastFrameTime=e,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*.05,this.accumulatedTime+=i*this._animationSpeed,this.render(this.accumulatedTime,e),this.animationId=requestAnimationFrame(this.renderLoop)});this.canvas=e;let r=e.getContext("webgl",{preserveDrawingBuffer:!0});if(!r)throw new Error("WebGL not supported");this.gl=r,this.halfFloatExt=r.getExtension("OES_texture_half_float"),this.halfFloatLinearExt=r.getExtension("OES_texture_half_float_linear"),this._warpIntensity=i.warpIntensity??1,this._blurPasses=i.blurPasses??8,this._animationSpeed=i.animationSpeed??1,this._targetAnimationSpeed=this._animationSpeed,this._transitionDuration=i.transitionDuration??1e3,this._saturation=i.saturation??1.5,this._tintColor=i.tintColor??[.157,.157,.235],this._tintIntensity=i.tintIntensity??.15,this._dithering=i.dithering??.008,this._scale=i.scale??1,this.blurProgram=this.createProgram(Ot,xp),this.blendProgram=this.createProgram(Ot,kp),this.tintProgram=this.createProgram(Ot,Sp),this.warpProgram=this.createProgram(Ot,Lp),this.outputProgram=this.createProgram(Ot,Tp),this.attribs={position:r.getAttribLocation(this.blurProgram,"a_position"),texCoord:r.getAttribLocation(this.blurProgram,"a_texCoord")},this.uniforms={blur:{resolution:r.getUniformLocation(this.blurProgram,"u_resolution"),texture:r.getUniformLocation(this.blurProgram,"u_texture"),offset:r.getUniformLocation(this.blurProgram,"u_offset")},blend:{texture1:r.getUniformLocation(this.blendProgram,"u_texture1"),texture2:r.getUniformLocation(this.blendProgram,"u_texture2"),blend:r.getUniformLocation(this.blendProgram,"u_blend")},warp:{texture:r.getUniformLocation(this.warpProgram,"u_texture"),time:r.getUniformLocation(this.warpProgram,"u_time"),intensity:r.getUniformLocation(this.warpProgram,"u_intensity")},tint:{texture:r.getUniformLocation(this.tintProgram,"u_texture"),tintColor:r.getUniformLocation(this.tintProgram,"u_tintColor"),tintIntensity:r.getUniformLocation(this.tintProgram,"u_tintIntensity")},output:{texture:r.getUniformLocation(this.outputProgram,"u_texture"),saturation:r.getUniformLocation(this.outputProgram,"u_saturation"),dithering:r.getUniformLocation(this.outputProgram,"u_dithering"),time:r.getUniformLocation(this.outputProgram,"u_time"),scale:r.getUniformLocation(this.outputProgram,"u_scale"),resolution:r.getUniformLocation(this.outputProgram,"u_resolution")}},this.positionBuffer=this.createBuffer(new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1])),this.texCoordBuffer=this.createBuffer(new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),this.sourceTexture=this.createTexture(),this.blurFBO1=this.createFramebuffer(128,128,!0),this.blurFBO2=this.createFramebuffer(128,128,!0),this.currentAlbumFBO=this.createFramebuffer(128,128,!0),this.nextAlbumFBO=this.createFramebuffer(128,128,!0),this.warpFBO=this.createFramebuffer(1,1,!0),this.resize()}get warpIntensity(){return this._warpIntensity}set warpIntensity(e){this._warpIntensity=Math.max(0,Math.min(1,e))}get blurPasses(){return this._blurPasses}set blurPasses(e){let i=Math.max(1,Math.min(40,Math.floor(e)));i!==this._blurPasses&&(this._blurPasses=i,this.hasImage&&this.reblurCurrentImage())}get animationSpeed(){return this._targetAnimationSpeed}set animationSpeed(e){this._targetAnimationSpeed=Math.max(.1,Math.min(5,e))}get transitionDuration(){return this._transitionDuration}set transitionDuration(e){this._transitionDuration=Math.max(0,Math.min(5e3,e))}get saturation(){return this._saturation}set saturation(e){this._saturation=Math.max(0,Math.min(3,e))}get tintColor(){return this._tintColor}set tintColor(e){let i=e.map(n=>Math.max(0,Math.min(1,n)));i.some((n,o)=>n!==this._tintColor[o])&&(this._tintColor=i,this.hasImage&&this.reblurCurrentImage())}get tintIntensity(){return this._tintIntensity}set tintIntensity(e){let i=Math.max(0,Math.min(1,e));i!==this._tintIntensity&&(this._tintIntensity=i,this.hasImage&&this.reblurCurrentImage())}get dithering(){return this._dithering}set dithering(e){this._dithering=Math.max(0,Math.min(.1,e))}get scale(){return this._scale}set scale(e){this._scale=Math.max(.01,Math.min(4,e))}setOptions(e){e.warpIntensity!==void 0&&(this.warpIntensity=e.warpIntensity),e.blurPasses!==void 0&&(this.blurPasses=e.blurPasses),e.animationSpeed!==void 0&&(this.animationSpeed=e.animationSpeed),e.transitionDuration!==void 0&&(this.transitionDuration=e.transitionDuration),e.saturation!==void 0&&(this.saturation=e.saturation),e.tintColor!==void 0&&(this.tintColor=e.tintColor),e.tintIntensity!==void 0&&(this.tintIntensity=e.tintIntensity),e.dithering!==void 0&&(this.dithering=e.dithering),e.scale!==void 0&&(this.scale=e.scale)}getOptions(){return{warpIntensity:this._warpIntensity,blurPasses:this._blurPasses,animationSpeed:this._targetAnimationSpeed,transitionDuration:this._transitionDuration,saturation:this._saturation,tintColor:this._tintColor,tintIntensity:this._tintIntensity,dithering:this._dithering,scale:this._scale}}loadImage(e){return new Promise((i,r)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,n),this.processNewImage(),i()},n.onerror=()=>r(new Error(`Failed to load image: ${e}`)),n.src=e})}loadImageElement(e){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),this.processNewImage()}loadImageData(e,i,r){this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,i,r,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e instanceof Uint8ClampedArray?new Uint8Array(e.buffer):e),this.processNewImage()}loadFromImageData(e){this.loadImageData(e.data,e.width,e.height)}async loadBlob(e){let i=await createImageBitmap(e);this.loadImageElement(i),i.close()}loadBase64(e){let i=e.startsWith("data:")?e:`data:image/png;base64,${e}`;return this.loadImage(i)}async loadArrayBuffer(e,i="image/png"){let r=new Blob([e],{type:i});return this.loadBlob(r)}loadGradient(e,i=135){let n=document.createElement("canvas");n.width=512,n.height=512;let o=n.getContext("2d");if(!o)return;let a=i*Math.PI/180,s=512/2-Math.cos(a)*512,l=512/2-Math.sin(a)*512,c=512/2+Math.cos(a)*512,d=512/2+Math.sin(a)*512,u=o.createLinearGradient(s,l,c,d);e.forEach((h,p)=>{u.addColorStop(p/(e.length-1),h)}),o.fillStyle=u,o.fillRect(0,0,512,512),this.loadImageElement(n)}processNewImage(){[this.currentAlbumFBO,this.nextAlbumFBO]=[this.nextAlbumFBO,this.currentAlbumFBO],this.blurSourceInto(this.nextAlbumFBO),this.hasImage=!0,this.isTransitioning=!0,this.transitionStartTime=performance.now()}reblurCurrentImage(){this.blurSourceInto(this.nextAlbumFBO)}blurSourceInto(e){let i=this.gl;i.useProgram(this.tintProgram),this.setupAttributes(),i.bindFramebuffer(i.FRAMEBUFFER,this.blurFBO1.framebuffer),i.viewport(0,0,128,128),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,this.sourceTexture),i.uniform1i(this.uniforms.tint.texture,0),i.uniform3fv(this.uniforms.tint.tintColor,this._tintColor),i.uniform1f(this.uniforms.tint.tintIntensity,this._tintIntensity),i.drawArrays(i.TRIANGLES,0,6),i.useProgram(this.blurProgram),this.setupAttributes(),i.uniform2f(this.uniforms.blur.resolution,128,128),i.uniform1i(this.uniforms.blur.texture,0);let r=this.blurFBO1,n=this.blurFBO2;for(let o=0;o<this._blurPasses;o++)i.bindFramebuffer(i.FRAMEBUFFER,n.framebuffer),i.viewport(0,0,128,128),i.bindTexture(i.TEXTURE_2D,r.texture),i.uniform1f(this.uniforms.blur.offset,o+.5),i.drawArrays(i.TRIANGLES,0,6),[r,n]=[n,r];i.bindFramebuffer(i.FRAMEBUFFER,e.framebuffer),i.viewport(0,0,128,128),i.bindTexture(i.TEXTURE_2D,r.texture),i.uniform1f(this.uniforms.blur.offset,0),i.drawArrays(i.TRIANGLES,0,6)}resize(){let e=this.canvas.width,i=this.canvas.height;this.warpFBO&&this.deleteFramebuffer(this.warpFBO),this.warpFBO=this.createFramebuffer(e,i,!0)}start(){this.isPlaying||(this.isPlaying=!0,this.lastFrameTime=performance.now(),requestAnimationFrame(this.renderLoop))}stop(){this.isPlaying=!1,this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null)}renderFrame(e){let i=performance.now();if(e!==void 0)this.render(e,i);else{let r=(i-this.lastFrameTime)/1e3;this.lastFrameTime=i,this._animationSpeed+=(this._targetAnimationSpeed-this._animationSpeed)*.05,this.accumulatedTime+=r*this._animationSpeed,this.render(this.accumulatedTime,i)}}dispose(){this.stop();let e=this.gl;e.deleteProgram(this.blurProgram),e.deleteProgram(this.blendProgram),e.deleteProgram(this.tintProgram),e.deleteProgram(this.warpProgram),e.deleteProgram(this.outputProgram),e.deleteBuffer(this.positionBuffer),e.deleteBuffer(this.texCoordBuffer),e.deleteTexture(this.sourceTexture),this.deleteFramebuffer(this.blurFBO1),this.deleteFramebuffer(this.blurFBO2),this.deleteFramebuffer(this.currentAlbumFBO),this.deleteFramebuffer(this.nextAlbumFBO),this.deleteFramebuffer(this.warpFBO)}render(e,i=performance.now()){let r=this.gl,n=this.canvas.width,o=this.canvas.height,a=1;if(this.isTransitioning){let l=i-this.transitionStartTime;a=Math.min(1,l/this._transitionDuration),a>=1&&(this.isTransitioning=!1)}let s;this.isTransitioning&&a<1?(r.useProgram(this.blendProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,this.blurFBO1.framebuffer),r.viewport(0,0,128,128),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.currentAlbumFBO.texture),r.uniform1i(this.uniforms.blend.texture1,0),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,this.nextAlbumFBO.texture),r.uniform1i(this.uniforms.blend.texture2,1),r.uniform1f(this.uniforms.blend.blend,a),r.drawArrays(r.TRIANGLES,0,6),s=this.blurFBO1.texture,r.useProgram(this.warpProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,this.warpFBO.framebuffer),r.viewport(0,0,n,o),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,s),r.uniform1i(this.uniforms.warp.texture,0),r.uniform1f(this.uniforms.warp.time,e),r.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),r.drawArrays(r.TRIANGLES,0,6),r.useProgram(this.outputProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,n,o),r.bindTexture(r.TEXTURE_2D,this.warpFBO.texture),r.uniform1i(this.uniforms.output.texture,0),r.uniform1f(this.uniforms.output.saturation,this._saturation),r.uniform1f(this.uniforms.output.dithering,this._dithering),r.uniform1f(this.uniforms.output.time,e),r.uniform1f(this.uniforms.output.scale,this._scale),r.uniform2f(this.uniforms.output.resolution,n,o),r.drawArrays(r.TRIANGLES,0,6)):(r.useProgram(this.warpProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,this.warpFBO.framebuffer),r.viewport(0,0,n,o),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.nextAlbumFBO.texture),r.uniform1i(this.uniforms.warp.texture,0),r.uniform1f(this.uniforms.warp.time,e),r.uniform1f(this.uniforms.warp.intensity,this._warpIntensity),r.drawArrays(r.TRIANGLES,0,6),r.useProgram(this.outputProgram),this.setupAttributes(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,n,o),r.bindTexture(r.TEXTURE_2D,this.warpFBO.texture),r.uniform1i(this.uniforms.output.texture,0),r.uniform1f(this.uniforms.output.saturation,this._saturation),r.uniform1f(this.uniforms.output.dithering,this._dithering),r.uniform1f(this.uniforms.output.time,e),r.uniform1f(this.uniforms.output.scale,this._scale),r.uniform2f(this.uniforms.output.resolution,n,o),r.drawArrays(r.TRIANGLES,0,6))}setupAttributes(){let e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),e.enableVertexAttribArray(this.attribs.position),e.vertexAttribPointer(this.attribs.position,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,this.texCoordBuffer),e.enableVertexAttribArray(this.attribs.texCoord),e.vertexAttribPointer(this.attribs.texCoord,2,e.FLOAT,!1,0,0)}createShader(e,i){let r=this.gl,n=r.createShader(e);if(!n)throw new Error("Failed to create shader");if(r.shaderSource(n,i),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS)){let o=r.getShaderInfoLog(n);throw r.deleteShader(n),new Error(`Shader compile error: ${o}`)}return n}createProgram(e,i){let r=this.gl,n=this.createShader(r.VERTEX_SHADER,e),o=this.createShader(r.FRAGMENT_SHADER,i),a=r.createProgram();if(!a)throw new Error("Failed to create program");if(r.attachShader(a,n),r.attachShader(a,o),r.linkProgram(a),!r.getProgramParameter(a,r.LINK_STATUS)){let s=r.getProgramInfoLog(a);throw r.deleteProgram(a),new Error(`Program link error: ${s}`)}return r.deleteShader(n),r.deleteShader(o),a}createBuffer(e){let i=this.gl,r=i.createBuffer();if(!r)throw new Error("Failed to create buffer");return i.bindBuffer(i.ARRAY_BUFFER,r),i.bufferData(i.ARRAY_BUFFER,e,i.STATIC_DRAW),r}createTexture(){let e=this.gl,i=e.createTexture();if(!i)throw new Error("Failed to create texture");return e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),i}createFramebuffer(e,i,r=!1){let n=this.gl,o=this.createTexture(),s=r&&this.halfFloatExt&&this.halfFloatLinearExt?this.halfFloatExt.HALF_FLOAT_OES:n.UNSIGNED_BYTE;n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e,i,0,n.RGBA,s,null);let l=n.createFramebuffer();if(!l)throw new Error("Failed to create framebuffer");return n.bindFramebuffer(n.FRAMEBUFFER,l),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),{framebuffer:l,texture:o}}deleteFramebuffer(e){this.gl.deleteFramebuffer(e.framebuffer),this.gl.deleteTexture(e.texture)}};var Ws=600,Ep=600,Vs=1600,Mp=160,Ve={canvasFilter:"brightness(62%) contrast(104%)",cssFilter:"blur(48px) saturate(150%) brightness(62%) contrast(104%)",warpIntensity:.5,blurPasses:6,animationSpeed:1,saturation:1.5,scale:1},Ke=class{constructor(e,i){this.variant=e;this.forcedMode=i;this.tiles=[];this.faces=[];this.imageLayer=null;this.kawarpLayers=[];this.useKawarpA=!0;this.kawarpSwapTimer=0;this.animatedSwapTimer=0;this.resizeSettleTimer=0;this.fadeOutTimer=0;this.forceVisible=!1;this.nextCoverInstant=!1;this.instantSwap=!1;this.pendingReveal=!1;this.resizeObserver=null;this.coverUrl="";this.useSetA=!0;this.lastAnimatedUrl="";this.lastKawarpUrl="";this.mode="";this.enabled=!0;this.lastKawarpOptions="";this.kawarpToken=0;this.animatedToken=0;this.el=document.createElement("div"),this.el.className=`liquid-lyrics-bg ll-bg-${e}`,this.el.setAttribute("aria-hidden","true"),i&&(this.el.style.setProperty("--ll-bg-canvas-filter",Ve.canvasFilter),this.el.style.setProperty("--ll-bg-filter",Ve.cssFilter),this.el.style.setProperty("--ll-bg-opacity","1"),this.el.style.setProperty("--ll-bg-scale","1"),this.el.style.setProperty("--ll-bg-spin-duration","30000ms"))}get activeMode(){let e=this.forcedMode??C().bgMode;return e==="transparent"&&this.forceVisible?Ga():e}setForcedVisible(e){this.forceVisible!==e&&(this.forceVisible=e,this.render())}setCover(e,i=!1){if(!e)return;let r=i||this.nextCoverInstant;this.nextCoverInstant=!1,e!==this.coverUrl&&(this.coverUrl=e,this.instantSwap=r,r&&this.beginHiddenSwap(),this.render())}beginHiddenSwap(){this.pendingReveal=!0,this.suppressTransitions(),this.el.classList.remove("is-visible")}finishHiddenSwap(){this.pendingReveal&&(this.pendingReveal=!1,requestAnimationFrame(()=>this.el.classList.add("is-visible")))}markNextCoverInstant(){this.nextCoverInstant=!0}suppressTransitions(){this.el.classList.add("ll-bg-instant"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.el.classList.remove("ll-bg-instant")))}apply(){this.render()}setEnabled(e){if(this.enabled!==e&&(this.enabled=e,this.kawarpLayers.length!==0)){if(!e){for(let i of this.kawarpLayers)i.renderer.stop();return}for(let i of this.kawarpLayers)i.canvas.classList.contains("is-front")&&i.renderer.start()}}destroy(){window.clearTimeout(this.fadeOutTimer),window.clearTimeout(this.animatedSwapTimer),this.animatedToken++,this.teardownKawarp(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.el.remove()}render(){let e=this.activeMode;if(e!==this.mode){let i=this.mode;if(this.mode=e,window.clearTimeout(this.fadeOutTimer),e==="transparent"&&i!==""){this.el.classList.remove("is-visible"),this.pendingReveal=!1,this.fadeOutTimer=window.setTimeout(()=>{this.rebuild(e),this.el.dataset.mode=e,this.el.classList.add("is-visible")},Ep);return}this.rebuild(e)}switch(this.el.dataset.mode=e,this.pendingReveal||this.el.classList.add("is-visible"),e){case"transparent":case"color":this.finishHiddenSwap();break;case"image":this.renderImage(),this.finishHiddenSwap();break;case"animated":this.renderAnimated();break;case"kawarp":this.renderKawarp();break}}rebuild(e){if(window.clearTimeout(this.animatedSwapTimer),this.animatedToken++,this.teardownKawarp(),this.el.replaceChildren(),this.tiles=[],this.faces=[],this.imageLayer=null,this.lastAnimatedUrl="",this.lastKawarpUrl="",e==="image"){this.imageLayer=document.createElement("div"),this.imageLayer.className="ll-bg-image",this.el.appendChild(this.imageLayer);return}if(e==="animated"){for(let i=0;i<2;i++){let r=document.createElement("div");r.className="ll-bg-tile";for(let n=0;n<2;n++){let o=document.createElement("div");o.className="ll-bg-tile-face",r.appendChild(o),this.faces.push(o)}this.el.appendChild(r),this.tiles.push(r)}return}if(e==="kawarp")for(let i=0;i<2;i++){let r=document.createElement("canvas");r.className="ll-bg-canvas",this.el.appendChild(r)}}renderImage(){let e=hi(this.coverUrl,this.activeMode);this.imageLayer&&(this.imageLayer.style.backgroundImage=e?`url("${Ks(e)}")`:"")}renderAnimated(){let e=hi(this.coverUrl,this.activeMode);if(this.faces.length<4){this.finishHiddenSwap();return}if(!e){this.animatedToken++,window.clearTimeout(this.animatedSwapTimer);for(let r of this.faces)r.classList.remove("active","is-front");this.lastAnimatedUrl="",this.finishHiddenSwap();return}if(e===this.lastAnimatedUrl){this.finishHiddenSwap();return}this.lastAnimatedUrl=e;let i=this.instantSwap;this.instantSwap=!1,this.crossfadeAnimated(e,i)}async crossfadeAnimated(e,i){let r=++this.animatedToken;try{await Cp(e)}catch{r===this.animatedToken&&(this.lastAnimatedUrl=""),this.finishHiddenSwap();return}if(r!==this.animatedToken||this.faces.length<4)return;let n=this.faces.filter((l,c)=>c%2===0),o=this.faces.filter((l,c)=>c%2===1),a=this.useSetA?n:o,s=this.useSetA?o:n;this.primeAnimatedSwap(a),i&&this.suppressTransitions();for(let l of a)l.style.backgroundImage=`url("${Ks(e)}")`,l.classList.add("active","is-front");for(let l of s)l.classList.remove("is-front");this.useSetA=!this.useSetA,this.finishHiddenSwap(),window.clearTimeout(this.animatedSwapTimer),this.animatedSwapTimer=window.setTimeout(()=>{if(r===this.animatedToken)for(let l of s)l.classList.remove("active")},Ws+80)}primeAnimatedSwap(e){window.clearTimeout(this.animatedSwapTimer);for(let i of this.faces)i.style.setProperty("transition","none","important");for(let i of e)i.classList.remove("active","is-front");this.el.offsetWidth;for(let i of this.faces)i.style.removeProperty("transition")}renderKawarp(){let e=Array.from(this.el.querySelectorAll(".ll-bg-canvas"));if(e.length<2){this.finishHiddenSwap();return}if(this.kawarpLayers.length===0){try{this.kawarpLayers=e.map(n=>({canvas:n,renderer:new Ri(n,{...this.kawarpOptions(),transitionDuration:0})}))}catch(n){console.warn("[Liquid Lyrics] Kawarp unavailable, falling back to the animated background.",n),this.disposeKawarpLayers(),this.mode="animated",this.rebuild("animated"),this.el.dataset.mode="animated",this.renderAnimated();return}for(let n of this.kawarpLayers)this.sizeKawarpCanvas(n);this.observeResize(),this.lastKawarpOptions=JSON.stringify(this.kawarpOptions()),this.enabled&&this.kawarpLayers[0].renderer.start()}else{let n=JSON.stringify(this.kawarpOptions());if(n!==this.lastKawarpOptions){this.lastKawarpOptions=n;for(let o of this.kawarpLayers)o.renderer.setOptions({...this.kawarpOptions(),transitionDuration:0})}}let i=hi(this.coverUrl,this.activeMode);if(!i||i===this.lastKawarpUrl){this.finishHiddenSwap();return}this.lastKawarpUrl=i;let r=this.instantSwap;this.instantSwap=!1,this.crossfadeKawarp(i,r)}async crossfadeKawarp(e,i=!1){let r=++this.kawarpToken,n;try{n=await this.decodeImage(e)}catch{r===this.kawarpToken&&(this.lastKawarpUrl=""),this.finishHiddenSwap();return}if(r!==this.kawarpToken||this.kawarpLayers.length<2)return;let o=this.useKawarpA?this.kawarpLayers[0]:this.kawarpLayers[1],a=this.useKawarpA?this.kawarpLayers[1]:this.kawarpLayers[0];this.sizeKawarpCanvas(o),o.renderer.loadImageElement(n),this.enabled&&o.renderer.start(),await $s(),await $s(),r===this.kawarpToken&&(i&&this.suppressTransitions(),o.canvas.classList.add("active","is-front"),a.canvas.classList.remove("is-front"),this.useKawarpA=!this.useKawarpA,this.finishHiddenSwap(),window.clearTimeout(this.kawarpSwapTimer),this.kawarpSwapTimer=window.setTimeout(()=>{r===this.kawarpToken&&(a.canvas.classList.remove("active"),a.renderer.stop())},Ws+80))}async decodeImage(e){let i=new Image;return i.crossOrigin="anonymous",i.src=e,await i.decode(),i}kawarpOptions(){if(this.forcedMode)return{warpIntensity:Ve.warpIntensity,blurPasses:Ve.blurPasses,animationSpeed:Ve.animationSpeed,transitionDuration:0,saturation:Ve.saturation,scale:Ve.scale};let e=C();return{warpIntensity:A(e.bgWarpIntensity,0,100)/100,blurPasses:Math.max(1,Math.round(A(e.bgBlur,0,150)/150*40)),animationSpeed:A(e.bgRotationSpeed,0,400)/100,transitionDuration:0,saturation:A(e.bgSaturation,0,500)/100,scale:A(A(e.bgScale,10,400)/100,.01,4)}}observeResize(){this.resizeObserver||(this.resizeObserver=new ResizeObserver(()=>{window.clearTimeout(this.resizeSettleTimer),this.resizeSettleTimer=window.setTimeout(()=>{for(let e of this.kawarpLayers)this.sizeKawarpCanvas(e)},Mp)}),this.resizeObserver.observe(this.el))}sizeKawarpCanvas(e){let i=this.el.clientWidth,r=this.el.clientHeight;if(i<2||r<2)return;let n=Math.min(window.devicePixelRatio||1,2),o=Math.max(i,r)*n,a=o>Vs?Vs/o*n:n,s={width:Math.round(i*a),height:Math.round(r*a)};if(!(e.canvas.width===s.width&&e.canvas.height===s.height)){e.canvas.width=s.width,e.canvas.height=s.height,e.renderer.resize();try{e.renderer.renderFrame()}catch{}}}teardownKawarp(){this.kawarpToken++,window.clearTimeout(this.kawarpSwapTimer),this.kawarpSwapTimer=0,window.clearTimeout(this.resizeSettleTimer),this.resizeSettleTimer=0,this.disposeKawarpLayers(),this.resizeObserver?.disconnect(),this.resizeObserver=null}disposeKawarpLayers(){for(let e of this.kawarpLayers)try{e.renderer.stop(),e.renderer.dispose()}catch{}this.kawarpLayers=[],this.useKawarpA=!0}};function Ks(t){return t.replace(/["\\]/g,"\\$&").replace(/\r?\n/g,"")}function Cp(t){let e=new Image;return e.src=t,e.decode()}function $s(){return new Promise(t=>requestAnimationFrame(()=>t()))}var qp=460,Ap=520;var Xr="ll-lyrics-arriving",_p=800,B="liquid-lyrics-panel",ol="liquid-lyrics-song-card-visible";var Ht="liquify-bg-mode",Rp=["liquify-floating-player","glowify-floating-player"],Ut="liquid-lyrics:romanization",Ip="https://github.com/NMWplays/Liquid-Lyrics",Np="https://discord.gg/xGUq5mhWKA",Pp=500,N=null,rn=null,dt=null,Jr=0;var Ge=null,Ii=null,Zr=0,Gs="",Ys="",Ni=-1,Qr=-1,Xs=!1,Js=!1,Zs=!1,Qs=!1,Pi=!0,ct,qe=null,ce=null,el=!1;function ut(){let t=document.getElementById(B);if(t)return t;let e=document.createElement("div");e.id=B,e.className="liquid-lyrics-panel";let i=document.createElement("div");i.className="liquid-lyrics-glass-bg",ce=new Ke("panel");let r=Up(),n=document.createElement("div");n.className="liquid-lyrics-header";let o=document.createElement("span");o.className="liquid-lyrics-title",o.textContent="Liquid Lyrics";let a=document.createElement("div");a.className="ll-header-actions",a.append(Dp(),il("ll-header-btn ll-github-btn",Hp,"Star on GitHub",Ip),il("ll-header-btn ll-discord-btn",Fp,"Join the Discord",Np)),n.append(o,a);let s=document.createElement("div");s.className="liquid-lyrics-view";let l=jp(),c=document.createElement("div");c.className="liquid-lyrics-content",s.append(l,c);let d=Yp();return e.append(ce.el,i,r,n,s,d),tn(e),gn(e),fn(e),(document.querySelector(".Root__main-view")??document.body).appendChild(e),N=new Le({container:c,variant:"panel",virtualize:!0,renderBackgrounds:!0,dotLiftPx:12,onRomanizationAvailability:h=>{e.classList.toggle("ll-has-romanization",h),J()}}),Ae(),J(),Xs||(Xs=!0,document.addEventListener("fullscreenchange",mf)),Zs||(Zs=!0,window.addEventListener(Ut,()=>{N?.setRomanized(Z(),O()),J()})),Qs||(Qs=!0,window.addEventListener(at,()=>{De()?(N?.setEnabled(!1),ln()):O()&&(N?.setEnabled(!0),sn())})),sf(),xs(e,()=>pt(e)),el||(el=!0,window.addEventListener(ne,()=>{let h=document.getElementById(B);h&&tn(h),ce?.apply(),dt&&dt.style!==C().noLyricsView&&ht(dt.message,dt.allowCreate),Ue()})),e}function Oi(){let t=ut();Pi=!0,dn(t),t.querySelector(".liquid-lyrics-content")?.classList.remove(Xr),t.classList.add("visible"),ce?.markNextCoverInstant(),Ae(),J(),N?.setEnabled(!De()),ce?.setEnabled(!0),sn(),fn(t),Ds();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let r=i;r.id===B||!r.style||(r.dataset.liquidHidden===void 0&&(r.dataset.liquidHidden=`${r.style.opacity}|${r.style.pointerEvents}`),r.style.opacity="0",r.style.pointerEvents="none")}}function Hi(){let t=document.getElementById(B);if(!t)return;t.classList.remove("visible"),N?.setEnabled(!1),ce?.setEnabled(!1),ln(),le(),Wi(t),pn(),Ue();let e=t.closest(".Root__main-view");if(e)for(let i of Array.from(e.children)){let r=i;if(r.id===B||r.dataset.liquidHidden===void 0)continue;let[n="",o=""]=r.dataset.liquidHidden.split("|");r.style.opacity=n,r.style.pointerEvents=o,delete r.dataset.liquidHidden}}function Fi(){O()?Hi():Oi()}function O(){return document.getElementById(B)?.classList.contains("visible")??!1}function al(t=O()){let e=ut();t&&Oi(),hn(e,"fullscreen"),Ui(e)}function nn(t){let e=ut();if(N){if(dt=null,rn===t&&N.hasLyrics){N.setEnabled(O()&&!De()),Ae();return}if(e.dataset.emptyStyle){let i=sl(e,()=>{delete e.dataset.emptyStyle}),r=++Jr,n=()=>{r===Jr&&(tl(t),zp())};i?i.finished.then(n,n):n();return}tl(t)}}function zp(){let t=document.querySelector(`#${B} .liquid-lyrics-content`);t&&(t.classList.remove(Xr),t.offsetWidth,t.classList.add(Xr))}function tl(t){if(!N)return;rn=t,N.setLyrics(t);let e=Z();N.setRomanized(e,e!=="off"),N.setEnabled(O()&&!De()),Ae(),J()}function ht(t,e=!1){let i=ut();if(!N)return;if(Jr++,rn=null,N.setLyrics(null),Ae(),!e&&Di(t)){N.container.appendChild(an()),N.resetScroll(),i.classList.remove("ll-has-romanization"),J();return}let r=document.createElement("div");r.className="liquid-lyrics-empty";let n=e?C().noLyricsView:"message";if(r.dataset.style=n,dt={message:t,allowCreate:e,style:n},n==="vinyl")r.appendChild(Bp());else{let o=document.createElement("div");o.className="ll-empty-icon",o.innerHTML=on,r.appendChild(o)}if(n==="message"){let o=document.createElement("div");o.className="ll-empty-message",o.textContent=t,r.appendChild(o)}if(e&&n!=="vinyl"){let o=document.createElement("button");o.type="button",o.className="ll-empty-create-btn",o.textContent="Create your own sync",o.addEventListener("click",()=>At()),r.appendChild(o)}N.container.appendChild(r),N.resetScroll(),sl(i,()=>{i.dataset.emptyStyle=n}),i.classList.remove("ll-has-romanization"),J()}function sl(t,e){let i=t.querySelector(".liquid-lyrics-song-card"),r=i?.getBoundingClientRect();if(e(),!i||!r||r.width<1||typeof i.animate!="function")return null;let n=i.getBoundingClientRect();if(n.width<1)return null;let o=r.left-n.left,a=r.top-n.top;return Math.abs(o)<1&&Math.abs(a)<1&&Math.abs(r.width-n.width)<1?null:i.animate([{transform:`translate(${o}px, ${a}px)`,width:`${r.width}px`},{transform:"none",width:`${n.width}px`}],{duration:Ap,easing:"cubic-bezier(0.34, 1.42, 0.64, 1)"})}function Bp(){let t=document.createElement("div");t.className="ll-empty-vinyl",t.setAttribute("aria-hidden","true");let e=document.createElement("div");e.className="ll-vinyl-disc";let i=document.createElement("img");i.className="ll-vinyl-cover",i.alt="",i.decoding="async";let r=gl().cover;r&&(i.src=r);let n=document.createElement("div");n.className="ll-vinyl-label";let o=document.createElement("div");return o.className="ll-vinyl-hole",n.appendChild(o),e.append(i,n),t.appendChild(e),t}var ll={shuffle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4"/><path d="M3 7h3.4c2.1 0 3.2 1.1 4.5 3.3l2.2 3.7c1.1 1.9 2.1 3 4.1 3H21"/><path d="M17 21h4v-4"/><path d="M3 17h3.6c1.7 0 2.7-.7 3.8-2.3"/><path d="M13.7 8.8C14.7 7.6 15.7 7 17.2 7H21"/></svg>',previous:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8L18.6 12 8 5.6Z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5h3v14h-3z"/><path d="M13.5 5h3v14h-3z"/></svg>',next:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z"/></svg>',repeat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8 17 10.8"/><path d="M3 11V8.8a2 2 0 0 1 2-2h16"/><path d="M7 21.2 3 17.2 7 13.2"/><path d="M21 13v2.2a2 2 0 0 1-2 2H3"/></svg>',cover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.4"/><circle cx="9" cy="10" r="1.4"/><path d="m5.8 17 4.5-4.5 2.7 2.7 2-2 3.2 3.8"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>',fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',cinema:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.4"/><path d="M3 9.2h18"/><path d="m7.2 5-1.7 4.2"/><path d="M12 5l-1.7 4.2"/><path d="m16.8 5-1.7 4.2"/></svg>',animatedBg:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M5 9.4c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/><path d="M5 15c2.3-2.6 4.7-2.6 7 0s4.7 2.6 7 0"/></svg>',edit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z"/><path d="M13.4 6.6l3 3"/></svg>',cardSide:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v17"/><path d="M8.4 8.5 4.6 12l3.8 3.5"/><path d="M15.6 8.5 19.4 12l-3.8 3.5"/></svg>'},on='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/></svg>',en=[78,54,88,62,71,45,83,58,66,90,49,74,61,85,52,69,80,57],Op=420;function Di(t){return t.toLowerCase().includes("loading")}function cl(t,e){let i=Math.max(4,Math.floor(t/e));return Array.from({length:i},(r,n)=>en[n%en.length])}function an(t=en){let e=document.createElement("div");return e.className="liquid-lyrics-skeleton",e.setAttribute("aria-label","Searching for lyrics"),e.setAttribute("role","status"),t.forEach((i,r)=>{let n=document.createElement("div");n.className="ll-skeleton-row",n.style.width=`${i}%`;let o=(t.length-1-r)/Math.max(1,t.length-1);n.style.animationDelay=`-${Math.round(o*Op)}ms`,e.appendChild(n)}),e}var Hp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.35 5.9.86-4.27 4.16 1.01 5.88L12 16.87l-5.24 2.78 1.01-5.88L3.5 9.61l5.9-.86z"/></svg>',Fp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13 13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.197.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';function Dp(){let t=document.createElement("button");return t.type="button",t.className="ll-header-btn ll-settings-btn",t.setAttribute("aria-label","Liquid Lyrics settings"),t.innerHTML=Mi,t.addEventListener("click",e=>{e.stopPropagation(),Is()}),z(t,"Settings"),t}function il(t,e,i,r){let n=document.createElement("button");return n.type="button",n.className=t,n.setAttribute("aria-label",i),n.innerHTML=e,n.addEventListener("click",o=>{o.stopPropagation(),window.open(r,"_blank")}),z(n,i),n}function Up(){let t=document.createElement("div");return t.className="liquid-lyrics-transparent-controls",t.setAttribute("aria-hidden","true"),t}function dl(){let t=document.createElement("div");return t.className="ll-song-card-controls",t.append(te("ll-song-card-btn ll-song-card-shuffle","shuffle","Shuffle",()=>Ft(["toggleShuffle"])),te("ll-song-card-btn","previous","Previous",()=>Ft(["back","previous","skipToPrevious"])),te("ll-song-card-btn ll-song-card-play","play","Play",()=>{Ft(["togglePlay"]),window.setTimeout(Ae,60)}),te("ll-song-card-btn","next","Next",()=>Ft(["next","skipToNext"])),te("ll-song-card-btn ll-song-card-repeat","repeat","Repeat",()=>Ft(["toggleRepeat"]))),t}function jp(){let t=document.createElement("aside");t.className="liquid-lyrics-song-card";let e=document.createElement("div");e.className="ll-song-card-cover-wrap";let i=document.createElement("img");i.className="ll-song-card-cover",i.alt="",i.decoding="async",i.loading="lazy";let r=document.createElement("div");r.className="ll-song-card-overlay",e.append(i,r);let n=dl(),o=document.createElement("div");o.className="playback-bar ll-song-card-progress",o.innerHTML='<span class="playback-bar__progress-time ll-card-time ll-card-current">0:00</span><div class="playback-progressbar ll-card-progress-control"><div class="progress-bar ll-card-progress-track" role="slider" aria-label="Song progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="progress-bar__bg ll-card-progress-bg"><div class="progress-bar__fg ll-card-progress-fill"></div></div><div class="ll-card-progress-thumb"></div><div class="ll-card-preview-time">0:00</div></div></div><span class="playback-bar__progress-time ll-card-time ll-card-duration">0:00</span>';let a=Vp(),s=document.createElement("div");s.className="ll-song-card-info";let l=document.createElement("div");l.className="ll-song-card-title";let c=document.createElement("button");c.type="button",c.className="ll-song-card-link ll-song-card-album",z(c,"Open album");let d=document.createElement("button");return d.type="button",d.className="ll-song-card-link ll-song-card-artist",z(d,"Open artist"),s.append(l,c,d),t.append(e,n,o,s,a),Ge={card:t,cover:i,heart:a,title:l,album:c,artist:d,playButton:t.querySelector(".ll-song-card-play"),shuffleButton:t.querySelector(".ll-song-card-shuffle"),repeatButton:t.querySelector(".ll-song-card-repeat"),progressTrack:o.querySelector(".ll-card-progress-track"),progressFill:o.querySelector(".ll-card-progress-fill"),progressThumb:o.querySelector(".ll-card-progress-thumb"),currentTime:o.querySelector(".ll-card-current"),durationTime:o.querySelector(".ll-card-duration")},Jp(Ge),t}var Wp="M12 20.7 4.6 13.3a5 5 0 0 1 7.4-6.7 5 5 0 0 1 7.4 6.7Z";function Vp(){let t=document.createElement("button");return t.type="button",t.className="ll-song-card-btn ll-song-card-heart",t.setAttribute("aria-label","Save to your Liked Songs"),t.innerHTML=`<span class="ll-heart-whole">${Yr()}</span><span class="ll-heart-half ll-heart-half-left">${Yr()}</span><span class="ll-heart-half ll-heart-half-right">${Yr()}</span>`,t.addEventListener("click",e=>{e.stopPropagation();let i=ul();$p()&&(t.classList.remove("ll-heart-breaking","ll-heart-popping"),t.offsetWidth,t.classList.add(i?"ll-heart-breaking":"ll-heart-popping"),window.setTimeout(()=>t.classList.remove("ll-heart-breaking","ll-heart-popping"),_p),window.setTimeout(hl,120))}),z(t,"Save to your Liked Songs"),t}var Kp="2.3 3.95 19.4 17.75";function Yr(){return`<svg viewBox="${Kp}" aria-hidden="true"><path d="${Wp}"/></svg>`}function ul(){let t=Spicetify.Player;try{if(typeof t?.getHeart=="function")return!!t.getHeart()}catch{}return!1}function $p(){let t=Spicetify.Player;try{if(typeof t?.toggleHeart=="function")return t.toggleHeart(),!0}catch{}return!1}function hl(){let t=Ge;if(!t)return;let e=ul();t.heart.classList.toggle("active",e),t.heart.setAttribute("aria-pressed",String(e));let i=e?"Remove from your Liked Songs":"Save to your Liked Songs";t.heart.dataset.tooltip=i,t.heart.setAttribute("aria-label",i)}function Gp(t){let e=Ge;if(!e)return;let i=e.card,r=document.getElementById(B),n=i.querySelector(".ll-song-card-overlay"),o=i.querySelector(".ll-song-card-controls"),a=i.querySelector(".ll-song-card-progress"),s=i.querySelector(".ll-song-card-info");if(!n||!o||!a||!s)return;r?.querySelector(".liquid-lyrics-control-pill")?.classList.toggle("ll-pill-has-transport",!!(r&&pt(r)));let c=e.heart;if(t==="cover"){c.parentElement!==n&&n.append(c,a,o);return}c.parentElement!==i&&i.appendChild(c),o.parentElement!==i&&i.insertBefore(o,s),a.parentElement!==i&&i.insertBefore(a,s)}function Yp(){let t=document.createElement("div");t.className="liquid-lyrics-control-pill";let e=dl();e.classList.add("ll-pill-transport");let i=document.createElement("span");return i.className="ll-pill-divider",i.setAttribute("aria-hidden","true"),t.append(e,i),t.append(te("ll-control-btn ll-card-toggle","cover","Song card",lf),te("ll-control-btn ll-card-side-toggle","cardSide","Song card side",df),te("ll-control-btn ll-bg-toggle","animatedBg","Animated background",cf),te("ll-control-btn ll-roman-toggle","roman","Romanization",uf),te("ll-control-btn ll-edit-toggle","edit","Create / edit sync",()=>At()),te("ll-control-btn ll-cinema-toggle","cinema","Cinema mode",pf),te("ll-control-btn ll-fullscreen-toggle","fullscreen","Fullscreen",ff)),t}function te(t,e,i,r){let n=document.createElement("button");return n.type="button",n.className=t,n.dataset.icon=e,n.setAttribute("aria-label",i),n.innerHTML=ll[e],n.addEventListener("click",o=>{o.stopPropagation(),r()}),z(n,i),n}function pl(t,e){!t||t.dataset.icon===e||(t.dataset.icon=e,t.innerHTML=ll[e])}function Ae(){let t=Ge;if(!t)return;let e=gl();e.cover?(t.cover.src!==e.cover&&(t.cover.src=e.cover),t.card.classList.remove("ll-no-cover")):(t.cover.removeAttribute("src"),t.card.classList.add("ll-no-cover")),ce?.setCover(e.cover),t.title.textContent=e.title,t.album.textContent=e.album,t.album.disabled=!e.albumUri,t.album.onclick=()=>rl(e.albumUri),t.artist.textContent=e.artist,t.artist.disabled=!e.artistUri,t.artist.onclick=()=>rl(e.artistUri),jt(),Wt()}function jt(){if(!Ge)return;let e=ee();document.getElementById(B)?.classList.toggle("ll-playing",e);let i=document.getElementById(B),r=l=>Array.from(i?.querySelectorAll(l)??[]),n=e?"Pause":"Play";for(let l of r(".ll-song-card-play"))pl(l,e?"pause":"play"),l.setAttribute("aria-label",n),l.dataset.tooltip=n;let o=of();for(let l of r(".ll-song-card-shuffle"))$e(l,o);hl();let a=af(),s=a==="track"?"Repeat one":a==="context"?"Repeat all":"Repeat";for(let l of r(".ll-song-card-repeat"))$e(l,a!=="off"),l.classList.toggle("ll-repeat-one",a==="track"),l.setAttribute("aria-label",s),l.dataset.tooltip=s}function sn(){Ii||(Zr=0,Ni=-1,Qr=-1,Ii=nt(Xp),jt(),Wt())}function ln(){Ii?.(),Ii=null}function Xp(t,e){Wt(t),e-Zr>=Pp&&(Zr=e,jt())}function Wt(t=fl()){let e=Ge;if(!e)return;let i=Y(),r=i>0?Bi(t/i):0;if(!e.progressTrack.classList.contains("ll-previewing")&&Math.abs(r-Ni)>2e-5){Ni=r,e.progressFill.style.transform=`scaleX(${r.toFixed(5)})`,e.progressThumb.style.left=`${(r*100).toFixed(3)}%`;let s=Math.round(r*100);s!==Qr&&(Qr=s,e.progressTrack.setAttribute("aria-valuenow",String(s)),e.progressTrack.setAttribute("aria-valuetext",`${Dt(t)} of ${Dt(i)}`))}let o=Dt(t);o!==Gs&&(Gs=o,e.currentTime.textContent=o);let a=Dt(i);a!==Ys&&(Ys=a,e.durationTime.textContent=a)}function fl(){return vf(Spicetify.Player?.getProgress?.(),0)}function Jp(t){let e=t.progressTrack,i=e.querySelector(".ll-card-preview-time"),r=0,n=0,o=d=>{let u=e.getBoundingClientRect();return Bi((d.clientX-u.left)/Math.max(1,u.width))},a=d=>{let u=Y();u<=0||(e.classList.add("ll-previewing"),i&&(i.textContent=Dt(u*d),i.style.left=`${d*100}%`),t.progressFill.style.transform=`scaleX(${d.toFixed(4)})`,t.progressThumb.style.left=`${(d*100).toFixed(2)}%`)},s=d=>(n=d,r||(r=requestAnimationFrame(()=>{r=0,a(n)})),d),l=()=>{e.dataset.dragging!=="true"&&(e.classList.remove("ll-previewing"),r&&(cancelAnimationFrame(r),r=0),Ni=-1,Wt())},c=d=>{let u=Y();if(u<=0)return;let h=s(o(d));ke(u*h)};e.addEventListener("pointerenter",d=>s(o(d))),e.addEventListener("pointermove",d=>s(o(d))),e.addEventListener("pointerleave",l),e.addEventListener("blur",l),e.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),e.dataset.dragging="true",e.setPointerCapture?.(d.pointerId),s(o(d));let u=p=>s(o(p)),h=p=>{c(p),delete e.dataset.dragging,l(),e.releasePointerCapture?.(d.pointerId),window.removeEventListener("pointermove",u),window.removeEventListener("pointerup",h)};window.addEventListener("pointermove",u),window.addEventListener("pointerup",h,{once:!0})}),e.addEventListener("keydown",d=>{let u=Y();if(u<=0)return;let h=fl(),p=d.shiftKey?15e3:5e3;d.key==="ArrowLeft"?(d.preventDefault(),ke(Math.max(0,h-p))):d.key==="ArrowRight"&&(d.preventDefault(),ke(Math.min(u,h+p)))})}function gl(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},i=Array.isArray(t?.artists)?t.artists.map(n=>n?.name).filter(Boolean).join(", "):"",r=Array.isArray(t?.artists)?t.artists.find(n=>n?.uri):null;return{title:t?.name||e.title||e.track_name||"Unknown track",artist:i||e.artist_name||e.artist||e.album_artist_name||"Unknown artist",album:t?.album?.name||e.album_title||e.album_name||"Unknown album",cover:Zp(t,e),artistUri:r?.uri||rf(e.artist_uri||e.artist_uris||""),albumUri:t?.album?.uri||e.album_uri||""}}function Zp(t,e){let i=[e.image_xlarge_url,e.image_large_url,e.image_url,e.album_image_url,e.cover_url,t?.album?.images?.[0]?.url,t?.images?.[0]?.url];for(let r of i){let n=Qp(String(r??""));if(n)return ef(n)}return tf()}function Qp(t){return t?t.startsWith("spotify:image:")?t.replace("spotify:image:","https://i.scdn.co/image/"):t:""}function ef(t){return t.replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function tf(){return document.querySelector(".main-nowPlayingView-coverArt img.cover-art-image, .main-nowPlayingView-coverArtContainer img.main-image-image")?.src||""}function rf(t){return String(t||"").split(",")[0]?.split(";")[0]?.trim()||""}function rl(t){let e=nf(t);if(!e)return;let i=Spicetify.Platform?.History;typeof i?.push=="function"&&(i.push(e),Hi())}function nf(t){let e=String(t||"").split(":");if(e.length<3||e[0]!=="spotify")return"";let i=e[1],r=e[2];return!r||!["album","artist","track","playlist"].includes(i)?"":`/${i}/${r}`}function of(){let t=Spicetify.Player;if(typeof t?.getShuffle=="function")return!!t.getShuffle();let e=t?.data??{};return!!(e.shuffle??e.shuffling??e.options?.shuffling??e.playback_options?.shuffling??e.context?.metadata?.shuffle)}function af(){let t=Spicetify.Player,e=t?.data??{},i=typeof t?.getRepeat=="function"?t.getRepeat():e.repeat??e.repeatMode??e.repeat_mode??e.options?.repeat??e.playback_options?.repeat??e.context?.metadata?.repeat;if(e.options?.repeatingTrack||e.playback_options?.repeating_track)return"track";if(e.options?.repeatingContext||e.playback_options?.repeating_context)return"context";if(typeof i=="number")return i===2?"track":i===1?"context":"off";let r=String(i??"").toLowerCase();return r.includes("track")||r.includes("song")||r==="one"?"track":r.includes("context")||r.includes("all")||r==="playlist"||r==="on"?"context":"off"}function sf(){Js||(Js=!0,["songchange","onplaypause","onqueuechange"].forEach(t=>{try{Spicetify.Player?.addEventListener?.(t,()=>{jt(),Wt()})}catch{}}))}function Ft(t){let e=Spicetify.Player;for(let i of t)if(typeof e?.[i]=="function"){e[i](),window.setTimeout(Ae,80),window.setTimeout(jt,180);return}}function Dt(t){let e=Math.max(0,Math.floor(t/1e3)),i=Math.floor(e/60),r=e%60;return`${i}:${String(r).padStart(2,"0")}`}function ml(){return document.getElementById(B)?.dataset.emptyStyle==="card"}function cn(){let t=document.getElementById(B)?.dataset.emptyStyle;return t==="card"||t==="vinyl"}function lf(){if(cn())return;let t=!zi();localStorage.setItem(ol,String(t)),document.getElementById(B)?.classList.toggle("ll-card-returning",t),J()}function dn(t){t.classList.remove("ll-card-returning")}function bl(){return $a()}function cf(){Ka(),J()}function df(){if(cn())return;let t=document.getElementById(B),e=t?.querySelector(".liquid-lyrics-song-card")??null,i=t?.querySelector(".liquid-lyrics-content")??null,r=e?.getBoundingClientRect(),n=i?.getBoundingClientRect();V("cardSide",C().cardSide==="left"?"right":"left"),J(),nl(e,r),nl(i,n)}function nl(t,e){if(!t||!e||typeof t.animate!="function")return;let i=t.getBoundingClientRect(),r=e.left-i.left;Math.abs(r)<1||t.animate([{transform:`translate3d(${r}px, 0, 0)`},{transform:"translate3d(0, 0, 0)"}],{duration:qp,easing:"cubic-bezier(0.16, 1, 0.3, 1)"})}function uf(){let t=Z(),e=N?.hasJapanese??!1;Xt(t==="off"?"romaji":t==="romaji"&&e?"furigana":"off"),window.dispatchEvent(new Event(Ut)),J()}function hf(t){return t==="romaji"?"Romanization: Romaji":t==="furigana"?"Romanization: Furigana":"Romanization"}function pf(){let t=document.getElementById(B);t&&(un(t)?Wi(t):hn(t,"cinema"),Ui(t))}function ff(){let t=document.getElementById(B);t&&(ji(t)?Wi(t):hn(t,"fullscreen"),Ui(t))}function Ui(t){re(),le(),J(),pn(),gn(t),fn(t),Ue(),requestAnimationFrame(()=>N?.recenter())}function tn(t){t.classList.toggle("ll-song-card-hidden",!zi()&&!ml()),t.classList.toggle("ll-romanized",Z()==="romaji"),t.classList.toggle("ll-animated-bg",bl()),gf(t)}function gf(t){let e=C(),i=pt(t),r=i?e.fsShowCredits:e.pageShowCredits,n=i?e.fsHideScrollbar:e.pageHideScrollbar,o=i?e.fsShowControls:e.pageShowControls,a=i?e.fsControlPosition:e.pageControlPosition;t.classList.toggle("ll-hide-credits",!r),t.classList.toggle("ll-hide-scrollbar",n),t.classList.toggle("ll-hide-pill",!o),t.dataset.controlPosition=a,t.dataset.cardStyle=e.cardStyle,t.dataset.cardSide=e.cardSide,Gp(e.cardStyle),t.classList.toggle("ll-card-center-text",e.cardCenterText),t.classList.toggle("ll-card-hide-title",e.cardHideTitle),t.classList.toggle("ll-card-hide-artist",e.cardHideArtist),t.classList.toggle("ll-card-hide-album",e.cardHideAlbum),t.classList.toggle("ll-fs-fade-title",i&&e.fsFadeTitle),t.classList.toggle("ll-fs-fade-artist",i&&e.fsFadeArtist),t.classList.toggle("ll-fs-fade-album",i&&e.fsFadeAlbum)}function J(){let t=document.getElementById(B);if(!t)return;let e=Z(),i=pt(t);tn(t);let r=cn(),n=t.querySelector(".ll-card-toggle");n&&(n.hidden=r,n.disabled=r,$e(n,zi()||ml()),r&&re());let o=t.querySelector(".ll-card-side-toggle");if(o){let c=zi()&&!r;o.hidden=!c,o.disabled=!c;let d=C().cardSide==="left"?"Move song card right":"Move song card left";o.dataset.tooltip=d,o.setAttribute("aria-label",d),c||re()}$e(t.querySelector(".ll-roman-toggle"),e!=="off"),$e(t.querySelector(".ll-cinema-toggle"),un(t)),$e(t.querySelector(".ll-fullscreen-toggle"),ji(t)),ce?.setForcedVisible(i);let a=t.querySelector(".ll-bg-toggle");a&&(a.hidden=i,a.disabled=i,$e(a,i||bl()));let s=t.querySelector(".ll-roman-toggle"),l=t.classList.contains("ll-has-romanization");if(s){s.hidden=!l,s.disabled=!l,pl(s,e==="furigana"?"furigana":"roman");let c=hf(e);s.dataset.tooltip=c,s.setAttribute("aria-label",c),l||re()}}function $e(t,e){t&&(t.classList.toggle("active",e),t.setAttribute("aria-pressed",String(e)))}function zi(){return localStorage.getItem(ol)!=="false"}function mf(){re(),le();let t=document.getElementById(B);t&&document.fullscreenElement!==t&&t.classList.contains("ll-native-fullscreen")&&Wi(t),J(),pn(),t&&gn(t),Ue(),requestAnimationFrame(()=>N?.recenter())}function un(t){return t.classList.contains("ll-fullscreen-mode")}function ji(t){return document.fullscreenElement===t}function pt(t){return un(t)||ji(t)}function bf(t){!qe&&t.parentNode&&(qe=document.createComment("liquid-lyrics-fullscreen-placeholder"),t.parentNode.insertBefore(qe,t));let e=document.fullscreenElement instanceof HTMLElement&&document.fullscreenElement!==t?document.fullscreenElement:document.body;t.parentElement!==e&&e.appendChild(t)}function yf(t){qe?.parentNode&&(qe.parentNode.insertBefore(t,qe),qe.remove()),qe=null}function hn(t,e){if(dn(t),pt(t)||(Pi=O(),t.classList.contains("visible")||(t.classList.add("visible"),Ae(),N?.setEnabled(!0),ce?.setEnabled(!0),sn())),bf(t),e==="cinema"){document.fullscreenElement===t&&document.exitFullscreen?.(),t.classList.remove("ll-native-fullscreen"),t.classList.add("ll-fullscreen-mode");return}t.classList.remove("ll-fullscreen-mode"),t.classList.add("ll-native-fullscreen");let i=t.requestFullscreen?.();i&&typeof i.catch=="function"&&i.catch(()=>{ji(t)||(t.classList.remove("ll-native-fullscreen"),t.classList.add("ll-fullscreen-mode"),Ui(t))})}function Wi(t){dn(t);let e=t.classList.contains("ll-fullscreen-mode")||t.classList.contains("ll-native-fullscreen"),i=!Pi&&e;t.classList.remove("ll-fullscreen-mode","ll-native-fullscreen"),document.fullscreenElement===t&&document.exitFullscreen?.(),yf(t),i&&(t.classList.remove("visible"),N?.setEnabled(!1),ce?.setEnabled(!1),ln()),Pi=!0}function pn(){let t=document.getElementById(B);if(!!(t&&pt(t))){ct===void 0&&(ct=localStorage.getItem(Ht)),localStorage.getItem(Ht)!=="animated"&&(localStorage.setItem(Ht,"animated"),window.dispatchEvent(new Event("liquifyBackgroundChange")));return}ct!==void 0&&(ct===null?localStorage.removeItem(Ht):localStorage.setItem(Ht,ct),ct=void 0,window.dispatchEvent(new Event("liquifyBackgroundChange")))}function fn(t=document.getElementById(B)){if(!t)return;let e=Rp.some(i=>localStorage.getItem(i)==="on");t.classList.toggle("ll-liquify-floating-player",e)}function gn(t=document.getElementById(B)){if(!t)return;let e=parseInt(localStorage.getItem("liquify-tc-width")||"135",10),i=parseInt(localStorage.getItem("liquify-tc-height")||"64",10);t.style.setProperty("--ll-transparent-controls-width",`${Bi(e,50,400)}px`),t.style.setProperty("--ll-transparent-controls-height",`${Bi(i,20,300)}px`)}function vf(t,e){let i=Number(t);return Number.isFinite(i)?Math.max(0,i):e}function Bi(t,e=0,i=1){return Math.min(i,Math.max(e,t))}var Vi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 75 80" width="19" height="19" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M67.811,52.031A19.795,19.795,0,1,0,48.04,33.468l-34.2,38.506a5.632,5.632,0,0,0,.229,7.713l6.249,6.251a5.633,5.633,0,0,0,7.713.227L66.532,51.959C66.959,51.987,67.386,52.031,67.811,52.031Zm-1.174-3.816L51.784,33.362a15.825,15.825,0,0,1,1.537-8.107L74.744,46.677A15.879,15.879,0,0,1,66.637,48.215ZM67.728,16.25A16.022,16.022,0,0,1,79.059,43.6c-.352.352-.726.672-1.1.986L55.413,22.045c.314-.378.635-.751.987-1.1A15.912,15.912,0,0,1,67.728,16.25ZM25.535,83.362a1.877,1.877,0,0,1-2.571-.076l-6.249-6.251a1.875,1.875,0,0,1-.075-2.57L50.013,36.894,63.107,49.987Z"/><path d="M46.8,53.2a1.876,1.876,0,0,0,2.652,0l3.977-3.978a1.875,1.875,0,0,0-2.651-2.651L46.8,50.551A1.876,1.876,0,0,0,46.8,53.2Z"/><path d="M21.875,46.25A5.631,5.631,0,0,0,27.5,40.625V27.254l2.71,1.806a1.875,1.875,0,1,0,2.08-3.12l-5.625-3.75a1.875,1.875,0,0,0-2.915,1.56v11.6A5.558,5.558,0,0,0,21.875,35a5.625,5.625,0,0,0,0,11.25Zm0-7.5A1.875,1.875,0,1,1,20,40.625,1.876,1.876,0,0,1,21.875,38.75Z"/><path d="M75.415,59.69A1.875,1.875,0,0,0,72.5,61.25v11.6a5.558,5.558,0,0,0-1.875-.345,5.625,5.625,0,1,0,5.625,5.625V64.754l2.71,1.806a1.875,1.875,0,0,0,2.08-3.12ZM70.625,80A1.875,1.875,0,1,1,72.5,78.125,1.876,1.876,0,0,1,70.625,80Z"/></svg>
`;var mn="liquid-lyrics-button";function yl(){let t=document.getElementById(mn);if(t)return t;let e=document.querySelector(".main-nowPlayingBar-extraControls");if(!e)return null;let i=document.createElement("button");return i.id=mn,i.className="liquid-lyrics-button",i.setAttribute("aria-label","Liquid Lyrics"),i.innerHTML=Vi,z(i,"Liquid Lyrics"),i.addEventListener("click",()=>{Fi(),i.classList.toggle("active",O())}),e.prepend(i),i}function vl(){let t=document.getElementById(mn);t&&t.classList.toggle("active",O())}var bn=[82,58,90,66,74,52],xf=30,kn="liquid-lyrics-sidebar-card",Sn="liquid-lyrics-sidebar-card-collapsed",Tl="liquid-lyrics-sidebar-card-expanded",kf=300,Sf=2e3,ft={fullscreen:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 4H4v4.2"/><path d="M15.8 4H20v4.2"/><path d="M20 15.8V20h-4.2"/><path d="M4 15.8V20h4.2"/></svg>',open:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',expand:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="m8.4 6.4 3.6-3.4 3.6 3.4"/><path d="m8.4 17.6 3.6 3.4 3.6-3.4"/></svg>',collapse:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16"/><path d="m8.4 10.4 3.6-3.4 3.6 3.4"/><path d="m8.4 13.6 3.6 3.4 3.6-3.4"/></svg>',roman:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 18.5 9.7 5.5h1.9l5.2 13"/><path d="M7 13.4h7.3"/><path d="M18.6 7.2h2.2"/><path d="M19.7 6.1v2.2"/></svg>',furigana:'<svg viewBox="0 0 24 24" aria-hidden="true"><text x="9" y="21" font-size="15" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u5B57</text><text x="18" y="9" font-size="8" font-weight="700" text-anchor="middle" fill="currentColor" stroke="none">\u3058</text></svg>'},ie=null,D=null,gt="Loading lyrics...",mt=null,Vt=!1,El=!1,wl=!1,yn=null,vn=!1,xl=null,ge=null,kl=0,wn=!1,Sl=[],_e=null,Re=null,fe=null,$i=null;function Yi(){if(ie)return _l(),Ye(ie),ie;document.getElementById(kn)?.remove();let t=document.createElement("section");t.id=kn,t.className="liquid-lyrics-sidebar-card",ie=t,t.innerHTML=`
    <div class="ll-sidebar-card-header">
      <button class="ll-sidebar-header-main" type="button" aria-expanded="true">
        <span class="ll-sidebar-card-icon">${Vi}</span>
        <span class="ll-sidebar-card-title">Liquid Lyrics</span>
      </button>
      <div class="ll-sidebar-control-island">
        <button class="ll-sidebar-island-btn ll-sidebar-expand-toggle" type="button" aria-label="Expand card">${ft.expand}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-roman-toggle" type="button" aria-label="Romanization">${ft.roman}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-open-toggle" type="button" aria-label="Open Liquid Lyrics">${ft.open}</button>
        <button class="ll-sidebar-island-btn ll-sidebar-fullscreen-toggle" type="button" aria-label="Fullscreen">${ft.fullscreen}</button>
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
  `;let e=t.querySelector(".ll-sidebar-header-main"),i=t.querySelector(".ll-sidebar-collapse-btn"),r=t.querySelector(".ll-sidebar-expand-toggle"),n=t.querySelector(".ll-sidebar-roman-toggle"),o=t.querySelector(".ll-sidebar-fullscreen-toggle"),a=t.querySelector(".ll-sidebar-open-toggle"),s=()=>{if(t.classList.contains("ll-expanded"))return;let d=!t.classList.contains("collapsed");localStorage.setItem(Sn,String(d)),xn(t),$()};e?.addEventListener("click",s),i?.addEventListener("click",s),r?.addEventListener("click",d=>{d.stopPropagation();let u=!t.classList.contains("ll-expanded");localStorage.setItem(Tl,String(u)),u&&t.classList.contains("collapsed")&&(localStorage.setItem(Sn,"false"),xn(t));let h=t.getBoundingClientRect();Ll(t),Cf(t,h),$(),requestAnimationFrame(()=>D?.recenter())}),n?.addEventListener("click",d=>{d.stopPropagation();let u=Z(),h=D?.hasJapanese??!1;Xt(u==="off"?"romaji":u==="romaji"&&h?"furigana":"off"),window.dispatchEvent(new Event(Ut)),$()}),o?.addEventListener("click",d=>{d.stopPropagation(),al(!1)}),a?.addEventListener("click",d=>{d.stopPropagation(),Oi()}),i&&z(i,"Toggle mini lyrics"),r&&z(r,"Expand card"),n&&z(n,"Romanization"),o&&z(o,"Fullscreen"),a&&z(a,"Open Liquid Lyrics");let l=t.querySelector(".ll-sidebar-mini-viewport"),c=t.querySelector(".ll-sidebar-mini-lines");return D?.destroy(),D=new Le({container:c,scroller:l,variant:"sidebar",renderBackgrounds:!0,dotLiftPx:10,onRomanizationAvailability:()=>Kt(t)}),wl||(wl=!0,window.addEventListener(Ut,()=>{Gi(!O()),ie&&Kt(ie)}),window.addEventListener(at,()=>$()),window.addEventListener(ne,()=>En())),xn(t),Ll(t),Ye(t),Af(),Rf(),mt?(D.setLyrics(mt),Gi(!O())):Xi(gt,Vt),$(),t}function Ln(t,e="No lyrics available",i=!1){let r=Yi();gt=t?"Live lyrics":e,D?.setLyrics(t),!t||!D?.hasLyrics?(mt=null,Vt=i,Xi(gt,i)):(mt=t,Vt=!1,Gi(!O())),Kt(r),$()}function Ml(t){gt=t,mt=null,Vt=!1;let e=ie;e&&(D?.setLyrics(null),Xi(t),Kt(e),$())}function $(){let t=ie;if(!t)return;Ye(t);let e=O();t.classList.toggle("ll-hidden",e),t.classList.contains("ll-expanded")&&(Mn(t),ql(t)),t.dataset.romanized=String(Z()==="romaji"),Kt(t);let i=t.classList.contains("collapsed"),r=!e&&!i&&t.isConnected&&!De();D?.setEnabled(r),r&&Z()!=="off"&&!El&&Gi(!0)}function Tn(){Ye(),En()}function En(){let t=C().npvBackground,e=document.querySelector(".Root__right-sidebar");if(!t||!e){_e?.destroy(),_e=null;return}_e||(_e=new Ke("sidebar")),_e.el.parentElement!==e&&e.appendChild(_e.el),_e.setCover(Cl()),_e.apply()}function Cl(){let t=Spicetify.Player?.data?.item,e=t?.metadata??{},i=String(e.image_xlarge_url||e.image_large_url||e.image_url||t?.album?.images?.[0]?.url||"");return(i.startsWith("spotify:image:")?i.replace("spotify:image:","https://i.scdn.co/image/"):i).replace(/ab67616d00001e02|ab67616d00004851/g,"ab67616d0000b273")}function Gi(t){if(!D)return;let e=Z();D.setRomanized(e,t),El=t||e==="off"}function Xi(t,e=!1){if(!D)return;if(!e&&Di(t)){D.container.replaceChildren(an(Lf())),D.resetScroll();return}let i=document.createElement("div");i.className="ll-sidebar-mini-empty";let r=document.createElement("div");r.className="ll-empty-icon ll-sidebar-empty-icon",r.innerHTML=on,i.appendChild(r);let n=document.createElement("div");if(n.className="ll-sidebar-mini-empty-text",n.textContent=t,i.appendChild(n),e){let o=document.createElement("button");o.type="button",o.className="ll-sidebar-mini-create-btn",o.textContent="Create your own sync",o.addEventListener("click",a=>{a.stopPropagation(),At()}),i.appendChild(o)}D.container.replaceChildren(i),D.resetScroll()}function Lf(){let t=ie;if(!t?.classList.contains("ll-expanded"))return bn;let e=t.querySelector(".ll-sidebar-mini-viewport"),i=t.querySelector(".ll-sidebar-mini-lines");if(!e||!i)return bn;let r=getComputedStyle(i),n=e.clientHeight-parseFloat(r.paddingTop||"0")-parseFloat(r.paddingBottom||"0");return!Number.isFinite(n)||n<=0?bn:cl(n,xf)}function Kt(t){let e=t.querySelector(".ll-sidebar-roman-toggle");if(!e)return;let i=D?.hasRomanization??!1,r=Z(),n=i&&r!=="off";e.hidden=!i,e.disabled=!i,e.classList.toggle("active",n),e.setAttribute("aria-pressed",String(n));let o=r==="furigana"?"furigana":"roman";e.dataset.icon!==o&&(e.dataset.icon=o,e.innerHTML=ft[o]);let a=r==="romaji"?"Romanization: Romaji":r==="furigana"?"Romanization: Furigana":"Romanization";e.dataset.tooltip=a,e.setAttribute("aria-label",a)}function xn(t){let e=localStorage.getItem(Sn)==="true";t.classList.toggle("collapsed",e),t.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-expanded",String(!e))}function Ll(t){let e=localStorage.getItem(Tl)==="true";t.classList.toggle("ll-expanded",e),e?Tf(t):Ef(t),ql(t),e?Mf(t):Al();let i=t.querySelector(".ll-sidebar-collapse-btn");i&&(i.hidden=e,i.disabled=e),t.querySelector(".ll-sidebar-header-main")?.setAttribute("aria-disabled",String(e));let r=t.querySelector(".ll-sidebar-expand-toggle");if(r){let n=e?"collapse":"expand";r.dataset.icon!==n&&(r.dataset.icon=n,r.innerHTML=ft[n]);let o=e?"Shrink card":"Expand card";r.dataset.tooltip=o,r.setAttribute("aria-label",o),r.classList.toggle("active",e),r.setAttribute("aria-pressed",String(e))}e?Mn(t):t.style.removeProperty("--ll-card-expanded-height"),!mt&&Di(gt)&&Xi(gt,Vt)}function ql(t){if(!t.classList.contains("ll-expanded")){fe?.destroy(),fe=null;return}fe||(fe=new Ke("panel","kawarp")),fe.el.parentElement!==t&&t.insertBefore(fe.el,t.firstChild),fe.setCover(Cl()),fe.apply(),fe.setEnabled(!0)}function Tf(t){t.parentElement!==document.body&&(Re||(Re=document.createComment("liquid-lyrics-card-slot")),t.parentNode?.insertBefore(Re,t),document.body.appendChild(t))}function Ef(t){Re?.parentNode&&(Re.parentNode.insertBefore(t,Re),Re.remove()),Re=null}function Mn(t){let e=document.querySelector(".Root__right-sidebar");if(!e||!t.isConnected)return;let i=e.getBoundingClientRect(),r=8;t.style.setProperty("--ll-card-fs-top",`${Math.round(i.top+r)}px`),t.style.setProperty("--ll-card-fs-left",`${Math.round(i.left+r)}px`),t.style.setProperty("--ll-card-fs-width",`${Math.round(i.width-r*2)}px`),t.style.setProperty("--ll-card-fs-height",`${Math.round(i.height-r*2)}px`)}function Mf(t){let e=document.querySelector(".Root__right-sidebar");e&&(Al(),$i=new ResizeObserver(()=>{t.classList.contains("ll-expanded")&&Mn(t)}),$i.observe(e))}function Al(){$i?.disconnect(),$i=null}function Cf(t,e){if(typeof t.animate!="function")return;let i=t.getBoundingClientRect(),r=e.left-i.left,n=e.top-i.top,o=i.width>0?e.width/i.width:1,a=i.height>0?e.height/i.height:1;if(Math.abs(r)<1&&Math.abs(n)<1&&Math.abs(o-1)<.01&&Math.abs(a-1)<.01)return;t.classList.add("ll-card-flipping"),t.animate([{transformOrigin:"top left",transform:`translate(${r}px, ${n}px) scale(${o}, ${a})`},{transformOrigin:"top left",transform:"none"}],{duration:520,easing:"cubic-bezier(0.34, 1.32, 0.64, 1)"}).finished.catch(()=>{}).finally(()=>t.classList.remove("ll-card-flipping"))}function Ye(t=ie){if(!t||t.classList.contains("ll-expanded"))return!1;_l();let e=qf();return e?t.parentElement!==e||e.lastElementChild!==t?(e.appendChild(t),!0):!1:(t.parentElement?.classList.contains("Root__right-sidebar")&&t.remove(),!1)}function _l(){document.querySelectorAll(`#${kn}`).forEach(t=>{t!==ie&&t.remove()})}function qf(){if(ge?.isConnected)return ge;ge=null;let t=document.querySelector(".Root__right-sidebar"),e=t?.querySelector(".main-nowPlayingView-nowPlayingWidget")||document.querySelector(".main-nowPlayingView-nowPlayingWidget")||t?.querySelector(".main-nowPlayingView-panel")||document.querySelector(".main-nowPlayingView-panel")||t?.querySelector(".main-nowPlayingView-nowPlayingGrid")||document.querySelector(".main-nowPlayingView-nowPlayingGrid");if(e)return ge=e,e;let i=performance.now();return i-kl>=Sf&&(kl=i,ge=Ki(["nowplayingview","nowplayingwidget"],t??document)||Ki(["nowplaying","widget"],t??document)||Ki(["nowplayingview","nowplayinggrid"],t??document)||Ki(["nowplaying","grid"],t??document)),ge}function Ki(t,e=document){let i=t.map(r=>r.toLowerCase());for(let r of Array.from(e.querySelectorAll("*"))){let n=(r.getAttribute("class")||"").toLowerCase();if(i.every(o=>n.includes(o)))return r}return null}function Af(){yn||(yn=new MutationObserver(()=>{_f()}),yn.observe(document.body,{childList:!0,subtree:!0}),Cn())}function _f(){vn||(vn=!0,setTimeout(()=>{vn=!1,Cn();let t=ie;t&&(t.classList.contains("ll-expanded")||t.isConnected&&ge?.isConnected&&t.parentElement===ge||Ye(t)&&$())},kf))}function Rf(){xl||(xl=setInterval(()=>{Cn(),Ye(),En(),$()},1e3))}function Cn(){if(!!document.querySelector(".Root__cinema-view")){wn=!0;return}wn&&(wn=!1,If())}function If(){Sl.forEach(t=>clearTimeout(t)),Sl=[80,260,620,1100].map(t=>setTimeout(()=>{let e=Yi();ge=null,Ye(e),$()},t))}var Rl=`/* ==========================================================================\r
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
  /* --ll-card-col lives on .liquid-lyrics-view, not here: it is measured in\r
     container units, and cq* resolves against the nearest ancestor container \u2014\r
     which for this element is something outside the panel, and for its child is\r
     the panel itself. */\r
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
/* The song card's arrival, exactly as it was in the 27-07 build. */\r
.liquid-lyrics-panel.visible:not(.ll-song-card-hidden) .liquid-lyrics-song-card {\r
  animation: ll-song-card-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) both;\r
}\r
\r
.liquid-lyrics-panel.visible .liquid-lyrics-content {\r
  /* \`backwards\` rather than the original \`both\`, and only here: the lyrics slide\r
     to the middle by transform when the card is switched off, and \`both\` would\r
     leave this animation holding that property for good. It reaches into the\r
     start, not past the end, so the arrival itself is unchanged. */\r
  animation: ll-lyrics-content-enter 520ms cubic-bezier(0.7, 1.5, 0.64, 1) backwards;\r
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
  /* The counterpart to min-height: a flex item's automatic minimum size is its\r
     min-content width, so without this the grid may grow past the panel. */\r
  min-width: 0;\r
  display: grid;\r
\r
  /* Two tracks, both a stated length, and the pair centred.\r
     ---------------------------------------------------------------------------\r
     Neither track is content-sized, and that is the point. An auto track is\r
     measured from what is in it, and the lyrics are virtualised \u2014 rows are mounted\r
     and dropped as you scroll, so the column changed width a few times a second\r
     and every line rewrapped with it. The loading placeholder collapsed for the\r
     same reason: its rows are percentage widths and contribute almost nothing to\r
     an intrinsic measurement.\r
\r
     The card track is a length. The lyrics track is \`auto\`, but the element in it\r
     carries a definite width, so the track is that width and nothing inside it can\r
     move it. Whatever the panel has left over is then shared equally by\r
     justify-content, which is what keeps the two of them looking centred rather\r
     than pushed to one edge.\r
\r
     Everything is measured against the panel (cqw), never the window: the panel's\r
     width depends on which of Spotify's sidebars are open, so the same panel would\r
     otherwise be laid out differently depending on what was open beside it. */\r
  /* Two names for what looks like one number, and they have to be two.\r
     --ll-card-w is how wide the card is drawn. --ll-card-col is how much room the\r
     grid sets aside for it, and that one goes to zero when the card is switched\r
     off so the lyrics can travel to the middle. Sharing a single variable meant\r
     the card was squeezed to nothing at the same time and collapsed in place\r
     instead of sliding away. */\r
  --ll-card-w: clamp(200px, min(26cqw, calc(100vh - 320px)), 356px);\r
  --ll-card-col: var(--ll-card-w);\r
  --ll-lyrics-col: calc(620px * var(--ll-font-scale, 1) + 84px);\r
  grid-template-columns: var(--ll-card-col) minmax(240px, auto);\r
  align-items: center;\r
  justify-content: center;\r
  --ll-gap: clamp(44px, 5.5cqw, 110px);\r
  gap: var(--ll-gap);\r
  padding: 86px clamp(24px, 4cqw, 96px) 56px;\r
  /* Both animate, which is what makes switching the card off a glide: the track\r
     goes to zero and the gap with it, and the lyrics travel to the middle. */\r
  /* The column no longer changes when the card is switched off, so there is\r
     nothing here to animate \u2014 both halves of that move are transforms now. Kept\r
     for the responsive steps, where the track width really does change. */\r
  transition: --ll-card-col 520ms cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.liquid-lyrics-content {\r
  position: relative;\r
  z-index: 2;\r
  /* A stated width, and this is what sizes the lyrics track: the track is \`auto\`,\r
     so it takes this figure and nothing else. Definite, so the virtualiser cannot\r
     move it; bounded, so the column stops at the measure the lines want instead of\r
     stretching across whatever is left.\r
\r
     border-box because of the 84px of horizontal padding below \u2014 under content-box\r
     the width and the padding add up and the column overflows its own track by\r
     exactly that much, which is what put a horizontal scrollbar under the lyrics.\r
     max-width so it yields on a panel too narrow for the full measure. */\r
  box-sizing: border-box;\r
  width: var(--ll-lyrics-col, 704px);\r
  max-width: 100%;\r
  min-width: 0;\r
  height: 100%;\r
  min-height: 0;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  padding: 78px 42px 132px;\r
  /* The lyrics' half of the switch: they slide to the middle rather than the grid\r
     closing underneath them.\r
\r
     Paced against the card's exit, which is the other half of the same movement.\r
     The old curve was cubic-bezier(0.16, 1, 0.3, 1) \u2014 an aggressive ease-out that\r
     puts four fifths of the distance into the first fifth of the time. Nominally\r
     it was the *longer* of the two at 520ms against the card's 420, and it still\r
     looked as though the lyrics were already in the middle before the card had\r
     properly left. The clock was never the problem; the distribution was.\r
\r
     Now a gentle start and a soft landing, and a short delay so the card is\r
     visibly on its way first. The two read as one gesture: the card leaves, the\r
     lyrics move over. */\r
  transition: transform 460ms cubic-bezier(0.37, 0, 0.24, 1) 90ms;\r
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
  margin-bottom: 16px;\r
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
/* Both restored verbatim from the 27-07 build: this is the arrival that worked.\r
   ll-lyrics-content-enter had been deleted outright by a regex of mine that ran\r
   past the end of the block it was aiming at, which is why the lyrics stopped\r
   arriving at all. */\r
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
/* Leaving is an animation too, not a transition. The entrance fills \`both\`, so it\r
   holds the transform for good once it has run \u2014 and a transition cannot animate a\r
   property an animation still owns. Two animations hand over cleanly, because\r
   changing the animation-name is what starts the next one. */\r
/* Coming back from being switched off: in along the way it went out, not up from\r
   below. Opening the page is a different arrival (ll-song-card-enter) and has to\r
   stay that way \u2014 this one only applies while the panel is marked as having just\r
   put the card back, which panel.ts sets on the toggle and clears again before\r
   the next entrance (see the .ll-card-returning rule). The overshoot comes from\r
   the shared easing on the rule. */\r
@keyframes ll-song-card-return {\r
  0% {\r
    opacity: 0;\r
    transform: translate3d(var(--ll-card-exit-x), 0, 0);\r
  }\r
  55% {\r
    opacity: 1;\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0);\r
  }\r
}\r
\r
@keyframes ll-song-card-leave {\r
  0% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0);\r
  }\r
  55% {\r
    opacity: 1;\r
  }\r
  100% {\r
    opacity: 0;\r
    transform: translate3d(var(--ll-card-exit-x), 0, 0);\r
  }\r
}\r
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
  /* One number, declared on the view above, so the card and the track it sits in\r
     can never disagree \u2014 and so the 520ms transition on that property carries the\r
     card's width with it instead of snapping between breakpoints.\r
\r
     Deliberately no \`max-width: 100%\`. That would be 100% of the grid column, and\r
     the column runs between zero and full width every time the card is switched\r
     on or off \u2014 so the card was clamped to a track in motion and grew from nothing\r
     to full size on the way in, which is not an entrance anyone asked for. The\r
     column is the same figure as this width anyway, so there was never anything\r
     for it to clamp. */\r
  width: var(--ll-card-w, 320px);\r
  /* Pulled to the inner edge of its half, so the space its half has over and\r
     above it shows on the outside rather than being split into the middle. The\r
     lyrics do the same from their side; between them sits the gap and nothing\r
     else. Overridden for a right-hand card further down. */\r
  max-height: calc(100% - 12px);\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  /* Everything inside the card is sized against the card, not the panel. The\r
     transport is a five-column grid of fixed 36px buttons, and once the column\r
     narrowed past about 210px the row no longer fitted \u2014 the card's overflow then\r
     simply cut the last button off. Its width is set by the grid track and its\r
     own clamp, never by its contents, so containing the inline size costs\r
     nothing. */\r
  container-type: inline-size;\r
  /* Settings \u2192 Song card \u2192 "Card corner radius". Only the default style reads it:\r
     the cover style has no card frame of its own to round \u2014 there the artwork is\r
     the card, and its own radius setting shapes it. */\r
  border-radius: var(--ll-card-radius, 20px);\r
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
  /* Declared here rather than on the card, because cq* resolves against the\r
     nearest *ancestor* container \u2014 on the card that would be the panel, one level\r
     too far out. Every transport button lives in this row in both card styles, so\r
     one declaration covers them all.\r
     Lifted into the control pill while maximized, this resolves against the panel\r
     instead and lands on the 36px ceiling, which is what the pill wants. */\r
  --ll-card-btn: clamp(24px, 15cqw, 36px);\r
  --ll-card-glyph: clamp(15px, 8.5cqw, 20px);\r
  height: 60px;\r
  flex: 0 0 auto;\r
  display: grid;\r
  grid-template-columns: repeat(5, 1fr);\r
  align-items: center;\r
  gap: clamp(0px, 1cqw, 4px);\r
  padding: 14px clamp(4px, 5cqw, 16px) 0;\r
}\r
\r
.ll-song-card-btn,\r
.ll-control-btn {\r
  /* var with a fallback rather than a plain 36px: the transport row hands its\r
     buttons a size measured against the card, and every other button on this\r
     selector (the control pill's, the card's heart) has no such row above it and\r
     takes the fallback. */\r
  width: var(--ll-card-btn, 36px);\r
  height: var(--ll-card-btn, 36px);\r
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
  width: var(--ll-card-glyph, 20px);\r
  height: var(--ll-card-glyph, 20px);\r
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
  /* Against the card, like the transport above it: two time labels and a track\r
     between them is the other row that stops fitting first. */\r
  gap: clamp(4px, 2.6cqw, 9px);\r
  padding: 18px clamp(8px, 6cqw, 20px) 12px;\r
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
/* The card is hidden with visibility, not display, so its fade-out has something\r
   to animate \u2014 which means it still owns a grid track. Centring then centred the\r
   lyrics together with an invisible column beside them, and they sat off to one\r
   side for no reason anyone could see.\r
\r
   So while it is hidden the grid has one column and the card is taken out of the\r
   flow altogether. It keeps its place on screen long enough to fade, and takes up\r
   none of the layout while it does. */\r
/* Switched off, the card's track goes to nothing and the gap with it. Both are\r
   transitioned, so the lyrics glide to the middle rather than jumping there \u2014 the\r
   track width is a registered custom property precisely so it can be animated.\r
   (--ll-card-col is set to 0 on the panel further down.) */\r
/* Nothing about the grid changes. The lyrics are moved by a transform instead.\r
\r
   Collapsing the card's column was pulling against the card's own exit: the grid\r
   is centred, so as that column closed, everything left of the lyrics moved\r
   *right* \u2014 including the card, which was trying to travel left. The two\r
   cancelled, then fought, and the result read as a stutter and a delay however\r
   the timings were staggered. Nothing staggered helps, because the conflict is\r
   between a layout change and a transform on the same element.\r
\r
   So the column stays exactly where it is and the lyrics slide across it by half\r
   the room the card and the gap take up, which is where they would have landed\r
   anyway. Two transforms, in opposite directions, neither touching layout. */\r
.ll-song-card-hidden .liquid-lyrics-content {\r
  transform: translateX(calc((var(--ll-card-w, 320px) + var(--ll-gap, 60px)) / -2));\r
}\r
\r
.liquid-lyrics-panel[data-card-side="right"].ll-song-card-hidden .liquid-lyrics-content {\r
  transform: translateX(calc((var(--ll-card-w, 320px) + var(--ll-gap, 60px)) / 2));\r
}\r
\r
/* Which way the card leaves, and the way it comes back in.\r
\r
   A value, not a second set of keyframes. There used to be \`-right\` twins of both\r
   animations, selected by data-card-side \u2014 and swapping sides therefore changed\r
   the card's animation-name, which is itself what starts an animation. So moving\r
   the card to the other side after it had been switched off and on again replayed\r
   the whole return entrance on top of the swap: the card slid across, then bounced\r
   a second time as the restarted animation caught up. (Without the toggle there\r
   was nothing to see, because the page's own arrival has no side-specific twin and\r
   its name never changed \u2014 which is exactly why it only happened after a toggle.)\r
\r
   Changing a custom property the keyframes read re-interpolates them in place and\r
   leaves animation-name alone, so there is nothing to restart. */\r
.liquid-lyrics-song-card {\r
  --ll-card-exit-x: calc(-100% - var(--ll-card-w, 320px) * 0.2);\r
}\r
\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-song-card {\r
  --ll-card-exit-x: calc(100% + var(--ll-card-w, 320px) * 0.2);\r
}\r
\r
.ll-song-card-hidden .liquid-lyrics-song-card {\r
  pointer-events: none;\r
  /* An animation, not a transition. The arrival above fills \`both\`, so it keeps\r
     hold of the transform once it has run \u2014 and a transition can never animate a\r
     property an animation still owns, which is why every attempt at a slide-out\r
     ended as the card simply vanishing. Two animations hand over cleanly: changing\r
     the animation-name is itself what starts the next one, in either direction. */\r
  animation: ll-song-card-leave 420ms cubic-bezier(0.45, 0, 0.75, 0.6) forwards;\r
  /* Held visible for the whole slide and dropped at the end, so it cannot be\r
     switched off underneath the movement. */\r
  visibility: hidden;\r
  transition: visibility 420ms step-end;\r
}\r
\r
/* Switched back on. The marker is put there by the same click that clears\r
   ll-song-card-hidden, so the animation-name goes straight from leave to return \u2014\r
   one change, one animation.\r
\r
   It is cleared again when the card is switched off, and by clearCardReturn at\r
   every point where the card is about to be given a fresh entrance: opening the\r
   page, and entering or leaving a maximized mode. Not when the return itself\r
   finishes \u2014 taking the marker off puts ll-song-card-enter back, and a change of\r
   animation-name is what starts an animation, so the card would replay its\r
   entrance while standing still. */\r
.liquid-lyrics-panel.ll-card-returning.visible:not(.ll-song-card-hidden) .liquid-lyrics-song-card {\r
  animation-name: ll-song-card-return;\r
}\r
\r
/* Lyrics arriving after the song card has flown back out of the middle, which is\r
   what happens on the first track that has words again. They are deliberately\r
   held back until the flight has landed (see renderLyrics), so without something\r
   of their own they would simply blink into the pause that wait leaves.\r
\r
   Opacity and blur only. A rise would suit it better, but the hidden-card state\r
   parks this element with a transform, and an animation holds a property against\r
   every rule that also sets it \u2014 the lyrics would jump back to centre the instant\r
   the animation let go. Shorter and flatter than the page's own arrival: this is\r
   a handover, not an opening. */\r
.liquid-lyrics-panel .liquid-lyrics-content.ll-lyrics-arriving {\r
  animation: ll-lyrics-arrive 380ms cubic-bezier(0.22, 1, 0.36, 1) backwards;\r
}\r
\r
@keyframes ll-lyrics-arrive {\r
  0% {\r
    opacity: 0;\r
    filter: blur(5px);\r
  }\r
  100% {\r
    opacity: 1;\r
    filter: blur(0);\r
  }\r
}\r
\r
/* --- 5. Control pill & tooltip -------------------------------------------------- */\r
\r
/* The pill's own transport. It keeps the buttons' shared styling and only needs a\r
   row to sit in \u2014 deliberately without \`display\`, which the pair of rules below\r
   owns. Setting it here as well would have out-specified the hidden state and\r
   left the row on screen in a windowed panel. */\r
.liquid-lyrics-control-pill .ll-pill-transport {\r
  align-items: center;\r
  gap: 6px;\r
  height: auto;\r
  margin: 0;\r
  padding: 0;\r
}\r
\r
/* Both are out of the pill until the panel is maximized. The card keeps its own\r
   transport throughout; this is a second row, not that one moved. */\r
.liquid-lyrics-control-pill .ll-pill-transport,\r
.liquid-lyrics-control-pill .ll-pill-divider {\r
  display: none;\r
}\r
\r
.ll-pill-divider {\r
  flex: none;\r
  width: 1px;\r
  height: 24px;\r
  border-radius: 1px;\r
  background: currentColor;\r
  opacity: 0.22;\r
}\r
\r
.liquid-lyrics-control-pill.ll-pill-has-transport .ll-pill-transport {\r
  display: inline-flex;\r
}\r
\r
.liquid-lyrics-control-pill.ll-pill-has-transport .ll-pill-divider {\r
  display: block;\r
}\r
\r
/* Docked to a side, the pill stacks into a column \u2014 so the rule has to lie down\r
   with it. */\r
.liquid-lyrics-panel[data-control-position="left"] .liquid-lyrics-control-pill .ll-pill-transport,\r
.liquid-lyrics-panel[data-control-position="right"] .liquid-lyrics-control-pill .ll-pill-transport {\r
  flex-direction: column;\r
}\r
\r
.liquid-lyrics-panel[data-control-position="left"] .ll-pill-divider,\r
.liquid-lyrics-panel[data-control-position="right"] .ll-pill-divider {\r
  width: 24px;\r
  height: 1px;\r
}\r
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
.liquid-lyrics-panel:has(:focus-visible) .liquid-lyrics-control-pill {\r
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
  /* The same measure the layout reserved for it, so the text block and the space\r
     set aside for it are one number rather than two that can disagree. */\r
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
  /* Stands down wherever the ::after rim is already drawing this \u2014 see the pair\r
     of rules below. */\r
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
/* The card draws its edge twice: once on the element above and once on the\r
   ::after rim further down. Under Liquify (v1 and v2) and under an adopted\r
   third-party theme the two variables resolve to the same value, so the same\r
   hairline is laid on top of itself and reads about twice as strong as it does\r
   everywhere else. The rim keeps it \u2014 it is what all the other surfaces use, and\r
   it is the one the theme bridge can still reach on the rules that carry\r
   !important.\r
\r
   Which is why this is a pair of narrow rules rather than simply deleting the\r
   declaration above. The two variables are *not* always the same: under Glowify\r
   the rim is deliberately \`none\` (Glowify draws its edge as an outline) and the\r
   surface value is an outer glow. That glow cannot move to the ::after, because\r
   this card clips its children \u2014 an outer shadow on a pseudo-element would be cut\r
   off at the border. So the element keeps drawing, and only stands down where the\r
   rim has actually taken over.\r
\r
   #glass-filter--r1-7 is the Liquify detector used throughout this file; v1 and\r
   v2 both expose it. */\r
:root:has(#glass-filter--r1-7) .liquid-lyrics-sidebar-card,\r
:root.ll-theme-adopted .liquid-lyrics-sidebar-card {\r
  box-shadow: none;\r
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
  padding: 0 0 0px;\r
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
.liquid-lyrics-panel:fullscreen::backdrop {\r
  background: transparent;\r
}\r
\r
/* On the view, not the panel: the base rule now declares --ll-card-col there, and\r
   a value set directly on an element beats one inherited from its parent. */\r
.liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
.liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
  --ll-card-w: clamp(280px, min(26cqw, calc(100vh - 340px)), 460px);\r
  --ll-lyrics-col: calc(820px * var(--ll-font-scale, 1) + 84px);\r
  grid-template-columns: var(--ll-card-col) minmax(300px, auto);\r
  /* Deliberately far wider than the windowed gap: there is a whole screen to\r
     spread over, and the same figure that reads as generous in a panel reads as\r
     cramped across a monitor. */\r
  --ll-gap: clamp(96px, 10cqw, 300px);\r
  padding: 84px clamp(42px, 4.6cqw, 104px) 58px;\r
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
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    --ll-card-w: clamp(200px, min(24cqw, calc(100vh - 300px)), 300px);\r
    grid-template-columns: var(--ll-card-col) minmax(240px, auto);\r
    --ll-gap: clamp(34px, 4.5cqw, 76px);\r
    padding-top: 72px;\r
    padding-bottom: 42px;\r
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
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    --ll-card-w: clamp(200px, min(22cqw, calc(100vh - 280px)), 260px);\r
    grid-template-columns: var(--ll-card-col) minmax(220px, auto);\r
    --ll-gap: clamp(26px, 3.5cqw, 56px);\r
    padding-top: 56px;\r
    padding-bottom: 34px;\r
  }\r
\r
  /* Short windows lower the ceiling; the floor and the slope stay with the card's\r
     own width. Setting a flat size here would have overridden that and put the\r
     row back to overflowing on a narrow card. */\r
  .ll-song-card-controls {\r
    --ll-card-btn: clamp(24px, 15cqw, 32px);\r
    --ll-card-glyph: clamp(15px, 8.5cqw, 18px);\r
  }\r
\r
  .ll-song-card-title {\r
    font-size: 15px;\r
  }\r
}\r
\r
/* Two steps of tightening before the card is given up. The card's floor stays at\r
   200px throughout: below that the transport row is a huddle of stamps and the\r
   artwork stops being worth showing \u2014 better to drop the column entirely than to\r
   keep a version of it nobody can use. */\r
@container (max-width: 1000px) {\r
  .liquid-lyrics-view {\r
    --ll-card-w: clamp(200px, min(24cqw, calc(100vh - 300px)), 290px);\r
    grid-template-columns: var(--ll-card-col) minmax(240px, auto);\r
    --ll-gap: clamp(32px, 4.5cqw, 70px);\r
    padding: 72px clamp(18px, 3cqw, 48px) 48px;\r
  }\r
}\r
\r
@container (max-width: 820px) {\r
  .liquid-lyrics-view {\r
    --ll-card-w: clamp(200px, min(23cqw, calc(100vh - 290px)), 250px);\r
    grid-template-columns: var(--ll-card-col) minmax(220px, auto);\r
    --ll-gap: clamp(24px, 3.5cqw, 52px);\r
    padding: 64px clamp(14px, 2.4cqw, 34px) 42px;\r
  }\r
\r
  .liquid-lyrics-content {\r
    padding: 60px clamp(12px, 2cqw, 32px) 96px;\r
  }\r
}\r
\r
/* 200 + 14 + 240 + 28 of padding is 482, so this is the last width at which both\r
   still fit with room to breathe. */\r
@container (max-width: 620px) {\r
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    grid-template-columns: minmax(0, 1fr);\r
    gap: 0;\r
    padding: 72px clamp(20px, 4cqw, 68px) 54px;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    display: none;\r
  }\r
\r
  .liquid-lyrics-content {\r
    padding: 70px clamp(18px, 4cqw, 64px) 124px;\r
  }\r
\r
  .liquid-lyrics-line,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-line,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-line {\r
    max-width: 900px;\r
    --ll-line-size: clamp(27px, 4cqw, 38px);\r
  }\r
}\r
\r
/* Height, which no container query can see \u2014 a panel can be wide and far too\r
   short for two columns of anything. */\r
@media (max-height: 560px) {\r
  .liquid-lyrics-view,\r
  .liquid-lyrics-panel:fullscreen .liquid-lyrics-view,\r
  .liquid-lyrics-panel.ll-fullscreen-mode .liquid-lyrics-view {\r
    grid-template-columns: minmax(0, 1fr);\r
    gap: 0;\r
    padding: 72px clamp(20px, 4cqw, 68px) 54px;\r
  }\r
\r
  .liquid-lyrics-song-card {\r
    display: none;\r
  }\r
\r
  .liquid-lyrics-content {\r
    padding: 70px clamp(18px, 4cqw, 64px) 124px;\r
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
/* The card's column deliberately stays at full width while the card is hidden.\r
   Collapsing it moved everything left of the lyrics rightwards, against the card's\r
   own exit \u2014 see .ll-song-card-hidden .liquid-lyrics-content, which now does the\r
   job with a transform instead. */\r
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
.liquid-lyrics-panel[data-control-position="top"]:has(:focus-visible) .liquid-lyrics-control-pill {\r
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
.liquid-lyrics-panel[data-control-position="left"]:has(:focus-visible) .liquid-lyrics-control-pill {\r
  transform: translate3d(0, -50%, 0) scale(1);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="right"] .liquid-lyrics-control-pill {\r
  right: 24px;\r
  transform: translate3d(28px, -50%, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel[data-control-position="right"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel[data-control-position="right"]:has(:focus-visible) .liquid-lyrics-control-pill {\r
  transform: translate3d(0, -50%, 0) scale(1);\r
}\r
\r
/* The idle fade has to restate the docked resting transform for every edge, or\r
   the bottom-dock rule further up would drag a side-docked pill horizontally. */\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="top"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="top"]:has(:focus-visible) .liquid-lyrics-control-pill {\r
  transform: translate3d(-50%, -14px, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="left"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="left"]:has(:focus-visible) .liquid-lyrics-control-pill {\r
  transform: translate3d(-14px, -50%, 0) scale(0.98);\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="right"]:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle[data-control-position="right"]:has(:focus-visible) .liquid-lyrics-control-pill {\r
  transform: translate3d(14px, -50%, 0) scale(0.98);\r
}\r
\r
/* --- Song card side ----------------------------------------------------------------\r
   The columns are reordered rather than moved, because grid order is not an\r
   animatable property. The swap itself is therefore instant and the slide-in\r
   below covers it \u2014 which reads as the two columns trading places. */\r
\r
/* Mirrored by swapping the tracks and the items' order. Grid order is not an\r
   animatable property, so the swap itself is instant and the slide from panel.ts\r
   covers it. */\r
.liquid-lyrics-panel[data-card-side="right"] .liquid-lyrics-view {\r
  grid-template-columns: minmax(240px, auto) var(--ll-card-col);\r
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
/* The card was given \`position: relative\` a second time here, to be the\r
   containing block for the overlay below. It is now absolutely positioned in\r
   section 4, which is a containing block just as well \u2014 and this rule, coming\r
   later, was quietly turning that back into a relative box. The card then sat at\r
   its static position offset by \`left\`, which happens to look identical while the\r
   card is on the left and put it a full panel width off when it was on the right.\r
   Removed; the overlay's containing block is unchanged. */\r
\r
.ll-song-card-overlay {\r
  position: absolute;\r
  inset: 0;\r
  z-index: 2;\r
  display: none;\r
  flex-direction: column;\r
  justify-content: flex-end;\r
  align-items: stretch;\r
  /* Against the card as well, so the transport and the progress bar keep their\r
     margins to the artwork's edge at any card size instead of crowding it. */\r
  gap: clamp(4px, 2.4cqw, 8px);\r
  padding: clamp(6px, 3.5cqw, 12px) clamp(6px, 4cqw, 14px) clamp(6px, 4cqw, 14px);\r
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
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:has(:focus-visible) .ll-song-card-controls {\r
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
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:has(:focus-visible) .ll-song-card-overlay::before {\r
  opacity: 1;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-progress,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:has(:focus-visible) .ll-song-card-progress {\r
  opacity: 1;\r
  transform: translate3d(0, 0, 0);\r
}\r
\r
/* Full opacity, not beautiful-lyrics' half.\r
   Theirs is 0.5 while the controls are up and 1 while the cover art is hovered \u2014\r
   but their heart is already on screen at that point, so the half step reads as\r
   "present, not aimed at". Ours only exists during the hover, so the same 0.5\r
   just made it look faded, as though it had failed to finish arriving. Their two\r
   nested hover states have no counterpart here; the outer one is the only one we\r
   have, so it takes the full value. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-heart,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:has(:focus-visible) .ll-song-card-heart {\r
  opacity: 1;\r
  transform: translate3d(0, 0, 0);\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:hover .ll-song-card-btn,\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:has(:focus-visible) .ll-song-card-btn {\r
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
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-cover-wrap:has(:focus-visible) .ll-song-card-overlay {\r
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
  /* Restated against the retightened viewBox (see HEART_VIEW_BOX): the same\r
     number draws 1.24x thicker in 19.4 units than it did in 24, so it comes down\r
     to keep this one looking as it did. The large cover heart deliberately does\r
     not \u2014 see below. */\r
  stroke-width: 1.55;\r
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
  /* Bottom inset, not a plain \`inset: 0\`, for two separate reasons.\r
\r
     The centring: the transport and the progress bar are laid over the lower\r
     part of the artwork, so the space the heart actually sits in ends well above\r
     the bottom edge. Centred against the whole cover it read as sitting low.\r
     Holding the bottom off by 16% centres it in the space that is left. It is not\r
     a transform, because the press scale and the like animation both own that.\r
\r
     The width: \`inset: 0\` with \`width: auto\` stretches the box across the whole\r
     cover, which quietly makes aspect-ratio moot and \u2014 worse \u2014 makes the halves'\r
     clip-path percentages refer to the cover's width instead of the heart's. An\r
     explicit square is what those polygons were drawn against. */\r
  inset: 0 0 16% 0;\r
  margin: auto;\r
  /* Raised from 45% to hold the drawn heart at the size it was before the\r
     viewBox gained its margin: the box now carries 19.4 units of shape where it\r
     carried 17.4, so it has to be about a ninth larger to draw the same heart. */\r
  height: 51%;\r
  width: 51%;\r
  padding: 0;\r
  background: none !important;\r
  backdrop-filter: none !important;\r
  -webkit-backdrop-filter: none !important;\r
  box-shadow: none !important;\r
  outline: none !important;\r
  /* Pure white, not a near-white. */\r
  color: #fff;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-heart svg {\r
  width: 100%;\r
  height: 100%;\r
  /* Left where it was rather than rescaled with the viewBox, so it now draws\r
     about a third heavier. beautiful-lyrics' unliked heart is a solid ring, not a\r
     hairline outline, and at this size a 1.1 stroke on the old grid was thin\r
     enough to look like a sketch of a heart. */\r
  stroke-width: 1.1;\r
  stroke-linecap: round;\r
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
/* --- Heart motion, after beautiful-lyrics -------------------------------------\r
   Ported from its .LikeState (Extension/Source/LyricViews/Page, with the\r
   sequences in Page/Animations/Heart). Four things there differ from what this\r
   used to do, and each is the reason for a rule below:\r
\r
   1. Nothing moves on its own. The old arrangement beat once every 1.1s for as\r
      long as the pointer rested anywhere on the artwork \u2014 motion nobody asked\r
      for, running forever. Hovering now tilts the two halves apart by 2.5\r
      degrees and leaves them there: one gesture that answers the pointer and\r
      then stops.\r
   2. The liked heart *is* the two halves rather than a whole heart with the\r
      halves hidden behind it. That is what gives the tilt something to move, and\r
      it makes the break a continuation of the shape already on screen instead of\r
      a swap to a different one.\r
   3. Liking overshoots hard \u2014 to 1.6 \u2014 and springs back, where this used to bump\r
      to 1.32 and stop.\r
   4. Breaking throws the pieces clear of the artwork rather than dropping them a\r
      few pixels, and the outline fades back in a tenth of the way through, so\r
      there is never a moment with no heart at all.\r
   --------------------------------------------------------------------------- */\r
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
/* Clipped along a jagged seam rather than a straight edge, so the heart looks\r
   torn instead of sliced. The two polygons are complements of each other, which\r
   keeps the crack continuous. */\r
.ll-heart-half {\r
  opacity: 0;\r
  /* Bottom centre, like beautiful-lyrics: the pieces pivot about the point of\r
     the heart, so they swing outwards instead of spinning about their middles. */\r
  transform-origin: 50% 100%;\r
  --ll-heart-rot: 0deg;\r
  --ll-heart-seam: 0px;\r
  transform: translateX(var(--ll-heart-seam)) rotate(var(--ll-heart-rot));\r
  /* The hover tilt eases in over the same 0.6s and settles past its target. */\r
  transition: transform 600ms cubic-bezier(0.22, 1.5, 0.36, 1);\r
}\r
\r
/* Half a pixel inwards each, so the two halves overlap along the seam instead of\r
   leaving a hairline of artwork showing between them. */\r
.ll-heart-half-left {\r
  --ll-heart-seam: 0.5px;\r
}\r
\r
.ll-heart-half-right {\r
  --ll-heart-seam: -0.5px;\r
}\r
\r
/* The halves stand in for the liked heart only while something is actually\r
   moving them \u2014 hovering, pressing, breaking. At rest the whole heart is shown\r
   instead.\r
\r
   They are two clipped copies of the same drawing, so however far they are made\r
   to overlap along the seam, its antialiasing is still faintly there. Leaving\r
   them up permanently put a hairline crack across a heart that was not supposed\r
   to be broken. beautiful-lyrics has no such problem: their filled heart is a\r
   purpose-drawn two-piece shape, not one shape cut in half.\r
   Held through the break as well, because updateHeartState drops .active 120ms\r
   in, long before the pieces have finished flying. */\r
/* Every rule from here to the end of the break is scoped to the cover style.\r
\r
   That heart is the size of a hand and is the only thing on the artwork, so it\r
   can carry a gesture. The default style's is a 34px button in the corner of a\r
   card: two halves swinging apart at that size read as a rendering glitch rather\r
   than a break, and there is nowhere for the pieces to fly to. It fills and\r
   unfills, and nothing else \u2014 see the end of this section. */\r
[data-card-style="cover"] .ll-song-card-heart.active:hover .ll-heart-half,\r
[data-card-style="cover"] .ll-song-card-heart.active:focus-visible .ll-heart-half,\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-breaking .ll-heart-half {\r
  opacity: 1;\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.active:hover:not(.ll-heart-breaking) .ll-heart-whole,\r
[data-card-style="cover"]\r
  .ll-song-card-heart.active:focus-visible:not(.ll-heart-breaking)\r
  .ll-heart-whole {\r
  opacity: 0;\r
}\r
\r
/* Filled for as long as they are the heart \u2014 including mid-break, where .active\r
   has already gone. */\r
[data-card-style="cover"] .ll-song-card-heart.active .ll-heart-half svg,\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-breaking .ll-heart-half svg {\r
  fill: currentColor;\r
}\r
\r
/* The hover gesture: apart by 2.5 degrees, and stay. Only while liked \u2014 the\r
   outline has no halves to move. */\r
[data-card-style="cover"] .ll-song-card-heart.active:hover:not(.ll-heart-breaking) .ll-heart-half-left {\r
  --ll-heart-rot: -2.5deg;\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.active:hover:not(.ll-heart-breaking) .ll-heart-half-right {\r
  --ll-heart-rot: 2.5deg;\r
}\r
\r
/* Pressing pushes the tilt further and shrinks the whole button, quickly \u2014 this\r
   is feedback, not an animation. */\r
[data-card-style="cover"] .ll-song-card-heart.active:active:not(.ll-heart-breaking) .ll-heart-half-left {\r
  --ll-heart-rot: -10deg;\r
  transition-duration: 75ms;\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.active:active:not(.ll-heart-breaking) .ll-heart-half-right {\r
  --ll-heart-rot: 10deg;\r
  transition-duration: 75ms;\r
}\r
\r
/* The heart is a .ll-song-card-btn, and that rule declares its whole transition\r
   list !important \u2014 so the 420ms opacity the overlay hands its children never\r
   reached the heart, whatever the specificity. It has been appearing as a cut\r
   while the progress bar and the transport around it glided in.\r
\r
   Restated here in full, with opacity added, and !important of its own so it\r
   actually wins. Everything else is exactly the button's own list: taking the\r
   springy press curve away to fix the fade would have traded one fault for\r
   another. */\r
.liquid-lyrics-panel[data-card-style="cover"] .ll-song-card-heart {\r
  transition:\r
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),\r
    transform 280ms cubic-bezier(0.3, 2, 0.32, 1),\r
    box-shadow 280ms ease,\r
    color 180ms ease,\r
    background 220ms ease !important;\r
}\r
\r
/* The press has to be immediate \u2014 beautiful-lyrics gives it 0.075s liked and\r
   0.125s not. The button's own transition is 280ms and springy and carries\r
   !important, so without one here the shrink arrived late and wobbled, which is\r
   the opposite of feedback. The release keeps the spring, and should. */\r
.liquid-lyrics-panel[data-card-style="cover"]\r
  .ll-song-card-heart.active:active:not(.ll-heart-breaking):not(.ll-heart-popping) {\r
  transform: scale(0.5);\r
  transition: transform 75ms ease-out !important;\r
}\r
\r
.liquid-lyrics-panel[data-card-style="cover"]\r
  .ll-song-card-heart:not(.active):active:not(.ll-heart-breaking):not(.ll-heart-popping) {\r
  transform: scale(0.75);\r
  transition: transform 125ms ease-out !important;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .ll-heart-half {\r
    transition: none;\r
  }\r
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
/* Liking: the whole button overshoots to 1.6 and springs back, while the outline\r
   hands over to the filled halves under it. */\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-popping {\r
  animation: ll-heart-pop 550ms cubic-bezier(0.22, 1, 0.36, 1);\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-popping .ll-heart-whole {\r
  animation: ll-heart-hand-off 200ms ease forwards;\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-popping .ll-heart-half {\r
  animation: ll-heart-hand-in 200ms ease forwards;\r
}\r
\r
@keyframes ll-heart-hand-off {\r
  to {\r
    opacity: 0;\r
  }\r
}\r
\r
@keyframes ll-heart-hand-in {\r
  to {\r
    opacity: 1;\r
  }\r
}\r
\r
/* Breaking: the pieces leave, and the outline is back before they are gone. Held\r
   open for three quarters of the sequence \u2014 the old behaviour \u2014 read as the heart\r
   vanishing and then reappearing; beautiful-lyrics brings it back at a tenth of\r
   the way through, so what you see is the outline the pieces came off. */\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-breaking .ll-heart-whole {\r
  animation: ll-heart-return 800ms linear forwards;\r
}\r
\r
@keyframes ll-heart-return {\r
  0%,\r
  10% {\r
    opacity: 0;\r
  }\r
  15%,\r
  100% {\r
    opacity: 1;\r
  }\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-breaking .ll-heart-half-left {\r
  animation: ll-heart-break-left 800ms cubic-bezier(0.34, 0.06, 0.28, 1) forwards;\r
}\r
\r
[data-card-style="cover"] .ll-song-card-heart.ll-heart-breaking .ll-heart-half-right {\r
  animation: ll-heart-break-right 800ms cubic-bezier(0.34, 0.06, 0.28, 1) forwards;\r
}\r
\r
/* The default style's heart: fill and unfill, nothing else.\r
   Everything above is scoped to the cover style, so the halves stay at the\r
   opacity 0 their base rule gives them and the whole heart is never hidden \u2014 the\r
   classes the click still adds simply have no rule left to match. What remains is\r
   the accent colour arriving in the shape, and leaving it again.\r
   The fill is on the <svg>, whose transition the button's !important list does\r
   not reach \u2014 that one is on the button itself. */\r
.liquid-lyrics-panel:not([data-card-style="cover"]) .ll-song-card-heart svg {\r
  transition:\r
    fill 280ms cubic-bezier(0.22, 1, 0.36, 1),\r
    stroke 280ms cubic-bezier(0.22, 1, 0.36, 1);\r
}\r
\r
@keyframes ll-heart-pop {\r
  0% {\r
    transform: scale(1);\r
  }\r
  30% {\r
    transform: scale(1.6);\r
  }\r
  55% {\r
    transform: scale(0.93);\r
  }\r
  75% {\r
    transform: scale(1.05);\r
  }\r
  90% {\r
    transform: scale(0.99);\r
  }\r
  100% {\r
    transform: scale(1);\r
  }\r
}\r
\r
/* The first sixth is the wind-up: the halves hold still while the outline\r
   arrives. Then they swing out about the point of the heart and clear the\r
   artwork entirely \u2014 beautiful-lyrics throws them more than twice the cover's\r
   width sideways and three times its height down, which is what makes it read as\r
   the heart coming apart rather than the pieces sliding aside.\r
\r
   Percentages resolve against the half's own box, so these are multiples of the\r
   heart, not of the cover: the heart is about 40% of the artwork, which is where\r
   550% and 875% come from. The mid stop bends the fall into an arc \u2014 a straight\r
   line at a constant rate is what made the old version look pasted on. */\r
@keyframes ll-heart-break-left {\r
  0%,\r
  15% {\r
    transform: translate(0.5px, 0) rotate(0deg);\r
    opacity: 1;\r
  }\r
  58% {\r
    transform: translate(-255%, 190%) rotate(-73deg);\r
    opacity: 1;\r
  }\r
  90% {\r
    opacity: 1;\r
  }\r
  100% {\r
    transform: translate(-550%, 875%) rotate(-110deg);\r
    opacity: 0;\r
  }\r
}\r
\r
/* Turned a little further than the left piece and thrown the same distance, so\r
   the two never read as one mirrored object. */\r
@keyframes ll-heart-break-right {\r
  0%,\r
  15% {\r
    transform: translate(-0.5px, 0) rotate(0deg);\r
    opacity: 1;\r
  }\r
  58% {\r
    transform: translate(255%, 190%) rotate(78deg);\r
    opacity: 1;\r
  }\r
  90% {\r
    opacity: 1;\r
  }\r
  100% {\r
    transform: translate(550%, 875%) rotate(117.5deg);\r
    opacity: 0;\r
  }\r
}\r
\r
\r
/* --- No lyrics: the alternatives to the message ------------------------------\r
   Settings \u2192 Lyrics \u2192 "When there are no lyrics". A song without lyrics still\r
   has artwork, and the panel is mostly empty space either way \u2014 these two put\r
   the artwork in it instead of a sentence saying there is nothing.\r
   --------------------------------------------------------------------------- */\r
\r
/* Enlarged card: the lyrics column has nothing to hold, so it goes and the card\r
   takes the whole panel, centred. The card's own column width is a custom\r
   property that already animates, so the change eases rather than jumps. */\r
.liquid-lyrics-panel[data-empty-style="card"] .liquid-lyrics-view {\r
  grid-template-columns: minmax(0, 1fr);\r
  justify-items: center;\r
}\r
\r
.liquid-lyrics-panel[data-empty-style="card"] .liquid-lyrics-song-card {\r
  width: min(420px, 76%);\r
  max-width: none;\r
}\r
\r
.liquid-lyrics-panel[data-empty-style="card"] .liquid-lyrics-content {\r
  display: none;\r
}\r
\r
/* Vinyl: the record *is* the artwork, so the song card beside it would be the\r
   same cover twice. It goes, and the turntable has the panel to itself. */\r
.liquid-lyrics-panel[data-empty-style="vinyl"] .liquid-lyrics-song-card {\r
  display: none;\r
}\r
\r
.liquid-lyrics-panel[data-empty-style="vinyl"] .liquid-lyrics-view {\r
  grid-template-columns: minmax(0, 1fr);\r
  /* The lyrics column carries a stated width, so in a single full-width track it\r
     sits at the start rather than filling it \u2014 the record ended up against the\r
     left edge. The enlarged-card style centres its one column for the same\r
     reason. */\r
  justify-items: center;\r
}\r
\r
.ll-empty-vinyl {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: min(58vh, 72%);\r
  aspect-ratio: 1;\r
  /* The same spring the song card and the lyrics arrive on, so the record drops\r
     in and settles rather than easing to a stop. */\r
  animation: ll-vinyl-arrive 620ms cubic-bezier(0.7, 1.5, 0.64, 1) both;\r
}\r
\r
.ll-vinyl-disc {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  border-radius: 50%;\r
  /* Also what keeps the turning artwork inside the record: the image below is\r
     square and its corners sweep outside the circle as it goes round. */\r
  overflow: hidden;\r
  /* The sleeve is square; a round crop of it is the whole trick. The rim and the\r
     sheen are what stop it reading as a circular mask over a photo. */\r
  box-shadow:\r
    0 18px 48px rgba(0, 0, 0, 0.45),\r
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),\r
    inset 0 0 60px rgba(0, 0, 0, 0.55);\r
}\r
\r
/* The artwork turns, the record does not.\r
   Rotating the disc itself was what made a scrollbar come and go on a loop: a\r
   square box's bounding box grows as it turns, peaking near 45 degrees at\r
   1.41 times its width, and the scroller counted that as overflow \u2014 every turn,\r
   for a couple of seconds, for ever. The disc is round, so turning it was never\r
   visible anyway; only the picture inside it has anything to show for it, and\r
   the disc's overflow keeps that within the circle. */\r
.ll-vinyl-cover {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  display: block;\r
  /* Paused rather than stopped, so it holds its angle while the music does. The\r
     animation runs from the moment it is built; only its play state moves. */\r
  animation: ll-vinyl-spin 12s linear infinite;\r
  animation-play-state: paused;\r
}\r
\r
.liquid-lyrics-panel.ll-playing .ll-vinyl-cover {\r
  animation-play-state: running;\r
}\r
\r
/* Up from below, past the resting place, then back onto it \u2014 the middle keyframe\r
   is what makes it a bounce rather than a fade that happens to move. A plain\r
   two-stop from-to could only ever ease to a stop, however springy the curve, so\r
   the overshoot has to be in the frames as well as in the timing. */\r
@keyframes ll-vinyl-arrive {\r
  0% {\r
    opacity: 0;\r
    transform: translate3d(0, 38px, 0) scale(0.9);\r
  }\r
  64% {\r
    opacity: 1;\r
    transform: translate3d(0, -9px, 0) scale(1.022);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translate3d(0, 0, 0) scale(1);\r
  }\r
}\r
\r
/* The pressed grooves: concentric rings, drawn rather than imaged. */\r
.ll-vinyl-disc::after {\r
  content: "";\r
  position: absolute;\r
  inset: 0;\r
  border-radius: 50%;\r
  pointer-events: none;\r
  background: repeating-radial-gradient(\r
    circle at 50% 50%,\r
    rgba(0, 0, 0, 0.22) 0 1px,\r
    rgba(255, 255, 255, 0.04) 1px 3px\r
  );\r
  opacity: 0.5;\r
  /* Cleared through the middle, where the label sits. */\r
  mask-image: radial-gradient(circle at 50% 50%, transparent 0 22%, black 26%);\r
  -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 0 22%, black 26%);\r
}\r
\r
.ll-vinyl-label {\r
  position: absolute;\r
  inset: 0;\r
  margin: auto;\r
  width: 34%;\r
  height: 34%;\r
  border-radius: 50%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: var(--liquid-lyrics-accent);\r
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);\r
}\r
\r
.ll-vinyl-hole {\r
  width: 13%;\r
  height: 13%;\r
  border-radius: 50%;\r
  background: #06080b;\r
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);\r
}\r
\r
@keyframes ll-vinyl-spin {\r
  to {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .ll-vinyl-cover,\r
  .ll-empty-vinyl {\r
    animation: none;\r
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
/* Maximized only, and each on its own switch: the track details are worth having\r
   in a windowed panel and are the first thing in the way of an immersive one.\r
   Faded rather than removed, so the card does not resize under them.\r
\r
   Gated on .ll-ui-idle, so they leave on the same beat as the header, the control\r
   pill and the scrollbar rather than the instant the panel is maximized. Any\r
   movement brings all of it back together. Where the auto-hide is switched off\r
   nothing fades, these included \u2014 which is the consistent answer, not an\r
   oversight. */\r
.liquid-lyrics-panel.ll-ui-idle.ll-fs-fade-title .ll-song-card-title,\r
.liquid-lyrics-panel.ll-ui-idle.ll-fs-fade-artist .ll-song-card-artist,\r
.liquid-lyrics-panel.ll-ui-idle.ll-fs-fade-album .ll-song-card-album {\r
  opacity: 0;\r
  pointer-events: none;\r
  transition: opacity 480ms cubic-bezier(0.22, 1, 0.36, 1);\r
}\r
\r
.ll-song-card-title,\r
.ll-song-card-album,\r
.ll-song-card-artist {\r
  transition: opacity 480ms cubic-bezier(0.22, 1, 0.36, 1);\r
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
/* No height easing while pinned. Expanded, the height is driven by a measured\r
   custom property, so every re-measure during a drag of the sidebar's edge\r
   started a fresh 520ms ease \u2014 the card spent the whole drag chasing the pointer\r
   and only caught up once it stopped. The expand and collapse moves are played by\r
   FLIP in sidebarCard.ts and do not need it either. */\r
.liquid-lyrics-sidebar-card.ll-expanded {\r
  transition: opacity 300ms ease;\r
}\r
\r
/* Expanded, this is a full-height reading view rather than a three-line strip.\r
   The strip's fade is 15% of its height, which is a few tens of pixels there and\r
   well over a hundred in a card four times as tall \u2014 the opening lines were\r
   inside the band before they had a chance to be read.\r
\r
   One pair of numbers feeds both the band and the room the first and last lines\r
   need to clear it, so the two cannot drift apart the way a fixed padding and a\r
   percentage band did. Pixels rather than percentages, because the card's height\r
   swings with the window and a proportional band grows to something absurd on a\r
   tall monitor. */\r
.liquid-lyrics-sidebar-card.ll-expanded {\r
  --ll-card-fade-top: 72px;\r
  --ll-card-fade-bottom: 104px;\r
}\r
\r
.liquid-lyrics-sidebar-card.ll-expanded .ll-sidebar-mini-viewport {\r
  mask-image: linear-gradient(\r
    to bottom,\r
    transparent 0,\r
    black var(--ll-card-fade-top),\r
    black calc(100% - var(--ll-card-fade-bottom)),\r
    transparent 100%\r
  );\r
  -webkit-mask-image: linear-gradient(\r
    to bottom,\r
    transparent 0,\r
    black var(--ll-card-fade-top),\r
    black calc(100% - var(--ll-card-fade-bottom)),\r
    transparent 100%\r
  );\r
}\r
\r
.liquid-lyrics-sidebar-card.ll-expanded .ll-sidebar-mini-lines {\r
  padding: var(--ll-card-fade-top) 22px var(--ll-card-fade-bottom);\r
}\r
\r
/* Inert while pinned \u2014 the collapse it triggers is refused there, and a title\r
   that still offers itself as a button is a promise the card does not keep. */\r
.liquid-lyrics-sidebar-card.ll-expanded .ll-sidebar-header-main {\r
  cursor: default;\r
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
.liquid-lyrics-panel.ll-ui-idle:has(:focus-visible) .liquid-lyrics-control-pill {\r
  opacity: 0;\r
  pointer-events: none;\r
}\r
\r
.liquid-lyrics-panel.ll-ui-idle:hover .liquid-lyrics-control-pill,\r
.liquid-lyrics-panel.ll-ui-idle:has(:focus-visible) .liquid-lyrics-control-pill {\r
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
  /* Left on the 12px every other control in here uses, rather than an 8px of its\r
     own. Both declarations have to go together: the variable is what the radius\r
     guard reads, so setting only one of them makes the two disagree. */\r
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
\r
/* --- 14. First-run onboarding -------------------------------------------------\r
   The shape is Liquify V2's onboarding (src/settings/components/Onboarding.tsx):\r
   a transparent click blocker, a ring whose enormous spread dims everything it is\r
   not around, and a card hanging under whatever is being pointed at. The surface\r
   itself is ours \u2014 the same backdrop, rim and spring the settings menu uses, so\r
   the tour looks like the thing it is introducing. */\r
\r
.ll-ob-blocker {\r
  position: fixed;\r
  inset: 0;\r
  /* Above the settings overlay, which the last step opens: the tour has to keep\r
     swallowing clicks while it is on top of it. */\r
  z-index: 2147483630;\r
  background: transparent;\r
  animation: ll-ob-fade-in 300ms ease-out both;\r
}\r
\r
/* The dimming *is* the ring: a 9999px spread paints everything outside the\r
   highlighted control, leaving it as a hole in the shade. One element, one\r
   composited layer, and no mask to keep in step with the anchor. */\r
.ll-ob-spot {\r
  position: fixed;\r
  z-index: 2147483632;\r
  border-radius: 15px;\r
  pointer-events: none;\r
  box-shadow:\r
    0 0 0 9999px rgba(0, 0, 0, 0.68),\r
    0 0 0 2px var(--liquid-lyrics-accent, #1ed760),\r
    0 0 18px 3px color-mix(in srgb, var(--liquid-lyrics-accent, #1ed760) 55%, transparent);\r
  animation:\r
    ll-ob-fade-in 300ms ease-out both,\r
    ll-ob-spot-pulse 2.4s ease-in-out 300ms infinite;\r
}\r
\r
.ll-ob-spot.is-out {\r
  animation: ll-ob-fade-out 200ms ease-in both;\r
}\r
\r
@keyframes ll-ob-spot-pulse {\r
  0%,\r
  100% {\r
    box-shadow:\r
      0 0 0 9999px rgba(0, 0, 0, 0.68),\r
      0 0 0 2px var(--liquid-lyrics-accent, #1ed760),\r
      0 0 18px 3px color-mix(in srgb, var(--liquid-lyrics-accent, #1ed760) 55%, transparent);\r
  }\r
  50% {\r
    box-shadow:\r
      0 0 0 9999px rgba(0, 0, 0, 0.68),\r
      0 0 0 2px var(--liquid-lyrics-accent, #1ed760),\r
      0 0 28px 7px color-mix(in srgb, var(--liquid-lyrics-accent, #1ed760) 70%, transparent);\r
  }\r
}\r
\r
@keyframes ll-ob-fade-in {\r
  from {\r
    opacity: 0;\r
  }\r
  to {\r
    opacity: 1;\r
  }\r
}\r
\r
@keyframes ll-ob-fade-out {\r
  from {\r
    opacity: 1;\r
  }\r
  to {\r
    opacity: 0;\r
  }\r
}\r
\r
.ll-ob-card {\r
  position: fixed;\r
  z-index: 2147483634;\r
  /* Written by onboarding.ts, which also needs the number to place the card and\r
     aim the arrow \u2014 one constant, read from one place. border-box so that number\r
     is the whole card: as content-box the padding was added on top, and the card\r
     hung off the right of the screen by exactly the 36px it did not know about. */\r
  box-sizing: border-box;\r
  width: var(--ll-ob-card-w, 304px);\r
  padding: 16px 18px 14px;\r
  border-radius: 18px;\r
  color: #fff;\r
  background: transparent;\r
  backdrop-filter: var(--liquid-lyrics-settings-backdrop) brightness(0.78);\r
  -webkit-backdrop-filter: var(--liquid-lyrics-settings-backdrop) brightness(0.78);\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
  font-family: var(--font-family, "Spotify Mix", "CircularSp", system-ui, sans-serif);\r
  pointer-events: all;\r
  will-change: transform, opacity;\r
  /* The settings panel's own opening spring, so the two surfaces arrive alike. */\r
  animation: ll-ob-card-in 380ms cubic-bezier(0.34, 1.56, 0.64, 1) both;\r
}\r
\r
/* Left and top are written by reposition(); this only sets where it grows from. */\r
.ll-ob-card--anchor {\r
  transform-origin: top right;\r
}\r
\r
/* The step that opens the settings menu sits in the middle, over the panel it has\r
   just opened \u2014 the same ending Liquify's tour uses.\r
\r
   Centred by a full-screen flex wrapper rather than by the card's own transform:\r
   the entrance animation owns \`transform\`, so a translate(-50%, -50%) written\r
   beside it would be dropped the moment the animation took hold. That is exactly\r
   why Liquify wraps its centred cards too (their comment calls it the old "slides\r
   in from the corner" glitch). The wrapper itself takes no clicks, so covering the\r
   screen with it does not widen what the tour swallows. */\r
.ll-ob-centre {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483634;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  pointer-events: none;\r
}\r
\r
.ll-ob-card--centre {\r
  position: relative;\r
  transform-origin: center;\r
}\r
\r
.ll-ob-card.is-out {\r
  animation: ll-ob-card-out 240ms cubic-bezier(0.8, 0, 0.2, 1) both;\r
}\r
\r
@keyframes ll-ob-card-in {\r
  from {\r
    opacity: 0;\r
    transform: scale(0.88);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: scale(1);\r
  }\r
}\r
\r
@keyframes ll-ob-card-out {\r
  from {\r
    opacity: 1;\r
    transform: scale(1);\r
  }\r
  to {\r
    opacity: 0;\r
    transform: translateY(8px) scale(0.95);\r
  }\r
}\r
\r
/* A notch rather than a border triangle: the card has no border to match, and a\r
   solid triangle over a backdrop-filtered surface would be the only opaque thing\r
   on it. */\r
.ll-ob-arrow {\r
  position: absolute;\r
  top: -7px;\r
  width: 14px;\r
  height: 8px;\r
  margin-left: -7px;\r
  background: rgba(255, 255, 255, 0.16);\r
  clip-path: polygon(50% 0, 100% 100%, 0 100%);\r
}\r
\r
.ll-ob-card--centre .ll-ob-arrow {\r
  display: none;\r
}\r
\r
.ll-ob-dots {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
  margin-bottom: 12px;\r
}\r
\r
.ll-ob-dot {\r
  width: 6px;\r
  height: 6px;\r
  border-radius: 50%;\r
  background: rgba(255, 255, 255, 0.25);\r
  transition:\r
    background 250ms ease,\r
    width 250ms ease,\r
    border-radius 250ms ease;\r
}\r
\r
.ll-ob-dot.is-active {\r
  width: 16px;\r
  border-radius: 3px;\r
  background: var(--liquid-lyrics-accent, #1ed760);\r
}\r
\r
.ll-ob-eyebrow {\r
  margin-bottom: 6px;\r
  font-size: 10px;\r
  font-weight: 700;\r
  letter-spacing: 0.14em;\r
  text-transform: uppercase;\r
  color: var(--liquid-lyrics-accent, #1ed760);\r
}\r
\r
.ll-ob-title {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  margin-bottom: 7px;\r
  font-size: 14px;\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.96);\r
}\r
\r
.ll-ob-title svg {\r
  width: 16px;\r
  height: 16px;\r
  flex-shrink: 0;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-ob-text {\r
  margin: 0 0 14px;\r
  font-size: 12px;\r
  line-height: 1.55;\r
  color: rgba(255, 255, 255, 0.74);\r
}\r
\r
.ll-ob-actions {\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-end;\r
  gap: 8px;\r
}\r
\r
.ll-ob-btn {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  padding: 7px 14px;\r
  border: 0;\r
  border-radius: 11px;\r
  font: inherit;\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: #fff;\r
  background: transparent;\r
  cursor: pointer;\r
  transition:\r
    background-color 180ms ease,\r
    transform 120ms ease,\r
    color 150ms ease;\r
}\r
\r
.ll-ob-btn svg {\r
  width: 13px;\r
  height: 13px;\r
  flex-shrink: 0;\r
  fill: none;\r
  stroke: currentColor;\r
  stroke-width: 2.4;\r
  stroke-linecap: round;\r
  stroke-linejoin: round;\r
}\r
\r
.ll-ob-btn--primary {\r
  box-shadow: var(--liquid-lyrics-surface-shadow);\r
  outline: var(--glowify-outline, none) !important;\r
}\r
\r
.ll-ob-btn--primary:hover {\r
  background: color-mix(in srgb, var(--liquid-lyrics-accent, #1ed760) 72%, transparent);\r
  transform: scale(1.04);\r
}\r
\r
.ll-ob-btn--ghost {\r
  color: rgba(255, 255, 255, 0.58);\r
}\r
\r
.ll-ob-btn--ghost:hover {\r
  color: rgba(255, 255, 255, 0.92);\r
}\r
\r
/* The tour is a one-off orientation, not a decoration \u2014 with motion reduced it\r
   still has to be readable, so everything stops moving and simply appears. */\r
@media (prefers-reduced-motion: reduce) {\r
  .ll-ob-card,\r
  .ll-ob-card.is-out,\r
  .ll-ob-spot,\r
  .ll-ob-spot.is-out,\r
  .ll-ob-blocker {\r
    animation-duration: 1ms;\r
    animation-iteration-count: 1;\r
  }\r
}\r
`;function Il(){let t="liquid-lyrics-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=Rl,document.head.appendChild(e)}var Pf=".main-nowPlayingBar-lyricsButton, .vVsHwFW9rx4CZOne",Nl=!1;function Pl(){Nl||(Nl=!0,document.addEventListener("click",t=>{C().spotifyLyricsButton!=="override"||!t.target?.closest?.(Pf)||(t.preventDefault(),t.stopImmediatePropagation(),Fi())},!0))}var Ji="ll-theme-adopted",zl="blur(32px)",Ol=".main-nowPlayingView-section",zf="var(--liquid-lyrics-accent-outline)",qn=null,An=0,_n="";function Hl(){Rn();let t=0;if(An=window.setInterval(()=>{t++,Rn(),(t>40||document.querySelector(Ol))&&(window.clearInterval(An),An=0)},400),!qn){let e=0;qn=new MutationObserver(()=>{e||(e=window.setTimeout(()=>{e=0,Rn()},300))}),qn.observe(document.body,{childList:!0,subtree:!0})}}function Rn(){let t=document.documentElement;if(Hf()){if(t.classList.contains(Ji)){t.classList.remove(Ji);for(let u of Bf)t.style.removeProperty(u);_n=""}return}let e=Of(),i=e?getComputedStyle(e):null,r=Ie(i?.boxShadow),n=Ie(i?.backdropFilter)??Ie(i?.webkitBackdropFilter),o=Ie(i?.backgroundColor),a=i?Ff(i.borderRadius):void 0,s=r?void 0:Fl(i),l=`${r}|${s}|${n}|${o}|${a}`;if(l===_n&&t.classList.contains(Ji))return;_n=l,t.classList.add(Ji);let c=(u,h)=>t.style.setProperty(u,h),d=r??s??zf;c("--liquid-lyrics-surface-shadow",d),c("--liquid-lyrics-song-card-shadow",d),c("--liquid-lyrics-rim-shadow",d),c("--liquid-lyrics-flat-rim",d),c("--liquid-lyrics-surface-backdrop",n??zl),c("--liquid-lyrics-settings-backdrop",n??zl),c("--ll-theme-card-bg",o??"transparent"),c("--ll-theme-card-radius",a??"20px")}var Bf=["--liquid-lyrics-surface-shadow","--liquid-lyrics-song-card-shadow","--liquid-lyrics-rim-shadow","--liquid-lyrics-flat-rim","--liquid-lyrics-surface-backdrop","--liquid-lyrics-settings-backdrop","--ll-theme-card-bg","--ll-theme-card-radius"];function Of(){let t=Array.from(document.querySelectorAll(Ol)),e=null;for(let i of t){if(e??(e=i),Bl(i))return i;let r=i.getBoundingClientRect().width;for(let n of Array.from(i.children))if(!(n.getBoundingClientRect().width<r*.9)&&Bl(n))return n}return e}function Bl(t){let e=getComputedStyle(t);return!!(Ie(e.boxShadow)||Fl(e)||Ie(e.backgroundColor)||Ie(e.borderRadius))}function Hf(){if(document.getElementById("glass-filter--r1-7"))return!0;let t=getComputedStyle(document.documentElement);return In(t.getPropertyValue("--liquify-shadow"))||In(t.getPropertyValue("--glass-shadow"))||In(t.getPropertyValue("--glowify-shadow"))}function Fl(t){if(!t)return;let e=Number.parseFloat(t.borderTopWidth||"0"),i=t.borderTopStyle,r=t.borderTopColor;if(!(!Number.isFinite(e)||e<=0)&&!(!i||i==="none"||i==="hidden")&&Ie(r))return`inset 0 0 0 ${e}px ${r}`}function In(t){let e=t.trim();return e!==""&&e!=="none"}function Ie(t){if(!t)return;let e=t.trim();if(!(e===""||e==="none"||e==="auto")&&!/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(e)&&e!=="0px")return e}function Ff(t){if(!t)return;let e=t.trim();if(!(e===""||e==="none"||e==="auto"))return e}var Df="--liquid-lyrics-accent-auto",Uf=["VIBRANT","VIBRANT_NON_ALARMING","PROMINENT","LIGHT_VIBRANT","DESATURATED"];var Nn="",Dl=!1;function Vl(){if(!Dl){Dl=!0,Ul();try{Spicetify.Player?.addEventListener?.("songchange",t=>void Ul(t?.data?.item))}catch{}}}async function Ul(t){let e=t??Spicetify.Player?.data?.item,i=e?.uri;if(!i||i===Nn)return;Nn=i;let r=await Wf(jf(e))??await Vf(i);if(!r){Nn="";return}document.documentElement.style.setProperty(Df,$f(r))}function jf(t){let e=t?.metadata?.image_url;return typeof e!="string"||!e?null:e.replace("spotify:image:","https://i.scdn.co/image/")}async function Wf(t){if(!t)return null;if(/^https?:/i.test(t)){let i=await jl(t,!0),r=i&&Wl(i);if(r)return r}let e=await jl(t,!1);return e?Wl(e):null}function jl(t,e){return new Promise(i=>{let r=new Image;e&&(r.crossOrigin="Anonymous"),r.onload=()=>i(r),r.onerror=()=>i(null),r.src=t})}function Wl(t){try{let e=Math.min(1,Math.sqrt(1e6/(t.width*t.height))),i=Math.max(1,Math.round(t.width*e)),r=Math.max(1,Math.round(t.height*e)),n=document.createElement("canvas");n.width=i,n.height=r;let o=n.getContext("2d",{willReadFrequently:!0});if(!o)return null;o.drawImage(t,0,0,i,r);let{data:a}=o.getImageData(0,0,i,r),s=0,l=0,c=0,d=0;for(let u=0;u<a.length;u+=4)s+=a[u],l+=a[u+1],c+=a[u+2],d++;return d?`rgb(${Math.round(s/d)},${Math.round(l/d)},${Math.round(c/d)})`:null}catch{return null}}async function Vf(t){try{let e=await Spicetify.colorExtractor?.(t);if(e)for(let i of Uf){let r=e[i];if(typeof r=="string"&&r.trim())return r.trim()}}catch{}try{let e=await Spicetify.extractColorPreset?.(t),i=Array.isArray(e)?e[0]:e;for(let r of[i?.colorRaw,i?.colorLight,i?.colorDark]){let n=Kf(r);if(n)return n}}catch{}return null}function Kf(t){if(!t)return null;if(typeof t=="string")return Pn(t)?t.trim():null;let e=t.hex??(typeof t.toCSS=="function"?t.toCSS():void 0)??(typeof t.toString=="function"?t.toString():void 0);return typeof e=="string"&&Pn(e)?e.trim():null}function $f(t){let e=Pn(t);if(!e)return t;let{h:i,s:r,l:n}=Gf(e);return Yf({h:i,s:Math.min(1,r*1.35+.08),l:Math.min(.72,Math.max(.46,n*1.15))})}function Pn(t){let e=/^#?([0-9a-f]{6})$/i.exec(t.trim());if(e){let r=Number.parseInt(e[1],16);return{r:r>>16&255,g:r>>8&255,b:r&255}}let i=t.match(/\d+(\.\d+)?/g);return i&&i.length>=3?{r:Number(i[0]),g:Number(i[1]),b:Number(i[2])}:null}function Gf({r:t,g:e,b:i}){let r=t/255,n=e/255,o=i/255,a=Math.max(r,n,o),s=Math.min(r,n,o),l=(a+s)/2,c=a-s;if(c===0)return{h:0,s:0,l};let d=l>.5?c/(2-a-s):c/(a+s),u;return a===r?u=(n-o)/c%6:a===n?u=(o-r)/c+2:u=(r-n)/c+4,u*=60,u<0&&(u+=360),{h:u,s:d,l}}function Yf({h:t,s:e,l:i}){return`hsl(${t.toFixed(1)} ${(e*100).toFixed(1)}% ${(i*100).toFixed(1)}%)`}async function Xf(){let t=window;if(t.__liquidLyricsLoaded){console.warn("[Liquid Lyrics] Second instance detected \u2014 skipping initialization.");return}t.__liquidLyricsLoaded=!0,await me(()=>Spicetify?.Player?.data&&Spicetify?.CosmosAsync),Il(),pi(),Hl(),Vl(),Bs(),Pl(),Na(),ut(),Yi(),await me(()=>document.querySelector(".main-nowPlayingBar-extraControls")).catch(()=>null),yl();let e=null,i=null,r="Loading lyrics...",n=0,o=Kl();async function a(){let p=Spicetify.Player.data;if(!p?.item?.uri)return;let g=p.item.uri,x=g.includes(":")?g.split(":")[2]:g;if(x===e){Tn(),$();return}e=x,i=null,r="Loading lyrics...",Tn(),Ml(r),O()&&ht(r),await s(x,p.item)}async function s(p,g){let x=++n,E=await Yt({id:p,uri:g.uri,data:{name:g.name}});if(!(x!==n||p!==e)){if(E.status==="success"&&E.data){i=E.data,r="",Ln(E.data),O()&&nn(E.data);return}i=null,r=E.status==="missing_lyrics"?"No lyrics available for this song":"Could not load lyrics",Ln(null,r,!0),O()&&ht(r,!0)}}Spicetify.Player.addEventListener("songchange",()=>{a()}),window.addEventListener(ir,p=>{let g=Spicetify.Player.data,x=g?.item?.uri;if(!x)return;let E=x.includes(":")?x.split(":")[2]:x,f=p.detail??{};(f.trackUri||f.trackId)&&f.trackUri!==x&&f.trackId!==E||(i=null,s(E,g.item))});let l=()=>{let p=Kl();p!==o&&(o=p,O()&&Hi())};setInterval(()=>{l()},250);let c=Spicetify.Platform?.History;typeof c?.listen=="function"&&c.listen(l);let d=O(),u=new MutationObserver(()=>{let p=O();if(vl(),$(),p&&!d&&e)if(i)nn(i);else if(r&&r!=="Loading lyrics...")ht(r,!0);else{let g=Spicetify.Player.data;if(g?.item?.uri){let x=g.item.uri.includes(":")?g.item.uri.split(":")[2]:g.item.uri;ht("Loading lyrics..."),s(x,g.item)}}d=p}),h=document.getElementById("liquid-lyrics-panel");h&&u.observe(h,{attributes:!0,attributeFilter:["class"]}),$(),a()}Xf();function Kl(){let e=Spicetify.Platform?.History?.location??{},i=e.pathname||e.path||e.uri||"";return`${location.href}|${i}`}})();
