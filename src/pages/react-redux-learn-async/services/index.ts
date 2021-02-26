import api from '@utils/api';

const apiInfo = {
  testApi: {
    url: '/omsdata/basiccode/issueconf',
    method: 'get',
  }
}

export default {
  testApi: (params?:any, options?:any) => {
    return api(apiInfo.testApi, params, options);
  },
}