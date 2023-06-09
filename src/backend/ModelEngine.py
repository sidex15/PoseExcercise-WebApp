from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import json
from landmarks import firstRow
from gevent.pywsgi import WSGIServer

model = joblib.load('exercisev3.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['GET', 'POST'])

def predict():
    # [0.6796852350234985,0.8168056607246399,0.6872261762619019,0.8292861580848694,0.6869760751724243,0.8325481414794922,0.6867300868034363,0.835970401763916,0.6874196529388428,0.8257071375846863,0.6873446106910706,0.8262103796005249,0.6872843503952026,0.8267785310745239,0.6798869371414185,0.8593814373016357,0.6807712316513062,0.8466081023216248,0.6693369746208191,0.8217947483062744,0.6694339513778687,0.8171848058700562,0.6399419903755188,0.890340268611908,0.6262477040290833,0.835513710975647,0.6351516246795654,0.7777290940284729,0.6107093095779419,0.7285834550857544,0.6203286051750183,0.7269341349601746,0.6188226938247681,0.7148019075393677,0.6186675429344177,0.7173925042152405,0.6214983463287354,0.7161418199539185,0.6194551587104797,0.7236085534095764,0.6222420334815979,0.7265554666519165,0.6187022924423218,0.7286018133163452,0.6206209659576416,0.7291669845581055,0.48542383313179016,0.8885858058929443,0.4844444990158081,0.8418981432914734,0.40403109788894653,0.7487258315086365,0.4138375520706177,0.7133138179779053,0.32867711782455444,0.885360598564148,0.33969923853874207,0.8490241169929504,0.336376816034317,0.9149777293205261,0.34603577852249146,0.8751713633537292,0.2713404595851898,0.9177325367927551,0.28548967838287354,0.8802047967910767]
    dataArray = request.get_json()

    #THIS CODE IS ONLY FOR TESTING TO PRINT THE RECEIVED DATA FROM JS REQUEST
    # print(dataArray)
    
    
    # THIS CODE is only for sending an object in JSON
    # parsedData = json.loads(data['landmarks'])
    
    # data_array = parsedData
   
    # row = np.array(data_array).flatten()
    
    landmarks = firstRow()
    data = pd.DataFrame([dataArray], columns=landmarks[1:])
    
    # pose_prob = model.predict_proba(data)[0]
    prediction = model.predict(data)[0]
    pose_prob = model.predict_proba(data)[0]
    
    if(pose_prob[pose_prob.argmax()]>=.90):
        response = {'prediction': prediction}
    elif(pose_prob[pose_prob.argmax()]>=.50):
        response = {'prediction': prediction}
    else:
        response = {'prediction': prediction}
        
    return jsonify(response)    
    
if __name__ == '__main__':
   #app.run(debug=True)
    http_server = WSGIServer(('0.0.0.0', 5000), app)
    http_server.serve_forever()
