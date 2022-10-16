import datetime

class MBSRUserUpdatesMixin:
    def update_practice_logs(self, practice_type):
        print("****MBSRUserUpdatesMixin****")
        user = self.get_user()
        if practice_type == "formal":
            user.has_completed_daily_formal_practice = True 
        if practice_type == "informal":
            user.has_completed_daily_informal_practice = True 
        user.save()
        if user.has_completed_daily_formal_practice and user.has_completed_daily_informal_practice:
            user.day_of_week += 1
            if self.has_user_completed_week(user.day_of_week):
                user.day_of_week = 1
                user.is_in_week += 1
            if self.has_user_completed_program(user.is_in_week):
                user.has_cmpleted = True
            user.has_completed_daily_formal_practice = False
            user.has_completed_daily_informal_practice = False
            user.save()

    def get_date(self):
        return datetime.date.today()

    def has_user_completed_week(self, day_of_week):
        return day_of_week > 7

    def has_user_completed_program(self, week):
        return week > 8