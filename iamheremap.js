/* ======================================================================
    jquery.js
   ====================================================================== */

/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
/* ======================================================================
    modestmaps.js
   ====================================================================== */

/* ======================================================================
    lib/raphael.js
   ====================================================================== */

/*
 * Raphael 0.7.3 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */


var Raphael = (function () {
    var separator = /[, ]+/,
        create,
        doc = document,
        win = window,
        R = function () {
            return create.apply(R, arguments);
        },
        paper = {},
        availableAttrs = {cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", gradient: 0, height: 0, href: "http://raphaeljs.com/", opacity: 1, path: "M0,0", r: 0, rotation: 0, rx: 0, ry: 0, scale: "1 1", src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", translation: "0 0", width: 0, x: 0, y: 0},
        availableAnimAttrs = {cx: "number", cy: "number", fill: "colour", "fill-opacity": "number", "font-size": "number", height: "number", opacity: "number", path: "path", r: "number", rotation: "csv", rx: "number", ry: "number", scale: "csv", stroke: "colour", "stroke-opacity": "number", "stroke-width": "number", translation: "csv", width: "number", x: "number", y: "number"},
        events = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup"];
    R.version = "0.7.3";
    R.type = (window.SVGAngle ? "SVG" : "VML");
    R.svg = !(R.vml = R.type == "VML");
    R.idGenerator = 0;
    R.fn = {};
    R.toString = function () {
        return  "Your browser " + (this.vml ? "doesn't ": "") + "support" + (this.svg ? "s": "") +
                " SVG.\nYou are running " + unescape("Rapha%EBl%20") + this.version;
    };
    R.setWindow = function (newwin) {
        win = newwin;
        doc = win.document;
    };
    // colour utilities
    R.hsb2rgb = function (hue, saturation, brightness) {
        if (typeof hue == "object" && "h" in hue && "s" in hue && "b" in hue) {
            brightness = hue.b;
            saturation = hue.s;
            hue = hue.h;
        }
        var red,
            green,
            blue;
        if (brightness == 0) {
            return {r: 0, g: 0, b: 0, hex: "#000"};
        }
        if (hue > 1 || saturation > 1 || brightness > 1) {
            hue /= 255;
            saturation /= 255;
            brightness /= 255;
        }
        var i = Math.floor(hue * 6),
            f = (hue * 6) - i,
            p = brightness * (1 - saturation),
            q = brightness * (1 - (saturation * f)),
            t = brightness * (1 - (saturation * (1 - f)));
        red = [brightness, q, p, p, t, brightness, brightness][i];
        green = [t, brightness, brightness, q, p, p, t][i];
        blue = [p, p, t, brightness, brightness, q, p][i];
        red *= 255;
        green *= 255;
        blue *= 255;
        var rgb = {r: red, g: green, b: blue};
        var r = Math.round(red).toString(16);
        if (r.length == 1) {
            r = "0" + r;
        }
        var g = Math.round(green).toString(16);
        if (g.length == 1) {
            g = "0" + g;
        }
        var b = Math.round(blue).toString(16);
        if (b.length == 1) {
            b = "0" + b;
        }
        rgb.hex = "#" + r + g + b;
        return rgb;
    };
    R.rgb2hsb = function (red, green, blue) {
        if (typeof red == "object" && "r" in red && "g" in red && "b" in red) {
            blue = red.b;
            green = red.g;
            red = red.r;
        }
        if (typeof red == "string") {
            var clr = getRGB(red);
            red = clr.r;
            green = clr.g;
            blue = clr.b;
        }
        if (red > 1 || green > 1 || blue > 1) {
            red /= 255;
            green /= 255;
            blue /= 255;
        }
        var max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
            hue,
            saturation,
            brightness = max;
        if (min == max) {
            return {h: 0, s: 0, b: max};
        } else {
            var delta = (max - min);
            saturation = delta / max;
            if (red == max) {
                hue = (green - blue) / delta;
            } else if (green == max) {
                hue = 2 + ((blue - red) / delta);
            } else {
                hue = 4 + ((red - green) / delta);
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        return {h: hue, s: saturation, b: brightness};
    };
    var getRGB = function (colour) {
        var htmlcolors = {aliceblue: "#f0f8ff", amethyst: "#96c", antiquewhite: "#faebd7", aqua: "#0ff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000", blanchedalmond: "#ffebcd", blue: "#00f", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#0ff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#f0f", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#789", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#0f0", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#f0f", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", red: "#f00", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#fff", whitesmoke: "#f5f5f5", yellow: "#ff0", yellowgreen: "#9acd32"};
        if (colour.toString().toLowerCase() in htmlcolors) {
            colour = htmlcolors[colour.toString().toLowerCase()];
        }
        if (!colour) {
            return {r: 0, g: 0, b: 0, hex: "#000"};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none"};
        }
        var red, green, blue,
            rgb = colour.match(/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hsb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i);
        if (rgb) {
            if (rgb[2]) {
                blue = parseInt(rgb[2].substring(5), 16);
                green = parseInt(rgb[2].substring(3, 5), 16);
                red = parseInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = parseInt(rgb[3].substring(3) + rgb[3].substring(3), 16);
                green = parseInt(rgb[3].substring(2, 3) + rgb[3].substring(2, 3), 16);
                red = parseInt(rgb[3].substring(1, 2) + rgb[3].substring(1, 2), 16);
            }
            if (rgb[4]) {
                rgb = rgb[4].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10);
                green = parseFloat(rgb[1], 10);
                blue = parseFloat(rgb[2], 10);
            }
            if (rgb[5]) {
                rgb = rgb[5].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10) * 2.55;
                green = parseFloat(rgb[1], 10) * 2.55;
                blue = parseFloat(rgb[2], 10) * 2.55;
            }
            if (rgb[6]) {
                rgb = rgb[6].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10);
                green = parseFloat(rgb[1], 10);
                blue = parseFloat(rgb[2], 10);
                return Raphael.hsb2rgb(red, green, blue);
            }
            if (rgb[7]) {
                rgb = rgb[7].split(/\s*,\s*/);
                red = parseFloat(rgb[0], 10) * 2.55;
                green = parseFloat(rgb[1], 10) * 2.55;
                blue = parseFloat(rgb[2], 10) * 2.55;
                return Raphael.hsb2rgb(red, green, blue);
            }
            var rgb = {r: red, g: green, b: blue};
            var r = Math.round(red).toString(16);
            (r.length == 1) && (r = "0" + r);
            var g = Math.round(green).toString(16);
            (g.length == 1) && (g = "0" + g);
            var b = Math.round(blue).toString(16);
            (b.length == 1) && (b = "0" + b);
            rgb.hex = "#" + r + g + b;
            return rgb;
        } else {
            return {r: -1, g: -1, b: -1, hex: "none"};
        }
    };
    R.getColor = function (value) {
        var start = arguments.callee.start = arguments.callee.start || {h: 0, s: 1, b: value || .75};
        var rgb = Raphael.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            if (start.s <= 0) {
                arguments.callee.start = {h: 0, s: 1, b: start.b};
            }
        }
        return rgb.hex;
    };
    R.getColor.reset = function () {
        delete this.start;
    };
    // path utilities
    R.parsePathString = function (pathString) {
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            toString = function () {
                var res = "";
                for (var i = 0, ii = this.length; i < ii; i++) {
                    res += this[i][0] + this[i].join(",").substring(2);
                }
                return res;
            };
        if (pathString.toString.toString() == toString.toString()) {
            return pathString;
        }
        pathString.replace(/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, function (a, b, c) {
            var params = [], name = b.toLowerCase();
            c.replace(/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, function (a, b) {
                b && params.push(+b);
            });
            while (params.length >= paramCounts[name]) {
                data.push([b].concat(params.splice(0, paramCounts[name])));
                if (!paramCounts[name]) {
                    break;
                };
            }
        });
        data.toString = toString;
        return data;
    };
    var pathDimensions = function (path) {
        var pathArray = path;
        if (typeof path == "string") {
            pathArray = Raphael.parsePathString(path);
        }
        pathArray = pathToAbsolute(pathArray);
        var x = [], y = [], length = 0;
        for (var i = 0, ii = pathArray.length; i < ii; i++) {
            switch (pathArray[i][0]) {
                case "Z":
                    break;
                case "A":
                    x.push(pathArray[i][pathArray[i].length - 2]);
                    y.push(pathArray[i][pathArray[i].length - 1]);
                    break;
                default:
                    for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                        if (j % 2) {
                            x.push(pathArray[i][j]);
                        } else {
                            y.push(pathArray[i][j]);
                        }
                    }
            }
        }
        var minx = Math.min.apply(Math, x),
            miny = Math.min.apply(Math, y);
        return {
            x: minx,
            y: miny,
            width: Math.max.apply(Math, x) - minx,
            height: Math.max.apply(Math, y) - miny,
            X: x,
            Y: y
        };
    };
    var pathToRelative = function (pathArray) {
        var res = [];
        if (typeof pathArray == "string") {
            pathArray = R.parsePathString(pathArray);
        }
        var x = 0, y = 0, start = 0;
        if (pathArray[0][0] == "M") {
            x = pathArray[0][1];
            y = pathArray[0][2];
            start++;
            res.push(pathArray[0]);
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            if (pathArray[i][0] != pathArray[i][0].toLowerCase()) {
                res[i][0] = pathArray[i][0].toLowerCase();
                switch (res[i][0]) {
                    case "a":
                        res[i][1] = pathArray[i][1];
                        res[i][2] = pathArray[i][2];
                        res[i][3] = 0;
                        res[i][4] = pathArray[i][4];
                        res[i][5] = pathArray[i][5];
                        res[i][6] = +(pathArray[i][6] - x).toFixed(3);
                        res[i][7] = +(pathArray[i][7] - y).toFixed(3);
                        break;
                    case "v":
                        res[i][1] = +(pathArray[i][1] - y).toFixed(3);
                        break;
                    default:
                        for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                            res[i][j] = +(pathArray[i][j] - ((j % 2) ? x : y)).toFixed(3);
                        }
                }
            } else {
                res[i] = pathArray[i];
            }
            switch (res[i][0]) {
                case "z":
                    break;
                case "h":
                    x += res[i][res[i].length - 1];
                    break;
                case "v":
                    y += res[i][res[i].length - 1];
                    break;
                default:
                    x += res[i][res[i].length - 2];
                    y += res[i][res[i].length - 1];
            }
        }
        res.toString = pathArray.toString;
        return res;
    };
    var pathToAbsolute = function (pathArray) {
        var res = [];
        if (typeof pathArray == "string") {
            pathArray = R.parsePathString(pathArray);
        }
        var x = 0,
            y = 0,
            start = 0;
        if (pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            start++;
            res[0] = pathArray[0];
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            if (pathArray[i][0] != (pathArray[i][0] + "").toUpperCase()) {
                res[i][0] = (pathArray[i][0] + "").toUpperCase();
                switch (res[i][0]) {
                    case "A":
                        res[i][1] = pathArray[i][1];
                        res[i][2] = pathArray[i][2];
                        res[i][3] = 0;
                        res[i][4] = pathArray[i][4];
                        res[i][5] = pathArray[i][5];
                        res[i][6] = +(pathArray[i][6] + x).toFixed(3);
                        res[i][7] = +(pathArray[i][7] + y).toFixed(3);
                        break;
                    case "V":
                        res[i][1] = +pathArray[i][1] + y;
                        break;
                    default:
                        for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                            res[i][j] = +pathArray[i][j] + ((j % 2) ? x : y);
                        }
                }
            } else {
                res[i] = pathArray[i];
            }
            switch (res[i][0]) {
                case "Z":
                    break;
                case "H":
                    x = res[i][1];
                    break;
                case "V":
                    y = res[i][1];
                    break;
                default:
                    x = res[i][res[i].length - 2];
                    y = res[i][res[i].length - 1];
            }
        }
        res.toString = pathArray.toString;
        return res;
    };
    var pathEqualiser = function (path1, path2) {
        var data = [pathToAbsolute(Raphael.parsePathString(path1)), pathToAbsolute(Raphael.parsePathString(path2))],
            attrs = [{x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0}, {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0}],
            processPath = function (path, d) {
                if (!path) {
                    return ["U"];
                }
                switch (path[0]) {
                    case "M":
                        d.X = path[1];
                        d.Y = path[2];
                        break;
                    case "S":
                        var nx = d.x + (d.x - (d.bx || d.x));
                        var ny = d.y + (d.y - (d.by || d.y));
                        path = ["C", nx, ny, path[1], path[2], path[3], path[4]];
                        break;
                    case "T":
                        var nx = d.x + (d.x - (d.bx || d.x));
                        var ny = d.y + (d.y - (d.by || d.y));
                        path = ["Q", nx, ny, path[1], path[2]];
                        break;
                    case "H":
                        path = ["L", path[1], d.y];
                        break;
                    case "V":
                        path = ["L", d.x, path[1]];
                        break;
                    case "Z":
                        path = ["L", d.X, d.Y];
                        break;
                }
                return path;
            },
            edgeCases = function (a, b, i) {
                if (data[a][i][0] == "M" && data[b][i][0] != "M") {
                    data[b].splice(i, 0, ["M", attrs[b].x, attrs[b].y]);
                    attrs[a].bx = data[a][i][data[a][i].length - 4] || 0;
                    attrs[a].by = data[a][i][data[a][i].length - 3] || 0;
                    attrs[a].x = data[a][i][data[a][i].length - 2];
                    attrs[a].y = data[a][i][data[a][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "L" && data[b][i][0] == "C") {
                    data[a][i] = ["C", attrs[a].x, attrs[a].y, data[a][i][1], data[a][i][2], data[a][i][1], data[a][i][2]];
                } else if (data[a][i][0] == "L" && data[b][i][0] == "Q") {
                    data[a][i] = ["Q", data[a][i][1], data[a][i][2], data[a][i][1], data[a][i][2]];
                } else if (data[a][i][0] == "Q" && data[b][i][0] == "C") {
                    var x = data[b][i][data[b][i].length - 2];
                    var y = data[b][i][data[b][i].length - 1];
                    data[b].splice(i + 1, 0, ["Q", x, y, x, y]);
                    data[a].splice(i, 0, ["C", attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y]);
                    i++;
                    attrs[b].bx = data[b][i][data[b][i].length - 4] || 0;
                    attrs[b].by = data[b][i][data[b][i].length - 3] || 0;
                    attrs[b].x = data[b][i][data[b][i].length - 2];
                    attrs[b].y = data[b][i][data[b][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "A" && data[b][i][0] == "C") {
                    var x = data[b][i][data[b][i].length - 2];
                    var y = data[b][i][data[b][i].length - 1];
                    data[b].splice(i + 1, 0, ["A", 0, 0, data[a][i][3], data[a][i][4], data[a][i][5], x, y]);
                    data[a].splice(i, 0, ["C", attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y]);
                    i++;
                    attrs[b].bx = data[b][i][data[b][i].length - 4] || 0;
                    attrs[b].by = data[b][i][data[b][i].length - 3] || 0;
                    attrs[b].x = data[b][i][data[b][i].length - 2];
                    attrs[b].y = data[b][i][data[b][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "U") {
                    data[a][i][0] = data[b][i][0];
                    for (var j = 1, jj = data[b][i].length; j < jj; j++) {
                        data[a][i][j] = (j % 2) ? attrs[a].x : attrs[a].y;
                    }
                }
                return false;
            };
        for (var i = 0; i < Math.max(data[0].length, data[1].length); i++) {
            data[0][i] = processPath(data[0][i], attrs[0]);
            data[1][i] = processPath(data[1][i], attrs[1]);
            if (data[0][i][0] != data[1][i][0] && (edgeCases(0, 1, i) || edgeCases(1, 0, i))) {
                continue;
            }
            attrs[0].bx = data[0][i][data[0][i].length - 4] || 0;
            attrs[0].by = data[0][i][data[0][i].length - 3] || 0;
            attrs[0].x = data[0][i][data[0][i].length - 2];
            attrs[0].y = data[0][i][data[0][i].length - 1];
            attrs[1].bx = data[1][i][data[1][i].length - 4] || 0;
            attrs[1].by = data[1][i][data[1][i].length - 3] || 0;
            attrs[1].x = data[1][i][data[1][i].length - 2];
            attrs[1].y = data[1][i][data[1][i].length - 1];
        }
        return data;
    };
    var toGradient = function (gradient) {
        if (typeof gradient == "string") {
            gradient = gradient.split(/\s*\-\s*/);
            var angle = gradient.shift();
            if (angle.toLowerCase() == "v") {
                angle = 90;
            } else if (angle.toLowerCase() == "h") {
                angle = 0;
            } else {
                angle = parseFloat(angle, 10);
            }
            angle = -angle;
            var grobj = {angle: angle, type: "linear", dots: [], vector: [0, 0, Math.cos(angle * Math.PI / 180).toFixed(3), Math.sin(angle * Math.PI / 180).toFixed(3)]};
            var max = 1 / (Math.max(Math.abs(grobj.vector[2]), Math.abs(grobj.vector[3])) || 1);
            grobj.vector[2] *= max;
            grobj.vector[3] *= max;
            if (grobj.vector[2] < 0) {
                grobj.vector[0] = -grobj.vector[2];
                grobj.vector[2] = 0;
            }
            if (grobj.vector[3] < 0) {
                grobj.vector[1] = -grobj.vector[3];
                grobj.vector[3] = 0;
            }
            grobj.vector[0] = grobj.vector[0].toFixed(3);
            grobj.vector[1] = grobj.vector[1].toFixed(3);
            grobj.vector[2] = grobj.vector[2].toFixed(3);
            grobj.vector[3] = grobj.vector[3].toFixed(3);
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {};
                var par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = getRGB(par[1]).hex;
                par[2] && (dot.offset = par[2] + "%");
                grobj.dots.push(dot);
            }
            for (var i = 1, ii = grobj.dots.length - 1; i < ii; i++) {
                if (!grobj.dots[i].offset) {
                    var start = parseFloat(grobj.dots[i - 1].offset || 0, 10),
                        end = false;
                    for (var j = i + 1; j < ii; j++) {
                        if (grobj.dots[j].offset) {
                            end = grobj.dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = parseFloat(end, 10);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        grobj.dots[i].offset = start + "%";
                    }
                }
            }
            return grobj;
        } else {
            return gradient;
        }
    };
    var getContainer = function () {
        var container, x, y, width, height;
        if (typeof arguments[0] == "string" || typeof arguments[0] == "object") {
            if (typeof arguments[0] == "string") {
                container = doc.getElementById(arguments[0]);
            } else {
                container = arguments[0];
            }
            if (container.tagName) {
                if (arguments[1] == null) {
                    return {
                        container: container,
                        width: container.style.pixelWidth || container.offsetWidth,
                        height: container.style.pixelHeight || container.offsetHeight
                    };
                } else {
                    return {container: container, width: arguments[1], height: arguments[2]};
                }
            }
        } else if (typeof arguments[0] == "number" && arguments.length > 3) {
            return {container: 1, x: arguments[0], y: arguments[1], width: arguments[2], height: arguments[3]};
        }
    };
    var plugins = function (con, scope, add) {
        for (var prop in add) if (!(prop in con)) {
            switch (typeof add[prop]) {
                case "function":
                    con[prop] = con === scope ? add[prop] : function () { add[prop].apply(scope, arguments); };
                break;
                case "object":
                    con[prop] = {};
                    plugins(con[prop], con, add[prop]);
                break;
                default:
                    con[prop] = add[prop];
                break;
            }
        }
    };

    // SVG
    if (R.svg) {
        var thePath = function (params, pathString, SVG) {
            var el = doc.createElementNS(SVG.svgns, "path");
            el.setAttribute("fill", "none");
            if (SVG.canvas) {
                SVG.canvas.appendChild(el);
            }
            var p = new Element(el, SVG);
            p.isAbsolute = true;
            p.type = "path";
            p.last = {x: 0, y: 0, bx: 0, by: 0};
            p.absolutely = function () {
                this.isAbsolute = true;
                return this;
            };
            p.relatively = function () {
                this.isAbsolute = false;
                return this;
            };
            p.moveTo = function (x, y) {
                var d = this.isAbsolute?"M":"m";
                d += parseFloat(x, 10).toFixed(3) + " " + parseFloat(y, 10).toFixed(3) + " ";
                var oldD = this[0].getAttribute("d") || "";
                (oldD == "M0,0") && (oldD = "");
                this[0].setAttribute("d", oldD + d);
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                this.attrs.path = oldD + d;
                return this;
            };
            p.lineTo = function (x, y) {
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                var d = this.isAbsolute?"L":"l";
                d += parseFloat(x, 10).toFixed(3) + " " + parseFloat(y, 10).toFixed(3) + " ";
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            };
            p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x, y) {
                var d = this.isAbsolute ? "A" : "a";
                d += [parseFloat(rx, 10).toFixed(3), parseFloat(ry, 10).toFixed(3), 0, large_arc_flag, sweep_flag, parseFloat(x, 10).toFixed(3), parseFloat(y, 10).toFixed(3)].join(" ");
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + d);
                this.last.x = parseFloat(x, 10);
                this.last.y = parseFloat(y, 10);
                this.attrs.path = oldD + d;
                return this;
            };
            p.cplineTo = function (x1, y1, w1) {
                if (!w1) {
                    return this.lineTo(x1, y1);
                } else {
                    var p = {};
                    var x = parseFloat(x1, 10);
                    var y = parseFloat(y1, 10);
                    var w = parseFloat(w1, 10);
                    var d = this.isAbsolute?"C":"c";
                    var attr = [+this.last.x + w, +this.last.y, x - w, y, x, y];
                    for (var i = 0, ii = attr.length; i < ii; i++) {
                        d += attr[i].toFixed(3) + " ";
                    }
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                    this.last.bx = attr[2];
                    this.last.by = attr[3];
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.attrs.path = oldD + d;
                    return this;
                }
            };
            p.curveTo = function () {
                var p = {},
                    command = [0, 1, 2, 3, "s", 5, "c"];

                var d = command[arguments.length];
                if (this.isAbsolute) {
                    d = d.toUpperCase();
                }
                for (var i = 0, ii = arguments.length; i < ii; i++) {
                    d += parseFloat(arguments[i], 10).toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1], 10);
                this.last.bx = parseFloat(arguments[arguments.length - 4], 10);
                this.last.by = parseFloat(arguments[arguments.length - 3], 10);
                var oldD = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            };
            p.qcurveTo = function () {
                var p = {},
                    command = [0, 1, "t", 3, "q"];

                var d = command[arguments.length];
                if (this.isAbsolute) {
                    d = d.toUpperCase();
                }
                for (var i = 0, ii = arguments.length; i < ii; i++) {
                    d += parseFloat(arguments[i], 10).toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1], 10);
                if (arguments.length != 2) {
                    this.last.qx = parseFloat(arguments[arguments.length - 4], 10);
                    this.last.qy = parseFloat(arguments[arguments.length - 3], 10);
                }
                var oldD = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            };
            p.addRoundedCorner = function (r, dir) {
                var R = .5522 * r, rollback = this.isAbsolute, o = this;
                if (rollback) {
                    this.relatively();
                    rollback = function () {
                        o.absolutely();
                    };
                } else {
                    rollback = function () {};
                }
                var actions = {
                    l: function () {
                        return {
                            u: function () {
                                o.curveTo(-R, 0, -r, -(r - R), -r, -r);
                            },
                            d: function () {
                                o.curveTo(-R, 0, -r, r - R, -r, r);
                            }
                        };
                    },
                    r: function () {
                        return {
                            u: function () {
                                o.curveTo(R, 0, r, -(r - R), r, -r);
                            },
                            d: function () {
                                o.curveTo(R, 0, r, r - R, r, r);
                            }
                        };
                    },
                    u: function () {
                        return {
                            r: function () {
                                o.curveTo(0, -R, -(R - r), -r, r, -r);
                            },
                            l: function () {
                                o.curveTo(0, -R, R - r, -r, -r, -r);
                            }
                        };
                    },
                    d: function () {
                        return {
                            r: function () {
                                o.curveTo(0, R, -(R - r), r, r, r);
                            },
                            l: function () {
                                o.curveTo(0, R, R - r, r, -r, r);
                            }
                        };
                    }
                };
                actions[dir[0]]()[dir[1]]();
                rollback();
                return o;
            };
            p.andClose = function () {
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + "Z ");
                this.attrs.path = oldD + "Z ";
                return this;
            };
            if (pathString) {
                p.attrs.path = "" + pathString;
                p.absolutely();
                paper.pathfinder(p, p.attrs.path);
            }
            if (params) {
                setFillAndStroke(p, params);
            }
            return p;
        };
        var addGrdientFill = function (o, gradient, SVG) {
            gradient = toGradient(gradient);
            var el = doc.createElementNS(SVG.svgns, (gradient.type || "linear") + "Gradient");
            el.id = "raphael-gradient-" + Raphael.idGenerator++;
            if (gradient.vector && gradient.vector.length) {
                el.setAttribute("x1", gradient.vector[0]);
                el.setAttribute("y1", gradient.vector[1]);
                el.setAttribute("x2", gradient.vector[2]);
                el.setAttribute("y2", gradient.vector[3]);
            }
            SVG.defs.appendChild(el);
            var isopacity = true;
            for (var i = 0, ii = gradient.dots.length; i < ii; i++) {
                var stop = doc.createElementNS(SVG.svgns, "stop");
                if (gradient.dots[i].offset) {
                    isopacity = false;
                }
                stop.setAttribute("offset", gradient.dots[i].offset ? gradient.dots[i].offset : (i == 0) ? "0%" : "100%");
                stop.setAttribute("stop-color", getRGB(gradient.dots[i].color).hex || "#fff");
                // ignoring opacity for internal points, because VML doesn't support it
                el.appendChild(stop);
            };
            if (isopacity && typeof gradient.dots[ii - 1].opacity != "undefined") {
                stop.setAttribute("stop-opacity", gradient.dots[ii - 1].opacity);
            }
            o.setAttribute("fill", "url(#" + el.id + ")");
            o.style.opacity = 1;
            o.style.fillOpacity = 1;
            o.setAttribute("opacity", 1);
            o.setAttribute("fill-opacity", 1);
        };
        var updatePosition = function (o) {
            if (o.pattern) {
                var bbox = o.node.getBBox();
                o.pattern.setAttribute("patternTransform", "translate(" + [bbox.x, bbox.y].join(",") + ")");
            }
        };
        var setFillAndStroke = function (o, params) {
            var dasharray = {
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            },
            addDashes = function (o, value) {
                value = dasharray[value.toString().toLowerCase()];
                if (value) {
                    var width = o.attrs["stroke-width"] || "1",
                        butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                        dashes = [];
                    for (var i = 0, ii = value.length; i < ii; i++) {
                        dashes.push(value[i] * width + ((i % 2) ? 1 : -1) * butt);
                    }
                    value = dashes.join(",");
                    o.node.setAttribute("stroke-dasharray", value);
                }
            };
            for (var att in params) {
                if (!(att in availableAttrs)) {
                    continue;
                }
                var value = params[att];
                o.attrs[att] = value;
                switch (att) {
                    // Hyperlink
                    case "href":
                    case "title":
                    case "target":
                        var pn = o.node.parentNode;
                        if (pn.tagName.toLowerCase() != "a") {
                            var hl = doc.createElementNS(o.svg.svgns, "a");
                            pn.insertBefore(hl, o.node);
                            hl.appendChild(o.node);
                            pn = hl;
                        }
                        pn.setAttributeNS(o.svg.xlink, att, value);
                      break;
                    case "path":
                        if (o.type == "path") {
                            o.node.setAttribute("d", "M0,0");
                            paper.pathfinder(o, value);
                        }
                    case "rx":
                    case "cx":
                    case "x":
                        o.node.setAttribute(att, value);
                        updatePosition(o);
                        break;
                    case "ry":
                    case "cy":
                    case "y":
                        o.node.setAttribute(att, value);
                        updatePosition(o);
                        break;
                    case "width":
                        o.node.setAttribute(att, value);
                        break;
                    case "height":
                        o.node.setAttribute(att, value);
                        break;
                    case "src":
                        if (o.type == "image") {
                            o.node.setAttributeNS(svg.xlink, "href", value);
                        }
                        break;
                    case "stroke-width":
                        o.node.style.strokeWidth = value;
                        // Need following line for Firefox
                        o.node.setAttribute(att, value);
                        if (o.attrs["stroke-dasharray"]) {
                            addDashes(o, o.attrs["stroke-dasharray"]);
                        }
                        break;
                    case "stroke-dasharray":
                        addDashes(o, value);
                        break;
                    case "rotation":
                        o.rotate(value, true);
                        break;
                    case "translation":
                        var xy = (value + "").split(separator);
                        o.translate((+xy[0] + 1 || 2) - 1, (+xy[1] + 1 || 2) - 1);
                        break;
                    case "scale":
                        var xy = (value + "").split(separator);
                        o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1);
                        break;
                    case "fill":
                        var isURL = value.match(/^url\(([^\)]+)\)$/i);
                        if (isURL) {
                            var el = doc.createElementNS(o.svg.svgns, "pattern");
                            var ig = doc.createElementNS(o.svg.svgns, "image");
                            el.id = "raphael-pattern-" + Raphael.idGenerator++;
                            el.setAttribute("x", 0);
                            el.setAttribute("y", 0);
                            el.setAttribute("patternUnits", "userSpaceOnUse");
                            ig.setAttribute("x", 0);
                            ig.setAttribute("y", 0);
                            ig.setAttributeNS(o.svg.xlink, "href", isURL[1]);
                            el.appendChild(ig);

                            var img = doc.createElement("img");
                            img.style.position = "absolute";
                            img.style.top = "-9999em";
                            img.style.left = "-9999em";
                            img.onload = function () {
                                el.setAttribute("width", this.offsetWidth);
                                el.setAttribute("height", this.offsetHeight);
                                ig.setAttribute("width", this.offsetWidth);
                                ig.setAttribute("height", this.offsetHeight);
                                doc.body.removeChild(this);
                                paper.safari();
                            };
                            doc.body.appendChild(img);
                            img.src = isURL[1];
                            o.svg.defs.appendChild(el);
                            o.node.style.fill = "url(#" + el.id + ")";
                            o.node.setAttribute("fill", "url(#" + el.id + ")");
                            o.pattern = el;
                            updatePosition(o);
                            break;
                        }
                        delete params.gradient;
                        delete o.attrs.gradient;
                        if (typeof o.attrs.opacity != "undefined" && typeof params.opacity == "undefined" ) {
                            o.node.style.opacity = o.attrs.opacity;
                            // Need following line for Firefox
                            o.node.setAttribute("opacity", o.attrs.opacity);
                        }
                        if (typeof o.attrs["fill-opacity"] != "undefined" && typeof params["fill-opacity"] == "undefined" ) {
                            o.node.style.fillOpacity = o.attrs["fill-opacity"];
                            // Need following line for Firefox
                            o.node.setAttribute("fill-opacity", o.attrs["fill-opacity"]);
                        }
                    case "stroke":
                        o.node.style[att] = getRGB(value).hex;
                        // Need following line for Firefox
                        o.node.setAttribute(att, getRGB(value).hex);
                        break;
                    case "gradient":
                        addGrdientFill(o.node, value, o.svg);
                        break;
                    case "opacity":
                    case "fill-opacity":
                        if (o.attrs.gradient) {
                            var gradient = doc.getElementById(o.node.getAttribute("fill").replace(/^url\(#|\)$/g, ""));
                            if (gradient) {
                                var stops = gradient.getElementsByTagName("stop");
                                stops[stops.length - 1].setAttribute("stop-opacity", value);
                            }
                            break;
                        }
                    default :
                        var cssrule = att.replace(/(\-.)/g, function (w) {
                            return w.substring(1).toUpperCase();
                        });
                        o.node.style[cssrule] = value;
                        // Need following line for Firefox
                        o.node.setAttribute(att, value);
                        break;
                }
            }
            tuneText(o, params);
        };
        var leading = 1.2;
        var tuneText = function (element, params) {
            if (element.type != "text" || !("text" in params || "font" in params || "font-size" in params || "x" in params)) {
                return;
            }
            var fontSize = element.node.firstChild ? parseInt(doc.defaultView.getComputedStyle(element.node.firstChild, "").getPropertyValue("font-size"), 10) : 10;
            var height = 0;

            if ("text" in params) {
                while (element.node.firstChild) {
                    element.node.removeChild(element.node.firstChild);
                }
                var texts = (params.text + "").split("\n");
                for (var i = 0, ii = texts.length; i < ii; i++) {
                    var tspan = doc.createElementNS(element.svg.svgns, "tspan");
                    i && tspan.setAttribute("dy", fontSize * leading);
                    i && tspan.setAttribute("x", element.attrs.x);
                    tspan.appendChild(doc.createTextNode(texts[i]));
                    element.node.appendChild(tspan);
                    height += fontSize * leading;
                }
            } else {
                var texts = element.node.getElementsByTagName("tspan");
                for (var i = 0, ii = texts.length; i < ii; i++) {
                    i && texts[i].setAttribute("dy", fontSize * leading);
                    i && texts[i].setAttribute("x", element.attrs.x);
                    height += fontSize * leading;
                }
            }
            height -= fontSize * (leading - 1);
            var dif = height / 2 - fontSize;
            if (dif) {
                element.node.setAttribute("y", element.attrs.y - dif);
            }
            setTimeout(function () {
            });
        };
        var Element = function (node, svg) {
            var X = 0,
                Y = 0;
            this[0] = node;
            this.node = node;
            this.svg = svg;
            this.attrs = this.attrs || {};
            this.transformations = []; // rotate, translate, scale
            this._ = {
                tx: 0,
                ty: 0,
                rt: {deg: 0, x: 0, y: 0},
                sx: 1,
                sy: 1
            };
        };
        Element.prototype.rotate = function (deg, cx, cy) {
            if (deg == null) {
                return this._.rt.deg;
            }
            var bbox = this.getBBox();
            deg = deg.toString().split(separator);
            if (deg.length - 1) {
                cx = parseFloat(deg[1], 10);
                cy = parseFloat(deg[2], 10);
            }
            deg = parseFloat(deg[0], 10);
            if (cx != null) {
                this._.rt.deg = deg;
            } else {
                this._.rt.deg += deg;
            }
            if (cy == null) {
                cx = null;
            }
            cx = cx == null ? bbox.x + bbox.width / 2 : cx;
            cy = cy == null ? bbox.y + bbox.height / 2 : cy;
            if (this._.rt.deg) {
                this.transformations[0] = ("rotate(" + this._.rt.deg + " " + cx + " " + cy + ")");
            } else {
                this.transformations[0] = "";
            }
            this.node.setAttribute("transform", this.transformations.join(" "));
            return this;
        };
        Element.prototype.hide = function () {
            this.node.style.display = "none";
            return this;
        };
        Element.prototype.show = function () {
            this.node.style.display = "block";
            return this;
        };
        Element.prototype.remove = function () {
            this.node.parentNode.removeChild(this.node);
        };
        Element.prototype.getBBox = function () {
            return this.node.getBBox();
        };
        Element.prototype.attr = function () {
            if (arguments.length == 1 && typeof arguments[0] == "string") {
                if (arguments[0] == "translation") {
                    return this.translate();
                }
                return this.attrs[arguments[0]];
            }
            if (arguments.length == 1 && arguments[0] instanceof Array) {
                var values = {};
                for (var j in arguments[0]) {
                    values[arguments[0][j]] = this.attrs[arguments[0][j]];
                }
                return values;
            }
            if (arguments.length == 2) {
                var params = {};
                params[arguments[0]] = arguments[1];
                setFillAndStroke(this, params);
            } else if (arguments.length == 1 && typeof arguments[0] == "object") {
                setFillAndStroke(this, arguments[0]);
            }
            return this;
        };
        Element.prototype.toFront = function () {
            this.node.parentNode.appendChild(this.node);
            return this;
        };
        Element.prototype.toBack = function () {
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            }
            return this;
        };
        Element.prototype.insertAfter = function (element) {
            if (element.node.nextSibling) {
                element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
            } else {
                element.node.parentNode.appendChild(this.node);
            }
            return this;
        };
        Element.prototype.insertBefore = function (element) {
            element.node.parentNode.insertBefore(this.node, element.node);
            return this;
        };
        var theCircle = function (svg, x, y, r) {
            var el = doc.createElementNS(svg.svgns, "circle");
            el.setAttribute("cx", x);
            el.setAttribute("cy", y);
            el.setAttribute("r", r);
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", "#000");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.r = r;
            res.attrs.stroke = "#000";
            res.type = "circle";
            return res;
        };
        var theRect = function (svg, x, y, w, h, r) {
            var el = doc.createElementNS(svg.svgns, "rect");
            el.setAttribute("x", x);
            el.setAttribute("y", y);
            el.setAttribute("width", w);
            el.setAttribute("height", h);
            if (r) {
                el.setAttribute("rx", r);
                el.setAttribute("ry", r);
            }
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", "#000");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.width = w;
            res.attrs.height = h;
            res.attrs.stroke = "#000";
            if (r) {
                res.attrs.rx = res.attrs.ry = r;
            }
            res.type = "rect";
            return res;
        };
        var theEllipse = function (svg, x, y, rx, ry) {
            var el = doc.createElementNS(svg.svgns, "ellipse");
            el.setAttribute("cx", x);
            el.setAttribute("cy", y);
            el.setAttribute("rx", rx);
            el.setAttribute("ry", ry);
            el.setAttribute("fill", "none");
            el.setAttribute("stroke", "#000");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.rx = rx;
            res.attrs.ry = ry;
            res.attrs.stroke = "#000";
            res.type = "ellipse";
            return res;
        };
        var theImage = function (svg, src, x, y, w, h) {
            var el = doc.createElementNS(svg.svgns, "image");
            el.setAttribute("x", x);
            el.setAttribute("y", y);
            el.setAttribute("width", w);
            el.setAttribute("height", h);
            el.setAttribute("preserveAspectRatio", "none");
            el.setAttributeNS(svg.xlink, "href", src);
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.width = w;
            res.attrs.height = h;
            res.type = "image";
            return res;
        };
        var theText = function (svg, x, y, text) {
            var el = doc.createElementNS(svg.svgns, "text");
            el.setAttribute("x", x);
            el.setAttribute("y", y);
            el.setAttribute("text-anchor", "middle");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var res = new Element(el, svg);
            res.attrs = res.attrs || {};
            res.attrs.x = x;
            res.attrs.y = y;
            res.type = "text";
            setFillAndStroke(res, {font: availableAttrs.font, stroke: "none", fill: "#000", text: text});
            return res;
        };
        var theGroup = function (svg) {
            var el = doc.createElementNS(svg.svgns, "g");
            if (svg.canvas) {
                svg.canvas.appendChild(el);
            }
            var i = new Element(el, svg);
            for (var f in svg) {
                if (f[0] != "_" && typeof svg[f] == "function") {
                    i[f] = (function (f) {
                        return function () {
                            var e = svg[f].apply(svg, arguments);
                            el.appendChild(e[0]);
                            return e;
                        };
                    })(f);
                }
            }
            i.type = "group";
            return i;
        };
        var setSize = function (width, height) {
            this.width = width || this.width;
            this.height = height || this.height;
            this.canvas.setAttribute("width", this.width);
            this.canvas.setAttribute("height", this.height);
            return this;
        };
        var create = function () {
            var con = getContainer.apply(null, arguments);
            var container = con.container,
                x = con.x,
                y = con.y,
                width = con.width,
                height = con.height;
            if (!container) {
                throw new Error("SVG container not found.");
            }
            paper.canvas = doc.createElementNS(paper.svgns, "svg");
            paper.canvas.setAttribute("width", width || 320);
            paper.width = width || 320;
            paper.canvas.setAttribute("height", height || 200);
            paper.height = height || 200;
            if (container == 1) {
                doc.body.appendChild(paper.canvas);
                paper.canvas.style.position = "absolute";
                paper.canvas.style.left = x + "px";
                paper.canvas.style.top = y + "px";
            } else {
                if (container.firstChild) {
                    container.insertBefore(paper.canvas, container.firstChild);
                } else {
                    container.appendChild(paper.canvas);
                }
            }
            container = {
                canvas: paper.canvas,
                clear: function () {
                    while (this.canvas.firstChild) {
                        this.canvas.removeChild(this.canvas.firstChild);
                    }
                    this.defs = doc.createElementNS(paper.svgns, "defs");
                    this.canvas.appendChild(this.defs);
                }
            };
            for (var prop in paper) {
                if (prop != "create") {
                    container[prop] = paper[prop];
                }
            }
            plugins(container, container, R.fn);
            container.clear();
            return container;
        };
        paper.remove = function () {
            this.canvas.parentNode.removeChild(this.canvas);
        };
        paper.svgns = "http://www.w3.org/2000/svg";
        paper.xlink = "http://www.w3.org/1999/xlink";
        paper.safari = function () {
            if (navigator.vendor == "Apple Computer, Inc.") {
                var rect = this.rect(-this.width, -this.height, this.width * 3, this.height * 3).attr({stroke: "none"});
                setTimeout(function () {rect.remove();}, 0);
            }
        };
    }

    // VML
    if (R.vml) {
        thePath = function (params, pathString, VML) {
            var g = createNode("group"), gl = g.style;
            gl.position = "absolute";
            gl.left = 0;
            gl.top = 0;
            gl.width = VML.width + "px";
            gl.height = VML.height + "px";
            var el = createNode("shape"), ol = el.style;
            ol.width = VML.width + "px";
            ol.height = VML.height + "px";
            el.path = "";
            if (params["class"]) {
                el.className = "rvml " + params["class"];
            }
            el.coordsize = this.coordsize;
            el.coordorigin = this.coordorigin;
            g.appendChild(el);
            VML.canvas.appendChild(g);
            var p = new Element(el, g, VML);
            p.isAbsolute = true;
            p.type = "path";
            p.path = [];
            p.last = {x: 0, y: 0, bx: 0, by: 0, isAbsolute: true};
            p.Path = "";
            p.absolutely = function () {
                this.isAbsolute = true;
                return this;
            };
            p.relatively = function () {
                this.isAbsolute = false;
                return this;
            };
            p.moveTo = function (x, y) {
                var d = this.isAbsolute?"m":"t";
                d += Math.round(parseFloat(x, 10)) + " " + Math.round(parseFloat(y, 10));
                this.node.path = this.Path += d;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "M" : "m") + [x, y];
                return this;
            };
            p.lineTo = function (x, y) {
                var d = this.isAbsolute?"l":"r";
                d += Math.round(parseFloat(x, 10)) + " " + Math.round(parseFloat(y, 10));
                this[0].path = this.Path += d;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "L" : "l") + [x, y];
                return this;
            };
            p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x2, y2) {
                // for more information of where this math came from visit:
                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                x2 = (this.isAbsolute ? 0 : this.last.x) + x2;
                y2 = (this.isAbsolute ? 0 : this.last.y) + y2;
                var x1 = this.last.x,
                    y1 = this.last.y,
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        Math.sqrt(Math.abs(rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    d = sweep_flag ? (this.isAbsolute ? "wa" : "wr") : (this.isAbsolute ? "at" : "ar"),
                    left = Math.round(cx - rx),
                    top = Math.round(cy - ry);
                d += [left, top, Math.round(left + rx * 2), Math.round(top + ry * 2), Math.round(x1), Math.round(y1), Math.round(parseFloat(x2, 10)), Math.round(parseFloat(y2, 10))].join(", ");
                this.node.path = this.Path += d;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x2, 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y2, 10);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "A" : "a") + [rx, ry, 0, large_arc_flag, sweep_flag, x2, y2];
                return this;
            };
            p.cplineTo = function (x1, y1, w1) {
                if (!w1) {
                    return this.lineTo(x1, y1);
                } else {
                    var x = Math.round(Math.round(parseFloat(x1, 10) * 100) / 100),
                        y = Math.round(Math.round(parseFloat(y1, 10) * 100) / 100),
                        w = Math.round(Math.round(parseFloat(w1, 10) * 100) / 100),
                        d = this.isAbsolute ? "c" : "v",
                        attr = [Math.round(this.last.x) + w, Math.round(this.last.y), x - w, y, x, y],
                        svgattr = [this.last.x + w1, this.last.y, x1 - w1, y1, x1, y1];
                    d += attr.join(" ") + " ";
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                    this.last.bx = attr[2];
                    this.last.by = attr[3];
                    this.node.path = this.Path += d;
                    this.attrs.path += (this.isAbsolute ? "C" : "c") + svgattr;
                    return this;
                }
            };
            p.curveTo = function () {
                var d = this.isAbsolute ? "c" : "v";
                if (arguments.length == 6) {
                    this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[4], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[5], 10);
                    d += [Math.round(parseFloat(arguments[0], 10)),
                         Math.round(parseFloat(arguments[1], 10)),
                         Math.round(parseFloat(arguments[2], 10)),
                         Math.round(parseFloat(arguments[3], 10)),
                         Math.round(parseFloat(arguments[4], 10)),
                         Math.round(parseFloat(arguments[5], 10))].join(" ") + " ";
                    this.last.isAbsolute = this.isAbsolute;
                    this.attrs.path += (this.isAbsolute ? "C" : "c") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                if (arguments.length == 4) {
                    var bx = this.last.x * 2 - this.last.bx;
                    var by = this.last.y * 2 - this.last.by;
                    this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0], 10);
                    this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1], 10);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    d += [Math.round(bx), Math.round(by),
                         Math.round(parseFloat(arguments[0], 10)),
                         Math.round(parseFloat(arguments[1], 10)),
                         Math.round(parseFloat(arguments[2], 10)),
                         Math.round(parseFloat(arguments[3], 10))].join(" ") + " ";
                     this.attrs.path += (this.isAbsolute ? "S" : "s") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                this.node.path = this.Path += d;
                return this;
            };
            p.qcurveTo = function () {
                var d = "qb";
                if (arguments.length == 4) {
                    this.last.qx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0], 10);
                    this.last.qy = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1], 10);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    d += [Math.round(this.last.qx),
                         Math.round(this.last.qy),
                         Math.round(this.last.x),
                         Math.round(this.last.y)].join(" ") + " ";
                    this.last.isAbsolute = this.isAbsolute;
                    this.attrs.path += (this.isAbsolute ? "Q" : "q") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                if (arguments.length == 2) {
                    this.last.qx = this.last.x * 2 - this.last.qx;
                    this.last.qy = this.last.y * 2 - this.last.qy;
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                    d += [Math.round(this.last.qx),
                         Math.round(this.last.qy),
                         Math.round(this.last.x),
                         Math.round(this.last.y)].join(" ") + " ";
                     this.attrs.path += (this.isAbsolute ? "T" : "t") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                this.node.path = this.Path += d;
                this.path.push({type: "qcurve", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
                return this;
            };
            p.addRoundedCorner = function (r, dir) {
                var R = .5522 * r, rollback = this.isAbsolute, o = this;
                if (rollback) {
                    this.relatively();
                    rollback = function () {
                        o.absolutely();
                    };
                } else {
                    rollback = function () {};
                }
                var actions = {
                    l: function () {
                        return {
                            u: function () {
                                o.curveTo(-R, 0, -r, -(r - R), -r, -r);
                            },
                            d: function () {
                                o.curveTo(-R, 0, -r, r - R, -r, r);
                            }
                        };
                    },
                    r: function () {
                        return {
                            u: function () {
                                o.curveTo(R, 0, r, -(r - R), r, -r);
                            },
                            d: function () {
                                o.curveTo(R, 0, r, r - R, r, r);
                            }
                        };
                    },
                    u: function () {
                        return {
                            r: function () {
                                o.curveTo(0, -R, -(R - r), -r, r, -r);
                            },
                            l: function () {
                                o.curveTo(0, -R, R - r, -r, -r, -r);
                            }
                        };
                    },
                    d: function () {
                        return {
                            r: function () {
                                o.curveTo(0, R, -(R - r), r, r, r);
                            },
                            l: function () {
                                o.curveTo(0, R, R - r, r, -r, r);
                            }
                        };
                    }
                };
                actions[dir.charAt(0)]()[dir.charAt(1)]();
                rollback();
                return o;
            };
            p.andClose = function () {
                this.node.path = (this.Path += "x e");
                this.attrs.path += "z";
                return this;
            };
            if (pathString) {
                p.absolutely();
                p.attrs.path = "";
                paper.pathfinder(p, "" + pathString);
            }
            // p.setBox();
            setFillAndStroke(p, params);
            if (params.gradient) {
                addGrdientFill(p, params.gradient);
            }
            return p;
        };
        var setFillAndStroke = function (o, params) {
            var s = o.node.style,
                res = o;
            o.attrs = o.attrs || {};
            for (var par in params) {
                o.attrs[par] = params[par];
            }
            params.href && (o.node.href = params.href);
            params.title && (o.node.title = params.title);
            params.target && (o.node.target = params.target);
            if (params.path && o.type == "path") {
                o.Path = "";
                o.path = [];
                paper.pathfinder(o, params.path);
            }
            if (params.rotation != null) {
                o.rotate(params.rotation, true);
            }
            if (params.translation) {
                var xy = (params.translation + "").split(separator);
                o.translate(xy[0], xy[1]);
            }
            if (params.scale) {
                var xy = (params.scale + "").split(separator);
                o.scale(xy[0], xy[1]);
            }
            if (o.type == "image" && params.src) {
                o.node.src = params.src;
            }
            if (o.type == "image" && params.opacity) {
                o.node.filterOpacity = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + (params.opacity * 100) + ")";
                o.node.style.filter = (o.node.filterMatrix || "") + (o.node.filterOpacity || "");
            }
            params.font && (s.font = params.font);
            params["font-family"] && (s.fontFamily = params["font-family"]);
            params["font-size"] && (s.fontSize = params["font-size"]);
            params["font-weight"] && (s.fontWeight = params["font-weight"]);
            params["font-style"] && (s.fontStyle = params["font-style"]);
            if (typeof params.opacity != "undefined" || typeof params["stroke-width"] != "undefined" || typeof params.fill != "undefined" || typeof params.stroke != "undefined" || params["stroke-width"] || params["stroke-opacity"] || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
                o = o.shape || o.node;
                var fill = (o.getElementsByTagName("fill") && o.getElementsByTagName("fill")[0]) || createNode("fill");
                if ("fill-opacity" in params || "opacity" in params) {
                    fill.opacity = ((+params["fill-opacity"] + 1 || 2) - 1) * ((+params.opacity + 1 || 2) - 1);
                }
                if (params.fill) {
                    fill.on = true;
                }
                if (typeof fill.on == "undefined" || params.fill == "none") {
                    fill.on = false;
                }
                if (fill.on && params.fill) {
                    var isURL = params.fill.match(/^url\(([^\)]+)\)$/i);
                    if (isURL) {
                        fill.src = isURL[1];
                        fill.type = "tile";
                    } else {
                        fill.color = getRGB(params.fill).hex;
                        fill.src = "";
                        fill.type = "solid";
                    }
                }
                o.appendChild(fill);
                var stroke = (o.getElementsByTagName("stroke") && o.getElementsByTagName("stroke")[0]) || createNode("stroke");
                if ((params.stroke && params.stroke != "none") || params["stroke-width"] || typeof params["stroke-opacity"] != "undefined" || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
                    stroke.on = true;
                }
                if (params.stroke == "none" || typeof stroke.on == "undefined" || params.stroke == 0) {
                    stroke.on = false;
                }
                if (stroke.on && params.stroke) {
                    stroke.color = getRGB(params.stroke).hex;
                }
                stroke.opacity = ((+params["stroke-opacity"] + 1 || 2) - 1) * ((+params.opacity + 1 || 2) - 1);
                params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
                stroke.miterlimit = params["stroke-miterlimit"] || 8;
                params["stroke-linecap"] && (stroke.endcap = {butt: "flat", square: "square", round: "round"}[params["stroke-linecap"]] || "miter");
                params["stroke-width"] && (stroke.weight = (parseFloat(params["stroke-width"], 10) || 1) * 12 / 16);
                if (params["stroke-dasharray"]) {
                    var dasharray = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    };
                    stroke.dashstyle = dasharray[params["stroke-dasharray"]] || "";
                }
                o.appendChild(stroke);
            }
            if (res.type == "text") {
                var span = doc.createElement("span"),
                    s = span.style;
                res.attrs.font && (s.font = res.attrs.font);
                res.attrs["font-family"] && (s.fontFamily = res.attrs["font-family"]);
                res.attrs["font-size"] && (s.fontSize = res.attrs["font-size"]);
                res.attrs["font-weight"] && (s.fontWeight = res.attrs["font-weight"]);
                res.attrs["font-style"] && (s.fontStyle = res.attrs["font-style"]);
                res.node.parentNode.appendChild(span);
                span.innerText = res.node.string;
                res.W = res.attrs.w = span.offsetWidth;
                res.H = res.attrs.h = span.offsetHeight;
                res.X = res.attrs.x;
                res.Y = res.attrs.y + Math.round(res.H / 2);
                res.node.parentNode.removeChild(span);

                // text-anchor emulation
                switch(res.attrs["text-anchor"]) {
                    case "start":
                        res.node.style["v-text-align"] = "left";
                        res.bbx = Math.round(res.W / 2);
                    break;
                    case "end":
                        res.node.style["v-text-align"] = "right";
                        res.bbx = -Math.round(res.W / 2);
                    break;
                    default:
                        res.node.style["v-text-align"] = "center";
                    break;
                }
            }
        };
        var getAngle = function (a, b, c, d) {
            var angle = Math.round(Math.atan((parseFloat(c, 10) - parseFloat(a, 10)) / (parseFloat(d, 10) - parseFloat(b, 10))) * 57.29) || 0;
            if (!angle && parseFloat(a, 10) < parseFloat(b, 10)) {
                angle = 180;
            }
            angle -= 180;
            if (angle < 0) {
                angle += 360;
            }
            return angle;
        };
        var addGrdientFill = function (o, gradient) {
            gradient = toGradient(gradient);
            o.attrs = o.attrs || {};
            var attrs = o.attrs;
            o.attrs.gradient = gradient;
            o = o.shape || o[0];
            var fill = o.getElementsByTagName("fill");
            if (fill.length) {
                fill = fill[0];
            } else {
                fill = createNode("fill");
            }
            if (gradient.dots.length) {
                fill.on = true;
                fill.method = "none";
                fill.type = ((gradient.type + "").toLowerCase() == "radial") ? "gradientTitle" : "gradient";
                if (typeof gradient.dots[0].color != "undefined") {
                    fill.color = getRGB(gradient.dots[0].color).hex;
                }
                if (typeof gradient.dots[gradient.dots.length - 1].color != "undefined") {
                    fill.color2 = getRGB(gradient.dots[gradient.dots.length - 1].color).hex;
                }
                var colors = [];
                for (var i = 0, ii = gradient.dots.length; i < ii; i++) {
                    if (gradient.dots[i].offset) {
                        colors.push(gradient.dots[i].offset + " " + getRGB(gradient.dots[i].color).hex);
                    }
                };
                var fillOpacity = typeof gradient.dots[gradient.dots.length - 1].opacity == "undefined" ? (typeof attrs.opacity == "undefined" ? 1 : attrs.opacity) : gradient.dots[gradient.dots.length - 1].opacity;
                if (colors.length) {
                    fill.colors.value = colors.join(",");
                    fillOpacity = typeof attrs.opacity == "undefined" ? 1 : attrs.opacity;
                } else {
                    fill.colors.value = "0% " + fill.color;
                }
                fill.opacity = fillOpacity;
                if (typeof gradient.angle != "undefined") {
                    fill.angle = (-gradient.angle + 270) % 360;
                } else if (gradient.vector) {
                    fill.angle = getAngle.apply(null, gradient.vector);
                }
                if ((gradient.type + "").toLowerCase() == "radial") {
                    fill.focus = "100%";
                    fill.focusposition = "0.5 0.5";
                }
            }
        };
        var Element = function (node, group, vml) {
            var Rotation = 0,
                RotX = 0,
                RotY = 0,
                Scale = 1;
            this[0] = node;
            this.node = node;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.Group = group;
            this.vml = vml;
            this._ = {
                tx: 0,
                ty: 0,
                rt: {deg:0},
                sx: 1,
                sy: 1
            };
        };
        Element.prototype.rotate = function (deg, cx, cy) {
            if (deg == null) {
                return this._.rt.deg;
            }
            deg = deg.toString().split(separator);
            if (deg.length - 1) {
                cx = parseFloat(deg[1], 10);
                cy = parseFloat(deg[2], 10);
            }
            deg = parseFloat(deg[0], 10);
            if (cx != null) {
                this._.rt.deg = deg;
            } else {
                this._.rt.deg += deg;
            }
            if (cy == null) {
                cx = null;
            }
            this._.rt.cx = cx;
            this._.rt.cy = cy;
            this.setBox(null, cx, cy);
            this.Group.style.rotation = this._.rt.deg;
            return this;
        };
        Element.prototype.setBox = function (params, cx, cy) {
            var gs = this.Group.style,
                os = (this.shape && this.shape.style) || this.node.style;
            for (var i in params) {
                this.attrs[i] = params[i];
            }
            cx = cx || this._.rt.cx;
            cy = cy || this._.rt.cy;
            var attr = this.attrs, x, y, w, h;
            switch (this.type) {
                case "circle":
                    x = attr.cx - attr.r;
                    y = attr.cy - attr.r;
                    w = h = attr.r * 2;
                    break;
                case "ellipse":
                    x = attr.cx - attr.rx;
                    y = attr.cy - attr.ry;
                    w = attr.rx * 2;
                    h = attr.ry * 2;
                    break;
                case "rect":
                case "image":
                    x = attr.x;
                    y = attr.y;
                    w = attr.width || 0;
                    h = attr.height || 0;
                    break;
                case "text":
                    this.textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join("");
                    x = attr.x - Math.round(this.W / 2);
                    y = attr.y - this.H / 2;
                    w = this.W;
                    h = this.H;
                    break;
                case "path":
                    if (!this.attrs.path) {
                        x = 0;
                        y = 0;
                        w = this.vml.width;
                        h = this.vml.height;
                    } else {
                        var dim = pathDimensions(this.attrs.path),
                        x = dim.x;
                        y = dim.y;
                        w = dim.width;
                        h = dim.height;
                    }
                    break;
                default:
                    x = 0;
                    y = 0;
                    w = this.vml.width;
                    h = this.vml.height;
                    break;
            }
            cx = (cx == null) ? x + w / 2 : cx;
            cy = (cy == null) ? y + h / 2 : cy;
            var left = cx - this.vml.width / 2,
                top = cy - this.vml.height / 2;
            if (this.type == "path" || this.type == "text") {
                gs.left = left + "px";
                gs.top = top + "px";
                this.X = this.type == "text" ? x : -left;
                this.Y = this.type == "text" ? y : -top;
                this.W = w;
                this.H = h;
                os.left = -left + "px";
                os.top = -top + "px";
            } else {
                gs.left = left + "px";
                gs.top = top + "px";
                this.X = x;
                this.Y = y;
                this.W = w;
                this.H = h;
                gs.width = this.vml.width + "px";
                gs.height = this.vml.height + "px";
                os.left = x - left + "px";
                os.top = y - top + "px";
                os.width = w + "px";
                os.height = h + "px";
            }
        };
        Element.prototype.hide = function () {
            this.Group.style.display = "none";
            return this;
        };
        Element.prototype.show = function () {
            this.Group.style.display = "block";
            return this;
        };
        Element.prototype.getBBox = function () {
            this.bbx = this.bbx || 0;
            return {
                x: this.X + this.bbx,
                y: this.Y,
                width: this.W,
                height: this.H
            };
        };
        Element.prototype.remove = function () {
            this[0].parentNode.removeChild(this[0]);
            this.Group.parentNode.removeChild(this.Group);
            this.shape && this.shape.parentNode.removeChild(this.shape);
        };
        Element.prototype.attr = function () {
            if (arguments.length == 1 && typeof arguments[0] == "string") {
                if (arguments[0] == "translation") {
                    return this.translate();
                }
                return this.attrs[arguments[0]];
            }
            if (this.attrs && arguments.length == 1 && arguments[0] instanceof Array) {
                var values = {};
                for (var i = 0, ii = arguments[0].length; i < ii; i++) {
                    values[arguments[0][i]] = this.attrs[arguments[0][i]];
                };
                return values;
            }
            var params;
            if (arguments.length == 2) {
                params = {};
                params[arguments[0]] = arguments[1];
            }
            if (arguments.length == 1 && typeof arguments[0] == "object") {
                params = arguments[0];
            }
            if (params) {
                if (params.gradient) {
                    addGrdientFill(this, params.gradient);
                }
                if (params.text && this.type == "text") {
                    this.node.string = params.text;
                }
                if (params.id) {
                    this.node.id = params.id;
                }
                setFillAndStroke(this, params);
                this.setBox(params);
            }
            return this;
        };
        Element.prototype.toFront = function () {
            this.Group.parentNode.appendChild(this.Group);
            return this;
        };
        Element.prototype.toBack = function () {
            if (this.Group.parentNode.firstChild != this.Group) {
                this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
            }
            return this;
        };
        Element.prototype.insertAfter = function (element) {
            if (element.Group.nextSibling) {
                element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
            } else {
                element.Group.parentNode.appendChild(this.Group);
            }
            return this;
        };
        Element.prototype.insertBefore = function (element) {
            element.Group.parentNode.insertBefore(this.Group, element.Group);
            return this;
        };
        var theCircle = function (vml, x, y, r) {
            var g = createNode("group");
            var o = createNode("oval");
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "circle";
            setFillAndStroke(res, {stroke: "#000", fill: "none"});
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.r = r;
            res.setBox({x: x - r, y: y - r, width: r * 2, height: r * 2});
            return res;
        };
        var theRect = function (vml, x, y, w, h, r) {
            var g = createNode("group");
            var o = createNode(r ? "roundrect" : "rect");
            if (r) {
                o.arcsize = r / (Math.min(w, h));
            }
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "rect";
            setFillAndStroke(res, {stroke: "#000"});
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.w = w;
            res.attrs.h = h;
            res.attrs.r = r;
            res.setBox({x: x, y: y, width: w, height: h});
            return res;
        };
        var theEllipse = function (vml, x, y, rx, ry) {
            var g = createNode("group");
            var o = createNode("oval");
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "ellipse";
            setFillAndStroke(res, {stroke: "#000"});
            res.attrs.cx = x;
            res.attrs.cy = y;
            res.attrs.rx = rx;
            res.attrs.ry = ry;
            res.setBox({x: x - rx, y: y - ry, width: rx * 2, height: ry * 2});
            return res;
        };
        var theImage = function (vml, src, x, y, w, h) {
            var g = createNode("group");
            var o = createNode("image");
            o.src = src;
            g.appendChild(o);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.type = "image";
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.w = w;
            res.attrs.h = h;
            res.setBox({x: x, y: y, width: w, height: h});
            return res;
        };
        var theText = function (vml, x, y, text) {
            var g = createNode("group"), gs = g.style;
            var el = createNode("shape"), ol = el.style;
            var path = createNode("path"), ps = path.style;
            path.v = ["m", Math.round(x), ", ", Math.round(y - 2), "l", Math.round(x) + 1, ", ", Math.round(y - 2)].join("");
            path.textpathok = true;
            ol.width = vml.width;
            ol.height = vml.height;
            gs.position = "absolute";
            gs.left = 0;
            gs.top = 0;
            gs.width = vml.width;
            gs.height = vml.height;
            var o = createNode("textpath");
            o.string = text;
            o.on = true;
            o.coordsize = vml.coordsize;
            o.coordorigin = vml.coordorigin;
            el.appendChild(o);
            el.appendChild(path);
            g.appendChild(el);
            vml.canvas.appendChild(g);
            var res = new Element(o, g, vml);
            res.shape = el;
            res.textpath = path;
            res.type = "text";
            res.attrs.x = x;
            res.attrs.y = y;
            res.attrs.w = 1;
            res.attrs.h = 1;
            setFillAndStroke(res, {font: availableAttrs.font, stroke: "none", fill: "#000"});
            return res;
        };
        var setSize = function (width, height) {
            this.width = width || this.width;
            this.height = height || this.height;
            this.canvas.style.width = this.width + "px";
            this.canvas.style.height = this.height + "px";
            this.canvas.parentNode.style.clip = "rect(0 " + this.width + " " + this.height + " 0)";
            this.canvas.coordsize = this.width + " " + this.height;
            return this;
        };
        doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            if (!doc.namespaces.rvml) {
                doc.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
            }
            var createNode = function (tagName) {
                return doc.createElement('<rvml:' + tagName + ' class="rvml">');
            };
        } catch (e) {
            var createNode = function (tagName) {
                return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
        }
        var create = function () {
            var con = getContainer.apply(null, arguments);
            var container = con.container,
                x = con.x,
                y = con.y,
                width = con.width,
                height = con.height;
            if (!container) {
                throw new Error("VML container not found.");
            }
            var c = doc.createElement("div"),
                d = doc.createElement("div"),
                r = paper.canvas = createNode("group"),
                cs = c.style, rs = r.style;
            paper.width = width;
            paper.height = height;
            width = width || "320px";
            height = height || "200px";
            cs.clip = "rect(0 " + width + "px " + height + "px 0)";
            cs.top = "-2px";
            cs.left = "-2px";
            cs.position = "absolute";
            rs.position = "absolute";
            d.style.position = "relative";
            rs.width  = width;
            rs.height = height;
            r.coordsize = (/%$/.test(width) ? width : parseFloat(width, 10)) + " " + (/%$/.test(height) ? height : parseFloat(height, 10));
            r.coordorigin = "0 0";

            var b = createNode("rect"), bs = b.style;
            bs.left = bs.top = 0;
            bs.width  = rs.width;
            bs.height = rs.height;
            b.filled = b.stroked = "f";

            r.appendChild(b);
            c.appendChild(r);
            d.appendChild(c);
            if (container == 1) {
                doc.body.appendChild(d);
                cs.position = "absolute";
                cs.left = x + "px";
                cs.top = y + "px";
                cs.width = width;
                cs.height = height;
                container = {
                    style: {
                        width: width,
                        height: height
                    }
                };
            } else {
                cs.width = container.style.width = width;
                cs.height = container.style.height = height;
                if (container.firstChild) {
                    container.insertBefore(d, container.firstChild);
                } else {
                    container.appendChild(d);
                }
            }
            for (var prop in paper) {
                container[prop] = paper[prop];
            }
            plugins(container, container, R.fn);
            container.clear = function () {
                var todel = [];
                for (var i = 0, ii = r.childNodes.length; i < ii; i++) {
                    if (r.childNodes[i] != b) {
                        todel.push(r.childNodes[i]);
                    }
                }
                for (i = 0, ii = todel.length; i < ii; i++) {
                    r.removeChild(todel[i]);
                }
            };
            return container;
        };
        paper.remove = function () {
            this.canvas.parentNode.parentNode.parentNode.removeChild(this.canvas.parentNode.parentNode);
        };
        paper.safari = function () {};
    }

    // rest

    // Events
    var addEvent = (function () {
        if (doc.addEventListener) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    return fn.call(element, e);
                };
                obj.addEventListener(type, f, false);
                return function () {
                    obj.removeEventListener(type, f, false);
                    return true;
                };
            };
        } else if (doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    return fn.call(element, e || win.event);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                if (type == "mouseover") {
                    obj.attachEvent("onmouseenter", f);
                    return function () {
                        obj.detachEvent("onmouseenter", f);
                        return detacher();
                    };
                } else if (type == "mouseout") {
                    obj.attachEvent("onmouseleave", f);
                    return function () {
                        obj.detachEvent("onmouseleave", f);
                        return detacher();
                    };
                }
                return detacher;
            };
        }
    })();
    for (var i = events.length; i--;) {
        (function (eventName) {
            Element.prototype[eventName] = function (fn) {
                if (typeof fn == "function") {
                    this.events = this.events || {};
                    this.events[eventName] = this.events[eventName] || {};
                    this.events[eventName][fn] = this.events[eventName][fn] || [];
                    this.events[eventName][fn].push(addEvent(this.shape || this.node, eventName, fn, this));
                }
                return this;
            };
            Element.prototype["un" + eventName] = function (fn) {
                this.events &&
                this.events[eventName] &&
                this.events[eventName][fn] &&
                this.events[eventName][fn].length &&
                this.events[eventName][fn].shift()() &&
                !this.events[eventName][fn].length &&
                delete this.events[eventName][fn];
            };

        })(events[i]);
    }
    paper.circle = function (x, y, r) {
        return theCircle(this, x, y, r);
    };
    paper.rect = function (x, y, w, h, r) {
        return theRect(this, x, y, w, h, r);
    };
    paper.ellipse = function (x, y, rx, ry) {
        return theEllipse(this, x, y, rx, ry);
    };
    paper.path = function (params, pathString) {
        return thePath(params, pathString, this);
    };
    paper.image = function (src, x, y, w, h) {
        return theImage(this, src, x, y, w, h);
    };
    paper.text = function (x, y, text) {
        return theText(this, x, y, text);
    };
    paper.group = function () {
        return this;
    };
    paper.drawGrid = function (x, y, w, h, wv, hv, color) {
        color = color || "#000";
        var path = ["M", x, y, "L", x + w, y, x + w, y + h, x, y + h, x, y],
            rowHeight = h / hv,
            columnWidth = w / wv;
        for (var i = 1; i < hv; i++) {
            path = path.concat(["M", x, y + i * rowHeight, "L", x + w, y + i * rowHeight]);
        }
        for (var i = 1; i < wv; i++) {
            path = path.concat(["M", x + i * columnWidth, y, "L", x + i * columnWidth, y + h]);
        }
        return this.path({stroke: color, "stroke-width": 1}, path.join(","));
    };
    paper.pathfinder = function (p, path) {
        var commands = {
            M: function (x, y) {
                this.moveTo(x, y);
            },
            C: function (x1, y1, x2, y2, x3, y3) {
                this.curveTo(x1, y1, x2, y2, x3, y3);
            },
            Q: function (x1, y1, x2, y2) {
                this.qcurveTo(x1, y1, x2, y2);
            },
            T: function (x, y) {
                this.qcurveTo(x, y);
            },
            S: function (x1, y1, x2, y2) {
                p.curveTo(x1, y1, x2, y2);
            },
            L: function (x, y) {
                p.lineTo(x, y);
            },
            H: function (x) {
                this.lineTo(x, this.last.y);
            },
            V: function (y) {
                this.lineTo(this.last.x, y);
            },
            A: function (rx, ry, xaxisrotation, largearcflag, sweepflag, x, y) {
                this.arcTo(rx, ry, largearcflag, sweepflag, x, y);
            },
            Z: function () {
                this.andClose();
            }
        };

        path = pathToAbsolute(path);
        for (var i = 0, ii = path.length; i < ii; i++) {
            var b = path[i].shift();
            commands[b].apply(p, path[i]);
        }
    };
    paper.set = function (itemsArray) {
        return new Set(itemsArray);
    };
    paper.setSize = setSize;
    Element.prototype.stop = function () {
        clearTimeout(this.animation_in_progress);
    };
    Element.prototype.scale = function (x, y) {
        if (x == null && y == null) {
            return {x: this._.sx, y: this._.sy};
        }
        y = y || x;
        // following line is for IE, apparently NaN is not always falsy
        isNaN(y) && (y = x);
        var dx, dy, cx, cy;
        if (x != 0) {
            var dirx = Math.round(x / Math.abs(x)),
                diry = Math.round(y / Math.abs(y)),
                s = this.node.style;
            dx = this.attr("x");
            dy = this.attr("y");
            cx = this.attr("cx");
            cy = this.attr("cy");
            if (dirx != 1 || diry != 1) {
                if (this.transformations) {
                    this.transformations[2] = "scale(" + [dirx, diry] + ")";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                    dx = (dirx < 0) ? -this.attr("x") - this.attrs.width * x * dirx / this._.sx : this.attr("x");
                    dy = (diry < 0) ? -this.attr("y") - this.attrs.height * y * diry / this._.sy : this.attr("y");
                    cx = this.attr("cx") * dirx;
                    cy = this.attr("cy") * diry;
                } else {
                    this.node.filterMatrix = " progid:DXImageTransform.Microsoft.Matrix(M11=" + dirx +
                        ", M12=0, M21=0, M22=" + diry +
                        ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')";
                    s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            } else {
                if (this.transformations) {
                    this.transformations[2] = "";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                } else {
                    this.node.filterMatrix = "";
                    s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            }
            switch (this.type) {
                case "rect":
                case "image":
                    this.attr({
                        width: this.attrs.width * x * dirx / this._.sx,
                        height: this.attrs.height * y * diry / this._.sy,
                        x: dx,
                        y: dy
                    });
                    break;
                case "circle":
                case "ellipse":
                    this.attr({
                        rx: this.attrs.rx * x * dirx / this._.sx,
                        ry: this.attrs.ry * y * diry / this._.sy,
                        r: this.attrs.r * x * diry / this._.sx,
                        cx: cx,
                        cy: cy
                    });
                    break;
                case "path":
                    var path = pathToRelative(Raphael.parsePathString(this.attr("path"))),
                        skip = true,
                        dim = pathDimensions(this.attrs.path);
                    for (var i = 0, ii = path.length; i < ii; i++) {
                        if (path[i][0].toUpperCase() == "M" && skip) {
                            continue;
                        } else {
                            skip = false;
                        }
                        if (this.svg && path[i][0].toUpperCase() == "A") {
                            path[i][path[i].length - 2] *= x * dirx;
                            path[i][path[i].length - 1] *= y * diry;
                            path[i][1] *= x;
                            path[i][2] *= y;
                        } else {
                            for (var j = 1, jj = path[i].length; j < jj; j++) {
                                path[i][j] *= (j % 2) ? x * dirx / this._.sx : y * diry / this._.sy;
                            }
                        }
                    }
                    var dim2 = pathDimensions(path),
                        dx = dim.x + dim.width / 2 - dim2.x - dim2.width / 2,
                        dy = dim.y + dim.height / 2 - dim2.y - dim2.height / 2;
                    path = pathToRelative(path);
                    path[0][1] += dx;
                    path[0][2] += dy;

                    this.attr({path: path.join(" ")});
            }
        }
        this._.sx = x;
        this._.sy = y;
        return this;
    };
    Element.prototype.animate = function (params, ms, callback) {
        clearTimeout(this.animation_in_progress);
        var from = {},
            to = {},
            diff = {},
            t = {x: 0, y: 0};
        for (var attr in params) {
            if (attr in availableAnimAttrs) {
                from[attr] = this.attr(attr);
                if (typeof from[attr] == "undefined") {
                    from[attr] = availableAttrs[attr];
                }
                to[attr] = params[attr];
                switch (availableAnimAttrs[attr]) {
                    case "number":
                        diff[attr] = (to[attr] - from[attr]) / ms;
                        break;
                    case "colour":
                        from[attr] = getRGB(from[attr]);
                        var toColour = getRGB(to[attr]);
                        diff[attr] = {
                            r: (toColour.r - from[attr].r) / ms,
                            g: (toColour.g - from[attr].g) / ms,
                            b: (toColour.b - from[attr].b) / ms
                        };
                        break;
                    case "path":
                        var pathes = pathEqualiser(from[attr], to[attr]);
                        from[attr] = pathes[0];
                        to[attr] = pathes[1];
                        diff[attr] = [];
                        for (var i = 0, ii = from[attr].length; i < ii; i++) {
                            diff[attr][i] = [0];
                            for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                            }
                        }
                        break;
                    case "csv":
                        var values = params[attr].toString().split(separator),
                            from2 = from[attr].toString().split(separator);
                        if (attr == "translation") {
                            from[attr] = [0, 0];
                            diff[attr] = [values[0] / ms, values[1] / ms];
                        } else if (attr == "rotation") {
                            from[attr] = (from2[1] == values[1] && from2[2] == values[2]) ? from2 : [0, values[1], values[2]];
                            diff[attr] = [(values[0] - from[attr][0]) / ms, 0, 0];
                        } else {
                            from[attr] = (from[attr] + "").split(separator);
                            diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][0]) / ms];
                        }
                        to[attr] = values;
                }
            }
        }
        var start = new Date(),
            prev = 0,
            that = this;
        (function () {
            var time = (new Date()).getTime() - start.getTime(),
                set = {},
                now;
            if (time < ms) {
                for (var attr in from) {
                    switch (availableAnimAttrs[attr]) {
                        case "number":
                            now = +from[attr] + time * diff[attr];
                            break;
                        case "colour":
                            now = "rgb(" + [
                                Math.round(from[attr].r + time * diff[attr].r),
                                Math.round(from[attr].g + time * diff[attr].g),
                                Math.round(from[attr].b + time * diff[attr].b)
                            ].join(",") + ")";
                            break;
                        case "path":
                            now = [];
                            for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                now[i] = [from[attr][i][0]];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    now[i][j] = from[attr][i][j] + time * diff[attr][i][j];
                                }
                                now[i] = now[i].join(" ");
                            }
                            now = now.join(" ");
                            break;
                        case "csv":
                            if (attr == "translation") {
                                var x = diff[attr][0] * (time - prev),
                                    y = diff[attr][1] * (time - prev);
                                t.x += x;
                                t.y += y;
                                now = [x, y].join(" ");
                            } else if (attr == "rotation") {
                                now = +from[attr][0] + time * diff[attr][0];
                                from[attr][1] && (now += "," + from[attr][1] + "," + from[attr][2]);
                            } else {
                                now = [+from[attr][0] + time * diff[attr][0], +from[attr][1] + time * diff[attr][1]].join(" ");
                            }
                            break;
                    }
                    if (attr == "font-size") {
                        set[attr] = now + "px";
                    } else {
                        set[attr] = now;
                    }
                }
                that.attr(set);
                that.animation_in_progress = setTimeout(arguments.callee, 0);
                paper.safari();
            } else {
                (t.x || t.y) && that.translate(-t.x, -t.y);
                that.attr(params);
                clearTimeout(that.animation_in_progress);
                paper.safari();
                (typeof callback == "function") && callback.call(that);
            }
            prev = time;
        })();
        return this;
    };
    Element.prototype.translate = function (x, y) {
        if (x == null) {
            return {x: this._.tx, y: this._.ty};
        }
        this._.tx += +x;
        this._.ty += +y;
        switch (this.type) {
            case "circle":
            case "ellipse":
                this.attr({cx: this.attrs.cx + x, cy: this.attrs.cy + y});
                break;
            case "rect":
            case "image":
            case "text":
                this.attr({x: this.attrs.x + +x, y: this.attrs.y + +y});
                break;
            case "path":
                var path = pathToRelative(this.attrs.path);
                path[0][1] += +x;
                path[0][2] += +y;
                this.attr({path: path.join(" ")});
            break;
        }
        return this;
    };

    // Set
    var Set = function (itemsArray) {
        this.items = [];
        this.length = (itemsArray && itemsArray.length) || 0;
        if (itemsArray && itemsArray.constructor == Array) {
            for (var i = itemsArray.length; i--;) {
                if (itemsArray[i].constructor == Element) {
                    this.items[this.items.length] = itemsArray[i];
                }
            }
        }
    };
    Set.prototype.push = function (item) {
        if (item && item.constructor == Element) {
            var len = this.items.length;
            this.items[len] = item;
            this[len] = item;
            this.length++;
        }
        return this;
    };
    Set.prototype.pull = function (id) {
        var res = this.items.splice(id, 1)[0];
        for (var j = id, jj = this.items.length; j < jj; j++) {
            this[j] = this[j + 1];
        }
        delete this[jj + 1];
        this.length--;
        return res;
    };
    for (var method in Element.prototype) {
        Set.prototype[method] = (function (methodname) {
            return function () {
                for (var i = this.items.length; i--;) {
                    this.items[i][methodname].apply(this.items[i], arguments);
                }
                return this;
            };
        })(method);
    }
    Set.prototype.getBBox = function () {
        var x = [], y = [], w = [], h = [];
        for (var i = this.items.length; i--;) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            w.push(box.x + box.width);
            h.push(box.y + box.height);
        }
        x = Math.min.apply(Math, x);
        y = Math.min.apply(Math, y);
        return {
            x: x,
            y: y,
            width: Math.max.apply(Math, w) - x,
            height: Math.max.apply(Math, h) - y
        };
    };

    return R;
})();
/* ======================================================================
    src/modestmaps.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = {};
    }
}

//////////////////////////// Make inheritance bearable

com.modestmaps.extend = function(child, parent) {
    for (var property in parent.prototype) {
        if (typeof child.prototype[property] == "undefined") {
            child.prototype[property] = parent.prototype[property];
        }
    }
    return child;
};

/////////////////////////// Eeeeeeeeeeeeeeeeeeeeeevents

com.modestmaps.cancelEvent = function(e) {
    //console.log('cancel: ' + e);
    // there's more than one way to skin this cat
    e.cancelBubble = true;
    e.cancel = true;
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();    
    return false;
};

// see http://ejohn.org/apps/jselect/event.html for the originals

com.modestmaps.addEvent = function( obj, type, fn ) {
    if ( obj.attachEvent ) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
        obj.attachEvent( 'on'+type, obj[type+fn] );
    }
    else {
        obj.addEventListener( type, fn, false );
        if (type == 'mousewheel') {
            obj.addEventListener( 'DOMMouseScroll', fn, false );
        }
    }
};

com.modestmaps.removeEvent = function( obj, type, fn ) {
    if ( obj.detachEvent ) {
        obj.detachEvent( 'on'+type, obj[type+fn] );
        obj[type+fn] = null;
    }
    else {
        obj.removeEventListener( type, fn, false );
        if (type == 'mousewheel') {
            obj.removeEventListener( 'DOMMouseScroll', fn, false );
        }
    }
};

//////////////////////////// Core

com.modestmaps.Point = function(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
};

com.modestmaps.Point.prototype = {
    x: 0,
    y: 0,
    toString: function() {
        return "(" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ")";
    }
};

com.modestmaps.Coordinate = function(row, column, zoom) {
    this.row = row;
    this.column = column;
    this.zoom = zoom;
};

com.modestmaps.Coordinate.prototype = {

    row: 0,
    column: 0,
    zoom: 0,

    toString: function() {
        return "(" + this.row.toFixed(3) + ", " + this.column.toFixed(3) + " @" + this.zoom.toFixed(3) + ")";
    },

    toKey: function() {
        var a = parseInt(this.row);
        var b = parseInt(this.column);
        var c = parseInt(this.zoom);
        a=a-b;	a=a-c;	a=a^(c >>> 13);
        b=b-c;	b=b-a;	b=b^(a << 8); 
        c=c-a;	c=c-b;	c=c^(b >>> 13);
        a=a-b;	a=a-c;	a=a^(c >>> 12);
        b=b-c;	b=b-a;	b=b^(a << 16);
        c=c-a;	c=c-b;	c=c^(b >>> 5);
        a=a-b;	a=a-c;	a=a^(c >>> 3);
        b=b-c;	b=b-a;	b=b^(a << 10);
        c=c-a;	c=c-b;	c=c^(b >>> 15);
        return c;
    },

    copy: function() {
        return new com.modestmaps.Coordinate(this.row, this.column, this.zoom);
    },

    container: function() {
        return new com.modestmaps.Coordinate(Math.floor(this.row), Math.floor(this.column), Math.floor(this.zoom));
    },

    zoomTo: function(destination) {
        var power = Math.pow(2, destination - this.zoom);
        return new com.modestmaps.Coordinate(this.row * power,
                          this.column * power,
                          destination);
    },
    
    zoomBy: function(distance) {
        var power = Math.pow(2, distance);
        return new com.modestmaps.Coordinate(this.row * power,
                          this.column * power,
                          this.zoom + distance);
    },

    up: function(distance) {
        if (distance == undefined)	distance = 1;
        return new com.modestmaps.Coordinate(this.row - distance, this.column, this.zoom);
    },

    right: function(distance) {
        if (distance == undefined) distance = 1;
        return new com.modestmaps.Coordinate(this.row, this.column + distance, this.zoom);
    },

    down: function(distance) {
        if (distance == undefined) distance = 1;
        return new com.modestmaps.Coordinate(this.row + distance, this.column, this.zoom);
    },

    left: function(distance) {
        if (distance == undefined) distance = 1;
        return new com.modestmaps.Coordinate(this.row, this.column - distance, this.zoom);
    }
};

//////////////////////////// Geo

com.modestmaps.Location = function(lat, lon) {
    this.lat = parseFloat(lat);
    this.lon = parseFloat(lon);
};

com.modestmaps.Location.prototype = {
    lat: 0,
    lon: 0,
    toString: function() {
        return "(" + this.lat.toFixed(3) + ", " + this.lon.toFixed(3) + ")";
    }
};

com.modestmaps.Transformation = function(ax, bx, cx, ay, by, cy) {
    this.ax = ax;
    this.bx = bx;
    this.cx = cx;
    this.ay = ay;
    this.by = by;
    this.cy = cy;
};

com.modestmaps.Transformation.prototype = {
    ax: 0, 
    bx: 0, 
    cx: 0, 
    ay: 0, 
    by: 0, 
    cy: 0,
    
    transform: function(point) {
        return new com.modestmaps.Point(this.ax*point.x + this.bx*point.y + this.cx,
                         this.ay*point.x + this.by*point.y + this.cy);
    },
                         
    untransform: function(point) {
        return new com.modestmaps.Point((point.x*this.by - point.y*this.bx - this.cx*this.by + this.cy*this.bx) / (this.ax*this.by - this.ay*this.bx),
                         (point.x*this.ay - point.y*this.ax - this.cx*this.ay + this.cy*this.ax) / (this.bx*this.ay - this.by*this.ax));
    },

    deriveTransformation: function(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y, c1x, c1y, c2x, c2y) {
        // Generates a transform based on three pairs of points, a1 -> a2, b1 -> b2, c1 -> c2.
        var x = this.linearSolution(a1x, a1y, a2x, b1x, b1y, b2x, c1x, c1y, c2x);
        var y = this.linearSolution(a1x, a1y, a2y, b1x, b1y, b2y, c1x, c1y, c2y);
        return new com.modestmaps.Transformation(x[0], x[1], x[2], y[0], y[1], y[2]);
    },

    linearSolution: function(r1, s1, t1, r2, s2, t2, r3, s3, t3) {
        /* Solves a system of linear equations.

          t1 = (a * r1) + (b + s1) + c
          t2 = (a * r2) + (b + s2) + c
          t3 = (a * r3) + (b + s3) + c

        r1 - t3 are the known values.
        a, b, c are the unknowns to be solved.
        returns the a, b, c coefficients.
        */

        // make them all floats
        r1 = parseFloat(r1);
        s1 = parseFloat(s1);
        t1 = parseFloat(t1);
        r2 = parseFloat(r2);
        s2 = parseFloat(s2);
        t2 = parseFloat(t2);
        r3 = parseFloat(r3);
        s3 = parseFloat(s3);
        t3 = parseFloat(t3);

        var a = (((t2 - t3) * (s1 - s2)) - ((t1 - t2) * (s2 - s3))) / (((r2 - r3) * (s1 - s2)) - ((r1 - r2) * (s2 - s3)));

        var b = (((t2 - t3) * (r1 - r2)) - ((t1 - t2) * (r2 - r3))) / (((s2 - s3) * (r1 - r2)) - ((s1 - s2) * (r2 - r3)));

        var c = t1 - (r1 * a) - (s1 * b);
    
        return [ a, b, c ];
    }
};

