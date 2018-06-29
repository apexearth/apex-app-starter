const {
    App,
    AppObject,
    createRenderer,
    PIXI,
    setting,
    properties,
    property
} = require('apex-app')

// Extend App
// Initialize with a single AppObject drawn as a white square.
class Game extends App {
    constructor() {
        super()
        let obj = new AppObject({app: this, parent: this})
        obj.graphics.beginFill(0xffffff, 1)
        obj.graphics.drawRect(0, 0, 10, 10)
        obj.graphics.endFill()
        this.add(obj)

        this.mapping = this.createInputMapping({
            keyboard: {
                'createObject': 'A'
            }
        })
    }

    update(seconds) {
        super.update(seconds)
        if (this.mapping.value('createObject')) {
            let obj = new AppObject({app: this, parent: this})
            obj.graphics.beginFill(0xffffff, 1)
            obj.graphics.drawRect(Math.random() * 500 - 250, Math.random() * 500 - 250, 10, 10)
            obj.graphics.endFill()
            this.add(obj)
        }
    }
}

// Create renderer and attach canvas to `document.body`.
createRenderer(new Game(), {
    rendererOptions: {
        backgroundColor: 0x333333
    }
})