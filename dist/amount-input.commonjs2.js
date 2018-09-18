module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){var r=n(4),o=n(5),a=n(6);t.exports=function(t,e){return r(t)||o(t,e)||a()}},function(t,e,n){var r=n(3);t.exports=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}},function(t,e,n){"use strict";n.r(e),n.d(e,"format",function(){return d}),n.d(e,"amountInput",function(){return m});var r=n(1),o=n.n(r),a=n(0),u=n.n(a),i={precision:2,separator:".",delimiter:",",willAcceptAmount:function(){return!0},onAcceptAmount:function(){return!0},onRejectAmount:function(){return!0}};function c(t){b(t.target)}function l(t){t.target;var e=t.key,n=t.ctrlKey;t.metaKey||(e.startsWith("Arrow")&&t.preventDefault(),n&&navigator.platform.startsWith("Mac")&&t.preventDefault())}function f(t){var e=t.target,n=e.value.length;e.setSelectionRange(0,n)}function p(t,e){var n=(t=t.replace(/[^\d.,]+/g,"")).match(/^([\d,]+)(?:\.(\d+))?$/)||t.match(/^([\d.]+)(?:,(\d+))?$/),r=u()(n,3),o=(r[0],r[1]),a=r[2];if(o=o.replace(/[^\d]+/g,""),a=(a||"0").replace(/[^\d]+/g,""),o)return parseFloat("".concat(o,".").concat(a))}function s(t,e){return parseFloat(t.toFixed(e.precision))}function d(t,e){var n=v(g(t,e=e||o()({},i)),e),r=u()(n,2),a=r[0],c=r[1];return"".concat(function(t,e){for(var n=t.split(""),r=[];n.length;){var o=n.splice(-3,3);r.unshift(o.join(""))}return r.join(e.delimiter)}(a,e)).concat(e.separator).concat(c)}function v(t,e){var n=t.substr(-e.precision),r=t.substr(0,t.length-e.precision);return[r=r.replace(/^0+/g,"").padStart(1,"0"),n=n.padEnd(e.precision,"0")]}function y(t,e){var n=v(t,e),r=u()(n,2),o=r[0],a=r[1];return parseFloat("".concat(o,".").concat(a))}function g(t,e){var n=e.separator,r=e.precision,o=t.toString().split(n),a=u()(o,2),i=a[0],c=a[1];return c=(c||"0").padEnd(r,"0"),i=(i||"0").padStart(1,"0"),"".concat(i).concat(c)}function b(t){var e=t.value.length;t.setSelectionRange(e,e)}function m(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e=o()({},i,e),r=n.willAcceptAmount,a=n.onRejectAmount,u=n.onAcceptAmount,v=s(p(t.value),e);isNaN(v)&&(v=0),t.value=d(v,e),r(v)?u(t,v):a(t,v),t.addEventListener("input",function(t){var n=t.target;if("deleteContentBackward"===t.inputType){var o=g(v,e);o=(o=o.substr(0,o.length-1)).padStart(3,"0");var a=v,i=y(o,e);r(i)&&(v=i,n.value=d(v,e),u(n,i,a))}}),t.addEventListener("keypress",function(n){var o=n.keyCode,i=n.target,c=g(v,e),l=String.fromCharCode(o);if(event.preventDefault(),!l.match(/^[0-9]$/))return b(i),!1;var f=v,p=y(c+l,e);r(p)?(v=p,i.value=d(v,e),u(t,v,f)):a(i,p,v),b(i)}),t.addEventListener("paste",function(n){n.preventDefault();var o=n.clipboardData,i=n.target,c=o.getData("Text"),l=v,f=s(p(c),e);isNaN(f)||(r(f)?(v=f,i.value=d(v,e),u(t,v,l)):a(i,f,l),b(i))}),t.addEventListener("focus",c),t.addEventListener("click",c),t.addEventListener("dblclick",f),t.addEventListener("keydown",l)}e.default=m},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=t[Symbol.iterator]();!(r=(u=i.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}}]);
//# sourceMappingURL=amount-input.commonjs2.js.map