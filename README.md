# jquery-placehold
A jQuery plugin to enable the HTML5 "placeholder" attribute in all browsers


## Requirements
* [jQuery](http://jquery.com/) (1.4.2 or greater is recommended)
* Firefox < 3.7, Safari < 4, any version of Internet Explorer


## Usage
In your HTML:

	<input type="text" name="phone" placeholder="+1 (555) 555-5555" />
	<textarea name="comment" placeholder="Four score and seven years ago..."></textarea>

In your JavaScript:

	$().ready( function() {
		$( "input, textarea" ).placehold( placeholderClassName );
	});

The placeholderClassName is optional (default: placeholder)