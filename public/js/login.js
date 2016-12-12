$(function () {
  $('#login').on('click', function () {
    var c;
    var d;
    var user;
    user=document.getElementById('account').value;
    c=$('#account').val();
    d=$('#password').val();
   
    //d=document.getElementById('password').value;
    //e=document.getElementById('password2').value;
     if (c==''||d==''){
      alert('请把信息填写完整')
      return;
    }  
    $.ajax({
      url: 'login',
      data: {
        account: $('#account').val(),
        password: $('#password').val()
      },
      type: 'post',      
      dataType:'json',
      success: function (data, status, xhr) {
        if (data.message == 'OK') {
          alert('login');
          //Cookies.set('nickname',user);
          //console.log(nickname);
         Cookies.set('user',user);
          console.log(user);
          window.location.href = 'index.html';

        } else {
          alert('账号或密码错误');
        }
      },
      error: function (xhr, status, data) {
        console.log(data);
        alert('服务器错误');
      }
    });
  });
});
