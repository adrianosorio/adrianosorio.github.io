//We dont need to add the velocity to every single y value just one and then reassign the other values
//Error occuring when we reset

class Matrix { // generatea couple random types of matrices in the future to minimize computation and also create better matrice class with better data structure like hashmap
    
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.mat = this.createMatrix();
    }
    
    // Generates a matrix of 1's and 0's randomly of NxN with arrays 
    createMatrix() { //returns a array of arrays
        var dots = new Array(this.col); 
        for (var r = 0; r < this.row; r++) {
            var dots_r = new Array(this.row);
            for (var c = 0; c < this.col; c++) {
                dots_r[c] = (Math.random() > 0.60 ? 1 : 0);
            }
            dots[r] = dots_r;
        }
        return dots;
    }  
}

//Draw/Update/Create a Cylon Character
class Cylon_Char {
    // Coordinates
    
    constructor() {
       // console.log("hello world");
        this.color_char = color(236, 19, 19);
        this.seed_x = Math.random();
        this.seed_y = Math.random();
        // X and Y reporesent the top of the cylon char which is similar to position [0][0] in the array
        this.x = window.innerWidth * this.seed_x;
        this.y = window.innerHeight * this.seed_y;
        this.velocity = 3 * Math.random() + 3;
        this.char_size = 8;
        this.dot_diam = 5;
        this.padding = 2;
        this.m = new Matrix(this.char_size, this.char_size);
        this.coords = this.createCoordSystem();
    }
    
    // Generates a starting point coordinate system for the cylon char and return and array of coordinates
    createCoordSystem() {
        var coordsys = new Array(Math.pow(this.char_size, 2));
        var count = 0;
        for (var y_axis = 0; y_axis < this.char_size; y_axis++) {
            var y_c = y_axis * (this.dot_diam + this.padding) + this.y;
            for (var x_axis = 0; x_axis < this.char_size; x_axis++) { // x-axis * (this.dot_diam + this.padding) + this.x 0 -> 0, 1 -> 15, 2 -> 30
                var x_c = x_axis * (this.dot_diam + this.padding) + this.x; 
                if (count < Math.pow(this.char_size, 2)) {
                    coordsys[count] = [x_c, y_c];
                    count++;  
                }
            }
        }
        return coordsys;
    }
    
    // Resets the coordinate system so that it starts slightly above the top of the canvas
    reset() {
        // (my current y coord)(not constant) - (The window height) - (The size of the character) = (where I should reset up at)
        this.y = this.coords[0][1] - window.innerHeight - this.char_size*(this.dot_diam + this.padding);
        this.coords = this.createCoordSystem();
    }
    
    // Updates the coordinate system by a translation as long as the cylon char has not complete left the screen
    // otherwise it resets the screen
    update() { //TODO Error with a dot that does not update properly and does not move in some cases
        for (var index = 0; index < this.coords.length; index++) {
            if (this.coords[index][1] < window.innerHeight + this.char_size * (this.dot_diam + this.padding)) {
                this.coords[index][1] += this.velocity;
            } else {
                this.reset();
            }    
        }
        this.y = this.coords[0][1];
    }
    

    // Draws the dots on the canvas
    draw() {
        for (var index = 0; index < this.coords.length; index++) {
            fill(this.color_char); // Use color variable 'c' as fill color
            noStroke();
            if (this.m.mat[Math.floor(index/this.char_size)][index%this.char_size] == 1) {
                circle(this.coords[index][0], this.coords[index][1], this.dot_diam);
            }
        }
        this.update();
        
    }
}

var dataStream = new Array();
var amount = 50;

function setup() {
    var fr  = 40;
    frameRate(fr);
    var cv = createCanvas(window.innerWidth-17, window.innerHeight);
    cv.id("canvas");
    for (var count = 0; count < amount; count++) {
        var c = new Cylon_Char()
        dataStream.push(c);
    }
    
}

function draw() {
    background(0);
    for (var index = 0; index < dataStream.length; index++) {
        dataStream[index].draw();
    }    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //Scale canvas appropriatetly new x/old x = new size/old size
    for (var index = 0; index < dataStream.length; index++) {
        var old_width = dataStream[index].x/dataStream[index].seed_x;
        var old_height = dataStream[index].y/dataStream[index].seed_y;
        dataStream[index].x = dataStream[index].x * (window.innerWidth/old_width);
        dataStream[index].y = dataStream[index].y * (window.innerHeight/old_height);
        dataStream[index].coords = dataStream[index].createCoordSystem();
    }   
    
} 
