/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/workbox-core/_private/Deferred.js":
/*!********************************************************!*\
  !*** ./node_modules/workbox-core/_private/Deferred.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deferred: () => (/* binding */ Deferred)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
    /**
     * Creates a promise and exposes its resolve and reject functions as methods.
     */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/WorkboxError.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-core/_private/WorkboxError.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkboxError: () => (/* binding */ WorkboxError)
/* harmony export */ });
/* harmony import */ var _models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/messages/messageGenerator.js */ "./node_modules/workbox-core/models/messages/messageGenerator.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
    /**
     *
     * @param {string} errorCode The error code that
     * identifies this particular error.
     * @param {Object=} details Any relevant arguments
     * that will help developers identify issues should
     * be added as a key on the context object.
     */
    constructor(errorCode, details) {
        const message = (0,_models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__.messageGenerator)(errorCode, details);
        super(message);
        this.name = errorCode;
        this.details = details;
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/assert.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/assert.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ finalAssertExports)
/* harmony export */ });
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
    if (!Array.isArray(value)) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-an-array', details);
    }
};
const hasMethod = (object, expectedMethod, details) => {
    const type = typeof object[expectedMethod];
    if (type !== 'function') {
        details['expectedMethod'] = expectedMethod;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('missing-a-method', details);
    }
};
const isType = (object, expectedType, details) => {
    if (typeof object !== expectedType) {
        details['expectedType'] = expectedType;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-type', details);
    }
};
const isInstance = (object, 
// Need the general type to do the check later.
// eslint-disable-next-line @typescript-eslint/ban-types
expectedClass, details) => {
    if (!(object instanceof expectedClass)) {
        details['expectedClassName'] = expectedClass.name;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-class', details);
    }
};
const isOneOf = (value, validValues, details) => {
    if (!validValues.includes(value)) {
        details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('invalid-value', details);
    }
};
const isArrayOfClass = (value, 
// Need general type to do check later.
expectedClass, // eslint-disable-line
details) => {
    const error = new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-array-of-class', details);
    if (!Array.isArray(value)) {
        throw error;
    }
    for (const item of value) {
        if (!(item instanceof expectedClass)) {
            throw error;
        }
    }
};
const finalAssertExports =  false
    ? 0
    : {
        hasMethod,
        isArray,
        isInstance,
        isOneOf,
        isType,
        isArrayOfClass,
    };



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheMatchIgnoreParams: () => (/* binding */ cacheMatchIgnoreParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
        strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */
async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    // If the request doesn't include any ignored params, match as normal.
    if (request.url === strippedRequestURL) {
        return cache.match(request, matchOptions);
    }
    // Otherwise, match by comparing keys
    const keysOptions = Object.assign(Object.assign({}, matchOptions), { ignoreSearch: true });
    const cacheKeys = await cache.keys(request, keysOptions);
    for (const cacheKey of cacheKeys) {
        const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
        if (strippedRequestURL === strippedCacheKeyURL) {
            return cache.match(cacheKey, matchOptions);
        }
    }
    return;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheNames.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheNames.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheNames: () => (/* binding */ cacheNames)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const _cacheNameDetails = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: typeof registration !== 'undefined' ? registration.scope : '',
};
const _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix]
        .filter((value) => value && value.length > 0)
        .join('-');
};
const eachCacheNameDetail = (fn) => {
    for (const key of Object.keys(_cacheNameDetails)) {
        fn(key);
    }
};
const cacheNames = {
    updateDetails: (details) => {
        eachCacheNameDetail((key) => {
            if (typeof details[key] === 'string') {
                _cacheNameDetails[key] = details[key];
            }
        });
    },
    getGoogleAnalyticsName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
    },
    getPrecacheName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.precache);
    },
    getPrefix: () => {
        return _cacheNameDetails.prefix;
    },
    getRuntimeName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.runtime);
    },
    getSuffix: () => {
        return _cacheNameDetails.suffix;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canConstructResponseFromBodyStream: () => (/* binding */ canConstructResponseFromBodyStream)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let supportStatus;
/**
 * A utility function that determines whether the current browser supports
 * constructing a new `Response` from a `response.body` stream.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `Response` from a `response.body` stream, `false` otherwise.
 *
 * @private
 */
function canConstructResponseFromBodyStream() {
    if (supportStatus === undefined) {
        const testResponse = new Response('');
        if ('body' in testResponse) {
            try {
                new Response(testResponse.body);
                supportStatus = true;
            }
            catch (error) {
                supportStatus = false;
            }
        }
        supportStatus = false;
    }
    return supportStatus;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js":
/*!**************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeQuotaErrorCallbacks: () => (/* binding */ executeQuotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/quotaErrorCallbacks.js */ "./node_modules/workbox-core/models/quotaErrorCallbacks.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(`About to run ${_models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks.size} ` +
            `callbacks to clean up caches.`);
    }
    for (const callback of _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks) {
        await callback();
        if (true) {
            _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(callback, 'is complete.');
        }
    }
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log('Finished running callbacks.');
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/getFriendlyURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-core/_private/getFriendlyURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFriendlyURL: () => (/* binding */ getFriendlyURL)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const getFriendlyURL = (url) => {
    const urlObj = new URL(String(url), location.href);
    // See https://github.com/GoogleChrome/workbox/issues/2323
    // We want to include everything, except for the origin if it's same-origin.
    return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};



/***/ }),

/***/ "./node_modules/workbox-core/_private/logger.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/logger.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const logger = ( false
    ? 0
    : (() => {
        // Don't overwrite this value if it's already set.
        // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
        if (!('__WB_DISABLE_DEV_LOGS' in globalThis)) {
            self.__WB_DISABLE_DEV_LOGS = false;
        }
        let inGroup = false;
        const methodToColorMap = {
            debug: `#7f8c8d`,
            log: `#2ecc71`,
            warn: `#f39c12`,
            error: `#c0392b`,
            groupCollapsed: `#3498db`,
            groupEnd: null, // No colored prefix on groupEnd
        };
        const print = function (method, args) {
            if (self.__WB_DISABLE_DEV_LOGS) {
                return;
            }
            if (method === 'groupCollapsed') {
                // Safari doesn't print all console.groupCollapsed() arguments:
                // https://bugs.webkit.org/show_bug.cgi?id=182754
                if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                    console[method](...args);
                    return;
                }
            }
            const styles = [
                `background: ${methodToColorMap[method]}`,
                `border-radius: 0.5em`,
                `color: white`,
                `font-weight: bold`,
                `padding: 2px 0.5em`,
            ];
            // When in a group, the workbox prefix is not displayed.
            const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
            console[method](...logPrefix, ...args);
            if (method === 'groupCollapsed') {
                inGroup = true;
            }
            if (method === 'groupEnd') {
                inGroup = false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/ban-types
        const api = {};
        const loggerMethods = Object.keys(methodToColorMap);
        for (const key of loggerMethods) {
            const method = key;
            api[method] = (...args) => {
                print(method, args);
            };
        }
        return api;
    })());



/***/ }),

/***/ "./node_modules/workbox-core/_private/timeout.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-core/_private/timeout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timeout: () => (/* binding */ timeout)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/***/ }),

/***/ "./node_modules/workbox-core/_private/waitUntil.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-core/_private/waitUntil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   waitUntil: () => (/* binding */ waitUntil)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
function waitUntil(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
}



/***/ }),

/***/ "./node_modules/workbox-core/_version.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-core/_version.js ***!
  \***********************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:core:7.2.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-core/copyResponse.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-core/copyResponse.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyResponse: () => (/* binding */ copyResponse)
/* harmony export */ });
/* harmony import */ var _private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_private/canConstructResponseFromBodyStream.js */ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js");
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Allows developers to copy a response and modify its `headers`, `status`,
 * or `statusText` values (the values settable via a
 * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
 * object in the constructor).
 * To modify these values, pass a function as the second argument. That
 * function will be invoked with a single object with the response properties
 * `{headers, status, statusText}`. The return value of this function will
 * be used as the `ResponseInit` for the new `Response`. To change the values
 * either modify the passed parameter(s) and return it, or return a totally
 * new object.
 *
 * This method is intentionally limited to same-origin responses, regardless of
 * whether CORS was used or not.
 *
 * @param {Response} response
 * @param {Function} modifier
 * @memberof workbox-core
 */
async function copyResponse(response, modifier) {
    let origin = null;
    // If response.url isn't set, assume it's cross-origin and keep origin null.
    if (response.url) {
        const responseURL = new URL(response.url);
        origin = responseURL.origin;
    }
    if (origin !== self.location.origin) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('cross-origin-copy-response', { origin });
    }
    const clonedResponse = response.clone();
    // Create a fresh `ResponseInit` object by cloning the headers.
    const responseInit = {
        headers: new Headers(clonedResponse.headers),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
    };
    // Apply any user modifications.
    const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
    // Create the new response from the body stream and `ResponseInit`
    // modifications. Note: not all browsers support the Response.body stream,
    // so fall back to reading the entire body into memory as a blob.
    const body = (0,_private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__.canConstructResponseFromBodyStream)()
        ? clonedResponse.body
        : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
}



/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messageGenerator.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messageGenerator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messageGenerator: () => (/* binding */ messageGenerator)
/* harmony export */ });
/* harmony import */ var _messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages.js */ "./node_modules/workbox-core/models/messages/messages.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


const fallback = (code, ...args) => {
    let msg = code;
    if (args.length > 0) {
        msg += ` :: ${JSON.stringify(args)}`;
    }
    return msg;
};
const generatorFunction = (code, details = {}) => {
    const message = _messages_js__WEBPACK_IMPORTED_MODULE_0__.messages[code];
    if (!message) {
        throw new Error(`Unable to find message for code '${code}'.`);
    }
    return message(details);
};
const messageGenerator =  false ? 0 : generatorFunction;


/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messages.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messages.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messages: () => (/* binding */ messages)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const messages = {
    'invalid-value': ({ paramName, validValueDescription, value }) => {
        if (!paramName || !validValueDescription) {
            throw new Error(`Unexpected input to 'invalid-value' error.`);
        }
        return (`The '${paramName}' parameter was given a value with an ` +
            `unexpected value. ${validValueDescription} Received a value of ` +
            `${JSON.stringify(value)}.`);
    },
    'not-an-array': ({ moduleName, className, funcName, paramName }) => {
        if (!moduleName || !className || !funcName || !paramName) {
            throw new Error(`Unexpected input to 'not-an-array' error.`);
        }
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${className}.${funcName}()' must be an array.`);
    },
    'incorrect-type': ({ expectedType, paramName, moduleName, className, funcName, }) => {
        if (!expectedType || !paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-type' error.`);
        }
        const classNameStr = className ? `${className}.` : '';
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${classNameStr}` +
            `${funcName}()' must be of type ${expectedType}.`);
    },
    'incorrect-class': ({ expectedClassName, paramName, moduleName, className, funcName, isReturnValueProblem, }) => {
        if (!expectedClassName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-class' error.`);
        }
        const classNameStr = className ? `${className}.` : '';
        if (isReturnValueProblem) {
            return (`The return value from ` +
                `'${moduleName}.${classNameStr}${funcName}()' ` +
                `must be an instance of class ${expectedClassName}.`);
        }
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${classNameStr}${funcName}()' ` +
            `must be an instance of class ${expectedClassName}.`);
    },
    'missing-a-method': ({ expectedMethod, paramName, moduleName, className, funcName, }) => {
        if (!expectedMethod ||
            !paramName ||
            !moduleName ||
            !className ||
            !funcName) {
            throw new Error(`Unexpected input to 'missing-a-method' error.`);
        }
        return (`${moduleName}.${className}.${funcName}() expected the ` +
            `'${paramName}' parameter to expose a '${expectedMethod}' method.`);
    },
    'add-to-cache-list-unexpected-type': ({ entry }) => {
        return (`An unexpected entry was passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` +
            `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` +
            `strings with one or more characters, objects with a url property or ` +
            `Request objects.`);
    },
    'add-to-cache-list-conflicting-entries': ({ firstEntry, secondEntry }) => {
        if (!firstEntry || !secondEntry) {
            throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
        }
        return (`Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${firstEntry} but different revision details. Workbox is ` +
            `unable to cache and version the asset correctly. Please remove one ` +
            `of the entries.`);
    },
    'plugin-error-request-will-fetch': ({ thrownErrorMessage }) => {
        if (!thrownErrorMessage) {
            throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
        }
        return (`An error was thrown by a plugins 'requestWillFetch()' method. ` +
            `The thrown error message was: '${thrownErrorMessage}'.`);
    },
    'invalid-cache-name': ({ cacheNameId, value }) => {
        if (!cacheNameId) {
            throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
        }
        return (`You must provide a name containing at least one character for ` +
            `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` +
            `'${JSON.stringify(value)}'`);
    },
    'unregister-route-but-not-found-with-method': ({ method }) => {
        if (!method) {
            throw new Error(`Unexpected input to ` +
                `'unregister-route-but-not-found-with-method' error.`);
        }
        return (`The route you're trying to unregister was not  previously ` +
            `registered for the method type '${method}'.`);
    },
    'unregister-route-route-not-registered': () => {
        return (`The route you're trying to unregister was not previously ` +
            `registered.`);
    },
    'queue-replay-failed': ({ name }) => {
        return `Replaying the background sync queue '${name}' failed.`;
    },
    'duplicate-queue-name': ({ name }) => {
        return (`The Queue name '${name}' is already being used. ` +
            `All instances of backgroundSync.Queue must be given unique names.`);
    },
    'expired-test-without-max-age': ({ methodName, paramName }) => {
        return (`The '${methodName}()' method can only be used when the ` +
            `'${paramName}' is used in the constructor.`);
    },
    'unsupported-route-type': ({ moduleName, className, funcName, paramName }) => {
        return (`The supplied '${paramName}' parameter was an unsupported type. ` +
            `Please check the docs for ${moduleName}.${className}.${funcName} for ` +
            `valid input types.`);
    },
    'not-array-of-class': ({ value, expectedClass, moduleName, className, funcName, paramName, }) => {
        return (`The supplied '${paramName}' parameter must be an array of ` +
            `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` +
            `Please check the call to ${moduleName}.${className}.${funcName}() ` +
            `to fix the issue.`);
    },
    'max-entries-or-age-required': ({ moduleName, className, funcName }) => {
        return (`You must define either config.maxEntries or config.maxAgeSeconds` +
            `in ${moduleName}.${className}.${funcName}`);
    },
    'statuses-or-headers-required': ({ moduleName, className, funcName }) => {
        return (`You must define either config.statuses or config.headers` +
            `in ${moduleName}.${className}.${funcName}`);
    },
    'invalid-string': ({ moduleName, funcName, paramName }) => {
        if (!paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'invalid-string' error.`);
        }
        return (`When using strings, the '${paramName}' parameter must start with ` +
            `'http' (for cross-origin matches) or '/' (for same-origin matches). ` +
            `Please see the docs for ${moduleName}.${funcName}() for ` +
            `more info.`);
    },
    'channel-name-required': () => {
        return (`You must provide a channelName to construct a ` +
            `BroadcastCacheUpdate instance.`);
    },
    'invalid-responses-are-same-args': () => {
        return (`The arguments passed into responsesAreSame() appear to be ` +
            `invalid. Please ensure valid Responses are used.`);
    },
    'expire-custom-caches-only': () => {
        return (`You must provide a 'cacheName' property when using the ` +
            `expiration plugin with a runtime caching strategy.`);
    },
    'unit-must-be-bytes': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
        }
        return (`The 'unit' portion of the Range header must be set to 'bytes'. ` +
            `The Range header provided was "${normalizedRangeHeader}"`);
    },
    'single-range-only': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'single-range-only' error.`);
        }
        return (`Multiple ranges are not supported. Please use a  single start ` +
            `value, and optional end value. The Range header provided was ` +
            `"${normalizedRangeHeader}"`);
    },
    'invalid-range-values': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'invalid-range-values' error.`);
        }
        return (`The Range header is missing both start and end values. At least ` +
            `one of those values is needed. The Range header provided was ` +
            `"${normalizedRangeHeader}"`);
    },
    'no-range-header': () => {
        return `No Range header was found in the Request provided.`;
    },
    'range-not-satisfiable': ({ size, start, end }) => {
        return (`The start (${start}) and end (${end}) values in the Range are ` +
            `not satisfiable by the cached response, which is ${size} bytes.`);
    },
    'attempt-to-cache-non-get-request': ({ url, method }) => {
        return (`Unable to cache '${url}' because it is a '${method}' request and ` +
            `only 'GET' requests can be cached.`);
    },
    'cache-put-with-no-response': ({ url }) => {
        return (`There was an attempt to cache '${url}' but the response was not ` +
            `defined.`);
    },
    'no-response': ({ url, error }) => {
        let message = `The strategy could not generate a response for '${url}'.`;
        if (error) {
            message += ` The underlying error is ${error}.`;
        }
        return message;
    },
    'bad-precaching-response': ({ url, status }) => {
        return (`The precaching request for '${url}' failed` +
            (status ? ` with an HTTP status of ${status}.` : `.`));
    },
    'non-precached-url': ({ url }) => {
        return (`createHandlerBoundToURL('${url}') was called, but that URL is ` +
            `not precached. Please pass in a URL that is precached instead.`);
    },
    'add-to-cache-list-conflicting-integrities': ({ url }) => {
        return (`Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${url} with different integrity values. Please remove one of them.`);
    },
    'missing-precache-entry': ({ cacheName, url }) => {
        return `Unable to find a precached response in ${cacheName} for ${url}.`;
    },
    'cross-origin-copy-response': ({ origin }) => {
        return (`workbox-core.copyResponse() can only be used with same-origin ` +
            `responses. It was passed a response with origin ${origin}.`);
    },
    'opaque-streams-source': ({ type }) => {
        const message = `One of the workbox-streams sources resulted in an ` +
            `'${type}' response.`;
        if (type === 'opaqueredirect') {
            return (`${message} Please do not use a navigation request that results ` +
                `in a redirect as a source.`);
        }
        return `${message} Please ensure your sources are CORS-enabled.`;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/models/quotaErrorCallbacks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-core/models/quotaErrorCallbacks.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   quotaErrorCallbacks: () => (/* binding */ quotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// Callbacks to be executed whenever there's a quota error.
// Can't change Function type right now.
// eslint-disable-next-line @typescript-eslint/ban-types
const quotaErrorCallbacks = new Set();



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheController.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheController.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheController: () => (/* binding */ PrecacheController)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/waitUntil.js */ "./node_modules/workbox-core/_private/waitUntil.js");
/* harmony import */ var _utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createCacheKey.js */ "./node_modules/workbox-precaching/utils/createCacheKey.js");
/* harmony import */ var _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/PrecacheInstallReportPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js");
/* harmony import */ var _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/PrecacheCacheKeyPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js");
/* harmony import */ var _utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/printCleanupDetails.js */ "./node_modules/workbox-precaching/utils/printCleanupDetails.js");
/* harmony import */ var _utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/printInstallDetails.js */ "./node_modules/workbox-precaching/utils/printInstallDetails.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_11__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/












/**
 * Performs efficient precaching of assets.
 *
 * @memberof workbox-precaching
 */
class PrecacheController {
    /**
     * Create a new PrecacheController.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] The cache to use for precaching.
     * @param {string} [options.plugins] Plugins to use when precaching as well
     * as responding to fetch events for precached assets.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor({ cacheName, plugins = [], fallbackToNetwork = true, } = {}) {
        this._urlsToCacheKeys = new Map();
        this._urlsToCacheModes = new Map();
        this._cacheKeysToIntegrities = new Map();
        this._strategy = new _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy({
            cacheName: workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(cacheName),
            plugins: [
                ...plugins,
                new _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__.PrecacheCacheKeyPlugin({ precacheController: this }),
            ],
            fallbackToNetwork,
        });
        // Bind the install and activate methods to the instance.
        this.install = this.install.bind(this);
        this.activate = this.activate.bind(this);
    }
    /**
     * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
     * used to cache assets and respond to fetch events.
     */
    get strategy() {
        return this._strategy;
    }
    /**
     * Adds items to the precache list, removing any duplicates and
     * stores the files in the
     * {@link workbox-core.cacheNames|"precache cache"} when the service
     * worker installs.
     *
     * This method can be called multiple times.
     *
     * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
     */
    precache(entries) {
        this.addToCacheList(entries);
        if (!this._installAndActiveListenersAdded) {
            self.addEventListener('install', this.install);
            self.addEventListener('activate', this.activate);
            this._installAndActiveListenersAdded = true;
        }
    }
    /**
     * This method will add items to the precache list, removing duplicates
     * and ensuring the information is valid.
     *
     * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
     *     Array of entries to precache.
     */
    addToCacheList(entries) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArray(entries, {
                moduleName: 'workbox-precaching',
                className: 'PrecacheController',
                funcName: 'addToCacheList',
                paramName: 'entries',
            });
        }
        const urlsToWarnAbout = [];
        for (const entry of entries) {
            // See https://github.com/GoogleChrome/workbox/issues/2259
            if (typeof entry === 'string') {
                urlsToWarnAbout.push(entry);
            }
            else if (entry && entry.revision === undefined) {
                urlsToWarnAbout.push(entry.url);
            }
            const { cacheKey, url } = (0,_utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__.createCacheKey)(entry);
            const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';
            if (this._urlsToCacheKeys.has(url) &&
                this._urlsToCacheKeys.get(url) !== cacheKey) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-entries', {
                    firstEntry: this._urlsToCacheKeys.get(url),
                    secondEntry: cacheKey,
                });
            }
            if (typeof entry !== 'string' && entry.integrity) {
                if (this._cacheKeysToIntegrities.has(cacheKey) &&
                    this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
                    throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-integrities', {
                        url,
                    });
                }
                this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
            }
            this._urlsToCacheKeys.set(url, cacheKey);
            this._urlsToCacheModes.set(url, cacheMode);
            if (urlsToWarnAbout.length > 0) {
                const warningMessage = `Workbox is precaching URLs without revision ` +
                    `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` +
                    `Learn more at https://bit.ly/wb-precache`;
                if (false) {}
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.warn(warningMessage);
                }
            }
        }
    }
    /**
     * Precaches new and updated assets. Call this method from the service worker
     * install event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.InstallResult>}
     */
    install(event) {
        // waitUntil returns Promise<any>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const installReportPlugin = new _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__.PrecacheInstallReportPlugin();
            this.strategy.plugins.push(installReportPlugin);
            // Cache entries one at a time.
            // See https://github.com/GoogleChrome/workbox/issues/2528
            for (const [url, cacheKey] of this._urlsToCacheKeys) {
                const integrity = this._cacheKeysToIntegrities.get(cacheKey);
                const cacheMode = this._urlsToCacheModes.get(url);
                const request = new Request(url, {
                    integrity,
                    cache: cacheMode,
                    credentials: 'same-origin',
                });
                await Promise.all(this.strategy.handleAll({
                    params: { cacheKey },
                    request,
                    event,
                }));
            }
            const { updatedURLs, notUpdatedURLs } = installReportPlugin;
            if (true) {
                (0,_utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__.printInstallDetails)(updatedURLs, notUpdatedURLs);
            }
            return { updatedURLs, notUpdatedURLs };
        });
    }
    /**
     * Deletes assets that are no longer present in the current precache manifest.
     * Call this method from the service worker activate event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.CleanupResult>}
     */
    activate(event) {
        // waitUntil returns Promise<any>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const cache = await self.caches.open(this.strategy.cacheName);
            const currentlyCachedRequests = await cache.keys();
            const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
            const deletedURLs = [];
            for (const request of currentlyCachedRequests) {
                if (!expectedCacheKeys.has(request.url)) {
                    await cache.delete(request);
                    deletedURLs.push(request.url);
                }
            }
            if (true) {
                (0,_utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__.printCleanupDetails)(deletedURLs);
            }
            return { deletedURLs };
        });
    }
    /**
     * Returns a mapping of a precached URL to the corresponding cache key, taking
     * into account the revision information for the URL.
     *
     * @return {Map<string, string>} A URL to cache key mapping.
     */
    getURLsToCacheKeys() {
        return this._urlsToCacheKeys;
    }
    /**
     * Returns a list of all the URLs that have been precached by the current
     * service worker.
     *
     * @return {Array<string>} The precached URLs.
     */
    getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()];
    }
    /**
     * Returns the cache key used for storing a given URL. If that URL is
     * unversioned, like `/index.html', then the cache key will be the original
     * URL with a search parameter appended to it.
     *
     * @param {string} url A URL whose cache key you want to look up.
     * @return {string} The versioned URL that corresponds to a cache key
     * for the original URL, or undefined if that URL isn't precached.
     */
    getCacheKeyForURL(url) {
        const urlObject = new URL(url, location.href);
        return this._urlsToCacheKeys.get(urlObject.href);
    }
    /**
     * @param {string} url A cache key whose SRI you want to look up.
     * @return {string} The subresource integrity associated with the cache key,
     * or undefined if it's not set.
     */
    getIntegrityForCacheKey(cacheKey) {
        return this._cacheKeysToIntegrities.get(cacheKey);
    }
    /**
     * This acts as a drop-in replacement for
     * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
     * with the following differences:
     *
     * - It knows what the name of the precache is, and only checks in that cache.
     * - It allows you to pass in an "original" URL without versioning parameters,
     * and it will automatically look up the correct cache key for the currently
     * active revision of that URL.
     *
     * E.g., `matchPrecache('index.html')` will find the correct precached
     * response for the currently active service worker, even if the actual cache
     * key is `'/index.html?__WB_REVISION__=1234abcd'`.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     */
    async matchPrecache(request) {
        const url = request instanceof Request ? request.url : request;
        const cacheKey = this.getCacheKeyForURL(url);
        if (cacheKey) {
            const cache = await self.caches.open(this.strategy.cacheName);
            return cache.match(cacheKey);
        }
        return undefined;
    }
    /**
     * Returns a function that looks up `url` in the precache (taking into
     * account revision information), and returns the corresponding `Response`.
     *
     * @param {string} url The precached URL which will be used to lookup the
     * `Response`.
     * @return {workbox-routing~handlerCallback}
     */
    createHandlerBoundToURL(url) {
        const cacheKey = this.getCacheKeyForURL(url);
        if (!cacheKey) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('non-precached-url', { url });
        }
        return (options) => {
            options.request = new Request(url);
            options.params = Object.assign({ cacheKey }, options.params);
            return this.strategy.handle(options);
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheFallbackPlugin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheFallbackPlugin.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheFallbackPlugin: () => (/* binding */ PrecacheFallbackPlugin)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * `PrecacheFallbackPlugin` allows you to specify an "offline fallback"
 * response to be used when a given strategy is unable to generate a response.
 *
 * It does this by intercepting the `handlerDidError` plugin callback
 * and returning a precached response, taking the expected revision parameter
 * into account automatically.
 *
 * Unless you explicitly pass in a `PrecacheController` instance to the
 * constructor, the default instance will be used. Generally speaking, most
 * developers will end up using the default.
 *
 * @memberof workbox-precaching
 */
class PrecacheFallbackPlugin {
    /**
     * Constructs a new PrecacheFallbackPlugin with the associated fallbackURL.
     *
     * @param {Object} config
     * @param {string} config.fallbackURL A precached URL to use as the fallback
     *     if the associated strategy can't generate a response.
     * @param {PrecacheController} [config.precacheController] An optional
     *     PrecacheController instance. If not provided, the default
     *     PrecacheController will be used.
     */
    constructor({ fallbackURL, precacheController, }) {
        /**
         * @return {Promise<Response>} The precache response for the fallback URL.
         *
         * @private
         */
        this.handlerDidError = () => this._precacheController.matchPrecache(this._fallbackURL);
        this._fallbackURL = fallbackURL;
        this._precacheController =
            precacheController || (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheRoute.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheRoute.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheRoute: () => (/* binding */ PrecacheRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-routing/Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/generateURLVariations.js */ "./node_modules/workbox-precaching/utils/generateURLVariations.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_4__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/





/**
 * A subclass of {@link workbox-routing.Route} that takes a
 * {@link workbox-precaching.PrecacheController}
 * instance and uses it to match incoming requests and handle fetching
 * responses from the precache.
 *
 * @memberof workbox-precaching
 * @extends workbox-routing.Route
 */
class PrecacheRoute extends workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * @param {PrecacheController} precacheController A `PrecacheController`
     * instance used to both match requests and respond to fetch events.
     * @param {Object} [options] Options to control how requests are matched
     * against the list of precached URLs.
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     */
    constructor(precacheController, options) {
        const match = ({ request, }) => {
            const urlsToCacheKeys = precacheController.getURLsToCacheKeys();
            for (const possibleURL of (0,_utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__.generateURLVariations)(request.url, options)) {
                const cacheKey = urlsToCacheKeys.get(possibleURL);
                if (cacheKey) {
                    const integrity = precacheController.getIntegrityForCacheKey(cacheKey);
                    return { cacheKey, integrity };
                }
            }
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`Precaching did not find a match for ` + (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(request.url));
            }
            return;
        };
        super(match, precacheController.strategy);
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheStrategy.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheStrategy.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheStrategy: () => (/* binding */ PrecacheStrategy)
/* harmony export */ });
/* harmony import */ var workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/copyResponse.js */ "./node_modules/workbox-core/copyResponse.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-strategies/Strategy.js */ "./node_modules/workbox-strategies/Strategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * A {@link workbox-strategies.Strategy} implementation
 * specifically designed to work with
 * {@link workbox-precaching.PrecacheController}
 * to both cache and fetch precached assets.
 *
 * Note: an instance of this class is created automatically when creating a
 * `PrecacheController`; it's generally not necessary to create this yourself.
 *
 * @extends workbox-strategies.Strategy
 * @memberof workbox-precaching
 */
class PrecacheStrategy extends workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__.Strategy {
    /**
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * of all fetch() requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor(options = {}) {
        options.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(options.cacheName);
        super(options);
        this._fallbackToNetwork =
            options.fallbackToNetwork === false ? false : true;
        // Redirected responses cannot be used to satisfy a navigation request, so
        // any redirected response must be "copied" rather than cloned, so the new
        // response doesn't contain the `redirected` flag. See:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
        this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
    }
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
        const response = await handler.cacheMatch(request);
        if (response) {
            return response;
        }
        // If this is an `install` event for an entry that isn't already cached,
        // then populate the cache.
        if (handler.event && handler.event.type === 'install') {
            return await this._handleInstall(request, handler);
        }
        // Getting here means something went wrong. An entry that should have been
        // precached wasn't found in the cache.
        return await this._handleFetch(request, handler);
    }
    async _handleFetch(request, handler) {
        let response;
        const params = (handler.params || {});
        // Fall back to the network if we're configured to do so.
        if (this._fallbackToNetwork) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`The precached response for ` +
                    `${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} in ${this.cacheName} was not ` +
                    `found. Falling back to the network.`);
            }
            const integrityInManifest = params.integrity;
            const integrityInRequest = request.integrity;
            const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
            // Do not add integrity if the original request is no-cors
            // See https://github.com/GoogleChrome/workbox/issues/3096
            response = await handler.fetch(new Request(request, {
                integrity: request.mode !== 'no-cors'
                    ? integrityInRequest || integrityInManifest
                    : undefined,
            }));
            // It's only "safe" to repair the cache if we're using SRI to guarantee
            // that the response matches the precache manifest's expectations,
            // and there's either a) no integrity property in the incoming request
            // or b) there is an integrity, and it matches the precache manifest.
            // See https://github.com/GoogleChrome/workbox/issues/2858
            // Also if the original request users no-cors we don't use integrity.
            // See https://github.com/GoogleChrome/workbox/issues/3096
            if (integrityInManifest &&
                noIntegrityConflict &&
                request.mode !== 'no-cors') {
                this._useDefaultCacheabilityPluginIfNeeded();
                const wasCached = await handler.cachePut(request, response.clone());
                if (true) {
                    if (wasCached) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`A response for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} ` +
                            `was used to "repair" the precache.`);
                    }
                }
            }
        }
        else {
            // This shouldn't normally happen, but there are edge cases:
            // https://github.com/GoogleChrome/workbox/issues/1441
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('missing-precache-entry', {
                cacheName: this.cacheName,
                url: request.url,
            });
        }
        if (true) {
            const cacheKey = params.cacheKey || (await handler.getCacheKey(request, 'read'));
            // Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Precaching is responding to: ` + (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url));
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Serving the precached url: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View request details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(request);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View response details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(response);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        return response;
    }
    async _handleInstall(request, handler) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const response = await handler.fetch(request);
        // Make sure we defer cachePut() until after we know the response
        // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
        const wasCached = await handler.cachePut(request, response.clone());
        if (!wasCached) {
            // Throwing here will lead to the `install` handler failing, which
            // we want to do if *any* of the responses aren't safe to cache.
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('bad-precaching-response', {
                url: request.url,
                status: response.status,
            });
        }
        return response;
    }
    /**
     * This method is complex, as there a number of things to account for:
     *
     * The `plugins` array can be set at construction, and/or it might be added to
     * to at any time before the strategy is used.
     *
     * At the time the strategy is used (i.e. during an `install` event), there
     * needs to be at least one plugin that implements `cacheWillUpdate` in the
     * array, other than `copyRedirectedCacheableResponsesPlugin`.
     *
     * - If this method is called and there are no suitable `cacheWillUpdate`
     * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
     *
     * - If this method is called and there is exactly one `cacheWillUpdate`, then
     * we don't have to do anything (this might be a previously added
     * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
     *
     * - If this method is called and there is more than one `cacheWillUpdate`,
     * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
     * we need to remove it. (This situation is unlikely, but it could happen if
     * the strategy is used multiple times, the first without a `cacheWillUpdate`,
     * and then later on after manually adding a custom `cacheWillUpdate`.)
     *
     * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
     *
     * @private
     */
    _useDefaultCacheabilityPluginIfNeeded() {
        let defaultPluginIndex = null;
        let cacheWillUpdatePluginCount = 0;
        for (const [index, plugin] of this.plugins.entries()) {
            // Ignore the copy redirected plugin when determining what to do.
            if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
                continue;
            }
            // Save the default plugin's index, in case it needs to be removed.
            if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
                defaultPluginIndex = index;
            }
            if (plugin.cacheWillUpdate) {
                cacheWillUpdatePluginCount++;
            }
        }
        if (cacheWillUpdatePluginCount === 0) {
            this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
        }
        else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
            // Only remove the default plugin; multiple custom plugins are allowed.
            this.plugins.splice(defaultPluginIndex, 1);
        }
        // Nothing needs to be done if cacheWillUpdatePluginCount is 1
    }
}
PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({ response }) {
        if (!response || response.status >= 400) {
            return null;
        }
        return response;
    },
};
PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
        return response.redirected ? await (0,workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__.copyResponse)(response) : response;
    },
};



