from django.db import models

class GameScore(models.Model):
    username = models.CharField(max_length=50)
    universe = models.CharField(max_length=50) # e.g., 'cyberpunk', 'underwater', 'ghibli'
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.universe}: {self.score}"