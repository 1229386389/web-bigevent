$(function() {
  var form=layui.form
  var layer=layui.layer
  form.verify({
	  nickname:function(value){
		  if(value.length>6){
			  return '昵称不能大于6个字'
		  }
	  }
  })
  
  initUserInfo()
  
  function initUserInfo(){
  $.ajax(
  {
	  method:"GET",
	  url:'/my/userinfo',
	  success:res=>{
		  if(res.status!==0){
			  return layer.msg('获取信息失败')
		  }
		  // 调用 form.val() 快速为表单赋值
		  form.val('formUserInfo',res.data)
	  }  
  }
  )
  }
  // 重置表单的数据
  $('#btnReset').on('click', function(e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })
  
  //更新用户数据
  $('.layui-form').on('submit', function(e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
		//调用的方法必须为全局函数，不然会报错（定义在立即执行函数或者入口函数之外）
        window.parent.getUserInfo()
      }
    })
  })
  
})
