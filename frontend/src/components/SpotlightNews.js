import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {IMG_URL} from '@env';
import moment from 'moment';
import {ITEM_WIDTH, width, SPACING} from '../config/theme';

export default class SpotlightNews extends Component {
  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.color}
        horizontal
        snapToInterval={ITEM_WIDTH + 8}
        contentContainerStyle={{
          paddingRight: width - ITEM_WIDTH - SPACING * 2,
        }}
        decelerationRate={'fast'}
        data={this.props.data}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.mainCarousel}>
              <Image
                style={styles.mainCarouselImage}
                source={{
                  uri: `${IMG_URL}/${item.urlToImage}`,
                }}
              />
              <View style={{padding: 8}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('NewsDetailScreen', {
                      news_id: item._id,
                    });
                  }}>
                  <Text style={styles.mainCarouselTitle}>
                    {item.title.slice(0, 85)}...
                  </Text>
                </TouchableOpacity>

                <View style={styles.mainCarouselFooter}>
                  <TouchableOpacity
                    style={styles.mainCarouselCategoryHighlight}>
                    <Text style={styles.mainCarouselCategoryHighlightText}>
                      {item.category}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.mainCarouselCategoryHighlightSubText}>
                    {moment(item.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainCarousel: {
    width: wp('90%'),
    height: hp('40%'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginRight: 10,
    marginBottom: 5,
  },
  mainCarouselImage: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mainCarouselTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  mainCarouselFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainCarouselCategoryHighlight: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: '#E56924',
    borderRadius: 20,
  },
  mainCarouselCategoryHighlightText: {
    fontSize: 12,
    color: '#ffffff',
  },
  mainCarouselCategoryHighlightSubText: {
    fontSize: 12,
    color: 'gray',
  },
});
