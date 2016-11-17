'use strict';

import React from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Dimensions
} from 'react-native';

var CommentList = require('./CommentList');
var FeedActions = require('./component/actions/FeedActions');
var TagDetail = require('./component/TagDetail');

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

const IMAGE_BASE_URL = 'http://ogj1ador4.bkt.clouddn.com/';
const img_thumbnail = '?imageView2/1/w/200/h/200';
const avatar_thumbnail = '?imageView2/1/w/100/h/100';

var FeedCell = React.createClass({

  renderFeedImages: function(content) {
    if(content == null) return [];
    var images = content.split(":");
    var imagesView = [];
    for(var i=0; i<images.length-1; i++) {
        imagesView.push(<Image source={{uri:IMAGE_BASE_URL + images[i] + img_thumbnail}} style={styles.feedContentImage}/>);
    }
    return imagesView;
  },

  nav2TagDetail: function(id, tag) {
    console.log(tag+ ':' +id);
    this.props.navigator.push({
      title: tag,
      component: TagDetail,
    });
  },


  renderCommentList: function(){
      return(
        <View style={{flex :1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {this.props.feed.tags && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
              {
                this.props.feed.tags.map(tag => <TouchableOpacity
                                                  onPress={(tag)=>this.nav2TagDetail(tag.id, tag.tag)}>
                                                  <Text style={{color: '#9B9B9B', marginRight: 5}}>{tag.tag}</Text>
                                                </TouchableOpacity>)
              }
              </ScrollView>
            }
            <FeedActions
              likeCounter={this.props.feed.like_count}
              commentCounter={this.props.feed.comment_count}
              push2FeedDetail={this.props.push2FeedDetail}/>
          </View>
          <CommentList
            secret={this.props.secret}
            token={this.props.token}
            object_type={this.props.feed.object_type}
            object_id={this.props.feed.object_id}
            liked={false}
            commented={false}
            commentCounter={this.props.feed.comment_count}
            push2FeedDetail={this.props.push2FeedDetail}
            limit={5}
          />
        </View>
      );
  },

  renderFeedContent: function(feed) {
    if(feed.summary == null || feed.summary.length == 0) {
      return (
        <View style={styles.feedContentImages}>{this.renderFeedImages(this.props.feed.content)}</View>
      );
    }
    return (
      <View>
        <Text style={styles.feedContentText}>{this.props.feed.summary}</Text>
        <View style={styles.feedContentImages}>{this.renderFeedImages(this.props.feed.content)}</View>
      </View>
    );
  },

  componentWillMount: function() {
    console.log(this.props.newComment);
  },


  render: function(){
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.onSelect}>
          <View style={styles.container}>
              <View style={styles.feedHeader}>
                  <View>
                    <TouchableOpacity onPress={this.props.pressAvatar}>
                      <Image source={{uri:IMAGE_BASE_URL + this.props.feed.user_avatar + avatar_thumbnail}} style={styles.avatar}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.feedUserInfo}>
                    <Text style={styles.feedUserName}>Kevin</Text>
                    <Text style={styles.feedTime}>2015-1-5</Text>
                  </View>
              </View>
              <View style={styles.feedContent}>
                {this.renderFeedContent(this.props.feed)}
              </View>
              {this.renderCommentList()}

          </View>

        </TouchableOpacity>

      </View>
    )
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#EEEEEE',
  },
  feedHeader: {
    flex: 1,
    flexDirection: 'row',
    margin: margin,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  feedUserInfo: {
    marginLeft: 10,
  },

  feedUserName: {
    marginTop: 3,
    fontSize: 17,
    color: '#00B5AD',
    lineHeight: 18,
  },
  feedTime: {
    fontSize: 15,
    color: '#7B7C84',
    lineHeight: 15,
    marginTop: 5,
  },

  feedContent: {
    flex: 1,
  },
  feedContentText: {
    flex: 1,
    margin: margin,
    marginTop: -10,
    fontSize: 15,
    color: '#333333',
    lineHeight: 19,
  },
  feedContentSingleImage: {
    flex: 1,
    height:170,
  },
  feedContentImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: margin,
  },
  feedContentImage: {
    width: (windowWidth-margin*2-imgInterval*2) / 3,
    height:(windowWidth-margin*2-imgInterval*2) / 3,
    marginBottom: imgInterval,
    marginRight: imgInterval,
  },
  feedActions:{
    //borderWidth: 1,
    //borderTopColor: '#EEEEEE',
    flex :1,
    flexDirection: 'row',
    //marginTop: 15,
    marginRight: margin,
    marginBottom: 5,
  },
  feedActionComment: {
    width: 40,
    padding: 5,
    marginRight: 5,
  },
  feedActionLike: {
    width: 40,
    padding: 5,
  },
  thumbnail: {
    flex: 1,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 70,
    backgroundColor: 'white',
  },
  tagsContainer: {
    flex: 3,
    marginLeft: 20,
    marginTop: 10,

  }
});

module.exports = FeedCell;
