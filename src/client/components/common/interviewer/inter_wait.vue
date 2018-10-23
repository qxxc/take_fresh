<template>
    <div>
        <el-table :data="tableData" empty-text="暂无队列" style="width: 90%;min-width:720px;margin:0 auto">
            <el-table-column prop="u_number" label="学号" align="center"></el-table-column>
            <el-table-column prop="u_class" label="专业" align="center"></el-table-column>
            <el-table-column prop="u_name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="g_name" label="方向" align="center"></el-table-column>
            <el-table-column prop="u_counts" label="状态" align="center"></el-table-column>
        </el-table>
        <div class="fade" v-if="is_login"></div>
        <div class="succ-pop" style="height:200px;margin-top:-130px" v-if="is_login">
            <h3 class="title">
                <h4 style="margin-top:10px">ACAT</h4>
                <i class="el-icon-close" @click="remove_login"></i>
            </h3>
            <div class="login_body">
                <p style="margin:20px 0px"><input @keyup.13="user_info" type="text" v-model="u_number" placeholder="请输入学号"></p>
                <input type="button" class="submit" @click="user_info" value="查找">
            </div>
        </div>
        <p style="text-align:center" >
            <button class="submit"  @click="xian_login">现场签到</button>
        </p>
        <div class="fade" v-if="is_queding"></div>
        <div class="succ-pop" style="height:400px;margin-top:-130px" v-if="is_queding">
            <h3 class="title">
                <h4 style="margin-top:10px">ACAT</h4>
                <i class="el-icon-close" @click="remove_login"></i>
            </h3>
            <div class="login_body">
                <div class="box" v-for="item of tableData2">
                    <span>{{item.key}}</span>
                    <p>{{item.val}}</p>
                </div>
                <input type="button" class="submit" @click="sign_in" value="签到">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            is_login:false,
            is_queding:false,
            u_number:'',
            _id:'',
            tableData2:[
                {key:'学号',val:''},
                {key:'姓名',val:''},
                {key:'班级',val:''},
                {key:'联系方式',val:''},
                {key:'状态',val:''},
            ],
        }
    },
    methods:{
        user_info(){
            this.$axios({
                url:'http://111.230.128.231/api/user/get_user_info',
                method:'get',
                params:{
                    u_number:sessionStorage.getItem('u_number')
                }
            }).then(res=>{
                var data=Object.values(res.data);
                for(let i=0;i<this.tableData2.length;i++){
                    this.tableData2[i].val=data[i];
                }
                this.is_login=false;
                this.is_queding=true;
            })
        },
        sign_in(){
            this.$axios({
                url:'http://111.230.128.231/api/user/sign_in',
                method:'post',
                data:{
                    u_number:this.u_number
                }
            }).then(res=>{
                if(res.data){
                    this.$message({
                        type:'success',
                        message:'签到成功'
                    })
                    this.is_queding=false;
                }
            })
        },
        remove_login(){
            this.is_login=false
            this.is_queding=false
        },
        xian_login(){
            this.is_login=true;
            this.is_queding=false;
        },
        get_user_wating(){
            this.$axios({
                url:'http://111.230.128.231/api/Inter/get_user_waiting',
                method:'get'
                }).then(res=>{
                if(sessionStorage.getItem('I_group')){
                    res.data=res.data.filter((item,index,array)=>{
                        return item.g_name==sessionStorage.getItem('I_group');
                    })
                }
                res.data.forEach((item,index,array)=>{
                    switch (item.u_count) {
                        case 0:
                            item.u_counts='等待一面'
                            break;
                        case 1:
                            item.u_counts='等待二面'
                            break;
                        case 2:
                            item.u_counts='等待三面'
                            break;
                    }
                    if (item.u_sex) {
                        item.u_sex='男'
                    }else{
                        item.u_sex='女'
                    }
                })
                if(this.tableData.toString()!=res.data.toString()){
                    this.tableData=res.data;
                }
            }).catch(res=>{
            })
        }
    },
    created () {
        this.get_user_wating();
        this._id=setInterval(this.get_user_wating,2000)
    },
    beforeDestroy(){
        clearInterval(this._id)
    },

}
</script>

<style lang="stylus" scoped>
.submit
    margin 1em auto 
    color #fff
    background-color #409EFF
    width 10%
    border 1px solid #dcdfe6
    border-color #409EFF
    font-size 1.5em
    height 2.6em
    text-align center
    border-radius 4px
 
.fade
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.5)
    position fixed
    left 0
    top 0
    z-index 99
.succ-pop
    width 400px
    height 360px
    background #fff
    position fixed
    left 50%
    top 50%
    margin-left -200px
    margin-top -180px
    z-index 999
    border-radius 5px
.succ-pop 
    h3.title
        text-align right
        padding-right 10px
        font-size 28px
        color #CCCCCD
        :hover
            cursor pointer
            color black
    h4
        float left
        color black
        padding-left 20px
        :hover
            cursor default 
.login_body
    input
        display block
        height 40px
        width 360px
        padding 0 15px
        border 1px solid #dcdfe6
        border-radius 4px
        color #606266
        margin 0 20px   
        line-height 40px
        box-sizing:border-box
    p
        text-indent 50px
    input[class*='submit']
        margin 25px auto 
        color #fff
        background-color #409EFF
        border 1px solid #dcdfe6
        border-color #409EFF
        font-size 14px
        height 40px
        text-align center
        border-radius 4px
    input[class*='submit']:hover
        background-color #35B3FF
        cursor pointer
.box
    margin-top 5px
    padding 1em
    span 
        display inline-block
        width 4.5em
    p
        display inline-block
        width 14.5em
</style>

