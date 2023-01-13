(function(){"use strict";var e={4050:function(e,t,i){var n=i(144),c=i(1096),s=i(9203),r=i(3551),o=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(c.Z,[t(s.Z,{attrs:{app:"",color:"primary",dark:""}},[t("div",{staticClass:"d-flex align-center"},[t("h1",[e._v("Tuya Server")])])]),t(r.Z,[t("LandingPage")],1)],1)},d=[],a=i(8819),l=i(1828),v=i(3058),u=i(5223),f=i(4437),h=i(6035),p=i(5057),y=i(5294),m=i(5234),g=i(1002),Z=i(2370),D=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(h.Z,{staticClass:"mx-auto px-5"},[t(g.Z,[t(Z.qW,[t("h3",[e._v("Devices")])]),t(m.Z),t(l.Z,{attrs:{color:"primary"},on:{click:e.openAddDeviceDialog}},[e._v("Add Devices")])],1),e.devices?.length>0?t(v.Z,{staticClass:"mx-auto px-5"},[t(u.ZB,[t(h.Z,e._l(e.devices,(function(i,n){return t(y.Z,{key:n,staticClass:"grey lighten-4 my-1",attrs:{cols:"12"}},[t(f.Z,{staticStyle:{"text-align":"left"},attrs:{cols:"12",xs:"12",sm:"12",md:"6",grow:""}},[t(y.Z,{staticStyle:{color:"black"}},[t(f.Z,{staticStyle:{"text-align":"center","vertical-align":"middle"},attrs:{cols:"4",xs:"2",sm:"2",shrink:""}},[t(a.Z,{staticClass:"grey ligthen-2",attrs:{size:"40px"}},[i.isConnected?t(p.Z,[e._v(" mdi-access-point ")]):t(p.Z,[e._v(" mdi-access-point-remove ")])],1)],1),t(f.Z,{attrs:{xs:"10",sm:"10",grow:""}},[t("div",{staticClass:"text-h6"},[e._v(e._s(i.deviceName)),t("br")]),t("div",{staticClass:"text-caption",domProps:{textContent:e._s(i.deviceId)}})])],1)],1),t(f.Z,{staticStyle:{"text-align":"right"},attrs:{cols:"12",xs:"12",sm:"12",md:"6"}},[t(y.Z,[t(m.Z),t(f.Z,{attrs:{cols:"auto"}},[t(l.Z,{attrs:{icon:""},on:{click:function(t){return e.connectDevice(i)}}},[t(p.Z,[e._v("mdi-link")])],1)],1),t(f.Z,{attrs:{cols:"auto"}},[t(l.Z,{attrs:{icon:""},on:{click:function(t){return e.disconnectDevice(i)}}},[t(p.Z,[e._v("mdi-link-off")])],1)],1),t(f.Z,{attrs:{cols:"auto"}},[t("SwitchWithStatus",{attrs:{device:i},on:{updateDeviceState:e.updateDeviceState}})],1),t(f.Z,{attrs:{cols:"auto"}},[t(l.Z,{attrs:{icon:""},on:{click:function(t){return e.deleteDevice(i)}}},[t(p.Z,[e._v("mdi-delete")])],1)],1)],1)],1)],1)})),1)],1)],1):e._e(),t("AddDevice",{ref:"addDeviceDialog",on:{save:e.addDevice}})],1)},_=[],x=i(4944),b=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t(x.Z,{staticClass:"mx-2",attrs:{color:e.statusColor,outlined:e.isNotUpdated}}),t(l.Z,{attrs:{disabled:!e.device.isConnected},on:{click:function(t){return e.updateDeviceState(!0)}}},[e._v(" ON ")]),t(l.Z,{attrs:{disabled:!e.device.isConnected},on:{click:function(t){return e.updateDeviceState(!1)}}},[e._v(" OFF ")])],1)},S=[],k=n.ZP.extend({name:"SwitchWithStatus",props:{device:Object},data:()=>({}),methods:{updateDeviceState(e){this.$emit("updateDeviceState",this.device,e)}},computed:{statusColor:function(){return void 0!==this.device.state&&this.device.state?"green":"grey"},isNotUpdated:function(){return"CONNECTED"!==this.device.connectionState||void 0===this.device.state}}}),T=k,C=i(1001),w=(0,C.Z)(T,b,S,!1,null,null,null),O=w.exports,$=i(5452),I=i(6904),N=i(2011),P=i(5251),E=function(){var e=this,t=e._self._c;e._self._setupProxy;return t($.Z,{attrs:{"max-width":"600px",persistent:"","no-click-animation":""},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.close.apply(null,arguments)}},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[t(v.Z,[t(u.EB,[e._v(" "+e._s(e.isUpdate?"Update Device":"Add Device")+" ")]),t(u.ZB,[t(I.Z,{ref:"form"},[t(P.Z,{ref:"deviceName",attrs:{label:"Device Name *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceName,callback:function(t){e.$set(e.device,"deviceName",t)},expression:"device.deviceName"}}),t(N.Z,{ref:"deviceType",attrs:{items:["tuya"],label:"Device Type *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceType,callback:function(t){e.$set(e.device,"deviceType",t)},expression:"device.deviceType"}}),t(P.Z,{ref:"deviceId",attrs:{label:"Device Id *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceId,callback:function(t){e.$set(e.device,"deviceId",t)},expression:"device.deviceId"}}),t(P.Z,{ref:"deviceKey",attrs:{label:"Device Key *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceKey,callback:function(t){e.$set(e.device,"deviceKey",t)},expression:"device.deviceKey"}})],1)],1),t(u.h7,[t(m.Z),t(l.Z,{attrs:{color:"primary"},nativeOn:{click:function(t){return e.save()}}},[e._v(" "+e._s(e.isUpdate?"Update":"Add")+" ")]),t(l.Z,{attrs:{color:"secondary"},nativeOn:{click:function(t){return e.close()}}},[e._v(" Close ")])],1)],1)],1)},R=[],U=n.ZP.extend({name:"AddDevice",props:{},data:()=>({showDialog:!1,isUpdate:!1,device:{deviceName:"",deviceType:"tuya",deviceId:"",deviceKey:""}}),methods:{close(){this.showDialog=!1,this.resolve(null)},open:function(e,t){return this.showDialog=!0,this.isUpdate=t,this.$nextTick((()=>{this.$refs.form.reset(),e?this.device=Object.assign({},e):(this.device.deviceId="",this.device.deviceType="tuya",this.device.deviceName="",this.device.deviceKey="")})),new Promise(((e,t)=>{this.resolve=e,this.reject=t}))},isNonEmptyString(e){return""!==e},save(){this.$refs.form.validate()&&(this.$emit("save",this.device),this.close())}}}),j=U,A=(0,C.Z)(j,E,R,!1,null,null,null),K=A.exports,L=i(8945);const B=L.Z.create({baseURL:"/api",timeout:5e3});B.interceptors.response.use((function(e){return e}),(function(e){if(!e.response||401!==e.response.status)return Promise.reject(e)}));var F={get:function(e,t,i){let n={};return void 0!==t&&(n={timeout:t}),B.get(e,n).then(i?this._handleResponseRaw:this._handleResponse).catch((e=>this._handleError(e)))},post:function(e,t,i,n,c){let s={};return(i||n||c)&&(s={headers:i?{"Content-Type":i}:void 0,onUploadProgress:c,timeout:n}),B.post(e,t,s).then(this._handleResponse).catch((e=>this._handleError(e)))},put:function(e,t,i,n){let c={};return(i||n)&&(c={headers:i?{"Content-Type":i}:void 0,timeout:n}),B.put(e,t,c).then(this._handleResponse).catch((e=>this._handleError(e)))},delete:function(e,t){return B.delete(e,t).then(this._handleResponse).catch((e=>this._handleError(e)))},_handleResponse:function(e){return e&&e.data?e.data:void 0},_handleResponseRaw:function(e){return e},_handleError:function(e){},getBaseUrl:function(){return B.defaults.baseURL?B.defaults.baseURL:""},setOnAuthRequiredListener:function(e){}},W={test:function(){return F.get("files").then((e=>e)).catch((function(){}))},getDevices:function(){return F.get("device/getAll").then((e=>e)).catch((function(){}))},changeOnState:function(e,t){return t?F.post(`device/on?deviceType=${e.deviceType}&deviceId=${e.deviceId}`):F.post(`device/off?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},connect:function(e){return F.post(`device/connect?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},disconnect:function(e){return F.post(`device/disconnect?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},delete:function(e){return F["delete"](`device/delete?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},addDevice:function(e){return F.post(`device/add?deviceName=${e.deviceName}&deviceType=${e.deviceType}&deviceId=${e.deviceId}&deviceKey=${e.deviceKey}`)}},M=n.ZP.extend({name:"LandingPage",components:{SwitchWithStatus:O,AddDevice:K},data:()=>({devices:null,selected:null,interval:null}),methods:{isConnected(e){let t=e.connectionState;return"CONNECTED"===t},updateDeviceState(e,t){W.changeOnState(e,t).then((()=>{this.refreshDevices()}))},connectDevice(e){W.connect(e).then((()=>{this.refreshDevices()}))},disconnectDevice(e){W.disconnect(e).then((()=>{this.refreshDevices()}))},deleteDevice(e){W["delete"](e).then((()=>{this.refreshDevices()}))},refreshDevices(){W.getDevices().then((e=>{this.devices=e.map((e=>({...e,isConnected:this.isConnected(e)})))}))},openAddDeviceDialog(){this.$refs.addDeviceDialog.open(null,!1).finally((()=>this.refreshDevices()))},addDevice(e){W.addDevice(e).then((()=>{this.refreshDevices()}))}},mounted:function(){this.refreshDevices()},created(){this.interval=setInterval(function(){this.refreshDevices()}.bind(this),5e3)},beforeDestroy(){clearInterval(this.interval),this.interval=null}}),q=M,z=(0,C.Z)(q,D,_,!1,null,null,null),G=z.exports,H=n.ZP.extend({name:"App",components:{LandingPage:G},data:()=>({})}),J=H,Q=(0,C.Z)(J,o,d,!1,null,null,null),V=Q.exports,X=i(2250);n.ZP.use(X.Z,{iconfont:"mdi"});const Y=new X.Z({theme:{themes:{light:{primary:"#fc5603",secondary:"#3D84F5"}}}});var ee=Y;n.ZP.config.productionTip=!1,new n.ZP({vuetify:ee,render:e=>e(V)}).$mount("#app")}},t={};function i(n){var c=t[n];if(void 0!==c)return c.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,i),s.exports}i.m=e,function(){var e=[];i.O=function(t,n,c,s){if(!n){var r=1/0;for(l=0;l<e.length;l++){n=e[l][0],c=e[l][1],s=e[l][2];for(var o=!0,d=0;d<n.length;d++)(!1&s||r>=s)&&Object.keys(i.O).every((function(e){return i.O[e](n[d])}))?n.splice(d--,1):(o=!1,s<r&&(r=s));if(o){e.splice(l--,1);var a=c();void 0!==a&&(t=a)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[n,c,s]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var c,s,r=n[0],o=n[1],d=n[2],a=0;if(r.some((function(t){return 0!==e[t]}))){for(c in o)i.o(o,c)&&(i.m[c]=o[c]);if(d)var l=d(i)}for(t&&t(n);a<r.length;a++)s=r[a],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return i.O(l)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=i.O(void 0,[998],(function(){return i(4050)}));n=i.O(n)})();
//# sourceMappingURL=app.7b550cac.js.map