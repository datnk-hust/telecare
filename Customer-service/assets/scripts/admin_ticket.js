  //var status_choose = localStorage.getItem('selected');
  var tk = localStorage.getItem('token');
  var role = localStorage.getItem('role');
  var check_engineer;
  var time = setInterval(function(){
      var selected = '#' +localStorage.getItem('selected');
      
      var check_select = localStorage.getItem('selected');
      if(selected == '#null'){
          selected = '#ALL';
          check_select = 'ALL';
          console.log(selected);
      }
      
      if(check_select == 'SCHEDULED'){
          var check_status = '1';
      }
      if(check_select == 'READY'){
          var check_status = '3';
      }
      if(check_select == 'STARTED'){
          var check_status = '4';
      }
      if(check_select == 'DIPARTED'){
          var check_status = '5';
      }
      if(check_select == 'CANCELED'){
          var check_status = '6';
      }
      if(check_select == 'DISCOUNTINUED'){
          var check_status = '7';
      }
      if(check_select == 'COMPLETED'){
          var check_status = '8';
      }
      if(check_select == 'DICTATE'){
          var check_status = '9';
      }
      if(check_select == 'TRANSCRIPT'){
          var check_status = '10';
      }
      if(check_select == 'FINALIZE'){
          var check_status = '11';
      }
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              //localStorage.setItem('selected','ALL');
              $(selected).attr('class','nav-link active');
              
              var i = 0;
              clearInterval(time);
          if(check_select == 'ALL'){
                $('#_thead_ticket').html('');
                $('#_thead_ticket').append(
                    '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th>Status</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '11'){
                      var status = '<div class="btn btn-secondary">Finalize</div>';
                  }else if(element.study_status == '3'){
                      var status = '<div class="btn btn-light">Ready</div>';
                  }else if(element.study_status == '4'){
                      var status = '<div class="btn btn-info">Started</div>';
                  }else if(element.study_status == '5'){
                      var status = '<div class="btn btn-dark">Diparted</div>';
                  }else if(element.study_status == '6'){
                      var status = '<div class="btn btn-danger">Canceled</div>';
                  }else if(element.study_status == '7'){
                      var status = '<div class="btn btn-warning"> Discountinued</div>';
                  }else if(element.study_status == '8'){
                      var status = '<div class="btn btn-success">Completed</div>';
                  }else if(element.study_status == '9'){
                      var status = '<div class="btn btn-focus">Dictate</div>';
                  }else if(element.study_status == '10'){
                      var status = '<div class="btn btn-alternate">Transcript</div>';
                  }else{
                      var status = '<div class="btn btn-primary">Scheduled</div>';
                  }
                  if(element.study_status == '1'){
                    $('#_tbody_ticket').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;" title="Detail"> Detail </a><input type="checkbox" class="check_delivery" name="check_delivery[]" value="'+element.id+'" onchange="checkbox()" style="margin-left:3px;font-size: 15px;"/></td></tr>'
                        );
                    i++;
                  }else{
                    $('#_tbody_ticket').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;" title="Detail"> Detail </a></td></tr>'
                        );
                    i++;
                  }
               
              });
          }else if(check_select == 'SCHEDULED'){
            $('#_thead_ticket').html('');
            $('#_thead_ticket').append(
                '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                );
            $('#_tbody_ticket').html('');
            dt.data.forEach(element => {
                if(element.study_status == check_status){
                $('#_tbody_ticket').append(
                    '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a><input type="checkbox" class="check_delivery" name="check_delivery[]" value="'+element.id+'" onchange="checkbox()" style="margin-left:3px;font-size: 15px;"/></td></tr>'
                    );
                i++;
                }
            });

          }
          else{
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == check_status){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              
          }
          $('.total_tk').html(i);

      },
          error: function(err){
              window.open('http://123.25.25.219:9021/login/login.html','_self');
              console.log("Error Server!");
          }
      });
  }, 1000);

  $('#ALL').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              $('.total_tk').html(dt.data.length);
              localStorage.setItem('selected','ALL');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              console.log(dt);
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%" >Hệ thống</th><th>Đơn vị</th><th>Status</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '11'){
                      var status = '<div class="btn btn-secondary">Finalize</div>';
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
                      var status = '<div class="btn btn-primary">Scheduled</div>';
                  }
                if(element.study_status == '1')  {
                    $('#_tbody_ticket').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a><input type="checkbox" class="check_delivery" name="check_delivery[]" value="'+element.id+'" onchange="checkbox()" style="margin-left:3px;font-size: 15px;"/></td></tr>'
                        );
                    i++;
                }else{
                    $('#_tbody_ticket').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                        );
                    i++;
                }
                
              });
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })

  $('#SCHEDULED').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              
              localStorage.setItem('selected','SCHEDULED');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '1'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a><input type="checkbox" class="check_delivery" name="check_delivery[]" onchange="checkbox()" value="'+element.id+'" style="margin-left:3px;font-size: 15px;"/></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  
    })
  $('#READY').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','READY');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '3'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#STARTED').click(function(){
      
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','STARTED');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '4'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#DIPARTED').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','DIPARTED');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '5'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#CANCELED').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','CANCELED');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '6'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }else{
                      $('#_tbody_ticket').html('');
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#DISCOUNTINUED').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','DISCOUNTINUED');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '7'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#COMPLETED').click(function(){
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','COMPLETED');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '8'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#DICTATE').click(function(){
      status_choose = 'DICTATE';
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','DICTATE');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '9'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#TRANSCRIPT').click(function(){
      status_choose = 'TRANSCRIPT';
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','TRANSCRIPT');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '10'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  $('#FINALIZE').click(function(){
      status_choose = 'FINALIZE';
      $.ajax({
          url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket",
          type: "GET",
          headers: {
              Authorization: "Bearer "+ tk
          },
          success: function(dt){
              localStorage.setItem('selected','FINALIZE');
              var selected = '#' +localStorage.getItem('selected');
              $(selected).attr('class','nav-link active');
              var i = 0;
              
              $('#_thead_ticket').html('');
              $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th width="7%">Action</th></tr>'
                  );
              $('#_tbody_ticket').html('');
              dt.data.forEach(element => {
                  if(element.study_status == '11'){
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  }
              });
              $('.total_tk').html(i);
          },
          error: function(err){
          console.log("Error Server!");
          }
      });
  })
  

