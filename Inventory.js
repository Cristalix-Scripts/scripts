var config = Config.load('Inventory');

if (!config.isInventorySee) config.isInventorySee = true

var isInventorySee = config.isInventorySee

function render() {
    if (isInventorySee) {
        Draw.drawRect(38, 0, 204, 56, 0x4C000000)
        RenderHelper.enableGUIStandardItemLighting();
        for (var i = 9; i < 35; i++) {
            let item = Inventory.getStackInSlot(i)
            let amount = Inventory.getCount(i)
            let y = -18 + Math.floor(i / 9) * 18
            let x = 40 + (i % 9) * 18
            Draw.renderItemAndEffectIntoGUI(item, x, y)
            Draw.renderItemOverlayIntoGUI(item, x, y, amount == 1 ? "" : amount)
        }
    }
}

Events.on(this, "gui_overlay_render", function () {
    render()
})

Events.on(this, 'chat_send', function (event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] == '/inv' || args[0] == '/inventory') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.isInventorySee = (isInventorySee ^= true)
                Config.save('Inventory', config)
                break
            }
            default:
                break
        }
        return
    }
})