#!/bin/bash
export FLASK_APP=./src/main.py
source activate fiapp
flask run -h 0.0.0.0
