const canvas = document.getElementById("babcanv"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true);
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.AmmoJSPlugin);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 10, 30, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 20, -35));
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 30}, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, {mass:0, restitution:0.3}, scene);
    var wallz = [15, 0, 0, -15];
    var wallrot = [0, 1, 1, 0];
    var wallx = [null, -15, 15, null];
    for (i=0;i<4;i++) {
        var wall = BABYLON.MeshBuilder.CreatePlane("wall", {width:30, height:100}, scene);
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(wall, BABYLON.PhysicsImpostor.MeshImpostor, {mass:0, restitution: 0}, scene);
        wall.position.y = 1;
        wall.position.z = wallz[i];
        wall.visibility = 0;
        if (wallrot[i] == 1) {
            wall.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI/2, BABYLON.Space.LOCAL);
        }
        if  (!(wallx[i] == null)) {
            wall.position.x = wallx[i];
        }
    }
    ball = BABYLON.MeshBuilder.CreateSphere("ball", {diameter:4, segments:32}, scene);
    ball.position.y = 7;
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1, restitution:0.9}, scene);
    var woodmat = new BABYLON.StandardMaterial("woodmat", scene);
    woodmat.diffuseTexture = new BABYLON.Texture("wood.jpg", scene);
    ball.material = woodmat;

    var capsule1 = BABYLON.MeshBuilder.CreateCapsule("capsule1", {height:10, radius:2}, scene);
    capsule1.position.set(10, 2, -10);
    capsule1.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI/2, BABYLON.Space.LOCAL);
    capsule1.physicsImpostor = new BABYLON.PhysicsImpostor(capsule1, BABYLON.PhysicsImpostor.CapsuleImpostor, {mass:1, restitution:0.3}, scene);

    var capsule2 = BABYLON.MeshBuilder.CreateCapsule("capsule2", {height:10, radius:2}, scene);
    capsule2.position.set(5, 2, -10);
    capsule2.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI/2, BABYLON.Space.LOCAL);
    capsule2.physicsImpostor = new BABYLON.PhysicsImpostor(capsule2, BABYLON.PhysicsImpostor.CapsuleImpostor, {mass:1, restitution:0.3}, scene);

    var capsule3 = BABYLON.MeshBuilder.CreateCapsule("capsule3", {height:10, radius:2}, scene);
    capsule3.position.set(7, 5, -10);
    capsule3.rotate(new BABYLON.Vector3(1, 0, 0), Math.PI/2, BABYLON.Space.LOCAL);
    capsule3.physicsImpostor = new BABYLON.PhysicsImpostor(capsule3, BABYLON.PhysicsImpostor.CapsuleImpostor, {mass:1, restitution:0.3}, scene);

    var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {diameter:5, height:10}, scene);
    cylinder.position.set(-10, 2, -10);
    cylinder.physicsImpostor = new BABYLON.PhysicsImpostor(cylinder, BABYLON.PhysicsImpostor.CylinderImpostor, {mass:1, restitution:0.3}, scene);

    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {diameter:3, thickness:1}, scene);
    torus.rotate(new BABYLON.Vector3(0, 0, 1), -Math.PI/4, BABYLON.Space.LOCAL);
    torus.position.set(-6, 2, -10);
    torus.physicsImpostor = new BABYLON.PhysicsImpostor(torus, BABYLON.PhysicsImpostor.MeshImpostor, {mass:1, restitution:0.3}, scene);

    const tubepath = [
        new BABYLON.Vector3(-13, 1, 10),
        new BABYLON.Vector3(-1, 17, 10),
        new BABYLON.Vector3(11, 1, 10)
    ]
    var tube = BABYLON.MeshBuilder.CreateTube("tube", {path:tubepath, radius:1}, scene);
    tube.physicsImpostor = new BABYLON.PhysicsImpostor(tube, BABYLON.PhysicsImpostor.MeshImpostor, {mass:0, restitution:0.3}, scene);

    var boxtowerX = [-10, -7, -4, -1, 2, 5, 8];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 1, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }

    var boxtowerX = [-8.5, -5.5, -2.5, 0.5, 3.5, 6.5];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 3, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }

    var boxtowerX = [-7, -4, -1, 2, 5];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 5, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }

    var boxtowerX = [-5.5, -2.5, 0.5, 3.5];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 7, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }

    var boxtowerX = [-4, -1, 2];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 9, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }

    var boxtowerX = [-2.5, 0.5];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 11, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }

    var boxtowerX = [-1];
    for (i=0;i<boxtowerX.length;i++) {
        var box = BABYLON.MeshBuilder.CreateBox("box", {width:2, height:2, depth:2}, scene);
        box.position.set(boxtowerX[i], 13, 10);
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.3}, scene);
    }
    return scene;
};

window.onkeydown = function onKeyDown(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68:
      var impulseDir = new BABYLON.Vector3(1, 0, 0);
      ball.physicsImpostor.applyImpulse(impulseDir.scale(1), ball.getAbsolutePosition());
      break;
    case 83:
      var impulseDir = new BABYLON.Vector3(0, 0, -1);
      ball.physicsImpostor.applyImpulse(impulseDir.scale(1), ball.getAbsolutePosition());
      break;
    case 65:
      var impulseDir = new BABYLON.Vector3(-1, 0, 0);
      ball.physicsImpostor.applyImpulse(impulseDir.scale(1), ball.getAbsolutePosition());
      break;
    case 87:
      var impulseDir = new BABYLON.Vector3(0, 0, 1);
      ball.physicsImpostor.applyImpulse(impulseDir.scale(1), ball.getAbsolutePosition());
      break;
  }
}

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
