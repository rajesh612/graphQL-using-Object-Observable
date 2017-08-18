import {
  makeExecutableSchema,
} from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type User {
  google: GoogleData
  stamp: StampData
  twitter: TwitterData
}
type GoogleData {
  displayName: String
  email: String
  photoURL: String
  refreshToken: String
  uid: String
}
type TwitterData {
  displayName: String
  photoURL: String
  refreshToken: String
  uid: String
}
type StampData {
  avatar_url: String
  bio: String
  events: [StampEvent]
  headline: String
  location: String
  name: String
  timezone: String
  username: String
  weblink: String
}
type Stamps {
  stamps: [StampEvent]
}
type StampEvent {
  owner: User
  parties: User
  serviceName: String
  status: String
  time: String
}
type UserServices {
  userServices: [Services]
}
type Services {
  services: [ServiceItem]
}

type ServiceItem {
  availability: Availability
  category: String
  desc: String
  duration: String
  location: String
  price: Int
  title: String
  owner: User
}
type Availability {
  times: [String]
  weekdays: [Boolean]
}
type Query {
  getUser(uid: String): User
  getServices(category: String): [ServiceItem]
}
`;

export default makeExecutableSchema({typeDefs, resolvers});
