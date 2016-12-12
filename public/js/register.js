$(function () {
  $('#register').on('click', function () {
    var c;
    var d;
    var e;
    c=$('#account').val();
    d=$('#password').val();
    e=$('#passw').val();
    //d=document.getElementById('password').value;
    //e=document.getElementById('password2').value;
     if (c==''||d==''||e==''){
      alert('请把信息填写完整')
      return;
    }  
        
         if(d!=e){
          console.log(d);
          console.log(e);
          alert('请重新输入密码')
          return;
           }
    $.ajax({
      url: 'register',
      data: {
        account: $('#account').val(),
        password: $('#password').val(),
      },
      type: 'post',
      dataType:'json',
      success: function (data, status, xhr) {
        console.log (data);
       // alert(data);
        if (data.message =='OK') {
        console.log(register);
        window.location.href = 'login1.html';
        }
        
        else{
          if('DUPLICATED_ACCOUNT' == data.error)
            {
              alert('此用户已注册');
            }
          }
          ///////////////////逻辑不对，先写唯一的情况，再写情况多的情况
          /* if('DUPLICATED_ACCOUNT' == data.error)
            {
              alert('此用户已注册');
            }
          else{
               if(data.message =='OK') {
              
            console.log(register);
            window.location.href = 'login1.html';
            }
        }*/
        
      },
      error: function (xhr, status, error) {
        console.log(error);
        alert('服务器错误');
      }
    });
  });
});
