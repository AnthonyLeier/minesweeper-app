import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';

import params from './src/params';
import Minefield from './src/components/Minefield';
import {createMinedBoard, cloneBoard, openField, hasExplosion, wonGame, showMines} from './src/engine';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = this.createState();
	}

	minesAmount = () => {
		const cols = params.getColumnsAmount();
		const rows = params.getRowsAmount();
		return Math.ceil(cols * rows * params.difficultyLevel);
	};

	createState = () => {
		const cols = params.getColumnsAmount();
		const rows = params.getRowsAmount();
		return {
			board: createMinedBoard(rows, cols, this.minesAmount()),
			won: false,
			lost: false,
		};
	};

	onOpenField = (row, column) => {
		const board = cloneBoard(this.state.board);
		openField(board, row, column);
		const lost = hasExplosion(board);
		const won = wonGame(board);

		if (lost) {
			showMines(board);
			Alert.alert('Perdeu seu corno');
		}
		if (won) {
			Alert.alert('Ganhou parabens');
		}

		this.setState({board, lost, won});
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.board}>
					<Minefield
						board={this.state.board}
						onOpenField={this.onOpenField}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	board: {
		alignItems: 'center',
		backgroundColor: '#AAA',
	},
});
