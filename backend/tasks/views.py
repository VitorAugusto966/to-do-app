from rest_framework import viewsets, permissions, filters # type: ignore
from .models import Task
from .serializers import TaskSerializer
from rest_framework.exceptions import PermissionDenied # type: ignore
from .models import Category
from .serializers import CategorySerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['created_at']

    def get_queryset(self):
        queryset = Task.objects.filter(user=self.request.user).order_by('-created_at')
        is_completed = self.request.query_params.get('is_completed')
        if is_completed in ['true', 'false']:
            queryset = queryset.filter(is_completed=(is_completed == 'true'))
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("Você não tem permissão para acessar esta tarefa.")
        return obj




class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user).order_by('name')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
