from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# MySQL 연결 설정
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="1st_round"
)

# 데이터의 키 순서 정의
key_order = ["memberID", "Organization", "Type_3", "Country", "City_name", "Project_Title", "Type_2",
             "Email", "Eval_R1", "Score_from_Eval_R2", "Weighted_Score_for_Eval_R3", "Final_voting_result"]


@app.route("/")
def first_round():
    return send_from_directory(app.static_folder, "html/1st_round.html")


# /api/data 경로로 GET 요청이 오면 데이터베이스에서 데이터를 가져와서 반환
@app.route("/api/data")
def api_data():
    cursor = db.cursor()

    # Sorting
    sort_field = request.args.get("sort")
    if sort_field:
        sort_query = f"SELECT memberID, Organization, Type_3, Country, City_name, Project_Title, Type_2, Email, Eval_R1, Score_from_Eval_R2, Weighted_Score_for_Eval_R3, Final_voting_result FROM members ORDER BY {sort_field}"
        cursor.execute(sort_query)
    else:
        cursor.execute("SELECT memberID, Organization, Type_3, Country, City_name, Project_Title, Type_2, Email, Eval_R1, Score_from_Eval_R2, Weighted_Score_for_Eval_R3, Final_voting_result FROM members")
    result = cursor.fetchall()

    # Formatting result as a list of dictionaries
    data = []
    for row in result:
        data.append({
            "memberID": row[0],
            "Organization": row[1],
            "Type_3": row[2],
            "Country": row[3],
            "City_name": row[4],
            "Project_Title": row[5],
            "Type_2": row[6],
            "Email": row[7],
            "Eval_R1": row[8],
            "Score_from_Eval_R2": row[9],
            "Weighted_Score_for_Eval_R3": row[10],
            "Final_voting_result": row[11]
        })

    # 데이터와 키 순서를 JSON으로 변환하여 응답
    return jsonify({"data": data, "key_order": key_order})


@app.route("/css/<path:path>")
def serve_css(path):
    return send_from_directory('static/css', path)


@app.route("/js/<path:path>")
def serve_js(path):
    return send_from_directory('static/js', path)


@app.route("/img/<path:path>")
def serve_img(path):
    return send_from_directory('static/img', path)


@app.route("/font/<path:path>")
def serve_font(path):
    return send_from_directory('static/font', path)


if __name__ == "__main__":
    app.run(debug=True)
