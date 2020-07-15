import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import params from './src/params';
import Minefield from './src/components/Minefield';
import {createMinedBoard} from './src/engine';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = this.createState();
	}

	minesAmount = () => {
		const cols = params.getColumnsAmount();
		const rows = params.getRowsAmount();
		return Math.ceil(cols * rows * params * params.difficultyLevel);
	};

	createState = () => {
		const cols = params.getColumnsAmount();
		const rows = params.getRowsAmount();
		return {
			board: createMinedBoard(rows, cols, this.minesAmount()),
		};
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.board}>
					<Minefield board={this.state.board} />
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
