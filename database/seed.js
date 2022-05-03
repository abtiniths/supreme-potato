const {Users, Tasks} = require('../models')


Tasks.bulkCreate([
    {title: TestTask1, done: false},
    {title: TestTask2, done: false},
    {title: TestTask3, done: false},
  ],
  { validate: true },
  {ignoreDuplicates: true})
  .then(() => 
  console.log("Seed data have been saved"));

Users.create(
  {username: 'test', password: '1234'},
  { validate: true },
  {ignoreDuplicates: true})
  .then(() => 
  console.log("Neo is online"))