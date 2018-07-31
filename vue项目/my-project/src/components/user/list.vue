<template>
	<div>
		<h3 class="page_title">用户列表</h3>
		<div style="text-align: left;margin-bottom: 20px;">
			<Input v-model="searchUsername" placeholder="用户名查找" style="width: 200px;" clearable></Input>
		</div>
		<Table border ref="selection" :columns="columns" :data="userListData"></Table>
		<Modal
	        title="Title"
	        v-model="modal"
	        :closable="false"
	        ok-text="确定"
	        @on-ok="close"
	        @on-cancel="close"
	        class="modal">
	        <Form :model="modalData" :label-width="80" v-if="modalData">
	        	<FormItem label="ID：">
	        		<p v-html="modalData._id"></p>
		            <!--<Input v-model="modalData.id" placeholder="Enter something..."></Input>-->
		        </FormItem>
		        <FormItem label="用户名：">
		        	<p v-html="modalData.username"></p>
		            <!--<Input v-model="modalData.username" placeholder="Enter something..."></Input>-->
		        </FormItem>
		        <FormItem label="手机：">
		            <Input v-model="modalData.iphone" placeholder="Enter something..."></Input>
		        </FormItem>
		        <FormItem label="邮箱：">
		            <Input v-model="modalData.email" placeholder="Enter something..."></Input>
		        </FormItem>
		        <FormItem label="角色：">
		            <Input v-model="modalData.role" placeholder="Enter something..."></Input>
		        </FormItem>
		        <FormItem label="创建时间：">
		            <Input v-model="modalData.createDate" placeholder="Enter something..."></Input>
		        </FormItem>
	        </Form>
	    </Modal>
	    <Modal
	        title="温馨提示:"
	        v-model="comfirModal"
	        :closable="false"
	        ok-text="确定"
	        @on-ok="changeUserInfo"
	        width="360">
	        	是否确认修改？
	    </Modal>
	    <div class="page">
	   		<Page :total="100" show-elevator></Page>
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				searchUsername: '',
				modal: false,
				comfirModal:false,
				modalData: null,
				changeUser:null,
				serverUrl:'http://127.0.0.1:3000',
				columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'ID',
                        key: '_id'
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '手机',
                        key: 'iphone'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '角色',
                        key: 'role',
                        sortable: true
                    },
                    {
                        title: '创建时间',
                        key: 'createDate'
                    },
                    {
                    	title:'操作'	,
                    	key:'operation',
                    	render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal = true;
                                           	this.modalData = params.row;
                                        }
                                    }
                              }, '编辑'),
                              	h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.comfirModal = true;
                                            this.changeUser = params.row;
                                            
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                userList: [],
                cacheUsers:[]
			}
		},
		computed:{
			userListData (value){
				return this.userList.filter(item=>{
					return item.username.toLowerCase().indexOf(this.searchUsername) != -1;
				})
			}
		},
		created(){
			this.$axios({
			    method:"POST",
			    url: this.serverUrl+'/user/getUsers',
			    data:{
			        firstName:"Fred",
			        lastName:"Flintstone"
			    }
			})
			.then(res=>{
				console.log(res)
				this.userList = res.data.users;
			});
		},
		methods:{
			changeUserInfo(){
				this.$axios({
					method:'PUT',
					url:this.serverUrl+'/user/update',
					data: this.changeUser,
				})
				.then(res=>{
					if(res.data.success === 1){
						setTimeout(()=>{
							this.$Message.success('修改成功！')
						},200)
					}
				})
			},
			close(){
				setTimeout(()=>{
					this.modalData = null;
				},300)
			}
		}
	}
</script>

<style>
	.page_title{
		font-size: 20px;
		font-weight: normal;
		text-align: left;
		line-height: 50px;
		border-bottom: 1px solid #cccccc;
		margin-bottom: 20px;
	}
	.page{
		margin-top: 30px;
	}
	.modal .ivu-btn-text{
		display: none;
	}
</style>