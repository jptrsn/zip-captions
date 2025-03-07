from pymongo import MongoClient

def move_documents():

    database_name = "zipcaptions"
    # Prod config
    # connection_string = "" # Get from the azure console
    # client = MongoClient(f"{connection_string}&tlsAllowInvalidCertificates=true")

    # Staging config
    # username = ""
    # password = ""
    # mongo_uri = f"mongodb+srv://{username}:{password}@dev.kuwrosv.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true"
    # client = MongoClient(mongo_uri, server_api=ServerApi('1'))

    # Dev config
    host = "localhost"
    username = ""
    password = ""
    port = 27017
    mongo_uri = f"mongodb://{username}:{password}@{host}:{port}/{database_name}?authSource=admin"
    client = MongoClient(mongo_uri)

    db = client[database_name]  # Replace with your database name

    source_collection = db["creditadd"]
    target_collection = db["creditadds"]

    # Fetch all documents from source collection
    documents = list(source_collection.find())

    if not documents:
        print("No documents found in the source collection.")
        return

    # Insert documents into the target collection
    target_collection.insert_many(documents)

    # Delete documents from the source collection after successful insertion
    source_collection.delete_many({})

    print(f"Moved {len(documents)} documents from 'creditadd' to 'creditadds'.")

if __name__ == "__main__":
    move_documents()