$('#search_ticket').on('change',function(){
      var studyStatus;
      var slt = localStorage.getItem('selected');
      if(status == 'ALL'){
           studyStatus = 0;
      }else if(status == 'SCHEDULED'){
          studyStatus = 1;
      }else if(status == 'READY'){
          studyStatus = 3;
      }else if(status == 'STARTED'){
          studyStatus = 4;
      }else if(status == 'DIPARTED'){
          studyStatus = 5;
      }else if(status == 'CANCELED'){
          studyStatus = 6;
      }else if(status == 'DISCOUNTINUED'){
          studyStatus = 7;
      }else if(status == 'COMPLETED'){
          studyStatus = 8;
      }else if(status == 'DICTATE'){
          studyStatus = 9;
      }else if(status == 'TRANSCRIPT'){
          studyStatus = 10;
      }else{
          studyStatus = 11;
      }
      var query = $('#search_ticket').val();
      console.log(studyStatus);
      console.log(query);

      $.ajax({
          url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/search/'+studyStatus,
          type: 'POST',
          headers: {
              Authorization: 'Bearer ' +tk,
          },
          data:{
              query: query,
              stt: slt,
          },
          success: function(dt){
              var i = 0;
              console.log(dt);
              if(studyStatus == 0){
                  $('#_thead_ticket').html('');
                  $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th>Status</th><th width="7%">Action</th></tr>'
                  );
                  $('#_tbody_ticket').html('');
                  dt.data.forEach(element => {
                      if(element.study_status == 11){
                      var status = '<div class="btn btn-secondary">Finalize</div>';
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
                      var status = '<div class="btn btn-alt">Dictate</div>';
                  }else if(element.study_status == '10'){
                      var status = '<div class="btn btn-alt">Transcript</div>';
                  }else{
                      var status = '<div class="btn btn-primary">Scheduled</div>';
                  }

                  if(element.study_status == '1') {
                    $('#_tbody_ticket').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.order_workplace+'</td><td>'+element.ticket_type_id+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a><input type="checkbox" class="check_delivery" name="check_delivery[]" onchange="checkbox()" value="'+element.id+'" style="margin-left:3px;font-size: 15px;"/></td></tr>'
                        );
                    i++;
                  }else{
                    $('#_tbody_ticket').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.order_workplace+'</td><td>'+element.ticket_type_id+'</td><td>'+status+'</td><td><a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                        );
                    i++;
                  }
                  
                });
              }else{
                  $('#_thead_ticket').html('');
                  $('#_thead_ticket').append(
                  '<tr><th>#</th><th>Chủ đề</th><th>Ngày tạo</th><th width="10%">Hệ thống</th><th >Đơn vị</th><th>Status</th></th><th width="7%">Action</th></tr>'
                  );
                  $('#_tbody_ticket').html('');
                  dt.data.forEach(element => {
                  $('#_tbody_ticket').append(
                      '<tr><td>'+parseInt(i+1)+'</td><td>'+element.ticket_title+'</td><td>'+element.schedule_date+'</td><td>'+element.ticket_type_id+'</td><td>'+element.order_workplace+'</td><td>'+status+'<a data-toggle="modal" onClick="detail_ticket(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm ticket" style="text-decoration: none;color: white;"> Detail </a></td></tr>'
                      );
                  i++;
                  });
              }
              $('.total_tk').html(i);
          },
          error: function(error){
              console.log(error);
          }
      })
})
$('#close_search').click(function(){
      $('#search_ticket').val('');
})



