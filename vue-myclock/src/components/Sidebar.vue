<template>
  <div class="hello">
    <div>
      <span>状态</span>
      <span>{{ status }}</span>
    </div>
    <div>
      <span>时长</span>
      <span>{{ duration }}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    status() {
      return this.$store.getters.getStatus
    },
    duration() {
      return this.$store.getters.getDuration
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
