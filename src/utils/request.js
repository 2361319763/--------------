import axios from 'axios'

const base_url = '/zsml'
const request_timeout = 10 * 1000
const default_headers = 'application/x-www-form-urlencoded;charset=UTF-8'
const cookies = 'JSESSIONID=AE383FDA02747CCFD39938CDA3771033; CHSICC_CLIENTFLAGZSML=cbb01b369fcd2c506b9696e007e7543d; Hm_lvt_3916ecc93c59d4c6e9d954a54f37d84c=1726040690,1728522276; Hm_lpvt_3916ecc93c59d4c6e9d954a54f37d84c=1728522276; HMACCOUNT=69936125C9E4DB0C; _gid=GA1.3.1339580628.1728522276; _ga_YZV5950NX3=GS1.1.1728522276.2.1.1728522298.0.0.0; JSESSIONID=63F63348A1A23D02A206EC75C5449AA7; CHSICC_CLIENTFLAGYZ=50f89a53d00bdeb77cb4758d73d823cf; _ga=GA1.1.1042523994.1726040684; _ga_TT7MCH8RRF=GS1.1.1728522898.1.0.1728522901.0.0.0'

const service = axios.create({
  baseURL: base_url, // api 的 base_url
  timeout: request_timeout, // 请求超时时间
  headers: {
    'Cookie': cookies,
    'Content-Type': default_headers
  }
})

export default {
  get: (url, params) => {
    return service.get(url, {params})
  },
  post: (url, params) => {
    return service.post(url, new URLSearchParams(params), {})
  },
}