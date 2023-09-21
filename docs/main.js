"use strict";
(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["main"],{

/***/ 2432:
/*!********************************************************!*\
  !*** ./packages/client/src/app/actions/app.actions.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "acceptCookies": () => (/* binding */ acceptCookies),
/* harmony export */   "applyWakeLock": () => (/* binding */ applyWakeLock),
/* harmony export */   "applyWakeLockFailure": () => (/* binding */ applyWakeLockFailure),
/* harmony export */   "applyWakeLockSuccess": () => (/* binding */ applyWakeLockSuccess),
/* harmony export */   "checkUserAgent": () => (/* binding */ checkUserAgent),
/* harmony export */   "checkUserAgentComplete": () => (/* binding */ checkUserAgentComplete),
/* harmony export */   "clearAppError": () => (/* binding */ clearAppError),
/* harmony export */   "declineCookies": () => (/* binding */ declineCookies),
/* harmony export */   "hideFooter": () => (/* binding */ hideFooter),
/* harmony export */   "initAppearance": () => (/* binding */ initAppearance),
/* harmony export */   "initAppearanceComplete": () => (/* binding */ initAppearanceComplete),
/* harmony export */   "releaseWakeLock": () => (/* binding */ releaseWakeLock),
/* harmony export */   "releaseWakeLockFailure": () => (/* binding */ releaseWakeLockFailure),
/* harmony export */   "releaseWakeLockSuccess": () => (/* binding */ releaseWakeLockSuccess),
/* harmony export */   "setCookiePolicyComplete": () => (/* binding */ setCookiePolicyComplete),
/* harmony export */   "setPeerConnectionsAccepted": () => (/* binding */ setPeerConnectionsAccepted),
/* harmony export */   "setPeerConnectionsComplete": () => (/* binding */ setPeerConnectionsComplete),
/* harmony export */   "showFooter": () => (/* binding */ showFooter),
/* harmony export */   "updateConnectivityState": () => (/* binding */ updateConnectivityState)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const showFooter = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Show Footer');
const hideFooter = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Hide Footer');
const checkUserAgent = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Check UserAgent');
const initAppearance = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Init Appearance');
const acceptCookies = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Accept Cookies');
const declineCookies = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Decline Cookies');
const setCookiePolicyComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Set Cookie Policy Complete');
const setPeerConnectionsAccepted = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Set Peer Connections Accepted', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setPeerConnectionsComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Set Peer Connections Complete');
const applyWakeLock = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Apply WakeLock');
const applyWakeLockSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Apply WakeLock Success', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const applyWakeLockFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Apply WakeLock Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const releaseWakeLock = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Release WakeLock');
const releaseWakeLockSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Release WakeLock Success');
const releaseWakeLockFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Release WakeLock Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const checkUserAgentComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Check UserAgent Complete', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const clearAppError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Clear Error');
const initAppearanceComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Init Appearance Complete', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const updateConnectivityState = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[App] Update Connectivity State', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());

/***/ }),

/***/ 9373:
/*!*****************************************************************!*\
  !*** ./packages/client/src/app/actions/audio-stream.actions.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "audioStreamError": () => (/* binding */ audioStreamError),
/* harmony export */   "connectStream": () => (/* binding */ connectStream),
/* harmony export */   "connectStreamFailure": () => (/* binding */ connectStreamFailure),
/* harmony export */   "connectStreamSuccess": () => (/* binding */ connectStreamSuccess),
/* harmony export */   "disconnectStream": () => (/* binding */ disconnectStream),
/* harmony export */   "disconnectStreamSuccess": () => (/* binding */ disconnectStreamSuccess),
/* harmony export */   "startListen": () => (/* binding */ startListen),
/* harmony export */   "stopListen": () => (/* binding */ stopListen)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const connectStream = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Connect', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const disconnectStream = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Disconnect', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const startListen = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Listen Start', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const stopListen = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Listen Stop', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const connectStreamSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Connect success', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const connectStreamFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Connect failed', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const disconnectStreamSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Disconnect success', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const audioStreamError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[AudioStream] Error', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());

/***/ }),

/***/ 8574:
/*!********************************************************!*\
  !*** ./packages/client/src/app/actions/obs.actions.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsActions": () => (/* binding */ ObsActions)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const ObsActions = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createActionGroup)({
  source: 'Obs',
  events: {
    'Connect': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    'Connect Success': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.emptyProps)(),
    'Connect Failure': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    'Disconnect': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.emptyProps)(),
    'Disconnect Success': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.emptyProps)(),
    'Disconnect Failure': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    'Set Streaming Active': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    'Error Received': (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()
  }
});

/***/ }),

/***/ 6365:
/*!*********************************************************!*\
  !*** ./packages/client/src/app/actions/peer.actions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerActions": () => (/* binding */ PeerActions)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const PeerActions = {
  connectSocketServer: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect Socket Server'),
  socketServerConnected: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Socket Server Connected'),
  socketServerUserIdAssigned: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Socket Server User ID Assigned', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  connectSocketServerFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect Socket Server Error', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  disconnectSocketServer: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Disconnect Socket Server'),
  socketServerDisconnected: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Socket Server Disconnected'),
  socketServerMessageReceived: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Server Message Received', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  socketServerError: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Socket Server Error Recieved', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  createBroadcastRoom: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Create Broadcast Room'),
  createBroadcastRoomSuccess: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Create Broadcast Room Success', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  createBroadcastRoomFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Create Broadcast Room Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  endBroadcast: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] End Broadcast'),
  endBroadcastSuccess: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] End Broadcast Success'),
  endBroadcastFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] End Broadcast Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  joinBroadcastRoom: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Join Broadcast Room', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  joinBroadcastRoomSuccess: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Join Broadcast Room Success'),
  joinBroadcastRoomFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Join Broadcast Room Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  setJoinCode: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Set Join Code', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  clearJoinCode: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Clear Join Code'),
  setBroadcastEndedAt: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Set Broadcast Ended At', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  clearBroadcastEndedAt: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Clear Broadcast Ended At'),
  setHostStatus: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Set Host Status', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  leaveBroadcastRoom: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Leave Broadcast Room'),
  leaveBroadcastRoomSuccess: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Leave Broadcast Room Success'),
  leaveBroadcastRoomFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Leave Broadcast Room Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  connectPeerServer: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect Peer Server'),
  peerServerConnected: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Peer Server Connected'),
  connectPeerServerFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect Peer Server Error', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  peerServerError: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Peer Server Error Recieved', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  disconnectPeerServer: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Disconnect Peer Server'),
  peerServerDisconnected: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Peer Server Disconnected'),
  connectToRemotePeer: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect to Remote Peer', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  connectToRemotePeerSuccess: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect to Remote Peer Success'),
  connectToRemotePeerFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Connect to Remote Peer Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  acceptPeerConnection: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Accept Peer Connection'),
  acceptPeerConnectionSuccess: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Peer Connection Accepted'),
  acceptPeerConnectionFailure: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Accept Peer Connection Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  peerMessageReceived: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Peer Message Received', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  updateConnectedPeerCount: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Update Connected Peer Count', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)()),
  setBroadcastPausedState: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Peer] Set Broadcast Paused State', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)())
};

/***/ }),

/***/ 3786:
/*!***************************************************************!*\
  !*** ./packages/client/src/app/actions/recogntion.actions.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "connectRecognition": () => (/* binding */ connectRecognition),
/* harmony export */   "connectRecognitionFailure": () => (/* binding */ connectRecognitionFailure),
/* harmony export */   "connectRecognitionSuccess": () => (/* binding */ connectRecognitionSuccess),
/* harmony export */   "disconnectRecognition": () => (/* binding */ disconnectRecognition),
/* harmony export */   "disconnectRecognitionFailure": () => (/* binding */ disconnectRecognitionFailure),
/* harmony export */   "disconnectRecognitionSuccess": () => (/* binding */ disconnectRecognitionSuccess),
/* harmony export */   "pauseRecognition": () => (/* binding */ pauseRecognition),
/* harmony export */   "pauseRecognitionSuccess": () => (/* binding */ pauseRecognitionSuccess),
/* harmony export */   "recognitionError": () => (/* binding */ recognitionError),
/* harmony export */   "resetRecogntionState": () => (/* binding */ resetRecogntionState),
/* harmony export */   "resumeRecognition": () => (/* binding */ resumeRecognition),
/* harmony export */   "resumeRecognitionSuccess": () => (/* binding */ resumeRecognitionSuccess)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const connectRecognition = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Connect', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const disconnectRecognition = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Disconnect', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const recognitionError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Error', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const pauseRecognition = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Pause');
const pauseRecognitionSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Pause Success');
const resumeRecognition = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Resume');
const resumeRecognitionSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Resume Success');
const connectRecognitionSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Connect success');
const connectRecognitionFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Connect failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const disconnectRecognitionSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Disconnect success');
const disconnectRecognitionFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Disconnect failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const resetRecogntionState = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Recognition] Reset state');

/***/ }),

/***/ 9895:
/*!*************************************************************!*\
  !*** ./packages/client/src/app/actions/settings.actions.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initSettings": () => (/* binding */ initSettings),
/* harmony export */   "initSettingsComplete": () => (/* binding */ initSettingsComplete),
/* harmony export */   "setLanguage": () => (/* binding */ setLanguage),
/* harmony export */   "setLanguageComplete": () => (/* binding */ setLanguageComplete),
/* harmony export */   "setLineHeight": () => (/* binding */ setLineHeight),
/* harmony export */   "setLineHeightFailure": () => (/* binding */ setLineHeightFailure),
/* harmony export */   "setLineHeightSuccess": () => (/* binding */ setLineHeightSuccess),
/* harmony export */   "setTextFlow": () => (/* binding */ setTextFlow),
/* harmony export */   "setTextFlowFailure": () => (/* binding */ setTextFlowFailure),
/* harmony export */   "setTextFlowSuccess": () => (/* binding */ setTextFlowSuccess),
/* harmony export */   "setTextSize": () => (/* binding */ setTextSize),
/* harmony export */   "setTextSizeFailure": () => (/* binding */ setTextSizeFailure),
/* harmony export */   "setTextSizeSuccess": () => (/* binding */ setTextSizeSuccess),
/* harmony export */   "setTheme": () => (/* binding */ setTheme),
/* harmony export */   "setThemeComplete": () => (/* binding */ setThemeComplete),
/* harmony export */   "updateWakeLockEnabled": () => (/* binding */ updateWakeLockEnabled),
/* harmony export */   "updateWakeLockEnabledFailure": () => (/* binding */ updateWakeLockEnabledFailure),
/* harmony export */   "updateWakeLockEnabledSuccess": () => (/* binding */ updateWakeLockEnabledSuccess)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const initSettings = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Init');
const initSettingsComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Init Complete', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setTheme = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Theme', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setThemeComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Theme Complete');
const setLanguage = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Language', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setLanguageComplete = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Language Complete');
const updateWakeLockEnabled = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Update WakeLock Enabled', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const updateWakeLockEnabledSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Update WakeLock Enabled Success');
const updateWakeLockEnabledFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Update WakeLock Enabled Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setTextSize = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Text Size', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setTextSizeSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Text Size Success');
const setTextSizeFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Text Size Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setLineHeight = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Line Height', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setLineHeightSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Line Height Success');
const setLineHeightFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Line Height Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setTextFlow = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Text Flow', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());
const setTextFlowSuccess = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Text Flow Success');
const setTextFlowFailure = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createAction)('[Settings] Set Text Flow Failure', (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)());

/***/ }),

/***/ 176:
/*!**************************************************!*\
  !*** ./packages/client/src/app/app.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/app.model */ 4056);
/* harmony import */ var _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/settings/models/settings.model */ 3545);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors/settings.selector */ 8783);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/service-worker */ 4413);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/header/header.component */ 7885);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/footer/footer.component */ 9516);
/* harmony import */ var _components_service_worker_update_service_worker_update_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/service-worker-update/service-worker-update.component */ 1842);
/* harmony import */ var _components_offline_warning_offline_warning_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/offline-warning/offline-warning.component */ 8459);


















function AppComponent_app_service_worker_update_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-service-worker-update");
  }
}
class AppComponent {
  constructor(store, renderer, el, updates, translate) {
    this.store = store;
    this.renderer = renderer;
    this.el = el;
    this.updates = updates;
    this.translate = translate;
    this.renderSwUpdateNotice = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.signal)(false);
    _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.AvailableLanguages.forEach(lang => this.translate.reloadLang(lang));
    this.translate.setDefaultLang('en');
    this.theme$ = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_2__.themeSelector));
    const languageChanged = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.select)(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_2__.languageSelector)));
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.effect)(() => this.translate.use(languageChanged()));
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.effect)(() => this.renderer.setAttribute(this.el.nativeElement, 'data-theme', this.theme$()));
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.initAppearance());
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.checkUserAgent());
    this.renderSwUpdateNotice.set(this.updates.isEnabled);
  }
}
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_9__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_10__.SwUpdate), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService));
};
AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  decls: 6,
  vars: 1,
  consts: [[1, "main", "flex", "basis-full", "flex-col", "flex-shrink-0", "flex-grow-0"], [4, "ngIf"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "app-header")(2, "router-outlet")(3, "app-footer");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, AppComponent_app_service_worker_update_4_Template, 1, 0, "app-service-worker-update", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "app-offline-warning");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.renderSwUpdateNotice());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterOutlet, _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__.FooterComponent, _components_service_worker_update_service_worker_update_component__WEBPACK_IMPORTED_MODULE_5__.ServiceWorkerUpdateComponent, _components_offline_warning_offline_warning_component__WEBPACK_IMPORTED_MODULE_6__.OfflineWarningComponent],
  styles: ["router-outlet + * {\n  display: flex;\n  flex-direction: column;\n  flex: 0 1 100%;\n  align-self: stretch;\n  overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyIsInN0eWxlcy9taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQ0RFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FEQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi9zdHlsZXMvbWl4aW5zLnNjc3MnO1xuXG5yb3V0ZXItb3V0bGV0ICsgKiB7XG4gIEBpbmNsdWRlIGZpbGwtbWFpbjtcbn0iLCJAbWl4aW4gZmlsbC1tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogMCAxIDEwMCU7XG4gIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL3N0eWxlcy9taXhpbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQ0RFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FEQ0Y7QUFDQSxnbUJBQWdtQiIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4vc3R5bGVzL21peGlucy5zY3NzJztcblxucm91dGVyLW91dGxldCArICoge1xuICBAaW5jbHVkZSBmaWxsLW1haW47XG59IiwiQG1peGluIGZpbGwtbWFpbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDAgMSAxMDAlO1xuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"],
  encapsulation: 2
});


/***/ }),

/***/ 4688:
/*!***********************************************!*\
  !*** ./packages/client/src/app/app.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "HttpLoaderFactory": () => (/* binding */ HttpLoaderFactory)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ 2512);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/platform-browser/animations */ 9240);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/service-worker */ 4413);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @ngrx/store-devtools */ 203);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/http-loader */ 9710);
/* harmony import */ var shared_ui__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! shared-ui */ 4323);
/* harmony import */ var shared_ui__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! shared-ui */ 5543);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 176);
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.routes */ 1387);
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/about/about.component */ 200);
/* harmony import */ var _components_cookie_modal_cookie_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cookie-modal/cookie-modal.component */ 2813);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/footer/footer.component */ 9516);
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/header/header.component */ 7885);
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/home/home.component */ 2587);
/* harmony import */ var _components_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/privacy/privacy.component */ 8279);
/* harmony import */ var _components_terms_and_conditions_terms_and_conditions_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/terms-and-conditions/terms-and-conditions.component */ 5601);
/* harmony import */ var _components_welcome_splash_welcome_splash_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/welcome-splash/welcome-splash.component */ 1141);
/* harmony import */ var _effects_app_effects__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./effects/app.effects */ 9619);
/* harmony import */ var _modules_media_media_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/media/media.module */ 1868);
/* harmony import */ var _reducers_app_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reducers/app.reducer */ 3051);
/* harmony import */ var _reducers_audio_stream_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./reducers/audio-stream.reducer */ 3996);
/* harmony import */ var _reducers_peer_reducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./reducers/peer.reducer */ 2553);
/* harmony import */ var _reducers_recognition_reducer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reducers/recognition.reducer */ 4711);
/* harmony import */ var _reducers_settings_reducer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./reducers/settings.reducer */ 8868);
/* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ngx-timeago */ 6790);
/* harmony import */ var _effects_settings_effects__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./effects/settings.effects */ 4410);
/* harmony import */ var _effects_recognition_effects__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./effects/recognition.effects */ 9996);
/* harmony import */ var _components_service_worker_update_service_worker_update_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/service-worker-update/service-worker-update.component */ 1842);
/* harmony import */ var _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./reducers/obs.reducer */ 9232);
/* harmony import */ var _components_offline_warning_offline_warning_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/offline-warning/offline-warning.component */ 8459);
/* harmony import */ var _components_detect_pwa_install_detect_pwa_install_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/detect-pwa-install/detect-pwa-install.component */ 9894);















































function HttpLoaderFactory(http) {
  return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_23__.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
class AppModule {}
AppModule.ɵfac = function AppModule_Factory(t) {
  return new (t || AppModule)();
};
AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({
  type: AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
});
AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({
  imports: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__.BrowserAnimationsModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.BrowserModule, _angular_router__WEBPACK_IMPORTED_MODULE_27__.RouterModule.forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_1__.appRoutes, {
    initialNavigation: 'enabledBlocking',
    useHash: true
  }), _angular_service_worker__WEBPACK_IMPORTED_MODULE_28__.ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: !(0,_angular_core__WEBPACK_IMPORTED_MODULE_24__.isDevMode)(),
    // Register the ServiceWorker as soon as the application is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  }), _ng_icons_core__WEBPACK_IMPORTED_MODULE_29__.NgIconsModule.withIcons({
    ...shared_ui__WEBPACK_IMPORTED_MODULE_30__
  }), shared_ui__WEBPACK_IMPORTED_MODULE_31__.SharedUiModule, _modules_media_media_module__WEBPACK_IMPORTED_MODULE_11__.MediaModule, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.ReactiveFormsModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_33__.StoreModule.forRoot({
    appearance: _reducers_app_reducer__WEBPACK_IMPORTED_MODULE_12__.appAppearanceReducers,
    audioStream: _reducers_audio_stream_reducer__WEBPACK_IMPORTED_MODULE_13__.audioStreamReducers,
    recognition: _reducers_recognition_reducer__WEBPACK_IMPORTED_MODULE_15__.recognitionReducers,
    settings: _reducers_settings_reducer__WEBPACK_IMPORTED_MODULE_16__.settingsReducers,
    peer: _reducers_peer_reducer__WEBPACK_IMPORTED_MODULE_14__.peerReducers,
    obs: _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_20__.obsReducers
  }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_34__.EffectsModule.forRoot([_effects_app_effects__WEBPACK_IMPORTED_MODULE_10__.AppEffects, _effects_settings_effects__WEBPACK_IMPORTED_MODULE_17__.SettingsEffects, _effects_recognition_effects__WEBPACK_IMPORTED_MODULE_18__.RecognitionEffects]), _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_35__.StoreDevtoolsModule.instrument({
    maxAge: 10
  }), _angular_common_http__WEBPACK_IMPORTED_MODULE_36__.HttpClientModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_37__.TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_37__.TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_36__.HttpClient]
    }
  }), ngx_timeago__WEBPACK_IMPORTED_MODULE_38__.TimeagoModule.forRoot()]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _components_header_header_component__WEBPACK_IMPORTED_MODULE_5__.HeaderComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__.FooterComponent, _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__.HomeComponent, _components_about_about_component__WEBPACK_IMPORTED_MODULE_2__.AboutComponent, _components_welcome_splash_welcome_splash_component__WEBPACK_IMPORTED_MODULE_9__.WelcomeSplashComponent, _components_cookie_modal_cookie_modal_component__WEBPACK_IMPORTED_MODULE_3__.CookieModalComponent, _components_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_7__.PrivacyComponent, _components_terms_and_conditions_terms_and_conditions_component__WEBPACK_IMPORTED_MODULE_8__.TermsAndConditionsComponent, _components_service_worker_update_service_worker_update_component__WEBPACK_IMPORTED_MODULE_19__.ServiceWorkerUpdateComponent, _components_offline_warning_offline_warning_component__WEBPACK_IMPORTED_MODULE_21__.OfflineWarningComponent, _components_detect_pwa_install_detect_pwa_install_component__WEBPACK_IMPORTED_MODULE_22__.DetectPwaInstallComponent],
    imports: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_25__.BrowserAnimationsModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.BrowserModule, _angular_router__WEBPACK_IMPORTED_MODULE_27__.RouterModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_28__.ServiceWorkerModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_29__.NgIconsModule, shared_ui__WEBPACK_IMPORTED_MODULE_31__.SharedUiModule, _modules_media_media_module__WEBPACK_IMPORTED_MODULE_11__.MediaModule, _angular_forms__WEBPACK_IMPORTED_MODULE_32__.ReactiveFormsModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_33__.StoreRootModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_34__.EffectsRootModule, _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_35__.StoreDevtoolsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_36__.HttpClientModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_37__.TranslateModule, ngx_timeago__WEBPACK_IMPORTED_MODULE_38__.TimeagoModule]
  });
})();

/***/ }),

/***/ 1387:
/*!***********************************************!*\
  !*** ./packages/client/src/app/app.routes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appRoutes": () => (/* binding */ appRoutes)
/* harmony export */ });
/* harmony import */ var _components_about_about_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/about/about.component */ 200);
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home/home.component */ 2587);
/* harmony import */ var _components_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/privacy/privacy.component */ 8279);
/* harmony import */ var _components_terms_and_conditions_terms_and_conditions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/terms-and-conditions/terms-and-conditions.component */ 5601);
/* harmony import */ var _modules_settings_components_cookie_policy_cookie_policy_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/settings/components/cookie-policy/cookie-policy.component */ 190);