/***/ }),

/***/ "./node_modules/workbox-precaching/_types.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-precaching/_types.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// * * * IMPORTANT! * * *
// ------------------------------------------------------------------------- //
// jdsoc type definitions cannot be declared above TypeScript definitions or
// they'll be stripped from the built `.js` files, and they'll only be in the
// `d.ts` files, which aren't read by the jsdoc generator. As a result we
// have to put declare them below.
/**
 * @typedef {Object} InstallResult
 * @property {Array<string>} updatedURLs List of URLs that were updated during
 * installation.
 * @property {Array<string>} notUpdatedURLs List of URLs that were already up to
 * date.
 *
 * @memberof workbox-precaching
 */
/**
 * @typedef {Object} CleanupResult
 * @property {Array<string>} deletedCacheRequests List of URLs that were deleted
 * while cleaning up the cache.
 *
 * @memberof workbox-precaching
 */
/**
 * @typedef {Object} PrecacheEntry
 * @property {string} url URL to precache.
 * @property {string} [revision] Revision information for the URL.
 * @property {string} [integrity] Integrity metadata that will be used when
 * making the network request for the URL.
 *
 * @memberof workbox-precaching
 */
/**
 * The "urlManipulation" callback can be used to determine if there are any
 * additional permutations of a URL that should be used to check against
 * the available precached files.
 *
 * For example, Workbox supports checking for '/index.html' when the URL
 * '/' is provided. This callback allows additional, custom checks.
 *
 * @callback ~urlManipulation
 * @param {Object} context
 * @param {URL} context.url The request's URL.
 * @return {Array<URL>} To add additional urls to test, return an Array of
 * URLs. Please note that these **should not be strings**, but URL objects.
 *
 * @memberof workbox-precaching
 */


/***/ }),

/***/ "./node_modules/workbox-precaching/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:precaching:7.2.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-precaching/addPlugins.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-precaching/addPlugins.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPlugins: () => (/* binding */ addPlugins)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds plugins to the precaching strategy.
 *
 * @param {Array<Object>} plugins
 *
 * @memberof workbox-precaching
 */
function addPlugins(plugins) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.strategy.plugins.push(...plugins);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/addRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/addRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addRoute: () => (/* binding */ addRoute)
/* harmony export */ });
/* harmony import */ var workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-routing/registerRoute.js */ "./node_modules/workbox-routing/registerRoute.js");
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} [options] See the {@link workbox-precaching.PrecacheRoute}
 * options.
 *
 * @memberof workbox-precaching
 */
function addRoute(options) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__.getOrCreatePrecacheController)();
    const precacheRoute = new _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__.PrecacheRoute(precacheController, options);
    (0,workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__.registerRoute)(precacheRoute);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/cleanupOutdatedCaches.js":
/*!******************************************************************!*\
  !*** ./node_modules/workbox-precaching/cleanupOutdatedCaches.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanupOutdatedCaches: () => (/* binding */ cleanupOutdatedCaches)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_deleteOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/deleteOutdatedCaches.js */ "./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Adds an `activate` event listener which will clean up incompatible
 * precaches that were created by older versions of Workbox.
 *
 * @memberof workbox-precaching
 */
function cleanupOutdatedCaches() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('activate', ((event) => {
        const cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getPrecacheName();
        event.waitUntil((0,_utils_deleteOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__.deleteOutdatedCaches)(cacheName).then((cachesDeleted) => {
            if (true) {
                if (cachesDeleted.length > 0) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.log(`The following out-of-date precaches were cleaned up ` +
                        `automatically:`, cachesDeleted);
                }
            }
        }));
    }));
}



/***/ }),

/***/ "./node_modules/workbox-precaching/createHandlerBoundToURL.js":
/*!********************************************************************!*\
  !*** ./node_modules/workbox-precaching/createHandlerBoundToURL.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHandlerBoundToURL: () => (/* binding */ createHandlerBoundToURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#createHandlerBoundToURL} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call the
 * {@link PrecacheController#createHandlerBoundToURL} on that instance,
 * instead of using this function.
 *
 * @param {string} url The precached URL which will be used to lookup the
 * `Response`.
 * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
 * response from the network if there's a precache miss.
 * @return {workbox-routing~handlerCallback}
 *
 * @memberof workbox-precaching
 */
function createHandlerBoundToURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.createHandlerBoundToURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/getCacheKeyForURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-precaching/getCacheKeyForURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCacheKeyForURL: () => (/* binding */ getCacheKeyForURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Takes in a URL, and returns the corresponding URL that could be used to
 * lookup the entry in the precache.
 *
 * If a relative URL is provided, the location of the service worker file will
 * be used as the base.
 *
 * For precached entries without revision information, the cache key will be the
 * same as the original URL.
 *
 * For precached entries with revision information, the cache key will be the
 * original URL with the addition of a query parameter used for keeping track of
 * the revision info.
 *
 * @param {string} url The URL whose cache key to look up.
 * @return {string} The cache key that corresponds to that URL.
 *
 * @memberof workbox-precaching
 */
function getCacheKeyForURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.getCacheKeyForURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/index.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-precaching/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheController: () => (/* reexport safe */ _PrecacheController_js__WEBPACK_IMPORTED_MODULE_8__.PrecacheController),
/* harmony export */   PrecacheFallbackPlugin: () => (/* reexport safe */ _PrecacheFallbackPlugin_js__WEBPACK_IMPORTED_MODULE_11__.PrecacheFallbackPlugin),
/* harmony export */   PrecacheRoute: () => (/* reexport safe */ _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_9__.PrecacheRoute),
/* harmony export */   PrecacheStrategy: () => (/* reexport safe */ _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy),
/* harmony export */   addPlugins: () => (/* reexport safe */ _addPlugins_js__WEBPACK_IMPORTED_MODULE_0__.addPlugins),
/* harmony export */   addRoute: () => (/* reexport safe */ _addRoute_js__WEBPACK_IMPORTED_MODULE_1__.addRoute),
/* harmony export */   cleanupOutdatedCaches: () => (/* reexport safe */ _cleanupOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__.cleanupOutdatedCaches),
/* harmony export */   createHandlerBoundToURL: () => (/* reexport safe */ _createHandlerBoundToURL_js__WEBPACK_IMPORTED_MODULE_3__.createHandlerBoundToURL),
/* harmony export */   getCacheKeyForURL: () => (/* reexport safe */ _getCacheKeyForURL_js__WEBPACK_IMPORTED_MODULE_4__.getCacheKeyForURL),
/* harmony export */   matchPrecache: () => (/* reexport safe */ _matchPrecache_js__WEBPACK_IMPORTED_MODULE_5__.matchPrecache),
/* harmony export */   precache: () => (/* reexport safe */ _precache_js__WEBPACK_IMPORTED_MODULE_6__.precache),
/* harmony export */   precacheAndRoute: () => (/* reexport safe */ _precacheAndRoute_js__WEBPACK_IMPORTED_MODULE_7__.precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addPlugins_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addPlugins.js */ "./node_modules/workbox-precaching/addPlugins.js");
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _cleanupOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cleanupOutdatedCaches.js */ "./node_modules/workbox-precaching/cleanupOutdatedCaches.js");
/* harmony import */ var _createHandlerBoundToURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createHandlerBoundToURL.js */ "./node_modules/workbox-precaching/createHandlerBoundToURL.js");
/* harmony import */ var _getCacheKeyForURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getCacheKeyForURL.js */ "./node_modules/workbox-precaching/getCacheKeyForURL.js");
/* harmony import */ var _matchPrecache_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./matchPrecache.js */ "./node_modules/workbox-precaching/matchPrecache.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _precacheAndRoute_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./precacheAndRoute.js */ "./node_modules/workbox-precaching/precacheAndRoute.js");
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _PrecacheFallbackPlugin_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PrecacheFallbackPlugin.js */ "./node_modules/workbox-precaching/PrecacheFallbackPlugin.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_types.js */ "./node_modules/workbox-precaching/_types.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/













/**
 * Most consumers of this module will want to use the
 * {@link workbox-precaching.precacheAndRoute}
 * method to add assets to the cache and respond to network requests with these
 * cached assets.
 *
 * If you require more control over caching and routing, you can use the
 * {@link workbox-precaching.PrecacheController}
 * interface.
 *
 * @module workbox-precaching
 */




/***/ }),

