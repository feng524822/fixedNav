;(function(global, $) {

	$.fn.fixedNav = function(offset) {
			var scrollTimer,
				tDefault = [],
				checkList = this,
				view  = $(global),
				oMarTop = offset || 0;

			if(checkList.length) {
				getDefault();
				$(window).bind('scroll', function() {
					if(!tDefault.length) {
						getDefault();
					}
					clearTimeout(scrollTimer);
					scrollTimer = setTimeout(checkScroll, 16);
				});
			}

			function getDefault() {
				tDefault = [];
				checkList.each(function(index) {
					var	$this = $(this),
						arr = [];
					arr["startPos"] = $this.offset().top;
					arr["height"] = $this.height();
					arr["dTop"] = $this.css('top') || 'auto';
					arr["dZindex"] = $this.css('z-index') || '1';
					arr["dPosititon"] = $this.css('posititon') || 'static';
					arr["isFixed"] = false;
					tDefault.push(arr);
					$this.parent('.fixedNavParent').height(arr["height"]);
				});
			}

			function checkScroll() {
				var scrollTop = view.scrollTop();
				checkList.each(function(index) {
					var $this = $(this);
					if(scrollTop > tDefault[index]['startPos'] + oMarTop) {
						if(tDefault[index]['isFixed']) {return true;}
						$this.addClass('isFixed').css({"position": "fixed", "top": "0","z-index": "999"});
						tDefault[index]['isFixed'] = true;
					} else {
						$this.removeClass('isFixed').css({"position": tDefault[index]['dPosititon'], "top": tDefault[index]['dTop'], "z-index": tDefault[index]['dZindex']});
						tDefault[index]['isFixed'] = false;
					}
				});
				scrollTimer = setTimeout(arguments.callee, 6);
			}

		}

})(window, jQuery);
