<template>
  <div class="content-box">
    <!--<common-header :showinput="false" :showback="false"></common-header>-->
    <div class="page-content">
      <div class="login-content">
        <h2 style="display: flex; justify-content: center; align-items: center ;font-size: 0.5rem; color: #fff;opacity: .8; margin-bottom: 15px;">
          <img src="../../assets/logo.png" style="width: 1rem; margin-right: 5px;">北京中农乐享科技有限公司</h2>
        <mt-field label="卡 号" placeholder="请输入您的卡号" v-model="cardNo"></mt-field>
        <mt-field label="密 码" type="password" placeholder="请输入您的密码" v-model="cardPw"></mt-field>
        <mt-field label="企业码" type="password"  placeholder="请输入您的企业码" v-model="port"></mt-field>
        <mt-button type="danger" style="width: 60%;margin-top: 30px;" @click="login">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as homeApi from 'api/home-api'
import { Toast } from 'mint-ui'

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
      let alertMsg = ''
      if (params.card_code === '') {
        alertMsg = '卡号不能为空'
        Toast({
          message: alertMsg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (params.card_pwd === '') {
        alertMsg = '密码不能为空'
        Toast({
          message: alertMsg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (params.company_code === '') {
        alertMsg = '企业码不能为空'
        Toast({
          message: alertMsg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      homeApi.login(params).then((res) => {
        const { data } = res
        const { code, msg } = data
        if (code === 0) {
          const { token } = msg
          localStorage.setItem('token', token)
          vm.$router.push('/home/detail')
        } else {
          Toast({
            message: msg,
            position: 'middle',
            duration: 2000
          })
        }
      }).catch((err) => {
        alert(err)
      })
    }
  },
  components: {
    commonHeader
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
