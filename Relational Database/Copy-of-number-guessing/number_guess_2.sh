#!/bin/bash
# cSpell: disable
# number guessing game
# PSQL variable to access database
export PGPASSWORD="sciamano1008"
PSQL="psql -X -U postgres -d number_guess -t --no-align -c" 

# generate secret number using bash
SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))

# ask username
echo "Enter your username:"
# capture username
read -r USERNAME

# check if USER exists
USER_DATA=$($PSQL "SELECT username, games_played, best_game FROM number_guess WHERE username = '$USERNAME';" )
if [[ -z $USER_DATA ]]
then
 # insert new user ( '>/dev/null' hides the results so it doesn't show in the terminal)
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  $PSQL "INSERT INTO number_guess(username, games_played, best_game) VALUES('$USERNAME', 0, NULL);" > /dev/null
else
  # if exists 
  # parse data from existing user
  IFS='|' read -r USERNAME GAMES_PLAYED BEST_GAME <<< "$USER_DATA"
  # show welcome message using printf
  printf "Welcome back, %s! You have played %s games, and your best game took %s guesses.\n" "$USERNAME" "$GAMES_PLAYED" "$BEST_GAME"
fi

# ask for guess
echo "Guess the secret number between 1 and 1000:"
read -r GUESS
# check if guess is an integer
while [[ ! $GUESS =~ ^[0-9]+$ ]]
do
  echo "That is not an integer, guess again:"
  read -r GUESS
done

# start counting tries
NUMBER_OF_GUESSES=1
# loop through the guesses
# shellcheck disable=SC2053
while [[ $GUESS != $SECRET_NUMBER ]]
do
  if [[ $GUESS -gt $SECRET_NUMBER ]]
  then 
    echo "It's lower than that, guess again:"
  else 
    echo "It's higher than that, guess again:"
  fi
  read -r GUESS
  ((NUMBER_OF_GUESSES++))
done

# update best game if it's empty assign directly number of guesses
if [[ -z "$BEST_GAME" || $NUMBER_OF_GUESSES -lt $BEST_GAME ]]
then
  $PSQL "UPDATE number_guess SET best_game=$NUMBER_OF_GUESSES WHERE username = '$USERNAME'" >/dev/null
fi

echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"

# update games played
$PSQL "UPDATE number_guess SET games_played = games_played + 1 WHERE username='$USERNAME';" >/dev/null
exit 0 

