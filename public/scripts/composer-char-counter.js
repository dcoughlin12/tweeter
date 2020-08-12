$(document).ready(function() {
  console.log("ready");
  $(".tweetInput").on("keyup", function() {
  	let charLength = $(this).val().length;
  	let counter = $(this).parent().children().children(".counter");
  	counter.html(140 - charLength);
  	if (charLength > 140) {
  		$(this).parent().children().children(".counter").css('color', 'red');
  	}
  });
});
