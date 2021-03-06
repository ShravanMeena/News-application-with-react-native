import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {API_URL, IMG_URL} from '@env';

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  loginHandler = () => {
    const {email, password} = this.state;
    const data = {
      email,
      password,
    };
    axios({
      method: 'post',
      data,
      url: `${`${API_URL}/users/login`}`,
    })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.props.navigation.navigate('HomeScreen');
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };
  render() {
    return (
      <SafeAreaView style={(styles.container, {padding: 20})}>
        <Text style={{fontSize: 24, fontWeight: '700', marginTop: 5}}>
          Login Your
          <Text style={{color: '#E56924'}}> Account</Text>
        </Text>
        <View style={{paddingVertical: 30}}>
          <View>
            <Text style={styles.textInputTitle}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => this.setState({email: value})}
              placeholder="email"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text style={styles.textInputTitle}>Password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              onChangeText={(value) => this.setState({password: value})}
              placeholder="Password"
              keyboardType="email-address"
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.loginHandler()}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 40,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#E56924',
                backgroundColor: '#E56924',
                marginTop: 20,
              }}>
              <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#E56924',
              paddingBottom: 20,
            }}>
            Or
          </Text>

          <Text>
            Don’t have an account yet?{' '}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterScreen')}>
              <Text style={{color: '#E56924'}}>Register here.</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  textInputTitle: {
    fontSize: 18,
    paddingBottom: 4,
    paddingLeft: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d7d9d7',
    padding: 7,
    marginBottom: 12,
    borderRadius: 10,
    paddingLeft: 16,
  },
});
