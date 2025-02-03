This MongoDB application has 3 collection namely users, cars and reviews 
with the idea that users can write reviews on cars.


//////////////////////////////////
Routes:
Has 3 rouges users, cars and reviews
Each collection has get, post, patch, delete and get-by-id routes
Here below is an example of CRUD operation for collection cars:
// GET / get all cars
// localhost:3010\cars\
.get("/", async (req, res) => {

// POST / add a new car
//localhost:3010\cars\
.post("/", async (req, res) => {

// GET BY ID / get a car by id
// localhost:3010\cars\3
.get("/:id", async (req, res) => {

// PATCH / edit a car by id
// localhost:3010\cars\3
/*
 {
   "make": "Toyota",
   "model": "Civic",
   "year": 2024
 }
*/
.patch("/:id", async (req, res) => {

// DELETE / delete a car by id
//delete localhost:3000/cars/3
router.delete("/:id", async (req, res) => {
/////////////////////////////////


Models:
Has 3 modles users, cars and reviews


Model Indexes:
Has 3 indexes with one complex index.


Model data validations within all three Schemas:
User:
    user_id: {type: Number, required: true, unique: true},  
    name: {type: String, required: true},
    username: { type:  String, required: true },
    email: { type: String, required: true, format: "email" },
  userSchema.index({ username: 1, email: 1 }, { unique: true }); // Prevents duplicate reviews from the same user
Cars:
    car_id: {type: Number, required: true, unique: true},  
    make: {type: String, required: true},
    model: { type:  String, required: true },
    year: { type: Number, required: true, min: 1900, max: 2024 },
  carSchema.index({ model: 1 });
Reviews:
    review_id: {type: Number, required: true, unique: true},  
    user_id: {type: Number, required: true},  
    car_id: {type: Number, required: true},  
    review: {type: String, required: true},
  reviewsSchema.index({ user_id: 1, car_id: 1 }, { unique: true });

Data validation in routes:
All 3 routes have data validation for post and patch


Each of the 3 colleciton has over 20 documents


Readme file with application description


Level of effort displayed in creativity and user experience.


Have implemented Mongoose to create this application


/// END  ///
