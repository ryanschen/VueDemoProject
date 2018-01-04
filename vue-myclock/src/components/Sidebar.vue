<template>
  <div>
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
</style>
