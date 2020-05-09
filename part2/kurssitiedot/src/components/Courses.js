import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, p) => sum + p.exercises, 0);
  return (
    <p>
      <b>total of {sum} exercises </b>
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.id} name={p.name} exercises={p.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Courses = ({ courses }) => (
  <div>
    {courses.map((c, i) => (
      <Course key={i} course={c} />
    ))}
  </div>
);

export default Courses;
