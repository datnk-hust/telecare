var tk = localStorage.getItem('token');
var arrProvider = [];
var time = setInterval(function() {
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/provider',
        type: 'GET',
        headers: {
            Authorization: "Bearer " + tk
        },
        success: function(dt){
            arrTypeTicket = [];
            var i =1;
            dt.data.forEach(element => {
                arrProvider.push(element.provider_name);
                    $('#_liste_provider').append(
                        '<tr><td class="text-center">'+i+'</td><td>'+element.provider_name+'</td><td>'+element.address+'</td><td>'+element.email+'</td><td class="text-center">'+element.phone+'</td><td class="text-center"><a data-toggle="modal" onClick="detail_provider(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm admin" data-toggle="modal" data-target=".bd-example-modal-lg" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
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
    $('#add_provider_popup').css('display','block');
    $('#edit_provider_popup').css('display','none');
})
$('#close_add').click(function(){
     $('#add_provider_popup').css('display','none');
})
$('#close_edit').click(function(){
     $('#edit_provider_popup').css('display','none');
})
$('#save_add_provider').click(function(){
    var name = $('#add_provider_name').val();
    var note = $('#add_provider_note').val();
    var email = $('#add_provider_email').val();
    var phone = $('#add_provider_phone').val();
    var address = $('#add_provider_address').val();
    if(name == undefined || name == null || name==''){
        alert('Please Enter Provider Name!');
        $('#add_provider_name').focus();
    }else{
        if(arrProvider.includes(name)){
            alert('Provider Name is exits!');
        }else{
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/provider',
            type: 'POST',
            headers: {
                Authorization: 'Bearer '+ tk
            },
            data:{
                provider_name: name,
                note: note,
                address: address,
                email: email,
                phone: phone
            },
            success: function(dt){
                console.log('ok');
                alert(' Create Successfully Provider!');
                window.location.reload();
            },
            error: function(err){
                console.log(err);
            }
        })
    }
    }
})

function detail_provider(id){
    $('#add_provider_popup').css('display','none');
    $('#edit_provider_popup').css('display','block');
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/provider/'+id,
        type: 'GET',
        headers: {
            Authorization: 'Bearer '+ tk
        },
        success: function(dt){
            console.log('got TicketType');
            $('#edit_provider_name').val(dt.data.provider_name);
            $('#edit_provider_address').val(dt.data.address);
            $('#edit_provider_email').val(dt.data.email);
            $('#edit_provider_phone').val(dt.data.phone);
            $('#edit_provider_note').val(dt.data.note);
        },
        error: function(err){
            console.log(err);
        }
    });

    $('#update_provider').click(function(){
    var editName = $('#edit_provider_name').val();
    var editNote = $('#edit_provider_note').val();
    var editEmail = $('#edit_provider_email').val();
    var editPhone = $('#edit_provider_phone').val();
    var editAddress = $('#edit_provider_address').val();
    $('#edit_provider_name').on('change',function(){
         editName = $('#edit_provider_name').val();
    });
    $('#edit_provider_address').on('change',function(){
        editAddress = $('#edit_provider_address').val();
    });
    $('#edit_provider_name').on('change',function(){
         editEmail = $('#edit_provider_email').val();
    });
    $('#edit_provider_address').on('change',function(){
        editPhone = $('#edit_provider_phone').val();
    });
    $('#edit_provider_name').on('change',function(){
         editNote = $('#edit_provider_note').val();
    });
    
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/provider/'+id,
        type:'PUT',
        headers: {
            Authorization: 'Bearer ' + tk
        },
        data: {
            provider_name: editName ,
            note: editNote,
            phone: editPhone,
            email: editEmail,
            address: editAddress

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
    var query = $('.search-input').val();
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/provider/search',
        type: 'POST',
        headers: {
            Authorization: 'Bearer ' + tk,
        },
        data: {
            query: query,
        },
        success: function(dt){
            var i =1;
            $('#_liste_provider').html('');
            dt.data.forEach(element => {
                    $('#_liste_provider').append(
                        '<tr><td class="text-center">'+i+'</td><td>'+element.provider_name+'</td><td>'+element.address+'</td><td>'+element.email+'</td><td class="text-center">'+element.phone+'</td><td class="text-center"><a data-toggle="modal" onClick="detail_provider(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm admin" data-toggle="modal" data-target=".bd-example-modal-lg" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
                        );
                    i++
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