function detail_ticket(id){
  console.log(id);
  $('#show_ticket').css('display','block');
  $.ajax({
      url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/'+id,
      type: 'GET',
      headers: {
          Authorization: 'Bearer '+ tk,
      },success: function(dt){

          $('.reporting').attr('disabled',true);
          var ID = dt.data.study_status+'-'+id;
        //   if(parseInt(dt.data.study_status) >= 4 && parseInt(dt.data.study_status) <= 10){
        //       $('.supply_materials').css('display','block');
        //       $('.view_material').css('display','block');
        //   }else{
        //       $('.supply_materials').css('display','none');
        //       $('.view_material').css('display','none');
        //   }
        //   if(dt.data.study_status == '4'){
        //       $('.group_report').css('display','block');
        //       $('#diparted_stt').attr('data-ticketid',id);
        //       $('#canceled_stt').attr('data-ticketid',id);
        //       $('#discountinued_stt').attr('data-ticketid',id);
        //   }else{
        //       $('.group_report').css('display','none');
        //   }
          if(dt.data.study_status == '9'){
              $('.reporting').attr('disabled',false);
              $('#saveTicket').css('display','block');
              $('#saveTicket').attr('data-ticketid',id);
          }else{
               $('#saveTicket').css('display','none');
               
          }
          if(dt.data.study_status == '10'){
              $('.reporting').attr('disabled',false);
              $('#saveTicket').attr('data-ticketid',id);
              $('#saveTicket').css('display','block');
              $('#finalizeTicket').css('display','block');
              $('#finalizeTicket').attr('data-ticketid',id);
          }else{
              $('#saveTicket').css('display','none');
              $('#finalizeTicket').css('display','none');
          }
          if(dt.data.study_status == '11'){
                $('.view_material').css('display','block');
              $('#cancelReportTicket').css('display','block');
              $('#cancelReportTicket').attr('data-ticketid',id);
              $('#cancelReportTicket').attr('data-userid',dt.data.engineer_id);
          }else{
              $('#cancelReportTicket').css('display','none');
              $('.view_material').css('display','none');
          }
          $('#order_date').val(dt.data.schedule_date);
          if(parseInt(dt.data.study_status) == 11 ){
              $('#result_date').val(dt.data.observation_time);
              $('#final_time').val(dt.data.discharge_time);
          }
          
          $('#delivery_time').val(dt.data.effective_time);
          $('#study_time').val(dt.data.study_time);
          $('#order_tk').val(dt.data.order_name);
          $('#description_tk').val(dt.data.description);
          $('#order_phone').val(dt.data.order_phone);
          $('#reason_tk').val(dt.data.advice);
          $('#solution_tk').val(dt.data.solution);
          $('.update_status').attr('id',ID);
          $('.supply_materials').attr('data-tkid',ID);
          $('.view_material').attr('data-id',ID);
          $('#note_tk').val(dt.data.note);
          $('#order_workplace_tk').val(dt.data.order_workplace);
          $('#title_tk').val(dt.data.ticket_title);
          $('#advice_tk').val(dt.data.advice);
          $('#img_result_tk').attr('src', dt.data.img_obs);
          
          document.getElementById("image_tk").src = dt.data.image_des;
      },error: function(err){
          alert('Có lỗi xảy ra.');
      }
  })
 }
