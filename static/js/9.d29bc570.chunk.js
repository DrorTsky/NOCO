(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[9],{628:function(e,t,n){e.exports=n(383)},630:function(e,t,n){"use strict";function r(e,t,n,r,c,i,s){try{var a=e[i](s),o=a.value}catch(u){return void n(u)}a.done?t(o):Promise.resolve(o).then(r,c)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(c,i){var s=e.apply(t,n);function a(e){r(s,c,i,a,o,"next",e)}function o(e){r(s,c,i,a,o,"throw",e)}a(void 0)}))}}n.d(t,"a",(function(){return c}))},866:function(e,t,n){"use strict";n.r(t),n.d(t,"Login",(function(){return d}));var r=n(20),c=n(165),i=n(628),s=n.n(i),a=n(630),o=n(160),u=n(161),l=n(164),h=n(163),j=n(162),m=n(1),p=n(627),b=n(629),d=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).onFormSubmit=Object(a.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.props.isLoggedInCheck(r.state.phoneNumber);case 2:case"end":return e.stop()}}),e)}))),r.state={username:"",phoneNumber:""},r.onChangeFormInput=r.onChangeFormInput.bind(Object(l.a)(r)),r.onFormSubmit=r.onFormSubmit.bind(Object(l.a)(r)),r}return Object(u.a)(n,[{key:"onChangeFormInput",value:function(e){e.preventDefault();var t=e.target,n=t.name,r=t.value;this.setState(Object(c.a)({},n,r))}},{key:"render",value:function(){return Object(r.jsx)("div",{className:"c-app c-default-layout flex-row align-items-center",children:Object(r.jsx)(p.m,{children:Object(r.jsx)(p.M,{className:"justify-content-center",children:Object(r.jsx)(p.l,{md:"8",children:Object(r.jsx)(p.j,{children:Object(r.jsx)(p.g,{className:"p-4",children:Object(r.jsx)(p.h,{children:Object(r.jsxs)(p.u,{children:[Object(r.jsx)("h1",{children:"Login"}),Object(r.jsx)("p",{className:"text-muted",children:"Sign In to your account"}),Object(r.jsxs)(p.E,{className:"mb-4",children:[Object(r.jsx)(p.G,{children:Object(r.jsx)(p.H,{children:Object(r.jsx)(b.a,{name:"cil-phone"})})}),Object(r.jsx)(p.D,{id:"phoneNumber",name:"phoneNumber",type:"text",placeholder:"Phone number",autoComplete:"off",onChange:this.onChangeFormInput,required:!0})]}),Object(r.jsxs)(p.M,{children:[Object(r.jsx)(p.l,{xs:"6",children:Object(r.jsx)(p.e,{color:"primary",className:"px-4",onClick:this.onFormSubmit,children:"Login"})}),Object(r.jsx)(p.l,{xs:"6",className:"text-right",children:Object(r.jsx)(p.e,{color:"link",className:"px-0",to:{pathname:"./register",registerProps:{writeUserData:this.props.writeUserData,compiledBinaryContract:this.props.compiledBinaryContract}},children:"Not registered?"})})]}),Object(r.jsx)(p.M,{children:Object(r.jsx)("h6",{children:this.props.NotRegisteredMessage})})]})})})})})})})})}}]),n}(m.Component);t.default=d}}]);
//# sourceMappingURL=9.d29bc570.chunk.js.map