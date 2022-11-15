# -*- coding: utf-8 -*-

from locust import HttpUser, task, between
import datetime
import random

class WebsiteUser(HttpUser):
    @task(1)
    def get_cargo_v3(self):
        self.client.get("/cargo/v3")

    def wait_time(self):
        now = datetime.datetime.now()
        if now.hour == 12:
            return random.uniform(1, 2)
        if now.hour > 9 and now.hour < 16:
            return random.uniform(1, 5)
        return random.uniform (5,15)


