#Website neighbourhood map

##Description of the website
The website (index.html) is a map of Berlin with some precoded sites of interest. There is an alternative to filter other interesting places or to write some special place. The result will be shown on the map and in a list on the left. The list is selectable and when clicked the selected site will be shown with a bouncing map marker and an infoWindow with links to wikipedia. To keep track of which has been slected the map marker will turn green and stay green.



##How to download and build
The files in the `dist` folder are minified and ready to use.

From the `src` code
- download `package.json`, `Gruntfile.js` and the `src` folder and put in a _directory_ of your choice on your computer
- direct yourself to _the directory_ that you choosed in the terminal and run `npm install`. This will create a file `node-modules` in your directory with the files you need to run `grunt`.
- run `grunt`, which will _minify_ all of the **HTML, css and js** files and put them in a directory called `dist` in the correct folders. It will also copy the images to their correct destinations.
- open `index.html` from the `dist` file in your favorite browser

