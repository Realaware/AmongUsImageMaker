const Discord = require("discord.js")
const Client = new Discord.Client()
const Jimp = require("jimp")

const Prefix = ";"

Client.once("ready" , () => {
    console.log("Bot Ready ,")
})

async function MakeImage(text) {
    Jimp.read("./asset/Base.png", async (err,val) => {
        if (err) throw err
        Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(async font => {
           val.print(font,0,0,{
            text: text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          },val.getWidth(),val.getHeight())
           await val.writeAsync("./result.png")
        })
    })
}

Client.on("message",async msg => {
    if (msg.content.startsWith(`${Prefix}ejected`)) {
        var random = Math.floor(Math.random() * 2 )
        var Text = msg.content.split(`${Prefix}ejected`)[1]

        if (random == 0) {
           await MakeImage(`${Text} was not The Impostor`)
        } else {
           await MakeImage(`${Text} was The Impostor`)
        }

        setTimeout(() => {
            msg.channel.send(new Discord.MessageAttachment("./result.png"))
        },300)
    }
})

Client.login("")
