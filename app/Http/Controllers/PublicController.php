<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
      public function landing_page()
      {
            return Inertia::render('Public/Home/index');
      }

      public function contact_us()
      {
            return Inertia::render('Public/ContactUs/index');
      }

      public function privacy_policy()
      {
            return Inertia::render('Public/PrivacyPolicy/index');
      }



      public function terms_of_service()
      {
            return Inertia::render('Public/TermsOfService/index');
      }


      public function plans()
      {
            $plans = Plan::all();
            return Inertia::render('Public/Plans/index', [
                  'plans' => $plans
            ]);
      }





      public function checkout_page($plan_id)
      {
            try {
                  $plan = Plan::find($plan_id);
                  if (!$plan) {
                        return Inertia::render('404/index', ['error' => 'Plan not found']);
                  }
                  return Inertia::render('visitors/checkout/index', [
                        'plan' => $plan
                  ]);
            } catch (\Throwable $th) {
                  return Inertia::render('404/index', ['error' => $th->getMessage()]);
            }
      }
}
