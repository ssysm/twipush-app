import axios from 'axios';
import {API_BASE} from 'react-native-dotenv';

export default class TweetService {
  constructor() {
    this.http = axios;
  }

  getLatestTweet() {
    return this.http
      .get(API_BASE + '/tweet/latest')
      .then(res => res.data.result);
  }

  getTweet(uid) {
    return this.http
      .get(API_BASE + '/tweet/' + uid)
      .then(res => res.data.result);
  }
}
