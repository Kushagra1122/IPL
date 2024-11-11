from django.urls import path
from .views import IPLPredictor

urlpatterns = [
    path('predict/', IPLPredictor.as_view(), name='predict')
]
