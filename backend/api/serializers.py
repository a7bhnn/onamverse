from rest_framework import serializers
from .models import GameScore

class GameScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameScore
        fields = '__all__'