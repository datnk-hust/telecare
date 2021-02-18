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
            url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/material",
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
                        '<tr><td class="center">'+i+'</td><td>'+element.material_name+'</td><td class="center">'+element.model+'</td><td >'+element.import_date+'</td><td class="center">'+element.amount+'</td><td class="center">'+element.unit+'</td><td class="center"><a data-toggle="modal" onClick="view_material(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm material" style="text-decoration: none;color: white;"> View</a></td></tr>'
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

function view_material(id){
    $('#material_detail').css('display','block');
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/'+id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' +tk,
            },
            success: function(dt){
                $('#edit_materialID').val(dt.data.material_id);
                $('#edit_materialName').val(dt.data.material_name);
                $('#edit_model').val(dt.data.model);
                $('#edit_amount').val(dt.data.amount);
                $('#edit_unit').val(dt.data.unit);
                $('#edit_provider').val(dt.provider_name);
                $('#edit_note').val(dt.data.note);
                $('#edit_importDate').val(dt.data.import_date);
                $('#edit_used').val(dt.data.used);
            },
            error: function(error){
                console.log(error);
            }
    });
    //update material infor
    $('#saveEdit').click(function(){
    var mName = $('#edit_materialName').val();
    var model = $('#edit_model').val();
    var amount = $('#edit_amount').val();
    var unit = $('#edit_unit').val();
    var note = $('#edit_note').val();
    var import_date = $('#edit_importDate').val();
    var params = '?material_name='+mName+'&model='+model+'&note='+note+'&import_date='+import_date+'&unit='+unit;
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/material/'+id+params,
        type: 'PUT',
        headers:{
            Authorization: 'Bearer '+tk,
        }
        ,success: function(dt){
            alert('Update successfully!');
            window.location.reload();
        },error: function(err){
            alert('Error server');
            console.log(err);
        }
    })

})

}

$('.close_box').click(function(){
    $('#material_detail').css('display','none');
    $('#save_material').css('display','none');
})

$('#add_material').click(function(){
    $('#save_material').css('display','block');
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/provider',
        type: 'GET',
        headers:{
            Authorization: 'Bearer '+tk,
        },success: function(dt){
            $('#provider').html('<option value="">Select provider</option>');
            dt.data.forEach(element=>{
                $('#provider').append(
                '<option value="'+element.id+'">'+element.provider_name+'</option>'
                )
            })
            
        },error: function(err){
            console.log(err);
        }
    })
})

$('#provider').on('change',function(){
    provider_id = $('#provider').val();
})

$('#addNew').click(function(){
    var mName = $('#materialName').val();
    var model = $('#model').val();
    var amount = $('#amount').val();
    var unit = $('#unit').val();
    var note = $('#note').val();
    var import_date = $('#importDate').val();
    var provider = provider_id;
    var sl = parseInt(material_total)+1;
    var id = model+'_'+ provider_id +'-' +sl;
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/material',
        type: 'POST',
        headers:{
            Authorization: 'Bearer '+tk,
        },
        data:{
            material_id: id,
            material_name: mName,
            model: model,
            amount: amount,
            unit: unit,
            note: note,
            provider_id: provider,
            import_date: import_date,
            used: 0
        }
        ,success: function(dt){
            alert('Add successfully!');
            window.location.reload();
           
            
        },error: function(err){
            console.log('error');
            console.log(err);
        }
    })

})
