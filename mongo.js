const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

const url =
  `mongodb+srv://mattjinks:1998dest@fullstack.q0wceiv.mongodb.net/personApp?retryWrites=true&w=majority&appName=Fullstack`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//     id: 1,
//     name: name,
//     number: number
// })

// person.save().then(result => {
//   console.log('person saved!')
//   //mongoose.connection.close()
// })

Person.find({}).then(result => {
    result.forEach(person => {
      let name = person.name
      let number = person.number
      //console.log(`${name}: ${number}`)
      console.log(result)
    })
    mongoose.connection.close()
  })

//mongoose.connection.close()