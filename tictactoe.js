
document.addEventListener("DOMContentLoaded", function(event) {
  window.WIDTH  = 800;
  window.HEIGHT = 600;

  window.GRID_WIDTH  = 140 * 1;
  window.GRID_HEIGHT = 190 * 1;

  window.app = new PIXI.Application({ width: WIDTH, height: HEIGHT });

  app.view.style = "margin: 0 auto; display: block;";

  document.body.appendChild(app.view);

  setup_game();
});

function setup_game() {
  window.grid = new PIXI.Sprite.fromImage(asset_path("grid"));

  grid.x = WIDTH /2.0 - 522/2.0;
  grid.y = HEIGHT/2.0 - 464/2.0;

  // TODO get this to dynamically grab grid.width &c

  app.stage.addChild(grid);

  //

  app.stage.interactive = true;
  app.stage.hitArea     = app.screen;
  app.stage.pointerdown = mousedownEventHandler;
  app.stage.pointerup   = mouseupEventHandler;
}

function create_mark(square, x_or_o) {
  window.mark = new PIXI.Sprite.fromImage(asset_path(x_or_o));

  mark.x = square.x;
  mark.y = square.y;

  app.stage.addChild(mark);

  return mark;
}

function play_in_square(square) {
  // TODO if the space is unoccupied
  create_mark(square, "o");
  // TODO check for victory
}

function mousedownEventHandler(e) {
  // 0 is left mouse button
  if (e.data.button == 0) {
    console.log("x: " + e.data.global.x, "y: " + e.data.global.y);

    var squares = [
      // left column
      {x: 150, y: 122, width: 123, height: 107},
      {x: 150, y: 245, width: 123, height: 107},
      {x: 150, y: 359, width: 123, height: 107},
      // middle column
      {x: 314, y: 113, width: 123, height: 107},
      {x: 329, y: 246, width: 123, height: 107},
      {x: 325, y: 373, width: 123, height: 107},
      // right column
      {x: 473, y: 125, width: 123, height: 107},
      {x: 473, y: 248, width: 123, height: 107},
      {x: 473, y: 245, width: 123, height: 107}
    ];

    var point = { x: e.data.global.x, y: e.data.global.y };

    for (var i in squares) {
      var square = squares[i];
      if (point_in_rect(point, square)) {
        play_in_square(square);
      }
    }
  }
}

function mouseupEventHandler(e) {

}

function point_in_rect(point, rect) {
  var left   = rect.x;
  var right  = rect.x + rect.width;
  var top    = rect.y;
  var bottom = rect.y + rect.height;

  return (point.x > left && point.x < right) &&
    (point.y > top && point.y < bottom);
}

function asset_path(name) {
  var sprite_names = {
    o    : "O.svg",
    x    : "X.svg",
    grid : "grid.svg"
  };

  return "assets/" + sprite_names[name];
}
