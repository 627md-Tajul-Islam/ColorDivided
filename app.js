var select = function(s) {
        return document.querySelector(s);
    },
    selectAll = function(s) {
        return document.querySelectorAll(s);
    },
    colorArray = [   "#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"],
    repeatCount = 0,
    rippleGroup = select('.rippleGroup'),
    particleContainer = select('.particleContainer'),
    particleArray = Array.from(this.selectAll('.particleContainer circle'))


TweenMax.set('svg', {
    visibility: 'visible'
})

TweenMax.set('.upsideDown', {
    scaleY: -1,
    transformOrigin: '50% 100%',
    y: 2

})

var tl = new TimelineMax({onStart: onRepeat, repeat: -1, onRepeat: onRepeat});
tl.to('.arch1', 1, {
    drawSVG: '100% 100%',
    ease: Expo.easeOut
})
    .from('.arch2', 1, {
        drawSVG: '0% 0%',
        ease: Expo.easeIn
    }, '-=1')
    .fromTo('.whole', 0.5, {
        x: -0
    },{
        x: -125,
        ease: Sine.easeOut
    }, '-=1')
    .fromTo('.whole', 0.5, {
        x: -125
    }, {
        x: -250,
        immediateRender: false,
        ease: Sine.easeIn
    }, '-=0.5')
    .to(rippleGroup, 1, {
        x: -250,
        ease: Linear.easeNone
    }, 0)

function playParticles () {

    TweenMax.set(particleArray, {
        x:540,
        y:362,
        attr:{
            r:4
        },
        alpha:1,
        scale:randomBetween(5, 13) / 10,
        transformOrigin: '50% 50%'
    })

    TweenMax.staggerTo(particleArray, randomBetween(3, 9) / 10, {
        cycle: {
            physics2D: function () {
                return {velocity: randomBetween(224, 350),
                    angle: randomBetween(-120, -50),
                    gravity: randomBetween(555, 970)
                }
            }
        },
        scale: 0
    }, 0)


}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function doRipple(){
    var tl = new TimelineMax();
    tl.staggerFromTo('.rip', 2, {
        attr:{
            rx:0,
            ry:0
        },
        alpha:0.6
    }, {
        cycle:{
            attr:[{rx:220, ry:38}, {rx:200, ry:35}, {rx:180, ry:30}]
        },
        alpha:0,
        ease:Circ.easeOut
    },0.03)
}
function onRepeat () {
    repeatCount = (repeatCount < colorArray.length-1) ? repeatCount+1 : 0;
    //console.log(repeatCount)
    TweenMax.to(['.whole', rippleGroup], 0.5, {
        stroke: colorArray[repeatCount],
        ease: Sine.easeIn
    })
    TweenMax.to(particleContainer, 0.5, {
        fill: colorArray[repeatCount],
        ease: Sine.easeIn
    })
    playParticles();
    doRipple();
}

//TweenMax.globalTimeScale(0.5)