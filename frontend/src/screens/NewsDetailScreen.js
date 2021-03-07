import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Share,
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

const size = 25;
const color = 'gray';
import Loader from '../components/common/Loader';
import BackArrow from '../components/common/BackArrow';

export default class NewsDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      news_details: [],
      myBookmark: [],
      refreshing: false,
      like_loader: false,
    };
  }
  componentDidMount() {
    // this.fetchNewsDetails();

    var getBookmark = JSON.parse(localStorage.getItem('myBookmark'));

    if (!(getBookmark === null)) {
      var findValues = getBookmark.values();
      for (let elements of findValues) {
        this.state.myBookmark.push(elements);
      }
    }
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchNewsDetails();
    });

    return unsubscribe;
  }

  addToBookmark = (data) => {
    var myBookmarkData = [];
    myBookmarkData = [...this.state.myBookmark, data];
    localStorage.setItem('myBookmark', JSON.stringify(myBookmarkData));
    this.fetchNewsDetails();
  };

  removeToBookmark = () => {
    var item = this.state.news_details;
    var getBookmark = JSON.parse(localStorage.getItem('myBookmark'));
    const myBookmark = getBookmark.filter(function (obj) {
      return obj._id !== item._id;
    });
    localStorage.setItem('myBookmark', JSON.stringify(myBookmark));
    this.fetchNewsDetails();
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'this is for test',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  fetchNewsDetails = () => {
    axios({
      method: 'get',
      url: `${`${API_URL}/news/${this.props.route.params.news_id}`}`,
    })
      .then((res) => {
        this.setState({
          news_details: res.data,
        });
      })
      .catch((err) => {
        console.log('Error : ' + `${err.response.data}`);
      });
  };

  likeHandler = (id) => {
    this.setState({
      like_loader: true,
    });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      id,
    };
    axios({
      method: 'put',
      url: `${`${API_URL}/news/like/success`}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data,
    })
      .then((res) => {
        this.fetchNewsDetails();
        this.setState({
          like_loader: false,
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
        this.setState({
          like_loader: false,
        });
      });
  };

  disLikeHandler = (id) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      id,
    };
    axios({
      method: 'put',
      url: `${`${API_URL}/news/dislike/success`}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data,
    })
      .then((res) => {
        this.fetchNewsDetails();
        console.log(res.data);
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };

  _onRefresh = () => {
    this.fetchNewsDetails();
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 200);
  };

  render() {
    if (this.state.news_details.length === 0) {
      return <Loader />;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    const myBookmark = JSON.parse(localStorage.getItem('myBookmark'));
    const item = this.state.news_details;

    // for screen reload

    return (
      <>
        <BackArrow goBack={() => this.props.navigation.goBack()} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={styles.container}>
          <ImageBackground
            style={{
              width: '100%',
              height: hp('30%'),
              borderRadius: 10,
              resizeMode: 'cover',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
            imageStyle={{borderRadius: 10}}
            source={{
              uri: `${IMG_URL}/${item.urlToImage}`,
            }}>
            <TouchableOpacity onPress={this.onShare}>
              <Icon
                name={'share-alt'}
                size={size}
                color={'#E56924'}
                style={{marginVertical: 15, marginHorizontal: 20}}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{padding: 10}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <TouchableOpacity style={styles.catButton}>
                <Text style={{color: '#000', fontSize: 14}}>
                  {item.category}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {userData === null ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('RegisterScreen')
                    }>
                    <Icon name={'heart-o'} size={size} color={color} />
                  </TouchableOpacity>
                ) : (
                  <>
                    {this.state.like_loader ||
                    item.likers.includes(userData.id) ? (
                      <TouchableOpacity
                        onPress={() => this.disLikeHandler(item._id)}>
                        <Icon name={'heart'} size={size} color={color} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.likeHandler(item._id)}>
                        <Icon name={'heart-o'} size={size} color={color} />
                      </TouchableOpacity>
                    )}
                  </>
                )}

                {this.state.like_loader ||
                myBookmark == null ||
                myBookmark.filter((news) => news._id == item._id).length ===
                  0 ? (
                  <TouchableOpacity
                    onPress={() => this.addToBookmark(item)}
                    style={{marginLeft: 10}}>
                    <Icon name={'bookmark-o'} size={size} color={color} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.removeToBookmark(item)}
                    style={{marginLeft: 10}}>
                    <Icon name={'bookmark'} size={size} color={color} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View>
              <Text>
                <Icon name={'clock-o'} size={size} color={color} />{' '}
                <Text style={{color: color}}>
                  {moment(item.updatedAt).format('DD MMMM YY')}
                </Text>
              </Text>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>
                {item.title}
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>
                  <Icon name={'heart'} size={16} color={color} />{' '}
                  <Text style={{color: color}}>
                    {item.likers.length} People like this
                  </Text>
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Comments', {
                      news_id: item._id,
                    });
                  }}
                  style={{
                    marginLeft: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 5,
                    backgroundColor: '#E56924',
                    borderRadius: 5,
                  }}>
                  <Text>
                    <Icon name={'comment-o'} size={20} color={'#fff'} />{' '}
                    <Text style={{color: '#fff'}}>Comment</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  letterSpacing: 0.2,
                  paddingVertical: 25,
                }}>
                {item.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  catButton: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: 'lightgray',
    borderRadius: 20,
  },
});
