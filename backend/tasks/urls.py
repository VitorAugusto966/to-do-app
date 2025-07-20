from django.urls import path # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore
from .views import TaskViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = router.urls
