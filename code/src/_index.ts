(function () {

    getStorage().then((store) => {
        core.store = store

        setConsole()


        const NUM_OF_FRAMES_COIN_IS_CREATED = 5
        const ROWS_OF_COINS = 20
        const ROW_WIDTH = 50
        const COINS_START_Y = 20
        const COIN_DESIPERE_AFTER = 900

        const coinsEndY = COIN_DESIPERE_AFTER + COINS_START_Y

        const createRandomCoin = () => {
            const oneCoin = coin.set()

            const x = (Math.floor(Math.random() * ROWS_OF_COINS) + 1) * ROW_WIDTH
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