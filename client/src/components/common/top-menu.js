import React from 'react'
import { Menu } from 'semantic-ui-react'
import logo from '../../logo.svg';
import {Routes} from '../../routes'
import {Link} from 'react-router-dom'

class TopMenu extends React.Component {
    state = {};

    handleMenuClick = (e, {name}) => {
        this.setState({ activeItem: name });
    };

    render() {
        const { activeItem } = this.state;
        return (
            <Menu stackable>
                <Menu.Item>
                    <img src={logo} className="App-logo" alt="logo" />
                </Menu.Item>
                <Menu.Item
                    name="create-post"
                    active={activeItem === 'create-post'}
                    as={Link} to={Routes.NEW_POST.path}
                    onClick={this.handleMenuClick}>
                    Create post
                </Menu.Item>
                <Menu.Item
                    name="view-posts"
                    active={activeItem === 'view-posts'}
                    as={Link} to={Routes.POST_LIST.path}
                    onClick={this.handleMenuClick}>
                    View all posts
                </Menu.Item>
                <Menu.Item
                    name="account"
                    active={activeItem === 'account'}
                    as={Link} to={Routes.INDEX.path}
                    onClick={this.handleMenuClick}>
                    Manage account
                </Menu.Item>
            </Menu>
        );
    }
}

export default TopMenu;