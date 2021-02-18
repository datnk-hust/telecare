var tk = localStorage.getItem('token');
var arrTypeTicket = [];
var time = setInterval(function() {
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_type',
        type: 'GET',
        headers: {
            Authorization: "Bearer " + tk
        },
        success: function(dt){
            console.log('ok');
            arrTypeTicket = [];
            var i =1;
            dt.data.forEach(element => {
                arrTypeTicket.push(element.ticket_name);
                    $('#_list_type_ticket').append(
                        '<tr><td class="text-center">'+i+'</td><td class="text-center">'+element.ticket_name+'</td><td class="text-center">'+element.note+'</td><td class="text-center"><a data-toggle="modal" onClick="detail_ticketType(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm admin" data-toggle="modal" data-target=".bd-example-modal-lg" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
                        );
                    i++
            });
            clearInterval(time);
        },
        error: function(err){
            console.log(err);
            window.open('http://123.25.25.219:9021/login/login.html','_self');
        }
    })
}, 1000);

$('#add_type_ticket').click(function(){
    $('#add_type_ticket_popup').css('display','block');
    $('#edit_type_ticket_popup').css('display','none');
})
$('#close_add').click(function(){
     $('#add_type_ticket_popup').css('display','none');
})
$('#close_edit').click(function(){
     $('#edit_type_ticket_popup').css('display','none');
})
$('#save_add_ticket_type').click(function(){
    var name = $('#add_ticket_type_name').val();
    var note = $('#add_ticket_type_note').val();
    if(name == undefined || name == null || name==''){
        alert('Please Enter Ticket Type Name!');
        $('#add_ticket_type_name').focus();
    }else{
        if(arrTypeTicket.includes(name)){
            alert('Ticket Type Name is exits!');
        }else{
        console.log('api');
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_type',
            type: 'POST',
            headers: {
                Authorization: 'Bearer '+ tk
            },
            data:{
                ticket_name: name,
                note: note
            },
            success: function(dt){
                console.log('ok');
                alert('Successfully Create Ticket Type!');
                window.location.reload();
            },
            error: function(err){
                console.log(err);
            }
        })
    }
    }
})

function detail_ticketType(id){
    $('#add_type_ticket_popup').css('display','none');
    $('#edit_type_ticket_popup').css('display','block');
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_type/'+id,
        type: 'GET',
        headers: {
            Authorization: 'Bearer '+ tk
        },
        success: function(dt){
            console.log('got TicketType');
            $('#edit_ticket_type_name').val(dt.data.ticket_name);
            $('#edit_ticket_type_note').val(dt.data.note);
        },
        error: function(err){
            console.log(err);
        }
    });

    $('#update_ticket_type').click(function(){
    var editName = $('#edit_ticket_type_name').val();
    var editNote = $('#edit_ticket_type_note').val();
    $('#edit_ticket_type_name').on('change',function(){
         editName = $('#edit_ticket_type_name').val();
    });
    $('#edit_ticket_type_note').on('change',function(){
        editNote = $('#edit_ticket_type_note').val();
    });
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_type/'+id,
        type:'PUT',
        headers: {
            Authorization: 'Bearer ' + tk
        },
        data: {
            ticket_name: editName ,
            note: editNote,
        },
        success: function(dt){
            alert('update Successfully!');
            window.location.reload();
        },
        error: function(err){
            console.log(err);
        }
    })
})
}

$('.search-icon').click(function(){ 
    var query = $('#search').val();
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_type/search',
        type: 'POST',
        headers: {
            Authorization: 'Bearer ' + tk,
        },
        data: {
            query: query,
        },
        success: function(dt){
            var i =1;
            $('#_list_type_ticket').html('');
            dt.data.forEach(element => {
                $('#_list_type_ticket').append(
                        '<tr><td class="text-center">'+i+'</td><td class="text-center">'+element.ticket_name+'</td><td class="text-center">'+element.note+'</td><td class="text-center"><a data-toggle="modal" onClick="detail_ticketType(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm admin" data-toggle="modal" data-target=".bd-example-modal-lg" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
                        );
                    i++
            });
        },
        error: function(error){
            console.log(error);
        }
    })
})
