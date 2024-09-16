import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';
import path from 'path';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use('/api/images', imageRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});