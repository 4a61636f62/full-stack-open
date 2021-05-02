import React from "react";

const Header = ({ course }) => (
    <h3>{course}</h3>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} part={ part } />
        )}
    </div>
)

const Total = ({ parts }) => (
    <p><b>
            Total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises
    </b></p>
)


const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course