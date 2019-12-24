<template>
  <div class="content-box">
    <common-header :tittle="tittle"></common-header>
    <div class="page-content">
      <p style="font-size: 16px;margin: 10px 0; color: white;opacity: .5">
        发货时间为下单后的48小时以内
      </p>
      <div v-if="isEdit">
        <mt-field label="收货人姓名" placeholder="请输入您的收货人姓名" v-model="consignee"></mt-field>
        <mt-field label="手机号码" type="tel" placeholder="请输入您的手机号码" v-model="phone_number"></mt-field>
        <mt-field label="收货地址" type="textarea" rows="3" placeholder="请输入您的收货地址" v-model="address"></mt-field>
        <mt-button type="danger" style="width: 60%;margin-top: 30px;" @click="editdetail">提交</mt-button>
      </div>
      <mt-index-list style="text-align: left;" v-if="!isEdit">
        <mt-cell title="发货商品">5斤精品牛肉+1只散养土鸡</mt-cell>
        <mt-cell title="发货状态" v-if="detail.ship_status==1">待发货</mt-cell>
        <mt-cell title="发货状态" v-if="detail.ship_status==2">已发货</mt-cell>
        <mt-cell v-if="detail.ship_status==2" title="运单号">{{detail.tracking_number}}</mt-cell>
        <mt-cell title="收货人姓名">{{detail.consignee}}</mt-cell>
        <mt-cell title="手机号码">{{detail.phone_number}}</mt-cell>
        <div style="overflow: hidden;background-color: #fff">
          <div style="float: left">
            <mt-cell title="收货地址"></mt-cell>
          </div>
          <div style="float: right">
            <!--<mt-cell title="">{{detail.address}}</mt-cell>-->
            <mt-cell title="">北京市朝阳区利泽西园一区106号楼1908室</mt-cell>
          </div>
        </div>
        <div class="wx" v-if="!isEdit">
          <img src="../assets/imgs/wx.png" alt="企业公众号">
          <p style="font-size: 16px;margin: 10px 0; color: black;opacity: .9;text-align: center">
            更多农产品信息请关注乐享农场公众号
          </p>
        </div>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import { detail, add } from '../api/home-api'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      tittle: '订单详情',
      data: 0,
      isEdit: false,
      detail: {},
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
        // vm.isEdit = msg.ship_status === 0 ? true : false
        vm.isEdit = msg.ship_status === 0 ? false : true
      } else {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
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
          Toast({
            message: msg,
            position: 'middle',
            duration: 2000
          })
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
  .wx {
    margin-top: 30px;
  }
  .wx img {
    width: 200px;
    display: block;
    margin: 0 auto;
  }
</style>
