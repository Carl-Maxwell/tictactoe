
document.addEventListener("DOMContentLoaded", function(event) {
  window.WIDTH  = 800;
  window.HEIGHT = 600;

  window.GRID_WIDTH  = 140 * 1;
  window.GRID_HEIGHT = 190 * 1;

  window.app = new PIXI.Application({ width: WIDTH, height: HEIGHT });

  app.view.style = "margin: 0 auto; display: block;";

  document.body.appendChild(app.view);

  window.board = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];

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
}

function play_in_square(square, gamespace) {
  if (board[gamespace.x][gamespace.y]) {
    // space is occupied
    alert('space is occupied');
    return;
  }

  var mark = "x";

  create_mark(square, mark);
  board[gamespace.x][gamespace.y] = mark;

  is_victory(mark);
}

function is_victory(mark) {
  var runs = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (var i in runs) {
    var run = runs[i];

    var check_square = function(point) {
      return board[point[0]][point[1]] == mark;
    }

    if (run.every(check_square)) {
      alert(mark + " has achieved victory!");
      return true;
    }

    if (board[2][0]) {debugger}
  }

  return false;
}

function mousedownEventHandler(e) {
  var left_mouse_button = 0;

  if (e.data.button == left_mouse_button) {
    var squares = [
      // top row
      {x: 150, y: 122, width: 123, height: 107},
      {x: 314, y: 113, width: 123, height: 107},
      {x: 473, y: 125, width: 123, height: 107},
      // middle row
      {x: 150, y: 245, width: 123, height: 107},
      {x: 329, y: 246, width: 123, height: 107},
      {x: 482, y: 248, width: 123, height: 107},
      // bottom row
      {x: 150, y: 359, width: 123, height: 107},
      {x: 325, y: 373, width: 123, height: 107},
      {x: 491, y: 386, width: 123, height: 107}
    ];

    var point = { x: e.data.global.x, y: e.data.global.y };
    // console.log("point: ", point);

    for (var i in squares) {
      var square = squares[i];
      if (point_in_rect(point, square)) {
        var x = i % 3;
        var y = (i - x) / 3;

        play_in_square(square, {x: x, y: y});
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
