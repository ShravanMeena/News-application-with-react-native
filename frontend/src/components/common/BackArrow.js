import React, {Component} from 'react';
import {SafeAreaView, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BackArrow extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={this.props.goBack}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              style={{marginVertical: 12, marginHorizontal: 10}}
              name={'angle-left'}
              size={30}
              color={'black'}
            />

            {this.props.title ? (
              <Text style={{fontSize: 20}}>{this.props.title}</Text>
            ) : (
              <Text style={{fontSize: 20}}>Back</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Icon
            style={{marginVertical: 10, marginHorizontal: 10}}
            name={'share'}
            size={24}
            color={'black'}
          /> */}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
