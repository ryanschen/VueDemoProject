<template>
    <div class='head'>
        <router-link to='/'>
            <!-- <img src='../assets/cnodejs.svg' title='cnodejs.svg'> -->
            <b @click='clearMenuActive'>后台管理系统</b>
        </router-link>
        <el-button type='text' @click='signOut'><i class="fa fa-sign-out fa-lg"></i>退出</el-button>
    </div>
</template>

<script>
import bus from '../assets/eventBus';
export default {
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        signOut() {
            this.$confirm('此操作将退出登录, 是否继续?', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });          
            });
        },
        clearMenuActive() {
            bus.$emit("clearMenuActive",false);
        }
    }
};
</script>

<style scoped>
@import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"); 
@import url("https://cdn.bootcss.com/element-ui/1.4.2/theme-default/index.css"); 

 .head {
    background-image: linear-gradient(to right,#1278f6,#00b4aa);
    background-image: -webkit-gradient(linear,left top,right top,from(#1278f6),to(#00b4aa));
    background-image: -webkit-linear-gradient(left,#1278f6,#00b4aa);
    background-image: -moz-linear-gradient(left,#1278f6,#00b4aa);
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
}
.head>a>b {
    width: 10rem;
    height: 3.5rem;
    margin-left: 1rem;
    color:white;
    height: 58px;
    line-height: 58px;
    vertical-align: middle;
}
.head img {
    width: 10rem;
    height: 3.5rem;
    margin-left: 10rem;
}

.head>button {
    display: inline-block;
    float: right;
    line-height: 3.6rem;
    margin-right: 1rem;
    font-weight: bold;
    font-size: 20px;
    color: white;
    letter-spacing: 2px;
    padding-top: 0.2rem;
}

.head .dialogDiv {
    font-size: 17px;
}

.head ul {
    margin-left: 1rem;
}

.head a {
    text-decoration: none;
    color: #58B7FF;
}

.head .star {
    font-weight: bold;
    color: #1D8CE0;
    font-size: 20px;
}
</style>