$('#close_ticket').click(function(){
  $('#show_ticket').css('display','none');
  })
$('.update_status').click(function(){
  var str_id = ($(this).attr('id'));
  var index = str_id.indexOf("-");
  if(index == 1){
      var status = str_id.substring(0,1);
      var id = str_id.substring(2,str_id.length);
  }else{
      var status = str_id.substring(0,2);
      var id = str_id.substring(3,str_id.length);
  }
  console.log(str_id.length);
  console.log(id);
  console.log(status);
  if(status != '9' || status != '10'||status != '11'){
      $.ajax({
      url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/'+status,
      type: 'POST',
      headers: {
          Authorization: 'Bearer ' + tk,
      },
      success: function(dt){
          console.log(dt);
          window.location.reload();
      },
      error: function(error){
          console.log(error);
      }

  })

  }
 
})

$('#reason_tk').on('focus',function(){
  $('#saveTicket').css('display','block');
})
$('#solution_tk').on('focus',function(){
  $('#saveTicket').css('display','block');
})
$('#diparted_stt').click(function(){
  alert('Be careful! This will not be able to complete the ticket. Do you want to continue DIPARTED? ');
  var because = prompt("Please enter some reason why departing ticket!", "");
  var id = $(this).attr('data-ticketid');
  console.log(because);
  if(because == "" || because == null || because == undefined){
      console.log('cancel');
      window.location.reload();
  }else{
      
      $.ajax({
          url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/5',
          type: 'POST',
          headers: {
              Authorization: 'Bearer '+tk,
          },
          data:{
              because: because,
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

$('#canceled_stt').click(function(){
  alert('Be careful! This will not be able to complete the ticket. Do you want to continue CANCELED? ');
  var because = prompt("Please enter some reason why canceling ticket!", "");
  var id = $(this).attr('data-ticketid');
  if(because == "" || because == null || because == undefined){
      window.location.reload();
  }else{
      
      $.ajax({
          url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/6',
          type: 'POST',
          headers: {
              Authorization: 'Bearer '+tk,
          },
          data:{
              because: because,
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

$('#discountinued_stt').click(function(){
  alert('Be careful! This will not be able to complete the ticket. Do you want to continue DISCOUNTINUED? ');
  var because = prompt("Please enter some reason why discountinueing ticket!", "");
  var id = $(this).attr('data-ticketid');
  if(because == "" || because == null || because == undefined){
      window.location.reload();
  }else{
      $.ajax({
          url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/7',
          type: 'POST',
          headers: {
              Authorization: 'Bearer '+tk,
          },
          data:{
              because: because,
          },
          success: function(dt){

              window.location.reload();
              console.log('ok');
              console.log(dt.data);
          },
          error: function(error){
              console.log(error);
          }
      });
  }
})

$('#saveTicket').click(function(){
  var id = $(this).attr('data-ticketid');
  $.ajax({
      url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/9',
      type: 'POST',
      headers: {
          Authorization: 'Bearer ' + tk,
      },
      data: {
          reason: $('#reason_tk').val(),
          solution: $('#solution_tk').val(),
          engineer_id: localStorage.getItem('user_id'),
      
      },
      success: function(dt){
          window.location.reload();
      },
      error: function(error){
          console.log(error);
      }

  });
})

$('#finalizeTicket').click(function(){
  var id = $(this).attr('data-ticketid');
  $.ajax({
      url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/10',
      type: 'POST',
      headers: {
          Authorization: 'Bearer ' + tk,
      },
      data: {
          reason: $('#reason_tk').val(),
          solution: $('#solution_tk').val(),
          engineer_id: localStorage.getItem('user_id'),
         
      },
      success: function(dt){
          window.location.reload();
      },
      error: function(error){
          console.log(error);
      }

  });
})

$('#cancelReportTicket').click(function(){
    if(localStorage.getItem('user_id') != $(this).attr('data-userid')){
        alert("You are not responsible for this report, so you do not permission to cancel report!");
    }else{
        var id = $(this).attr('data-ticketid');
  alert('Be careful! This will not be able to complete the ticket. Do you want to countinue CANCEL REPORT? ');
  var because = prompt("Please enter some reason why canceling report ticket!", "");
  while( because == ''){
      because = prompt("Please enter some reason why canceling report ticket!", "");
  }

  if(because == '' || because == 'null' || because == null ){
     console.log('error syntax');
  }else{
      $.ajax({
      url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/update_status/'+id+'/11',
      type: 'POST',
      headers: {
          Authorization: 'Bearer '+tk,
      },
      data: {
          because: because,
      },success: function(dt){
          console.log(because);
         window.location.reload();
      },
      error: function(error){
          console.log(error);
      }

      });
  }
    }
  
  
})

$('.supply_materials').click(function(){
  var str_id = ($(this).attr('data-tkid'));
  var index = str_id.indexOf("-");
  if(index == 1){
      var status = str_id.substring(0,1);
      var id = str_id.substring(2,str_id.length);
  }else{
      var status = str_id.substring(0,2);
      var id = str_id.substring(3,str_id.length);
  }
  localStorage.setItem('tken_id',id);
})

$('.view_material').click(function(){
  var str_id = ($(this).attr('data-id'));
  //console.log(str_id);
  var index = str_id.indexOf("-");
  if(index == 1){
      var status = str_id.substring(0,1);
      var id = str_id.substring(2,str_id.length);
  }else{
      var status = str_id.substring(0,2);
      var id = str_id.substring(3,str_id.length);
  }
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
$('.close_box').click(function(){
  $('#material_supplied').css('display','none');
  $('#select_engineer').css('display','none');
})

function checkbox(){
    let check_box = $('input[type="checkbox"]:checked').map(function() {
        return $(this).val();
      }).get();
      if(check_box.length > 2){
            $('#delivery_ticket').css('opacity',1);
      }else{
            $('#delivery_ticket').css('opacity',0.7);
      }
    
}

  $('#delivery_ticket').click(function(){
    //check_engineer = [];
    check_engineer = $('input[type="checkbox"]:checked').map(function() {
        return $(this).val();
      }).get();
      if(check_engineer.length > 2 ){
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/engineer/'+'2',
            type: 'GET',
            headers: {
                Authorization: 'Bearer '+tk, 
            },success: function(dt){
                console.log(dt);
                var i = 0;
                $('#list_engineer').html('');
                dt.data.forEach(element=>{
                    $('#list_engineer').append(
                        '<tr><td>'+parseInt(i+1)+'</td><td>'+element.name+'</td><td>'+element.major+'</td><td><a data-toggle="modal" onClick="confirmEngineer(' + element.id + ')" id="'+element.id+'" class="btn btn-primary btn-sm " style="text-decoration: none;color: white;"> Selected </a></td></tr>'
                    );
                    i++;
                })
                $('#select_engineer').css('display', 'block');
            },error: function(err){
                console.log(err);
            }
          })
         
      }else{
          alert("Please check on ticket you want to delivery!");
      }
     
    })

    function confirmEngineer(id){
        check_engineer = $('input[type="checkbox"]:checked').map(function() {
          return $(this).val();
        }).get();
        console.log(check_engineer);
        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/ticket/delivery/'+id,
            type: 'POST',
            headers: {
                Authorization: 'Bearer '+tk,
            },
            data: {
                delivered_ticket: check_engineer,
            },success: function(dt){
                alert('Delivery successfully!');
                window.location.reload();
            },error: function(err){
                console.log(err);
            }
        })
       
    }