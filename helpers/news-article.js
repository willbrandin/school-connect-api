var database = require('../models');
var NewsArticle = require('../models/news-article')

//GET
///Gets all school news
// 'api/news/:schoolId'
exports.getSchoolNews = function(request, response){

    NewsArticle.find({ school: request.params.schoolId }, function(err, news){
      if (err){
        response.send(err);
      }
      response.json(news);
    });
}

//POST
///Creates a new school News Article Obj
// 'api/news/:schoolId'
exports.createNewsStory = function(request, response) {
   database.School.findById(request.params.schoolId)
   .then(function(school) {
     let newStory = new NewsArticle();
     newStory.title = request.body.title;
     newStory.subtitle = request.body.subtitle;
     newStory.story = request.body.story;
     newStory.school = school._id;
     newStory.save(function(err, newStory){
       if (err){
         response.send(err);
       }
       school.newsArticles.push(newStory)
       school.save(function(err){
         if (err){
           response.send(err);
         }
         response.send({ message: 'New Story saved' })
       })
     })
   })
   .catch(function(err){
     response.send(err);
   })
}

//GET
/// Gets a specific news article with NewsId
// 'api/news/article/:newsId'
exports.getNewsStory = function(request, response){
  NewsArticle.findById(request.params.newsId)
  .then(function(newsStory){
    response.json(newsStory);
  })
  .catch(function(err){
    response.send(err);
  })
}

//PUT
/// Updates a specific news article with NewsId
// 'api/news/article/:newsId'
exports.updateNewsArticle = function(request, response){
   NewsArticle.findOneAndUpdate({ _id: request.params.newsId }, request.body, {new: true})
   .then(function(news){
       response.json(news);
   })
   .catch(function(err){
        response.send(err);
    })
}

module.exports = exports
