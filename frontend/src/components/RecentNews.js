import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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
          <Text style={styles.title}>Recent News</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MoreNews', {
                category: 'isRecent',
                heading: 'Recent News',
              });
            }}>
            <Text style={styles.subtitle}>More</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{
            marginBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.recentNews}>
                <Image
                  style={styles.recentNewsImg}
                  source={{
                    uri: `${IMG_URL}/${item.urlToImage}`,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('NewsDetailScreen', {
                      news_id: item._id,
                    });
                  }}>
                  <Text style={styles.recentNewsTitle}>
                    {item.title.slice(0, 40)}...
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
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

  recentNews: {
    width: '49%',
    height: hp('25%'),
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: '2%',
    marginBottom: '2%',
  },
  recentNewsImg: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  recentNewsTitle: {
    fontSize: 14,
    fontWeight: '700',
    padding: 10,
  },
});
