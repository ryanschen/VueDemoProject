<template>
  <div class="layout">
      <kz-main :style="{paddingLeft:toggleMenu?'60px':'200px'}"></kz-main>
      <kz-sidebar :menu-list="menuList" :toggle-menu="toggleMenu"></kz-sidebar>
  </div>
</template>

<script>
import KzMain from './components/KzMain'
import KzSidebar from './components/KzSidebar'
export default {
    name: 'layout',
    components: {
        KzMain,
        KzSidebar,
    },
    data () {
        return {
            menuList: [
                {
                    icon: 'star',
                    children: [
                        {
                            icon: 'star',
                            name: 'name1'
                        },
                        {
                            icon: 'star',
                            name: 'name2'
                        },
                    ]
                },
                {
                    icon: 'star',
                    children: [
                        {
                            icon: 'star',
                            name: 'name1'
                        },
                        {
                            icon: 'star',
                            name: 'name2'
                        },
                    ]
                }
            ],
        }
    },
    computed: {
        toggleMenu () {
            return this.$store.getters.getToggleMenu;
        }
    }
}
</script>

<style>
html,body{
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
}
.layout{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>
