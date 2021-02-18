<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\History;
use Illuminate\Support\Facades\Auth; 
use Validator;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $history = History::get(); 
        return response()->json(['status' => 200, 'message' => 'show Historys successfully!','data' => $history], 200);
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
            'ticket_id' => 'required', 
            'support_id' => 'required',  
            'time'      => 'required',
            'content'   => 'required|string',
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $history = History::create($input); 
        $success['ticket_id'] =  $history->ticket_id;
        $success['content'] =  $history->content;
        return response()->json(['status' => 200, 'message' => 'add History successfully!', 'data'=>$success], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $history = History::find($id);
        if(is_null($history)){
            return response()->json(['status' => 404, 'error'=>'Not found History'], 404);
        }else{
            return response()->json(['status' => 200, 'message' => 'show Historys successfully!','data' => $history], 200);
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
        $history = History::find($id);
        if(is_null($history)){
            return response()->json(['status' => 404, 'error'=>'Not found History'], 404);
        }else{
            return response()->json(['status' => 200, 'data' => $history], 200);
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
        $history = History::find($id);
        if(is_null($history)){
            return response()->json(['status' => 404, 'error'=>'Not found History'], 404);
        }
        $history->update($request->all());
        return response()->json(['status' => 200, 'message' => 'update History successfully!', 'data'=>$history], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $history = History::find($id);
        if(is_null($history)){
            return response()->json(["status"=> 404, "error"=>"Not found History!"], 404);
        }else{
            $history->delete();
            return response()->json(["status" => 200, "message" => "successfully delete!","data" => $history], 200);
        }
    }
}
