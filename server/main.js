import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';


import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    
    const _id = req.url.slice(1);

    const link = Links.findOne({ _id });

    if(link){
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    }
    else{
      next();
    }


  });

  // code to run on server at startup
  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.phone
  //   }
  // });

  // petSchema.validate({
  //   name: 'Mark',
  //   age: -3,
  //   contactNumber: '#1243'
  // });

  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: number,
  //     min: 200
  //   },
  //   email: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.email
  //   }
  // });

  // petSchema.validate({
  //   name: 'Mark',
  //   hourlyWage: 210,
  //   email: 'wesbos@yahoo.com'
  // });


});
