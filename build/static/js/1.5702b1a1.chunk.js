(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[1],{1156:function(e,t){function n(t){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},1157:function(e,t,n){"use strict";var r=n(868),a=n(869);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(1)),s=(0,r(n(870)).default)(o.createElement(o.Fragment,null,o.createElement("path",{d:"M12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z",opacity:".3"}),o.createElement("path",{d:"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"})),"Brightness1TwoTone");t.default=s},1158:function(e,t,n){"use strict";n.r(t),n.d(t,"capitalize",(function(){return r.a})),n.d(t,"createChainedFunction",(function(){return a.a})),n.d(t,"createSvgIcon",(function(){return h})),n.d(t,"debounce",(function(){return x})),n.d(t,"deprecatedPropType",(function(){return f})),n.d(t,"isMuiElement",(function(){return m})),n.d(t,"ownerDocument",(function(){return b.a})),n.d(t,"ownerWindow",(function(){return g.a})),n.d(t,"requirePropFactory",(function(){return j})),n.d(t,"setRef",(function(){return v.a})),n.d(t,"unsupportedProp",(function(){return O})),n.d(t,"useControlled",(function(){return R})),n.d(t,"useEventCallback",(function(){return y.a})),n.d(t,"useForkRef",(function(){return k.a})),n.d(t,"unstable_useId",(function(){return w})),n.d(t,"useIsFocusVisible",(function(){return F}));var r=n(683),a=n(743),o=n(12),s=n(1),c=n.n(s),i=n(633),d=(n(59),n(654)),u=n(655),l=s.forwardRef((function(e,t){var n=e.children,a=e.classes,c=e.className,u=e.color,l=void 0===u?"inherit":u,p=e.component,h=void 0===p?"svg":p,x=e.fontSize,f=void 0===x?"default":x,m=e.htmlColor,b=e.titleAccess,g=e.viewBox,j=void 0===g?"0 0 24 24":g,v=Object(i.a)(e,["children","classes","className","color","component","fontSize","htmlColor","titleAccess","viewBox"]);return s.createElement(h,Object(o.a)({className:Object(d.a)(a.root,c,"inherit"!==l&&a["color".concat(Object(r.a)(l))],"default"!==f&&a["fontSize".concat(Object(r.a)(f))]),focusable:"false",viewBox:j,color:m,"aria-hidden":!b||void 0,role:b?"img":void 0,ref:t},v),n,b?s.createElement("title",null,b):null)}));l.muiName="SvgIcon";var p=Object(u.a)((function(e){return{root:{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:"currentColor",flexShrink:0,fontSize:e.typography.pxToRem(24),transition:e.transitions.create("fill",{duration:e.transitions.duration.shorter})},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorAction:{color:e.palette.action.active},colorError:{color:e.palette.error.main},colorDisabled:{color:e.palette.action.disabled},fontSizeInherit:{fontSize:"inherit"},fontSizeSmall:{fontSize:e.typography.pxToRem(20)},fontSizeLarge:{fontSize:e.typography.pxToRem(35)}}}),{name:"MuiSvgIcon"})(l);function h(e,t){var n=function(t,n){return c.a.createElement(p,Object(o.a)({ref:n},t),e)};return n.muiName=p.muiName,c.a.memo(c.a.forwardRef(n))}function x(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function r(){for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];var s=this,c=function(){e.apply(s,a)};clearTimeout(t),t=setTimeout(c,n)}return r.clear=function(){clearTimeout(t)},r}function f(e,t){return function(){return null}}function m(e,t){return s.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}var b=n(668),g=n(741);function j(e){return function(){return null}}var v=n(699);function O(e,t,n,r,a){return null}function R(e){var t=e.controlled,n=e.default,r=(e.name,e.state,s.useRef(void 0!==t).current),a=s.useState(n),o=a[0],c=a[1];return[r?t:o,s.useCallback((function(e){r||c(e)}),[])]}var y=n(742),k=n(667);function w(e){var t=s.useState(e),n=t[0],r=t[1],a=e||n;return s.useEffect((function(){null==n&&r("mui-".concat(Math.round(1e5*Math.random())))}),[n]),a}var E=n(86),N=!0,C=!1,S=null,A={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function q(e){e.metaKey||e.altKey||e.ctrlKey||(N=!0)}function D(){N=!1}function _(){"hidden"===this.visibilityState&&C&&(N=!0)}function I(e){var t=e.target;try{return t.matches(":focus-visible")}catch(n){}return N||function(e){var t=e.type,n=e.tagName;return!("INPUT"!==n||!A[t]||e.readOnly)||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}(t)}function P(){C=!0,window.clearTimeout(S),S=window.setTimeout((function(){C=!1}),100)}function F(){return{isFocusVisible:I,onBlurVisible:P,ref:s.useCallback((function(e){var t,n=E.findDOMNode(e);null!=n&&((t=n.ownerDocument).addEventListener("keydown",q,!0),t.addEventListener("mousedown",D,!0),t.addEventListener("pointerdown",D,!0),t.addEventListener("touchstart",D,!0),t.addEventListener("visibilitychange",_,!0))}),[])}}},700:function(e,t,n){"use strict";n.r(t),n.d(t,"Exchanges",(function(){return C}));var r=n(20),a=n(628),o=n.n(a),s=n(670),c=n(630),i=n(160),d=n(161),u=n(164),l=n(163),p=n(162),h=n(1),x=n(44),f=n(381),m=n(627),b=n(637),g=n(643),j=function(e){Object(l.a)(n,e);var t=Object(p.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).findParticipantsExchangeIndex=function(){var e=Object(c.a)(o.a.mark((function e(t){var n,a,s,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new b.a.eth.Contract(g.a,t),e.next=3,n.methods.getAllExchanges().call();case 3:a=e.sent,s=0;case 5:if(!(s<a.length)){e.next=14;break}return e.next=8,n.methods.getAllExchangesByIndex(s).call();case 8:if(c=e.sent,r.props.exchange.transaction.from!==c.transaction.from||r.props.exchange.transaction.to!==c.transaction.to||r.props.exchange.transaction.amount!==c.transaction.amount){e.next=11;break}return e.abrupt("return",s);case 11:s++,e.next=5;break;case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.confirmDebtRequest=function(){var e=Object(c.a)(o.a.mark((function e(t){var n,a,s,c,i,d,u,l,p,h,x,f,m,j,v;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("in confirm"),e.next=4,b.a.eth.getAccounts();case 4:return n=e.sent,e.next=7,r.props.profile.methods.getContracts().call();case 7:a=e.sent,console.log("my contracts broken:"),console.log(a),c=!1,i=0;case 12:if(!(i<a.length)){e.next=43;break}return e.next=15,r.props.profile.methods.getContractsByIndex(i).call();case 15:return d=e.sent,console.log(d),e.next=19,new b.a.eth.Contract(JSON.parse(r.props.compiledBinaryContract.interface),d);case 19:return u=e.sent,console.log(u),e.next=23,u.methods.getCurrentDebt().call();case 23:return l=e.sent,e.next=26,u.methods.getCurrentCreditorAddress().call();case 26:return p=e.sent,console.log(p),console.log(l),e.next=31,r.getNameFromAddress(l.creditor);case 31:if(h=e.sent,x=[r.props.destination,r.props.source],console.log("debtor: ".concat(l.debtor,",creditor: ").concat(l.creditor," ").concat(h)),!x.includes(String(l.debtor))||!x.includes(String(l.creditor))){e.next=40;break}return e.next=37,u.methods.addTransaction(r.props.destination,r.props.amount,r.props.source).send({from:n[0],gas:"2000000"});case 37:return c=!0,console.log("contract exists"),e.abrupt("break",43);case 40:i++,e.next=12;break;case 43:if(c){e.next=51;break}return console.log("creating contract"),e.next=47,r.props.profile.methods.createBinaryContract(r.props.destination,r.props.amount,r.props.source).send({from:n[0],gas:"4000000"});case 47:return console.log("Binary contract was created successfully!"),e.next=50,r.props.profile.methods.getLastContract().call();case 50:s=e.sent;case 51:return f=r.props.exchange.transaction.from===r.props.playerOne?r.props.exchange.transaction.to:r.props.exchange.transaction.from,m=new b.a.eth.Contract(g.a,f),e.next=55,r.findParticipantsExchangeIndex(f);case 55:if(j=e.sent,console.log("friendsAddress: ".concat(f,",friendsExchangeIndex: ").concat(j," ")),!c){e.next=63;break}return e.next=60,r.props.profile.methods.getZeroAddress().call();case 60:e.t0=e.sent,e.next=64;break;case 63:e.t0=s;case 64:return v=e.t0,e.next=67,r.props.profile.methods.confirmDebtRequest(r.props.index).send({from:n[0],gas:"2000000"});case 67:return e.next=69,m.methods.confirmDebtRequestNotRestricted(j,v).send({from:n[0],gas:"2000000"});case 69:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.getNameFromAddress=Object(c.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.props.exchange.transaction.from===r.props.playerOne?r.props.exchange.transaction.to:r.props.exchange.transaction.from,n=new b.a.eth.Contract(g.a,t),e.t0=r,e.next=5,n.methods.getName().call();case 5:e.t1=e.sent,e.t2={friendsName:e.t1},e.t0.setState.call(e.t0,e.t2);case 8:case"end":return e.stop()}}),e)}))),r.declineDebtRequest=function(){var e=Object(c.a)(o.a.mark((function e(t){var n,a,s,c,i,d,u,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,b.a.eth.getAccounts();case 3:return n=e.sent,a=r.props.exchange.transaction.from===r.props.playerOne?r.props.exchange.transaction.to:r.props.exchange.transaction.from,s=new b.a.eth.Contract(g.a,a),c=-1,e.next=9,s.methods.getAllExchanges().call();case 9:if(i=e.sent,!((d=i.length)>0)){e.next=26;break}u=0;case 13:if(!(u<d)){e.next=21;break}return e.next=16,s.methods.getAllExchangesByIndex(u).call();case 16:(l=e.sent).exchangePurpose===r.props.exchange.exchangePurpose&&l.transaction.from===r.props.exchange.transaction.from&&l.transaction.to===r.props.exchange.transaction.to&&(c=u);case 18:u++,e.next=13;break;case 21:return console.log("friend: ".concat(c,", mine: ").concat(r.props.index)),e.next=24,s.methods.removeExchange(c).send({from:n[0],gas:"2000000"});case 24:return e.next=26,r.props.profile.methods.removeExchange(r.props.index).send({from:n[0],gas:"2000000"});case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.state={friendsName:""},r.confirmDebtRequest=r.confirmDebtRequest.bind(Object(u.a)(r)),r.declineDebtRequest=r.declineDebtRequest.bind(Object(u.a)(r)),r.findParticipantsExchangeIndex=r.findParticipantsExchangeIndex.bind(Object(u.a)(r)),r.getNameFromAddress=r.getNameFromAddress.bind(Object(u.a)(r)),r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.getNameFromAddress()}},{key:"render",value:function(){console.log(this);var e="",t="",n=[];return this.props.playerOne===this.props.source?(t="pending...",e="you sent "+this.state.friendsName+" "+this.props.amount,n.push(Object(r.jsx)("div",{children:Object(r.jsx)(m.e,{size:"sm",color:"dark",className:"buttons_inside_contract_list",onClick:this.declineDebtRequest,children:"cancel request"})}))):(t="from: "+this.state.friendsName,e=this.state.friendsName+" payed you: "+this.props.amount,n.push(Object(r.jsxs)("div",{children:[Object(r.jsx)(m.e,{size:"sm",color:"secondary",className:"buttons_inside_contract_list",onClick:this.confirmDebtRequest,children:"accept"}),Object(r.jsx)(m.e,{size:"sm",color:"dark",className:"buttons_inside_contract_list",onClick:this.declineDebtRequest,children:"refuse"})]}))),Object(r.jsx)("div",{children:Object(r.jsxs)(m.g,{color:"info",className:"text-white text-center",children:[Object(r.jsx)(m.k,{children:t}),Object(r.jsxs)(m.h,{children:[Object(r.jsxs)("blockquote",{className:"card-bodyquote",children:[Object(r.jsxs)("h3",{children:[e," ",Object(r.jsx)("br",{})]}),this.props.creationDate]}),Object(r.jsx)("footer",{className:"footer_contract_list_element",children:n})]})]})})}}]),n}(h.Component),v=function(e){Object(l.a)(n,e);var t=Object(p.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).declineFriendRequest=function(){var e=Object(c.a)(o.a.mark((function e(t){var n,a,s,c,i,d,u,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,b.a.eth.getAccounts();case 3:return n=e.sent,a=r.props.exchange.exchangeDetails.source===r.props.playerOne?r.props.exchange.exchangeDetails.destination:r.props.exchange.exchangeDetails.source,s=new b.a.eth.Contract(g.a,a),c=-1,e.next=9,s.methods.getAllExchanges().call();case 9:if(i=e.sent,!((d=i.length)>0)){e.next=25;break}u=0;case 13:if(!(u<d)){e.next=21;break}return e.next=16,s.methods.getAllExchangesByIndex(u).call();case 16:(l=e.sent).exchangePurpose===r.props.exchange.exchangePurpose&&l.transaction.date===r.props.exchange.transaction.date&&(c=u,console.log(l));case 18:u++,e.next=13;break;case 21:return e.next=23,s.methods.removeExchange(c).send({from:n[0],gas:"2000000"});case 23:return e.next=25,r.props.profile.methods.removeExchange(r.props.index).send({from:n[0],gas:"2000000"});case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.state={},r.confirmFriendRequest=r.confirmFriendRequest.bind(Object(u.a)(r)),r.declineFriendRequest=r.declineFriendRequest.bind(Object(u.a)(r)),r}return Object(d.a)(n,[{key:"confirmFriendRequest",value:function(){var e=Object(c.a)(o.a.mark((function e(t){var n,r,a,s,c,i,d,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,b.a.eth.getAccounts();case 3:return n=e.sent,r=this.props.playerOne===this.props.source?this.props.destination:this.props.source,a=new b.a.eth.Contract(g.a,r),e.next=8,a.methods.getAllExchanges().call();case 8:s=e.sent,c=-1,i=s.length,d=0;case 12:if(!(d<i)){e.next=20;break}return e.next=15,a.methods.getAllExchangesByIndex(d).call();case 15:"0"===(u=e.sent).exchangePurpose&&u.exchangeDetails.source===r&&(c=d);case 17:d++,e.next=12;break;case 20:return e.next=22,this.props.profile.methods.confirmFriendRequest(this.props.index,this.props.sourceName).send({from:n[0],gas:"1000000"});case 22:return e.next=24,a.methods.confirmFriendRequestNotRestricted(c).send({from:n[0],gas:"1000000"});case 24:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e="",t="",n=[];return this.props.playerOne===this.props.source?(t="pending...",e="waiting for "+this.props.destinationName+" to accept",n.push(Object(r.jsx)("div",{children:Object(r.jsx)(m.e,{size:"sm",color:"dark",className:"buttons_inside_contract_list",onClick:this.declineFriendRequest,children:"cancel request"})}))):(t="from: "+this.props.destinationName,e=this.props.destinationName+" sent you a friend request",n.push(Object(r.jsxs)("div",{children:[Object(r.jsx)(m.e,{size:"sm",color:"secondary",className:"buttons_inside_contract_list",onClick:this.confirmFriendRequest,children:"accept"}),Object(r.jsx)(m.e,{size:"sm",color:"dark",className:"buttons_inside_contract_list",onClick:this.declineFriendRequest,children:"refuse"})]}))),Object(r.jsx)("div",{children:Object(r.jsxs)(m.g,{color:"info",className:"text-white text-center",children:[Object(r.jsx)(m.k,{children:t}),Object(r.jsxs)(m.h,{children:[Object(r.jsxs)("blockquote",{className:"card-bodyquote",children:[Object(r.jsx)("h3",{children:e}),this.props.creationDate]}),Object(r.jsx)("footer",{className:"footer_contract_list_element",children:n})]})]})})}}]),n}(h.Component),O=n(1157),R=n.n(O),y="1",k="2",w="3",E=function(e){Object(l.a)(n,e);var t=Object(p.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).setNames=Object(c.a)(o.a.mark((function e(){var t,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new b.a.eth.Contract(g.a,r.props.exchange.debtRotation.mediator),n=new b.a.eth.Contract(g.a,r.props.exchange.debtRotation.creditor),a=new b.a.eth.Contract(g.a,r.props.exchange.debtRotation.debtor),e.t0=r,e.next=6,t.methods.getName().call();case 6:return e.t1=e.sent,e.next=9,n.methods.getName().call();case 9:return e.t2=e.sent,e.next=12,a.methods.getName().call();case 12:e.t3=e.sent,e.t4={mediatorName:e.t1,creditorName:e.t2,debtorName:e.t3},e.t0.setState.call(e.t0,e.t4);case 15:case"end":return e.stop()}}),e)}))),r.checkIfContractExists=function(){var e=Object(c.a)(o.a.mark((function e(t,n,a){var s,c,i,d,u,l,p;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("debtors address: ".concat(n,", creditors address: ").concat(a)),console.log(t),e.next=4,t.methods.getContracts().call();case 4:s=e.sent,c=0;case 6:if(!(c<s.length)){e.next=25;break}return e.next=9,t.methods.getContractsByIndex(c).call();case 9:return i=e.sent,e.next=12,new b.a.eth.Contract(JSON.parse(r.props.compiledBinaryContract.interface),i);case 12:return d=e.sent,e.next=15,d.methods.getCurrentCreditorAddress().call();case 15:return u=e.sent,e.next=18,d.methods.getCurrentDebtorAddress().call();case 18:if(l=e.sent,!(p=[n,a]).includes(u)||!p.includes(l)){e.next=22;break}return e.abrupt("return",d);case 22:c++,e.next=6;break;case 25:return e.abrupt("return",void 0);case 26:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),r.mediatorsFinalAccept=Object(c.a)(o.a.mark((function e(){var t,n,a,s,c,i,d,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.eth.getAccounts();case 2:return t=e.sent,n=new b.a.eth.Contract(g.a,r.props.exchange.debtRotation.debtor),a=new b.a.eth.Contract(g.a,r.props.exchange.debtRotation.creditor),e.next=7,r.findParticipantsExchangeIndex(r.props.exchange.debtRotation.debtor);case 7:return s=e.sent,e.next=10,r.findParticipantsExchangeIndex(r.props.exchange.debtRotation.creditor);case 10:return c=e.sent,console.log("creditors index: ".concat(c," debtors index: ").concat(s)),e.next=14,r.checkIfContractExists(a,r.props.exchange.debtRotation.debtor,r.props.exchange.debtRotation.creditor);case 14:if(i=e.sent,console.log(i),void 0!==i){e.next=26;break}return e.next=19,a.methods.createBinaryContract(r.props.exchange.debtRotation.debtor,r.props.exchange.debtRotation.amount,r.props.exchange.debtRotation.creditor).send({from:t[0],gas:"4000000"});case 19:return e.next=21,r.checkIfContractExists(a,r.props.exchange.debtRotation.debtor,r.props.exchange.debtRotation.creditor);case 21:i=e.sent,console.log("contract created"),console.log(i),e.next=30;break;case 26:return console.log("contract already exists: ".concat(i)),e.next=29,i.methods.addTransaction(r.props.exchange.debtRotation.debtor,r.props.exchange.debtRotation.amount,r.props.exchange.debtRotation.creditor).send({from:t[0],gas:"2000000"});case 29:console.log("transaction added");case 30:return e.next=32,r.checkIfContractExists(n,r.props.exchange.debtRotation.mediator,r.props.exchange.debtRotation.debtor);case 32:return d=e.sent,console.log("mediator - debtor contract: ".concat(d)),e.next=36,d.methods.addTransaction(r.props.exchange.debtRotation.mediator,r.props.exchange.debtRotation.amount,r.props.exchange.debtRotation.debtor).send({from:t[0],gas:"2000000"});case 36:return console.log("mediator - debtor contract: transferred"),e.next=39,r.checkIfContractExists(r.props.profile,r.props.exchange.debtRotation.creditor,r.props.exchange.debtRotation.mediator);case 39:return u=e.sent,console.log("mediator - creditor contract: ".concat(u)),e.next=43,u.methods.addTransaction(r.props.exchange.debtRotation.creditor,r.props.exchange.debtRotation.amount,r.props.exchange.debtRotation.mediator).send({from:t[0],gas:"2000000"});case 43:return console.log("mediator - creditor contract: transferred"),e.next=46,r.props.profile.methods.confirmDebtRotationRequest(r.props.index).send({from:t[0],gas:"2000000"});case 46:return e.next=48,n.methods.confirmDebtRotationRequestNotRestricted(s,i._address).send({from:t[0],gas:"2000000"});case 48:return e.next=50,a.methods.confirmDebtRotationRequestNotRestricted(c,i._address).send({from:t[0],gas:"2000000"});case 50:case"end":return e.stop()}}),e)}))),r.findParticipantsExchangeIndex=function(){var e=Object(c.a)(o.a.mark((function e(t){var n,a,s,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new b.a.eth.Contract(g.a,t),e.next=3,n.methods.getAllExchanges().call();case 3:a=e.sent,s=0;case 5:if(!(s<a.length)){e.next=14;break}return e.next=8,n.methods.getAllExchangesByIndex(s).call();case 8:if(c=e.sent,r.props.exchange.debtRotation.debtor!==c.debtRotation.debtor||r.props.exchange.debtRotation.creditor!==c.debtRotation.creditor||r.props.exchange.debtRotation.mediator!==c.debtRotation.mediator||r.props.exchange.debtRotation.amount!==c.debtRotation.amount){e.next=11;break}return e.abrupt("return",s);case 11:s++,e.next=5;break;case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.sendRotationRequestSingle=function(){var e=Object(c.a)(o.a.mark((function e(t,n,a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.methods.addDebtRotationRequestNotRestricted(r.props.exchange.debtRotation.mediator,r.props.exchange.debtRotation.creditor,r.props.exchange.debtRotation.debtor,r.props.exchange.debtRotation.amount,r.state.statusToSend,n).send({from:a[0],gas:"3000000"});case 2:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),r.confirmRotationRequest=Object(c.a)(o.a.mark((function e(){var t,n,a,s,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.eth.getAccounts();case 2:return t=e.sent,n=new b.a.eth.Contract(g.a,r.props.exchange.debtRotation.mediator),a=new b.a.eth.Contract(g.a,r.state.addressToGetIndexFrom),e.next=7,r.findParticipantsExchangeIndex(r.props.exchange.debtRotation.mediator);case 7:return s=e.sent,e.next=10,r.findParticipantsExchangeIndex(r.state.addressToGetIndexFrom);case 10:return c=e.sent,e.next=13,r.sendRotationRequestSingle(r.props.profile,r.props.index,t);case 13:return e.next=15,r.sendRotationRequestSingle(n,s,t);case 15:return e.next=17,r.sendRotationRequestSingle(a,c,t);case 17:case"end":return e.stop()}}),e)}))),r.declineRotationRequest=function(){var e=Object(c.a)(o.a.mark((function e(t){var n,a,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("in decline"),e.next=4,b.a.eth.getAccounts();case 4:n=e.sent,a=[r.props.exchange.debtRotation.creditor,r.props.exchange.debtRotation.debtor,r.props.exchange.debtRotation.mediator],console.log(a),s=[],a.map(function(){var e=Object(c.a)(o.a.mark((function e(t){var a,c,i,d,u,l,p;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p=function(e){var t=new b.a.BatchRequest;e.map((function(e){return new Promise((function(r,a){var o=e.request({from:n[0],gas:"3000000"},(function(e,t){e?a(e):r(t)}));t.add(o)}))})),t.execute()},console.log(t),t===r.props.playerOne){e.next=21;break}return a=new b.a.eth.Contract(g.a,t),c=-1,e.next=7,a.methods.getAllExchanges().call();case 7:if(i=e.sent,!((d=i.length)>0)){e.next=19;break}u=0;case 11:if(!(u<d)){e.next=19;break}return e.next=14,a.methods.getAllExchangesByIndex(u).call();case 14:(l=e.sent).exchangePurpose===r.props.exchange.exchangePurpose&&l.transaction.date===r.props.exchange.transaction.date&&(c=u);case 16:u++,e.next=11;break;case 19:return e.next=21,a.methods.removeExchange(c).send({from:n[0],gas:"3000000"});case 21:return e.next=23,r.props.profile.methods.removeExchange(r.props.index).send({from:n[0],gas:"3000000"});case 23:p(s);case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.state={isMediator:!1,isDebtor:!1,isCreditor:!1,statusToSend:"0",addressToGetIndexFrom:"",mediatorName:"",creditorName:"",debtorName:""},r.findParticipantsExchangeIndex=r.findParticipantsExchangeIndex.bind(Object(u.a)(r)),r.confirmRotationRequest=r.confirmRotationRequest.bind(Object(u.a)(r)),r.sendRotationRequestSingle=r.sendRotationRequestSingle.bind(Object(u.a)(r)),r.mediatorsFinalAccept=r.mediatorsFinalAccept.bind(Object(u.a)(r)),r.checkIfContractExists=r.checkIfContractExists.bind(Object(u.a)(r)),r.declineRotationRequest=r.declineRotationRequest.bind(Object(u.a)(r)),r.setNames=r.setNames.bind(Object(u.a)(r)),r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(c.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.props.playerOne===this.props.exchange.debtRotation.mediator?this.setState({isMediator:!0}):this.props.playerOne===this.props.exchange.debtRotation.creditor?this.setState({isCreditor:!0,statusToSend:y,addressToGetIndexFrom:this.props.exchange.debtRotation.debtor}):this.setState({isDebtor:!0,statusToSend:k,addressToGetIndexFrom:this.props.exchange.debtRotation.creditor}),e.next=3,this.setNames();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){console.log(this);for(var e=this.state.isMediator?"You requested a rotation with:":"".concat(this.state.mediatorName," requested a rotation"),t=[],n="2"===this.props.exchange.debtRotation.status?"1":this.props.exchange.debtRotation.status,a=0;a<=2;a++)a<=parseInt(n)?t.push(Object(r.jsx)(m.l,{xs:"4",children:Object(r.jsx)(R.a,{fontSize:"large",style:{color:"green"}},a)},a)):t.push(Object(r.jsx)(m.l,{xs:"4",children:Object(r.jsx)(R.a,{fontSize:"large",color:"action"},a)},a));var o=[];return this.state.isMediator&&this.props.exchange.debtRotation.status===w&&o.push(Object(r.jsx)(m.e,{size:"sm",color:"secondary",className:"buttons_inside_contract_list",onClick:this.mediatorsFinalAccept,children:"confirm"},"confirm")),this.props.exchange.debtRotation.status!==w&&(this.state.isDebtor&&this.props.exchange.debtRotation.status!==k||this.state.isCreditor&&this.props.exchange.debtRotation.status!==y)&&o.push(Object(r.jsxs)("div",{children:[Object(r.jsx)(m.e,{size:"sm",color:"secondary",className:"buttons_inside_contract_list",onClick:this.confirmRotationRequest,children:"confirm"},"confirm"),Object(r.jsx)(m.e,{size:"sm",color:"dark",className:"buttons_inside_contract_list",onClick:this.declineRotationRequest,children:"refuse"},"refuse")]})),Object(r.jsx)("div",{children:Object(r.jsxs)(m.g,{color:"info",className:"text-white text-center",children:[Object(r.jsx)(m.k,{children:e}),Object(r.jsxs)(m.h,{children:[Object(r.jsxs)("blockquote",{className:"card-bodyquote",children:[Object(r.jsxs)("h6",{children:[this.state.creditorName," and ",this.state.debtorName]}),Object(r.jsx)("br",{}),Object(r.jsxs)("h3",{children:["for: ",this.props.exchange.debtRotation.amount]}),this.props.creationDate]}),Object(r.jsx)(m.g,{style:{marginBottom:"10px",height:"50px"},children:Object(r.jsx)(m.h,{style:{padding:"8px"},children:Object(r.jsx)(m.M,{children:t})})}),Object(r.jsx)("footer",{className:"footer_contract_list_element",children:o})]})]})})}}]),n}(h.Component),N=function(e){Object(l.a)(n,e);var t=Object(p.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).state={},r}return Object(d.a)(n,[{key:"render",value:function(){var e=[],t=this.props,n=(t.amount,Object(f.a)(t,["amount"]));return"1"===this.props.exchangePurpose?e.push(Object(r.jsx)(j,Object(x.a)({},this.props),this.props.creationDate)):"0"===this.props.exchangePurpose?e.push(Object(r.jsx)(v,Object(x.a)({},n),this.props.creationDate)):"2"===this.props.exchangePurpose&&e.push(Object(r.jsx)(E,Object(x.a)({},this.props),this.props.creationDate)),Object(r.jsx)("div",{children:e})}}]),n}(h.Component),C=function(e){Object(l.a)(n,e);var t=Object(p.a)(n);function n(e){var r;return Object(i.a)(this,n),(r=t.call(this,e)).setStateAndAmountOfExchanges=Object(c.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,r.state.profile.methods.getAllExchanges().call();case 3:if(e.t1=e.sent,e.t2={exchanges:e.t1},e.t0.setState.call(e.t0,e.t2),!((t=r.state.exchanges.length)>0)){e.next=23;break}n=0;case 9:if(!(n<t)){e.next=23;break}return e.t3=r,e.t4=[],e.t5=Object(s.a)(r.state.allExchanges),e.next=15,r.props.profile.methods.getAllExchangesByIndex(n).call();case 15:e.t6=e.sent,e.t7=[e.t6],e.t8=e.t4.concat.call(e.t4,e.t5,e.t7),e.t9={allExchanges:e.t8},e.t3.setState.call(e.t3,e.t9);case 20:n++,e.next=9;break;case 23:case"end":return e.stop()}}),e)}))),r.state={exchanges:[],allExchanges:[],profile:r.props.profile},r.setStateAndAmountOfExchanges=r.setStateAndAmountOfExchanges.bind(Object(u.a)(r)),r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(c.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.state.profile.methods.getAllExchanges().call();case 2:if(e.t0=e.sent[0],e.t1=void 0,e.t0===e.t1){e.next=11;break}return{},e.t2=Promise,e.next=9,this.state.profile.methods.getAllExchanges().call();case 9:e.t3=e.sent[0].transaction,e.t2.resolve.call(e.t2,e.t3).then(this.setStateAndAmountOfExchanges());case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){for(var e=[],t=0,n=Object.entries(this.state.allExchanges);t<n.length;t++){var a=n[t];try{this.props.type===a[1].exchangePurpose&&e.push(Object(r.jsx)(N,{exchangePurpose:a[1].exchangePurpose,source:a[1].exchangeDetails.source,destination:a[1].exchangeDetails.destination,sourceName:a[1].exchangeDetails.sourceName,destinationName:a[1].exchangeDetails.destinationName,creationDate:a[1].exchangeDetails.creationDate,amount:a[1].transaction.amount,exchange:a[1],profile:this.props.profile,compiledBinaryContract:this.props.compiledBinaryContract,playerOne:this.props.playerOne,index:a[0],setStateAndAmountOfExchanges:this.props.setStateAndAmountOfExchanges},a[1].exchangeDetails.exchangeId))}catch(s){console.log("failed to load exchangeDetails")}}var o=e.length;return Object(r.jsx)("div",{children:0===o?Object(r.jsx)("h3",{children:"no exchanges yet"}):e})}}]),n}(h.Component);t.default=C},868:function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},869:function(e,t,n){var r=n(1156);function a(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}e.exports=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var c=o?Object.getOwnPropertyDescriptor(e,s):null;c&&(c.get||c.set)?Object.defineProperty(n,s,c):n[s]=e[s]}return n.default=e,t&&t.set(e,n),n}},870:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(1158)}}]);
//# sourceMappingURL=1.5702b1a1.chunk.js.map