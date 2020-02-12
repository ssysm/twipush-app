import React from 'react';
import TweetService from './../Services/TweetService';
import TweetComponent from '../Components/TweetComponent';
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this._tweetService = new TweetService();
    this.navigation = this.props.navigation;
    this.state = {
      tweet: {},
      tweetId: this.props.route.params.tweetId,
    };
  }

  componentDidMount() {
    this._tweetService.getTweet(this.state.tweetId).then(tweet => {
      this.setState({tweet});
    });
  }

  render() {
    return <TweetComponent tweet={this.state.tweet} />;
  }
}
