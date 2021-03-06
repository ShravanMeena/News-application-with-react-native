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
import {API_URL, IMG_URL} from '@env';
import axios from 'axios';
import Loader from '../components/common/Loader';

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    try {
      await axios({
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
    } catch (error) {}
  };

  _onRefresh = () => {
    this.fetchCategories();
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 200);
  };

  render() {
    if (this.state.categories.length === 0) {
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
        {/* categories section start*/}
        <View style={styles.header}>
          <Text style={styles.title}>
            Pick the <Text style={{color: '#E56924'}}>Category</Text>
          </Text>
          {/* <TouchableOpacity>
            <Text style={styles.subtitle}>Category</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  categroyCarousel: {
    width: '100%',
    height: hp('22%'),
    backgroundColor: 'white',
    borderRadius: 10,
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
    padding: 15,
  },
  catDetailsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  catDetailsSubTitle: {
    color: 'white',
    fontSize: 14,
  },
});
