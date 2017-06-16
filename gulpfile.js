//Include required modules
var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require("browserify");
var connect = require("gulp-connect");
var source = require("vinyl-source-stream");

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task("default", ["start"]);
gulp.task("start", ["html", "css", "build", "server"]);

//Copy static files from html folder to build folder
gulp.task("html", function(){
    return gulp.src("./src/*.html")
    .pipe(gulp.dest("./build"));
});

//Copy static files from css folder to build folder
gulp.task("css", function(){
    return gulp.src("./src/css/*.css")
    .pipe(gulp.dest("./build/css"));
});

//Convert ES6 ode in all js files in src/js folder and copy to 
//build folder as bundle.js
gulp.task("build", function(){
    return browserify({
        entries: ["./src/js/index.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015", "react"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build/js"))
    ;
});

//listening to 9001 port. Home page = http://localhost:9001
gulp.task("server", function(){
    connect.server({
        root : "./build",
        livereload : true,
        port : 9001
    });
});