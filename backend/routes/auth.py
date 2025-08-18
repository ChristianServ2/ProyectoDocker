from flask import Blueprint, request, jsonify
from config.config import get_db
from models.user import User
from sqlalchemy.exc import IntegrityError
import jwt
import datetime
from config.config import Config

auth_bp = Blueprint("auth", __name__)

# Registro de usuario
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")

    if not nombre or not email or not password:
        return jsonify({"error": "Faltan datos"}), 400

    db = next(get_db())

    try:
        nuevo_usuario = User(nombre=nombre, email=email, password=password)
        db.add(nuevo_usuario)
        db.commit()
        return jsonify({"message": "Usuario registrado correctamente"}), 201
    except IntegrityError:
        db.rollback()
        return jsonify({"error": "El email ya está registrado"}), 409
    finally:
        db.close()


# Login de usuario
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Faltan credenciales"}), 400

    db = next(get_db())
    user = db.query(User).filter(User.email == email).first()

    if user and user.password == password:   # Comparación directa (texto plano)
        token = jwt.encode(
            {
                "user_id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            },
            Config.SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"message": "Login exitoso", "token": token}), 200
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401