const appRoutes = [{
  path: '',
  component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent,
  data: {
    name: `home`
  }
}, {
  path: 'about',
  component: _components_about_about_component__WEBPACK_IMPORTED_MODULE_0__.AboutComponent,
  data: {
    name: `about`
  }
}, {
  path: 'privacy',
  component: _components_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_2__.PrivacyComponent,
  data: {
    name: 'privacy'
  }
}, {
  path: 'terms',
  component: _components_terms_and_conditions_terms_and_conditions_component__WEBPACK_IMPORTED_MODULE_3__.TermsAndConditionsComponent,
  data: {
    name: 'terms'
  }
}, {
  path: 'cookies',
  component: _modules_settings_components_cookie_policy_cookie_policy_component__WEBPACK_IMPORTED_MODULE_4__.CookiePolicyComponent,
  data: {
    name: 'cookies'
  }
}, {
  path: 'settings',
  loadChildren: () => __webpack_require__.e(/*! import() */ "packages_client_src_app_modules_settings_settings_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/settings/settings.module */ 3328)).then(m => m.SettingsModule),
  data: {
    name: `settings`
  }
}, {
  path: 'stream',
  loadChildren: () => __webpack_require__.e(/*! import() */ "packages_client_src_app_modules_peer_peer_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/peer/peer.module */ 1734)).then(m => m.PeerModule),
  data: {
    name: 'stream'
  }
}];

/***/ }),

/***/ 200:
/*!*********************************************************************!*\
  !*** ./packages/client/src/app/components/about/about.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutComponent": () => (/* binding */ AboutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 1468);



function AboutComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "h1", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 2, entry_r1.heading));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 4, entry_r1.body));
  }
}
class AboutComponent {
  constructor() {
    this.contents = [{
      heading: `ABOUT.h1`,
      body: `ABOUT.b1`
    }, {
      heading: `ABOUT.h2`,
      body: `ABOUT.b2`
    }, {
      heading: `ABOUT.h3`,
      body: `ABOUT.b3`
    }, {
      heading: `ABOUT.h4`,
      body: `ABOUT.b4`
    }, {
      heading: `ABOUT.h5`,
      body: `ABOUT.b5`
    }];
  }
}
AboutComponent.ɵfac = function AboutComponent_Factory(t) {
  return new (t || AboutComponent)();
};
AboutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AboutComponent,
  selectors: [["app-about"]],
  decls: 2,
  vars: 1,
  consts: [[1, "flex", "flex-col", "justify-start", "basis-full", "overflow-y-auto", "py-6", "gap-6"], ["class", "flex-auto hero", 4, "ngFor", "ngForOf"], [1, "flex-auto", "hero"], [1, "hero-content", "text-center", "bg-base-200", "rounded-xl"], [1, "max-w-md"], [1, "text-5xl", "font-bold"], [1, "py-6"]],
  template: function AboutComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AboutComponent_div_1_Template, 9, 6, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contents);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvYWJvdXQvYWJvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGdLQUFnSyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 2813:
/*!***********************************************************************************!*\
  !*** ./packages/client/src/app/components/cookie-modal/cookie-modal.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CookieModalComponent": () => (/* binding */ CookieModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/app.model */ 4056);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors/app.selector */ 8603);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 1468);













const _c0 = ["modal"];
const _c1 = ["close"];
function CookieModalComponent_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CookieModalComponent_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](_r1.showModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ng-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "COOKIES.MODAL.name"));
  }
}
const _c2 = function (a0, a1) {
  return {
    "btn-primary": a0,
    "btn-info": a1
  };
};
class CookieModalComponent {
  constructor(store, renderer) {
    this.store = store;
    this.renderer = renderer;
    this.accepted = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__.selectAppAppearance), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(appearance => appearance.cookiesAccepted)));
    this.declinedDate = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__.selectAppAppearance), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(appearance => appearance.cookiesDeclinedTimestamp)));
  }
  ngAfterViewInit() {
    if (this.accepted() === false && this.declinedDate() === undefined) {
      this._openModal();
    }
  }
  accept() {
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.acceptCookies());
    this._closeModal();
  }
  decline() {
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.declineCookies());
    this._closeModal();
  }
  _openModal() {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '');
  }
  _closeModal() {
    this.closeButton.nativeElement.click();
  }
}
CookieModalComponent.ɵfac = function CookieModalComponent_Factory(t) {
  return new (t || CookieModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Renderer2));
};
CookieModalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: CookieModalComponent,
  selectors: [["app-cookie-modal"]],
  viewQuery: function CookieModalComponent_Query(rf, ctx) {
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
  decls: 31,
  vars: 33,
  consts: [["class", "tooltip tooltip-right", "aria-label", "Cookie Policy", 3, "click", 4, "ngIf"], [1, "modal", "modal-bottom"], ["modal", ""], ["method", "dialog", 1, "modal-box", "bg-base-content", "text-base-100", "sm:w-11/12", "justify-self-center"], [1, "font-bold", "text-lg"], [1, "text-base", "mt-1"], [1, "modal-action"], ["routerLink", "cookies", 1, "btn"], [1, "btn", 3, "disabled", "click"], ["aria-label", "Accept cookies", 1, "btn", 3, "ngClass", "click"], ["method", "dialog", 1, "modal-backdrop"], ["close", ""], ["aria-label", "Cookie Policy", 1, "tooltip", "tooltip-right", 3, "click"], ["open", ""], ["name", "cookie", "size", "24"]],
  template: function CookieModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, CookieModalComponent_button_0_Template, 4, 3, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "dialog", 1, 2)(3, "form", 3)(4, "h3", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](12, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](15, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 6)(17, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](18, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](20, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CookieModalComponent_Template_button_click_21_listener() {
        return ctx.decline();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](23, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CookieModalComponent_Template_button_click_24_listener() {
        return ctx.accept();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](26, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "form", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "button", null, 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](30, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.accepted());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 12, "COOKIES.MODAL.title"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 14, "COOKIES.MODAL.p1"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](12, 16, "COOKIES.MODAL.p2"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](15, 18, "COOKIES.MODAL.p3"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](18, 20, "LABELS.viewPolicy"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](20, 22, "BUTTONS.viewPolicy"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.accepted() || !!ctx.declinedDate());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", !!ctx.declinedDate() ? "BUTTONS.rejected" : _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](23, 24, "BUTTONS.reject"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](30, _c2, !ctx.accepted(), ctx.accepted()));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](26, 26, ctx.accepted() ? "BUTTONS.accepted" : "BUTTONS.acceptAll"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](30, 28, "closeCookieModal"));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _ng_icons_core__WEBPACK_IMPORTED_MODULE_8__.NgIconComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb29raWUtbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvY29va2llLW1vZGFsL2Nvb2tpZS1tb2RhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 9894:
/*!***********************************************************************************************!*\
  !*** ./packages/client/src/app/components/detect-pwa-install/detect-pwa-install.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetectPwaInstallComponent": () => (/* binding */ DetectPwaInstallComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/storage.service */ 9773);




class DetectPwaInstallComponent {
  constructor(storage) {
    this.storage = storage;
    this.isInstalled = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    this.isUsingPwa = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    const isInstalled = this.storage.get('pwaInstalled');
    if (isInstalled === '1') {
      this.isInstalled.set(true);
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('matches standalone');
      if (!this.isInstalled()) {
        this._markInstalled();
      }
      this.isUsingPwa.set(true);
    } else {
      window.addEventListener('beforeinstallprompt', e => {
        console.log('beforeinstallprompt', e);
        if (this.isInstalled()) {
          this._removeInstallMark();
        }
      });
      window.addEventListener('appinstalled', () => {
        this._markInstalled();
      });
    }
    document.addEventListener('DOMContentLoaded', () => {
      // @ts-expect-error Property standalone only exists on navigator in iOS
      const navStandalone = window.navigator.standalone;
      const isPwa = window.matchMedia('(display-mode: standalone)').matches || navStandalone;
      if (isPwa && !this.isInstalled()) {
        this._markInstalled();
      }
    });
  }
  _markInstalled() {
    this.storage.set('pwaInstalled', '1');
    this.isInstalled.set(true);
    window.resizeTo(420, 800);
  }
  _removeInstallMark() {
    this.storage.remove('pwaInstalled');
    this.isInstalled.set(false);
  }
}
DetectPwaInstallComponent.ɵfac = function DetectPwaInstallComponent_Factory(t) {
  return new (t || DetectPwaInstallComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService));
};
DetectPwaInstallComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: DetectPwaInstallComponent,
  selectors: [["app-detect-pwa-install"]],
  decls: 0,
  vars: 0,
  template: function DetectPwaInstallComponent_Template(rf, ctx) {},
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXRlY3QtcHdhLWluc3RhbGwuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvZGV0ZWN0LXB3YS1pbnN0YWxsL2RldGVjdC1wd2EtaW5zdGFsbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0xBQW9MIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 9516:
/*!***********************************************************************!*\
  !*** ./packages/client/src/app/components/footer/footer.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterComponent": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../selectors/app.selector */ 8603);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _cookie_modal_cookie_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cookie-modal/cookie-modal.component */ 2813);














function FooterComponent_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const err_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](err_r1);
  }
}
class FooterComponent {
  constructor(store, router) {
    this.store = store;
    this.router = router;
    this.repoUrl = 'https://github.com/jptrsn/zip-captions';
    this.licenseUrl = 'https://github.com/jptrsn/zip-captions/blob/main/LICENSE';
    this.patreonUrl = 'https://patreon.com/zipcaptions';
    this.copyrightYear = 2023 || 0;
    this.buildHash = "55d0958069e8ebf1b5985a288f628be73af4f95f" || 0;
    this.hidden = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__.footerVisibleSelector)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(visible => !visible)));
    this.error$ = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__.errorSelector));
    this.activeRoute$ = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(ev => ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_7__.NavigationEnd), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(ev => ev.url)));
  }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) {
  return new (t || FooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
};
FooterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: FooterComponent,
  selectors: [["app-footer"]],
  decls: 19,
  vars: 18,
  consts: [[1, "footer", "bg-base-300", "flex", "flex-auto", "items-center", "flex-row", "overflow-hidden", "px-6", "py-2"], [1, "flex", "flex-row", "gap-6"], ["target", "_blank", 1, "tooltip", "tooltip-right", 3, "href"], ["name", "githubLogo", "size", "24"], ["src", "./assets/icons/patreon.png", "width", "24", "height", "24"], [1, "flex-auto", "flex-grow", "justify-items-center", "text-error", "text-lg"], ["translate", "", "class", "text-center", 4, "ngIf"], [1, "flex-initial", "flex-row"], ["target", "_blank", 1, "text-sm", "mx-4", "my-2", "text-base-content", "tooltip", "tooltip-left", "tooltip-info", 3, "href"], ["translate", "", 1, "text-center"]],
  template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "footer", 0)(2, "div", 1)(3, "a", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "ng-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "a", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "app-cookie-modal");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, FooterComponent_span_11_Template, 2, 1, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 7)(13, "a", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](14, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](17, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, " - Zip Captions ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@collapse", ctx.hidden());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx.repoUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 10, "LABELS.viewGithub"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx.patreonUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 12, "LABELS.patreon"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.activeRoute$() === "/" && ctx.error$());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("href", ctx.licenseUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](14, 14, "LABELS.build") + ": " + ctx.buildHash);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](17, 16, "FOOTER.copyright"), " ", ctx.copyrightYear, "");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_9__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateDirective, _cookie_modal_cookie_modal_component__WEBPACK_IMPORTED_MODULE_1__.CookieModalComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0tBQW9LIiwic291cmNlUm9vdCI6IiJ9 */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_11__.collapseAnimation)()]
  }
});


/***/ }),

/***/ 7885:
/*!***********************************************************************!*\
  !*** ./packages/client/src/app/components/header/header.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/animations */ 2223);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/app.model */ 4056);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../selectors/app.selector */ 8603);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../selectors/peer.selectors */ 3827);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../selectors/recognition.selector */ 2513);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _modules_media_components_audio_input_enable_audio_input_enable_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/media/components/audio-input-enable/audio-input-enable.component */ 386);
/* harmony import */ var _modules_media_components_recognition_enable_recognition_enable_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/media/components/recognition-enable/recognition-enable.component */ 4315);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _detect_pwa_install_detect_pwa_install_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../detect-pwa-install/detect-pwa-install.component */ 9894);




















const _c0 = ["menu"];
function HeaderComponent_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "ZipCaptions");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_div_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "ZipCaptions.app");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function HeaderComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, HeaderComponent_div_3_div_1_Template, 2, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, HeaderComponent_div_3_ng_template_2_Template, 2, 0, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](3);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.isActive())("ngIfElse", _r9);
  }
}
function HeaderComponent_ng_container_4_app_audio_input_enable_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-audio-input-enable");
  }
}
function HeaderComponent_ng_container_4_app_recognition_enable_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-recognition-enable");
  }
}
function HeaderComponent_ng_container_4_button_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "ng-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 1, "ROUTES.stream"));
  }
}
function HeaderComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, HeaderComponent_ng_container_4_app_audio_input_enable_1_Template, 1, 0, "app-audio-input-enable", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, HeaderComponent_ng_container_4_app_recognition_enable_2_Template, 1, 0, "app-recognition-enable", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, HeaderComponent_ng_container_4_button_3_Template, 3, 3, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngSwitch", ctx_r1.showRecordButton());
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngSwitchCase", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngSwitchCase", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.isActive());
  }
}
function HeaderComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 19)(2, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "HINTS.viewStream");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
}
function HeaderComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-detect-pwa-install");
  }
}
function HeaderComponent_details_8_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainer"](0);
  }
}
const _c1 = function (a0) {
  return {
    items: a0,
    largeText: true
  };
};
function HeaderComponent_details_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "details", 21, 22)(2, "summary", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "ng-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, HeaderComponent_details_8_ng_container_6_Template, 1, 0, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 3, "LABELS.menu"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngTemplateOutlet", _r6)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c1, ctx_r5.menuItems));
  }
}
function HeaderComponent_ng_template_9_li_1_ng_container_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainer"](0);
  }
}
const _c2 = function (a0) {
  return {
    "text-lg": a0
  };
};
const _c3 = function (a0) {
  return {
    items: a0
  };
};
function HeaderComponent_ng_template_9_li_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "details")(2, "summary", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, HeaderComponent_ng_template_9_li_1_ng_container_1_ng_container_5_Template, 1, 0, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const largeText_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().largeText;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](6, _c2, largeText_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, "ROUTES." + item_r19.label));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngTemplateOutlet", _r6)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](8, _c3, item_r19.children));
  }
}
function HeaderComponent_ng_template_9_li_1_ng_template_2_button_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    const largeText_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().largeText;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", ctx_r26.activeRoute() === item_r19.routerOutlet ? null : item_r19.routerOutlet)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c2, largeText_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 3, "ROUTES." + item_r19.label), " ");
  }
}
function HeaderComponent_ng_template_9_li_1_ng_template_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "a", 34)(1, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "ng-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2).$implicit;
    const largeText_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().largeText;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("href", item_r19.href, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"])("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](5, _c2, largeText_r17));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 3, "ROUTES." + item_r19.label), " ");
  }
}
function HeaderComponent_ng_template_9_li_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, HeaderComponent_ng_template_9_li_1_ng_template_2_button_0_Template, 3, 7, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, HeaderComponent_ng_template_9_li_1_ng_template_2_ng_template_1_Template, 5, 7, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](2);
    const item_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r19.routerOutlet)("ngIfElse", _r27);
  }
}
const _c4 = function (a0) {
  return {
    "disabled": a0
  };
};
function HeaderComponent_ng_template_9_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, HeaderComponent_ng_template_9_li_1_ng_container_1_Template, 6, 10, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, HeaderComponent_ng_template_9_li_1_ng_template_2_Template, 3, 2, "ng-template", null, 30, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](3);
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](3, _c4, ctx_r18.activeRoute() === item_r19.routerOutlet));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r19.children)("ngIfElse", _r21);
  }
}
function HeaderComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, HeaderComponent_ng_template_9_li_1_Template, 4, 5, "li", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const entries_r16 = ctx.items;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", entries_r16);
  }
}
const _c5 = function () {
  return [""];
};
class HeaderComponent {
  constructor(router, store, renderer) {
    this.router = router;
    this.store = store;
    this.renderer = renderer;
    this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
    this.isActive = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.select)(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_4__.recognitionStatusSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(status => status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionStatus.connected)));
    this.isBroadcasting = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_3__.selectIsBroadcasting));
    this.activeRoute = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.signal)(this.router.url);
    this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.filter)(ev => ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_14__.NavigationStart), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.onDestroy$)).subscribe(ev => {
      if (this.menuElement?.nativeElement) {
        this.renderer.removeAttribute(this.menuElement.nativeElement, 'open');
      }
    });
    this.menuItems = [{
      label: 'home',
      routerOutlet: '/'
    }, {
      label: 'stream',
      routerOutlet: '/stream'
    }, {
      label: 'settings',
      routerOutlet: '/settings'
    }, {
      label: 'policies',
      children: [{
        label: 'privacy',
        routerOutlet: '/privacy'
      }, {
        label: 'terms',
        routerOutlet: '/terms'
      }, {
        label: 'cookies',
        routerOutlet: '/cookies'
      }]
    }, {
      label: 'support',
      children: [{
        label: 'github',
        href: 'https://github.com/jptrsn/zip-captions/issues'
      }, {
        label: 'discord',
        href: 'https://discord.gg/Swe2JeHnPc'
      }, {
        label: 'help',
        href: 'https://help.zipcaptions.app'
      }, {
        label: 'donate',
        href: 'https://www.patreon.com/zipcaptions'
      }]
    }];
    this.showRecordButton = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_2__.platformSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(platform => platform === _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.desktop)));
  }
  ngOnInit() {
    this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.takeUntil)(this.onDestroy$), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.filter)(ev => ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_14__.NavigationEnd)).subscribe(ev => {
      this.activeRoute.set(ev.url);
    });
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
  return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.Renderer2));
};
HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: HeaderComponent,
  selectors: [["app-header"]],
  viewQuery: function HeaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_8__.ElementRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.menuElement = _t.first);
    }
  },
  decls: 11,
  vars: 10,
  consts: [[1, "bg-base-300", "gap-3", "flex", "flex-row", "items-center", "p-2"], [1, "flex", 3, "routerLink", "disabled"], ["name", "zipCaptionsLogo", 3, "size"], ["class", "flex-1", 4, "ngIf"], [3, "ngSwitch", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["checkForInstall", ""], ["class", "dropdown dropdown-end z-10", 4, "ngIf"], ["routeList", ""], [1, "flex-1"], ["class", "normal-case text-xl", 4, "ngIf", "ngIfElse"], ["smallTitle", ""], [1, "normal-case", "text-xl"], [1, "normal-case", "text-sm"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "btn btn-circle tooltip tooltip-bottom", "routerLink", "stream", 4, "ngIf"], ["routerLink", "stream", 1, "btn", "btn-circle", "tooltip", "tooltip-bottom"], ["name", "tablerBuildingBroadcastTower"], [1, "flex", "flex-auto", "flex-row", "justify-center"], ["translate", "", 1, "sm:text-xl", "md:text-2xl", "text-center"], [1, "dropdown", "dropdown-end", "z-10"], ["menu", ""], ["role", "button", 1, "m-1", "btn", "btn-circle", "btn-ghost", "text-2xl"], ["name", "heroBars3"], [1, "dropdown-content", "w-64"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "0", 1, "menu", "menu-vertical", "p-2", "shadow", "bg-neutral", "text-neutral-content", "rounded-box"], [3, "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"], ["routeButton", ""], [3, "routerLink", "ngClass", 4, "ngIf", "ngIfElse"], ["linkButton", ""], [3, "routerLink", "ngClass"], ["target", "_blank", 1, "flex", 3, "href", "ngClass"], [1, "flex", "basis-full"], ["name", "heroArrowTopRightOnSquare"]],
  template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "ng-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, HeaderComponent_div_3_Template, 4, 2, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, HeaderComponent_ng_container_4_Template, 4, 4, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, HeaderComponent_ng_container_5_Template, 4, 0, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, HeaderComponent_ng_template_6_Template, 1, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, HeaderComponent_details_8_Template, 7, 7, "details", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, HeaderComponent_ng_template_9_Template, 2, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@growshrink", ctx.isActive());
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](9, _c5))("disabled", ctx.activeRoute() === "/");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", ctx.isActive() && !ctx.isBroadcasting() ? "24" : "48");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.isBroadcasting());
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.activeRoute() === "/");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isBroadcasting())("ngIfElse", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.isActive());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgSwitchCase, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLink, _ng_icons_core__WEBPACK_IMPORTED_MODULE_17__.NgIconComponent, _modules_media_components_audio_input_enable_audio_input_enable_component__WEBPACK_IMPORTED_MODULE_5__.AudioInputEnableComponent, _modules_media_components_recognition_enable_recognition_enable_component__WEBPACK_IMPORTED_MODULE_6__.RecognitionEnableComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateDirective, _detect_pwa_install_detect_pwa_install_component__WEBPACK_IMPORTED_MODULE_7__.DetectPwaInstallComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe],
  styles: [".pwa-title-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  left: env(titlebar-area-x, 0);\n  top: env(titlebar-area-y, 0);\n  width: env(titlebar-area-width, 100%);\n  height: env(titlebar-area-height, 24px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EscUNBQUE7RUFDQSx1Q0FBQTtBQUNGIiwiZmlsZSI6ImhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wd2EtdGl0bGUtYmFyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiBlbnYodGl0bGViYXItYXJlYS14LCAwKTtcbiAgdG9wOiBlbnYodGl0bGViYXItYXJlYS15LCAwKTtcbiAgd2lkdGg6IGVudih0aXRsZWJhci1hcmVhLXdpZHRoLCAxMDAlKTtcbiAgaGVpZ2h0OiBlbnYodGl0bGViYXItYXJlYS1oZWlnaHQsIDI0cHgpO1xufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EscUNBQUE7RUFDQSx1Q0FBQTtBQUNGO0FBQ0Esb2pCQUFvakIiLCJzb3VyY2VzQ29udGVudCI6WyIucHdhLXRpdGxlLWJhciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogZW52KHRpdGxlYmFyLWFyZWEteCwgMCk7XG4gIHRvcDogZW52KHRpdGxlYmFyLWFyZWEteSwgMCk7XG4gIHdpZHRoOiBlbnYodGl0bGViYXItYXJlYS13aWR0aCwgMTAwJSk7XG4gIGhlaWdodDogZW52KHRpdGxlYmFyLWFyZWEtaGVpZ2h0LCAyNHB4KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"],
  data: {
    animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.trigger)('growshrink', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.transition)('true => false', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.style)({
      height: '{{startHeight}}px',
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.animate)('.5s ease')], {
      params: {
        startHeight: 24
      }
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.transition)('false => true', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.style)({
      height: '{{startHeight}}px',
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_19__.animate)('.5s ease')], {
      params: {
        startHeight: 72
      }
    })])]
  }
});


