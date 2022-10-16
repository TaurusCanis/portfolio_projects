from django.contrib import admin
from .models import FormalPracticePromptInfo, InformalPracticeInfo, MBSRUser, GettingStartedResponse, FormalPractice, InformalPractice

admin.site.register(MBSRUser)
admin.site.register(FormalPracticePromptInfo)
admin.site.register(InformalPracticeInfo)
admin.site.register(GettingStartedResponse)
admin.site.register(FormalPractice)
admin.site.register(InformalPractice)