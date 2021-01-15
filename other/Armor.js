(function (self) {
    var nickname = Player.getName()
    var config = Config.load(nickname + ' Armor.json');

    if (!config.armorEnabled) config.armorEnabled = false
    if (!config.x) config.x = 4;
    if (!config.y) config.y = 4;

    var armorEnabled = config.armorEnabled

    function drawArmor(slot, x, y) {
        if (armorEnabled) {
	    RenderHelper.enableGUIStandardItemLighting();
            let inv = minecraft.getPlayer().getInventory()
            let item = inv.armorItemInSlot(slot)
            let amount = item.getCount()
            let damage = item.getItemDamage()
            let maxDamage = item.getMaxDamage()

            Draw.renderItemAndEffectIntoGUI(item, x, y + 5)
            Draw.drawStringWithShadow((damage == maxDamage || damage == 0) ? '' : maxDamage - damage, x + 16, y + 9)
            Draw.renderItemOverlayIntoGUI(item, x, y + 5, amount == 1 ? '' : amount)
        }
    }

    Events.on(self, "gui_overlay_render", function() {
        var startX = config.x;
        var startY = config.y;
        drawArmor(3, startX, startY)
        drawArmor(2, startX, startY + 16)
        drawArmor(1, startX, startY + 32)
        drawArmor(0, startX, startY + 48)
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

    Events.on(self, 'chat_send', function(event) {
        if (!event.command) return
        const args = event.message.split(' ')

        if (args[0] == '/arm' || args[0] == '/armor') {
            switch (args[1]) {
                case 'toggle': {
                    event.cancelled = true
                    config.armorEnabled = (armorEnabled ^= true)
                    Config.save(nickname + ' Armor.json', config)
                    break
                }
                default:
                    break
            }
            return
        }
    })
})(this);
