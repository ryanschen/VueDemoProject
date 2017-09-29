<template>
  <div id="app">
    <CompletedTodos></CompletedTodos>
    <CurrentTodos></CurrentTodos>
    <GetTodo></GetTodo>
  </div>
</template>

<script>
import GetTodo from './components/GetTodo'
import CurrentTodos from './components/CurrentTodos'
import CompletedTodos from './components/CompletedTodos'
export default {
  components: { 
    GetTodo,
    CurrentTodos,
    CompletedTodos
  }
}
</script>

<style>
@import url('https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