/***/ "./node_modules/workbox-precaching/matchPrecache.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/matchPrecache.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   matchPrecache: () => (/* binding */ matchPrecache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#matchPrecache} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call
 * {@link PrecacheController#matchPrecache} on that instance,
 * instead of using this function.
 *
 * @param {string|Request} request The key (without revisioning parameters)
 * to look up in the precache.
 * @return {Promise<Response|undefined>}
 *
 * @memberof workbox-precaching
 */
function matchPrecache(request) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.matchPrecache(request);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precache.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/precache.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   precache: () => (/* binding */ precache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds items to the precache list, removing any duplicates and
 * stores the files in the
 * {@link workbox-core.cacheNames|"precache cache"} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you.
 * It only precaches files. To respond to a network request you call
 * {@link workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * {@link workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
 *
 * @memberof workbox-precaching
 */
function precache(entries) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.precache(entries);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precacheAndRoute.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/precacheAndRoute.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   precacheAndRoute: () => (/* binding */ precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * {@link workbox-precaching.precache} and
 * {@link workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See the
 * {@link workbox-precaching.PrecacheRoute} options.
 *
 * @memberof workbox-precaching
 */
function precacheAndRoute(entries, options) {
    (0,_precache_js__WEBPACK_IMPORTED_MODULE_1__.precache)(entries);
    (0,_addRoute_js__WEBPACK_IMPORTED_MODULE_0__.addRoute)(options);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js":
/*!*************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheCacheKeyPlugin: () => (/* binding */ PrecacheCacheKeyPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to translate URLs into
 * the corresponding cache key, based on the current revision info.
 *
 * @private
 */
class PrecacheCacheKeyPlugin {
    constructor({ precacheController }) {
        this.cacheKeyWillBeUsed = async ({ request, params, }) => {
            // Params is type any, can't change right now.
            /* eslint-disable */
            const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) ||
                this._precacheController.getCacheKeyForURL(request.url);
            /* eslint-enable */
            return cacheKey
                ? new Request(cacheKey, { headers: request.headers })
                : request;
        };
        this._precacheController = precacheController;
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js":
/*!******************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheInstallReportPlugin: () => (/* binding */ PrecacheInstallReportPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to determine the
 * of assets that were updated (or not updated) during the install event.
 *
 * @private
 */
class PrecacheInstallReportPlugin {
    constructor() {
        this.updatedURLs = [];
        this.notUpdatedURLs = [];
        this.handlerWillStart = async ({ request, state, }) => {
            // TODO: `state` should never be undefined...
            if (state) {
                state.originalRequest = request;
            }
        };
        this.cachedResponseWillBeUsed = async ({ event, state, cachedResponse, }) => {
            if (event.type === 'install') {
                if (state &&
                    state.originalRequest &&
                    state.originalRequest instanceof Request) {
                    // TODO: `state` should never be undefined...
                    const url = state.originalRequest.url;
                    if (cachedResponse) {
                        this.notUpdatedURLs.push(url);
                    }
                    else {
                        this.updatedURLs.push(url);
                    }
                }
            }
            return cachedResponse;
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/createCacheKey.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/createCacheKey.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCacheKey: () => (/* binding */ createCacheKey)
/* harmony export */ });
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


// Name of the search parameter used to store revision info.
const REVISION_SEARCH_PARAM = '__WB_REVISION__';
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof workbox-precaching
 */
function createCacheKey(entry) {
    if (!entry) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If a precache manifest entry is a string, it's assumed to be a versioned
    // URL, like '/app.abcd1234.js'. Return as-is.
    if (typeof entry === 'string') {
        const urlObject = new URL(entry, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    const { revision, url } = entry;
    if (!url) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If there's just a URL and no revision, then it's also assumed to be a
    // versioned URL.
    if (!revision) {
        const urlObject = new URL(url, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    // Otherwise, construct a properly versioned URL using the custom Workbox
    // search parameter along with the revision info.
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
        cacheKey: cacheKeyURL.href,
        url: originalURL.href,
    };
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteOutdatedCaches: () => (/* binding */ deleteOutdatedCaches)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const SUBSTRING_TO_FIND = '-precache-';
/**
 * Cleans up incompatible precaches that were created by older versions of
 * Workbox, by a service worker registered under the current scope.
 *
 * This is meant to be called as part of the `activate` event.
 *
 * This should be safe to use as long as you don't include `substringToFind`
 * (defaulting to `-precache-`) in your non-precache cache names.
 *
 * @param {string} currentPrecacheName The cache name currently in use for
 * precaching. This cache won't be deleted.
 * @param {string} [substringToFind='-precache-'] Cache names which include this
 * substring will be deleted (excluding `currentPrecacheName`).
 * @return {Array<string>} A list of all the cache names that were deleted.
 *
 * @private
 * @memberof workbox-precaching
 */
const deleteOutdatedCaches = async (currentPrecacheName, substringToFind = SUBSTRING_TO_FIND) => {
    const cacheNames = await self.caches.keys();
    const cacheNamesToDelete = cacheNames.filter((cacheName) => {
        return (cacheName.includes(substringToFind) &&
            cacheName.includes(self.registration.scope) &&
            cacheName !== currentPrecacheName);
    });
    await Promise.all(cacheNamesToDelete.map((cacheName) => self.caches.delete(cacheName)));
    return cacheNamesToDelete;
};



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/generateURLVariations.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/generateURLVariations.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateURLVariations: () => (/* binding */ generateURLVariations)
/* harmony export */ });
/* harmony import */ var _removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeIgnoredSearchParams.js */ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Generator function that yields possible variations on the original URL to
 * check, one at a time.
 *
 * @param {string} url
 * @param {Object} options
 *
 * @private
 * @memberof workbox-precaching
 */
function* generateURLVariations(url, { ignoreURLParametersMatching = [/^utm_/, /^fbclid$/], directoryIndex = 'index.html', cleanURLs = true, urlManipulation, } = {}) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = '';
    yield urlObject.href;
    const urlWithoutIgnoredParams = (0,_removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__.removeIgnoredSearchParams)(urlObject, ignoreURLParametersMatching);
    yield urlWithoutIgnoredParams.href;
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
        const directoryURL = new URL(urlWithoutIgnoredParams.href);
        directoryURL.pathname += directoryIndex;
        yield directoryURL.href;
    }
    if (cleanURLs) {
        const cleanURL = new URL(urlWithoutIgnoredParams.href);
        cleanURL.pathname += '.html';
        yield cleanURL.href;
    }
    if (urlManipulation) {
        const additionalURLs = urlManipulation({ url: urlObject });
        for (const urlToAttempt of additionalURLs) {
            yield urlToAttempt.href;
        }
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js":
/*!********************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOrCreatePrecacheController: () => (/* binding */ getOrCreatePrecacheController)
/* harmony export */ });
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let precacheController;
/**
 * @return {PrecacheController}
 * @private
 */
const getOrCreatePrecacheController = () => {
    if (!precacheController) {
        precacheController = new _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController();
    }
    return precacheController;
};


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printCleanupDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printCleanupDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printCleanupDetails: () => (/* binding */ printCleanupDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} deletedURLs
 *
 * @private
 */
const logGroup = (groupTitle, deletedURLs) => {
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of deletedURLs) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
};
/**
 * @param {Array<string>} deletedURLs
 *
 * @private
 * @memberof workbox-precaching
 */
function printCleanupDetails(deletedURLs) {
    const deletionCount = deletedURLs.length;
    if (deletionCount > 0) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(`During precaching cleanup, ` +
            `${deletionCount} cached ` +
            `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
        logGroup('Deleted Cache Requests', deletedURLs);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printInstallDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printInstallDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printInstallDetails: () => (/* binding */ printInstallDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} urls
 *
 * @private
 */
function _nestedGroup(groupTitle, urls) {
    if (urls.length === 0) {
        return;
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of urls) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
}
/**
 * @param {Array<string>} urlsToPrecache
 * @param {Array<string>} urlsAlreadyPrecached
 *
 * @private
 * @memberof workbox-precaching
 */
function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
    const precachedCount = urlsToPrecache.length;
    const alreadyPrecachedCount = urlsAlreadyPrecached.length;
    if (precachedCount || alreadyPrecachedCount) {
        let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
        if (alreadyPrecachedCount > 0) {
            message +=
                ` ${alreadyPrecachedCount} ` +
                    `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
        }
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(message);
        _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
        _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeIgnoredSearchParams: () => (/* binding */ removeIgnoredSearchParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof workbox-precaching
 */
function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
    // Convert the iterable into an array at the start of the loop to make sure
    // deletion doesn't mess up iteration.
    for (const paramName of [...urlObject.searchParams.keys()]) {
        if (ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))) {
            urlObject.searchParams.delete(paramName);
        }
    }
    return urlObject;
}


/***/ }),

/***/ "./node_modules/workbox-routing/RegExpRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-routing/RegExpRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegExpRoute: () => (/* binding */ RegExpRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * RegExpRoute makes it easy to create a regular expression based
 * {@link workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * @memberof workbox-routing
 * @extends workbox-routing.Route
 */
class RegExpRoute extends _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * If the regular expression contains
     * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
     * the captured values will be passed to the
     * {@link workbox-routing~handlerCallback} `params`
     * argument.
     *
     * @param {RegExp} regExp The regular expression to match against URLs.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(regExp, handler, method) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(regExp, RegExp, {
                moduleName: 'workbox-routing',
                className: 'RegExpRoute',
                funcName: 'constructor',
                paramName: 'pattern',
            });
        }
        const match = ({ url }) => {
            const result = regExp.exec(url.href);
            // Return immediately if there's no match.
            if (!result) {
                return;
            }
            // Require that the match start at the first character in the URL string
            // if it's a cross-origin request.
            // See https://github.com/GoogleChrome/workbox/issues/281 for the context
            // behind this behavior.
            if (url.origin !== location.origin && result.index !== 0) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug(`The regular expression '${regExp.toString()}' only partially matched ` +
                        `against the cross-origin URL '${url.toString()}'. RegExpRoute's will only ` +
                        `handle cross-origin requests if they match the entire URL.`);
                }
                return;
            }
            // If the route matches, but there aren't any capture groups defined, then
            // this will return [], which is truthy and therefore sufficient to
            // indicate a match.
            // If there are capture groups, then it will return their values.
            return result.slice(1);
        };
        super(match, handler, method);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Route.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-routing/Route.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof workbox-routing
 */
class Route {
    /**
     * Constructor for Route class.
     *
     * @param {workbox-routing~matchCallback} match
     * A callback function that determines whether the route matches a given
     * `fetch` event by returning a non-falsy value.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(match, handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.defaultMethod) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(match, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'match',
            });
            if (method) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isOneOf(method, _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validMethods, { paramName: 'method' });
            }
        }
        // These values are referenced directly by Router so cannot be
        // altered by minificaton.
        this.handler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
        this.match = match;
        this.method = method;
    }
    /**
     *
     * @param {workbox-routing-handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response
     */
    setCatchHandler(handler) {
        this.catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Router.js":
/*!************************************************!*\
  !*** ./node_modules/workbox-routing/Router.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Router: () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * The Router can be used to process a `FetchEvent` using one or more
 * {@link workbox-routing.Route}, responding with a `Response` if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof workbox-routing
 */
class Router {
    /**
     * Initializes a new Router.
     */
    constructor() {
        this._routes = new Map();
        this._defaultHandlerMap = new Map();
    }
    /**
     * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
     * method name ('GET', etc.) to an array of all the corresponding `Route`
     * instances that are registered.
     */
    get routes() {
        return this._routes;
    }
    /**
     * Adds a fetch event listener to respond to events when a route matches
     * the event's request.
     */
    addFetchListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('fetch', ((event) => {
            const { request } = event;
            const responsePromise = this.handleRequest({ request, event });
            if (responsePromise) {
                event.respondWith(responsePromise);
            }
        }));
    }
    /**
     * Adds a message event listener for URLs to cache from the window.
     * This is useful to cache resources loaded on the page prior to when the
     * service worker started controlling it.
     *
     * The format of the message data sent from the window should be as follows.
     * Where the `urlsToCache` array may consist of URL strings or an array of
     * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
     *
     * ```
     * {
     *   type: 'CACHE_URLS',
     *   payload: {
     *     urlsToCache: [
     *       './script1.js',
     *       './script2.js',
     *       ['./script3.js', {mode: 'no-cors'}],
     *     ],
     *   },
     * }
     * ```
     */
    addCacheListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('message', ((event) => {
            // event.data is type 'any'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (event.data && event.data.type === 'CACHE_URLS') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { payload } = event.data;
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
                }
                const requestPromises = Promise.all(payload.urlsToCache.map((entry) => {
                    if (typeof entry === 'string') {
                        entry = [entry];
                    }
                    const request = new Request(...entry);
                    return this.handleRequest({ request, event });
                    // TODO(philipwalton): TypeScript errors without this typecast for
                    // some reason (probably a bug). The real type here should work but
                    // doesn't: `Array<Promise<Response> | undefined>`.
                })); // TypeScript
                event.waitUntil(requestPromises);
                // If a MessageChannel was used, reply to the message on success.
                if (event.ports && event.ports[0]) {
                    void requestPromises.then(() => event.ports[0].postMessage(true));
                }
            }
        }));
    }
    /**
     * Apply the routing rules to a FetchEvent object to get a Response from an
     * appropriate Route's handler.
     *
     * @param {Object} options
     * @param {Request} options.request The request to handle.
     * @param {ExtendableEvent} options.event The event that triggered the
     *     request.
     * @return {Promise<Response>|undefined} A promise is returned if a
     *     registered route can handle the request. If there is no matching
     *     route and there's no `defaultHandler`, `undefined` is returned.
     */
    handleRequest({ request, event, }) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(request, Request, {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'handleRequest',
                paramName: 'options.request',
            });
        }
        const url = new URL(request.url, location.href);
        if (!url.protocol.startsWith('http')) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
            }
            return;
        }
        const sameOrigin = url.origin === location.origin;
        const { params, route } = this.findMatchingRoute({
            event,
            request,
            sameOrigin,
            url,
        });
        let handler = route && route.handler;
        const debugMessages = [];
        if (true) {
            if (handler) {
                debugMessages.push([`Found a route to handle this request:`, route]);
                if (params) {
                    debugMessages.push([
                        `Passing the following params to the route's handler:`,
                        params,
                    ]);
                }
            }
        }
        // If we don't have a handler because there was no matching route, then
        // fall back to defaultHandler if that's defined.
        const method = request.method;
        if (!handler && this._defaultHandlerMap.has(method)) {
            if (true) {
                debugMessages.push(`Failed to find a matching route. Falling ` +
                    `back to the default handler for ${method}.`);
            }
            handler = this._defaultHandlerMap.get(method);
        }
        if (!handler) {
            if (true) {
                // No handler so Workbox will do nothing. If logs is set of debug
                // i.e. verbose, we should print out this information.
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`No route found for: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            }
            return;
        }
        if (true) {
            // We have a handler, meaning Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Router is responding to: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            debugMessages.forEach((msg) => {
                if (Array.isArray(msg)) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(...msg);
                }
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(msg);
                }
            });
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        // Wrap in try and catch in case the handle method throws a synchronous
        // error. It should still callback to the catch handler.
        let responsePromise;
        try {
            responsePromise = handler.handle({ url, request, event, params });
        }
        catch (err) {
            responsePromise = Promise.reject(err);
        }
        // Get route's catch handler, if it exists
        const catchHandler = route && route.catchHandler;
        if (responsePromise instanceof Promise &&
            (this._catchHandler || catchHandler)) {
            responsePromise = responsePromise.catch(async (err) => {
                // If there's a route catch handler, process that first
                if (catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to route's Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    try {
                        return await catchHandler.handle({ url, request, event, params });
                    }
                    catch (catchErr) {
                        if (catchErr instanceof Error) {
                            err = catchErr;
                        }
                    }
                }
                if (this._catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to global Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    return this._catchHandler.handle({ url, request, event });
                }
                throw err;
            });
        }
        return responsePromise;
    }
    /**
     * Checks a request and URL (and optionally an event) against the list of
     * registered routes, and if there's a match, returns the corresponding
     * route along with any params generated by the match.
     *
     * @param {Object} options
     * @param {URL} options.url
     * @param {boolean} options.sameOrigin The result of comparing `url.origin`
     *     against the current origin.
     * @param {Request} options.request The request to match.
     * @param {Event} options.event The corresponding event.
     * @return {Object} An object with `route` and `params` properties.
     *     They are populated if a matching route was found or `undefined`
     *     otherwise.
     */
    findMatchingRoute({ url, sameOrigin, request, event, }) {
        const routes = this._routes.get(request.method) || [];
        for (const route of routes) {
            let params;
            // route.match returns type any, not possible to change right now.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const matchResult = route.match({ url, sameOrigin, request, event });
            if (matchResult) {
                if (true) {
                    // Warn developers that using an async matchCallback is almost always
                    // not the right thing to do.
                    if (matchResult instanceof Promise) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`While routing ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}, an async ` +
                            `matchCallback function was used. Please convert the ` +
                            `following route to use a synchronous matchCallback function:`, route);
                    }
                }
                // See https://github.com/GoogleChrome/workbox/issues/2079
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                params = matchResult;
                if (Array.isArray(params) && params.length === 0) {
                    // Instead of passing an empty array in as params, use undefined.
                    params = undefined;
                }
                else if (matchResult.constructor === Object && // eslint-disable-line
                    Object.keys(matchResult).length === 0) {
                    // Instead of passing an empty object in as params, use undefined.
                    params = undefined;
                }
                else if (typeof matchResult === 'boolean') {
                    // For the boolean value true (rather than just something truth-y),
                    // don't set params.
                    // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
                    params = undefined;
                }
                // Return early if have a match.
                return { route, params };
            }
        }
        // If no match was found above, return and empty object.
        return {};
    }
    /**
     * Define a default `handler` that's called when no routes explicitly
     * match the incoming request.
     *
     * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
     *
     * Without a default handler, unmatched requests will go against the
     * network as if there were no service worker present.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to associate with this
     * default handler. Each method has its own default.
     */
    setDefaultHandler(handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.defaultMethod) {
        this._defaultHandlerMap.set(method, (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler));
    }
    /**
     * If a Route throws an error while handling a request, this `handler`
     * will be called and given a chance to provide a response.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     */
    setCatchHandler(handler) {
        this._catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler);
    }
    /**
     * Registers a route with the router.
     *
     * @param {workbox-routing.Route} route The route to register.
     */
    registerRoute(route) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route, 'match', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.handler, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route.handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.handler',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.method, 'string', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.method',
            });
        }
        if (!this._routes.has(route.method)) {
            this._routes.set(route.method, []);
        }
        // Give precedence to all of the earlier routes by adding this additional
        // route to the end of the array.
        this._routes.get(route.method).push(route);
    }
    /**
     * Unregisters a route with the router.
     *
     * @param {workbox-routing.Route} route The route to unregister.
     */
    unregisterRoute(route) {
        if (!this._routes.has(route.method)) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-but-not-found-with-method', {
                method: route.method,
            });
        }
        const routeIndex = this._routes.get(route.method).indexOf(route);
        if (routeIndex > -1) {
            this._routes.get(route.method).splice(routeIndex, 1);
        }
        else {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-route-not-registered');
        }
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/_version.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-routing/_version.js ***!
  \**************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:routing:7.2.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-routing/registerRoute.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-routing/registerRoute.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerRoute: () => (/* binding */ registerRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegExpRoute.js */ "./node_modules/workbox-routing/RegExpRoute.js");
/* harmony import */ var _utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getOrCreateDefaultRouter.js */ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call {@link workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|workbox-routing.Route~matchCallback|workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {workbox-routing.Route} The generated `Route`.
 *
 * @memberof workbox-routing
 */
function registerRoute(capture, handler, method) {
    let route;
    if (typeof capture === 'string') {
        const captureUrl = new URL(capture, location.href);
        if (true) {
            if (!(capture.startsWith('/') || capture.startsWith('http'))) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('invalid-string', {
                    moduleName: 'workbox-routing',
                    funcName: 'registerRoute',
                    paramName: 'capture',
                });
            }
            // We want to check if Express-style wildcards are in the pathname only.
            // TODO: Remove this log message in v4.
            const valueToCheck = capture.startsWith('http')
                ? captureUrl.pathname
                : capture;
            // See https://github.com/pillarjs/path-to-regexp#parameters
            const wildcards = '[*:?+]';
            if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` +
                    `character (${wildcards}). Strings are now always interpreted as ` +
                    `exact matches; use a RegExp for partial or wildcard matches.`);
            }
        }
        const matchCallback = ({ url }) => {
            if (true) {
                if (url.pathname === captureUrl.pathname &&
                    url.origin !== captureUrl.origin) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`${capture} only partially matches the cross-origin URL ` +
                        `${url.toString()}. This route will only handle cross-origin requests ` +
                        `if they match the entire URL.`);
                }
            }
            return url.href === captureUrl.href;
        };
        // If `capture` is a string then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(matchCallback, handler, method);
    }
    else if (capture instanceof RegExp) {
        // If `capture` is a `RegExp` then `handler` and `method` must be present.
        route = new _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__.RegExpRoute(capture, handler, method);
    }
    else if (typeof capture === 'function') {
        // If `capture` is a function then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(capture, handler, method);
    }
    else if (capture instanceof _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route) {
        route = capture;
    }
    else {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('unsupported-route-type', {
            moduleName: 'workbox-routing',
            funcName: 'registerRoute',
            paramName: 'capture',
        });
    }
    const defaultRouter = (0,_utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__.getOrCreateDefaultRouter)();
    defaultRouter.registerRoute(route);
    return route;
}



/***/ }),

/***/ "./node_modules/workbox-routing/utils/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-routing/utils/constants.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultMethod: () => (/* binding */ defaultMethod),
/* harmony export */   validMethods: () => (/* binding */ validMethods)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
const validMethods = [
    'DELETE',
    'GET',
    'HEAD',
    'PATCH',
    'POST',
    'PUT',
];


/***/ }),

/***/ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOrCreateDefaultRouter: () => (/* binding */ getOrCreateDefaultRouter)
/* harmony export */ });
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Router.js */ "./node_modules/workbox-routing/Router.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */
const getOrCreateDefaultRouter = () => {
    if (!defaultRouter) {
        defaultRouter = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router();
        // The helpers that use the default Router assume these listeners exist.
        defaultRouter.addFetchListener();
        defaultRouter.addCacheListener();
    }
    return defaultRouter;
};


/***/ }),

/***/ "./node_modules/workbox-routing/utils/normalizeHandler.js":
/*!****************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/normalizeHandler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeHandler: () => (/* binding */ normalizeHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = (handler) => {
    if (handler && typeof handler === 'object') {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return handler;
    }
    else {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(handler, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return { handle: handler };
    }
};


/***/ }),

/***/ "./node_modules/workbox-strategies/Strategy.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/Strategy.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Strategy: () => (/* binding */ Strategy)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StrategyHandler.js */ "./node_modules/workbox-strategies/StrategyHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof workbox-strategies
 */