com.modestmaps.Projection = function(zoom, transformation) {
    if (!transformation) transformation = com.modestmaps.Transformation(1, 0, 0, 0, 1, 0);
    this.zoom = zoom;
    this.transformation = transformation;
};

com.modestmaps.Projection.prototype = {

    zoom: 0,
    transformation: null,
    
    rawProject: function(point) {
        alert("Abstract method not implemented by subclass.");
    },
        
    rawUnproject: function(point) {
        alert("Abstract method not implemented by subclass.");
    },

    project: function(point) {
        point = this.rawProject(point);
        if(this.transformation) {
            point = this.transformation.transform(point);
        }
        return point;
    },
    
    unproject: function(point) {
        if(this.transformation) {
            point = this.transformation.untransform(point);
        }
        point = this.rawUnproject(point);
        return point;
    },
        
    locationCoordinate: function(location) {
        var point = new com.modestmaps.Point(Math.PI * location.lon / 180.0, Math.PI * location.lat / 180.0);
        point = this.project(point);
        return new com.modestmaps.Coordinate(point.y, point.x, this.zoom);
    },

    coordinateLocation: function(coordinate) {
        coordinate = coordinate.zoomTo(this.zoom);
        var point = new com.modestmaps.Point(coordinate.column, coordinate.row);
        point = this.unproject(point);
        return new com.modestmaps.Location(180.0 * point.y / Math.PI, 180.0 * point.x / Math.PI);
    }
};

