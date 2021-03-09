import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {IMG_URL} from '@env';

export default class SpotlightNews extends Component {
  render() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={this.props.data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.categroyCarousel}
                onPress={() => {
                  this.props.navigation.navigate('MoreNews', {
                    category: item.name,
                    heading: `${item.name} News`,
                  });
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 10}}
                  source={{
                    uri: `${IMG_URL}/${item.url}`,
                  }}
                  style={styles.image}>
                  <View style={styles.catDetails}>
                    <Text style={styles.catDetailsTitle}>{item.name}</Text>
                    <Text style={styles.catDetailsSubTitle}>
                      {item.description}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
        {/* categories section end*/}
      </>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 5,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#E56924',
    marginRight: 5,
  },
  categroyCarousel: {
    width: wp('70%'),
    height: hp('20%'),
    backgroundColor: 'white',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'lightgray',
    marginRight: 10,
    marginBottom: 10,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  catDetails: {
    backgroundColor: '#000000a0',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 10,
  },
  catDetailsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  catDetailsSubTitle: {
    color: 'white',
    fontSize: 14,
  },
});
