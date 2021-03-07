import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {API_URL, IMG_URL} from '@env';
import moment from 'moment';
import Loader from '../components/common/Loader';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []cd ,
      refreshing: false,
      remove: false,
    };
  }

  getBookmarkData = () => {
    var getBookmark = JSON.parse(localStorage.getItem('myBookmark'));
    this.setState({
      news: getBookmark,
    });
  };
  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getBookmarkData();
    });
    return unsubscribe;
  }

  removeToBookmark = (id) => {
    var getBookmark = JSON.parse(localStorage.getItem('myBookmark'));
    const myBookmark = getBookmark.filter(function (obj) {
      return obj._id !== id;
    });
    localStorage.setItem('myBookmark', JSON.stringify(myBookmark));
    this._onRefresh();
  };

  _onRefresh = () => {
    this.getBookmarkData();
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 300);
  };

  clearAllHandler = () => {
    localStorage.removeItem('myBookmark');
    this._onRefresh();
  };

  render() {
    const getBookmark = JSON.parse(localStorage.getItem('myBookmark'));
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}>
        {/* popular news section start*/}
        <View style={styles.header}>
          <Text style={styles.title}>
            My <Text style={{color: '#E56924'}}>Saved</Text>
          </Text>
          <TouchableOpacity onPress={() => this.clearAllHandler()}>
            <Text style={styles.subTitle}>Clear all</Text>
          </TouchableOpacity>
        </View>
        {getBookmark == null || getBookmark.length === 0 ? (
          <View>
            <Image
              source={require('../assets/search.png')}
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'contain',
                marginVertical: 100,
              }}
            />

            <Text
              style={{
                textAlign: 'center',
                marginBottom: 50,
                color: '#E56924',
              }}>
              Your saved news appear here
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.news}
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

                      <Text
                        style={
                          (styles.mainCarouselCategoryHighlightText,
                          {color: '#E56924'})
                        }>
                        {item.category}
                      </Text>
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
                      {/* <Text>{item.urlToImage}</Text> */}
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
                      <Text>
                        {' '}
                        <Icon name={'clock-o'} size={16} color={'gray'} />{' '}
                        {moment(item.updatedAt).format('DD MMMM YY')}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.removeToBookmark(item._id)}>
                      <Text>
                        <Icon name={'bookmark'} size={20} color={'gray'} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        )}
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
    paddingTop: 15,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
  },

  subTitle: {
    color: '#E56924',
    fontSize: 14,
    marginRight: 10,
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
