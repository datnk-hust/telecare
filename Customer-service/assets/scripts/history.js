var tk = localStorage.getItem('token');
$('.search-icon').click(function(){
    var query = $('.search-input').val();
    $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/search/0',
            type: 'POST',
            headers: {
                Authorization: 'Bearer ' +tk,
            },
            data:{
                query: query,
            },
            success: function(dt){
                var i = 1;
                $('#history_list').html('');
                dt.data.forEach(element => {
                    $('#history_list').append(
                        '<tr><td class="center">'+i+'</td><td>'+element.ticket_title+'</td><td class="center">'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td class="center">'+element.schedule_date+'</td><td class="center">'+element.result_date+'</td><td class="center"><a data-toggle="modal" onClick="view_history(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm history" style="text-decoration: none;color: white;"> View</a></td></tr>'
                        );
                    i++;
                    });
            },
            error: function(error){
                console.log(error);
            }
        })
})

$('.close').click(function(){
        $('.search-input').val('');
})

var time = setInterval(function(){
        $.ajax({
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
            type: "GET",
            headers: {
                Authorization: "Bearer "+ tk
            },
            success: function(dt){
                clearInterval(time);
                var i = 1;
                $('#history_list').html('');
                    dt.data.forEach(element => {
                    $('#history_list').append(
                        '<tr><td class="center">'+i+'</td><td>'+element.ticket_title+'</td><td class="center">'+element.ticket_type_id+'</td><td >'+element.order_workplace+'</td><td class="center">'+element.schedule_date+'</td><td class="center">'+element.result_date+'</td><td class="center"><a data-toggle="modal" onClick="view_history(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm history" style="text-decoration: none;color: white;"> View</a></td></tr>'
                        );
                    i++;
                    }); 
            },
            error: function(err){
            console.log("Error Server!");
            window.open('http://123.25.25.219:9021/login/login.html','_self');
            }
        });
    }, 1000);

function view_history(id){
    $('#history_detail').css('display','block');
    //$('.view_material_supplied').attr('id', id);
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/history/'+id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' +tk,
            },
            success: function(dt){
                console.log(dt);
                var i = 1;
                $('#list_event').html('');
                $('#title_name').html(dt.ticket_id);
                dt.data.forEach(element => {
                        
                    $('#list_event').append(
                        '<tr><td class="center">'+i+'</td><td>'+element.content+'</td><td>'+element.time+'</td><td>'+element.support_id+'</td><td>'+element.note+'</td></tr>'
                        );
                    i++;
                    });
            },
            error: function(error){
                console.log(error);
            }
    });

    $('.view_material_supplied').click(function(){
        $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/view_material/'+id,
        type: 'GET',
        headers: {
            Authorization: 'Bearer '+tk,
        }
        ,success: function(dt){
            var i = 0;
           $('#list_material_sp').html('');
           dt.data.forEach(element=>{
            $('#list_material_sp').append(
               '<tr><td>'+parseInt(i+1)+'</td><td>'+element.name+'</td><td>'+element.model+'</td><td>'+element.amount+'</td><td>'+element.supply_date+'</td><td>'+element.note+'</td></tr>'
            );
            i++;
           })
           
        },
        error: function(error){
            console.log(error);
        }
        });
        $('#material_supplied').css('display','block');
    })
}

$('.close_box').click(function(){
    $('#history_detail').css('display','none');
    $('#material_supplied').css('display','none');
})
