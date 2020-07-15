import React, {Component} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

import params from './src/params';
import Field from './src/components/Field';

export default class App extends Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text>Oi</Text>
				<Text>
					{params.getColumnsAmount()}x{params.getRowsAmount()}
				</Text>
				<Field />
				<Field opened />
				<Field opened nearMines={1} />
				<Field opened nearMines={2} />
				<Field opened nearMines={3} />
				<Field opened nearMines={6} />
				<Field mined />
				<Field opened mined />
				<Field opened mined exploded />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});
