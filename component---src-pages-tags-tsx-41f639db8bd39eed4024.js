(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{xSjX:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",(function(){return i}));n("KKXr"),n("rE2o"),n("ioFf"),n("rGqo"),n("a1Th"),n("Btvt"),n("Vd3H");var a=n("q1tI"),l=n("VXBa"),r=n("H8eV"),u=(n("JYtQ"),n("uP4m")),i="1929229117";t.default=function(e){var t=e.data.allMarkdownRemark.group,n=Object(a.useState)(0),i=n[0],o=n[1],f=Object(a.useState)("undefined"),c=f[0],d=f[1];t.sort((function(e,t){var n=e.fieldValue.toLocaleLowerCase(),a=t.fieldValue.toLocaleLowerCase();return n<a?-1:a<n?1:0}));var s=t.map((function(e){var t;return a.createElement("li",{key:e.fieldValue},a.createElement("span",{className:"tag-text",style:{fontSize:"undefined"!==e.fieldValue?(t=Math.round(50/(i/e.totalCount)).toString(),t.length<=1&&(t="0"+t),"1."+t+"rem"):"1rem",opacity:e.fieldValue===c?"0.9":"0.5",fontWeight:e.fieldValue===c?"bold":"normal"},onClick:function(){d(e.fieldValue)}},a.createElement("a",{href:"#"+e.fieldValue},e.fieldValue," / ",e.totalCount)))}));s.sort((function(e){return"undefined"===e.key?-1:0}));return Object(a.useEffect)((function(){var e=0,n=t,a=Array.isArray(n),l=0;for(n=a?n:n[Symbol.iterator]();;){var r;if(a){if(l>=n.length)break;r=n[l++]}else{if((l=n.next()).done)break;r=l.value}var u=r;"undefined"!==u.fieldValue&&u.totalCount>e&&(e=u.totalCount)}return o(e),function(){}}),[t]),Object(a.useEffect)((function(){return location.hash&&d(location.hash.split("#")[1]),function(){}}),[]),a.createElement(l.a,null,a.createElement(r.a,{title:"Tags"}),a.createElement("div",{id:"tags"},a.createElement("div",{className:"tag-list-wrap"},a.createElement("ul",null,s)),a.createElement(u.a,{posts:t.filter((function(e){return e.fieldValue===c})).length?t.filter((function(e){return e.fieldValue===c}))[0].edges:t.filter((function(e){return"undefined"===e.fieldValue})).length?t.filter((function(e){return"undefined"===e.fieldValue}))[0].edges:[]})))}}}]);
//# sourceMappingURL=component---src-pages-tags-tsx-41f639db8bd39eed4024.js.map