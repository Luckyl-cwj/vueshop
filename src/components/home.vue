<template>

        <el-container class="home-container">
                <el-header>
                        <div>
                                <img src="../assets/heima.png" alt="">
                                <span>电商管理系统</span> 电商管理系统
                        </div>
                        <el-button type="primary" @click="checkout">退出</el-button>
                </el-header>
                <el-container>
                        <el-aside :width="isCollapse? '64px':'200px'">
                                <div class="toggle-button" @click='toggleCollapse'>|||</div>
                                <el-menu background-color="#485a4c" text-color="#fff" active-text-color="#ffd04b"
                                        :unique-opened='true' :collapse="isCollapse" :collapse-transition="false"
                                        :router='true' :default-active='active'>
                                        <el-submenu :index="item.id+''" v-for='item in menuList' :key='item.id'>
                                                <template slot="title">
                                                        <i :class="iconList[item.id]"></i>
                                                        <span>{{item.authName}}</span>
                                                </template>
                                                <!-- 二级菜单 -->
                                                <el-menu-item :index="'/'+itemChi.path" v-for='itemChi in item.children'
                                                        :key='itemChi.id' @click="saveNavState('/'+itemChi.path)">
                                                        <i class="el-icon-menu"></i>
                                                        <span>{{itemChi.authName}}</span>
                                                </el-menu-item>
                                        </el-submenu>

                                </el-menu>

                        </el-aside>
                        <el-main>
                                <router-view></router-view>
                        </el-main>
                </el-container>
        </el-container>
</template>
<script>
        export default {
                data() {
                        return {
                                menuList: [],
                                iconList: {
                                        '125': 'iconfont icon-user',
                                        '103': 'iconfont icon-tijikongjian',
                                        '101': 'iconfont icon-shangpin',
                                        '102': 'iconfont icon-danju',
                                        '145': 'iconfont icon-baobiao'
                                },
                                isCollapse: false,
                                active: ''
                        }
                },
                created() {
                        this.getMenuList(),
                                this.active = window.sessionStorage.getItem('activePath')
                },
                methods: {
                        checkout() {
                                window.sessionStorage.clear()
                                this.$router.push('/login')
                        },
                        async  getMenuList() {
                                const { data: res } = await this.$http.get('menus')
                                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                                this.menuList = res.data
                                console.log(this.menuList);
                        },
                        toggleCollapse() {
                                this.isCollapse = !this.isCollapse
                        },
                        saveNavState(activePath) {
                                window.sessionStorage.setItem('activePath', activePath)
                                this.active = window.sessionStorage.getItem('activePath')
                        }
                },
        }
</script>
<style lang="less" scoped>
        .el-header {
                background-color: #313131;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 0px;
                color: aliceblue;
                font-size: 20px;


        }

        .el-header>div {
                display: flex;
                align-items: center;
                /*   span{
                margin-left:15px
        } */
        }

        .el-header>div>span {
                margin-left: 15px
        }

        .el-aside {
                background-color: #485a4c;
        }

        .el-main {
                background-color: rgb(199, 91, 91);
        }

        .home-container {
                height: 100%;
        }

        .iconfont {
                margin-right: 10px
        }

        .el-menu {
                border-right: 0px
        }

        .toggle-button {
                background-color: rgb(99, 131, 113);
                font-size: 10px;
                line-height: 24px;
                text-align: center;
                color: antiquewhite;
                letter-spacing: 2px;
                cursor: pointer;
        }
</style>