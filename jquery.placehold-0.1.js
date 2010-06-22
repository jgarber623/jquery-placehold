/************************************************************************************
** jQuery Placehold version 0.1
** (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
** Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
*************************************************************************************/

;(function($) {
	$.fn.placehold = function( options ) {
		var opts = $.extend( {}, $.fn.placehold.defaults, options );
		var supported = $.fn.placehold.is_supported();
		
		return this.each( function() {
			if ( !supported ) {
				var placeholder_attr = $( this ).attr( "placeholder" );
				
				if ( placeholder_attr ) {
					var elem = $( this ), elem_is_password = ( elem.attr( "type" ) == "password" );
					
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
							elem.addClass( opts.placeholderClassName ).val( placeholder_attr );
						}
					});
					
					elem.closest( "form" ).submit( function() {
						if ( elem.val() == placeholder_attr ) {
							elem.val( "" );
						}
						
						return true;
					});
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