/***/ }),

/***/ 2587:
/*!*******************************************************************!*\
  !*** ./packages/client/src/app/components/home/home.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../selectors/app.selector */ 8603);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors/recognition.selector */ 2513);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/recognition.model */ 1088);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _modules_media_components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/media/components/recognition-render/recognition-render.component */ 5741);
/* harmony import */ var _welcome_splash_welcome_splash_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../welcome-splash/welcome-splash.component */ 1141);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 1468);














function HomeComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 3)(2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "HOME.loading"));
  }
}
function HomeComponent_ng_template_2_app_recognition_render_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-recognition-render", 7);
  }
}
function HomeComponent_ng_template_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-welcome-splash", 8);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("@slideOutUpOnLeave", undefined);
  }
}
function HomeComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, HomeComponent_ng_template_2_app_recognition_render_0_Template, 1, 0, "app-recognition-render", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, HomeComponent_ng_template_2_ng_template_1_Template, 1, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](2);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.hasResults())("ngIfElse", _r4);
  }
}
class HomeComponent {
  constructor(store) {
    this.store = store;
    this.loading = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__.loadingSelector)));
    this.isRecognizing = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.select)(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionStatusSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(status => status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_2__.RecognitionStatus.connected)));
    this.hasResults = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.select)(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionStatusSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(status => status !== _models_recognition_model__WEBPACK_IMPORTED_MODULE_2__.RecognitionStatus.uninitialized)));
  }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) {
  return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.Store));
};
HomeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: HomeComponent,
  selectors: [["app-home"]],
  decls: 4,
  vars: 2,
  consts: [[1, "flex", "flex-col", "w-full", "h-full"], [4, "ngIf", "ngIfElse"], ["loadedView", ""], [1, "flex", "flex-col", "self-center", "items-center", "justify-center", "px-6", "py-12", "rounded", "outline-1", "bg-base-300"], [1, "text-lg"], ["class", "flex basis-full overflow-y-hidden", 4, "ngIf", "ngIfElse"], ["appContent", ""], [1, "flex", "basis-full", "overflow-y-hidden"], [1, "flex", "basis-full"]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, HomeComponent_ng_container_1_Template, 5, 3, "ng-container", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, HomeComponent_ng_template_2_Template, 3, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading())("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _modules_media_components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_3__.RecognitionRenderComponent, _welcome_splash_welcome_splash_component__WEBPACK_IMPORTED_MODULE_4__.WelcomeSplashComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnS0FBZ0siLCJzb3VyY2VSb290IjoiIn0= */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_11__.slideOutUpOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 8459:
/*!*****************************************************************************************!*\
  !*** ./packages/client/src/app/components/offline-warning/offline-warning.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfflineWarningComponent": () => (/* binding */ OfflineWarningComponent)
/* harmony export */ });
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/app.model */ 4056);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors/app.selector */ 8603);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 1468);









function OfflineWarningComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " HINTS.offlineWarning ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
class OfflineWarningComponent {
  constructor(store) {
    this.store = store;
    this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.updateConnectivityState({
      connectivity: window.navigator.onLine ? _models_app_model__WEBPACK_IMPORTED_MODULE_0__.Connectivity.online : _models_app_model__WEBPACK_IMPORTED_MODULE_0__.Connectivity.offline
    }));
    window.addEventListener('online', () => this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.updateConnectivityState({
      connectivity: _models_app_model__WEBPACK_IMPORTED_MODULE_0__.Connectivity.online
    })));
    window.addEventListener('offline', () => this.store.dispatch(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.updateConnectivityState({
      connectivity: _models_app_model__WEBPACK_IMPORTED_MODULE_0__.Connectivity.offline
    })));
    this.isOffline = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.select(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__.isOfflineSelector));
  }
}
OfflineWarningComponent.ɵfac = function OfflineWarningComponent_Factory(t) {
  return new (t || OfflineWarningComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store));
};
OfflineWarningComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: OfflineWarningComponent,
  selectors: [["app-offline-warning"]],
  decls: 1,
  vars: 1,
  consts: [["class", "absolute top-0 bottom-0 left-0 right-0 bg-cover bg-white bg-opacity-20 backdrop-blur-lg", 4, "ngIf"], [1, "absolute", "top-0", "bottom-0", "left-0", "right-0", "bg-cover", "bg-white", "bg-opacity-20", "backdrop-blur-lg"], ["translate", "", 1, "badge", "badge-error", "text-2xl", "h-auto", "text-center", "max-w-xs", "fixed", "top-1/2", "left-1/2", "-translate-y-1/2", "-translate-x-1/2", "p-3"]],
  template: function OfflineWarningComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, OfflineWarningComponent_div_0_Template, 3, 0, "div", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isOffline());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateDirective],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvZmZsaW5lLXdhcm5pbmcuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvb2ZmbGluZS13YXJuaW5nL29mZmxpbmUtd2FybmluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0xBQWdMIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 8279:
/*!*************************************************************************!*\
  !*** ./packages/client/src/app/components/privacy/privacy.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivacyComponent": () => (/* binding */ PrivacyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 1468);



function PrivacyComponent_div_4_ng_container_5_ul_4_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, item_r6));
  }
}
function PrivacyComponent_div_4_ng_container_5_ul_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PrivacyComponent_div_4_ng_container_5_ul_4_li_1_Template, 3, 3, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const paragraph_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", paragraph_r3.list);
  }
}
function PrivacyComponent_div_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PrivacyComponent_div_4_ng_container_5_ul_4_Template, 2, 1, "ul", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const paragraph_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, paragraph_r3.text));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", paragraph_r3.list);
  }
}
function PrivacyComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, PrivacyComponent_div_4_ng_container_5_Template, 5, 4, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, entry_r1.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", entry_r1.sections);
  }
}
class PrivacyComponent {
  constructor() {
    this.contents = [{
      title: 'PRIVACY.1',
      sections: [{
        text: 'PRIVACY.1.1'
      }, {
        text: 'PRIVACY.1.2'
      }]
    }, {
      title: "PRIVACY.2",
      sections: [{
        text: 'PRIVACY.2.1'
      }]
    }, {
      title: "PRIVACY.3",
      sections: [{
        text: 'PRIVACY.3.1',
        list: ['PRIVACY.3.1a', 'PRIVACY.3.1b', 'PRIVACY.3.1c', 'PRIVACY.3.1d', 'PRIVACY.3.1e', 'PRIVACY.3.1f', 'PRIVACY.3.1g', 'PRIVACY.3.1h', 'PRIVACY.3.1i']
      }, {
        text: 'PRIVACY.3.2'
      }]
    }, {
      title: 'PRIVACY.4',
      sections: [{
        text: 'PRIVACY.4.1'
      }, {
        text: 'PRIVACY.4.2',
        list: ['PRIVACY.4.2a', 'PRIVACY.4.2b', 'PRIVACY.4.2c', 'PRIVACY.4.2d', 'PRIVACY.4.2e', 'PRIVACY.4.2f', 'PRIVACY.4.2g', 'PRIVACY.4.2h', 'PRIVACY.4.2i', 'PRIVACY.4.2j', 'PRIVACY.4.2k', 'PRIVACY.4.2l', 'PRIVACY.4.2m', 'PRIVACY.4.2n']
      }, {
        text: 'PRIVACY.4.3'
      }, {
        text: 'PRIVACY.4.4'
      }, {
        text: 'PRIVACY.4.5'
      }, {
        text: 'PRIVACY.4.6'
      }]
    }, {
      title: 'PRIVACY.5',
      sections: [{
        text: 'PRIVACY.5.1'
      }, {
        text: 'PRIVACY.5.2'
      }, {
        text: 'PRIVACY.5.3',
        list: ['PRIVACY.5.3a', 'PRIVACY.5.3b', 'PRIVACY.5.3c', 'PRIVACY.5.3d', 'PRIVACY.5.3e']
      }, {
        text: 'PRIVACY.5.4'
      }]
    }, {
      title: 'PRIVACY.6',
      sections: [{
        text: 'PRIVACY.6.1'
      }, {
        text: 'PRIVACY.6.2'
      }, {
        text: 'PRIVACY.6.3'
      }, {
        text: 'PRIVACY.6.4'
      }]
    }, {
      title: 'PRIVACY.7',
      sections: [{
        text: 'PRIVACY.7.1'
      }, {
        text: 'PRIVACY.7.2'
      }, {
        text: 'PRIVACY.7.3',
        list: ['PRIVACY.7.3a']
      }, {
        text: 'PRIVACY.7.4',
        list: ['PRIVACY.7.4a', 'PRIVACY.7.4b', 'PRIVACY.7.4c']
      }]
    }, {
      title: 'PRIVACY.8',
      sections: [{
        text: 'PRIVACY.8.1'
      }, {
        text: 'PRIVACY.8.2'
      }, {
        text: 'PRIVACY.8.3'
      }, {
        text: 'PRIVACY.8.4'
      }, {
        text: 'PRIVACY.8.5'
      }]
    }, {
      title: 'PRIVACY.9',
      sections: [{
        text: 'PRIVACY.9.1'
      }, {
        text: 'PRIVACY.9.2'
      }, {
        text: 'PRIVACY.9.3'
      }]
    }, {
      title: 'PRIVACY.10',
      sections: [{
        text: 'PRIVACY.10.1',
        list: ['PRIVACY.10.1a', 'PRIVACY.10.1b']
      }, {
        text: 'PRIVACY.10.2'
      }, {
        text: 'PRIVACY.10.3'
      }]
    }, {
      title: 'PRIVACY.11',
      sections: [{
        text: 'PRIVACY.11.1'
      }, {
        text: 'PRIVACY.11.2'
      }]
    }, {
      title: 'PRIVACY.12',
      sections: [{
        text: 'PRIVACY.12.1'
      }]
    }, {
      title: 'PRIVACY.13',
      sections: [{
        text: 'PRIVACY.13.1'
      }]
    }];
  }
}
PrivacyComponent.ɵfac = function PrivacyComponent_Factory(t) {
  return new (t || PrivacyComponent)();
};
PrivacyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: PrivacyComponent,
  selectors: [["app-privacy"]],
  decls: 5,
  vars: 1,
  consts: [[1, "flex", "flex-col", "w-full", "h-full", "p-3", "items-center", "overflow-y-auto"], [1, "flex", "flex-col", "w-full", "max-w-lg", "justify-items-stretch", "gap-3"], ["translate", "", 1, "text-2xl", "font-bold"], ["tabindex", "0", "class", "collapse collapse-plus bg-base-300", 4, "ngFor", "ngForOf"], ["tabindex", "0", 1, "collapse", "collapse-plus", "bg-base-300"], [1, "collapse-title", "text-xl", "font-medium"], [1, "collapse-content"], [4, "ngFor", "ngForOf"], [1, "text-sm", "mb-3"], ["class", "text-xs list-disc pl-3", 4, "ngIf"], [1, "text-xs", "list-disc", "pl-3"], ["class", "mb-3", 4, "ngFor", "ngForOf"], [1, "mb-3"]],
  template: function PrivacyComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "PRIVACY.title");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PrivacyComponent_div_4_Template, 6, 4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contents);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcml2YWN5LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvcHJpdmFjeS9wcml2YWN5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvS0FBb0siLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 1842:
/*!*****************************************************************************************************!*\
  !*** ./packages/client/src/app/components/service-worker-update/service-worker-update.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceWorkerUpdateComponent": () => (/* binding */ ServiceWorkerUpdateComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9337);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 5004);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/service-worker */ 4413);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 1468);












function ServiceWorkerUpdateComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 5);
  }
}
function ServiceWorkerUpdateComponent_div_0_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ServiceWorkerUpdateComponent_div_0_ng_container_6_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r4.reload());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ng-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ServiceWorkerUpdateComponent_div_0_ng_container_6_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6.dismiss());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "ng-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, "BUTTONS.accept"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 4, "BUTTONS.decline"));
  }
}
function ServiceWorkerUpdateComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ServiceWorkerUpdateComponent_div_0_div_5_Template, 1, 0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ServiceWorkerUpdateComponent_div_0_ng_container_6_Template, 7, 6, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const text_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@expandRightOnEnter", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 4, "SW_VERSION." + text_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", text_r1 === "VERSION_DETECTED");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", text_r1 === "VERSION_READY");
  }
}
class ServiceWorkerUpdateComponent {
  constructor(updates, router) {
    this.updates = updates;
    this.router = router;
    this.showMessage = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(true);
    this.message = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__.toSignal)(this.updates.versionUpdates.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
        case 'NO_NEW_VERSION_DETECTED':
          console.log(`No new version detected: ${evt.version.hash}`);
          break;
      }
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(evt => evt.type), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(type => type !== 'NO_NEW_VERSION_DETECTED')));
    this.updates.checkForUpdate();
    this.router.events.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__.takeUntilDestroyed)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.filter)(ev => ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_5__.NavigationStart), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throttleTime)(30000)).subscribe(() => {
      this.updates.checkForUpdate();
    });
  }
  reload() {
    document.location.reload();
  }
  dismiss() {
    this.showMessage.set(false);
  }
}
ServiceWorkerUpdateComponent.ɵfac = function ServiceWorkerUpdateComponent_Factory(t) {
  return new (t || ServiceWorkerUpdateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_7__.SwUpdate), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
};
ServiceWorkerUpdateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ServiceWorkerUpdateComponent,
  selectors: [["app-service-worker-update"]],
  decls: 1,
  vars: 1,
  consts: [["class", "toast toast-start toast-top z-30", 4, "ngIf"], [1, "toast", "toast-start", "toast-top", "z-30"], [1, "alert", "alert-warning", "text-sm", "flex", "items-center", "gap-3"], ["class", "loading loading-spinner", 4, "ngIf"], [4, "ngIf"], [1, "loading", "loading-spinner"], [1, "btn", "btn-xs", "btn-circle", "btn-primary", "tooltip", 3, "click"], ["name", "heroArrowPath"], [1, "btn", "btn-xs", "btn-circle", "btn-accent", "tooltip", 3, "click"], ["name", "heroXMark"]],
  template: function ServiceWorkerUpdateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ServiceWorkerUpdateComponent_div_0_Template, 7, 6, "div", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showMessage() && ctx.message());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_9__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlLXdvcmtlci11cGRhdGUuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvc2VydmljZS13b3JrZXItdXBkYXRlL3NlcnZpY2Utd29ya2VyLXVwZGF0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0xBQXdMIiwic291cmNlUm9vdCI6IiJ9 */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_11__.expandRightOnEnterAnimation)()]
  }
});


/***/ }),

/***/ 5601:
/*!***************************************************************************************************!*\
  !*** ./packages/client/src/app/components/terms-and-conditions/terms-and-conditions.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TermsAndConditionsComponent": () => (/* binding */ TermsAndConditionsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ 1468);



function TermsAndConditionsComponent_div_4_ng_container_5_ul_4_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, item_r6));
  }
}
function TermsAndConditionsComponent_div_4_ng_container_5_ul_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TermsAndConditionsComponent_div_4_ng_container_5_ul_4_li_1_Template, 3, 3, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const paragraph_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", paragraph_r3.list);
  }
}
function TermsAndConditionsComponent_div_4_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TermsAndConditionsComponent_div_4_ng_container_5_ul_4_Template, 2, 1, "ul", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const paragraph_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, paragraph_r3.text));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", paragraph_r3.list);
  }
}
function TermsAndConditionsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TermsAndConditionsComponent_div_4_ng_container_5_Template, 5, 4, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, entry_r1.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", entry_r1.sections);
  }
}
class TermsAndConditionsComponent {
  constructor() {
    this.contents = [{
      title: 'TERMS.1',
      sections: [{
        text: 'TERMS.1.1'
      }, {
        text: 'TERMS.1.2'
      }, {
        text: 'TERMS.1.3'
      }, {
        text: 'TERMS.1.4'
      }, {
        text: 'TERMS.1.5'
      }]
    }, {
      title: 'TERMS.2',
      sections: [{
        text: 'TERMS.2.1'
      }]
    }, {
      title: 'TERMS.3',
      sections: [{
        text: 'TERMS.3.1'
      }]
    }, {
      title: 'TERMS.4',
      sections: [{
        text: 'TERMS.4.1'
      }]
    }, {
      title: 'TERMS.4',
      sections: [{
        text: 'TERMS.5.1',
        list: ['TERMS.5.1.1', 'TERMS.5.1.2', 'TERMS.5.1.3', 'TERMS.5.1.4', 'TERMS.5.1.5', 'TERMS.5.1.6']
      }, {
        text: 'TERMS.5.2',
        list: ['TERMS.5.2.1', 'TERMS.5.2.2', 'TERMS.5.2.3', 'TERMS.5.2.4', 'TERMS.5.2.5', 'TERMS.5.2.6', 'TERMS.5.2.7', 'TERMS.5.2.8', 'TERMS.5.2.9']
      }]
    }, {
      title: 'TERMS.6',
      sections: [{
        text: 'TERMS.6.1'
      }, {
        text: 'TERMS.6.2'
      }]
    }, {
      title: 'TERMS.7',
      sections: [{
        text: 'TERMS.7.1'
      }]
    }, {
      title: 'TERMS.8',
      sections: [{
        text: 'TERMS.8.1'
      }]
    }, {
      title: 'TERMS.9',
      sections: [{
        text: 'TERMS.9.1'
      }, {
        text: 'TERMS.9.2'
      }, {
        text: 'TERMS.9.3'
      }, {
        text: 'TERMS.9.4'
      }]
    }, {
      title: 'TERMS.10',
      sections: [{
        text: 'TERMS.10.1'
      }, {
        text: 'TERMS.10.2'
      }, {
        text: 'TERMS.10.3'
      }, {
        text: 'TERMS.10.4'
      }, {
        text: 'TERMS.10.5'
      }]
    }, {
      title: 'TERMS.11',
      sections: [{
        text: 'TERMS.11.1'
      }, {
        text: 'TERMS.11.2'
      }]
    }, {
      title: 'TERMS.12',
      sections: [{
        text: 'TERMS.12.1'
      }, {
        text: 'TERMS.12.2'
      }, {
        text: 'TERMS.12.3'
      }]
    }, {
      title: 'TERMS.13',
      sections: [{
        text: 'TERMS.13.1'
      }, {
        text: 'TERMS.13.2'
      }]
    }, {
      title: 'TERMS.14',
      sections: [{
        text: 'TERMS.14.1'
      }]
    }, {
      title: 'TERMS.15',
      sections: [{
        text: 'TERMS.15.1'
      }, {
        text: 'TERMS.15.2'
      }, {
        text: 'TERMS.15.3'
      }]
    }, {
      title: 'TERMS.16',
      sections: [{
        text: 'TERMS.16.1'
      }, {
        text: 'TERMS.16.2'
      }]
    }, {
      title: 'TERMS.17',
      sections: [{
        text: 'TERMS.17.1'
      }]
    }, {
      title: 'TERMS.18',
      sections: [{
        text: 'TERMS.18.1'
      }]
    }];
  }
}
TermsAndConditionsComponent.ɵfac = function TermsAndConditionsComponent_Factory(t) {
  return new (t || TermsAndConditionsComponent)();
};
TermsAndConditionsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TermsAndConditionsComponent,
  selectors: [["app-terms-and-conditions"]],
  decls: 5,
  vars: 1,
  consts: [[1, "flex", "flex-col", "w-full", "h-full", "p-3", "items-center", "overflow-y-auto"], [1, "flex", "flex-col", "w-full", "max-w-lg", "justify-items-stretch", "gap-3"], ["translate", "", 1, "text-2xl", "font-bold"], ["tabindex", "0", "class", "collapse collapse-plus bg-base-300", 4, "ngFor", "ngForOf"], ["tabindex", "0", 1, "collapse", "collapse-plus", "bg-base-300"], [1, "collapse-title", "text-xl", "font-medium"], [1, "collapse-content"], [4, "ngFor", "ngForOf"], [1, "text-sm", "mb-3"], ["class", "text-xs list-disc pl-3", 4, "ngIf"], [1, "text-xs", "list-disc", "pl-3"], ["class", "mb-3", 4, "ngFor", "ngForOf"], [1, "mb-3"]],
  template: function TermsAndConditionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "TERMS.title");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TermsAndConditionsComponent_div_4_Template, 6, 4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contents);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXJtcy1hbmQtY29uZGl0aW9ucy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvdGVybXMtYW5kLWNvbmRpdGlvbnMvdGVybXMtYW5kLWNvbmRpdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9MQUFvTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 1141:
/*!***************************************************************************************!*\
  !*** ./packages/client/src/app/components/welcome-splash/welcome-splash.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WelcomeSplashComponent": () => (/* binding */ WelcomeSplashComponent)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/app.model */ 4056);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../selectors/app.selector */ 8603);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 1468);










