# webpack-babel-sourcemap

## Description
This sample demonstrate an issue with babel-loader messing up the source maps when used on a es6 file with webpack
It consist in a very simple angular app with one controller displaying a welcome message, and using some es6 syntax.

## How to reproduce

To first run the sample:
```bash
npm init
npm run webback
```

you can now open `src/index.html` and if all works you should see a "Hello World" message.

Now open the sources in chrome, and navigate to src/controller/home.js

you should see the following code:

```js
'use strict';

module.exports = function($scope) {

    class Person {
        constructor(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;
        }
        fullname() {
            return `${this.firstname} ${this.lastname}`;
        }
    }

    let person = new Person('Avi', 'Haiat');
    $scope.message = `Hello World ${person.fullname()}`;
};

```

ALL IS GOOD

To create the issue, go in `webpack.config.js` and put the babel loader in second or third position

initial situation:
```js
loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            cacheable: true,
            loader: 'babel-loader',
            query: {
                stage: 0,
                //optional: ['runtime', 'es7.asyncFunctions'],
                retainLines: true,
                cacheDirectory: true
            }
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform/cacheable?brfs',
            cacheable: true
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform/cacheable?envify',
            cacheable: true
        }]
```

to 

```js
loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform/cacheable?brfs',
            cacheable: true
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'transform/cacheable?envify',
            cacheable: true
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            cacheable: true,
            loader: 'babel-loader',
            query: {
                stage: 0,
                //optional: ['runtime', 'es7.asyncFunctions'],
                retainLines: true,
                cacheDirectory: true
            }
        }]

```


rerun `npm run webpack`

The new sourcemap for `home.js` looks like:
```js
'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}

module.exports = function ($scope) {var 

    Person = (function () {
        function Person(firstname, lastname) {_classCallCheck(this, Person);
            this.firstname = firstname;
            this.lastname = lastname;}_createClass(Person, [{ key: 'fullname', value: 

            function fullname() {
                return this.firstname + ' ' + this.lastname;} }]);return Person;})();



    var person = new Person('Avi', 'Haiat');
    $scope.message = 'Hello World ' + person.fullname();};

```

which very different from the original source file...
