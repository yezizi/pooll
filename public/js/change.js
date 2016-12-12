$(function(){
  $('#save').on('click',function(){
  	
     
        
         if(d!=e){
          console.log(d);
          console.log(e);
          alert('请重新输入密码')
          return;
           }
   $.ajax({
     url:'save',
     data:{
       password:$('password').val(),
       password2:$('password2').val(),
     },
     type:'post',
     dataType:'json',
     success:function(data,status,xhr){

     },
      error:function(xhr,status,error){

      }






   })
  })
})