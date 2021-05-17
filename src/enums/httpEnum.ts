/**
 * @description: 请求结果 code
 */
export enum ResCodeEnum {
  SUCCESS = 1,
  AUTH_ERROR = '10003', //非法token
  AUTH_EXPIRE = '10002' //token已过期
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
