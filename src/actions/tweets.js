import {saveLikeToggle, saveTweet} from "../utils/api";
import {hideLoading, showLoading} from "react-redux-loading";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet,
    }
}

function toggleTweet({id, authedUser, hasLiked}) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked,
    }
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info));

        return saveLikeToggle(info)
            .catch(e => {
                console.warn('Error in handleToggleTweet: ', e);
                dispatch(toggleTweet(info));
                alert('There was an error liking the tweet. Try again.');
            })
    }
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {

        const {authedUser} = getState();
        dispatch(showLoading());

        return saveTweet({
            text,
            author: authedUser,
            replyingTo,
        })
            .then((tweet) => {
                dispatch(addTweet(tweet));
            })
            .then(() => dispatch(hideLoading()));
    }
}