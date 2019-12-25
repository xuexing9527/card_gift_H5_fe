<template>
  <div class="content-box">
    <common-header :tittle="tittle"></common-header>
    <div class="page-content">
      <p style="font-size: 16px;margin: 10px 0; color: white;opacity: .5">
        下单48小时后发货，请耐心等待
      </p>
      <!--未填写订单地址显示界面-->
      <div v-if="isEdit">
        <!--<mt-field label="兑换商品" v-model="goods" disabled></mt-field>-->
        <mt-field label="收货人姓名" placeholder="请输入您的收货人姓名" v-model="consignee"></mt-field>
        <mt-field label="手机号码" type="tel" placeholder="请输入您的手机号码" v-model="phone_number"></mt-field>
        <mt-field label="收货地址" type="textarea" rows="2" placeholder="请输入您的收货地址" v-model="address"></mt-field>
        <mt-field label="填写留言" type="textarea" rows="2" placeholder="如有留言请在这里填写" v-model="note"></mt-field>
        <mt-button type="danger" style="width: 60%;margin-top: 30px;" @click="editdetail">确认兑换</mt-button>
        <p style="font-size: 16px;margin: 10px 0; color: white;opacity: .5;padding: 0 10px;">
         注：1.地址提示： 填写详细地址，避免电话未接听配送不成功，快递退回带来不必要的麻烦。
          2.兑换商品为：五斤精品牛肉+一只散养土鸡。3.收货前，请妥善保存卡号密码，以便查询运单号等订单详情。4.如有疑问请联系客服/微信：18811759402。
        </p>
      </div>
      <!--已填写订单地址显示界面-->
      <mt-index-list style="text-align: left;" v-if="!isEdit">
        <mt-cell title="发货商品">五斤精品牛肉+一只散养土鸡</mt-cell>
        <mt-cell title="发货状态" v-if="detail.ship_status==1">待发货</mt-cell>
        <mt-cell title="发货状态" v-if="detail.ship_status==2">已发货</mt-cell>
        <mt-cell v-if="detail.ship_status==2" title="运单号">{{detail.tracking_number}}</mt-cell>
        <mt-cell title="下单时间">{{detail.add_time}}</mt-cell>
        <mt-cell title="收货人姓名">{{detail.consignee}}</mt-cell>
        <mt-cell title="手机号码">{{detail.phone_number}}</mt-cell>
        <div style="overflow: hidden;background-color: #fff">
          <div style="float: left">
            <mt-cell title="收货地址"></mt-cell>
          </div>
          <div style="overflow-y: auto; height: 1rem;">
            <mt-cell title="">{{detail.address}}</mt-cell>
          </div>
        </div>
        <div style="overflow: hidden;background-color: #fff">
          <div style="float: left">
            <mt-cell title="留言信息"></mt-cell>
          </div>
          <div style="overflow-y: auto; height: 1rem;">
            <mt-cell title="">{{detail.note}}</mt-cell>
          </div>
        </div>
        <div class="wx" v-if="!isEdit">
          <p style="font-size: 16px;margin: 10px 0; color: #9f9f9f;opacity: .9;text-align: center">
            更多有机农产品信息请关注乐享农场公众号
          </p>
          <img src="../assets/imgs/wx.jpg" alt="企业公众号">
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
      address: '',
      note: '',
      goods: '5斤精品牛肉+1只散养土鸡'
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
        vm.isEdit = msg.ship_status === 0
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
      let params = {
        consignee: vm.consignee,
        phone_number: vm.phone_number,
        address: vm.address,
        note: vm.note
      }
      let alertMsg = ''
      if (params.consignee === '') {
        alertMsg = '收货人姓名不能为空'
        Toast({
          message: alertMsg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (params.phone_number === '') {
        alertMsg = '收货人电话号码不能为空'
        Toast({
          message: alertMsg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (params.address === '') {
        alertMsg = '收货地址不能为空'
        Toast({
          message: alertMsg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      add(params).then((res) => {
        const { data } = res
        const { code, msg } = data
        if (code === 0) {
          detail().then((res) => {
            const { data } = res
            const { code, msg } = data
            if (code === 0) {
              vm.detail = msg
              vm.isEdit = false
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
