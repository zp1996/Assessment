'use strict';

/**
 * 公司介绍数据结构
 */
exports.IntroductionStruct = {
  name: '请填写公司名',
  enName: '请填写公司英文名',
  fax: '请填写公司传真',
  email: '请填写Email',
  phone: '请填写联系电话',
  address: '请填写公司地址',
  introduction: '请填写公司介绍',
  record: '请填写网站备案',
  copyright: '请填写网站版权',
  zip: '请填写公司邮编',
  logo: '请上传公司logo',
};

/**
 * 生成Schema
 * @param {object} struct - 数据结构hash对象
 * @param {any} type - mongodb对应类型
 @return {object} mongoose数据类型
 */
exports.getSchema = (struct, type) => {
  const res = {};
  const keys = Object.keys(struct);
  for (let i = 0, key; key = keys[i++];) {     // eslint-disable-line
    res[key] = type;
  }
  return res;
};
