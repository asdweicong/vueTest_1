<template>
	<div>
		<h3 class="page_title">商品资讯</h3>
		<Tabs type="card">
	        <TabPane :label="item.title" v-for="(item,index) in newsGoods" :key="index">
	        	<Table border :columns="item.columns" :data="item.list"></Table>
	        </TabPane>
	   </Tabs>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				newsGoods:[
					{
						title:'商品最新资讯',
						columns: [
		                    {
		                        type: 'selection',
		                        width: 60,
		                        align: 'center'
		                    },
		                    {
		                        title: '新闻ID',
		                        key: 'news_id'
		                    },
		                    {
		                        title: '新闻图片',
		                        key: 'news_url'
		                    },
		                    {
		                    	title:'新闻标题',
		                    	key: 'news_title'
		                    },
		                    {
		                    	title:'新闻详情',
		                    	key: 'news_details'
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
		                                            
		                                        }
		                                    }
		                                }, '删除')
		                            ]);
		                        }
		                    }
		                ],
		                list: [
		                    {
		                    	news_id: 100,
		                    	banner_url:'adminddd',
		                    	news_url: 'ddd',
		                    	news_title:'新闻标题1',
		                    	news_details:'这是新闻的内容这是新闻的内容这是新闻的内容这是新闻的内容这是新闻的内容'
		                    }
		                ]
					}
				]
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
</style>