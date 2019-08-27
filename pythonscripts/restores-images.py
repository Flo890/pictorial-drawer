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

for (id,data) in cursor:
    parsed_json = json.loads(data)
    image_base_64 = parsed_json['image']
    image_id = parsed_json['imageId']

    imgdata = base64.b64decode(image_base_64[22:])
    filename = 'out/image-%s-%s.png' % (image_id,id)  # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)


cursor.close()
cnx.close()