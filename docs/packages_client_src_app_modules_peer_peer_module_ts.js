(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["packages_client_src_app_modules_peer_peer_module_ts"],{

/***/ 2044:
/*!********************************************************!*\
  !*** ./packages/client/src/app/effects/obs.effects.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsEffects": () => (/* binding */ ObsEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var _actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/obs.actions */ 8574);
/* harmony import */ var _services_obs_connection_obs_connection_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/obs-connection/obs-connection.service */ 7034);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);







class ObsEffects {
  constructor(actions$, obsService) {
    this.actions$ = actions$;
    this.obsService = obsService;
    this.connectServer$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connect), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(props => this.obsService.connect(props).pipe(
    // Response handling must be piped from the observable emitted by the service, or failures will result in the effect not be triggered subsequently
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connectSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connectFailure({
      error: err.message || 'Connection Failed for unknown reason'
    })))))));
    this.disconnectServer$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.disconnect), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.obsService.disconnect().pipe(
    // Response handling must be piped from the observable emitted by the service, or failures will result in the effect not be triggered subsequently
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.disconnectSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.disconnectFailure({
      error: err.message || 'Disconnect Failed for unknown reason'
    })))))));
  }
}
ObsEffects.ɵfac = function ObsEffects_Factory(t) {
  return new (t || ObsEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_obs_connection_obs_connection_service__WEBPACK_IMPORTED_MODULE_1__.ObsConnectionService));
};
ObsEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: ObsEffects,
  factory: ObsEffects.ɵfac
});


/***/ }),

/***/ 4130:
/*!*********************************************************!*\
  !*** ./packages/client/src/app/effects/peer.effects.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerEffects": () => (/* binding */ PeerEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/peer.actions */ 6365);
/* harmony import */ var _modules_peer_services_peer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/peer/services/peer.service */ 1785);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);







class PeerEffects {
  constructor(actions$, peerService) {
    this.actions$ = actions$;
    this.peerService = peerService;
    this.connectSocketServer$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectSocketServer), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.peerService.connectSocket()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(id => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerUserIdAssigned({
      id
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectSocketServerFailure({
      error: err.message
    })))));
    this.disconnectSocketServer$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.disconnectSocketServer), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.peerService.disconnectSocket()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerDisconnected())));
    this.connectPeerServer$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServer), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.peerService.connectPeerServer()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(id => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerConnected()), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServerFailure({
      error: err.message
    })))));
    this.disconnectPeerServer$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.disconnectPeerServer), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.peerService.disconnectPeerServer()), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => [_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerDisconnected(), _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.disconnectSocketServer()])));
    this.createRoom$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.createBroadcastRoom), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.peerService.joinRoom()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(id => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.createBroadcastRoomSuccess({
      id
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.createBroadcastRoomFailure({
      error: err.message
    })))));
    this.joinRoom$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoom), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(({
      id
    }) => this.peerService.joinRoom({
      room: id
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoomSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoomFailure({
      error: error.message
    })))));
    this.leaveRoom$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.leaveBroadcastRoom), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => this.peerService.leaveSession()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.leaveBroadcastRoomSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.leaveBroadcastRoomFailure({
      error: error.message
    })))));
    this.endBroadcast$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.endBroadcast), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.peerService.endBroadcast()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.endBroadcastSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.endBroadcastFailure({
      error: error.message
    })))));
  }
}
PeerEffects.ɵfac = function PeerEffects_Factory(t) {
  return new (t || PeerEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_modules_peer_services_peer_service__WEBPACK_IMPORTED_MODULE_1__.PeerService));
};
PeerEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: PeerEffects,
  factory: PeerEffects.ɵfac
});


/***/ }),

/***/ 830:
/*!*****************************************************************************!*\
  !*** ./packages/client/src/app/guards/active-stream/active-stream.guard.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activeStreamGuard": () => (/* binding */ activeStreamGuard)
/* harmony export */ });
const activeStreamGuard = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : confirm('WARNING: Leaving this page will end the current broadcast.');
};

/***/ }),

/***/ 7146:
/*!**********************************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/accept-peer-connections-modal/accept-peer-connections-modal.component.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcceptPeerConnectionsModalComponent": () => (/* binding */ AcceptPeerConnectionsModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/app.model */ 4056);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/app.selector */ 8603);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 1468);













const _c0 = ["modal"];
class AcceptPeerConnectionsModalComponent {
  constructor(store, renderer, router, fb) {
    this.store = store;
    this.renderer = renderer;
    this.router = router;
    this.fb = fb;
    this.accepted = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.toSignal)(this.store.select(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__.peerConnectionsAcceptedSelector));
    this.saveSettingControl = this.fb.control(this.accepted());
  }
  ngAfterViewInit() {
    if (!this.accepted()) {
      this._openModal();
    }
  }
  accept() {
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.setPeerConnectionsAccepted({
      accepted: true,
      save: this.saveSettingControl.value
    }));
    this._closeModal();
  }
  decline() {
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.setPeerConnectionsAccepted({
      accepted: false,
      save: this.saveSettingControl.value
    }));
    this._closeModal();
    this.router.navigate(['']);
  }
  _openModal() {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '');
  }
  _closeModal() {
    this.renderer.removeAttribute(this.modal.nativeElement, 'open');
  }
}
AcceptPeerConnectionsModalComponent.ɵfac = function AcceptPeerConnectionsModalComponent_Factory(t) {
  return new (t || AcceptPeerConnectionsModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder));
};
AcceptPeerConnectionsModalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: AcceptPeerConnectionsModalComponent,
  selectors: [["app-accept-peer-connections-modal"]],
  viewQuery: function AcceptPeerConnectionsModalComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.modal = _t.first);
    }
  },
  decls: 26,
  vars: 1,
  consts: [[3, "click"], ["open", ""], [1, "modal"], ["modal", ""], ["method", "dialog", 1, "modal-box", "bg-base-content", "text-base-100", "sm:w-11/12", "justify-self-center"], [1, "flex", "flex-row", "gap-3", "items-center", "bg-warning", "rounded-lg", "mb-3"], [1, "badge", "badge-warning", "h-10", "w-10"], ["name", "heroExclamationTriangle", 1, "text-error", "text-3xl"], ["translate", "", 1, "font-bold", "text-2xl"], ["translate", "", 1, "text-base", "mt-2"], [1, "modal-action"], ["type", "button", "translate", "", 1, "btn", 3, "click"], [1, "form-control"], ["translate", "", 1, "label", "cursor-pointer"], ["translate", "", 1, "label-text", "text-base-100"], ["type", "checkbox", 1, "checkbox", "checkbox-sm", "checkbox-primary", 3, "formControl"]],
  template: function AcceptPeerConnectionsModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AcceptPeerConnectionsModalComponent_Template_button_click_0_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](_r1.showModal());
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "dialog", 2, 3)(4, "form", 4)(5, "div", 5)(6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "ng-icon", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h1", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "MODAL.accessModalTitle");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "MODAL.accessP1");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "MODAL.accessP2");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "MODAL.accessP3");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 10)(17, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AcceptPeerConnectionsModalComponent_Template_button_click_17_listener() {
        return ctx.decline();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "BUTTONS.decline");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AcceptPeerConnectionsModalComponent_Template_button_click_19_listener() {
        return ctx.accept();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "BUTTONS.confirm");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 12)(22, "label", 13)(23, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "LABELS.rememberSetting");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](25, "input", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.saveSettingControl);
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlDirective, _ng_icons_core__WEBPACK_IMPORTED_MODULE_7__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateDirective],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhY2NlcHQtcGVlci1jb25uZWN0aW9ucy1tb2RhbC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2FjY2VwdC1wZWVyLWNvbm5lY3Rpb25zLW1vZGFsL2FjY2VwdC1wZWVyLWNvbm5lY3Rpb25zLW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnTUFBZ00iLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 8653:
/*!********************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/broadcast-render/broadcast-render.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BroadcastRenderComponent": () => (/* binding */ BroadcastRenderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_peer_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/peer.service */ 1785);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var _services_full_screen_full_screen_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/full-screen/full-screen.service */ 4359);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _media_components_recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../media/components/recognized-text/recognized-text.component */ 1589);
/* harmony import */ var _media_components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../media/components/recognized-live-text/recognized-live-text.component */ 3643);
/* harmony import */ var _media_components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../media/components/recognition-control-sidebar/recognition-control-sidebar.component */ 213);



















const _c0 = ["enable"];
function BroadcastRenderComponent_app_recognized_live_text_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-recognized-live-text", 11);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("text", ctx_r1.liveText);
  }
}
function BroadcastRenderComponent_label_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ng-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@slideInRightOnEnter", undefined)("@slideOutRightOnLeave", undefined);
  }
}
function BroadcastRenderComponent_app_recognition_control_sidebar_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-recognition-control-sidebar");
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@slideInRightOnEnter", undefined);
  }
}
const _c1 = function (a0, a1) {
  return {
    "flex-col-reverse justify-start": a0,
    "flex-col justify-end": a1
  };
};
class BroadcastRenderComponent {
  constructor(store, el, fullScreen, peerService, cd) {
    this.store = store;
    this.el = el;
    this.fullScreen = fullScreen;
    this.peerService = peerService;
    this.cd = cd;
    this.liveText = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.signal)('');
    this.textOutput = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.signal)([]);
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    const peerConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__.selectPeerServerConnected));
    const hostOnline = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__.selectHostOnline));
    this.connected = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.computed)(() => peerConnected() && hostOnline());
    this.error = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__.recognitionErrorSelector));
    this.textFlowDown = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.select)(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_3__.selectTextFlow), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(flow => flow === 'top-down')));
    this.hasLiveResults = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.computed)(() => {
      if (this.liveText() == '' && this.textOutput().length === 0) {
        return false;
      }
      return true;
    });
    if (this.fullScreen.isAvailable) {
      (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.effect)(() => {
        if (this.fullScreen.isFullscreen()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
        this.cd.detectChanges();
      });
    }
  }
  ngOnInit() {
    this.peerService.liveText$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.onDestroy$)).subscribe(text => {
      this.liveText.set(text);
      this.cd.detectChanges();
    });
    this.peerService.textOutput$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.onDestroy$)).subscribe(results => {
      this.textOutput.set(results);
      this.cd.detectChanges();
    });
    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }
  ngOnDestroy() {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
      this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__.selectBroadcastPaused).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.onDestroy$)).subscribe(() => {
        console.log('pause changed');
        this.cd.detectChanges();
      });
    }
    this.onDestroy$.next();
  }
  updateDom() {
    this.cd.detectChanges();
  }
}
BroadcastRenderComponent.ɵfac = function BroadcastRenderComponent_Factory(t) {
  return new (t || BroadcastRenderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_full_screen_full_screen_service__WEBPACK_IMPORTED_MODULE_4__.FullScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_peer_service__WEBPACK_IMPORTED_MODULE_0__.PeerService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ChangeDetectorRef));
};
BroadcastRenderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: BroadcastRenderComponent,
  selectors: [["app-broadcast-render"]],
  viewQuery: function BroadcastRenderComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.sidebarCheckbox = _t.first);
    }
  },
  decls: 11,
  vars: 11,
  consts: [[1, "drawer", "drawer-end", "overflow-y-hidden", "py-6"], ["id", "drawer-enable", "type", "checkbox", 1, "drawer-toggle", 3, "change"], ["enable", ""], [1, "drawer-content", "absolute", "top-0", "bottom-0", "left-0", "right-0"], [1, "flex", "flex-grow-0", "h-full", "overflow-hidden", "bg-base-100", 3, "ngClass"], ["hintText", "HINTS.streamConnected", 1, "flex", "flex-grow-0", "flex-shrink", "basis-full", "overflow-hidden", 3, "connected", "hasLiveResults", "textOutput", "error"], [3, "text", 4, "ngIf"], ["for", "drawer-enable", "class", "drawer-button btn btn-ghost btn-half-circle-left btn-info fixed top-1/2 right-0", 4, "ngIf"], [1, "drawer-side"], ["for", "drawer-enable", 1, "drawer-overlay", "opacity-0"], [4, "ngIf"], [3, "text"], ["for", "drawer-enable", 1, "drawer-button", "btn", "btn-ghost", "btn-half-circle-left", "btn-info", "fixed", "top-1/2", "right-0"], ["name", "heroChevronLeft", 1, "text-2xl"]],
  template: function BroadcastRenderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function BroadcastRenderComponent_Template_input_change_1_listener() {
        return ctx.updateDom();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "app-recognized-text", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, BroadcastRenderComponent_app_recognized_live_text_6_Template, 1, 1, "app-recognized-live-text", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, BroadcastRenderComponent_label_7_Template, 2, 2, "label", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "label", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](10, BroadcastRenderComponent_app_recognition_control_sidebar_10_Template, 1, 1, "app-recognition-control-sidebar", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](8, _c1, ctx.textFlowDown(), !ctx.textFlowDown()));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("connected", ctx.connected)("hasLiveResults", ctx.hasLiveResults)("textOutput", ctx.textOutput)("error", ctx.error);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.connected());
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.connected());
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _r0.checked);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_15__.NgIconComponent, _media_components_recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_5__.RecognizedTextComponent, _media_components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__.RecognizedLiveTextComponent, _media_components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_7__.RecognitionControlSidebarComponent],
  styles: [".drawer-end[_ngcontent-%COMP%]   .drawer-toggle[_ngcontent-%COMP%]    ~ .drawer-side[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb2FkY2FzdC1yZW5kZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtBQUNGIiwiZmlsZSI6ImJyb2FkY2FzdC1yZW5kZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJhd2VyLWVuZCAuZHJhd2VyLXRvZ2dsZSB+IC5kcmF3ZXItc2lkZSB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2Jyb2FkY2FzdC1yZW5kZXIvYnJvYWRjYXN0LXJlbmRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0Y7QUFDQSxnWEFBZ1giLCJzb3VyY2VzQ29udGVudCI6WyIuZHJhd2VyLWVuZCAuZHJhd2VyLXRvZ2dsZSB+IC5kcmF3ZXItc2lkZSB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_16__.slideInRightOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_16__.slideInUpOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_16__.slideOutDownOnLeaveAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_16__.slideOutRightOnLeaveAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_16__.fadeInOnEnterAnimation)()]
  }
});


/***/ }),

/***/ 1333:
/*!****************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/broadcast-room/broadcast-room.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BroadcastRoomComponent": () => (/* binding */ BroadcastRoomComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _media_services_recognition_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../media/services/recognition.service */ 6324);
/* harmony import */ var _services_peer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/peer.service */ 1785);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _media_components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../media/components/recognition-render/recognition-render.component */ 5741);














class BroadcastRoomComponent {
  constructor(store, recognitionService, peerService) {
    this.store = store;
    this.recognitionService = recognitionService;
    this.peerService = peerService;
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    this.recognitionConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionConnectedSelector));
    this.recognitionPaused = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionPausedSelector));
    this.liveText = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toObservable)((0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.computed)(() => this.recognitionConnected() || this.recognitionPaused() ? this.recognitionService.getLiveOutput('broadcast')() : ''));
    this.recognizedText = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toObservable)((0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.computed)(() => this.recognitionConnected() || this.recognitionPaused() ? this.recognitionService.getRecognizedText('broadcast')() : []));
    let isPaused = false;
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.effect)(() => {
      if (this.recognitionPaused()) {
        isPaused = true;
        console.log('broadcast paused');
        this.peerService.broadcastData({
          type: 'status',
          status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.paused
        });
      } else if (isPaused) {
        console.log('broadcast resumed');
        this.peerService.broadcastData({
          type: 'status',
          status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.connected
        });
        isPaused = false;
      }
    });
  }
  ngOnInit() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.connectRecognition({
      id: 'broadcast'
    }));
    this.liveText.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.onDestroy$)).subscribe(live => {
      this.peerService.broadcastData({
        recognition: live,
        type: 'live'
      });
    });
    this.recognizedText.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.onDestroy$)).subscribe(recognized => {
      this.peerService.broadcastData({
        recognition: recognized,
        type: 'segment'
      });
    });
  }
  ngOnDestroy() {
    if (this.recognitionConnected()) {
      this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.disconnectRecognition({
        id: 'broadcast'
      }));
    }
    this.onDestroy$.next();
  }
}
BroadcastRoomComponent.ɵfac = function BroadcastRoomComponent_Factory(t) {
  return new (t || BroadcastRoomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_media_services_recognition_service__WEBPACK_IMPORTED_MODULE_2__.RecognitionService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_peer_service__WEBPACK_IMPORTED_MODULE_3__.PeerService));
};
BroadcastRoomComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: BroadcastRoomComponent,
  selectors: [["app-broadcast-room"]],
  decls: 1,
  vars: 0,
  consts: [[1, "flex", "basis-full", "overflow-y-hidden"]],
  template: function BroadcastRoomComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-recognition-render", 0);
    }
  },
  dependencies: [_media_components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_4__.RecognitionRenderComponent],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJicm9hZGNhc3Qtcm9vbS5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2Jyb2FkY2FzdC1yb29tL2Jyb2FkY2FzdC1yb29tLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0S0FBNEsiLCJzb3VyY2VSb290IjoiIn0= */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_10__.slideInRightOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_10__.slideOutRightOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 5604:
/*!**********************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/connect-obs/connect-obs.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectObsComponent": () => (/* binding */ ConnectObsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../actions/obs.actions */ 8574);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../reducers/obs.reducer */ 9232);
/* harmony import */ var _selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../selectors/obs.selectors */ 7595);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 9295);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 1468);














function ConnectObsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const err_r8 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](err_r8);
  }
}
function ConnectObsComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "CONNECTIONS.obsStreamInactive");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ConnectObsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, ConnectObsComponent_div_7_div_1_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r1.obsIsStreaming());
  }
}
function ConnectObsComponent_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Invalid URL");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ConnectObsComponent_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ConnectObsComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Invalid URL");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ConnectObsComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0) {
  return {
    "btn-error": a0
  };
};
function ConnectObsComponent_button_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "BUTTONS.connect");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](2, _c0, ctx_r6.formGroup.invalid && ctx_r6.formGroup.touched))("disabled", ctx_r6.isConnecting());
  }
}
function ConnectObsComponent_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ConnectObsComponent_button_34_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r10.disconnect());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "BUTTONS.disconnect");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r7.isConnecting());
  }
}
const _c1 = function (a0) {
  return {
    "badge-success": a0
  };
};
const _c2 = function (a0) {
  return {
    "text-error": a0
  };
};
const _c3 = function (a0) {
  return {
    "input-error": a0
  };
};
class ConnectObsComponent {
  constructor(fb, store) {
    this.fb = fb;
    this.store = store;
    this.connectionState = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.toSignal)(this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_3__.selectObsConnected));
    this.error = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.toSignal)(this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_3__.selectObsError));
    this.obsIsStreaming = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.toSignal)(this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_3__.selectObsStreamActive));
    this.isConnected = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.computed)(() => this.connectionState() === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_2__.ObsConnectionState.connected);
    this.isConnecting = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.computed)(() => this.connectionState() === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_2__.ObsConnectionState.connecting);
    if (this.isConnected()) {
      this.startRecognition();
    }
    this.formGroup = this.fb.group({
      ip: this.fb.control(null),
      port: this.fb.control(null),
      password: this.fb.control(null)
    });
  }
  saveObsWebsocket() {
    this._autofillDefaultValue(this.formGroup.controls['ip'], '127.0.0.1');
    this._autofillDefaultValue(this.formGroup.controls['port'], 4455);
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {
        ip,
        port,
        password
      } = this.formGroup.value;
      this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_3__.selectObsConnected).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(conn => conn === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_2__.ObsConnectionState.connected), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.take)(1)).subscribe(() => this.startRecognition());
      this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connect({
        ip,
        port,
        password
      }));
    } else {
      this.formGroup.markAsTouched();
    }
  }
  disconnect() {
    this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.disconnect());
  }
  startRecognition() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.connectRecognition({
      id: 'stream'
    }));
  }
  stopRecognition() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognition({
      id: 'stream'
    }));
  }
  _autofillDefaultValue(control, value) {
    if (control.value === null) {
      control.patchValue(value);
    }
    return null;
  }
}
ConnectObsComponent.ɵfac = function ConnectObsComponent_Factory(t) {
  return new (t || ConnectObsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.Store));
};
ConnectObsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: ConnectObsComponent,
  selectors: [["app-connect-obs"]],
  decls: 35,
  vars: 28,
  consts: [[1, "flex", "flex-row", "items-center", "gap-3"], ["translate", "", 1, "text-lg", "text-primary", "py-3"], [1, "badge", "h-auto", 3, "ngClass"], ["class", "badge h-auto badge-error", 4, "ngIf"], [1, "flex", "flex-grow"], ["class", "flex", 4, "ngIf"], [1, "flex", "flex-row", "flex-wrap", "flex-grow-0", "gap-3", 3, "formGroup", "submit"], [1, "form-control", "basis-1/5"], [1, "label"], ["translate", "", 1, "label-text", 3, "ngClass"], ["type", "text", "placeholder", "127.0.0.1", "formControlName", "ip", 1, "input", "input-bordered", "input-lg", 3, "ngClass"], [1, "label", "no-height"], ["class", "label-alt-text text-error text-xs", 4, "ngIf"], ["type", "text", "placeholder", "4455", "formControlName", "port", 1, "input", "input-bordered", "input-lg", 3, "ngClass"], ["translate", "", 1, "label-text"], ["type", "text", "formControlName", "password", 1, "input", "input-bordered", "input-lg", 3, "placeholder"], [1, "flex", "flex-col", "basis-1/5", "self-end", "pb-5", "gap-3"], ["class", "btn btn-secondary", "translate", "", 3, "ngClass", "disabled", 4, "ngIf"], ["class", "btn btn-secondary", "type", "button", "translate", "", 3, "disabled", "click", 4, "ngIf"], [1, "badge", "h-auto", "badge-error"], [1, "flex"], ["class", "badge h-auto badge-secondary", "translate", "", 4, "ngIf"], ["translate", "", 1, "badge", "h-auto", "badge-secondary"], [1, "label-alt-text", "text-error", "text-xs"], ["translate", "", 1, "btn", "btn-secondary", 3, "ngClass", "disabled"], ["type", "button", "translate", "", 1, "btn", "btn-secondary", 3, "disabled", "click"]],
  template: function ConnectObsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "CONNECTIONS.obsStudio");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, ConnectObsComponent_div_5_Template, 2, 1, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, ConnectObsComponent_div_7_Template, 2, 1, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "form", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function ConnectObsComponent_Template_form_submit_8_listener() {
        return ctx.saveObsWebsocket();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 7)(10, "label", 8)(11, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "CONNECTIONS.obsStudioIP");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ConnectObsComponent_span_15_Template, 2, 0, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ConnectObsComponent_span_16_Template, 2, 0, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 7)(18, "label", 8)(19, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "CONNECTIONS.obsStudioPort");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](21, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, ConnectObsComponent_span_23_Template, 2, 0, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, ConnectObsComponent_span_24_Template, 2, 0, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 7)(26, "label", 8)(27, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28, "LABELS.password");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](29, "input", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](30, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](31, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](33, ConnectObsComponent_button_33_Template, 2, 4, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, ConnectObsComponent_button_34_Template, 2, 1, "button", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](18, _c1, ctx.isConnected()));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.connectionState());
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.error());
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isConnected());
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.formGroup);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](20, _c2, ctx.formGroup.invalid && ctx.formGroup.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](22, _c3, ctx.formGroup.invalid && ctx.formGroup.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.formGroup.controls["ip"].hasError("invalid") && ctx.formGroup.touched);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.formGroup.controls["ip"].hasError("required") && ctx.formGroup.touched);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](24, _c2, ctx.formGroup.invalid && ctx.formGroup.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](26, _c3, ctx.formGroup.invalid && ctx.formGroup.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.formGroup.controls["port"].hasError("invalid") && ctx.formGroup.touched);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.formGroup.controls["port"].hasError("required") && ctx.formGroup.touched);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](30, 16, "LABELS.optPassword"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isConnected());
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isConnected());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25uZWN0LW9icy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2Nvbm5lY3Qtb2JzL2Nvbm5lY3Qtb2JzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3S0FBd0siLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 8867:
/*!**************************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/connected-peer-count-chip/connected-peer-count-chip.component.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectedPeerCountChipComponent": () => (/* binding */ ConnectedPeerCountChipComponent)
/* harmony export */ });
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 1468);








const _c0 = function (a0, a1) {
  return {
    "badge-neutral": a0,
    "badge-success": a1
  };
};
class ConnectedPeerCountChipComponent {
  constructor(store) {
    this.store = store;
    this.count = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__.selectConnectedPeerCount));
  }
}
ConnectedPeerCountChipComponent.ɵfac = function ConnectedPeerCountChipComponent_Factory(t) {
  return new (t || ConnectedPeerCountChipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.Store));
};
ConnectedPeerCountChipComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: ConnectedPeerCountChipComponent,
  selectors: [["app-connected-peer-count-chip"]],
  decls: 3,
  vars: 8,
  consts: [[1, "badge", "h-auto", 3, "ngClass"]],
  template: function ConnectedPeerCountChipComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](5, _c0, !ctx.count(), ctx.count()));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 3, "STREAM.connectedPeers"), ": ", ctx.count(), "");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25uZWN0ZWQtcGVlci1jb3VudC1jaGlwLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2Nvbm5lY3RlZC1wZWVyLWNvdW50LWNoaXAvY29ubmVjdGVkLXBlZXItY291bnQtY2hpcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNExBQTRMIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 3566:
/*!**************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/end-broadcast/end-broadcast.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EndBroadcastComponent": () => (/* binding */ EndBroadcastComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 9295);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../actions/peer.actions */ 6365);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 1468);












const _c0 = ["modal"];
const _c1 = ["close"];
class EndBroadcastComponent {
  constructor(store, renderer) {
    this.store = store;
    this.renderer = renderer;
    this.isActive = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.select)(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__.recognitionStatusSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(status => status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionStatus.connected)));
  }
  confirmEndBroadcast() {
    this._openModal();
  }
  endBroadcast() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognition({
      id: 'broadcast'
    }));
    this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__.recognitionStatusSelector).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(status => status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionStatus.disconnected), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.take)(1)).subscribe(() => {
      console.log('recognition ended, ending broadcast');
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.endBroadcast());
    });
    this._closeModal();
  }
  hideModal() {
    this._closeModal();
  }
  _openModal() {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '');
  }
  _closeModal() {
    this.closeButton.nativeElement.click();
  }
}
EndBroadcastComponent.ɵfac = function EndBroadcastComponent_Factory(t) {
  return new (t || EndBroadcastComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2));
};
EndBroadcastComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: EndBroadcastComponent,
  selectors: [["app-end-broadcast"]],
  viewQuery: function EndBroadcastComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_8__.ElementRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 5, _angular_core__WEBPACK_IMPORTED_MODULE_8__.ElementRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.modal = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.closeButton = _t.first);
    }
  },
  decls: 17,
  vars: 3,
  consts: [[1, "tooltip", "tooltip-left", "tooltip-warning"], [1, "btn", "btn-circle", "btn-info", 3, "click"], ["name", "heroSignalSlash"], [1, "modal"], ["modal", ""], ["method", "dialog", 1, "modal-box", "bg-base-content", "text-base-100", "sm:w-11/12", "justify-self-center"], ["translate", ""], [1, "modal-action"], ["translate", "", "type", "button", 1, "btn", 3, "click"], ["type", "button", "translate", "", 1, "btn", 3, "click"], ["method", "dialog", 1, "modal-backdrop"], ["close", ""]],
  template: function EndBroadcastComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function EndBroadcastComponent_Template_button_click_2_listener() {
        return ctx.confirmEndBroadcast();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ng-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "dialog", 3, 4)(6, "form", 5)(7, "p", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "MODAL.confirmEndBroadcast");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 7)(10, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function EndBroadcastComponent_Template_button_click_10_listener() {
        return ctx.endBroadcast();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "BUTTONS.confirm");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function EndBroadcastComponent_Template_button_click_12_listener() {
        return ctx.hideModal();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, "BUTTONS.decline");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "form", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "button", null, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 1, "STREAM.endBroadcast"));
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _ng_icons_core__WEBPACK_IMPORTED_MODULE_10__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlbmQtYnJvYWRjYXN0LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2VuZC1icm9hZGNhc3QvZW5kLWJyb2FkY2FzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 6263:
/*!******************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/join-code/join-code.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JoinCodeComponent": () => (/* binding */ JoinCodeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-clipboard */ 1691);






function JoinCodeComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function JoinCodeComponent_div_0_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.showCopiedToClipboard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cbContent", ctx_r0.joinCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 4, "STREAM.copyJoinCodeTip"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 6, "STREAM.joinCode"), ": ", ctx_r0.joinCode.toUpperCase(), "\n");
  }
}
function JoinCodeComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3)(1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "STREAM.joinCodeCopied");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@slideInUpOnEnter", undefined)("@fadeOutOnLeave", undefined);
  }
}
class JoinCodeComponent {
  constructor() {
    this.showToast = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false);
  }
  showCopiedToClipboard() {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 1500);
  }
}
JoinCodeComponent.ɵfac = function JoinCodeComponent_Factory(t) {
  return new (t || JoinCodeComponent)();
};
JoinCodeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: JoinCodeComponent,
  selectors: [["app-join-code"]],
  inputs: {
    joinCode: "joinCode"
  },
  decls: 2,
  vars: 2,
  consts: [["class", "badge h-auto badge-info text-xl sm:text-2xl md:text-4xl lg:text-6xl cursor-pointer tooltip tooltip-bottom", "ngxClipboard", "", 3, "cbContent", "click", 4, "ngIf"], ["class", "toast z-10", 4, "ngIf"], ["ngxClipboard", "", 1, "badge", "h-auto", "badge-info", "text-xl", "sm:text-2xl", "md:text-4xl", "lg:text-6xl", "cursor-pointer", "tooltip", "tooltip-bottom", 3, "cbContent", "click"], [1, "toast", "z-10"], ["translate", "", 1, "alert", "alert-info"]],
  template: function JoinCodeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, JoinCodeComponent_div_0_Template, 4, 8, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, JoinCodeComponent_div_1_Template, 3, 2, "div", 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.joinCode);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showToast());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateDirective, ngx_clipboard__WEBPACK_IMPORTED_MODULE_3__.ClipboardDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJqb2luLWNvZGUuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2pvaW4tY29kZS9qb2luLWNvZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHdLQUF3SyIsInNvdXJjZVJvb3QiOiIifQ== */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_4__.slideInUpOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_4__.fadeOutOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 9141:
/*!**************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/leave-session/leave-session.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeaveSessionComponent": () => (/* binding */ LeaveSessionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../actions/peer.actions */ 6365);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9295);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 1468);












const _c0 = ["modal"];
const _c1 = ["close"];
class LeaveSessionComponent {
  set showDialog(open) {
    if (open) {
      this._openModal();
    }
  }
  constructor(store, renderer, router, route) {
    this.store = store;
    this.renderer = renderer;
    this.router = router;
    this.route = route;
    this.dialogClosed = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    this.confirmationRequired = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__.selectHostOnline));
  }
  confirmLeaveBroadcast() {
    if (this.confirmationRequired()) {
      this._openModal();
    } else {
      this.leaveBroadcast();
    }
  }
  leaveBroadcast() {
    this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.leaveBroadcastRoom());
    this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__.selectIsViewing).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(isViewing => !isViewing), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.take)(1)).subscribe(() => {
      this.dialogClosed.next(true);
    });
    this._closeModal();
    this.router.navigate(['..'], {
      queryParams: {
        joinCode: null
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route
    });
  }
  hideModal() {
    this.dialogClosed.next(false);
    this._closeModal();
  }
  _openModal() {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '');
  }
  _closeModal() {
    this.closeButton.nativeElement.click();
  }
}
LeaveSessionComponent.ɵfac = function LeaveSessionComponent_Factory(t) {
  return new (t || LeaveSessionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_6__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute));
};
LeaveSessionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: LeaveSessionComponent,
  selectors: [["app-leave-session"]],
  viewQuery: function LeaveSessionComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__.ElementRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.modal = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.closeButton = _t.first);
    }
  },
  inputs: {
    showDialog: "showDialog"
  },
  outputs: {
    dialogClosed: "dialogClosed"
  },
  decls: 15,
  vars: 0,
  consts: [["translate", "", 1, "btn", "btn-sm", 3, "click"], [1, "modal"], ["modal", ""], ["method", "dialog", 1, "modal-box", "bg-base-content", "text-base-100", "sm:w-11/12", "justify-self-center"], ["translate", ""], [1, "modal-action"], ["translate", "", "type", "button", 1, "btn", 3, "click"], ["type", "button", "translate", "", 1, "btn", 3, "click"], ["method", "dialog", 1, "modal-backdrop"], ["close", ""]],
  template: function LeaveSessionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LeaveSessionComponent_Template_button_click_0_listener() {
        return ctx.confirmLeaveBroadcast();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "STREAM.leaveSession");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "dialog", 1, 2)(4, "form", 3)(5, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "MODAL.confirmLeaveSession");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 5)(8, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LeaveSessionComponent_Template_button_click_8_listener() {
        return ctx.leaveBroadcast();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "BUTTONS.confirm");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LeaveSessionComponent_Template_button_click_10_listener() {
        return ctx.hideModal();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "BUTTONS.decline");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "form", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "button", null, 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateDirective],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsZWF2ZS1zZXNzaW9uLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL2xlYXZlLXNlc3Npb24vbGVhdmUtc2Vzc2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 2586:
/*!****************************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/obs-connection-status-chip/obs-connection-status-chip.component.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsConnectionStatusChipComponent": () => (/* binding */ ObsConnectionStatusChipComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../reducers/obs.reducer */ 9232);
/* harmony import */ var _selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/obs.selectors */ 7595);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../../shared-ui/src/lib/pipes/proper.pipe */ 4367);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 1468);










function ObsConnectionStatusChipComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, "CONNECTIONS.obsStudio"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 4, "LABELS.streaming"), "");
  }
}
function ObsConnectionStatusChipComponent_ng_template_1_div_0_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, "LABELS.stream"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 4, "LABELS.idle"), " ");
  }
}
const _c0 = function (a0) {
  return {
    "badge-success": a0
  };
};
function ObsConnectionStatusChipComponent_ng_template_1_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "proper");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ObsConnectionStatusChipComponent_ng_template_1_div_0_span_5_Template, 4, 6, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const state_r4 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](8, _c0, ctx_r3.connected()));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 4, "CONNECTIONS.obsStudio"), ": ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 6, state_r4), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.connected());
  }
}
function ObsConnectionStatusChipComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ObsConnectionStatusChipComponent_ng_template_1_div_0_Template, 6, 10, "div", 3);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.connectionState());
  }
}
class ObsConnectionStatusChipComponent {
  constructor(store) {
    this.store = store;
    this.connectionState = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_1__.selectObsConnected));
    this.connected = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this.connectionState() === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_0__.ObsConnectionState.connected);
    this.streamingActive = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_1__.selectObsStreamActive));
  }
}
ObsConnectionStatusChipComponent.ɵfac = function ObsConnectionStatusChipComponent_Factory(t) {
  return new (t || ObsConnectionStatusChipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store));
};
ObsConnectionStatusChipComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: ObsConnectionStatusChipComponent,
  selectors: [["app-obs-connection-status-chip"]],
  decls: 3,
  vars: 2,
  consts: [["class", "badge badge-success h-auto", 4, "ngIf", "ngIfElse"], ["connectionBadge", ""], [1, "badge", "badge-success", "h-auto"], ["class", "badge gap-1 h-auto", 3, "ngClass", 4, "ngIf"], [1, "badge", "gap-1", "h-auto", 3, "ngClass"], [4, "ngIf"]],
  template: function ObsConnectionStatusChipComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ObsConnectionStatusChipComponent_div_0_Template, 4, 6, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ObsConnectionStatusChipComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.streamingActive())("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_6__.ProperPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvYnMtY29ubmVjdGlvbi1zdGF0dXMtY2hpcC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL29icy1jb25uZWN0aW9uLXN0YXR1cy1jaGlwL29icy1jb25uZWN0aW9uLXN0YXR1cy1jaGlwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0TEFBNEwiLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 5749:
/*!************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/peer-landing/peer-landing.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerLandingComponent": () => (/* binding */ PeerLandingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! rxjs */ 9295);
/* harmony import */ var _actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../actions/obs.actions */ 8574);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../actions/peer.actions */ 6365);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/app.model */ 4056);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../selectors/app.selector */ 8603);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../selectors/obs.selectors */ 7595);
/* harmony import */ var _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../reducers/obs.reducer */ 9232);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _end_broadcast_end_broadcast_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../end-broadcast/end-broadcast.component */ 3566);
/* harmony import */ var _socket_server_status_chip_socket_server_status_chip_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../socket-server-status-chip/socket-server-status-chip.component */ 2433);
/* harmony import */ var _peer_server_status_chip_peer_server_status_chip_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../peer-server-status-chip/peer-server-status-chip.component */ 2950);
/* harmony import */ var _connected_peer_count_chip_connected_peer_count_chip_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../connected-peer-count-chip/connected-peer-count-chip.component */ 8867);
/* harmony import */ var _room_id_room_id_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../room-id/room-id.component */ 9607);
/* harmony import */ var _join_code_join_code_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../join-code/join-code.component */ 6263);
/* harmony import */ var _broadcast_room_broadcast_room_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../broadcast-room/broadcast-room.component */ 1333);
/* harmony import */ var _accept_peer_connections_modal_accept_peer_connections_modal_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../accept-peer-connections-modal/accept-peer-connections-modal.component */ 7146);
/* harmony import */ var _third_party_connections_third_party_connections_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../third-party-connections/third-party-connections.component */ 2644);
/* harmony import */ var _obs_connection_status_chip_obs_connection_status_chip_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../obs-connection-status-chip/obs-connection-status-chip.component */ 2586);
/* harmony import */ var _stream_captions_stream_captions_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../stream-captions/stream-captions.component */ 1976);

































function PeerLandingComponent_div_1_ng_container_1_app_obs_connection_status_chip_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "app-obs-connection-status-chip");
  }
}
function PeerLandingComponent_div_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "app-socket-server-status-chip")(2, "app-peer-server-status-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](3, PeerLandingComponent_div_1_ng_container_1_app_obs_connection_status_chip_3_Template, 1, 0, "app-obs-connection-status-chip", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r7.showObsStatus());
  }
}
function PeerLandingComponent_div_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "app-room-id", 11)(2, "app-join-code", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("roomId", ctx_r9.roomId());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("joinCode", ctx_r9.joinCode());
  }
}
function PeerLandingComponent_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const err_r14 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](err_r14);
  }
}
function PeerLandingComponent_div_1_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "app-connected-peer-count-chip")(3, "app-end-broadcast");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
}
function PeerLandingComponent_div_1_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function PeerLandingComponent_div_1_ng_container_7_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r15.stopWebsocketRecognition());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "ng-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
}
function PeerLandingComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, PeerLandingComponent_div_1_ng_container_1_Template, 4, 1, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PeerLandingComponent_div_1_ng_template_2_Template, 3, 2, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, PeerLandingComponent_div_1_div_4_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](6, PeerLandingComponent_div_1_ng_container_6_Template, 4, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](7, PeerLandingComponent_div_1_ng_container_7_Template, 3, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](3);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r0.isBroadcasting())("ngIfElse", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r0.serverError());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r0.isBroadcasting());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r0.isBroadcasting() && ctx_r0.recognitionActive());
  }
}
function PeerLandingComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 17)(1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2, "STREAM.permissionRequired");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
}
function PeerLandingComponent_ng_container_4_app_broadcast_room_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "app-broadcast-room", 20);
  }
}
function PeerLandingComponent_ng_container_4_app_stream_captions_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "app-stream-captions", 20);
  }
}
function PeerLandingComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, PeerLandingComponent_ng_container_4_app_broadcast_room_1_Template, 1, 0, "app-broadcast-room", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PeerLandingComponent_ng_container_4_app_stream_captions_2_Template, 1, 0, "app-stream-captions", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r3.isBroadcasting());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx_r3.isBroadcasting() && ctx_r3.recognitionActive());
  }
}
function PeerLandingComponent_ng_template_5_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 45)(1, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function PeerLandingComponent_ng_template_5_div_9_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r28.createRoom());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](2, "STREAM.createBroadcast");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](4, " STREAM.broadcastExplanantion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", ctx_r20.serverOffline() || ctx_r20.serverError());
  }
}
function PeerLandingComponent_ng_template_5_ng_template_10_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "ERRORS.mobileBroadcast");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PeerLandingComponent_ng_template_5_ng_template_10_ng_container_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "ERRORS.unsupportedBrowserBroadcast");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PeerLandingComponent_ng_template_5_ng_template_10_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, PeerLandingComponent_ng_template_5_ng_template_10_ng_container_0_div_1_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PeerLandingComponent_ng_template_5_ng_template_10_ng_container_0_div_2_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r30.isMobileDevice());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r30.isIncompatibleBrowser());
  }
}
function PeerLandingComponent_ng_template_5_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, PeerLandingComponent_ng_template_5_ng_template_10_ng_container_0_Template, 3, 2, "ng-container", 5);
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r22.acceptedPeerConnections());
  }
}
function PeerLandingComponent_ng_template_5_span_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "Invalid ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PeerLandingComponent_ng_template_5_span_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PeerLandingComponent_ng_template_5_span_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "Invalid ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PeerLandingComponent_ng_template_5_span_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
function PeerLandingComponent_ng_template_5_app_third_party_connections_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "app-third-party-connections", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("openStateChanged", function PeerLandingComponent_ng_template_5_app_third_party_connections_40_Template_app_third_party_connections_openStateChanged_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r34);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](_r19.checked = !$event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0) {
  return {
    "text-error": a0
  };
};
const _c1 = function (a0) {
  return {
    "input-error": a0
  };
};
const _c2 = function (a0, a1) {
  return {
    "btn-primary": a0,
    "btn-neutral": a1
  };
};
function PeerLandingComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 21)(1, "div", 22)(2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "input", 24, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("click", function PeerLandingComponent_ng_template_5_Template_div_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r36);
      const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](_r19.checked = !_r19.checked);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](6, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](7, "Peer Broadcasting");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](8, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](9, PeerLandingComponent_ng_template_5_div_9_Template, 5, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](10, PeerLandingComponent_ng_template_5_ng_template_10_Template, 1, 1, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](12, "form", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function PeerLandingComponent_ng_template_5_Template_form_submit_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵrestoreView"](_r36);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresetView"](ctx_r37.joinSession());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](13, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](16, "div", 33)(17, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](18, "STREAM.joinSession");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](19, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](20, " STREAM.joinSessionExplanation ");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](21, "div", 33)(22, "div", 36)(23, "label", 37)(24, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](25, "STREAM.sessionId");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](26, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](27, "label", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](28, PeerLandingComponent_ng_template_5_span_28_Template, 2, 0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](29, PeerLandingComponent_ng_template_5_span_29_Template, 2, 0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](30, "div", 36)(31, "label", 37)(32, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](33, "STREAM.joinCode");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](34, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](35, "label", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](36, PeerLandingComponent_ng_template_5_span_36_Template, 2, 0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](37, PeerLandingComponent_ng_template_5_span_37_Template, 2, 0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](38, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtext"](39, "BUTTONS.connect");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](40, PeerLandingComponent_ng_template_5_app_third_party_connections_40_Template, 1, 0, "app-third-party-connections", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](11);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx_r5.isMobileDevice() || ctx_r5.isIncompatibleBrowser()))("ngIfElse", _r21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("formGroup", ctx_r5.joinSessionFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpipeBind1"](15, 16, "STREAM.joinSession"));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("disabled", ctx_r5.serverOffline() || ctx_r5.serverError());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](18, _c0, ctx_r5.joinSessionFormGroup.controls["session"].invalid && ctx_r5.joinSessionFormGroup.controls["session"].touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](20, _c1, ctx_r5.joinSessionFormGroup.controls["session"].invalid && ctx_r5.joinSessionFormGroup.controls["session"].touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r5.joinSessionFormGroup.controls["session"].hasError("invalid") && ctx_r5.joinSessionFormGroup.controls["session"].touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r5.joinSessionFormGroup.controls["session"].hasError("required") && ctx_r5.joinSessionFormGroup.controls["session"].touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](22, _c0, ctx_r5.joinSessionFormGroup.controls["joinCode"].invalid && ctx_r5.joinSessionFormGroup.controls["joinCode"].touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction1"](24, _c1, ctx_r5.joinSessionFormGroup.controls["joinCode"].invalid && ctx_r5.joinSessionFormGroup.controls["joinCode"].touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r5.joinSessionFormGroup.controls["joinCode"].hasError("invalid") && ctx_r5.joinSessionFormGroup.controls["joinCode"].touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r5.joinSessionFormGroup.controls["joinCode"].hasError("required") && ctx_r5.joinSessionFormGroup.controls["joinCode"].touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵpureFunction2"](26, _c2, ctx_r5.joinSessionFormGroup.valid, ctx_r5.joinSessionFormGroup.invalid))("disabled", ctx_r5.serverOffline() || ctx_r5.serverError());
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx_r5.isMobileDevice() || ctx_r5.isIncompatibleBrowser()));
  }
}
function PeerLandingComponent_app_accept_peer_connections_modal_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "app-accept-peer-connections-modal");
  }
}
class PeerLandingComponent {
  constructor(store, fb, router, route) {
    this.store = store;
    this.fb = fb;
    this.router = router;
    this.route = route;
    this.joinSessionFormGroup = this.fb.group({
      session: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required, ctrl => this._validateSessionId(ctrl)]),
      joinCode: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required, ctrl => this._validateJoinCode(ctrl)])
    });
    this.acceptedPeerConnections = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_4__.peerConnectionsAcceptedSelector));
    this.socketServerConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectSocketServerConnected));
    this.peerServerConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectPeerServerConnected));
    this.roomId = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectRoomId));
    this.joinCode = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectJoinCode));
    this.isBroadcasting = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectIsBroadcasting));
    this.recognitionActive = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_6__.recognitionActiveSelector));
    this.showObsStatus = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_23__.select)(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_7__.selectObsConnected), (0,rxjs__WEBPACK_IMPORTED_MODULE_24__.map)(state => state !== _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_8__.ObsConnectionState.uninitialized)));
    this.serverError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectPeerError));
    this.serverOffline = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectServerOffline));
    this.store.select(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_4__.platformSelector);
    this.isMobileDevice = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_23__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_4__.platformSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_24__.map)(platform => platform === _models_app_model__WEBPACK_IMPORTED_MODULE_2__.AppPlatform.mobile)));
    this.isIncompatibleBrowser = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_23__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_4__.platformSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_24__.map)(platform => platform === _models_app_model__WEBPACK_IMPORTED_MODULE_2__.AppPlatform.unsupported)));
    this._injectDashIfRequired();
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_20__.effect)(() => {
      if (this.acceptedPeerConnections() && !this.socketServerConnected()) {
        this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__.PeerActions.connectSocketServer());
      }
    }, {
      allowSignalWrites: true
    });
  }
  ngOnInit() {
    if (this.acceptedPeerConnections() && !this.socketServerConnected()) {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__.PeerActions.connectSocketServer());
    }
  }
  ngOnDestroy() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_3__.RecognitionActions.resetRecogntionState());
  }
  stopWebsocketRecognition() {
    this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.disconnect());
    this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_7__.selectObsConnected).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_25__.filter)(state => state === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_8__.ObsConnectionState.disconnected), (0,rxjs__WEBPACK_IMPORTED_MODULE_26__.take)(1)).subscribe(() => this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_3__.RecognitionActions.disconnectRecognition({
      id: 'stream'
    })));
  }
  canDeactivate() {
    return !(0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_5__.selectIsBroadcasting))();
  }
  createRoom() {
    this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__.PeerActions.createBroadcastRoom());
  }
  joinSession() {
    this.joinSessionFormGroup.updateValueAndValidity();
    if (this.joinSessionFormGroup.valid) {
      const id = this.joinSessionFormGroup.value.session;
      const joinCode = this.joinSessionFormGroup.value.joinCode;
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__.PeerActions.setJoinCode({
        joinCode
      }));
      this.router.navigate([id], {
        queryParams: {
          joinCode
        },
        relativeTo: this.route
      });
    } else {
      this.joinSessionFormGroup.markAllAsTouched();
    }
    return false;
  }
  _validateSessionId(control) {
    if (control.value) {
      const exp = new RegExp(/^([acdefghjkmnpqrstuvwxyz2345679]{4})-([acdefghjkmnpqrstuvwxyz2345679]{4})$/i);
      if (!exp.test(control.value)) {
        return {
          invalid: true
        };
      }
    }
    return null;
  }
  _validateJoinCode(control) {
    if (control.value) {
      const exp = new RegExp(/^([acdefghjkmnpqrstuvwxyz2345679]{4})$/i);
      if (!exp.test(control.value)) {
        return {
          invalid: true
        };
      }
    }
    return null;
  }
  _injectDashIfRequired() {
    const sessionControl = this.joinSessionFormGroup.controls['session'];
    sessionControl.valueChanges.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_22__.takeUntilDestroyed)()).subscribe(value => {
      if (value && value.length > 4) {
        if (value[4] !== '-') {
          sessionControl.setValue(value.slice(0, 4) + '-' + value.slice(4, value.length));
        }
      }
    });
  }
}
PeerLandingComponent.ɵfac = function PeerLandingComponent_Factory(t) {
  return new (t || PeerLandingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_23__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_27__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_27__.ActivatedRoute));
};
PeerLandingComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: PeerLandingComponent,
  selectors: [["app-peer-landing"]],
  hostBindings: function PeerLandingComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("beforeunload", function PeerLandingComponent_beforeunload_HostBindingHandler() {
        return ctx.acceptedPeerConnections();
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵresolveWindow"]);
    }
  },
  decls: 8,
  vars: 5,
  consts: [[1, "flex", "flex-col", "basis-full", "overflow-hidden", "flex-grow-0", "bg-base-300", "text-base-content"], ["class", "flex flex-row gap-3 items-center p-3", 4, "ngIf", "ngIfElse"], ["acceptPermissions", ""], [4, "ngIf", "ngIfElse"], ["landing", ""], [4, "ngIf"], [1, "flex", "flex-row", "gap-3", "items-center", "p-3"], ["broadcastControls", ""], ["class", "badge h-auto badge-error", 4, "ngIf"], [1, "flex", "flex-1"], [1, "flex", "flex-row", "flex-wrap", "gap-3"], [3, "roomId"], [3, "joinCode"], [1, "badge", "h-auto", "badge-error"], [1, "flex", "flex-grow", "flex-row", "flex-wrap-reverse", "items-center", "gap-3", "justify-end"], [1, "btn", "btn-circle", "btn-ghost", 3, "click"], ["name", "heroMicrophoneSlash"], [1, "flex", "flex-row", "self-stretch", "gap-3", "items-center", "justify-center", "p-3", "text-warning", "text-lg"], ["translate", ""], ["class", "flex basis-full overflow-y-hidden", 4, "ngIf"], [1, "flex", "basis-full", "overflow-y-hidden"], [1, "flex", "basis-full", "items-stretch", "justify-center", "overflow-y-auto"], [1, "max-w-4xl", "p-3"], [1, "collapse", "collapse-arrow", "bg-base-100", "mb-6", "sm:mb-12"], ["type", "checkbox", "checked", ""], ["broadcastOpen", ""], [1, "collapse-title", "flex", "flex-row", "items-center", "gap-3", 3, "click"], ["translate", "", 1, "text-xl"], [1, "collapse-content"], ["class", "form-row mb-6 sm:mb-12", 4, "ngIf", "ngIfElse"], ["broadcastingNotAvailable", ""], [1, "flex", "flex-col", "sm:gap-12", "gap-6", 3, "formGroup", "submit"], [1, "sm:hidden", "divider", "divider-vertical", "uppercase"], [1, "form-row"], ["translate", "", 1, "hidden", "sm:block", "w-64", "btn", "btn-primary", "btn-lg", 3, "disabled"], ["translate", "", 1, "flex", "basis-full", "sm:basis-1/2"], [1, "form-control"], [1, "label"], ["translate", "", 1, "label-text", 3, "ngClass"], ["type", "text", "maxlength", "9", "placeholder", "A79E-F2GV", "formControlName", "session", 1, "input", "input-bordered", "input-lg", 3, "ngClass"], [1, "label", "no-height"], ["class", "label-alt-text text-error text-xs", 4, "ngIf"], ["type", "text", "maxlength", "4", "placeholder", "E5F6", "formControlName", "joinCode", 1, "input", "input-bordered", "input-lg", 3, "ngClass"], ["translate", "", 1, "w-64", "btn", "btn-lg", "mt-3", 3, "ngClass", "disabled"], [3, "openStateChanged", 4, "ngIf"], [1, "form-row", "mb-6", "sm:mb-12"], ["translate", "", 1, "w-64", "btn", "btn-primary", "btn-lg", 3, "disabled", "click"], ["translate", "", 1, "flex", "basis-1/2"], ["class", "text-warning text-center", "translate", "", 4, "ngIf"], ["translate", "", 1, "text-warning", "text-center"], [1, "label-alt-text", "text-error", "text-xs"], [3, "openStateChanged"]],
  template: function PeerLandingComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, PeerLandingComponent_div_1_Template, 8, 5, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, PeerLandingComponent_ng_template_2_Template, 3, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, PeerLandingComponent_ng_container_4_Template, 3, 2, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](5, PeerLandingComponent_ng_template_5_Template, 41, 29, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](7, PeerLandingComponent_app_accept_peer_connections_modal_7_Template, 1, 0, "app-accept-peer-connections-modal", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](3);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.acceptedPeerConnections())("ngIfElse", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.isBroadcasting() || ctx.recognitionActive())("ngIfElse", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !ctx.acceptedPeerConnections());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_28__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_28__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_21__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_21__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormControlName, _ng_icons_core__WEBPACK_IMPORTED_MODULE_29__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__.TranslateDirective, _end_broadcast_end_broadcast_component__WEBPACK_IMPORTED_MODULE_9__.EndBroadcastComponent, _socket_server_status_chip_socket_server_status_chip_component__WEBPACK_IMPORTED_MODULE_10__.SocketServerStatusChipComponent, _peer_server_status_chip_peer_server_status_chip_component__WEBPACK_IMPORTED_MODULE_11__.PeerServerStatusChipComponent, _connected_peer_count_chip_connected_peer_count_chip_component__WEBPACK_IMPORTED_MODULE_12__.ConnectedPeerCountChipComponent, _room_id_room_id_component__WEBPACK_IMPORTED_MODULE_13__.RoomIdComponent, _join_code_join_code_component__WEBPACK_IMPORTED_MODULE_14__.JoinCodeComponent, _broadcast_room_broadcast_room_component__WEBPACK_IMPORTED_MODULE_15__.BroadcastRoomComponent, _accept_peer_connections_modal_accept_peer_connections_modal_component__WEBPACK_IMPORTED_MODULE_16__.AcceptPeerConnectionsModalComponent, _third_party_connections_third_party_connections_component__WEBPACK_IMPORTED_MODULE_17__.ThirdPartyConnectionsComponent, _obs_connection_status_chip_obs_connection_status_chip_component__WEBPACK_IMPORTED_MODULE_18__.ObsConnectionStatusChipComponent, _stream_captions_stream_captions_component__WEBPACK_IMPORTED_MODULE_19__.StreamCaptionsComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__.TranslatePipe],
  styles: [".form-row[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n    gap: 0.75rem\n}\n@media (min-width: 640px) {\n    .form-row[_ngcontent-%COMP%] {\n        justify-content: space-between;\n        gap: 1.5rem\n    }\n}\n@media (min-width: 1024px) {\n    .form-row[_ngcontent-%COMP%] {\n        gap: 3rem\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlZXItbGFuZGluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtJQUFBLGFBQUE7SUFBQSxtQkFBQTtJQUFBLGVBQUE7SUFBQSxtQkFBQTtJQUFBLHVCQUFBO0lBQUE7QUFBQTtBQUFBO0lBQUE7UUFBQSw4QkFBQTtRQUFBO0lBQUE7QUFBQTtBQUFBO0lBQUE7UUFBQTtJQUFBO0FBQUEiLCJmaWxlIjoicGVlci1sYW5kaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tcm93IHtcbiAgQGFwcGx5IGZsZXggZmxleC1yb3cgZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LWJldHdlZW4gbGc6Z2FwLTEyIHNtOmdhcC02IGdhcC0zO1xufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3BlZXItbGFuZGluZy9wZWVyLWxhbmRpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7SUFBQSxhQUFBO0lBQUEsbUJBQUE7SUFBQSxlQUFBO0lBQUEsbUJBQUE7SUFBQSx1QkFBQTtJQUFBO0FBQUE7QUFBQTtJQUFBO1FBQUEsOEJBQUE7UUFBQTtJQUFBO0FBQUE7QUFBQTtJQUFBO1FBQUE7SUFBQTtBQUFBO0FBa0JGLDRqQkFBNGpCIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tcm93IHtcbiAgQGFwcGx5IGZsZXggZmxleC1yb3cgZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LWJldHdlZW4gbGc6Z2FwLTEyIHNtOmdhcC02IGdhcC0zO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 2950:
/*!**********************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/peer-server-status-chip/peer-server-status-chip.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerServerStatusChipComponent": () => (/* binding */ PeerServerStatusChipComponent)
/* harmony export */ });
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../actions/peer.actions */ 6365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 1468);









function PeerServerStatusChipComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "STREAM.connecting"));
  }
}
function PeerServerStatusChipComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, ctx_r2.connected() ? "STREAM.online" : "STREAM.offline"), " ");
  }
}
const _c0 = function (a0, a1, a2) {
  return {
    "badge-neutral": a0,
    "badge-success": a1,
    "badge-error": a2
  };
};
class PeerServerStatusChipComponent {
  constructor(store) {
    this.store = store;
    this.connected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__.selectPeerServerConnected));
    this.serverError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__.selectPeerError));
  }
  reconnect() {
    if (!this.connected()) {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__.PeerActions.connectPeerServer());
    }
  }
}
PeerServerStatusChipComponent.ɵfac = function PeerServerStatusChipComponent_Factory(t) {
  return new (t || PeerServerStatusChipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store));
};
PeerServerStatusChipComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: PeerServerStatusChipComponent,
  selectors: [["app-peer-server-status-chip"]],
  decls: 6,
  vars: 10,
  consts: [[1, "badge", "h-auto", 3, "ngClass", "click"], [4, "ngIf", "ngIfElse"], ["state", ""]],
  template: function PeerServerStatusChipComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PeerServerStatusChipComponent_Template_button_click_0_listener() {
        return ctx.reconnect();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PeerServerStatusChipComponent_ng_container_3_Template, 3, 3, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PeerServerStatusChipComponent_ng_template_4_Template, 2, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction3"](6, _c0, !ctx.connected(), ctx.connected(), ctx.serverError()));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 4, "STREAM.peerStatus"), ": ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.connected() === undefined && !ctx.serverError())("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwZWVyLXNlcnZlci1zdGF0dXMtY2hpcC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3BlZXItc2VydmVyLXN0YXR1cy1jaGlwL3BlZXItc2VydmVyLXN0YXR1cy1jaGlwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3TEFBd0wiLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 9607:
/*!**************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/room-id/room-id.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoomIdComponent": () => (/* binding */ RoomIdComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-clipboard */ 1691);






function RoomIdComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RoomIdComponent_div_0_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.showCopiedToClipboard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cbContent", ctx_r0.roomId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 4, "STREAM.copyIdTip"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 6, "STREAM.sessionId"), ": ", ctx_r0.roomId.toUpperCase(), "\n");
  }
}
function RoomIdComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3)(1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "STREAM.sessionIdCopied");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@slideInUpOnEnter", undefined)("@fadeOutOnLeave", undefined);
  }
}
class RoomIdComponent {
  constructor() {
    this.showToast = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(false);
  }
  showCopiedToClipboard() {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 1500);
  }
}
RoomIdComponent.ɵfac = function RoomIdComponent_Factory(t) {
  return new (t || RoomIdComponent)();
};
RoomIdComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: RoomIdComponent,
  selectors: [["app-room-id"]],
  inputs: {
    roomId: "roomId"
  },
  decls: 2,
  vars: 2,
  consts: [["class", "badge h-auto badge-primary text-xl sm:text-2xl md:text-4xl lg:text-6xl cursor-pointer tooltip tooltip-bottom", "ngxClipboard", "", 3, "cbContent", "click", 4, "ngIf"], ["class", "toast z-10", 4, "ngIf"], ["ngxClipboard", "", 1, "badge", "h-auto", "badge-primary", "text-xl", "sm:text-2xl", "md:text-4xl", "lg:text-6xl", "cursor-pointer", "tooltip", "tooltip-bottom", 3, "cbContent", "click"], [1, "toast", "z-10"], ["translate", "", 1, "alert", "alert-info"]],
  template: function RoomIdComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RoomIdComponent_div_0_Template, 4, 8, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RoomIdComponent_div_1_Template, 3, 2, "div", 1);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.roomId);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showToast());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateDirective, ngx_clipboard__WEBPACK_IMPORTED_MODULE_3__.ClipboardDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb29tLWlkLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3Jvb20taWQvcm9vbS1pZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0tBQW9LIiwic291cmNlUm9vdCI6IiJ9 */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_4__.slideInUpOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_4__.fadeOutOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 2433:
/*!**************************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/socket-server-status-chip/socket-server-status-chip.component.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketServerStatusChipComponent": () => (/* binding */ SocketServerStatusChipComponent)
/* harmony export */ });
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../actions/peer.actions */ 6365);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 1468);









function SocketServerStatusChipComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "STREAM.connecting"));
  }
}
function SocketServerStatusChipComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, ctx_r2.connected() ? "STREAM.online" : "STREAM.offline"), " ");
  }
}
const _c0 = function (a0, a1, a2) {
  return {
    "badge-neutral": a0,
    "badge-success": a1,
    "badge-error": a2
  };
};
class SocketServerStatusChipComponent {
  constructor(store) {
    this.store = store;
    this.connected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__.selectSocketServerConnected));
    this.serverError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__.selectPeerError));
  }
  reconnect() {
    if (!this.connected()) {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_1__.PeerActions.connectSocketServer());
    }
  }
}
SocketServerStatusChipComponent.ɵfac = function SocketServerStatusChipComponent_Factory(t) {
  return new (t || SocketServerStatusChipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store));
};
SocketServerStatusChipComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: SocketServerStatusChipComponent,
  selectors: [["app-socket-server-status-chip"]],
  decls: 6,
  vars: 10,
  consts: [[1, "badge", "h-auto", 3, "ngClass", "click"], [4, "ngIf", "ngIfElse"], ["state", ""]],
  template: function SocketServerStatusChipComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SocketServerStatusChipComponent_Template_button_click_0_listener() {
        return ctx.reconnect();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SocketServerStatusChipComponent_ng_container_3_Template, 3, 3, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SocketServerStatusChipComponent_ng_template_4_Template, 2, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction3"](6, _c0, !ctx.connected(), ctx.connected(), ctx.serverError()));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 4, "STREAM.serverStatus"), ": ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.connected() === undefined)("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzb2NrZXQtc2VydmVyLXN0YXR1cy1jaGlwLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3NvY2tldC1zZXJ2ZXItc3RhdHVzLWNoaXAvc29ja2V0LXNlcnZlci1zdGF0dXMtY2hpcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNExBQTRMIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 1976:
/*!******************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/stream-captions/stream-captions.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StreamCaptionsComponent": () => (/* binding */ StreamCaptionsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _services_obs_connection_obs_connection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/obs-connection/obs-connection.service */ 7034);
/* harmony import */ var _media_services_recognition_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../media/services/recognition.service */ 6324);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _media_components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../media/components/recognized-live-text/recognized-live-text.component */ 3643);
/* harmony import */ var _media_components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../media/components/recognition-control-sidebar/recognition-control-sidebar.component */ 213);


















function StreamCaptionsComponent_app_recognized_live_text_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "app-recognized-live-text", 10);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("text", ctx_r1.liveText);
  }
}
function StreamCaptionsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "HINTS.recognitionPaused");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function StreamCaptionsComponent_label_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ng-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("@slideInRightOnEnter", undefined)("@slideOutRightOnLeave", undefined);
  }
}
class StreamCaptionsComponent {
  constructor(store, recognitionService, obs) {
    this.store = store;
    this.recognitionService = recognitionService;
    this.obs = obs;
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    this.recognitionConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionConnectedSelector));
    this.recognitionPaused = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionPausedSelector));
    this.liveText = (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.computed)(() => this.recognitionConnected() || this.recognitionPaused() ? this.recognitionService.getLiveOutput('stream')() : '');
    this.liveText$ = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.toObservable)(this.liveText);
  }
  ngOnInit() {
    this.liveText$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.onDestroy$)).subscribe(live => {
      this.obs.sendCaption(live);
    });
  }
  ngOnDestroy() {
    if (this.recognitionConnected()) {
      this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.disconnectRecognition({
        id: 'stream'
      }));
    }
    this.onDestroy$.next();
  }
}
StreamCaptionsComponent.ɵfac = function StreamCaptionsComponent_Factory(t) {
  return new (t || StreamCaptionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_media_services_recognition_service__WEBPACK_IMPORTED_MODULE_3__.RecognitionService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_obs_connection_obs_connection_service__WEBPACK_IMPORTED_MODULE_2__.ObsConnectionService));
};
StreamCaptionsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: StreamCaptionsComponent,
  selectors: [["app-stream-captions"]],
  decls: 10,
  vars: 6,
  consts: [[1, "drawer", "drawer-end", "overflow-y-hidden", "relative"], ["id", "drawer-enable", "type", "checkbox", 1, "drawer-toggle"], ["enable", ""], [1, "drawer-content", "absolute", "top-0", "bottom-0", "left-0", "right-0"], [3, "text", 4, "ngIf"], ["class", "badge badge-warning px-6 py-3 text-center h-auto fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2", "translate", "", 4, "ngIf"], ["for", "drawer-enable", "class", "drawer-button btn btn-ghost btn-half-circle-left btn-info fixed top-1/2 right-0", 4, "ngIf"], [1, "drawer-side"], ["for", "drawer-enable", 1, "drawer-overlay", "opacity-0"], [3, "showFullscreen", "showTextFlow"], [3, "text"], ["translate", "", 1, "badge", "badge-warning", "px-6", "py-3", "text-center", "h-auto", "fixed", "top-1/2", "left-1/2", "-translate-y-1/2", "-translate-x-1/2"], ["for", "drawer-enable", 1, "drawer-button", "btn", "btn-ghost", "btn-half-circle-left", "btn-info", "fixed", "top-1/2", "right-0"], ["name", "heroChevronLeft", 1, "text-2xl"]],
  template: function StreamCaptionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, StreamCaptionsComponent_app_recognized_live_text_4_Template, 1, 1, "app-recognized-live-text", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, StreamCaptionsComponent_div_5_Template, 2, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, StreamCaptionsComponent_label_6_Template, 2, 2, "label", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "label", 8)(9, "app-recognition-control-sidebar", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.liveText());
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.recognitionPaused());
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.recognitionConnected() || ctx.recognitionPaused());
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("@slideOutRightOnLeave", undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("showFullscreen", false)("showTextFlow", false);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_12__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateDirective, _media_components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_4__.RecognizedLiveTextComponent, _media_components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_5__.RecognitionControlSidebarComponent],
  styles: [".drawer-end[_ngcontent-%COMP%]   .drawer-toggle[_ngcontent-%COMP%]    ~ .drawer-side[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbS1jYXB0aW9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0YiLCJmaWxlIjoic3RyZWFtLWNhcHRpb25zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRyYXdlci1lbmQgLmRyYXdlci10b2dnbGUgfiAuZHJhd2VyLXNpZGUge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3N0cmVhbS1jYXB0aW9ucy9zdHJlYW0tY2FwdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtBQUNGO0FBQ0EsZ1hBQWdYIiwic291cmNlc0NvbnRlbnQiOlsiLmRyYXdlci1lbmQgLmRyYXdlci10b2dnbGUgfiAuZHJhd2VyLXNpZGUge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.slideInRightOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.slideOutRightOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 2644:
/*!**********************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/third-party-connections/third-party-connections.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ThirdPartyConnectionsComponent": () => (/* binding */ ThirdPartyConnectionsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../reducers/obs.reducer */ 9232);
/* harmony import */ var _selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/obs.selectors */ 7595);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _connect_obs_connect_obs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../connect-obs/connect-obs.component */ 5604);











const _c0 = ["checkbox"];
function ThirdPartyConnectionsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "CONNECTIONS.obsStudio");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class ThirdPartyConnectionsComponent {
  constructor(store, renderer) {
    this.store = store;
    this.renderer = renderer;
    this.openStateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter(false);
    this.obsConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.select)(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_1__.selectObsConnected), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(conn => conn === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_0__.ObsConnectionState.connected)));
  }
  toggle() {
    const newState = this.checkbox.nativeElement.checked ? false : true;
    if (newState) {
      this.renderer.setAttribute(this.checkbox.nativeElement, 'checked', 'true');
    } else {
      this.renderer.removeAttribute(this.checkbox.nativeElement, 'checked');
    }
    console.log('toggle', newState);
    this.openStateChanged.emit(newState);
  }
}
ThirdPartyConnectionsComponent.ɵfac = function ThirdPartyConnectionsComponent_Factory(t) {
  return new (t || ThirdPartyConnectionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2));
};
ThirdPartyConnectionsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: ThirdPartyConnectionsComponent,
  selectors: [["app-third-party-connections"]],
  viewQuery: function ThirdPartyConnectionsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.checkbox = _t.first);
    }
  },
  outputs: {
    openStateChanged: "openStateChanged"
  },
  decls: 9,
  vars: 1,
  consts: [[1, "collapse", "collapse-arrow", "bg-base-100"], ["type", "checkbox"], ["checkbox", ""], [1, "collapse-title", "flex", "flex-row", "items-center", "gap-3", 3, "click"], ["translate", "", 1, "text-xl"], ["class", "badge badge-success h-auto", "translate", "", 4, "ngIf"], [1, "collapse-content", "overflow-y-auto"], ["translate", "", 1, "badge", "badge-success", "h-auto"]],
  template: function ThirdPartyConnectionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ThirdPartyConnectionsComponent_Template_div_click_3_listener() {
        return ctx.toggle();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "CONNECTIONS.externalConnections");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, ThirdPartyConnectionsComponent_div_6_Template, 2, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "app-connect-obs");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.obsConnected() && !_r0.checked);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateDirective, _connect_obs_connect_obs_component__WEBPACK_IMPORTED_MODULE_2__.ConnectObsComponent],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0aGlyZC1wYXJ0eS1jb25uZWN0aW9ucy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3RoaXJkLXBhcnR5LWNvbm5lY3Rpb25zL3RoaXJkLXBhcnR5LWNvbm5lY3Rpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3TEFBd0wiLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 9768:
/*!****************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/components/view-broadcast/view-broadcast.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewBroadcastComponent": () => (/* binding */ ViewBroadcastComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 9295);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 9337);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 1130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 2566);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../actions/peer.actions */ 6365);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/app.model */ 4056);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _leave_session_leave_session_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../leave-session/leave-session.component */ 9141);
/* harmony import */ var _socket_server_status_chip_socket_server_status_chip_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../socket-server-status-chip/socket-server-status-chip.component */ 2433);
/* harmony import */ var _peer_server_status_chip_peer_server_status_chip_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../peer-server-status-chip/peer-server-status-chip.component */ 2950);
/* harmony import */ var _broadcast_render_broadcast_render_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../broadcast-render/broadcast-render.component */ 8653);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-timeago */ 6790);




















function ViewBroadcastComponent_ng_container_1_ng_container_1_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "HINTS.hostConnecting");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
const _c0 = function (a0, a1) {
  return {
    "badge-success": a0,
    "badge-info": a1
  };
};
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, ViewBroadcastComponent_ng_container_1_ng_container_1_div_1_div_4_Template, 2, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "app-leave-session", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("dialogClosed", function ViewBroadcastComponent_ng_container_1_ng_container_1_div_1_Template_app_leave_session_dialogClosed_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r13.leaveSessionDialogClosed($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction2"](6, _c0, ctx_r7.hostOnline(), !ctx_r7.hostOnline()));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 4, ctx_r7.hostOnline() ? "STREAM.connected" : "HINTS.verifyingConnection"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r7.hostOnline());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("showDialog", ctx_r7.showLeaveBroadcastDialog());
  }
}
const _c1 = function () {
  return [".."];
};
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 13)(1, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "BUTTONS.goBack");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](1, _c1));
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "timeago");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ts_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 2, "STREAM.broadcastEnded"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 4, ts_r15), ". ");
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "STREAM.noSessionForRoom");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ViewBroadcastComponent_ng_container_1_ng_container_1_div_3_div_1_Template, 4, 6, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ViewBroadcastComponent_ng_container_1_ng_container_1_div_3_ng_template_2_Template, 2, 0, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ts_r15 = ctx.ngIf;
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ts_r15 > 1)("ngIfElse", _r17);
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_app_broadcast_render_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-broadcast-render", 18);
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const elapsed_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).ngIf;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Time left: ", ctx_r24.HOST_ONLINE_TIMEOUT_SECONDS - elapsed_r20, "");
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_container_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "STREAM.noSessionForRoom");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_container_1_span_1_Template, 2, 1, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_container_1_ng_template_2_Template, 2, 0, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](3);
    const elapsed_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().ngIf;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", elapsed_r20 < ctx_r21.HOST_ONLINE_TIMEOUT_SECONDS)("ngIfElse", _r25);
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "STREAM.hostOffline");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_container_1_Template, 4, 2, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_ng_template_2_Template, 2, 0, "ng-template", null, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](3);
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r11.hostOnline() === undefined)("ngIfElse", _r22);
  }
}
function ViewBroadcastComponent_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ViewBroadcastComponent_ng_container_1_ng_container_1_div_1_Template, 6, 9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ViewBroadcastComponent_ng_container_1_ng_container_1_div_2_Template, 3, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, ViewBroadcastComponent_ng_container_1_ng_container_1_div_3_Template, 4, 2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, ViewBroadcastComponent_ng_container_1_ng_container_1_app_broadcast_render_4_Template, 1, 0, "app-broadcast-render", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, ViewBroadcastComponent_ng_container_1_ng_container_1_div_5_Template, 4, 2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r5.isViewing());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r5.broadcastEndedTimestamp());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r5.broadcastEndedTimestamp());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r5.hostOnline());
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r5.broadcastEndedTimestamp() && !ctx_r5.hostOnline() && ctx_r5.verifyJoinCodeTimer && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 5, ctx_r5.verifyJoinCodeTimer));
  }
}
function ViewBroadcastComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ViewBroadcastComponent_ng_container_1_ng_container_1_Template, 7, 7, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.joinCode())("ngIfElse", _r3);
  }
}
function ViewBroadcastComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21)(1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "STREAM.connectionPendingHint");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "app-socket-server-status-chip")(4, "app-peer-server-status-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ViewBroadcastComponent_ng_template_4_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Invalid ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ViewBroadcastComponent_ng_template_4_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
const _c2 = function (a0) {
  return {
    "text-error": a0
  };
};
const _c3 = function (a0) {
  return {
    "input-error": a0
  };
};
function ViewBroadcastComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 23)(1, "form", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("submit", function ViewBroadcastComponent_ng_template_4_Template_form_submit_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r32);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r31.rejoin());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "STREAM.joinCodeRequired");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 26)(5, "div", 27)(6, "label", 28)(7, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "STREAM.joinCode");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "label", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, ViewBroadcastComponent_ng_template_4_span_11_Template, 2, 0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, ViewBroadcastComponent_ng_template_4_span_12_Template, 2, 0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 33)(14, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](15, "BUTTONS.connect");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, "BUTTONS.cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("formGroup", ctx_r4.formGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](6, _c2, ctx_r4.formGroup.controls["joinCode"].invalid && ctx_r4.formGroup.controls["joinCode"].touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](8, _c3, ctx_r4.formGroup.controls["joinCode"].invalid && ctx_r4.formGroup.controls["joinCode"].touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r4.formGroup.controls["joinCode"].hasError("invalid") && ctx_r4.formGroup.controls["joinCode"].touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r4.formGroup.controls["joinCode"].hasError("required") && ctx_r4.formGroup.controls["joinCode"].touched);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](10, _c1));
  }
}
class ViewBroadcastComponent {
  constructor(route, router, fb, store) {
    this.route = route;
    this.router = router;
    this.fb = fb;
    this.store = store;
    this.showLeaveBroadcastDialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.signal)(false);
    this.dialogClosedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this.HOST_ONLINE_TIMEOUT_SECONDS = 30;
    this.roomId = this.route.snapshot.params['id'].toLowerCase();
    this.joinCode = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectJoinCode));
    this.isViewing = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectIsViewing));
    this.hostOnline = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectHostOnline));
    this.serverError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectPeerError));
    this.broadcastEndedTimestamp = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectBroadcastEndedTimestamp));
    const socketConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectSocketServerConnected));
    const peerConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectPeerServerConnected));
    this.connected = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.computed)(() => socketConnected() && peerConnected());
    this.formGroup = this.fb.group({
      joinCode: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.minLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.maxLength(4)])
    });
    if ('joinCode' in this.route.snapshot.queryParams && this.route.snapshot.queryParams['joinCode'] !== this.joinCode()) {
      this._updateJoinCodeAndConnect(this.route.snapshot.queryParams['joinCode'].toLowerCase());
    } else {
      this._joinRoom();
    }
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.effect)(() => {
      if (this.isViewing()) {
        this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_1__.AppActions.hideFooter());
      } else {
        this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_1__.AppActions.showFooter());
      }
    }, {
      allowSignalWrites: true
    });
  }
  canDeactivate() {
    if (this.isViewing() && this.hostOnline()) {
      this.showLeaveBroadcastDialog.set(true);
      return this.dialogClosedSubject.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.tap)(() => this.showLeaveBroadcastDialog.set(false)));
    }
    return true;
  }
  ngOnDestroy() {
    if (this.isViewing() || this.broadcastEndedTimestamp()) {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.leaveBroadcastRoom());
    }
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_1__.AppActions.showFooter());
  }
  rejoin() {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const newCode = this.formGroup.value.joinCode;
      this._updateQueryParamsCode(newCode);
      this._updateJoinCodeAndConnect(newCode);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
  leaveSessionDialogClosed(confirmed) {
    this.dialogClosedSubject.next(confirmed);
  }
  _updateQueryParamsCode(joinCode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        joinCode
      },
      queryParamsHandling: 'merge'
    });
  }
  _joinRoom() {
    if (!this.connected()) {
      this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_13__.select)(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectPeerServerConnected), (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.filter)(connected => !!connected), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(() => {
        this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoom({
          id: this.roomId
        }));
      });
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectSocketServer());
    } else {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoom({
        id: this.roomId
      }));
    }
    this.verifyJoinCodeTimer = (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.interval)(1000).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_16__.takeWhile)(value => value < this.HOST_ONLINE_TIMEOUT_SECONDS && this.hostOnline() === undefined), (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.map)(value => value + 1));
  }
  _updateJoinCodeAndConnect(updatedJoinCode) {
    this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setJoinCode({
      joinCode: updatedJoinCode
    }));
    this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectJoinCode).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.filter)(code => code === updatedJoinCode), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(() => {
      this._joinRoom();
    });
  }
}
ViewBroadcastComponent.ɵfac = function ViewBroadcastComponent_Factory(t) {
  return new (t || ViewBroadcastComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_13__.Store));
};
ViewBroadcastComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: ViewBroadcastComponent,
  selectors: [["app-view-broadcast"]],
  hostBindings: function ViewBroadcastComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("beforeunload", function ViewBroadcastComponent_beforeunload_HostBindingHandler() {
        return ctx.joinCode();
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresolveWindow"]);
    }
  },
  decls: 6,
  vars: 2,
  consts: [[1, "flex", "flex-col", "w-full", "h-full"], [4, "ngIf", "ngIfElse"], ["connectingToServer", ""], ["setJoinCode", ""], ["class", "flex flex-row items-center justify-between p-3", 4, "ngIf"], ["class", "flex flex-row items-center justify-end p-3", 4, "ngIf"], ["class", "flex flex-col basis-full self-center justify-center px-3 text-center", 4, "ngIf"], ["class", "flex basis-full overflow-y-hidden", 4, "ngIf"], [1, "flex", "flex-row", "items-center", "justify-between", "p-3"], [1, "badge", "h-auto", 3, "ngClass"], ["class", "text-sm text-accent flex flex-row text-center", "translate", "", 4, "ngIf"], [3, "showDialog", "dialogClosed"], ["translate", "", 1, "text-sm", "text-accent", "flex", "flex-row", "text-center"], [1, "flex", "flex-row", "items-center", "justify-end", "p-3"], ["translate", "", 1, "btn", "btn-primary", 3, "routerLink"], [1, "flex", "flex-col", "basis-full", "self-center", "justify-center", "px-3", "text-center"], ["noRoomFound", ""], ["translate", ""], [1, "flex", "basis-full", "overflow-y-hidden"], ["hostDisconnected", ""], ["timedOut", ""], [1, "flex", "flex-col", "basis-full", "justify-center", "items-center", "gap-12"], ["translate", "", 1, "text-2xl", "text-error-content", "w-1/2", "text-center"], [1, "flex", "basis-full", "justify-center"], [1, "flex", "flex-col", "gap-12", "p-3", "sm:p-12", "max-w-2xl", 3, "formGroup", "submit"], ["translate", "", 1, "text-3xl", "sm:text-5xl", "text-center"], [1, "flex", "flex-row", "flex-wrap", "items-center", "justify-between", "gap-12", "sm:gap-24"], [1, "form-control"], [1, "label"], ["translate", "", 1, "label-text", 3, "ngClass"], ["type", "text", "placeholder", "E5F6", "formControlName", "joinCode", 1, "input", "input-bordered", "input-lg", 3, "ngClass"], [1, "label", "no-height"], ["class", "label-alt-text text-error text-xs", 4, "ngIf"], [1, "flex", "flex-row", "gap-3"], ["translate", "", 1, "btn", "btn-lg", "btn-primary", "mt-3"], ["translate", "", "type", "button", 1, "btn", "btn-lg", "mt-3", 3, "routerLink"], [1, "label-alt-text", "text-error", "text-xs"]],
  template: function ViewBroadcastComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ViewBroadcastComponent_ng_container_1_Template, 2, 2, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ViewBroadcastComponent_ng_template_2_Template, 5, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, ViewBroadcastComponent_ng_template_4_Template, 18, 11, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.connected())("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControlName, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslateDirective, _leave_session_leave_session_component__WEBPACK_IMPORTED_MODULE_3__.LeaveSessionComponent, _socket_server_status_chip_socket_server_status_chip_component__WEBPACK_IMPORTED_MODULE_4__.SocketServerStatusChipComponent, _peer_server_status_chip_peer_server_status_chip_component__WEBPACK_IMPORTED_MODULE_5__.PeerServerStatusChipComponent, _broadcast_render_broadcast_render_component__WEBPACK_IMPORTED_MODULE_6__.BroadcastRenderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_19__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe, ngx_timeago__WEBPACK_IMPORTED_MODULE_21__.TimeagoPipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2aWV3LWJyb2FkY2FzdC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvcGVlci9jb21wb25lbnRzL3ZpZXctYnJvYWRjYXN0L3ZpZXctYnJvYWRjYXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0S0FBNEsiLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 7628:
/*!*********************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/peer-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerRoutingModule": () => (/* binding */ PeerRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _components_peer_landing_peer_landing_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/peer-landing/peer-landing.component */ 5749);
/* harmony import */ var _components_view_broadcast_view_broadcast_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/view-broadcast/view-broadcast.component */ 9768);
/* harmony import */ var _guards_active_stream_active_stream_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../guards/active-stream/active-stream.guard */ 830);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);






const routes = [{
  path: '',
  component: _components_peer_landing_peer_landing_component__WEBPACK_IMPORTED_MODULE_0__.PeerLandingComponent,
  canDeactivate: [_guards_active_stream_active_stream_guard__WEBPACK_IMPORTED_MODULE_2__.activeStreamGuard]
}, {
  path: ':id',
  component: _components_view_broadcast_view_broadcast_component__WEBPACK_IMPORTED_MODULE_1__.ViewBroadcastComponent,
  canDeactivate: [_guards_active_stream_active_stream_guard__WEBPACK_IMPORTED_MODULE_2__.activeStreamGuard]
}];
class PeerRoutingModule {}
PeerRoutingModule.ɵfac = function PeerRoutingModule_Factory(t) {
  return new (t || PeerRoutingModule)();
};
PeerRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: PeerRoutingModule
});
PeerRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PeerRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 1734:
/*!*************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/peer.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerModule": () => (/* binding */ PeerModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-clipboard */ 1691);
/* harmony import */ var _effects_peer_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../effects/peer.effects */ 4130);
/* harmony import */ var _media_media_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../media/media.module */ 1868);
/* harmony import */ var _components_accept_peer_connections_modal_accept_peer_connections_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/accept-peer-connections-modal/accept-peer-connections-modal.component */ 7146);
/* harmony import */ var _components_broadcast_render_broadcast_render_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/broadcast-render/broadcast-render.component */ 8653);
/* harmony import */ var _components_broadcast_room_broadcast_room_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/broadcast-room/broadcast-room.component */ 1333);
/* harmony import */ var _components_connected_peer_count_chip_connected_peer_count_chip_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/connected-peer-count-chip/connected-peer-count-chip.component */ 8867);
/* harmony import */ var _components_end_broadcast_end_broadcast_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/end-broadcast/end-broadcast.component */ 3566);
/* harmony import */ var _components_join_code_join_code_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/join-code/join-code.component */ 6263);
/* harmony import */ var _components_leave_session_leave_session_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/leave-session/leave-session.component */ 9141);
/* harmony import */ var _components_peer_landing_peer_landing_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/peer-landing/peer-landing.component */ 5749);
/* harmony import */ var _components_peer_server_status_chip_peer_server_status_chip_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/peer-server-status-chip/peer-server-status-chip.component */ 2950);
/* harmony import */ var _components_room_id_room_id_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/room-id/room-id.component */ 9607);
/* harmony import */ var _components_socket_server_status_chip_socket_server_status_chip_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/socket-server-status-chip/socket-server-status-chip.component */ 2433);
/* harmony import */ var _components_view_broadcast_view_broadcast_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/view-broadcast/view-broadcast.component */ 9768);
/* harmony import */ var _peer_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./peer-routing.module */ 7628);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-timeago */ 6790);
/* harmony import */ var _standalone_socket_debug_socket_debug_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../standalone/socket-debug/socket-debug.component */ 5534);
/* harmony import */ var _components_connect_obs_connect_obs_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/connect-obs/connect-obs.component */ 5604);
/* harmony import */ var _components_third_party_connections_third_party_connections_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/third-party-connections/third-party-connections.component */ 2644);
/* harmony import */ var _effects_obs_effects__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../effects/obs.effects */ 2044);
/* harmony import */ var _components_obs_connection_status_chip_obs_connection_status_chip_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/obs-connection-status-chip/obs-connection-status-chip.component */ 2586);
/* harmony import */ var shared_ui__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! shared-ui */ 5543);
/* harmony import */ var _components_stream_captions_stream_captions_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/stream-captions/stream-captions.component */ 1976);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 6839);

































class PeerModule {}
PeerModule.ɵfac = function PeerModule_Factory(t) {
  return new (t || PeerModule)();
};
PeerModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineNgModule"]({
  type: PeerModule
});
PeerModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.CommonModule, _peer_routing_module__WEBPACK_IMPORTED_MODULE_14__.PeerRoutingModule, _angular_router__WEBPACK_IMPORTED_MODULE_23__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_24__.ReactiveFormsModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_25__.NgIconsModule, shared_ui__WEBPACK_IMPORTED_MODULE_26__.SharedUiModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__.TranslateModule.forChild({
    extend: true
  }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_28__.EffectsModule.forFeature([_effects_peer_effects__WEBPACK_IMPORTED_MODULE_0__.PeerEffects, _effects_obs_effects__WEBPACK_IMPORTED_MODULE_18__.ObsEffects]), _media_media_module__WEBPACK_IMPORTED_MODULE_1__.MediaModule, ngx_clipboard__WEBPACK_IMPORTED_MODULE_29__.ClipboardModule, ngx_timeago__WEBPACK_IMPORTED_MODULE_30__.TimeagoModule, _standalone_socket_debug_socket_debug_component__WEBPACK_IMPORTED_MODULE_15__.SocketDebugComponent]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsetNgModuleScope"](PeerModule, {
    declarations: [_components_end_broadcast_end_broadcast_component__WEBPACK_IMPORTED_MODULE_6__.EndBroadcastComponent, _components_leave_session_leave_session_component__WEBPACK_IMPORTED_MODULE_8__.LeaveSessionComponent, _components_peer_landing_peer_landing_component__WEBPACK_IMPORTED_MODULE_9__.PeerLandingComponent, _components_socket_server_status_chip_socket_server_status_chip_component__WEBPACK_IMPORTED_MODULE_12__.SocketServerStatusChipComponent, _components_peer_server_status_chip_peer_server_status_chip_component__WEBPACK_IMPORTED_MODULE_10__.PeerServerStatusChipComponent, _components_view_broadcast_view_broadcast_component__WEBPACK_IMPORTED_MODULE_13__.ViewBroadcastComponent, _components_connected_peer_count_chip_connected_peer_count_chip_component__WEBPACK_IMPORTED_MODULE_5__.ConnectedPeerCountChipComponent, _components_room_id_room_id_component__WEBPACK_IMPORTED_MODULE_11__.RoomIdComponent, _components_join_code_join_code_component__WEBPACK_IMPORTED_MODULE_7__.JoinCodeComponent, _components_broadcast_room_broadcast_room_component__WEBPACK_IMPORTED_MODULE_4__.BroadcastRoomComponent, _components_broadcast_render_broadcast_render_component__WEBPACK_IMPORTED_MODULE_3__.BroadcastRenderComponent, _components_accept_peer_connections_modal_accept_peer_connections_modal_component__WEBPACK_IMPORTED_MODULE_2__.AcceptPeerConnectionsModalComponent, _components_connect_obs_connect_obs_component__WEBPACK_IMPORTED_MODULE_16__.ConnectObsComponent, _components_third_party_connections_third_party_connections_component__WEBPACK_IMPORTED_MODULE_17__.ThirdPartyConnectionsComponent, _components_obs_connection_status_chip_obs_connection_status_chip_component__WEBPACK_IMPORTED_MODULE_19__.ObsConnectionStatusChipComponent, _components_stream_captions_stream_captions_component__WEBPACK_IMPORTED_MODULE_20__.StreamCaptionsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.CommonModule, _peer_routing_module__WEBPACK_IMPORTED_MODULE_14__.PeerRoutingModule, _angular_router__WEBPACK_IMPORTED_MODULE_23__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_24__.ReactiveFormsModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_25__.NgIconsModule, shared_ui__WEBPACK_IMPORTED_MODULE_26__.SharedUiModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_27__.TranslateModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_28__.EffectsFeatureModule, _media_media_module__WEBPACK_IMPORTED_MODULE_1__.MediaModule, ngx_clipboard__WEBPACK_IMPORTED_MODULE_29__.ClipboardModule, ngx_timeago__WEBPACK_IMPORTED_MODULE_30__.TimeagoModule, _standalone_socket_debug_socket_debug_component__WEBPACK_IMPORTED_MODULE_15__.SocketDebugComponent]
  });
})();

/***/ }),

/***/ 1785:
/*!***********************************************************************!*\
  !*** ./packages/client/src/app/modules/peer/services/peer.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerService": () => (/* binding */ PeerService)
/* harmony export */ });
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-socket-io */ 786);
/* harmony import */ var peerjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! peerjs */ 7953);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6067);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 7580);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 9295);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../actions/peer.actions */ 6365);
/* harmony import */ var _services_cache_cache_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/cache/cache.service */ 6110);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/recognition.model */ 1088);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngrx/store */ 4307);













class PeerService {
  constructor(store, cache) {
    this.store = store;
    this.cache = cache;
    this.liveText$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject('');
    this.textOutput$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject([]);
    this.CACHE_PERSIST_MINS = 60;
    this.myBroadcast = false;
    this.roomId = new rxjs__WEBPACK_IMPORTED_MODULE_5__.ReplaySubject();
    this.peerMap = new Map();
    this.SOCKET_URL = "https://socket.fartyparts.work" || 0;
    this.SOCKET_PORT =  true ? Number("443") : 0;
    this.SOCKET_CONFIG = {
      url: `${this.SOCKET_URL}:${this.SOCKET_PORT}`,
      options: {
        reconnectionAttempts: 10
      }
    };
    this.PEER_URL = "peer.fartyparts.work" || 0;
    this.PEER_PORT =  true ? Number("443") : 0;
    this.STUN_SERVER = ({"ZIP_SOCKET_SERVER":"https://socket.fartyparts.work","ZIP_SOCKET_PORT":"443","ZIP_PEER_SERVER":"peer.fartyparts.work","ZIP_PEER_PORT":"443","BUILD_YEAR":2023,"ZIP_BUILD_HASH":"55d0958069e8ebf1b5985a288f628be73af4f95f"})['ZIP_STUN_SERVER'] || 'localhost:19302';
    this.TURN_SERVER = ({"ZIP_SOCKET_SERVER":"https://socket.fartyparts.work","ZIP_SOCKET_PORT":"443","ZIP_PEER_SERVER":"peer.fartyparts.work","ZIP_PEER_PORT":"443","BUILD_YEAR":2023,"ZIP_BUILD_HASH":"55d0958069e8ebf1b5985a288f628be73af4f95f"})['ZIP_TURN_SERVER'] || 'localhost:3478';
    this.TURN_PASS = ({"ZIP_SOCKET_SERVER":"https://socket.fartyparts.work","ZIP_SOCKET_PORT":"443","ZIP_PEER_SERVER":"peer.fartyparts.work","ZIP_PEER_PORT":"443","BUILD_YEAR":2023,"ZIP_BUILD_HASH":"55d0958069e8ebf1b5985a288f628be73af4f95f"})['ZIP_TURN_PASSWORD'] || 'coturn';
    this.CONNECT_OPTS = {
      debug: 0,
      host: this.PEER_URL,
      port: this.PEER_PORT,
      secure: this.PEER_URL !== 'localhost',
      config: {
        iceServers: [{
          urls: [`stun:stun1.l.google.com:19302`, `stun:stun2.l.google.com:19302`, `stun:${this.STUN_SERVER}`, `turn:${this.TURN_SERVER}`],
          credential: this.TURN_PASS
        }]
      }
    };
    this.peerServerConnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectPeerServerConnected));
    this.sessionJoinCode = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectJoinCode));
    this.peerCount = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectConnectedPeerCount));
    const cached = this.cache.load('userId');
    if (cached?.id) {
      this.myId = cached.id;
    }
    // console.log(`Socket Server: ${this.SOCKET_URL}:${this.SOCKET_PORT}`);
    // console.log(`Peer Server: ${this.PEER_URL}:${this.PEER_PORT}`)
  }

  connectSocket() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
    this.socket = new ngx_socket_io__WEBPACK_IMPORTED_MODULE_7__.Socket(this.SOCKET_CONFIG);
    const sub = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this.socket.on('connect', () => {
      // console.log('socket connected');
      this.socket.emit('setId', {
        id: this.myId
      });
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerConnected());
      if (this.myId) {
        sub.next(this.myId);
        if (!this.peerServerConnected()) {
          this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServer());
        }
      }
    });
    this.socket.on('disconnect', () => this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerDisconnected()));
    this.socket.on('error', err => {
      sub.error(err.message);
      // console.log('error', err);
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerError({
        error: err.message
      }));
    });
    this.socket.on('endBroadcast', () => this._disconnectAllPeers());
    this.socket.on('message', data => {
      // console.log('message', data);
      switch (data.message) {
        case 'room joined':
          {
            if (data.room) {
              // console.log('nexting room id', data.room);
              this.cache.save({
                key: 'roomId',
                data: {
                  room: data.room,
                  myBroadcast: this.myBroadcast
                },
                expirationMins: this.CACHE_PERSIST_MINS
              });
              this.roomId.next(data.room);
            }
            break;
          }
        case 'set user id':
          {
            // console.log('set user id', data.id, this.myId)
            if (this.myId) {
              this.socket.emit('setId', {
                id: this.myId
              });
              if (data.id === this.myId) {
                sub.next(this.myId);
              }
            } else if (data.id) {
              this.myId = data.id;
              // console.log('SAVING USER ID', data.id)
              this.cache.save({
                key: 'userId',
                data: {
                  id: data.id
                },
                expirationMins: this.CACHE_PERSIST_MINS
              });
              sub.next(data.id);
            }
            if (!this.peerServerConnected() && this.myId) {
              this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServer());
            }
            break;
          }
        case 'user joined room':
          {
            if (data.user && data.user !== this.myId) {
              if (!this.peer) {
                throw new Error('Cannot connect to peer - peer server connection not established');
              }
              if (this.myBroadcast) {
                this._connectToPeer(data.user);
              } else {
                // console.log('not my broadcast, peer connected', data.user)
              }
            }
            break;
          }
        case 'user left room':
          {
            if (data.user) {
              // console.log('disconnect from peer!', data)
              const connection = this.peerMap.get(data.user);
              if (connection) {
                connection.addListener('close', () => {
                  // console.log('closed!');
                  this.peerMap.delete(data.user);
                });
                connection.close();
              }
            }
            break;
          }
        case 'connect clients':
          {
            if (data.clients) {
              const clientIds = data.clients;
              // console.log('clientIds', clientIds, this.myId);
              for (const id of clientIds) {
                if (id !== this.myId) {
                  this._connectToPeer(id);
                }
              }
            }
            break;
          }
        case 'broadcast expired':
        case 'broadcast ended':
          {
            if (data.expiredAt) {
              this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setBroadcastEndedAt({
                endedAt: data.expiredAt
              }));
            }
            break;
          }
        default:
          {
            console.warn('UNHANDLED MESSAGE!!!', data);
            break;
          }
      }
    });
    return sub.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.timeout)(30000), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.take)(1));
  }
  disconnectSocket() {
    const sub = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this.socket.removeListener('disconnect');
    this.socket.on('disconnect', () => {
      sub.next(true);
    });
    setTimeout(() => this.socket.disconnect(), 1);
    return sub.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.timeout)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.take)(1));
  }
  joinRoom(data) {
    this.myBroadcast = !data?.room; // If we do not have a room ID, we are creating a broadcast
    if (!data?.room) {
      const fromCache = this.cache.load('roomId');
      if (fromCache?.room) {
        data = {
          room: fromCache.room,
          myBroadcast: fromCache?.myBroadcast
        };
      }
      if (fromCache?.myBroadcast !== undefined) {
        this.myBroadcast = fromCache.myBroadcast;
      }
    }
    if (this.myBroadcast) {
      const fromCache = this.cache.load('joinCode');
      let joinCode;
      if (fromCache) {
        joinCode = fromCache.joinCode;
      } else {
        joinCode = this._generateJoinCode();
        this.cache.save({
          key: 'joinCode',
          data: {
            joinCode
          }
        });
      }
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setJoinCode({
        joinCode
      }));
    }
    this.socket.volatile().emit('join', {
      room: data?.room,
      myBroadcast: this.myBroadcast
    });
    return this.roomId.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.filter)(v => !!v));
  }
  sendServerMessage(data) {
    this.socket.volatile().emit('message', data);
  }
  connectPeerServer() {
    if (!this.myId) {
      throw new Error('Must obtain ID from socket server');
    }
    if (this.peer?.id === this.myId && !this.peer.disconnected) {
      // console.log('peer server connection already exists and appears to be connected!!!');
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)(this.myId);
    }
    const sub = new rxjs__WEBPACK_IMPORTED_MODULE_5__.ReplaySubject();
    this.CONNECT_OPTS.config.iceServers[0].username = this.myId;
    this.peer = new peerjs__WEBPACK_IMPORTED_MODULE_13__["default"](this.myId, this.CONNECT_OPTS);
    this.peer.addListener('open', () => {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerConnected());
      sub.next(this.myId);
    });
    this.peer.addListener('disconnected', () => {
      if (this.peerServerConnected()) {
        this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerDisconnected());
      }
    });
    this.peer.once('error', err => {
      // console.log(err.message);
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerError({
        error: err.message
      }));
      this._reconnectPeerServer();
    });
    this.peer.addListener('connection', connection => {
      // console.log('incoming connection!', connection);
      this.peerMap.set(connection.connectionId, connection);
      this._handlePeerData(connection);
    });
    return sub.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.take)(1));
  }
  disconnectPeerServer() {
    if (!this.peer) {
      throw new Error('Peer not connected');
    }
    const sub = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    this.peer.removeListener('close');
    this.peer.addListener('disconnected', () => {
      sub.next(true);
    });
    setTimeout(() => {
      this.peer.disconnect();
      // console.log('peer disconnected');
    }, 1);
    return sub.asObservable().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.take)(1));
  }
  sendData(peerId, data) {
    const connection = this.peerMap.get(peerId);
    if (!connection) {
      throw new Error(`connection ${peerId} not found`);
    } else {
      connection.send(data);
    }
  }
  broadcastData(data) {
    for (const conn of this.peerMap.values()) {
      conn.send(data);
    }
  }
  endBroadcast() {
    const sub = new rxjs__WEBPACK_IMPORTED_MODULE_5__.ReplaySubject();
    const fromCache = this.cache.load('roomId');
    const room = fromCache?.room;
    if (!room) {
      throw new Error('No room defined for broadcast');
    }
    this.cache.remove('roomId');
    this.cache.remove('joinCode');
    this.socket.once('endBroadcast', () => {
      // console.log('endbroadcast response recieved');
      sub.next();
      sub.complete();
    });
    this.socket.emit('endBroadcast', {
      room
    });
    return sub;
  }
  leaveSession() {
    // console.log('leaveSession', this.peerMap.size);
    this.cache.remove('roomId');
    this.cache.remove('joinCode');
    this.peerMap.forEach(connection => {
      // console.log('peer', id);
      connection.close();
    });
    this.textOutput$.next([]);
    this.liveText$.next('');
    this.peerMap.clear();
  }
  _reconnectPeerServer(tryNumber) {
    let thisTry = tryNumber || 0;
    const timerId = setTimeout(() => {
      if (this.peer?.disconnected && thisTry < 5) {
        this.peer.once('error', () => {
          this._reconnectPeerServer(++thisTry);
        });
        this.peer.once('open', () => {
          thisTry = 0;
          clearTimeout(timerId);
        });
        this.peer?.reconnect();
      } else if (thisTry < 5) {
        this._reconnectPeerServer(++thisTry);
      } else {
        this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServerFailure({
          error: 'Peer server connection lost.'
        }));
        thisTry = 0;
        clearTimeout(timerId);
      }
    }, thisTry * 1000 + 150);
  }
  _connectToPeer(peerId) {
    const connection = this.peer.connect(peerId);
    this._handlePeerData(connection);
    this.peerMap.set(peerId, connection);
    this._updateConnectedPeerCount();
    connection.on('close', () => {
      // console.log('connection closed', peerId)
      this.peerMap.delete(peerId);
      this._updateConnectedPeerCount();
    });
  }
  _updateConnectedPeerCount() {
    if (this.peerMap.size !== this.peerCount()) {
      this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.updateConnectedPeerCount({
        count: this.peerMap.size
      }));
    }
  }
  _disconnectAllPeers() {
    for (const conn of this.peerMap.values()) {
      conn.close();
    }
    this.peerMap.clear();
    this._updateConnectedPeerCount();
  }
  _generateJoinCode() {
    let outString = '';
    const inOptions = 'acdefghjkmnpqrstuvwxyz2345679';
    for (let j = 0; j < 4; j++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
  }
  _handlePeerData(connection) {
    connection.on('close', () => {
      // console.log('connection closed');
      if (!this.myBroadcast) {
        this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setHostStatus({
          hostOnline: false
        }));
      }
      connection.removeAllListeners();
    });
    connection.on('open', () => {
      // console.log('peer connection opened', this.myBroadcast);
      if (this.myBroadcast) {
        // console.log('must validate join code', this.sessionJoinCode());
        connection.send({
          request: 'joinCode'
        });
      }
    });
    connection.on('data', data => {
      if (data?.request) {
        switch (data.request) {
          case 'joinCode':
            connection.send({
              request: 'validateJoinCode',
              joinCode: this.sessionJoinCode()
            });
            break;
          case 'validateJoinCode':
            if (this._verifyJoinCode(data.joinCode)) {
              // console.log('join code verified')
              connection.send({
                response: 'valid'
              });
            } else {
              // console.log('closing connection');
              connection.send({
                response: 'invalid'
              });
            }
            break;
          case 'disconnect':
            // console.log('disconnect requested');
            connection.close();
            this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setHostStatus({
              hostOnline: false
            }));
            break;
          case 'hostOffline':
            // console.log('host offline');
            this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setHostStatus({
              hostOnline: false
            }));
            break;
        }
      } else if (data?.response) {
        switch (data.response) {
          case 'valid':
            // console.log('join code valid!');
            this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setHostStatus({
              hostOnline: true
            }));
            break;
          case 'invalid':
            connection.close();
            this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.clearJoinCode());
            break;
        }
      } else if ('recognition' in data && 'type' in data) {
        switch (data.type) {
          case 'live':
            this.liveText$.next(data.recognition);
            break;
          case 'segment':
            this.textOutput$.next(data.recognition);
            break;
        }
      } else if (data?.type === 'status' && 'status' in data) {
        this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setBroadcastPausedState({
          paused: data.status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_3__.RecognitionStatus.paused
        }));
      } else {
        console.warn(`UNHANDLED DATA`, data);
      }
    });
  }
  _verifyJoinCode(incomingCode) {
    const thisCode = this.sessionJoinCode();
    return !!(thisCode && incomingCode && thisCode === incomingCode.toLowerCase());
  }
}
PeerService.ɵfac = function PeerService_Factory(t) {
  return new (t || PeerService)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_15__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵinject"](_services_cache_cache_service__WEBPACK_IMPORTED_MODULE_1__.CacheService));
};
PeerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjectable"]({
  token: PeerService,
  factory: PeerService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 6110:
/*!*****************************************************************!*\
  !*** ./packages/client/src/app/services/cache/cache.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CacheService": () => (/* binding */ CacheService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class CacheService {
  save(options) {
    // Set default values for optionals
    options.expirationMins = options.expirationMins || 0;
    // Set expiration date in miliseconds
    const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;
    const record = {
      value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
      expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
      hasExpiration: expirationMS !== 0 ? true : false
    };
    sessionStorage.setItem(options.key, JSON.stringify(record));
  }
  load(key) {
    // Get cached data from sessionStorage
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime();
      // Expired data will return null
      if (!record || record.hasExpiration && record.expiration <= now) {
        return null;
      } else {
        return JSON.parse(record.value);
      }
    }
    return null;
  }
  remove(key) {
    sessionStorage.removeItem(key);
  }
  cleansessionStorage() {
    sessionStorage.clear();
  }
}
CacheService.ɵfac = function CacheService_Factory(t) {
  return new (t || CacheService)();
};
CacheService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: CacheService,
  factory: CacheService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 7034:
/*!***********************************************************************************!*\
  !*** ./packages/client/src/app/services/obs-connection/obs-connection.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsConnectionService": () => (/* binding */ ObsConnectionService)
/* harmony export */ });
/* harmony import */ var _Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var obs_websocket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! obs-websocket-js */ 8102);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 7580);
/* harmony import */ var _actions_obs_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/obs.actions */ 8574);
/* harmony import */ var _selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../selectors/obs.selectors */ 7595);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngrx/store */ 4307);










class ObsConnectionService {
  constructor(store) {
    this.store = store;
    this.obs = new obs_websocket_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.obs.on('ConnectionClosed', () => this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_1__.ObsActions.disconnectSuccess()));
    this.obs.on('ConnectionError', err => this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_1__.ObsActions.errorReceived({
      error: err.message || 'Unknown Error Occurred'
    })));
    this.obs.on('Identified', () => this._addObsListeners());
    this.isStreaming = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.select(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_2__.selectObsStreamActive));
  }
  connect({
    ip,
    port,
    password
  }) {
    const url = `ws://${ip}:${port}`;
    const pass = password ? password : undefined;
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(this.obs.connect(url, pass)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.timeout)(5000));
  }
  disconnect() {
    this.obs.removeListener('ConnectionClosed');
    this.obs.removeListener('ConnectionError');
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.from)(this.obs.disconnect());
  }
  sendCaption(captionText) {
    var _this = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.isStreaming()) {
        _this.obs.call('SendStreamCaption', {
          captionText
        });
      }
    })();
  }
  _addObsListeners() {
    this.obs.call('GetStreamStatus').then(status => {
      this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_1__.ObsActions.setStreamingActive({
        active: status.outputActive
      }));
    });
    this.obs.on('StreamStateChanged', status => {
      this.store.dispatch(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_1__.ObsActions.setStreamingActive({
        active: status.outputActive
      }));
    });
  }
}
ObsConnectionService.ɵfac = function ObsConnectionService_Factory(t) {
  return new (t || ObsConnectionService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_8__.Store));
};
ObsConnectionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: ObsConnectionService,
  factory: ObsConnectionService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 5534:
/*!***********************************************************************************!*\
  !*** ./packages/client/src/app/standalone/socket-debug/socket-debug.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketDebugComponent": () => (/* binding */ SocketDebugComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../actions/peer.actions */ 6365);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors/peer.selectors */ 3827);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);









class SocketDebugComponent {
  constructor(store) {
    this.store = store;
    this.userId = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.select)(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_1__.selectPeerState), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(state => state.id)));
  }
  sendSocketDisconnected() {
    console.log('dispatching socket disconnected');
    this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerDisconnected());
  }
  sendUserIdAssigned() {
    console.log('dispatching socketUserIdAssigned', this.userId());
    this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerUserIdAssigned({
      id: this.userId() || ''
    }));
  }
  sendConnectPeerServer() {
    this.store.dispatch(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServer());
  }
}
SocketDebugComponent.ɵfac = function SocketDebugComponent_Factory(t) {
  return new (t || SocketDebugComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.Store));
};
SocketDebugComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: SocketDebugComponent,
  selectors: [["app-socket-debug"]],
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
  decls: 7,
  vars: 0,
  consts: [[1, "flex", "flex-col", "gap-3", "bg-transparent"], [1, "btn", "btn-sm", 3, "click"]],
  template: function SocketDebugComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SocketDebugComponent_Template_button_click_1_listener() {
        return ctx.sendSocketDisconnected();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Socket Disconnected Event");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SocketDebugComponent_Template_button_click_3_listener() {
        return ctx.sendUserIdAssigned();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "User Id Assigned Event");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SocketDebugComponent_Template_button_click_5_listener() {
        return ctx.sendConnectPeerServer();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Connect Peer Server Event");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzb2NrZXQtZGVidWcuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL3N0YW5kYWxvbmUvc29ja2V0LWRlYnVnL3NvY2tldC1kZWJ1Zy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 3350:
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

;
(function (root, factory) {
  if (true) {
    // CommonJS
    module.exports = exports = factory();
  } else {}
})(this, function () {
  /*globals window, global, require*/

  /**
   * CryptoJS core components.
   */
  var CryptoJS = CryptoJS || function (Math, undefined) {
    var crypto;

    // Native crypto from window (Browser)
    if (typeof window !== 'undefined' && window.crypto) {
      crypto = window.crypto;
    }

    // Native crypto in web worker (Browser)
    if (typeof self !== 'undefined' && self.crypto) {
      crypto = self.crypto;
    }

    // Native crypto from worker
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
      crypto = globalThis.crypto;
    }

    // Native (experimental IE 11) crypto from window (Browser)
    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
      crypto = window.msCrypto;
    }

    // Native crypto from global (NodeJS)
    if (!crypto && typeof global !== 'undefined' && global.crypto) {
      crypto = global.crypto;
    }

    // Native crypto import via require (NodeJS)
    if (!crypto && "function" === 'function') {
      try {
        crypto = __webpack_require__(/*! crypto */ 2480);
      } catch (err) {}
    }

    /*
     * Cryptographically secure pseudorandom number generator
     *
     * As Math.random() is cryptographically not safe to use
     */
    var cryptoSecureRandomInt = function () {
      if (crypto) {
        // Use getRandomValues method (Browser)
        if (typeof crypto.getRandomValues === 'function') {
          try {
            return crypto.getRandomValues(new Uint32Array(1))[0];
          } catch (err) {}
        }

        // Use randomBytes method (NodeJS)
        if (typeof crypto.randomBytes === 'function') {
          try {
            return crypto.randomBytes(4).readInt32LE();
          } catch (err) {}
        }
      }
      throw new Error('Native crypto module could not be used to get secure random number.');
    };

    /*
     * Local polyfill of Object.create
      */
    var create = Object.create || function () {
      function F() {}
      return function (obj) {
        var subtype;
        F.prototype = obj;
        subtype = new F();
        F.prototype = null;
        return subtype;
      };
    }();

    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = function () {
      return {
        /**
         * Creates a new object that inherits from this object.
         *
         * @param {Object} overrides Properties to copy into the new object.
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         field: 'value',
         *
         *         method: function () {
         *         }
         *     });
         */
        extend: function (overrides) {
          // Spawn
          var subtype = create(this);

          // Augment
          if (overrides) {
            subtype.mixIn(overrides);
          }

          // Create default initializer
          if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
            subtype.init = function () {
              subtype.$super.init.apply(this, arguments);
            };
          }

          // Initializer's prototype is the subtype object
          subtype.init.prototype = subtype;

          // Reference supertype
          subtype.$super = this;
          return subtype;
        },
        /**
         * Extends this object and runs the init method.
         * Arguments to create() will be passed to init().
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var instance = MyType.create();
         */
        create: function () {
          var instance = this.extend();
          instance.init.apply(instance, arguments);
          return instance;
        },
        /**
         * Initializes a newly created object.
         * Override this method to add some logic when your objects are created.
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         init: function () {
         *             // ...
         *         }
         *     });
         */
        init: function () {},
        /**
         * Copies properties into this object.
         *
         * @param {Object} properties The properties to mix in.
         *
         * @example
         *
         *     MyType.mixIn({
         *         field: 'value'
         *     });
         */
        mixIn: function (properties) {
          for (var propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
              this[propertyName] = properties[propertyName];
            }
          }

          // IE won't copy toString using the loop above
          if (properties.hasOwnProperty('toString')) {
            this.toString = properties.toString;
          }
        },
        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = instance.clone();
         */
        clone: function () {
          return this.init.prototype.extend(this);
        }
      };
    }();

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
      /**
       * Initializes a newly created word array.
       *
       * @param {Array} words (Optional) An array of 32-bit words.
       * @param {number} sigBytes (Optional) The number of significant bytes in the words.
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.create();
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
       */
      init: function (words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 4;
        }
      },
      /**
       * Converts this word array to a string.
       *
       * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
       *
       * @return {string} The stringified word array.
       *
       * @example
       *
       *     var string = wordArray + '';
       *     var string = wordArray.toString();
       *     var string = wordArray.toString(CryptoJS.enc.Utf8);
       */
      toString: function (encoder) {
        return (encoder || Hex).stringify(this);
      },
      /**
       * Concatenates a word array to this word array.
       *
       * @param {WordArray} wordArray The word array to append.
       *
       * @return {WordArray} This word array.
       *
       * @example
       *
       *     wordArray1.concat(wordArray2);
       */
      concat: function (wordArray) {
        // Shortcuts
        var thisWords = this.words;
        var thatWords = wordArray.words;
        var thisSigBytes = this.sigBytes;
        var thatSigBytes = wordArray.sigBytes;

        // Clamp excess bits
        this.clamp();

        // Concat
        if (thisSigBytes % 4) {
          // Copy one byte at a time
          for (var i = 0; i < thatSigBytes; i++) {
            var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
          }
        } else {
          // Copy one word at a time
          for (var j = 0; j < thatSigBytes; j += 4) {
            thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
          }
        }
        this.sigBytes += thatSigBytes;

        // Chainable
        return this;
      },
      /**
       * Removes insignificant bits.
       *
       * @example
       *
       *     wordArray.clamp();
       */
      clamp: function () {
        // Shortcuts
        var words = this.words;
        var sigBytes = this.sigBytes;

        // Clamp
        words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
        words.length = Math.ceil(sigBytes / 4);
      },
      /**
       * Creates a copy of this word array.
       *
       * @return {WordArray} The clone.
       *
       * @example
       *
       *     var clone = wordArray.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);
        clone.words = this.words.slice(0);
        return clone;
      },
      /**
       * Creates a word array filled with random bytes.
       *
       * @param {number} nBytes The number of random bytes to generate.
       *
       * @return {WordArray} The random word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.random(16);
       */
      random: function (nBytes) {
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
          words.push(cryptoSecureRandomInt());
        }
        return new WordArray.init(words, nBytes);
      }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
      /**
       * Converts a word array to a hex string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The hex string.
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          hexChars.push((bite >>> 4).toString(16));
          hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
      },
      /**
       * Converts a hex string to a word array.
       *
       * @param {string} hexStr The hex string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
       */
      parse: function (hexStr) {
        // Shortcut
        var hexStrLength = hexStr.length;

        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
          words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
        }
        return new WordArray.init(words, hexStrLength / 2);
      }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
      /**
       * Converts a word array to a Latin1 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Latin1 string.
       *
       * @static
       *
       * @example
       *
       *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
      },
      /**
       * Converts a Latin1 string to a word array.
       *
       * @param {string} latin1Str The Latin1 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
       */
      parse: function (latin1Str) {
        // Shortcut
        var latin1StrLength = latin1Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
          words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
        }
        return new WordArray.init(words, latin1StrLength);
      }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
      /**
       * Converts a word array to a UTF-8 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-8 string.
       *
       * @static
       *
       * @example
       *
       *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
       */
      stringify: function (wordArray) {
        try {
          return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        } catch (e) {
          throw new Error('Malformed UTF-8 data');
        }
      },
      /**
       * Converts a UTF-8 string to a word array.
       *
       * @param {string} utf8Str The UTF-8 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
       */
      parse: function (utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
      }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
      /**
       * Resets this block algorithm's data buffer to its initial state.
       *
       * @example
       *
       *     bufferedBlockAlgorithm.reset();
       */
      reset: function () {
        // Initial values
        this._data = new WordArray.init();
        this._nDataBytes = 0;
      },
      /**
       * Adds new data to this block algorithm's buffer.
       *
       * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
       *
       * @example
       *
       *     bufferedBlockAlgorithm._append('data');
       *     bufferedBlockAlgorithm._append(wordArray);
       */
      _append: function (data) {
        // Convert string to WordArray, else assume WordArray already
        if (typeof data == 'string') {
          data = Utf8.parse(data);
        }

        // Append
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
      },
      /**
       * Processes available data blocks.
       *
       * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
       *
       * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
       *
       * @return {WordArray} The processed data.
       *
       * @example
       *
       *     var processedData = bufferedBlockAlgorithm._process();
       *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
       */
      _process: function (doFlush) {
        var processedWords;

        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var dataSigBytes = data.sigBytes;
        var blockSize = this.blockSize;
        var blockSizeBytes = blockSize * 4;

        // Count blocks ready
        var nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
          // Round up to include partial blocks
          nBlocksReady = Math.ceil(nBlocksReady);
        } else {
          // Round down to include only full blocks,
          // less the number of blocks that must remain in the buffer
          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }

        // Count words ready
        var nWordsReady = nBlocksReady * blockSize;

        // Count bytes ready
        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

        // Process blocks
        if (nWordsReady) {
          for (var offset = 0; offset < nWordsReady; offset += blockSize) {
            // Perform concrete-algorithm logic
            this._doProcessBlock(dataWords, offset);
          }

          // Remove processed words
          processedWords = dataWords.splice(0, nWordsReady);
          data.sigBytes -= nBytesReady;
        }

        // Return processed words
        return new WordArray.init(processedWords, nBytesReady);
      },
      /**
       * Creates a copy of this object.
       *
       * @return {Object} The clone.
       *
       * @example
       *
       *     var clone = bufferedBlockAlgorithm.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);
        clone._data = this._data.clone();
        return clone;
      },
      _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
      /**
       * Configuration options.
       */
      cfg: Base.extend(),
      /**
       * Initializes a newly created hasher.
       *
       * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
       *
       * @example
       *
       *     var hasher = CryptoJS.algo.SHA256.create();
       */
      init: function (cfg) {
        // Apply config defaults
        this.cfg = this.cfg.extend(cfg);

        // Set initial values
        this.reset();
      },
      /**
       * Resets this hasher to its initial state.
       *
       * @example
       *
       *     hasher.reset();
       */
      reset: function () {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-hasher logic
        this._doReset();
      },
      /**
       * Updates this hasher with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {Hasher} This hasher.
       *
       * @example
       *
       *     hasher.update('message');
       *     hasher.update(wordArray);
       */
      update: function (messageUpdate) {
        // Append
        this._append(messageUpdate);

        // Update the hash
        this._process();

        // Chainable
        return this;
      },
      /**
       * Finalizes the hash computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The hash.
       *
       * @example
       *
       *     var hash = hasher.finalize();
       *     var hash = hasher.finalize('message');
       *     var hash = hasher.finalize(wordArray);
       */
      finalize: function (messageUpdate) {
        // Final message update
        if (messageUpdate) {
          this._append(messageUpdate);
        }

        // Perform concrete-hasher logic
        var hash = this._doFinalize();
        return hash;
      },
      blockSize: 512 / 32,
      /**
       * Creates a shortcut function to a hasher's object interface.
       *
       * @param {Hasher} hasher The hasher to create a helper for.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
       */
      _createHelper: function (hasher) {
        return function (message, cfg) {
          return new hasher.init(cfg).finalize(message);
        };
      },
      /**
       * Creates a shortcut function to the HMAC's object interface.
       *
       * @param {Hasher} hasher The hasher to use in this HMAC helper.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
       */
      _createHmacHelper: function (hasher) {
        return function (message, key) {
          return new C_algo.HMAC.init(hasher, key).finalize(message);
        };
      }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};
    return C;
  }(Math);
  return CryptoJS;
});

/***/ }),

/***/ 3483:
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/enc-base64.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

;
(function (root, factory) {
  if (true) {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 3350));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
      /**
       * Converts a word array to a Base64 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Base64 string.
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = this._map;

        // Clamp excess bits
        wordArray.clamp();

        // Convert
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
          var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
          var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
          var triplet = byte1 << 16 | byte2 << 8 | byte3;
          for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
            base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
          }
        }

        // Add padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          while (base64Chars.length % 4) {
            base64Chars.push(paddingChar);
          }
        }
        return base64Chars.join('');
      },
      /**
       * Converts a Base64 string to a word array.
       *
       * @param {string} base64Str The Base64 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
       */
      parse: function (base64Str) {
        // Shortcuts
        var base64StrLength = base64Str.length;
        var map = this._map;
        var reverseMap = this._reverseMap;
        if (!reverseMap) {
          reverseMap = this._reverseMap = [];
          for (var j = 0; j < map.length; j++) {
            reverseMap[map.charCodeAt(j)] = j;
          }
        }

        // Ignore padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          var paddingIndex = base64Str.indexOf(paddingChar);
          if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
          }
        }

        // Convert
        return parseLoop(base64Str, base64StrLength, reverseMap);
      },
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
    function parseLoop(base64Str, base64StrLength, reverseMap) {
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
          var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          var bitsCombined = bits1 | bits2;
          words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }
      return WordArray.create(words, nBytes);
    }
  })();
  return CryptoJS.enc.Base64;
});

/***/ }),

/***/ 9007:
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

;
(function (root, factory) {
  if (true) {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 3350));
  } else {}
})(this, function (CryptoJS) {
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Initialization and round constants tables
    var H = [];
    var K = [];

    // Compute constants
    (function () {
      function isPrime(n) {
        var sqrtN = Math.sqrt(n);
        for (var factor = 2; factor <= sqrtN; factor++) {
          if (!(n % factor)) {
            return false;
          }
        }
        return true;
      }
      function getFractionalBits(n) {
        return (n - (n | 0)) * 0x100000000 | 0;
      }
      var n = 2;
      var nPrime = 0;
      while (nPrime < 64) {
        if (isPrime(n)) {
          if (nPrime < 8) {
            H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
          }
          K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
          nPrime++;
        }
        n++;
      }
    })();

    // Reusable object
    var W = [];

    /**
     * SHA-256 hash algorithm.
     */
    var SHA256 = C_algo.SHA256 = Hasher.extend({
      _doReset: function () {
        this._hash = new WordArray.init(H.slice(0));
      },
      _doProcessBlock: function (M, offset) {
        // Shortcut
        var H = this._hash.words;

        // Working variables
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        var f = H[5];
        var g = H[6];
        var h = H[7];

        // Computation
        for (var i = 0; i < 64; i++) {
          if (i < 16) {
            W[i] = M[offset + i] | 0;
          } else {
            var gamma0x = W[i - 15];
            var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
            var gamma1x = W[i - 2];
            var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
            W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
          }
          var ch = e & f ^ ~e & g;
          var maj = a & b ^ a & c ^ b & c;
          var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
          var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
          var t1 = h + sigma1 + ch + K[i] + W[i];
          var t2 = sigma0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + t1 | 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 | 0;
        }

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
        H[5] = H[5] + f | 0;
        H[6] = H[6] + g | 0;
        H[7] = H[7] + h | 0;
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */
    C.SHA256 = Hasher._createHelper(SHA256);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
  })(Math);
  return CryptoJS.SHA256;
});

/***/ }),

/***/ 3570:
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
  let warned = false;
  return () => {
    if (!warned) {
      warned = true;
      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
  };
})();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
  if (!this.useColors) {
    return;
  }
  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }
    index++;
    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
  let r;
  try {
    r = exports.storage.getItem('debug');
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = ({"ZIP_SOCKET_SERVER":"https://socket.fartyparts.work","ZIP_SOCKET_PORT":"443","ZIP_PEER_SERVER":"peer.fartyparts.work","ZIP_PEER_PORT":"443","BUILD_YEAR":2023,"ZIP_BUILD_HASH":"55d0958069e8ebf1b5985a288f628be73af4f95f"}).DEBUG;
  }
  return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
module.exports = __webpack_require__(/*! ./common */ 2031)(exports);
const {
  formatters
} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),

/***/ 2031:
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ 5592);
  createDebug.destroy = destroy;
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });

  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];

  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */
  createDebug.formatters = {};

  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;

  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }
      const self = debug;

      // Set `diff` timestamp
      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      }

      // Apply any `formatters` transformations
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%';
        }
        index++;
        const formatter = createDebug.formatters[format];
        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val);

          // Now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // Apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }
    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: v => {
        enableOverride = v;
      }
    });

    // Env-specific initialization logic for debug instances
    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }
    return debug;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }

  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;
    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */
  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }

  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */
  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    let i;
    let len;
    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }

  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */
  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }

  /**
  * XXX DO NOT USE. This is a temporary stub function.
  * XXX It WILL be removed in the next major release.
  */
  function destroy() {
    console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  }
  createDebug.enable(createDebug.load());
  return createDebug;
}
module.exports = setup;

/***/ }),

/***/ 5356:
/*!***********************************************!*\
  !*** ./node_modules/isomorphic-ws/browser.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

var ws = null;
if (typeof WebSocket !== 'undefined') {
  ws = WebSocket;
} else if (typeof MozWebSocket !== 'undefined') {
  ws = MozWebSocket;
} else if (typeof global !== 'undefined') {
  ws = global.WebSocket || global.MozWebSocket;
} else if (typeof window !== 'undefined') {
  ws = window.WebSocket || window.MozWebSocket;
} else if (typeof self !== 'undefined') {
  ws = self.WebSocket || self.MozWebSocket;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ws);

/***/ }),

/***/ 5592:
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),

/***/ 6060:
/*!***************************************************************************!*\
  !*** ./node_modules/obs-websocket-js/node_modules/eventemitter3/index.js ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty,
  prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }
  var listener = new EE(fn, context || emitter, once),
    evt = prefix ? prefix + event : event;
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
    events,
    name;
  if (this._eventsCount === 0) return names;
  for (name in events = this._events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }
  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }
  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event,
    handlers = this._events[evt];
  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];
  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }
  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event,
    listeners = this._events[evt];
  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return false;
  var listeners = this._events[evt],
    len = arguments.length,
    args,
    i;
  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;
      case 2:
        return listeners.fn.call(listeners.context, a1), true;
      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;
      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }
    for (i = 1, args = new Array(len - 1); i < len; i++) {
      args[i - 1] = arguments[i];
    }
    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
      j;
    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);
          break;
        case 2:
          listeners[i].fn.call(listeners[i].context, a1);
          break;
        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);
          break;
        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);
          break;
        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
            args[j - 1] = arguments[j];
          }
          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }
  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }
  var listeners = this._events[evt];
  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
  }
  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;
  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }
  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}

/***/ }),

/***/ 5297:
/*!*************************************************************!*\
  !*** ./node_modules/peerjs-js-binarypack/lib/binarypack.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var BufferBuilder = (__webpack_require__(/*! ./bufferbuilder */ 8946).BufferBuilder);
var binaryFeatures = (__webpack_require__(/*! ./bufferbuilder */ 8946).binaryFeatures);
var BinaryPack = {
  unpack: function (data) {
    var unpacker = new Unpacker(data);
    return unpacker.unpack();
  },
  pack: function (data) {
    var packer = new Packer();
    packer.pack(data);
    var buffer = packer.getBuffer();
    return buffer;
  }
};
module.exports = BinaryPack;
function Unpacker(data) {
  // Data is ArrayBuffer
  this.index = 0;
  this.dataBuffer = data;
  this.dataView = new Uint8Array(this.dataBuffer);
  this.length = this.dataBuffer.byteLength;
}
Unpacker.prototype.unpack = function () {
  var type = this.unpack_uint8();
  if (type < 0x80) {
    return type;
  } else if ((type ^ 0xe0) < 0x20) {
    return (type ^ 0xe0) - 0x20;
  }
  var size;
  if ((size = type ^ 0xa0) <= 0x0f) {
    return this.unpack_raw(size);
  } else if ((size = type ^ 0xb0) <= 0x0f) {
    return this.unpack_string(size);
  } else if ((size = type ^ 0x90) <= 0x0f) {
    return this.unpack_array(size);
  } else if ((size = type ^ 0x80) <= 0x0f) {
    return this.unpack_map(size);
  }
  switch (type) {
    case 0xc0:
      return null;
    case 0xc1:
      return undefined;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return this.unpack_float();
    case 0xcb:
      return this.unpack_double();
    case 0xcc:
      return this.unpack_uint8();
    case 0xcd:
      return this.unpack_uint16();
    case 0xce:
      return this.unpack_uint32();
    case 0xcf:
      return this.unpack_uint64();
    case 0xd0:
      return this.unpack_int8();
    case 0xd1:
      return this.unpack_int16();
    case 0xd2:
      return this.unpack_int32();
    case 0xd3:
      return this.unpack_int64();
    case 0xd4:
      return undefined;
    case 0xd5:
      return undefined;
    case 0xd6:
      return undefined;
    case 0xd7:
      return undefined;
    case 0xd8:
      size = this.unpack_uint16();
      return this.unpack_string(size);
    case 0xd9:
      size = this.unpack_uint32();
      return this.unpack_string(size);
    case 0xda:
      size = this.unpack_uint16();
      return this.unpack_raw(size);
    case 0xdb:
      size = this.unpack_uint32();
      return this.unpack_raw(size);
    case 0xdc:
      size = this.unpack_uint16();
      return this.unpack_array(size);
    case 0xdd:
      size = this.unpack_uint32();
      return this.unpack_array(size);
    case 0xde:
      size = this.unpack_uint16();
      return this.unpack_map(size);
    case 0xdf:
      size = this.unpack_uint32();
      return this.unpack_map(size);
  }
};
Unpacker.prototype.unpack_uint8 = function () {
  var byte = this.dataView[this.index] & 0xff;
  this.index++;
  return byte;
};
Unpacker.prototype.unpack_uint16 = function () {
  var bytes = this.read(2);
  var uint16 = (bytes[0] & 0xff) * 256 + (bytes[1] & 0xff);
  this.index += 2;
  return uint16;
};
Unpacker.prototype.unpack_uint32 = function () {
  var bytes = this.read(4);
  var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
  this.index += 4;
  return uint32;
};
Unpacker.prototype.unpack_uint64 = function () {
  var bytes = this.read(8);
  var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
  this.index += 8;
  return uint64;
};
Unpacker.prototype.unpack_int8 = function () {
  var uint8 = this.unpack_uint8();
  return uint8 < 0x80 ? uint8 : uint8 - (1 << 8);
};
Unpacker.prototype.unpack_int16 = function () {
  var uint16 = this.unpack_uint16();
  return uint16 < 0x8000 ? uint16 : uint16 - (1 << 16);
};
Unpacker.prototype.unpack_int32 = function () {
  var uint32 = this.unpack_uint32();
  return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
};
Unpacker.prototype.unpack_int64 = function () {
  var uint64 = this.unpack_uint64();
  return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
};
Unpacker.prototype.unpack_raw = function (size) {
  if (this.length < this.index + size) {
    throw new Error('BinaryPackFailure: index is out of range' + ' ' + this.index + ' ' + size + ' ' + this.length);
  }
  var buf = this.dataBuffer.slice(this.index, this.index + size);
  this.index += size;

  // buf = util.bufferToString(buf);

  return buf;
};
Unpacker.prototype.unpack_string = function (size) {
  var bytes = this.read(size);
  var i = 0;
  var str = '';
  var c;
  var code;
  while (i < size) {
    c = bytes[i];
    if (c < 128) {
      str += String.fromCharCode(c);
      i++;
    } else if ((c ^ 0xc0) < 32) {
      code = (c ^ 0xc0) << 6 | bytes[i + 1] & 63;
      str += String.fromCharCode(code);
      i += 2;
    } else {
      code = (c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63;
      str += String.fromCharCode(code);
      i += 3;
    }
  }
  this.index += size;
  return str;
};
Unpacker.prototype.unpack_array = function (size) {
  var objects = new Array(size);
  for (var i = 0; i < size; i++) {
    objects[i] = this.unpack();
  }
  return objects;
};
Unpacker.prototype.unpack_map = function (size) {
  var map = {};
  for (var i = 0; i < size; i++) {
    var key = this.unpack();
    var value = this.unpack();
    map[key] = value;
  }
  return map;
};
Unpacker.prototype.unpack_float = function () {
  var uint32 = this.unpack_uint32();
  var sign = uint32 >> 31;
  var exp = (uint32 >> 23 & 0xff) - 127;
  var fraction = uint32 & 0x7fffff | 0x800000;
  return (sign === 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
};
Unpacker.prototype.unpack_double = function () {
  var h32 = this.unpack_uint32();
  var l32 = this.unpack_uint32();
  var sign = h32 >> 31;
  var exp = (h32 >> 20 & 0x7ff) - 1023;
  var hfrac = h32 & 0xfffff | 0x100000;
  var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
  return (sign === 0 ? 1 : -1) * frac;
};
Unpacker.prototype.read = function (length) {
  var j = this.index;
  if (j + length <= this.length) {
    return this.dataView.subarray(j, j + length);
  } else {
    throw new Error('BinaryPackFailure: read index out of range');
  }
};
function Packer() {
  this.bufferBuilder = new BufferBuilder();
}
Packer.prototype.getBuffer = function () {
  return this.bufferBuilder.getBuffer();
};
Packer.prototype.pack = function (value) {
  var type = typeof value;
  if (type === 'string') {
    this.pack_string(value);
  } else if (type === 'number') {
    if (Math.floor(value) === value) {
      this.pack_integer(value);
    } else {
      this.pack_double(value);
    }
  } else if (type === 'boolean') {
    if (value === true) {
      this.bufferBuilder.append(0xc3);
    } else if (value === false) {
      this.bufferBuilder.append(0xc2);
    }
  } else if (type === 'undefined') {
    this.bufferBuilder.append(0xc0);
  } else if (type === 'object') {
    if (value === null) {
      this.bufferBuilder.append(0xc0);
    } else {
      var constructor = value.constructor;
      if (constructor == Array) {
        this.pack_array(value);
      } else if (constructor == Blob || constructor == File || value instanceof Blob || value instanceof File) {
        this.pack_bin(value);
      } else if (constructor == ArrayBuffer) {
        if (binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value));
        } else {
          this.pack_bin(value);
        }
      } else if ('BYTES_PER_ELEMENT' in value) {
        if (binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value.buffer));
        } else {
          this.pack_bin(value.buffer);
        }
      } else if (constructor == Object || constructor.toString().startsWith('class')) {
        this.pack_object(value);
      } else if (constructor == Date) {
        this.pack_string(value.toString());
      } else if (typeof value.toBinaryPack === 'function') {
        this.bufferBuilder.append(value.toBinaryPack());
      } else {
        throw new Error('Type "' + constructor.toString() + '" not yet supported');
      }
    }
  } else {
    throw new Error('Type "' + type + '" not yet supported');
  }
  this.bufferBuilder.flush();
};
Packer.prototype.pack_bin = function (blob) {
  var length = blob.length || blob.byteLength || blob.size;
  if (length <= 0x0f) {
    this.pack_uint8(0xa0 + length);
  } else if (length <= 0xffff) {
    this.bufferBuilder.append(0xda);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff) {
    this.bufferBuilder.append(0xdb);
    this.pack_uint32(length);
  } else {
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(blob);
};
Packer.prototype.pack_string = function (str) {
  var length = utf8Length(str);
  if (length <= 0x0f) {
    this.pack_uint8(0xb0 + length);
  } else if (length <= 0xffff) {
    this.bufferBuilder.append(0xd8);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff) {
    this.bufferBuilder.append(0xd9);
    this.pack_uint32(length);
  } else {
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(str);
};
Packer.prototype.pack_array = function (ary) {
  var length = ary.length;
  if (length <= 0x0f) {
    this.pack_uint8(0x90 + length);
  } else if (length <= 0xffff) {
    this.bufferBuilder.append(0xdc);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff) {
    this.bufferBuilder.append(0xdd);
    this.pack_uint32(length);
  } else {
    throw new Error('Invalid length');
  }
  for (var i = 0; i < length; i++) {
    this.pack(ary[i]);
  }
};
Packer.prototype.pack_integer = function (num) {
  if (num >= -0x20 && num <= 0x7f) {
    this.bufferBuilder.append(num & 0xff);
  } else if (num >= 0x00 && num <= 0xff) {
    this.bufferBuilder.append(0xcc);
    this.pack_uint8(num);
  } else if (num >= -0x80 && num <= 0x7f) {
    this.bufferBuilder.append(0xd0);
    this.pack_int8(num);
  } else if (num >= 0x0000 && num <= 0xffff) {
    this.bufferBuilder.append(0xcd);
    this.pack_uint16(num);
  } else if (num >= -0x8000 && num <= 0x7fff) {
    this.bufferBuilder.append(0xd1);
    this.pack_int16(num);
  } else if (num >= 0x00000000 && num <= 0xffffffff) {
    this.bufferBuilder.append(0xce);
    this.pack_uint32(num);
  } else if (num >= -0x80000000 && num <= 0x7fffffff) {
    this.bufferBuilder.append(0xd2);
    this.pack_int32(num);
  } else if (num >= -0x8000000000000000 && num <= 0x7FFFFFFFFFFFFFFF) {
    this.bufferBuilder.append(0xd3);
    this.pack_int64(num);
  } else if (num >= 0x0000000000000000 && num <= 0xFFFFFFFFFFFFFFFF) {
    this.bufferBuilder.append(0xcf);
    this.pack_uint64(num);
  } else {
    throw new Error('Invalid integer');
  }
};
Packer.prototype.pack_double = function (num) {
  var sign = 0;
  if (num < 0) {
    sign = 1;
    num = -num;
  }
  var exp = Math.floor(Math.log(num) / Math.LN2);
  var frac0 = num / Math.pow(2, exp) - 1;
  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
  var b32 = Math.pow(2, 32);
  var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 0x0fffff;
  var l32 = frac1 % b32;
  this.bufferBuilder.append(0xcb);
  this.pack_int32(h32);
  this.pack_int32(l32);
};
Packer.prototype.pack_object = function (obj) {
  var keys = Object.keys(obj);
  var length = keys.length;
  if (length <= 0x0f) {
    this.pack_uint8(0x80 + length);
  } else if (length <= 0xffff) {
    this.bufferBuilder.append(0xde);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff) {
    this.bufferBuilder.append(0xdf);
    this.pack_uint32(length);
  } else {
    throw new Error('Invalid length');
  }
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      this.pack(prop);
      this.pack(obj[prop]);
    }
  }
};
Packer.prototype.pack_uint8 = function (num) {
  this.bufferBuilder.append(num);
};
Packer.prototype.pack_uint16 = function (num) {
  this.bufferBuilder.append(num >> 8);
  this.bufferBuilder.append(num & 0xff);
};
Packer.prototype.pack_uint32 = function (num) {
  var n = num & 0xffffffff;
  this.bufferBuilder.append((n & 0xff000000) >>> 24);
  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((n & 0x0000ff00) >>> 8);
  this.bufferBuilder.append(n & 0x000000ff);
};
Packer.prototype.pack_uint64 = function (num) {
  var high = num / Math.pow(2, 32);
  var low = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>> 8);
  this.bufferBuilder.append(high & 0x000000ff);
  this.bufferBuilder.append((low & 0xff000000) >>> 24);
  this.bufferBuilder.append((low & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low & 0x0000ff00) >>> 8);
  this.bufferBuilder.append(low & 0x000000ff);
};
Packer.prototype.pack_int8 = function (num) {
  this.bufferBuilder.append(num & 0xff);
};
Packer.prototype.pack_int16 = function (num) {
  this.bufferBuilder.append((num & 0xff00) >> 8);
  this.bufferBuilder.append(num & 0xff);
};
Packer.prototype.pack_int32 = function (num) {
  this.bufferBuilder.append(num >>> 24 & 0xff);
  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
  this.bufferBuilder.append(num & 0x000000ff);
};
Packer.prototype.pack_int64 = function (num) {
  var high = Math.floor(num / Math.pow(2, 32));
  var low = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>> 8);
  this.bufferBuilder.append(high & 0x000000ff);
  this.bufferBuilder.append((low & 0xff000000) >>> 24);
  this.bufferBuilder.append((low & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low & 0x0000ff00) >>> 8);
  this.bufferBuilder.append(low & 0x000000ff);
};
function _utf8Replace(m) {
  var code = m.charCodeAt(0);
  if (code <= 0x7ff) return '00';
  if (code <= 0xffff) return '000';
  if (code <= 0x1fffff) return '0000';
  if (code <= 0x3ffffff) return '00000';
  return '000000';
}
function utf8Length(str) {
  if (str.length > 600) {
    // Blob method faster for large strings
    return new Blob([str]).size;
  } else {
    return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
  }
}

/***/ }),

/***/ 8946:
/*!****************************************************************!*\
  !*** ./node_modules/peerjs-js-binarypack/lib/bufferbuilder.js ***!
  \****************************************************************/
/***/ ((module) => {

var binaryFeatures = {};
binaryFeatures.useBlobBuilder = function () {
  try {
    new Blob([]);
    return false;
  } catch (e) {
    return true;
  }
}();
binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && function () {
  try {
    return new Blob([new Uint8Array([])]).size === 0;
  } catch (e) {
    return true;
  }
}();
module.exports.binaryFeatures = binaryFeatures;
var BlobBuilder = module.exports.BlobBuilder;
if (typeof window !== 'undefined') {
  BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
}
function BufferBuilder() {
  this._pieces = [];
  this._parts = [];
}
BufferBuilder.prototype.append = function (data) {
  if (typeof data === 'number') {
    this._pieces.push(data);
  } else {
    this.flush();
    this._parts.push(data);
  }
};
BufferBuilder.prototype.flush = function () {
  if (this._pieces.length > 0) {
    var buf = new Uint8Array(this._pieces);
    if (!binaryFeatures.useArrayBufferView) {
      buf = buf.buffer;
    }
    this._parts.push(buf);
    this._pieces = [];
  }
};
BufferBuilder.prototype.getBuffer = function () {
  this.flush();
  if (binaryFeatures.useBlobBuilder) {
    var builder = new BlobBuilder();
    for (var i = 0, ii = this._parts.length; i < ii; i++) {
      builder.append(this._parts[i]);
    }
    return builder.getBlob();
  } else {
    return new Blob(this._parts);
  }
};
module.exports.BufferBuilder = BufferBuilder;

/***/ }),

/***/ 60:
/*!******************************************************************!*\
  !*** ./node_modules/rtcpeerconnection-shim/rtcpeerconnection.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */


var SDPUtils = __webpack_require__(/*! sdp */ 4038);
function fixStatsType(stat) {
  return {
    inboundrtp: 'inbound-rtp',
    outboundrtp: 'outbound-rtp',
    candidatepair: 'candidate-pair',
    localcandidate: 'local-candidate',
    remotecandidate: 'remote-candidate'
  }[stat.type] || stat.type;
}
function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');
  sdp += 'a=mid:' + transceiver.mid + '\r\n';
  if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }
  if (transceiver.rtpSender) {
    var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
    transceiver.rtpSender._initialTrackId = trackId;
    // spec.
    var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
    sdp += 'a=' + msid;
    // for Chrome. Legacy should no longer be required.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;

    // RTX
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
      sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
}

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
function filterIceServers(iceServers, edgeVersion) {
  var hasTurn = false;
  iceServers = JSON.parse(JSON.stringify(iceServers));
  return iceServers.filter(function (server) {
    if (server && (server.urls || server.url)) {
      var urls = server.urls || server.url;
      if (server.url && !server.urls) {
        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
      }
      var isString = typeof urls === 'string';
      if (isString) {
        urls = [urls];
      }
      urls = urls.filter(function (url) {
        var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;
        if (validTurn) {
          hasTurn = true;
          return true;
        }
        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
      });
      delete server.url;
      server.urls = isString ? urls[0] : urls;
      return !!urls.length;
    }
  });
}

// Determines the intersection of local and remote capabilities.
function getCommonCapabilities(localCapabilities, remoteCapabilities) {
  var commonCapabilities = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: []
  };
  var findCodecByPayloadType = function (pt, codecs) {
    pt = parseInt(pt, 10);
    for (var i = 0; i < codecs.length; i++) {
      if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
        return codecs[i];
      }
    }
  };
  var rtxCapabilityMatches = function (lRtx, rRtx, lCodecs, rCodecs) {
    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
    return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
  };
  localCapabilities.codecs.forEach(function (lCodec) {
    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
      var rCodec = remoteCapabilities.codecs[i];
      if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
        if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
          // for RTX we need to find the local rtx that has a apt
          // which points to the same local codec as the remote one.
          if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
            continue;
          }
        }
        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
        // number of channels is the highest common number of channels
        rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
        // push rCodec so we reply with offerer payload type
        commonCapabilities.codecs.push(rCodec);

        // determine common feedback mechanisms
        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
          for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
            if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
              return true;
            }
          }
          return false;
        });
        // FIXME: also need to determine .parameters
        //  see https://github.com/openpeer/ortc/issues/569
        break;
      }
    }
  });
  localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
    for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
      var rHeaderExtension = remoteCapabilities.headerExtensions[i];
      if (lHeaderExtension.uri === rHeaderExtension.uri) {
        commonCapabilities.headerExtensions.push(rHeaderExtension);
        break;
      }
    }
  });

  // FIXME: fecMechanisms
  return commonCapabilities;
}

// is action=setLocalDescription with type allowed in signalingState
function isActionAllowedInSignalingState(action, type, signalingState) {
  return {
    offer: {
      setLocalDescription: ['stable', 'have-local-offer'],
      setRemoteDescription: ['stable', 'have-remote-offer']
    },
    answer: {
      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
    }
  }[type][action].indexOf(signalingState) !== -1;
}
function maybeAddCandidate(iceTransport, candidate) {
  // Edge's internal representation adds some fields therefore
  // not all fieldѕ are taken into account.
  var alreadyAdded = iceTransport.getRemoteCandidates().find(function (remoteCandidate) {
    return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
  });
  if (!alreadyAdded) {
    iceTransport.addRemoteCandidate(candidate);
  }
  return !alreadyAdded;
}
function makeError(name, description) {
  var e = new Error(description);
  e.name = name;
  // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
  e.code = {
    NotSupportedError: 9,
    InvalidStateError: 11,
    InvalidAccessError: 15,
    TypeError: undefined,
    OperationError: undefined
  }[name];
  return e;
}
module.exports = function (window, edgeVersion) {
  // https://w3c.github.io/mediacapture-main/#mediastream
  // Helper function to add the track to the stream and
  // dispatch the event ourselves.
  function addTrackToStreamAndFireEvent(track, stream) {
    stream.addTrack(track);
    stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', {
      track: track
    }));
  }
  function removeTrackFromStreamAndFireEvent(track, stream) {
    stream.removeTrack(track);
    stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', {
      track: track
    }));
  }
  function fireAddTrack(pc, track, receiver, streams) {
    var trackEvent = new Event('track');
    trackEvent.track = track;
    trackEvent.receiver = receiver;
    trackEvent.transceiver = {
      receiver: receiver
    };
    trackEvent.streams = streams;
    window.setTimeout(function () {
      pc._dispatchEvent('track', trackEvent);
    });
  }
  var RTCPeerConnection = function (config) {
    var pc = this;
    var _eventTarget = document.createDocumentFragment();
    ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
      pc[method] = _eventTarget[method].bind(_eventTarget);
    });
    this.canTrickleIceCandidates = null;
    this.needNegotiation = false;
    this.localStreams = [];
    this.remoteStreams = [];
    this._localDescription = null;
    this._remoteDescription = null;
    this.signalingState = 'stable';
    this.iceConnectionState = 'new';
    this.connectionState = 'new';
    this.iceGatheringState = 'new';
    config = JSON.parse(JSON.stringify(config || {}));
    this.usingBundle = config.bundlePolicy === 'max-bundle';
    if (config.rtcpMuxPolicy === 'negotiate') {
      throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
    } else if (!config.rtcpMuxPolicy) {
      config.rtcpMuxPolicy = 'require';
    }
    switch (config.iceTransportPolicy) {
      case 'all':
      case 'relay':
        break;
      default:
        config.iceTransportPolicy = 'all';
        break;
    }
    switch (config.bundlePolicy) {
      case 'balanced':
      case 'max-compat':
      case 'max-bundle':
        break;
      default:
        config.bundlePolicy = 'balanced';
        break;
    }
    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);
    this._iceGatherers = [];
    if (config.iceCandidatePoolSize) {
      for (var i = config.iceCandidatePoolSize; i > 0; i--) {
        this._iceGatherers.push(new window.RTCIceGatherer({
          iceServers: config.iceServers,
          gatherPolicy: config.iceTransportPolicy
        }));
      }
    } else {
      config.iceCandidatePoolSize = 0;
    }
    this._config = config;

    // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
    // everything that is needed to describe a SDP m-line.
    this.transceivers = [];
    this._sdpSessionId = SDPUtils.generateSessionId();
    this._sdpSessionVersion = 0;
    this._dtlsRole = undefined; // role for a=setup to use in answers.

    this._isClosed = false;
  };
  Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
    configurable: true,
    get: function () {
      return this._localDescription;
    }
  });
  Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
    configurable: true,
    get: function () {
      return this._remoteDescription;
    }
  });

  // set up event handlers on prototype
  RTCPeerConnection.prototype.onicecandidate = null;
  RTCPeerConnection.prototype.onaddstream = null;
  RTCPeerConnection.prototype.ontrack = null;
  RTCPeerConnection.prototype.onremovestream = null;
  RTCPeerConnection.prototype.onsignalingstatechange = null;
  RTCPeerConnection.prototype.oniceconnectionstatechange = null;
  RTCPeerConnection.prototype.onconnectionstatechange = null;
  RTCPeerConnection.prototype.onicegatheringstatechange = null;
  RTCPeerConnection.prototype.onnegotiationneeded = null;
  RTCPeerConnection.prototype.ondatachannel = null;
  RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
    if (this._isClosed) {
      return;
    }
    this.dispatchEvent(event);
    if (typeof this['on' + name] === 'function') {
      this['on' + name](event);
    }
  };
  RTCPeerConnection.prototype._emitGatheringStateChange = function () {
    var event = new Event('icegatheringstatechange');
    this._dispatchEvent('icegatheringstatechange', event);
  };
  RTCPeerConnection.prototype.getConfiguration = function () {
    return this._config;
  };
  RTCPeerConnection.prototype.getLocalStreams = function () {
    return this.localStreams;
  };
  RTCPeerConnection.prototype.getRemoteStreams = function () {
    return this.remoteStreams;
  };

  // internal helper to create a transceiver object.
  // (which is not yet the same as the WebRTC 1.0 transceiver)
  RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
    var hasBundleTransport = this.transceivers.length > 0;
    var transceiver = {
      track: null,
      iceGatherer: null,
      iceTransport: null,
      dtlsTransport: null,
      localCapabilities: null,
      remoteCapabilities: null,
      rtpSender: null,
      rtpReceiver: null,
      kind: kind,
      mid: null,
      sendEncodingParameters: null,
      recvEncodingParameters: null,
      stream: null,
      associatedRemoteMediaStreams: [],
      wantReceive: true
    };
    if (this.usingBundle && hasBundleTransport) {
      transceiver.iceTransport = this.transceivers[0].iceTransport;
      transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
    } else {
      var transports = this._createIceAndDtlsTransports();
      transceiver.iceTransport = transports.iceTransport;
      transceiver.dtlsTransport = transports.dtlsTransport;
    }
    if (!doNotAdd) {
      this.transceivers.push(transceiver);
    }
    return transceiver;
  };
  RTCPeerConnection.prototype.addTrack = function (track, stream) {
    if (this._isClosed) {
      throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
    }
    var alreadyExists = this.transceivers.find(function (s) {
      return s.track === track;
    });
    if (alreadyExists) {
      throw makeError('InvalidAccessError', 'Track already exists.');
    }
    var transceiver;
    for (var i = 0; i < this.transceivers.length; i++) {
      if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
        transceiver = this.transceivers[i];
      }
    }
    if (!transceiver) {
      transceiver = this._createTransceiver(track.kind);
    }
    this._maybeFireNegotiationNeeded();
    if (this.localStreams.indexOf(stream) === -1) {
      this.localStreams.push(stream);
    }
    transceiver.track = track;
    transceiver.stream = stream;
    transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
    return transceiver.rtpSender;
  };
  RTCPeerConnection.prototype.addStream = function (stream) {
    var pc = this;
    if (edgeVersion >= 15025) {
      stream.getTracks().forEach(function (track) {
        pc.addTrack(track, stream);
      });
    } else {
      // Clone is necessary for local demos mostly, attaching directly
      // to two different senders does not work (build 10547).
      // Fixed in 15025 (or earlier)
      var clonedStream = stream.clone();
      stream.getTracks().forEach(function (track, idx) {
        var clonedTrack = clonedStream.getTracks()[idx];
        track.addEventListener('enabled', function (event) {
          clonedTrack.enabled = event.enabled;
        });
      });
      clonedStream.getTracks().forEach(function (track) {
        pc.addTrack(track, clonedStream);
      });
    }
  };
  RTCPeerConnection.prototype.removeTrack = function (sender) {
    if (this._isClosed) {
      throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
    }
    if (!(sender instanceof window.RTCRtpSender)) {
      throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.');
    }
    var transceiver = this.transceivers.find(function (t) {
      return t.rtpSender === sender;
    });
    if (!transceiver) {
      throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
    }
    var stream = transceiver.stream;
    transceiver.rtpSender.stop();
    transceiver.rtpSender = null;
    transceiver.track = null;
    transceiver.stream = null;

    // remove the stream from the set of local streams
    var localStreams = this.transceivers.map(function (t) {
      return t.stream;
    });
    if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
      this.localStreams.splice(this.localStreams.indexOf(stream), 1);
    }
    this._maybeFireNegotiationNeeded();
  };
  RTCPeerConnection.prototype.removeStream = function (stream) {
    var pc = this;
    stream.getTracks().forEach(function (track) {
      var sender = pc.getSenders().find(function (s) {
        return s.track === track;
      });
      if (sender) {
        pc.removeTrack(sender);
      }
    });
  };
  RTCPeerConnection.prototype.getSenders = function () {
    return this.transceivers.filter(function (transceiver) {
      return !!transceiver.rtpSender;
    }).map(function (transceiver) {
      return transceiver.rtpSender;
    });
  };
  RTCPeerConnection.prototype.getReceivers = function () {
    return this.transceivers.filter(function (transceiver) {
      return !!transceiver.rtpReceiver;
    }).map(function (transceiver) {
      return transceiver.rtpReceiver;
    });
  };
  RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex, usingBundle) {
    var pc = this;
    if (usingBundle && sdpMLineIndex > 0) {
      return this.transceivers[0].iceGatherer;
    } else if (this._iceGatherers.length) {
      return this._iceGatherers.shift();
    }
    var iceGatherer = new window.RTCIceGatherer({
      iceServers: this._config.iceServers,
      gatherPolicy: this._config.iceTransportPolicy
    });
    Object.defineProperty(iceGatherer, 'state', {
      value: 'new',
      writable: true
    });
    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
    this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
      var end = !event.candidate || Object.keys(event.candidate).length === 0;
      // polyfill since RTCIceGatherer.state is not implemented in
      // Edge 10547 yet.
      iceGatherer.state = end ? 'completed' : 'gathering';
      if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
        pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
      }
    };
    iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
    return iceGatherer;
  };

  // start gathering from an RTCIceGatherer.
  RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
    var pc = this;
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
    if (iceGatherer.onlocalcandidate) {
      return;
    }
    var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
    iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
    iceGatherer.onlocalcandidate = function (evt) {
      if (pc.usingBundle && sdpMLineIndex > 0) {
        // if we know that we use bundle we can drop candidates with
        // ѕdpMLineIndex > 0. If we don't do this then our state gets
        // confused since we dispose the extra ice gatherer.
        return;
      }
      var event = new Event('icecandidate');
      event.candidate = {
        sdpMid: mid,
        sdpMLineIndex: sdpMLineIndex
      };
      var cand = evt.candidate;
      // Edge emits an empty object for RTCIceCandidateComplete‥
      var end = !cand || Object.keys(cand).length === 0;
      if (end) {
        // polyfill since RTCIceGatherer.state is not implemented in
        // Edge 10547 yet.
        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
          iceGatherer.state = 'completed';
        }
      } else {
        if (iceGatherer.state === 'new') {
          iceGatherer.state = 'gathering';
        }
        // RTCIceCandidate doesn't have a component, needs to be added
        cand.component = 1;
        // also the usernameFragment. TODO: update SDP to take both variants.
        cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
        var serializedCandidate = SDPUtils.writeCandidate(cand);
        event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));
        event.candidate.candidate = serializedCandidate;
        event.candidate.toJSON = function () {
          return {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            usernameFragment: event.candidate.usernameFragment
          };
        };
      }

      // update local description.
      var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
      if (!end) {
        sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
      } else {
        sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
      }
      pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join('');
      var complete = pc.transceivers.every(function (transceiver) {
        return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
      });
      if (pc.iceGatheringState !== 'gathering') {
        pc.iceGatheringState = 'gathering';
        pc._emitGatheringStateChange();
      }

      // Emit candidate. Also emit null candidate when all gatherers are
      // complete.
      if (!end) {
        pc._dispatchEvent('icecandidate', event);
      }
      if (complete) {
        pc._dispatchEvent('icecandidate', new Event('icecandidate'));
        pc.iceGatheringState = 'complete';
        pc._emitGatheringStateChange();
      }
    };

    // emit already gathered candidates.
    window.setTimeout(function () {
      bufferedCandidateEvents.forEach(function (e) {
        iceGatherer.onlocalcandidate(e);
      });
    }, 0);
  };

  // Create ICE transport and DTLS transport.
  RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
    var pc = this;
    var iceTransport = new window.RTCIceTransport(null);
    iceTransport.onicestatechange = function () {
      pc._updateIceConnectionState();
      pc._updateConnectionState();
    };
    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
    dtlsTransport.ondtlsstatechange = function () {
      pc._updateConnectionState();
    };
    dtlsTransport.onerror = function () {
      // onerror does not set state to failed by itself.
      Object.defineProperty(dtlsTransport, 'state', {
        value: 'failed',
        writable: true
      });
      pc._updateConnectionState();
    };
    return {
      iceTransport: iceTransport,
      dtlsTransport: dtlsTransport
    };
  };

  // Destroy ICE gatherer, ICE transport and DTLS transport.
  // Without triggering the callbacks.
  RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (sdpMLineIndex) {
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
    if (iceGatherer) {
      delete iceGatherer.onlocalcandidate;
      delete this.transceivers[sdpMLineIndex].iceGatherer;
    }
    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
    if (iceTransport) {
      delete iceTransport.onicestatechange;
      delete this.transceivers[sdpMLineIndex].iceTransport;
    }
    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
    if (dtlsTransport) {
      delete dtlsTransport.ondtlsstatechange;
      delete dtlsTransport.onerror;
      delete this.transceivers[sdpMLineIndex].dtlsTransport;
    }
  };

  // Start the RTP Sender and Receiver for a transceiver.
  RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
    var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
    if (send && transceiver.rtpSender) {
      params.encodings = transceiver.sendEncodingParameters;
      params.rtcp = {
        cname: SDPUtils.localCName,
        compound: transceiver.rtcpParameters.compound
      };
      if (transceiver.recvEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
      }
      transceiver.rtpSender.send(params);
    }
    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
      // remove RTX field in Edge 14942
      if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) {
        transceiver.recvEncodingParameters.forEach(function (p) {
          delete p.rtx;
        });
      }
      if (transceiver.recvEncodingParameters.length) {
        params.encodings = transceiver.recvEncodingParameters;
      } else {
        params.encodings = [{}];
      }
      params.rtcp = {
        compound: transceiver.rtcpParameters.compound
      };
      if (transceiver.rtcpParameters.cname) {
        params.rtcp.cname = transceiver.rtcpParameters.cname;
      }
      if (transceiver.sendEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
      }
      transceiver.rtpReceiver.receive(params);
    }
  };
  RTCPeerConnection.prototype.setLocalDescription = function (description) {
    var pc = this;

    // Note: pranswer is not supported.
    if (['offer', 'answer'].indexOf(description.type) === -1) {
      return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
    }
    if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
    }
    var sections;
    var sessionpart;
    if (description.type === 'offer') {
      // VERY limited support for SDP munging. Limited to:
      // * changing the order of codecs
      sections = SDPUtils.splitSections(description.sdp);
      sessionpart = sections.shift();
      sections.forEach(function (mediaSection, sdpMLineIndex) {
        var caps = SDPUtils.parseRtpParameters(mediaSection);
        pc.transceivers[sdpMLineIndex].localCapabilities = caps;
      });
      pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
        pc._gather(transceiver.mid, sdpMLineIndex);
      });
    } else if (description.type === 'answer') {
      sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
      sessionpart = sections.shift();
      var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
      sections.forEach(function (mediaSection, sdpMLineIndex) {
        var transceiver = pc.transceivers[sdpMLineIndex];
        var iceGatherer = transceiver.iceGatherer;
        var iceTransport = transceiver.iceTransport;
        var dtlsTransport = transceiver.dtlsTransport;
        var localCapabilities = transceiver.localCapabilities;
        var remoteCapabilities = transceiver.remoteCapabilities;

        // treat bundle-only as not-rejected.
        var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
        if (!rejected && !transceiver.rejected) {
          var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
          var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
          if (isIceLite) {
            remoteDtlsParameters.role = 'server';
          }
          if (!pc.usingBundle || sdpMLineIndex === 0) {
            pc._gather(transceiver.mid, sdpMLineIndex);
            if (iceTransport.state === 'new') {
              iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
            }
            if (dtlsTransport.state === 'new') {
              dtlsTransport.start(remoteDtlsParameters);
            }
          }

          // Calculate intersection of capabilities.
          var params = getCommonCapabilities(localCapabilities, remoteCapabilities);

          // Start the RTCRtpSender. The RTCRtpReceiver for this
          // transceiver has already been started in setRemoteDescription.
          pc._transceive(transceiver, params.codecs.length > 0, false);
        }
      });
    }
    pc._localDescription = {
      type: description.type,
      sdp: description.sdp
    };
    if (description.type === 'offer') {
      pc._updateSignalingState('have-local-offer');
    } else {
      pc._updateSignalingState('stable');
    }
    return Promise.resolve();
  };
  RTCPeerConnection.prototype.setRemoteDescription = function (description) {
    var pc = this;

    // Note: pranswer is not supported.
    if (['offer', 'answer'].indexOf(description.type) === -1) {
      return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
    }
    if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
    }
    var streams = {};
    pc.remoteStreams.forEach(function (stream) {
      streams[stream.id] = stream;
    });
    var receiverList = [];
    var sections = SDPUtils.splitSections(description.sdp);
    var sessionpart = sections.shift();
    var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
    var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
    pc.usingBundle = usingBundle;
    var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
    if (iceOptions) {
      pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
    } else {
      pc.canTrickleIceCandidates = false;
    }
    sections.forEach(function (mediaSection, sdpMLineIndex) {
      var lines = SDPUtils.splitLines(mediaSection);
      var kind = SDPUtils.getKind(mediaSection);
      // treat bundle-only as not-rejected.
      var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
      var protocol = lines[0].substr(2).split(' ')[2];
      var direction = SDPUtils.getDirection(mediaSection, sessionpart);
      var remoteMsid = SDPUtils.parseMsid(mediaSection);
      var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

      // Reject datachannels which are not implemented yet.
      if (rejected || kind === 'application' && (protocol === 'DTLS/SCTP' || protocol === 'UDP/DTLS/SCTP')) {
        // TODO: this is dangerous in the case where a non-rejected m-line
        //     becomes rejected.
        pc.transceivers[sdpMLineIndex] = {
          mid: mid,
          kind: kind,
          protocol: protocol,
          rejected: true
        };
        return;
      }
      if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
        // recycle a rejected transceiver.
        pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
      }
      var transceiver;
      var iceGatherer;
      var iceTransport;
      var dtlsTransport;
      var rtpReceiver;
      var sendEncodingParameters;
      var recvEncodingParameters;
      var localCapabilities;
      var track;
      // FIXME: ensure the mediaSection has rtcp-mux set.
      var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
      var remoteIceParameters;
      var remoteDtlsParameters;
      if (!rejected) {
        remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
        remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
        remoteDtlsParameters.role = 'client';
      }
      recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);
      var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);
      var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
      var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
        return SDPUtils.parseCandidate(cand);
      }).filter(function (cand) {
        return cand.component === 1;
      });

      // Check if we can use BUNDLE and dispose transports.
      if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
        pc._disposeIceAndDtlsTransports(sdpMLineIndex);
        pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
        pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
        pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
        if (pc.transceivers[sdpMLineIndex].rtpSender) {
          pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
        }
        if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
          pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
        }
      }
      if (description.type === 'offer' && !rejected) {
        transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
        transceiver.mid = mid;
        if (!transceiver.iceGatherer) {
          transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
        }
        if (cands.length && transceiver.iceTransport.state === 'new') {
          if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
            transceiver.iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function (candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }
        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

        // filter RTX until additional stuff needed for RTX is implemented
        // in adapter.js
        if (edgeVersion < 15019) {
          localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
            return codec.name !== 'rtx';
          });
        }
        sendEncodingParameters = transceiver.sendEncodingParameters || [{
          ssrc: (2 * sdpMLineIndex + 2) * 1001
        }];

        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
        var isNewTrack = false;
        if (direction === 'sendrecv' || direction === 'sendonly') {
          isNewTrack = !transceiver.rtpReceiver;
          rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
          if (isNewTrack) {
            var stream;
            track = rtpReceiver.track;
            // FIXME: does not work with Plan B.
            if (remoteMsid && remoteMsid.stream === '-') {
              // no-op. a stream id of '-' means: no associated stream.
            } else if (remoteMsid) {
              if (!streams[remoteMsid.stream]) {
                streams[remoteMsid.stream] = new window.MediaStream();
                Object.defineProperty(streams[remoteMsid.stream], 'id', {
                  get: function () {
                    return remoteMsid.stream;
                  }
                });
              }
              Object.defineProperty(track, 'id', {
                get: function () {
                  return remoteMsid.track;
                }
              });
              stream = streams[remoteMsid.stream];
            } else {
              if (!streams.default) {
                streams.default = new window.MediaStream();
              }
              stream = streams.default;
            }
            if (stream) {
              addTrackToStreamAndFireEvent(track, stream);
              transceiver.associatedRemoteMediaStreams.push(stream);
            }
            receiverList.push([track, rtpReceiver, stream]);
          }
        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
          transceiver.associatedRemoteMediaStreams.forEach(function (s) {
            var nativeTrack = s.getTracks().find(function (t) {
              return t.id === transceiver.rtpReceiver.track.id;
            });
            if (nativeTrack) {
              removeTrackFromStreamAndFireEvent(nativeTrack, s);
            }
          });
          transceiver.associatedRemoteMediaStreams = [];
        }
        transceiver.localCapabilities = localCapabilities;
        transceiver.remoteCapabilities = remoteCapabilities;
        transceiver.rtpReceiver = rtpReceiver;
        transceiver.rtcpParameters = rtcpParameters;
        transceiver.sendEncodingParameters = sendEncodingParameters;
        transceiver.recvEncodingParameters = recvEncodingParameters;

        // Start the RTCRtpReceiver now. The RTPSender is started in
        // setLocalDescription.
        pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
      } else if (description.type === 'answer' && !rejected) {
        transceiver = pc.transceivers[sdpMLineIndex];
        iceGatherer = transceiver.iceGatherer;
        iceTransport = transceiver.iceTransport;
        dtlsTransport = transceiver.dtlsTransport;
        rtpReceiver = transceiver.rtpReceiver;
        sendEncodingParameters = transceiver.sendEncodingParameters;
        localCapabilities = transceiver.localCapabilities;
        pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
        pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
        pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;
        if (cands.length && iceTransport.state === 'new') {
          if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
            iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function (candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }
        if (!usingBundle || sdpMLineIndex === 0) {
          if (iceTransport.state === 'new') {
            iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
          }
          if (dtlsTransport.state === 'new') {
            dtlsTransport.start(remoteDtlsParameters);
          }
        }

        // If the offer contained RTX but the answer did not,
        // remove RTX from sendEncodingParameters.
        var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
        var hasRtx = commonCapabilities.codecs.filter(function (c) {
          return c.name.toLowerCase() === 'rtx';
        }).length;
        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
          delete transceiver.sendEncodingParameters[0].rtx;
        }
        pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');

        // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
        if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
          track = rtpReceiver.track;
          if (remoteMsid) {
            if (!streams[remoteMsid.stream]) {
              streams[remoteMsid.stream] = new window.MediaStream();
            }
            addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
            receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
          } else {
            if (!streams.default) {
              streams.default = new window.MediaStream();
            }
            addTrackToStreamAndFireEvent(track, streams.default);
            receiverList.push([track, rtpReceiver, streams.default]);
          }
        } else {
          // FIXME: actually the receiver should be created later.
          delete transceiver.rtpReceiver;
        }
      }
    });
    if (pc._dtlsRole === undefined) {
      pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
    }
    pc._remoteDescription = {
      type: description.type,
      sdp: description.sdp
    };
    if (description.type === 'offer') {
      pc._updateSignalingState('have-remote-offer');
    } else {
      pc._updateSignalingState('stable');
    }
    Object.keys(streams).forEach(function (sid) {
      var stream = streams[sid];
      if (stream.getTracks().length) {
        if (pc.remoteStreams.indexOf(stream) === -1) {
          pc.remoteStreams.push(stream);
          var event = new Event('addstream');
          event.stream = stream;
          window.setTimeout(function () {
            pc._dispatchEvent('addstream', event);
          });
        }
        receiverList.forEach(function (item) {
          var track = item[0];
          var receiver = item[1];
          if (stream.id !== item[2].id) {
            return;
          }
          fireAddTrack(pc, track, receiver, [stream]);
        });
      }
    });
    receiverList.forEach(function (item) {
      if (item[2]) {
        return;
      }
      fireAddTrack(pc, item[0], item[1], []);
    });

    // check whether addIceCandidate({}) was called within four seconds after
    // setRemoteDescription.
    window.setTimeout(function () {
      if (!(pc && pc.transceivers)) {
        return;
      }
      pc.transceivers.forEach(function (transceiver) {
        if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
          console.warn('Timeout for addRemoteCandidate. Consider sending ' + 'an end-of-candidates notification');
          transceiver.iceTransport.addRemoteCandidate({});
        }
      });
    }, 4000);
    return Promise.resolve();
  };
  RTCPeerConnection.prototype.close = function () {
    this.transceivers.forEach(function (transceiver) {
      /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */
      if (transceiver.iceTransport) {
        transceiver.iceTransport.stop();
      }
      if (transceiver.dtlsTransport) {
        transceiver.dtlsTransport.stop();
      }
      if (transceiver.rtpSender) {
        transceiver.rtpSender.stop();
      }
      if (transceiver.rtpReceiver) {
        transceiver.rtpReceiver.stop();
      }
    });
    // FIXME: clean up tracks, local streams, remote streams, etc
    this._isClosed = true;
    this._updateSignalingState('closed');
  };

  // Update the signaling state.
  RTCPeerConnection.prototype._updateSignalingState = function (newState) {
    this.signalingState = newState;
    var event = new Event('signalingstatechange');
    this._dispatchEvent('signalingstatechange', event);
  };

  // Determine whether to fire the negotiationneeded event.
  RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
    var pc = this;
    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
      return;
    }
    this.needNegotiation = true;
    window.setTimeout(function () {
      if (pc.needNegotiation) {
        pc.needNegotiation = false;
        var event = new Event('negotiationneeded');
        pc._dispatchEvent('negotiationneeded', event);
      }
    }, 0);
  };

  // Update the ice connection state.
  RTCPeerConnection.prototype._updateIceConnectionState = function () {
    var newState;
    var states = {
      'new': 0,
      closed: 0,
      checking: 0,
      connected: 0,
      completed: 0,
      disconnected: 0,
      failed: 0
    };
    this.transceivers.forEach(function (transceiver) {
      if (transceiver.iceTransport && !transceiver.rejected) {
        states[transceiver.iceTransport.state]++;
      }
    });
    newState = 'new';
    if (states.failed > 0) {
      newState = 'failed';
    } else if (states.checking > 0) {
      newState = 'checking';
    } else if (states.disconnected > 0) {
      newState = 'disconnected';
    } else if (states.new > 0) {
      newState = 'new';
    } else if (states.connected > 0) {
      newState = 'connected';
    } else if (states.completed > 0) {
      newState = 'completed';
    }
    if (newState !== this.iceConnectionState) {
      this.iceConnectionState = newState;
      var event = new Event('iceconnectionstatechange');
      this._dispatchEvent('iceconnectionstatechange', event);
    }
  };

  // Update the connection state.
  RTCPeerConnection.prototype._updateConnectionState = function () {
    var newState;
    var states = {
      'new': 0,
      closed: 0,
      connecting: 0,
      connected: 0,
      completed: 0,
      disconnected: 0,
      failed: 0
    };
    this.transceivers.forEach(function (transceiver) {
      if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
        states[transceiver.iceTransport.state]++;
        states[transceiver.dtlsTransport.state]++;
      }
    });
    // ICETransport.completed and connected are the same for this purpose.
    states.connected += states.completed;
    newState = 'new';
    if (states.failed > 0) {
      newState = 'failed';
    } else if (states.connecting > 0) {
      newState = 'connecting';
    } else if (states.disconnected > 0) {
      newState = 'disconnected';
    } else if (states.new > 0) {
      newState = 'new';
    } else if (states.connected > 0) {
      newState = 'connected';
    }
    if (newState !== this.connectionState) {
      this.connectionState = newState;
      var event = new Event('connectionstatechange');
      this._dispatchEvent('connectionstatechange', event);
    }
  };
  RTCPeerConnection.prototype.createOffer = function () {
    var pc = this;
    if (pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
    }
    var numAudioTracks = pc.transceivers.filter(function (t) {
      return t.kind === 'audio';
    }).length;
    var numVideoTracks = pc.transceivers.filter(function (t) {
      return t.kind === 'video';
    }).length;

    // Determine number of audio and video tracks we need to send/recv.
    var offerOptions = arguments[0];
    if (offerOptions) {
      // Reject Chrome legacy constraints.
      if (offerOptions.mandatory || offerOptions.optional) {
        throw new TypeError('Legacy mandatory/optional constraints not supported.');
      }
      if (offerOptions.offerToReceiveAudio !== undefined) {
        if (offerOptions.offerToReceiveAudio === true) {
          numAudioTracks = 1;
        } else if (offerOptions.offerToReceiveAudio === false) {
          numAudioTracks = 0;
        } else {
          numAudioTracks = offerOptions.offerToReceiveAudio;
        }
      }
      if (offerOptions.offerToReceiveVideo !== undefined) {
        if (offerOptions.offerToReceiveVideo === true) {
          numVideoTracks = 1;
        } else if (offerOptions.offerToReceiveVideo === false) {
          numVideoTracks = 0;
        } else {
          numVideoTracks = offerOptions.offerToReceiveVideo;
        }
      }
    }
    pc.transceivers.forEach(function (transceiver) {
      if (transceiver.kind === 'audio') {
        numAudioTracks--;
        if (numAudioTracks < 0) {
          transceiver.wantReceive = false;
        }
      } else if (transceiver.kind === 'video') {
        numVideoTracks--;
        if (numVideoTracks < 0) {
          transceiver.wantReceive = false;
        }
      }
    });

    // Create M-lines for recvonly streams.
    while (numAudioTracks > 0 || numVideoTracks > 0) {
      if (numAudioTracks > 0) {
        pc._createTransceiver('audio');
        numAudioTracks--;
      }
      if (numVideoTracks > 0) {
        pc._createTransceiver('video');
        numVideoTracks--;
      }
    }
    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      // For each track, create an ice gatherer, ice transport,
      // dtls transport, potentially rtpsender and rtpreceiver.
      var track = transceiver.track;
      var kind = transceiver.kind;
      var mid = transceiver.mid || SDPUtils.generateIdentifier();
      transceiver.mid = mid;
      if (!transceiver.iceGatherer) {
        transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
      }
      var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
      // filter RTX until additional stuff needed for RTX is implemented
      // in adapter.js
      if (edgeVersion < 15019) {
        localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
          return codec.name !== 'rtx';
        });
      }
      localCapabilities.codecs.forEach(function (codec) {
        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
        // by adding level-asymmetry-allowed=1
        if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) {
          codec.parameters['level-asymmetry-allowed'] = '1';
        }

        // for subsequent offers, we might have to re-use the payload
        // type of the last offer.
        if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
          transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
            if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) {
              codec.preferredPayloadType = remoteCodec.payloadType;
            }
          });
        }
      });
      localCapabilities.headerExtensions.forEach(function (hdrExt) {
        var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
        remoteExtensions.forEach(function (rHdrExt) {
          if (hdrExt.uri === rHdrExt.uri) {
            hdrExt.id = rHdrExt.id;
          }
        });
      });

      // generate an ssrc now, to be used later in rtpSender.send
      var sendEncodingParameters = transceiver.sendEncodingParameters || [{
        ssrc: (2 * sdpMLineIndex + 1) * 1001
      }];
      if (track) {
        // add RTX
        if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) {
          sendEncodingParameters[0].rtx = {
            ssrc: sendEncodingParameters[0].ssrc + 1
          };
        }
      }
      if (transceiver.wantReceive) {
        transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
      }
      transceiver.localCapabilities = localCapabilities;
      transceiver.sendEncodingParameters = sendEncodingParameters;
    });

    // always offer BUNDLE and dispose on return if not supported.
    if (pc._config.bundlePolicy !== 'max-compat') {
      sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }
    sdp += 'a=ice-options:trickle\r\n';
    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
      sdp += 'a=rtcp-rsize\r\n';
      if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
        transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
          cand.component = 1;
          sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
        });
        if (transceiver.iceGatherer.state === 'completed') {
          sdp += 'a=end-of-candidates\r\n';
        }
      }
    });
    var desc = new window.RTCSessionDescription({
      type: 'offer',
      sdp: sdp
    });
    return Promise.resolve(desc);
  };
  RTCPeerConnection.prototype.createAnswer = function () {
    var pc = this;
    if (pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
    }
    if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) {
      return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
    }
    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
    if (pc.usingBundle) {
      sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }
    sdp += 'a=ice-options:trickle\r\n';
    var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
        return;
      }
      if (transceiver.rejected) {
        if (transceiver.kind === 'application') {
          if (transceiver.protocol === 'DTLS/SCTP') {
            // legacy fmt
            sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
          } else {
            sdp += 'm=application 0 ' + transceiver.protocol + ' webrtc-datachannel\r\n';
          }
        } else if (transceiver.kind === 'audio') {
          sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' + 'a=rtpmap:0 PCMU/8000\r\n';
        } else if (transceiver.kind === 'video') {
          sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' + 'a=rtpmap:120 VP8/90000\r\n';
        }
        sdp += 'c=IN IP4 0.0.0.0\r\n' + 'a=inactive\r\n' + 'a=mid:' + transceiver.mid + '\r\n';
        return;
      }

      // FIXME: look at direction.
      if (transceiver.stream) {
        var localTrack;
        if (transceiver.kind === 'audio') {
          localTrack = transceiver.stream.getAudioTracks()[0];
        } else if (transceiver.kind === 'video') {
          localTrack = transceiver.stream.getVideoTracks()[0];
        }
        if (localTrack) {
          // add RTX
          if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) {
            transceiver.sendEncodingParameters[0].rtx = {
              ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
            };
          }
        }
      }

      // Calculate intersection of capabilities.
      var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
      var hasRtx = commonCapabilities.codecs.filter(function (c) {
        return c.name.toLowerCase() === 'rtx';
      }).length;
      if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
        delete transceiver.sendEncodingParameters[0].rtx;
      }
      sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);
      if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
        sdp += 'a=rtcp-rsize\r\n';
      }
    });
    var desc = new window.RTCSessionDescription({
      type: 'answer',
      sdp: sdp
    });
    return Promise.resolve(desc);
  };
  RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
    var pc = this;
    var sections;
    if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
      return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
    }

    // TODO: needs to go into ops queue.
    return new Promise(function (resolve, reject) {
      if (!pc._remoteDescription) {
        return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
      } else if (!candidate || candidate.candidate === '') {
        for (var j = 0; j < pc.transceivers.length; j++) {
          if (pc.transceivers[j].rejected) {
            continue;
          }
          pc.transceivers[j].iceTransport.addRemoteCandidate({});
          sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
          sections[j] += 'a=end-of-candidates\r\n';
          pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
          if (pc.usingBundle) {
            break;
          }
        }
      } else {
        var sdpMLineIndex = candidate.sdpMLineIndex;
        if (candidate.sdpMid) {
          for (var i = 0; i < pc.transceivers.length; i++) {
            if (pc.transceivers[i].mid === candidate.sdpMid) {
              sdpMLineIndex = i;
              break;
            }
          }
        }
        var transceiver = pc.transceivers[sdpMLineIndex];
        if (transceiver) {
          if (transceiver.rejected) {
            return resolve();
          }
          var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
          // Ignore Chrome's invalid candidates since Edge does not like them.
          if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
            return resolve();
          }
          // Ignore RTCP candidates, we assume RTCP-MUX.
          if (cand.component && cand.component !== 1) {
            return resolve();
          }
          // when using bundle, avoid adding candidates to the wrong
          // ice transport. And avoid adding candidates added in the SDP.
          if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
            if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
              return reject(makeError('OperationError', 'Can not add ICE candidate'));
            }
          }

          // update the remoteDescription.
          var candidateString = candidate.candidate.trim();
          if (candidateString.indexOf('a=') === 0) {
            candidateString = candidateString.substr(2);
          }
          sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
          sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
          pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
        } else {
          return reject(makeError('OperationError', 'Can not add ICE candidate'));
        }
      }
      resolve();
    });
  };
  RTCPeerConnection.prototype.getStats = function (selector) {
    if (selector && selector instanceof window.MediaStreamTrack) {
      var senderOrReceiver = null;
      this.transceivers.forEach(function (transceiver) {
        if (transceiver.rtpSender && transceiver.rtpSender.track === selector) {
          senderOrReceiver = transceiver.rtpSender;
        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) {
          senderOrReceiver = transceiver.rtpReceiver;
        }
      });
      if (!senderOrReceiver) {
        throw makeError('InvalidAccessError', 'Invalid selector.');
      }
      return senderOrReceiver.getStats();
    }
    var promises = [];
    this.transceivers.forEach(function (transceiver) {
      ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
        if (transceiver[method]) {
          promises.push(transceiver[method].getStats());
        }
      });
    });
    return Promise.all(promises).then(function (allStats) {
      var results = new Map();
      allStats.forEach(function (stats) {
        stats.forEach(function (stat) {
          results.set(stat.id, stat);
        });
      });
      return results;
    });
  };

  // fix low-level stat names and return Map instead of object.
  var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer', 'RTCIceTransport', 'RTCDtlsTransport'];
  ortcObjects.forEach(function (ortcObjectName) {
    var obj = window[ortcObjectName];
    if (obj && obj.prototype && obj.prototype.getStats) {
      var nativeGetstats = obj.prototype.getStats;
      obj.prototype.getStats = function () {
        return nativeGetstats.apply(this).then(function (nativeStats) {
          var mapStats = new Map();
          Object.keys(nativeStats).forEach(function (id) {
            nativeStats[id].type = fixStatsType(nativeStats[id]);
            mapStats.set(id, nativeStats[id]);
          });
          return mapStats;
        });
      };
    }
  });

  // legacy callback shims. Should be moved to adapter.js some days.
  var methods = ['createOffer', 'createAnswer'];
  methods.forEach(function (method) {
    var nativeMethod = RTCPeerConnection.prototype[method];
    RTCPeerConnection.prototype[method] = function () {
      var args = arguments;
      if (typeof args[0] === 'function' || typeof args[1] === 'function') {
        // legacy
        return nativeMethod.apply(this, [arguments[2]]).then(function (description) {
          if (typeof args[0] === 'function') {
            args[0].apply(null, [description]);
          }
        }, function (error) {
          if (typeof args[1] === 'function') {
            args[1].apply(null, [error]);
          }
        });
      }
      return nativeMethod.apply(this, arguments);
    };
  });
  methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
  methods.forEach(function (method) {
    var nativeMethod = RTCPeerConnection.prototype[method];
    RTCPeerConnection.prototype[method] = function () {
      var args = arguments;
      if (typeof args[1] === 'function' || typeof args[2] === 'function') {
        // legacy
        return nativeMethod.apply(this, arguments).then(function () {
          if (typeof args[1] === 'function') {
            args[1].apply(null);
          }
        }, function (error) {
          if (typeof args[2] === 'function') {
            args[2].apply(null, [error]);
          }
        });
      }
      return nativeMethod.apply(this, arguments);
    };
  });

  // getStats is special. It doesn't have a spec legacy method yet we support
  // getStats(something, cb) without error callbacks.
  ['getStats'].forEach(function (method) {
    var nativeMethod = RTCPeerConnection.prototype[method];
    RTCPeerConnection.prototype[method] = function () {
      var args = arguments;
      if (typeof args[1] === 'function') {
        return nativeMethod.apply(this, arguments).then(function () {
          if (typeof args[1] === 'function') {
            args[1].apply(null);
          }
        });
      }
      return nativeMethod.apply(this, arguments);
    };
  });
  return RTCPeerConnection;
};

/***/ }),

/***/ 1130:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/observable/interval.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interval": () => (/* binding */ interval)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 6936);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer */ 8947);


function interval(period = 0, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  if (period < 0) {
    period = 0;
  }
  return (0,_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(period, period, scheduler);
}

/***/ }),

/***/ 2566:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/takeWhile.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "takeWhile": () => (/* binding */ takeWhile)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ 1944);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ 3945);


function takeWhile(predicate, inclusive = false) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)((source, subscriber) => {
    let index = 0;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, value => {
      const result = predicate(value, index++);
      (result || inclusive) && subscriber.next(value);
      !result && subscriber.complete();
    }));
  });
}

/***/ }),

/***/ 4038:
/*!*********************************!*\
  !*** ./node_modules/sdp/sdp.js ***!
  \*********************************/
/***/ ((module) => {

"use strict";
/* eslint-env node */


// SDP helpers.
var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function () {
  return Math.random().toString(36).substr(2, 10);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function (blob) {
  return blob.trim().split('\n').map(function (line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function (blob) {
  var parts = blob.split('\nm=');
  return parts.map(function (part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// returns the session description.
SDPUtils.getDescription = function (blob) {
  var sections = SDPUtils.splitSections(blob);
  return sections && sections[0];
};

// returns the individual media sections.
SDPUtils.getMediaSections = function (blob) {
  var sections = SDPUtils.splitSections(blob);
  sections.shift();
  return sections;
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function (blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function (line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function (line) {
  var parts;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }
  var candidate = {
    foundation: parts[0],
    component: parseInt(parts[1], 10),
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    address: parts[4],
    // address is an alias for ip.
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };
  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compability.
        candidate.usernameFragment = parts[i + 1];
        break;
      default:
        // extension handling, in particular ufrag
        candidate[parts[i]] = parts[i + 1];
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function (candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.address || candidate.ip);
  sdp.push(candidate.port);
  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress);
    sdp.push('rport');
    sdp.push(candidate.relatedPort);
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  if (candidate.usernameFragment || candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.usernameFragment || candidate.ufrag);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
SDPUtils.parseIceOptions = function (line) {
  return line.substr(14).split(' ');
};

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function (line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');
  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  // legacy alias, got renamed back to channels in ORTC.
  parsed.numChannels = parsed.channels;
  return parsed;
};

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function (codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  var channels = codec.channels || codec.numChannels || 1;
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
};

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function (line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1]
  };
};

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function (headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
};

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function (line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function (codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function (param) {
      if (codec.parameters[param]) {
        params.push(param + '=' + codec.parameters[param]);
      } else {
        params.push(param);
      }
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function (line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function (codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function (fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
    });
  }
  return lines;
};

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function (line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }
  return parts;
};
SDPUtils.parseSsrcGroup = function (line) {
  var parts = line.substr(13).split(' ');
  return {
    semantics: parts.shift(),
    ssrcs: parts.map(function (ssrc) {
      return parseInt(ssrc, 10);
    })
  };
};

// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
SDPUtils.getMid = function (mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
  if (mid) {
    return mid.substr(6);
  }
};
SDPUtils.parseFingerprint = function (line) {
  var parts = line.substr(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(),
    // algorithm is case-sensitive in Edge.
    value: parts[1]
  };
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
  // Note: a=setup line is ignored since we use the 'auto' role.
  // Note2: 'algorithm' is not case sensitive except in Edge.
  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function (params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function (fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};

// Parses a=crypto lines into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
SDPUtils.parseCryptoLine = function (line) {
  var parts = line.substr(9).split(' ');
  return {
    tag: parseInt(parts[0], 10),
    cryptoSuite: parts[1],
    keyParams: parts[2],
    sessionParams: parts.slice(3)
  };
};
SDPUtils.writeCryptoLine = function (parameters) {
  return 'a=crypto:' + parameters.tag + ' ' + parameters.cryptoSuite + ' ' + (typeof parameters.keyParams === 'object' ? SDPUtils.writeCryptoKeyParams(parameters.keyParams) : parameters.keyParams) + (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') + '\r\n';
};

// Parses the crypto key parameters into
//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
SDPUtils.parseCryptoKeyParams = function (keyParams) {
  if (keyParams.indexOf('inline:') !== 0) {
    return null;
  }
  var parts = keyParams.substr(7).split('|');
  return {
    keyMethod: 'inline',
    keySalt: parts[0],
    lifeTime: parts[1],
    mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
    mkiLength: parts[2] ? parts[2].split(':')[1] : undefined
  };
};
SDPUtils.writeCryptoKeyParams = function (keyParams) {
  return keyParams.keyMethod + ':' + keyParams.keySalt + (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') + (keyParams.mkiValue && keyParams.mkiLength ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength : '');
};

// Extracts all SDES paramters.
SDPUtils.getCryptoParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=crypto:');
  return lines.map(SDPUtils.parseCryptoLine);
};

// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
  var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-ufrag:')[0];
  var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=ice-pwd:')[0];
  if (!(ufrag && pwd)) {
    return null;
  }
  return {
    usernameFragment: ufrag.substr(12),
    password: pwd.substr(10)
  };
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function (params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function (mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  for (var i = 3; i < mline.length; i++) {
    // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default:
          // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function (kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function (codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';
  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function (codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function (codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });
  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }
  sdp += 'a=rtcp-mux\r\n';
  if (caps.headerExtensions) {
    caps.headerExtensions.forEach(function (extension) {
      sdp += SDPUtils.writeExtmap(extension);
    });
  }
  // FIXME: write fecMechanisms.
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;
  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
    var parts = line.substr(17).split(' ');
    return parts.map(function (part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }
  description.codecs.forEach(function (codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10)
      };
      if (primarySsrc && secondarySsrc) {
        encParam.rtx = {
          ssrc: secondarySsrc
        };
      }
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: primarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
    } else {
      bandwidth = undefined;
    }
    encodingParameters.forEach(function (params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

// parses http://draft.ortc.org/#rtcrtcpparameters*
SDPUtils.parseRtcpParameters = function (mediaSection) {
  var rtcpParameters = {};

  // Gets the first SSRC. Note tha with RTX there might be multiple
  // SSRCs.
  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (obj) {
    return obj.attribute === 'cname';
  })[0];
  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  }

  // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize
  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0;

  // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.
  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;
  return rtcpParameters;
};

// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
SDPUtils.parseMsid = function (mediaSection) {
  var parts;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
  if (spec.length === 1) {
    parts = spec[0].substr(7).split(' ');
    return {
      stream: parts[0],
      track: parts[1]
    };
  }
  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (msidParts) {
    return msidParts.attribute === 'msid';
  });
  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return {
      stream: parts[0],
      track: parts[1]
    };
  }
};

// SCTP
// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
// to draft-ietf-mmusic-sctp-sdp-05
SDPUtils.parseSctpDescription = function (mediaSection) {
  var mline = SDPUtils.parseMLine(mediaSection);
  var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
  var maxMessageSize;
  if (maxSizeLine.length > 0) {
    maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
  }
  if (isNaN(maxMessageSize)) {
    maxMessageSize = 65536;
  }
  var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
  if (sctpPort.length > 0) {
    return {
      port: parseInt(sctpPort[0].substr(12), 10),
      protocol: mline.fmt,
      maxMessageSize: maxMessageSize
    };
  }
  var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
  if (sctpMapLines.length > 0) {
    var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0].substr(10).split(' ');
    return {
      port: parseInt(parts[0], 10),
      protocol: parts[1],
      maxMessageSize: maxMessageSize
    };
  }
};

// SCTP
// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
// support by now receiving in this format, unless we originally parsed
// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
// protocol of DTLS/SCTP -- without UDP/ or TCP/)
SDPUtils.writeSctpDescription = function (media, sctp) {
  var output = [];
  if (media.protocol !== 'DTLS/SCTP') {
    output = ['m=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctp-port:' + sctp.port + '\r\n'];
  } else {
    output = ['m=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'];
  }
  if (sctp.maxMessageSize !== undefined) {
    output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
  }
  return output.join('');
};

// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
SDPUtils.generateSessionId = function () {
  return Math.random().toString().substr(2, 21);
};

// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'
SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
  var sessionId;
  var version = sessVer !== undefined ? sessVer : 2;
  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }
  var user = sessUser || 'thisisadapterortc';
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
};
SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');
  sdp += 'a=mid:' + transceiver.mid + '\r\n';
  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }
  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;

    // for Chrome.
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
      sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
    }
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  }
  return sdp;
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function (mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);
      default:
      // FIXME: What should happen here?
    }
  }

  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};
SDPUtils.getKind = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substr(2);
};
SDPUtils.isRejected = function (mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};
SDPUtils.parseMLine = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var parts = lines[0].substr(2).split(' ');
  return {
    kind: parts[0],
    port: parseInt(parts[1], 10),
    protocol: parts[2],
    fmt: parts.slice(3).join(' ')
  };
};
SDPUtils.parseOLine = function (mediaSection) {
  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
  var parts = line.substr(2).split(' ');
  return {
    username: parts[0],
    sessionId: parts[1],
    sessionVersion: parseInt(parts[2], 10),
    netType: parts[3],
    addressType: parts[4],
    address: parts[5]
  };
};

// a very naive interpretation of a valid SDP.
SDPUtils.isValidSDP = function (blob) {
  if (typeof blob !== 'string' || blob.length === 0) {
    return false;
  }
  var lines = SDPUtils.splitLines(blob);
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
      return false;
    }
    // TODO: check the modifier a bit more.
  }

  return true;
};

// Expose public methods.
if (true) {
  module.exports = SDPUtils;
}

/***/ }),

/***/ 3588:
/*!************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/adapter_core.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _adapter_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapter_factory.js */ 2576);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */




const adapter = (0,_adapter_factory_js__WEBPACK_IMPORTED_MODULE_0__.adapterFactory)({
  window: typeof window === 'undefined' ? undefined : window
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adapter);

/***/ }),

/***/ 2576:
/*!***************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/adapter_factory.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adapterFactory": () => (/* binding */ adapterFactory)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ 8328);
/* harmony import */ var _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chrome/chrome_shim */ 4103);
/* harmony import */ var _edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edge/edge_shim */ 6792);
/* harmony import */ var _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./firefox/firefox_shim */ 5196);
/* harmony import */ var _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./safari/safari_shim */ 8795);
/* harmony import */ var _common_shim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common_shim */ 8191);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */


// Browser shims.






// Shimming starts here.
function adapterFactory({
  window
} = {}, options = {
  shimChrome: true,
  shimFirefox: true,
  shimEdge: true,
  shimSafari: true
}) {
  // Utils.
  const logging = _utils__WEBPACK_IMPORTED_MODULE_0__.log;
  const browserDetails = _utils__WEBPACK_IMPORTED_MODULE_0__.detectBrowser(window);
  const adapter = {
    browserDetails,
    commonShim: _common_shim__WEBPACK_IMPORTED_MODULE_5__,
    extractVersion: _utils__WEBPACK_IMPORTED_MODULE_0__.extractVersion,
    disableLog: _utils__WEBPACK_IMPORTED_MODULE_0__.disableLog,
    disableWarnings: _utils__WEBPACK_IMPORTED_MODULE_0__.disableWarnings
  };

  // Shim browser if found.
  switch (browserDetails.browser) {
    case 'chrome':
      if (!_chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__ || !_chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimPeerConnection || !options.shimChrome) {
        logging('Chrome shim is not included in this adapter release.');
        return adapter;
      }
      if (browserDetails.version === null) {
        logging('Chrome shim can not determine version, not shimming.');
        return adapter;
      }
      logging('adapter.js shimming chrome.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__;

      // Must be called before shimPeerConnection.
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimAddIceCandidateNullOrEmpty(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimGetUserMedia(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimMediaStream(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimPeerConnection(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimOnTrack(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimAddTrackRemoveTrack(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimGetSendersWithDtmf(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimGetStats(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.shimSenderReceiverGetStats(window, browserDetails);
      _chrome_chrome_shim__WEBPACK_IMPORTED_MODULE_1__.fixNegotiationNeeded(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimRTCIceCandidate(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimConnectionState(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimMaxMessageSize(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimSendThrowTypeError(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.removeExtmapAllowMixed(window, browserDetails);
      break;
    case 'firefox':
      if (!_firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__ || !_firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimPeerConnection || !options.shimFirefox) {
        logging('Firefox shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming firefox.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__;

      // Must be called before shimPeerConnection.
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimAddIceCandidateNullOrEmpty(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimGetUserMedia(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimPeerConnection(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimOnTrack(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimRemoveStream(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimSenderGetStats(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimReceiverGetStats(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimRTCDataChannel(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimAddTransceiver(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimGetParameters(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimCreateOffer(window, browserDetails);
      _firefox_firefox_shim__WEBPACK_IMPORTED_MODULE_3__.shimCreateAnswer(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimRTCIceCandidate(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimConnectionState(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimMaxMessageSize(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimSendThrowTypeError(window, browserDetails);
      break;
    case 'edge':
      if (!_edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__ || !_edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__.shimPeerConnection || !options.shimEdge) {
        logging('MS edge shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming edge.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = _edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__;
      _edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__.shimGetUserMedia(window, browserDetails);
      _edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__.shimGetDisplayMedia(window, browserDetails);
      _edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__.shimPeerConnection(window, browserDetails);
      _edge_edge_shim__WEBPACK_IMPORTED_MODULE_2__.shimReplaceTrack(window, browserDetails);

      // the edge shim implements the full RTCIceCandidate object.

      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimMaxMessageSize(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimSendThrowTypeError(window, browserDetails);
      break;
    case 'safari':
      if (!_safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__ || !options.shimSafari) {
        logging('Safari shim is not included in this adapter release.');
        return adapter;
      }
      logging('adapter.js shimming safari.');
      // Export to the adapter global object visible in the browser.
      adapter.browserShim = _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__;

      // Must be called before shimCallbackAPI.
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimAddIceCandidateNullOrEmpty(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimRTCIceServerUrls(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimCreateOfferLegacy(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimCallbacksAPI(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimLocalStreamsAPI(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimRemoteStreamsAPI(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimTrackEventTransceiver(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimGetUserMedia(window, browserDetails);
      _safari_safari_shim__WEBPACK_IMPORTED_MODULE_4__.shimAudioContext(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimRTCIceCandidate(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimMaxMessageSize(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.shimSendThrowTypeError(window, browserDetails);
      _common_shim__WEBPACK_IMPORTED_MODULE_5__.removeExtmapAllowMixed(window, browserDetails);
      break;
    default:
      logging('Unsupported browser!');
      break;
  }
  return adapter;
}

/***/ }),

/***/ 4103:
/*!******************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/chrome/chrome_shim.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fixNegotiationNeeded": () => (/* binding */ fixNegotiationNeeded),
/* harmony export */   "shimAddTrackRemoveTrack": () => (/* binding */ shimAddTrackRemoveTrack),
/* harmony export */   "shimAddTrackRemoveTrackWithNative": () => (/* binding */ shimAddTrackRemoveTrackWithNative),
/* harmony export */   "shimGetDisplayMedia": () => (/* reexport safe */ _getdisplaymedia__WEBPACK_IMPORTED_MODULE_2__.shimGetDisplayMedia),
/* harmony export */   "shimGetSendersWithDtmf": () => (/* binding */ shimGetSendersWithDtmf),
/* harmony export */   "shimGetStats": () => (/* binding */ shimGetStats),
/* harmony export */   "shimGetUserMedia": () => (/* reexport safe */ _getusermedia__WEBPACK_IMPORTED_MODULE_1__.shimGetUserMedia),
/* harmony export */   "shimMediaStream": () => (/* binding */ shimMediaStream),
/* harmony export */   "shimOnTrack": () => (/* binding */ shimOnTrack),
/* harmony export */   "shimPeerConnection": () => (/* binding */ shimPeerConnection),
/* harmony export */   "shimSenderReceiverGetStats": () => (/* binding */ shimSenderReceiverGetStats)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ 8328);
/* harmony import */ var _getusermedia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getusermedia */ 4897);
/* harmony import */ var _getdisplaymedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getdisplaymedia */ 4695);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */





function shimMediaStream(window) {
  window.MediaStream = window.MediaStream || window.webkitMediaStream;
}
function shimOnTrack(window) {
  if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
      get() {
        return this._ontrack;
      },
      set(f) {
        if (this._ontrack) {
          this.removeEventListener('track', this._ontrack);
        }
        this.addEventListener('track', this._ontrack = f);
      },
      enumerable: true,
      configurable: true
    });
    const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      if (!this._ontrackpoly) {
        this._ontrackpoly = e => {
          // onaddstream does not fire when a track is added to an existing
          // stream. But stream.onaddtrack is implemented so we use that.
          e.stream.addEventListener('addtrack', te => {
            let receiver;
            if (window.RTCPeerConnection.prototype.getReceivers) {
              receiver = this.getReceivers().find(r => r.track && r.track.id === te.track.id);
            } else {
              receiver = {
                track: te.track
              };
            }
            const event = new Event('track');
            event.track = te.track;
            event.receiver = receiver;
            event.transceiver = {
              receiver
            };
            event.streams = [e.stream];
            this.dispatchEvent(event);
          });
          e.stream.getTracks().forEach(track => {
            let receiver;
            if (window.RTCPeerConnection.prototype.getReceivers) {
              receiver = this.getReceivers().find(r => r.track && r.track.id === track.id);
            } else {
              receiver = {
                track
              };
            }
            const event = new Event('track');
            event.track = track;
            event.receiver = receiver;
            event.transceiver = {
              receiver
            };
            event.streams = [e.stream];
            this.dispatchEvent(event);
          });
        };
        this.addEventListener('addstream', this._ontrackpoly);
      }
      return origSetRemoteDescription.apply(this, arguments);
    };
  } else {
    // even if RTCRtpTransceiver is in window, it is only used and
    // emitted in unified-plan. Unfortunately this means we need
    // to unconditionally wrap the event.
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapPeerConnectionEvent(window, 'track', e => {
      if (!e.transceiver) {
        Object.defineProperty(e, 'transceiver', {
          value: {
            receiver: e.receiver
          }
        });
      }
      return e;
    });
  }
}
function shimGetSendersWithDtmf(window) {
  // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
  if (typeof window === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
    const shimSenderWithDtmf = function (pc, track) {
      return {
        track,
        get dtmf() {
          if (this._dtmf === undefined) {
            if (track.kind === 'audio') {
              this._dtmf = pc.createDTMFSender(track);
            } else {
              this._dtmf = null;
            }
          }
          return this._dtmf;
        },
        _pc: pc
      };
    };

    // augment addTrack when getSenders is not available.
    if (!window.RTCPeerConnection.prototype.getSenders) {
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        this._senders = this._senders || [];
        return this._senders.slice(); // return a copy of the internal state.
      };

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
        let sender = origAddTrack.apply(this, arguments);
        if (!sender) {
          sender = shimSenderWithDtmf(this, track);
          this._senders.push(sender);
        }
        return sender;
      };
      const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
      window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
        origRemoveTrack.apply(this, arguments);
        const idx = this._senders.indexOf(sender);
        if (idx !== -1) {
          this._senders.splice(idx, 1);
        }
      };
    }
    const origAddStream = window.RTCPeerConnection.prototype.addStream;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      this._senders = this._senders || [];
      origAddStream.apply(this, [stream]);
      stream.getTracks().forEach(track => {
        this._senders.push(shimSenderWithDtmf(this, track));
      });
    };
    const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      this._senders = this._senders || [];
      origRemoveStream.apply(this, [stream]);
      stream.getTracks().forEach(track => {
        const sender = this._senders.find(s => s.track === track);
        if (sender) {
          // remove sender
          this._senders.splice(this._senders.indexOf(sender), 1);
        }
      });
    };
  } else if (typeof window === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
      const senders = origGetSenders.apply(this, []);
      senders.forEach(sender => sender._pc = this);
      return senders;
    };
    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
      get() {
        if (this._dtmf === undefined) {
          if (this.track.kind === 'audio') {
            this._dtmf = this._pc.createDTMFSender(this.track);
          } else {
            this._dtmf = null;
          }
        }
        return this._dtmf;
      }
    });
  }
}
function shimGetStats(window) {
  if (!window.RTCPeerConnection) {
    return;
  }
  const origGetStats = window.RTCPeerConnection.prototype.getStats;
  window.RTCPeerConnection.prototype.getStats = function getStats() {
    const [selector, onSucc, onErr] = arguments;

    // If selector is a function then we are in the old style stats so just
    // pass back the original getStats format to avoid breaking old users.
    if (arguments.length > 0 && typeof selector === 'function') {
      return origGetStats.apply(this, arguments);
    }

    // When spec-style getStats is supported, return those when called with
    // either no arguments or the selector argument is null.
    if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
      return origGetStats.apply(this, []);
    }
    const fixChromeStats_ = function (response) {
      const standardReport = {};
      const reports = response.result();
      reports.forEach(report => {
        const standardStats = {
          id: report.id,
          timestamp: report.timestamp,
          type: {
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          }[report.type] || report.type
        };
        report.names().forEach(name => {
          standardStats[name] = report.stat(name);
        });
        standardReport[standardStats.id] = standardStats;
      });
      return standardReport;
    };

    // shim getStats with maplike support
    const makeMapStats = function (stats) {
      return new Map(Object.keys(stats).map(key => [key, stats[key]]));
    };
    if (arguments.length >= 2) {
      const successCallbackWrapper_ = function (response) {
        onSucc(makeMapStats(fixChromeStats_(response)));
      };
      return origGetStats.apply(this, [successCallbackWrapper_, selector]);
    }

    // promise-support
    return new Promise((resolve, reject) => {
      origGetStats.apply(this, [function (response) {
        resolve(makeMapStats(fixChromeStats_(response)));
      }, reject]);
    }).then(onSucc, onErr);
  };
}
function shimSenderReceiverGetStats(window) {
  if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
    return;
  }

  // shim sender stats.
  if (!('getStats' in window.RTCRtpSender.prototype)) {
    const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
    if (origGetSenders) {
      window.RTCPeerConnection.prototype.getSenders = function getSenders() {
        const senders = origGetSenders.apply(this, []);
        senders.forEach(sender => sender._pc = this);
        return senders;
      };
    }
    const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
    if (origAddTrack) {
      window.RTCPeerConnection.prototype.addTrack = function addTrack() {
        const sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }
    window.RTCRtpSender.prototype.getStats = function getStats() {
      const sender = this;
      return this._pc.getStats().then(result =>
      /* Note: this will include stats of all senders that
       *   send a track with the same id as sender.track as
       *   it is not possible to identify the RTCRtpSender.
       */
      _utils_js__WEBPACK_IMPORTED_MODULE_0__.filterStats(result, sender.track, true));
    };
  }

  // shim receiver stats.
  if (!('getStats' in window.RTCRtpReceiver.prototype)) {
    const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
    if (origGetReceivers) {
      window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
        const receivers = origGetReceivers.apply(this, []);
        receivers.forEach(receiver => receiver._pc = this);
        return receivers;
      };
    }
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapPeerConnectionEvent(window, 'track', e => {
      e.receiver._pc = e.srcElement;
      return e;
    });
    window.RTCRtpReceiver.prototype.getStats = function getStats() {
      const receiver = this;
      return this._pc.getStats().then(result => _utils_js__WEBPACK_IMPORTED_MODULE_0__.filterStats(result, receiver.track, false));
    };
  }
  if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
    return;
  }

  // shim RTCPeerConnection.getStats(track).
  const origGetStats = window.RTCPeerConnection.prototype.getStats;
  window.RTCPeerConnection.prototype.getStats = function getStats() {
    if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
      const track = arguments[0];
      let sender;
      let receiver;
      let err;
      this.getSenders().forEach(s => {
        if (s.track === track) {
          if (sender) {
            err = true;
          } else {
            sender = s;
          }
        }
      });
      this.getReceivers().forEach(r => {
        if (r.track === track) {
          if (receiver) {
            err = true;
          } else {
            receiver = r;
          }
        }
        return r.track === track;
      });
      if (err || sender && receiver) {
        return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
      } else if (sender) {
        return sender.getStats();
      } else if (receiver) {
        return receiver.getStats();
      }
      return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
    }
    return origGetStats.apply(this, arguments);
  };
}
function shimAddTrackRemoveTrackWithNative(window) {
  // shim addTrack/removeTrack with native variants in order to make
  // the interactions with legacy getLocalStreams behave as in other browsers.
  // Keeps a mapping stream.id => [stream, rtpsenders...]
  window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    return Object.keys(this._shimmedLocalStreams).map(streamId => this._shimmedLocalStreams[streamId][0]);
  };
  const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
  window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
    if (!stream) {
      return origAddTrack.apply(this, arguments);
    }
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    const sender = origAddTrack.apply(this, arguments);
    if (!this._shimmedLocalStreams[stream.id]) {
      this._shimmedLocalStreams[stream.id] = [stream, sender];
    } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
      this._shimmedLocalStreams[stream.id].push(sender);
    }
    return sender;
  };
  const origAddStream = window.RTCPeerConnection.prototype.addStream;
  window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    stream.getTracks().forEach(track => {
      const alreadyExists = this.getSenders().find(s => s.track === track);
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
    });
    const existingSenders = this.getSenders();
    origAddStream.apply(this, arguments);
    const newSenders = this.getSenders().filter(newSender => existingSenders.indexOf(newSender) === -1);
    this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
  };
  const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
  window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    delete this._shimmedLocalStreams[stream.id];
    return origRemoveStream.apply(this, arguments);
  };
  const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
  window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    if (sender) {
      Object.keys(this._shimmedLocalStreams).forEach(streamId => {
        const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
        if (idx !== -1) {
          this._shimmedLocalStreams[streamId].splice(idx, 1);
        }
        if (this._shimmedLocalStreams[streamId].length === 1) {
          delete this._shimmedLocalStreams[streamId];
        }
      });
    }
    return origRemoveTrack.apply(this, arguments);
  };
}
function shimAddTrackRemoveTrack(window, browserDetails) {
  if (!window.RTCPeerConnection) {
    return;
  }
  // shim addTrack and removeTrack.
  if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
    return shimAddTrackRemoveTrackWithNative(window);
  }

  // also shim pc.getLocalStreams when addTrack is shimmed
  // to return the original streams.
  const origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
  window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
    const nativeStreams = origGetLocalStreams.apply(this);
    this._reverseStreams = this._reverseStreams || {};
    return nativeStreams.map(stream => this._reverseStreams[stream.id]);
  };
  const origAddStream = window.RTCPeerConnection.prototype.addStream;
  window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    stream.getTracks().forEach(track => {
      const alreadyExists = this.getSenders().find(s => s.track === track);
      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
    });
    // Add identity mapping for consistency with addTrack.
    // Unless this is being used with a stream from addTrack.
    if (!this._reverseStreams[stream.id]) {
      const newStream = new window.MediaStream(stream.getTracks());
      this._streams[stream.id] = newStream;
      this._reverseStreams[newStream.id] = stream;
      stream = newStream;
    }
    origAddStream.apply(this, [stream]);
  };
  const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
  window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
    delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
    delete this._streams[stream.id];
  };
  window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
    if (this.signalingState === 'closed') {
      throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
    }
    const streams = [].slice.call(arguments, 1);
    if (streams.length !== 1 || !streams[0].getTracks().find(t => t === track)) {
      // this is not fully correct but all we can manage without
      // [[associated MediaStreams]] internal slot.
      throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
    }
    const alreadyExists = this.getSenders().find(s => s.track === track);
    if (alreadyExists) {
      throw new DOMException('Track already exists.', 'InvalidAccessError');
    }
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    const oldStream = this._streams[stream.id];
    if (oldStream) {
      // this is using odd Chrome behaviour, use with caution:
      // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
      // Note: we rely on the high-level addTrack/dtmf shim to
      // create the sender with a dtmf sender.
      oldStream.addTrack(track);

      // Trigger ONN async.
      Promise.resolve().then(() => {
        this.dispatchEvent(new Event('negotiationneeded'));
      });
    } else {
      const newStream = new window.MediaStream([track]);
      this._streams[stream.id] = newStream;
      this._reverseStreams[newStream.id] = stream;
      this.addStream(newStream);
    }
    return this.getSenders().find(s => s.track === track);
  };

  // replace the internal stream id with the external one and
  // vice versa.
  function replaceInternalStreamId(pc, description) {
    let sdp = description.sdp;
    Object.keys(pc._reverseStreams || []).forEach(internalId => {
      const externalStream = pc._reverseStreams[internalId];
      const internalStream = pc._streams[externalStream.id];
      sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
    });
    return new RTCSessionDescription({
      type: description.type,
      sdp
    });
  }
  function replaceExternalStreamId(pc, description) {
    let sdp = description.sdp;
    Object.keys(pc._reverseStreams || []).forEach(internalId => {
      const externalStream = pc._reverseStreams[internalId];
      const internalStream = pc._streams[externalStream.id];
      sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
    });
    return new RTCSessionDescription({
      type: description.type,
      sdp
    });
  }
  ['createOffer', 'createAnswer'].forEach(function (method) {
    const nativeMethod = window.RTCPeerConnection.prototype[method];
    const methodObj = {
      [method]() {
        const args = arguments;
        const isLegacyCall = arguments.length && typeof arguments[0] === 'function';
        if (isLegacyCall) {
          return nativeMethod.apply(this, [description => {
            const desc = replaceInternalStreamId(this, description);
            args[0].apply(null, [desc]);
          }, err => {
            if (args[1]) {
              args[1].apply(null, err);
            }
          }, arguments[2]]);
        }
        return nativeMethod.apply(this, arguments).then(description => replaceInternalStreamId(this, description));
      }
    };
    window.RTCPeerConnection.prototype[method] = methodObj[method];
  });
  const origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
  window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
    if (!arguments.length || !arguments[0].type) {
      return origSetLocalDescription.apply(this, arguments);
    }
    arguments[0] = replaceExternalStreamId(this, arguments[0]);
    return origSetLocalDescription.apply(this, arguments);
  };

  // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

  const origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
  Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
    get() {
      const description = origLocalDescription.get.apply(this);
      if (description.type === '') {
        return description;
      }
      return replaceInternalStreamId(this, description);
    }
  });
  window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
    if (this.signalingState === 'closed') {
      throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
    }
    // We can not yet check for sender instanceof RTCRtpSender
    // since we shim RTPSender. So we check if sender._pc is set.
    if (!sender._pc) {
      throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
    }
    const isLocal = sender._pc === this;
    if (!isLocal) {
      throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
    }

    // Search for the native stream the senders track belongs to.
    this._streams = this._streams || {};
    let stream;
    Object.keys(this._streams).forEach(streamid => {
      const hasTrack = this._streams[streamid].getTracks().find(track => sender.track === track);
      if (hasTrack) {
        stream = this._streams[streamid];
      }
    });
    if (stream) {
      if (stream.getTracks().length === 1) {
        // if this is the last track of the stream, remove the stream. This
        // takes care of any shimmed _senders.
        this.removeStream(this._reverseStreams[stream.id]);
      } else {
        // relying on the same odd chrome behaviour as above.
        stream.removeTrack(sender.track);
      }
      this.dispatchEvent(new Event('negotiationneeded'));
    }
  };
}
function shimPeerConnection(window, browserDetails) {
  if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
    // very basic support for old versions.
    window.RTCPeerConnection = window.webkitRTCPeerConnection;
  }
  if (!window.RTCPeerConnection) {
    return;
  }

  // shim implicit creation of RTCSessionDescription/RTCIceCandidate
  if (browserDetails.version < 53) {
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      const nativeMethod = window.RTCPeerConnection.prototype[method];
      const methodObj = {
        [method]() {
          arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
          return nativeMethod.apply(this, arguments);
        }
      };
      window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
  }
}

// Attempt to fix ONN in plan-b mode.
function fixNegotiationNeeded(window, browserDetails) {
  _utils_js__WEBPACK_IMPORTED_MODULE_0__.wrapPeerConnectionEvent(window, 'negotiationneeded', e => {
    const pc = e.target;
    if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
      if (pc.signalingState !== 'stable') {
        return;
      }
    }
    return e;
  });
}

/***/ }),

/***/ 4695:
/*!**********************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/chrome/getdisplaymedia.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetDisplayMedia": () => (/* binding */ shimGetDisplayMedia)
/* harmony export */ });
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */


function shimGetDisplayMedia(window, getSourceId) {
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }
  if (!window.navigator.mediaDevices) {
    return;
  }
  // getSourceId is a function that returns a promise resolving with
  // the sourceId of the screen/window/tab to be shared.
  if (typeof getSourceId !== 'function') {
    console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
    return;
  }
  window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
    return getSourceId(constraints).then(sourceId => {
      const widthSpecified = constraints.video && constraints.video.width;
      const heightSpecified = constraints.video && constraints.video.height;
      const frameRateSpecified = constraints.video && constraints.video.frameRate;
      constraints.video = {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          maxFrameRate: frameRateSpecified || 3
        }
      };
      if (widthSpecified) {
        constraints.video.mandatory.maxWidth = widthSpecified;
      }
      if (heightSpecified) {
        constraints.video.mandatory.maxHeight = heightSpecified;
      }
      return window.navigator.mediaDevices.getUserMedia(constraints);
    });
  };
}

/***/ }),

/***/ 4897:
/*!*******************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/chrome/getusermedia.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetUserMedia": () => (/* binding */ shimGetUserMedia)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ 8328);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */



const logging = _utils_js__WEBPACK_IMPORTED_MODULE_0__.log;
function shimGetUserMedia(window, browserDetails) {
  const navigator = window && window.navigator;
  if (!navigator.mediaDevices) {
    return;
  }
  const constraintsToChrome_ = function (c) {
    if (typeof c !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    const cc = {};
    Object.keys(c).forEach(key => {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      const r = typeof c[key] === 'object' ? c[key] : {
        ideal: c[key]
      };
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      const oldname_ = function (prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return name === 'deviceId' ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        let oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname_('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname_('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname_('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname_('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(mix => {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };
  const shimConstraints_ = function (constraints, func) {
    if (browserDetails.version >= 61) {
      return func(constraints);
    }
    constraints = JSON.parse(JSON.stringify(constraints));
    if (constraints && typeof constraints.audio === 'object') {
      const remap = function (obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };
      constraints = JSON.parse(JSON.stringify(constraints));
      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
      constraints.audio = constraintsToChrome_(constraints.audio);
    }
    if (constraints && typeof constraints.video === 'object') {
      // Shim facingMode for mobile & surface pro.
      let face = constraints.video.facingMode;
      face = face && (typeof face === 'object' ? face : {
        ideal: face
      });
      const getSupportedFacingModeLies = browserDetails.version < 66;
      if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
        delete constraints.video.facingMode;
        let matches;
        if (face.exact === 'environment' || face.ideal === 'environment') {
          matches = ['back', 'rear'];
        } else if (face.exact === 'user' || face.ideal === 'user') {
          matches = ['front'];
        }
        if (matches) {
          // Look for matches in label, or use last cam for back (typical).
          return navigator.mediaDevices.enumerateDevices().then(devices => {
            devices = devices.filter(d => d.kind === 'videoinput');
            let dev = devices.find(d => matches.some(match => d.label.toLowerCase().includes(match)));
            if (!dev && devices.length && matches.includes('back')) {
              dev = devices[devices.length - 1]; // more likely the back cam
            }

            if (dev) {
              constraints.video.deviceId = face.exact ? {
                exact: dev.deviceId
              } : {
                ideal: dev.deviceId
              };
            }
            constraints.video = constraintsToChrome_(constraints.video);
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          });
        }
      }
      constraints.video = constraintsToChrome_(constraints.video);
    }
    logging('chrome: ' + JSON.stringify(constraints));
    return func(constraints);
  };
  const shimError_ = function (e) {
    if (browserDetails.version >= 64) {
      return e;
    }
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError',
        PermissionDismissedError: 'NotAllowedError',
        InvalidStateError: 'NotAllowedError',
        DevicesNotFoundError: 'NotFoundError',
        ConstraintNotSatisfiedError: 'OverconstrainedError',
        TrackStartError: 'NotReadableError',
        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
        MediaDeviceKillSwitchOn: 'NotAllowedError',
        TabCaptureError: 'AbortError',
        ScreenCaptureError: 'AbortError',
        DeviceCaptureError: 'AbortError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraint || e.constraintName,
      toString() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };
  const getUserMedia_ = function (constraints, onSuccess, onError) {
    shimConstraints_(constraints, c => {
      navigator.webkitGetUserMedia(c, onSuccess, e => {
        if (onError) {
          onError(shimError_(e));
        }
      });
    });
  };
  navigator.getUserMedia = getUserMedia_.bind(navigator);

  // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
  // function which returns a Promise, it does not accept spec-style
  // constraints.
  if (navigator.mediaDevices.getUserMedia) {
    const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (cs) {
      return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
        if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
          stream.getTracks().forEach(track => {
            track.stop();
          });
          throw new DOMException('', 'NotFoundError');
        }
        return stream;
      }, e => Promise.reject(shimError_(e))));
    };
  }
}

/***/ }),

/***/ 8191:
/*!***********************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/common_shim.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeExtmapAllowMixed": () => (/* binding */ removeExtmapAllowMixed),
/* harmony export */   "shimAddIceCandidateNullOrEmpty": () => (/* binding */ shimAddIceCandidateNullOrEmpty),
/* harmony export */   "shimConnectionState": () => (/* binding */ shimConnectionState),
/* harmony export */   "shimMaxMessageSize": () => (/* binding */ shimMaxMessageSize),
/* harmony export */   "shimRTCIceCandidate": () => (/* binding */ shimRTCIceCandidate),
/* harmony export */   "shimSendThrowTypeError": () => (/* binding */ shimSendThrowTypeError)
/* harmony export */ });
/* harmony import */ var sdp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sdp */ 4038);
/* harmony import */ var sdp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sdp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ 8328);
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */




function shimRTCIceCandidate(window) {
  // foundation is arbitrarily chosen as an indicator for full support for
  // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
  if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
    return;
  }
  const NativeRTCIceCandidate = window.RTCIceCandidate;
  window.RTCIceCandidate = function RTCIceCandidate(args) {
    // Remove the a= which shouldn't be part of the candidate string.
    if (typeof args === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
      args = JSON.parse(JSON.stringify(args));
      args.candidate = args.candidate.substr(2);
    }
    if (args.candidate && args.candidate.length) {
      // Augment the native candidate with the parsed fields.
      const nativeCandidate = new NativeRTCIceCandidate(args);
      const parsedCandidate = sdp__WEBPACK_IMPORTED_MODULE_0___default().parseCandidate(args.candidate);
      const augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);

      // Add a serializer that does not serialize the extra attributes.
      augmentedCandidate.toJSON = function toJSON() {
        return {
          candidate: augmentedCandidate.candidate,
          sdpMid: augmentedCandidate.sdpMid,
          sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
          usernameFragment: augmentedCandidate.usernameFragment
        };
      };
      return augmentedCandidate;
    }
    return new NativeRTCIceCandidate(args);
  };
  window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

  // Hook up the augmented candidate in onicecandidate and
  // addEventListener('icecandidate', ...)
  _utils__WEBPACK_IMPORTED_MODULE_1__.wrapPeerConnectionEvent(window, 'icecandidate', e => {
    if (e.candidate) {
      Object.defineProperty(e, 'candidate', {
        value: new window.RTCIceCandidate(e.candidate),
        writable: 'false'
      });
    }
    return e;
  });
}
function shimMaxMessageSize(window, browserDetails) {
  if (!window.RTCPeerConnection) {
    return;
  }
  if (!('sctp' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
      get() {
        return typeof this._sctp === 'undefined' ? null : this._sctp;
      }
    });
  }
  const sctpInDescription = function (description) {
    if (!description || !description.sdp) {
      return false;
    }
    const sections = sdp__WEBPACK_IMPORTED_MODULE_0___default().splitSections(description.sdp);
    sections.shift();
    return sections.some(mediaSection => {
      const mLine = sdp__WEBPACK_IMPORTED_MODULE_0___default().parseMLine(mediaSection);
      return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
    });
  };
  const getRemoteFirefoxVersion = function (description) {
    // TODO: Is there a better solution for detecting Firefox?
    const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
    if (match === null || match.length < 2) {
      return -1;
    }
    const version = parseInt(match[1], 10);
    // Test for NaN (yes, this is ugly)
    return version !== version ? -1 : version;
  };
  const getCanSendMaxMessageSize = function (remoteIsFirefox) {
    // Every implementation we know can send at least 64 KiB.
    // Note: Although Chrome is technically able to send up to 256 KiB, the
    //       data does not reach the other peer reliably.
    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
    let canSendMaxMessageSize = 65536;
    if (browserDetails.browser === 'firefox') {
      if (browserDetails.version < 57) {
        if (remoteIsFirefox === -1) {
          // FF < 57 will send in 16 KiB chunks using the deprecated PPID
          // fragmentation.
          canSendMaxMessageSize = 16384;
        } else {
          // However, other FF (and RAWRTC) can reassemble PPID-fragmented
          // messages. Thus, supporting ~2 GiB when sending.
          canSendMaxMessageSize = 2147483637;
        }
      } else if (browserDetails.version < 60) {
        // Currently, all FF >= 57 will reset the remote maximum message size
        // to the default value when a data channel is created at a later
        // stage. :(
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
        canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
      } else {
        // FF >= 60 supports sending ~2 GiB
        canSendMaxMessageSize = 2147483637;
      }
    }
    return canSendMaxMessageSize;
  };
  const getMaxMessageSize = function (description, remoteIsFirefox) {
    // Note: 65536 bytes is the default value from the SDP spec. Also,
    //       every implementation we know supports receiving 65536 bytes.
    let maxMessageSize = 65536;

    // FF 57 has a slightly incorrect default remote max message size, so
    // we need to adjust it here to avoid a failure when sending.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
    if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
      maxMessageSize = 65535;
    }
    const match = sdp__WEBPACK_IMPORTED_MODULE_0___default().matchPrefix(description.sdp, 'a=max-message-size:');
    if (match.length > 0) {
      maxMessageSize = parseInt(match[0].substr(19), 10);
    } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
      // If the maximum message size is not present in the remote SDP and
      // both local and remote are Firefox, the remote peer can receive
      // ~2 GiB.
      maxMessageSize = 2147483637;
    }
    return maxMessageSize;
  };
  const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
  window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
    this._sctp = null;
    // Chrome decided to not expose .sctp in plan-b mode.
    // As usual, adapter.js has to do an 'ugly worakaround'
    // to cover up the mess.
    if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
      const {
        sdpSemantics
      } = this.getConfiguration();
      if (sdpSemantics === 'plan-b') {
        Object.defineProperty(this, 'sctp', {
          get() {
            return typeof this._sctp === 'undefined' ? null : this._sctp;
          },
          enumerable: true,
          configurable: true
        });
      }
    }
    if (sctpInDescription(arguments[0])) {
      // Check if the remote is FF.
      const isFirefox = getRemoteFirefoxVersion(arguments[0]);

      // Get the maximum message size the local peer is capable of sending
      const canSendMMS = getCanSendMaxMessageSize(isFirefox);

      // Get the maximum message size of the remote peer.
      const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

      // Determine final maximum message size
      let maxMessageSize;
      if (canSendMMS === 0 && remoteMMS === 0) {
        maxMessageSize = Number.POSITIVE_INFINITY;
      } else if (canSendMMS === 0 || remoteMMS === 0) {
        maxMessageSize = Math.max(canSendMMS, remoteMMS);
      } else {
        maxMessageSize = Math.min(canSendMMS, remoteMMS);
      }

      // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
      // attribute.
      const sctp = {};
      Object.defineProperty(sctp, 'maxMessageSize', {
        get() {
          return maxMessageSize;
        }
      });
      this._sctp = sctp;
    }
    return origSetRemoteDescription.apply(this, arguments);
  };
}
function shimSendThrowTypeError(window) {
  if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
    return;
  }

  // Note: Although Firefox >= 57 has a native implementation, the maximum
  //       message size can be reset for all data channels at a later stage.
  //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

  function wrapDcSend(dc, pc) {
    const origDataChannelSend = dc.send;
    dc.send = function send() {
      const data = arguments[0];
      const length = data.length || data.size || data.byteLength;
      if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
        throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
      }
      return origDataChannelSend.apply(dc, arguments);
    };
  }
  const origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
  window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
    const dataChannel = origCreateDataChannel.apply(this, arguments);
    wrapDcSend(dataChannel, this);
    return dataChannel;
  };
  _utils__WEBPACK_IMPORTED_MODULE_1__.wrapPeerConnectionEvent(window, 'datachannel', e => {
    wrapDcSend(e.channel, e.target);
    return e;
  });
}

/* shims RTCConnectionState by pretending it is the same as iceConnectionState.
 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
 * since DTLS failures would be hidden. See
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
 * for the Firefox tracking bug.
 */
function shimConnectionState(window) {
  if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
    return;
  }
  const proto = window.RTCPeerConnection.prototype;
  Object.defineProperty(proto, 'connectionState', {
    get() {
      return {
        completed: 'connected',
        checking: 'connecting'
      }[this.iceConnectionState] || this.iceConnectionState;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'onconnectionstatechange', {
    get() {
      return this._onconnectionstatechange || null;
    },
    set(cb) {
      if (this._onconnectionstatechange) {
        this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
        delete this._onconnectionstatechange;
      }
      if (cb) {
        this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
      }
    },
    enumerable: true,
    configurable: true
  });
  ['setLocalDescription', 'setRemoteDescription'].forEach(method => {
    const origMethod = proto[method];
    proto[method] = function () {
      if (!this._connectionstatechangepoly) {
        this._connectionstatechangepoly = e => {
          const pc = e.target;
          if (pc._lastConnectionState !== pc.connectionState) {
            pc._lastConnectionState = pc.connectionState;
            const newEvent = new Event('connectionstatechange', e);
            pc.dispatchEvent(newEvent);
          }
          return e;
        };
        this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
      }
      return origMethod.apply(this, arguments);
    };
  });
}
function removeExtmapAllowMixed(window, browserDetails) {
  /* remove a=extmap-allow-mixed for webrtc.org < M71 */
  if (!window.RTCPeerConnection) {
    return;
  }
  if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
    return;
  }
  if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
    return;
  }
  const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
  window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
    if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
      const sdp = desc.sdp.split('\n').filter(line => {
        return line.trim() !== 'a=extmap-allow-mixed';
      }).join('\n');
      // Safari enforces read-only-ness of RTCSessionDescription fields.
      if (window.RTCSessionDescription && desc instanceof window.RTCSessionDescription) {
        arguments[0] = new window.RTCSessionDescription({
          type: desc.type,
          sdp
        });
      } else {
        desc.sdp = sdp;
      }
    }
    return nativeSRD.apply(this, arguments);
  };
}
function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
  // Support for addIceCandidate(null or undefined)
  // as well as addIceCandidate({candidate: "", ...})
  // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
  // Note: must be called before other polyfills which change the signature.
  if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
    return;
  }
  const nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
  if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) {
    return;
  }
  window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
    if (!arguments[0]) {
      if (arguments[1]) {
        arguments[1].apply(null);
      }
      return Promise.resolve();
    }
    // Firefox 68+ emits and processes {candidate: "", ...}, ignore
    // in older versions.
    // Native support for ignoring exists for Chrome M77+.
    // Safari ignores as well, exact version unknown but works in the same
    // version that also ignores addIceCandidate(null).
    if ((browserDetails.browser === 'chrome' && browserDetails.version < 78 || browserDetails.browser === 'firefox' && browserDetails.version < 68 || browserDetails.browser === 'safari') && arguments[0] && arguments[0].candidate === '') {
      return Promise.resolve();
    }
    return nativeAddIceCandidate.apply(this, arguments);
  };
}

/***/ }),

/***/ 6792:
/*!**************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/edge/edge_shim.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetDisplayMedia": () => (/* reexport safe */ _getdisplaymedia__WEBPACK_IMPORTED_MODULE_4__.shimGetDisplayMedia),
/* harmony export */   "shimGetUserMedia": () => (/* reexport safe */ _getusermedia__WEBPACK_IMPORTED_MODULE_3__.shimGetUserMedia),
/* harmony export */   "shimPeerConnection": () => (/* binding */ shimPeerConnection),
/* harmony export */   "shimReplaceTrack": () => (/* binding */ shimReplaceTrack)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 8328);
/* harmony import */ var _filtericeservers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filtericeservers */ 552);
/* harmony import */ var rtcpeerconnection_shim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rtcpeerconnection-shim */ 60);
/* harmony import */ var rtcpeerconnection_shim__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rtcpeerconnection_shim__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _getusermedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getusermedia */ 9249);
/* harmony import */ var _getdisplaymedia__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getdisplaymedia */ 1476);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */







function shimPeerConnection(window, browserDetails) {
  if (window.RTCIceGatherer) {
    if (!window.RTCIceCandidate) {
      window.RTCIceCandidate = function RTCIceCandidate(args) {
        return args;
      };
    }
    if (!window.RTCSessionDescription) {
      window.RTCSessionDescription = function RTCSessionDescription(args) {
        return args;
      };
    }
    // this adds an additional event listener to MediaStrackTrack that signals
    // when a tracks enabled property was changed. Workaround for a bug in
    // addStream, see below. No longer required in 15025+
    if (browserDetails.version < 15025) {
      const origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
      Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
        set(value) {
          origMSTEnabled.set.call(this, value);
          const ev = new Event('enabled');
          ev.enabled = value;
          this.dispatchEvent(ev);
        }
      });
    }
  }

  // ORTC defines the DTMF sender a bit different.
  // https://github.com/w3c/ortc/issues/714
  if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
      get() {
        if (this._dtmf === undefined) {
          if (this.track.kind === 'audio') {
            this._dtmf = new window.RTCDtmfSender(this);
          } else if (this.track.kind === 'video') {
            this._dtmf = null;
          }
        }
        return this._dtmf;
      }
    });
  }
  // Edge currently only implements the RTCDtmfSender, not the
  // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
  if (window.RTCDtmfSender && !window.RTCDTMFSender) {
    window.RTCDTMFSender = window.RTCDtmfSender;
  }
  const RTCPeerConnectionShim = rtcpeerconnection_shim__WEBPACK_IMPORTED_MODULE_2___default()(window, browserDetails.version);
  window.RTCPeerConnection = function RTCPeerConnection(config) {
    if (config && config.iceServers) {
      config.iceServers = (0,_filtericeservers__WEBPACK_IMPORTED_MODULE_1__.filterIceServers)(config.iceServers, browserDetails.version);
      _utils__WEBPACK_IMPORTED_MODULE_0__.log('ICE servers after filtering:', config.iceServers);
    }
    return new RTCPeerConnectionShim(config);
  };
  window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
}
function shimReplaceTrack(window) {
  // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
  if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
    window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
  }
}

/***/ }),

/***/ 552:
/*!*********************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/edge/filtericeservers.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterIceServers": () => (/* binding */ filterIceServers)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 8328);
/*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */



// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
function filterIceServers(iceServers, edgeVersion) {
  let hasTurn = false;
  iceServers = JSON.parse(JSON.stringify(iceServers));
  return iceServers.filter(server => {
    if (server && (server.urls || server.url)) {
      let urls = server.urls || server.url;
      if (server.url && !server.urls) {
        _utils__WEBPACK_IMPORTED_MODULE_0__.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
      }
      const isString = typeof urls === 'string';
      if (isString) {
        urls = [urls];
      }
      urls = urls.filter(url => {
        // filter STUN unconditionally.
        if (url.indexOf('stun:') === 0) {
          return false;
        }
        const validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
        if (validTurn && !hasTurn) {
          hasTurn = true;
          return true;
        }
        return validTurn && !hasTurn;
      });
      delete server.url;
      server.urls = isString ? urls[0] : urls;
      return !!urls.length;
    }
  });
}

/***/ }),

/***/ 1476:
/*!********************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/edge/getdisplaymedia.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetDisplayMedia": () => (/* binding */ shimGetDisplayMedia)
/* harmony export */ });
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */


function shimGetDisplayMedia(window) {
  if (!('getDisplayMedia' in window.navigator)) {
    return;
  }
  if (!window.navigator.mediaDevices) {
    return;
  }
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }
  window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
}

/***/ }),

/***/ 9249:
/*!*****************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/edge/getusermedia.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetUserMedia": () => (/* binding */ shimGetUserMedia)
/* harmony export */ });
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */


function shimGetUserMedia(window) {
  const navigator = window && window.navigator;
  const shimError_ = function (e) {
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraint,
      toString() {
        return this.name;
      }
    };
  };

  // getUserMedia error shim.
  const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia = function (c) {
    return origGetUserMedia(c).catch(e => Promise.reject(shimError_(e)));
  };
}

/***/ }),

/***/ 5196:
/*!********************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/firefox/firefox_shim.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimAddTransceiver": () => (/* binding */ shimAddTransceiver),
/* harmony export */   "shimCreateAnswer": () => (/* binding */ shimCreateAnswer),
/* harmony export */   "shimCreateOffer": () => (/* binding */ shimCreateOffer),
/* harmony export */   "shimGetDisplayMedia": () => (/* reexport safe */ _getdisplaymedia__WEBPACK_IMPORTED_MODULE_2__.shimGetDisplayMedia),
/* harmony export */   "shimGetParameters": () => (/* binding */ shimGetParameters),
/* harmony export */   "shimGetUserMedia": () => (/* reexport safe */ _getusermedia__WEBPACK_IMPORTED_MODULE_1__.shimGetUserMedia),
/* harmony export */   "shimOnTrack": () => (/* binding */ shimOnTrack),
/* harmony export */   "shimPeerConnection": () => (/* binding */ shimPeerConnection),
/* harmony export */   "shimRTCDataChannel": () => (/* binding */ shimRTCDataChannel),
/* harmony export */   "shimReceiverGetStats": () => (/* binding */ shimReceiverGetStats),
/* harmony export */   "shimRemoveStream": () => (/* binding */ shimRemoveStream),
/* harmony export */   "shimSenderGetStats": () => (/* binding */ shimSenderGetStats)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 8328);
/* harmony import */ var _getusermedia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getusermedia */ 3573);
/* harmony import */ var _getdisplaymedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getdisplaymedia */ 3689);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */





function shimOnTrack(window) {
  if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
      get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
}
function shimPeerConnection(window, browserDetails) {
  if (typeof window !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
    return; // probably media.peerconnection.enabled=false in about:config
  }

  if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
    // very basic support for old versions.
    window.RTCPeerConnection = window.mozRTCPeerConnection;
  }
  if (browserDetails.version < 53) {
    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
      const nativeMethod = window.RTCPeerConnection.prototype[method];
      const methodObj = {
        [method]() {
          arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
          return nativeMethod.apply(this, arguments);
        }
      };
      window.RTCPeerConnection.prototype[method] = methodObj[method];
    });
  }
  const modernStatsTypes = {
    inboundrtp: 'inbound-rtp',
    outboundrtp: 'outbound-rtp',
    candidatepair: 'candidate-pair',
    localcandidate: 'local-candidate',
    remotecandidate: 'remote-candidate'
  };
  const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
  window.RTCPeerConnection.prototype.getStats = function getStats() {
    const [selector, onSucc, onErr] = arguments;
    return nativeGetStats.apply(this, [selector || null]).then(stats => {
      if (browserDetails.version < 53 && !onSucc) {
        // Shim only promise getStats with spec-hyphens in type names
        // Leave callback version alone; misc old uses of forEach before Map
        try {
          stats.forEach(stat => {
            stat.type = modernStatsTypes[stat.type] || stat.type;
          });
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          }
          // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
          stats.forEach((stat, i) => {
            stats.set(i, Object.assign({}, stat, {
              type: modernStatsTypes[stat.type] || stat.type
            }));
          });
        }
      }
      return stats;
    }).then(onSucc, onErr);
  };
}
function shimSenderGetStats(window) {
  if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
    return;
  }
  if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
    return;
  }
  const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
  if (origGetSenders) {
    window.RTCPeerConnection.prototype.getSenders = function getSenders() {
      const senders = origGetSenders.apply(this, []);
      senders.forEach(sender => sender._pc = this);
      return senders;
    };
  }
  const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
  if (origAddTrack) {
    window.RTCPeerConnection.prototype.addTrack = function addTrack() {
      const sender = origAddTrack.apply(this, arguments);
      sender._pc = this;
      return sender;
    };
  }
  window.RTCRtpSender.prototype.getStats = function getStats() {
    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
  };
}
function shimReceiverGetStats(window) {
  if (!(typeof window === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
    return;
  }
  if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
    return;
  }
  const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
  if (origGetReceivers) {
    window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
      const receivers = origGetReceivers.apply(this, []);
      receivers.forEach(receiver => receiver._pc = this);
      return receivers;
    };
  }
  _utils__WEBPACK_IMPORTED_MODULE_0__.wrapPeerConnectionEvent(window, 'track', e => {
    e.receiver._pc = e.srcElement;
    return e;
  });
  window.RTCRtpReceiver.prototype.getStats = function getStats() {
    return this._pc.getStats(this.track);
  };
}
function shimRemoveStream(window) {
  if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
    return;
  }
  window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
    _utils__WEBPACK_IMPORTED_MODULE_0__.deprecated('removeStream', 'removeTrack');
    this.getSenders().forEach(sender => {
      if (sender.track && stream.getTracks().includes(sender.track)) {
        this.removeTrack(sender);
      }
    });
  };
}
function shimRTCDataChannel(window) {
  // rename DataChannel to RTCDataChannel (native fix in FF60):
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
  if (window.DataChannel && !window.RTCDataChannel) {
    window.RTCDataChannel = window.DataChannel;
  }
}
function shimAddTransceiver(window) {
  // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
  // Firefox ignores the init sendEncodings options passed to addTransceiver
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
  if (!(typeof window === 'object' && window.RTCPeerConnection)) {
    return;
  }
  const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
  if (origAddTransceiver) {
    window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
      this.setParametersPromises = [];
      const initParameters = arguments[1];
      const shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
      if (shouldPerformCheck) {
        // If sendEncodings params are provided, validate grammar
        initParameters.sendEncodings.forEach(encodingParam => {
          if ('rid' in encodingParam) {
            const ridRegex = /^[a-z0-9]{0,16}$/i;
            if (!ridRegex.test(encodingParam.rid)) {
              throw new TypeError('Invalid RID value provided.');
            }
          }
          if ('scaleResolutionDownBy' in encodingParam) {
            if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
              throw new RangeError('scale_resolution_down_by must be >= 1.0');
            }
          }
          if ('maxFramerate' in encodingParam) {
            if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
              throw new RangeError('max_framerate must be >= 0.0');
            }
          }
        });
      }
      const transceiver = origAddTransceiver.apply(this, arguments);
      if (shouldPerformCheck) {
        // Check if the init options were applied. If not we do this in an
        // asynchronous way and save the promise reference in a global object.
        // This is an ugly hack, but at the same time is way more robust than
        // checking the sender parameters before and after the createOffer
        // Also note that after the createoffer we are not 100% sure that
        // the params were asynchronously applied so we might miss the
        // opportunity to recreate offer.
        const {
          sender
        } = transceiver;
        const params = sender.getParameters();
        if (!('encodings' in params) ||
        // Avoid being fooled by patched getParameters() below.
        params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
          params.encodings = initParameters.sendEncodings;
          sender.sendEncodings = initParameters.sendEncodings;
          this.setParametersPromises.push(sender.setParameters(params).then(() => {
            delete sender.sendEncodings;
          }).catch(() => {
            delete sender.sendEncodings;
          }));
        }
      }
      return transceiver;
    };
  }
}
function shimGetParameters(window) {
  if (!(typeof window === 'object' && window.RTCRtpSender)) {
    return;
  }
  const origGetParameters = window.RTCRtpSender.prototype.getParameters;
  if (origGetParameters) {
    window.RTCRtpSender.prototype.getParameters = function getParameters() {
      const params = origGetParameters.apply(this, arguments);
      if (!('encodings' in params)) {
        params.encodings = [].concat(this.sendEncodings || [{}]);
      }
      return params;
    };
  }
}
function shimCreateOffer(window) {
  // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
  // Firefox ignores the init sendEncodings options passed to addTransceiver
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
  if (!(typeof window === 'object' && window.RTCPeerConnection)) {
    return;
  }
  const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
  window.RTCPeerConnection.prototype.createOffer = function createOffer() {
    if (this.setParametersPromises && this.setParametersPromises.length) {
      return Promise.all(this.setParametersPromises).then(() => {
        return origCreateOffer.apply(this, arguments);
      }).finally(() => {
        this.setParametersPromises = [];
      });
    }
    return origCreateOffer.apply(this, arguments);
  };
}
function shimCreateAnswer(window) {
  // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
  // Firefox ignores the init sendEncodings options passed to addTransceiver
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
  if (!(typeof window === 'object' && window.RTCPeerConnection)) {
    return;
  }
  const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
  window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
    if (this.setParametersPromises && this.setParametersPromises.length) {
      return Promise.all(this.setParametersPromises).then(() => {
        return origCreateAnswer.apply(this, arguments);
      }).finally(() => {
        this.setParametersPromises = [];
      });
    }
    return origCreateAnswer.apply(this, arguments);
  };
}

/***/ }),

/***/ 3689:
/*!***********************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/firefox/getdisplaymedia.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetDisplayMedia": () => (/* binding */ shimGetDisplayMedia)
/* harmony export */ });
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */


function shimGetDisplayMedia(window, preferredMediaSource) {
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }
  if (!window.navigator.mediaDevices) {
    return;
  }
  window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
    if (!(constraints && constraints.video)) {
      const err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
      err.name = 'NotFoundError';
      // from https://heycam.github.io/webidl/#idl-DOMException-error-names
      err.code = 8;
      return Promise.reject(err);
    }
    if (constraints.video === true) {
      constraints.video = {
        mediaSource: preferredMediaSource
      };
    } else {
      constraints.video.mediaSource = preferredMediaSource;
    }
    return window.navigator.mediaDevices.getUserMedia(constraints);
  };
}

/***/ }),

/***/ 3573:
/*!********************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/firefox/getusermedia.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimGetUserMedia": () => (/* binding */ shimGetUserMedia)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 8328);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */



function shimGetUserMedia(window, browserDetails) {
  const navigator = window && window.navigator;
  const MediaStreamTrack = window && window.MediaStreamTrack;
  navigator.getUserMedia = function (constraints, onSuccess, onError) {
    // Replace Firefox 44+'s deprecation warning with unprefixed version.
    _utils__WEBPACK_IMPORTED_MODULE_0__.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  };
  if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
    const remap = function (obj, a, b) {
      if (a in obj && !(b in obj)) {
        obj[b] = obj[a];
        delete obj[a];
      }
    };
    const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function (c) {
      if (typeof c === 'object' && typeof c.audio === 'object') {
        c = JSON.parse(JSON.stringify(c));
        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
      }
      return nativeGetUserMedia(c);
    };
    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
      const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
      MediaStreamTrack.prototype.getSettings = function () {
        const obj = nativeGetSettings.apply(this, arguments);
        remap(obj, 'mozAutoGainControl', 'autoGainControl');
        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
        return obj;
      };
    }
    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
      const nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
      MediaStreamTrack.prototype.applyConstraints = function (c) {
        if (this.kind === 'audio' && typeof c === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c, 'autoGainControl', 'mozAutoGainControl');
          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
        }
        return nativeApplyConstraints.apply(this, [c]);
      };
    }
  }
}

/***/ }),

/***/ 8795:
/*!******************************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/safari/safari_shim.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shimAudioContext": () => (/* binding */ shimAudioContext),
/* harmony export */   "shimCallbacksAPI": () => (/* binding */ shimCallbacksAPI),
/* harmony export */   "shimConstraints": () => (/* binding */ shimConstraints),
/* harmony export */   "shimCreateOfferLegacy": () => (/* binding */ shimCreateOfferLegacy),
/* harmony export */   "shimGetUserMedia": () => (/* binding */ shimGetUserMedia),
/* harmony export */   "shimLocalStreamsAPI": () => (/* binding */ shimLocalStreamsAPI),
/* harmony export */   "shimRTCIceServerUrls": () => (/* binding */ shimRTCIceServerUrls),
/* harmony export */   "shimRemoteStreamsAPI": () => (/* binding */ shimRemoteStreamsAPI),
/* harmony export */   "shimTrackEventTransceiver": () => (/* binding */ shimTrackEventTransceiver)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 8328);
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */



function shimLocalStreamsAPI(window) {
  if (typeof window !== 'object' || !window.RTCPeerConnection) {
    return;
  }
  if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
      if (!this._localStreams) {
        this._localStreams = [];
      }
      return this._localStreams;
    };
  }
  if (!('addStream' in window.RTCPeerConnection.prototype)) {
    const _addTrack = window.RTCPeerConnection.prototype.addTrack;
    window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
      if (!this._localStreams) {
        this._localStreams = [];
      }
      if (!this._localStreams.includes(stream)) {
        this._localStreams.push(stream);
      }
      // Try to emulate Chrome's behaviour of adding in audio-video order.
      // Safari orders by track id.
      stream.getAudioTracks().forEach(track => _addTrack.call(this, track, stream));
      stream.getVideoTracks().forEach(track => _addTrack.call(this, track, stream));
    };
    window.RTCPeerConnection.prototype.addTrack = function addTrack(track, ...streams) {
      if (streams) {
        streams.forEach(stream => {
          if (!this._localStreams) {
            this._localStreams = [stream];
          } else if (!this._localStreams.includes(stream)) {
            this._localStreams.push(stream);
          }
        });
      }
      return _addTrack.apply(this, arguments);
    };
  }
  if (!('removeStream' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
      if (!this._localStreams) {
        this._localStreams = [];
      }
      const index = this._localStreams.indexOf(stream);
      if (index === -1) {
        return;
      }
      this._localStreams.splice(index, 1);
      const tracks = stream.getTracks();
      this.getSenders().forEach(sender => {
        if (tracks.includes(sender.track)) {
          this.removeTrack(sender);
        }
      });
    };
  }
}
function shimRemoteStreamsAPI(window) {
  if (typeof window !== 'object' || !window.RTCPeerConnection) {
    return;
  }
  if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
      return this._remoteStreams ? this._remoteStreams : [];
    };
  }
  if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
      get() {
        return this._onaddstream;
      },
      set(f) {
        if (this._onaddstream) {
          this.removeEventListener('addstream', this._onaddstream);
          this.removeEventListener('track', this._onaddstreampoly);
        }
        this.addEventListener('addstream', this._onaddstream = f);
        this.addEventListener('track', this._onaddstreampoly = e => {
          e.streams.forEach(stream => {
            if (!this._remoteStreams) {
              this._remoteStreams = [];
            }
            if (this._remoteStreams.includes(stream)) {
              return;
            }
            this._remoteStreams.push(stream);
            const event = new Event('addstream');
            event.stream = stream;
            this.dispatchEvent(event);
          });
        });
      }
    });
    const origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
    window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
      const pc = this;
      if (!this._onaddstreampoly) {
        this.addEventListener('track', this._onaddstreampoly = function (e) {
          e.streams.forEach(stream => {
            if (!pc._remoteStreams) {
              pc._remoteStreams = [];
            }
            if (pc._remoteStreams.indexOf(stream) >= 0) {
              return;
            }
            pc._remoteStreams.push(stream);
            const event = new Event('addstream');
            event.stream = stream;
            pc.dispatchEvent(event);
          });
        });
      }
      return origSetRemoteDescription.apply(pc, arguments);
    };
  }
}
function shimCallbacksAPI(window) {
  if (typeof window !== 'object' || !window.RTCPeerConnection) {
    return;
  }
  const prototype = window.RTCPeerConnection.prototype;
  const origCreateOffer = prototype.createOffer;
  const origCreateAnswer = prototype.createAnswer;
  const setLocalDescription = prototype.setLocalDescription;
  const setRemoteDescription = prototype.setRemoteDescription;
  const addIceCandidate = prototype.addIceCandidate;
  prototype.createOffer = function createOffer(successCallback, failureCallback) {
    const options = arguments.length >= 2 ? arguments[2] : arguments[0];
    const promise = origCreateOffer.apply(this, [options]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
    const options = arguments.length >= 2 ? arguments[2] : arguments[0];
    const promise = origCreateAnswer.apply(this, [options]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  let withCallback = function (description, successCallback, failureCallback) {
    const promise = setLocalDescription.apply(this, [description]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.setLocalDescription = withCallback;
  withCallback = function (description, successCallback, failureCallback) {
    const promise = setRemoteDescription.apply(this, [description]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.setRemoteDescription = withCallback;
  withCallback = function (candidate, successCallback, failureCallback) {
    const promise = addIceCandidate.apply(this, [candidate]);
    if (!failureCallback) {
      return promise;
    }
    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };
  prototype.addIceCandidate = withCallback;
}
function shimGetUserMedia(window) {
  const navigator = window && window.navigator;
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // shim not needed in Safari 12.1
    const mediaDevices = navigator.mediaDevices;
    const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
    navigator.mediaDevices.getUserMedia = constraints => {
      return _getUserMedia(shimConstraints(constraints));
    };
  }
  if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
      navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
    }.bind(navigator);
  }
}
function shimConstraints(constraints) {
  if (constraints && constraints.video !== undefined) {
    return Object.assign({}, constraints, {
      video: _utils__WEBPACK_IMPORTED_MODULE_0__.compactObject(constraints.video)
    });
  }
  return constraints;
}
function shimRTCIceServerUrls(window) {
  if (!window.RTCPeerConnection) {
    return;
  }
  // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
  const OrigPeerConnection = window.RTCPeerConnection;
  window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
    if (pcConfig && pcConfig.iceServers) {
      const newIceServers = [];
      for (let i = 0; i < pcConfig.iceServers.length; i++) {
        let server = pcConfig.iceServers[i];
        if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
          _utils__WEBPACK_IMPORTED_MODULE_0__.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
          server = JSON.parse(JSON.stringify(server));
          server.urls = server.url;
          delete server.url;
          newIceServers.push(server);
        } else {
          newIceServers.push(pcConfig.iceServers[i]);
        }
      }
      pcConfig.iceServers = newIceServers;
    }
    return new OrigPeerConnection(pcConfig, pcConstraints);
  };
  window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
  // wrap static methods. Currently just generateCertificate.
  if ('generateCertificate' in OrigPeerConnection) {
    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
      get() {
        return OrigPeerConnection.generateCertificate;
      }
    });
  }
}
function shimTrackEventTransceiver(window) {
  // Add event.transceiver member over deprecated event.receiver
  if (typeof window === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
      get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
}
function shimCreateOfferLegacy(window) {
  const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
  window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
    if (offerOptions) {
      if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
        // support bit values
        offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
      }
      const audioTransceiver = this.getTransceivers().find(transceiver => transceiver.receiver.track.kind === 'audio');
      if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
        if (audioTransceiver.direction === 'sendrecv') {
          if (audioTransceiver.setDirection) {
            audioTransceiver.setDirection('sendonly');
          } else {
            audioTransceiver.direction = 'sendonly';
          }
        } else if (audioTransceiver.direction === 'recvonly') {
          if (audioTransceiver.setDirection) {
            audioTransceiver.setDirection('inactive');
          } else {
            audioTransceiver.direction = 'inactive';
          }
        }
      } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
        this.addTransceiver('audio');
      }
      if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
        // support bit values
        offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
      }
      const videoTransceiver = this.getTransceivers().find(transceiver => transceiver.receiver.track.kind === 'video');
      if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
        if (videoTransceiver.direction === 'sendrecv') {
          if (videoTransceiver.setDirection) {
            videoTransceiver.setDirection('sendonly');
          } else {
            videoTransceiver.direction = 'sendonly';
          }
        } else if (videoTransceiver.direction === 'recvonly') {
          if (videoTransceiver.setDirection) {
            videoTransceiver.setDirection('inactive');
          } else {
            videoTransceiver.direction = 'inactive';
          }
        }
      } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
        this.addTransceiver('video');
      }
    }
    return origCreateOffer.apply(this, arguments);
  };
}
function shimAudioContext(window) {
  if (typeof window !== 'object' || window.AudioContext) {
    return;
  }
  window.AudioContext = window.webkitAudioContext;
}

/***/ }),

/***/ 8328:
/*!*****************************************************!*\
  !*** ./node_modules/webrtc-adapter/src/js/utils.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compactObject": () => (/* binding */ compactObject),
/* harmony export */   "deprecated": () => (/* binding */ deprecated),
/* harmony export */   "detectBrowser": () => (/* binding */ detectBrowser),
/* harmony export */   "disableLog": () => (/* binding */ disableLog),
/* harmony export */   "disableWarnings": () => (/* binding */ disableWarnings),
/* harmony export */   "extractVersion": () => (/* binding */ extractVersion),
/* harmony export */   "filterStats": () => (/* binding */ filterStats),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "walkStats": () => (/* binding */ walkStats),
/* harmony export */   "wrapPeerConnectionEvent": () => (/* binding */ wrapPeerConnectionEvent)
/* harmony export */ });
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
/* eslint-env node */


let logDisabled_ = true;
let deprecationWarnings_ = true;

/**
 * Extract browser version out of the provided user agent string.
 *
 * @param {!string} uastring userAgent string.
 * @param {!string} expr Regular expression used as match criteria.
 * @param {!number} pos position in the version string to be returned.
 * @return {!number} browser version.
 */
function extractVersion(uastring, expr, pos) {
  const match = uastring.match(expr);
  return match && match.length >= pos && parseInt(match[pos], 10);
}

// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object (or false to prevent
// the event).
function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
  if (!window.RTCPeerConnection) {
    return;
  }
  const proto = window.RTCPeerConnection.prototype;
  const nativeAddEventListener = proto.addEventListener;
  proto.addEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap) {
      return nativeAddEventListener.apply(this, arguments);
    }
    const wrappedCallback = e => {
      const modifiedEvent = wrapper(e);
      if (modifiedEvent) {
        if (cb.handleEvent) {
          cb.handleEvent(modifiedEvent);
        } else {
          cb(modifiedEvent);
        }
      }
    };
    this._eventMap = this._eventMap || {};
    if (!this._eventMap[eventNameToWrap]) {
      this._eventMap[eventNameToWrap] = new Map();
    }
    this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
    return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
  };
  const nativeRemoveEventListener = proto.removeEventListener;
  proto.removeEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
      return nativeRemoveEventListener.apply(this, arguments);
    }
    if (!this._eventMap[eventNameToWrap].has(cb)) {
      return nativeRemoveEventListener.apply(this, arguments);
    }
    const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
    this._eventMap[eventNameToWrap].delete(cb);
    if (this._eventMap[eventNameToWrap].size === 0) {
      delete this._eventMap[eventNameToWrap];
    }
    if (Object.keys(this._eventMap).length === 0) {
      delete this._eventMap;
    }
    return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
  };
  Object.defineProperty(proto, 'on' + eventNameToWrap, {
    get() {
      return this['_on' + eventNameToWrap];
    },
    set(cb) {
      if (this['_on' + eventNameToWrap]) {
        this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
        delete this['_on' + eventNameToWrap];
      }
      if (cb) {
        this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
      }
    },
    enumerable: true,
    configurable: true
  });
}
function disableLog(bool) {
  if (typeof bool !== 'boolean') {
    return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
  }
  logDisabled_ = bool;
  return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
}

/**
 * Disable or enable deprecation warnings
 * @param {!boolean} bool set to true to disable warnings.
 */
function disableWarnings(bool) {
  if (typeof bool !== 'boolean') {
    return new Error('Argument type: ' + typeof bool + '. Please use a boolean.');
  }
  deprecationWarnings_ = !bool;
  return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
}
function log() {
  if (typeof window === 'object') {
    if (logDisabled_) {
      return;
    }
    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      console.log.apply(console, arguments);
    }
  }
}

/**
 * Shows a deprecation warning suggesting the modern and spec-compatible API.
 */
function deprecated(oldMethod, newMethod) {
  if (!deprecationWarnings_) {
    return;
  }
  console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
}

/**
 * Browser detector.
 *
 * @return {object} result containing browser and version
 *     properties.
 */
function detectBrowser(window) {
  // Returned result object.
  const result = {
    browser: null,
    version: null
  };

  // Fail early if it's not a browser
  if (typeof window === 'undefined' || !window.navigator) {
    result.browser = 'Not a browser.';
    return result;
  }
  const {
    navigator
  } = window;
  if (navigator.mozGetUserMedia) {
    // Firefox.
    result.browser = 'firefox';
    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
  } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
    // Chrome, Chromium, Webview, Opera.
    // Version matches Chrome/WebRTC version.
    // Chrome 74 removed webkitGetUserMedia on http as well so we need the
    // more complicated fallback to webkitRTCPeerConnection.
    result.browser = 'chrome';
    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
    // Edge.
    result.browser = 'edge';
    result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
  } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
    // Safari.
    result.browser = 'safari';
    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
    result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
  } else {
    // Default fallthrough: not supported.
    result.browser = 'Not a supported browser.';
    return result;
  }
  return result;
}

/**
 * Checks if something is an object.
 *
 * @param {*} val The something you want to check.
 * @return true if val is an object, false otherwise.
 */
function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

/**
 * Remove all empty objects and undefined values
 * from a nested object -- an enhanced and vanilla version
 * of Lodash's `compact`.
 */
function compactObject(data) {
  if (!isObject(data)) {
    return data;
  }
  return Object.keys(data).reduce(function (accumulator, key) {
    const isObj = isObject(data[key]);
    const value = isObj ? compactObject(data[key]) : data[key];
    const isEmptyObject = isObj && !Object.keys(value).length;
    if (value === undefined || isEmptyObject) {
      return accumulator;
    }
    return Object.assign(accumulator, {
      [key]: value
    });
  }, {});
}

/* iterates the stats graph recursively. */
function walkStats(stats, base, resultSet) {
  if (!base || resultSet.has(base.id)) {
    return;
  }
  resultSet.set(base.id, base);
  Object.keys(base).forEach(name => {
    if (name.endsWith('Id')) {
      walkStats(stats, stats.get(base[name]), resultSet);
    } else if (name.endsWith('Ids')) {
      base[name].forEach(id => {
        walkStats(stats, stats.get(id), resultSet);
      });
    }
  });
}

/* filter getStats for a sender/receiver track. */
function filterStats(result, track, outbound) {
  const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
  const filteredResult = new Map();
  if (track === null) {
    return filteredResult;
  }
  const trackStats = [];
  result.forEach(value => {
    if (value.type === 'track' && value.trackIdentifier === track.id) {
      trackStats.push(value);
    }
  });
  trackStats.forEach(trackStat => {
    result.forEach(stats => {
      if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
        walkStats(result, stats, filteredResult);
      }
    });
  });
  return filteredResult;
}

/***/ }),

/***/ 2480:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 1746:
/*!*************************************************************!*\
  !*** ./node_modules/@socket.io/component-emitter/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Emitter": () => (/* binding */ Emitter)
/* harmony export */ });
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }
  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1),
    callbacks = this._callbacks['$' + event];
  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ }),

/***/ 1714:
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/has-cors.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasCORS": () => (/* binding */ hasCORS)
/* harmony export */ });
// imported from https://github.com/component/has-cors
let value = false;
try {
  value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
}
const hasCORS = value;

/***/ }),

/***/ 1323:
/*!********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseqs.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
  let str = '';
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }
  return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
  let qry = {};
  let pairs = qs.split('&');
  for (let i = 0, l = pairs.length; i < l; i++) {
    let pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}

/***/ }),

/***/ 4726:
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseuri.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
function parse(str) {
  const src = str,
    b = str.indexOf('['),
    e = str.indexOf(']');
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
  }
  let m = re.exec(str || ''),
    uri = {},
    i = 14;
  while (i--) {
    uri[parts[i]] = m[i] || '';
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri['path']);
  uri.queryKey = queryKey(uri, uri['query']);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g,
    names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == '/' || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == '/') {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

/***/ }),

/***/ 1644:
/*!******************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/yeast.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "yeast": () => (/* binding */ yeast)
/* harmony export */ });
// imported from https://github.com/unshiftio/yeast


const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
  length = 64,
  map = {};
let seed = 0,
  i = 0,
  prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  let encoded = '';
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  let decoded = 0;
  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }
  return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  const now = encode(+new Date());
  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

/***/ }),

/***/ 3851:
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/globalThis.browser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "globalThisShim": () => (/* binding */ globalThisShim)
/* harmony export */ });
const globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();

/***/ }),

/***/ 273:
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket),
/* harmony export */   "Transport": () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.Transport),
/* harmony export */   "installTimerFunctions": () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_3__.installTimerFunctions),
/* harmony export */   "nextTick": () => (/* reexport safe */ _transports_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_5__.nextTick),
/* harmony export */   "parse": () => (/* reexport safe */ _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__.parse),
/* harmony export */   "protocol": () => (/* binding */ protocol),
/* harmony export */   "transports": () => (/* reexport safe */ _transports_index_js__WEBPACK_IMPORTED_MODULE_2__.transports)
/* harmony export */ });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ 6878);
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transport.js */ 1657);
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transports/index.js */ 3011);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ 2960);
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/parseuri.js */ 4726);
/* harmony import */ var _transports_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transports/websocket-constructor.js */ 9293);


const protocol = _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket.protocol;






/***/ }),

/***/ 6878:
/*!***********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/socket.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transports/index.js */ 3011);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ 2960);
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contrib/parseqs.js */ 1323);
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseuri.js */ 4726);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @socket.io/component-emitter */ 1746);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! engine.io-parser */ 2124);






class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri, opts = {}) {
    super();
    this.writeBuffer = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(opts.host).host;
    }
    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.installTimerFunctions)(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket", "webtransport"];
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__.decode)(this.opts.query);
    }
    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    // set on heartbeat
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
        // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
        // closed/reloaded)
        this.beforeunloadEventListener = () => {
          if (this.transport) {
            // silently close the transport
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this.beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost"
          });
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    // append engine.io protocol identifier
    query.EIO = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
    // transport name
    query.transport = name;
    // session id if we already have one
    if (this.id) query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new _transports_index_js__WEBPACK_IMPORTED_MODULE_0__.transports[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  open() {
    let transport;
    if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    // set up transport
    this.transport = transport;
    // set up transport listeners
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", reason => this.onClose("transport close", reason));
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    Socket.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed) return;
      transport.send([{
        type: "ping",
        data: "probe"
      }]);
      transport.once("packet", msg => {
        if (failed) return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed) return;
            if ("closed" === this.readyState) return;
            cleanup();
            this.setTransport(transport);
            transport.send([{
              type: "upgrade"
            }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          // @ts-ignore
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed) return;
      // Any callback called by transport should be ignored since now
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    // Handle any error that happens while probing
    const onerror = err => {
      const error = new Error("probe error: " + err);
      // @ts-ignore
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    // When the socket is closed while we're probing
    function onclose() {
      onerror("socket closed");
    }
    // When the socket is upgraded while we're probing
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    // Remove all listeners on the transport and on self
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      // favor WebTransport
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if ("open" === this.readyState && this.opts.upgrade) {
      let i = 0;
      const l = this.upgrades.length;
      for (; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      // Socket is live - any packet counts
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          // @ts-ignore
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {}
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.maxPayload = data.maxPayload;
    this.onOpen();
    // In case open handler closes socket
    if ("closed" === this.readyState) return;
    this.resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this.getWritablePackets();
      this.transport.send(packets);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  getWritablePackets() {
    const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1; // first packet type
    for (let i = 0; i < this.writeBuffer.length; i++) {
      const data = this.writeBuffer[i].data;
      if (data) {
        payloadSize += (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.byteLength)(data);
      }
      if (i > 0 && payloadSize > this.maxPayload) {
        return this.writeBuffer.slice(0, i);
      }
      payloadSize += 2; // separator + packet type
    }

    return this.writeBuffer;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} callback function.
   * @return {Socket} for chaining.
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = undefined;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type: type,
      data: data,
      options: options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn) this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  onError(err) {
    Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      // clear timers
      this.clearTimeoutFn(this.pingTimeoutTimer);
      // stop event from firing again for transport
      this.transport.removeAllListeners("close");
      // ensure transport won't stay open
      this.transport.close();
      // ignore further transport communication
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("beforeunload", this.beforeunloadEventListener, false);
        removeEventListener("offline", this.offlineEventListener, false);
      }
      // set ready state
      this.readyState = "closed";
      // clear session id
      this.id = null;
      // emit close event
      this.emitReserved("close", reason, description);
      // clean buffers after, so users can still
      // grab the buffers on `close` event
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i = 0;
    const j = upgrades.length;
    for (; i < j; i++) {
      if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  }
}
Socket.protocol = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;

/***/ }),

/***/ 1657:
/*!**************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transport.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transport": () => (/* binding */ Transport)
/* harmony export */ });
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-parser */ 2124);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @socket.io/component-emitter */ 1746);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ 2960);
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseqs.js */ 1323);




class TransportError extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
}
class Transport extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    this.writable = false;
    (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  /**
   * Opens the transport.
   */
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  /**
   * Closes the transport.
   */
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
    }
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(data) {
    const packet = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_0__.decodePacket)(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause) {}
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__.encode)(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
}

/***/ }),

/***/ 3011:
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transports": () => (/* binding */ transports)
/* harmony export */ });
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling.js */ 5162);
/* harmony import */ var _websocket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket.js */ 6856);
/* harmony import */ var _webtransport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webtransport.js */ 5086);



const transports = {
  websocket: _websocket_js__WEBPACK_IMPORTED_MODULE_1__.WS,
  webtransport: _webtransport_js__WEBPACK_IMPORTED_MODULE_2__.WT,
  polling: _polling_js__WEBPACK_IMPORTED_MODULE_0__.Polling
};

/***/ }),

/***/ 5162:
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Polling": () => (/* binding */ Polling),
/* harmony export */   "Request": () => (/* binding */ Request)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ 1657);
/* harmony import */ var _contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contrib/yeast.js */ 1644);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ 2124);
/* harmony import */ var _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./xmlhttprequest.js */ 9222);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @socket.io/component-emitter */ 1746);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util.js */ 2960);
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../globalThis.js */ 3851);







function empty() {}
const hasXHR2 = function () {
  const xhr = new _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__.XHR({
    xdomain: false
  });
  return null != xhr.responseType;
}();
class Polling extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(opts) {
    super(opts);
    this.polling = false;
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
    /**
     * XHR supports binary
     */
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
    if (this.opts.withCredentials) {
      this.cookieJar = (0,_xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__.createCookieJar)();
    }
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this.poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function () {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function () {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  poll() {
    this.polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(data) {
    const callback = packet => {
      // if its the first message we consider the transport open
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      // if its a close packet, we close the ongoing requests
      if ("close" === packet.type) {
        this.onClose({
          description: "transport closed by the server"
        });
        return false;
      }
      // otherwise bypass onData and handle the message
      this.onPacket(packet);
    };
    // decode payload
    (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.decodePayload)(data, this.socket.binaryType).forEach(callback);
    // if an event did not trigger closing
    if ("closed" !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {}
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const close = () => {
      this.write([{
        type: "close"
      }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(packets) {
    this.writable = false;
    (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePayload)(packets, data => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    // cache busting is forced
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = (0,_contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__.yeast)();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @private
   */
  request(opts = {}) {
    Object.assign(opts, {
      xd: this.xd,
      cookieJar: this.cookieJar
    }, this.opts);
    return new Request(this.uri(), opts);
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data: data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
}
class Request extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(uri, opts) {
    super();
    (0,_util_js__WEBPACK_IMPORTED_MODULE_5__.installTimerFunctions)(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.data = undefined !== opts.data ? opts.data : null;
    this.create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  create() {
    var _a;
    const opts = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    const xhr = this.xhr = new _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__.XHR(opts);
    try {
      xhr.open(this.method, this.uri, true);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}
      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {}
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {}
      (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      // ie6 check
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a;
        if (xhr.readyState === 3) {
          (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(xhr);
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly from the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }
  /**
   * Called upon error.
   *
   * @private
   */
  onError(err) {
    this.emitReserved("error", err, this.xhr);
    this.cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }
    this.xhr = null;
  }
  /**
   * Called upon load.
   *
   * @private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this.cleanup();
    }
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this.cleanup();
  }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
  // @ts-ignore
  if (typeof attachEvent === "function") {
    // @ts-ignore
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in _globalThis_js__WEBPACK_IMPORTED_MODULE_6__.globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

/***/ }),

/***/ 9293:
/*!*********************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocket": () => (/* binding */ WebSocket),
/* harmony export */   "defaultBinaryType": () => (/* binding */ defaultBinaryType),
/* harmony export */   "nextTick": () => (/* binding */ nextTick),
/* harmony export */   "usingBrowserWebSocket": () => (/* binding */ usingBrowserWebSocket)
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalThis.js */ 3851);

const nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return cb => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
const WebSocket = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.WebSocket || _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";

/***/ }),

/***/ 6856:
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/websocket.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS": () => (/* binding */ WS)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ 1657);
/* harmony import */ var _contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contrib/yeast.js */ 1644);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util.js */ 2960);
/* harmony import */ var _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./websocket-constructor.js */ 9293);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! engine.io-parser */ 2124);





// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class WS extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
  /**
   * WebSocket transport constructor.
   *
   * @param {Object} opts - connection options
   * @protected
   */
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    // React Native only supports the 'headers' option, and will print a warning if anything else is passed
    const opts = isReactNative ? {} : (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.usingBrowserWebSocket && !isReactNative ? protocols ? new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket(uri, protocols) : new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket(uri) : new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType || _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.defaultBinaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = closeEvent => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = ev => this.onData(ev.data);
    this.ws.onerror = e => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_4__.encodePacket)(packet, this.supportsBinary, data => {
        // always create a new object (GH-437)
        const opts = {};
        if (!_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          if (this.opts.perMessageDeflate) {
            const len =
            // @ts-ignore
            "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }
        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {}
        if (lastPacket) {
          // fake drain
          // defer to next tick to allow Socket to clear writeBuffer
          (0,_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    // append timestamp to URI
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = (0,_contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__.yeast)();
    }
    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @private
   */
  check() {
    return !!_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket;
  }
}

/***/ }),

/***/ 5086:
/*!****************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/webtransport.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WT": () => (/* binding */ WT)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ 1657);
/* harmony import */ var _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket-constructor.js */ 9293);
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ 2124);



function shouldIncludeBinaryHeader(packet, encoded) {
  // 48 === "0".charCodeAt(0) (OPEN packet type)
  // 54 === "6".charCodeAt(0) (NOOP packet type)
  return packet.type === "message" && typeof packet.data !== "string" && encoded[0] >= 48 && encoded[0] <= 54;
}
class WT extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    // @ts-ignore
    if (typeof WebTransport !== "function") {
      return;
    }
    // @ts-ignore
    this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    this.transport.closed.then(() => {
      this.onClose();
    }).catch(err => {
      this.onError("webtransport error", err);
    });
    // note: we could have used async/await, but that would require some additional polyfills
    this.transport.ready.then(() => {
      this.transport.createBidirectionalStream().then(stream => {
        const reader = stream.readable.getReader();
        this.writer = stream.writable.getWriter();
        let binaryFlag;
        const read = () => {
          reader.read().then(({
            done,
            value
          }) => {
            if (done) {
              return;
            }
            if (!binaryFlag && value.byteLength === 1 && value[0] === 54) {
              binaryFlag = true;
            } else {
              // TODO expose binarytype
              this.onPacket((0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.decodePacketFromBinary)(value, binaryFlag, "arraybuffer"));
              binaryFlag = false;
            }
            read();
          }).catch(err => {});
        };
        read();
        const handshake = this.query.sid ? `0{"sid":"${this.query.sid}"}` : "0";
        this.writer.write(new TextEncoder().encode(handshake)).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i = 0; i < packets.length; i++) {
      const packet = packets[i];
      const lastPacket = i === packets.length - 1;
      (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePacketToBinary)(packet, data => {
        if (shouldIncludeBinaryHeader(packet, data)) {
          this.writer.write(Uint8Array.of(54));
        }
        this.writer.write(data).then(() => {
          if (lastPacket) {
            (0,_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      });
    }
  }
  doClose() {
    var _a;
    (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
  }
}

/***/ }),

/***/ 9222:
/*!**************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XHR": () => (/* binding */ XHR),
/* harmony export */   "createCookieJar": () => (/* binding */ createCookieJar)
/* harmony export */ });
/* harmony import */ var _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../contrib/has-cors.js */ 1714);
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globalThis.js */ 3851);
// browser shim for xmlhttprequest module


function XHR(opts) {
  const xdomain = opts.xdomain;
  // XMLHttpRequest can be disabled on IE
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_0__.hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}
  if (!xdomain) {
    try {
      return new _globalThis_js__WEBPACK_IMPORTED_MODULE_1__.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}
function createCookieJar() {}

/***/ }),

/***/ 2960:
/*!*********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/util.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "byteLength": () => (/* binding */ byteLength),
/* harmony export */   "installTimerFunctions": () => (/* binding */ installTimerFunctions),
/* harmony export */   "pick": () => (/* binding */ pick)
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalThis.js */ 3851);

function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
  } else {
    obj.setTimeoutFn = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    obj.clearTimeoutFn = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
  }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  // arraybuffer or blob
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0,
    length = 0;
  for (let i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length;
}

/***/ }),

/***/ 8320:
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/commons.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERROR_PACKET": () => (/* binding */ ERROR_PACKET),
/* harmony export */   "PACKET_TYPES": () => (/* binding */ PACKET_TYPES),
/* harmony export */   "PACKET_TYPES_REVERSE": () => (/* binding */ PACKET_TYPES_REVERSE)
/* harmony export */ });
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
  type: "error",
  data: "parser error"
};


/***/ }),

/***/ 1467:
/*!*******************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
const encode = arraybuffer => {
  let bytes = new Uint8Array(arraybuffer),
    i,
    len = bytes.length,
    base64 = '';
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base64 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }
  return base64;
};
const decode = base64 => {
  let bufferLength = base64.length * 0.75,
    len = base64.length,
    i,
    p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4;
  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)];
    encoded2 = lookup[base64.charCodeAt(i + 1)];
    encoded3 = lookup[base64.charCodeAt(i + 2)];
    encoded4 = lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

/***/ }),

/***/ 811:
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/decodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodePacket": () => (/* binding */ decodePacket)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ 8320);
/* harmony import */ var _contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contrib/base64-arraybuffer.js */ 1467);


const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return _commons_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type]
  };
};
const decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer) {
    const decoded = (0,_contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__.decode)(data);
    return mapBinary(decoded, binaryType);
  } else {
    return {
      base64: true,
      data
    }; // fallback for old browsers
  }
};

const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      if (data instanceof Blob) {
        // from WebSocket + binaryType "blob"
        return data;
      } else {
        // from HTTP long-polling or WebTransport
        return new Blob([data]);
      }
    case "arraybuffer":
    default:
      if (data instanceof ArrayBuffer) {
        // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
        return data;
      } else {
        // from WebTransport (Uint8Array)
        return data.buffer;
      }
  }
};

/***/ }),

/***/ 2636:
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/encodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encodePacket": () => (/* binding */ encodePacket),
/* harmony export */   "encodePacketToBinary": () => (/* binding */ encodePacketToBinary)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ 8320);

const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({
  type,
  data
}, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  // plain string
  return callback(_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const content = fileReader.result.split(",")[1];
    callback("b" + (content || ""));
  };
  return fileReader.readAsDataURL(data);
};
function toArray(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
  if (withNativeBlob && packet.data instanceof Blob) {
    return packet.data.arrayBuffer().then(toArray).then(callback);
  } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
    return callback(toArray(packet.data));
  }
  encodePacket(packet, false, encoded => {
    if (!TEXT_ENCODER) {
      TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}


/***/ }),

/***/ 2124:
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodePacket": () => (/* reexport safe */ _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket),
/* harmony export */   "decodePacketFromBinary": () => (/* binding */ decodePacketFromBinary),
/* harmony export */   "decodePayload": () => (/* binding */ decodePayload),
/* harmony export */   "encodePacket": () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket),
/* harmony export */   "encodePacketToBinary": () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacketToBinary),
/* harmony export */   "encodePayload": () => (/* binding */ encodePayload),
/* harmony export */   "protocol": () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encodePacket.js */ 2636);
/* harmony import */ var _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decodePacket.js */ 811);


const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;
  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket)(packet, false, encodedPacket => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
const decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
let TEXT_DECODER;
function decodePacketFromBinary(data, isBinary, binaryType) {
  if (!TEXT_DECODER) {
    // lazily created for compatibility with old browser platforms
    TEXT_DECODER = new TextDecoder();
  }
  // 48 === "0".charCodeAt(0) (OPEN packet type)
  // 54 === "6".charCodeAt(0) (NOOP packet type)
  const isPlainBinary = isBinary || data[0] < 48 || data[0] > 54;
  return (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(isPlainBinary ? data : TEXT_DECODER.decode(data), binaryType);
}
const protocol = 4;


/***/ }),

/***/ 1691:
/*!***************************************************************!*\
  !*** ./node_modules/ngx-clipboard/fesm2020/ngx-clipboard.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClipboardDirective": () => (/* binding */ ClipboardDirective),
/* harmony export */   "ClipboardIfSupportedDirective": () => (/* binding */ ClipboardIfSupportedDirective),
/* harmony export */   "ClipboardModule": () => (/* binding */ ClipboardModule),
/* harmony export */   "ClipboardService": () => (/* binding */ ClipboardService)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var ngx_window_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-window-token */ 3906);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);






/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
class ClipboardService {
  constructor(ngZone, document, window) {
    this.ngZone = ngZone;
    this.document = document;
    this.window = window;
    this.copySubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    this.copyResponse$ = this.copySubject.asObservable();
    this.config = {};
  }
  configure(config) {
    this.config = config;
  }
  copy(content) {
    if (!this.isSupported || !content) {
      return this.pushCopyResponse({
        isSuccess: false,
        content
      });
    }
    const copyResult = this.copyFromContent(content);
    if (copyResult) {
      return this.pushCopyResponse({
        content,
        isSuccess: copyResult
      });
    }
    return this.pushCopyResponse({
      isSuccess: false,
      content
    });
  }
  get isSupported() {
    return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
  }
  isTargetValid(element) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      if (element.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }
      return true;
    }
    throw new Error('Target should be input or textarea');
  }
  /**
   * Attempts to copy from an input `targetElm`
   */
  copyFromInputElement(targetElm, isFocus = true) {
    try {
      this.selectTarget(targetElm);
      const re = this.copyText();
      this.clearSelection(isFocus ? targetElm : undefined, this.window);
      return re && this.isCopySuccessInIE11();
    } catch (error) {
      return false;
    }
  }
  /**
   * This is a hack for IE11 to return `true` even if copy fails.
   */
  isCopySuccessInIE11() {
    const clipboardData = this.window['clipboardData'];
    if (clipboardData && clipboardData.getData) {
      if (!clipboardData.getData('Text')) {
        return false;
      }
    }
    return true;
  }
  /**
   * Creates a fake textarea element, sets its value from `text` property,
   * and makes a selection on it.
   */
  copyFromContent(content, container = this.document.body) {
    // check if the temp textarea still belongs to the current container.
    // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
    if (this.tempTextArea && !container.contains(this.tempTextArea)) {
      this.destroy(this.tempTextArea.parentElement || undefined);
    }
    if (!this.tempTextArea) {
      this.tempTextArea = this.createTempTextArea(this.document, this.window);
      try {
        container.appendChild(this.tempTextArea);
      } catch (error) {
        throw new Error('Container should be a Dom element');
      }
    }
    this.tempTextArea.value = content;
    const toReturn = this.copyFromInputElement(this.tempTextArea, false);
    if (this.config.cleanUpAfterCopy) {
      this.destroy(this.tempTextArea.parentElement || undefined);
    }
    return toReturn;
  }
  /**
   * Remove temporary textarea if any exists.
   */
  destroy(container = this.document.body) {
    if (this.tempTextArea) {
      container.removeChild(this.tempTextArea);
      // removeChild doesn't remove the reference from memory
      this.tempTextArea = undefined;
    }
  }
  /**
   * Select the target html input element.
   */
  selectTarget(inputElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, inputElement.value.length);
    return inputElement.value.length;
  }
  copyText() {
    return this.document.execCommand('copy');
  }
  /**
   * Moves focus away from `target` and back to the trigger, removes current selection.
   */
  clearSelection(inputElement, window) {
    inputElement && inputElement.focus();
    window.getSelection()?.removeAllRanges();
  }
  /**
   * Creates a fake textarea for copy command.
   */
  createTempTextArea(doc, window) {
    const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
    let ta;
    ta = doc.createElement('textarea');
    // Prevent zooming on iOS
    ta.style.fontSize = '12pt';
    // Reset box model
    ta.style.border = '0';
    ta.style.padding = '0';
    ta.style.margin = '0';
    // Move element out of screen horizontally
    ta.style.position = 'absolute';
    ta.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically
    const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
    ta.style.top = yPosition + 'px';
    ta.setAttribute('readonly', '');
    return ta;
  }
  /**
   * Pushes copy operation response to copySubject, to provide global access
   * to the response.
   */
  pushCopyResponse(response) {
    if (this.copySubject.observers.length > 0) {
      this.ngZone.run(() => {
        this.copySubject.next(response);
      });
    }
  }
  /**
   * @deprecated use pushCopyResponse instead.
   */
  pushCopyReponse(response) {
    this.pushCopyResponse(response);
  }
}
ClipboardService.ɵfac = function ClipboardService_Factory(t) {
  return new (t || ClipboardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](ngx_window_token__WEBPACK_IMPORTED_MODULE_3__.WINDOW, 8));
};
ClipboardService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: ClipboardService,
  factory: ClipboardService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ClipboardService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_3__.WINDOW]
      }]
    }];
  }, null);
})();
class ClipboardDirective {
  constructor(ngZone, host, renderer, clipboardSrv) {
    this.ngZone = ngZone;
    this.host = host;
    this.renderer = renderer;
    this.clipboardSrv = clipboardSrv;
    this.cbOnSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.cbOnError = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onClick = event => {
      if (!this.clipboardSrv.isSupported) {
        this.handleResult(false, undefined, event);
      } else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
        this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
      } else if (this.cbContent) {
        this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
      }
    };
  }
  // eslint-disable-next-line no-empty, @typescript-eslint/no-empty-function
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      // By default each host listener schedules change detection and also wrapped
      // into additional function that calls `markForCheck()`. We're listening the `click`
      // event in the context of the root zone to avoid running unnecessary change detections,
      // since this directive doesn't do anything template-related (e.g. updates template variables).
      this.clickListener = this.renderer.listen(this.host.nativeElement, 'click', this.onClick);
    });
  }
  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
    this.clipboardSrv.destroy(this.container);
  }
  /**
   * Fires an event based on the copy operation result.
   * @param succeeded
   */
  handleResult(succeeded, copiedContent, event) {
    let response = {
      isSuccess: succeeded,
      content: copiedContent,
      successMessage: this.cbSuccessMsg,
      event
    };
    if (succeeded) {
      if (this.cbOnSuccess.observed) {
        this.ngZone.run(() => {
          this.cbOnSuccess.emit(response);
        });
      }
    } else {
      if (this.cbOnError.observed) {
        this.ngZone.run(() => {
          this.cbOnError.emit(response);
        });
      }
    }
    this.clipboardSrv.pushCopyResponse(response);
  }
}
ClipboardDirective.ɵfac = function ClipboardDirective_Factory(t) {
  return new (t || ClipboardDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ClipboardService));
};
ClipboardDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: ClipboardDirective,
  selectors: [["", "ngxClipboard", ""]],
  inputs: {
    targetElm: ["ngxClipboard", "targetElm"],
    container: "container",
    cbContent: "cbContent",
    cbSuccessMsg: "cbSuccessMsg"
  },
  outputs: {
    cbOnSuccess: "cbOnSuccess",
    cbOnError: "cbOnError"
  }
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ClipboardDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: '[ngxClipboard]'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2
    }, {
      type: ClipboardService
    }];
  }, {
    targetElm: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input,
      args: ['ngxClipboard']
    }],
    container: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cbContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cbSuccessMsg: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cbOnSuccess: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    cbOnError: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }]
  });
})();
class ClipboardIfSupportedDirective {
  constructor(_clipboardService, _viewContainerRef, _templateRef) {
    this._clipboardService = _clipboardService;
    this._viewContainerRef = _viewContainerRef;
    this._templateRef = _templateRef;
  }
  ngOnInit() {
    if (this._clipboardService.isSupported) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}
ClipboardIfSupportedDirective.ɵfac = function ClipboardIfSupportedDirective_Factory(t) {
  return new (t || ClipboardIfSupportedDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ClipboardService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef));
};
ClipboardIfSupportedDirective.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
  type: ClipboardIfSupportedDirective,
  selectors: [["", "ngxClipboardIfSupported", ""]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ClipboardIfSupportedDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive,
    args: [{
      selector: '[ngxClipboardIfSupported]'
    }]
  }], function () {
    return [{
      type: ClipboardService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.TemplateRef
    }];
  }, null);
})();
class ClipboardModule {}
ClipboardModule.ɵfac = function ClipboardModule_Factory(t) {
  return new (t || ClipboardModule)();
};
ClipboardModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: ClipboardModule
});
ClipboardModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ClipboardModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
      declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
      exports: [ClipboardDirective, ClipboardIfSupportedDirective]
    }]
  }], null, null);
})();

/*
 * Public API Surface of ngx-clipboard
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 786:
/*!***************************************************************!*\
  !*** ./node_modules/ngx-socket-io/fesm2020/ngx-socket-io.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ WrappedSocket),
/* harmony export */   "SocketIoModule": () => (/* binding */ SocketIoModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 1203);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ 4769);





class WrappedSocket {
  constructor(config) {
    this.config = config;
    this.subscribersCounter = {};
    this.eventObservables$ = {};
    this.emptyConfig = {
      url: '',
      options: {}
    };
    if (config === undefined) {
      config = this.emptyConfig;
    }
    const url = config.url;
    const options = config.options;
    const ioFunc = socket_io_client__WEBPACK_IMPORTED_MODULE_0__["default"] ? socket_io_client__WEBPACK_IMPORTED_MODULE_0__["default"] : socket_io_client__WEBPACK_IMPORTED_MODULE_0__;
    this.ioSocket = ioFunc(url, options);
  }
  of(namespace) {
    this.ioSocket.of(namespace);
  }
  on(eventName, callback) {
    this.ioSocket.on(eventName, callback);
  }
  once(eventName, callback) {
    this.ioSocket.once(eventName, callback);
  }
  connect() {
    return this.ioSocket.connect();
  }
  disconnect(_close) {
    return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
  }
  emit(_eventName, ..._args) {
    return this.ioSocket.emit.apply(this.ioSocket, arguments);
  }
  removeListener(_eventName, _callback) {
    return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
  }
  removeAllListeners(_eventName) {
    return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
  }
  fromEvent(eventName) {
    if (!this.subscribersCounter[eventName]) {
      this.subscribersCounter[eventName] = 0;
    }
    this.subscribersCounter[eventName]++;
    if (!this.eventObservables$[eventName]) {
      this.eventObservables$[eventName] = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
        const listener = data => {
          observer.next(data);
        };
        this.ioSocket.on(eventName, listener);
        return () => {
          this.subscribersCounter[eventName]--;
          if (this.subscribersCounter[eventName] === 0) {
            this.ioSocket.removeListener(eventName, listener);
            delete this.eventObservables$[eventName];
          }
        };
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.share)());
    }
    return this.eventObservables$[eventName];
  }
  fromOneTimeEvent(eventName) {
    return new Promise(resolve => this.once(eventName, resolve));
  }
  listeners(eventName) {
    return this.ioSocket.listeners(eventName);
  }
  listenersAny() {
    return this.ioSocket.listenersAny();
  }
  listenersAnyOutgoing() {
    return this.ioSocket.listenersAnyOutgoing();
  }
  off(eventName, listener) {
    if (!eventName) {
      // Remove all listeners for all events
      return this.ioSocket.offAny();
    }
    if (eventName && !listener) {
      // Remove all listeners for that event
      return this.ioSocket.off(eventName);
    }
    // Removes the specified listener from the listener array for the event named
    return this.ioSocket.off(eventName, listener);
  }
  onAny(callback) {
    return this.ioSocket.onAny(callback);
  }
  onAnyOutgoing(callback) {
    return this.ioSocket.onAnyOutgoing(callback);
  }
  prependAny(callback) {
    return this.ioSocket.prependAny(callback);
  }
  prependAnyOutgoing(callback) {
    return this.ioSocket.prependAnyOutgoing(callback);
  }
  timeout(value) {
    return this.ioSocket.timeout(value);
  }
  volatile() {
    return this.ioSocket.volatile;
  }
}

/** Socket factory */
function SocketFactory(config) {
  return new WrappedSocket(config);
}
const SOCKET_CONFIG_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.InjectionToken('__SOCKET_IO_CONFIG__');
class SocketIoModule {
  static forRoot(config) {
    return {
      ngModule: SocketIoModule,
      providers: [{
        provide: SOCKET_CONFIG_TOKEN,
        useValue: config
      }, {
        provide: WrappedSocket,
        useFactory: SocketFactory,
        deps: [SOCKET_CONFIG_TOKEN]
      }]
    };
  }
}
SocketIoModule.ɵfac = function SocketIoModule_Factory(t) {
  return new (t || SocketIoModule)();
};
SocketIoModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: SocketIoModule
});
SocketIoModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](SocketIoModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule,
    args: [{}]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 3906:
/*!*********************************************************************!*\
  !*** ./node_modules/ngx-window-token/fesm2020/ngx-window-token.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WINDOW": () => (/* binding */ WINDOW)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

const WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('WindowToken', typeof window !== 'undefined' && window.document ? {
  providedIn: 'root',
  factory: () => window
} : {
  providedIn: 'root',
  factory: () => undefined
});

/*
 * Public API Surface of ngx-window-token
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 8102:
/*!***********************************************************!*\
  !*** ./node_modules/obs-websocket-js/dist/json.modern.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventSubscription": () => (/* binding */ EventSubscription),
/* harmony export */   "OBSWebSocketError": () => (/* binding */ OBSWebSocketError),
/* harmony export */   "RequestBatchExecutionType": () => (/* binding */ RequestBatchExecutionType),
/* harmony export */   "WebSocketOpCode": () => (/* binding */ WebSocketOpCode),
/* harmony export */   "default": () => (/* binding */ OBSWebSocket)
/* harmony export */ });
/* harmony import */ var _Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ 3570);
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! eventemitter3 */ 5326);
/* harmony import */ var isomorphic_ws__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-ws */ 5356);
/* harmony import */ var crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto-js/sha256.js */ 9007);
/* harmony import */ var crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! crypto-js/enc-base64.js */ 3483);






function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var WebSocketOpCode;
(function (WebSocketOpCode) {
  /**
   * The initial message sent by obs-websocket to newly connected clients.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Hello"] = 0] = "Hello";
  /**
   * The message sent by a newly connected client to obs-websocket in response to a `Hello`.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Identify"] = 1] = "Identify";
  /**
   * The response sent by obs-websocket to a client after it has successfully identified with obs-websocket.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Identified"] = 2] = "Identified";
  /**
   * The message sent by an already-identified client to update identification parameters.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Reidentify"] = 3] = "Reidentify";
  /**
   * The message sent by obs-websocket containing an event payload.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Event"] = 5] = "Event";
  /**
   * The message sent by a client to obs-websocket to perform a request.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["Request"] = 6] = "Request";
  /**
   * The message sent by obs-websocket in response to a particular request from a client.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["RequestResponse"] = 7] = "RequestResponse";
  /**
   * The message sent by a client to obs-websocket to perform a batch of requests.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["RequestBatch"] = 8] = "RequestBatch";
  /**
   * The message sent by obs-websocket in response to a particular batch of requests from a client.
   *
   * Initial OBS Version: 5.0.0
   */
  WebSocketOpCode[WebSocketOpCode["RequestBatchResponse"] = 9] = "RequestBatchResponse";
})(WebSocketOpCode || (WebSocketOpCode = {}));
/* eslint-disable no-bitwise, @typescript-eslint/prefer-literal-enum-member */
var EventSubscription;
(function (EventSubscription) {
  /**
   * Subcription value used to disable all events.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["None"] = 0] = "None";
  /**
   * Subscription value to receive events in the `General` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["General"] = 1] = "General";
  /**
   * Subscription value to receive events in the `Config` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Config"] = 2] = "Config";
  /**
   * Subscription value to receive events in the `Scenes` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Scenes"] = 4] = "Scenes";
  /**
   * Subscription value to receive events in the `Inputs` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Inputs"] = 8] = "Inputs";
  /**
   * Subscription value to receive events in the `Transitions` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Transitions"] = 16] = "Transitions";
  /**
   * Subscription value to receive events in the `Filters` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Filters"] = 32] = "Filters";
  /**
   * Subscription value to receive events in the `Outputs` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Outputs"] = 64] = "Outputs";
  /**
   * Subscription value to receive events in the `SceneItems` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["SceneItems"] = 128] = "SceneItems";
  /**
   * Subscription value to receive events in the `MediaInputs` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["MediaInputs"] = 256] = "MediaInputs";
  /**
   * Subscription value to receive the `VendorEvent` event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Vendors"] = 512] = "Vendors";
  /**
   * Subscription value to receive events in the `Ui` category.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["Ui"] = 1024] = "Ui";
  /**
   * Helper to receive all non-high-volume events.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["All"] = 2047] = "All";
  /**
   * Subscription value to receive the `InputVolumeMeters` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["InputVolumeMeters"] = 65536] = "InputVolumeMeters";
  /**
   * Subscription value to receive the `InputActiveStateChanged` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["InputActiveStateChanged"] = 131072] = "InputActiveStateChanged";
  /**
   * Subscription value to receive the `InputShowStateChanged` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["InputShowStateChanged"] = 262144] = "InputShowStateChanged";
  /**
   * Subscription value to receive the `SceneItemTransformChanged` high-volume event.
   *
   * Initial OBS Version: 5.0.0
   */
  EventSubscription[EventSubscription["SceneItemTransformChanged"] = 524288] = "SceneItemTransformChanged";
})(EventSubscription || (EventSubscription = {}));
/* eslint-enable no-bitwise, @typescript-eslint/prefer-literal-enum-member */
var RequestBatchExecutionType;
(function (RequestBatchExecutionType) {
  /**
   * Not a request batch.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["None"] = -1] = "None";
  /**
   * A request batch which processes all requests serially, as fast as possible.
   *
   * Note: To introduce artificial delay, use the `Sleep` request and the `sleepMillis` request field.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["SerialRealtime"] = 0] = "SerialRealtime";
  /**
   * A request batch type which processes all requests serially, in sync with the graphics thread. Designed to provide high accuracy for animations.
   *
   * Note: To introduce artificial delay, use the `Sleep` request and the `sleepFrames` request field.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["SerialFrame"] = 1] = "SerialFrame";
  /**
   * A request batch type which processes all requests using all available threads in the thread pool.
   *
   * Note: This is mainly experimental, and only really shows its colors during requests which require lots of
   * active processing, like `GetSourceScreenshot`.
   *
   * Initial OBS Version: 5.0.0
   */
  RequestBatchExecutionType[RequestBatchExecutionType["Parallel"] = 2] = "Parallel";
})(RequestBatchExecutionType || (RequestBatchExecutionType = {}));

/**
 * SHA256 Hashing.
 * @param  {string} [salt=''] salt.
 * @param  {string} [challenge=''] challenge.
 * @param  {string} msg Message to encode.
 * @returns {string} sha256 encoded string.
 */
function authenticationHashing(salt, challenge, msg) {
  const hash = crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5__.stringify(crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_4__(msg + salt));
  return crypto_js_enc_base64_js__WEBPACK_IMPORTED_MODULE_5__.stringify(crypto_js_sha256_js__WEBPACK_IMPORTED_MODULE_4__(hash + challenge));
}
const _excluded = ["authentication", "rpcVersion"];
const debug = debug__WEBPACK_IMPORTED_MODULE_1__('obs-websocket-js');
class OBSWebSocketError extends Error {
  constructor(code, message) {
    super(message);
    this.code = void 0;
    this.code = code;
  }
}
class BaseOBSWebSocket extends eventemitter3__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    super(...args);
    this._identified = false;
    this.internalListeners = new eventemitter3__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.socket = void 0;
  }
  static generateMessageId() {
    return String(BaseOBSWebSocket.requestCounter++);
  }
  get identified() {
    return this._identified;
  }
  /**
   * Connect to an obs-websocket server
   * @param url Websocket server to connect to (including ws:// or wss:// protocol)
   * @param password Password
   * @param identificationParams Data for Identify event
   * @returns Hello & Identified messages data (combined)
   */
  connect(url = 'ws://127.0.0.1:4455', password, identificationParams = {}) {
    var _this2 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _this = _this2;
      if (_this2.socket) {
        yield _this2.disconnect();
      }
      try {
        const connectionClosedPromise = _this2.internalEventPromise('ConnectionClosed');
        const connectionErrorPromise = _this2.internalEventPromise('ConnectionError');
        return yield Promise.race([(0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const hello = yield _this.createConnection(url);
          _this.emit('Hello', hello);
          return _this.identify(hello, password, identificationParams);
        })(),
        // Choose the best promise for connection error/close
        // In browser connection close has close code + reason,
        // while in node error event has these
        new Promise((resolve, reject) => {
          void connectionErrorPromise.then(e => {
            if (e.message) {
              reject(e);
            }
          });
          void connectionClosedPromise.then(e => {
            reject(e);
          });
        })]);
      } catch (error) {
        yield _this2.disconnect();
        throw error;
      }
    })();
  }
  /**
   * Disconnect from obs-websocket server
   */
  disconnect() {
    var _this3 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.socket || _this3.socket.readyState === isomorphic_ws__WEBPACK_IMPORTED_MODULE_3__["default"].CLOSED) {
        return;
      }
      const connectionClosedPromise = _this3.internalEventPromise('ConnectionClosed');
      _this3.socket.close();
      yield connectionClosedPromise;
    })();
  }
  /**
   * Update session parameters
   * @param data Reidentify data
   * @returns Identified message data
   */
  reidentify(data) {
    var _this4 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const identifiedPromise = _this4.internalEventPromise(`op:${WebSocketOpCode.Identified}`);
      yield _this4.message(WebSocketOpCode.Reidentify, data);
      return identifiedPromise;
    })();
  }
  /**
   * Send a request to obs-websocket
   * @param requestType Request name
   * @param requestData Request data
   * @returns Request response
   */
  call(requestType, requestData) {
    var _this5 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const requestId = BaseOBSWebSocket.generateMessageId();
      const responsePromise = _this5.internalEventPromise(`res:${requestId}`);
      yield _this5.message(WebSocketOpCode.Request, {
        requestId,
        requestType,
        requestData
      });
      const {
        requestStatus,
        responseData
      } = yield responsePromise;
      if (!requestStatus.result) {
        throw new OBSWebSocketError(requestStatus.code, requestStatus.comment);
      }
      return responseData;
    })();
  }
  /**
   * Send a batch request to obs-websocket
   * @param requests Array of Request objects (type and data)
   * @param options A set of options for how the batch will be executed
   * @param options.executionType The mode of execution obs-websocket will run the batch in
   * @param options.haltOnFailure Whether obs-websocket should stop executing the batch if one request fails
   * @returns RequestBatch response
   */
  callBatch(requests, options = {}) {
    var _this6 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const requestId = BaseOBSWebSocket.generateMessageId();
      const responsePromise = _this6.internalEventPromise(`res:${requestId}`);
      yield _this6.message(WebSocketOpCode.RequestBatch, _extends({
        requestId,
        requests
      }, options));
      const {
        results
      } = yield responsePromise;
      return results;
    })();
  }
  /**
   * Cleanup from socket disconnection
   */
  cleanup() {
    if (!this.socket) {
      return;
    }
    this.socket.onopen = null;
    this.socket.onmessage = null;
    this.socket.onerror = null;
    this.socket.onclose = null;
    this.socket = undefined;
    this._identified = false;
    // Cleanup leftovers
    this.internalListeners.removeAllListeners();
  }
  /**
   * Create connection to specified obs-websocket server
   *
   * @private
   * @param url Websocket address
   * @returns Promise for hello data
   */
  createConnection(url) {
    var _this7 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _this$socket;
      const connectionOpenedPromise = _this7.internalEventPromise('ConnectionOpened');
      const helloPromise = _this7.internalEventPromise(`op:${WebSocketOpCode.Hello}`);
      _this7.socket = new isomorphic_ws__WEBPACK_IMPORTED_MODULE_3__["default"](url, _this7.protocol);
      _this7.socket.onopen = _this7.onOpen.bind(_this7);
      _this7.socket.onmessage = _this7.onMessage.bind(_this7);
      _this7.socket.onerror = _this7.onError.bind(_this7);
      _this7.socket.onclose = _this7.onClose.bind(_this7);
      yield connectionOpenedPromise;
      const protocol = (_this$socket = _this7.socket) == null ? void 0 : _this$socket.protocol;
      // Browsers don't autoclose on missing/wrong protocol
      if (!protocol) {
        throw new OBSWebSocketError(-1, 'Server sent no subprotocol');
      }
      if (protocol !== _this7.protocol) {
        throw new OBSWebSocketError(-1, 'Server sent an invalid subprotocol');
      }
      return helloPromise;
    })();
  }
  /**
   * Send identify message
   *
   * @private
   * @param hello Hello message data
   * @param password Password
   * @param identificationParams Identification params
   * @returns Hello & Identified messages data (combined)
   */
  identify(_ref, password, identificationParams = {}) {
    var _this8 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let {
          authentication,
          rpcVersion
        } = _ref,
        helloRest = _objectWithoutPropertiesLoose(_ref, _excluded);
      // Set rpcVersion if unset
      const data = _extends({
        rpcVersion
      }, identificationParams);
      if (authentication && password) {
        data.authentication = authenticationHashing(authentication.salt, authentication.challenge, password);
      }
      const identifiedPromise = _this8.internalEventPromise(`op:${WebSocketOpCode.Identified}`);
      yield _this8.message(WebSocketOpCode.Identify, data);
      const identified = yield identifiedPromise;
      _this8._identified = true;
      _this8.emit('Identified', identified);
      return _extends({
        rpcVersion
      }, helloRest, identified);
    })();
  }
  /**
   * Send message to obs-websocket
   *
   * @private
   * @param op WebSocketOpCode
   * @param d Message data
   */
  message(op, d) {
    var _this9 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this9.socket) {
        throw new Error('Not connected');
      }
      if (!_this9.identified && op !== 1) {
        throw new Error('Socket not identified');
      }
      const encoded = yield _this9.encodeMessage({
        op,
        d
      });
      _this9.socket.send(encoded);
    })();
  }
  /**
   * Create a promise to listen for an event on internal listener
   * (will be cleaned up on disconnect)
   *
   * @private
   * @param event Event to listen to
   * @returns Event data
   */
  internalEventPromise(event) {
    var _this10 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise(resolve => {
        _this10.internalListeners.once(event, resolve);
      });
    })();
  }
  /**
   * Websocket open event listener
   *
   * @private
   * @param e Event
   */
  onOpen(e) {
    debug('socket.open');
    this.emit('ConnectionOpened');
    this.internalListeners.emit('ConnectionOpened', e);
  }
  /**
   * Websocket message event listener
   *
   * @private
   * @param e Event
   */
  onMessage(e) {
    var _this11 = this;
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const {
          op,
          d
        } = yield _this11.decodeMessage(e.data);
        debug('socket.message: %d %j', op, d);
        if (op === undefined || d === undefined) {
          return;
        }
        switch (op) {
          case WebSocketOpCode.Event:
            {
              const {
                eventType,
                eventData
              } = d;
              // @ts-expect-error Typescript just doesn't understand it
              _this11.emit(eventType, eventData);
              return;
            }
          case WebSocketOpCode.RequestResponse:
          case WebSocketOpCode.RequestBatchResponse:
            {
              const {
                requestId
              } = d;
              _this11.internalListeners.emit(`res:${requestId}`, d);
              return;
            }
          default:
            _this11.internalListeners.emit(`op:${op}`, d);
        }
      } catch (error) {
        debug('error handling message: %o', error);
      }
    })();
  }
  /**
   * Websocket error event listener
   *
   * @private
   * @param e ErrorEvent
   */
  onError(e) {
    debug('socket.error: %o', e);
    const error = new OBSWebSocketError(-1, e.message);
    this.emit('ConnectionError', error);
    this.internalListeners.emit('ConnectionError', error);
  }
  /**
   * Websocket close event listener
   *
   * @private
   * @param e Event
   */
  onClose(e) {
    debug('socket.close: %s (%d)', e.reason, e.code);
    const error = new OBSWebSocketError(e.code, e.reason);
    this.emit('ConnectionClosed', error);
    this.internalListeners.emit('ConnectionClosed', error);
    this.cleanup();
  }
}
BaseOBSWebSocket.requestCounter = 1;
// https://github.com/developit/microbundle/issues/531#issuecomment-575473024
// Not using ESM export due to it also being detected and breaking rollup based bundlers (vite)
if (typeof exports !== 'undefined') {
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
}
class OBSWebSocket extends BaseOBSWebSocket {
  constructor(...args) {
    super(...args);
    this.protocol = 'obswebsocket.json';
  }
  encodeMessage(data) {
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return JSON.stringify(data);
    })();
  }
  decodeMessage(data) {
    return (0,_Users_james_Documents_zip_captions_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return JSON.parse(data);
    })();
  }
}


/***/ }),

/***/ 5326:
/*!****************************************************************************!*\
  !*** ./node_modules/obs-websocket-js/node_modules/eventemitter3/index.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* reexport default export from named module */ _index_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ 6060);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index_js__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ 7953:
/*!**********************************************!*\
  !*** ./node_modules/peerjs/dist/bundler.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Peer": () => (/* binding */ $26088d7da5b03f69$export$ecd1fc136c422448),
/* harmony export */   "default": () => (/* binding */ $70d766613f57b014$export$2e2bcd8739ae039),
/* harmony export */   "util": () => (/* binding */ $06cb531ed7840f78$export$7debb50ef11d5e0b)
/* harmony export */ });
/* harmony import */ var peerjs_js_binarypack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! peerjs-js-binarypack */ 5297);
/* harmony import */ var webrtc_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webrtc-adapter */ 3588);


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true
  });
}
var $af8cf1f663f490f4$var$webRTCAdapter =
//@ts-ignore
webrtc_adapter__WEBPACK_IMPORTED_MODULE_1__["default"]["default"] || webrtc_adapter__WEBPACK_IMPORTED_MODULE_1__["default"];
var $af8cf1f663f490f4$export$25be9502477c137d = new ( /** @class */function () {
  function class_1() {
    this.isIOS = ["iPad", "iPhone", "iPod"].includes(navigator.platform);
    this.supportedBrowsers = ["firefox", "chrome", "safari"];
    this.minFirefoxVersion = 59;
    this.minChromeVersion = 72;
    this.minSafariVersion = 605;
  }
  class_1.prototype.isWebRTCSupported = function () {
    return typeof RTCPeerConnection !== "undefined";
  };
  class_1.prototype.isBrowserSupported = function () {
    var browser = this.getBrowser();
    var version = this.getVersion();
    var validBrowser = this.supportedBrowsers.includes(browser);
    if (!validBrowser) return false;
    if (browser === "chrome") return version >= this.minChromeVersion;
    if (browser === "firefox") return version >= this.minFirefoxVersion;
    if (browser === "safari") return !this.isIOS && version >= this.minSafariVersion;
    return false;
  };
  class_1.prototype.getBrowser = function () {
    return $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.browser;
  };
  class_1.prototype.getVersion = function () {
    return $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.version || 0;
  };
  class_1.prototype.isUnifiedPlanSupported = function () {
    var browser = this.getBrowser();
    var version = $af8cf1f663f490f4$var$webRTCAdapter.browserDetails.version || 0;
    if (browser === "chrome" && version < this.minChromeVersion) return false;
    if (browser === "firefox" && version >= this.minFirefoxVersion) return true;
    if (!window.RTCRtpTransceiver || !("currentDirection" in RTCRtpTransceiver.prototype)) return false;
    var tempPc;
    var supported = false;
    try {
      tempPc = new RTCPeerConnection();
      tempPc.addTransceiver("audio");
      supported = true;
    } catch (e) {} finally {
      if (tempPc) tempPc.close();
    }
    return supported;
  };
  class_1.prototype.toString = function () {
    return "Supports:\n    browser:".concat(this.getBrowser(), "\n    version:").concat(this.getVersion(), "\n    isIOS:").concat(this.isIOS, "\n    isWebRTCSupported:").concat(this.isWebRTCSupported(), "\n    isBrowserSupported:").concat(this.isBrowserSupported(), "\n    isUnifiedPlanSupported:").concat(this.isUnifiedPlanSupported());
  };
  return class_1;
}())();
var $06cb531ed7840f78$var$DEFAULT_CONFIG = {
  iceServers: [{
    urls: "stun:stun.l.google.com:19302"
  }, {
    urls: ["turn:eu-0.turn.peerjs.com:3478", "turn:us-0.turn.peerjs.com:3478"],
    username: "peerjs",
    credential: "peerjsp"
  }],
  sdpSemantics: "unified-plan"
};
var $06cb531ed7840f78$var$Util = /** @class */function () {
  function Util() {
    this.CLOUD_HOST = "0.peerjs.com";
    this.CLOUD_PORT = 443;
    // Browsers that need chunking:
    this.chunkedBrowsers = {
      Chrome: 1,
      chrome: 1
    };
    this.chunkedMTU = 16300; // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.
    // Returns browser-agnostic default config
    this.defaultConfig = $06cb531ed7840f78$var$DEFAULT_CONFIG;
    this.browser = $af8cf1f663f490f4$export$25be9502477c137d.getBrowser();
    this.browserVersion = $af8cf1f663f490f4$export$25be9502477c137d.getVersion();
    // Lists which features are supported
    this.supports = function () {
      var supported = {
        browser: $af8cf1f663f490f4$export$25be9502477c137d.isBrowserSupported(),
        webRTC: $af8cf1f663f490f4$export$25be9502477c137d.isWebRTCSupported(),
        audioVideo: false,
        data: false,
        binaryBlob: false,
        reliable: false
      };
      if (!supported.webRTC) return supported;
      var pc;
      try {
        pc = new RTCPeerConnection($06cb531ed7840f78$var$DEFAULT_CONFIG);
        supported.audioVideo = true;
        var dc = void 0;
        try {
          dc = pc.createDataChannel("_PEERJSTEST", {
            ordered: true
          });
          supported.data = true;
          supported.reliable = !!dc.ordered;
          // Binary test
          try {
            dc.binaryType = "blob";
            supported.binaryBlob = !$af8cf1f663f490f4$export$25be9502477c137d.isIOS;
          } catch (e) {}
        } catch (e) {} finally {
          if (dc) dc.close();
        }
      } catch (e) {} finally {
        if (pc) pc.close();
      }
      return supported;
    }();
    this.pack = peerjs_js_binarypack__WEBPACK_IMPORTED_MODULE_0__.pack;
    this.unpack = peerjs_js_binarypack__WEBPACK_IMPORTED_MODULE_0__.unpack;
    // Binary stuff
    this._dataCount = 1;
  }
  Util.prototype.noop = function () {};
  // Ensure alphanumeric ids
  Util.prototype.validateId = function (id) {
    // Allow empty ids
    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(id);
  };
  Util.prototype.chunk = function (blob) {
    var chunks = [];
    var size = blob.size;
    var total = Math.ceil(size / $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU);
    var index = 0;
    var start = 0;
    while (start < size) {
      var end = Math.min(size, start + $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU);
      var b = blob.slice(start, end);
      var chunk = {
        __peerData: this._dataCount,
        n: index,
        data: b,
        total: total
      };
      chunks.push(chunk);
      start = end;
      index++;
    }
    this._dataCount++;
    return chunks;
  };
  Util.prototype.blobToArrayBuffer = function (blob, cb) {
    var fr = new FileReader();
    fr.onload = function (evt) {
      if (evt.target) cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
    return fr;
  };
  Util.prototype.binaryStringToArrayBuffer = function (binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) byteArray[i] = binary.charCodeAt(i) & 0xff;
    return byteArray.buffer;
  };
  Util.prototype.randomToken = function () {
    return Math.random().toString(36).slice(2);
  };
  Util.prototype.isSecure = function () {
    return location.protocol === "https:";
  };
  return Util;
}();
var $06cb531ed7840f78$export$7debb50ef11d5e0b = new $06cb531ed7840f78$var$Util();
var $26088d7da5b03f69$exports = {};
$parcel$export($26088d7da5b03f69$exports, "Peer", () => $26088d7da5b03f69$export$ecd1fc136c422448, v => $26088d7da5b03f69$export$ecd1fc136c422448 = v);
var $ac9b757d51178e15$exports = {};
'use strict';
var $ac9b757d51178e15$var$has = Object.prototype.hasOwnProperty,
  $ac9b757d51178e15$var$prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function $ac9b757d51178e15$var$Events() {}
//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  $ac9b757d51178e15$var$Events.prototype = Object.create(null);
  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new $ac9b757d51178e15$var$Events().__proto__) $ac9b757d51178e15$var$prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function $ac9b757d51178e15$var$EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function $ac9b757d51178e15$var$addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') throw new TypeError('The listener must be a function');
  var listener = new $ac9b757d51178e15$var$EE(fn, context || emitter, once),
    evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
  return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function $ac9b757d51178e15$var$clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new $ac9b757d51178e15$var$Events();else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function $ac9b757d51178e15$var$EventEmitter() {
  this._events = new $ac9b757d51178e15$var$Events();
  this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
    events,
    name;
  if (this._eventsCount === 0) return names;
  for (name in events = this._events) if ($ac9b757d51178e15$var$has.call(events, name)) names.push($ac9b757d51178e15$var$prefix ? name.slice(1) : name);
  if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
  return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.listeners = function listeners(event) {
  var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event,
    handlers = this._events[evt];
  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];
  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
  return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event,
    listeners = this._events[evt];
  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
  if (!this._events[evt]) return false;
  var listeners = this._events[evt],
    len = arguments.length,
    args,
    i;
  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;
      case 2:
        return listeners.fn.call(listeners.context, a1), true;
      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;
      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }
    for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
      j;
    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);
          break;
        case 2:
          listeners[i].fn.call(listeners[i].context, a1);
          break;
        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);
          break;
        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);
          break;
        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }
  return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.on = function on(event, fn, context) {
  return $ac9b757d51178e15$var$addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.once = function once(event, fn, context) {
  return $ac9b757d51178e15$var$addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
  if (!this._events[evt]) return this;
  if (!fn) {
    $ac9b757d51178e15$var$clearEvent(this, evt);
    return this;
  }
  var listeners = this._events[evt];
  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) $ac9b757d51178e15$var$clearEvent(this, evt);
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else $ac9b757d51178e15$var$clearEvent(this, evt);
  }
  return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
$ac9b757d51178e15$var$EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;
  if (event) {
    evt = $ac9b757d51178e15$var$prefix ? $ac9b757d51178e15$var$prefix + event : event;
    if (this._events[evt]) $ac9b757d51178e15$var$clearEvent(this, evt);
  } else {
    this._events = new $ac9b757d51178e15$var$Events();
    this._eventsCount = 0;
  }
  return this;
};
//
// Alias methods names because people roll like that.
//
$ac9b757d51178e15$var$EventEmitter.prototype.off = $ac9b757d51178e15$var$EventEmitter.prototype.removeListener;
$ac9b757d51178e15$var$EventEmitter.prototype.addListener = $ac9b757d51178e15$var$EventEmitter.prototype.on;
//
// Expose the prefix.
//
$ac9b757d51178e15$var$EventEmitter.prefixed = $ac9b757d51178e15$var$prefix;
//
// Allow `EventEmitter` to be imported as module namespace.
//
$ac9b757d51178e15$var$EventEmitter.EventEmitter = $ac9b757d51178e15$var$EventEmitter;
$ac9b757d51178e15$exports = $ac9b757d51178e15$var$EventEmitter;
var $1615705ecc6adca3$exports = {};
$parcel$export($1615705ecc6adca3$exports, "LogLevel", () => $1615705ecc6adca3$export$243e62d78d3b544d, v => $1615705ecc6adca3$export$243e62d78d3b544d = v);
$parcel$export($1615705ecc6adca3$exports, "default", () => $1615705ecc6adca3$export$2e2bcd8739ae039, v => $1615705ecc6adca3$export$2e2bcd8739ae039 = v);
var $1615705ecc6adca3$var$__read =  false || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var $1615705ecc6adca3$var$__spreadArray =  false || function (to, from, pack) {
  if (pack || arguments.length === 2) {
    for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var $1615705ecc6adca3$var$LOG_PREFIX = "PeerJS: ";
var $1615705ecc6adca3$export$243e62d78d3b544d;
(function ($1615705ecc6adca3$export$243e62d78d3b544d) {
  $1615705ecc6adca3$export$243e62d78d3b544d[$1615705ecc6adca3$export$243e62d78d3b544d["Disabled"] = 0] = "Disabled";
  $1615705ecc6adca3$export$243e62d78d3b544d[$1615705ecc6adca3$export$243e62d78d3b544d["Errors"] = 1] = "Errors";
  $1615705ecc6adca3$export$243e62d78d3b544d[$1615705ecc6adca3$export$243e62d78d3b544d["Warnings"] = 2] = "Warnings";
  $1615705ecc6adca3$export$243e62d78d3b544d[$1615705ecc6adca3$export$243e62d78d3b544d["All"] = 3] = "All";
})($1615705ecc6adca3$export$243e62d78d3b544d || ($1615705ecc6adca3$export$243e62d78d3b544d = {}));
var $1615705ecc6adca3$var$Logger = /** @class */function () {
  function Logger() {
    this._logLevel = $1615705ecc6adca3$export$243e62d78d3b544d.Disabled;
  }
  Object.defineProperty(Logger.prototype, "logLevel", {
    get: function () {
      return this._logLevel;
    },
    set: function (logLevel) {
      this._logLevel = logLevel;
    },
    enumerable: false,
    configurable: true
  });
  Logger.prototype.log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
    if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.All) this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([$1615705ecc6adca3$export$243e62d78d3b544d.All], $1615705ecc6adca3$var$__read(args), false));
  };
  Logger.prototype.warn = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
    if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Warnings) this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([$1615705ecc6adca3$export$243e62d78d3b544d.Warnings], $1615705ecc6adca3$var$__read(args), false));
  };
  Logger.prototype.error = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
    if (this._logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Errors) this._print.apply(this, $1615705ecc6adca3$var$__spreadArray([$1615705ecc6adca3$export$243e62d78d3b544d.Errors], $1615705ecc6adca3$var$__read(args), false));
  };
  Logger.prototype.setLogFunction = function (fn) {
    this._print = fn;
  };
  Logger.prototype._print = function (logLevel) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) rest[_i - 1] = arguments[_i];
    var copy = $1615705ecc6adca3$var$__spreadArray([$1615705ecc6adca3$var$LOG_PREFIX], $1615705ecc6adca3$var$__read(rest), false);
    for (var i in copy) if (copy[i] instanceof Error) copy[i] = "(" + copy[i].name + ") " + copy[i].message;
    if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.All) console.log.apply(console, $1615705ecc6adca3$var$__spreadArray([], $1615705ecc6adca3$var$__read(copy), false));else if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Warnings) console.warn.apply(console, $1615705ecc6adca3$var$__spreadArray(["WARNING"], $1615705ecc6adca3$var$__read(copy), false));else if (logLevel >= $1615705ecc6adca3$export$243e62d78d3b544d.Errors) console.error.apply(console, $1615705ecc6adca3$var$__spreadArray(["ERROR"], $1615705ecc6adca3$var$__read(copy), false));
  };
  return Logger;
}();
var $1615705ecc6adca3$export$2e2bcd8739ae039 = new $1615705ecc6adca3$var$Logger();
var $31d11a8d122cb4b7$exports = {};
$parcel$export($31d11a8d122cb4b7$exports, "Socket", () => $31d11a8d122cb4b7$export$4798917dbf149b79, v => $31d11a8d122cb4b7$export$4798917dbf149b79 = v);
var $60fadef21a2daafc$export$3157d57b4135e3bc;
(function ($60fadef21a2daafc$export$3157d57b4135e3bc) {
  $60fadef21a2daafc$export$3157d57b4135e3bc["Data"] = "data";
  $60fadef21a2daafc$export$3157d57b4135e3bc["Media"] = "media";
})($60fadef21a2daafc$export$3157d57b4135e3bc || ($60fadef21a2daafc$export$3157d57b4135e3bc = {}));
var $60fadef21a2daafc$export$9547aaa2e39030ff;
(function ($60fadef21a2daafc$export$9547aaa2e39030ff) {
  $60fadef21a2daafc$export$9547aaa2e39030ff["BrowserIncompatible"] = "browser-incompatible";
  $60fadef21a2daafc$export$9547aaa2e39030ff["Disconnected"] = "disconnected";
  $60fadef21a2daafc$export$9547aaa2e39030ff["InvalidID"] = "invalid-id";
  $60fadef21a2daafc$export$9547aaa2e39030ff["InvalidKey"] = "invalid-key";
  $60fadef21a2daafc$export$9547aaa2e39030ff["Network"] = "network";
  $60fadef21a2daafc$export$9547aaa2e39030ff["PeerUnavailable"] = "peer-unavailable";
  $60fadef21a2daafc$export$9547aaa2e39030ff["SslUnavailable"] = "ssl-unavailable";
  $60fadef21a2daafc$export$9547aaa2e39030ff["ServerError"] = "server-error";
  $60fadef21a2daafc$export$9547aaa2e39030ff["SocketError"] = "socket-error";
  $60fadef21a2daafc$export$9547aaa2e39030ff["SocketClosed"] = "socket-closed";
  $60fadef21a2daafc$export$9547aaa2e39030ff["UnavailableID"] = "unavailable-id";
  $60fadef21a2daafc$export$9547aaa2e39030ff["WebRTC"] = "webrtc";
})($60fadef21a2daafc$export$9547aaa2e39030ff || ($60fadef21a2daafc$export$9547aaa2e39030ff = {}));
var $60fadef21a2daafc$export$89f507cf986a947;
(function ($60fadef21a2daafc$export$89f507cf986a947) {
  $60fadef21a2daafc$export$89f507cf986a947["Binary"] = "binary";
  $60fadef21a2daafc$export$89f507cf986a947["BinaryUTF8"] = "binary-utf8";
  $60fadef21a2daafc$export$89f507cf986a947["JSON"] = "json";
})($60fadef21a2daafc$export$89f507cf986a947 || ($60fadef21a2daafc$export$89f507cf986a947 = {}));
var $60fadef21a2daafc$export$3b5c4a4b6354f023;
(function ($60fadef21a2daafc$export$3b5c4a4b6354f023) {
  $60fadef21a2daafc$export$3b5c4a4b6354f023["Message"] = "message";
  $60fadef21a2daafc$export$3b5c4a4b6354f023["Disconnected"] = "disconnected";
  $60fadef21a2daafc$export$3b5c4a4b6354f023["Error"] = "error";
  $60fadef21a2daafc$export$3b5c4a4b6354f023["Close"] = "close";
})($60fadef21a2daafc$export$3b5c4a4b6354f023 || ($60fadef21a2daafc$export$3b5c4a4b6354f023 = {}));
var $60fadef21a2daafc$export$adb4a1754da6f10d;
(function ($60fadef21a2daafc$export$adb4a1754da6f10d) {
  $60fadef21a2daafc$export$adb4a1754da6f10d["Heartbeat"] = "HEARTBEAT";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Candidate"] = "CANDIDATE";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Offer"] = "OFFER";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Answer"] = "ANSWER";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Open"] = "OPEN";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Error"] = "ERROR";
  $60fadef21a2daafc$export$adb4a1754da6f10d["IdTaken"] = "ID-TAKEN";
  $60fadef21a2daafc$export$adb4a1754da6f10d["InvalidKey"] = "INVALID-KEY";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Leave"] = "LEAVE";
  $60fadef21a2daafc$export$adb4a1754da6f10d["Expire"] = "EXPIRE";
})($60fadef21a2daafc$export$adb4a1754da6f10d || ($60fadef21a2daafc$export$adb4a1754da6f10d = {}));
var $0d1ed891c5cb27c0$exports = {};
$0d1ed891c5cb27c0$exports = JSON.parse("{\"name\":\"peerjs\",\"version\":\"1.4.7\",\"keywords\":[\"peerjs\",\"webrtc\",\"p2p\",\"rtc\"],\"description\":\"PeerJS client\",\"homepage\":\"https://peerjs.com\",\"bugs\":{\"url\":\"https://github.com/peers/peerjs/issues\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/peers/peerjs\"},\"license\":\"MIT\",\"contributors\":[\"Michelle Bu <michelle@michellebu.com>\",\"afrokick <devbyru@gmail.com>\",\"ericz <really.ez@gmail.com>\",\"Jairo <kidandcat@gmail.com>\",\"Jonas Gloning <34194370+jonasgloning@users.noreply.github.com>\",\"Jairo Caro-Accino Viciana <jairo@galax.be>\",\"Carlos Caballero <carlos.caballero.gonzalez@gmail.com>\",\"hc <hheennrryy@gmail.com>\",\"Muhammad Asif <capripio@gmail.com>\",\"PrashoonB <prashoonbhattacharjee@gmail.com>\",\"Harsh Bardhan Mishra <47351025+HarshCasper@users.noreply.github.com>\",\"akotynski <aleksanderkotbury@gmail.com>\",\"lmb <i@lmb.io>\",\"Jairooo <jairocaro@msn.com>\",\"Moritz Stückler <moritz.stueckler@gmail.com>\",\"Simon <crydotsnakegithub@gmail.com>\",\"Denis Lukov <denismassters@gmail.com>\",\"Philipp Hancke <fippo@andyet.net>\",\"Hans Oksendahl <hansoksendahl@gmail.com>\",\"Jess <jessachandler@gmail.com>\",\"khankuan <khankuan@gmail.com>\",\"DUODVK <kurmanov.work@gmail.com>\",\"XiZhao <kwang1imsa@gmail.com>\",\"Matthias Lohr <matthias@lohr.me>\",\"=frank tree <=frnktrb@googlemail.com>\",\"Andre Eckardt <aeckardt@outlook.com>\",\"Chris Cowan <agentme49@gmail.com>\",\"Alex Chuev <alex@chuev.com>\",\"alxnull <alxnull@e.mail.de>\",\"Yemel Jardi <angel.jardi@gmail.com>\",\"Ben Parnell <benjaminparnell.94@gmail.com>\",\"Benny Lichtner <bennlich@gmail.com>\",\"fresheneesz <bitetrudpublic@gmail.com>\",\"bob.barstead@exaptive.com <bob.barstead@exaptive.com>\",\"chandika <chandika@gmail.com>\",\"emersion <contact@emersion.fr>\",\"Christopher Van <cvan@users.noreply.github.com>\",\"eddieherm <edhermoso@gmail.com>\",\"Eduardo Pinho <enet4mikeenet@gmail.com>\",\"Evandro Zanatta <ezanatta@tray.net.br>\",\"Gardner Bickford <gardner@users.noreply.github.com>\",\"Gian Luca <gianluca.cecchi@cynny.com>\",\"PatrickJS <github@gdi2290.com>\",\"jonnyf <github@jonathanfoss.co.uk>\",\"Hizkia Felix <hizkifw@gmail.com>\",\"Hristo Oskov <hristo.oskov@gmail.com>\",\"Isaac Madwed <i.madwed@gmail.com>\",\"Ilya Konanykhin <ilya.konanykhin@gmail.com>\",\"jasonbarry <jasbarry@me.com>\",\"Jonathan Burke <jonathan.burke.1311@googlemail.com>\",\"Josh Hamit <josh.hamit@gmail.com>\",\"Jordan Austin <jrax86@gmail.com>\",\"Joel Wetzell <jwetzell@yahoo.com>\",\"xizhao <kevin.wang@cloudera.com>\",\"Alberto Torres <kungfoobar@gmail.com>\",\"Jonathan Mayol <mayoljonathan@gmail.com>\",\"Jefferson Felix <me@jsfelix.dev>\",\"Rolf Erik Lekang <me@rolflekang.com>\",\"Kevin Mai-Husan Chia <mhchia@users.noreply.github.com>\",\"Pepijn de Vos <pepijndevos@gmail.com>\",\"JooYoung <qkdlql@naver.com>\",\"Tobias Speicher <rootcommander@gmail.com>\",\"Steve Blaurock <sblaurock@gmail.com>\",\"Kyrylo Shegeda <shegeda@ualberta.ca>\",\"Diwank Singh Tomer <singh@diwank.name>\",\"Sören Balko <Soeren.Balko@gmail.com>\",\"Arpit Solanki <solankiarpit1997@gmail.com>\",\"Yuki Ito <yuki@gnnk.net>\",\"Artur Zayats <zag2art@gmail.com>\"],\"funding\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/peer\"},\"collective\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/peer\"},\"files\":[\"dist/*\"],\"sideEffects\":[\"lib/global.ts\",\"lib/supports.ts\"],\"main\":\"dist/bundler.cjs\",\"module\":\"dist/bundler.mjs\",\"browser-minified\":\"dist/peerjs.min.js\",\"browser-unminified\":\"dist/peerjs.js\",\"types\":\"dist/types.d.ts\",\"engines\":{\"node\":\">= 10\"},\"targets\":{\"types\":{\"source\":\"lib/exports.ts\"},\"main\":{\"source\":\"lib/exports.ts\",\"sourceMap\":{\"inlineSources\":true}},\"module\":{\"source\":\"lib/exports.ts\",\"includeNodeModules\":[\"eventemitter3\"],\"sourceMap\":{\"inlineSources\":true}},\"browser-minified\":{\"context\":\"browser\",\"outputFormat\":\"global\",\"optimize\":true,\"engines\":{\"browsers\":\"cover 99%, not dead\"},\"source\":\"lib/global.ts\"},\"browser-unminified\":{\"context\":\"browser\",\"outputFormat\":\"global\",\"optimize\":false,\"engines\":{\"browsers\":\"cover 99%, not dead\"},\"source\":\"lib/global.ts\"}},\"scripts\":{\"contributors\":\"git-authors-cli --print=false && prettier --write package.json && git add package.json package-lock.json && git commit -m \\\"chore(contributors): update and sort contributors list\\\"\",\"check\":\"tsc --noEmit\",\"watch\":\"parcel watch\",\"build\":\"rm -rf dist && parcel build\",\"prepublishOnly\":\"npm run build\",\"test\":\"mocha -r ts-node/register -r jsdom-global/register test/**/*.ts\",\"format\":\"prettier --write .\",\"semantic-release\":\"semantic-release\"},\"devDependencies\":{\"@parcel/config-default\":\"^2.5.0\",\"@parcel/packager-ts\":\"^2.5.0\",\"@parcel/transformer-typescript-tsc\":\"^2.5.0\",\"@parcel/transformer-typescript-types\":\"^2.5.0\",\"@semantic-release/changelog\":\"^6.0.1\",\"@semantic-release/git\":\"^10.0.1\",\"@types/chai\":\"^4.3.0\",\"@types/mocha\":\"^9.1.0\",\"@types/node\":\"^17.0.18\",\"chai\":\"^4.3.6\",\"git-authors-cli\":\"^1.0.40\",\"jsdom\":\"^19.0.0\",\"jsdom-global\":\"^3.0.2\",\"mocha\":\"^9.2.0\",\"mock-socket\":\"8.0.5\",\"parcel\":\"^2.5.0\",\"parcel-transformer-tsc-sourcemaps\":\"^1.0.2\",\"prettier\":\"^2.6.2\",\"semantic-release\":\"^19.0.2\",\"standard\":\"^16.0.4\",\"ts-node\":\"^10.5.0\",\"typescript\":\"^4.5.5\"},\"dependencies\":{\"@swc/helpers\":\"^0.3.13\",\"eventemitter3\":\"^4.0.7\",\"peerjs-js-binarypack\":\"1.0.1\",\"webrtc-adapter\":\"^7.7.1\"}}");
var $31d11a8d122cb4b7$var$__extends =  false || function () {
  var extendStatics = function (d1, b1) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var $31d11a8d122cb4b7$var$__read =  false || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var $31d11a8d122cb4b7$var$__spreadArray =  false || function (to, from, pack) {
  if (pack || arguments.length === 2) {
    for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var $31d11a8d122cb4b7$var$__values =  false || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * An abstraction on top of WebSockets to provide fastest
 * possible connection for peers.
 */
var $31d11a8d122cb4b7$export$4798917dbf149b79 = /** @class */function (_super) {
  $31d11a8d122cb4b7$var$__extends($31d11a8d122cb4b7$export$4798917dbf149b79, _super);
  function $31d11a8d122cb4b7$export$4798917dbf149b79(secure, host, port, path, key, pingInterval) {
    if (pingInterval === void 0) pingInterval = 5000;
    var _this = _super.call(this) || this;
    _this.pingInterval = pingInterval;
    _this._disconnected = true;
    _this._messagesQueue = [];
    var wsProtocol = secure ? "wss://" : "ws://";
    _this._baseUrl = wsProtocol + host + ":" + port + path + "peerjs?key=" + key;
    return _this;
  }
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype.start = function (id, token) {
    var _this = this;
    this._id = id;
    var wsUrl = "".concat(this._baseUrl, "&id=").concat(id, "&token=").concat(token);
    if (!!this._socket || !this._disconnected) return;
    this._socket = new WebSocket(wsUrl + "&version=" + $0d1ed891c5cb27c0$exports.version);
    this._disconnected = false;
    this._socket.onmessage = function (event) {
      var data;
      try {
        data = JSON.parse(event.data);
        $1615705ecc6adca3$exports.default.log("Server message received:", data);
      } catch (e) {
        $1615705ecc6adca3$exports.default.log("Invalid server message", event.data);
        return;
      }
      _this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Message, data);
    };
    this._socket.onclose = function (event) {
      if (_this._disconnected) return;
      $1615705ecc6adca3$exports.default.log("Socket closed.", event);
      _this._cleanup();
      _this._disconnected = true;
      _this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Disconnected);
    };
    // Take care of the queue of connections if necessary and make sure Peer knows
    // socket is open.
    this._socket.onopen = function () {
      if (_this._disconnected) return;
      _this._sendQueuedMessages();
      $1615705ecc6adca3$exports.default.log("Socket open");
      _this._scheduleHeartbeat();
    };
  };
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype._scheduleHeartbeat = function () {
    var _this = this;
    this._wsPingTimer = setTimeout(function () {
      _this._sendHeartbeat();
    }, this.pingInterval);
  };
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype._sendHeartbeat = function () {
    if (!this._wsOpen()) {
      $1615705ecc6adca3$exports.default.log("Cannot send heartbeat, because socket closed");
      return;
    }
    var message = JSON.stringify({
      type: $60fadef21a2daafc$export$adb4a1754da6f10d.Heartbeat
    });
    this._socket.send(message);
    this._scheduleHeartbeat();
  };
  /** Is the websocket currently open? */
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype._wsOpen = function () {
    return !!this._socket && this._socket.readyState === 1;
  };
  /** Send queued messages. */
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype._sendQueuedMessages = function () {
    var e_1, _a;
    //Create copy of queue and clear it,
    //because send method push the message back to queue if smth will go wrong
    var copiedQueue = $31d11a8d122cb4b7$var$__spreadArray([], $31d11a8d122cb4b7$var$__read(this._messagesQueue), false);
    this._messagesQueue = [];
    try {
      for (var copiedQueue_1 = $31d11a8d122cb4b7$var$__values(copiedQueue), copiedQueue_1_1 = copiedQueue_1.next(); !copiedQueue_1_1.done; copiedQueue_1_1 = copiedQueue_1.next()) {
        var message = copiedQueue_1_1.value;
        this.send(message);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (copiedQueue_1_1 && !copiedQueue_1_1.done && (_a = copiedQueue_1.return)) _a.call(copiedQueue_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /** Exposed send for DC & Peer. */
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype.send = function (data) {
    if (this._disconnected) return;
    // If we didn't get an ID yet, we can't yet send anything so we should queue
    // up these messages.
    if (!this._id) {
      this._messagesQueue.push(data);
      return;
    }
    if (!data.type) {
      this.emit($60fadef21a2daafc$export$3b5c4a4b6354f023.Error, "Invalid message");
      return;
    }
    if (!this._wsOpen()) return;
    var message = JSON.stringify(data);
    this._socket.send(message);
  };
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype.close = function () {
    if (this._disconnected) return;
    this._cleanup();
    this._disconnected = true;
  };
  $31d11a8d122cb4b7$export$4798917dbf149b79.prototype._cleanup = function () {
    if (this._socket) {
      this._socket.onopen = this._socket.onmessage = this._socket.onclose = null;
      this._socket.close();
      this._socket = undefined;
    }
    clearTimeout(this._wsPingTimer);
  };
  return $31d11a8d122cb4b7$export$4798917dbf149b79;
}($ac9b757d51178e15$exports.EventEmitter);
var $353dee38f9ab557b$exports = {};
$parcel$export($353dee38f9ab557b$exports, "MediaConnection", () => $353dee38f9ab557b$export$4a84e95a2324ac29, v => $353dee38f9ab557b$export$4a84e95a2324ac29 = v);
var $77f14d3e81888156$exports = {};
$parcel$export($77f14d3e81888156$exports, "Negotiator", () => $77f14d3e81888156$export$89e6bb5ad64bf4a, v => $77f14d3e81888156$export$89e6bb5ad64bf4a = v);
var $77f14d3e81888156$var$__assign =  false || function () {
  $77f14d3e81888156$var$__assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return $77f14d3e81888156$var$__assign.apply(this, arguments);
};
var $77f14d3e81888156$var$__awaiter =  false || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var $77f14d3e81888156$var$__generator =  false || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
/**
 * Manages all negotiations between Peers.
 */
var $77f14d3e81888156$export$89e6bb5ad64bf4a = /** @class */function () {
  function $77f14d3e81888156$export$89e6bb5ad64bf4a(connection) {
    this.connection = connection;
  }
  /** Returns a PeerConnection object set up correctly (for data, media). */
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype.startConnection = function (options) {
    var peerConnection = this._startPeerConnection();
    // Set the connection's PC.
    this.connection.peerConnection = peerConnection;
    if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media && options._stream) this._addTracksToConnection(options._stream, peerConnection);
    // What do we need to do now?
    if (options.originator) {
      if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
        var dataConnection = this.connection;
        var config = {
          ordered: !!options.reliable
        };
        var dataChannel = peerConnection.createDataChannel(dataConnection.label, config);
        dataConnection.initialize(dataChannel);
      }
      this._makeOffer();
    } else this.handleSDP("OFFER", options.sdp);
  };
  /** Start a PC. */
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype._startPeerConnection = function () {
    $1615705ecc6adca3$exports.default.log("Creating RTCPeerConnection.");
    var peerConnection = new RTCPeerConnection(this.connection.provider.options.config);
    this._setupListeners(peerConnection);
    return peerConnection;
  };
  /** Set up various WebRTC listeners. */
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype._setupListeners = function (peerConnection) {
    var _this = this;
    var peerId = this.connection.peer;
    var connectionId = this.connection.connectionId;
    var connectionType = this.connection.type;
    var provider = this.connection.provider;
    // ICE CANDIDATES.
    $1615705ecc6adca3$exports.default.log("Listening for ICE candidates.");
    peerConnection.onicecandidate = function (evt) {
      if (!evt.candidate || !evt.candidate.candidate) return;
      $1615705ecc6adca3$exports.default.log("Received ICE candidates for ".concat(peerId, ":"), evt.candidate);
      provider.socket.send({
        type: $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate,
        payload: {
          candidate: evt.candidate,
          type: connectionType,
          connectionId: connectionId
        },
        dst: peerId
      });
    };
    peerConnection.oniceconnectionstatechange = function () {
      switch (peerConnection.iceConnectionState) {
        case "failed":
          $1615705ecc6adca3$exports.default.log("iceConnectionState is failed, closing connections to " + peerId);
          _this.connection.emit("error", new Error("Negotiation of connection to " + peerId + " failed."));
          _this.connection.close();
          break;
        case "closed":
          $1615705ecc6adca3$exports.default.log("iceConnectionState is closed, closing connections to " + peerId);
          _this.connection.emit("error", new Error("Connection to " + peerId + " closed."));
          _this.connection.close();
          break;
        case "disconnected":
          $1615705ecc6adca3$exports.default.log("iceConnectionState changed to disconnected on the connection with " + peerId);
          break;
        case "completed":
          peerConnection.onicecandidate = $06cb531ed7840f78$export$7debb50ef11d5e0b.noop;
          break;
      }
      _this.connection.emit("iceStateChanged", peerConnection.iceConnectionState);
    };
    // DATACONNECTION.
    $1615705ecc6adca3$exports.default.log("Listening for data channel");
    // Fired between offer and answer, so options should already be saved
    // in the options hash.
    peerConnection.ondatachannel = function (evt) {
      $1615705ecc6adca3$exports.default.log("Received data channel");
      var dataChannel = evt.channel;
      var connection = provider.getConnection(peerId, connectionId);
      connection.initialize(dataChannel);
    };
    // MEDIACONNECTION.
    $1615705ecc6adca3$exports.default.log("Listening for remote stream");
    peerConnection.ontrack = function (evt) {
      $1615705ecc6adca3$exports.default.log("Received remote stream");
      var stream = evt.streams[0];
      var connection = provider.getConnection(peerId, connectionId);
      if (connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media) {
        var mediaConnection = connection;
        _this._addStreamToMediaConnection(stream, mediaConnection);
      }
    };
  };
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype.cleanup = function () {
    $1615705ecc6adca3$exports.default.log("Cleaning up PeerConnection to " + this.connection.peer);
    var peerConnection = this.connection.peerConnection;
    if (!peerConnection) return;
    this.connection.peerConnection = null;
    //unsubscribe from all PeerConnection's events
    peerConnection.onicecandidate = peerConnection.oniceconnectionstatechange = peerConnection.ondatachannel = peerConnection.ontrack = function () {};
    var peerConnectionNotClosed = peerConnection.signalingState !== "closed";
    var dataChannelNotClosed = false;
    if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
      var dataConnection = this.connection;
      var dataChannel = dataConnection.dataChannel;
      if (dataChannel) dataChannelNotClosed = !!dataChannel.readyState && dataChannel.readyState !== "closed";
    }
    if (peerConnectionNotClosed || dataChannelNotClosed) peerConnection.close();
  };
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype._makeOffer = function () {
    return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function () {
      var peerConnection, provider, offer, payload, dataConnection, err_2, err_1_1;
      return $77f14d3e81888156$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            peerConnection = this.connection.peerConnection;
            provider = this.connection.provider;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 7,, 8]);
            return [4 /*yield*/, peerConnection.createOffer(this.connection.options.constraints)];
          case 2:
            offer = _a.sent();
            $1615705ecc6adca3$exports.default.log("Created offer.");
            if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") offer.sdp = this.connection.options.sdpTransform(offer.sdp) || offer.sdp;
            _a.label = 3;
          case 3:
            _a.trys.push([3, 5,, 6]);
            return [4 /*yield*/, peerConnection.setLocalDescription(offer)];
          case 4:
            _a.sent();
            $1615705ecc6adca3$exports.default.log("Set localDescription:", offer, "for:".concat(this.connection.peer));
            payload = {
              sdp: offer,
              type: this.connection.type,
              connectionId: this.connection.connectionId,
              metadata: this.connection.metadata,
              browser: $06cb531ed7840f78$export$7debb50ef11d5e0b.browser
            };
            if (this.connection.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
              dataConnection = this.connection;
              payload = $77f14d3e81888156$var$__assign($77f14d3e81888156$var$__assign({}, payload), {
                label: dataConnection.label,
                reliable: dataConnection.reliable,
                serialization: dataConnection.serialization
              });
            }
            provider.socket.send({
              type: $60fadef21a2daafc$export$adb4a1754da6f10d.Offer,
              payload: payload,
              dst: this.connection.peer
            });
            return [3 /*break*/, 6];
          case 5:
            err_2 = _a.sent();
            // TODO: investigate why _makeOffer is being called from the answer
            if (err_2 != "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer") {
              provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_2);
              $1615705ecc6adca3$exports.default.log("Failed to setLocalDescription, ", err_2);
            }
            return [3 /*break*/, 6];
          case 6:
            return [3 /*break*/, 8];
          case 7:
            err_1_1 = _a.sent();
            provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_1_1);
            $1615705ecc6adca3$exports.default.log("Failed to createOffer, ", err_1_1);
            return [3 /*break*/, 8];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };

  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype._makeAnswer = function () {
    return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function () {
      var peerConnection, provider, answer, err_3, err_1_2;
      return $77f14d3e81888156$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            peerConnection = this.connection.peerConnection;
            provider = this.connection.provider;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 7,, 8]);
            return [4 /*yield*/, peerConnection.createAnswer()];
          case 2:
            answer = _a.sent();
            $1615705ecc6adca3$exports.default.log("Created answer.");
            if (this.connection.options.sdpTransform && typeof this.connection.options.sdpTransform === "function") answer.sdp = this.connection.options.sdpTransform(answer.sdp) || answer.sdp;
            _a.label = 3;
          case 3:
            _a.trys.push([3, 5,, 6]);
            return [4 /*yield*/, peerConnection.setLocalDescription(answer)];
          case 4:
            _a.sent();
            $1615705ecc6adca3$exports.default.log("Set localDescription:", answer, "for:".concat(this.connection.peer));
            provider.socket.send({
              type: $60fadef21a2daafc$export$adb4a1754da6f10d.Answer,
              payload: {
                sdp: answer,
                type: this.connection.type,
                connectionId: this.connection.connectionId,
                browser: $06cb531ed7840f78$export$7debb50ef11d5e0b.browser
              },
              dst: this.connection.peer
            });
            return [3 /*break*/, 6];
          case 5:
            err_3 = _a.sent();
            provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_3);
            $1615705ecc6adca3$exports.default.log("Failed to setLocalDescription, ", err_3);
            return [3 /*break*/, 6];
          case 6:
            return [3 /*break*/, 8];
          case 7:
            err_1_2 = _a.sent();
            provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_1_2);
            $1615705ecc6adca3$exports.default.log("Failed to create answer, ", err_1_2);
            return [3 /*break*/, 8];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  /** Handle an SDP. */
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype.handleSDP = function (type, sdp) {
    return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function () {
      var peerConnection, provider, self, err_4;
      return $77f14d3e81888156$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            sdp = new RTCSessionDescription(sdp);
            peerConnection = this.connection.peerConnection;
            provider = this.connection.provider;
            $1615705ecc6adca3$exports.default.log("Setting remote description", sdp);
            self = this;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 5,, 6]);
            return [4 /*yield*/, peerConnection.setRemoteDescription(sdp)];
          case 2:
            _a.sent();
            $1615705ecc6adca3$exports.default.log("Set remoteDescription:".concat(type, " for:").concat(this.connection.peer));
            if (!(type === "OFFER")) return [3 /*break*/, 4];
            return [4 /*yield*/, self._makeAnswer()];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            err_4 = _a.sent();
            provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_4);
            $1615705ecc6adca3$exports.default.log("Failed to setRemoteDescription, ", err_4);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  /** Handle a candidate. */
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype.handleCandidate = function (ice) {
    return $77f14d3e81888156$var$__awaiter(this, void 0, Promise, function () {
      var candidate, sdpMLineIndex, sdpMid, peerConnection, provider, err_5;
      return $77f14d3e81888156$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            $1615705ecc6adca3$exports.default.log("handleCandidate:", ice);
            candidate = ice.candidate;
            sdpMLineIndex = ice.sdpMLineIndex;
            sdpMid = ice.sdpMid;
            peerConnection = this.connection.peerConnection;
            provider = this.connection.provider;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3,, 4]);
            return [4 /*yield*/, peerConnection.addIceCandidate(new RTCIceCandidate({
              sdpMid: sdpMid,
              sdpMLineIndex: sdpMLineIndex,
              candidate: candidate
            }))];
          case 2:
            _a.sent();
            $1615705ecc6adca3$exports.default.log("Added ICE candidate for:".concat(this.connection.peer));
            return [3 /*break*/, 4];
          case 3:
            err_5 = _a.sent();
            provider.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.WebRTC, err_5);
            $1615705ecc6adca3$exports.default.log("Failed to handleCandidate, ", err_5);
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };

  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype._addTracksToConnection = function (stream, peerConnection) {
    $1615705ecc6adca3$exports.default.log("add tracks from stream ".concat(stream.id, " to peer connection"));
    if (!peerConnection.addTrack) return $1615705ecc6adca3$exports.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
    stream.getTracks().forEach(function (track) {
      peerConnection.addTrack(track, stream);
    });
  };
  $77f14d3e81888156$export$89e6bb5ad64bf4a.prototype._addStreamToMediaConnection = function (stream, mediaConnection) {
    $1615705ecc6adca3$exports.default.log("add stream ".concat(stream.id, " to media connection ").concat(mediaConnection.connectionId));
    mediaConnection.addStream(stream);
  };
  return $77f14d3e81888156$export$89e6bb5ad64bf4a;
}();
var $0b3b332fd86c5202$exports = {};
$parcel$export($0b3b332fd86c5202$exports, "BaseConnection", () => $0b3b332fd86c5202$export$23a2a68283c24d80, v => $0b3b332fd86c5202$export$23a2a68283c24d80 = v);
var $0b3b332fd86c5202$var$__extends =  false || function () {
  var extendStatics = function (d1, b1) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var $0b3b332fd86c5202$export$23a2a68283c24d80 = /** @class */function (_super) {
  $0b3b332fd86c5202$var$__extends($0b3b332fd86c5202$export$23a2a68283c24d80, _super);
  function $0b3b332fd86c5202$export$23a2a68283c24d80(peer, provider, options) {
    var _this = _super.call(this) || this;
    _this.peer = peer;
    _this.provider = provider;
    _this.options = options;
    _this._open = false;
    _this.metadata = options.metadata;
    return _this;
  }
  Object.defineProperty($0b3b332fd86c5202$export$23a2a68283c24d80.prototype, "open", {
    get: function () {
      return this._open;
    },
    enumerable: false,
    configurable: true
  });
  return $0b3b332fd86c5202$export$23a2a68283c24d80;
}($ac9b757d51178e15$exports.EventEmitter);
var $353dee38f9ab557b$var$__extends =  false || function () {
  var extendStatics = function (d1, b1) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var $353dee38f9ab557b$var$__assign =  false || function () {
  $353dee38f9ab557b$var$__assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return $353dee38f9ab557b$var$__assign.apply(this, arguments);
};
var $353dee38f9ab557b$var$__values =  false || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps the streaming interface between two Peers.
 */
var $353dee38f9ab557b$export$4a84e95a2324ac29 = /** @class */function (_super) {
  $353dee38f9ab557b$var$__extends($353dee38f9ab557b$export$4a84e95a2324ac29, _super);
  function $353dee38f9ab557b$export$4a84e95a2324ac29(peerId, provider, options) {
    var _this = _super.call(this, peerId, provider, options) || this;
    _this._localStream = _this.options._stream;
    _this.connectionId = _this.options.connectionId || $353dee38f9ab557b$export$4a84e95a2324ac29.ID_PREFIX + $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken();
    _this._negotiator = new $77f14d3e81888156$exports.Negotiator(_this);
    if (_this._localStream) _this._negotiator.startConnection({
      _stream: _this._localStream,
      originator: true
    });
    return _this;
  }
  Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac29.prototype, "type", {
    get: function () {
      return $60fadef21a2daafc$export$3157d57b4135e3bc.Media;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac29.prototype, "localStream", {
    get: function () {
      return this._localStream;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($353dee38f9ab557b$export$4a84e95a2324ac29.prototype, "remoteStream", {
    get: function () {
      return this._remoteStream;
    },
    enumerable: false,
    configurable: true
  });
  $353dee38f9ab557b$export$4a84e95a2324ac29.prototype.addStream = function (remoteStream) {
    $1615705ecc6adca3$exports.default.log("Receiving stream", remoteStream);
    this._remoteStream = remoteStream;
    _super.prototype.emit.call(this, "stream", remoteStream); // Should we call this `open`?
  };

  $353dee38f9ab557b$export$4a84e95a2324ac29.prototype.handleMessage = function (message) {
    var type = message.type;
    var payload = message.payload;
    switch (message.type) {
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Answer:
        // Forward to negotiator
        this._negotiator.handleSDP(type, payload.sdp);
        this._open = true;
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate:
        this._negotiator.handleCandidate(payload.candidate);
        break;
      default:
        $1615705ecc6adca3$exports.default.warn("Unrecognized message type:".concat(type, " from peer:").concat(this.peer));
        break;
    }
  };
  $353dee38f9ab557b$export$4a84e95a2324ac29.prototype.answer = function (stream, options) {
    var e_1, _a;
    if (options === void 0) options = {};
    if (this._localStream) {
      $1615705ecc6adca3$exports.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");
      return;
    }
    this._localStream = stream;
    if (options && options.sdpTransform) this.options.sdpTransform = options.sdpTransform;
    this._negotiator.startConnection($353dee38f9ab557b$var$__assign($353dee38f9ab557b$var$__assign({}, this.options._payload), {
      _stream: stream
    }));
    // Retrieve lost messages stored because PeerConnection not set up.
    var messages = this.provider._getMessages(this.connectionId);
    try {
      for (var messages_1 = $353dee38f9ab557b$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
        var message = messages_1_1.value;
        this.handleMessage(message);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    this._open = true;
  };
  /**
   * Exposed functionality for users.
   */ /** Allows user to close connection. */
  $353dee38f9ab557b$export$4a84e95a2324ac29.prototype.close = function () {
    if (this._negotiator) {
      this._negotiator.cleanup();
      this._negotiator = null;
    }
    this._localStream = null;
    this._remoteStream = null;
    if (this.provider) {
      this.provider._removeConnection(this);
      this.provider = null;
    }
    if (this.options && this.options._stream) this.options._stream = null;
    if (!this.open) return;
    this._open = false;
    _super.prototype.emit.call(this, "close");
  };
  $353dee38f9ab557b$export$4a84e95a2324ac29.ID_PREFIX = "mc_";
  return $353dee38f9ab557b$export$4a84e95a2324ac29;
}($0b3b332fd86c5202$exports.BaseConnection);
var $3356170d7bce7f20$exports = {};
$parcel$export($3356170d7bce7f20$exports, "DataConnection", () => $3356170d7bce7f20$export$d365f7ad9d7df9c9, v => $3356170d7bce7f20$export$d365f7ad9d7df9c9 = v);
var $3014d862dcc9946b$exports = {};
$parcel$export($3014d862dcc9946b$exports, "EncodingQueue", () => $3014d862dcc9946b$export$c6913ae0ed687038, v => $3014d862dcc9946b$export$c6913ae0ed687038 = v);
var $3014d862dcc9946b$var$__extends =  false || function () {
  var extendStatics = function (d1, b1) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var $3014d862dcc9946b$export$c6913ae0ed687038 = /** @class */function (_super) {
  $3014d862dcc9946b$var$__extends($3014d862dcc9946b$export$c6913ae0ed687038, _super);
  function $3014d862dcc9946b$export$c6913ae0ed687038() {
    var _this = _super.call(this) || this;
    _this.fileReader = new FileReader();
    _this._queue = [];
    _this._processing = false;
    _this.fileReader.onload = function (evt) {
      _this._processing = false;
      if (evt.target) _this.emit("done", evt.target.result);
      _this.doNextTask();
    };
    _this.fileReader.onerror = function (evt) {
      $1615705ecc6adca3$exports.default.error("EncodingQueue error:", evt);
      _this._processing = false;
      _this.destroy();
      _this.emit("error", evt);
    };
    return _this;
  }
  Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed687038.prototype, "queue", {
    get: function () {
      return this._queue;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed687038.prototype, "size", {
    get: function () {
      return this.queue.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($3014d862dcc9946b$export$c6913ae0ed687038.prototype, "processing", {
    get: function () {
      return this._processing;
    },
    enumerable: false,
    configurable: true
  });
  $3014d862dcc9946b$export$c6913ae0ed687038.prototype.enque = function (blob) {
    this.queue.push(blob);
    if (this.processing) return;
    this.doNextTask();
  };
  $3014d862dcc9946b$export$c6913ae0ed687038.prototype.destroy = function () {
    this.fileReader.abort();
    this._queue = [];
  };
  $3014d862dcc9946b$export$c6913ae0ed687038.prototype.doNextTask = function () {
    if (this.size === 0) return;
    if (this.processing) return;
    this._processing = true;
    this.fileReader.readAsArrayBuffer(this.queue.shift());
  };
  return $3014d862dcc9946b$export$c6913ae0ed687038;
}($ac9b757d51178e15$exports.EventEmitter);
var $3356170d7bce7f20$var$__extends =  false || function () {
  var extendStatics = function (d1, b1) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var $3356170d7bce7f20$var$__values =  false || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Wraps a DataChannel between two Peers.
 */
var $3356170d7bce7f20$export$d365f7ad9d7df9c9 = /** @class */function (_super) {
  $3356170d7bce7f20$var$__extends($3356170d7bce7f20$export$d365f7ad9d7df9c9, _super);
  function $3356170d7bce7f20$export$d365f7ad9d7df9c9(peerId, provider, options) {
    var _this = _super.call(this, peerId, provider, options) || this;
    _this.stringify = JSON.stringify;
    _this.parse = JSON.parse;
    _this._buffer = [];
    _this._bufferSize = 0;
    _this._buffering = false;
    _this._chunkedData = {};
    _this._encodingQueue = new $3014d862dcc9946b$exports.EncodingQueue();
    _this.connectionId = _this.options.connectionId || $3356170d7bce7f20$export$d365f7ad9d7df9c9.ID_PREFIX + $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken();
    _this.label = _this.options.label || _this.connectionId;
    _this.serialization = _this.options.serialization || $60fadef21a2daafc$export$89f507cf986a947.Binary;
    _this.reliable = !!_this.options.reliable;
    _this._encodingQueue.on("done", function (ab) {
      _this._bufferedSend(ab);
    });
    _this._encodingQueue.on("error", function () {
      $1615705ecc6adca3$exports.default.error("DC#".concat(_this.connectionId, ": Error occured in encoding from blob to arraybuffer, close DC"));
      _this.close();
    });
    _this._negotiator = new $77f14d3e81888156$exports.Negotiator(_this);
    _this._negotiator.startConnection(_this.options._payload || {
      originator: true
    });
    return _this;
  }
  Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype, "type", {
    get: function () {
      return $60fadef21a2daafc$export$3157d57b4135e3bc.Data;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype, "dataChannel", {
    get: function () {
      return this._dc;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype, "bufferSize", {
    get: function () {
      return this._bufferSize;
    },
    enumerable: false,
    configurable: true
  });
  /** Called by the Negotiator when the DataChannel is ready. */
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype.initialize = function (dc) {
    this._dc = dc;
    this._configureDataChannel();
  };
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._configureDataChannel = function () {
    var _this = this;
    if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.binaryBlob || $06cb531ed7840f78$export$7debb50ef11d5e0b.supports.reliable) this.dataChannel.binaryType = "arraybuffer";
    this.dataChannel.onopen = function () {
      $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc connection success"));
      _this._open = true;
      _this.emit("open");
    };
    this.dataChannel.onmessage = function (e) {
      $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc onmessage:"), e.data);
      _this._handleDataMessage(e);
    };
    this.dataChannel.onclose = function () {
      $1615705ecc6adca3$exports.default.log("DC#".concat(_this.connectionId, " dc closed for:"), _this.peer);
      _this.close();
    };
  };
  // Handles a DataChannel message.
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._handleDataMessage = function (_a) {
    var _this = this;
    var data = _a.data;
    var datatype = data.constructor;
    var isBinarySerialization = this.serialization === $60fadef21a2daafc$export$89f507cf986a947.Binary || this.serialization === $60fadef21a2daafc$export$89f507cf986a947.BinaryUTF8;
    var deserializedData = data;
    if (isBinarySerialization) {
      if (datatype === Blob) {
        // Datatype should never be blob
        $06cb531ed7840f78$export$7debb50ef11d5e0b.blobToArrayBuffer(data, function (ab) {
          var unpackedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(ab);
          _this.emit("data", unpackedData);
        });
        return;
      } else if (datatype === ArrayBuffer) deserializedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(data);else if (datatype === String) {
        // String fallback for binary data for browsers that don't support binary yet
        var ab1 = $06cb531ed7840f78$export$7debb50ef11d5e0b.binaryStringToArrayBuffer(data);
        deserializedData = $06cb531ed7840f78$export$7debb50ef11d5e0b.unpack(ab1);
      }
    } else if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.JSON) deserializedData = this.parse(data);
    // Check if we've chunked--if so, piece things back together.
    // We're guaranteed that this isn't 0.
    if (deserializedData.__peerData) {
      this._handleChunk(deserializedData);
      return;
    }
    _super.prototype.emit.call(this, "data", deserializedData);
  };
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._handleChunk = function (data) {
    var id = data.__peerData;
    var chunkInfo = this._chunkedData[id] || {
      data: [],
      count: 0,
      total: data.total
    };
    chunkInfo.data[data.n] = data.data;
    chunkInfo.count++;
    this._chunkedData[id] = chunkInfo;
    if (chunkInfo.total === chunkInfo.count) {
      // Clean up before making the recursive call to `_handleDataMessage`.
      delete this._chunkedData[id];
      // We've received all the chunks--time to construct the complete data.
      var data_1 = new Blob(chunkInfo.data);
      this._handleDataMessage({
        data: data_1
      });
    }
  };
  /**
   * Exposed functionality for users.
   */ /** Allows user to close connection. */
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype.close = function () {
    this._buffer = [];
    this._bufferSize = 0;
    this._chunkedData = {};
    if (this._negotiator) {
      this._negotiator.cleanup();
      this._negotiator = null;
    }
    if (this.provider) {
      this.provider._removeConnection(this);
      this.provider = null;
    }
    if (this.dataChannel) {
      this.dataChannel.onopen = null;
      this.dataChannel.onmessage = null;
      this.dataChannel.onclose = null;
      this._dc = null;
    }
    if (this._encodingQueue) {
      this._encodingQueue.destroy();
      this._encodingQueue.removeAllListeners();
      this._encodingQueue = null;
    }
    if (!this.open) return;
    this._open = false;
    _super.prototype.emit.call(this, "close");
  };
  /** Allows user to send data. */
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype.send = function (data, chunked) {
    if (!this.open) {
      _super.prototype.emit.call(this, "error", new Error("Connection is not open. You should listen for the `open` event before sending messages."));
      return;
    }
    if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.JSON) this._bufferedSend(this.stringify(data));else if (this.serialization === $60fadef21a2daafc$export$89f507cf986a947.Binary || this.serialization === $60fadef21a2daafc$export$89f507cf986a947.BinaryUTF8) {
      var blob = $06cb531ed7840f78$export$7debb50ef11d5e0b.pack(data);
      if (!chunked && blob.size > $06cb531ed7840f78$export$7debb50ef11d5e0b.chunkedMTU) {
        this._sendChunks(blob);
        return;
      }
      if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.binaryBlob)
        // We only do this if we really need to (e.g. blobs are not supported),
        // because this conversion is costly.
        this._encodingQueue.enque(blob);else this._bufferedSend(blob);
    } else this._bufferedSend(data);
  };
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._bufferedSend = function (msg) {
    if (this._buffering || !this._trySend(msg)) {
      this._buffer.push(msg);
      this._bufferSize = this._buffer.length;
    }
  };
  // Returns true if the send succeeds.
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._trySend = function (msg) {
    var _this = this;
    if (!this.open) return false;
    if (this.dataChannel.bufferedAmount > $3356170d7bce7f20$export$d365f7ad9d7df9c9.MAX_BUFFERED_AMOUNT) {
      this._buffering = true;
      setTimeout(function () {
        _this._buffering = false;
        _this._tryBuffer();
      }, 50);
      return false;
    }
    try {
      this.dataChannel.send(msg);
    } catch (e) {
      $1615705ecc6adca3$exports.default.error("DC#:".concat(this.connectionId, " Error when sending:"), e);
      this._buffering = true;
      this.close();
      return false;
    }
    return true;
  };
  // Try to send the first message in the buffer.
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._tryBuffer = function () {
    if (!this.open) return;
    if (this._buffer.length === 0) return;
    var msg = this._buffer[0];
    if (this._trySend(msg)) {
      this._buffer.shift();
      this._bufferSize = this._buffer.length;
      this._tryBuffer();
    }
  };
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype._sendChunks = function (blob) {
    var e_1, _a;
    var blobs = $06cb531ed7840f78$export$7debb50ef11d5e0b.chunk(blob);
    $1615705ecc6adca3$exports.default.log("DC#".concat(this.connectionId, " Try to send ").concat(blobs.length, " chunks..."));
    try {
      for (var blobs_1 = $3356170d7bce7f20$var$__values(blobs), blobs_1_1 = blobs_1.next(); !blobs_1_1.done; blobs_1_1 = blobs_1.next()) {
        var blob_1 = blobs_1_1.value;
        this.send(blob_1, true);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (blobs_1_1 && !blobs_1_1.done && (_a = blobs_1.return)) _a.call(blobs_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.prototype.handleMessage = function (message) {
    var payload = message.payload;
    switch (message.type) {
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Answer:
        this._negotiator.handleSDP(message.type, payload.sdp);
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Candidate:
        this._negotiator.handleCandidate(payload.candidate);
        break;
      default:
        $1615705ecc6adca3$exports.default.warn("Unrecognized message type:", message.type, "from peer:", this.peer);
        break;
    }
  };
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.ID_PREFIX = "dc_";
  $3356170d7bce7f20$export$d365f7ad9d7df9c9.MAX_BUFFERED_AMOUNT = 8388608;
  return $3356170d7bce7f20$export$d365f7ad9d7df9c9;
}($0b3b332fd86c5202$exports.BaseConnection);
var $9e85b3e1327369e6$exports = {};
$parcel$export($9e85b3e1327369e6$exports, "API", () => $9e85b3e1327369e6$export$2c4e825dc9120f87, v => $9e85b3e1327369e6$export$2c4e825dc9120f87 = v);
var $9e85b3e1327369e6$var$__awaiter =  false || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var $9e85b3e1327369e6$var$__generator =  false || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var $9e85b3e1327369e6$export$2c4e825dc9120f87 = /** @class */function () {
  function $9e85b3e1327369e6$export$2c4e825dc9120f87(_options) {
    this._options = _options;
  }
  $9e85b3e1327369e6$export$2c4e825dc9120f87.prototype._buildRequest = function (method) {
    var protocol = this._options.secure ? "https" : "http";
    var _a = this._options,
      host = _a.host,
      port = _a.port,
      path = _a.path,
      key = _a.key;
    var url = new URL("".concat(protocol, "://").concat(host, ":").concat(port).concat(path).concat(key, "/").concat(method));
    // TODO: Why timestamp, why random?
    url.searchParams.set("ts", "".concat(Date.now()).concat(Math.random()));
    url.searchParams.set("version", $0d1ed891c5cb27c0$exports.version);
    return fetch(url.href, {
      referrerPolicy: this._options.referrerPolicy
    });
  };
  /** Get a unique ID from the server via XHR and initialize with it. */
  $9e85b3e1327369e6$export$2c4e825dc9120f87.prototype.retrieveId = function () {
    return $9e85b3e1327369e6$var$__awaiter(this, void 0, Promise, function () {
      var response, error_1, pathError;
      return $9e85b3e1327369e6$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4 /*yield*/, this._buildRequest("id")];
          case 1:
            response = _a.sent();
            if (response.status !== 200) throw new Error("Error. Status:".concat(response.status));
            return [2 /*return*/, response.text()];
          case 2:
            error_1 = _a.sent();
            $1615705ecc6adca3$exports.default.error("Error retrieving ID", error_1);
            pathError = "";
            if (this._options.path === "/" && this._options.host !== $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) pathError = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer.";
            throw new Error("Could not get an ID from the server." + pathError);
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  /** @deprecated */
  $9e85b3e1327369e6$export$2c4e825dc9120f87.prototype.listAllPeers = function () {
    return $9e85b3e1327369e6$var$__awaiter(this, void 0, Promise, function () {
      var response, helpfulError, error_2;
      return $9e85b3e1327369e6$var$__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4 /*yield*/, this._buildRequest("peers")];
          case 1:
            response = _a.sent();
            if (response.status !== 200) {
              if (response.status === 401) {
                helpfulError = "";
                if (this._options.host === $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) helpfulError = "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.";else helpfulError = "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.";
                throw new Error("It doesn't look like you have permission to list peers IDs. " + helpfulError);
              }
              throw new Error("Error. Status:".concat(response.status));
            }
            return [2 /*return*/, response.json()];
          case 2:
            error_2 = _a.sent();
            $1615705ecc6adca3$exports.default.error("Error retrieving list peers", error_2);
            throw new Error("Could not get list peers from the server." + error_2);
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };

  return $9e85b3e1327369e6$export$2c4e825dc9120f87;
}();
var $26088d7da5b03f69$var$__extends =  false || function () {
  var extendStatics = function (d1, b1) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d1, b1);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var $26088d7da5b03f69$var$__assign =  false || function () {
  $26088d7da5b03f69$var$__assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return $26088d7da5b03f69$var$__assign.apply(this, arguments);
};
var $26088d7da5b03f69$var$__values =  false || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var $26088d7da5b03f69$var$__read =  false || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var $26088d7da5b03f69$var$PeerOptions = /** @class */function () {
  function PeerOptions() {}
  return PeerOptions;
}();
/**
 * A peer who can initiate connections with other peers.
 */
var $26088d7da5b03f69$export$ecd1fc136c422448 = /** @class */function (_super) {
  $26088d7da5b03f69$var$__extends($26088d7da5b03f69$export$ecd1fc136c422448, _super);
  function $26088d7da5b03f69$export$ecd1fc136c422448(id1, options) {
    var _this = _super.call(this) || this;
    _this._id = null;
    _this._lastServerId = null;
    // States.
    _this._destroyed = false; // Connections have been killed
    _this._disconnected = false; // Connection to PeerServer killed but P2P connections still active
    _this._open = false; // Sockets and such are not yet open.
    _this._connections = new Map(); // All connections for this peer.
    _this._lostMessages = new Map(); // src => [list of messages]
    var userId;
    // Deal with overloading
    if (id1 && id1.constructor == Object) options = id1;else if (id1) userId = id1.toString();
    // Configurize options
    options = $26088d7da5b03f69$var$__assign({
      debug: 0,
      host: $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST,
      port: $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_PORT,
      path: "/",
      key: $26088d7da5b03f69$export$ecd1fc136c422448.DEFAULT_KEY,
      token: $06cb531ed7840f78$export$7debb50ef11d5e0b.randomToken(),
      config: $06cb531ed7840f78$export$7debb50ef11d5e0b.defaultConfig,
      referrerPolicy: "strict-origin-when-cross-origin"
    }, options);
    _this._options = options;
    // Detect relative URL host.
    if (_this._options.host === "/") _this._options.host = window.location.hostname;
    // Set path correctly.
    if (_this._options.path) {
      if (_this._options.path[0] !== "/") _this._options.path = "/" + _this._options.path;
      if (_this._options.path[_this._options.path.length - 1] !== "/") _this._options.path += "/";
    }
    // Set whether we use SSL to same as current host
    if (_this._options.secure === undefined && _this._options.host !== $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) _this._options.secure = $06cb531ed7840f78$export$7debb50ef11d5e0b.isSecure();else if (_this._options.host == $06cb531ed7840f78$export$7debb50ef11d5e0b.CLOUD_HOST) _this._options.secure = true;
    // Set a custom log function if present
    if (_this._options.logFunction) $1615705ecc6adca3$exports.default.setLogFunction(_this._options.logFunction);
    $1615705ecc6adca3$exports.default.logLevel = _this._options.debug || 0;
    _this._api = new $9e85b3e1327369e6$exports.API(options);
    _this._socket = _this._createServerConnection();
    // Sanity checks
    // Ensure WebRTC supported
    if (!$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.audioVideo && !$06cb531ed7840f78$export$7debb50ef11d5e0b.supports.data) {
      _this._delayedAbort($60fadef21a2daafc$export$9547aaa2e39030ff.BrowserIncompatible, "The current browser does not support WebRTC");
      return _this;
    }
    // Ensure alphanumeric id
    if (!!userId && !$06cb531ed7840f78$export$7debb50ef11d5e0b.validateId(userId)) {
      _this._delayedAbort($60fadef21a2daafc$export$9547aaa2e39030ff.InvalidID, "ID \"".concat(userId, "\" is invalid"));
      return _this;
    }
    if (userId) _this._initialize(userId);else _this._api.retrieveId().then(function (id) {
      return _this._initialize(id);
    }).catch(function (error) {
      return _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, error);
    });
    return _this;
  }
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "id", {
    /**
     * The brokering ID of this peer
     */
    get: function () {
      return this._id;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "options", {
    get: function () {
      return this._options;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "open", {
    get: function () {
      return this._open;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "socket", {
    get: function () {
      return this._socket;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "connections", {
    /**
     * A hash of all connections associated with this peer, keyed by the remote peer's ID.
     * @deprecated
     * Return type will change from Object to Map<string,[]>
     */
    get: function () {
      var e_1, _a;
      var plainConnections = Object.create(null);
      try {
        for (var _b = $26088d7da5b03f69$var$__values(this._connections), _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = $26088d7da5b03f69$var$__read(_c.value, 2),
            k = _d[0],
            v = _d[1];
          plainConnections[k] = v;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return plainConnections;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "destroyed", {
    /**
     * true if this peer and all of its connections can no longer be used.
     */
    get: function () {
      return this._destroyed;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty($26088d7da5b03f69$export$ecd1fc136c422448.prototype, "disconnected", {
    /**
     * false if there is an active connection to the PeerServer.
     */
    get: function () {
      return this._disconnected;
    },
    enumerable: false,
    configurable: true
  });
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._createServerConnection = function () {
    var _this = this;
    var socket = new $31d11a8d122cb4b7$exports.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
    socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Message, function (data) {
      _this._handleMessage(data);
    });
    socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Error, function (error) {
      _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.SocketError, error);
    });
    socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Disconnected, function () {
      if (_this.disconnected) return;
      _this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Network, "Lost connection to server.");
      _this.disconnect();
    });
    socket.on($60fadef21a2daafc$export$3b5c4a4b6354f023.Close, function () {
      if (_this.disconnected) return;
      _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.SocketClosed, "Underlying socket is already closed.");
    });
    return socket;
  };
  /** Initialize a connection with the server. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._initialize = function (id) {
    this._id = id;
    this.socket.start(id, this._options.token);
  };
  /** Handles messages from the server. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._handleMessage = function (message) {
    var e_2, _a;
    var type = message.type;
    var payload = message.payload;
    var peerId = message.src;
    switch (type) {
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Open:
        this._lastServerId = this.id;
        this._open = true;
        this.emit("open", this.id);
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Error:
        this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, payload.msg);
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.IdTaken:
        this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.UnavailableID, "ID \"".concat(this.id, "\" is taken"));
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.InvalidKey:
        this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.InvalidKey, "API KEY \"".concat(this._options.key, "\" is invalid"));
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Leave:
        $1615705ecc6adca3$exports.default.log("Received leave message from ".concat(peerId));
        this._cleanupPeer(peerId);
        this._connections.delete(peerId);
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Expire:
        this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.PeerUnavailable, "Could not connect to peer ".concat(peerId));
        break;
      case $60fadef21a2daafc$export$adb4a1754da6f10d.Offer:
        // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
        var connectionId = payload.connectionId;
        var connection = this.getConnection(peerId, connectionId);
        if (connection) {
          connection.close();
          $1615705ecc6adca3$exports.default.warn("Offer received for existing Connection ID:".concat(connectionId));
        }
        // Create a new connection.
        if (payload.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Media) {
          var mediaConnection = new $353dee38f9ab557b$exports.MediaConnection(peerId, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata
          });
          connection = mediaConnection;
          this._addConnection(peerId, connection);
          this.emit("call", mediaConnection);
        } else if (payload.type === $60fadef21a2daafc$export$3157d57b4135e3bc.Data) {
          var dataConnection = new $3356170d7bce7f20$exports.DataConnection(peerId, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata,
            label: payload.label,
            serialization: payload.serialization,
            reliable: payload.reliable
          });
          connection = dataConnection;
          this._addConnection(peerId, connection);
          this.emit("connection", dataConnection);
        } else {
          $1615705ecc6adca3$exports.default.warn("Received malformed connection type:".concat(payload.type));
          return;
        }
        // Find messages.
        var messages = this._getMessages(connectionId);
        try {
          for (var messages_1 = $26088d7da5b03f69$var$__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
            var message_1 = messages_1_1.value;
            connection.handleMessage(message_1);
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
        break;
      default:
        if (!payload) {
          $1615705ecc6adca3$exports.default.warn("You received a malformed message from ".concat(peerId, " of type ").concat(type));
          return;
        }
        var connectionId = payload.connectionId;
        var connection = this.getConnection(peerId, connectionId);
        if (connection && connection.peerConnection)
          // Pass it on.
          connection.handleMessage(message);else if (connectionId)
          // Store for possible later use
          this._storeMessage(connectionId, message);else $1615705ecc6adca3$exports.default.warn("You received an unrecognized message:", message);
        break;
    }
  };
  /** Stores messages without a set up connection, to be claimed later. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._storeMessage = function (connectionId, message) {
    if (!this._lostMessages.has(connectionId)) this._lostMessages.set(connectionId, []);
    this._lostMessages.get(connectionId).push(message);
  };
  /** Retrieve messages from lost message store */ //TODO Change it to private
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._getMessages = function (connectionId) {
    var messages = this._lostMessages.get(connectionId);
    if (messages) {
      this._lostMessages.delete(connectionId);
      return messages;
    }
    return [];
  };
  /**
   * Connects to the remote peer specified by id and returns a data connection.
   * @param peer The brokering ID of the remote peer (their peer.id).
   * @param options for specifying details about Peer Connection
   */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.connect = function (peer, options) {
    if (options === void 0) options = {};
    if (this.disconnected) {
      $1615705ecc6adca3$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.");
      this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
      return;
    }
    var dataConnection = new $3356170d7bce7f20$exports.DataConnection(peer, this, options);
    this._addConnection(peer, dataConnection);
    return dataConnection;
  };
  /**
   * Calls the remote peer specified by id and returns a media connection.
   * @param peer The brokering ID of the remote peer (their peer.id).
   * @param stream The caller's media stream
   * @param options Metadata associated with the connection, passed in by whoever initiated the connection.
   */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.call = function (peer, stream, options) {
    if (options === void 0) options = {};
    if (this.disconnected) {
      $1615705ecc6adca3$exports.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.");
      this.emitError($60fadef21a2daafc$export$9547aaa2e39030ff.Disconnected, "Cannot connect to new Peer after disconnecting from server.");
      return;
    }
    if (!stream) {
      $1615705ecc6adca3$exports.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
      return;
    }
    var mediaConnection = new $353dee38f9ab557b$exports.MediaConnection(peer, this, $26088d7da5b03f69$var$__assign($26088d7da5b03f69$var$__assign({}, options), {
      _stream: stream
    }));
    this._addConnection(peer, mediaConnection);
    return mediaConnection;
  };
  /** Add a data/media connection to this peer. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._addConnection = function (peerId, connection) {
    $1615705ecc6adca3$exports.default.log("add connection ".concat(connection.type, ":").concat(connection.connectionId, " to peerId:").concat(peerId));
    if (!this._connections.has(peerId)) this._connections.set(peerId, []);
    this._connections.get(peerId).push(connection);
  };
  //TODO should be private
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._removeConnection = function (connection) {
    var connections = this._connections.get(connection.peer);
    if (connections) {
      var index = connections.indexOf(connection);
      if (index !== -1) connections.splice(index, 1);
    }
    //remove from lost messages
    this._lostMessages.delete(connection.connectionId);
  };
  /** Retrieve a data/media connection for this peer. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.getConnection = function (peerId, connectionId) {
    var e_3, _a;
    var connections = this._connections.get(peerId);
    if (!connections) return null;
    try {
      for (var connections_1 = $26088d7da5b03f69$var$__values(connections), connections_1_1 = connections_1.next(); !connections_1_1.done; connections_1_1 = connections_1.next()) {
        var connection = connections_1_1.value;
        if (connection.connectionId === connectionId) return connection;
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (connections_1_1 && !connections_1_1.done && (_a = connections_1.return)) _a.call(connections_1);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
    return null;
  };
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._delayedAbort = function (type, message) {
    var _this = this;
    setTimeout(function () {
      _this._abort(type, message);
    }, 0);
  };
  /**
   * Emits an error message and destroys the Peer.
   * The Peer is not destroyed if it's in a disconnected state, in which case
   * it retains its disconnected state and its existing connections.
   */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._abort = function (type, message) {
    $1615705ecc6adca3$exports.default.error("Aborting!");
    this.emitError(type, message);
    if (!this._lastServerId) this.destroy();else this.disconnect();
  };
  /** Emits a typed error message. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.emitError = function (type, err) {
    $1615705ecc6adca3$exports.default.error("Error:", err);
    var error;
    if (typeof err === "string") error = new Error(err);else error = err;
    error.type = type;
    this.emit("error", error);
  };
  /**
   * Destroys the Peer: closes all active connections as well as the connection
   *  to the server.
   * Warning: The peer can no longer create or accept connections after being
   *  destroyed.
   */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.destroy = function () {
    if (this.destroyed) return;
    $1615705ecc6adca3$exports.default.log("Destroy peer with ID:".concat(this.id));
    this.disconnect();
    this._cleanup();
    this._destroyed = true;
    this.emit("close");
  };
  /** Disconnects every connection on this peer. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._cleanup = function () {
    var e_4, _a;
    try {
      for (var _b = $26088d7da5b03f69$var$__values(this._connections.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var peerId = _c.value;
        this._cleanupPeer(peerId);
        this._connections.delete(peerId);
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    this.socket.removeAllListeners();
  };
  /** Closes all connections to this peer. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype._cleanupPeer = function (peerId) {
    var e_5, _a;
    var connections = this._connections.get(peerId);
    if (!connections) return;
    try {
      for (var connections_2 = $26088d7da5b03f69$var$__values(connections), connections_2_1 = connections_2.next(); !connections_2_1.done; connections_2_1 = connections_2.next()) {
        var connection = connections_2_1.value;
        connection.close();
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (connections_2_1 && !connections_2_1.done && (_a = connections_2.return)) _a.call(connections_2);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
  };
  /**
   * Disconnects the Peer's connection to the PeerServer. Does not close any
   *  active connections.
   * Warning: The peer can no longer create or accept connections after being
   *  disconnected. It also cannot reconnect to the server.
   */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.disconnect = function () {
    if (this.disconnected) return;
    var currentId = this.id;
    $1615705ecc6adca3$exports.default.log("Disconnect peer with ID:".concat(currentId));
    this._disconnected = true;
    this._open = false;
    this.socket.close();
    this._lastServerId = currentId;
    this._id = null;
    this.emit("disconnected", currentId);
  };
  /** Attempts to reconnect with the same ID. */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.reconnect = function () {
    if (this.disconnected && !this.destroyed) {
      $1615705ecc6adca3$exports.default.log("Attempting reconnection to server with ID ".concat(this._lastServerId));
      this._disconnected = false;
      this._initialize(this._lastServerId);
    } else if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");else if (!this.disconnected && !this.open)
      // Do nothing. We're still connecting the first time.
      $1615705ecc6adca3$exports.default.error("In a hurry? We're still trying to make the initial connection!");else throw new Error("Peer ".concat(this.id, " cannot reconnect because it is not disconnected from the server!"));
  };
  /**
   * Get a list of available peer IDs. If you're running your own server, you'll
   * want to set allow_discovery: true in the PeerServer options. If you're using
   * the cloud server, email team@peerjs.com to get the functionality enabled for
   * your key.
   */
  $26088d7da5b03f69$export$ecd1fc136c422448.prototype.listAllPeers = function (cb) {
    var _this = this;
    if (cb === void 0) cb = function (_) {};
    this._api.listAllPeers().then(function (peers) {
      return cb(peers);
    }).catch(function (error) {
      return _this._abort($60fadef21a2daafc$export$9547aaa2e39030ff.ServerError, error);
    });
  };
  $26088d7da5b03f69$export$ecd1fc136c422448.DEFAULT_KEY = "peerjs";
  return $26088d7da5b03f69$export$ecd1fc136c422448;
}($ac9b757d51178e15$exports.EventEmitter);
var $70d766613f57b014$export$2e2bcd8739ae039 = $26088d7da5b03f69$exports.Peer;


/***/ }),

/***/ 9172:
/*!*******************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/contrib/backo2.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Backoff": () => (/* binding */ Backoff)
/* harmony export */ });
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

/***/ }),

/***/ 4769:
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* reexport safe */ _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager),
/* harmony export */   "Socket": () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket),
/* harmony export */   "connect": () => (/* binding */ lookup),
/* harmony export */   "default": () => (/* binding */ lookup),
/* harmony export */   "io": () => (/* binding */ lookup),
/* harmony export */   "protocol": () => (/* reexport safe */ socket_io_parser__WEBPACK_IMPORTED_MODULE_3__.protocol)
/* harmony export */ });
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url.js */ 2151);
/* harmony import */ var _manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager.js */ 8417);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ 2777);
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-parser */ 7199);



/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};
  const parsed = (0,_url_js__WEBPACK_IMPORTED_MODULE_0__.url)(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
  Manager: _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager,
  Socket: _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket,
  io: lookup,
  connect: lookup
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */


/***/ }),

/***/ 8417:
/*!************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/manager.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* binding */ Manager)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ 273);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.js */ 2777);
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-parser */ 7199);
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./on.js */ 7087);
/* harmony import */ var _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/backo2.js */ 9172);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @socket.io/component-emitter */ 1746);






class Manager extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__.Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = undefined;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.installTimerFunctions)(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__.Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || socket_io_parser__WEBPACK_IMPORTED_MODULE_2__;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect) this.open();
  }
  reconnection(v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    return this;
  }
  reconnectionAttempts(v) {
    if (v === undefined) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === undefined) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === undefined) return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === undefined) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    // Only try to reconnect if it's the first time we're connecting
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new engine_io_client__WEBPACK_IMPORTED_MODULE_0__.Socket(this.uri, this.opts);
    const socket = this.engine;
    const self = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    // emit `open`
    const openSubDestroy = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "open", function () {
      self.onopen();
      fn && fn();
    });
    const onError = err => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        this.maybeReconnectOnOpen();
      }
    };
    // emit `error`
    const errorSub = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout = this._timeout;
      // set timer
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    // clear old subs
    this.cleanup();
    // mark as open
    this._readyState = "open";
    this.emitReserved("open");
    // add new subs
    const socket = this.engine;
    this.subs.push((0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "ping", this.onping.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "data", this.ondata.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", this.onerror.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "close", this.onclose.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(packet) {
    // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
    (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(err) {
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new _socket_js__WEBPACK_IMPORTED_MODULE_1__.Socket(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket = this.nsps[nsp];
      if (socket.active) {
        return;
      }
    }
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i = 0; i < encodedPackets.length; i++) {
      this.engine.write(encodedPackets[i], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach(subDestroy => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine) this.engine.close();
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called upon engine close.
   *
   * @private
   */
  onclose(reason, description) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const self = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self.skipReconnect) return;
        this.emitReserved("reconnect_attempt", self.backoff.attempts);
        // check again for the case socket closed in above events
        if (self.skipReconnect) return;
        self.open(err => {
          if (err) {
            self._reconnecting = false;
            self.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
}

/***/ }),

/***/ 7087:
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "on": () => (/* binding */ on)
/* harmony export */ });
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}

/***/ }),

/***/ 2777:
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/socket.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-parser */ 7199);
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./on.js */ 7087);
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @socket.io/component-emitter */ 1746);



/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__.Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(io, nsp, opts) {
    super();
    /**
     * Whether the socket is currently connected to the server.
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.connected); // true
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.connected); // false
     * });
     */
    this.connected = false;
    /**
     * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
     * be transmitted by the server.
     */
    this.recovered = false;
    /**
     * Buffer for packets received before the CONNECT packet
     */
    this.receiveBuffer = [];
    /**
     * Buffer for packets that will be sent once the socket is connected
     */
    this.sendBuffer = [];
    /**
     * The queue of packets to be sent with retry in case of failure.
     *
     * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
     * @private
     */
    this._queue = [];
    /**
     * A sequence to generate the ID of the {@link QueuedPacket}.
     * @private
     */
    this._queueSeq = 0;
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect) this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs) return;
    const io = this.io;
    this.subs = [(0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "open", this.onopen.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "packet", this.onpacket.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "error", this.onerror.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "close", this.onclose.bind(this))];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    if (this.connected) return this;
    this.subEvents();
    if (!this.io["_reconnecting"]) this.io.open(); // ensure open
    if ("open" === this.io._readyState) this.onopen();
    return this;
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(ev, ...args) {
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    // event ack callback
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket) {} else if (this.connected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  /**
   * @private
   */
  _registerAckCallback(id, ack) {
    var _a;
    const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout === undefined) {
      this.acks[id] = ack;
      return;
    }
    // @ts-ignore
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i = 0; i < this.sendBuffer.length; i++) {
        if (this.sendBuffer[i].id === id) {
          this.sendBuffer.splice(i, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    this.acks[id] = (...args) => {
      // @ts-ignore
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(ev, ...args) {
    // the timeout flag is optional
    const withErr = this.flags.timeout !== undefined || this._opts.ackTimeout !== undefined;
    return new Promise((resolve, reject) => {
      args.push((arg1, arg2) => {
        if (withErr) {
          return arg1 ? reject(arg1) : resolve(arg2);
        } else {
          return resolve(arg1);
        }
      });
      this.emit(ev, ...args);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({
        fromQueue: true
      }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {
        // the packet has already been acknowledged
        return;
      }
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    if (typeof this.auth == "function") {
      this.auth(data => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(data) {
    this.packet({
      type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT,
      data: this._pid ? Object.assign({
        pid: this._pid,
        offset: this._lastOffset
      }, data) : data
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace) return;
    switch (packet.type) {
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT:
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK:
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        // @ts-ignore
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(id) {
    const self = this;
    let sent = false;
    return function (...args) {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      self.packet({
        type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK,
        id: id,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowlegement.
   *
   * @param packet
   * @private
   */
  onack(packet) {
    const ack = this.acks[packet.id];
    if ("function" === typeof ack) {
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {}
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(id, pid) {
    this.id = id;
    this.recovered = pid && this._pid === pid;
    this._pid = pid; // defined only if connection state recovery is enabled
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
    this._drainQueue(true);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach(args => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach(packet => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      this.subs.forEach(subDestroy => subDestroy());
      this.subs = undefined;
    }
    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    if (this.connected) {
      this.packet({
        type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT
      });
    }
    // remove socket from pool
    this.destroy();
    if (this.connected) {
      // fire events
      this.onclose("io client disconnect");
    }
    return this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i = 0; i < listeners.length; i++) {
        if (listener === listeners[i]) {
          listeners.splice(i, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
}

/***/ }),

/***/ 2151:
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/url.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "url": () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ 273);

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
  let obj = uri;
  // default to window.location
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri) uri = loc.protocol + "//" + loc.host;
  // relative path support
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    // parse
    obj = (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.parse)(uri);
  }
  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  // define unique id
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  // define href
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}

/***/ }),

/***/ 6695:
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/binary.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deconstructPacket": () => (/* binding */ deconstructPacket),
/* harmony export */   "reconstructPacket": () => (/* binding */ reconstructPacket)
/* harmony export */ });
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-binary.js */ 7706);

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {
    packet: pack,
    buffers: buffers
  };
}
function _deconstructPacket(data, buffers) {
  if (!data) return data;
  if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_0__.isBinary)(data)) {
    const placeholder = {
      _placeholder: true,
      num: buffers.length
    };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  delete packet.attachments; // no longer useful
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data) return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}

/***/ }),

/***/ 7199:
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Decoder": () => (/* binding */ Decoder),
/* harmony export */   "Encoder": () => (/* binding */ Encoder),
/* harmony export */   "PacketType": () => (/* binding */ PacketType),
/* harmony export */   "protocol": () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @socket.io/component-emitter */ 1746);
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ 6695);
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-binary.js */ 7706);



/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener" // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
  PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
  PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType[PacketType["EVENT"] = 2] = "EVENT";
  PacketType[PacketType["ACK"] = 3] = "ACK";
  PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.hasBinary)(obj)) {
        return this.encodeAsBinary({
          type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
          nsp: obj.nsp,
          data: obj.data,
          id: obj.id
        });
      }
    }
    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(obj) {
    // first is type
    let str = "" + obj.type;
    // attachments if we have them
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    // if we have a namespace other than `/`
    // we append it followed by a comma `,`
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    // immediately followed by the id
    if (null != obj.id) {
      str += obj.id;
    }
    // json data
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(obj) {
    const deconstruction = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.deconstructPacket)(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack); // add packet info to beginning of data list
    return buffers; // write all the buffers
  }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__.Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
      if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
        packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet);
        // no attachments, labeled binary but no binary data to follow
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        // non-binary full packet
        super.emitReserved("decoded", packet);
      }
    } else if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.isBinary)(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          // received final buffer
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(str) {
    let i = 0;
    // look up type
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === undefined) {
      throw new Error("unknown packet type " + p.type);
    }
    // look up attachments if type binary
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i + 1;
      while (str.charAt(++i) !== "-" && i != str.length) {}
      const buf = str.substring(start, i);
      if (buf != Number(buf) || str.charAt(i) !== "-") {
        throw new Error("Illegal attachments");
      }
      p.attachments = Number(buf);
    }
    // look up namespace (if any)
    if ("/" === str.charAt(i + 1)) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if ("," === c) break;
        if (i === str.length) break;
      }
      p.nsp = str.substring(start, i);
    } else {
      p.nsp = "/";
    }
    // look up id
    const next = str.charAt(i + 1);
    if ("" !== next && Number(next) == next) {
      const start = i + 1;
      while (++i) {
        const c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        if (i === str.length) break;
      }
      p.id = Number(str.substring(start, i + 1));
    }
    // look up json data
    if (str.charAt(++i)) {
      const payload = this.tryParse(str.substr(i));
      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return isObject(payload);
      case PacketType.DISCONNECT:
        return payload === undefined;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
      this.reconstructor = null;
    }
  }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      // done with buffer list
      const packet = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.reconstructPacket)(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
}

/***/ }),

/***/ 7706:
/*!**************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/is-binary.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasBinary": () => (/* binding */ hasBinary),
/* harmony export */   "isBinary": () => (/* binding */ isBinary)
/* harmony export */ });
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}

/***/ }),

/***/ 1670:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ })

}]);
//# sourceMappingURL=packages_client_src_app_modules_peer_peer_module_ts.js.map