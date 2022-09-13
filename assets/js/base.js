// 使用jQuery中的函数使得每次调用ajax请求时自动优先调用ajaxPrefilter()拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options)=>{
	// options.url就是本次ajax请求的url地址，将其加上前缀，这样每个请求都不需写出前缀
	options.url='http://www.liulongbin.top:3007'+options.url
	if(options.url.indexOf("/my/")!==-1){
		options.headers={Authorization:localStorage.getItem('token')||''}
		}
	options.complete=res=>{
	// 不论成功还是失败，最终都会调用 complete 回调函数
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    // 1. 强制清空 token
    localStorage.removeItem('token')
    // 2. 强制跳转到登录页面
    location.href = '/login.html'
    }
    }
})