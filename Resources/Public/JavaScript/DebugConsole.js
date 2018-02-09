/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery"],function(a,b,c){"use strict";var d=function(){function a(){var a=this;this.settings={autoscroll:!0},c(function(){a.createDom()})}return a.incrementInactiveTabCounter=function(a){if(!a.hasClass("active")){var b=a.find(".badge"),c=parseInt(b.text(),10);isNaN(c)&&(c=0),b.text(++c)}},a.prototype.add=function(b,d,e){this.attachToViewport();var f=c("<p />").html(b);"undefined"!=typeof d&&d.length>0&&f.prepend(c("<strong />").text(d)),"undefined"!=typeof e&&0!==e.length||(e="Debug");var g="debugtab-"+e.toLowerCase().replace(/\W+/g,"-"),h=this.$consoleDom.find(".t3js-debuggroups"),i=this.$consoleDom.find(".t3js-debugcontent"),j=this.$consoleDom.find(".t3js-debuggroups li[data-identifier="+g+"]");0===j.length&&(j=c("<li />",{role:"presentation","data-identifier":g}).append(c("<a />",{"aria-controls":g,"data-toggle":"tab",href:"#"+g,role:"tab"}).text(e+" ").append(c("<span />",{class:"badge"}))).on("shown.bs.tab",function(a){c(a.currentTarget).find(".badge").text("")}),h.append(j),i.append(c("<div />",{role:"tabpanel",class:"tab-pane",id:g}).append(c("<div />",{class:"t3js-messages messages"})))),0===h.find(".active").length&&h.find("a:first").tab("show"),a.incrementInactiveTabCounter(j),this.incrementUnreadMessagesIfCollapsed();var k=c("#"+g+" .t3js-messages"),l=k.parent().hasClass("active");k.append(f),this.settings.autoscroll&&l&&k.scrollTop(k.prop("scrollHeight"))},a.prototype.createDom=function(){var a=this;"undefined"==typeof this.$consoleDom&&(this.$consoleDom=c("<div />",{id:"typo3-debug-console"}).append(c("<div />",{class:"t3js-topbar topbar"}).append(c("<p />",{class:"pull-left"}).text(" TYPO3 Debug Console").prepend(c("<span />",{class:"fa fa-terminal topbar-icon"})).append(c("<span />",{class:"badge"})),c("<div />",{class:"t3js-buttons btn-group pull-right"})),c("<div />").append(c("<div />",{role:"tabpanel"}).append(c("<ul />",{class:"nav nav-tabs t3js-debuggroups",role:"tablist"})),c("<div />",{class:"tab-content t3js-debugcontent"}))),this.addButton(c("<button />",{class:"btn btn-default btn-sm "+(this.settings.autoscroll?"active":""),title:TYPO3.lang["debuggerconsole.autoscroll"]}).append(c("<span />",{class:"t3-icon fa fa-magnet"})),function(){c(a).button("toggle"),a.settings.autoscroll=!a.settings.autoscroll}).addButton(c("<button />",{class:"btn btn-default btn-sm",title:TYPO3.lang["debuggerconsole.toggle.collapse"]}).append(c("<span />",{class:"t3-icon fa fa-chevron-down"})),function(b){var d=c(b.currentTarget),e=d.find(".t3-icon"),f=a.$consoleDom.find(".t3js-topbar").next();f.toggle(),f.is(":visible")?(d.attr("title",TYPO3.lang["debuggerconsole.toggle.collapse"]),e.toggleClass("fa-chevron-down",!0).toggleClass("fa-chevron-up",!1),a.resetGlobalUnreadCounter()):(d.attr("title",TYPO3.lang["debuggerconsole.toggle.expand"]),e.toggleClass("fa-chevron-down",!1).toggleClass("fa-chevron-up",!0))}).addButton(c("<button />",{class:"btn btn-default btn-sm",title:TYPO3.lang["debuggerconsole.clear"]}).append(c("<span />",{class:"t3-icon fa fa-undo"})),function(){a.flush()}).addButton(c("<button />",{class:"btn btn-default btn-sm",title:TYPO3.lang["debuggerconsole.close"]}).append(c("<span />",{class:"t3-icon fa fa-times"})),function(){a.destroy(),a.createDom()}))},a.prototype.addButton=function(a,b){return a.on("click",b),this.$consoleDom.find(".t3js-buttons").append(a),this},a.prototype.attachToViewport=function(){var a=c(".t3js-scaffold-content");0===a.has(this.$consoleDom).length&&a.append(this.$consoleDom)},a.prototype.incrementUnreadMessagesIfCollapsed=function(){var a=this.$consoleDom.find(".t3js-topbar"),b=a.next();if(b.is(":hidden")){var c=a.find(".badge"),d=parseInt(c.text(),10);isNaN(d)&&(d=0),c.text(++d)}},a.prototype.resetGlobalUnreadCounter=function(){this.$consoleDom.find(".t3js-topbar").find(".badge").text("")},a.prototype.flush=function(){var a=this.$consoleDom.find(".t3js-debuggroups"),b=this.$consoleDom.find(".t3js-debugcontent");a.children().remove(),b.children().remove()},a.prototype.destroy=function(){this.$consoleDom.remove(),this.$consoleDom=void 0},a}(),e=new d;return TYPO3.DebugConsole=e,e});