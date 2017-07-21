const css = `
    * { font-family: monospace; }
    div {
        min-height: 1em;
        margin-bottom: 5px;
    }
`;

let actualMain: any = null;

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
    trash.forEach(child=>document.body.removeChild(child));

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

export function wrapmain(main: any) {
    actualMain = main;
    return () => {
        addCss(css);
        createReplayButton();
        main();
    };
}

function addCss(css: string) {
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}

function delay(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    });
}

export function input(msg: string = ""): Promise<string|number> {
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.innerText = msg;
    div.appendChild(span);
    let elem = document.createElement("input");
    elem.setAttribute("type", "text");
    div.appendChild(elem);
    document.body.appendChild(div);
    elem.focus();
    return new Promise<string|number>(resolve => {
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

export function print(msg: any = "") {
    let s = String(msg);
    if (s.trim() === "") s += " ";
    let elem = document.createElement("div");
    elem.innerText = s;
    document.body.appendChild(elem);
}