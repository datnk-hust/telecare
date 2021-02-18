
var time1 = setInterval(function(){
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_type',
        type: 'GET',
        headers:{
            Authorization: 'Bearer '+ localStorage.getItem('token')
        },
        success: function(dt){
            $('#email').val(localStorage.getItem('email'));
            $('#user_phone').val(localStorage.getItem('phone'));
            $('#username').val(localStorage.getItem('name'));
            $('#place').val(localStorage.getItem('workplace'));
            $('#ticket_type').html('<option value="">Chọn hệ thống gặp lỗi</option>');
            dt.data.forEach(element => {
                $('#ticket_type').append(
                    '<option value="'+element.ticket_name+'">'+element.ticket_name+'</option>'
                );
            });
            clearInterval(time1);
        },
        error: function(err){
            console.log(err);
        }
    })
},1000);
//set schedule_date
let date_ob = new Date();
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();
// prints date & time in YYYY-MM-DD HH:MM:SS format
var schedule_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
//set global variable
var tkid = 'tkxxx';
var priority = 'a';
var note = 'a';
var ticket_type = 'OTHER';
var ticket_total = localStorage.getItem('total_ticket');
var order_id = localStorage.getItem('user_id');
var tken =  localStorage.getItem('token');
var dataBase64 = '';
//choose ticket type id
$('#ticket_type').on('change',function(){
    ticket_type = $("#ticket_type option:selected").val();
    tkid = ticket_type+'_'+ localStorage.getItem('user_id') +'_' +(parseInt(ticket_total)+1);
})
$('#priority').on('change',function(){
    priority = $("#priority option:selected").val();
})
//readfile process file
function readFile() {

if (this.files && this.files[0]) {

var FR= new FileReader();

FR.addEventListener("load", function(e) {
$("#img").css("display", "block");
document.getElementById("img").src       = e.target.result;
dataBase64 = e.target.result;
}); 

FR.readAsDataURL( this.files[0] );
}

}
document.getElementById("image").addEventListener("change", readFile);
//

//send ticket
$('#send_ticket').click(function(){
//validate information
    var ticket_title = $('#subject').val();
    var ticket_type_id = ticket_type;
    var description = $('#description').val();
    var note = $('#note').val();
    var username = $('#username').val();
    var user_phone = $('#user_phone').val();
    var email = $('#email').val();
    var workplace = $('#place').val();
    if(username == '' || user_phone == '' || description == '' || workplace == '' || ticket_title == ''){
        alert('Chưa điền đầy đủ thông tin bắt buộc- bao gồm các trường có dấu *');
        return true;
    }
//validate extension image
    var allowedFiles = [".png", ".jpg", ".giff", ".tiff"];
    var fileUpload = $("#image");
    var lblError = $("#lblError");
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
if(fileUpload.val()){
    if (!regex.test(fileUpload.val().toLowerCase())) {
    lblError.html("Chỉ chấp nhận file chứa đuôi: <b>" + allowedFiles.join(', ') + "</b> only.");
    return false;
    }
    lblError.html('');
}

//check log
    console.log('các dữ liệu truyền lên');
    console.log('tổng ticket: '+ ticket_total);
    console.log(ticket_type);
    console.log(priority);
    console.log(tkid);
    //console.log(dataBase64);
    console.log(username);
    console.log(order_id);
    console.log(email);
    console.log(description);
    console.log(schedule_date);
//call api post ticket
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket',
        type: 'POST',
        headers: {
            Authorization: 'Bearer '+ tken,
        },
        data: {
            'ticket_id': tkid,
            'ticket_title': ticket_title,
            'ticket_type_id': ticket_type_id,
            'priority': priority,
            'schedule_date': schedule_date,
            'study_status': 1,
            'note': ' '+ note,
            'description': description,
            'order_id': order_id,
            'order_name': username,
            'order_phone': user_phone,
            'order_workplace': workplace,
            'order_email': ''+email,
            'image_des': dataBase64,
        },success: function(dt){
            localStorage.setItem('total_ticket', dt.data.total_ticket);
            alert('Đã tạo ticket thành công!');
            window.location.reload();
        },error: function(err){
            console.log(err);
            alert('Có lỗi xảy ra, không gửi được ticket. Vui lòng kiểm tra lại!');
        }
    })
})
//tao lai button
$('#clear_all').click(function(){
    window.location.reload();
})
//


$('#_user_infor').click(function(){
$.ajax({
    url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/byUserId/'+order_id,
    type: 'GET',
    headers: {
        Authorization: 'Bearer '+ tken,
    },
    success: function(dt){
        $('#user_email').val(dt.data.email);
        $('#user_phone_detail').val(dt.data.phone);
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
var phone = $('#user_phone_detail').val();
var workplace = $('#user_workplace').val();
var major = $('#user_major').val();
//var psw = $('#user_psw').val();
$.ajax({
    url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/updateInfor/'+order_id,
    type: 'POST',
    headers: {
        Authorization: 'Bearer '+ tken,
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
$('.close_box').click(function(){
    $('#save_psw').css('display','none');
    $('#user_detail').css('display','none');
})

$('#reloadpage').click(function(){
    window.location.reload();
})
