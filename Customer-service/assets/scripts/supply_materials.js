var tk = localStorage.getItem('token');
var use = 0;
$('#tk_id').html(localStorage.getItem('tken_id'));
var time = setInterval(function(){
    $.ajax({
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material",
            type: "GET",
            headers: {
                Authorization: "Bearer "+ tk
            },
            success: function(dt){
                console.log(dt);
                clearInterval(time);
                var i = 1;
                $('#material_list').html('');
                    dt.data.forEach(element => {
                        var use = parseInt(element.amount) - parseInt(element.used);
                    $('#material_list').append(
                        '<tr><td class="center">'+i+'</td><td>'+element.material_id+'</td><td >'+element.material_name+'</td><td class="center">'+element.model+'</td><td class="center">'+element.import_date+'</td><td class="center">'+element.amount+'</td><td class="center">'+element.used+'</td><td class="center">'+element.unit+'</td><td class="center"><a type="button" data-toggle="'+use+'" onClick="order_material(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm material_detail" style="text-decoration: none;color: white;"> Order</a></td></tr>'
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

function order_material(id){
    $('#note_box').css('display','block');
    var ID = '#'+id;
    use = parseInt( $(ID).attr('data-toggle'));
    console.log(use);

    //save order
    $('#save_order').click(function(){
    var note = $('#note').val();
    var amount = $('#amount_order').val();
    if(amount == null || amount =='' || amount== 'null' || amount== undefined){
        alert('Please enter amount of material!');
    }
    else if(parseInt(amount)> use){
        alert('Not enough material order, please check again!');
    }else{
       
        $.ajax({
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_material/order/"+id,
            type: "POST",
            headers: {
                Authorization: "Bearer "+ tk
            },
            data:{
                ticket_id : localStorage.getItem('tken_id'),
                amount: amount,
                note: note,
            },
            success: function(dt){
                window.location.reload();
                alert('order successfully!');
                
            },
            error: function(err){
                console.log(err);
            }
        })
    }
    
})
}

$('#close_box').click(function(){
    $('#note_box').css('display','none');
})
