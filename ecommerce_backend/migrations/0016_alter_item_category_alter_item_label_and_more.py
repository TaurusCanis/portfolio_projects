# Generated by Django 4.1.2 on 2022-10-26 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_backend', '0015_alter_item_category_alter_item_label_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(blank=True, choices=[('T', 'Tip'), ('C', 'Clothing'), ('M', 'Mugs'), ('P', 'Posters')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(blank=True, choices=[('P', 'primary'), ('S', 'seconary'), ('D', 'danger')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='session_id',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]
