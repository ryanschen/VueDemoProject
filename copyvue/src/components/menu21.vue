<template>

<div class="el-form content-box-shadow">
<h5 class="margin-top0-bottom10">商家信息修改</h5>
	<el-form ref="form" :model="form"  :rules="rules" :label-position="labelPosition" label-width="30%" class="border-15p">
	  <el-form-item label="商家名称："  prop="name">
	    <el-input v-model="form.name" type="search" class="input-width-50p"></el-input>
    </el-form-item>
    <el-form-item label="商家类型："  prop="type">
      <el-input v-model="form.type"  class="input-width-50p"></el-input>
    </el-form-item>
    <el-form-item label="地址："  prop="address">
      <el-input v-model="form.address" type="search" class="input-width-50p"></el-input>
    </el-form-item>
	  <el-form-item label="联系人：" prop="userName">
	    <el-input v-model="form.userName" type="search" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="联系电话" prop="userPhone">
	    <el-input type="search"  v-model="form.userPhone" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="email：" prop="email">
	    <el-input type="search"  v-model="form.email" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item label="经度：" prop="jdo">
	    <el-input type="search"  v-model="form.jdo" class="input-width-50p"></el-input>
	  </el-form-item>
    <el-form-item label="纬度：" prop="wdo">
      <el-input type="search"  v-model="form.jdo" class="input-width-50p"></el-input>
    </el-form-item>
    <el-form-item label="预订电话：" prop="orderPhone">
      <el-input type="search"  v-model="form.orderPhone" class="input-width-50p"></el-input>
    </el-form-item>
    <el-form-item label="是否可预订：" prop="isOrder">
      <el-select v-model="form.isOrder" placeholder="请选择" class="input-width-50p">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="返分比例：" prop="jifen">
      <el-input  v-model="form.jifen" class="input-width-50p">
        <template slot="append">%</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商家图片：">
      <!-- <el-input  v-model="form.picture" class="input-width-50p"></el-input>  prop="picture" -->
      <el-upload
        class="avatar-uploader"
        action="http://jsonplaceholder.typicode.com/posts/"
        :multiple="false"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
	  <el-form-item label="商家简介（140字以内）：" prop="remark">
	    <el-input type="textarea" v-model="form.remark" class="input-width-50p"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('form')">提交</el-button>
	    <el-button @click="resetForm('form')">重置</el-button>
	  </el-form-item>
	</el-form>
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
        headers: {
          header: "Access-Control-Allow-Origin"
        },
        options: [{
          value: 1,
          label: '不可预订'
        }, {
          value: 2,
          label: '可预订'
        }],
      	labelPosition: 'right',
        form: {
          isOrder: 1,
          imageUrl: '',
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
        }
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
      },
      handleAvatarSuccess(res, file) {
        console.info(res);
        console.info(file);
        this.form.imageUrl = URL.createObjectURL(file.raw);
        console.info(this.form.imageUrl);
        //if(file.status === "success"){
        this.$message.success('图片上传成功！');
        //}
      },
      beforeAvatarUpload(file) {
        console.info(file);
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;//file.size 单位为字节  size/1024 为 kb

        if (!isJPG) {
          this.$message.error('上传的图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传的图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarError(err, file, fileList) {
        console.info(err);
        console.info(file);
        console.info(fileList);
        if(err.type === "error"){
          this.$message.error('图片上传失败！');
        }
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
/*文件上传*/
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>