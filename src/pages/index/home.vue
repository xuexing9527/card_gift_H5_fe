<template>
  <div class="content-box">
    <!--<common-header :showinput="false" :showback="false"></common-header>-->
    <div class="page-content">
      <div class="login-content">
        <mt-field label="卡号" placeholder="请输入您的卡号" v-model="cardNo"></mt-field>
        <mt-field label="密码" placeholder="请输入您的密码" v-model="cardPw"></mt-field>
        <mt-field label="企业码" placeholder="请输入您的企业码" v-model="port"></mt-field>
        <mt-button type="danger" style="width: 100%;margin-top: 30px;" @click="login">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      num: 0,
      cardNo: '',
      cardPw: '',
      port: ''
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    login() {
      const vm = this
      let params = {
        card_code: this.cardNo,
        card_pwd: this.cardPw,
        company_code: this.port
      }
      homeApi.login(params).then((res) => {
        console.log(res)
        const { data } = res
        const { code, msg } = data
        if (code === 0) {
          const { token } = msg
          localStorage.setItem('token', token)
          vm.$router.push('/home/detail')
        } else {
          alert(msg)
        }
      }).catch(() => {
      })
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .page-content{
    .mb(98);
  }
  .login-content {
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
