// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    
    const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
  const deleteResponse = await reviews.deleteOne({
    _id: BSON.ObjectId(query.id) || "C2DB9D58202247D9153EFD61"
  })

  return deleteResponse
    
};
