/* @flow */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  WebView,
} from 'react-native'

import Loading from '../../components/Loading/loading'

// test
console.disableYellowBox = true

class PostDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  onLoadEnd() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { data } = this.props.navigation.state.params
    const { isLoading } = this.state

    const jsCode = `
      Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
      }
      NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
      }
      var removeTags = [
        'header',
        '#nav-below',
        '.blog-post-related',
        '.main-sidebar.sidebar',
        '.container-fluid-footer',
        '.fb-comments',
        '.post-container h3',
        '.post-content-wrapper .tags',
        '.post-info'
      ]
      for(let i = 0; i < removeTags.length; i++) {
        document.querySelector(removeTags[i]).remove();
      }
      jQuery(function() {
        jQuery("<div />", {
          html: '&shy;<style>.smartbanner{display:none !important;}</style>'
        }).appendTo("body");
      });
    `

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: data.get('origin_url') }}
          style={styles.webview}
          onLoadEnd={this.onLoadEnd.bind(this)}
          injectedJavaScript={jsCode}
          javaScriptEnabledAndroid={true}
        />

        {isLoading && <Loading />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PostDetail
