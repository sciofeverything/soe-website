// 1. array seperate page then import
// 2. export array here
// 3.  for each, for each div for blog page
// 4. as for article itself, still trying to figure it out.
// - one choice is to manually make seperate pages and render the article from the array seperately
// - another is to somehow write javascript to open a new page - get("/page-name") - or perhaps something similar to create a new page for each article depending on the button they click in the blog page.

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require ("ejs");
const path = require('path');

const nodeforge = require('node-forge');
var obj = {};
nodeforge.util.setPath(obj, ['__proto__', 'polluted'], true);
console.log(polluted);

var app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");


  const articlesArray = require('./articles');
  const articles = articlesArray.articles;
// old,, console.log(articlesArray.articles[0]); brings first article
  const articlesArabicArray = require('./articlesArabic');
  const articlesArabic = articlesArabicArray.articlesArabic;

app.get("/", function(req, res){
  res.render("home.html");

});

app.get("/contact", function(req, res){
  res.render("contact.html");
});

app.get("/faq", function(req, res){
  res.render("FAQ.html");
});

app.get('/blog', function(req, res) {

    // Uses views/orders.ejs
    res.render("blog.ejs", {articles: articles});
});

app.get("/blog/:title", function(req, res) {
  function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
};
  var alteredTitle =titleCase(req.params.title.replace(/-/g, ' '));

  function sameTitle(article) {
  return article.title === alteredTitle;
}
  const articleWithSameTitle = articles.find(sameTitle);
  if (alteredTitle === articleWithSameTitle?.title) {
    res.render("blog-post.ejs", {articles: articleWithSameTitle});
  } else {
    res.render("blog.ejs", {articles: articles});
  };
});

app.get("/blog/:title/arabic", function(req, res) {

   function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
 };
   var alteredTitle =titleCase(req.params.title.replace(/-/g, ' '));

   function sameTitleEnglish(article) {
   return article.title === alteredTitle;
 }
 const articleSameTitle = articles.find(sameTitleEnglish);

 if (alteredTitle === articleSameTitle?.title) {
   function sameIdArabic(articleArabic) {
   return articleArabic.id === articleSameTitle.id;
 };
   const articleWithSameIdArabic = articlesArabic.find(sameIdArabic);

   if (articleWithSameIdArabic.id === articleSameTitle.id) {
     res.render("blog-post-arabic.ejs", {articlesArabic: articleWithSameIdArabic, articles: articleSameTitle});
   } else {
     res.render("blog.ejs", {articles: articles});
   };
 } else {
   res.render("blog.ejs", {articles: articles});
 };

});

app.get('/home-arabic', function(req, res) {
  res.render("home-arabic.html")
});

app.listen(process.env.PORT || '3000', function(){
  console.log("success")
});
