<?php

namespace App\Http\Controllers;

use App\Models\WaiterCall;
use Illuminate\Http\Request;

class WaiterCallController extends Controller
{
    public function waiter_call(Request $request)
    {

        $call = new WaiterCall();
        $call->store_id = $request->store_id;
        $call->table_id = $request->table_id;
        $call->note = $request->note;
        $call->type = $request->type;
        $call->save();
        return redirect()->back();
    }
}
