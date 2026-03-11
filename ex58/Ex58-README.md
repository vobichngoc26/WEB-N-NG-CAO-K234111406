# Exercise 58 - Fashion Website

## Cấu trúc

### 1. server-fashion (Port 4000)
- Express + MongoDB
- APIs: GET all, GET by style, GET by ID, POST, PUT, DELETE
- Database: FashionData.Fashion

### 2. admin-fashion (Port 4001)
- Angular Admin
- Danh sách Fashion: View, Edit, Delete (có confirm)
- Add/Edit form với textarea cho Fashion Details (HTML)
- Sau save quay về danh sách

### 3. client-fashion (Port 4002)
- Angular Client
- Hiển thị Fashion nhóm theo Style (grid)
- Click item → trang chi tiết (render HTML từ details)
- Tìm kiếm/lọc theo Style (input + dropdown)

## Chạy

1. **MongoDB** - Đảm bảo MongoDB đang chạy
2. **Seed data:** `cd server-fashion && node seed-fashion.js`
3. **server-fashion:** `cd server-fashion && node index.js` (port 4000)
4. **admin-fashion:** `cd admin-fashion && npm install && ng serve` (port 4001)
5. **client-fashion:** `cd client-fashion && npm install && ng serve --port 4002`

## API

- GET /api/fashions - Tất cả (sort creationDate desc)
- GET /api/fashions/style/:style - Lọc theo style
- GET /api/fashions/:id - Chi tiết
- POST /api/fashions - Thêm mới
- PUT /api/fashions/:id - Sửa
- DELETE /api/fashions/:id - Xóa
