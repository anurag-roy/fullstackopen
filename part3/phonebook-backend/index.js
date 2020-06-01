import express from "express";

const app = express();

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const requestDateTime = new Date().toString();
  res.send(
    `<div>
      Phonebook has info for ${persons.length} people <br /> <br />
      ${requestDateTime}
    </div>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express app started on port ${PORT}`);
});
