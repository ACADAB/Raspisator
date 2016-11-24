#!/bin/bash

service nginx restart
service php7.0-fpm restart
service mysql restart

npm run watch 