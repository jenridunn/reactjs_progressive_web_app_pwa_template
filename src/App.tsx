import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import Team from './components/Team';

function App() {
  const location = useLocation()

  return (
    <>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <MainHeader />
          <p>Dashboard</p>
          <button onClick={() => {
            navigator.serviceWorker.controller!.postMessage({
              data: "Hi there, this is a test!",
              type: "TEST"
            })
          }} className="p-3 text-white bg-blue-500 flex-1">
            Trigger notification
          </button>
        </Route>
        <Route exact path="/team">
          <MainHeader />
          <div className="container mx-auto my-10">
            <Team />
          </div>
        </Route>
        <Route exact path="/projects">
          <MainHeader />
          <p>Projects</p>
        </Route>
        <Route exact path="/calendar">
          <MainHeader />
          <p>Calendar</p>
        </Route>
      </Switch>
    </>
  );
}


const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
