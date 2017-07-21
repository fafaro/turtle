import * as c from './console';
import { Turtle } from './turtle';

window.onload = c.wrapmain(main);
const input = c.input;
const print = c.print;

function fact(i): number {
    let result = 1;
    for (let j = 1; j <= i; j++)
        result *= j;
    return result;
}

async function main() {
    let t = new Turtle();
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
}

