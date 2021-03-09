import {database} from 'faker';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {API_URL, IMG_URL} from '@env';
import Loader from '../components/common/Loader';

export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      result_data: [],
      recent_news: [],
      search_loader: false,
      refreshing: false,
    };
  }

  searchByTitle = async () => {
    this.setState({
      search_loader: true,
    });
    await axios({
      method: 'get',
      url: `${`${API_URL}/news/findbytitle/${this.state.title}`}`,
    })
      .then((res) => {
        this.setState({
          result_data: res.data.result,
          search_loader: false,
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
        this.setState({
          search_loader: false,
        });
      });
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    await axios({
      method: 'get',
      url: `${`${API_URL}/news`}`,
    })
      .then((res) => {
        this.setState({
          recent_news: res.data.reverse(),
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
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 50,
            borderColor: 'lightgray',
            paddingHorizontal: 20,
          }}>
          <TextInput
            style={{width: '80%'}}
            type="text"
            placeholder="Search here"
            name="title"
            onChangeText={(text) => this.setState({title: text})}
          />
          <TouchableOpacity onPress={() => this.searchByTitle()}>
            <Icon name={'search'} size={20} color={'gray'} />
          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {this.state.search_loader ? (
            <Loader />
          ) : (
            <>
              {this.state.result_data.length === 0 ? (
                <>
                  <View>
                    <Image
                      source={require('../assets/search.png')}
                      style={{
                        width: '100%',
                        height: 150,
                        resizeMode: 'contain',
                        marginVertical: 20,
                      }}
                    />

                    <Text style={{textAlign: 'center', marginBottom: 50}}>
                      Search result appear here
                    </Text>
                  </View>

                  <View style={styles.header}>
                    <Text style={styles.title}>Recommended for you</Text>
                  </View>

                  {this.state.recent_news.length === 0 ? (
                    <Loader />
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={this.state.recent_news.slice(0, 4)}
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
                                this.props.navigation.navigate(
                                  'NewsDetailScreen',
                                  {
                                    news_id: item._id,
                                  },
                                );
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
                  )}
                </>
              ) : (
                <>
                  <View style={styles.header}>
                    <Text style={styles.title}>
                      View all {this.state.result_data.length} search results
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({result_data: []})}>
                      <Text style={styles.subtitle}>clear all</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    style={{paddingVertical: 20}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.result_data}
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
                              this.props.navigation.navigate(
                                'NewsDetailScreen',
                                {
                                  news_id: item._id,
                                },
                              );
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
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 20,
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
