import React from 'react';
import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';

import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        links: []
    }
  }
  componentDidMount(){
    console.log('componentDidmount');
    this.linksTracker = Tracker.autorun(() => {
      
        Meteor.subscribe('links');
        
        const links = Links.find({
          visible: Session.get('showVisible')
        }).fetch();

        this.setState({links});
    });
  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
    this.linksTracker.stop();
  }
  renderLinksListItems(){
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status">No Links Found</p>
        </div>
      );
    }

    return result =  this.state.links.map((link) => {

        const shortUrl = Meteor.absoluteUrl(link._id);
        return (
            // using spread operator to make props.. _id = _id, url = url, userId = userId
            <LinksListItem key={ link._id } shortUrl={shortUrl} {...link}/>
            // <p key={ link._id }> {link.url}</p>
        )
    });

  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
            {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
