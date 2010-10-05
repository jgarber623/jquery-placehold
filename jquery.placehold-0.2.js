/*
 * Another jQuery placeholder plugin
 *
 * Copyright (c) 2010 Jhonatan Salguero Villa (http://novatoz.blogspot.com/)
 * 
 * Based upon the plugin by Jason Garber:
 * http://github.com/jgarber623/jquery-placehold
 * 
 * Licensed under the GNU GPLv2 license (http://www.gnu.org/licenses/gpl-2.0.html)
 */
(function($) {

	var value = "value",

		placeholder_str = "placeholder",

		supported = placeholder_str in $("<input>")[0],

		_$ = $([0]),

		_ = function( elem ) {
			_$[0] = elem;
			return _$;
		};

	$.fn.placehold = function( placeholderClass ) {
		placeholderClass = placeholderClass || placeholder_str;
		
		return supported ? this :
		this.each(function() {
			var input = this,
				$this = _( input ),
				placeholder = $this.attr( placeholder_str ),
				$fake;

			if ( this.type == "password" ) {

				$fake = $("<input>", {
					"class": this.className + " " + placeholderClass,
					value: placeholder,
					focus: function() {
						// show original input
						$fake.toggle();
						input.focus();
					}
				})
				.insertAfter( this );

				// text inputs are wider than password in IE
				if ( $this.css("width") == "auto" ) {
					$fake.width( $this.width() );
				}

				// hide original input
				$this.hide()
				.blur(function() {
					if ( !this[value] ) {
						$fake.toggle();
					}
				});
				
				// save
				$fake.push( this );

			} else {

				if ( !this[value] || this[value] == placeholder ) {
					$this.addClass( placeholderClass ).val( placeholder );
				}

				$this.bind({
					focus: function() {
						if ( this[value] == placeholder ) {
							_( this ).removeClass( placeholderClass ).val( "" );
						}
					},

					blur: function() {
						if ( !this[value] ) {
							_( this ).addClass( placeholderClass ).val( placeholder );
						}
					}
				})
				// prevent send placeholder
				.closest( "form" )
				.submit(function() {
					if ( input[value] == placeholder ) {
						input[value] = "";
					}
				});
			}
		});
	};
}(jQuery));