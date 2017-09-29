<template>
<div class="el-form content-box-shadow">
	<el-form ref="form" :model="form"  :rules="rules" :label-position="labelPosition" label-width="30%" class="border-15p">
	  <el-form-item label="消费类型："  prop="type">
	    <el-radio-group v-model="form.type">
	      <el-radio :label="1">储值</el-radio>
	      <el-radio :label="2">积分</el-radio>
	      <el-radio :label="3">现金</el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="实体卡：" prop="card">
	    <el-input v-model="form.card" type="search" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="手机号：" prop="phone">
	    <el-input type="search"  v-model.number="form.phone" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="匹配码：" prop="pipei">
	    <el-input type="search"  v-model="form.pipei" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="消费金额：" prop="amount">
	    <el-input type="search"  v-model="form.amount" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="备注(40字以内):" prop="remark">
	    <el-input type="textarea"  v-model="form.remark" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('form')">提交</el-button>
	    <el-button @click="resetForm('form')">重置</el-button>
	  </el-form-item>
	</el-form>

	<h3>账单列表</h3>
	 <el-table
    :data="tableData"
    border
    style="width: 100%" 
    class="border-15p">
    <el-table-column
      prop="date"
      label="日期"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="地址">
    </el-table-column>
  </el-table>
</div>	
</template>

<script>
  export default {
    data() {
	  let checkPhone = (rule, value, callback) => {
	  	const reg=/^1[345678]\d{9}$/;
        if (!value) {
          return callback(new Error('请输入手机号码'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!reg.test(value)) {
              callback(new Error('格式有误'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
      	labelPosition: 'right',
        form: {
          type: 1,
          card: '',
          phone: '',
          pipei: '',
          amount: '',
          remark: ''
        },
        rules: {
        	type: [
        		{ required: true, message: '该项必填'}
        	],
        	card: [
        		{ required: true, message: '请输入实体卡号'},
        		{ max: 32, message: '最大输入32个字符'}
        	],
        	phone: [
        		{ required: true, message: '请输入手机号码'},
        		/*{ type: 'number', min: 13000000000, max: 19999999999, message: '请输入正确的手机格式'}*/
        		{validator: checkPhone}
        	],
        	pipei: [
        		{ required: true, message: '请输入匹配码'}
        	],
        	amount: [
        		{  required: true, message: '请输入消费金额'}
        	],
        	remark: [
        		{ max: 40, message: '最大输入40个字符'}
        	]
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	console.info(this.form);
            alert('submit!');
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
	.el-form{
		background-color: #fff;
		padding:30px;
		border-radius: 5px;
	}
	.border-15p{
	    border: 2px solid #20a0ff;
	    border-radius: 5px;
	}
	.input-width-50p{
		width:50%;
	}
</style>