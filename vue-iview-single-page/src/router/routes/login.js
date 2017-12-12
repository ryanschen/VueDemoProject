import auth from '@/utils/auth'
export default {
    path: 'login',
    component: resolve => require(['@/views/Login'], resolve),
    beforeEnter (to, from, next)  {
        if (auth.loggedIn()) {
            next('/')
        } else {
            next()
        }
    }
}