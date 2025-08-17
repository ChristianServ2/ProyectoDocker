# imagen base
FROM python:3.11-slim

# directorio de trabajo dentro del contenedor
WORKDIR /app

# evitar buffering de stdout/stderr
ENV PYTHONUNBUFFERED=1

# copiar requirements e instalar (aprovecha cache)
COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

# copiar el resto del código
COPY . .

# exponer puerto (documentativo)
EXPOSE 8000

# comando por defecto
CMD ["python", "app.py"]
