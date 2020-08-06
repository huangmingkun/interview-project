<template>
  <!-- 列表 -->
  <el-table
    stripe
    :data="dataSource"
    highlight-current-row
    ref="refTable"
  >
    <!--数据源-->
    <el-table-column
      v-for="(column, index) in columns"
      v-if="column.isShow"
      header-align="center"
      :sortable="column.hasSort"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :align="column.align"
      :width="column.width">
    </el-table-column >
      <template slot-scope="scope">
        <my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
        <span v-else>
          {{scope.row[column.prop]}}
        </span>
      </template>
  </el-table>
</template>

<script>
export default {
  name: 'ElementTable',
  data () {
    return {
    }
  },
  props: {
    dataSource: { // 表格数据源
      type: Array,
      default: () => []
    },
    columns: { // 表格的字段展示
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
</style>
