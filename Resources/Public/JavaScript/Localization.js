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
define(["require","exports","./Enum/Severity","jquery","./Icons","./Wizard"],(function(e,t,a,l,o,n){"use strict";return new class{constructor(){this.triggerButton=".t3js-localize",this.localizationMode=null,this.sourceLanguage=null,this.records=[],l(()=>{this.initialize()})}initialize(){const e=this;o.getIcon("actions-localize",o.sizes.large).done(t=>{o.getIcon("actions-edit-copy",o.sizes.large).done(s=>{l(e.triggerButton).removeClass("disabled"),l(document).on("click",e.triggerButton,e=>{e.preventDefault();const i=l(e.currentTarget),c=[];let d="";i.data("allowTranslate")&&c.push('<div class="row"><div class="btn-group col-sm-3"><label class="btn btn-block btn-default t3js-localization-option" data-helptext=".t3js-helptext-translate">'+t+'<input type="radio" name="mode" id="mode_translate" value="localize" style="display: none"><br>Translate</label></div><div class="col-sm-9"><p class="t3js-helptext t3js-helptext-translate text-muted">'+TYPO3.lang["localize.educate.translate"]+"</p></div></div>"),i.data("allowCopy")&&c.push('<div class="row"><div class="col-sm-3 btn-group"><label class="btn btn-block btn-default t3js-localization-option" data-helptext=".t3js-helptext-copy">'+s+'<input type="radio" name="mode" id="mode_copy" value="copyFromLanguage" style="display: none"><br>Copy</label></div><div class="col-sm-9"><p class="t3js-helptext t3js-helptext-copy text-muted">'+TYPO3.lang["localize.educate.copy"]+"</p></div></div>"),d+='<div data-toggle="buttons">'+c.join("<hr>")+"</div>",n.addSlide("localize-choose-action",TYPO3.lang["localize.wizard.header_page"].replace("{0}",i.data("page")).replace("{1}",i.data("languageName")),d,a.SeverityEnum.info),n.addSlide("localize-choose-language",TYPO3.lang["localize.view.chooseLanguage"],"",a.SeverityEnum.info,e=>{o.getIcon("spinner-circle-dark",o.sizes.large).done(t=>{e.html('<div class="text-center">'+t+"</div>"),this.loadAvailableLanguages(parseInt(i.data("pageId"),10),parseInt(i.data("languageId"),10)).done(t=>{if(1===t.length)return this.sourceLanguage=t[0].uid,void n.unlockNextStep().trigger("click");n.getComponent().on("click",".t3js-language-option",e=>{const t=l(e.currentTarget).find('input[type="radio"]');this.sourceLanguage=t.val(),console.log("Localization.ts@132",this.sourceLanguage),n.unlockNextStep()});const a=l("<div />",{class:"row","data-toggle":"buttons"});for(const e of t)a.append(l("<div />",{class:"col-sm-4"}).append(l("<label />",{class:"btn btn-default btn-block t3js-language-option option"}).text(" "+e.title).prepend(e.flagIcon).prepend(l("<input />",{type:"radio",name:"language",id:"language"+e.uid,value:e.uid,style:"display: none;"}))));e.empty().append(a)})})}),n.addSlide("localize-summary",TYPO3.lang["localize.view.summary"],"",a.SeverityEnum.info,e=>{o.getIcon("spinner-circle-dark",o.sizes.large).done(t=>{e.html('<div class="text-center">'+t+"</div>")}),this.getSummary(parseInt(i.data("pageId"),10),parseInt(i.data("languageId"),10)).done(t=>{e.empty(),this.records=[];const a=t.columns.columns;t.columns.columnList.forEach(o=>{if(void 0===t.records[o])return;const n=a[o],s=l("<div />",{class:"row"});t.records[o].forEach(e=>{const t=" ("+e.uid+") "+e.title;this.records.push(e.uid),s.append(l("<div />",{class:"col-sm-6"}).append(l("<div />",{class:"input-group"}).append(l("<span />",{class:"input-group-addon"}).append(l("<input />",{type:"checkbox",class:"t3js-localization-toggle-record",id:"record-uid-"+e.uid,checked:"checked","data-uid":e.uid,"aria-label":t})),l("<label />",{class:"form-control",for:"record-uid-"+e.uid}).text(t).prepend(e.icon))))}),e.append(l("<fieldset />",{class:"localization-fieldset"}).append(l("<label />").text(n).prepend(l("<input />",{class:"t3js-localization-toggle-column",type:"checkbox",checked:"checked"})),s))}),n.unlockNextStep(),n.getComponent().on("change",".t3js-localization-toggle-record",e=>{const t=l(e.currentTarget),a=t.data("uid"),o=t.closest("fieldset"),s=o.find(".t3js-localization-toggle-column");if(t.is(":checked"))this.records.push(a);else{const e=this.records.indexOf(a);e>-1&&this.records.splice(e,1)}const i=o.find(".t3js-localization-toggle-record"),c=o.find(".t3js-localization-toggle-record:checked");s.prop("checked",c.length>0),s.prop("indeterminate",c.length>0&&c.length<i.length),this.records.length>0?n.unlockNextStep():n.lockNextStep()}).on("change",".t3js-localization-toggle-column",e=>{const t=l(e.currentTarget),a=t.closest("fieldset").find(".t3js-localization-toggle-record");a.prop("checked",t.is(":checked")),a.trigger("change")})})}),n.addFinalProcessingSlide(()=>{this.localizeRecords(parseInt(i.data("pageId"),10),parseInt(i.data("languageId"),10),this.records).done(()=>{n.dismiss(),document.location.reload()})}).done(()=>{n.show(),n.getComponent().on("click",".t3js-localization-option",e=>{const t=l(e.currentTarget),a=t.find('input[type="radio"]');if(t.data("helptext")){const a=l(e.delegateTarget);a.find(".t3js-helptext").addClass("text-muted"),a.find(t.data("helptext")).removeClass("text-muted")}this.localizationMode=a.val(),n.unlockNextStep()})})})})})}loadAvailableLanguages(e,t){return l.ajax({url:TYPO3.settings.ajaxUrls.page_languages,data:{pageId:e,languageId:t}})}getSummary(e,t){return l.ajax({url:TYPO3.settings.ajaxUrls.records_localize_summary,data:{pageId:e,destLanguageId:t,languageId:this.sourceLanguage}})}localizeRecords(e,t,a){return l.ajax({url:TYPO3.settings.ajaxUrls.records_localize,data:{pageId:e,srcLanguageId:this.sourceLanguage,destLanguageId:t,action:this.localizationMode,uidList:a}})}}}));