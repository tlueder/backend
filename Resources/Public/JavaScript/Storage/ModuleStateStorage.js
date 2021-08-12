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
define(["require","exports"],(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ModuleStateStorage=void 0;class r{static update(e,t,i,n){if("number"==typeof t)t=t.toString(10);else if("string"!=typeof t)throw new SyntaxError("identifier must be of type string");if("number"==typeof n)n=n.toString(10);else if("string"!=typeof n&&null!=n)throw new SyntaxError("mount must be of type string");const o=r.assignProperties({mount:n,identifier:t,selected:i},r.fetch(e));r.commit(e,o)}static updateWithCurrentMount(e,t,i){r.update(e,t,i,r.current(e).mount)}static current(e){return r.fetch(e)||r.createCurrentState()}static purge(){Object.keys(sessionStorage).filter(e=>e.startsWith(r.prefix)).forEach(e=>sessionStorage.removeItem(e))}static fetch(e){const t=sessionStorage.getItem(r.prefix+e);return null===t?null:JSON.parse(t)}static commit(e,t){sessionStorage.setItem(r.prefix+e,JSON.stringify(t))}static assignProperties(e,t){let i=Object.assign(r.createCurrentState(),t);return e.mount&&(i.mount=e.mount),e.identifier&&(i.identifier=e.identifier),e.selected&&(i.selection=i.identifier),i}static createCurrentState(){return{mount:null,identifier:"",selection:null}}}if(t.ModuleStateStorage=r,r.prefix="t3-module-state-",window.ModuleStateStorage=r,!top.fsMod||!top.fsMod.isProxy){const e=e=>new Proxy({},{get(t,i){const n=i.toString(),o=r.current(n);return"identifier"===e?o.identifier:"selection"===e?o.selection:void 0},set(e,t,r,i){throw new Error("Writing to fsMod is not possible anymore, use ModuleStateStorage instead.")}}),t={isProxy:!0,recentIds:{},navFrameHighlightedID:{},currentBank:"0"};top.fsMod=new Proxy(t,{get(t,i){const n=i.toString();return"isProxy"===n||(console.warn("Reading from fsMod is deprecated, use ModuleStateStorage instead."),"recentIds"===n?e("identifier"):"navFrameHighlightedID"===n?e("selection"):"currentBank"===n?r.current("web").mount:void 0)},set(e,t,r,i){throw new Error("Writing to fsMod is not possible anymore, use ModuleStateStorage instead.")}})}}));