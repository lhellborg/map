#Website neighbourhood map

##Description of the website
The website (index.html) is a map of Berlin with some precoded sites of interest. 

There is an alternative to filter other interesting places or to write some text in the `special place?` input. The result will be shown on the map and in a list on the left. 

The list is selectable and when clicked the selected site will be shown with a bouncing map marker and an infoWindow with links to wikipedia. The links will be opened in a new tab. 

To keep track of which markers has been selected the map marker will turn green and stay green until reloaded.



##How to download and build
The files in the `dist` folder are minified and ready to use.

From the `src` code
- download `package.json`, `Gruntfile.js` and the `src` folder and put in a _directory_ of your choice on your computer
- direct yourself to _the directory_ that you choosed in the terminal and run `npm install`. This will create a file `node-modules` in your directory with the files you need to run `grunt`.
- run `grunt`, which will _minify_ all of the **HTML, css and js** files and put them in a directory called `dist` in the correct folders. It will also copy the images to their correct destinations.
- open `index.html` from the `dist` file in your favorite browser

###Gruntfile.js
The gruntfile.js also contains jshint, which has been used for validateing the js files and jsbeautifier which will beautify the .js files.

##Other features

###Header navbar
The header navbar includes an input field where text can be written and searched. Two selectable buttons, `Map`, and `The Weather` which will show either the map or the weather of Berlin in the main Window.
The header navbar will become a hamburger bar in mobiles.

###Input field
The input is an observable variable so every key press is recogniced and searched for. This may sometimes cause on overload in the calls for google map and an error message is displayed in the list view on the left.

###Weather forecast
The weather is from Yahoos wheather API.

###Precoded shortkeys
There are two precoded shortkeys that can be used:
- ` altKey + a` => search and display **thai food** places
- ` altKey + s` => search and display **emergency** places

###Stored input data
If anything has been written in the user input field for `special place?`
it will be saved in localStorage and reappear next time the page is loaded. The marker will still be the default values.

