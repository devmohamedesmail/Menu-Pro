<?php

namespace App\Services;

use App\Events\OrderCreated;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;

class OrderService
{
  public function CreateNewOrder(StoreOrderRequest $request){
        $order = new Order();
        $order->store_id = $request->store["id"];
        $order->order = $request->cart;
        $order->name = $request->name;
        $order->address = $request->address;
        $order->phone = $request->phone;
        $order->location = $request->location;
        $order->note = $request->note;
        $total = collect($request->cart)->sum(fn($item) => $item['computed_price']);
        $order->total = $total;
        $order->save();
                 broadcast(new OrderCreated($order));
        return $order;
  }
}
