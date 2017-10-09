import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data = [{
    id: 1,
    title: 'Mark',
    time: 'Otto'
  }, {
    id: 2,
    title: 'Jacob',
    time: 'Thornton'
  }, {
    id: 3,
    title: 'Larry',
    time: 'Bird'
  }, {
    id: 4,
    title: 'John',
    time: 'Snow'
  }, {
    id: 5,
    title: 'Jack',
    time: 'Sparrow'
  }, {
    id: 6,
    title: 'Ann',
    time: 'Smith'
  }, {
    id: 7,
    title: 'Barbara',
    time: 'Black'
  }, {
    id: 8,
    title: 'Sevan',
    time: 'Bagrat'
  }, {
    id: 9,
    title: 'Ruben',
    time: 'Vardan'
  }, {
    id: 10,
    title: 'Karen',
    time: 'Sevan'
  }, {
    id: 11,
    title: 'Mark',
    time: 'Otto'
  }, {
    id: 12,
    title: 'Jacob',
    time: 'Thornton'
  }, {
    id: 13,
    title: 'Haik',
    time: 'Hakob'
  }, {
    id: 14,
    title: 'Garegin',
    time: 'Jirair'
  }, {
    id: 15,
    title: 'Krikor',
    time: 'Bedros'
  }, {
    'id': 16,
    'title': 'Francisca',
    'time': 'Brady'
  }, {
    'id': 17,
    'title': 'Tillman',
    'time': 'Figueroa'
  }, {
    'id': 18,
    'title': 'Jimenez',
    'time': 'Morris'
  }, {
    'id': 19,
    'title': 'Sandoval',
    'time': 'Jacobson'
  }];

  getNewsBoardData() {
    return this.data;
  }

  getNoticesData() {
    return this.data;
  }
  
  getWnewsData() {
    return this.data;
  }
}
