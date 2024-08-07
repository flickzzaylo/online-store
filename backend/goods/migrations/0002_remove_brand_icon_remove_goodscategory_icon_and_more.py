# Generated by Django 5.0.3 on 2024-04-12 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='brand',
            name='icon',
        ),
        migrations.RemoveField(
            model_name='goodscategory',
            name='icon',
        ),
        migrations.AddField(
            model_name='brand',
            name='icon_data',
            field=models.BinaryField(null=True),
        ),
        migrations.AddField(
            model_name='brand',
            name='icon_format',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='goodscategory',
            name='icon_data',
            field=models.BinaryField(null=True),
        ),
        migrations.AddField(
            model_name='goodscategory',
            name='icon_format',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='goods',
            name='image',
            field=models.ImageField(null=True, upload_to='goods_images'),
        ),
        migrations.AlterField(
            model_name='goods',
            name='rating',
            field=models.IntegerField(null=True),
        ),
    ]
