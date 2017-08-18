import {find, filter, map}     from 'lodash';
import refVal                  from './connector';

const resolvers = {
  Query: {
    // query to get specific user from uid
    getUser(_,args) {
      var userKey;
      return refVal('/users/').then(function(users) {
        userKey = Object.keys(users);
      }).then(function() {
        for(var key of userKey) {
          if(key === args.uid) {
            return refVal('/users/'+key).then(function(user) {
              return user;
            })
          }
        }
      })
    },
    // query to get all services from category
    getServices(_,args) {
     var usersData, serviceList = [];
      return refVal('/services/').then(function(users) {
        usersData = users;
      }).then(function() {
        for(var userKey in usersData) {
          var userServices = usersData[userKey];
         for(var serviceName in userServices) {
          if(userServices[serviceName].category === args.category) {
            serviceList.push(userServices[serviceName]);            }
         }
        }
        return serviceList;
      })
    }
  },
  // resolver for stamp data for each user
  User: {
    stamp(user) {
      return user.stamp;
    },
  },
  // resolver for events in stamp data
  StampData: {
    events(stampData) {
      var events, eventPromise, eventArray = [];
      events = Object.values(stampData.events);
      return refVal('/stamps/').then(function(stampEvents) {
        eventPromise = stampEvents;
      })
      .then(function() {
        for(var userEvent of events) {
        for(var stamp in eventPromise ) {
            if(userEvent === stamp) {
              eventArray.push(eventPromise[stamp]);
              break;
            } else {
              continue;
            }; 
          };  
        };
        return eventArray;
      })
    },
  },
  // resolver for each stampEvent in stamps
  StampEvent: {
    owner(stampEvent) {
      var owner = stampEvent.ownerUID;
      return refVal('/users/' + owner).then(function(user) {
        return user;
      })
    },
    parties(stampEvent) {
      var parties = stampEvent.partiesUID;
      return refVal('/users/' + parties).then(function(user) {
        return user;
      })
    },
  },
  //resolver for Service Items
  ServiceItem: {
    owner(serviceItem) {
      var usersData;
      return refVal('/services/').then(function(users) {
        usersData = users;
      }).then(function() {
        for(var userKey in usersData) {
          var userServices = usersData[userKey];
         for(var serviceName in userServices) {
          if(userServices[serviceName].category === serviceItem.category && 
            userServices[serviceName].title === serviceItem.title) {
            return refVal('/users/'+userKey).then(function(owner) {
              return owner;
           });
            break;
          } else {
            continue;
          }
         }
        }
      });
    },
  },
}


export default resolvers;
