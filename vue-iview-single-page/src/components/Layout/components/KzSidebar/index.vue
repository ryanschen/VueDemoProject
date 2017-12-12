<template>
    <div class="sidebar" :class="toggleMenu?'small-menu':''">
        <div v-show="!toggleMenu">
            <div class="logo" @click="$router.push('/')">
                <h1>客主商家联盟</h1>
            </div>
            <Menu :theme="'dark'" :open-names="['1']" accordion class="menu">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容管理
                    </template>
                    <MenuItem name="1-1">文章管理</MenuItem>
                    <MenuItem name="1-2">评论管理</MenuItem>
                    <MenuItem name="1-3">举报管理</MenuItem>
                </Submenu>
            </Menu>
        </div>
        <div style="width:60px;" v-show="toggleMenu">
            <template v-for="(item, index) in menuList">
                <div style="text-align: center;" :key="index">
                    <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                        <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                        </Button>
                        <DropdownMenu style="width: 200px;" slot="list">
                            <template v-for="(child, i) in item.children">
                                <DropdownItem :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></DropdownItem>
                            </template>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                        <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                        </Button>
                        <DropdownMenu style="width: 200px;" slot="list">
                            <DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'kz-sidebar',
    props: {
        menuList: {
            type: Array,
            required: true
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        },
        toggleMenu: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            // if (typeof item.title === 'object') {
            //     return this.$t(item.title.i18n);
            // } else {
                return item.title;
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
.small-menu{
    width: 60px !important;
}
.sidebar{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    background-color: #495060;
    /* #495060; */
    overflow-x: hidden;
    overflow-y: auto;
    transition: .3s;
    .logo{
        height:55px;
        text-align:center;
        line-height:55px;
        color:#fff;
        font-weight: normal;
    }
    .menu{
        width: 200px !important;
    }
}
</style>

