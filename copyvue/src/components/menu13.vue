<template>
  <div class="menu2-div content-box-shadow">
    <el-form ref="searchForm" :inline="true" :model="searchForm" class="padding-top20-bottom0-border1">
      <el-form-item label="关键字：" class="margin-bottom0">
        <el-input v-model="searchForm.searchCode" type="search" placeholder="关键字"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item class="margin-bottom0">
        <el-button type="primary" @click="onSubmit(searchForm)">搜索</el-button>
      </el-form-item>
    </el-form>

    <h5 class="margin-top12-bottom12">账单列表</h5>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
        element-loading-text="加载中..."
      border
      stripe
      
      style="width: 100%">
      <!-- <el-table-column  @select="handleSelectionChange" 
          type="selection"
          align="center"
          label-class-name="d-none"
          width="55">
      </el-table-column> -->
      <el-table-column
        prop="create_at"
        label="create_at"
        align="center"
        :formatter="handleGetDate"
         min-width="25">
      </el-table-column>
      <el-table-column
        prop="title"
        label="title"
        align="center"
         min-width="50">
      </el-table-column>
      <el-table-column
        prop="tab"
        label="tab"
        align="center"
         min-width="10">
      </el-table-column>
    </el-table>
    <br/>
      <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange1"
       :current-page="currentPage"
       :page-sizes="[10, 20, 30]"
       :page-size="limit"
       layout="total, sizes, prev, pager, next, jumper"
       :total="count">
     </el-pagination>
     <span>{{currentRow.title}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchForm: {
          searchCode: ''
        },
        tableData: [],
        currentPage: 1,
        limit: 10,//一页显示多少行
        offset: 0,
        count: 0,
        currentRow: {
          title: ""
        },
        flag: 0
      }
    },
    /*filter:{
      getDate(value) {
        return value+"99";
      }
    },*/
    computed:{
      // 仅读取，值只须为函数
      /* pageCount: function () {
         return this.tableData.length;
      }*/
    },
    created () {
      this.getData(this.currentPage, this.limit+1);
    },
    methods: {
    handleGetDate(row, column, cellValue) {
        return cellValue.replace(/T/g, " ").slice(0, 19);
      },
      handleSelectionChange(val, row) {
        if(val.length == 0){
          this.currentRow = {title: ""};
          return;
        }
        if(val.length == 1){
          this.currentRow = val[0];
          return;
        }
        if(val.length == 2){
          this.currentRow = val[1];
          this.$refs.multipleTable.clearSelection();
          this.$refs.multipleTable.toggleRowSelection(val[1]);
        }
      },
      handleSizeChange (val) {
        this.limit = val;
    this.getData((this.currentPage-1)*this.limit, this.currentPage*this.limit);
      },
      handleCurrentChange1 (val) {
        this.currentPage =  val;
    this.getData((this.currentPage-1)*this.limit, this.currentPage*this.limit);
      },
      getData (s,e) {
        this.loading = true;
          //说明：分页可以由前端拿到所有数据后，在进行对数据的处理分页，也可以有后端根据要显示具体的数量来实现
          //这里做的分页为根据 【后端控制前提】，这样的接口得有2个，一个接口先得到数据库里的总条数 [返回总数量：count]，
          //另一个接口是根据前端要拿多少条数据来显示而返回 用于页面显示的接口 
          //参数得有 limit[一页多少条数据]，offset[数据库的表中从第几条开始取，如0为从数据库表里第1条开始取]
          //
          //
          //这个demo中
          //1.先发送得ajax,后台返回总的数量，这里作为模拟，暂时写死先
          this.count = 34;
          //2.得到总数后，再次发送ajax，得到根据每页显示数量而得到的arr,并赋值给tableData
            this.$http({
              //这里作为模拟真实环境，将此接口得到的数据通过slice截取，用于赋值给tableData
                url: 'https://cnodejs.org/api/v1/topics',
                method: 'get',
                params: {
                    page: 1,
                    limit: this.count,
                    mdrender: 'false',
                },
            }).then((res) => {
              this.loading = false;
                this.tableData = res.data.data.slice(s,e);
                this.currentRow = {title: ""};
            }).catch((res) => {
                console.log('MaiSec.vue: ', res);
            });
      },
      onSubmit(searchForm) {
        console.info(searchForm);

      }
    }
  }
</script>

<style>
  .menu2-div{
    padding:30px;
    border-radius: 5px;
    background-color: #fff;
  }
  .el-table__header{
      background-color: #EEF1F6;
  }
  .d-none{
    visibility: hidden;
  }
</style>