from flask import request, jsonify, Flask , send_file
import os
from config import app, db
from models import Contact
from models import Image
from werkzeug.utils import secure_filename
from io import BytesIO
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/contacts',methods = ['GET'])
def get_contacts():
    contacts = Contact.query.all()
    contacts_json = list(map(lambda x: x.to_json(),contacts))
    return jsonify({"contacts" : contacts_json})

@app.route("/create_contact",methods  = ['POST'])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return(jsonify({"message" : "You must include a first name, last name and email"}),400,)

    new_contact = Contact(first_name=first_name,last_name=last_name,email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":str(e)}), 400

    return jsonify({"message" : "User Created"}) ,201

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "Usr updated."}), 200

@app.route('/upload', methods=['POST'])
def upload_file():
    print(request.files)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    print(file)
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_data = file.read()

        # Save the image data to the database
        new_image = Image(name=filename, data=file_data)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully', 'id': new_image.id}), 201

    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/uploads/<int:image_id>', methods=['GET'])
def get_file(image_id):
    image = Image.query.get(image_id)
    if not image:
        return jsonify({'error': 'Image not found'}), 404

    return send_file(BytesIO(image.data), mimetype='image/jpeg', as_attachment=False, download_name=image.name)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True,port=5001)
           