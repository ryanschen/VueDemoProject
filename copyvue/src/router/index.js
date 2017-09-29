import Vue from 'vue';
import Router from 'vue-router';

import ArticleCom from '@/components/ArticleCom';
import UserCom from '@/components/UserCom';
import MainSec from '@/components/MainSec';
import SideSec from '@/components/SideSec';
import MenuSide from '@/components/menuSide';
import Home from '@/components/home';
import Menu11 from '@/components/menu11';
import Menu12 from '@/components/menu12';
import Menu13 from '@/components/menu13';
import Menu14 from '@/components/menu14';
import Menu15 from '@/components/menu15';

import Menu21 from '@/components/menu21';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'RootPath',
        components: {
            main: Home,
        },
    }, {
        path: '/menu11',
        components: {
            main: Menu11,
        },
    }, {
        path: '/menu12',
        components: {
            main: Menu12,
        },
    }, {
        path: '/menu13',
        components: {
            main: Menu13,
        },
    }, {
        path: '/menu14',
        components: {
            main: Menu14,
        },
    }, {
        path: '/menu15',
        components: {
            main: Menu15,
        },
    }, {
        path: '/menu21',
        components: {
            main: Menu21,
        },
    },{
        path: '/topic/:id',
        name: 'ArticleRoute',
        components: {
            main: ArticleCom,
            side: SideSec,
        },
    }, {
        path: '/user/:name',
        name: 'UserRoute',
        components: {
            main: UserCom,
        },
    }, {
        path: '/user/:name',
        redirect: '/user:name',
    }],
});
