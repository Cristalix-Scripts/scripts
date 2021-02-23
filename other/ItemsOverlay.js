(function (self) {
    var nickname = Player.getName()
    var config = Config.load(nickname + ' itemsOverlay.json');


    if (!config.itemsInfoEnabled) config.itemsInfoEnabled = false

    var itemsInfoEnabled = config.itemsInfoEnabled

    function saveConfig() { 
        Config.save(nickname + ' itemsOverlay.json', config) 
      }

	function sendMessage(message) {
  	ingameGUI.printChatMessage(message)
	}

    function renderAmountItems() {
	RenderHelper.enableGUIStandardItemLighting();
        if (itemsInfoEnabled) {
            const res = Draw.getResolution()
            const height = res.getScaledHeight()
            var activeSlot = Inventory.getActiveSlot()
            var item = Inventory.getStackInSlot(activeSlot)
            var amount = Inventory.getCount(activeSlot)
	        var resolution = Draw.getResolution();
	        var x = resolution.getScaledWidth() / 2 - 10
            if (amount > 1 && amount <= 64) {
            Draw.renderItemAndEffectIntoGUI(item, x, height - 53)
            Draw.renderItemOverlayIntoGUI(item, x, height - 53, amount)
            }
        }
    }

    Events.on(self, "gui_overlay_render", function () {
        renderAmountItems()
    })

    Events.on(this, 'chat_send', function (event) {
        if (!event.command) return
        const args = event.message.split(' ')
    
        if (args[0] == '/i' || args[0] == '/items') {
            switch (args[1]) {
            case 'toggle': {
                event.cancelled = true
                config.itemsInfoEnabled = (itemsInfoEnabled ^= true)
                Config.save(nickname + ' Inventory.json', config)
	            sendMessage('§fItems Info: ' + (itemsInfoEnabled ? '§aenabled' : '§cdisabled') + '.')
                break
               }
            default:
                break
            }
            return
        }
    })
    })(this);