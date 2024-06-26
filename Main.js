"use strict";
var L09_Ententeich;
(function (L09_Ententeich) {
    window.addEventListener("load", handleLoad);
    let line = 0.46;
    let imgData;
    // Array der Moveables
    let moveables = [];
    // Array des Essens
    let food = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09_Ententeich.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let horizon = L09_Ententeich.crc2.canvas.height * line;
        drawBackground();
        drawSun({ x: 100, y: 75 });
        drawMountains({ x: 0, y: horizon }, 75, 200, "rgb(193, 12, 139)", "white");
        drawMountains({ x: 0, y: horizon }, 50, 150, "rgb(149, 20, 154)", "rgb(255, 236, 255)");
        drawLake();
        drawTree({ x: 60, y: 470 });
        imgData = L09_Ententeich.crc2.getImageData(0, 0, L09_Ententeich.crc2.canvas.width, L09_Ententeich.crc2.canvas.height);
        moveables.push(new L09_Ententeich.Duck(1000, 420, "yellow"));
        moveables.push(new L09_Ententeich.Duck(1200, 320, "lightblue"));
        moveables.push(new L09_Ententeich.Insect(1000, 100, "purple"));
        moveables.push(new L09_Ententeich.Insect(700, 150, "purple"));
        moveables.push(new L09_Ententeich.Insect(600, 80, "purple"));
        moveables.push(new L09_Ententeich.Insect(500, 200, "purple"));
        moveables.push(new L09_Ententeich.Insect(200, 150, "purple"));
        moveables.push(new L09_Ententeich.Cloud(10, 80, "white"));
        moveables.push(new L09_Ententeich.Cloud(300, 100, "white"));
        moveables.push(new L09_Ententeich.Cloud(600, 80, "white"));
        canvas.addEventListener("pointerdown", createObject);
        window.addEventListener("keydown", changeColor);
        window.setInterval(function () {
            animation();
        }, 24);
    }
    // Add Baby Duck or Bread when clicked
    function createObject(_event) {
        let isDuckClicked = false;
        let clickX = _event.clientX;
        let clickY = _event.clientY;
        for (let moveable of moveables) {
            if (moveable instanceof L09_Ententeich.Duck) {
                if (moveable.positionX < clickX && clickX < moveable.positionX + 100 && moveable.positionY < clickY && clickY < moveable.positionY + 100) {
                    moveables.push(new L09_Ententeich.BabyDuck(clickX, clickY + 40, "pink"));
                    isDuckClicked = true;
                }
            }
        }
        if (isDuckClicked == false) {
            food.push(new L09_Ententeich.Bread(clickX, clickY, "brown"));
            for (let moveable of moveables) {
                if (moveable instanceof L09_Ententeich.Duck) {
                    moveable.state = "eat";
                }
            }
        }
    }
    // Change Color
    function changeColor(_event) {
        if (_event.code == "Space") {
            for (let moveable of moveables) {
                if (moveable instanceof L09_Ententeich.Duck || moveable instanceof L09_Ententeich.BabyDuck) {
                    moveable.changeColor();
                }
            }
        }
    }
    // Draw Background
    function drawBackground() {
        let gradient = L09_Ententeich.crc2.createLinearGradient(0, 0, 0, L09_Ententeich.crc2.canvas.height);
        gradient.addColorStop(0, "purple");
        gradient.addColorStop(0.3, "rgb(215, 27, 222)");
        gradient.addColorStop(0.75, "rgb(16, 138, 110)");
        gradient.addColorStop(1, "rgb(11, 203, 139)");
        L09_Ententeich.crc2.fillStyle = gradient;
        L09_Ententeich.crc2.fillRect(0, 0, L09_Ententeich.crc2.canvas.width, L09_Ententeich.crc2.canvas.height);
    }
    // Draw Sun
    function drawSun(_position) {
        let r1 = 50;
        let r2 = 150;
        let gradient = L09_Ententeich.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "rgba(238, 182, 188, 0.6)");
        gradient.addColorStop(1, "rgba(223, 131, 226, 0)");
        L09_Ententeich.crc2.save();
        L09_Ententeich.crc2.translate(_position.x, _position.y);
        L09_Ententeich.crc2.fillStyle = gradient;
        L09_Ententeich.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L09_Ententeich.crc2.fill();
        L09_Ententeich.crc2.restore();
    }
    // Draw Mountains
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        L09_Ententeich.crc2.save();
        L09_Ententeich.crc2.translate(_position.x, _position.y);
        L09_Ententeich.crc2.beginPath();
        L09_Ententeich.crc2.moveTo(0, 0);
        L09_Ententeich.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            L09_Ententeich.crc2.lineTo(x, y);
        } while (x < L09_Ententeich.crc2.canvas.width);
        L09_Ententeich.crc2.lineTo(x, 0);
        L09_Ententeich.crc2.closePath();
        let gradient = L09_Ententeich.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        L09_Ententeich.crc2.fillStyle = gradient;
        L09_Ententeich.crc2.fill();
        L09_Ententeich.crc2.restore();
    }
    // Draw Lake
    function drawLake() {
        let centerX = 920;
        let centerY = 430;
        let radiusX = 500;
        let radiusY = 120;
        L09_Ententeich.crc2.save();
        L09_Ententeich.crc2.beginPath();
        L09_Ententeich.crc2.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        L09_Ententeich.crc2.closePath();
        L09_Ententeich.crc2.fillStyle = "rgb(95, 31, 192)";
        L09_Ententeich.crc2.fill();
        L09_Ententeich.crc2.restore();
    }
    // Draw Tree
    function drawTree(_position) {
        L09_Ententeich.crc2.save();
        L09_Ententeich.crc2.translate(_position.x, _position.y);
        L09_Ententeich.crc2.fillStyle = "brown";
        L09_Ententeich.crc2.fillRect(90, 10, 60, -100);
        L09_Ententeich.crc2.save();
        L09_Ententeich.crc2.fillStyle = "pink";
        L09_Ententeich.crc2.beginPath();
        L09_Ententeich.crc2.arc(120, -220, 160, 0, 2 * Math.PI);
        L09_Ententeich.crc2.fill();
        L09_Ententeich.crc2.restore();
        L09_Ententeich.crc2.restore();
    }
    // Animate the Moveables
    function animation() {
        drawBackground();
        L09_Ententeich.crc2.putImageData(imgData, 0, 0);
        for (let moveable of moveables) {
            moveable.move();
        }
        for (let bread of food) {
            bread.draw();
        }
    }
})(L09_Ententeich || (L09_Ententeich = {}));
//# sourceMappingURL=Main.js.map