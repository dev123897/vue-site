#!/bin/bash
CHROME_DRIVER_URL="https://storage.googleapis.com/chrome-for-testing-public/131.0.6778.204/linux64/chromedriver-linux64.zip"
GECKO_DRIVER_URL="https://github.com/mozilla/geckodriver/releases/download/v0.35.0/geckodriver-v0.35.0-linux64.tar.gz"
CHROME_DRIVER="chromedriver.zip"
GECKO_DRIVER="geckodriver.tar.gz"

if [ ! -d "../browser_drivers" ]; then
  mkdir browser_drivers
fi

cd ../browser_drivers

curl $CHROME_DRIVER_URL -o $CHROME_DRIVER
curl $GECKO_DRIVER_URL -L -o $GECKO_DRIVER

unzip $CHROME_DRIVER
tar -xzvf $GECKO_DRIVER

rm $CHROME_DRIVER $GECKO_DRIVER

export PATH="$PATH:$(pwd)"
