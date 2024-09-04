const targets = Array.from(game.user.targets);
const origin = token.center;
targets.sort((a, b) => canvas.grid.measureDistance(origin, a.center) - canvas.grid.measureDistance(origin, b.center));

new Sequence()
    .effect()
        .atLocation(canvas.tokens.controlled[0])
        .stretchTo(targets[0])
        .file("jb2a.chain_lightning.primary")
    .play();
    
for (let index = 0; index < targets.length-1; ++index) {
    new Sequence()
    .effect()
        .atLocation(targets[index])
        .stretchTo(targets[index+1])
        .file("jb2a.chain_lightning.secondary")
        .delay((index+1)*600)
    .play();
}