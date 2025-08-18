from flask import Flask
from config.config import Config
from routes.auth import auth_bp
from flask_cors import CORS  # 👈 importamos CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Habilitar CORS para todas las rutas
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Registrar Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
