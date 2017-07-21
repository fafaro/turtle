/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const css = `
    * { font-family: monospace; }
    div {
        min-height: 1em;
        margin-bottom: 5px;
    }
`;
let actualMain = null;
function replay() {
    let trash = [];
    let coll = document.body.children;
    let foundHr = false;
    for (let i = 0; i < coll.length; i++) {
        let child = coll.item(i);
        if (!foundHr) {
            if (child.tagName === 'HR') {
                foundHr = true;
            }
            continue;
        }
        trash.push(child);
    }
    trash.forEach(child => document.body.removeChild(child));
    actualMain();
}
function createReplayButton() {
    let btn = document.createElement('button');
    btn.innerHTML = '&#8635;';
    btn.addEventListener('click', replay);
    document.body.appendChild(btn);
    let hr = document.createElement('hr');
    document.body.appendChild(hr);
}
function wrapmain(main) {
    actualMain = main;
    return () => {
        addCss(css);
        createReplayButton();
        main();
    };
}
exports.wrapmain = wrapmain;
function addCss(css) {
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
function input(msg = "") {
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.innerText = msg;
    div.appendChild(span);
    let elem = document.createElement("input");
    elem.setAttribute("type", "text");
    div.appendChild(elem);
    document.body.appendChild(div);
    elem.focus();
    return new Promise(resolve => {
        elem.addEventListener("keyup", ke => {
            if (ke.keyCode == 13 && elem.value.trim() !== '') {
                elem.readOnly = true;
                let val = elem.value.trim();
                if (/^\d+$/.test(val))
                    resolve(Number(val));
                else
                    resolve(elem.value);
            }
        });
    });
}
exports.input = input;
function print(msg = "") {
    let s = String(msg);
    if (s.trim() === "")
        s += " ";
    let elem = document.createElement("div");
    elem.innerText = s;
    document.body.appendChild(elem);
}
exports.print = print;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __webpack_require__(3);
function vecAdd(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
function vecMul(a, b) {
    return { x: a.x * b, y: a.y * b };
}
function vecAvg(a, b) {
    return vecMul(vecAdd(a, b), 0.5);
}
/**
 * Turtle class for drawing cool pictures.
 * @example let t = new Turtle();
*/
class Turtle {
    /**
     * Creates a canvas and initializes the turtle at the center.
     * @param width Width of the canvas.
     * @param height Height of the canvas.
     */
    constructor(width = 320, height = 320) {
        this._divElem = HTMLDivElement = null;
        this._elem = null;
        this._overlayElem = null;
        this._ctx = null;
        this._overlayCtx = null;
        this._pos = { x: 0, y: 0 };
        this._dirAngle = 0;
        this._penDown = true;
        this._width = 0;
        this._height = 0;
        this._color = "black";
        this._penWidth = 1;
        this._showTurtle = true;
        this._consoleVisible = false;
        this._consoleElem = null;
        this._liveMode = false;
        this._interactiveMode = false;
        this._posStack = [];
        this._drawTurtleCache = {
            color: 0,
        };
        this._penStack = [];
        this._width = width;
        this._height = height;
        let divElem = document.createElement('div');
        divElem.style.display = 'inline-block';
        divElem.style.width = String(width);
        divElem.style.height = String(height);
        divElem.style.border = "1px solid black";
        divElem.style.backgroundColor = 'white';
        divElem.style.position = "relative";
        divElem.style.display = 'inline-flex';
        divElem.style.overflow = 'auto';
        divElem.style.flexDirection = 'column';
        window.addEventListener('keyup', (evt) => {
            //console.log(evt);
            if (evt.key === 'F2') {
                this.toggleConsole();
            }
        });
        let elem = document.createElement('canvas');
        elem.setAttribute("width", String(width));
        elem.setAttribute("height", String(height));
        divElem.appendChild(elem);
        let elem2 = document.createElement('canvas');
        elem2.setAttribute("width", String(width));
        elem2.setAttribute("height", String(height));
        elem2.style.pointerEvents = 'none';
        elem2.style.position = "absolute";
        elem2.style.left = "0";
        elem2.style.top = "0";
        divElem.appendChild(elem2);
        let consoleElem = document.createElement('textarea');
        consoleElem.setAttribute('contenteditable', 'true');
        consoleElem.setAttribute('spellcheck', 'false');
        consoleElem.setAttribute('wrap', 'off');
        consoleElem.style['display'] = 'inline-block';
        //consoleElem.style['min-width'] = '200px';
        //consoleElem.style['max-width'] = '200px';
        consoleElem.style['min-height'] = '300px';
        consoleElem.style['overflow'] = 'auto';
        consoleElem.style['white-space'] = 'pre';
        //consoleElem.style['min-height'] = '100px';
        consoleElem.style['border'] = '1px solid gray';
        consoleElem.style['margin'] = '0px';
        consoleElem.setAttribute('autocapitalize', 'none');
        //consoleElem.innerHtml = "Hello";
        consoleElem.addEventListener('keyup', evt => {
            if (evt.keyCode == 13 && this._interactiveMode) {
                //console.log(evt);
                let value = evt.target['value'].slice(0, evt.target['selectionStart'] - 1);
                value = value.match(/[^\n]*$/)[0];
                //console.log({val:value});
                this.command(value);
            }
        });
        consoleElem.addEventListener('keydown', evt => {
            //console.log(evt);
            //evt.preventDefault();
            if (evt.key === 'r' && evt.ctrlKey) {
                evt.preventDefault();
                // console.log(evt);
                this.reset();
                this.execute(consoleElem.innerText || consoleElem.value);
                //consoleElem.innerHTML = `<span style='border-bottom:2px dotted red;'>${consoleElem.innerText}</span>`;
                //console.log(["innerTxt", consoleElem.innerText])
            }
            else if (evt.key == 'l' && evt.ctrlKey) {
                evt.preventDefault();
                this._liveMode = !this._liveMode;
                if (this._liveMode) {
                    this._interactiveMode = false;
                    consoleElem.style.border = '1px solid red';
                    consoleElem.style.backgroundColor = '#FEE';
                }
                else {
                    consoleElem.style.border = '1px solid gray';
                    consoleElem.style.backgroundColor = '#FFF';
                }
            }
            else if (evt.key == 'i' && evt.ctrlKey) {
                evt.preventDefault();
                this._interactiveMode = !this._interactiveMode;
                if (this._interactiveMode) {
                    this._liveMode = false;
                    consoleElem.style.border = '1px solid green';
                    consoleElem.style.backgroundColor = '#EFE';
                }
                else {
                    consoleElem.style.border = '1px solid gray';
                    consoleElem.style.backgroundColor = '#FFF';
                }
            }
        });
        consoleElem.addEventListener('input', (evt) => {
            if (!this._liveMode)
                return;
            this.reset();
            this.execute(evt.target['value']);
            //for (let line of lines) {
            //    this.command(line);
            //}
        });
        //consoleElem.setAttribute('rows', '100');
        //consoleElem.setAttribute('cols', '50');
        divElem.appendChild(consoleElem);
        this._consoleElem = consoleElem;
        this._consoleElem.style.display = this._consoleVisible ? 'inline-block' : 'none';
        document.body.appendChild(divElem);
        this._divElem = divElem;
        this._elem = elem;
        this._overlayElem = elem2;
        this._ctx = elem.getContext('2d');
        this._overlayCtx = elem2.getContext('2d');
        this._pos = { x: width / 2, y: height / 2 };
        //this._ctx.imageSmoothingEnabled = true;
        //this._ctx.setTransform(1, 0, 0, -1, width / 2, height / 2);
        //this._overlayElem.style['mix-blend-mode'] = 'exclusion';
        //this._overlayCtx.moveTo(0, 0);
        //this._overlayCtx.lineTo(100, 100);
        //this._overlayCtx.stroke();
        setInterval(this.drawTurtle.bind(this), 100);
        let fsBtn = document.createElement('button');
        fsBtn.innerText = "fullscreen";
        fsBtn.addEventListener('click', e => {
            //console.log(document.webkitFullscreenElement);
            if (document.webkitFullscreenElement === null)
                this._divElem.webkitRequestFullscreen();
            else
                document.webkitExitFullscreen();
        });
        this._divElem.appendChild(fsBtn);
        this.clear();
    }
    command(input) {
        if (input[0] === '#')
            return;
        let tokens = input.toUpperCase().split(' ').filter(t => t);
        if (tokens.length == 0)
            return;
        let comm = tokens[0];
        let arg1 = tokens.length >= 2 ? tokens[1] : null;
        switch (comm) {
            case 'LEFT':
            case 'LT':
                arg1 && this.left(Number(arg1));
                break;
            case 'RIGHT':
            case 'RT':
                arg1 && this.right(Number(arg1));
                break;
            case 'FORWARD':
            case 'FD':
                arg1 && this.forward(Number(arg1));
                break;
            case 'BACKWARD':
            case 'BACK':
            case 'BK':
                arg1 && this.forward(-Number(arg1));
                break;
            case 'THICK':
            case 'THICKNESS':
                arg1 && (this.thickness = Number(arg1));
                break;
            case 'CLEAR':
            case 'CLR':
                this.clear();
                break;
            case 'RESET':
                this.reset();
                break;
            case 'PENUP':
            case 'PU':
                this.penUp();
                break;
            case 'PENDOWN':
            case 'PD':
                this.penDown();
                break;
            case 'HIDE':
                this.hide();
                break;
            case 'SHOW':
                this.show();
                break;
            case 'COL':
            case 'COLOR':
                this.color = arg1;
                break;
            case 'PUSHPOS':
                this.pushPos();
                break;
            case 'POPPOS':
                this.popPos();
                break;
            case 'HOME':
                this.home();
                break;
            case 'HSL':
                if (arg1 && arg1 === '@ANGLE') {
                    this.color = this.hsl(this.angle);
                }
        }
        //let m = input.match(/^\s*(left|lt)\s+([0-9]+)\s*$/i);
        //if (m) {
        //    this.left(Number(m[2]));
        // }
    }
    execute(script) {
        //console.log(["Parsing:", script]);
        script += "\n";
        let frame = new class {
            constructor() {
                this.frame = {};
                this.procs = {};
            }
            setVar(name, val) {
                this.frame[name] = val;
            }
            getVar(name) {
                return this.frame[name];
            }
            setProc(name, params, body) {
                this.procs[name] = { name: name, params: params, body: body };
            }
            getProc(name) {
                return this.procs[name];
            }
            get values() { return this.frame; }
        };
        let execBody = null;
        let assert = (cond, msg = "") => {
            if (!cond)
                throw SyntaxError(msg);
        };
        let evalExpr = null;
        let evalFunc = (func, params) => {
            let param1 = () => evalExpr(params[0]);
            switch (func) {
                case "@sin":
                    return Math.sin(param1() * Math.PI / 180);
                case "@cos":
                    return Math.sin(param1() * Math.PI / 180);
                case "@sqrt":
                    return Math.sqrt(param1());
            }
        };
        evalExpr = (expr) => {
            if (typeof expr === 'number') {
                return expr;
            }
            else if (typeof expr === 'string') {
                return frame.getVar(expr);
            }
            else if (expr.node === "Expression") {
                let total = evalExpr(expr.terms[0]);
                for (let i = 1; i < expr.terms.length; i++) {
                    let val = evalExpr(expr.terms[i]);
                    switch (expr.ops[i - 1]) {
                        case '+':
                            total += val;
                            break;
                        case '-':
                            total -= val;
                            break;
                    }
                }
                return total;
            }
            else if (expr.node === "Expression:Call") {
                return evalFunc(expr.func, expr.params);
            }
            else if (expr.node === "Term") {
                let total = evalExpr(expr.factors[0]);
                for (let i = 1; i < expr.factors.length; i++) {
                    let val = evalExpr(expr.factors[i]);
                    switch (expr.ops[i - 1]) {
                        case '*':
                            total *= val;
                            break;
                        case '/':
                            total /= val;
                            break;
                    }
                }
                return total;
            }
            else
                console.log(['Cant evaluate', expr]);
        };
        let execCommand = (cmd, params) => {
            switch (cmd.toUpperCase()) {
                case 'FD':
                case 'FORWARD':
                    assert(params.length >= 1, "FORWARD requires 1 parameter.");
                    this.forward(evalExpr(params[0]));
                    break;
                case 'BK':
                case 'BACKWARD':
                    assert(params.length >= 1, "BACKWARD requires 1 parameter.");
                    this.forward(-evalExpr(params[0]));
                    break;
                case 'LT':
                case 'LEFT':
                    assert(params.length >= 1, "LEFT requires 1 parameter.");
                    this.left(evalExpr(params[0]));
                    break;
                case 'RT':
                case 'RIGHT':
                    assert(params.length >= 1, "RIGHT requires 1 parameter.");
                    this.right(evalExpr(params[0]));
                    break;
                case 'HIDE':
                    this.hide();
                    break;
                case 'SHOW':
                    this.show();
                    break;
                case 'PENUP':
                case 'PU':
                    this.penUp();
                    break;
                case 'PENDOWN':
                case 'PD':
                    this.penDown();
                    break;
                case 'HOME':
                    this.home();
                    break;
                case 'PUSHPOS':
                    this.pushPos();
                    break;
                case 'POPPOS':
                    this.popPos();
                    break;
                case 'THICK':
                case 'THICKNESS':
                    assert(params.length >= 1, "THICKNESS requires 1 parameter.");
                    this.thickness = evalExpr(params[0]);
                    break;
                case 'SCREEN':
                    assert(params.length >= 2, "SCREEN requires 2 parameter.");
                    this.screen(evalExpr(params[0]), evalExpr(params[1]));
                    break;
                default:
                    console.log(["Cant execute:", cmd, params]);
            }
        };
        let execRepeat = (count, body) => {
            let actualCount = 0;
            if (typeof count === 'string') {
                actualCount = frame.getVar(count);
            }
            else
                actualCount = count;
            for (let i = 0; i < actualCount; i++)
                execBody(body);
        };
        let execLet = (ident, val) => {
            frame.setVar(ident, val);
            //console.log(frame.values);
        };
        let execAssign = (ident, val) => {
            frame.setVar(ident, val);
            //console.log(frame.values);
        };
        let execStatement = (s) => {
            //console.log(s);
            switch (s.node) {
                case 'Statement:Command':
                    execCommand(s.command, s.params);
                    break;
                case 'Statement:Repeat':
                    execRepeat(s.count, s.body);
                    break;
                case 'Statement:Color':
                    switch (s.value) {
                        case 'hsl(angle)':
                            this.color = this.hsl(this.angle);
                            break;
                        default:
                            this.color = s.value;
                    }
                    break;
                case 'Statement:Let':
                    execLet(s.identifier, evalExpr(s.value));
                    break;
                case 'Statement:Assign':
                    execAssign(s.variable, evalExpr(s.value));
                    break;
                case 'ProcDecl':
                    frame.setProc(s.name, s.params, s.body);
                    break;
                case 'Expression:Call':
                    {
                        console.log(s);
                        console.log(frame.getProc(s.func));
                        let proc = frame.getProc(s.func);
                        if (!proc)
                            return;
                        if (s.params.length < proc.params.length) {
                            console.log(`Too few params to ${proc.name}`);
                            return;
                        }
                        let pdecl = [];
                        for (let i = 0; i < proc.params.length; i++) {
                            pdecl.push({
                                node: 'Statement:Let',
                                identifier: proc.params[i],
                                value: evalExpr(s.params[i])
                            });
                        }
                        pdecl = pdecl.concat(proc.body);
                        execBody(pdecl);
                    }
                    break;
                default:
                    console.log(["Cant execute:", s]);
            }
        };
        execBody = (stats) => {
            for (let s of stats) {
                execStatement(s);
            }
        };
        try {
            let ast = parser_1.parse(script);
            console.log(["ast", ast]);
            execBody(ast.statements);
        }
        catch (e) {
            console.log(e instanceof parser_1.SyntaxError);
            console.log(e);
        }
        //for (let stat of )
        // let lines = script.split("\n");
        // let ctrlStack = [];
        // for (let i = 0; i < lines.length; i++) {
        //     let line = lines[i];
        //     if (line[0] === '#') continue;
        //     let tokens = line.toUpperCase().split(' ').filter(t => t);
        //     let comm = tokens.length >= 1 ? tokens[0] : null;
        //     if (!comm) continue;
        //     let arg1 = tokens.length >= 2 ? tokens[1] : null;
        //     switch (comm) {
        //         case 'REPEAT':
        //             ctrlStack.push({
        //                 n: arg1 || 0,
        //                 ctr: 0,
        //                 begin: i
        //             });
        //            // console.log("REPEAT " + arg1);
        //             break;
        //         case 'END':
        //             if (ctrlStack.length > 0) {
        //                 //console.log(ctrlStack);
        //                 let frame = ctrlStack[ctrlStack.length - 1];
        //                 frame.ctr++;
        //                 if (frame.ctr < frame.n) {
        //                     //console.log(`GOTO ${frame.begin}, CTR=${frame.ctr}, N=${frame.n}`)
        //                     i = frame.begin;
        //                 }
        //                 else ctrlStack.pop();
        //             }
        //             break;
        //         default:
        //             this.command(line);
        //     }
        // }
    }
    toggleConsole() {
        this._consoleVisible = !this._consoleVisible;
        this._consoleElem.style.display = this._consoleVisible ? "inline-block" : "none";
    }
    set liveMode(value) { this._liveMode = value; }
    drawTurtle() {
        const ctx = this._overlayCtx;
        const cache = this._drawTurtleCache;
        ctx.clearRect(0, 0, this.width, this.height);
        if (this._showTurtle) {
            let drawTurtle = (x, y, rad, angle) => {
                let xaxis = { x: Math.cos(rad), y: -Math.sin(rad) };
                let yaxis = { x: xaxis.y, y: -xaxis.x };
                let trans = (p) => {
                    return vecAdd(vecAdd(vecMul(xaxis, p.x), vecMul(yaxis, p.y)), { x: x, y: y });
                };
                let pts = [
                    { x: 0, y: 0 },
                    { x: -10 - 5, y: -8 },
                    { x: -10, y: 0 },
                    { x: -10 - 5, y: 8 },
                    //{ x:10, y:0 },
                    { x: 0, y: 0 },
                ];
                pts.forEach(p => { p.x += 10; });
                ctx.beginPath();
                ctx.strokeStyle = ['black', 'white', 'gray'][cache.color];
                //ctx.strokeStyle = this._color == 'black' ? 'white' : 'black';
                //ctx.ellipse(this.pos.x, this.pos.y, 10, 10, 0, 0, 360);
                for (let i = 0; i < pts.length; i++) {
                    let p = trans(pts[i]);
                    if (i == 0)
                        ctx.moveTo(p.x, p.y);
                    else
                        ctx.lineTo(p.x, p.y);
                }
                //ctx.closePath();
                // ctx.strokeStyle = 'black';
                // ctx.lineWidth = 1.5;
                // ctx.stroke();
                // ctx.strokeStyle = 'gray';
                // ctx.lineWidth = 1;
                ctx.fillStyle = this._color == 'black' ? 'white' : this._color;
                ctx.fill();
                ctx.stroke();
                //ctx.beginPath();
                ctx.fillStyle = 'gray';
                ctx.fillText(`X: ${Math.round(x)}, Y: ${Math.round(y)}, \u03b8: ${Math.round(angle)}\u00b0`, 2, 10);
                ctx.fillText(`${this._penDown ? 'P▼' : 'P▲'}`, 2, 20);
            };
            drawTurtle(this.pos.x, this.pos.y, this.dirRad, this.angle);
            //cache.color = (cache.color + 1) % 2;
        }
    }
    get dirRad() {
        return this._dirAngle * Math.PI / 180;
    }
    get dirVec() {
        return { x: Math.cos(this.dirRad), y: -Math.sin(this.dirRad) };
    }
    /**
     * Height of the canvas.
     */
    get height() { return this._height; }
    /**
     * Width of the canvas.
     */
    get width() { return this._width; }
    screen(width, height) {
        if (this._width == width && this._height == height)
            return;
        this._width = width;
        this._height = height;
        this._elem.setAttribute("width", String(width));
        this._elem.setAttribute("height", String(height));
        this._overlayElem.setAttribute("width", String(width));
        this._overlayElem.setAttribute("height", String(height));
        this.reset();
    }
    /**
     * Get or set the position of the turtle. Coordinates are
     * (0,0) at upper-left corner, to (width, height) at lower-right corner.
     *
     * Example:
     *
     * // Set the turtle's position to the center of the canvas
     *
     * turtle.pos = {x: turtle.width/2, y: turtle.height/2};
     */
    get pos() { return Object.assign({}, this._pos); }
    set pos(value) { this._pos = value; }
    /**
     * Helper function for setting position to important locations.
     *
     * turtle.pos = turtle.corners.upperLeft;
     */
    get corners() {
        let left = 0;
        let cx = this._width / 2;
        let right = this._width;
        let top = 0;
        let cy = this._height / 2;
        let lower = this._height;
        let p = (x, y) => { return { x: x, y: y }; };
        return {
            left: p(left, cy),
            upper: p(cx, top),
            right: p(right, cy),
            lower: p(cx, lower),
            upperLeft: p(0, 0),
            upperRight: p(right, 0),
            lowerLeft: p(0, lower),
            lowerRight: p(right, lower),
            center: p(cx, cy),
        };
    }
    /**
     * Lift the turtle's pen up. This will make it stop drawing.
     */
    penUp() { this._penDown = false; }
    /**
     * Put the pen down to resume drawing.
     */
    penDown() { this._penDown = true; }
    hide() { this._showTurtle = false; }
    show() { this._showTurtle = true; }
    /**
     * Set the color of the pen.
     *
     * Examples:
     *
     * turtle.color = 'red';
     *
     * turtle.color = 'rgb(255, 0, 0)';
     *
     * turtle.color = turtle.hsl(72); // 0-360 represent colors of the rainbow
     */
    set color(value) {
        this._color = value;
    }
    get color() { return this._color; }
    hsl(hue) {
        return `hsl(${hue % 360}, 100%, 50%)`;
    }
    /**
     * Get or set the direction of the turtle, as degrees.
     *
     * 0 degrees is towards the right, and then the angle moves
     * anti-clockwise i.e. 90 is towards the top etc.
     */
    get angle() { return this._dirAngle; }
    set angle(value) { this._dirAngle = value; }
    /**
     * Get or set the thickness of the pen.
     */
    get thickness() { return this._penWidth; }
    set thickness(value) { this._penWidth = value; }
    /**
     * Move forward by x pixels.
     * @param x
     */
    forward(x) {
        let oldPos = this._pos;
        this.pos = vecAdd(this.pos, vecMul(this.dirVec, x));
        if (this._penDown) {
            this._ctx.beginPath();
            this._ctx.moveTo(oldPos.x, oldPos.y);
            this._ctx.lineTo(this._pos.x, this._pos.y);
            //let cp = vecAvg(oldPos, this._pos);
            //this._ctx.quadraticCurveTo(cp.x, cp.y, this._pos.x, this._pos.y);
            this._ctx.strokeStyle = this._color;
            this._ctx.lineWidth = this._penWidth;
            this._ctx.lineCap = "round";
            this._ctx.stroke();
        }
    }
    /**
     * Turn left.
     * @param deg Angle in degrees
     */
    left(deg) {
        let angle = this.angle;
        angle += deg;
        angle %= 360;
        this.angle = angle;
    }
    /**
     * Turn right.
     * @param deg Angle in degrees
     */
    right(deg) {
        let angle = this.angle;
        angle -= deg;
        angle %= 360;
        this.angle = angle;
    }
    /**
     * Update the screen with whatever has been drawn so far.
     * Call this only if you wish to see the progress so far,
     * otherwise it isn't strictly necessary. This is good
     * for inspecting the movement of the turtle, or for
     * animation.
     * @param delayms Delay
     */
    update(delayms = 0) {
        return new Promise(resolve => setTimeout(resolve, delayms));
    }
    /**
     * Clear the screen. Useful for animation.
     */
    clear() {
        //this._ctx.curr
        //this._ctx.clearRect(-this._width, -this._height, this._width * 2, this._height * 2);
        this._ctx.clearRect(0, 0, this._width, this._height);
        let prev = this._ctx.fillStyle;
        this._ctx.fillStyle = 'white';
        this._ctx.fillRect(0, 0, this._width, this._height);
        this._ctx.fillStyle = prev;
    }
    /**
     * Push the current position and angle onto an internal stack.
     * This is useful for retaining the original position of the turtle
     * and then returning to it after, for example, a subroutine drawing.
     *
     * Example:
     *
     * turtle.pushPos();
     * // do some drawing
     * turtle.popPos(); // back to original position
     */
    pushPos() {
        this._posStack.push({
            pos: Object.assign({}, this._pos),
            angle: this._dirAngle
        });
    }
    /**
     * See pushPos().
     */
    popPos() {
        if (this._posStack.length > 0) {
            let frame = this._posStack.pop();
            this.pos = frame.pos;
            this.angle = frame.angle;
        }
    }
    pushPen() {
        this._penStack.push({
            penDown: this._penDown,
            penThickness: this.thickness,
            color: this.color
        });
    }
    popPen() {
        if (this._penStack.length > 0) {
            let frame = this._penStack.pop();
            this._penDown = frame.penDown;
            this.thickness = frame.penThickness;
            this.color = frame.color;
        }
    }
    home() {
        this.pos = this.corners.center;
        this.angle = 0;
    }
    reset() {
        this._posStack = [];
        this.clear();
        this.home();
        this.resetPen();
        this.show();
    }
    resetPen() {
        this.thickness = 1;
        this.color = 'black';
        this._penDown = true;
    }
}
exports.Turtle = Turtle;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const c = __webpack_require__(0);
const turtle_1 = __webpack_require__(1);
window.onload = c.wrapmain(main);
const input = c.input;
const print = c.print;
function fact(i) {
    let result = 1;
    for (let j = 1; j <= i; j++)
        result *= j;
    return result;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let t = new turtle_1.Turtle();
        t.toggleConsole();
        t.liveMode = true;
        // t.execute(`
        // fd 100
        // lt 90
        // `);
        //t.left(90);
        //t.forward(100);
        window['t'] = t;
        //t.pos = t.corners.lower;
        // let drawStar = (radius, callAtPoint = null) => {
        //     t.pushPos();
        //     t.penUp();
        //     t.left(90);
        //     t.forward(radius);
        //     t.left(360 * 2 / 5 - (180 - 360 * 2 / 5) * 2 + 180 + 90);
        //     t.penDown();
        //     for (let i = 0; i < 5; i++) {
        //         t.forward(radius * Math.sin(360 / 5 / 2) * 2);
        //         if (callAtPoint) callAtPoint();
        //         t.left(360 * 2 / 5);
        //     }
        //     t.popPos();
        // };
        // drawStar(100, () => drawStar(33, () => drawStar(11)));
        // for (let i = 0; i < 360; i+=10) {
        //     t.forward(20);
        //     t.left(10);
        // }
        // for (let i = 0; i < 360; i += 10) {
        //     t.penThickness = 5;
        //     t.pos = t.corners.center;
        //     t.color = t.hsl(i*4);
        //     t.forward(100);
        //     t.pushPos();
        //     t.right(90);
        //     t.left(45);
        //     let side = 40;
        //     t.forward(side);
        //     t.left(90+45);
        //     t.forward(side * 2 / Math.sqrt(2));
        //     t.left(90+ 45);
        //     t.forward(side);
        //     t.popPos();
        //     t.left(10);
        //     await t.update(100);
        // }
        // t.pos = t.corners.left;
        // t.color;
        // for (let i = 0; i < 5; i++) {
        //     t.forward(100);
        //     t.left(360 * 2 / 5);
        // }
        // for (let j = 0; j < 36; j++) {
        //     //if (j % 2 == 0) t.penUp();
        //     //else t.penDown();
        //     //t.clear();
        //     t.color = t.hsl(j*10);
        //     t.penThickness = 10;
        //     for (let i = 0; i < 4; i++) {
        //         t.forward(100);
        //         t.left(90);
        //     }
        //     t.left(10);
        //     await t.update(100);
        // }
        // t.hide();
        // let n = await input("Enter n: ");
        //     //print(fact(n));
        //    let a = [];
        //     for (let i = 1; i <= n; i++)
        //       a.push(await input(`Enter #${i}: `));
        //    print(a.reduce((a,b)=>a+b, 0));
    });
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */



function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { Script: peg$parseScript },
      peg$startRuleFunction  = peg$parseScript,

      peg$c0 = "\n",
      peg$c1 = peg$literalExpectation("\n", false),
      peg$c2 = function(stat) { return stat; },
      peg$c3 = function(stats) { 
            return {node:"Script", statements:stats.filter(s => s)}; 
          },
      peg$c4 = "let",
      peg$c5 = peg$literalExpectation("let", false),
      peg$c6 = "=",
      peg$c7 = peg$literalExpectation("=", false),
      peg$c8 = function(ident, expr) { 
            return { node: "Statement:Let", identifier: ident, value: expr }; 
          },
      peg$c9 = "proc",
      peg$c10 = peg$literalExpectation("proc", false),
      peg$c11 = "(",
      peg$c12 = peg$literalExpectation("(", false),
      peg$c13 = ")",
      peg$c14 = peg$literalExpectation(")", false),
      peg$c15 = "end",
      peg$c16 = peg$literalExpectation("end", false),
      peg$c17 = function(procname, params, body) {
       		return {
              	node: "ProcDecl",
                  name: procname,
                  params: params,
                  body: body.statements
              };
       	},
      peg$c18 = "repeat",
      peg$c19 = peg$literalExpectation("repeat", false),
      peg$c20 = function(count, body) { 
            return { node: "Statement:Repeat", count: count, body: body.statements }; 
          },
      peg$c21 = "call",
      peg$c22 = peg$literalExpectation("call", false),
      peg$c23 = function(funcc) { return funcc; },
      peg$c24 = "color",
      peg$c25 = peg$literalExpectation("color", false),
      peg$c26 = "col",
      peg$c27 = peg$literalExpectation("col", false),
      peg$c28 = function(val) {
            return { node: "Statement:Color", value: val };
         },
      peg$c29 = function(comm, params) { 
            return { node: "Statement:Command", command: comm, params: params }; 
         },
      peg$c30 = function(ident, expr) { 
            return { node: "Statement:Assign", variable: ident, value: expr }; 
         },
      peg$c31 = function() { return null; },
      peg$c32 = /^[^\n]/,
      peg$c33 = peg$classExpectation(["\n"], true, false),
      peg$c34 = function() { return {node:"Error"}; },
      peg$c35 = "pushpos",
      peg$c36 = peg$literalExpectation("pushpos", true),
      peg$c37 = "poppos",
      peg$c38 = peg$literalExpectation("poppos", true),
      peg$c39 = "fd",
      peg$c40 = peg$literalExpectation("fd", true),
      peg$c41 = "forward",
      peg$c42 = peg$literalExpectation("forward", true),
      peg$c43 = "bk",
      peg$c44 = peg$literalExpectation("bk", true),
      peg$c45 = "backward",
      peg$c46 = peg$literalExpectation("backward", true),
      peg$c47 = "lt",
      peg$c48 = peg$literalExpectation("lt", true),
      peg$c49 = "left",
      peg$c50 = peg$literalExpectation("left", true),
      peg$c51 = "rt",
      peg$c52 = peg$literalExpectation("rt", true),
      peg$c53 = "right",
      peg$c54 = peg$literalExpectation("right", true),
      peg$c55 = "show",
      peg$c56 = peg$literalExpectation("show", true),
      peg$c57 = "hide",
      peg$c58 = peg$literalExpectation("hide", true),
      peg$c59 = "penup",
      peg$c60 = peg$literalExpectation("penup", true),
      peg$c61 = "pu",
      peg$c62 = peg$literalExpectation("pu", true),
      peg$c63 = "pendown",
      peg$c64 = peg$literalExpectation("pendown", true),
      peg$c65 = "pd",
      peg$c66 = peg$literalExpectation("pd", true),
      peg$c67 = "home",
      peg$c68 = peg$literalExpectation("home", true),
      peg$c69 = "thick",
      peg$c70 = peg$literalExpectation("thick", true),
      peg$c71 = "thickness",
      peg$c72 = peg$literalExpectation("thickness", true),
      peg$c73 = "screen",
      peg$c74 = peg$literalExpectation("screen", true),
      peg$c75 = function() { return text(); },
      peg$c76 = function(head, tail) { return [head].concat(tail); },
      peg$c77 = /^[a-zA-Z_]/,
      peg$c78 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false),
      peg$c79 = /^[a-zA-Z_0-9]/,
      peg$c80 = peg$classExpectation([["a", "z"], ["A", "Z"], "_", ["0", "9"]], false, false),
      peg$c81 = function() { return "@" + text(); },
      peg$c82 = "+",
      peg$c83 = peg$literalExpectation("+", false),
      peg$c84 = "-",
      peg$c85 = peg$literalExpectation("-", false),
      peg$c86 = function(head, op, term) { return {op:op, term:term}; },
      peg$c87 = function(head, tail) {
        		return tail.length == 0 ? head : {
              	"node": "Expression",
                  "terms": [head].concat(tail.map(x=>x.term)),
                  "ops": tail.map(x=>x.op),
              };
          },
      peg$c88 = "*",
      peg$c89 = peg$literalExpectation("*", false),
      peg$c90 = "/",
      peg$c91 = peg$literalExpectation("/", false),
      peg$c92 = function(head, op, factor) { return {op:op, factor: factor}},
      peg$c93 = function(head, tail) {
        		return tail.length == 0 ? head : {
              	"node": "Term",
                  "factors": [head].concat(tail.map(x=>x.factor)),
                  "ops": tail.map(x=>x.op)
              };
          },
      peg$c94 = function(expr) { return expr; },
      peg$c95 = function(func, params) { 
            return { node: "Expression:Call", func: func, params: params }; 
          },
      peg$c96 = function(head, tail) { return [head].concat(tail.map(x=>x[1])); },
      peg$c97 = function() { return []; },
      peg$c98 = /^[0-9]/,
      peg$c99 = peg$classExpectation([["0", "9"]], false, false),
      peg$c100 = ".",
      peg$c101 = peg$literalExpectation(".", false),
      peg$c102 = function() { return parseFloat(text()); },
      peg$c103 = "\"",
      peg$c104 = peg$literalExpectation("\"", false),
      peg$c105 = /^[^"]/,
      peg$c106 = peg$classExpectation(["\""], true, false),
      peg$c107 = function(val) { return val.join(""); },
      peg$c108 = "'",
      peg$c109 = peg$literalExpectation("'", false),
      peg$c110 = /^[^']/,
      peg$c111 = peg$classExpectation(["'"], true, false),
      peg$c112 = peg$otherExpectation("whitespace"),
      peg$c113 = /^[ \t\r]/,
      peg$c114 = peg$classExpectation([" ", "\t", "\r"], false, false),
      peg$c115 = "#",
      peg$c116 = peg$literalExpectation("#", false),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseScript() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$parse_();
    if (s3 !== peg$FAILED) {
      s4 = peg$parseStatement();
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        if (s5 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s6 = peg$c0;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c1); }
          }
          if (s6 !== peg$FAILED) {
            peg$savedPos = s2;
            s3 = peg$c2(s4);
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseStatement();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
              s6 = peg$c0;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c1); }
            }
            if (s6 !== peg$FAILED) {
              peg$savedPos = s2;
              s3 = peg$c2(s4);
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c3(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseStatement() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c4) {
      s1 = peg$c4;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c5); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseIdentifier();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s5 = peg$c6;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c7); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseExpression();
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c8(s3, s7);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c9) {
        s1 = peg$c9;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseIdentifier();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s4 = peg$c11;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseParamDeclList();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c13;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c14); }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 10) {
                          s10 = peg$c0;
                          peg$currPos++;
                        } else {
                          s10 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c1); }
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parseScript();
                          if (s11 !== peg$FAILED) {
                            if (input.substr(peg$currPos, 3) === peg$c15) {
                              s12 = peg$c15;
                              peg$currPos += 3;
                            } else {
                              s12 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c16); }
                            }
                            if (s12 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c17(s3, s6, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c18) {
          s1 = peg$c18;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseNumber();
            if (s3 === peg$FAILED) {
              s3 = peg$parseIdentifier();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 10) {
                  s5 = peg$c0;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c1); }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseScript();
                  if (s6 === peg$FAILED) {
                    s6 = null;
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      if (input.substr(peg$currPos, 3) === peg$c15) {
                        s8 = peg$c15;
                        peg$currPos += 3;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c16); }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c20(s3, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c21) {
            s1 = peg$c21;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c22); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseFuncCall();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c23(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 5) === peg$c24) {
              s1 = peg$c24;
              peg$currPos += 5;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c25); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c26) {
                s1 = peg$c26;
                peg$currPos += 3;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c27); }
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parse_();
              if (s2 !== peg$FAILED) {
                s3 = peg$parseString();
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c28(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseCommand();
              if (s1 !== peg$FAILED) {
                s2 = peg$parse_();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseExprList();
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c29(s1, s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseIdentifier();
                if (s1 !== peg$FAILED) {
                  s2 = peg$parse_();
                  if (s2 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 61) {
                      s3 = peg$c6;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c7); }
                    }
                    if (s3 !== peg$FAILED) {
                      s4 = peg$parse_();
                      if (s4 !== peg$FAILED) {
                        s5 = peg$parseExpression();
                        if (s5 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c30(s1, s5);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parse_();
                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    peg$silentFails++;
                    if (input.charCodeAt(peg$currPos) === 10) {
                      s3 = peg$c0;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c1); }
                    }
                    peg$silentFails--;
                    if (s3 !== peg$FAILED) {
                      peg$currPos = s2;
                      s2 = void 0;
                    } else {
                      s2 = peg$FAILED;
                    }
                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c31();
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$currPos;
                    peg$silentFails++;
                    if (input.substr(peg$currPos, 3) === peg$c15) {
                      s2 = peg$c15;
                      peg$currPos += 3;
                    } else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c16); }
                    }
                    peg$silentFails--;
                    if (s2 !== peg$FAILED) {
                      peg$currPos = s1;
                      s1 = void 0;
                    } else {
                      s1 = peg$FAILED;
                    }
                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c31();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      s1 = [];
                      if (peg$c32.test(input.charAt(peg$currPos))) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c33); }
                      }
                      if (s2 !== peg$FAILED) {
                        while (s2 !== peg$FAILED) {
                          s1.push(s2);
                          if (peg$c32.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                          } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c33); }
                          }
                        }
                      } else {
                        s1 = peg$FAILED;
                      }
                      if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c34();
                      }
                      s0 = s1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseCommand() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 7).toLowerCase() === peg$c35) {
      s1 = input.substr(peg$currPos, 7);
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c36); }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 6).toLowerCase() === peg$c37) {
        s1 = input.substr(peg$currPos, 6);
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 2).toLowerCase() === peg$c39) {
          s1 = input.substr(peg$currPos, 2);
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c40); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c41) {
            s1 = input.substr(peg$currPos, 7);
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c42); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2).toLowerCase() === peg$c43) {
              s1 = input.substr(peg$currPos, 2);
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c44); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 8).toLowerCase() === peg$c45) {
                s1 = input.substr(peg$currPos, 8);
                peg$currPos += 8;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c46); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 2).toLowerCase() === peg$c47) {
                  s1 = input.substr(peg$currPos, 2);
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c48); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4).toLowerCase() === peg$c49) {
                    s1 = input.substr(peg$currPos, 4);
                    peg$currPos += 4;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c50); }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2).toLowerCase() === peg$c51) {
                      s1 = input.substr(peg$currPos, 2);
                      peg$currPos += 2;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c52); }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c53) {
                        s1 = input.substr(peg$currPos, 5);
                        peg$currPos += 5;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c54); }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 4).toLowerCase() === peg$c55) {
                          s1 = input.substr(peg$currPos, 4);
                          peg$currPos += 4;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c56); }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c57) {
                            s1 = input.substr(peg$currPos, 4);
                            peg$currPos += 4;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c58); }
                          }
                          if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 5).toLowerCase() === peg$c59) {
                              s1 = input.substr(peg$currPos, 5);
                              peg$currPos += 5;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c60); }
                            }
                            if (s1 === peg$FAILED) {
                              if (input.substr(peg$currPos, 2).toLowerCase() === peg$c61) {
                                s1 = input.substr(peg$currPos, 2);
                                peg$currPos += 2;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c62); }
                              }
                              if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 7).toLowerCase() === peg$c63) {
                                  s1 = input.substr(peg$currPos, 7);
                                  peg$currPos += 7;
                                } else {
                                  s1 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c64); }
                                }
                                if (s1 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 2).toLowerCase() === peg$c65) {
                                    s1 = input.substr(peg$currPos, 2);
                                    peg$currPos += 2;
                                  } else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c66); }
                                  }
                                  if (s1 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c67) {
                                      s1 = input.substr(peg$currPos, 4);
                                      peg$currPos += 4;
                                    } else {
                                      s1 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c68); }
                                    }
                                    if (s1 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 5).toLowerCase() === peg$c69) {
                                        s1 = input.substr(peg$currPos, 5);
                                        peg$currPos += 5;
                                      } else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c70); }
                                      }
                                      if (s1 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 9).toLowerCase() === peg$c71) {
                                          s1 = input.substr(peg$currPos, 9);
                                          peg$currPos += 9;
                                        } else {
                                          s1 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c72); }
                                        }
                                        if (s1 === peg$FAILED) {
                                          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c73) {
                                            s1 = input.substr(peg$currPos, 6);
                                            peg$currPos += 6;
                                          } else {
                                            s1 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c74); }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c75();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseParamDeclList() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseIdentifier();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseIdentifier();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseIdentifier();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c76(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = null;
    }

    return s0;
  }

  function peg$parseIdentifier() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c77.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c78); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c79.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c80); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c79.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c80); }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c81();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseTerm();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 43) {
          s5 = peg$c82;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c83); }
        }
        if (s5 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s5 = peg$c84;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c85); }
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseTerm();
            if (s7 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c86(s1, s5, s7);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 43) {
            s5 = peg$c82;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c83); }
          }
          if (s5 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s5 = peg$c84;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c85); }
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseTerm();
              if (s7 !== peg$FAILED) {
                peg$savedPos = s3;
                s4 = peg$c86(s1, s5, s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c87(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTerm() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parseFactor();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 42) {
          s5 = peg$c88;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c89); }
        }
        if (s5 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s5 = peg$c90;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c91); }
          }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parse_();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseFactor();
            if (s7 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c92(s1, s5, s7);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 42) {
            s5 = peg$c88;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c89); }
          }
          if (s5 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s5 = peg$c90;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c91); }
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseFactor();
              if (s7 !== peg$FAILED) {
                peg$savedPos = s3;
                s4 = peg$c92(s1, s5, s7);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c93(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFactor() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$parseNumber();
    if (s0 === peg$FAILED) {
      s0 = peg$parseFuncCall();
      if (s0 === peg$FAILED) {
        s0 = peg$parseIdentifier();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c11;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseExpression();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s5 = peg$c13;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c14); }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c94(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }

    return s0;
  }

  function peg$parseFuncCall() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    s1 = peg$parseIdentifier();
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c11;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseExprList();
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s6 = peg$c13;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c14); }
              }
              if (s6 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c95(s1, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExprList() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseExpression();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse_();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseExpression();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse_();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseExpression();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c96(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c97();
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parseNumber() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c98.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c99); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c98.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c99); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s3 = peg$c100;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        if (peg$c98.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c99); }
        }
        if (s5 !== peg$FAILED) {
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$c98.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c99); }
            }
          }
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c102();
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseString() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c103;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c104); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c105.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c106); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c105.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c106); }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s3 = peg$c103;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c104); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c107(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c108;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c109); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c110.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c111); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c110.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c111); }
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c108;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c109); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c107(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsews();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsews();
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c31();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c112); }
    }

    return s0;
  }

  function peg$parsews() {
    var s0, s1, s2, s3, s4;

    if (peg$c113.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c114); }
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s2 = peg$c115;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c116); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c32.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c33); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c32.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c33); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c31();
      }
      s0 = s1;
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYwNWE4YzI1ZTVlZjIxNTg4YmQiLCJ3ZWJwYWNrOi8vLy4vY29uc29sZS50cyIsIndlYnBhY2s6Ly8vLi90dXJ0bGUudHMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgyLnRzIiwid2VicGFjazovLy8uL3BhcnNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUEsTUFBTSxHQUFHLEdBQUc7Ozs7OztDQU1YLENBQUM7QUFFRixJQUFJLFVBQVUsR0FBUSxJQUFJLENBQUM7QUFFM0I7SUFDSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDZixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FB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QSxLQUFLO0FBQ0w7QUFDQSxrQ0FBa0Msb0JBQW9CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0Esb0NBQW9DLG9CQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxzQ0FBc0MsbUJBQW1CO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLHdDQUF3QyxtQkFBbUI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjYwNWE4YzI1ZTVlZjIxNTg4YmQiLCJjb25zdCBjc3MgPSBgXHJcbiAgICAqIHsgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgfVxyXG4gICAgZGl2IHtcclxuICAgICAgICBtaW4taGVpZ2h0OiAxZW07XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgfVxyXG5gO1xyXG5cclxubGV0IGFjdHVhbE1haW46IGFueSA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiByZXBsYXkoKSB7XHJcbiAgICBsZXQgdHJhc2ggPSBbXTtcclxuICAgIGxldCBjb2xsID0gZG9jdW1lbnQuYm9keS5jaGlsZHJlbjtcclxuICAgIGxldCBmb3VuZEhyID0gZmFsc2U7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBjb2xsLml0ZW0oaSk7XHJcbiAgICAgICAgaWYgKCFmb3VuZEhyKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC50YWdOYW1lID09PSAnSFInKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZEhyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJhc2gucHVzaChjaGlsZCk7XHJcbiAgICB9XHJcbiAgICB0cmFzaC5mb3JFYWNoKGNoaWxkPT5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNoaWxkKSk7XHJcblxyXG4gICAgYWN0dWFsTWFpbigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSZXBsYXlCdXR0b24oKSB7XHJcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidG4uaW5uZXJIVE1MID0gJyYjODYzNTsnO1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwbGF5KTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIGxldCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBtYWluKG1haW46IGFueSkge1xyXG4gICAgYWN0dWFsTWFpbiA9IG1haW47XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGFkZENzcyhjc3MpO1xyXG4gICAgICAgIGNyZWF0ZVJlcGxheUJ1dHRvbigpO1xyXG4gICAgICAgIG1haW4oKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENzcyhjc3M6IHN0cmluZykge1xyXG4gICAgbGV0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHN0eWxlLmlubmVySFRNTCA9IGNzcztcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxheShtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0KG1zZzogc3RyaW5nID0gXCJcIik6IFByb21pc2U8c3RyaW5nfG51bWJlcj4ge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgc3Bhbi5pbm5lclRleHQgPSBtc2c7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGVsZW0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZWxlbSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICBlbGVtLmZvY3VzKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nfG51bWJlcj4ocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2Uua2V5Q29kZSA9PSAxMyAmJiBlbGVtLnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0ucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGVsZW0udmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKC9eXFxkKyQvLnRlc3QodmFsKSlcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKE51bWJlcih2YWwpKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW0udmFsdWUpO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW50KG1zZzogYW55ID0gXCJcIikge1xyXG4gICAgbGV0IHMgPSBTdHJpbmcobXNnKTtcclxuICAgIGlmIChzLnRyaW0oKSA9PT0gXCJcIikgcyArPSBcIiBcIjtcclxuICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGVsZW0uaW5uZXJUZXh0ID0gcztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25zb2xlLnRzIiwiaW1wb3J0IHsgcGFyc2UsIFN5bnRheEVycm9yIGFzIHBlZ1N5bnRheEVycm9yIH0gZnJvbSAnLi9wYXJzZXInO1xyXG5cclxuZnVuY3Rpb24gdmVjQWRkKGEsIGIpIHtcclxuICAgIHJldHVybiB7eDphLngrYi54LCB5OmEueStiLnl9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB2ZWNNdWwoYSwgYikge1xyXG4gICAgcmV0dXJuIHt4OmEueCAqIGIsIHk6YS55ICogYn07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlY0F2ZyhhLCBiKSB7XHJcbiAgICByZXR1cm4gdmVjTXVsKHZlY0FkZChhLCBiKSwgMC41KTtcclxufVxyXG5cclxuLyoqIFxyXG4gKiBUdXJ0bGUgY2xhc3MgZm9yIGRyYXdpbmcgY29vbCBwaWN0dXJlcy4gXHJcbiAqIEBleGFtcGxlIGxldCB0ID0gbmV3IFR1cnRsZSgpO1xyXG4qL1xyXG5leHBvcnQgY2xhc3MgVHVydGxlIHtcclxuICAgIHByaXZhdGUgX2RpdkVsZW0gPSBIVE1MRGl2RWxlbWVudCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9lbGVtOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9vdmVybGF5RWxlbTogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfb3ZlcmxheUN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3BvcyA9IHt4OjAsIHk6MH07XHJcbiAgICBwcml2YXRlIF9kaXJBbmdsZSA9IDA7XHJcbiAgICBwcml2YXRlIF9wZW5Eb3duID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX3dpZHRoID0gMDtcclxuICAgIHByaXZhdGUgX2hlaWdodCA9IDA7XHJcbiAgICBwcml2YXRlIF9jb2xvcjogc3RyaW5nID0gXCJibGFja1wiO1xyXG4gICAgcHJpdmF0ZSBfcGVuV2lkdGg6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIF9zaG93VHVydGxlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2NvbnNvbGVWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9jb25zb2xlRWxlbTogSFRNTFRleHRBcmVhRWxlbWVudCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9saXZlTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJhY3RpdmVNb2RlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9wb3NTdGFjayA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNhbnZhcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIHR1cnRsZSBhdCB0aGUgY2VudGVyLlxyXG4gICAgICogQHBhcmFtIHdpZHRoIFdpZHRoIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IEhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyID0gMzIwLCBoZWlnaHQ6IG51bWJlciA9IDMyMCkge1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBsZXQgZGl2RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRpdkVsZW0uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIGRpdkVsZW0uc3R5bGUud2lkdGggPSBTdHJpbmcod2lkdGgpO1xyXG4gICAgICAgIGRpdkVsZW0uc3R5bGUuaGVpZ2h0ID0gU3RyaW5nKGhlaWdodCk7XHJcbiAgICAgICAgZGl2RWxlbS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xyXG4gICAgICAgIGRpdkVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcclxuICAgICAgICBkaXZFbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgIGRpdkVsZW0uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCdcclxuICAgICAgICBkaXZFbGVtLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG4gICAgICAgIGRpdkVsZW0uc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldnQpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhldnQpO1xyXG4gICAgICAgICAgICBpZiAoZXZ0LmtleSA9PT0gJ0YyJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVDb25zb2xlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFN0cmluZyh3aWR0aCkpO1xyXG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFN0cmluZyhoZWlnaHQpKTtcclxuICAgICAgICBkaXZFbGVtLmFwcGVuZENoaWxkKGVsZW0pO1xyXG5cclxuICAgICAgICBsZXQgZWxlbTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBlbGVtMi5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBTdHJpbmcod2lkdGgpKTtcclxuICAgICAgICBlbGVtMi5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgU3RyaW5nKGhlaWdodCkpO1xyXG4gICAgICAgIGVsZW0yLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgICAgICAgZWxlbTIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgZWxlbTIuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgICAgIGVsZW0yLnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgICAgIGRpdkVsZW0uYXBwZW5kQ2hpbGQoZWxlbTIpO1xyXG5cclxuICAgICAgICBsZXQgY29uc29sZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG4gICAgICAgIGNvbnNvbGVFbGVtLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcclxuICAgICAgICBjb25zb2xlRWxlbS5zZXRBdHRyaWJ1dGUoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTtcclxuICAgICAgICBjb25zb2xlRWxlbS5zZXRBdHRyaWJ1dGUoJ3dyYXAnLCAnb2ZmJyk7XHJcbiAgICAgICAgY29uc29sZUVsZW0uc3R5bGVbJ2Rpc3BsYXknXSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIC8vY29uc29sZUVsZW0uc3R5bGVbJ21pbi13aWR0aCddID0gJzIwMHB4JztcclxuICAgICAgICAvL2NvbnNvbGVFbGVtLnN0eWxlWydtYXgtd2lkdGgnXSA9ICcyMDBweCc7XHJcbiAgICAgICAgY29uc29sZUVsZW0uc3R5bGVbJ21pbi1oZWlnaHQnXSA9ICczMDBweCc7XHJcbiAgICAgICAgY29uc29sZUVsZW0uc3R5bGVbJ292ZXJmbG93J10gPSAnYXV0byc7XHJcbiAgICAgICAgY29uc29sZUVsZW0uc3R5bGVbJ3doaXRlLXNwYWNlJ10gPSAncHJlJztcclxuICAgICAgICAvL2NvbnNvbGVFbGVtLnN0eWxlWydtaW4taGVpZ2h0J10gPSAnMTAwcHgnO1xyXG4gICAgICAgIGNvbnNvbGVFbGVtLnN0eWxlWydib3JkZXInXSA9ICcxcHggc29saWQgZ3JheSc7XHJcbiAgICAgICAgY29uc29sZUVsZW0uc3R5bGVbJ21hcmdpbiddID0gJzBweCc7XHJcbiAgICAgICAgY29uc29sZUVsZW0uc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsJ25vbmUnKTtcclxuICAgICAgICAvL2NvbnNvbGVFbGVtLmlubmVySHRtbCA9IFwiSGVsbG9cIjtcclxuICAgICAgICBjb25zb2xlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2dCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldnQua2V5Q29kZSA9PSAxMyAmJiB0aGlzLl9pbnRlcmFjdGl2ZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXZ0KTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGV2dC50YXJnZXRbJ3ZhbHVlJ10uc2xpY2UoMCwgZXZ0LnRhcmdldFsnc2VsZWN0aW9uU3RhcnQnXSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5tYXRjaCgvW15cXG5dKiQvKVswXTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coe3ZhbDp2YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGVFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldnQgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGV2dCk7XHJcbiAgICAgICAgICAgIC8vZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGlmIChldnQua2V5ID09PSAncicgJiYgZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGUoY29uc29sZUVsZW0uaW5uZXJUZXh0IHx8IGNvbnNvbGVFbGVtLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGVFbGVtLmlubmVySFRNTCA9IGA8c3BhbiBzdHlsZT0nYm9yZGVyLWJvdHRvbToycHggZG90dGVkIHJlZDsnPiR7Y29uc29sZUVsZW0uaW5uZXJUZXh0fTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbXCJpbm5lclR4dFwiLCBjb25zb2xlRWxlbS5pbm5lclRleHRdKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChldnQua2V5ID09ICdsJyAmJiBldnQuY3RybEtleSkge1xyXG4gICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGl2ZU1vZGUgPSAhdGhpcy5fbGl2ZU1vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGl2ZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcmFjdGl2ZU1vZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlRWxlbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZUVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNGRUUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZUVsZW0uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCBncmF5JztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlRWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXZ0LmtleSA9PSAnaScgJiYgZXZ0LmN0cmxLZXkpIHtcclxuICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyYWN0aXZlTW9kZSA9ICF0aGlzLl9pbnRlcmFjdGl2ZU1vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW50ZXJhY3RpdmVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGl2ZU1vZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlRWxlbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGdyZWVuJztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlRWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0VGRSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlRWxlbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGdyYXknO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGVFbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjRkZGJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGVFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2xpdmVNb2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5leGVjdXRlKGV2dC50YXJnZXRbJ3ZhbHVlJ10pO1xyXG4gICAgICAgICAgICAvL2ZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5jb21tYW5kKGxpbmUpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL2NvbnNvbGVFbGVtLnNldEF0dHJpYnV0ZSgncm93cycsICcxMDAnKTtcclxuICAgICAgICAvL2NvbnNvbGVFbGVtLnNldEF0dHJpYnV0ZSgnY29scycsICc1MCcpO1xyXG4gICAgICAgIGRpdkVsZW0uYXBwZW5kQ2hpbGQoY29uc29sZUVsZW0pO1xyXG4gICAgICAgIHRoaXMuX2NvbnNvbGVFbGVtID0gY29uc29sZUVsZW07XHJcbiAgICAgICAgdGhpcy5fY29uc29sZUVsZW0uc3R5bGUuZGlzcGxheSA9IHRoaXMuX2NvbnNvbGVWaXNpYmxlID8gJ2lubGluZS1ibG9jaycgOiAnbm9uZSc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2RWxlbSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RpdkVsZW0gPSBkaXZFbGVtO1xyXG4gICAgICAgIHRoaXMuX2VsZW0gPSBlbGVtO1xyXG4gICAgICAgIHRoaXMuX292ZXJsYXlFbGVtID0gZWxlbTI7XHJcbiAgICAgICAgdGhpcy5fY3R4ID0gZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuX292ZXJsYXlDdHggPSBlbGVtMi5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHt4OiB3aWR0aCAvIDIsIHk6IGhlaWdodCAvIDJ9O1xyXG5cclxuICAgICAgICAvL3RoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5fY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAtMSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgLy90aGlzLl9vdmVybGF5RWxlbS5zdHlsZVsnbWl4LWJsZW5kLW1vZGUnXSA9ICdleGNsdXNpb24nO1xyXG4gICAgICAgIC8vdGhpcy5fb3ZlcmxheUN0eC5tb3ZlVG8oMCwgMCk7XHJcbiAgICAgICAgLy90aGlzLl9vdmVybGF5Q3R4LmxpbmVUbygxMDAsIDEwMCk7XHJcbiAgICAgICAgLy90aGlzLl9vdmVybGF5Q3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHNldEludGVydmFsKHRoaXMuZHJhd1R1cnRsZS5iaW5kKHRoaXMpLCAxMDApO1xyXG5cclxuICAgICAgICBsZXQgZnNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBmc0J0bi5pbm5lclRleHQgPSBcImZ1bGxzY3JlZW5cIjtcclxuICAgICAgICBmc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGU9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXZFbGVtLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZGl2RWxlbS5hcHBlbmRDaGlsZChmc0J0bik7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbW1hbmQoaW5wdXQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChpbnB1dFswXSA9PT0gJyMnKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHRva2VucyA9IGlucHV0LnRvVXBwZXJDYXNlKCkuc3BsaXQoJyAnKS5maWx0ZXIodCA9PiB0KTtcclxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGNvbW0gPSB0b2tlbnNbMF07XHJcbiAgICAgICAgbGV0IGFyZzEgPSB0b2tlbnMubGVuZ3RoID49IDIgPyB0b2tlbnNbMV0gOiBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAoY29tbSkge1xyXG4gICAgICAgICAgICBjYXNlICdMRUZUJzpcclxuICAgICAgICAgICAgY2FzZSAnTFQnOlxyXG4gICAgICAgICAgICAgICAgYXJnMSAmJiB0aGlzLmxlZnQoTnVtYmVyKGFyZzEpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdSSUdIVCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ1JUJzpcclxuICAgICAgICAgICAgICAgIGFyZzEgJiYgdGhpcy5yaWdodChOdW1iZXIoYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0ZPUldBUkQnOlxyXG4gICAgICAgICAgICBjYXNlICdGRCc6XHJcbiAgICAgICAgICAgICAgICBhcmcxICYmIHRoaXMuZm9yd2FyZChOdW1iZXIoYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0JBQ0tXQVJEJzpcclxuICAgICAgICAgICAgY2FzZSAnQkFDSyc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0JLJzpcclxuICAgICAgICAgICAgICAgIGFyZzEgJiYgdGhpcy5mb3J3YXJkKC1OdW1iZXIoYXJnMSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1RISUNLJzpcclxuICAgICAgICAgICAgY2FzZSAnVEhJQ0tORVNTJzpcclxuICAgICAgICAgICAgICAgIGFyZzEgJiYgKHRoaXMudGhpY2tuZXNzID0gTnVtYmVyKGFyZzEpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdDTEVBUic6XHJcbiAgICAgICAgICAgIGNhc2UgJ0NMUic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUkVTRVQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BFTlVQJzpcclxuICAgICAgICAgICAgY2FzZSAnUFUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5VcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BFTkRPV04nOlxyXG4gICAgICAgICAgICBjYXNlICdQRCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlbkRvd24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdISURFJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1NIT1cnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQ09MJzpcclxuICAgICAgICAgICAgY2FzZSAnQ09MT1InOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IGFyZzE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUFVTSFBPUyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hQb3MoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdQT1BQT1MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BQb3MoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdIT01FJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9tZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0hTTCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJnMSAmJiBhcmcxID09PSAnQEFOR0xFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmhzbCh0aGlzLmFuZ2xlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGV0IG0gPSBpbnB1dC5tYXRjaCgvXlxccyoobGVmdHxsdClcXHMrKFswLTldKylcXHMqJC9pKTtcclxuICAgICAgICAvL2lmIChtKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy5sZWZ0KE51bWJlcihtWzJdKSk7XHJcbiAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShzY3JpcHQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coW1wiUGFyc2luZzpcIiwgc2NyaXB0XSk7XHJcbiAgICAgICAgc2NyaXB0ICs9IFwiXFxuXCI7XHJcblxyXG4gICAgICAgIGxldCBmcmFtZSA9IG5ldyBjbGFzcyB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgZnJhbWUgPSB7fTtcclxuICAgICAgICAgICAgcHJpdmF0ZSBwcm9jcyA9IHt9O1xyXG4gICAgICAgICAgICBwdWJsaWMgc2V0VmFyKG5hbWU6IHN0cmluZywgdmFsOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVbbmFtZV0gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIGdldFZhcihuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVbbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIHNldFByb2MobmFtZTogc3RyaW5nLCBwYXJhbXM6IHN0cmluZ1tdLCBib2R5OiBhbnlbXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jc1tuYW1lXSA9IHtuYW1lOiBuYW1lLCBwYXJhbXM6cGFyYW1zLCBib2R5OmJvZHl9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgZ2V0UHJvYyhuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2NzW25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgZ2V0IHZhbHVlcygpIHsgcmV0dXJuIHRoaXMuZnJhbWU7IH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgZXhlY0JvZHk6IChzdGF0czphbnkpPT52b2lkID0gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IGFzc2VydCA9IChjb25kOiBib29sZWFuLCBtc2c6IHN0cmluZyA9IFwiXCIpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjb25kKSB0aHJvdyBTeW50YXhFcnJvcihtc2cpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGV2YWxFeHByOiAoZXhwcjphbnkpPT5udW1iZXIgPSBudWxsO1xyXG4gICAgICAgIGxldCBldmFsRnVuYyA9IChmdW5jOiBzdHJpbmcsIHBhcmFtczogYW55KTpudW1iZXIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0xID0gKCkgPT4gZXZhbEV4cHIocGFyYW1zWzBdKTtcclxuICAgICAgICAgICAgc3dpdGNoIChmdW5jKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJAc2luXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zaW4ocGFyYW0xKCkgKiBNYXRoLlBJIC8gMTgwKTtcclxuICAgICAgICAgICAgY2FzZSBcIkBjb3NcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbihwYXJhbTEoKSAqIE1hdGguUEkgLyAxODApO1xyXG4gICAgICAgICAgICBjYXNlIFwiQHNxcnRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQocGFyYW0xKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBldmFsRXhwciA9IChleHByKTpudW1iZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGV4cHIgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcmFtZS5nZXRWYXIoZXhwcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXhwci5ub2RlID09PSBcIkV4cHJlc3Npb25cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdGFsID0gZXZhbEV4cHIoZXhwci50ZXJtc1swXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGV4cHIudGVybXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gZXZhbEV4cHIoZXhwci50ZXJtc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChleHByLm9wc1tpIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnKyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbCArPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbCAtPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXhwci5ub2RlID09PSBcIkV4cHJlc3Npb246Q2FsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbEZ1bmMoZXhwci5mdW5jLCBleHByLnBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXhwci5ub2RlID09PSBcIlRlcm1cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdGFsID0gZXZhbEV4cHIoZXhwci5mYWN0b3JzWzBdKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZXhwci5mYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGV2YWxFeHByKGV4cHIuZmFjdG9yc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChleHByLm9wc1tpIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnKic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbCAqPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnLyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbCAvPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBjb25zb2xlLmxvZyhbJ0NhbnQgZXZhbHVhdGUnLCBleHByXSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZXhlY0NvbW1hbmQgPSAoY21kLCBwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjbWQudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlICdGRCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0ZPUldBUkQnOlxyXG4gICAgICAgICAgICAgICAgYXNzZXJ0KHBhcmFtcy5sZW5ndGggPj0gMSwgXCJGT1JXQVJEIHJlcXVpcmVzIDEgcGFyYW1ldGVyLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yd2FyZChldmFsRXhwcihwYXJhbXNbMF0pKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdCSyc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0JBQ0tXQVJEJzpcclxuICAgICAgICAgICAgICAgIGFzc2VydChwYXJhbXMubGVuZ3RoID49IDEsIFwiQkFDS1dBUkQgcmVxdWlyZXMgMSBwYXJhbWV0ZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3J3YXJkKC1ldmFsRXhwcihwYXJhbXNbMF0pKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdMVCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0xFRlQnOlxyXG4gICAgICAgICAgICAgICAgYXNzZXJ0KHBhcmFtcy5sZW5ndGggPj0gMSwgXCJMRUZUIHJlcXVpcmVzIDEgcGFyYW1ldGVyLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdChldmFsRXhwcihwYXJhbXNbMF0pKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdSVCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ1JJR0hUJzpcclxuICAgICAgICAgICAgICAgIGFzc2VydChwYXJhbXMubGVuZ3RoID49IDEsIFwiUklHSFQgcmVxdWlyZXMgMSBwYXJhbWV0ZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodChldmFsRXhwcihwYXJhbXNbMF0pKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdISURFJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1NIT1cnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUEVOVVAnOlxyXG4gICAgICAgICAgICBjYXNlICdQVSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlblVwKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUEVORE9XTic6XHJcbiAgICAgICAgICAgIGNhc2UgJ1BEJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGVuRG93bigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0hPTUUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob21lKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUFVTSFBPUyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hQb3MoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdQT1BQT1MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BQb3MoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdUSElDSyc6XHJcbiAgICAgICAgICAgIGNhc2UgJ1RISUNLTkVTUyc6XHJcbiAgICAgICAgICAgICAgICBhc3NlcnQocGFyYW1zLmxlbmd0aCA+PSAxLCBcIlRISUNLTkVTUyByZXF1aXJlcyAxIHBhcmFtZXRlci5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IGV2YWxFeHByKHBhcmFtc1swXSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnU0NSRUVOJzpcclxuICAgICAgICAgICAgICAgIGFzc2VydChwYXJhbXMubGVuZ3RoID49IDIsIFwiU0NSRUVOIHJlcXVpcmVzIDIgcGFyYW1ldGVyLlwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuKGV2YWxFeHByKHBhcmFtc1swXSksIGV2YWxFeHByKHBhcmFtc1sxXSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhbXCJDYW50IGV4ZWN1dGU6XCIsIGNtZCwgcGFyYW1zXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBleGVjUmVwZWF0ID0gKGNvdW50OiBudW1iZXJ8c3RyaW5nLCBib2R5OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvdW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgYWN0dWFsQ291bnQgPSBmcmFtZS5nZXRWYXIoY291bnQgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBhY3R1YWxDb3VudCA9IGNvdW50IGFzIG51bWJlcjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3R1YWxDb3VudDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgZXhlY0JvZHkoYm9keSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZXhlY0xldCA9IChpZGVudDogc3RyaW5nLCB2YWw6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBmcmFtZS5zZXRWYXIoaWRlbnQsIHZhbCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZnJhbWUudmFsdWVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBleGVjQXNzaWduID0gKGlkZW50OiBzdHJpbmcsIHZhbDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGZyYW1lLnNldFZhcihpZGVudCwgdmFsKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmcmFtZS52YWx1ZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGV4ZWNTdGF0ZW1lbnQgPSAocykgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHMpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHMubm9kZSkge1xyXG4gICAgICAgICAgICBjYXNlICdTdGF0ZW1lbnQ6Q29tbWFuZCc6XHJcbiAgICAgICAgICAgICAgICBleGVjQ29tbWFuZChzLmNvbW1hbmQsIHMucGFyYW1zKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnU3RhdGVtZW50OlJlcGVhdCc6XHJcbiAgICAgICAgICAgICAgICBleGVjUmVwZWF0KHMuY291bnQsIHMuYm9keSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnU3RhdGVtZW50OkNvbG9yJzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaHNsKGFuZ2xlKSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuaHNsKHRoaXMuYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gcy52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdTdGF0ZW1lbnQ6TGV0JzpcclxuICAgICAgICAgICAgICAgIGV4ZWNMZXQocy5pZGVudGlmaWVyLCBldmFsRXhwcihzLnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnU3RhdGVtZW50OkFzc2lnbic6XHJcbiAgICAgICAgICAgICAgICBleGVjQXNzaWduKHMudmFyaWFibGUsIGV2YWxFeHByKHMudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdQcm9jRGVjbCc6XHJcbiAgICAgICAgICAgICAgICBmcmFtZS5zZXRQcm9jKHMubmFtZSwgcy5wYXJhbXMsIHMuYm9keSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnRXhwcmVzc2lvbjpDYWxsJzoge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmcmFtZS5nZXRQcm9jKHMuZnVuYykpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb2MgPSBmcmFtZS5nZXRQcm9jKHMuZnVuYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb2MpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sZW5ndGggPCBwcm9jLnBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVG9vIGZldyBwYXJhbXMgdG8gJHtwcm9jLm5hbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBkZWNsID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2MucGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGRlY2wucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6ICdTdGF0ZW1lbnQ6TGV0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogcHJvYy5wYXJhbXNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBldmFsRXhwcihzLnBhcmFtc1tpXSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwZGVjbCA9IHBkZWNsLmNvbmNhdChwcm9jLmJvZHkpO1xyXG4gICAgICAgICAgICAgICAgZXhlY0JvZHkocGRlY2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFtcIkNhbnQgZXhlY3V0ZTpcIiwgc10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZXhlY0JvZHkgPSAoc3RhdHMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcyBvZiBzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgZXhlY1N0YXRlbWVudChzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBhc3QgPSBwYXJzZShzY3JpcHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhbXCJhc3RcIiwgYXN0XSk7XHJcbiAgICAgICAgICAgIGV4ZWNCb2R5KGFzdC5zdGF0ZW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSBpbnN0YW5jZW9mIHBlZ1N5bnRheEVycm9yKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZm9yIChsZXQgc3RhdCBvZiApXHJcblxyXG4gICAgICAgIC8vIGxldCBsaW5lcyA9IHNjcmlwdC5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICAvLyBsZXQgY3RybFN0YWNrID0gW107XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgbGluZSA9IGxpbmVzW2ldO1xyXG4gICAgICAgIC8vICAgICBpZiAobGluZVswXSA9PT0gJyMnKSBjb250aW51ZTtcclxuICAgICAgICAvLyAgICAgbGV0IHRva2VucyA9IGxpbmUudG9VcHBlckNhc2UoKS5zcGxpdCgnICcpLmZpbHRlcih0ID0+IHQpO1xyXG4gICAgICAgIC8vICAgICBsZXQgY29tbSA9IHRva2Vucy5sZW5ndGggPj0gMSA/IHRva2Vuc1swXSA6IG51bGw7XHJcbiAgICAgICAgLy8gICAgIGlmICghY29tbSkgY29udGludWU7XHJcbiAgICAgICAgLy8gICAgIGxldCBhcmcxID0gdG9rZW5zLmxlbmd0aCA+PSAyID8gdG9rZW5zWzFdIDogbnVsbDtcclxuXHJcbiAgICAgICAgLy8gICAgIHN3aXRjaCAoY29tbSkge1xyXG4gICAgICAgIC8vICAgICAgICAgY2FzZSAnUkVQRUFUJzpcclxuICAgICAgICAvLyAgICAgICAgICAgICBjdHJsU3RhY2sucHVzaCh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG46IGFyZzEgfHwgMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY3RyOiAwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBiZWdpbjogaVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSRVBFQVQgXCIgKyBhcmcxKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgIGNhc2UgJ0VORCc6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGN0cmxTdGFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY3RybFN0YWNrKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGZyYW1lID0gY3RybFN0YWNrW2N0cmxTdGFjay5sZW5ndGggLSAxXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZnJhbWUuY3RyKys7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmIChmcmFtZS5jdHIgPCBmcmFtZS5uKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBHT1RPICR7ZnJhbWUuYmVnaW59LCBDVFI9JHtmcmFtZS5jdHJ9LCBOPSR7ZnJhbWUubn1gKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaSA9IGZyYW1lLmJlZ2luO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGVsc2UgY3RybFN0YWNrLnBvcCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5jb21tYW5kKGxpbmUpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdG9nZ2xlQ29uc29sZSgpIHtcclxuICAgICAgICB0aGlzLl9jb25zb2xlVmlzaWJsZSA9ICF0aGlzLl9jb25zb2xlVmlzaWJsZTtcclxuICAgICAgICB0aGlzLl9jb25zb2xlRWxlbS5zdHlsZS5kaXNwbGF5ID0gdGhpcy5fY29uc29sZVZpc2libGUgPyBcImlubGluZS1ibG9ja1wiIDogXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGxpdmVNb2RlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2xpdmVNb2RlID0gdmFsdWU7IH1cclxuXHJcbiAgICBwcml2YXRlIF9kcmF3VHVydGxlQ2FjaGUgPSB7XHJcbiAgICAgICAgY29sb3I6IDAsXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBkcmF3VHVydGxlKCkge1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX292ZXJsYXlDdHg7XHJcbiAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLl9kcmF3VHVydGxlQ2FjaGU7XHJcblxyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2hvd1R1cnRsZSkge1xyXG4gICAgICAgICAgICBsZXQgZHJhd1R1cnRsZSA9ICh4LCB5LCByYWQsIGFuZ2xlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeGF4aXMgPSB7eDogTWF0aC5jb3MocmFkKSwgeTogLU1hdGguc2luKHJhZCl9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHlheGlzID0ge3g6IHhheGlzLnksIHk6IC14YXhpcy54fTtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFucyA9IChwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZlY0FkZCh2ZWNBZGQodmVjTXVsKHhheGlzLCBwLngpLCB2ZWNNdWwoeWF4aXMsIHAueSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHt4OiB4LCB5OiB5fSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwdHMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OjAsIHk6MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDotMTAtNSwgeTotOCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDotMTAsIHk6MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDotMTAtNSwgeTo4IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IHg6MTAsIHk6MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDowLCB5OjAgfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBwdHMuZm9yRWFjaChwPT57cC54Kz0xMDt9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBbJ2JsYWNrJywgJ3doaXRlJywgJ2dyYXknXVtjYWNoZS5jb2xvcl07XHJcbiAgICAgICAgICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9IHRoaXMuX2NvbG9yID09ICdibGFjaycgPyAnd2hpdGUnIDogJ2JsYWNrJztcclxuICAgICAgICAgICAgICAgIC8vY3R4LmVsbGlwc2UodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgMTAsIDEwLCAwLCAwLCAzNjApO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSB0cmFucyhwdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIGN0eC5tb3ZlVG8ocC54LCBwLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY3R4LmxpbmVUbyhwLngsIHAueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2N0eC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgICAgICAgICAgICAgLy8gY3R4LmxpbmVXaWR0aCA9IDEuNTtcclxuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9ICdncmF5JztcclxuICAgICAgICAgICAgICAgIC8vIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuX2NvbG9yID09ICdibGFjaycgPyAnd2hpdGUnIDogdGhpcy5fY29sb3I7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdncmF5JztcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChgWDogJHtNYXRoLnJvdW5kKHgpfSwgWTogJHtNYXRoLnJvdW5kKHkpfSwgXFx1MDNiODogJHtNYXRoLnJvdW5kKGFuZ2xlKX1cXHUwMGIwYCxcclxuICAgICAgICAgICAgICAgICAgICAyLCAxMCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGAke3RoaXMuX3BlbkRvd24gPyAnUOKWvCcgOiAnUOKWsid9YCxcclxuICAgICAgICAgICAgICAgICAgICAyLCAyMCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRyYXdUdXJ0bGUodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5kaXJSYWQsIHRoaXMuYW5nbGUpO1xyXG4gICAgICAgICAgICAvL2NhY2hlLmNvbG9yID0gKGNhY2hlLmNvbG9yICsgMSkgJSAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBkaXJSYWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpckFuZ2xlICogTWF0aC5QSSAvIDE4MDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldCBkaXJWZWMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHt4Ok1hdGguY29zKHRoaXMuZGlyUmFkKSx5Oi1NYXRoLnNpbih0aGlzLmRpclJhZCl9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVpZ2h0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGdldCBoZWlnaHQoKSB7IHJldHVybiB0aGlzLl9oZWlnaHQ7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpZHRoIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGdldCB3aWR0aCgpIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XHJcblxyXG4gICAgc2NyZWVuKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dpZHRoID09IHdpZHRoICYmIHRoaXMuX2hlaWdodCA9PSBoZWlnaHQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLl9lbGVtLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFN0cmluZyh3aWR0aCkpO1xyXG4gICAgICAgIHRoaXMuX2VsZW0uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFN0cmluZyhoZWlnaHQpKTtcclxuICAgICAgICB0aGlzLl9vdmVybGF5RWxlbS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBTdHJpbmcod2lkdGgpKTtcclxuICAgICAgICB0aGlzLl9vdmVybGF5RWxlbS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgU3RyaW5nKGhlaWdodCkpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBvciBzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSB0dXJ0bGUuIENvb3JkaW5hdGVzIGFyZVxyXG4gICAgICogKDAsMCkgYXQgdXBwZXItbGVmdCBjb3JuZXIsIHRvICh3aWR0aCwgaGVpZ2h0KSBhdCBsb3dlci1yaWdodCBjb3JuZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEV4YW1wbGU6XHJcbiAgICAgKiBcclxuICAgICAqIC8vIFNldCB0aGUgdHVydGxlJ3MgcG9zaXRpb24gdG8gdGhlIGNlbnRlciBvZiB0aGUgY2FudmFzXHJcbiAgICAgKiBcclxuICAgICAqIHR1cnRsZS5wb3MgPSB7eDogdHVydGxlLndpZHRoLzIsIHk6IHR1cnRsZS5oZWlnaHQvMn07XHJcbiAgICAgKi9cclxuICAgIGdldCBwb3MoKSB7IHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9wb3MpOyB9XHJcbiAgICBzZXQgcG9zKHZhbHVlOiB7eDpudW1iZXIseTpudW1iZXJ9KSB7dGhpcy5fcG9zID0gdmFsdWU7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBzZXR0aW5nIHBvc2l0aW9uIHRvIGltcG9ydGFudCBsb2NhdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqIHR1cnRsZS5wb3MgPSB0dXJ0bGUuY29ybmVycy51cHBlckxlZnQ7XHJcbiAgICAgKi9cclxuICAgIGdldCBjb3JuZXJzKCkge1xyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuICAgICAgICBsZXQgY3ggPSB0aGlzLl93aWR0aCAvIDI7XHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5fd2lkdGg7XHJcbiAgICAgICAgbGV0IHRvcCA9IDA7XHJcbiAgICAgICAgbGV0IGN5ID0gdGhpcy5faGVpZ2h0IC8gMjtcclxuICAgICAgICBsZXQgbG93ZXIgPSB0aGlzLl9oZWlnaHQ7ICAgIFxyXG4gICAgICAgIGxldCBwID0gKHgseSk9PiB7cmV0dXJue3g6eCx5Onl9O307XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlZnQ6IHAobGVmdCwgY3kpLFxyXG4gICAgICAgICAgICB1cHBlcjogcChjeCwgdG9wKSxcclxuICAgICAgICAgICAgcmlnaHQ6IHAocmlnaHQsIGN5KSxcclxuICAgICAgICAgICAgbG93ZXI6IHAoY3gsIGxvd2VyKSxcclxuICAgICAgICAgICAgdXBwZXJMZWZ0OiBwKDAsIDApLFxyXG4gICAgICAgICAgICB1cHBlclJpZ2h0OiBwKHJpZ2h0LCAwKSxcclxuICAgICAgICAgICAgbG93ZXJMZWZ0OiBwKDAsIGxvd2VyKSxcclxuICAgICAgICAgICAgbG93ZXJSaWdodDogcChyaWdodCwgbG93ZXIpLFxyXG4gICAgICAgICAgICBjZW50ZXI6IHAoY3gsIGN5KSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGlmdCB0aGUgdHVydGxlJ3MgcGVuIHVwLiBUaGlzIHdpbGwgbWFrZSBpdCBzdG9wIGRyYXdpbmcuXHJcbiAgICAgKi9cclxuICAgIHBlblVwKCkgeyB0aGlzLl9wZW5Eb3duID0gZmFsc2U7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1dCB0aGUgcGVuIGRvd24gdG8gcmVzdW1lIGRyYXdpbmcuXHJcbiAgICAgKi9cclxuICAgIHBlbkRvd24oKSB7IHRoaXMuX3BlbkRvd24gPSB0cnVlOyB9XHJcblxyXG4gICAgaGlkZSgpIHsgdGhpcy5fc2hvd1R1cnRsZSA9IGZhbHNlOyB9XHJcbiAgICBzaG93KCkgeyB0aGlzLl9zaG93VHVydGxlID0gdHJ1ZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBjb2xvciBvZiB0aGUgcGVuLlxyXG4gICAgICogXHJcbiAgICAgKiBFeGFtcGxlczpcclxuICAgICAqIFxyXG4gICAgICogdHVydGxlLmNvbG9yID0gJ3JlZCc7XHJcbiAgICAgKiBcclxuICAgICAqIHR1cnRsZS5jb2xvciA9ICdyZ2IoMjU1LCAwLCAwKSc7XHJcbiAgICAgKiBcclxuICAgICAqIHR1cnRsZS5jb2xvciA9IHR1cnRsZS5oc2woNzIpOyAvLyAwLTM2MCByZXByZXNlbnQgY29sb3JzIG9mIHRoZSByYWluYm93XHJcbiAgICAgKi9cclxuICAgIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBjb2xvcigpIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XHJcbiAgICBoc2woaHVlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgaHNsKCR7aHVlJTM2MH0sIDEwMCUsIDUwJSlgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IG9yIHNldCB0aGUgZGlyZWN0aW9uIG9mIHRoZSB0dXJ0bGUsIGFzIGRlZ3JlZXMuXHJcbiAgICAgKiBcclxuICAgICAqIDAgZGVncmVlcyBpcyB0b3dhcmRzIHRoZSByaWdodCwgYW5kIHRoZW4gdGhlIGFuZ2xlIG1vdmVzXHJcbiAgICAgKiBhbnRpLWNsb2Nrd2lzZSBpLmUuIDkwIGlzIHRvd2FyZHMgdGhlIHRvcCBldGMuXHJcbiAgICAgKi9cclxuICAgIGdldCBhbmdsZSgpIHsgcmV0dXJuIHRoaXMuX2RpckFuZ2xlOyB9XHJcbiAgICBzZXQgYW5nbGUodmFsdWU6IG51bWJlcikgeyB0aGlzLl9kaXJBbmdsZSA9IHZhbHVlO31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBvciBzZXQgdGhlIHRoaWNrbmVzcyBvZiB0aGUgcGVuLlxyXG4gICAgICovXHJcbiAgICBnZXQgdGhpY2tuZXNzKCkgeyByZXR1cm4gdGhpcy5fcGVuV2lkdGg7IH1cclxuICAgIHNldCB0aGlja25lc3ModmFsdWU6IG51bWJlcikgeyB0aGlzLl9wZW5XaWR0aCA9IHZhbHVlOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIGZvcndhcmQgYnkgeCBwaXhlbHMuXHJcbiAgICAgKiBAcGFyYW0geCBcclxuICAgICAqL1xyXG4gICAgZm9yd2FyZCh4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgb2xkUG9zID0gdGhpcy5fcG9zO1xyXG4gICAgICAgIHRoaXMucG9zID0gdmVjQWRkKHRoaXMucG9zLCB2ZWNNdWwodGhpcy5kaXJWZWMsIHgpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BlbkRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdHgubW92ZVRvKG9sZFBvcy54LCBvbGRQb3MueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N0eC5saW5lVG8odGhpcy5fcG9zLngsIHRoaXMuX3Bvcy55KTtcclxuICAgICAgICAgICAgLy9sZXQgY3AgPSB2ZWNBdmcob2xkUG9zLCB0aGlzLl9wb3MpO1xyXG4gICAgICAgICAgICAvL3RoaXMuX2N0eC5xdWFkcmF0aWNDdXJ2ZVRvKGNwLngsIGNwLnksIHRoaXMuX3Bvcy54LCB0aGlzLl9wb3MueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N0eC5zdHJva2VTdHlsZSA9IHRoaXMuX2NvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLl9jdHgubGluZVdpZHRoID0gdGhpcy5fcGVuV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2N0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHVybiBsZWZ0LlxyXG4gICAgICogQHBhcmFtIGRlZyBBbmdsZSBpbiBkZWdyZWVzXHJcbiAgICAgKi9cclxuICAgIGxlZnQoZGVnOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG4gICAgICAgIGFuZ2xlICs9IGRlZztcclxuICAgICAgICBhbmdsZSAlPSAzNjA7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHVybiByaWdodC5cclxuICAgICAqIEBwYXJhbSBkZWcgQW5nbGUgaW4gZGVncmVlc1xyXG4gICAgICovXHJcbiAgICByaWdodChkZWc6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuYW5nbGU7XHJcbiAgICAgICAgYW5nbGUgLT0gZGVnO1xyXG4gICAgICAgIGFuZ2xlICU9IDM2MDtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHNjcmVlbiB3aXRoIHdoYXRldmVyIGhhcyBiZWVuIGRyYXduIHNvIGZhci5cclxuICAgICAqIENhbGwgdGhpcyBvbmx5IGlmIHlvdSB3aXNoIHRvIHNlZSB0aGUgcHJvZ3Jlc3Mgc28gZmFyLFxyXG4gICAgICogb3RoZXJ3aXNlIGl0IGlzbid0IHN0cmljdGx5IG5lY2Vzc2FyeS4gVGhpcyBpcyBnb29kXHJcbiAgICAgKiBmb3IgaW5zcGVjdGluZyB0aGUgbW92ZW1lbnQgb2YgdGhlIHR1cnRsZSwgb3IgZm9yXHJcbiAgICAgKiBhbmltYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gZGVsYXltcyBEZWxheVxyXG4gICAgICovXHJcbiAgICB1cGRhdGUoZGVsYXltczogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlPT5cclxuICAgICAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBkZWxheW1zKSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFyIHRoZSBzY3JlZW4uIFVzZWZ1bCBmb3IgYW5pbWF0aW9uLlxyXG4gICAgICovXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICAvL3RoaXMuX2N0eC5jdXJyXHJcbiAgICAgICAgLy90aGlzLl9jdHguY2xlYXJSZWN0KC10aGlzLl93aWR0aCwgLXRoaXMuX2hlaWdodCwgdGhpcy5fd2lkdGggKiAyLCB0aGlzLl9oZWlnaHQgKiAyKTtcclxuICAgICAgICB0aGlzLl9jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xyXG4gICAgICAgIGxldCBwcmV2ID0gdGhpcy5fY3R4LmZpbGxTdHlsZTtcclxuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IHByZXY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXNoIHRoZSBjdXJyZW50IHBvc2l0aW9uIGFuZCBhbmdsZSBvbnRvIGFuIGludGVybmFsIHN0YWNrLlxyXG4gICAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHJldGFpbmluZyB0aGUgb3JpZ2luYWwgcG9zaXRpb24gb2YgdGhlIHR1cnRsZVxyXG4gICAgICogYW5kIHRoZW4gcmV0dXJuaW5nIHRvIGl0IGFmdGVyLCBmb3IgZXhhbXBsZSwgYSBzdWJyb3V0aW5lIGRyYXdpbmcuXHJcbiAgICAgKiBcclxuICAgICAqIEV4YW1wbGU6XHJcbiAgICAgKiBcclxuICAgICAqIHR1cnRsZS5wdXNoUG9zKCk7XHJcbiAgICAgKiAvLyBkbyBzb21lIGRyYXdpbmdcclxuICAgICAqIHR1cnRsZS5wb3BQb3MoKTsgLy8gYmFjayB0byBvcmlnaW5hbCBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwdXNoUG9zKCkge1xyXG4gICAgICAgIHRoaXMuX3Bvc1N0YWNrLnB1c2goe1xyXG4gICAgICAgICAgICBwb3M6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3BvcyksXHJcbiAgICAgICAgICAgIGFuZ2xlOiB0aGlzLl9kaXJBbmdsZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWUgcHVzaFBvcygpLlxyXG4gICAgICovXHJcbiAgICBwb3BQb3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Bvc1N0YWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5fcG9zU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMucG9zID0gZnJhbWUucG9zO1xyXG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gZnJhbWUuYW5nbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BlblN0YWNrID0gW107XHJcbiAgICBwdXNoUGVuKCkge1xyXG4gICAgICAgIHRoaXMuX3BlblN0YWNrLnB1c2goe1xyXG4gICAgICAgICAgICBwZW5Eb3duOiB0aGlzLl9wZW5Eb3duLFxyXG4gICAgICAgICAgICBwZW5UaGlja25lc3M6IHRoaXMudGhpY2tuZXNzLFxyXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcG9wUGVuKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wZW5TdGFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IHRoaXMuX3BlblN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZW5Eb3duID0gZnJhbWUucGVuRG93bjtcclxuICAgICAgICAgICAgdGhpcy50aGlja25lc3MgPSBmcmFtZS5wZW5UaGlja25lc3M7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBmcmFtZS5jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaG9tZSgpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHRoaXMuY29ybmVycy5jZW50ZXI7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zU3RhY2sgPSBbXTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5ob21lKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldFBlbigpO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0UGVuKCkge1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzID0gMTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gJ2JsYWNrJztcclxuICAgICAgICB0aGlzLl9wZW5Eb3duID0gdHJ1ZTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3R1cnRsZS50cyIsImltcG9ydCAqIGFzIGMgZnJvbSAnLi9jb25zb2xlJztcclxuaW1wb3J0IHsgVHVydGxlIH0gZnJvbSAnLi90dXJ0bGUnO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGMud3JhcG1haW4obWFpbik7XHJcbmNvbnN0IGlucHV0ID0gYy5pbnB1dDtcclxuY29uc3QgcHJpbnQgPSBjLnByaW50O1xyXG5cclxuZnVuY3Rpb24gZmFjdChpKTogbnVtYmVyIHtcclxuICAgIGxldCByZXN1bHQgPSAxO1xyXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gaTsgaisrKVxyXG4gICAgICAgIHJlc3VsdCAqPSBqO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGxldCB0ID0gbmV3IFR1cnRsZSgpO1xyXG4gICAgdC50b2dnbGVDb25zb2xlKCk7XHJcbiAgICB0LmxpdmVNb2RlID0gdHJ1ZTtcclxuICAgIC8vIHQuZXhlY3V0ZShgXHJcbiAgICAvLyBmZCAxMDBcclxuICAgIC8vIGx0IDkwXHJcbiAgICAvLyBgKTtcclxuICAgIC8vdC5sZWZ0KDkwKTtcclxuICAgIC8vdC5mb3J3YXJkKDEwMCk7XHJcbiAgICB3aW5kb3dbJ3QnXSA9IHQ7XHJcbiAgICAvL3QucG9zID0gdC5jb3JuZXJzLmxvd2VyO1xyXG5cclxuICAgIC8vIGxldCBkcmF3U3RhciA9IChyYWRpdXMsIGNhbGxBdFBvaW50ID0gbnVsbCkgPT4ge1xyXG4gICAgLy8gICAgIHQucHVzaFBvcygpO1xyXG4gICAgLy8gICAgIHQucGVuVXAoKTtcclxuICAgIC8vICAgICB0LmxlZnQoOTApO1xyXG4gICAgLy8gICAgIHQuZm9yd2FyZChyYWRpdXMpO1xyXG4gICAgLy8gICAgIHQubGVmdCgzNjAgKiAyIC8gNSAtICgxODAgLSAzNjAgKiAyIC8gNSkgKiAyICsgMTgwICsgOTApO1xyXG4gICAgLy8gICAgIHQucGVuRG93bigpO1xyXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIHQuZm9yd2FyZChyYWRpdXMgKiBNYXRoLnNpbigzNjAgLyA1IC8gMikgKiAyKTtcclxuICAgIC8vICAgICAgICAgaWYgKGNhbGxBdFBvaW50KSBjYWxsQXRQb2ludCgpO1xyXG4gICAgLy8gICAgICAgICB0LmxlZnQoMzYwICogMiAvIDUpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICB0LnBvcFBvcygpO1xyXG4gICAgLy8gfTtcclxuXHJcbiAgICAvLyBkcmF3U3RhcigxMDAsICgpID0+IGRyYXdTdGFyKDMzLCAoKSA9PiBkcmF3U3RhcigxMSkpKTtcclxuXHJcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSs9MTApIHtcclxuICAgIC8vICAgICB0LmZvcndhcmQoMjApO1xyXG4gICAgLy8gICAgIHQubGVmdCgxMCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IDM2MDsgaSArPSAxMCkge1xyXG4gICAgLy8gICAgIHQucGVuVGhpY2tuZXNzID0gNTtcclxuICAgIC8vICAgICB0LnBvcyA9IHQuY29ybmVycy5jZW50ZXI7XHJcbiAgICAvLyAgICAgdC5jb2xvciA9IHQuaHNsKGkqNCk7XHJcbiAgICAvLyAgICAgdC5mb3J3YXJkKDEwMCk7XHJcblxyXG4gICAgLy8gICAgIHQucHVzaFBvcygpO1xyXG4gICAgLy8gICAgIHQucmlnaHQoOTApO1xyXG4gICAgLy8gICAgIHQubGVmdCg0NSk7XHJcbiAgICAvLyAgICAgbGV0IHNpZGUgPSA0MDtcclxuICAgIC8vICAgICB0LmZvcndhcmQoc2lkZSk7XHJcbiAgICAvLyAgICAgdC5sZWZ0KDkwKzQ1KTtcclxuICAgIC8vICAgICB0LmZvcndhcmQoc2lkZSAqIDIgLyBNYXRoLnNxcnQoMikpO1xyXG4gICAgLy8gICAgIHQubGVmdCg5MCsgNDUpO1xyXG4gICAgLy8gICAgIHQuZm9yd2FyZChzaWRlKTtcclxuICAgIC8vICAgICB0LnBvcFBvcygpO1xyXG5cclxuICAgIC8vICAgICB0LmxlZnQoMTApO1xyXG4gICAgLy8gICAgIGF3YWl0IHQudXBkYXRlKDEwMCk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyB0LnBvcyA9IHQuY29ybmVycy5sZWZ0O1xyXG4gICAgLy8gdC5jb2xvcjtcclxuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAvLyAgICAgdC5mb3J3YXJkKDEwMCk7XHJcbiAgICAvLyAgICAgdC5sZWZ0KDM2MCAqIDIgLyA1KTtcclxuICAgLy8gfVxyXG4gICAgLy8gZm9yIChsZXQgaiA9IDA7IGogPCAzNjsgaisrKSB7XHJcbiAgICAvLyAgICAgLy9pZiAoaiAlIDIgPT0gMCkgdC5wZW5VcCgpO1xyXG4gICAgLy8gICAgIC8vZWxzZSB0LnBlbkRvd24oKTtcclxuICAgIC8vICAgICAvL3QuY2xlYXIoKTtcclxuICAgIC8vICAgICB0LmNvbG9yID0gdC5oc2woaioxMCk7XHJcbiAgICAvLyAgICAgdC5wZW5UaGlja25lc3MgPSAxMDtcclxuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgLy8gICAgICAgICB0LmZvcndhcmQoMTAwKTtcclxuICAgIC8vICAgICAgICAgdC5sZWZ0KDkwKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdC5sZWZ0KDEwKTtcclxuICAgIC8vICAgICBhd2FpdCB0LnVwZGF0ZSgxMDApO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gdC5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAvLyBsZXQgbiA9IGF3YWl0IGlucHV0KFwiRW50ZXIgbjogXCIpO1xyXG4vLyAgICAgLy9wcmludChmYWN0KG4pKTtcclxuLy8gICAgbGV0IGEgPSBbXTtcclxuLy8gICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IG47IGkrKylcclxuLy8gICAgICAgYS5wdXNoKGF3YWl0IGlucHV0KGBFbnRlciAjJHtpfTogYCkpO1xyXG5cclxuLy8gICAgcHJpbnQoYS5yZWR1Y2UoKGEsYik9PmErYiwgMCkpO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleDIudHMiLCIvKlxuICogR2VuZXJhdGVkIGJ5IFBFRy5qcyAwLjEwLjAuXG4gKlxuICogaHR0cDovL3BlZ2pzLm9yZy9cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gcGVnJHN1YmNsYXNzKGNoaWxkLCBwYXJlbnQpIHtcbiAgZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9XG4gIGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTtcbn1cblxuZnVuY3Rpb24gcGVnJFN5bnRheEVycm9yKG1lc3NhZ2UsIGV4cGVjdGVkLCBmb3VuZCwgbG9jYXRpb24pIHtcbiAgdGhpcy5tZXNzYWdlICA9IG1lc3NhZ2U7XG4gIHRoaXMuZXhwZWN0ZWQgPSBleHBlY3RlZDtcbiAgdGhpcy5mb3VuZCAgICA9IGZvdW5kO1xuICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gIHRoaXMubmFtZSAgICAgPSBcIlN5bnRheEVycm9yXCI7XG5cbiAgaWYgKHR5cGVvZiBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgcGVnJFN5bnRheEVycm9yKTtcbiAgfVxufVxuXG5wZWckc3ViY2xhc3MocGVnJFN5bnRheEVycm9yLCBFcnJvcik7XG5cbnBlZyRTeW50YXhFcnJvci5idWlsZE1lc3NhZ2UgPSBmdW5jdGlvbihleHBlY3RlZCwgZm91bmQpIHtcbiAgdmFyIERFU0NSSUJFX0VYUEVDVEFUSU9OX0ZOUyA9IHtcbiAgICAgICAgbGl0ZXJhbDogZnVuY3Rpb24oZXhwZWN0YXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyBsaXRlcmFsRXNjYXBlKGV4cGVjdGF0aW9uLnRleHQpICsgXCJcXFwiXCI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJjbGFzc1wiOiBmdW5jdGlvbihleHBlY3RhdGlvbikge1xuICAgICAgICAgIHZhciBlc2NhcGVkUGFydHMgPSBcIlwiLFxuICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV4cGVjdGF0aW9uLnBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlc2NhcGVkUGFydHMgKz0gZXhwZWN0YXRpb24ucGFydHNbaV0gaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICA/IGNsYXNzRXNjYXBlKGV4cGVjdGF0aW9uLnBhcnRzW2ldWzBdKSArIFwiLVwiICsgY2xhc3NFc2NhcGUoZXhwZWN0YXRpb24ucGFydHNbaV1bMV0pXG4gICAgICAgICAgICAgIDogY2xhc3NFc2NhcGUoZXhwZWN0YXRpb24ucGFydHNbaV0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBcIltcIiArIChleHBlY3RhdGlvbi5pbnZlcnRlZCA/IFwiXlwiIDogXCJcIikgKyBlc2NhcGVkUGFydHMgKyBcIl1cIjtcbiAgICAgICAgfSxcblxuICAgICAgICBhbnk6IGZ1bmN0aW9uKGV4cGVjdGF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIFwiYW55IGNoYXJhY3RlclwiO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVuZDogZnVuY3Rpb24oZXhwZWN0YXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gXCJlbmQgb2YgaW5wdXRcIjtcbiAgICAgICAgfSxcblxuICAgICAgICBvdGhlcjogZnVuY3Rpb24oZXhwZWN0YXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gZXhwZWN0YXRpb24uZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgZnVuY3Rpb24gaGV4KGNoKSB7XG4gICAgcmV0dXJuIGNoLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXRlcmFsRXNjYXBlKHMpIHtcbiAgICByZXR1cm4gc1xuICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgIC5yZXBsYWNlKC9cIi9nLCAgJ1xcXFxcIicpXG4gICAgICAucmVwbGFjZSgvXFwwL2csICdcXFxcMCcpXG4gICAgICAucmVwbGFjZSgvXFx0L2csICdcXFxcdCcpXG4gICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICAucmVwbGFjZSgvXFxyL2csICdcXFxccicpXG4gICAgICAucmVwbGFjZSgvW1xceDAwLVxceDBGXS9nLCAgICAgICAgICBmdW5jdGlvbihjaCkgeyByZXR1cm4gJ1xcXFx4MCcgKyBoZXgoY2gpOyB9KVxuICAgICAgLnJlcGxhY2UoL1tcXHgxMC1cXHgxRlxceDdGLVxceDlGXS9nLCBmdW5jdGlvbihjaCkgeyByZXR1cm4gJ1xcXFx4JyAgKyBoZXgoY2gpOyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsYXNzRXNjYXBlKHMpIHtcbiAgICByZXR1cm4gc1xuICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgIC5yZXBsYWNlKC9cXF0vZywgJ1xcXFxdJylcbiAgICAgIC5yZXBsYWNlKC9cXF4vZywgJ1xcXFxeJylcbiAgICAgIC5yZXBsYWNlKC8tL2csICAnXFxcXC0nKVxuICAgICAgLnJlcGxhY2UoL1xcMC9nLCAnXFxcXDAnKVxuICAgICAgLnJlcGxhY2UoL1xcdC9nLCAnXFxcXHQnKVxuICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgICAgLnJlcGxhY2UoL1tcXHgwMC1cXHgwRl0vZywgICAgICAgICAgZnVuY3Rpb24oY2gpIHsgcmV0dXJuICdcXFxceDAnICsgaGV4KGNoKTsgfSlcbiAgICAgIC5yZXBsYWNlKC9bXFx4MTAtXFx4MUZcXHg3Ri1cXHg5Rl0vZywgZnVuY3Rpb24oY2gpIHsgcmV0dXJuICdcXFxceCcgICsgaGV4KGNoKTsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXNjcmliZUV4cGVjdGF0aW9uKGV4cGVjdGF0aW9uKSB7XG4gICAgcmV0dXJuIERFU0NSSUJFX0VYUEVDVEFUSU9OX0ZOU1tleHBlY3RhdGlvbi50eXBlXShleHBlY3RhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBkZXNjcmliZUV4cGVjdGVkKGV4cGVjdGVkKSB7XG4gICAgdmFyIGRlc2NyaXB0aW9ucyA9IG5ldyBBcnJheShleHBlY3RlZC5sZW5ndGgpLFxuICAgICAgICBpLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGV4cGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXNjcmlwdGlvbnNbaV0gPSBkZXNjcmliZUV4cGVjdGF0aW9uKGV4cGVjdGVkW2ldKTtcbiAgICB9XG5cbiAgICBkZXNjcmlwdGlvbnMuc29ydCgpO1xuXG4gICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGkgPSAxLCBqID0gMTsgaSA8IGRlc2NyaXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zW2kgLSAxXSAhPT0gZGVzY3JpcHRpb25zW2ldKSB7XG4gICAgICAgICAgZGVzY3JpcHRpb25zW2pdID0gZGVzY3JpcHRpb25zW2ldO1xuICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVzY3JpcHRpb25zLmxlbmd0aCA9IGo7XG4gICAgfVxuXG4gICAgc3dpdGNoIChkZXNjcmlwdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXSArIFwiIG9yIFwiICsgZGVzY3JpcHRpb25zWzFdO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zLnNsaWNlKDAsIC0xKS5qb2luKFwiLCBcIilcbiAgICAgICAgICArIFwiLCBvciBcIlxuICAgICAgICAgICsgZGVzY3JpcHRpb25zW2Rlc2NyaXB0aW9ucy5sZW5ndGggLSAxXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXNjcmliZUZvdW5kKGZvdW5kKSB7XG4gICAgcmV0dXJuIGZvdW5kID8gXCJcXFwiXCIgKyBsaXRlcmFsRXNjYXBlKGZvdW5kKSArIFwiXFxcIlwiIDogXCJlbmQgb2YgaW5wdXRcIjtcbiAgfVxuXG4gIHJldHVybiBcIkV4cGVjdGVkIFwiICsgZGVzY3JpYmVFeHBlY3RlZChleHBlY3RlZCkgKyBcIiBidXQgXCIgKyBkZXNjcmliZUZvdW5kKGZvdW5kKSArIFwiIGZvdW5kLlwiO1xufTtcblxuZnVuY3Rpb24gcGVnJHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zICE9PSB2b2lkIDAgPyBvcHRpb25zIDoge307XG5cbiAgdmFyIHBlZyRGQUlMRUQgPSB7fSxcblxuICAgICAgcGVnJHN0YXJ0UnVsZUZ1bmN0aW9ucyA9IHsgU2NyaXB0OiBwZWckcGFyc2VTY3JpcHQgfSxcbiAgICAgIHBlZyRzdGFydFJ1bGVGdW5jdGlvbiAgPSBwZWckcGFyc2VTY3JpcHQsXG5cbiAgICAgIHBlZyRjMCA9IFwiXFxuXCIsXG4gICAgICBwZWckYzEgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwiXFxuXCIsIGZhbHNlKSxcbiAgICAgIHBlZyRjMiA9IGZ1bmN0aW9uKHN0YXQpIHsgcmV0dXJuIHN0YXQ7IH0sXG4gICAgICBwZWckYzMgPSBmdW5jdGlvbihzdGF0cykgeyBcclxuICAgICAgICAgICAgcmV0dXJuIHtub2RlOlwiU2NyaXB0XCIsIHN0YXRlbWVudHM6c3RhdHMuZmlsdGVyKHMgPT4gcyl9OyBcclxuICAgICAgICAgIH0sXG4gICAgICBwZWckYzQgPSBcImxldFwiLFxuICAgICAgcGVnJGM1ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcImxldFwiLCBmYWxzZSksXG4gICAgICBwZWckYzYgPSBcIj1cIixcbiAgICAgIHBlZyRjNyA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCI9XCIsIGZhbHNlKSxcbiAgICAgIHBlZyRjOCA9IGZ1bmN0aW9uKGlkZW50LCBleHByKSB7IFxyXG4gICAgICAgICAgICByZXR1cm4geyBub2RlOiBcIlN0YXRlbWVudDpMZXRcIiwgaWRlbnRpZmllcjogaWRlbnQsIHZhbHVlOiBleHByIH07IFxyXG4gICAgICAgICAgfSxcbiAgICAgIHBlZyRjOSA9IFwicHJvY1wiLFxuICAgICAgcGVnJGMxMCA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJwcm9jXCIsIGZhbHNlKSxcbiAgICAgIHBlZyRjMTEgPSBcIihcIixcbiAgICAgIHBlZyRjMTIgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwiKFwiLCBmYWxzZSksXG4gICAgICBwZWckYzEzID0gXCIpXCIsXG4gICAgICBwZWckYzE0ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcIilcIiwgZmFsc2UpLFxuICAgICAgcGVnJGMxNSA9IFwiZW5kXCIsXG4gICAgICBwZWckYzE2ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcImVuZFwiLCBmYWxzZSksXG4gICAgICBwZWckYzE3ID0gZnVuY3Rpb24ocHJvY25hbWUsIHBhcmFtcywgYm9keSkge1xyXG4gICAgICAgXHRcdHJldHVybiB7XHJcbiAgICAgICAgICAgICAgXHRub2RlOiBcIlByb2NEZWNsXCIsXHJcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHByb2NuYW1lLFxyXG4gICAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgYm9keTogYm9keS5zdGF0ZW1lbnRzXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgIFx0fSxcbiAgICAgIHBlZyRjMTggPSBcInJlcGVhdFwiLFxuICAgICAgcGVnJGMxOSA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJyZXBlYXRcIiwgZmFsc2UpLFxuICAgICAgcGVnJGMyMCA9IGZ1bmN0aW9uKGNvdW50LCBib2R5KSB7IFxyXG4gICAgICAgICAgICByZXR1cm4geyBub2RlOiBcIlN0YXRlbWVudDpSZXBlYXRcIiwgY291bnQ6IGNvdW50LCBib2R5OiBib2R5LnN0YXRlbWVudHMgfTsgXHJcbiAgICAgICAgICB9LFxuICAgICAgcGVnJGMyMSA9IFwiY2FsbFwiLFxuICAgICAgcGVnJGMyMiA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJjYWxsXCIsIGZhbHNlKSxcbiAgICAgIHBlZyRjMjMgPSBmdW5jdGlvbihmdW5jYykgeyByZXR1cm4gZnVuY2M7IH0sXG4gICAgICBwZWckYzI0ID0gXCJjb2xvclwiLFxuICAgICAgcGVnJGMyNSA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJjb2xvclwiLCBmYWxzZSksXG4gICAgICBwZWckYzI2ID0gXCJjb2xcIixcbiAgICAgIHBlZyRjMjcgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwiY29sXCIsIGZhbHNlKSxcbiAgICAgIHBlZyRjMjggPSBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgbm9kZTogXCJTdGF0ZW1lbnQ6Q29sb3JcIiwgdmFsdWU6IHZhbCB9O1xyXG4gICAgICAgICB9LFxuICAgICAgcGVnJGMyOSA9IGZ1bmN0aW9uKGNvbW0sIHBhcmFtcykgeyBcclxuICAgICAgICAgICAgcmV0dXJuIHsgbm9kZTogXCJTdGF0ZW1lbnQ6Q29tbWFuZFwiLCBjb21tYW5kOiBjb21tLCBwYXJhbXM6IHBhcmFtcyB9OyBcclxuICAgICAgICAgfSxcbiAgICAgIHBlZyRjMzAgPSBmdW5jdGlvbihpZGVudCwgZXhwcikgeyBcclxuICAgICAgICAgICAgcmV0dXJuIHsgbm9kZTogXCJTdGF0ZW1lbnQ6QXNzaWduXCIsIHZhcmlhYmxlOiBpZGVudCwgdmFsdWU6IGV4cHIgfTsgXHJcbiAgICAgICAgIH0sXG4gICAgICBwZWckYzMxID0gZnVuY3Rpb24oKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcGVnJGMzMiA9IC9eW15cXG5dLyxcbiAgICAgIHBlZyRjMzMgPSBwZWckY2xhc3NFeHBlY3RhdGlvbihbXCJcXG5cIl0sIHRydWUsIGZhbHNlKSxcbiAgICAgIHBlZyRjMzQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHtub2RlOlwiRXJyb3JcIn07IH0sXG4gICAgICBwZWckYzM1ID0gXCJwdXNocG9zXCIsXG4gICAgICBwZWckYzM2ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcInB1c2hwb3NcIiwgdHJ1ZSksXG4gICAgICBwZWckYzM3ID0gXCJwb3Bwb3NcIixcbiAgICAgIHBlZyRjMzggPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwicG9wcG9zXCIsIHRydWUpLFxuICAgICAgcGVnJGMzOSA9IFwiZmRcIixcbiAgICAgIHBlZyRjNDAgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwiZmRcIiwgdHJ1ZSksXG4gICAgICBwZWckYzQxID0gXCJmb3J3YXJkXCIsXG4gICAgICBwZWckYzQyID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcImZvcndhcmRcIiwgdHJ1ZSksXG4gICAgICBwZWckYzQzID0gXCJia1wiLFxuICAgICAgcGVnJGM0NCA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJia1wiLCB0cnVlKSxcbiAgICAgIHBlZyRjNDUgPSBcImJhY2t3YXJkXCIsXG4gICAgICBwZWckYzQ2ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcImJhY2t3YXJkXCIsIHRydWUpLFxuICAgICAgcGVnJGM0NyA9IFwibHRcIixcbiAgICAgIHBlZyRjNDggPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwibHRcIiwgdHJ1ZSksXG4gICAgICBwZWckYzQ5ID0gXCJsZWZ0XCIsXG4gICAgICBwZWckYzUwID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcImxlZnRcIiwgdHJ1ZSksXG4gICAgICBwZWckYzUxID0gXCJydFwiLFxuICAgICAgcGVnJGM1MiA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJydFwiLCB0cnVlKSxcbiAgICAgIHBlZyRjNTMgPSBcInJpZ2h0XCIsXG4gICAgICBwZWckYzU0ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcInJpZ2h0XCIsIHRydWUpLFxuICAgICAgcGVnJGM1NSA9IFwic2hvd1wiLFxuICAgICAgcGVnJGM1NiA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJzaG93XCIsIHRydWUpLFxuICAgICAgcGVnJGM1NyA9IFwiaGlkZVwiLFxuICAgICAgcGVnJGM1OCA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJoaWRlXCIsIHRydWUpLFxuICAgICAgcGVnJGM1OSA9IFwicGVudXBcIixcbiAgICAgIHBlZyRjNjAgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwicGVudXBcIiwgdHJ1ZSksXG4gICAgICBwZWckYzYxID0gXCJwdVwiLFxuICAgICAgcGVnJGM2MiA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJwdVwiLCB0cnVlKSxcbiAgICAgIHBlZyRjNjMgPSBcInBlbmRvd25cIixcbiAgICAgIHBlZyRjNjQgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwicGVuZG93blwiLCB0cnVlKSxcbiAgICAgIHBlZyRjNjUgPSBcInBkXCIsXG4gICAgICBwZWckYzY2ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcInBkXCIsIHRydWUpLFxuICAgICAgcGVnJGM2NyA9IFwiaG9tZVwiLFxuICAgICAgcGVnJGM2OCA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCJob21lXCIsIHRydWUpLFxuICAgICAgcGVnJGM2OSA9IFwidGhpY2tcIixcbiAgICAgIHBlZyRjNzAgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwidGhpY2tcIiwgdHJ1ZSksXG4gICAgICBwZWckYzcxID0gXCJ0aGlja25lc3NcIixcbiAgICAgIHBlZyRjNzIgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwidGhpY2tuZXNzXCIsIHRydWUpLFxuICAgICAgcGVnJGM3MyA9IFwic2NyZWVuXCIsXG4gICAgICBwZWckYzc0ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcInNjcmVlblwiLCB0cnVlKSxcbiAgICAgIHBlZyRjNzUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRleHQoKTsgfSxcbiAgICAgIHBlZyRjNzYgPSBmdW5jdGlvbihoZWFkLCB0YWlsKSB7IHJldHVybiBbaGVhZF0uY29uY2F0KHRhaWwpOyB9LFxuICAgICAgcGVnJGM3NyA9IC9eW2EtekEtWl9dLyxcbiAgICAgIHBlZyRjNzggPSBwZWckY2xhc3NFeHBlY3RhdGlvbihbW1wiYVwiLCBcInpcIl0sIFtcIkFcIiwgXCJaXCJdLCBcIl9cIl0sIGZhbHNlLCBmYWxzZSksXG4gICAgICBwZWckYzc5ID0gL15bYS16QS1aXzAtOV0vLFxuICAgICAgcGVnJGM4MCA9IHBlZyRjbGFzc0V4cGVjdGF0aW9uKFtbXCJhXCIsIFwielwiXSwgW1wiQVwiLCBcIlpcIl0sIFwiX1wiLCBbXCIwXCIsIFwiOVwiXV0sIGZhbHNlLCBmYWxzZSksXG4gICAgICBwZWckYzgxID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIkBcIiArIHRleHQoKTsgfSxcbiAgICAgIHBlZyRjODIgPSBcIitcIixcbiAgICAgIHBlZyRjODMgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwiK1wiLCBmYWxzZSksXG4gICAgICBwZWckYzg0ID0gXCItXCIsXG4gICAgICBwZWckYzg1ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcIi1cIiwgZmFsc2UpLFxuICAgICAgcGVnJGM4NiA9IGZ1bmN0aW9uKGhlYWQsIG9wLCB0ZXJtKSB7IHJldHVybiB7b3A6b3AsIHRlcm06dGVybX07IH0sXG4gICAgICBwZWckYzg3ID0gZnVuY3Rpb24oaGVhZCwgdGFpbCkge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gdGFpbC5sZW5ndGggPT0gMCA/IGhlYWQgOiB7XHJcbiAgICAgICAgICAgICAgXHRcIm5vZGVcIjogXCJFeHByZXNzaW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwidGVybXNcIjogW2hlYWRdLmNvbmNhdCh0YWlsLm1hcCh4PT54LnRlcm0pKSxcclxuICAgICAgICAgICAgICAgICAgXCJvcHNcIjogdGFpbC5tYXAoeD0+eC5vcCksXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0sXG4gICAgICBwZWckYzg4ID0gXCIqXCIsXG4gICAgICBwZWckYzg5ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcIipcIiwgZmFsc2UpLFxuICAgICAgcGVnJGM5MCA9IFwiL1wiLFxuICAgICAgcGVnJGM5MSA9IHBlZyRsaXRlcmFsRXhwZWN0YXRpb24oXCIvXCIsIGZhbHNlKSxcbiAgICAgIHBlZyRjOTIgPSBmdW5jdGlvbihoZWFkLCBvcCwgZmFjdG9yKSB7IHJldHVybiB7b3A6b3AsIGZhY3RvcjogZmFjdG9yfX0sXG4gICAgICBwZWckYzkzID0gZnVuY3Rpb24oaGVhZCwgdGFpbCkge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gdGFpbC5sZW5ndGggPT0gMCA/IGhlYWQgOiB7XHJcbiAgICAgICAgICAgICAgXHRcIm5vZGVcIjogXCJUZXJtXCIsXHJcbiAgICAgICAgICAgICAgICAgIFwiZmFjdG9yc1wiOiBbaGVhZF0uY29uY2F0KHRhaWwubWFwKHg9PnguZmFjdG9yKSksXHJcbiAgICAgICAgICAgICAgICAgIFwib3BzXCI6IHRhaWwubWFwKHg9Pngub3ApXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0sXG4gICAgICBwZWckYzk0ID0gZnVuY3Rpb24oZXhwcikgeyByZXR1cm4gZXhwcjsgfSxcbiAgICAgIHBlZyRjOTUgPSBmdW5jdGlvbihmdW5jLCBwYXJhbXMpIHsgXHJcbiAgICAgICAgICAgIHJldHVybiB7IG5vZGU6IFwiRXhwcmVzc2lvbjpDYWxsXCIsIGZ1bmM6IGZ1bmMsIHBhcmFtczogcGFyYW1zIH07IFxyXG4gICAgICAgICAgfSxcbiAgICAgIHBlZyRjOTYgPSBmdW5jdGlvbihoZWFkLCB0YWlsKSB7IHJldHVybiBbaGVhZF0uY29uY2F0KHRhaWwubWFwKHg9PnhbMV0pKTsgfSxcbiAgICAgIHBlZyRjOTcgPSBmdW5jdGlvbigpIHsgcmV0dXJuIFtdOyB9LFxuICAgICAgcGVnJGM5OCA9IC9eWzAtOV0vLFxuICAgICAgcGVnJGM5OSA9IHBlZyRjbGFzc0V4cGVjdGF0aW9uKFtbXCIwXCIsIFwiOVwiXV0sIGZhbHNlLCBmYWxzZSksXG4gICAgICBwZWckYzEwMCA9IFwiLlwiLFxuICAgICAgcGVnJGMxMDEgPSBwZWckbGl0ZXJhbEV4cGVjdGF0aW9uKFwiLlwiLCBmYWxzZSksXG4gICAgICBwZWckYzEwMiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gcGFyc2VGbG9hdCh0ZXh0KCkpOyB9LFxuICAgICAgcGVnJGMxMDMgPSBcIlxcXCJcIixcbiAgICAgIHBlZyRjMTA0ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcIlxcXCJcIiwgZmFsc2UpLFxuICAgICAgcGVnJGMxMDUgPSAvXlteXCJdLyxcbiAgICAgIHBlZyRjMTA2ID0gcGVnJGNsYXNzRXhwZWN0YXRpb24oW1wiXFxcIlwiXSwgdHJ1ZSwgZmFsc2UpLFxuICAgICAgcGVnJGMxMDcgPSBmdW5jdGlvbih2YWwpIHsgcmV0dXJuIHZhbC5qb2luKFwiXCIpOyB9LFxuICAgICAgcGVnJGMxMDggPSBcIidcIixcbiAgICAgIHBlZyRjMTA5ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcIidcIiwgZmFsc2UpLFxuICAgICAgcGVnJGMxMTAgPSAvXlteJ10vLFxuICAgICAgcGVnJGMxMTEgPSBwZWckY2xhc3NFeHBlY3RhdGlvbihbXCInXCJdLCB0cnVlLCBmYWxzZSksXG4gICAgICBwZWckYzExMiA9IHBlZyRvdGhlckV4cGVjdGF0aW9uKFwid2hpdGVzcGFjZVwiKSxcbiAgICAgIHBlZyRjMTEzID0gL15bIFxcdFxccl0vLFxuICAgICAgcGVnJGMxMTQgPSBwZWckY2xhc3NFeHBlY3RhdGlvbihbXCIgXCIsIFwiXFx0XCIsIFwiXFxyXCJdLCBmYWxzZSwgZmFsc2UpLFxuICAgICAgcGVnJGMxMTUgPSBcIiNcIixcbiAgICAgIHBlZyRjMTE2ID0gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbihcIiNcIiwgZmFsc2UpLFxuXG4gICAgICBwZWckY3VyclBvcyAgICAgICAgICA9IDAsXG4gICAgICBwZWckc2F2ZWRQb3MgICAgICAgICA9IDAsXG4gICAgICBwZWckcG9zRGV0YWlsc0NhY2hlICA9IFt7IGxpbmU6IDEsIGNvbHVtbjogMSB9XSxcbiAgICAgIHBlZyRtYXhGYWlsUG9zICAgICAgID0gMCxcbiAgICAgIHBlZyRtYXhGYWlsRXhwZWN0ZWQgID0gW10sXG4gICAgICBwZWckc2lsZW50RmFpbHMgICAgICA9IDAsXG5cbiAgICAgIHBlZyRyZXN1bHQ7XG5cbiAgaWYgKFwic3RhcnRSdWxlXCIgaW4gb3B0aW9ucykge1xuICAgIGlmICghKG9wdGlvbnMuc3RhcnRSdWxlIGluIHBlZyRzdGFydFJ1bGVGdW5jdGlvbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzdGFydCBwYXJzaW5nIGZyb20gcnVsZSBcXFwiXCIgKyBvcHRpb25zLnN0YXJ0UnVsZSArIFwiXFxcIi5cIik7XG4gICAgfVxuXG4gICAgcGVnJHN0YXJ0UnVsZUZ1bmN0aW9uID0gcGVnJHN0YXJ0UnVsZUZ1bmN0aW9uc1tvcHRpb25zLnN0YXJ0UnVsZV07XG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0KCkge1xuICAgIHJldHVybiBpbnB1dC5zdWJzdHJpbmcocGVnJHNhdmVkUG9zLCBwZWckY3VyclBvcyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2NhdGlvbigpIHtcbiAgICByZXR1cm4gcGVnJGNvbXB1dGVMb2NhdGlvbihwZWckc2F2ZWRQb3MsIHBlZyRjdXJyUG9zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4cGVjdGVkKGRlc2NyaXB0aW9uLCBsb2NhdGlvbikge1xuICAgIGxvY2F0aW9uID0gbG9jYXRpb24gIT09IHZvaWQgMCA/IGxvY2F0aW9uIDogcGVnJGNvbXB1dGVMb2NhdGlvbihwZWckc2F2ZWRQb3MsIHBlZyRjdXJyUG9zKVxuXG4gICAgdGhyb3cgcGVnJGJ1aWxkU3RydWN0dXJlZEVycm9yKFxuICAgICAgW3BlZyRvdGhlckV4cGVjdGF0aW9uKGRlc2NyaXB0aW9uKV0sXG4gICAgICBpbnB1dC5zdWJzdHJpbmcocGVnJHNhdmVkUG9zLCBwZWckY3VyclBvcyksXG4gICAgICBsb2NhdGlvblxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBlcnJvcihtZXNzYWdlLCBsb2NhdGlvbikge1xuICAgIGxvY2F0aW9uID0gbG9jYXRpb24gIT09IHZvaWQgMCA/IGxvY2F0aW9uIDogcGVnJGNvbXB1dGVMb2NhdGlvbihwZWckc2F2ZWRQb3MsIHBlZyRjdXJyUG9zKVxuXG4gICAgdGhyb3cgcGVnJGJ1aWxkU2ltcGxlRXJyb3IobWVzc2FnZSwgbG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJGxpdGVyYWxFeHBlY3RhdGlvbih0ZXh0LCBpZ25vcmVDYXNlKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJsaXRlcmFsXCIsIHRleHQ6IHRleHQsIGlnbm9yZUNhc2U6IGlnbm9yZUNhc2UgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlZyRjbGFzc0V4cGVjdGF0aW9uKHBhcnRzLCBpbnZlcnRlZCwgaWdub3JlQ2FzZSkge1xuICAgIHJldHVybiB7IHR5cGU6IFwiY2xhc3NcIiwgcGFydHM6IHBhcnRzLCBpbnZlcnRlZDogaW52ZXJ0ZWQsIGlnbm9yZUNhc2U6IGlnbm9yZUNhc2UgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlZyRhbnlFeHBlY3RhdGlvbigpIHtcbiAgICByZXR1cm4geyB0eXBlOiBcImFueVwiIH07XG4gIH1cblxuICBmdW5jdGlvbiBwZWckZW5kRXhwZWN0YXRpb24oKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogXCJlbmRcIiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJG90aGVyRXhwZWN0YXRpb24oZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4geyB0eXBlOiBcIm90aGVyXCIsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJGNvbXB1dGVQb3NEZXRhaWxzKHBvcykge1xuICAgIHZhciBkZXRhaWxzID0gcGVnJHBvc0RldGFpbHNDYWNoZVtwb3NdLCBwO1xuXG4gICAgaWYgKGRldGFpbHMpIHtcbiAgICAgIHJldHVybiBkZXRhaWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gcG9zIC0gMTtcbiAgICAgIHdoaWxlICghcGVnJHBvc0RldGFpbHNDYWNoZVtwXSkge1xuICAgICAgICBwLS07XG4gICAgICB9XG5cbiAgICAgIGRldGFpbHMgPSBwZWckcG9zRGV0YWlsc0NhY2hlW3BdO1xuICAgICAgZGV0YWlscyA9IHtcbiAgICAgICAgbGluZTogICBkZXRhaWxzLmxpbmUsXG4gICAgICAgIGNvbHVtbjogZGV0YWlscy5jb2x1bW5cbiAgICAgIH07XG5cbiAgICAgIHdoaWxlIChwIDwgcG9zKSB7XG4gICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHApID09PSAxMCkge1xuICAgICAgICAgIGRldGFpbHMubGluZSsrO1xuICAgICAgICAgIGRldGFpbHMuY29sdW1uID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZXRhaWxzLmNvbHVtbisrO1xuICAgICAgICB9XG5cbiAgICAgICAgcCsrO1xuICAgICAgfVxuXG4gICAgICBwZWckcG9zRGV0YWlsc0NhY2hlW3Bvc10gPSBkZXRhaWxzO1xuICAgICAgcmV0dXJuIGRldGFpbHM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGVnJGNvbXB1dGVMb2NhdGlvbihzdGFydFBvcywgZW5kUG9zKSB7XG4gICAgdmFyIHN0YXJ0UG9zRGV0YWlscyA9IHBlZyRjb21wdXRlUG9zRGV0YWlscyhzdGFydFBvcyksXG4gICAgICAgIGVuZFBvc0RldGFpbHMgICA9IHBlZyRjb21wdXRlUG9zRGV0YWlscyhlbmRQb3MpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIG9mZnNldDogc3RhcnRQb3MsXG4gICAgICAgIGxpbmU6ICAgc3RhcnRQb3NEZXRhaWxzLmxpbmUsXG4gICAgICAgIGNvbHVtbjogc3RhcnRQb3NEZXRhaWxzLmNvbHVtblxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBvZmZzZXQ6IGVuZFBvcyxcbiAgICAgICAgbGluZTogICBlbmRQb3NEZXRhaWxzLmxpbmUsXG4gICAgICAgIGNvbHVtbjogZW5kUG9zRGV0YWlscy5jb2x1bW5cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJGZhaWwoZXhwZWN0ZWQpIHtcbiAgICBpZiAocGVnJGN1cnJQb3MgPCBwZWckbWF4RmFpbFBvcykgeyByZXR1cm47IH1cblxuICAgIGlmIChwZWckY3VyclBvcyA+IHBlZyRtYXhGYWlsUG9zKSB7XG4gICAgICBwZWckbWF4RmFpbFBvcyA9IHBlZyRjdXJyUG9zO1xuICAgICAgcGVnJG1heEZhaWxFeHBlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIHBlZyRtYXhGYWlsRXhwZWN0ZWQucHVzaChleHBlY3RlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBwZWckYnVpbGRTaW1wbGVFcnJvcihtZXNzYWdlLCBsb2NhdGlvbikge1xuICAgIHJldHVybiBuZXcgcGVnJFN5bnRheEVycm9yKG1lc3NhZ2UsIG51bGwsIG51bGwsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlZyRidWlsZFN0cnVjdHVyZWRFcnJvcihleHBlY3RlZCwgZm91bmQsIGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBwZWckU3ludGF4RXJyb3IoXG4gICAgICBwZWckU3ludGF4RXJyb3IuYnVpbGRNZXNzYWdlKGV4cGVjdGVkLCBmb3VuZCksXG4gICAgICBleHBlY3RlZCxcbiAgICAgIGZvdW5kLFxuICAgICAgbG9jYXRpb25cbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlU2NyaXB0KCkge1xuICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQsIHM1LCBzNjtcblxuICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgczEgPSBbXTtcbiAgICBzMiA9IHBlZyRjdXJyUG9zO1xuICAgIHMzID0gcGVnJHBhcnNlXygpO1xuICAgIGlmIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgczQgPSBwZWckcGFyc2VTdGF0ZW1lbnQoKTtcbiAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzNSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSAxMCkge1xuICAgICAgICAgICAgczYgPSBwZWckYzA7XG4gICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzNiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMSk7IH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHM2ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMjtcbiAgICAgICAgICAgIHMzID0gcGVnJGMyKHM0KTtcbiAgICAgICAgICAgIHMyID0gczM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczI7XG4gICAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczI7XG4gICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMyO1xuICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlZyRjdXJyUG9zID0gczI7XG4gICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgfVxuICAgIHdoaWxlIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgczEucHVzaChzMik7XG4gICAgICBzMiA9IHBlZyRjdXJyUG9zO1xuICAgICAgczMgPSBwZWckcGFyc2VfKCk7XG4gICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczQgPSBwZWckcGFyc2VTdGF0ZW1lbnQoKTtcbiAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczUgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDEwKSB7XG4gICAgICAgICAgICAgIHM2ID0gcGVnJGMwO1xuICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgczYgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzNiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMjtcbiAgICAgICAgICAgICAgczMgPSBwZWckYzIoczQpO1xuICAgICAgICAgICAgICBzMiA9IHMzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMjtcbiAgICAgICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMyO1xuICAgICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMyO1xuICAgICAgICAgIHMyID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMjtcbiAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgczEgPSBwZWckYzMoczEpO1xuICAgIH1cbiAgICBzMCA9IHMxO1xuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlU3RhdGVtZW50KCkge1xuICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQsIHM1LCBzNiwgczcsIHM4LCBzOSwgczEwLCBzMTEsIHMxMjtcblxuICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMykgPT09IHBlZyRjNCkge1xuICAgICAgczEgPSBwZWckYzQ7XG4gICAgICBwZWckY3VyclBvcyArPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNSk7IH1cbiAgICB9XG4gICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICBzMiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzMyA9IHBlZyRwYXJzZUlkZW50aWZpZXIoKTtcbiAgICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczQgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDYxKSB7XG4gICAgICAgICAgICAgIHM1ID0gcGVnJGM2O1xuICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgczUgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNyk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBzNiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgaWYgKHM2ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgczcgPSBwZWckcGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHM3ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGM4KHMzLCBzNyk7XG4gICAgICAgICAgICAgICAgICBzMCA9IHMxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgIH1cbiAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICBpZiAoaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCA0KSA9PT0gcGVnJGM5KSB7XG4gICAgICAgIHMxID0gcGVnJGM5O1xuICAgICAgICBwZWckY3VyclBvcyArPSA0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTApOyB9XG4gICAgICB9XG4gICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczIgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHMzID0gcGVnJHBhcnNlSWRlbnRpZmllcigpO1xuICAgICAgICAgIGlmIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0MCkge1xuICAgICAgICAgICAgICBzNCA9IHBlZyRjMTE7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzNCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBzNSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgczYgPSBwZWckcGFyc2VQYXJhbURlY2xMaXN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHM2ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBzNyA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzNyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDQxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgczggPSBwZWckYzEzO1xuICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgczggPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxNCk7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoczggIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzOSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoczkgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgczEwID0gcGVnJGMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgczEwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzEpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEwICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHMxMSA9IHBlZyRwYXJzZVNjcmlwdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczExICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMykgPT09IHBlZyRjMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxMiA9IHBlZyRjMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzMTIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzE2KTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGMxNyhzMywgczYsIHMxMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzMCA9IHMxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpID09PSBwZWckYzE4KSB7XG4gICAgICAgICAgczEgPSBwZWckYzE4O1xuICAgICAgICAgIHBlZyRjdXJyUG9zICs9IDY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxOSk7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHMzID0gcGVnJHBhcnNlTnVtYmVyKCk7XG4gICAgICAgICAgICBpZiAoczMgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczMgPSBwZWckcGFyc2VJZGVudGlmaWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczQgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gMTApIHtcbiAgICAgICAgICAgICAgICAgIHM1ID0gcGVnJGMwO1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgczUgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzEpOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgczYgPSBwZWckcGFyc2VTY3JpcHQoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzNiA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICBzNiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgczcgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzNyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDMpID09PSBwZWckYzE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzOCA9IHBlZyRjMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzOCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTYpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChzOCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMjAoczMsIHM2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNCkgPT09IHBlZyRjMjEpIHtcbiAgICAgICAgICAgIHMxID0gcGVnJGMyMTtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zICs9IDQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMyMik7IH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBzMiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBzMyA9IHBlZyRwYXJzZUZ1bmNDYWxsKCk7XG4gICAgICAgICAgICAgIGlmIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMxID0gcGVnJGMyMyhzMyk7XG4gICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgICBpZiAoaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCA1KSA9PT0gcGVnJGMyNCkge1xuICAgICAgICAgICAgICBzMSA9IHBlZyRjMjQ7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zICs9IDU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMyNSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzMSA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBpZiAoaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCAzKSA9PT0gcGVnJGMyNikge1xuICAgICAgICAgICAgICAgIHMxID0gcGVnJGMyNjtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMjcpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBzMiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgczMgPSBwZWckcGFyc2VTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgczEgPSBwZWckYzI4KHMzKTtcbiAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgICAgICAgczEgPSBwZWckcGFyc2VDb21tYW5kKCk7XG4gICAgICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIHMyID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgczMgPSBwZWckcGFyc2VFeHByTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMjkoczEsIHMzKTtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgICAgICAgICBzMSA9IHBlZyRwYXJzZUlkZW50aWZpZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgIHMyID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gNjEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzMyA9IHBlZyRjNjtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNyk7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzNCA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHM1ID0gcGVnJHBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMzAoczEsIHM1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICAgICAgICAgICAgczEgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgczIgPSBwZWckY3VyclBvcztcbiAgICAgICAgICAgICAgICAgICAgcGVnJHNpbGVudEZhaWxzKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gMTApIHtcbiAgICAgICAgICAgICAgICAgICAgICBzMyA9IHBlZyRjMDtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMSk7IH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwZWckc2lsZW50RmFpbHMtLTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMjtcbiAgICAgICAgICAgICAgICAgICAgICBzMiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckYzMxKCk7XG4gICAgICAgICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgICAgICAgICAgIHBlZyRzaWxlbnRGYWlscysrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCAzKSA9PT0gcGVnJGMxNSkge1xuICAgICAgICAgICAgICAgICAgICAgIHMyID0gcGVnJGMxNTtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHMyID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTYpOyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGVnJHNpbGVudEZhaWxzLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczE7XG4gICAgICAgICAgICAgICAgICAgICAgczEgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGMzMSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgczEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJGMzMi50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMiA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMzMpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHMxLnB1c2goczIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJGMzMi50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgczIgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMzMyk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMzQoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlZyRwYXJzZUNvbW1hbmQoKSB7XG4gICAgdmFyIHMwLCBzMTtcblxuICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNykudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGMzNSkge1xuICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDcpO1xuICAgICAgcGVnJGN1cnJQb3MgKz0gNztcbiAgICB9IGVsc2Uge1xuICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzM2KTsgfVxuICAgIH1cbiAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjMzcpIHtcbiAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpO1xuICAgICAgICBwZWckY3VyclBvcyArPSA2O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMzgpOyB9XG4gICAgICB9XG4gICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGMzOSkge1xuICAgICAgICAgIHMxID0gaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCAyKTtcbiAgICAgICAgICBwZWckY3VyclBvcyArPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNDApOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMxID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNykudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM0MSkge1xuICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDcpO1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gNztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzQyKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjNDMpIHtcbiAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpO1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNDQpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgOCkudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM0NSkge1xuICAgICAgICAgICAgICAgIHMxID0gaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCA4KTtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA4O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNDYpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHMxID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM0Nykge1xuICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpO1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzQ4KTsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDQpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjNDkpIHtcbiAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDQpO1xuICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNTApOyB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM1MSkge1xuICAgICAgICAgICAgICAgICAgICAgIHMxID0gaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAyO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNTIpOyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHMxID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNSkudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM1Mykge1xuICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gNTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzU0KTsgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDQpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjNTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNTYpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNCkudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM1Nykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCA0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNTgpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMxID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNSkudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM1OSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzYwKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjNjEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNjIpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNykudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM2Mykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCA3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNjQpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMxID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM2NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzY2KTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDQpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjNjcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNjgpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNSkudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM2OSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gaW5wdXQuc3Vic3RyKHBlZyRjdXJyUG9zLCA1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNzApOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMxID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgOSkudG9Mb3dlckNhc2UoKSA9PT0gcGVnJGM3MSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzcyKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpLnRvTG93ZXJDYXNlKCkgPT09IHBlZyRjNzMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNzQpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICBzMSA9IHBlZyRjNzUoKTtcbiAgICB9XG4gICAgczAgPSBzMTtcblxuICAgIHJldHVybiBzMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlZyRwYXJzZVBhcmFtRGVjbExpc3QoKSB7XG4gICAgdmFyIHMwLCBzMSwgczIsIHMzLCBzNCwgczU7XG5cbiAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgIHMxID0gcGVnJHBhcnNlSWRlbnRpZmllcigpO1xuICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgczIgPSBbXTtcbiAgICAgIHMzID0gcGVnJGN1cnJQb3M7XG4gICAgICBzNCA9IHBlZyRwYXJzZV8oKTtcbiAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzNSA9IHBlZyRwYXJzZUlkZW50aWZpZXIoKTtcbiAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczQgPSBbczQsIHM1XTtcbiAgICAgICAgICBzMyA9IHM0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgICB3aGlsZSAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczIucHVzaChzMyk7XG4gICAgICAgIHMzID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHM0ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzNSA9IHBlZyRwYXJzZUlkZW50aWZpZXIoKTtcbiAgICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHM0ID0gW3M0LCBzNV07XG4gICAgICAgICAgICBzMyA9IHM0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICBzMSA9IHBlZyRjNzYoczEsIHMyKTtcbiAgICAgICAgczAgPSBzMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICB9XG4gICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICBzMCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlSWRlbnRpZmllcigpIHtcbiAgICB2YXIgczAsIHMxLCBzMiwgczM7XG5cbiAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgIGlmIChwZWckYzc3LnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgIHMxID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM3OCk7IH1cbiAgICB9XG4gICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICBzMiA9IFtdO1xuICAgICAgaWYgKHBlZyRjNzkudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICBzMyA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM4MCk7IH1cbiAgICAgIH1cbiAgICAgIHdoaWxlIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzMi5wdXNoKHMzKTtcbiAgICAgICAgaWYgKHBlZyRjNzkudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgIHMzID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjODApOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgczEgPSBwZWckYzgxKCk7XG4gICAgICAgIHMwID0gczE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlRXhwcmVzc2lvbigpIHtcbiAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczYsIHM3O1xuXG4gICAgczAgPSBwZWckY3VyclBvcztcbiAgICBzMSA9IHBlZyRwYXJzZVRlcm0oKTtcbiAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIHMyID0gW107XG4gICAgICBzMyA9IHBlZyRjdXJyUG9zO1xuICAgICAgczQgPSBwZWckcGFyc2VfKCk7XG4gICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0Mykge1xuICAgICAgICAgIHM1ID0gcGVnJGM4MjtcbiAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHM1ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjODMpOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHM1ID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0NSkge1xuICAgICAgICAgICAgczUgPSBwZWckYzg0O1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczUgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzg1KTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzNiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHM3ID0gcGVnJHBhcnNlVGVybSgpO1xuICAgICAgICAgICAgaWYgKHM3ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgIHBlZyRzYXZlZFBvcyA9IHMzO1xuICAgICAgICAgICAgICBzNCA9IHBlZyRjODYoczEsIHM1LCBzNyk7XG4gICAgICAgICAgICAgIHMzID0gczQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgICB3aGlsZSAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczIucHVzaChzMyk7XG4gICAgICAgIHMzID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHM0ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDQzKSB7XG4gICAgICAgICAgICBzNSA9IHBlZyRjODI7XG4gICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzNSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjODMpOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzNSA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0NSkge1xuICAgICAgICAgICAgICBzNSA9IHBlZyRjODQ7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzNSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM4NSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBzNiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgIGlmIChzNiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBzNyA9IHBlZyRwYXJzZVRlcm0oKTtcbiAgICAgICAgICAgICAgaWYgKHM3ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczM7XG4gICAgICAgICAgICAgICAgczQgPSBwZWckYzg2KHMxLCBzNSwgczcpO1xuICAgICAgICAgICAgICAgIHMzID0gczQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgczEgPSBwZWckYzg3KHMxLCBzMik7XG4gICAgICAgIHMwID0gczE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlVGVybSgpIHtcbiAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczYsIHM3O1xuXG4gICAgczAgPSBwZWckY3VyclBvcztcbiAgICBzMSA9IHBlZyRwYXJzZUZhY3RvcigpO1xuICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgczIgPSBbXTtcbiAgICAgIHMzID0gcGVnJGN1cnJQb3M7XG4gICAgICBzNCA9IHBlZyRwYXJzZV8oKTtcbiAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDQyKSB7XG4gICAgICAgICAgczUgPSBwZWckYzg4O1xuICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczUgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM4OSk7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoczUgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDQ3KSB7XG4gICAgICAgICAgICBzNSA9IHBlZyRjOTA7XG4gICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzNSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjOTEpOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHM2ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgIGlmIChzNiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczcgPSBwZWckcGFyc2VGYWN0b3IoKTtcbiAgICAgICAgICAgIGlmIChzNyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMztcbiAgICAgICAgICAgICAgczQgPSBwZWckYzkyKHMxLCBzNSwgczcpO1xuICAgICAgICAgICAgICBzMyA9IHM0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHMyLnB1c2goczMpO1xuICAgICAgICBzMyA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzNCA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0Mikge1xuICAgICAgICAgICAgczUgPSBwZWckYzg4O1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczUgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzg5KTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczUgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gNDcpIHtcbiAgICAgICAgICAgICAgczUgPSBwZWckYzkwO1xuICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgczUgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjOTEpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczYgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczcgPSBwZWckcGFyc2VGYWN0b3IoKTtcbiAgICAgICAgICAgICAgaWYgKHM3ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczM7XG4gICAgICAgICAgICAgICAgczQgPSBwZWckYzkyKHMxLCBzNSwgczcpO1xuICAgICAgICAgICAgICAgIHMzID0gczQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgczEgPSBwZWckYzkzKHMxLCBzMik7XG4gICAgICAgIHMwID0gczE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlRmFjdG9yKCkge1xuICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQsIHM1O1xuXG4gICAgczAgPSBwZWckcGFyc2VOdW1iZXIoKTtcbiAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIHMwID0gcGVnJHBhcnNlRnVuY0NhbGwoKTtcbiAgICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzMCA9IHBlZyRwYXJzZUlkZW50aWZpZXIoKTtcbiAgICAgICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDQwKSB7XG4gICAgICAgICAgICBzMSA9IHBlZyRjMTE7XG4gICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTIpOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczIgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczMgPSBwZWckcGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICAgIGlmIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIHM0ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0MSkge1xuICAgICAgICAgICAgICAgICAgICBzNSA9IHBlZyRjMTM7XG4gICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzNSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxNCk7IH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczEgPSBwZWckYzk0KHMzKTtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gczA7XG4gIH1cblxuICBmdW5jdGlvbiBwZWckcGFyc2VGdW5jQ2FsbCgpIHtcbiAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczY7XG5cbiAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgIHMxID0gcGVnJHBhcnNlSWRlbnRpZmllcigpO1xuICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0MCkge1xuICAgICAgICBzMiA9IHBlZyRjMTE7XG4gICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMik7IH1cbiAgICAgIH1cbiAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzMyA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczQgPSBwZWckcGFyc2VFeHByTGlzdCgpO1xuICAgICAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczUgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0MSkge1xuICAgICAgICAgICAgICAgIHM2ID0gcGVnJGMxMztcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHM2ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTQpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHM2ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgczEgPSBwZWckYzk1KHMxLCBzNCk7XG4gICAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgIH1cblxuICAgIHJldHVybiBzMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlZyRwYXJzZUV4cHJMaXN0KCkge1xuICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQsIHM1O1xuXG4gICAgczAgPSBwZWckY3VyclBvcztcbiAgICBzMSA9IHBlZyRwYXJzZUV4cHJlc3Npb24oKTtcbiAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIHMyID0gW107XG4gICAgICBzMyA9IHBlZyRjdXJyUG9zO1xuICAgICAgczQgPSBwZWckcGFyc2VfKCk7XG4gICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczUgPSBwZWckcGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHM0ID0gW3M0LCBzNV07XG4gICAgICAgICAgczMgPSBzNDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHMyLnB1c2goczMpO1xuICAgICAgICBzMyA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzNCA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczUgPSBwZWckcGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBzNCA9IFtzNCwgczVdO1xuICAgICAgICAgICAgczMgPSBzNDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgczEgPSBwZWckYzk2KHMxLCBzMik7XG4gICAgICAgIHMwID0gczE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgfVxuICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgIHMxID0gcGVnJHBhcnNlXygpO1xuICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICBzMSA9IHBlZyRjOTcoKTtcbiAgICAgIH1cbiAgICAgIHMwID0gczE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlTnVtYmVyKCkge1xuICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQsIHM1O1xuXG4gICAgczAgPSBwZWckY3VyclBvcztcbiAgICBzMSA9IFtdO1xuICAgIGlmIChwZWckYzk4LnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgIHMyID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMyID0gcGVnJEZBSUxFRDtcbiAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM5OSk7IH1cbiAgICB9XG4gICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICB3aGlsZSAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczEucHVzaChzMik7XG4gICAgICAgIGlmIChwZWckYzk4LnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgICAgICBzMiA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzk5KTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICB9XG4gICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICBzMiA9IHBlZyRjdXJyUG9zO1xuICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0Nikge1xuICAgICAgICBzMyA9IHBlZyRjMTAwO1xuICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTAxKTsgfVxuICAgICAgfVxuICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHM0ID0gW107XG4gICAgICAgIGlmIChwZWckYzk4LnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgICAgICBzNSA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzNSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzk5KTsgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHdoaWxlIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczQucHVzaChzNSk7XG4gICAgICAgICAgICBpZiAocGVnJGM5OC50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgICAgIHM1ID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHM1ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzk5KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzNCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczMgPSBbczMsIHM0XTtcbiAgICAgICAgICBzMiA9IHMzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczI7XG4gICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMyO1xuICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgICBpZiAoczIgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczIgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIHBlZyRzYXZlZFBvcyA9IHMwO1xuICAgICAgICBzMSA9IHBlZyRjMTAyKCk7XG4gICAgICAgIHMwID0gczE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlU3RyaW5nKCkge1xuICAgIHZhciBzMCwgczEsIHMyLCBzMztcblxuICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSAzNCkge1xuICAgICAgczEgPSBwZWckYzEwMztcbiAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMDQpOyB9XG4gICAgfVxuICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgczIgPSBbXTtcbiAgICAgIGlmIChwZWckYzEwNS50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgIHMzID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzEwNik7IH1cbiAgICAgIH1cbiAgICAgIHdoaWxlIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBzMi5wdXNoKHMzKTtcbiAgICAgICAgaWYgKHBlZyRjMTA1LnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgICAgICBzMyA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzEwNik7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gMzQpIHtcbiAgICAgICAgICBzMyA9IHBlZyRjMTAzO1xuICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMDQpOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICAgICAgczEgPSBwZWckYzEwNyhzMik7XG4gICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgIH1cbiAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDM5KSB7XG4gICAgICAgIHMxID0gcGVnJGMxMDg7XG4gICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMDkpOyB9XG4gICAgICB9XG4gICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczIgPSBbXTtcbiAgICAgICAgaWYgKHBlZyRjMTEwLnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgICAgICBzMyA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzMyA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzExMSk7IH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMi5wdXNoKHMzKTtcbiAgICAgICAgICBpZiAocGVnJGMxMTAudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgICAgczMgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzExMSk7IH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSAzOSkge1xuICAgICAgICAgICAgczMgPSBwZWckYzEwODtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMzID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMDkpOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgcGVnJHNhdmVkUG9zID0gczA7XG4gICAgICAgICAgICBzMSA9IHBlZyRjMTA3KHMyKTtcbiAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICBzMCA9IHBlZyRGQUlMRUQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHMwO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVnJHBhcnNlXygpIHtcbiAgICB2YXIgczAsIHMxLCBzMjtcblxuICAgIHBlZyRzaWxlbnRGYWlscysrO1xuICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgczEgPSBbXTtcbiAgICBzMiA9IHBlZyRwYXJzZXdzKCk7XG4gICAgd2hpbGUgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICBzMS5wdXNoKHMyKTtcbiAgICAgIHMyID0gcGVnJHBhcnNld3MoKTtcbiAgICB9XG4gICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgIHMxID0gcGVnJGMzMSgpO1xuICAgIH1cbiAgICBzMCA9IHMxO1xuICAgIHBlZyRzaWxlbnRGYWlscy0tO1xuICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzExMik7IH1cbiAgICB9XG5cbiAgICByZXR1cm4gczA7XG4gIH1cblxuICBmdW5jdGlvbiBwZWckcGFyc2V3cygpIHtcbiAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0O1xuXG4gICAgaWYgKHBlZyRjMTEzLnRlc3QoaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKSkpIHtcbiAgICAgIHMwID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMTQpOyB9XG4gICAgfVxuICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgIHMxID0gcGVnJGN1cnJQb3M7XG4gICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDM1KSB7XG4gICAgICAgIHMyID0gcGVnJGMxMTU7XG4gICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMTYpOyB9XG4gICAgICB9XG4gICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgczMgPSBbXTtcbiAgICAgICAgaWYgKHBlZyRjMzIudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgIHM0ID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHM0ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMzMpOyB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczMucHVzaChzNCk7XG4gICAgICAgICAgaWYgKHBlZyRjMzIudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgICAgczQgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczQgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzMzKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMiA9IFtzMiwgczNdO1xuICAgICAgICAgIHMxID0gczI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMTtcbiAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBlZyRjdXJyUG9zID0gczE7XG4gICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgIH1cbiAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICBwZWckc2F2ZWRQb3MgPSBzMDtcbiAgICAgICAgczEgPSBwZWckYzMxKCk7XG4gICAgICB9XG4gICAgICBzMCA9IHMxO1xuICAgIH1cblxuICAgIHJldHVybiBzMDtcbiAgfVxuXG4gIHBlZyRyZXN1bHQgPSBwZWckc3RhcnRSdWxlRnVuY3Rpb24oKTtcblxuICBpZiAocGVnJHJlc3VsdCAhPT0gcGVnJEZBSUxFRCAmJiBwZWckY3VyclBvcyA9PT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHBlZyRyZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBlZyRyZXN1bHQgIT09IHBlZyRGQUlMRUQgJiYgcGVnJGN1cnJQb3MgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIHBlZyRmYWlsKHBlZyRlbmRFeHBlY3RhdGlvbigpKTtcbiAgICB9XG5cbiAgICB0aHJvdyBwZWckYnVpbGRTdHJ1Y3R1cmVkRXJyb3IoXG4gICAgICBwZWckbWF4RmFpbEV4cGVjdGVkLFxuICAgICAgcGVnJG1heEZhaWxQb3MgPCBpbnB1dC5sZW5ndGggPyBpbnB1dC5jaGFyQXQocGVnJG1heEZhaWxQb3MpIDogbnVsbCxcbiAgICAgIHBlZyRtYXhGYWlsUG9zIDwgaW5wdXQubGVuZ3RoXG4gICAgICAgID8gcGVnJGNvbXB1dGVMb2NhdGlvbihwZWckbWF4RmFpbFBvcywgcGVnJG1heEZhaWxQb3MgKyAxKVxuICAgICAgICA6IHBlZyRjb21wdXRlTG9jYXRpb24ocGVnJG1heEZhaWxQb3MsIHBlZyRtYXhGYWlsUG9zKVxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFN5bnRheEVycm9yOiBwZWckU3ludGF4RXJyb3IsXG4gIHBhcnNlOiAgICAgICBwZWckcGFyc2Vcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhcnNlci5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9