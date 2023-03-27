// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function (res) {
  uni.hideLoading()
}

$http.baseUrl = 'https://fc-mp-3063b247-015d-4a4e-af76-296e5a85e6a4.next.bspapp.com'

export default $http