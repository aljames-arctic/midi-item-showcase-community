// Animation by @tranquillite
async function create(token, {id}) {
    const gridSize = canvas.grid.size;
    new Sequence()
        .animation()
        .delay(75)
        .on(token)
        .opacity(0)

        ///////////////////////////////////////////////////////
        // magic circle
        ///////////////////////////////////////////////////////
        .effect()
        .fadeIn(500)
        .fadeOut(500)
        .attachTo(token, {bindAlpha: false})
        .file("jb2a.bless.200px.loop.blue")
        .atLocation(token)
        .scaleToObject(2)
        .name(id)
        .tint("#00b3ff")
        .persist()

        ///////////////////////////////////////////////////////
        // upward gust of air
        ///////////////////////////////////////////////////////
        .effect()
        .fadeIn(500)
        .fadeOut(500)
        .attachTo(token, {bindAlpha: false})
        .file("jb2a.wind_stream.200.white")
        .atLocation(token)
        .rotate(90)
        .tint("#00b3ff")
        .name(id)
        .scaleToObject(1)
        .belowTokens()
        .persist()


        ///////////////////////////////////////////////////////
        // floating token
        ///////////////////////////////////////////////////////
        .effect()
        .from(token)
        .fadeIn(500)
        .fadeOut(500)
        .attachTo(token, {bindAlpha: false})
        .animateProperty("sprite", "position.y", { from: 0, to: -0.6, duration: 2000, gridUnits: true, ease: "easeOutCubic" })
        .loopProperty("sprite", "rotation", {from: -10, to: 10, duration: 1100, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "position.x", {from: -gridSize/9, to: gridSize/9, duration: 2000, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "position.y", {from: -gridSize/9, to: gridSize/9, duration: 3000, pingPong: true, ease: "easeInOutSine" })
        .name(id)
        .persist()

        ////////////////////////////////////////////////////////
        // circle
        ///////////////////////////////////////////////////////
        .effect()
        .from(token)
        .fadeIn(500)
        .fadeOut(500)
        .attachTo(token, {bindAlpha: false})
        .file("jb2a.token_border.circle.static.blue.012")
        .scaleToObject(2)
        .belowTokens()
        .name(id)
        .animateProperty("sprite", "position.y", { from: 0, to: -0.6, duration: 2000, gridUnits: true, ease: "easeOutCubic" })
        .loopProperty("sprite", "rotation", {from: -10, to: 10, duration: 1100, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "position.x", {from: -gridSize/9, to: gridSize/9, duration: 2000, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "position.y", {from: -gridSize/9, to: gridSize/9, duration: 3000, pingPong: true, ease: "easeInOutSine" })

        .persist()
        .play()
}

async function destroy(token, {id}) {
    new Sequence()
        .animation()
        .delay(75)
        .fadeIn(500)
        .fadeOut(500)
        .on(token)
        .opacity(1)
        .wait(50)
        .thenDo(function(){ 
            Sequencer.EffectManager.endEffects({ name: id }); 
        })
        .play();
}

export const levitate = {
    create: create, 
    destroy: destroy
};