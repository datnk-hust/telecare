<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; 
use Validator;
use App\Ticket_material;
use App\Ticket;
use App\Material;
use DB;
use Carbon\Carbon;
use App\History;

class TicketMaterial extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ticket_material = Ticket_material::get(); 
        return response()->json(['status' => 200, 'message' => 'show ticket successfully!','data' => $ticket_material], 200);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

     public function order(Request $request, $id)
    {
        //get data
        $tk_id = request('ticket_id');
        $amount = request('amount');
        $note = request('note');
        $ticket = DB::table('ticket')->where('id',$tk_id)->first();
        //save ticket material
        $ticket_material = new Ticket_material;
        $ticket_material->ticket_id = $tk_id;
        $ticket_material->material_id = $id;
        $ticket_material->amount = $amount;
        $ticket_material->supply_date = Carbon::now();
        $ticket_material->note = $note;
        $ticket_material->status = 0;
        $ticket_material->save();
        // //save material
        // $material = Material::find($id);
        // $mName = $material->material_name;
        // $material->used = (int)$material->used + (int)$amount;
        // $material->save();
        //save history ticket
        $his = new History;
        $his->ticket_id = $tk_id;
        $his->content = 'Requested material ';
        $his->time = Carbon::now();
        $his->support_id = Auth::user()->user_id;
        $his->status = 1;
        $his->note = $note;
        $his->save();
         return response()->json(['message'=>'Requested success!'],200);
         //return response()->json(['status' => 200, 'message' => 'show ticket successfully!','data' => $ticket_material], 200);
    }
}
