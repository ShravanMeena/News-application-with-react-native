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

  componentDidMount() {}
  render() {
    const item = true;
    let {
      question,
      step,
      correctAnswer,
      clickedAnswer,
    } = this.props.route.params;
    let answers = Object.keys(this.props.route.params.answer).map(
      (qAnswer, i) => (
        <TouchableOpacity
          onPress={() => this.props.route.params.checkAnswer(qAnswer)}
          key={qAnswer}
          style={[
            styles.checkboxContainer,

            correctAnswer === qAnswer
              ? {borderColor: '#d6b2a1', backgroundColor: 'green'}
              : clickedAnswer === qAnswer
              ? {borderColor: 'red', backgroundColor: 'red'}
              : null,
          ]}>
          <Text>{this.props.route.params.answer[qAnswer]}</Text>
          {correctAnswer === qAnswer ? (
            <Icon name="check-circle" color={'#fff'} size={20} />
          ) : clickedAnswer === qAnswer ? (
            <Icon name="times" color={'#fff'} size={20} />
          ) : null}
        </TouchableOpacity>
      ),
    );
    return (
      <SafeAreaView style={styles.container}>
        {/* start top header  */}
        <BackArrow
          goBack={() => this.props.navigation.goBack()}
          title={<Text>Mathematics Quiz</Text>}
        />

        <View style={{padding: 20}}>
          <Text style={styles.textTitle}>
            Question {step}
            <Text style={{fontSize: 15, color: 'gray'}}>/20</Text>
          </Text>
          <Text style={styles.queTextTitle}>{question}</Text>
        </View>

        <View style={{padding: 20}}>{answers}</View>

        {/* next Footer */}
        <View style={styles.footerContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="sign-out" color={'#8c766b'} size={18} />

            <Text style={{color: '#8c766b'}}>Quit Quiz</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('QuizResultScreen', {});
            }}
            style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
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
  },
  queTextTitle: {
    letterSpacing: 0.2,

    paddingTop: 25,
    fontSize: 14,
    color: '#8c766b',
  },

  checkboxContainer: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  footerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextBtn: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#d4794c',
    borderRadius: 10,
  },
  nextBtnText: {
    color: '#fff',
  },
});
