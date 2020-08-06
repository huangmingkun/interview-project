<template>
  <div class="m-home">
    <el-card style="margin-top: 20px;" header="动态table封装">
    <!--  具名插槽形式引入-->
      <!--<template v-slot:header>
        <h1>动态table封装</h1>
      </template>-->
      <!--:tableOption="tableOption"
      :dropdownData="dropdownData"-->
      <common-table
        :loading="loading"
        :tableData="tableData"
        :tableSelection="tableSelection"
        :tableLabel="tableLabel"
        @handleButton="handleButton"
        @handleSortChange="handleSortChange"
        @handleDropDown="handleDropDown"
        @handleSelectionChange="handleSelectionChange"
      >
      </common-table>
    </el-card>
  </div>
</template>

<script>
import CommonTable from '@/components/element/table/CommonTable'

export default {
  name: 'PageHome',
  components: {
    CommonTable
  },
  data () {
    return {
      loading: false, // 是否显示加载中
      tableSelection: {
        isSelection: true
      }, // checkbox
      tableData: [
        {
          usr: 'hmk',
          company: 'Tencent',
          email: '1198966@qq.com',
          registTime: '2019-10-22',
          status: 1
        },
        {
          usr: 'hmk',
          company: 'Tencent',
          email: '1198966@qq.com',
          registTime: '2019-10-22',
          status: 1
        },
        {
          usr: 'hjy',
          company: 'Byte Dancing',
          email: '11989664@qq.com',
          registTime: '2019-10-23',
          status: 2
        }
      ], // table数据
      tableLabel: [
        { label: '用户名', isShow: true, param: 'usr', align: 'center', sortable: true },
        { label: '公司名称', isShow: true, param: 'company', align: 'center', clickContent: true, methods: 'companyClick' }, // 内容点击事件
        { label: '办公邮箱', isShow: true, param: 'email', align: 'center', width: '200' },
        { label: '注册时间', isShow: true, param: 'registTime', align: 'center', sortable: true },
        { label: '审核状态',
          param: 'status',
          align: 'center',
          sortable: true,
          isShow: true,
          render: (row) => {
            if (row.status === 0) {
              return '未审核'
            } else if (row.status === 1) {
              return '审核通过'
            } else if (row.status === 2) {
              return '审核不通过'
            } else {
              return '禁用'
            }
          }
        }, // 动态内容
        {
          label: '操作',
          isShow: true,
          align: 'center',
          width: '200',
          isTableBtn: true,
          options: [
            { label: '预览', type: 'primary', icon: 'el-icon-view', methods: 'preview' },
            { label: '审核', type: 'primary', icon: 'el-icon-upload2', methods: 'audit' }
          ]
        }, // table 按钮事件
        {
          label: '下拉操作',
          isShow: true,
          isTableDropDownBtn: true,
          align: 'center',
          items: [
            { label: '修改', func: { func: 'update', rowDatas: {paramA: 'editA', paramb: 'editB'} } },
            { label: '删除', func: { func: 'del', rowDatas: {paramA: 'deletA', paramb: 'delteB'} } }
          ]
        } // table 下拉按钮事件
      ]
    }
  },
  watch: {
    'tableLabel': {
      // 深度监听子组件改变tableLabel值
      handler: function (newValue, oldValue) {
        // console.log('子组件改变tableLabel的值', newValue)
      },
      deep: true
    }
  },
  created () {
    console.log('tableLabel1111111111111', this.tableLabel)
  },
  methods: {
    // 子组件操作事件触发父组件响应
    handleButton (childVal) {
      console.log('点击内容或者按钮的回调')
      console.log(childVal)
    },
    // 子组件排序事件触发父组件响应
    handleSortChange () {
      console.log('排序回调')
    },
    // 子组件选择事件触发父组件响应
    handleSelectionChange (val) {
      console.log(val)
    },
    // 子组件下拉按钮事件触发父组件响应
    handleDropDown (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
