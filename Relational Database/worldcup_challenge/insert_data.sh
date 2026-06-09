#! /bin/bash
# cSpell: disable

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
# Clean existing data before inserting new ones
$PSQL "TRUNCATE TABLE teams, games RESTART IDENTITY;"
cat games.csv | while IFS=',' read YEAR ROUND WINNER OPPONENT WIN_GOALS OPP_GOALS
do
# Skip the first line
if [[ $YEAR != 'year' ]]
then
  $PSQL "INSERT INTO teams(name) VALUES('$WINNER') ON CONFLICT (name) DO NOTHING;"
  $PSQL "INSERT INTO teams(name) VALUES('$OPPONENT') ON CONFLICT (name) DO NOTHING;"
  # find winner_id and opponent_id
  WIN_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER';")
  OPP_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT';")
  echo "$WIN_ID, $OPP_ID"
  # Inserting data in games table
  $PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals)\
  VALUES($YEAR, '$ROUND', $WIN_ID, $OPP_ID, $WIN_GOALS, $OPP_GOALS)"
fi
done

