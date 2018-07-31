<template>
	<div>
		<h3 class="page_title">轮播图图片管理</h3>
		<div style="text-align: left;margin-bottom: 20px;">
			<Button type="primary" @click="modal1 = true">
				<Icon type="plus-round"></Icon>
				增加轮播图
			</Button>
		</div>
		<Button type="primary" @click="download">
			<Icon type="plus-round"></Icon>
			下载
		</Button>
		<Tabs type="card">
	        <TabPane :label="banner.title" v-for="(banner,index) in banners" ref="banner" :data-id="index" :key="index">
	        	<Table border :columns="banner.columns" :data="banner.list"></Table>
	        </TabPane>
	    </Tabs>
		<Modal
	        v-model="modal1"
	        title="上传轮播图"
	        @on-ok="uploadBannerInfo"
	        @on-cancel="clearBannerInfo"
	        >
	        <Form :model="bannerInfo" label-position="left" :label-width="100">
		        <FormItem label="标题：">
		            <Input v-model="bannerInfo.name"></Input>
		        </FormItem>
		        <FormItem label="介绍：">
		            <Input v-model="bannerInfo.msg"></Input>
		        </FormItem>
		        <FormItem label="类型：">
		            <Input v-model="bannerInfo.type"></Input>
		        </FormItem>
		        <input type="file" id="bannerImg" ref="bannerImg" style="width: 75px; visibility: hidden;position: absolute;" name="plane" accept="image/*" />
		        <button type="button" class="selectImg" @click="clickUpload">选择图片</button>
				<div class="pic">
					<img :src="bannerInfo.url" alt="" />
				</div>
				<button type="button" v-if="bannerInfo.url" @click="uploadBannerImg" class="upload">上传图片</button>
		    </Form>
	    </Modal>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				modal1:false,
				files:null,
				bannerInfo:{
					name:'',
					msg:'',
					type:'',
					url:'',
				},
				index: null,
				banners:[
					{
						title:'首页轮播图',
						columns: [
		                    {
		                        type: 'selection',
		                        width: 60,
		                        align: 'center'
		                    },
		                    {
		                        title: '轮播图ID',
		                        key: '_id'
		                    },
		                    {
		                        title: '轮播图图片',
		                        key: 'url',
		                        render:(h,params)=>{
		                        	return h('img',{
		                        		props: {
	                                        
	                                    },
	                                    attrs:{
	                                    	src: params.row.url
	                                    },
	                                    style: {
	                                        maxWidth: '100%'
	                                    },
	                                    on: {
	                                        
	                                    }
		                        	})
		                        }
		                    },
		                    {
		                    	title:'介绍',
		                    	key: 'msg'
		                    },
		                    {
		                    	title:'标题',
		                    	key: 'name'
		                    },
		                    {
		                    	title:'类型',
		                    	key: 'type'
		                    },
		                    {
		                    	title:'图片大小(单位b)',
		                    	key: 'size'
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
		                                            this.$Modal.confirm({
		                                            	title:'温馨提示：',
		                                            	content:'是否确认删除？',
		                                            	onOk: ()=>{
		                                            		var id = params.row._id;
				                                            this.$axios({
				                                            	method: 'DELETE',
				                                            	url: 'http://127.0.0.1:3000/banner/delete',
				                                            	data:{
				                                            		id: id
				                                            	}
				                                            })
				                                            .then(res=>{
				                                            	console.log(res)
				                                            	if(res.data.status === 0){
				                                            		this.$Message.error('服务器错误！')
				                                            	}else if(res.data.status === 1){
				                                            		this.$Message.error('删除失败！未找到对应的图片')
				                                            	}else if(res.data.status === 2){
				                                            		this.$Message.success('删除成功！')
				                                            		this.banners[this.index].list.splice(params.index,1)
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
		                list: []
					}
				]
			}
		},
		mounted(){
			this.index = this.$refs.banner[0].$attrs['data-id']
			this.$axios({
				method: 'get',
				url: 'http://127.0.0.1:3000/banner/list',
			})
			.then(res=>{
				if(res.data.status === 1 && (this.index != null)){
					this.banners[this.index].list = res.data.banners
				}
			})
		},
		methods:{
			download (){
				this.$axios({
					method: 'get',
					url: 'http://127.0.0.1:3000/banner/download'
				})
				.then(res=>{
					console.log(res)
				})
			},
			uploadBannerInfo (){
				var flag = true;
				var index = this.$refs.banner[0].$attrs['data-id'];
				if(this.bannerInfo){
					for(var x in this.bannerInfo){
						if(!this.bannerInfo[x]){
							this.$Message.error('图片信息不完整！')
							flag = false;
							break;
						}
					}
					if(flag){
						this.index = index;
						this.$axios({
							method: 'POST',
							url: 'http://127.0.0.1:3000/banner/save',
							data: this.bannerInfo
						})
						.then(res=>{
							if(res.data.status === 0){
								this.$Message.error('服务器错误！')
							}else if(res.data.status === 1){
								this.$Message.error('图片名称重复！')
							}else if(res.data.status === 2){
								this.$Message.error('图片存储失败！')
							}else if(res.data.status === 3){
								this.$Message.success('图片存储成功！')
								this.banners[index].list.push(res.data.banner)
								this.clearBannerInfo()
							}
						})
					}
				}
			},
			clickUpload(){
				this.$refs.bannerImg.click();
				var that = this;
				this.$refs.bannerImg.onchange = function(){
					var render = new FileReader();
					that.files = this;
					render.readAsDataURL(this.files[0]);
					render.onload = function(e){
						that.bannerInfo.url = e.target.result;
					}
				}
			},
			uploadBannerImg (){
				var files = this.files.files[0];
				if(files.size> (1024*1024)){
					alert('图片大小不能超过1M！')
					return false;
				}
				var fd = new FormData();
				fd.append('banner',files)
				this.$axios.defaults.withCredentials = true;
				this.$axios({
					method:'POST',
					url:'http://127.0.0.1:3000/banner/upload',
					data:fd,
					responseType:'json'
				})
				.then(res=>{
					if(res.data.success === 2){
						this.$Message.success('图片上传成功！');
						this.bannerInfo.url = 'http://127.0.0.1:3000'+res.data.url;
						this.bannerInfo.size = files.size
					}
				})
			},
			clearBannerInfo (){
				setTimeout(()=>{
					for(var x in this.bannerInfo){
						this.bannerInfo[x] = ""
					}
					this.files = null;
					this.$refs.bannerImg.value = ""
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
	.ivu-table-wrapper{
		display: block !important;
	}
	.selectImg,.upload{
		padding: 5px 15px;
		border: 1px solid #eeeeee;
		background: none;
		outline: none;
		line-height: 20px;
		transition: all .5s;
		cursor: pointer;
		margin-left: 100px;
		border-radius: 4px;
	}
	.selectImg:hover,.upload:hover{
		border-color: #2d8cf0;
	}
	.pic{
		max-width: 200px;
		max-height: 200px;
		margin: 20px 0 20px 100px;
	}
	.pic img{
		display: block;
		max-width: 100%;
		max-height: 100%;
	}
</style>