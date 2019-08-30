import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { apiSetup } from '@config/api';
import AppNavigator from '@components/AppNavigator';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    apiSetup(dispatch);
  }

  render() {
    return <AppNavigator />;
  }
}

const MyAppWithOverlay = __DEV__ ? Reactotron.overlay(App) : App;

export default connect()(MyAppWithOverlay);
