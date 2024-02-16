#!/bin/bash

# Set the threshold for failed login attempts
THRESHOLD=3

# Get a list of users with three or more failed login attempts
users_with_attempts=$(grep 'Failed password' /var/log/auth.log | awk '{print $(NF-5)}' | sort | uniq -c | awk -v threshold=$THRESHOLD '$1 >= threshold {print $2}')

# Print the list of users
if [ -z "$users_with_attempts" ]; then
  echo "No users found with $THRESHOLD or more failed login attempts."
else
  echo "Users with $THRESHOLD or more failed login attempts:"
  echo "$users_with_attempts"
fi
