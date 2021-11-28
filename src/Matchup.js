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
        const teamName1 = users.find(user => user["user_id"] === userId1)["metadata"]["team_name"];
        const rosterId2 = player2["roster_id"];
        const userId2 = rosters.find(roster => roster["roster_id"] === rosterId2)["owner_id"];
        const teamName2 = users.find(user => user["user_id"] === userId2)["metadata"]["team_name"];
        return (
            <div className="match-row">
                <p>
                    Team: {teamName1}
                </p>
                <p>
                    Points: {player1["points"]}
                </p>
                <p>
                    Team: {teamName2}
                </p>
                <p>
                    Points: {player2["points"]}
                </p>
                <br />
            </div>
        );
    }
}

export default Matchup;
