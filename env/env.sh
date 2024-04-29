#!/bin/bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

env_file=.env
env_js=env-config.js

if [[ ! -f .env ]]; then
  echo "Please create a .env file in your env folder. See https://wfspearson.atlassian.net/wiki/spaces/CDM/pages/2417491999/GUIDE+Creating+a+Custom+App#Using-an-API-Key-for-local-development for more information."
  exit 1
fi

rm -rf $env_js
touch $env_js

echo "window._env_ = {" >> $env_js

while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> $env_js
done < $env_file

echo "}" >> $env_js