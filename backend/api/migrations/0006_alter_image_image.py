# Generated by Django 5.0.4 on 2024-04-22 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_image_article_images_delete_articleimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.FileField(null=True, upload_to='article_images/'),
        ),
    ]
