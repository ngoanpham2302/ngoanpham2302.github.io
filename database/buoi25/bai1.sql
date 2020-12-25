-- Bài tập sử dụng database hr. Lưu ý, sử dụng alias cho tập kết quả đầu ra
USE hr;

-- 1. Viết câu lệnh truy vấn lấy ra tất cả country có region = 1 và country name bắt đầu bằng 'A'
SELECT COUNTRY_ID AS 'Country ID', COUNTRY_NAME AS 'Country Name'
FROM countries
WHERE REGION_ID = 1 AND COUNTRY_NAME LIKE 'A%';

-- 2. Viết câu lệnh truy vấn lấy ra tất cả country có country name có độ dài tối thiểu 6 chữ cái
SELECT COUNTRY_ID AS 'Country ID', COUNTRY_NAME AS 'Country Name'
FROM countries
WHERE length(COUNTRY_NAME) >= 6;

-- 3. Viết câu lệnh truy vấn lấy ra tất cả job có max salary trong khoảng 30000 đến 4000 và title có chứa 'program'
SELECT JOB_ID AS 'Job ID', JOB_TITLE AS 'Job Title'
FROM jobs
WHERE JOB_TITLE LIKE '%program%' AND MAX_SALARY BETWEEN 4000 AND 30000;

-- 4. Viết câu lệnh truy vấn lấy ra tất cả employee có department id là 60 và manager là 102 hoặc 103
SELECT EMPLOYEE_ID AS 'Employee ID', FIRST_NAME AS 'First Name', LAST_NAME AS 'Last Name', EMAIL AS Email
FROM employees
WHERE DEPARTMENT_ID = 60 AND MANAGER_ID IN (102, 103);

-- 5. Viết câu lệnh truy vấn lấy ra tất cả employee có job chứa it hoặc pro
SELECT EMPLOYEE_ID AS 'Employee ID', FIRST_NAME AS 'First Name', LAST_NAME AS 'Last Name', EMAIL AS Email, JOB_ID AS 'Job ID'
FROM employees
WHERE JOB_ID LIKE '%it%' OR JOB_ID LIKE '%pro%';

-- Lý thuyết: Trình bày các kiểu quan hệ giữa các bảng trong CSDL quan hệ, lấy ví dụ cụ thể trong thực tế

-- Có 3 kiểu quan hệ giữa các bảng trong CSDL quan hệ:

-- Kiểu 1: Một - Một: 1 record của bảng này chỉ liên kết với 1 record duy nhất của bảng kia.
-- VD: Mối quan hệ vợ - chồng theo quy định pháp luật. Một người chỉ có thể có duy nhất 1 vợ hoặc 1 chồng.

-- Kiểu 2: Một - Nhiều: 1 record của bảng một liên kết với 1, 0 hoặc nhiều record của bảng nhiều.
-- VD: Mối quan hệ giữa mẹ ruột và con ruột. Một người con chỉ có 1 mẹ ruột, 1 người mẹ có thể có nhiều con ruột.

-- Kiểu 3: Nhiều - Nhiều: Mỗi record trong cả 2 bảng có thể liên kết với 1, 0 hoặc nhiều record trong bảng còn lại.
-- VD: Mối quan hệ giữa công ty và nhân viên. Một công ty có nhiều nhân viên, 1 nhân viên có thể đi làm tại nhiều công ty.

