(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28],{kwOM:function(e,t,a){"use strict";var l=a("TqRt"),d=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("pVnL"));a("qVdP");var n=l(a("jsC+"));a("Pwec");var o=l(a("CtXQ"));a("lUTK");var s=l(a("BvKs"));a("14J3");var i=l(a("BMrR"));a("+L6B");var c=l(a("2/Rp"));a("jCWc");var h=l(a("kPKH")),p=l(a("MVZn"));a("/zsF");var u=l(a("PArb"));a("Q9mQ");var f=l(a("diRs"));a("Telt");var m=l(a("Tckk"));a("2qtc");var v=l(a("kLXV"));a("5NDa");var y=l(a("5rEg"));a("iQDF");var g=l(a("+eQT"));a("8dk+");var b=l(a("eZ87"));a("OaEy");var k=l(a("2fM7"));a("y8nQ");var E=l(a("Vl3Y"));a("IzEo");var M,w,C,_,S,V=l(a("bx4M")),B=l(a("zHco")),D=l(a("CkN6")),F=d(a("q1tI")),Y=a("MuoO"),O=l(a("wd/R")),x=a("+n12"),R=l(a("iQSN")),T=a("zvKM"),H=V.default.Meta,A=E.default.Item,I=(M=E.default.create(),M(w=class extends F.Component{constructor(e){super(e),this.okHandle=(()=>{var e=this.props.form;e.validateFields((t,a)=>{t||(e.resetFields(),this.handleAdd(a))})}),this.handleAddChange=(e=>{var t=this.props.dispatch;t({type:"data_note/getOneBook",payload:{name:e}})}),this.handleBookSearch=this.props.handleBookSearch,this.handleModalVisible=this.props.handleModalVisible,this.handleAdd=this.props.handleAdd,this.dispatch=this.props.dispatch}render(){var e=this.props,t=e.form,a=e.options,l=e.modalVisible,d=e.addBook,r=(0,T.dataToOptionsBook)(a);return F.default.createElement(v.default,{destroyOnClose:!0,title:"\u65b0\u5efa\u7b14\u8bb0",visible:l,onOk:this.okHandle,onCancel:()=>this.handleModalVisible(!1)},F.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u4e66\u7c4d"},t.getFieldDecorator("bookName",{rules:[{required:!0}]})(F.default.createElement(k.default,{showSearch:!0,placeholder:"\u4e66\u7c4d\u540d\u79f0",showArrow:!1,filterOption:!1,onSearch:e=>this.handleBookSearch(e),onChange:e=>this.handleAddChange(e),notFoundContent:null,style:{width:"100%"}},r))),F.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u8fdb\u5ea6"},t.getFieldDecorator("current",{rules:[{required:!0}]})(F.default.createElement(b.default,{min:d.current?d.current:0,max:d.count>0?d.count:100,disabled:d.count<0}))),F.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"\u65e5\u671f"},t.getFieldDecorator("gmt_create",{rules:[{required:!0}]})(F.default.createElement(g.default,{showTime:!0,style:{width:"100%"},format:"YYYY-MM-DD HH:mm:ss",placeholder:"\u8bf7\u9009\u62e9\u65f6\u95f4"}))),F.default.createElement(A,{labelCol:{span:5},wrapperCol:{span:15},label:"url"},t.getFieldDecorator("url",{rules:[{required:!0,validator:T.urlValidFunction}]})(F.default.createElement(y.default,{placeholder:"url"}))))}})||w),N=(C=(0,Y.connect)(e=>{var t=e.data_note,a=e.loading;return{data_note:t,loading:a.models.data_note}}),_=E.default.create(),C(S=_(S=class extends F.Component{constructor(){super(...arguments),this.state={selectedRows:[]},this.columns=[{title:"id",dataIndex:"id",sorter:!0,align:"center"},{title:"\u4e66\u7c4d",sorter:!0,dataIndex:"book",align:"center",render:(e,t)=>{var a=t.book,l=a.img,d="\u300a"+a.name+"\u300b",r="--"+a.author,n=d.length>=10?d.substr(0,10)+"...":d,o=F.default.createElement(V.default,{hoverable:!0,style:{width:200},cover:F.default.createElement("img",{alt:"example",src:l})},F.default.createElement(H,{title:d,description:r}));return F.default.createElement("span",null,F.default.createElement(f.default,{content:o,placement:"right"},F.default.createElement(m.default,{src:l})),F.default.createElement(u.default,{type:"vertical"}),n)}},{title:"\u521b\u5efa\u65e5\u671f",sorter:!0,dataIndex:"gmt_create",align:"center",render(e){return(0,O.default)(e).format("YYYY-MM-DD HH:mm:ss")}},{title:"\u8fdb\u5ea6",dataIndex:"current",align:"center"},{title:"\u65f6\u95f4\u6233",sorter:!0,dataIndex:"gmt_modified",align:"center",render(e){return(0,O.default)(e).format("YYYY-MM-DD HH:mm:ss")}},{title:"\u64cd\u4f5c",align:"center",render:(e,t)=>F.default.createElement(F.Fragment,null,F.default.createElement("a",{href:t.url,target:"_blank"},"\u67e5\u770b"),F.default.createElement(u.default,{type:"vertical"}),F.default.createElement("a",{onClick:()=>this.dealDelete(t)},"\u5220\u9664"))}],this.handleMenuClick=(e=>{this.props.dispatch;var t=this.state.selectedRows;if(t)switch(e.key){case"remove":(0,x.openNotification)("info","\u8be5\u529f\u80fd\u6682\u672a\u5b9e\u73b0");break;default:break}}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,d=Object.keys(t).reduce((e,a)=>{var l=(0,p.default)({},e);return l[a]=(0,T.getValue)(t[a]),l},{}),r=(0,p.default)({currentPage:e.current,pageSize:e.pageSize},d);a.field&&(r.sorter=`${a.field}|${a.order}`),l({type:"data_note/fetch",payload:r})}),this.handleSearch=(e=>{e.preventDefault();var t=this.props,a=t.dispatch,l=t.form;l.validateFields((e,t)=>{if(!e){var l={};Object.keys(t).forEach(function(e){"undefined"!=typeof t[e]&&(l[e]=t[e])}),a({type:"data_note/fetch",payload:l})}})}),this.handleFormReset=(()=>{var e=this.props,t=e.form,a=e.dispatch;t.resetFields(),a({type:"data_note/setFormValues",payload:{formValues:{name:""}}}),a({type:"data_note/setOptions",payload:{options:[]}}),a({type:"data_note/fetch"})}),this.handleAdd=(e=>{var t=this.props.dispatch;e.gmt_create=e.gmt_create.format("YYYY-MM-DD HH:mm:ss"),t({type:"data_note/add",payload:(0,p.default)({},e)})}),this.handleModalVisible=(e=>{var t=this.props.dispatch;"undefined"==typeof e&&(e=!1),t({type:"data_note/setModalVisible",payload:!!e})}),this.handleUpdateModalVisible=(e=>{var t=this.props.dispatch;"undefined"==typeof e&&(e=!1),t({type:"data_note/setUpdateModalVisible",payload:{updateModalVisible:!!e}})}),this.handleUpdate=(e=>{var t=this.props.dispatch;v.default.confirm({title:"\u4fee\u6539\u7b14\u8bb0",content:"\u786e\u5b9a\u66f4\u65b0\u7b14\u8bb0["+e.id+"]\u5417?",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:()=>{e.gmt_create=e.gmt_create.format("YYYY-MM-DD HH:mm:ss"),t({type:"data_note/updateStep2",payload:(0,p.default)({},e)})}})})}componentDidMount(){var e=this.props.dispatch;e({type:"data_note/fetch"})}handleBookSearch(e){var t=this.props.dispatch;t({type:"data_note/getBooks",payload:{name:e}})}handleBookChange(e){console.log("handleBookChange",e)}renderForm(e,t){var a=this.props.form.getFieldDecorator,l=(0,T.dataToOptionsBook)(t);return F.default.createElement(E.default,{onSubmit:this.handleSearch,layout:"inline"},F.default.createElement(i.default,{gutter:{md:8,lg:24,xl:48}},F.default.createElement(h.default,{md:8,sm:24},F.default.createElement(A,{label:"\u4e66\u7c4d"},a("name")(F.default.createElement(k.default,{showSearch:!0,placeholder:"\u4e66\u7c4d\u540d\u79f0",showArrow:!1,filterOption:!1,onSearch:e=>this.handleBookSearch(e),onChange:e=>this.handleBookChange(e),notFoundContent:null},l)))),F.default.createElement(h.default,{md:8,sm:24},F.default.createElement("span",{className:R.default.submitButtons},F.default.createElement(c.default,{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),F.default.createElement(c.default,{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}showUpdate(e){var t=this.props.dispatch;t({type:"data_note/updateStep1",payload:{id:e.id}})}dealDelete(e){var t=this.props.dispatch;v.default.confirm({title:"\u5220\u9664\u7b14\u8bb0",content:"\u786e\u5b9a\u5220\u9664\u7b14\u8bb0["+e.id+"]\u5417?",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:()=>{t({type:"data_note/delete",payload:e.id})}})}render(){var e=this.props,t=e.data_note,a=t.list,l=t.pagination,d=t.formValues,i=t.options,h=t.modalVisible,p=t.addBook,u=(t.updateModalData,t.updateModalVisible,e.loading),f=this.state.selectedRows,m={list:a,pagination:l},v=F.default.createElement(s.default,{onClick:this.handleMenuClick,selectedKeys:[]},F.default.createElement(s.default.Item,{key:"remove"},"\u5220\u9664")),y={handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible,handleBookSearch:this.handleBookSearch,options:i,dispatch:this.props.dispatch,addBook:p};this.handleUpdate,this.handleUpdateModalVisible,this.handleBookSearch,this.props.dispatch;return F.default.createElement(B.default,{title:"\u7b14\u8bb0\u7ba1\u7406"},F.default.createElement(V.default,{bordered:!1},F.default.createElement("div",{className:R.default.tableList},F.default.createElement("div",{className:R.default.tableListForm},this.renderForm(d.name,i)),F.default.createElement("div",{className:R.default.tableListOperator},F.default.createElement(c.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u65b0\u5efa"),f.length>0&&F.default.createElement("span",null,F.default.createElement(n.default,{overlay:v},F.default.createElement(c.default,null,"\u6279\u91cf\u64cd\u4f5c ",F.default.createElement(o.default,{type:"down"}))))),F.default.createElement(D.default,{selectedRows:f,loading:u,data:m,columns:this.columns,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange,rowKey:"id"}))),F.default.createElement(I,(0,r.default)({},y,{modalVisible:h})))}})||S)||S),q=N;t.default=q}}]);