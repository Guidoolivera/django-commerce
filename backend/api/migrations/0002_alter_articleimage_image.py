# Generated by Django 5.0.4 on 2024-04-22 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articleimage',
            name='image',
            field=models.ImageField(upload_to='media/article_images/'),
        ),
    ]
