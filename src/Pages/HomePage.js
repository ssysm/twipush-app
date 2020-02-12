import React from 'react';
import {View, Text} from 'react-native';
import TweetService from '../Services/TweetService';
import {Container, Content, List} from 'native-base';
import TweetComponent from '../Components/TweetComponent';
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this._tweetService = new TweetService();
    this.navigation = this.props.navigation;
    this.state = {tweets: []};
  }

  componentDidMount() {
    this._tweetService.getLatestTweet().then(tweets => {
      this.setState({tweets});
    });
  }

  render() {
    return (
      <Content padder>
        <List>
          {this.state.tweets.map((tweet, key) => {
            return <TweetComponent tweet={tweet} key={key} />;
          })}
        </List>
        <Text>{this.state.tweets.length}</Text>
      </Content>
    );
  }
}
