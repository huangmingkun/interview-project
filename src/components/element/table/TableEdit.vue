<template>
  <div class="table-edit-container">
    <!--table编辑图标-->
    <i class="el-icon-setting cursor_pointer table-edit"
       :class="{'all-selected': checkLists.length !== checkedLength}"
       title="编辑"
       @click="editMethod">
    </i>
    <!--table数据编辑弹出框-->
    <el-dialog title="table编辑" :visible.sync="tableEditShow" customClass="el-dialog-class">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedDatas" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in checkLists" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="tableEditShow = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="tableEditShow = false">确 定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TableEdit',
  data () {
    return {
      tableEditShow: false, // 是否显示table字段编辑框
      checkAll: false, // 是否全选
      checkedDatas: [], // 已选的数据
      isIndeterminate: true
    }
  },
  props: {
    tableLabel: {
      type: Array
    },
    editVlaue: {
      type: Array
    }
  },
  computed: {
    // 待编辑的字段总数（表头label总数）
    checkLists: function () {
      let that = this
      let value = []
      console.log('进来了checkLists计算')
      that.tableLabel.forEach((item) => {
        value.push(item.label)
        // 不能在计算属性里面设置'已选字段',只能在打开编辑框前初始化'已选数据'
        // if (item.isShow) {
        //   that.checkedDatas.push(item.label)
        // }
      })
      return value
    },
    // 计算已选择表头label的列表长度（不可直接计算checkedDatas--原因不明:可见TableEdit-computed-error页面代码）
    checkedLength () {
      let that = this
      let selectedArr = []
      console.log('进来了checkedLength计算')
      // 遍历原始列表数据,显示已选的数据
      that.tableLabel.forEach((item) => {
        if (item.isShow) {
          selectedArr.push(item.label)
        }
      })
      return selectedArr.length
    }
  },
  methods: {
    // 打开编辑table的弹出框
    editMethod () {
      let that = this
      // 打开table编辑框
      that.tableEditShow = true
      that.checkedDatas = [] // 清空数据，防止数据污染
      // 遍历原始列表数据,显示已选的数据
      that.tableLabel.forEach((item) => {
        if (item.isShow) {
          that.checkedDatas.push(item.label)
        }
      })
    },
    // 全选/全不选操作
    handleCheckAllChange (val) {
      this.checkedDatas = val ? this.checkLists : []
      // 通知父组件更新数据---this.checkedCities为已选的数据
      this.$emit('editValueChange', this.checkedDatas)
      this.isIndeterminate = false
    },
    // 单选/单不选操作
    handleCheckedCitiesChange (value) {
      let that = this
      // 通知父组件更新数据--value为已选的数据
      that.$emit('editValueChange', value)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.checkLists.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkLists.length
    }
  }
}
</script>

<style scoped>
  .table-edit {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    opacity: .6;
  }
  .all-selected {
    color: red;
  }
</style>
