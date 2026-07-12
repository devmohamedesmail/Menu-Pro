<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Store;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function __construct(protected OrderService $orderService) {}
    public function createOrder(StoreOrderRequest $request)
    {
        $this->orderService->CreateNewOrder($request);
        return redirect()->back();
    }


    public function updateOrderStatus(Request $request, $id)
    {

        $user  = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        if (! $store) {
            return back()->withErrors(['error' => 'Store not found']);
        }
        $order     = $store->orders()->findOrFail($id);
        $validated = $request->validate([
            'status' => 'required|in:pending,completed,cancelled',
        ]);
        $order->update([
            'status' => $validated['status'],
        ]);
        return redirect()->back();
    }
}
