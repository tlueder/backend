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
define(["require","exports","TYPO3/CMS/Core/Event/DebounceEvent","TYPO3/CMS/Core/Event/RegularEvent","./Input/Clearable"],(function(e,t,s,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(e){this.context=e.get(0),this.searchField=this.context.querySelector(".t3js-contentWizard-search"),this.registerClearable(),this.registerEvents()}static getTabIdentifier(e){const t=e.querySelector("a"),[,s]=t.href.split("#");return s}static countVisibleContentElements(e){return e.querySelectorAll(".t3js-media-new-content-element-wizard:not(.hidden)").length}focusSearchField(){this.searchField.focus()}registerClearable(){this.searchField.clearable({onClear:e=>{e.value="",this.filterElements(e)}})}registerEvents(){new i("keydown",e=>{const t=e.target;"Escape"===e.code&&(e.stopImmediatePropagation(),t.value="")}).bindTo(this.searchField),new s("keyup",e=>{this.filterElements(e.target)},150).bindTo(this.searchField),new i("submit",e=>{e.preventDefault()}).bindTo(this.searchField.closest("form")),new i("click",e=>{e.preventDefault(),e.stopPropagation()}).delegateTo(this.context,".t3js-tabs .disabled")}filterElements(e){const t=e.closest("form"),s=t.querySelector(".t3js-tabs"),i=t.querySelector(".t3js-filter-noresult");t.querySelectorAll(".t3js-media-new-content-element-wizard").forEach(t=>{const s=t.textContent.trim().replace(/\s+/g," ");t.classList.toggle("hidden",""!==e.value&&!RegExp(e.value,"i").test(s))});const n=r.countVisibleContentElements(t);s.parentElement.classList.toggle("hidden",0===n),i.classList.toggle("hidden",n>0),this.switchTabIfNecessary(s)}switchTabIfNecessary(e){const t=e.querySelector(".active").parentElement,s=Array.from(t.parentElement.children);for(let e of s){const t=r.getTabIdentifier(e),s=e.querySelector("a");s.classList.toggle("disabled",!this.hasTabContent(t)),s.classList.contains("disabled")?s.setAttribute("tabindex","-1"):s.removeAttribute("tabindex")}if(!this.hasTabContent(r.getTabIdentifier(t)))for(let i of s){if(i===t)continue;const s=r.getTabIdentifier(i);if(this.hasTabContent(s)){this.switchTab(e.parentElement,s);break}}}hasTabContent(e){const t=this.context.querySelector("#"+e);return r.countVisibleContentElements(t)>0}switchTab(e,t){const s=e.querySelector(`a[href="#${t}"]`),i=this.context.querySelector("#"+t);e.querySelector("a.active").classList.remove("active"),e.querySelector(".tab-pane.active").classList.remove("active"),s.classList.add("active"),i.classList.add("active")}}t.default=r}));