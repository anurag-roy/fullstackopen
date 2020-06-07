import express, { response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import Person from "./models/person.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postContent"
  )
);

morgan.token("postContent", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.get("/info", (req, res) => {
  const requestDateTime = new Date().toString();
  Person.countDocuments({}).then((result) => {
    res.send(
      `<div>
          Phonebook has info for ${result} people <br /> <br />
          ${requestDateTime}
       </div>`
    );
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: "malformatted id" });
    });
});

app.use(express.json());

app.post("/api/persons", ({ body }, res) => {
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((result) => {
    res.json(result);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(404).end();
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express app started on port ${PORT}`);
});
