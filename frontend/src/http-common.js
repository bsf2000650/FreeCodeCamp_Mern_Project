import axios from "axios";

export default axios.create({
  baseURL: "https://us-east-1.aws.data.mongodb-api.com/app/restaurants-review-odifu/endpoint/",
  headers: {
    "Content-type": "application/json"
  }
});