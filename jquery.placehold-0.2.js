/************************************************************************************
** jQuery Placehold version 0.1
** (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
** Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
*************************************************************************************/

;(function($) {
	$.fn.placehold = function( options ) {
		var opts = $.extend( {}, $.fn.placehold.defaults, options );
		var supported = $.fn.placehold.is_supported();
		
		function toggle( arr ) {
			for ( i = 0; i < arr.length; i++ ) {
				arr[i].toggle();
			}
		}
		
		return this.each( function() {
			if ( !supported ) {
				var elem = $( this ), placeholder_attr = elem.attr( "placeholder" ), is_password = ( elem.attr( "type" ) == "password" ) ? true : false;
				
				if ( placeholder_attr ) {
					if ( !elem.val() || elem.val() == placeholder_attr ) {
						elem.addClass( opts.placeholderClassName ).val( placeholder_attr );
					}
					
					elem.focus( function() {
						if ( elem.val() == placeholder_attr ) {
							elem.removeClass( opts.placeholderClassName ).val( "" );
						}
					});
					
					elem.blur( function() {
						if ( !elem.val() ) {
							if ( is_password ) {
								toggle( [elem, elem_stub] );
							}
							
							elem.addClass( opts.placeholderClassName ).val( placeholder_attr );
						}
					});
					
					elem.closest( "form" ).submit( function() {
						if ( elem.val() == placeholder_attr ) {
							if ( is_password ) {
								toggle( [elem, elem_stub] );
							}
							
							elem.val( "" );
						}
						
						return true;
					});
					
					if ( is_password ) {
						var elem_stub = $( '<input type="text" class="' + opts.placeholderClassName + '" value="' + placeholder_attr + '" />' );
						
						elem_stub.focus( function() {
							toggle( [elem, elem_stub] );
							elem.focus();
						});
						
						elem.hide().after( elem_stub );
					}
				}
			}
		});
	};
	
	$.fn.placehold.is_supported = function() {
		return "placeholder" in document.createElement( "input" );
	}
	
	$.fn.placehold.defaults = {
		placeholderClassName: "placeholder"
	};
})(jQuery);