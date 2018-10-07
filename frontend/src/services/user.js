import request from '@/utils/request';

export async function query() {
  return request('https://my-json-server.typicode.com/2581543189/Mock/apiUsers');
}

export async function queryCurrent(payload) {
  //return request('https://my-json-server.typicode.com/2581543189/Mock/apiCurrentUser');

  if(payload.username==='guest'){
    return Promise.resolve({
      name:payload.username,
      "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    });
  }

  return Promise.resolve({
    name:payload.username,
    "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  });
}
