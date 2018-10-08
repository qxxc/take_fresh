<template>
    <div class="body">
        <div class="back" style="background-image: url(http://localhost:3000/26875.jpg);"></div>
        <h1 style="text-align:center;margin-top:1.2em;color:#5A8796" class="animated bounceInRight faster ">计算机应用技术协会</h1>
        <transition mode="out-in" enter-active-class="animated bounceIn yourElement" leave-active-class="animated bounceOut yourElement ">
            <router-view/>
        </transition>
        
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.yourElement {
  animation-duration: 600ms;
}
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
