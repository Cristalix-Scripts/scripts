var config = Config.load('Coords.json');

if (!config.coordsEnabled) config.coordsEnabled = false

var coordsEnabled = config.coordsEnabled

function Coords() {
    if (coordsEnabled) {
    var x = Math.floor(Player.getPosX())
    var y = Math.floor(Player.getPosY())
    var z = Math.floor(Player.getPosZ())
    var WorldType = minecraft.getWorld().getDimension()
    var overRender = x + ' ' + y + ' ' + ' ' + z
    var netherRender = x / 8 + ' ' + '? ' + z / 8
        if (WorldType == -1) overRender = x * 8 + ' ? ' + z * 8, netherRender = x + ' ' + y + ' ' + z
             Draw.drawStringWithShadow(overRender + ' | ' + netherRender, 4, 4, 0x8c8a89)
    }
}

    Events.on(this, 'gui_overlay_render', function() {
       Coords()
    })

    Events.on(this, 'chat_send', function(event) {
        if (!event.command) return
        const args = event.message.split(' ')

        if (args[0] == '/c' || args[0] == '/coords') {
            switch (args[1]) {
                case 'toggle': {
                    event.cancelled = true
                    config.coordsEnabled = (coordsEnabled ^= true)
                    Config.save('Coords.json', config)
                    break
                }
                default:
                    break
            }
            return
        }
    })
