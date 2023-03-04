<?php

namespace s00d\LarecipeCodeViewer;

use BinaryTorch\LaRecipe\LaRecipe;
use Illuminate\Support\ServiceProvider;

class AssetServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        LaRecipe::script('larecipe-code-viewer', __DIR__.'/../dist/js/asset.js');
        LaRecipe::style('larecipe-code-viewer', __DIR__.'/../dist/css/asset.css');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
