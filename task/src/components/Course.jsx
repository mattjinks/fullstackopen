import Header from './Header'
import Content from './Content'

const Course = (props) => {
    const { course } = props
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <p>total of {total} exercises</p>
        </div>
    )
}

export default Course