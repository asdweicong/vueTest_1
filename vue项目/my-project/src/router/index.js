import Vue from 'vue'
import Router from 'vue-router'

import user from '@/pages/user/user'
import login from '@/pages/user/login'
import regist from '@/pages/user/regist'
import home from '@/pages/home/home'
import userList from '@/components/user/list'
import admin from '@/components/admin'
import face from '@/components/goods/face'
import luxu from '@/components/goods/luxu'
import puro from '@/components/goods/puro'
import plat from '@/components/goods/plat'
import suns from '@/components/goods/suns'
import neck from '@/components/goods/neck'
import gold from '@/components/goods/gold'
import eyes from '@/components/goods/eyes'
import banner from '@/components/banner'
import company from '@/components/news/company'
import goods from '@/components/news/goods'
import nav from '@/components/nav'

Vue.use(Router)

export default new Router({
	routes: [
		{
	      	path: '/user',
	      	name: 'user',
	      	component: user,
	      	children:[
//	      		{
//	      			path:'/',
//	      			name:'login',
//	      			component: login
//	      		},
	      		{
	      			path:'/user/login',
	      			name:'login',
	      			component: login
	      		},
	      		{
	      			path:'/user/regist',
	      			name:'regist',
	      			component: regist
	      		}
	      	]
	   	},
	    {
	      	path: '/',
	      	name: 'admin',
	      	component: home,
	      	children:[
	      		{
	      			path:'/admin',
	      			component: admin
	      		},
	      		{
	      			path:'/admin/user/list',
	      			component:userList
	      		},
	      		{
	      			path:'/admin/goods/face',
	      			component:face
	      		},
	      		{
	      			path:'/admin/goods/luxu',
	      			component:luxu
	      		},
	      		{
	      			path:'/admin/goods/puro',
	      			component:puro
	      		},
	      		{
	      			path:'/admin/goods/plat',
	      			component:plat
	      		},
	      		{
	      			path:'/admin/goods/suns',
	      			component:suns
	      		},
	      		{
	      			path:'/admin/goods/neck',
	      			component:neck
	      		},
	      		{
	      			path:'/admin/goods/gold',
	      			component:gold
	      		},
	      		{
	      			path:'/admin/goods/eyes',
	      			component:eyes
	      		},
	      		{
	      			path:'/admin/banners',
	      			component:banner
	      		},
	      		{
	      			path:'/admin/news/company',
	      			component:company
	      		},
	      		{
	      			path:'/admin/news/goods',
	      			component:goods
	      		},
	      		{
	      			path:'/admin/nav/list',
	      			component:nav
	      		},
	      	]
	    }
  ]
})