com.modestmaps.LinearProjection = function(zoom, transformation) {
    com.modestmaps.Projection.call(this, zoom, transformation);
};

com.modestmaps.LinearProjection.prototype = {
    rawProject: function(point) {
        return new com.modestmaps.Point(point.x, point.y);
    },
    rawUnproject: function(point) {
        return new com.modestmaps.Point(point.x, point.y);
    }
};

com.modestmaps.extend(com.modestmaps.LinearProjection, com.modestmaps.Projection);

com.modestmaps.MercatorProjection = function(zoom, transformation) {
    // super!
    com.modestmaps.Projection.call(this, zoom, transformation);
};

com.modestmaps.MercatorProjection.prototype = {
    rawProject: function(point) {
        return new com.modestmaps.Point(point.x,
                     Math.log(Math.tan(0.25 * Math.PI + 0.5 * point.y)));
    },

    rawUnproject: function(point) {
        return new com.modestmaps.Point(point.x,
                     2 * Math.atan(Math.pow(Math.E, point.y)) - 0.5 * Math.PI);
    }
};

com.modestmaps.extend(com.modestmaps.MercatorProjection, com.modestmaps.Projection);

//////////////////////////// Providers

com.modestmaps.MapProvider = function(getTileUrl) {
    if (getTileUrl) {
        this.getTileUrl = getTileUrl;
    }
};

