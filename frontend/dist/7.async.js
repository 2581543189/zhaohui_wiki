(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{JTVl:function(e,a,t){"use strict";var r=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("o0o1")),s=r(t("MVZn")),o=t("7Y5E"),l=t("+n12"),d={namespace:"data_leetcode",state:{list:[],pagination:{current:1,pageSize:10,total:0},modalVisible:!1,updateModalVisible:!1,updateModalData:{id:0,name:"-",difficulty:1,status:0,frenquency:0,first:"",second:"",third:"",url:"",gmt_create:""},options:[],formValues:{}},effects:{fetch:n.default.mark(function e(a,t){var r,d,i,u,c,p,f;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,d=t.call,i=t.put,u=t.select,"undefined"==typeof r&&(r={}),e.next=5,u(e=>e.data_leetcode.formValues);case 5:return c=e.sent,p=(0,s.default)({},c,r),p["type"]="LEETCODE",e.next=10,d(o.queryLeetcode,p);case 10:if(f=e.sent,1==f.error){e.next=16;break}return e.next=14,i({type:"save",payload:f});case 14:e.next=17;break;case 16:(0,l.openNotification)("error",f.message);case 17:case"end":return e.stop()}},e,this)}),add:n.default.mark(function e(a,t){var r,d,i,u,c,p;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,a.callback,d=t.call,i=t.put,u=t.select,e.next=4,d(o.addLeetcode,r);case 4:if(c=e.sent,1==c.error){e.next=16;break}return e.next=8,i({type:"setModalVisible",payload:!1});case 8:return(0,l.openNotification)("success","\u65b0\u589e\u9898\u76ee["+c.data.name+"]\u6210\u529f"),e.next=11,u(e=>e.data_leetcode.formValues);case 11:return p=e.sent,e.next=14,i({type:"fetch",payload:(0,s.default)({name:c.name,currentPage:1,pageSize:10},p)});case 14:e.next=17;break;case 16:(0,l.openNotification)("error",c.message);case 17:case"end":return e.stop()}},e,this)}),delete:n.default.mark(function e(a,t){var r,d,i,u,c,p;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,d=t.call,i=t.put,u=t.select,e.next=4,d(o.deleteLeetcode,r);case 4:if(c=e.sent,1==c.error){e.next=14;break}return(0,l.openNotification)("success","\u5220\u9664\u9898\u76ee["+c.data.id+"]\u6210\u529f"),e.next=9,u(e=>e.data_leetcode.formValues);case 9:return p=e.sent,e.next=12,i({type:"fetch",payload:(0,s.default)({currentPage:1,pageSize:10},p)});case 12:e.next=15;break;case 14:(0,l.openNotification)("error",c.message);case 15:case"end":return e.stop()}},e,this)}),updateStep1:n.default.mark(function e(a,t){var r,s,d,i,u;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,s=t.call,d=t.put,i={id:r.id},e.next=5,s(o.queryLeetcode,i);case 5:if(u=e.sent,1==u.error){e.next=11;break}return e.next=9,d({type:"setUpdateModalVisible",payload:{updateModalVisible:!0,updateModalData:u.list[0]}});case 9:e.next=12;break;case 11:(0,l.openNotification)("error",u.message);case 12:case"end":return e.stop()}},e,this)}),updateStep2:n.default.mark(function e(a,t){var r,d,i,u,c,p;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,d=t.call,i=t.put,u=t.select,e.next=4,d(o.updateLeetcode,r);case 4:if(c=e.sent,1==c.error){e.next=16;break}return e.next=8,i({type:"setUpdateModalVisible",payload:{updateModalVisible:!1,updateModalData:{id:0,first:"-",second:"-",third:"-"}}});case 8:return e.next=10,u(e=>e.data_leetcode.formValues);case 10:return p=e.sent,e.next=13,i({type:"fetch",payload:(0,s.default)({currentPage:1,pageSize:10},p)});case 13:(0,l.openNotification)("success","\u66f4\u65b0\u9898\u76ee["+c.data.id+"]\u6210\u529f"),e.next=17;break;case 16:(0,l.openNotification)("error",c.message);case 17:case"end":return e.stop()}},e,this)}),getOption:n.default.mark(function e(a,t){var r,d,i,u,c,p,f;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,d=t.call,i=t.put,u=t.select,e.next=4,u(e=>e.data_leetcode.formValues);case 4:return c=e.sent,p=(0,s.default)({},c,r),p["type"]="LEETCODE",e.next=9,d(o.distinctValue,p);case 9:if(f=e.sent,1==f.error){e.next=15;break}return e.next=13,i({type:"addOptions",payload:f});case 13:e.next=16;break;case 15:(0,l.openNotification)("error",f.message);case 16:case"end":return e.stop()}},e,this)}),updateClassificationType:n.default.mark(function e(a,t){var r,s;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,t.call,s=t.put,t.select,e.next=4,s({type:"setFormValues",payload:{formValues:r}});case 4:return e.next=6,s({type:"clearOptions"});case 6:case"end":return e.stop()}},e,this)})},reducers:{save(e,a){return(0,s.default)({},e,{list:a.payload.list,pagination:a.payload.pagination})},setModalVisible(e,a){return(0,s.default)({},e,{modalVisible:a.payload})},setUpdateModalVisible(e,a){var t={id:0,type:"",first:"-",second:"-",third:"-"};return(0,s.default)({},e,{updateModalVisible:a.payload.updateModalVisible,updateModalData:a.payload.updateModalData?a.payload.updateModalData:t})},addOptions(e,a){var t=a.payload.body;if("undefined"==typeof t.first||null===t.first||""===t.first){var r=[];t.array.map(e=>{r.unshift({value:e,label:e,isLeaf:!1})}),e.options=r}else{var n=[],o=t.first;if("undefined"==typeof t.second||null===t.second||""===t.second)t.array.map(e=>{n.unshift({label:e,value:e,isLeaf:!1})}),e.options.map(e=>{e.value===o&&(e.children=n)});else{var l=t.second;t.array.map(e=>{n.unshift({label:e,value:e})}),e.options.map(e=>{e.value===o&&e.children.map(e=>{e.value===l&&(e.children=n)})})}}return(0,s.default)({},e)},setFormValues(e,a){return e.formValues=a.payload.formValues,(0,s.default)({},e)},clearOptions(e,a){return e.options=[],(0,s.default)({},e)}}};a.default=d}}]);