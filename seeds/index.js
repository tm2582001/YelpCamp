const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6286156015cec560c8c72806',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "http://source.unsplash.com/collection/484351",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quam molestias dolores deserunt obcaecati, architecto corporis consectetur necessitatibus itaque, aliquam aut! Dolores aliquid numquam cupiditate officiis odit, ipsa fuga maiores!",
      price: price
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
