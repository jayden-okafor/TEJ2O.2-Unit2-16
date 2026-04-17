/* Copyright (c) 2026 MTHS All rights reserved
 *
 * Created by: Jayden Okafor
 * Created on: Apr 2026
 * This program sends the word "too close" to another microbit if the distance is below 10cm away
*/

// clear screen
basic.clearScreen()
basic.showIcon(IconNames.Happy)

// assign the radio to the same number as your partner to avoid conflict with other microbits
radio.setGroup(168)

// when the "A" button is pressed
input.onButtonPressed(Button.A, function () {

    // makes this loop run forever
    while (true) {

        // measure the distance in cm
        const distance = sonar.ping(
            DigitalPin.P0, // trigger
            DigitalPin.P2, // echo
            PingUnit.Centimeters, // converts distance to cm
        )

        // runs if distance is below 10cm and sends the word "too close" to the other microbit
        if (distance > 0 && distance <= 10) {
            basic.clearScreen()
            basic.showIcon(IconNames.Triangle)
            radio.sendString("Too close!")
            basic.pause(8000)
        }

        // clears screen and shows happy face
        basic.clearScreen()
        basic.showIcon(IconNames.Happy)
    }
})
