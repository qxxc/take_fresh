<template>
    <div class="body">

        <transition mode="out-in" :enter-active-class="enter_active_class" leave-active-class="animated bounceOut yourElement ">
            <router-view/>
        </transition>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            enter_active_class:"animated bounceIn yourElement"
        }
    },
    beforeRouteUpdate(to,from,next){
        if(to.path=='/user/enter'){
            this.enter_active_class=''
        }else{
            this.enter_active_class="animated bounceIn yourElement"
        }
        next()
    }
}
</script>

<style lang="stylus" scoped>
.yourElement 
  animation-duration 600ms

@media screen and (min-width: 320px) and (max-width: 359px)
    .body
        font-size: 12.8px;
@media screen and (min-width: 360px) and (max-width: 374px)
    .body
        font-size: 14.4px;
@media screen and (min-width: 375px) and (max-width: 385px) 
    .body
        font-size: 15px;
@media screen and (min-width: 386px) and (max-width: 392px) 
    .body
        font-size: 15.44px; 
@media screen and (min-width: 393px) and (max-width: 400px)
    .body
        font-size: 16px; 
@media screen and (min-width: 401px) and (max-width: 414px)
    .body
        font-size: 16.48px; 
@media screen and (min-width: 750px) and (max-width: 799px)
    .body
        font-size: 30.72px; 

</style>
