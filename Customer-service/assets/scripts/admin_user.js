let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    var create_date = year + month  + date;
	var role = 'ADMIN';
	var arrEmail = [];
	var add_role = 1;
	var totalUser = 0;
	var status = 'ALL';
	var tk = localStorage.getItem('token');

	var time = setInterval(function(){
		$.ajax({
			url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/users",
			type: "GET",
			headers: {
				Authorization: "Bearer "+ tk
			},
			success: function(dt){
				var i = 1;
				console.log(dt);
				clearInterval(time);
				$('#_tbody_user').html('');
				
				dt.data.forEach(element => {
					totalUser += 1;
					arrEmail.push(element.email);
					if(element.role == '1'){
						var role = '<div class="btn btn-secondary">Admin</div>';
					}else if(element.role == '3'){
						role = '<div class="btn btn-light">Client</div>';
					}else{
						var role = '<div class="btn btn-primary">Unknow</div>';
					}
					$('#_tbody_user').append(
						'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
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
	$('#ALL').click(function(){
		$.ajax({
			url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/users",
			type: "GET",
			headers: {
				Authorization: "Bearer "+ tk
			},
			success: function(dt){
				var i = 1;
				console.log(dt);
				clearInterval(time);
				$('#_tbody_user').html('');
				dt.data.forEach(element => {
					
					if(element.role == '1'){
						var role = '<div class="btn btn-secondary">Admin</div>';
					}else if(element.role == '3'){
						role = '<div class="btn btn-light">Client</div>';
					}else{
						var role = '<div class="btn btn-primary">Unknow</div>';
					}
					$('#_tbody_user').append(
						'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
						);
					i++;
				});
			},
			error: function(err){
				console.log("Error Server!");
			}
		});
	})
	$('#ADMIN').click(function(){
		$.ajax({
			url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/users",
			type: "GET",
			headers: {
				Authorization: "Bearer "+ tk
			},
			success: function(dt){
				var i = 1;
				$('#_tbody_user').html('');
				dt.data.forEach(element => {
					if(element.role == '1'){
						var role = '<div class="btn btn-secondary">Admin</div>';
						$('#_tbody_user').append(
							'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
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
	$('#ENGINEER').click(function(){
		$.ajax({
			url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/users",
			type: "GET",
			headers: {
				Authorization: "Bearer "+ tk
			},
			success: function(dt){
				var i = 1;
				$('#_tbody_user').html('');
				dt.data.forEach(element => {
					if(element.role == '2'){
						var role = '<div class="btn btn-secondary">Admin</div>';
						$('#_tbody_user').append(
							'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
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

	$('#CLIENT').click(function(){
		$.ajax({
			url: "http://123.25.25.219:8768/ticket_service/public/api/customer_service/users",
			type: "GET",
			headers: {
				Authorization: "Bearer "+ tk
			},
			success: function(dt){
				var i = 1;
				$('#_tbody_user').html('');
				dt.data.forEach(element => {
					if(element.role == '3'){
						var role = '<div class="btn btn-light">Client</div>';
						$('#_tbody_user').append(
							'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
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

	$('#add_user').click(function(){
		$('#add_user_popup').css('display','block');
		$('#edit_user_popup').css('display','none');
	})
	$('#role').on('change',function(){
		add_role = $('#role').val();
	})
	$('#save_add_user').click(function(){
		var id = totalUser+1;
		var user_id = create_date+add_role+id;
		var name = $('#name').val();
		var email = $('#email').val();
		var phone = $('#phone').val();
		var major = $('#major').val();
		var workplace = $('#workplace').val();
		var password = $('#psw').val();
		var password_confirm = $('#psw_confirm').val();
		console.log(email);
		console.log(user_id);
		console.log(name);
		if(arrEmail.includes(email) ){
			alert('Email is used!');
		}else if(email== '' || password == ''){
			alert('Email and password are required!');
		}
		else if( password != password_confirm){
			alert('Password is not same Confirm password, Please check againt!');
		} 
		else{
			$.ajax({
				url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users',
				type: 'POST',
				headers: {
					Authorization: 'Bearer ' + tk
				},
				data: {
					user_id: user_id,
					name: name,
					email: email,
					phone: phone,
					major: major,
					workplace: workplace,
					password: password,
					role: add_role,
					status: '1'
				},
				success: function(dt){
					window.location.reload();
					alert('Create User Successfully !');
				},
				error: function(error){
					alert('Error Server!');
					console.log(error);
				}
			});
		}

	})
	
	$('#close_search').click(function(){
		$('#search_user').val('');
	})

	function detail_user(id){
		console.log(id);
		$('#edit_user_popup').css('display','block');
		$.ajax({
			url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/'+id,
			type: 'GET',
			headers: {
				Authorization: 'Bearer '+ tk,
			},success: function(dt){
				console.log(dt);
				$('#edit_user_name').val(dt.data.name);
				$('#edit_user_email').val(dt.data.email);
				$('#edit_user_phone').val(dt.data.phone);
				$('#edit_user_major').val(dt.data.major);
				$('#edit_user_workplace').val(dt.data.workplace);
				if(dt.data.role == '1'){
					$('#edit_user_role').html('');
					$('#edit_user_role').append(
						'<option value="'+dt.data.role+'">ADMIN</option>'
					);
				}
				if(dt.data.role == '3'){
					$('#edit_user_role').html('');
					$('#edit_user_role').append(
						'<option value="'+dt.data.role+'">CLIENT</option>'
					);
				}
				// console.log(dt.data.image_des);
				// document.getElementById("image_tk").src = dt.data.image_des;
			},error: function(err){
				alert('Error Server!');
				console.log(err);
			}
		})

		$('#update_user').click(function(){
		var edit_name = $('#edit_user_name').val();
		var edit_phone = $('#edit_user_phone').val();
		var edit_major = $('#edit_user_major').val();
		var edit_workplace = $('#edit_user_workplace').val();
		var params = '?name='+edit_name+'&phone='+edit_phone+'&major='+edit_major+'&workplace='+edit_workplace;
		$.ajax({
			url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/'+id+params,
			type: 'PUT',
			headers: {
				Authorization: 'Bearer '+ tk
			},
			success: function(dt){
				alert('Update Successfully!');
				window.location.reload();
			},error: function(err){
				alert('Error Server!');
				console.log(err);
			}

		});
		})
	}
	$('#close_edit').click(function(){
		$('#edit_user_popup').css('display','none');
	})
	$('#close_add').click(function(){
		$('#add_user_popup').css('display','none');
	})

	$('.nav-link').click(function(){
		var status = $(this).attr('id');
		console.log(status);
	})
	$('#search_user').on('change',function(){
		var roleStatus;
        if(status == 'ALL'){
             roleStatus = 0;
        }else if(status == 'ADMIN'){
            roleStatus = 1;
        }else{
            roleStatus = 3;
        }
        var query = $('#search_user').val();
        console.log(roleStatus);
        console.log(query);

        $.ajax({
            url: 'http://123.25.25.219:8768/ticket_service/public/api/customer_service/users/search/'+roleStatus,
            type: 'POST',
            headers: {
                Authorization: 'Bearer ' +tk,
            },
            data:{
                query: query,
            },
            success: function(dt){
                var i = 1;
                console.log(dt);
                $('#_tbody_user').html('');
                if(roleStatus == 0){
                    dt.data.forEach(element => {
                        if(element.role == 1){
                        var role = '<div class="btn btn-secondary">Admin</div>';
                    	}
                    	if(element.role == 3){
                        var role = '<div class="btn btn-light">Client</div>';
                    	}
                    	$('#_tbody_user').append(
						'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
						);
						i++;
                    });
                }else if(roleStatus == 1){
                    var role = '<div class="btn btn-secondary">Admin</div>';
                    dt.data.forEach(element => {
                    $('#_tbody_user').append(
						'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
						);
						i++;
                    });
                }else{
                	var role = '<div class="btn btn-light">Client</div>';
                    dt.data.forEach(element => {
                    $('#_tbody_user').append(
						'<tr><td>'+i+'</td><td>'+element.user_id+'</td><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.phone+'</td><td>'+element.major+'</td><td>'+element.workplace+'</td><td>'+role+'</td><td><a data-toggle="modal" onClick="detail_user(' + element.id + ')" id="'+element.id+'" class="btn btn-success btn-sm user" style="text-decoration: none;color: white;"> Chi tiết </a></td></tr>'
						);
						i++;
                    });
                }
            },
            error: function(error){
     			alert('Error Server!');
                console.log(error);
            }
        })
    })
