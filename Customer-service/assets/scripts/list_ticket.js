var tk = 'Bearer '+ localStorage.getItem("token");
var user_id = localStorage.getItem("user_id");
//load list item th first
var time_list = setInterval(function(){
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/byUser/'+user_id,
        type: 'POST',
        headers: {
            Authorization: 'Bearer '+localStorage.getItem('token'),
        },success: function (dt) {
            var ticket_scheduled = 0;
            var ticket_started = 0;
            var ticket_finalize = 0;
            var i = 1;
            $('#list_ticket').html('');
            dt.data.forEach(element => {
                if(element.study_status == '1'){
                    var status = '<div class="btn btn-secondary">Scheduled</div>';
                }else if(element.study_status == '3'){
                    var status = '<div class="btn btn-light">Ready</div>';
                }else if(element.study_status == '4'){
                    var status = '<div class="btn btn-info">Started</div>';
                }else if(element.study_status == '5'){
                    var status = '<div class="btn btn-dark">Diparted</div>';
                }else if(element.study_status == '6'){
                    var status = '<div class="btn btn-danger">Canceled</div>';
                }else if(element.study_status == '7'){
                    var status = '<div class="btn btn-warning">Discountinued</div>';
                }else if(element.study_status == '8'){
                    var status = '<div class="btn btn-success">Completed</div>';
                }else if(element.study_status == '9'){
                    var status = '<div class="btn btn-focus">Dictate</div>';
                }else if(element.study_status == '10'){
                    var status = '<div class="btn btn-alternate">Transcript</div>';
                }else{
                    var status = '<div class="btn btn-primary">Finalize</div>';
                }

                $('#list_ticket').append(
                    '<tr><td>'+i+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
                    );
                i++;
            })
            clearInterval(time_list);
        },error: function(err){
            console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            window.open('http://123.25.25.219:9021/login/login.html','_self');
        }
    });
}, 1000);
//search ticket
$('#search_ticket').on('change',function(){
var query = $(this).val();
$.ajax({
    url:  'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/byUser/'+user_id,
    type: 'POST',
    data: {
        query: query
    },
    headers: {
        Authorization: tk
    },success: function(dt){
        $('#list_ticket').html('');
        var i=1;
        dt.data.forEach(element => {
            if(element.study_status == '1'){
                var status = '<div class="btn btn-secondary">Scheduled</div>';
            }else if(element.study_status == '3'){
                var status = '<div class="btn btn-light">Ready</div>';
            }else if(element.study_status == '4'){
                var status = '<div class="btn btn-info">Started</div>';
            }else if(element.study_status == '5'){
                var status = '<div class="btn btn-dark">Diparted</div>';
            }else if(element.study_status == '6'){
                var status = '<div class="btn btn-danger">Canceled</div>';
            }else if(element.study_status == '7'){
                var status = '<div class="btn btn-warning">Discountinued</div>';
            }else if(element.study_status == '8'){
                var status = '<div class="btn btn-success">Completed</div>';
            }else if(element.study_status == '9'){
                var status = '<div class="btn btn-focus">Dictate</div>';
            }else if(element.study_status == '10'){
                var status = '<div class="btn btn-alternative">Transcript</div>';
            }else{
                var status = '<div class="btn btn-primary">Finalize</div>';
            }
            
            $('#list_ticket').append(
                '<tr><th scope="row">'+i+'</th><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+status+'</td><td><a onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary" style="text-decoration: none;color:white;">Chi tiết</a></td></tr>'
                );
            i++;
        })
    },error: function(err){
        alert('Có lỗi xảy ra');
    }
})
})
//detail ticket
function detail_ticket(id){
//console.log(id);
$('#show_ticket').css('display','block');
$.ajax({
    url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/'+id,
    type: 'GET',
    headers: {
        Authorization: tk,
    },success: function(dt){
        $('#subject_tk').val(dt.data.ticket_title);
        $('#description_tk').val(dt.data.description);
        $('#type_tk').val(dt.data.ticket_type_id);
        $('#reason_tk').val(dt.data.advice);
        $('#solution_tk').val(dt.data.solution);
        $('#note_tk').val(dt.data.note);
        $('#result_date_tk').val(dt.data.result_date);
        $('#engineer_tk').val(dt.data.engineer_id);
        //console.log(dt.data.image_des);
        document.getElementById("image_tk").src = dt.data.image_des;
    },error: function(err){
        console.log(err);
        alert('Có lỗi xảy ra.');
    }
})
}
// $('#close_ticket').click(function(){
// $('#show_ticket').css('display','none');
// })
$('.close_box').click(function(){
    $('#save_psw').css('display','none');
    $('#user_detail').css('display','none');
    $('#show_ticket').css('display','none');
    
})
$('.close_box_zoom').click(function(){
    $('.show-image').css('display','none');
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

$('#image_tk').click(function(){
    $('#imagezoom').attr('src',$('#image_tk').attr('src'));
    //$('.show-image').css('display','block');
    $('.show-image').fadeIn(1000);
})