import React from 'react';
import { WebView } from 'react-native';

/**
 * webview for github repositories
 */
export default class Web extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Render function
   * @return {ReactDOM}
   */
  render() {
    return (
      <WebView
        source={{ uri: this.props.navigation.state.params.url }}
      />
    );
  }
};