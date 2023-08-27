import { useState } from 'react';
import { Search } from "@carbon/react";
import './_search-users.scss';

const SearchUsers = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');

    function handleInputChange(e) {
        const { value } = e.target;
        setSearchValue(value);
    }

    async function handleUserSearch(e) {
        e.preventDefault();
        try {
            console.log(searchValue);
            const request = await fetch("http://localhost:5050/api/database/users/findUser", {
                method: "POST",
                cors: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": searchValue
                }),
            });
            const { details } = await request.json();
            const user = details[0].Users[0];
            console.log(user);

            setDisplayName(user.displayName);
            setEmail(user.email);
            setShowResults(true);
            console.log(displayName, email)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form
            className="user-search-form"
            onSubmit={handleUserSearch}
        >
            <Search
                id="searchUsers"
                labelText="Search for users"
                placeholder="Search for users"
                size="lg"
                value={searchValue}
                onChange={handleInputChange}
            />

            { showResults && <div className="user-search-results">
                <h3>Results</h3>
                <p>{displayName}</p>
                <p>{email}</p>
            </div>}
        </form>
    );
}

export default SearchUsers;