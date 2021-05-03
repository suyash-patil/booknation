import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true
  },
  {
    name: 'John',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Alex',
    email: 'alex@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Jane',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users