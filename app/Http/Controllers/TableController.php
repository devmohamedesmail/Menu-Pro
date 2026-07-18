<?php

namespace App\Http\Controllers;
use App\Services\TableService;
use Illuminate\Http\Request;


class TableController extends Controller
{
    public function __construct(protected TableService $tableService) {}
    public function storeTable(Request $request, int $id)
    {
        $this->tableService->createTable($request, $id);
        return redirect()->back();
    }

   
    public function updateTable(Request $request, int $id)
    {
        $this->tableService->UpdateTable($request, $id);
        return redirect()->back();
    }

   
    public function deleteTable(int $id)
    {
        $this->tableService->Destroy($id);
        return redirect()->back();
    }

   
}
