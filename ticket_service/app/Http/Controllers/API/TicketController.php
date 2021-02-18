<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Ticket;
use DB;
use App\History;
use App\User;
use Carbon\Carbon;
use App\Material;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ticket = Ticket::orderBy('id','desc')->get(); 
        return response()->json(['status' => 200, 'message' => 'show ticket successfully!','data' => $ticket], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [ 
            'ticket_id' => 'required|unique:ticket,ticket_id', 
            'description' => 'required|string',  
        ]); 
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $ticket = Ticket::create($input); 
        //history
        $addTk = new History;
        $addTk ->ticket_id = $ticket->id;
        $addTk->content = 'Create ticket successfully';
        $addTk->time = $ticket->created_at;
        $addTk->status = 1;
        $addTk->support_id = $ticket->order_id;
        $addTk->save();
        //responses
        $tks = DB::table('ticket')->where('order_id',$ticket->order_id)->get();
        $success['ticket_id'] =  $ticket->ticket_id;
        $success['ticket_title'] =  $ticket->ticket_title;
        $success['ticket_type_id'] =  $ticket->ticket_type_id;
        $success['schedule_date'] =  $ticket->schedule_date;
        $success['order_id'] =  $ticket->order_id;
        $success['total_ticket'] =  count($tks);
        return response()->json(['status' => 200, 'message' => 'add ticket successfully!', 'data'=>$success], 200);
        //return response()->json(['status'=>200, 'data'=>[]],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['status' => 404, 'error'=>'Not found ticket'], 404);
        }else{
            return response()->json(['status' => 200, 'message' => 'show ticket successfully!','data' => $ticket], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['status' => 404, 'error'=>'Not found ticket'], 404);
        }else{
            return response()->json(['status' => 200, 'data' => $ticket], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['status' => 404, 'error'=>'Not found Ticket'], 404);
        }
        $ticket->update($request->all());
        return response()->json(['status' => 200, 'message' => 'update Ticket successfully!', 'data'=>$ticket], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(["status"=> 404, "error"=>"Not found Ticket!"], 404);
        }else{
            $ticket->delete();
            return response()->json(["status" => 200, "message" => "successfully delete!","data" => $ticket], 200);
        }
    }
    public function byUser(Request $request, $id){
        
        $ticketByUser = DB::table('ticket')->where('order_id',$id)->orderBy('id','desc')->get();
        $query = request('query');
        $status = strtolower($query);
        if($query){
            if($status == 'scheduled'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
           }elseif($status == 'ready'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
           }elseif($status == 'started'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
           }elseif($status == 'departed'){
            $ticketByUser = $ticketByUser->where('study_status', 1);
            }elseif($status == 'canceled'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
            }elseif($status == 'discountinued'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
            }elseif($status == 'completed'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
            }elseif($status == 'dictate'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
            }elseif($status == 'transcript'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
            }elseif($status == 'finalize'){
                $ticketByUser = $ticketByUser->where('study_status', 1);
            }else{
                $ticketByUser = DB::table('ticket')->where('order_id',$id)->where('ticket_type_id','like','%'.$query.'%')
                ->orWhere('ticket_type_id','like','%'.$query.'%')
                ->orWhere('ticket_title','like','%'.$query.'%')
                ->orWhere('schedule_date','like','%'.$query.'%')->orderBy('id','desc')->get();
            }
        }else{
            $ticketByUser = DB::table('ticket')->where('order_id',$id)->orderBy('id','desc')->get();
        }
      
        
        if($ticketByUser){
            return response()->json(["status" => 200, "message" => "successfully!","data" => $ticketByUser], 200);
        }else{
            return response()->json(["status"=> 404, "error"=>"Not found Ticket!"], 404);
        }
    }

    public function search(Request $request, $status){
        $query = request('query');
        if($status == 0 ){
            $ticket = DB::table('ticket')->where('ticket_type_id','like','%'.$query.'%')
            ->orWhere('ticket_id','like','%'.$query.'%')
        ->orWhere('order_workplace','like','%'.$query.'%')
        ->orWhere('ticket_title','like','%'.$query.'%')
        ->orWhere('schedule_date','like','%'.$query.'%')->orderBy('id','desc')->get();
        }else{
            $ticket = DB::table('ticket')->where('study_status', $status)->where('ticket_type_id','like','%'.$query.'%')
        ->orWhere('ticket_type_id','like','%'.$query.'%')
        ->orWhere('order_workplace','like','%'.$query.'%')
        ->orWhere('ticket_title','like','%'.$query.'%')
        ->orWhere('schedule_date','like','%'.$query.'%')->orderBy('id','desc')->get();
        }
        
        return response()->json(["status" => 200, "message" => "successfully!","data" => $ticket], 200);
        

    }

    public function change_status(Request $request, $id, $status){
        $ticket = Ticket::find($id);
        $stt_now = $ticket->study_status;
        
        if($status == '1'){
            $ticket->study_status = 3;
            
            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Schedule to Ready';
            $his->save();
            
        }
        if($status == '3'){
            $ticket->study_status = 4;
            $ticket->engineer_id = Auth::user()->user_id;

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Ready to Started ';
            $his->save();
        }

        if($status == '4'){
            $ticket->study_status = 8;
            $ticket->study_time = Carbon::now();
            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Started to Completed ';
            $his->save();
        }

        if($status == '5'){
            $ticket->reason =request('because');
            $ticket->study_status = 5;

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Diparted ticket';
            $his->note = request('because');
            $his->save();
        }
        if($status == '6'){
            $ticket->reason =request('because');
            $ticket->study_status = 6;

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Canceled ticket';
            $his->note = request('because');
            $his->save();
        }
        if($status == '7' && $stt_now == '4'){
            $ticket->advice = request('because');
            $ticket->study_status = 7;

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Discountinued ticket';
            $his->note = request('because');
            $his->save();
        }
        if($status == '7' && $stt_now == '7'){
            $ticket->study_status = 8;

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Discountinued to Completed';
            $his->save();
        }
        if($status == '8'){
            $ticket->study_status = 9;
            $ticket->observation_time = Carbon::now();
            $ticket->advice = request('advice'); //note = reason in db
            $ticket->reason = request('reason');
            $ticket->solution = request('solution');
            $ticket->image_obs = request('image_obs');

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Completed to Dictate';
            $his->save();
            
        }
        if($status == '9' && strlen(request('solution')) > 0){
            $ticket->study_status = 10;
            $ticket->advice = request('advice'); //note = reason in db
            $ticket->reason = request('reason');
            $ticket->solution = request('solution');
            $ticket->image_obs = request('image_obs');

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Dictate to Transcript';
            $his->save();
            
        }
        if($status == '10' && strlen(request('solution')) > 0){
            $ticket->study_status = 11;
            $ticket->advice = request('advice'); //note = reason in db
            $ticket->reason = request('reason');
            $ticket->solution = request('solution');
            $ticket->image_obs = request('image_obs');
            $ticket->discharge_time = Carbon::now();

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Update ticket status  from Transcript to Finalize';
            $his->save();
        }
        if($status == '11' && strlen(request('because')) > 0){
            $ticket->study_status = 9;
            

            $his = new History;
            $his->ticket_id = $id;
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Cancel report ticket';
            $his->note = request('because');
            $his->save();

        }
        
        
        $ticket->save();
        return response()->json(['status'=>200, 'message'=>'Update status successfully!', 'data' => $ticket], 200);
    }

    

    public function history($id)
    {   $ticket = Ticket::find($id);
        $ID = $ticket->ticket_id;
        $history = DB::table('history')->where('ticket_id',$id)->get();
        return response()->json(["status" => 200, "ticket_id" => $ID ,"data" => $history], 200);
    }

    public function viewMaterial(Request $request, $id)
    {
        //dd($id);
        $mt = DB::table('ticket_material')->where('ticket_id',$id)->get();
        //dd(count($mt));
        $dt = [];
        $app = app();
        if(count($mt) >0){
            foreach($mt as $r){
                //make obj
                $material_object = $app->make('stdClass');
                 $material = Material::find($r->material_id);

                 $material_object->id = $material->material_id;
                 $material_object->name = $material->material_name;
                 $material_object->model = $material->model;
                 $material_object->amount = $r->amount;
                 $material_object->supply_date = $r->supply_date;
                 $material_object->note = $r->note;
                 $material_object->status = $r->status;
                 //push obj to arr
                 array_push($dt,$material_object);         
             }
        }
        
        return response()->json(["status" => 200,"data" => $dt], 200);
        
        
        // return response()->json(["status" => 200,"data" => $mt], 200);
    }
    public function deliveryTicket(Request $request, $id)
    {
        # code...
        $enginerr = User::find($id);
        $arr_ticket = request('delivered_ticket');
        
        for($i = 2; $i< count($arr_ticket); $i++){
            $ticket = Ticket::find((int)$arr_ticket[$i]);
            $ticket->engineer_id = $enginerr->user_id;
            $ticket->study_status = 4;
            $ticket->effective_time = Carbon::now();
            $ticket->save();

            $his = new History;
            $his->ticket_id = (int)$arr_ticket[$i];
            $his->status = 1;
            $his->support_id = Auth::user()->user_id;
            $his->time = Carbon::now();
            $his->content = 'Delivered ticket successfully for UID '.$enginerr->user_id;
            $his->note = '';
            $his->save();
        }
        return response()->json(['message' => 'Delivered successfully!','data' => $arr_ticket], 200);
    }

    public function byEngineerId(Request $request, $id)
    {
        # code...
        $ticket_by_Engineers = DB::table('ticket')->where('engineer_id',$id)->orderBy('id','desc')->get();
        return response()->json([
            'status' => 200,
            'message'=> 'Get successfully!',
            'data' => $ticket_by_Engineers
        ],200);
    }
}
