<template>
  <div>
    <vue-alert :visible.sync="visible" title="弹窗标题" content="文本内容" buttonText="测试点击"></vue-alert>
    <p @click="visible = true">打开</p>
  </div>
</template>

<script>
  import VueAlert from './alert.vue'

  export default {
    components: { VueAlert },
    data () {
      return {
        visible: false
      }
    }
  }
</script>

