from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def handle_data():
    user_id = "john_doe_17091999"  # Replace with your actual user ID
    email = "john@xyz.com"  # Replace with your actual email
    roll_number = "ABCD123"  # Replace with your actual roll number

    if request.method == 'POST':
        data = request.get_json()
        
        numbers = [item for item in data.get('data', []) if item.isdigit()]
        alphabets = [item for item in data.get('data', []) if item.isalpha()]
        highest_alphabet = [max(alphabets, key=lambda x: x.upper())] if alphabets else []

        response = {
            'is_success': True,
            'user_id': user_id,
            'email': email,
            'roll_number': roll_number,
            'numbers': numbers,
            'alphabets': alphabets,
            'highest_alphabet': highest_alphabet
        }
        
        return jsonify(response)
    
    elif request.method == 'GET':
        return jsonify({'operation_code': 1})

if __name__ == '__main__':
    app.run(debug=True)
