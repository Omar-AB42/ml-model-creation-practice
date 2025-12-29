import json
import sys
import searoute as sr

def calculate_route(data):
    coordinates = data.get("coordinates", [])
    selected_restrictions = data.get("restrictions", [])
    origin = coordinates[0]
    destination = coordinates[1]
    route = sr.searoute(origin, destination, units="naut", restrictions=selected_restrictions)
    return json.dumps(route)

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    response = calculate_route(input_data)
    print(response)