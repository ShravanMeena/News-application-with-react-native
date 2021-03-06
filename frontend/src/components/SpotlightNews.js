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

export default class SpotlightNews extends Component {
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
          spotlight_news: spotlightNews,
          popular_news: popularNews,
          recent_news: res.data.reverse(),
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };

  fetchCategories = () => {
    axios({
      method: 'get',
      url: `${`${API_URL}/category`}`,
    })
      .then((res) => {
        this.setState({
          categories: res.data,
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };

  _onRefresh = () => {
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
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
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
                    {moment(item.updatedAt).fromNow()}
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
    marginBottom: 15,
  },
  recentNewsImg: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  recentNewsTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
});
