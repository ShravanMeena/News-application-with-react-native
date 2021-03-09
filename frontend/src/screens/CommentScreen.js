import {database} from 'faker';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {API_URL, IMG_URL} from '@env';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/common/Loader';
import UserAvatar from 'react-native-user-avatar';

export default class CommentScreen extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      news_comments: null,
      comment_loader: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchNewsDetails();
    });

    return unsubscribe;
  }

  fetchNewsDetails = async () => {
    await axios({
      method: 'get',
      url: `${`${API_URL}/news/${this.props.route.params.news_id}`}`,
    })
      .then((res) => {
        this.setState({
          news_comments: res.data.comments,
          comment_loader: false,
        });
      })
      .catch((err) => {
        console.log('Error : ' + err);
      });
  };

  commentHandler = () => {
    if (this.state.comment.length === 0) {
      alert('Please enter your commnet');
      return;
    }
    this.setState({
      comment_loader: true,
    });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      comment: this.state.comment,
      id: this.props.route.params.news_id,
    };
    axios({
      method: 'put',
      url: `${`${API_URL}/news/comment/create`}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data,
    })
      .then((res) => {
        this.setState({
          comment: ' ',
        });
        this.fetchNewsDetails();
      })
      .catch((err) => {
        this.setState({
          comment_loader: false,
        });
        console.log('Error : ' + err);
      });
  };

  deleteCommentHandler = (id) => {
    this.setState({
      comment_loader: true,
    });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = {
      id_news: this.props.route.params.news_id,
      id_comment: id,
    };
    axios({
      method: 'put',
      url: `${`${API_URL}/news/comment/delete`}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      data,
    })
      .then((res) => {
        this.setState({
          comment: ' ',
        });
        this.fetchNewsDetails();
      })
      .catch((err) => {
        this.setState({
          comment_loader: false,
        });
        console.log('Error : ' + err);
      });
  };

  _onRefresh = () => {
    this.fetchNewsDetails();
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 200);
  };

  render() {
    // for refresh page
    if (this.state.news_comments === null) {
      return <Loader />;
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.header}>
            <Text style={styles.title}>
              All <Text style={{color: '#E56924'}}>Comments</Text>
            </Text>
          </View>

          {this.state.news_comments.length === 0 ? (
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
                Write your first comment
              </Text>
            </View>
          ) : (
            <View>
              {this.state.news_comments.map((item, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'lightgray',
                      padding: 15,
                      backgroundColor: '#fff',
                      marginBottom: 10,
                    }}>
                    <View>
                      <UserAvatar size={35} name={item.comment.slice(0, 6)} />
                    </View>

                    <View style={{marginLeft: 10}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 12, marginRight: 10}}>
                          {!(userData == null) &&
                          userData.id == item.commentedBy[0] ? (
                            <Text style={{color: '#E56924'}}>
                              {userData.name}
                            </Text>
                          ) : (
                            <Text>Anonymous</Text>
                          )}
                        </Text>
                        <Text style={{color: 'lightgray', fontSize: 12}}>
                          {moment(item.updatedAt).fromNow()}
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: 'gray'}}>{item.comment}</Text>
                      </View>
                    </View>

                    {!(userData == null) &&
                    userData.id == item.commentedBy[0] ? (
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.deleteCommentHandler(item._id)}>
                          <Icon name={'trash'} size={18} color={'red'} />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        {/* loader */}
        {this.state.comment_loader ? (
          <Loader />
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'lightgray',
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}>
            <TextInput
              style={{width: '90%'}}
              placeholder="Add your comment"
              onChangeText={(value) => this.setState({comment: value})}
            />

            {userData === null ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('RegisterScreen')
                }>
                <Icon name={'paper-plane'} size={20} color={'gray'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.commentHandler()}>
                <Icon name={'paper-plane'} size={20} color={'gray'} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </SafeAreaView>
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
