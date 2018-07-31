<template>
	<div>
		<h3 class="page_title">导航管理</h3>
		<div style="text-align: left;margin-bottom: 20px;">
			<Button type="primary" @click="modal1 = true">
				<Icon type="plus-round"></Icon>
				添加导航
			</Button>
		</div>
		<Tabs type="card">
	        <TabPane :label="nav.title" v-for="(nav,index) in navs" ref="nav" :data-id="index" :key="index">
	        	<Table border :columns="nav.columns" :data="nav.list"></Table>
	        </TabPane>
	   </Tabs>
	   <Modal
	        v-model="modal1"
	        title="上传轮播图"
	        @on-ok="saveNavInfo"
	        @on-cancel="clearNavInfo"
	        ok-text="保存"
	        >
	        <Form :model="navInfo" label-position="left" :label-width="100">
		        <FormItem label="导航标题：">
		            <Input v-model="navInfo.name"></Input>
		        </FormItem>
		        <FormItem label="导航链接：">
		            <Input v-model="navInfo.url"></Input>
		        </FormItem>
		        <FormItem label="导航级别：">
		            <Input v-model="navInfo.type"></Input>
		        </FormItem>
		    </Form>
	    </Modal>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				navInfo:{
					name:'',
					url:'',
					type:''
				},
				modal1:false,
				navs:[
					{
						title:'导航列表',
						columns:[
							{
		                        type: 'selection',
		                        width: 60,
		                        align: 'center'
		                    },
		                    {
		                        title: '导航ID',
		                        key: '_id'
		                    },
		                    {
		                        title: '导航标题',
		                        key: 'name'
		                    },
		                    {
		                        title: '导航url',
		                        key: 'url'
		                    },
		                    {
		                        title: '导航级别',
		                        key: 'type'
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
		                                        marginRight: '5px'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            
		                                        }
		                                    }
		                              }, '编辑'),
		                                h('Button', {
		                                    props: {
		                                        type: 'error',
		                                        size: 'small'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            var id = params.row._id;
		                                            console.log(id)
		                                            this.$Modal.confirm({
		                                            	title:'温馨提示：',
		                                            	content:'是否确认删除？',
		                                            	onOk: ()=>{
		                                            		this.$axios({
				                                            	method:'DELETE',
				                                            	url:'http://127.0.0.1:3000/nav/delete',
				                                            	data:{
				                                            		id: id
				                                            	}
				                                            })
				                                            .then(res=>{
				                                            	console.log(res)
				                                            	if(res.data.status === 0){
				                                            		this.$Message.error('服务器错误！')
				                                            	}else if(res.data.status === 1){
				                                            		this.$Message.error('删除失败！')
				                                            	}else if(res.data.status === 2){
				                                            		this.$Message.success('删除成功！')
				                                            		var index = params.index;
				                                            		this.navs[this.index].list.splice(index,1)
				                                            	}
				                                            	
				                                            })
		                                            	}
		                                            })
		                                            
		                                        }
		                                    }
		                                }, '删除')
		                            ]);
		                        }
		                    }
						],
						list:[
							
						]
					}
				]
			}
		},
		methods:{
			saveNavInfo (){
				var flag = true;
				var index = this.$refs.nav[0].$attrs['data-id'];
				for(var x in this.navInfo){
					if(!this.navInfo[x]){
						flag = false;
						break;
					}
				}
				if(!flag){
					this.$Message.error('导航信息不完整！')
				}else{
					console.log(this.navInfo)
					this.$axios({
						method:'POST',
						url:'http://127.0.0.1:3000/nav/save',
						data: this.navInfo
					})
					.then(res=>{
						console.log(res)
						if(res.data.status === 0){
							this.$Message.error('服务器错误！')
						}else if(res.data.status === 1){
							this.$Message.error('导航已存在！')
						}else if(res.data.status === 2){
							this.$Message.error('保存失败！')
						}else if(res.data.status === 3){
							this.$Message.success('保存成功！')
							this.navs[index].list.push(res.data.nav)
							this.clearNavInfo()
							
						}
					})
					
				}
				
			},
			clearNavInfo (){
				for(var x in this.navInfo){
					this.navInfo[x] = ''
				}
			}
		},
		mounted (){
			this.index = this.$refs.nav[0].$attrs['data-id']
			this.$axios({
				method:'GET',
				url:'http://127.0.0.1:3000/nav/list'
			})
			.then(res=>{
				if(res.data.status === 1 && (this.index != null)){
					this.navs[this.index].list = res.data.navs
				}
			})
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
</style>