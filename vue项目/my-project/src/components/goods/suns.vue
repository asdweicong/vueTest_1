<template>
	<div>
		<h3 class="page_title">遮瑕防晒系列</h3>
		<Tabs type="card">
	        <TabPane :label="sun.title" v-for="(sun,index) in sunsGoods" :key="index">
	        	<Table border :columns="sun.columns" :data="sun.list"></Table>
	        </TabPane>
	    </Tabs>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				sunsGoods:[
					{
						title:'经典奢华套装',
						columns: [
		                    {
		                        type: 'selection',
		                        width: 60,
		                        align: 'center'
		                    },
		                    {
		                        title: '商品ID',
		                        key: 'goods_id'
		                    },
		                    {
		                        title: '商品图片',
		                        key: 'goods_url'
		                    },
		                    {
		                        title: '商品名称',
		                        key: 'goods_name'
		                    },
		                    {
		                        title: '商品价格',
		                        key: 'goods_price'
		                    },
		                    {
		                        title: '库存',
		                        key: 'goods_stock'
		                    },
		                    {
		                        title: '商品状态',
		                        key: 'goods_status'
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
		                    	goods_id: 10,
		                    	goods_url:'adminddd',
		                    	goods_name:'化妆品名称',
		                    	goods_price: 88.00,
		                    	goods_stock: 10,
		                    	goods_status: 0,
		                    	
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