com.modestmaps.MapProvider.prototype = {

    // defaults to Google-y Mercator style maps
    // see http://modestmaps.com/calculator.html for how to generate these magic numbers
    projection: new com.modestmaps.MercatorProjection(26, new com.modestmaps.Transformation(1.068070779e7, 0, 3.355443185e7, 0, -1.068070890e7, 3.355443057e7)),
    tileWidth: 256,
    tileHeight: 256,

    getTileUrl: function(coordinate) {
        alert("Abstract method not implemented by subclass.");
    },
    
    locationCoordinate: function(location) {
        return this.projection.locationCoordinate(location);
    },

    coordinateLocation: function(location) {
        return this.projection.coordinateLocation(location);
    },

    sourceCoordinate: function(coordinate) {
        var wrappedColumn = coordinate.column % Math.pow(2, coordinate.zoom);

        while (wrappedColumn < 0) {
            wrappedColumn += Math.pow(2, coordinate.zoom);
        }
            
        return new com.modestmaps.Coordinate(coordinate.row, wrappedColumn, coordinate.zoom);
    }
};

com.modestmaps.BlueMarbleProvider = function() {
    com.modestmaps.MapProvider.call(this, function(coordinate) {
        var img = coordinate.zoom.toFixed(0) +'-r'+ coordinate.row.toFixed(0) +'-c'+ coordinate.column.toFixed(0) + '.jpg';
        return 'http://s3.amazonaws.com/com.modestmaps.bluemarble/' + img;
    });
};

