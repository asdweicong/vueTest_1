<template>
	<div>
		<Layout>
	        <Header class="header">
	        	<Row>
			        <Col span="10" class="title">
			        	<h1>柏蒂姿后台管理系统</h1>
			        	<Dropdown trigger="click">
					        <a href="javascript:void(0)">
					            下拉菜单
					            <Icon type="arrow-down-b"></Icon>
					        </a>
					        <DropdownMenu slot="list">
					            <DropdownItem>驴打滚</DropdownItem>
					            <DropdownItem>炸酱面</DropdownItem>
					            <DropdownItem disabled>豆汁儿</DropdownItem>
					            <DropdownItem>冰糖葫芦</DropdownItem>
					            <DropdownItem divided>北京烤鸭</DropdownItem>
					        </DropdownMenu>
					    </Dropdown>
			        </Col>
			        <Col span="4">
			        	<a href="http://127.0.0.1:3000/bodizi/index.html">去前台</a>
			        </Col>
			        <Col span="10" class="user">
			        	<ul>
			        		<li>超级管理员</li>
			        		<li>admin</li>
			        	</ul>
			        </Col>
			    </Row>
	        </Header>
	        <Layout>
	            <Sider hide-trigger class="sider">
	            	<Menu :theme="theme2" accordion @on-select="pageRouter" :active-name="routerName">
		                <Submenu name="1">
		                    <template slot="title">
		                        <Icon type="ios-paper"></Icon>
		                        	用户管理
		                    </template>
		                    <MenuItem name="user/list">用户列表</MenuItem>
		                </Submenu>
		                <Submenu name="2">
		                    <template slot="title">
		                        <Icon type="ios-people"></Icon>
		                        	商品管理
		                    </template>
		                    <MenuItem name="goods/face">面膜系列</MenuItem>
		                    <MenuItem name="goods/luxu">法美经典奢华</MenuItem>
		                    <MenuItem name="goods/puro">紫瑰护理系列</MenuItem>
		                    <MenuItem name="goods/plat">白金护理系列</MenuItem>
		                    <MenuItem name="goods/suns">遮瑕防晒系列</MenuItem>
		                    <MenuItem name="goods/neck">颈部护理系列</MenuItem>
		                    <MenuItem name="goods/gold">黄金护理系列</MenuItem>
		                    <MenuItem name="goods/eyes">眼部护理系列</MenuItem>
		                </Submenu>
		                <Submenu name="3">
		                    <template slot="title">
		                        <Icon type="stats-bars"></Icon>
		                       		轮播管理
		                    </template>
		                    <MenuItem name="banners">图片管理</MenuItem>
		                </Submenu>
		                <Submenu name="4">
		                    <template slot="title">
		                        <Icon type="stats-bars"></Icon>
		                       		动态管理
		                    </template>
		                    <MenuItem name="news/company">公司资讯</MenuItem>
		                    <MenuItem name="news/goods">商品资讯</MenuItem>
		                </Submenu>
		                <Submenu name="5">
		                    <template slot="title">
		                        <Icon type="stats-bars"></Icon>
		                       		导航管理
		                    </template>
		                    <MenuItem name="nav/list">导航列表</MenuItem>
		                </Submenu>
		            </Menu>
	            </Sider>
	            <Content class="" style="padding: 0 0 0 70px; min-height: 800px;">
	            	<router-view></router-view>
	            </Content>
	        </Layout>
	    </Layout>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				theme2: 'light',
				routerName:''
			}
		},
		
		methods:{
			pageRouter(name){
				this.$router.push({path:'/admin/'+name})
			}
		},
		created (){
			
		}
	}
</script>

<style>
	.sider{
		background: none !important;
	}
	.ivu-layout.ivu-layout-has-sider{
		padding: 20px;
	}
	.header .ivu-dropdown-rel a{
		color: #ffffff;
	}
	.header{
		background: #222222;
		text-align: left;
	}
	h1{
		color: #ffffff;
		font-size: 16px;
		text-align: left;
		font-weight: normal;
		float: left;
		margin-right:50px;
	}
	.user{
		text-align: right;
		color: #ffffff;
		font-size: 16px;
	}
	.user li{
		display: inline-block;
	}
	.ivu-select-dropdown{
		z-index: 1000;
	}
</style>