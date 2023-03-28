import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue"
import TeamUpdatePage from "../pages/TeamUpdatePage.vue"

import UserPage from "../pages/UserPage.vue"
import UserEditPage from '../pages/UserEditPage.vue'
import UserLoginPage from '../pages/UserLoginPage.vue'
import UserUpdatePage from '../pages/UserUpdatePage.vue'
import UserTeamJoinPage from '../pages/UserTeamJoinPage.vue'
import UserTeamCreatePage from '../pages/UserTeamCreatePage.vue'

import SearchPage from '../pages/SearchPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'



const routes = [
    { path: '/', component: Index },
    { path: '/team', title: '找队伍', component: TeamPage },
    { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
    { path: '/search', title: '找伙伴', component: SearchPage },
    { path: '/user', title: '个人信息', component: UserPage },
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/edit', title: '编辑信息', component: UserEditPage },
    { path: '/user/login', title: '登入', component: UserLoginPage },
    { path: '/user/update', title: '当前信息', component: UserUpdatePage },
    { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinPage },
    { path: '/user/team/create', title: '创建队伍', component: UserTeamCreatePage },
]

export default routes