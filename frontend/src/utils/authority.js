// use localStorage to store the authority info, which might be sent from server in actual project.

let _authority=[];

let _userName="";

let _user={
  name:'-',
  role:2,
};

export function getAuthority(str) {
  
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('zh-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || _authority;
  //return _authority;
}

export function setAuthority(authority) {
  _authority = authority;
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('zh-authority', JSON.stringify(proAuthority));
  
}

export function getUsername(){
  return localStorage.getItem('zh-username') || _userName;
}

export function setUsername(username){
  _userName = username;
  return localStorage.setItem('zh-username',username);
}

export function getUser(){
  const userString =localStorage.getItem('zh-user');
  let user;
  try {
    user = JSON.parse(userString);
  } catch (e) {
    user = userString;
  }
  return user ||_user;
}

export function setUser(user){
  if(typeof(user)=='undefined'){
    user={
      name:'guest',
      role:2,
    }
  }
  _user=user;
  return localStorage.setItem('zh-user', JSON.stringify(user));


}

