import argparse
from datetime import date
from pymongo import MongoClient

def grant_to_users(grant_amount, conn=None):
    database_name = "zipcaptions"

    if conn:
        client = MongoClient(f"{conn}&tlsAllowInvalidCertificates=true")
    else:
      # Prod config
      connection_string = "" # Get from the azure console
      client = MongoClient(f"{connection_string}&tlsAllowInvalidCertificates=true")

    # Dev config
    # host = "localhost"
    # username = ""
    # password = ""
    # port = 27017
    # mongo_uri = f"mongodb://{username}:{password}@{host}:{port}/{database_name}?authSource=admin"
    # client = MongoClient(mongo_uri)

    db = client[database_name]  # Replace with your database name
    users_collection = db["users"]
    creditadd_collection = db["creditadds"]

    # Find user by email
    users = list(users_collection.find())

    for user in users:
        print("User found:")
        print(user.get("primaryEmail"))
        print(f"Grant amount: {grant_amount}")
        # Ensure creditBalance exists before incrementing
        if "creditBalance" not in user:
            users_collection.update_one(user, {"$set": {"creditBalance": grant_amount}})
        else:
            users_collection.update_one(user, {"$inc": {"creditBalance": grant_amount}})

        current_date = date.today().isoformat()
        creditadd_collection.insert_one({
            "userId": user.get("id"),
            "provider": "Manual grant",
            "creditsAdded": grant_amount,
            "createdAt": current_date
        })

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Grant tokens to all users in MongoDB.")
    parser.add_argument("--conn", type=str, help="MongoDB Connection String")
    parser.add_argument("--amount", type=int, help="The grant amount associated with the user.")


    args = parser.parse_args()

    grant_to_users(args.amount, args.conn)
