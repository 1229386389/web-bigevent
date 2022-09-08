// 使用jQuery中的函数使得每次调用ajax请求时自动优先调用ajaxPrefilter()拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options)=>{
	// options.url就是本次ajax请求的url地址，将其加上前缀，这样每个请求都不需写出前缀
	options.url='http://www.liulongbin.top:3007'+options.url
})