import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
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

const data = [
  {title: 'Mathematics', icon: 'bandcamp'},
  {title: 'Science', icon: 'puzzle-piece'},
  {title: 'Drama', icon: 'sitemap'},
  {title: 'Art & Craft', icon: 'shield'},
  {title: 'Knowledge', icon: 'sticky-note'},
  {title: 'Language', icon: 'truck'},
];
export default class QuizScreen extends Component {
  // initiating the local state
  state = {
    questions: {
      1: 'What US city is known as the "birthplace of jazz"?',
      2: 'What is the capital of Greece?',
      3: 'What planet gave birth to Superman?',
    },
    answers: {
      1: {
        1: 'Chicago',
        2: 'New Orleans',
        3: 'New York',
      },
      2: {
        1: 'Athens',
        2: 'Patras',
        3: 'Kalamata',
      },
      3: {
        1: 'Krypton',
        2: 'Mars',
        3: 'Saturn',
      },
    },
    correctAnswers: {
      1: '2',
      2: '1',
      3: '1',
    },
    correctAnswer: 0,
    clickedAnswer: 0,
    step: 1,
    score: 0,
  };

  // the method that checks the correct answer
  checkAnswer = (answer) => {
    const {correctAnswers, step, score} = this.state;
    if (answer === correctAnswers[step]) {
      this.setState({
        score: score + 1,
        correctAnswer: correctAnswers[step],
        clickedAnswer: answer,
      });
    } else {
      this.setState({
        correctAnswer: 0,
        clickedAnswer: answer,
      });
    }
  };

  // // method to move to the next question
  // nextStep = (step) => {
  //     this.setState({
  //         step: step + 1,
  //         correctAnswer: 0,
  //         clickedAnswer: 0
  //     });
  // }

  render() {
    let {questions, answers, step, correctAnswer, clickedAnswer} = this.state;
    return (
      <ScrollView style={styles.container}>
        {/* start top header  */}
        <View style={styles.topHeaderContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 30,
            }}>
            <Text style={{color: '#555e67', fontSize: 20, marginLeft: 5}}>
              Jomnath smith
            </Text>
          </View>
        </View>
        {/* end top header  */}

        {/* start play and enjoy container  */}
        <View style={styles.playWindComtainer}>
          <View style={{flex: 2}}>
            <Image source={require('../assets/contact.png')} />
          </View>

          <View style={{flex: 2}}>
            <View>
              <Text style={styles.title}>Play &</Text>
              <Text style={styles.title}>Enjoy</Text>
            </View>

            <Text style={styles.subtitle}>
              Just awesome design. I really like your Work and nice concept
            </Text>
          </View>
        </View>
        {/* end play and enjoy container  */}

        {/* start Categories container  */}
        <View style={styles.headerCategories}>
          <Text style={[{color: '#000', fontSize: 20}]}>
            Top Quiz <Text style={[{color: '#E56924'}]}>Categories</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('QuizQuestionsScreen', {
                question: questions[step],
                answer: answers[step],
                step: step,
                checkAnswer: this.checkAnswer,
                correctAnswer: correctAnswer,
                clickedAnswer: clickedAnswer,
              });
            }}>
            <Text style={styles.subtitleForMore}>More</Text>
          </TouchableOpacity>
        </View>

        {/* flatlist */}

        <FlatList
          style={{
            marginBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.recentNews}>
                <TouchableOpacity
                //   onPress={() => {
                //     this.props.navigation.navigate('NewsDetailScreen', {
                //       news_id: item._id,
                //     });
                //   }}
                >
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name={item.icon} size={20} color={'#e0bfad'} />
                  </View>
                  <Text style={styles.recentNewsTitle}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
        />
        {/* end Categories container  */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeaderContainer: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'row',
    height: 200,
    backgroundColor: '#e0bfad',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  playWindComtainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 10,
    top: 80,
    left: 20,
    right: 20,
    bottom: 0,
    height: 180,
    padding: 15,
  },
  headerCategories: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    marginTop: 140,
    paddingBottom: 5,
    paddingHorizontal: 12,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ad9689',
    flexWrap: 'wrap',
  },
  subtitleForMore: {
    fontSize: 14,
    color: '#E56924',
    marginRight: 5,
  },

  recentNews: {
    width: '30%',
    height: hp('18%'),
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: '2%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  recentNewsTitle: {
    fontSize: 14,
    padding: 10,
    color: '#6e625c',
  },
});
