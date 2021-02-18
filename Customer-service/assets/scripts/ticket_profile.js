var uid = localStorage.getItem('user_id');
tk = localStorage.getItem('token');
var tk_id;
var ImgBase64= '';
var arrTickets=[];
var times = setInterval(function(){
    $.ajax({
        url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/engineer/'+ uid,
        type: 'GET',
        headers: {
            Authorization: 'Bearer '+ tk
        },success: function(dt){
            clearInterval(times);
            $('#_list_tickets').html('');
            let i =1; 
            arrTickets = dt.data;
            dt.data.forEach(element => {
                $('#_list_tickets').append(
                    '<tr><td>'+ i +'</td><td>'+ element.ticket_title+'</td><td>'+element.order_workplace+'</td><td>'+element.schedule_date+'</td><td><button type="button" class="btn btn-primary" onclick="ViewTicket(' + element.id + ')">View</button></td></tr>'
                );
                
                i++;
            });
            
        },error: function (err) {
            console.log(err);
        }
        });
    }, 1000);
    //search ticket
    $('.search-input').on('change',function(){
        
        let query = $('.search-input').val();
        $('#_list_tickets').html('');
        let i = 1;
        arrTickets.forEach(element => {
            if( element.ticket_title.toUpperCase().includes(query.toUpperCase()) || element.order_workplace.toUpperCase().includes( query.toUpperCase() ) || element.schedule_date.toUpperCase().includes(query.toUpperCase()) || element.ticket_type_id.toUpperCase().includes(query.toUpperCase())){
                $('#_list_tickets').append(
                    '<tr><td>'+ i +'</td><td>'+ element.ticket_title+'</td><td>'+element.order_workplace+'</td><td>'+element.schedule_date+'</td><td><button type="button" class="btn btn-primary" onclick="ViewTicket(' + element.id + ')">View</button></td></tr>'
                ) ;
                i++;
            }
            
        });
        
    })
    //read file image
    function readFile() {

        if (this.files && this.files[0]) {
        
        var FR= new FileReader();
        
        FR.addEventListener("load", function(e) {
            $("#img1").css("display", "block");
            document.getElementById("img1").src   = e.target.result;
                ImgBase64 = e.target.result;
            }); 
        
            FR.readAsDataURL( this.files[0] );
        }
        
    }
    document.getElementById("image").addEventListener("change", readFile);
    //show detail ticket
    function ViewTicket(id){
        tk_id = id;
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/'+id,
            type: 'GET',
            headers: {
            Authorization: 'Bearer '+ tk,
            },success: function(dt){
                ImgBase64 = dt.data.image_obs;
                let sttCheck = dt.data.study_status;
                
                if(parseInt(sttCheck) <= 4){
                    $('.study_btn').css('display','block');
                    $('.reporting_btn').css('display','none');
                    $('.finalize_btn').css('display','none');
                }else if(parseInt(sttCheck) <= 9){
                    let text = ''+ dt.data.solution;
                    console.log(text)
                    if( text != 'null'){
                        $('#finalizeTicket').css('display','inline');
                        $('.reporting_btn').css('display','inline');
                        $('.study_btn').css('display','none');
                        $('.finalize_btn').css('display','none');
                    }else{
                        $('.reporting_btn').css('display','block');
                        $('.study_btn').css('display','none');
                    }
                    
                }else{
                    $('.finalize_btn').css('display','block');
                    $('.study_btn').css('display','none');
                    $('.reporting_btn').css('display','none');
                }
               // console.log(dt.data);
                $('#_email').val(dt.data.order_email);
                $('#_phone').val(dt.data.order_phone);
                $('#_username').val(dt.data.order_name);
                $('#ticket_type').append('<option>'+dt.data.ticket_type_id+'</option>');
                $('#place').val(dt.data.order_workplace);
                $('#subject').val(dt.data.ticket_title);
                $('#priority').val(dt.data.priority);
                $('#description').val(dt.data.description);
                $('#img').attr('src', dt.data.image_des);
                $('#img1').attr('src', dt.data.image_obs);
                $('#note').val(dt.data.note);
                $('#description_reason').val(dt.data.reason);
                $('#description_advice').val(dt.data.advice);
                $('#description_solution').val(dt.data.solution);
                $('#arrival_date').val(dt.data.arrival_date);
                $('#result_date').val(dt.data.result_date);

                $('.process_ticket').fadeIn(1000);
            },error: function(err){
                console.log(err);
            }
        });
        
    }

    $('#close_box').click(function(){
        $('.process_ticket').css('display','none');
    })
    $('#_reset_psw').click(function(){
        $('#rstPsw').css('display','block');
    
    })
    $('#save_psw').click(function(){
        var email =  $('#rst_email').val();
        var c_psw = $('#c_psw').val();
        var n_psw = $('#n_psw').val();
        var cf_psw = $('#cf_psw').val();
        if( c_psw.length == 0 || email.length == 0 || cf_psw.length == 0 ||n_psw.length == 0){
            alert('Bạn cần nhập email, password hiện tại và nhập lại password mới!');
        }else if(n_psw != cf_psw ){
            alert('Xác nhận mật khẩu không trùng khớp!');
        }else if(  n_psw.length < 6 ){
            alert('Mật khẩu mới phải ít nhất 6 kí tự!');
        }else{
            $.ajax({
                url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/rstPassword',
                type: 'POST',
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('token'),
                },
                data: {
                    email: email,
                    password: c_psw,
                    new_password: n_psw,
                    cf_password: cf_psw
                },
                success: function(dt){
                    alert('Change password successfully!');
                    window.location.reload();
                },error: function (err) {
                    
                    alert('Email hoặc mật khẩu không đúng.');
                }
            })
        }
    })
    $('#_user_infor').click(function(){
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/byUserId/'+uid,
            type: 'GET',
            headers: {
                Authorization: 'Bearer '+ tk,
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
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/updateInfor/'+uid,
            type: 'POST',
            headers: {
                Authorization: 'Bearer '+  tk,
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
    $('.close_box').click(function(){
        $('#rstPsw').css('display','none');
        $('#user_detail').css('display','none');
        $('.order_material').css('display','none');
        $('#material_supplied').css('display','none');
    })
    $('#close_box_note').click(function(){
        $('#note_box').css('display','none');
    })
    
    $('#_logout').click(function(){
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/logout',
            type: 'POST',
            data: {
                'token': localStorage.getItem('token'),
            },success: function(dt){
                window.open('http://123.25.25.219:9021/login/login.html','_self');
            },error: function (err) {
                alert('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
        });
    })

    //process ticket
    $('#complete_btn').click(function(){
        $('#load').css('display','block');
        $('#load').fadeOut(3000,function(){
            $('.study_btn').css('display','none');
            $('.reporting_btn').css('display','block');
        });
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+tk_id+'/4',
            type: 'POST',
            headers: {
                Authorization: 'Bearer '+tk
            },
            data: {

            },
            success: function(dt){
                console.log(dt);
            },
            error: function(err){
                console.log(err);
            }

        })
    })

    $('#saveTicket').click(function(){
        
        //validate extension image
        let allowedFiles = [".png", ".jpg", ".giff", ".tiff"];
        let fileUpload = $("#image");
        let lblError = $("#lblError");
        let regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if(fileUpload.val()){
            if (!regex.test(fileUpload.val().toLowerCase())) {
                lblError.html("Only allow for extension as: <b>" + allowedFiles.join(', ') + "</b>!");
                return false;
            }
            lblError.html('');
        }
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+tk_id+'/8',
            type: 'POST',
            headers: {
                Authorization: 'Bearer ' + tk,
            },
            data: {
                reason: $('#description_reason').val(),
                solution: $('#description_solution').val(),
                advice: $('#description_advice').val(),
                image_obs : ImgBase64
            },
            success: function(dt){
                alert("Saved successfully ticket!");
                window.location.reload();
            },
            error: function(error){
                console.log(error);
            }
      
        });
      })
  
    $('#finalizeTicket').click(function(){
        //validate extension image
        let allowedFiles = [".png", ".jpg", ".giff", ".tiff"];
        let fileUpload = $("#image");
        let lblError = $("#lblError");
        let regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if(fileUpload.val()){
            if (!regex.test(fileUpload.val().toLowerCase())) {
                lblError.html("Only allow for extension as: <b>" + allowedFiles.join(', ') + "</b>!");
                return false;
            }
            lblError.html('');
        }
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+tk_id+'/10',
            type: 'POST',
            headers: {
                Authorization: 'Bearer ' + tk,
            },
            data: {
                reason: $('#description_reason').val(),
                solution: $('#description_solution').val(),
                advice: $('#description_advice').val(),
                image_obs : ImgBase64
            },
            success: function(dt){
                window.location.reload();
            },
            error: function(error){
                console.log(error);
            }
      
        });
      })
  
    $('#cancelResult').click(function(){
       
        alert('Be careful! This will not be able to complete the ticket. Do you want to countinue CANCEL REPORT? ');
        let because = prompt("Please enter some reason why canceling report ticket!", "");
        while( because == ''){
            because = prompt("Please enter some reason why canceling report ticket!", "");
        }

        if(because == '' || because == 'null' || because == null ){
            console.log('error syntax');
        }else{
            $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+tk_id+'/11',
            type: 'POST',
            headers: {
                Authorization: 'Bearer ' + tk,
            },
            data: {
                because: because
            },
                success: function(dt){
                    window.location.reload();
                },
                error: function(error){
                    console.log(error);
                }
      
            });
        }
      })
      
    function orderMaterial(id){
        $('#note_box').css('display','block');
        //
        $('#save_order').click(function(){
            var note = $('#note_order').val();
            var amount = $('#amount_order').val();
            console.log(tk_id);
            if(amount == '' || amount == 'null' || amount == null ){
                alert('Please enter amount of material you ordered!');
            }else{
                $.ajax({
                url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket_material/order/'+id,
                type: 'POST',
                headers: {
                    Authorization: 'Bearer ' + tk,
                },
                data: {
                        amount: amount,
                        ticket_id: tk_id,
                        note: note
                },
                    success: function(dt){
                        alert("Requested to system's manager. Please wait for response! ");
                        
                    },
                    error: function(error){
                        console.log(error)
                        alert('The quantity of materials is not enough to order. Please contact manager!');
                    }
        
                });
            }
        })
    }
    $('#orderMaterial').click(function(){
        let arrAcc=[];
          $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/material',
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + tk,
            },
            success: function(dt){
                $('#list_materials').html('');
                dt.data.forEach(element => {
                    arrAcc.push(element);
                    $('#list_materials').append(
                        '<tr><td>'+element.material_name+'</td><td>'+element.model+'</td><td>'+element.amount+'</td><td><button class="btn btn-success"  onclick="orderMaterial('+element.id+')">Request</button></td></tr>'
                    )
                    })
                },
            error: function(error){
                    console.log(error);
                }
          })
          
          $('.order_material').fadeIn(500);
          $('#search-acc').on('change',function(){
            let index = $(this).val();
            index = index.toUpperCase();
            if(index != '' || index != null){
                $('#list_materials').html('');
                arrAcc.forEach( element => {
                    if( element.material_name.toUpperCase().search(index) != -1 || element.model.toUpperCase().search(index) != -1){
                        $('#list_materials').append(
                            '<tr><td>'+element.material_name+'</td><td>'+element.model+'</td><td>'+element.amount+'</td><td><button class="btn btn-success"  onclick="orderMaterial('+element.id+')">Request</button></td></tr>'
                        )
                        
                    }
                    
                })
            }
            console.log(index)
            
            
        })
      })

    //search-accesory
    
    //view material 
    $('#viewMaterial').click(function(){
        
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/view_material/'+tk_id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer '+tk,
            }
            ,success: function(dt){
                var i = 0;
               $('#list_material_sp').html('');
               dt.data.forEach(element=>{
                   let check_status = element.status;
                   let status ='';
                   if( check_status == '0' || check_status == 0 ){
                        status = `<button class="btn btn-warning" style="padding: 2px;"> Processing</button>`;
                   }else{
                         status = `<button class="btn btn-success" style="padding: 2px;"> Accepted</button>`;
                   }
                $('#list_material_sp').append(
                   '<tr><td>'+parseInt(i+1)+'</td><td>'+element.name+'</td><td>'+element.model+'</td><td>'+element.amount+'</td><td>'+status+'</td></tr>'
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
    
      //auto logout
    setInterval(function(){
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/logout',
            type: 'POST',
            data: {
                'token': localStorage.getItem('token'),
            },success: function(dt){
                console.log('logout');
                window.open('http://123.25.25.219:9021/login/login.html','_self');
            },error: function (err) {
                alert('Có lỗi xảy ra, vui lòng liên hệ kĩ thuật hỗ trợ!');
            }
            });
        }, 1800000);
    
  
    
