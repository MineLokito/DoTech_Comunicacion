import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

interface IMyComponentProps {}

interface IMyComponentState {
  isLoading: boolean;
  dataSource?: string;
}

export default class App extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    return fetch('http://192.168.0.14:3000/usuarios')
      .then((response) => response.text())
      .then((responseString) => {
        this.setState({
          isLoading: false,
          dataSource: responseString,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
