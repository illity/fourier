class Complex {
    constructor(x, y, polar = false) {
        if (!polar) {
            this.re = x;
            this.im = y;
            this.r = (x**2 + y**2)**.5;
            this.phi = Math.atan(x/y);
        } else {
            this.re = x*Math.cos(y);
            this.im = x*Math.sin(y);
            this.r = x;
            this.phi = y;
        }
    }
    static add = function (a, b) {
        return new Complex(a.re+b.re, a.im+b.im);
    }
    static multiply = function(a,b) {
        return new Complex(a.r*b.r, a.phi+b.phi, true)
    }
    power = function(a) {
        return new Complex(this.r**a, this.phi*a, true);
    }
}

const canvas = document.getElementById('canva')
const ctx = canva.getContext('2d')

const width = canvas.width
const height = canvas.height

ctx.translate(width/2, height/2)
var pos = new Complex(0, 0)

ctx.strokeStyle = 'red';

var t = 0

function draw() {
    const f = 128;
    const k = 3
    const freq = document.getElementById('frequency').value/k;
    console.log()
    if (t > f * freq * k) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.translate(width/2, height/2)
        t = 0;
    }
    const g = (t) => {return Math.cos(2*Math.PI*t/f * 1/freq)}
    if (t == 0)
    ctx.moveTo(200*g(t)*Math.cos(-2*Math.PI*t/f),
               200*g(t)*Math.sin(-2*Math.PI*t/f));
    ctx.lineTo(200*g(t)*Math.cos(-2*Math.PI*t/f),
               200*g(t)*Math.sin(-2*Math.PI*t/f));
    ctx.stroke();
    t += 4 * freq;
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
