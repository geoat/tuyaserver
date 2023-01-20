(function(){"use strict";var e={3238:function(e,t,s){var i=s(144),n=s(1096),a=s(9203),c=s(1828),r=s(5057),d=s(3551),o=s(5234),l=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(n.Z,[t(a.Z,{attrs:{app:"",color:"primary",dark:""}},[t("div",{staticClass:"d-flex align-center"},[t("h1",[e._v("Tuya Server")])]),t(o.Z),t("div",[t(c.Z,{attrs:{icon:""},on:{click:function(t){return e.quit()}}},[t(r.Z,[e._v("mdi-power")])],1)],1)],1),t(d.Z,[t("LandingPage")],1)],1)},u=[],v=s(6035),h=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(v.Z,{staticClass:"mx-auto px-5"},[t("div",{staticClass:"text-right"},[e._v("Last update time: "+e._s(e.lastUpdateTime))]),t("br"),t("DevicesListComponent",{attrs:{devices:e.devices},on:{refreshDevices:e.refreshDevices}}),t("br"),t("TasksListComponent",{attrs:{tasks:e.tasks,devices:e.devices},on:{refreshTasks:e.refreshTasks}})],1)},p=[],f=s(8945);const m=f.Z.create({baseURL:"/api",timeout:5e3});m.interceptors.response.use((function(e){return e}),(function(e){if(!e.response||401!==e.response.status)return Promise.reject(e)}));var y={get:function(e,t,s){let i={};return void 0!==t&&(i={timeout:t}),m.get(e,i).then(s?this._handleResponseRaw:this._handleResponse).catch((e=>this._handleError(e)))},post:function(e,t,s,i,n){let a={};return(s||i||n)&&(a={headers:s?{"Content-Type":s}:void 0,onUploadProgress:n,timeout:i}),m.post(e,t,a).then(this._handleResponse).catch((e=>this._handleError(e)))},put:function(e,t,s,i){let n={};return(s||i)&&(n={headers:s?{"Content-Type":s}:void 0,timeout:i}),m.put(e,t,n).then(this._handleResponse).catch((e=>this._handleError(e)))},delete:function(e,t){return m.delete(e,t).then(this._handleResponse).catch((e=>this._handleError(e)))},_handleResponse:function(e){return e&&e.data?e.data:void 0},_handleResponseRaw:function(e){return e},_handleError:function(e){},getBaseUrl:function(){return m.defaults.baseURL?m.defaults.baseURL:""},setOnAuthRequiredListener:function(e){}},k={test:function(){return y.get("files").then((e=>e)).catch((function(){}))},getDevices:function(){return y.get("device/getAll").then((e=>e)).catch((function(){}))},changeOnState:function(e,t){return t?y.post(`device/on?deviceType=${e.deviceType}&deviceId=${e.deviceId}`):y.post(`device/off?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},connect:function(e){return y.post(`device/connect?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},disconnect:function(e){return y.post(`device/disconnect?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},delete:function(e){return y["delete"](`device/delete?deviceType=${e.deviceType}&deviceId=${e.deviceId}`)},addDevice:function(e){return y.post(`device/add?deviceName=${e.deviceName}&deviceType=${e.deviceType}&deviceId=${e.deviceId}&deviceKey=${e.deviceKey}`)},quit:function(){return y.post("quit")}},Z=(s(7658),s(6318));class _{constructor(){(0,Z.Z)(this,"deviceType",""),(0,Z.Z)(this,"deviceId",""),(0,Z.Z)(this,"state",!0)}}class g{constructor(){(0,Z.Z)(this,"tasks",[])}}class D extends g{constructor(...e){super(...e),(0,Z.Z)(this,"days",[]),(0,Z.Z)(this,"time","00:00")}}var x={addScheduledTask:function(e){const t=new D;t.time=e.time,t.days=e.days;const s=new _;return s.deviceType=e.device.deviceType,s.deviceId=e.device.deviceId,s.state=e.state,t.tasks.push(s),y.post("schedule/addTask",t).then((e=>e)).catch((function(){}))},getAllScheduledTasks:function(){return y.get("schedule/getAll").then((e=>e)).catch((function(){}))},deleteScheduledTask:function(e,t){const s={days:e,time:t};return y.post("schedule/delete",s).then((e=>e)).catch((function(){}))}},T=s(8819),S=s(3385),C=s(5223),b=s(4437),w=s(5294),$=s(1002),E=s(2370),N=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t($.Z,[t(E.qW,[t("h3",[e._v("Devices")])]),t(o.Z),t(c.Z,{attrs:{color:"primary"},on:{click:e.openAddDeviceDialog}},[e._v("Add Device")])],1),e.devices?.length>0?t(S.Z,{staticClass:"mx-auto px-5"},[t(C.ZB,[t(v.Z,e._l(e.devices,(function(s,i){return t(w.Z,{key:i,staticClass:"grey lighten-4 my-2",attrs:{cols:"12"}},[t(b.Z,{staticClass:"text-left",attrs:{cols:"12",xs:"12",sm:"12",md:"6",grow:""}},[t(w.Z,{staticStyle:{color:"black"}},[t(b.Z,{staticClass:"text-center",attrs:{cols:"3",xs:"3",sm:"2",shrink:""}},[t(T.Z,{staticClass:"grey ligthen-2",attrs:{size:"40px"}},[s.isConnected?t(r.Z,[e._v(" mdi-access-point ")]):t(r.Z,[e._v(" mdi-access-point-remove ")])],1)],1),t(b.Z,{attrs:{xs:"9",sm:"10",grow:""}},[t("div",{staticClass:"text-h6"},[e._v(e._s(s.deviceName)),t("br")]),t("div",{staticClass:"text-caption",domProps:{textContent:e._s(s.deviceId)}})])],1)],1),t(b.Z,{staticClass:"text-right",attrs:{cols:"12",xs:"12",sm:"12",md:"6"}},[t(w.Z,[t(o.Z),t(b.Z,{attrs:{cols:"auto"}},[t(c.Z,{attrs:{icon:""},on:{click:function(t){return e.connectDevice(s)}}},[t(r.Z,[e._v("mdi-link")])],1),t(c.Z,{attrs:{icon:""},on:{click:function(t){return e.disconnectDevice(s)}}},[t(r.Z,[e._v("mdi-link-off")])],1)],1),t(b.Z,{attrs:{cols:"auto",xs:"12"}},[t("SwitchWithStatus",{attrs:{device:s},on:{updateDeviceState:e.updateDeviceState}})],1),t(b.Z,{attrs:{cols:"auto",xs:"12"}},[t(c.Z,{attrs:{icon:""},on:{click:function(t){return e.deleteDevice(s)}}},[t(r.Z,[e._v("mdi-delete")])],1)],1)],1)],1)],1)})),1)],1)],1):e._e(),t("AddDevice",{ref:"addDeviceDialog",on:{save:e.addDevice}})],1)},O=[],I=s(4944),P=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t(I.Z,{staticClass:"mx-2",attrs:{color:e.statusColor,outlined:e.isNotUpdated}}),t(c.Z,{attrs:{disabled:!e.device.isConnected},on:{click:function(t){return e.updateDeviceState(!0)}}},[e._v(" ON ")]),t(c.Z,{attrs:{disabled:!e.device.isConnected},on:{click:function(t){return e.updateDeviceState(!1)}}},[e._v(" OFF ")])],1)},U=[],A=i.ZP.extend({name:"SwitchWithStatus",props:{device:Object},data:()=>({}),methods:{updateDeviceState(e){this.$emit("updateDeviceState",this.device,e)}},computed:{statusColor:function(){return void 0!==this.device.state&&this.device.state?"green":"grey"},isNotUpdated:function(){return"CONNECTED"!==this.device.connectionState||void 0===this.device.state}}}),j=A,L=s(1001),R=(0,L.Z)(j,P,U,!1,null,null,null),M=R.exports,q=s(5452),B=s(6904),K=s(3430),W=s(5251),F=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(q.Z,{attrs:{"max-width":"600px",persistent:"","no-click-animation":""},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.close.apply(null,arguments)}},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[t(S.Z,[t(C.EB,[e._v(" "+e._s(e.isUpdate?"Update Device":"Add Device")+" ")]),t(C.ZB,[t(B.Z,{ref:"form"},[t(W.Z,{ref:"deviceName",attrs:{label:"Device Name *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceName,callback:function(t){e.$set(e.device,"deviceName",t)},expression:"device.deviceName"}}),t(K.Z,{ref:"deviceType",attrs:{items:["tuya"],label:"Device Type *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceType,callback:function(t){e.$set(e.device,"deviceType",t)},expression:"device.deviceType"}}),t(W.Z,{ref:"deviceId",attrs:{label:"Device Id *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceId,callback:function(t){e.$set(e.device,"deviceId",t)},expression:"device.deviceId"}}),t(W.Z,{ref:"deviceKey",attrs:{label:"Device Key *",rules:[e.isNonEmptyString]},model:{value:e.device.deviceKey,callback:function(t){e.$set(e.device,"deviceKey",t)},expression:"device.deviceKey"}})],1)],1),t(C.h7,[t(o.Z),t(c.Z,{attrs:{color:"primary"},nativeOn:{click:function(t){return e.save()}}},[e._v(" "+e._s(e.isUpdate?"Update":"Add")+" ")]),t(c.Z,{attrs:{color:"secondary"},nativeOn:{click:function(t){return e.close()}}},[e._v(" Close ")])],1)],1)],1)},V=[],z=i.ZP.extend({name:"AddDevice",props:{},data:()=>({showDialog:!1,isUpdate:!1,device:{deviceName:"",deviceType:"tuya",deviceId:"",deviceKey:""}}),methods:{close(){this.showDialog=!1,this.resolve(null)},open:function(e,t){return this.showDialog=!0,this.isUpdate=t,this.$nextTick((()=>{this.$refs.form.reset(),e?this.device=Object.assign({},e):(this.device.deviceId="",this.device.deviceType="tuya",this.device.deviceName="",this.device.deviceKey="")})),new Promise(((e,t)=>{this.resolve=e,this.reject=t}))},isNonEmptyString(e){return""!==e},save(){this.$refs.form.validate()&&(this.$emit("save",this.device),this.close())}}}),G=z,H=(0,L.Z)(G,F,V,!1,null,null,null),J=H.exports,Q=i.ZP.extend({name:"DevicesListComponent",components:{SwitchWithStatus:M,AddDevice:J},props:{devices:[]},data:()=>({}),methods:{isConnected(e){let t=e.connectionState;return"CONNECTED"===t},updateDeviceState(e,t){k.changeOnState(e,t).then((()=>{this.refreshDevices()}))},connectDevice(e){k.connect(e).then((()=>{this.refreshDevices()}))},disconnectDevice(e){k.disconnect(e).then((()=>{this.refreshDevices()}))},deleteDevice(e){k["delete"](e).then((()=>{this.refreshDevices()}))},refreshDevices(){this.$emit("refreshDevices")},openAddDeviceDialog(){this.$refs.addDeviceDialog.open(null,!1).finally((()=>this.refreshDevices()))},addDevice(e){k.addDevice(e).then((()=>{this.refreshDevices()}))}}}),X=Q,Y=(0,L.Z)(X,N,O,!1,null,null,null),ee=Y.exports,te=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t($.Z,[t(E.qW,[t("h3",[e._v("Schedules")])]),t(o.Z),t(c.Z,{attrs:{color:"primary"},on:{click:e.openAddScheduledTasksDialog}},[e._v("Add Task")])],1),e.tasks?.length>0?t(S.Z,{staticClass:"mx-auto px-5"},[t(C.ZB,[t(v.Z,e._l(e.tasks,(function(s,i){return t(w.Z,{key:i,staticClass:"grey lighten-4 my-2",attrs:{cols:"12"},on:{click:function(t){return e.toggleExpand(i)}}},[t(b.Z,{staticClass:"text-left",attrs:{cols:"12",xs:"12",sm:"12",md:"6",grow:""}},[t(w.Z,{staticStyle:{color:"black"}},[t(b.Z,{attrs:{xs:"9",sm:"10",grow:""}},[t("div",{staticClass:"text-h6"},[e._v("On Days: "+e._s(s.days.join(", "))),t("br")]),t("div",[e._v("Time: "+e._s(s.time)),t("br")])])],1)],1),t(b.Z,{staticClass:"text-right",attrs:{cols:"12",xs:"12",sm:"12",md:"6"}},[t(w.Z,[t(o.Z),t(b.Z,{attrs:{cols:"auto",xs:"12"}},[t(c.Z,{attrs:{icon:""},on:{click:function(t){return e.deleteScheduledTask(s)}}},[t(r.Z,[e._v("mdi-delete")])],1)],1)],1)],1),t(b.Z,{staticClass:"ma-0 pa-0",attrs:{cols:"12"}},[t("TaskDetails",{ref:`taskDetails${i}`,refInFor:!0,attrs:{tasks:s.tasks,devices:e.devices}})],1)],1)})),1)],1)],1):e._e(),t("AddTask",{ref:"addTaskDialog",attrs:{devices:e.devices},on:{save:e.addScheduledTask}})],1)},se=[],ie=s(1313),ne=s(8585),ae=function(){var e=this,t=e._self._c;e._self._setupProxy;return t(q.Z,{attrs:{"max-width":"700px",persistent:"","no-click-animation":""},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.close.apply(null,arguments)}},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[t(S.Z,[t(C.EB,[e._v(" "+e._s(e.isUpdate?"Update Task":"Add Task")+" ")]),t(C.ZB,[t(B.Z,{ref:"form"},[t("div",[t("h3",[e._v("Select Days")]),t(v.Z,[t(w.Z,{staticClass:"row"},e._l(e.days,(function(s){return t(ie.Z,{key:s,attrs:{label:s,value:s},model:{value:e.task.days,callback:function(t){e.$set(e.task,"days",t)},expression:"task.days"}})})),1)],1),e.daysErrorMessage?t("p",{staticStyle:{color:"red"}},[e._v(e._s(e.daysErrorMessage))]):e._e()],1),t("div",[t("h3",[e._v("Select Time")]),t(ne.Z,{attrs:{format:"24hr"},model:{value:e.task.time,callback:function(t){e.$set(e.task,"time",t)},expression:"task.time"}})],1),t(K.Z,{attrs:{items:e.devicesWithUniqueId,"item-value":"deviceUid",label:"Select a device",rules:[e.isNonEmptySelection],"return-object":""},scopedSlots:e._u([{key:"selection",fn:function({item:s}){return[t("div",[e._v(" "+e._s(s.deviceName)+" - "+e._s(s.deviceType)+" - "+e._s(s.deviceId)+" ")])]}},{key:"item",fn:function({item:s}){return[t("div",[t("h4",[e._v(e._s(s.deviceName))]),t("p",[e._v(e._s(s.deviceType)+" - "+e._s(s.deviceId))])])]}}]),model:{value:e.task.device,callback:function(t){e.$set(e.task,"device",t)},expression:"task.device"}}),t(K.Z,{attrs:{items:e.desiredDeviceStates,"item-text":"text","item-value":"value",rules:[e.isNonEmptySelection],label:"Select a desired state"},model:{value:e.task.state,callback:function(t){e.$set(e.task,"state",t)},expression:"task.state"}})],1)],1),t(C.h7,[t(o.Z),t(c.Z,{attrs:{color:"primary"},nativeOn:{click:function(t){return e.save()}}},[e._v(" "+e._s(e.isUpdate?"Update":"Add")+" ")]),t(c.Z,{attrs:{color:"secondary"},nativeOn:{click:function(t){return e.close()}}},[e._v(" Close ")])],1)],1)],1)},ce=[],re=i.ZP.extend({name:"AddTask",props:{devices:[]},data:()=>({showDialog:!1,isUpdate:!1,task:{days:[],time:"00:00",device:null,state:null},days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysErrorMessage:null,desiredDeviceStates:[{value:!0,text:"On"},{value:!1,text:"Off"}]}),methods:{close(){this.showDialog=!1,this.resolve(null)},open:function(e,t){return this.showDialog=!0,this.isUpdate=t,this.$nextTick((()=>{this.$refs.form.reset(),this.daysErrorMessage=null,e?this.task=Object.assign({},e):(this.task.time="00:00",this.task.days=[],this.device=null,this.state=null)})),new Promise(((e,t)=>{this.resolve=e,this.reject=t}))},isNonEmptyString(e){return""!==e},isNonEmptySelection(e){return null!==e&&void 0!==e},save(){this.areDaysValid()&&this.$refs.form.validate()&&(this.$emit("save",this.task),this.close())},areDaysValid(){return this.setNoDaysSelectedErrorMessage(this.isDaysCheckboxesSelected),this.isDaysCheckboxesSelected},setNoDaysSelectedErrorMessage(e){this.daysErrorMessage=e?"":"Please select at least one day"}},computed:{isDaysCheckboxesSelected(){return this.task.days.length>0},devicesWithUniqueId(){return this.devices?this.devices.map((e=>({...e,deviceUid:e.deviceType+"_"+e.deviceId}))):[]}},watch:{isDaysCheckboxesSelected(e){this.setNoDaysSelectedErrorMessage(e)}}}),de=re,oe=(0,L.Z)(de,ae,ce,!1,null,null,null),le=oe.exports,ue=s(4192),ve=function(){var e=this,t=e._self._c;e._self._setupProxy;return e.expanded?t(S.Z,{staticClass:"ma-4",attrs:{flat:""}},e._l(e.tasks,(function(s,i){return t(S.Z,{key:i,attrs:{flat:""}},[t(C.ZB,[t(v.Z,[t(w.Z,{staticStyle:{color:"black"}},[t(b.Z,[t(w.Z,{staticClass:"text-h6"},[e._v(e._s(e.findDeviceName(s)))]),t(w.Z,{staticClass:"text-h"},[e._v(e._s(s.deviceType)+" - "+e._s(s.deviceId))])],1),t(ue.Z,{attrs:{vertical:""}}),t(b.Z,[t("h1",[e._v(e._s(s.state?"On":"Off"))])])],1)],1)],1)],1)})),1):e._e()},he=[],pe=i.ZP.extend({name:"TaskDetails",props:{tasks:[],devices:[]},data:()=>({expanded:!0}),methods:{toggleExpand(){this.expanded=!this.expanded},findDeviceName(e){const t=this.devices.find((t=>{if(t.deviceType===e.deviceType&&t.deviceId===e.deviceId)return!0}));return void 0!=t?t.deviceName:""}}}),fe=pe,me=(0,L.Z)(fe,ve,he,!1,null,null,null),ye=me.exports,ke=i.ZP.extend({name:"TasksListComponent",components:{AddTask:le,TaskDetails:ye},props:{tasks:[],devices:[]},data:()=>({}),methods:{openAddScheduledTasksDialog(){this.$refs.addTaskDialog.open(null,!1).finally((()=>this.$emit("refreshTasks")))},addScheduledTask(e){x.addScheduledTask(e)},deleteScheduledTask(e){x.deleteScheduledTask(e.days,e.time).then((()=>{this.$emit("refreshTasks")}))},toggleExpand(e){this.$refs[`taskDetails${e}`][0].toggleExpand()}}}),Ze=ke,_e=(0,L.Z)(Ze,te,se,!1,null,null,null),ge=_e.exports,De=i.ZP.extend({name:"LandingPage",components:{DevicesListComponent:ee,TasksListComponent:ge},data:()=>({devices:null,interval:null,lastUpdateTime:"not updated",tasks:null}),methods:{isConnected(e){let t=e.connectionState;return"CONNECTED"===t},refreshDevices(){this.lastUpdateTime=this.getCurrentTime(),k.getDevices().then((e=>{this.devices=e.map((e=>({...e,isConnected:this.isConnected(e)})))}))},getCurrentTime(){let e=(new Date).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"}),t=(new Date).toLocaleTimeString({hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e} ${t}`},refreshTasks(){this.lastUpdateTime=this.getCurrentTime(),x.getAllScheduledTasks().then((e=>{this.tasks=e}))}},mounted:function(){this.refreshDevices(),this.refreshTasks()},created(){this.interval=setInterval(function(){this.refreshDevices(),this.refreshTasks()}.bind(this),5e3)},beforeDestroy(){clearInterval(this.interval),this.interval=null}}),xe=De,Te=(0,L.Z)(xe,h,p,!1,null,null,null),Se=Te.exports,Ce=i.ZP.extend({name:"App",components:{LandingPage:Se},methods:{quit:function(){confirm("Are you sure you want to quit the server.?")&&k.quit().finally((()=>{console.log("Destroying"),this.$destroy(),window.close()}))}},data:()=>({})}),be=Ce,we=(0,L.Z)(be,l,u,!1,null,null,null),$e=we.exports,Ee=s(2250);i.ZP.use(Ee.Z,{iconfont:"mdi"});const Ne=new Ee.Z({theme:{themes:{light:{primary:"#fc5603",secondary:"#3D84F5"}}}});var Oe=Ne;i.ZP.config.productionTip=!1,new i.ZP({vuetify:Oe,render:e=>e($e)}).$mount("#app")}},t={};function s(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,i,n,a){if(!i){var c=1/0;for(l=0;l<e.length;l++){i=e[l][0],n=e[l][1],a=e[l][2];for(var r=!0,d=0;d<i.length;d++)(!1&a||c>=a)&&Object.keys(s.O).every((function(e){return s.O[e](i[d])}))?i.splice(d--,1):(r=!1,a<c&&(c=a));if(r){e.splice(l--,1);var o=n();void 0!==o&&(t=o)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[i,n,a]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,a,c=i[0],r=i[1],d=i[2],o=0;if(c.some((function(t){return 0!==e[t]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(d)var l=d(s)}for(t&&t(i);o<c.length;o++)a=c[o],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(l)},i=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(3238)}));i=s.O(i)})();
//# sourceMappingURL=app.66779b6b.js.map