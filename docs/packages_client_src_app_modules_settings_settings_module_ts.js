"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["packages_client_src_app_modules_settings_settings_module_ts"],{

/***/ 1897:
/*!**************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/language-selector/language-selector.component.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LanguageSelectorComponent": () => (/* binding */ LanguageSelectorComponent)
/* harmony export */ });
/* harmony import */ var _models_settings_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/settings.model */ 3545);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 1468);






function LanguageSelectorComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lang_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", lang_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, "LANGUAGES." + lang_r1));
  }
}
class LanguageSelectorComponent {
  constructor() {
    this.languages = _models_settings_model__WEBPACK_IMPORTED_MODULE_0__.AvailableLanguages;
  }
}
LanguageSelectorComponent.ɵfac = function LanguageSelectorComponent_Factory(t) {
  return new (t || LanguageSelectorComponent)();
};
LanguageSelectorComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: LanguageSelectorComponent,
  selectors: [["app-language-selector"]],
  inputs: {
    group: "group",
    controlName: "controlName"
  },
  decls: 5,
  vars: 3,
  consts: [[1, "form-control", 3, "formGroup"], ["translate", "", 1, "text-accent", "label"], [1, "select", "select-lg", "mt-1", "w-full", 3, "formControlName"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
  template: function LanguageSelectorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "LABELS.lang");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, LanguageSelectorComponent_option_4_Template, 3, 4, "option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", ctx.controlName);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.languages);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsYW5ndWFnZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy9sYW5ndWFnZS1zZWxlY3Rvci9sYW5ndWFnZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0xBQWdMIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 5291:
/*!**************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/line-height/line-height.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineHeightComponent": () => (/* binding */ LineHeightComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _models_settings_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/settings.model */ 3545);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4874);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 1468);








function LineHeightComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const height_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", height_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, "LINE_HEIGHT." + height_r1));
  }
}
class LineHeightComponent {
  constructor() {
    this.availableHeights = _models_settings_model__WEBPACK_IMPORTED_MODULE_0__.AvailableLineHeights;
    this.isEnabled = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(true);
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  ngOnInit() {
    const ctrl = this.group.get(this.controlName);
    ctrl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this.onDestroy$), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.startWith)(ctrl.value)).subscribe(value => this.isEnabled.set(value));
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
LineHeightComponent.ɵfac = function LineHeightComponent_Factory(t) {
  return new (t || LineHeightComponent)();
};
LineHeightComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: LineHeightComponent,
  selectors: [["app-line-height"]],
  inputs: {
    group: "group",
    controlName: "controlName"
  },
  decls: 5,
  vars: 3,
  consts: [[1, "form-control", 3, "formGroup"], ["translate", "", 1, "text-accent", "label"], [1, "select", "select-lg", "mt-1", "w-full", 3, "formControlName"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
  template: function LineHeightComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "LABELS.lineHeight");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, LineHeightComponent_option_4_Template, 3, 4, "option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", ctx.controlName);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.availableHeights);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaW5lLWhlaWdodC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy9saW5lLWhlaWdodC9saW5lLWhlaWdodC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 3886:
/*!********************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/settings/settings.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsComponent": () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 4874);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 6562);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/app.model */ 4056);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var _models_settings_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/settings.model */ 3545);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../selectors/app.selector */ 8603);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _theme_selector_theme_selector_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme-selector/theme-selector.component */ 8372);
/* harmony import */ var _language_selector_language_selector_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../language-selector/language-selector.component */ 1897);
/* harmony import */ var _wake_lock_enabled_wake_lock_enabled_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../wake-lock-enabled/wake-lock-enabled.component */ 3858);
/* harmony import */ var _text_size_text_size_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../text-size/text-size.component */ 5072);
/* harmony import */ var _line_height_line_height_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../line-height/line-height.component */ 5291);






















function SettingsComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "You must accept cookies in order to save settings.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
class SettingsComponent {
  constructor(fb, store, renderer, el, router, translate) {
    this.fb = fb;
    this.store = store;
    this.renderer = renderer;
    this.el = el;
    this.router = router;
    this.translate = translate;
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    this.currentTheme = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_1__.themeSelector));
    this.language = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_1__.languageSelector));
    this.wakeLockEnabled = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_1__.wakeLockEnabledSelector));
    this.currentTextSize = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_1__.selectTextSize));
    this.currentLineHeight = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_1__.selectLineHeight));
    this.formGroup = this.fb.group({
      theme: this.fb.control(this.currentTheme()),
      lang: this.fb.control(this.language()),
      wakelock: this.fb.control(this.wakeLockEnabled()),
      textSize: this.fb.control(this.currentTextSize()),
      lineHeight: this.fb.control(this.currentLineHeight())
    });
    this.acceptedCookies = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_11__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_12__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_3__.selectAppAppearance), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.map)(appearance => appearance.cookiesAccepted)));
    this.classList = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.signal)(`recognized-text ${this.currentTextSize()} ${this.currentLineHeight()}`);
  }
  ngOnInit() {
    this.formGroup.get('theme')?.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.onDestroy$)).subscribe(theme => {
      if (theme) {
        this.renderer.setAttribute(this.el.nativeElement, 'data-theme', theme);
      }
    });
    this.formGroup.get('lang')?.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.onDestroy$)).subscribe(lang => {
      if (lang) {
        this.translate.use(lang).subscribe(() => {
          // console.log('used lang', lang)
        });
      }
    });
    const size$ = this.formGroup.get('textSize').valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.startWith)(this.currentTextSize()));
    const lineHeight$ = this.formGroup.get('lineHeight').valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.startWith)(this.currentLineHeight()));
    (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.combineLatest)([size$, lineHeight$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.onDestroy$)).subscribe(([size, height]) => {
      if (size && height) {
        this._updateClassList(size, height);
      }
    });
  }
  ngOnDestroy() {
    if (this.formGroup.dirty) {
      this.translate.use(this.language());
    }
    this.onDestroy$.next();
  }
  saveSettings() {
    // TODO: Refactor save functionality to write entire settings object
    const theme = this.formGroup.get('theme').value;
    this.store.dispatch(_models_settings_model__WEBPACK_IMPORTED_MODULE_2__.SettingsActions.setTheme({
      theme
    }));
    const language = this.formGroup.get('lang').value;
    this.store.dispatch(_models_settings_model__WEBPACK_IMPORTED_MODULE_2__.SettingsActions.setLanguage({
      language
    }));
    const wakelockEnabled = this.formGroup.get('wakelock').value;
    this.store.dispatch(_models_settings_model__WEBPACK_IMPORTED_MODULE_2__.SettingsActions.updateWakeLockEnabled({
      enabled: wakelockEnabled
    }));
    const size = this.formGroup.get('textSize').value;
    this.store.dispatch(_models_settings_model__WEBPACK_IMPORTED_MODULE_2__.SettingsActions.setTextSize({
      size
    }));
    const height = this.formGroup.get('lineHeight').value;
    this.store.dispatch(_models_settings_model__WEBPACK_IMPORTED_MODULE_2__.SettingsActions.setLineHeight({
      height
    }));
    this.router.navigate(['']);
    return false;
  }
  _updateClassList(size, height) {
    console.log('updateClassList', size, height);
    this.classList.set(`recognized-text ${size} ${height}`);
  }
}
SettingsComponent.ɵfac = function SettingsComponent_Factory(t) {
  return new (t || SettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_12__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService));
};
SettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: SettingsComponent,
  selectors: [["app-settings"]],
  decls: 27,
  vars: 11,
  consts: [[1, "flex", "basis-full", "items-stretch", "justify-center", "bg-base-300"], [1, "flex", "flex-col", "basis-full", "p-3", "sm:p-6", "gap-3", "sm:gap-12", "max-w-4xl", 3, "formGroup", "submit"], [1, "basis-full", "grid", "sm:grid-cols-1", "md:grid-cols-2", "gap-3", "sm:gap-12"], ["controlName", "theme", 3, "group"], ["controlName", "lang", 3, "group"], ["controlName", "wakelock", 3, "group"], [1, "grid", "grid-cols-2", "gap-3"], ["controlName", "textSize", 3, "group"], ["controlName", "lineHeight", 3, "group"], [1, "form-control", "overflow-y-auto"], [1, "label"], ["translate", "", 1, "text-accent"], [1, "bg-base-100", "text-base-content", "p-6", "gap-3", "overflow-hidden", "rounded-lg"], ["translate", "", 3, "classList"], [1, "flex", "w-full", "justify-end", "items-center", "gap-1", "sm:gap-3"], ["class", "text-error text-sm", 4, "ngIf"], ["translate", "", "type", "button", "routerLink", "..", 1, "btn", "btn-ghost", "rounded-xl"], ["type", "submit", "translate", "", 1, "btn", "btn-primary", "rounded-xl", 3, "disabled"], [1, "text-error", "text-sm"]],
  template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("submit", function SettingsComponent_Template_form_submit_1_listener() {
        return ctx.saveSettings();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 2)(3, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "app-theme-selector", 3)(5, "app-language-selector", 4)(6, "app-wake-lock-enabled", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "app-text-size", 7)(9, "app-line-height", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "div", 9)(11, "div", 10)(12, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](13, "SETTINGS.t1");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div", 12)(15, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16, " SETTINGS.p1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, " SETTINGS.p3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, " SETTINGS.p4 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "footer", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](22, SettingsComponent_div_22_Template, 2, 0, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24, " BUTTONS.cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](25, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](26, " BUTTONS.saveAndClose ");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("formGroup", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("group", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("group", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("group", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("group", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("group", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("classList", ctx.classList());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("classList", ctx.classList());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("classList", ctx.classList() + " live pt-3");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.acceptedCookies());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.acceptedCookies() === false || ctx.formGroup.pristine);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormGroupDirective, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterLink, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateDirective, _theme_selector_theme_selector_component__WEBPACK_IMPORTED_MODULE_4__.ThemeSelectorComponent, _language_selector_language_selector_component__WEBPACK_IMPORTED_MODULE_5__.LanguageSelectorComponent, _wake_lock_enabled_wake_lock_enabled_component__WEBPACK_IMPORTED_MODULE_6__.WakeLockEnabledComponent, _text_size_text_size_component__WEBPACK_IMPORTED_MODULE_7__.TextSizeComponent, _line_height_line_height_component__WEBPACK_IMPORTED_MODULE_8__.LineHeightComponent],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXR0aW5ncy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0tBQW9LIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 5072:
/*!**********************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/text-size/text-size.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextSizeComponent": () => (/* binding */ TextSizeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4874);
/* harmony import */ var _models_settings_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/settings.model */ 3545);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 1468);








function TextSizeComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const size_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", size_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, "TEXT_SIZE." + size_r1));
  }
}
class TextSizeComponent {
  constructor() {
    this.availableTextSizes = _models_settings_model__WEBPACK_IMPORTED_MODULE_0__.AvailableTextSizes;
    this.isEnabled = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(true);
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  ngOnInit() {
    const ctrl = this.group.get(this.controlName);
    ctrl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this.onDestroy$), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.startWith)(ctrl.value)).subscribe(value => this.isEnabled.set(value));
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
TextSizeComponent.ɵfac = function TextSizeComponent_Factory(t) {
  return new (t || TextSizeComponent)();
};
TextSizeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: TextSizeComponent,
  selectors: [["app-text-size"]],
  inputs: {
    group: "group",
    controlName: "controlName"
  },
  decls: 5,
  vars: 3,
  consts: [[1, "form-control", 3, "formGroup"], ["translate", "", 1, "text-accent", "label"], [1, "select", "select-lg", "mt-1", "w-full", 3, "formControlName"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
  template: function TextSizeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "LABELS.textSize");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, TextSizeComponent_option_4_Template, 3, 4, "option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", ctx.controlName);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.availableTextSizes);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXh0LXNpemUuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy90ZXh0LXNpemUvdGV4dC1zaXplLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3S0FBd0siLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 8372:
/*!********************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/theme-selector/theme-selector.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThemeSelectorComponent": () => (/* binding */ ThemeSelectorComponent)
/* harmony export */ });
/* harmony import */ var _models_settings_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/settings.model */ 3545);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../shared-ui/src/lib/pipes/proper.pipe */ 4367);







function ThemeSelectorComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "proper");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const theme_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", theme_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 4, "THEMES." + theme_r1.key)));
  }
}
class ThemeSelectorComponent {
  constructor() {
    this.themes = _models_settings_model__WEBPACK_IMPORTED_MODULE_0__.AppTheme;
  }
}
ThemeSelectorComponent.ɵfac = function ThemeSelectorComponent_Factory(t) {
  return new (t || ThemeSelectorComponent)();
};
ThemeSelectorComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ThemeSelectorComponent,
  selectors: [["app-theme-selector"]],
  inputs: {
    group: "group",
    controlName: "controlName"
  },
  decls: 6,
  vars: 5,
  consts: [[1, "form-control", 3, "formGroup"], ["translate", "", 1, "text-accent", "label"], [1, "select", "select-lg", "mt-1", "w-full", 3, "formControlName"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]],
  template: function ThemeSelectorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "LABELS.theme");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ThemeSelectorComponent_option_4_Template, 4, 6, "option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "keyvalue");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControlName", ctx.controlName);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, ctx.themes));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateDirective, _angular_common__WEBPACK_IMPORTED_MODULE_2__.KeyValuePipe, _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_5__.ProperPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aGVtZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy90aGVtZS1zZWxlY3Rvci90aGVtZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 3858:
/*!**************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/wake-lock-enabled/wake-lock-enabled.component.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WakeLockEnabledComponent": () => (/* binding */ WakeLockEnabledComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4874);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 1468);







