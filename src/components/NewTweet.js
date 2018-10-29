import React, {Component} from 'react';
import {connect} from "react-redux";
import {handleAddTweet} from "../actions/tweets";

class NewTweet extends Component {
    state = {
        text: '',
    };

    handleChange = e => {

        const text = e.target.value;

        this.setState(() => ({
            text,
        }));

    };

    handleSubmit = e => {
        e.preventDefault();

        const {text} = this.state;

        const {dispatch, id} = this.props;
        dispatch(handleAddTweet(text, id));

        console.log("New tweet: ", text);

        this.setState(() => ({
            text: '',
        }));
    };

    render() {
        const {text} = this.state;
        // Redirect to / if submitted
        const tweetLeft = 280 - text.length;
        return (
            <div>
                <h3 className="center">Compose New Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's happening?"
                        className="textarea"
                        maxLength="280"
                        value={text}
                        onChange={this.handleChange}/>
                    {tweetLeft <= 100 && (
                        <div className="tweet-length">
                            {tweetLeft}
                        </div>
                    )}
                    <button className="btn"
                            type="submit"
                            disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

// function mapStateToProps({})

export default connect()(NewTweet);