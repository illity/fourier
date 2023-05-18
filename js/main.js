class Complex {
    constructor(x, y, polar = false) {
        if (!polar) {
            this.re = x;
            this.im = y;
            this.r = (x**2 + y**2)**.5;
            if (y == 0) this.phi = 0
            else this.phi = Math.atan(x/y);
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
    abs = function() {
        return this.r;
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

function drawFourier() {
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
    window.requestAnimationFrame(drawFourier);
}

const l = 1.5
const startPoint = [0, 0]

function drawMandelBrot() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const mandelBrot = (x0, y0, xk, yk, maxIter) => {
        const [x,y] = [x0*x0 - y0*y0 + xk, 2*x0*y0 + yk]
        if (maxIter == 0 || x0**2+y0**2>2) return maxIter;
        return mandelBrot(x, y, xk, yk, maxIter-1)
    }
    for(let i=0; i<height; i++) {
        for(let j=0; j<width; j++) {
            const x = startPoint[0] + 2*l*(i-width/2)/width;
            const y = startPoint[1] + 2*l*(j-height/2)/height;
            const k = mandelBrot(0, 0, x, y, 50)
            if (k==0) continue;
            const [r, g, b, a] = [255,k,0,255]
            ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
            ctx.fillRect( i, j, 1, 1 );
        }            
    }
}

window.requestAnimationFrame(drawMandelBrot);
