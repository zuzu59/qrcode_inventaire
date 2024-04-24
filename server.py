#!/usr/bin/env python # [1]
"""\
Petit script pour faire un petit serveur WEB https pour des tests de dev
zf240424.1204

Installation:
pip3 install flask flask_sslify ssl
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -sha256 -nodes

Usage: 
python3 server.py
"""


from flask import Flask, render_template, send_from_directory
from flask_sslify import SSLify
import ssl
import os

app = Flask(__name__)
sslify = SSLify(app)

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/<path:filename>')
def serve_html(filename):
    file_parts = filename.split('?')
    filename = file_parts[0]

    if filename == '':
        return render_template('index.html')
    elif filename.endswith('.html'):
        return render_template(filename)
    else:
        return send_from_directory('static', filename)




@app.after_request
def add_security_headers(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
    return response

if __name__ == '__main__':
    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    context.load_cert_chain('cert.pem', 'key.pem')
    context.verify_mode = ssl.CERT_NONE
    app.run(host='0.0.0.0', port=8443, ssl_context=context, debug=True)
