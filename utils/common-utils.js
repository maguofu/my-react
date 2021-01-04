export function query(url){
  url = url || window.location.search.substr(1);
  return url.split('&').reduce((pre, cur) => {
    pre[cur.split('=')[0]] = cur.split('=')[1];
    return pre;
  }, {});
}