<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| 
*/

Route::post('login', 'API\UserController@login')->name('login');
Route::post('register', 'API\UserController@register')->name('register');
Route::post('signup', 'API\UserController@signup')->name('signup');
Route::post('rstPsw', 'API\UserController@rstPsw')->name('rstPsw');
Route::post('changePassword', 'API\UserController@changePasswordConfirm')->name('changePsw');

Route::group(['middleware' => ['jwt.verify']], function(){
    //logout
    Route::post('logout', 'API\UserController@logout')->name('logout');
    Route::prefix('customer_service')->group(function(){

    //users
        Route::prefix('users')->group(function () {
        Route::get('/', 'API\UserController@index')->name('get.all.users');
        Route::get('/{id}', 'API\UserController@show')->name('get.user.byId');
        Route::get('/byUserId/{user_id}', 'API\UserController@showbyUserId')->name('get.user.byUserId');
        Route::get('/status/{id}', 'API\UserController@byStatus')->name('get.user.byStatus');
        Route::post('/search/{id}', 'API\UserController@search')->name('search.user');
        Route::post('/', 'API\UserController@store')->name('add.user');
        Route::get('edit/{id}', 'API\UserController@edit')->name('get.edit.user');
        Route::put('/{id}', 'API\UserController@update')->name('update.user');
        Route::delete('/{id}', 'API\UserController@destroy')->name('delete.user');
        Route::get('/workload/{id}', 'API\UserController@workload')->name('workload.users');
        Route::get('/workload/detail/{id}', 'API\UserController@detail_workload')->name('detail.workload.user');
        Route::post('/rstPassword', 'API\UserController@rstPassword')->name('add.user');
        Route::post('/updateInfor/{user_id}','API\UserController@clientUpdate')->name('updateInfor.client.user');
        Route::get('/engineer/{role}','API\UserController@getEngineer')->name('get.engineer');
    });

    //provider
        Route::prefix('provider')->group(function () {
        Route::get('/', 'API\ProviderController@index')->name('get.all.providers');
        Route::get('/{id}', 'API\ProviderController@show')->name('get.provider.byId');
        Route::post('/', 'API\ProviderController@store')->name('add.provider');
        Route::post('/search', 'API\ProviderController@search')->name('get.search.provider');
        Route::put('/{id}', 'API\ProviderController@update')->name('update.provider');
        Route::delete('/{id}', 'API\ProviderController@destroy')->name('delete.provider');
    });

    //ticket_type
        Route::prefix('ticket_type')->group(function () {
        Route::get('/', 'API\TicketTypeController@index')->name('get.all.ticket_types');
        Route::get('/{id}', 'API\TicketTypeController@show')->name('get.ticket_type.byId');
        Route::post('/', 'API\TicketTypeController@store')->name('add.ticket_type');
        Route::get('edit/{id}', 'API\TicketTypeController@edit')->name('get.edit.ticket_type');
        Route::put('/{id}', 'API\TicketTypeController@update')->name('update.ticket_type');
        Route::delete('/{id}', 'API\TicketTypeController@destroy')->name('delete.ticket_type');
        Route::post('/search', 'API\TicketTypeController@search')->name('get.search.ticket_type');
    });

    //material
        Route::prefix('material')->group(function () {
        Route::get('/', 'API\MaterialController@index')->name('get.all.materials');
        Route::get('/ordered', 'API\MaterialController@getOrdered')->name('get.all.materials.ordered');
        Route::post('/process-order/{id}', 'API\MaterialController@processOrder')->name('process.material.order');
        Route::post('/search', 'API\MaterialController@search')->name('search.materials');
        Route::get('/{id}', 'API\MaterialController@show')->name('get.material.byId');
        Route::post('/', 'API\MaterialController@store')->name('add.material');
        Route::get('edit/{id}', 'API\MaterialController@edit')->name('get.edit.material');
        Route::put('/{id}', 'API\MaterialController@update')->name('update.material');
        Route::delete('/{id}', 'API\MaterialController@destroy')->name('delete.material');
        
    });

    //ticket
        Route::prefix('ticket')->group(function () {
        Route::get('/', 'API\TicketController@index')->name('get.all.tickets');
        Route::get('/{id}', 'API\TicketController@show')->name('get.ticket.byId');
        Route::get('/engineer/{id}', 'API\TicketController@byEngineerId')->name('get.ticket.byEngineerId');
        Route::post('/search/{status}','API\TicketController@search')->name('admin.search.ticket');
        Route::post('/byUser/{id}', 'API\TicketController@byUser')->name('get.ticket.byUser');
        Route::post('/', 'API\TicketController@store')->name('add.ticket');
        Route::put('/{id}', 'API\TicketController@update')->name('update.ticket');
        Route::delete('/{id}', 'API\TicketController@destroy')->name('delete.ticket');
        Route::post('update_status/{id}/{status}', 'API\TicketController@change_status')->name('change.status.ticket');
        Route::post('diparted/{id}','API\TicketController@diparted');
        Route::get('/history/{id}', 'API\TicketController@history')->name('get.history.ticket');
        Route::get('/view_material/{id}','API\TicketController@viewMaterial')->name('get.material');
        Route::post('/delivery/{id}','API\TicketController@deliveryTicket')->name('post.delivery.ticket');
        
    });

    //history
        Route::prefix('history')->group(function () {
        Route::get('/', 'API\HistoryController@index')->name('get.all.historys');
        Route::get('/{id}', 'API\HistoryController@show')->name('get.history.byId');
        Route::post('/', 'API\HistoryController@store')->name('add.history');
        Route::get('edit/{id}', 'API\HistoryController@edit')->name('get.edit.history');
        Route::put('/{id}', 'API\HistoryController@update')->name('update.history');
        Route::delete('/{id}', 'API\HistoryController@destroy')->name('delete.history');
    });

    //ticket_material
        Route::prefix('ticket_material')->group(function () {
        Route::get('/', 'API\TicketMaterial@index');
        Route::get('/{id}', 'API\TicketMaterial@show');
        Route::post('/', 'API\TicketMaterial@store');
        Route::get('edit/{id}', 'API\TicketMaterial@edit');
        Route::put('/{id}', 'API\TicketMaterial@update');
        Route::delete('/{id}', 'API\TicketMaterial@destroy');
        Route::post('/order/{id}','API\TicketMaterial@order');
    });
});
       
});



