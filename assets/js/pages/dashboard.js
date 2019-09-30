import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import TakeExam from '../components/dashboard/TakeExam';
import Wallet from '../components/dashboard/Wallet';
import Scores from '../components/dashboard/Scores';
import Feedback from '../components/dashboard/Feedback';
import Password from '../components/dashboard/Password';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <NavBar />
                    { /* Sidebar goes in here */}
                    <SideBar/>
                    <div className="row justify-content-end">
                        <div className="col-12 col-md-9">
                            <TopBar />
                            <Route path="/dashboard" component={TakeExam} exact/>
                            <Route path="/wallet" component={Wallet} exact/>
                            <Route path="/score" component={Scores} exact/>
                            <Route path="/feedback" component={Feedback} exact/>
                            <Route path="/password" component={Password} exact/>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<Dashboard />, document.querySelector('#app'));