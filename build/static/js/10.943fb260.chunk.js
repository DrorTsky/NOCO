(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[10],{1155:function(e,t,n){"use strict";var a=n(868),r=n(869);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=r(n(1)),c=(0,a(n(870)).default)(s.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=c},1195:function(e,t,n){"use strict";n.r(t),n.d(t,"Dashboard",(function(){return R}));var a=n(20),r=n(165),s=n(628),c=n.n(s),o=n(630),i=n(160),d=n(161),l=n(164),u=n(163),p=n(162),h=n(1),m=n(698),f=(n(751),n(669)),b=n(44),j=n(670),x=n(637),O=n(643),v=n(627),y=n(629),g=n(1193),C=n(1199),w=n(1186),A=n(1155),k=n.n(A),N=function(e){Object(u.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={},a}return Object(d.a)(n,[{key:"render",value:function(){var e,t;return this.props.to===this.props.myAddress?(e="success",t="".concat(this.props.amount," || From: ").concat(this.props.myName,", To:\n          ").concat(this.props.friendsName)):(e="danger",t="".concat(this.props.amount," || From: ").concat(this.props.friendsName,", To:\n          ").concat(this.props.myName)),Object(a.jsx)("div",{children:Object(a.jsx)(v.K,{accent:e,color:e,children:t})})}}]),n}(h.Component),T=function(e){Object(u.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={allTransactions:e.allTransactions},a}return Object(d.a)(n,[{key:"render",value:function(){for(var e=[],t=0,n=Object.entries(this.state.allTransactions);t<n.length;t++){var r=Object(f.a)(n[t],2),s=r[0],c=r[1];e.push(Object(a.jsx)(N,Object(b.a)({myName:this.props.myName,myAddress:this.props.myAddress,friendsName:this.props.friendsName},c),s))}return Object(a.jsx)("div",{children:Object(a.jsx)(v.g,{children:Object(a.jsx)(v.h,{className:"scrollable",children:Object(a.jsx)(v.J,{accent:!0,children:e})})})})}}]),n}(h.Component),D=function(e){Object(u.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleOpenTransactionLog=function(){a.setState({openTransactionLog:!0})},a.handleCloseTransactionLog=function(){a.setState({openTransactionLog:!1})},a.handleOpenAddDebt=function(){a.setState({openAddDebt:!0})},a.handleCloseAddDebt=function(){a.setState({openAddDebt:!1})},a.getNameFromAddress=Object(o.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.props.debtor===a.props.playerOne?a.props.creditor:a.props.debtor,a.setState({friendsAddress:t}),n=new x.a.eth.Contract(O.a,t),e.t0=a,e.next=6,n.methods.getName().call();case 6:e.t1=e.sent,e.t2={friendsName:e.t1},e.t0.setState.call(e.t0,e.t2);case 9:case"end":return e.stop()}}),e)}))),a.state={allTransactions:e.allTransactions,myName:e.myName,typeOfCard:e.typeOfCard,creditor:e.creditor,debtor:e.debtor,debt:e.debt,openTransactionLog:!1,openAddDebt:!1,friendsName:"",friendsAddress:""},a.handleOpenTransactionLog=a.handleOpenTransactionLog.bind(Object(l.a)(a)),a.handleCloseTransactionLog=a.handleCloseTransactionLog.bind(Object(l.a)(a)),a.handleOpenAddDebt=a.handleOpenAddDebt.bind(Object(l.a)(a)),a.handleCloseAddDebt=a.handleCloseAddDebt.bind(Object(l.a)(a)),a.getNameFromAddress=a.getNameFromAddress.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.getNameFromAddress()}},{key:"render",value:function(){var e=this.state.myName===this.state.creditor?this.props.myName:this.state.friendsName,t="",n="";return"danger"===this.state.typeOfCard?(n="text-center red_text",t=Object(a.jsxs)(v.k,{children:[Object(a.jsx)("b",{children:"you owe"})," ",e]})):(n="text-center green_text",t=Object(a.jsxs)(v.k,{children:[e,Object(a.jsx)("br",{})," ",Object(a.jsx)("b",{children:"owes you"})]})),Object(a.jsx)("div",{children:Object(a.jsxs)(v.g,{className:n,children:[t,Object(a.jsxs)(v.h,{children:[Object(a.jsx)("blockquote",{className:"card-bodyquote",children:Object(a.jsx)("h1",{children:this.state.debt})}),Object(a.jsxs)("footer",{className:"footer_contract_list_element",children:[Object(a.jsxs)(v.e,{size:"sm",color:"dark",className:"buttons_inside_contract_list",onClick:this.handleOpenTransactionLog,children:[Object(a.jsx)(y.a,{name:"cil-scrubber"})," Transactions"]}),Object(a.jsxs)(g.a,{open:this.state.openTransactionLog,onClose:this.handleCloseTransactionLog,"aria-labelledby":"form-dialog-title",children:[Object(a.jsxs)(C.a,{id:"form-dialog-title",className:"align_center",children:["All transactions",Object(a.jsx)("div",{className:"card-header-actions",children:Object(a.jsx)(v.I,{className:"card-header-action",onClick:this.handleCloseTransactionLog,children:Object(a.jsx)(y.a,{name:"cil-x-circle"})})})]}),Object(a.jsx)(w.a,{children:Object(a.jsx)(T,{myName:this.state.myName,myAddress:this.props.address,allTransactions:this.state.allTransactions,friendsName:this.state.friendsName})})]}),Object(a.jsxs)(v.e,{size:"sm",color:"secondary",className:"buttons_inside_contract_list",onClick:this.handleOpenAddDebt,children:[Object(a.jsx)(k.a,{fontSize:"small"}),"Add Debt"]}),Object(a.jsxs)(g.a,{open:this.state.openAddDebt,onClose:this.handleCloseAddDebt,"aria-labelledby":"form-dialog-title",children:[Object(a.jsx)(C.a,{id:"form-dialog-title",children:"Sum you gave"}),Object(a.jsx)(w.a,{children:Object(a.jsx)(m.a,Object(b.a)(Object(b.a)({},this.props),{},{friendAddress:this.state.friendsAddress,handleClose:this.handleCloseAddDebt}))})]})]})]})]})})}}]),n}(h.Component),F=function(e){Object(u.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onCheckMyContracts=Object(o.a)(c.a.mark((function e(){var t,n,s,o,i,d,l,u,p,h,m;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,a.props.profile.methods.getContracts().call();case 3:if(e.t1=e.sent,e.t2={contractsList:e.t1},e.t0.setState.call(e.t0,e.t2),!((t=a.state.contractsList.length)>0)){e.next=23;break}n=0;case 9:if(!(n<t)){e.next=23;break}return e.t3=a,e.t4=[],e.t5=Object(j.a)(a.state.allContracts),e.next=15,a.props.profile.methods.getContractsByIndex(n).call();case 15:e.t6=e.sent,e.t7=[e.t6],e.t8=e.t4.concat.call(e.t4,e.t5,e.t7),e.t9={allContracts:e.t8},e.t3.setState.call(e.t3,e.t9);case 20:n++,e.next=9;break;case 23:s=0,e.t10=c.a.keys(a.state.contractsList);case 25:if((e.t11=e.t10()).done){e.next=48;break}return s=e.t11.value,e.next=29,new x.a.eth.Contract(JSON.parse(a.props.compiledBinaryContract.interface),a.state.contractsList[s]);case 29:return o=e.sent,e.next=32,o.methods.getCurrentCreditorAddress().call();case 32:return i=e.sent,e.next=35,o.methods.getCurrentDebtorAddress().call();case 35:return d=e.sent,e.next=38,o.methods.getCurrentDebtAmount().call();case 38:return l=e.sent,e.next=41,o.methods.getAllTransations().call();case 41:u=e.sent,p=i===a.props.playerOne?"danger":"success",h={allTransactions:u,typeOfCard:p,creditor:i,debtor:d,debt:l},m=Object(b.a)(Object(b.a)({},a.state.listInformation),{},Object(r.a)({},s,h)),a.setState({listInformation:m}),e.next=25;break;case 48:case"end":return e.stop()}}),e)}))),a.state={contractsList:[],allContracts:[],listInformation:{}},a.onCheckMyContracts=a.onCheckMyContracts.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof(t=window.ethereum)){e.next=4;break}return e.next=4,t.enable();case 4:this.onCheckMyContracts();case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){for(var e=[],t=0,n=Object.entries(this.state.listInformation);t<n.length;t++){var r=Object(f.a)(n[t],2),s=r[0],c=r[1];e.push(Object(a.jsx)(D,Object(b.a)(Object(b.a)({myAddress:this.props.playerOne},this.props),c),s))}var o=this.state.contractsList.length;return Object(a.jsx)("div",{children:0===o?Object(a.jsx)("h1",{children:"no active contracts"}):e})}}]),n}(h.Component),R=(n(700),function(e){Object(u.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).addFriendFormSubmit=function(){var e=Object(o.a)(c.a.mark((function e(t){var n,r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(e){var t=new x.a.BatchRequest;e.map((function(e){return new Promise((function(a,r){var s=e.request({from:n[0],gas:"1000000"},(function(e,t){e?r(e):a(t)}));t.add(s)}))})),t.execute()},t.preventDefault(),e.next=4,x.a.eth.getAccounts();case 4:n=e.sent,r=new x.a.eth.Contract(O.a,a.state.friendsAddress),s([a.state.profile.methods.addFriendRequest(a.state.friendsAddress,a.state.name).send,r.methods.addFriendRequestNotRestricted(a.state.address,a.state.name).send]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.onCheckMyFriends=Object(o.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,a.state.profile.methods.getFriends().call();case 3:e.t1=e.sent,e.t2={friendsList:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}}),e)}))),a.onRemoveFriendsList=Object(o.a)(c.a.mark((function e(){var t,n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=function(e){var n=new x.a.BatchRequest;console.log("in remove friends make batch "+t[0]),e.map((function(e){return new Promise((function(a,r){var s=e.request({from:t[0],gas:"1000000"},(function(e,t){e?r(e):a(t)}));n.add(s)}))})),n.execute()},e.next=3,x.a.eth.getAccounts();case 3:t=e.sent,n=new x.a.eth.Contract(O.a,a.state.friendsAddress),r([a.state.profile.methods.removeAllFriends().send,n.methods.removeAllFriends().send]);case 6:case"end":return e.stop()}}),e)}))),a.onSubmitAddDebtRequest=function(){var e=Object(o.a)(c.a.mark((function e(t){var n,r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(e){var t=new x.a.BatchRequest;e.map((function(e){return new Promise((function(a,r){var s=e.request({from:n[0],gas:"1000000"},(function(e,t){e?r(e):a(t)}));t.add(s)}))})),t.execute()},t.preventDefault(),e.next=4,x.a.eth.getAccounts();case 4:n=e.sent,r=new x.a.eth.Contract(O.a,a.state.playerTwo),s([a.state.profile.methods.addDebtRequest(a.state.playerTwo,a.state.playerOne,a.state.providedAmount,a.state.playerTwo).send,r.methods.addDebtRequestNotRestricted(a.state.playerOne,a.state.playerOne,a.state.providedAmount,a.state.playerTwo).send]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.onSubmitConfirmDebtRequest=function(){var e=Object(o.a)(c.a.mark((function e(t){var n,r,s,o,i,d,l,u,p,h,m,f,b,j,v;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v=function(e){var t=new x.a.BatchRequest;e.map((function(e){return new Promise((function(a,r){var s=e.request({from:n[0],gas:"2000000"},(function(e,t){e?r(e):a(t)}));t.add(s)}))})),t.execute()},t.preventDefault(),e.next=4,x.a.eth.getAccounts();case 4:return n=e.sent,e.next=7,a.state.profile.methods.getAllExchanges().call();case 7:return r=e.sent,s=r[0],a.setState({playerTwo:s.transaction.from}),a.setState({playerOne:s.transaction.to}),a.setState({providedAmount:s.transaction.amount}),e.next=14,a.state.profile.methods.getContracts().call();case 14:o=e.sent,l=!1,u=0;case 17:if(!(u<o.length)){e.next=33;break}return e.next=20,new x.a.eth.Contract(JSON.parse(a.state.compiledBinaryContract.interface),i=o[u]);case 20:return p=e.sent,e.next=23,p.methods.getCurrentDebt().call();case 23:if(h=e.sent,!(m=[a.state.playerOne,a.state.playerTwo]).includes(String(h.debtor))||!m.includes(String(h.creditor))){e.next=30;break}return e.next=28,p.methods.addTransaction(a.state.playerOne,a.state.providedAmount,a.state.playerTwo).send({from:n[0],gas:"2000000"});case 28:return l=!0,e.abrupt("break",33);case 30:u++,e.next=17;break;case 33:if(l){e.next=40;break}return e.next=36,a.state.profile.methods.createBinaryContract(a.state.playerOne,a.state.providedAmount,a.state.playerTwo).send({from:n[0],gas:"4000000"});case 36:return console.log("Binary contract was created successfully!"),e.next=39,a.state.profile.methods.getLastContract().call();case 39:d=e.sent;case 40:return f=l?i:d,e.next=43,new x.a.eth.Contract(JSON.parse(a.state.compiledBinaryContract.interface),f);case 43:if(e.sent,b=new x.a.eth.Contract(O.a,a.state.playerTwo),!l){e.next=51;break}return e.next=48,a.state.profile.methods.getZeroAddress().call();case 48:e.t0=e.sent,e.next=52;break;case 51:e.t0=d;case 52:j=e.t0,v([a.state.profile.methods.confirmDebtRequest(0).send,b.methods.confirmDebtRequestNotRestricted(0,j).send]);case 54:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.onCheckMyExchanges=Object(o.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.state.profile.methods.getAllExchanges().call();case 2:if(e.t0=e.sent[0],e.t1=void 0,e.t0===e.t1){e.next=18;break}return{},e.t3=Promise,e.next=9,a.state.profile.methods.getAllExchanges().call();case 9:return e.t4=e.sent[0].transaction,e.t2=e.t3.resolve.call(e.t3,e.t4),e.t5=a,e.next=14,a.state.profile.methods.getAllExchanges().call();case 14:e.t6=e.sent[0].transaction,e.t7={exchanges:e.t6},e.t8=e.t5.setState.call(e.t5,e.t7),e.t2.then.call(e.t2,e.t8);case 18:return e.next=20,a.state.profile.methods.getAllExchanges().call();case 20:if(e.t9=e.sent[0],e.t10=void 0,e.t9===e.t10){e.next=35;break}return{},e.t12=Promise,e.next=27,a.state.profile.methods.getAllExchanges().call();case 27:return e.t13=e.sent[0].transaction,e.t11=e.t12.resolve.call(e.t12,e.t13),e.t14=console,e.next=32,a.state.profile.methods.getAllExchanges().call();case 32:e.t15=e.sent,e.t16=e.t14.log.call(e.t14,e.t15),e.t11.then.call(e.t11,e.t16);case 35:case"end":return e.stop()}}),e)}))),a.onCheckMyContracts=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,a.state.profile.methods.getContracts().call();case 3:e.t1=e.sent,e.t2={contractsList:e.t1},e.t0.setState.call(e.t0,e.t2),t=0,e.t3=c.a.keys(a.state.contractsList);case 8:if((e.t4=e.t3()).done){e.next=15;break}return t=e.t4.value,e.next=12,new x.a.eth.Contract(JSON.parse(a.state.compiledBinaryContract.interface),a.state.contractsList[t]);case 12:e.sent,e.next=8;break;case 15:case"end":return e.stop()}}),e)}))),a.onRemoveExchangesList=function(){var e=Object(o.a)(c.a.mark((function e(t){var n,r,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=function(e){var t=new x.a.BatchRequest;e.map((function(e){return new Promise((function(a,r){var s=e.request({from:n[0],gas:"2000000"},(function(e,t){e?r(e):a(t)}));t.add(s)}))})),t.execute()},t.preventDefault(),e.next=4,x.a.eth.getAccounts();case 4:n=e.sent,r=new x.a.eth.Contract(O.a,a.state.playerTwo),s([a.state.profile.methods.removeAllExchanges().send,r.methods.removeAllExchanges().send]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.onRemoveContractsList=function(){var e=Object(o.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,x.a.eth.getAccounts();case 3:n=e.sent,r=new x.a.eth.Contract(O.a,a.state.playerTwo),a.state.profile.methods.removeContracts().send({from:n[0],gas:"2000000"}),r.methods.removeContracts().send({from:n[0],gas:"2000000"});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={friendsAddress:a.props.playerTwo,friendRequestIndex:"",playerOne:a.props.playerOne,profile:a.props.profile,address:a.props.address,compiledBinaryContract:a.props.compiledBinaryContract,name:a.props.name,providedAmount:"",playerTwo:a.props.playerTwo,friendsList:[],exchanges:{},contractsList:[],contractAndProps:{}},a.onChangeFormInput=a.onChangeFormInput.bind(Object(l.a)(a)),a.addFriendFormSubmit=a.addFriendFormSubmit.bind(Object(l.a)(a)),a.onSubmitConfirmFriendRequest=a.onSubmitConfirmFriendRequest.bind(Object(l.a)(a)),a.onCheckMyFriends=a.onCheckMyFriends.bind(Object(l.a)(a)),a.onRemoveFriendsList=a.onRemoveFriendsList.bind(Object(l.a)(a)),a.updateRemovedFriends=a.updateRemovedFriends.bind(Object(l.a)(a)),a.onSubmitAddDebtRequest=a.onSubmitAddDebtRequest.bind(Object(l.a)(a)),a.onSubmitConfirmDebtRequest=a.onSubmitConfirmDebtRequest.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof(t=window.ethereum)){e.next=4;break}return e.next=4,t.enable();case 4:this.onCheckMyContracts(),this.onCheckMyFriends(),console.log(this);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onSubmitConfirmFriendRequest",value:function(){var e=Object(o.a)(c.a.mark((function e(t){var n,a,r,s,o,i,d;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d=function(e){var t=new x.a.BatchRequest;e.map((function(e){return new Promise((function(a,r){var s=e.request({from:n[0],gas:"1000000"},(function(e,t){e?r(e):a(t)}));t.add(s)}))})),t.execute()},t.preventDefault(),e.next=4,x.a.eth.getAccounts();case 4:return n=e.sent,a=new x.a.eth.Contract(O.a,this.state.friendsAddress),e.next=8,a.methods.getAllExchanges().call();case 8:for(r=e.sent,o=0;o<r.length;o++)"0"===(i=r[o]).exchangePurpose&&i.exchangeDetails.source===this.state.friendsAddress&&(s=o);d([this.state.profile.methods.confirmFriendRequest(0,this.state.name).send,a.methods.confirmFriendRequestNotRestricted(s).send]);case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateRemovedFriends",value:function(){var e=Object(o.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("in remove friends"),e.t0=Promise.resolve(this.onRemoveFriendsList()),e.t1=this,e.next=5,this.state.profile.methods.getFriends().call();case 5:e.t2=e.sent,e.t3={friendsList:e.t2},e.t4=e.t1.setState.call(e.t1,e.t3),e.t0.then.call(e.t0,e.t4);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onChangeFormInput",value:function(e){e.preventDefault();var t=e.target,n=t.name,a=t.value;this.setState(Object(r.a)({},n,a))}},{key:"render",value:function(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(v.M,{children:Object(a.jsx)(v.l,{xs:"12",md:"8",xl:"8",children:Object(a.jsx)(F,{playerOne:this.state.address,address:this.state.address,playerTwo:this.state.playerTwo,profile:this.state.profile,compiledBinaryContract:this.props.compiledBinaryContract,myName:this.props.name})})})})}}]),n}(h.Component));t.default=R}}]);
//# sourceMappingURL=10.943fb260.chunk.js.map