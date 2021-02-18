<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Provider;
use DB;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $provider = Provider::get(); 
        return response()->json(['status' => 200, 'message' => 'show provider successfully!','data' => $provider], 200);
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
            'phone' => 'unique:provider,phone', 
            'email' => 'unique:provider,email',  
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $provider = Provider::create($input); 
        $success['provider_name'] =  $provider->provider_name;
        $success['email'] =  $provider->email;
        return response()->json(['status' => 200, 'message' => 'add provider successfully!', 'data'=>$success], 200);
    }

    /** 
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   

        $provider = Provider::find($id);
        if(is_null($provider)){
            return response()->json(['status' => 404, 'error'=>'Not found provider'], 404);
        }else{
            return response()->json(['status' => 200, 'message' => 'show provider successfully!','data' => $provider], 200);
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
        $provider = Provider::find($id);
        if(is_null($provider)){
            return response()->json(['status' => 404, 'error'=>'Not found provider'], 404);
        }else{
            return response()->json(['status' => 200, 'data' => $provider], 200);
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
        $provider = Provider::find($id);
        if(is_null($provider)){
            return response()->json(['status' => 404, 'error'=>'Not found provider'], 404);
        }
        // if($request->email != $provider->email ){
        //     $validator = Validator::make($request->all(), [ 
        //         'email' => 'email|unique:provider,email',
        //     ]);
        // }
        // if($request->phone != $provider->phone){
        //     $validator = Validator::make($request->all(), [ 
        //         'phone' => 'unique:provider,phone',      
        //     ]);
        // }
        // if ($validator->fails()) { 
        //     return response()->json(['error'=>$validator->errors()], 401);            
        // }
        $provider->update($request->all());
        return response()->json(['status' => 200, 'message' => 'update provider successfully!', 'data'=>$provider], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $provider = Provider::find($id);
        if(is_null($provider)){
            return response()->json(["status"=> 404, "error"=>"Not found provider!"], 404);
        }else{
            $provider->delete();
            return response()->json(["status" => 200, "message" => "successfully delete!","data" => $provider], 200);
        }
    }

    public function search(Request $request){
        $query = request('query');
        $pr = DB::table('provider')->where('provider_name','like','%'.$query.'%')
        ->orWhere('address','like','%'.$query.'%')
        ->orWhere('phone','like','%'.$query.'%')
        ->orWhere('email','like','%'.$query.'%')->orderBy('id','desc')->get();
        return response()->json(['status'=>200, 'data'=>$pr], 200);
    }
}
