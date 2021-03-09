import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {API_URL} from '@env';
import Loader from '../components/common/Loader';
import Carousel from '../components/carousel/Carousel';
import SpotlightNews from '../components/SpotlightNews';
import Categories from '../components/Categories';
import PopularNews from '../components/PopularNews';
import RecentNews from '../components/RecentNews';

const dummyData = [
  {
    title: 'Anise Aroma Art Bazar',
    url:
      'https://images.pexels.com/photos/4727921/pexels-photo-4727921.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 1,
  },
  {
    title: 'Food inside a Bowl',
    url:
      'https://images.pexels.com/photos/1058276/pexels-photo-1058276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 2,
  },
  {
    title: 'Vegatable Salad',
    url:
      'https://images.pexels.com/photos/718307/pexels-photo-718307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 3,
  },
];

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
      <>
        <View style={styles.TopHeader}>
          <Text style={[styles.title, {fontWeight: 'bold'}]}>
            Updated<Text style={{color: '#E56924'}}>Khabarenn</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SearchScreen', {});
            }}>
            <Icon name={'search'} size={20} color={'gray'} />
          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={styles.container}>
          <View style={{marginBottom: 20}}>
            <Carousel data={dummyData} />
          </View>
          <SpotlightNews
            data={this.state.spotlight_news}
            navigation={this.props.navigation}
          />
          <Categories
            data={this.state.categories}
            navigation={this.props.navigation}
          />
          <PopularNews
            data={this.state.popular_news}
            navigation={this.props.navigation}
          />
          <RecentNews
            data={this.state.recent_news}
            navigation={this.props.navigation}
          />
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
  TopHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#bbb',
    elevation: 1,
  },
});
