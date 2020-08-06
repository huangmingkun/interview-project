<template>
  <div class="table-edit-container">
    <i class="el-icon-setting cursor_pointer table-edit"
       title="编辑"
       @click="editMethod">
    </i>
    <el-dialog title="table编辑" :visible.sync="tableEditShow">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cityData" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="tableEditShow = false">取 消</el-button>-->
        <el-button type="primary" @click="tableEditShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  name: 'TableEdit',
  data () {
    return {
      tableEditShow: false, // 是否显示table字段编辑框
      checkAll: false, // 是否全选
      checkedCities: [], // 已选的数据
      // cities: cityOptions,
      cities: [], // 所有字段名称数组
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
    // 计算待编辑的字段总数
    cityData: function () {
      let that = this
      let value = []
      that.tableLabel.forEach((item) => {
        value.push(item.label)
        // 不能在计算属性里面设置'已选字段',只能在打开编辑框前初始化'已选数据'
        // if (item.isShow) {
        //   that.checkedCities.push(item.label)
        // }
      })
      that.cities = value // 所有字段名称数组
      return value
    }
  },
  methods: {
    editMethod () {
      let that = this
      // 打开table编辑框
      that.tableEditShow = true
      that.checkedCities = [] // 清空数据，防止数据污染
      that.tableLabel.forEach((item) => {
        if (item.isShow) {
          that.checkedCities.push(item.label)
        }
      })
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cityData : []
      this.$emit('editValueChange', this.checkedCities)
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let that = this
      that.$emit('editValueChange', value)
      console.log('单选改变的数据', value)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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
</style>
