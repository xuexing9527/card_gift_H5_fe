<template>
  <div class="page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--<div class="nav-footer">-->
      <!--<footer>-->
        <!--<router-link v-for='(item, index) in navList' :to='item.path' :key='index'-->
                     <!--v-bind:class="{'active':activeRoute == item.path}">-->
          <!--<div :class="'tab-'+index"></div>-->
          <!--<p v-text="item.name"></p>-->
        <!--</router-link>-->
      <!--</footer>-->
    <!--</div>-->
  </div>
</template>

<script>
// export default {
//   data () {
//     return {
//       navList: [
//         {
//           'path': '/home',
//           'name': '推荐'
//         },
//         {
//           'path': '/story',
//           'name': '故事'
//         },
//         {
//           'path': '/footprints',
//           'name': '足迹'
//         },
//         {
//           'path': '/day',
//           'name': '纪念日'
//         }
//       ]
//     }
//   },
//   computed: {
//     activeRoute () {
//       return this.$route.path
//     }
//   },
//   methods: {
//
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
</style>
