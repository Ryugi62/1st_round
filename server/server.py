from flask import Flask, request, send_from_directory
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# MySQL 연결 설정
db = mysql.connector.connect(
    host="호스트",
    user="아이디",
    password="비밀번호",
    database="데이터베이스"
)


#
@app.route("/")
def first_round():
    print("first_round")
    return send_from_directory(app.static_folder, "html/1st_round.html")


# /api/data 경로로 GET 요청이 오면 데이터베이스에서 데이터를 가져와서 반환
@app.route("/api/data")
def api_data():
    cursor = db.cursor()

    # Sorting
    sort_field = request.args.get("sort")
    if sort_field:
        sort_query = f"SELECT Organization, Type_3, Country, City_name, Project_Title, Type_2, Email, Eval_R1, Score_from_Eval_R2, Weighted_Score_for_Eval_R3, Final_voting_result FROM members ORDER BY {sort_field}"
        cursor.execute(sort_query)
    else:
        cursor.execute("SELECT Organization, Type_3, Country, City_name, Project_Title, Type_2, Email, Eval_R1, Score_from_Eval_R2, Weighted_Score_for_Eval_R3, Final_voting_result FROM members")
    result = cursor.fetchall()

    # Filtering
    filter_value = request.args.get("filter")
    if filter_value:
        filtered_result = []
        for row in result:
            # Assuming filter on 'Organization' field
            if row[0] == filter_value:
                filtered_result.append(row)
        result = filtered_result

    print(result)
    return {"data": result}


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
