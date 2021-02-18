var tk = localStorage.getItem('token');
var time = setInterval(function(){
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                console.log(dt);
                if(dt.status == 'Token is Invalid' || dt.status == 'Token is Expired'){
                    window.open('http://123.25.25.219:9021/login/login.html','_self');
                }else{
                    
                    var ticket_scheduled = 0;
                    var ticket_ready = 0;
                    var ticket_disc = 0;
                
                    dt.data.forEach(element => {
                    if(element.study_status == 1){
                        ticket_scheduled += 1;
                    }
                    if(element.study_status == 3){
                        ticket_ready += 1;
                    }
                    if(element.study_status == 7){
                        ticket_disc += 1;
                    }
                })
                $('#ticket_scheduled').text(ticket_scheduled);
                //$('#ticket_ready').text(ticket_ready);
                $('#ticket_disc').text(ticket_disc);
                }
                
                
                clearInterval(time);
            }
            ,error: function(err){
                console.log(err);
                window.open('http://123.25.25.219:9021/login/login.html','_self');
                
            }
        });

        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/status/2',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
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
                    '<tr><td class="text-center text-muted">'+i+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+status+'</td><td class="text-center"><button type="button"  onClick="detail_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
                );
                i++;
                })
                
               
                }
               
            },error: function(err){
                console.log(err);
                window.open('http://123.25.25.219:9021/login/login.html','_self');
            }
        });

        $.ajax({
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/ordered",
            type: "GET",
            headers: {
                Authorization: "Bearer "+ tk
            },
            success: function(dt){
                
                material_total = dt.data.length;
                $('#material_ordered').html(material_total);
                
            },
            error: function(err){
                console.log(err);
               // window.open('http://123.25.25.219:9021/login/login.html','_self');
            }
        });

    }, 1000);

function detail_admin(id){
    
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/'+id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                $('#name_ad').val(dt.data.name);
                $('#email_ad').val(dt.data.email);
                $('#phone_ad').val(dt.data.phone);
                $('#major_ad').val(dt.data.major);
                $('#workplace_ad').val(dt.data.workplace);
                $('#id_ad').val(dt.data.user_id);
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
    });
    $('#detail_ad').css('display','block');
    
}
$('.close').click(function(){
    $('#detail_ad').css('display','none');
})
$('#go_sheduled_list').click(function(){
    localStorage.setItem('selected','SCHEDULED');
    window.open('http://123.25.25.219:9021/admin_ticket.html','_self');
})
$('.material_ordered').click(function(){
    window.open('http://123.25.25.219:9021/material_ordered.html','_self');
    
})