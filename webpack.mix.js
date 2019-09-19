const mix = require('laravel-mix');

/*
* A typical building of react app.
* Mix.react(source, destination)
*
* First specify where the react file is, the specify where
* it will go to, obviously the public js folder.
* */

/*
    * Same format as the react file, but instead, for compiling
    * scss/sass files. obviously to the public css folder.
    *
    * NOTE: You can use it to combine css too, not importantly scss files.
    * Read more on mix at https://laravel-mix.com/
    * */
    mix.sass('assets/sass/app.scss', 'public/css/app.css');
