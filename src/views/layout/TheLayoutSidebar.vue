<template>
  <aside class="sidebar" :class="{'sidebar-hide': !openNav}">
    <el-menu :default-active="selectMenu" class="sidebar-menu" :collapse="!openNav"
             :collapse-transition="false" :router="true">
      <template v-for="menu in user.accessMenu">
        <el-menu-item v-if="!menu.children" :key="menu.name" :index="menu.path">
          <i :class="menu.icon" v-if="menu.icon"></i>
          <span slot="title">{{ $t(menu.title) }}</span>
        </el-menu-item>
        <the-submenu :key="menu.name" :subMenu="menu" v-else :i18n="i18n"></the-submenu>
      </template>
    </el-menu>
  </aside>
</template>

<script>
import TheLayoutSubSidebar from './TheLayoutSubSidebar'
// import { mapState } from 'vuex'

export default {
  name: 'TheLayoutSidebar',
  props: ['openNav'],
  data () {
    return {
      user: {}
    }
  },
  components: {
    'the-submenu': TheLayoutSubSidebar
  },
  computed: {
    selectMenu () {
      return this.$route.meta.menuPath || this.$route.path
    }
    // ...mapState(['user'])
  },
  methods: {
    i18n: function (key) {
      return this.$t(key)
    }
  },
  created () {
    this.user = {
      accessMenu: [
        {
          icon: 'el-icon-s-home',
          name: 'index',
          path: '/index',
          title: 'menu.home'
        },
        {
          icon: 'el-icon-search',
          name: 'table',
          path: '/table',
          title: 'menu.table'
        },
        {
          icon: 'el-icon-tickets',
          name: 'forms',
          path: '/forms',
          title: 'menu.form'
        },
        {
          icon: 'el-icon-picture',
          name: 'charts',
          path: '/charts',
          title: 'menu.chart'
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  float: left;
  width: 240px;
  height: 100%;
  border-right: 1px solid #e6e6e6;
  overflow: auto;

  .sidebar-menu {
    border: none;
    height: 100%;
  }
}

.sidebar-hide {
  width: 65px;
}
</style>
