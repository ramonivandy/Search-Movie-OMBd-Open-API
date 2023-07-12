# Search Movie App

Search Movie App using Open API Movie Database (OMDb API)

## Installation

1. Clone repository
2. Run commmand
```bash 
npm install
```
3. Fill MySQL Database Credential, OMDB Key at ```.env```
4. Create Table called ```log``` at your database.
5. Start app with command ```npm run dev```

## Usage

1. Get Movie List Endpoint ```/search```  
Params:   
a.  ```page``` only integer.  
b. ```movieName``` value to search movie based on name.

2. Get Detail Movie ```/detail/:movieId```  
Params:  
a. ```movieId``` get movie detail based on id.

## Postman Collection
For Postman collection, you can import from here:
[Postman Collection](https://www.getpostman.com/collections/62b354c37a32d6a87e4c](https://elements.getpostman.com/redirect?entityId=4517781-a7aad16e-0cdf-4ca7-8251-54fae7f9abcd&entityType=collection)https://elements.getpostman.com/redirect?entityId=4517781-a7aad16e-0cdf-4ca7-8251-54fae7f9abcd&entityType=collection)
