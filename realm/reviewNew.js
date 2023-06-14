// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    if (body) {
      const body =  EJSON.parse(body.text());
      const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
      
      const reviewDoc = {
          name: body.name,
          user_id: body.user_id,
          date: new Date(),
          text: body.text,
          restaurant_id: BSON.ObjectId(body.restaurant_id)
      };
  
      return await reviews.insertOne(reviewDoc);
  }

  return  {};
};
