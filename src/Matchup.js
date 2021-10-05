import React from 'react';

class Matchup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            rosters: props.rosters,
            matchup: props.matchup,
        };
    }
  
    render() {
        const { matchup, rosters, users } = this.state;
        const rosterId = matchup["roster_id"];
        const userId = rosters.find(roster => roster["roster_id"] === rosterId)["owner_id"];
        const teamName = users.find(user => user["user_id"] === userId)["metadata"]["team_name"];
        return (
            <div className="match-row">
                <p>
                    Team: {teamName}
                </p>
                <p>
                    Points: {matchup["points"]}
                </p>
                <br />
            </div>
        );
    }
}

export default Matchup;
