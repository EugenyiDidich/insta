import React, {Component} from 'react';
import InstaService from '../services/instaservice';
import User from './User';
import ErrorMessage from './ErrorMessage';

export default class Users extends Component {

    InstaService = new InstaService();

    state = {
        users: [],
        error: false
    }

    componentDidMount() {
        this.updateUsers()
    }

    updateUsers() {
        this.InstaService.getAllPosts()
        .then(this.onUsersLoaded)
        .catch(this.onError)
    }

    onUsersLoaded = (users) => {
        this.setState({
            users,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true
        })
    }

    renderItems(arr) {
        return arr.map(item => {
            const { name, altname, photo, id } = item;

            return (
                <a href="#" className="user min" key={id}>
                    <img src={photo} altname={altname}/>
                    <div>{name}</div>
                </a>
            )
        })
    }

   render() {

        const {error, users} = this.state

        if(error) {
            return <ErrorMessage/>
        }

        const items = this.renderItems(users)

        return (
            <div className="right">
                <User 
                    src="https://image.shutterstock.com/image-photo/close-portrait-smiling-handsome-man-260nw-1011569245.jpg"
                    alt="prince" 
                    name="Harry__the_prince"
                />
                <div className="users__block">
                    { items }
                </div>

            </div>
        )
    }
}