<template>
  <div class="content-box">
    <common-header :tittle="tittle"></common-header>
    <div class="page-content">
      <div v-if="code==0">
        <mt-field label="收获人姓名" placeholder="请输入您的收获人姓名" v-model="consignee"></mt-field>
        <mt-field label="手机号码" placeholder="请输入您的手机号码" v-model="phone_number"></mt-field>
        <mt-field label="收获地址" placeholder="请输入您的收获地址" v-model="address"></mt-field>
        <mt-button type="danger" style="width: 60%;margin-top: 30px;" @click="editdetail">提交</mt-button>
      </div>
      <mt-index-list style="text-align: left;" v-if="code==1">
        <mt-cell title="收货人姓名">{{detail.consignee}}</mt-cell>
        <mt-cell title="手机号码">{{detail.phone_number}}</mt-cell>
        <mt-cell title="收货地址">{{detail.address}}</mt-cell>
        <mt-cell title="发货状态">{{detail.ship_status}}</mt-cell>
        <mt-cell title="运单号">{{detail.tracking_number}}</mt-cell>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import { detail, add } from '../api/home-api'

export default {
  data() {
    return {
      tittle: '详情',
      data: 0,
      detail: {},
      code: 0,
      consignee: '',
      phone_number: '',
      address: ''
    }
  },
  components: {
    commonHeader
  },
  beforeCreate() {
    const vm = this
    detail().then((res) => {
      const { data } = res
      const { code, msg } = data
      if (code === 0) {
        vm.detail = msg
        vm.code = msg.ship_status
      } else {
        alert(msg)
      }
    }).catch(() => {
    })
  },
  methods: {
    editdetail() {
      const vm = this
      add({
        consignee: vm.consignee,
        phone_number: vm.phone_number,
        address: vm.address
      }).then((res) => {
        const { data } = res
        const { code, msg } = data
        if (code === 0) {
          vm.code = msg.ship_status
        } else {
          alert(msg)
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
</style>
