/********************************************************************************/
/*										*/
/*		server.js							*/
/*										*/
/*	Demonstration Node.JS server using CdQuery database			*/
/*										*/
/********************************************************************************/



/********************************************************************************/
/*										*/
/*	Constants								*/
/*										*/
/********************************************************************************/

var PORT = 3000;



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var express = require('express');

var bodyparser = require('body-parser');

var exphbs = require('express-handlebars');
var handlebars = exphbs.create({ defaultLayout: 'main' })

var session = require('express-session');

const SESSION_KEY = "this is my key";
var uuid = require('uuid');

const madlibs = require('./public/js/resources/resources.js');

/********************************************************************************/
/*										*/
/*	Setup routing using express						*/
/*										*/
/********************************************************************************/

function setup() {
   var app = express();

   app.engine('handlebars', handlebars.engine);
   app.set('view engine', 'handlebars');

   app.use('/html', express.static(__dirname + "/html"));
   app.get('/', function (req, res) { res.redirect("/html/index.html"); });

   app.use(bodyparser.urlencoded({ extended: false }));

   app.use(session({ secret: SESSION_KEY }));
   app.use(sessionManager);

   app.get('/madlibs', requestMadlib);
   app.post('/results', displayResult);

   app.all('*', handle404);
   app.use(errorHandler);

   var server = app.listen(PORT);
   console.log("Listening on port " + PORT);
}



/********************************************************************************/
/*										*/
/*	Handle madlib requests							*/
/*										*/
/********************************************************************************/

function getRandomMadlibIndex() {
   let index = Math.floor(Math.random() * madlibs.length);
   return index;
}

function getRandomMadlib() {
   return madlibs[getRandomMadlibIndex()];
}

function madlibSubstitutions(madlib) {
   return madlib.content.match(/\[([^\])]*)\]/g).map(substitution => substitution.slice(1, -1));
}


function replaceItems(madlib, items) {
   let mad = madlib.content;
   let i = 0;
   let r = mad.replace(/\[([^\])]*)\]/g, function (mat, p1, off, str) {
      return items[i++];
   });
   return r;
}

function requestMadlib(req, res) {
   /*
      
      Task: Fill in the code here to fetch a random madlib and render it. 
      Hints:
         - You can make use of ./views/madlibs.html to render the madlibs.
         - Make use of your code from previous labs to fetch random madlibs.
         - You can make use of sessions to keep track of the madlib that was served to a user
            to render the results upon submit.
   */

   let madlib = getRandomMadlib();
   req.session.madlib = madlib; // stores madlib in current session (every time you go to madlibs, you're resetting for the current session)
   res.render('getwords', {
      terms: madlibSubstitutions(madlib),
   });
}


function displayResult(req, res) {
   /*

      Task: Fill in the code here to render the madlib results.
   */
   console.log(req.body);
   let items = []
   for (let key in req.body) {
      items.push(req.body[key]);
   }
   res.render('showmadlib', {
      body: replaceItems(req.session.madlib, items), // will be full madlib with substitutions
   })
}



/********************************************************************************/
/*										*/
/*	Session creation							*/
/*										*/
/********************************************************************************/

function sessionManager(req, res, next) {
   if (req.session.uuid == null) {
      req.session.uuid = uuid.v1();
      req.session.save();
   }
   next();
}






/********************************************************************************/
/*										*/
/*	Error handling								*/
/*										*/
/********************************************************************************/

function handle404(req, res) {
   res.redirect("/html/error.html");
}



function errorHandler(err, req, res, next) {
   console.log("ERROR on request %s %s %s", req.method, req.url, err);
   console.log("STACK", err.stack);
   res.redirect("/html/error.html");
}




/********************************************************************************/
/*										*/
/*	Main program								*/
/*										*/
/********************************************************************************/

setup();



/* end of server.js */