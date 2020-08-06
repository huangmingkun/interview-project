<template>
  <div class="m-home">
    <el-card style="margin-top: 20px;">
      <common-form></common-form>
    </el-card>
  </div>
</template>

<script>
import CommonForm from '@/components/element/ElementForm'

export default {
  name: 'PageHome',
  components: {
    CommonForm
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
</style>
