<template>
    <div class="body">
        <div class="back" style="background-image: url(http://111.230.128.231/26875.jpg);"></div>
        <h1 style="text-align:center;margin-top:1.2em;color:#5A8796">计算机应用技术协会</h1>
        <div class="box" v-for="item of tableData">
            <span>{{item.key}}</span>
            <p>{{item.val}}</p>
        </div>

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
            url:'http://111.230.128.231/api/user/get_user_info',
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
.back
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index -10
    zoom 1
    background-color #fff
    background-repeat no-repeat
    background-size cover
    -webkit-background-size cover
    -o-background-size cover
    background-position center 0
</style>
