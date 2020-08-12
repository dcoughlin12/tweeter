/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1597263647733
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1597263647733
    },
  ]

//Helper function which returns time since tweet was posted
function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

// Takes in a tweet object and is responsible for returning a tweet <article>
// <article> containins the entire HTML structure of the tweet.
const createTweetElement = function(object) {
	const tweet = `
	<article class="tweet">
		<header class="tweetHeader">
	    <div class="nameAndPic">
	    	<img class="tweetProfilePic" src="${object.user.avatars}">
	    	${object.user.name}
			</div>
	    <p class="username">
	      ${object.user.handle}
	    </p>
	  </header>

	    <p class="tweetText">
	      ${object.content.text}
	    </p>

	    <footer class="tweetFooter">
	      <p class="days">${timeSince(object.created_at)}</p>
	      <div class="actionPic"> 
	        <img class="icon" src="/images/flag.png">
	        <img class="icon" src="/images/retweet-80.png">
	        <img class="icon" src="/images/empty-heart.png">
	      </div>
	    </footer>      
 	</article> `;
 	return tweet;
}	

// const $tweet = createTweetElement(tweetData);
// $(document).ready(function() {
// 	$('#listedTweets').append($tweet);
// })

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container inside $(document).ready

const renderTweets = function(tweets) {
	for (tweet of tweets) {
		$('#listedTweets').append(createTweetElement(tweet))
	}
}
once doc is ready, calling renderTweets on Data. 
$(document).ready(function() {
	renderTweets(data);
})

// $(document).ready(function() {
// 	$("#tweetButton").on('submit', (text) => {
// 	  $.post("http://localhost:8080/",
// 	  function(data, status){
// 	    alert("Data: " + data + "\nStatus: " + status);
// 	  });
// 	});
// });










