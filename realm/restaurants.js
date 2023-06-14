// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    
      
        
    
    const {restaurantsPerPage = 20, page = 0} = query

    query = {}
    if(query.cuisine) {
        query = { "cuisine": { $eq:  query.cuisine} }
    } else if (query.zipcode){
        query = { "address.zipcode": { $eq: query.zipcode  } }
    } else if (query.name){
        query = { $text: { $search: query.name } }
    }

  const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants")
  let restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray();

  restaurantsList.forEach(restaurants => {
    restaurants._id = restaurants._id.toString();
  })
  
    let responseData = {
        restaurants: restaurantsList,
        page : page.toString(),
        filters: {},
        entries_per_page: restaurantsPerPage.toString(),
        total_results: await collection.count(query).then(num=>num.toString())
    }

return responseData;

};