class Strategy {
    /**
     * Creates a new instance of the strategy and sets all documented option
     * properties as public instance properties.
     *
     * Note: if a custom strategy class extends the base Strategy class and does
     * not need more than these properties, it does not need to define its own
     * constructor.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
     * `fetch()` requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     */
    constructor(options = {}) {
        /**
         * Cache name to store and retrieve
         * requests. Defaults to the cache names provided by
         * {@link workbox-core.cacheNames}.
         *
         * @type {string}
         */
        this.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getRuntimeName(options.cacheName);
        /**
         * The list
         * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
         * used by this strategy.
         *
         * @type {Array<Object>}
         */
        this.plugins = options.plugins || [];
        /**
         * Values passed along to the
         * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
         * of all fetch() requests made by this strategy.
         *
         * @type {Object}
         */
        this.fetchOptions = options.fetchOptions;
        /**
         * The
         * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
         * for any `cache.match()` or `cache.put()` calls made by this strategy.
         *
         * @type {Object}
         */
        this.matchOptions = options.matchOptions;
    }
    /**
     * Perform a request strategy and returns a `Promise` that will resolve with
     * a `Response`, invoking all relevant plugin callbacks.
     *
     * When a strategy instance is registered with a Workbox
     * {@link workbox-routing.Route}, this method is automatically
     * called when the route matches.
     *
     * Alternatively, this method can be used in a standalone `FetchEvent`
     * listener by passing it to `event.respondWith()`.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     */
    handle(options) {
        const [responseDone] = this.handleAll(options);
        return responseDone;
    }
    /**
     * Similar to {@link workbox-strategies.Strategy~handle}, but
     * instead of just returning a `Promise` that resolves to a `Response` it
     * it will return an tuple of `[response, done]` promises, where the former
     * (`response`) is equivalent to what `handle()` returns, and the latter is a
     * Promise that will resolve once any promises that were added to
     * `event.waitUntil()` as part of performing the strategy have completed.
     *
     * You can await the `done` promise to ensure any extra work performed by
     * the strategy (usually caching responses) completes successfully.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     * @return {Array<Promise>} A tuple of [response, done]
     *     promises that can be used to determine when the response resolves as
     *     well as when the handler has completed all its work.
     */
    handleAll(options) {
        // Allow for flexible options to be passed.
        if (options instanceof FetchEvent) {
            options = {
                event: options,
                request: options.request,
            };
        }
        const event = options.event;
        const request = typeof options.request === 'string'
            ? new Request(options.request)
            : options.request;
        const params = 'params' in options ? options.params : undefined;
        const handler = new _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__.StrategyHandler(this, { event, request, params });
        const responseDone = this._getResponse(handler, request, event);
        const handlerDone = this._awaitComplete(responseDone, handler, request, event);
        // Return an array of promises, suitable for use with Promise.all().
        return [responseDone, handlerDone];
    }
    async _getResponse(handler, request, event) {
        await handler.runCallbacks('handlerWillStart', { event, request });
        let response = undefined;
        try {
            response = await this._handle(request, handler);
            // The "official" Strategy subclasses all throw this error automatically,
            // but in case a third-party Strategy doesn't, ensure that we have a
            // consistent failure when there's no response or an error response.
            if (!response || response.type === 'error') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('no-response', { url: request.url });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                for (const callback of handler.iterateCallbacks('handlerDidError')) {
                    response = await callback({ error, event, request });
                    if (response) {
                        break;
                    }
                }
            }
            if (!response) {
                throw error;
            }
            else if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.log(`While responding to '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__.getFriendlyURL)(request.url)}', ` +
                    `an ${error instanceof Error ? error.toString() : ''} error occurred. Using a fallback response provided by ` +
                    `a handlerDidError plugin.`);
            }
        }
        for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
            response = await callback({ event, request, response });
        }
        return response;
    }
    async _awaitComplete(responseDone, handler, request, event) {
        let response;
        let error;
        try {
            response = await responseDone;
        }
        catch (error) {
            // Ignore errors, as response errors should be caught via the `response`
            // promise above. The `done` promise will only throw for errors in
            // promises passed to `handler.waitUntil()`.
        }
        try {
            await handler.runCallbacks('handlerDidRespond', {
                event,
                request,
                response,
            });
            await handler.doneWaiting();
        }
        catch (waitUntilError) {
            if (waitUntilError instanceof Error) {
                error = waitUntilError;
            }
        }
        await handler.runCallbacks('handlerDidComplete', {
            event,
            request,
            response,
            error: error,
        });
        handler.destroy();
        if (error) {
            throw error;
        }
    }
}

/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the {@link workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof workbox-strategies.Strategy
 */


/***/ }),

/***/ "./node_modules/workbox-strategies/StrategyHandler.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-strategies/StrategyHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StrategyHandler: () => (/* binding */ StrategyHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheMatchIgnoreParams.js */ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js");
/* harmony import */ var workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/Deferred.js */ "./node_modules/workbox-core/_private/Deferred.js");
/* harmony import */ var workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/executeQuotaErrorCallbacks.js */ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! workbox-core/_private/timeout.js */ "./node_modules/workbox-core/_private/timeout.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_8__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/









function toRequest(input) {
    return typeof input === 'string' ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance instance calls
 * {@link workbox-strategies.Strategy~handle} or
 * {@link workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof workbox-strategies
 */
class StrategyHandler {
    /**
     * Creates a new instance associated with the passed strategy and event
     * that's handling the request.
     *
     * The constructor also initializes the state that will be passed to each of
     * the plugins handling this request.
     *
     * @param {workbox-strategies.Strategy} strategy
     * @param {Object} options
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params] The return value from the
     *     {@link workbox-routing~matchCallback} (if applicable).
     */
    constructor(strategy, options) {
        this._cacheKeys = {};
        /**
         * The request the strategy is performing (passed to the strategy's
         * `handle()` or `handleAll()` method).
         * @name request
         * @instance
         * @type {Request}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * The event associated with this request.
         * @name event
         * @instance
         * @type {ExtendableEvent}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * A `URL` instance of `request.url` (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `url` param will be present if the strategy was invoked
         * from a workbox `Route` object.
         * @name url
         * @instance
         * @type {URL|undefined}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * A `param` value (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `param` param will be present if the strategy was invoked
         * from a workbox `Route` object and the
         * {@link workbox-routing~matchCallback} returned
         * a truthy value (it will be that value).
         * @name params
         * @instance
         * @type {*|undefined}
         * @memberof workbox-strategies.StrategyHandler
         */
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(options.event, ExtendableEvent, {
                moduleName: 'workbox-strategies',
                className: 'StrategyHandler',
                funcName: 'constructor',
                paramName: 'options.event',
            });
        }
        Object.assign(this, options);
        this.event = options.event;
        this._strategy = strategy;
        this._handlerDeferred = new workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        this._extendLifetimePromises = [];
        // Copy the plugins list (since it's mutable on the strategy),
        // so any mutations don't affect this handler instance.
        this._plugins = [...strategy.plugins];
        this._pluginStateMap = new Map();
        for (const plugin of this._plugins) {
            this._pluginStateMap.set(plugin, {});
        }
        this.event.waitUntil(this._handlerDeferred.promise);
    }
    /**
     * Fetches a given request (and invokes any applicable plugin callback
     * methods) using the `fetchOptions` (for non-navigation requests) and
     * `plugins` defined on the `Strategy` object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - `requestWillFetch()`
     * - `fetchDidSucceed()`
     * - `fetchDidFail()`
     *
     * @param {Request|string} input The URL or request to fetch.
     * @return {Promise<Response>}
     */
    async fetch(input) {
        const { event } = this;
        let request = toRequest(input);
        if (request.mode === 'navigate' &&
            event instanceof FetchEvent &&
            event.preloadResponse) {
            const possiblePreloadResponse = (await event.preloadResponse);
            if (possiblePreloadResponse) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Using a preloaded navigation response for ` +
                        `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}'`);
                }
                return possiblePreloadResponse;
            }
        }
        // If there is a fetchDidFail plugin, we need to save a clone of the
        // original request before it's either modified by a requestWillFetch
        // plugin or before the original request's body is consumed via fetch().
        const originalRequest = this.hasCallback('fetchDidFail')
            ? request.clone()
            : null;
        try {
            for (const cb of this.iterateCallbacks('requestWillFetch')) {
                request = await cb({ request: request.clone(), event });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('plugin-error-request-will-fetch', {
                    thrownErrorMessage: err.message,
                });
            }
        }
        // The request can be altered by plugins with `requestWillFetch` making
        // the original request (most likely from a `fetch` event) different
        // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
        const pluginFilteredRequest = request.clone();
        try {
            let fetchResponse;
            // See https://github.com/GoogleChrome/workbox/issues/1796
            fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' returned a response with ` +
                    `status '${fetchResponse.status}'.`);
            }
            for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
                fetchResponse = await callback({
                    event,
                    request: pluginFilteredRequest,
                    response: fetchResponse,
                });
            }
            return fetchResponse;
        }
        catch (error) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' threw an error.`, error);
            }
            // `originalRequest` will only exist if a `fetchDidFail` callback
            // is being used (see above).
            if (originalRequest) {
                await this.runCallbacks('fetchDidFail', {
                    error: error,
                    event,
                    originalRequest: originalRequest.clone(),
                    request: pluginFilteredRequest.clone(),
                });
            }
            throw error;
        }
    }
    /**
     * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
     * the response generated by `this.fetch()`.
     *
     * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
     * so you do not have to manually call `waitUntil()` on the event.
     *
     * @param {Request|string} input The request or URL to fetch and cache.
     * @return {Promise<Response>}
     */
    async fetchAndCachePut(input) {
        const response = await this.fetch(input);
        const responseClone = response.clone();
        void this.waitUntil(this.cachePut(input, responseClone));
        return response;
    }
    /**
     * Matches a request from the cache (and invokes any applicable plugin
     * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
     * defined on the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillBeUsed()
     * - cachedResponseWillBeUsed()
     *
     * @param {Request|string} key The Request or URL to use as the cache key.
     * @return {Promise<Response|undefined>} A matching response, if found.
     */
    async cacheMatch(key) {
        const request = toRequest(key);
        let cachedResponse;
        const { cacheName, matchOptions } = this._strategy;
        const effectiveRequest = await this.getCacheKey(request, 'read');
        const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), { cacheName });
        cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
        if (true) {
            if (cachedResponse) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Found a cached response in '${cacheName}'.`);
            }
            else {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`No cached response found in '${cacheName}'.`);
            }
        }
        for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
            cachedResponse =
                (await callback({
                    cacheName,
                    matchOptions,
                    cachedResponse,
                    request: effectiveRequest,
                    event: this.event,
                })) || undefined;
        }
        return cachedResponse;
    }
    /**
     * Puts a request/response pair in the cache (and invokes any applicable
     * plugin callback methods) using the `cacheName` and `plugins` defined on
     * the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillBeUsed()
     * - cacheWillUpdate()
     * - cacheDidUpdate()
     *
     * @param {Request|string} key The request or URL to use as the cache key.
     * @param {Response} response The response to cache.
     * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
     * not be cached, and `true` otherwise.
     */
    async cachePut(key, response) {
        const request = toRequest(key);
        // Run in the next task to avoid blocking other cache reads.
        // https://github.com/w3c/ServiceWorker/issues/1397
        await (0,workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__.timeout)(0);
        const effectiveRequest = await this.getCacheKey(request, 'write');
        if (true) {
            if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('attempt-to-cache-non-get-request', {
                    url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
                    method: effectiveRequest.method,
                });
            }
            // See https://github.com/GoogleChrome/workbox/issues/2818
            const vary = response.headers.get('Vary');
            if (vary) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)} ` +
                    `has a 'Vary: ${vary}' header. ` +
                    `Consider setting the {ignoreVary: true} option on your strategy ` +
                    `to ensure cache matching and deletion works as expected.`);
            }
        }
        if (!response) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.error(`Cannot cache non-existent response for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}'.`);
            }
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('cache-put-with-no-response', {
                url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
            });
        }
        const responseToCache = await this._ensureResponseSafeToCache(response);
        if (!responseToCache) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Response '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}' ` +
                    `will not be cached.`, responseToCache);
            }
            return false;
        }
        const { cacheName, matchOptions } = this._strategy;
        const cache = await self.caches.open(cacheName);
        const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
        const oldResponse = hasCacheUpdateCallback
            ? await (0,workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__.cacheMatchIgnoreParams)(
            // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
            // feature. Consider into ways to only add this behavior if using
            // precaching.
            cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions)
            : null;
        if (true) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Updating the '${cacheName}' cache with a new Response ` +
                `for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}.`);
        }
        try {
            await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
        }
        catch (error) {
            if (error instanceof Error) {
                // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
                if (error.name === 'QuotaExceededError') {
                    await (0,workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__.executeQuotaErrorCallbacks)();
                }
                throw error;
            }
        }
        for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
            await callback({
                cacheName,
                oldResponse,
                newResponse: responseToCache.clone(),
                request: effectiveRequest,
                event: this.event,
            });
        }
        return true;
    }
    /**
     * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
     * executes any of those callbacks found in sequence. The final `Request`
     * object returned by the last plugin is treated as the cache key for cache
     * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
     * been registered, the passed request is returned unmodified
     *
     * @param {Request} request
     * @param {string} mode
     * @return {Promise<Request>}
     */
    async getCacheKey(request, mode) {
        const key = `${request.url} | ${mode}`;
        if (!this._cacheKeys[key]) {
            let effectiveRequest = request;
            for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
                effectiveRequest = toRequest(await callback({
                    mode,
                    request: effectiveRequest,
                    event: this.event,
                    // params has a type any can't change right now.
                    params: this.params, // eslint-disable-line
                }));
            }
            this._cacheKeys[key] = effectiveRequest;
        }
        return this._cacheKeys[key];
    }
    /**
     * Returns true if the strategy has at least one plugin with the given
     * callback.
     *
     * @param {string} name The name of the callback to check for.
     * @return {boolean}
     */
    hasCallback(name) {
        for (const plugin of this._strategy.plugins) {
            if (name in plugin) {
                return true;
            }
        }
        return false;
    }
    /**
     * Runs all plugin callbacks matching the given name, in order, passing the
     * given param object (merged ith the current plugin state) as the only
     * argument.
     *
     * Note: since this method runs all plugins, it's not suitable for cases
     * where the return value of a callback needs to be applied prior to calling
     * the next callback. See
     * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
     * below for how to handle that case.
     *
     * @param {string} name The name of the callback to run within each plugin.
     * @param {Object} param The object to pass as the first (and only) param
     *     when executing each callback. This object will be merged with the
     *     current plugin state prior to callback execution.
     */
    async runCallbacks(name, param) {
        for (const callback of this.iterateCallbacks(name)) {
            // TODO(philipwalton): not sure why `any` is needed. It seems like
            // this should work with `as WorkboxPluginCallbackParam[C]`.
            await callback(param);
        }
    }
    /**
     * Accepts a callback and returns an iterable of matching plugin callbacks,
     * where each callback is wrapped with the current handler state (i.e. when
     * you call each callback, whatever object parameter you pass it will
     * be merged with the plugin's current state).
     *
     * @param {string} name The name fo the callback to run
     * @return {Array<Function>}
     */
    *iterateCallbacks(name) {
        for (const plugin of this._strategy.plugins) {
            if (typeof plugin[name] === 'function') {
                const state = this._pluginStateMap.get(plugin);
                const statefulCallback = (param) => {
                    const statefulParam = Object.assign(Object.assign({}, param), { state });
                    // TODO(philipwalton): not sure why `any` is needed. It seems like
                    // this should work with `as WorkboxPluginCallbackParam[C]`.
                    return plugin[name](statefulParam);
                };
                yield statefulCallback;
            }
        }
    }
    /**
     * Adds a promise to the
     * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
     * of the event event associated with the request being handled (usually a
     * `FetchEvent`).
     *
     * Note: you can await
     * {@link workbox-strategies.StrategyHandler~doneWaiting}
     * to know when all added promises have settled.
     *
     * @param {Promise} promise A promise to add to the extend lifetime promises
     *     of the event that triggered the request.
     */
    waitUntil(promise) {
        this._extendLifetimePromises.push(promise);
        return promise;
    }
    /**
     * Returns a promise that resolves once all promises passed to
     * {@link workbox-strategies.StrategyHandler~waitUntil}
     * have settled.
     *
     * Note: any work done after `doneWaiting()` settles should be manually
     * passed to an event's `waitUntil()` method (not this handler's
     * `waitUntil()` method), otherwise the service worker thread my be killed
     * prior to your work completing.
     */
    async doneWaiting() {
        let promise;
        while ((promise = this._extendLifetimePromises.shift())) {
            await promise;
        }
    }
    /**
     * Stops running the strategy and immediately resolves any pending
     * `waitUntil()` promises.
     */
    destroy() {
        this._handlerDeferred.resolve(null);
    }
    /**
     * This method will call cacheWillUpdate on the available plugins (or use
     * status === 200) to determine if the Response is safe and valid to cache.
     *
     * @param {Request} options.request
     * @param {Response} options.response
     * @return {Promise<Response|undefined>}
     *
     * @private
     */
    async _ensureResponseSafeToCache(response) {
        let responseToCache = response;
        let pluginsUsed = false;
        for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
            responseToCache =
                (await callback({
                    request: this.request,
                    response: responseToCache,
                    event: this.event,
                })) || undefined;
            pluginsUsed = true;
            if (!responseToCache) {
                break;
            }
        }
        if (!pluginsUsed) {
            if (responseToCache && responseToCache.status !== 200) {
                responseToCache = undefined;
            }
            if (true) {
                if (responseToCache) {
                    if (responseToCache.status !== 200) {
                        if (responseToCache.status === 0) {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.warn(`The response for '${this.request.url}' ` +
                                `is an opaque response. The caching strategy that you're ` +
                                `using will not cache opaque responses by default.`);
                        }
                        else {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for '${this.request.url}' ` +
                                `returned a status code of '${response.status}' and won't ` +
                                `be cached as a result.`);
                        }
                    }
                }
            }
        }
        return responseToCache;
    }
}



/***/ }),

/***/ "./node_modules/workbox-strategies/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:strategies:7.2.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-precaching/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/workbox-precaching/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheController: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController),
/* harmony export */   PrecacheFallbackPlugin: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheFallbackPlugin),
/* harmony export */   PrecacheRoute: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheRoute),
/* harmony export */   PrecacheStrategy: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheStrategy),
/* harmony export */   addPlugins: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.addPlugins),
/* harmony export */   addRoute: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.addRoute),
/* harmony export */   cleanupOutdatedCaches: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.cleanupOutdatedCaches),
/* harmony export */   createHandlerBoundToURL: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.createHandlerBoundToURL),
/* harmony export */   getCacheKeyForURL: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.getCacheKeyForURL),
/* harmony export */   matchPrecache: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.matchPrecache),
/* harmony export */   precache: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.precache),
/* harmony export */   precacheAndRoute: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/workbox-precaching/index.js");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./node_modules/@docusaurus/plugin-pwa/lib/sw.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var workbox_precaching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-precaching */ "./node_modules/workbox-precaching/index.mjs");
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-restricted-globals */

function parseSwParams() {
    const params = JSON.parse(new URLSearchParams(self.location.search).get('params'));
    if (params.debug) {
        console.log('[Docusaurus-PWA][SW]: Service Worker params:', params);
    }
    return params;
}
// Doc advises against dynamic imports in SW
// https://developers.google.com/web/tools/workbox/guides/using-bundlers#code_splitting_and_dynamic_imports
// https://x.com/sebastienlorber/status/1280155204575518720
// but looks it's working fine as it's inlined by webpack, need to double check
async function runSWCustomCode(params) {
    if (false) {}
}
/**
 * Gets different possible variations for a request URL. Similar to
 * https://git.io/JvixK
 */
