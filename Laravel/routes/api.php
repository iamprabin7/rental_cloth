<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\API\ReturnsController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('getCategory', [FrontendController::class, 'category']);
Route::get('fetchproducts/{slug}', [FrontendController::class, 'product']);
Route::get('viewproductdetail/{category_slug}/{product_slug}', [FrontendController::class, 'viewproduct']);

Route::post('add-to-cart', [CartController::class, 'addtocart']);
Route::get('cart', [CartController::class, 'viewcart']);
Route::put('cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updatequantity']);
Route::delete('delete-cartitem/{cart_id}', [CartController::class, 'deleteCartitem']);

Route::post('validate-order', [CheckoutController::class, 'validateOrder']);
Route::post('place-order', [CheckoutController::class, 'placeorder']);

Route::get('myorders', [OrderController::class, 'viewmyorders']);
Route::post('add-to-return', [ReturnsController::class, 'addtoreturn']);

// Fetch related products based on category
Route::get('relatedproducts/{categoryId}', [ProductController::class, 'relatedProducts']);


Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    // Category
    Route::get('view-category', [CategoryController::class, 'index']);
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('all-category', [CategoryController::class, 'allcategory']);

     // Users
     Route::get('view-users', [UsersController::class, 'index']);
     Route::post('store-users', [UsersController::class, 'store']);
     Route::put('appoint-admin/{id}', [UsersController::class, 'appointAdmin']);
     Route::put('remove-admin/{id}', [UsersController::class, 'removeAdmin']);
     Route::put('update-users/{id}', [UsersController::class, 'update']);
     Route::delete('delete-users/{id}', [UsersController::class, 'destroy']);
     Route::get('all-users', [UsersController::class, 'allusers']);


    // Orders
    Route::get('admin/orders', [OrderController::class, 'index']);
    Route::get('admin/view-orders/{orderId}', [OrderController::class, 'viewitems']);
    Route::delete('admin/orders/cancel/{orderId}', [OrderController::class, 'cancelOrder']);




    Route::get('/total-sales', [OrderController::class, 'getTotalSales']);
     // Returns
     Route::get('admin/returns', [ReturnsController::class, 'index']);
     Route::post('admin/approve-return', [ReturnsController::class, 'approveReturn']);

    // Products
    Route::post('store-product', [ProductController::class, 'store']);
    Route::get('view-product', [ProductController::class, 'index']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);


    //For dashboard
    Route::get('/getUsersTotalPrice', [OrderController::class, 'getUsersTotalPrice']);


});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('profile', [AuthController::class, 'getProfile']);
    Route::post('logout', [AuthController::class, 'logout']);

});


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
