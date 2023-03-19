// ../../../Project/my-photo/node_modules/@escook/request-miniprogram/miniprogram_dist/index.js
var Request = class {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || "";
    this.url = options.url || "";
    this.method = "GET";
    this.data = null;
    this.header = options.header || {};
    this.beforeRequest = null;
    this.afterRequest = null;
  }
  get(url, data = {}) {
    this.method = "GET";
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }
  post(url, data = {}) {
    this.method = "POST";
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }
  put(url, data = {}) {
    this.method = "PUT";
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }
  delete(url, data = {}) {
    this.method = "DELETE";
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }
  _() {
    this.header = {};
    this.beforeRequest && typeof this.beforeRequest === "function" && this.beforeRequest(this);
    return new Promise((resolve, reject) => {
      let weixin = wx;
      if ("undefined" !== typeof uni) {
        weixin = uni;
      }
      weixin.request({
        url: this.url,
        method: this.method,
        data: this.data,
        header: this.header,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
        complete: (res) => {
          this.afterRequest && typeof this.afterRequest === "function" && this.afterRequest(res);
        }
      });
    });
  }
};
var $http = new Request();
export {
  $http
};
//# sourceMappingURL=@escook_request-miniprogram.js.map
