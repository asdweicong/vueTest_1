<template>
    <section class="logo">
        <section class="title">
            <h3>注册</h3>
        </section>
        <section class="userName">
            <span>账号：</span><Input v-model="userinputName" placeholder="请输入账号" clearable style="width: 300px"></Input>
        </section>
         <section class="userPassword">
            <span>密码：</span><Input v-model="userinputPassword" placeholder="请输入密码" clearable style="width: 300px"></Input>
        </section>
        <section class="userLogin">
                <section class="userUsBtn">
                	<router-link :to="{name:'login',params:{userID:123}}" class="userrelogin">已有账号? 立即登录</router-link>
                     <!--<a href="#/user/login" class="userrelogin">已有账号? 立即登录</a>-->
                     <Button type="primary" v-on:click="registbtn()">注册</Button>
                </section>
        </section>
	</section>
</template>
<script>


        export default {
            name:"login",
            data(){
                return{
                    userinputName:null,
                    userinputPassword:null
                }
            },
            methods:{
                registbtn (){
                	
                    if(this.userinputName == null ||this.userinputPassword == null){
                         this.$Message.warning('账号或密码不能为空');
                    }else{
                    	
                    	var data = {
                    		username: this.userinputName,
                    		password: this.userinputPassword
                    	}
						this.$axios.post('http://127.0.0.1:3000/user/regist',data)
						.then(response => {
						    if(response.data.status === 'success'){
						    	this.instance('success','注册成功！')
						    }else{
						    	this.instance('error','该用户名已被注册！')
						    }
						})
						.catch(function(error){
						    console.log(error);
						});
                      	//this.$router.push({ path: '/user/login' })
                    }
                },
                instance (type,content) {
	                const title = '温馨提示：';
	                content = ('<p style="font-size:20px">'+content+'</p>') || ('<p style="font-size:20px">这里是提示内容</p>')
	                switch (type) {
	                    case 'info':
	                        this.$Modal.info({
	                            title: title,
	                            content: content
	                        });
	                        break;
	                    case 'success':
	                        this.$Modal.success({
	                            title: title,
	                            content: content,
	                            onOk: ()=>{
	                            	this.$router.push({ path: '/user/login' })
	                            }
	                        });
	                        break;
	                    case 'warning':
	                        this.$Modal.warning({
	                            title: title,
	                            content: content
	                        });
	                        break;
	                    case 'error':
	                        this.$Modal.error({
	                            title: title,
	                            content: content
	                        });
	                        break;
	                }
	            }
            }
        }
</script>
<style scoped>
		
        #login{
            position: relative;
        }
        .logo{
             width: 500px;
             height: 300px;
             border: 1px solid #eee;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -250px;
            margin-top: -200px;
            background: rgb(0,0,0,.3);
           
        }
        .userName,.userPassword{
            display: flex;
            justify-content: center;
            line-height: 35px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .userName span,.userPassword span{
        	color: #ffffff;
        }
        .title{
            font-size: 35px;
            display: flex;
            justify-content: center;
            padding-top: 20px;
            padding-bottom: 20px;
            color: #ffffff;
        }
        .title h3{
    	font-weight: normal;
    }
        .userLogin{
            display: flex;
            justify-content: flex-end;
        }
        .userUsBtn{
            width: 100%;
            display: flex;
            justify-content: space-around;
        }
        .userrelogin{
            position: relative;
            top: 13px;
        }
</style>

