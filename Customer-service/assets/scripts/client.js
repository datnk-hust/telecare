$('#_reset_psw').click(function(){
    $('#rstPsw').css('display','block');

})
$('#save_psw').click(function(){
    var email =  $('#rst_email').val();
    var c_psw = $('#c_psw').val();
    var n_psw = $('#n_psw').val();
    var cf_psw = $('#cf_psw').val();
    if( c_psw.length == 0 || email.length == 0 || cf_psw.length == 0 ||n_psw.length == 0){
        alert('Bạn cần nhập email, password hiện tại và nhập lại password mới!');
    }else if(n_psw != cf_psw ){
        alert('Xác nhận mật khẩu không trùng khớp!');
    }else if(  n_psw.length < 6 ){
        alert('Mật khẩu mới phải ít nhất 6 kí tự!');
    }else{
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/rstPassword',
            type: 'POST',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token'),
            },
            data: {
                email: email,
                password: c_psw,
                new_password: n_psw,
                cf_password: cf_psw
            },
            success: function(dt){
                alert('Đổi mật khẩu thành công!');
                window.location.reload();
            },error: function (err) {
                
                alert('Email hoặc mật khẩu không đúng.');
            }
        })
    }
})



$('#_logout').click(function(){
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/logout',
        type: 'POST',
        data: {
            'token': localStorage.getItem('token'),
        },success: function(dt){
            window.open('http://123.25.25.219:9021/login/login.html','_self');
        },error: function (err) {
            alert('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
        }
    });
    })

// setInterval(function(){
//     $.ajax({
//         url: 'http://123.25.25.219:8768/ticket_service/public/api/logout',
//         type: 'POST',
//         data: {
//             'token': localStorage.getItem('token'),
//         },success: function(dt){
//             console.log('logout');
//             window.open('http://123.25.25.219:9021/login/login.html','_self');
//         },error: function (err) {
//             alert('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
//         }
//         });
//     }, 1800000);

$('#order_ticket').click(function(){
    window.open('./add_ticket.html','_self');
})
$('#report_ticket').click(function(){
    window.open('./list_ticket.html','_self');
})
$('#reloadpage').click(function(){
    window.location.reload();
})

