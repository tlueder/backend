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
var __decorate=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","lit-element","TYPO3/CMS/Core/lit-helper","./PageTree","./PageTreeDragDrop","TYPO3/CMS/Core/Ajax/AjaxRequest","d3-selection","TYPO3/CMS/Core/Event/DebounceEvent","TYPO3/CMS/Backend/Storage/Persistent","TYPO3/CMS/Backend/Element/IconElement"],(function(e,t,r,o,i,n,s,a,l,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PageTreeNavigationComponent=t.navigationComponentName=void 0,s=__importDefault(s),l=__importDefault(l),d=__importDefault(d),t.navigationComponentName="typo3-backend-navigation-component-pagetree";let c=class extends r.LitElement{constructor(){super(),this.mountPointPath=null,this.tree=null,this.refresh=()=>{this.tree.refreshOrFilterTree()},this.setMountPoint=e=>{this.setTemporaryMountPoint(e.detail.pageId)},this.selectFirstNode=()=>{const e=this.tree.nodes[0];e&&this.tree.selectNode(e)},this.tree=new i.PageTree}connectedCallback(){super.connectedCallback(),document.addEventListener("typo3:pagetree:refresh",this.refresh),document.addEventListener("typo3:pagetree:mountPoint",this.setMountPoint),document.addEventListener("typo3:pagetree:selectFirstNode",this.selectFirstNode)}disconnectedCallback(){document.removeEventListener("typo3:pagetree:refresh",this.refresh),document.removeEventListener("typo3:pagetree:mountPoint",this.setMountPoint),document.removeEventListener("typo3:pagetree:selectFirstNode",this.selectFirstNode),super.disconnectedCallback()}createRenderRoot(){return this}render(){return r.html`
      <div id="typo3-pagetree" class="svg-tree">
        <div>
          <div id="typo3-pagetree-toolbar" class="svg-toolbar">
              <typo3-backend-navigation-component-pagetree-toolbar .tree="${this.tree}"></typo3-backend-navigation-component-pagetree-toolbar>
          </div>
          <div id="typo3-pagetree-treeContainer" class="navigation-tree-container">
            ${this.renderMountPoint()}
            <div id="typo3-pagetree-tree" class="svg-tree-wrapper">
              <div class="node-loader">
                <typo3-backend-icon identifier="spinner-circle-light" size="small"></typo3-backend-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="svg-tree-loader">
          <typo3-backend-icon identifier="spinner-circle-light" size="large"></typo3-backend-icon>
        </div>
      </div>
    `}firstUpdated(){this.treeWrapper.dispatchEvent(new Event("svg-tree:visible"));const e=top.TYPO3.settings.ajaxUrls.page_tree_configuration;new s.default(e).get().then(async e=>{const t=await e.resolve("json");Object.assign(t,{dataUrl:top.TYPO3.settings.ajaxUrls.page_tree_data,filterUrl:top.TYPO3.settings.ajaxUrls.page_tree_filter,showIcons:!0});const r=new n.PageTreeDragDrop(this.tree);this.treeWrapper.addEventListener("svg-tree:initialized",()=>{const e=this.querySelector("typo3-backend-navigation-component-pagetree-toolbar");e.requestUpdate("tree").then(()=>e.initializeDragDrop(r)),t.temporaryMountPoint&&(this.mountPointPath=t.temporaryMountPoint)}),this.tree.initialize(this.treeWrapper,t,r)})}unsetTemporaryMountPoint(){this.mountPointPath=null,d.default.unset("pageTree_temporaryMountPoint").then(()=>{this.tree.refreshTree()})}renderMountPoint(){return null===this.mountPointPath?r.html``:r.html`
      <div class="node-mount-point">
        <div class="node-mount-point__icon"><typo3-backend-icon identifier="actions-document-info" size="small"></typo3-backend-icon></div>
        <div class="node-mount-point__text">${this.mountPointPath}</div>
        <div class="node-mount-point__icon mountpoint-close" @click="${()=>this.unsetTemporaryMountPoint()}" title="${o.lll("labels.temporaryDBmount")}">
          <typo3-backend-icon identifier="actions-close" size="small"></typo3-backend-icon>
        </div>
      </div>
    `}setTemporaryMountPoint(e){new s.default(top.TYPO3.settings.ajaxUrls.page_tree_set_temporary_mount_point).post("pid="+e,{headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).then(e=>e.resolve()).then(e=>{e&&e.hasErrors?(this.tree.errorNotification(e.message,!0),this.tree.update()):(this.mountPointPath=e.mountPointPath,this.tree.refreshOrFilterTree())}).catch(e=>{this.tree.errorNotification(e,!0)})}};__decorate([r.property({type:String})],c.prototype,"mountPointPath",void 0),__decorate([r.query(".svg-tree-wrapper")],c.prototype,"treeWrapper",void 0),c=__decorate([r.customElement(t.navigationComponentName)],c),t.PageTreeNavigationComponent=c;let p=class extends r.LitElement{constructor(){super(...arguments),this.tree=null,this.settings={searchInput:".search-input",filterTimeout:450}}initializeDragDrop(e){var t,r;(null===(r=null===(t=this.tree.settings)||void 0===t?void 0:t.doktypes)||void 0===r?void 0:r.length)&&this.tree.settings.doktypes.forEach(t=>{if(t.icon){const r=this.querySelector('[data-tree-icon="'+t.icon+'"]');a.select(r).call(this.dragToolbar(t,e))}else console.warn("Missing icon definition for doktype: "+t.nodeType)})}createRenderRoot(){return this}firstUpdated(){const e=this.querySelector(this.settings.searchInput);e&&(new l.default("input",e=>{this.search(e.target)},this.settings.filterTimeout).bindTo(e),e.focus(),e.clearable({onClear:()=>{this.tree.resetFilter(),this.tree.prepareDataForVisibleNodes(),this.tree.update()}}))}render(){var e,t;return r.html`
      <div class="tree-toolbar">
        <div class="svg-toolbar__menu">
          <div class="svg-toolbar__search">
              <input type="text" class="form-control form-control-sm search-input" placeholder="${o.lll("tree.searchTermInfo")}">
          </div>
          <button class="btn btn-default btn-borderless btn-sm" @click="${()=>this.refreshTree()}" data-tree-icon="actions-refresh" title="${o.lll("labels.refresh")}">
              <typo3-backend-icon identifier="actions-refresh" size="small"></typo3-backend-icon>
          </button>
        </div>
        <div class="svg-toolbar__submenu">
          ${(null===(t=null===(e=this.tree.settings)||void 0===e?void 0:e.doktypes)||void 0===t?void 0:t.length)?this.tree.settings.doktypes.map(e=>r.html`
                <div class="svg-toolbar__drag-node" data-tree-icon="${e.icon}" data-node-type="${e.nodeType}"
                     title="${e.title}" tooltip="${e.tooltip}">
                  <typo3-backend-icon identifier="${e.icon}" size="small"></typo3-backend-icon>
                </div>
              `):""}
        </div>
      </div>
    `}refreshTree(){this.tree.refreshOrFilterTree()}search(e){this.tree.refreshOrFilterTree(e.value.trim()),this.tree.prepareDataForVisibleNodes(),this.tree.update()}dragToolbar(e,t){return t.connectDragHandler(new n.ToolbarDragHandler(e,this.tree,t))}};__decorate([r.property({type:i.PageTree})],p.prototype,"tree",void 0),p=__decorate([r.customElement("typo3-backend-navigation-component-pagetree-toolbar")],p)}));