import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store';
import * as Actions from '../actions';
import eventEmitter from "../lib/eventEmitter";
import * as constStr from "../lib/const";

export default class Single  extends React.Component {
    constructor() {
        super();
    }

    id2Song(id) {
        fetch(`${__REQUESTHOST}/api/music/url?id=${id}`, {
            method: 'GET',
        }).then((res) => {
            return res.json();
        }).then(data => {
            if(data.code == 200) {
                if(data.data.length > 0) {
                    store.dispatch(Actions.setCurrentSong(data.data[0]));
                    eventEmitter.emit(constStr.INITAUDIO);
                }
            }
        })
    }

    render() {
        let data = this.props.data;
        let currentSong = store.getState().main.currentSong || {};
        return (
            <div className="single-item">
                <div className="item-list">
                    {
                        data.map((data, k) => {
                            return(
                                <div key={k} className={`song-itembox ${currentSong.id == data.id?'song-itembox-active':''}`} onDoubleClick={this.id2Song.bind(this, data.id)}>
                                    <div className="cover"><img src={data.album.artist.img1v1Url}/></div>
                                    <div className="info">
                                        <div className="name">{data.name}</div>
                                        <div className="singer">{data.artists[0].name}</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}