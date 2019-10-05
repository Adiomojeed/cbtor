import React from 'react';
import SideBarNav from './SideBarNav';
import PulseLoader from '../components/PulseLoader';

/*
* Shows the user information on a small screen sidebar.
* */
const UserInfo = ({ firstName, lastName, email }) => {
    return (
        <div className="pt-4">
            <div className='d-flex justify-content-center'>
                <img src="/images/mario.svg" alt="User name is here" className="user-avatar"/>
            </div>
            <div className="text-center user--details pt-2">
                <h5 className="font-weight-bold mb-0">
                    { `${firstName} ${lastName}` }
                </h5>
                <small>{ email } <br/> 50 Exams taken</small>
            </div>
        </div>
    );
};

/*
* Navgiation sidebar on a small and extra small
* screens.
* */
const NavBar = ({ user }) => {
    const { email, firstName, lastName } = user;
    return (
        <React.Fragment>
            <nav className="navbar navbar-light">
                <a className="navbar-brand" href="#">
                    <span className='fa fa-bell alarm-icon'></span>
                    <small className="badge badge-danger">7</small>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="fa fa-bars" />
                </button>

                <div className="collapse navbar-collapse px-0 py-0 mb-0" id="navbarSupportedContent">
                    { /* element here. */ }
                    { user.email
                        ? <UserInfo firstName={firstName} lastName={lastName} email={email} />
                        : <PulseLoader color="#fff" />
                    }
                    <div className="sidebar__padded">
                        <div className="sidebar__padded sidebar__divider">
                        </div>
                    </div>
                    <SideBarNav />
                    <div className="sidebar__padded">
                        <div className="sidebar__padded sidebar__divider">
                        </div>
                    </div>
                    <div>
                        <ul className="sidebar__list">
                            <li><a href="#" data-toggle="modal" data-target="#logout-modal">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default NavBar;
