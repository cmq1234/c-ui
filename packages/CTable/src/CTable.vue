<template>
  <div class="sc-table-style">
    <el-button
      :key="btn[btTitle]"
      @click="topBtnClick(btn[btClick])"
      size="mini"
      :type="btn[btShowType]"
      v-for="btn in topBtns">
      {{ btn[btTitle] }}
    </el-button>
    <el-table
      :data="list"
      row-key="id"
      border
      class="mainTable"
      highlight-current-row
      style="width: 100%; margin-top: 15px"
      @selection-change="handleSelectionChange"
      :tree-props="{ children: 'children' }"
      :fit="true">
      <el-table-column
        v-if="showSelectionChange"
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        class-name="data-column"
        v-for="column in defaultFldList"
        :key="column[colName]"
        :label="column[aliasColName]"
        :prop="column[colName]"
        :show-overflow-tooltip="true"
        align="left"
        :min-width="widthColumns[column[colName]]"
        :height=100>
        <template v-slot="{row}">
          <el-popover placement="top-start" trigger="hover" v-if="row[column[colName]] && (column[dispType] === upLoadImg) ">
            <img :src="getUrl(row[column[colName]])" height="32" slot="reference" width="32"/>
            <img :src="getUrl(row[column[colName]])" style="max-height: 240px"/>
          </el-popover>
          <i class="el-icon-document" v-else-if="column[dispType]===upLoadFile && row[column[colName]]"></i>
          <span v-else>{{ row[column[colName]] }}</span>
        </template>
      </el-table-column>
      <!-- 操作项 -->
      <el-table-column
        column-key="operateKey"
        fixed="right"
        v-if="rowBtns.length>0"
        :width="setWidth(rowBtns)"
        align="center"
        class-name="small-padding">
        <template v-slot="{row}">
          <template  v-for="(btn, index) in rowBtns">
            <el-button
              v-if="index<4"
              :key="btn[btTitle]"
              :type="btn[btShowType]"
              @click="rowBtnClick(btn[btClick], row, btn)"
              size="mini">
              {{ btn[btTitle] }}
            </el-button>
            <el-dropdown v-if="rowBtns.length>4">
                            <span class="el-dropdown-link">
                                更多
                            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(btn, index) in rowBtns"
                  :key="btn[btTitle]"
                  class="button-dropdown-item"
                >
                  <template v-if="index>=4">
                    <el-button
                      :type="btn[btShowType]"
                      @click="rowBtnClick(btn[btClick], row, btn)"
                      size="mini">
                      {{ btn[btTitle] }}
                    </el-button>
                  </template>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      @size-change="reload"
      @current-change="reload"
      v-show="total>0"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import { SysFld } from '../../../util/system/SysFld'
import { SysButton } from '../../../util/system/SysButton'
export default {
  name: 'CTable',
  props: {
    showSelectionChange: {
      default: false,
      type: Boolean
    },
    columns: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    },
    dataList: {
      default: () => [],
      type: Array
    },
    pageSize: {
      type: Number,
      default: 10
    },
    buttons: {
      default: () => [],
      type: Array
    },
    buttonClick: {
      type: Function
    }
  },
  data () {
    return {
      list: [],
      selectRows: [],
      widthColumns: {},
      defaultFldList: [],
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    colName: function () {
      return SysFld.COLNAME
    },
    aliasColName: function () {
      return SysFld.ALIAS_COLNAME
    },
    dispType: function () {
      return SysFld.DISP_TYPE
    },
    upLoadImg: function () {
      return SysFld.DISP_TYPE_VAL.UPLOADIMG
    },
    upLoadFile: function () {
      return SysFld.DISP_TYPE_VAL.UPLOADFILE
    },
    btTitle: function () {
      return SysButton.TITLE
    },
    btClick: function () {
      return SysButton.CLICK
    },
    btShowType: function () {
      return SysButton.BUTTON_SHOW_TYPE
    },
    rowBtns: function () {
      if (this.buttons) {
        return this.buttons.filter(
          item => item.buttonType === '表格右' || !item.buttonType
        )
      }
      return []
    },
    topBtns: function () {
      if (this.buttons) {
        return this.buttons.filter(
          item =>
            item.buttonType === '表格上' || item.buttonType === '表格上必选一'
        )
      }
      return []
    }
  },
  watch: {
    columns: function () {
      this.setDefaultSelectColumns()
    },
    dataList: function () {
      this.list = this.dataList
      this.setColumnsWidth(this.list)
    }
  },
  mounted () {
    this.reload()
    this.setDefaultSelectColumns()
  },
  methods: {
    handleSelectionChange (val) {
      this.selectRows = val
      this.$emit('selection-change', this.selectRows)
    },
    // 显示字段值初始化
    setDefaultSelectColumns () {
      this.columns.forEach(item => {
        if (item[SysFld.SHOW_CONTROLLER] !== SysFld.CONTROLLER_VAL.INVISIBLE) {
          this.defaultFldList.push(item[this.colName])
        }
      })
    },
    reload () {
      if (this.load !== undefined) {
        this.load({
          currentPage: this.currentPage - 1,
          pageSize: this.pageSize
        }, (data) => {
          if (!data) {
            this.list = []
            this.total = 0
            return
          }
          if (data.list) {
            this.list = data.list
            this.total = data.total
          } else {
            this.list = data
            this.total = data.length
          }
          this.setColumnsWidth(this.list)
        })
      } else {
        this.list = this.dataList
        this.setColumnsWidth(this.list)
      }
    },
    // 计算表头宽度
    setColumnsWidth (data) {
      data.forEach(item => {
        this.columns.forEach((i, index) => {
          if (i[SysFld.DISP_TYPE] === SysFld.DISP_TYPE_VAL.UPLOADIMG || i[SysFld.DISP_TYPE] === SysFld.DISP_TYPE_VAL.SELECTIMAGE) {
            this.widthColumns[i[SysFld.COLNAME]] = 80
            return
          }
          const colName = item[i.colName]
          let flexWidth = i.aliasColName.length * 15
          if (colName) {
            const colNameLength = colName.toString().length
            if (colName) {
              if (colName >= '\u4e00' && colName <= '\u9fa5') {
                // 如果是中文字符
                flexWidth = colNameLength * 15 > flexWidth ? colNameLength * 15 + 50 : flexWidth + 50
                this.widthColumns[i.colName] = flexWidth > 500 ? 500 : flexWidth
              } else {
                // 其他种类字符
                flexWidth = colNameLength * 8 > flexWidth ? colNameLength * 8 + 50 : flexWidth + 50
                this.widthColumns[i.colName] = flexWidth > 500 ? 500 : flexWidth
              }
            }
          } else if (colName === null) {
            this.widthColumns[i.colName] = flexWidth + 50
          }
        })
      })
    },
    // 图片预览
    getUrl (url) {
      return `${process.env.VUE_APP_API}${url}`
    },
    // 设置操作项宽度
    setWidth (rowBtns) {
      return rowBtns.length < 4 ? (rowBtns.length * 100 + 22) : 422
    },
    // 操作按钮点击
    rowBtnClick (func, row) {
      this.buttonClick(func, [row])
    },
    // 表上按钮点击
    topBtnClick (func) {
      this.buttonClick(func, this.selectRows)
    }
  }
}
</script>

<style scoped>

</style>
