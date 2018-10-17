// use localStorage to store the authority info, which might be sent from server in actual project.

let _authority=[];

let _userName="";

let _user={
  name:'-',
  role:2,
};

export function getAuthority(str) {
  // // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  // const authorityString =
  //   typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // // authorityString could be admin, "admin", ["admin"]
  // let authority;
  // try {
  //   authority = JSON.parse(authorityString);
  // } catch (e) {
  //   authority = authorityString;
  // }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // return authority || ['admin'];
  return _authority;
}

export function setAuthority(authority) {
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  // return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  _authority = authority;
}

export function getUsername(){
  return _userName;
}

export function setUsername(username){
  _userName=username;
}

export function getUser(){
  return _user;
}

export function setUser(user){
  if(typeof(user)=='undefined'){
    return;
  }
  _user=user;
}