function WelcomeSplashComponent_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "WELCOME.warning"), " ");
  }
}
class WelcomeSplashComponent {
  constructor(store) {
    this.store = store;
    this.isMobile = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_3__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__.platformSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(platform => platform === _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.mobile)));
  }
}
WelcomeSplashComponent.ɵfac = function WelcomeSplashComponent_Factory(t) {
  return new (t || WelcomeSplashComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store));
};
WelcomeSplashComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: WelcomeSplashComponent,
  selectors: [["app-welcome-splash"]],
  decls: 11,
  vars: 10,
  consts: [[1, "flex", "flex-col", "items-center", "justify-center", "p-6", "gap-12", "bg-primary", "text-primary-content", "basis-full"], [1, "flex", "max-w-2xl", "text-4xl", "sm:text-6xl", "leading-normal", "text-center"], ["class", "flex text-error-content bg-error text-center px-3 py-1", 4, "ngIf"], [1, "flex", "max-w-2xl", "text-base", "leading-relaxed", "text-center"], [1, "flex", "text-error-content", "bg-error", "text-center", "px-3", "py-1"]],
  template: function WelcomeSplashComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "p", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, WelcomeSplashComponent_p_4_Template, 3, 3, "p", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 4, "WELCOME.p1"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isMobile());
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 6, "WELCOME.p2"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 8, "WELCOME.p3"), " ");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3ZWxjb21lLXNwbGFzaC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL2NvbXBvbmVudHMvd2VsY29tZS1zcGxhc2gvd2VsY29tZS1zcGxhc2guY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDRLQUE0SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 9690:
/*!******************************************************************************!*\
  !*** ./packages/client/src/app/directives/background-magnitude.directive.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundMagnitudeDirective": () => (/* binding */ BackgroundMagnitudeDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);


class BackgroundMagnitudeDirective {
  constructor(el) {
    this.el = el;
    this.lower = 'darkblue';
    this.upper = 'transparent';
  }
  ngOnChanges(changes) {
    const numValue = changes['magnitude'].currentValue;
    if (numValue || numValue === 0) {
      this._applyMagnitude(changes['magnitude'].currentValue);
    }
  }
  _applyMagnitude(mag) {
    if (mag) {
      this.el.nativeElement.style['background-image'] = this._generateGradient(mag);
    } else {
      this.el.nativeElement.style['background-image'] = 'unset';
    }
  }
  _generateGradient(percent) {
    return `linear-gradient(to top, ${this.lower} 0%, ${this.lower} ${percent}%, ${this.upper} ${percent}%, ${this.upper} 100%)`;
  }
}
BackgroundMagnitudeDirective.ɵfac = function BackgroundMagnitudeDirective_Factory(t) {
  return new (t || BackgroundMagnitudeDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
BackgroundMagnitudeDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: BackgroundMagnitudeDirective,
  selectors: [["", "appBackgroundMagnitude", ""]],
  inputs: {
    magnitude: "magnitude",
    lower: "lower",
    upper: "upper"
  },
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});


/***/ }),

/***/ 9619:
/*!********************************************************!*\
  !*** ./packages/client/src/app/effects/app.effects.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppEffects": () => (/* binding */ AppEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/app.model */ 4056);
/* harmony import */ var _services_browser_compatibility_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/browser-compatibility.service */ 9573);
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/storage.service */ 9773);
/* harmony import */ var _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/settings/models/settings.model */ 3545);
/* harmony import */ var _services_wake_lock_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/wake-lock.service */ 3031);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 6839);












class AppEffects {
  constructor(actions$, browserCompatibilityService, storage, wakelockService) {
    this.actions$ = actions$;
    this.browserCompatibilityService = browserCompatibilityService;
    this.storage = storage;
    this.wakelockService = wakelockService;
    this.checkUserAgent$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.checkUserAgent), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => this.browserCompatibilityService.checkCompatibility()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(({
      platform,
      error,
      warning
    }) => _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.checkUserAgentComplete({
      platform,
      error,
      warning
    }))));
    this.init$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.initAppearance), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
      const state = this.storage.get('appearance');
      if (state?.cookiesDeclinedTimestamp) {
        const DECLINE_DEBOUNCE_IN_MS = 1000 * 60 * 60 * 24 * 180; // 180 days
        if (Date.now() - state.cookiesDeclinedTimestamp > DECLINE_DEBOUNCE_IN_MS) {
          delete state.cookiesDeclinedTimestamp;
          this.storage.update('appearance', 'cookiesDeclinedTimestamp', undefined);
        }
      }
      return state;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(appearance => [_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_3__.SettingsActions.initSettings(), _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.initAppearanceComplete({
      appearance
    })])));
    this.acceptCookies$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.acceptCookies), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
      this.storage.update('appearance', 'cookiesAccepted', true);
      this.storage.update('appearance', 'cookiesDeclinedTimestamp', undefined);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.setCookiePolicyComplete())));
    this.declineCookies$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.declineCookies), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
      this.storage.update('appearance', 'cookiesAccepted', false);
      this.storage.update('appearance', 'cookiesDeclinedTimestamp', Date.now());
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.setCookiePolicyComplete())));
    this.updateAcceptedPeerConnections = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.setPeerConnectionsAccepted), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(({
      accepted,
      save
    }) => {
      if (save) {
        this.storage.update('appearance', 'peerConnectionsAccepted', accepted);
      }
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.setPeerConnectionsComplete())));
    this.applyLock$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.applyWakeLock), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => this.wakelockService.requestLock()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(isLocked => _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.applyWakeLockSuccess({
      isLocked
    })), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.applyWakeLockFailure({
      error: err.message
    })))));
    this.releaseLock$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.ofType)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.releaseWakeLock), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => this.wakelockService.releaseLock()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.releaseWakeLockSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(_models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.releaseWakeLockFailure({
      error: err.message
    })))));
  }
}
AppEffects.ɵfac = function AppEffects_Factory(t) {
  return new (t || AppEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_5__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_services_browser_compatibility_service__WEBPACK_IMPORTED_MODULE_1__.BrowserCompatibilityService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_services_storage_service__WEBPACK_IMPORTED_MODULE_2__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_services_wake_lock_service__WEBPACK_IMPORTED_MODULE_4__.WakeLockService));
};
AppEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
  token: AppEffects,
  factory: AppEffects.ɵfac
});


/***/ }),

/***/ 4557:
/*!*****************************************************************!*\
  !*** ./packages/client/src/app/effects/audio-stream.effects.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioStreamEffects": () => (/* binding */ AudioStreamEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/audio-stream.model */ 7513);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/recognition.model */ 1088);
/* harmony import */ var _modules_media_services_media_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/media/services/media.service */ 5261);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);








class AudioStreamEffects {
  constructor(actions$, mediaService) {
    this.actions$ = actions$;
    this.mediaService = mediaService;
    this.connectStream$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStream), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(props => this.mediaService.getMediaStream(props.id)), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(streamId => [_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStreamSuccess({
      id: streamId
    }), _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.connectRecognition({
      id: streamId
    })]), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStreamFailure({
      error: error.message
    })))));
    this.disconnectStream$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.disconnectStream), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(props => {
      const disconnectedId = this.mediaService.disconnectStream(props.id);
      return [_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognition(props), _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.disconnectStreamSuccess({
        id: disconnectedId
      })];
    })));
  }
}
AudioStreamEffects.ɵfac = function AudioStreamEffects_Factory(t) {
  return new (t || AudioStreamEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_modules_media_services_media_service__WEBPACK_IMPORTED_MODULE_2__.MediaService));
};
AudioStreamEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: AudioStreamEffects,
  factory: AudioStreamEffects.ɵfac
});


/***/ }),

/***/ 9996:
/*!****************************************************************!*\
  !*** ./packages/client/src/app/effects/recognition.effects.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognitionEffects": () => (/* binding */ RecognitionEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/app.model */ 4056);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/recognition.model */ 1088);
/* harmony import */ var _modules_media_services_recognition_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/media/services/recognition.service */ 6324);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);








class RecognitionEffects {
  constructor(actions$, recognitionService) {
    this.actions$ = actions$;
    this.recognitionService = recognitionService;
    this.connectRecognition$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.connectRecognition), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(props => this.recognitionService.connectToStream(props.id)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(() => [_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.connectRecognitionSuccess(), _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.hideFooter(), _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.applyWakeLock()]), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.connectRecognitionFailure({
      error: err.message
    })))));
    this.disconnectRecognition$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognition), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(props => this.recognitionService.disconnectFromStream(props.id)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(() => [_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognitionSuccess(), _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.showFooter(), _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppActions.releaseWakeLock()]), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognitionFailure({
      error: err.message
    })))));
    this.pauseRecognition$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.pauseRecognition), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => this.recognitionService.pauseRecognition()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.pauseRecognitionSuccess())));
    this.resumeRecognition$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.resumeRecognition), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => this.recognitionService.resumeRecognition()), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(() => _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.resumeRecognitionSuccess())));
  }
}
RecognitionEffects.ɵfac = function RecognitionEffects_Factory(t) {
  return new (t || RecognitionEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_modules_media_services_recognition_service__WEBPACK_IMPORTED_MODULE_2__.RecognitionService));
};
RecognitionEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: RecognitionEffects,
  factory: RecognitionEffects.ɵfac
});


/***/ }),

/***/ 4410:
/*!*************************************************************!*\
  !*** ./packages/client/src/app/effects/settings.effects.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsEffects": () => (/* binding */ SettingsEffects)
/* harmony export */ });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 9337);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/settings/models/settings.model */ 3545);
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/storage.service */ 9773);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 1468);









class SettingsEffects {
  constructor(actions$, storage, translate) {
    this.actions$ = actions$;
    this.storage = storage;
    this.translate = translate;
    this.init$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.initSettings), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => this.storage.get('settings')), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(settings => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.initSettingsComplete({
      settings
    }))));
    this.applyTheme$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTheme), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(({
      theme
    }) => this.storage.update('settings', 'theme', theme)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setThemeComplete())));
    this.applyLanguage$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLanguage), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(({
      language
    }) => this.storage.update('settings', 'lang', language)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(({
      language
    }) => this.translate.use(language)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLanguageComplete())));
    this.applyWakeLock$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.updateWakeLockEnabled), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(({
      enabled
    }) => this.storage.update('settings', 'wakeLock', enabled)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.updateWakeLockEnabledSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.updateWakeLockEnabledFailure({
      error: err.message
    })))));
    this.saveTextSize$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextSize), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(({
      size
    }) => this.storage.update('settings', 'textSize', size)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextSizeSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextSizeFailure({
      error: err.message
    })))));
    this.saveLineHeight$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLineHeight), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(({
      height
    }) => this.storage.update('settings', 'lineHeight', height)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLineHeightSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLineHeightFailure({
      error: err.message
    })))));
    this.saveTextFlow$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextFlow), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(({
      flow
    }) => this.storage.update('settings', 'textFlow', flow)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextFlowSuccess()), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextFlowFailure({
      error: err.message
    })))));
  }
}
SettingsEffects.ɵfac = function SettingsEffects_Factory(t) {
  return new (t || SettingsEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_services_storage_service__WEBPACK_IMPORTED_MODULE_1__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService));
};
SettingsEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: SettingsEffects,
  factory: SettingsEffects.ɵfac
});


/***/ }),

/***/ 4056:
/*!*****************************************************!*\
  !*** ./packages/client/src/app/models/app.model.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppActions": () => (/* reexport module object */ _actions_app_actions__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "AppPlatform": () => (/* binding */ AppPlatform),
/* harmony export */   "Connectivity": () => (/* binding */ Connectivity)
/* harmony export */ });
/* harmony import */ var _actions_app_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/app.actions */ 2432);
var AppPlatform;
(function (AppPlatform) {
  AppPlatform["mobile"] = "MOBILE";
  AppPlatform["desktop"] = "DESKTOP";
  AppPlatform["unsupported"] = "UNSUPPORTED";
})(AppPlatform || (AppPlatform = {}));
var Connectivity;
(function (Connectivity) {
  Connectivity["online"] = "ONLINE";
  Connectivity["offline"] = "OFFLINE";
})(Connectivity || (Connectivity = {}));


/***/ }),

/***/ 7513:
/*!**************************************************************!*\
  !*** ./packages/client/src/app/models/audio-stream.model.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioStreamActions": () => (/* reexport module object */ _actions_audio_stream_actions__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "AudioStreamStatus": () => (/* binding */ AudioStreamStatus)
/* harmony export */ });
/* harmony import */ var _actions_audio_stream_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/audio-stream.actions */ 9373);
var AudioStreamStatus;
(function (AudioStreamStatus) {
  AudioStreamStatus["uninitialized"] = "UNINITIALIZED";
  AudioStreamStatus["connecting"] = "CONNECTING";
  AudioStreamStatus["connected"] = "CONNECTED";
  AudioStreamStatus["disconnected"] = "DISCONNECTED";
  AudioStreamStatus["error"] = "ERROR";
})(AudioStreamStatus || (AudioStreamStatus = {}));


/***/ }),

/***/ 1088:
/*!*************************************************************!*\
  !*** ./packages/client/src/app/models/recognition.model.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognitionActions": () => (/* reexport module object */ _actions_recogntion_actions__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "RecognitionStatus": () => (/* binding */ RecognitionStatus)
/* harmony export */ });
/* harmony import */ var _actions_recogntion_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/recogntion.actions */ 3786);
var RecognitionStatus;
(function (RecognitionStatus) {
  RecognitionStatus["uninitialized"] = "UNINITIALIZED";
  RecognitionStatus["connecting"] = "CONNECTING";
  RecognitionStatus["connected"] = "CONNECTED";
  RecognitionStatus["disconnected"] = "DISCONNECTED";
  RecognitionStatus["error"] = "ERROR";
  RecognitionStatus["paused"] = "PAUSED";
})(RecognitionStatus || (RecognitionStatus = {}));


/***/ }),

/***/ 386:
/*!*************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/audio-input-enable/audio-input-enable.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioInputEnableComponent": () => (/* binding */ AudioInputEnableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/audio-stream.model */ 7513);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/app.selector */ 8603);
/* harmony import */ var _selectors_audio_stream_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/audio-stream.selector */ 977);
/* harmony import */ var _services_media_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/media.service */ 5261);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _directives_background_magnitude_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../directives/background-magnitude.directive */ 9690);
















function AudioInputEnableComponent_ng_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ng-icon", 3);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("data-tip", ctx_r0.error());
  }
}
function AudioInputEnableComponent_ng_template_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ng-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
}
function AudioInputEnableComponent_ng_template_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ng-icon", 7);
  }
}
function AudioInputEnableComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, AudioInputEnableComponent_ng_template_4_ng_container_0_Template, 2, 0, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AudioInputEnableComponent_ng_template_4_ng_template_1_Template, 1, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](2);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.connected())("ngIfElse", _r4);
  }
}
const _c0 = function (a0, a1, a2) {
  return {
    "btn-primary btn-xs": a0,
    "btn-error": a1,
    "btn-accent": a2
  };
};
class AudioInputEnableComponent {
  constructor(store, mediaService, translate) {
    this.store = store;
    this.mediaService = mediaService;
    this.translate = translate;
    this.streamState = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.select)(_selectors_audio_stream_selector__WEBPACK_IMPORTED_MODULE_2__.selectAudioStream)));
    this.connected = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.computed)(() => this.streamState().status === _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.connected);
    this.disconnected = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.computed)(() => this.streamState().status === _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.disconnected);
    const appError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_1__.errorSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.filter)(err => err !== 'ERRORS.liveTextMissing'), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.switchMap)(error => error ? this.translate.get(error) : (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)(undefined))));
    this.error = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.computed)(() => this.streamState().error || appError());
    this.vol = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.computed)(() => this.connected() ? this.mediaService.getVolumeForStream(this.streamState().id)() : 0);
  }
  toggleState() {
    // if (this.error()) {
    //   this.store.dispatch(AudioStreamActions.disconnectStream({id: this.streamState().id}));
    //   return;
    // }
    if (this.connected() || this.error()) {
      this.store.dispatch(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.disconnectStream({
        id: this.streamState().id
      }));
    } else {
      this.store.dispatch(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStream({
        id: this.streamState().id
      }));
    }
  }
}
AudioInputEnableComponent.ɵfac = function AudioInputEnableComponent_Factory(t) {
  return new (t || AudioInputEnableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_media_service__WEBPACK_IMPORTED_MODULE_3__.MediaService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService));
};
AudioInputEnableComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: AudioInputEnableComponent,
  selectors: [["app-audio-input-enable"]],
  decls: 6,
  vars: 13,
  consts: [["appBackgroundMagnitude", "", 1, "btn", "btn-circle", "tooltip", "tooltip-left", 3, "ngClass", "magnitude", "click"], ["class", "tooltip tooltip-warning tooltip-left", "name", "heroExclamationTriangle", 4, "ngIf", "ngIfElse"], ["micEnabled", ""], ["name", "heroExclamationTriangle", 1, "tooltip", "tooltip-warning", "tooltip-left"], [4, "ngIf", "ngIfElse"], ["inactive", ""], ["name", "heroMicrophone"], ["name", "heroMicrophoneSlash"]],
  template: function AudioInputEnableComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AudioInputEnableComponent_Template_button_click_0_listener() {
        return ctx.toggleState();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, AudioInputEnableComponent_ng_icon_3_Template, 1, 1, "ng-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AudioInputEnableComponent_ng_template_4_Template, 3, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction3"](9, _c0, ctx.connected(), ctx.error(), ctx.disconnected()))("magnitude", ctx.vol());
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("data-tip", ctx.connected() ? _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 5, "LABELS.stop") : _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 7, "LABELS.listen"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.error())("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_13__.NgIconComponent, _directives_background_magnitude_directive__WEBPACK_IMPORTED_MODULE_4__.BackgroundMagnitudeDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdWRpby1pbnB1dC1lbmFibGUuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9hdWRpby1pbnB1dC1lbmFibGUvYXVkaW8taW5wdXQtZW5hYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvTEFBb0wiLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 6085:
/*!*****************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/flow-direction/flow-direction.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlowDirectionComponent": () => (/* binding */ FlowDirectionComponent)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../settings/models/settings.model */ 3545);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 1468);










class FlowDirectionComponent {
  constructor(store) {
    this.store = store;
    this.isFlowDown = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.select)(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.selectTextFlow), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(flow => flow === 'top-down')));
  }
  toggle() {
    const flow = this.isFlowDown() ? 'bottom-up' : 'top-down';
    this.store.dispatch(_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.SettingsActions.setTextFlow({
      flow
    }));
  }
}
FlowDirectionComponent.ɵfac = function FlowDirectionComponent_Factory(t) {
  return new (t || FlowDirectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.Store));
};
FlowDirectionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: FlowDirectionComponent,
  selectors: [["app-flow-direction"]],
  decls: 3,
  vars: 4,
  consts: [[1, "btn", "btn-lg", "btn-outline", "w-full", "tooltip", "tooltip-left", "tooltip-info", 3, "click"], [3, "name"]],
  template: function FlowDirectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FlowDirectionComponent_Template_button_click_0_listener() {
        return ctx.toggle();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ng-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 2, "LABELS.textFlow"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.isFlowDown() ? "heroArrowLongDown" : "heroArrowLongUp");
    }
  },
  dependencies: [_ng_icons_core__WEBPACK_IMPORTED_MODULE_6__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmbG93LWRpcmVjdGlvbi5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9mbG93LWRpcmVjdGlvbi9mbG93LWRpcmVjdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
});


/***/ }),

/***/ 5594:
/*!***********************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/full-screen/full-screen.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullScreenComponent": () => (/* binding */ FullScreenComponent)
/* harmony export */ });
/* harmony import */ var _services_full_screen_full_screen_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../services/full-screen/full-screen.service */ 4359);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 1468);







const _c0 = function (a0) {
  return {
    "bg-secondary-focus": a0
  };
};
function FullScreenComponent_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FullScreenComponent_button_0_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "ng-icon", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c0, ctx_r0.isFullscreen()));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 3, "LABELS.fullScreen"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("name", ctx_r0.isFullscreen() ? "heroArrowsPointingIn" : "heroArrowsPointingOut");
  }
}
class FullScreenComponent {
  constructor(svc) {
    this.svc = svc;
    this.show = this.svc.isAvailable;
    this.isFullscreen = this.svc.isFullscreen;
  }
  toggle() {
    this.svc.toggle();
  }
}
FullScreenComponent.ɵfac = function FullScreenComponent_Factory(t) {
  return new (t || FullScreenComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_full_screen_full_screen_service__WEBPACK_IMPORTED_MODULE_0__.FullScreenService));
};
FullScreenComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: FullScreenComponent,
  selectors: [["app-full-screen"]],
  decls: 1,
  vars: 1,
  consts: [["class", "btn btn-lg btn-outline w-full tooltip tooltip-left tooltip-info", 3, "ngClass", "click", 4, "ngIf"], [1, "btn", "btn-lg", "btn-outline", "w-full", "tooltip", "tooltip-left", "tooltip-info", 3, "ngClass", "click"], [3, "name"]],
  template: function FullScreenComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, FullScreenComponent_button_0_Template, 3, 7, "button", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.show);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_3__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmdWxsLXNjcmVlbi5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9mdWxsLXNjcmVlbi9mdWxsLXNjcmVlbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"],
  encapsulation: 2
});


/***/ }),

/***/ 213:
/*!*******************************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/recognition-control-sidebar/recognition-control-sidebar.component.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognitionControlSidebarComponent": () => (/* binding */ RecognitionControlSidebarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var _settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../settings/models/settings.model */ 3545);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../selectors/obs.selectors */ 7595);
/* harmony import */ var _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../reducers/obs.reducer */ 9232);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _full_screen_full_screen_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../full-screen/full-screen.component */ 5594);
/* harmony import */ var _flow_direction_flow_direction_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../flow-direction/flow-direction.component */ 6085);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 1468);


















