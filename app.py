from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import os

app = Flask(__name__)

DB_PATH = os.path.join('data', 'runali.db')

def get_productos():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT p.Nombre_producto, p.Descr_producto, p.Precio, p.Imagen, c.nombre
            FROM Productos p
            LEFT JOIN Categoria c ON p.Categoria = c.Id_categoria
        """)
        rows = cursor.fetchall()
        return [
            {
                'nombre': row[0],
                'descripcion': row[1],
                'precio': row[2],
                'imagen': row[3],
                'categoria': row[4]
            } for row in rows
        ]

def get_categorias():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id_categoria, nombre FROM Categoria")
        return cursor.fetchall()

@app.route('/tienda')
def tienda():
    productos = get_productos()
    return render_template('tienda.html', productos=productos)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        nombre = request.form['nombre']
        categoria_id = request.form['categoria']
        descripcion = request.form['descripcion']
        precio = request.form['precio']
        imagen = request.form['imagen']  # Ruta o nombre del archivo

        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO Productos (Nombre_producto, Descr_producto, Categoria, Precio, Imagen)
                VALUES (?, ?, ?, ?, ?)
            """, (nombre, descripcion, categoria_id, precio, imagen))
            conn.commit()

        return redirect(url_for('admin'))

    categorias = get_categorias()
    return render_template('admin.html', categorias=categorias)

if __name__ == '__main__':
    app.run(debug=True)
