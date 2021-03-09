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
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {IMG_URL} from '@env';

export default class SpotlightNews extends Component {
  render() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Popular News</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MoreNews', {
                category: 'isPopular',
                heading: 'Popular News',
              });
            }}>
            <Text style={styles.subtitle}>More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.popularNewsContainer}>
                <View style={styles.popularNewsContainerLeft}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('NewsDetailScreen', {
                          news_id: item._id,
                        });
                      }}>
                      <Text style={styles.popularNewsContainerLeftTitle}>
                        {item.title.slice(0, 90)}...
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    // style={styles.popularNewsContainerHighlight}
                    >
                      <Text
                        style={
                          (styles.mainCarouselCategoryHighlightText,
                          {color: '#E56924'})
                        }>
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{width: '30%'}}>
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        marginLeft: 20,
                      }}
                      source={{
                        uri: `${IMG_URL}/${item.urlToImage}`,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <View>
                    <Text style={{color: 'gray'}}>
                      {' '}
                      <Icon name={'clock-o'} size={16} color={'gray'} />{' '}
                      {moment(item.updatedAt).format('D MMMM YY')}
                    </Text>
                  </View>

                  <View>
                    <Text>
                      <Icon name={'heart'} size={16} color={'gray'} />{' '}
                      {item.likers.length}
                    </Text>
                  </View>
                </View>
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

  popularNewsContainer: {
    height: hp('22%'),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
  },

  popularNewsContainerLeft: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    padding: 4,
  },
  popularNewsContainerLeftTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  popularNewsContainerHighlight: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: 'gray',
    borderRadius: 20,
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
