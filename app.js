import express from 'express';
const app = express();
const port = 3000
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next();
})


app.get('/getall', async (req, res) => {
  let items = await prisma.item.findMany();
  let spaces = await prisma.space.findMany();

  for (let i = 0; i < spaces.length; i++) {
    spaces[i].items = items.filter(((item) => item.space_id == spaces[i].id));
  }

  res.json(spaces);

});

app.delete('/item/:id', async (req, res) => {
  const db_response = await prisma.item.delete({
    where: {
      id: parseInt(req.params.id)
    } 
  })
  res.json(db_response)
})

app.post('/item', async (req, res) => {
  let body = req.body;
  console.log(body)
  const db_response = await prisma.item.create({
    data: {
      name: body.name,
      amount: parseInt(body.amount),
      space_id: parseInt(body.space_id)
    }
  })

  res.json(db_response)
});

app.post('/space', async (req, res) => {
  let body = req.body;
  const db_response = await prisma.space.create({
    data: {
      name: body.name
    }
  })

  res.json(db_response)
});




app.listen(port, () => {
  console.log(`Running on port ${port}`)
});