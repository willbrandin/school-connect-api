var database = require('../models');
var NewsArticle = require('../models/news-article')

exports.getSchoolNews = function(request, response){

    NewsArticle.find({ school: request.params.schoolId }, function(err, news){
      if (err){
        response.send(err);
      }
      response.json(news)
    });
}

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

exports.updateNewsArticle = function(request, response){
   database.NewsArticle.findOneAndUpdate({ _id: request.params.newsId }, request.body, {new: true})
   .then(function(news){
       response.json(news);
   })
   .catch(function(err){
        response.send(err);
    })
}

module.exports = exports
