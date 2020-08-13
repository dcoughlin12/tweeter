/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Function to encode special characters and prevents	XSS attacks
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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
  return (Math.floor(seconds)) + " seconds"; //was 30 seconds off. 
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
	    <p class="username">${object.user.handle}</p>
	  </header>
	    <p class="tweetText">${escape(object.content.text)}</p>
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

const loadTweets = function() {
	$.ajax({url: "/tweets", method: 'GET'}).then((response) => {
    renderTweets(response);
	})
};


const renderTweets = function(tweets) {
	for (let tweet of tweets) {
		$('#listedTweets').prepend(createTweetElement(tweet)) //prepend to reverse the order.
	}
}

$(document).ready(function() {
	loadTweets();
	$('#tooLong').slideUp(0);
	$('#noText').slideUp(0);
	$(".tweetForm").on('submit', function (event) {
		event.preventDefault();
		let tweet = $(this).serialize();
		if (tweet.length -5 > 140) { 				// -5 to account for serialize characters
			// return alert('Oh no, your tweet is too long')
			$('#noText').slideUp(400);
			return $('#tooLong').slideDown(400);
		}
		if (tweet.length <= 5) {
			$('#tooLong').slideUp(400);
			return $('#noText').slideDown(400);
			// return $('#noText').css("opacity", "1");
		}
		$('#tooLong').slideUp(200);
		$('#noText').slideUp(200);
		window.location.href = 'http://localhost:8080';
	  $.post("/tweets", tweet).then((response)=> {
	  	loadTweets();
	  });
	});
});










