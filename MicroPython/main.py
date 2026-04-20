"""
Copyright (c) 2026 MTHS All rights reserved
Created by: Jayden Okafor
Created on: Apr 2026
This program sends the word "too close" to another microbit if the distance is below 10cm away
"""

from microbit import *
import radio


# sonar class
class HCSR04:
    def __init__(self, tpin=pin0, epin=pin2, spin=pin13):
        self.trigger_pin = tpin
        self.echo_pin = epin
        self.sclk_pin = spin

        spi.init(
            baudrate=125000,
            sclk=self.sclk_pin,
            mosi=self.trigger_pin,
            miso=self.echo_pin,
        )

        self.length = 500
        self.resp = bytearray(self.length)

    def distance_mm(self):
        pre = 0
        post = 0
        k = -1
        length = self.length
        resp = self.resp

        for j in range(length):
            resp[j] = 0
        resp[0] = 0xFF

        spi.write_readinto(resp, resp)

        try:
            i, value = next((ind, v) for ind, v in enumerate(resp) if v)
        except StopIteration:
            i = -1
        if i > 0:
            pre = bin(value).count("1")
            try:
                k, value = next(
                    (ind, v)
                    for ind, v in enumerate(resp[i : length - 2])
                    if resp[i + ind + 1] == 0
                )
                post = bin(value).count("1") if k else 0
                k = k + i
            except StopIteration:
                i = -1
        dist = -1 if i < 0 else round(((pre + (k - i) * 8.0 + post) * 8 * 0.172) / 2)
        return dist


# clear screen
display.clear()
display.show(Image.HAPPY)

# assign the radio to the same number as your partner to avoid conflict with other microbits
radio.on()
radio.config(group=168)

# assign sonar class
sonar = HCSR04()

# when the "A" button is pressed
while True:
    if button_a.was_pressed():

        # makes this loop run forever
        while True:

            # measure the distance in cm
            distance = sonar.distance_mm() / 10

            # runs if distance is below 10cm and sends the word "too close" to the other microbit
            if distance > 0 and distance <= 10:
                display.clear()
                display.show(Image.TRIANGLE)
                radio.send("Too close!")
                sleep(8000)

            # clears screen and shows happy face
            display.clear()
            display.show(Image.HAPPY)
