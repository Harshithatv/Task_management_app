const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URI="mongodb+srv://user:user@cluster0.8c9vj.mongodb.net/FSD";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
