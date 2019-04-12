
var width = window.innerWidth;
var height = window.innerHeight;

//Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

//Camera vectors

var camMove = new THREE.Vector3(0,0,0), camStrafe = new THREE.Vector3(0,0,0);
var cameraLookAt = new THREE.Vector3(0 , 0 , -1);
var cameraRight = new THREE.Vector3( 1 , 0 , 0);
var cameraUp = new THREE.Vector3().crossVectors( cameraRight , cameraLookAt );
var bounceNum = 0;
var isMoving = false;
var moveOk = false;
//add controls
document.addEventListener("mousemove", look, false);
document.addEventListener("keydown", doKeyDown, false);
document.addEventListener("keyup", doKeyUp, false);

//Mouse variables
var firstMouseMove = true;
var oldMousePos = {x: 0, y: 0};

//looking around
function look(evt){
  if(firstMouseMove){
    oldMousePos.x = evt.clientX;
    oldMousePos.y = evt.clientY;
    firstMouseMove = false;
    return;
  }
  var yaw = (oldMousePos.x - event.clientX) / 200.00;
  var pitch = (oldMousePos.y - event.clientY) / 400.00;
  cameraLookAt.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  cameraRight.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  //cameraLookAt.applyAxisAngle(cameraRight, pitch);
  oldMousePos.x = event.clientX;
  oldMousePos.y = event.clientY;

}

//stop moving
function doKeyUp(evt) {
      var code = evt.keyCode;  // Numerical code for key that was pressed.
      switch (code) {
    case 65:  // left arrow key
      camStrafe.x = 0;
      camStrafe.y = 0;
      camStrafe.z = 0;
      isMoving = false;
      break;
    case 68:  // right arrow key
      camStrafe.x = 0;
      camStrafe.y = 0;
      camStrafe.z = 0;
      isMoving = false;
      break;
    case 87:  // up arrow key
      camMove.x = 0;
      camMove.y = 0;
      camMove.z = 0;
      isMoving = false;
      break;
    case 83:  // down arrow key
      camMove.x = 0;
      camMove.y = 0;
      camMove.z = 0;
      isMoving = false;
      break;
    }
}

//start moving
function doKeyDown(evt) {

        var code = evt.keyCode;  // Numerical code for key that was pressed.
        switch (code) {
		case 65:  // left arrow key

          camStrafe.x = -cameraRight.x / 2.0;
          camStrafe.y = -cameraRight.y / 2.0;
          camStrafe.z = -cameraRight.z / 2.0;
          isMoving = true;

		    break;
		case 68:  // right arrow key

          camStrafe.x = cameraRight.x / 2.0;
          camStrafe.y = cameraRight.y / 2.0;
          camStrafe.z = cameraRight.z / 2.0;
          isMoving = true;

		    break;
		case 87:  // up arrow key
          camMove.x = cameraLookAt.x / 2.0;
          camMove.y = cameraLookAt.y / 2.0;
          camMove.z = cameraLookAt.z / 2.0;
          isMoving = true;

		    break;
		case 83:  // down arrow key

          camMove.x = -cameraLookAt.x / 2.0;
          camMove.y = -cameraLookAt.y / 2.0;
          camMove.z = -cameraLookAt.z / 2.0;
          isMoving = true;

		    break;
		default:
		    break;
        }
}

// create scene object
var scene = new THREE.Scene;
var cubeArr = [];
var collide =[];
var maze = [];
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,1,1,1,1,1,1,1,1,1]);
maze.push([1,0,0,0,0,0,0,0,0,0,0,0]);
maze.push([1,0,0,0,0,0,0,0,0,0,0,0]);
maze.push([1,1,1,1,1,1,1,1,1,1,1,1]);
maze.push([1,0,0,0,0,0,0,0,0,0,0,0]);


//Create maze
for(var i = 0; i< maze.length; i++){
  for(var j = 0; j<12; j++){
    if(maze[i][j] == 1){
      var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
      var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xdd6666});
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      var cubeGeometry2 = new THREE.CubeGeometry(7, 10, 5);
      var cubeMaterial2 = new THREE.MeshLambertMaterial({ color: 0xdd6666});
      var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
      cube.castShadow=true;
      cube.recieveShadow=true;
      cube.needsUpdate = true;
      cube.position.set(j*10, 5 , i*10);
      cube2.position.set(j*10, 5 , i*10);
      console.log(cube.position);
      collide.push(cube);
      scene.add(cube);
      scene.add(cube2);
    }
  }
}

// create perspective camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 2;
camera.position.z = 20;
camera.position.x = 20;
scene.add(camera);



var cubeGeometry = new THREE.CubeGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xdd6666});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(20,2,20);
collide.push(cube);
scene.add(cube);
//create player light
flashlight = new THREE.PointLight(0xffffff,.5,50,2);
camera.add(flashlight);
flashlight.position.set(3,1,3);
flashlight.target = camera;

renderer.render(scene, camera);

var originPoint = cube.position.clone();





// create the view matrix
camera.up = new THREE.Vector3(0,1,0)
camera.lookAt(0,0,0);

// add lighting and add to scene
flashlight2 = new THREE.DirectionalLight(0xffffff,3);
flashlight2.position.set(20,20,20);

scene.add(flashlight2)

//Add floor
var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
var groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
groundMat.color.setHSL( 0.095, 1, 0.75 );

var ground = new THREE.Mesh( groundGeo, groundMat );
ground.position.y = 0;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );
//Shadows
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);
var cubeCenter = new THREE.Vector3(0,0,0);

function render() {
      var moveOk = true;
      var next = camMove.clone();
      next.add(camStrafe.clone());
      var camPos = camera.position.clone();

      for(var i = 0; i < collide.length; i++){
        cubeCenter = collide[i].position.clone();

        if(cubeCenter.distanceTo(camPos.add(next)) < 4.3){
          moveOk = false;
          break;
        }
      }
      if(moveOk){
        var newLookAt = new THREE.Vector3().addVectors(camera.position, cameraLookAt);
        camera.lookAt(newLookAt);
        camera.position.add(camMove);
        camera.position.add(camStrafe);
      }
    if(isMoving){
      bounceNum += 2.2;
      camera.position.y =  (Math.cos((bounceNum*5) * Math.PI / 180)) + 4;
    }





    renderer.render(scene, camera);
    requestAnimationFrame(render);



}
render();
