(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{AbxY:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("MVZn")),s=n(a("o0o1")),i=a("7Y5E"),o=a("+n12"),c={namespace:"workbench_index",state:{article:{list:[],hasNext:!0,title:"",first:"",secont:"",third:"",platform:"",platformList:[],pagination:{current:1,pageSize:10,total:0}},book:{list:[],hasNext:!0,name:"",first:"",secont:"",third:"",pagination:{current:1,pageSize:8,total:0},showNoteList:!1,noteList:[]},mission:{list:[],hasNext:!0,state:"",pagination:{current:1,pageSize:8,total:0},formValues:{type:"LEETCODE"},options:[],showNoteList:!1,noteList:[]},news:{list:[],hasNext:!0,type:"",offset:""},message:{list:[],hasNext:!0,pagination:{current:1,pageSize:10,total:0},name:"guest",avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpiccn.ihuaben.com%2Fpic%2Fchapter%2F202003%2F0808%2F1583626759496-rKwIczdKAL_640-555.gif%3Fx-oss-process%3Dimage%2Fresize%2Cw_640&refer=http%3A%2F%2Fpiccn.ihuaben.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652119219&t=1009b6ec3ded1149bc12a5282588570d",content:"",offset:0}},effects:{article_getPlatforms:s.default.mark(function e(t,a){var n,r,c,p;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,e.next=4,r(i.distinctPlatforms,n);case 4:if(p=e.sent,1==p.error){e.next=10;break}return e.next=8,c({type:"changeStateArticle",payload:{platformList:p.body.array}});case 8:e.next=11;break;case 10:(0,o.openNotification)("error",p.message);case 11:case"end":return e.stop()}},e,this)}),article_fetch:s.default.mark(function e(t,a){var n,r,c,p,l,u,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,p=!1,"undefined"==typeof n&&(n={}),n.append&&(p=n.append),l={type:"SKILL",title:n.title,first:n.first,second:n.second,third:n.third,platform:n.platform,currentPage:n.pagination?n.pagination.current:1,pageSize:10,sorter:"createDate_descend"},e.next=8,r(i.queryArticle,l);case 8:if(u=e.sent,1==u.error){e.next=16;break}return d=!1,10===u.list.length&&(d=!0),e.next=14,c({type:"changeStateArticle",payload:{list:u.list,hasNext:d,pagination:{current:l.currentPage,pageSize:l.pageSize,total:u.count},append:p}});case 14:e.next=17;break;case 16:(0,o.openNotification)("error",u.message);case 17:case"end":return e.stop()}},e,this)}),book_fetch:s.default.mark(function e(t,a){var n,r,c,p,l,u,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,p=!1,"undefined"==typeof n&&(n={}),n.append&&(p=n.append),l={type:"SKILL",name:n.name,first:n.first,second:n.second,third:n.third,currentPage:n.pagination?n.pagination.current:1,pageSize:8,sorter:"startDate_descend"},e.next=8,r(i.queryBook,l);case 8:if(u=e.sent,1==u.error){e.next=16;break}return d=!1,8===u.list.length&&(d=!0),e.next=14,c({type:"changeStateBook",payload:{list:u.list,hasNext:d,pagination:{current:l.currentPage,pageSize:l.pageSize,total:u.count},append:p}});case 14:e.next=17;break;case 16:(0,o.openNotification)("error",u.message);case 17:case"end":return e.stop()}},e,this)}),note_fetch:s.default.mark(function e(t,a){var n,r,c,p;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,"undefined"==typeof n&&(n={}),e.next=5,r(i.queryNote,n);case 5:if(p=e.sent,1==p.error){e.next=11;break}return e.next=9,c({type:"changeStateBook",payload:{noteList:p.list}});case 9:e.next=12;break;case 11:(0,o.openNotification)("error",p.message);case 12:case"end":return e.stop()}},e,this)}),leetcode_note_fetch:s.default.mark(function e(t,a){var n,r,c,p;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,"undefined"==typeof n&&(n={}),e.next=5,r(i.queryLeetcodeExp,n);case 5:if(p=e.sent,1==p.error){e.next=11;break}return e.next=9,c({type:"changeStateMission",payload:{noteList:p.list}});case 9:e.next=12;break;case 11:(0,o.openNotification)("error",p.message);case 12:case"end":return e.stop()}},e,this)}),mission_fetch:s.default.mark(function e(t,a){var n,c,p,l,u,d,f;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,c=a.call,p=a.put,a.select,l=!1,"undefined"==typeof n&&(n={}),n.append&&(l=n.append),u=(0,r.default)({state:n.state,currentPage:n.pagination?n.pagination.current:1,pageSize:10,sorter:"startDate_descend"},n),e.next=8,c(i.queryLeetcode,u);case 8:if(d=e.sent,1==d.error){e.next=16;break}return f=!1,d.list.length>0&&(f=!0),e.next=14,p({type:"changeStateMission",payload:{list:d.list,hasNext:f,pagination:{current:u.currentPage,pageSize:u.pageSize,total:d.count},append:l,formValues:{name:n.name,difficulty:n.difficulty,first:n.first,second:n.second,third:n.third}}});case 14:e.next=17;break;case 16:(0,o.openNotification)("error",d.message);case 17:case"end":return e.stop()}},e,this)}),news_fetch:s.default.mark(function e(t,a){var n,r,c,p,l,u;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,p={limit:10,offset:n.offset,type:n.type},e.next=5,r(i.getNews,p);case 5:if(l=e.sent,1==l.error){e.next=13;break}return u=!0,0===l.data.list.length&&(u=!1),e.next=11,c({type:"changeStateNews",payload:{list:l.data.list,hasNext:u,offset:l.data.offset,append:n.append,type:n.type}});case 11:e.next=14;break;case 13:(0,o.openNotification)("error",l.message);case 14:case"end":return e.stop()}},e,this)}),message_fetch:s.default.mark(function e(t,a){var n,r,c,p,l,u,d;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,p=!1,"undefined"==typeof n&&(n={}),n.append&&(p=n.append),l={state:n.state,currentPage:n.pagination?n.pagination.current:1,pageSize:10,sorter:"timestamp_descend",offset:n.offset},e.next=8,r(i.queryMessage,l);case 8:if(u=e.sent,1==u.error){e.next=16;break}return d=!1,10===u.list.length&&(d=!0),e.next=14,c({type:"changeStateMessage",payload:{list:u.list,hasNext:d,offset:u.offset,pagination:{current:l.currentPage,pageSize:l.pageSize,total:u.count},append:p}});case 14:e.next=17;break;case 16:(0,o.openNotification)("error",u.message);case 17:case"end":return e.stop()}},e,this)}),message_add:s.default.mark(function e(t,a){var n,r,c,p;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,c=a.put,a.select,e.next=4,r(i.addMessage,n);case 4:if(p=e.sent,1==p.error){e.next=11;break}return(0,o.openNotification)("info","\u53d1\u8868\u6210\u529f"),e.next=9,c({type:"message_fetch",payload:{pagination:{current:1,pageSize:10,total:0}}});case 9:e.next=12;break;case 11:(0,o.openNotification)("error",p.message);case 12:case"end":return e.stop()}},e,this)}),getMissionOption:s.default.mark(function e(t,a){var n,c,p,l,u,d,f;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,c=a.call,p=a.put,l=a.select,e.next=4,l(e=>e.workbench_index.mission.formValues);case 4:return u=e.sent,d=(0,r.default)({},u,n),d["type"]="LEETCODE",e.next=9,c(i.distinctValue,d);case 9:if(f=e.sent,1==f.error){e.next=15;break}return e.next=13,p({type:"addOptions",payload:f});case 13:e.next=16;break;case 15:(0,o.openNotification)("error",f.message);case 16:case"end":return e.stop()}},e,this)}),updateClassificationType:s.default.mark(function e(t,a){var n,r;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,a.call,r=a.put,a.select,e.next=4,r({type:"setFormValues",payload:{formValues:n}});case 4:return e.next=6,r({type:"clearOptions"});case 6:case"end":return e.stop()}},e,this)})},reducers:{changeStateArticle(e,t){if(t.payload.append){var a=t.payload.list;t.payload.list=e.article.list.concat(a)}return(0,r.default)({},e,{article:(0,r.default)({},e.article,t.payload)})},changeStateBook(e,t){if(t.payload.append){var a=t.payload.list;t.payload.list=e.book.list.concat(a)}return(0,r.default)({},e,{book:(0,r.default)({},e.book,t.payload)})},changeStateMission(e,t){if(t.payload.append){var a=t.payload.list;t.payload.list=e.mission.list.concat(a)}return(0,r.default)({},e,{mission:(0,r.default)({},e.mission,t.payload)})},changeStateNews(e,t){if(t.payload.append){var a=t.payload.list;t.payload.list=e.news.list.concat(a)}return(0,r.default)({},e,{news:(0,r.default)({},e.news,t.payload)})},changeStateMessage(e,t){if(t.payload.append){var a=t.payload.list;t.payload.list=e.message.list.concat(a)}return(0,r.default)({},e,{message:(0,r.default)({},e.message,t.payload)})},addOptions(e,t){var a=t.payload.body;if("undefined"==typeof a.first||null===a.first||""===a.first){var n=[];a.array.map(e=>{n.unshift({value:e,label:e,isLeaf:!1})}),e.mission.options=n}else{var s=[],i=a.first;if("undefined"==typeof a.second||null===a.second||""===a.second)a.array.map(e=>{s.unshift({label:e,value:e,isLeaf:!1})}),e.mission.options.map(e=>{e.value===i&&(e.children=s)});else{var o=a.second;a.array.map(e=>{s.unshift({label:e,value:e})}),e.mission.options.map(e=>{e.value===i&&e.children.map(e=>{e.value===o&&(e.children=s)})})}}return(0,r.default)({},e)},setFormValues(e,t){return e.formValues=t.payload.formValues,(0,r.default)({},e)},clearOptions(e,t){return e.mission.options=[],(0,r.default)({},e)}}};t.default=c}}]);