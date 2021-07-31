// earth inspiration: https://www.youtube.com/watch?v=4HPXOn7k_mI&t=33s
let $$ = sel => document.querySelector(sel);
document.documentElement.style.overflow = "hidden";
let elCanvas = $$("#myCanvas");

elCanvas.width = window.innerWidth;
elCanvas.height = window.innerHeight - 100;

let randomColour = function () {
  let x = Math.floor((Math.random() * 4) + 1);
  if (x === 1)
    return 'Gold';
  else if (x === 2)
    return 'DarkViolet';
  else if (x === 3)
    return 'Cyan';
  else if (x === 4)
    return 'White';
};
let landArr = new Array(3);
let cloudArr = new Array(6);
let starArr = new Array(50);
let planetArr = new Array(5);

let setUp = function () {
  let context = elCanvas.getContext('2d');
  createStars(true);
  for (let i = 0; i < starArr.length; i++) {
    starArr[i].draw(context);
  }


  theSun = new Sun(-400, window.innerHeight + 400, 300, 4, "gold");
  theSun.draw(context);

  theEarth = new Earth(window.innerWidth / 2, theSun.y, 200, "dodgerBlue");
  theShadow = new Shadow(window.innerWidth + 400, theEarth.ySpot, theEarth.radius, 4, "rgba(0, 0, 0, 0.5)");
  createLandAndClouds(theEarth.xSpot, theEarth.ySpot, theEarth.radius);

  theComputer = new Computer(window.innerWidth / 3 + 20, window.innerHeight / 3 + 20, 100, 100);
  theSpaceShip = new SpaceShip(window.innerWidth / 2, 0, 1, 2);
  astronautImg = new Image();
  alienImgFront = new Image();
  alienImgBack = new Image();
  theAlien = new Alien(window.innerWidth / 3, window.innerHeight / 3, 100, 200, 2);
  computerImg = new Image();
  theComputer = new Computer(window.innerWidth / 3 + 40, window.innerHeight / 3 + 20, 100, 100, 2);
  spaceShipImg = new Image();
  theForeignPlanet = new ForeignPlanet(window.innerWidth / 2, window.innerHeight + (window.innerWidth / 2), window.innerWidth / 2 + 100, 3, window.innerHeight / 2);

  spaceShipImg.addEventListener("load", function () {
    scene1 = setInterval(() => animate(context), 40)
  }, false);
  spaceShipImg.src = "./images/SpaceShip.svg";
  alienImgFront.src = "./images/AlienFront.svg";
  alienImgBack.src = "./images/AlienBack.svg";
  computerImg.src = "./images/Computer.svg";
  astronautImg.src = "./images/Astronaut.svg";
  // astronautImg.src = "./images/Allan.svg";
};

// ANIMATED SCENES ----------------------------------------------------------

// the sun, the earth >
let animate = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < starArr.length; i++) {
    starArr[i].draw(c);
  }
  theSun.draw(c);
  theSun.eclipse();
  theSun.move(true, 5);
  c.save();
  theEarth.draw(c);
  theEarth.move(true, 5);
  c.clip();

  for (let x = 0; x < landArr.length; x++) {
    landArr[x].draw(c);
    landArr[x].turn(theEarth.xSpot, theEarth.radius);
    landArr[x].move(true, 5);
  }
  for (let x = 0; x < cloudArr.length; x++) {
    cloudArr[x].draw(c);
    cloudArr[x].turn(theEarth.xSpot, theEarth.radius);
    cloudArr[x].move(true, 5);
  }

  theShadow.draw(c);
  theShadow.eclipse(theSun.x, theEarth.xSpot, theEarth.radius);
  theShadow.move(true, 5);
  c.restore();

  if (theEarth.ySpot < window.innerHeight / 2) {
    theSpaceShip.ySpot = theEarth.ySpot;
    clearInterval(scene1);
    scene2 = setInterval(() => {
      animate2(c)
    }, 40);
  }
};

