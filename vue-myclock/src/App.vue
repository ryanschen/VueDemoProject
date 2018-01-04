<template>
  <div id="app">

    <section>
      <h1 class="title">计时器</h1>
    </section>

    <nav class="nav-wrapper">
      <router-link to="/home">首页</router-link>
      <router-link to="/clocklist">计时列表</router-link>
    </nav>
    <div>
          <input type="button" value="确定" id="change-date" class="btn btn-blue">
          <input type="button" value="确定" id="change-date" class="btn btn-green">
          <input type="button" value="确定" id="change-date" class="btn btn-red">
          <input type="button" value="取消" id="cancel-change-date" class="btn">
    </div>
    <section class="content">


      <div  class="left">
        <sidebar></sidebar>
      </div>

      <div class="right">
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
@import url('./assets/reset.css');
@import url('./assets/APP.css');
button,input,optgroup,select,textarea {
    color: inherit;
    font: inherit;
    margin: 0
}

button {
    overflow: visible
}

button,select {
    text-transform: none
}

button,html input[type=button],input[type=reset],input[type=submit] {
    -webkit-appearance: button;
    cursor: pointer
}

button[disabled],html input[disabled] {
    cursor: default
}

button::-moz-focus-inner,input::-moz-focus-inner {
    border: 0;
    padding: 0
}

input {
    line-height: normal
}

input[type=checkbox],input[type=radio] {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0
}

input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {
    height: auto
}

input[type=search] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box
}

input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration {
    -webkit-appearance: none
}



.btn {
    display: inline-block;
    zoom:1;padding: 6px 16px;
    border: 1px solid #d9dbdc;
    border-radius: 2px;
    text-align: center;
    line-height: 1;
    color: #323437;
    cursor: pointer;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

/* .btn.btn-add-icon,.btn.btn-large.btn-add-icon,.btn.btn-small.btn-add-icon {
    padding-left: 31px;
    background-repeat: no-repeat;
    background-image: url(decorator/common-f0e1189f806ca78825975ab24f4fbb7e.png);
    -background-image: url(decorator/common-feeb385b5295e52840893a99bbdb1544-ie6.png)
} */

.btn.btn-add-icon {
    background-position: left -413px
}

.btn:hover {
    border-color: #d9dbdc;
    background-color: #f3f4f4
}

.btn:active {
    background-color: #fbfcfc;
    border-color: #3687e0
}

.btn.btn-focused.disabled,.btn.disabled {
    border-color: #e9ebeb;
    background-color: #f3f4f4;
    cursor: not-allowed
}

.btn.disabled {
    color: #a0a2a5
}

.btn.btn-large {
    padding-top: 8px;
    padding-bottom: 8px
}

.btn.btn-large.btn-add-icon {
    background-position: left -450px
}

.btn.btn-small {
    padding-top: 5px;
    padding-bottom: 5px
}

.btn.btn-small.btn-add-icon {
    background-position: left -489px
}

.btn.btn-focused {
    color: #0063d0
}

.btn.btn-focused.disabled {
    color: #a0a2a5
}

.btn.btn-blue {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
}

.btn.btn-blue:hover {
    background-color: #4da7fd;
    border-color: #4da7fd
}

.btn.btn-blue:active {
    background-color: #3085e3;
    border-color: #2371c7
}

.btn.btn-blue.disabled {
    color: #a0a2a5;
    border-color: #e9ebeb;
    background-color: #f3f4f4;
    cursor: not-allowed
}

.btn.btn-green {
    color: #fff;
    background-color: #62d181;
    border-color: #47c96b
}

.btn.btn-green:hover {
    background-color: #47c96b;
    border-color: #47c96b
}

.btn.btn-green:active {
    background-color: #49c86b;
    border-color: #42b561
}

.btn.btn-green.disabled {
    color: #a0a2a5;
    border-color: #e9ebeb;
    background-color: #f3f4f4;
    cursor: not-allowed
}

.btn.btn-red {
    color: #fff;
    background-color: #f56e6a;
    border-color: #f35550
}

.btn.btn-red:hover {
    background-color: #fc615c;
    border-color: #fc615c
}

.btn.btn-red:active {
    background-color: #f35550;
    border-color: #474540
}

.btn.btn-red.disabled {
    color: #a0a2a5;
    border-color: #e9ebeb;
    background-color: #f3f4f4;
    cursor: not-allowed
}

.btn-arrow,.btn-hover .btn-arrow,.btn-selected .btn-arrow {
    display: inline-block;
    height: 24px;
    width: 24px;
    border-left: 1px solid #d9dbdc;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    /* background-image: url(decorator/common-f0e1189f806ca78825975ab24f4fbb7e.png);
    -background-image: url(decorator/common-feeb385b5295e52840893a99bbdb1544-ie6.png); */
    background-position: left -525px;
    background-repeat: no-repeat
}

.btn-hover .btn-arrow {
    background-color: #f2f4f4
}

.btn-selected .btn-arrow {
    background-color: #4da7fd;
    /* background-image: url(decorator/common-f0e1189f806ca78825975ab24f4fbb7e.png);
    -background-image: url(decorator/common-feeb385b5295e52840893a99bbdb1544-ie6.png); */
    background-position: left -560px
}
.btn,.misc .item-text {
    background-color: #fff
}
a.router-link-exact-active.router-link-active{
  color: #f35550;
}
</style>
