<template>
    <div class="body">
        <div class="box" v-for="item of tableData">
            <span>{{item.key}}</span>
            <p>{{item.val}}</p>
        </div>
        <p style="text-align:center" >
            <button class="submit" :disabled='disabled' @click="sign_in">现场签到</button>
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[
                {key:'学号',val:''},
                {key:'姓名',val:''},
                {key:'班级',val:''},
                {key:'联系方式',val:''},
                {key:'状态',val:''},
            ],
            disabled:''
        }
    },
    created(){
        this.$axios({
            url:'http://localhost:3000/api/user/get_user_info',
            method:'get',
            params:{
                u_number:sessionStorage.getItem('u_number')
            }
        }).then(res=>{
            var data=Object.values(res.data);
            for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].val=data[i];
            }
            if (res.data.u_status.substr(0,2)=='等待'||res.data.u_status.substr(-3,3)!='未通过'||res.data.u_status=='三面通过') {
                this.disabled=false;
            }else{
                this.disabled=true
            }
        })
    },
    methods:{
        sign_in(){
            this.$axios({
                url:'http://localhost:3000/api/user/sign_in',
                method:'post',
                data:{
                    u_number:sessionStorage.getItem('u_number')
                }
            }).then(res=>{
                if(res.data){
                    this.$message({
                        type:'success',
                        message:'签到成功'
                    })
                    this.disabled=true;
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.body
    color white
    margin 40px auto 
    width 22em
    border 0px solid #5A8796 
    border-radius 8px
    background-color rgba(0,0,0,0.3)
.box
    margin-top 5px
    padding 1em
    span 
        display inline-block
        width 4.5em
    p
        display inline-block
        width 14.5em
.submit
    margin 1em auto 
    color #fff
    background-color transparent
    width 90%
    border 1px solid #dcdfe6
    border-color #409EFF
    font-size 1.5em
    height 2.6em
    text-align center
    border-radius 4px 
</style>
