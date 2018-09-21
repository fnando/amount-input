var amountInput=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){var r=n(6),o=n(7),a=n(8);t.exports=function(t,e){return r(t)||o(t,e)||a()}},function(t,e,n){var r=n(0);t.exports=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){"use strict";n.r(e),n.d(e,"AmountInput",function(){return d}),n.d(e,"format",function(){return y}),n.d(e,"amountInput",function(){return A});var r=n(1),o=n.n(r),a=n(2),i=n.n(a),u=n(3),c=n.n(u),l=n(4),s=n.n(l),f=n(0),p=n.n(f),d=function(){function t(e){var n=this,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};c()(this,t),p()(this,"update",function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{runAcceptAmountCallback:!0,runRejectAmountCallback:!0},r=n.input,o=n.options,a=e.runAcceptAmountCallback,i=e.runRejectAmountCallback,u=o.willAcceptAmount,c=o.onAcceptAmount,l=o.onRejectAmount;u(t)?(n.amount=t,r.value=y(t,o),a&&c(r,t)):i&&l(r,t)}),p()(this,"handleDelete",function(t){var e=t.target,r=t.inputType,o=n.amount,a=n.options;if("deleteContentBackward"===r){var i=g(o,a),u=m(i=(i=i.substr(0,i.length-1)).padStart(3,"0"),a);n.update(u),w(e)}}),p()(this,"handlePaste",function(t){var e=n.options;t.preventDefault();var r=t.clipboardData,o=t.target,a=h(v(r.getData("Text")),e);isNaN(a)||(n.update(a),w(o))}),p()(this,"handleKeyPress",function(t){var e=n.amount,r=n.options,o=t.which,a=t.keyCode,i=t.target,u=g(e,r),c=String.fromCharCode(a||o);if(t.preventDefault(),navigator.userAgent.match(/firefox/i)&&8===o)n.handleDelete({target:i,inputType:"deleteContentBackward"});else if(c.match(/^[0-9]$/)){var l=m(u+c,r);n.update(l),w(i)}else w(i)}),p()(this,"handleEventWithCursorMove",function(t){w(t.target)}),p()(this,"handleKeyDown",function(t){var e=t.key,n=t.ctrlKey;t.metaKey||(e.startsWith("Arrow")&&event.preventDefault(),n&&navigator.platform.startsWith("Mac")&&event.preventDefault())}),p()(this,"handleDblClick",function(t){var e=t.target,n=e.value.length;e.setSelectionRange(0,n)});var o=t.options;this.amount=0,this.input=e,this.options=i()({},o,r)}return s()(t,[{key:"init",value:function(){var t=this.input,e=this.options,n=h(v(t.value),e);isNaN(n)&&(n=0),t.value=y(n,e),this.amount=n,this.update(n),t.addEventListener("input",this.handleDelete),t.addEventListener("paste",this.handlePaste),t.addEventListener("focus",this.handleEventWithCursorMove),t.addEventListener("click",this.handleEventWithCursorMove),t.addEventListener("dblclick",this.handleDblClick),t.addEventListener("keydown",this.handleKeyDown),t.addEventListener("keypress",this.handleKeyPress)}}]),t}();function v(t){var e=(t=t.replace(/[^\d.,]+/g,"")).match(/^([\d,]+)(?:\.(\d+))?$/)||t.match(/^([\d.]+)(?:,(\d+))?$/),n=o()(e,3),r=n[1],a=n[2];if(r=r.replace(/[^\d]+/g,""),a=(a||"0").replace(/[^\d]+/g,""),r)return parseFloat("".concat(r,".").concat(a))}function h(t,e){return parseFloat(t.toFixed(e.precision))}function y(t,e){var n=d.options,r=b(g(t,e=i()({},n,e)),e),a=o()(r,2),u=a[0],c=a[1];return"".concat(function(t,e){for(var n=u.split(""),r=[];n.length;){var o=n.splice(-3,3);r.unshift(o.join(""))}return r.join(e.delimiter)}(0,e)).concat(e.separator).concat(c)}function b(t,e){var n=t.substr(-e.precision),r=t.substr(0,t.length-e.precision);return[r=r.replace(/^0+/g,"").padStart(1,"0"),n=n.padEnd(e.precision,"0")]}function m(t,e){var n=b(t,e),r=o()(n,2),a=r[0],i=r[1];return parseFloat("".concat(a,".").concat(i))}function g(t,e){var n=e.precision,r=t.toFixed(n).split("."),a=o()(r,2),i=a[0],u=a[1];return u=(u||"0").padEnd(n,"0"),i=(i||"0").padStart(1,"0"),"".concat(i).concat(u)}function w(t){var e=t.value.length;t.setSelectionRange(e,e)}function A(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=new d(t,e);return n.init(),n.update}p()(d,"options",{precision:2,separator:".",delimiter:",",willAcceptAmount:function(){return!0},onAcceptAmount:function(){return!0},onRejectAmount:function(){return!0}}),e.default=A},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}}]);
//# sourceMappingURL=amount-input.js.map