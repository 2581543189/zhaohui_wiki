(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"5xoZ":function(e,a,t){"use strict";var n=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t("MVZn")),s=n(t("o0o1")),c=t("7Y5E"),u=t("+n12"),l={namespace:"data_user",state:{data:{list:[],pagination:{current:1,pageSize:10,total:0},modalVisible:!1}},effects:{fetch:s.default.mark(function e(a,t){var n,r,u,l;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,u=t.put,e.next=4,r(c.queryUsers,n);case 4:return l=e.sent,e.next=7,u({type:"save",payload:l});case 7:case"end":return e.stop()}},e,this)}),add:s.default.mark(function e(a,t){var n,r,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,a.callback,r=t.call,l=t.put,e.next=4,r(c.addUsers,n);case 4:return d=e.sent,e.next=7,l({type:"setModalVisible",payload:!1});case 7:return(0,u.openNotification)("success","\u65b0\u589e\u7528\u6237"+d.name+"["+d.id+"]\u6210\u529f"),e.next=10,l({type:"fetch",payload:{name:d.name,currentPage:1,pageSize:10}});case 10:case"end":return e.stop()}},e,this)}),delete:s.default.mark(function e(a,t){var n,r,l,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,l=t.put,e.next=4,r(c.deleteUser,n);case 4:return d=e.sent,(0,u.openNotification)("success","\u5220\u9664\u7528\u6237["+d.id+"]\u6210\u529f"),e.next=8,l({type:"fetch",payload:{currentPage:1,pageSize:10}});case 8:case"end":return e.stop()}},e,this)})},reducers:{save(e,a){return(0,r.default)({},e,{data:a.payload})},setModalVisible(e,a){return(0,r.default)({},e,{modalVisible:a.payload})}}};a.default=l}}]);