const _c0 = ["details"];
const _c1 = function (a0) {
  return {
    "bg-secondary-focus": a0
  };
};
function RecognitionControlSidebarComponent_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r7.toggleRecognition());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ng-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](1, _c1, !ctx_r0.recognitionActive()));
  }
}
function RecognitionControlSidebarComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "TEXT_SIZE." + ctx_r2.textSize()));
  }
}
function RecognitionControlSidebarComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "LINE_HEIGHT." + ctx_r4.lineHeight()));
  }
}
function RecognitionControlSidebarComponent_app_flow_direction_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-flow-direction");
  }
}
function RecognitionControlSidebarComponent_app_full_screen_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-full-screen");
  }
}
const _c2 = function (a0, a1) {
  return {
    "bg-secondary-focus": a0,
    "tooltip tooltip-left tooltip-info": a1
  };
};
class RecognitionControlSidebarComponent {
  constructor(store, renderer) {
    this.store = store;
    this.renderer = renderer;
    this.showFullscreen = true;
    this.showTextFlow = true;
    this.availableTextSizes = _settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.AvailableTextSizes;
    this.availableLineHeights = _settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.AvailableLineHeights;
    this.textSize = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.selectTextSize));
    this.textSizeMax = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.computed)(() => this.textSize() === this.availableTextSizes[this.availableTextSizes.length - 1]);
    this.textSizeMin = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.computed)(() => this.textSize() === this.availableTextSizes[0]);
    this.lineHeight = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.selectLineHeight));
    this.lineHeightMax = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.computed)(() => this.lineHeight() === this.availableLineHeights[this.availableLineHeights.length - 1]);
    this.lineHeightMin = (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.computed)(() => this.lineHeight() === this.availableLineHeights[0]);
    this.isBroadcasting = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_2__.selectIsBroadcasting));
    this.recognitionActive = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_4__.recognitionConnectedSelector));
    this.isObsStreaming = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.select)(_selectors_obs_selectors__WEBPACK_IMPORTED_MODULE_5__.selectObsConnected), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(state => state === _reducers_obs_reducer__WEBPACK_IMPORTED_MODULE_6__.ObsConnectionState.connected)));
  }
  hideElements(elements) {
    for (const el of elements) {
      this.renderer.removeAttribute(el, 'open');
    }
  }
  increaseTextSize() {
    if (!this.textSizeMax()) {
      const idx = this.availableTextSizes.findIndex(size => size === this.textSize());
      this.store.dispatch(_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.SettingsActions.setTextSize({
        size: this.availableTextSizes[idx + 1]
      }));
    }
  }
  decreaseTextSize() {
    if (!this.textSizeMin()) {
      const idx = this.availableTextSizes.findIndex(size => size === this.textSize());
      this.store.dispatch(_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.SettingsActions.setTextSize({
        size: this.availableTextSizes[idx - 1]
      }));
    }
  }
  increaseLineHeight() {
    if (!this.lineHeightMax()) {
      const idx = this.availableLineHeights.findIndex(height => height === this.lineHeight());
      this.store.dispatch(_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.SettingsActions.setLineHeight({
        height: this.availableLineHeights[idx + 1]
      }));
    }
  }
  decreaseLineHeight() {
    if (!this.lineHeightMin()) {
      const idx = this.availableLineHeights.findIndex(height => height === this.lineHeight());
      this.store.dispatch(_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_1__.SettingsActions.setLineHeight({
        height: this.availableLineHeights[idx - 1]
      }));
    }
  }
  toggleRecognition() {
    if (this.recognitionActive()) {
      this._pauseRecognition();
    } else {
      this._resumeRecognition();
    }
  }
  _pauseRecognition() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_3__.RecognitionActions.pauseRecognition());
  }
  _resumeRecognition() {
    this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_3__.RecognitionActions.resumeRecognition());
  }
}
RecognitionControlSidebarComponent.ɵfac = function RecognitionControlSidebarComponent_Factory(t) {
  return new (t || RecognitionControlSidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.Renderer2));
};
RecognitionControlSidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: RecognitionControlSidebarComponent,
  selectors: [["app-recognition-control-sidebar"]],
  viewQuery: function RecognitionControlSidebarComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.subMenus = _t);
    }
  },
  inputs: {
    showFullscreen: "showFullscreen",
    showTextFlow: "showTextFlow"
  },
  decls: 40,
  vars: 43,
  consts: [[1, "flex", "flex-col", "p-3", "gap-3", "drop-shadow", "bg-secondary-content", "rounded-s-xl"], ["class", "btn btn-lg btn-outline", 3, "ngClass", "click", 4, "ngIf"], [1, "dropdown", "dropdown-left"], ["fontSizeMenu", ""], ["role", "button", 1, "btn", "btn-lg", "btn-outline", "flex", "flex-col", "items-center", 3, "ngClass", "click"], ["name", "tablerTextSize"], ["class", "text-xs text-base-100", 4, "ngIf"], [1, "dropdown-content"], [1, "menu", "bg-secondary-content", "rounded-s-xl", "text-2xl", "gap-3"], [1, "btn", "btn-lg", "btn-outline", "tooltip", "tooltip-left", 3, "disabled", "click"], ["name", "tablerTextIncrease"], ["name", "tablerTextDecrease"], ["lineSpacingMenu", ""], ["name", "tablerLineHeight"], ["name", "tablerPlus"], ["name", "tablerMinus"], [4, "ngIf"], [1, "btn", "btn-lg", "btn-outline", 3, "ngClass", "click"], ["name", "heroPause"], [1, "text-xs", "text-base-100"]],
  template: function RecognitionControlSidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, RecognitionControlSidebarComponent_button_1_Template, 2, 3, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "details", 2, 3)(4, "summary", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_Template_summary_click_4_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r9);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](21);
        return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx.hideElements([_r3]));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "ng-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, RecognitionControlSidebarComponent_div_7_Template, 3, 3, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 7)(9, "ul", 8)(10, "li")(11, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_Template_button_click_11_listener() {
        return ctx.increaseTextSize();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](13, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](14, "ng-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "li")(16, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_Template_button_click_16_listener() {
        return ctx.decreaseTextSize();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](17, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](18, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](19, "ng-icon", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "details", 2, 12)(22, "summary", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_Template_summary_click_22_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r9);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
        return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx.hideElements([_r1]));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](23, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](24, "ng-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](25, RecognitionControlSidebarComponent_div_25_Template, 3, 3, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "div", 7)(27, "ul", 8)(28, "li")(29, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_Template_button_click_29_listener() {
        return ctx.increaseLineHeight();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](30, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](31, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](32, "ng-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](33, "li")(34, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function RecognitionControlSidebarComponent_Template_button_click_34_listener() {
        return ctx.decreaseLineHeight();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](35, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](36, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](37, "ng-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](38, RecognitionControlSidebarComponent_app_flow_direction_38_Template, 1, 0, "app-flow-direction", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](39, RecognitionControlSidebarComponent_app_full_screen_39_Template, 1, 0, "app-full-screen", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.isBroadcasting() || ctx.isObsStreaming());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](37, _c2, _r1.hasAttribute("open"), !_r1.hasAttribute("open")));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 17, "LABELS.textSize"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _r1.hasAttribute("open"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.textSizeMax());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 19, "LABELS.increase") + " " + _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](13, 21, "LABELS.textSize"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.textSizeMin());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](17, 23, "LABELS.decrease") + " " + _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](18, 25, "LABELS.textSize"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](40, _c2, _r3.hasAttribute("open"), !_r3.hasAttribute("open")));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](23, 27, "LABELS.lineHeight"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _r3.hasAttribute("open"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.lineHeightMax());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](30, 29, "LABELS.increase") + " " + _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](31, 31, "LABELS.lineHeight"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx.lineHeightMin());
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("data-tip", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](35, 33, "LABELS.decrease") + " " + _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](36, 35, "LABELS.lineHeight"));
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.showTextFlow);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.showFullscreen);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_14__.NgIconComponent, _full_screen_full_screen_component__WEBPACK_IMPORTED_MODULE_7__.FullScreenComponent, _flow_direction_flow_direction_component__WEBPACK_IMPORTED_MODULE_8__.FlowDirectionComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslatePipe],
  styles: [".menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-basis: initial;\n  flex-direction: column;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29nbml0aW9uLWNvbnRyb2wtc2lkZWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFETiIsImZpbGUiOiJyZWNvZ25pdGlvbi1jb250cm9sLXNpZGViYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWVudSB7XG4gIGxpIHtcbiAgICAuYnRuIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWJhc2lzOiBpbml0aWFsO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICB9XG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9yZWNvZ25pdGlvbi1jb250cm9sLXNpZGViYXIvcmVjb2duaXRpb24tY29udHJvbC1zaWRlYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUROO0FBQ0Esb2lCQUFvaUIiLCJzb3VyY2VzQ29udGVudCI6WyIubWVudSB7XG4gIGxpIHtcbiAgICAuYnRuIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWJhc2lzOiBpbml0aWFsO1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 4315:
/*!*************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/recognition-enable/recognition-enable.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognitionEnableComponent": () => (/* binding */ RecognitionEnableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/app.selector */ 8603);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 2673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-icons/core */ 5985);













function RecognitionEnableComponent_ng_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ng-icon", 3, 4);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-tip", ctx_r0.error());
  }
}
function RecognitionEnableComponent_ng_template_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ng-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
}
function RecognitionEnableComponent_ng_template_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ng-icon", 8);
  }
}
function RecognitionEnableComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, RecognitionEnableComponent_ng_template_4_ng_container_0_Template, 2, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, RecognitionEnableComponent_ng_template_4_ng_template_1_Template, 1, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
  }
  if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.connected())("ngIfElse", _r5);
  }
}
const _c0 = function (a0, a1, a2) {
  return {
    "btn-accent": a0,
    "btn-primary": a1,
    "btn-error": a2
  };
};
class RecognitionEnableComponent {
  constructor(store, translate) {
    this.store = store;
    this.translate = translate;
    this.connected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.select)(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__.recognitionStatusSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(status => status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionStatus.connected)));
    this.disconnected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.select)(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__.recognitionStatusSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(status => status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionStatus.disconnected)));
    const recogError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_2__.recognitionErrorSelector));
    const appError = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.select)(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_0__.errorSelector), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(err => err !== 'ERRORS.liveTextMissing'), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(error => error ? this.translate.get(error) : (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(undefined))));
    this.error = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.computed)(() => recogError() || appError());
  }
  toggleState() {
    if (this.connected() || this.error()) {
      this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.disconnectRecognition({
        id: 'default'
      }));
    } else {
      this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_1__.RecognitionActions.connectRecognition({
        id: 'default'
      }));
    }
  }
}
RecognitionEnableComponent.ɵfac = function RecognitionEnableComponent_Factory(t) {
  return new (t || RecognitionEnableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService));
};
RecognitionEnableComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: RecognitionEnableComponent,
  selectors: [["app-recognition-enable"]],
  decls: 6,
  vars: 12,
  consts: [[1, "btn", "btn-circle", "tooltip", "tooltip-left", 3, "ngClass", "click"], ["class", "tooltip tooltip-warning tooltip-left", "name", "heroExclamationTriangle", 4, "ngIf", "ngIfElse"], ["micEnabled", ""], ["name", "heroExclamationTriangle", 1, "tooltip", "tooltip-warning", "tooltip-left"], ["errorIcon", ""], [4, "ngIf", "ngIfElse"], ["inactive", ""], ["name", "heroMicrophone"], ["name", "heroMicrophoneSlash"]],
  template: function RecognitionEnableComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RecognitionEnableComponent_Template_button_click_0_listener() {
        return ctx.toggleState();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, RecognitionEnableComponent_ng_icon_3_Template, 2, 1, "ng-icon", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, RecognitionEnableComponent_ng_template_4_Template, 3, 2, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction3"](8, _c0, ctx.disconnected(), ctx.connected(), !!ctx.error()));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-tip", ctx.connected() ? _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 4, "LABELS.stop") : _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 6, "LABELS.listen"));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.error())("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_12__.NgIconComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWNvZ25pdGlvbi1lbmFibGUuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9yZWNvZ25pdGlvbi1lbmFibGUvcmVjb2duaXRpb24tZW5hYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvTEFBb0wiLCJzb3VyY2VSb290IjoiIn0= */"]
});


/***/ }),

/***/ 5741:
/*!*************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/recognition-render/recognition-render.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognitionRenderComponent": () => (/* binding */ RecognitionRenderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _services_full_screen_full_screen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/full-screen/full-screen.service */ 4359);
/* harmony import */ var _services_recognition_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/recognition.service */ 6324);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../recognized-text/recognized-text.component */ 1589);
/* harmony import */ var _recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../recognized-live-text/recognized-live-text.component */ 3643);
/* harmony import */ var _recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../recognition-control-sidebar/recognition-control-sidebar.component */ 213);



















const _c0 = ["enable"];
function RecognitionRenderComponent_app_recognized_live_text_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-recognized-live-text", 10);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("text", ctx_r1.liveText);
  }
}
function RecognitionRenderComponent_label_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ng-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@slideInRightOnEnter", undefined)("@slideOutRightOnLeave", undefined);
  }
}
const _c1 = function (a0, a1) {
  return {
    "flex-col-reverse justify-start": a0,
    "flex-col justify-end": a1
  };
};
class RecognitionRenderComponent {
  constructor(store, el, fullScreen, recognitionService) {
    this.store = store;
    this.el = el;
    this.fullScreen = fullScreen;
    this.recognitionService = recognitionService;
    this.state = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.selectRecognition));
    this.connected = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionConnectedSelector));
    this.paused = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionPausedSelector));
    const id = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionIdSelector));
    this.liveText = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.computed)(() => id() ? this.recognitionService.getLiveOutput(id())() : '');
    this.textOutput = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.computed)(() => id() ? this.recognitionService.getRecognizedText(id())() : []);
    this.hasLiveResults = (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.computed)(() => {
      if (this.connected()) {
        if (this.liveText() == '' && this.textOutput().length === 0) {
          return false;
        }
        return true;
      }
      return this.state()?.status != _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.uninitialized;
    });
    this.error = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionErrorSelector));
    this.textFlowDown = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.select)(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_4__.selectTextFlow), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.map)(flow => flow === 'top-down')));
    if (this.fullScreen.isAvailable) {
      (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.effect)(() => {
        if (this.fullScreen.isFullscreen()) {
          this.sidebarCheckbox.nativeElement.checked = false;
        }
      });
    }
  }
  ngOnInit() {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.registerElement(this.el);
    }
  }
  ngOnDestroy() {
    if (this.fullScreen.isAvailable) {
      this.fullScreen.deregisterElement();
    }
  }
}
RecognitionRenderComponent.ɵfac = function RecognitionRenderComponent_Factory(t) {
  return new (t || RecognitionRenderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_10__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_full_screen_full_screen_service__WEBPACK_IMPORTED_MODULE_2__.FullScreenService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_recognition_service__WEBPACK_IMPORTED_MODULE_3__.RecognitionService));
};
RecognitionRenderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: RecognitionRenderComponent,
  selectors: [["app-recognition-render"]],
  viewQuery: function RecognitionRenderComponent_Query(rf, ctx) {
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
  consts: [[1, "drawer", "drawer-end", "overflow-y-hidden", "relative"], ["id", "drawer-enable", "type", "checkbox", 1, "drawer-toggle"], ["enable", ""], [1, "drawer-content", "absolute", "top-0", "bottom-0", "left-0", "right-0"], [1, "flex", "flex-grow-0", "h-full", "overflow-hidden", "bg-base-100", 3, "ngClass"], [1, "flex", "flex-grow-0", "flex-shrink", "basis-full", "overflow-hidden", 3, "connected", "hasLiveResults", "textOutput", "error"], [3, "text", 4, "ngIf"], ["for", "drawer-enable", "class", "drawer-button btn btn-ghost btn-half-circle-left btn-info fixed top-1/2 right-0", 4, "ngIf"], [1, "drawer-side"], ["for", "drawer-enable", 1, "drawer-overlay", "opacity-0"], [3, "text"], ["for", "drawer-enable", 1, "drawer-button", "btn", "btn-ghost", "btn-half-circle-left", "btn-info", "fixed", "top-1/2", "right-0"], ["name", "heroChevronLeft", 1, "text-2xl"]],
  template: function RecognitionRenderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "app-recognized-text", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, RecognitionRenderComponent_app_recognized_live_text_6_Template, 1, 1, "app-recognized-live-text", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, RecognitionRenderComponent_label_7_Template, 2, 2, "label", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "label", 9)(10, "app-recognition-control-sidebar");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction2"](8, _c1, ctx.textFlowDown(), !ctx.textFlowDown()));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("connected", ctx.connected)("hasLiveResults", ctx.hasLiveResults)("textOutput", ctx.textOutput)("error", ctx.error);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.liveText());
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.connected() || ctx.paused());
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@slideOutRightOnLeave", undefined);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _ng_icons_core__WEBPACK_IMPORTED_MODULE_13__.NgIconComponent, _recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_5__.RecognizedTextComponent, _recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__.RecognizedLiveTextComponent, _recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_7__.RecognitionControlSidebarComponent],
  styles: [".drawer-end[_ngcontent-%COMP%]   .drawer-toggle[_ngcontent-%COMP%]    ~ .drawer-side[_ngcontent-%COMP%] {\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29nbml0aW9uLXJlbmRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0YiLCJmaWxlIjoicmVjb2duaXRpb24tcmVuZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRyYXdlci1lbmQgLmRyYXdlci10b2dnbGUgfiAuZHJhd2VyLXNpZGUge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9yZWNvZ25pdGlvbi1yZW5kZXIvcmVjb2duaXRpb24tcmVuZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQUE7QUFDRjtBQUNBLHdYQUF3WCIsInNvdXJjZXNDb250ZW50IjpbIi5kcmF3ZXItZW5kIC5kcmF3ZXItdG9nZ2xlIH4gLmRyYXdlci1zaWRlIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.slideInRightOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.slideInUpOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.slideOutDownOnLeaveAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.slideOutRightOnLeaveAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_14__.fadeInOnEnterAnimation)()]
  }
});


/***/ }),

/***/ 3643:
/*!*****************************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/recognized-live-text/recognized-live-text.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognizedLiveTextComponent": () => (/* binding */ RecognizedLiveTextComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../../shared-ui/src/lib/pipes/proper.pipe */ 4367);










function RecognizedLiveTextComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 3);
  }
}
function RecognizedLiveTextComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "proper");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const txt_r2 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("@fadeOutOnLeave", undefined)("classList", ctx_r1.classList());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 3, txt_r2));
  }
}
const _c0 = function (a0, a1) {
  return {
    "flex-col-reverse": a0,
    "flex-col": a1
  };
};
class RecognizedLiveTextComponent {
  constructor(store) {
    this.store = store;
    this.textSize = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.selectTextSize));
    this.lineHeight = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.selectLineHeight));
    this.classList = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => `recognized-text live ${this.textSize()} ${this.lineHeight()}`);
    this.textFlowDown = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_2__.toSignal)(this.store.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.select)(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.selectTextFlow), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(flow => flow === 'top-down')));
  }
}
RecognizedLiveTextComponent.ɵfac = function RecognizedLiveTextComponent_Factory(t) {
  return new (t || RecognizedLiveTextComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_3__.Store));
};
RecognizedLiveTextComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: RecognizedLiveTextComponent,
  selectors: [["app-recognized-live-text"]],
  inputs: {
    text: "text"
  },
  decls: 3,
  vars: 6,
  consts: [[1, "flex", "max-h-full", "justify-end", "live-text-render", "flex-shrink", "flex-grow-0", "bg-base-100", "text-base-content", "px-6", 3, "ngClass"], ["class", "divider divider-vertical", 4, "ngIf"], [3, "classList", 4, "ngIf"], [1, "divider", "divider-vertical"], [3, "classList"]],
  template: function RecognizedLiveTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecognizedLiveTextComponent_div_1_Template, 1, 0, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, RecognizedLiveTextComponent_div_2_Template, 3, 5, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](3, _c0, ctx.textFlowDown(), !ctx.textFlowDown()));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.text());
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.text());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_6__.ProperPipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWNvZ25pemVkLWxpdmUtdGV4dC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9yZWNvZ25pemVkLWxpdmUtdGV4dC9yZWNvZ25pemVkLWxpdmUtdGV4dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0xBQW9MIiwic291cmNlUm9vdCI6IiJ9 */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_7__.fadeOutOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 1589:
/*!*******************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/components/recognized-text/recognized-text.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognizedTextComponent": () => (/* binding */ RecognizedTextComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var angular_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-animations */ 245);
/* harmony import */ var _selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../selectors/peer.selectors */ 3827);
/* harmony import */ var _selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../selectors/recognition.selector */ 2513);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../selectors/settings.selector */ 8783);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../../shared-ui/src/lib/pipes/proper.pipe */ 4367);












function RecognizedTextComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const err_r4 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, "ERRORS.RECOGNITION." + err_r4));
  }
}
function RecognizedTextComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6)(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@fadeOutOnLeave", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.hintText);
  }
}
function RecognizedTextComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "proper");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const text_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@fadeInOnEnter", undefined)("@fadeOutOnLeave", undefined)("classList", ctx_r2.classList());
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 4, text_r5), " ");
  }
}
function RecognizedTextComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "HINTS.recognitionPaused");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class RecognizedTextComponent {
  constructor(store) {
    this.store = store;
    this.hintText = 'HINTS.beginSpeaking';
    this.textSize = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_2__.selectTextSize));
    this.lineHeight = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_2__.selectLineHeight));
    this.classList = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.computed)(() => `recognized-text ${this.textSize()} ${this.lineHeight()}`);
    const recognitionPaused = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.select(_selectors_recognition_selector__WEBPACK_IMPORTED_MODULE_1__.recognitionPausedSelector));
    const broadcastPaused = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toSignal)(this.store.select(_selectors_peer_selectors__WEBPACK_IMPORTED_MODULE_0__.selectBroadcastPaused));
    this.isPaused = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.computed)(() => recognitionPaused() || broadcastPaused());
  }
}
RecognizedTextComponent.ɵfac = function RecognizedTextComponent_Factory(t) {
  return new (t || RecognizedTextComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.Store));
};
RecognizedTextComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: RecognizedTextComponent,
  selectors: [["app-recognized-text"]],
  inputs: {
    connected: "connected",
    hasLiveResults: "hasLiveResults",
    textOutput: "textOutput",
    error: "error",
    hintText: "hintText"
  },
  decls: 5,
  vars: 4,
  consts: [[1, "flex", "flex-col", "justify-end", "basis-full", "flex-grow-0", "flex-shrink-0", "bg-base-100", "text-base-content", "p-6", "gap-3", "overflow-hidden", "relative"], ["class", "text-error self-stretch text-center text-md sm:text-xl", 4, "ngIf"], ["class", "text-center h-auto fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "badge badge-warning px-6 py-3 text-center h-auto fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2", "translate", "", 4, "ngIf"], [1, "text-error", "self-stretch", "text-center", "text-md", "sm:text-xl"], [1, "text-center", "h-auto", "fixed", "top-1/2", "left-1/2", "-translate-y-1/2", "-translate-x-1/2"], ["translate", "", 1, "text-sm", "text-accent", "flex", "flex-row", "text-center"], [3, "classList"], ["translate", "", 1, "badge", "badge-warning", "px-6", "py-3", "text-center", "h-auto", "fixed", "top-1/2", "left-1/2", "-translate-y-1/2", "-translate-x-1/2"]],
  template: function RecognizedTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, RecognizedTextComponent_div_1_Template, 3, 3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, RecognizedTextComponent_div_2_Template, 3, 2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, RecognizedTextComponent_ng_container_3_Template, 4, 6, "ng-container", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, RecognizedTextComponent_div_4_Template, 2, 0, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.error());
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.hasLiveResults());
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.textOutput());
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isPaused());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateDirective, _shared_ui_src_lib_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_8__.ProperPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWNvZ25pemVkLXRleHQuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvbWVkaWEvY29tcG9uZW50cy9yZWNvZ25pemVkLXRleHQvcmVjb2duaXplZC10ZXh0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnTEFBZ0wiLCJzb3VyY2VSb290IjoiIn0= */"],
  data: {
    animation: [(0,angular_animations__WEBPACK_IMPORTED_MODULE_9__.fadeInOnEnterAnimation)(), (0,angular_animations__WEBPACK_IMPORTED_MODULE_9__.fadeOutOnLeaveAnimation)()]
  }
});


/***/ }),

/***/ 1868:
/*!***************************************************************!*\
  !*** ./packages/client/src/app/modules/media/media.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaModule": () => (/* binding */ MediaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _ng_icons_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-icons/core */ 5985);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngrx/effects */ 2847);
/* harmony import */ var shared_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! shared-ui */ 5543);
/* harmony import */ var _directives_background_magnitude_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../directives/background-magnitude.directive */ 9690);
/* harmony import */ var _effects_audio_stream_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../effects/audio-stream.effects */ 4557);
/* harmony import */ var _effects_recognition_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../effects/recognition.effects */ 9996);
/* harmony import */ var _components_audio_input_enable_audio_input_enable_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/audio-input-enable/audio-input-enable.component */ 386);
/* harmony import */ var _components_recognition_enable_recognition_enable_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/recognition-enable/recognition-enable.component */ 4315);
/* harmony import */ var _components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/recognition-render/recognition-render.component */ 5741);
/* harmony import */ var _components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/recognized-live-text/recognized-live-text.component */ 3643);
/* harmony import */ var _components_recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/recognized-text/recognized-text.component */ 1589);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 1468);
/* harmony import */ var _components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/recognition-control-sidebar/recognition-control-sidebar.component */ 213);
/* harmony import */ var _components_full_screen_full_screen_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/full-screen/full-screen.component */ 5594);
/* harmony import */ var _components_flow_direction_flow_direction_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/flow-direction/flow-direction.component */ 6085);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 6839);



















class MediaModule {}
MediaModule.ɵfac = function MediaModule_Factory(t) {
  return new (t || MediaModule)();
};
MediaModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
  type: MediaModule
});
MediaModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, shared_ui__WEBPACK_IMPORTED_MODULE_13__.SharedUiModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_14__.EffectsModule.forFeature([_effects_audio_stream_effects__WEBPACK_IMPORTED_MODULE_1__.AudioStreamEffects, _effects_recognition_effects__WEBPACK_IMPORTED_MODULE_2__.RecognitionEffects]), _ng_icons_core__WEBPACK_IMPORTED_MODULE_15__.NgIconsModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateModule.forChild({
    extend: true
  })]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](MediaModule, {
    declarations: [_components_audio_input_enable_audio_input_enable_component__WEBPACK_IMPORTED_MODULE_3__.AudioInputEnableComponent, _components_recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_7__.RecognizedTextComponent, _components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__.RecognizedLiveTextComponent, _components_recognition_enable_recognition_enable_component__WEBPACK_IMPORTED_MODULE_4__.RecognitionEnableComponent, _components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_5__.RecognitionRenderComponent, _components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.RecognitionControlSidebarComponent, _components_full_screen_full_screen_component__WEBPACK_IMPORTED_MODULE_9__.FullScreenComponent, _components_flow_direction_flow_direction_component__WEBPACK_IMPORTED_MODULE_10__.FlowDirectionComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule, shared_ui__WEBPACK_IMPORTED_MODULE_13__.SharedUiModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_14__.EffectsFeatureModule, _ng_icons_core__WEBPACK_IMPORTED_MODULE_15__.NgIconsModule, _directives_background_magnitude_directive__WEBPACK_IMPORTED_MODULE_0__.BackgroundMagnitudeDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateModule],
    exports: [_components_audio_input_enable_audio_input_enable_component__WEBPACK_IMPORTED_MODULE_3__.AudioInputEnableComponent, _components_recognized_text_recognized_text_component__WEBPACK_IMPORTED_MODULE_7__.RecognizedTextComponent, _components_recognized_live_text_recognized_live_text_component__WEBPACK_IMPORTED_MODULE_6__.RecognizedLiveTextComponent, _components_recognition_enable_recognition_enable_component__WEBPACK_IMPORTED_MODULE_4__.RecognitionEnableComponent, _components_recognition_render_recognition_render_component__WEBPACK_IMPORTED_MODULE_5__.RecognitionRenderComponent, _components_recognition_control_sidebar_recognition_control_sidebar_component__WEBPACK_IMPORTED_MODULE_8__.RecognitionControlSidebarComponent]
  });
})();

/***/ }),

/***/ 5261:
/*!*************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/services/media.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaService": () => (/* binding */ MediaService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 635);



class MediaService {
  constructor() {
    this.streamsMap = new Map();
    this.volumeAnalyserMap = new Map();
  }
  getMediaStream(deviceId) {
    // console.log('get media stream', deviceId);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(navigator.mediaDevices.getUserMedia({
      video: false,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1,
        sampleRate: 1600,
        deviceId
      }
    })).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(stream => {
      // console.log('got media stream', stream);
      this.streamsMap.set(stream.id, stream);
      this._watchStreamVolume(stream);
      return stream.id;
    }));
  }
  disconnectStream(streamId) {
    const stream = this.streamsMap.get(streamId);
    if (stream) {
      stream.dispatchEvent(new Event('stop_observation'));
      stream.getAudioTracks().forEach(track => {
        // console.log('streamtrack', track);
        track.stop();
      });
      this.streamsMap.delete(streamId);
    }
    return streamId;
  }
  getVolumeForStream(streamId) {
    if (!this.volumeAnalyserMap.has(streamId)) {
      throw new Error(`Stream id does not appear to have a volume analyzer`);
    }
    return this.volumeAnalyserMap.get(streamId);
  }
  _watchStreamVolume(stream) {
    if (!this.context) {
      this.context = new AudioContext();
    }
    let level = this.volumeAnalyserMap.get(stream.id);
    if (!level) {
      level = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(0);
      this.volumeAnalyserMap.set(stream.id, level);
    }
    const sourceNode = this.context.createMediaStreamSource(stream);
    const analyserNode = this.context.createAnalyser();
    stream.addEventListener('stop_observation', () => {
      // console.log('stopping observation of stream')
      sourceNode.disconnect();
      analyserNode.disconnect();
    });
    sourceNode.connect(analyserNode);
    const pcmData = new Float32Array(analyserNode.fftSize);
    const onFrame = () => {
      analyserNode.getFloatTimeDomainData(pcmData);
      let sumSquares = 0.0;
      for (const amplitude of pcmData) {
        sumSquares += amplitude * amplitude;
      }
      const volLevel = Math.round(Math.sqrt(sumSquares / pcmData.length) * 100);
      level.set(volLevel);
      if (stream.active) {
        window.requestAnimationFrame(onFrame);
      } else {
        // console.log('stream is inactive, setting volume to zero')
        level.set(0);
      }
    };
    window.requestAnimationFrame(onFrame);
  }
}
MediaService.ɵfac = function MediaService_Factory(t) {
  return new (t || MediaService)();
};
MediaService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: MediaService,
  factory: MediaService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 6324:
/*!*******************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/services/recognition.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecognitionService": () => (/* binding */ RecognitionService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 8951);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 1989);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 5004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 998);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/app.model */ 4056);
/* harmony import */ var _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/audio-stream.model */ 7513);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/recognition.model */ 1088);
/* harmony import */ var _selectors_app_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../selectors/app.selector */ 8603);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../selectors/settings.selector */ 8783);
/* harmony import */ var _services_worker_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/worker.util */ 1378);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngrx/store */ 4307);












class RecognitionService {
  constructor(store) {
    this.store = store;
    this.recognitionMap = new Map();
    this.activeRecognitionStreams = new Set();
    this.recognizedTextMap = new Map();
    this.liveOutputMap = new Map();
    this.DEBOUNCE_TIME_MS = 150;
    this.SEGMENTATION_DEBOUNCE_MS = 1500;
    this.MAX_RECOGNITION_LENGTH = 15;
    this.historyWorker = (0,_services_worker_util__WEBPACK_IMPORTED_MODULE_5__.getWorker)();
    this.historyWorker.addEventListener('message', ({
      data
    }) => {
      // console.log(data);
    });
    this.language = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_4__.languageSelector));
    this.platform = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.toSignal)(this.store.select(_selectors_app_selector__WEBPACK_IMPORTED_MODULE_3__.platformSelector));
  }
  connectToStream(streamId) {
    if (this.platform() === _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.mobile) {
      this.DEBOUNCE_TIME_MS = 750;
      this.SEGMENTATION_DEBOUNCE_MS = 2500;
    }
    // OBS Studio Integration - set segmentation debounce to longer interval
    if (streamId === 'stream') {
      this.DEBOUNCE_TIME_MS = 1750;
    }
    // console.log('recognize stream', streamId);
    const recog = new webkitSpeechRecognition();
    recog.interimResults = true;
    recog.continuous = true;
    recog.lang = this.language();
    this.recognitionMap.set(streamId, recog);
    this.activeRecognitionStreams.add(streamId);
    this._addEventListeners(streamId, recog);
    // this._debugAllEventListeners(recog);
    recog.start();
    // console.log('started', streamId);
  }

  disconnectFromStream(streamId) {
    // console.log(`disconnect from stream ${streamId}`)
    const recognition = this.recognitionMap.get(streamId);
    if (recognition) {
      // console.log('found in map - stopping', streamId)
      this.activeRecognitionStreams.delete(streamId);
      this.recognitionMap.delete(streamId);
      recognition.stop();
    }
  }
  pauseRecognition() {
    this.recognitionMap.forEach((recog, streamId) => {
      this.activeRecognitionStreams.delete(streamId);
      recog.stop();
    });
  }
  resumeRecognition() {
    this.recognitionMap.forEach((recog, streamId) => {
      this.activeRecognitionStreams.add(streamId);
      recog.start();
    });
  }
  getLiveOutput(streamId) {
    const liveOutput = this.liveOutputMap.get(streamId);
    if (!liveOutput) {
      throw new Error(`No live output signal for recognition stream id ${streamId}`);
    } else {
      // TODO: Remove after dev
      // return signal<string>('This is a long sentence and should give us an idea of how to address the overflow when text size is set to maximum.') as Signal<string>
      return liveOutput;
    }
  }
  getRecognizedText(streamId) {
    const recognizedTextOutput = this.recognizedTextMap.get(streamId);
    if (!recognizedTextOutput) {
      throw new Error(`Recognized text output signal not found for stream id ${streamId}`);
    } else {
      return recognizedTextOutput;
    }
  }
  _addEventListeners(streamId, recognition) {
    const platform = this.platform();
    const recognizedText = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.signal)([]);
    this.recognizedTextMap.set(streamId, recognizedText);
    const liveOutput = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.signal)('');
    this.liveOutputMap.set(streamId, liveOutput);
    let transcript;
    let mostRecentResults;
    const transcriptSegments = new Set();
    // Debounce is to provide a timeout after the last-recognized full text, 
    // in order to better handle chunking in related tasks for the media stream
    // TODO: Allow adjustment of debounce
    const debounce$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    const disconnect$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject();
    // Live results logic
    debounce$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(disconnect$), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.debounceTime)(this.DEBOUNCE_TIME_MS), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throttleTime)(this.DEBOUNCE_TIME_MS, undefined, {
      leading: false,
      trailing: true
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.auditTime)(this.DEBOUNCE_TIME_MS)).subscribe(() => {
      // console.log('debounce ended', Date.now());
      if (mostRecentResults) {
        const partialTranscript = mostRecentResults.filter(result => {
          if (streamId === 'stream') {
            return result[0].transcript !== '';
          } else if (result.isFinal && result[0].transcript !== '' && !transcriptSegments.has(result)) {
            if (platform !== _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.mobile) {
              transcriptSegments.add(result);
            }
            return true;
          }
          return false;
        }).map(result => result[0]).reduce((acc, alternative, idx) => {
          if (platform === _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.mobile) {
            acc.push(alternative);
          } else if (alternative.confidence > 0) {
            acc.push(alternative);
          }
          return acc;
        }, []).map(alternative => alternative.transcript).join('').trim();
        if (partialTranscript !== '') {
          recognizedText.update(current => {
            current.push(partialTranscript);
            // this.historyWorker.postMessage({id: streamId, type: 'put', message: partialTranscript})
            return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
          });
          transcript = '';
          liveOutput.set('');
          debounce$.next();
        }
      }
    });
    // Segmentation delay and logic
    debounce$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(disconnect$), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.debounceTime)(this.SEGMENTATION_DEBOUNCE_MS), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.throttleTime)(this.SEGMENTATION_DEBOUNCE_MS, undefined, {
      leading: false,
      trailing: true
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.auditTime)(this.SEGMENTATION_DEBOUNCE_MS)).subscribe(() => {
      // console.log('segment')
      if (liveOutput() !== '') {
        // console.log('live output is not blank - stopping', liveOutput())
        recognition.stop();
      } else if (!this.activeRecognitionStreams.has(streamId)) {
        // console.log('recognition stream inactive - stopping')
        recognition.stop();
      } else {
        // console.log('not ending - liveoutput blank')
      }
    });
    recognition.addEventListener('result', e => {
      // console.log('result')
      debounce$.next();
      if (this.platform() === _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.desktop) {
        mostRecentResults = Array.from(e.results);
        transcript = mostRecentResults.filter(result => !transcriptSegments.has(result)).map(result => {
          return result[0];
        })
        // TODO: Allow adjustment of confidence threshold
        .filter(result => {
          return result.transcript.length && result.confidence > 0;
        }).map(result => result.transcript).join('');
      } else {
        const lastResult = e.results.item(e.results.length - 1);
        mostRecentResults = [lastResult];
        if (lastResult[0].transcript.length) {
          transcript = lastResult[0].transcript;
        }
      }
      liveOutput.set(transcript);
    });
    recognition.addEventListener('end', e => {
      // console.log('end', Date.now())
      mostRecentResults = undefined;
      const mostRecentOutput = liveOutput();
      // console.log('mostRecentOutput', mostRecentOutput);
      transcriptSegments.clear();
      if (mostRecentOutput !== '') {
        recognizedText.update(current => {
          current.push(mostRecentOutput);
          // this.historyWorker.postMessage({id: streamId, type: 'put', message: mostRecentOutput})
          return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
        });
        // console.log('clearing live output');
        liveOutput.set('');
        transcript = '';
      }
      if (this.activeRecognitionStreams.has(streamId)) {
        // console.log('recognition still active, restarting')
        recognition.start();
      } else {
        // console.log('recognition inactive, disconnecting')
        disconnect$.next();
      }
    });
    recognition.addEventListener('error', err => {
      console.log('recognition error', err.message);
      console.error(err);
      if (err.error === 'no-speech') {
        if (liveOutput() !== '') {
          liveOutput.set('');
          // } else if (recognizedText().length) {
          //   recognizedText.update((previous) => previous.slice(0, previous.length - 1))
        }

        return;
        // } else if (err.error === 'aborted' && this.activeRecognitionStreams.has(streamId)) {
        //   console.log('supressing aborted error, still acive');
        //   return;
      }

      this.activeRecognitionStreams.delete(streamId);
      // console.log('stopping due to error');
      recognition.stop();
      this.store.dispatch(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_1__.AudioStreamActions.audioStreamError({
        error: err.error
      }));
      this.store.dispatch(_models_recognition_model__WEBPACK_IMPORTED_MODULE_2__.RecognitionActions.recognitionError({
        error: err.error
      }));
    });
  }
  _debugAllEventListeners(recognition) {
    const events = ['audioend', 'audiostart', 'end', 'error', 'nomatch', 'result', 'soundend', 'soundstart', 'speechend', 'speechstart', 'start'];
    for (const ev of events) {
      recognition.addEventListener(ev, e => console.log(ev, e));
    }
  }
}
RecognitionService.ɵfac = function RecognitionService_Factory(t) {
  return new (t || RecognitionService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_13__.Store));
};
RecognitionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: RecognitionService,
  factory: RecognitionService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 190:
/*!******************************************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/components/cookie-policy/cookie-policy.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CookiePolicyComponent": () => (/* binding */ CookiePolicyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ 1468);


class CookiePolicyComponent {}
CookiePolicyComponent.ɵfac = function CookiePolicyComponent_Factory(t) {
  return new (t || CookiePolicyComponent)();
};
CookiePolicyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: CookiePolicyComponent,
  selectors: [["app-cookie-policy"]],
  decls: 33,
  vars: 6,
  consts: [[1, "flex", "flex-col", "basis-full", "p-3", "items-center"], [1, "flex", "flex-col", "max-w-lg", "gap-3"], ["translate", "", 1, "text-xl", "w-full", "text-center"], ["translate", ""], ["translate", "", 1, "text-lg"], ["translate", "", 1, "italic"], ["href", "www.internetcookies.com"]],
  template: function CookiePolicyComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "COOKIES.POLICY.title");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "COOKIES.POLICY.p1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "COOKIES.POLICY.h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "COOKIES.POLICY.p2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "COOKIES.POLICY.h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "COOKIES.POLICY.t3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "COOKIES.POLICY.p3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "COOKIES.POLICY.t4");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "COOKIES.POLICY.p4");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "COOKIES.POLICY.t5");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "COOKIES.POLICY.p5");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "COOKIES.POLICY.h6");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](28, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "www.internetcookies.com");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](32, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](28, 2, "COOKIES.POLICY.p6_1"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](32, 4, "COOKIES.POLICY.p6_2"), " ");
    }
  },
  dependencies: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslateDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb29raWUtcG9saWN5LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3BhY2thZ2VzL2NsaWVudC9zcmMvYXBwL21vZHVsZXMvc2V0dGluZ3MvY29tcG9uZW50cy9jb29raWUtcG9saWN5L2Nvb2tpZS1wb2xpY3kuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDRLQUE0SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});


/***/ }),

/***/ 3545:
/*!***************************************************************************!*\
  !*** ./packages/client/src/app/modules/settings/models/settings.model.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppTheme": () => (/* binding */ AppTheme),
/* harmony export */   "AvailableLanguages": () => (/* binding */ AvailableLanguages),
/* harmony export */   "AvailableLineHeights": () => (/* binding */ AvailableLineHeights),
/* harmony export */   "AvailableTextFlow": () => (/* binding */ AvailableTextFlow),
/* harmony export */   "AvailableTextSizes": () => (/* binding */ AvailableTextSizes),
/* harmony export */   "SettingsActions": () => (/* reexport module object */ _actions_settings_actions__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _actions_settings_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../actions/settings.actions */ 9895);
var AppTheme;
(function (AppTheme) {
  AppTheme["dark"] = "dark";
  AppTheme["light"] = "light";
  AppTheme["cupcake"] = "cupcake";
  AppTheme["bumblebee"] = "bumblebee";
  AppTheme["emerald"] = "emerald";
  AppTheme["corporate"] = "corporate";
  AppTheme["synthwave"] = "synthwave";
  AppTheme["retro"] = "retro";
  AppTheme["cyberpunk"] = "cyberpunk";
  AppTheme["valentine"] = "valentine";
  AppTheme["halloween"] = "halloween";
  AppTheme["garden"] = "garden";
  AppTheme["forest"] = "forest";
  AppTheme["aqua"] = "aqua";
  AppTheme["lofi"] = "lofi";
  AppTheme["pastel"] = "pastel";
  AppTheme["fantasy"] = "fantasy";
  AppTheme["wireframe"] = "wireframe";
  AppTheme["black"] = "black";
  AppTheme["luxury"] = "luxury";
  AppTheme["dracula"] = "dracula";
  AppTheme["cmyk"] = "cmyk";
  AppTheme["autumn"] = "autumn";
  AppTheme["business"] = "business";
  AppTheme["acid"] = "acid";
  AppTheme["lemonade"] = "lemonade";
  AppTheme["night"] = "night";
  AppTheme["coffee"] = "coffee";
  AppTheme["winter"] = "winter";
  AppTheme["ZipDark"] = "Zip-Dark";
  AppTheme["ZipLight"] = "Zip-Light";
})(AppTheme || (AppTheme = {}));
const AvailableLanguages = ['en', 'fr', 'sp', 'de', 'it'
// 'pt' // TODO: Portuguese translation file
];

const AvailableTextSizes = ['textSize-xs', 'textSize-sm', 'textSize-base', 'textSize-lg', 'textSize-xl', 'textSize-2xl', 'textSize-3xl', 'textSize-4xl', 'textSize-5xl', 'textSize-6xl', 'textSize-7xl', 'textSize-8xl', 'textSize-9xl'];
const AvailableLineHeights = ['lineHeight-none', 'lineHeight-tight', 'lineHeight-snug', 'lineHeight-normal', 'lineHeight-relaxed', 'lineHeight-loose'];
const AvailableTextFlow = ['bottom-up', 'top-down'];


