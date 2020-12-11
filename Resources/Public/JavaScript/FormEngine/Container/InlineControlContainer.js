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
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","jquery","../../Utility/MessageUtility","./../InlineRelation/AjaxDispatcher","nprogress","Sortable","TYPO3/CMS/Backend/FormEngine","TYPO3/CMS/Backend/FormEngineValidation","../../Icons","../../InfoWindow","../../Modal","../../Notification","TYPO3/CMS/Core/Event/RegularEvent","../../Severity","../../Utility"],(function(e,t,n,o,i,a,r,s,l,c,d,u,h,p,g,m){"use strict";var f,b,j,v;n=__importDefault(n),function(e){e.toggleSelector='[data-toggle="formengine-inline"]',e.controlSectionSelector=".t3js-formengine-irre-control",e.createNewRecordButtonSelector=".t3js-create-new-button",e.createNewRecordBySelectorSelector=".t3js-create-new-selector",e.deleteRecordButtonSelector=".t3js-editform-delete-inline-record",e.enableDisableRecordButtonSelector=".t3js-toggle-visibility-button",e.infoWindowButton='[data-action="infowindow"]',e.synchronizeLocalizeRecordButtonSelector=".t3js-synchronizelocalize-button",e.uniqueValueSelectors="select.t3js-inline-unique",e.revertUniqueness=".t3js-revert-unique",e.controlContainer=".t3js-inline-controls"}(f||(f={})),function(e){e.new="inlineIsNewRecord",e.visible="panel-visible",e.collapsed="panel-collapsed",e.notLoaded="t3js-not-loaded"}(b||(b={})),function(e){e.structureSeparator="-"}(j||(j={})),function(e){e.DOWN="down",e.UP="up"}(v||(v={}));class y{constructor(e){this.container=null,this.ajaxDispatcher=null,this.appearance=null,this.requestQueue={},this.progessQueue={},this.noTitleString=TYPO3.lang?TYPO3.lang["FormEngine.noRecordTitle"]:"[No title]",this.handlePostMessage=e=>{if(!o.MessageUtility.verifyOrigin(e.origin))throw"Denied message sent by "+e.origin;if("typo3:foreignRelation:insert"===e.data.actionName){if(void 0===e.data.objectGroup)throw"No object group defined for message";if(e.data.objectGroup!==this.container.dataset.objectGroup)return;if(this.isUniqueElementUsed(parseInt(e.data.uid,10),e.data.table))return void h.error("There is already a relation to the selected element");this.importRecord([e.data.objectGroup,e.data.uid]).then(()=>{if(e.source){const t={actionName:"typo3:foreignRelation:inserted",objectGroup:e.data.objectId,table:e.data.table,uid:e.data.uid};o.MessageUtility.send(t,e.source)}})}else console.warn(`Unhandled action "${e.data.actionName}"`)},n.default(()=>{this.container=document.getElementById(e),this.ajaxDispatcher=new i.AjaxDispatcher(this.container.dataset.objectGroup),this.registerEvents()})}static getInlineRecordContainer(e){return document.querySelector('[data-object-id="'+e+'"]')}static getCollapseButton(e){return document.querySelector('[aria-controls="'+e+'_fields"]')}static toggleElement(e){const t=y.getInlineRecordContainer(e);t.classList.contains(b.collapsed)?y.expandElement(t,e):y.collapseElement(t,e)}static collapseElement(e,t){const n=y.getCollapseButton(t);e.classList.remove(b.visible),e.classList.add(b.collapsed),n.setAttribute("aria-expanded","false")}static expandElement(e,t){const n=y.getCollapseButton(t);e.classList.remove(b.collapsed),e.classList.add(b.visible),n.setAttribute("aria-expanded","true")}static isNewRecord(e){return y.getInlineRecordContainer(e).classList.contains(b.new)}static updateExpandedCollapsedStateLocally(e,t){const n=y.getInlineRecordContainer(e),o="uc[inlineView]["+n.dataset.topmostParentTable+"]["+n.dataset.topmostParentUid+"]"+n.dataset.fieldName,i=document.getElementsByName(o);i.length&&(i[0].value=t?"1":"0")}static getValuesFromHashMap(e){return Object.keys(e).map(t=>e[t])}static selectOptionValueExists(e,t){return null!==e.querySelector('option[value="'+t+'"]')}static removeSelectOptionByValue(e,t){const n=e.querySelector('option[value="'+t+'"]');null!==n&&n.remove()}static reAddSelectOption(e,t,n){if(y.selectOptionValueExists(e,t))return;const o=e.querySelectorAll("option");let i=-1;for(let e of Object.keys(n.possible)){if(e===t)break;for(let t=0;t<o.length;++t){if(o[t].value===e){i=t;break}}}-1===i?i=0:i<o.length&&i++;const a=document.createElement("option");a.text=n.possible[t],a.value=t,e.insertBefore(a,e.options[i])}registerEvents(){if(this.registerInfoButton(),this.registerSort(),this.registerCreateRecordButton(),this.registerEnableDisableButton(),this.registerDeleteButton(),this.registerSynchronizeLocalize(),this.registerRevertUniquenessAction(),this.registerToggle(),this.registerCreateRecordBySelector(),this.registerUniqueSelectFieldChanged(),new p("message",this.handlePostMessage).bindTo(window),this.getAppearance().useSortable){const e=document.getElementById(this.container.getAttribute("id")+"_records");new r(e,{group:e.getAttribute("id"),handle:".sortableHandle",onSort:()=>{this.updateSorting()}})}}registerToggle(){const e=this;new p("click",(function(t){t.preventDefault(),t.stopImmediatePropagation(),e.loadRecordDetails(this.closest(f.toggleSelector).parentElement.dataset.objectId)})).delegateTo(this.container,`${f.toggleSelector} .form-irre-header-cell:not(${f.controlSectionSelector}`)}registerSort(){const e=this;new p("click",(function(t){t.preventDefault(),t.stopImmediatePropagation(),e.changeSortingByButton(this.closest("[data-object-id]").dataset.objectId,this.dataset.direction)})).delegateTo(this.container,f.controlSectionSelector+' [data-action="sort"]')}registerCreateRecordButton(){const e=this;new p("click",(function(t){var n,o;if(t.preventDefault(),t.stopImmediatePropagation(),e.isBelowMax()){let t=e.container.dataset.objectGroup;void 0!==this.dataset.recordUid&&(t+=j.structureSeparator+this.dataset.recordUid),e.importRecord([t,null===(n=e.container.querySelector(f.createNewRecordBySelectorSelector))||void 0===n?void 0:n.value],null!==(o=this.dataset.recordUid)&&void 0!==o?o:null)}})).delegateTo(this.container,f.createNewRecordButtonSelector)}registerCreateRecordBySelector(){const e=this;new p("change",(function(t){t.preventDefault(),t.stopImmediatePropagation();const n=this.options[this.selectedIndex].getAttribute("value");e.importRecord([e.container.dataset.objectGroup,n])})).delegateTo(this.container,f.createNewRecordBySelectorSelector)}createRecord(e,t,n=null,o=null){let i=this.container.dataset.objectGroup;null!==n&&(i+=j.structureSeparator+n),null!==n?(y.getInlineRecordContainer(i).insertAdjacentHTML("afterend",t),this.memorizeAddRecord(e,n,o)):(document.getElementById(this.container.getAttribute("id")+"_records").insertAdjacentHTML("beforeend",t),this.memorizeAddRecord(e,null,o))}async importRecord(e,t){return this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_create")),e).then(async e=>{this.isBelowMax()&&(this.createRecord(e.compilerInput.uid,e.data,void 0!==t?t:null,void 0!==e.compilerInput.childChildUid?e.compilerInput.childChildUid:null),s.reinitialize(),l.initializeInputFields(),l.validate(this.container))})}registerEnableDisableButton(){new p("click",(function(e){e.preventDefault(),e.stopImmediatePropagation();const t=this.closest("[data-object-id]").dataset.objectId,n=y.getInlineRecordContainer(t),o="data"+n.dataset.fieldName+"["+this.dataset.hiddenField+"]",i=document.querySelector('[data-formengine-input-name="'+o+'"'),a=document.querySelector('[name="'+o+'"');null!==i&&null!==a&&(i.checked=!i.checked,a.value=i.checked?"1":"0",TBE_EDITOR.fieldChanged_fName(o,o));const r="t3-form-field-container-inline-hidden";let s="";n.classList.contains(r)?(s="actions-edit-hide",n.classList.remove(r)):(s="actions-edit-unhide",n.classList.add(r)),c.getIcon(s,c.sizes.small).then(e=>{this.replaceChild(document.createRange().createContextualFragment(e),this.querySelector(".t3js-icon"))})})).delegateTo(this.container,f.enableDisableRecordButtonSelector)}registerInfoButton(){new p("click",(function(e){e.preventDefault(),e.stopImmediatePropagation(),d.showItem(this.dataset.infoTable,this.dataset.infoUid)})).delegateTo(this.container,f.infoWindowButton)}registerDeleteButton(){const e=this;new p("click",(function(t){t.preventDefault(),t.stopImmediatePropagation();const n=TYPO3.lang["label.confirm.delete_record.title"]||"Delete this record?",o=TYPO3.lang["label.confirm.delete_record.content"]||"Are you sure you want to delete this record?";u.confirm(n,o,g.warning,[{text:TYPO3.lang["buttons.confirm.delete_record.no"]||"Cancel",active:!0,btnClass:"btn-default",name:"no"},{text:TYPO3.lang["buttons.confirm.delete_record.yes"]||"Yes, delete this record",btnClass:"btn-warning",name:"yes"}]).on("button.clicked",t=>{if("yes"===t.target.name){const t=this.closest("[data-object-id]").dataset.objectId;e.deleteRecord(t)}u.dismiss()})})).delegateTo(this.container,f.deleteRecordButtonSelector)}registerSynchronizeLocalize(){const e=this;new p("click",(function(t){t.preventDefault(),t.stopImmediatePropagation(),e.ajaxDispatcher.send(e.ajaxDispatcher.newRequest(e.ajaxDispatcher.getEndpoint("record_inline_synchronizelocalize")),[e.container.dataset.objectGroup,this.dataset.type]).then(async t=>{document.getElementById(e.container.getAttribute("id")+"_records").insertAdjacentHTML("beforeend",t.data);const n=e.container.dataset.objectGroup+j.structureSeparator;for(let o of t.compilerInput.delete)e.deleteRecord(n+o,!0);for(let o of Object.values(t.compilerInput.localize)){if(void 0!==o.remove){const e=y.getInlineRecordContainer(n+o.remove);e.parentElement.removeChild(e)}e.memorizeAddRecord(o.uid,null,o.selectedValue)}})})).delegateTo(this.container,f.synchronizeLocalizeRecordButtonSelector)}registerUniqueSelectFieldChanged(){const e=this;new p("change",(function(t){t.preventDefault(),t.stopImmediatePropagation();const n=this.closest("[data-object-id]");if(null!==n){const t=n.dataset.objectId,o=n.dataset.objectUid;e.handleChangedField(this,t);const i=e.getFormFieldForElements();if(null===i)return;e.updateUnique(this,i,o)}})).delegateTo(this.container,f.uniqueValueSelectors)}registerRevertUniquenessAction(){const e=this;new p("click",(function(t){t.preventDefault(),t.stopImmediatePropagation(),e.revertUnique(this.dataset.uid)})).delegateTo(this.container,f.revertUniqueness)}loadRecordDetails(e){const t=document.getElementById(e+"_fields"),n=y.getInlineRecordContainer(e),o=void 0!==this.requestQueue[e];if(null!==t&&!n.classList.contains(b.notLoaded))this.collapseExpandRecord(e);else{const i=this.getProgress(e,n.dataset.objectIdHash);if(o)this.requestQueue[e].abort(),delete this.requestQueue[e],delete this.progessQueue[e],i.done();else{const o=this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_details"));this.ajaxDispatcher.send(o,[e]).then(async o=>{if(delete this.requestQueue[e],delete this.progessQueue[e],n.classList.remove(b.notLoaded),t.innerHTML=o.data,this.collapseExpandRecord(e),i.done(),s.reinitialize(),l.initializeInputFields(),l.validate(this.container),this.hasObjectGroupDefinedUniqueConstraints()){const t=y.getInlineRecordContainer(e);this.removeUsed(t)}}),this.requestQueue[e]=o,i.start()}}}collapseExpandRecord(e){const t=y.getInlineRecordContainer(e),n=!0===this.getAppearance().expandSingle,o=t.classList.contains(b.collapsed);let i=[];const a=[];n&&o&&(i=this.collapseAllRecords(t.dataset.objectUid)),y.toggleElement(e),y.isNewRecord(e)?y.updateExpandedCollapsedStateLocally(e,o):o?a.push(t.dataset.objectUid):o||i.push(t.dataset.objectUid),this.ajaxDispatcher.send(this.ajaxDispatcher.newRequest(this.ajaxDispatcher.getEndpoint("record_inline_expandcollapse")),[e,a.join(","),i.join(",")])}memorizeAddRecord(e,t=null,o=null){const i=this.getFormFieldForElements();if(null===i)return;let a=m.trimExplode(",",i.value);if(t){const n=[];for(let o=0;o<a.length;o++)a[o].length&&n.push(a[o]),t===a[o]&&n.push(e);a=n}else a.push(e);i.value=a.join(","),i.classList.add("has-change"),n.default(document).trigger("change"),this.redrawSortingButtons(this.container.dataset.objectGroup,a),this.setUnique(e,o),this.isBelowMax()||this.toggleContainerControls(!1),TBE_EDITOR.fieldChanged_fName(i.name,i)}memorizeRemoveRecord(e){const t=this.getFormFieldForElements();if(null===t)return[];let o=m.trimExplode(",",t.value);const i=o.indexOf(e);return i>-1&&(delete o[i],t.value=o.join(","),t.classList.add("has-change"),n.default(document).trigger("change"),this.redrawSortingButtons(this.container.dataset.objectGroup,o)),o}changeSortingByButton(e,t){const n=y.getInlineRecordContainer(e),o=n.dataset.objectUid,i=document.getElementById(this.container.getAttribute("id")+"_records"),a=Array.from(i.children).map(e=>e.dataset.objectUid);let r=a.indexOf(o),s=!1;if(t===v.UP&&r>0?(a[r]=a[r-1],a[r-1]=o,s=!0):t===v.DOWN&&r<a.length-1&&(a[r]=a[r+1],a[r+1]=o,s=!0),s){const e=this.container.dataset.objectGroup+j.structureSeparator,o=t===v.UP?1:0;n.parentElement.insertBefore(y.getInlineRecordContainer(e+a[r-o]),y.getInlineRecordContainer(e+a[r+1-o])),this.updateSorting()}}updateSorting(){const e=this.getFormFieldForElements();if(null===e)return;const t=document.getElementById(this.container.getAttribute("id")+"_records"),o=Array.from(t.querySelectorAll('[data-object-parent-group="'+this.container.dataset.objectGroup+'"][data-placeholder-record="0"]')).map(e=>e.dataset.objectUid);e.value=o.join(","),e.classList.add("has-change"),n.default(document).trigger("inline:sorting-changed"),n.default(document).trigger("change"),this.redrawSortingButtons(this.container.dataset.objectGroup,o)}deleteRecord(e,t=!1){const n=y.getInlineRecordContainer(e),o=n.dataset.objectUid;if(n.classList.add("t3js-inline-record-deleted"),!y.isNewRecord(e)&&!t){const e=this.container.querySelector('[name="cmd'+n.dataset.fieldName+'[delete]"]');e.removeAttribute("disabled"),n.parentElement.insertAdjacentElement("afterbegin",e)}new p("transitionend",()=>{n.parentElement.removeChild(n),l.validate(this.container)}).bindTo(n),this.revertUnique(o),this.memorizeRemoveRecord(o),n.classList.add("form-irre-object--deleted"),this.isBelowMax()&&this.toggleContainerControls(!0)}toggleContainerControls(e){this.container.querySelector(f.controlContainer).querySelectorAll("a").forEach(t=>{t.style.display=e?null:"none"})}getProgress(e,t){const n="#"+t+"_header";let o;return void 0!==this.progessQueue[e]?o=this.progessQueue[e]:(o=a,o.configure({parent:n,showSpinner:!1}),this.progessQueue[e]=o),o}collapseAllRecords(e){const t=this.getFormFieldForElements(),n=[];if(null!==t){const o=m.trimExplode(",",t.value);for(let t of o){if(t===e)continue;const o=this.container.dataset.objectGroup+j.structureSeparator+t,i=y.getInlineRecordContainer(o);i.classList.contains(b.visible)&&(y.collapseElement(i,o),y.isNewRecord(o)?y.updateExpandedCollapsedStateLocally(o,!1):n.push(t))}}return n}getFormFieldForElements(){const e=document.getElementsByName(this.container.dataset.formField);return e.length>0?e[0]:null}redrawSortingButtons(e,t=[]){if(0===t.length){const e=this.getFormFieldForElements();null!==e&&(t=m.trimExplode(",",e.value))}0!==t.length&&t.forEach((n,o)=>{const i=y.getInlineRecordContainer(e+j.structureSeparator+n).dataset.objectIdHash+"_header",a=document.getElementById(i),r=a.querySelector('[data-action="sort"][data-direction="'+v.UP+'"]');if(null!==r){let e="actions-move-up";0===o?(r.classList.add("disabled"),e="empty-empty"):r.classList.remove("disabled"),c.getIcon(e,c.sizes.small).then(e=>{r.replaceChild(document.createRange().createContextualFragment(e),r.querySelector(".t3js-icon"))})}const s=a.querySelector('[data-action="sort"][data-direction="'+v.DOWN+'"]');if(null!==s){let e="actions-move-down";o===t.length-1?(s.classList.add("disabled"),e="empty-empty"):s.classList.remove("disabled"),c.getIcon(e,c.sizes.small).then(e=>{s.replaceChild(document.createRange().createContextualFragment(e),s.querySelector(".t3js-icon"))})}})}isBelowMax(){const e=this.getFormFieldForElements();if(null===e)return!0;if(void 0!==TYPO3.settings.FormEngineInline.config[this.container.dataset.objectGroup]){if(m.trimExplode(",",e.value).length>=TYPO3.settings.FormEngineInline.config[this.container.dataset.objectGroup].max)return!1;if(this.hasObjectGroupDefinedUniqueConstraints()){const e=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];if(e.used.length>=e.max&&e.max>=0)return!1}}return!0}isUniqueElementUsed(e,t){if(!this.hasObjectGroupDefinedUniqueConstraints())return!1;const n=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],o=y.getValuesFromHashMap(n.used);if("select"===n.type&&-1!==o.indexOf(e))return!0;if("groupdb"===n.type)for(let n=o.length-1;n>=0;n--)if(o[n].table===t&&o[n].uid===e)return!0;return!1}removeUsed(e){if(!this.hasObjectGroupDefinedUniqueConstraints())return;const t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];if("select"!==t.type)return;let n=e.querySelector('[name="data['+t.table+"]["+e.dataset.objectUid+"]["+t.field+']"]');const o=y.getValuesFromHashMap(t.used);if(null!==n){const e=n.options[n.selectedIndex].value;for(let t of o)t!==e&&y.removeSelectOptionByValue(n,t)}}setUnique(e,t){if(!this.hasObjectGroupDefinedUniqueConstraints())return;const n=document.getElementById(this.container.dataset.objectGroup+"_selector"),o=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup];if("select"===o.type){if(!o.selector||-1!==o.max){const i=this.getFormFieldForElements(),a=this.container.dataset.objectGroup+j.structureSeparator+e;let r=y.getInlineRecordContainer(a).querySelector('[name="data['+o.table+"]["+e+"]["+o.field+']"]');const s=y.getValuesFromHashMap(o.used);if(null!==n){if(null!==r){for(let e of s)y.removeSelectOptionByValue(r,e);o.selector||(t=r.options[0].value,r.options[0].selected=!0,this.updateUnique(r,i,e),this.handleChangedField(r,this.container.dataset.objectGroup+"["+e+"]"))}for(let e of s)y.removeSelectOptionByValue(r,e);void 0!==o.used.length&&(o.used={}),o.used[e]={table:o.elTable,uid:t}}if(null!==i&&y.selectOptionValueExists(n,t)){const n=m.trimExplode(",",i.value);for(let i of n)r=document.querySelector('[name="data['+o.table+"]["+i+"]["+o.field+']"]'),null!==r&&i!==e&&y.removeSelectOptionByValue(r,t)}}}else"groupdb"===o.type&&(o.used[e]={table:o.elTable,uid:t});"select"===o.selector&&y.selectOptionValueExists(n,t)&&(y.removeSelectOptionByValue(n,t),o.used[e]={table:o.elTable,uid:t})}updateUnique(e,t,n){if(!this.hasObjectGroupDefinedUniqueConstraints())return;const o=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],i=o.used[n];if("select"===o.selector){const t=document.getElementById(this.container.dataset.objectGroup+"_selector");y.removeSelectOptionByValue(t,e.value),void 0!==i&&y.reAddSelectOption(t,i,o)}if(o.selector&&-1===o.max)return;if(!o||null===t)return;const a=m.trimExplode(",",t.value);let r;for(let t of a)r=document.querySelector('[name="data['+o.table+"]["+t+"]["+o.field+']"]'),null!==r&&r!==e&&(y.removeSelectOptionByValue(r,e.value),void 0!==i&&y.reAddSelectOption(r,i,o));o.used[n]=e.value}revertUnique(e){if(!this.hasObjectGroupDefinedUniqueConstraints())return;const t=TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup],n=this.container.dataset.objectGroup+j.structureSeparator+e,o=y.getInlineRecordContainer(n);let i=o.querySelector('[name="data['+t.table+"]["+o.dataset.objectUid+"]["+t.field+']"]');if("select"===t.type){let n;if(null!==i)n=i.value;else{if(""===o.dataset.tableUniqueOriginalValue)return;n=o.dataset.tableUniqueOriginalValue}if("select"===t.selector&&!isNaN(parseInt(n,10))){const e=document.getElementById(this.container.dataset.objectGroup+"_selector");y.reAddSelectOption(e,n,t)}if(t.selector&&-1===t.max)return;const a=this.getFormFieldForElements();if(null===a)return;const r=m.trimExplode(",",a.value);let s;for(let e=0;e<r.length;e++)s=document.querySelector('[name="data['+t.table+"]["+r[e]+"]["+t.field+']"]'),null!==s&&y.reAddSelectOption(s,n,t);delete t.used[e]}else"groupdb"===t.type&&delete t.used[e]}hasObjectGroupDefinedUniqueConstraints(){return void 0!==TYPO3.settings.FormEngineInline.unique&&void 0!==TYPO3.settings.FormEngineInline.unique[this.container.dataset.objectGroup]}handleChangedField(e,t){let n;n=e instanceof HTMLSelectElement?e.options[e.selectedIndex].text:e.value,document.getElementById(t+"_label").textContent=n.length?n:this.noTitleString}getAppearance(){if(null===this.appearance&&(this.appearance={},"string"==typeof this.container.dataset.appearance))try{this.appearance=JSON.parse(this.container.dataset.appearance)}catch(e){console.error(e)}return this.appearance}}return y}));