// the spaceship leaves earth >
let animate2 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < starArr.length; i++) {
    starArr[i].draw(c);
  }

  theSun.draw(c);
  theSun.eclipse();

  c.drawImage(spaceShipImg, theSpaceShip.xSpot, theSpaceShip.ySpot, theSpaceShip.w, theSpaceShip.l);
  theSpaceShip.move(true, 8);
  theSpaceShip.growShrink(true, 0.5, 1, 200);

  c.save();
  theEarth.draw(c);
  c.clip();

  for (let x = 0; x < landArr.length; x++) {
    landArr[x].draw(c);
    landArr[x].turn(theEarth.xSpot, theEarth.radius);
  }
  for (let x = 0; x < cloudArr.length; x++) {
    cloudArr[x].draw(c);
    cloudArr[x].turn(theEarth.xSpot, theEarth.radius);
  }

  theShadow.draw(c);
  theShadow.eclipse(theSun.x, theEarth.xSpot, theEarth.radius);
  c.restore();

  if (theSpaceShip.ySpot < -1000) {
    clearInterval(scene2);
    theSpaceShip.xSpot = window.innerWidth / 2;
    theSpaceShip.ySpot = window.innerHeight + 1000;
    createStars(false);
    scene3 = setInterval(() => animate3(c), 40);
  }

};

// the spaceship travels >
let animate3 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < starArr.length; i++) {
    starArr[i].draw(c);
    starArr[i].move(true, 2);
  }

  c.drawImage(spaceShipImg, theSpaceShip.xSpot, theSpaceShip.ySpot, 200, 400);
  theSpaceShip.move(true, 20);

  if (theSpaceShip.ySpot < -1000) {
    clearInterval(scene3);
    scene4 = setInterval(() => animate4(c), 40);
    theSpaceShip.xSpot = -50;
    theSpaceShip.ySpot = -50;
    theSpaceShip.width = 5;
    theSpaceShip.height = 10;
  }
};

// a new planet appears >
let animate4 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < starArr.length; i++) {
    starArr[i].draw(c);
    starArr[i].move(true, 2);
  }
  if (theForeignPlanet.ySpot - theForeignPlanet.radius <= theForeignPlanet.limit) {
    c.drawImage(spaceShipImg, theSpaceShip.xSpot, theSpaceShip.ySpot, theSpaceShip.w, theSpaceShip.l);
    theSpaceShip.move(false, (window.innerHeight / 40));
    theSpaceShip.moveRight(true, (window.innerWidth / 40));
    if (theSpaceShip.xSpot > theForeignPlanet.xSpot) {
      clearInterval(scene4);
      createStars(false);
      scene5 = setInterval(() => animate5(c), 40);
    }
  }
  theForeignPlanet.draw(c);
  theForeignPlanet.move(true, 5);

};

// whats that? >
let counter = 0;
let animate5 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < starArr.length; i++)
    starArr[i].draw(c);
  drawForeignLand(c, false);
  c.drawImage(computerImg, theComputer.xSpot, theComputer.ySpot, theComputer.width, theComputer.lenght);
  c.drawImage(alienImgBack, theAlien.xSpot, theAlien.ySpot, theAlien.width, theAlien.lenght);
  counter += 1;
  if (counter > 40) {
    clearInterval(scene5);
    createStars(false);
    scene6 = setInterval(() => animate6(c), 40);
    counter = 0;
  }
};

// the astronaut is looking >
let animate6 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < starArr.length; i++)
    starArr[i].draw(c);
  c.drawImage(spaceShipImg, window.innerWidth / 3 * 2, window.innerHeight / 3 - 140, 100, 200);
  drawForeignLand(c, true);
  c.drawImage(astronautImg, window.innerWidth / 3, window.innerHeight / 3, 150, 200);
  counter += 1;
  if (counter > 40) {
    clearInterval(scene6);
    createStars(false);
    scene7 = setInterval(() => animate7(c), 40);
  }

};

// we walk closer to the alien >
let animate7 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < starArr.length; i++)
    starArr[i].draw(c);
  drawForeignLand(c, false);
  c.drawImage(computerImg, theComputer.xSpot, theComputer.ySpot, theComputer.width, theComputer.lenght);
  c.drawImage(alienImgBack, theAlien.xSpot, theAlien.ySpot, theAlien.width, theAlien.lenght);
  theAlien.grow();
  theComputer.grow();
  if (theAlien.width > 200) {
    clearInterval(scene7);
    scene8 = setInterval(() => animate8(c), 40);
  }

};

// the alien looks at us >
let animate8 = function (c) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < starArr.length; i++)
    starArr[i].draw(c);
  drawForeignLand(c, false);
  c.drawImage(computerImg, theComputer.xSpot, theComputer.ySpot, theComputer.width, theComputer.lenght);
  c.drawImage(alienImgFront, theAlien.xSpot, theAlien.ySpot, theAlien.width, theAlien.lenght);
  letsPlay();
};

// alien says let's play >
let elDiv1 = $$("#div1");
let letsPlay = function () {
  elDiv1.style.animationName = "open";
  elDiv1.style.animationDuration = "10s";
  setTimeout(exit, 6000);
};

