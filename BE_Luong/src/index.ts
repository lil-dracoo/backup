// cách ghi import này của TS 
import express from 'express'; // Import thư viện express để tạo server 
import 'dotenv/config' ;
import webRoutes from './routes/webRoutes';

const app = express();  // Khai báo đối tượng app từ express

const PORT = process.env.PORT || 5000; // Khai báo PORT dùng cho server

// Cấu hình cho req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình cho routes
webRoutes(app);


app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})
