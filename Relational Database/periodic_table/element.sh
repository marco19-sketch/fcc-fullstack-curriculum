#!/bin/bash
# cSpell: disable
PSQL="psql -X -U freecodecamp -d periodic_table --tuples-only -c"

MAIN() {
  # check if argument is empty
  if [[ -z "$1" ]]
  then
    echo 'Please provide an element as an argument.' 
    exit 0
  else
    #  if it's not empty, store value
    INPUT="$1"
    # check if INPUT exists, cast atomic_number to text
    INPUT_EXISTS=$($PSQL "SELECT e.atomic_number, e.symbol, e.name, t.type, p.atomic_mass, p.melting_point_celsius, p.boiling_point_celsius FROM elements e \
    INNER JOIN properties p ON e.atomic_number = p.atomic_number\
    INNER JOIN types t ON p.type_id = t.type_id\
    WHERE  e.atomic_number::TEXT = '$INPUT' OR e.symbol = '$INPUT' OR e.name = '$INPUT';")
    # if INPUT EXISTS
    if [[ $INPUT_EXISTS ]]
    then
      # get the values
      IFS='|' read -r ATM_NUM SYMBOL NAME TYPE ATM_MASS MELT_POINT BOIL_POINT <<< "$INPUT_EXISTS"
      # format values- trim spaces
      ATM_NUM=$(echo "$ATM_NUM" | sed -e 's/^ *//g' -e 's/ *$//')
      SYMBOL=$(echo "$SYMBOL" | sed -e 's/^ *//g' -e 's/ *$//')
      NAME=$(echo "$NAME" | sed -e 's/^ *//g' -e 's/ *$//')
      TYPE=$(echo "$TYPE" | sed -e 's/^ *//g' -e 's/ *$//')
      MELT_POINT=$(echo "$MELT_POINT" | sed -e 's/^ *//g' -e 's/ *$//')
      ATM_MASS=$(echo "$ATM_MASS" | sed -e 's/^ *//g' -e 's/ *$//')
      BOIL_POINT=$(echo "$BOIL_POINT" | sed -e 's/^ *//g' -e 's/ *$//')
      # formatted output
      echo "The element with atomic number $ATM_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATM_MASS amu. $NAME has a melting point of $MELT_POINT celsius and a boiling point of $BOIL_POINT celsius." 
    else
      echo "I could not find that element in the database."
      exit 0
    fi
  fi
}
MAIN "$1"