let exit = function () {
  location.href = "intro.html";
};

// OBJECTS ----------------------------------------------------------

function SpaceShip(_xSpot, _ySpot, _w, _l) {
  this.xSpot = _xSpot;
  this.ySpot = _ySpot;
  this.w = _w;
  this.l = _l;

  this.growShrink = function (grow, width, length, maxLength) {
    if (this.l < maxLength) {
      if (grow) {
        this.w += width;
        this.l += length;
      } else {
        this.w -= width;
        this.l -= length;
      }
    }
  };

  this.move = function (up, speed) {
    up ? this.ySpot -= speed : this.ySpot += speed;
  };
  this.moveRight = function (right, speed) {
    right ? this.xSpot += speed : this.xSpot -= speed;
  };
}

function Star(_index, _xRange, _yRange, _color) {
  // choose where stars are created (range - window.innerwidth/heigth)
  this.xRange = _xRange;
  this.yRange = _yRange;
  this.xSpot = Math.floor((Math.random() * window.innerWidth) + this.xRange);
  this.ySpot = Math.floor((Math.random() * window.innerHeight + 100) + this.yRange);
  this.radius = Math.floor((Math.random() * 3) + 1);
  this.xMove = Math.floor((Math.random() * 8) + 5);
  this.yMove = Math.floor((Math.random() * 8) + 4);
  this.color = _color;
  this.index = _index;
  this.draw = function (c) {
    for (let i = 0; i < starArr.length; i++) {
      c.beginPath();
      c.fillStyle = starArr[i].color;
      c.arc(starArr[i].xSpot, starArr[i].ySpot, starArr[i].radius, 0, 2 * Math.PI, false);
      c.fill();
      c.closePath();
    }
  };
  this.move = function (up, speed) {
    if (up) {
      this.ySpot -= speed;
      if (this.ySpot < 0) {
        starArr[this.index] = new Star(this.index, 1, window.innerHeight, randomColour());
      }
    }
  };
}

function Earth(_x, _y, _r, _color) {
  this.xSpot = _x;
  this.ySpot = _y;
  this.radius = _r;
  this.color = _color;

  this.getRandomNumber = function (z) {
    if (z === 'y')
      return (Math.floor((Math.random() * this.radius) + this.ySpot));
    else
      return (Math.floor((Math.random() * this.xSpot - this.radius * 2) + 1));
  };

  this.draw = function (c) {

    c.beginPath();
    c.moveTo(this.xSpot, this.ySpot);
    c.fillStyle = this.color;
    c.shadowBlur = this.radius; // <------- does not work with firefox (messes up .clip())
    c.shadowColor = this.color; // <------- does not work with firefox
    c.arc(this.xSpot, this.ySpot, this.radius, 0, 2 * Math.PI);
    c.fill();
    c.closePath();

  };

  this.move = function (up, speed) {
    up ? this.ySpot -= speed : this.ySpot += speed;
  };

}

function Line(_x, _y, _l, _w, _color) {

  this.x = _x;
  this.y = _y;
  this.l = _l;
  this.w = _w;
  this.color = _color;
  this.count = 0;

  this.draw = function (c) {
    c.translate(0, 0);
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineTo(this.x, this.y);
    c.lineTo(this.x + this.l, this.y);
    c.lineWidth = this.w;
    c.lineCap = 'round';
    c.stroke();
    c.closePath();
  };

  this.turn = function (earthX, earthR) {
    this.x += 3;
    if (this.x > earthX + earthR + this.l) {
      this.x = earthX - earthR - this.l;
    }

  };
  this.move = function (up, speed) {
    up ? this.y -= speed : this.y += speed;
  };

}

function Shadow(_x, _y, _r, _m, _color) {
  this.x = _x;
  this.y = _y;
  this.r = _r;
  this.m = _m;
  this.color = _color;
  this.draw = function (c) {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fill();
    c.closePath();
  };
  this.eclipse = function (sunX, earthX, earthR) {
    this.x -= this.m;
    if (this.x < 0 - this.r)
      this.x = innerWidth + this.r;
  };

  this.move = function (up, speed) {
    up ? this.y -= speed : this.y += speed;
  };

}

function Sun(_x, _y, _r, _m, _color) {
  this.x = _x;
  this.newX = _x;
  this.y = _y;
  this.r = _r;
  this.m = _m;
  this.color = _color;
  this.limit = 2000;

  this.draw = function (c) {
    c.beginPath();
    c.save();
    c.shadowBlur = this.r;
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.arc(this.newX, this.y, this.r, 0, 2 * Math.PI);
    c.fill();
    c.restore();
    c.closePath();
  };

  this.eclipse = function () {
    this.newX += this.m;
    if (this.newX > this.limit) {
      this.newX = -this.r * 2;
    }
  };

  this.move = function (up, speed) {
    up ? this.y -= speed : this.y += speed;
  };
}

