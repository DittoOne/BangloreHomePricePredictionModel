from flask import Flask,render_template,request,jsonify
import util
app = Flask(__name__)

@app.route('/get_location_names')
def get_location_names():
    response = jsonify(
        {
            'locations': util.get_location_names()
        }
    )
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


@app.route('/predict_home_price',methods = ['POST'])
def predict_home_price():

    try:
        sqft = float(request.form['total_sqft'])
        location = request.form['location']
        bhk = int(request.form['bhk'])
        bath = int(request.form['bath'])

        response = jsonify({
           'estimated_price': util.get_estimated_price(location,sqft,bhk,bath)
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
            return jsonify({'error': str(e)}), 400

if __name__ =="__main__":
    util.load_saved_artifects()
    print("starting Python Flask Server "
          "for Home price prediction")
    app.run(port=8080)