com.modestmaps.extend(com.modestmaps.BlueMarbleProvider, com.modestmaps.MapProvider);

//////////////////////////// Map

com.modestmaps.Map = function(parent, provider, dimensions) {
    /* Instance of a map intended for drawing to a div.
    
        parent
            DOM element
    
        provider
            Instance of IMapProvider
            
        dimensions
            Size of output image, instance of Point

    */
    if (typeof parent == 'string') {
        parent = document.getElementById(parent);
    }
    this.parent = parent;
    
    this.parent.style.position = 'relative';
    this.parent.style.width = parseInt(dimensions.x) + 'px';
    this.parent.style.height = parseInt(dimensions.y) + 'px';
    this.parent.style.padding = '0';
    this.parent.style.overflow = 'hidden';
    this.parent.style.backgroundColor = '#eee';
    
    com.modestmaps.addEvent(this.parent, 'dblclick', this.getDoubleClick());
    com.modestmaps.addEvent(this.parent, 'mousedown', this.getMouseDown());
    com.modestmaps.addEvent(this.parent, 'mousewheel', this.getMouseWheel());

    // add an invisible layer so that image.onload will have a srcElement in IE6
    this.loadingLayer = document.createElement('div');
    this.loadingLayer.id = 'loading layer';
    this.loadingLayer.style.display = 'none';
    this.parent.appendChild(this.loadingLayer);

    this.layers = [];

    // add a div for each zoom level
    for (var z = 0; z <= 20; z++) {
        var layer = document.createElement('div');
        layer.id = 'zoom-'+z;
        layer.style.margin = '0';
        layer.style.padding = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.position = 'absolute';
        layer.style.top = '0px';
        layer.style.left = '0px';
        this.parent.appendChild(layer);
        this.layers.push(layer);
    }
    
    this.provider = provider;
    this.dimensions = dimensions;
    this.coordinate = new com.modestmaps.Coordinate(0.5,0.5,0);
    this.tiles = {};
    this.requestedTiles = {};

    this.requestCount = 0;
    this.maxSimultaneousRequests = 4;
    this.requestQueue = [];
    
    this.tileCacheSize = 0;
    
    this.callbacks = { zoomed: [], panned: [], centered: [], extentset: [] };
};

