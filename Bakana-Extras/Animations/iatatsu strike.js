//Last Updated: 4/20/2023
//Author: EskieMoh#2969

async function create(token, target, {deleteTarget, teleport, cameraFocus} = {deleteTarget: false, teleport: false, cameraFocus: true }) {
    const style = {
        "fill": "0xFFFFFF",
        "fontFamily": "Helvetica",
        "fontSize": 106,
        "strokeThickness": 0,
        fontWeight: "bold",

    }

    //let position;

    if( teleport == true){

    let config = {
        size:1,
        icon: 'icons/skills/melee/blade-tip-orange.webp',
        label: 'Iaijutsu Strike',
        tag: 'katana lol',
        t: 'line',
        drawIcon: true,
        drawOutline: true,
        interval:-1,
    rememberControlled: true,
    }
    //position = await warpgate.crosshairs.show(config);
    }

    //
    const deltaX = target.x - token.x;
    const deltaY = token.y - target.y;

    const angleRad = Math.atan2(deltaY, deltaX);

    const angleDeg = angleRad * 180 / Math.PI;

    await new Sequence()

    //Camera Focus
    new Sequence()

    .thenDo(function(){
    if( cameraFocus == true){    
    canvas.animatePan({duration: 250, x: target.center.x, y: target.center.y, scale: 0.6})

    new Sequence()

    .effect()
    .name("TopBar")
    .screenSpace()
    .screenSpacePosition({ x: 0, y: 0 })
    .screenSpaceAnchor({ x: -1, y: -0.025 })
    .shape("rectangle", {
                lineSize: 1,
                lineColor: "0x000000",
                fillColor: "0x000000",
                width: 100,
                height: 350, 
                fillAlpha: 1,
                gridUnits: false,
                isMask:false,
                name: "test1"
            })
    .screenSpaceScale({fitX: true})
    .animateProperty("shapes.test1", "position.y", { from: -1, to: 0, duration: 500, gridUnits: true, ease:"easeOutCubic"})
    .animateProperty("shapes.test1", "position.y", { from: 0, to: -1, duration: 500, gridUnits: true, ease:"easeOutCubic", fromEnd: true})
    .persist()

    .effect()
    .name("BottomBar")
    .screenSpace()
    .screenSpacePosition({ x: 0, y: 0 })
    .screenSpaceAnchor({ x: -1, y: 0.75 })
    .shape("rectangle", {
                lineSize: 1,
                lineColor: "0x000000",
                fillColor: "0x000000",
                width: 100,
                height: 350, 
                fillAlpha: 1,
                gridUnits: false,
                isMask:false,
                name: "test2"
            })
    .screenSpaceScale({fitX: true})
    .animateProperty("shapes.test2", "position.y", { from: 0, to: -1, duration: 500, gridUnits: true, ease:"easeOutCubic"})
    .animateProperty("shapes.test2", "position.y", { from: 0, to: 1, duration: 500, gridUnits: true, ease:"easeOutCubic", fromEnd: true})
    .persist()

    .play()

    }    
    })

    .effect()
    .file("animated-spell-effects-cartoon.level 01.bless.blue")
    .scaleToObject(0.75)
    .atLocation(token, {offset: {x:0.25, y:0.25}, gridUnits: true})
    .scaleIn(0, 500, {ease: "easeOutCubic"})
    .rotateIn(-180, 500, {ease: "easeOutCubic"})
    .filter("ColorMatrix", { saturate: -1, brightness: 1.2 })
    .aboveLighting()
    .waitUntilFinished()

    .wait(500)

    .effect()
    .file(canvas.scene.background.src)
    .filter("ColorMatrix", { brightness: 0.3})
    .atLocation({x:(canvas.dimensions.width)/2,y:(canvas.dimensions.height)/2})
    .size({width:canvas.scene.width/canvas.grid.size, height:canvas.scene.height/canvas.grid.size}, {gridUnits: true})
    .duration(3000)
    .fadeIn(500)
    .fadeOut(500)
    .belowTokens()

    .effect()
    .file("animated-spell-effects-cartoon.magic.mind sliver")
    .attachTo(target)
    .rotate(angleDeg)
    .filter("ColorMatrix", { saturate: -1,brightness:1 })
    .size({width:8, height:1}, {gridUnits:true})
    .scaleOut(0, 600, {ease: "easeOutCubic"})
    .aboveLighting()

    .thenDo(function(){

    if( teleport == true){

    /*new Sequence()
    .animation()
    .on(token)
    .teleportTo(position)
    .snapToGrid()
    .offset({ x: -1, y: -1 })

    .play()*/
    }

    })

    .wait(500)

    .effect()
    .atLocation(target, {offset: {x: -1.5, y:-0.8}, gridUnits: true})
    .text("居", style)
    .duration(2600)
    .fadeOut(250)
    .delay(200)
    .aboveLighting()
    .zIndex(1)

    .effect()
    .atLocation(target, {offset: { y:-0.8}, gridUnits: true})
    .text("合", style)
    .duration(2400)
    .fadeOut(250)
    .delay(400)
    .aboveLighting()
    .zIndex(1)

    .effect()
    .atLocation(target, {offset: {x: 1.5, y:-0.8}, gridUnits: true})
    .text("術", style)
    .duration(2200)
    .fadeOut(250)
    .delay(600)
    .aboveLighting()
    .zIndex(1)
    .waitUntilFinished()

    .thenDo(function(){

    if( deleteTarget == true){

    new Sequence()

    .animation()
    .on(target)
    .opacity(0)

    .effect()
    .from(target)
    .name(`${target.name}Top`)
    .scaleToObject(target.document.texture.scaleX)
    .attachTo(target)
    .shape("polygon", {
                lineSize: 1,
                lineColor: "0xFF0000",
                fillColor: "0xFF0000",
    points: [{ x: -1, y: -1},{ x: 1, y: 1},{ x: 1, y: -1} ],
                fillAlpha: 1,
                gridUnits: true,
                isMask:true,
                name: "test"
            })
    .moveTowards({ x: target.x+canvas.grid.size*target.document.width+0.1, y: target.y+canvas.grid.size*target.document.width+0.1 },{ rotate: false})
    .moveSpeed(100)
    .persist()
    .extraEndDuration(1000)
    .fadeOut(1000)

    .effect()
    .from(target)
    .name(`${target.name}Bottom`)
    .scaleToObject(target.document.texture.scaleX)
    .attachTo(target)
    .shape("polygon", {
                lineSize: 1,
                lineColor: "0xFF0000",
                fillColor: "0xFF0000",
    points: [{ x: -1, y: -1},{ x: 1, y: 1},{ x: -1, y: 1} ],
                fillAlpha: 1,
                gridUnits: true,
                isMask:true,
                name: "test"
            })
    .zIndex(0.1)
    .persist()
    .fadeOut(500)

    .effect()
    .file("jb2a.water_splash.cone.01.red")
    .atLocation(target, {offset: {x:0.1,y:-0.1}, gridUnits: true})
    .delay(250)
    .fadeIn(200)
    .scaleToObject()
    .zIndex(0)
    .fadeOut(500)
    .rotate(45)

    //.wait(1500)

    //.thenDo(function(){

    //Sequencer.EffectManager.endEffects({ name: `${target.name}Top` })

    //})

    //.wait(4000)

    //.thenDo(function(){
    //Sequencer.EffectManager.endEffects({ name: `${target.name}Bottom` })
    //})

    //.wait(500)

    //.thenDo(function(){
    //target.document.delete();
    //})

    .play()
    }
    })

    .wait(500)

    .thenDo(function(){

    Sequencer.EffectManager.endEffects({ name: `TopBar` })
    Sequencer.EffectManager.endEffects({ name: `BottomBar` })

    })

    .play()
}