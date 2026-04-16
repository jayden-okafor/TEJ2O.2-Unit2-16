/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Jayden Okafor
 * Created on: Apr 2026
 * This program sends the word "too close" to another microbit if the distance is below 10cm away
*/

// clear screen
basic.clearScreen()
basic.showIcon(IconNames.Happy)

// assign he radio to the same number as your partner to avoid conflict with other microbits
radio.setGroup(168)

input.onButtonPressed(Button.A, function () {

    while (true) {
        const distance = sonar.ping(
            DigitalPin.P1, // trigger
            DigitalPin.P2, // echo
            PingUnit.Centimeters,
        )

        if (distance > 0 && distance <= 10) {
            basic.clearScreen()
            basic.showIcon(IconNames.Triangle)
            radio.sendString("Too close!")
            basic.pause(8000)
        }
        basic.clearScreen()
        basic.showIcon(IconNames.Happy)
    }
})
