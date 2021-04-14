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
        @handleSelectionChange="handleSelectionChange">
      </common-table>
    </el-card>
  </div>
</template>

<script>
import CommonTable from '@/components/element/table/CommonTable'
import { mapMutations } from 'vuex'

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
      /**
       * ----------------表头字段和影响渲染列内容相关字段----------------
       1）label:列标题
       2）isShow:决定列是否显示
       3）param:决定当前列显示什么数据（与内容数据的字段相对应）
       4）align:文本对齐方式（可选值：left/center/right）
       5）sortable:对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
       6）slotType：(1)不设置slotType时，默认为普通文本；(2)clickContent:列内容可点击；
                    (3)dynamicContent：动态渲染文本内容；(4)button：普通按钮事件；(5)dropdownButton：下拉按钮事件
       7）width：列宽
       8）methods：设置slotType为clickContent或者button时，methods设置对应的绑定事件
      **/
      tableLabel: [
        { label: '用户名', isShow: true, param: 'usr', align: 'center', sortable: true },
        { label: '公司名称', isShow: true, param: 'company', align: 'center', sortable: false, slotType: 'clickContent', methods: 'companyClick' }, // 内容点击事件
        { label: '办公邮箱', isShow: true, param: 'email', align: 'center', width: '200' },
        { label: '注册时间', isShow: true, param: 'registTime', align: 'center', sortable: 'custom' },
        { label: '审核状态',
          isShow: true,
          param: 'status',
          align: 'center',
          sortable: true,
          slotType: 'dynamicContent',
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
          slotType: 'button',
          options: [
            { label: '预览', type: 'primary', icon: 'el-icon-view', methods: 'preview' },
            { label: '审核', type: 'primary', icon: 'el-icon-upload2', methods: 'audit' }
          ]
        }, // table 按钮事件
        {
          label: '下拉操作',
          isShow: true,
          align: 'center',
          slotType: 'dropdownButton',
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
        // 通过监听子组件编辑tableLabel，获取到最终tableLabel的值可以和后台交互，从而进行某列数据的显隐
        // console.log('子组件改变tableLabel的值', newValue)
      },
      deep: true
    }
  },
  created () {
    // console.log('tableLabel1111111111111', this.tableLabel)
  },
  methods: {
    // 按钮操作事件---子组件触发父组件响应
    handleButton (methods, row, index) {
      console.log('点击内容或者按钮的回调')
      // console.log(methods, row, index)
      let user = {
        name: '123',
        permissions: [],
        accessMenu: []
      }
      this.$store.commit('login/setUser', { user })
    },
    // 排序事件---子组件触发父组件响应
    handleSortChange () {
      console.log('排序回调')
    },
    // 去选事件---子组件选中和触发父组件响应
    handleSelectionChange (val) {
      console.log(val)
    },
    // 下拉按钮事件---子组件触发父组件响应
    handleDropDown (val) {
      console.log(val)
    },
    ...mapMutations({
      setUser: 'setUser'
    })
  }
}
</script>

<style scoped lang="scss">
</style>
