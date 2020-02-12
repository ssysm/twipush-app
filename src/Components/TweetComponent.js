import React from 'react';
import {Image} from 'react-native';
import {Container, Text, Card, CardItem} from 'native-base';
import env from './../../env';
export default class TweetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tweet: this.props.tweet};
  }

  componentDidMount() {}

  buildMedia = tweet => {
    if (tweet.truncated) {
      if (tweet.extended_tweet.extended_entities !== undefined) {
        return this.buildMediaContent(
          tweet.extended_tweet.extended_entities.media,
        );
      } else {
        return [];
      }
    } else {
      if (tweet.extended_entities !== undefined) {
        if (Array.isArray(tweet.extended_entities)) {
          if (tweet.extended_entities.length > 0) {
            return this.buildMediaContent(tweet.extended_entities[0].media);
          } else {
            return [];
          }
        } else {
          return this.buildMediaContent(tweet.extended_entities.media);
        }
      } else {
        return [];
      }
    }
  };

  buildMediaContent = entities => {
    if (entities.length > 0) {
      return entities.map((entity, key) => {
        if (entity.type === 'photo') {
          return (
            <Image
              key={key}
              source={{uri: env.API_BASE + '/static/' + entity.id_str + '.png'}}
              style={{height: 200, width: null, flex: 1, padding: 20}}
            />
          );
        }
      });
    } else {
      return [];
    }
  };

  render() {
    return (
      <Card>
        {/** Name */}
        <CardItem bordered>
          <Text>
            {this.state.tweet.user.name} {'\n'}@
            {this.state.tweet.user.screen_name}
          </Text>
        </CardItem>
        {/** Tweet Status */}
        <CardItem bordered>
          <Text style={{fontWeight: 'bold'}}>
            {this.state.tweet.in_reply_to_status_id_str !== null
              ? 'Replied'
              : typeof this.state.tweet.retweeted_status === 'object' ||
                typeof this.state.tweet.quoted_status === 'object'
              ? 'Retweeted'
              : 'Tweeted'}
            {' on '}
            {new Date(this.state.tweet.created_at).toLocaleString()}
          </Text>
        </CardItem>
        {/** Tweet Body */}
        <CardItem>
          <Text>
            {this.state.tweet.truncated
              ? this.state.tweet.extended_tweet.full_text
              : this.state.tweet.text}
          </Text>
        </CardItem>
        <CardItem cardBody>
          {/*{this.state.quoted_status*/}
          {/*  ? this.buildMedia(this.state.tweet.quoted_status).map(*/}
          {/*      (elm, idx) => {*/}
          {/*        return elm;*/}
          {/*      },*/}
          {/*    )*/}
          {/*  : null}*/}
        </CardItem>
        {this.buildMedia(this.state.tweet).map((elm, idx) => {
          return <CardItem cardBody>{elm}</CardItem>;
        })}
        {/** Tweet Quote */}
        {typeof this.state.tweet.retweeted_status === 'object' ? (
          <CardItem>
            <TweetComponent tweet={this.state.tweet.retweeted_status} />
          </CardItem>
        ) : null}
      </Card>
    );
  }
}
