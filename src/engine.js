const createBoard = (rows, columns) => {	
	//Cria o array responsável pelo tabuleiro
	return Array(rows).fill(0).map((_, row) => {
		return Array(columns).fill(0).map((_, column) => {
			return {
				row,
				column,
				opened: false,
				flagged: false,
				mined: false,
				exploded: false,
				nearMines: 0,
			};
		});
	});
};

const spreadMines = (board, minesAmount) => {
	//Espalha minas no tabuleiro
	const rows = board.length;
	const columns = board[0].length;
	let minesPlanted = 0;

	while (minesPlanted < minesAmount) {
		const rowSelected = parseInt(Math.random() * rows, 10);
		const columnSelected = parseInt(Math.random() * columns, 10);

		if (!board[rowSelected][columnSelected].mined) {
			board[rowSelected][columnSelected].mined = true;
			minesPlanted++;
		}
	}
};

const createMinedBoard = (rows, columns, minesAmount) => {
	//Combina as duas outras funções retornando o tabuleiro pronto
	const board = createBoard(rows, columns);
	spreadMines(board, minesAmount);
	return board;
};

const cloneBoard = board => {
	//Faz uma cópia do tabuleiro
	return board.map(rows => {
		return rows.map(field => {
			return {...field};
		});
	});
};

const getNeighbors = (board, row, column) => {
	//Pega todos os vizinhos de uma posição que são validos
	const neighbors = [];
	const rows = [row - 1, row, row + 1];
	const columns = [column - 1, column, column + 1];
	rows.forEach(r => {
		columns.forEach(c => {
			const different = r != row || c != column;
			const validRow = r >= 0 && r < board.length;
			const validColumn = c >= 0 && c < board[0].length;
			if (different && validRow && validColumn) neighbors.push(board[r][c]);
		});
	});
	return neighbors;
};

const safeNeighborhood = (board, row, column) => {
	const safes = (result, neighbor) => result && !neighbor.mined;
	return getNeighbors(board, row, column).reduce(safes, true);
};

const openField = (board, row, column) => {
	const field = board[row][column];
	if (!field.opened) {
		field.opened = true;
		if (field.mined) {
			field.exploded = true;
		} else if (safeNeighborhood(board, row, column)) {
			getNeighbors(board, row, column).forEach(n =>openField(board, n.row, n.column));
		} else {
			const neighbors = getNeighbors(board, row, column);
			field.nearMines = neighbors.filter(n => n.mined).length;
		}
	}
};

const getAllFields = board => [].concat(...board);

const hasExplosion = board => getAllFields(board).filter(field => field.exploded).length > 0;

const pending = field => (field.mined && !field.flagged) || (!field.mined && !field.opened);

const wonGame = board => getAllFields(board).filter(pending).length === 0;

const showMines = board => getAllFields(board).filter(field => field.mined).forEach(field => (field.opened = true));


export {
	createMinedBoard,
	cloneBoard,
	openField,
	hasExplosion,
	wonGame,
	showMines,
};