/***/ }),

/***/ 3051:
/*!*********************************************************!*\
  !*** ./packages/client/src/app/reducers/app.reducer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appAppearanceReducers": () => (/* binding */ appAppearanceReducers),
/* harmony export */   "defaultAppAppearance": () => (/* binding */ defaultAppAppearance),
/* harmony export */   "defaultAppState": () => (/* binding */ defaultAppState)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _actions_app_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/app.actions */ 2432);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/app.model */ 4056);
/* harmony import */ var _audio_stream_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio-stream.reducer */ 3996);
/* harmony import */ var _recognition_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recognition.reducer */ 4711);
/* harmony import */ var _settings_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings.reducer */ 8868);
/* harmony import */ var _peer_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peer.reducer */ 2553);
/* harmony import */ var _obs_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./obs.reducer */ 9232);








const defaultAppAppearance = {
  loading: false,
  cookiesAccepted: false,
  peerConnectionsAccepted: false,
  footerVisible: true,
  connectivity: _models_app_model__WEBPACK_IMPORTED_MODULE_1__.Connectivity.online
};
const defaultAppState = {
  appearance: defaultAppAppearance,
  settings: _settings_reducer__WEBPACK_IMPORTED_MODULE_4__.defaultSettingsState,
  audioStream: _audio_stream_reducer__WEBPACK_IMPORTED_MODULE_2__.defaultAudioStreamState,
  recognition: _recognition_reducer__WEBPACK_IMPORTED_MODULE_3__.defaultRecognitionState,
  peer: _peer_reducer__WEBPACK_IMPORTED_MODULE_5__.defaultPeerState,
  obs: _obs_reducer__WEBPACK_IMPORTED_MODULE_6__.defaultObsState
};
const appAppearanceReducers = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.createReducer)(defaultAppAppearance, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.hideFooter, state => ({
  ...state,
  footerVisible: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.showFooter, state => ({
  ...state,
  footerVisible: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.checkUserAgent, state => ({
  ...state,
  loading: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.checkUserAgentComplete, (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
  warning: action.warning,
  platform: action.platform
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.initAppearance, state => ({
  ...state,
  loading: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.initAppearanceComplete, (state, action) => ({
  ...state,
  ...action.appearance,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.acceptCookies, state => ({
  ...state,
  cookiesAccepted: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.declineCookies, state => ({
  ...state,
  cookiesAccepted: false,
  cookiesDeclinedTimestamp: Date.now()
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.setPeerConnectionsAccepted, (state, action) => ({
  ...state,
  peerConnectionsAccepted: action.accepted
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.clearAppError, state => ({
  ...state,
  error: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.on)(_actions_app_actions__WEBPACK_IMPORTED_MODULE_0__.updateConnectivityState, (state, action) => ({
  ...state,
  connectivity: action.connectivity
})));

/***/ }),

/***/ 3996:
/*!******************************************************************!*\
  !*** ./packages/client/src/app/reducers/audio-stream.reducer.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "audioStreamReducers": () => (/* binding */ audioStreamReducers),
/* harmony export */   "defaultAudioStreamState": () => (/* binding */ defaultAudioStreamState)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/audio-stream.model */ 7513);


const defaultAudioStreamState = {
  id: 'default',
  status: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.uninitialized,
  isListening: false
};
const audioStreamReducers = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(defaultAudioStreamState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStream, state => ({
  ...state,
  status: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.connecting
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.disconnectStream, state => ({
  ...state,
  status: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.disconnected
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.startListen, state => ({
  ...state,
  isListening: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.stopListen, state => ({
  ...state,
  isListening: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStreamSuccess, (state, action) => ({
  ...state,
  id: action.id,
  status: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.connected
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.connectStreamFailure, (state, action) => ({
  ...state,
  error: action.error,
  status: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.disconnectStreamSuccess, (state, action) => ({
  ...state,
  id: action.id,
  state: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.disconnected,
  error: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamActions.audioStreamError, (state, action) => ({
  ...state,
  error: action.error,
  status: _models_audio_stream_model__WEBPACK_IMPORTED_MODULE_0__.AudioStreamStatus.error
})));

/***/ }),

/***/ 9232:
/*!*********************************************************!*\
  !*** ./packages/client/src/app/reducers/obs.reducer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsConnectionState": () => (/* binding */ ObsConnectionState),
/* harmony export */   "defaultObsState": () => (/* binding */ defaultObsState),
/* harmony export */   "obsFeatureKey": () => (/* binding */ obsFeatureKey),
/* harmony export */   "obsReducers": () => (/* binding */ obsReducers)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/obs.actions */ 8574);


const obsFeatureKey = 'obs';
var ObsConnectionState;
(function (ObsConnectionState) {
  ObsConnectionState["uninitialized"] = "UNINITIALIZED";
  ObsConnectionState["disconnected"] = "DISCONNECTED";
  ObsConnectionState["connecting"] = "CONNECTING";
  ObsConnectionState["connected"] = "CONNECTED";
  ObsConnectionState["error"] = "ERROR";
})(ObsConnectionState || (ObsConnectionState = {}));
const defaultObsState = {
  connected: ObsConnectionState.uninitialized
};
const obsReducers = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(defaultObsState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connect, state => ({
  ...state,
  connected: ObsConnectionState.connecting,
  error: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connectSuccess, state => ({
  ...state,
  connected: ObsConnectionState.connected
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.connectFailure, (state, action) => ({
  ...state,
  connected: ObsConnectionState.disconnected,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.disconnectSuccess, state => ({
  ...state,
  connected: ObsConnectionState.disconnected
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_obs_actions__WEBPACK_IMPORTED_MODULE_0__.ObsActions.setStreamingActive, (state, action) => ({
  ...state,
  streamingActive: action.active
})));

/***/ }),

/***/ 2553:
/*!**********************************************************!*\
  !*** ./packages/client/src/app/reducers/peer.reducer.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultPeerState": () => (/* binding */ defaultPeerState),
/* harmony export */   "peerFeatureKey": () => (/* binding */ peerFeatureKey),
/* harmony export */   "peerReducers": () => (/* binding */ peerReducers)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/peer.actions */ 6365);


const peerFeatureKey = 'peer';
const defaultPeerState = {
  serverOffline: true,
  peerConnectionCount: 0,
  isBroadcasting: false
};
const peerReducers = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(defaultPeerState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerConnected, state => ({
  ...state,
  socketConnected: true,
  serverOffline: false,
  error: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerUserIdAssigned, (state, action) => ({
  ...state,
  id: action.id
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectSocketServerFailure, (state, action) => ({
  ...state,
  socketConnected: false,
  serverOffline: true,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerError, (state, action) => ({
  ...state,
  socketConnected: false,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.socketServerDisconnected, state => ({
  ...state,
  socketConnected: false,
  id: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerConnected, state => ({
  ...state,
  peerConnected: true,
  error: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.connectPeerServerFailure, (state, action) => ({
  ...state,
  peerConnected: false,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerDisconnected, state => ({
  ...state,
  peerConnected: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.peerServerError, (state, action) => ({
  ...state,
  peerConnected: false,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.createBroadcastRoomSuccess, (state, action) => ({
  ...state,
  roomId: action.id,
  isBroadcasting: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.createBroadcastRoomFailure, (state, action) => ({
  ...state,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setJoinCode, (state, action) => ({
  ...state,
  joinCode: action.joinCode
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.clearJoinCode, state => ({
  ...state,
  joinCode: undefined,
  isViewingBroadcast: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setHostStatus, (state, action) => ({
  ...state,
  hostOnline: action.hostOnline
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoom, (state, action) => ({
  ...state,
  roomId: action.id,
  broadcastEndedTimestamp: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoomSuccess, state => ({
  ...state,
  isViewingBroadcast: true
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.joinBroadcastRoomFailure, (state, action) => ({
  ...state,
  isViewingBroadcast: false,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.leaveBroadcastRoom, state => ({
  ...state,
  roomId: undefined,
  joinCode: undefined,
  isViewingBroadcast: false,
  broadcastEndedTimestamp: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setBroadcastEndedAt, (state, action) => ({
  ...state,
  broadcastEndedTimestamp: action.endedAt,
  isViewingBroadcast: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.clearBroadcastEndedAt, state => ({
  ...state,
  broadcastEndedTimestamp: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.endBroadcastSuccess, state => ({
  ...state,
  isBroadcasting: false,
  roomId: undefined,
  joinCode: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.endBroadcastFailure, (state, action) => ({
  ...state,
  roomId: undefined,
  joinCode: undefined,
  isBroadcasting: false,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.updateConnectedPeerCount, (state, action) => ({
  ...state,
  peerConnectionCount: action.count
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_actions_peer_actions__WEBPACK_IMPORTED_MODULE_0__.PeerActions.setBroadcastPausedState, (state, action) => ({
  ...state,
  broadcastPaused: action.paused
})));

/***/ }),

/***/ 4711:
/*!*****************************************************************!*\
  !*** ./packages/client/src/app/reducers/recognition.reducer.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultRecognitionState": () => (/* binding */ defaultRecognitionState),
/* harmony export */   "recognitionReducers": () => (/* binding */ recognitionReducers)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/recognition.model */ 1088);


const defaultRecognitionState = {
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.uninitialized
};
const recognitionReducers = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(defaultRecognitionState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.connectRecognition, (state, action) => ({
  ...state,
  id: action.id,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.connecting
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.disconnectRecognition, (state, action) => ({
  ...state,
  id: action.id,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.disconnected,
  error: undefined
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.pauseRecognition, state => ({
  ...state,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.paused
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.resumeRecognition, state => ({
  ...state,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.connected
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.recognitionError, (state, action) => ({
  ...state,
  error: action.error,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.connectRecognitionSuccess, state => ({
  ...state,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.connected
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.connectRecognitionFailure, (state, action) => ({
  ...state,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.error,
  error: action.error
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionActions.resetRecogntionState, state => ({
  ...state,
  status: _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.uninitialized
})));

/***/ }),

/***/ 8868:
/*!**************************************************************!*\
  !*** ./packages/client/src/app/reducers/settings.reducer.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultSettingsState": () => (/* binding */ defaultSettingsState),
/* harmony export */   "settingsReducers": () => (/* binding */ settingsReducers)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/settings/models/settings.model */ 3545);


const defaultSettingsState = {
  theme: _modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.AppTheme.ZipDark,
  lang: 'en',
  wakeLock: true,
  textSize: 'textSize-3xl',
  lineHeight: 'lineHeight-normal',
  textFlow: 'bottom-up'
};
const settingsReducers = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(defaultSettingsState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTheme, (state, action) => ({
  ...state,
  theme: action.theme
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLanguage, (state, action) => ({
  ...state,
  lang: action.language
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.initSettingsComplete, (state, action) => ({
  ...state,
  ...action.settings
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.updateWakeLockEnabled, (state, action) => ({
  ...state,
  wakeLock: action.enabled
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextSize, (state, action) => ({
  ...state,
  textSize: action.size
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setLineHeight, (state, action) => ({
  ...state,
  lineHeight: action.height
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_modules_settings_models_settings_model__WEBPACK_IMPORTED_MODULE_0__.SettingsActions.setTextFlow, (state, action) => ({
  ...state,
  textFlow: action.flow
})));

/***/ }),

/***/ 8603:
/*!***********************************************************!*\
  !*** ./packages/client/src/app/selectors/app.selector.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "errorSelector": () => (/* binding */ errorSelector),
/* harmony export */   "footerVisibleSelector": () => (/* binding */ footerVisibleSelector),
/* harmony export */   "isOfflineSelector": () => (/* binding */ isOfflineSelector),
/* harmony export */   "loadingSelector": () => (/* binding */ loadingSelector),
/* harmony export */   "peerConnectionsAcceptedSelector": () => (/* binding */ peerConnectionsAcceptedSelector),
/* harmony export */   "platformSelector": () => (/* binding */ platformSelector),
/* harmony export */   "selectAppAppearance": () => (/* binding */ selectAppAppearance),
/* harmony export */   "warningSelector": () => (/* binding */ warningSelector)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/app.model */ 4056);


const selectAppAppearance = state => state.appearance;
const loadingSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.loading);
const footerVisibleSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.footerVisible);
const errorSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.error);
const warningSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.warning);
const platformSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.platform);
const peerConnectionsAcceptedSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.peerConnectionsAccepted);
const isOfflineSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectAppAppearance, state => state.connectivity === _models_app_model__WEBPACK_IMPORTED_MODULE_0__.Connectivity.offline);

/***/ }),

/***/ 977:
/*!********************************************************************!*\
  !*** ./packages/client/src/app/selectors/audio-stream.selector.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isListeningSelector": () => (/* binding */ isListeningSelector),
/* harmony export */   "selectAudioStream": () => (/* binding */ selectAudioStream),
/* harmony export */   "statusSelector": () => (/* binding */ statusSelector),
/* harmony export */   "streamErrorSelector": () => (/* binding */ streamErrorSelector)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const selectAudioStream = state => state.audioStream;
const statusSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAudioStream, state => state.status);
const isListeningSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAudioStream, state => state.isListening);
const streamErrorSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAudioStream, state => state.error);

/***/ }),

/***/ 7595:
/*!************************************************************!*\
  !*** ./packages/client/src/app/selectors/obs.selectors.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectObsConnected": () => (/* binding */ selectObsConnected),
/* harmony export */   "selectObsError": () => (/* binding */ selectObsError),
/* harmony export */   "selectObsState": () => (/* binding */ selectObsState),
/* harmony export */   "selectObsStreamActive": () => (/* binding */ selectObsStreamActive),
/* harmony export */   "selectObsWebsocketIp": () => (/* binding */ selectObsWebsocketIp),
/* harmony export */   "selectObsWebsocketPassword": () => (/* binding */ selectObsWebsocketPassword),
/* harmony export */   "selectObsWebsocketPort": () => (/* binding */ selectObsWebsocketPort)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const selectObsState = state => state.obs;
const selectObsConnected = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectObsState, state => state.connected);
const selectObsWebsocketIp = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectObsState, state => state.socketIp);
const selectObsWebsocketPort = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectObsState, state => state.socketPort);
const selectObsWebsocketPassword = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectObsState, state => state.socketPassword);
const selectObsError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectObsState, state => state.error);
const selectObsStreamActive = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectObsState, state => state.streamingActive);

/***/ }),

/***/ 3827:
/*!*************************************************************!*\
  !*** ./packages/client/src/app/selectors/peer.selectors.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectBroadcastEndedTimestamp": () => (/* binding */ selectBroadcastEndedTimestamp),
/* harmony export */   "selectBroadcastPaused": () => (/* binding */ selectBroadcastPaused),
/* harmony export */   "selectConnectedPeerCount": () => (/* binding */ selectConnectedPeerCount),
/* harmony export */   "selectHostOnline": () => (/* binding */ selectHostOnline),
/* harmony export */   "selectIsBroadcasting": () => (/* binding */ selectIsBroadcasting),
/* harmony export */   "selectIsViewing": () => (/* binding */ selectIsViewing),
/* harmony export */   "selectJoinCode": () => (/* binding */ selectJoinCode),
/* harmony export */   "selectMyUserId": () => (/* binding */ selectMyUserId),
/* harmony export */   "selectPeerError": () => (/* binding */ selectPeerError),
/* harmony export */   "selectPeerServerConnected": () => (/* binding */ selectPeerServerConnected),
/* harmony export */   "selectPeerState": () => (/* binding */ selectPeerState),
/* harmony export */   "selectRoomId": () => (/* binding */ selectRoomId),
/* harmony export */   "selectServerOffline": () => (/* binding */ selectServerOffline),
/* harmony export */   "selectSocketServerConnected": () => (/* binding */ selectSocketServerConnected)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const selectPeerState = state => state.peer;
const selectSocketServerConnected = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.socketConnected);
const selectPeerServerConnected = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.peerConnected);
const selectServerOffline = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.serverOffline);
const selectPeerError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.error);
const selectMyUserId = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.id);
const selectRoomId = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.roomId);
const selectJoinCode = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.joinCode);
const selectConnectedPeerCount = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.peerConnectionCount);
const selectIsBroadcasting = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.isBroadcasting);
const selectIsViewing = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.isViewingBroadcast);
const selectHostOnline = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.hostOnline);
const selectBroadcastEndedTimestamp = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.broadcastEndedTimestamp);
const selectBroadcastPaused = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectPeerState, state => state.broadcastPaused);

/***/ }),

/***/ 2513:
/*!*******************************************************************!*\
  !*** ./packages/client/src/app/selectors/recognition.selector.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recognitionActiveSelector": () => (/* binding */ recognitionActiveSelector),
/* harmony export */   "recognitionConnectedSelector": () => (/* binding */ recognitionConnectedSelector),
/* harmony export */   "recognitionErrorSelector": () => (/* binding */ recognitionErrorSelector),
/* harmony export */   "recognitionIdSelector": () => (/* binding */ recognitionIdSelector),
/* harmony export */   "recognitionPausedSelector": () => (/* binding */ recognitionPausedSelector),
/* harmony export */   "recognitionStatusSelector": () => (/* binding */ recognitionStatusSelector),
/* harmony export */   "selectRecognition": () => (/* binding */ selectRecognition)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 4307);
/* harmony import */ var _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/recognition.model */ 1088);


const selectRecognition = state => state.recognition;
const recognitionIdSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectRecognition, state => state.id);
const recognitionErrorSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectRecognition, state => state.error);
const recognitionStatusSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectRecognition, state => state.status);
const recognitionConnectedSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectRecognition, state => state.status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.connected);
const recognitionActiveSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectRecognition, state => state.status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.connected || state.status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.paused);
const recognitionPausedSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(selectRecognition, state => state.status === _models_recognition_model__WEBPACK_IMPORTED_MODULE_0__.RecognitionStatus.paused);

/***/ }),

/***/ 8783:
/*!****************************************************************!*\
  !*** ./packages/client/src/app/selectors/settings.selector.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "languageSelector": () => (/* binding */ languageSelector),
/* harmony export */   "selectAppSettings": () => (/* binding */ selectAppSettings),
/* harmony export */   "selectLineHeight": () => (/* binding */ selectLineHeight),
/* harmony export */   "selectTextFlow": () => (/* binding */ selectTextFlow),
/* harmony export */   "selectTextSize": () => (/* binding */ selectTextSize),
/* harmony export */   "themeSelector": () => (/* binding */ themeSelector),
/* harmony export */   "wakeLockEnabledSelector": () => (/* binding */ wakeLockEnabledSelector)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 4307);

const selectAppSettings = state => state.settings;
const themeSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAppSettings, state => state.theme);
const languageSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAppSettings, state => state.lang);
const wakeLockEnabledSelector = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAppSettings, state => state.wakeLock);
const selectTextSize = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAppSettings, state => state.textSize);
const selectLineHeight = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAppSettings, state => state.lineHeight);
const selectTextFlow = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAppSettings, state => state.textFlow);

/***/ }),

/***/ 9573:
/*!***************************************************************************!*\
  !*** ./packages/client/src/app/services/browser-compatibility.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowserCompatibilityService": () => (/* binding */ BrowserCompatibilityService)
/* harmony export */ });
/* harmony import */ var _models_app_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/app.model */ 4056);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ 5712);




class BrowserCompatibilityService {
  constructor(platform) {
    this.platform = platform;
  }
  checkCompatibility() {
    const rtn = {
      platform: _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.desktop
    };
    if (this.platform.FIREFOX || this.platform.EDGE) {
      rtn.platform = _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.unsupported;
      rtn.error = 'ERRORS.missingApi';
    } else {
      try {
        new webkitSpeechRecognition();
      } catch (e) {
        console.error(e);
        rtn.error = 'ERRORS.serviceUnavailable';
      }
    }
    if (this.platform.ANDROID || this.platform.IOS) {
      rtn.platform = _models_app_model__WEBPACK_IMPORTED_MODULE_0__.AppPlatform.mobile;
      rtn.warning = 'ERRORS.liveTextMissing';
    }
    return rtn;
  }
}
BrowserCompatibilityService.ɵfac = function BrowserCompatibilityService_Factory(t) {
  return new (t || BrowserCompatibilityService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.Platform));
};
BrowserCompatibilityService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: BrowserCompatibilityService,
  factory: BrowserCompatibilityService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 4359:
/*!*****************************************************************************!*\
  !*** ./packages/client/src/app/services/full-screen/full-screen.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullScreenService": () => (/* binding */ FullScreenService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);


class FullScreenService {
  constructor() {
    this.isAvailable = document.fullscreenEnabled;
    this.isFullscreen = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)(document.fullscreenElement !== null);
  }
  registerElement(el) {
    this.el = el;
    this.el.nativeElement.onfullscreenchange = () => {
      this.isFullscreen.set(document.fullscreenElement !== null);
    };
  }
  deregisterElement() {
    if (this.el) {
      this.el.nativeElement.onfullscreenchange = null;
    }
    this.el = undefined;
  }
  toggle() {
    if (!this.el) {
      throw new Error('No element registered for full screen');
    }
    if (this.isAvailable) {
      if (this.isFullscreen()) {
        this._minimize();
      } else {
        this._maximize();
      }
    }
  }
  _maximize() {
    this.el?.nativeElement.requestFullscreen();
  }
  _minimize() {
    document.exitFullscreen();
  }
}
FullScreenService.ɵfac = function FullScreenService_Factory(t) {
  return new (t || FullScreenService)();
};
FullScreenService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: FullScreenService,
  factory: FullScreenService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 9773:
/*!*************************************************************!*\
  !*** ./packages/client/src/app/services/storage.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageService": () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class StorageService {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error(`Failed to retrieve from storage: ${e.message}`);
      return {};
    }
  }
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to set in storage: ${key}, ${value}`);
    }
  }
  update(key, property, value) {
    const fromStorage = this.get(key) || {};
    fromStorage[property] = value;
    this.set(key, fromStorage);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
StorageService.ɵfac = function StorageService_Factory(t) {
  return new (t || StorageService)();
};
StorageService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: StorageService,
  factory: StorageService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 3031:
/*!***************************************************************!*\
  !*** ./packages/client/src/app/services/wake-lock.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WakeLockService": () => (/* binding */ WakeLockService)
/* harmony export */ });
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 188);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9346);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 3158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectors/settings.selector */ 8783);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngrx/store */ 4307);







class WakeLockService {
  constructor(store) {
    this.store = store;
    this.lockEnabled = (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_1__.toSignal)(this.store.select(_selectors_settings_selector__WEBPACK_IMPORTED_MODULE_0__.wakeLockEnabledSelector));
  }
  requestLock() {
    if (this.lockEnabled()) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(navigator.wakeLock.request('screen')).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(sentinel => {
        this.sentinel = sentinel;
        return true;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(false)));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(false);
  }
  releaseLock() {
    if (this.sentinel) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.from)(this.sentinel.release()).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(() => true), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(false)));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(true);
  }
}
WakeLockService.ɵfac = function WakeLockService_Factory(t) {
  return new (t || WakeLockService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_7__.Store));
};
WakeLockService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: WakeLockService,
  factory: WakeLockService.ɵfac,
  providedIn: 'root'
});


/***/ }),

