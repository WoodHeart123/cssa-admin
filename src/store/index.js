import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLoading: false, // 全局 loading
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
            {
                name: 'orguser', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-people', // icon类型
                text: '成员管理', // 点击侧边栏跳到一个单独的路由页面，需要提前在 router.js 定义
            },
            {
                text: '个人',
                type: 'ios-paper',
                children: [
                    {
                        type: 'md-lock',
                        name: 'password',
                        text: '修改密码',
                    },
                    {
                        type: 'md-person',
                        name: 'userinfo',
                        text: '基本资料',
                    },
                ],
            },
            {
                text: '宣传',
                type: 'ios-book',
                children: [
                    {
                        type: "ios-calendar",
                        text: '文宣预约表',                    
                        name: "articleschedule"
                    }
                ]
            }
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
    },
})

export default store