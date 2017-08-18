import firebase from 'firebase';
import {filter, map} from 'lodash';
var app = firebase.initializeApp({
	apiKey: "xxxxxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxx",
});

/*const mapSnapshotToEntity = snapshot => ({ id: snapshot.key, ...snapshot.val() })
const mapSnapshotToEntities = snapshot => map(snapshot.val(), (value, id) => ({ id, ...value }))

const ref = path => firebase.database().ref(path)
const getValue = path => ref(path).once('value')
const getEntity = path => getValue(path).then(mapSnapshotToEntity)
const getEntities = path => getValue(path).then(mapSnapshotToEntities)*/

var refVal = path => firebase.database().ref(path).once('value').then(function(snapshot) {
			return snapshot.val();
    });

export default refVal;
