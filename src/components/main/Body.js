import classes from './Body.module.css'
import { FETCH_URL, URL_PARAM, GITHUB_TOKEN } from '../../shared/helpers/Constants'
import { useState, useEffect } from 'react'
import Result from './searchResult/Result'
import Pagination from './paginationLinks/Pagination'

function Body() {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [queryString, setQuery] = useState('');
    const [totalCount, setCount] = useState(0);
    const [page, setPage] = useState(1);

    async function fetchUsers(pagination = 0) {
        if (queryString != '') {
            // for Pagination Porpuses (because github doesnt give the whole list)
            let fetchUrl = FETCH_URL + queryString + URL_PARAM;
            if (pagination != page) {
                fetchUrl += pagination;
            }
            else {
                fetchUrl += page;
                setPage(pagination);
            }
            // Request
            const response = await fetch(fetchUrl, {
                headers: {
                    'Authorization': GITHUB_TOKEN,
                }
            });

            const data = await response.json();

            // Github API prevents from showing more then 1000 results
            if (data.total_count / 100 > 10) {
                setCount(10);
            }
            else {
                setCount((data.total_count / 100).toFixed());
            }

            const transformUserList = data.items.map((users) => {
                return {
                    id: users.id,
                    username: users.login,
                    avatar: users.avatar_url,
                    url: users.html_url
                };
            });
            setUsers(transformUserList);
            setShowUsers(true);
        }
        // else if (queryString.length > 1) {

        // Here I Tried To Make an API call only once and then filter the given array with the input if inputs length was more then 1
        // but didnt succeed because github API only returns 100 results at max .

        //     setUsers(users.filter(user => user.username.includes(queryString)))
        // }
        else {
            setShowUsers(false);
        }
    }

    // this is needed because UseState is async and doesnt change up the value on the first call
    useEffect(() => {
        fetchUsers();
    }, [queryString]);

    const usersList = (
        <ul className={classes.searchList}>
            {users.map((user) => (
                <Result username={user.username} avatar={user.avatar} url={user.url} key={user.id} />
            ))}
        </ul>
    );

    const pagination = (
        <ul className={classes.pagination}>
            <Pagination count={totalCount} paginate={fetchUsers} />
        </ul>
    );

    return (
        <div className={classes.mainDiv}>
            <h1>Search Github Users</h1>
            <form>
                <input type='text' id='input' onInput={e => {
                    setQuery(e.currentTarget.value)
                }} autoComplete='off' maxLength='25' placeholder='Search...'/>
            </form>
            {showUsers && usersList}
            {showUsers && pagination}
        </div>
    );
}

export default Body;