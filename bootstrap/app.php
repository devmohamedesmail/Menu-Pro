<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
          $exceptions->render(function (
            Throwable $e,
            $request
        ) {

            if (! $request->expectsJson()) {

                $status = 500;

                if ($e instanceof HttpExceptionInterface) {
                    $status = $e->getStatusCode();
                }

                return Inertia::render('errors/error', [
                    'status' => $status,
                    'message' => app()->isLocal()
                        ? $e->getMessage()
                        : 'Something went wrong',
                ])->toResponse($request)
                  ->setStatusCode($status);
            }

            return null;
        });
        
    })->create();
