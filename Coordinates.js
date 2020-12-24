function Coords() {
    var x = Math.floor(Player.getPosX())
    var y = Math.floor(Player.getPosY())
    var z = Math.floor(Player.getPosZ())
    var WorldType = minecraft.getWorld().getDimension()
    var overRender = x + ' ' + y + ' ' + ' ' + z
    var netherRender = x / 8 + ' ' + '? ' + z / 8
        if (WorldType == -1) overRender = x * 8 + ' ? ' + z * 8, netherRender = x + ' ' + y + ' ' + z
             Draw.drawStringWithShadow(overRender, 4, 4, 0x34c26d)
             Draw.drawStringWithShadow(netherRender, 4, 16, 0x610916)
}

    Events.on(this, 'gui_overlay_render', function() {
       Coords()
    })