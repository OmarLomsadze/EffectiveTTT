import classes from './Result.module.css'

const Result = (props) => {
    return (<a href={props.url} className={classes.user} target='_blank' key={props.id}>
        <p className={classes.userName}>{props.username}</p>
        <img width='50' src={props.avatar} className={classes.userImg}></img>
    </a>);
};

export default Result;