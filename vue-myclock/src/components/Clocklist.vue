<template>
  <div class="right">
    <div v-if="!list.length">没有记录</div>
    <div v-else-if="list.length > 0" v-bind:key="index" v-for="(item, index) in list">
      <div><i class="index">{{index + 1}} </i> {{ item.date }}</div>
      <div class="time-desc">计时开始 {{ item.gotowork }}</div>
      <div class="time-desc">计时结束 {{ item.gooffwork }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    list () {
      return this.$store.getters.switchTime
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
