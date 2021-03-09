import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackArrow from '../components/common/BackArrow';

const data = [
  {title: 'Mathematics', icon: 'bandcamp', isSelected: false},
  {title: 'Science', icon: 'puzzle-piece', isSelected: true},
  {title: 'Drama', icon: 'sitemap', isSelected: false},
  {title: 'Art & Craft', icon: 'shield', isSelected: false},
  {title: 'Knowledge', icon: 'sticky-note', isSelected: false},
  {title: 'Language', icon: 'truck', isSelected: false},
];
export default class QuizQuestionsScreen extends Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/bgquiz.jpg')}
          style={styles.image}>
          <View style={styles.text}>
            <View
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Text style={styles.textTitle}>Quiz Result</Text>
              <Image
                source={require('../assets/Trophy.png')}
                style={{
                  width: 200,
                  height: 220,
                  resizeMode: 'contain',
                  marginVertical: 20,
                }}
              />

              <Text
                style={{fontSize: 30, letterSpacing: 0.5, color: '#d4794c'}}>
                Congratulations
              </Text>
              <Text style={{fontSize: 15, color: '#bbb', textAlign: 'center'}}>
                Just awesome design. I really like your Work and nice concept
              </Text>

              <Text style={styles.textSubTitle}>Your Score</Text>

              <Text style={styles.textSubTitleRes}>
                20<Text style={{color: '#ccc'}}> /20</Text>
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor: '#bbb',
                      marginRight: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <Icon name="share-alt" size={16} />

                  <Text style={{marginLeft: 5}}>Share Result</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.nextBtnText}>Take New Quiz</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => {
                  this.props.navigation.navigate('Home', {});
                }}>
                <Icon name="times-circle" size={30} color={'#d4794c'} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 24,
    color: '#d4794c',
    textAlign: 'center',
  },

  textSubTitle: {
    letterSpacing: 0.2,
    paddingTop: 25,
    fontSize: 14,
    color: '#8c766b',
  },
  textSubTitleRes: {
    fontSize: 40,
    color: 'green',
    textAlign: 'center',
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#d4794c',
    borderRadius: 10,
  },
  nextBtnText: {
    color: '#fff',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
