<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Store;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RedirectController extends Controller
{
    public function redirect_to_dashboard()
    {
        $user = Auth::user()?->load("role");

        switch ($user->role) {
            case "vendor": 
                return redirect()->route('vendor.stores.page');
                break;

            case "user":
                return Inertia::render('index');
                break;

            case "admin": 
                $users  = User::all();
                $stores = Store::all();
                $orders = Order::all();
                return Inertia::render('dashboard', [
                    'users'  => $users,
                    'stores' => $stores,
                    'orders' => $orders,
                ]);
                break;

            default:
                return redirect("/");
        }
    }
}
