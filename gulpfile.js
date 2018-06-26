const path = require('path')
const pkg  = require('./package.json')

const gulp    = require('gulp')
const gcPub   = require('gulp-gcloud-publish')
const replace = require('gulp-replace')

let config = {
    bucket: 'apex-app-starter',
    projectId: 'apex-app-starter',
    keyFilename: ''
}

let files = [
    './www/**',
]

uploadTaskS3('upload-s3', '')

function uploadTaskS3(name, prefix) {
    gulp.task(name, function () {
        gulp.src('./build/**', {base: './build/'})
            .pipe(s3({
                Bucket: config.bucket,
                ACL: 'public-read',
                keyTransform: file => prefix + file
            }, {
                // S3 Constructor Options, ie:
                maxRetries: 5
            }))
    })
}

gulp.task('upload-gcs', function () {
    return gulp.src('./build/**', {base: path.join(__dirname, 'build')})
        .pipe(gcPub({
            bucket: config.bucket,
            projectId: config.projectId,
            keyFilename: config.keyFilename,
            public: true,
            /*transformDestination: function (path) {
                const prefix = `${__dirname.replace(/\\/g, '/')}/build`
                const result = path.replace(prefix, '')
                return result || 'dummy'
            },*/
            metadata: {
                cacheControl: 'max-age=315360000, no-transform, public',
            }
        }))
})

gulp.task('copy-to-build', function () {
    gulp.src(files, {base: './www/'})
    /** Add a date string after bundle.css and bundle.js in order to refresh cache. */
        .pipe(replace(/(href|src)="\/bundle\.(css|js)/g, function (match, prefix, extension, offset, string) {
            return `${match}?${Date.now()}`
        }))
        .pipe(gulp.dest('build/'))
})
