import React from 'react';

class Matchup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            rosters: props.rosters,
            player1: props.player1,
            player2: props.player2,
        };
    }
  
    render() {
        const { player1, player2, rosters, users } = this.state;
        const rosterId1 = player1["roster_id"];
        const userId1 = rosters.find(roster => roster["roster_id"] === rosterId1)["owner_id"];
        const teamName1 = users.find(user => user["user_id"] === userId1)["display_name"];
        const player1Points = player1["points"];
        const rosterId2 = player2["roster_id"];
        const userId2 = rosters.find(roster => roster["roster_id"] === rosterId2)["owner_id"];
        const teamName2 = users.find(user => user["user_id"] === userId2)["display_name"];
        const player2Points = player2["points"];
        if (player1Points == player2Points) {
            return (
                <div className="match-row">
                    <p>Team: {teamName1} - Points: {player1Points}</p>
                    <p>Team: {teamName2} - Points: {player2Points}</p>
                    <br />
                </div>
            );
        }
        if (player1Points > player2Points) {
            return (
                <div className="match-row">
                    <b><p>Team: {teamName1} - Points: {player1Points}</p></b>
                    <p>Team: {teamName2} - Points: {player2Points}</p>
                    <br />
                </div>
            );
        }
        return (
            <div className="match-row">
                <p>Team: {teamName1} - Points: {player1Points}</p>
                <b><p>Team: {teamName2} - Points: {player2Points}</p></b>
                <br />
            </div>
        );
    }
}

export default Matchup;