com.modestmaps.Map.prototype = {

    parent: null,
    provider: null,
    dimensions: null,
    coordinate: null,

    tiles: null,
    requestedTiles: null,
    layers: null,

    requestCount: null,
    maxSimultaneousRequests: null,
    requestQueue: null,
    
    tileCacheSize: null,
    
    callbacks: null,

    toString: function() {
        return 'Map(' + this.provider.toString() + this.dimensions.toString() + this.coordinate.toString() + ')';
    },
    
    addCallback: function(event, callback)
    {
        if (typeof(callback) == 'function' && this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    },
    
    dispatchCallback: function(event, message)
    {
        if(this.callbacks[event]) {
            for (var i = 0; i < this.callbacks[event].length; i += 1) {
                try {
                    this.callbacks[event][i](this, message);
                } catch(e) {
                    // meh
                }
            }
        }
    },

    createOverlay: function(id) 
    {
        var canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = this.dimensions.x;
        canvas.height = this.dimensions.y;
        canvas.style.margin = '0';
        canvas.style.padding = '0';
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';        
        this.parent.appendChild(canvas);
    },

    // events

    mouseDownHandler: null,

    getMouseDown: function() {
        if (!this.mouseDownHandler) {
            var theMap = this;
            this.mouseDownHandler = function(e) {
                if (!e) var e = window.event;
    
                com.modestmaps.addEvent(document, 'mouseup', theMap.getMouseUp());
                com.modestmaps.addEvent(document, 'mousemove', theMap.getMouseMove());
                        
                theMap.prevMouse = new com.modestmaps.Point(e.clientX, e.clientY);
                
                theMap.parent.style.cursor = 'move';
            
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseDownHandler;
    },
    
    mouseMoveHandler: null,
    
    getMouseMove: function() {
        if (!this.mouseMoveHandler) {
            var theMap = this;
            this.mouseMoveHandler = function(e) {
                if (!e) e = window.event;
    
                if (theMap.prevMouse) {
                    theMap.panBy(e.clientX - theMap.prevMouse.x, e.clientY - theMap.prevMouse.y);
                    theMap.prevMouse.x = e.clientX;
                    theMap.prevMouse.y = e.clientY;
                }
            
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseMoveHandler;
    },

    mouseUpHandler: null,

    getMouseUp: function() {
        if (!this.mouseUpHandler) {
            var theMap = this;
            this.mouseUpHandler = function(e) {
                if (!e) e = window.event;
    
                com.modestmaps.removeEvent(document, 'mouseup', theMap.getMouseUp());
                com.modestmaps.removeEvent(document, 'mousemove', theMap.getMouseMove());
        
                theMap.prevMouse = null;

                theMap.parent.style.cursor = '';                
        
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseUpHandler;
    },
    
    mouseWheelHandler: null,

    getMouseWheel: function() {
        if (!this.mouseWheelHandler) {
            var theMap = this;
            var prevTime = new Date().getTime();
            this.mouseWheelHandler = function(e) {
                if (!e) e = window.event;
    
                var delta = 0;
                
                if (e.wheelDelta) {
                    delta = e.wheelDelta;
                }
                else if (e.detail) {
                    delta = -e.detail;
                }
    
                // limit mousewheeling to once every 200ms
                var timeSince = new Date().getTime() - prevTime;
    
                if (delta != 0 && (timeSince > 200)) {
                    
                    var point = theMap.getMousePoint(e);
                    
                    theMap.zoomByAbout(delta > 0 ? 1 : -1, point);
                    
                    prevTime = new Date().getTime();
                }
                
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.mouseWheelHandler;
    },

    doubleClickHandler: null,

    getDoubleClick: function() {
        if (!this.doubleClickHandler) {
            var theMap = this;
            this.doubleClickHandler = function(e) {
                if (!e) e = window.event;
    
                var point = theMap.getMousePoint(e);
                
                // use shift-double-click to zoom out
                theMap.zoomByAbout(e.shiftKey ? -1 : 1, point);    
                
                return com.modestmaps.cancelEvent(e);
            };
        }
        return this.doubleClickHandler;
    },

    // interaction helper

    getMousePoint: function(e)
    {
        // start with just the mouse (x, y)
        var point = new com.modestmaps.Point(e.clientX, e.clientY);
        
        // correct for scrolled document
        point.x += document.body.scrollLeft + document.documentElement.scrollLeft;
        point.y += document.body.scrollTop + document.documentElement.scrollTop;

        // correct for nested offsets in DOM
        for(var node = this.parent; node; node = node.offsetParent) {
            point.x -= node.offsetLeft;
            point.y -= node.offsetTop;
        }
        
        return point;
    },
    
    // zooming
    
    zoomIn: function() {
        this.zoomBy(1);
    },

    zoomOut: function() {
        this.zoomBy(-1);
    },
    
    setZoom: function(z) {
        this.zoomBy(z - this.coordinate.zoom);
    },
    
    zoomBy: function(zoomOffset) {
        this.coordinate = this.coordinate.zoomBy(zoomOffset);
        this.draw();

        this.dispatchCallback('zoomed', zoomOffset);
    },
    
    zoomByAbout: function(zoomOffset, point) {
        var location = this.pointLocation(point);
        this.coordinate = this.coordinate.zoomBy(zoomOffset);
        var newPoint = this.locationPoint(location);
        this.panBy(point.x - newPoint.x, point.y - newPoint.y);

        this.dispatchCallback('zoomed', zoomOffset);
    },

    // panning
    
    panBy: function(dx, dy) {
        this.coordinate.column -= dx / this.provider.tileWidth;
        this.coordinate.row -= dy / this.provider.tileHeight;
        this.draw();

        this.dispatchCallback('panned', [dx, dy]);
    },

    panLeft: function() {
        this.panBy(100,0);
    },
    
    panRight: function() {
        this.panBy(-100,0);
    },
    
    panDown: function() {
        this.panBy(0,-100);
    },
    
    panUp: function() {
        this.panBy(0,100);
    },
    
    // positioning
    
    setCenter: function(location) {
        this.setCenterZoom(location, this.coordinate.zoom);
    },
    
    setCenterZoom: function(location, zoom) {
        this.coordinate = this.provider.locationCoordinate(location).zoomTo(zoom);
        this.draw();

        this.dispatchCallback('centered', [location, zoom]);
    },

    setExtent: function(locations) {

        var TL, BR;
        for (var i = 0; i < locations.length; i++) {
            var coordinate = this.provider.locationCoordinate(locations[i]);
            if (TL) {
                TL.row = Math.min(TL.row, coordinate.row);
                TL.column = Math.min(TL.column, coordinate.column);
                TL.zoom = Math.min(TL.zoom, coordinate.zoom);
                BR.row = Math.max(BR.row, coordinate.row);
                BR.column = Math.max(BR.column, coordinate.column);
                BR.zoom = Math.max(BR.zoom, coordinate.zoom);
            }
            else {
                TL = coordinate.copy();
                BR = coordinate.copy();
            }
        }
        
        var width = this.dimensions.x + 1;
        var height = this.dimensions.y + 1; 
        
        // multiplication factor between horizontal span and map width
        var hFactor = (BR.column - TL.column) / (width / this.provider.tileWidth);
    
        // multiplication factor expressed as base-2 logarithm, for zoom difference
        var hZoomDiff = Math.log(hFactor) / Math.log(2);
            
        // possible horizontal zoom to fit geographical extent in map width
        var hPossibleZoom = TL.zoom - Math.ceil(hZoomDiff);
            
        // multiplication factor between vertical span and map height
        var vFactor = (BR.row - TL.row) / (height / this.provider.tileHeight);
            
        // multiplication factor expressed as base-2 logarithm, for zoom difference
        var vZoomDiff = Math.log(vFactor) / Math.log(2);
            
        // possible vertical zoom to fit geographical extent in map height
        var vPossibleZoom = TL.zoom - Math.ceil(vZoomDiff);
            
        // initial zoom to fit extent vertically and horizontally
        var initZoom = Math.min(hPossibleZoom, vPossibleZoom);
    
        // additionally, make sure it's not outside the boundaries set by provider limits
        // initZoom = min(initZoom, provider.outerLimits()[1].zoom)
        // initZoom = max(initZoom, provider.outerLimits()[0].zoom)
    
        // coordinate of extent center
        var centerRow = (TL.row + BR.row) / 2;
        var centerColumn = (TL.column + BR.column) / 2;
        var centerZoom = TL.zoom;
        
        this.coordinate = new com.modestmaps.Coordinate(centerRow, centerColumn, centerZoom).zoomTo(initZoom);
        this.draw();

        this.dispatchCallback('extentset', locations);
    },
    
    // projecting points on and off screen
    
    coordinatePoint: function(coord)
    {
        /* Return an x, y point on the map image for a given coordinate. */
        
        if(coord.zoom != this.coordinate.zoom) {
            coord = coord.zoomTo(this.coordinate.zoom);
        }
        
        // distance from the center of the map
        var point = new com.modestmaps.Point(this.dimensions.x/2, this.dimensions.y/2);
        point.x += this.provider.tileWidth * (coord.column - this.coordinate.column);
        point.y += this.provider.tileHeight * (coord.row - this.coordinate.row);
        
        return point;
    },

    pointCoordinate: function(point)
    {
        /* Return a coordinate on the map image for a given x, y point. */
        
        // new point coordinate reflecting distance from map center, in tile widths
        var coord = this.coordinate.copy();
        coord.column += (point.x - this.dimensions.x/2) / this.provider.tileWidth;
        coord.row += (point.y - this.dimensions.y/2) / this.provider.tileHeight;
        
        return coord;
    },

    locationPoint: function(location)
    {
        /* Return an x, y point on the map image for a given geographical location. */
        return this.coordinatePoint(this.provider.locationCoordinate(location));
    },
    
    pointLocation: function(point)
    {
        /* Return a geographical location on the map image for a given x, y point. */
        return this.provider.coordinateLocation(this.pointCoordinate(point));
    },
    
    // inspecting

    getExtent: function() {
        var extent = [];
        extent.push(this.pointLocation(new com.modestmaps.Point(0,0)));
        extent.push(this.pointLocation(this.dimensions));
        return extent;
    },
    
    getCenter: function() {
        return this.provider.coordinateLocation(this.coordinate);
    },
    
    getZoom: function() {
        return this.coordinate.zoom;
    },
    
    // rendering    
    
    draw: function(onlyThisLayer) {

//        console.log('requestQueue: ' + this.requestQueue.length);
//        console.log('requestCount: ' + this.requestCount);
//        console.log('tileCacheSize: ' + this.tileCacheSize);

        //console.log('--- begin draw ' + onlyThisLayer);
        
        // so this is the corner, taking the container offset into account
        var baseCoord = this.coordinate.container();
        var baseCorner = new com.modestmaps.Point(this.dimensions.x/2, this.dimensions.y/2);
        baseCorner.x += (baseCoord.column - this.coordinate.column) * this.provider.tileWidth;
        baseCorner.y += (baseCoord.row - this.coordinate.row) * this.provider.tileHeight;

        // get back to the top left
        while (baseCorner.x > 0) {
            baseCorner.x -= this.provider.tileWidth;
            baseCoord.column -= 1;
        }
        while (baseCorner.y > 0) {
            baseCorner.y -= this.provider.tileHeight;
            baseCoord.row -= 1;
        }

        var wantedTiles = { };
        
        var thisLayer = document.getElementById('zoom-'+parseInt(baseCoord.zoom));
        thisLayer.coordinate = this.coordinate.copy();
        
        var showParentLayer = false;
        
        var tileCoord = baseCoord.copy();

        for (var y = baseCorner.y; y < this.dimensions.y; y += this.provider.tileHeight) {
            for (var x = baseCorner.x; x < this.dimensions.x; x += this.provider.tileWidth) {
                var tileKey = tileCoord.toKey();
                wantedTiles[tileKey] = true;
                if (!this.tiles[tileKey]) {
                    if (!this.requestedTiles[tileKey]) {
                        this.requestTile(tileCoord);
                    }
                    showParentLayer = true;
                    if (!onlyThisLayer) {
                        for (var pz = 1; pz <= 5; pz++) {
                            var parentKey = tileCoord.zoomBy(-pz).container().toKey();
                            wantedTiles[parentKey] = true;
                        }
                        var childCoord = tileCoord.zoomBy(1);
                        wantedTiles[childCoord.toKey()] = true;
                        childCoord.column += 1;
                        wantedTiles[childCoord.toKey()] = true;
                        childCoord.row += 1;
                        wantedTiles[childCoord.toKey()] = true;
                        childCoord.column -= 1;
                        wantedTiles[childCoord.toKey()] = true;
                    }
                }
                else {
                    var tile = this.tiles[tileKey];
                    if (!document.getElementById(tile.id)) {
                        thisLayer.appendChild(tile);
                    }
                    tile.style.left = x + 'px';
                    tile.style.top = y + 'px';
                }
                tileCoord.column += 1;
            }
            tileCoord.row += 1;
            tileCoord.column = baseCoord.column;
        }
        
        //console.log(showParentLayer);
        
        if (!onlyThisLayer || !showParentLayer) {

            // layers that would be scaled too big:
            for (var i = 0; i < baseCoord.zoom-5; i++) {
                var layer = this.layers[i];
                layer.style.display = 'none';

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    layer.removeChild(visibleTiles[j]);
                }                    
            }

            // layers that would be scaled too small, and tiles would be too numerous:
            for (var i = baseCoord.zoom+2; i < this.layers.length; i++) {
                var layer = this.layers[i];
                layer.style.display = 'none';

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    layer.removeChild(visibleTiles[j]);
                }                    
            }
        
            // layers we want to see, if they have tiles that are in wantedTiles
            for (var i = Math.max(0, baseCoord.zoom-5); i < Math.min(baseCoord.zoom+2, this.layers.length); i++) {

                var layer = this.layers[i];

                var scale = 1;

                var theCoord = null;

                if (layer.coordinate) {
                    layer.style.display = 'block';
                    if (layer != thisLayer) {
                        theCoord = this.coordinate.zoomTo(layer.coordinate.zoom);
                        scale = Math.pow(2, this.coordinate.zoom - layer.coordinate.zoom);
                    }
                }
                else {
                    layer.style.display = 'none';
                }

                var visibleTiles = layer.getElementsByTagName('img');
                for (var j = visibleTiles.length-1; j >= 0; j--) {
                    var tile = visibleTiles[j];
                    if (!wantedTiles[tile.id]) {
                        layer.removeChild(tile);
                    }
                    else if (theCoord) {
                        var tx = ((this.dimensions.x/2) + (tile.coord.column - theCoord.column) * this.provider.tileWidth * scale);
                        var ty = ((this.dimensions.y/2) + (tile.coord.row - theCoord.row) * this.provider.tileHeight * scale);
                        tile.style.left = parseInt(tx) + 'px'; 
                        tile.style.top = parseInt(ty) + 'px'; 
                        tile.width = this.provider.tileWidth * scale;
                        tile.height = this.provider.tileHeight * scale;
                    }
                    else {
                        tile.width = this.provider.tileWidth;
                        tile.height = this.provider.tileHeight;                    
                    }
                }
            }
            
        }

        for (var tileKey in this.requestedTiles) {
            if (!wantedTiles[tileKey]) {
                var tile = this.requestedTiles[tileKey];
                this.cancelTileRequest(tile);
                tile = null;
            }
        }
        
        this.processQueue();
        
        //console.log('--- end draw ' + onlyThisLayer);
    },
    
    redrawTimer: undefined,
    
    requestRedraw: function() {
        if (this.redrawTimer) clearTimeout(this.redrawTimer);
        this.redrawTimer = setTimeout(this.getRedraw(), 1000);
    },

    _redraw: null,
    
    getRedraw: function() {
        // let's only create this closure once...
        if (!this._redraw) {
            var theMap = this;
            this._redraw = function() {
                theMap.draw();
            }
        }
        return this._redraw;
    },
    
    requestTile: function(tileCoord) {
        var tileKey = tileCoord.toKey();
        if (!this.requestedTiles[tileKey]) {
            var tile = document.createElement('img'); // TODO: benchmark vs new Image() (in all browsers)
            tile.id = tileKey;
            tile.width = this.provider.tileWidth;
            tile.height = this.provider.tileHeight;
            tile.style.position = 'absolute';
            this.requestedTiles[tileKey] = tile;
            this.requestQueue.push( { tile: tile, coord: tileCoord.copy() });
        }
    },
    
    processQueue: function() {
        if (this.requestQueue.length > 8) {
            this.requestQueue.sort(this.getCenterDistanceCompare());
        }
        while (this.requestCount < this.maxSimultaneousRequests && this.requestQueue.length > 0) {
            var request = this.requestQueue.pop();
            if (request) {
                this.requestCount++;
                // add it to the DOM in a hidden layer, this is a bit of a hack, but it's
                // so that the event we get in image.onload has srcElement assigned in IE6
                this.loadingLayer.appendChild(request.tile);                
                // set these before tile.src to avoid missing a tile that's already cached            
                request.tile.onload = request.tile.onerror = this.getLoadComplete();
                request.tile.src = this.provider.getTileUrl(request.coord);
                request.tile.coord = request.coord; // FIXME: store this elsewhere to avoid scary memory leaks
                // keep things tidy
                request.tile = request.coord = null;
            }
        }
    },

    cancelTileRequest: function(tile) {
        // whether we've done the request or not...
        delete this.requestedTiles[tile.id];    
        if (tile.src) { // FIXME: what if the tile *should* have a null URL?
            tile.onload = tile.onerror = null;
            //delete tile['coord']; // causes an error in IE6
            tile.coord = null;
            // not sure if this is necessary, but hopefully it guarantees the tile stops loading?
            tile.src = null;
            // pull it back out of the DOM
            this.loadingLayer.removeChild(tile);
            // correct this...
            this.requestCount--;
        }
        else {
            for (var i = 0; i < this.requestQueue.length; i++) {
                var request = this.requestQueue[i];
                if (request && request.tile === tile) {
                    this.requestQueue[i] = null;
                    request.tile = request.coord = null;
                }
            }
        }
    },
    
    _loadComplete: null,
    
    getLoadComplete: function() {
        // let's only create this closure once...
        if (!this._loadComplete) {
            var theMap = this;
            this._loadComplete = function(e) {
                if (!e) var e = event || window.event;

                // srcElement for IE, target for FF, Safari etc.
                var tile = e.srcElement || e.target;

                // unset these straight away so we don't call this twice
                tile.onload = tile.onerror = null;

                // pull it back out of the DOM so that draw will add it correctly later
                theMap.loadingLayer.removeChild(tile);
                
                theMap.requestCount--;

                delete theMap.requestedTiles[tile.id];

                // NB:- complete is also true onerror if we got a 404
                if (tile.complete || (tile.readyState && tile.readyState == 'complete')) {
                    theMap.tiles[tile.id] = tile;
                    theMap.tileCacheSize++;
                }
                else {
                    // if it didn't finish clear its src to make sure it really stops loading
                    // FIXME: if we don't add it to theMap.tiles then we'll request it 
                    // again if and when the map moves - that's probably broken behaviour
                    tile.src = null;
                }
                
                // TODO: can we position the tile here instead of redrawing all tiles?
                theMap.draw(true);
                theMap.requestRedraw(); // all layers, will remove as well as reposition things
            }
        }
        return this._loadComplete;
    },
    
    getCenterDistanceCompare: function() {
        var theCoordinate = this.coordinate;
        return function(r1, r2) {
            if (r1 && r2) {
                var c1 = r1.coord;
                var c2 = r2.coord;
                var ds1 = Math.abs(theCoordinate.row - c1.row) + Math.abs(theCoordinate.column - c1.column);
                var ds2 = Math.abs(theCoordinate.row - c2.row) + Math.abs(theCoordinate.column - c2.column);
                return ds1 < ds2 ? 1 : ds1 > ds2 ? -1 : 0;
            }
            return r1 ? 1 : r2 ? -1 : 0;
        }
    }
    
};
/* ======================================================================
    src/mapproviders/cloudmade.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

com.modestmaps.CloudMadeProvider = function(key, style) {
    this.key = key;
    this.style = style;
}

com.modestmaps.CloudMadeProvider.prototype = {
    key: null,
    style: null,
    getTileUrl: function(coord) {
        coord = this.sourceCoordinate(coord);
        var worldSize = Math.pow(2, coord.zoom);
        var server = new Array('a.', 'b.', 'c.', '')[parseInt(worldSize * coord.row + coord.column) % 4];
        var imgPath = new Array(this.key, this.style, this.tileWidth, coord.zoom, coord.column, coord.row).join('/');
        return 'http://' + server + 'tile.cloudmade.com/' + imgPath + '.png';
    }
}

com.modestmaps.extend(com.modestmaps.CloudMadeProvider, com.modestmaps.MapProvider);
/* ======================================================================
    src/extras/mapcontrols-raphael.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

com.modestmaps.MapControls = function(map)
{
    // get your div on
    
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style.left = '0px';
    this.div.style.top = '0px';
    map.parent.appendChild(this.div);

    this.canvas = Raphael(this.div, 200, 100);

    /*
    var left = this.canvas.circle(15, 30, 10).attr("fill", "red");
    var lefta = this.canvas.path({fill: "white"}, "M -6 0 L 3 -5 L 3 5").translate(15, 30);
    var down = this.canvas.circle(40, 45, 10).attr("fill", "red");
    var downa = this.canvas.path({fill: "white"}, "M 0 6 L -5 -3 L 5 -3").translate(40, 45);
    var right = this.canvas.circle(65, 30, 10).attr("fill", "red");
    var righta = this.canvas.path({fill: "white"}, "M 6 0 L -3 -5 L -3 5").translate(65, 30);
    var up = this.canvas.circle(40, 15, 10).attr("fill", "red");
    var upa = this.canvas.path({fill: "white"}, "M 0 -6 L -5 3 L 5 3").translate(40, 15);
    */
    var zin = this.canvas.circle(25, 25, 10).attr("fill", "red");
    var zina = this.canvas.path({stroke: "white", 'stroke-width': 2}, "M -5 0 L 5 0 M 0 -5 L 0 5").translate(25, 25);
    var zout = this.canvas.circle(25, 55, 10).attr("fill", "red");
    var zouta = this.canvas.path({stroke: "white", 'stroke-width': 2}, "M -5 0 L 5 0").translate(25, 55);

    /*
    lefta.node.onclick = left.node.onclick = function() { map.panLeft() };
    righta.node.onclick = right.node.onclick = function() { map.panRight() };
    upa.node.onclick = up.node.onclick = function() { map.panUp() };
    downa.node.onclick = down.node.onclick = function() { map.panDown() };
    */
    zina.node.onclick = zin.node.onclick = function() { map.zoomIn() };
    zouta.node.onclick = zout.node.onclick = function() { map.zoomOut() };
    
    /*
    lefta.node.style.cursor = left.node.style.cursor = 'pointer';
    righta.node.style.cursor = right.node.style.cursor = 'pointer';
    upa.node.style.cursor = up.node.style.cursor = 'pointer';
    downa.node.style.cursor = down.node.style.cursor = 'pointer';
    */
    zina.node.style.cursor = zin.node.style.cursor = 'pointer';
    zouta.node.style.cursor = zout.node.style.cursor = 'pointer';
    
};

com.modestmaps.MapControls.prototype = {

    div: null,
    canvas: null
    
};
/* ======================================================================
    src/overlays/polygonmarker-raphael.js
   ====================================================================== */

// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

com.modestmaps.PolygonMarker = function(map, locations, fillStyle, fillAlpha, strokeStyle)
{
    this.fillStyle = fillStyle;
    this.fillAlpha = fillAlpha;
    this.strokeStyle = strokeStyle;

    this.coords = [];

    // top left    
    var maxLat = locations[0].lat;
    var minLon = locations[0].lon;

    // bottom right
    var minLat = locations[0].lat;
    var maxLon = locations[0].lon;
    
    for (var i = 0; i < locations.length; i++) {
        this.coords.push(map.provider.locationCoordinate(locations[i]));
        minLat = Math.min(minLat, locations[i].lat);
        maxLat = Math.max(maxLat, locations[i].lat);
        minLon = Math.min(minLon, locations[i].lon);
        maxLon = Math.max(maxLon, locations[i].lon);
    }

    var topLeftLocation = new com.modestmaps.Location(maxLat, minLon);
    var bottomRightLocation = new com.modestmaps.Location(minLat, maxLon);

//    console.log(topLeftLocation);
//    console.log(bottomRightLocation);
    
    this.topLeftCoord = map.provider.locationCoordinate(topLeftLocation);
    this.bottomRightCoord = map.provider.locationCoordinate(bottomRightLocation);
    
//    console.log(this.topLeftCoord);
//    console.log(this.bottomRightCoord);


    // listen for events
    
    var follower = this;    
    var callback = function(m, a) { return follower.draw(m); };
    map.addCallback('panned', callback);
    map.addCallback('zoomed', callback);
    map.addCallback('centered', callback);
    map.addCallback('extentset', callback);
    
    // get your div on
    
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    map.parent.appendChild(this.div);
    
    this.draw(map);
}

com.modestmaps.PolygonMarker.prototype = {

    div: null,
    canvas: null,

    coords: null,
    topLeftCoord: null,
    bottomRightCoord: null,
    
    drawZoom: null,
    
    fillStyle: null,
    fillAlpha: null,
    strokeStyle: null,
    
    draw: function(map)
    {
        try {
            var point = map.coordinatePoint(this.topLeftCoord);

        } catch(e) {
            // too soon?
            return;
        }
        
        /* if(point.x + this.dimensions.x + this.offset.x < 0) {
            // too far left
            this.div.style.display = 'none';
        
        } else if(point.y + this.dimensions.y + this.offset.y < 0) {
            // too far up
            this.div.style.display = 'none';
        
        } else if(point.x + this.offset.x > map.dimensions.x) {
            // too far right
            this.div.style.display = 'none';
        
        } else if(point.y + this.offset.y > map.dimensions.y) {
            // too far down
            this.div.style.display = 'none';

        } else {
            this.div.style.display = 'block';
            this.div.style.left = point.x + this.offset.x + 'px';
            this.div.style.top = point.y + this.offset.y + 'px';
        } */
        
        this.div.style.display = 'block';
        this.div.style.left = point.x + 'px';
        this.div.style.top = point.y + 'px';

        if (this.drawZoom != map.getZoom()) {

            var topLeftPoint = map.coordinatePoint(this.topLeftCoord);
            var bottomRightPoint = map.coordinatePoint(this.bottomRightCoord);
        
            var canvasWidth = bottomRightPoint.x - topLeftPoint.x;
            var canvasHeight = bottomRightPoint.y - topLeftPoint.y;
        
            if (this.canvas) {
                this.canvas.remove();
                // TODO: resize?
            }

            this.canvas = Raphael(this.div, canvasWidth, canvasHeight);
        
            var points = [];
            for (var i = 0; i < this.coords.length; i++) {
                var point = map.coordinatePoint(this.coords[i]);
                point.x -= topLeftPoint.x;
                point.y -= topLeftPoint.y;
                points.push(point);
            }

            var pathParams = {};

            if (this.fillStyle) {
                pathParams['fill'] = this.fillStyle;
                pathParams['fill-opacity'] = this.fillAlpha;
            }
            if (this.strokeStyle) pathParams['stroke'] = this.strokeStyle;
            
            var path = this.canvas.path(pathParams);

            path.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                path.lineTo(points[i].x, points[i].y);
            }
            path.andClose();
            
            this.drawZoom = map.getZoom();
        }        
        
    },

    clear: function(){
        this.canvas.clear();
        this.coords = [];
    }
};
/* ======================================================================
    flickr-api.js
   ====================================================================== */

/* ======================================================================
    jsr.src.js
   ====================================================================== */

// jsr_class.js
//
// JSONscriptRequest -- a simple class for making HTTP requests
// using dynamically generated script tags and JSON
//
// Author: Jason Levitt
// Date: December 7th, 2005
//
// A SECURITY WARNING FROM DOUGLAS CROCKFORD:
// "The dynamic <script> tag hack suffers from a problem. It allows a page 
// to access data from any server in the web, which is really useful. 
// Unfortunately, the data is returned in the form of a script. That script 
// can deliver the data, but it runs with the same authority as scripts on 
// the base page, so it is able to steal cookies or misuse the authorization 
// of the user with the server. A rogue script can do destructive things to 
// the relationship between the user and the base server."
//
// So, be extremely cautious in your use of this script.
//
//
// Sample Usage:
//
// <script type="text/javascript" src="jsr_class.js"></script>
// 
// function callbackfunc(jsonData) {
//      alert('Latitude = ' + jsonData.ResultSet.Result[0].Latitude + 
//            '  Longitude = ' + jsonData.ResultSet.Result[0].Longitude);
//      aObj.removeScriptTag();
// }
//
// request = 'http://api.local.yahoo.com/MapsService/V1/geocode?appid=YahooDemo&
//            output=json&callback=callbackfunc&location=78704';
// aObj = new JSONscriptRequest(request);
// aObj.buildScriptTag();
// aObj.addScriptTag();
//
//


// Constructor -- pass a REST request URL to the constructor
//
function JSONscriptRequest(fullUrl) {
    // REST request path
    this.fullUrl = fullUrl; 
    // Keep IE from caching requests
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    // Get the DOM location to put the script tag
    this.headLoc = document.getElementsByTagName("head").item(0);
    // Generate a unique script tag id
    this.scriptId = 'JscriptId' + JSONscriptRequest.scriptCounter++;
}

// Static script ID counter
JSONscriptRequest.scriptCounter = 1;

// buildScriptTag method
//
JSONscriptRequest.prototype.buildScriptTag = function () {

    // Create the script tag
    this.scriptObj = document.createElement("script");
    
    // Add script object attributes
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("charset", "utf-8");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
}
 
// removeScriptTag method
// 
JSONscriptRequest.prototype.removeScriptTag = function () {
    // Destroy the script tag
    this.headLoc.removeChild(this.scriptObj);  
}

// addScriptTag method
//
JSONscriptRequest.prototype.addScriptTag = function () {
    // Create the script tag
    this.headLoc.appendChild(this.scriptObj);
}
/* ======================================================================
    md5.src.js
   ====================================================================== */

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
/* ======================================================================
    flickr-api.src.js
   ====================================================================== */

/*

info.aaronland.flickr.API library v1.01
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.flickr){
    info.aaronland.flickr = {};
}

info.aaronland.flickr.API = function(args){

    this.args = args;

    this._host = 'api.flickr.com';
    this._endpoint = '/services/rest';

    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;
}

info.aaronland.flickr.API.prototype.api_call = function(method, args){

    this.log('calling: ' + method);

    args['noCacheIE'] = (new Date()).getTime();
    var url = this.api_call_url(method, args);

    var skip_ie_cachebuster=1;
    this.json_request(url, skip_ie_cachebuster);
};

info.aaronland.flickr.API.prototype.api_call_url = function(method, args){

    args['api_key'] = this.args['key'];
    args['method'] = method;
    args['format'] = 'json';
    args['nojsoncallback'] = 1;

    // Imagine a world where the signature is pre-generated
    // server-side and passed to the JS by a templating system

    if ((args['auth_token']) && (! args['api_sig'])){
    	var sig = this.sign_args(args);
    	args['api_sig'] = sig;
    }

    var params = new Array();

    for (prop in args){
        var str = prop + '=' + encodeURIComponent(args[prop]);
        params.push(str);
    }

    var url = 'http://' + this._host + this._endpoint;
    url += '?';
    url += params.join("&");
    
    this.log('request: ' + url)
    return url;
};

info.aaronland.flickr.API.prototype.sign_args = function(args){

    var keys = new Array();
    var str = '';

    for (prop in args){
        keys.push(prop);
    }

    keys.sort();

    for (i in keys){
        var prop = keys[i];
        str += prop + args[prop];
    }
    
    this.log('signing: ********' + str);

    return hex_md5(this.args['secret'] + str);
};

info.aaronland.flickr.API.prototype.json_request = function(url, skip_ie_cachebuster){
                    
    jsr = new JSONscriptRequest(url); 

    if (skip_ie_cachebuster){
       jsr.noCacheIE = '';
    }

    jsr.buildScriptTag(); 
    jsr.addScriptTag();
};

info.aaronland.flickr.API.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[flickr] ' + msg);
};

// -*-java-*-
/* ======================================================================
    geolocation.js
   ====================================================================== */

/* ======================================================================
    geolocation.src.js
   ====================================================================== */

/*

info.aaronland.geolocation library v1.02
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.iamhere){
    info.aaronland.geo = {};
}

// this is still a bit up in the air...

info.aaronland.geo.canhasLocation = function(){};
    
info.aaronland.geo.canhasLocation.prototype.survey = function(args){

    this.canhas_geode = ((typeof(navigator) == 'object') && (navigator['geolocation'])) ? 1 : 0;
    this.canhas_loki = (typeof(Loki) == 'object') ? 1 : 0;
    this.canhas_google = (typeof(google) == 'object') ? 1 : 0;

    // geode

    if ((this.canhas_geode) && (navigator.userAgent.indexOf("Firefox") < 0)){
        this.canhas_geode = 0;
    }

    // loki

    if ((this.canhas_loki) && (! args['loki_apikey'])){
        this.canhas_loki = 0;
    }

    // in summary...

    this.canhas_geolocation = 0;

    if ((this.canhas_geode) || (this.canhas_loki) || (this.canhas_google)){
        this.canhas_geolocation = 1;
    }

    return this.canhas_geolocation;
};

// inherits from canhasLocation

info.aaronland.geo.Location = function(args){

    this.survey(args);
    this.args = args;

    this.canhas_console = (typeof(console) != 'undefined') ? 1 : 0;

    this.log("flickr support: " + this.canhas_flickr);
    this.log("google support: " + this.canhas_google);
    this.log("loki support: " + this.canhas_loki);
    this.log("geode support: " + this.canhas_geode);
    this.log("geolocation support: " + this.canhas_geolocation);
};

info.aaronland.geo.Location.prototype = new info.aaronland.geo.canhasLocation;

info.aaronland.geo.Location.prototype.findMyLocation = function(doThisOnSuccess, doThisIfNot){

    // Assume that if you've passed a Loki API key that's what
    // you want to use (this assumption probably doesn't hold
    // for things with a GPS unit but one step at a time...)

    var _self = this;

    if ((this.canhas_loki) && (this.args['loki_apikey'])){
        this.log("find my location with loki");
        
        // http://sarver.org/2009/05/29/where-20-location-on-the-web/

        var loki = new LokiAPI();

        loki.onSuccess = function(location) {
            _self.log("loki dispatch returned (success)");
            doThisOnSuccess(location.latitude, location.longitude);
        };
            
        loki.onFailure = function(error, msg){
            _self.log("loki dispatch returned (failed)");
            doThisIfNot('Attempt to get location failed: ' + error + ', ' + msg);
        };
        
        loki.setKey(this.args['loki_apikey']);
        loki.requestLocation(true, loki.FULL_STREET_ADDRESS_LOOKUP);

        this.log("loki positioning dispatched");
        return;
    }

    // geode

    if (this.canhas_geode){

        this.log("find my location with geode");

        // http://labs.mozilla.com/2008/10/introducing-geode/

        _onSuccess = function(position){
            _self.log("geode dispatch returned (success)");
            doThisOnSuccess(position.latitude, position.longitude);            
        };

        _onFailure = function(error){
            _self.log("geode dispatch returned (failed)");
            doThisIfNot('Attempt to get location failed: ' + error.code + ',' + error.message);            
        };

        navigator.geolocation.getCurrentPosition(_onSuccess, _onFailure);

        this.log("geode positioning displatched");
        return;
    }

    // teh google

    if (this.canhas_google){

        // http://code.google.com/apis/gears/api_geolocation.html#example

        if (google['gears']){
            this.log("find my location with (google) gears");

            var geo = google.gears.factory.create('beta.geolocation');

            _onSuccess = function(position) {
                _self.log("gears dispatch returned (success)");
                doThisOnSuccess(position.latitude, position.longitude);
            };

            _onFailure = function (postionError){
                _self.log("gears dispatch returned (failed)");
                doThisIfNot('Attempt to get location failed: ' + positionError.message);
            };

            geo.getCurrentPosition(_onSuccess, _onFailure);

            this.log("gears positioning displatched");
            return;
        }

        // http://briancray.com/2009/05/29/find-web-visitors-location-javascript-google-api/

        if ((google['loader']) && (google['loader']['ClientLocation'])){

            this.log("find my location with (google) client location");

            lat = google.loader.ClientLocation.latitude;
            lon = google.loader.ClientLocation.longitude;

            doThisOnSuccess(lat, lon);
            return;
        }
    }

    doThisIfNot("unable to find a location provider ... where are you???");
    return;
};

info.aaronland.geo.Location.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[geolocation] ' + msg);
};

// -*-java-*-
/* ======================================================================
    iamheremap.src.js
   ====================================================================== */

/*

info.aaronland.iamhere.Map library v1.02
Copyright (c) 2009 Aaron Straup Cope

This is free software. You may redistribute it and/or modify it under
the same terms as Perl Artistic License.

http://en.wikipedia.org/wiki/Artistic_License

*/

// note: the use of jquery is probably overkill.
// patches are welcome.

if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.iamhere){
    info.aaronland.iamhere = {};
}

info.aaronland.iamhere.Map = function(target, args){
    this.args = args;
    this.map_obj;

    this.timer_reversegeo;
    this.timer_warning;

    this.flickr;
    this.googlemaps_geocoder;

    this.paths_woe = new Array();

    this.lat;
    this.lon;
    this.woeid;

    // I am here...

    var _self = this;

    // Hello, world?

    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;

    this.canhas_flickr = (typeof(info.aaronland.flickr) == 'object') ? 1 : 0;
    this.canhas_google = (typeof(google) == 'object') ? 1 : 0;

    this.canhas_geocoder = 0;
    this.canhas_reversegeocoder = 0;
    this.canhas_geolocation = 0;

    // flickr

    if ((this.canhas_flickr) && (! this.args['flickr_apikey'])){
        this.canhas_flickr = 0;
    }

    if (this.canhas_flickr){

        var flickr_args = {
            'key' : this.args['flickr_apikey'],
            'enable_logging' : this.args['enable_logging'],
        };

        this.flickr = new info.aaronland.flickr.API(flickr_args);
    }

    // google

    if (this.canhas_google){
        this.googlemaps_geocoder = new google.maps.Geocoder();
    }

    // sanity checking

    if ((this.canhas_flickr) || (this.canhas_google)){
        this.canhas_geocoder = 1;
    }

    if (this.canhas_flickr){
        this.canhas_reversegeocoder = 1;
    }

    // not entirely sure about this interface...

    var canhas = new info.aaronland.geo.canhasLocation();
    
    if (canhas.survey(args)){
        this.canhas_geolocation = 1;
    }

    // reporting

    this.log("flickr support: " + this.canhas_flickr);
    this.log("google support: " + this.canhas_google);
    this.log("geocoder support: " + this.canhas_geocoder);
    this.log("reverse geocoder support: " + this.canhas_reversegeocoder);
    this.log("geolocation support: " + this.canhas_geolocation);

    // squirt in the map container elements

    this.map_height = 400;
    this.map_width = $(document).width();

    if (args['map_width']){
        this.map_width = args['map_width'];
    }

    if (args['map_height']){
        this.map_height = args['map_height'];
    }

    var crosshair_y = (this.map_height / 2) - 8;
    var crosshair_x = this.map_width / 2;

    // please to make the inline css go away...

    // to do: generate a uuid to append to iamhere_*
    // identifiers so that more than one map may be
    // embedded in a page...

    var html = '';

    if ((this.canhas_geocoder) || (this.canhas_geolocation)){
    	html += '<form id="iamhere_geocoder" style="text-align:center;max-width:' + this.map_width + ';">';

        if (this.canhas_geocoder){

            html += '<input id="iamhere_geocode_me" type="text" name="location" size="30%;" value="" style="border:1px solid;padding:1px;" />' + 
                    '<input id="iamhere_find_this" type="submit" value="&#8592; FIND THIS PLACE" style="border:1px solid; margin-left:10px;" />';
	}

        if (this.canhas_geolocation){
            var label = (this.canhas_geocoder) ? "or find my location" : "find my location";
            html += '<input id="iamhere_find_me" type="submit" value="' + label + '" style="border:1px solid;margin-left:10px;" />';
        }

        html += '</form>';
    }

    // sudo, add support to make the map/crosshair work 
    // with window resizing...

    html += '<div id="iamhere_chooser" style="position:relative;"><div id="iamhere_viewport"></div>' +
            '<div id="iamhere_crosshair" style="' +
            'position: absolute;top:' + crosshair_y + 'px;height:19px;width:19px;left:' + crosshair_x + ';margin-left:-8px;display:block;' + 
    	    'background-position: center center;background-repeat: no-repeat;' + 
    	    '"></div></div>'; 

    if (this.args['modestmaps_provider'] == 'CloudMade'){

        var date = new Date();
        var yyyy = date.getYear() + 1900;

        html += '<div id="iamhere_osm_notice" style="' + 
            	'text-align:right;font-size:10px;font-family:sans-serif;margin-top:5px;' + 
                '">Map data <a href="http://creativecommons.org/licenses/by-sa/3.0/">CCBYSA</a> ' + yyyy + ' <a href="http://openstreetmap.org/">OpenStreetMap.org</a> contributors</a></div>';
    }

    html += '<div id="iamhere_coordinates" style="' + 
            'min-height:10pt;font-family:sans-serif;font-weight:700;font-size:10pt;margin-bottom:5px;margin-top:15px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>' + 
            '<div id="iamhere_location" style="'+
            'min-height:10pt;font-family:sans-serif;font-size:10pt;margin-bottom:5px;margin-top:10px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>' + 
            '<div id="iamhere_warning" style="'+    
            'min-height:10pt;color:red;font-family:serif;font-style:italic;font-size:10pt;margin-bottom:5px;margin-top:10px;text-align:center;max-width:' + this.map_width + ';' +
            '"></div>';

    $("#" + target).html(html);

    // http://www.sveinbjorn.org/dataurls_css
    // this is just a nuisance to do above...

    var data_url = '"data:image/gif;base64,R0lGODlhEwATAKEBAAAAAP///////////' +
    		   'yH5BAEKAAIALAAAAAATABMAAAIwlI+pGhALRXuRuWopPnOj7hngEpRm6Z' + 
    		   'ymAbTuC7eiitJlNHr5tmN99cNdQpIhsVIAADs="';

    $("#iamhere_crosshair").css("background", "url(" + data_url + ")");

    // get eventastic

    $("#iamhere_find_this").click(function(){
            var loc = $("#iamhere_geocode_me").val();

            if (loc == ''){
                _self.display_warning("nothing to geocode!");
                return false;
            }

            _self.geocode(loc);
            return false;
    });

    $("#iamhere_find_me").click(function(){
            _self.display_location("<em>establishing current location</em>");
            _self.findMyLocation();
            return false;
    });

    $("#iamhere_crosshair").dblclick(function(e){
            var action = _self.map_obj.getDoubleClick();
            action(e);
    });

    // load the map

    this.loadModestMap();
};

info.aaronland.iamhere.Map.prototype.loadModestMap = function(){

    var _self = this;

    var provider = new com.modestmaps.CloudMadeProvider(this.args['cloudmade_apikey'], this.args['cloudmade_style']);

    // sudo, check to see there's a cookie with last location maybe?

    var canhas_point = ((this.args['latitude']) && (this.args['longitude'])) ? 1 : 0;

    var lat = (canhas_point) ? this.args['latitude'] : 0;
    var lon = (canhas_point) ? this.args['longitude'] : 0;
    var zoom = (this.args['zoom']) ? this.args['zoom'] : 2;

    // hello, little map-y fella

    this.map_obj = new com.modestmaps.Map('iamhere_viewport', provider, new com.modestmaps.Point(this.map_width, this.map_height))
    new com.modestmaps.MapControls(this.map_obj);

    this.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);

    if (canhas_point){

    	if (this.canhas_reversegeocoder){
        	setTimeout(function(){
                        _self.reverseGeocode(lat, lon);
                }, 1500);
        }
    }

    else if (this['args']['find_my_location']){

        this.display_location("<em>establishing current location</em>");

        setTimeout(function() {
                _self.findMyLocation();
        }, 1500);
    }

    else {} 

    // events

    _onChange = function (){
        $("#iamhere_warning").hide();

        var center = _self.map_obj.getCenter();

        this.lat = center.lat;
        this.lon = center.lon;
        this.woeid = null;

        _self.log("map centered on " + center.toString())
        _self.display_coordinates(center.lat, center.lon)
   	_self.reverseGeocode(center.lat, center.lon);
    };

    this.map_obj.addCallback("zoomed", _onChange);
    this.map_obj.addCallback("panned", _onChange);
    this.map_obj.addCallback("centered", _onChange);

    // sudo, make me a jump to center on single-click handler

};

info.aaronland.iamhere.Map.prototype.display_coordinates = function(lat, lon){

    if (typeof(lon) == 'undefined'){
    	$("#iamhere_coordinates").html(lat);
        return;
    }

    $("#iamhere_coordinates").html(lat + "," + lon);

};

info.aaronland.iamhere.Map.prototype.display_location = function(loc, woeid){

    if (woeid){
        loc += ' (WOE ID <a href="#" id="woe_' + woeid +'">' + woeid + '</a>)';
    }

    $("#iamhere_location").html(loc);

    if (woeid){
	var _self = this;
    	$("#woe_" + woeid).click(function(){
                _self.drawShapefile(woeid);
                return false;
        });
    }
};

info.aaronland.iamhere.Map.prototype.display_warning = function(msg){
    
    this.log('warning: ' + msg);

    $("#iamhere_warning").html(msg);
    $("#iamhere_warning").show();

    if (this.timer_warning) {
        clearTimeout(this.timer_warning);
        this.timer_warning = null;
    }

    this.timer_warning = setTimeout(function() {
            $("#iamhere_warning").hide();
    }, 1500);
}

// sudo, make me a generic "who's on first" library...

info.aaronland.iamhere.Map.prototype.findMyLocation = function(cb){

    var _self = this;

    // x_dispatch_my_dispatch

    _doThisOnSuccess = function(lat, lon, cb){

        if (cb){
            cb(lat, lon);
            return;
        }

        _self.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), 14);
    };

    _doThisIfNot = function(msg){
        _self.display_location("");
        _self.display_warning(msg);
    };

    var loc = new info.aaronland.geo.Location(this.args);
    loc.findMyLocation(_doThisOnSuccess, _doThisIfNot);
};

// put this in a proper lib with support for geonames, et. al. ?

info.aaronland.iamhere.Map.prototype.geocode = function(query){

    if (! this.canhas_geocoder){
        return;
    }

    if (this.canhas_google){
        return this.geocodeGoogle(query);
    }
    
    if (this.canhas_flickr){
        this.log("flickr");
        return this.geocodeFlickr(query);
    }


    this.log("unable to find a geocoding provider");
    return;
};

info.aaronland.iamhere.Map.prototype.geocodeGoogle = function(query){

    // http://code.google.com/apis/maps/documentation/v3/services.html#GeocodingRequests

    this.log("geocoding (google) " + query);

    this.display_coordinates("<i>geocoding</i>");
    this.display_location("");

    var _self = this;

    _geocodeComplete = function(results, status) {

        _self.log("geocoding dispatch returned");

        if (status != google.maps.GeocoderStatus.OK){
            _self.display_warning("geocoding failed with status " + status);
            _self.display_location("");
            return;
        }

        if ((! results) || (! results.length)){
            _self.display_warning("geocoding returned no results");
            _self.display_location("");
            return;
        }
        
        loc = results[0].geometry;
        lat = loc.location.lat();
        lon = loc.location.lng();
        type = loc.location_type;

        _self.log("geocoded " + query + " to " + lat + "," + lon + " (" + type + ")");

        if (type == google.maps.GeocoderLocationType.ROOFTOP){
            zoom = 17;
        }
        
        else if (type == google.maps.GeocoderLocationType.RANGE_INTERPOLATED){
            zoom = 15;
        }
        
        else if (type == google.maps.GeocoderLocationType.GEOMETRIC_CENTER){
            zoom = 13;
        }
        
        else {
            zoom = 11;
        }

        _self.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);
        _self.reverseGeocode(lat, lon);
    };

    this.googlemaps_geocoder.geocode({'address' : query}, _geocodeComplete);

    this.log("geocoding request dispatched");
    return;
};

