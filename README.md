#### JavaJam
JavaJam is a music school


## INSTALL

Dependencies:

- axios
- react
- react-dom
- react-router-dom
- react-scripts
- react-slick
- react-tabs
- slick-carousel
- web-vitals

```sh
$ npm install
```

## Dev

```sh
$ npm run dev
```

## Pages

| Page    | URL      | Description  |
| ------  | -------  | -----------  |
| HOME    | `/`        | landing page |
| SIGNUP  | `/signup`  | signup page  |
| LOGIN   | `/login`   | login page   |
| CONTACT | `/contact` | contact page |
| ERROR   | `/error`   | error page   |



#### Public
| Page              | URL                        | Description                                     |
| ------            | -------                    | -----------                                     |
| CLASSES           | `/classes`                   | list of instrument lessons and groups available |
|TIMETABLE          | `/timetable`                 | timetable of the groups                         |
|GROUP INFO         | `/groups/info/:groupId`      | Information about the group and option to join  |
|INSTRUMENT DETAILS | `/instruments/:instrumentId` | Details about the instruments you can learn     |


#### User
| Page         | URL                | Description                    |
| ------       | -------            | -----------                    |
| USER PROFILE | `/user`              | user details, inbox and outbox |
| EDIT USER    | `/user/edit/:userId` | update user details            |


#### Admin
| Page            | URL                             | Description                                                               |
| ------          | -------                         | -----------                                                               |
| ADMIN           | `/admin`                          | Admin page, add new groups and teachers                                   |
| GROUP DETAILS   | `/groups/:groupId`               | full group details                                                        |
| EDIT GROUP      | `/groups/edit/:groupId`           | edit or delete a group                                                    |
| TEACHER DETAILS | `/teacher/:instrumentId`          | details of the teachers, instruments they teach and the lessons they have |
| EDIT TEACHER    | `/instruments/edit/:instrumentId` | Edit teacher details                                                      |
| LESSON DETAILS  | `/lessons/:lessonId`              | Individual lesson details                                                 |
| EDIT LESSON     | `/lessons/edit/:lessonId`         | Edit lessons                                                              |

## Routes

##### instrument routes

| HTTP verb | URL                              | Request body | Action                                   |
| --------- | -------------------------------- | ------------ | ---------------------------------------- |
| GET       | `/api/instruments`               | (empty)      | Returns all the instrument you can learn |
| POST      | `/api/instruments`               | JSON         | Adds a new instrument                    |
| GET       | `/api/instruments/:instrumentId` | (empty)      | Returns the specified instrument         |
| PUT       | `/api/instruments/:instrumentId` | JSON         | Edits the specified instrument           |
| DELETE    | `/api/instruments/:instrumentId` | (empty)      | Deletes the specified instrument         |

##### lesson routes

| HTTP verb | URL                      | Request body | Action                       |
| --------- | ------------------------ | ------------ | ---------------------------- |
| GET       | `/api/lessons`           | (empty)      | Returns all the lessons      |
| POST      | `/api/lessons`           | JSON         | Adds a new lesson            |
| GET       | `/api/lessons/:lessonId` | (empty)      | Returns the specified lesson |
| PUT       | `/api/lessons/:lessonId` | JSON         | Edits the specified lesson   |
| DELETE    | `/api/lessons/:lessonId` | (empty)      | Deletes the specified lesson |

##### group routes

| HTTP verb | URL                     | Request body | Action                      |
| --------- | ----------------------- | ------------ | --------------------------- |
| GET       | `/api/groups`           | (empty)      | Returns all the groups      |
| POST      | `/api/groups`           | JSON         | Adds a new group            |
| GET       | `/api/groups/:groupsId` | (empty)      | Returns the specified group |
| PUT       | `/api/groups/:groupsId` | JSON         | Edits the specified group   |
| DELETE    | `/api/groups/:groupsId` | (empty)      | Deletes the specified group |

##### message routes

| HTTP verb | URL                        | Request body | Action                        |
| --------- | -------------------------- | ------------ | ----------------------------- |
| GET       | `/api/messages/:messageId` | (empty)      | Returns the specified message |
| POST      | `/api/messages`            | JSON         | Adds a new message            |
| DELETE    | `/api/messages/:messageId` | (empty)      | Deletes the specified group   |

##### User routes

| HTTP verb | URL                           | Request Headers | Action                        |
| --------- | ----------------------------- | --------------- | ----------------------------- |
| GET       | `/api/users/:userId`          | (empty)         | returns user details          |
| PUT       | `/api/users/:userId`          | (empty)         | update user details           |
| GET       | `/api/users/:userId/lessons`  | (empty)         | returns list of users lessons |
| GET       | `/api/users/:userId/groups`   | (empty)         | returns list of users groups  |
| POST      | `/api/users/:userId/groups`   | (empty)         | add user to a group           |
| GET       | `/api/users/:userId/messages` | (empty)         | returns users messages        |

##### Auth routes

| HTTP verb | URL            | Request Headers                 | Request Body              |
| --------- | -------------- | ------------------------------- | ------------------------- |
| POST      | `/auth/signup` | --                              | { email, password, name } |
| POST      | `/auth/login`  | --                              | { email, password }       |
| GET       | `/auth/verify` | Authorization: Bearer \< JWT \> | --                        |

<hr>





## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Instrument Service

  - createInstrument(requestBody)
  - getAllInstruments()
  - getInstrument(id)
  - updateInstrument(id, requestBody)
  - deleteInstrument(id)

- Group Service

  - createGroup(requestBody)
  - getAllGroups()
  - getGroup(id)
  - getGroupsByDay(day)
  - updateGroup(id, requestBody)
  - joinAGroup (id, requestBody)
  - deleteGroup(id)

- Lesson Service

  - createLesson(requestBody)
  - getAllLessons(instrument)
  - getLesson(id)
  - updateLesson(id, requestBody)
  - deleteLesson(id)

- Message Service

  - getAllMessages
  - createMessage(requestBody)
  - getMessage (userId)

- Users Service

  - getAllUsers()
  - getUser(userId)
  - updateUser(userId, requestBody)
  - getUserGroups(userId)
  - getUserLessons(userId)
  - addUserToGroup(groupId)
  - getUserMessages(userId)
  - getAdminUser(userId)

#### Models

##### instrument Model

```js
{
instrument: String,
teacher: String,
description: String,
location: String,
imageURL: String,
}


```
##### lesson Model

```js
{
user: [{ type: Schema.Types.ObjectId, ref: 'user' }]
time: String,
length: Number,
instrument: [{ type: Schema.Types.ObjectId, ref: 'instrument' }]
}


```

##### group Model

```js
{
  title: String,
  startTime: String,
  endTime: String,
  location: String,
  leader: String,
  imageURL: String,
  day: String,
  skillLevel: String,
  instruments: String,
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}
```

##### User Model

```js
{
  email: String, unique, required,
  password: String, required,
  name:  String, required,
  isAdmin:  Boolean,
  address:  String,
  phone:   String,
  imageURL: String
}
```

##### Message Model

```js
{
  title: String,
  message: String,
  sender: Schema.Types.ObjectId, ref: "user",
  senderName: String,
  senderEmail: String,
  recipient: Schema.Types.ObjectId, ref: "user",
  timeStamp: Date,
}
```
