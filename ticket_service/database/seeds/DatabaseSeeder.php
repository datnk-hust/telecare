<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->insert(
            [
            'name' => 'Admin',
            'user_id' => 'admin1',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 1,
            ]);
            
        //
        DB::table('provider')->insert(
            [
            'provider_name' => 'CTTBYT1',
            'address' => 'address 1',
            'phone' => '0965338373',
            'email' => 'cttbyt1@gmail.com',
            'note' => '',
            ]);
    }
}
