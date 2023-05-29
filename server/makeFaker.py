from faker import Faker
import mysql.connector
import random

fake = Faker()

# MySQL 연결 설정
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='1st_round'
)

# 커서 생성
cursor = conn.cursor()

# 만약 테이블이 없으면, 테이블 생성 쿼리
create_table_query = """
    CREATE TABLE IF NOT EXISTS members (
        no INT AUTO_INCREMENT PRIMARY KEY,
        memberID INT,
        Organization VARCHAR(255),
        Type_3 VARCHAR(255),
        Country VARCHAR(255),
        City_name VARCHAR(255),
        Project_Title VARCHAR(255),
        Type_2 VARCHAR(255),
        Email VARCHAR(255),
        Eval_R1 VARCHAR(255),
        Score_from_Eval_R2 INT,
        Weighted_Score_for_Eval_R3 DECIMAL(10, 2),
        Final_voting_result VARCHAR(255)
    )
"""
cursor.execute(create_table_query)

# 데이터 삽입을 위한 INSERT 쿼리
insert_query = """
    INSERT INTO members (memberID, Organization, Type_3, Country, City_name, Project_Title, Type_2, Email, Eval_R1,
                          Score_from_Eval_R2, Weighted_Score_for_Eval_R3, Final_voting_result)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

# 100개의 가짜 데이터 생성 및 데이터베이스에 삽입
for _ in range(100):
    row = [
        random.randint(1000, 9999),  # memberID
        fake.company(),  # Organization
        fake.word(),  # Type_3
        fake.country(),  # Country
        fake.city(),  # City_name
        fake.catch_phrase(),  # Project_Title
        fake.word(),  # Type_2
        fake.email(),  # Email
        fake.sentence(),  # Eval_R1
        random.randint(0, 100),  # Score_from_Eval_R2
        round(random.uniform(0, 10), 2),  # Weighted_Score_for_Eval_R3
        fake.word()  # Final_voting_result
    ]
    cursor.execute(insert_query, row)

# 변경사항을 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()
