// Anthony Moran, 01/22/2015
var gl;
var points;

var index = 0;
var sides = 3;
var vPosition;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	var vertices = [-0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5];						// Square
	var vertices2 = [-0.5, -0.5, 0, 0.5, 0.5, -0.5];			// Triangle
	var vertices3 = [-0.5, 0, -0.25, 0.5, 0.25, 0.5, 0.5, 0, 0.25, -0.5, -0.25, -0.5];	// Hexagon
	
    // Load the data into the GPU

 	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); 
	
	var bufferId3 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices3), gl.STATIC_DRAW ); 
	
 	var bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );
	
	vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	var click = function(e) {
       if(index == 0){
			sides = 4;
			gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
			gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); 
			vPosition = gl.getAttribLocation( program, "vPosition" );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( vPosition );
			index = 1;
	   }
	   else if (index == 1){
	   		sides = 6;
			gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
			gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices3), gl.STATIC_DRAW );
			vPosition = gl.getAttribLocation( program, "vPosition" );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( vPosition );
 			index = 2;
	   }
	   else {
	   		sides = 3;
			gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
			gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices2), gl.STATIC_DRAW );
			vPosition = gl.getAttribLocation( program, "vPosition" );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( vPosition );
 			index = 0;
	   }
	}
	
    canvas.addEventListener("click", click, false);
	
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, sides );
	window.requestAnimFrame(render);
}
