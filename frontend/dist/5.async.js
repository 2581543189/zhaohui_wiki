(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"86U/":function(e,t,a){e.exports={main:"antd-pro_pages_-login_-login-main",icon:"antd-pro_pages_-login_-login-icon",other:"antd-pro_pages_-login_-login-other",register:"antd-pro_pages_-login_-login-register"}},"B+Dq":function(e,t,a){"use strict";var r=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("5NDa");var n=l(a("5rEg")),s=l(a("pVnL")),o=l(a("QILm"));a("y8nQ");var u=l(a("Vl3Y")),i=r(a("q1tI")),d=(l(a("BGR+")),l(a("JAxp")),l(a("dQek"))),p=l(a("s+z6")),f=u.default.Item;class c extends i.Component{constructor(e){super(e),this.getFormItemOptions=(e=>{var t=e.onChange,a=e.defaultValue,r=e.customprops,l=e.rules,n={rules:l||r.rules};return t&&(n.onChange=t),a&&(n.initialValue=a),n})}render(){var e=this.props.form.getFieldDecorator,t=this.props,a=(t.onChange,t.customprops),r=(t.defaultValue,t.rules,t.name),l=(t.buttonText,(0,o.default)(t,["onChange","customprops","defaultValue","rules","name","buttonText"])),u=this.getFormItemOptions(this.props),d=l||{};return i.default.createElement(f,null,e(r,u)(i.default.createElement(n.default,(0,s.default)({},a,d))))}}var m={};Object.keys(d.default).forEach(e=>{var t=d.default[e];m[e]=(e=>i.default.createElement(p.default.Consumer,null,a=>i.default.createElement(c,(0,s.default)({customprops:t.props,name:t.props.name},e,{rules:t.rules,form:a.form}))))});var g=m;t.default=g},HejL:function(e,t,a){"use strict";var r=a("TqRt"),l=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("fOrg");var n,s,o=r(a("+KLJ")),u=r(a("MVZn")),i=l(a("q1tI")),d=a("MuoO"),p=r(a("QBZU")),f=r(a("86U/")),c=p.default.UserName,m=p.default.Password,g=p.default.Submit,h=(n=(0,d.connect)(e=>{var t=e.login,a=e.loading;e.logout;return{login:t,submitting:a.effects["login/login"]}}),n(s=class extends i.Component{constructor(e){super(e),this.handleSubmit=((e,t)=>{if(!e){var a=this.props.dispatch;a({type:"login/login",payload:(0,u.default)({},t)})}}),this.renderMessage=(e=>i.default.createElement(o.default,{style:{marginBottom:24},message:e,type:"error",showIcon:!0})),this.guestLogin=(()=>{var e=this.props.dispatch;e({type:"login/login",payload:{guest:!0}})})}render(){var e=this.props,t=e.login,a=e.submitting;return i.default.createElement("div",{className:f.default.main},i.default.createElement(p.default,{onSubmit:this.handleSubmit,ref:e=>{this.loginForm=e}},!1===t.status&&!a&&!t.logout&&this.renderMessage("\u8d26\u6237\u6216\u5bc6\u7801\u9519\u8bef!"),i.default.createElement(c,{placeholder:"\u7528\u6237\u540d",defaultValue:"zhaohui"}),i.default.createElement(m,{placeholder:"\u5bc6\u7801",onPressEnter:()=>this.loginForm.validateFields(this.handleSubmit)}),i.default.createElement(g,{loading:a,guestlogin:this.guestLogin},"\u767b\u5f55")))}})||s),v=h;t.default=v},JAxp:function(e,t,a){e.exports={login:"antd-pro_components_-login_index-login",tabs:"antd-pro_components_-login_index-tabs",prefixIcon:"antd-pro_components_-login_index-prefixIcon",getCaptcha:"antd-pro_components_-login_index-getCaptcha",submit:"antd-pro_components_-login_index-submit"}},QBZU:function(e,t,a){"use strict";var r=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("y8nQ");var n=l(a("Vl3Y")),s=r(a("q1tI")),o=(l(a("17x9")),l(a("TSYQ"))),u=l(a("B+Dq")),i=l(a("Yrmy")),d=l(a("JAxp")),p=l(a("s+z6"));class f extends s.Component{constructor(e){super(e),this.getContext=(()=>{var e=this.props.form;return{form:e}}),this.handleSubmit=(e=>{e.preventDefault();var t=this.props,a=t.form,r=t.onSubmit;a.validateFields(["username","password"],{force:!0},(e,t)=>{r(e,t)})})}render(){var e=this.props,t=e.className,a=e.children;return s.default.createElement(p.default.Provider,{value:this.getContext()},s.default.createElement("div",{className:(0,o.default)(t,d.default.login)},s.default.createElement(n.default,{onSubmit:this.handleSubmit},s.default.createElement(s.default.Fragment,null,a))))}}f.defaultProps={className:"",defaultActiveKey:"",onSubmit:()=>{}},f.Submit=i.default,Object.keys(u.default).forEach(e=>{f[e]=u.default[e]});var c=n.default.create()(f);t.default=c},Yrmy:function(e,t,a){"use strict";var r=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("+L6B");var n=l(a("2/Rp")),s=l(a("pVnL"));a("y8nQ");var o=l(a("Vl3Y")),u=r(a("q1tI")),i=l(a("TSYQ")),d=l(a("JAxp")),p=o.default.Item;class f extends u.Component{render(){var e=this.props,t=e.guestlogin,a=e.className,r=(0,i.default)(d.default.submit,a);return u.default.createElement(p,null,u.default.createElement(n.default,(0,s.default)({size:"large",className:r,type:"primary",htmlType:"submit"},this.props),"\u7528\u6237\u767b\u9646"),u.default.createElement(n.default,(0,s.default)({size:"large",className:r,type:"primary",onClick:t},this.props),"\u8bbf\u5ba2\u8eab\u4efd"))}}var c=f;t.default=c},dQek:function(e,t,a){"use strict";var r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Pwec");var l=r(a("CtXQ")),n=r(a("q1tI")),s=r(a("JAxp")),o={UserName:{props:{size:"large",prefix:n.default.createElement(l.default,{type:"user",className:s.default.prefixIcon}),placeholder:"\u7528\u6237\u540d",name:"username"},rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d!"}]},Password:{props:{size:"large",prefix:n.default.createElement(l.default,{type:"lock",className:s.default.prefixIcon}),type:"password",placeholder:"\u5bc6\u7801",name:"password"},rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801!"}]}};t.default=o},"s+z6":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a("q1tI"),l=(0,r.createContext)(),n=l;t.default=n}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvTG9naW4vTG9naW4ubGVzcz84N2MzIiwic3JjL2NvbXBvbmVudHMvTG9naW4vTG9naW5JdGVtLmpzIiwic3JjL3BhZ2VzL0xvZ2luL01haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTG9naW4vaW5kZXgubGVzcz8wNWM4Iiwic3JjL2NvbXBvbmVudHMvTG9naW4vaW5kZXguanMiLCJzcmMvY29tcG9uZW50cy9Mb2dpbi9Mb2dpblN1Ym1pdC5qcyIsInNyYy9jb21wb25lbnRzL0xvZ2luL21hcC5qcyIsInNyYy9jb21wb25lbnRzL0xvZ2luL2xvZ2luQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWFpbiIsImljb24iLCJvdGhlciIsInJlZ2lzdGVyIiwiX3JlYWN0IiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiX21hcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfbG9naW5Db250ZXh0IiwiRm9ybUl0ZW0iLCJfZm9ybSIsImRlZmF1bHQiLCJJdGVtIiwiV3JhcEZvcm1JdGVtIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN1cGVyIiwidGhpcyIsImdldEZvcm1JdGVtT3B0aW9ucyIsIl9yZWYiLCJvbkNoYW5nZSIsImRlZmF1bHRWYWx1ZSIsImN1c3RvbXByb3BzIiwicnVsZXMiLCJvcHRpb25zIiwiaW5pdGlhbFZhbHVlIiwicmVuZGVyIiwiZ2V0RmllbGREZWNvcmF0b3IiLCJmb3JtIiwiX3RoaXMkcHJvcHMiLCJuYW1lIiwicmVzdFByb3BzIiwiYnV0dG9uVGV4dCIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllczIiLCJvdGhlclByb3BzIiwiY3JlYXRlRWxlbWVudCIsIl9pbnB1dCIsIl9leHRlbmRzMiIsIkxvZ2luSXRlbSIsIk9iamVjdCIsImtleXMiLCJJdGVtTWFwIiwiZm9yRWFjaCIsImtleSIsIml0ZW0iLCJDb25zdW1lciIsImNvbnRleHQiLCJfZHZhIiwiX0xvZ2luIiwiX0xvZ2luMiIsIlVzZXJOYW1lIiwiTG9naW4iLCJQYXNzd29yZCIsIlN1Ym1pdCIsIkxvZ2luUGFnZSIsImNvbm5lY3QiLCJsb2dpbiIsImxvYWRpbmciLCJsb2dvdXQiLCJzdWJtaXR0aW5nIiwiZWZmZWN0cyIsImhhbmRsZVN1Ym1pdCIsImVyciIsInZhbHVlcyIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJfb2JqZWN0U3ByZWFkMiIsInJlbmRlck1lc3NhZ2UiLCJjb250ZW50IiwiX2FsZXJ0Iiwic3R5bGUiLCJtYXJnaW5Cb3R0b20iLCJtZXNzYWdlIiwic2hvd0ljb24iLCJndWVzdExvZ2luIiwiZ3Vlc3QiLCJjbGFzc05hbWUiLCJzdHlsZXMiLCJvblN1Ym1pdCIsInJlZiIsImxvZ2luRm9ybSIsInN0YXR1cyIsInBsYWNlaG9sZGVyIiwib25QcmVzc0VudGVyIiwidmFsaWRhdGVGaWVsZHMiLCJndWVzdGxvZ2luIiwidGFicyIsInByZWZpeEljb24iLCJnZXRDYXB0Y2hhIiwic3VibWl0IiwiX2NsYXNzbmFtZXMiLCJfTG9naW5JdGVtIiwiX0xvZ2luU3VibWl0IiwiX2luZGV4IiwiZ2V0Q29udGV4dCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcmNlIiwiX3RoaXMkcHJvcHMyIiwiY2hpbGRyZW4iLCJQcm92aWRlciIsInZhbHVlIiwiRnJhZ21lbnQiLCJkZWZhdWx0UHJvcHMiLCJkZWZhdWx0QWN0aXZlS2V5IiwiTG9naW5TdWJtaXQiLCJjcmVhdGUiLCJjbHNTdHJpbmciLCJfYnV0dG9uIiwic2l6ZSIsImh0bWxUeXBlIiwib25DbGljayIsInByZWZpeCIsIl9pY29uIiwicmVxdWlyZWQiLCJMb2dpbkNvbnRleHQiLCJjcmVhdGVDb250ZXh0Il0sIm1hcHBpbmdzIjoic0ZBQ0FBLEVBQUFDLFNBQWtCQyxLQUFBLG9DQUFBQyxLQUFBLG9DQUFBQyxNQUFBLHFDQUFBQyxTQUFBLG9RQ0Rs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QUFXM0MsS0FBSyxVQUFVK0MsUUFBUzFCLEdBQWlCckUsS0FBS0YsT0FBekYsb0NBVU8yRixnS0MvQmZ4RyxFQUFBSSxFQUFBRixFQUFBLFNBRUEwRixFQUFBeEYsRUFBQUYsRUFBQSxZQUdFOEMsVUFDRW5DLE9BQ0UrRixLQUFNLFFBQ05HLE9BQVEvRyxFQUFBUSxRQUFBeUIsY0FBQStFLEVBQUF4RyxTQUFNdUQsS0FBSyxPQUFPWSxVQUFXQyxVQUFPVSxhQUM1Q0wsWUFBYSxxQkFDYnJELEtBQUssWUFFUFAsUUFFSTRGLFVBQVUsRUFDVjFDLFFBQVMsMkNBSWZyQixVQUNFckMsT0FDRStGLEtBQU0sUUFDTkcsT0FBUS9HLEVBQUFRLFFBQUF5QixjQUFBK0UsRUFBQXhHLFNBQU11RCxLQUFLLE9BQU9ZLFVBQVdDLFVBQU9VLGFBQzVDdkIsS0FBTSxXQUNOa0IsWUFBYSxlQUNickQsS0FBSyxZQUVQUCxRQUVJNEYsVUFBVSxFQUNWMUMsUUFBUyx5SkM5QmpCLElBQUF2RSxFQUFBRSxFQUFBLFFBRU1nSCxHQUFlLEVBQUFsSCxFQUFBbUgsbUJBQ05EIiwiZmlsZSI6IjUuYXN5bmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wibWFpblwiOlwiYW50ZC1wcm9fcGFnZXNfLWxvZ2luXy1sb2dpbi1tYWluXCIsXCJpY29uXCI6XCJhbnRkLXByb19wYWdlc18tbG9naW5fLWxvZ2luLWljb25cIixcIm90aGVyXCI6XCJhbnRkLXByb19wYWdlc18tbG9naW5fLWxvZ2luLW90aGVyXCIsXCJyZWdpc3RlclwiOlwiYW50ZC1wcm9fcGFnZXNfLWxvZ2luXy1sb2dpbi1yZWdpc3RlclwifTsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtLCBJbnB1dCwgQnV0dG9uLCBSb3csIENvbCB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgb21pdCBmcm9tICdvbWl0LmpzJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL2luZGV4Lmxlc3MnO1xyXG5pbXBvcnQgSXRlbU1hcCBmcm9tICcuL21hcCc7XHJcbmltcG9ydCBMb2dpbkNvbnRleHQgZnJvbSAnLi9sb2dpbkNvbnRleHQnO1xyXG5cclxuY29uc3QgRm9ybUl0ZW0gPSBGb3JtLkl0ZW07XHJcblxyXG5jbGFzcyBXcmFwRm9ybUl0ZW0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgLy/lpITnkIZtYXAuanMg5ZKM55So5oi35Lyg6L+b5p2l55qE5bGe5oCn5Yay56qBXHJcbiAgZ2V0Rm9ybUl0ZW1PcHRpb25zID0gKHsgb25DaGFuZ2UsIGRlZmF1bHRWYWx1ZSwgY3VzdG9tcHJvcHMsIHJ1bGVzIH0pID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHJ1bGVzOiBydWxlcyB8fCBjdXN0b21wcm9wcy5ydWxlcyxcclxuICAgIH07XHJcbiAgICBpZiAob25DaGFuZ2UpIHtcclxuICAgICAgb3B0aW9ucy5vbkNoYW5nZSA9IG9uQ2hhbmdlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICBvcHRpb25zLmluaXRpYWxWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH07XHJcblxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGZvcm06IHsgZ2V0RmllbGREZWNvcmF0b3IgfSwvL2Zvcm3mnaXoh6pjb250ZXh0IHByb3ZpZGVyXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAvLyDov5nkuYjlhpnmmK/kuLrkuobpmLLmraJyZXN0UHJvcHPkuK0g5bim5YWlIG9uQ2hhbmdlLCBkZWZhdWx0VmFsdWUsIHJ1bGVzIHByb3BzXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICBjdXN0b21wcm9wcyxcclxuICAgICAgZGVmYXVsdFZhbHVlLFxyXG4gICAgICBydWxlcyxcclxuICAgICAgbmFtZSxcclxuICAgICAgYnV0dG9uVGV4dCxcclxuICAgICAgLi4ucmVzdFByb3BzXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAvLyBnZXQgZ2V0RmllbGREZWNvcmF0b3IgcHJvcHNcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldEZvcm1JdGVtT3B0aW9ucyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICBjb25zdCBvdGhlclByb3BzID0gcmVzdFByb3BzIHx8IHt9O1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZvcm1JdGVtPlxyXG4gICAgICAgIHtnZXRGaWVsZERlY29yYXRvcihuYW1lLCBvcHRpb25zKSg8SW5wdXQgey4uLmN1c3RvbXByb3BzfSB7Li4ub3RoZXJQcm9wc30gLz4pfVxyXG4gICAgICA8L0Zvcm1JdGVtPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IExvZ2luSXRlbSA9IHt9O1xyXG5PYmplY3Qua2V5cyhJdGVtTWFwKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgY29uc3QgaXRlbSA9IEl0ZW1NYXBba2V5XTtcclxuICBMb2dpbkl0ZW1ba2V5XSA9IHByb3BzID0+IChcclxuICAgIDxMb2dpbkNvbnRleHQuQ29uc3VtZXI+XHJcbiAgICAgIHtjb250ZXh0ID0+IChcclxuICAgICAgICA8V3JhcEZvcm1JdGVtXHJcbiAgICAgICAgICBjdXN0b21wcm9wcz17aXRlbS5wcm9wc30vL2N1c3RvbXByb3BzIOaYr21hcOS4reWumuS5ieeahFxyXG4gICAgICAgICAgbmFtZT17aXRlbS5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgey4uLnByb3BzfVxyXG4gICAgICAgICAgcnVsZXM9e2l0ZW0ucnVsZXN9XHJcbiAgICAgICAgICBmb3JtPXtjb250ZXh0LmZvcm19XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvTG9naW5Db250ZXh0LkNvbnN1bWVyPlxyXG4gICk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5JdGVtO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnZHZhJztcclxuaW1wb3J0IHsgQWxlcnR9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgTG9naW4gZnJvbSAnQC9jb21wb25lbnRzL0xvZ2luJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0xvZ2luLmxlc3MnO1xyXG5cclxuY29uc3QgeyAgVXNlck5hbWUsIFBhc3N3b3JkLCBTdWJtaXQgfSA9IExvZ2luO1xyXG5cclxuQGNvbm5lY3QoKHsgbG9naW4sIGxvYWRpbmcsbG9nb3V0IH0pID0+ICh7XHJcbiAgbG9naW4sXHJcbiAgc3VibWl0dGluZzogbG9hZGluZy5lZmZlY3RzWydsb2dpbi9sb2dpbiddLFxyXG59KSlcclxuY2xhc3MgTG9naW5QYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgfVxyXG5cclxuICBoYW5kbGVTdWJtaXQgPSAoZXJyLCB2YWx1ZXMpID0+IHtcclxuICAgIGlmICghZXJyKSB7XHJcbiAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiAnbG9naW4vbG9naW4nLFxyXG4gICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgIC4uLnZhbHVlcyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZW5kZXJNZXNzYWdlID0gY29udGVudCA9PiAoXHJcbiAgICA8QWxlcnQgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAyNCB9fSBtZXNzYWdlPXtjb250ZW50fSB0eXBlPVwiZXJyb3JcIiBzaG93SWNvbiAvPlxyXG4gICk7XHJcblxyXG4gIGd1ZXN0TG9naW49KCk9PntcclxuICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XHJcbiAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogJ2xvZ2luL2xvZ2luJyxcclxuICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICBndWVzdDp0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgICAvKipyZWblsZ7mgKflj6/ku6Xorr7nva7kuLrkuIDkuKrlm57osIPlh73mlbDvvIzov5nkuZ/mmK/lrpjmlrnlvLrng4jmjqjojZDnmoTnlKjms5XvvJvov5nkuKrlh73mlbDmiafooYznmoTml7bmnLrkuLrvvJpcclxuXHJcbiAgICDnu4Tku7booqvmjILovb3lkI7vvIzlm57osIPlh73mlbDooqvnq4vljbPmiafooYzvvIzlm57osIPlh73mlbDnmoTlj4LmlbDkuLror6Xnu4Tku7bnmoTlhbfkvZPlrp7kvovjgIJcclxuXHJcbiAgICDnu4Tku7booqvljbjovb3miJbogIXljp/mnInnmoRyZWblsZ7mgKfmnKzouqvlj5HnlJ/lj5jljJbml7bvvIzlm57osIPkuZ/kvJrooqvnq4vljbPmiafooYzvvIzmraTml7blm57osIPlh73mlbDlj4LmlbDkuLpudWxs77yM5Lul56Gu5L+d5YaF5a2Y5rOE6Zyy44CCICovXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgbG9naW4sIHN1Ym1pdHRpbmd9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxyXG4gICAgICAgIDxMb2dpblxyXG4gICAgICAgICAgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxyXG4gICAgICAgICAgcmVmPXtmb3JtID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0gPSBmb3JtO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAge2xvZ2luLnN0YXR1cz09PWZhbHNlICYmXHJcbiAgICAgICAgICAgICFzdWJtaXR0aW5nICYmIWxvZ2luLmxvZ291dCAmJlxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck1lc3NhZ2UoJ+i0puaIt+aIluWvhueggemUmeivryEnKX1cclxuICAgICAgICA8VXNlck5hbWUgcGxhY2Vob2xkZXI9XCLnlKjmiLflkI1cIiBkZWZhdWx0VmFsdWU9XCJ6aGFvaHVpXCIvPlxyXG4gICAgICAgIDxQYXNzd29yZFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuWvhueggVwiXHJcbiAgICAgICAgICAgIG9uUHJlc3NFbnRlcj17KCkgPT4gdGhpcy5sb2dpbkZvcm0udmFsaWRhdGVGaWVsZHModGhpcy5oYW5kbGVTdWJtaXQpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgICA8U3VibWl0IGxvYWRpbmc9e3N1Ym1pdHRpbmd9IGd1ZXN0bG9naW49e3RoaXMuZ3Vlc3RMb2dpbn0+55m75b2VPC9TdWJtaXQ+XHJcbiAgICAgICAgPC9Mb2dpbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5QYWdlO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wibG9naW5cIjpcImFudGQtcHJvX2NvbXBvbmVudHNfLWxvZ2luX2luZGV4LWxvZ2luXCIsXCJ0YWJzXCI6XCJhbnRkLXByb19jb21wb25lbnRzXy1sb2dpbl9pbmRleC10YWJzXCIsXCJwcmVmaXhJY29uXCI6XCJhbnRkLXByb19jb21wb25lbnRzXy1sb2dpbl9pbmRleC1wcmVmaXhJY29uXCIsXCJnZXRDYXB0Y2hhXCI6XCJhbnRkLXByb19jb21wb25lbnRzXy1sb2dpbl9pbmRleC1nZXRDYXB0Y2hhXCIsXCJzdWJtaXRcIjpcImFudGQtcHJvX2NvbXBvbmVudHNfLWxvZ2luX2luZGV4LXN1Ym1pdFwifTsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgeyBGb3JtLCBUYWJzIH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xyXG5pbXBvcnQgTG9naW5JdGVtIGZyb20gJy4vTG9naW5JdGVtJztcclxuaW1wb3J0IExvZ2luU3VibWl0IGZyb20gJy4vTG9naW5TdWJtaXQnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vaW5kZXgubGVzcyc7XHJcbmltcG9ydCBMb2dpbkNvbnRleHQgZnJvbSAnLi9sb2dpbkNvbnRleHQnO1xyXG5cclxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBkZWZhdWx0QWN0aXZlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25TdWJtaXQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgZGVmYXVsdEFjdGl2ZUtleTogJycsXHJcbiAgICBvblN1Ym1pdDogKCkgPT4ge30sXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIC8v57uZTG9naW5JdGVtIOS8oOmAkiBnZXRGaWVsZERlY29yYXRvciA6Zm9ybSDlkowgdXBkYXRlQWN0aXZlXHJcbiAgZ2V0Q29udGV4dCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgZm9ybSB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvcm1cclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgaGFuZGxlU3VibWl0ID0gZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB7IGZvcm0sIG9uU3VibWl0IH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGZvcm0udmFsaWRhdGVGaWVsZHMoWyd1c2VybmFtZScsJ3Bhc3N3b3JkJ10sIHsgZm9yY2U6IHRydWUgfSwgKGVyciwgdmFsdWVzKSA9PiB7XHJcbiAgICAgIG9uU3VibWl0KGVyciwgdmFsdWVzKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxMb2dpbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3RoaXMuZ2V0Q29udGV4dCgpfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhjbGFzc05hbWUsIHN0eWxlcy5sb2dpbil9PlxyXG4gICAgICAgICAgPEZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cclxuICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9Mb2dpbkNvbnRleHQuUHJvdmlkZXI+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5Mb2dpbi5TdWJtaXQgPSBMb2dpblN1Ym1pdDtcclxuXHJcbk9iamVjdC5rZXlzKExvZ2luSXRlbSkuZm9yRWFjaChpdGVtID0+IHtcclxuICBMb2dpbltpdGVtXSA9IExvZ2luSXRlbVtpdGVtXTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtLmNyZWF0ZSgpKExvZ2luKTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybSB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vaW5kZXgubGVzcyc7XHJcblxyXG5jb25zdCBGb3JtSXRlbSA9IEZvcm0uSXRlbTtcclxuXHJcbmNsYXNzIExvZ2luU3VibWl0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcblxyXG5cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgXHJcblxyXG4gICAgY29uc3QgeyBndWVzdGxvZ2luICxjbGFzc05hbWV9PXRoaXMucHJvcHM7XHJcbiAgICBjb25zdCBjbHNTdHJpbmcgPSBjbGFzc05hbWVzKHN0eWxlcy5zdWJtaXQsIGNsYXNzTmFtZSk7XHJcbiAgXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Rm9ybUl0ZW0+XHJcbiAgICAgICAgPEJ1dHRvbiBzaXplPVwibGFyZ2VcIiBjbGFzc05hbWU9e2Nsc1N0cmluZ30gdHlwZT1cInByaW1hcnlcIiBodG1sVHlwZT1cInN1Ym1pdFwiIHsuLi50aGlzLnByb3BzfSA+55So5oi355m76ZmGPC9CdXR0b24+XHJcbiAgICAgICAgPEJ1dHRvbiBzaXplPVwibGFyZ2VcIiBjbGFzc05hbWU9e2Nsc1N0cmluZ30gdHlwZT1cInByaW1hcnlcIiBvbkNsaWNrPXtndWVzdGxvZ2lufSAgey4uLnRoaXMucHJvcHN9ID7orr/lrqLouqvku708L0J1dHRvbj5cclxuICAgICAgPC9Gb3JtSXRlbT5cclxuICAgICk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5TdWJtaXQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEljb24gfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL2luZGV4Lmxlc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIFVzZXJOYW1lOiB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICBzaXplOiAnbGFyZ2UnLFxyXG4gICAgICBwcmVmaXg6IDxJY29uIHR5cGU9XCJ1c2VyXCIgY2xhc3NOYW1lPXtzdHlsZXMucHJlZml4SWNvbn0gLz4sXHJcbiAgICAgIHBsYWNlaG9sZGVyOiAn55So5oi35ZCNJyxcclxuICAgICAgbmFtZTondXNlcm5hbWUnLC8v6aqM6K+B6KGo5Y2V55qEa2V5XHJcbiAgICB9LFxyXG4gICAgcnVsZXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIG1lc3NhZ2U6ICfor7fovpPlhaXnlKjmiLflkI0hJyxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICBQYXNzd29yZDoge1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgc2l6ZTogJ2xhcmdlJyxcclxuICAgICAgcHJlZml4OiA8SWNvbiB0eXBlPVwibG9ja1wiIGNsYXNzTmFtZT17c3R5bGVzLnByZWZpeEljb259IC8+LFxyXG4gICAgICB0eXBlOiAncGFzc3dvcmQnLFxyXG4gICAgICBwbGFjZWhvbGRlcjogJ+WvhueggScsXHJcbiAgICAgIG5hbWU6J3Bhc3N3b3JkJywvL+mqjOivgeihqOWNleeahGtleVxyXG4gICAgfSxcclxuICAgIHJ1bGVzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBtZXNzYWdlOiAn6K+36L6T5YWl5a+G56CBIScsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IExvZ2luQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcclxuZXhwb3J0IGRlZmF1bHQgTG9naW5Db250ZXh0O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9