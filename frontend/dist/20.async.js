(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{KOEo:function(e,t,a){"use strict";var l=a("TqRt"),n=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5Dmo");var d=l(a("3S7+"));a("IzEo");var o=l(a("bx4M"));a("Pwec");var r=l(a("CtXQ"));a("+L6B");var i=l(a("2/Rp"));a("6UJt");var s=l(a("DFOY"));a("5NDa");var c=l(a("5rEg")),u=l(a("MVZn"));a("2qtc");var f=l(a("kLXV"));a("Mwp2");var m=l(a("VXEj"));a("14J3");var p=l(a("BMrR"));a("+BJd");var h=l(a("mr32"));a("jCWc");var y=l(a("kPKH"));a("y8nQ");var E=l(a("Vl3Y"));a("OaEy");var g,v,w,b=l(a("2fM7")),k=n(a("q1tI")),_=a("MuoO"),x=a("zvKM"),L=l(a("S/WG")),S=l(a("wd/R")),C=b.default.Option,F=E.default.Item;class M extends k.Component{constructor(e){super(e),this.changeShowNoteList=this.props.changeShowNoteList}render(){var e=this.props,t=e.showNoteList,a=e.noteList;e.loading;return a.sort(function(e,t){return e.index-t.index}),k.default.createElement(f.default,{destroyOnClose:!0,title:"\u7b14\u8bb0\u5217\u8868",visible:t,footer:null,closable:!0,centered:!0,onCancel:()=>this.changeShowNoteList(!1),width:900},a.length>0?k.default.createElement(m.default,null,a.map((e,t)=>k.default.createElement(m.default.Item,null,k.default.createElement(p.default,{gutter:24,style:{width:"200%"}},k.default.createElement(y.default,{md:1,sm:1},e.index),k.default.createElement(y.default,{md:7,sm:7},(0,S.default)(e.gmt_create).format("YYYY-MM-DD HH:mm:ss")),k.default.createElement(y.default,{md:16,sm:16},k.default.createElement(h.default,null,e.skill.first),k.default.createElement(h.default,null,e.skill.second),e.desc))))):k.default.createElement("h1",null,"\u6ca1\u6570\u636e"))}}var N=(g=E.default.create({}),v=(0,_.connect)(e=>{var t=e.workbench_index,a=e.loading;return{workbench_index:t,loading:a}}),g(w=v(w=class extends k.Component{constructor(){super(...arguments),this.handleFormReset=(()=>{var e=this.props,t=e.form,a=e.dispatch;t.resetFields(),a({type:"workbench_index/mission_fetch",payload:{formValues:{type:"LEETCODE",name:""}}})}),this.handleSearch=(e=>{e.preventDefault();var t=this.props,a=t.dispatch,l=t.form;l.validateFields((e,t)=>{if(!e){var l={};t.option&&3==t.option.length&&(l.type="LEETCODE",l.first=t.option[0],l.second=t.option[1],l.third=t.option[2]),l.name=t["name"],l.difficulty=t["difficulty"],l.pagination={current:1,pageSize:8,total:0},a({type:"workbench_index/mission_fetch",payload:l})}})}),this.changeSelect=(e=>{var t=this.props,a=(t.form,t.dispatch);a({type:"data_leetcode/updateClassificationType",payload:{type:e}}),a({type:"data_leetcode/getOption"})})}componentWillMount(){var e=this.props.dispatch;e({type:"workbench_index/mission_fetch"}),e({type:"workbench_index/getMissionOption"})}fetchMore(e,t){var a=this.props,l=a.dispatch,n=a.form;n.validateFields((a,n)=>{if(!a){var d=(0,u.default)({state:n.state},e);d.pagination={current:t.current+1,pageSize:10,total:t.total},d.append=!0,l({type:"workbench_index/mission_fetch",payload:d})}})}renderForm(e,t){var a=this.props.form.getFieldDecorator;return k.default.createElement(E.default,{onSubmit:this.handleSearch,layout:"inline"},k.default.createElement(p.default,{gutter:{md:8,lg:24,xl:48}},k.default.createElement(y.default,{md:8,sm:24},k.default.createElement(F,{label:"\u5173\u952e\u5b57"},a("name")(k.default.createElement(c.default,{placeholder:"\u6a21\u7cca\u5339\u914d"})))),k.default.createElement(y.default,{md:8,sm:24},k.default.createElement(F,{label:"\u96be\u5ea6"},a("difficulty",{})(k.default.createElement(b.default,{style:{minWidth:150},allowClear:!0,onSelect:e=>this.changeSelect(e)},[1,2,3].map(e=>k.default.createElement(C,{key:e},k.default.createElement(h.default,{color:x.bulletinLevelClass[e]},x.leetcodeDifficculties[e]),"  ")))))),k.default.createElement(y.default,{md:8,sm:24},k.default.createElement(F,{label:"\u7c7b\u522b"},a("option")(k.default.createElement(s.default,{options:t,loadData:e=>this.loadData(e),onChange:(t,a)=>this.onChange(e,t,a),changeOnSelect:!0})))),k.default.createElement(y.default,{md:8,sm:24},k.default.createElement("span",{className:L.default.submitButtons},k.default.createElement(i.default,{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),k.default.createElement(i.default,{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}loadData(e){console.log(e);var t=this.props.dispatch,a=e.length,l={};3==a||(l=2==a?{name:"third",first:e[0].value,second:e[1].value}:1==a?{name:"second",first:e[0].value}:{name:"first"}),t({type:"workbench_index/getMissionOption",payload:l})}onChange(e,t,a){var l=this.props.dispatch,n=a.length;l(3==n?{type:"workbench_index/setFormValues",payload:{mission:{formValues:{type:e,first:a[0].value,second:a[1].value,third:a[2].value}}}}:2==n?{type:"workbench_index/setFormValues",payload:{mission:{formValues:{type:e,first:a[0].value,second:a[1].value,third:""}}}}:1==n?{type:"workbench_index/setFormValues",payload:{mission:{formValues:{type:e,first:a[0].value,second:"",third:""}}}}:{type:"workbench_index/setFormValues",payload:{mission:{formValues:{type:e,first:"",second:"",third:""}}}}),console.log(t,a)}changeShowNoteList(e,t){var a=this.props.dispatch;t&&e&&a({type:"workbench_index/leetcode_note_fetch",payload:{leetcodeId:t.id}}),a({type:"workbench_index/changeStateMission",payload:{showNoteList:!!e}})}render(){var e=this.props,t=e.form,a=e.workbench_index,l=e.loading,n=(t.getFieldDecorator,a.mission),s=n.formValues,c=n.options,u=n.list,f=n.pagination,p=n.hasNext?k.default.createElement("div",{style:{textAlign:"center",marginTop:16}},k.default.createElement(i.default,{onClick:()=>{this.fetchMore(s,f)},style:{paddingLeft:48,paddingRight:48}},l.effects["workbench_index/mission_fetch"]?k.default.createElement("span",null,k.default.createElement(r.default,{type:"loading"})," \u52a0\u8f7d\u4e2d..."):"\u52a0\u8f7d\u66f4\u591a")):null,y=n.showNoteList,E=n.noteList,g={showNoteList:y,noteList:E,changeShowNoteList:this.changeShowNoteList,dispatch:this.props.dispatch};return k.default.createElement(k.Fragment,null,k.default.createElement(o.default,{bordered:!1},k.default.createElement("div",{className:L.default.tableListForm},k.default.createElement("div",{className:L.default.tableListForm},this.renderForm(s.type,c)))),k.default.createElement(m.default,{rowKey:"id",style:{marginTop:24},grid:{gutter:24,xl:4,lg:3,md:3,sm:2,xs:1},loading:l.effects["workbench_index/mission_fetch"],dataSource:u,loadMore:p,renderItem:e=>k.default.createElement(m.default.Item,{key:e.id},k.default.createElement(o.default,{hoverable:!0,bodyStyle:{paddingBottom:20,height:"100px",overflow:"hidden"},actions:[k.default.createElement(d.default,{title:"\u53bb\u5237\u9898"},k.default.createElement("a",{href:e.url,target:"_blank"},k.default.createElement(r.default,{type:"rocket"}))),k.default.createElement(d.default,{title:"\u67e5\u770b\u7b14\u8bb0"},k.default.createElement("a",{onClick:()=>{this.changeShowNoteList(!0,e)}},k.default.createElement(r.default,{type:"eye"})))]},k.default.createElement(h.default,{color:x.bulletinLevelClass[e.difficulty]},x.leetcodeDifficculties[e.difficulty]),k.default.createElement(h.default,null,e.skill.first),k.default.createElement(h.default,null,e.skill.second),k.default.createElement("div",null),k.default.createElement("h4",{style:{paddingTop:"5px"}},e.name)))}),k.default.createElement(M,g))}})||w)||w),D=N;t.default=D}}]);