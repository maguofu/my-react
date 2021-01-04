
import axios from 'axios';
import qs from 'qs';
import { query } from './common-utils';
const queryParams = query();
const instance = axios.create();

instance.interceptors.request.use(config => {
  // console.log(`axios request interceptors:${JSON.stringify(config)}`);
  return config
}, error => {
  return Promise.reject()
})

instance.interceptors.response.use(res => {
  // console.log(`axios response interceptors:${JSON.stringify(res)}`);
  return res.data;
}, error => {
  // console.log(error.response);
  Promise.reject(error)
})

/**
 * 请求封装
 * @param api 请求基本信息
 * @param api.method 请求方式
 * @param api.url 请求的url
 * @param data 请求是业务需要的参数
 * @param optios 请求配置
 * @param optios.withCredentials 跨域请求是否要带上cookie
 * @param optios.timeout 请求超时时间
 */
export default (api, data, optios) => {
  optios = Object.assign({
    timeout: 10000,
    withCredentials: false
  }, optios);
  data = Object.assign({
    _: new Date().getTime()
  }, data);
  /**
   * 添加tips环境
   */
  if (queryParams && queryParams.__tips__ && parseInt(queryParams.__tips__ === 1)) {
    data.__tips__ = 1;
  }
  if (queryParams && queryParams.tipsno){
    data.tipsno = queryParams.tipsno;
  }
  let httpDefaultOpt = {
    // 请求方式
    method: api.method.toLowerCase() || 'get',
    // baseURL
    baseURL: '',
    url: api.url,
    timeout: optios.timeout ? optios.timeout : 10000,
    // get请求参数
    params: Object.assign({}, data),
    // post请求参数
    data: qs.stringify(Object.assign({}, data)),
    // 设置请求头信息
    headers: api.method.toLowerCase() === 'get' ? 
      {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      } : 
      {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      withCredentials: optios.withCredentials ? optios.withCredentials : false,
  };
  if (api.method.toLowerCase() === 'get') {
    delete httpDefaultOpt.data
  } else {
    delete httpDefaultOpt.params
  }
  return new Promise((resolve, reject) => {
    instance(httpDefaultOpt).then(res => {
      resolve(res);
      console.log(`请求发送成功url：${api.url}，响应为：${JSON.stringify(res)}`);
    }).catch(e => {
      reject(e);
      console.log(`请求发送异常url：${api.url}，响应为：${JSON.stringify(e)}`);
    })
  });
}