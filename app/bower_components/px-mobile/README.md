# px-mobile
Build cross platform apps with HTML‚ CSS‚ and JS components. Download px-mobile

### Web Components
Piece together your application using web components.

### ES6 JavaScript
Use the px-mobile.js library to power your application.

### Extendable Styles
Using SASS, change the default styles by changing the variables.


## Quick Start
To add px-mobile to your project, follow these steps.

### 1. Install with Bower
Use bower to simplify the installation process, open the terminal and execute the following:

```
$ bower install https://github.build.ge.com/PredixComponents/px-mobile.git --save
```

### 2. Create your views
Use the documentation as a reference for all the available components and piece together the views and pages of your app. Be sure to look at the basic app template and example applications. Make sure to add px-mobile-theme.html to your app's <head>.


### 3. Wire views and pages
Read about px-mobile then start connecting your pages and views. px-mobile allows you to create a app that feels like a real app when you save it to your phone.

### 4. Install the app to your phone
There are a few ways to do this, but the simplest is to run the iOS simulator on your computer.

---

# Getting Started
Here are is a few easy ways to quickly get started, each one appealing to a different skill level and use case. Read through to see what suits your particular needs.

## Install with Bower
Use bower to simplify the installation process, open the terminal and execute the following:

```
$ bower install https://github.build.ge.com/PredixComponents/px-mobile.git --save
```

## Download px-mobile archive
px-mobile is downloadable in two forms, within which you'll find the following directories and files, logically grouping common resources and providing both compiled and minified variations.

### Pre-compiled code
Once downloaded, unzip the compressed folder to see the structure of (the compiled) px-mobile. You'll see something like this:

```
px-mobile/
├── css/
│   ├── px-mobile.css
│   ├── px-mobile.min.css
├── js/
│   ├── px-mobile.js
│   └── px-mobile.min.js
└── fonts/
  ├── GEInspiraSans.eot
  ├── GEInspiraSans.svg
  ├── GEInspiraSans.ttf
  └── GEInspiraSans.woff
```

This is the most basic form of px-mobile: precompiled files for quick drop-in usage in nearly any web project.  We provide compiled CSS and JS (`px-mobile.*`), as well as compiled and minified CSS and JS (`px-mobile.min.*`).

---

## Build from source
We use Gulp for its build system, with convenient methods for working with the framework. It's how we compile our code, run tests, and more.

```
$ git clone https://github.build.ge.com/PredixComponents/px-mobile.git
```

Then run `$ npm install` from the projects directory.

### Directory structure

The px-mobile source code download includes the precompiled CSS, JavaScript, and font assets, along with source Sass, JavaScript, and documentation. More specifically, it includes the following and more:

```
px-mobile/
    ├── demo/
    ├── dist/
    ├── docs/
    ├── src/
    │   ├── elements/
    │   ├── fonts/
    │   ├── images/
    │   ├── jade/
    │   ├── js/
    │   └── scss/
    ├── tasks/
    └── test/
        ├── elements/
        └── specs/
```

* The `sass/`, `js/`, and `fonts/` are the source code for our CSS, JS, and icon fonts (respectively).
* The `dist/` folder includes everything listed in the precompiled download section above.
* The `docs/` folder includes the source code for our documentation, and `demo/` of usage.



### Available Gulp commands

1. `gulp dist` - Regenerates the `/dist/` directory with compiled and minified CSS and JavaScript files.
2. `gulp watch` - Watches the SCSS source files and automatically recompiles them to CSS whenever you save a change.
3. `gulp test` - Runs JSHint and runs the Mocha and Web Component tests.
4. `gulp docs` - Builds and tests CSS, JavaScript, and other assets which is used when running the documentation locally.
5. `gulp` - Compiles and minifies CSS and JavaScript, builds the documentation website.


---


# Starter Templates
Start with this basic HTML template.

## Vanilia JavaScript, HTML and CSS
Use the following if you want to add px-mobile to your regular application.
```
<!DOCTYPE html>
<html lang="en" class="px-mobile">
  <head>
    <title>My App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--Styles + Scripts-->
    <link rel="stylesheet" href="bower_components/px-mobile/dist/px-mobile.min.css">
    <script src="bower_components/px-mobile/dist/js/px-mobile.js"></script>
  </head>
  <body>
    <!-- Your HTML -->
  </body>
</html>
```

> **Note:** HTML Web components will not be available!

## Web Component Usage
Use the following if you want to add px-mobile to your web component application.

```

```
