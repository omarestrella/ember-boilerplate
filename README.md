# ember-boilerplate

A boilerplate for my frontend Ember.js projects.

## Why?

I've found that I've been setting up all of my projects with Ember the same exact way, so this simplifies all of that.

### But ember-app-kit!

I have used Ember App Kit and it is fantastic, but it does a little too much for me. I just wanted a simple compile and building pipeline.

### But Grunt!

I have started to prefer [Gulp.js](http://gulpjs.com/) over Grunt because of its simplicity and performance.

## Structure Philosophy

There are many opinions that people take when structuring their Ember projects. This library imposes its own.

The idea behind the structure of this project is that each route is considered its own sort of module. For example, the `index` route has the following folder structure:

    -- /js/index
      -- /controller.js
      -- /view.js [optional]

## License

The MIT License (MIT)

Copyright (c) 2014 Omar Estrella

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.