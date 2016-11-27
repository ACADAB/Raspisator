#!/bin/bash

sudo service nginx restart
sudo service php7.0-fpm restart
sudo service mysql restart

npm run watch 