function getPossibleURLs(url) {
    const urlObject = new URL(url, self.location.href);
    if (urlObject.origin !== self.location.origin) {
        return [];
    }
    // Ignore search params and hash
    urlObject.search = '';
    urlObject.hash = '';
    return [
        // /blog.html
        urlObject.href,
        // /blog/ => /blog/index.html
        // /blog => /blog/index.html
        `${urlObject.href}${urlObject.pathname.endsWith('/') ? '' : '/'}index.html`,
    ];
}
(async () => {
    const params = parseSwParams();
    // eslint-disable-next-line no-underscore-dangle
    const precacheManifest = [{"revision":"da75faaeac1caf812af65ff4bffd3a69","url":"404.html"},{"revision":"6801b42a3ce8c32729bc9cab29eaa06e","url":"assets/css/styles.11098515.css"},{"revision":"473d7074eb85b4b6f655c25cbdc90603","url":"assets/js/004ac3fc.8dcfdbaf.js"},{"revision":"126c9762e169ef7f3246039951cc0c97","url":"assets/js/0078aabb.573af0fa.js"},{"revision":"b41ed49fb5c2957764d15aa2c9fe9750","url":"assets/js/01a85c17.edc4c2a5.js"},{"revision":"56d239dfb1cafb642fc0c7e07b507b48","url":"assets/js/02427a1f.bc17bab4.js"},{"revision":"fd8f06749b79267a0da9b0c88c59e24c","url":"assets/js/03064fa5.c1708b5f.js"},{"revision":"12b609a08190ad9d1948d2214ac30cd9","url":"assets/js/03521e43.f2d449e3.js"},{"revision":"193a3320aafe3454f3999b3f545f4f81","url":"assets/js/0373bcb6.832138da.js"},{"revision":"842c5c09c16ff714f400d617f398b1d0","url":"assets/js/057e8afe.58ad2495.js"},{"revision":"cbc8d10ad775322d31de25e7fda3ce92","url":"assets/js/06158f00.203e4c1e.js"},{"revision":"505e11bd48fc46fab3a812039dd36a61","url":"assets/js/061dbf8b.e90d870c.js"},{"revision":"30f1346a7480697feaa23d57d57af884","url":"assets/js/0620be3c.55299475.js"},{"revision":"37027f2f340bac88818e9165b481d539","url":"assets/js/071fefdb.c81c4a8b.js"},{"revision":"e93f70c10dc88835796d6f2e330b764f","url":"assets/js/08af526d.394aa5bc.js"},{"revision":"8bca9c9da296919a24b899be7406794e","url":"assets/js/0913d82f.601bab51.js"},{"revision":"aca33dc56fc463cd9f65fbadcfcaa0a6","url":"assets/js/092629ba.026f00bf.js"},{"revision":"f2de0afebbab51fdb9ed8a1967392e1f","url":"assets/js/09d33a07.8e1c5aac.js"},{"revision":"ecfaaa0b72a743e72ff4e40e57afce45","url":"assets/js/09e5bd16.05263e6a.js"},{"revision":"27e924d29b1def53e854e60d980d0e9b","url":"assets/js/0a126957.c20c6980.js"},{"revision":"bf26e8c32052e5dc75062b37a237a8d0","url":"assets/js/0a5cb152.de0fa2ec.js"},{"revision":"ffd138964179009e023ca649782dae38","url":"assets/js/0b46c7c0.d1c469f8.js"},{"revision":"a8bc6807ba92a26e9df6453c3e76f9dd","url":"assets/js/0b9a1e2d.d9951262.js"},{"revision":"a2d0398baad16a3bae7a0d31ca63d78a","url":"assets/js/0babe898.82b6c6bf.js"},{"revision":"61eb840c9371e0f984c07ee7bcbcb3a0","url":"assets/js/0bed2abc.5981779e.js"},{"revision":"8cc1903caca2b6706a030413e52d55ce","url":"assets/js/0c2c633d.97880613.js"},{"revision":"2ec5cb5237b094829c8d9bb44acd1d93","url":"assets/js/0c4e94b4.42e01e43.js"},{"revision":"dcb3cf749017ccf9ba2e439e6af5aae6","url":"assets/js/0cf60a5c.2d12647a.js"},{"revision":"e33da787683e160588cba782068960a0","url":"assets/js/0db29d41.721400de.js"},{"revision":"6d8e7ea32bf3367eb2f8314950bba4a5","url":"assets/js/0db2ed9e.fef5228b.js"},{"revision":"23664e9f40ee57135565fe76bb429a82","url":"assets/js/0deba528.3b6718cc.js"},{"revision":"43b2994e969ac6f8d0fd8e2505f3fc5e","url":"assets/js/0e36e623.e2612309.js"},{"revision":"52f8c4ecea50195564463b05f14151f7","url":"assets/js/0f53fe26.bbfbf8d1.js"},{"revision":"7a6ed999217d87232535a2ab268ccbd9","url":"assets/js/0f5f906f.5d06a00d.js"},{"revision":"01cafe9e9affa6615cb372b4a551760f","url":"assets/js/1089b23d.9ddfbb5f.js"},{"revision":"620d167ad6b667d79fd177e23e5c03da","url":"assets/js/1186.04933b10.js"},{"revision":"7391d1cd374aaeca15c88ee7bdca0551","url":"assets/js/121ca23b.2723d900.js"},{"revision":"39eabc7463c717a382b0b702fddee331","url":"assets/js/1296a571.b72dbb40.js"},{"revision":"1cd8ceb3e8fb43b07af82b2e23483654","url":"assets/js/1477.8beabcce.js"},{"revision":"1d39ce3e3f41fedb747bede92d7864db","url":"assets/js/1531.4af673ae.js"},{"revision":"249055d6e78776c15ecb4c185b610c27","url":"assets/js/155.76b0a47a.js"},{"revision":"b04e16d53eaf5eb1cf2436f8c59b34ef","url":"assets/js/15641b52.09e15d68.js"},{"revision":"7036e495e7cb2700bcfa6deac8c66388","url":"assets/js/1566ca9f.56e159db.js"},{"revision":"1d45bf4483e63aadbc1b262b8b146378","url":"assets/js/165.b433df7e.js"},{"revision":"53e16eaff1caddb9df318ae2fbb21d87","url":"assets/js/1689.5ced7f22.js"},{"revision":"7a143d86b797a33512bd8213988fe4b5","url":"assets/js/16c33839.1646b95c.js"},{"revision":"0469e5cfb947161fc78d73bd2f8ac330","url":"assets/js/1711.283fbe33.js"},{"revision":"91963706d511a31dd689f43cdf5f61f2","url":"assets/js/17896441.d06c8e82.js"},{"revision":"248b48ae81d9e7f63161587d99e48523","url":"assets/js/17b194bf.563ce497.js"},{"revision":"b95809739e3743852df31b301f8ccf6a","url":"assets/js/17b65e6f.4e8421eb.js"},{"revision":"cb2c7fa1edc793bb430286e121c3d504","url":"assets/js/186863e3.3cf07c7a.js"},{"revision":"a931b61c2792b8c2e62c8f7c9ca01d32","url":"assets/js/188235d8.07d43371.js"},{"revision":"3468e87dba7e62acbc19e1c5faeb38a5","url":"assets/js/19d17ce0.1d187992.js"},{"revision":"adeb00380603affcbc7c9730b241c2de","url":"assets/js/19d507ef.f65dd073.js"},{"revision":"c979b80dc259d1458cab1ec3df8e643b","url":"assets/js/1a08160c.f5676619.js"},{"revision":"cdd0d69e404e6de9703ac90d53860449","url":"assets/js/1a4e3797.1bfba988.js"},{"revision":"137bcaabf865f461c8e9bcca8c6e871d","url":"assets/js/1a77df25.369fdfa7.js"},{"revision":"820a260e84244003f9826d1ab5edc2be","url":"assets/js/1b2e0869.2398a275.js"},{"revision":"d093966883221afe75a8a25b4634bff2","url":"assets/js/1b72026f.b74fdd14.js"},{"revision":"828afcb2e8a0ae2e64e66cef036c9b09","url":"assets/js/1b79bcef.ccea14ed.js"},{"revision":"fa2ee4d2a12cf0a8162861aad0b39d84","url":"assets/js/1d78b6ea.f6262f05.js"},{"revision":"ccb429f6b3240da321d6c16532395b52","url":"assets/js/1da6b051.7b54fdc4.js"},{"revision":"4805b24bde11af1a1b96f03bfda01990","url":"assets/js/1de903ef.811f1798.js"},{"revision":"1f00e77eb4384cf2dc547f426c308a61","url":"assets/js/1e7c500b.c648c93c.js"},{"revision":"dfae87dd9963b80662f2931d75f6630d","url":"assets/js/2063472f.89a4510d.js"},{"revision":"2108d5e2d3452423892610c80ec193bd","url":"assets/js/20be3b86.300585a1.js"},{"revision":"44a3817f3f3c1a83c763bfcd6ca1a619","url":"assets/js/2130.40a58567.js"},{"revision":"b18c5cef5e8b76ed0b2969f2373462b2","url":"assets/js/21418ccf.673542c8.js"},{"revision":"378bc0acd585c59a218ad772d73fd71b","url":"assets/js/21494635.7b730e64.js"},{"revision":"76ace52ca9cd6a0bf08b1696f3fa676a","url":"assets/js/2237.aac3e61a.js"},{"revision":"cfa7ea8227b6c0436988cc6117ce9b0e","url":"assets/js/2247.a0efa114.js"},{"revision":"59b79919a2d3c0168dbd97a0280ced15","url":"assets/js/2250d5bd.8673a8d8.js"},{"revision":"18b48fe8569d7bef2ea31b8cbee68248","url":"assets/js/2334.f09b137e.js"},{"revision":"df64ae20257b23077b2c4b044b2bf606","url":"assets/js/235e3c7d.710b523b.js"},{"revision":"e608a4de4a128b4f1f3b2396bbb6fc9c","url":"assets/js/2387.5ea661ae.js"},{"revision":"af2767f69e710f6630cedbfa02a2291e","url":"assets/js/256884a7.18124fe1.js"},{"revision":"65e7db559e9adcbb4fb113291133846d","url":"assets/js/256a529b.7ead4dca.js"},{"revision":"181258a9cd6992fdfa34a36da6ac16cf","url":"assets/js/25d3ddcc.e4efe8b2.js"},{"revision":"cc5cb36739685d81fcec74ddd0ef47c7","url":"assets/js/25d40ed3.6d32b77f.js"},{"revision":"0d602bbf76f7c42ecdefbc9d7a083710","url":"assets/js/2763.26db21a0.js"},{"revision":"6d8f029291da324139e8c28d31af19be","url":"assets/js/27dc25d8.18ed7def.js"},{"revision":"4cbdb8a6ecd6d91314bbc6ebaf9b1e47","url":"assets/js/287463b3.83c45612.js"},{"revision":"a3ba62c07547ce8068674650bd083225","url":"assets/js/28cf3c08.64b82b2a.js"},{"revision":"9008ffa7c4aa4ad6cc5ab694ccab26d0","url":"assets/js/2a989a19.26831320.js"},{"revision":"0eef3d6bea6199411356fec182654599","url":"assets/js/2b1aa126.762f9c18.js"},{"revision":"b80cb684b0395b1d510c3606783df1f7","url":"assets/js/2c70ccc9.c98dde51.js"},{"revision":"d057aa89104307f0feeba5cf2b42cc34","url":"assets/js/2e296cc1.b790e924.js"},{"revision":"151c3e7ae0145746c592932161b8c58d","url":"assets/js/2faa862c.2b4a9900.js"},{"revision":"5a8419e0f33a87ea01762cea1255ea36","url":"assets/js/2ffe24e2.66f6eeda.js"},{"revision":"a364aa9b6701053d6da205885f8faed6","url":"assets/js/307c7551.8e184adf.js"},{"revision":"a7532902af07f7e9bbee014497cd58d1","url":"assets/js/3142d5d3.e3d03a25.js"},{"revision":"b19b059a09d5c0539c3946dd2e4dc854","url":"assets/js/32ae29b8.5289bab6.js"},{"revision":"a85e06ca3f79f1aed8d8f7b5cd14efe3","url":"assets/js/32f380dc.63d98074.js"},{"revision":"a6a0ef900634afad6f3059f01337898c","url":"assets/js/32f6102e.65a9cf75.js"},{"revision":"30ff0d83e42854bb05d37d165a939cb2","url":"assets/js/333c25f8.d9c7d08b.js"},{"revision":"ff7d5f9234bad64dd8ab83ac72155663","url":"assets/js/3364.bddd095c.js"},{"revision":"7b561519d446b108ed532ea6253dfc2e","url":"assets/js/33d295eb.b90b9d28.js"},{"revision":"472d81f451897afa105169a76e33bd3c","url":"assets/js/33d51c50.6416f711.js"},{"revision":"24e3ccb1bce749943f13323a5a37e5e6","url":"assets/js/33f4a7c5.0797b569.js"},{"revision":"9c555fcf0ca9333cebc2a51762eb419b","url":"assets/js/3411b1e7.9d2866a6.js"},{"revision":"e6d15e5569669774e19b159db1281382","url":"assets/js/35cab78f.14e34c4d.js"},{"revision":"86ac3b40abc4fe9672383a8c75907433","url":"assets/js/36061b7d.8a766581.js"},{"revision":"bca427be5db61cb38563994e8143fc31","url":"assets/js/3624.ba9146e4.js"},{"revision":"8daec30b25d2965dd266e5eda53e4d8a","url":"assets/js/36994c47.5d7c9c65.js"},{"revision":"98b8e2174135341555f4447dea38bba5","url":"assets/js/3720c009.4f03b50a.js"},{"revision":"07cd2af1ebd2b92cb94cc93f61a462cc","url":"assets/js/3840.a0474c55.js"},{"revision":"2a451d409e6ea6a4c499d62f3d6234e5","url":"assets/js/387a42d1.90cafac0.js"},{"revision":"004fc9c3a08a2d17f390a56cf31ea161","url":"assets/js/395c71eb.c4fe94e5.js"},{"revision":"93a02177ded13c6878b3a8700803b3d0","url":"assets/js/3a406dce.56ccd220.js"},{"revision":"bcfe8e37c3192e6c46e38e13cba51963","url":"assets/js/3ac888fa.0cb960c1.js"},{"revision":"838ffc261f5c622c3756c16b55be708a","url":"assets/js/3b5cd451.33cd54ad.js"},{"revision":"d82f8cd8fc1fb8fb3bd9b552c625f5dd","url":"assets/js/3bd679d5.3b076959.js"},{"revision":"50df990b1f59b09d6b3c47f46723fcea","url":"assets/js/3bfa0b39.17765674.js"},{"revision":"65ea4086a42f1f03e8080ca1b6baa318","url":"assets/js/3dd586dc.908a9662.js"},{"revision":"a7f21799ac366fe3b5f7c69f004eefc1","url":"assets/js/3ee1a63c.67b896ca.js"},{"revision":"268a8c9e91080814699db0d2a6ce2b80","url":"assets/js/3ee83040.59dae8fa.js"},{"revision":"1cc1822bb32885f09d331bcc8c4355ec","url":"assets/js/3f62788c.323f511a.js"},{"revision":"dd84dff4f725de900e9fb9548ee0bfae","url":"assets/js/416.7a525a59.js"},{"revision":"c7770272fc0217118e20eef1670fb87b","url":"assets/js/4212d3f0.07a09ceb.js"},{"revision":"a6f256e136da9cd50a3e85f000f06ff0","url":"assets/js/427e410e.5aa62d05.js"},{"revision":"c962376f2b4f999d4681761352d76e31","url":"assets/js/42b9d536.e13c936a.js"},{"revision":"e9305c262df5f0916454f2cedce4e20a","url":"assets/js/432dcf0d.ffde25f2.js"},{"revision":"9f92250ab7e833916dd22d165a266207","url":"assets/js/4334.8363f873.js"},{"revision":"fc05ea0add149c1ba0c7c135400a18f7","url":"assets/js/439.ae03c730.js"},{"revision":"d381029e9f11c06bba695ef4df3784d6","url":"assets/js/43b40f28.47ad38e1.js"},{"revision":"5be065d471d7465bac120eb4af6c6da6","url":"assets/js/4445.a34331df.js"},{"revision":"81fca7f4885c62846130af61b63a5fc9","url":"assets/js/4449.f7edd497.js"},{"revision":"9d2de2799196ddbb93c91f1f186b4898","url":"assets/js/449ef5ce.65c732de.js"},{"revision":"8d1732b5fd9835ee9d825f09c45ff507","url":"assets/js/45bd279e.5b0b798a.js"},{"revision":"644a884d910474ba15608b1e400614d0","url":"assets/js/45d793b8.4b0359c2.js"},{"revision":"85a0bc11f98b04651107e8d5ed5047f8","url":"assets/js/46c2317d.13bf64f6.js"},{"revision":"ac87ef0477d158ffbb778661f00518ed","url":"assets/js/46d5a220.9fa17466.js"},{"revision":"afc279c8f8fb156441adbbdef5c6c650","url":"assets/js/484.e32d3d24.js"},{"revision":"7cf4d31b759dec77fb97d93d9dcd2e24","url":"assets/js/48407704.1a9c4f71.js"},{"revision":"74460c35a82ec4d7a16cda8bbecb9363","url":"assets/js/48739195.a2e6864e.js"},{"revision":"9aa07d1011bce6dbeb9b1ad47688d4d6","url":"assets/js/48d54cd0.c81aee70.js"},{"revision":"1b393db9186a0086c36eab5043275a42","url":"assets/js/4aadf291.074e07e4.js"},{"revision":"7bf631e8747b72852de736df7f7d7d1b","url":"assets/js/4b100ba1.d84a9aa0.js"},{"revision":"006f4ff8a35cd3fb982e3799f7b903f8","url":"assets/js/4ce3a6bf.3847e3be.js"},{"revision":"e41b9d4ae134c85c33237a66ed2e8d24","url":"assets/js/4cef29a2.3e6435b9.js"},{"revision":"a3c2a28c86a3bc7bb3d0086a2736ea74","url":"assets/js/4cf69d0c.4d9a03f8.js"},{"revision":"f9e9dc9ad7323d65043fac4bd535f198","url":"assets/js/4dade517.040110ab.js"},{"revision":"552cd7fd5ef59aba4730c69e0843cd4c","url":"assets/js/4db5b308.016ab6e3.js"},{"revision":"dbf36c47b3ce4fa5b75f3ca2ace45c38","url":"assets/js/4db6d391.9943705f.js"},{"revision":"0f490484d0bb834ade22294d655f8617","url":"assets/js/4fadc70b.3a6f97a0.js"},{"revision":"e524decf4db6273311b33eac6a21c09e","url":"assets/js/52f0d86f.15a3ea0c.js"},{"revision":"41c721106fcf12709de727b76efc8783","url":"assets/js/5341c3ff.08c2e54c.js"},{"revision":"f9ed4d94e6b3f19dbcb63f956a3e1255","url":"assets/js/53a2ea48.2307d54a.js"},{"revision":"fd070ec8ef957d896e53b592fa1216f0","url":"assets/js/54d238c8.1ea1443d.js"},{"revision":"97ab2642bda78f6fd4f1b9e13910c555","url":"assets/js/5552.0218a465.js"},{"revision":"f7b21b62b696ff6430ee958e8ceb7580","url":"assets/js/5606.ba6ad0fa.js"},{"revision":"51770664c24c05f4ba032ac58ba595a7","url":"assets/js/57dfd3d9.59a9b16f.js"},{"revision":"e862be60120e449d5cde25a8c3e75a40","url":"assets/js/5905.c2b80c5b.js"},{"revision":"085987fca714bb92b5f49ff58c3289f2","url":"assets/js/591fe269.ac4453e7.js"},{"revision":"d642fc98347695fca0c2b86ba630d6e4","url":"assets/js/59bad975.bd13a96e.js"},{"revision":"8c40b88ea6dd07ff6ef190eabb7b36b5","url":"assets/js/5a4962bd.9bf86493.js"},{"revision":"f553a8ad7711ec41da50e1034ba340ea","url":"assets/js/5ad23b58.176c7615.js"},{"revision":"5bb9163bbae48aaf165df9c8093ee516","url":"assets/js/5b266b25.82e31956.js"},{"revision":"0b0dc1dc986ada3ffd420115893153cf","url":"assets/js/5b682502.b25aaa71.js"},{"revision":"458cb6492d766910a09ba4a9873a6214","url":"assets/js/5b9de1e5.c65b87e5.js"},{"revision":"bc10d12d773764320c9d8cb2c76b4551","url":"assets/js/5ba5c40f.08da1532.js"},{"revision":"05a9037ef346fb348c4c3381379d3ee6","url":"assets/js/5c7e4856.8bd91bb3.js"},{"revision":"4e4f5d60f4b5882517bda2ad2ef20af7","url":"assets/js/5ca774f4.8b0277ed.js"},{"revision":"b87a3ae951b3957139d7ca220afb867f","url":"assets/js/5e95c892.5a7e12e9.js"},{"revision":"65b1a689f2e9659c6f741b8fd7e23daa","url":"assets/js/601b1dec.47efbd49.js"},{"revision":"910f38a0676af8c0c0b9717ea74c4e4d","url":"assets/js/607cd69e.ec2f7d47.js"},{"revision":"985ac8c171151cbcb2d1fa62090f2992","url":"assets/js/60a904a4.c1ad4cd6.js"},{"revision":"fd3667804aa78821ecf38e6d6ab29d2f","url":"assets/js/6127a2d6.ecab9df1.js"},{"revision":"b3f6ced85993a7c234dd8978a92f7355","url":"assets/js/616d3ff5.48d3ed67.js"},{"revision":"2ce979b6608691f7d5bff9818cd4c9bc","url":"assets/js/61a03dff.1ce2a007.js"},{"revision":"468e55a21d8f230bc37c46d771495bca","url":"assets/js/61b7842c.14aa0f10.js"},{"revision":"136e71bc3340413b229a333755ab0541","url":"assets/js/621db11d.aacd28be.js"},{"revision":"09a388e33485c32db5f663f9abc8c3d3","url":"assets/js/6295378b.13b3e496.js"},{"revision":"e2cac00847a435393a22fa104721283e","url":"assets/js/63d38e9b.f3a47e08.js"},{"revision":"f970515ef86bef1878e46cae7c4f4f53","url":"assets/js/63f519af.a40c8f7b.js"},{"revision":"b794b00f91d4ca011d224ad1aa6f2d98","url":"assets/js/6452.ae209f53.js"},{"revision":"b99abf0775c01ad866f153b87a32e59d","url":"assets/js/6594.3612c483.js"},{"revision":"fd09af0fc136d881321abe5512175276","url":"assets/js/65ec84db.a31281a9.js"},{"revision":"60b3ebc1e69a496bed06cc6479fa086c","url":"assets/js/66a6b403.67c6dbb0.js"},{"revision":"12c44931561aab175b56e27264c0e2de","url":"assets/js/66b3f856.28381ccc.js"},{"revision":"471a6d070e1196fece69a2eb144215f8","url":"assets/js/674da8ab.f8d763e2.js"},{"revision":"1c7ecf62777ee44ffbb16603949d43e6","url":"assets/js/6790.2a9f07b5.js"},{"revision":"22648893a01e0d7e187eccfcf6de134d","url":"assets/js/681e48f5.2cebbbf1.js"},{"revision":"81b7f9ff8caf72a88a37bbafa271a8c4","url":"assets/js/6875c492.96354251.js"},{"revision":"be830e61db2f37c1d67e1da251b4806e","url":"assets/js/68bbb090.f9513e86.js"},{"revision":"650018394faba1d41b768d4f402c147c","url":"assets/js/6a333937.d3b7c7bb.js"},{"revision":"892391a9cbf316a08dfb4e9c5d45f9f4","url":"assets/js/6acd822a.4e537a51.js"},{"revision":"e78598229f131da13cb4e2596d089aaf","url":"assets/js/6c0501b3.6766f905.js"},{"revision":"0259e9367e93881c2c596eab356f4b3a","url":"assets/js/6dc57182.ff11c5e4.js"},{"revision":"0d73cc34d667a6d31d49408ad5f9eb97","url":"assets/js/6eba45aa.a2723532.js"},{"revision":"925ab377d2215103a7ed2be48b43cec6","url":"assets/js/7032.d3e5b295.js"},{"revision":"63bf7d0132198fa5d8ebcc90a6e05a0d","url":"assets/js/7060.905522c2.js"},{"revision":"0b68fb4bb0bcf7a9e00023c848630f7d","url":"assets/js/71dd76ad.45945e0f.js"},{"revision":"041ff844cbd43c35cbbc9b48b8344ea2","url":"assets/js/71ebaf84.3fcd53f3.js"},{"revision":"a5936bc8fac8435eb30c0fad14a61adc","url":"assets/js/7239bc36.ca95d182.js"},{"revision":"fc5a7f2b549b27df71bd8fa3bd61fae8","url":"assets/js/729fa07d.f4ab9e4d.js"},{"revision":"e9bd159201c132545354157be2c520df","url":"assets/js/7357.b002a7c9.js"},{"revision":"dadf5f07a410c47f8530078287d0446d","url":"assets/js/73cc395b.91f9f8e7.js"},{"revision":"9124baedbd06ae555607e4f54b2a6664","url":"assets/js/76475a78.d1e16867.js"},{"revision":"214c3e4c10164b0fec15432641b16d28","url":"assets/js/770e4053.c1ba7796.js"},{"revision":"d366d61b7bf94c2999a4b7ea97fa10d5","url":"assets/js/7723.0fa492ba.js"},{"revision":"bab5a1b41149b56d2064fc3bfef2dc44","url":"assets/js/77aa8110.4cd33e2e.js"},{"revision":"4cc7acf7cdaa24ed822951380c501fe4","url":"assets/js/7839f831.52ed7056.js"},{"revision":"897d4703993baf4504d8881d4b009722","url":"assets/js/7973f19b.98a47d7e.js"},{"revision":"eb76ecb92af262defbf04ed93ddb88af","url":"assets/js/7984a109.86387755.js"},{"revision":"cbaece520dbe5c13905c348d16d429a6","url":"assets/js/798ddc74.ee93b5de.js"},{"revision":"4df230be81909f616538a842b45e3d75","url":"assets/js/79adcd51.71870342.js"},{"revision":"cd67870e4d95df8d78a4e8799121db29","url":"assets/js/79f63335.c1b31db4.js"},{"revision":"2eb308d6f8dcb03fee54ebe7e33a66a5","url":"assets/js/7a9cc789.11d1149a.js"},{"revision":"263fabccac023ac59d392cce41116cda","url":"assets/js/7ae0df9d.622f4ff7.js"},{"revision":"b468353073fccf482ed99c7aa5611609","url":"assets/js/7c563265.941bccd5.js"},{"revision":"6ce8055358dce8148333f44dde0848af","url":"assets/js/7c72750c.31a0c2db.js"},{"revision":"a6e33a07f3705aed29312c5d73e9d761","url":"assets/js/7cbe97b0.ef359ea4.js"},{"revision":"634363c622197d89e4af83fdcaf2c955","url":"assets/js/7cc02634.362c3d10.js"},{"revision":"199c26c118c7877d3981bda37c426d08","url":"assets/js/7ec4b3d0.c4cb63dd.js"},{"revision":"e452844900b8f63da69e70ac69ebb70a","url":"assets/js/7f05f210.784d2e3a.js"},{"revision":"354c57cdfed0bf049b7d5a754f7d8b7d","url":"assets/js/809e3d9c.9f6523a5.js"},{"revision":"de38dc2c34da422e2d9bcd64d485bfda","url":"assets/js/814f3328.55b9ae60.js"},{"revision":"250526cbfd98b8db09ab86947aba82ee","url":"assets/js/8158.4a1c3978.js"},{"revision":"3653cf3b7b7bcc5194bdc3fa28a5bf9d","url":"assets/js/8174.2720b0c0.js"},{"revision":"3c1ef791539b1d661bc6d30bbda1bfd9","url":"assets/js/822bf431.73652c31.js"},{"revision":"3ef2a8c7f017221a583aac8e85db914d","url":"assets/js/8272.5f7996ab.js"},{"revision":"63fdb614139d2840e66b629b72ddf99e","url":"assets/js/82e4152e.04545bf8.js"},{"revision":"b7b2f1fb6de16715fa90f12e5dcd0b25","url":"assets/js/8379.ea9f105d.js"},{"revision":"cd4c5e658169494067c1c076a20943cd","url":"assets/js/838b1121.ef4e8025.js"},{"revision":"be2582180ff89e0a2087eafa6910a0fe","url":"assets/js/8444f0e5.78d23da7.js"},{"revision":"4d02daff1357cfeda06d308f6d5b9e3f","url":"assets/js/8496.23545ed9.js"},{"revision":"75c52630b2802c4e4656d777ddd2b121","url":"assets/js/8522bfb7.91aa0bd8.js"},{"revision":"a79566041d239b1ae57da0bcdd50f90f","url":"assets/js/85aeac62.c147e529.js"},{"revision":"87e8175257f867ef4dc814c4858384d1","url":"assets/js/86719955.20008e0d.js"},{"revision":"cc09ef4beb5ad3c63d6bf0e8c9111cdd","url":"assets/js/86b6e2a1.00bdc984.js"},{"revision":"05b1440a16676c2b995cf609b00a9570","url":"assets/js/86cc8824.aaf2b180.js"},{"revision":"75def889e6d089aa83fc918b10d0ddfd","url":"assets/js/87016971.cf9e96a4.js"},{"revision":"99a545eab529e970e5d98aa1d7ebd4f7","url":"assets/js/8731.dfc1086a.js"},{"revision":"a0d904e15aa4bec3e9d7898644066582","url":"assets/js/873d149d.385ca11b.js"},{"revision":"4a29e1bc1a9ea3a3df9e402a0e1d3ed6","url":"assets/js/87464925.682df485.js"},{"revision":"311f8bb541fdda067ee03bc14b394cc3","url":"assets/js/879d2510.4dd0b210.js"},{"revision":"cf52792b06dc7bcc61d1ab6a6ef25e74","url":"assets/js/890.2d2c6f9b.js"},{"revision":"7e8ed02802458d1379e7626ad56bedfc","url":"assets/js/8913.1eb9f4e5.js"},{"revision":"20da554c5e8cc89d06f8b5dca680eea5","url":"assets/js/892c6f1b.2811d24f.js"},{"revision":"1ac6c9492eeb4d58e9c8a5cd07929005","url":"assets/js/8998.dbe68242.js"},{"revision":"b57e9ad4cd1a05d1a0d2735e1824b791","url":"assets/js/89b2341e.d777e425.js"},{"revision":"3be111f8e2de122e8813ad9f237d9230","url":"assets/js/8b139be3.f5014243.js"},{"revision":"bae463cb97b05736c6e474efb80fa4e9","url":"assets/js/8cbc0fc0.4d733042.js"},{"revision":"8a3766238e3ce97b38c4f1fbfa945433","url":"assets/js/8f5e086c.ace6015d.js"},{"revision":"5fcded88e3004f5a985d3238696225f7","url":"assets/js/8ff16d7e.8e087d4d.js"},{"revision":"3f5f4141e5ec5118e90a4db13684f55d","url":"assets/js/912d0479.97cd59fd.js"},{"revision":"4e1c0fac66f1f3f527b7ca633c70d0e4","url":"assets/js/920628c0.b285c847.js"},{"revision":"3bd17f6772c3c6625e88de8906bd13dc","url":"assets/js/921.0812902f.js"},{"revision":"01e0d845974d06fb57495a750f9739ee","url":"assets/js/9262a5f9.f4a8fafd.js"},{"revision":"00a4718ffdef504fa7b844112ac27804","url":"assets/js/9272.d217f31f.js"},{"revision":"8ea90d30cd00d69e7cf47a9d6612fe0d","url":"assets/js/935742b9.42e8ba44.js"},{"revision":"197e135f5a900b0076d62c2cabc1d7a1","url":"assets/js/9368.06439fce.js"},{"revision":"0a81af2f0c9303c447d23f0910138e41","url":"assets/js/9424effd.79611aae.js"},{"revision":"7bf8d2e20d4a7af11c06c206f2faea95","url":"assets/js/9664.33aeb822.js"},{"revision":"2f8f9a52b488771717f5ecb7ddbbf173","url":"assets/js/9677324b.b4d58bb6.js"},{"revision":"9e79a08ceda8a92053d97d8904e27a3f","url":"assets/js/96f1682c.d1d92d15.js"},{"revision":"558e2831650a004d3bd1a51cfb5df5c5","url":"assets/js/9720.505ab10f.js"},{"revision":"12008e8f162a9c766de0611d47a2bd8b","url":"assets/js/97279f9f.cd66adf9.js"},{"revision":"ea60e4d061428bcef42172439460dc0d","url":"assets/js/9730.f160a174.js"},{"revision":"e9603a755b379dbea8a183b2e793aa8a","url":"assets/js/9793ba0c.580a7c83.js"},{"revision":"76bbbc728b5c1cb23149dee6431a3260","url":"assets/js/97a80b2f.979e4c3b.js"},{"revision":"5277b8f6be0628d317275dff1e1d0e0c","url":"assets/js/9802.0e34a320.js"},{"revision":"aed34abd32793e6897cffe333346d06a","url":"assets/js/9875.363be557.js"},{"revision":"b78b77ba37abcaeb2a5b75cd41762e0a","url":"assets/js/9939.a0f105e4.js"},{"revision":"516a19680fa2e16b8a19f011413b266a","url":"assets/js/998300af.0e184ace.js"},{"revision":"a2a95a3555f5b7f7fa519074a7da629a","url":"assets/js/99d9e2c8.ba66702d.js"},{"revision":"746910d8c9ab41aae9454e7d8df3f936","url":"assets/js/9b96622d.bdeb744f.js"},{"revision":"e5bb431d1743d8635f3ac974fe4d224c","url":"assets/js/9c3dfd6b.8286cc8c.js"},{"revision":"b119c28b79e88fb7f02499841cde9c18","url":"assets/js/9e4087bc.4ea8386a.js"},{"revision":"65672d80e68dd539e8f62989eecdeb34","url":"assets/js/9e9d8604.a13ea621.js"},{"revision":"e6b766f8f2ba287e8192575b4b022abd","url":"assets/js/9ed85882.d6a750bd.js"},{"revision":"8d9a5932bb3519cd00f2d06370894768","url":"assets/js/a1b34bea.9ed5c62a.js"},{"revision":"e0babb598f756e50af3f5297936397cd","url":"assets/js/a26571ff.2cf91e62.js"},{"revision":"123405d9bb25913f843b661b00c7ada4","url":"assets/js/a2befa47.7ff31852.js"},{"revision":"ce7940cf9f0cbcb31df33390c4c24719","url":"assets/js/a381f6a4.11aaa60a.js"},{"revision":"7297e6a6e97dd24ed66c52ef897fc5cf","url":"assets/js/a3df3286.a7f9602a.js"},{"revision":"dae34a7c2c4bc74b6288225c76c9a58e","url":"assets/js/a48ac673.fc0aab00.js"},{"revision":"b087adf95e02f86b40d9f93944295436","url":"assets/js/a6aa9e1f.c41fe1f3.js"},{"revision":"48d5f11f4d6111bc698a6c60eeed2b8f","url":"assets/js/a6ea7888.ee8e83af.js"},{"revision":"ae9f60062336ec539e2aec64c46644b1","url":"assets/js/a6f95485.a3d4504d.js"},{"revision":"9f86616af9e4bdee5af7696c91e1b0f1","url":"assets/js/a7086333.fdf1084b.js"},{"revision":"30304371ba119e585067750999264200","url":"assets/js/a732441e.f171716a.js"},{"revision":"0d0a77c493e0396b34ef64668fb7a8d7","url":"assets/js/a7456010.f392c975.js"},{"revision":"5b9ee8bd5c5f61e26c6a7cbfe95549ed","url":"assets/js/a7bd4aaa.1ce93397.js"},{"revision":"e4333c3ae0a5c5aeaf114c32c8e98d24","url":"assets/js/a7c398fc.79718112.js"},{"revision":"29444de9e292aad7b4c22f5afe657d8d","url":"assets/js/a8944419.65ead2b6.js"},{"revision":"d1e7f6be71f0b6aa5ad131987dfac9aa","url":"assets/js/a8b3d30f.4b8c278f.js"},{"revision":"c6fe2afbd3ffc6f4196ec804f3b22db9","url":"assets/js/a94703ab.459d4e98.js"},{"revision":"556605dd23af88494e3fec9905e5bdf8","url":"assets/js/a9c20897.c06d94cb.js"},{"revision":"554c02752dc114710174d02e6ffee7d3","url":"assets/js/a9d4c552.249f16dc.js"},{"revision":"222163cf4f1ef52d5abca0536d54bde2","url":"assets/js/a9ef8cff.bc1f6c89.js"},{"revision":"7b1ece38e2a0391cc894221c72fc7056","url":"assets/js/aa49e2a6.a5ad42c3.js"},{"revision":"d45a4192679e85b19698e4d5fff0e68e","url":"assets/js/acc065ad.71e90277.js"},{"revision":"1052115db07330a2d93f368c2f77306c","url":"assets/js/acecf23e.22600748.js"},{"revision":"1b5b11da032bc46d0d2ef149daa11bc4","url":"assets/js/adeb1317.b7e9c09c.js"},{"revision":"6551c898ac52de0e65e9e65d10b4b5fa","url":"assets/js/ae03612f.2c43762b.js"},{"revision":"1916f8abf4f9153f911d0c2c41a65e27","url":"assets/js/af8845d7.b7c848a3.js"},{"revision":"82376e0d23f482d2187948c7fae07582","url":"assets/js/b0433c3c.1611e247.js"},{"revision":"f4c56fd113d838c98553ede08e6e4127","url":"assets/js/b05611e0.835f13ce.js"},{"revision":"056505c91ebbba20c911bcf1a3f11fde","url":"assets/js/b0bcd336.f86e35ae.js"},{"revision":"3eae03560cf32712b427f0be794b214a","url":"assets/js/b0f5dabf.7cf1abf2.js"},{"revision":"aea12bd56be9529cbf5957d8a94ceb1e","url":"assets/js/b115fd61.ac4fdcb1.js"},{"revision":"837d960bbccafb63e739e8b8b181b4eb","url":"assets/js/b23f6564.1ff75e9c.js"},{"revision":"d3a714193a837d5e229595213a298f15","url":"assets/js/b2b696d3.f22a195d.js"},{"revision":"19c0de71e6baebaa4d9f3981ca27ecbb","url":"assets/js/b2da0d11.dc852db0.js"},{"revision":"0474ef247583b46499485e7dd4b4a70a","url":"assets/js/b2ffa816.129bee0a.js"},{"revision":"f1d589a2148f823411b4df85cc0f8f30","url":"assets/js/b38e28b1.88198d21.js"},{"revision":"f2324933cd8880c99b44d79ce1280fc0","url":"assets/js/b3904432.d39b4c41.js"},{"revision":"b2d3faacb2ac0f77949628d60fe68f03","url":"assets/js/b3ab7671.3ee00fe5.js"},{"revision":"faac30b8df5cc18586818669a7752c4b","url":"assets/js/b4a4ea93.ad852ef3.js"},{"revision":"3768a80d9fd298e4c1efa1642f831a00","url":"assets/js/b56dfb01.7f221cfe.js"},{"revision":"57f70a5c506381239740f990f71cf635","url":"assets/js/b6dbbe9d.b6c7786d.js"},{"revision":"de3762dc279e7d0f37f36cd43264f247","url":"assets/js/b7e8d224.d1d719fb.js"},{"revision":"c95731c2d4981afae7494fa18b93c380","url":"assets/js/b9066c05.f6e3b22f.js"},{"revision":"c86a7a7fcdff1ef7c381e17e7610606e","url":"assets/js/b9db7301.290b0e07.js"},{"revision":"7d819028254b5edabb6272a04762b613","url":"assets/js/baea148f.210bd67e.js"},{"revision":"64e07fa4aaa0643edbba71195da822e1","url":"assets/js/bf316f6d.6e50fe9d.js"},{"revision":"e1876e35db2245683ae2fe815096c010","url":"assets/js/bf9f9b9d.6f05f0c6.js"},{"revision":"32d73bb60defae11a871755f2c58e673","url":"assets/js/c0b971f3.7317c886.js"},{"revision":"3b385769d3a193188af6769d1852cca9","url":"assets/js/c141421f.870dffb1.js"},{"revision":"512cc108eb093659375fe19f61dc03ce","url":"assets/js/c3679d60.c86bb98b.js"},{"revision":"f9a2d8d31c21d544c6a02f2ac39da2fa","url":"assets/js/c46db57f.8e576e1b.js"},{"revision":"0df65b5806117792cc1122399c0db879","url":"assets/js/c4f5d8e4.41efa553.js"},{"revision":"182ae49c4e6383b9dc345f2c2c9aefa1","url":"assets/js/c505f4df.85e1d0bd.js"},{"revision":"15cfa5fd67e1005720d2cbe05598e44e","url":"assets/js/c57916a5.90c8c2df.js"},{"revision":"5e6be5e69c72f7f3e96fc3c9d1096d41","url":"assets/js/c62a7e2e.153d3806.js"},{"revision":"5e0e19d7e5de6b86ae326da61e09307e","url":"assets/js/c89698df.56bfb4c3.js"},{"revision":"5c43908bc316b11671b833b5028b15c2","url":"assets/js/c89e0599.174ddb80.js"},{"revision":"d659bde0652823b75637140518b425b5","url":"assets/js/c98d7166.2332ed59.js"},{"revision":"60d1e9b6ae534bb7b40ae1bf6f262d4f","url":"assets/js/c9f5d413.921983c3.js"},{"revision":"bdddec7a879b2e16705f562bc08e98b0","url":"assets/js/ca44acbc.0174336a.js"},{"revision":"97da94a76990938f50ff839ee6e19df3","url":"assets/js/ca84a3c2.db00aafd.js"},{"revision":"34fc82d62579cf4ce19c3b28053b6dce","url":"assets/js/caf394c1.17b490ab.js"},{"revision":"b7a09670815e3480035159b3283ac4b2","url":"assets/js/cb841761.27eb40a2.js"},{"revision":"47cffa03eaa226f2a37609929b7c86e7","url":"assets/js/cba61cdb.397fb98d.js"},{"revision":"6317a89b7493933f1ef66629cefce828","url":"assets/js/ccc49370.115e6779.js"},{"revision":"69e2e1b5c34339354b5557839c09635f","url":"assets/js/cde601bf.473ce689.js"},{"revision":"0bc404095d2cd01dcdba3d71632a6c4d","url":"assets/js/cf33bd8e.64a40721.js"},{"revision":"598e0d48d4698683057ff24f41978678","url":"assets/js/cf476c1e.845981d1.js"},{"revision":"230d17babc8cce73a5f02646d1eddea4","url":"assets/js/cf723483.793466e2.js"},{"revision":"a97558b7a6fe4131fa4395362eb8d523","url":"assets/js/cf72f449.3f2b7e73.js"},{"revision":"33b13e23733d405d6c1f6f2fec36e14b","url":"assets/js/d0f63210.b644c2d5.js"},{"revision":"bca7ccfdbaf9f59aea0838c332dae670","url":"assets/js/d2714e08.2a118dd5.js"},{"revision":"5a1926933d41cf0369d918be26f5b473","url":"assets/js/d2966306.3cad7beb.js"},{"revision":"e9b63da46991860898f2b1d85ee09ee1","url":"assets/js/d4238353.1f95623e.js"},{"revision":"23258bf8d26ec2f666ac5bd36dc617fa","url":"assets/js/d4331bac.767eab5b.js"},{"revision":"8f95ec8c4155c7c831114abbd8a40b85","url":"assets/js/d5401d22.bf2cf3ee.js"},{"revision":"92efbe9c47ddead3b4d5a2a62418ba28","url":"assets/js/d62da341.455ea105.js"},{"revision":"8369c2ec7e68d33a5b38836fa75486b1","url":"assets/js/d83cf604.59191134.js"},{"revision":"c304f729e4a493721f1b108368254a1c","url":"assets/js/d889d8a9.696fd7ed.js"},{"revision":"3feb5fcc1a4fa69f80cbfd17d17a369e","url":"assets/js/d8c1eedb.5077905f.js"},{"revision":"1390d3c068780d01827ed2d8c5059bb4","url":"assets/js/d92d7a52.887b7056.js"},{"revision":"22ef5e26c4298b2404c3cb512f107a2e","url":"assets/js/d95d31b5.a3879fd8.js"},{"revision":"06d751854b6326d3d073e4f781ea81a6","url":"assets/js/db196200.679a82cc.js"},{"revision":"787c4b147ea4d417a64edf32678ea532","url":"assets/js/db6f955d.0d67ee23.js"},{"revision":"d701ab1ed4d6cd59b159ae037372a0fe","url":"assets/js/dbfc4782.7255e5f2.js"},{"revision":"bd9f29b6fcc6ab11e4a0406e98a48802","url":"assets/js/dc605222.0cdd4894.js"},{"revision":"10b2708b9cd7866f2b85468ffd5afa6c","url":"assets/js/dca351bd.9f3c1785.js"},{"revision":"0730e3096839c2d090198a4cc2f300c1","url":"assets/js/dca809e2.8bde65b6.js"},{"revision":"549edc543994978640a14820a027d4f0","url":"assets/js/dd04b75e.3466596c.js"},{"revision":"0c5fb163c82facd8821fa7e8f8b49e53","url":"assets/js/ddd8a368.4653f572.js"},{"revision":"fd6a115a03d37790d99678cc7d2bd826","url":"assets/js/df203c0f.156dc8a5.js"},{"revision":"5ae91fa4011b3579a9b4928d24195ae5","url":"assets/js/dfa86e6f.bb880551.js"},{"revision":"b57ec5c8061d28719d42183d39241a8c","url":"assets/js/dfc59dd7.52fd08f5.js"},{"revision":"abf287462ec3aebbecda5faba3468172","url":"assets/js/e08980c4.37bffbe8.js"},{"revision":"f2839150ba56147973cd565b91f9a406","url":"assets/js/e0c68206.37c6ca4b.js"},{"revision":"995e54796824416b5395220c4b88778f","url":"assets/js/e1cf27c4.5c3c2a44.js"},{"revision":"08ec9b94d9d24e2948c4a233ce3b1155","url":"assets/js/e2337dd3.99fd4580.js"},{"revision":"e2dd68e7b0d389c45fd79d8701c25697","url":"assets/js/e27be09e.64c26052.js"},{"revision":"e9c35d93e268eebf2104461c346660e7","url":"assets/js/e45b94a8.00a55c65.js"},{"revision":"98397557222fc5de522a9f271dd1ced6","url":"assets/js/e6979543.69facfe7.js"},{"revision":"55c831a0802fd207cc7892b1b2501c85","url":"assets/js/e6b27c7a.c9b2640e.js"},{"revision":"1c871016408b21e0ca9d1038b1e96293","url":"assets/js/e7ed0fb9.4d6025a6.js"},{"revision":"4bc8e75341a46d551c3587d6089a22d4","url":"assets/js/e813caf9.e0ed03e6.js"},{"revision":"afd8487553d52185a3567f32a266be91","url":"assets/js/e8fccacd.7c27bde0.js"},{"revision":"9d88f4058669f31602b0432947c47837","url":"assets/js/ea3621a3.4f72e762.js"},{"revision":"f59b01779f2dcbb58a98d954f12a06b3","url":"assets/js/ea70c07d.27908287.js"},{"revision":"ccec2dd38dee5c83a647b31ab591e89a","url":"assets/js/eae34406.68938ff1.js"},{"revision":"6b37a6e0c8c7fcd4d3b4c2b5bf664943","url":"assets/js/ebd149cf.8512febd.js"},{"revision":"2c7ca8bb8060a3cd63083431171f80e7","url":"assets/js/ec5a4f41.d232534e.js"},{"revision":"caf95163d086102320dbc229545bae23","url":"assets/js/ec9a49c7.24153084.js"},{"revision":"0bc5b8027592229d80afaea4300da496","url":"assets/js/edaf21c5.e12491a0.js"},{"revision":"63b53588f97f830209bbd79c2f3d2ffd","url":"assets/js/ee5e0fc5.ff98e637.js"},{"revision":"a9b43b42c1dc41d32b732d6d4d2c2389","url":"assets/js/efa6fea6.7c800814.js"},{"revision":"d8d0e4d5ac2ede911c366f014da3e62b","url":"assets/js/efd12a4f.75141249.js"},{"revision":"fa6916207104dea178b91bfbf3e7090f","url":"assets/js/f1711fa4.058403e0.js"},{"revision":"49d63ab562cd0780789facdac093284b","url":"assets/js/f201ee3f.039059d5.js"},{"revision":"c1d6d06b421fe7bb009678b289aa201e","url":"assets/js/f29ae073.3501d49a.js"},{"revision":"12c8bac62425fcdcd7927eb4aa38513c","url":"assets/js/f3521139.209a29fa.js"},{"revision":"445cf0262874e843b502736f13306c90","url":"assets/js/f43923a6.17a0b1ac.js"},{"revision":"f02025862f6393296513e0092dd2cf67","url":"assets/js/f4fbbe27.a4d16d76.js"},{"revision":"f861360ea53cd35cc64179f79cfdd1c0","url":"assets/js/f6b6614f.03964c98.js"},{"revision":"c068c492a8c9dbbb30eaa699089977ff","url":"assets/js/f6c2d257.6d165516.js"},{"revision":"78c73d496bdaabbd54b1d9c70f565518","url":"assets/js/f6c4006b.c537d2b5.js"},{"revision":"b061b9134b53e03049807cee84c3eec9","url":"assets/js/f779ab1d.cad7e8f9.js"},{"revision":"2b6c69a2ce5860aa67e69d0b1ad97a50","url":"assets/js/f830d39f.a10c87c8.js"},{"revision":"5cf1e19f44b42799e7fef58597845d9a","url":"assets/js/fa1f0afd.0bebe67c.js"},{"revision":"ae8d35409d4c790cd24781bef342ad48","url":"assets/js/fb1315ae.60096b8a.js"},{"revision":"e60c260d771c1afaec1fdee508040b57","url":"assets/js/fda1fafa.b8498d0c.js"},{"revision":"3a28d92f177f375f99f67c0248b3183b","url":"assets/js/fedf1d91.0a847ee0.js"},{"revision":"faa3eca65c85f1c0e12b2b70a1bcd814","url":"assets/js/main.20c29b72.js"},{"revision":"c17480b3a83d3010801cf6c3b424fc62","url":"assets/js/runtime~main.e2559d30.js"},{"revision":"5778f03d60dd67c87ebe704bcc842f5f","url":"blog/2020/12/30/index.html"},{"revision":"8929c284822a16c7c6b740a6dd43171b","url":"blog/2021/12/30/index.html"},{"revision":"6cfd0102248e2a2c20651e578cc560b3","url":"blog/2022/12/30/index.html"},{"revision":"3013388e39f4c093020013f4ee105e41","url":"blog/2023/12/30/index.html"},{"revision":"60393fb6e8d31e867a17160066197848","url":"blog/2024/1/31/index.html"},{"revision":"ce6fc6122ddb203be6058fa02cbf5f3a","url":"blog/2024/12/30/index.html"},{"revision":"5521967f5570dc36e245cc955f1213b9","url":"blog/2024/2/28/index.html"},{"revision":"b00b3a70a904cc5092537a94f858e25e","url":"blog/2024/3/31/index.html"},{"revision":"5bfb930d24eacc0ee8ee51adf5b1c527","url":"blog/2024/4/30/index.html"},{"revision":"05c179980a50824524ae7721f6e5234c","url":"blog/2024/5/31/index.html"},{"revision":"4fc59f7f018a43c0ff761efad21c30c9","url":"blog/2024/6/30/index.html"},{"revision":"2e7d982d881bd6c4f130fd65c0f8db3c","url":"blog/2024/7/30/index.html"},{"revision":"5aeb84cc72d423a8c975d921df95c2d0","url":"blog/2024/8/30/index.html"},{"revision":"7c6fe7a04f9956e1f9227d5813aee58c","url":"blog/2025/4/30/index.html"},{"revision":"9f3e236b93884cc1df5da746a498ad5d","url":"blog/2025/7/30/index.html"},{"revision":"cda5399f1af2b0b3e7aa0d43ab884ea4","url":"blog/2025/8/30/index.html"},{"revision":"00f9a6122f60d19c24d380fb1bb0f8e4","url":"blog/2025/9/30/index.html"},{"revision":"734d3ad5656a616e819f8aba85432579","url":"blog/archive/index.html"},{"revision":"ec3e571d2738c28d8ee3759e3503195c","url":"blog/authors/index.html"},{"revision":"b6aee0e95d44d2196a96a94cc26e67b7","url":"blog/feed.json"},{"revision":"ae128b4e0cf6f1b4bdefe77b0d31f87e","url":"blog/index.html"},{"revision":"2940feca690b0aecd4ebbc9143e085e3","url":"blog/page/2/index.html"},{"revision":"b5795d33786be2db59620e9fe3aed59e","url":"blog/tags/ai/index.html"},{"revision":"2031dd05b2154565c5b0425af7fe31bd","url":"blog/tags/ai编程/index.html"},{"revision":"53109de4dc4aef8050387461e983689b","url":"blog/tags/blog/index.html"},{"revision":"0da5e7b406373c3c8c027694450a5743","url":"blog/tags/github-page智能-dns解析/index.html"},{"revision":"64cdb867b3434c5fc2344730a4f03ee8","url":"blog/tags/index.html"},{"revision":"1f3cf7577262985590f012d48a401bf8","url":"blog/tags/life/index.html"},{"revision":"3b3340edf02cd2c1e5261c4c1530f789","url":"blog/tags/python/index.html"},{"revision":"992cc192d515ac655a4fe904470c12bb","url":"blog/tags/remove/index.html"},{"revision":"a7a7b77fa17635196052ed84e729d6c0","url":"blog/tags/ros-2/index.html"},{"revision":"cfd25efc16fbd0f721e66d9517929f43","url":"blog/tags/smarthome/index.html"},{"revision":"32dafbeead0b2cc7a6e474d20eafcd85","url":"blog/tags/tutorial/index.html"},{"revision":"d62c7aa9a8c0528272f31b354ae25482","url":"blog/tags/xiaoai/index.html"},{"revision":"2738c2c031adab1ed36d3f6951104137","url":"blog/tags/仿真/index.html"},{"revision":"7a3d5ec470a9127af1c36d6ed1680573","url":"blog/tags/原则/index.html"},{"revision":"fc00fe2a295c529e5361dd9cfd77c801","url":"blog/tags/家居/index.html"},{"revision":"36502be2985b4cde54a1717dcac6ca16","url":"blog/tags/机器学习/index.html"},{"revision":"bf9f6e5385cff32ba3170e9932ea49f0","url":"blog/tags/梦/index.html"},{"revision":"dbb14dbcf21e1b397c3d757b9bb0cc33","url":"blog/tags/视觉/index.html"},{"revision":"16c25ffbf9e2ecacd31d5cc2ade51cd3","url":"blog/tags/记录/index.html"},{"revision":"4f92b7ad79bb70bfa301abf74100d6a6","url":"blog/tags/运动算法/index.html"},{"revision":"3517be629fe6283640386b40352e6bbf","url":"case/index.html"},{"revision":"978c8a3fc5165cc057ae0b963ffa4b77","url":"docs/index.html"},{"revision":"8604805196984ce29d18368fa5a97d67","url":"docs/后端通识/index.html"},{"revision":"3a0ad8d8bea15dde24ca92bc482b30c4","url":"docs/后端通识/Nginx/index.html"},{"revision":"197ead2c59cc47957969e35e71b6ec8c","url":"docs/后端通识/接口开发/index.html"},{"revision":"d4156fa952a8a7def971a462840ea1b5","url":"docs/后端通识/接口测试/index.html"},{"revision":"8f675dc80230f2db76afba3e7d2c3eba","url":"docs/后端通识/数据分析/index.html"},{"revision":"a32ccced3abacdd11907e57c36cdb676","url":"docs/后端通识/数据库/index.html"},{"revision":"f7c9c20a082bd65d7e8fedad87d0a9e5","url":"docs/后端通识/监控与日志/index.html"},{"revision":"6cb058f8ba25b167c4d23bfcf6888838","url":"docs/后端通识/网页自动化/index.html"},{"revision":"b4d03ddf4c593cc9437fa29eda30b3d1","url":"docs/大模型的应用/Agent开发/index.html"},{"revision":"bbf291b049af344652a03756fae8de02","url":"docs/大模型的应用/index.html"},{"revision":"f7e4ee9648b244495bc26777b392a137","url":"docs/大模型的应用/提示词工程/index.html"},{"revision":"f5f00070c10827db0cd3a8f37d289e27","url":"docs/大模型的应用/模型社区与部署/index.html"},{"revision":"af63c6c5d471f6813678b97684e0f27d","url":"docs/大模型的应用/模型评测/index.html"},{"revision":"4ee497596bdcaac5452c940f43c80b3e","url":"docs/大模型的应用/潮流前沿/index.html"},{"revision":"ff789bf8bbd4d6de012f1474810748df","url":"docs/机器学习/index.html"},{"revision":"223f39636f3a5c6e1e84a0b1eee07762","url":"docs/机器学习/Transformer/Encoder-Decoder结构/index.html"},{"revision":"0338e4eaec0f5ea14a337ca2f42fc655","url":"docs/机器学习/Transformer/index.html"},{"revision":"79e512da7f3fbad1167dd6e4ca097ae6","url":"docs/机器学习/Transformer/分布式训练/index.html"},{"revision":"86e4d675e4ed168ef449918fd09c4cdf","url":"docs/机器学习/Transformer/手写多模态大模型/index.html"},{"revision":"a0db48631a9e2ffcb13f23967df81fda","url":"docs/机器学习/Transformer/模型微调/index.html"},{"revision":"a4d76dd2089a253f05e8e1593a3204e9","url":"docs/机器学习/Transformer/注意力机制/index.html"},{"revision":"0b1bc3ba4e867f760b8fc643e64b3c14","url":"docs/机器学习/决策树/index.html"},{"revision":"4d17aca8873187acaffa6af127569651","url":"docs/机器学习/分类算法/index.html"},{"revision":"0902b8af32d4da39b66a580a3007902d","url":"docs/机器学习/回归算法/index.html"},{"revision":"81d6f2bfa6d5d97047c5bffe14263be0","url":"docs/机器学习/经典神经网络/index.html"},{"revision":"a50f976ed2aead92d4f55ab8b0823592","url":"docs/机器学习/聚类算法/index.html"},{"revision":"057d5f36e0e5b8a3d429cb5113ba8b1c","url":"docs/机器学习/计算机视觉/AlexNet网络/index.html"},{"revision":"954786e136ee4741d91f99305f438c38","url":"docs/机器学习/计算机视觉/index.html"},{"revision":"f5ff3c3e1cee96b3913e7236609df91d","url":"docs/机器学习/计算机视觉/ResNet网络/index.html"},{"revision":"c1ad956ac34c421c14702630ecb50049","url":"docs/机器学习/计算机视觉/YOLO/index.html"},{"revision":"114e4255277749379ce11381c2047c7d","url":"docs/机器学习/计算机视觉/卷积神经网络/index.html"},{"revision":"a15cc958f7260b4ffd40699d02ad19c7","url":"docs/机器学习/降维算法/index.html"},{"revision":"782b2e3c4035959b07a1c36d7396f6a7","url":"docs/编程外的基础/Docker/index.html"},{"revision":"33642b86d7d02d06469f398bb605938e","url":"docs/编程外的基础/Git/index.html"},{"revision":"b0167c6ff4a7c50bb5ad0cf456ff989f","url":"docs/编程外的基础/Markdown/index.html"},{"revision":"e3eeac0328636e2e14c6d68789271101","url":"docs/编程外的基础/Terminal/index.html"},{"revision":"ca484fc0008f802ca9ca8244687bc3c1","url":"docs/编程外的基础/YAML/index.html"},{"revision":"df8efe95e099e0bd873f4ae888fabfd7","url":"docs/选择编程语言/C/0基础语法/index.html"},{"revision":"37606280e1eec3e02355af8d428f9113","url":"docs/选择编程语言/C/10存储类别、链接和内存管理/index.html"},{"revision":"f77f9e315f959eeff2ea01b6613603ac","url":"docs/选择编程语言/C/11文件输入输出/index.html"},{"revision":"a6daa183f72de23c171a487239b86259","url":"docs/选择编程语言/C/12结构和其他数据形式/index.html"},{"revision":"2bc822c8a709fc6f5c771849b9b5bfa0","url":"docs/选择编程语言/C/13位操作/index.html"},{"revision":"0fba405a93b09071f0c6ec59da561070","url":"docs/选择编程语言/C/14C预处理器和C库/index.html"},{"revision":"997e9c682960d5d6665ecf517cb0d94d","url":"docs/选择编程语言/C/15高级数据表示/index.html"},{"revision":"1367ad29e70f3ecc52e2363a0c0aff10","url":"docs/选择编程语言/C/1变量/index.html"},{"revision":"4d3f1d7206ccbf5d894d72caba04df5d","url":"docs/选择编程语言/C/2数据/index.html"},{"revision":"2e11a2aec5396b9eb96dd3bae0a2cb54","url":"docs/选择编程语言/C/5控制流/index.html"},{"revision":"be94ce1a37fe363f4741aaba73e5bc20","url":"docs/选择编程语言/C/6函数/index.html"},{"revision":"c3f9c1e2c0cc3b26a566ac23fe81390f","url":"docs/选择编程语言/C/8数组和指针/index.html"},{"revision":"d091fe0689f5ea7850b87dcbfc28b8f4","url":"docs/选择编程语言/C/9字符串和字符串函数/index.html"},{"revision":"74a868ba7d68c5ff6f3fa2cf49380d3b","url":"docs/选择编程语言/C/模块库/index.html"},{"revision":"77f1c9c00e4611c98fd791aca617eaf4","url":"docs/选择编程语言/C/模块库/stdio/index.html"},{"revision":"69fe4a5f2817d8b4ee6561dda8520890","url":"docs/选择编程语言/HTML/a/index.html"},{"revision":"d3086d0502ef1bce40a4c4124257b827","url":"docs/选择编程语言/HTML/attribute/index.html"},{"revision":"0770858592bc5ddbdc405dfee7084506","url":"docs/选择编程语言/HTML/elements/index.html"},{"revision":"f9c7f2759293ed34d4f1f27affae72db","url":"docs/选择编程语言/HTML/encode/index.html"},{"revision":"ae76966196ef21bc8c6db635906e01c5","url":"docs/选择编程语言/HTML/form/index.html"},{"revision":"8d0073b4a3235c7c2dd9c2290b82b6de","url":"docs/选择编程语言/HTML/iframe/index.html"},{"revision":"ec68354a4b25604eff34aaa0a7b33e49","url":"docs/选择编程语言/HTML/image/index.html"},{"revision":"133a71f152d41e874507ecd721849ae7","url":"docs/选择编程语言/HTML/index.html"},{"revision":"f35252fa31cc09706560d6b5c84575a5","url":"docs/选择编程语言/HTML/intro/index.html"},{"revision":"935417cf6019b0859009f4d17fe4eb2a","url":"docs/选择编程语言/HTML/link/index.html"},{"revision":"48d2277a5772d1f028f2c6a9b39338c4","url":"docs/选择编程语言/HTML/list/index.html"},{"revision":"255665c48bd911b362eb8e7b15ae6dcd","url":"docs/选择编程语言/HTML/mobile/index.html"},{"revision":"dce882d225fac09c6800f1d88cad7c5d","url":"docs/选择编程语言/HTML/multimedia/index.html"},{"revision":"c3af8836e513feb4a3538827b8df5b9a","url":"docs/选择编程语言/HTML/script/index.html"},{"revision":"882314e49c93bd9ac20c4a779ba8d002","url":"docs/选择编程语言/HTML/semantic/index.html"},{"revision":"7baacda562e5aec24bbc58c71c7620d6","url":"docs/选择编程语言/HTML/table/index.html"},{"revision":"2a4d5cf0421b8f5fbbe61c521445d819","url":"docs/选择编程语言/HTML/text/index.html"},{"revision":"7b5036c90eee2f73dda299add18f2ad1","url":"docs/选择编程语言/HTML/url/index.html"},{"revision":"8e060a31871c0d1df16995ad256ccd2e","url":"docs/选择编程语言/index.html"},{"revision":"e4090406333c1d3738acad1b61ed77dc","url":"docs/选择编程语言/JavaScript/async/general/index.html"},{"revision":"d6042bb7cab8dd3aab5ff3b81e95398e","url":"docs/选择编程语言/JavaScript/async/promise/index.html"},{"revision":"2114b67b0d589470fb5ccd022344aebe","url":"docs/选择编程语言/JavaScript/async/timer/index.html"},{"revision":"eb12609c09f005e498590ee72fc49524","url":"docs/选择编程语言/JavaScript/basic/grammar/index.html"},{"revision":"29660bbba919edf80262afd93bb18a13","url":"docs/选择编程语言/JavaScript/basic/history/index.html"},{"revision":"484a66c0768544101db46be77e9d96fc","url":"docs/选择编程语言/JavaScript/basic/introduction/index.html"},{"revision":"7af1342083c40305127d39c93e5e60d4","url":"docs/选择编程语言/JavaScript/bom/arraybuffer/index.html"},{"revision":"e8aa07b7b7535463db543e2c36315ad5","url":"docs/选择编程语言/JavaScript/bom/cookie/index.html"},{"revision":"1ba4ede02e78afcc34bd677394588d70","url":"docs/选择编程语言/JavaScript/bom/cors/index.html"},{"revision":"43faacb1747000103a65902c19549352","url":"docs/选择编程语言/JavaScript/bom/engine/index.html"},{"revision":"894693ec63d891c905a77ab2874da7a7","url":"docs/选择编程语言/JavaScript/bom/file/index.html"},{"revision":"c59956bb87b9448fea579ca7f78e8e80","url":"docs/选择编程语言/JavaScript/bom/form/index.html"},{"revision":"de5c66f8cc98b8c577ff9e0e517c340b","url":"docs/选择编程语言/JavaScript/bom/history/index.html"},{"revision":"77691537d40fa688d7f2ae694a73bbbc","url":"docs/选择编程语言/JavaScript/bom/indexeddb/index.html"},{"revision":"976a9ef63b6ca4626b2be9647663827e","url":"docs/选择编程语言/JavaScript/bom/location/index.html"},{"revision":"1f667b8816ed12f5c9a2844a8f0475d9","url":"docs/选择编程语言/JavaScript/bom/navigator/index.html"},{"revision":"e4fcdf36cee34ebf3c09d2b410b9d036","url":"docs/选择编程语言/JavaScript/bom/same-origin/index.html"},{"revision":"eaf2a7f13ce95f78324a432b26b3ac09","url":"docs/选择编程语言/JavaScript/bom/storage/index.html"},{"revision":"76fde2918e4ae4758b418a00c21e2e6e","url":"docs/选择编程语言/JavaScript/bom/webworker/index.html"},{"revision":"8599a23ecf29bc21e5440241c0b3b083","url":"docs/选择编程语言/JavaScript/bom/window/index.html"},{"revision":"676ea26f1df3b19bfb801beaacd0f187","url":"docs/选择编程语言/JavaScript/bom/xmlhttprequest/index.html"},{"revision":"a28554b4e62d0058f96240f0d5209a97","url":"docs/选择编程语言/JavaScript/dom/attributes/index.html"},{"revision":"32b3fd3a44369e93f458ac96d76b5500","url":"docs/选择编程语言/JavaScript/dom/css/index.html"},{"revision":"d484f3fe47ce3d582a454f87ff762023","url":"docs/选择编程语言/JavaScript/dom/document/index.html"},{"revision":"9c66eee95d40dc067c7bbb203bb7e235","url":"docs/选择编程语言/JavaScript/dom/element/index.html"},{"revision":"d2515d4e4699d91bede3b809c684a47a","url":"docs/选择编程语言/JavaScript/dom/general/index.html"},{"revision":"e9d9546aff0cf99f2d771a01a9571128","url":"docs/选择编程语言/JavaScript/dom/mutationobserver/index.html"},{"revision":"cc58abb3b3b109c84f23dc4efde88fce","url":"docs/选择编程语言/JavaScript/dom/node/index.html"},{"revision":"4cdadbbf9c26bf92c810afa332cc1987","url":"docs/选择编程语言/JavaScript/dom/nodelist/index.html"},{"revision":"a98d7335d00d3969cb407f2054f07f2e","url":"docs/选择编程语言/JavaScript/dom/parentnode/index.html"},{"revision":"c4c77e44d0100bc61516ede1546bd13f","url":"docs/选择编程语言/JavaScript/dom/text/index.html"},{"revision":"5905e7f47f02d9d754ce36e97218a737","url":"docs/选择编程语言/JavaScript/elements/a/index.html"},{"revision":"bbbb282c808f601ae28ec08bd6342af5","url":"docs/选择编程语言/JavaScript/elements/button/index.html"},{"revision":"fdfcf8bb678115939768d9619e48c005","url":"docs/选择编程语言/JavaScript/elements/form/index.html"},{"revision":"45383fd112f403a5dcaf948d4dcd34fc","url":"docs/选择编程语言/JavaScript/elements/image/index.html"},{"revision":"5eea5467191652d86719683168857e52","url":"docs/选择编程语言/JavaScript/elements/input/index.html"},{"revision":"4832d32afd0355395bcf01f7d9f5e063","url":"docs/选择编程语言/JavaScript/elements/option/index.html"},{"revision":"34a4914d68b3c8afacda333b9221d1db","url":"docs/选择编程语言/JavaScript/elements/video/index.html"},{"revision":"2ec85918c1f14360d172fbbc33c60e9b","url":"docs/选择编程语言/JavaScript/events/common/index.html"},{"revision":"009b469a6ca81933af683739d79d5f55","url":"docs/选择编程语言/JavaScript/events/drag/index.html"},{"revision":"ff5331f17b051cd1f9273408bead469f","url":"docs/选择编程语言/JavaScript/events/event/index.html"},{"revision":"30d2e323504b79e0b8abfb05c576383b","url":"docs/选择编程语言/JavaScript/events/eventtarget/index.html"},{"revision":"0b4c559af5b873c2fa20953eb920dc03","url":"docs/选择编程语言/JavaScript/events/form/index.html"},{"revision":"f7f29fcb9d5a41767e8be2c8ab3ebe11","url":"docs/选择编程语言/JavaScript/events/globaleventhandlers/index.html"},{"revision":"63c00e7fabb9e1d072e9c8e26a981c3e","url":"docs/选择编程语言/JavaScript/events/keyboard/index.html"},{"revision":"c129f25f0a55152efce72372f37097d9","url":"docs/选择编程语言/JavaScript/events/model/index.html"},{"revision":"3b4b4b94737b7f44db0b956ff7f675d7","url":"docs/选择编程语言/JavaScript/events/mouse/index.html"},{"revision":"df94e5f470f6be4e3cadb95d1270b092","url":"docs/选择编程语言/JavaScript/events/progress/index.html"},{"revision":"1fe1aa0e05119a8f1236dfb98a4b271c","url":"docs/选择编程语言/JavaScript/events/touch/index.html"},{"revision":"e35ec64ccb707b8643c89ee817b6fa0b","url":"docs/选择编程语言/JavaScript/features/console/index.html"},{"revision":"9421a767935a03243b9cb6361fef7c7a","url":"docs/选择编程语言/JavaScript/features/conversion/index.html"},{"revision":"af60f88dc481c96419b77ed6ba34458f","url":"docs/选择编程语言/JavaScript/features/error/index.html"},{"revision":"1483125d3d362f1a18e751f5cb525185","url":"docs/选择编程语言/JavaScript/features/style/index.html"},{"revision":"68dfd2ed2cd7c128cd208fa9565de367","url":"docs/选择编程语言/JavaScript/index.html"},{"revision":"a9375afeb108884254b05151cdc0da7d","url":"docs/选择编程语言/JavaScript/oop/new/index.html"},{"revision":"41709ca5bf5ebf5b82e023f4a098e27b","url":"docs/选择编程语言/JavaScript/oop/object/index.html"},{"revision":"34f9f10002e678aa784f87cba19abe89","url":"docs/选择编程语言/JavaScript/oop/prototype/index.html"},{"revision":"197bec5a1df94993b3a2d7bf5932dc0b","url":"docs/选择编程语言/JavaScript/oop/strict/index.html"},{"revision":"5014997f4f29698f92aa563adbb55712","url":"docs/选择编程语言/JavaScript/oop/this/index.html"},{"revision":"ac28078c87c6d450a94ab3bb359e2778","url":"docs/选择编程语言/JavaScript/operators/arithmetic/index.html"},{"revision":"53d410f31d3dce48a989496c4c8c437d","url":"docs/选择编程语言/JavaScript/operators/bit/index.html"},{"revision":"86d2a9b70fc91def8e499237abd362d6","url":"docs/选择编程语言/JavaScript/operators/boolean/index.html"},{"revision":"04587b7d57a3649d1f80ba80202564df","url":"docs/选择编程语言/JavaScript/operators/comparison/index.html"},{"revision":"cd7d5f28d91b7839ad723059ab85eefc","url":"docs/选择编程语言/JavaScript/operators/priority/index.html"},{"revision":"363a126056343283491a62981d79f4a2","url":"docs/选择编程语言/JavaScript/stdlib/array/index.html"},{"revision":"f9f26dcf8a1133cf81795708eab1901a","url":"docs/选择编程语言/JavaScript/stdlib/attributes/index.html"},{"revision":"b4c71a0e7b133f0d2cc4912be915233a","url":"docs/选择编程语言/JavaScript/stdlib/boolean/index.html"},{"revision":"b71f7e7f3cf1a7336cd07831455f958a","url":"docs/选择编程语言/JavaScript/stdlib/date/index.html"},{"revision":"fa97903ea39a12e67a242d433dc750d2","url":"docs/选择编程语言/JavaScript/stdlib/json/index.html"},{"revision":"f1b0b4fcbe5618bcc4d394c568475eee","url":"docs/选择编程语言/JavaScript/stdlib/math/index.html"},{"revision":"59576d878fec449ba6d3b808e0991824","url":"docs/选择编程语言/JavaScript/stdlib/number/index.html"},{"revision":"fe644fae2ba3988bdd3a0188932d893c","url":"docs/选择编程语言/JavaScript/stdlib/object/index.html"},{"revision":"7ee289c1e780b7d99b37921698cd8770","url":"docs/选择编程语言/JavaScript/stdlib/regexp/index.html"},{"revision":"bfb247c031de6f54ccef3489a309cd37","url":"docs/选择编程语言/JavaScript/stdlib/string/index.html"},{"revision":"081e8f71d1e100ff4e8c33d4a73c83c9","url":"docs/选择编程语言/JavaScript/stdlib/wrapper/index.html"},{"revision":"55625d74e82cf69a2ef18d83a1ea9535","url":"docs/选择编程语言/JavaScript/types/array/index.html"},{"revision":"ffcf0dd0f0cbc7d96ae78f46ac22941c","url":"docs/选择编程语言/JavaScript/types/function/index.html"},{"revision":"fe25a3f71058124c27e4278bf7ac1d81","url":"docs/选择编程语言/JavaScript/types/general/index.html"},{"revision":"12cb16bdc410e5f8dac9ff998ba3a8de","url":"docs/选择编程语言/JavaScript/types/null-undefined-boolean/index.html"},{"revision":"90d020850cc09398b6a80198769d6be3","url":"docs/选择编程语言/JavaScript/types/number/index.html"},{"revision":"7517753e237050b8cf4db68f484bc478","url":"docs/选择编程语言/JavaScript/types/object/index.html"},{"revision":"92c8c1d1fe0db223b7c652b9f109a356","url":"docs/选择编程语言/JavaScript/types/string/index.html"},{"revision":"f2bba81f4a6b6f77ca35a439d2cae951","url":"docs/选择编程语言/Python/0基础语法/index.html"},{"revision":"9ca8b3269daf0d063416a756da162e3d","url":"docs/选择编程语言/Python/10函数/index.html"},{"revision":"f69d828b9432a0f74d6ed07aa905e4a5","url":"docs/选择编程语言/Python/1变量/index.html"},{"revision":"25ca98839bbd2f471d79d80732c296b2","url":"docs/选择编程语言/Python/1数字/index.html"},{"revision":"a2e5a6db4d0592bbfe5fdba645c5f8e6","url":"docs/选择编程语言/Python/20类与对象/index.html"},{"revision":"5adcea036c749ff6c2c0a729cbbc3f3e","url":"docs/选择编程语言/Python/25生成器和迭代器/index.html"},{"revision":"5d0a1b255a9946dea31990949a65748e","url":"docs/选择编程语言/Python/28装饰器与作用域/index.html"},{"revision":"86325afd377af214fcb4d2b05aadccde","url":"docs/选择编程语言/Python/29文件操作/index.html"},{"revision":"58ce9d21c6d13b2432c358bfc691cb4e","url":"docs/选择编程语言/Python/2字符串/index.html"},{"revision":"4e67653e0036e2eb76b7502a2f3bd365","url":"docs/选择编程语言/Python/30异步编程/index.html"},{"revision":"6f34b00029602706195e6c4ef6ed96aa","url":"docs/选择编程语言/Python/38代码执行与调试/index.html"},{"revision":"ab55b86ed5ec192fe50da70e7a3d7c16","url":"docs/选择编程语言/Python/39模块/index.html"},{"revision":"9376814b24091501bfc72dd391ec9485","url":"docs/选择编程语言/Python/3序列/index.html"},{"revision":"1a3180a23361b7a44431906eea3d3efb","url":"docs/选择编程语言/Python/5控制流/index.html"},{"revision":"c1b0a2c9184ac76a403b637b9784213f","url":"docs/选择编程语言/Python/99练习/index.html"},{"revision":"24973bb924c67206cdbdefe4a5e093b7","url":"docs/选择编程语言/Python/index.html"},{"revision":"4bb8df3019a9f065ba6bb1ab08d980b6","url":"docs/选择编程语言/Python/Python模块库/index.html"},{"revision":"9212195556d4aa6ba754d0bee1730c36","url":"docs/选择编程语言/Python/Python模块库/sqlite/index.html"},{"revision":"ed5798e8db59328ab9fc873d3bdde119","url":"docs/选择编程语言/Python/Python模块库/并发与并行/asyncio/index.html"},{"revision":"ac809c8c624b5a0a984c0a146fa518f1","url":"docs/选择编程语言/Python/Python模块库/并发与并行/concurrent/index.html"},{"revision":"16b6cbe8dbb6d7b0bcc6d29f075d83bb","url":"docs/选择编程语言/Python/Python模块库/并发与并行/index.html"},{"revision":"8686fc8d0fd9bebe15ba7749b1bdf649","url":"docs/选择编程语言/Python/Python模块库/并发与并行/multiprocessing/index.html"},{"revision":"23a9d7dc3082826594707a5aa08f6792","url":"docs/选择编程语言/Python/Python模块库/并发与并行/queue/index.html"},{"revision":"99e99b139977fc7c319a404a82cadc2f","url":"docs/选择编程语言/Python/Python模块库/并发与并行/subprocess/index.html"},{"revision":"e261bd7a7bc889d7c3fe5439a05b5ebe","url":"docs/选择编程语言/Python/Python模块库/并发与并行/threading/index.html"},{"revision":"303bf48ac2c13e597ebdd238a3069d15","url":"docs/选择编程语言/Python/Python模块库/数据处理/index.html"},{"revision":"bd3a5a2e90a4d93306570fc5c1555c8d","url":"docs/选择编程语言/Python/Python模块库/数据类型/index.html"},{"revision":"b18e0b1d1f3c9d0b121d68370306596e","url":"docs/选择编程语言/Python/Python模块库/文件与路径/index.html"},{"revision":"4d7e38c6459b8ecdaf2f4ff3ebd3b3cd","url":"docs/选择编程语言/Python/Python模块库/消息队列/Kafka/index.html"},{"revision":"4dede1846b482a4077a10303466c7fbf","url":"docs/选择编程语言/Python/Python模块库/网络与通信/index.html"},{"revision":"7302cbd6de6959f566c9e300abb88e05","url":"docs/选择编程语言/Python/Python模块库/网络与通信/socket/index.html"},{"revision":"0ee6b7c212e7e07ee4209031269efbaa","url":"docs/选择编程语言/Python/Python模块库/网络与通信/urllib/index.html"},{"revision":"5b30ce2289d614d0f767a10d9ece815e","url":"docs/选择编程语言/Python/Python模块库/网络与通信/webbrowser/index.html"},{"revision":"a3f09ea57c0f1b280416c5da10a0dd61","url":"docs/选择编程语言/Python/Python模块库/调试/dis/index.html"},{"revision":"d4010c6d4d24fa42364f2950e324f0c5","url":"gallery/index.html"},{"revision":"3aaae1df4bd997fc1cbcec7786bb589d","url":"index.html"},{"revision":"6a740475d486f2a28ecb95bb3f5d30b4","url":"katex/katex.min.css"},{"revision":"dae78fdedc71e17fa8c216f81992c3c5","url":"manifest.json"},{"revision":"1b227a3c09b6efccc21e01eab8a4a340","url":"read/1Q84/index.html"},{"revision":"2d191fbb9d2f1541d8016fa710bae438","url":"read/index.html"},{"revision":"b987ac1fd1f2b6aed307ff93add0c9b3","url":"read/Python神经网络编程/index.html"},{"revision":"95b8d76b900014d5fa043337beb04efc","url":"read/tags/index.html"},{"revision":"3cb94cc2e568c5e8e13dcf15f60adf5d","url":"read/tags/心理/index.html"},{"revision":"2f510c0839f659b12862186ac75f8044","url":"read/tags/文学/index.html"},{"revision":"6b03f0aee0a3098c8ec6ac62d0ad667d","url":"read/tags/生活/index.html"},{"revision":"4872ff90b8606461bac0a98d6aafb30f","url":"read/tags/社科/index.html"},{"revision":"0658b2a7f87c7fe93487fb1f3ead42be","url":"read/tags/科幻/index.html"},{"revision":"1de563eeaa8a5d798f5309b8a715ab73","url":"read/tags/科技/index.html"},{"revision":"913d30d2cdb7047ad1816a90300f0f2e","url":"read/tags/经管/index.html"},{"revision":"262905de828a42e08058ea037f2f0a9f","url":"read/一个孤独漫步者的遐想/index.html"},{"revision":"3bb75c9e975ac6044ded585878b202d2","url":"read/一九八四/index.html"},{"revision":"41affc5108addbf532cdc63615a3a22e","url":"read/三个火枪手/index.html"},{"revision":"fa9a7170d54c6ddcb2f10aad05cb4f3d","url":"read/三体/index.html"},{"revision":"712c18b58ba3f207af195857c0094320","url":"read/不能承受的生命之轻/index.html"},{"revision":"9e290ac919996e061f874d8a44536a92","url":"read/且听风吟/index.html"},{"revision":"3b8ba2fc472ab4843b58f24031fec3af","url":"read/乌合之众/index.html"},{"revision":"d5fc54491c8a7dbbe9c92740fe1f26d6","url":"read/事实/index.html"},{"revision":"e4dc3a6a12c4dacf8de6f24d5b94ffdd","url":"read/云彩收集者手册/index.html"},{"revision":"33c801a34f6be7858bb7e8a90e1c1797","url":"read/人类简史/index.html"},{"revision":"76cf186008cdb38fdd838d113009bd5e","url":"read/人类群星闪耀时/index.html"},{"revision":"7ce9587a9e4a5cea7f76b9e9ae99cc54","url":"read/人间词话/index.html"},{"revision":"41c41d98d579e7214919225a56856636","url":"read/今日简史/index.html"},{"revision":"4278b5a532ae6975edebf03571ccfbf8","url":"read/偷影子的人/index.html"},{"revision":"8bda2c356a4c4e42ff17559eec532a2c","url":"read/动物农场/index.html"},{"revision":"3f17eed3306d34dc66c21948999822cf","url":"read/原则/index.html"},{"revision":"a721d9ef7e6c66fd57a105976ab1050f","url":"read/原子习惯/index.html"},{"revision":"17992d95b8343d4d636698bc6a7640d0","url":"read/双城记/index.html"},{"revision":"271b17a991e04192cc13a04cefc607a3","url":"read/变形记/index.html"},{"revision":"a063a713d0abe8c16c5d9823a46166cf","url":"read/变色龙/index.html"},{"revision":"dfa30d42f8934b030f2ed4a72397b487","url":"read/古文观止/index.html"},{"revision":"ef7124858b353ced1393b35299a5e2b3","url":"read/围城/index.html"},{"revision":"1100f5c3690638343b543b6dd593b756","url":"read/城南旧事/index.html"},{"revision":"d0a29ed7ba78d69f34a00523979f6d22","url":"read/基度山恩仇记/index.html"},{"revision":"3e34d57aff0e46f3865afb62030fcbcc","url":"read/天才在左，疯子在右/index.html"},{"revision":"64f11045ec52a831b90718172f4a8f20","url":"read/如何阅读一本书/index.html"},{"revision":"659a59cfd0ee1725d89e98e25c990252","url":"read/如何高效学习/index.html"},{"revision":"f370b5c7026406ca4571a94763afaad5","url":"read/娱乐至死/index.html"},{"revision":"3f00a2f5ee60a296359a33370b402c7f","url":"read/小狗钱钱/index.html"},{"revision":"f5964daef3f6d4397be0f4a7fc73af8e","url":"read/小王子/index.html"},{"revision":"100ab1e85494d5290f78224c06c504a9","url":"read/巴黎圣母院/index.html"},{"revision":"88fa657a76e153cc22f3efbbb9f57984","url":"read/平凡的世界/index.html"},{"revision":"b8aa9d1947be00fecb54e29b6b71e883","url":"read/乡土中国/index.html"},{"revision":"b87e6d3cde2eba387221441e8e0bed25","url":"read/弹性网页设计/index.html"},{"revision":"8ddf26b82c238901c9b681320316b4b1","url":"read/思考，快与慢/index.html"},{"revision":"b5694e5621f1dae8bde154527ea0d69f","url":"read/我们赖以生存的隐喻/index.html"},{"revision":"42d373418b66cc40e13157bf9af08c71","url":"read/挪威的森林/index.html"},{"revision":"2222383846c74f734a2ca4fcd633e0ee","url":"read/文化苦旅/index.html"},{"revision":"dc1819942a760321348d0c63f14eac28","url":"read/断舍离/index.html"},{"revision":"811e3a01f5d08188960ab8cae4da61c2","url":"read/昆虫记/index.html"},{"revision":"896b1218c6f36824ce1a411928eeccae","url":"read/未来简史/index.html"},{"revision":"20c8f09dca06888ee50b71fac2ba028b","url":"read/植物的战斗/index.html"},{"revision":"c4f0695a410cf9382394dd0883d59cda","url":"read/海底两万里/index.html"},{"revision":"ab5f8c1145079b36afec666cd4b648fb","url":"read/深度工作/index.html"},{"revision":"fc363e375a30aead3eb20ac6673da21b","url":"read/灵魂需要独处/index.html"},{"revision":"3828e2c20babb83ccad9ef9d14d184f1","url":"read/理想国/index.html"},{"revision":"2615a07ec3e17a9a55ad9b832a25e0f7","url":"read/白帽子讲Web安全/index.html"},{"revision":"c1382a0d18816a540bc54afa0ccc1f3f","url":"read/皮囊/index.html"},{"revision":"113974cfd5e44da1efd554fe4e076c2b","url":"read/禅与摩托车维修艺术/index.html"},{"revision":"aed8ecaad8bb98a877e1f7296d2d26f6","url":"read/穆斯林的葬礼/index.html"},{"revision":"08bf0e1d09a3d9edb1a8338e69797ab8","url":"read/系统之美/index.html"},{"revision":"80fdc90c6635ea006ba4599fb0d1b511","url":"read/红与黑/index.html"},{"revision":"06a335aa3220e0fcf86f70f1255256c8","url":"read/编码：隐匿在计算机软硬件背后的语言/index.html"},{"revision":"554e804bbf621db3d014e155b9e89ed4","url":"read/置身事内/index.html"},{"revision":"938fc1163220e81a90c1e2b956356fc3","url":"read/美丽新世界/index.html"},{"revision":"9c56abaeffe19356345a035206fc3734","url":"read/苔丝/index.html"},{"revision":"59b3bde7b716f507a8cd206fdcc46705","url":"read/蛙/index.html"},{"revision":"a7a8b04c7e0b686600ab39006e9ad139","url":"read/西游记/index.html"},{"revision":"09628fa8faf3df4a6e109aae39c904de","url":"read/规训与惩罚/index.html"},{"revision":"db8b143b87315b6b54d748675895ae8a","url":"read/许三观卖血记/index.html"},{"revision":"9761131c147ce353c6618cefcf908c8d","url":"read/财富自由之路/index.html"},{"revision":"08ba2673e486635b30783564a8e2f376","url":"read/边城/index.html"},{"revision":"0c9669a19d0c72eb1e06f2e51c44d557","url":"read/运动改造大脑/index.html"},{"revision":"1b65a1f0a4496cb5c97106a5e68cf8e4","url":"read/追风筝的人/index.html"},{"revision":"7dd2bb738d50dc96d4855b6aedc53125","url":"read/钢铁是怎样炼成的/index.html"},{"revision":"dd10aa8a9ace014d3f67d8454a4ba0eb","url":"read/飘/index.html"},{"revision":"4c832b2cea0434095faa7757114f098b","url":"read/黑客与画家/index.html"},{"revision":"a2588dfc6dff8a71fc3ccaae152ee270","url":"search/index.html"},{"revision":"a6f6e4fcbecdcea0e2063bc71c597fc5","url":"favicon.ico"},{"revision":"860e216675e590f77854e887c10c180c","url":"img/docusaurus.svg"},{"revision":"0dac6e949090464859f96b6a5fe0c51c","url":"img/logo-192.svg"},{"revision":"818b5e8b00070e5ef5e1b20b14b15267","url":"img/logo-512.svg"},{"revision":"11581c5c8efd509ca325013506b8eb17","url":"img/protruding-squares.svg"},{"revision":"66c678209ce93b6e2b583f02ce41529e","url":"katex/fonts/KaTeX_AMS-Regular.woff2"},{"revision":"a9e9b0953b078cd40f5e19ef4face6fc","url":"katex/fonts/KaTeX_Caligraphic-Bold.woff2"},{"revision":"08d95d99bf4a2b2dc7a876653857f154","url":"katex/fonts/KaTeX_Caligraphic-Regular.woff2"},{"revision":"796f3797cdf36fcaea18c3070a608378","url":"katex/fonts/KaTeX_Fraktur-Bold.woff2"},{"revision":"f9e6a99f4a543b7d6cad1efb6cf1e4b1","url":"katex/fonts/KaTeX_Fraktur-Regular.woff2"},{"revision":"a9382e25bcf75d856718fcef54d7acdb","url":"katex/fonts/KaTeX_Main-Bold.woff2"},{"revision":"d873734390c716d6e18ff3f71ac6eb8b","url":"katex/fonts/KaTeX_Main-BoldItalic.woff2"},{"revision":"652970624cde999882102fa2b6a8871f","url":"katex/fonts/KaTeX_Main-Italic.woff2"},{"revision":"f8a7f19f45060f7a177314855b8c7aa3","url":"katex/fonts/KaTeX_Main-Regular.woff2"},{"revision":"1320454d951ec809a7dbccb4f23fccf0","url":"katex/fonts/KaTeX_Math-BoldItalic.woff2"},{"revision":"d8b7a801bd87b324efcbae7394119c24","url":"katex/fonts/KaTeX_Math-Italic.woff2"},{"revision":"ad546b4719bcf690a3604944b90b7e42","url":"katex/fonts/KaTeX_SansSerif-Bold.woff2"},{"revision":"e934cbc86e2d59ceaf04102c43dc0b50","url":"katex/fonts/KaTeX_SansSerif-Italic.woff2"},{"revision":"1ac3ed6ebe34e473519ca1da86f7a384","url":"katex/fonts/KaTeX_SansSerif-Regular.woff2"},{"revision":"1b3161eb8cc67462d6e8c2fb96c68507","url":"katex/fonts/KaTeX_Script-Regular.woff2"},{"revision":"82ef26dc680ba60d884e051c73d9a42d","url":"katex/fonts/KaTeX_Size1-Regular.woff2"},{"revision":"95a1da914c20455a07b7c9e2dcf2836d","url":"katex/fonts/KaTeX_Size2-Regular.woff2"},{"revision":"9108a400f4787cffdcc3a3b813401e6a","url":"katex/fonts/KaTeX_Size3-Regular.woff2"},{"revision":"61522cd3d9043622e235ab57762754f2","url":"katex/fonts/KaTeX_Size4-Regular.woff2"},{"revision":"b8b8393d2e65fcebda5fa99fa3264f41","url":"katex/fonts/KaTeX_Typewriter-Regular.woff2"}];
    const controller = new workbox_precaching__WEBPACK_IMPORTED_MODULE_0__.PrecacheController({
        // Safer to turn this true?
        fallbackToNetwork: true,
    });
    if (params.offlineMode) {
        controller.addToCacheList(precacheManifest);
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: addToCacheList', { precacheManifest });
        }
    }
    await runSWCustomCode(params);
    self.addEventListener('install', (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: install event', { event });
        }
        event.waitUntil(controller.install(event));
    });
    self.addEventListener('activate', (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: activate event', { event });
        }
        event.waitUntil(controller.activate(event));
    });
    self.addEventListener('fetch', async (event) => {
        if (params.offlineMode) {
            const requestURL = event.request.url;
            const possibleURLs = getPossibleURLs(requestURL);
            for (const possibleURL of possibleURLs) {
                const cacheKey = controller.getCacheKeyForURL(possibleURL);
                if (cacheKey) {
                    const cachedResponse = caches.match(cacheKey);
                    if (params.debug) {
                        console.log('[Docusaurus-PWA][SW]: serving cached asset', {
                            requestURL,
                            possibleURL,
                            possibleURLs,
                            cacheKey,
                            cachedResponse,
                        });
                    }
                    event.respondWith(cachedResponse);
                    break;
                }
            }
        }
    });
    self.addEventListener('message', async (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: message event', { event });
        }
        const type = event.data?.type;
        if (type === 'SKIP_WAITING') {
            // lib def bug, see https://github.com/microsoft/TypeScript/issues/14877
            self.skipWaiting();
        }
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=sw.js.map