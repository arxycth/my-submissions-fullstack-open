const Course = ({courses}) => {
  return (
  <div>
    {courses.map(course =>(
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    ))}
  </div>
  )


}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part=>(
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((s, p,) => {
    return (s.exercises?s.exercises: s) + p.exercises
  })

  return (
    <p>total of {total} exercises</p>
  )
}

export default Course
