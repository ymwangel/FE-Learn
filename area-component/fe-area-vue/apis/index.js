import { jsonp } from './jsonp'
/**
 *
 * @param {*} type 返回数据的类型 1: 返回不带'省', '市', 比如返回 '广东' '佛山' 2: 返回带'省', '市', 比如返回 '广东省' '佛山市'
 * @param {*} level 请求的层级 1: 省级数据 2: 市级数据 3: 区级数据 需要与code字段对应
 * @param {*} code level === 2 时，code值从 level === 1 的接口里取
 */
export function queryAreaJSONP (type, level, code) {
  return jsonp('https://commonweb.wuage.com/commonweb/getAreaJsonp?type=' + type + '&level=' + level + '&code=' + code)
}
