const coin = (function () {
    const { byQuery, prepare } = dom

    const positionTable: string[] = []
    for (let y = 0; y >= -400; y -= 40) {
        for (let x = 0; x >= -400; x -= 40) {
            const value = `${x}px ${y}px`
            // console.log('%c value:', 'background: #ffcc00; color: #003300', value)
            positionTable.push(value)
        }
    }
    const allFrameNum = positionTable.length - 1

    const set = () => {
        const data = {
            x: 0,
            y: 0,
        }

        let elem: HTMLElement
        // let frame = (Math.floor(Math.random() * allFrameNum))
        let frame = 0

        let updateFunc: () => void

        const init = (x: number, y: number) => {
            data.x = x
            data.y = y

            const body = byQuery('body')

            elem = prepare('div', {
                id: 'coin',
                classes: ['coin'],
                position: data
            })
            prepare(body, {
                children: [elem]
            })
        }

        const update = (callback: () => void) => {
            updateFunc = () => {
                frame++
                if (frame > allFrameNum) frame = 0
                elem.style.backgroundPosition = positionTable[frame]
                elem.style.left = `${data.x}px`
                elem.style.top = `${data.y}px`

                callback()
            }

            game.addUpdate(updateFunc)
        }

        const destroy = () => {
            game.removeUpdate(updateFunc)
            prepare(elem, { delete: true })
        }

        return {
            data,
            init,
            update,
            destroy,
        }
    }

    return {
        set
    }
}())