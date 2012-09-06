/*
 * MeBasic V2.0.1
 * Methink co,ltd
 * 2012.2.21 17:21 GMT+8
 */

/* ============================================================
 * InputPreValue v1.0
 * api.meside.com/uiframe/javascript#inputprevalue
 * ============================================================
 * Copyright 2012 Methink, Inc. 2012.1.21
 * 
 * By Mino Royuan Wu
 * ============================================================ */
(function($) {
	$.fn.inputPreValue = function(){
		return this.each(function(){
			$(this).attr('value', $(this).attr('preValue'));
			$(this).live('focusin',function(){
				if( $(this).attr('value') == $(this).attr('preValue') ){
					$(this).removeAttr('value');
				}
			});
			$(this).live('focusout',function(){
				if( $(this).attr('value') == '' ){
					$(this).attr('value', $(this).attr('preValue'));
				}
			});
			/*$(this).live('click',function(){
				alert('Yes');
			});*/
		});
	}
	$(function () {
    	$('input[preValue]').inputPreValue();
		//textarea获得焦点时清空默认value值
		$('textarea[preValue]').focusin(function(){
			if( $(this).html() == $(this).attr('preValue') ){
				$(this).html('');
			}
		});
	});
})(jQuery);

 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	$.fn.tipTip = function(options) {
		var defaults = {
			activation: "hover",
			keepAlive: false,
			maxWidth: "200px",
			edgeOffset: 3,
			defaultPosition: "bottom",
			delay: 200,
			fadeIn: 200,
			fadeOut: 200,
			attribute: "title",
			content: false,
			enter: function() {},
			exit: function() {}
		};
		var opts = $.extend(defaults, options);
		if ($("#tiptip_holder").length <= 0) {
			var tiptip_holder = $('<div id="tiptip_holder" style="max-width:' + opts.maxWidth + ';"></div>');
			var tiptip_content = $('<div id="tiptip_content"></div>');
			var tiptip_arrow = $('<div id="tiptip_arrow"></div>');
			$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))
		} else {
			var tiptip_holder = $("#tiptip_holder");
			var tiptip_content = $("#tiptip_content");
			var tiptip_arrow = $("#tiptip_arrow")
		}
		return this.each(function() {
			var org_elem = $(this);
			if (opts.content) {
				var org_title = opts.content
			} else {
				var org_title = org_elem.attr(opts.attribute)
			}
			if (org_title != "") {
				if (!opts.content) {
					org_elem.removeAttr(opts.attribute)
				}
				var timeout = false;
				if (opts.activation == "hover") {
					org_elem.hover(function() {
						active_tiptip()
					},
					function() {
						if (!opts.keepAlive) {
							deactive_tiptip()
						}
					});
					if (opts.keepAlive) {
						tiptip_holder.hover(function() {},
						function() {
							deactive_tiptip()
						})
					}
				} else if (opts.activation == "focus") {
					org_elem.focus(function() {
						active_tiptip()
					}).blur(function() {
						deactive_tiptip()
					})
				} else if (opts.activation == "click") {
					org_elem.click(function() {
						active_tiptip();
						return false
					}).hover(function() {},
					function() {
						if (!opts.keepAlive) {
							deactive_tiptip()
						}
					});
					if (opts.keepAlive) {
						tiptip_holder.hover(function() {},
						function() {
							deactive_tiptip()
						})
					}
				}
				function active_tiptip() {
					opts.enter.call(this);
					tiptip_content.html(org_title);
					tiptip_holder.hide().removeAttr("class").css("margin", "0");
					tiptip_arrow.removeAttr("style");
					var top = parseInt(org_elem.offset()['top']);
					var left = parseInt(org_elem.offset()['left']);
					var org_width = parseInt(org_elem.outerWidth());
					var org_height = parseInt(org_elem.outerHeight());
					var tip_w = tiptip_holder.outerWidth();
					var tip_h = tiptip_holder.outerHeight();
					var w_compare = Math.round((org_width - tip_w) / 2);
					var h_compare = Math.round((org_height - tip_h) / 2);
					var marg_left = Math.round(left + w_compare);
					var marg_top = Math.round(top + org_height + opts.edgeOffset);
					var t_class = "";
					var arrow_top = "";
					var arrow_left = Math.round(tip_w - 12) / 2;
					if (opts.defaultPosition == "bottom") {
						t_class = "_bottom"
					} else if (opts.defaultPosition == "top") {
						t_class = "_top"
					} else if (opts.defaultPosition == "left") {
						t_class = "_left"
					} else if (opts.defaultPosition == "right") {
						t_class = "_right"
					}
					var right_compare = (w_compare + left) < parseInt($(window).scrollLeft());
					var left_compare = (tip_w + left) > parseInt($(window).width());
					if ((right_compare && w_compare < 0) || (t_class == "_right" && !left_compare) || (t_class == "_left" && left < (tip_w + opts.edgeOffset + 5))) {
						t_class = "_right";
						arrow_top = Math.round(tip_h - 13) / 2;
						arrow_left = -12;
						marg_left = Math.round(left + org_width + opts.edgeOffset);
						marg_top = Math.round(top + h_compare)
					} else if ((left_compare && w_compare < 0) || (t_class == "_left" && !right_compare)) {
						t_class = "_left";
						arrow_top = Math.round(tip_h - 13) / 2;
						arrow_left = Math.round(tip_w);
						marg_left = Math.round(left - (tip_w + opts.edgeOffset + 5));
						marg_top = Math.round(top + h_compare)
					}
					var top_compare = (top + org_height + opts.edgeOffset + tip_h + 8) > parseInt($(window).height() + $(window).scrollTop());
					var bottom_compare = ((top + org_height) - (opts.edgeOffset + tip_h + 8)) < 0;
					if (top_compare || (t_class == "_bottom" && top_compare) || (t_class == "_top" && !bottom_compare)) {
						if (t_class == "_top" || t_class == "_bottom") {
							t_class = "_top"
						} else {
							t_class = t_class + "_top"
						}
						arrow_top = tip_h;
						marg_top = Math.round(top - (tip_h + 5 + opts.edgeOffset))
					} else if (bottom_compare | (t_class == "_top" && bottom_compare) || (t_class == "_bottom" && !top_compare)) {
						if (t_class == "_top" || t_class == "_bottom") {
							t_class = "_bottom"
						} else {
							t_class = t_class + "_bottom"
						}
						arrow_top = -12;
						marg_top = Math.round(top + org_height + opts.edgeOffset)
					}
					if (t_class == "_right_top" || t_class == "_left_top") {
						marg_top = marg_top + 5
					} else if (t_class == "_right_bottom" || t_class == "_left_bottom") {
						marg_top = marg_top - 5
					}
					if (t_class == "_left_top" || t_class == "_left_bottom") {
						marg_left = marg_left + 5
					}
					tiptip_arrow.css({
						"margin-left": arrow_left + "px",
						"margin-top": arrow_top + "px"
					});
					tiptip_holder.css({
						"margin-left": marg_left + "px",
						"margin-top": marg_top + "px"
					}).attr("class", "tip" + t_class);
					if (timeout) {
						clearTimeout(timeout)
					}
					timeout = setTimeout(function() {
						tiptip_holder.stop(true, true).fadeIn(opts.fadeIn)
					},
					opts.delay)
				}
				function deactive_tiptip() {
					opts.exit.call(this);
					if (timeout) {
						clearTimeout(timeout)
					}
					tiptip_holder.fadeOut(opts.fadeOut)
				}
			}
		})
	}
	
	$(function () {
		$('.tiptip[title]').tipTip();
		$('.input-tip').tipTip({activation:'focus',defaultPosition:'top'});
	});
})(jQuery);

