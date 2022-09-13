$(function() {
// 获取用户的基本信息
getUserInfo()
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
	// 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function(res) {
    //   // console.log('执行了 complete 回调：')
    //   // console.log(res)
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }}
    }
    	
  
  })
}
function renderAvatar(data){
	let name=data.nickname||data.username
	$('#welcomename').text(`欢迎${name}`)
	if(!data.user_pic){
		$('.layui-nav-img').hide()
		var firstword=name[0].toUpperCase()
		$(".text-avatar").html(firstword).show()
	}else{
	$('.text-avatar').hide()
	$('.layui-nav-img').attr('src',data.user_pic).show()
    }
	
}
$('#btnLogout').on('click',function(){
	layer.confirm('是否退出',{icon: 3, title:'提示'},function(index){
  //清空本地存储中的token
   localStorage.removeItem('token')
   //跳转指定界面
   location.href='/login.html'
   //关闭confirm提示框
  layer.close(index);
});       
})
})
