import argparse
from pymongo import MongoClient

def lookup_user(email, grant_amount, conn=None):
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
    user = users_collection.find_one({"primaryEmail": email})

    if user:
        print("User found:")
        print(user)
        print(f"Grant amount: {grant_amount}")
        # Ensure creditBalance exists before incrementing
        if "creditBalance" not in user:
            users_collection.update_one({"primaryEmail": email}, {"$set": {"creditBalance": grant_amount}})
        else:
            users_collection.update_one({"primaryEmail": email}, {"$inc": {"creditBalance": grant_amount}})
        creditadd_collection.insert_one({
            "userId": user.get("id"),
            "provider": "Manual grant",
            "creditsAdded": grant_amount
        })
    else:
        print("No user found with that email.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Grant tokens to a user by email in MongoDB.")
    parser.add_argument("email", type=str, help="The email address to look up.")
    parser.add_argument("grant_amount", type=int, help="The grant amount associated with the user.")
    # Optional argument for connection string
    parser.add_argument("--conn", type=str, help="MongoDB Connection String")
    args = parser.parse_args()

    lookup_user(args.email, args.grant_amount, args.conn)
