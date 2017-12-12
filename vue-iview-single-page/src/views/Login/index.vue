<template>
  <div class="login">
    <Card style="width:320px">
        <p slot="title" style="text-align:center;font-size:16px;">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            后台管理系统
        </p>
        <Form ref="loginForm" :model="formInline" :rules="ruleInline" >
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名" style="font-size:14px;">
                    <Icon type="ios-person-outline" slot="prepend" style="font-size:16px;"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="请输入密码" style="font-size:14px;">
                    <Icon type="ios-locked-outline" slot="prepend" style="font-size:16px;"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align:center;">
                <Button type="primary" style="width:100%;font-size:14px;" @click="handleSubmit">登录</Button>
                <!-- <Button type="primary" @click="handleSubmit('formInline')">清空</Button> -->
            </FormItem>
        </Form>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    // { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$Message.success('登陆成功!');
                    sessionStorage.setItem('KEZHUNET_ISLOGIN', 1);
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 2000);
                } else {
                    this.$Message.error('登录失败!');
                }
            })
        }
    }
  }
</script>

<style lang="scss">
body{
    background-color: #495060;
}
.login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
