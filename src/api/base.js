import request from '@/utils/request'

// 获取学校列表
export const getDwmcList = (params) => {
  return request.get('/code/autodw.do', params)
}

// 开设招生单位详情
export const getRsDetail = (params) => {
  return request.post('/rs/yjfxs.do', params)
}
