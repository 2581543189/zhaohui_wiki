import request from '@/utils/request';

export async function query() {
  return request('https://my-json-server.typicode.com/2581543189/Mock/apiUsers');
}

export async function queryCurrent() {
  return request('https://my-json-server.typicode.com/2581543189/Mock/apiCurrentUser');
}