/* ============================================================
 * Confirm Dialog v1.0
 * code.meside.com/mebasic/javascript#confirm
 * ============================================================
 * Copyright 2012 Methink, Inc. 2012.2.21
 * 
 * By Mino Royuan Wu
 * ============================================================ */
(function($){
	
	$.confirm = function(params){
		
		if($('#confirmOverlay').length){
			// A confirm is already shown on the page:
			return false;
		}
		
		var buttonHTML = '';
		$.each(params.buttons,function(name,obj){
			
			// Generating the markup for the buttons:
			
			buttonHTML += '<a href="#" class="btn '+obj['class']+'">'+name+'</a>';
			
			if(!obj.action){
				obj.action = function(){};
			}
		});
		
		var markup = [
			'<div id="confirmOverlay">',
			'<div id="confirmBox">',
			'<div class="title">',params.title,'</div>',
			'<div class="content">',params.message,'</div>',
			'<div id="confirmButtons">',
			buttonHTML,
			'</div></div></div>'
		].join('');
		
		$(markup).hide().appendTo('body').fadeIn();
		
		var buttons = $('#confirmBox .btn'),
			i = 0;

		$.each(params.buttons,function(name,obj){
			buttons.eq(i++).click(function(){
				
				// Calling the action attribute when a
				// click occurs, and hiding the confirm.
				
				obj.action();
				$.confirm.hide();
				return false;
			});
		});
	}

	$.confirm.hide = function(){
		$('#confirmOverlay').fadeOut(function(){
			$(this).remove();
		});
	}
	
})(jQuery);


