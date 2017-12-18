import baseDetailComponent from '../../basejs/basetwo.js';
import './SJDetailComponent.css';
class ShangjianShuJuDetailComponentController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log) {
    super($log, CommonUtilsService, 'Dcl_B_Io_Decl', $stateParams.id);
    this.getdetailinfo();
    this.color = {
      backgroundColor: "#cdebcd"
    };
    this.pointDirection = 'glyphicon glyphicon-menu-down';
    this.display = {
      display: 'inline'
    };
    this.currentNum = 1;
  }
  showOrHide() {
    if (this.pointDirection === 'glyphicon glyphicon-menu-down') {
      this.pointDirection = 'glyphicon glyphicon-menu-right';
      this.display.display = 'none';
    } else {
      this.pointDirection = 'glyphicon glyphicon-menu-down';
      this.display.display = 'inline';
    }
  }
  afterDetailinit() {
    this.getformheadtem();
    for (let i = 0; i < document.querySelectorAll('#sjBox input').length; i++){//eslint-disable-line
      document.querySelectorAll('#sjBox input')[i].disabled = 'disabled';//eslint-disable-line
    }
    this.judgeUsability();
  }
  judgeUsability() {
    if (this.currentNum === 1) {
      this.leftBoolean = true;
    } else {
      this.leftBoolean = false;
    }
    if (this.currentNum === this.totalNum) {
      this.rightBoolean = true;
    } else {
      this.rightBoolean = false;
    }
    this.useStyleLeft = this.leftBoolean ? {color: '#7a7a7a'} : {color: 'black'};
    this.useStyleRight = this.rightBoolean ? {color: '#7a7a7a'} : {color: 'black'};
  }
  getformheadtem() {
    // this.$log.log(this.detailInfoData);
    // goodsDetail是数组
    this.goodsDetail = this.detailInfoData.Dcl_B_Io_Decl_Goods;
    this.totalNum = this.goodsDetail.length;
    this.currentGoodsDetail = this.goodsDetail[this.currentNum - 1];
    this.dealData(this.currentGoodsDetail, this.detailInfoData);
  }
  next() {
    this.currentNum++;
    this.currentGoodsDetail = this.goodsDetail[this.currentNum - 1];
    this.dealData(this.currentGoodsDetail, this.detailInfoData);
    this.judgeUsability();
  }
  previous() {
    this.currentNum--;
    this.currentGoodsDetail = this.goodsDetail[this.currentNum - 1];
    this.dealData(this.currentGoodsDetail, this.detailInfoData);
    this.judgeUsability();
  }
  showFirst() {
    this.currentNum = 1;
    this.currentGoodsDetail = this.goodsDetail[0];
    this.dealData(this.currentGoodsDetail, this.detailInfoData);
    this.judgeUsability();
  }
  showFinal() {
    this.currentNum = this.goodsDetail.length;
    this.currentGoodsDetail = this.goodsDetail[this.currentNum - 1];
    this.dealData(this.currentGoodsDetail, this.detailInfoData);
    this.judgeUsability();
  }
  dealData(currentGoodsDetail, detailInfoData) {
    // 数量
    currentGoodsDetail.shuliang = currentGoodsDetail.Qty ? `${currentGoodsDetail.Qty_Unit_Name}(${currentGoodsDetail.Qty_Meas_Unit})` : '';
    // 重量
    currentGoodsDetail.zhongliang = currentGoodsDetail.Weight ? `${currentGoodsDetail.Wt_Unit_Name}(${currentGoodsDetail.Wt_Meas_Unit})` : '';
    // 货物总值
    currentGoodsDetail.huowuzongzhi = currentGoodsDetail.Goods_Total_Val ? `${currentGoodsDetail.Currency_Name}(${currentGoodsDetail.Currency})` : '';
    // 用途
    currentGoodsDetail.yongtu = currentGoodsDetail.Purpose_Name ? `${currentGoodsDetail.Purpose_Name}(${currentGoodsDetail.Purpose})` : '';
    // 标准量
    currentGoodsDetail.biaozhunliang = currentGoodsDetail.Std_Weight ? `${currentGoodsDetail.Std_Weight_Unit_Name}(${currentGoodsDetail.Std_Weight_Unit_Code})` : '';
    // 原产国
    currentGoodsDetail.yuanchanguo = currentGoodsDetail.Ori_Ctry_Name ? `${currentGoodsDetail.Ori_Ctry_Name}(${currentGoodsDetail.Ori_Ctry_Code})` : '';
    //  贸易方式
    detailInfoData.maoyifangshi = detailInfoData.Trade_Mode_Name ? `${detailInfoData.Trade_Mode_Name}(${detailInfoData.Trade_Mode_Code})` : '';
    // 贸易国别
    detailInfoData.maoyiguobie = detailInfoData.Trade_Country_Name ? `${detailInfoData.Trade_Country_Name}(${detailInfoData.Trade_Country_Code})` : '';
    // 报检地
    detailInfoData.baojiandi = detailInfoData.Insp_Org_Name ? `${detailInfoData.Insp_Org_Name}(${detailInfoData.Insp_Org_Code})` : '';
    // 口岸机构
    detailInfoData.kouanjigou = detailInfoData.Org_Name ? `${detailInfoData.Org_Name}(${detailInfoData.Org_Code})` : '';
    // 目的机构
    detailInfoData.mudijigou = detailInfoData.Purp_Org_Name ? `${detailInfoData.Purp_Org_Name}(${detailInfoData.Purp_Org_Code})` : '';
    // 领证地
    // {{$ctrl.detailInfoData.Vsa_Org_Name}}({{$ctrl.detailInfoData.Vsa_Org_Code}})
    detailInfoData.lingzhengdi = detailInfoData.Vsa_Org_Name ? `${detailInfoData.Vsa_Org_Name}(${detailInfoData.Vsa_Org_Code})` : '';
    // 汽运国家
    detailInfoData.qiyunguojia = detailInfoData.Desp_Ctry_Name ? `${detailInfoData.Desp_Ctry_Name}(${detailInfoData.Desp_Ctry_Code})` : '';
    // 起运口岸
    // {{$ctrl.detailInfoData.Desp_Port_Name}}({{$ctrl.detailInfoData.Desp_Port_Code}})
    detailInfoData.qiyunkouan = detailInfoData.Desp_Port_Name ? `${detailInfoData.Desp_Port_Name}(${detailInfoData.Desp_Port_Code})` : '';
    // 入境目的地
    // {{$ctrl.detailInfoData.Dest_Name}}({{$ctrl.detailInfoData.Dest_Code}})
    detailInfoData.rujingmudidi = detailInfoData.Dest_Name ? `${detailInfoData.Dest_Name}(${detailInfoData.Dest_Code})` : '';
    // 报关海关
    // {{$ctrl.detailInfoData.Decl_Custm_Name}}({{$ctrl.detailInfoData.Decl_Custm}})
    detailInfoData.baoguanhaiguan = detailInfoData.Decl_Custm_Name ? `${detailInfoData.Decl_Custm_Name}(${detailInfoData.Decl_Custm})` : '';
  }
}
export const shangjianshujudetailcomponent = {
  template: require('./SJDetailComponent.html'),
  controller: ShangjianShuJuDetailComponentController
};
