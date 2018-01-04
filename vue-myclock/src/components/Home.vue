<template>
  <div class="hello">

    <div class="time">
      <i>{{ hour }}</i>
      <span>：</span>
      <i>{{ minute }}</i>
      <span>：</span>
      <i>{{ second }}</i>
    </div>

    <div class="button">
      <button @click="doClock" class="btn btn-apply">开始计时</button>
    </div>

  </div>
</template>

<script>
export default {
   data () {
     return {
       hour: '',
       minute: '',
       second: ''
     }
   },
    mounted(){
      this.nowTime()
    },
    methods: {
      nowTime () {
        const t = new Date()
        const [h, m, s] = [t.getHours(), t.getMinutes(), t.getSeconds()]
        this.$data.hour = h
        this.$data.minute = m
        this.$data.second = s

        setTimeout(() => {
          this.nowTime()
        }, 1000);
      },
      doClock(){
        const nowTime = new Date()
        
        this.$store.dispatch('changeStatus')
        this.$store.dispatch('addDuration')
        this.$store.dispatch('saveClockList', nowTime)
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
