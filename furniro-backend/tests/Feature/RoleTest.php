<?php

namespace Tests\Feature;

use App\Models\Role;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * A basic feature test example.
     */
    // public function test_example(): void
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }

    public function test_it_can_fetch_all_roles()
    {
       
        $response = $this->getJson('/api/roles/index');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                    'status',
                     'roles' => [
                         '*' => [
                             'id',
                             'role_name',
                             'role_slug',
                             'created_at',
                             'updated_at'
                         ]
                     ]
                 ]);
                 

    }

    public function test_it_returns_empty_array_when_no_roles_exist()
    {
      
        $response = $this->getJson('/api/roles/index');

     
        $response->assertStatus(200)
                 ->assertJson([
                     'status' => true,
                     'roles' => [] 
                 ]);
    }
}
