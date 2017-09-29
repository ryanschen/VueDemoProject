<template>
  <div id="app">

    <section>
      <h1>计时器</h1>
    </section>

    <section>

      <nav>
        <router-link to="/home">首页</router-link>
        <router-link to="/clocklist">计时列表</router-link>
      </nav>

      <div>
        <sidebar></sidebar>
      </div>

      <div>
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </div>

    </section>
    
  </div>
</template>

<script>
import sidebar from './components/Sidebar'
export default {
    data:function(){
        return {
            transitionName: 'slide-left'
        }
    },
  components:{
    sidebar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
