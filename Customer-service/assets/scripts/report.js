var tk = localStorage.getItem('token');

var time = setInterval(function(){
    $('#_today').attr('class','active btn btn-focus');
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var ticket_completed = 0;
                var ticket_dictate = 0;
                var ticket_finalize = 0;
                dt.data.forEach(element => {
                    if(element.study_status == 8){
                        ticket_completed += 1;
                    }
                    if(element.study_status == 9){
                        ticket_dictate += 1;
                    }
                    if(element.study_status == 11){
                        ticket_finalize += 1;
                    }
                })
                $('#ticket_completed').text(ticket_completed);
                $('#ticket_dictate').text(ticket_dictate);
                $('#ticket_finalized').text(ticket_finalize); 
                clearInterval(time);
            },error: function(err){
                console.log(errs);
                window.open('http://123.25.25.219:9021/login/login.html','_self');
            }
        });

        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/workload/0',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var i = 1;
                console.log(dt);
                dt.data.forEach(element=>{
                    $('#_workload_admin').append(
                    '<tr><td class="text-center text-muted">'+element.admin+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+element.started+'</td><td class="text-center">'+element.diparted+'</td><td class="text-center">'+element.canceled+'</td><td class="text-center">'+element.discountinued+'</td><td class="text-center">'+element.completed+'</td><td class="text-center">'+element.finalize+'</td><td class="text-center"><button type="button"  onClick="detail_workload_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
                );
                i++;
                })
                
               
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
        })
    }, 1000);

    $('#_today').click(function(){
        $('#_workload_admin').html('');
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/workload/0',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var i =1;
                console.log(dt.ticket);
                dt.data.forEach(element=>{
                    $('#_workload_admin').append(
                    '<tr><td class="text-center text-muted">'+element.admin+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+element.started+'</td><td class="text-center">'+element.diparted+'</td><td class="text-center">'+element.canceled+'</td><td class="text-center">'+element.discountinued+'</td><td class="text-center">'+element.completed+'</td><td class="text-center">'+element.finalize+'</td><td class="text-center"><button type="button"  onClick="detail_workload_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
                );
                i++;
                })
                
               
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
        })
    })

    $('#_week').click(function(){
        $('#_workload_admin').html('');
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/workload/1',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var i =1;
                console.log(dt);
                dt.data.forEach(element=>{
                    $('#_workload_admin').append(
                    '<tr><td class="text-center text-muted">'+element.admin+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+element.started+'</td><td class="text-center">'+element.diparted+'</td><td class="text-center">'+element.canceled+'</td><td class="text-center">'+element.discountinued+'</td><td class="text-center">'+element.completed+'</td><td class="text-center">'+element.finalize+'</td><td class="text-center"><button type="button"  onClick="detail_workload_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
                );
                i++;
                })
                
               
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
        })
    })

    $('#_month').click(function(){
        $('#_workload_admin').html('');
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/workload/2',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var i =1;
                console.log(dt);
                dt.data.forEach(element=>{
                    $('#_workload_admin').append(
                    '<tr><td class="text-center text-muted">'+element.admin+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+element.started+'</td><td class="text-center">'+element.diparted+'</td><td class="text-center">'+element.canceled+'</td><td class="text-center">'+element.discountinued+'</td><td class="text-center">'+element.completed+'</td><td class="text-center">'+element.finalize+'</td><td class="text-center"><button type="button"  onClick="detail_workload_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
                );
                i++;
                })
                
               
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
        })
    })

    $('#_all').click(function(){
        $('#_workload_admin').html('');
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/workload/3',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var i =1;
                console.log(dt);
                dt.data.forEach(element=>{
                    $('#_workload_admin').append(
                    '<tr><td class="text-center text-muted">'+element.admin+'</td><td><div class="widget-content p-0"><div class="widget-content-wrapper"><div class="widget-content-left mr-3"><div class="widget-content-left"><img width="40" class="rounded-circle" src="assets/images/avatars/'+i+'.jpg" alt=""></div></div><div class="widget-content-left flex2"><div class="widget-heading">'+element.name+'</div><div class="widget-subheading opacity-7">'+element.major+'</div></div></div></div></td><td class="text-center">'+element.started+'</td><td class="text-center">'+element.diparted+'</td><td class="text-center">'+element.canceled+'</td><td class="text-center">'+element.discountinued+'</td><td class="text-center">'+element.completed+'</td><td class="text-center">'+element.finalize+'</td><td class="text-center"><button type="button"  onClick="detail_workload_admin(' + element.id + ')"  class="btn btn-primary btn-sm">Details</button></tr>'
                );
                i++;
                })
                
               
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
        })
    })

    function detail_workload_admin(id){
        $('#_today').attr('class','btn btn-focus');
        $('#_week').attr('class','btn btn-focus');
        $('#_month').attr('class','btn btn-focus');
        $('#_all').attr('class','btn btn-focus');
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/workload/detail/'+id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },success: function (dt) {
                var i = 1;
                console.log(dt);
                $('#name_adm').html(dt.username);
                $('#detail_list_workload').html('');
                dt.data.forEach(element=>{
                   
                    $('#detail_list_workload').append(
                    '<tr><td>'+i+'</td><td>'+element.ticket_id+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.discharge_time+'</td></tr>'
                );
                })
            },error: function(err){
                console.log('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
    });
    $('#ad_workload_detail').css('display','block');
    
}
$('.close').click(function(){
    $('#detail_ad').css('display','none');
})
$('.close_box').click(function(){
    $('#ad_workload_detail').css('display','none');
})
$('.btn-focus').click(function(){
    $('#_today').attr('class','btn btn-focus');
    $('#_week').attr('class','btn btn-focus');
    $('#_month').attr('class','btn btn-focus');
    $('#_all').attr('class','btn btn-focus');
    $(this).attr('class','active btn btn-focus');
});
