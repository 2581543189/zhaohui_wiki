(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"3WYl":function(e,t,a){e.exports={activitiesList:"antd-pro_pages_-workbench_-overview-activitiesList",username:"antd-pro_pages_-workbench_-overview-username",event:"antd-pro_pages_-workbench_-overview-event",pageHeaderContent:"antd-pro_pages_-workbench_-overview-pageHeaderContent",avatar:"antd-pro_pages_-workbench_-overview-avatar",content:"antd-pro_pages_-workbench_-overview-content",contentTitle:"antd-pro_pages_-workbench_-overview-contentTitle",extraContent:"antd-pro_pages_-workbench_-overview-extraContent",statItem:"antd-pro_pages_-workbench_-overview-statItem",members:"antd-pro_pages_-workbench_-overview-members",member:"antd-pro_pages_-workbench_-overview-member",projectList:"antd-pro_pages_-workbench_-overview-projectList",cardTitle:"antd-pro_pages_-workbench_-overview-cardTitle",projectGrid:"antd-pro_pages_-workbench_-overview-projectGrid",projectItemContent:"antd-pro_pages_-workbench_-overview-projectItemContent",datetime:"antd-pro_pages_-workbench_-overview-datetime",activeCard:"antd-pro_pages_-workbench_-overview-activeCard",achievementCabinet:"antd-pro_pages_-workbench_-overview-achievementCabinet"}},Bqs9:function(e,t,a){e.exports={radar:"antd-pro_components_-charts_-radar_index-radar",legend:"antd-pro_components_-charts_-radar_index-legend",legendItem:"antd-pro_components_-charts_-radar_index-legendItem",dot:"antd-pro_components_-charts_-radar_index-dot"}},EjXY:function(e,t,a){"use strict";var r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Q9mQ");var n=r(a("diRs"));a("IzEo");var l=r(a("bx4M"));a("pC0b");var o=r(a("GzdX"));a("Pwec");var d=r(a("CtXQ"));a("MXD1");var i=r(a("CFYs"));a("/zsF");var s=r(a("PArb")),c=r(a("q1tI")),u=r(a("f998")),f=a("MuoO"),p=["#32CD32","#4B69FF","#D32CE6","#8847FF","red"];class m extends c.default.PureComponent{render(){var e=this.props,t=e.level,a=e.desc,r=e.icon,f=p[t],m=c.default.createElement("div",{style:{width:"200px"}},c.default.createElement(s.default,{orientation:"left"},"\u6210\u5c31\u8bf4\u660e"),c.default.createElement("p",{style:{textAlign:"center"}},a.now),c.default.createElement(s.default,{orientation:"left"},"\u4e0b\u4e00\u7b49\u7ea7"),c.default.createElement("p",{style:{textAlign:"center"}},a.next),c.default.createElement(s.default,{orientation:"left"},"\u8fdb\u5ea6"),c.default.createElement("span",{style:{textAlign:"center"}},c.default.createElement(i.default,{percent:100*a.current/a.total,size:"small"}),a.current,"/",a.total));return c.default.createElement("div",{className:u.default.extraContent,style:{boxShadow:"5px 2px 6px #aaa"}},c.default.createElement(n.default,{placement:"bottom",content:m,trigger:"hover"},c.default.createElement(l.default,{style:{width:"105px",height:"105px",border:"2px solid "+f},cover:c.default.createElement(d.default,{type:r,theme:"twoTone",twoToneColor:f,style:{fontSize:"50px",padding:"10px",marginLeft:"20px"}}),bodyStyle:{padding:"0px",display:"flex"}},c.default.createElement(o.default,{disabled:!0,defaultValue:t+1,character:c.default.createElement(d.default,{type:"star",theme:"filled",style:{fontSize:"10px",margin:"0px"}}),style:{color:f,marginLeft:"1px",marginTop:"-10px"}}),c.default.createElement("span",{className:u.default.achievementText,style:{color:f}},a.hanzi))))}}var h=(0,f.connect)(e=>{return{}})(m);t.default=h},IJET:function(e,t,a){"use strict";var r=a("TqRt"),n=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,o,d,i,s,c=r(a("J4zp")),u=r(a("U+yc")),f=n(a("q1tI")),p=a("yP6+"),m=r(a("QLqA")),h=r(a("fqkP")),v=r(a("UjoV")),g=r(a("TSYQ")),_=r(a("RFWI")),w=r(a("Rg9O")),E="https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png",y=(l=(0,_.default)(),o=(0,v.default)(),d=(0,h.default)(500),l((s=class extends f.Component{constructor(){super(...arguments),this.state={dv:null},this.resize=(()=>{this.requestRef=requestAnimationFrame(()=>{this.renderChart()})}),this.saveRootRef=(e=>{this.root=e}),this.initTagCloud=(()=>{function e(e){return Object.assign({},{fillOpacity:e.opacity,fontSize:e.origin._origin.size,rotate:e.origin._origin.rotate,text:e.origin._origin.text,textAlign:"center",fontFamily:e.origin._origin.font,fill:e.color,textBaseline:"Alphabetic"},e.style)}p.Shape.registerShape("point","cloud",{drawShape(t,a){var r=e(t);return a.addShape("text",{attrs:Object.assign(r,{x:t.x,y:t.y})})}})})}componentDidMount(){requestAnimationFrame(()=>{this.initTagCloud(),this.renderChart()}),window.addEventListener("resize",this.resize,{passive:!0})}componentDidUpdate(e){var t=this.props.data;JSON.stringify(e.data)!==JSON.stringify(t)&&this.renderChart(this.props)}componentWillUnmount(){this.isUnmount=!0,window.cancelAnimationFrame(this.requestRef),window.removeEventListener("resize",this.resize)}renderChart(e){var t=e||this.props,a=t.data,r=t.height;if(!(a.length<1)&&this.root){var n=4*r,l=4*this.root.offsetWidth,o=()=>{var e=(new m.default.View).source(a),t=e.range("value"),r=(0,c.default)(t,2),o=r[0],d=r[1];e.transform({type:"tag-cloud",fields:["name","value"],imageMask:this.imageMask,font:"Verdana",size:[l,n],padding:5,timeInterval:5e3,rotate(){return 0},fontSize(e){return 50*Math.pow((e.value-o)/(d-o),2)+20}}),this.isUnmount||this.setState({dv:e,w:l,h:n})};this.imageMask?o():(this.imageMask=new Image,this.imageMask.crossOrigin="",this.imageMask.src=E,this.imageMask.onload=o)}}render(){var e=this.props,t=e.className,a=e.height,r=this.state,n=r.dv,l=r.w,o=r.h;return f.default.createElement("div",{className:(0,g.default)(w.default.tagCloud,t),style:{width:"100%",height:a},ref:this.saveRootRef},n&&f.default.createElement(p.Chart,{width:l,height:o,data:n,padding:0,scale:{x:{nice:!1},y:{nice:!1}}},f.default.createElement(p.Coord,{reflect:"y"}),f.default.createElement(p.Geom,{type:"point",position:"x*y",color:"text",shape:"cloud"})))}},(0,u.default)(s.prototype,"renderChart",[o,d],Object.getOwnPropertyDescriptor(s.prototype,"renderChart"),s.prototype),i=s))||i),b=y;t.default=b},KTCi:function(e,t,a){"use strict";var r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Radar",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"TagCloud",{enumerable:!0,get:function(){return l.default}}),t.default=void 0;var n=r(a("Q3tE")),l=r(a("IJET")),o={Radar:n.default,TagCloud:l.default};t.default=o},Q3tE:function(e,t,a){"use strict";var r=a("TqRt"),n=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("14J3");var l=r(a("BMrR"));a("jCWc");var o,d,i=r(a("kPKH")),s=n(a("q1tI")),c=a("yP6+"),u=r(a("RFWI")),f=r(a("Bqs9")),p=(o=(0,u.default)(),o(d=class extends s.Component{constructor(){super(...arguments),this.state={legendData:[]},this.getG2Instance=(e=>{this.chart=e}),this.getLegendData=(()=>{if(this.chart){var e=this.chart.getAllGeoms()[0];if(e){var t=e.get("dataArray")||[],a=t.map(e=>{var t=e.map(e=>e._origin),a={name:t[0].name,color:e[0].color,checked:!0,value:t.reduce((e,t)=>e+t.value,0)};return a});this.setState({legendData:a})}}}),this.handleRef=(e=>{this.node=e}),this.handleLegendClick=((e,t)=>{var a=e;a.checked=!a.checked;var r=this.state.legendData;r[t]=a;var n=r.filter(e=>e.checked).map(e=>e.name);this.chart&&(this.chart.filter("name",e=>n.indexOf(e)>-1),this.chart.repaint()),this.setState({legendData:r})})}componentDidMount(){this.getLegendData()}componentDidUpdate(e){var t=this.props.data;t!==e.data&&this.getLegendData()}render(){var e=["#1890FF","#FACC14","#2FC25B","#8543E0","#F04864","#13C2C2","#fa8c16","#a0d911"],t=this.props,a=t.data,r=void 0===a?[]:a,n=t.height,o=void 0===n?0:n,d=t.title,u=t.hasLegend,p=void 0!==u&&u,m=t.forceFit,h=void 0===m||m,v=t.tickCount,g=void 0===v?4:v,_=t.padding,w=void 0===_?[35,30,16,30]:_,E=t.animate,y=void 0===E||E,b=t.colors,k=void 0===b?e:b,x=this.state.legendData,C={value:{min:0,tickCount:g}},T=o-(p?80:22);return s.default.createElement("div",{className:f.default.radar,style:{height:o}},d&&s.default.createElement("h4",null,d),s.default.createElement(c.Chart,{scale:C,height:T,forceFit:h,data:r,padding:w,animate:y,onGetG2Instance:this.getG2Instance},s.default.createElement(c.Tooltip,null),s.default.createElement(c.Coord,{type:"polar"}),s.default.createElement(c.Axis,{name:"label",line:null,tickLine:null,grid:{lineStyle:{lineDash:null},hideFirstLine:!1}}),s.default.createElement(c.Axis,{name:"value",grid:{type:"polygon",lineStyle:{lineDash:null}}}),s.default.createElement(c.Geom,{type:"line",position:"label*value",color:["name",k],size:1}),s.default.createElement(c.Geom,{type:"point",position:"label*value",color:["name",k],shape:"circle",size:3})),p&&s.default.createElement(l.default,{className:f.default.legend},x.map((e,t)=>s.default.createElement(i.default,{span:24/x.length,key:e.name,onClick:()=>this.handleLegendClick(e,t)},s.default.createElement("div",{className:f.default.legendItem},s.default.createElement("p",null,s.default.createElement("span",{className:f.default.dot,style:{backgroundColor:e.checked?e.color:"#aaa"}}),s.default.createElement("span",null,e.name)),s.default.createElement("h6",null,e.value))))))}})||d),m=p;t.default=m},RFWI:function(e,t,a){"use strict";var r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("pVnL")),l=r(a("q1tI"));function o(e){var t=parseInt(getComputedStyle(e).height,10),a=parseInt(getComputedStyle(e).paddingTop,10)+parseInt(getComputedStyle(e).paddingBottom,10);return t-a}function d(e){if(!e)return 0;var t=e,a=o(t);while(!a){if(t=t.parentNode,!t)break;a=o(t)}return a}var i=()=>e=>(class extends l.default.Component{constructor(){super(...arguments),this.state={computedHeight:0},this.handleRoot=(e=>{this.root=e})}componentDidMount(){var e=this.props.height;if(!e){var t=d(this.root);this.setState({computedHeight:t})}}render(){var t=this.props.height,a=this.state.computedHeight,r=t||a;return l.default.createElement("div",{ref:this.handleRoot},r>0&&l.default.createElement(e,(0,n.default)({},this.props,{height:r})))}}),s=i;t.default=s},Rg9O:function(e,t,a){e.exports={tagCloud:"antd-pro_components_-charts_-tag-cloud_index-tagCloud"}},f998:function(e,t,a){e.exports={achievementText:"antd-pro_components_-achievement_index-achievementText"}},nBTY:function(e,t,a){"use strict";var r=a("TqRt"),n=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Mwp2");var l=r(a("VXEj"));a("IzEo");var o=r(a("bx4M"));a("+BJd");var d=r(a("mr32"));a("14J3");var i=r(a("BMrR"));a("jCWc");var s=r(a("kPKH"));a("/zsF");var c=r(a("PArb"));a("Telt");var u=r(a("Tckk"));a("Znn+");var f,p,m=r(a("ZTPi")),h=r(a("zHco")),v=r(a("EjXY")),g=a("34ay"),_=r(a("3WYl")),w=n(a("q1tI")),E=a("MuoO"),y=r(a("mOP9")),b=(a("+n12"),a("KTCi")),k=r(a("wd/R")),x=a("zvKM"),C=m.default.TabPane,T=(f=(0,E.connect)(e=>{var t=e.workbench_overview,a=e.loading;return{workbench_overview:t,loading:a}}),f(p=class extends w.PureComponent{componentDidMount(){var e=this.props.dispatch;e({type:"workbench_overview/getJitang"}),e({type:"workbench_overview/getAchievement"}),e({type:"workbench_overview/getTaskList"}),e({type:"workbench_overview/getNews"}),e({type:"workbench_overview/getActivity"}),e({type:"workbench_overview/getInterest"}),e({type:"workbench_overview/getRandomWord"})}getIcon(e){switch(e){case"BOOK":return"book";case"NOTE":return"tags";case"ARTICLE":return"highlight";case"LEETCODE":return"calculator";case"FOREIGN_ARTICLE":return"ie";case"BOOKMARK":return"star-o";case"MESSAGE":return"message";case"MOTTO":return"picture";case"KEYWORD":return"pushpin-o";default:return"book"}}render(){var e=this.props,t=e.workbench_overview,a=t.jitang,r=t.achievement,n=t.taskList,f=t.news,p=t.activitys,E=t.interest,T=t.foreignWord,I=e.loading,R=0;n=n.map(e=>{return R++,e.key=R,e}),R=0,"undefined"==typeof f&&(f=[]),f=f.map(e=>{return R++,e.key=R,e});var M=(0,g.getUser)(),O=w.default.createElement(u.default,{size:"large",src:"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"});"undefined"==typeof M.avatar||""==M.avatar||null==M.avatar||(O=w.default.createElement(u.default,{size:"large",src:M.avatar}));var z=w.default.createElement("div",{className:_.default.pageHeaderContent},w.default.createElement("div",{className:_.default.avatar},O),w.default.createElement("div",{className:_.default.content},w.default.createElement("div",{className:_.default.contentTitle},a))),L=[],j=0;r.map(e=>{j++,L.push(w.default.createElement(C,{tab:w.default.createElement(v.default,e),key:j}))});var N=w.default.createElement(i.default,{className:_.default.achievementCabinet},w.default.createElement(s.default,null,w.default.createElement(c.default,{orientation:"left",style:{marginBottom:"-10px"}},"\u6210\u5c31\u5c55\u67dc"),w.default.createElement(m.default,{defaultActiveKey:"1",tabBarGutter:0},L)));return w.default.createElement(h.default,{content:z,extraContent:N},w.default.createElement(i.default,{gutter:24},w.default.createElement(s.default,{xl:16,lg:24,md:24,sm:24,xs:24},w.default.createElement(o.default,{className:_.default.projectList,style:{marginBottom:24},title:"\u4efb\u52a1\u680f",bordered:!1,loading:I.effects["workbench_overview/getTaskList"],bodyStyle:{padding:0}},n.map(e=>w.default.createElement(o.default.Grid,{className:_.default.projectGrid,key:e.id},w.default.createElement(o.default,{bodyStyle:{padding:0},bordered:!1},w.default.createElement(o.default.Meta,{title:w.default.createElement("div",{className:_.default.cardTitle},w.default.createElement(d.default,{color:x.bulletinLevelClass[e.level]},x.bulletinLevelText[e.level]),w.default.createElement(y.default,{to:""},e.title)),description:e.desc}),w.default.createElement("div",{className:_.default.projectItemContent}))))),w.default.createElement(o.default,{bodyStyle:{padding:0},bordered:!1,className:_.default.activeCard,title:"\u52a8\u6001",loading:I.effects["workbench_overview/getNews"],extra:w.default.createElement(y.default,{to:"/website/workbench/index/news"},"more...")},"   ",w.default.createElement("div",{className:_.default.activitiesList},w.default.createElement(l.default,{size:"large"},f.map(e=>w.default.createElement(l.default.Item,{key:e.key},w.default.createElement(l.default.Item.Meta,{avatar:w.default.createElement(u.default,{icon:this.getIcon(e.type)}),title:e.desc,description:w.default.createElement("span",{className:_.default.datetime},(0,k.default)(e.gmt_create).format("YYYY-MM-DD HH:mm:ss"))}))))))),w.default.createElement(s.default,{xl:8,lg:24,md:24,sm:24,xs:24},w.default.createElement(o.default,{style:{marginBottom:24},bordered:!1,title:"\u6d3b\u8dc3\u5ea6",loading:I.effects["workbench_overview/getActivity"]},w.default.createElement("div",{className:_.default.chart},w.default.createElement(b.Radar,{hasLegend:!0,height:343,data:p}))),w.default.createElement(o.default,{title:"\u968f\u673a\u751f\u8bcd",style:{marginBottom:24},loading:I.effects["workbench_overview/getRandomWord"],bordered:!1,bodyStyle:{overflow:"hidden"}},w.default.createElement(b.TagCloud,{data:T,height:161})),w.default.createElement(o.default,{title:"\u5174\u8da3\u5173\u952e\u5b57",loading:I.effects["workbench_overview/getInterest"],bordered:!1,bodyStyle:{overflow:"hidden"}},w.default.createElement(b.TagCloud,{data:E,height:161})))))}})||p),I=T;t.default=I}}]);