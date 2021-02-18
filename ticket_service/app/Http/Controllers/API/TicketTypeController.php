<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Ticket_type;
use Illuminate\Support\Facades\Auth; 
use Validator;
use DB;

class TicketTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $TicketType = Ticket_type::orderBy('id','asc')->get(); 
        return response()->json(['status' => 200, 'message' => 'show TicketTypes successfully!','data' => $TicketType], 200);
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
            'ticket_name' => 'required|string|unique:ticket_type,ticket_name', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        } 
        $input = $request->all(); 
        $TicketType = Ticket_type::create($input); 
        $success['TicketType_name'] =  $TicketType->ticket_name;
        return response()->json(['status' => 200, 'message' => 'add TicketType successfully!', 'data'=>$success], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $TicketType = Ticket_type::find($id);
        if(is_null($TicketType)){
            return response()->json(['status' => 404, 'error'=>'Not found TicketType'], 404);
        }else{
            return response()->json(['status' => 200, 'message' => 'show TicketTypes successfully!','data' => $TicketType], 200);
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
        $TicketType = Ticket_type::find($id);
        if(is_null($TicketType)){
            return response()->json(['status' => 404, 'error'=>'Not found TicketType'], 404);
        }else{
            return response()->json(['status' => 200, 'data' => $TicketType], 200);
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
        $TicketType = Ticket_type::find($id);
        if(is_null($TicketType)){
            return response()->json(['status' => 404, 'error'=>'Not found TicketType'], 404);
        }
        if($request->ticket_name != $TicketType->ticket_name){
            $validator = Validator::make($request->all(), [ 
                'ticket_name' => 'string|unique:ticket_type,ticket_name',   
            ]);
            if ($validator->fails()) { 
                return response()->json(['error'=>$validator->errors()], 401);            
            }
        }
        $TicketType->update($request->all());
        return response()->json(['status' => 200, 'message' => 'update TicketType successfully!', 'data'=>$TicketType], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $TicketType = Ticket_type::find($id);
        if(is_null($TicketType)){
            return response()->json(["status"=> 404, "error"=>"Not found TicketType!"], 404);
        }else{
            $TicketType->delete();
            return response()->json(["status" => 200, "message" => "successfully delete!","data" => $TicketType], 200);
        }
    }

    public function search(Request $request){
        $query = request('query');
        $tkt = DB::table('ticket_type')->where('ticket_name','like','%'.$query.'%')
        ->orWhere('note','like','%'.$query.'%')
        ->orderBy('id','desc')->get();
        return response()->json(['status'=>200, 'data'=>$tkt], 200);
    }
}
