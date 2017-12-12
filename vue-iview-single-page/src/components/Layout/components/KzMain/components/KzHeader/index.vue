<template>
  <div class="header">
      <div class="logo">
					<Button type="text" @click="toggleMenu">
						<Icon type="navicon" class="toggle-menu-icon" :class="rotate?'icon-rotate90':''" size="32"></Icon>
					</Button>
      </div>
      <div class="user">admin</div>
      <div class="sign-out">
				<Button type="text" @click="handSignOut">
					<Icon type="log-out"  size="32"></Icon>
				</Button>
      </div>
  </div>
</template>

<script>
export default {
	name: 'kz-header',
	data () {
		return {
			rotate: false,
		}
	},
  methods: {
      handSignOut() {
          console.log('退出登录')
			},
			toggleMenu () {
				this.rotate = !this.rotate;
				this.$store.dispatch('toggleMenu');
			}
  }
}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 55px;
    // background-image: linear-gradient(90deg,#1278f6,#00b4aa);
    background-color: #fff;
    display: flex;
    align-items: center;
		transition: .3s;
    .logo{
        flex: 1;
    }
    .user{
        flex: 1;
    }
    .sign-out{
        flex: 1;
				padding-right: 5px;
				text-align: right;
    }
}
.toggle-menu-icon{
	transition: .3s;
}
.icon-rotate90{
	transform: rotate(90deg);
}
</style>

