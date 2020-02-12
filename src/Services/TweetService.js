import axios from 'axios';
import env from './../../env';

export default class TweetService {
  constructor() {
    this.http = axios;
  }

  getLatestTweet() {
    return this.http
      .get(env.API_BASE + '/tweet/latest')
      .then(res => res.data.result);
  }

  getTweet(uid) {
    return this.http
      .get(env.API_BASE + '/tweet/' + uid)
      .then(res => res.data.result);
  }
}
