import logging
from flask import Flask
import py_eureka_client.eureka_client as eureka_client

# Set up logging for the application and eureka client
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('py_eureka_client')

EUREKA_SERVER = "http://localhost:8761/eureka"
APP_NAME = "ML-SERVICE"
INSTANCE_PORT = 5000

eureka_client.init(
    eureka_server=EUREKA_SERVER,
    app_name=APP_NAME,
    instance_port=INSTANCE_PORT
)

app = Flask(__name__)

@app.route("/api/ml/get")
def home():
    return "Flask Eureka Client is Running!"

if __name__ == "__main__":
    # Enable debug mode and also ensure the app runs with reloader for live code reloading
    app.run(host='0.0.0.0', port=INSTANCE_PORT, debug=True)
