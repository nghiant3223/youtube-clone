import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            isLoading: true
        }
    }

    componentWillMount() {
        axios.get('/api/history')
            .then((res) => this.setState((prev) => ({ isLoading: !prev.isLoading, videos: res.data })));
    }

    render() {
        if (this.state.isLoading) return null;
        return (
            <div id="watchlater-container">
                {this.state.videos.map((video) => {
                    return <div key={video.id} id='search_video_container'>
                        <Link to={'/video/' + video.id}><div id="video_display_container">
                            <img id="search_video_img" src={"/images/thumbnails/" + video.id + ".png"} />
                        </div></Link>
                        <div className="search_words_container">
                            <Link to={'/video/' + video.id}><h1 id="search_video_title">{video.title}</h1></Link>
                            <h2 id="search_video_channel">{video.channelTitle}</h2>
                            <ul>
                                <li>{video.publishedAt}</li>
                                <li>&ensp;•&ensp;</li>
                                <li>{video.viewCount} views</li>
                            </ul>
                            <p id="search_video_desc">{video.description}</p>
                        </div>
                    </div>
                }
                )}
            </div>
        );
    }
}

export default History;
