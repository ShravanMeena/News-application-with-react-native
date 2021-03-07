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
import {ITEM_WIDTH, width, SPACING} from '../config/theme';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      spotlight_news: [],
      popular_news: [],
      recent_news: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchNews();
  }

  fetchNews = () => {
    axios({
      method: 'get',
      url: `${`${API_URL}/news`}`,
    })
      .then((res) => {
        const spotlightNews = res.data.filter((news) => news.isFeatured);
        const popularNews = res.data.filter((news) => news.isPopular);

        this.setState({
          spotlight_news: spotlightNews.reverse().slice(0, 4),
          popular_news: popularNews,
          recent_news: res.data.reverse().slice(0, 4),
        });
      })
      .catch((err) => {
        console.log('Error : ' + `${err.response.data}`);
      });
  };

  fetchCategories = () => {
    axios({
      method: 'get',
      url: `${`${API_URL}/category`}`,
    })
      .then((res) => {
        this.setState({
          categories: res.data.reverse().slice(0, 5),
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };

  _onRefresh = () => {
    this.fetchNews();
    this.fetchCategories();
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 200);
  };

  render() {
    if (
      this.state.categories.length === 0 ||
      this.state.spotlight_news.length === 0
    ) {
      return <Loader />;
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}>
        {/* main header with carousel start*/}
        <View style={styles.header}>
          <Text style={styles.title}>Spotlight News</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MoreNews', {
                category: 'isFeatured',
                heading: 'Spotlight News',
              });
            }}>
            <Text style={styles.subtitle}>More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // horizontal
          // pagingEnabled
          // scrollEventThrottle={20}
          // snapToInterval={width - SPACING * 2}
          // contentContainerStyle={{
          //   paddingRight: width - ITEM_WIDTH - SPACING * 2,
          // }}
          // decelerationRate={'fast'}

          keyExtractor={(item) => item.color}
          horizontal
          snapToInterval={ITEM_WIDTH + 8}
          contentContainerStyle={{
            paddingRight: width - ITEM_WIDTH - SPACING * 2,
          }}
          decelerationRate={'fast'}
          data={this.state.spotlight_news}
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
        {/* main header with carousel end */}

        {/* categories section start*/}
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
          {/* <TouchableOpacity>
            <Text style={styles.subtitle}>More</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={this.state.categories}
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

        {/* popular news section start*/}
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
          data={this.state.popular_news}
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

        {/* recent news */}
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
          data={this.state.recent_news}
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
  mainCarousel: {
    // width: wp('94%'),
    height: hp('40%'),
    // backgroundColor: 'white',
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: 'lightgray',
    // // marginRight: 10,
    // marginBottom: 5,

    width: ITEM_WIDTH,
    // height: ITEM_WIDTH * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: SPACING * 0.6,
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
