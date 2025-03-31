const game = (function () {
    const FRAME_LENGTH = 16

    let tick: NodeJS.Timeout
    let ticks = 0
    let updates: (() => void)[] = []

    const start = () => {
        tick = setInterval(() => {
            updates.forEach(f => f())
            ticks++
        }, FRAME_LENGTH)
    }

    const addUpdate = (update: () => void) => updates.push(update)

    const removeUpdate = (update: () => void) => {
        const newUpdates = updates.filter(u => u !== update)
        updates = newUpdates
    }

    const getTicks = () => ticks

    return {
        start,
        addUpdate,
        removeUpdate,
        getTicks,
    }
}())