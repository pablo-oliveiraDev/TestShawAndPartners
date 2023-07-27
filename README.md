# TestShawAndPartners


## RESTFUL api

```
API created on demand for testing by Shaw And Partiners with the purpose of testing the candidate's knowledge and specific requests directed by the company
```


# Installation

* Clone the repo by using ```git clone``` with .

* Create new file ```.env``` and create new variable ```DATABASE_URL="mongodb+srv://ShawAndPartiners:q5lkdxwMeADPkp9t@cluster0.ho9b9os.mongodb.net/SHAWANDPARTNERS" ```

* Run ```npm install``` for install all dependences of project.


# Start project

* ```node app.js``` and ```typescript``` for simple setups.

* Open terminal in folder url and use cmd``` npm run dev```

* Case your database not exists use cmd ``` npx prisma generated```
 
# Database

 Database was created in [MongoDb](https://www.mongodb.com/docs/atlas/api/data-api/) with ORM  [prisma js](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb#prerequisites)

# API Endpoints


## Get all users
```
GET http://localhost:5080/api/users

``` 
## Get users by id
```
GET http://localhost:5080/users:id

```
## Get user by any column
```
GET http://localhost:5080/userBycol/col

```
## Create users with file csv
```
GET http://localhost:5080/files

```
## Delete user
```
GET http://localhost:5080/users/:id 

```