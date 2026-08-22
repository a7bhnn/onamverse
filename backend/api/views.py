from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GameScore
from .serializers import GameScoreSerializer

@api_view(['GET', 'POST'])
def leaderboard(request):
    if request.method == 'GET':
        scores = GameScore.objects.all().order_by('-score')[:10] # Top 10 highest scores
        serializer = GameScoreSerializer(scores, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = GameScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)