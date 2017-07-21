import { parse, SyntaxError as pegSyntaxError } from './parser';

function vecAdd(a, b) {
    return {x:a.x+b.x, y:a.y+b.y};
}

function vecMul(a, b) {
    return {x:a.x * b, y:a.y * b};
}

function vecAvg(a, b) {
    return vecMul(vecAdd(a, b), 0.5);
}

/** 
 * Turtle class for drawing cool pictures. 
 * @example let t = new Turtle();
*/
export class Turtle {
    private _divElem = HTMLDivElement = null;
    private _elem: HTMLCanvasElement = null;
    private _overlayElem: HTMLCanvasElement = null;
    private _ctx: CanvasRenderingContext2D = null;
    private _overlayCtx: CanvasRenderingContext2D = null;
    private _pos = {x:0, y:0};
    private _dirAngle = 0;
    private _penDown = true;
    private _width = 0;
    private _height = 0;
    private _color: string = "black";
    private _penWidth: number = 1;
    private _showTurtle: boolean = true;
    private _consoleVisible: boolean = false;
    private _consoleElem: HTMLTextAreaElement = null;
    private _liveMode: boolean = false;
    private _interactiveMode: boolean = false;
    private _posStack = [];

    /**
     * Creates a canvas and initializes the turtle at the center.
     * @param width Width of the canvas.
     * @param height Height of the canvas.
     */
    constructor(width: number = 320, height: number = 320) {
        this._width = width;
        this._height = height;

        let divElem = document.createElement('div');
        divElem.style.display = 'inline-block';
        divElem.style.width = String(width);
        divElem.style.height = String(height);
        divElem.style.border = "1px solid black";
        divElem.style.backgroundColor = 'white';
        divElem.style.position = "relative";
        divElem.style.display = 'inline-flex'
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
        consoleElem.setAttribute('autocapitalize','none');
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
            if (!this._liveMode) return;
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
        this._pos = {x: width / 2, y: height / 2};

        //this._ctx.imageSmoothingEnabled = true;
        //this._ctx.setTransform(1, 0, 0, -1, width / 2, height / 2);

        //this._overlayElem.style['mix-blend-mode'] = 'exclusion';
        //this._overlayCtx.moveTo(0, 0);
        //this._overlayCtx.lineTo(100, 100);
        //this._overlayCtx.stroke();
        setInterval(this.drawTurtle.bind(this), 100);

        let fsBtn = document.createElement('button');
        fsBtn.innerText = "fullscreen";
        fsBtn.addEventListener('click', e=> {
            //console.log(document.webkitFullscreenElement);
            if (document.webkitFullscreenElement === null)
                this._divElem.webkitRequestFullscreen();
            else
                document.webkitExitFullscreen();
        });
        this._divElem.appendChild(fsBtn);
        this.clear();
    }

