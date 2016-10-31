Ever wanted to implement your gulp task direclty with powershell?

### `gulpfile.js`
```
const gulp = require('gulp');
const pulp = require('posh-gulp');

pulp('./gulpfile.ps1');

gulp.task('build', (cb) => {
   console.log('building');
   cb();
});

gulp.task('default', ['posh:simple']);
```

### `gulpfile.ps1`
```
Import-Module ./path-to-posh-gulp/Gulp

Add-Task "posh:empty"

Add-Task "posh:simple" ("build", "posh:empty") {
    Write-Host 'simple powershell task'
}

Publish-Tasks $args
```

### Output
```
Using gulpfile [...]/gulpfile.js
Starting 'build'...
building
Finished 'build'
Starting 'posh:empty'...
Finished 'posh:empty'
Starting 'posh:simple'...
simple powershell task
Finished 'posh:simple'
Starting 'default'...
Finished 'default'
```

Development
===========
Run powershell tests with pester (choco install):
```
Invoke-Pester
```
