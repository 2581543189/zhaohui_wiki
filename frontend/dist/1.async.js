(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"5xoZ":function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("MVZn")),u=n(a("o0o1")),s=a("7Y5E"),c=a("+n12"),i={namespace:"data_user",state:{data:{list:[],pagination:{current:1,pageSize:10,total:0},modalVisible:!1}},effects:{fetch:u.default.mark(function e(t,a){var n,r,c,i;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,e.next=4,r(s.queryUsers,n);case 4:return i=e.sent,e.next=7,c({type:"save",payload:i});case 7:case"end":return e.stop()}},e,this)}),add:u.default.mark(function e(t,a){var n,r,i,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,t.callback,r=a.call,i=a.put,e.next=4,r(s.addUsers,n);case 4:return o=e.sent,e.next=7,i({type:"setModalVisible",payload:!1});case 7:return(0,c.openNotification)("success","\u65b0\u589e\u7528\u6237"+o.name+"["+o.id+"]\u6210\u529f"),e.next=10,i({type:"fetch",payload:{name:o.name,currentPage:1,pageSize:10}});case 10:case"end":return e.stop()}},e,this)}),delete:u.default.mark(function e(t,a){var n,r,i,o;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,i=a.put,e.next=4,r(s.deleteUser,n);case 4:return o=e.sent,(0,c.openNotification)("success","\u5220\u9664\u7528\u6237["+o.id+"]\u6210\u529f"),e.next=8,i({type:"fetch",payload:{currentPage:1,pageSize:10}});case 8:case"end":return e.stop()}},e,this)})},reducers:{save(e,t){return(0,r.default)({},e,{data:t.payload})},setModalVisible(e,t){return(0,r.default)({},e,{modalVisible:t.payload})}}};t.default=i},"7Y5E":function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.queryUsers=i,t.addUsers=l,t.deleteUser=p,t.managerUser=h;var r=n(a("o0o1")),u=n(a("yXPU")),s=(a("Qyje"),a("+n12"),n(a("t3Un"))),c="http://47.99.76.20/backend";function i(){return o.apply(this,arguments)}function o(){return o=(0,u.default)(r.default.mark(function e(){var t,a,n,u,i,o=arguments;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:{},console.log("queryUsers",t),a={current:1,pageSize:10},t.currentPage&&(a={current:t.currentPage,pageSize:t.pageSize}),n={method:"POST"},0!=Object.keys(t).length&&(n={method:"POST",body:t}),e.next=8,(0,s.default)(c+"/user/query",n);case 8:return u=e.sent,i={},i.pagination=a,i.pagination.total=u.count,i.list=u.rows.map(function(e,t,a){return e.key=e.id,e.role=parseInt(e.role),e}),e.abrupt("return",i);case 14:case"end":return e.stop()}},e,this)})),o.apply(this,arguments)}function l(){return d.apply(this,arguments)}function d(){return d=(0,u.default)(r.default.mark(function e(){var t,a,n,u=arguments;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=u.length>0&&void 0!==u[0]?u[0]:{},console.log("addUsers",t),a={method:"POST",body:t},e.next=5,(0,s.default)(c+"/user/add",a);case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}},e,this)})),d.apply(this,arguments)}function p(e){return f.apply(this,arguments)}function f(){return f=(0,u.default)(r.default.mark(function e(t){var a,n;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("deleteUser",t),a={method:"POST"},e.next=4,(0,s.default)(c+"/user/delete/"+t,a);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)})),f.apply(this,arguments)}function h(e){return y.apply(this,arguments)}function y(){return y=(0,u.default)(r.default.mark(function e(t){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)})),y.apply(this,arguments)}}}]);