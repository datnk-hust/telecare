<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Material;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Provider;
use DB;
use App\Ticket;
use App\Ticket_material;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $material = Material::orderBy('id','desc')->get(); 
        return response()->json(['status' => 200, 'message' => 'show materials successfully!','data' => $material], 200);
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
            'material_id' => 'required|string|unique:material,material_id',  
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $material = Material::create($input); 
        $success['material_id'] =  $material->material_id;
        $success['material_name'] =  $material->material_name;
        return response()->json(['status' => 200, 'message' => 'add material successfully!', 'data'=>$success], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $material = Material::find($id);
       // $pvd = DB::table('provider')->where('id',$material->provider_id)->first();
        $pvd = Provider::find($material->provider_id);

        if(is_null($material)){
            return response()->json(['status' => 404, 'error'=>'Not found material'], 404);
        }else{
            return response()->json(['status' => 200, 'message' => 'show materials successfully!','provider_name' => $pvd->provider_name,'data' => $material], 200);
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
        
        $material = Material::find($id);
        if(is_null($material)){
            return response()->json(['status' => 404, 'error'=>'Not found material'], 404);
        }else{
            return response()->json(['status' => 200, 'data' => $material], 200);
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
        $material = Material::find($id);
        if(is_null($material)){
            return response()->json(['status' => 404, 'error'=>'Not found material'], 404);
        }
        if($request->material_id != $material->material_id){
            $validator = Validator::make($request->all(), [ 
                'material_id' => 'string|unique:material,material_name',   
            ]);
            if ($validator->fails()) { 
                return response()->json(['error'=>$validator->errors()], 401);            
            }
        }
        $material->update($request->all());
        return response()->json(['status' => 200, 'message' => 'update material successfully!', 'data'=>$material], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $material = Material::find($id);
        if(is_null($material)){
            return response()->json(["status"=> 404, "error"=>"Not found material!"], 404);
        }else{
            $material->delete();
            return response()->json(["status" => 200, "message" => "successfully delete!","data" => $material], 200);
        }
    }

    public function search(Request $request){
         $query = request('query');
         $material = DB::table('material')->where('material_id','like','%'.$query.'%')
         ->orWhere('material_name','like','%'.$query.'%')
         ->orWhere('model','like','%'.$query.'%')
         ->orWhere('note','like','%'.$query.'%')
         ->orWhere('import_date','like','%'.$query.'%')
         ->orderBy('id','desc')->get();
         return response()->json(["status" => 200, "message" => "successfully delete!","data" => $material], 200);
     }
    
      public function getOrdered()
     {
         # code...
        $odered = DB::table('ticket_material')->where('status',0)->orderBy('id','desc')->get();
        $dt = [];
        $app = app();
        if(count($odered) >0){
            foreach($odered as $r){
                //make obj
                $material_object = $app->make('stdClass');
                $material = Material::find($r->material_id);
                $ticket = Ticket::find($r->ticket_id);
                
                $material_object->id = $r->id;
                 $material_object->ticket_id = $ticket->ticket_id;
                 $material_object->ticket_title = $ticket->ticket_title;
                 $material_object->schedule_time = $ticket->schedule_date;
                 $material_object->material_name = $material->material_name;
                 $material_object->material_model = $material->model;
                 $material_object->ordered_time = $r->supply_date;
                 $material_object->amount_ordered = $r->amount;
                 $material_object->amount_total = $material->amount;
                 //push obj to arr
                 array_push($dt,$material_object);         
             }
        }
        
        return response()->json(["status" => 200,"data" => $dt], 200);
        
    }
    public function processOrder(Request $request, $id)
    {
        # code...
        $order = Ticket_material::find($id);
        $check = request('status');
        if($check == 0){
            $order->status = 2;
            $order->approver = request('userId');
        }else{
            $order->status = 1;
            $order->approver = request('userId');
        }
        $order->save();
        return response()->json(["status" => 200,"message"=>"success"], 200);
        
    }
}
