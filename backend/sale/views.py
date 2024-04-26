from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from .models import Sale
from .serializers import SaleSerializer
from django.shortcuts import get_object_or_404


class SaleList(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class SaleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class SaleCreate(generics.CreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class SaleUpdate(generics.UpdateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class SaleDelete(generics.DestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class SaleOnDateList(generics.ListAPIView):
    serializer_class = SaleSerializer
    def get_queryset(self):
        date = self.kwargs['date']
        return Sale.objects.filter(begin_date__lte=date, end_date__gte=date)
