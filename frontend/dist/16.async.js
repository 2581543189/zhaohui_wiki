(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{Yb9c:function(e,a,s){"use strict";var t=s("284h"),r=s("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n,u,o=t(s("q1tI")),c=r(s("usdK")),l=s("MuoO"),i=r(s("zHco")),b=(n=(0,l.connect)(),n(u=class extends o.Component{constructor(){super(...arguments),this.handleTabChange=(e=>{var a=this.props.match;switch(e){case"articles":c.default.push(`${a.url}/articles`);break;case"books":c.default.push(`${a.url}/books`);break;case"missions":c.default.push(`${a.url}/missions`);break;case"news":c.default.push(`${a.url}/news`);break;case"messages":c.default.push(`${a.url}/messages`);break;default:break}})}render(){var e=[{key:"articles",tab:"\u6587\u7ae0"},{key:"books",tab:"\u4e66\u7c4d"},{key:"missions",tab:"\u4efb\u52a1"},{key:"news",tab:"\u52a8\u6001"},{key:"messages",tab:"\u7559\u8a00"}],a=this.props,s=a.match,t=a.children,r=a.location;return o.default.createElement(i.default,{title:"\u7d22\u5f15",tabList:e,tabActiveKey:r.pathname.replace(`${s.path}/`,""),onTabChange:this.handleTabChange},t)}})||u),h=b;a.default=h}}]);