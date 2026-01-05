# Backend for QLC Website Application

https://helen.cumberland.isis.vanderbilt.edu

## Important Terms
* **Assignment** - Instructions/details given to students by an instructor. Represented as a Mongoose object.
* **Chapter** - A unit encompassing a few core topics. Multiple assignments will be part of a single chapter. Chapter examples are loops, if-statements, functions/methods, and OOP. Represented as a Mongoose object.
* **Exercise** - A series of simple questions about a student's code submission. Represented as a Mongoose object.
* **Feedback** - A simple form asking the students for their opinions about how QLCs are benefitting them. Rated from Strongly Disagree - Strongly Agree scale. Represented as a Mongoose object.
* **Job** - Used internally by the website application to run asynchronous tasks (exercise batch generation). Represented as a Mongoose object.
* **User** - A person using the website application. Can be students, faculty, admin. For now, faculty and admin are functionally the same. Represented as a Mongoose object.
* **Submission** - A student's code they submitted for the assignment. Represented as a string.

## Folder Structure

```
├───config
├───controllers
├───data
├───middleware
├───models
├───routes
├───scripts
│   └───sampling_datasets
├───services
├───uploads
├───utils
└───workers

```


## Environment Variables
```
AMPLIFY_API_KEY = your_amplify_api_key 
MONGO_URI = mongodb_atlas_uri  
BASE_URL = amplify_api_base_url 
PORT = backend_port
FRONTEND_URL = frontend_url
```




