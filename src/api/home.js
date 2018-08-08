import instance from './api'
import qs from 'qs'
//正式
// let  wapUrl="https://www.zhiyimall.com"
// let  wapUrl="https://local-ecmall.zhiyiyunzhenshi.com";//开发
// let  wapUrl="https://test6.zhiyiyunzhenshi.com"; //测试
// 开发环境
// let  wapUrl="http://192.168.30.64:8082/ecMall";//胡君宝
let wapUrl = 'http://192.168.29.166:8081/ecMall'//林振强
export default {
  wapUrl,
  // 商城首页
  homePage (data) {
    return instance.post(instance.wapUrl + '/main/mainPageLoad', qs.stringify(data))
  },
  // 折扣活动商品查看全部
  homeRebate (data) {
    return instance.post(instance.wapUrl + '/main/allDiscountList', qs.stringify(data))
  },
  // 满赠活动商品查看全部
  homePresent (data) {
    return instance.post(instance.wapUrl + '/main/allGiveList', qs.stringify(data))
  },
  // 商家活动查看全部
  homeBusiness (data) {
    return instance.post(instance.wapUrl + '/main/allActivityList', qs.stringify(data))
  },
  // 询价专区查看全部
  homeDrug (data) {
    return instance.post(instance.wapUrl + '/main/enquiryOrderList', qs.stringify(data))
  },
  // 商家活动促销详情
  saleData (data) {
    return instance.post(instance.wapUrl + '/active/queryAllGoodsOfActivity', qs.stringify(data))
  },
  // 登录页
  loginData (data) {
    return instance.post(instance.wapUrl + '/login/monitor', qs.stringify(data))
  },
  //药品询价
  MedicineInquiry (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/enquiryOrderList', qs.stringify(data))
  },
  //药品是否已询价
  MedicineInquirys (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/checkOrderInfo', qs.stringify(data))
  },
  //药品报价详情
  Drugquotation (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/enquiryOrderInfo', qs.stringify(data))
  },
  //已报价列表
  Quotedprice (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/enquiryOrderOfferList', qs.stringify(data))

  },
  //查看已报价详情
  Quotationdetails (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/offerOrderInfo', qs.stringify(data))
  },
  //首页已报价详情
  homeQuotationdetails (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/queryOfferOrderInfo', qs.stringify(data))
  },
  //已忽略列表
  Overlooked (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/enquiryOrderIgnoreList', qs.stringify(data))
  },
  //活动管理
  Activitymanagement (data) {
    return instance.post(instance.wapUrl + '/active/activeList', qs.stringify(data))

  },
  // 退出
  homeExit (data) {
    return instance.post(instance.wapUrl + '/main/exit', qs.stringify(data))
  },
  //公共主页去报价
  homeQuoting (data) {
    return instance.post(instance.wapUrl + '/main/enquiryOrderInfo', qs.stringify(data))
  },
  //提交报价
  homeSubmitQuote (data) {
    return instance.post(instance.wapUrl + '/main/offer', qs.stringify(data))
  },
  /****************************************商品库********************************/
  //查询商品库并以分页形式显示
  selectBusinessRepositoryByPage (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/queryMedicinalBasic', qs.stringify(data))
  },
  //查询基础库并以分页形式显示
  selectBasicRepositoryGoodsByBusinessPage (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/queryMedicinalBaseInfo', qs.stringify(data))
  },
  //添加或编辑药品页面调用查询药品规格的接口(包装单位)
  DrugSpecification (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findDosage', qs.stringify(data))
  },

  //添加或编辑药品页面调用查询药品规格的接口(最小单位)
  DrugSpecificationSmall (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findDosage', qs.stringify(data))
  },
  //查看和编辑页查看单个药品信息
  LookDrug (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/queryMedicinalDetail', qs.stringify(data))
  },
  //查询基础库并以分页形式显示
  selectBasicRepositoryGoodsByPage (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/queryMedicinalBaseInfo', qs.stringify(data))
  },
  //从基础库批量添加药品到商品库
  batchAddGoodsFromBasicRepository (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/saveMedicinalInfo', qs.stringify(data))
  },
  //查看和编辑页查看单个药品信息
  queryAndEditSingleDrugInfo (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/queryMedicinalDetail', qs.stringify(data))
  },
  //编辑或保存单个药品信息
  editOrSaveSingleDrugInfo (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/editOrSaveMedicinal', qs.stringify(data))

  },
  //报价提交
  referring (data) {
    return instance.post(instance.wapUrl + '/enquiryOrder/offer', qs.stringify(data))
  },
  //活动详情
  activityDetails (data) {
    return instance.post(instance.wapUrl + '/active/activeInfo', qs.stringify(data))

  },
  //活动下架
  undercarriage (data) {
    return instance.post(instance.wapUrl + '/active/downActive', qs.stringify(data))
  },
  //活动编辑
  activityModification (data) {
    return instance.post(instance.wapUrl + '/active/activeInfoEdit', qs.stringify(data))
  },
  //活动编辑第二步
  editingActivities (data) {
    return instance.post(instance.wapUrl + '/active/activeMedList', qs.stringify(data))
  },
  //活动编辑提交
  ActivitieSubmission (data) {
    return instance.post(instance.wapUrl + '/active/editActive', qs.stringify(data))
  },
  //获取基础包装单位(大单位和小单位)
  basicPackageUnit (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findDosage', qs.stringify(data))

  },
  // 查询基础药品剂型
  basicDrugType (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findMedicinalDosage', qs.stringify(data))

  },
  // 查询基础药品用法
  basicDrugUse (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findDirection', qs.stringify(data))
  },
  // 查询基础药品使用频率
  basicDrugRate (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findFrequentness', qs.stringify(data))
  },
  // 查询基础药品使用频率单位
  basicDrugRateUnit (data) {
    return instance.post(instance.wapUrl + '/saveStorage/findFrequentnessUnit', qs.stringify(data))
  },
  /****************************************交易管理********************************/

  //根据业务员id查询所有的订单
  selectAllOrdersBySalesId (data) {
    return instance.post(instance.wapUrl + '/orders/queryOrderListBySysUserId', qs.stringify(data))
  },
  //根据商业订单Id查询对应的订单详情
  selectOrderDetailsByBusinessId (data) {
    return instance.post(instance.wapUrl + '/orders/queryOrderDetailById', qs.stringify(data))
  },
  //订单发货
  orderDelivery (data) {
    return instance.post(instance.wapUrl + '/orders/confirmOrder', qs.stringify(data))
  },
  //订单发货
  rejectOrder (data) {
    return instance.post(instance.wapUrl + '/orders/refuseOrder', qs.stringify(data))
  },
  //公司基础信息
  CompanyMessage (data) {
    return instance.post(instance.wapUrl + '/business/queryBusinessInfoBySysUserId', qs.stringify(data))
  },
  /****************************************东旭********************************/

  //省份列表切换
  ProvinceList (data) {
    return instance.post(instance.wapUrl + '/main/activeAreaList', qs.stringify(data))
  },
  //城市列表切换
  CityList (data) {
    return instance.post(instance.wapUrl + '/main/cityList', qs.stringify(data))
  },
  //市区列表切换
  AreaList (data) {
    return instance.post(instance.wapUrl + '/main/areaList', qs.stringify(data))
  },
  //****************活动管理********************************/
  //查询业务员配送区域
  selectSalesDeliveryArea (data) {
    return instance.post(instance.wapUrl + '/active/distributionArea', qs.stringify(data))
  },
  //添加新建活动
  addNewCreateActivity (data) {
    return instance.post(instance.wapUrl + '/active/createActive', qs.stringify(data))
  },
  //查询药品--商品库
  SearchDrug (data) {
    return instance.post(instance.wapUrl + '/active/medList', qs.stringify(data))
  },
  //查询其他药品
  SearchDrugs (data) {
    return instance.post(instance.wapUrl + '/active/medListAll', qs.stringify(data))
  },
  /****************************************公共主页********************************/
  //查看询价单详情
  selectEnquiryOrderDetails (data) {
    return instance.post(instance.wapUrl + '/main/enquiryOrderInfo', qs.stringify(data))
  },
  //(填写报价信息)提交报价
  WriteInfoSubmit (data) {
    return instance.post(instance.wapUrl + '/main/offer', qs.stringify(data))
  },
  //查询基础库并以分页形式显示
  selectActivityGoodsFromBasicRepo (data) {
    return instance.post(instance.wapUrl + '/active/medList', qs.stringify(data))
  },
  //查询默认图片
  selectDefaultPic (data) {
    return instance.post(instance.wapUrl + '/active/activePicList', qs.stringify(data))
  },
  //编辑或保存单个药品信息
  SubmitDrug (data) {
    return instance.post(instance.wapUrl + '/medicinalBasic/editOrSaveMedicinal', qs.stringify(data))
  },
  //创建新活动-查询活动
  CreateNewActivity_LookList (data) {
    return instance.post(instance.wapUrl + '/active/activeInfo', qs.stringify(data))

  },
}
