import React, { useEffect, useState } from 'react';
import * as Api from "../Common/requestApi";
import * as ApiRoutes from "../Common/apiRoute";


const PlayerDetails = (props) => {

    const [playerData, setPlayerData] = useState([])
    const [filteredPlayerData, setfilteredPlayerData] = useState([])
    const [searchName, setSearchName] = useState("")
   
    useEffect(() => {
        getPlayerDetails();
    }, [])

    const getPlayerDetails = () => {
        Api.GET(ApiRoutes.playerDetails).then(res => {
            if(res.data){
                let data = res.data.playerList.sort(function(a, b){return parseFloat(a.Value) - parseFloat(b.Value)});
                setPlayerData(data)
                setfilteredPlayerData(data)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const userLocalDateTime = (date) => {
        var serverDate = new Date(date);
        var serverDateStr = serverDate.toLocaleString("en-US", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
        })
        var userDate = new Date(serverDateStr + " UTC");
        var locale = window.navigator.userLanguage || window.navigator.language;

        var clientDateTimeStr = userDate.toLocaleString(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
        });

        return clientDateTimeStr;
    }

    const handleSearchName = (e) => {
        setSearchName(e.target.name)
    }

    const searchHandler = (e) => {
        let { value } = e.target
        let filteredPlayers = filteredPlayerData.filter(player => player[searchName].includes(value))
        setPlayerData(filteredPlayers)
    }

    return(
        <div>
            <header>
                <h1>Players Detail</h1>
            </header>
            <div className="btn-custom">
                <button type="button" name="TName" className="btn btn-lg btn-primary" disabled={searchName === "TName"} onClick={handleSearchName}>Team name</button>
                <button type="button" name="PFName" className="btn btn-lg btn-primary" disabled={searchName === "PFName"} onClick={handleSearchName}>Player name</button>
            </div>
            <div className="input-div">
                <input type="text" placeholder='Search' onChange={searchHandler} disabled={!searchName}/>
            </div>
            <div className="app-1">
        {
            playerData && playerData.length > 0 && playerData.map((player, index) => {
                return (
                    <div className="card mb-3 col-md-4 col-sm-12 col-lg-3" style={{"minWidth": "447px"}} key={`${index}`}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                    <img src={require(`../Assets/images/${player.Id}.jpg`).default} className="card-img custom-img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{player.PFName}</h5>
                        <p className="card-text">{player.SkillDesc}</p>
                        <p className="card-text">{`$${player.Value}`}</p>
                        {
                            player.UpComingMatchesList.map((match, index) => {
                                return (
                                    <div key={`${index}`}>
                                        <p className="card-text">{`Upcoming matches:- ${match.CCode} vs ${match.VsCCode}`}</p>
                                        <p className="card-text"><small className="text-muted">{`Next match will be on ${userLocalDateTime(match.MDate)}`}</small></p>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    </div>
                </div>
                </div>
                )
            })
        }
        </div>
        </div>
    )
}

export default PlayerDetails;