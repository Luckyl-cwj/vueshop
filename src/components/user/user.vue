<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home', name: '' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '', name: '' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '', name: '' }">用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card :body-style="{ padding: '0px' }" calss='elCard'>


            <el-row :gutter="210">
                <el-col :span="12">

                    <el-input placeholder="请输入内容" class="input-with-select" v-model='userListParams.query'
                        :clearable='true' @clear=getUserList>
                        <el-button slot="append" icon="el-icon-search" @click=getUserList></el-button>
                    </el-input>

                </el-col>
                <el-col :span="12">
                    <el-button type='primary' @click="addUserFlag = true">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="role_name" label="角色">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope='scope'>
                        {{scope.row.mg_state}}

                        <el-switch v-model="scope.row.mg_state" @change='userStateChanged(scope.row)'>
                        </el-switch>


                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220%">
                    <template slot-scope='scope'>

                        <el-tooltip :enterable="false" class="item" effect="dark" content="Top Right 提示文字"
                            placement="top-end">
                            <el-button size='mini' type="primary" icon="el-icon-edit"
                                @click="showChangeDialog(scope.row.id)">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" class="item" effect="dark" content="Top Right 提示文字"
                            placement="top-end">
                            <el-button size='mini' type="danger" icon="el-icon-delete"
                                @click="userDeleteById(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip :enterable="false" class="item" effect="dark" content="Top Right 提示文字"
                            placement="top-end">
                            <el-button size='mini' type="warning size='mini' " icon="el-icon-setting" @click="">
                            </el-button>
                        </el-tooltip>





                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <span class="demonstration"></span>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="userListParams.pagenum" :page-sizes="[10, 12, 3, 10]"
                    :page-size="userListParams.pagesize" layout="total, sizes, prev, pager, next, jumper"
                    :total="userTotal">
                </el-pagination>
            </div>

        </el-card>
        <!-- 添加用户·················· -->
        <el-dialog title="添加用户" :visible.sync="addUserFlag" width="60%" @close='addUserFormClose'>
            <el-form :model="addUserForm" :rules="addUserFormRules" ref='addUserFormRef' label-width='80px'>
                <el-form-item label='用户名' prop='username'>
                    <el-input v-model='addUserForm.username'></el-input>
                </el-form-item>
                <el-form-item label='密码' prop='password'>
                    <el-input v-model='addUserForm.password'></el-input>
                </el-form-item>
                <el-form-item label='邮箱' prop='email'>
                    <el-input v-model='addUserForm.email'></el-input>
                </el-form-item>
                <el-form-item label='手机' prop='mobile'>
                    <el-input v-model='addUserForm.mobile'></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer">
                <el-button @click="addUserFlag = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改用户·················· -->
        <el-dialog title="修改信息 " :visible.sync="changInfoFlag" width="30%" @close="changInfoClose">
            <span slot="footer">
                <el-form :rules="addUserFormRules" :model="changeUserForm" ref="changeUserFormRef" label-width="80px">
                    <el-form-item label="用户ID">
                        <el-input v-model="changeUserForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="changeUserForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="changeUserForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

                <el-button @click="changInfoFlag=false ">取 消</el-button>
                <el-button type="primary" @click="changeUserClick">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>

<script>
    export default {
        data() {
            // 自定义规则
            var checkemail = (rele, value, cb) => {
                const emailreg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                if (emailreg.test(value)) {
                    return cb()
                }
                cb(new Error('输入合法邮箱'))
            }
            var checkphone = (rele, value, cb) => {
                const phonereg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
                if (phonereg.test(value)) {
                    return cb()
                }
                cb(new Error('输入合法手机号'))
            }
            return {
                userListParams: {
                    query: '',
                    pagenum: 1,
                    pagesize: 12
                },
                userList: [],
                userTotal: 0,
                addUserFlag: false,
                changInfoFlag: false,
                // 添加用户
                addUserForm: {
                    username: '',
                    password: '111111',
                    email: '412@qq.com',
                    mobile: '13333333333'

                },

                addUserFormRules: {
                    username: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'mima', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'email', trigger: 'blur' },
                        { validator: checkemail }
                    ],
                    mobile: [
                        { required: true, message: 'shouji', trigger: 'blur' },
                        // { length:13, message: '长度在 3 到 10 个字符', trigger: 'blur' },
                        // {validator:checkphone},
                        { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/, message: '输入手机号', trigger: 'blur' }

                    ]
                },
                changeUserForm: {
                    id: '',
                    mobile: '',
                    email: ''

                }
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                const { data: res } = await this.$http.get('users', { params: this.userListParams })
                console.log(res);
                if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
                this.userList = res.data.users
                this.userTotal = res.data.total
                console.log(this.userList);
            },
            handleSizeChange(newSize) {
                this.userListParams.pagesize = newSize
                this.getUserList()
            },
            handleCurrentChange(nwePage) {
                this.userListParams.pagenum = nwePage
                this.getUserList()

            },
            //监听switch
            async userStateChanged(scopeRow) {
                const { data: res } = await this.$http.put(`users/${scopeRow.id}/state/${scopeRow.mg_state}`)
                if (res.meta.status !== 200) {
                    scopeRow.mg_state = !scopeRow.mg_state
                    return this.$message.error('失败')
                }
                this.$message.success(res.meta.msg)
                console.log(res);

            },
            addUserFormClose() {
                this.$refs.addUserFormRef.resetFields()
            },
            addUser() {
                this.$refs.addUserFormRef.validate(async valid => {
                    if (!valid) return
                    const { data: res } = await this.$http.post('users', this.addUserForm)
                    if (res.meta.status !== 201) {
                        this.$message.error('添加用户失败')
                    }
                    this.$message.success('添加用户成功')
                    this.addUserFlag = false
                    this.getUserList()
                })
            },
            async  showChangeDialog(changeuserId) {
                this.changInfoFlag = true
                const { data: res } = await this.$http.get("users/" + changeuserId)
                console.log(res);
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.changeUserForm = res.data

            },
            changInfoClose() {
                this.$refs.changeUserFormRef.resetFields()
            },
            changeUserClick() {
                this.$refs.changeUserFormRef.validate(async (valid) => {
                    if (!valid) return
                    const { data: res } = await this.$http.put('users/' + this.changeUserForm.id, {
                        email: this.changeUserForm.email,
                        mobile: this.changeUserForm.mobile,
                    })
                    console.log(res);

                    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                    this.changInfoFlag = false
                    this.getUserList()
                    this.$message.success(res.meta.msg)
                })
            },
            userDeleteById(userDeleteId) {
                // console.log(userDeleteId);
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const { data: res } = await this.$http.delete("users/" + userDeleteId)
                    if (res.meta.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getUserList()
                    } else {
                        this.$message({
                            type: 'info',
                            message: '删除失败!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });





            }
        }
    }

</script>

<style lang="less" scoped>
    .el-breadcrumb {
        margin-bottom: 20px
    }

    ;

    .el-card {
        box-shadow: 0 11px 11px rgba(0, 0, 0, 0.5) !important;
        padding: 10px
    }

    .el-table {
        margin-top: 15px;
        font-size: 15px;
    }

    .el-pagination {
        margin-top: 30px
    }
</style>