(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{"S/WG":function(e,t,a){e.exports={coverCardList:"antd-pro_pages_-workbench_-book-coverCardList",card:"antd-pro_pages_-workbench_-book-card",cardItemContent:"antd-pro_pages_-workbench_-book-cardItemContent",avatarList:"antd-pro_pages_-workbench_-book-avatarList",cardList:"antd-pro_pages_-workbench_-book-cardList",tableListForm:"antd-pro_pages_-workbench_-book-tableListForm",submitButtons:"antd-pro_pages_-workbench_-book-submitButtons"}},XWDf:function(e,t,a){"use strict";var l=a("TqRt"),r=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("14J3");var n=l(a("BMrR"));a("jCWc");var d=l(a("kPKH")),o=l(a("pVnL"));a("5NDa");var c=l(a("5rEg"));a("Mwp2");var s=l(a("VXEj"));a("MXD1");var u=l(a("CFYs"));a("IzEo");var i=l(a("bx4M"));a("/zsF");var f=l(a("PArb"));a("+L6B");var m=l(a("2/Rp"));a("+BJd");var p=l(a("mr32"));a("Pwec");var h=l(a("CtXQ"));a("y8nQ");var b,g,E,v=l(a("Vl3Y")),y=l(a("JA3D")),_=r(a("q1tI")),k=a("MuoO"),w=l(a("S/WG")),x=v.default.Item,F={wrapperCol:{xs:{span:24},sm:{span:24},md:{span:12}}},L=e=>{var t=e.type,a=e.text,l=e.badge;return _.default.createElement("span",null,_.default.createElement(h.default,{type:t,style:{marginRight:8}}),a,l?_.default.createElement(p.default,{color:"#2db7f5"},l):null)},C=(b=v.default.create({}),g=(0,k.connect)(e=>{var t=e.workbench_index,a=e.loading;return{workbench_index:t,loading:a}}),b(E=g(E=class extends _.Component{constructor(){super(...arguments),this.handleSearch=(e=>{e.preventDefault();var t=this.props,a=t.dispatch,l=t.form;l.validateFields((e,t)=>{if(!e){var l=this.getDataFromForm(t);l.pagination={current:1,pageSize:8,total:0},a({type:"workbench_index/book_fetch",payload:l})}})})}componentWillMount(){var e=this.props.dispatch;e({type:"workbench_index/book_fetch"})}handleFormReset(){var e=this.props,t=e.form,a=e.dispatch;t.resetFields(),a({type:"workbench_index/book_fetch",payload:{name:"",first:"",second:"",third:""}})}getDataFromForm(e){e.type?(e.first=e.type[0]?e.type[0]:"",e.second=e.type[1]?e.type[1]:"",e.third=e.type[2]?e.type[2]:""):(e.first="",e.second="",e.third="");var t={};return Object.keys(e).forEach(function(a){"undefined"!=typeof e[a]&&(t[a]=e[a])}),t}fetchMore(e){var t=this.props,a=t.dispatch,l=t.form;l.validateFields((t,l)=>{if(!t){var r=this.getDataFromForm(l);r.pagination={current:e.current+1,pageSize:10,total:e.total},r.append=!0,a({type:"workbench_index/book_fetch",payload:r})}})}render(){var e=this.props,t=e.form,a=e.workbench_index,l=e.loading,r=t.getFieldDecorator,b=a.book,g=b.list,E=b.pagination,k=b.hasNext?_.default.createElement("div",{style:{textAlign:"center",marginTop:16}},_.default.createElement(m.default,{onClick:()=>{this.fetchMore(E)},style:{paddingLeft:48,paddingRight:48}},l.effects["workbench_index/book_fetch"]?_.default.createElement("span",null,_.default.createElement(h.default,{type:"loading"})," \u52a0\u8f7d\u4e2d..."):"\u52a0\u8f7d\u66f4\u591a")):null,C=g?_.default.createElement(s.default,{rowKey:"id",loading:l.effects["workbench_index/book_fetch"],loadMore:k,grid:{gutter:24,xl:4,lg:3,md:3,sm:2,xs:1},dataSource:g,renderItem:(e,t)=>_.default.createElement(s.default.Item,null,_.default.createElement(i.default,{className:w.default.card,hoverable:!0,cover:_.default.createElement("img",{alt:e.name,src:e.img,style:{height:"280px",padding:"0 10%"}}),actions:[_.default.createElement(L,{type:"eye",text:"\u67e5\u770b\u7b14\u8bb0"}),_.default.createElement(L,{type:"star",text:"\u8c46\u74e3\u8bc4\u5206:",badge:e.score})]},_.default.createElement(i.default.Meta,{title:_.default.createElement(_.Fragment,null,t+1,_.default.createElement(f.default,{type:"vertical"}),e.name)}),_.default.createElement("div",{className:w.default.cardItemContent},_.default.createElement("div",{className:w.default.avatarList},_.default.createElement(p.default,null,"\u9605\u8bfb\u8fdb\u5ea6"),_.default.createElement(u.default,{percent:parseInt(100*e.current/e.count),size:"small",style:{width:"60%"}})))))}):null;return _.default.createElement(_.Fragment,null,_.default.createElement(i.default,{bordered:!1},_.default.createElement("div",{className:w.default.tableListForm},_.default.createElement(v.default,{layout:"inline",onSubmit:this.handleSearch},_.default.createElement(n.default,{gutter:{md:8,lg:24,xl:48}},_.default.createElement(d.default,{md:8,sm:24},_.default.createElement(x,(0,o.default)({},F,{label:"\u540d\u79f0"}),r("name",{})(_.default.createElement(c.default,{placeholder:"\u6a21\u7cca\u5339\u914d",style:{width:"100%"}})))),_.default.createElement(d.default,{md:8,sm:24},_.default.createElement(x,(0,o.default)({},F,{label:"\u5206\u7c7b"}),r("type",{})(_.default.createElement(y.default,{style:{width:"100%"}}))))),_.default.createElement(n.default,null,_.default.createElement(d.default,{md:8,sm:24},_.default.createElement("span",{className:w.default.submitButtons},_.default.createElement(m.default,{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),_.default.createElement(m.default,{style:{marginLeft:8},onClick:()=>{this.handleFormReset()}},"\u91cd\u7f6e"))))))),_.default.createElement("div",{className:w.default.cardList,style:{marginTop:24}},C))}})||E)||E),M=C;t.default=M}}]);