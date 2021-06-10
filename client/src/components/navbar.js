import React, { useState, Component, useContext } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function Navbar(props) { 
    const state = { activeItem: 'polls' };
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'polls' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { name }) => setActiveItem(name);
    const { user, logout } = useContext(AuthContext);

    const menuBar = user ? (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="polls"
            onClick={handleItemClick}
            as={Link}
            to="/"
            >
             <span className={"navbarRecruiter"}>Recruiter</span><span className={"navbarPolls"}>Polls</span>
            </Menu.Item>
          <Menu.Item
            name='polls'
            active={activeItem === 'polls'}
            onClick={handleItemClick}
            className={"navbarText"}
            as={Link}
            to="/"
          />
          {/*<Menu.Item
            name='analytics'
            active={activeItem === 'analytics'}
            onClick={handleItemClick}
            className={"navbarText"}
            as={Link}
            to="/analytics"
          >Analytics </Menu.Item>*/}
          <Menu.Item
            name='createpoll'
            active={activeItem === 'createpoll'}
            onClick={handleItemClick}
            className={"navbarText"}
            as={Link}
            to="/createpoll"
          >Create Poll</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
            >
              {"Hey " + user.email + " !"}
            </Menu.Item>
            <Menu.Item
              name='logout'
              onClick={logout}
            />
            </Menu.Menu>
          
        </Menu>
      </div>

    ) : (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="polls"
            onClick={handleItemClick}
            as={Link}
            to="/"
            >
             <span className={"navbarRecruiter"}>Recruiter</span><span className={"navbarPolls"}>Polls</span>
            </Menu.Item>
          <Menu.Item
            name='polls'
            active={activeItem === 'polls'}
            onClick={handleItemClick}
            className={"navbarText"}
            as={Link}
            to="/"
          />
          {/*<Menu.Item
            name='analytics'
            active={activeItem === 'analytics'}
            onClick={handleItemClick}
            className={"navbarText"}
            as={Link}
            to="/analytics"
          >Analytics </Menu.Item>*/}
          <Menu.Item
            name='createpoll'
            active={activeItem === 'createpoll'}
            onClick={handleItemClick}
            className={"navbarText"}
            as={Link}
            to="/createpoll"
          >Create Poll</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              className={"navbarText"}
              as={Link}
              to="/register"
              
            />
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              className={"navbarText"}
              as={Link}
              to="/login"
            />
            </Menu.Menu>
          
        </Menu>
      </div>
    )
  
    return menuBar;
}

export default Navbar;