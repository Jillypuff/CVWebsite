import json
import os

FILE_PATH = '../data/expertise.json'

def load_data():
    if not os.path.exists(FILE_PATH):
        return {"expertise": []}
    with open(FILE_PATH, 'r') as file:
        return json.load(file)

def save_data(data):
    with open(FILE_PATH, 'w') as file:
        json.dump(data, file, indent=2)

def add_expertise():
    name = input("Name: ")
    proficiency = int(input("Proficiency (0-10): "))
    short_desc = input("Short Description: ")
    full_desc = input("Full Description: ")
    category = input("Category: ")
    tags = input("Tags (comma-separated): ").split(',')

    expertise = {
        "name": name,
        "proficiency": proficiency,
        "shortDescription": short_desc,
        "fullDescription": full_desc,
        "category": category,
        "tags": [tag.strip() for tag in tags]
    }

    data = load_data()
    data["expertise"].append(expertise)
    save_data(data)
    print(f"\n✅ Added '{name}' to expertise.\n")

def list_expertise(data):
    for i, e in enumerate(data["expertise"]):
        print(f"{i}: {e['name']} (Proficiency: {e['proficiency']})")

def delete_expertise():
    data = load_data()
    list_expertise(data)
    index = int(input("Enter the index of the item to delete: "))
    removed = data["expertise"].pop(index)
    save_data(data)
    print(f"\n❌ Removed '{removed['name']}'.\n")

def update_expertise():
    data = load_data()
    list_expertise(data)
    index = int(input("Enter the index of the item to update: "))
    item = data["expertise"][index]
    print(f"\nEditing '{item['name']}' — leave blank to keep existing values.\n")

    for key in ["name", "proficiency", "shortDescription", "fullDescription", "category", "tags"]:
        current = item[key]
        new_val = input(f"{key} (current: {current}): ")
        if new_val.strip():
            if key == "proficiency":
                item[key] = int(new_val)
            elif key == "tags":
                item[key] = [t.strip() for t in new_val.split(',')]
            else:
                item[key] = new_val

    data["expertise"][index] = item
    save_data(data)
    print(f"\n🔁 Updated '{item['name']}'.\n")

def main():
    while True:
        print("== Expertise Editor ==")
        print("1. Add expertise")
        print("2. Update expertise")
        print("3. Delete expertise")
        print("4. List all")
        print("0. Exit")
        choice = input("> ")

        if choice == '1':
            add_expertise()
        elif choice == '2':
            update_expertise()
        elif choice == '3':
            delete_expertise()
        elif choice == '4':
            list_expertise(load_data())
            print()
        elif choice == '0':
            break
        else:
            print("Invalid option.\n")

if __name__ == "__main__":
    main()
