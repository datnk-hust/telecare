<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use Illuminate\Http\Response;
use App\Http\Requests\RegisterFormRequest;
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Hash;
use App\User; 
use Illuminate\Support\Facades\Auth; 
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use DB;
use Carbon\Carbon;
use App\Ticket;
use Mail;
use App\Jobs\SendEmail;

class UserController extends Controller 
{
    private $user;
    public function __construct(User $user){
        $this->user = $user;
    }
/** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(Request $request){ 
        // if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            
        //     $user = Auth::user(); 
        //     $user_id = $user->user_id;
        //     $totalTK = DB::table('ticket')->where('order_id',$user_id)->get();
        //     $total_ticket = count($totalTK);
        //     $success['role'] = $user->role;
        //     $success['user_id'] = $user_id;
        //     $success['total_ticket'] = $total_ticket;
        //     $success['access_token'] =  $user->createToken('Personal Access Token')->accessToken;
        //     return response()->json(['status' => 200, 'data' => $success], 200); 
        // } 
        // else{ 
        //     return response()->json(['error'=>'Unauthorised'], 401); 
        // } 

        $credentials = $request->only('email', 'password');
        $token = null;
        try {
           if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['invalid_email_or_password'], 422);
           }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
        $user = DB::table('users')->where('email',request('email'))->first();
        $user_status = $user->status;
        if($user_status == 1){
            $user_id = $user->user_id;
            $totalTK = DB::table('ticket')->where('order_id',$user_id)->get();
            $total_ticket = count($totalTK);
            $success['role'] = $user->role;
            $success['user_id'] = $user_id;
            $success['total_ticket'] = $total_ticket;
            $success['access_token'] =  $token;
            $success['name'] = $user->name;
            $success['email'] = $user->email;
            $success['phone'] = $user->phone;
            $success['workplace'] = $user->workplace;
            
            //return response()->json(compact('token','user'));
            return response()->json(['status' => 200, 'data' => $success], 200); 
        }else{
            return response()->json(['Tài khoản chưa được xác thực. Vui lòng liên hệ phòng IT hoặc người quản lý hệ thống.'], 422);
        }
       
    }
/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('MyApp')-> accessToken; 
        $success['name'] =  $user->name;
        return response()->json(['data'=>$success], 200); 
    }
 
    public function signup(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email|unique:users,email', 
            'user_id' => 'unique:users,user_id',
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        //dd($input);
        $input['password'] = Hash::make($input['password']); 
        $user = User::create($input); 
        
        //return response()->json(['data'=>'Đã tạo tài khoản vui lòng kiểm tra email của bạn sau vài phút để xác thực!'], 200); 
        return response()->json(['data'=>$user], 200); 

    }
    // logout
    public function logout(Request $request)
    {
        
        $this->validate($request, ['token' => 'required']);
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json('You have successfully logged out.', Response::HTTP_OK);
        } catch (JWTException $e) {
            return response()->json('Failed to logout, please try again.', Response::HTTP_BAD_REQUEST);
        }
    }


    public function rstPassword(Request $request){
        $validator = Validator::make($request->all(), [  
            'email' => 'required', 
            'password' => 'required', 
            'new_password' => 'required|min:6', 
            'cf_password' => 'required|min:6', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors(), 'errors' => 'Mật khẩu mới tối thiểu 6 kí tự!'], 401);            
        }
        $credentials = $request->only('email', 'password');
        if(Auth::attempt($credentials)){ 
            //dd('abc');
            $user = Auth::user();
            $user->password = Hash::make(request('new_password'));
            $user->save();
            return response()->json(['status'=>'200', 'message' => 'Change successfully!'], 200);
            
        }else{
            return response()->json(['error'=>'401', 'errors' => 'Email or password fails!'], 401);
        }
        // 
        
            
            
    }
    
    /** 
     * get all user api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function index() 
    { 
        $user = User::get(); 
        return response()->json(['status' => 200, 'data' => $user], 200); 
    } 

    // show a user by id
    public function show($id){
        $user = User::find($id);
        if($user){
            return response()->json(["data" => $user], 200);
        }else{
            return response()->json(["error" => "User not found!"], 404);
        }
        
    }
    // add a new user
    public function store(Request $request){
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email|unique:users,email', 
            'password' => 'required|min:6', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors(), 'message' => 'Min length password is 6 characters!'], 401);            
        }
        $input = $request->all(); 
        $input['password'] = Hash::make($input['password']); 
        $user = User::create($input); 
        //$success['token'] =  $user->createToken('MyApp')-> accessToken; 
        $success['name'] =  $user->name;
        return response()->json(['status' => 200,'data'=>$success], 200);
    }
    //get edit user
    public function edit($id)
    {
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(['status' => 404, 'error'=>'Not found user'], 404);
        }else{
            return response()->json(['status' => 200, 'data' => $user], 200);
        }
    }
    /**
     * Update the specified resource in storage. 
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //post edit user
    public function update(Request $request, $id){
        // $validator = Validator::make($request->all(), [ 
        //     'email' => 'email|unique:users,email', 
        //     'password' => 'min:6', 
        //     'c_password' => 'same:password', 
        // ]);
        // if ($validator->fails()) { 
        //     return response()->json(['error'=>$validator->errors()], 401);            
        // }
        //dd($id);
        //dd(request('name'));
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(["error" => "User not found to update"], 404);
        }else{
            $user->update($request->all());
            return response()->json(["status" => 200, "message" => "successfully update!","data" => $user], 200);
        }
    }

    //delete user

     public function destroy($id)
    {
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(["status"=>404, "error"=>"Not found user!"], 404);
        }else{
            $user->delete();
            return response()->json(["status" => 200, "message" => "successfully delete!","data" => $user], 200);
        }
    }
    public function search(Request $request, $id){
       // dd($id);
        $query = request('query');
        //$check = strtolower($query);
        if($id == '0'){
            $User = DB::table('users')->where('user_id','like','%'.$query.'%')
            ->orWhere('name','like','%'.$query.'%')
            ->orWhere('email','like','%'.$query.'%')
            ->orWhere('phone','like','%'.$query.'%')
            ->orWhere('major','like','%'.$query.'%')
            ->orWhere('workplace','like','%'.$query.'%')
            ->get();
        }else{
            $User = DB::table('users')->where('role',$id)
            ->where('user_id','like','%'.$query.'%')
            ->orWhere('name','like','%'.$query.'%')
            ->orWhere('email','like','%'.$query.'%')
            ->orWhere('phone','like','%'.$query.'%')
            ->orWhere('major','like','%'.$query.'%')
            ->orWhere('workplace','like','%'.$query.'%')
            ->get();
       
        }
        
        
        if($User){
            return response()->json(["status" => 200, "message" => "successfully!","data" => $User], 200);
        }else{
            return response()->json(["status"=> 404, "error"=>"Not found User!"], 404);
        }
    }

    public function byStatus(Request $request,$id)
    {
        $ad = DB::table('users')->where('role',$id)->get();
        return response()->json(["status" => $id, "message" => "successfully!","data" => $ad], 200);
    }

     public function workload(Request $request, $id)
    {
        $app = app();
        $date = Carbon::now();
        $now = $date->toDateTimeString();
        $nowf = $date->toDateString().' 00:00:00';
        $month = $date->subMonths(1)->toDateTimeString();
       // dd($month);
        //dd($nowf);
        $arr_ad = [];
        $admin = DB::table('users')->where('role',2)->get();
        if($id == '1'){
            foreach($admin as $ad){
                $start = 0;
                $dipart = 0;
                $cancel = 0;
                $disc = 0;
                $comp = 0;
                $final = 0;
            
                $ticket = DB::table('ticket')->where('engineer_id', $ad->user_id)->where('created_at', '>=', ($date->subWeeks(1))->toDateString() )->get();
                //tinh toan so luong cac  ticket cua 1 admin
                foreach($ticket as $r){
                    if($r->study_status == '4'){
                        $start += 1;
                    }
                    if($r->study_status == '5'){
                        $dipart += 1;
                    }
                    if($r->study_status == '6'){
                        $cancel += 1;
                    }
                    if($r->study_status == '7'){
                        $disc += 1;
                    }
                    if($r->study_status == '8'){
                        $comp += 1;
                    }
                    if($r->study_status == '11'){
                        $final += 1;
                    }
                    
                }
    
                //tao json {admin,started,discountinued,finalize,completed,canceled,diparted}
                $ticket_object = $app->make('stdClass');
                $ticket_object->id = $ad->id;
                $ticket_object->admin = $ad->user_id;
                $ticket_object->name = $ad->name;
                $ticket_object->major = $ad->major;
                $ticket_object->started = $start;
                $ticket_object->discountinued = $disc;
                $ticket_object->finalize = $final;
                $ticket_object->completed = $comp;
                $ticket_object->canceled = $cancel;
                $ticket_object->diparted = $dipart;

                //push obj to arr_ad
                array_push($arr_ad,$ticket_object);
            }
        }
        if($id == '0'){
            foreach($admin as $ad){
                $start = 0;
                $dipart = 0;
                $cancel = 0;
                $disc = 0;
                $comp = 0;
                $final = 0;
            
                $ticket = DB::table('ticket')->where('engineer_id', $ad->user_id)->where('schedule_date','<=', $now )->where('schedule_date','>=',$nowf)->get();
                //dd($ticket);
                //tinh toan so luong cac  ticket cua 1 admin
                foreach($ticket as $r){
                    if($r->study_status == '4'){
                        $start += 1;
                    }
                    if($r->study_status == '5'){
                        $dipart += 1;
                    }
                    if($r->study_status == '6'){
                        $cancel += 1;
                    }
                    if($r->study_status == '7'){
                        $disc += 1;
                    }
                    if($r->study_status == '8'){
                        $comp += 1;
                    }
                    if($r->study_status == '11'){
                        $final += 1;
                    }
                    
                }
    
                //tao json {admin,started,discountinued,finalize,completed,canceled,diparted}
                $ticket_object = $app->make('stdClass');
                $ticket_object->id = $ad->id;
                $ticket_object->admin = $ad->user_id;
                $ticket_object->name = $ad->name;
                $ticket_object->major = $ad->major;
                $ticket_object->started = $start;
                $ticket_object->discountinued = $disc;
                $ticket_object->finalize = $final;
                $ticket_object->completed = $comp;
                $ticket_object->canceled = $cancel;
                $ticket_object->diparted = $dipart;
                
                //push obj to arr_ad
                array_push($arr_ad,$ticket_object);
            }
        }
        if($id == '2'){
            foreach($admin as $ad){
                $start = 0;
                $dipart = 0;
                $cancel = 0;
                $disc = 0;
                $comp = 0;
                $final = 0;
            
                $ticket = DB::table('ticket')->where('engineer_id', $ad->user_id)->where('schedule_date', '>=', $month )->get();
                //dd($ticket);
                //tinh toan so luong cac  ticket cua 1 admin
                foreach($ticket as $r){
                    if($r->study_status == '4'){
                        $start += 1;
                    }
                    if($r->study_status == '5'){
                        $dipart += 1;
                    }
                    if($r->study_status == '6'){
                        $cancel += 1;
                    }
                    if($r->study_status == '7'){
                        $disc += 1;
                    }
                    if($r->study_status == '8'){
                        $comp += 1;
                    }
                    if($r->study_status == '11'){
                        $final += 1;
                    }
                    
                }
    
                //tao json {admin,started,discountinued,finalize,completed,canceled,diparted}
                $ticket_object = $app->make('stdClass');
                $ticket_object->id = $ad->id;
                $ticket_object->admin = $ad->user_id;
                $ticket_object->name = $ad->name;
                $ticket_object->major = $ad->major;
                $ticket_object->started = $start;
                $ticket_object->discountinued = $disc;
                $ticket_object->finalize = $final;
                $ticket_object->completed = $comp;
                $ticket_object->canceled = $cancel;
                $ticket_object->diparted = $dipart;

                //push obj to arr_ad
                array_push($arr_ad,$ticket_object);
            }
        }
        if($id == '3'){
            foreach($admin as $ad){
                $start = 0;
                $dipart = 0;
                $cancel = 0;
                $disc = 0;
                $comp = 0;
                $final = 0;
            
                $ticket = DB::table('ticket')->where('engineer_id', $ad->user_id)->get();
                //dd($ticket);
                //tinh toan so luong cac  ticket cua 1 admin
                foreach($ticket as $r){
                    if($r->study_status == '4'){
                        $start += 1;
                    }
                    if($r->study_status == '5'){
                        $dipart += 1;
                    }
                    if($r->study_status == '6'){
                        $cancel += 1;
                    }
                    if($r->study_status == '7'){
                        $disc += 1;
                    }
                    if($r->study_status == '8'){
                        $comp += 1;
                    }
                    if($r->study_status == '11'){
                        $final += 1;
                    }
                    
                }
    
                //tao json {admin,started,discountinued,finalize,completed,canceled,diparted}
                $ticket_object = $app->make('stdClass');
                $ticket_object->id = $ad->id;
                $ticket_object->admin = $ad->user_id;
                $ticket_object->name = $ad->name;
                $ticket_object->major = $ad->major;
                $ticket_object->started = $start;
                $ticket_object->discountinued = $disc;
                $ticket_object->finalize = $final;
                $ticket_object->completed = $comp;
                $ticket_object->canceled = $cancel;
                $ticket_object->diparted = $dipart;

                //push obj to arr_ad
                array_push($arr_ad,$ticket_object);
            }
        }
        //dd($arr_ad);
    
        return response()->json(["status" => 200,'ticket'=>$ticket,"data" => $arr_ad], 200);
    }

     public function detail_workload($id)
    {
        $admin = User::find($id);
        $ticket = DB::table('ticket')->where('engineer_id',$admin->user_id)->orderBy('id','desc')->get();
        return response()->json(["status" => 200, 'username'=>$admin->name, "data" => $ticket], 200);
    }

    public function showbyUserId($user_id)
    {
        # code...
        $user = DB::table('users')->where('user_id',$user_id)->first();
        return response()->json(['status'=>200, 'data'=>$user], 200);
    }

    public function clientUpdate(Request $request, $user_id){
        # code...
        $user = DB::table('users')->where('user_id',$user_id);
        if(is_null($user)){
            return response()->json(['status' => 404, 'message'=> 'Not found user'], 404);
            
        }else{
            $user->update($request->all());
            //$user->update(['phone' => request('phone'), 'workplace' => request('workplace'), 'major' => request('major')]);
            return response()->json(['status' => 200, 'message' => 'Cập nhật thành công!'], 200);
        }
    }
    public function getEngineer($role)
    {
        $eng = DB::table('users')->where('role',$role)->get();
        return response()->json(['data'=>$eng,'message'=>'Get seccessfully!'], 200);
    }

    public function rstPsw(Request $request){
        $email_check = request('email');
        $phone_check = request('phone');
        //$users = DB::table('users')->where('email',$email_check)->get();
        $user = User::whereEmail($email_check)->first();
        if( $user === null){
            return response()->json(['status'=>404, 'error'=>"Email không tồn tại trong hệ thống"], 404);
        }else{
            $user->update(['is_update' => 0]);
            //send email to user
            Mail::send(
                        'email.sendEmail',
                        ['user' => $user],
                        function ($message) use ($user){
                            $message->from('datnk0844@gmail.com')->to($user->email)->subject("Lấy lại mật khẩu TeleCare");
                        }
                    );
           
            return response()->json(['status'=>200, 'data'=>"Vui lòng kiểm tra email của bạn để cập nhật thông tin mật khẩu."], 200);
        }
    }

    public function changePasswordConfirm(Request $request)
    {
        # code...
        $email = request('email');
        $password = request('password');
        $user = User::where('email',$email)->where('is_update', 0)->first();
        if($user){
            $user->update(['password' => Hash::make($password), 'is_update'=> 1]) ;
            return response()->json(['status'=> 200, 'data'=>'Thay đổi mật khẩu thành công!'], 200);
        }else{
            return response()->json(['status'=> 404, 'error'=> 'Không tìm thấy email người dùng, vui lòng kiểm tra lại!'], 404);
        }
    }
}