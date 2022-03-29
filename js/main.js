/**
 * Created by LoLo on 30/03/2022.
 */

const canvasParams = {
	height: 800,
	width: 800,
	cellsCountX: 10,
	cellsCountY: 10,
	cellSizeX: null,
	cellSizeY: null
};

const colorsArray = ['red', 'purple', 'green', 'cyan', 'orange', 'yellow', 'blue','gray'];

const maxColors = 8;
let canvas;
let ctx;

const grid = new Array(canvasParams.cellsCountX).fill(0).map(() => new Array(canvasParams.cellsCountY).fill(0));
let neighborsArray = [];
let neighborsArrayBuffer = [];


(() => {
	canvas = document.getElementById("main-canvas");
	ctx = canvas.getContext("2d");
	initCanvasParams();
	initGrid();
	checkNeibghbors();
	highlightGrid();
})();

function findSimalarNeighbor(x, y) {
	let key;
	if (x < canvasParams.cellsCountX - 1 && grid[x + 1][y] === grid[x][y]) {
		// key = `${x + 1},${y}, ${colorsArray[grid[x + 1][y]]}`;
		key = `${x + 1},${y}`;
		if (neighborsArrayBuffer.indexOf(key) < 0) {
			neighborsArrayBuffer.push(key);
			findSimalarNeighbor(x + 1, y);
		}
	}

	if (x > 0 && grid[x - 1][y] === grid[x][y]) {
		// key = `${x - 1},${y}, ${colorsArray[grid[x - 1][y]]}`;
		key = `${x - 1},${y}`;
		if (neighborsArrayBuffer.indexOf(key) < 0) {
			neighborsArrayBuffer.push(key);
			findSimalarNeighbor(x - 1, y);
		}
	}

	if (y < canvasParams.cellsCountY - 1 && grid[x][y + 1] === grid[x][y]) {
		// key = `${x},${y + 1}, ${colorsArray[grid[x][y + 1]]}`;
		key = `${x},${y + 1}`;
		if (neighborsArrayBuffer.indexOf(key) < 0) {
			neighborsArrayBuffer.push(key);
			findSimalarNeighbor(x, y + 1);
		}
	}

	if (y > 0 && grid[x][y - 1] === grid[x][y]) {
		// key = `${x},${y - 1}, ${colorsArray[grid[x][y - 1]]}`;
		key = `${x},${y - 1}`;
		if (neighborsArrayBuffer.indexOf(key) < 0) {
			neighborsArrayBuffer.push(key);
			findSimalarNeighbor(x , y - 1);
		}
	}
}

function checkNeibghbors() {
	for (let x = 0; x < canvasParams.cellsCountX; x++) {
		for (let y = 0; y < canvasParams.cellsCountY; y++) {
			findSimalarNeighbor(x, y);
			if (neighborsArray.length < neighborsArrayBuffer.length) {
				neighborsArray = [...neighborsArrayBuffer];
			}
			neighborsArrayBuffer = [];
		}
	}
	console.log(neighborsArray);
}


function initCanvasParams() {
	canvasParams.cellSizeX = canvasParams.width / canvasParams.cellsCountX;
	canvasParams.cellSizeY = canvasParams.width / canvasParams.cellsCountY;
}

function initGrid() {
	for(let x = 0; x < canvasParams.cellsCountX; x++) {
		for(let y = 0; y < canvasParams.cellsCountY; y++) {
			ctx.beginPath();
			grid[x][y] = randomColor();
			ctx.fillStyle = colorsArray[grid[x][y]];
			ctx.fillRect(x * canvasParams.cellSizeX, y * canvasParams.cellSizeY, canvasParams.cellSizeX, canvasParams.cellSizeY);

			ctx.strokeStyle = 'white';
			ctx.rect(x * canvasParams.cellSizeX, y * canvasParams.cellSizeY, canvasParams.cellSizeX, canvasParams.cellSizeY);
			ctx.stroke();

		}
	}
	console.log(grid);
}

function highlightGrid() {
	neighborsArray.forEach(cell => {
		cell = cell.split(',');
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 4;
		ctx.rect(+cell[0] * canvasParams.cellSizeX, +cell[1] * canvasParams.cellSizeY, canvasParams.cellSizeX, canvasParams.cellSizeY);
		ctx.stroke();
		ctx.font = "18px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText(`${neighborsArray.length}`, +cell[0] * canvasParams.cellSizeX + canvasParams.cellSizeX/2 - 5, +cell[1] * canvasParams.cellSizeY + canvasParams.cellSizeY/2 + 5);
	});

}

function randomColor() {
	return Math.floor(Math.random() * maxColors);
}