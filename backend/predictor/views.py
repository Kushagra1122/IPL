from django.shortcuts import render

# Create your views here.
import pickle
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

class IPLPredictor(APIView):
    def post(self, request):
        data = request.data
        # Extract form inputs from the request
        batting_team = data.get('batting_team')
        bowling_team = data.get('bowling_team')
        selected_city = data.get('city')
        target = data.get('target')
        score = data.get('score')
        overs = data.get('overs')
        wickets = data.get('wickets')

        # Load the model
        pipe = pickle.load(open('pipe.pkl', 'rb'))

        # Process the inputs
        runs_left = target - score
        balls_left = 120 - (overs * 6)
        wickets_left = 10 - wickets
        crr = score / overs
        rrr = (runs_left * 6) / balls_left

        input_df = pd.DataFrame({
            'batting_team': [batting_team],
            'bowling_team': [bowling_team],
            'city': [selected_city],
            'runs_left': [runs_left],
            'balls_left': [balls_left],
            'wickets': [wickets_left],
            'total_runs_x': [target],
            'crr': [crr],
            'rrr': [rrr]
        })

        # Predict the probability
        result = pipe.predict_proba(input_df)
        loss = result[0][0]
        win = result[0][1]

        response = {
            'batting_team_win': f"{batting_team} - {round(win * 100)}%",
            'bowling_team_loss': f"{bowling_team} - {round(loss * 100)}%"
        }

        return JsonResponse(response, status=status.HTTP_200_OK)
