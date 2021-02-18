var tk = 'Bearer '+ localStorage.getItem("token");
var user_id = localStorage.getItem("user_id");
//get total tiket
var time = setInterval(function(){
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/byUser/'+user_id,
        type: 'POST',
        headers: {
            Authorization: tk,
        },success: function (dt) {
            var ticket_scheduled = 0;
            var ticket_started = 0;
            var ticket_finalize = 0;
            dt.data.forEach(element => {
                if(element.study_status == 1){
                    ticket_scheduled += 1;
                }
                if(element.study_status == 3){
                    ticket_started += 1;
                }
                if(element.study_status == 11){
                    ticket_finalize += 1;
                }
            })
            $('#ticket_scheduled').text(ticket_scheduled);
            $('#ticket_started').text(ticket_started);
            $('#ticket_finalized').text(ticket_finalize);
            clearInterval(time);
        },error: function(err){
            console.log(err);
            window.open('http://123.25.25.219:9021/login/login.html','_self');
            
        }
    });
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/status/2',
        type: 'GET',
        headers: {
            Authorization: tk,
        },success: function (dt) {
            console.log(dt.status)
            var i =1;
            $('#_list_admin').html('');
            if( dt != ''){
                dt.data.forEach(element=>{
                var stt = element.status;
                if(stt == '1'){
                    var status = '<div class="badge badge-success">Online</div>';
                }
                if(stt == '2'){
                    var status = '<div class="badge badge-danger">Busy</div>';
                }
                $('#_list_admin').append(
                '<tr><td class="text-center text-muted">'+element.user_id+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+status+'</td><td class="text-center"><button type="button"  onClick="detail_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
            );
            i++;
            })
            
           
            }
           
        },error: function(err){
            console.log(err);
            window.open('http://123.25.25.219:9021/login/login.html','_self');
        }
    });
}, 1000);

$('.close_box').click(function(){
    $('#rstPsw').css('display','none');
    $('#user_detail').css('display','none');
    $('#detail_ad').css('display','none');
})
$('#_user_infor').click(function(){
$.ajax({
    url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/byUserId/'+user_id,
    type: 'GET',
    headers: {
        Authorization: tk,
    },
    success: function(dt){
        $('#user_email').val(dt.data.email);
        $('#user_phone').val(dt.data.phone);
        $('#user_workplace').val(dt.data.workplace);
        $('#user_major').val(dt.data.major);

    },
    error: function(err){
        console.log(err);
    }
})
$('#user_detail').css('display','block');
})

$('#save_user').click(function(){
var phone = $('#user_phone').val();
var workplace = $('#user_workplace').val();
var major = $('#user_major').val();
//var psw = $('#user_psw').val();
$.ajax({
    url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/updateInfor/'+user_id,
    type: 'POST',
    headers: {
        Authorization: tk,
    },
    data: {
        phone: phone,
        workplace: workplace,
        major: major,
    },
    success: function(dt){
        alert(dt.message);
        window.location.reload();

    },
    error: function(err){
        console.log(err);
    }
})

})

//
function detail_admin(id){

$.ajax({
    url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/'+id,
        type: 'GET',
        headers: {
            Authorization:  tk,
        },success: function (dt) {
            console.log(dt.data.major);
            $('#name_ad').val(dt.data.name);
            $('#email_ad').val(dt.data.email);
            $('#phone_ad').val(dt.data.phone);
            $('#_major_ad').val(dt.data.major);
            $('#workplace_ad').val(dt.data.workplace);
            $('#id_ad').val(dt.data.user_id);
        },error: function(err){
            console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
        }
});
$('#detail_ad').css('display','block');

}

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
                alert('Đổi mật khẩu thành công!!');
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

