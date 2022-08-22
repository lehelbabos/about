"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[174],{38285:(t,e,n)=>{n.d(e,{ro:()=>g,lb:()=>m})
var i=n(33867),a=n(88521),s=n(16140),r=n(30180),o=n(8142),c=n(48206)
function _(){var t=(0,c.x1)()
if(t){var e="internal_error";("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] Transaction: ${e} -> Global error occured`),t.setStatus(e)}}var d=n(27448),p=n(21535)
function l(){var t=this.getScope()
if(t){var e=t.getSpan()
if(e)return{"sentry-trace":e.toTraceparent()}}return{}}function u(t,e,n){if(!(0,c.zu)(e))return t.sampled=!1,t
if(void 0!==t.sampled)return t.setMetadata({transactionSampling:{method:"explicitly_set"}}),t
let i
return"function"==typeof e.tracesSampler?(i=e.tracesSampler(n),t.setMetadata({transactionSampling:{method:"client_sampler",rate:Number(i)}})):void 0!==n.parentSampled?(i=n.parentSampled,t.setMetadata({transactionSampling:{method:"inheritance"}})):(i=e.tracesSampleRate,t.setMetadata({transactionSampling:{method:"client_rate",rate:Number(i)}})),r=i,((0,s.i2)(r)||"number"!=typeof r&&"boolean"!=typeof r?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(r)} of type ${JSON.stringify(typeof r)}.`),0):!(r<0||r>1)||(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${r}.`),0))?i?(t.sampled=Math.random()<i,t.sampled?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] starting ${t.op} transaction - ${t.name}`),t):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(i)})`),t)):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] Discarding transaction because "+("function"==typeof e.tracesSampler?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0")),t.sampled=!1,t):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.warn("[Tracing] Discarding transaction because of invalid sample rate."),t.sampled=!1,t)
var r}function h(t,e){var n=this.getClient(),i=n&&n.getOptions()||{}
let a=new p.Y(t,this)
return a=u(a,i,{parentSampled:t.parentSampled,transactionContext:t,...e}),a.sampled&&a.initSpanRecorder(i._experiments&&i._experiments.maxSpans),a}function m(t,e,n,i,a,s){var r=t.getClient(),o=r&&r.getOptions()||{}
let c=new d.io(e,t,n,i,a)
return c=u(c,o,{parentSampled:e.parentSampled,transactionContext:e,...s}),c.sampled&&c.initSpanRecorder(o._experiments&&o._experiments.maxSpans),c}function g(){var e;(e=(0,i.cu)()).__SENTRY__&&(e.__SENTRY__.extensions=e.__SENTRY__.extensions||{},e.__SENTRY__.extensions.startTransaction||(e.__SENTRY__.extensions.startTransaction=h),e.__SENTRY__.extensions.traceHeaders||(e.__SENTRY__.extensions.traceHeaders=l)),(0,r.KV)()&&function(){var e=(0,i.cu)()
if(e.__SENTRY__){var n={mongodb:()=>new((0,r.l$)(t,"./integrations/node/mongo").Mongo),mongoose:()=>new((0,r.l$)(t,"./integrations/node/mongo").Mongo)({mongoose:!0}),mysql:()=>new((0,r.l$)(t,"./integrations/node/mysql").Mysql),pg:()=>new((0,r.l$)(t,"./integrations/node/postgres").Postgres)},a=Object.keys(n).filter((t=>!!(0,r.$y)(t))).map((t=>{try{return n[t]()}catch(t){return}})).filter((t=>t))
a.length>0&&(e.__SENTRY__.integrations=[...e.__SENTRY__.integrations||[],...a])}}(),(0,o.o)("error",_),(0,o.o)("unhandledrejection",_)}t=n.hmd(t)},27448:(t,e,n)=>{n.d(e,{io:()=>d,mg:()=>c,nT:()=>o})
var i=n(88468),a=n(88521),s=n(20484),r=n(21535),o=1e3,c=3e4
class _ extends s.gB{constructor(t,e,n,i){super(i),this._pushActivity=t,this._popActivity=e,this.transactionSpanId=n}add(t){t.spanId!==this.transactionSpanId&&(t.finish=e=>{t.endTimestamp="number"==typeof e?e:(0,i._I)(),this._popActivity(t.spanId)},void 0===t.endTimestamp&&this._pushActivity(t.spanId)),super.add(t)}}class d extends r.Y{__init(){this.activities={}}__init2(){this._heartbeatCounter=0}__init3(){this._finished=!1}__init4(){this._beforeFinishCallbacks=[]}constructor(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:c,s=arguments.length>4&&void 0!==arguments[4]&&arguments[4]
super(t,e),this._idleHub=e,this._idleTimeout=n,this._finalTimeout=i,this._onScope=s,d.prototype.__init.call(this),d.prototype.__init2.call(this),d.prototype.__init3.call(this),d.prototype.__init4.call(this),s&&(p(e),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`),e.configureScope((t=>t.setSpan(this)))),this._startIdleTimeout(),setTimeout((()=>{this._finished||(this.setStatus("deadline_exceeded"),this.finish())}),this._finalTimeout)}finish(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i._I)()
if(this._finished=!0,this.activities={},this.spanRecorder){for(var e of(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] finishing IdleTransaction",new Date(1e3*t).toISOString(),this.op),this._beforeFinishCallbacks))e(this,t)
this.spanRecorder.spans=this.spanRecorder.spans.filter((e=>{if(e.spanId===this.spanId)return!0
e.endTimestamp||(e.endTimestamp=t,e.setStatus("cancelled"),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] cancelling span since transaction ended early",JSON.stringify(e,void 0,2)))
var n=e.startTimestamp<t
return n||("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] discarding Span since it happened after Transaction was finished",JSON.stringify(e,void 0,2)),n})),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] flushing IdleTransaction")}else("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] No active IdleTransaction")
return this._onScope&&p(this._idleHub),super.finish(t)}registerBeforeFinishCallback(t){this._beforeFinishCallbacks.push(t)}initSpanRecorder(t){this.spanRecorder||(this.spanRecorder=new _((t=>{this._finished||this._pushActivity(t)}),(t=>{this._finished||this._popActivity(t)}),this.spanId,t),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("Starting heartbeat"),this._pingHeartbeat()),this.spanRecorder.add(this)}_cancelIdleTimeout(){this._idleTimeoutID&&(clearTimeout(this._idleTimeoutID),this._idleTimeoutID=void 0)}_startIdleTimeout(t){this._cancelIdleTimeout(),this._idleTimeoutID=setTimeout((()=>{this._finished||0!==Object.keys(this.activities).length||this.finish(t)}),this._idleTimeout)}_pushActivity(t){this._cancelIdleTimeout(),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] pushActivity: ${t}`),this.activities[t]=!0,("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] new activities count",Object.keys(this.activities).length)}_popActivity(t){if(this.activities[t]&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] popActivity ${t}`),delete this.activities[t],("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] new activities count",Object.keys(this.activities).length)),0===Object.keys(this.activities).length){var e=(0,i._I)()+this._idleTimeout/1e3
this._startIdleTimeout(e)}}_beat(){if(!this._finished){var t=Object.keys(this.activities).join("")
t===this._prevHeartbeatString?this._heartbeatCounter+=1:this._heartbeatCounter=1,this._prevHeartbeatString=t,this._heartbeatCounter>=3?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] Transaction finished because of no change for 3 heart beats"),this.setStatus("deadline_exceeded"),this.finish()):this._pingHeartbeat()}}_pingHeartbeat(){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`),setTimeout((()=>{this._beat()}),5e3)}}function p(t){var e=t.getScope()
e&&e.getTransaction()&&e.setSpan(void 0)}},43174:(t,e,n)=>{n.r(e),n.d(e,{BROWSER_TRACING_INTEGRATION_ID:()=>at,BrowserTracing:()=>rt,IdleTransaction:()=>k.io,Integrations:()=>i,Span:()=>_t.Dr,SpanStatus:()=>ct,TRACEPARENT_REGEXP:()=>x.K,Transaction:()=>dt.Y,addExtensionMethods:()=>a.ro,defaultRequestInstrumentationOptions:()=>et,extractTraceparentData:()=>x.q,getActiveTransaction:()=>B.x1,hasTracingEnabled:()=>B.zu,instrumentOutgoingRequests:()=>nt,spanStatusfromHttpCode:()=>_t.Zd,startIdleTransaction:()=>a.lb,stripUrlQueryAndFragment:()=>o.rt})
var i={}
n.r(i),n.d(i,{Apollo:()=>b,BrowserTracing:()=>rt,Express:()=>d,GraphQL:()=>R,Mongo:()=>S,Mysql:()=>T,Postgres:()=>f,Prisma:()=>y})
var a=n(38285),s=n(2796),r=n(88521),o=n(72702),c=n(14205),_=n(16140)
class d{static __initStatic(){this.id="Express"}__init(){this.name=d.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
d.prototype.__init.call(this),this._router=t.router||t.app,this._methods=(Array.isArray(t.methods)?t.methods:[]).concat("use")}setupOnce(){this._router?(function(t){(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).forEach((e=>u(t,e)))}(this._router,this._methods),function(t){var e="settings"in t
e&&void 0===t._router&&t.lazyrouter&&t.lazyrouter()
var n=e?t._router:t
if(!n)return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.debug("Cannot instrument router for URL Parameterization (did not find a valid router)."),void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.debug("Routing instrumentation is currently only supported in Express 4."))
var i=Object.getPrototypeOf(n),a=i.process_params
i.process_params=function(t,e,n,i,r){n._reconstructedRoute||(n._reconstructedRoute="")
const{layerRoutePath:d,isRegex:p,isArray:l,numExtraSegments:u}=function(t){var e=(0,s.x)([t,"access",t=>t.route,"optionalAccess",t=>t.path]),n=(0,_.Kj)(e),i=Array.isArray(e)
if(!e)return{isRegex:n,isArray:i,numExtraSegments:0}
var a=i?Math.max(e.reduce(((t,e)=>t+(0,o.$A)(e.toString())),0)-(0,o.$A)(t.path||""),0):0
return{layerRoutePath:h(i,e),isRegex:n,isArray:i,numExtraSegments:a}}(t)
var m=(d||t.path||"").split("/").filter((t=>t.length>0&&(p||l||!t.includes("*")))).join("/")
if(m&&m.length>0&&(n._reconstructedRoute+=`/${m}${p?"/":""}`),(0,o.$A)(n.originalUrl||"")+u===(0,o.$A)(n._reconstructedRoute)){var g=i.__sentry_transaction
if(g&&"custom"!==g.metadata.source){var f=n._reconstructedRoute||"/"
g.setName(...(0,c.oA)(n,{path:!0,method:!0,customRoute:f}))}}return a.call(this,t,e,n,i,r)}}(this._router)):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("ExpressIntegration is missing an Express instance")}}function p(t,e){var n=t.length
switch(n){case 2:return function(n,i){var a=i.__sentry_transaction
if(a){var s=a.startChild({description:t.name,op:`express.middleware.${e}`})
i.once("finish",(()=>{s.finish()}))}return t.call(this,n,i)}
case 3:return function(n,i,a){var r=i.__sentry_transaction,o=(0,s.x)([r,"optionalAccess",t=>t.startChild,"call",n=>n({description:t.name,op:`express.middleware.${e}`})])
t.call(this,n,i,(function(){(0,s.x)([o,"optionalAccess",t=>t.finish,"call",t=>t()])
for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n]
a.call(this,...e)}))}
case 4:return function(n,i,a,r){var o=a.__sentry_transaction,c=(0,s.x)([o,"optionalAccess",t=>t.startChild,"call",n=>n({description:t.name,op:`express.middleware.${e}`})])
t.call(this,n,i,a,(function(){(0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()])
for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n]
r.call(this,...e)}))}
default:throw new Error(`Express middleware takes 2-4 arguments. Got: ${n}`)}}function l(t,e){return t.map((t=>"function"==typeof t?p(t,e):Array.isArray(t)?t.map((t=>"function"==typeof t?p(t,e):t)):t))}function u(t,e){var n=t[e]
return t[e]=function(){for(var t=arguments.length,i=new Array(t),a=0;a<t;a++)i[a]=arguments[a]
return n.call(this,...l(i,e))},t}function h(t,e){return t?e.map((t=>t.toString())).join(","):e&&e.toString()}d.__initStatic()
var m=n(30180),g=n(15834)
class f{static __initStatic(){this.id="Postgres"}__init(){this.name=f.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
f.prototype.__init.call(this),this._usePgNative=!!t.usePgNative}setupOnce(t,e){var n=(0,m.$y)("pg")
if(!n)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Postgres Integration was unable to require `pg` package."))
if(this._usePgNative&&!(0,s.x)([n,"access",t=>t.native,"optionalAccess",t=>t.Client]))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Postgres Integration was unable to access 'pg-native' bindings."))
const{Client:i}=this._usePgNative?n.native:n;(0,g.hl)(i.prototype,"query",(function(t){return function(n,i,a){var r=e().getScope(),o=(0,s.x)([r,"optionalAccess",t=>t.getSpan,"call",t=>t()]),c=(0,s.x)([o,"optionalAccess",t=>t.startChild,"call",t=>t({description:"string"==typeof n?n:n.text,op:"db"})])
if("function"==typeof a)return t.call(this,n,i,(function(t,e){(0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),a(t,e)}))
if("function"==typeof i)return t.call(this,n,(function(t,e){(0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),i(t,e)}))
var d=void 0!==i?t.call(this,n,i):t.call(this,n)
return(0,_.J8)(d)?d.then((t=>((0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):((0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),d)}}))}}f.__initStatic()
class T{constructor(){T.prototype.__init.call(this)}static __initStatic(){this.id="Mysql"}__init(){this.name=T.id}setupOnce(t,e){var n=(0,m.$y)("mysql/lib/Connection.js")
n?(0,g.hl)(n,"createQuery",(function(t){return function(n,i,a){var r=e().getScope(),o=(0,s.x)([r,"optionalAccess",t=>t.getSpan,"call",t=>t()]),c=(0,s.x)([o,"optionalAccess",t=>t.startChild,"call",t=>t({description:"string"==typeof n?n:n.sql,op:"db"})])
return"function"==typeof a?t.call(this,n,i,(function(t,e,n){(0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),a(t,e,n)})):"function"==typeof i?t.call(this,n,(function(t,e,n){(0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),i(t,e,n)})):t.call(this,n,i,a)}})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Mysql Integration was unable to require `mysql` package.")}}T.__initStatic()
var v=["aggregate","bulkWrite","countDocuments","createIndex","createIndexes","deleteMany","deleteOne","distinct","drop","dropIndex","dropIndexes","estimatedDocumentCount","find","findOne","findOneAndDelete","findOneAndReplace","findOneAndUpdate","indexes","indexExists","indexInformation","initializeOrderedBulkOp","insertMany","insertOne","isCapped","mapReduce","options","parallelCollectionScan","rename","replaceOne","stats","updateMany","updateOne"],E={bulkWrite:["operations"],countDocuments:["query"],createIndex:["fieldOrSpec"],createIndexes:["indexSpecs"],deleteMany:["filter"],deleteOne:["filter"],distinct:["key","query"],dropIndex:["indexName"],find:["query"],findOne:["query"],findOneAndDelete:["filter"],findOneAndReplace:["filter","replacement"],findOneAndUpdate:["filter","update"],indexExists:["indexes"],insertMany:["docs"],insertOne:["doc"],mapReduce:["map","reduce"],rename:["newName"],replaceOne:["filter","doc"],updateMany:["filter","update"],updateOne:["filter","update"]}
class S{static __initStatic(){this.id="Mongo"}__init(){this.name=S.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
S.prototype.__init.call(this),this._operations=Array.isArray(t.operations)?t.operations:v,this._describeOperations=!("describeOperations"in t)||t.describeOperations,this._useMongoose=!!t.useMongoose}setupOnce(t,e){var n=this._useMongoose?"mongoose":"mongodb",i=(0,m.$y)(n)
i?this._instrumentOperations(i.Collection,this._operations,e):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error(`Mongo Integration was unable to require \`${n}\` package.`)}_instrumentOperations(t,e,n){e.forEach((e=>this._patchOperation(t,e,n)))}_patchOperation(t,e,n){if(e in t.prototype){var i=this._getSpanContextFromOperationArguments.bind(this);(0,g.hl)(t.prototype,e,(function(t){return function(){for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o]
var c=r[r.length-1],d=n().getScope(),p=(0,s.x)([d,"optionalAccess",t=>t.getSpan,"call",t=>t()])
if("function"!=typeof c||"mapReduce"===e&&2===r.length){var l=(0,s.x)([p,"optionalAccess",t=>t.startChild,"call",t=>t(i(this,e,r))]),u=t.call(this,...r)
return(0,_.J8)(u)?u.then((t=>((0,s.x)([l,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):((0,s.x)([l,"optionalAccess",t=>t.finish,"call",t=>t()]),u)}return l=(0,s.x)([p,"optionalAccess",t=>t.startChild,"call",t=>t(i(this,e,r.slice(0,-1)))]),t.call(this,...r.slice(0,-1),(function(t,e){(0,s.x)([l,"optionalAccess",t=>t.finish,"call",t=>t()]),c(t,e)}))}}))}}_getSpanContextFromOperationArguments(t,e,n){var i={collectionName:t.collectionName,dbName:t.dbName,namespace:t.namespace},a={op:"db",description:e,data:i},s=E[e],r=Array.isArray(this._describeOperations)?this._describeOperations.includes(e):this._describeOperations
if(!s||!r)return a
try{if("mapReduce"===e){const[t,e]=n
i[s[0]]="string"==typeof t?t:t.name||"<anonymous>",i[s[1]]="string"==typeof e?e:e.name||"<anonymous>"}else for(let t=0;t<s.length;t++)i[s[t]]=JSON.stringify(n[t])}catch(t){}return a}}S.__initStatic()
class y{static __initStatic(){this.id="Prisma"}__init(){this.name=y.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
var e
y.prototype.__init.call(this),(e=t.client)&&e.$use?this._client=t.client:("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`Unsupported Prisma client provided to PrismaIntegration. Provided client: ${JSON.stringify(t.client)}`)}setupOnce(t,e){this._client?this._client.$use(((t,n)=>{var i=e().getScope(),a=(0,s.x)([i,"optionalAccess",t=>t.getSpan,"call",t=>t()]),r=t.action,o=t.model,c=(0,s.x)([a,"optionalAccess",t=>t.startChild,"call",t=>t({description:o?`${o} ${r}`:r,op:"db.prisma"})]),d=n(t)
return(0,_.J8)(d)?d.then((t=>((0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):((0,s.x)([c,"optionalAccess",t=>t.finish,"call",t=>t()]),d)})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("PrismaIntegration is missing a Prisma Client Instance")}}y.__initStatic()
class R{constructor(){R.prototype.__init.call(this)}static __initStatic(){this.id="GraphQL"}__init(){this.name=R.id}setupOnce(t,e){var n=(0,m.$y)("graphql/execution/execute.js")
n?(0,g.hl)(n,"execute",(function(t){return function(){var n=e().getScope(),i=(0,s.x)([n,"optionalAccess",t=>t.getSpan,"call",t=>t()]),a=(0,s.x)([i,"optionalAccess",t=>t.startChild,"call",t=>t({description:"execute",op:"db.graphql"})]);(0,s.x)([n,"optionalAccess",t=>t.setSpan,"call",t=>t(a)])
for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c]
var d=t.call(this,...o)
return(0,_.J8)(d)?d.then((t=>((0,s.x)([a,"optionalAccess",t=>t.finish,"call",t=>t()]),(0,s.x)([n,"optionalAccess",t=>t.setSpan,"call",t=>t(i)]),t))):((0,s.x)([a,"optionalAccess",t=>t.finish,"call",t=>t()]),(0,s.x)([n,"optionalAccess",t=>t.setSpan,"call",t=>t(i)]),d)}})):r.kg.error("GraphQL Integration was unable to require graphql/execution package.")}}R.__initStatic()
class b{constructor(){b.prototype.__init.call(this)}static __initStatic(){this.id="Apollo"}__init(){this.name=b.id}setupOnce(t,e){var n=(0,m.$y)("apollo-server-core")
n?(0,g.hl)(n.ApolloServerBase.prototype,"constructSchema",(function(t){return function(){var n=Array.isArray(this.config.resolvers)?this.config.resolvers:[this.config.resolvers]
return this.config.resolvers=n.map((t=>(Object.keys(t).forEach((n=>{Object.keys(t[n]).forEach((i=>{"function"==typeof t[n][i]&&function(t,e,n,i){(0,g.hl)(t[e],n,(function(t){return function(){for(var a=i().getScope(),r=(0,s.x)([a,"optionalAccess",t=>t.getSpan,"call",t=>t()]),o=(0,s.x)([r,"optionalAccess",t=>t.startChild,"call",t=>t({description:`${e}.${n}`,op:"db.graphql.apollo"})]),c=arguments.length,d=new Array(c),p=0;p<c;p++)d[p]=arguments[p]
var l=t.call(this,...d)
return(0,_.J8)(l)?l.then((t=>((0,s.x)([o,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):((0,s.x)([o,"optionalAccess",t=>t.finish,"call",t=>t()]),l)}}))}(t,n,i,e)}))})),t))),t.call(this)}})):r.kg.error("Apollo Integration was unable to require apollo-server-core package.")}}b.__initStatic()
var N=n(66627),x=n(75492),D=n(22850),k=n(27448),B=n(48206),G=(0,N.R)(),U=n(4549),Y=n(88468),A=n(68256),I=(t,e,n)=>{let i
return a=>{e.value>=0&&(a||n)&&(e.delta=e.value-(i||0),(e.delta||void 0===i)&&(i=e.value,t(e)))}},O=(t,e)=>({name:t,value:(0,U.h)(e,(()=>-1)),delta:0,entries:[],id:`v2-${Date.now()}-${Math.floor(8999999999999*Math.random())+1e12}`}),C=(t,e)=>{try{if(PerformanceObserver.supportedEntryTypes.includes(t)){if("first-input"===t&&!("PerformanceEventTiming"in self))return
var n=new PerformanceObserver((t=>t.getEntries().map(e)))
return n.observe({type:t,buffered:!0}),n}}catch(t){}},w=(t,e)=>{var n=i=>{"pagehide"!==i.type&&"hidden"!==(0,N.R)().document.visibilityState||(t(i),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))}
addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)}
let $=-1
var M=()=>($<0&&($="hidden"===(0,N.R)().document.visibilityState?0:1/0,w((t=>{let{timeStamp:e}=t
$=e}),!0)),{get firstHiddenTime(){return $}}),L={}
function q(t){return"number"==typeof t&&isFinite(t)}function P(t,e){let{startTimestamp:n,...i}=e
return n&&t.startTimestamp>n&&(t.startTimestamp=n),t.startChild({startTimestamp:n,...i})}var H=(0,N.R)()
function F(){return H&&H.addEventListener&&H.performance}let X,z,j=0,J={}
function W(){((t,e)=>{var n=O("CLS",0)
let i,a=0,s=[]
var o=t=>{if(t&&!t.hadRecentInput){var e=s[0],r=s[s.length-1]
a&&0!==s.length&&t.startTime-r.startTime<1e3&&t.startTime-e.startTime<5e3?(a+=t.value,s.push(t)):(a=t.value,s=[t]),a>n.value&&(n.value=a,n.entries=s,i&&i())}},c=C("layout-shift",o)
c&&(i=I((t=>{var e=t.entries.pop()
e&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding CLS"),J.cls={value:t.value,unit:""},z=e)}),n,void 0),w((()=>{c.takeRecords().map(o),i(!0)})))})()}function Z(t){((t,e)=>{var n=M(),i=O("LCP")
let a
var s=t=>{var e=t.startTime
e<n.firstHiddenTime&&(i.value=e,i.entries.push(t)),a&&a()},o=C("largest-contentful-paint",s)
if(o){a=I((t=>{var e=t.entries.pop()
if(e){var n=(0,B.XL)(Y.Z1),i=(0,B.XL)(e.startTime);("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding LCP"),J.lcp={value:t.value,unit:"millisecond"},J["mark.lcp"]={value:n+i,unit:"second"},X=e}}),i,e)
var c=()=>{L[i.id]||(o.takeRecords().map(s),o.disconnect(),L[i.id]=!0,a(!0))};["keydown","click"].forEach((t=>{addEventListener(t,c,{once:!0,capture:!0})})),w(c,!0)}})(0,t)}function Q(){((t,e)=>{var n=M(),i=O("FID")
let a
var s=t=>{a&&t.startTime<n.firstHiddenTime&&(i.value=t.processingStart-t.startTime,i.entries.push(t),a(!0))},o=C("first-input",s)
o&&(a=I((t=>{var e=t.entries.pop()
if(e){var n=(0,B.XL)(Y.Z1),i=(0,B.XL)(e.startTime);("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding FID"),J.fid={value:t.value,unit:"millisecond"},J["mark.fid"]={value:n+i,unit:"second"}}}),i,void 0),w((()=>{o.takeRecords().map(s),o.disconnect()}),!0))})()}function K(t,e,n,i,a,s){var r=s?e[s]:e[`${n}End`],o=e[`${n}Start`]
o&&r&&P(t,{op:"browser",description:(0,U.h)(a,(()=>n)),startTimestamp:i+(0,B.XL)(o),endTimestamp:i+(0,B.XL)(r)})}var V=n(98902),tt=n(8142),et={traceFetch:!0,traceXHR:!0,tracingOrigins:["localhost",/^\//]}
function nt(t){const{traceFetch:e,traceXHR:n,tracingOrigins:i,shouldCreateSpanForRequest:a}={...et,...t}
var s={},r=t=>{if(s[t])return s[t]
var e=i
return s[t]=e.some((e=>(0,V.zC)(t,e)))&&!(0,V.zC)(t,"sentry_key"),s[t]}
let o=r
"function"==typeof a&&(o=t=>r(t)&&a(t))
var c={}
e&&(0,tt.o)("fetch",(t=>{!function(t,e,n){if((0,B.zu)()&&t.fetchData&&e(t.fetchData.url))if(t.endTimestamp){var i=t.fetchData.__span
if(!i)return;(s=n[i])&&(t.response?s.setHttpStatus(t.response.status):t.error&&s.setStatus("internal_error"),s.finish(),delete n[i])}else{var a=(0,B.x1)()
if(a){var s=a.startChild({data:{...t.fetchData,type:"fetch"},description:`${t.fetchData.method} ${t.fetchData.url}`,op:"http.client"})
t.fetchData.__span=s.spanId,n[s.spanId]=s
var r=t.args[0]=t.args[0],o=t.args[1]=t.args[1]||{}
o.headers=function(t,e,n,i){let a=i.headers
if((0,_.V9)(t,Request)&&(a=t.headers),a)if("function"==typeof a.append)a.append("sentry-trace",n.toTraceparent()),a.append(D.bU,(0,D.J8)(e,a.get(D.bU)))
else if(Array.isArray(a)){const[,t]=a.find((t=>{let[e,n]=t
return e===D.bU}))
a=[...a,["sentry-trace",n.toTraceparent()],[D.bU,(0,D.J8)(e,t)]]}else a={...a,"sentry-trace":n.toTraceparent(),baggage:(0,D.J8)(e,a.baggage)}
else a={"sentry-trace":n.toTraceparent(),baggage:(0,D.J8)(e)}
return a}(r,a.getBaggage(),s,o)}}}(t,o,c)})),n&&(0,tt.o)("xhr",(t=>{!function(t,e,n){if(!(!(0,B.zu)()||t.xhr&&t.xhr.__sentry_own_request__)&&t.xhr&&t.xhr.__sentry_xhr__&&e(t.xhr.__sentry_xhr__.url)){var i=t.xhr.__sentry_xhr__
if(t.endTimestamp){var a=t.xhr.__sentry_xhr_span_id__
if(!a)return;(r=n[a])&&(r.setHttpStatus(i.status_code),r.finish(),delete n[a])}else{var s=(0,B.x1)()
if(s){var r=s.startChild({data:{...i.data,type:"xhr",method:i.method,url:i.url},description:`${i.method} ${i.url}`,op:"http.client"})
if(t.xhr.__sentry_xhr_span_id__=r.spanId,n[t.xhr.__sentry_xhr_span_id__]=r,t.xhr.setRequestHeader)try{t.xhr.setRequestHeader("sentry-trace",r.toTraceparent())
var o=t.xhr.getRequestHeader&&t.xhr.getRequestHeader(D.bU)
t.xhr.setRequestHeader(D.bU,(0,D.J8)(s.getBaggage(),o))}catch(t){}}}}}(t,o,c)}))}var it=(0,N.R)(),at="BrowserTracing",st={idleTimeout:k.nT,finalTimeout:k.mg,markBackgroundTransactions:!0,routingInstrumentation:function(t){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]
if(!it||!it.location)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn("Could not initialize routing instrumentation due to invalid location"))
let i,a=it.location.href
e&&(i=t({name:it.location.pathname,op:"pageload",metadata:{source:"url"}})),n&&(0,tt.o)("history",(e=>{let{to:n,from:s}=e
void 0===s&&a&&-1!==a.indexOf(n)?a=void 0:s!==n&&(a=void 0,i&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Finishing current transaction with op: ${i.op}`),i.finish()),i=t({name:it.location.pathname,op:"navigation",metadata:{source:"url"}}))}))},startTransactionOnLocationChange:!0,startTransactionOnPageLoad:!0,_experiments:{enableLongTask:!0},...et}
class rt{__init(){this.name=at}constructor(t){rt.prototype.__init.call(this)
let e=et.tracingOrigins
t&&(t.tracingOrigins&&Array.isArray(t.tracingOrigins)?e=t.tracingOrigins:("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&(this._emitOptionsWarning=!0)),this.options={...st,...t,tracingOrigins:e}
const{_metricOptions:n}=this.options
!function(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
var e=F()
e&&Y.Z1&&(e.mark&&H.performance.mark("sentry-tracing-init"),W(),Z(t),Q())}(n&&n._reportAllChanges),(0,s.x)([this,"access",t=>t.options,"access",t=>t._experiments,"optionalAccess",t=>t.enableLongTask])&&C("longtask",(t=>{var e=(0,B.x1)()
if(e){var n=(0,B.XL)(Y.Z1+t.startTime),i=(0,B.XL)(t.duration)
e.startChild({description:"Long Task",op:"ui.long-task",startTimestamp:n,endTimestamp:n+i})}}))}setupOnce(t,e){this._getCurrentHub=e,this._emitOptionsWarning&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`[Tracing] We added a reasonable default for you: ${et.tracingOrigins}`))
const{routingInstrumentation:n,startTransactionOnLocationChange:i,startTransactionOnPageLoad:a,markBackgroundTransactions:s,traceFetch:o,traceXHR:c,tracingOrigins:_,shouldCreateSpanForRequest:d}=this.options
n((t=>this._createRouteTransaction(t)),a,i),s&&(G&&G.document?G.document.addEventListener("visibilitychange",(()=>{var t=(0,B.x1)()
G.document.hidden&&t&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Transaction: cancelled -> since tab moved to the background, op: ${t.op}`),t.status||t.setStatus("cancelled"),t.setTag("visibilitychange","document.hidden"),t.finish())})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn("[Tracing] Could not set up background tab detection due to lack of global document")),nt({traceFetch:o,traceXHR:c,tracingOrigins:_,shouldCreateSpanForRequest:d})}_createRouteTransaction(t){if(!this._getCurrentHub)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`[Tracing] Did not create ${t.op} transaction because _getCurrentHub is invalid.`))
const{beforeNavigate:e,idleTimeout:n,finalTimeout:i}=this.options
var s="pageload"===t.op?function(){var t=ot("sentry-trace"),e=ot("baggage"),n=t?(0,x.q)(t):void 0,i=(0,D.rg)(e,t)
if(n||i)return{...n&&n,...i&&{metadata:{baggage:i}}}}():void 0,o={...t,...s,...s&&{metadata:{...t.metadata,...s.metadata}},trimEnd:!0},c="function"==typeof e?e(o):o,_=void 0===c?{...o,sampled:!1}:c
_.metadata=_.name!==o.name?{..._.metadata,source:"custom"}:_.metadata,!1===_.sampled&&("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Will not send ${_.op} transaction because of beforeNavigate.`),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Starting ${_.op} transaction on scope`)
var d=this._getCurrentHub()
const{location:p}=(0,N.R)()
var l=(0,a.lb)(d,_,n,i,!0,{location:p})
return l.registerBeforeFinishCallback((t=>{(function(t){var e=F()
if(!e||!H.performance.getEntries||!Y.Z1)return;("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Tracing] Adding & adjusting spans using Performance API")
var n=(0,B.XL)(Y.Z1),i=e.getEntries()
let a,s
i.slice(j).forEach((e=>{var i=(0,B.XL)(e.startTime),o=(0,B.XL)(e.duration)
if(!("navigation"===t.op&&n+i<t.startTimestamp))switch(e.entryType){case"navigation":!function(t,e,n){["unloadEvent","redirect","domContentLoadedEvent","loadEvent","connect"].forEach((i=>{K(t,e,i,n)})),K(t,e,"secureConnection",n,"TLS/SSL","connectEnd"),K(t,e,"fetch",n,"cache","domainLookupStart"),K(t,e,"domainLookup",n,"DNS"),function(t,e,n){P(t,{op:"browser",description:"request",startTimestamp:n+(0,B.XL)(e.requestStart),endTimestamp:n+(0,B.XL)(e.responseEnd)}),P(t,{op:"browser",description:"response",startTimestamp:n+(0,B.XL)(e.responseStart),endTimestamp:n+(0,B.XL)(e.responseEnd)})}(t,e,n)}(t,e,n),a=n+(0,B.XL)(e.responseStart),s=n+(0,B.XL)(e.requestStart)
break
case"mark":case"paint":case"measure":var c=function(t,e,n,i,a){var s=a+n,r=s+i
return P(t,{description:e.name,endTimestamp:r,op:e.entryType,startTimestamp:s}),s}(t,e,i,o,n),_=M(),d=e.startTime<_.firstHiddenTime
"first-paint"===e.name&&d&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding FP"),J.fp={value:e.startTime,unit:"millisecond"},J["mark.fp"]={value:c,unit:"second"}),"first-contentful-paint"===e.name&&d&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding FCP"),J.fcp={value:e.startTime,unit:"millisecond"},J["mark.fcp"]={value:c,unit:"second"})
break
case"resource":var p=e.name.replace(H.location.origin,"")
!function(t,e,n,i,a,s){if("xmlhttprequest"!==e.initiatorType&&"fetch"!==e.initiatorType){var r={}
"transferSize"in e&&(r["Transfer Size"]=e.transferSize),"encodedBodySize"in e&&(r["Encoded Body Size"]=e.encodedBodySize),"decodedBodySize"in e&&(r["Decoded Body Size"]=e.decodedBodySize)
var o=s+i
P(t,{description:n,endTimestamp:o+a,op:e.initiatorType?`resource.${e.initiatorType}`:"resource",startTimestamp:o,data:r})}}(t,e,p,i,o,n)}})),j=Math.max(i.length-1,0),function(t){var e=H.navigator
if(e){var n=e.connection
n&&(n.effectiveType&&t.setTag("effectiveConnectionType",n.effectiveType),n.type&&t.setTag("connectionType",n.type),q(n.rtt)&&(J["connection.rtt"]={value:n.rtt,unit:"millisecond"}),q(n.downlink)&&(J["connection.downlink"]={value:n.downlink,unit:""})),q(e.deviceMemory)&&t.setTag("deviceMemory",`${e.deviceMemory} GB`),q(e.hardwareConcurrency)&&t.setTag("hardwareConcurrency",String(e.hardwareConcurrency))}}(t),"pageload"===t.op&&("number"==typeof a&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding TTFB"),J.ttfb={value:1e3*(a-t.startTimestamp),unit:"millisecond"},"number"==typeof s&&s<=a&&(J["ttfb.requestTime"]={value:1e3*(a-s),unit:"millisecond"})),["fcp","fp","lcp"].forEach((e=>{if(J[e]&&!(n>=t.startTimestamp)){var i=J[e].value,a=n+(0,B.XL)(i),s=Math.abs(1e3*(a-t.startTimestamp)),o=s-i;("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Measurements] Normalized ${e} from ${i} to ${s} (${o})`),J[e].value=s}})),J["mark.fid"]&&J.fid&&P(t,{description:"first input delay",endTimestamp:J["mark.fid"].value+(0,B.XL)(J.fid.value),op:"web.vitals",startTimestamp:J["mark.fid"].value}),"fcp"in J||delete J.cls,Object.keys(J).forEach((e=>{t.setMeasurement(e,J[e].value,J[e].unit)})),function(t){X&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding LCP Data"),X.element&&t.setTag("lcp.element",(0,A.R)(X.element)),X.id&&t.setTag("lcp.id",X.id),X.url&&t.setTag("lcp.url",X.url.trim().slice(0,200)),t.setTag("lcp.size",X.size)),z&&z.sources&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding CLS Data"),z.sources.forEach(((e,n)=>t.setTag(`cls.source.${n+1}`,(0,A.R)(e.node)))))}(t)),X=void 0,z=void 0,J={}})(t),t.setTag("sentry_reportAllChanges",Boolean(this.options._metricOptions&&this.options._metricOptions._reportAllChanges))})),l}}function ot(t){var e=(0,N.R)()
if(e.document&&e.document.querySelector){var n=e.document.querySelector(`meta[name=${t}]`)
return n?n.getAttribute("content"):null}return null}var ct,_t=n(20484)
!function(t){t.Ok="ok",t.DeadlineExceeded="deadline_exceeded",t.Unauthenticated="unauthenticated",t.PermissionDenied="permission_denied",t.NotFound="not_found",t.ResourceExhausted="resource_exhausted",t.InvalidArgument="invalid_argument",t.Unimplemented="unimplemented",t.Unavailable="unavailable",t.InternalError="internal_error",t.UnknownError="unknown_error",t.Cancelled="cancelled",t.AlreadyExists="already_exists",t.FailedPrecondition="failed_precondition",t.Aborted="aborted",t.OutOfRange="out_of_range",t.DataLoss="data_loss"}(ct||(ct={}))
var dt=n(21535);("undefined"==typeof __SENTRY_TRACING__||__SENTRY_TRACING__)&&(0,a.ro)()},20484:(t,e,n)=>{n.d(e,{Dr:()=>_,Zd:()=>d,gB:()=>c})
var i=n(4549),a=n(7209),s=n(88468),r=n(88521),o=n(15834)
class c{__init(){this.spans=[]}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3
c.prototype.__init.call(this),this._maxlen=t}add(t){this.spans.length>this._maxlen?t.spanRecorder=void 0:this.spans.push(t)}}class _{__init2(){this.traceId=(0,a.DM)()}__init3(){this.spanId=(0,a.DM)().substring(16)}__init4(){this.startTimestamp=(0,s._I)()}__init5(){this.tags={}}__init6(){this.data={}}constructor(t){if(_.prototype.__init2.call(this),_.prototype.__init3.call(this),_.prototype.__init4.call(this),_.prototype.__init5.call(this),_.prototype.__init6.call(this),!t)return this
t.traceId&&(this.traceId=t.traceId),t.spanId&&(this.spanId=t.spanId),t.parentSpanId&&(this.parentSpanId=t.parentSpanId),"sampled"in t&&(this.sampled=t.sampled),t.op&&(this.op=t.op),t.description&&(this.description=t.description),t.data&&(this.data=t.data),t.tags&&(this.tags=t.tags),t.status&&(this.status=t.status),t.startTimestamp&&(this.startTimestamp=t.startTimestamp),t.endTimestamp&&(this.endTimestamp=t.endTimestamp)}startChild(t){var e=new _({...t,parentSpanId:this.spanId,sampled:this.sampled,traceId:this.traceId})
if(e.spanRecorder=this.spanRecorder,e.spanRecorder&&e.spanRecorder.add(e),e.transaction=this.transaction,("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&e.transaction){var n=`[Tracing] Starting '${t&&t.op||"< unknown op >"}' span on transaction '${e.transaction.name||"< unknown name >"}' (${e.transaction.spanId}).`
e.transaction.metadata.spanMetadata[e.spanId]={logMessage:n},r.kg.log(n)}return e}setTag(t,e){return this.tags={...this.tags,[t]:e},this}setData(t,e){return this.data={...this.data,[t]:e},this}setStatus(t){return this.status=t,this}setHttpStatus(t){this.setTag("http.status_code",String(t))
var e=d(t)
return"unknown_error"!==e&&this.setStatus(e),this}isSuccess(){return"ok"===this.status}finish(t){if(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&this.transaction&&this.transaction.spanId!==this.spanId){const{logMessage:t}=this.transaction.metadata.spanMetadata[this.spanId]
t&&r.kg.log(t.replace("Starting","Finishing"))}this.endTimestamp="number"==typeof t?t:(0,s._I)()}toTraceparent(){let t=""
return void 0!==this.sampled&&(t=this.sampled?"-1":"-0"),`${this.traceId}-${this.spanId}${t}`}toContext(){return(0,o.Jr)({data:this.data,description:this.description,endTimestamp:this.endTimestamp,op:this.op,parentSpanId:this.parentSpanId,sampled:this.sampled,spanId:this.spanId,startTimestamp:this.startTimestamp,status:this.status,tags:this.tags,traceId:this.traceId})}updateWithContext(t){return this.data=(0,i.h)(t.data,(()=>({}))),this.description=t.description,this.endTimestamp=t.endTimestamp,this.op=t.op,this.parentSpanId=t.parentSpanId,this.sampled=t.sampled,this.spanId=(0,i.h)(t.spanId,(()=>this.spanId)),this.startTimestamp=(0,i.h)(t.startTimestamp,(()=>this.startTimestamp)),this.status=t.status,this.tags=(0,i.h)(t.tags,(()=>({}))),this.traceId=(0,i.h)(t.traceId,(()=>this.traceId)),this}getTraceContext(){return(0,o.Jr)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,trace_id:this.traceId})}toJSON(){return(0,o.Jr)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,start_timestamp:this.startTimestamp,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,timestamp:this.endTimestamp,trace_id:this.traceId})}}function d(t){if(t<400&&t>=100)return"ok"
if(t>=400&&t<500)switch(t){case 401:return"unauthenticated"
case 403:return"permission_denied"
case 404:return"not_found"
case 409:return"already_exists"
case 413:return"failed_precondition"
case 429:return"resource_exhausted"
default:return"invalid_argument"}if(t>=500&&t<600)switch(t){case 501:return"unimplemented"
case 503:return"unavailable"
case 504:return"deadline_exceeded"
default:return"internal_error"}return"unknown_error"}},21535:(t,e,n)=>{n.d(e,{Y:()=>_})
var i=n(4549),a=n(33867),s=n(88521),r=n(15834),o=n(22850),c=n(20484)
class _ extends c.Dr{__init(){this._measurements={}}constructor(t,e){super(t),_.prototype.__init.call(this),this._hub=e||(0,a.Gd)(),this._name=t.name||"",this.metadata={...t.metadata,spanMetadata:{}},this._trimEnd=t.trimEnd,this.transaction=this}get name(){return this._name}set name(t){this._name=t,this.metadata.source="custom"}setName(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"custom"
this.name=t,this.metadata.source=e}initSpanRecorder(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3
this.spanRecorder||(this.spanRecorder=new c.gB(t)),this.spanRecorder.add(this)}setMeasurement(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:""
this._measurements[t]={value:e,unit:n}}setMetadata(t){this.metadata={...this.metadata,...t}}finish(t){if(void 0===this.endTimestamp){if(this.name||(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),this.name="<unlabeled transaction>"),super.finish(t),!0===this.sampled){var e=this.spanRecorder?this.spanRecorder.spans.filter((t=>t!==this&&t.endTimestamp)):[]
this._trimEnd&&e.length>0&&(this.endTimestamp=e.reduce(((t,e)=>t.endTimestamp&&e.endTimestamp?t.endTimestamp>e.endTimestamp?t:e:t)).endTimestamp)
var n=this.metadata,i={contexts:{trace:this.getTraceContext()},spans:e,start_timestamp:this.startTimestamp,tags:this.tags,timestamp:this.endTimestamp,transaction:this.name,type:"transaction",sdkProcessingMetadata:{...n,baggage:this.getBaggage()},...n.source&&{transaction_info:{source:n.source}}}
return Object.keys(this._measurements).length>0&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Measurements] Adding measurements to transaction",JSON.stringify(this._measurements,void 0,2)),i.measurements=this._measurements),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`),this._hub.captureEvent(i)}("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.")
var a=this._hub.getClient()
a&&a.recordDroppedEvent("sample_rate","transaction")}}toContext(){var t=super.toContext()
return(0,r.Jr)({...t,name:this.name,trimEnd:this._trimEnd})}updateWithContext(t){return super.updateWithContext(t),this.name=(0,i.h)(t.name,(()=>"")),this._trimEnd=t.trimEnd,this}getBaggage(){var t=this.metadata.baggage,e=!t||(0,o.Gp)(t)?this._populateBaggageWithSentryValues(t):t
return this.metadata.baggage=e,e}_populateBaggageWithSentryValues(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,o.Hn)({})
var e=this._hub||(0,a.Gd)(),n=e&&e.getClient()
if(!n)return t
const{environment:i,release:s}=n.getOptions()||{},{publicKey:c}=n.getDsn()||{}
var _=this.metadata&&this.metadata.transactionSampling&&this.metadata.transactionSampling.rate&&this.metadata.transactionSampling.rate.toString(),d=e.getScope()
const{segment:p}=d&&d.getUser()||{}
var l=this.metadata.source,u=l&&"url"!==l?this.name:void 0
return(0,o.Hn)((0,r.Jr)({environment:i,release:s,transaction:u,user_segment:p,public_key:c,trace_id:this.traceId,sample_rate:_,...(0,o.Hk)(t)}),"",!1)}}},48206:(t,e,n)=>{n.d(e,{XL:()=>r,x1:()=>s,zu:()=>a})
var i=n(33867)
function a(t){var e=(0,i.Gd)().getClient(),n=t||e&&e.getOptions()
return!!n&&("tracesSampleRate"in n||"tracesSampler"in n)}function s(t){var e=(t||(0,i.Gd)()).getScope()
return e&&e.getTransaction()}function r(t){return t/1e3}},4549:(t,e,n)=>{function i(t,e){return null!=t?t:e()}n.d(e,{h:()=>i})}}])

//# sourceMappingURL=chunk.174.0364e8abdae8210d8e6d.map