(this.webpackJsonpinstagram=this.webpackJsonpinstagram||[]).push([[11],{569:function(e,t,c){"use strict";c.d(t,"a",(function(){return r}));var s=c(3),n=c(27);function r(e){var t=e.username;return Object(s.jsx)("div",{className:"flex border-b border-gray-primary h-4 p-4 py-8",children:Object(s.jsx)("div",{className:"flex items-center",children:Object(s.jsx)(n.b,{to:"/p/".concat(t),className:"flex items-center",children:Object(s.jsx)("p",{className:"font-bold",children:t})})})})}},610:function(e,t,c){},664:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return v}));var s=c(19),n=c(3),r=c(1),a=c.n(r),i=(c(191),c(607),c(537));c(12),c(29),c(182);c(569);c(91),c(60);c(663),c(27),c(61);var o=c(89),u=c(275),d=c(538);c(610),c(541),c(550),c(549),c(544);var j=c(548),l=c(543),b=c(529),f=c(34),h=c(59),O=c(166),m=(c(539),c(520),c(666),c(657),c(655),c(656),c(654),c(9));c(533),c(72),c(530);c(535);function v(e){var t=e.user,c=Object(o.a)(t.uid),v=c.user,x=c.setActiveUser;Object(r.useEffect)((function(){document.title="Firelucent"}),[]);var p=a.a.useState(!1),N=Object(s.a)(p,2),g=N[0],k=N[1],w=a.a.useState(!0),y=Object(s.a)(w,2),E=(y[0],y[1],Object(h.b)()),S=(E.signout,E.currentUser,Object(O.b)((function(e){return e})).posts.posts,a.a.useState()),U=Object(s.a)(S,2),C=U[0],A=U[1];return Object(r.useEffect)((function(){m.c.collection("Marks").orderBy("timestamp","desc").onSnapshot((function(e){A(e.docs.map((function(e){return{id:e.id,post:e.data()}})))}))}),[C]),Object(r.useEffect)((function(){m.c.collection("restaurants").doc("123").collection("reviews").get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data())}))}))}),[]),Object(n.jsx)(i.a.Provider,{value:{user:v,setActiveUser:x},children:Object(n.jsx)(u.a,{children:Object(n.jsxs)("section",{className:"feed",children:[g&&Object(n.jsx)("div",{onClick:function(){return k(!1)},className:"drawerBarPanel"}),Object(n.jsx)(l.a,{active:g}),Object(n.jsxs)("div",{className:"feed-header",children:[Object(n.jsx)("div",{onClick:function(){return k(!0)},children:Object(n.jsx)(b.a,{src:null===v||void 0===v?void 0:v.photoUrl})}),Object(n.jsx)("div",{className:"feed-headerText",children:Object(n.jsx)("span",{children:"Home"})}),Object(n.jsx)("div",{className:"homeColumn",children:Object(n.jsx)(f.r,{className:"homeIcon",width:22,height:22})})]}),Object(n.jsx)(j.a,{}),Object(n.jsx)(d.a,{})]})})})}}}]);
//# sourceMappingURL=11.af039957.chunk.js.map