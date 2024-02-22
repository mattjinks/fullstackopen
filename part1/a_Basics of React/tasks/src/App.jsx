const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} tasks={props.tasks1}/>
      <Part part={props.part2} tasks={props.tasks2}/>
      <Part part={props.part3} tasks={props.tasks3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total: {props.total}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part}: {props.tasks}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} tasks1={exercises1} part2={part2} tasks2={exercises2} part3={part3} tasks3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App