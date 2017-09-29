<template>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu default-active="2" unique-opened router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu :index="item.id" v-for="item in menu" :key="item.id">
          <template slot="title"><span v-bind:class="{'is-active':item.active}"><i class="fa" v-bind:class="item.icon">&nbsp;&nbsp;</i>{{ item.pName }}</span></template>
            <el-menu-item-group>
            <el-menu-item :index="val.childId" v-for="(val, key) in item.childList" @click="isActive(item, menu)" :key="val.childId"><span v-bind:class="{'df-clo-active':val.active}">{{ val.childName }}</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script>
import bus from '../assets/eventBus';
  export default {
    data() {
        return {
            menu: [
                {   "id": "1",
                    "icon": "fa-user-circle",
                    "pName": "会员接待", 
                    "active": false,
                    "childList": [  {"childId": "menu11", "childName": "会员消费", "active": false}, 
                                    {"childId": "menu12", "childName": "会员充值", "active": false},
                                    {"childId": "menu13", "childName": "账单列表", "active": false},
                                    {"childId": "menu14", "childName": "实体卡/实名制", "active": false},
                                    {"childId": "menu15", "childName": "会员查询", "active": false}]
                },
                {   "id": "2",
                    "icon": "fa-chain",
                    "pName": "商家管理",
                    "active": false, 
                    "childList": [  {"childId":"menu21","childName":"商家信息修改"}]
                },
                {   "id": "3",
                    "icon": "fa-reorder",
                    "pName": "项目管理", 
                    "active": false,
                    "childList": [  {"childId":"menu31","childName":"新增项目"}, 
                                    {"childId":"menu32","childName":"项目列表"}]
                },
                {   "id": "4",
                    "icon": "fa-commenting-o",
                    "pName": "消息管理", 
                    "active": false,
                    "childList": [  {"childId":"menu41","childName":"待回复消息"}, 
                                    {"childId":"menu42","childName":"已回复消息"},
                                    {"childId":"menu43","childName":"促销推送"},
                                    {"childId":"menu44","childName":"促销推送记录"}]
                },
                {   "id": "5",
                    "icon": "fa-bar-chart",
                    "pName": "报表管理",
                    "active": false, 
                    "childList": [  {"childId":"menu51","childName":"接待记录"}, 
                                    {"childId":"menu52","childName":"运行总表"},
                                    {"childId":"menu53","childName":"会员和储值"},
                                    {"childId":"menu54","childName":"RFM分析"}]
                },
                {   "id": "6",
                    "icon": "fa-life-buoy",
                    "pName": "账号管理", 
                    "active": false,
                    "childList": [  {"childId":"menu61","childName":"账号新增"}, 
                                    {"childId":"menu62","childName":"账号管理"},
                                    {"childId":"menu63","childName":"客户经理管理"}]
                },
                {   "id": "7",
                    "icon": "fa-cog",
                    "pName": "拓展管理", 
                    "active": false,
                    "childList": [  {"childId":"menu71","childName":"拓展商家列表"}]
                }
            ]
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      isActive(item, menu) {
        menu.forEach(function(value, index, array) {
          if(array[index].id != (item.id)){
            array[index].active = false;
          }
          array[index].childList.forEach(function(value1, index1, array1) { 
                array1[index1].active = false;
            })
        })
        item.active = true;
      },
    },
    mounted(){
        var self = this;
        bus.$on("clearMenuActive", function(msg){
            console.info(msg);
            self.menu.forEach(function(value, index, array) {
                array[index].active = false;
                array[index].childList.forEach(function(value1, index1, array1) { 
                    array1[index1].active = true;
                })
            });
        })
    }
  }
</script>

<style>
    .tac{
        width:180px;
    }
    .el-menu{
        background-color: #fff;
    }
    a{
        text-decoration:none;
    }
    .el-menu-item-group__title{
        padding-top:0;
    }
    .el-submenu .el-menu {
        background-color: rgba(238, 241, 246, 0.53);
    }
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
       /* background-color: #d1dbe5;*/
       background-color: rgba(238, 241, 246, 0.53);
    }
    .is-active{
        color:#20a0ff;
    }
    .df-clo-active{
        color:#48576A;
    }
</style>