info.aaronland.iamhere.Map.prototype.geocodeFlickr = function(query){

    if (! this.canhas_flickr){
        return;
    }

    var _self = this;

    _geocodeComplete = function(rsp){

        _self.log("geocoding dispatch returned");

        if (rsp.stat == 'fail'){
            _self.display_warning("geocoding failed: " + rsp.message);
            return;
        }

        var count = rsp.places.total;

        if (! count){
            return;
        }

        if (count > 1){
            _self.log("geocoding returned " + count + " results, using the first...");
        }

        var place = rsp.places.place[0];
        var lat = place.latitude;
        var lon = place.longitude;
        var type = place.place_type;

        if (type == 'neighbourhood'){
            zoom = 15;
        }
        
        else if (type == 'locality'){
            zoom = 13;
        }
        
        else if (type == 'county'){
            zoom = 10;
        }

        else if (type == 'country'){
            zoom = 7;
        }
        
        else {
            zoom = 3;
        }

        _self.map_obj.setCenterZoom(new com.modestmaps.Location(lat, lon), zoom);
        _self.reverseGeocode(lat, lon);
    };

    this.display_location("<em>geocoding</em>");

    var method = 'flickr.places.find';

    var args = {
        'query': query,
        'jsoncallback': '_geocodeComplete'
    };

    this.flickr.api_call(method, args);

    this.log("geocoding request dispatched");
    return;
}

