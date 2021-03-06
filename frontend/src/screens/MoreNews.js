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
      news: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    await axios({
      method: 'get',
      url: `${`${API_URL}/news`}`,
    })
      .then((res) => {
        const {category} = this.props.route.params;
        const spotlightNews = res.data.filter((news) => news.isFeatured);
        const popularNews = res.data.filter((news) => news.isPopular);
        const categoryViseNews = res.data.filter(
          (news) => news.category === category,
        );

        if (category == 'isFeatured') {
          this.setState({
            news: spotlightNews,
          });
          return;
        }
        if (category == 'isPopular') {
          this.setState({
            news: popularNews,
          });
          return;
        }

        if (category == 'isRecent') {
          this.setState({
            news: res.data.reverse(),
          });
          return;
        }
        this.setState({
          news: categoryViseNews,
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };

  _onRefresh = () => {
    this.fetchNews();
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 200);
  };

  render() {
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
          <Text style={styles.title}>{this.props.route.params.heading}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.subtitle}>More</Text>
          </TouchableOpacity> */}
        </View>

        {this.state.news.length === 0 ? (
          <View>
            <Image
              source={require('../assets/contact.png')}
              style={{
                width: '100%',
                height: 150,
                resizeMode: 'contain',
                marginVertical: 50,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                marginTop: 50,
              }}>
              Opps{' '}
              <Text style={{color: '#E56924'}}>
                {this.props.route.params.heading}
              </Text>{' '}
              not available
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.news}
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
                        {moment(item.updatedAt).format('MMMM YY')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        )}
        {/* main header with carousel end */}
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
  },
  mainCarousel: {
    width: '100%',
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
