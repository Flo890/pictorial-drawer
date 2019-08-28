import mysql.connector
import json
import base64

cnx = mysql.connector.connect(user='root', password='root',
                              host='127.0.0.1',
                              database='pictorial_server')


query = ("SELECT id,data FROM logdata "
         "WHERE timestamp > '2019-08-23 14:00'")

cursor = cnx.cursor()
cursor.execute(query)

datajson_no_img = {}
datajson_no_img['data'] = []

for (id,data) in cursor:
    parsed_json = json.loads(data)
    image_base_64 = parsed_json['image']
    image_id = parsed_json['imageId']
    survey_id = parsed_json['surveyId']

    imgdata = base64.b64decode(image_base_64[22:])
    filename = 'out/image-%s-%s.png' % (image_id,survey_id)  # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)

    # write other data into json file
    parsed_json['image'] = 'omitted'
    parsed_json['filename'] = filename
    datajson_no_img['data'].append(parsed_json)

with open('out/data_noimgs.json', 'w') as json_file:
    json.dump(datajson_no_img, json_file)


cursor.close()
cnx.close()