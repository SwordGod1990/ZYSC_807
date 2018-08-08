import axios from 'axios'
const instance=axios.create();
//配置接口地址
//测试环境
// instance.wapUrl="https://local-ecmall.zhiyiyunzhenshi.com"
//https://test6.zhiyiyunzhenshi.com//测试
//https://local-ecmall.zhiyiyunzhenshi.com//开发
// 开发环境
// instance.wapUrl="http://192.168.30.222:8082/ecMall"//信恒涛
instance.wapUrl="http://192.168.29.166:8081/ecMall"//响应时间
//响应时间
// instance.defaults.timeout=5000
// 配置请求头
instance.defaults.headers['Content-Type']='application/x-www-form-urlencoded'
// instance.withCredentials = true
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use=instance.interceptors.request.use
instance.interceptors.request.use(config=>{
  return config
},err=>{
  return Promise.reject(err)
})

//返回状态判断(添加响应拦截器)
instance.interceptors.response.use(response=>{
  return response
},err=>{
  return Promise.reject(err)
})


export default instance
