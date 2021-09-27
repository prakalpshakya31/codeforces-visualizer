import Header from './components/Header'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import CompareScreen from './screens/CompareScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route
            path='/compare'
            component={CompareScreen}
          />
        </Container>
      </main>
    </Router>
  )
}

export default App
