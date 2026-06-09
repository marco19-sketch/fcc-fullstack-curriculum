#!/bin/bash
# cSpell: disable
# shellcheck disable=all
PSQL="psql -X -U freecodecamp -d salon --tuples-only -c"
# show list of services
echo -e "\n~~~ Salon ~~~\n"
echo -e 'How may I help you?\n'
MAIN_MENU () {
  if [[ $1 ]]
  then
    echo -e "$1"
  fi
  # echo -e 'How may I help you?\n'
  LIST_OF_SERVICES=$($PSQL "SELECT * FROM services;")
  echo "$LIST_OF_SERVICES" | while read SERVICE_ID BAR NAME
  do
    echo "$SERVICE_ID) $NAME"
  done

  read SERVICE_ID_SELECTED
 # check if it exists
  SERVICE_EXISTS=$($PSQL "SELECT service_id FROM services WHERE service_id =$SERVICE_ID_SELECTED;")
  if [[ -z $SERVICE_EXISTS ]]  
  then
    # send to main manu
    MAIN_MENU '\nPlease select a valid option.'
  elif [[ $SERVICE_EXISTS ]]
  then
    # get customer phone 
    echo -e "\nWhat's your phone number?"
    read CUSTOMER_PHONE
    # check if phone number exists in customers
    PHONE_EXISTS=$($PSQL "SELECT phone FROM customers WHERE phone = '$CUSTOMER_PHONE';")
    # if not found
    if [[ -z $PHONE_EXISTS ]]
    # get save phone, name, service id and time
    then
      echo -e "\nI don't have your number in my records. What's your name?"
      read CUSTOMER_NAME
      CUSTOMER_PHONE_AND_NAME=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME');")
    fi
    # get service id and time
    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE';")
    echo -e "\nWhat time do you prefer,$CUSTOMER_NAME?"
    read SERVICE_TIME
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE';")
    CUSTOMER_APPOINTMENT_TIME=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME');")
    # appointment successfull
    SERVICE_SELECTED_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED;")
    echo -e "\nI have put you down for a $SERVICE_SELECTED_NAME at $SERVICE_TIME, $CUSTOMER_NAME." | sed  's/  / /g'
 fi  
}
MAIN_MENU 




