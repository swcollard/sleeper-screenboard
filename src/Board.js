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
    this.interval = setInterval(() => this.fetchData(), 1000);
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

    fetch("https://api.sleeper.app/v1/league/726146253938888704/matchups/3")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            matchups: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {matchups.map(matchup => {
            return <Matchup matchup={matchup} rosters={rosters} users={users} />
          })}
        </div>
      );
    }
  }
}

export default Board;