    command(input: string) {
        if (input[0] === '#') return;
        let tokens = input.toUpperCase().split(' ').filter(t => t);
        if (tokens.length == 0) return;
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

    execute(script: string) {
        //console.log(["Parsing:", script]);
        script += "\n";

        let frame = new class {
            private frame = {};
            private procs = {};
            public setVar(name: string, val: number) {
                this.frame[name] = val;
            }
            public getVar(name: string): number {
                return this.frame[name];
            }
            public setProc(name: string, params: string[], body: any[]) {
                this.procs[name] = {name: name, params:params, body:body};
            }

            public getProc(name: string) {
                return this.procs[name];
            }

            public get values() { return this.frame; }
        };

        let execBody: (stats:any)=>void = null;

        let assert = (cond: boolean, msg: string = "") => {
            if (!cond) throw SyntaxError(msg);
        };
        let evalExpr: (expr:any)=>number = null;
        let evalFunc = (func: string, params: any):number => {
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
        evalExpr = (expr):number => {
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
            else console.log(['Cant evaluate', expr]);
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
        let execRepeat = (count: number|string, body: any) => {
            let actualCount: number = 0;
            if (typeof count === 'string') {
                actualCount = frame.getVar(count as string);
            }
            else
                actualCount = count as number;
            for (let i = 0; i < actualCount; i++)
                execBody(body);
        };
        let execLet = (ident: string, val: number) => {
            frame.setVar(ident, val);
            //console.log(frame.values);
        };
        let execAssign = (ident: string, val: number) => {
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
            case 'Expression:Call': {
                console.log(s);
                console.log(frame.getProc(s.func));
                let proc = frame.getProc(s.func);
                if (!proc) return;
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
            let ast = parse(script);
            console.log(["ast", ast]);
            execBody(ast.statements);
        }
        catch (e) {
            console.log(e instanceof pegSyntaxError);
            console.log(e)
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

    set liveMode(value: boolean) { this._liveMode = value; }

    private _drawTurtleCache = {
        color: 0,
    };
    private drawTurtle() {
        const ctx = this._overlayCtx;
        const cache = this._drawTurtleCache;

        ctx.clearRect(0, 0, this.width, this.height);

        if (this._showTurtle) {
            let drawTurtle = (x, y, rad, angle) => {
                let xaxis = {x: Math.cos(rad), y: -Math.sin(rad)};
                let yaxis = {x: xaxis.y, y: -xaxis.x};
                let trans = (p) => {
                    return vecAdd(vecAdd(vecMul(xaxis, p.x), vecMul(yaxis, p.y)),
                    {x: x, y: y});
                };

                let pts = [
                    { x:0, y:0 },
                    { x:-10-5, y:-8 },
                    { x:-10, y:0 },
                    { x:-10-5, y:8 },
                    //{ x:10, y:0 },
                    { x:0, y:0 },
                ];
                pts.forEach(p=>{p.x+=10;});

                ctx.beginPath();
                ctx.strokeStyle = ['black', 'white', 'gray'][cache.color];
                //ctx.strokeStyle = this._color == 'black' ? 'white' : 'black';
                //ctx.ellipse(this.pos.x, this.pos.y, 10, 10, 0, 0, 360);

                for (let i = 0; i < pts.length; i++) {
                    let p = trans(pts[i]);
                    if (i == 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
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
                ctx.fillText(`X: ${Math.round(x)}, Y: ${Math.round(y)}, \u03b8: ${Math.round(angle)}\u00b0`,
                    2, 10);                
                ctx.fillText(`${this._penDown ? 'P▼' : 'P▲'}`,
                    2, 20);
            };
            drawTurtle(this.pos.x, this.pos.y, this.dirRad, this.angle);
            //cache.color = (cache.color + 1) % 2;
        }
    }

    private get dirRad() {
        return this._dirAngle * Math.PI / 180;
    }

    private get dirVec() {
        return {x:Math.cos(this.dirRad),y:-Math.sin(this.dirRad)};
    }

    /**
     * Height of the canvas.
     */
    get height() { return this._height; }

    /**
     * Width of the canvas.
     */
    get width() { return this._width; }

    screen(width: number, height: number) {
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
    set pos(value: {x:number,y:number}) {this._pos = value;}

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
        let p = (x,y)=> {return{x:x,y:y};};

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
    set color(value: string) {
        this._color = value;
    }
    get color() { return this._color; }
    hsl(hue: number): string {
        return `hsl(${hue%360}, 100%, 50%)`;
    }

    /**
     * Get or set the direction of the turtle, as degrees.
     * 
     * 0 degrees is towards the right, and then the angle moves
     * anti-clockwise i.e. 90 is towards the top etc.
     */
    get angle() { return this._dirAngle; }
    set angle(value: number) { this._dirAngle = value;}

    /**
     * Get or set the thickness of the pen.
     */
    get thickness() { return this._penWidth; }
    set thickness(value: number) { this._penWidth = value; }

    /**
     * Move forward by x pixels.
     * @param x 
     */
    forward(x: number) {
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
    left(deg: number) {
        let angle = this.angle;
        angle += deg;
        angle %= 360;
        this.angle = angle;
    }

    /**
     * Turn right.
     * @param deg Angle in degrees
     */
    right(deg: number) {
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
    update(delayms: number = 0) {
        return new Promise<void>(resolve=>
            setTimeout(resolve, delayms));        
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

    private _penStack = [];
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