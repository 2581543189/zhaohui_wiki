(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{GfxK:function(e,t,a){"use strict";var l=a("TqRt"),d=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("pVnL"));a("IzEo");var n=l(a("bx4M"));a("qVdP");var i=l(a("jsC+"));a("lUTK");var s=l(a("BvKs"));a("+L6B");var o=l(a("2/Rp"));a("6UJt");var u=l(a("DFOY"));a("14J3");var c=l(a("BMrR"));a("jCWc");var p=l(a("kPKH")),f=l(a("MVZn"));a("/zsF");var m=l(a("PArb"));a("Q9mQ");var h=l(a("diRs"));a("5Dmo");var y=l(a("3S7+"));a("Pwec");var E=l(a("CtXQ"));a("2qtc");var v=l(a("kLXV"));a("iQDF");var b=l(a("+eQT"));a("OaEy");var g=l(a("2fM7"));a("+BJd");var C=l(a("mr32"));a("5NDa");var D=l(a("5rEg"));a("y8nQ");var V,w,k,F,M,_,O,S=l(a("Vl3Y")),Y=l(a("zHco")),q=l(a("CkN6")),x=l(a("JA3D")),H=d(a("q1tI")),T=a("MuoO"),L=l(a("wd/R")),R=a("+n12"),U=a("zvKM"),I=l(a("iQSN")),A=S.default.Item,N=(V=S.default.create(),V(w=class extends H.Component{constructor(e){super(e),this.okHandle=(()=>{var e=this.props.form;e.validateFields((t,a)=>{t||(e.resetFields(),this.handleAdd(a))})}),this.handleModalVisible=this.props.handleModalVisible,this.handleAdd=this.props.handleAdd,this.dispatch=this.props.dispatch}render(){var e=this.props,t=e.form,a=e.modalVisible;return H.default.createElement(v.default,{destroyOnClose:!0,title:"\u65b0\u5efa\u9898\u76ee",visible:a,onOk:this.okHandle,onCancel:()=>this.handleModalVisible(!1)},H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u6807\u9898"},t.getFieldDecorator("name",{rules:[{required:!0}]})(H.default.createElement(D.default,{placeholder:"\u9898\u76ee\u6807\u9898"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u96be\u5ea6"},t.getFieldDecorator("difficulty",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u96be\u5ea6"}]})(H.default.createElement(g.default,{style:{minWidth:150}},[1,2,3].map(e=>H.default.createElement(Option,{key:e},H.default.createElement(C.default,{color:U.bulletinLevelClass[e]},U.leetcodeDifficculties[e]),"  "))))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u72b6\u6001"},t.getFieldDecorator("status",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u72b6\u6001"}]})(H.default.createElement(g.default,{style:{minWidth:150}},[0,1].map(e=>H.default.createElement(Option,{key:e},U.leetcodeStatus[e]," "))))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5206\u7c7b"},t.getFieldDecorator("type",{rules:[{required:!0,validator:U.skillsValidFunction}]})(H.default.createElement(x.default,{style:{width:"100%"},type:"LEETCODE"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u9891\u5ea6"},t.getFieldDecorator("frequency",{rules:[{required:!0,validator:U.positiveIntegerValidFunction}]})(H.default.createElement(D.default,{placeholder:"\u9891\u5ea6"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u6536\u85cf\u65e5\u671f"},t.getFieldDecorator("gmt_create",{rules:[{required:!0}]})(H.default.createElement(b.default,{showTime:!0,style:{width:"100%"},format:"YYYY-MM-DD HH:mm:ss",placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"url"},t.getFieldDecorator("url",{rules:[{required:!0,validator:U.urlValidFunction}]})(H.default.createElement(D.default,{placeholder:"\u4e0d\u80fd\u4e3a\u7a7a"}))))}})||w),K=(k=S.default.create(),k(F=class extends H.PureComponent{constructor(e){super(e),this.updateOkHandle=(()=>{var e=this.props,t=e.handleUpdate,a=e.form;a.validateFields((e,l)=>{e||(a.resetFields(),t(l))})})}transfer(e){return"undefined"==typeof e?[]:[e.first,e.second,e.third]}render(){var e=this.props,t=e.updateModalVisible,a=e.form,l=e.handleUpdateModalVisible,d=e.updateModalData;return H.default.createElement(v.default,{destroyOnClose:!0,title:"\u66f4\u65b0",visible:t,onOk:this.updateOkHandle,onCancel:()=>l(!1)},H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"id"},a.getFieldDecorator("id",{rules:[{required:!0}],initialValue:d.id})(H.default.createElement(D.default,{prefix:H.default.createElement(E.default,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"",readOnly:!0}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u6807\u9898"},a.getFieldDecorator("name",{rules:[{required:!0}],initialValue:d.name})(H.default.createElement(D.default,{placeholder:"\u9898\u76ee\u6807\u9898"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u96be\u5ea6"},a.getFieldDecorator("difficulty",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u96be\u5ea6"}],initialValue:U.leetcodeDifficculties[d.difficulty]})(H.default.createElement(g.default,{style:{minWidth:150}},[1,2,3].map(e=>H.default.createElement(Option,{key:e},H.default.createElement(C.default,{color:U.bulletinLevelClass[e]},U.leetcodeDifficculties[e]),"  "))))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u72b6\u6001"},a.getFieldDecorator("status",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u72b6\u6001"}],initialValue:U.leetcodeStatus[d.status]})(H.default.createElement(g.default,{style:{minWidth:150}},[0,1].map(e=>H.default.createElement(Option,{key:e},U.leetcodeStatus[e]," "))))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5206\u7c7b"},a.getFieldDecorator("type",{rules:[{required:!0,validator:U.skillsValidFunction}],initialValue:this.transfer(d.skill)})(H.default.createElement(x.default,{style:{width:"100%"},initdata:d.skill,type:"LEETCODE"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u9891\u5ea6"},a.getFieldDecorator("frequency",{rules:[{required:!0,validator:U.positiveIntegerValidFunction}],initialValue:d.frequency})(H.default.createElement(D.default,{placeholder:"\u9891\u5ea6"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u6536\u85cf\u65e5\u671f"},a.getFieldDecorator("gmt_create",{rules:[{required:!0}],initialValue:(0,L.default)(d.gmt_create)})(H.default.createElement(b.default,{showTime:!0,style:{width:"100%"},format:"YYYY-MM-DD HH:mm:ss",placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"}))),H.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5c01\u9762url"},a.getFieldDecorator("url",{rules:[{required:!0,validator:U.urlValidFunction}],initialValue:d.url})(H.default.createElement(D.default,{placeholder:"\u4e0d\u80fd\u4e3a\u7a7a"}))))}})||F),P=(M=(0,T.connect)(e=>{var t=e.data_leetcode,a=e.loading;return{data_leetcode:t,loading:a.models.data_leetcode}}),_=S.default.create(),M(O=_(O=class extends H.Component{constructor(){super(...arguments),this.state={selectedRows:[]},this.columns=[{title:"id",dataIndex:"id",sorter:!0,align:"center"},{title:"\u6807\u9898",dataIndex:"name",sorter:!0,align:"center"},{title:"\u5206\u7c7b",dataIndex:"skill",align:"center",render:(e,t)=>{var a=t.skill,l=a.id;return null!=a?H.default.createElement(y.default,{title:"["+a.first+"/"+a.second+"/"+a.third+"]"},H.default.createElement("span",null,"["+a.first+"]["+l+"]")):H.default.createElement(y.default,{title:"[-]"},H.default.createElement("span",null,"["+l+"]"))}},{title:"\u96be\u5ea6",dataIndex:"difficulty",align:"center",render:(e,t)=>{var a=t.difficulty;return H.default.createElement(C.default,{color:U.bulletinLevelClass[a]},U.leetcodeDifficculties[a])}},{title:"\u9891\u5ea6",dataIndex:"frequency",sorter:!0,align:"center"},,{title:"\u72b6\u6001",dataIndex:"status",align:"center",render:(e,t)=>{var a=t.status;return U.leetcodeStatus[a]}},{title:"\u65f6\u95f4",align:"center",render:(e,t)=>{var a=(0,L.default)(t.gmt_modified).format("YYYY-MM-DD HH:mm:ss"),l=(0,L.default)(t.gmt_create).format("YYYY-MM-DD HH:mm:ss"),d=H.default.createElement("table",null,H.default.createElement("tr",null,H.default.createElement("td",null,"\u521b\u5efa\u65f6\u95f4:",l)),H.default.createElement("tr",null,H.default.createElement("td",null,"\u6700\u540e\u66f4\u65b0:",a)));return H.default.createElement(h.default,{content:d},H.default.createElement(E.default,{type:"calendar",theme:"outlined"}))}},{title:"\u64cd\u4f5c",align:"center",render:(e,t)=>H.default.createElement(H.Fragment,null,H.default.createElement("a",{href:t.url,target:"_blank"},"\u67e5\u770b"),H.default.createElement(m.default,{type:"vertical"}),H.default.createElement("a",{onClick:()=>this.showUpdate(t)},"\u4fee\u6539"),H.default.createElement(m.default,{type:"vertical"}),H.default.createElement("a",{onClick:()=>this.dealDelete(t)},"\u5220\u9664"))}],this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,d=Object.keys(t).reduce((e,a)=>{var l=(0,f.default)({},e);return l[a]=(0,U.getValue)(t[a]),l},{}),r=(0,f.default)({currentPage:e.current,pageSize:e.pageSize},d);a.field&&(r.sorter=`${a.field}|${a.order}`),l({type:"data_leetcode/fetch",payload:r})}),this.changeSelect=(e=>{var t=this.props,a=(t.form,t.dispatch);a({type:"data_leetcode/updateClassificationType",payload:{type:e}}),a({type:"data_leetcode/getOption"})}),this.handleFormReset=(()=>{var e=this.props,t=e.form,a=e.dispatch;t.resetFields(),a({type:"data_leetcode/setFormValues",payload:{formValues:{type:"",first:"",second:"",third:""}}}),a({type:"data_leetcode/fetch"})}),this.handleSearch=(e=>{e.preventDefault();var t=this.props,a=t.dispatch,l=t.form;l.validateFields((e,t)=>{"undefined"==typeof t.type&&(t.type="");var l={};Object.keys(t).forEach(function(e){"undefined"!=typeof t[e]&&(l[e]=t[e])}),e||a({type:"data_leetcode/fetch",payload:l})})}),this.handleModalVisible=(e=>{var t=this.props.dispatch;"undefined"==typeof e&&(e=!1),t({type:"data_leetcode/setModalVisible",payload:!!e})}),this.handleAdd=(e=>{var t=this.props.dispatch;e.first=e.type[0],e.second=e.type[1],e.third=e.type[2],e.type="LEETCODE",e.gmt_create=e.gmt_create.format("YYYY-MM-DD HH:mm:ss"),t({type:"data_leetcode/add",payload:(0,f.default)({},e)})}),this.handleUpdateModalVisible=(e=>{var t=this.props.dispatch;"undefined"==typeof e&&(e=!1),t({type:"data_leetcode/setUpdateModalVisible",payload:{updateModalVisible:!!e}})}),this.handleUpdate=(e=>{var t=this.props.dispatch;v.default.confirm({title:"\u4fee\u6539\u9898\u76ee",content:"\u786e\u5b9a\u66f4\u65b0\u9898\u76ee["+e.name+"]["+e.id+"]\u5417?",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:()=>{e.first=e.type[0],e.second=e.type[1],e.third=e.type[2],e.type="LEETCODE",e.frequency=""+e.frequency,e.gmt_create=e.gmt_create.format("YYYY-MM-DD HH:mm:ss"),t({type:"data_leetcode/updateStep2",payload:(0,f.default)({},e)})}})}),this.handleMenuClick=(e=>{this.props.dispatch;var t=this.state.selectedRows;if(t)switch(e.key){case"remove":(0,R.openNotification)("info","\u8be5\u529f\u80fd\u6682\u672a\u5b9e\u73b0");break;default:break}}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})})}dealDelete(e){var t=this.props.dispatch;v.default.confirm({title:"\u5220\u9664\u9898\u76ee",content:"\u786e\u5b9a\u5220\u9664\u9898\u76ee["+e.name+"]\u5417?",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:()=>{t({type:"data_leetcode/delete",payload:e.id})}})}showUpdate(e){var t=this.props.dispatch;t({type:"data_leetcode/updateStep1",payload:{id:e.id}})}loadData(e){console.log(e);var t=this.props.dispatch,a=e.length,l={};3==a||(l=2==a?{name:"third",first:e[0].value,second:e[1].value}:1==a?{name:"second",first:e[0].value}:{name:"first"}),t({type:"data_leetcode/getOption",payload:l})}onChange(e,t,a){var l=this.props.dispatch,d=a.length;l(3==d?{type:"data_leetcode/setFormValues",payload:{formValues:{type:e,first:a[0].value,second:a[1].value,third:a[2].value}}}:2==d?{type:"data_leetcode/setFormValues",payload:{formValues:{type:e,first:a[0].value,second:a[1].value,third:""}}}:1==d?{type:"data_leetcode/setFormValues",payload:{formValues:{type:e,first:a[0].value,second:"",third:""}}}:{type:"data_leetcode/setFormValues",payload:{formValues:{type:e,first:"",second:"",third:""}}}),console.log(t,a)}renderForm(e,t){var a=this.props.form.getFieldDecorator;return H.default.createElement(S.default,{onSubmit:this.handleSearch,layout:"inline"},H.default.createElement(c.default,{gutter:{md:8,lg:24,xl:48}},H.default.createElement(p.default,{md:8,sm:24},H.default.createElement(A,{label:"\u5173\u952e\u5b57"},a("name")(H.default.createElement(D.default,{placeholder:"\u6a21\u7cca\u5339\u914d"})))),H.default.createElement(p.default,{md:8,sm:24},H.default.createElement(A,{label:"\u96be\u5ea6"},a("difficulty",{})(H.default.createElement(g.default,{style:{minWidth:150},allowClear:!0,onSelect:e=>this.changeSelect(e)},[1,2,3].map(e=>H.default.createElement(Option,{key:e},H.default.createElement(C.default,{color:U.bulletinLevelClass[e]},U.leetcodeDifficculties[e]),"  ")))))),H.default.createElement(p.default,{md:8,sm:24},H.default.createElement(A,{label:"\u72b6\u6001"},a("status",{})(H.default.createElement(g.default,{style:{minWidth:150},allowClear:!0,onSelect:e=>this.changeSelect(e)},[0,1].map(e=>H.default.createElement(Option,{key:e},U.leetcodeStatus[e],"  "))))))),H.default.createElement(c.default,{gutter:{md:8,lg:24,xl:48}},H.default.createElement(p.default,{md:15,sm:24},H.default.createElement(A,{label:"\u7c7b\u522b"},a("option")(H.default.createElement(u.default,{options:t,loadData:e=>this.loadData(e),onChange:(t,a)=>this.onChange(e,t,a),changeOnSelect:!0})))),H.default.createElement(p.default,{md:8,sm:24},H.default.createElement("span",{className:I.default.submitButtons},H.default.createElement(o.default,{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),H.default.createElement(o.default,{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}componentDidMount(){var e=this.props.dispatch;e({type:"data_leetcode/fetch"}),e({type:"data_leetcode/getOption"})}render(){var e=this.props,t=e.data_leetcode,a=t.list,l=t.pagination,d=t.modalVisible,u=t.updateModalVisible,c=t.updateModalData,p=t.options,f=t.formValues,m=e.loading,h=this.state.selectedRows,y={list:a,pagination:l},v={handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible},b={handleUpdate:this.handleUpdate,handleUpdateModalVisible:this.handleUpdateModalVisible},g=H.default.createElement(s.default,{onClick:this.handleMenuClick,selectedKeys:[]},H.default.createElement(s.default.Item,{key:"remove"},"\u5220\u9664"));return H.default.createElement(Y.default,{title:"\u7b97\u6cd5\u9898\u76ee\u7ba1\u7406"},H.default.createElement(n.default,{bordered:!1},H.default.createElement("div",{className:I.default.tableList},H.default.createElement("div",{className:I.default.tableListForm},this.renderForm(f.type,p)),H.default.createElement("div",{className:I.default.tableListOperator},H.default.createElement(o.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u65b0\u5efa"),h.length>0&&H.default.createElement("span",null,H.default.createElement(i.default,{overlay:g},H.default.createElement(o.default,null,"\u6279\u91cf\u64cd\u4f5c ",H.default.createElement(E.default,{type:"down"}))))),H.default.createElement(q.default,{selectedRows:h,loading:m,data:y,columns:this.columns,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange,rowKey:"id"}))),H.default.createElement(N,(0,r.default)({},v,{modalVisible:d})),H.default.createElement(K,(0,r.default)({},b,{updateModalVisible:u,updateModalData:c})))}})||O)||O),Q=P;t.default=Q}}]);