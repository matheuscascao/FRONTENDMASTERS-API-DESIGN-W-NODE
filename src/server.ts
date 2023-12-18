import express from 'express';
import morgan from 'morgan';
import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.shhh_secret = 'doggy';
  next();
})

app.get('/', (req, res) => {
  console.log("get at / reached");
  res.status(200);
  res.json({ message: 'hello' });
})

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

export default app; 