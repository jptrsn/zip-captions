import argparse
from datetime import date
from pymongo import MongoClient

def revoke_grant(conn=None):
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
    supporters_collection = db["supporters"]

    supporters = list(supporters_collection.find({"amountCents": { "$gt": 0}}))
    supporterEmails = dict()
    for supporter in supporters:
        em = supporter.get("email")
        print(f"{em} is supporter")
        supporterEmails[em] = True

    # Find user by email
    users = list(users_collection.find({"creditBalance": {"$gt": 0}}))

    for user in users:
        email = user.get("primaryEmail")
        balance = user.get("creditBalance")
        if balance == None:
            continue
        if supporterEmails.get(email):
            print(f"Skipping supporter {email}")
            continue
        print(f"Revoking {balance} grant from {email}")
        users_collection.update_one(user, {"$set": {"creditBalance": 0}})



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Grant tokens to all users in MongoDB.")
    parser.add_argument("--conn", type=str, help="MongoDB Connection String")


    args = parser.parse_args()

    revoke_grant(args.conn)
