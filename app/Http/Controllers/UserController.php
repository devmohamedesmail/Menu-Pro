<?php

namespace App\Http\Controllers;

use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{

 use UploadsToCloudinary;
        public function vendor_profile()
    {
        $user = Auth::user();
        return Inertia::render('auth/vendor-profile', [
            'user' => $user,
        ]);
    }

    /**
     * Update vendor profile (name, email, avatar, password)
     */
    public function update_vendor_profile(Request $request)
    {
        $user = Auth::user();

        // Validate the request
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255|unique:users,email,' . $user->id,
            'avatar'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'current_password' => 'nullable|string',
            'new_password'     => 'nullable|string|min:8|confirmed',
        ]);

        // Handle password change
        if (! empty($validated['new_password'])) {
            if (empty($validated['current_password']) || ! Hash::check($validated['current_password'], $user->password)) {
                return back()->withErrors(['current_password' => 'The current password is incorrect.'])->withInput();
            }
        }

        // Build update data
        $updateData = [
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ];

        // Upload avatar to Cloudinary if provided
        if ($request->hasFile('avatar')) {
            $updateData['avatar'] = $this->uploadToCloudinary($request->file('avatar'), 'users/avatars');
        }

        // Update password if requested
        if (! empty($validated['new_password'])) {
            $updateData['password'] = Hash::make($validated['new_password']);
        }

        $user->update($updateData);
        return redirect()->back();
    }
}
