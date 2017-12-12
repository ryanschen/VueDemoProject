<template>
  <div class="main">
      <kz-header></kz-header>
      <div class="content">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import KzHeader from './components/KzHeader'
export default {
  name: 'kz-main',
  components: {
      KzHeader,
  }
}
</script>

<style lang="scss" scoped>
.main{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    // left: 200px;
    left: 0;
    padding-left: 200px;
    overflow: hidden;
    transition: .3s;
}
</style>
