<template>
  <div class="hello">
    <div v-if="!list.length">没有记录</div>
    <div v-else-if="list.length > 0" v-bind:key="index" v-for="(item, index) in list">
      <div><i>{{index + 1}} </i> {{ item.date }}</div>
      <div>计时开始 {{ item.gotowork }}</div>
      <div>计时结束 {{ item.gooffwork }}</div>
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
