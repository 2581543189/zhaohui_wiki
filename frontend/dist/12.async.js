(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"1JeT":function(e,t,a){"use strict";var l=a("TqRt"),r=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=l(a("pVnL"));a("IzEo");var s=l(a("bx4M"));a("qVdP");var n=l(a("jsC+"));a("lUTK");var o=l(a("BvKs"));a("14J3");var i=l(a("BMrR"));a("+L6B");var u=l(a("2/Rp"));a("jCWc");var c=l(a("kPKH")),f=l(a("MVZn"));a("/zsF");var p=l(a("PArb"));a("5Dmo");var m=l(a("3S7+"));a("Telt");var h=l(a("Tckk"));a("2qtc");var b=l(a("kLXV"));a("OaEy");var v=l(a("2fM7"));a("5NDa");var g=l(a("5rEg"));a("Pwec");var y=l(a("CtXQ"));a("y8nQ");var E,w,C,_=l(a("Vl3Y")),k=l(a("zHco")),V=l(a("CkN6")),F=r(a("q1tI")),S=a("MuoO"),x=l(a("wd/R")),M=a("+n12"),R=l(a("HEbw")),T=a("zvKM"),L=l(a("iQSN")),I=_.default.Item,D=function(e){var t=Object.keys(e),a=t.map(function(t){var a=e[t];return a}),l=a.join(",");return l},K=_.default.create()(e=>{var t=e.modalVisible,a=e.form,l=e.handleAdd,r=e.handleModalVisible,d=()=>{a.validateFields((e,t)=>{if(!e){a.resetFields();var r=R.default.createHash("md5");t.password=r.update(t.password).digest("hex"),l(t)}})},s=(e,t,l)=>{t&&t!==a.getFieldValue("password")?l("\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"):l()};return F.default.createElement(b.default,{destroyOnClose:!0,title:"\u65b0\u5efa\u7528\u6237",visible:t,onOk:d,onCancel:()=>r(!1)},F.default.createElement(I,{labelCol:{span:5},wrapperCol:{span:15},label:"\u7528\u6237\u540d"},a.getFieldDecorator("name",{rules:[{required:!0,validator:T.normalValidFunction}]})(F.default.createElement(g.default,{prefix:F.default.createElement(y.default,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}))),F.default.createElement(I,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5bc6\u7801"},a.getFieldDecorator("password",{rules:[{required:!0,validator:T.normalValidFunction}]})(F.default.createElement(g.default,{prefix:F.default.createElement(y.default,{type:"key",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",type:"password"}))),F.default.createElement(I,{labelCol:{span:5},wrapperCol:{span:15},label:"\u786e\u8ba4\u5bc6\u7801"},a.getFieldDecorator("password2",{rules:[{required:!0,validator:s}]})(F.default.createElement(g.default,{prefix:F.default.createElement(y.default,{type:"key",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u518d\u6b21\u8f93\u5165\u5bc6\u7801",type:"password"}))),F.default.createElement(I,{labelCol:{span:5},wrapperCol:{span:15},label:"\u89d2\u8272"},a.getFieldDecorator("role",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u89d2\u8272"}]})(F.default.createElement(v.default,{style:{minWidth:150}},[0,1,2].map(e=>F.default.createElement(Option,{key:e},T.roles[e],"  ",F.default.createElement(y.default,{type:T.rolesIcon[e],style:{color:"rgba(0,0,0,.25)"},theme:"twoTone"})," "))))),F.default.createElement(I,{labelCol:{span:5},wrapperCol:{span:15},label:"\u5934\u50cfurl"},a.getFieldDecorator("avatar",{rules:[{min:5,max:100}]})(F.default.createElement(g.default,{prefix:F.default.createElement(y.default,{type:"idcard",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u8bf7\u8f93\u5165url"}))))}),N=(E=(0,S.connect)(e=>{var t=e.data_user,a=e.loading;return{data_user:t,loading:a.models.rule}}),w=_.default.create(),E(C=w(C=class extends F.Component{constructor(){super(...arguments),this.state={updateModalVisible:!1,selectedRows:[],formValues:{},updateFormValues:{}},this.columns=[{title:"id",dataIndex:"id",sorter:!0,align:"center"},{title:"\u7528\u6237\u540d",dataIndex:"name",sorter:!0,align:"center"},{title:"\u5bc6\u7801",sorter:!0,dataIndex:"password",align:"center"},{title:"\u89d2\u8272",sorter:!0,dataIndex:"role",align:"center",filters:[{text:T.roles[0],value:0},{text:T.roles[1],value:1},{text:T.roles[2],value:2}],render(e){return F.default.createElement("span",null,T.roles[e],F.default.createElement(y.default,{type:T.rolesIcon[e],style:{color:"rgba(0,0,0,.25)"},theme:"twoTone"}))}},{title:"\u5934\u50cfurl",sorter:!0,dataIndex:"avatar",align:"center",render(e){return"undefined"==typeof e||""===e?F.default.createElement(m.default,{title:""},F.default.createElement(h.default,{icon:"user"})):F.default.createElement(m.default,{title:e},F.default.createElement(h.default,{src:e}))}},{title:"\u65f6\u95f4\u6233",sorter:!0,dataIndex:"timestamp",align:"center",render(e){return(0,x.default)(e).format("YYYY-MM-DD HH:mm:ss")}},{title:"\u64cd\u4f5c",align:"center",render:(e,t)=>F.default.createElement(F.Fragment,null,F.default.createElement("a",{onClick:()=>(0,M.openNotification)("info","\u8be5\u529f\u80fd\u6682\u672a\u5b9e\u73b0")},"\u4fee\u6539"),F.default.createElement(p.default,{type:"vertical"}),F.default.createElement("a",{onClick:()=>this.dealDelete(t)},"\u5220\u9664"))}],this.handleUpdateModalVisible=((e,t)=>{this.setState({updateModalVisible:!!e,updateFormValues:t||{}})}),this.handleFormReset=(()=>{var e=this.props,t=e.form,a=e.dispatch;t.resetFields(),this.setState({formValues:{}}),a({type:"data_user/fetch",payload:{}})}),this.handleSearch=(e=>{e.preventDefault();var t=this.props,a=t.dispatch,l=t.form;l.validateFields((e,t)=>{if(!e){var l=(0,f.default)({},t);this.setState({formValues:l}),a({type:"data_user/fetch",payload:l})}})}),this.handleMenuClick=(e=>{this.props.dispatch;var t=this.state.selectedRows;if(t)switch(e.key){case"remove":(0,M.openNotification)("info","\u8be5\u529f\u80fd\u6682\u672a\u5b9e\u73b0");break;case"manager":(0,M.openNotification)("info","\u8be5\u529f\u80fd\u6682\u672a\u5b9e\u73b0");default:break}}),this.handleSelectRows=(e=>{this.setState({selectedRows:e})}),this.handleStandardTableChange=((e,t,a)=>{var l=this.props.dispatch,r=this.state.formValues,d=Object.keys(t).reduce((e,a)=>{var l=(0,f.default)({},e);return l[a]=D(t[a]),l},{}),s=(0,f.default)({currentPage:e.current,pageSize:e.pageSize},r,d);a.field&&(s.sorter=`${a.field}_${a.order}`),l({type:"data_user/fetch",payload:s})}),this.handleModalVisible=(e=>{var t=this.props.dispatch;"undefined"==typeof e&&(e=!1),t({type:"data_user/setModalVisible",payload:!!e})}),this.handleAdd=(e=>{var t=this.props.dispatch;t({type:"data_user/add",payload:(0,f.default)({},e)})})}dealDelete(e){var t=this.props.dispatch;b.default.confirm({title:"\u5220\u9664\u7528\u6237",content:"\u786e\u5b9a\u5220\u9664\u7528\u6237"+e.name+"["+e.id+"]\u5417?",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:()=>{t({type:"data_user/delete",payload:e.id})}})}componentDidMount(){var e=this.props.dispatch;e({type:"data_user/fetch"})}renderForm(){var e=this.props.form.getFieldDecorator;return F.default.createElement(_.default,{onSubmit:this.handleSearch,layout:"inline"},F.default.createElement(i.default,{gutter:{md:8,lg:24,xl:48}},F.default.createElement(c.default,{md:8,sm:24},F.default.createElement(I,{label:"\u7528\u6237\u540d"},e("name")(F.default.createElement(g.default,{placeholder:"\u8bf7\u8f93\u5165"})))),F.default.createElement(c.default,{md:8,sm:24},F.default.createElement("span",{className:L.default.submitButtons},F.default.createElement(u.default,{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),F.default.createElement(u.default,{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}render(){var e=this.props,t=e.data_user,a=t.data,l=t.modalVisible,r=e.loading,i=this.state,c=i.selectedRows,f=(i.updateModalVisible,i.updateFormValues,{handleAdd:this.handleAdd,handleModalVisible:this.handleModalVisible}),p=F.default.createElement(o.default,{onClick:this.handleMenuClick,selectedKeys:[]},F.default.createElement(o.default.Item,{key:"remove"},"\u5220\u9664"),F.default.createElement(o.default.Item,{key:"manager"},"\u6388\u4e88\u7ba1\u7406\u5458"));return F.default.createElement(k.default,{title:"\u7528\u6237\u4fe1\u606f\u7ba1\u7406"},F.default.createElement(s.default,{bordered:!1},F.default.createElement("div",{className:L.default.tableList},F.default.createElement("div",{className:L.default.tableListForm},this.renderForm()),F.default.createElement("div",{className:L.default.tableListOperator},F.default.createElement(u.default,{icon:"plus",type:"primary",onClick:()=>this.handleModalVisible(!0)},"\u65b0\u5efa"),c.length>0&&F.default.createElement("span",null,F.default.createElement(n.default,{overlay:p},F.default.createElement(u.default,null,"\u6279\u91cf\u64cd\u4f5c ",F.default.createElement(y.default,{type:"down"}))))),F.default.createElement(V.default,{selectedRows:c,loading:r,data:a,columns:this.columns,onSelectRow:this.handleSelectRows,onChange:this.handleStandardTableChange}))),F.default.createElement(K,(0,d.default)({},f,{modalVisible:l})))}})||C)||C),O=N;t.default=O},CkN6:function(e,t,a){"use strict";var l=a("284h"),r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("g9YV");var d=r(a("wCAj"));a("fOrg");var s=r(a("+KLJ")),n=r(a("MVZn")),o=l(a("q1tI")),i=r(a("rZM1"));function u(e){var t=[];return e.forEach(e=>{e.needTotal&&t.push((0,n.default)({},e,{total:0}))}),t}class c extends o.PureComponent{constructor(e){super(e),this.handleRowSelectChange=((e,t)=>{var a=this.state.needTotalList;a=a.map(e=>(0,n.default)({},e,{total:t.reduce((t,a)=>t+parseFloat(a[e.dataIndex],10),0)}));var l=this.props.onSelectRow;l&&l(t),this.setState({selectedRowKeys:e,needTotalList:a})}),this.handleTableChange=((e,t,a)=>{var l=this.props.onChange;l&&l(e,t,a)}),this.cleanSelectedKeys=(()=>{this.handleRowSelectChange([],[])});e.columns;this.state={selectedRowKeys:[]}}static getDerivedStateFromProps(e){if(0===e.selectedRows.length){var t=u(e.columns);return{selectedRowKeys:[],needTotalList:t}}return null}render(){var e=this.state,t=e.selectedRowKeys,a=(e.needTotalList,this.props),l=a.data,r=l.list,u=l.pagination,c=a.loading,f=a.columns,p=a.rowKey,m=(0,n.default)({showSizeChanger:!0,showQuickJumper:!0,showTotal:e=>{return`\u603b\u8ba1: ${e} \u9879`}},u),h={selectedRowKeys:t,onChange:this.handleRowSelectChange,getCheckboxProps:e=>({disabled:e.disabled})};return o.default.createElement("div",{className:i.default.standardTable},o.default.createElement("div",{className:i.default.tableAlert},o.default.createElement(s.default,{message:o.default.createElement(o.Fragment,null,"\u5df2\u9009\u62e9 ",o.default.createElement("a",{style:{fontWeight:600}},t.length)," \u9879\xa0\xa0",o.default.createElement("a",{onClick:this.cleanSelectedKeys,style:{marginLeft:24}},"\u6e05\u7a7a")),type:"info",showIcon:!0})),o.default.createElement(d.default,{loading:c,rowKey:p||"key",rowSelection:h,dataSource:r,columns:f,pagination:m,onChange:this.handleTableChange}))}}var f=c;t.default=f},iQSN:function(e,t,a){e.exports={tableList:"antd-pro_pages_-data_-table-list-tableList",tableListOperator:"antd-pro_pages_-data_-table-list-tableListOperator",tableListForm:"antd-pro_pages_-data_-table-list-tableListForm",submitButtons:"antd-pro_pages_-data_-table-list-submitButtons"}},rZM1:function(e,t,a){e.exports={standardTable:"antd-pro_components_-standard-table_index-standardTable",tableAlert:"antd-pro_components_-standard-table_index-tableAlert"}}}]);