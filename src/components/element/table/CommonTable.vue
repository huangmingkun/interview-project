<template>
  <div class="table-container">
    <!--table编辑-->
    <table-edit
      :tableLabel="tableLabel"
      @editValueChange="editValueChange">
    </table-edit>
    <el-table
      ref="table"
      v-loading="loading"
      element-loading-text="Loading"
      :data="tableData"
      border fit highlight-current-row stripe
      tooltip-effect="dark"
      style="width:100%"
      :header-cell-style="{background:'#f2f2f9',color: '#7485a5'}"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange">
      <!-----------------------------------------------table内容checkbox操作----------------------------------------------->
      <el-table-column
        v-if="tableSelection.isSelection"
        type="selection"
        :selectable='isDisabled'
        show-overflow-tooltip
        width="55">
      </el-table-column>
      <!-----------------------------------------------普通table内容----------------------------------------------->
      <el-table-column
        v-for="(item,index) in showTableLabel"
        :width="item.width ? item.width : ''"
        :key="index"
        :align="item.align"
        :label="item.label"
        :prop="item.param"
        :sortable="item.sortable ? 'custom' : false">
        <template slot-scope="scope">
          <!-----------------------------------------------动态内容封装----------------------------------------------->
          <span v-if="item.render">
            {{item.render(scope.row)}}
          </span>
          <!-----------------------------------------------内容点击事件封装----------------------------------------------->
          <span
            v-else-if="item.clickContent"
            :class="{'text-blue' : item.clickContent}"
            @click="handleButton(item.methods,scope.row,scope.row)">
            {{scope.row[item.param]}}
          </span>
          <!-----------------------------------------------普通文本内容----------------------------------------------->
          <span v-else>{{scope.row[item.param]}}</span>
          <!-----------------------------------------------按钮操作事件----------------------------------------------->
          <el-button
            size="mini"
            v-if="item.isTableBtn"
            v-for="(btnItem,index) in item.options"
            :key="index"
            :type="btnItem.type"
            :icon="btnItem.icon"
            @click="handleButton(btnItem.methods,scope.row,scope.row)">
            {{btnItem.label}}
          </el-button>
          <!-----------------------------------------------下拉按钮操作事件----------------------------------------------->
          <el-dropdown
            v-if="item.isTableDropDownBtn"
            trigger="click"
            @command="handleCommand">
            <el-button type="primary" size="mini">
              <span v-text="item.label"></span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item
                v-for="(dropDownItem,index) in item.items"
                :command="dropDownItem.func"
                v-text="dropDownItem.label"
                :key="index">
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableEdit from './TableEdit'
export default {
  name: 'CommonTable',
  data () {
    return {
      editVlaue: [] // table编辑的数据
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }, // 是否显示加载中
    tableSelection: {
      type: Object,
      default: () => {
        return {}
      }
    }, // checkbox
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }, // table数据
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    }, // 普通table内容
    tableOption: {
      type: Object,
      default: () => {
        return {}
      }
    }, // table 按钮事件
    dropdownData: {
      type: Object,
      default: () => {
        return {}
      }
    } // table 下拉按钮事件
  },
  computed: {
    showTableLabel () {
      return this.tableLabel.filter((item) => {
        return item.isShow
      })
    }
  },
  components: {
    TableEdit
  },
  created () {
  },
  methods: {
    // 是否禁用checkbox
    isDisabled (row, index) {
      return true
    },
    // 按钮事件
    handleButton (methods, row, index) {
      // console.log(methods, row, index)
      this.$emit('handleButton', {'methods': methods, 'row': row, 'index': index})
    },
    // 排序
    handleSortChange (val) {
      this.$emit('handleSortChange', val)
    },
    // 批量选择
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    // 下拉按钮事件
    handleCommand (command) {
      console.log('command', command)
      this.$emit(command.func, command.uuid)
    },
    // 编辑数据后,更改数据的回显
    editValueChange (checkedDatas) {
      let that = this
      // checkedDatas为已选的数据
      that.tableLabel.forEach((item) => {
        // 遍历table数据，表头的标题包含在已选数据里面则做显示操作
        if (checkedDatas.includes(item.label)) {
          item.isShow = true
        } else {
          item.isShow = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .table-container {
    position: relative;
  }
  .text-blue {
    cursor: pointer;
    color: #178bff;
  }
</style>
