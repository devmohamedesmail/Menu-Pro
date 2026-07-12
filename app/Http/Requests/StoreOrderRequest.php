<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'store_id'            => 'required|exists:stores,id',
            // 'table_id'            => 'nullable|exists:tables,id',
            // 'table'               => 'nullable|string',
            // 'order'               => 'required|json',
            // 'selected_attributes' => 'nullable|json',
            // 'total'               => 'required|numeric|min:0',
            // 'name'                => 'nullable|string|max:255',
            // 'phone'               => 'nullable|string|max:50',
            // 'address'             => 'nullable|string',
            // 'location'            => 'nullable|string',
            // 'note'                => 'nullable|string',
        ];
    }
}
