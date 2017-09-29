<template>
  <div class="menu2-div content-box-shadow">
    <el-form ref="searchForm" :inline="true" :model="searchForm" class="padding-top20-bottom0-border1">
      <el-form-item label="手机号码：" class="margin-bottom0">
        <el-input v-model="searchForm.searchPhone" type="search" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" class="margin-bottom0">
        <el-input v-model="searchForm.searchName" type="search" placeholder="姓名"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item class="margin-bottom0">
        <el-button type="primary" @click="onSubmit('searchForm')">搜索</el-button>
      </el-form-item>
    </el-form>

    <h5 class="margin-top12-bottom12">商店及群组会员（含储值会员）</h5>
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
         min-width="20">
      </el-table-column>
      <el-table-column
        
        label="title"
        align="center"
         min-width="50">
          <template scope="scope">
	        <el-popover trigger="hover" placement="right">
	          <p>create_at: {{ scope.row.create_at }}</p>
	          <p>title: {{ scope.row.title }}</p>
	          <div slot="reference" class="name-wrapper">
	            {{ scope.row.title }}
	          </div><!-- <el-tag> prop="title"  </el-tag>-->
	        </el-popover>
	      </template>
      </el-table-column>
      <el-table-column
        prop="tab"
        label="tab"
        align="center"
         min-width="10">
      </el-table-column>
      <el-table-column
	      label="操作"
	      align="center"
	      min-width="20">
	      <template scope="scope">
	      <el-button
	          size="small"
	          type="success"
	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button
	          size="small"
	          type="warning"
	          @click.native.prevent="handleDelete(scope.$index, tableData)"
	         >删除</el-button>
	      </template>
	    </el-table-column> 
    </el-table>
	<br>
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

     <el-dialog title="编辑会员信息" top="8%" :close-on-click-modal="constFalse" :close-on-press-escape="constFalse" :visible.sync="editFormVisible"
     	@open="openEditForm"
     	:before-close="beforeClose">
	  <el-form :model="editForm" ref="editForm">
	    <el-form-item label="照片：" :label-width="formLabelWidth">
	      <el-input v-model="editForm.picture" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="会员姓名：" :label-width="formLabelWidth">
	      <label>{{editForm.name}}</label>
	    </el-form-item>
	    <el-form-item label="手机号码：" :label-width="formLabelWidth">
	      <label>{{editForm.phone}}</label>
	    </el-form-item>
	    <el-form-item label="会员编号：" :label-width="formLabelWidth">
	      <label>{{editForm.vipCode}}</label>
	    </el-form-item>
	    <el-form-item label="身份证号：" :label-width="formLabelWidth">
	      <label>{{editForm.idCard}}</label>
	    </el-form-item>
	    <el-form-item label="备注(140字以内)：" :label-width="formLabelWidth">
	      <el-input type="textarea" v-model="editForm.tab" class="input-width-50p"></el-input>
	  </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="cancelSubmit">取 消</el-button>
	    <el-button type="primary" @click="editSubmit(editForm)">确 定</el-button>
	  </div>
	</el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchForm: {
          searchCode: ''
        },
        editFormVisible: false,//show dialog flag
        oldEditFormData: null,
        editForm: {
			picture: '',
			name: '',
			phone: '',
			vipCode: '',
			idCard: '',
			remark: '',
			tab: ''
        },
        formLabelWidth: '140px',
        tableData: [],
        currentPage: 1,
        limit: 10,//一页显示多少行
        offset: 0,
        count: 0,
        currentRow: {
          title: ""
        },
        flag: 0,
        constFalse: false
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
        console.info(this.searchForm);

      },
      handleEdit(index, row) {
      	this.editFormVisible = true;
        console.log(index, row);
        this.editForm = row;
        this.oldEditFormData = JSON.parse(JSON.stringify(row));
      },
      handleDelete(index, rows) {
        console.log(index, rows);
        rows.splice(index, 1);
      },
      editSubmit(formName) {
      	console.info(formName);
      },
      resetRowData() {
		let id = this.oldEditFormData.author_id;
      	this.tableData.forEach((value, key, obj)=>{
      		if(value.author_id == id){
      			obj[key].tab = this.oldEditFormData.tab;
      			//...
      		}
      	});
      },
      cancelSubmit() {
      	this.resetRowData();
      	this.editFormVisible = false;
      },
      openEditForm() {
      	console.info("openEditForm");
      },
      beforeClose(done) {
      	console.info("beforeClose");
      	this.$confirm('确认关闭？')
          .then(_ => {
          	console.info(this.oldEditFormData);
          	this.resetRowData();
            done();
          })
          .catch(_ => {});
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
  .el-dialog__header{
    padding: 10px;
    background-color: #dfe6ec;
    border-radius: 5px 5px 0 0;
  }
  .el-dialog{
  	border-radius: 5px !important;
  	box-shadow: 0 0 6px #8391a5;
  }
</style>