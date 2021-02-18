var material_total;
var provider_id;
var materialID;
var tk = localStorage.getItem('token');
$('.search-icon').click(function(){
    console.log('ok');
    var query = $('.search-input').val();
    $.ajax({
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/search",
            type: "POST",
            headers: {
                Authorization: "Bearer "+ tk
            },
            data:{
                query: query,
            },
            success: function(dt){
                var i = 1;
                $('#material_list').html('');
                    dt.data.forEach(element => {
                    $('#material_list').append(
                        '<tr><td class="center">'+i+'</td><td>'+element.material_name+'</td><td class="center">'+element.model+'</td><td >'+element.import_date+'</td><td class="center">'+element.amount+'</td><td class="center">'+element.unit+'</td><td class="center"><a data-toggle="modal" onClick="view_material(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm material" style="text-decoration: none;color: white;"> View</a></td></tr>'
                        );
                    i++;
                    }); 
            },
            error: function(err){
            console.log("Error Server!");
            }
        });
})

$('.close').click(function(){
        $('.search-input').val('');
})

var time = setInterval(function(){
        $.ajax({
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/ordered",
            type: "GET",
            headers: {
                Authorization: "Bearer "+ tk
            },
            success: function(dt){
                clearInterval(time);
                console.log(dt);
                var i = 1;
                material_total = dt.data.length;
                $('#material_list').html('');
                    dt.data.forEach(element => {
                    $('#material_list').append(
                        '<tr><td class="center">'+i+'</td><td>'+element.ticket_id+'</td><td class="center">'+element.ticket_title+'</td><td >'+element.schedule_time+'</td><td class="center">'+element.material_name+'</td><td class="center">'+element.material_model+'</td><td class="center">'+element.ordered_time+'</td><td class="center">'+element.amount_ordered+'</td><td class="center">'+element.amount_total+'</td><td class="center"><a data-toggle="modal" onClick="accept_material_order(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm material" style="text-decoration: none;color: white;">Accept</a> <a data-toggle="modal" onClick="cancel_material_ordered(' + element.id + ')" class="btn btn-primary btn-sm material" style="text-decoration: none;color: white;margin-left: 5px;background-color: red;"> Cancel </a></td></tr>'
                        );
                    i++;
                    }); 
            },
            error: function(err){
            console.log(err);
            window.open('http://123.25.25.219:9021/login/login.html','_self');
            }
        });
    }, 1000);



$('.close_box').click(function(){
    $('#material_detail').css('display','none');
    $('#save_material').css('display','none');
})

function cancel_material_ordered(id){
    $.ajax({
        url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/process-order/"+id,
        type: "POST",
        headers: {
            Authorization: "Bearer "+ tk
        },
        data: {
            status: 0,
            userId: localStorage.getItem('user_id')
        },
        success: function(dt){
            alert("Canceled order's engineer");
            window.location.reload();
        },
        error: function(err){
            console.log(err);
        
        }
    });
}
function accept_material_order(id){
    $.ajax({
        url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/process-order/"+id,
        type: "POST",
        headers: {
            Authorization: "Bearer "+ tk
        },
        data: {
            status: 1,
            userId: localStorage.getItem('user_id')
        },
        success: function(dt){
            alert('Accepted order for engineer');
            window.location.reload();
        },
        error: function(err){
            console.log(err);
        
        }
    });
}