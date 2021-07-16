import React from 'react'
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';
import {  useState } from 'react';

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
        refreshUser();
    }

    // const getMyNweets = async() => {
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid)
    //         .get();
    //     console.log(nweets.docs.map((doc) => doc.data()));
    // };

    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    const onChange = (event) => {
        const { target: { value }} = event;
        setnewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
        refreshUser();
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    placeholder="Display name" 
                    onChange={onChange} 
                    autoFocus
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }} 
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

export default Profile;