function WakeLockEnabledComponent_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "LABELS.wakelockOn");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function WakeLockEnabledComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "LABELS.wakelockOff");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class WakeLockEnabledComponent {
  constructor() {
    this.isEnabled = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(true);
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  ngOnInit() {
    const ctrl = this.group.get(this.controlName);
    ctrl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.onDestroy$), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.startWith)(ctrl.value)).subscribe(value => this.isEnabled.set(value));
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
WakeLockEnabledComponent.ɵfac = function WakeLockEnabledComponent_Factory(t) {
  return new (t || WakeLockEnabledComponent)();
};
WakeLockEnabledComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: WakeLockEnabledComponent,
  selectors: [["app-wake-lock-enabled"]],
  inputs: {
    group: "group",
    controlName: "controlName"
  },
  decls: 8,
  vars: 4,
  consts: [[1, "form-control", 3, "formGroup"], ["translate", "", 1, "text-accent", "label"], [1, "cursor-pointer", "label", "bg-base-100", "rounded-lg", "ps-5", "pe-3", "py-4"], ["class", "label-text me-2", "translate", "", 4, "ngIf", "ngIfElse"], ["isDisabledLabel", ""], ["type", "checkbox", 1, "checkbox", "checkbox-primary", 3, "formControlName"], ["translate", "", 1, "label-text", "me-2"]],
  template: function WakeLockEnabledComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "label", 0)(1, "span", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "LABELS.wakelock");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WakeLockEnabledComponent_span_4_Template, 2, 0, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WakeLockEnabledComponent_ng_template_5_Template, 2, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "input", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.group);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isEnabled())("ngIfElse", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", ctx.controlName);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateDirective],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3YWtlLWxvY2stZW5hYmxlZC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy93YWtlLWxvY2stZW5hYmxlZC93YWtlLWxvY2stZW5hYmxlZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0xBQWdMIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 3328:
/*!*********************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/settings.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsModule": () => (/* binding */ SettingsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var shared_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! shared-ui */ 5543);
/* harmony import */ var _components_language_selector_language_selector_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/language-selector/language-selector.component */ 1897);
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/settings/settings.component */ 3886);
/* harmony import */ var _components_theme_selector_theme_selector_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/theme-selector/theme-selector.component */ 8372);
/* harmony import */ var _settings_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.routes */ 8357);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var _effects_settings_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../effects/settings.effects */ 4410);
/* harmony import */ var _components_cookie_policy_cookie_policy_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/cookie-policy/cookie-policy.component */ 190);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _components_wake_lock_enabled_wake_lock_enabled_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/wake-lock-enabled/wake-lock-enabled.component */ 3858);
/* harmony import */ var _components_text_size_text_size_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/text-size/text-size.component */ 5072);
/* harmony import */ var _components_line_height_line_height_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/line-height/line-height.component */ 5291);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6839);



















class SettingsModule {}
SettingsModule.ɵfac = function SettingsModule_Factory(t) {
  return new (t || SettingsModule)();
};
SettingsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
  type: SettingsModule
});
SettingsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, shared_ui__WEBPACK_IMPORTED_MODULE_11__.SharedUiModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule.forChild(_settings_routes__WEBPACK_IMPORTED_MODULE_3__.routes), _ngrx_effects__WEBPACK_IMPORTED_MODULE_14__.EffectsModule.forFeature([_effects_settings_effects__WEBPACK_IMPORTED_MODULE_4__.SettingsEffects]), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateModule.forChild({
    extend: true
  })]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](SettingsModule, {
    declarations: [_components_settings_settings_component__WEBPACK_IMPORTED_MODULE_1__.SettingsComponent, _components_theme_selector_theme_selector_component__WEBPACK_IMPORTED_MODULE_2__.ThemeSelectorComponent, _components_language_selector_language_selector_component__WEBPACK_IMPORTED_MODULE_0__.LanguageSelectorComponent, _components_cookie_policy_cookie_policy_component__WEBPACK_IMPORTED_MODULE_5__.CookiePolicyComponent, _components_wake_lock_enabled_wake_lock_enabled_component__WEBPACK_IMPORTED_MODULE_6__.WakeLockEnabledComponent, _components_text_size_text_size_component__WEBPACK_IMPORTED_MODULE_7__.TextSizeComponent, _components_line_height_line_height_component__WEBPACK_IMPORTED_MODULE_8__.LineHeightComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, shared_ui__WEBPACK_IMPORTED_MODULE_11__.SharedUiModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.ReactiveFormsModule, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_14__.EffectsFeatureModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateModule]
  });
})();

/***/ }),

/***/ 8357:
/*!*********************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/settings.routes.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/settings/settings.component */ 3886);

const routes = [{
  path: '',
  component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_0__.SettingsComponent
}];

/***/ })

}]);
//# sourceMappingURL=packages_client_src_app_modules_settings_settings_module_ts.js.map