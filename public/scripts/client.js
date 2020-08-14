/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(document).ready(function() {
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
		    <p class="tweetText">${escape1(object.content.text)}</p>
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
	};
	// Get Tweets
	const loadTweets = function() {
		$.ajax({url: "/tweets", method: 'GET'}).then((response) => {
	    renderTweets(response);
		});
	};
	//Loop through tweets and list them
	const renderTweets = function(tweets) {
		for (let tweet of tweets) {
			$('#listedTweets').prepend(createTweetElement(tweet)) //prepend to reverse the order.
		}
	};
	$('#tooLong').slideUp(0);
	$('#noText').slideUp(0);
	$(".tweetForm").on('submit', function(event) {
		event.preventDefault();
		let tweet = $(this).serialize();
		if (tweet.length - 5 > 140) { 				// -5 to account for serialize characters
			$('#noText').slideUp(400);
			return $('#tooLong').slideDown(400);
		}
		if (tweet.length <= 5) {
			$('#tooLong').slideUp(400);
			return $('#noText').slideDown(400);
		}
		$('#tooLong').slideUp(200);
		$('#noText').slideUp(200);
	  $.post("/tweets", tweet).then((response)=> {
	  	$(".tweetForm")[0].reset();
	  	$("#listedTweets").empty();
	  	$(this).children().children(".counter").html(140);
	  	loadTweets();
	  });
	});
	loadTweets();
});