info.aaronland.iamhere.Map.prototype.reverseGeocode = function(lat, lon){

    if (! this.canhas_reversegeocoder){
        return;
    }

    this.display_location("");
    var _self = this;

    if (this.timer_reversegeo) {
        clearTimeout(this.timer_reversegeo);
        this.timer_reversegeo = null;
    }

    this.timer_reversegeo = setTimeout(function() {

    	_reverseGeocodeComplete = function(rsp){

            _self.log("reverse geocoding dispatch returned");

        	if (rsp.stat == 'fail'){
            		_self.display_warning("reverse geocoding failed: " + rsp.message);
            		return;
        	}

        	if (rsp.places.total == 0){
            		return;
        	}

                var name = rsp.places.place[0].name;
                var woeid = rsp.places.place[0].woeid;

                _self.woeid = woeid;
        	_self.display_location(name, woeid)
    	};

    	_self.log("reverse geocoding " + lat + "," + lon);
	_self.display_location("<em>reverse geocoding</em>");

    	var method = 'flickr.places.findByLatLon';
        var accuracy = _self.map_obj.getZoom();

        if (accuracy > 16){
            accuracy = 16;
        }

    	var args = {
        	'lat':lat,
                'lon': lon,
                'accuracy' : accuracy,
                'jsoncallback': '_reverseGeocodeComplete'
	};

        _self.flickr.api_call(method, args);

    	_self.log("reverse geocoding request dispatched");
    }, 1500);

    return;
};

info.aaronland.iamhere.Map.prototype.drawShapefile = function(woeid){

    if (! this.flickr){
        return;
    }

    this.log("draw shapefile for woeid " + woeid);

    var _self = this;

    _drawShapefileComplete = function(rsp){

        _self.log("shapefile dispatch returned");

       	if (rsp.stat == 'fail'){
      		_self.display_warning("fetching shapefiles failed: " + rsp.message);
            	return;
        }

        if (! rsp.place.has_shapedata){
            _self.display_warning("woe id has no shapedata");            
            return;
       	}

        // clean up any existing paths_woe

        var count_paths_woe = _self.paths_woe.length;

        if (count_paths_woe){
            for (var i = 0; i < count_paths_woe; i++){
                _self.paths_woe[i].clear();
            }

            self.paths_woe = new Array();
        }

        // sudo, make me a config option

        var fillStyle = 'orange';
        var fillAlpha = 0.5;
        var strokeStyle = 'pink';

        var lines = rsp.place.shapedata.polylines.polyline;
        var count = lines.length;

        for (var i = 0; i < count; i++){

            var coords = lines[i]._content.split(" ");
            var points = []

            for (var j = 0; j < coords.length; j++){
                var pt = coords[j].split(",");
                var loc = new com.modestmaps.Location(pt[0], pt[1]);
                points.push(loc);
            }

            var path = new com.modestmaps.PolygonMarker(_self.map_obj, points, fillStyle, fillAlpha, strokeStyle);
            _self.paths_woe.push(path);
        }

        _self.log('draw shapefiles complete');
    };

    var method = 'flickr.places.getInfo';
    var args = {'woe_id':woeid, 'jsoncallback': '_drawShapefileComplete'};

    this.flickr.api_call(method, args);

    this.log("shapefile request dispatched");
    return;
};

info.aaronland.iamhere.Map.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[iamhere] ' + msg);
};

// -*-java-*-
