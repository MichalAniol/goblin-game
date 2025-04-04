(function () {
    getStorage().then((store) => {
        core.store = store

        setConsole()


        const NUM_OF_FRAMES_COIN_IS_CREATED = 5
        const COLUMNS_OF_COINS = 20
        const COLUMN_WIDTH = 50
        const COINS_START_Y = 20
        const COIN_DESIPERE_AFTER = 900

        const coinsEndY = COIN_DESIPERE_AFTER + COINS_START_Y

        let columnsPos: number[] = []
        const setColumnsPos = () => {
            for (let i = 1; i < COLUMNS_OF_COINS + 1; ++i) {
                columnsPos.push(i * COLUMN_WIDTH)
            }
        }
        setColumnsPos()

        const getOneOfColumnsPos = () => {
            const index = (Math.floor(Math.random() * columnsPos.length))
            const result = columnsPos[index]
            columnsPos.splice(index, 1)
            if (columnsPos.length === 0) setColumnsPos()
            return result
        }

        const createRandomCoin = () => {
            const oneCoin = coin.set()

            // const x = (Math.floor(Math.random() * COLUMNS_OF_COINS) + 1) * COLUMN_WIDTH
            const x = getOneOfColumnsPos()
            oneCoin.init(x, COINS_START_Y)

            oneCoin.update(() => {
                oneCoin.data.y++
                if (oneCoin.data.y > coinsEndY) oneCoin.destroy()
            })
        }

        const addNewCoin = () => {
            const tick = game.getTicks()
            if (tick % NUM_OF_FRAMES_COIN_IS_CREATED === 0) createRandomCoin()
        }

        game.addUpdate(addNewCoin)

        game.start()
    })
}())