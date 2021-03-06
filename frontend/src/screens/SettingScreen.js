import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const size = 20;
const color = 'gray';
export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }
  // logoutHandler = () => {
  //   localStorage.removeItem('userData');
  //   this.props.navigation.navigate('SettingScreen');
  // };

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 200);
  };
  render() {
    const userData = localStorage.getItem('userData');
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}>
        {/* account setting start*/}
        <View style={styles.mainMenuContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Account <Text style={{color: '#E56924'}}>Setting</Text>
            </Text>
          </View>
        </View>
        {/* account setting start*/}
        <View style={styles.mainMenuContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Help</Text>
          </View>
          {/* inner account seting */}
          <View style={styles.menuContainer}>
            <View style={styles.menuContainerLeft}>
              <Icon name={'envelope-o'} size={size} color={color} />
              <Text style={styles.menuContainerLeftText}>Contact Us</Text>
            </View>

            <View>
              <Icon name={'angle-right'} size={size} color={color} />
            </View>
          </View>
          {/* inner ac seting end */}

          {/* inner account seting */}
          <View style={styles.menuContainer}>
            <View style={styles.menuContainerLeft}>
              <Icon name={'question-circle-o'} size={size} color={color} />
              <Text style={styles.menuContainerLeftText}>FAQ</Text>
            </View>

            <View>
              <Icon name={'angle-right'} size={size} color={color} />
            </View>
          </View>
          {/* inner ac seting end */}
          {/* inner account seting */}
          <View style={styles.menuContainer}>
            <View style={styles.menuContainerLeft}>
              <Icon name={'pencil-square-o'} size={size} color={color} />
              <Text style={styles.menuContainerLeftText}>Give a feedback</Text>
            </View>

            <View>
              <Icon name={'angle-right'} size={size} color={color} />
            </View>
          </View>
          {/* inner ac seting end */}
        </View>
        {/* account setting end*/}

        {/* account setting start*/}
        <View style={styles.mainMenuContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Contact Channels</Text>
          </View>
          {/* inner account seting */}
          <View style={styles.menuContainer}>
            <View style={styles.menuContainerLeft}>
              <Icon name={'globe'} size={size} color={color} />
              <Text style={styles.menuContainerLeftText}>Official Website</Text>
            </View>

            <View>
              <Icon name={'angle-right'} size={size} color={color} />
            </View>
          </View>
          {/* inner ac setting end */}

          {/* inner account seting */}
          <View style={styles.menuContainer}>
            <View style={styles.menuContainerLeft}>
              <Icon name={'instagram'} size={size} color={color} />
              <Text style={styles.menuContainerLeftText}>Instagram</Text>
            </View>

            <View>
              <Icon name={'angle-right'} size={size} color={color} />
            </View>
          </View>
          {/* inner ac setting end */}

          {/* inner account seting */}
          <View style={styles.menuContainer}>
            <View style={styles.menuContainerLeft}>
              <Icon name={'facebook'} size={size} color={color} />
              <Text style={styles.menuContainerLeftText}>Facebook</Text>
            </View>

            <View>
              <Icon name={'angle-right'} size={size} color={color} />
            </View>
          </View>
          {/* inner ac setting end */}
        </View>
        {/* account setting end*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },

  header: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainMenuContainer: {
    paddingHorizontal: 15,
  },
  menuContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#dce0dd',
    paddingVertical: 20,
  },
  menuContainerLeft: {display: 'flex', flexDirection: 'row'},
  menuContainerLeftText: {marginLeft: 20, fontSize: 16},
});
