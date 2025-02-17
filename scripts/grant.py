from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def grant_amount_to_supporters():
    database_name = "zipcaptions"
    # Prod config
    connection_string = "" # Get from the azure console
    client = MongoClient(f"{connection_string}&tlsAllowInvalidCertificates=true")

    # Staging config
    # username = ""
    # password = ""
    # mongo_uri = f"mongodb+srv://{username}:{password}@dev.kuwrosv.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true"
    # client = MongoClient(mongo_uri, server_api=ServerApi('1'))

    # Dev config
    # host = "localhost"
    # username = ""
    # password = ""
    # port = 27017
    # mongo_uri = f"mongodb://{username}:{password}@{host}:{port}/{database_name}?authSource=admin"
    # client = MongoClient(mongo_uri)

    database_name = "zipcaptions"
    db = client[database_name]
    supporters_collection = db["supporters"]
    users_collection = db["users"]
    creditadd_collection = db["creditadd"]

    # Fetch all documents from the supporters collection
    supporters = list(supporters_collection.find())

    for supporter in supporters:
        email = supporter.get("email")
        if email:
          user = users_collection.find_one({"primaryEmail": email})
          if user:
            grant_amount = 36000 if supporter.get("amountCents", 0) > 0 else 18000
            creditadd_collection.insert_one({
               "userId": user.get("id"),
               "provider": "Initial launch Patreon grant",
               "creditsAdded": grant_amount
            })
            users_collection.update_one({"primaryEmail": email}, {"$set": {"creditBalance": grant_amount}})
            print(f"Updated user {email}")

    # Close the connection
    client.close()

    return supporters


if __name__ == "__main__":
    grant_amount_to_supporters()
