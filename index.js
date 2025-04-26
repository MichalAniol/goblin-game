const setConsole = () => (function () {
    let styles = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 30px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 24px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c👉Goblin Game👈', styles);
    let styles2 = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 18px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 16px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c   𝒂𝒖𝒕𝒐𝒓: 𝐌𝐢𝐜𝐡𝐚𝐥 𝐀𝐧𝐢𝐨𝐥 😎   ', styles2);
}());
const checked = {
    yes: 'yes',
    no: 'no',
};
const getStorage = async () => {
    const names = {
        test: 'test',
    };
    const defaultData = {
        test: 'test-test',
    };
    const isValidJSONStringify = (str) => {
        try {
            JSON.stringify(str);
            return true;
        }
        catch {
            return false;
        }
    };
    const set = (key, value) => {
        if (isValidJSONStringify(value)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, value.toString());
        }
    };
    const isValidJSONParse = (str) => {
        try {
            JSON.stringify(str);
            return true;
        }
        catch {
            return false;
        }
    };
    const get = (key) => {
        const value = localStorage.getItem(key);
        if (!value)
            return null;
        if (typeof value === 'boolean')
            return `${value}`;
        if (isValidJSONParse(value)) {
            return JSON.parse(value);
        }
        else {
            return value.toString();
        }
    };
    const initData = () => {
        const list = Object.keys(names);
        list.forEach((k) => {
            const data = get(k);
            if (!data && defaultData[k])
                set(k, defaultData[k]);
        });
    };
    initData();
    return {
        names,
        set,
        get,
    };
};
const dom = (function () {
    const byId = (name) => document.getElementById(name);
    const byQuery = (query) => document.querySelector(query);
    const byQueryAll = (query) => document.querySelectorAll(query);
    const byQ = (elem, query) => elem.querySelector(query);
    const byQAll = (elem, query) => elem.querySelectorAll(query);
    const prepare = (node, options) => {
        const elem = typeof node === "string" ? document.createElement(node) : node;
        if (elem && elem instanceof HTMLElement) {
            if (options.delete) {
                elem.remove();
                return;
            }
            if (options?.id)
                elem.id = options.id;
            options?.classes?.forEach((c) => elem.classList.add(c));
            options?.children?.forEach((c) => elem.appendChild(c));
            if (options?.src && elem instanceof HTMLImageElement) {
                elem.src = options.src;
            }
            if (options?.inner) {
                elem.textContent = options.inner;
            }
            if (options?.position) {
                elem.style.left = `${options.position.x}px`;
                elem.style.top = `${options.position.y}px`;
            }
            return elem;
        }
    };
    const setStyle = (element, style, value) => element.style[style] = value;
    const setAllStyles = (styles) => styles.forEach((s) => setStyle(s[0], s[1], s[2]));
    const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);
    const setAllAttributes = (attributes) => attributes.forEach((a) => a[0].setAttribute(a[1], a[2]));
    const disable = (elem) => elem.setAttribute('disabled', '');
    const enable = (elem) => elem.removeAttribute('disabled');
    const check = (elem) => elem.checked = true;
    const uncheck = (elem) => elem.checked = false;
    const display = (elem, attribute) => elem.style.display = attribute;
    const setColor = (elem, color) => elem.style.color = color;
    const removeClass = (elem, attribute) => elem.classList.remove(attribute);
    const addClass = (elem, attribute) => elem.classList.add(attribute);
    const colors = {
        line: 'var(--line_color)',
        prime: 'var(--prime_color)',
        off1: 'var(--off_prime_color)',
        off2: 'var(--off_second_color)',
    };
    const add = (elem, name, fn) => elem.addEventListener(name, fn);
    const xmlns = 'http://www.w3.org/2000/svg';
    const newNS = (name) => document.createElementNS(xmlns, 'rect');
    return {
        byId,
        byQuery,
        byQueryAll,
        byQ,
        byQAll,
        prepare,
        setStyle,
        setAllStyles,
        setAttribute,
        setAllAttributes,
        disable,
        enable,
        check,
        uncheck,
        display,
        setColor,
        removeClass,
        addClass,
        colors,
        add,
        newNS,
    };
}());
const core = {
    store: null,
};
const game = (function () {
    const FRAME_LENGTH = 16;
    let tick;
    let ticks = 0;
    let updates = [];
    const start = () => {
        tick = setInterval(() => {
            updates.forEach(f => f());
            ticks++;
        }, FRAME_LENGTH);
    };
    const addUpdate = (update) => updates.push(update);
    const removeUpdate = (update) => {
        const newUpdates = updates.filter(u => u !== update);
        updates = newUpdates;
    };
    const getTicks = () => ticks;
    return {
        start,
        addUpdate,
        removeUpdate,
        getTicks,
    };
}());
const coin = (function () {
    const { byQuery, prepare } = dom;
    const positionTable = [];
    for (let y = 0; y >= -400; y -= 40) {
        for (let x = 0; x >= -400; x -= 40) {
            const value = `${x}px ${y}px`;
            positionTable.push(value);
        }
    }
    const allFrameNum = positionTable.length - 1;
    const set = () => {
        const data = {
            x: 0,
            y: 0,
        };
        let elem;
        let frame = 0;
        let updateFunc;
        const init = (x, y) => {
            data.x = x;
            data.y = y;
            const body = byQuery('body');
            elem = prepare('div', {
                id: 'coin',
                classes: ['coin'],
                position: data
            });
            prepare(body, {
                children: [elem]
            });
        };
        const update = (callback) => {
            updateFunc = () => {
                frame++;
                if (frame > allFrameNum)
                    frame = 0;
                elem.style.backgroundPosition = positionTable[frame];
                elem.style.left = `${data.x}px`;
                elem.style.top = `${data.y}px`;
                callback();
            };
            game.addUpdate(updateFunc);
        };
        const destroy = () => {
            game.removeUpdate(updateFunc);
            prepare(elem, { delete: true });
        };
        return {
            data,
            init,
            update,
            destroy,
        };
    };
    return {
        set
    };
}());
(function () {
    getStorage().then((store) => {
        core.store = store;
        setConsole();
        const NUM_OF_FRAMES_COIN_IS_CREATED = 5;
        const COLUMNS_OF_COINS = 20;
        const COLUMN_WIDTH = 50;
        const COINS_START_Y = 20;
        const COIN_DESIPERE_AFTER = 900;
        const coinsEndY = COIN_DESIPERE_AFTER + COINS_START_Y;
        let columnsPos = [];
        const setColumnsPos = () => {
            for (let i = 1; i < COLUMNS_OF_COINS + 1; ++i) {
                columnsPos.push(i * COLUMN_WIDTH);
            }
        };
        setColumnsPos();
        const getOneOfColumnsPos = () => {
            const index = (Math.floor(Math.random() * columnsPos.length));
            const result = columnsPos[index];
            columnsPos.splice(index, 1);
            if (columnsPos.length === 0)
                setColumnsPos();
            return result;
        };
        const createRandomCoin = () => {
            const oneCoin = coin.set();
            const x = getOneOfColumnsPos();
            oneCoin.init(x, COINS_START_Y);
            oneCoin.update(() => {
                oneCoin.data.y++;
                if (oneCoin.data.y > coinsEndY)
                    oneCoin.destroy();
            });
        };
        const addNewCoin = () => {
            const tick = game.getTicks();
            if (tick % NUM_OF_FRAMES_COIN_IS_CREATED === 0)
                createRandomCoin();
        };
        game.addUpdate(addNewCoin);
        game.start();
    });
}());
