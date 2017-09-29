<template>
  <div id="get-todo" class="container">
    <input class="form-control" :value="newTodo" @change="getTodo" placeholder="I need to ..."/>
    <button class="btn btn-primary" @click="addTodo">Todo</button>
  </div>
</template>

<script>
export default {
  methods:{
    getTodo(e){
      this.$store.dispatch('getTodo', e.target.value)
    },
    addTodo(){
      this.$store.dispatch('addTodo')
    }
  },
  computed:{
    newTodo(){
      return this.$store.getters.newTodo
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
