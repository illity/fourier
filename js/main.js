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