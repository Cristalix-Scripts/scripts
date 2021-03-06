(function (self) {
var nickname = Player.getName()
var config = Config.load(nickname + ' Inventory.json');
var i = 9

if (!config.isInventorySee) config.isInventorySee = true
if (!config.x) config.x = 4;
if (!config.y) config.y = 4;

var inventorySee = config.inventorySee

function render(i, x, y) {
    if (inventorySee) {
        RenderHelper.enableGUIStandardItemLighting();
        for (i; i < 36; i++) {
            let item = Inventory.getStackInSlot(i)
            let amount = Inventory.getCount(i)
            Draw.renderItemAndEffectIntoGUI(item, x + (40 + (i % 9) * 18), y + (-18 + Math.floor(i / 9) * 18))
            Draw.renderItemOverlayIntoGUI(item, x + (40 + (i % 9) * 18), y + (-18 + Math.floor(i / 9) * 18), amount == 1 ? "" : amount)
        }
    }
}

Events.on(self, "gui_overlay_render", function () {
    var startX = config.x;
    var startY = config.y;
    render(i, startX, startY)
})

Events.on(self, 'game_loop', function () {
    if (!Mouse.isGrabbed() && Mouse.isButtonDown(0)) {
        // TODO deprecated, add minecraft.getResolution()
        var resolution = Draw.getResolution();
        var x = Mouse.getMouseX(resolution);
        var y = Mouse.getMouseY(resolution);
        var startX = config.x;
        var startY = config.y;
        if (x >= startX - 34 && x <= startX + 34 && y >= startY - 34 && y <= startY + 34) {
            config.x = x;
            config.y = y - 8;
        }
    }
});

Events.on(this, 'chat_send', function (event) {
    if (!event.command) return
    const args = event.message.split(' ')

    if (args[0] == '/inv' || args[0] == '/inventory') {
        switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.inventorySee = (inventorySee ^= true)
                Config.save(nickname + ' Inventory.json', config)
                break
            }
            default:
                break
        }
        return
    }
})
})(this);