/***/ 1378:
/*!*********************************************************!*\
  !*** ./packages/client/src/app/services/worker.util.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWorker": () => (/* binding */ getWorker)
/* harmony export */ });
// Constructor split out to fix issue with Jest unit tests
// https://medium.com/razroo/import-meta-url-and-jest-e8bff359b7c4
const getWorker = () => {
  return new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("packages_client_src_app_modules_media_workers_recognition-history_worker_ts"), __webpack_require__.b)));
};

/***/ }),

/***/ 8624:
/*!*************************************!*\
  !*** ./packages/client/src/main.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 2512);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 4688);
/// <reference types="@angular/localize" />


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 4367:
/*!*********************************************************!*\
  !*** ./packages/shared-ui/src/lib/pipes/proper.pipe.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProperPipe": () => (/* binding */ ProperPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class ProperPipe {
  transform(value, ...args) {
    return value?.length ? value[0].toUpperCase() + value.slice(1).toLowerCase() : value;
  }
}
ProperPipe.ɵfac = function ProperPipe_Factory(t) {
  return new (t || ProperPipe)();
};
ProperPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
  name: "proper",
  type: ProperPipe,
  pure: true
});


/***/ }),

/***/ 5543:
/*!********************************************************!*\
  !*** ./packages/shared-ui/src/lib/shared-ui.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedUiModule": () => (/* binding */ SharedUiModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipes/proper.pipe */ 4367);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);



class SharedUiModule {}
SharedUiModule.ɵfac = function SharedUiModule_Factory(t) {
  return new (t || SharedUiModule)();
};
SharedUiModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: SharedUiModule
});
SharedUiModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SharedUiModule, {
    declarations: [_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_2__.ProperPipe],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
    exports: [_pipes_proper_pipe__WEBPACK_IMPORTED_MODULE_2__.ProperPipe]
  });
})();

/***/ }),

/***/ 4323:
/*!*******************************************************!*\
  !*** ./packages/shared-ui/src/lib/vectors/vectors.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cookie": () => (/* binding */ cookie),
/* harmony export */   "discordLogo": () => (/* binding */ discordLogo),
/* harmony export */   "githubLogo": () => (/* binding */ githubLogo),
/* harmony export */   "heroArrowLeft": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowLeft),
/* harmony export */   "heroArrowLongDown": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowLongDown),
/* harmony export */   "heroArrowLongUp": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowLongUp),
/* harmony export */   "heroArrowPath": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowPath),
/* harmony export */   "heroArrowRight": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowRight),
/* harmony export */   "heroArrowTopRightOnSquare": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowTopRightOnSquare),
/* harmony export */   "heroArrowsPointingIn": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowsPointingIn),
/* harmony export */   "heroArrowsPointingOut": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroArrowsPointingOut),
/* harmony export */   "heroBars3": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroBars3),
/* harmony export */   "heroCheck": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroCheck),
/* harmony export */   "heroCheckCircle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroCheckCircle),
/* harmony export */   "heroChevronLeft": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroChevronLeft),
/* harmony export */   "heroExclamationTriangle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroExclamationTriangle),
/* harmony export */   "heroMicrophone": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroMicrophone),
/* harmony export */   "heroMicrophoneSlash": () => (/* binding */ heroMicrophoneSlash),
/* harmony export */   "heroMinusCircle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroMinusCircle),
/* harmony export */   "heroPause": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroPause),
/* harmony export */   "heroPauseCircle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroPauseCircle),
/* harmony export */   "heroPlayCircle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroPlayCircle),
/* harmony export */   "heroPlayPause": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroPlayPause),
/* harmony export */   "heroPlusCircle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroPlusCircle),
/* harmony export */   "heroSignalSlash": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroSignalSlash),
/* harmony export */   "heroStopCircle": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroStopCircle),
/* harmony export */   "heroXMark": () => (/* reexport safe */ _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__.heroXMark),
/* harmony export */   "tablerBuildingBroadcastTower": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerBuildingBroadcastTower),
/* harmony export */   "tablerLineHeight": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerLineHeight),
/* harmony export */   "tablerMinus": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerMinus),
/* harmony export */   "tablerPlus": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerPlus),
/* harmony export */   "tablerSpacingVertical": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerSpacingVertical),
/* harmony export */   "tablerTextDecrease": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerTextDecrease),
/* harmony export */   "tablerTextIncrease": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerTextIncrease),
/* harmony export */   "tablerTextSize": () => (/* reexport safe */ _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__.tablerTextSize),
/* harmony export */   "zipCaptionsLogo": () => (/* binding */ zipCaptionsLogo)
/* harmony export */ });
/* harmony import */ var _ng_icons_heroicons_outline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ng-icons/heroicons/outline */ 4535);
/* harmony import */ var _ng_icons_tabler_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-icons/tabler-icons */ 6900);
// Base icon vector set that's in use in the app


// Custom vectors to add
const heroMicrophoneSlash = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" aria-hidden=\"true\" style=\"width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 1.5)\"> <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19 19L17.591 17.591L5.409 5.409L4 4\"/> <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18.75C13.5913 18.75 15.1174 18.1179 16.2426 16.9926C17.3679 15.8674 18 14.3413 18 12.75V11.25M12 18.75C10.4087 18.75 8.88258 18.1179 7.75736 16.9926C6.63214 15.8674 6 14.3413 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C11.2044 15.75 10.4413 15.4339 9.87868 14.8713C9.31607 14.3087 9 13.5456 9 12.75V4.5C9 3.70435 9.31607 2.94129 9.87868 2.37868C10.4413 1.81607 11.2044 1.5 12 1.5C12.7956 1.5 13.5587 1.81607 14.1213 2.37868C14.6839 2.94129 15 3.70435 15 4.5V12.75C15 13.5456 14.6839 14.3087 14.1213 14.8713C13.5587 15.4339 12.7956 15.75 12 15.75Z\"/></svg>";
const zipCaptionsLogo = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 437.48 439.23\"><defs><style>.cls-1 {fill: #fff;}</style></defs><path class=\"cls-1\" d=\"m0,0h437.48v439.23H0V0Zm5.2,433.83h426.75V5.73H5.2v428.1Z\"/><path class=\"cls-1\" d=\"m192.01,182.27c-.97-2.62-1.51-4.32-2.21-5.95-15.96-37.35-31.96-74.69-47.91-112.04-4.4-10.31-.58-16.04,10.68-16.05,38.65-.02,77.31-.02,115.96,0,8.39,0,11.16,2.21,13.39,10.33,16.96,61.72,33.94,123.43,50.89,185.15,2.41,8.76-1.26,13.56-10.25,13.64-1.17,0-2.33,0-3.5,0-18.66,0-37.32,0-55.98,0h-6.63c.78,3.02,1.24,5.23,1.92,7.37,12.1,37.69,24.2,75.38,36.38,113.05,1.22,3.79,1.62,7.65-1.72,10.04-2.3,1.65-5.82,2.59-8.61,2.27-2.24-.26-4.51-2.62-6.24-4.53-24.8-27.44-49.5-54.96-74.23-82.46-31.08-34.56-62.17-69.11-93.24-103.68-1.11-1.23-2.26-2.49-3.07-3.92-2.93-5.19-.45-11.13,5.35-12.53,2.39-.58,4.95-.67,7.43-.67,21.66-.05,43.32-.03,64.98-.03,1.93,0,3.86,0,6.61,0Zm22.27-119.9c-15.82,0-31.65,0-47.47,0-1.5,0-3.28-.37-4.41.31-1.5.9-3.54,2.73-3.44,4.01.12,1.62,1.87,3.73,3.46,4.47,1.82.85,4.23.55,6.39.55,28.98.03,57.97.1,86.95-.06,4.35-.02,6.57,1.19,7.77,5.61,11.96,44.12,24.11,88.19,36.21,132.28,2.64,9.62,5.32,19.22,7.96,28.84.83,3.03,2.32,5.49,5.88,4.59,3.47-.87,4.02-3.56,3.03-6.72-.2-.63-.24-1.31-.42-1.95-15.2-55.15-30.45-110.3-45.54-165.48-1.27-4.65-3.54-6.57-8.38-6.52-15.99.18-31.98.07-47.97.07Zm-47.71,133.97c-9.49,0-18.98.04-28.46-.02-3.16-.02-6.01.7-6.02,4.34,0,3.55,2.76,4.54,5.94,4.54,18.81,0,37.62,0,56.43,0,3.12,0,5.88-.71,5.93-4.45.05-3.81-2.72-4.43-5.85-4.42-9.32.04-18.64.01-27.97.01Zm102.35,146.69c-.72-2.58-1.11-4.19-1.61-5.76-4.75-14.87-9.5-29.75-14.29-44.61-.46-1.41-.76-3.22-1.78-4.02-1.38-1.09-3.87-2.35-5.01-1.79-1.48.73-2.36,3.11-3,4.95-.31.9.49,2.21.84,3.32,4.82,15.02,9.64,30.04,14.47,45.05.46,1.42.64,3.2,1.6,4.12,1.29,1.23,3.41,2.7,4.82,2.39,1.6-.34,2.82-2.52,3.95-3.65Z\"/></svg>";
const githubLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 96 96\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z\" fill=\"currentColor\"/></svg>";
const discordLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -16 128 128\"><defs><style>.cls-1{fill:currentColor;}</style></defs><g id=\"图层_2\" data-name=\"图层 2\"><g id=\"Discord_Logos\" data-name=\"Discord Logos\"><g id=\"Discord_Logo_-_Large_-_White\" data-name=\"Discord Logo - Large - White\"><path class=\"cls-1\" d=\"M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z\"/></g></g></g></svg>";
const cookie = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 -1 8.4666 10.58325\" stroke=\"currentColor\" aria-hidden=\"true\" style=\"width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);stroke-width:var(--ng-icon__stroke-width, 1.5)\"><g><path d=\"M3.9066 0.4622c-0.0348,0.1659 -0.0413,0.3368 -0.0185,0.505 0.0224,0.166 0.0738,0.3306 0.1544,0.4855 0.1338,0.2571 0.3365,0.4636 0.5779,0.602 0.2418,0.1386 0.5227,0.2094 0.8122,0.1951 0.0698,-0.0033 0.1292,0.0507 0.1325,0.1205l0.0001 0.0102c0.003,0.2198 0.0665,0.4306 0.1777,0.612 0.1118,0.1821 0.2725,0.3347 0.4697,0.4372 0.0257,0.0133 0.0449,0.0343 0.0563,0.0586 0.1158,0.2167 0.2746,0.404 0.4636,0.552 0.1904,0.1492 0.4126,0.259 0.6532,0.3193 0.1057,0.0264 0.2125,0.0429 0.3187,0.0493 0.1074,0.0064 0.2158,0.0029 0.3235,-0.0105 0.0695,-0.0085 0.1329,0.0411 0.1414,0.1106 0.0013,0.0102 0.0012,0.0203 0.0001,0.0301 -0.0815,1.0172 -0.5494,1.9258 -1.2566,2.5786 -0.7028,0.6486 -1.6421,1.0451 -2.6735,1.0451 -1.0888,0 -2.0747,-0.4414 -2.7881,-1.1549 -0.7135,-0.7134 -1.1549,-1.6993 -1.1549,-2.7881 0,-1.0029 0.375,-1.9187 0.9922,-2.6148 0.6245,-0.7041 1.4971,-1.1834 2.4803,-1.3003 0.0695,-0.0082 0.1327,0.0416 0.1409,0.1111 0.0019,0.016 0.0007,0.0316 -0.0031,0.0464zm1.1414 6.7241c0.1024,0 0.1855,0.083 0.1855,0.1854 0,0.1024 -0.0831,0.1854 -0.1855,0.1854 -0.1023,0 -0.1854,-0.083 -0.1854,-0.1854 0,-0.1024 0.0831,-0.1854 0.1854,-0.1854zm-1.2323 -5.5519c0.0135,0 0.0267,0.0016 0.0395,0.0043 -0.0131,-0.0226 -0.0258,-0.0457 -0.0379,-0.069 -0.0939,-0.1804 -0.1538,-0.373 -0.1802,-0.5687 -0.0189,-0.1398 -0.0207,-0.2812 -0.0056,-0.4205 -0.8519,0.1411 -1.6051,0.5739 -2.1534,1.1921 -0.5772,0.6509 -0.9278,1.508 -0.9278,2.4472 0,1.0187 0.413,1.9411 1.0805,2.6085 0.6674,0.6675 1.5898,1.0805 2.6085,1.0805 0.9655,0 1.8444,-0.3709 2.5019,-0.9777 0.6277,-0.5793 1.0537,-1.3745 1.1607,-2.2675 -0.0703,0.0031 -0.1413,0.0026 -0.2123,-0.0017 -0.1226,-0.0073 -0.2452,-0.0262 -0.3655,-0.0563 -0.2746,-0.0688 -0.5288,-0.1946 -0.7474,-0.3659 -0.2084,-0.1632 -0.3846,-0.3677 -0.5157,-0.6034 -0.2225,-0.1235 -0.405,-0.3012 -0.5343,-0.5118 -0.1138,-0.1857 -0.1862,-0.3973 -0.2078,-0.62 -0.2942,-0.0067 -0.577,-0.0877 -0.8245,-0.2296 -0.189,-0.1083 -0.3577,-0.2522 -0.4956,-0.4256 -0.0142,0.0884 -0.0907,0.156 -0.1831,0.156 -0.1024,0 -0.1854,-0.0831 -0.1854,-0.1855 0,-0.1023 0.083,-0.1854 0.1854,-0.1854zm-0.2184 1.6032c0.1024,0 0.1855,0.0831 0.1855,0.1855 0,0.1023 -0.0831,0.1854 -0.1855,0.1854 -0.1023,0 -0.1854,-0.0831 -0.1854,-0.1854 0,-0.1024 0.0831,-0.1855 0.1854,-0.1855zm1.1547 2.2128c0.1023,0 0.1854,0.0831 0.1854,0.1855 0,0.1023 -0.0831,0.1854 -0.1854,0.1854 -0.1024,0 -0.1855,-0.0831 -0.1855,-0.1854 0,-0.1024 0.0831,-0.1855 0.1855,-0.1855zm-2.679 0.2385c0.1024,0 0.1855,0.0831 0.1855,0.1854 0,0.1024 -0.0831,0.1855 -0.1855,0.1855 -0.1023,0 -0.1854,-0.0831 -0.1854,-0.1855 0,-0.1023 0.0831,-0.1854 0.1854,-0.1854zm1.7427 0.1783c0.1465,0 0.2793,0.0595 0.3753,0.1555 0.096,0.096 0.1555,0.2288 0.1555,0.3753 0,0.1465 -0.0595,0.2793 -0.1555,0.3753 -0.096,0.096 -0.2288,0.1555 -0.3753,0.1555 -0.1465,0 -0.2793,-0.0595 -0.3753,-0.1555 -0.096,-0.096 -0.1555,-0.2288 -0.1555,-0.3753 0,-0.1465 0.0595,-0.2793 0.1555,-0.3753l0.008 -0.0074c0.0955,-0.0916 0.2251,-0.1481 0.3673,-0.1481zm0.1957 0.3351c-0.05,-0.05 -0.1193,-0.0811 -0.1957,-0.0811 -0.074,0 -0.1411,0.0287 -0.1903,0.0753l-0.0054 0.0058c-0.05,0.05 -0.0811,0.1193 -0.0811,0.1957 0,0.0764 0.0311,0.1457 0.0811,0.1957 0.05,0.05 0.1193,0.0811 0.1957,0.0811 0.0764,0 0.1457,-0.0311 0.1957,-0.0811 0.05,-0.05 0.0811,-0.1193 0.0811,-0.1957 0,-0.0764 -0.0311,-0.1457 -0.0811,-0.1957zm2.2221 -1.0379c0.1298,0 0.2476,0.0529 0.3329,0.1381 0.0857,0.0852 0.1386,0.2032 0.1386,0.3333 0,0.1298 -0.0529,0.2476 -0.1381,0.3329 -0.0858,0.0857 -0.2036,0.1386 -0.3334,0.1386 -0.1301,0 -0.2481,-0.0529 -0.3333,-0.1381l-0.0074 -0.0081c-0.0809,-0.0846 -0.1307,-0.1993 -0.1307,-0.3253 0,-0.1301 0.0529,-0.2481 0.1381,-0.3333 0.0852,-0.0852 0.2032,-0.1381 0.3333,-0.1381zm0.1539 0.3176c-0.0391,-0.0392 -0.0937,-0.0636 -0.1539,-0.0636 -0.06,0 -0.1144,0.0244 -0.1537,0.0637 -0.0393,0.0393 -0.0637,0.0937 -0.0637,0.1537 0,0.0576 0.0223,0.11 0.0584,0.1488l0.0053 0.005c0.0393,0.0393 0.0937,0.0637 0.1537,0.0637 0.0602,0 0.1148,-0.0244 0.154,-0.0635 0.0391,-0.0392 0.0635,-0.0938 0.0635,-0.154 0,-0.06 -0.0244,-0.1144 -0.0636,-0.1538zm-1.8918 -1.3892c0.1058,0 0.2017,0.043 0.271,0.1123 0.0693,0.0693 0.1123,0.1653 0.1123,0.271 0,0.1058 -0.043,0.2017 -0.1123,0.271 -0.0693,0.0693 -0.1652,0.1123 -0.271,0.1123 -0.1057,0 -0.2017,-0.043 -0.271,-0.1123 -0.0693,-0.0693 -0.1123,-0.1652 -0.1123,-0.271 0,-0.1057 0.043,-0.2017 0.1123,-0.271 0.0693,-0.0693 0.1653,-0.1123 0.271,-0.1123zm0.0914 0.2919c-0.0234,-0.0234 -0.0557,-0.0379 -0.0914,-0.0379 -0.0355,0 -0.068,0.0145 -0.0914,0.0379 -0.0234,0.0234 -0.0379,0.0559 -0.0379,0.0914 0,0.0357 0.0145,0.068 0.0379,0.0914 0.0234,0.0234 0.0559,0.0379 0.0914,0.0379 0.0357,0 0.068,-0.0145 0.0914,-0.0379 0.0234,-0.0234 0.0379,-0.0557 0.0379,-0.0914 0,-0.0355 -0.0145,-0.068 -0.0379,-0.0914zm-2.3152 -0.7839c0.163,0 0.3109,0.0662 0.4177,0.173 0.1068,0.1068 0.173,0.2546 0.173,0.4177 0,0.1627 -0.0662,0.3104 -0.173,0.4173 -0.1068,0.1073 -0.2547,0.1735 -0.4177,0.1735 -0.163,0 -0.3109,-0.0662 -0.4177,-0.173l-0.0073 -0.0079c-0.1025,-0.1063 -0.1657,-0.2509 -0.1657,-0.4099 0,-0.1631 0.0662,-0.3109 0.173,-0.4177 0.1068,-0.1068 0.2546,-0.173 0.4177,-0.173zm0.2381 0.3526c-0.0608,-0.0608 -0.1452,-0.0986 -0.2381,-0.0986 -0.093,0 -0.1773,0.0378 -0.2381,0.0986 -0.0608,0.0608 -0.0986,0.1451 -0.0986,0.2381 0,0.0903 0.0353,0.1724 0.0929,0.2328l0.0057 0.0054c0.0608,0.0608 0.1452,0.0986 0.2381,0.0986 0.0929,0 0.1773,-0.0378 0.2381,-0.0986 0.061,-0.0606 0.0986,-0.145 0.0986,-0.2382 0,-0.093 -0.0378,-0.1773 -0.0986,-0.2381zm-0.0659 -2.0751c0.1297,0 0.2476,0.0529 0.333,0.1384 0.0855,0.0849 0.1384,0.2029 0.1384,0.333 0,0.1297 -0.0529,0.2475 -0.1381,0.3329 -0.0852,0.0857 -0.2032,0.1386 -0.3333,0.1386 -0.1298,0 -0.2476,-0.0529 -0.3329,-0.1381 -0.0857,-0.0859 -0.1386,-0.2037 -0.1386,-0.3334 0,-0.1301 0.0529,-0.2481 0.1381,-0.3333l0.0081 -0.0074c0.0846,-0.0809 0.1993,-0.1307 0.3253,-0.1307zm0.1537 0.3174c-0.0389,-0.0391 -0.0933,-0.0634 -0.1537,-0.0634 -0.0576,0 -0.11,0.0223 -0.1488,0.0584l-0.005 0.0053c-0.0393,0.0393 -0.0637,0.0937 -0.0637,0.1537 0,0.0602 0.0244,0.1148 0.0635,0.154 0.0392,0.0391 0.0938,0.0635 0.154,0.0635 0.06,0 0.1144,-0.0244 0.1537,-0.0637 0.0393,-0.039 0.0637,-0.0936 0.0637,-0.1538 0,-0.06 -0.0244,-0.1144 -0.0637,-0.154z\"/></g></svg>";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(8624)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map