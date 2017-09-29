<template>
    <div id="app">
        <cnode-head id="headId"></cnode-head>
        <div class="menu-side-div" id="menu-side-div">
            <menu-side></menu-side>
        </div>
        <div class="content-div" id="content-div">
            <router-view name='main'></router-view>
        </div>
       <canvas id="back-to-top" width="38px;" height="38px;" @click="backToTop" v-show="isShow"></canvas>
        <router-view name='side' ref='child'></router-view>
    </div>
</template>

<script>
import cnodeHead from './components/cnodeHead';
import menuSide from './components/menuSide';

export default {
    name: 'app',
    data() {
        return {
            authorName: '',
            scroll: '',//记录 滚动条 高度
            isFalse: true,//是否 已绘制过 回到顶部图标【只绘制一次】
            isShow: false//是否显示回到顶部 图标
        };
    },
    components: {
        cnodeHead,
        menuSide,
    },
    methods:{
        backToTop(){
            let sTop = this.scroll;
            let termId = setInterval(function(){
                sTop-=10;
                if(sTop<=0){
                    clearInterval(termId);
                }
                window.scrollTo(0,sTop);
            },1);
        },
        watchScroll() {
            if(this.isFalse){
                this.drawToTopCanvas();
            }
            let $ = function(o){
                        return document.getElementById(o); 
                    } 
            this.scroll = document.body.scrollTop;
            let menuDiv = $('menu-side-div');
            let headDiv = $('headId');
            let s = this.scroll;
            if(s < 60){
                headDiv.style.top = - Math.abs(this.scroll) + "px";
                 menuDiv.style.top = (60 - this.scroll/6) + "px";
                 menuDiv.style.height = window.innerHeight + this.scroll + "px";
            }else{
                 menuDiv.style.top = (this.scroll) + "px";
                 menuDiv.style.height = (window.innerHeight )+ "px";
                 headDiv.style.top = - Math.abs(this.scroll) + "px";
            }
            if(s <= 0){
                if(this.isShow){
                    this.isShow = false;
                }
            }else{
                if(!this.isShow){
                    this.isShow = true;
                }
            }

        },
        drawToTopCanvas() {
                let canvas = document.getElementById('back-to-top');
                let cxt=canvas.getContext('2d');
                 cxt.beginPath();
                 cxt.lineCap = 'round';
                 cxt.moveTo(13, 22);
                 cxt.lineTo(19,14);
                 cxt.lineTo(25,22);
                 cxt.strokeStyle = "#fbfbfb";
                 cxt.lineWidth = 3;
                 cxt.stroke();
                 this.isFalse = false;
        }
    },
    mounted() {
       window.addEventListener('scroll', this.watchScroll);

    },
    watch: {
        authorName(val) {
            this.$refs.child.name = val;
        },
    }
};
</script>

<style>
/*引入自定义公用css*/
@import url("./assets/common.css");
#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
   /*  margin-top: 3.6rem; */
    /* display: flex;
    justify-content: space-around; */
    font-size: 22px;
    word-break: break-all;
}

.content-div{
    padding:30px;
    margin-left:200px;
    /* height:100%; */
}

.margin-bottom0{
    margin-bottom: 0 !important;
  }

</style>


<style lang="less">
    .menu-side-div{
        background-color: #fff;
        z-index:1;
        position:absolute;
        top: 60px;
        left:0;
        width:180px; 
        padding-top: 0;
        box-shadow: 0 0 40px #CCC;
        -webkit-box-shadow: 0 0 40px #CCC;
        -moz-box-shadow: 0 0 40px #CCC;
        overflow-x: hidden;
        overflow-y: auto;
        height: 685px;
    }
    .content-div{
       width: calc(~"100% - 200px");
       position:static;
       top: 60px;
       left:0;
       box-sizing: border-box;
       padding-top: 90px;/*calc(~"3.6rem + 30px");*/
    }
     #back-to-top{
        position: fixed;
        bottom: 20px;
        right: 20px;
        cursor: pointer;
        background-color:#9E9E9E; 
        border-radius:50%; 
    } 
</style>
