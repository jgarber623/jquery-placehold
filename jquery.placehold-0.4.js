/**
 * @name jQuery placehold (https://github.com/jgarber623/jquery-placehold)
 * @version 0.4
 * @author Jason Garber
 * @copyright (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
 * 
 * Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
 */

;(function($) {
	$.fn.placehold = function( placeholderClassName ) {
		var placeholderClassName = placeholderClassName || "placeholder",
			supported = $.fn.placehold.is_supported();
		
		function toggle() {
			for ( i = 0; i < arguments.length; i++ ) {
				arguments[i].toggle();
			}
		}
		
		return supported ? this : this.each( function() {
			var $elem = $( this ),
				placeholder_attr = $elem.attr( "placeholder" );
			
			if ( placeholder_attr ) {
				if ( $elem.val() === "" || $elem.val() == placeholder_attr ) {
					$elem.addClass( placeholderClassName ).val( placeholder_attr );
				}
				
				if ( $elem.is( ":password" ) ) {
					var $pwd_shiv = $( "<input />", {
						"class": $elem.attr( "class" ) + " " + placeholderClassName,
						"value": placeholder_attr
					});
					
					$pwd_shiv.bind( "focus.placehold", function() {
						toggle( $elem, $pwd_shiv );
						$elem.focus();
					});
					
					$elem.bind( "blur.placehold", function() {
						if ( $elem.val() === "" ) {
							toggle( $elem, $pwd_shiv );
						}
					});
					
					$elem.hide().after( $pwd_shiv );
				}
				
				$elem.bind({
					"focus.placehold": function() {
						if ( $elem.val() == placeholder_attr ) {
							$elem.removeClass( placeholderClassName ).val( "" );
						}
					},
					"blur.placehold": function() {
						if ( $elem.val() === "" ) {
							$elem.addClass( placeholderClassName ).val( placeholder_attr );
						}
					}
				});
				
				$elem.closest( "form" ).bind( "submit.placehold", function() {
					if ( $elem.val() == placeholder_attr ) {
						$elem.val( "" );
					}
					
					return true;
				});
			}
		});
	};
	
	$.fn.placehold.is_supported = function() {
		return "placeholder" in document.createElement( "input" );
	};	
})(jQuery);