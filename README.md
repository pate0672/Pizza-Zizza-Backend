# Pizza Zizza Shop Backend

Pizza Zizza is an online interface with backend to create a dynamic user experience and order pizza's from a fictious brand called "Pizza Zizza". Users can order, add ingredients, edit ingerdients and delete.

[View Frontend](https://github.com/gond0017/pizzaFrontend)


## Backend code Features

1. Created a new `/auth` router module that will support

- creating new users
- authenticating a user
- retrieving the currently logged-in user

Redacted the user's password.

2. The user schema has the following properties:
   | Property | Type | Required | Max Length | Default |
   | :-------- | :----- | :------- | ---------: | -------: |
   | firstName | String | true | 64 | |
   | lastName | String | true | 64 | |
   | email | String | true | 512 | |
   | password | String | true | 70 | |
   | isAdmin | Boolean | true | | false|

3. All API routes for the _Pizza_ and _Ingredients_ resource paths are only be accessible to authenticated users.

4. All `POST`, `PUT`, `PATCH`, and `DELETE` routes for both the _Pizza_ and _Ingredients_ resource paths are limited to authenticated users with the `isAdmin` flag set to true.

5. Recorded each login attempt in an `authentication_attempts` collection in MongoDB. The properties of each attempt document include:

| Property   | Type    | Required | Max Length |
| :--------- | :------ | :------- | ---------: |
| username   | String  | true     |         64 |
| ipAddress  | String  | true     |         64 |
| didSucceed | Boolean | true     |            |
| createdAt  | Date    | true     |            |

WE DO NOT store the password or the JWT.

6. Clean and readable code. 

Addtional features:

- no runtime errors
- consistent 2 space indentation
- logical grouping of related code
- semantically descriptive names for variables and functions
- well organized project folder structure
- properly formatted `package.json` file
  - proper project name
  - author details

## Use

- Clone this repo or download zip to your latptop/PC.
- You can test each route with Postman.

# Frontend Features

### Interface
1. Display list of pizza's (overall and per pizza truck)
2. Update inventory item values when pizza is edited
3. Checkout page 
4. Edit ingredeints page
5. Sign and Sign Up page

### Functionality
1. User authentication (Users can Sign In, Sign up) 
2. Users can add multiple pizza's and view list
3. Users can add multiple ingredients (different ingredients have different price)
4. User can edit pizza or delete ingredeints
5. User can view total price of pizza based on ingredients

### Additional Features
 1. Data is stored on MongoDB database
 2. Users can reset password
 3. Loader to display loading
 4. Easy navigation


# Technologies Implemented

### 1. JavaScript
### 2. Node JS
### 3. HTML5
### 4. CSS#
### 5. MongoDB
### 6. Pair Programming


# Authors
### 1. [Rishi Patel (Myself)](https://github.com/pate0672)
### 2. [Snehal Gondaliya](https://github.com/gond0017)
