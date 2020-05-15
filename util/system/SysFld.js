export const SysFld = {
  DISP_TYPE: 'dispType',
  ALIAS_COLNAME: 'aliasColName',
  COLNAME: 'colName',
  COLUMN_VALUE: 'columnValue',
  REQUIRED: 'required',
  QUERY_CONTROLLER: 'queryCtrl',
  SHOW_CONTROLLER: 'showCtrl',
  ADD_CONTROLLER: 'addCtrl',
  EDIT_CONTROLLER: 'editCtrl',

  DISP_TYPE_VAL: {
    TEXT: 1, // 文本
    PASSWORD: 102, // 密码
    MAIL: 103, // 邮箱
    PHONE: 104, // 电话
    TEXTFIELD: 2, // 普通文本域
    PULLDOWN: 3, // 下拉框
    SELECTIMAGE: 301, // 下拉框搜索图片
    SELECTICON: 302, // 下拉框搜索图标
    DATEPICKER: 4, // 日期选择
    NUMBER: 5, // 数字
    RADIOBOX: 6, // 单选
    CHECKBOX: 7, // 复选
    UPLOADIMG: 8, // 上传图片
    UPLOADFILE: 801 // 上传文件
  },

  REQUIRED_VAL: {
    TRUE: 1,
    FALSE: 0
  },

  CONTROLLER_VAL: {
    INVISIBLE: 0,
    VISIBLE: 1,
    EDITABLE: 2
  },

  FORM_TYPE_VAL: {
    QUERY: 'QUERY_CONTROLLER',
    SHOW: 'SHOW_CONTROLLER',
    ADD: 'ADD_CONTROLLER',
    EDIT: 'EDIT_CONTROLLER'
  }
}