/* =========================================================
 * bootstrap-datepicker.js 
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {
	
	// Picker object
	
	var Datepicker = function(element, options){
		this.element = $(element);
		this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
		this.picker = $(DPGlobal.template)
							.appendTo('body')
							.on({
								click: $.proxy(this.click, this),
								mousedown: $.proxy(this.mousedown, this)
							});
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
		
		if (this.isInput) {
			this.element.on({
				focus: $.proxy(this.show, this),
				blur: $.proxy(this.hide, this),
				keyup: $.proxy(this.update, this)
			});
		} else {
			if (this.component){
				this.component.on('click', $.proxy(this.show, this));
			} else {
				this.element.on('click', $.proxy(this.show, this));
			}
		}
		
		this.viewMode = 0;
		this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
		this.weekEnd = this.weekStart == 0 ? 6 : this.weekStart - 1;
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();
	};
	
	Datepicker.prototype = {
		constructor: Datepicker,
		
		show: function(e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e ) {
				e.stopPropagation();
				e.preventDefault();
			}
			if (!this.isInput) {
				$(document).on('mousedown', $.proxy(this.hide, this));
			}
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},
		
		hide: function(){
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = 0;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}
			this.setValue();
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},
		
		setValue: function() {
			var formated = DPGlobal.formatDate(this.date, this.format);
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').prop('value', formated);
				}
				this.element.data('date', formated);
			} else {
				this.element.prop('value', formated);
			}
		},
		
		place: function(){
			var offset = this.component ? this.component.offset() : this.element.offset();
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left
			});
		},
		
		update: function(){
			this.date = DPGlobal.parseDate(
				this.isInput ? this.element.prop('value') : this.element.data('date'),
				this.format
			);
			this.viewDate = new Date(this.date);
			this.fill();
		},
		
		fillDow: function(){
			var dowCnt = this.weekStart;
			var html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">'+DPGlobal.dates.daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},
		
		fillMonths: function(){
			var html = '';
			var i = 0
			while (i < 12) {
				html += '<span class="month">'+DPGlobal.dates.monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').append(html);
		},
		
		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth(),
				currentDate = this.date.valueOf();
			this.picker.find('.datepicker-days th:eq(1)')
						.text(DPGlobal.dates.months[month]+' '+year);
			var prevMonth = new Date(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() == this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getMonth() < month) {
					clsName += ' old';
				} else if (prevMonth.getMonth() > month) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() == currentDate) {
					clsName += ' active';
				}
				html.push('<td class="day'+clsName+'">'+prevMonth.getDate() + '</td>');
				if (prevMonth.getDay() == this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setDate(prevMonth.getDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.getFullYear();
			
			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear == year) {
				months.eq(this.date.getMonth()).addClass('active');
			}
			
			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 || i == 10 ? ' old' : '')+(currentYear == year ? ' active' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},
		
		click: function(e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length == 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								this.viewDate['set'+DPGlobal.modes[this.viewMode].navFnc].call(
									this.viewDate,
									this.viewDate['get'+DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) + 
									DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1)
								);
								this.fill();
								break;
						}
						break;
					case 'span':
						if (target.is('.month')) {
							var month = target.parent().find('span').index(target);
							this.viewDate.setMonth(month);
						} else {
							var year = parseInt(target.text(), 10)||0;
							this.viewDate.setFullYear(year);
						}
						this.showMode(-1);
						this.fill();
						break;
					case 'td':
						if (target.is('.day')){
							var day = parseInt(target.text(), 10)||1;
							var month = this.viewDate.getMonth();
							if (target.is('.old')) {
								month -= 1;
							} else if (target.is('.new')) {
								month += 1;
							}
							var year = this.viewDate.getFullYear();
							this.date = new Date(year, month, day,0,0,0,0);
							this.viewDate = new Date(year, month, day,0,0,0,0);
							this.fill();
							this.setValue();
							this.element.trigger({
								type: 'changeDate',
								date: this.date
							});
						}
						break;
				}
			}
		},
		
		mousedown: function(e){
			e.stopPropagation();
			e.preventDefault();
		},
		
		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(0, Math.min(2, this.viewMode + dir));
			}
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
		}
	};
	
	$.fn.datepicker = function ( option ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
			}
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.datepicker.defaults = {
	};
	$.fn.datepicker.Constructor = Datepicker;
	
	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		dates:{
			/*days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]*/
			days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
			daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
		},
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		parseFormat: function(format){
			var separator = format.match(/[.\/-].*?/),
				parts = format.split(/\W+/);
			if (!separator || !parts || parts.length == 0){
				throw new Error("Invalid date format.");
			}
			return {separator: separator, parts: parts};
		},
		parseDate: function(date, format) {
			var parts = date.split(format.separator),
				date = new Date(2012, 1, 1, 0, 0, 0),
				val;
			if (parts.length == format.parts.length) {
				for (var i=0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10)||1;
					switch(format.parts[i]) {
						case 'dd':
						case 'd':
							date.setDate(val);
							break;
						case 'mm':
						case 'm':
							date.setMonth(val - 1);
							break;
						case 'yy':
							date.setFullYear(2000 + val);
							break;
						case 'yyyy':
							date.setFullYear(val);
							break;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format){
			
			var val = {
				d: date.getDate(),
				m: date.getMonth() + 1,
				yy: date.getFullYear().toString().substring(2),
				yyyy: date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [];
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				date.push(val[format.parts[i]]);
			}
			return date.join(format.separator);
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev"><i class="icon-arrow-left"/></th>'+
								'<th colspan="5" class="switch"></th>'+
								'<th class="next"><i class="icon-arrow-right"/></th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table>'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table>'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table>'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
						'</div>';

}( window.jQuery );


/* ============================================================
 * bootstrap-dropdown.js v1.4.0
 * http://twitter.github.com/bootstrap/javascript.html#dropdown
 * ============================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function( $ ){

  "use strict";

  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function ( selector ) {
    return this.each(function () {
      $(this).delegate(selector || d, 'click', function (e) {
        var li = $(this).parent('li')
          , isActive = li.hasClass('open');

        clearMenus();
        !isActive && li.toggleClass('open');
        return false;
      })
    })
  }

  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  var d = 'a.menu, .dropdown-toggle';

  function clearMenus() {
    $(d).parent('li').removeClass('open');
  }

  $(function () {
    $('html').bind("click", clearMenus);
    $('body').dropdown( '[data-dropdown] a.menu, [data-dropdown] .dropdown-toggle' );
  })

}( window.jQuery || window.ender );

/* Main */
$(document).ready(function(){
	
	function btnDropdownClear(){
		$('.btn-group.open').removeClass('open');
		$('.downlist').parents('.open').removeClass('open');
	}
	
	$('.select').on('click',function(){
		
		var t = $(this);
		if(t.hasClass('open')){
			btnDropdownClear();
		}else{
			btnDropdownClear();
			t.addClass('open');
		}
		
		return false;
	});
	
	$('.btn-group .btn-dropdown').on('click',function(){
		
		var t = $(this);
		if(t.parent().hasClass('open')){
			btnDropdownClear();
		}else{
			btnDropdownClear();
			t.parent().addClass('open');
		}
		
		return false;
	});
	
	$('.input-group .grip').on('click',function(){
		var t = $(this);
		if(t.parent().hasClass('open')){
			btnDropdownClear();
		}else{
			btnDropdownClear();
			t.parent().addClass('open');
		}
		return false;
	});
	
	$('html').on('click', btnDropdownClear);
	
	$('.alert .close').on('click',function(){
		$(this).parent().slideUp();
		return false;
	});
	
	$('.select .downlist a').on('click',function(){
		//alert('测试');
		var value = $(this).attr('value');
		var content = $(this).html();
		var selectBox = $(this).parents('.select');
		selectBox.attr('value',value);
		selectBox.find('input.data').attr('value',value);
		selectBox.find('.title div').html(content);
	});
	
	$('.input-group .downlist a').on('click',function(){
		var t = $(this);
		var value = t.attr('value');
		t.parents('.input-group').find('input').attr('value',value);
	});
	
	/*$('.input-group input').on('focusin',function(){
		$(this).parent().addClass('open');
	}).on('focusout',function(){
		$(this).parent().removeClass('open');
	});*/
	
});

(function($) {
	$.fn.warmTip = function(){
		return this.each(function(){
			var flashWidth = $(this).width();
			var flashWidthLeft = ($(window).width()-flashWidth)/2;
			$(this).css({left:flashWidthLeft});
			$(this).on('click',function(){
				$(this).hide();
				return false;
			});
		});
	}
	$(function () {
		$('.warm-tip').warmTip();
		setTimeout(function(){
			$('.warm-tip').fadeOut();
		},3000);
	});
})(jQuery);