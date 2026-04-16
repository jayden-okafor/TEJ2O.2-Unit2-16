/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: XXX
 * Created on: Sep 2020
 * This program ...
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
