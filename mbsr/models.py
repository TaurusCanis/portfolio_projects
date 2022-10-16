from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class MBSRUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now=True)
    has_started = models.BooleanField(default=False)
    is_in_week = models.IntegerField(default=1)
    has_completed = models.BooleanField(default=False)
    day_of_week = models.IntegerField(default=1)
    has_completed_daily_formal_practice = models.BooleanField(default=False)
    has_completed_daily_informal_practice = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class GettingStartedResponse(models.Model):
    mbsr_user = models.ForeignKey(MBSRUser, on_delete=models.CASCADE)
    end_of_course_hope = models.CharField(max_length=1000)
    strengths = models.CharField(max_length=1000)
    practice_time = models.CharField(max_length=1000)
    practice_location = models.CharField(max_length=1000)
    prep_time = models.CharField(max_length=1000)

    # def get_absolute_url(self):
    #     return 

class FormalPractice(models.Model):
    mbsr_user = models.ForeignKey(MBSRUser, on_delete=models.CASCADE)
    date = models.DateTimeField()
    comment = models.CharField(max_length=10000)
    week = models.IntegerField(default=1,blank=True)
    day = models.IntegerField(default=1,blank=True)

    def get_fields(self):
        return [(field.name, field.value_to_string(self)) for field in FormalPractice._meta.fields]

class InformalPractice(models.Model):
    mbsr_user = models.ForeignKey(MBSRUser, on_delete=models.CASCADE)
    date = models.DateTimeField()
    situation = models.CharField(max_length=1000)
    feelings_before = models.CharField(max_length=1000)
    feelings_during = models.CharField(max_length=1000)
    learned = models.CharField(max_length=1000)
    feelings_now = models.CharField(max_length=1000)
    week = models.IntegerField(default=1,blank=True)
    day = models.IntegerField(default=1,blank=True)

    def get_fields(self):
        return [(field.name, field.value_to_string(self)) for field in InformalPractice._meta.fields]

class FormalPracticePromptInfo(models.Model):
    week = models.IntegerField()
    title = models.CharField(max_length=1000000, null=True, blank=True)
    text = models.CharField(max_length=1000000)

    def __str__(self):
        return "Week " + str(self.week) + " Formal Practice Info" 

class InformalPracticeInfo(models.Model):
    week = models.IntegerField()
    title = models.CharField(max_length=1000000, null=True, blank=True)
    instructions = models.CharField(max_length=1000000, null=True, blank=True)
    box_1 = models.CharField(max_length=1000000)
    ex_1 = models.CharField(max_length=1000000, default="")
    box_2 = models.CharField(max_length=1000000)
    ex_2 = models.CharField(max_length=1000000, default="")
    box_3 = models.CharField(max_length=1000000)
    ex_3 = models.CharField(max_length=1000000, default="")
    box_4 = models.CharField(max_length=1000000)
    ex_4 = models.CharField(max_length=1000000, default="")
    box_5 = models.CharField(max_length=1000000)
    ex_5 = models.CharField(max_length=1000000, default="")
    box_6 = models.CharField(max_length=1000000, default="", blank=True, null=True)
    ex_6 = models.CharField(max_length=1000000, default="", blank=True, null=True)

    def __str__(self):
        return "Week " + str(self.week) + " Informal Practice Info"
