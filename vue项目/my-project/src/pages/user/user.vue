<template>
    <section id="login">
            <vue-particles
            	class="back"
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="150"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push">
                
            </vue-particles>
            <router-view></router-view>
    </section>
</template>
<script>


        export default {
            name:"login",
            data(){
                return{
                    
                }
            },
            methods:{
                
            }
        }
</script>
<style scoped>
	.back{
		background: url(../../../static/images/1.jpg) no-repeat;
		background-size: 100% auto;
		background-position: center;
	}
        /*#login{
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
            background: rgb(0,0,0,.1);
           
        }
        .userName,.userPassword{
            display: flex;
            justify-content: center;
            line-height: 35px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .title{
            font-size: 35px;
            display: flex;
            justify-content: center;
            padding-top: 20px;
            padding-bottom: 20px;
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
        }*/
</style>

