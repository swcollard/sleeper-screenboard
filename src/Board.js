import React from 'react';
import Matchup from './Matchup';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      matchups: {},
      users: [],
      rosters: [],
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.fetchData(), 90);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  fetchData() {
    fetch("https://api.sleeper.app/v1/league/726146253938888704/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      )
      
    fetch("https://api.sleeper.app/v1/league/726146253938888704/rosters")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            rosters: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      )

    fetch("https://api.sleeper.app/v1/league/726146253938888704/matchups/12")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            matchups: result.sort((a, b) => (a['matchup_id'] > b['matchup_id']) ? 1 : -1),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
  }

  render() {
    const { error, isLoaded, matchups, rosters, users } = this.state;
    if (error) {
      return <div style={{margin:20}}>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin:20}}>Loading...</div>;
    } else {
      let rows = [];
      for (let i = 0; i < matchups.length; i = i + 2) {
        rows.push(
          <Matchup player1={matchups[i]}
            player2={matchups[i+1]}
            rosters={rosters}
            users={users}
            />
          );
      }
      return (
       <div style={{margin:15}}>
         {rows}
       </div>
      );
    }
  }
}

export default Board;
