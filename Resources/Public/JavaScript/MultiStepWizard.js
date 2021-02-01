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
var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};define(["require","exports","./Enum/Severity","jquery","./Modal","./Severity","./Icons"],(function(t,e,s,i,r,a,l){"use strict";i=__importDefault(i);class n{constructor(){this.setup={slides:[],settings:{},forceSelection:!0,$carousel:null},this.originalSetup=i.default.extend(!0,{},this.setup)}set(t,e){return this.setup.settings[t]=e,this}addSlide(t,e,i="",r=s.SeverityEnum.info,a,l){const n={identifier:t,title:e,content:i,severity:r,progressBarTitle:a,callback:l};return this.setup.slides.push(n),this}addFinalProcessingSlide(t){return t||(t=()=>{this.dismiss()}),l.getIcon("spinner-circle",l.sizes.default,null,null).then(e=>{let s=i.default("<div />",{class:"text-center"}).append(e);this.addSlide("final-processing-slide",top.TYPO3.lang["wizard.processing.title"],s[0].outerHTML,a.info,null,t)})}show(){let t=this.generateSlides(),e=this.setup.slides[0];r.confirm(e.title,t,e.severity,[{text:top.TYPO3.lang["wizard.button.cancel"],active:!0,btnClass:"btn-default pull-left",name:"cancel",trigger:()=>{this.getComponent().trigger("wizard-dismiss")}},{text:top.TYPO3.lang["wizard.button.prev"],btnClass:"btn-"+a.getCssClass(e.severity),name:"prev"},{text:top.TYPO3.lang["wizard.button.next"],btnClass:"btn-"+a.getCssClass(e.severity),name:"next"}],["modal-multi-step-wizard"]),this.addButtonContainer(),this.addProgressBar(),this.initializeEvents(),this.getComponent().on("wizard-visible",()=>{this.runSlideCallback(e,this.setup.$carousel.find(".carousel-item").first())}).on("wizard-dismissed",()=>{this.setup=i.default.extend(!0,{},this.originalSetup)})}getComponent(){return null===this.setup.$carousel&&this.generateSlides(),this.setup.$carousel}dismiss(){r.dismiss()}lockNextStep(){let t=this.setup.$carousel.closest(".modal").find('button[name="next"]');return t.prop("disabled",!0),t}unlockNextStep(){let t=this.setup.$carousel.closest(".modal").find('button[name="next"]');return t.prop("disabled",!1),t}lockPrevStep(){let t=this.setup.$carousel.closest(".modal").find('button[name="prev"]');return t.prop("disabled",!0),t}unlockPrevStep(){let t=this.setup.$carousel.closest(".modal").find('button[name="prev"]');return t.prop("disabled",!1),t}triggerStepButton(t){let e=this.setup.$carousel.closest(".modal").find('button[name="'+t+'"]');return e.length>0&&!0!==e.prop("disabled")&&e.trigger("click"),e}blurCancelStep(){let t=this.setup.$carousel.closest(".modal").find('button[name="cancel"]');return t.trigger("blur"),t}initializeEvents(){let t=this.setup.$carousel.closest(".modal");this.initializeSlideNextEvent(t),this.initializeSlidePrevEvent(t),this.setup.$carousel.on("slide.bs.carousel",e=>{"left"===e.direction?this.nextSlideChanges(t):this.prevSlideChanges(t)}).on("slid.bs.carousel",t=>{let e=this.setup.$carousel.data("currentIndex"),s=this.setup.slides[e];this.runSlideCallback(s,i.default(t.relatedTarget)),this.setup.forceSelection&&this.lockNextStep()});let e=this.getComponent();e.on("wizard-dismiss",this.dismiss),r.currentModal.on("hidden.bs.modal",()=>{e.trigger("wizard-dismissed")}).on("shown.bs.modal",()=>{e.trigger("wizard-visible")})}initializeSlideNextEvent(t){t.find(".modal-footer").find('button[name="next"]').off().on("click",()=>{this.setup.$carousel.carousel("next")})}initializeSlidePrevEvent(t){t.find(".modal-footer").find('button[name="prev"]').off().on("click",()=>{this.setup.$carousel.carousel("prev")})}nextSlideChanges(t){this.initializeSlideNextEvent(t);let e=t.find(".modal-title"),s=t.find(".modal-footer"),i=t.find(".modal-btn-group"),r=s.find('button[name="next"]'),l=this.setup.$carousel.data("currentSlide")+1,n=this.setup.$carousel.data("currentIndex")+1;e.text(this.setup.slides[n].title),this.setup.$carousel.data("currentSlide",l),this.setup.$carousel.data("currentIndex",n),l>=this.setup.$carousel.data("realSlideCount")?(r.text(this.getProgressBarTitle(this.setup.$carousel.data("currentIndex"))),s.find(".progress-bar.first-step").width("100%").text(this.getProgressBarTitle(this.setup.$carousel.data("currentIndex"))),s.find(".progress-bar.last-step").width("0%").text(""),this.setup.forceSelection=!1):(s.find(".progress-bar.first-step").width(this.setup.$carousel.data("initialStep")*l+"%").text(this.getProgressBarTitle(n)),s.find(".progress-bar.step").width("0%").text(""),i.slideDown()),r.removeClass("btn-"+a.getCssClass(this.setup.slides[n-1].severity)).addClass("btn-"+a.getCssClass(this.setup.slides[n].severity)),t.removeClass("modal-severity-"+a.getCssClass(this.setup.slides[n-1].severity)).addClass("modal-severity-"+a.getCssClass(this.setup.slides[n].severity))}prevSlideChanges(t){this.initializeSlidePrevEvent(t);let e=t.find(".modal-title"),s=t.find(".modal-footer"),i=t.find(".modal-btn-group"),r=s.find('button[name="next"]'),a=this.setup.$carousel.data("currentSlide")-1,l=this.setup.$carousel.data("currentIndex")-1;this.setup.$carousel.data("currentSlide",a),this.setup.$carousel.data("currentIndex",l),e.text(this.setup.slides[l].title),s.find(".progress-bar.last-step").width(this.setup.$carousel.data("initialStep")+"%").text(this.getProgressBarTitle(this.setup.$carousel.data("slideCount")-1)),r.text(top.TYPO3.lang["wizard.button.next"]),1===a?(s.find(".progress-bar.first-step").width(this.setup.$carousel.data("initialStep")*a+"%").text(this.getProgressBarTitle(0)),s.find(".progress-bar.step").width(this.setup.$carousel.data("initialStep")+"%").text(this.getProgressBarTitle(l+1)),i.slideUp()):(s.find(".progress-bar.first-step").width(this.setup.$carousel.data("initialStep")*a+"%").text(this.getProgressBarTitle(l)),this.setup.forceSelection=!0)}getProgressBarTitle(t){let e;return e=null===this.setup.slides[t].progressBarTitle?0===t?top.TYPO3.lang["wizard.progressStep.start"]:t>=this.setup.$carousel.data("slideCount")-1?top.TYPO3.lang["wizard.progressStep.finish"]:top.TYPO3.lang["wizard.progressStep"]+String(t+1):this.setup.slides[t].progressBarTitle,e}runSlideCallback(t,e){"function"==typeof t.callback&&t.callback(e,this.setup.settings,t.identifier)}addProgressBar(){let t,e=this.setup.$carousel.find(".carousel-item").length-1,s=Math.max(1,e),r=this.setup.$carousel.closest(".modal").find(".modal-footer");if(t=Math.round(100/s),this.setup.$carousel.data("initialStep",t).data("slideCount",s).data("realSlideCount",e).data("currentIndex",0).data("currentSlide",1),s>1){r.prepend(i.default("<div />",{class:"progress"}));for(let e=0;e<this.setup.slides.length;++e){let s;s=0===e?"progress-bar first-step":e===this.setup.$carousel.data("slideCount")-1?"progress-bar last-step inactive":"progress-bar step inactive",r.find(".progress").append(i.default("<div />",{role:"progressbar",class:s,"aria-valuemin":0,"aria-valuenow":t,"aria-valuemax":100}).width(t+"%").text(this.getProgressBarTitle(e)))}}}addButtonContainer(){this.setup.$carousel.closest(".modal").find(".modal-footer .btn").wrapAll('<div class="modal-btn-group" />')}generateSlides(){if(null!==this.setup.$carousel)return this.setup.$carousel;let t='<div class="carousel slide" data-bs-ride="carousel" data-bs-interval="false"><div class="carousel-inner" role="listbox">';for(let e=0;e<this.setup.slides.length;++e){let s=this.setup.slides[e],i=s.content;"object"==typeof i&&(i=i.html()),t+='<div class="carousel-item" data-bs-slide="'+s.identifier+'" data-step="'+e+'">'+i+"</div>"}return t+="</div></div>",this.setup.$carousel=i.default(t),this.setup.$carousel.find(".carousel-item").first().addClass("active"),this.setup.$carousel}}let d;try{window.opener&&window.opener.TYPO3&&window.opener.TYPO3.MultiStepWizard&&(d=window.opener.TYPO3.MultiStepWizard),parent&&parent.window.TYPO3&&parent.window.TYPO3.MultiStepWizard&&(d=parent.window.TYPO3.MultiStepWizard),top&&top.TYPO3&&top.TYPO3.MultiStepWizard&&(d=top.TYPO3.MultiStepWizard)}catch(t){}return d||(d=new n,"undefined"!=typeof TYPO3&&(TYPO3.MultiStepWizard=d)),d}));