function ForeignPlanet(_xSpot, _ySpot, _radius, _movement, _limit) {
  this.xSpot = _xSpot;
  this.ySpot = _ySpot;
  this.radius = _radius;
  this.movement = _movement;
  this.limit = _limit;
  this.draw = function (c) {
    c.beginPath();
    c.save();
    c.shadowBlur = this.radius;
    let grd = c.createLinearGradient(0, 0, this.xSpot + this.radius, 0);
    grd.addColorStop(0, "blue");
    grd.addColorStop(0.5, "purple");
    grd.addColorStop(1, "turquoise");
    c.shadowColor = "lime";
    c.fillStyle = grd;
    c.arc(this.xSpot, this.ySpot, this.radius, 0, 2 * Math.PI);
    c.fill();
    c.restore();
    c.closePath();
  };
  this.move = function () {
    if (this.ySpot - this.radius > this.limit)
      this.ySpot -= this.movement;
  };

}

let drawForeignLand = function (c, flipped) {
  c.beginPath();
  c.moveTo(0, window.innerHeight / 3);
  c.lineTo(window.innerWidth, window.innerHeight / 3);
  c.lineTo(window.innerWidth, window.innerHeight);
  c.lineTo(0, window.innerHeight);

  let grd = c.createLinearGradient(0, 0, window.innerWidth, 0);
  if (flipped) {
    grd.addColorStop(0, "turquoise");
    grd.addColorStop(0.5, "purple");
    grd.addColorStop(1, "blue");
  } else {
    grd.addColorStop(0, "blue");
    grd.addColorStop(0.5, "purple");
    grd.addColorStop(1, "turquoise");
  }
  c.fillStyle = grd;
  c.fill();
  c.stroke();
  c.closePath();

};

function Alien(_xSpot, _ySpot, _width, _lenght, _growth) {
  this.xSpot = _xSpot;
  this.ySpot = _ySpot;
  this.width = _width;
  this.lenght = _lenght;
  this.growth = _growth;
  this.faceUp = false;
  this.imgSource = this.faceUp ? alienImgFront : alienImgBack;

  this.grow = function () {
    this.width += this.growth;
    this.lenght += (this.growth * 2);
  };
  this.changeFace = function () {
    this.faceUp = !this.faceUp;
  };
}

function Computer(_xSpot, _ySpot, _width, _lenght, _growth) {
  this.xSpot = _xSpot;
  this.ySpot = _ySpot;
  this.width = _width;
  this.lenght = _lenght;
  this.growth = _growth;

  this.grow = function () {
    this.width += this.growth;
    this.lenght += this.growth;
  };
}

// CREATE OBJECTS ----------------------------------------------------------

let createLandAndClouds = function (earthX, earthY, earthR) {
  landArr[0] = new Line(earthX - (earthR / 1.5), earthY - (earthR / 2), earthR / 2, earthR / 4, "lawnGreen");
  landArr[1] = new Line(earthX - (earthR / 2.5), earthY + (earthR / 2), earthR / 2, earthR / 4, "lawnGreen");
  landArr[2] = new Line(earthX + (earthR / 3), earthY, earthR / 2, earthR / 4, "lawnGreen");
  cloudArr[0] = new Line(earthX - (earthR / 3), earthY - (earthR / 2), earthR / 4, earthR / 6, "white");
  cloudArr[1] = new Line(earthX + (earthR * 0.1), earthY - (earthR * 0.1), earthR / 4, earthR / 6, "white");
  cloudArr[2] = new Line(earthX + (earthR / 3), earthY - (earthR / 3), earthR / 4, earthR / 6, "white");
  cloudArr[3] = new Line(earthX - (earthR / 3), earthY + (earthR * 0.6), earthR / 4, earthR / 6, "white");
  cloudArr[4] = new Line(earthX - (earthR * 0.8), earthY + (earthR * 0.1), earthR / 4, earthR / 6, "white");
  cloudArr[5] = new Line(earthX + (earthR * 0.4), earthY + (earthR / 2), earthR / 4, earthR / 6, "white");
};

let createStars = function (white) {
  for (let i = 0; i < starArr.length; i++) {
    starArr[i] = new Star(i, 1, 1, white ? "white" : randomColour());
  }
};

setUp();