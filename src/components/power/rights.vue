<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card :body-style="{ padding: '0px' }">
     
      <el-table  border  :data="userRightsList" stripe style="width: 100%" >
        <el-table-column type="index"></el-table-column> 
        <el-table-column prop="authName" label="权限名称" >
        </el-table-column>
        <el-table-column prop="path" label="路径" >
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope='scope'>
          <el-tag v-if='scope.row.level ==0' type="success" >1</el-tag>
          <el-tag v-if='scope.row.level ==1' type="info" >2</el-tag>
          <el-tag v-if='scope.row.level ==2' type="warning" >3</el-tag>
          
              
            
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        userRightsList:[]
      }
    },
    created() {
      this.getUserRighs()
    },
    methods: {
    async  getUserRighs(){
              const {data:res} = await this.$http.get('rights/list')
              // console.log(res);
              if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
              this.userRightsList = res.data
            }
    },
  }
</script>
<style lang="less">
.el-card{
  margin-top: 20px;
}
.el-table{
  text-align: center
}
</style>