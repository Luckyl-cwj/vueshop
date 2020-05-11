<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card :body-style="{ padding: '0px' }">
      <el-button type="primary" @click="addRoles" class="addRolesButton">添加角色</el-button>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope='scope'>
            <el-row v-for='(item1,i1) in scope.row.children ' :key="item1.id"
              :class="['tagborderbottom', i1==0?'tagborderTop':'','vcenter']">
              <el-col :span="6">
                <el-tag closable @close="removeRightById({
                  userId:scope.row,
                  rightId:item1.id})">
                  {{item1.authName}}

                </el-tag>
                <i class="el-icon-caret-right"></i>

              </el-col>
              <el-col :span="18">
                <el-row v-for='(item2,i2) in item1.children' :key="item2.id"
                  :class=" [i2==0?'':'tagborderTop','vcenter']">
                  <el-col :span="6">
                    <el-tag type='success' closable @close="removeRightById({
                      userId:scope.row,
                      rightId:item2.id})">
                      {{item2.authName}}

                    </el-tag>
                    <i class=" el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type='warning' v-for='(item3,i3) in item2.children' :key="item3.id" closable @close="removeRightById({
                      userId:scope.row,
                      rightId:item3.id})">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>

            <!--   <pre>
            {{scope.row}}

            </pre> -->


          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope='scope'>
            <el-button size="mini" type="primary" @click="" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="" icon='el-icon-delete'>删除</el-button>
            <el-button size="mini" type='warning' @click="resetRightsDialog(scope.row)" icon="el-icon-setting">分配权限
            </el-button>
          </template>
          <!-- <el-button size="mini"  type="primary" @click="" icon="el-icon-edit" >编辑</el-button>
          <el-button  size="mini" type="danger" @click=""icon='el-icon-delete'>删除</el-button>
          <el-button  size="mini" type='warning' @click=""icon="el-icon-setting">分配权限</el-button> -->

        </el-table-column>
      </el-table>


      <!-- card body -->
    </el-card>

    <el-dialog title="添加角色 " :visible.sync="addRolesFlag" width="30%" @close="addRolesFormClose">
      <span slot="footer">
        <el-form :rules="addRolesFormRules" :model="addRolesForm" ref="addRolesFormRef" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addRolesForm.roleDesc"></el-input>
          </el-form-item>

          <el-form-item>

          </el-form-item>
        </el-form>

        <el-button @click="addRolesFlag=false ">取 消</el-button>
        <el-button type="primary" @click="addRolesConfirm">确 定</el-button>
      </span>
    </el-dialog>



    <el-dialog title="分配权限" :visible.sync="resetRightsFlag" width="30%" @close="resetRightsDialogClose">

      <span slot="footer">
        <el-tree :data="rightsList" :props="treeProps" @node-click="" show-checkbox node-key="id" default-expand-all
          :default-checked-keys='defaKyes' ref='resetRightsRef'></el-tree>

        <el-button @click=" resetRightsFlag= false">取 消</el-button>
        <el-button type="primary" @click="RichtsConfirlClick">确 定</el-button>
      </span>
    </el-dialog>


  </div>

</template>
<script>
  export default {
    data() {
      return {
        rolesList: [],

        addRolesFlag: false,
        addRolesFormRules: {
          roleName: [
            { required: true, message: 'err', trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: 'err', trigger: 'blur' }
          ]
        },
        addRolesForm: {
          roleName: '',
          roleDesc: ''

        },
        resetRightsFlag: false,
        rightsList: [],
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        defaKyes: [],
        roleId: ''
      }
    },
    mounted() {
      this.getrolesList()
    },
    methods: {
      async  getrolesList() {
        const { data: res } = await this.$http.get('/roles')
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.erroer(res.meta.msg)
        this.rolesList = res.data
      },
      /*   async removeRightById(id) {
          console.log(id);
          const res = await this.$http.delete('roles/' + id.userId + '/rights/' + id.rightId)
          console.log(res.data.meta);
        }, */
      async  removeRightById(id) {
        const confiremRusele = await this.$confirm('删除该权限', '删除权限', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',

        }).catch(err => err)
        if (confiremRusele !== 'confirm') return this.$message.info('quxiaoshanchu')
        const { data: res } = await this.$http.delete('roles/' + id.userId.id + '/rights/' + id.rightId)
        if (res.meta.status !== 200) return this.$message.error('defaule')
        //id.userId.id是传递了scope.row全部数据。
        id.userId.children = res.data
        // console.log(id.userId.chil);
      },


      addRoles() {
        this.addRolesFlag = true
      },
      /*  async addRolesConfirm() {
         const { data: res } = await this.$http.post('roles', {
           roleName: this.addRolesForm.roleName,
           roleDesc: this.addRolesForm.roleDesc
         })
         console.log(res);
         if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
         this.$message.success(res.meta.msg)
         this.addRolesFlag = false
         this.getrolesList()
       }, */
      addRolesConfirm() {
        this.$refs.addRolesFormRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('roles', {
            roleName: this.addRolesForm.roleName,
            roleDesc: this.addRolesForm.roleDesc
          })
          if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          this.addRolesFlag = false
          this.getrolesList()
        })
      },
      addRolesFormClose() {
        /* this.addRolesForm.roleName=''
        this.addRolesForm.roleDesc='' */
        this.$refs.addRolesFormRef.resetFields()
      },
      async resetRightsDialog(role) {
        const { data: res } = await this.$http.get('rights/tree ')
        if (res.meta.status !== 200) return this.$, message.error('huoqulistshibai')
        this.rightsList = res.data
        this.getLeafKeys(role, this.defaKyes)
        this.roleId = role.id
        this.resetRightsFlag = true
        console.log(res);
      },
      //递归的形式获取三级权限
      getLeafKeys(node, arr) {
        if (!node.children) return arr.push(node.id)
        node.children.forEach(item => {
          this.getLeafKeys(item, arr)

        })
        // console.log(arr);
      },
      resetRightsDialogClose() {
        this.defaKyes = []
      },
      RichtsConfirlClick() {
        const rightsIdArr = [...this.$refs.resetRightsRef.getCheckedKeys(), ...this.$refs.resetRightsRef.getHalfCheckedKeys()]
        const rightsIdString = rightsIdArr.join(',')
        // console.log(a);
        this.$http.post(`roles/${this.roleId}/rights`, { rids: rightsIdString })
          .then((data) => {
            if (data.data.meta.status !== 200) {
              this.$message.error('分配权限失败')
            this.getrolesList()
            this.resetRightsFlag = false

            }else{
              this.$message.success('分配权限成功')
            this.getrolesList()
            this.resetRightsFlag = false
            // console.log(this);
            }
          
          })
      }


    }
  }
</script>
<style lang="less">
  .addRolesButton {
    margin: 20px !important
  }

  .el-tag {
    margin: 10px
  }

  .tagborderTop {
    border-top: 1px dashed gray
  }

  .tagborderbottom {
    border-bottom: 1px dashed gray
  }

  .vcenter {
    display: flex;
    align-items: center
  }
</style>