import React, {Component} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

import params from './src/params';

export default class App extends Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text>Oi</Text>
				<Text>{params.getColumnsAmount()}x{params.getRowsAmount()}</Text>
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
