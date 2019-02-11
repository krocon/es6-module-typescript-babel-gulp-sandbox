const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const del = require('del');
const browsersync = require("browser-sync").create();


// BrowserSync
function startBrowsersync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}


// BrowserSync Reload
function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}


// Watch files
function watchFiles() {
    gulp.watch("./dist/**/*", reloadBrowserSync);
    gulp.watch("./src/**/*", build);
    gulp.watch("./index.html", reloadBrowserSync);
}

// Clean dist folder
function clean() {
    return del(["./dist/**/*"]);
}

// build with babel (ts -> es5)
function build(done) {
    console.info('build...');
    gulp
        .src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("xyz.mjs"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
    done();
}

const serve = gulp.parallel(clean, build, watchFiles, startBrowsersync);
const cleanAndBuild = gulp.parallel(clean, build);



exports.default = build;
exports.clean = clean;
exports.build = cleanAndBuild;
exports.serve = serve;
exports.watchFiles = watchFiles;
